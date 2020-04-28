import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService,
    private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.editMode = params['id'] != null ? true : false;
      this.initializeForm();
    });
  }

  private initializeForm() {
    let recipeName = '', recipeImgurl = '', description = '';
    let ingredients = new FormArray([], Validators.required);
    if(this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImgurl = recipe.imgurl;
      description = recipe.desc;
      if(recipe.ingredients){
        recipe.ingredients.forEach(ingredient => {
          ingredients.push(new FormGroup({
            'name': new FormControl(ingredient.name, Validators.required),
            'qty': new FormControl(ingredient.qty, Validators.required)
          }))
        })
      }
      
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imgurl': new FormControl(recipeImgurl, Validators.required),
      'desc': new FormControl(description, Validators.required),
      'ingredients': ingredients
    });
  }

  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients'))
      .push( new FormGroup({
        'name': new FormControl(null, Validators.required),
        'qty': new FormControl(null, Validators.required)
      }));
  }

  createRecipe() {
    console.log(this.editMode, this.recipeForm.value);
    if(this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }
  

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  removeIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }


}
