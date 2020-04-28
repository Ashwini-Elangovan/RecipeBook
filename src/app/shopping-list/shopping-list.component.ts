import { Component, OnInit } from '@angular/core';
import { ShoppingService } from './shopping.service';
import { Ingredient } from 'src/shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients: Ingredient[] = []

  constructor(private shoppingService: ShoppingService) { }

  ngOnInit() {
    this.ingredients = this.shoppingService.ingredients;
  }

  toEdit(index: number) {
    //console.log(index);
    this.shoppingService.indexOfIngredientToEdit.next(index);
  }

}
