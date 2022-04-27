export class RestaurantADD {
    _id: string;
    owner: string; //The _id of the owner.
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
    listDishes: []; //Array containing the IDs of the menus.

    constructor(_id: string, owner: string, restName: string, email: string, add: string, desc: string, photos: [], rating: number, cDate: Date, listTags: [{ _id: string, tagName: string }], listDishes: []) {
        this._id = _id;
        this.owner = owner;
        this.restaurantName = restName;
        this.email = email;
        this.address = add;
        this.description = desc;
        this.photos = photos;
        this.rating = rating;
        this.creationDate = cDate;
        this.listTags = listTags;
        this.listDishes = listDishes;
    }
}