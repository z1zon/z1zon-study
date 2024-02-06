/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/iterator/Array.ts":
/*!*******************************!*\
  !*** ./src/iterator/Array.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ArrayIterator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ArrayIterator */ "./src/iterator/ArrayIterator.ts");

var Array = /** @class */ (function () {
    function Array(items) {
        this.items = items;
    }
    Array.prototype.getItem = function (index) {
        return this.items[index];
    };
    Object.defineProperty(Array.prototype, "count", {
        get: function () {
            return this.items.length;
        },
        enumerable: false,
        configurable: true
    });
    Array.prototype.iterator = function () {
        return new _ArrayIterator__WEBPACK_IMPORTED_MODULE_0__["default"](this);
    };
    return Array;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Array);


/***/ }),

/***/ "./src/iterator/ArrayIterator.ts":
/*!***************************************!*\
  !*** ./src/iterator/ArrayIterator.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var ArrayIterator = /** @class */ (function () {
    function ArrayIterator(array) {
        this.array = array;
        this.index = -1;
    }
    ArrayIterator.prototype.next = function () {
        this.index++;
        return this.index < this.array.count;
    };
    ArrayIterator.prototype.current = function () {
        return this.array.getItem(this.index);
    };
    return ArrayIterator;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ArrayIterator);


/***/ }),

/***/ "./src/iterator/Item.ts":
/*!******************************!*\
  !*** ./src/iterator/Item.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var Item = /** @class */ (function () {
    function Item(_name, _cost) {
        this._name = _name;
        this._cost = _cost;
    }
    Object.defineProperty(Item.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Item.prototype, "cost", {
        get: function () {
            return this._cost;
        },
        enumerable: false,
        configurable: true
    });
    return Item;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Item);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*******************************!*\
  !*** ./src/iterator/index.ts ***!
  \*******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Array */ "./src/iterator/Array.ts");
/* harmony import */ var _Item__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Item */ "./src/iterator/Item.ts");


