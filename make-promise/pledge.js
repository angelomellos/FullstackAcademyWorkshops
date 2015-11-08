/*----------------------------------------------------------------
Promises Workshop: build the pledge.js deferral-style promise library
----------------------------------------------------------------*/
// YOUR CODE HERE:

var $Promise = function() {
	this.state = 'pending';
	this.value;
	this.handlerGroups = [];
};

$Promise.prototype.callHandlers = function(value) {
	var self = this;
	self.handlerGroups.forEach(function(elem) {
		if (self.state === 'resolved') {
			if (elem.successCb){
				try {
					if (elem.successCb(value).state){
						elem.successCb(value).resolve(value);
						console.log(elem.successCb(value).value);
					}
					else {
						elem.forwarder.resolve(elem.successCb(value));
					}
				}
			catch(e) {
				elem.forwarder.reject(e);
			}
		} else {
			elem.forwarder.resolve(value)
		}
		}
		else if (self.state === 'rejected') {
			if (elem.errorCb) {
			  try {
					elem.forwarder.resolve(elem.errorCb(value));
				}
				catch(e) {
					elem.forwarder.reject(e);
				}
		} else {
			elem.forwarder.reject(value);
		}
		}
	})
	this.handlerGroups = []
}

$Promise.prototype.catch = function(fn) {
	this.then(null, fn);
	return this.handlerGroups[this.handlerGroups.length-1].forwarder.$promise;
}
$Promise.prototype.then = function(successCb, errorCb) {
	if (typeof successCb !== 'function') successCb = undefined;
	if (typeof errorCb !== 'function') errorCb = undefined;
	this.handlerGroups.push(
		{
			successCb: successCb,
			errorCb: errorCb,
			forwarder: defer()
		});
	if (this.state === 'resolved') successCb(this.value);
	if (this.state === 'rejected' && typeof errorCb === 'function') errorCb(this.value);
	return this.handlerGroups[this.handlerGroups.length-1].forwarder.$promise;
}

var Deferral = function() {
	this.$promise = new $Promise();
};

var defer = function() {
	return new Deferral();
}

Deferral.prototype.resolve = function(val) {
	// console.log(this.$promise.handlerGroups)
	if (this.$promise.state === 'pending') {
		this.$promise.value = val;
		this.$promise.state = 'resolved';
		this.$promise.callHandlers(val)
	}
}

Deferral.prototype.reject = function(reason) {
	if (this.$promise.state === 'pending') {
		this.$promise.value = reason;
		this.$promise.state = 'rejected';
		this.$promise.callHandlers(reason);
	}
}




/*-------------------------------------------------------
The spec was designed to work with Test'Em, so we don't
actually use module.exports. But here it is for reference:

module.exports = {
  defer: defer,
};

So in a Node-based project we could write things like this:

var pledge = require('pledge');
…
var myDeferral = pledge.defer();
var myPromise1 = myDeferral.$promise;
--------------------------------------------------------*/
