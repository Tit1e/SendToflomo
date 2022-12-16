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
var _Updater_eventListen, _Updater_statusListen, _Updater_availableListen;
import { checkUpdate, installUpdate, onUpdaterEvent, } from '@tauri-apps/api/updater';
import { relaunch } from '@tauri-apps/api/process';
import { listen, emit } from '@tauri-apps/api/event';
class Updater {
    constructor() {
        _Updater_eventListen.set(this, void 0);
        _Updater_statusListen.set(this, void 0);
        _Updater_availableListen.set(this, void 0);
    }
    async checkUpdate() {
        return await checkUpdate();
    }
    async installUpdate() {
        return await installUpdate();
    }
    async onUpdaterEvent(cb) {
        await this.removeUpdaterEvent();
        const unlisten = await onUpdaterEvent(cb);
        __classPrivateFieldSet(this, _Updater_eventListen, unlisten, "f");
    }
    async relaunch() {
        return await relaunch();
    }
    async removeUpdaterEvent() {
        if (__classPrivateFieldGet(this, _Updater_eventListen, "f")) {
            __classPrivateFieldGet(this, _Updater_eventListen, "f").call(this);
            __classPrivateFieldSet(this, _Updater_eventListen, undefined, "f");
        }
    }
    async onUpdateStatus() {
        await this.removeUpdateStatus();
        __classPrivateFieldSet(this, _Updater_statusListen, await listen('tauri://update-status', function (res) {
            console.log('New status: ', res);
        }), "f");
    }
    async removeUpdateStatus() {
        if (__classPrivateFieldGet(this, _Updater_statusListen, "f")) {
            __classPrivateFieldGet(this, _Updater_statusListen, "f").call(this);
            __classPrivateFieldSet(this, _Updater_statusListen, undefined, "f");
        }
    }
    async emitUpdate() {
        return await emit('tauri://update');
    }
    async onUpdateAvailable() {
        __classPrivateFieldSet(this, _Updater_availableListen, await listen('tauri://update-available', (res) => {
            console.log('New version available', res);
        }), "f");
    }
    async removeUpdateAvailable() {
        if (__classPrivateFieldGet(this, _Updater_availableListen, "f")) {
            __classPrivateFieldGet(this, _Updater_availableListen, "f").call(this);
            __classPrivateFieldSet(this, _Updater_availableListen, undefined, "f");
        }
    }
    async emitUpdateInstall() {
        return await emit('tauri://update-install');
    }
}
_Updater_eventListen = new WeakMap(), _Updater_statusListen = new WeakMap(), _Updater_availableListen = new WeakMap();
const updater = new Updater();
export default updater;