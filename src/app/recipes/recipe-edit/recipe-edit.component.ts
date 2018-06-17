import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';



@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  recipeForm: FormGroup;
  newRecipe: Recipe;
  editMode: boolean = false;
  index: number;
  name: String = null;
  imagePath: String = null;
  description: String = null;
  ingredientlist = new FormArray([]);

  constructor(private recipeService: RecipeService, private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit() {

    this.route.params.subscribe(
      (params: Params) => {
        this.index = params['recipeid'];
        console.log(this.index);
      }
    );

    this.route.queryParams.subscribe(
      (params: Params) => {
        this.editMode = params['editMode'];
        console.log(this.editMode);
      }
    );

    if(this.editMode){
      //access the recipe using index 
      this.newRecipe = this.recipeService.getRecipe(this.index);
      this.name = this.newRecipe.name;
      this.description = this.newRecipe.description;
      this.imagePath = this.newRecipe.imagePath;
      if(this.newRecipe['ingredientlist']){
        for(let ingredient of this.newRecipe.ingredientlist){
          (<FormArray>this.ingredientlist).push(
          new FormGroup({
            'name': new FormControl( ingredient.name),
            'amount': new FormControl(ingredient.amount)
          }));
        }
      }
      
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(this.name, Validators.required),
      'imagePath': new FormControl(this.imagePath, Validators.required),
      'description': new FormControl(this.description, Validators.required),
      'ingredientlist': this.ingredientlist
    });

  }

  addIngredient(){
    (<FormArray>this.ingredientlist).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, Validators.required)
      }));
  }

  onSubmit(){
    //Either add a new recipe or edit the existing recipe

   this.newRecipe = new Recipe(this.recipeForm.get('name').value,
   this.recipeForm.get('description').value, 
   this.recipeForm.get('imagePath').value,
   this.recipeForm.get('ingredientlist').value);

    if(this.editMode){
      this.recipeService.updateRecipe(this.index, this.newRecipe);
    }else{
      this.recipeService.addRecipe(this.newRecipe);
    }

    //clear the form
    this.onCancel();
    
  }

  onIngredientCancel(index: number){
    (<FormArray>this.ingredientlist).removeAt(index);
  }

  onCancel(){
    this.recipeForm.reset();
    this.router.navigate(['/recipe']);
  }

  formData() { 
    return <FormArray> this.recipeForm.get('ingredientlist');
    // *ngFor="let ingredient of recipeForm.get('ingredientlist').controls; let i=index"
  }
}
