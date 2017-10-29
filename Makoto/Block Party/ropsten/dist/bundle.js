var dappleth =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BlockPartyContract = function () {

    /*
    *
    *
    *
    *   uso corretto del catch per le promise
    *
    *   var p1 = new Promise(function(resolve, reject) {
                resolve("Success");
              });
             p1.then(function(value) {
              console.log(value); // "Success!"
              throw "oh, no!";
            }).catch(function(e) {
              console.log(e); // "oh, no!"
            });
    *
    *
    * */

    function BlockPartyContract(contract) {
        _classCallCheck(this, BlockPartyContract);

        this.contract = contract;
    }

    // I Nomi dei metodi dovrebbero seguire la naming convention dei metodi forniti dal contratto

    _createClass(BlockPartyContract, [{
        key: "getContract",
        value: function getContract() {

            var result = this.contract;
            return result;
        }
    }, {
        key: "name",
        value: function name() {
            var _this = this;

            var promise = new Promise(function (resolve, reject) {
                resolve(_this.contract.name());
            });

            return promise;
        }
    }, {
        key: "description",
        value: function description() {
            var promise = new Promise(function (resolve, reject) {
                resolve("Description");
            });
            return promise;
        }
    }, {
        key: "register",
        value: function register(idTwitter) {
            var _this2 = this;

            var promise = new Promise(function (resolve, reject) {

                var deposit = web3.toWei(0.05);
                var gasLimit = 3000000; // gas limit
                var gasPrice = 50000000000; //gas price in wei

                // ToDo: Forzatura da rivedere
                dappleth.$SERVICE.transactionCall(_this2.getContract(), 'register', idTwitter, deposit, gasLimit, gasPrice).then(function (res) {
                    resolve(res);
                });
            });

            return promise;
        }
    }, {
        key: "status",
        value: function status() {
            var promise = new Promise(function (resolve, reject) {
                resolve({ id: 0 });
            });

            return promise;
        }
    }, {
        key: "location",
        value: function location() {
            var promise = new Promise(function (resolve, reject) {
                resolve({ location: "Auditorium", city: "London", lat: "", long: "" });
            });

            return promise;
        }
    }, {
        key: "date",
        value: function date() {
            var promise = new Promise(function (resolve, reject) {
                resolve("10/11/2017");
            });

            return promise;
        }
    }, {
        key: "time",
        value: function time() {
            var promise = new Promise(function (resolve, reject) {
                resolve("21:30");
            });

            return promise;
        }
    }, {
        key: "limit",
        value: function limit() {
            var promise = new Promise(function (resolve, reject) {
                resolve(20);
            });

            return promise;
        }
    }, {
        key: "users",
        value: function users() {
            var result = this.contract.registered();
            return result.toNumber();
        }
    }, {
        key: "participants",
        value: function participants() {
            var _this3 = this;

            var promise = new Promise(function (resolve, reject) {

                var list = [];
                var count = _this3.contract.registered();

                for (var i = 1; i <= count; i++) {
                    var addr = _this3.contract.participantsIndex(i);
                    var user = _this3.contract.participants(addr);

                    var _user = _slicedToArray(user, 4),
                        name = _user[0],
                        address = _user[1],
                        isAttended = _user[2],
                        isPaid = _user[3];

                    var participant = { name: name, address: address, isAttended: isAttended, isPaid: isPaid };

                    list.push(participant);
                }

                resolve(list);
            });

            return promise;
        }
    }, {
        key: "withdraw",
        value: function withdraw() {
            var promise = new Promise(function (resolve, reject) {
                console.log("withdraw");
            });

            return promise;
        }
    }, {
        key: "banner",
        value: function banner() {
            var promise = new Promise(function (resolve, reject) {
                resolve({ banner: "https://ethereum.org/images/assets/1900/Ethereum-homestead-background-38.jpg", logo: "" });
            });

            return promise;
        }
    }]);

    return BlockPartyContract;
}();

