import { Ingredient } from 'src/shared/ingredient.model';

export class Recipe {
    constructor(public name: string, 
        public desc: string, 
        public imgurl: string,
        public ingredients: Ingredient[]) {}
}