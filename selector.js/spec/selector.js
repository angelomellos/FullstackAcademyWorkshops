var traverseDomAndCollectElements = function(matchFunc, startEl) {
  var resultSet = [];

  if (typeof startEl === "undefined") {
    startEl = document.body;
  }


  return resultSet;
};


// detect and return the type of selector
// return one of these types: id, class, tag.class, tag
//
var selectorTypeMatcher = function(selector) {
  var firstChar = selector.slice(0,1);
  if (firstChar === "#"){
    return "id";
  }
  else if (selector.indexOf(".")>0){
    return "tag.class";
  }
  else if (firstChar === "."){
    return "class";
  }
  else {
    return "tag";
  }
};


// NOTE ABOUT THE MATCH FUNCTION
// remember, the returned matchFunction takes an *element* as a
// parameter and returns true/false depending on if that element
// matches the selector.

var matchFunctionMaker = function(selector) {
  var selectorType = selectorTypeMatcher(selector);
  var matchFunction;
  if (selectorType === "id") {
    matchFunction = function (element) {
      return selector.slice(1) === element.id;
    }

  } else if (selectorType === "class") {
    matchFunction = function (element) {
      var arrayOfClasses = element.className.split(" ");
      arrayOfClasses.forEach()
    }

  } else if (selectorType === "tag.class") {
    matchFunction = function (element) {
      //return "tag.class" === element's tag + "." + element.class
      return selector === element.tagName + "." + element.className;
    }

  } else if (selectorType === "tag") {
    matchFunction = function (element) {
      return selectorType === element.tagName;
    }

  }
  return matchFunction;
};

var $ = function(selector) {
  var elements;
  var selectorMatchFunc = matchFunctionMaker(selector);
  elements = traverseDomAndCollectElements(selectorMatchFunc);
  return elements;
};
