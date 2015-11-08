function bubbleSort(arr){
	var sorted = false;
	var sweeps = 0;
	var checks = 0;
	var swaps = 0;
	while (!sorted) {
		sweeps++;
		var changeMade = false;
		for (var i = 0; i<arr.length-1; i++){
			checks++;
			if (arr[i]>arr[i+1]){
				var first = arr[i];
				var second = arr[i+1];
				arr[i] = second;
				arr[i+1] = first;
				changeMade = true;
				swaps++;
			}
		}
		if (!changeMade) {sorted = !sorted};
	}
	console.log("sweeps: " + sweeps);
	console.log("checks: " + checks);
	console.log("swaps: " + swaps);
	return arr;
}

	var newArr = [];
function mergeSort(arr){
	if (arr.length!=1){
		return mergeSort([(split(arr))]);
	}
	console.log("returns: "+arr);
	return arr;
}

function merge (arr1,arr2) {
  newArr = [];
  while(arr1.length || arr2.length){
    var first  = arr1.shift() || Infinity;
    var second = arr2.shift() || Infinity;
    if (first < second){
      newArr.push(first);
      if (second < Infinity)
        arr2.unshift(second);
    }
    else {
      newArr.push(second);
      if (first < Infinity)
        arr1.unshift(first);
    }
  }
  return newArr;
}

function split(wholeArray) {
		var midpoint = Math.floor(wholeArray.length/2);
    var firstHalf = wholeArray.slice(0,midpoint);
		var secondHalf = wholeArray.slice(midpoint,wholeArray.length);
    return [firstHalf, secondHalf];
}
