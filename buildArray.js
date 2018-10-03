'use strict';
const memoryClass = require ('./memory');
const memory = new memoryClass();

class Array {
  constructor() {  //initialize private variables to be used within this class
    this.length = 0;  //length is 0
    this.ptr = memory.allocate(this.length);  //initially this is a pointer to zero blocks of memory
}

//Pushing a new element to end of array
push(value) {
  this._resize(this.length +1);  //resizes the array to create space for one more element
  memory.set(this.ptr + this.length, value); //sets the memory at the pointer plus the length to be equal to the value
  this.length++; //increments the length by one
}

//This _resize function will allocate a new larger chunk of memory, copy any existing values from the old to the new chunk, and free the old chunk.  Like having a kid and needing to move everything into a new house, release the old house for someone else to live in.
_resize(size) {
  const oldPtr = this.ptr; //you now start thinking of your house as the old house because you need a new bigger house
  this.ptr = memory.allocate(size); //you are requesting that your real estate agent find you a new house of the correct size
  if (this.ptr === null) {   //if there are no homes of your requested size available, agent says "we're out"
    throw new Error ('Out of memory');
  }
  memory.copy(this.ptr, oldPtr, this.length); //agent found you the perfect size home! Move everything from your old house, including new kid, into your new house, and it all just fits perfectly....don't have another kid though, or you have to move again
  memory.free(oldPtr); //release the new house, now available for someone else to move in
}

//This has linear run time complexity O(n) -- it is very time consuming every time you have a kid!