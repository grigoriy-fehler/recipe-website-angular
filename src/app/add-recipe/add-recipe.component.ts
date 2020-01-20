import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';

import { AppDataService } from '../app-data.service';
import { Recipe } from '../recipe';
import { User } from '../user';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { HistoryService } from '../history.service';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss']
})
export class AddRecipeComponent implements OnInit {

  public recipeForm: FormGroup;
  public error: string;

  public instructions: FormArray;
  public ingredients: FormArray;

  private user: User;

  constructor(
    private recipeService: RecipeService,
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.user = this.authService.getCurrentUser();
    this.initializeForm();
    this.instructions = this.recipeForm.get('instructions') as FormArray;
    this.ingredients = this.recipeForm.get('ingredients') as FormArray;
  }

  private initializeForm(): void {
    this.recipeForm = this.formBuilder.group({
      name: '',
      image: [null, Validators.required],
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
    if (!this.user.email) {
      this.error = 'Login to add recipes';
    } else if (this.formValidation(form.value)) {
      form.value.author = this.user.username;
      this.uploadForm(form.value);
    } else {
      this.error = 'All fields are required';
    }
  }

  private uploadForm(formData: FormData): void {
    this.recipeService.addRecipe(formData);
  }
}
