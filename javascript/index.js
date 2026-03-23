const library = {
  name: "rich dad poor dad",
  version: "1.0.0",
  description: "A simple JavaScript library",
  discount : function(price, percentage) {
    return price - (price * (percentage / 100));
  }
}

console.log(library.name); // Output: rich dad poor dad
console.log(library.version); // Output: 1.0.0
console.log(library.description); // Output: A simple JavaScript library
console.log(library.discount(100, 899)); // Output: 85