import { Restaurant } from "./restaurants";

export class Denuncia {
    _id: string;
    restaurant: Restaurant;
    description: string;
    amount: number;
    denunciaDate: Date;

    constructor(_id: string, rest: Restaurant, desc: string, amount: number, denunciaDate: Date) {
        this._id = _id;
        this.restaurant = rest;
        this.description = desc;
        this.amount = amount;
        this.denunciaDate = denunciaDate;
    }
}