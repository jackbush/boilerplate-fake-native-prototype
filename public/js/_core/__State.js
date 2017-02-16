function State (updateFunction) {
	this.current = 0;
	this.onUpdate = updateFunction;
}

State.prototype.init = function () {
	this.current = 1;
	this.onUpdate();
};

State.prototype.update = function () {
	this.current += 1;
	this.onUpdate();
};

module.exports = State;
