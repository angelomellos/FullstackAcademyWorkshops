function createCalculator(){
  var obj = {
      val: 0,
      value : function (){return this.val;},
      add : function(a){this.val += a;},
      subtract : function(a){this.val -= a;},
      };
  return obj;
  };
