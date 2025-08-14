// methods for arrya  map , filter , find , indexOf
// 1. map 

let array = [1, 2, 3, 4, 5, 6];
console.log("input Array ::", array);

let newMap = array.map((items) => {
      return items + 1;
});
console.log("map output ::", newMap);

// 2. filter
let newFilter = array.filter((items) => {
      return items > 2;
});
console.log("Filter Array ::", newFilter);

// 3. find 
 
let newFind = array.find((items) => {
      return items === 3;
});
console.log("Find Array ::", newFind);