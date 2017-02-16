var Modal = require('./__Modal');

function getModalNames () {
	var modalNames = [];
	document.querySelectorAll('.js-modal').forEach(function (modal) {
		modal.classList.forEach(function (className) {
			if (className.indexOf('js-modal--') > -1) {
				var modalName = className.split('js-modal--')[1];
				modalNames.push(modalName);
			}
		});
	});

	return modalNames;
}

module.exports = function initModals () {
	var modalNames = getModalNames();

	modalNames.forEach(function (baseName) {
		var modal = new Modal(baseName);
		modal.init();
	});
};
