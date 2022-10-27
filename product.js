var currentID = 1;
function Product(name) {
    this.ID = currentID;
    currentID++;
    this.name = name;
    this.description = "";
    this.price = 0.0;
    this.brand = "";
    this.sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
    this.activeSize = "";
    this.quantity = 0;
    this.date = new Date();
    this.reviews = [];
    this.images = [];

    this.setID = function (ID) {
        this.ID = ID;
    };

    this.getID = function () {
        return this.ID;
    };

    this.setDescription = function (description) {
        this.description = description;
    }

    this.getDescription = function () {
        return this.description;
    }

    this.setPrice = function (price) {
        this.price = price;
    }

    this.getPrice = function () {
        return this.price;
    }

    this.setBrand = function (brand) {
        this.brand = brand;
    }

    this.getBrand = function () {
        return this.brand;
    }

    this.setSizes = function (sizes) {
        this.sizes = sizes;
    }

    this.getSizes = function () {
        return this.sizes;
    }

    this.setactiveSize = function (activeSize) {
        this.activeSize = activeSize;
    }

    this.getactiveSize = function () {
        return this.activeSize;
    }

    this.setQuantity = function (quantity) {
        this.quantity = quantity;
    }

    this.getQuantity = function () {
        return this.quantity;
    }

    this.setdate = function (date) {
        this.date = date;
    }

    this.getdate = function () {
        return this.date;
    }

    this.setReviews = function (reviews) {
        this.reviews.push(reviews);
    }

    this.getReviews = function () {
        return this.reviews;
    }

    this.getReviewByID = function (ID) {
        return this.reviews.find(element => element == ID);
    }

    this.getImage = function (image) {
        if (this.images.length != 0) {
            return image == undefined ? this.images[0] : this.images.find(element => element == image);
        }
    }

    this.addSize = function (size) {
        this.sizes.push(size);
    }

    this.deleteSize = function (size) {
        deletingElement = this.sizes.find(element => element == size);
        this.sizes.splice(this.sizes.findIndex(deletingElement), 1);
    }

    this.addReview = function (ID, author, date, comment, rating) {
        this.reviews.push(new Reviews(ID, author, date, comment, rating));
    }

    this.deleteReview = function (ID) {
        deletingElement = this.reviews.splice(this.reviews.find(element => element.ID == ID));
        this.sizes.splice(this.sizes.findIndex(deletingElement), 1);
    }

    this.getAverageRating = function () {
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

let t = new Product("футбол");
t.setPrice(100);
let y = new Product("qqqq");
y.setPrice(101);
y.setDescription("футболка");
let ar = [y, t];
sortProducts(ar, "ID");

console.log(searchProducts(ar, "футбол", false));
console.log(searchProducts(ar, "футбол", true));
let ratin = [];
ratin["service"] = 1;
ratin["price"] = 1;
ratin["value"] = 1;
ratin["quality"] = 1;
t.addReview(2, "jyhgfjhgf", new Date(), "jhgfjhff", ratin);
ratin["service"] = 2;
ratin["price"] = 3;
ratin["value"] = 4;
ratin["quality"] = 5;
t.addReview(1, "jyhgfjhgf", new Date(), "jhgfjhff", ratin);
console.log(t.getAverageRating());