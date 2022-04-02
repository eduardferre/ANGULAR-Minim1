import { Restaurant } from "./restaurants";

export class Dish {
    _id: string;
    restaurant: Restaurant;
    title: string;
    type: string;
    description: string;
    price: number;
    rating: number; //Array containing the IDs of the restaurants.

    constructor(_id: string, rest: Restaurant, title: string, type: string, desc: string, price: number, rating: number) {
        this._id = _id;
        this.restaurant = rest;
        this.title = title;
        this.type = type;
        this.description = desc;
        this.price = price;
        this.rating = rating;
    }
}