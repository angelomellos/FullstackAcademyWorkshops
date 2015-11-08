'use strict';
/* global Queue Stack LinkedList HashTable */
// Data Structures Review Week Mini-Assessment

// For Queus and Stacks: use any array methods (pop/push/shift/unshift).
// If you have time at the end, you can attempt index-only solutions.

describe('A queue', function(){

  var queue, uniqueObj = { id: 123 };
  beforeEach(function(){
    queue = new Queue();
  });

  it('adds and removes an item', function(){
    queue.add(uniqueObj);
    expect(queue.remove()).toBe(uniqueObj);
  });

  it('returns `undefined` on underflow (empty)', function(){
    expect(queue.remove()).toBe(undefined);
  });

  // FIFO: First In, First Out
  it('adds and removes three items in a FIFO way', function(){
    queue.add(5).add(uniqueObj).add('fullstack');
    expect(queue.remove()).toBe(5);
    expect(queue.remove()).toBe(uniqueObj);
    expect(queue.remove()).toBe('fullstack');
    expect(queue.remove()).toBe(undefined);
  });

  it('can handle interspersed add and remove', function(){
    queue.add(1);
    expect(queue.remove()).toBe(1);
    queue.add(2).add(3);
    expect(queue.remove()).toBe(2);
    queue.add(4);
    expect(queue.remove()).toBe(3);
    expect(queue.remove()).toBe(4);
    expect(queue.remove()).toBe(undefined);
  });

  // no globals!
  it('adds and removes its own items', function(){
    var q2 = new Queue();
    queue.add('fullstack');
    q2.add('JavaScript');
    expect(q2.remove()).toBe('JavaScript');
    expect(q2.remove()).toBe(undefined);
    expect(queue.remove()).toBe('fullstack');
    expect(queue.remove()).toBe(undefined);
  });

});

describe('A stack', function(){

  var stack, uniqueObj = { id: 456 };
  beforeEach(function(){
    stack = new Stack();
  });

  it('adds and removes an item', function(){
    stack.add(uniqueObj);
    expect(stack.remove()).toBe(uniqueObj);
  });

  it('returns `undefined` on underflow (empty)', function(){
    expect(stack.remove()).toBe(undefined);
  });

  // LIFO: Last In, First Out
  it('adds and removes three items in a LIFO way', function(){
    stack.add(5).add(uniqueObj).add('fullstack');
    expect(stack.remove()).toBe('fullstack');
    expect(stack.remove()).toBe(uniqueObj);
    expect(stack.remove()).toBe(5);
    expect(stack.remove()).toBe(undefined);
  });

  it('can handle interspersed add and remove', function(){
    stack.add(1);
    expect(stack.remove()).toBe(1);
    stack.add(2).add(3);
    expect(stack.remove()).toBe(3);
    stack.add(4);
    expect(stack.remove()).toBe(4);
    expect(stack.remove()).toBe(2);
    expect(stack.remove()).toBe(undefined);
  });

  // no globals!
  it('adds and removes its own items', function(){
    var s2 = new Stack();
    stack.add('fullstack');
    s2.add('JavaScript');
    expect(stack.remove()).toBe('fullstack');
    expect(stack.remove()).toBe(undefined);
    expect(s2.remove()).toBe('JavaScript');
    expect(s2.remove()).toBe(undefined);
  });

});

describe('A doubly-linked list', function(){

  var list, uniqueObj = { id: 789 };
  beforeEach(function(){
    list = new LinkedList();
  });

  it('can add to the tail', function(){
    list.addToTail(uniqueObj);
    expect(list.head).toBe(list.tail);
    expect(list.tail).toEqual({
      item: uniqueObj,
      next: null,
      prev: null
    });
  });

  it('can add two items', function(){
    list.addToTail('first').addToTail('second');
    expect(list.head).toEqual({
      item: 'first',
      next: list.tail,
      prev: null
    });
    expect(list.tail).toEqual({
      item: 'second',
      next: null,
      prev: list.head
    });
  });

  it('can add multiple items', function(){
    list.addToTail(1).addToTail(2).addToTail(3);
    expect(list.head.prev).toBe(null);
    expect(list.tail.next).toBe(null);
    expect(list.head.item).toBe(1);
    expect(list.head.next.item).toBe(2);
    expect(list.head.next.next.item).toBe(3);
    expect(list.tail).toBe(list.head.next.next);
    expect(list.tail.prev).toBe(list.head.next);
    expect(list.tail.prev.prev).toBe(list.head);
  });

  it('can remove items cleanly', function(){
    list.addToTail(500).addToTail(404).addToTail(200);
    console.log(list.tail);
    expect(list.removeFromTail()).toBe(200);
    expect(list.tail.next).toBe(null);
    expect(list.removeFromTail()).toBe(404);
    expect(list.tail.next).toBe(null);
    expect(list.removeFromTail()).toBe(500);
    expect(list.head).toBe(null);
    expect(list.removeFromTail()).toBe(undefined);
  });

  // if you have problems with this spec, move on to `Hash`. However,
  // this `forEach` method can help with the final `Hash` spec.
  it('can call a function on each node item', function(){
    list.addToTail('Gandalf')
        .addToTail('Dumbledore')
        .addToTail('Merlin');
    var initials = [];
    list.forEach(function(item){
      initials.push(item[0]);
    });
    // this is the main test...
    expect(initials).toEqual(['G', 'D', 'M']);
    // ...but also, don't mutate your list!
    expect(list.head.item).toBe('Gandalf');
    expect(list.head.next.item).toBe('Dumbledore');
    expect(list.head.next.next.item).toBe('Merlin');
  });

});

// This suite requires a (mostly) working `LinkedList`. If you have
// problems on the last spec of LL, you can proceed. Fair warning,
// the last spec of `Hash` is easier with a working LL `forEach`.
describe('A hash table', function(){

  var hashTable;
  beforeEach(function(){
    hashTable = new HashTable();
  });

  it('has linked lists in each bucket', function(){
    for (var i = 0; i < hashTable.buckets.length; i++) {
      expect(hashTable.buckets[i] instanceof LinkedList).toBe(true);
    }
  });

  it('uses a hashing function to add hash nodes to the correct linked list', function(){
    hashTable.set('name', 'Harry Potter');
    // `hash('name')` returns 17
    // use the linked list `addToTail`
    // you'll need to put a hash node inside a linked list node
    expect(hashTable.buckets[17].head.item).toEqual({
      key:   'name',
      value: 'Harry Potter'
    });
  });

  it('can add multiple items', function(){
    hashTable.set('house', 'Gryffindor').set('glasses', true);
    expect(hashTable.buckets[ 8].head.item.value).toBe('Gryffindor');
    expect(hashTable.buckets[14].head.item.value).toBe(true);
  });

  it('handles collision by adding to the list', function(){
    hashTable.set('node', 'Pearl St.').set('done', 'Hanover Sq.');
    // 'node' and 'done' both `hash()` to the number 2!
    var head = hashTable.buckets[2].head;
    expect(head.item.value).toBe('Pearl St.');
    expect(head.next.item.value).toBe('Hanover Sq.');
  });

  it('returns items based on their key', function(){
    hashTable.set('status', 200).set('message', 'success');
    expect(hashTable.get('status')).toBe(200);
    expect(hashTable.get('message')).toBe('success');
  });

  it('returns the most recent value for a given key', function(){
    // both 'year' and 'discount' hash to 13
    hashTable.set('year', 'MMXV').set('year', 2015).set('discount', true);
    // hint: use the linked list `forEach` method
    expect(hashTable.get('year')).toBe(2015);
  });

});
