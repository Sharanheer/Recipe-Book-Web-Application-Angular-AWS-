import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';
import { Injectable, OnInit } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';


@Injectable()
export class ShoppingListService implements OnInit{

    ingredients: Ingredient[] = [];
    editIngredientIndex = new Subject<number>();

    constructor(private recipe: RecipeService){
        // for(let recipes of this.recipe.recipes){
        //     for(let ingredient of recipes.ingredientlist){
        //         console.log(ingredient);
        //         this.ingredients.push(ingredient);
        //     }
        // }
    }

    ngOnInit(){

        // for(let recipes of this.recipe.recipes){
        //     for(let ingredient of recipes.ingredientlist){
        //         console.log(ingredient);
        //         this.ingredients.push(ingredient);
        //     }
        // }
    }

    

    addIngredient(ingredient: Ingredient){
        this.ingredients.push(ingredient);
    }

    getEditIngredient(index:number){
        return this.ingredients[index];
    }

    editIngredient(index:number, ingredient:Ingredient){
        this.ingredients[index] = ingredient;
    }

    deleteIngredient(index:number){
        this.ingredients.splice(index,1);
    }
}