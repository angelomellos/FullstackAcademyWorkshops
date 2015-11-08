'use strict';
/*
Fill in your own code where you see "your code here".
You can insert new lines at those locations, but you
will not need to edit the lines above and below them.
*/

//-----------------------------------------
// Queues

function Queue() {
   this.head = 0;
   this.tail = 0;
   this.stuff = [];
}
//whenever you enqueue you increment the tail, whenever you dequeue you increment the head
Queue.prototype.add = function (valToPut) {
  this.stuff[this.tail++] = valToPut;
  return this;
};

Queue.prototype.remove = function () {
  if (!this.size()) return;
  return this.stuff[this.head++];
};

Queue.prototype.size = function () {
  return this.tail - this.head;
};

//-----------------------------------------
// Stacks

function Stack() {
  this.head = 0;
  this.tail = 0;
  this.stuff = [];
}

Stack.prototype.add = function(item) {
  this.stuff[this.head++] = item;
  return this; // for chaining, do not edit
};

Stack.prototype.remove = function() {
  return this.stuff[(this.head--)-1];
};

//-----------------------------------------
// Linked lists

function LinkedList () {
  this.head = this.tail = null;
}

function ListNode (item, prev, next) {
  this.item = item;
  this.next = next || null;
  this.prev = prev || null;
}

LinkedList.prototype.addToTail = function(item) {
  var newTail = new ListNode(item,this.tail);
  if (this.tail) this.tail.next = newTail;
  else this.head = newTail;
  this.tail = newTail;
  return this; // for chaining, do not edit
};


LinkedList.prototype.addToHead = function(item) {
  var newHead = new ListNode(item,null,this.head);
  if (this.head) this.head.previous = newHead;
  else this.tail = newHead;
  this.head = newHead;
  return this; // for chaining, do not edit
};

LinkedList.prototype.removeFromTail = function() {
  if (!this.tail) return;
  var oldTail = this.tail;
  var newTail = oldTail.previous;
  if (!newTail) this.head = null;
  else newTail.next = null;
  this.tail = newTail;
  return oldTail.item;
};


LinkedList.prototype.removeFromHead = function() {
  if (!this.head) return;
  var oldHead = this.head;
  var newHead = oldHead.next;
  if (!newHead) this.tail = null;
  else newHead.previous = null;
  this.head = newHead;
  return oldHead.item;
};

LinkedList.prototype.forEach = function(iterator) {
  var nextItem = this.head;
  while(nextItem){
    iterator(nextItem.item);
    nextItem = nextItem.next || false;
  }
};

//-----------------------------------------
// Hash tables

function hash (key) {
  var hashedKey = 0;
  for (var i = 0; i < key.length; i++) {
    hashedKey += key.charCodeAt(i);
  }
  return hashedKey % 20;
}

function HashNode (key, value) {
  this.key = key;
  this.value = value;
}

function HashTable () {
  this.buckets = Array(20);
  for (var i = 0; i < this.buckets.length; i++) {
    this.buckets[i] = new LinkedList();
  }
  // your code here
}

HashTable.prototype.set = function(key, value) {
  var bucket = hash(key);
  if (!this.buckets[bucket].tail - !this.buckets[bucket].head) {
    this.buckets[bucket].addToHead({key: key, value: value});
  }
  else this.buckets[bucket].addToTail({key: key, value: value});
  return this; // for chaining, do not edit
};

HashTable.prototype.get = function(key) {
  var bucket = hash(key);
  // var bucketHead = this.buckets[bucket].head;
  // while (bucketHead) {
  //   var thingToReturn = bucketHead;
  //   bucketHead = bucketHead.next;
  // }
  // return thingToReturn.item.value;
  if (this.buckets[bucket].head.item.key === key)
    return this.buckets[bucket].head.item.value;
  else {
    return this.buckets[bucket].head.next.item.value;
  }
};
