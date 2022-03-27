import { Customer } from "./customer";
import { Owner } from "./owners";

export class Reservation {
    _id: string;
    customer: Customer;
    owner: Owner;
    dateReservation: string;
    timeReservation: string;
    creationDate: Date;

    constructor(_id: string, cust: Customer, own: Owner, dateRes: string, timeRes: string, cDate: Date) {
        this._id = _id;
        this.customer = cust;
        this.owner = own;
        this.dateReservation = dateRes;
        this.timeReservation = timeRes;
        this.creationDate = cDate;
    }
}