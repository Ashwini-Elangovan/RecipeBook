import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import { ShoppingService } from 'src/app/shopping-list/shopping.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {

  recipe: Recipe;
  id: number;

  constructor(private recipeService: RecipeService,
    private shoppingService: ShoppingService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.recipeService.selectedRecipe.subscribe(recipe => {
      this.recipe = recipe;
    });

    this.route.params.subscribe( params => {
      this.id = +params['id'];
      this.recipe = this.recipeService.getRecipe(this.id);
    });

    
    
  }

  toShop() {
    this.shoppingService.recipeIngredientsToShop(this.recipe.ingredients);
  }

  removeRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['../'], {relativeTo: this.route});
  }

}
