/* global XMLHttpRequest */

var Link = require('./__Link');

function Page (selector) {
	this.selector = selector;
	this.linkSelector = selector + '__link';

	this.container = document.querySelector(selector);
}

Page.prototype.getLinks = function () {
	return document.querySelectorAll(this.linkSelector);
};

Page.prototype.fetchNext = function (href) {
	return new Promise(function (resolve, reject) {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', href, true);

		// Set this header so the viewConfig middleware knows
		// to just send what needs to be hot-loaded
		xhr.setRequestHeader('xhr', 'true');

		xhr.onload = function () {
			if (xhr.status === 200) {
				resolve(xhr.responseText);
			} else {
				reject(Error(xhr.statusText));
			}
		};

		xhr.onerror = function () {
			reject(Error('Network Error'));
		};

		xhr.send();
	});
};

Page.prototype.update = function (ev, thisPage) {
	var target = ev.currentTarget.dataset.target;

	thisPage.fetchNext(target).then(function (data, err) {
		if (err) console.log(err);
		else {
			thisPage.container.innerHTML = data;
			window.pageState.update();
		}
	});
};

Page.prototype.init = function () {
	this.links = this.getLinks();
	var that = this;

	this.links.forEach(function (link) {
		link = new Link(link);
		link.init();
		link.el.addEventListener('click', function (ev) {
			that.update(ev, that);
		});
	});
};

module.exports = Page;
