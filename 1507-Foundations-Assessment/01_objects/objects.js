function Vehicle(plate, color){
  this.licensePlate = plate;
  this.color = color;
}

Vehicle.prototype.beep = function() {
  return "BEEP, BEEP";
}

Vehicle.prototype.changeColor = function(color) {
  this.color = color;
}

function Truck(plate,color,trans){
  Vehicle.call(this,plate,color);
  this.transmission = trans;
}

Truck.prototype.changeColor = function(color) {
  this.color = color;
}
