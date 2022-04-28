import { Restaurant } from "./restaurants";

export class DenunciaADD {
    _id: string;
    restaurant: string;
    description: string;
    amount: number;
    denunciaDate: Date;

    constructor(_id: string, rest: string, desc: string, amount: number, denunciaDate: Date) {
        this._id = _id;
        this.restaurant = rest;
        this.description = desc;
        this.amount = amount;
        this.denunciaDate = denunciaDate;
    }
}