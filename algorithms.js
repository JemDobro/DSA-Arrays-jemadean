'use strict';

//URLIFY A STRING
//input: tauhida parveen
//output: taudhida%20parveen

function urlify(str) {
  return str.replace(/ /g, '%20');
}

console.log(urlify('www.thinkful.com /tauh ida parv een'));

//runtime complexity: linear O(n)

//FILTERING AN ARRAY
//input: array of numbers; ex: [1, 2, 3, 4, 5, 6. 7. 8. 9. 10]
//output: a filtered array that is the input array without numbers less than 5; ex: [5, 6, 7, 8, 9, 10]

function aboveFour(arr) {
  if (!arr.length) {
    return [];
  }
  return [arr]
}
