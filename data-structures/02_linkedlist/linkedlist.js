'use strict';

function LinkedList () {
}


function Node (value, previous, next) {
  this.value = value;
  this.next = next || null;
  this.previous = previous || null;
}

LinkedList.prototype.addToTail = function (input) {
  var newTail = new Node(input, this.tail);
  if (this.tail) this.tail.next = newTail;
  else this.head = newTail;
  this.tail = newTail;
};

LinkedList.prototype.addToHead = function (input) {
  //create a new node with the current head as its next
  //if there is a current head then set it's previous to the new node
  //otherwise set the current tail to the new node
  //finally set the current head to the new node
  var newHead = new Node(input, null, this.head);
  if (this.head) this.head.previous = newHead;
  else this.tail = newHead;
  this.head = newHead;
};

LinkedList.prototype.removeHead= function () {
  //if there is no head return undefined
  //store the value of the old head
  //set the current head to the next of the current head
  //if there is no next of the current head then set the tail to null
  //otherwise set the current head's previous to null
  //return the value of the old head
  if (!this.head) return;
  var oldHeadValue = this.head.value;
  this.head = this.head.next;
  if (!this.head) this.tail = null;
  else this.head.previous = null;
  return oldHeadValue;

};

LinkedList.prototype.removeTail= function () {
  if (!this.tail) return;
  var oldTailValue = this.tail.value;
  this.tail = this.tail.previous;
  if (!this.tail) this.head = null;
  else this.tail.next = null;
  return oldTailValue;
};

LinkedList.prototype.search = function (input) {
  var currentNode = this.head;
  if (typeof input === 'function'){
    while(currentNode){
      if (input(currentNode)) return currentNode.value;
      currentNode = currentNode.next;
    }
  }
  else {
    while(currentNode){
      if (currentNode.value === input) return currentNode.value;
      currentNode = Node.next;
    }
  }
};
