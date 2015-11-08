var Hash = function() {
    this.numBuckets = 25;
    this.buckets = [];

};

Hash.prototype.set = function(key,val) {
  if (typeof key != 'string'){
    throw new Error('Keys must be strings');
  }
  var hash = this._hash(key);
  if (this.buckets[hash]){
    if (this.buckets[hash][0]===key){
      this.buckets[hash] = [key,val];
    }
    return this.buckets[hash+this.linearProbeSet(hash,key)] = [key,val];

  }
  this.buckets[hash] = [key,val];
};

Hash.prototype.get = function(key) {
  var hash = this._hash(key);
  if (this.buckets[hash][0]!=key){
    var t = this.buckets[hash+this.linearProbeGet(hash,key)];
    return t[1];
  }
  return this.buckets[hash][1];
};

Hash.prototype.hasKey = function(key) {
  for (var i=0;i<this.buckets.length;i++){
    if (this.buckets[i] && this.buckets[i][0] === key){
      return true;
    }
  }
  return false;
};

Hash.prototype._hash = function(str) {
      var total = 0;
      for (var i =0; i<str.length; i++) {
          total += str.charCodeAt(i);
      }
      return total%this.numBuckets;
};

Hash.prototype.linearProbeGet = function(hash,key) {
  var offset = 1;
  while(this.buckets[hash+offset][0]!==key){
    offset++;
    roffset++;
    if (hash+offset>25){
      offset = -25;
    }
  }
  return offset;
};

Hash.prototype.linearProbeSet = function(hash,key) {
  var offset = 1;
  while(this.buckets[hash+offset]){
    offset++;
    roffset++;
    if (hash+offset>25){
      offset = -25;
    }
  }
  return offset;
};
