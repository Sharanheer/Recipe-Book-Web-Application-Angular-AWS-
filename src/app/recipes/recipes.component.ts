import { Component, OnInit } from '@angular/core';
import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  // recipeIngredientInfo :Recipe;
  constructor() { }

  ngOnInit() {
  }

  // ingredients(ingredientList){
  //   this.recipeIngredientInfo = ingredientList;
  // }
}
