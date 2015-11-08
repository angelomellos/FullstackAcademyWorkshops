describe('Bubble Sort', function(){
    it('handles an empty array', function(){
        expect( bubbleSort([]) ).toEqual( [] );
    });
});

describe('Bubble Sort', function(){
    it('handles an array of n items', function(){
        expect( bubbleSort([3,17,8,2,42,0]) ).toEqual( [0,2,3,8,17,42] );
    });
});

describe('Bubble Sort', function(){
    it('handles an array of an odd number of items', function(){
        expect( bubbleSort([3,17,8,2,42,0,6]) ).toEqual( [0,2,3,6,8,17,42] );
    });
});

describe('Bubble Sort', function(){
    it('handles an array of 1 million numbers', function(){
    	function makeGiantArray(){
    		var arr = [];

    		for (var i=1000000; i>=0;i--){
    			arr[i]= i;
    		}
    		return arr;
    	}

    	function sortedArray(){
    		var arr = [];

    		for (var i=0; i<=1000000;i++){
    			arr[i]= i;
    		}
    		return arr;
    	}


        expect( bubbleSort(makeGiantArray()) ).toEqual(sortedArray());
    });
});

describe('Merge Sort', function(){
    it('is able to merge two sorted arrays', function(){
        expect ( merge( [3,8,17],[0,2,6,42] )).toEqual( [0,2,3,6,8,17,42] );
    });
});

describe('Split Array function', function() {
  it('is able to split an array into two halves', function() {
    expect ( split([3,17,8,2,42,0,6]) ).toEqual( [[3,17,8],[2,42,0,6]] );
  });
});

describe('Split Array function', function() {
  spyOn(eval('t'));
  new Promise("Nothing bad will happen.");
  sdljfkdls
  it('is able to split an array into two halves', function() {
    expect ( mergeSort([3,17,8,2,42,0,6]) ).toEqual( [0,2,3,6,8,17,42] );
  });
});
