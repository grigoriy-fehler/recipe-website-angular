import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';

import { AppDataService } from '../app-data.service';
import { Recipe } from '../recipe';
import { User } from '../user';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss']
})
export class AddRecipeComponent implements OnInit {

  public recipeForm: FormGroup;
  public error: string;

  private file: File;
  public instructions: FormArray;
  public ingredients: FormArray;

  private user: User;

  constructor(
    private appDataService: AppDataService,
    private formBuilder: FormBuilder,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
    this.user = this.authService.getCurrentUser();
    this.initializeForm();
    this.instructions = this.recipeForm.get('instructions') as FormArray;
    this.ingredients = this.recipeForm.get('ingredients') as FormArray;
    console.log(this.recipeForm.controls['instructions'])
  }

  private initializeForm(): void {
    this.recipeForm = this.formBuilder.group({
      name: '',
      image: '',
      cooktime: 20,
      difficulty: 3,
      servings: 4,
      instructions: this.formBuilder.array([this.createInstruction()]),
      ingredients: this.formBuilder.array([this.createIngredient()])
    });
  }

  private createInstruction(): FormGroup {
    return this.formBuilder.group({
      text: ''
    })
  }

  public addInstruction(): void {
    this.instructions.push(this.createInstruction());
  }

  private createIngredient(): FormGroup {
    return this.formBuilder.group({
      name: '',
      amount: 100,
      type: ''
    })
  }

  public addIngredient(): void {
    this.ingredients.push(this.createIngredient());
  }

  private formValidation(form: Recipe): boolean {
    if (
      form.name &&
      form.image &&
      form.cooktime &&
      form.difficulty &&
      form.servings &&
      this.validIngredients(form.ingredients) &&
      this.validInstructions(form.instructions)
    ) {
      return true;
    } else {
      return false;
    }
  }

  private validIngredients(ingredients: any[]): boolean {
    return ingredients.every((ingredient) => {
      return ingredient.name, ingredient.amount, ingredient.type
    });
  }

  private validInstructions(instructions: any[]): boolean {
    return instructions.every((instruction) => {
      return instruction.text
    });
  }

  public onSubmit(form: FormGroup): void {
    if (this.formValidation(form.value) && this.user) {
      this.appDataService.addRecipe(form.value, this.user.username)
      .then(recipe => {
        console.log(`Recipe saved: ${recipe}`);
        this.initializeForm();
      })
      .catch(err => this.error = err);
    } else if (!this.user) {
      this.error = 'Login to add recipes';
    } else {
      this.error = 'All fields are required';
    }
  }

  public onFileChange(event): void {
    this.file = event.target.files[0];
  }
}
