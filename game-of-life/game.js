var gameOfLife = {
  width: 12,
  height: 12,
  stepInterval: 500,
  autoplay: null,

  createAndShowBoard: function () {
    // create <table> element
    var goltable = document.createElement("tbody");
    // build Table HTML
    var tablehtml = '';
    for (var h=0; h<this.height; h++) {
      tablehtml += "<tr id='row+" + h + "'>";
      for (var w=0; w<this.width; w++) {
        tablehtml += "<td data-status='dead' id='" + w + "-" + h + "'></td>";
      }
      tablehtml += "</tr>";
    }
    goltable.innerHTML = tablehtml;

    // add table to the #board element
    var board = document.getElementById('board');
    board.appendChild(goltable);

    // once html elements are added to the page, attach events to them
    this.setupBoardEvents();
  },

  forEachCell: function (iteratorFunc) {
    /*
      Write forEachCell here. You will have to visit
      each cell on the board, call the "iteratorFunc" function,
      and pass into func, the cell and the cell's x & y
      coordinates. For example: iteratorFunc(cell, x, y)
    */
    for (var h = 0; h < this.height; h++) {
      for (var w = 0; w < this.width; w++) {
        var cell = document.getElementById(w+"-"+h);
        iteratorFunc(cell);
      }
    }
  },

  setupBoardEvents: function() {
    // each board cell has an CSS id in the format of: "x-y"
    // where x is the x-coordinate and y the y-coordinate
    // use this fact to loop through all the ids and assign
    // them "on-click" events that allow a user to click on
    // cells to setup the initial state of the game
    // before clicking "Step" or "Auto-Play"

    var onCellClick = function () {
      //console.log(this);
      // QUESTION TO ASK YOURSELF: What is "this" equal to here?
      // how to set the style of the cell when it's clicked
      if (this.getAttribute('data-status') == 'dead') {
        this.className = "alive";
        this.setAttribute('data-status', 'alive');
      } else {
        this.className = "dead";
        this.setAttribute('data-status', 'dead');
      }
    };

    for (var i = 0; i < this.height; i++) {
      for (var j = 0; j < this.width; j++) {
        document.getElementById(i+"-"+j).addEventListener(
          "click", onCellClick);
      }
    }
    // clicking on a cell should toggle the cell between "alive" & "dead"
    // for ex: an "alive" cell be colored "blue", a dead cell could stay white

    // EXAMPLE FOR ONE CELL
    // Here is how we would catch a click event on just the 0-0 cell
    // You need to add the click event on EVERY cell on the board




  },

  step: function () {
    // Here is where you want to loop through all the cells
    // on the board and determine, based on it's neighbors,
    // whether the cell should be dead or alive in the next
    // evolution of the game.
    //
    // You need to:
    // 1. Count alive neighbors for all cells
    // 2. Set the next state of all cells based on their alive neighbors
    liveOrDie = [];
    for (var i = 0; i < this.height; i++) {
      for (var j = 0; j < this.width; j++) {
        var cell = document.getElementById(i+"-"+j);
        var currentNeighbors = gameOfLife.findNeighbors(cell);
        var nlength = currentNeighbors.filter(function(neighbor){
          if (neighbor){
          return neighbor.getAttribute('data-status') == "alive";
        }else {
          return false;
        }
        }).length;
        if (cell.getAttribute("data-status") === "alive" && nlength === 2 ||
            cell.getAttribute("data-status") === "alive" && nlength === 3){
          liveOrDie.push("alive");
        }
        if (cell.getAttribute("data-status") === "alive" && nlength < 2 ||
            cell.getAttribute("data-status") === "alive" && nlength > 3) {
          liveOrDie.push("dead");
        }
        if (cell.getAttribute("data-status") === "dead" && nlength === 3){
          liveOrDie.push("alive");
        }
        else {
          liveOrDie.push("dead");
        }

      }

  }
  for (var i = 0; i < this.height; i++) {
    for (var j = 0; j < this.width; j++) {
      var cell = document.getElementById(i+"-"+j);
      var status = liveOrDie.shift();
      cell.className = status;
      cell.setAttribute("data-status",status);
    }
  }
},

  findNeighbors: function (cell){
    var cellX = +cell.id[0];
    var cellY = +cell.id[2];
    var neighbors = [];
    for (var x = -1; x <= 1; x+=1) {
      for (var y = -1; y <= 1; y+=1) {
        if (cellX === cellX+x && cellY === cellY+y){
          continue;
        }
        neighbors.push(document.getElementById((cellX+x)+"-"+(cellY+y)));
      }
    }
    return neighbors;
  },

  enableAutoPlay: function () {
    this.autoplay = setInterval(gameOfLife.step.bind(this), this.stepInterval);
  },

  clear: function(){
    clearInterval(this.autoplay);
    this.forEachCell(this.clearCell);
  },

  clearCell: function(cell){
    cell.className = 'dead';
    cell.setAttribute("data-status",'dead');
  },

  resetRandom: function(){
    clearInterval(this.autoplay);
    this.forEachCell(this.setCellStatus.bind(this));
  },

  randomState: function() {
    var rand = Math.random();
    if (rand>=0.5) {return 'alive';}
    return 'dead';
  },

  setCellStatus: function(cell){
    var status = this.randomState();
    cell.className = status;
    cell.setAttribute("data-status",status);
  }

};

  gameOfLife.createAndShowBoard();
