import { Reservation } from "./reservations";

export class Customer {
    _id: string;
    customerName: string;
    fullName: string;
    email: string;
    password: string;
    creationDate: Date;
    listTastes:[{
        tagName: string;
        relevance: number;  //This value will be dynamically updated with the user activity.
    }]; 
    listDiscounts:[{
        nameRestaurant: string;
        amount: number;
        expirationDate: string;
    }];
    listReservations: [Reservation]; //Array containing the IDs of the reservations of the customer.

    constructor(_id: string, name: string, fullName: string, email: string, pass: string, cDate: Date, listTas: [{_id: string, tagName: string, relevance: number}], 
                listDisc: [{_id: string, nameRestaurant: string, amount: number, expirationDate: string}], listRes: [res: Reservation]) {
        this._id = _id;
        this.customerName = name;
        this.fullName = fullName;
        this.email = email;
        this.password = pass;
        this.creationDate = cDate;
        this.listTastes = listTas;
        this.listDiscounts = listDisc;
        this.listReservations = listRes;
    }
}