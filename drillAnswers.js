'use strict';
const arrayClass = require ('./buildBetterArray');
const array = new arrayClass();

function main() {
  array.SIZE_RATIO = 3;
  let arr = new arrayClass();
  arr.push("tauhida");
  console.log(arr.get(0));
}

main();



// Length, capacity, memory address of:
  // 1) arr.push(3): Array { length: 1, _capacity: 3, ptr: 0 }
  // 2) after adding
  //    arr.push(5);
  //    arr.push(15);
  //    arr.push(19);
  //    arr.push(45);
  //    arr.push(10);
  //                : Array { length: 6, _capacity: 12, ptr: 3 }
  //                  capacity was exceeded when we tried to add the 4th item, so resized at 4*3 for new
  //                  _capacity of 12, and moved everything to a new location of ptr: 3, then added the last 2
  //                  items
  // 3) after adding
  //    arr.pop();
  //    arr.pop();
  //    arr.pop();
  //                : Array { length: 3, _capacity: 12, ptr: 3 }
  //                  removing the last three items, length is decremented by 3, capacity and ptr stay the same
  // 4) This will print 3, the first item in the array:
  // function main() {
  //   array.SIZE_RATIO = 3;
  //   let arr = new arrayClass();
  //   arr.push(3);
  //   arr.push(5);
  //   arr.push(15);
  //   arr.push(19);
  //   arr.push(45);
  //   arr.push(10);
  //   arr.pop();
  //   arr.pop();
  //   arr.pop();
  //   console.log(arr.get(0));
  // }

  // main();

  // 5) My results if I console.log(arr): Array { length: 1, _capacity: 3, ptr: 0 }
  //        adding one item to an empty area triggers a resize with a size ratio of 3, so length is 1 and 
  //        capacity is 3
  //    My results if I console.log(arr.get(0)): NaN --- I have no idea why that would happen when the index is and pointer are 0.  It should return the value at the ptr memory address, which should be the string 'tauhida', shouldn't it?  Is this what you are asking about?

  // 6) The purpose of my _resize() function is to reserve a new larger chunk of memory with extra capacity that I can use in the future so I can improve my performance over reserving just exactly the memory I need at the moment, and then having to move locations every time I add to my array. The function finds a new location for my larger array and capacity, and it  will copy any existing values from the old to the new chunk, and free the old chunk.  