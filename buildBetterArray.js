'use strict';
const memoryClass = require ('./memory');
const memory = new memoryClass();

class Array {
  constructor() {
    this.length = 0;
    this._capacity = 0;  //now adding _capacity so when we resize we can reserve more space than we currently need...that way we can have more kids or buy more stuff in the future without having to move 
    this.ptr = memory.allocate(this.length);
  }

  //push an element to the end of the array, and reserve extra space
  push(value) {
    if (this.length >= this._capacity) {
      this._resize((this.length + 1) * Array.SIZE_RATIO);  //if we are out of extra space, resize like we would before, but multiply it by whatever size ratio we have chosen based on how our quickly our array might grow
    }
    memory.set(this.ptr + this.length, value); 
    this.length++;  
  }

  _resize(size) {
    const oldPtr = this.ptr;
    this.ptr = memory.allocate(size);
    if (this.ptr === null) {
      throw new Error ('Out of memory');
    }
    memory.copy(this.ptr, oldPtr, this.length);
    memory.free(oldPtr);
    this._capacity = size; //when you call _resize, be sure to pass in the size you want with space to grow into (if you want 3 kids, buy a house that can hold all three kids if you don't want to move later), this size is your _capacity.
  }
}

Array.SIZE_RATIO = 3;  //choose our size ratio based on how quickly our array might grow

function main() {
  Array.SIZE_RATIO = 3;
  let arr = new Array();
  arr.push(3);
  arr.push(5);
  arr.push(15);
  arr.push(19);
  arr.push(45);
  arr.push(10);
  console.log(arr);
}

main();