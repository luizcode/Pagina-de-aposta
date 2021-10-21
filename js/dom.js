(function (doc, win) {
	'use strict';
	function DOM (elements) {
		if (!(this instanceof DOM)) {
		  return new DOM(elements);
		}
		this.element = doc.querySelectorAll(elements);
	  }
	DOM.prototype.on = function (eventType, callbackEvent) {
		Array.prototype.map.call(this.element, function (element) {
			element.addEventListener(eventType, callbackEvent);
		});
	};
	DOM.prototype.off = function (eventType, callbackEvent) {
		Array.prototype.map.call(this.element, function (element) {
			element.removeEventListener(eventType, callbackEvent);
		});
	};
	DOM.prototype.get = function (index) {
		if (this.element.length === 1 || index === undefined) {
			return this.element[0];
		}
		return this.element[index];
	};
	DOM.prototype.forEach = function (callbackEvent) {
		return Array.prototype.forEach.call(this.element, callbackEvent);
	};
	DOM.prototype.map = function (callbackEvent) {
		return Array.prototype.map.call(this.element, callbackEvent);
	};
	DOM.prototype.filter = function (callbackEvent) {
		return Array.prototype.filter.call(this.element, callbackEvent);
	};
	DOM.prototype.reduce = function (callbackEvent) {
		return Array.prototype.reduce.call(this.element, callbackEvent);
	};
	DOM.prototype.reduceRight = function (callbackEvent) {
		return Array.prototype.reduceRight.call(this.element, callbackEvent);
	};
	DOM.prototype.every = function (callbackEvent) {
		return Array.prototype.every.call(this.element, callbackEvent);
	};
	DOM.prototype.some = function (callbackEvent) {
		return Array.prototype.some.call(this.element, callbackEvent);
	};
	DOM.getType = function getType(item) {
		return Object.prototype.toString.call(item);
	};
	DOM.isArray = function (item) {
		return DOM.getType(item) === '[object Array]';
	};
	DOM.isFunction = function isFunction(item) {
		return DOM.getType(item) === '[object Function]';
	};
	DOM.isNumber = function isNumber(item) {
		return DOM.getType(item) === '[object Number]';
	};
	DOM.isString = function isString(item) {
		return DOM.getType(item) === '[object String]';
	};
	DOM.isBoolean = function isBoolean(item) {
		return DOM.getType(item) === '[object Boolean]';
	};

	DOM.isNull = function isNull(item) {
		return (
			DOM.getType(item) === '[object Null]' ||
			DOM.getType(item) === '[object Undefined]'
		);
	};
	win.dom = DOM;
})(document, window);
