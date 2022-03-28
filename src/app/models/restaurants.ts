import { Owner } from "./owners";

export class Restaurant {
    _id: string;
    _idOwner: string; //The _id of the owner.
    restaurantName: string;
    email: string;
    address: string;
    description: string;
    photos: []; //List of URLs. The photos will be stored in the server.
    rating: number;
    creationDate: Date;
    listTags: [{
        tagName: string;
    }]
    listMenus: []; //Array containing the IDs of the menus.

    constructor(_id: string, _idOwner: string, restName: string, email: string, add: string, desc: string, photos: [], rating: number, cDate: Date, listTags: [{tagName: string}], listMenus: []) {
        this._id = _id;
        this._idOwner = _idOwner;
        this.restaurantName = restName;
        this.email = email;
        this.address = add;
        this.description = desc;
        this.photos = photos;
        this.rating = rating;
        this.creationDate = cDate;
        this.listTags = listTags;
        this.listMenus = listMenus;
    }
}