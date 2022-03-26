"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _Auth_instances, _Auth__client, _Auth__statusCodes, _Auth__callback, _Auth__onBeforeRequest, _Auth__onBeforeResponse;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const axios_1 = __importDefault(require("axios"));
const lodash_1 = __importDefault(require("lodash"));
class Auth {
    constructor(config, statusCodes = [401], callback = () => void 0) {
        _Auth_instances.add(this);
        _Auth__client.set(this, void 0);
        _Auth__statusCodes.set(this, void 0);
        _Auth__callback.set(this, void 0);
        __classPrivateFieldSet(this, _Auth__client, axios_1.default.create(config), "f");
        this.statusCodes = statusCodes;
        __classPrivateFieldSet(this, _Auth__callback, callback, "f");
        __classPrivateFieldGet(this, _Auth_instances, "m", _Auth__onBeforeRequest).call(this);
        __classPrivateFieldGet(this, _Auth_instances, "m", _Auth__onBeforeResponse).call(this);
    }
    set statusCodes(newStatusCodes) {
        __classPrivateFieldSet(this, _Auth__statusCodes, lodash_1.default.uniq(newStatusCodes), "f");
    }
    login(pathLogin, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return __classPrivateFieldGet(this, _Auth__client, "f").post(pathLogin, data);
        });
    }
}
exports.Auth = Auth;
_Auth__client = new WeakMap(), _Auth__statusCodes = new WeakMap(), _Auth__callback = new WeakMap(), _Auth_instances = new WeakSet(), _Auth__onBeforeRequest = function _Auth__onBeforeRequest() {
    __classPrivateFieldGet(this, _Auth__client, "f").interceptors.request.use(function (config) {
        console.log(`[_onBeforeRequest]: ${config}`);
        return config;
    }, function (error) {
        return Promise.reject(error);
    });
    return;
}, _Auth__onBeforeResponse = function _Auth__onBeforeResponse() {
    __classPrivateFieldGet(this, _Auth__client, "f").interceptors.response.use(function (response) {
        console.log(`[_onBeforeResponse]: ${response}`);
        return response;
    }, error => {
        if (__classPrivateFieldGet(this, _Auth__statusCodes, "f").indexOf(error.response.status) !== -1) {
            console.log('co loi xay ra');
            __classPrivateFieldGet(this, _Auth__callback, "f").call(this);
        }
        return Promise.reject(error);
    });
};
//# sourceMappingURL=auth.js.map