exports.default = BlockPartyContract;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.$SERVICE = exports.$SCOPE = undefined;
exports.run = run;
exports.exit = exit;

var _DataLayer = __webpack_require__(2);

var _BlockPartyContract = __webpack_require__(0);

var _BlockPartyContract2 = _interopRequireDefault(_BlockPartyContract);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DAPP = void 0;

//ToDo: da rivedere forzatura per poter utilizzare le variabili scope e service all'interno delle classi
var $SCOPE = exports.$SCOPE = void 0;
var $SERVICE = exports.$SERVICE = void 0;

var myaddress = void 0;
var dl = void 0;

function run(core) {
    var data = {
        events: []
    };

    // Todo: Popoliamo manualmente functions e data. Trovare un modo per popolare automaticamente le variabili functions e data.
    var functions = {
        showDetails: function showDetails(idEvent, event) {
            event.currentTarget.classList.add('opened');
            document.querySelector('.eventscontainer').classList.add('hasOpenedEvent');
        },
        hideDetails: function hideDetails(idEvent, event) {
            document.querySelector('[data-id-event="' + idEvent + '"]').classList.remove('opened');
            document.querySelector('.eventscontainer').classList.remove('hasOpenedEvent');
            event.stopPropagation();
        },
        register: function register(twittedId, contract) {
            var bpc = new _BlockPartyContract2.default(contract);

            bpc.register(twittedId).then(function (result) {
                console.log(result);
            });
        },
        dappRefresh: function dappRefresh() {
            _updateDataFromContracts();
        }
    };

    var _updateDataFromContracts = function _updateDataFromContracts() {
        dl.getData(DAPP.Contracts).then(function (result) {
            data.events = result;

            if (angular !== undefined) {
                angular.extend($SCOPE, functions);
                angular.extend($SCOPE, data);
                $SCOPE.$broadcast('scroll.refreshComplete');
                console.log("SCOPE HAS UPDATED");
            } else {
                console.log("Angular is required!");
            }
        });
    };

    /*let data_static = {
        events: [{
            id: "12",
            name: "Evento x",
            description: "the best event x",
            status: {id: 0},
            position: {location: "Auditorium", city: "London", lat: "", long: ""},
            date: "10/11/2017",
            hour: "9:00",
            users: "12",
            assets: {banner: "https://ethereum.org/images/assets/1900/Ethereum-homestead-background-38.jpg", logo: ""}
        }, {
            id: "13",
            name: "Evento Y",
            description: "the best event y",
            status: {id: 1},
            position: {location: "Auditorium", city: "Zurich", lat: "", long: ""},
            date: "13/11/2017",
            hour: "10:00",
            users: "45",
            assets: {banner: "https://ethereum.org/images/assets/1900/Ethereum-homestead-background-36.jpg", logo: ""}
        }, {
            id: "14",
            name: "Evento Z",
            description: "the best event z",
            status: {id: 1},
            position: {location: "Sushi Bar", city: "Tokyo", lat: "", long: ""},
            date: "11/12/2017",
            hour: "11:00",
            users: "43",
            assets: {banner: "https://ethereum.org/images/assets/1900/Ethereum-homestead-background-33.jpg", logo: ""}
        }]
    };*/

    var _init = function _init(core) {
        exports.$SCOPE = $SCOPE = core.scope;
        exports.$SERVICE = $SERVICE = core.service;
        DAPP = $SCOPE.Dapp.activeApp;
        myaddress = $SERVICE.address;
        dl = new _DataLayer.DataLayer();
        _updateDataFromContracts();
    };

    return _init(core);
};

