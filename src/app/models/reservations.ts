import { Customer } from "./customer";
import { Owner } from "./owners";

export class Reservation {
    _id: string;
    _idCustomer: string;
    _idRestaurant: string;
    dateReservation: string;
    timeReservation: string;
    creationDate: Date;

    constructor(_id: string, _idcust: string, _idrest: string, dateRes: string, timeRes: string, cDate: Date) {
        this._id = _id;
        this._idCustomer = _idcust;
        this._idRestaurant = _idrest;
        this.dateReservation = dateRes;
        this.timeReservation = timeRes;
        this.creationDate = cDate;
    }
}