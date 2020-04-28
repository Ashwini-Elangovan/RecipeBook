import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recSubscription: Subscription;

  recipes: Recipe[] = [];

  constructor(private recipeService: RecipeService, private dataService: DataStorageService) { }

  ngOnInit() {
    this.dataService.fetchRecipes()
    .subscribe(recipes => {
      this.recipes = recipes;
      this.recipeService.setRecipes(recipes);
      console.log(recipes)
    })
   //this.recipes = this.recipeService.recipes;
    
    this.recSubscription = this.recipeService.recipesChanged
      .subscribe(recipes => {
        console.log("TEST");
        this.recipes = recipes;
      });
  }

  ngOnDestroy() {
    this.recSubscription.unsubscribe();
  }
}