function exit() {
    console.log("Arrivederci");
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DataLayer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Event = __webpack_require__(3);

var _Event2 = _interopRequireDefault(_Event);

var _BlockPartyContract = __webpack_require__(0);

var _BlockPartyContract2 = _interopRequireDefault(_BlockPartyContract);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DataLayer = exports.DataLayer = function () {
    function DataLayer() {
        _classCallCheck(this, DataLayer);

        this._init();
    }

    _createClass(DataLayer, [{
        key: '_init',
        value: function _init() {
            console.log("DataLayer Started");
        }
    }, {
        key: 'getData',
        value: function getData(contracts) {
            var promise = new Promise(function (resolve, reject) {
                var events = [];
                var resolvedEvents = [];

                var innerPromise = function innerPromise(toResolve) {
                    return new Promise(function (resolve, reject) {
                        var _iteratorNormalCompletion = true;
                        var _didIteratorError = false;
                        var _iteratorError = undefined;

                        try {
                            for (var _iterator = toResolve[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                var ev = _step.value;

                                ev.resolveAllPromise().then(function (resolvedEvent) {
                                    resolvedEvents.push(resolvedEvent);
                                });
                            }
                        } catch (err) {
                            _didIteratorError = true;
                            _iteratorError = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion && _iterator.return) {
                                    _iterator.return();
                                }
                            } finally {
                                if (_didIteratorError) {
                                    throw _iteratorError;
                                }
                            }
                        }

                        resolve(resolvedEvents);
                    });
                };

                for (var i = 0; i < contracts.length; i++) {
                    var abi = contracts[i].ABI;
                    var address = contracts[i].Address;

                    var bpc = new _BlockPartyContract2.default(web3.eth.contract(abi).at(address));

                    var event = new _Event2.default(i, bpc.name(), bpc.description(), bpc.status(), bpc.location(), bpc.date(), bpc.time(), bpc.users(), bpc.limit(), bpc.banner(), bpc.getContract(), bpc.participants());

                    events.push(event);
                }

                innerPromise(events).then(function (theEnd) {
                    //THE END
                    resolve(theEnd);
                });
            });

            return promise;
        }
    }]);

    return DataLayer;
}();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Event = function () {
    function Event(id, name, description, status, position, date, time, users, limit, assets, contract, participants) {
        _classCallCheck(this, Event);

        this.id = id;
        this.name = name;
        this.description = description;
        this.status = status;
        this.position = position;
        this.date = date;
        this.time = time;
        this.users = users;
        this.limit = limit;
        this.assets = assets;
        this.contract = contract;
        this.participants = participants;

        this.object = {};
    }

    _createClass(Event, [{
        key: "resolveAllPromise",
        value: function resolveAllPromise() {
            var _this = this;

            var promise = new Promise(function (resolve, reject) {

                // VISTO CHE Promise All ritorna o tutto o niente questo trick serve per ritornare comunque un valore in caso
                // una promessa dovesse fallire

                var toResultObject = function toResultObject(promise) {
                    if (promise instanceof Promise) {
                        return promise.then(function (result) {
                            return result;
                        }).catch(function (error) {
                            return error;
                        });
                    } else {
                        return promise;
                    }
                };

                var promises = [_this.id, _this.name, _this.description, _this.status, _this.position, _this.date, _this.time, _this.users, _this.limit, _this.assets, _this.contract, _this.participants];

                Promise.all(promises.map(toResultObject)).then(function (values) {
                    var _values = _slicedToArray(values, 12),
                        id = _values[0],
                        name = _values[1],
                        description = _values[2],
                        status = _values[3],
                        position = _values[4],
                        date = _values[5],
                        time = _values[6],
                        users = _values[7],
                        limit = _values[8],
                        assets = _values[9],
                        contract = _values[10],
                        participants = _values[11];

                    var event = {
                        id: id,
                        name: name,
                        description: description,
                        status: status,
                        position: position,
                        date: date,
                        time: time,
                        contract: contract,
                        participants: participants,
                        users: users,
                        limit: limit,
                        assets: assets
                    };

                    resolve(event);
                }, function (reason) {
                    reject(reason);
                });
            });

            return promise;
        }
    }]);

    return Event;
}();

exports.default = Event;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map