import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';


@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  // @Output() recipeIngredientItemInfo = new EventEmitter<Recipe>();
  @Input() recipeid:number;
  recipeList:Recipe;
  constructor(private recipeService: RecipeService, 
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.recipeList = this.recipeService.getRecipe(this.recipeid);
  }
  // recipeInfo(recipedetails:Recipe){
  //    this.recipeIngredientItemInfo.emit(recipedetails);
  // }

  showDetails(){
    this.router.navigate(['list', this.recipeid], {relativeTo: this.route});
  }

}
