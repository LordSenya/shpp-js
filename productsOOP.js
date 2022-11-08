var currentID = 1;
function AbstractProduct(name) {
    this.ID = currentID;
    currentID++;
    this.name = name;
    this.description = "";
    this.price = 0.0;
    this.brand = "";
    this.quantity = 0;
    this.date = new Date();
    this.reviews = [];
    this.images = [];
}
    AbstractProduct.prototype.setID = function (ID) {
        this.ID = ID;
    };

    AbstractProduct.prototype.getID = function () {
        return this.ID;
    };

    AbstractProduct.prototype.setDescription = function (description) {
        this.description = description;
    }

    AbstractProduct.prototype.getDescription = function () {
        return this.description;
    }

    AbstractProduct.prototype.setPrice = function (price) {
        this.price = price;
    }

    AbstractProduct.prototype.getPrice = function () {
        return this.price;
    }

    AbstractProduct.prototype.setBrand = function (brand) {
        this.brand = brand;
    }

    AbstractProduct.prototype.getBrand = function () {
        return this.brand;
    }

    AbstractProduct.prototype.setQuantity = function (quantity) {
        this.quantity = quantity;
    }

    AbstractProduct.prototype.getQuantity = function () {
        return this.quantity;
    }

    AbstractProduct.prototype.setdate = function (date) {
        this.date = date;
    }

    AbstractProduct.prototype.getdate = function () {
        return this.date;
    }

    AbstractProduct.prototype.setReviews = function (reviews) {
        this.reviews.push(reviews);
    }

    AbstractProduct.prototype.getReviews = function () {
        return this.reviews;
    }

    AbstractProduct.prototype.getReviewByID = function (ID) {
        return this.reviews.find(element => element == ID);
    }

    AbstractProduct.prototype.getImage = function (image) {
        if (this.images.length != 0) {
            return image == undefined ? this.images[0] : this.images.find(element => element == image);
        }
    }

    AbstractProduct.prototype.addReview = function (ID, author, date, comment, rating) {
        this.reviews.push(new Reviews(ID, author, date, comment, rating));
    }

    AbstractProduct.prototype.deleteReview = function (ID) {
        deletingElement = this.reviews.splice(this.reviews.find(element => element.ID == ID));
        this.sizes.splice(this.sizes.findIndex(deletingElement), 1);
    }

    AbstractProduct.prototype.getAverageRating = function () {
        let counter = 0;
        let ratingSum = 0;
        for (var reviewsElement of this.reviews) {
            counter++;
            for (var ratingElement in reviewsElement.rating) {
                ratingSum = + reviewsElement.rating[ratingElement];
            }
        }
        return counter != 0 ? ratingSum / counter : 0;
    }


    function Reviews(ID, author, date, comment, rating) {
        this.ID = ID;
        this.author = author;
        this.date - date;
        this.comment = comment;
        this.rating = rating;
    }
    
    function searchProducts(products, key, advanceSearch) {
        if (advanceSearch) {
            return products.filter(element => (element.name.includes(key) || element.description.includes(key)));
        }
        return products.filter(element => element.name.split(" ").includes(key) || element.description.split(" ").includes(key));
    }
    
    
    function sortProducts(products, key) {
        if (key == "name") {
            products.sort(function (a, b) {
                var nameA = a[key].toLowerCase(), nameB = b[key].toLowerCase()
                if (nameA < nameB)
                    return -1;
                if (nameA > nameB)
                    return 1;
                return 0;
            });
    
        } else {
            products.sort(function (a, b) {
                return a[key] - b[key];
            });
        }
    
    }
    
    function compareNumbers(a, b) {
        return a - b;
    }
    

function Clothes (name,material, color) {
    AbstractProduct.call(this, name);
    this.material = material;
    this.color = color;
    function setMaterial(material) {
        this.material = material;
    }
    function getMaterial() {
        return this.material;
    }

    function setColor(color) {
        this.color = color;
    }
    function getColor() {
        return this.color;
    }
}
Clothes.prototype = Object.create(AbstractProduct.prototype);
function Electronics(warranty, power) {
    this.warranty = warranty;
    this.power = power;
    function setWarranty(warranty) {
        this.warranty = warranty;
    }
    function getWarrantyl() {
        return this.warranty;
    }

    function setPower(power) {
        this.power = power;
    }
    function getPower() {
        return this.power;
    }
}
let jeans = new Clothes("jeans","jeans", "blue");
jeans.setDescription(";kghugiugyug");
let socks = new Clothes("socks","bavovna", "white")
socks.setDescription("Coll");
let ar = [socks, jeans];
sortProducts(ar, "name");
console.log();