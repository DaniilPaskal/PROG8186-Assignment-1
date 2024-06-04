export class Product {
    constructor (id, name, image, description, price) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.description = description;
        this.price = price;
        this.quantity = 0;

        this.setQuantity = this.setQuantity.bind(this);
        this.removeFromCart = this.removeFromCart.bind(this);
    }

    setQuantity(quantity) {
        this.quantity = quantity;
    }

    removeFromCart() {
        this.quantity = 0;
    }
}

export class User {
    constructor (name = "", email = "", address = "", city = "", province = "") {
        this.name = name;
        this.email = email;
        this.address = address;
        this.city = city;
        this.province = province;
        this.loggedIn = false;
    }

    getStatus() {
        return this.loggedIn;
    }

    login() {
        this.loggedIn = true;
    }

    logout() {
        this.loggedIn = false;
    }

    update(name, email, address, city, province) {
        this.name = name;
        this.email = email;
        this.address = address;
        this.city = city;
        this.province = province;
    }
}