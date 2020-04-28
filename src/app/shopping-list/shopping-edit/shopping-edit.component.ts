import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from 'src/shared/ingredient.model';
import { ShoppingService } from '../shopping.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f', {static: false}) ingForm: NgForm; 
  ingSubscription: Subscription;
  index: number;
  editMode = false;
  ingEditing: Ingredient;

  constructor(private shoppingService: ShoppingService) { }

  ngOnInit() {
    this.ingSubscription = this.shoppingService.indexOfIngredientToEdit
      .subscribe( index => {
        this.editMode = true;
        this.index = index;
        this.ingEditing = this.shoppingService.getIngredient(index);

        this.ingForm.setValue({
          name: this.ingEditing.name,
          qty: this.ingEditing.qty
        });

      })
  }

  addIngredient(ingredient: Ingredient) {
    this.shoppingService.addInggredientToShoppingList(ingredient);
    this.ingForm.reset();
  }

  updateIngredient() {
    this.shoppingService.updateIngredient(this.index, this.ingForm.value);
    this.editMode = false;
    this.ingForm.reset();
  }

  removeIngredient() {
    this.shoppingService.deleteIngredient(this.index);
    this.editMode = false;
    this.ingForm.reset();
  }

  clearEdit() {
    this.ingForm.reset();
    this.editMode = false;
  }

  ngOnDestroy() {
    this.ingSubscription.unsubscribe();
  }

}
