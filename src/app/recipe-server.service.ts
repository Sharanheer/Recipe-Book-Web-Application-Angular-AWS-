import {Injectable} from '@angular/core'
import { Http, Response } from '@angular/http';
import { map } from 'rxjs/operators';

import { Recipe } from './recipes/recipe.model';
import { AuthService } from './auth/auth.service';

@Injectable()
export class RecipeServerService{

    constructor(private http: Http, private auth: AuthService){}
    saveData(recipes: Recipe[]){
        let token = this.auth.getToken();
        return this.http.put('https://ng-recipe-app-b9909.firebaseio.com/recipes.json?auth='+ token, recipes);
    }
    fetchData(){
        let token = this.auth.getToken();
        return this.http.get('https://ng-recipe-app-b9909.firebaseio.com/recipes.json?auth='+ token).pipe(map(
            (response: Response) => {
                return response.json();
            }
        ));
    }

}