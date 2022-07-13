import { Ingredient } from "./ingredient.model";

export class Recipe {

    constructor(
        public id: string, 
        public name: string, 
        public description: string,
        public imagePath: string,
        public ingredients: Ingredient[]) {}

    // Creates a valid Recipe object
    // from a raw JS object (ie. the one obtained from an API).
    // The missing fields are replaced with empty string or stuff like that.
    // Warning: obj must have a valid 'id' field.
    public static fromRaw(obj: object): Recipe {
        const name: string = obj['name'] ? obj['name'] : '';
        const descr: string = obj['description'] ? obj['description'] : '';
        const imagePath: string = obj['imagePath'] ? obj['imagePath'] : '';
        const ingredients: Ingredient[] = obj['ingredients'] ? obj['ingredients'] : [];
        return new Recipe(obj['id'], name, descr, imagePath, ingredients);
    }
}