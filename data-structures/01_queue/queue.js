function Queue() {
   this.head = 0;
   this.tail = 0;
   this.stuff = [];
}
//whenever you enqueue you increment the tail, whenever you dequeue you increment the head
Queue.prototype.enqueue = function (valToPut) {
  this.stuff[this.tail++] = valToPut;
};

Queue.prototype.dequeue = function () {
  if (!this.size()) return;
  return this.stuff[this.head++];
};

Queue.prototype.size = function () {
  return this.tail - this.head;
};
