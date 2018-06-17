import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { RecipeService } from '../recipes/recipe.service';



@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy{

  id: number;
  subscription: Subscription

  ingredients: Ingredient[];
  constructor(private shoplist: ShoppingListService, 
              private route: ActivatedRoute,
              private recipe: RecipeService) {
      this.ingredients = shoplist.ingredients;
  }

  ngOnInit() {
    this.ingredients = this.shoplist.ingredients;
    this.subscription = this.route.queryParams.subscribe(
      (params: Params) => {
        this.id = params['id'];
          if(this.id){
            let tempRecipe = this.recipe.getRecipe(this.id);
            for(let i of tempRecipe.ingredientlist){
              this.ingredients.push(i);
           
           }
         }
        
      }
    );

  }
  editIngredient(index:number){
    
    this.shoplist.editIngredientIndex.next(index);
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  
}
