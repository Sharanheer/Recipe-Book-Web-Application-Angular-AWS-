import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import {Recipe} from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {

  // @Input() recIngredientInfo:Recipe;
  recIngredientInfo: Recipe;
  index: number;
  subscription: Subscription
  
  constructor(private route: ActivatedRoute, 
            private recipes: RecipeService,
            private router: Router,
            private auth: AuthService) {
    // this.recIngredientInfo = this.recipes.getRecipe(this.index);
  }

  ngOnInit() {
    // this.recIngredientInfo = {name:'', description:'', imagePath:''};
    //this.temp = this.route.snapshot.queryParams['recipelistname'];
  //   this.route.queryParams.subscribe(
  //     (params: Params) => { 
  //             this.recIngredientInfo = {name: params['recipelistname'], description: params['recipelistdescription'],
  //           imagePath: '', ingredientlist:params['recipelistIngredient']}}
  // );
  this.subscription = this.route.params.subscribe(
    (params: Params) => {
      this.index = params['recipeid'];
      this.recIngredientInfo = this.recipes.getRecipe(this.index);
    }
  );
  }

  onDelete(){
    if(this.auth.isAuthenticated()){
      this.recipes.deleteRecipe(this.index);
      this.router.navigate(['/recipe']);
    }
    
  }

  addIngredientToShoppingList(){
    this.router.navigate(['shopping'], {queryParams:{id:this.index}});
  }

  editRecipe(){
    this.router.navigate(['new'],{relativeTo:this.route,queryParams:{editMode:true}});
  }
  // console.log('Recipe data: '+this.recIngredientInfo.name);
  // console.log('Recipe Description: '+this.recIngredientInfo.description);

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }


  }


