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

  //Retrieving values - get kid from particular room
  get(index) {
    if (index < 0 || index >= this.length) {  //if index passed in is negative or beyond the array, throw error
      throw new Error('Index error');
    }
    return memory.get(this.ptr + index);  //get the kid that is x rooms away
  }

  //Popping values - assuming rooms all in one line, youngest kid closest to parent's room(ptr), oldest kid moves away to become a movie star in LA
  pop() {
    if (this.length == 0) {  //If length is 0, there is nothing to pop
      throw new Error('Index error');
    }
    const value = memory.get(this.ptr + this.length -1); //get the last item in the array/oldest kid
    this.length--; //decrement length by 1  --shortens the length of the array, does not delete the slot or the item--it is just no longer included in the arr.y.  It will remain until it is written over by the next item to take that slot--room is still there, just no one currently using it
    return value;
  }

  //Inserting values  -- another new baby
  insert(index, value) {
    if (index < 0 || index >= this.length) { //if index passed in is negative or beyond the array, throw error
      throw new Error('Index error');
    }
    if (this.length >= this._capacity) {
      this._resize((this.length + 1) * Array.SIZE_RATIO);  //if we are out of extra space, resize like we would before, but multiply it by whatever size ratio we have chosen based on how our quickly our array might grow
    }
    memory.copy(this.ptr + index + 1, this.ptr + index, this.length - index);  //copies items over 1 space to the right to make a space for the value being inserted... move each older kid over 1
    memory.set(this.ptr + index, value); //inserts the value into the open space ...put baby closest to parents
    this.length++; //increment length by 1
  }

  //Removing values  -- 3rd oldest kid wants to become a movie star too, so moves in with sibling in LA
  remove(index) {
    if (index < 0 || index >= this.length) { //if index passed in is negative or beyond the array, throw error
      throw new Error('Index error');
    }
    memory.copy(this.ptr + index, this.ptr + index +1, this.length - index - 1);  //copies items over 1 space to the left writing over the value being removed... move 2nd oldest kid 1 room closer to parents
    this.length--; //decrement length by 1
  }

}

Array.SIZE_RATIO = 3;  //choose our size ratio based on how quickly our array might grow

module.exports = Array;
