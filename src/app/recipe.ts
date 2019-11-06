class Ingredient {
  name: string;
  amount: number;
  amountType: string;
}

export class Review {
  author: string;
  rating: number;
  text: string;
}

export class Recipe {
  _id: number;
  name: string;
  image: string;
  author: string;
  cooktime: number;
  difficulty: number;
  servings: number;
  instructions: object[];
  rating: number;
  ingredients: Ingredient[];
  reviews: Review[];
}