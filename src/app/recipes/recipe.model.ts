import { Ingredient } from "../shared/ingredient.model";

export class Recipe{

    public name: String;
    public description: String;
    public imagePath: String;
    public ingredientlist: Ingredient[]

    constructor(name:String, desc:String, imagePath:String, ingredient:Ingredient[]){
        this.name=name;
        this.description=desc;
        this.imagePath=imagePath;
        this.ingredientlist = ingredient;
    }

}