var items = [
    new _Item__WEBPACK_IMPORTED_MODULE_1__["default"]("고구마", 1000),
    new _Item__WEBPACK_IMPORTED_MODULE_1__["default"]("호박 고구마", 2000),
    new _Item__WEBPACK_IMPORTED_MODULE_1__["default"]("밤 고구마", 3000),
    new _Item__WEBPACK_IMPORTED_MODULE_1__["default"]("고구마 말랭이", 4000),
];
var array = new _Array__WEBPACK_IMPORTED_MODULE_0__["default"](items);
var iter = array.iterator();
while (iter.next()) {
    var item = iter.current();
    var domItem = document.createElement("div");
    domItem.innerText = "".concat(item.name, " : ").concat(item.cost, "\uC6D0");
    document.body.appendChild(domItem);
    domItem.classList.add("iterator-item");
}

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUM0QztBQUk1QztJQUNJLGVBQW9CLEtBQWE7UUFBYixVQUFLLEdBQUwsS0FBSyxDQUFRO0lBQUcsQ0FBQztJQUU5Qix1QkFBTyxHQUFkLFVBQWUsS0FBYTtRQUN4QixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVELHNCQUFXLHdCQUFLO2FBQWhCO1lBQ0ksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztRQUM3QixDQUFDOzs7T0FBQTtJQUVELHdCQUFRLEdBQVI7UUFDSSxPQUFPLElBQUksc0RBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBQ0wsWUFBQztBQUFELENBQUM7QUFFRCxpRUFBZSxLQUFLOzs7Ozs7Ozs7Ozs7Ozs7QUNqQnBCO0lBR0ksdUJBQW9CLEtBQVk7UUFBWixVQUFLLEdBQUwsS0FBSyxDQUFPO1FBQzVCLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO0lBQ25CLENBQUM7SUFHRCw0QkFBSSxHQUFKO1FBQ0ksSUFBSSxDQUFDLEtBQUssRUFBRTtRQUNaLE9BQU8sSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUs7SUFDeEMsQ0FBQztJQUNELCtCQUFPLEdBQVA7UUFDSSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDekMsQ0FBQztJQUNMLG9CQUFDO0FBQUQsQ0FBQztBQUVELGlFQUFlLGFBQWE7Ozs7Ozs7Ozs7Ozs7OztBQ3JCNUI7SUFDSSxjQUFxQixLQUFhLEVBQVUsS0FBYTtRQUFwQyxVQUFLLEdBQUwsS0FBSyxDQUFRO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBUTtJQUFHLENBQUM7SUFFN0Qsc0JBQUksc0JBQUk7YUFBUjtZQUNJLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN0QixDQUFDOzs7T0FBQTtJQUVELHNCQUFJLHNCQUFJO2FBQVI7WUFDSSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDdEIsQ0FBQzs7O09BQUE7SUFFTCxXQUFDO0FBQUQsQ0FBQztBQUVELGlFQUFlLElBQUk7Ozs7Ozs7VUNibkI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7QUNONEI7QUFDRjtBQUUxQixJQUFNLEtBQUssR0FBRztJQUNWLElBQUksNkNBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDO0lBQ3JCLElBQUksNkNBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDO0lBQ3hCLElBQUksNkNBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDO0lBQ3ZCLElBQUksNkNBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDO0NBQzVCO0FBRUQsSUFBTSxLQUFLLEdBQUcsSUFBSSw4Q0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQy9CLElBQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxRQUFRLEVBQUU7QUFFN0IsT0FBTSxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQztJQUNoQixJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFFNUIsSUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUM7SUFDN0MsT0FBTyxDQUFDLFNBQVMsR0FBRyxVQUFHLElBQUksQ0FBQyxJQUFJLGdCQUFNLElBQUksQ0FBQyxJQUFJLFdBQUc7SUFDbEQsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDO0lBRWxDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQztBQUMxQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZGVzaWduLXBhdHRlcm5zLy4vc3JjL2l0ZXJhdG9yL0FycmF5LnRzIiwid2VicGFjazovL2Rlc2lnbi1wYXR0ZXJucy8uL3NyYy9pdGVyYXRvci9BcnJheUl0ZXJhdG9yLnRzIiwid2VicGFjazovL2Rlc2lnbi1wYXR0ZXJucy8uL3NyYy9pdGVyYXRvci9JdGVtLnRzIiwid2VicGFjazovL2Rlc2lnbi1wYXR0ZXJucy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9kZXNpZ24tcGF0dGVybnMvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2Rlc2lnbi1wYXR0ZXJucy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2Rlc2lnbi1wYXR0ZXJucy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2Rlc2lnbi1wYXR0ZXJucy8uL3NyYy9pdGVyYXRvci9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQWdncmVnYXRvciBmcm9tICcuL0FnZ3JlZ2F0b3InO1xuaW1wb3J0IEFycmF5SXRlcmF0b3IgZnJvbSAnLi9BcnJheUl0ZXJhdG9yJztcbmltcG9ydCBJdGVtIGZyb20gJy4vSXRlbSc7XG5pbXBvcnQgSXRlcmF0b3IgZnJvbSAnLi9JdGVyYXRvcic7XG5cbmNsYXNzIEFycmF5IGltcGxlbWVudHMgQWdncmVnYXRvcjxJdGVtPiB7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBpdGVtczogSXRlbVtdKSB7fVxuXG4gICAgcHVibGljIGdldEl0ZW0oaW5kZXg6IG51bWJlcik6SXRlbSB7XG4gICAgICAgIHJldHVybiB0aGlzLml0ZW1zW2luZGV4XTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGNvdW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pdGVtcy5sZW5ndGg7XG4gICAgfVxuICAgIFxuICAgIGl0ZXJhdG9yKCk6IEl0ZXJhdG9yPEl0ZW0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBBcnJheUl0ZXJhdG9yKHRoaXMpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQXJyYXkiLCJpbXBvcnQgQXJyYXkgZnJvbSAnLi9BcnJheSc7XG5pbXBvcnQgSXRlbSBmcm9tIFwiLi9JdGVtXCI7XG5pbXBvcnQgSXRlcmF0b3IgZnJvbSBcIi4vSXRlcmF0b3JcIjtcblxuY2xhc3MgQXJyYXlJdGVyYXRvciBpbXBsZW1lbnRzIEl0ZXJhdG9yPEl0ZW0+IHtcbiAgICBwcml2YXRlIGluZGV4OiBudW1iZXJcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgYXJyYXk6IEFycmF5KSB7XG4gICAgICAgIHRoaXMuaW5kZXggPSAtMVxuICAgIH1cblxuICAgIFxuICAgIG5leHQoKTogYm9vbGVhbiB7XG4gICAgICAgIHRoaXMuaW5kZXgrK1xuICAgICAgICByZXR1cm4gdGhpcy5pbmRleCA8IHRoaXMuYXJyYXkuY291bnRcbiAgICB9XG4gICAgY3VycmVudCgpOiBJdGVtIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXJyYXkuZ2V0SXRlbSh0aGlzLmluZGV4KVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQXJyYXlJdGVyYXRvciIsImNsYXNzIEl0ZW0ge1xuICAgIGNvbnN0cnVjdG9yKCBwcml2YXRlIF9uYW1lOiBzdHJpbmcsIHByaXZhdGUgX2Nvc3Q6IG51bWJlcikge31cblxuICAgIGdldCBuYW1lKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbmFtZTtcbiAgICB9XG5cbiAgICBnZXQgY29zdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Nvc3Q7XG4gICAgfVxuICAgIFxufVxuXG5leHBvcnQgZGVmYXVsdCBJdGVtIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgQXJyYXkgZnJvbSBcIi4vQXJyYXlcIjtcbmltcG9ydCBJdGVtIGZyb20gXCIuL0l0ZW1cIjtcblxuY29uc3QgaXRlbXMgPSBbXG4gICAgbmV3IEl0ZW0oXCLqs6Dqtazrp4hcIiwgMTAwMCksXG4gICAgbmV3IEl0ZW0oXCLtmLjrsJUg6rOg6rWs66eIXCIsIDIwMDApLFxuICAgIG5ldyBJdGVtKFwi67CkIOqzoOq1rOuniFwiLCAzMDAwKSxcbiAgICBuZXcgSXRlbShcIuqzoOq1rOuniCDrp5Drnq3snbRcIiwgNDAwMCksXG5dXG5cbmNvbnN0IGFycmF5ID0gbmV3IEFycmF5KGl0ZW1zKTtcbmNvbnN0IGl0ZXIgPSBhcnJheS5pdGVyYXRvcigpXG5cbndoaWxlKGl0ZXIubmV4dCgpKSB7XG4gICAgY29uc3QgaXRlbSA9IGl0ZXIuY3VycmVudCgpO1xuXG4gICAgY29uc3QgZG9tSXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcbiAgICBkb21JdGVtLmlubmVyVGV4dCA9IGAke2l0ZW0ubmFtZX0gOiAke2l0ZW0uY29zdH3sm5BgXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkb21JdGVtKVxuXG4gICAgZG9tSXRlbS5jbGFzc0xpc3QuYWRkKFwiaXRlcmF0b3ItaXRlbVwiKVxufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9