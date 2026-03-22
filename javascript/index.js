const myObject = {
  property: "Value!",
  otherProperty: 77,
  "obnoxious property": function() {
  },
};

// dot notation
console.log(myObject.property); // "Value!"

// bracket notation
console.log(myObject["obnoxious property"]); // [Function]
