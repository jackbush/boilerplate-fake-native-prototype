/* global NodeList, DOMTokenList */

// For Safari/iOS
NodeList.prototype.forEach = Array.prototype.forEach;
DOMTokenList.prototype.forEach = Array.prototype.forEach;

// _init modules export a function to run when
// the DOM is ready
var runOnUpdate = [];
runOnUpdate.push(require('./_initModals'));
runOnUpdate.push(require('./_initPages'));

// Wrap the above in a function that can be passed as
// a callback when the DOM is modified :)
function preparePage () {
	runOnUpdate.forEach(function (call) {
		call();
	});
}

// State obj is attached to the window and has an update()
// function, which can be called when the DOM is modified
// to add event listeners to the new content!

var State = require('./__State.js');
window.pageState = new State(preparePage);
window.pageState.init();
