import { Component, EventEmitter, Output } from "@angular/core";
import { Router } from "@angular/router";

import { RecipeService } from "../recipes/recipe.service";
import { RecipeServerService } from "../recipe-server.service";
import { AuthService } from "../auth/auth.service";



@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})

export class HeaderComponent{

    constructor(private recipeService: RecipeService, private recipeServerService: RecipeServerService,
        public auth: AuthService, private router: Router){}

   @Output() eventfeature = new EventEmitter<String>();

    feature(features:String){
        this.eventfeature.emit(features);
    }

    saveData(){
        this.recipeServerService.saveData(this.recipeService.recipes).subscribe(
            (response) => console.log(response),
            (error) => console.log(error)
        );
    }

    fetchData(){
        this.recipeServerService.fetchData().subscribe(
            (data) =>{
                this.recipeService.recipes = data;
                this.recipeService.refresh();
            }
        );
    }
    onLogout(){
        this.auth.logout();
        this.router.navigate(['/']);
    }
}