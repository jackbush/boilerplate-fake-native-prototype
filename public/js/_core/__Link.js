function Link (el) {
	this.el = el;
	this.target = el.href;
	this.content = el.innerHTML;
	this.classes = el.classList;
}

Link.prototype.init = function () {
	// Add attributes to a new span
	var newEl = document.createElement('span');
	newEl.dataset.target = this.target;
	newEl.innerHTML = this.content;
	this.classes.forEach(function (className) {
		newEl.classList.add(className);
	});

	// And this, so we get the right cursor type
	newEl.classList.add('cursor--pointer');

	// Replace in DOM
	this.el.parentNode.replaceChild(newEl, this.el);

	// Replace in model
	this.el = newEl;
};

module.exports = Link;
