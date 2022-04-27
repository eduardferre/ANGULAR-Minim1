export class Owner {
    _id: string;
    ownerName: string;
    fullName: string;
    email: string;
    password: string;
    creationDate: Date;
    listRestaurants: [{
        _id: string;
        restName: string;
    }]; //Array containing the IDs of the restaurants.

    constructor(_id: string, name: string, fullName: string, email: string, pass: string, cDate: Date, listRest: [{_id: string, restName: string}]) {
        this._id = _id;
        this.ownerName = name;
        this.fullName = fullName;
        this.email = email;
        this.password = pass;
        this.creationDate = cDate;
        this.listRestaurants = listRest;
    }
}