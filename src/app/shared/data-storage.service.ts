import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipe/recipe.service';
import { Recipe } from '../recipe/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient, private recipeService:RecipeService) { }

  storeRecipes() {
    let recipes = this.recipeService.recipes;
    this.http.put('https://recipes-b7cfe.firebaseio.com/recipes.json?print=pretty', recipes)
      .subscribe(response => {
        console.log(response);
      })
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>('https://recipes-b7cfe.firebaseio.com/recipes.json?print=pretty')
    

  }

}
