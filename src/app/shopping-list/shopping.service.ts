import { Injectable } from '@angular/core';
import { Ingredient } from 'src/shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  ingredients: Ingredient[] = [
    new Ingredient('Tomato', 5),
    new Ingredient('Meat', 5)
  ];

  indexOfIngredientToEdit = new Subject<number>();

  constructor() { }

  addInggredientToShoppingList(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }

  recipeIngredientsToShop(ingredients) {
    this.ingredients.push(...ingredients);
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  updateIngredient(index: number, ingredient: Ingredient) {
    this.ingredients.splice(index, 1, ingredient);
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
  }

}
