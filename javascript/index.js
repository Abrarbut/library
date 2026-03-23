const library = {
  name: "rich dad poor dad",
  version: "1.0.0",
  description: "A simple JavaScript library",
  final : 100,
  price: 50,
  percentage: 50,
  discount : function(price, percentage) {

    this.final =  price - (price * (percentage / 100));
  }
}

library.discount(library.price, library.percentage);

console.log(library.name); // Output: rich dad poor dad
console.log(library.version); // Output: 1.0.0
console.log(library.description); // Output: A simple JavaScript library
console.log(library.final); // Output: 85