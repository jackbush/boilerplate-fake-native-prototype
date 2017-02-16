function Modal (baseName) {
	this.name = baseName;
	this.modalSelector = '.js-modal--' + this.name;
	this.openSelector = '.js-modal--' + this.name + '__open';
	this.closeSelector = '.js-modal--' + this.name + '__close';
}

Modal.prototype.open = function (thisModal) {
	thisModal.elModal.classList.add('open');
};

Modal.prototype.close = function (thisModal) {
	thisModal.elModal.classList.remove('open');
};

Modal.prototype.isOnPage = function () {
	return !!document.querySelector(this.openSelector);
};

Modal.prototype.getElements = function () {
	this.elModal = document.querySelector(this.modalSelector);
	this.elOpenModal = document.querySelector(this.openSelector);
	this.elCloseModal = document.querySelector(this.closeSelector);
};

Modal.prototype.init = function () {
	if (this.isOnPage()) {
		this.getElements();

		var that = this;
		this.elOpenModal.addEventListener('click', function (ev) {
			ev.preventDefault();
			that.open(that);
		});
		this.elCloseModal.addEventListener('click', function (ev) {
			ev.preventDefault();
			that.close(that);
		});
	}
};

module.exports = Modal;
