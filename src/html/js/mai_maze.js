/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/d_cmn/C_AlertLog.ts":
/*!*********************************!*\
  !*** ./src/d_cmn/C_AlertLog.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.C_AlertLog = void 0;
const F_Rand_1 = __webpack_require__(/*! ../d_utl/F_Rand */ "./src/d_utl/F_Rand.ts");
const C_Dialog_1 = __webpack_require__(/*! ./C_Dialog */ "./src/d_cmn/C_Dialog.ts");
class C_AlertLog extends C_Dialog_1.C_Dialog {
    static getObj(target) {
        var _a, _b;
        var _c, _d;
        (_a = this.me) !== null && _a !== void 0 ? _a : (this.me = {});
        if (target === undefined) {
            target = document.createElement('dialog');
            target.id = 'dialog_' + (0, F_Rand_1._get_uuid)();
            document.body.appendChild(target);
        }
        return (_b = (_c = this.me)[_d = target.id]) !== null && _b !== void 0 ? _b : (_c[_d] = new C_AlertLog(target));
    }
    constructor(target) {
        super(target);
        this.msg = {};
        this.__clearDialog();
        this.__makeDialog();
    }
    __clearDialog() {
        const ctx = super.getWindow();
        while (ctx.firstChild)
            ctx.removeChild(ctx.firstChild);
    }
    __makeDialog() {
        const ctx = super.getWindow();
        try {
            this.pane = this.__makeWindow('pane');
            this.logs = this.__makePanel('logs', this.pane);
            this.btns = this.__makePanel('btns', this.pane);
            this.upd = this.__makeButton('update', '更新', this.btns);
            this.clr = this.__makeButton('clear', '消去', this.btns);
            this.cls = this.__makeButton('close', '閉じる', this.btns);
            this.upd.addEventListener('click', () => { this.update(); }, false);
            this.clr.addEventListener('click', () => { this.clear(); }, false);
            this.cls.addEventListener('click', () => { this.hide(); }, false);
            this.logs.style.setProperty('user-select', 'text');
            this.logs.style.setProperty('max-width', '90dvw');
            this.logs.style.setProperty('min-height', '3.0rem');
            this.logs.style.setProperty('max-height', '80dvh');
            this.logs.style.setProperty('overflow-x', 'auto');
            this.logs.style.setProperty('overflow-y', 'auto');
            this.setZoomElm(this.logs);
        }
        catch (err) { }
    }
    __makeWindow(id) {
        const div = document.createElement('div');
        div.id = `${this.id}_${id}`;
        this.setWindow(div);
        return div;
    }
    __makePanel(id, parent) {
        const div = document.createElement('div');
        div.id = `${this.id}_${id}`;
        parent.appendChild(div);
        return div;
    }
    __makeButton(id, name, parent) {
        const btn = document.createElement('button');
        btn.id = `${this.id}_${id}`;
        btn.innerHTML = name;
        parent.appendChild(btn);
        return btn;
    }
    set_message(ttl, msg) {
        var _a;
        var _b;
        ((_a = (_b = this.msg)[ttl]) !== null && _a !== void 0 ? _a : (_b[ttl] = [])).push(msg);
        this.__dom_update();
    }
    clr_message(ttl) {
        if (ttl !== undefined) {
            this.msg[ttl] = [];
            return;
        }
        for (const ii in this.msg)
            this.msg[ii] = [];
        this.__dom_clear();
        return;
    }
    update() { this.__dom_update(); }
    __dom_update() {
        var _a;
        this.__dom_clear();
        for (const title in this.msg) {
            for (let msg of this.msg[title]) {
                const fs = document.createElement('fieldset');
                const lg = document.createElement('legend');
                lg.innerHTML = `${title} (${Date.now().toString()})`;
                fs.appendChild(lg);
                const pr = document.createElement('pre');
                fs.appendChild(pr);
                const pg = document.createElement('p');
                pg.innerHTML = msg;
                pr.appendChild(pg);
                (_a = this.logs) === null || _a === void 0 ? void 0 : _a.appendChild(fs);
            }
        }
    }
    clear() { this.clr_message(); }
    __dom_clear() {
        var _a;
        while ((_a = this.logs) === null || _a === void 0 ? void 0 : _a.firstChild)
            this.logs.removeChild(this.logs.firstChild);
    }
    show() {
        this.update();
        try {
            super.show();
        }
        catch (err) { }
    }
    hide() {
        try {
            super.hide();
        }
        catch (err) { }
    }
    display(yn) {
        yn ? this.show() : this.hide();
    }
}
exports.C_AlertLog = C_AlertLog;


/***/ }),

/***/ "./src/d_cmn/C_Dialog.ts":
/*!*******************************!*\
  !*** ./src/d_cmn/C_Dialog.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.C_Dialog = void 0;
const F_Rand_1 = __webpack_require__(/*! ../d_utl/F_Rand */ "./src/d_utl/F_Rand.ts");
class C_Dialog {
    constructor(target) {
        this.__mop = { x: 0, y: 0 };
        if (target === undefined) {
            target = document.createElement('dialog');
            document.body.appendChild(target);
        }
        if (target.id === undefined || target.id === '')
            target.id = 'dialog_' + (0, F_Rand_1._get_uuid)();
        this.id = target.id;
        target.style.margin = '0';
        target.style.padding = '0';
        this.__dia = target;
        this.__pan = document.createElement('div');
        this.__set_dialog_style();
        this.__ctx = document.createElement('div');
        this.__ctx.style.gridArea = 'mm';
        this.__pan.appendChild(this.__ctx);
        this.__rsz = {};
        this.__set_bar_style('tm');
        this.__set_bar_style('ml');
        this.__set_bar_style('mr');
        this.__set_bar_style('bm');
        this.__set_corner_style('tl');
        this.__set_corner_style('tr');
        this.__set_corner_style('bl');
        this.__set_corner_style('br');
        this.__dia.appendChild(this.__pan);
    }
    __set_dialog_style() {
        this.__dia.style.border = 'none';
        this.__dia.style.borderRadius = '10px';
        this.__dia.style.userSelect = 'auto';
        this.__dia.style.margin = '0';
        this.__dia.style.padding = '0';
        this.__pan.style.display = 'grid';
        this.__pan.style.gridTemplateColumns = `
            [tl-start ml-start bl-start]
            20px
            [tl-end ml-end bl-end tm-start mm-start bm-start]
            1fr
            [tm-end mm-end bm-end tr-start mr-start br-start]
            20px
            [tr-end mr-end br-end]
        `;
        this.__pan.style.gridTemplateRows = `
            [tl-start tm-start tr-start]
            20px
            [tl-end tm-end tr-end ml-start mm-start mr-start]
            1fr
            [ml-end mm-end mr-end bl-start bm-start br-start]
            20px
            [bl-end bm-end br-end]
        `;
    }
    __set_bar_style(area) {
        const elm = document.createElement('div');
        elm.style.backgroundColor = 'lightcyan';
        elm.style.userSelect = 'none';
        elm.style.gridArea = area;
        this.__set_move_dialog(elm);
        this.__pan.appendChild(elm);
        return elm;
    }
    __set_corner_style(area) {
        const elm = document.createElement('div');
        elm.style.backgroundColor = 'cyan';
        elm.style.userSelect = 'none';
        elm.style.gridArea = area;
        if (elm.id === undefined || elm.id === '')
            elm.id = area;
        this.__rsz[elm.id] = new resizeDom(elm, this.__dia);
        this.__set_zoom_dialog(elm);
        this.__pan.appendChild(elm);
        return elm;
    }
    __set_zoom_dialog(elm) {
        elm.setAttribute('draggable', 'true');
        elm.addEventListener('dragstart', (ev) => {
            this.__mop = { x: 0, y: 0 };
            this.__mop.x = ev.pageX;
            this.__mop.y = ev.pageY;
            if (elm.id in this.__rsz)
                this.__rsz[elm.id].reset();
        });
        elm.addEventListener('drag', (ev) => {
            if (ev.pageX === this.__mop.x && ev.pageY === this.__mop.y)
                return;
            const resizeX = ev.pageX - this.__mop.x;
            const resizeY = ev.pageY - this.__mop.y;
            if (elm.id in this.__rsz)
                this.__rsz[elm.id].resize(resizeX, resizeY);
        });
        elm.addEventListener('dragend', (ev) => {
            const resizeX = ev.pageX - this.__mop.x;
            const resizeY = ev.pageY - this.__mop.y;
            if (elm.id in this.__rsz)
                this.__rsz[elm.id].resize(resizeX, resizeY);
        });
    }
    __set_move_dialog(elm) {
        elm.setAttribute('draggable', 'true');
        elm.addEventListener('dragstart', (ev) => {
            this.__mop = { x: 0, y: 0 };
            this.__mop.y = this.__dia.offsetTop - ev.pageY;
            this.__mop.x = this.__dia.offsetLeft - ev.pageX;
        });
        elm.addEventListener('drag', (ev) => {
            if (ev.x === 0 && ev.y === 0)
                return;
            const top = ev.pageY + this.__mop.y;
            const left = ev.pageX + this.__mop.x;
            this.__dia.style.top = top + 'px';
            this.__dia.style.left = left + 'px';
        });
        elm.addEventListener('dragend', (ev) => {
            this.__mop = { x: 0, y: 0 };
        });
    }
    getWindow() {
        return this.__ctx;
    }
    setWindow(ctx) {
        try {
            this.__pan.removeChild(this.__ctx);
            this.__pan.appendChild(ctx);
            return this.__ctx = ctx;
        }
        catch (err) { }
        return ctx;
    }
    setZoomElm(elm) {
        for (const ii in this.__rsz)
            this.__rsz[ii].setZoomElm(elm);
    }
    clrZoom() {
        for (const ii in this.__rsz)
            this.__rsz[ii].clrZoomElm();
    }
    show() {
        try {
            this.__dia.show();
        }
        catch (err) { }
    }
    hide() {
        try {
            this.__dia.close();
        }
        catch (err) { }
    }
    display(yn) {
        yn ? this.show() : this.hide();
    }
}
exports.C_Dialog = C_Dialog;
class resizeDom {
    constructor(cnr, dia) {
        this.__dia = dia;
        this.__cnr = cnr;
        this.__can = { x: false, y: false };
        this.__top = { x: 0, y: 0 };
        this.__siz = { x: 0, y: 0 };
    }
    setZoomElm(trg) {
        this.__trg = trg;
    }
    clrZoomElm() {
        this.__trg = undefined;
    }
    reset() {
        if (this.__trg === undefined)
            return;
        try {
            const parent = this.__cnr.offsetParent;
            this.__can.x = this.__cnr.offsetLeft < ((parent === null || parent === void 0 ? void 0 : parent.offsetWidth) / 2);
            this.__can.y = this.__cnr.offsetTop < ((parent === null || parent === void 0 ? void 0 : parent.offsetHeight) / 2);
        }
        catch (err) {
            this.__can.x = this.__can.y = false;
        }
        this.__top.x = this.__dia.offsetLeft;
        this.__top.y = this.__dia.offsetTop;
        this.__siz.x = this.__trg.offsetWidth;
        this.__siz.y = this.__trg.offsetHeight;
    }
    resize(resizeX, resizeY) {
        if (this.__trg === undefined)
            return;
        if (this.__can.x) {
            resizeX = -resizeX;
            this.__dia.style.left = this.__top.x - resizeX + 'px';
        }
        if (this.__can.y) {
            resizeY = -resizeY;
            this.__dia.style.top = this.__top.y - resizeY + 'px';
        }
        this.__trg.style.width = this.__siz.x + resizeX + 'px';
        this.__trg.style.height = this.__siz.y + resizeY + 'px';
    }
}


/***/ }),

/***/ "./src/d_cmn/F_POST.ts":
/*!*****************************!*\
  !*** ./src/d_cmn/F_POST.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.POST_and_get_JSON = POST_and_get_JSON;
exports.POST_and_get_JSON3 = POST_and_get_JSON3;
exports.POST_and_get_JSON2 = POST_and_get_JSON2;
exports.POST_and_move_page = POST_and_move_page;
const global_1 = __webpack_require__(/*! ../d_cmn/global */ "./src/d_cmn/global.ts");
function POST_and_get_JSON(url, opt) {
    return __awaiter(this, void 0, void 0, function* () {
        const form_data = opt.toFormData();
        if (form_data === undefined)
            return undefined;
        var res;
        try {
            res = yield fetch(url, {
                method: 'POST',
                cache: 'no-cache',
                headers: {},
                body: opt.toFormData()
            });
            if (!res.ok) {
                throw new Error(`レスポンスステータス (${res.status})`);
            }
        }
        catch (err) {
            global_1.g_mes.warning_message('通信エラー: ' + err);
            return undefined;
        }
        const monitor = true;
        return res.text()
            .then(txt => {
            const tx = txt.slice();
            if (monitor) {
                global_1.g_alert.set_message(`POST URL:`, url);
                global_1.g_alert.set_message(`POST OPT:`, opt.toString());
                global_1.g_alert.set_message(`POST DATA:`, tx);
            }
            try {
                return JSON.parse(txt);
            }
            catch (err) {
                global_1.g_mes.warning_message('JSON形式のデコードエラー');
                (0, global_1._alert)(tx);
                return undefined;
            }
        });
    });
}
function POST_and_get_JSON3(url, opt) {
    return __awaiter(this, void 0, void 0, function* () {
        const form_data = opt.toFormData();
        if (form_data === undefined)
            return undefined;
        var res;
        try {
            res = yield fetch(url, {
                method: 'POST',
                cache: 'no-cache',
                headers: {
                    "Content-Type": "application/json"
                },
                body: opt.toJSON()
            });
            if (!res.ok) {
                throw new Error(`レスポンスステータス (${res.status})`);
            }
        }
        catch (err) {
            global_1.g_mes.warning_message('通信エラー: ' + err);
            return undefined;
        }
        const monitor = true;
        return res.text()
            .then(txt => {
            const tx = txt.slice();
            if (monitor) {
                global_1.g_alert.set_message(`POST URL:`, url);
                global_1.g_alert.set_message(`POST OPT:`, opt.toString());
                global_1.g_alert.set_message(`POST DATA:`, tx);
            }
            try {
                return JSON.parse(txt);
            }
            catch (err) {
                global_1.g_mes.warning_message('JSON形式のデコードエラー');
                (0, global_1._alert)(tx);
                return undefined;
            }
        });
    });
}
function POST_and_get_JSON2(url, opt) {
    return __awaiter(this, void 0, void 0, function* () {
        const reqObj = new XMLHttpRequest();
        try {
            reqObj.open("POST", url, false);
            reqObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            reqObj.send(opt.toFormData());
        }
        catch (err) {
            global_1.g_mes.warning_message(`通信エラー: ${reqObj.status}`);
            return undefined;
        }
        const txt = reqObj.responseText;
        const monitor = true;
        if (monitor) {
            global_1.g_alert.set_message(`POST URL:`, url);
            global_1.g_alert.set_message(`POST OPT:`, opt.toString());
            global_1.g_alert.set_message(`POST DATA:`, txt);
        }
        if (Number(reqObj.status) > 399) {
            global_1.g_mes.warning_message(`レスポンスステータス: ${reqObj.status}`);
            return undefined;
        }
        try {
            return JSON.parse(txt);
        }
        catch (err) {
            global_1.g_mes.warning_message('JSON形式のデコードエラー: ' + err);
            (0, global_1._alert)(txt);
            return undefined;
        }
    });
}
function POST_and_move_page(url, opt) {
    create_form(url, opt).submit();
}
function create_form(url, opt) {
    const form = document.createElement('form');
    form.id = 'dummy_form_' + new Date().valueOf().toString();
    form.method = 'POST';
    form.action = url;
    form.style.display = 'none';
    for (var key of opt.get_keys()) {
        create_input(form, form.id, key, opt.get(key));
    }
    document.body.appendChild(form);
    return form;
}
function create_input(form, fid, name, value) {
    const i = document.createElement('input');
    i.type = 'hidden';
    i.name = name;
    i.value = value;
    i.style.display = 'none';
    i.setAttribute('for', fid);
    form.appendChild(i);
    return i;
}


/***/ }),

/***/ "./src/d_cmn/F_load_and_save.ts":
/*!**************************************!*\
  !*** ./src/d_cmn/F_load_and_save.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.get_mai_maze = get_mai_maze;
exports.get_mai_guld = get_mai_guld;
exports.get_new_maze = get_new_maze;
exports.get_save_info = get_save_info;
exports.get_maze_info = get_maze_info;
exports.get_new_hero = get_new_hero;
exports.tmp_load = tmp_load;
exports.instant_load = instant_load;
exports.UD_load = UD_load;
exports.before_load = before_load;
exports.general_load = general_load;
exports.tmp_save = tmp_save;
exports.instant_save = instant_save;
exports.UD_save = UD_save;
exports.before_save = before_save;
exports.general_save = general_save;
const C_SaveData_1 = __webpack_require__(/*! ../d_mdl/C_SaveData */ "./src/d_mdl/C_SaveData.ts");
const C_Maze_1 = __webpack_require__(/*! ../d_mdl/C_Maze */ "./src/d_mdl/C_Maze.ts");
const C_Hero_1 = __webpack_require__(/*! ../d_mdl/C_Hero */ "./src/d_mdl/C_Hero.ts");
const C_PointDir_1 = __webpack_require__(/*! ../d_mdl/C_PointDir */ "./src/d_mdl/C_PointDir.ts");
const C_MazeInfo_1 = __webpack_require__(/*! ../d_mdl/C_MazeInfo */ "./src/d_mdl/C_MazeInfo.ts");
const C_UrlOpt_1 = __webpack_require__(/*! ../d_utl/C_UrlOpt */ "./src/d_utl/C_UrlOpt.ts");
const F_POST_1 = __webpack_require__(/*! ../d_cmn/F_POST */ "./src/d_cmn/F_POST.ts");
const global_1 = __webpack_require__(/*! ../d_cmn/global */ "./src/d_cmn/global.ts");
function get_mai_maze(callback) {
    return __awaiter(this, void 0, void 0, function* () {
        const opt = new C_UrlOpt_1.C_UrlOpt();
        opt.set('mode', 'new_game');
        opt.set('pid', global_1.g_start_env.pid);
        return yield _get_new_game(global_1.g_url[global_1.g_url_new_maze], opt, callback);
    });
}
function get_mai_guld(callback) {
    return __awaiter(this, void 0, void 0, function* () {
        const opt = new C_UrlOpt_1.C_UrlOpt();
        opt.set('mode', 'new_game');
        opt.set('pid', global_1.g_start_env.pid.toString());
        return yield _get_new_game(global_1.g_url[global_1.g_url_new_guld], opt, callback);
    });
}
function _get_new_game(url, opt, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        return yield ((_a = (0, F_POST_1.POST_and_get_JSON3)(url, opt)) === null || _a === void 0 ? void 0 : _a.then(jsonObj => {
            if (jsonObj.ecode === 0) {
                global_1.g_mes.normal_message('正常にロードされました');
                if (jsonObj.save === undefined) {
                    global_1.g_mes.warning_message("保存データが不正な形式でした\n" + jsonObj.emsg);
                    (0, global_1._alert)(jsonObj.emsg);
                    return undefined;
                }
                const monitor = false;
                if (monitor) {
                    if ((jsonObj === null || jsonObj === void 0 ? void 0 : jsonObj.save) !== undefined) {
                        (0, C_SaveData_1.alert_save_info)(jsonObj.save);
                        (0, C_SaveData_1.alert_save_detail)(jsonObj.save);
                    }
                }
                if (callback !== undefined)
                    callback(jsonObj);
                return jsonObj;
            }
            else {
                global_1.g_mes.warning_message("ロードできませんでした\n" + jsonObj.emsg);
                (0, global_1._alert)(jsonObj.emsg);
                return undefined;
            }
        }));
    });
}
function get_new_maze(maze_name, callback) {
    var _a;
    const opt = new C_UrlOpt_1.C_UrlOpt();
    opt.set('mode', 'new_maze');
    opt.set('pid', global_1.g_start_env.pid);
    opt.set('maze_name', maze_name);
    return (_a = (0, F_POST_1.POST_and_get_JSON3)(global_1.g_url[global_1.g_url_get_maze], opt)) === null || _a === void 0 ? void 0 : _a.then(jsonObj => {
        var _a, _b, _c, _d;
        if (jsonObj.ecode !== 0) {
            global_1.g_mes.warning_message("新迷宮データを受信できませんでした\n" + jsonObj.emsg);
            (0, global_1._alert)(jsonObj.emsg);
            return undefined;
        }
        if ((jsonObj === null || jsonObj === void 0 ? void 0 : jsonObj.data) === undefined) {
            global_1.g_mes.warning_message("受信データが不正な形式でした\n" + jsonObj.emsg);
            (0, global_1._alert)(jsonObj.emsg);
            return undefined;
        }
        if (((_a = jsonObj === null || jsonObj === void 0 ? void 0 : jsonObj.data) === null || _a === void 0 ? void 0 : _a.maze) === undefined) {
            global_1.g_mes.warning_message("新迷宮データが不正な形式でした\n" + jsonObj.emsg);
            (0, global_1._alert)(jsonObj.emsg);
            return undefined;
        }
        if (((_b = jsonObj === null || jsonObj === void 0 ? void 0 : jsonObj.data) === null || _b === void 0 ? void 0 : _b.pos) === undefined) {
            global_1.g_mes.warning_message("新迷宮の位置データが不正な形式でした\n" + jsonObj.emsg);
            (0, global_1._alert)(jsonObj.emsg);
            return undefined;
        }
        const monitor = false;
        if (monitor) {
            if (((_c = jsonObj === null || jsonObj === void 0 ? void 0 : jsonObj.data) === null || _c === void 0 ? void 0 : _c.maze) !== undefined)
                (0, C_Maze_1.alert_maze_info)(jsonObj.data.maze);
            if (((_d = jsonObj === null || jsonObj === void 0 ? void 0 : jsonObj.data) === null || _d === void 0 ? void 0 : _d.pos) !== undefined)
                (0, C_PointDir_1.alert_PD_info)(jsonObj.data.pos);
        }
        if (callback !== undefined)
            callback(jsonObj === null || jsonObj === void 0 ? void 0 : jsonObj.data);
        return jsonObj;
    });
}
function get_save_info(callback) {
    var _a;
    const opt = new C_UrlOpt_1.C_UrlOpt();
    opt.set('mode', 'save_info');
    opt.set('pid', global_1.g_start_env.pid);
    return (_a = (0, F_POST_1.POST_and_get_JSON3)(global_1.g_url[global_1.g_url_get_info], opt)) === null || _a === void 0 ? void 0 : _a.then(jsonObj => {
        if (jsonObj.ecode === 0) {
            global_1.g_mes.normal_message('正常にロードされました');
            if (jsonObj.save_info === undefined) {
                global_1.g_mes.warning_message("保存データが不正な形式でした\n" + jsonObj.emsg);
                (0, global_1._alert)(jsonObj.emsg);
                return undefined;
            }
            const monitor = false;
            if (monitor) {
                for (let save of jsonObj.save_info) {
                    if (save !== undefined) {
                        (0, C_SaveData_1.alert_save_info)(save);
                    }
                }
            }
            if (callback !== undefined)
                callback(jsonObj);
            return jsonObj;
        }
        else {
            global_1.g_mes.warning_message("ロードできませんでした\n" + jsonObj.emsg);
            (0, global_1._alert)(jsonObj.emsg);
            return undefined;
        }
    });
}
function get_maze_info(callback) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const opt = new C_UrlOpt_1.C_UrlOpt();
        opt.set('mode', 'maze_info');
        return yield ((_a = (0, F_POST_1.POST_and_get_JSON3)(global_1.g_url[global_1.g_url_all_maze], opt)) === null || _a === void 0 ? void 0 : _a.then(jsonObj => {
            var _a, _b, _c, _d;
            if (jsonObj.ecode === 0) {
                global_1.g_mes.normal_message('正常にロードされました');
                if (((_a = jsonObj === null || jsonObj === void 0 ? void 0 : jsonObj.data) === null || _a === void 0 ? void 0 : _a.mazeinfo) === undefined) {
                    global_1.g_mes.warning_message("迷宮情報が不正な形式でした\n" + jsonObj.emsg);
                    (0, global_1._alert)(jsonObj.emsg);
                    return undefined;
                }
                const monitor = false;
                if (monitor) {
                    if (((_b = jsonObj === null || jsonObj === void 0 ? void 0 : jsonObj.data) === null || _b === void 0 ? void 0 : _b.mazeinfo) !== undefined) {
                        for (const mazeinfo of jsonObj.data.mazeinfo) {
                            (0, C_MazeInfo_1.alert_mazeinfo_info)(mazeinfo);
                        }
                    }
                }
                if (callback !== undefined)
                    callback((_c = jsonObj === null || jsonObj === void 0 ? void 0 : jsonObj.data) === null || _c === void 0 ? void 0 : _c.mazeinfo);
                return (_d = jsonObj === null || jsonObj === void 0 ? void 0 : jsonObj.data) === null || _d === void 0 ? void 0 : _d.mazeinfo;
            }
            else {
                global_1.g_mes.warning_message("ロードできませんでした\n" + jsonObj.emsg);
                (0, global_1._alert)(jsonObj.emsg);
                return undefined;
            }
        }));
    });
}
function get_new_hero() {
    return __awaiter(this, arguments, void 0, function* (num = 20, callback) {
        var _a;
        const opt = new C_UrlOpt_1.C_UrlOpt();
        opt.set('mode', 'new_hero');
        opt.set('nmbr', num.toString());
        return yield ((_a = (0, F_POST_1.POST_and_get_JSON3)(global_1.g_url[global_1.g_url_all_hres], opt)) === null || _a === void 0 ? void 0 : _a.then(jsonObj => {
            var _a, _b;
            if (jsonObj.ecode === 0) {
                global_1.g_mes.normal_message('正常にロードされました');
                if (((_a = jsonObj === null || jsonObj === void 0 ? void 0 : jsonObj.data) === null || _a === void 0 ? void 0 : _a.hres) === undefined) {
                    global_1.g_mes.warning_message("ヒーロー・データが不正な形式でした\n" + jsonObj.emsg);
                    (0, global_1._alert)(jsonObj.emsg);
                    return;
                }
                const monitor = false;
                if (monitor) {
                    if (((_b = jsonObj === null || jsonObj === void 0 ? void 0 : jsonObj.data) === null || _b === void 0 ? void 0 : _b.hres) !== undefined)
                        (0, C_Hero_1.alert_hres_info)(jsonObj.data.hres);
                }
                if (callback !== undefined)
                    callback(jsonObj === null || jsonObj === void 0 ? void 0 : jsonObj.data);
                return jsonObj === null || jsonObj === void 0 ? void 0 : jsonObj.data;
            }
            else {
                global_1.g_mes.warning_message("ロードできませんでした\n" + jsonObj.emsg);
                (0, global_1._alert)(jsonObj.emsg);
                return undefined;
            }
        }));
    });
}
function tmp_load(opt, callback) {
    opt !== null && opt !== void 0 ? opt : (opt = new C_UrlOpt_1.C_UrlOpt());
    opt.set('mode', 'tmp_load');
    opt.set('pid', global_1.g_start_env.pid);
    opt.set('uno', 100);
    return __auto_load(opt, callback);
}
function instant_load(opt, callback) {
    opt !== null && opt !== void 0 ? opt : (opt = new C_UrlOpt_1.C_UrlOpt());
    opt.set('mode', 'instant_load');
    opt.set('pid', global_1.g_start_env.pid);
    opt.set('uno', 101);
    return __auto_load(opt, callback);
}
function UD_load(opt, callback) {
    opt !== null && opt !== void 0 ? opt : (opt = new C_UrlOpt_1.C_UrlOpt());
    opt.set('mode', 'UD_load');
    opt.set('pid', global_1.g_start_env.pid);
    opt.set('uno', 102);
    return __auto_load(opt, callback);
}
function before_load(opt, callback) {
    opt !== null && opt !== void 0 ? opt : (opt = new C_UrlOpt_1.C_UrlOpt());
    opt.set('mode', 'before_load');
    opt.set('pid', global_1.g_start_env.pid);
    opt.set('uno', 103);
    return __auto_load(opt, callback);
}
function general_load(uniq_no, opt, callback) {
    opt !== null && opt !== void 0 ? opt : (opt = new C_UrlOpt_1.C_UrlOpt());
    opt.set('mode', 'general_load');
    opt.set('pid', global_1.g_start_env.pid);
    opt.set('uno', uniq_no);
    return __auto_load(opt, callback);
}
function __auto_load(opt, callback) {
    var _a;
    return (_a = (0, F_POST_1.POST_and_get_JSON3)(global_1.g_url[global_1.g_url_get_data], opt)) === null || _a === void 0 ? void 0 : _a.then(jsonObj => {
        if (jsonObj.ecode === 0) {
            global_1.g_mes.normal_message('正常にロードされました');
            if ((jsonObj === null || jsonObj === void 0 ? void 0 : jsonObj.save) === undefined) {
                global_1.g_mes.warning_message("受信した保存データが不正な形式でした\n" + jsonObj.emsg);
                (0, global_1._alert)(jsonObj.emsg);
                return undefined;
            }
            const monitor = false;
            if (monitor) {
                if ((jsonObj === null || jsonObj === void 0 ? void 0 : jsonObj.save) !== undefined) {
                    (0, C_SaveData_1.alert_save_info)(jsonObj.save);
                    (0, C_SaveData_1.alert_save_detail)(jsonObj.save);
                }
            }
            if (callback !== undefined)
                callback(jsonObj);
            return jsonObj;
        }
        else {
            global_1.g_mes.warning_message(`ロードできませんでした${jsonObj.ecode}\n` + jsonObj.emsg);
            (0, global_1._alert)(jsonObj.emsg);
            return undefined;
        }
    });
}
function tmp_save(opt, callback) {
    opt !== null && opt !== void 0 ? opt : (opt = new C_UrlOpt_1.C_UrlOpt());
    opt.set('mode', 'tmp_save');
    opt.set('pid', global_1.g_start_env.pid);
    opt.set('uno', 100);
    return __auto_save(opt, callback);
}
function instant_save(opt, callback) {
    opt !== null && opt !== void 0 ? opt : (opt = new C_UrlOpt_1.C_UrlOpt());
    opt.set('mode', 'instant_save');
    opt.set('pid', global_1.g_start_env.pid);
    opt.set('uno', 101);
    return __auto_save(opt, callback);
}
function UD_save(opt, callback) {
    opt !== null && opt !== void 0 ? opt : (opt = new C_UrlOpt_1.C_UrlOpt());
    opt.set('mode', 'UD_save');
    opt.set('pid', global_1.g_start_env.pid);
    opt.set('uno', 102);
    return __auto_save(opt, callback);
}
function before_save(opt, callback) {
    opt !== null && opt !== void 0 ? opt : (opt = new C_UrlOpt_1.C_UrlOpt());
    opt.set('mode', 'before_save');
    opt.set('pid', global_1.g_start_env.pid);
    opt.set('uno', 103);
    return __auto_save(opt, callback);
}
function general_save(opt, callback) {
    global_1.g_save.auto_mode = false;
    opt !== null && opt !== void 0 ? opt : (opt = new C_UrlOpt_1.C_UrlOpt());
    opt.set('mode', 'general_save');
    opt.set('pid', global_1.g_start_env.pid);
    return __save(opt, callback);
}
function __auto_save(opt, callback) {
    global_1.g_save.auto_mode = true;
    return __save(opt, callback);
}
function __save(opt, callback) {
    var _a;
    if (!opt.isset('save')) {
        opt.set('save', JSON.stringify(global_1.g_save.encode(), null, "\t"));
    }
    const move_page = false;
    if (move_page) {
        (0, F_POST_1.POST_and_move_page)(global_1.g_url[global_1.g_url_check_JSON], opt);
    }
    return (_a = (0, F_POST_1.POST_and_get_JSON3)(global_1.g_url[global_1.g_url_put_data], opt)) === null || _a === void 0 ? void 0 : _a.then(jsonObj => {
        if ((jsonObj === null || jsonObj === void 0 ? void 0 : jsonObj.ecode) === 0) {
            if ((jsonObj === null || jsonObj === void 0 ? void 0 : jsonObj.save) === undefined) {
                global_1.g_mes.warning_message("受信した保存データが不正な形式でした\n" + jsonObj.emsg);
                (0, global_1._alert)(jsonObj.emsg);
                return undefined;
            }
            const monitor = false;
            if (monitor) {
                if ((jsonObj === null || jsonObj === void 0 ? void 0 : jsonObj.save) !== undefined) {
                    (0, C_SaveData_1.alert_save_info)(jsonObj.save);
                    (0, C_SaveData_1.alert_save_detail)(jsonObj.save);
                }
            }
            if (callback !== undefined)
                callback(jsonObj);
            global_1.g_mes.normal_message('正常にセーブされました');
            return jsonObj;
        }
        else {
            global_1.g_mes.warning_message("セーブできませんでした\n" + jsonObj.emsg);
            (0, global_1._alert)(jsonObj.emsg);
            return undefined;
        }
    }).catch(err => {
        global_1.g_mes.warning_message('POST読み込みに失敗しました(POST_AND_JSON3)');
        return undefined;
    });
}


/***/ }),

/***/ "./src/d_cmn/global.ts":
/*!*****************************!*\
  !*** ./src/d_cmn/global.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.g_save = exports.g_mes = exports.g_start_env = exports.g_ready_games = exports.g_alert = exports.g_debug = exports.g_my_url = exports.g_url = exports.g_url_gt2_save = exports.g_url_gt2_maze = exports.g_url_gt2_guld = exports.g_url_rcd_save = exports.g_url_rcd_load = exports.g_url_rcd_list = exports.g_url_check_JSON = exports.g_url_put_data = exports.g_url_get_data = exports.g_url_get_info = exports.g_url_mai_guld = exports.g_url_mai_maze = exports.g_url_all_save = exports.g_url_put_save = exports.g_url_get_save = exports.g_url_all_hres = exports.g_url_new_guld = exports.g_url_all_maze = exports.g_url_new_maze = exports.g_url_get_maze = void 0;
exports.init_after_loaded_DOM_in_common = init_after_loaded_DOM_in_common;
exports._alert = _alert;
exports.g_url_get_maze = 0;
exports.g_url_new_maze = 1;
exports.g_url_all_maze = 2;
exports.g_url_new_guld = 5;
exports.g_url_all_hres = 6;
exports.g_url_get_save = 7;
exports.g_url_put_save = 8;
exports.g_url_all_save = 9;
exports.g_url_mai_maze = 10;
exports.g_url_mai_guld = 11;
exports.g_url_get_info = 12;
exports.g_url_get_data = 13;
exports.g_url_put_data = 15;
exports.g_url_check_JSON = 16;
exports.g_url_rcd_list = 17;
exports.g_url_rcd_load = 18;
exports.g_url_rcd_save = 19;
exports.g_url_gt2_guld = 20;
exports.g_url_gt2_maze = 21;
exports.g_url_gt2_save = 22;
exports.g_url = new Array(23);
const C_OnOffButton_1 = __webpack_require__(/*! ../d_ctl/C_OnOffButton */ "./src/d_ctl/C_OnOffButton.ts");
const C_AlertLog_1 = __webpack_require__(/*! ../d_cmn/C_AlertLog */ "./src/d_cmn/C_AlertLog.ts");
class C_ReadyGames {
    constructor() {
        this.flgs = {};
        this.flgs.loadedDOM = false;
        this.flgs.getWindow = false;
        this.func = () => { };
    }
    setLoadedDOM() {
        this.flgs.loadedDOM = true;
        this.check_and_do();
    }
    setGetWindow() {
        this.flgs.getWindow = true;
        this.check_and_do();
    }
    setFunction(func) {
        this.func = func;
        this.check_and_do();
    }
    check_and_do() {
        if (this.func === undefined)
            return;
        for (let ii in this.flgs)
            if (!this.flgs[ii])
                return;
        this.func();
    }
}
exports.g_ready_games = new C_ReadyGames();
exports.g_start_env = { mode: '', pid: -1, opt: '' };
const C_DisplayMessage_1 = __webpack_require__(/*! ../d_vie/C_DisplayMessage */ "./src/d_vie/C_DisplayMessage.ts");
const C_SaveData_1 = __webpack_require__(/*! ../d_mdl/C_SaveData */ "./src/d_mdl/C_SaveData.ts");
exports.g_save = new C_SaveData_1.C_SaveData();
function init_after_loaded_DOM_in_common(debug_id = 'debug_mode', msg_id = 'pane_sytm_logs') {
    const con = document.getElementById(msg_id);
    exports.g_mes = C_DisplayMessage_1.C_DisplayMessage.getObj(con, 'client_message');
    exports.g_alert = C_AlertLog_1.C_AlertLog.getObj();
    const btn = document.getElementById(debug_id);
    exports.g_debug = C_OnOffButton_1.C_OnOffButton.getObj(btn, {});
}
function _alert(txt, page_size = 250) {
    for (let i = 0; i < txt.length; i += page_size) {
        if (!window.confirm(txt.substring(i, i + page_size)))
            break;
    }
}
const tsCaller = (() => {
    return {
        get_init_data: (my_url) => {
            exports.g_my_url = my_url;
            const url_top = parent_url(my_url);
            const exp_top = parent_url(url_top) + "/maiex";
            exports.g_url[exports.g_url_gt2_save] = url_top + "/_JSON_mai_save.php";
            exports.g_url[exports.g_url_gt2_maze] = url_top + "/_JSON_mai_maze.php";
            exports.g_url[exports.g_url_gt2_guld] = url_top + "/_JSON_mai_guld.php";
            exports.g_url[exports.g_url_mai_maze] = url_top + "/mai_maze.php";
            exports.g_url[exports.g_url_mai_guld] = url_top + "/mai_guld.php";
            exports.g_url[exports.g_url_new_maze] = exp_top + "/maze/newMaze";
            exports.g_url[exports.g_url_get_maze] = exp_top + "/maze/getMaze";
            exports.g_url[exports.g_url_all_maze] = exp_top + "/maze/allMaze";
            exports.g_url[exports.g_url_new_guld] = exp_top + "/guld/newGuld";
            exports.g_url[exports.g_url_all_hres] = exp_top + "/guld/allHres";
            exports.g_url[exports.g_url_get_info] = exp_top + "/ldsv/_info";
            exports.g_url[exports.g_url_get_data] = exp_top + "/ldsv/_load";
            exports.g_url[exports.g_url_put_data] = exp_top + "/ldsv/_save";
            exports.g_url[exports.g_url_check_JSON] = url_top + "/check_JSON.php";
        },
        start_game: (mode, my_url, player_id, opt) => {
            tsCaller.get_init_data(my_url);
            exports.g_start_env.mode = mode;
            exports.g_start_env.pid = player_id;
            exports.g_start_env.opt = opt;
            exports.g_ready_games.setGetWindow();
        }
    };
})();
function parent_url(url) {
    let re = /\/[^\/]+?$/;
    return url.replace(re, '');
}
window.tsCall = tsCaller;


/***/ }),

/***/ "./src/d_ctl/C_CtlCursor.ts":
/*!**********************************!*\
  !*** ./src/d_ctl/C_CtlCursor.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.C_CtlCursor = void 0;
const F_Math_1 = __webpack_require__(/*! ../d_utl/F_Math */ "./src/d_utl/F_Math.ts");
const global_1 = __webpack_require__(/*! ../d_cmn/global */ "./src/d_cmn/global.ts");
class C_CtlCursor {
    constructor(list) {
        var _a;
        (_a = C_CtlCursor.me) !== null && _a !== void 0 ? _a : (C_CtlCursor.me = {});
        this._id = '__dmy__';
        this._list = undefined;
        this._leng = 0;
        this._cols = 1;
        this._indx = 0;
        C_CtlCursor.me[this._id] = this;
    }
    static getObj(list) {
        var _a, _b;
        var _c;
        (_a = this.me) !== null && _a !== void 0 ? _a : (this.me = {});
        const id = list !== undefined ? list.id : '__dmy__';
        (_b = (_c = this.me)[id]) !== null && _b !== void 0 ? _b : (_c[id] = new C_CtlCursor(list));
        if (list !== undefined)
            this.me[id].set(list);
        return this.me[id];
    }
    set(list) {
        this._id = list.id;
        this._list = list;
        this._leng = this.__get_leng();
        this._cols = this.__get_cols();
        this._indx = 0;
        this.high_light_on();
        return this;
    }
    uid() {
        return this._id;
    }
    leng() {
        return this._leng;
    }
    rows() {
        return this.__get_rows();
    }
    cols() {
        return this._cols;
    }
    pos() {
        return this._indx;
    }
    set_pos(indx) {
        if (indx < 0)
            indx = 0;
        if (indx >= this._leng)
            indx = this._leng - 1;
        this._indx = indx;
        this.high_light_on();
        return this;
    }
    pos_U() {
        if (this._list === undefined)
            return 0;
        let indx = this._indx;
        const rows = this.__get_rows();
        const cur_row = indx % rows;
        if (cur_row !== 0) {
            --indx;
        }
        else {
            indx += rows - 1;
            while (indx > this._leng - 1) {
                --indx;
            }
        }
        this._indx = indx;
        this.high_light_on();
        return this._indx;
    }
    pos_D() {
        if (this._list === undefined)
            return 0;
        let indx = this._indx;
        const rows = this.__get_rows();
        const cur_row = indx % rows;
        if (cur_row !== rows - 1 && indx !== this._leng - 1) {
            ++indx;
        }
        else {
            indx -= rows - 1;
            while (indx % rows !== 0 && indx < this._leng - 1) {
                ++indx;
            }
        }
        this._indx = indx;
        this.high_light_on();
        return this._indx;
    }
    pos_L() {
        if (this._list === undefined)
            return 0;
        let indx = this._indx;
        const rows = this.__get_rows();
        if (indx > rows - 1) {
            indx -= rows;
        }
        else {
            const vurtual_list_leng = this._cols * rows;
            indx += vurtual_list_leng - rows;
            while (indx > this._leng - 1) {
                indx -= rows;
                if (indx < 0) {
                    indx = 0;
                    break;
                }
            }
        }
        this._indx = indx;
        this.high_light_on();
        return this._indx;
    }
    pos_R() {
        if (this._list === undefined)
            return 0;
        let indx = this._indx;
        const rows = this.__get_rows();
        if (indx < this._leng - rows) {
            indx += rows;
        }
        else {
            const old_indx = indx;
            const vurtual_list_leng = this._cols * rows;
            indx -= vurtual_list_leng - rows;
            if (indx < 0) {
                indx += rows;
                if (indx < 0 || indx > this._leng - 1)
                    indx = (0, F_Math_1._floor)((old_indx + 1) / this._cols, 0);
            }
        }
        this._indx = indx;
        this.high_light_on();
        return this._indx;
    }
    __get_rows() {
        return (0, F_Math_1._ceil)(this._leng / this._cols, 0);
    }
    __get_leng() {
        if (this._list === undefined)
            return 0;
        try {
            return this._list.children.length;
        }
        catch (err) {
            return 1;
        }
    }
    __get_cols() {
        if (this._list === undefined)
            return 0;
        try {
            let cols = window.getComputedStyle(this._list).columnCount;
            return (0, F_Math_1._isNum)(cols) ? Number(cols) : 1;
        }
        catch (err) {
            return 1;
        }
    }
    high_light_on() {
        if (this._list === undefined)
            return;
        const children = this._list.children;
        const len = children.length;
        if (this._indx < 0 || this._indx > len - 1)
            return;
        for (let i = 0; i < len; i++) {
            const li = children.item(i);
            this.__high_light_on(li, false);
        }
        const li = children.item(this._indx);
        this.__high_light_on(li, true);
    }
    high_light_off() {
        if (this._list === undefined)
            return;
        const children = this._list.children;
        const len = children.length;
        for (var i = 0; i < len; i++) {
            const li = children.item(i);
            this.__high_light_on(li, false);
        }
    }
    __high_light_on(elm, isOn) {
        var _a;
        if (elm === null)
            return;
        const perentStyle = window.getComputedStyle((_a = elm.parentElement) !== null && _a !== void 0 ? _a : elm);
        const fw_color = perentStyle.color;
        const bg_color = perentStyle.backgroundColor;
        elm.style.color = isOn ? bg_color : fw_color;
        elm.style.backgroundColor = isOn ? fw_color : bg_color;
        elm.style.fontWeight = isOn ? 'bold' : 'normal';
        for (var j = 0; j < elm.children.length; j++) {
            const p = elm.children.item(j);
            if (isOn) {
                p.style.fontWeight = 'normal';
                p.style.color = fw_color;
                p.style.backgroundColor = bg_color;
                p.style.display = 'block';
            }
            else {
                p.style.display = 'none';
            }
        }
    }
    alert() {
        (0, global_1._alert)("CtlCursor: "
            + "\nid   = " + this._id
            + "\nindx = " + this._indx
            + "\nleng = " + this._leng
            + "\ncols = " + this._cols);
    }
    ;
}
exports.C_CtlCursor = C_CtlCursor;


/***/ }),

/***/ "./src/d_ctl/C_OnOffButton.ts":
/*!************************************!*\
  !*** ./src/d_ctl/C_OnOffButton.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.C_OnOffButton = void 0;
const F_Rand_1 = __webpack_require__(/*! ../d_utl/F_Rand */ "./src/d_utl/F_Rand.ts");
class C_OnOffButton {
    static getObj(elm, ooo) {
        var _a, _b;
        var _c, _d;
        (_a = this.me) !== null && _a !== void 0 ? _a : (this.me = {});
        (_b = (_c = this.me)[_d = elm.id]) !== null && _b !== void 0 ? _b : (_c[_d] = new C_OnOffButton(elm, ooo));
        return this.me[elm.id];
    }
    constructor(elm, ooo) {
        this.def_ooo = {
            onName: 'ON',
            offName: 'off',
            onClass: '_toggle_on',
            offClass: '_toggle_off',
        };
        this.fnc = {};
        this.ooo = this.def_ooo;
        this.yn = false;
        if (elm.name === undefined || elm.name === '')
            elm.name = elm.id;
        this.elm = elm;
        this.elm.addEventListener("click", (event) => { this.toggle(); }, false);
        if (ooo !== undefined)
            this.setObj(ooo);
    }
    setObj(ooo) {
        var _a, _b, _c, _d, _e;
        var _f, _g, _h, _j;
        try {
            this.yn = (_a = ooo.yn) !== null && _a !== void 0 ? _a : false;
            this.ooo = ooo;
            (_b = (_f = this.ooo).onName) !== null && _b !== void 0 ? _b : (_f.onName = this.def_ooo.onName);
            (_c = (_g = this.ooo).offName) !== null && _c !== void 0 ? _c : (_g.offName = this.def_ooo.offName);
            (_d = (_h = this.ooo).onClass) !== null && _d !== void 0 ? _d : (_h.onClass = this.def_ooo.onClass);
            (_e = (_j = this.ooo).offClass) !== null && _e !== void 0 ? _e : (_j.offClass = this.def_ooo.offClass);
            this._setStyle(this.yn);
        }
        catch (_k) { }
        return this;
    }
    _setStyle(yn) {
        this.yn = yn;
        const ooo = this.ooo;
        this.elm.value = yn ? 'on' : 'off';
        this.elm.innerHTML = yn ? ooo.onName : ooo.offName;
        this.elm.classList.remove(yn ? ooo.offClass : ooo.onClass);
        this.elm.classList.add(yn ? ooo.onClass : ooo.offClass);
    }
    setON() { var _a; return (_a = this._setYN(true)) !== null && _a !== void 0 ? _a : false; }
    ;
    setOFF() { var _a; return (_a = this._setYN(false)) !== null && _a !== void 0 ? _a : false; }
    ;
    toggle() { var _a; return (_a = this._setYN(!this.yn)) !== null && _a !== void 0 ? _a : false; }
    _setYN(yn) {
        this._setStyle(yn);
        let tf = true;
        for (const i in this.fnc)
            tf && (tf = this.fnc[i](yn));
        return tf;
    }
    id() { return this.elm.id; }
    ;
    isON() { return this.yn; }
    addFnc(fnc) {
        const id = 'oofunc_' + (0, F_Rand_1._get_uuid)();
        this.fnc[id] = fnc;
        return id;
    }
    rmvFnc(fnc) {
        if (typeof fnc === 'string') {
            try {
                delete this.fnc[fnc];
                return true;
            }
            catch (err) {
                return false;
            }
        }
        for (const i in this.fnc)
            if (fnc === this.fnc[i]) {
                delete this.fnc[i];
                return true;
            }
        return false;
    }
}
exports.C_OnOffButton = C_OnOffButton;


/***/ }),

/***/ "./src/d_mdl/C_Guild.ts":
/*!******************************!*\
  !*** ./src/d_mdl/C_Guild.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.C_Guild = void 0;
exports.alert_guld_info = alert_guld_info;
const C_Location_1 = __webpack_require__(/*! ./C_Location */ "./src/d_mdl/C_Location.ts");
const C_Hero_1 = __webpack_require__(/*! ./C_Hero */ "./src/d_mdl/C_Hero.ts");
const F_Rand_1 = __webpack_require__(/*! ../d_utl/F_Rand */ "./src/d_utl/F_Rand.ts");
function alert_guld_info(a) {
    var _a, _b, _c, _d, _e, _f, _g;
    if (a === undefined)
        return;
    alert("Guild Info:"
        + "\nid:       " + ((_a = a.id) !== null && _a !== void 0 ? _a : '?')
        + "\nuniq_id:  " + ((_b = a.uniq_id) !== null && _b !== void 0 ? _b : '?')
        + "\nsave_id:  " + ((_c = a.save_id) !== null && _c !== void 0 ? _c : '?')
        + "\nname:     " + ((_d = a.name) !== null && _d !== void 0 ? _d : '?')
        + "\ngold:     " + ((_e = a.gold) !== null && _e !== void 0 ? _e : 0)
        + "\nheroes:   " + ((_g = (_f = a.heroes) === null || _f === void 0 ? void 0 : _f.length) !== null && _g !== void 0 ? _g : '?')
        + "\n");
}
class C_Guild {
    constructor(a) {
        this.id = -1;
        this.uniq_id = 'mai_guld#' + (0, F_Rand_1._get_uuid)();
        this.save_id = -1;
        this.name = '';
        this.gold = 0;
        this.heroes = {};
        if (a !== undefined)
            this.decode(a);
    }
    uid() { return this.uniq_id; }
    get_lckd() { return C_Location_1.T_Lckd.Maze; }
    get_name() { return this.name; }
    hres() {
        const hres = [];
        for (let ii in this.heroes)
            hres.push(this.heroes[ii]);
        return hres;
    }
    clear_hres() {
        this.heroes = {};
    }
    add_hero(hero) {
        this.heroes[hero.uid()] = hero;
    }
    rmv_hero(hero) {
        delete this.heroes[hero.uid()];
    }
    encode() {
        const json_heroes = [];
        for (let ii in this.heroes)
            json_heroes.push(this.heroes[ii].encode());
        return {
            id: this.id,
            uniq_id: this.uniq_id,
            save_id: this.save_id,
            gold: this.gold,
            heroes: json_heroes,
            name: this.name,
        };
    }
    decode(a) {
        if (a === undefined)
            return this;
        if (a.id !== undefined)
            this.id = a.id;
        if (a.uniq_id !== undefined)
            this.uniq_id = a.uniq_id;
        if (a.save_id !== undefined)
            this.save_id = a.save_id;
        if (a.name !== undefined)
            this.name = a.name;
        if (a.gold !== undefined)
            this.gold;
        if (a.heroes !== undefined) {
            this.heroes = {};
            for (const json_hero of a.heroes) {
                const hero = new C_Hero_1.C_Hero(json_hero);
                this.heroes[hero.uid()] = hero;
            }
        }
        return this;
    }
    static encode_all(all_guld) {
        const all_guld_data = [];
        for (let guld of all_guld) {
            all_guld_data.push(guld.encode());
        }
        return all_guld_data;
    }
    static decode_all(all_guld_data) {
        const all_guld = [];
        for (let guld_data of all_guld_data) {
            all_guld.push((new C_Guild()).decode(guld_data));
        }
        return all_guld;
    }
    alert() {
        var _a, _b, _c, _d, _e, _f, _g;
        alert("Guild Info:"
            + "\nid:       " + ((_a = this.id) !== null && _a !== void 0 ? _a : '?')
            + "\nuniq_id:  " + ((_b = this.uniq_id) !== null && _b !== void 0 ? _b : '?')
            + "\nsave_id:  " + ((_c = this.save_id) !== null && _c !== void 0 ? _c : '?')
            + "\nname:     " + ((_d = this.name) !== null && _d !== void 0 ? _d : '?')
            + "\ngold:     " + ((_e = this.gold) !== null && _e !== void 0 ? _e : 0)
            + "\nheroes:   " + ((_g = (_f = this.heroes) === null || _f === void 0 ? void 0 : _f.length) !== null && _g !== void 0 ? _g : '?')
            + "\n");
    }
}
exports.C_Guild = C_Guild;


/***/ }),

/***/ "./src/d_mdl/C_Hero.ts":
/*!*****************************!*\
  !*** ./src/d_mdl/C_Hero.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.C_Hero = void 0;
exports.alert_hres_info = alert_hres_info;
exports.alert_hero_info = alert_hero_info;
const C_HeroAbility_1 = __webpack_require__(/*! ./C_HeroAbility */ "./src/d_mdl/C_HeroAbility.ts");
const F_Rand_1 = __webpack_require__(/*! ../d_utl/F_Rand */ "./src/d_utl/F_Rand.ts");
function alert_hres_info(a) {
    if (a === undefined)
        return;
    alert('Number of Hero = ' + a.length.toString());
    for (var i in a) {
        if (a[i] === undefined)
            continue;
        alert_hero_info(a[i]);
    }
}
function alert_hero_info(a) {
    var _a, _b, _c, _d, _e;
    if (a === undefined)
        return;
    alert("Hero Info:\n"
        + "\nid:       " + ((_a = a === null || a === void 0 ? void 0 : a.id) !== null && _a !== void 0 ? _a : '?')
        + "\nuniq_id   " + ((_b = a === null || a === void 0 ? void 0 : a.uniq_id) !== null && _b !== void 0 ? _b : '?')
        + "\nname:     " + ((_c = a === null || a === void 0 ? void 0 : a.name) !== null && _c !== void 0 ? _c : '?')
        + "\nsave_id:  " + ((_d = a === null || a === void 0 ? void 0 : a.save_id) !== null && _d !== void 0 ? _d : '?')
        + "\nis_alive: " + ((_e = a === null || a === void 0 ? void 0 : a.is_alive) !== null && _e !== void 0 ? _e : '?')
        + "\n");
}
class C_Hero {
    constructor(a) {
        this.my_id = 0;
        this.my_name = 'No Name Hero';
        this.uniq_id = 'mai_hero#' + (0, F_Rand_1._get_uuid)();
        this.save_id = 0;
        this.sex = 0;
        this.age = 0;
        this.gold = 0;
        this.state = 0;
        this.lv = 0;
        this.val = {};
        this.abi_p = { bsc: new C_HeroAbility_1.C_HeroAbility(), ttl: new C_HeroAbility_1.C_HeroAbility(), now: new C_HeroAbility_1.C_HeroAbility() };
        this.abi_m = { bsc: new C_HeroAbility_1.C_HeroAbility(), ttl: new C_HeroAbility_1.C_HeroAbility(), now: new C_HeroAbility_1.C_HeroAbility() };
        this.is_alive = true;
        if (a !== undefined)
            this.decode(a);
    }
    set_prp(arg) {
        this.decode(arg);
    }
    get_uniq_id() { return this.uniq_id; }
    id() {
        return 'Hero_' + this.my_id.toString(16).padStart(5, '0');
    }
    uid() { return this.uniq_id; }
    name() {
        return this.my_name;
    }
    set_name(name) {
        this.my_name = name;
    }
    encode() {
        const ret = {
            id: this.my_id,
            uniq_id: this.uniq_id,
            name: this.my_name,
            save_id: this.save_id,
            sex: this.sex,
            age: this.age,
            state: this.state,
            lv: this.lv,
            gold: this.gold,
            val: this.val,
            abi_p_bsc: this.abi_p.bsc.encode(),
            abi_m_bsc: this.abi_m.bsc.encode(),
            is_alive: (this.is_alive) ? 'Y' : 'N',
        };
        return ret;
    }
    decode(a) {
        if (a === undefined)
            return this;
        if (a.id !== undefined)
            this.my_id = a.id;
        if (a.name !== undefined)
            this.my_name = a.name;
        if (a.uniq_id !== undefined)
            this.uniq_id = a.uniq_id;
        if (a.save_id !== undefined)
            this.save_id = a.save_id;
        if (a.sex !== undefined)
            this.sex = a.sex;
        if (a.age !== undefined)
            this.age = a.age;
        if (a.state !== undefined)
            this.state = a.state;
        if (a.lv !== undefined)
            this.lv = a.lv;
        if (a.gold !== undefined)
            this.gold = a.gold;
        if (a.is_alive !== undefined) {
            if (typeof a.is_alive === "boolean") {
                this.is_alive = a.is_alive;
            }
            else {
                this.is_alive = (a.is_alive != 'N') ? true : false;
            }
        }
        if (a.val !== undefined) {
            this.__decode_val(this.val, a.val);
        }
        if (a.abi_p_bsc !== undefined) {
            this.abi_p.bsc.decode(a.abi_p_bsc);
            this.abi_p.ttl = this.abi_p.now = this.abi_p.bsc;
        }
        if (a.abi_m_bsc !== undefined) {
            this.abi_m.bsc.decode(a.abi_m_bsc);
            this.abi_m.ttl = this.abi_m.now = this.abi_m.bsc;
        }
        return this;
    }
    __decode_val(d, s) {
        if (s.skp !== undefined)
            d.skp = this.__decode_skex(d.skp, s.skp);
        if (s.exp !== undefined)
            d.exp = this.__decode_skex(d.exp, s.exp);
        if (s.nxe !== undefined)
            d.nxe = s.nxe;
    }
    __decode_skex(a, s) {
        var _a, _b, _c, _d, _e;
        var d;
        if (a === undefined)
            d = { ttl: 0, now: 0 };
        else
            d = { ttl: (_a = a === null || a === void 0 ? void 0 : a.ttl) !== null && _a !== void 0 ? _a : 0, now: (_b = a === null || a === void 0 ? void 0 : a.now) !== null && _b !== void 0 ? _b : 0 };
        d.ttl = (_c = s.ttl) !== null && _c !== void 0 ? _c : d.ttl;
        d.now = (_e = (_d = s.now) !== null && _d !== void 0 ? _d : s.ttl) !== null && _e !== void 0 ? _e : d.now;
        return d;
    }
    static create_hero() {
        const new_hero = new C_Hero();
        new_hero.set_prp({ id: Math.floor(-1000.0 * Math.random()) });
        new_hero.set_prp({ name: new_hero.id() });
        return new_hero;
    }
    random_make() {
        this.my_id = 0;
        this.my_name = "冒険者 " + (0, F_Rand_1._random_str)(5);
        this.sex = (0, F_Rand_1._irand)(0, 1);
        this.age = (0, F_Rand_1._irand)(15, 25);
        this.state = 0;
        this.lv = 0;
        this.gold = (0, F_Rand_1._irand)(500, 1000);
        this.val = {
            skp: { ttl: 0, now: 0 },
            exp: { ttl: 0, now: 0 },
            'nxe': 1000
        };
        const abi_p_bsc = this.abi_p.bsc;
        abi_p_bsc.random_make();
        abi_p_bsc.add_xp_bonus((this.age - 15) * 10);
        abi_p_bsc.add_el_bonus((this.age - 15) * 5);
        abi_p_bsc.add_pr_bonus((this.age - 15) * 2);
        this.abi_p.bsc = abi_p_bsc;
        const abi_m_bsc = this.abi_m.bsc;
        abi_m_bsc.random_make();
        abi_m_bsc.add_xp_bonus((this.age - 15) * 10);
        abi_m_bsc.add_el_bonus((this.age - 15) * 5);
        abi_m_bsc.add_pr_bonus((this.age - 15) * 2);
        this.abi_m.bsc = abi_m_bsc;
        return this;
    }
    static encode_heroes(heroes) {
        const heroes_data = [];
        for (var hero of heroes) {
            heroes_data.push(hero.encode());
        }
        return heroes_data;
    }
    static decode_heroes(heroes_data) {
        const heroes = [];
        if (heroes_data !== undefined) {
            for (var hero_data of heroes_data) {
                if (hero_data !== undefined)
                    heroes.push(new C_Hero().decode(hero_data));
            }
        }
        return heroes;
    }
    alert() {
        var _a, _b, _c, _d, _e;
        alert("Hero Info:\n"
            + "\nid:       " + ((_a = this.id) !== null && _a !== void 0 ? _a : '?')
            + "\nuniq_id   " + ((_b = this.uniq_id) !== null && _b !== void 0 ? _b : '?')
            + "\nname:     " + ((_c = this.name) !== null && _c !== void 0 ? _c : '?')
            + "\nsave_id:  " + ((_d = this.save_id) !== null && _d !== void 0 ? _d : '?')
            + "\nis_alive: " + ((_e = this.is_alive) !== null && _e !== void 0 ? _e : '?')
            + "\n");
    }
    static alert_hres(a) {
        var _a;
        if (a === undefined)
            return;
        alert('Number of Hero = ' + a.length.toString());
        for (var i in a)
            (_a = a[i]) === null || _a === void 0 ? void 0 : _a.alert();
    }
}
exports.C_Hero = C_Hero;


/***/ }),

/***/ "./src/d_mdl/C_HeroAbility.ts":
/*!************************************!*\
  !*** ./src/d_mdl/C_HeroAbility.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.C_HeroAbility = void 0;
const F_Math_1 = __webpack_require__(/*! ../d_utl/F_Math */ "./src/d_utl/F_Math.ts");
const F_Rand_1 = __webpack_require__(/*! ../d_utl/F_Rand */ "./src/d_utl/F_Rand.ts");
class C_HeroAbility {
    constructor(a) {
        this.v = {
            xp: 0,
            atk: 0,
            def: 0,
            quc: 0,
            cnc: 0,
            str: 0,
            pwr: 0,
            vit: 0,
            dex: 0,
            agi: 0,
            tec: 0,
            luk: 0,
        };
        for (let idx in this.v) {
            this.v[idx] = 0;
        }
        if (a !== undefined)
            this.decode(a);
    }
    set_prp(a) {
        this.decode(a);
    }
    get(key) {
        if (!(key in this.v))
            return undefined;
        return this.v[key];
    }
    set(key, s) {
        if (!(key in this.v))
            return undefined;
        this.v[key] = s[key];
        return s[key];
    }
    xp_ttladd() {
        return (0, F_Math_1._round)(Math.floor(this.v.str + this.v.vit * 10.0), 0);
    }
    atk_ttladd() {
        return (0, F_Math_1._round)(Math.floor(this.v.str + this.v.pwr + this.v.tec) / 10.0, 0);
    }
    def_ttladd() {
        return (0, F_Math_1._round)(Math.floor(this.v.str + this.v.vit + this.v.tec) / 10.0, 0);
    }
    quc_ttladd() {
        return (0, F_Math_1._round)(Math.floor(this.v.agi + this.v.luk + this.v.tec) / 10.0, 0);
    }
    cnc_ttladd() {
        return (0, F_Math_1._round)(Math.floor(2.0 * this.v.luk + this.v.tec) / 10.0, 0);
    }
    bonus(key) {
        if (!(key in this.v))
            return 0;
        if (key === 'xp')
            return (0, F_Math_1._round)(Math.floor(this.v.xp / 100), 0);
        return (0, F_Math_1._round)(Math.floor(this.v[key] / 10.0), 0);
    }
    add(a) {
        for (let key in a) {
            this.v[key] += a[key];
        }
    }
    add_xp_bonus(bonus) {
        this.v.xp += bonus;
    }
    add_el_bonus(bonus) {
        this.v.atk += bonus;
        this.v.def += bonus;
        this.v.quc += bonus;
        this.v.cnc += bonus;
    }
    add_pr_bonus(bonus) {
        this.v.str += bonus;
        this.v.pwr += bonus;
        this.v.vit += bonus;
        this.v.dex += bonus;
        this.v.agi += bonus;
        this.v.tec += bonus;
        this.v.luk += bonus;
    }
    random_make() {
        this.v.xp = (0, F_Rand_1._inrand)(0, 1000, 3.0);
        this.v.atk = (0, F_Rand_1._inrand)(0, 100, 2.5);
        this.v.def = (0, F_Rand_1._inrand)(0, 100, 2.5);
        this.v.quc = (0, F_Rand_1._inrand)(0, 100, 2.5);
        this.v.cnc = (0, F_Rand_1._inrand)(0, 100, 2.5);
        this.v.str = (0, F_Rand_1._inrand)(0, 20, 2.0);
        this.v.pwr = (0, F_Rand_1._inrand)(0, 20, 2.0);
        this.v.vit = (0, F_Rand_1._inrand)(0, 20, 2.0);
        this.v.dex = (0, F_Rand_1._inrand)(0, 20, 2.0);
        this.v.agi = (0, F_Rand_1._inrand)(0, 20, 2.0);
        this.v.tec = (0, F_Rand_1._inrand)(0, 20, 2.0);
        this.v.luk = (0, F_Rand_1._inrand)(0, 20, 2.0);
        return this;
    }
    encode() {
        const a = {};
        for (let key in this.v)
            a[key] = this.v[key];
        return a;
    }
    decode(a) {
        for (let key in a) {
            if (key in this.v && a[key] !== undefined)
                this.v[key] = a[key];
        }
        return this;
    }
    static clone(s) {
        return new C_HeroAbility(s.encode());
    }
}
exports.C_HeroAbility = C_HeroAbility;


/***/ }),

/***/ "./src/d_mdl/C_Location.ts":
/*!*********************************!*\
  !*** ./src/d_mdl/C_Location.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.C_Location = exports.T_Lckd = void 0;
const C_PointDir_1 = __webpack_require__(/*! ./C_PointDir */ "./src/d_mdl/C_PointDir.ts");
exports.T_Lckd = {
    Unkn: 0,
    Maze: 1,
    Guld: 2,
};
function _lckd_key(lckd) {
    var _a;
    return (_a = Object.keys(exports.T_Lckd).find(key => exports.T_Lckd[key] === lckd)) !== null && _a !== void 0 ? _a : "????";
}
class C_Location {
    constructor(json) {
        this.loc_kind = exports.T_Lckd.Unkn;
        this.loc_name = '';
        this.loc_uid = '';
        this.loc_pos = new C_PointDir_1.C_PointDir();
        if (json !== undefined)
            this.decode(json);
    }
    get_lckd_str() { return _lckd_key(this.loc_kind); }
    get_lckd() { return this.loc_kind; }
    get_name() { return this.loc_name; }
    get_uid() { return this.loc_uid; }
    set_lckd(lckd) {
        if (!(_lckd_key(lckd) in exports.T_Lckd))
            return undefined;
        this.loc_kind = lckd;
        return this;
    }
    set_name(name) { this.loc_name = name; }
    set_uid(uid) { this.loc_uid = uid; }
    set_lckd_str(lckd) {
        if (!(lckd in exports.T_Lckd))
            return undefined;
        this.loc_kind = exports.T_Lckd[lckd];
        return this;
    }
    get_p() {
        return this.loc_pos.get_p();
    }
    get_d() {
        return this.loc_pos.get_d();
    }
    get_pd() {
        return this.loc_pos.get_pd();
    }
    set_p(p) {
        if (this.loc_kind !== exports.T_Lckd.Maze)
            return undefined;
        if (this.loc_pos.set_p(p) === undefined)
            return undefined;
        return this.loc_pos;
    }
    set_d(d) {
        if (this.loc_kind !== exports.T_Lckd.Maze)
            return undefined;
        if (this.loc_pos.set_d(d) === undefined)
            return undefined;
        return this.loc_pos.d;
    }
    set_pd(pd) {
        if (this.loc_kind !== exports.T_Lckd.Maze)
            return undefined;
        if (this.loc_pos.set_pd(pd) === undefined)
            return undefined;
        return this.loc_pos;
    }
    encode() {
        return {
            kind: _lckd_key(this.loc_kind),
            name: this.loc_name,
            loc_uid: this.loc_uid,
            loc_pos: this.loc_pos.encode(),
        };
    }
    decode(j) {
        if (j === undefined)
            return this;
        if (j.kind === undefined || !(j.kind in exports.T_Lckd))
            return this;
        if (j.kind !== undefined)
            this.loc_kind = exports.T_Lckd[j.kind];
        if (j.name !== undefined)
            this.loc_name = j.name;
        if (j.loc_uid !== undefined)
            this.loc_uid = j.loc_uid;
        if (j.loc_pos !== undefined)
            this.loc_pos.decode(j.loc_pos);
        return this;
    }
}
exports.C_Location = C_Location;


/***/ }),

/***/ "./src/d_mdl/C_Maze.ts":
/*!*****************************!*\
  !*** ./src/d_mdl/C_Maze.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.C_Maze = void 0;
exports.alert_maze_info = alert_maze_info;
const T_MzKind_1 = __webpack_require__(/*! ./T_MzKind */ "./src/d_mdl/T_MzKind.ts");
const C_MazeCell_1 = __webpack_require__(/*! ./C_MazeCell */ "./src/d_mdl/C_MazeCell.ts");
const C_MazeObj_1 = __webpack_require__(/*! ./C_MazeObj */ "./src/d_mdl/C_MazeObj.ts");
const C_Point_1 = __webpack_require__(/*! ./C_Point */ "./src/d_mdl/C_Point.ts");
const C_Location_1 = __webpack_require__(/*! ./C_Location */ "./src/d_mdl/C_Location.ts");
const C_Range_1 = __webpack_require__(/*! ./C_Range */ "./src/d_mdl/C_Range.ts");
const F_Rand_1 = __webpack_require__(/*! ../d_utl/F_Rand */ "./src/d_utl/F_Rand.ts");
const F_Math_1 = __webpack_require__(/*! ../d_utl/F_Math */ "./src/d_utl/F_Math.ts");
const C_PointDir_1 = __webpack_require__(/*! ./C_PointDir */ "./src/d_mdl/C_PointDir.ts");
const T_Direction_1 = __webpack_require__(/*! ./T_Direction */ "./src/d_mdl/T_Direction.ts");
const C_PointSet2D_1 = __webpack_require__(/*! ./C_PointSet2D */ "./src/d_mdl/C_PointSet2D.ts");
function alert_maze_info(a) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    if (a === undefined)
        return;
    alert("Maze Info:"
        + "\nmaze id :" + ((_a = a.id) !== null && _a !== void 0 ? _a : '?')
        + "\nfloor: " + ((_b = a.floor) !== null && _b !== void 0 ? _b : '?')
        + "\nuniq id :" + ((_c = a.uniq_id) !== null && _c !== void 0 ? _c : '?')
        + "\nsave id :" + ((_d = a.save_id) !== null && _d !== void 0 ? _d : '?')
        + "\nname:   " + ((_e = a.name) !== null && _e !== void 0 ? _e : '?')
        + "\nsize_x: " + ((_f = a.size_x) !== null && _f !== void 0 ? _f : '?')
        + "\nsize_y: " + ((_g = a.size_y) !== null && _g !== void 0 ? _g : '?')
        + "\nsize_z: " + ((_h = a.size_z) !== null && _h !== void 0 ? _h : '?')
        + "maze:\n" + ((_j = a.maze) !== null && _j !== void 0 ? _j : '?')
        + "mask:\n" + ((_k = a.mask) !== null && _k !== void 0 ? _k : '?')
        + "\n");
}
class C_Maze {
    constructor(a) {
        this.my_layer = 0;
        this.num_of_room = 5;
        this.max_size_of_room = 3;
        this.maze_id = -1;
        this.save_id = -1;
        this.uniq_id = 'mai_maze#' + (0, F_Rand_1._get_uuid)();
        this.floor = 0;
        this.name = '';
        this.size = new C_Range_1.C_Range(new C_Point_1.C_Point(0, 0, 0), new C_Point_1.C_Point(2, 2, 2));
        this.cells = this.__init_maze(T_MzKind_1.T_MzKind.Stone);
        this.masks = this.__init_mask(true);
        this.unclear = [];
        this.__init_unclear();
        this.objs = {};
        if (a !== undefined)
            this.decode(a);
    }
    __init_maze(kind = T_MzKind_1.T_MzKind.Stone) {
        const size_x = this.size.size_x();
        const size_y = this.size.size_y();
        const size_z = this.size.size_z();
        const cells = Array(size_z);
        for (var z = 0; z < size_z; z++) {
            cells[z] = Array(size_y);
            for (var y = 0; y < size_y; y++) {
                cells[z][y] = Array(size_x);
                for (var x = 0; x < size_x; x++) {
                    cells[z][y][x] = C_MazeCell_1.C_MazeCell.newObj({ kind: kind, pos: { x: x, y: y, z: z } });
                }
            }
        }
        return cells;
    }
    __init_mask(YN) {
        const size_x = this.size.size_x();
        const size_y = this.size.size_y();
        const size_z = this.size.size_z();
        this.masks = Array(size_z);
        for (var z = 0; z < size_z; z++) {
            this.masks[z] = Array(size_y);
            for (var y = 0; y < size_y; y++) {
                this.masks[z][y] = Array(size_x);
                for (var x = 0; x < size_x; x++) {
                    this.masks[z][y][x] = YN;
                }
            }
        }
        return this.masks;
    }
    __init_unclear() {
        const size_x = this.size.size_x();
        const size_y = this.size.size_y();
        const size_z = this.size.size_z();
        this.unclear = Array(size_z);
        for (var z = 0; z < size_z; z++) {
            this.unclear[z] = 0;
            for (var y = 0; y < size_y; y++) {
                for (var x = 0; x < size_x; x++) {
                    if (this.masks[z][y][x])
                        this.unclear[z]++;
                }
            }
        }
        return;
    }
    uid() { return this.uniq_id; }
    get_lckd() { return C_Location_1.T_Lckd.Maze; }
    get_name() { return this.name; }
    within(p) {
        return this.size.within(p);
    }
    add_obj(obj) {
        this.objs[obj.uid()] = obj;
    }
    rmv_obj(obj) {
        delete this.objs[obj.uid()];
    }
    get_obj_xyz(x, y, z) {
        return this.get_obj(new C_Point_1.C_Point(x, y, z));
    }
    get_obj(p) {
        var _a, _b, _c, _d, _e;
        var layer = -1;
        var obj = null;
        for (const id in this.objs) {
            const exist = this.objs[id];
            if (exist.view() === undefined)
                continue;
            if (exist.within(p) && ((_a = exist.view()) === null || _a === void 0 ? void 0 : _a.letter()) !== null) {
                if ((_c = (_b = exist.view()) === null || _b === void 0 ? void 0 : _b.layer()) !== null && _c !== void 0 ? _c : -99 > layer) {
                    layer = (_e = (_d = exist.view()) === null || _d === void 0 ? void 0 : _d.layer()) !== null && _e !== void 0 ? _e : -99;
                    obj = exist;
                }
            }
        }
        return obj;
    }
    exist_obj(p) {
        var _a;
        for (const id in this.objs) {
            const exist = this.objs[id];
            if (exist.within(p) && ((_a = exist.view()) === null || _a === void 0 ? void 0 : _a.letter()) !== null)
                return true;
        }
        return false;
    }
    change_unexp_to_floor(p) {
        if (this.get_kind(p) == T_MzKind_1.T_MzKind.Unexp) {
            this.set_cell(p, T_MzKind_1.T_MzKind.Floor);
        }
    }
    clear_mask_around_the_team(team) {
        this.__clear_mask(team.walk().get_around(0, -1));
        this.__clear_mask(team.walk().get_around(0, 0));
        this.__clear_mask(team.walk().get_around(0, 1));
        const depth = 5;
        for (var d = 1; d < depth; d++) {
            const front_pos = team.walk().get_around(d, 0);
            if (this.is_movable(front_pos)) {
                this.__clear_mask(team.walk().get_around(d, -1));
                this.__clear_mask(team.walk().get_around(d, 0));
                this.__clear_mask(team.walk().get_around(d, 1));
            }
            else {
                this.__clear_mask(team.walk().get_around(d, -1));
                this.__clear_mask(team.walk().get_around(d, 0));
                this.__clear_mask(team.walk().get_around(d, 1));
                break;
            }
        }
    }
    __clear_mask(clr_pos) {
        if (!this.size.within(clr_pos))
            return;
        if (this.masks[clr_pos.z][clr_pos.y][clr_pos.x]) {
            this.masks[clr_pos.z][clr_pos.y][clr_pos.x] = false;
            this.unclear[clr_pos.z]--;
        }
    }
    is_cleared(clr_pos) {
        return this.unclear[clr_pos.z] < 1;
    }
    is_masked(p) { return this.is_masked_xyz(p.x, p.y, p.z); }
    is_masked_xyz(x, y, z) {
        return this.masks[z][y][x];
    }
    is_movable(p) {
        if (!this.size.within(p))
            return false;
        switch (this.get_kind(p)) {
            case T_MzKind_1.T_MzKind.Floor:
            case T_MzKind_1.T_MzKind.Unexp:
            case T_MzKind_1.T_MzKind.StrUp:
            case T_MzKind_1.T_MzKind.StrDn:
            case T_MzKind_1.T_MzKind.StrUD:
                return true;
        }
        return false;
    }
    get_x_max() { return this.size.size_x(); }
    get_y_max() { return this.size.size_y(); }
    get_z_max() { return this.size.size_z(); }
    get_kind(p) {
        if (this.size.within(p))
            return this.cells[p.z][p.y][p.x].getKind();
        return T_MzKind_1.T_MzKind.NoDef;
    }
    get_kind_xyz(x, y, z) {
        if (this.size.within(x, y, z))
            return this.cells[z][y][x].getKind();
        return T_MzKind_1.T_MzKind.NoDef;
    }
    get_cell_xyz(x, y, z) {
        if (this.size.within(x, y, z))
            return this.cells[z][y][x];
        return undefined;
    }
    get_cell(p) {
        if (this.size.within(p))
            return this.cells[p.z][p.y][p.x];
        return undefined;
    }
    set_cell(p, k) {
        if (this.size.within(p)) {
            this.cells[p.z][p.y][p.x] = C_MazeCell_1.C_MazeCell.newObj({ kind: k, pos: p });
        }
    }
    set_cell_xyz(x, y, z, k) {
        if (this.size.within(x, y, z)) {
            this.cells[z][y][x] = C_MazeCell_1.C_MazeCell.newObj({ kind: k, pos: { x: x, y: y, z: z } });
        }
    }
    can_move(p) {
        return this.size.within(p);
    }
    can_UD(p) {
        return this.is_movable(p);
    }
    fill_cell(kind, floor) {
        for (let h = 0; h < this.size.size_y(); h++)
            for (let w = 0; w < this.size.size_x(); w++)
                this.set_cell_xyz(w, h, floor, kind);
        return;
    }
    set_box(kind, top_x, top_y, size_x, size_y, floor) {
        if (top_x + size_x > this.size.size_x())
            size_x = this.size.size_x() - top_x + 1;
        if (top_y + size_y > this.size.size_y())
            size_y = this.size.size_y() - top_y + 1;
        const top = top_y;
        const btm = top + size_y - 1;
        const lft = top_x;
        const rgt = lft + size_x - 1;
        for (let x = 0; x < size_x; x++) {
            this.set_cell_xyz(x, top, floor, kind);
            this.set_cell_xyz(x, btm, floor, kind);
        }
        for (let y = 0; y < size_y; y++) {
            this.set_cell_xyz(lft, y, floor, kind);
            this.set_cell_xyz(rgt, y, floor, kind);
        }
        return;
    }
    create_stair(floor) {
        var _a, _b;
        const H_size_x = (this.size.size_x() - 1) / 2;
        const H_size_y = (this.size.size_y() - 1) / 2;
        const pos_x = 2 * (0, F_Rand_1._irand)(0, H_size_x - 1) + 1;
        const pos_y = 2 * (0, F_Rand_1._irand)(0, H_size_y - 1) + 1;
        const pos_d = 1 * (0, F_Rand_1._irand)(0, T_Direction_1.T_Direction.MAX);
        if (floor >= 1) {
            if (((_a = this.get_cell_xyz(pos_x, pos_y, floor - 1)) === null || _a === void 0 ? void 0 : _a.getKind()) !== T_MzKind_1.T_MzKind.StrUp) {
                this.set_cell_xyz(pos_x, pos_y, floor - 1, T_MzKind_1.T_MzKind.StrDn);
            }
            else {
                this.set_cell_xyz(pos_x, pos_y, floor - 1, T_MzKind_1.T_MzKind.StrUD);
            }
        }
        if (((_b = this.get_cell_xyz(pos_x, pos_y, floor)) === null || _b === void 0 ? void 0 : _b.getKind()) !== T_MzKind_1.T_MzKind.StrDn) {
            this.set_cell_xyz(pos_x, pos_y, floor, T_MzKind_1.T_MzKind.StrUp);
        }
        else {
            this.set_cell_xyz(pos_x, pos_y, floor, T_MzKind_1.T_MzKind.StrUD);
        }
        return new C_PointDir_1.C_PointDir({ x: pos_x, y: pos_y, z: floor, d: pos_d });
    }
    create_maze(floor) {
        var _a, _b;
        const size_x = this.size.size_x();
        const size_y = this.size.size_y();
        this.fill_cell(T_MzKind_1.T_MzKind.Unexp, floor);
        this.set_box(T_MzKind_1.T_MzKind.Stone, 0, 0, size_x, size_y, floor);
        const points = new C_PointSet2D_1.C_PointSet2D();
        for (let h = 2; h < size_y - 2; h += 2) {
            for (let w = 2; w < size_x - 2; w += 2) {
                const di = (0, F_Rand_1._irand)(0, T_Direction_1.T_Direction.MAX);
                points.push(new C_PointSet2D_1.C_PointLink2D(w, h, di));
            }
        }
        const rooms_array = [];
        const num_of_room = (0, F_Rand_1._irand)(0, this.num_of_room);
        for (let cnt = 0; cnt < num_of_room; cnt++) {
            const leng_x = (0, F_Rand_1._irand)(1, this.max_size_of_room) * 2 + 1;
            const leng_y = (0, F_Rand_1._irand)(1, this.max_size_of_room) * 2 + 1;
            const room_x = (0, F_Rand_1._irand)(0, (size_x - leng_x) / 2) * 2;
            const room_y = (0, F_Rand_1._irand)(0, (size_y - leng_y) / 2) * 2;
            rooms_array.push({ tx: room_x, ty: room_y, sx: leng_x, sy: leng_y });
        }
        for (const room of rooms_array) {
            for (let ii = 0; ii < points.set.length; ii++) {
                const p = points.set[ii];
                if (p === undefined)
                    continue;
                if ((p.x >= room.tx)
                    && (p.x <= room.tx + room.sx)
                    && (p.y >= room.ty)
                    && (p.y <= room.ty + room.sy)) {
                    points.remove(p);
                }
            }
        }
        for (const p of points.set) {
            if (p === undefined)
                continue;
            this.set_cell_xyz(p.x, p.y, floor, T_MzKind_1.T_MzKind.Stone);
            const direction = [0, 0, 0, 0];
            const di = (_b = (_a = C_PointSet2D_1.C_PointLink2D.cast(p)) === null || _a === void 0 ? void 0 : _a.di) !== null && _b !== void 0 ? _b : T_Direction_1.T_Direction.X;
            if (di === T_Direction_1.T_Direction.X)
                continue;
            direction[di] = 1;
            this.set_cell_xyz(p.x - direction[T_Direction_1.T_Direction.W] + direction[T_Direction_1.T_Direction.E], p.y - direction[T_Direction_1.T_Direction.N] + direction[T_Direction_1.T_Direction.S], floor, T_MzKind_1.T_MzKind.Stone);
        }
        for (const set of points.set) {
            if (set === undefined)
                continue;
            const [yn, trace_set] = this.check_close(set.x, set.y, points, new C_PointSet2D_1.C_PointSet2D());
            if (yn) {
                this.open_exit(trace_set, T_MzKind_1.T_MzKind.Unexp, floor);
                if (trace_set !== undefined)
                    for (const t of trace_set.set)
                        points.remove(t);
            }
        }
        return;
    }
    check_close(x, y, point_set, trace_set) {
        var _a, _b;
        if (x < 2 || y < 2 || x > this.size.size_x() - 2 || y > this.size.size_y() - 2)
            return [false, undefined];
        if (point_set === undefined)
            return [false, undefined];
        if ((point_set === null || point_set === void 0 ? void 0 : point_set.is_exist(x, y)) === false)
            return [false, undefined];
        if (trace_set !== undefined && (trace_set === null || trace_set === void 0 ? void 0 : trace_set.is_exist(x, y)) === true)
            return [true, trace_set];
        const p = point_set.get_point(x, y);
        trace_set !== null && trace_set !== void 0 ? trace_set : (trace_set = new C_PointSet2D_1.C_PointSet2D());
        trace_set === null || trace_set === void 0 ? void 0 : trace_set.push(new C_PointSet2D_1.C_PointLink2D(x, y, (_a = C_PointSet2D_1.C_PointLink2D.cast(p)) === null || _a === void 0 ? void 0 : _a.di));
        let next_x = 0, next_y = 0;
        switch ((_b = C_PointSet2D_1.C_PointLink2D.cast(p)) === null || _b === void 0 ? void 0 : _b.di) {
            case T_Direction_1.T_Direction.N:
                next_x = x;
                next_y = y - 2;
                break;
            case T_Direction_1.T_Direction.E:
                next_x = x + 2;
                next_y = y;
                break;
            case T_Direction_1.T_Direction.S:
                next_x = x;
                next_y = y + 2;
                break;
            case T_Direction_1.T_Direction.W:
                next_x = x - 2;
                next_y = y;
                break;
        }
        return this.check_close(next_x, next_y, point_set, trace_set);
    }
    open_exit(p, kind, floor) {
        var _a, _b;
        if (p === undefined)
            return;
        const cnt = (0, F_Rand_1._irand)(0, p.set.length - 1);
        const pp = p.set[cnt];
        let direction = [0, 0, 0, 0];
        const di = (_b = (_a = C_PointSet2D_1.C_PointLink2D.cast(pp)) === null || _a === void 0 ? void 0 : _a.di) !== null && _b !== void 0 ? _b : T_Direction_1.T_Direction.N;
        direction[di] = 1;
        this.set_cell_xyz(pp.x - direction[T_Direction_1.T_Direction.W] + direction[T_Direction_1.T_Direction.E], pp.y - direction[T_Direction_1.T_Direction.N] + direction[T_Direction_1.T_Direction.S], floor, kind);
        return;
    }
    to_letter(p) {
        return this.cells[p.z][p.y][p.x].to_letter();
    }
    to_string(floor = 0, debug_mode = false) {
        var _a, _b;
        const size_x = this.size.size_x();
        const size_y = this.size.size_y();
        var ret_str = '';
        for (var y = 0; y < size_y; y++) {
            for (var x = 0; x < size_x; x++) {
                const obj = this.get_obj_xyz(x, y, floor);
                if (!debug_mode && this.masks[floor][y][x]) {
                    ret_str += 'Ｘ';
                }
                else {
                    const obj_c = (_b = (_a = obj === null || obj === void 0 ? void 0 : obj.view()) === null || _a === void 0 ? void 0 : _a.letter()) !== null && _b !== void 0 ? _b : null;
                    if (obj === null || obj_c === null) {
                        ret_str += this.cells[floor][y][x].to_letter();
                    }
                    else {
                        ret_str += obj_c;
                    }
                }
            }
            ret_str += "\n";
        }
        return ret_str;
    }
    encode() {
        const size_x = this.size.size_x();
        const size_y = this.size.size_y();
        const size_z = this.size.size_z();
        var z_array = [];
        for (var z = 0; z < size_z; z++) {
            var y_array = [];
            for (var y = 0; y < size_y; y++) {
                var x_array = [];
                for (var x = 0; x < size_x; x++) {
                    x_array.push(this.cells[z][y][x].encode());
                }
                y_array.push(x_array.join('X'));
            }
            z_array.push(y_array.join('Y'));
        }
        const maze_str = z_array.join('Z');
        var z_array = [];
        for (var z = 0; z < size_z; z++) {
            var y_array = [];
            for (var y = 0; y < size_y; y++) {
                var x_array = [];
                for (var x = 0; x < size_x; x++) {
                    x_array.push(this.masks[z][y][x] ? '1' : '0');
                }
                y_array.push(x_array.join('X'));
            }
            z_array.push(y_array.join('Y'));
        }
        const mask_str = z_array.join('Z');
        let objs = [];
        for (const ii in this.objs)
            objs.push(this.objs[ii].encode());
        return {
            id: this.maze_id,
            uniq_id: this.uniq_id,
            save_id: this.save_id,
            floor: this.floor,
            name: this.name,
            objs: objs,
            size_x: this.size.size_x(),
            size_y: this.size.size_y(),
            size_z: this.size.size_z(),
            maze: maze_str,
            mask: mask_str,
        };
    }
    decode(a) {
        if (a === undefined)
            return this;
        if (a.id !== undefined)
            this.maze_id = a.id;
        if (a.uniq_id !== undefined)
            this.uniq_id = a.uniq_id;
        if (a.save_id !== undefined)
            this.save_id = a.save_id;
        if (a.floor !== undefined)
            this.floor = a.floor;
        if (a.name !== undefined)
            this.name = a.name;
        if (a.objs !== undefined) {
            this.objs = {};
            for (const json_obj of a.objs) {
                const new_obj = C_MazeObj_1.C_MazeObj.newObj(json_obj);
                this.objs[new_obj.uid()] = new_obj;
            }
        }
        if (a.size_x !== undefined && a.size_y !== undefined && a.size_z !== undefined) {
            this.size = new C_Range_1.C_Range(new C_Point_1.C_Point(0, 0, 0), new C_Point_1.C_Point(a.size_x - 1, a.size_y - 1, a.size_z - 1));
            this.cells = this.__init_maze(T_MzKind_1.T_MzKind.Stone);
            this.masks = this.__init_mask(true);
            this.__init_unclear();
        }
        const size_x = this.size.size_x();
        const size_y = this.size.size_y();
        const size_z = this.size.size_z();
        if (a.maze !== undefined) {
            const z_array = a.maze.split('Z');
            const z_max = (0, F_Math_1._min)([size_z, z_array.length]);
            for (var z = 0; z < z_max; z++) {
                const y_array = z_array[z].split('Y');
                const y_max = (0, F_Math_1._min)([size_y, y_array.length]);
                for (var y = 0; y < y_max; y++) {
                    const x_array = y_array[y].split('X');
                    const x_max = (0, F_Math_1._min)([size_x, x_array.length]);
                    for (var x = 0; x < x_max; x++) {
                        let kind = parseInt(x_array[x], 16);
                        this.cells[z][y][x] = C_MazeCell_1.C_MazeCell.newObj({ kind: kind, pos: { x: x, y: y, z: z } });
                    }
                }
            }
        }
        if (a.mask !== undefined) {
            this.__init_mask(true);
            const z_array = a.mask.split('Z');
            const z_max = (0, F_Math_1._min)([size_z, z_array.length]);
            for (var z = 0; z < z_max; z++) {
                const y_array = z_array[z].split('Y');
                const y_max = (0, F_Math_1._min)([size_y, y_array.length]);
                for (var y = 0; y < y_max; y++) {
                    const x_array = y_array[y].split('X');
                    const x_max = (0, F_Math_1._min)([size_x, x_array.length]);
                    for (var x = 0; x < x_max; x++) {
                        if (x_array[x] !== '0') {
                            this.masks[z][y][x] = true;
                        }
                        else {
                            this.masks[z][y][x] = false;
                        }
                    }
                }
            }
            this.__init_unclear();
        }
        return this;
    }
    static encode_all(all_maze) {
        const all_maze_data = [];
        for (let maze of all_maze) {
            all_maze_data.push(maze.encode());
        }
        return all_maze_data;
    }
    static decode_all(all_maze_data) {
        const all_maze = [];
        for (let maze_data of all_maze_data) {
            all_maze.push((new C_Maze({})).decode(maze_data));
        }
        return all_maze;
    }
    alert() {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        alert("Maze Info:"
            + "\nmaze id :" + ((_a = this.maze_id) !== null && _a !== void 0 ? _a : '?')
            + "\nfloor: " + ((_b = this.floor) !== null && _b !== void 0 ? _b : '?')
            + "\nuniq id :" + ((_c = this.uniq_id) !== null && _c !== void 0 ? _c : '?')
            + "\nsave id :" + ((_d = this.save_id) !== null && _d !== void 0 ? _d : '?')
            + "\nname:   " + ((_e = this.name) !== null && _e !== void 0 ? _e : '?')
            + "\nsize_x: " + ((_f = this.size.size_x()) !== null && _f !== void 0 ? _f : '?')
            + "\nsize_y: " + ((_g = this.size.size_y()) !== null && _g !== void 0 ? _g : '?')
            + "\nsize_z: " + ((_h = this.size.size_z()) !== null && _h !== void 0 ? _h : '?')
            + "\n");
    }
    alert_maze(floor = 0) {
        var _a;
        alert("Maze Map:"
            + "maze:\n" + ((_a = this.to_string(floor, true)) !== null && _a !== void 0 ? _a : '?')
            + "\n");
    }
    alert_mask(floor = 0) {
        var _a;
        alert("Mask Map:"
            + "mask:\n" + ((_a = this.to_string(floor, false)) !== null && _a !== void 0 ? _a : '?')
            + "\n");
    }
}
exports.C_Maze = C_Maze;


/***/ }),

/***/ "./src/d_mdl/C_MazeCell.ts":
/*!*********************************!*\
  !*** ./src/d_mdl/C_MazeCell.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.C_MazeCell = void 0;
const T_MzKind_1 = __webpack_require__(/*! ./T_MzKind */ "./src/d_mdl/T_MzKind.ts");
const C_MazeObj_1 = __webpack_require__(/*! ./C_MazeObj */ "./src/d_mdl/C_MazeObj.ts");
class C_MazeCell {
    static newObj(j) {
        switch (j.kind) {
            case T_MzKind_1.T_MzKind.NoDef: return new C_MazeCellNoDef(j);
            case T_MzKind_1.T_MzKind.Unkwn: return new C_MazeCellUnkwn(j);
            case T_MzKind_1.T_MzKind.Empty: return new C_MazeCellEmpty(j);
            case T_MzKind_1.T_MzKind.Floor: return new C_MazeCellFloor(j);
            case T_MzKind_1.T_MzKind.Unexp: return new C_MazeCellUnexp(j);
            case T_MzKind_1.T_MzKind.Stone: return new C_MazeCellStone(j);
            case T_MzKind_1.T_MzKind.StrUp: return new C_MazeCellStrUp(j);
            case T_MzKind_1.T_MzKind.StrDn: return new C_MazeCellStrDn(j);
            case T_MzKind_1.T_MzKind.StrUD: return new C_MazeCellStrUD(j);
        }
        return new C_MazeCellNoDef(j);
    }
    constructor(j) {
        var _a, _b, _c;
        var _d;
        (_a = j.obj) !== null && _a !== void 0 ? _a : (j.obj = {});
        (_b = (_d = j.obj).clname) !== null && _b !== void 0 ? _b : (_d.clname = this.constructor.name);
        this.kind = (_c = j.kind) !== null && _c !== void 0 ? _c : T_MzKind_1.T_MzKind.NoDef;
        this.my_obj = C_MazeObj_1.C_MazeObj.newObj(j.obj);
    }
    getObj() { return this.my_obj; }
    getKind() {
        return this.kind;
    }
    to_letter() {
        var _a, _b;
        return (_b = (_a = this.my_obj.view()) === null || _a === void 0 ? void 0 : _a.letter()) !== null && _b !== void 0 ? _b : 'Ｘ';
    }
    static from_letter(letter) {
        for (const key of Object.keys(T_MzKind_1.T_MzKind)) {
            if (letter === key)
                return T_MzKind_1.T_MzKind[key];
        }
        return T_MzKind_1.T_MzKind.NoDef;
    }
    drow3D(frot, back) {
        var _a;
        (_a = this.my_obj.view()) === null || _a === void 0 ? void 0 : _a.drow3D(frot, back);
    }
    encode() {
        return this.kind.toString(16).padStart(2, "0");
    }
    static decode(str, j) {
        const kind = parseInt(str, 16);
        return C_MazeCell.newObj({ kind: kind, pos: j === null || j === void 0 ? void 0 : j.pos });
    }
}
exports.C_MazeCell = C_MazeCell;
class C_MazeCellNoDef extends C_MazeCell {
    constructor(j) {
        var _a;
        j !== null && j !== void 0 ? j : (j = { kind: T_MzKind_1.T_MzKind.NoDef });
        (_a = j.obj) !== null && _a !== void 0 ? _a : (j.obj = {});
        j.obj.can_thr = '0';
        j.obj.pos = { x: j.x, y: j.y, z: j.z };
        j.obj.view = {
            layer: 0, letter: '疑',
            show3D: '0',
            pad_t: 0.0, pad_d: 0.0, pad_s: 0.0,
            col_f: '', col_b: '', col_s: '', col_t: '', col_d: '',
            col_l: '',
        };
        super(j);
    }
}
class C_MazeCellUnkwn extends C_MazeCell {
    constructor(j) {
        var _a;
        j !== null && j !== void 0 ? j : (j = { kind: T_MzKind_1.T_MzKind.Unkwn });
        (_a = j.obj) !== null && _a !== void 0 ? _a : (j.obj = {});
        j.obj.can_thr = '0';
        j.obj.pos = { x: j.x, y: j.y, z: j.z };
        j.obj.view = {
            layer: 0, letter: '謎',
            show3D: '0',
            pad_t: 0.0, pad_d: 0.0, pad_s: 0.0,
            col_f: '', col_b: '', col_s: '', col_t: '', col_d: '',
            col_l: '',
        };
        super(j);
    }
}
class C_MazeCellEmpty extends C_MazeCell {
    constructor(j) {
        var _a;
        j !== null && j !== void 0 ? j : (j = { kind: T_MzKind_1.T_MzKind.Empty });
        (_a = j.obj) !== null && _a !== void 0 ? _a : (j.obj = {});
        j.obj.can_thr = '1';
        j.obj.pos = { x: j.x, y: j.y, z: j.z };
        j.obj.view = {
            layer: 0, letter: '無',
            show3D: '0',
            pad_t: 0.0, pad_d: 0.0, pad_s: 0.0,
            col_f: '', col_b: '', col_s: '', col_t: '', col_d: '',
            col_l: '',
        };
        super(j);
    }
}
class C_MazeCellFloor extends C_MazeCell {
    constructor(j) {
        var _a;
        j !== null && j !== void 0 ? j : (j = { kind: T_MzKind_1.T_MzKind.Floor });
        (_a = j.obj) !== null && _a !== void 0 ? _a : (j.obj = {});
        j.obj.can_thr = '1';
        j.obj.pos = { x: j.x, y: j.y, z: j.z };
        j.obj.view = {
            layer: 0, letter: '　',
            show3D: '1',
            pad_t: 0.0, pad_d: 0.0, pad_s: 0.0,
            col_f: '', col_b: '', col_s: '', col_t: '#6666ff', col_d: '',
            col_l: '#9999ff',
        };
        super(j);
    }
}
class C_MazeCellUnexp extends C_MazeCell {
    constructor(j) {
        var _a;
        j !== null && j !== void 0 ? j : (j = { kind: T_MzKind_1.T_MzKind.Unexp });
        (_a = j.obj) !== null && _a !== void 0 ? _a : (j.obj = {});
        j.obj.can_thr = '1';
        j.obj.pos = { x: j.x, y: j.y, z: j.z };
        j.obj.view = {
            layer: 0, letter: '・',
            show3D: '1',
            pad_t: 0.0, pad_d: 0.0, pad_s: 0.0,
            col_f: '', col_b: '', col_s: '', col_t: '#66ffff', col_d: '',
            col_l: '#9999ff',
        };
        super(j);
    }
}
class C_MazeCellStone extends C_MazeCell {
    constructor(j) {
        var _a;
        j !== null && j !== void 0 ? j : (j = { kind: T_MzKind_1.T_MzKind.Stone });
        (_a = j.obj) !== null && _a !== void 0 ? _a : (j.obj = {});
        j.obj.can_thr = '0';
        j.obj.pos = { x: j.x, y: j.y, z: j.z };
        j.obj.view = {
            layer: 0, letter: '＃',
            show3D: '1',
            pad_t: 0.0, pad_d: 0.0, pad_s: 0.0,
            col_f: '#00ff00', col_b: '', col_s: '#00ee00', col_t: '', col_d: '',
            col_l: '#0000ff',
        };
        super(j);
    }
}
class C_MazeCellStrUp extends C_MazeCell {
    constructor(j) {
        var _a;
        j !== null && j !== void 0 ? j : (j = { kind: T_MzKind_1.T_MzKind.StrUp });
        (_a = j.obj) !== null && _a !== void 0 ? _a : (j.obj = {});
        j.obj.can_thr = '1';
        j.obj.pos = { x: j.x, y: j.y, z: j.z };
        j.obj.view = {
            layer: 0, letter: '上',
            show3D: '1',
            pad_t: 0.0, pad_d: 0.0, pad_s: 0.0,
            col_f: '', col_b: '', col_s: '', col_t: '', col_d: '#ffffcc',
            col_l: '#0000ff',
        };
        super(j);
    }
}
class C_MazeCellStrDn extends C_MazeCell {
    constructor(j) {
        var _a;
        j !== null && j !== void 0 ? j : (j = { kind: T_MzKind_1.T_MzKind.StrDn });
        (_a = j.obj) !== null && _a !== void 0 ? _a : (j.obj = {});
        j.obj.can_thr = '1';
        j.obj.pos = { x: j.x, y: j.y, z: j.z };
        j.obj.view = {
            layer: 0, letter: '下',
            show3D: '1',
            pad_t: 0.0, pad_d: 0.0, pad_s: 0.0,
            col_f: '', col_b: '', col_s: '', col_t: '#ffffcc', col_d: '',
            col_l: '#0000ff',
        };
        super(j);
    }
}
class C_MazeCellStrUD extends C_MazeCell {
    constructor(j) {
        var _a;
        j !== null && j !== void 0 ? j : (j = { kind: T_MzKind_1.T_MzKind.StrUD });
        (_a = j.obj) !== null && _a !== void 0 ? _a : (j.obj = {});
        j.obj.can_thr = '1';
        j.obj.pos = { x: j.x, y: j.y, z: j.z };
        j.obj.view = {
            layer: 0, letter: '段',
            show3D: '1',
            pad_t: 0.0, pad_d: 0.0, pad_s: 0.0,
            col_f: '', col_b: '', col_s: '', col_t: '#ffffcc', col_d: '#ffffcc',
            col_l: '#0000ff',
        };
        super(j);
    }
}


/***/ }),

/***/ "./src/d_mdl/C_MazeInfo.ts":
/*!*********************************!*\
  !*** ./src/d_mdl/C_MazeInfo.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.C_MazeInfo = void 0;
exports.alert_mazeinfo_info = alert_mazeinfo_info;
function alert_mazeinfo_info(a) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    if (a === undefined)
        return;
    alert("MazeInfo Data:"
        + "\nname : " + ((_a = a.name) !== null && _a !== void 0 ? _a : '?')
        + "\nmbname: " + ((_b = a.mbname) !== null && _b !== void 0 ? _b : '?')
        + "\nlv :" + ((_c = a.lv) !== null && _c !== void 0 ? _c : '?')
        + "\nsize_x: " + ((_d = a.size_x) !== null && _d !== void 0 ? _d : '?')
        + "\nsize_y: " + ((_e = a.size_y) !== null && _e !== void 0 ? _e : '?')
        + "\nsize_z: " + ((_f = a.size_z) !== null && _f !== void 0 ? _f : '?')
        + "\nmax_of_room: " + ((_g = a.max_room) !== null && _g !== void 0 ? _g : '?')
        + "\nroom_size: " + ((_h = a.room_size) !== null && _h !== void 0 ? _h : '?')
        + "\n");
}
class C_MazeInfo {
    static get_tbl_all() {
        const mazeinfo = [];
        mazeinfo.push(new C_MazeInfo().decode({
            name: 'maze010',
            mbname: '教練場',
            lv: 1,
            size_x: 11,
            size_y: 11,
            size_z: 3,
            max_room: 2,
            room_size: 3
        }));
        mazeinfo.push(new C_MazeInfo().decode({
            name: 'maze011',
            mbname: '始まりの迷宮',
            lv: 1,
            size_x: 21,
            size_y: 21,
            size_z: 5,
            max_room: 3,
            room_size: 3
        }));
        mazeinfo.push(new C_MazeInfo().decode({
            name: 'maze012',
            mbname: '暗き森の迷宮',
            lv: 1,
            size_x: 25,
            size_y: 25,
            size_z: 7,
            max_room: 5,
            room_size: 3
        }));
        mazeinfo.push(new C_MazeInfo().decode({
            name: 'maze013',
            mbname: '黒魔の地下墓地',
            lv: 1,
            size_x: 31,
            size_y: 31,
            size_z: 10,
            max_room: 5,
            room_size: 5
        }));
        return mazeinfo;
    }
    constructor(j) {
        this.name = '';
        this.mbname = '';
        this.lv = 0;
        this.size_x = 3;
        this.size_y = 3;
        this.size_z = 3;
        this.max_room = 1;
        this.room_size = 1;
        if (j !== undefined)
            this.decode(j);
    }
    encode() {
        return {
            name: this.name,
            mbname: this.mbname,
            lv: this.lv,
            size_x: this.size_x,
            size_y: this.size_y,
            size_z: this.size_z,
            max_room: this.max_room,
            room_size: this.room_size,
        };
    }
    decode(j) {
        if (j === undefined)
            return this;
        if (j.name !== undefined)
            this.name = j.name;
        if (j.mbname !== undefined)
            this.mbname = j.mbname;
        if (j.lv !== undefined)
            this.lv = j.lv;
        if (j.size_x !== undefined)
            this.size_x = j.size_x;
        if (j.size_y !== undefined)
            this.size_y = j.size_y;
        if (j.size_z !== undefined)
            this.size_z = j.size_z;
        if (j.max_room !== undefined)
            this.max_room = j.max_room;
        if (j.room_size !== undefined)
            this.room_size = j.room_size;
        return this;
    }
    alert() {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        alert("MazeInfo Data:"
            + "\nname : " + ((_a = this.name) !== null && _a !== void 0 ? _a : '?')
            + "\nmbname: " + ((_b = this.mbname) !== null && _b !== void 0 ? _b : '?')
            + "\nlv :" + ((_c = this.lv) !== null && _c !== void 0 ? _c : '?')
            + "\nsize_x: " + ((_d = this.size_x) !== null && _d !== void 0 ? _d : '?')
            + "\nsize_y: " + ((_e = this.size_y) !== null && _e !== void 0 ? _e : '?')
            + "\nsize_z: " + ((_f = this.size_z) !== null && _f !== void 0 ? _f : '?')
            + "\nmax_of_room: " + ((_g = this.max_room) !== null && _g !== void 0 ? _g : '?')
            + "\nroom_size: " + ((_h = this.room_size) !== null && _h !== void 0 ? _h : '?')
            + "\n");
    }
}
exports.C_MazeInfo = C_MazeInfo;


/***/ }),

/***/ "./src/d_mdl/C_MazeObj.ts":
/*!********************************!*\
  !*** ./src/d_mdl/C_MazeObj.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.C_MazeObj = void 0;
const C_PointDir_1 = __webpack_require__(/*! ./C_PointDir */ "./src/d_mdl/C_PointDir.ts");
const F_Rand_1 = __webpack_require__(/*! ../d_utl/F_Rand */ "./src/d_utl/F_Rand.ts");
const C_MazeObjView_1 = __webpack_require__(/*! ./C_MazeObjView */ "./src/d_mdl/C_MazeObjView.ts");
class C_MazeObj {
    static newObj(j) {
        var _a;
        j !== null && j !== void 0 ? j : (j = {});
        (_a = j.clname) !== null && _a !== void 0 ? _a : (j.clname = C_MazeObj.constructor.name);
        switch (j.clname) {
            case C_MazeObj.constructor.name: return new C_MazeObj(j);
        }
        return new C_MazeObj(j);
    }
    newObj(j) {
        return C_MazeObj.newObj(j);
    }
    constructor(j) {
        this.clname = 'C_MazeObj';
        this.uniq_id = 'mazeobj_' + (0, F_Rand_1._get_uuid)();
        this.clname = C_MazeObj.constructor.name;
        this.pos = new C_PointDir_1.C_PointDir({ x: 0, y: 0, z: 0, d: 0 });
        this.my_view = undefined;
        this.can_thr = true;
        if (j !== undefined)
            this.__init(j);
    }
    __init(j) {
        var _a;
        if (j === undefined)
            return this;
        if (j.uniq_id !== undefined)
            this.uniq_id = j.uniq_id;
        if (j.clname !== undefined)
            this.clname = j.clname;
        if (j.pos !== undefined)
            this.pos.decode(j.pos);
        if (j.view !== undefined) {
            if (Object.keys(j.view).length > 0) {
                (_a = this.my_view) !== null && _a !== void 0 ? _a : (this.my_view = C_MazeObjView_1.C_MazeObjView.newObj(j.view));
            }
            else
                this.my_view = undefined;
        }
        if (j.can_thr !== undefined)
            this.can_thr = j.can_thr !== '0' ? true : false;
        return this;
    }
    uid() { return this.uniq_id; }
    view() { return this.my_view; }
    setView(view) { this.my_view = view; }
    canThrough() { return this.can_thr; }
    setThrough(thr) { return this.can_thr = thr; }
    get_pd() {
        return new C_PointDir_1.C_PointDir(this.pos);
    }
    set_pd(p) {
        this.pos = p;
    }
    within(p) {
        return this.pos.within(p);
    }
    encode() {
        var _a, _b;
        return {
            uniq_id: this.uniq_id,
            clname: this.clname,
            pos: this.pos.encode(),
            view: (_b = (_a = this.my_view) === null || _a === void 0 ? void 0 : _a.encode()) !== null && _b !== void 0 ? _b : {},
            can_thr: this.can_thr ? '1' : '0',
        };
    }
    decode(j) {
        return this.__init(j);
    }
    static decode(j) {
        return C_MazeObj.newObj(j);
    }
}
exports.C_MazeObj = C_MazeObj;


/***/ }),

/***/ "./src/d_mdl/C_MazeObjView.ts":
/*!************************************!*\
  !*** ./src/d_mdl/C_MazeObjView.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.C_MazeObjView = void 0;
class C_MazeObjView {
    static get_context3D() { return this === null || this === void 0 ? void 0 : this.con3D; }
    static set_context3D(con3D) { this.con3D = con3D; }
    static newObj(j) {
        var _a;
        j !== null && j !== void 0 ? j : (j = {});
        (_a = j.clname) !== null && _a !== void 0 ? _a : (j.clname = C_MazeObjView.constructor.name);
        switch (j.clname) {
            case C_MazeObjView.constructor.name: return new C_MazeObjView(j);
        }
        return new C_MazeObjView(j);
    }
    newObj(j) {
        return C_MazeObjView.newObj(j);
    }
    constructor(j) {
        this.clname = 'C_MazeObjView';
        this.clname = this.constructor.name;
        this.my_layer = -2;
        this.my_letter = null;
        this.my_pad_t = 0.0;
        this.my_pad_d = 0.0;
        this.my_pad_s = 0.0;
        this.my_show3D = true;
        this.my_col_f = '#f8f8f8';
        this.my_col_b = '#aaaaaa';
        this.my_col_s = '#dddddd';
        this.my_col_t = '#ffffff';
        this.my_col_d = '#cccccc';
        this.my_col_l = '#333333';
        if (j !== undefined)
            this.__init(j);
    }
    __init(j) {
        if (j === undefined)
            return this;
        if (j.clname !== undefined)
            this.clname = j.clname;
        if (j.layer !== undefined)
            this.my_layer = j.layer;
        if (j.letter !== undefined)
            this.my_letter = j.letter !== '' ? j.letter : null;
        if (j.pad_t !== undefined)
            this.my_pad_t = j.pad_t;
        if (j.pad_d !== undefined)
            this.my_pad_d = j.pad_d;
        if (j.pad_s !== undefined)
            this.my_pad_s = j.pad_s;
        if (j.show3D !== undefined)
            this.my_show3D = j.show3D !== '0' ? true : false;
        if (j.col_f !== undefined)
            this.my_col_f = j.col_f !== '' ? j.col_f : null;
        if (j.col_b !== undefined)
            this.my_col_b = j.col_b !== '' ? j.col_b : null;
        if (j.col_s !== undefined)
            this.my_col_s = j.col_s !== '' ? j.col_s : null;
        if (j.col_t !== undefined)
            this.my_col_t = j.col_t !== '' ? j.col_t : null;
        if (j.col_d !== undefined)
            this.my_col_d = j.col_d !== '' ? j.col_d : null;
        if (j.col_l !== undefined)
            this.my_col_l = j.col_l !== '' ? j.col_l : null;
        return this;
    }
    layer() { return this.my_layer; }
    set_layer(layer) { this.my_layer = layer; }
    letter() { return this.my_letter; }
    set_letter(letter) { return this.my_letter = letter; }
    canShow() { return this.my_show3D; }
    ;
    setShow(can_show) { return this.my_show3D = can_show; }
    ;
    pad_t() { return this.my_pad_t; }
    pad_d() { return this.my_pad_d; }
    pad_s() { return this.my_pad_s; }
    set_pad_t(pad_t) { return this.my_pad_t = this.my_pad_d + pad_t < 1.0 ? pad_t : 0.99 - this.my_pad_d; }
    set_pad_d(pad_d) { return this.my_pad_d = this.my_pad_t + pad_d < 1.0 ? pad_d : 0.99 - this.my_pad_t; }
    set_pad_s(pad_s) { return this.my_pad_s = pad_s; }
    col_f() { return this.my_col_f; }
    col_b() { return this.my_col_b; }
    col_s() { return this.my_col_s; }
    col_t() { return this.my_col_t; }
    col_d() { return this.my_col_d; }
    col_l() { return this.my_col_l; }
    set_col_f(col_f) { return this.my_col_f = col_f; }
    set_col_b(col_b) { return this.my_col_b = col_b; }
    set_col_s(col_s) { return this.my_col_s = col_s; }
    set_col_t(col_t) { return this.my_col_t = col_t; }
    set_col_d(col_d) { return this.my_col_d = col_d; }
    set_col_l(col_l) { return this.my_col_l = col_l; }
    drow3D(frot, back) {
        this.drow_obj_back(frot, back);
        this.drow_obj_down(frot, back);
        this.drow_obj_top(frot, back);
        this.drow_obj_right_side(frot, back);
        this.drow_obj_left_side(frot, back);
        this.drow_obj_front(frot, back);
    }
    drow_obj_down(frot, back) {
        var _a, _b;
        if (!this.canShow() || this.col_t() === null)
            return;
        if (this.pad_s() <= 0.0 && this.pad_t() >= 1.0) {
            drow_cell_floor(frot, back, (_a = this.col_t()) !== null && _a !== void 0 ? _a : '#6666ff', (_b = this.col_l()) !== null && _b !== void 0 ? _b : '#9999ff');
            return;
        }
        const o = __calc_padding_obj(this, frot, back);
        const rect = {
            tl: o.fdl,
            tr: o.fdr,
            dr: o.bdr,
            dl: o.bdl,
        };
        drow_cell(rect, this.col_t(), this.col_l());
    }
    drow_obj_top(frot, back) {
        var _a, _b;
        if (!this.canShow() || this.col_d() === null)
            return;
        if (this.pad_s() <= 0.0 && this.pad_d() >= 1.0) {
            drow_cell_ceiling(frot, back, (_a = this.col_d()) !== null && _a !== void 0 ? _a : '#aaaaaa', (_b = this.col_l()) !== null && _b !== void 0 ? _b : '#9999ff');
            return;
        }
        const o = __calc_padding_obj(this, frot, back);
        const rect = {
            tl: o.ftl,
            tr: o.ftr,
            dr: o.btr,
            dl: o.btl,
        };
        drow_cell(rect, this.col_d(), this.col_l());
    }
    drow_obj_front(frot, back) {
        if (!this.canShow() || this.col_f() === null)
            return;
        const o = __calc_padding_obj(this, frot, back);
        const rect = {
            tl: o.ftl,
            tr: o.ftr,
            dr: o.fdr,
            dl: o.fdl,
        };
        drow_cell(rect, this.col_f(), this.col_l());
    }
    drow_obj_back(frot, back) {
        if (!this.canShow() || this.col_b() === null)
            return;
        const o = __calc_padding_obj(this, frot, back);
        const rect = {
            tl: o.btl,
            tr: o.btr,
            dr: o.bdr,
            dl: o.bdl,
        };
        drow_cell(rect, this.col_b(), this.col_l());
    }
    drow_obj_left_side(frot, back) {
        if (!this.canShow() || this.col_s() === null)
            return;
        const o = __calc_padding_obj(this, frot, back);
        const rect = {
            tl: o.btl,
            tr: o.ftl,
            dr: o.fdl,
            dl: o.bdl,
        };
        drow_cell(rect, this.col_s(), this.col_l());
    }
    drow_obj_right_side(frot, back) {
        if (!this.canShow() || this.col_s() === null)
            return;
        const o = __calc_padding_obj(this, frot, back);
        const rect = {
            tl: o.ftr,
            tr: o.btr,
            dr: o.bdr,
            dl: o.fdr,
        };
        drow_cell(rect, this.col_s(), this.col_l());
    }
    encode() {
        var _a, _b, _c, _d, _e, _f, _g;
        return {
            cname: this.clname,
            layer: this.my_layer,
            letter: (_a = this.my_letter) !== null && _a !== void 0 ? _a : '',
            pad_t: this.my_pad_t,
            pad_d: this.my_pad_d,
            pad_s: this.my_pad_s,
            show3D: this.canShow() ? '1' : '0',
            col_f: (_b = this.my_col_f) !== null && _b !== void 0 ? _b : '',
            col_b: (_c = this.my_col_b) !== null && _c !== void 0 ? _c : '',
            col_s: (_d = this.my_col_s) !== null && _d !== void 0 ? _d : '',
            col_t: (_e = this.my_col_t) !== null && _e !== void 0 ? _e : '',
            col_d: (_f = this.my_col_d) !== null && _f !== void 0 ? _f : '',
            col_l: (_g = this.my_col_l) !== null && _g !== void 0 ? _g : '',
        };
    }
    decode(j) {
        return this.__init(j);
    }
    static decode(j) {
        return C_MazeObjView.newObj(j);
    }
}
exports.C_MazeObjView = C_MazeObjView;
function __calc_padding_obj(obj, frot, back) {
    const rect_frot = frot;
    const rect_back = back;
    const ratio_X = obj.pad_s() / 2.0;
    const ratio_T = obj.pad_t();
    const ratio_D = obj.pad_d();
    const frot_pad_X = Math.abs(rect_frot.max_x - rect_frot.min_x) * ratio_X;
    const back_pad_X = Math.abs(rect_back.max_x - rect_back.min_x) * ratio_X;
    const frot_pad_T = Math.abs(rect_frot.max_y - rect_frot.min_y) * ratio_T;
    const back_pad_T = Math.abs(rect_back.max_y - rect_back.min_y) * ratio_T;
    const frot_pad_D = Math.abs(rect_frot.max_y - rect_frot.min_y) * ratio_D;
    const back_pad_D = Math.abs(rect_back.max_y - rect_back.min_y) * ratio_D;
    const frot_top_lft = { x: rect_frot.min_x + frot_pad_X, y: rect_frot.min_y + frot_pad_T };
    const frot_top_rgt = { x: rect_frot.max_x - frot_pad_X, y: rect_frot.min_y + frot_pad_T };
    const frot_dwn_lft = { x: rect_frot.min_x + frot_pad_X, y: rect_frot.max_y - frot_pad_D };
    const frot_dwn_rgt = { x: rect_frot.max_x - frot_pad_X, y: rect_frot.max_y - frot_pad_D };
    const back_top_lft = { x: rect_back.min_x + back_pad_X, y: rect_back.min_y + back_pad_T };
    const back_top_rgt = { x: rect_back.max_x - back_pad_X, y: rect_back.min_y + back_pad_T };
    const back_dwn_lft = { x: rect_back.min_x + back_pad_X, y: rect_back.max_y - back_pad_D };
    const back_dwn_rgt = { x: rect_back.max_x - back_pad_X, y: rect_back.max_y - back_pad_D };
    let ftl = __calc_padding_xy(frot_top_lft, back_top_lft, ratio_X);
    let ftr = __calc_padding_xy(frot_top_rgt, back_top_rgt, ratio_X);
    let fdl = __calc_padding_xy(frot_dwn_lft, back_dwn_lft, ratio_X);
    let fdr = __calc_padding_xy(frot_dwn_rgt, back_dwn_rgt, ratio_X);
    let btl = __calc_padding_xy(back_top_lft, frot_top_lft, ratio_X);
    let btr = __calc_padding_xy(back_top_rgt, frot_top_rgt, ratio_X);
    let bdl = __calc_padding_xy(back_dwn_lft, frot_dwn_lft, ratio_X);
    let bdr = __calc_padding_xy(back_dwn_rgt, frot_dwn_rgt, ratio_X);
    return {
        ftl: ftl, ftr: ftr,
        fdl: fdl, fdr: fdr,
        btl: btl, btr: btr,
        bdl: bdl, bdr: bdr,
    };
}
function __calc_padding_xy(frot, back, ratio) {
    const A = (frot.y - back.y) / (frot.x - back.x);
    const B = frot.y - A * frot.x;
    const p_frot_x = frot.x + (back.x - frot.x) * ratio;
    const p_frot_y = A * p_frot_x + B;
    return { x: p_frot_x, y: p_frot_y };
}
function drow_cell_floor(rect_frot, rect_back, fill = '#6666ff', line = '#9999ff') {
    const rect = {
        tl: { x: rect_frot.min_x, y: rect_frot.max_y },
        tr: { x: rect_frot.max_x, y: rect_frot.max_y },
        dr: { x: rect_back.max_x, y: rect_back.max_y },
        dl: { x: rect_back.min_x, y: rect_back.max_y }
    };
    drow_cell(rect, fill, line);
}
function drow_cell_ceiling(rect_frot, rect_back, fill = '#aaaaaa', line = '#9999ff') {
    const rect = {
        tl: { x: rect_frot.min_x, y: rect_frot.min_y },
        tr: { x: rect_frot.max_x, y: rect_frot.min_y },
        dr: { x: rect_back.max_x, y: rect_back.min_y },
        dl: { x: rect_back.min_x, y: rect_back.min_y }
    };
    drow_cell(rect, fill, line);
}
function drow_cell(r, fill, line) {
    if (C_MazeObjView.con3D === undefined)
        return;
    const con = C_MazeObjView.con3D;
    con.beginPath();
    con.moveTo(r.tl.x, r.tl.y);
    con.lineTo(r.tr.x, r.tr.y);
    con.lineTo(r.dr.x, r.dr.y);
    con.lineTo(r.dl.x, r.dl.y);
    con.closePath();
    if (fill != null) {
        con.fillStyle = fill;
        con.fill();
    }
    if (line !== null) {
        con.strokeStyle = line;
        con.lineWidth = 1;
        con.stroke();
    }
}


/***/ }),

/***/ "./src/d_mdl/C_MovablePoint.ts":
/*!*************************************!*\
  !*** ./src/d_mdl/C_MovablePoint.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.C_MovablePoint = void 0;
exports.alert_mvpt_info = alert_mvpt_info;
const C_Location_1 = __webpack_require__(/*! ./C_Location */ "./src/d_mdl/C_Location.ts");
const F_Rand_1 = __webpack_require__(/*! ../d_utl/F_Rand */ "./src/d_utl/F_Rand.ts");
function alert_mvpt_info(a) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
    if (a === undefined)
        return;
    alert("MvPt Info:"
        + "\nuniq_id:  " + ((_a = a.uniq_id) !== null && _a !== void 0 ? _a : '?')
        + "\ncur_url:  " + ((_b = a.cur_url) !== null && _b !== void 0 ? _b : '?')
        + "\nteam_uid: " + ((_c = a.team_uid) !== null && _c !== void 0 ? _c : '?')
        + "\nlckd: " + ((_d = a.kind) !== null && _d !== void 0 ? _d : '?')
        + "\nlcnm: " + ((_e = a.name) !== null && _e !== void 0 ? _e : '?')
        + "\nlcid: " + ((_f = a.loc_uid) !== null && _f !== void 0 ? _f : '?')
        + "\ncur_x: " + ((_h = (_g = a.loc_pos) === null || _g === void 0 ? void 0 : _g.x) !== null && _h !== void 0 ? _h : '?')
        + "\ncur_y: " + ((_k = (_j = a.loc_pos) === null || _j === void 0 ? void 0 : _j.y) !== null && _k !== void 0 ? _k : '?')
        + "\ncur_z: " + ((_m = (_l = a.loc_pos) === null || _l === void 0 ? void 0 : _l.z) !== null && _m !== void 0 ? _m : '?')
        + "\ncur_d: " + ((_p = (_o = a.loc_pos) === null || _o === void 0 ? void 0 : _o.d) !== null && _p !== void 0 ? _p : '?')
        + "\n");
}
class C_MovablePoint extends C_Location_1.C_Location {
    constructor(json) {
        super(json);
        this.uniq_id = 'MvPoint#' + (0, F_Rand_1._get_uuid)();
        this.cur_url = '';
        this.team_uid = undefined;
        if (json !== undefined && json !== null)
            this.decode(json);
    }
    uid() { return this.uniq_id; }
    url() { return this.cur_url; }
    tid() { return this.team_uid; }
    new_uid() { this.uniq_id = 'MvPoint#' + (0, F_Rand_1._get_uuid)(); }
    set_url(url) { this.cur_url = url; }
    set_tid(tid) { this.team_uid = tid; }
    clone() {
        const mvpt = new C_MovablePoint(this.encode());
        mvpt.new_uid();
        return mvpt;
    }
    fromJSON(txt) {
        try {
            const j = JSON.parse(txt);
            return this.decode(j);
        }
        catch (err) {
            return this;
        }
        ;
    }
    toJSON() {
        return JSON.stringify(this.encode(), null, "\t");
    }
    static from_obj_to_string(oa) {
        return JSON.stringify(oa.encode());
    }
    static from_objArray_to_string(oaa) {
        const oa = [];
        for (const ii in oaa)
            oa.push(oaa[ii].encode());
        return JSON.stringify(oa);
    }
    static from_string_to_obj(txt) {
        try {
            const j = JSON.parse(txt);
            return new C_MovablePoint().decode(j);
        }
        catch (err) {
            return new C_MovablePoint();
        }
        ;
    }
    static from_string_to_objArray(txt) {
        try {
            const j = JSON.parse(txt);
            const mpa = {};
            for (const jj of j) {
                const aaa = new C_MovablePoint().decode(jj);
                mpa[aaa.uid()] = aaa;
            }
            return mpa;
        }
        catch (err) {
            return {};
        }
        ;
    }
    encode() {
        var _a;
        const j = super.encode();
        j.uniq_id = this.uniq_id;
        j.cur_url = this.cur_url;
        j.team_uid = (_a = this.team_uid) !== null && _a !== void 0 ? _a : '';
        return j;
    }
    decode(j) {
        super.decode(j);
        if (j === undefined)
            return this;
        if (j.uniq_id !== undefined)
            this.uniq_id = j.uniq_id;
        if (j.cur_url !== undefined)
            this.cur_url = j.cur_url;
        if (j.team_uid !== undefined)
            this.team_uid = j.team_uid;
        if (this.team_uid === '')
            this.team_uid = undefined;
        return this;
    }
    alert() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
        alert("MvPt Info:"
            + "\nuniq_id:  " + ((_a = this.uniq_id) !== null && _a !== void 0 ? _a : '?')
            + "\ncur_url:  " + ((_b = this.cur_url) !== null && _b !== void 0 ? _b : '?')
            + "\nteam_uid: " + ((_c = this.team_uid) !== null && _c !== void 0 ? _c : '?')
            + "\nlckd: " + ((_d = this.loc_kind) !== null && _d !== void 0 ? _d : '?')
            + "\nlcnm: " + ((_e = this.loc_name) !== null && _e !== void 0 ? _e : '?')
            + "\nlcid: " + ((_f = this.loc_uid) !== null && _f !== void 0 ? _f : '?')
            + "\ncur_x: " + ((_h = (_g = this.loc_pos) === null || _g === void 0 ? void 0 : _g.x) !== null && _h !== void 0 ? _h : '?')
            + "\ncur_y: " + ((_k = (_j = this.loc_pos) === null || _j === void 0 ? void 0 : _j.y) !== null && _k !== void 0 ? _k : '?')
            + "\ncur_z: " + ((_m = (_l = this.loc_pos) === null || _l === void 0 ? void 0 : _l.z) !== null && _m !== void 0 ? _m : '?')
            + "\ncur_d: " + ((_p = (_o = this.loc_pos) === null || _o === void 0 ? void 0 : _o.d) !== null && _p !== void 0 ? _p : '?')
            + "\n");
    }
}
exports.C_MovablePoint = C_MovablePoint;


/***/ }),

/***/ "./src/d_mdl/C_Point.ts":
/*!******************************!*\
  !*** ./src/d_mdl/C_Point.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.C_Point = void 0;
class C_Point {
    constructor(x, y, z) {
        this.x = this.y = this.z = -3;
        if (x === undefined) {
            this.x = 0;
            this.y = 0;
            this.z = 0;
            return;
        }
        if (typeof x === "number" && typeof y === "number" && typeof z === "number") {
            this.x = x;
            this.y = y;
            this.z = z;
            return;
        }
        if (typeof x === "object") {
            if (x instanceof C_Point) {
                this.x = x.x;
                this.y = x.y;
                this.z = x.z;
                return;
            }
            else {
                this.decode(x);
                return;
            }
        }
        this.x = this.y = this.z = -2;
        return;
    }
    get_p() { return new C_Point(this); }
    set_p(p) {
        this.x = p.x;
        this.y = p.y;
        this.z = p.z;
        return this;
    }
    is_exist(x, y, z) {
        return (x == this.x && y == this.y && z == this.z);
    }
    within(p) {
        return (p.x == this.x && p.y == this.y && p.z == this.z);
    }
    encode() {
        return { x: this.x, y: this.y, z: this.z };
    }
    decode(a) {
        if (a === undefined)
            return this;
        if (a.x === undefined || a.y === undefined || a.z === undefined)
            return this;
        this.x = a.x;
        this.y = a.y;
        this.z = a.z;
        return this;
    }
}
exports.C_Point = C_Point;


/***/ }),

/***/ "./src/d_mdl/C_PointDir.ts":
/*!*********************************!*\
  !*** ./src/d_mdl/C_PointDir.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.C_PointDir = exports.T_Direction = void 0;
exports.alert_PD_info = alert_PD_info;
const C_Point_1 = __webpack_require__(/*! ./C_Point */ "./src/d_mdl/C_Point.ts");
exports.T_Direction = {
    N: 0,
    E: 1,
    S: 2,
    W: 3,
    X: 99
};
function _dir_key(dir) {
    var _a;
    return (_a = Object.keys(exports.T_Direction).find(key => exports.T_Direction[key] === dir)) !== null && _a !== void 0 ? _a : "????";
}
function alert_PD_info(a) {
    var _a, _b, _c, _d;
    if (a === undefined)
        return;
    alert("PointData Info:"
        + "\nx: " + ((_a = a === null || a === void 0 ? void 0 : a.x) !== null && _a !== void 0 ? _a : '?')
        + "\ny: " + ((_b = a === null || a === void 0 ? void 0 : a.y) !== null && _b !== void 0 ? _b : '?')
        + "\nz: " + ((_c = a === null || a === void 0 ? void 0 : a.z) !== null && _c !== void 0 ? _c : '?')
        + "\nd: " + ((_d = a === null || a === void 0 ? void 0 : a.d) !== null && _d !== void 0 ? _d : '?')
        + "\n");
}
class C_PointDir extends C_Point_1.C_Point {
    constructor(d) {
        super(d);
        this.d = exports.T_Direction.X;
        if (d === undefined) {
            return;
        }
        if (typeof d === "number") {
            this.d = d;
            return;
        }
        if (typeof d === "object") {
            if (d instanceof C_PointDir) {
                this.d = d.d;
            }
            else {
                this.decode(d);
            }
            return;
        }
        this.d = exports.T_Direction.X;
        return;
    }
    get_d_mb_name() {
        switch (this.d) {
            case 0: return '北';
            case 1: return '東';
            case 2: return '南';
            case 3: return '西';
            default: return '謎';
        }
    }
    get_d() {
        return this.d;
    }
    set_d(d) {
        if (!(_dir_key(d) in exports.T_Direction))
            return undefined;
        this.d = d;
        return this;
    }
    get_pd() {
        return this;
    }
    set_pd(d) {
        if (d instanceof C_PointDir) {
            if (!(_dir_key(d.d) in exports.T_Direction))
                return undefined;
            super.set_p(d);
            this.d = d.d;
            return this;
        }
        if (!(_dir_key(d.d) in exports.T_Direction))
            return undefined;
        this.decode(d);
        return this;
    }
    encode() {
        const j = super.encode();
        j.d = this.d;
        return j;
    }
    decode(j) {
        if (j === undefined)
            return this;
        if (!(_dir_key(j.d) in exports.T_Direction))
            return this;
        super.decode(j);
        this.d = j.d;
        return this;
    }
    alert() {
        var _a, _b, _c, _d;
        alert("PointData Info:"
            + "\nx: " + ((_a = this.x) !== null && _a !== void 0 ? _a : '?')
            + "\ny: " + ((_b = this.y) !== null && _b !== void 0 ? _b : '?')
            + "\nz: " + ((_c = this.z) !== null && _c !== void 0 ? _c : '?')
            + "\nd: " + ((_d = this.d) !== null && _d !== void 0 ? _d : '?')
            + "\n");
    }
}
exports.C_PointDir = C_PointDir;


/***/ }),

/***/ "./src/d_mdl/C_PointSet2D.ts":
/*!***********************************!*\
  !*** ./src/d_mdl/C_PointSet2D.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.C_PointSet2D = exports.C_PointLink2D = void 0;
class C_Point2D {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    is_exist(x, y) {
        return (this.x == x) && (this.y == y);
    }
}
class C_PointLink2D extends C_Point2D {
    constructor(x = 0, y = 0, di = -1) {
        super(x, y);
        this.di = di;
    }
    static cast(p) {
        if ((p === null || p === void 0 ? void 0 : p.x) === undefined)
            return undefined;
        if ((p === null || p === void 0 ? void 0 : p.y) === undefined)
            return undefined;
        return p instanceof C_PointLink2D ? p : new C_PointLink2D(p.x, p.y);
    }
}
exports.C_PointLink2D = C_PointLink2D;
class C_PointSet2D {
    constructor() {
        this.set = [];
    }
    push(p) {
        this.set.push(p);
        return;
    }
    get_point(x, y) {
        for (const p of this.set) {
            if (p === null || p === void 0 ? void 0 : p.is_exist(x, y))
                return p;
        }
        return undefined;
    }
    remove(p) {
        this.remove_xy(p.x, p.y);
        return;
    }
    remove_xy(x, y) {
        var _a;
        for (const i in this.set) {
            if ((_a = this.set[i]) === null || _a === void 0 ? void 0 : _a.is_exist(x, y)) {
                delete this.set[i];
                this.set = [...this.set];
                break;
            }
        }
        return;
    }
    is_exist(x, y) {
        for (const p of this.set)
            if (p === null || p === void 0 ? void 0 : p.is_exist(x, y))
                return true;
        return false;
    }
}
exports.C_PointSet2D = C_PointSet2D;


/***/ }),

/***/ "./src/d_mdl/C_Range.ts":
/*!******************************!*\
  !*** ./src/d_mdl/C_Range.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.C_Range = void 0;
const F_Math_1 = __webpack_require__(/*! ../d_utl/F_Math */ "./src/d_utl/F_Math.ts");
const C_Point_1 = __webpack_require__(/*! ./C_Point */ "./src/d_mdl/C_Point.ts");
class C_Range {
    constructor(p1, p2) {
        this.min = new C_Point_1.C_Point(0, 0, 0);
        this.max = new C_Point_1.C_Point(0, 0, 0);
        this._init(p1, p2);
    }
    _init(p1, p2) {
        const min_x = (0, F_Math_1._min)([p1.x, p2.x]);
        const max_x = (0, F_Math_1._max)([p1.x, p2.x]);
        const min_y = (0, F_Math_1._min)([p1.y, p2.y]);
        const max_y = (0, F_Math_1._max)([p1.y, p2.y]);
        const min_z = (0, F_Math_1._min)([p1.z, p2.z]);
        const max_z = (0, F_Math_1._max)([p1.z, p2.z]);
        this.min = new C_Point_1.C_Point(min_x, min_y, min_z);
        this.max = new C_Point_1.C_Point(max_x, max_y, max_z);
        return this;
    }
    within(a, y, z) {
        if (typeof a === "number" && typeof y === "number" && typeof z === "number") {
            if (a < this.min.x || a > this.max.x)
                return false;
            if (y < this.min.y || y > this.max.y)
                return false;
            if (z < this.min.z || z > this.max.z)
                return false;
            return true;
        }
        if (typeof a === "object" && a instanceof C_Point_1.C_Point) {
            const p = a;
            if (p.x < this.min.x || p.x > this.max.x)
                return false;
            if (p.y < this.min.y || p.y > this.max.y)
                return false;
            if (p.z < this.min.z || p.z > this.max.z)
                return false;
            return true;
        }
        if (typeof a === "object" && a instanceof C_Range) {
            const p = a;
            if (p.min_x() < this.min.x || p.max_x() > this.max.x)
                return false;
            if (p.min_y() < this.min.y || p.max_y() > this.max.y)
                return false;
            if (p.min_z() < this.min.z || p.max_z() > this.max.z)
                return false;
            return true;
        }
        return false;
    }
    min_x() { return this.min.x; }
    max_x() { return this.max.x; }
    min_y() { return this.min.y; }
    max_y() { return this.max.y; }
    min_z() { return this.min.z; }
    max_z() { return this.max.z; }
    size_x() {
        return this.max.x - this.min.x + 1;
    }
    size_y() {
        return this.max.y - this.min.y + 1;
    }
    size_z() {
        return this.max.z - this.min.z + 1;
    }
    do_all_xyz(fn) {
        for (var z = this.min.z; z <= this.max.z; z++) {
            for (var y = this.min.y; y <= this.max.y; y++) {
                for (var x = this.min.x; y <= this.max.x; x++) {
                    if (!fn(x, y, z))
                        return false;
                }
            }
        }
        return true;
    }
    do_all_p(fn) {
        for (var z = this.min.z; z <= this.max.z; z++) {
            for (var y = this.min.y; y <= this.max.y; y++) {
                for (var x = this.min.x; y <= this.max.x; x++) {
                    if (!fn(new C_Point_1.C_Point(x, y, z)))
                        return false;
                }
            }
        }
        return true;
    }
    encode() {
        return {
            min: this.min.encode(),
            max: this.min.encode(),
        };
    }
    decode(j) {
        if (j === undefined)
            return this;
        if (j.min === undefined)
            return this;
        if (j.max === undefined)
            return this;
        const p1 = new C_Point_1.C_Point(j.min);
        const p2 = new C_Point_1.C_Point(j.max);
        return this._init(p1, p2);
    }
}
exports.C_Range = C_Range;


/***/ }),

/***/ "./src/d_mdl/C_SaveData.ts":
/*!*********************************!*\
  !*** ./src/d_mdl/C_SaveData.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.C_SaveData = void 0;
exports.alert_save_info = alert_save_info;
exports.alert_save_detail = alert_save_detail;
const C_Maze_1 = __webpack_require__(/*! ./C_Maze */ "./src/d_mdl/C_Maze.ts");
const C_Guild_1 = __webpack_require__(/*! ./C_Guild */ "./src/d_mdl/C_Guild.ts");
const C_MovablePoint_1 = __webpack_require__(/*! ./C_MovablePoint */ "./src/d_mdl/C_MovablePoint.ts");
const C_Team_1 = __webpack_require__(/*! ./C_Team */ "./src/d_mdl/C_Team.ts");
const C_SaveInfo_1 = __webpack_require__(/*! ./C_SaveInfo */ "./src/d_mdl/C_SaveInfo.ts");
function alert_save_info(a) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
    if (a === undefined)
        return;
    alert("Save Info:"
        + "\nsave_id:    " + ((_a = a.save_id) !== null && _a !== void 0 ? _a : '?')
        + "\nplayer_id:  " + ((_b = a.player_id) !== null && _b !== void 0 ? _b : '?')
        + "\nuniq_no:    " + ((_c = a.uniq_no) !== null && _c !== void 0 ? _c : '?')
        + "\ntitle:      " + ((_d = a.title) !== null && _d !== void 0 ? _d : '?')
        + "\ndetail:     " + ((_e = a.detail) !== null && _e !== void 0 ? _e : '?')
        + "\npoint:      " + ((_f = a.point) !== null && _f !== void 0 ? _f : '?')
        + "\nauto_mode:  " + ((_g = a.auto_mode) !== null && _g !== void 0 ? _g : '?')
        + "\nis_active:  " + ((_h = a.is_active) !== null && _h !== void 0 ? _h : '?')
        + "\nis_delete:  " + ((_j = a.is_delete) !== null && _j !== void 0 ? _j : '?')
        + "\nmvpt_count: " + ((_l = (_k = a.all_mvpt) === null || _k === void 0 ? void 0 : _k.length) !== null && _l !== void 0 ? _l : '?')
        + "\nmaze_count: " + ((_o = (_m = a.all_maze) === null || _m === void 0 ? void 0 : _m.length) !== null && _o !== void 0 ? _o : '?')
        + "\nguld_count: " + ((_q = (_p = a.all_guld) === null || _p === void 0 ? void 0 : _p.length) !== null && _q !== void 0 ? _q : '?')
        + "\nteam_count: " + ((_s = (_r = a.all_team) === null || _r === void 0 ? void 0 : _r.length) !== null && _s !== void 0 ? _s : '?')
        + "\n");
}
function alert_save_detail(a) {
    var _a, _b, _c, _d;
    if (a === undefined)
        return;
    try {
        for (const mvpt of (_a = a.all_mvpt) !== null && _a !== void 0 ? _a : [])
            (0, C_MovablePoint_1.alert_mvpt_info)(mvpt);
    }
    catch (err) {
        alert('alert mvpt error: ' + err);
    }
    try {
        for (const team of (_b = a.all_team) !== null && _b !== void 0 ? _b : [])
            (0, C_Team_1.alert_team_info)(team);
    }
    catch (err) {
        alert('alert team error: ' + err);
    }
    try {
        for (const maze of (_c = a.all_maze) !== null && _c !== void 0 ? _c : [])
            (0, C_Maze_1.alert_maze_info)(maze);
    }
    catch (err) {
        alert('alert maze error: ' + err);
    }
    try {
        for (const guld of (_d = a.all_guld) !== null && _d !== void 0 ? _d : [])
            (0, C_Guild_1.alert_guld_info)(guld);
    }
    catch (err) {
        alert('alert guld error: ' + err);
    }
}
class C_SaveData extends C_SaveInfo_1.C_SaveInfo {
    constructor(a) {
        super(a);
        this.all_mvpt = {};
        this.all_maze = {};
        this.all_team = {};
        this.all_guld = {};
        if (a !== undefined)
            this.decode(a);
    }
    static new(a) {
        return new C_SaveData(a);
    }
    encode() {
        let save_date;
        try {
            const save_data = super.encode();
            save_data.all_mvpt = this._encode_all_data(this.all_mvpt);
            save_data.all_maze = this._encode_all_data(this.all_maze);
            save_data.all_team = this._encode_all_data(this.all_team);
            save_data.all_guld = this._encode_all_data(this.all_guld);
            return save_data;
        }
        catch (err) {
            alert('SaveData Encode Error: ' + err);
            return {};
        }
    }
    _encode_all_data(all_data) {
        const all_JSON = [];
        for (let i in all_data)
            all_JSON.push(all_data[i].encode());
        return all_JSON;
    }
    decode(s) {
        super.decode(s);
        if (s.all_mvpt !== undefined) {
            this.all_mvpt = {};
            for (const json_mvpt of s.all_mvpt) {
                const mvpt = (new C_MovablePoint_1.C_MovablePoint()).decode(json_mvpt);
                this.all_mvpt[mvpt.uid()] = mvpt;
            }
        }
        if (s.all_maze !== undefined) {
            this.all_maze = {};
            for (const json_maze of s.all_maze) {
                const maze = (new C_Maze_1.C_Maze()).decode(json_maze);
                this.all_maze[maze.uid()] = maze;
            }
        }
        if (s.all_team !== undefined) {
            this.all_team = {};
            for (const json_team of s.all_team) {
                const team = (new C_Team_1.C_Team()).decode(json_team);
                this.all_team[team.uid()] = team;
            }
        }
        if (s.all_guld !== undefined) {
            this.all_guld = {};
            for (const json_guld of s.all_guld) {
                const guld = (new C_Guild_1.C_Guild()).decode(json_guld);
                this.all_guld[guld.uid()] = guld;
            }
        }
        return this;
    }
    alert() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
        alert("Save Info:"
            + "\nsave_id:    " + ((_a = this.save_id) !== null && _a !== void 0 ? _a : '?')
            + "\nplayer_id:  " + ((_b = this.player_id) !== null && _b !== void 0 ? _b : '?')
            + "\nuniq_no:    " + ((_c = this.uniq_no) !== null && _c !== void 0 ? _c : '?')
            + "\ntitle:      " + ((_d = this.title) !== null && _d !== void 0 ? _d : '?')
            + "\ndetail:     " + ((_e = this.detail) !== null && _e !== void 0 ? _e : '?')
            + "\npoint:      " + ((_f = this.point) !== null && _f !== void 0 ? _f : '?')
            + "\nauto_mode:  " + (this.auto_mode ? 'Y' : 'N')
            + "\nis_active:  " + (this.is_active ? 'Y' : 'N')
            + "\nis_delete:  " + (this.is_delete ? 'Y' : 'N')
            + "\nmvpt_count: " + ((_h = (_g = this.all_mvpt) === null || _g === void 0 ? void 0 : _g.length) !== null && _h !== void 0 ? _h : '?')
            + "\nmaze_count: " + ((_k = (_j = this.all_maze) === null || _j === void 0 ? void 0 : _j.length) !== null && _k !== void 0 ? _k : '?')
            + "\nguld_count: " + ((_m = (_l = this.all_guld) === null || _l === void 0 ? void 0 : _l.length) !== null && _m !== void 0 ? _m : '?')
            + "\nteam_count: " + ((_p = (_o = this.all_team) === null || _o === void 0 ? void 0 : _o.length) !== null && _p !== void 0 ? _p : '?')
            + "\n");
    }
    alert_detail() {
        try {
            for (const ii in this.all_mvpt)
                this.all_mvpt[ii].alert();
        }
        catch (err) {
            alert('alert mvpt error: ' + err);
        }
        try {
            for (const ii in this.all_team)
                this.all_team[ii].alert();
        }
        catch (err) {
            alert('alert team error: ' + err);
        }
        try {
            for (const ii in this.all_maze)
                this.all_maze[ii].alert();
        }
        catch (err) {
            alert('alert maze error: ' + err);
        }
        try {
            for (const ii in this.all_guld)
                this.all_guld[ii].alert();
        }
        catch (err) {
            alert('alert guld error: ' + err);
        }
    }
}
exports.C_SaveData = C_SaveData;


/***/ }),

/***/ "./src/d_mdl/C_SaveInfo.ts":
/*!*********************************!*\
  !*** ./src/d_mdl/C_SaveInfo.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.C_SaveInfo = void 0;
exports.alert_saveinfo_info = alert_saveinfo_info;
const C_MovablePoint_1 = __webpack_require__(/*! ./C_MovablePoint */ "./src/d_mdl/C_MovablePoint.ts");
function alert_saveinfo_info(a) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v;
    if (a === undefined)
        return;
    alert("Save Info:"
        + "\nsave_id:    " + ((_a = a.save_id) !== null && _a !== void 0 ? _a : '?')
        + "\nplayer_id:  " + ((_b = a.player_id) !== null && _b !== void 0 ? _b : '?')
        + "\nuniq_no:    " + ((_c = a.uniq_no) !== null && _c !== void 0 ? _c : '?')
        + "\ntitle:      " + ((_d = a.title) !== null && _d !== void 0 ? _d : '?')
        + "\ndetail:     " + ((_e = a.detail) !== null && _e !== void 0 ? _e : '?')
        + "\npoint:      " + ((_f = a.point) !== null && _f !== void 0 ? _f : '?')
        + "\nauto_mode:  " + ((_g = a.auto_mode) !== null && _g !== void 0 ? _g : '?')
        + "\nis_active:  " + ((_h = a.is_active) !== null && _h !== void 0 ? _h : '?')
        + "\nis_delete:  " + ((_j = a.is_delete) !== null && _j !== void 0 ? _j : '?')
        + "\nsave_time:  " + ((_k = a.save_time) !== null && _k !== void 0 ? _k : '?')
        + "\nmyurl:      " + ((_m = (_l = a.mypos) === null || _l === void 0 ? void 0 : _l.cur_url) !== null && _m !== void 0 ? _m : '?')
        + "\nteam_uid:   " + ((_p = (_o = a.mypos) === null || _o === void 0 ? void 0 : _o.team_uid) !== null && _p !== void 0 ? _p : '?')
        + "\nloc_kind:   " + ((_r = (_q = a.mypos) === null || _q === void 0 ? void 0 : _q.kind) !== null && _r !== void 0 ? _r : '?')
        + "\nloc_name:   " + ((_t = (_s = a.mypos) === null || _s === void 0 ? void 0 : _s.name) !== null && _t !== void 0 ? _t : '?')
        + "\nloc_uid:    " + ((_v = (_u = a.mypos) === null || _u === void 0 ? void 0 : _u.loc_uid) !== null && _v !== void 0 ? _v : '?')
        + "\n");
}
class C_SaveInfo {
    constructor(a) {
        this.save_id = -1;
        this.player_id = -1;
        this.uniq_no = -1;
        this.title = '';
        this.detail = '';
        this.point = '';
        this.auto_mode = false;
        this.is_active = true;
        this.is_delete = false;
        this.save_time = new Date();
        this.mypos = new C_MovablePoint_1.C_MovablePoint();
        if (a !== undefined)
            this.decode(a);
    }
    static new(a) {
        return new C_SaveInfo(a);
    }
    encode() {
        let save_date;
        try {
            save_date = this.save_time.toISOString();
        }
        catch (err) {
            save_date = new Date().toISOString();
        }
        try {
            return {
                save_id: this.save_id,
                player_id: this.player_id,
                uniq_no: this.uniq_no,
                title: this.title,
                detail: this.detail,
                point: this.point,
                auto_mode: this.auto_mode ? '1' : '0',
                is_active: this.is_active ? '1' : '0',
                is_delete: this.is_delete ? '1' : '0',
                save_time: save_date,
                mypos: this.mypos.encode(),
            };
        }
        catch (err) {
            alert('SaveData Encode Error: ' + err);
            return {};
        }
    }
    decode(s) {
        var _a, _b, _c, _d, _e, _f;
        this.save_id = (_a = s.save_id) !== null && _a !== void 0 ? _a : this.save_id;
        this.player_id = (_b = s.player_id) !== null && _b !== void 0 ? _b : this.player_id;
        this.uniq_no = (_c = s.uniq_no) !== null && _c !== void 0 ? _c : this.uniq_no;
        this.title = (_d = s.title) !== null && _d !== void 0 ? _d : this.title;
        this.detail = (_e = s.detail) !== null && _e !== void 0 ? _e : this.detail;
        this.point = (_f = s.point) !== null && _f !== void 0 ? _f : this.point;
        if (s.auto_mode === undefined)
            this.auto_mode;
        else
            s.auto_mode !== '0' ? true : false;
        if (s.is_active === undefined)
            this.is_active;
        else
            s.is_active !== '0' ? true : false;
        if (s.is_delete === undefined)
            this.is_delete;
        else
            s.is_delete !== '0' ? true : false;
        if (s.save_time !== undefined)
            this.save_time = new Date(s.save_time);
        if (s.mypos !== undefined)
            this.mypos.decode(s.mypos);
        return this;
    }
    alert() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        alert("SaveInfo DATA:"
            + "\nsave_id:    " + ((_a = this.save_id) !== null && _a !== void 0 ? _a : '?')
            + "\nplayer_id:  " + ((_b = this.player_id) !== null && _b !== void 0 ? _b : '?')
            + "\nuniq_no:    " + ((_c = this.uniq_no) !== null && _c !== void 0 ? _c : '?')
            + "\ntitle:      " + ((_d = this.title) !== null && _d !== void 0 ? _d : '?')
            + "\ndetail:     " + ((_e = this.detail) !== null && _e !== void 0 ? _e : '?')
            + "\npoint:      " + ((_f = this.point) !== null && _f !== void 0 ? _f : '?')
            + "\nauto_mode:  " + (this.auto_mode ? 'Y' : 'N')
            + "\nis_active:  " + (this.is_active ? 'Y' : 'N')
            + "\nis_delete:  " + (this.is_delete ? 'Y' : 'N')
            + "\nmyurl:      " + ((_g = this.mypos.url()) !== null && _g !== void 0 ? _g : '?')
            + "\nteam_uid:   " + ((_h = this.mypos.tid()) !== null && _h !== void 0 ? _h : '?')
            + "\nloc_kind:   " + ((_j = this.mypos.get_lckd()) !== null && _j !== void 0 ? _j : '?')
            + "\nloc_name:   " + ((_k = this.mypos.get_name()) !== null && _k !== void 0 ? _k : '?')
            + "\nloc_uid:    " + ((_l = this.mypos.get_uid()) !== null && _l !== void 0 ? _l : '?')
            + "\n");
    }
}
exports.C_SaveInfo = C_SaveInfo;


/***/ }),

/***/ "./src/d_mdl/C_Team.ts":
/*!*****************************!*\
  !*** ./src/d_mdl/C_Team.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.C_Team = void 0;
exports.alert_team_info = alert_team_info;
const C_Walker_1 = __webpack_require__(/*! ./C_Walker */ "./src/d_mdl/C_Walker.ts");
const C_Hero_1 = __webpack_require__(/*! ./C_Hero */ "./src/d_mdl/C_Hero.ts");
const C_TeamView_1 = __webpack_require__(/*! ./C_TeamView */ "./src/d_mdl/C_TeamView.ts");
const F_Rand_1 = __webpack_require__(/*! ../d_utl/F_Rand */ "./src/d_utl/F_Rand.ts");
function alert_team_info(a) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2;
    if (a === undefined)
        return;
    alert("Team Info:"
        + "\nid:    " + ((_a = a.id) !== null && _a !== void 0 ? _a : '?')
        + "\nuniq_id:  " + ((_b = a.uniq_id) !== null && _b !== void 0 ? _b : '?')
        + "\nname:  " + ((_c = a.name) !== null && _c !== void 0 ? _c : '?')
        + "\nsave_id: " + ((_d = a.save_id) !== null && _d !== void 0 ? _d : '?')
        + "\nurl:  " + ((_f = (_e = a.locate) === null || _e === void 0 ? void 0 : _e.cur_url) !== null && _f !== void 0 ? _f : '?')
        + "\nlckd: " + ((_h = (_g = a.locate) === null || _g === void 0 ? void 0 : _g.kind) !== null && _h !== void 0 ? _h : '?')
        + "\nlcnm: " + ((_k = (_j = a.locate) === null || _j === void 0 ? void 0 : _j.name) !== null && _k !== void 0 ? _k : '?')
        + "\nlcid: " + ((_m = (_l = a.locate) === null || _l === void 0 ? void 0 : _l.loc_uid) !== null && _m !== void 0 ? _m : '?')
        + "\ncur_x: " + ((_q = (_p = (_o = a.locate) === null || _o === void 0 ? void 0 : _o.loc_pos) === null || _p === void 0 ? void 0 : _p.x) !== null && _q !== void 0 ? _q : '?')
        + "\ncur_y: " + ((_t = (_s = (_r = a.locate) === null || _r === void 0 ? void 0 : _r.loc_pos) === null || _s === void 0 ? void 0 : _s.y) !== null && _t !== void 0 ? _t : '?')
        + "\ncur_z: " + ((_w = (_v = (_u = a.locate) === null || _u === void 0 ? void 0 : _u.loc_pos) === null || _v === void 0 ? void 0 : _v.z) !== null && _w !== void 0 ? _w : '?')
        + "\ncur_d: " + ((_z = (_y = (_x = a.locate) === null || _x === void 0 ? void 0 : _x.loc_pos) === null || _y === void 0 ? void 0 : _y.d) !== null && _z !== void 0 ? _z : '?')
        + "\ngold: " + ((_0 = a.gold) !== null && _0 !== void 0 ? _0 : 0)
        + "\nheroes: " + ((_2 = (_1 = a.heroes) === null || _1 === void 0 ? void 0 : _1.length) !== null && _2 !== void 0 ? _2 : '?')
        + "\n");
}
class C_Team {
    static newObj(j) {
        return new C_Team(j);
    }
    newObj(j) { return C_Team.newObj(j); }
    constructor(j) {
        this.my_id = 0;
        this.my_name = 'Neo Team?';
        this.uniq_id = 'mai_team#' + (0, F_Rand_1._get_uuid)();
        this.save_id = 0;
        this.myView = new C_TeamView_1.C_CurrentTeamView(this);
        this.walker = new C_Walker_1.C_Walker();
        this.walker.set_tid(this.uid());
        this.gold = 0;
        this.heroes = {};
        this.hope_motion = 'NOP';
        if (j !== undefined)
            this.decode(j);
    }
    set_prp(arg) {
        this.decode(arg);
    }
    uid() { return this.uniq_id; }
    within(p) {
        var _a, _b;
        const here = (_a = this.walker) === null || _a === void 0 ? void 0 : _a.get_p();
        return (_b = here === null || here === void 0 ? void 0 : here.within(p)) !== null && _b !== void 0 ? _b : false;
    }
    view() { return this.myView; }
    walk() {
        return this.walker;
    }
    canThrough() { return true; }
    hres() {
        const hres = [];
        for (let ii in this.heroes)
            hres.push(this.heroes[ii]);
        return hres;
    }
    clear_hres() {
        this.heroes = {};
    }
    add_hero(hero) {
        this.heroes[hero.uid()] = hero;
    }
    rmv_hero(hero) {
        delete this.heroes[hero.uid()];
    }
    get_loc() {
        return this.walker;
    }
    set_loc(loc) {
        var _a;
        ((_a = this.walker) !== null && _a !== void 0 ? _a : (this.walker = new C_Walker_1.C_Walker())).decode(loc.encode());
    }
    get_pd() {
        return this.walker.get_pd();
    }
    encode() {
        var _a, _b;
        this.get_loc();
        const json_heroes = [];
        for (let ii in this.heroes)
            json_heroes.push(this.heroes[ii].encode());
        return {
            id: this.my_id,
            name: this.my_name,
            uniq_id: this.uniq_id,
            save_id: this.save_id,
            locate: this.walker.encode(),
            gold: this.gold,
            heroes: json_heroes,
            motion: this.hope_motion,
            view: (_b = (_a = this.myView) === null || _a === void 0 ? void 0 : _a.encode()) !== null && _b !== void 0 ? _b : {},
        };
    }
    decode(a) {
        if (a === undefined)
            return this;
        if (a.id !== undefined)
            this.my_id = a.id;
        if (a.name !== undefined)
            this.my_name = a.name;
        if (a.uniq_id !== undefined)
            this.uniq_id = a.uniq_id;
        if (a.save_id !== undefined)
            this.save_id = a.save_id;
        if (a.motion !== undefined)
            this.hope_motion = a.motion;
        if (a.locate !== undefined)
            this.walker.decode(a.locate);
        if (a.gold !== undefined)
            this.gold = a.gold;
        if (a.heroes !== undefined) {
            this.heroes = {};
            for (const json_hero of a.heroes) {
                const hero = new C_Hero_1.C_Hero(json_hero);
                this.heroes[hero.uid()] = hero;
            }
        }
        return this;
    }
    static encode_all(all_team) {
        const all_team_data = [];
        for (let team of all_team) {
            all_team_data.push(team.encode());
        }
        return all_team_data;
    }
    static decode_all(all_team_data) {
        const all_team = [];
        for (let team_data of all_team_data) {
            all_team.push((new C_Team()).decode(team_data));
        }
        return all_team;
    }
    alert() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
        alert("Team Info:"
            + "\nid:    " + ((_a = this.my_id) !== null && _a !== void 0 ? _a : '?')
            + "\nuniq_id:  " + ((_b = this.uniq_id) !== null && _b !== void 0 ? _b : '?')
            + "\nname:  " + ((_c = this.my_name) !== null && _c !== void 0 ? _c : '?')
            + "\nsave_id: " + ((_d = this.save_id) !== null && _d !== void 0 ? _d : '?')
            + "\nurl:  " + ((_e = this.walker.url()) !== null && _e !== void 0 ? _e : '?')
            + "\nlckd: " + ((_f = this.walker.get_lckd_str()) !== null && _f !== void 0 ? _f : '?')
            + "\nlcnm: " + ((_g = this.walker.get_name()) !== null && _g !== void 0 ? _g : '?')
            + "\nlcid: " + ((_h = this.walker.get_uid()) !== null && _h !== void 0 ? _h : '?')
            + "\ncur_x: " + ((_j = this.walker.get_p().x) !== null && _j !== void 0 ? _j : '?')
            + "\ncur_y: " + ((_k = this.walker.get_p().y) !== null && _k !== void 0 ? _k : '?')
            + "\ncur_z: " + ((_l = this.walker.get_p().z) !== null && _l !== void 0 ? _l : '?')
            + "\ncur_d: " + ((_m = this.walker.get_d()) !== null && _m !== void 0 ? _m : '?')
            + "\ngold: " + (Object.keys((_o = this.gold) !== null && _o !== void 0 ? _o : {}).length)
            + "\nheroes: " + ((_q = (_p = this.heroes) === null || _p === void 0 ? void 0 : _p.length) !== null && _q !== void 0 ? _q : '?')
            + "\n");
    }
    alert_hres() {
        for (const ii in this.heroes)
            this.heroes[ii].alert();
    }
}
exports.C_Team = C_Team;


/***/ }),

/***/ "./src/d_mdl/C_TeamView.ts":
/*!*********************************!*\
  !*** ./src/d_mdl/C_TeamView.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.C_CurrentTeamView = void 0;
const C_PointDir_1 = __webpack_require__(/*! ./C_PointDir */ "./src/d_mdl/C_PointDir.ts");
const C_Team_1 = __webpack_require__(/*! ./C_Team */ "./src/d_mdl/C_Team.ts");
class C_CurrentTeamView {
    static newObj(j) {
        const team = new C_Team_1.C_Team(j);
        return new C_CurrentTeamView(team);
    }
    newObj(j) { return C_CurrentTeamView.newObj(j); }
    constructor(team) {
        this.my_layer = 99;
        this.my_team = team;
    }
    layer() { return this.my_layer; }
    set_layer(layer) { this.my_layer = layer; }
    letter() {
        switch (this.my_team.walk().get_d()) {
            case C_PointDir_1.T_Direction.N: return '↑';
            case C_PointDir_1.T_Direction.E: return '→';
            case C_PointDir_1.T_Direction.S: return '↓';
            case C_PointDir_1.T_Direction.W: return '←';
            default: return '🌀';
        }
    }
    canShow() { return false; }
    drow3D(frot, back) { }
    pad_t() { return 0.0; }
    pad_d() { return 0.0; }
    pad_s() { return 0.0; }
    col_f() { return null; }
    col_b() { return null; }
    col_s() { return null; }
    col_t() { return null; }
    col_d() { return null; }
    col_l() { return null; }
    encode() { return { cname: 'CurrentTeamView' }; }
    decode(j) { return this; }
}
exports.C_CurrentTeamView = C_CurrentTeamView;


/***/ }),

/***/ "./src/d_mdl/C_Walker.ts":
/*!*******************************!*\
  !*** ./src/d_mdl/C_Walker.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.C_Walker = void 0;
const C_PointDir_1 = __webpack_require__(/*! ./C_PointDir */ "./src/d_mdl/C_PointDir.ts");
const C_MovablePoint_1 = __webpack_require__(/*! ./C_MovablePoint */ "./src/d_mdl/C_MovablePoint.ts");
class C_Walker extends C_MovablePoint_1.C_MovablePoint {
    constructor(j) {
        super(j);
    }
    get_x() { return this.loc_pos.x; }
    get_y() { return this.loc_pos.y; }
    get_z() { return this.loc_pos.z; }
    set_x(x) { this.loc_pos.x = x; }
    set_y(y) { this.loc_pos.y = y; }
    set_z(z) { this.loc_pos.z = z; }
    set_place(place, url, pos) {
        this.set_uid(place.uid());
        this.set_lckd(place.get_lckd());
        this.set_name(place.get_name());
        if (url !== undefined)
            this.set_url(url);
        if (pos !== undefined) {
            this.set_pd(pos);
        }
    }
    hope_p_fwd() {
        return {
            has_hope: true,
            hope: "Move",
            subj: this.get_p_fwd(),
            doOK: () => { this.set_p_fwd(); },
            doNG: () => { this.isNG(); },
        };
    }
    hope_p_bak() {
        return {
            has_hope: true,
            hope: "Move",
            subj: this.get_p_bak(),
            doOK: () => { this.set_p_bak(); },
            doNG: () => { this.isNG(); },
        };
    }
    hope_p_lft() {
        return {
            has_hope: true,
            hope: "Move",
            subj: this.get_p_lft(),
            doOK: () => { this.set_p_lft(); },
            doNG: () => { this.isNG(); },
        };
    }
    hope_p_rgt() {
        return {
            has_hope: true,
            hope: "Move",
            subj: this.get_p_rgt(),
            doOK: () => { this.set_p_rgt(); },
            doNG: () => { this.isNG(); },
        };
    }
    hope_turn_r() {
        return {
            has_hope: true,
            hope: "Turn",
            subj: this.get_pd(),
            doOK: () => { this.turn_r(); },
            doNG: () => { this.isNG(); },
        };
    }
    hope_turn_l() {
        return {
            has_hope: true,
            hope: "Turn",
            subj: this.get_pd(),
            doOK: () => { this.turn_l(); },
            doNG: () => { this.isNG(); },
        };
    }
    hope_p_up() {
        return {
            has_hope: true,
            hope: "Up",
            subj: this.get_p_up(),
            doOK: () => { this.move_p_up(); },
            doNG: () => { this.isNG(); },
        };
    }
    hope_p_down() {
        return {
            has_hope: true,
            hope: "Down",
            subj: this.get_p_down(),
            doOK: () => { this.move_p_down(); },
            doNG: () => { this.isNG(); },
        };
    }
    move_p_up() {
        this.set_p_up();
    }
    move_p_down() {
        this.set_p_down();
    }
    isNG() {
        return;
    }
    get_p_fwd() {
        return this.__get_p_move(1, 0);
    }
    set_p_fwd() {
        this.set_pd(this.get_p_fwd());
    }
    get_p_bak() {
        return this.__get_p_move(-1, 0);
    }
    set_p_bak() {
        this.set_pd(this.get_p_bak());
    }
    get_p_lft() {
        return this.__get_p_move(0, -1);
    }
    set_p_lft() {
        this.set_pd(this.get_p_lft());
    }
    get_p_rgt() {
        return this.__get_p_move(0, 1);
    }
    set_p_rgt() {
        this.set_pd(this.get_p_rgt());
    }
    get_p_up() {
        const p = new C_PointDir_1.C_PointDir(this.loc_pos);
        p.z--;
        return p;
    }
    set_p_up() {
        this.set_pd(this.get_p_up());
    }
    get_p_down() {
        const p = new C_PointDir_1.C_PointDir(this.loc_pos);
        p.z++;
        return p;
    }
    set_p_down() {
        this.set_pd(this.get_p_down());
    }
    __get_p_move(offsetFB, offsetLR) {
        const p = new C_PointDir_1.C_PointDir(this.loc_pos);
        if (offsetFB !== 0) {
            switch (this.loc_pos.d) {
                case C_PointDir_1.T_Direction.N:
                    p.y -= offsetFB;
                    break;
                case C_PointDir_1.T_Direction.E:
                    p.x += offsetFB;
                    break;
                case C_PointDir_1.T_Direction.S:
                    p.y += offsetFB;
                    break;
                case C_PointDir_1.T_Direction.W:
                    p.x -= offsetFB;
                    break;
            }
        }
        if (offsetLR !== 0) {
            switch (this.loc_pos.d) {
                case C_PointDir_1.T_Direction.N:
                    p.x += offsetLR;
                    break;
                case C_PointDir_1.T_Direction.E:
                    p.y += offsetLR;
                    break;
                case C_PointDir_1.T_Direction.S:
                    p.x -= offsetLR;
                    break;
                case C_PointDir_1.T_Direction.W:
                    p.y -= offsetLR;
                    break;
            }
        }
        return p;
    }
    get_around(front, right, up = 0) {
        var target_x = this.loc_pos.x;
        var target_y = this.loc_pos.y;
        var target_z = this.loc_pos.z - up;
        switch (this.loc_pos.d) {
            case C_PointDir_1.T_Direction.N:
                target_x += right;
                target_y -= front;
                break;
            case C_PointDir_1.T_Direction.E:
                target_x += front;
                target_y += right;
                break;
            case C_PointDir_1.T_Direction.S:
                target_x -= right;
                target_y += front;
                break;
            case C_PointDir_1.T_Direction.W:
                target_x -= front;
                target_y -= right;
                break;
        }
        return new C_PointDir_1.C_PointDir({ x: target_x, y: target_y, z: target_z, d: this.loc_pos.d });
    }
    turn_r() {
        switch (this.loc_pos.d) {
            case C_PointDir_1.T_Direction.N:
                this.loc_pos.d = C_PointDir_1.T_Direction.E;
                break;
            case C_PointDir_1.T_Direction.E:
                this.loc_pos.d = C_PointDir_1.T_Direction.S;
                break;
            case C_PointDir_1.T_Direction.S:
                this.loc_pos.d = C_PointDir_1.T_Direction.W;
                break;
            case C_PointDir_1.T_Direction.W:
                this.loc_pos.d = C_PointDir_1.T_Direction.N;
                break;
        }
    }
    turn_l() {
        switch (this.loc_pos.d) {
            case C_PointDir_1.T_Direction.N:
                this.loc_pos.d = C_PointDir_1.T_Direction.W;
                break;
            case C_PointDir_1.T_Direction.E:
                this.loc_pos.d = C_PointDir_1.T_Direction.N;
                break;
            case C_PointDir_1.T_Direction.S:
                this.loc_pos.d = C_PointDir_1.T_Direction.E;
                break;
            case C_PointDir_1.T_Direction.W:
                this.loc_pos.d = C_PointDir_1.T_Direction.S;
                break;
        }
    }
    turn_b() {
        switch (this.loc_pos.d) {
            case C_PointDir_1.T_Direction.N:
                this.loc_pos.d = C_PointDir_1.T_Direction.S;
                break;
            case C_PointDir_1.T_Direction.E:
                this.loc_pos.d = C_PointDir_1.T_Direction.W;
                break;
            case C_PointDir_1.T_Direction.S:
                this.loc_pos.d = C_PointDir_1.T_Direction.N;
                break;
            case C_PointDir_1.T_Direction.W:
                this.loc_pos.d = C_PointDir_1.T_Direction.W;
                break;
        }
    }
    encode() {
        const j = super.encode();
        return j;
    }
    decode(a) {
        if (a === undefined)
            return this;
        super.decode(a);
        return this;
    }
}
exports.C_Walker = C_Walker;


/***/ }),

/***/ "./src/d_mdl/C_Wall.ts":
/*!*****************************!*\
  !*** ./src/d_mdl/C_Wall.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.C_Wall = void 0;
const F_Math_1 = __webpack_require__(/*! ../d_utl/F_Math */ "./src/d_utl/F_Math.ts");
class C_Wall {
    constructor(depth = 5, size) {
        if (depth < 3)
            depth = 5;
        if (depth % 2 !== 1)
            depth++;
        const min_x = size.min_x();
        const min_y = size.min_y();
        const max_x = size.max_x();
        const max_y = size.max_y();
        const center_x = (max_x - min_x) / 2;
        const front_wall_size_x = (max_x - min_x) / depth;
        const side_wall_size_x = (center_x - front_wall_size_x / 2) / depth;
        const front_wall_H_size_x = new Array(depth + 1);
        front_wall_H_size_x[depth] = front_wall_size_x / 2;
        for (let i = depth - 1; i >= 0; i--) {
            front_wall_H_size_x[i] = front_wall_H_size_x[i + 1] + side_wall_size_x;
        }
        const front_wall_size_y = (max_y - min_y) / depth;
        const side_wall_size_T = (max_y - min_y - front_wall_size_y) / (depth * 2);
        const side_wall_size_B = (max_y - min_y - front_wall_size_y) / (depth * 2);
        const wall = new Array(depth + 1);
        for (let j = 0; j < depth + 1; j++) {
            wall[j] = new Array(depth + 1);
            for (let k = 0; k < depth + 1; k++) {
                const wk_x = center_x - front_wall_H_size_x[j] * (depth - 2 * k);
                wall[j][k] = {
                    min_x: (0, F_Math_1._round)(wk_x, 0),
                    max_x: (0, F_Math_1._round)(wk_x + front_wall_H_size_x[j] * 2, 0),
                    min_y: (0, F_Math_1._round)(min_y + side_wall_size_T * j, 0),
                    max_y: (0, F_Math_1._round)(max_y - side_wall_size_B * j, 0),
                };
            }
        }
        this.d = depth;
        this.w = wall;
    }
    get_depth() {
        return this.d;
    }
    get(depth, offset) {
        const H_dept = (this.d - 1) / 2;
        return this.w[depth][H_dept + offset];
    }
}
exports.C_Wall = C_Wall;


/***/ }),

/***/ "./src/d_mdl/T_Direction.ts":
/*!**********************************!*\
  !*** ./src/d_mdl/T_Direction.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.$DirectionName = exports.T_Direction = void 0;
exports.T_Direction = {
    N: 0,
    E: 1,
    S: 2,
    W: 3,
    X: 99,
    MAX: 3
};
exports.$DirectionName = {
    0: '北',
    1: '東',
    2: '南',
    3: '西',
    99: '謎'
};


/***/ }),

/***/ "./src/d_mdl/T_MzKind.ts":
/*!*******************************!*\
  !*** ./src/d_mdl/T_MzKind.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.T_RvMzKind = exports.T_MzKind = void 0;
exports.T_MzKind = {
    NoDef: 0,
    Floor: 1,
    Unexp: 2,
    Stone: 3,
    Unkwn: 4,
    StrUp: 5,
    StrDn: 6,
    StrUD: 7,
    Empty: 255,
};
exports.T_RvMzKind = {
    0: exports.T_MzKind.NoDef,
    1: exports.T_MzKind.Floor,
    2: exports.T_MzKind.Unexp,
    3: exports.T_MzKind.Stone,
    4: exports.T_MzKind.Unkwn,
    5: exports.T_MzKind.StrUp,
    6: exports.T_MzKind.StrDn,
    7: exports.T_MzKind.StrUD,
    255: exports.T_MzKind.Empty,
};


/***/ }),

/***/ "./src/d_utl/C_UrlOpt.ts":
/*!*******************************!*\
  !*** ./src/d_utl/C_UrlOpt.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.C_UrlOpt = void 0;
class C_UrlOpt {
    constructor(a) {
        if (typeof a === "undefined") {
            this.v = {};
            return;
        }
        if (typeof a === "string") {
            this.set_from_string(a);
        }
        if (typeof a === "object") {
            this.v = a;
            return;
        }
        this.v = {};
        return;
    }
    get_keys() {
        const key_list = new Array;
        for (var key in this.v) {
            key_list.push(key);
        }
        return key_list;
    }
    get(key) {
        if (key in this.v) {
            if (typeof this.v[key] === "number") {
                return this.v[key].toString();
            }
            if (typeof this.v[key] === "object") {
                return JSON.stringify(this.v[key]);
            }
            return this.v[key];
        }
        else {
            return "";
        }
    }
    set(ukn, val) {
        if (typeof ukn === "string") {
            if (typeof val === "undefined") {
                this.add_from_string(ukn);
                return;
            }
            else if (typeof val === "string") {
                this.v[ukn] = val;
                return;
            }
            else if (typeof val === "number") {
                this.v[ukn] = val;
                return;
            }
            else if (typeof val === "object") {
                this.v[ukn] = val;
                return;
            }
            else {
                this.v[ukn] = "";
                return;
            }
        }
        if (typeof ukn === "object") {
            const attr = ukn;
            for (const item in attr) {
                this.v[item] = attr[item];
            }
            return;
        }
        return;
    }
    isset(key) {
        return (key in this.v);
    }
    remove(key) {
        if (key in this.v) {
            delete this.v[key];
        }
    }
    clear() {
        this.v = {};
    }
    toString() {
        const len = Object.keys(this.v).length;
        if (len < 1)
            return "";
        var str_array = [];
        for (const key in this.v) {
            str_array.push(key + "=" + this.v[key]);
        }
        return str_array.join("&");
    }
    toJSON() {
        return JSON.stringify(this.v);
    }
    toFormData() {
        const len = Object.keys(this.v).length;
        if (len < 1)
            return undefined;
        var form_data = new FormData();
        for (const key in this.v) {
            const value = this.v[key];
            if (typeof value === "string")
                form_data.append(key, value);
            if (typeof value === "object")
                form_data.append(key, JSON.stringify(value));
            else
                form_data.append(key, value.toString());
        }
        return form_data;
    }
    set_from_string(s) {
        this.clear();
        this.add_from_string(s);
    }
    add_from_string(s) {
        const str = s.replace(/^(\??)(.*)$/, '$2');
        const str_array = str.split("&");
        str_array.forEach((item) => {
            const key_value = item.split("=");
            if (key_value.length < 2) {
                this.v[key_value[0]] = '';
            }
            else {
                this.v[key_value[0]] = key_value[1];
            }
        });
    }
}
exports.C_UrlOpt = C_UrlOpt;


/***/ }),

/***/ "./src/d_utl/F_Math.ts":
/*!*****************************!*\
  !*** ./src/d_utl/F_Math.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports._isNum = _isNum;
exports._getNum = _getNum;
exports._round = _round;
exports._ceil = _ceil;
exports._floor = _floor;
exports._min = _min;
exports._max = _max;
function _isNum(numVal) {
    const pattern = /^[-+]?([1-9]\d*|0)(\.\d+)?$/;
    return pattern.test(numVal);
}
function _getNum(numVal) {
    const pattern = /([^0-9])/g;
    const valstr = numVal.replace(pattern, '');
    return Number(valstr);
}
function _round(num, digit) {
    const multiplier = Math.pow(10, digit);
    return Math.round(num * multiplier) / multiplier;
}
function _ceil(num, digit) {
    const multiplier = Math.pow(10, digit);
    return Math.ceil(num * multiplier) / multiplier;
}
function _floor(num, digit) {
    const multiplier = Math.pow(10, digit);
    return Math.floor(num * multiplier) / multiplier;
}
function _min(a) {
    return a.reduce((n1, n2) => Math.min(n1, n2));
}
function _max(a) {
    return a.reduce((n1, n2) => Math.max(n1, n2));
}


/***/ }),

/***/ "./src/d_utl/F_Rand.ts":
/*!*****************************!*\
  !*** ./src/d_utl/F_Rand.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.C_SeededRand = void 0;
exports._irand = _irand;
exports._igrand = _igrand;
exports._grand = _grand;
exports._inrand = _inrand;
exports._nrand = _nrand;
exports._get_uuid = _get_uuid;
exports._selectItem = _selectItem;
exports._shuffleArray = _shuffleArray;
exports._random_str = _random_str;
exports._random_UpperStr = _random_UpperStr;
exports._random_LowerStr = _random_LowerStr;
exports._random_UpperChar = _random_UpperChar;
exports._random_LowerChar = _random_LowerChar;
exports._random_NumChar = _random_NumChar;
exports._random_Char = _random_Char;
const F_Math_1 = __webpack_require__(/*! ./F_Math */ "./src/d_utl/F_Math.ts");
const frand = () => { return Math.random(); };
function _irand(min = 0, max = 1, rand = frand) {
    const f_rand = Math.floor(rand() * (max - min + 1) + min);
    return (0, F_Math_1._round)(f_rand, 0);
}
function _igrand(min = 0, max = 1, rand = frand) {
    return _irand(min, max, () => { return _grand(0, 1, rand); });
}
function _grand(min = 0, max = 1, rand = frand) {
    return Math.floor(___gaussianRand(rand) * (max - min + 1) + min);
}
function ___gaussianRand(rand = frand) {
    let sum = 0;
    for (let i = 0; i < 6; i += 1) {
        sum += rand();
    }
    return sum / 6;
}
function _inrand(min = 0, max = 1, dd = 3.0, rand = frand) {
    return Math.floor(_nrand(min, max, dd, rand));
}
function _nrand(min = 0.0, max = 1.0, dd = 3.0, rand = frand) {
    const ave = 0.5;
    const a = rand();
    const b = rand();
    let x = ave + _fab(a, b) / (2.0 * dd);
    x = min + x * (max - min);
    x = (0, F_Math_1._max)([min, x]);
    x = (0, F_Math_1._min)([max, x]);
    return x;
}
function _fab(a, b) {
    return Math.sqrt(-2.0 * Math.log(a)) * Math.sin(2.0 * Math.PI * b);
}
function _gab(a, b) {
    return Math.sqrt(-2.0 * Math.log(a)) * Math.cos(2.0 * Math.PI * b);
}
class C_SeededRand {
    constructor(seed) {
        this.seed = seed;
        this.first_seed = seed;
    }
    reset() {
        this.seed = this.first_seed;
    }
    random() {
        this.seed = (this.seed * 9301 + 49297) % 233280;
        return this.seed / 233280.0;
    }
}
exports.C_SeededRand = C_SeededRand;
function _get_uuid(len = 20, rand = frand) {
    const lft = (new Date()).getTime().toString(16);
    const rgt_len = (0, F_Math_1._max)([len - lft.length, 1]);
    const rgt = Math.floor(Math.pow(10, rgt_len) * rand()).toString(16);
    return lft + rgt;
}
function _selectItem(items, rand = frand) {
    var ttl = 0;
    for (let item of items)
        ttl += item.ratio;
    const target = _irand(0, ttl, rand);
    var sum = 0;
    for (const item of items) {
        sum += item.ratio;
        if (target < sum) {
            return item;
        }
    }
    return undefined;
}
function _shuffleArray(array, rand = frand) {
    let shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = _irand(0, i, rand);
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
}
function _random_str(length) {
    let str = '';
    for (let i = 0; i < length; i++)
        str += _random_Char();
    return str;
}
function _random_UpperStr(length) {
    let str = '';
    for (let i = 0; i < length; i++)
        str += _random_UpperChar();
    return str;
}
function _random_LowerStr(length) {
    let str = '';
    for (let i = 0; i < length; i++)
        str += _random_LowerChar();
    return str;
}
function _random_UpperChar() {
    const val = _irand(0, 26);
    return String.fromCharCode(65 + val);
}
function _random_LowerChar() {
    const val = _irand(0, 26);
    return String.fromCharCode(95 + val);
}
function _random_NumChar() {
    const val = _irand(0, 9);
    return String.fromCharCode(48 + val);
}
function _random_Char() {
    const val = _irand(0, 61);
    if (val < 26)
        return String.fromCharCode(65 + val);
    if (val < 52)
        return String.fromCharCode(97 + val - 26);
    return String.fromCharCode(48 + val - 52);
}


/***/ }),

/***/ "./src/d_vie/C_DisplayMessage.ts":
/*!***************************************!*\
  !*** ./src/d_vie/C_DisplayMessage.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.C_DisplayMessage = void 0;
class C_DisplayMessage {
    constructor(con, id = 'client_message') {
        C_DisplayMessage.me = this;
        this.id = id;
        this.div = document.createElement('div');
        if (this.div === null)
            alert('Can not founnd Div#client_message!');
        this.div.setAttribute('id', this.id);
        con.insertBefore(this.div, con.firstChild);
        C_DisplayMessage.me.clear_message();
    }
    static getObj(con = null, id = 'client_message') {
        if (typeof this.me !== "object" || !(this.me instanceof C_DisplayMessage)) {
            if (con === null) {
                con = document.createElement('div');
                document.body.appendChild(con);
            }
            this.me = new C_DisplayMessage(con, id);
        }
        return this.me;
    }
    display_message(mes, fr_color = 'inherit', bg_color = 'inherit') {
        const p = document.createElement('p');
        p.style.setProperty('color', fr_color);
        p.style.setProperty('background-color', bg_color);
        p.innerHTML = mes;
        this.div.insertBefore(p, this.div.firstChild);
    }
    clear_message() {
        while (this.div.firstChild) {
            this.div.removeChild(this.div.firstChild);
        }
        ;
    }
    normal_message(mes) {
        this.display_message(mes);
    }
    notice_message(mes) {
        this.display_message(mes, '#006600', '#ccffcc');
    }
    warning_message(mes) {
        this.display_message(mes, '#ffffff', '#ff0000');
    }
}
exports.C_DisplayMessage = C_DisplayMessage;


/***/ }),

/***/ "./src/d_vie/C_OneLineViewMessage.ts":
/*!*******************************************!*\
  !*** ./src/d_vie/C_OneLineViewMessage.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.C_OneLineViewMessage = void 0;
class C_OneLineViewMessage {
    constructor(id, parent) {
        var _a;
        (_a = C_OneLineViewMessage.me) !== null && _a !== void 0 ? _a : (C_OneLineViewMessage.me = {});
        C_OneLineViewMessage.me[id] = this;
        try {
            this.p = document.getElementById(id);
        }
        catch (err) {
            this.p = document.createElement('p');
            this.p.id = id;
            parent !== null && parent !== void 0 ? parent : (parent = document.body);
            parent.appendChild(this.p);
        }
        C_OneLineViewMessage.me[id].clear_message();
    }
    static getObj(id, parent) {
        var _a, _b;
        var _c;
        (_a = C_OneLineViewMessage.me) !== null && _a !== void 0 ? _a : (C_OneLineViewMessage.me = {});
        (_b = (_c = this.me)[id]) !== null && _b !== void 0 ? _b : (_c[id] = new C_OneLineViewMessage(id, parent));
        return this.me[id];
    }
    display_message(mes, fr_color = 'inherit', bg_color = 'inherit') {
        this.p.style.setProperty('color', fr_color);
        this.p.style.setProperty('background-color', bg_color);
        this.p.innerHTML = mes;
    }
    clear_message() {
        this.display_message('　');
    }
    normal_message(mes) {
        this.display_message(mes);
    }
    notice_message(mes) {
        this.display_message(mes, '#006600', '#ccffcc');
    }
    warning_message(mes) {
        this.display_message(mes, '#ffffff', '#ff0000');
    }
}
exports.C_OneLineViewMessage = C_OneLineViewMessage;


/***/ }),

/***/ "./src/mai_maze/C_DefaultCtls.ts":
/*!***************************************!*\
  !*** ./src/mai_maze/C_DefaultCtls.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.C_DefaultCtls = void 0;
const global_1 = __webpack_require__(/*! ../d_cmn/global */ "./src/d_cmn/global.ts");
const global_for_maze_1 = __webpack_require__(/*! ./global_for_maze */ "./src/mai_maze/global_for_maze.ts");
const F_set_move_mode_1 = __webpack_require__(/*! ./F_set_move_mode */ "./src/mai_maze/F_set_move_mode.ts");
class C_DefaultCtls {
    constructor() {
        this.ctls = {};
        this.flgs = {};
        this.u_arr = document.getElementById('u_arr');
        this.d_arr = document.getElementById('d_arr');
        this.l_arr = document.getElementById('l_arr');
        this.r_arr = document.getElementById('r_arr');
        this.y_btn = document.getElementById('y_btn');
        this.n_btn = document.getElementById('n_btn');
        this.s_btn = document.getElementById('s_btn');
        this.r_btn = document.getElementById('r_btn');
        this.m_btn = document.getElementById('m_btn');
        this.y_cp1 = document.getElementById('y_cp1');
        this.n_cp1 = document.getElementById('n_cp1');
        this.s_cp1 = document.getElementById('s_cp1');
        this.r_cp1 = document.getElementById('r_cp1');
        this.u_arr.style.display = 'none';
        this.d_arr.style.display = 'none';
        this.l_arr.style.display = 'none';
        this.r_arr.style.display = 'none';
        this.y_btn.style.display = 'none';
        this.n_btn.style.display = 'none';
        this.s_btn.style.display = 'none';
        this.r_btn.style.display = 'none';
        this.m_btn.style.display = 'none';
        this.y_cp1.style.display = 'none';
        this.n_cp1.style.display = 'none';
        this.s_cp1.style.display = 'none';
        this.r_cp1.style.display = 'none';
    }
    static getObj() {
        var _a;
        (_a = this.me) !== null && _a !== void 0 ? _a : (this.me = new C_DefaultCtls());
        return this.me;
    }
    clr() {
        this.ctls = {};
        this.flgs = {};
        return true;
    }
    set(name, ctls) {
        try {
            if (typeof name === 'string' && ctls !== undefined) {
                this.ctls[name] = ctls;
                this.flgs[name] = false;
            }
            else {
                const c = name;
                this.ctls[c.name] = c;
                this.flgs[c.name] = false;
            }
            return true;
        }
        catch (err) {
            return false;
        }
    }
    rmv(ctls) {
        try {
            const name = typeof ctls === 'string' ? ctls : ctls.name;
            delete this.ctls[name];
            delete this.flgs[name];
            return true;
        }
        catch (err) {
            return false;
        }
    }
    deact() {
        for (const ii in this.ctls) {
            if (this.ctls[ii].name === undefined)
                continue;
            if (!this._rmv_default_ctls(this.ctls[ii].name))
                return false;
        }
        return true;
    }
    act(ctls) {
        try {
            if (!this.deact())
                return false;
            const name = typeof ctls === 'string' ? ctls : ctls.name;
            return this._add_default_ctls(name);
        }
        catch (err) {
            return false;
        }
    }
    is_act(ctls) {
        var _a;
        try {
            const name = typeof ctls === 'string' ? ctls : ctls.name;
            return (_a = this.flgs[name]) !== null && _a !== void 0 ? _a : false;
        }
        catch (err) {
            return false;
        }
    }
    keys_of_add() {
        const key_list = [];
        for (const name in this.ctls)
            key_list.push(name);
        return key_list;
    }
    keys_of_act() {
        const key_list = [];
        for (const name in this.flgs)
            if (this.flgs[name])
                key_list.push(name);
        return key_list;
    }
    _rmv_default_ctls(name) {
        var _a;
        var _b;
        (_a = (_b = this.flgs)[name]) !== null && _a !== void 0 ? _a : (_b[name] = false);
        if (!this.flgs[name])
            return true;
        this.flgs[name] = false;
        const c = this.ctls[name];
        try {
            if (_c(c === null || c === void 0 ? void 0 : c.do_U))
                this.u_arr.removeEventListener("click", c.do_U, false);
            if (_c(c === null || c === void 0 ? void 0 : c.do_D))
                this.d_arr.removeEventListener("click", c.do_D, false);
            if (_c(c === null || c === void 0 ? void 0 : c.do_L))
                this.l_arr.removeEventListener("click", c.do_L, false);
            if (_c(c === null || c === void 0 ? void 0 : c.do_R))
                this.r_arr.removeEventListener("click", c.do_R, false);
            if (_c(c === null || c === void 0 ? void 0 : c.isOK))
                this.y_btn.removeEventListener("click", c.isOK, false);
            if (_c(c === null || c === void 0 ? void 0 : c.isNG))
                this.n_btn.removeEventListener("click", c.isNG, false);
            if (_c(c === null || c === void 0 ? void 0 : c.isSL))
                this.s_btn.removeEventListener("click", c.isSL, false);
            if (_c(c === null || c === void 0 ? void 0 : c.isRT))
                this.r_btn.removeEventListener("click", c.isRT, false);
            if (_c(c === null || c === void 0 ? void 0 : c.menu))
                this.m_btn.removeEventListener("click", c.menu, false);
            if (_c(c === null || c === void 0 ? void 0 : c.cpOK))
                this.y_cp1.removeEventListener("click", c.cpOK, false);
            if (_c(c === null || c === void 0 ? void 0 : c.cpNG))
                this.n_cp1.removeEventListener("click", c.cpNG, false);
            if (_c(c === null || c === void 0 ? void 0 : c.cpSL))
                this.s_cp1.removeEventListener("click", c.cpSL, false);
            if (_c(c === null || c === void 0 ? void 0 : c.cpRT))
                this.r_cp1.removeEventListener("click", c.cpRT, false);
            if ((c === null || c === void 0 ? void 0 : c.keyEvent) !== undefined) {
                window.removeEventListener('keydown', c.keyEvent);
            }
            else {
                window.removeEventListener('keydown', key_press_function);
            }
            this.u_arr.style.display = 'none';
            this.d_arr.style.display = 'none';
            this.l_arr.style.display = 'none';
            this.r_arr.style.display = 'none';
            this.y_btn.style.display = 'none';
            this.n_btn.style.display = 'none';
            this.s_btn.style.display = 'none';
            this.r_btn.style.display = 'none';
            this.m_btn.style.display = 'none';
            this.y_cp1.style.display = 'none';
            this.n_cp1.style.display = 'none';
            this.s_cp1.style.display = 'none';
            this.r_cp1.style.display = 'none';
        }
        catch (err) {
            alert('Error Occuerd at Remove Default Ctls.');
            alert('' + err);
            return false;
        }
        return true;
    }
    _add_default_ctls(name) {
        var _a;
        var _b;
        (_a = (_b = this.flgs)[name]) !== null && _a !== void 0 ? _a : (_b[name] = false);
        if (this.flgs[name])
            return true;
        this.flgs[name] = true;
        const c = this.ctls[name];
        try {
            if (_c(c === null || c === void 0 ? void 0 : c.do_U))
                this.u_arr.addEventListener("click", c.do_U, false);
            if (_c(c === null || c === void 0 ? void 0 : c.do_D))
                this.d_arr.addEventListener("click", c.do_D, false);
            if (_c(c === null || c === void 0 ? void 0 : c.do_L))
                this.l_arr.addEventListener("click", c.do_L, false);
            if (_c(c === null || c === void 0 ? void 0 : c.do_R))
                this.r_arr.addEventListener("click", c.do_R, false);
            if (_c(c === null || c === void 0 ? void 0 : c.isOK))
                this.y_btn.addEventListener("click", c.isOK, false);
            if (_c(c === null || c === void 0 ? void 0 : c.isNG))
                this.n_btn.addEventListener("click", c.isNG, false);
            if (_c(c === null || c === void 0 ? void 0 : c.isSL))
                this.s_btn.addEventListener("click", c.isSL, false);
            if (_c(c === null || c === void 0 ? void 0 : c.isRT))
                this.r_btn.addEventListener("click", c.isRT, false);
            if (_c(c === null || c === void 0 ? void 0 : c.menu))
                this.m_btn.addEventListener("click", c.menu, false);
            if (_c(c === null || c === void 0 ? void 0 : c.cpOK))
                this.y_cp1.addEventListener("click", c.cpOK, false);
            if (_c(c === null || c === void 0 ? void 0 : c.cpNG))
                this.n_cp1.addEventListener("click", c.cpNG, false);
            if (_c(c === null || c === void 0 ? void 0 : c.cpSL))
                this.s_cp1.addEventListener("click", c.cpSL, false);
            if (_c(c === null || c === void 0 ? void 0 : c.cpRT))
                this.r_cp1.addEventListener("click", c.cpRT, false);
            if ((c === null || c === void 0 ? void 0 : c.keyEvent) !== undefined) {
                window.addEventListener('keydown', c.keyEvent);
            }
            else {
                window.addEventListener('keydown', key_press_function);
            }
            this.u_arr.style.display = _c(c === null || c === void 0 ? void 0 : c.do_U) ? 'block' : 'none';
            this.d_arr.style.display = _c(c === null || c === void 0 ? void 0 : c.do_D) ? 'block' : 'none';
            this.l_arr.style.display = _c(c === null || c === void 0 ? void 0 : c.do_L) ? 'block' : 'none';
            this.r_arr.style.display = _c(c === null || c === void 0 ? void 0 : c.do_R) ? 'block' : 'none';
            this.y_btn.style.display = _c(c === null || c === void 0 ? void 0 : c.isOK) ? 'block' : 'none';
            this.n_btn.style.display = _c(c === null || c === void 0 ? void 0 : c.isNG) ? 'block' : 'none';
            this.s_btn.style.display = _c(c === null || c === void 0 ? void 0 : c.isSL) ? 'block' : 'none';
            this.r_btn.style.display = _c(c === null || c === void 0 ? void 0 : c.isRT) ? 'block' : 'none';
            this.m_btn.style.display = _c(c === null || c === void 0 ? void 0 : c.menu) ? 'block' : 'none';
            this.y_cp1.style.display = _c(c === null || c === void 0 ? void 0 : c.cpOK) ? 'block' : 'none';
            this.n_cp1.style.display = _c(c === null || c === void 0 ? void 0 : c.cpNG) ? 'block' : 'none';
            this.s_cp1.style.display = _c(c === null || c === void 0 ? void 0 : c.cpSL) ? 'block' : 'none';
            this.r_cp1.style.display = _c(c === null || c === void 0 ? void 0 : c.cpRT) ? 'block' : 'none';
        }
        catch (err) {
            alert('Error Occuerd at Append Default Ctls.');
            alert('' + err);
            return false;
        }
        return true;
    }
}
exports.C_DefaultCtls = C_DefaultCtls;
function _c(c) {
    if (c === undefined)
        return false;
    if (c === null)
        return false;
    return true;
}
function key_press_function(e) {
    var _a, _b, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
    const ne = ((_a = e.target) === null || _a === void 0 ? void 0 : _a.value) === undefined;
    switch (e.code) {
        case 'ArrowUp':
        case 'Numpad5':
            e.preventDefault();
            (_b = document.getElementById('u_arr')) === null || _b === void 0 ? void 0 : _b.click();
            break;
        case 'KeyO':
            if (ne)
                (_d = document.getElementById('u_arr')) === null || _d === void 0 ? void 0 : _d.click();
            break;
        case 'ArrowDown':
            e.preventDefault();
            (_e = document.getElementById('d_arr')) === null || _e === void 0 ? void 0 : _e.click();
            break;
        case 'Numpad2':
            (_f = document.getElementById('d_arr')) === null || _f === void 0 ? void 0 : _f.click();
            break;
        case 'KeyL':
            if (!ne)
                break;
            if (global_1.g_debug.isON()) {
                (0, F_set_move_mode_1.do_instant_load)();
            }
            else {
                (_g = document.getElementById('d_arr')) === null || _g === void 0 ? void 0 : _g.click();
            }
            break;
        case 'ArrowLeft':
        case 'Numpad1':
            e.preventDefault();
            (_h = document.getElementById('l_arr')) === null || _h === void 0 ? void 0 : _h.click();
            break;
        case 'KeyK':
            if (ne)
                (_j = document.getElementById('l_arr')) === null || _j === void 0 ? void 0 : _j.click();
            break;
        case 'ArrowRight':
        case 'Numpad3':
            e.preventDefault();
            (_k = document.getElementById('r_arr')) === null || _k === void 0 ? void 0 : _k.click();
            break;
        case 'Semicolon':
            if (ne)
                (_l = document.getElementById('r_arr')) === null || _l === void 0 ? void 0 : _l.click();
            break;
        case 'Enter':
        case 'NumpadEnter':
        case 'F10':
            e.preventDefault();
            if (e.shiftKey)
                (_m = document.getElementById('n_btn')) === null || _m === void 0 ? void 0 : _m.click();
            else
                (_o = document.getElementById('y_btn')) === null || _o === void 0 ? void 0 : _o.click();
            break;
        case 'KeyY':
        case 'KeyP':
        case 'Digit0':
            if (ne)
                (_p = document.getElementById('y_btn')) === null || _p === void 0 ? void 0 : _p.click();
            break;
        case 'F1':
        case 'Numpad0':
        case 'NumpadAdd':
            e.preventDefault();
            (_q = document.getElementById('n_btn')) === null || _q === void 0 ? void 0 : _q.click();
            break;
        case 'KeyN':
        case 'KeyI':
        case 'Digit8':
            if (ne)
                (_r = document.getElementById('n_btn')) === null || _r === void 0 ? void 0 : _r.click();
            break;
        case 'KeyU':
            if (!ne)
                break;
            if (global_1.g_debug.isON()) {
                const z = global_for_maze_1.g_team.walk().get_z();
                if (z > 0)
                    global_for_maze_1.g_team.walk().set_z(z - 1);
                (0, F_set_move_mode_1.do_move_bottom_half)('blink_off');
            }
            break;
        case 'KeyD':
            if (!ne)
                break;
            if (global_1.g_debug.isON()) {
                const z = global_for_maze_1.g_team.walk().get_z();
                if (z < global_for_maze_1.g_maze.get_z_max() - 1)
                    global_for_maze_1.g_team.walk().set_z(z + 1);
                (0, F_set_move_mode_1.do_move_bottom_half)('blink_off');
            }
            break;
        case 'KeyM':
        case 'Numpad7':
            if (ne)
                (_s = document.getElementById('m_btn')) === null || _s === void 0 ? void 0 : _s.click();
            break;
        case 'F7':
            e.preventDefault();
            (_t = document.getElementById('s_btn')) === null || _t === void 0 ? void 0 : _t.click();
            break;
        case 'Comma':
            if (ne)
                (_u = document.getElementById('s_btn')) === null || _u === void 0 ? void 0 : _u.click();
            break;
        case 'KeyS':
            if (!ne)
                break;
            if (global_1.g_debug.isON()) {
                (0, F_set_move_mode_1.do_instant_save)();
                (0, F_set_move_mode_1.do_move_bottom_half)('blink_off');
            }
            else {
                (_v = document.getElementById('s_btn')) === null || _v === void 0 ? void 0 : _v.click();
            }
            break;
        case 'F3':
        case 'Numpad8':
            e.preventDefault();
            (_w = document.getElementById('r_btn')) === null || _w === void 0 ? void 0 : _w.click();
            break;
        case 'KeyR':
        case 'Period':
            if (ne)
                (_x = document.getElementById('r_btn')) === null || _x === void 0 ? void 0 : _x.click();
            break;
    }
}


/***/ }),

/***/ "./src/mai_maze/C_SwitchView.ts":
/*!**************************************!*\
  !*** ./src/mai_maze/C_SwitchView.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.C_SwitchView = exports.T_ViewMode = void 0;
const global_1 = __webpack_require__(/*! ../d_cmn/global */ "./src/d_cmn/global.ts");
exports.T_ViewMode = {
    Move: 'move',
    Batt: 'batt',
    Menu: 'menu',
    LdSv: 'ldsv',
};
class C_SwitchView {
    Move() { return exports.T_ViewMode.Move; }
    Batt() { return exports.T_ViewMode.Batt; }
    Menu() { return exports.T_ViewMode.Menu; }
    MvPt() { return exports.T_ViewMode.Menu; }
    LdSv() { return exports.T_ViewMode.LdSv; }
    constructor() {
        C_SwitchView.all_class = Object.values(exports.T_ViewMode);
        C_SwitchView.article = {};
        try {
            C_SwitchView.body = document.body;
            C_SwitchView.article.view3d = document.getElementById('pane_maze_vw3D');
            C_SwitchView.article.viewCh = document.getElementById('pane_maze_vwCh');
            C_SwitchView.article.menu_l = document.getElementById('pane_menu_list');
            C_SwitchView.article.ldsv_l = document.getElementById('pane_ldsv_list');
            C_SwitchView.article.ldsv_d = document.getElementById('pane_ldsv_data');
            C_SwitchView.article.menu_m = document.getElementById('pane_menu_mesg');
            C_SwitchView.article.game_m = document.getElementById('pane_maze_mesg');
            C_SwitchView.article.contls = document.getElementById('pane_ctls_boad');
            C_SwitchView.article.messag = document.getElementById('pane_sytm_mesg');
        }
        catch (err) {
            (0, global_1._alert)('Layout Get Error: ' + err);
        }
        this.view('move');
    }
    static getObj() {
        var _a;
        (_a = this.me) !== null && _a !== void 0 ? _a : (this.me = new C_SwitchView());
        return this.me;
    }
    view(mode) {
        this.__set_class(mode);
        return true;
    }
    __set_class(c) {
        var _a, _b, _c, _d;
        try {
            (_a = C_SwitchView.body) === null || _a === void 0 ? void 0 : _a.classList.remove(...C_SwitchView.all_class);
            (_b = C_SwitchView.body) === null || _b === void 0 ? void 0 : _b.classList.add(c);
            for (const ii in C_SwitchView.article) {
                if (C_SwitchView.article[ii] === null)
                    continue;
                (_c = C_SwitchView.article[ii]) === null || _c === void 0 ? void 0 : _c.classList.remove(...C_SwitchView.all_class);
                (_d = C_SwitchView.article[ii]) === null || _d === void 0 ? void 0 : _d.classList.add(c);
            }
        }
        catch (err) {
            (0, global_1._alert)('Layout Set Error: ' + err);
        }
    }
}
exports.C_SwitchView = C_SwitchView;


/***/ }),

/***/ "./src/mai_maze/F_display_maze3D.ts":
/*!******************************************!*\
  !*** ./src/mai_maze/F_display_maze3D.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.init_maze3D = init_maze3D;
exports.display_maze3D = display_maze3D;
exports.displey_mase3D_direction = displey_mase3D_direction;
exports.maze3D_blink_on_direction = maze3D_blink_on_direction;
exports.maze3D_blink_off_direction = maze3D_blink_off_direction;
const C_Point_1 = __webpack_require__(/*! ../d_mdl/C_Point */ "./src/d_mdl/C_Point.ts");
const C_Range_1 = __webpack_require__(/*! ../d_mdl/C_Range */ "./src/d_mdl/C_Range.ts");
const C_MazeObjView_1 = __webpack_require__(/*! ../d_mdl/C_MazeObjView */ "./src/d_mdl/C_MazeObjView.ts");
const T_Direction_1 = __webpack_require__(/*! ../d_mdl/T_Direction */ "./src/d_mdl/T_Direction.ts");
const C_Wall_1 = __webpack_require__(/*! ../d_mdl/C_Wall */ "./src/d_mdl/C_Wall.ts");
const global_1 = __webpack_require__(/*! ../d_cmn/global */ "./src/d_cmn/global.ts");
const global_for_maze_1 = __webpack_require__(/*! ./global_for_maze */ "./src/mai_maze/global_for_maze.ts");
function init_maze3D() {
    const canvas = document.getElementById('maze_view3D_canvas');
    if (canvas === null) {
        global_1.g_mes.warning_message('Canvas isnt found! id=Maze_view3D_canvas');
        return { canvas: null, con: null, depth: 0, wall: null };
    }
    const con = canvas.getContext('2d');
    if (con === null) {
        global_1.g_mes.warning_message('Browser dont surpport 2D graphics!');
        return { canvas: null, con: null, depth: 0, wall: null };
    }
    C_MazeObjView_1.C_MazeObjView.set_context3D(con);
    init_mazeCell3D();
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    const depth = 5;
    const top_p = new C_Point_1.C_Point(0, 0, 0);
    const btm_p = new C_Point_1.C_Point(canvas.width - 1, canvas.height - 1, 0);
    const wall = new C_Wall_1.C_Wall(depth, new C_Range_1.C_Range(top_p, btm_p));
    return { canvas: canvas, con: con, depth: depth, wall: wall };
}
function init_mazeCell3D() { }
function draw_init_maze3D() {
    if (global_for_maze_1.g_ds.canvas === null || global_for_maze_1.g_ds.con === null)
        return;
    global_for_maze_1.g_ds.con.fillStyle = '#aaaaaa';
    global_for_maze_1.g_ds.con.fillRect(0, 0, global_for_maze_1.g_ds.canvas.width - 1, get_holizon_line());
    global_for_maze_1.g_ds.con.fillStyle = '#6666ff';
    global_for_maze_1.g_ds.con.fillRect(0, get_holizon_line(), global_for_maze_1.g_ds.canvas.width - 1, global_for_maze_1.g_ds.canvas.height - 1);
    drow_floor_line();
}
function get_holizon_line() {
    if (global_for_maze_1.g_ds.wall === null)
        return -1;
    return global_for_maze_1.g_ds.wall.get(global_for_maze_1.g_ds.depth, 0).max_y;
}
function drow_floor_line() {
    if (global_for_maze_1.g_ds.canvas === null || global_for_maze_1.g_ds.con === null || global_for_maze_1.g_ds.wall === null)
        return;
    const con = global_for_maze_1.g_ds.con;
    const wall = global_for_maze_1.g_ds.wall;
    const depth = global_for_maze_1.g_ds.depth;
    const H_dept = (depth - 1) / 2;
    const left_x = 0;
    const right_x = global_for_maze_1.g_ds.canvas.width - 1;
    const front_y = global_for_maze_1.g_ds.canvas.height - 1;
    const back_y = get_holizon_line();
    con.strokeStyle = '#9999ff';
    con.lineWidth = 1;
    for (var y = 0; y < depth + 1; y++) {
        con.beginPath();
        con.moveTo(left_x, wall.get(y, 0).max_y);
        con.lineTo(right_x, wall.get(y, 0).max_y);
        con.stroke();
    }
    for (var x = -H_dept; x < H_dept + 1; x++) {
        con.beginPath();
        con.moveTo(wall.get(0, x).min_x, front_y);
        con.lineTo(wall.get(depth, x).min_x, back_y);
        con.stroke();
    }
}
function display_maze3D() {
    if (global_for_maze_1.g_ds.canvas === null || global_for_maze_1.g_ds.con === null || global_for_maze_1.g_ds.wall === null)
        return;
    draw_init_maze3D();
    displey_mase3D_direction();
    const depth = global_for_maze_1.g_ds.depth;
    const H_depth = (depth - 1) / 2;
    for (var j = global_for_maze_1.g_ds.depth - 1; j >= 0; j--) {
        for (var k = -H_depth; k < 0; k++)
            drowMazeCell(j, k);
        for (var k = H_depth; k > 0; k--)
            drowMazeCell(j, k);
        drowMazeCell(j, 0);
    }
}
function drowMazeCell(d, w) {
    var _a, _b;
    if (global_for_maze_1.g_ds.wall === null)
        return;
    const around_j_k = global_for_maze_1.g_team.walk().get_around(d, w, 0);
    const frot_wall = global_for_maze_1.g_ds.wall.get(d, w);
    const back_wall = global_for_maze_1.g_ds.wall.get(d + 1, w);
    const mz_kind = global_for_maze_1.g_maze.get_kind(around_j_k);
    (_a = global_for_maze_1.g_maze === null || global_for_maze_1.g_maze === void 0 ? void 0 : global_for_maze_1.g_maze.get_cell(around_j_k)) === null || _a === void 0 ? void 0 : _a.drow3D(frot_wall, back_wall);
    if (global_for_maze_1.g_maze.exist_obj(around_j_k)) {
        const obj = global_for_maze_1.g_maze.get_obj(around_j_k);
        if (obj !== null)
            (_b = obj.view()) === null || _b === void 0 ? void 0 : _b.drow3D(frot_wall, back_wall);
    }
}
function displey_mase3D_direction() {
    const p_dir = document.getElementById('maze_view3D_direction_info');
    if (p_dir === null) {
        global_1.g_mes.warning_message('P element isnt found! id=Maze_view3D_direction_info');
        return;
    }
    var direction;
    const p = global_for_maze_1.g_team.get_pd();
    switch (p.d) {
        case T_Direction_1.T_Direction.N:
            direction = '<span class="direction_N">《北》</span>';
            break;
        case T_Direction_1.T_Direction.E:
            direction = '<span class="direction_E">《東》</span>';
            break;
        case T_Direction_1.T_Direction.S:
            direction = '<span class="direction_S">《南》</span>';
            break;
        case T_Direction_1.T_Direction.W:
            direction = '<span class="direction_W">《西》</span>';
            break;
        default:
            direction = '<span class="direction_D">《謎》</span>';
            break;
    }
    const mes = '地下 ' + (p.z + 1) + '階　' + direction + '　(x = <span id="direction_X">' + p.x + '</span>, y = <span id="direction_Y">' + p.y + '</span>)';
    p_dir.innerHTML = mes;
}
function maze3D_blink_on_direction() {
    const dir_x = document.getElementById('direction_X');
    if (dir_x === null)
        return;
    const dir_y = document.getElementById('direction_Y');
    if (dir_y === null)
        return;
    switch (global_for_maze_1.g_team.walk().get_d()) {
        case T_Direction_1.T_Direction.N:
        case T_Direction_1.T_Direction.S:
            dir_x.classList.remove('blink');
            dir_y.classList.add('blink');
            return;
        case T_Direction_1.T_Direction.E:
        case T_Direction_1.T_Direction.W:
            dir_x.classList.add('blink');
            dir_y.classList.remove('blink');
            return;
    }
}
function maze3D_blink_off_direction() {
    const dir_x = document.getElementById('direction_X');
    if (dir_x === null)
        return;
    dir_x.classList.remove('blink');
    const dir_y = document.getElementById('direction_Y');
    if (dir_y === null)
        return;
    dir_y.classList.remove('blink');
}


/***/ }),

/***/ "./src/mai_maze/F_display_mazeCh.ts":
/*!******************************************!*\
  !*** ./src/mai_maze/F_display_mazeCh.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.init_mazeCh = init_mazeCh;
exports.display_mazeCh = display_mazeCh;
const global_1 = __webpack_require__(/*! ../d_cmn/global */ "./src/d_cmn/global.ts");
const F_Math_1 = __webpack_require__(/*! ../d_utl/F_Math */ "./src/d_utl/F_Math.ts");
const global_for_maze_1 = __webpack_require__(/*! ./global_for_maze */ "./src/mai_maze/global_for_maze.ts");
let div;
let pre;
let view_wdth = 0;
let view_hght = 0;
let map_wdth = 0;
let map_hght = 0;
let font_size = 0;
let line_hght = 0;
function init_mazeCh() {
    div = document.getElementById('div_maze_vwCh');
    pre = document.getElementById('maze_viewCh_pre');
    calc_viewCh_width();
}
function calc_viewCh_width() {
    view_wdth = div.clientWidth;
    view_hght = div.clientHeight;
    const col = global_for_maze_1.g_maze.get_x_max() + 1;
    const col_px = view_wdth / col;
    const row = global_for_maze_1.g_maze.get_y_max() + 1;
    const row_px = view_hght / row;
    font_size = (0, F_Math_1._round)((0, F_Math_1._max)([15.0, (0, F_Math_1._round)(1.00 * (0, F_Math_1._min)([col_px, row_px]), 2)]), 0);
    line_hght = (0, F_Math_1._round)((0, F_Math_1._max)([15.0, (0, F_Math_1._round)(1.00 * (0, F_Math_1._min)([col_px, row_px]), 2)]), 0);
    map_wdth = font_size * col;
    map_hght = line_hght * col;
    pre.setAttribute('width', map_wdth.toString());
    pre.setAttribute('height', map_hght.toString());
    pre.style.setProperty('font-size', `${font_size}px`);
    pre.style.setProperty('line-height', `${line_hght}px`);
}
function calc_view_top() {
    view_wdth = div.clientWidth;
    view_hght = div.clientHeight;
    const pd = global_for_maze_1.g_team.get_pd();
    let top_x = view_wdth / 2 - (pd.x + 1) * font_size;
    let top_y = view_hght / 2 - (pd.y + 1) * line_hght;
    pre.style.setProperty('left', `${top_x}px`);
    pre.style.setProperty('top', `${top_y}px`);
}
function display_mazeCh() {
    if (pre !== null) {
        pre.innerText = to_string();
        calc_view_top();
    }
    else
        global_1.g_mes.warning_message('Can not found pre#Maze_viewCh_pre!!');
}
function to_string() {
    var _a, _b, _c;
    const size_x = global_for_maze_1.g_maze.get_x_max();
    const size_y = global_for_maze_1.g_maze.get_y_max();
    const floor = global_for_maze_1.g_team.get_pd().z;
    let ret_str = '';
    for (let y = 0; y < size_y; y++) {
        for (let x = 0; x < size_x; x++) {
            if (!global_1.g_debug.isON() && global_for_maze_1.g_maze.is_masked_xyz(x, y, floor)) {
                ret_str += '◆';
            }
            else {
                const obj = global_for_maze_1.g_maze.get_obj_xyz(x, y, floor);
                if (obj === null || obj.view() === undefined) {
                    ret_str += (_a = global_for_maze_1.g_maze.get_cell_xyz(x, y, floor)) === null || _a === void 0 ? void 0 : _a.to_letter();
                }
                else {
                    const obj_c = (_c = (_b = obj.view()) === null || _b === void 0 ? void 0 : _b.letter()) !== null && _c !== void 0 ? _c : '謎';
                    ret_str += obj_c;
                }
            }
        }
        ret_str += "\n";
    }
    return ret_str;
}


/***/ }),

/***/ "./src/mai_maze/F_set_UD_mode.ts":
/*!***************************************!*\
  !*** ./src/mai_maze/F_set_UD_mode.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.init_UD_mode = init_UD_mode;
exports.act_Up_mode = act_Up_mode;
exports.act_Dn_mode = act_Dn_mode;
exports.act_UD_mode = act_UD_mode;
const C_UrlOpt_1 = __webpack_require__(/*! ../d_utl/C_UrlOpt */ "./src/d_utl/C_UrlOpt.ts");
const F_load_and_save_1 = __webpack_require__(/*! ../d_cmn/F_load_and_save */ "./src/d_cmn/F_load_and_save.ts");
const F_POST_1 = __webpack_require__(/*! ../d_cmn/F_POST */ "./src/d_cmn/F_POST.ts");
const global_1 = __webpack_require__(/*! ../d_cmn/global */ "./src/d_cmn/global.ts");
const F_set_save_mode_1 = __webpack_require__(/*! ./F_set_save_mode */ "./src/mai_maze/F_set_save_mode.ts");
const F_set_move_mode_1 = __webpack_require__(/*! ./F_set_move_mode */ "./src/mai_maze/F_set_move_mode.ts");
const global_for_maze_1 = __webpack_require__(/*! ./global_for_maze */ "./src/mai_maze/global_for_maze.ts");
var canUp = false;
var canDn = false;
var isUp = false;
const ctls_updn_up = {
    name: 'updn_up',
    isOK: do_up,
    isNG: do_cancel,
};
const ctls_updn_dn = {
    name: 'updn_dn',
    isOK: do_down,
    isNG: do_cancel,
};
const ctls_updn_ud_hpup = {
    name: 'updn_ud_hpup',
    do_U: do_up,
    do_D: do_down,
    isNG: do_cancel,
};
const ctls_updn_ud_hpdn = {
    name: 'updn_ud_hpdn',
    do_U: do_up,
    do_D: do_down,
    isNG: do_cancel,
};
function init_UD_mode() {
    global_for_maze_1.g_ctls.set(ctls_updn_up);
    global_for_maze_1.g_ctls.set(ctls_updn_dn);
    global_for_maze_1.g_ctls.set(ctls_updn_ud_hpup);
    global_for_maze_1.g_ctls.set(ctls_updn_ud_hpdn);
}
function act_Up_mode() {
    if (global_for_maze_1.g_team.walk().get_z() > 0) {
        global_for_maze_1.g_mvm.notice_message('上りテレポーターが有ります。登りますか？登る ⇒ 〇 登らない ⇒ ✖');
    }
    else {
        global_for_maze_1.g_mvm.notice_message('街に戻りますか？戻る ⇒ 〇 戻らない ⇒ ✖');
    }
    canUp = true;
    canDn = false;
    global_for_maze_1.g_ctls.act(ctls_updn_up);
    global_for_maze_1.g_vsw.view(global_for_maze_1.g_vsw.Move());
    setCanvas3DClick();
}
function act_Dn_mode() {
    global_for_maze_1.g_mvm.notice_message('下りテレポーターが有ります。降りますか？降りる ⇒ 〇 降りない ⇒ ✖');
    canUp = false;
    canDn = true;
    global_for_maze_1.g_ctls.act(ctls_updn_dn);
    global_for_maze_1.g_vsw.view(global_for_maze_1.g_vsw.Move());
}
function act_UD_mode() {
    global_for_maze_1.g_mvm.notice_message('上下テレポーターが有ります。登りますか？登る⇒ 〇 降りる ⇒ (↓キー) 移動しない ⇒ ✖');
    canUp = true;
    canDn = true;
    if (!isUp)
        global_for_maze_1.g_ctls.act(ctls_updn_ud_hpup);
    else
        global_for_maze_1.g_ctls.act(ctls_updn_ud_hpdn);
    global_for_maze_1.g_vsw.view(global_for_maze_1.g_vsw.Move());
}
function do_cancel() {
    global_for_maze_1.g_mvm.clear_message();
    (0, F_set_move_mode_1.act_move_mode)();
}
function do_up() {
    const rslt = global_for_maze_1.g_team.walk().hope_p_up();
    if (rslt.has_hope && rslt.subj.z < 0) {
        do_UD_save().then(() => __awaiter(this, void 0, void 0, function* () {
            return yield (0, F_load_and_save_1.tmp_save)();
        })).then(() => {
            const opt = new C_UrlOpt_1.C_UrlOpt();
            opt.set('mode', 'load');
            opt.set('pid', global_1.g_start_env.pid);
            opt.set('opt', 100);
            (0, F_POST_1.POST_and_move_page)(global_1.g_url[global_1.g_url_mai_guld], opt);
            return;
        });
        return;
    }
    if (!rslt.has_hope || !global_for_maze_1.g_maze.within(rslt.subj)) {
        rslt.doNG();
        global_for_maze_1.g_mvm.clear_message();
        (0, F_set_move_mode_1.act_move_mode)();
        (0, F_set_move_mode_1.do_move_bottom_half)('blink_off');
    }
    else {
        do_UD_save().then(() => {
            rslt.doOK();
            global_for_maze_1.g_mvm.clear_message();
            (0, F_set_move_mode_1.act_move_mode)();
            (0, F_set_move_mode_1.do_move_bottom_half)('blink_off');
        });
    }
}
function do_down() {
    const rslt = global_for_maze_1.g_team.walk().hope_p_down();
    if (!rslt.has_hope || !global_for_maze_1.g_maze.within(rslt.subj)) {
        rslt.doNG();
        global_for_maze_1.g_mvm.clear_message();
        (0, F_set_move_mode_1.act_move_mode)();
        (0, F_set_move_mode_1.do_move_bottom_half)('blink_off');
    }
    else {
        do_UD_save().then(() => {
            rslt.doOK();
            global_for_maze_1.g_mvm.clear_message();
            (0, F_set_move_mode_1.act_move_mode)();
            (0, F_set_move_mode_1.do_move_bottom_half)('blink_off');
        });
    }
}
function do_UD() {
    if (!canUp || !canDn)
        return;
    if (isUp)
        do_up();
    else
        do_down();
}
function hope_Up() {
    if (!canUp || !canDn)
        return;
    isUp = true;
    global_for_maze_1.g_ctls.act(ctls_updn_ud_hpdn);
    if (global_for_maze_1.g_team.walk().get_z() > 0) {
        global_for_maze_1.g_mvm.notice_message('登りますか？登る⇒ 〇 降りる ⇒ (↓キー) 移動しない ⇒ ✖');
    }
    else {
        global_for_maze_1.g_mvm.notice_message('街に戻りますか？戻る⇒ 〇 降りる ⇒ (↓キー) 移動しない ⇒ ✖');
    }
    ;
}
function hope_Down() {
    if (!canUp || !canDn)
        return;
    isUp = false;
    global_for_maze_1.g_ctls.act(ctls_updn_ud_hpup);
    global_for_maze_1.g_mvm.notice_message('降りますか？降りる⇒ 〇 登る ⇒ (↑キー) 移動しない ⇒ ✖');
}
function do_UD_save() {
    return __awaiter(this, void 0, void 0, function* () {
        (0, F_set_save_mode_1.set_g_save)(-1, -1, '自動保存データ', '', `『${global_for_maze_1.g_maze.get_name()}』 `
            + `地下 ${global_for_maze_1.g_team.walk().get_pd().z + 1}階層 `
            + `(X: ${global_for_maze_1.g_team.walk().get_pd().x}, Y: ${global_for_maze_1.g_team.get_pd().y})`, true);
        return (0, F_load_and_save_1.UD_save)();
    });
}
function setCanvas3DClick() {
    if ((global_for_maze_1.g_ds === null || global_for_maze_1.g_ds === void 0 ? void 0 : global_for_maze_1.g_ds.canvas) === null)
        return;
    global_for_maze_1.g_ds.canvas.onclick = canvas3Dclick;
}
function clrCanvas3DClick() {
    if ((global_for_maze_1.g_ds === null || global_for_maze_1.g_ds === void 0 ? void 0 : global_for_maze_1.g_ds.canvas) === null)
        return;
    global_for_maze_1.g_ds.canvas.onclick = () => { };
}
function canvas3Dclick(ev) {
    var _a, _b, _c, _d;
    if ((global_for_maze_1.g_ds === null || global_for_maze_1.g_ds === void 0 ? void 0 : global_for_maze_1.g_ds.canvas) === null)
        return;
    if (ev.target !== global_for_maze_1.g_ds.canvas)
        return;
    const cvs = global_for_maze_1.g_ds.canvas;
    const left_pane_r = cvs.clientWidth * 0.35;
    const rght_pane_l = cvs.clientWidth * 0.65;
    const back_pane_u = cvs.clientHeight * 0.50;
    if (ev.offsetX < left_pane_r) {
        (_a = document.getElementById('n_btn')) === null || _a === void 0 ? void 0 : _a.click();
        return;
    }
    if (ev.offsetX > rght_pane_l) {
        (_b = document.getElementById('y_btn')) === null || _b === void 0 ? void 0 : _b.click();
        return;
    }
    if (ev.offsetY < back_pane_u) {
        (_c = document.getElementById('u_arr')) === null || _c === void 0 ? void 0 : _c.click();
        return;
    }
    (_d = document.getElementById('d_arr')) === null || _d === void 0 ? void 0 : _d.click();
    return;
}


/***/ }),

/***/ "./src/mai_maze/F_set_menu_mode.ts":
/*!*****************************************!*\
  !*** ./src/mai_maze/F_set_menu_mode.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.init_menu_mode = init_menu_mode;
exports.act_menu_mode = act_menu_mode;
const C_CtlCursor_1 = __webpack_require__(/*! ../d_ctl/C_CtlCursor */ "./src/d_ctl/C_CtlCursor.ts");
const F_set_move_mode_1 = __webpack_require__(/*! ./F_set_move_mode */ "./src/mai_maze/F_set_move_mode.ts");
const F_set_save_mode_1 = __webpack_require__(/*! ./F_set_save_mode */ "./src/mai_maze/F_set_save_mode.ts");
const F_set_mvpt_mode_1 = __webpack_require__(/*! ./F_set_mvpt_mode */ "./src/mai_maze/F_set_mvpt_mode.ts");
const global_for_maze_1 = __webpack_require__(/*! ./global_for_maze */ "./src/mai_maze/global_for_maze.ts");
let dom_menu_list;
let menu_list_crsr;
let idx = 0;
const ctls_menu_nor = {
    name: 'menu_nor',
    do_U: do_U,
    do_D: do_D,
    isOK: isOK,
    isNG: isNG,
    isRT: isNG,
    cpRT: isNG,
};
function init_menu_mode() {
    init_view();
    init_ctls();
}
function act_menu_mode() {
    idx = 0;
    menu_list_crsr.set_pos(idx);
    global_for_maze_1.g_ctls.act(ctls_menu_nor);
    global_for_maze_1.g_vsw.view(global_for_maze_1.g_vsw.Menu());
}
function init_view() {
    try {
        const menu_list = document.getElementById('menu_list');
        for (var i = 0; i < menu_list.children.length; i++) {
            const item = menu_list.children[i];
            item.addEventListener("click", _OK_menu_Fnc, false);
        }
        dom_menu_list = document.getElementById('menu_list');
        menu_list_crsr = C_CtlCursor_1.C_CtlCursor.getObj(dom_menu_list);
    }
    catch (err) {
        alert('Error: ' + err);
        return false;
    }
    return true;
}
function _OK_menu_Fnc(e) {
    __isOK(this.id);
}
function init_ctls() {
    global_for_maze_1.g_ctls.set(ctls_menu_nor);
}
function isOK() {
    const menu_list = document.getElementById('menu_list');
    if (menu_list === null)
        return;
    const children = menu_list.children;
    if (idx < 0 || idx > children.length - 1)
        return;
    const li = children.item(idx);
    __isOK(li.id);
}
function __isOK(id) {
    switch (id) {
        case 'menu_load':
            do_load();
            return;
        case 'menu_save':
            do_save();
            return;
        case 'menu_mvpt':
            do_mvpt();
            return;
    }
}
function isNG() {
    global_for_maze_1.g_cvm.clear_message();
    (0, F_set_move_mode_1.act_move_mode)();
    (0, F_set_move_mode_1.do_move_bottom_half)('blink_off');
}
function do_U() {
    global_for_maze_1.g_cvm.clear_message();
    idx = menu_list_crsr.pos_U();
}
function do_D() {
    global_for_maze_1.g_cvm.clear_message();
    idx = menu_list_crsr.pos_D();
}
function do_load() {
    (0, F_set_save_mode_1.act_load_mode)();
}
function do_save() {
    (0, F_set_save_mode_1.act_save_mode)();
}
function do_mvpt() {
    (0, F_set_mvpt_mode_1.act_mvpt_mode)();
}


/***/ }),

/***/ "./src/mai_maze/F_set_mode.ts":
/*!************************************!*\
  !*** ./src/mai_maze/F_set_mode.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.init_all_mode = init_all_mode;
exports.hide_controlles = hide_controlles;
const F_set_move_mode_1 = __webpack_require__(/*! ./F_set_move_mode */ "./src/mai_maze/F_set_move_mode.ts");
const F_set_menu_mode_1 = __webpack_require__(/*! ./F_set_menu_mode */ "./src/mai_maze/F_set_menu_mode.ts");
const F_set_mvpt_mode_1 = __webpack_require__(/*! ./F_set_mvpt_mode */ "./src/mai_maze/F_set_mvpt_mode.ts");
const F_set_save_mode_1 = __webpack_require__(/*! ./F_set_save_mode */ "./src/mai_maze/F_set_save_mode.ts");
const F_set_UD_mode_1 = __webpack_require__(/*! ./F_set_UD_mode */ "./src/mai_maze/F_set_UD_mode.ts");
const global_for_maze_1 = __webpack_require__(/*! ./global_for_maze */ "./src/mai_maze/global_for_maze.ts");
function init_all_mode() {
    global_for_maze_1.g_ctls.deact();
    (0, F_set_move_mode_1.init_move_mode)();
    (0, F_set_menu_mode_1.init_menu_mode)();
    (0, F_set_mvpt_mode_1.init_mvpt_mode)();
    (0, F_set_save_mode_1.init_SL_mode)();
    (0, F_set_UD_mode_1.init_UD_mode)();
}
function hide_controlles() {
    global_for_maze_1.g_ctls.deact();
    const move_ctl_view = document.getElementById('pane_ctls_boad');
    move_ctl_view === null || move_ctl_view === void 0 ? void 0 : move_ctl_view.style.setProperty('display', 'none');
}


/***/ }),

/***/ "./src/mai_maze/F_set_move_mode.ts":
/*!*****************************************!*\
  !*** ./src/mai_maze/F_set_move_mode.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.init_move_mode = init_move_mode;
exports.act_move_mode = act_move_mode;
exports.do_instant_load = do_instant_load;
exports.do_instant_save = do_instant_save;
exports.do_move_bottom_half = do_move_bottom_half;
const T_MzKind_1 = __webpack_require__(/*! ../d_mdl/T_MzKind */ "./src/d_mdl/T_MzKind.ts");
const F_load_and_save_1 = __webpack_require__(/*! ../d_cmn/F_load_and_save */ "./src/d_cmn/F_load_and_save.ts");
const F_set_menu_mode_1 = __webpack_require__(/*! ./F_set_menu_mode */ "./src/mai_maze/F_set_menu_mode.ts");
const F_set_UD_mode_1 = __webpack_require__(/*! ./F_set_UD_mode */ "./src/mai_maze/F_set_UD_mode.ts");
const F_set_save_mode_1 = __webpack_require__(/*! ./F_set_save_mode */ "./src/mai_maze/F_set_save_mode.ts");
const F_display_mazeCh_1 = __webpack_require__(/*! ./F_display_mazeCh */ "./src/mai_maze/F_display_mazeCh.ts");
const F_display_maze3D_1 = __webpack_require__(/*! ./F_display_maze3D */ "./src/mai_maze/F_display_maze3D.ts");
const global_for_maze_1 = __webpack_require__(/*! ./global_for_maze */ "./src/mai_maze/global_for_maze.ts");
const ctls_move_nor = {
    name: 'move_nor',
    do_U: go_F,
    do_D: go_B,
    doUL: go_L,
    doUR: go_R,
    do_L: tr_L,
    do_R: tr_R,
    menu: menu,
};
function init_move_mode() {
    global_for_maze_1.g_ctls.set(ctls_move_nor);
}
function act_move_mode() {
    global_for_maze_1.g_ctls.act(ctls_move_nor);
    global_for_maze_1.g_vsw.view(global_for_maze_1.g_vsw.Move());
    setCanvas3DClick();
}
function do_instant_load() {
    (0, F_load_and_save_1.instant_load)().then((jsonObj) => {
        (0, F_set_save_mode_1.decode_all)(jsonObj === null || jsonObj === void 0 ? void 0 : jsonObj.save);
        (0, global_for_maze_1.do_load_bottom_half)('ロードしました');
    });
}
function do_instant_save() {
    (0, F_set_save_mode_1.set_g_save)(-1, -1, '簡易保存データ', '', `『${global_for_maze_1.g_maze.get_name()}』 `
        + `地下 ${global_for_maze_1.g_team.get_pd().z + 1}階層 `
        + `(X: ${global_for_maze_1.g_team.get_pd().x}, Y: ${global_for_maze_1.g_team.get_pd().y})`, true);
    (0, F_load_and_save_1.instant_save)();
}
function clear_mask_around_the_team() {
    global_for_maze_1.g_maze.clear_mask_around_the_team(global_for_maze_1.g_team);
}
function change_unexp_to_floor(p) {
    global_for_maze_1.g_maze.change_unexp_to_floor(p);
}
function go_F() {
    const rslt = global_for_maze_1.g_team.walk().hope_p_fwd();
    move_check(rslt);
    do_move_bottom_half('blink_on');
}
function go_B() {
    const rslt = global_for_maze_1.g_team.walk().hope_p_bak();
    move_check(rslt);
    do_move_bottom_half('blink_on');
}
function go_L() {
    const rslt = global_for_maze_1.g_team.walk().hope_p_lft();
    move_check(rslt);
    do_move_bottom_half('blink_on');
}
function go_R() {
    const rslt = global_for_maze_1.g_team.walk().hope_p_rgt();
    move_check(rslt);
    do_move_bottom_half('blink_on');
}
function tr_R() {
    const rslt = global_for_maze_1.g_team.walk().hope_turn_r();
    move_check(rslt);
    do_move_bottom_half('blink_off');
}
function tr_L() {
    const rslt = global_for_maze_1.g_team.walk().hope_turn_l();
    move_check(rslt);
    do_move_bottom_half('blink_off');
}
function move_check(r) {
    global_for_maze_1.g_mvm.clear_message();
    around_obj(r);
    if (!r.has_hope)
        return;
    if (r.hope == 'Turn') {
        r.doOK();
        return;
    }
    if (r.hope == 'Move') {
        const cell = global_for_maze_1.g_maze.get_cell(r.subj);
        if (!(cell === null || cell === void 0 ? void 0 : cell.getObj().canThrough())) {
            dont_move(r);
            return;
        }
        const obj = global_for_maze_1.g_maze.get_obj(r.subj);
        if (obj !== null) {
            if (obj.canThrough()) {
                r.doOK();
                action_obj();
            }
            else {
                dont_move(r);
                around_obj(r);
                return;
            }
        }
        else {
            r.doOK();
        }
        const kind = cell === null || cell === void 0 ? void 0 : cell.getKind();
        switch (kind) {
            case T_MzKind_1.T_MzKind.StrUp:
            case T_MzKind_1.T_MzKind.StrDn:
            case T_MzKind_1.T_MzKind.StrUD:
                do_stairs_motion(kind);
        }
        return;
    }
}
function dont_move(r) {
    global_for_maze_1.g_mvm.normal_message('進めない！（笑）');
    r.doNG();
    return;
}
function around_obj(r) { }
function action_obj() { }
function do_move_bottom_half(blink_mode) {
    change_unexp_to_floor(global_for_maze_1.g_team.get_pd());
    (0, F_display_maze3D_1.display_maze3D)();
    display_maze_name();
    if (blink_mode === 'blink_on')
        (0, F_display_maze3D_1.maze3D_blink_on_direction)();
    else
        (0, F_display_maze3D_1.maze3D_blink_off_direction)();
    if (!mask_cleared()) {
        clear_mask_around_the_team();
        if (mask_cleared())
            alert('この階を制覇しました！！');
    }
    (0, F_display_mazeCh_1.display_mazeCh)();
}
function mask_cleared() { return global_for_maze_1.g_maze.is_cleared(global_for_maze_1.g_team.get_pd()); }
function display_maze_name() {
    try {
        const p = document.getElementById('maze_view3D_maze_name_info');
        p.innerHTML = global_for_maze_1.g_maze.get_name();
    }
    catch (err) { }
    ;
}
function setCanvas3DClick() {
    if ((global_for_maze_1.g_ds === null || global_for_maze_1.g_ds === void 0 ? void 0 : global_for_maze_1.g_ds.canvas) === null)
        return;
    global_for_maze_1.g_ds.canvas.onclick = canvas3Dclick;
}
function clrCanvas3DClick() {
    if ((global_for_maze_1.g_ds === null || global_for_maze_1.g_ds === void 0 ? void 0 : global_for_maze_1.g_ds.canvas) === null)
        return;
    global_for_maze_1.g_ds.canvas.onclick = () => { };
}
function canvas3Dclick(ev) {
    var _a, _b, _c, _d;
    if ((global_for_maze_1.g_ds === null || global_for_maze_1.g_ds === void 0 ? void 0 : global_for_maze_1.g_ds.canvas) === null)
        return;
    if (ev.target !== global_for_maze_1.g_ds.canvas)
        return;
    const cvs = global_for_maze_1.g_ds.canvas;
    const left_pane_r = cvs.clientWidth * 0.25;
    const rght_pane_l = cvs.clientWidth * 0.75;
    const back_pane_u = cvs.clientHeight * 0.80;
    if (ev.offsetX < left_pane_r) {
        (_a = document.getElementById('l_arr')) === null || _a === void 0 ? void 0 : _a.click();
        return;
    }
    if (ev.offsetX > rght_pane_l) {
        (_b = document.getElementById('r_arr')) === null || _b === void 0 ? void 0 : _b.click();
        return;
    }
    if (ev.offsetY < back_pane_u) {
        (_c = document.getElementById('u_arr')) === null || _c === void 0 ? void 0 : _c.click();
        return;
    }
    (_d = document.getElementById('d_arr')) === null || _d === void 0 ? void 0 : _d.click();
    return;
}
function do_stairs_motion(kind) {
    switch (kind) {
        case T_MzKind_1.T_MzKind.StrUp:
            clrCanvas3DClick();
            (0, F_set_UD_mode_1.act_Up_mode)();
            break;
        case T_MzKind_1.T_MzKind.StrDn:
            clrCanvas3DClick();
            (0, F_set_UD_mode_1.act_Dn_mode)();
            break;
        case T_MzKind_1.T_MzKind.StrUD:
            clrCanvas3DClick();
            (0, F_set_UD_mode_1.act_UD_mode)();
            break;
    }
}
function menu() {
    clrCanvas3DClick();
    global_for_maze_1.g_mvm.clear_message();
    (0, F_set_menu_mode_1.act_menu_mode)();
}


/***/ }),

/***/ "./src/mai_maze/F_set_mvpt_mode.ts":
/*!*****************************************!*\
  !*** ./src/mai_maze/F_set_mvpt_mode.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.init_mvpt_mode = init_mvpt_mode;
exports.act_mvpt_mode = act_mvpt_mode;
const F_set_menu_mode_1 = __webpack_require__(/*! ./F_set_menu_mode */ "./src/mai_maze/F_set_menu_mode.ts");
const global_for_maze_1 = __webpack_require__(/*! ./global_for_maze */ "./src/mai_maze/global_for_maze.ts");
const C_UrlOpt_1 = __webpack_require__(/*! ../d_utl/C_UrlOpt */ "./src/d_utl/C_UrlOpt.ts");
const F_load_and_save_1 = __webpack_require__(/*! ../d_cmn/F_load_and_save */ "./src/d_cmn/F_load_and_save.ts");
const F_POST_1 = __webpack_require__(/*! ../d_cmn/F_POST */ "./src/d_cmn/F_POST.ts");
const global_1 = __webpack_require__(/*! ../d_cmn/global */ "./src/d_cmn/global.ts");
let mode;
const ctls_mvpt_nor = {
    name: 'mvpt_nor',
    isOK: isOK,
    isNG: isNG,
    cpOK: isOK,
    cpNG: isNG,
};
function init_mvpt_mode() {
    global_for_maze_1.g_ctls.set(ctls_mvpt_nor);
}
function act_mvpt_mode() {
    mode = 'chek';
    global_for_maze_1.g_cvm.notice_message('本当に街へ戻りますか？この場所にはギルドから復帰できます');
    global_for_maze_1.g_ctls.act(ctls_mvpt_nor);
    global_for_maze_1.g_vsw.view(global_for_maze_1.g_vsw.MvPt());
}
function isOK() {
    switch (mode) {
        case 'view':
            global_for_maze_1.g_cvm.notice_message('本当に街へ戻りますか？この場所にはギルドから復帰できます');
            mode = 'chek';
            break;
        case 'chek':
            global_for_maze_1.g_cvm.notice_message('街へ戻りました');
            mode = 'view';
            const mvpt = global_for_maze_1.g_team.get_loc().clone();
            mvpt.set_url(global_1.g_my_url);
            mvpt.set_tid(global_for_maze_1.g_team.uid());
            mvpt.set_uid(global_for_maze_1.g_maze.uid());
            global_1.g_save.all_mvpt[mvpt.uid()] = mvpt;
            global_1.g_save.all_maze[global_for_maze_1.g_maze.uid()] = global_for_maze_1.g_maze;
            (0, F_load_and_save_1.tmp_save)().then(() => {
                const opt = new C_UrlOpt_1.C_UrlOpt();
                opt.set('mode', 'load');
                opt.set('pid', global_1.g_start_env.pid);
                opt.set('opt', 100);
                (0, F_POST_1.POST_and_move_page)(global_1.g_url[global_1.g_url_mai_guld], opt);
                return;
            });
            break;
    }
}
function isNG() {
    switch (mode) {
        case 'chek':
            global_for_maze_1.g_cvm.clear_message();
            (0, F_set_menu_mode_1.act_menu_mode)();
            break;
    }
}


/***/ }),

/***/ "./src/mai_maze/F_set_save_mode.ts":
/*!*****************************************!*\
  !*** ./src/mai_maze/F_set_save_mode.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.init_SL_mode = init_SL_mode;
exports.act_load_mode = act_load_mode;
exports.act_save_mode = act_save_mode;
exports.display_save_list = display_save_list;
exports.decode_all = decode_all;
exports.decode_maze = decode_maze;
exports.set_g_save = set_g_save;
const C_UrlOpt_1 = __webpack_require__(/*! ../d_utl/C_UrlOpt */ "./src/d_utl/C_UrlOpt.ts");
const C_Location_1 = __webpack_require__(/*! ../d_mdl/C_Location */ "./src/d_mdl/C_Location.ts");
const C_PointDir_1 = __webpack_require__(/*! ../d_mdl/C_PointDir */ "./src/d_mdl/C_PointDir.ts");
const C_CtlCursor_1 = __webpack_require__(/*! ../d_ctl/C_CtlCursor */ "./src/d_ctl/C_CtlCursor.ts");
const F_POST_1 = __webpack_require__(/*! ../d_cmn/F_POST */ "./src/d_cmn/F_POST.ts");
const F_load_and_save_1 = __webpack_require__(/*! ../d_cmn/F_load_and_save */ "./src/d_cmn/F_load_and_save.ts");
const global_1 = __webpack_require__(/*! ../d_cmn/global */ "./src/d_cmn/global.ts");
const F_set_menu_mode_1 = __webpack_require__(/*! ./F_set_menu_mode */ "./src/mai_maze/F_set_menu_mode.ts");
const F_set_move_mode_1 = __webpack_require__(/*! ./F_set_move_mode */ "./src/mai_maze/F_set_move_mode.ts");
const global_for_maze_1 = __webpack_require__(/*! ./global_for_maze */ "./src/mai_maze/global_for_maze.ts");
const C_SaveInfo_1 = __webpack_require__(/*! ../d_mdl/C_SaveInfo */ "./src/d_mdl/C_SaveInfo.ts");
let for_save = false;
let UL_idx = 0;
let UL_bak = 999;
let save_UL_list;
let UL_list_crsr;
let UL_list_leng;
let UL_to_Data;
let form_id;
let form_time;
let form_detail;
let form_point;
let is_kakunin = false;
let save_list;
const save_list_max = 20;
const ctls_load_rtn = {
    name: 'load_rtn',
    isNG: go_back_menu_mode,
    isRT: go_back_menu_mode,
    cpRT: go_back_menu_mode,
};
const ctls_load_nor = {
    name: 'load_nor',
    do_U: do_U,
    do_D: do_D,
    do_L: do_L,
    do_R: do_R,
    isOK: check_load,
    cpOK: check_load,
    isNG: go_back_menu_mode,
    isRT: go_back_menu_mode,
    cpRT: go_back_menu_mode,
};
const ctls_load_chk = {
    name: 'load_chk',
    do_U: do_U,
    do_D: do_D,
    do_L: do_L,
    do_R: do_R,
    isOK: isOK_for_load,
    cpOK: isOK_for_load,
    isNG: isNG_for_load,
    cpNG: isNG_for_load,
    isRT: go_back_menu_mode,
    cpRT: go_back_menu_mode,
};
const ctls_save_nor = {
    name: 'save_nor',
    do_U: do_U,
    do_D: do_D,
    do_L: do_L,
    do_R: do_R,
    isOK: check_save,
    cpOK: check_save,
    isNG: go_back_menu_mode,
    isRT: go_back_menu_mode,
    cpRT: go_back_menu_mode,
};
const ctls_save_chk = {
    name: 'save_chk',
    do_U: do_U,
    do_D: do_D,
    do_L: do_L,
    do_R: do_R,
    isOK: isOK_for_save,
    cpOK: isOK_for_save,
    isNG: isNG_for_save,
    cpNG: isNG_for_save,
    isRT: go_back_menu_mode,
    cpRT: go_back_menu_mode,
};
function init_SL_mode() {
    init_view();
    init_ctls();
}
function act_load_mode() {
    __set_data(false).then(() => {
        if (!exist_save_list()) {
            hide_load_fields();
            global_for_maze_1.g_cvm.notice_message('ロードできるデータが有りません');
            global_for_maze_1.g_ctls.act(ctls_load_rtn);
            global_for_maze_1.g_vsw.view(global_for_maze_1.g_vsw.Move());
            return;
        }
        else {
            show_load_fields();
            display_message();
            global_for_maze_1.g_ctls.act(ctls_load_nor);
            global_for_maze_1.g_vsw.view(global_for_maze_1.g_vsw.LdSv());
        }
    });
}
function act_save_mode() {
    __set_data(true).then(() => {
        display_message();
        global_for_maze_1.g_ctls.act(ctls_save_nor);
        global_for_maze_1.g_vsw.view(global_for_maze_1.g_vsw.LdSv());
    });
}
function __set_data(_for_save) {
    return __awaiter(this, void 0, void 0, function* () {
        for_save = _for_save;
        global_for_maze_1.g_cvm.clear_message();
        is_kakunin = false;
        yield display_save_list();
    });
}
function hide_load_fields() {
    var _a, _b;
    (_a = document.getElementById('ldsv_data_list')) === null || _a === void 0 ? void 0 : _a.style.setProperty('display', 'none');
    (_b = document.getElementById('ldsv_data_fields')) === null || _b === void 0 ? void 0 : _b.style.setProperty('display', 'none');
}
function show_load_fields() {
    var _a, _b;
    (_a = document.getElementById('ldsv_data_list')) === null || _a === void 0 ? void 0 : _a.style.setProperty('display', 'block');
    (_b = document.getElementById('ldsv_data_fields')) === null || _b === void 0 ? void 0 : _b.style.setProperty('display', 'block');
}
function init_data() { }
function init_view() { }
function init_ctls() {
    is_kakunin = false;
    UL_bak = 999;
    global_for_maze_1.g_ctls.set(ctls_load_rtn);
    global_for_maze_1.g_ctls.set(ctls_load_nor);
    global_for_maze_1.g_ctls.set(ctls_load_chk);
    global_for_maze_1.g_ctls.set(ctls_save_nor);
    global_for_maze_1.g_ctls.set(ctls_save_chk);
}
function isOK_for_load() {
    if (save_UL_list === null)
        return;
    if (UL_idx < 0 || UL_idx > UL_list_leng - 1)
        return;
    load();
}
function isOK_for_save() {
    if (save_UL_list === null)
        return;
    if (UL_idx < 0 || UL_idx > UL_list_leng - 1)
        return;
    save();
}
function isNG_for_load() {
    _isNG_(ctls_load_nor);
}
function isNG_for_save() {
    _isNG_(ctls_save_nor);
}
function _isNG_(ctls) {
    if (!is_kakunin) {
        global_for_maze_1.g_cvm.clear_message();
        go_back_menu_mode();
    }
    else {
        is_kakunin = false;
        global_for_maze_1.g_ctls.act(ctls);
        display_message();
    }
}
function go_back_menu_mode() {
    global_for_maze_1.g_cvm.clear_message();
    (0, F_set_menu_mode_1.act_menu_mode)();
}
function go_back_move_mode() {
    (0, F_set_move_mode_1.act_move_mode)();
    (0, F_set_move_mode_1.do_move_bottom_half)('blink_off');
}
function do_U() {
    display_message();
    UL_idx = UL_list_crsr.pos_U();
    form_set();
}
function do_D() {
    display_message();
    UL_idx = UL_list_crsr.pos_D();
    form_set();
}
function do_L() {
    display_message();
    UL_idx = UL_list_crsr.pos_L();
    form_set();
}
function do_R() {
    display_message();
    UL_idx = UL_list_crsr.pos_R();
    form_set();
}
function form_clr() {
    if (UL_idx < 0 || UL_idx > UL_list_leng - 1)
        return;
    form_id.value = '-1';
    form_time.innerText = '';
    form_point.innerText = '';
    if (form_detail.hasAttribute('readonly')) {
        form_detail.removeAttribute('readonly');
        form_detail.value = '';
        form_detail.setAttribute('readonly', 'readonly');
    }
    else {
        form_detail.value = '';
    }
}
function form_set() {
    var _a;
    if (UL_idx < 0 || UL_idx > UL_list_leng - 1)
        return;
    form_clr();
    const data_idx = UL_to_Data[UL_idx];
    form_id.value = save_list[data_idx].save_id.toString();
    form_time.innerText = (_a = save_list[data_idx].save_time) === null || _a === void 0 ? void 0 : _a.toISOString();
    form_point.innerText = save_list[data_idx].point;
    if (form_detail.hasAttribute('readonly')) {
        form_detail.removeAttribute('readonly');
        form_detail.value = save_list[data_idx].detail;
        form_detail.setAttribute('readonly', 'readonly');
    }
    else {
        form_detail.value = save_list[data_idx].detail;
    }
}
function display_save_list() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const data_list = 'ldsv_data_list';
        const data_id = 'ldsv_data_id';
        const data_time = 'ldsv_data_time';
        const data_detail = 'ldsv_data_detail';
        const data_point = 'ldsv_data_point';
        yield ((_a = (0, F_load_and_save_1.get_save_info)()) === null || _a === void 0 ? void 0 : _a.then(jsonObj => {
            if (jsonObj === null || jsonObj === undefined) {
                global_1.g_mes.warning_message('セーブ情報の受信に失敗しました。【受信データ無し】');
                return undefined;
            }
            if (jsonObj.ecode !== 0) {
                global_1.g_mes.warning_message(`『${jsonObj.emsg}』(${jsonObj.ecode})`);
                global_1.g_mes.warning_message('セーブ情報の受信に失敗しました。');
                return undefined;
            }
            try {
                save_list = {};
                for (let save_info of jsonObj.save_info) {
                    save_list[save_info.uniq_no] = new C_SaveInfo_1.C_SaveInfo(save_info);
                }
                if (for_save) {
                    for (let uniq_no_cnt = 0; uniq_no_cnt < save_list_max; uniq_no_cnt++) {
                        if (uniq_no_cnt in save_list)
                            continue;
                        save_list[uniq_no_cnt] = new C_SaveInfo_1.C_SaveInfo({
                            save_id: -1,
                            uniq_no: uniq_no_cnt,
                            title: `新規保存#${uniq_no_cnt.toString().padStart(2, '0')}`,
                            detail: '',
                            point: '',
                            save_time: undefined,
                            auto_mode: '0',
                        });
                    }
                }
                save_UL_list = document.getElementById(data_list);
                if (save_UL_list === null) {
                    alert('Can not find the Dom of Save List!');
                    return;
                }
                while (save_UL_list.firstChild !== null) {
                    save_UL_list.removeChild(save_UL_list.firstChild);
                }
                let UL_list_idx = 0;
                UL_to_Data = {};
                for (let data_idx in save_list) {
                    if (save_list[data_idx].auto_mode) {
                        if (for_save)
                            continue;
                        switch (save_list[data_idx].uniq_no) {
                            case 100:
                                save_list[data_idx].title = '自動保存分';
                                save_list[data_idx].detail = '作業用に簡易保存したデータです';
                                continue;
                            case 101:
                                save_list[data_idx].title = '簡易保存分';
                                save_list[data_idx].detail = 'デバッグモードで簡易保存したデータです';
                                break;
                            case 102:
                                save_list[data_idx].title = '階段直前分';
                                save_list[data_idx].detail = '一番最近のフロア移動直前に自動保存したデータです';
                                break;
                            case 103:
                                save_list[data_idx].title = 'ｲﾍﾞﾝﾄ直前分';
                                save_list[data_idx].detail = 'イベント(失敗)直前に簡易保存したデータです';
                                break;
                        }
                    }
                    const li = document.createElement('li');
                    li.innerHTML = `『${save_list[data_idx].title}』`;
                    li.id = UL_list_idx.toString();
                    li.addEventListener("click", for_save ? _OK_save_Fnc : _OK_load_Fnc, false);
                    save_UL_list.appendChild(li);
                    UL_to_Data[UL_list_idx++] = Number(data_idx);
                }
                UL_list_crsr = C_CtlCursor_1.C_CtlCursor.getObj(save_UL_list);
                UL_list_leng = save_UL_list.children.length;
                form_id = document.getElementById(data_id);
                form_time = document.getElementById(data_time);
                form_detail = document.getElementById(data_detail);
                form_point = document.getElementById(data_point);
                if (!exist_save_list())
                    return;
                UL_idx = 0;
                UL_list_crsr.set_pos(UL_idx);
                form_set();
                return;
            }
            catch (err) {
                global_1.g_mes.warning_message(err);
                global_1.g_mes.warning_message('セーブ情報の受信に失敗しました。【データ不一致】');
                return;
            }
        }));
    });
}
function _OK_load_Fnc(e) {
    UL_idx = Number(this.id);
    if (UL_idx !== UL_bak) {
        UL_bak = UL_idx;
        is_kakunin = false;
    }
    if (is_kakunin)
        isOK_for_load();
    else
        check_load();
    UL_list_crsr.set_pos(UL_idx);
    form_set();
}
function _OK_save_Fnc(e) {
    UL_idx = Number(this.id);
    if (UL_idx !== UL_bak) {
        UL_bak = UL_idx;
        is_kakunin = false;
    }
    if (is_kakunin)
        isOK_for_save();
    else
        check_save();
    UL_list_crsr.set_pos(UL_idx);
    form_set();
}
function exist_save_list() {
    return save_UL_list.children.length > 0;
}
function check_load() {
    const data_idx = UL_to_Data[UL_idx];
    if (UL_idx < 0 || UL_idx > UL_list_leng - 1) {
        global_1.g_mes.warning_message(`check!! No longer access idx!『${save_list[data_idx].title}』(save_id: ${save_list[data_idx].save_id})`);
    }
    is_kakunin = true;
    global_for_maze_1.g_ctls.act(ctls_load_chk);
    display_message();
}
function check_save() {
    const data_idx = UL_to_Data[UL_idx];
    if (UL_idx < 0 || UL_idx > UL_list_leng - 1) {
        global_1.g_mes.warning_message(`check!! No longer access idx!『${save_list[data_idx].title}』(save_id: ${save_list[data_idx].save_id})`);
    }
    if (save_list[data_idx].auto_mode) {
        global_1.g_mes.warning_message(`check!! This is Auto Mode!『${save_list[data_idx].title}』(save_id: ${save_list[data_idx].save_id})`);
    }
    is_kakunin = true;
    global_for_maze_1.g_ctls.act(ctls_save_chk);
    display_message();
}
function display_message() {
    if (for_save) {
        if (is_kakunin) {
            if (UL_to_Data[UL_idx] === undefined) {
                global_for_maze_1.g_cvm.notice_message('これに保存しますか？');
            }
            else {
                global_for_maze_1.g_cvm.notice_message('これに上書保存しますか？以前のデータは消去されます');
            }
        }
        else {
            global_for_maze_1.g_cvm.normal_message('どれに保存しますか？');
        }
    }
    else {
        if (is_kakunin) {
            global_for_maze_1.g_cvm.notice_message('ロードしますか？');
        }
        else {
            global_for_maze_1.g_cvm.normal_message('どれをロードしますか？');
        }
    }
}
function load() {
    const data_idx = UL_to_Data[UL_idx];
    if (save_list[data_idx].mypos.url() !== '' && save_list[data_idx].mypos.url() != global_1.g_my_url) {
        _load_other(data_idx);
        return;
    }
    _load_here(data_idx);
    return;
}
function _load_other(data_idx) {
    const opt = new C_UrlOpt_1.C_UrlOpt();
    opt.set('mode', 'load');
    opt.set('pid', global_1.g_start_env.pid);
    opt.set('opt', save_list[data_idx].uniq_no.toString());
    (0, F_POST_1.POST_and_move_page)(save_list[data_idx].mypos.url(), opt);
    return;
}
function _load_here(data_idx) {
    global_1.g_start_env.pid = save_list[data_idx].player_id;
    (0, F_load_and_save_1.general_load)(save_list[data_idx].uniq_no).then((jsonObj) => {
        is_kakunin = false;
        decode_all(jsonObj === null || jsonObj === void 0 ? void 0 : jsonObj.save);
        global_for_maze_1.g_mvm.notice_message('ロードしました');
        go_back_move_mode();
    });
}
function save() {
    return __awaiter(this, void 0, void 0, function* () {
        const data_idx = UL_to_Data[UL_idx];
        set_g_save(save_list[data_idx].save_id, save_list[data_idx].uniq_no, `保存済: #${data_idx.toString().padStart(2, '0')}`, form_detail.value, `『${global_for_maze_1.g_maze.get_name()}』 `
            + `地下 ${global_for_maze_1.g_team.get_pd().z + 1}階層 `
            + `(X: ${global_for_maze_1.g_team.get_pd().x}, Y: ${global_for_maze_1.g_team.get_pd().y})`, false);
        (0, F_load_and_save_1.general_save)().then((jsonObj) => {
            decode_all(jsonObj);
            is_kakunin = false;
            global_for_maze_1.g_mvm.notice_message('保存しました');
            go_back_move_mode();
        });
    });
}
function decode_all(jsonObj) {
    var _a;
    if (jsonObj === undefined)
        return;
    global_1.g_save.decode(jsonObj);
    global_1.g_save.mypos.set_url(global_1.g_my_url);
    global_for_maze_1.g_team.decode(global_1.g_save.all_team[(_a = global_1.g_save.mypos.tid()) !== null && _a !== void 0 ? _a : ''].encode());
    global_for_maze_1.g_team.set_loc(global_1.g_save.mypos);
    const loc = global_for_maze_1.g_team.get_loc();
    if (loc.get_lckd() == C_Location_1.T_Lckd.Maze) {
        global_for_maze_1.g_maze.decode(global_1.g_save.all_maze[loc.get_uid()].encode());
    }
    for (const i in global_for_maze_1.g_hres)
        delete global_for_maze_1.g_hres[i];
    for (const hero of global_for_maze_1.g_team.hres())
        global_for_maze_1.g_hres.push(hero);
    global_for_maze_1.g_maze.add_obj(global_for_maze_1.g_team);
}
function decode_maze(jsonObj) {
    var _a, _b, _c, _d;
    if ((jsonObj === null || jsonObj === void 0 ? void 0 : jsonObj.maze) !== undefined)
        global_for_maze_1.g_maze.decode(jsonObj.maze);
    if ((jsonObj === null || jsonObj === void 0 ? void 0 : jsonObj.pos) !== undefined) {
        let pos = new C_PointDir_1.C_PointDir({
            x: (_a = jsonObj.pos) === null || _a === void 0 ? void 0 : _a.x,
            y: (_b = jsonObj.pos) === null || _b === void 0 ? void 0 : _b.y,
            z: (_c = jsonObj.pos) === null || _c === void 0 ? void 0 : _c.z,
            d: (_d = jsonObj.pos) === null || _d === void 0 ? void 0 : _d.d,
        });
        global_for_maze_1.g_team.walk().set_place(global_for_maze_1.g_maze, global_1.g_my_url, pos);
        global_1.g_save.mypos = global_for_maze_1.g_team.get_loc();
    }
    for (const i in global_for_maze_1.g_hres)
        delete global_for_maze_1.g_hres[i];
    for (const hero of global_for_maze_1.g_team.hres())
        global_for_maze_1.g_hres.push(hero);
    global_for_maze_1.g_maze.add_obj(global_for_maze_1.g_team);
    global_1.g_save.mypos = global_for_maze_1.g_team.get_loc();
    global_1.g_save.all_maze[global_for_maze_1.g_maze.uid()] = global_for_maze_1.g_maze;
    global_1.g_save.all_team[global_for_maze_1.g_team.uid()] = global_for_maze_1.g_team;
}
function set_g_save(save_id, uniq_no, title, detail, point, auto_mode) {
    global_1.g_save.mypos = global_for_maze_1.g_team.get_loc();
    global_1.g_save.all_team[global_for_maze_1.g_team.uid()] = global_for_maze_1.g_team;
    global_1.g_save.all_maze[global_for_maze_1.g_maze.uid()] = global_for_maze_1.g_maze;
    global_1.g_save.decode({
        save_id: save_id,
        player_id: global_1.g_start_env.pid,
        uniq_no: uniq_no,
        title: title,
        detail: detail,
        point: point,
        auto_mode: auto_mode ? '1' : '0',
        is_active: '1',
        is_delete: '0',
    });
}


/***/ }),

/***/ "./src/mai_maze/global_for_maze.ts":
/*!*****************************************!*\
  !*** ./src/mai_maze/global_for_maze.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.g_ctls = exports.g_guld = exports.g_team = exports.g_maze = exports.g_hres = exports.g_cvm = exports.g_mvm = exports.g_vsw = exports.g_ds = exports.g_ctls_mode = void 0;
exports.init_before_games = init_before_games;
exports.init_before_new_games = init_before_new_games;
exports.do_load_bottom_half = do_load_bottom_half;
exports.init_after_loaded_DOM = init_after_loaded_DOM;
exports.init_debug_mode = init_debug_mode;
exports.g_ctls_mode = new Array(1);
const F_display_mazeCh_1 = __webpack_require__(/*! ./F_display_mazeCh */ "./src/mai_maze/F_display_mazeCh.ts");
const F_display_maze3D_1 = __webpack_require__(/*! ./F_display_maze3D */ "./src/mai_maze/F_display_maze3D.ts");
exports.g_ds = { canvas: null, con: null, depth: 0, wall: null };
const C_SwitchView_1 = __webpack_require__(/*! ./C_SwitchView */ "./src/mai_maze/C_SwitchView.ts");
const C_OneLineViewMessage_1 = __webpack_require__(/*! ../d_vie/C_OneLineViewMessage */ "./src/d_vie/C_OneLineViewMessage.ts");
exports.g_hres = [];
const C_Maze_1 = __webpack_require__(/*! ../d_mdl/C_Maze */ "./src/d_mdl/C_Maze.ts");
exports.g_maze = new C_Maze_1.C_Maze();
const C_Team_1 = __webpack_require__(/*! ../d_mdl/C_Team */ "./src/d_mdl/C_Team.ts");
exports.g_team = new C_Team_1.C_Team();
const C_Guild_1 = __webpack_require__(/*! ../d_mdl/C_Guild */ "./src/d_mdl/C_Guild.ts");
exports.g_guld = new C_Guild_1.C_Guild();
const C_DefaultCtls_1 = __webpack_require__(/*! ./C_DefaultCtls */ "./src/mai_maze/C_DefaultCtls.ts");
const F_set_mode_1 = __webpack_require__(/*! ./F_set_mode */ "./src/mai_maze/F_set_mode.ts");
const F_set_save_mode_1 = __webpack_require__(/*! ./F_set_save_mode */ "./src/mai_maze/F_set_save_mode.ts");
const F_set_move_mode_1 = __webpack_require__(/*! ./F_set_move_mode */ "./src/mai_maze/F_set_move_mode.ts");
const F_load_and_save_1 = __webpack_require__(/*! ../d_cmn/F_load_and_save */ "./src/d_cmn/F_load_and_save.ts");
const global_1 = __webpack_require__(/*! ../d_cmn/global */ "./src/d_cmn/global.ts");
const F_Rand_1 = __webpack_require__(/*! ../d_utl/F_Rand */ "./src/d_utl/F_Rand.ts");
const C_MazeObj_1 = __webpack_require__(/*! ../d_mdl/C_MazeObj */ "./src/d_mdl/C_MazeObj.ts");
function init_before_games() {
    switch (global_1.g_start_env.mode) {
        case 'new':
            init_before_new_games();
            return;
        case 'load':
            init_before_load_games();
            return;
        case 'start':
            init_before_start_games();
            return;
        case 'mvpt':
            init_before_mvpt_games();
            return;
    }
}
function init_before_new_games() {
    (0, F_load_and_save_1.get_mai_maze)().then((jsonObj) => {
        (0, F_set_save_mode_1.decode_all)(jsonObj === null || jsonObj === void 0 ? void 0 : jsonObj.save);
        install_objs(5);
        do_load_bottom_half('');
    });
}
function init_before_load_games() {
    const uno = Number(global_1.g_start_env.opt);
    (0, F_load_and_save_1.general_load)(uno).then((jsonObj) => {
        (0, F_set_save_mode_1.decode_all)(jsonObj === null || jsonObj === void 0 ? void 0 : jsonObj.save);
        do_load_bottom_half('ロードしました');
    });
}
function init_before_start_games() {
    const maze_name = global_1.g_start_env.opt;
    (0, F_load_and_save_1.tmp_load)().then((jsonObj) => {
        (0, F_set_save_mode_1.decode_all)(jsonObj === null || jsonObj === void 0 ? void 0 : jsonObj.save);
        (0, F_load_and_save_1.get_new_maze)(maze_name).then((jsonObj) => {
            (0, F_set_save_mode_1.decode_maze)(jsonObj === null || jsonObj === void 0 ? void 0 : jsonObj.data);
            do_load_bottom_half('冒険を始めましょう！');
        });
    });
}
function init_before_mvpt_games() {
    (0, F_load_and_save_1.tmp_load)().then((jsonObj) => {
        (0, F_set_save_mode_1.decode_all)(jsonObj === null || jsonObj === void 0 ? void 0 : jsonObj.save);
        do_load_bottom_half('冒険を再開しましょう！！');
    });
}
function do_load_bottom_half(msg) {
    (0, F_display_mazeCh_1.init_mazeCh)();
    exports.g_ds = (0, F_display_maze3D_1.init_maze3D)();
    exports.g_mvm.notice_message(msg);
    global_1.g_mes.notice_message(msg);
    (0, F_set_move_mode_1.act_move_mode)();
    (0, F_set_move_mode_1.do_move_bottom_half)('blink_off');
}
function init_after_loaded_DOM() {
    (0, global_1.init_after_loaded_DOM_in_common)('debug_mode', 'pane_sytm_logs');
    exports.g_mvm = C_OneLineViewMessage_1.C_OneLineViewMessage.getObj('maze_mesg');
    exports.g_cvm = C_OneLineViewMessage_1.C_OneLineViewMessage.getObj('menu_mesg');
    exports.g_ctls = C_DefaultCtls_1.C_DefaultCtls.getObj();
    exports.g_vsw = C_SwitchView_1.C_SwitchView.getObj();
    init_debug_mode();
    stop_double_click();
    (0, F_set_mode_1.init_all_mode)();
    global_1.g_ready_games.setFunction(init_before_games);
    global_1.g_ready_games.setLoadedDOM();
}
function init_debug_mode() {
    try {
        const alert = document.getElementById('alert_mode');
        alert === null || alert === void 0 ? void 0 : alert.style.setProperty('display', 'none');
        alert === null || alert === void 0 ? void 0 : alert.addEventListener("click", (event) => {
            try {
                global_1.g_alert.show();
            }
            catch (err) { }
            ;
        });
        global_1.g_debug.setObj({
            yn: false,
            onName: 'DEBUG',
            offName: '通常',
            onClass: 'debug',
            offClass: 'normal',
        });
        global_1.g_debug.addFnc(toggle_debug_mode);
        const btn = document.getElementById('debug_mode');
        window.addEventListener("keydown", (event) => {
            switch (event.code) {
                case "NumpadMultiply":
                case "Escape":
                    btn.click();
            }
        });
    }
    catch (err) {
        return;
    }
    ;
}
function toggle_debug_mode(yn) {
    (0, F_display_mazeCh_1.display_mazeCh)();
    const alert = document.getElementById('alert_mode');
    const display = yn ? 'block' : 'none';
    alert === null || alert === void 0 ? void 0 : alert.style.setProperty('display', display);
}
function stop_double_click() {
    window.addEventListener('dblclick', (evt) => { evt.preventDefault(); });
}
function install_objs(num = 1) {
    for (let i = 0; i < num; i++) {
        const x = (0, F_Rand_1._irand)(1, (exports.g_maze.get_x_max() - 1) / 2) * 2 + 1;
        const y = (0, F_Rand_1._irand)(1, (exports.g_maze.get_y_max() - 1) / 2) * 2 + 1;
        const obj = C_MazeObj_1.C_MazeObj.newObj({
            pos: { x: x, y: y, z: 0, d: 0 },
            view: {
                layer: 2,
                letter: '物',
            },
        });
        exports.g_maze.add_obj(obj);
    }
}


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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!**********************************!*\
  !*** ./src/mai_maze/mai_maze.ts ***!
  \**********************************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const global_for_maze_1 = __webpack_require__(/*! ./global_for_maze */ "./src/mai_maze/global_for_maze.ts");
window.addEventListener('DOMContentLoaded', function () {
    (0, global_for_maze_1.init_after_loaded_DOM)();
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QyxDQUFDLENBQUMsRUFBRSxHQUFLLG9CQUFPLEVBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztRQUVwQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBSSxvQkFBTyxFQUFDLENBQUMsRUFBRyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUksb0JBQU8sRUFBQyxDQUFDLEVBQUcsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFJLG9CQUFPLEVBQUMsQ0FBQyxFQUFHLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBSSxvQkFBTyxFQUFDLENBQUMsRUFBRyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFFcEMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUksb0JBQU8sRUFBQyxDQUFDLEVBQUksRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFJLG9CQUFPLEVBQUMsQ0FBQyxFQUFJLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBSSxvQkFBTyxFQUFDLENBQUMsRUFBSSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUksb0JBQU8sRUFBQyxDQUFDLEVBQUksRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFJLG9CQUFPLEVBQUMsQ0FBQyxFQUFJLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBSSxvQkFBTyxFQUFDLENBQUMsRUFBSSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDcEMsSUFBSSxD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Q3ZCLElBQUksQ0FBQyxRQUFRLEdBQU0sR0FBRyxDQUFDO1FBRXZCLElBQUksQ0FBQyxTQUFTLEdBQUssSUFBSSxDQUFDO1FBRXhCLElBQUksQ0FBQyxRQUFRLEdBQUssU0FBUyxDQUFDO1FBQzVCLElBQUksQ0FBQyxRQUFRLEdBQUssU0FBUyxDQUFDO1FBQzVCLElBQUksQ0FBQyxRQUFRLEdBQUssU0FBUyxDQUFDO1FBQzVCLElBQUksQ0FBQyxRQUFRLEdBQUssU0FBUyxDQUFDO1FBQzVCLElBQUksQ0FBQyxRQUFRLEdBQUssU0FBUyxDQUFDO1FBQzVCLElBQUksQ0FBQyxRQUFRLEdBQUssU0FBUyxDQUFDO1FBRTVCLElBQUksQ0FBQyxLQUFLLFNBQVM7WUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFDTyxNQUFNLENBQUMsQ0FBNkI7UUFDeEMsSUFBSSxDQUFDLEtBQUssU0FBUztZQUFFLE9BQU8sSUFBSSxDQUFDO1FBRWpDLElBQUksQ0FBQyxDQUFDLE1BQU0sS0FBTSxTQUFTO1lBQUUsSUFBSSxDQUFDLE1BQU0sR0FBTSxDQUFDLENBQUMsTUFBTSxDQUFDO1FBQ3ZELElBQUksQ0FBQyxDQUFDLEtBQUssS0FBTyxTQUFTO1lBQUUsSUFBSSxDQUFDLFFBQVEsR0FBSSxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQ3RELElBQUksQ0FBQyxDQUFDLE1BQU0sS0FBTSxTQUFTO1lBQUUsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsTUFBTSxLQUFLLEVBQUUsQ0FBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ2pGLElBQUksQ0FBQyxDQUFDLEtBQUssS0FBTyxTQUFTO1lBQUUsSUFBSSxDQUFDLFFBQVEsR0FBSSxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQ3RELElBQUksQ0FBQyxDQUFDLEtBQUssS0FBTyxTQUFTO1lBQUUsSUFBSSxDQUFDLFFBQVEsR0FBSSxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQ3RELElBQUksQ0FBQyxDQUFDLEtBQUssS0FBTyxTQUFTO1lBQUUsSUFBSSxDQUFDLFFBQVEsR0FBSSxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQ3RELElBQUksQ0FBQyxDQUFDLE1BQU0sS0FBTSxTQUFTO1lBQUUsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsTUFBTSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFLLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDbEYsSUFBSSxDQUFDLENBQUMsS0FBSyxLQUFPLFNBQVM7WUFBRSxJQUFJLENBQUMsUUFBUSxHQUFJLENBQUMsQ0FBQyxLQUFLLEtBQU0sRUFBRSxDQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFFLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDakYsSUFBSSxDQUFDLENBQUMsS0FBSyxLQUFPLFNBQVM7WUFBRSxJQUFJLENBQUMsUUFBUSxHQUFJLENBQUMsQ0FBQyxLQUFLLEtBQU0sRUFBRSxDQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFFLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDakYsSUFBSSxDQUFDLENBQUMsS0FBSyxLQUFPLFNBQVM7WUFBRSxJQUFJLENBQUMsUUFBUSxHQUFJLENBQUMsQ0FBQyxLQUFLLEtBQU0sRUFBRSxDQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFFLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDakYsSUFBSSxDQUFDLENBQUMsS0FBSyxLQUFPLFNBQVM7WUFBRSxJQUFJLENBQUMsUUFBUSxHQUFJLENBQUMsQ0FBQyxLQUFLLEtBQU0sRUFBRSxDQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFFLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDakYsSUFBSSxDQUFDLENBQUMsS0FBSyxLQUFPLFNBQVM7WUFBRSxJQUFJLENBQUMsUUFBUSxHQUFJLENBQUMsQ0FBQyxLQUFLLEtBQU0sRUFBRSxDQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFFLENBQUMsQ0FB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QUMsR0FBRyxPQUFPLENBQUM7SUFFMUUsTUFBTSxVQUFVLEdBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxPQUFPLENBQUM7SUFDMUUsTUFBTSxVQUFVLEdBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxPQUFPLENBQUM7SUFJMUUsTUFBTSxZQUFZLEdBQUcsRUFBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLEtBQUssR0FBRyxVQUFVLEVBQUUsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxLQUFLLEdBQUcsVUFBVSxFQUFDO0lBQ3ZGLE1BQU0sWUFBWSxHQUFHLEVBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxLQUFLLEdBQUcsVUFBVSxFQUFFLENBQUMsRUFBRSxTQUFTLENBQUMsS0FBSyxHQUFHLFVBQVUsRUFBQztJQUN2RixNQUFNLFlBQVksR0FBRyxFQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsS0FBSyxHQUFHLFVBQVUsRUFBRSxDQUFDLEVBQUUsU0FBUyxDQUFDLEtBQUssR0FBRyxVQUFVLEVBQUM7SUFDdkYsTUFBTSxZQUFZLEdBQUcsRUFBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLEtBQUssR0FBRyxVQUFVLEVBQUUsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxLQUFLLEdBQUcsVUFBVSxFQUFDO0lBRXZGLE1BQU0sWUFBWSxHQUFHLEVBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxLQUFLLEdBQUcsVUFBVSxFQUFFLENBQUMsRUFBRSxTQUFTLENBQUMsS0FBSyxHQUFHLFVBQVUsRUFBQztJQUN2RixNQUFNLFlBQVksR0FBRyxFQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsS0FBSyxHQUFHLFVBQVUsRUFBRSxDQUFDLEVBQUUsU0FBUyxDQUFDLEtBQUssR0FBRyxVQUFVLEVBQUM7SUFDdkYsTUFBTSxZQUFZLEdBQUcsRUFBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLEtBQUssR0FBRyxVQUFVLEVBQUUsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxLQUFLLEdBQUcsVUFBVSxFQUFDO0lBQ3ZGLE1BQU0sWUFBWSxHQUFHLEVBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxLQUFLLEdBQUcsVUFBVSxFQUFFLENBQUMsRUFBRSxTQUFTLENBQUMsS0FBSyxHQUFHLFVBQVUsRUFBQztJQUV2RixJQUFJLEdBQUcsR0FBRyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUUsWUFBWSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ2pFLElBQUksR0FBRyxHQUFHLGlCQUFpQixDQUFDLFlBQVksRUFBRSxZQUFZLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDakUsSUFBSSxHQUFHLEdBQUcsaUJBQWlCLENBQUMsWUFBWSxFQUFFLFlBQVksRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNqRSxJQUFJLEdBQUcsR0FBRyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUUsWUFBWSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBRWpFLElBQUksR0FBRyxHQUFHLGlCQUFpQixDQUFDLFlBQVksRUFBRSxZQUFZLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDakUsSUFBSSxHQUFHLEdBQUcsaUJBQWlCLENBQUMsWUFBWSxFQUFFLFlBQVksRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNqRSxJQUFJLEdBQUcsR0FBRyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUUsWUFBWSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ2pFLElBQUksR0FBRyxHQUFHLGlCQUFpQixDQUFDLFlBQVksRUFBRSxZQUFZLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFFakUsT0FBTztRQUNILEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUc7UUFDbEIsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRztRQUNsQixHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHO1FBQ2xCLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUc7S0FDckI7QUFDTCxDQUFDO0FBQ0QsU0FBUyxpQkFBaUIsQ0FBQyxJQUFVLEVBQUUsSUFBVSxFQUFFLEtBQWE7SUFFeEQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2hELE1BQU0sQ0FBQyxHQUFJLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7SUFHL0IsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQztJQUNwRCxNQUFNLFFBQVEsR0FBRyxDQUFDLEdBQUcsUUFBUSxHQUFHLENBQUMsQ0FBQztJQUVsQyxPQUFPLEVBQUMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFDLENBQUM7QUFDMUMsQ0FBQztBQUdELFNBQVMsZUFBZSxDQUNoQixTQUFpQixFQUNqQixTQUFpQixFQUNqQixPQUFlLFNBQVMsRUFDeEIsT0FBZSxTQUFTO0lBRzVCLE1BQU0sSUFBSSxHQUFXO1FBQ2pCLEVBQUUsRUFBRSxFQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxTQUFTLENBQUMsS0FBSyxFQUFDO1FBQzVDLEVBQUUsRUFBRSxFQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxTQUFTLENBQUMsS0FBSyxFQUFDO1FBQzVDLEVBQUUsRUFBRSxFQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxTQUFTLENBQUMsS0FBSyxFQUFDO1FBQzVDLEVBQUUsRUFBRSxFQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxTQUFTLENBQUMsS0FBSyxFQUFDO0tBQy9DO0lBQ0QsU0FBUyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDaEMsQ0FBQztBQUNELFNBQVMsaUJBQWlCLENBQ2xCLFNBQWlCLEVBQ2pCLFNBQWlCLEVBQ2pCLE9BQWUsU0FBUyxFQUN4QixPQUFlLFNBQVM7SUFHNUIsTUFBTSxJQUFJLEdBQVc7UUFDakIsRUFBRSxFQUFFLEVBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxLQUFLLEVBQUM7UUFDNUMsRUFBRSxFQUFFLEVBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxLQUFLLEVBQUM7UUFDNUMsRUFBRSxFQUFFLEVBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxLQUFLLEVBQUM7UUFDNUMsRUFBRSxFQUFFLEVBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxLQUFLLEVBQUM7S0FDL0M7SUFDRCxTQUFTLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNoQyxDQUFDO0FBRUQsU0FBUyxTQUFTLENBQUMsQ0FBUyxFQUFFLElBQWlCLEVBQUUsSUFBaUI7SUFDOUQsSUFBSSxhQUFhLENBQUMsS0FBSyxLQUFLLFNBQVM7UUFBRSxPQUFPO0lBQzlDLE1BQU0sR0FBRyxHQUFHLGFBQWEsQ0FBQyxLQUFLLENBQUM7SUFFaEMsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ2hCLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMzQixHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDM0IsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzNCLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMzQixHQUFHLENBQUMsU0FBUyxFQUFFLENBQUM7SUFFaEIsSUFBSSxJQUFJLElBQUksSUFBSSxFQUFFLENBQUM7UUFDZixHQUFHLENBQUMsU0FBUyxHQUFLLElBQUksQ0FBQztRQUN2QixHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDZixDQUFDO0lBQ0QsSUFBSSxJQUFJLEtBQUssSUFBSSxFQUFFLENBQUM7UUFDaEIsR0FBRyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFDdkIsR0FBRyxDQUFDLFNBQVMsR0FBSyxDQUFDLENBQUM7UUFDcEIsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2pCLENBQUM7QUFDTCxDQUFDOzs7Ozs7Ozs7OztBQzVaWTs7O0FBYWIsMENBZUM7QUExQkQsMEZBQXlEO0FBRXpELHFGQUE0RDtBQVM1RCxTQUFnQixlQUFlLENBQUMsQ0FBOEI7O0lBQzFELElBQUksQ0FBQyxLQUFLLFNBQVM7UUFBRSxPQUFPO0lBQzVCLEtBQUssQ0FBQyxZQUFZO1VBQ1osY0FBYyxHQUFJLENBQUMsT0FBQyxDQUFDLE9BQU8sbUNBQU8sR0FBRyxDQUFDO1VBQ3ZDLGNBQWMsR0FBSSxDQUFDLE9BQUMsQ0FBQyxPQUFPLG1DQUFPLEdBQUcsQ0FBQztVQUN2QyxjQUFjLEdBQUksQ0FBQyxPQUFDLENBQUMsUUFBUSxtQ0FBTSxHQUFHLENBQUM7VUFDdkMsVUFBVSxHQUFRLENBQUMsT0FBQyxDQUFDLElBQUksbUNBQVUsR0FBRyxDQUFDO1VBQ3ZDLFVBQVUsR0FBUSxDQUFDLE9BQUMsQ0FBQyxJQUFJLG1DQUFVLEdBQUcsQ0FBQztVQUN2QyxVQUFVLEdBQVEsQ0FBQyxPQUFDLENBQUMsT0FBTyxtQ0FBTyxHQUFHLENBQUM7VUFDdkMsV0FBVyxHQUFPLENBQUMsYUFBQyxDQUFDLE9BQU8sMENBQUUsQ0FBQyxtQ0FBSSxHQUFHLENBQUM7VUFDdkMsV0FBVyxHQUFPLENBQUMsYUFBQyxDQUFDLE9BQU8sMENBQUUsQ0FBQyxtQ0FBSSxHQUFHLENBQUM7VUFDdkMsV0FBVyxHQUFPLENBQUMsYUFBQyxDQUFDLE9BQU8sMENBQUUsQ0FBQyxtQ0FBSSxHQUFHLENBQUM7VUFDdkMsV0FBVyxHQUFPLENBQUMsYUFBQyxDQUFDLE9BQU8sMENBQUUsQ0FBQyxtQ0FBSSxHQUFHLENBQUM7VUFDdkMsSUFBSSxDQUNULENBQUM7QUFDTixDQUFDO0FBR0QsTUFBYSxjQUFlLFNBQVEsdUJBQVU7SUFJMUMsWUFBbUIsSUFBd0I7UUFDdkMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ1osSUFBSSxDQUFDLE9BQU8sR0FBSSxVQUFVLEdBQUcsc0JBQVMsR0FBRSxDQUFDO1FBQ3pDLElBQUksQ0FBQyxPQUFPLEdBQUksRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFDO1FBRTFCLElBQUksSUFBSSxLQUFLLFNBQVMsSUFBSSxJQUFJLEtBQUssSUFBSTtZQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUNNLEdBQUcsS0FBYSxPQUFPLElBQUksQ0FBQyxPQUFPLEdBQUM7SUFDcEMsR0FBRyxLQUFhLE9BQU8sSUFBSSxDQUFDLE9BQU8sR0FBQztJQUNwQyxHQUFHLEtBQXVCLE9BQU8sSUFBSSxDQUFDLFFBQVEsR0FBQztJQUUvQyxPQUFPLEtBQVUsSUFBSSxDQUFDLE9BQU8sR0FBRyxVQUFVLEdBQUcsc0JBQVMsR0FBRSxDQUFDLEVBQUM7SUFDMUQsT0FBTyxDQUFDLEdBQVcsSUFBVSxJQUFJLENBQUMsT0FBTyxHQUFJLEdBQUcsQ0FBQyxFQUFDO0lBQ2xELE9BQU8sQ0FBQyxHQUFXLElBQVUsSUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUMsRUFBQztJQUVsRCxLQUFLO1FBQ1IsTUFBTSxJQUFJLEdBQUcsSUFBSSxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2YsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVNLFFBQVEsQ0FBQyxHQUFXO1FBQ3ZCLElBQUksQ0FBQztZQUNELE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFzQixDQUFDO1lBQy9DLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMxQixDQUFDO1FBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztZQUNYLE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUM7UUFBQSxDQUFDO0lBQ04sQ0FBQztJQUNNLE1BQU07UUFDVCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBRU0sTUFBTSxDQUFDLGtCQUFrQixDQUFDLEVBQWtCO1FBQy9DLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBQ00sTUFBTSxDQUFDLHVCQUF1QixDQUFDLEdBQW9DO1FBQ3RFLE1BQU0sRUFBRSxHQUFHLEVBQXlCLENBQUM7UUFDckMsS0FBSyxNQUFNLEVBQUUsSUFBSSxHQUFHO1lBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUNoRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUNNLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxHQUFXO1FBQ3hDLElBQUksQ0FBQztZQUNELE1BQU0sQ0FBQyxHQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUF3QixDQUFDO1lBQ25ELE9BQU8sSUFBSSxjQUFjLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDMUMsQ0FBQztRQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7WUFDWCxPQUFPLElBQUksY0FBYyxFQUFFLENBQUM7UUFDaEMsQ0FBQztRQUFBLENBQUM7SUFDTixDQUFDO0lBQ00sTUFBTSxDQUFDLHVCQUF1QixDQUFDLEdBQVc7UUFDN0MsSUFBSSxDQUFDO1lBQ0QsTUFBTSxDQUFDLEdBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQXdCLENBQUM7WUFDbkQsTUFBTSxHQUFHLEdBQUcsRUFBb0MsQ0FBQztZQUNqRCxLQUFLLE1BQU0sRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDO2dCQUNqQixNQUFNLEdBQUcsR0FBRyxJQUFJLGNBQWMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDNUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQztZQUN6QixDQUFDO1lBQ0QsT0FBTyxHQUFHLENBQUM7UUFDZixDQUFDO1FBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztZQUNYLE9BQU8sRUFBRSxDQUFDO1FBQ2QsQ0FBQztRQUFBLENBQUM7SUFDTixDQUFDO0lBRU0sTUFBTTs7UUFDVCxNQUFNLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUF1QixDQUFDO1FBQzlDLENBQUMsQ0FBQyxPQUFPLEdBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUMxQixDQUFDLENBQUMsT0FBTyxHQUFJLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDMUIsQ0FBQyxDQUFDLFFBQVEsR0FBRyxVQUFJLENBQUMsUUFBUSxtQ0FBSSxFQUFFLENBQUM7UUFDakMsT0FBTyxDQUFDLENBQUM7SUFDYixDQUFDO0lBQ00sTUFBTSxDQUFDLENBQXFCO1FBQy9CLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDaEIsSUFBSSxDQUFDLEtBQUssU0FBUztZQUFFLE9BQU8sSUFBSSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxDQUFDLE9BQU8sS0FBTSxTQUFTO1lBQUUsSUFBSSxDQUFDLE9BQU8sR0FBSSxDQUFDLENBQUMsT0FBTyxDQUFDO1FBQ3hELElBQUksQ0FBQyxDQUFDLE9BQU8sS0FBTSxTQUFTO1lBQUUsSUFBSSxDQUFDLE9BQU8sR0FBSSxDQUFDLENBQUMsT0FBTyxDQUFDO1FBQ3hELElBQUksQ0FBQyxDQUFDLFFBQVEsS0FBSyxTQUFTO1lBQUUsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDO1FBRXpELElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxFQUFFO1lBQUUsSUFBSSxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUM7UUFDcEQsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVNLEtBQUs7O1FBQ1IsS0FBSyxDQUFDLFlBQVk7Y0FDWixjQUFjLEdBQUksQ0FBQyxVQUFJLENBQUMsT0FBTyxtQ0FBTyxHQUFHLENBQUM7Y0FDMUMsY0FBYyxHQUFJLENBQUMsVUFBSSxDQUFDLE9BQU8sbUNBQU8sR0FBRyxDQUFDO2NBQzFDLGNBQWMsR0FBSSxDQUFDLFVBQUksQ0FBQyxRQUFRLG1DQUFNLEdBQUcsQ0FBQztjQUMxQyxVQUFVLEdBQVEsQ0FBQyxVQUFJLENBQUMsUUFBUSxtQ0FBTSxHQUFHLENBQUM7Y0FDMUMsVUFBVSxHQUFRLENBQUMsVUFBSSxDQUFDLFFBQVEsbUNBQU0sR0FBRyxDQUFDO2NBQzFDLFVBQVUsR0FBUSxDQUFDLFVBQUksQ0FBQyxPQUFPLG1DQUFPLEdBQUcsQ0FBQztjQUMxQyxXQUFXLEdBQU8sQ0FBQyxnQkFBSSxDQUFDLE9BQU8sMENBQUUsQ0FBQyxtQ0FBSSxHQUFHLENBQUM7Y0FDMUMsV0FBVyxHQUFPLENBQUMsZ0JBQUksQ0FBQyxPQUFPLDBDQUFFLENBQUMsbUNBQUksR0FBRyxDQUFDO2NBQzFDLFdBQVcsR0FBTyxDQUFDLGdCQUFJLENBQUMsT0FBTywwQ0FBRSxDQUFDLG1DQUFJLEdBQUcsQ0FBQztjQUMxQyxXQUFXLEdBQU8sQ0FBQyxnQkFBSSxDQUFDLE9BQU8sMENBQUUsQ0FBQyxtQ0FBSSxHQUFHLENBQUM7Y0FDMUMsSUFBSSxDQUNULENBQUM7SUFDTixDQUFDO0NBQ0o7QUFyR0Qsd0NBcUdDOzs7Ozs7Ozs7OztBQ3BJWTs7O0FBVWIsTUFBYSxPQUFPO0lBSWhCLFlBQW1CLENBQXVDLEVBQUUsQ0FBVSxFQUFFLENBQVU7UUFDOUUsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFFOUIsSUFBSSxDQUFDLEtBQUssU0FBUyxFQUFFLENBQUM7WUFDbEIsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ25DLE9BQU87UUFDWCxDQUFDO1FBQ0QsSUFBSSxPQUFPLENBQUMsS0FBSyxRQUFRLElBQUksT0FBTyxDQUFDLEtBQUssUUFBUSxJQUFJLE9BQU8sQ0FBQyxLQUFLLFFBQVEsRUFBRSxDQUFDO1lBQzFFLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNuQyxPQUFPO1FBQ1gsQ0FBQztRQUNELElBQUksT0FBTyxDQUFDLEtBQUssUUFBUSxFQUFFLENBQUM7WUFDeEIsSUFBSSxDQUFDLFlBQVksT0FBTyxFQUFFLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN6QyxPQUFPO1lBQ1gsQ0FBQztpQkFBTSxDQUFDO2dCQUNKLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2YsT0FBTztZQUNYLENBQUM7UUFDTCxDQUFDO1FBQ0QsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDOUIsT0FBTztJQUNYLENBQUM7SUFFTSxLQUFLLEtBQWEsT0FBTyxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBQztJQUMzQyxLQUFLLENBQUMsQ0FBVTtRQUNuQixJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekMsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVNLFFBQVEsQ0FBQyxDQUFTLEVBQUUsQ0FBUyxFQUFFLENBQVM7UUFDM0MsT0FBTyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUNNLE1BQU0sQ0FBQyxDQUFVO1FBQ3BCLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFTSxNQUFNO1FBQ1QsT0FBTyxFQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFDLENBQUM7SUFDN0MsQ0FBQztJQUNNLE1BQU0sQ0FBQyxDQUFjO1FBQ3hCLElBQUksQ0FBQyxLQUFLLFNBQVM7WUFBRSxPQUFPLElBQUksQ0FBQztRQUNqQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssU0FBUyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssU0FBUyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssU0FBUztZQUFFLE9BQU8sSUFBSSxDQUFDO1FBQzdFLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6QyxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0NBQ0o7QUFsREQsMEJBa0RDOzs7Ozs7Ozs7OztBQzVEWTs7O0FBdUJiLHNDQVNDO0FBOUJELGlGQUFnRDtBQUduQyxtQkFBVyxHQUEyQjtJQUMvQyxDQUFDLEVBQUUsQ0FBQztJQUNKLENBQUMsRUFBRSxDQUFDO0lBQ0osQ0FBQyxFQUFFLENBQUM7SUFDSixDQUFDLEVBQUUsQ0FBQztJQUNKLENBQUMsRUFBRSxFQUFFO0NBQ0MsQ0FBQztBQUdYLFNBQVMsUUFBUSxDQUFDLEdBQTRCOztJQUMxQyxPQUFPLFlBQU0sQ0FBQyxJQUFJLENBQUMsbUJBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLG1CQUFXLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBRyxDQUFDLG1DQUFJLE1BQU0sQ0FBQztBQUNwRixDQUFDO0FBT0QsU0FBZ0IsYUFBYSxDQUFDLENBQTBCOztJQUNwRCxJQUFJLENBQUMsS0FBSyxTQUFTO1FBQUUsT0FBTztJQUM1QixLQUFLLENBQUMsaUJBQWlCO1VBQ2pCLE9BQU8sR0FBTyxDQUFDLE9BQUMsYUFBRCxDQUFDLHVCQUFELENBQUMsQ0FBRSxDQUFDLG1DQUFJLEdBQUcsQ0FBQztVQUMzQixPQUFPLEdBQU8sQ0FBQyxPQUFDLGFBQUQsQ0FBQyx1QkFBRCxDQUFDLENBQUUsQ0FBQyxtQ0FBSSxHQUFHLENBQUM7VUFDM0IsT0FBTyxHQUFPLENBQUMsT0FBQyxhQUFELENBQUMsdUJBQUQsQ0FBQyxDQUFFLENBQUMsbUNBQUksR0FBRyxDQUFDO1VBQzNCLE9BQU8sR0FBTyxDQUFDLE9BQUMsYUFBRCxDQUFDLHVCQUFELENBQUMsQ0FBRSxDQUFDLG1DQUFJLEdBQUcsQ0FBQztVQUMzQixJQUFJLENBQ1QsQ0FBQztBQUNOLENBQUM7QUFFRCxNQUFjLFVBQVcsU0FBUSxpQkFBTztJQUVwQyxZQUFtQixDQUErQztRQUM5RCxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDVCxJQUFJLENBQUMsQ0FBQyxHQUFHLG1CQUFXLENBQUMsQ0FBQyxDQUFDO1FBRXZCLElBQUksQ0FBQyxLQUFLLFNBQVMsRUFBRSxDQUFDO1lBQ2xCLE9BQU87UUFDWCxDQUFDO1FBQ0QsSUFBSSxPQUFPLENBQUMsS0FBSyxRQUFRLEVBQUUsQ0FBQztZQUN4QixJQUFJLENBQUMsQ0FBQyxHQUFHLENBQWdCLENBQUM7WUFDMUIsT0FBTztRQUNYLENBQUM7UUFDRCxJQUFJLE9BQU8sQ0FBQyxLQUFLLFFBQVEsRUFBRSxDQUFDO1lBQ3hCLElBQUksQ0FBQyxZQUFZLFVBQVUsRUFBRSxDQUFDO2dCQUMxQixJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFnQixDQUFDO1lBQ2hDLENBQUM7aUJBQU0sQ0FBQztnQkFDSixJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25CLENBQUM7WUFDRCxPQUFPO1FBQ1gsQ0FBQztRQUNELElBQUksQ0FBQyxDQUFDLEdBQUcsbUJBQVcsQ0FBQyxDQUFDLENBQUM7UUFDdkIsT0FBTztJQUNYLENBQUM7SUFDTSxhQUFhO1FBQ2hCLFFBQVEsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQ2IsS0FBSyxDQUFDLENBQUMsQ0FBRSxPQUFPLEdBQUcsQ0FBQztZQUNwQixLQUFLLENBQUMsQ0FBQyxDQUFFLE9BQU8sR0FBRyxDQUFDO1lBQ3BCLEtBQUssQ0FBQyxDQUFDLENBQUUsT0FBTyxHQUFHLENBQUM7WUFDcEIsS0FBSyxDQUFDLENBQUMsQ0FBRSxPQUFPLEdBQUcsQ0FBQztZQUNwQixPQUFPLENBQUMsQ0FBQyxPQUFPLEdBQUcsQ0FBQztRQUN4QixDQUFDO0lBQ0wsQ0FBQztJQUVNLEtBQUs7UUFDUixPQUFPLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDbEIsQ0FBQztJQUNNLEtBQUssQ0FBQyxDQUFjO1FBQ3ZCLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxtQkFBVyxDQUFDO1lBQUUsT0FBTyxTQUFTLENBQUM7UUFDcEQsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDWCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBQ00sTUFBTTtRQUNULE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFDTSxNQUFNLENBQUMsQ0FBMkI7UUFDckMsSUFBSSxDQUFDLFlBQVksVUFBVSxFQUFFLENBQUM7WUFDMUIsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxtQkFBVyxDQUFDO2dCQUFFLE9BQU8sU0FBUyxDQUFDO1lBQ3RELEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDZixJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDYixPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDO1FBQ0QsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxtQkFBVyxDQUFDO1lBQUUsT0FBTyxTQUFTLENBQUM7UUFDdEQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNmLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFTSxNQUFNO1FBQ1QsTUFBTSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBbUIsQ0FBQztRQUMxQyxDQUFDLENBQUMsQ0FBQyxHQUFPLElBQUksQ0FBQyxDQUFXLENBQUM7UUFDM0IsT0FBTyxDQUFDLENBQUM7SUFDYixDQUFDO0lBQ00sTUFBTSxDQUFDLENBQWlCO1FBQzNCLElBQUksQ0FBQyxLQUFLLFNBQVM7WUFBRSxPQUFPLElBQUksQ0FBQztRQUNqQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLG1CQUFXLENBQUM7WUFBRSxPQUFPLElBQUksQ0FBQztRQUVqRCxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2hCLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQWdCLENBQUM7UUFDNUIsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVNLEtBQUs7O1FBQ1IsS0FBSyxDQUFDLGlCQUFpQjtjQUNqQixPQUFPLEdBQU8sQ0FBQyxVQUFJLENBQUMsQ0FBQyxtQ0FBSSxHQUFHLENBQUM7Y0FDN0IsT0FBTyxHQUFPLENBQUMsVUFBSSxDQUFDLENBQUMsbUNBQUksR0FBRyxDQUFDO2NBQzdCLE9BQU8sR0FBTyxDQUFDLFVBQUksQ0FBQyxDQUFDLG1DQUFJLEdBQUcsQ0FBQztjQUM3QixPQUFPLEdBQU8sQ0FBQyxVQUFJLENBQUMsQ0FBQyxtQ0FBSSxHQUFHLENBQUM7Y0FDN0IsSUFBSSxDQUNULENBQUM7SUFDTixDQUFDO0NBQ0o7QUFoRkQsZ0NBZ0ZDOzs7Ozs7Ozs7Ozs7OztBQ2xIRCxNQUFNLFNBQVM7SUFHWCxZQUFtQixJQUFZLENBQUMsRUFBRSxJQUFZLENBQUM7UUFFM0MsSUFBSSxDQUFDLENBQUMsR0FBSSxDQUFDLENBQUM7UUFDWixJQUFJLENBQUMsQ0FBQyxHQUFJLENBQUMsQ0FBQztJQUNoQixDQUFDO0lBQ00sUUFBUSxDQUFDLENBQVMsRUFBRSxDQUFTO1FBQ2hDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUMxQyxDQUFDO0NBQ0o7QUFFRCxNQUFhLGFBQWMsU0FBUSxTQUFTO0lBRXhDLFlBQW1CLElBQVksQ0FBQyxFQUFFLElBQVksQ0FBQyxFQUFFLEtBQWEsQ0FBQyxDQUFDO1FBRTVELEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDWixJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBQ00sTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFzQjtRQUNyQyxJQUFJLEVBQUMsYUFBRCxDQUFDLHVCQUFELENBQUMsQ0FBRSxDQUFDLE1BQUssU0FBUztZQUFFLE9BQU8sU0FBUyxDQUFDO1FBQ3pDLElBQUksRUFBQyxhQUFELENBQUMsdUJBQUQsQ0FBQyxDQUFFLENBQUMsTUFBSyxTQUFTO1lBQUUsT0FBTyxTQUFTLENBQUM7UUFDekMsT0FBTyxDQUFDLFlBQVksYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3hFLENBQUM7Q0FDSjtBQVpELHNDQVlDO0FBR0QsTUFBYSxZQUFZO0lBRXJCO1FBRE8sUUFBRyxHQUFlLEVBQUUsQ0FBQztJQUNOLENBQUM7SUFFaEIsSUFBSSxDQUFDLENBQVk7UUFDcEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakIsT0FBTztJQUNYLENBQUM7SUFDTSxTQUFTLENBQUMsQ0FBUyxFQUFFLENBQVM7UUFDakMsS0FBSyxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDdkIsSUFBSSxDQUFDLGFBQUQsQ0FBQyx1QkFBRCxDQUFDLENBQUUsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQUUsT0FBTyxDQUFDLENBQUM7UUFDcEMsQ0FBQztRQUNELE9BQU8sU0FBUyxDQUFDO0lBQ3JCLENBQUM7SUFDTSxNQUFNLENBQUMsQ0FBWTtRQUN0QixJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pCLE9BQU87SUFDWCxDQUFDO0lBQ00sU0FBUyxDQUFDLENBQVMsRUFBRSxDQUFTOztRQUNqQyxLQUFLLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUN2QixJQUFJLFVBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLDBDQUFFLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQztnQkFDOUIsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNuQixJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3pCLE1BQU07WUFDVixDQUFDO1FBQ0wsQ0FBQztRQUNELE9BQU87SUFDWCxDQUFDO0lBQ00sUUFBUSxDQUFDLENBQVMsRUFBRSxDQUFTO1FBQ2hDLEtBQUssTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLEdBQUc7WUFBRSxJQUFJLENBQUMsYUFBRCxDQUFDLHVCQUFELENBQUMsQ0FBRSxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFBRSxPQUFPLElBQUksQ0FBQztRQUM3RCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0NBQ0o7QUFoQ0Qsb0NBZ0NDOzs7Ozs7Ozs7OztBQzVEWTs7O0FBRWIscUZBQXVEO0FBQ3ZELGlGQUFpRDtBQVFqRCxNQUFhLE9BQU87SUFHaEIsWUFBbUIsRUFBVyxFQUFFLEVBQVc7UUFDdkMsSUFBSSxDQUFDLEdBQUcsR0FBSSxJQUFJLGlCQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsR0FBRyxHQUFJLElBQUksaUJBQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7SUFDUyxLQUFLLENBQUMsRUFBVyxFQUFFLEVBQVc7UUFDcEMsTUFBTSxLQUFLLEdBQUcsaUJBQUksRUFBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakMsTUFBTSxLQUFLLEdBQUcsaUJBQUksRUFBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFakMsTUFBTSxLQUFLLEdBQUcsaUJBQUksRUFBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakMsTUFBTSxLQUFLLEdBQUcsaUJBQUksRUFBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFakMsTUFBTSxLQUFLLEdBQUcsaUJBQUksRUFBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakMsTUFBTSxLQUFLLEdBQUcsaUJBQUksRUFBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFakMsSUFBSSxDQUFDLEdBQUcsR0FBSSxJQUFJLGlCQUFPLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsR0FBRyxHQUFJLElBQUksaUJBQU8sQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRTdDLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFTSxNQUFNLENBQUMsQ0FBeUIsRUFBRSxDQUFVLEVBQUUsQ0FBVTtRQUMzRCxJQUFJLE9BQU8sQ0FBQyxLQUFLLFFBQVEsSUFBSSxPQUFPLENBQUMsS0FBSyxRQUFRLElBQUksT0FBTyxDQUFDLEtBQUssUUFBUSxFQUFFLENBQUM7WUFDMUUsSUFBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFBRyxPQUFPLEtBQUssQ0FBQztZQUNyRCxJQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUFHLE9BQU8sS0FBSyxDQUFDO1lBQ3JELElBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQUcsT0FBTyxLQUFLLENBQUM7WUFDckQsT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUNELElBQUksT0FBTyxDQUFDLEtBQUssUUFBUSxJQUFJLENBQUMsWUFBWSxpQkFBTyxFQUFFLENBQUM7WUFDaEQsTUFBTSxDQUFDLEdBQUcsQ0FBWSxDQUFDO1lBQ3ZCLElBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFBRyxPQUFPLEtBQUssQ0FBQztZQUN6RCxJQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQUcsT0FBTyxLQUFLLENBQUM7WUFDekQsSUFBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUFHLE9BQU8sS0FBSyxDQUFDO1lBQ3pELE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUM7UUFDRCxJQUFJLE9BQU8sQ0FBQyxLQUFLLFFBQVEsSUFBSSxDQUFDLFlBQVksT0FBTyxFQUFFLENBQUM7WUFDaEQsTUFBTSxDQUFDLEdBQUcsQ0FBWSxDQUFDO1lBQ3ZCLElBQUssQ0FBQyxDQUFDLEtBQUssRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQUcsT0FBTyxLQUFLLENBQUM7WUFDckUsSUFBSyxDQUFDLENBQUMsS0FBSyxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFBRyxPQUFPLEtBQUssQ0FBQztZQUNyRSxJQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUFHLE9BQU8sS0FBSyxDQUFDO1lBQ3JFLE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUM7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBQ00sS0FBSyxLQUFhLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBQztJQUNyQyxLQUFLLEtBQWEsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFDO0lBQ3JDLEtBQUssS0FBYSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUM7SUFDckMsS0FBSyxLQUFhLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBQztJQUNyQyxLQUFLLEtBQWEsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFDO0lBQ3JDLEtBQUssS0FBYSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUM7SUFDckMsTUFBTTtRQUNULE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFDTSxNQUFNO1FBQ1QsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUNNLE1BQU07UUFDVCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBQ00sVUFBVSxDQUFDLEVBQWdEO1FBQzlELEtBQUssSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFHLENBQUM7WUFDN0MsS0FBSyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUcsQ0FBQztnQkFDN0MsS0FBSyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUcsQ0FBQztvQkFDN0MsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQzt3QkFBRSxPQUFPLEtBQUssQ0FBQztnQkFDbkMsQ0FBQztZQUNMLENBQUM7UUFDTCxDQUFDO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUNNLFFBQVEsQ0FBQyxFQUEyQjtRQUN2QyxLQUFLLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRyxDQUFDO1lBQzdDLEtBQUssSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFHLENBQUM7Z0JBQzdDLEtBQUssSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFHLENBQUM7b0JBQzdDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxpQkFBTyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7d0JBQUUsT0FBTyxLQUFLLENBQUM7Z0JBQ2hELENBQUM7WUFDTCxDQUFDO1FBQ0wsQ0FBQztRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFDTSxNQUFNO1FBQ1QsT0FBTztZQUNILEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRTtZQUN0QixHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUU7U0FDekI7SUFDTCxDQUFDO0lBQ00sTUFBTSxDQUFDLENBQWE7UUFDdkIsSUFBSSxDQUFDLEtBQUssU0FBUztZQUFNLE9BQU8sSUFBSSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxDQUFDLEdBQUcsS0FBSyxTQUFTO1lBQUUsT0FBTyxJQUFJLENBQUM7UUFDckMsSUFBSSxDQUFDLENBQUMsR0FBRyxLQUFLLFNBQVM7WUFBRSxPQUFPLElBQUksQ0FBQztRQUNyQyxNQUFNLEVBQUUsR0FBRyxJQUFJLGlCQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzlCLE1BQU0sRUFBRSxHQUFHLElBQUksaUJBQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDOUIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUM5QixDQUFDO0NBQ0o7QUFoR0QsMEJBZ0dDOzs7Ozs7Ozs7OztBQzNHWTs7O0FBMEJiLDBDQWtCQztBQUVELDhDQXNCQztBQWxFRCw4RUFBZ0U7QUFDaEUsaUZBQWlFO0FBQ2pFLHNHQUFzRjtBQUN0Riw4RUFBZ0U7QUFDaEUsMEZBQTJFO0FBb0IzRSxTQUFnQixlQUFlLENBQUMsQ0FBMEI7O0lBQ3RELElBQUksQ0FBQyxLQUFLLFNBQVM7UUFBRSxPQUFPO0lBQzVCLEtBQUssQ0FBQyxZQUFZO1VBQ1osZ0JBQWdCLEdBQUcsQ0FBQyxPQUFDLENBQUMsT0FBTyxtQ0FBTSxHQUFHLENBQUM7VUFDdkMsZ0JBQWdCLEdBQUcsQ0FBQyxPQUFDLENBQUMsU0FBUyxtQ0FBSSxHQUFHLENBQUM7VUFDdkMsZ0JBQWdCLEdBQUcsQ0FBQyxPQUFDLENBQUMsT0FBTyxtQ0FBTSxHQUFHLENBQUM7VUFDdkMsZ0JBQWdCLEdBQUcsQ0FBQyxPQUFDLENBQUMsS0FBSyxtQ0FBUSxHQUFHLENBQUM7VUFDdkMsZ0JBQWdCLEdBQUcsQ0FBQyxPQUFDLENBQUMsTUFBTSxtQ0FBTyxHQUFHLENBQUM7VUFDdkMsZ0JBQWdCLEdBQUcsQ0FBQyxPQUFDLENBQUMsS0FBSyxtQ0FBUSxHQUFHLENBQUM7VUFDdkMsZ0JBQWdCLEdBQUcsQ0FBQyxPQUFDLENBQUMsU0FBUyxtQ0FBSSxHQUFHLENBQUM7VUFDdkMsZ0JBQWdCLEdBQUcsQ0FBQyxPQUFDLENBQUMsU0FBUyxtQ0FBSSxHQUFHLENBQUM7VUFDdkMsZ0JBQWdCLEdBQUcsQ0FBQyxPQUFDLENBQUMsU0FBUyxtQ0FBSSxHQUFHLENBQUM7VUFDdkMsZ0JBQWdCLEdBQUcsQ0FBQyxhQUFDLENBQUMsUUFBUSwwQ0FBRSxNQUFNLG1DQUFJLEdBQUcsQ0FBQztVQUM5QyxnQkFBZ0IsR0FBRyxDQUFDLGFBQUMsQ0FBQyxRQUFRLDBDQUFFLE1BQU0sbUNBQUksR0FBRyxDQUFDO1VBQzlDLGdCQUFnQixHQUFHLENBQUMsYUFBQyxDQUFDLFFBQVEsMENBQUUsTUFBTSxtQ0FBSSxHQUFHLENBQUM7VUFDOUMsZ0JBQWdCLEdBQUcsQ0FBQyxhQUFDLENBQUMsUUFBUSwwQ0FBRSxNQUFNLG1DQUFJLEdBQUcsQ0FBQztVQUM5QyxJQUFJLENBQ1QsQ0FBQztBQUNOLENBQUM7QUFFRCxTQUFnQixpQkFBaUIsQ0FBQyxDQUEwQjs7SUFDeEQsSUFBSSxDQUFDLEtBQUssU0FBUztRQUFFLE9BQU87SUFFNUIsSUFBSSxDQUFDO1FBRUQsS0FBSyxNQUFNLElBQUksSUFBSSxPQUFDLENBQUMsUUFBUSxtQ0FBRSxFQUFFO1lBQUUsb0NBQWUsRUFBQyxJQUFJLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUFBLEtBQUssQ0FBQyxvQkFBb0IsR0FBRyxHQUFHLENBQUM7SUFBQSxDQUFDO0lBRWpELElBQUksQ0FBQztRQUVELEtBQUssTUFBTSxJQUFJLElBQUksT0FBQyxDQUFDLFFBQVEsbUNBQUUsRUFBRTtZQUFFLDRCQUFlLEVBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFBQSxLQUFLLENBQUMsb0JBQW9CLEdBQUcsR0FBRyxDQUFDO0lBQUEsQ0FBQztJQUVqRCxJQUFJLENBQUM7UUFFRCxLQUFLLE1BQU0sSUFBSSxJQUFJLE9BQUMsQ0FBQyxRQUFRLG1DQUFFLEVBQUU7WUFBRSw0QkFBZSxFQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBQUEsS0FBSyxDQUFDLG9CQUFvQixHQUFHLEdBQUcsQ0FBQztJQUFBLENBQUM7SUFFakQsSUFBSSxDQUFDO1FBRUQsS0FBSyxNQUFNLElBQUksSUFBSSxPQUFDLENBQUMsUUFBUSxtQ0FBRSxFQUFFO1lBQUUsNkJBQWUsRUFBQyxJQUFJLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUFBLEtBQUssQ0FBQyxvQkFBb0IsR0FBRyxHQUFHLENBQUM7SUFBQSxDQUFDO0FBQ3JELENBQUM7QUFHRCxNQUFhLFVBQVcsU0FBUSx1QkFBVTtJQXFCdEMsWUFBbUIsQ0FBaUI7UUFDaEMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRVQsSUFBSSxDQUFDLFFBQVEsR0FBSSxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLFFBQVEsR0FBSSxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLFFBQVEsR0FBSSxFQUFFO1FBQ25CLElBQUksQ0FBQyxRQUFRLEdBQUksRUFBRSxDQUFDO1FBRXBCLElBQUksQ0FBQyxLQUFLLFNBQVM7WUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFTSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQWlCO1FBQy9CLE9BQU8sSUFBSSxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVNLE1BQU07UUFDVCxJQUFJLFNBQWlCLENBQUM7UUFDdEIsSUFBSSxDQUFDO1lBQ0QsTUFBTSxTQUFTLEdBQU0sS0FBSyxDQUFDLE1BQU0sRUFBbUIsQ0FBQztZQUVyRCxTQUFTLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDMUQsU0FBUyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzFELFNBQVMsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUMxRCxTQUFTLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFFMUQsT0FBTyxTQUFTLENBQUM7UUFDckIsQ0FBQztRQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7WUFDWCxLQUFLLENBQUMseUJBQXlCLEdBQUcsR0FBRyxDQUFDLENBQUM7WUFDdkMsT0FBTyxFQUFFLENBQUM7UUFDZCxDQUFDO0lBQ0wsQ0FBQztJQUNTLGdCQUFnQixDQUFDLFFBQStCO1FBQ3RELE1BQU0sUUFBUSxHQUFlLEVBQUUsQ0FBQztRQUNoQyxLQUFLLElBQUksQ0FBQyxJQUFJLFFBQVE7WUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBQzVELE9BQU8sUUFBUSxDQUFDO0lBQ3BCLENBQUM7SUFFTSxNQUFNLENBQUMsQ0FBZ0I7UUFDMUIsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVoQixJQUFJLENBQUMsQ0FBQyxRQUFRLEtBQU0sU0FBUyxFQUFFLENBQUM7WUFDNUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7WUFDbkIsS0FBSyxNQUFNLFNBQVMsSUFBSSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQ2hDLE1BQU0sSUFBSSxHQUFHLENBQUMsSUFBSSwrQkFBYyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ3RELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDO1lBQ3RDLENBQUM7UUFDTCxDQUFDO1FBQ0QsSUFBSSxDQUFDLENBQUMsUUFBUSxLQUFNLFNBQVMsRUFBRSxDQUFDO1lBQzVCLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1lBQ25CLEtBQUssTUFBTSxTQUFTLElBQUksQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUNoQyxNQUFNLElBQUksR0FBRyxDQUFDLElBQUksZUFBTSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQzlDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDO1lBQ3RDLENBQUM7UUFDTCxDQUFDO1FBQ0QsSUFBSSxDQUFDLENBQUMsUUFBUSxLQUFNLFNBQVMsRUFBRSxDQUFDO1lBQzVCLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1lBQ25CLEtBQUssTUFBTSxTQUFTLElBQUksQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUNoQyxNQUFNLElBQUksR0FBRyxDQUFDLElBQUksZUFBTSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQzlDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDO1lBQ3RDLENBQUM7UUFDTCxDQUFDO1FBQ0QsSUFBSSxDQUFDLENBQUMsUUFBUSxLQUFNLFNBQVMsRUFBRSxDQUFDO1lBQzVCLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1lBQ25CLEtBQUssTUFBTSxTQUFTLElBQUksQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUNqQyxNQUFNLElBQUksR0FBRyxDQUFDLElBQUksaUJBQU8sRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUMvQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQztZQUN0QyxDQUFDO1FBQ0osQ0FBQztRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFTSxLQUFLOztRQUNSLEtBQUssQ0FBQyxZQUFZO2NBQ1osZ0JBQWdCLEdBQUcsQ0FBQyxVQUFJLENBQUMsT0FBTyxtQ0FBTSxHQUFHLENBQUM7Y0FDMUMsZ0JBQWdCLEdBQUcsQ0FBQyxVQUFJLENBQUMsU0FBUyxtQ0FBSSxHQUFHLENBQUM7Y0FDMUMsZ0JBQWdCLEdBQUcsQ0FBQyxVQUFJLENBQUMsT0FBTyxtQ0FBTSxHQUFHLENBQUM7Y0FDMUMsZ0JBQWdCLEdBQUcsQ0FBQyxVQUFJLENBQUMsS0FBSyxtQ0FBUSxHQUFHLENBQUM7Y0FDMUMsZ0JBQWdCLEdBQUcsQ0FBQyxVQUFJLENBQUMsTUFBTSxtQ0FBTyxHQUFHLENBQUM7Y0FDMUMsZ0JBQWdCLEdBQUcsQ0FBQyxVQUFJLENBQUMsS0FBSyxtQ0FBUSxHQUFHLENBQUM7Y0FDMUMsZ0JBQWdCLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFDLElBQUcsRUFBQyxJQUFHLENBQUM7Y0FDM0MsZ0JBQWdCLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFDLElBQUcsRUFBQyxJQUFHLENBQUM7Y0FDM0MsZ0JBQWdCLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFDLElBQUcsRUFBQyxJQUFHLENBQUM7Y0FDM0MsZ0JBQWdCLEdBQUcsQ0FBQyxnQkFBSSxDQUFDLFFBQVEsMENBQUUsTUFBTSxtQ0FBSSxHQUFHLENBQUM7Y0FDakQsZ0JBQWdCLEdBQUcsQ0FBQyxnQkFBSSxDQUFDLFFBQVEsMENBQUUsTUFBTSxtQ0FBSSxHQUFHLENBQUM7Y0FDakQsZ0JBQWdCLEdBQUcsQ0FBQyxnQkFBSSxDQUFDLFFBQVEsMENBQUUsTUFBTSxtQ0FBSSxHQUFHLENBQUM7Y0FDakQsZ0JBQWdCLEdBQUcsQ0FBQyxnQkFBSSxDQUFDLFFBQVEsMENBQUUsTUFBTSxtQ0FBSSxHQUFHLENBQUM7Y0FDakQsSUFBSSxDQUNULENBQUM7SUFDTixDQUFDO0lBRU0sWUFBWTtRQUNmLElBQUksQ0FBQztZQUVELEtBQUssTUFBTSxFQUFFLElBQUksSUFBSSxDQUFDLFFBQVE7Z0JBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUM5RCxDQUFDO1FBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztZQUFBLEtBQUssQ0FBQyxvQkFBb0IsR0FBRyxHQUFHLENBQUM7UUFBQSxDQUFDO1FBRWpELElBQUksQ0FBQztZQUVELEtBQUssTUFBTSxFQUFFLElBQUksSUFBSSxDQUFDLFFBQVE7Z0JBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUM5RCxDQUFDO1FBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztZQUFBLEtBQUssQ0FBQyxvQkFBb0IsR0FBRyxHQUFHLENBQUM7UUFBQSxDQUFDO1FBRWpELElBQUksQ0FBQztZQUVELEtBQUssTUFBTSxFQUFFLElBQUksSUFBSSxDQUFDLFFBQVE7Z0JBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUM5RCxDQUFDO1FBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztZQUFBLEtBQUssQ0FBQyxvQkFBb0IsR0FBRyxHQUFHLENBQUM7UUFBQSxDQUFDO1FBRWpELElBQUksQ0FBQztZQUVELEtBQUssTUFBTSxFQUFFLElBQUksSUFBSSxDQUFDLFFBQVE7Z0JBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUM5RCxDQUFDO1FBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztZQUFBLEtBQUssQ0FBQyxvQkFBb0IsR0FBRyxHQUFHLENBQUM7UUFBQSxDQUFDO0lBRXJELENBQUM7Q0FDSjtBQXJJRCxnQ0FxSUM7Ozs7Ozs7Ozs7O0FDNU1ZOzs7QUFpRGIsa0RBb0JDO0FBbkVELHNHQUFxRTtBQStDckUsU0FBZ0IsbUJBQW1CLENBQUMsQ0FBMEI7O0lBQzFELElBQUksQ0FBQyxLQUFLLFNBQVM7UUFBRSxPQUFPO0lBQzVCLEtBQUssQ0FBQyxZQUFZO1VBQ1osZ0JBQWdCLEdBQUcsQ0FBQyxPQUFDLENBQUMsT0FBTyxtQ0FBTSxHQUFHLENBQUM7VUFDdkMsZ0JBQWdCLEdBQUcsQ0FBQyxPQUFDLENBQUMsU0FBUyxtQ0FBSSxHQUFHLENBQUM7VUFDdkMsZ0JBQWdCLEdBQUcsQ0FBQyxPQUFDLENBQUMsT0FBTyxtQ0FBTSxHQUFHLENBQUM7VUFDdkMsZ0JBQWdCLEdBQUcsQ0FBQyxPQUFDLENBQUMsS0FBSyxtQ0FBUSxHQUFHLENBQUM7VUFDdkMsZ0JBQWdCLEdBQUcsQ0FBQyxPQUFDLENBQUMsTUFBTSxtQ0FBTyxHQUFHLENBQUM7VUFDdkMsZ0JBQWdCLEdBQUcsQ0FBQyxPQUFDLENBQUMsS0FBSyxtQ0FBUSxHQUFHLENBQUM7VUFDdkMsZ0JBQWdCLEdBQUcsQ0FBQyxPQUFDLENBQUMsU0FBUyxtQ0FBSSxHQUFHLENBQUM7VUFDdkMsZ0JBQWdCLEdBQUcsQ0FBQyxPQUFDLENBQUMsU0FBUyxtQ0FBSSxHQUFHLENBQUM7VUFDdkMsZ0JBQWdCLEdBQUcsQ0FBQyxPQUFDLENBQUMsU0FBUyxtQ0FBSSxHQUFHLENBQUM7VUFDdkMsZ0JBQWdCLEdBQUcsQ0FBQyxPQUFDLENBQUMsU0FBUyxtQ0FBSSxHQUFHLENBQUM7VUFDdkMsZ0JBQWdCLEdBQUcsQ0FBQyxhQUFDLENBQUMsS0FBSywwQ0FBRSxPQUFPLG1DQUFNLEdBQUcsQ0FBQztVQUM5QyxnQkFBZ0IsR0FBRyxDQUFDLGFBQUMsQ0FBQyxLQUFLLDBDQUFFLFFBQVEsbUNBQUssR0FBRyxDQUFDO1VBQzlDLGdCQUFnQixHQUFHLENBQUMsYUFBQyxDQUFDLEtBQUssMENBQUUsSUFBSSxtQ0FBUyxHQUFHLENBQUM7VUFDOUMsZ0JBQWdCLEdBQUcsQ0FBQyxhQUFDLENBQUMsS0FBSywwQ0FBRSxJQUFJLG1DQUFTLEdBQUcsQ0FBQztVQUM5QyxnQkFBZ0IsR0FBRyxDQUFDLGFBQUMsQ0FBQyxLQUFLLDBDQUFFLE9BQU8sbUNBQU0sR0FBRyxDQUFDO1VBQzlDLElBQUksQ0FDVCxDQUFDO0FBQ04sQ0FBQztBQUVELE1BQWEsVUFBVTtJQWFuQixZQUFtQixDQUFpQjtRQUNoQyxJQUFJLENBQUMsT0FBTyxHQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDcEIsSUFBSSxDQUFDLE9BQU8sR0FBSyxDQUFDLENBQUMsQ0FBQztRQUNwQixJQUFJLENBQUMsS0FBSyxHQUFPLEVBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMsTUFBTSxHQUFNLEVBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMsS0FBSyxHQUFPLEVBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN2QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN2QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7UUFFNUIsSUFBSSxDQUFDLEtBQUssR0FBTyxJQUFJLCtCQUFjLEVBQUUsQ0FBQztRQUV0QyxJQUFJLENBQUMsS0FBSyxTQUFTO1lBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRU0sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFpQjtRQUMvQixPQUFPLElBQUksVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFTSxNQUFNO1FBQ1QsSUFBSSxTQUFpQixDQUFDO1FBQ3RCLElBQUksQ0FBQztZQUNELFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzdDLENBQUM7UUFBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1lBQ1gsU0FBUyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDekMsQ0FBQztRQUVELElBQUksQ0FBQztZQUNELE9BQU87Z0JBQ0gsT0FBTyxFQUFJLElBQUksQ0FBQyxPQUFPO2dCQUN2QixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVM7Z0JBQ3pCLE9BQU8sRUFBSSxJQUFJLENBQUMsT0FBTztnQkFDdkIsS0FBSyxFQUFNLElBQUksQ0FBQyxLQUFLO2dCQUNyQixNQUFNLEVBQUssSUFBSSxDQUFDLE1BQU07Z0JBQ3RCLEtBQUssRUFBTSxJQUFJLENBQUMsS0FBSztnQkFDckIsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRztnQkFDckMsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRztnQkFDckMsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRztnQkFDckMsU0FBUyxFQUFFLFNBQVM7Z0JBQ3BCLEtBQUssRUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRTthQUNqQztRQUNMLENBQUM7UUFBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1lBQ1gsS0FBSyxDQUFDLHlCQUF5QixHQUFHLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZDLE9BQU8sRUFBRSxDQUFDO1FBQ2QsQ0FBQztJQUNMLENBQUM7SUFFTSxNQUFNLENBQUMsQ0FBZ0I7O1FBQzFCLElBQUksQ0FBQyxPQUFPLEdBQUssT0FBQyxDQUFDLE9BQU8sbUNBQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUM3QyxJQUFJLENBQUMsU0FBUyxHQUFHLE9BQUMsQ0FBQyxTQUFTLG1DQUFJLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDL0MsSUFBSSxDQUFDLE9BQU8sR0FBSyxPQUFDLENBQUMsT0FBTyxtQ0FBTSxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQzdDLElBQUksQ0FBQyxLQUFLLEdBQU8sT0FBQyxDQUFDLEtBQUssbUNBQVEsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUMzQyxJQUFJLENBQUMsTUFBTSxHQUFNLE9BQUMsQ0FBQyxNQUFNLG1DQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDNUMsSUFBSSxDQUFDLEtBQUssR0FBTyxPQUFDLENBQUMsS0FBSyxtQ0FBUSxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQzNDLElBQUksQ0FBQyxDQUFDLFNBQVMsS0FBSyxTQUFTO1lBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQzs7WUFBTSxDQUFDLENBQUMsU0FBUyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDdkYsSUFBSSxDQUFDLENBQUMsU0FBUyxLQUFLLFNBQVM7WUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDOztZQUFNLENBQUMsQ0FBQyxTQUFTLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUN2RixJQUFJLENBQUMsQ0FBQyxTQUFTLEtBQUssU0FBUztZQUFFLElBQUksQ0FBQyxTQUFTLENBQUM7O1lBQU0sQ0FBQyxDQUFDLFNBQVMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQ3ZGLElBQUksQ0FBQyxDQUFDLFNBQVMsS0FBSyxTQUFTO1lBQUUsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFdEUsSUFBSSxDQUFDLENBQUMsS0FBSyxLQUFTLFNBQVM7WUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFMUQsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVNLEtBQUs7O1FBQ1IsS0FBSyxDQUFDLGdCQUFnQjtjQUNoQixnQkFBZ0IsR0FBRyxDQUFDLFVBQUksQ0FBQyxPQUFPLG1DQUFNLEdBQUcsQ0FBQztjQUMxQyxnQkFBZ0IsR0FBRyxDQUFDLFVBQUksQ0FBQyxTQUFTLG1DQUFJLEdBQUcsQ0FBQztjQUMxQyxnQkFBZ0IsR0FBRyxDQUFDLFVBQUksQ0FBQyxPQUFPLG1DQUFNLEdBQUcsQ0FBQztjQUMxQyxnQkFBZ0IsR0FBRyxDQUFDLFVBQUksQ0FBQyxLQUFLLG1DQUFRLEdBQUcsQ0FBQztjQUMxQyxnQkFBZ0IsR0FBRyxDQUFDLFVBQUksQ0FBQyxNQUFNLG1DQUFPLEdBQUcsQ0FBQztjQUMxQyxnQkFBZ0IsR0FBRyxDQUFDLFVBQUksQ0FBQyxLQUFLLG1DQUFRLEdBQUcsQ0FBQztjQUMxQyxnQkFBZ0IsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUMsSUFBRyxFQUFDLElBQUcsQ0FBQztjQUMzQyxnQkFBZ0IsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUMsSUFBRyxFQUFDLElBQUcsQ0FBQztjQUMzQyxnQkFBZ0IsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUMsSUFBRyxFQUFDLElBQUcsQ0FBQztjQUMzQyxnQkFBZ0IsR0FBRyxDQUFDLFVBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLG1DQUFTLEdBQUcsQ0FBQztjQUNqRCxnQkFBZ0IsR0FBRyxDQUFDLFVBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLG1DQUFTLEdBQUcsQ0FBQztjQUNqRCxnQkFBZ0IsR0FBRyxDQUFDLFVBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLG1DQUFJLEdBQUcsQ0FBQztjQUNqRCxnQkFBZ0IsR0FBRyxDQUFDLFVBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLG1DQUFJLEdBQUcsQ0FBQztjQUNqRCxnQkFBZ0IsR0FBRyxDQUFDLFVBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLG1DQUFLLEdBQUcsQ0FBQztjQUNqRCxJQUFJLENBQ1QsQ0FBQztJQUNOLENBQUM7Q0FDSjtBQWxHRCxnQ0FrR0M7Ozs7Ozs7Ozs7O0FDektZOzs7QUE0QmIsMENBc0JDO0FBN0NELG9GQUFtRDtBQUNuRCw4RUFBaUQ7QUFHakQsMEZBQXFEO0FBSXJELHFGQUF3RDtBQWV4RCxTQUFnQixlQUFlLENBQUMsQ0FBc0I7O0lBQ2xELElBQUksQ0FBQyxLQUFLLFNBQVM7UUFBRSxPQUFPO0lBQzVCLEtBQUssQ0FBQyxZQUFZO1VBQ1osV0FBVyxHQUFPLENBQUMsT0FBQyxDQUFDLEVBQUUsbUNBQVcsR0FBRyxDQUFDO1VBQ3RDLGNBQWMsR0FBSSxDQUFDLE9BQUMsQ0FBQyxPQUFPLG1DQUFNLEdBQUcsQ0FBQztVQUN0QyxXQUFXLEdBQU8sQ0FBQyxPQUFDLENBQUMsSUFBSSxtQ0FBUyxHQUFHLENBQUM7VUFDdEMsYUFBYSxHQUFLLENBQUMsT0FBQyxDQUFDLE9BQU8sbUNBQU0sR0FBRyxDQUFDO1VBQ3RDLFVBQVUsR0FBUSxDQUFDLGFBQUMsQ0FBQyxNQUFNLDBDQUFFLE9BQU8sbUNBQU8sR0FBRyxDQUFDO1VBQy9DLFVBQVUsR0FBUSxDQUFDLGFBQUMsQ0FBQyxNQUFNLDBDQUFFLElBQUksbUNBQVUsR0FBRyxDQUFDO1VBQy9DLFVBQVUsR0FBUSxDQUFDLGFBQUMsQ0FBQyxNQUFNLDBDQUFFLElBQUksbUNBQVUsR0FBRyxDQUFDO1VBQy9DLFVBQVUsR0FBUSxDQUFDLGFBQUMsQ0FBQyxNQUFNLDBDQUFFLE9BQU8sbUNBQU8sR0FBRyxDQUFDO1VBQy9DLFdBQVcsR0FBTyxDQUFDLG1CQUFDLENBQUMsTUFBTSwwQ0FBRSxPQUFPLDBDQUFFLENBQUMsbUNBQUksR0FBRyxDQUFDO1VBQy9DLFdBQVcsR0FBTyxDQUFDLG1CQUFDLENBQUMsTUFBTSwwQ0FBRSxPQUFPLDBDQUFFLENBQUMsbUNBQUksR0FBRyxDQUFDO1VBQy9DLFdBQVcsR0FBTyxDQUFDLG1CQUFDLENBQUMsTUFBTSwwQ0FBRSxPQUFPLDBDQUFFLENBQUMsbUNBQUksR0FBRyxDQUFDO1VBQy9DLFdBQVcsR0FBTyxDQUFDLG1CQUFDLENBQUMsTUFBTSwwQ0FBRSxPQUFPLDBDQUFFLENBQUMsbUNBQUksR0FBRyxDQUFDO1VBQy9DLFVBQVUsR0FBUSxDQUFDLE9BQUMsQ0FBQyxJQUFJLG1DQUFVLENBQUMsQ0FBRTtVQUV0QyxZQUFZLEdBQU0sQ0FBQyxhQUFDLENBQUMsTUFBTSwwQ0FBRSxNQUFNLG1DQUFJLEdBQUcsQ0FBQztVQUMzQyxJQUFJLENBQ1QsQ0FBQztBQUdOLENBQUM7QUFHRCxNQUFhLE1BQU07SUFDUixNQUFNLENBQUMsTUFBTSxDQUFDLENBQWE7UUFDOUIsT0FBTyxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBQ00sTUFBTSxDQUFDLENBQWEsSUFBVyxPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQztJQWMvRCxZQUFtQixDQUFhO1FBRTVCLElBQUksQ0FBQyxLQUFLLEdBQVEsQ0FBQyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxPQUFPLEdBQUssV0FBVyxDQUFDO1FBQzdCLElBQUksQ0FBQyxPQUFPLEdBQUssV0FBVyxHQUFHLHNCQUFTLEdBQUUsQ0FBQztRQUMzQyxJQUFJLENBQUMsT0FBTyxHQUFNLENBQUMsQ0FBQztRQUVwQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksOEJBQWlCLENBQUMsSUFBSSxDQUFrQixDQUFDO1FBQzNELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxtQkFBUSxFQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFFaEMsSUFBSSxDQUFDLElBQUksR0FBSyxDQUFDLENBQUM7UUFFaEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDekIsSUFBSSxDQUFDLEtBQUssU0FBUztZQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUNNLE9BQU8sQ0FBQyxHQUFlO1FBQzFCLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDckIsQ0FBQztJQUVNLEdBQUcsS0FBYSxPQUFPLElBQUksQ0FBQyxPQUFPLEdBQUM7SUFFcEMsTUFBTSxDQUFDLENBQVU7O1FBQ3BCLE1BQU0sSUFBSSxHQUFHLFVBQUksQ0FBQyxNQUFNLDBDQUFFLEtBQUssRUFBRSxDQUFDO1FBQ2xDLE9BQU8sVUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsbUNBQUksS0FBSyxDQUFDO0lBQ3BDLENBQUM7SUFFTSxJQUFJLEtBQThCLE9BQU8sSUFBSSxDQUFDLE1BQU0sR0FBQztJQUNyRCxJQUFJO1FBQ1AsT0FBTyxJQUFJLENBQUMsTUFBTTtJQUN0QixDQUFDO0lBRU0sVUFBVSxLQUFhLE9BQU8sSUFBSSxHQUFDO0lBR25DLElBQUk7UUFDUCxNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7UUFDMUIsS0FBSyxJQUFJLEVBQUUsSUFBSSxJQUFJLENBQUMsTUFBTTtZQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3ZELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFDTSxVQUFVO1FBQ2IsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUNNLFFBQVEsQ0FBQyxJQUFZO1FBQ3hCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDO0lBQ25DLENBQUM7SUFDTSxRQUFRLENBQUMsSUFBWTtRQUN4QixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVNLE9BQU87UUFDVixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDdkIsQ0FBQztJQUNNLE9BQU8sQ0FBQyxHQUFtQjs7UUFDOUIsT0FBQyxJQUFJLENBQUMsTUFBTSxvQ0FBWCxJQUFJLENBQUMsTUFBTSxHQUFLLElBQUksbUJBQVEsRUFBRSxFQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFFTSxNQUFNO1FBQ1QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2hDLENBQUM7SUFrQ00sTUFBTTs7UUFDVCxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFFZixNQUFNLFdBQVcsR0FBZ0IsRUFBRSxDQUFDO1FBQ3BDLEtBQUssSUFBSSxFQUFFLElBQUksSUFBSSxDQUFDLE1BQU07WUFBRSxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUV2RSxPQUFPO1lBQ0gsRUFBRSxFQUFTLElBQUksQ0FBQyxLQUFLO1lBQ3JCLElBQUksRUFBTyxJQUFJLENBQUMsT0FBTztZQUN2QixPQUFPLEVBQUksSUFBSSxDQUFDLE9BQU87WUFDdkIsT0FBTyxFQUFJLElBQUksQ0FBQyxPQUFPO1lBQ3ZCLE1BQU0sRUFBSyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRTtZQUMvQixJQUFJLEVBQU8sSUFBSSxDQUFDLElBQUk7WUFFcEIsTUFBTSxFQUFLLFdBQVc7WUFDdEIsTUFBTSxFQUFLLElBQUksQ0FBQyxXQUFXO1lBQzNCLElBQUksRUFBTyxnQkFBSSxDQUFDLE1BQU0sMENBQUUsTUFBTSxFQUFFLG1DQUFJLEVBQUU7U0FDekMsQ0FBQztJQUNOLENBQUM7SUFDTSxNQUFNLENBQUMsQ0FBc0I7UUFDaEMsSUFBSSxDQUFDLEtBQUssU0FBUztZQUFHLE9BQU8sSUFBSSxDQUFDO1FBRWxDLElBQUksQ0FBQyxDQUFDLEVBQUUsS0FBTyxTQUFTO1lBQUssSUFBSSxDQUFDLEtBQUssR0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ3JELElBQUksQ0FBQyxDQUFDLElBQUksS0FBSyxTQUFTO1lBQUssSUFBSSxDQUFDLE9BQU8sR0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ3ZELElBQUksQ0FBQyxDQUFDLE9BQU8sS0FBSyxTQUFTO1lBQUUsSUFBSSxDQUFDLE9BQU8sR0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDO1FBQzFELElBQUksQ0FBQyxDQUFDLE9BQU8sS0FBSyxTQUFTO1lBQUUsSUFBSSxDQUFDLE9BQU8sR0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDO1FBQzFELElBQUksQ0FBQyxDQUFDLE1BQU0sS0FBSyxTQUFTO1lBQUcsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDO1FBRXpELElBQUksQ0FBQyxDQUFDLE1BQU0sS0FBSyxTQUFTO1lBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzFELElBQUksQ0FBQyxDQUFDLElBQUksS0FBTyxTQUFTO1lBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBR2hELElBQUksQ0FBQyxDQUFDLE1BQU0sS0FBSyxTQUFTLEVBQUcsQ0FBQztZQUMxQixJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztZQUNqQixLQUFLLE1BQU0sU0FBUyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDL0IsTUFBTSxJQUFJLEdBQUcsSUFBSSxlQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ25DLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDO1lBQ25DLENBQUM7UUFDTCxDQUFDO1FBT0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUNNLE1BQU0sQ0FBQyxVQUFVLENBQUMsUUFBa0I7UUFDdkMsTUFBTSxhQUFhLEdBQWdCLEVBQUUsQ0FBQztRQUN0QyxLQUFLLElBQUksSUFBSSxJQUFJLFFBQVEsRUFBRSxDQUFDO1lBQ3hCLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDdEMsQ0FBQztRQUNELE9BQU8sYUFBYSxDQUFDO0lBQ3pCLENBQUM7SUFDTSxNQUFNLENBQUMsVUFBVSxDQUFDLGFBQTBCO1FBQy9DLE1BQU0sUUFBUSxHQUFhLEVBQUUsQ0FBQztRQUM5QixLQUFLLElBQUksU0FBUyxJQUFJLGFBQWEsRUFBRSxDQUFDO1lBQ2xDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLE1BQU0sRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFDcEQsQ0FBQztRQUNELE9BQU8sUUFBUSxDQUFDO0lBQ3BCLENBQUM7SUFFTSxLQUFLOztRQUNSLEtBQUssQ0FBQyxZQUFZO2NBQ1osV0FBVyxHQUFPLENBQUMsVUFBSSxDQUFDLEtBQUssbUNBQWUsR0FBRyxDQUFDO2NBQ2hELGNBQWMsR0FBSSxDQUFDLFVBQUksQ0FBQyxPQUFPLG1DQUFhLEdBQUcsQ0FBQztjQUNoRCxXQUFXLEdBQU8sQ0FBQyxVQUFJLENBQUMsT0FBTyxtQ0FBYSxHQUFHLENBQUM7Y0FDaEQsYUFBYSxHQUFLLENBQUMsVUFBSSxDQUFDLE9BQU8sbUNBQWEsR0FBRyxDQUFDO2NBQ2hELFVBQVUsR0FBUSxDQUFDLFVBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLG1DQUFRLEdBQUcsQ0FBQztjQUNoRCxVQUFVLEdBQVEsQ0FBQyxVQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxtQ0FBSSxHQUFHLENBQUM7Y0FDckQsVUFBVSxHQUFRLENBQUMsVUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsbUNBQVEsR0FBRyxDQUFDO2NBQ3JELFVBQVUsR0FBUSxDQUFDLFVBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLG1DQUFTLEdBQUcsQ0FBQztjQUNyRCxXQUFXLEdBQU8sQ0FBQyxVQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsbUNBQUksR0FBRyxDQUFDO2NBQ2hELFdBQVcsR0FBTyxDQUFDLFVBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxtQ0FBSSxHQUFHLENBQUM7Y0FDaEQsV0FBVyxHQUFPLENBQUMsVUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLG1DQUFJLEdBQUcsQ0FBQztjQUNoRCxXQUFXLEdBQU8sQ0FBQyxVQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxtQ0FBTSxHQUFHLENBQUM7Y0FDaEQsVUFBVSxHQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFJLENBQUMsSUFBSSxtQ0FBSSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUM7Y0FDdkQsWUFBWSxHQUFNLENBQUMsZ0JBQUksQ0FBQyxNQUFNLDBDQUFFLE1BQU0sbUNBQUksR0FBRyxDQUFDO2NBQzlDLElBQUksQ0FDVCxDQUFDO0lBQ04sQ0FBQztJQUNNLFVBQVU7UUFFYixLQUFLLE1BQU0sRUFBRSxJQUFJLElBQUksQ0FBQyxNQUFNO1lBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUMxRCxDQUFDO0NBQ0o7QUFyTUQsd0JBcU1DOzs7Ozs7Ozs7OztBQzFQWTs7O0FBRWIsMEZBQWlEO0FBQ2pELDhFQUE2QztBQUk3QyxNQUFhLGlCQUFpQjtJQUNsQixNQUFNLENBQUMsTUFBTSxDQUFDLENBQWE7UUFDL0IsTUFBTSxJQUFJLEdBQUcsSUFBSSxlQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0IsT0FBTyxJQUFJLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFDTyxNQUFNLENBQUMsQ0FBYSxJQUFrQixPQUFPLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBQztJQUtqRixZQUFvQixJQUFZO1FBRHhCLGFBQVEsR0FBWSxFQUFFLENBQUM7UUFFM0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7SUFDeEIsQ0FBQztJQUVNLEtBQUssS0FBb0IsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUM7SUFDL0MsU0FBUyxDQUFDLEtBQWEsSUFBUyxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQyxFQUFDO0lBQ3ZELE1BQU07UUFDVCxRQUFRLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQztZQUNsQyxLQUFLLHdCQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxHQUFHLENBQUM7WUFDL0IsS0FBSyx3QkFBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sR0FBRyxDQUFDO1lBQy9CLEtBQUssd0JBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEdBQUcsQ0FBQztZQUMvQixLQUFLLHdCQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxHQUFHLENBQUM7WUFDL0IsT0FBTyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUM7UUFDekIsQ0FBQztJQUNMLENBQUM7SUFDTSxPQUFPLEtBQVksT0FBTyxLQUFLLEdBQUM7SUFDaEMsTUFBTSxDQUFDLElBQVksRUFBRSxJQUFZLElBQVMsQ0FBQztJQUMzQyxLQUFLLEtBQWMsT0FBTyxHQUFHLEdBQUM7SUFDOUIsS0FBSyxLQUFjLE9BQU8sR0FBRyxHQUFDO0lBQzlCLEtBQUssS0FBYyxPQUFPLEdBQUcsR0FBQztJQUM5QixLQUFLLEtBQW1CLE9BQU8sSUFBSSxHQUFDO0lBQ3BDLEtBQUssS0FBbUIsT0FBTyxJQUFJLEdBQUM7SUFDcEMsS0FBSyxLQUFtQixPQUFPLElBQUksR0FBQztJQUNwQyxLQUFLLEtBQW1CLE9BQU8sSUFBSSxHQUFDO0lBQ3BDLEtBQUssS0FBbUIsT0FBTyxJQUFJLEdBQUM7SUFDcEMsS0FBSyxLQUFtQixPQUFPLElBQUksR0FBQztJQUVwQyxNQUFNLEtBQXNCLE9BQU8sRUFBQyxLQUFLLEVBQUUsaUJBQWlCLEVBQUMsR0FBQztJQUM5RCxNQUFNLENBQUMsQ0FBNkIsSUFBa0IsT0FBTyxJQUFxQixHQUFDO0NBQzdGO0FBdkNELDhDQXVDQzs7Ozs7Ozs7Ozs7QUM5Q1k7OztBQUViLDBGQUFpRTtBQUNqRSxzR0FBcUU7QUFRckUsTUFBYSxRQUFTLFNBQVEsK0JBQWM7SUFDeEMsWUFBWSxDQUFlO1FBQ3ZCLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNiLENBQUM7SUFDTSxLQUFLLEtBQVksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBQztJQUN2QyxLQUFLLEtBQVksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBQztJQUN2QyxLQUFLLEtBQVksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBQztJQUV2QyxLQUFLLENBQUMsQ0FBUyxJQUFTLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBQztJQUMzQyxLQUFLLENBQUMsQ0FBUyxJQUFTLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBQztJQUMzQyxLQUFLLENBQUMsQ0FBUyxJQUFTLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBQztJQUUzQyxTQUFTLENBQ1osS0FBZSxFQUNmLEdBQWEsRUFDYixHQUFpQjtRQUVqQixJQUFJLENBQUMsT0FBTyxDQUFFLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQzNCLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDaEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUVoQyxJQUFJLEdBQUcsS0FBSyxTQUFTO1lBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN6QyxJQUFJLEdBQUcsS0FBSyxTQUFTLEVBQUUsQ0FBQztZQUNwQixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLENBQUM7SUFDTCxDQUFDO0lBR00sVUFBVTtRQUNiLE9BQU87WUFDSCxRQUFRLEVBQUUsSUFBSTtZQUNkLElBQUksRUFBRSxNQUFNO1lBQ1osSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDdEIsSUFBSSxFQUFFLEdBQUUsRUFBRSxHQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUFDO1lBQzdCLElBQUksRUFBRSxHQUFFLEVBQUUsR0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBQztTQUN4QixDQUFDO0lBQ1QsQ0FBQztJQUNNLFVBQVU7UUFDYixPQUFPO1lBQ0gsUUFBUSxFQUFFLElBQUk7WUFDZCxJQUFJLEVBQUUsTUFBTTtZQUNaLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ3RCLElBQUksRUFBRSxHQUFFLEVBQUUsR0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsRUFBQztZQUM3QixJQUFJLEVBQUUsR0FBRSxFQUFFLEdBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUM7U0FDM0IsQ0FBQztJQUNOLENBQUM7SUFFTSxVQUFVO1FBQ2IsT0FBTztZQUNILFFBQVEsRUFBRSxJQUFJO1lBQ2QsSUFBSSxFQUFFLE1BQU07WUFDWixJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUN0QixJQUFJLEVBQUUsR0FBRSxFQUFFLEdBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUM7WUFDN0IsSUFBSSxFQUFFLEdBQUUsRUFBRSxHQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFDO1NBQ3hCLENBQUM7SUFDVCxDQUFDO0lBQ00sVUFBVTtRQUNiLE9BQU87WUFDSCxRQUFRLEVBQUUsSUFBSTtZQUNkLElBQUksRUFBRSxNQUFNO1lBQ1osSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDdEIsSUFBSSxFQUFFLEdBQUUsRUFBRSxHQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUFDO1lBQzdCLElBQUksRUFBRSxHQUFFLEVBQUUsR0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBQztTQUMzQixDQUFDO0lBQ04sQ0FBQztJQUNNLFdBQVc7UUFDZCxPQUFPO1lBQ0gsUUFBUSxFQUFFLElBQUk7WUFDZCxJQUFJLEVBQUUsTUFBTTtZQUNaLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ25CLElBQUksRUFBRSxHQUFFLEVBQUUsR0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBQztZQUMxQixJQUFJLEVBQUUsR0FBRSxFQUFFLEdBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUM7U0FDM0IsQ0FBQztJQUNOLENBQUM7SUFDTSxXQUFXO1FBQ2QsT0FBTztZQUNILFFBQVEsRUFBRSxJQUFJO1lBQ2QsSUFBSSxFQUFFLE1BQU07WUFDWixJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNuQixJQUFJLEVBQUUsR0FBRSxFQUFFLEdBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUM7WUFDMUIsSUFBSSxFQUFFLEdBQUUsRUFBRSxHQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFDO1NBQzNCLENBQUM7SUFDTixDQUFDO0lBRU0sU0FBUztRQUNaLE9BQU87WUFDSCxRQUFRLEVBQUUsSUFBSTtZQUNkLElBQUksRUFBRSxJQUFJO1lBQ1YsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDckIsSUFBSSxFQUFFLEdBQUUsRUFBRSxHQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUFDO1lBQzdCLElBQUksRUFBRSxHQUFFLEVBQUUsR0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBQztTQUMzQixDQUFDO0lBQ04sQ0FBQztJQUNNLFdBQVc7UUFDZCxPQUFPO1lBQ0gsUUFBUSxFQUFFLElBQUk7WUFDZCxJQUFJLEVBQUUsTUFBTTtZQUNaLElBQUksRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ3ZCLElBQUksRUFBRSxHQUFFLEVBQUUsR0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsRUFBQztZQUMvQixJQUFJLEVBQUUsR0FBRSxFQUFFLEdBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUM7U0FDM0IsQ0FBQztJQUNOLENBQUM7SUFFTSxTQUFTO1FBQ1osSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFDTSxXQUFXO1FBQ2QsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFTSxJQUFJO1FBQ1AsT0FBTztJQUNYLENBQUM7SUFHTSxTQUFTO1FBQ1osT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBQ00sU0FBUztRQUNaLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUNNLFNBQVM7UUFDWixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUNNLFNBQVM7UUFDWixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFDTSxTQUFTO1FBQ1osT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFDTSxTQUFTO1FBQ1osSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBQ00sU0FBUztRQUNaLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUNNLFNBQVM7UUFDWixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFDTSxRQUFRO1FBQ1gsTUFBTSxDQUFDLEdBQUcsSUFBSSx1QkFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN2QyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDTixPQUFPLENBQUMsQ0FBQztJQUNiLENBQUM7SUFDTSxRQUFRO1FBQ1gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBQ00sVUFBVTtRQUNiLE1BQU0sQ0FBQyxHQUFHLElBQUksdUJBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdkMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ04sT0FBTyxDQUFDLENBQUM7SUFDYixDQUFDO0lBQ00sVUFBVTtRQUNiLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUNTLFlBQVksQ0FBQyxRQUFnQixFQUFFLFFBQWdCO1FBQ3JELE1BQU0sQ0FBQyxHQUFHLElBQUksdUJBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdkMsSUFBSSxRQUFRLEtBQUssQ0FBQyxFQUFFLENBQUM7WUFDakIsUUFBUSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDO2dCQUNyQixLQUFLLHdCQUFXLENBQUMsQ0FBQztvQkFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLFFBQVEsQ0FBQztvQkFBQSxNQUFNO2dCQUMxQyxLQUFLLHdCQUFXLENBQUMsQ0FBQztvQkFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLFFBQVEsQ0FBQztvQkFBQSxNQUFNO2dCQUMxQyxLQUFLLHdCQUFXLENBQUMsQ0FBQztvQkFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLFFBQVEsQ0FBQztvQkFBQSxNQUFNO2dCQUMxQyxLQUFLLHdCQUFXLENBQUMsQ0FBQztvQkFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLFFBQVEsQ0FBQztvQkFBQSxNQUFNO1lBQzlDLENBQUM7UUFDTCxDQUFDO1FBQ0QsSUFBSSxRQUFRLEtBQUssQ0FBQyxFQUFFLENBQUM7WUFDakIsUUFBUSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDO2dCQUNyQixLQUFLLHdCQUFXLENBQUMsQ0FBQztvQkFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLFFBQVEsQ0FBQztvQkFBQSxNQUFNO2dCQUMxQyxLQUFLLHdCQUFXLENBQUMsQ0FBQztvQkFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLFFBQVEsQ0FBQztvQkFBQSxNQUFNO2dCQUMxQyxLQUFLLHdCQUFXLENBQUMsQ0FBQztvQkFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLFFBQVEsQ0FBQztvQkFBQSxNQUFNO2dCQUMxQyxLQUFLLHdCQUFXLENBQUMsQ0FBQztvQkFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLFFBQVEsQ0FBQztvQkFBQSxNQUFNO1lBQzlDLENBQUM7UUFDTCxDQUFDO1FBQ0QsT0FBTyxDQUFDLENBQUM7SUFDYixDQUFDO0lBQ00sVUFBVSxDQUFDLEtBQWEsRUFBRSxLQUFZLEVBQUUsS0FBYSxDQUFDO1FBQ3pELElBQUksUUFBUSxHQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQy9CLElBQUksUUFBUSxHQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQy9CLElBQUksUUFBUSxHQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNwQyxRQUFRLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDckIsS0FBSyx3QkFBVyxDQUFDLENBQUM7Z0JBQ2QsUUFBUSxJQUFJLEtBQUssQ0FBQztnQkFDbEIsUUFBUSxJQUFJLEtBQUssQ0FBQztnQkFDbEIsTUFBTTtZQUNWLEtBQUssd0JBQVcsQ0FBQyxDQUFDO2dCQUNkLFFBQVEsSUFBSSxLQUFLLENBQUM7Z0JBQ2xCLFFBQVEsSUFBSSxLQUFLLENBQUM7Z0JBQ2xCLE1BQU07WUFDVixLQUFLLHdCQUFXLENBQUMsQ0FBQztnQkFDZCxRQUFRLElBQUksS0FBSyxDQUFDO2dCQUNsQixRQUFRLElBQUksS0FBSyxDQUFDO2dCQUNsQixNQUFNO1lBQ1YsS0FBSyx3QkFBVyxDQUFDLENBQUM7Z0JBQ2QsUUFBUSxJQUFJLEtBQUssQ0FBQztnQkFDbEIsUUFBUSxJQUFJLEtBQUssQ0FBQztnQkFDbEIsTUFBTTtRQUNkLENBQUM7UUFDRCxPQUFPLElBQUksdUJBQVUsQ0FBQyxFQUFDLENBQUMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUM7SUFDdEYsQ0FBQztJQUNNLE1BQU07UUFDVCxRQUFRLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDckIsS0FBSyx3QkFBVyxDQUFDLENBQUM7Z0JBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsd0JBQVcsQ0FBQyxDQUFDLENBQUM7Z0JBQUEsTUFBTTtZQUN6RCxLQUFLLHdCQUFXLENBQUMsQ0FBQztnQkFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyx3QkFBVyxDQUFDLENBQUMsQ0FBQztnQkFBQSxNQUFNO1lBQ3pELEtBQUssd0JBQVcsQ0FBQyxDQUFDO2dCQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLHdCQUFXLENBQUMsQ0FBQyxDQUFDO2dCQUFBLE1BQU07WUFDekQsS0FBSyx3QkFBVyxDQUFDLENBQUM7Z0JBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsd0JBQVcsQ0FBQyxDQUFDLENBQUM7Z0JBQUEsTUFBTTtRQUM3RCxDQUFDO0lBQ0wsQ0FBQztJQUNNLE1BQU07UUFDVCxRQUFRLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDckIsS0FBSyx3QkFBVyxDQUFDLENBQUM7Z0JBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsd0JBQVcsQ0FBQyxDQUFDLENBQUM7Z0JBQUEsTUFBTTtZQUN6RCxLQUFLLHdCQUFXLENBQUMsQ0FBQztnQkFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyx3QkFBVyxDQUFDLENBQUMsQ0FBQztnQkFBQSxNQUFNO1lBQ3pELEtBQUssd0JBQVcsQ0FBQyxDQUFDO2dCQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLHdCQUFXLENBQUMsQ0FBQyxDQUFDO2dCQUFBLE1BQU07WUFDekQsS0FBSyx3QkFBVyxDQUFDLENBQUM7Z0JBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsd0JBQVcsQ0FBQyxDQUFDLENBQUM7Z0JBQUEsTUFBTTtRQUM3RCxDQUFDO0lBQ0wsQ0FBQztJQUNNLE1BQU07UUFDVCxRQUFRLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDckIsS0FBSyx3QkFBVyxDQUFDLENBQUM7Z0JBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsd0JBQVcsQ0FBQyxDQUFDLENBQUM7Z0JBQUEsTUFBTTtZQUN6RCxLQUFLLHdCQUFXLENBQUMsQ0FBQztnQkFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyx3QkFBVyxDQUFDLENBQUMsQ0FBQztnQkFBQSxNQUFNO1lBQ3pELEtBQUssd0JBQVcsQ0FBQyxDQUFDO2dCQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLHdCQUFXLENBQUMsQ0FBQyxDQUFDO2dCQUFBLE1BQU07WUFDekQsS0FBSyx3QkFBVyxDQUFDLENBQUM7Z0JBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsd0JBQVcsQ0FBQyxDQUFDLENBQUM7Z0JBQUEsTUFBTTtRQUM3RCxDQUFDO0lBQ0wsQ0FBQztJQUNNLE1BQU07UUFDVCxNQUFNLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFpQixDQUFDO1FBQ3hDLE9BQU8sQ0FBQyxDQUFDO0lBQ2IsQ0FBQztJQUNNLE1BQU0sQ0FBQyxDQUFjO1FBQ3hCLElBQUksQ0FBQyxLQUFLLFNBQVM7WUFBRSxPQUFPLElBQUksQ0FBQztRQUNqQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2hCLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7Q0FDSjtBQXhPRCw0QkF3T0M7Ozs7Ozs7Ozs7O0FDblBZOzs7QUFFYixxRkFBMEM7QUFVMUMsTUFBYSxNQUFNO0lBR2YsWUFBbUIsUUFBZ0IsQ0FBQyxFQUFFLElBQWE7UUFDL0MsSUFBSSxLQUFLLEdBQUcsQ0FBQztZQUFFLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDekIsSUFBSSxLQUFLLEdBQUcsQ0FBQyxLQUFLLENBQUM7WUFBRSxLQUFLLEVBQUUsQ0FBQztRQUU3QixNQUFNLEtBQUssR0FBVyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDbkMsTUFBTSxLQUFLLEdBQVcsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ25DLE1BQU0sS0FBSyxHQUFXLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNuQyxNQUFNLEtBQUssR0FBVyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFFbkMsTUFBTSxRQUFRLEdBQVcsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBSTdDLE1BQU0saUJBQWlCLEdBQVcsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBSTFELE1BQU0sZ0JBQWdCLEdBQVksQ0FBQyxRQUFRLEdBQUcsaUJBQWlCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBSTdFLE1BQU0sbUJBQW1CLEdBQWEsSUFBSSxLQUFLLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBRTNELG1CQUFtQixDQUFDLEtBQUssQ0FBQyxHQUFHLGlCQUFpQixHQUFHLENBQUMsQ0FBQztRQUNuRCxLQUFLLElBQUksQ0FBQyxHQUFHLEtBQUssR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ2xDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxHQUFHLG1CQUFtQixDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxnQkFBZ0IsQ0FBQztRQUMzRSxDQUFDO1FBSUQsTUFBTSxpQkFBaUIsR0FBVyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsR0FBRyxLQUFLLENBQUM7UUFLMUQsTUFBTSxnQkFBZ0IsR0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLEdBQUcsaUJBQWlCLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztRQUc1RSxNQUFNLGdCQUFnQixHQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssR0FBRyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBSTVFLE1BQU0sSUFBSSxHQUFlLElBQUksS0FBSyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztRQUM5QyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ2pDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLEtBQUssQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDL0IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFDakMsTUFBTSxJQUFJLEdBQUcsUUFBUSxHQUFHLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDakUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHO29CQUNULEtBQUssRUFBRSxtQkFBTSxFQUFDLElBQUksRUFBRSxDQUFDLENBQUM7b0JBQ3RCLEtBQUssRUFBRSxtQkFBTSxFQUFDLElBQUksR0FBSSxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO29CQUNwRCxLQUFLLEVBQUUsbUJBQU0sRUFBQyxLQUFLLEdBQUcsZ0JBQWdCLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztvQkFDOUMsS0FBSyxFQUFFLG1CQUFNLEVBQUMsS0FBSyxHQUFHLGdCQUFnQixHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7aUJBQ2pEO1lBQ0wsQ0FBQztRQUNMLENBQUM7UUFFRCxJQUFJLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUNmLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO0lBQ2xCLENBQUM7SUFDTSxTQUFTO1FBQ1osT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ2xCLENBQUM7SUFDTSxHQUFHLENBQUMsS0FBYSxFQUFFLE1BQWM7UUFDcEMsTUFBTSxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNoQyxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxDQUFDO0lBQzFDLENBQUM7Q0FDSjtBQXJFRCx3QkFxRUM7Ozs7Ozs7Ozs7O0FDakZZOzs7QUFJQSxtQkFBVyxHQUFHO0lBQ3ZCLENBQUMsRUFBSSxDQUFDO0lBQ04sQ0FBQyxFQUFJLENBQUM7SUFDTixDQUFDLEVBQUksQ0FBQztJQUNOLENBQUMsRUFBSSxDQUFDO0lBQ04sQ0FBQyxFQUFHLEVBQUU7SUFDTixHQUFHLEVBQUUsQ0FBQztDQUNBLENBQUM7QUFHQSxzQkFBYyxHQUFHO0lBQ3hCLENBQUMsRUFBRyxHQUFHO0lBQ1AsQ0FBQyxFQUFHLEdBQUc7SUFDUCxDQUFDLEVBQUcsR0FBRztJQUNQLENBQUMsRUFBRyxHQUFHO0lBQ1AsRUFBRSxFQUFFLEdBQUc7Q0FDVjs7Ozs7Ozs7Ozs7QUNwQlk7OztBQW9CSSxnQkFBUSxHQUE0QjtJQUM3QyxLQUFLLEVBQUksQ0FBQztJQUNWLEtBQUssRUFBSSxDQUFDO0lBQ1YsS0FBSyxFQUFJLENBQUM7SUFDVixLQUFLLEVBQUksQ0FBQztJQUNWLEtBQUssRUFBSSxDQUFDO0lBQ1YsS0FBSyxFQUFJLENBQUM7SUFDVixLQUFLLEVBQUksQ0FBQztJQUNWLEtBQUssRUFBSSxDQUFDO0lBQ1YsS0FBSyxFQUFFLEdBQUc7Q0FDSixDQUFDO0FBR0Usa0JBQVUsR0FBOEI7SUFDakQsQ0FBQyxFQUFJLGdCQUFRLENBQUMsS0FBSztJQUNuQixDQUFDLEVBQUksZ0JBQVEsQ0FBQyxLQUFLO0lBQ25CLENBQUMsRUFBSSxnQkFBUSxDQUFDLEtBQUs7SUFDbkIsQ0FBQyxFQUFJLGdCQUFRLENBQUMsS0FBSztJQUNuQixDQUFDLEVBQUksZ0JBQVEsQ0FBQyxLQUFLO0lBQ25CLENBQUMsRUFBSSxnQkFBUSxDQUFDLEtBQUs7SUFDbkIsQ0FBQyxFQUFJLGdCQUFRLENBQUMsS0FBSztJQUNuQixDQUFDLEVBQUksZ0JBQVEsQ0FBQyxLQUFLO0lBQ25CLEdBQUcsRUFBRSxnQkFBUSxDQUFDLEtBQUs7Q0FDYixDQUFDOzs7Ozs7Ozs7Ozs7OztBQ3RDZixNQUFhLFFBQVE7SUFJakIsWUFBbUIsQ0FBTztRQUN0QixJQUFJLE9BQU8sQ0FBQyxLQUFLLFdBQVcsRUFBRSxDQUFDO1lBQzNCLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBWSxDQUFDO1lBQ3RCLE9BQU87UUFDWCxDQUFDO1FBQ0QsSUFBSSxPQUFPLENBQUMsS0FBSyxRQUFRLEVBQUUsQ0FBQztZQUN4QixJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzVCLENBQUM7UUFDRCxJQUFJLE9BQU8sQ0FBQyxLQUFLLFFBQVEsRUFBRSxDQUFDO1lBQ3hCLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBVyxDQUFDO1lBQ3JCLE9BQU87UUFDWCxDQUFDO1FBQ0QsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFZLENBQUM7UUFDdEIsT0FBTztJQUNYLENBQUM7SUFDTSxRQUFRO1FBQ1gsTUFBTSxRQUFRLEdBQWEsSUFBSSxLQUFpQixDQUFDO1FBQ2pELEtBQUssSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQ3JCLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdkIsQ0FBQztRQUNELE9BQU8sUUFBUSxDQUFDO0lBQ3BCLENBQUM7SUFDTSxHQUFHLENBQUUsR0FBVztRQUNuQixJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDaEIsSUFBSyxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssUUFBUSxFQUFFLENBQUM7Z0JBQ25DLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNsQyxDQUFDO1lBQ0QsSUFBSyxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssUUFBUSxFQUFFLENBQUM7Z0JBQ25DLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDdkMsQ0FBQztZQUNELE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQVcsQ0FBQztRQUNqQyxDQUFDO2FBQU0sQ0FBQztZQUNKLE9BQU8sRUFBRSxDQUFDO1FBQ2QsQ0FBQztJQUNMLENBQUM7SUFNTSxHQUFHLENBQUMsR0FBUSxFQUFLLEdBQTBCO1FBQzlDLElBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxFQUFFLENBQUM7WUFDMUIsSUFBSSxPQUFPLEdBQUcsS0FBSyxXQUFXLEVBQUUsQ0FBQztnQkFDN0IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDMUIsT0FBTztZQUNYLENBQUM7aUJBQU0sSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRLEVBQUUsQ0FBQztnQkFDakMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7Z0JBQ2xCLE9BQU87WUFDWCxDQUFDO2lCQUFNLElBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxFQUFFLENBQUM7Z0JBQ2pDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO2dCQUNsQixPQUFPO1lBQ1gsQ0FBQztpQkFBTSxJQUFJLE9BQU8sR0FBRyxLQUFLLFFBQVEsRUFBRSxDQUFDO2dCQUNqQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztnQkFDbEIsT0FBTztZQUNYLENBQUM7aUJBQU0sQ0FBQztnQkFDSixJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztnQkFDakIsT0FBTztZQUNYLENBQUM7UUFDTCxDQUFDO1FBQ0QsSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRLEVBQUUsQ0FBQztZQUN0QixNQUFNLElBQUksR0FBVyxHQUFhLENBQUM7WUFDdkMsS0FBSyxNQUFNLElBQUksSUFBSSxJQUFJLEVBQUUsQ0FBQztnQkFDdEIsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDOUIsQ0FBQztZQUNELE9BQU87UUFDWCxDQUFDO1FBQ0QsT0FBTztJQUNYLENBQUM7SUFDTSxLQUFLLENBQUMsR0FBVztRQUNwQixPQUFPLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBQ00sTUFBTSxDQUFDLEdBQVc7UUFDckIsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQ2hCLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN2QixDQUFDO0lBQ0wsQ0FBQztJQUNNLEtBQUs7UUFDUixJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQVksQ0FBQztJQUMxQixDQUFDO0lBQ00sUUFBUTtRQUNYLE1BQU0sR0FBRyxHQUFZLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUNoRCxJQUFJLEdBQUcsR0FBRyxDQUFDO1lBQUcsT0FBTyxFQUFFLENBQUM7UUFFeEIsSUFBSSxTQUFTLEdBQWEsRUFBRSxDQUFDO1FBQzdCLEtBQUssTUFBTSxHQUFHLElBQUksSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQ3ZCLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDNUMsQ0FBQztRQUVELE9BQU8sU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBQ00sTUFBTTtRQUNULE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUNNLFVBQVU7UUFDYixNQUFNLEdBQUcsR0FBWSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFDaEQsSUFBSSxHQUFHLEdBQUcsQ0FBQztZQUFHLE9BQU8sU0FBUyxDQUFDO1FBRS9CLElBQUksU0FBUyxHQUFHLElBQUksUUFBUSxFQUFFLENBQUM7UUFDL0IsS0FBSyxNQUFNLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDdkIsTUFBTSxLQUFLLEdBQXlCLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDaEQsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRO2dCQUN6QixTQUFTLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNqQyxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVE7Z0JBQ3pCLFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzs7Z0JBRTdDLFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQ2hELENBQUM7UUFFRCxPQUFPLFNBQVMsQ0FBQztJQUNyQixDQUFDO0lBQ1MsZUFBZSxDQUFDLENBQVM7UUFDL0IsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBQ1MsZUFBZSxDQUFDLENBQVM7UUFDL0IsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDM0MsTUFBTSxTQUFTLEdBQWEsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMzQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDdkIsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNsQyxJQUFJLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQzlCLENBQUM7aUJBQU0sQ0FBQztnQkFDSixJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0NBQ0o7QUFsSUQsNEJBa0lDOzs7Ozs7Ozs7Ozs7O0FDdElELHdCQUtDO0FBR0QsMEJBT0M7QUFHRCx3QkFHQztBQUdELHNCQUdDO0FBSUQsd0JBR0M7QUFHRCxvQkFFQztBQUVELG9CQUVDO0FBM0NELFNBQWdCLE1BQU0sQ0FBQyxNQUFjO0lBRWpDLE1BQU0sT0FBTyxHQUFHLDZCQUE2QixDQUFDO0lBRTlDLE9BQU8sT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNoQyxDQUFDO0FBR0QsU0FBZ0IsT0FBTyxDQUFDLE1BQWM7SUFHbEMsTUFBTSxPQUFPLEdBQUcsV0FBVyxDQUFDO0lBQzVCLE1BQU0sTUFBTSxHQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFDLEVBQUUsQ0FBQyxDQUFDO0lBRTNDLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzFCLENBQUM7QUFHRCxTQUFnQixNQUFNLENBQUMsR0FBVyxFQUFFLEtBQWE7SUFDN0MsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDdkMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxVQUFVLENBQUMsR0FBRyxVQUFVLENBQUM7QUFDckQsQ0FBQztBQUdELFNBQWdCLEtBQUssQ0FBQyxHQUFXLEVBQUUsS0FBYTtJQUM1QyxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN2QyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLFVBQVUsQ0FBQyxHQUFHLFVBQVUsQ0FBQztBQUNwRCxDQUFDO0FBSUQsU0FBZ0IsTUFBTSxDQUFDLEdBQVcsRUFBRSxLQUFhO0lBQzdDLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3ZDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsVUFBVSxDQUFDLEdBQUcsVUFBVSxDQUFDO0FBQ3JELENBQUM7QUFHRCxTQUFnQixJQUFJLENBQUMsQ0FBVztJQUM1QixPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFVLEVBQUUsRUFBVSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ2xFLENBQUM7QUFFRCxTQUFnQixJQUFJLENBQUMsQ0FBVztJQUM1QixPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFVLEVBQUUsRUFBVSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ2xFLENBQUM7Ozs7Ozs7Ozs7Ozs7O0FDckNELHdCQUdDO0FBR0QsMEJBRUM7QUFHRCx3QkFFQztBQVVELDBCQUVDO0FBTUQsd0JBVUM7QUE2QkQsOEJBTUM7QUFNRCxrQ0FhQztBQUdELHNDQVNDO0FBR0Qsa0NBSUM7QUFDRCw0Q0FJQztBQUNELDRDQUlDO0FBQ0QsOENBR0M7QUFDRCw4Q0FHQztBQUNELDBDQUdDO0FBQ0Qsb0NBS0M7QUFySkQsOEVBQThDO0FBSTlDLE1BQU0sS0FBSyxHQUFhLEdBQUUsRUFBRSxHQUFDLE9BQU8sSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFDO0FBR2xELFNBQWdCLE1BQU0sQ0FBQyxNQUFjLENBQUMsRUFBRSxNQUFjLENBQUMsRUFBRSxPQUFnQixLQUFLO0lBQzFFLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO0lBQzFELE9BQU8sbUJBQU0sRUFBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDN0IsQ0FBQztBQUdELFNBQWdCLE9BQU8sQ0FBQyxNQUFjLENBQUMsRUFBRSxNQUFjLENBQUMsRUFBRSxPQUFnQixLQUFLO0lBQzNFLE9BQU8sTUFBTSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRSxFQUFFLEdBQUMsT0FBTyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBQyxDQUFDO0FBQzVELENBQUM7QUFHRCxTQUFnQixNQUFNLENBQUMsTUFBYyxDQUFDLEVBQUUsTUFBYyxDQUFDLEVBQUUsT0FBZ0IsS0FBSztJQUMxRSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztBQUNyRSxDQUFDO0FBQ0QsU0FBUyxlQUFlLENBQUMsT0FBZ0IsS0FBSztJQUMxQyxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUM7SUFDWixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUM1QixHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7SUFDbEIsQ0FBQztJQUNELE9BQU8sR0FBRyxHQUFHLENBQUMsQ0FBQztBQUNuQixDQUFDO0FBR0QsU0FBZ0IsT0FBTyxDQUFDLE1BQWMsQ0FBQyxFQUFFLE1BQWMsQ0FBQyxFQUFFLEtBQWEsR0FBRyxFQUFFLE9BQWdCLEtBQUs7SUFDN0YsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQ2xELENBQUM7QUFNRCxTQUFnQixNQUFNLENBQUMsTUFBYyxHQUFHLEVBQUUsTUFBYyxHQUFHLEVBQUUsS0FBYSxHQUFHLEVBQUUsT0FBZ0IsS0FBSztJQUNoRyxNQUFNLEdBQUcsR0FBRyxHQUFHLENBQUM7SUFDaEIsTUFBTSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUM7SUFDakIsTUFBTSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUM7SUFDakIsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFFdEMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUM7SUFDMUIsQ0FBQyxHQUFHLGlCQUFJLEVBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNuQixDQUFDLEdBQUcsaUJBQUksRUFBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25CLE9BQU8sQ0FBQyxDQUFDO0FBQ2IsQ0FBQztBQUNELFNBQVMsSUFBSSxDQUFDLENBQVMsRUFBRSxDQUFTO0lBQzlCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUN2RSxDQUFDO0FBQ0QsU0FBUyxJQUFJLENBQUMsQ0FBUyxFQUFFLENBQVM7SUFDOUIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ3ZFLENBQUM7QUFJRCxNQUFhLFlBQVk7SUFJckIsWUFBbUIsSUFBWTtRQUMzQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztJQUMzQixDQUFDO0lBQ00sS0FBSztRQUNSLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUNoQyxDQUFDO0lBRU0sTUFBTTtRQUNULElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksR0FBRyxLQUFLLENBQUMsR0FBRyxNQUFNLENBQUM7UUFDaEQsT0FBTyxJQUFJLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQztJQUNoQyxDQUFDO0NBQ0o7QUFoQkQsb0NBZ0JDO0FBR0QsU0FBZ0IsU0FBUyxDQUFDLE1BQWMsRUFBRSxFQUFFLE9BQWdCLEtBQUs7SUFDN0QsTUFBTSxHQUFHLEdBQUcsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2hELE1BQU0sT0FBTyxHQUFHLGlCQUFJLEVBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRTVDLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDcEUsT0FBTyxHQUFHLEdBQUcsR0FBRyxDQUFDO0FBQ3JCLENBQUM7QUFNRCxTQUFnQixXQUFXLENBQUMsS0FBcUIsRUFBRSxPQUFnQixLQUFLO0lBQ3BFLElBQUksR0FBRyxHQUFVLENBQUMsQ0FBQztJQUNuQixLQUFLLElBQUksSUFBSSxJQUFJLEtBQUs7UUFBRSxHQUFHLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQztJQUUxQyxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNwQyxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUM7SUFDWixLQUFLLE1BQU0sSUFBSSxJQUFJLEtBQUssRUFBRSxDQUFDO1FBQ3ZCLEdBQUcsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ2xCLElBQUksTUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFDO1lBQ2pCLE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQztJQUNMLENBQUM7SUFDRCxPQUFPLFNBQVMsQ0FBQztBQUNyQixDQUFDO0FBR0QsU0FBZ0IsYUFBYSxDQUFJLEtBQVUsRUFBRSxPQUFnQixLQUFLO0lBQzlELElBQUksYUFBYSxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQztJQUMvQixLQUFLLElBQUksQ0FBQyxHQUFHLGFBQWEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztRQUVoRCxNQUFNLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUU3QixDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNoRixDQUFDO0lBQ0QsT0FBTyxhQUFhLENBQUM7QUFDekIsQ0FBQztBQUdELFNBQWdCLFdBQVcsQ0FBQyxNQUFjO0lBQ3RDLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztJQUNiLEtBQUssSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLEVBQUUsQ0FBQyxFQUFFO1FBQUUsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBQ3JELE9BQU8sR0FBRyxDQUFDO0FBQ2YsQ0FBQztBQUNELFNBQWdCLGdCQUFnQixDQUFDLE1BQWM7SUFDM0MsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO0lBQ2IsS0FBSyxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sRUFBRSxDQUFDLEVBQUU7UUFBRSxHQUFHLElBQUksaUJBQWlCLEVBQUUsQ0FBQztJQUMxRCxPQUFPLEdBQUcsQ0FBQztBQUNmLENBQUM7QUFDRCxTQUFnQixnQkFBZ0IsQ0FBQyxNQUFjO0lBQzNDLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztJQUNiLEtBQUssSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLEVBQUUsQ0FBQyxFQUFFO1FBQUUsR0FBRyxJQUFJLGlCQUFpQixFQUFFLENBQUM7SUFDMUQsT0FBTyxHQUFHLENBQUM7QUFDZixDQUFDO0FBQ0QsU0FBZ0IsaUJBQWlCO0lBQzdCLE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDO0lBQ3hCLE9BQU8sTUFBTSxDQUFDLFlBQVksQ0FBQyxFQUFFLEdBQUMsR0FBRyxDQUFDLENBQUM7QUFDdkMsQ0FBQztBQUNELFNBQWdCLGlCQUFpQjtJQUM3QixNQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQztJQUN4QixPQUFPLE1BQU0sQ0FBQyxZQUFZLENBQUMsRUFBRSxHQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3ZDLENBQUM7QUFDRCxTQUFnQixlQUFlO0lBQzNCLE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDO0lBQ3ZCLE9BQU8sTUFBTSxDQUFDLFlBQVksQ0FBQyxFQUFFLEdBQUMsR0FBRyxDQUFDLENBQUM7QUFDdkMsQ0FBQztBQUNELFNBQWdCLFlBQVk7SUFDeEIsTUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDLENBQUMsRUFBQyxFQUFFLENBQUM7SUFDeEIsSUFBSSxHQUFHLEdBQUcsRUFBRTtRQUFFLE9BQU8sTUFBTSxDQUFDLFlBQVksQ0FBQyxFQUFFLEdBQUMsR0FBRyxDQUFDLENBQUM7SUFDakQsSUFBSSxHQUFHLEdBQUcsRUFBRTtRQUFFLE9BQU8sTUFBTSxDQUFDLFlBQVksQ0FBQyxFQUFFLEdBQUMsR0FBRyxHQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3BELE9BQU8sTUFBTSxDQUFDLFlBQVksQ0FBQyxFQUFFLEdBQUMsR0FBRyxHQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQzFDLENBQUM7Ozs7Ozs7Ozs7Ozs7O0FDckpELE1BQWEsZ0JBQWdCO0lBS3pCLFlBQXNCLEdBQWdCLEVBQUUsS0FBYSxnQkFBZ0I7UUFDakUsZ0JBQWdCLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQztRQUUzQixJQUFJLENBQUMsRUFBRSxHQUFLLEVBQUUsQ0FBQztRQUNmLElBQUksQ0FBQyxHQUFHLEdBQUksUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQW1CLENBQUM7UUFDNUQsSUFBSSxJQUFJLENBQUMsR0FBRyxLQUFLLElBQUk7WUFBRSxLQUFLLENBQUMsb0NBQW9DLENBQUMsQ0FBQztRQUNuRSxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRXJDLEdBQUcsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDM0MsZ0JBQWdCLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3hDLENBQUM7SUFDTSxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQXdCLElBQUksRUFBRSxLQUFhLGdCQUFnQjtRQUU1RSxJQUFJLE9BQU8sSUFBSSxDQUFDLEVBQUUsS0FBSyxRQUFRLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLFlBQVksZ0JBQWdCLENBQUMsRUFBRSxDQUFDO1lBQ3hFLElBQUksR0FBRyxLQUFLLElBQUksRUFBRSxDQUFDO2dCQUNmLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBbUIsQ0FBQztnQkFDdEQsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbkMsQ0FBQztZQUNELElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxnQkFBZ0IsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDNUMsQ0FBQztRQUNELE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBQ00sZUFBZSxDQUFDLEdBQVcsRUFBRSxRQUFRLEdBQUcsU0FBUyxFQUFFLFdBQW1CLFNBQVM7UUFDbEYsTUFBTSxDQUFDLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQXlCLENBQUM7UUFDOUQsQ0FBQyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFhLFFBQVEsQ0FBQyxDQUFDO1FBQ2xELENBQUMsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLGtCQUFrQixFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ2xELENBQUMsQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDO1FBRWxCLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFTSxhQUFhO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUN6QixJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzlDLENBQUM7UUFBQSxDQUFDO0lBQ04sQ0FBQztJQUNNLGNBQWMsQ0FBQyxHQUFXO1FBQzdCLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUNNLGNBQWMsQ0FBQyxHQUFXO1FBQzdCLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBQ00sZUFBZSxDQUFDLEdBQVc7UUFDOUIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLEVBQUUsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQ3BELENBQUM7Q0FDSjtBQWxERCw0Q0FrREM7Ozs7Ozs7Ozs7Ozs7O0FDbERELE1BQWEsb0JBQW9CO0lBSTdCLFlBQXNCLEVBQVUsRUFBRSxNQUFvQjs7UUFDbEQsMEJBQW9CLENBQUMsRUFBRSxvQ0FBdkIsb0JBQW9CLENBQUMsRUFBRSxHQUFLLEVBQUU7UUFDOUIsb0JBQW9CLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUNuQyxJQUFJLENBQUM7WUFDRCxJQUFJLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUF5QixDQUFDO1FBQ2pFLENBQUM7UUFBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1lBQ1gsSUFBSSxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztZQUVmLE1BQU0sYUFBTixNQUFNLGNBQU4sTUFBTSxJQUFOLE1BQU0sR0FBSyxRQUFRLENBQUMsSUFBSSxFQUFDO1lBQ3pCLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9CLENBQUM7UUFDRCxvQkFBb0IsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDaEQsQ0FBQztJQUNNLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBVSxFQUFFLE1BQW9COzs7UUFDakQsMEJBQW9CLENBQUMsRUFBRSxvQ0FBdkIsb0JBQW9CLENBQUMsRUFBRSxHQUFLLEVBQUU7UUFDOUIsZ0JBQUksQ0FBQyxFQUFFLEVBQUMsRUFBRSx3Q0FBRixFQUFFLElBQU0sSUFBSSxvQkFBb0IsQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLEVBQUM7UUFDckQsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7SUFDTSxlQUFlLENBQUMsR0FBVyxFQUFFLFFBQVEsR0FBRyxTQUFTLEVBQUUsV0FBbUIsU0FBUztRQUNsRixJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFhLFFBQVEsQ0FBQyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUM7SUFDM0IsQ0FBQztJQUVNLGFBQWE7UUFDaEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBQ00sY0FBYyxDQUFDLEdBQVc7UUFDN0IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBQ00sY0FBYyxDQUFDLEdBQVc7UUFDN0IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLEVBQUUsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFDTSxlQUFlLENBQUMsR0FBVztRQUM5QixJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDcEQsQ0FBQztDQUNKO0FBekNELG9EQXlDQzs7Ozs7Ozs7Ozs7Ozs7QUN6Q0QscUZBQWlEO0FBQ2pELDRHQUFtRDtBQUNuRCw0R0FJbUQ7QUEwQm5ELE1BQWEsYUFBYTtJQW1CdEI7UUFDSSxJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUNmLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBRWYsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBc0IsQ0FBQztRQUNuRSxJQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFzQixDQUFDO1FBQ25FLElBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQXNCLENBQUM7UUFDbkUsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBc0IsQ0FBQztRQUNuRSxJQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFzQixDQUFDO1FBQ25FLElBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQXNCLENBQUM7UUFDbkUsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBc0IsQ0FBQztRQUNuRSxJQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFzQixDQUFDO1FBQ25FLElBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQXNCLENBQUM7UUFDbkUsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBc0IsQ0FBQztRQUNuRSxJQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFzQixDQUFDO1FBQ25FLElBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQXNCLENBQUM7UUFDbkUsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBc0IsQ0FBQztRQUVuRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFDbEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztRQUNsQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFDbEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztRQUNsQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFDbEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztRQUNsQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFDbEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztRQUNsQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO0lBQ3RDLENBQUM7SUFDTSxNQUFNLENBQUMsTUFBTTs7UUFDaEIsVUFBSSxDQUFDLEVBQUUsb0NBQVAsSUFBSSxDQUFDLEVBQUUsR0FBTSxJQUFJLGFBQWEsRUFBRSxFQUFDO1FBQ2pDLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBQ00sR0FBRztRQUNOLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBQ2YsSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7UUFDZixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBQ00sR0FBRyxDQUFDLElBQW1CLEVBQUUsSUFBWTtRQUN4QyxJQUFJLENBQUM7WUFDRCxJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsSUFBSSxJQUFJLEtBQUssU0FBUyxFQUFFLENBQUM7Z0JBQ2pELElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDO2dCQUN2QixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQztZQUM1QixDQUFDO2lCQUFNLENBQUM7Z0JBQ0osTUFBTSxDQUFDLEdBQUcsSUFBYyxDQUFDO2dCQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3RCLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQztZQUM5QixDQUFDO1lBQ0QsT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7WUFDWCxPQUFPLEtBQUssQ0FBQztRQUNqQixDQUFDO0lBQ0wsQ0FBQztJQUNNLEdBQUcsQ0FBQyxJQUFtQjtRQUMxQixJQUFJLENBQUM7WUFDRCxNQUFNLElBQUksR0FBRyxPQUFPLElBQUksS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUN6RCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdkIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3ZCLE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUM7UUFBQyxPQUFNLEdBQUcsRUFBRSxDQUFDO1lBQ1YsT0FBTyxLQUFLLENBQUM7UUFDakIsQ0FBQztJQUNMLENBQUM7SUFDTSxLQUFLO1FBQ1IsS0FBSyxNQUFNLEVBQUUsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDekIsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxTQUFTO2dCQUFFLFNBQVM7WUFDL0MsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQWMsQ0FBQztnQkFBRSxPQUFPLEtBQUssQ0FBQztRQUM1RSxDQUFDO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUNNLEdBQUcsQ0FBQyxJQUFtQjtRQUMxQixJQUFJLENBQUM7WUFDRCxJQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFBRSxPQUFPLEtBQUssQ0FBQztZQUMvQixNQUFNLElBQUksR0FBRyxPQUFPLElBQUksS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUN6RCxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4QyxDQUFDO1FBQUMsT0FBTSxHQUFHLEVBQUUsQ0FBQztZQUNWLE9BQU8sS0FBSyxDQUFDO1FBQ2pCLENBQUM7SUFDTCxDQUFDO0lBRU0sTUFBTSxDQUFDLElBQW1COztRQUM3QixJQUFJLENBQUM7WUFDRCxNQUFNLElBQUksR0FBRyxPQUFPLElBQUksS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUN6RCxPQUFRLFVBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLG1DQUFJLEtBQUssQ0FBQztRQUNyQyxDQUFDO1FBQUMsT0FBTSxHQUFHLEVBQUUsQ0FBQztZQUNWLE9BQU8sS0FBSyxDQUFDO1FBQ2pCLENBQUM7SUFDTCxDQUFDO0lBRU0sV0FBVztRQUNkLE1BQU0sUUFBUSxHQUFHLEVBQWMsQ0FBQztRQUNoQyxLQUFLLE1BQU0sSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJO1lBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNsRCxPQUFPLFFBQVEsQ0FBQztJQUNwQixDQUFDO0lBRU0sV0FBVztRQUNkLE1BQU0sUUFBUSxHQUFHLEVBQWMsQ0FBQztRQUNoQyxLQUFLLE1BQU0sSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJO1lBQUUsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztnQkFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZFLE9BQU8sUUFBUSxDQUFDO0lBQ3BCLENBQUM7SUFFUyxpQkFBaUIsQ0FBQyxJQUFZOzs7UUFLcEMsZ0JBQUksQ0FBQyxJQUFJLEVBQUMsSUFBSSx3Q0FBSixJQUFJLElBQU0sS0FBSyxFQUFDO1FBRTFCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUFFLE9BQU8sSUFBSSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBRXhCLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDMUIsSUFBSSxDQUFDO1lBRUQsSUFBSSxFQUFFLENBQUMsQ0FBQyxhQUFELENBQUMsdUJBQUQsQ0FBQyxDQUFFLElBQUksQ0FBQztnQkFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsSUFBYyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ2xGLElBQUksRUFBRSxDQUFDLENBQUMsYUFBRCxDQUFDLHVCQUFELENBQUMsQ0FBRSxJQUFJLENBQUM7Z0JBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLElBQWMsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNsRixJQUFJLEVBQUUsQ0FBQyxDQUFDLGFBQUQsQ0FBQyx1QkFBRCxDQUFDLENBQUUsSUFBSSxDQUFDO2dCQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxJQUFjLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDbEYsSUFBSSxFQUFFLENBQUMsQ0FBQyxhQUFELENBQUMsdUJBQUQsQ0FBQyxDQUFFLElBQUksQ0FBQztnQkFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsSUFBYyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ2xGLElBQUksRUFBRSxDQUFDLENBQUMsYUFBRCxDQUFDLHVCQUFELENBQUMsQ0FBRSxJQUFJLENBQUM7Z0JBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLElBQWMsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNsRixJQUFJLEVBQUUsQ0FBQyxDQUFDLGFBQUQsQ0FBQyx1QkFBRCxDQUFDLENBQUUsSUFBSSxDQUFDO2dCQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxJQUFjLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDbEYsSUFBSSxFQUFFLENBQUMsQ0FBQyxhQUFELENBQUMsdUJBQUQsQ0FBQyxDQUFFLElBQUksQ0FBQztnQkFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsSUFBYyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ2xGLElBQUksRUFBRSxDQUFDLENBQUMsYUFBRCxDQUFDLHVCQUFELENBQUMsQ0FBRSxJQUFJLENBQUM7Z0JBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLElBQWMsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNsRixJQUFJLEVBQUUsQ0FBQyxDQUFDLGFBQUQsQ0FBQyx1QkFBRCxDQUFDLENBQUUsSUFBSSxDQUFDO2dCQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxJQUFjLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDbEYsSUFBSSxFQUFFLENBQUMsQ0FBQyxhQUFELENBQUMsdUJBQUQsQ0FBQyxDQUFFLElBQUksQ0FBQztnQkFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsSUFBYyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ2xGLElBQUksRUFBRSxDQUFDLENBQUMsYUFBRCxDQUFDLHVCQUFELENBQUMsQ0FBRSxJQUFJLENBQUM7Z0JBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLElBQWMsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNsRixJQUFJLEVBQUUsQ0FBQyxDQUFDLGFBQUQsQ0FBQyx1QkFBRCxDQUFDLENBQUUsSUFBSSxDQUFDO2dCQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxJQUFjLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDbEYsSUFBSSxFQUFFLENBQUMsQ0FBQyxhQUFELENBQUMsdUJBQUQsQ0FBQyxDQUFFLElBQUksQ0FBQztnQkFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsSUFBYyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBRWxGLElBQUksRUFBQyxhQUFELENBQUMsdUJBQUQsQ0FBQyxDQUFFLFFBQVEsTUFBSyxTQUFTLEVBQUUsQ0FBQztnQkFDNUIsTUFBTSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDdEQsQ0FBQztpQkFBTSxDQUFDO2dCQUNKLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztZQUM5RCxDQUFDO1lBRUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztZQUNsQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1lBQ2xDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7WUFDbEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztZQUNsQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1lBQ2xDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7WUFDbEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztZQUNsQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1lBQ2xDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7WUFDbEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztZQUNsQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1lBQ2xDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7WUFDbEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztRQUN0QyxDQUFDO1FBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztZQUNYLEtBQUssQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDO1lBQy9DLEtBQUssQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUM7WUFDaEIsT0FBTyxLQUFLLENBQUM7UUFDakIsQ0FBQztRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFUyxpQkFBaUIsQ0FBQyxJQUFZOzs7UUFDcEMsZ0JBQUksQ0FBQyxJQUFJLEVBQUMsSUFBSSx3Q0FBSixJQUFJLElBQU0sS0FBSyxFQUFDO1FBRTFCLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFBRSxPQUFPLElBQUksQ0FBQztRQUNqQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQztRQUV2QixNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzFCLElBQUksQ0FBQztZQUNELElBQUksRUFBRSxDQUFDLENBQUMsYUFBRCxDQUFDLHVCQUFELENBQUMsQ0FBRSxJQUFJLENBQUM7Z0JBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLElBQWMsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUMvRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLGFBQUQsQ0FBQyx1QkFBRCxDQUFDLENBQUUsSUFBSSxDQUFDO2dCQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxJQUFjLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDL0UsSUFBSSxFQUFFLENBQUMsQ0FBQyxhQUFELENBQUMsdUJBQUQsQ0FBQyxDQUFFLElBQUksQ0FBQztnQkFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsSUFBYyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQy9FLElBQUksRUFBRSxDQUFDLENBQUMsYUFBRCxDQUFDLHVCQUFELENBQUMsQ0FBRSxJQUFJLENBQUM7Z0JBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLElBQWMsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUMvRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLGFBQUQsQ0FBQyx1QkFBRCxDQUFDLENBQUUsSUFBSSxDQUFDO2dCQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxJQUFjLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDL0UsSUFBSSxFQUFFLENBQUMsQ0FBQyxhQUFELENBQUMsdUJBQUQsQ0FBQyxDQUFFLElBQUksQ0FBQztnQkFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsSUFBYyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQy9FLElBQUksRUFBRSxDQUFDLENBQUMsYUFBRCxDQUFDLHVCQUFELENBQUMsQ0FBRSxJQUFJLENBQUM7Z0JBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLElBQWMsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUMvRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLGFBQUQsQ0FBQyx1QkFBRCxDQUFDLENBQUUsSUFBSSxDQUFDO2dCQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxJQUFjLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDL0UsSUFBSSxFQUFFLENBQUMsQ0FBQyxhQUFELENBQUMsdUJBQUQsQ0FBQyxDQUFFLElBQUksQ0FBQztnQkFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsSUFBYyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQy9FLElBQUksRUFBRSxDQUFDLENBQUMsYUFBRCxDQUFDLHVCQUFELENBQUMsQ0FBRSxJQUFJLENBQUM7Z0JBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLElBQWMsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUMvRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLGFBQUQsQ0FBQyx1QkFBRCxDQUFDLENBQUUsSUFBSSxDQUFDO2dCQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxJQUFjLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDL0UsSUFBSSxFQUFFLENBQUMsQ0FBQyxhQUFELENBQUMsdUJBQUQsQ0FBQyxDQUFFLElBQUksQ0FBQztnQkFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsSUFBYyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQy9FLElBQUksRUFBRSxDQUFDLENBQUMsYUFBRCxDQUFDLHVCQUFELENBQUMsQ0FBRSxJQUFJLENBQUM7Z0JBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLElBQWMsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUUvRSxJQUFJLEVBQUMsYUFBRCxDQUFDLHVCQUFELENBQUMsQ0FBRSxRQUFRLE1BQUssU0FBUyxFQUFFLENBQUM7Z0JBQzVCLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ25ELENBQUM7aUJBQU0sQ0FBQztnQkFDSixNQUFNLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLGtCQUFrQixDQUFDLENBQUM7WUFDM0QsQ0FBQztZQUVELElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUMsQ0FBQyxhQUFELENBQUMsdUJBQUQsQ0FBQyxDQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztZQUMxRCxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDLENBQUMsYUFBRCxDQUFDLHVCQUFELENBQUMsQ0FBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7WUFDMUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxDQUFDLGFBQUQsQ0FBQyx1QkFBRCxDQUFDLENBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1lBQzFELElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUMsQ0FBQyxhQUFELENBQUMsdUJBQUQsQ0FBQyxDQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztZQUMxRCxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDLENBQUMsYUFBRCxDQUFDLHVCQUFELENBQUMsQ0FBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7WUFDMUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxDQUFDLGFBQUQsQ0FBQyx1QkFBRCxDQUFDLENBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1lBQzFELElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUMsQ0FBQyxhQUFELENBQUMsdUJBQUQsQ0FBQyxDQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztZQUMxRCxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDLENBQUMsYUFBRCxDQUFDLHVCQUFELENBQUMsQ0FBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7WUFDMUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxDQUFDLGFBQUQsQ0FBQyx1QkFBRCxDQUFDLENBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1lBQzFELElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUMsQ0FBQyxhQUFELENBQUMsdUJBQUQsQ0FBQyxDQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztZQUMxRCxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDLENBQUMsYUFBRCxDQUFDLHVCQUFELENBQUMsQ0FBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7WUFDMUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxDQUFDLGFBQUQsQ0FBQyx1QkFBRCxDQUFDLENBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1lBQzFELElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUMsQ0FBQyxhQUFELENB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QyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRTtJQUN4QywyQ0FBcUIsR0FBRSxDQUFDO0FBQzVCLENBQUMsQ0FBQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbWFpLy4vc3JjL2RfY21uL0NfQWxlcnRMb2cudHMiLCJ3ZWJwYWNrOi8vbWFpLy4vc3JjL2RfY21uL0NfRGlhbG9nLnRzIiwid2VicGFjazovL21haS8uL3NyYy9kX2Ntbi9GX1BPU1QudHMiLCJ3ZWJwYWNrOi8vbWFpLy4vc3JjL2RfY21uL0ZfbG9hZF9hbmRfc2F2ZS50cyIsIndlYnBhY2s6Ly9tYWkvLi9zcmMvZF9jbW4vZ2xvYmFsLnRzIiwid2VicGFjazovL21haS8uL3NyYy9kX2N0bC9DX0N0bEN1cnNvci50cyIsIndlYnBhY2s6Ly9tYWkvLi9zcmMvZF9jdGwvQ19Pbk9mZkJ1dHRvbi50cyIsIndlYnBhY2s6Ly9tYWkvLi9zcmMvZF9tZGwvQ19HdWlsZC50cyIsIndlYnBhY2s6Ly9tYWkvLi9zcmMvZF9tZGwvQ19IZXJvLnRzIiwid2VicGFjazovL21haS8uL3NyYy9kX21kbC9DX0hlcm9BYmlsaXR5LnRzIiwid2VicGFjazovL21haS8uL3NyYy9kX21kbC9DX0xvY2F0aW9uLnRzIiwid2VicGFjazovL21haS8uL3NyYy9kX21kbC9DX01hemUudHMiLCJ3ZWJwYWNrOi8vbWFpLy4vc3JjL2RfbWRsL0NfTWF6ZUNlbGwudHMiLCJ3ZWJwYWNrOi8vbWFpLy4vc3JjL2RfbWRsL0NfTWF6ZUluZm8udHMiLCJ3ZWJwYWNrOi8vbWFpLy4vc3JjL2RfbWRsL0NfTWF6ZU9iai50cyIsIndlYnBhY2s6Ly9tYWkvLi9zcmMvZF9tZGwvQ19NYXplT2JqVmlldy50cyIsIndlYnBhY2s6Ly9tYWkvLi9zcmMvZF9tZGwvQ19Nb3ZhYmxlUG9pbnQudHMiLCJ3ZWJwYWNrOi8vbWFpLy4vc3JjL2RfbWRsL0NfUG9pbnQudHMiLCJ3ZWJwYWNrOi8vbWFpLy4vc3JjL2RfbWRsL0NfUG9pbnREaXIudHMiLCJ3ZWJwYWNrOi8vbWFpLy4vc3JjL2RfbWRsL0NfUG9pbnRTZXQyRC50cyIsIndlYnBhY2s6Ly9tYWkvLi9zcmMvZF9tZGwvQ19SYW5nZS50cyIsIndlYnBhY2s6Ly9tYWkvLi9zcmMvZF9tZGwvQ19TYXZlRGF0YS50cyIsIndlYnBhY2s6Ly9tYWkvLi9zcmMvZF9tZGwvQ19TYXZlSW5mby50cyIsIndlYnBhY2s6Ly9tYWkvLi9zcmMvZF9tZGwvQ19UZWFtLnRzIiwid2VicGFjazovL21haS8uL3NyYy9kX21kbC9DX1RlYW1WaWV3LnRzIiwid2VicGFjazovL21haS8uL3NyYy9kX21kbC9DX1dhbGtlci50cyIsIndlYnBhY2s6Ly9tYWkvLi9zcmMvZF9tZGwvQ19XYWxsLnRzIiwid2VicGFjazovL21haS8uL3NyYy9kX21kbC9UX0RpcmVjdGlvbi50cyIsIndlYnBhY2s6Ly9tYWkvLi9zcmMvZF9tZGwvVF9NektpbmQudHMiLCJ3ZWJwYWNrOi8vbWFpLy4vc3JjL2RfdXRsL0NfVXJsT3B0LnRzIiwid2VicGFjazovL21haS8uL3NyYy9kX3V0bC9GX01hdGgudHMiLCJ3ZWJwYWNrOi8vbWFpLy4vc3JjL2RfdXRsL0ZfUmFuZC50cyIsIndlYnBhY2s6Ly9tYWkvLi9zcmMvZF92aWUvQ19EaXNwbGF5TWVzc2FnZS50cyIsIndlYnBhY2s6Ly9tYWkvLi9zcmMvZF92aWUvQ19PbmVMaW5lVmlld01lc3NhZ2UudHMiLCJ3ZWJwYWNrOi8vbWFpLy4vc3JjL21haV9tYXplL0NfRGVmYXVsdEN0bHMudHMiLCJ3ZWJwYWNrOi8vbWFpLy4vc3JjL21haV9tYXplL0NfU3dpdGNoVmlldy50cyIsIndlYnBhY2s6Ly9tYWkvLi9zcmMvbWFpX21hemUvRl9kaXNwbGF5X21hemUzRC50cyIsIndlYnBhY2s6Ly9tYWkvLi9zcmMvbWFpX21hemUvRl9kaXNwbGF5X21hemVDaC50cyIsIndlYnBhY2s6Ly9tYWkvLi9zcmMvbWFpX21hemUvRl9zZXRfVURfbW9kZS50cyIsIndlYnBhY2s6Ly9tYWkvLi9zcmMvbWFpX21hemUvRl9zZXRfbWVudV9tb2RlLnRzIiwid2VicGFjazovL21haS8uL3NyYy9tYWlfbWF6ZS9GX3NldF9tb2RlLnRzIiwid2VicGFjazovL21haS8uL3NyYy9tYWlfbWF6ZS9GX3NldF9tb3ZlX21vZGUudHMiLCJ3ZWJwYWNrOi8vbWFpLy4vc3JjL21haV9tYXplL0Zfc2V0X212cHRfbW9kZS50cyIsIndlYnBhY2s6Ly9tYWkvLi9zcmMvbWFpX21hemUvRl9zZXRfc2F2ZV9tb2RlLnRzIiwid2VicGFjazovL21haS8uL3NyYy9tYWlfbWF6ZS9nbG9iYWxfZm9yX21hemUudHMiLCJ3ZWJwYWNrOi8vbWFpL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL21haS8uL3NyYy9tYWlfbWF6ZS9tYWlfbWF6ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBfZ2V0X3V1aWQgfSBmcm9tIFwiLi4vZF91dGwvRl9SYW5kXCI7XHJcbmltcG9ydCB7IENfRGlhbG9nIH0gIGZyb20gXCIuL0NfRGlhbG9nXCI7XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIENfQWxlcnRMb2cgZXh0ZW5kcyBDX0RpYWxvZyB7XHJcbiAgICBwcm90ZWN0ZWQgc3RhdGljIG1lOiB7W2lkOiBzdHJpbmddOiBDX0FsZXJ0TG9nfTtcclxuICAgIHB1YmxpYyAgICBzdGF0aWMgZ2V0T2JqKHRhcmdldD86IEhUTUxEaWFsb2dFbGVtZW50KSB7XHJcbiAgICAgICAgdGhpcy5tZSA/Pz0ge307XHJcbiAgICAgICAgaWYgKHRhcmdldCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRhcmdldCAgICA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpYWxvZycpIGFzIEhUTUxEaWFsb2dFbGVtZW50O1xyXG4gICAgICAgICAgICB0YXJnZXQuaWQgPSAnZGlhbG9nXycgKyBfZ2V0X3V1aWQoKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0YXJnZXQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMubWVbdGFyZ2V0LmlkXSA/Pz0gbmV3IENfQWxlcnRMb2codGFyZ2V0KTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgbXNnOiB7W3R0bDogc3RyaW5nXTogc3RyaW5nW119O1xyXG5cclxuICAgIHByb3RlY3RlZCBwYW5lOiBIVE1MRGl2RWxlbWVudHx1bmRlZmluZWQ7XHJcbiAgICBwcm90ZWN0ZWQgbG9nczogSFRNTERpdkVsZW1lbnR8dW5kZWZpbmVkO1xyXG4gICAgcHJvdGVjdGVkIGJ0bnM6IEhUTUxEaXZFbGVtZW50fHVuZGVmaW5lZDtcclxuICAgIHByb3RlY3RlZCB1cGQ6ICBIVE1MQnV0dG9uRWxlbWVudHx1bmRlZmluZWQ7XHJcbiAgICBwcm90ZWN0ZWQgY2xyOiAgSFRNTEJ1dHRvbkVsZW1lbnR8dW5kZWZpbmVkO1xyXG4gICAgcHJvdGVjdGVkIGNsczogIEhUTUxCdXR0b25FbGVtZW50fHVuZGVmaW5lZDtcclxuXHJcbiAgICBwcm90ZWN0ZWQgY29uc3RydWN0b3IodGFyZ2V0OiBIVE1MRGlhbG9nRWxlbWVudCkge1xyXG4gICAgICAgIHN1cGVyKHRhcmdldCk7XHJcbiAgICAgICAgdGhpcy5tc2cgPSB7fTtcclxuXHJcbiAgICAgICAgdGhpcy5fX2NsZWFyRGlhbG9nKCk7XHJcbiAgICAgICAgdGhpcy5fX21ha2VEaWFsb2coKTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBfX2NsZWFyRGlhbG9nKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGN0eCA9IHN1cGVyLmdldFdpbmRvdygpO1xyXG4gICAgICAgIHdoaWxlIChjdHguZmlyc3RDaGlsZCkgY3R4LnJlbW92ZUNoaWxkKGN0eC5maXJzdENoaWxkKTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBfX21ha2VEaWFsb2coKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgY3R4ID0gc3VwZXIuZ2V0V2luZG93KCk7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdGhpcy5wYW5lID0gdGhpcy5fX21ha2VXaW5kb3cgKCdwYW5lJyk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmxvZ3MgPSB0aGlzLl9fbWFrZVBhbmVsICgnbG9ncycsICAgdGhpcy5wYW5lKTtcclxuICAgICAgICAgICAgdGhpcy5idG5zID0gdGhpcy5fX21ha2VQYW5lbCAoJ2J0bnMnLCAgIHRoaXMucGFuZSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnVwZCAgPSB0aGlzLl9fbWFrZUJ1dHRvbigndXBkYXRlJywgJ+abtOaWsCcsICAgdGhpcy5idG5zKTtcclxuICAgICAgICAgICAgdGhpcy5jbHIgID0gdGhpcy5fX21ha2VCdXR0b24oJ2NsZWFyJywgICfmtojljrsnLCAgIHRoaXMuYnRucyk7XHJcbiAgICAgICAgICAgIHRoaXMuY2xzICA9IHRoaXMuX19tYWtlQnV0dG9uKCdjbG9zZScsICAn6ZaJ44GY44KLJywgdGhpcy5idG5zKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMudXBkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCk9Pnt0aGlzLnVwZGF0ZSgpfSwgZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzLmNsci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT57dGhpcy5jbGVhciAoKX0sIGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5jbHMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+e3RoaXMuaGlkZSAgKCl9LCBmYWxzZSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmxvZ3Muc3R5bGUuc2V0UHJvcGVydHkoJ3VzZXItc2VsZWN0JywgJ3RleHQnKTtcclxuICAgICAgICAgICAgdGhpcy5sb2dzLnN0eWxlLnNldFByb3BlcnR5KCdtYXgtd2lkdGgnLCAgICc5MGR2dycpO1xyXG4gICAgICAgICAgICB0aGlzLmxvZ3Muc3R5bGUuc2V0UHJvcGVydHkoJ21pbi1oZWlnaHQnLCAgJzMuMHJlbScpO1xyXG4gICAgICAgICAgICB0aGlzLmxvZ3Muc3R5bGUuc2V0UHJvcGVydHkoJ21heC1oZWlnaHQnLCAgJzgwZHZoJyk7XHJcbiAgICAgICAgICAgIHRoaXMubG9ncy5zdHlsZS5zZXRQcm9wZXJ0eSgnb3ZlcmZsb3cteCcsICAnYXV0bycpO1xyXG4gICAgICAgICAgICB0aGlzLmxvZ3Muc3R5bGUuc2V0UHJvcGVydHkoJ292ZXJmbG93LXknLCAgJ2F1dG8nKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRab29tRWxtKHRoaXMubG9ncyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7fVxyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIF9fbWFrZVdpbmRvdyhpZDogc3RyaW5nKTogSFRNTERpdkVsZW1lbnQge1xyXG4gICAgICAgIGNvbnN0IGRpdiAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSBhcyBIVE1MRGl2RWxlbWVudDtcclxuICAgICAgICBkaXYuaWQgICAgID0gYCR7dGhpcy5pZH1fJHtpZH1gO1xyXG4gICAgICAgIHRoaXMuc2V0V2luZG93KGRpdik7XHJcbiAgICAgICAgcmV0dXJuIGRpdjtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBfX21ha2VQYW5lbChpZDogc3RyaW5nLCBwYXJlbnQ6IEhUTUxFbGVtZW50KTogSFRNTERpdkVsZW1lbnQge1xyXG4gICAgICAgIGNvbnN0IGRpdiAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSBhcyBIVE1MRGl2RWxlbWVudDtcclxuICAgICAgICBkaXYuaWQgICAgID0gYCR7dGhpcy5pZH1fJHtpZH1gO1xyXG4gICAgICAgIHBhcmVudC5hcHBlbmRDaGlsZChkaXYpO1xyXG4gICAgICAgIHJldHVybiBkaXY7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgX19tYWtlQnV0dG9uKGlkOiBzdHJpbmcsIG5hbWU6IHN0cmluZywgcGFyZW50OiBIVE1MRWxlbWVudCk6IEhUTUxCdXR0b25FbGVtZW50IHtcclxuICAgICAgICBjb25zdCBidG4gID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJykgYXMgSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcbiAgICAgICAgYnRuLmlkICAgICAgICAgPSBgJHt0aGlzLmlkfV8ke2lkfWA7XHJcbiAgICAgICAgYnRuLmlubmVySFRNTCAgPSBuYW1lO1xyXG4gICAgICAgIHBhcmVudC5hcHBlbmRDaGlsZChidG4pO1xyXG4gICAgICAgIHJldHVybiBidG47XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldF9tZXNzYWdlKHR0bDogc3RyaW5nLCBtc2c6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgICh0aGlzLm1zZ1t0dGxdID8/PSBbXSkucHVzaChtc2cpO1xyXG4gICAgICAgIHRoaXMuX19kb21fdXBkYXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNscl9tZXNzYWdlKHR0bD86IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0dGwgIT09IHVuZGVmaW5lZCkge3RoaXMubXNnW3R0bF0gPSBbXTtyZXR1cm47fVxyXG4gICAgICAgIGZvciAoY29uc3QgaWkgaW4gdGhpcy5tc2cpIHRoaXMubXNnW2lpXSA9IFtdO1xyXG4gICAgICAgIHRoaXMuX19kb21fY2xlYXIoKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHt0aGlzLl9fZG9tX3VwZGF0ZSgpfVxyXG4gICAgcHJvdGVjdGVkIF9fZG9tX3VwZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9fZG9tX2NsZWFyKCk7XHJcbiAgICAgICAgZm9yIChjb25zdCB0aXRsZSBpbiB0aGlzLm1zZykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBtc2cgb2YgdGhpcy5tc2dbdGl0bGVdKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBmcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ZpZWxkc2V0JykgYXMgSFRNTEZpZWxkU2V0RWxlbWVudDtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBsZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xlZ2VuZCcpICAgYXMgSFRNTExlZ2VuZEVsZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICBsZy5pbm5lckhUTUwgPSBgJHt0aXRsZX0gKCR7RGF0ZS5ub3coKS50b1N0cmluZygpfSlgO1xyXG4gICAgICAgICAgICAgICAgZnMuYXBwZW5kQ2hpbGQobGcpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IHByID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncHJlJykgICAgICBhcyBIVE1MUHJlRWxlbWVudDtcclxuICAgICAgICAgICAgICAgIGZzLmFwcGVuZENoaWxkKHByKTtcclxuICAgICAgICBcclxuICAgICAgICAgICAgICAgIGNvbnN0IHBnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpICAgIGFzIEhUTUxQYXJhZ3JhcGhFbGVtZW50O1xyXG4gICAgICAgICAgICAgICAgcGcuaW5uZXJIVE1MID0gbXNnO1xyXG4gICAgICAgICAgICAgICAgcHIuYXBwZW5kQ2hpbGQocGcpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMubG9ncz8uYXBwZW5kQ2hpbGQoZnMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbGVhcigpOiB2b2lkIHt0aGlzLmNscl9tZXNzYWdlKCl9XHJcbiAgICBwcm90ZWN0ZWQgX19kb21fY2xlYXIoKTogdm9pZCB7XHJcbiAgICAgICAgd2hpbGUgKHRoaXMubG9ncz8uZmlyc3RDaGlsZCkgdGhpcy5sb2dzLnJlbW92ZUNoaWxkKHRoaXMubG9ncy5maXJzdENoaWxkKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2hvdygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gICAgICAgIHRyeSB7c3VwZXIuc2hvdygpO30gY2F0Y2ggKGVycikge31cclxuICAgIH1cclxuICAgIHB1YmxpYyBoaWRlKCk6IHZvaWQge1xyXG4gICAgICAgIHRyeSB7c3VwZXIuaGlkZSgpO30gY2F0Y2ggKGVycikge31cclxuICAgIH1cclxuICAgIHB1YmxpYyBkaXNwbGF5KHluOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgeW4/dGhpcy5zaG93KCk6dGhpcy5oaWRlKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbiIsImltcG9ydCB7IF9nZXROdW0gfSBmcm9tIFwiLi4vZF91dGwvRl9NYXRoXCI7XHJcbmltcG9ydCB7IF9nZXRfdXVpZCB9IGZyb20gXCIuLi9kX3V0bC9GX1JhbmRcIjtcclxudHlwZSB4eSA9IHt4OiBudW1iZXIsIHk6IG51bWJlcn07XHJcblxyXG5leHBvcnQgY2xhc3MgQ19EaWFsb2cge1xyXG4gICAgcHJvdGVjdGVkIGlkOiAgc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSAgIF9fZGlhOiBIVE1MRGlhbG9nRWxlbWVudDtcclxuICAgIHByaXZhdGUgICBfX3BhbjogSFRNTERpdkVsZW1lbnQ7XHJcbiAgICBwcml2YXRlICAgX19jdHg6IEhUTUxEaXZFbGVtZW50O1xyXG4gICAgcHJpdmF0ZSAgIF9fbW9wOiB4eSA9IHt4OjAsIHk6MH07XHJcbiAgICBwcml2YXRlICAgX19yc3o6IHtbaWQ6IHN0cmluZ106IHJlc2l6ZURvbX07XHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHRhcmdldD86IEhUTUxEaWFsb2dFbGVtZW50KSB7XHJcbiAgICAgICAgaWYgKHRhcmdldCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRhcmdldCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpYWxvZycpIGFzIEhUTUxEaWFsb2dFbGVtZW50O1xyXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRhcmdldCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0YXJnZXQuaWQgPT09IHVuZGVmaW5lZCB8fCB0YXJnZXQuaWQgPT09ICcnKSB0YXJnZXQuaWQgPSAnZGlhbG9nXycgKyBfZ2V0X3V1aWQoKTtcclxuICAgICAgICB0aGlzLmlkID0gdGFyZ2V0LmlkO1xyXG5cclxuICAgICAgICB0YXJnZXQuc3R5bGUubWFyZ2luICA9ICcwJztcclxuICAgICAgICB0YXJnZXQuc3R5bGUucGFkZGluZyA9ICcwJztcclxuICAgICAgICB0aGlzLl9fZGlhID0gdGFyZ2V0O1xyXG5cclxuICAgICAgICB0aGlzLl9fcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JykgYXMgSFRNTERpdkVsZW1lbnQ7XHJcbiAgICAgICAgdGhpcy5fX3NldF9kaWFsb2dfc3R5bGUoKTtcclxuXHJcblxyXG4gICAgICAgIHRoaXMuX19jdHggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSBhcyBIVE1MRGl2RWxlbWVudDtcclxuICAgICAgICB0aGlzLl9fY3R4LnN0eWxlLmdyaWRBcmVhID0gJ21tJztcclxuICAgICAgICB0aGlzLl9fcGFuLmFwcGVuZENoaWxkKHRoaXMuX19jdHgpO1xyXG5cclxuICAgICAgICB0aGlzLl9fcnN6ID0ge307XHJcblxyXG4gICAgICAgIHRoaXMuX19zZXRfYmFyX3N0eWxlKCd0bScpO1xyXG4gICAgICAgIHRoaXMuX19zZXRfYmFyX3N0eWxlKCdtbCcpO1xyXG4gICAgICAgIHRoaXMuX19zZXRfYmFyX3N0eWxlKCdtcicpO1xyXG4gICAgICAgIHRoaXMuX19zZXRfYmFyX3N0eWxlKCdibScpO1xyXG5cclxuICAgICAgICB0aGlzLl9fc2V0X2Nvcm5lcl9zdHlsZSgndGwnKTtcclxuICAgICAgICB0aGlzLl9fc2V0X2Nvcm5lcl9zdHlsZSgndHInKTtcclxuICAgICAgICB0aGlzLl9fc2V0X2Nvcm5lcl9zdHlsZSgnYmwnKTtcclxuICAgICAgICB0aGlzLl9fc2V0X2Nvcm5lcl9zdHlsZSgnYnInKTtcclxuXHJcblxyXG4gICAgICAgIHRoaXMuX19kaWEuYXBwZW5kQ2hpbGQodGhpcy5fX3Bhbik7XHJcbiAgICB9IFxyXG4gICAgcHJpdmF0ZSBfX3NldF9kaWFsb2dfc3R5bGUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fX2RpYS5zdHlsZS5ib3JkZXIgICAgICAgPSAnbm9uZSc7XHJcbiAgICAgICAgdGhpcy5fX2RpYS5zdHlsZS5ib3JkZXJSYWRpdXMgPSAnMTBweCc7XHJcbiAgICAgICAgdGhpcy5fX2RpYS5zdHlsZS51c2VyU2VsZWN0ICAgPSAnYXV0byc7XHJcbiAgICAgICAgdGhpcy5fX2RpYS5zdHlsZS5tYXJnaW4gICAgICAgPSAnMCc7XHJcbiAgICAgICAgdGhpcy5fX2RpYS5zdHlsZS5wYWRkaW5nICAgICAgPSAnMCc7XHJcblxyXG4gICAgICAgIHRoaXMuX19wYW4uc3R5bGUuZGlzcGxheSAgICAgID0gJ2dyaWQnO1xyXG4gICAgICAgIHRoaXMuX19wYW4uc3R5bGUuZ3JpZFRlbXBsYXRlQ29sdW1ucyA9IGBcclxuICAgICAgICAgICAgW3RsLXN0YXJ0IG1sLXN0YXJ0IGJsLXN0YXJ0XVxyXG4gICAgICAgICAgICAyMHB4XHJcbiAgICAgICAgICAgIFt0bC1lbmQgbWwtZW5kIGJsLWVuZCB0bS1zdGFydCBtbS1zdGFydCBibS1zdGFydF1cclxuICAgICAgICAgICAgMWZyXHJcbiAgICAgICAgICAgIFt0bS1lbmQgbW0tZW5kIGJtLWVuZCB0ci1zdGFydCBtci1zdGFydCBici1zdGFydF1cclxuICAgICAgICAgICAgMjBweFxyXG4gICAgICAgICAgICBbdHItZW5kIG1yLWVuZCBici1lbmRdXHJcbiAgICAgICAgYDtcclxuICAgICAgICB0aGlzLl9fcGFuLnN0eWxlLmdyaWRUZW1wbGF0ZVJvd3MgPSBgXHJcbiAgICAgICAgICAgIFt0bC1zdGFydCB0bS1zdGFydCB0ci1zdGFydF1cclxuICAgICAgICAgICAgMjBweFxyXG4gICAgICAgICAgICBbdGwtZW5kIHRtLWVuZCB0ci1lbmQgbWwtc3RhcnQgbW0tc3RhcnQgbXItc3RhcnRdXHJcbiAgICAgICAgICAgIDFmclxyXG4gICAgICAgICAgICBbbWwtZW5kIG1tLWVuZCBtci1lbmQgYmwtc3RhcnQgYm0tc3RhcnQgYnItc3RhcnRdXHJcbiAgICAgICAgICAgIDIwcHhcclxuICAgICAgICAgICAgW2JsLWVuZCBibS1lbmQgYnItZW5kXVxyXG4gICAgICAgIGA7XHJcblxyXG4vLyAgICAgICAgdGhpcy5fX3Bhbi5zdHlsZS5ncmlkVGVtcGxhdGVBcmVhcyA9ICdcInRsIHRtIHRyXCIgXCJtbCBtbSBtclwiIFwiYmwgYm0gYnJcIic7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIF9fc2V0X2Jhcl9zdHlsZShhcmVhOiBzdHJpbmcpOiBIVE1MRWxlbWVudCB7XHJcbiAgICAgICAgY29uc3QgZWxtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JykgYXMgSFRNTERpdkVsZW1lbnQ7XHJcbiAgICAgICAgZWxtLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdsaWdodGN5YW4nO1xyXG4gICAgICAgIGVsbS5zdHlsZS51c2VyU2VsZWN0ICAgICAgPSAnbm9uZSc7XHJcbiAgICAgICAgZWxtLnN0eWxlLmdyaWRBcmVhID0gYXJlYTtcclxuICAgICAgICB0aGlzLl9fc2V0X21vdmVfZGlhbG9nKGVsbSk7XHJcbiAgICAgICAgdGhpcy5fX3Bhbi5hcHBlbmRDaGlsZChlbG0pO1xyXG4gICAgICAgIHJldHVybiBlbG07XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIF9fc2V0X2Nvcm5lcl9zdHlsZShhcmVhOiBzdHJpbmcpOiBIVE1MRWxlbWVudCB7XHJcbiAgICAgICAgY29uc3QgZWxtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JykgYXMgSFRNTERpdkVsZW1lbnQ7XHJcbiAgICAgICAgZWxtLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdjeWFuJztcclxuICAgICAgICBlbG0uc3R5bGUudXNlclNlbGVjdCAgICAgID0gJ25vbmUnO1xyXG4gICAgICAgIGVsbS5zdHlsZS5ncmlkQXJlYSA9IGFyZWE7XHJcblxyXG4gICAgICAgIGlmIChlbG0uaWQgPT09IHVuZGVmaW5lZCB8fCBlbG0uaWQgPT09ICcnKSBlbG0uaWQgPSBhcmVhO1xyXG4gICAgICAgIHRoaXMuX19yc3pbZWxtLmlkXSA9IG5ldyByZXNpemVEb20oZWxtLCB0aGlzLl9fZGlhKTtcclxuXHJcbiAgICAgICAgdGhpcy5fX3NldF96b29tX2RpYWxvZyhlbG0pO1xyXG4gICAgICAgIHRoaXMuX19wYW4uYXBwZW5kQ2hpbGQoZWxtKTtcclxuICAgICAgICByZXR1cm4gZWxtO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBfX3NldF96b29tX2RpYWxvZyhlbG06IEhUTUxFbGVtZW50KTogdm9pZCB7XHJcbiAgICAgICAgZWxtLnNldEF0dHJpYnV0ZSgnZHJhZ2dhYmxlJywgJ3RydWUnKTtcclxuICAgICAgICBlbG0uYWRkRXZlbnRMaXN0ZW5lcignZHJhZ3N0YXJ0JywgKGV2OkRyYWdFdmVudCk9PnsgXHJcbiAgICAgICAgICAgIHRoaXMuX19tb3AgPSB7eDowLCB5OjB9O1xyXG4gICAgICAgICAgICB0aGlzLl9fbW9wLnggPSBldi5wYWdlWDtcclxuICAgICAgICAgICAgdGhpcy5fX21vcC55ID0gZXYucGFnZVk7XHJcbiAgICAgICAgICAgIGlmIChlbG0uaWQgaW4gdGhpcy5fX3JzeikgdGhpcy5fX3JzeltlbG0uaWRdLnJlc2V0KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgZWxtLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWcnLCAoZXY6RHJhZ0V2ZW50KT0+e1xyXG4gICAgICAgICAgICBpZiAoZXYucGFnZVggPT09IHRoaXMuX19tb3AueCAmJiBldi5wYWdlWSA9PT0gdGhpcy5fX21vcC55KSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICBjb25zdCByZXNpemVYICA9IGV2LnBhZ2VYIC0gdGhpcy5fX21vcC54O1xyXG4gICAgICAgICAgICBjb25zdCByZXNpemVZICA9IGV2LnBhZ2VZIC0gdGhpcy5fX21vcC55O1xyXG4gICAgICAgICAgICBpZiAoZWxtLmlkIGluIHRoaXMuX19yc3opIHRoaXMuX19yc3pbZWxtLmlkXS5yZXNpemUocmVzaXplWCwgcmVzaXplWSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgZWxtLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdlbmQnLCAoZXY6RHJhZ0V2ZW50KT0+eyBcclxuICAgICAgICAgICAgY29uc3QgcmVzaXplWCAgPSBldi5wYWdlWCAtIHRoaXMuX19tb3AueDtcclxuICAgICAgICAgICAgY29uc3QgcmVzaXplWSAgPSBldi5wYWdlWSAtIHRoaXMuX19tb3AueTtcclxuICAgICAgICAgICAgaWYgKGVsbS5pZCBpbiB0aGlzLl9fcnN6KSB0aGlzLl9fcnN6W2VsbS5pZF0ucmVzaXplKHJlc2l6ZVgsIHJlc2l6ZVkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBfX3NldF9tb3ZlX2RpYWxvZyhlbG06IEhUTUxFbGVtZW50KTogdm9pZCB7IFxyXG4gICAgICAgIGVsbS5zZXRBdHRyaWJ1dGUoJ2RyYWdnYWJsZScsICd0cnVlJyk7XHJcbiAgICAgICAgZWxtLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdzdGFydCcsIChldjpEcmFnRXZlbnQpPT57IFxyXG4gICAgICAgICAgICB0aGlzLl9fbW9wID0ge3g6MCwgeTowfTtcclxuICAgICAgICAgICAgdGhpcy5fX21vcC55ID0gdGhpcy5fX2RpYS5vZmZzZXRUb3AgIC0gZXYucGFnZVk7XHJcbiAgICAgICAgICAgIHRoaXMuX19tb3AueCA9IHRoaXMuX19kaWEub2Zmc2V0TGVmdCAtIGV2LnBhZ2VYO1xyXG4vLyAgICAgICAgICAgIGV2LmRhdGFUcmFuc2Zlcj8uc2V0RHJhZ0ltYWdlKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpLCAwLCAwKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBlbG0uYWRkRXZlbnRMaXN0ZW5lcignZHJhZycsIChldjpEcmFnRXZlbnQpPT57XHJcbiAgICAgICAgICAgIGlmIChldi54ID09PSAwICYmIGV2LnkgPT09IDApIHJldHVybjtcclxuICAgICAgICAgICAgY29uc3QgdG9wICA9IGV2LnBhZ2VZICsgdGhpcy5fX21vcC55O1xyXG4gICAgICAgICAgICBjb25zdCBsZWZ0ID0gZXYucGFnZVggKyB0aGlzLl9fbW9wLng7XHJcbi8vICAgICAgICAgICAgY29uc3QgcmlnaHQgPSB3aW5kb3cub3V0ZXJXaWR0aCAtIGV2LnBhZ2VYO1xyXG4gICAgICAgICAgICB0aGlzLl9fZGlhLnN0eWxlLnRvcCAgID0gdG9wICAgKyAncHgnO1xyXG4gICAgICAgICAgICB0aGlzLl9fZGlhLnN0eWxlLmxlZnQgID0gbGVmdCAgKyAncHgnO1xyXG4vLyAgICAgICAgICAgIHRoaXMuX19kaWEuc3R5bGUucmlnaHQgPSByaWdodCArICdweCc7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgZWxtLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdlbmQnLCAoZXY6RHJhZ0V2ZW50KT0+eyBcclxuICAgICAgICAgICAgdGhpcy5fX21vcCA9IHt4OjAsIHk6MH07XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgZ2V0V2luZG93KCk6IEhUTUxEaXZFbGVtZW50IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fX2N0eDtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBzZXRXaW5kb3coY3R4OiBIVE1MRGl2RWxlbWVudCk6IEhUTUxEaXZFbGVtZW50IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB0aGlzLl9fcGFuLnJlbW92ZUNoaWxkKHRoaXMuX19jdHgpO1xyXG4gICAgICAgICAgICB0aGlzLl9fcGFuLmFwcGVuZENoaWxkKGN0eCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9fY3R4ID0gY3R4O1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge31cclxuICAgICAgICByZXR1cm4gY3R4O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRab29tRWxtKGVsbTogSFRNTEVsZW1lbnQpOiB2b2lkIHtcclxuICAgICAgICBmb3IgKGNvbnN0IGlpIGluIHRoaXMuX19yc3opIHRoaXMuX19yc3pbaWldLnNldFpvb21FbG0oZWxtKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBjbHJab29tKCk6IHZvaWQge1xyXG4gICAgICAgIGZvciAoY29uc3QgaWkgaW4gdGhpcy5fX3JzeikgdGhpcy5fX3JzeltpaV0uY2xyWm9vbUVsbSgpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgc2hvdygpOiB2b2lkIHsgXHJcbiAgICAgICAgdHJ5IHt0aGlzLl9fZGlhLnNob3coKX0gY2F0Y2ggKGVycikge31cclxuICAgIH1cclxuICAgIHB1YmxpYyBoaWRlKCk6IHZvaWQgeyBcclxuICAgICAgICB0cnkge3RoaXMuX19kaWEuY2xvc2UoKX0gY2F0Y2ggKGVycikge31cclxuICAgIH1cclxuICAgIHB1YmxpYyBkaXNwbGF5KHluOiBib29sZWFuKTogdm9pZCB7IFxyXG4gICAgICAgIHluP3RoaXMuc2hvdygpOnRoaXMuaGlkZSgpO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyByZXNpemVEb20ge1xyXG4gICAgcHJpdmF0ZSBfX2RpYTogIEhUTUxFbGVtZW50O1xyXG4gICAgcHJpdmF0ZSBfX2NucjogIEhUTUxFbGVtZW50O1xyXG4gICAgcHJpdmF0ZSBfX3RyZzogIEhUTUxFbGVtZW50fHVuZGVmaW5lZDtcclxuICAgIHByaXZhdGUgX19jYW46IHt4OiBib29sZWFuLCB5OiBib29sZWFufTtcclxuICAgIHByaXZhdGUgX190b3A6ICB4eTtcclxuICAgIHByaXZhdGUgX19zaXo6ICB4eTtcclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihjbnI6IEhUTUxFbGVtZW50LCBkaWE6IEhUTUxFbGVtZW50KSB7XHJcbiAgICAgICAgdGhpcy5fX2RpYSA9IGRpYTsgdGhpcy5fX2NuciA9IGNucjtcclxuICAgICAgICB0aGlzLl9fY2FuID0ge3g6ZmFsc2UsIHk6IGZhbHNlfTtcclxuICAgICAgICB0aGlzLl9fdG9wID0ge3g6MCwgeTowfTtcclxuICAgICAgICB0aGlzLl9fc2l6ID0ge3g6MCwgeTowfTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXRab29tRWxtKHRyZzogSFRNTEVsZW1lbnQpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9fdHJnICAgPSB0cmc7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgY2xyWm9vbUVsbSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9fdHJnICAgPSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgcmVzZXQoKTogdm9pZCB7XHJcbiAgICAgICAgLy8gWm9vbeWvvuixoeOBjOioreWumuOBleOCjOOBpuOBhOOBquOBkeOCjOOBsOS9leOCguOBl+OBquOBhFxyXG4gICAgICAgIGlmICh0aGlzLl9fdHJnID09PSB1bmRlZmluZWQpIHJldHVybjtcclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgLy8gRGlhbG9n44Gu5bem5Y2K5YiG44Gr5a++6LGh44Kz44O844OK44O844GM5pyJ44KM44Gw44K144Kk44K65aSJ5pu044Gu6Zqb44Gr5bem6L6644KS5YuV44GL44GZ44Gu44Gn44Gd44Gu44OV44Op44Kw6Kit5a6aKHgpXHJcbiAgICAgICAgICAgIC8vIERpYWxvZ+OBruS4iuWNiuWIhuOBq+WvvuixoeOCs+ODvOODiuODvOOBjOacieOCjOOBsOOCteOCpOOCuuWkieabtOOBrumam+OBq+S4iui+uuOCkuWLleOBi+OBmeOBruOBp+OBneOBruODleODqeOCsOioreWumih5KVxyXG4gICAgICAgICAgICBjb25zdCBwYXJlbnQgID0gIHRoaXMuX19jbnIub2Zmc2V0UGFyZW50IGFzIEhUTUxFbGVtZW50O1xyXG4gICAgICAgICAgICB0aGlzLl9fY2FuLnggID0gIHRoaXMuX19jbnIub2Zmc2V0TGVmdCA8IChwYXJlbnQ/Lm9mZnNldFdpZHRoICAvIDIpO1xyXG4gICAgICAgICAgICB0aGlzLl9fY2FuLnkgID0gIHRoaXMuX19jbnIub2Zmc2V0VG9wICA8IChwYXJlbnQ/Lm9mZnNldEhlaWdodCAvIDIpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICB0aGlzLl9fY2FuLnggID0gIHRoaXMuX19jYW4ueSAgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gRGlhbG9n44Gu5bem5LiK44Gu5bqn5qiZ44KS5L+d5a2YXHJcbiAgICAgICAgdGhpcy5fX3RvcC54ID0gdGhpcy5fX2RpYS5vZmZzZXRMZWZ0OyBcclxuICAgICAgICB0aGlzLl9fdG9wLnkgPSB0aGlzLl9fZGlhLm9mZnNldFRvcDsgXHJcblxyXG4gICAgICAgIC8vIFpvb23lr77osaHjgajjgZnjgovopoHntKDjga7luYXjgajpq5jjgZXjgpLkv53lrZhcclxuICAgICAgICB0aGlzLl9fc2l6LnggPSB0aGlzLl9fdHJnLm9mZnNldFdpZHRoOyBcclxuICAgICAgICB0aGlzLl9fc2l6LnkgPSB0aGlzLl9fdHJnLm9mZnNldEhlaWdodDsgXHJcbiAgICB9XHJcbiAgICBwdWJsaWMgcmVzaXplKHJlc2l6ZVg6IG51bWJlciwgcmVzaXplWTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgLy8gWm9vbeWvvuixoeOBjOioreWumuOBleOCjOOBpuOBhOOBquOBkeOCjOOBsOS9leOCguOBl+OBquOBhFxyXG4gICAgICAgIGlmICh0aGlzLl9fdHJnID09PSB1bmRlZmluZWQpIHJldHVybjtcclxuXHJcbiAgICAgICAgLy8gRGlhbG9n44Gu5bem5Y2K5YiG44Gr5a++6LGh44Kz44O844OK44O844GM5pyJ44KM44Gw5bem6L6644KS5YuV44GL44GZXHJcbiAgICAgICAgLy8g5bem6L6644KS5Ly444Gw44GZ44Gu44Gn44Oq44K144Kk44K66YeP44Gv5Y+N6Lui44GV44Gb44KLXHJcbiAgICAgICAgaWYgKHRoaXMuX19jYW4ueCkge1xyXG4gICAgICAgICAgICByZXNpemVYID0gLXJlc2l6ZVg7XHJcbiAgICAgICAgICAgIHRoaXMuX19kaWEuc3R5bGUubGVmdCAgPSB0aGlzLl9fdG9wLnggLSByZXNpemVYICArICdweCc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIERpYWxvZ+OBruS4iuWNiuWIhuOBq+WvvuixoeOCs+ODvOODiuODvOOBjOacieOCjOOBsOS4iui+uuOCkuWLleOBi+OBmVxyXG4gICAgICAgIC8vIOS4iui+uuOCkuS8uOOBsOOBmeOBruOBp+ODquOCteOCpOOCuumHj+OBr+WPjei7ouOBleOBm+OCi1xyXG4gICAgICAgIGlmICh0aGlzLl9fY2FuLnkpIHtcclxuICAgICAgICAgICAgcmVzaXplWSA9IC1yZXNpemVZO1xyXG4gICAgICAgICAgICB0aGlzLl9fZGlhLnN0eWxlLnRvcCAgID0gdGhpcy5fX3RvcC55IC0gcmVzaXplWSAgICsgJ3B4JztcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gWm9vbeWvvuixoeOCkuOCteOCpOOCuuWkieabtOOBmeOCi1xyXG4gICAgICAgIHRoaXMuX190cmcuc3R5bGUud2lkdGggID0gdGhpcy5fX3Npei54ICsgcmVzaXplWCArICdweCc7XHJcbiAgICAgICAgdGhpcy5fX3RyZy5zdHlsZS5oZWlnaHQgPSB0aGlzLl9fc2l6LnkgKyByZXNpemVZICsgJ3B4JztcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBfbWluIH0gICAgICAgICAgZnJvbSBcIi4uL2RfdXRsL0ZfTWF0aFwiO1xyXG5pbXBvcnQgeyBDX1VybE9wdCB9ICAgICAgZnJvbSBcIi4uL2RfdXRsL0NfVXJsT3B0XCI7XHJcbmltcG9ydCB7IGdfbWVzLCBfYWxlcnQsIGdfZGVidWcsIGdfYWxlcnQgfSBmcm9tIFwiLi4vZF9jbW4vZ2xvYmFsXCI7XHJcblxyXG5cclxuLy8g6Z2e5ZCM5pyf6YCa5L+h54mIIFBPU1QoU3RyaW5nKSAmIEdFVCBKU09OXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUX2FuZF9nZXRfSlNPTihcclxuICAgIHVybDogc3RyaW5nLCBcclxuICAgIG9wdDogQ19VcmxPcHQsIFxyXG4pOiBQcm9taXNlPGFueXx1bmRlZmluZWQ+IHtcclxuICAgIGNvbnN0IGZvcm1fZGF0YSA9IG9wdC50b0Zvcm1EYXRhKCk7XHJcblxyXG4gICAgaWYgKGZvcm1fZGF0YSA9PT0gdW5kZWZpbmVkKSByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgdmFyIHJlczogUmVzcG9uc2U7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHJlcyA9IGF3YWl0IGZldGNoKHVybCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgY2FjaGU6ICAnbm8tY2FjaGUnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbi8vICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwibXVsdGlwYXJ0L2Zvcm0tZGF0YVwiXHJcbi8vICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXCJcclxuLy8gICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxufSxcclxuICAgICAgICAgICAgYm9keTogb3B0LnRvRm9ybURhdGEoKVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmICghcmVzLm9rKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihg44Os44K544Od44Oz44K544K544OG44O844K/44K5ICgke3Jlcy5zdGF0dXN9KWApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNhdGNoIChlcnIpIHtcclxuICAgICAgICBnX21lcy53YXJuaW5nX21lc3NhZ2UoJ+mAmuS/oeOCqOODqeODvDogJyArIGVycik7XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBtb25pdG9yID0gdHJ1ZTsgIC8vIGFsZXJ044Gn5Y+X5L+h44GX44Gf44OG44Kt44K544OI44KS6KGo56S644GZ44KL44Go44GN44GrdHJ1ZeOBq+OBmeOCi1xyXG5cclxuICAgIHJldHVybiByZXMudGV4dCgpXHJcbiAgICAgICAgLnRoZW4odHh0PT57XHJcbiAgICAgICAgICAgIGNvbnN0IHR4ID0gdHh0LnNsaWNlKCk7XHJcblxyXG4vLyAgICAgICAgICAgIGlmIChtb25pdG9yKSBfYWxlcnQodHgpO1xyXG4gICAgICAgICAgICBpZiAobW9uaXRvcikge1xyXG4gICAgICAgICAgICAgICAgZ19hbGVydC5zZXRfbWVzc2FnZShgUE9TVCBVUkw6YCwgdXJsKTtcclxuICAgICAgICAgICAgICAgIGdfYWxlcnQuc2V0X21lc3NhZ2UoYFBPU1QgT1BUOmAsIG9wdC50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgIGdfYWxlcnQuc2V0X21lc3NhZ2UoYFBPU1QgREFUQTpgLCB0eCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZSh0eHQpO1xyXG4gICAgICAgICAgICB9IGNhdGNoKGVycikge1xyXG4gICAgICAgICAgICAgICAgZ19tZXMud2FybmluZ19tZXNzYWdlKCdKU09O5b2i5byP44Gu44OH44Kz44O844OJ44Ko44Op44O8Jyk7XHJcbiAgICAgICAgICAgICAgICBfYWxlcnQodHgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG59XHJcblxyXG4vLyDpnZ7lkIzmnJ/pgJrkv6HniYggUE9TVChKU09OKSAmIEdFVCBKU09OXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUX2FuZF9nZXRfSlNPTjMoXHJcbiAgICB1cmw6IHN0cmluZywgXHJcbiAgICBvcHQ6IENfVXJsT3B0LCBcclxuKTogUHJvbWlzZTxhbnl8dW5kZWZpbmVkPiB7XHJcbiAgICBjb25zdCBmb3JtX2RhdGEgPSBvcHQudG9Gb3JtRGF0YSgpO1xyXG5cclxuICAgIGlmIChmb3JtX2RhdGEgPT09IHVuZGVmaW5lZCkgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIHZhciByZXM6IFJlc3BvbnNlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICByZXMgPSBhd2FpdCBmZXRjaCh1cmwsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgIGNhY2hlOiAgJ25vLWNhY2hlJyxcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4vLyAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcIm11bHRpcGFydC9mb3JtLWRhdGFcIlxyXG4vLyAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFwiXHJcbiAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG59LFxyXG4gICAgICAgICAgICBib2R5OiBvcHQudG9KU09OKClcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoIXJlcy5vaykge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYOODrOOCueODneODs+OCueOCueODhuODvOOCv+OCuSAoJHtyZXMuc3RhdHVzfSlgKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgZ19tZXMud2FybmluZ19tZXNzYWdlKCfpgJrkv6Hjgqjjg6njg7w6ICcgKyBlcnIpO1xyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgbW9uaXRvciA9IHRydWU7ICAvLyBhbGVydOOBp+WPl+S/oeOBl+OBn+ODhuOCreOCueODiOOCkuihqOekuuOBmeOCi+OBqOOBjeOBq3RydWXjgavjgZnjgotcclxuXHJcbiAgICByZXR1cm4gcmVzLnRleHQoKVxyXG4gICAgICAgIC50aGVuKHR4dD0+e1xyXG4gICAgICAgICAgICBjb25zdCB0eCA9IHR4dC5zbGljZSgpO1xyXG5cclxuLy8gICAgICAgICAgICBpZiAobW9uaXRvcikgX2FsZXJ0KHR4KTtcclxuICAgICAgICAgICAgaWYgKG1vbml0b3IpIHtcclxuICAgICAgICAgICAgICAgIGdfYWxlcnQuc2V0X21lc3NhZ2UoYFBPU1QgVVJMOmAsIHVybCk7XHJcbiAgICAgICAgICAgICAgICBnX2FsZXJ0LnNldF9tZXNzYWdlKGBQT1NUIE9QVDpgLCBvcHQudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICBnX2FsZXJ0LnNldF9tZXNzYWdlKGBQT1NUIERBVEE6YCwgdHgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UodHh0KTtcclxuICAgICAgICAgICAgfSBjYXRjaChlcnIpIHtcclxuICAgICAgICAgICAgICAgIGdfbWVzLndhcm5pbmdfbWVzc2FnZSgnSlNPTuW9ouW8j+OBruODh+OCs+ODvOODieOCqOODqeODvCcpO1xyXG4gICAgICAgICAgICAgICAgX2FsZXJ0KHR4KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxufVxyXG5cclxuXHJcblxyXG5cclxuLy8g5ZCM5pyf6YCa5L+h54mIIFBPU1QgJiBHRVQgSlNPTlxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUE9TVF9hbmRfZ2V0X0pTT04yKFxyXG4gICAgdXJsOiBzdHJpbmcsIFxyXG4gICAgb3B0OiBDX1VybE9wdCwgXHJcbik6IFByb21pc2U8YW55fHVuZGVmaW5lZD4ge1xyXG4gICAgY29uc3QgcmVxT2JqID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7IC8vIG9iamVjdCBvZiByZXF1ZXN0XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgICByZXFPYmoub3BlbihcIlBPU1RcIiwgdXJsLCBmYWxzZSk7IC8vIFN5bmMgbW9kZVxyXG4gICAgICAgIHJlcU9iai5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29udGVudC10eXBlXCIsIFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXCIpOyAvLyBzZXR0aW5nIG9mIGhlYWRlcnMgIGluIHJlcXVlc3RcclxuICAgICAgICByZXFPYmouc2VuZChvcHQudG9Gb3JtRGF0YSgpKTsgLy8gZGF0YSB0byBzZW5kIGluIHJlcXVlc3RcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGdfbWVzLndhcm5pbmdfbWVzc2FnZShg6YCa5L+h44Ko44Op44O8OiAke3JlcU9iai5zdGF0dXN9YCk7XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB0eHQgPSByZXFPYmoucmVzcG9uc2VUZXh0OyAvLyBkaXNwbGF5aW5nIHJlc3BvbnNlIHRleHQgaW4gcGFyYWdyYXBoIHRhZ1xyXG5cclxuICAgIGNvbnN0IG1vbml0b3IgPSB0cnVlOyAgLy8gYWxlcnTjgaflj5fkv6HjgZfjgZ/jg4bjgq3jgrnjg4jjgpLooajnpLrjgZnjgovjgajjgY3jgat0cnVl44Gr44GZ44KLXHJcbiAgICBpZiAobW9uaXRvcikge1xyXG4gICAgICAgIGdfYWxlcnQuc2V0X21lc3NhZ2UoYFBPU1QgVVJMOmAsICB1cmwpO1xyXG4gICAgICAgIGdfYWxlcnQuc2V0X21lc3NhZ2UoYFBPU1QgT1BUOmAsICBvcHQudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgZ19hbGVydC5zZXRfbWVzc2FnZShgUE9TVCBEQVRBOmAsIHR4dCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKE51bWJlcihyZXFPYmouc3RhdHVzKSA+IDM5OSkge1xyXG4gICAgICAgIGdfbWVzLndhcm5pbmdfbWVzc2FnZShg44Os44K544Od44Oz44K544K544OG44O844K/44K5OiAke3JlcU9iai5zdGF0dXN9YCk7XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICB0cnkge1xyXG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKHR4dCk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBnX21lcy53YXJuaW5nX21lc3NhZ2UoJ0pTT07lvaLlvI/jga7jg4fjgrPjg7zjg4njgqjjg6njg7w6ICcgKyBlcnIpO1xyXG4gICAgICAgIF9hbGVydCh0eHQpO1xyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBQT1NUX2FuZF9tb3ZlX3BhZ2UodXJsOiBzdHJpbmcsIG9wdDogQ19VcmxPcHQpOiB2b2lkIHtcclxuICAgIGNyZWF0ZV9mb3JtKHVybCwgb3B0KS5zdWJtaXQoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlX2Zvcm0odXJsOiBzdHJpbmcsIG9wdDogQ19VcmxPcHQpOiBIVE1MRm9ybUVsZW1lbnQge1xyXG4gICAgY29uc3QgZm9ybSAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJykgYXMgSFRNTEZvcm1FbGVtZW50O1xyXG5cclxuICAgIGZvcm0uaWQgICAgID0gJ2R1bW15X2Zvcm1fJyArIG5ldyBEYXRlKCkudmFsdWVPZigpLnRvU3RyaW5nKCk7XHJcbiAgICBmb3JtLm1ldGhvZCA9ICdQT1NUJztcclxuICAgIGZvcm0uYWN0aW9uID0gIHVybDtcclxuICAgIGZvcm0uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuXHJcbiAgICBmb3IgKHZhciBrZXkgb2Ygb3B0LmdldF9rZXlzKCkpIHtcclxuICAgICAgICBjcmVhdGVfaW5wdXQoZm9ybSwgZm9ybS5pZCwga2V5LCBvcHQuZ2V0KGtleSkpO1xyXG4gICAgfVxyXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChmb3JtKTtcclxuICAgIHJldHVybiBmb3JtO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVfaW5wdXQoZm9ybTogSFRNTEZvcm1FbGVtZW50LCBmaWQ6IHN0cmluZywgbmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKTogSFRNTElucHV0RWxlbWVudCB7XHJcbiAgICBjb25zdCBpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xyXG5cclxuICAgIGkudHlwZSAgPSAnaGlkZGVuJztcclxuICAgIGkubmFtZSAgPSBuYW1lO1xyXG4gICAgaS52YWx1ZSA9IHZhbHVlO1xyXG4gICAgaS5zdHlsZS5kaXNwbGF5ID0nbm9uZSc7XHJcbiAgICBpLnNldEF0dHJpYnV0ZSgnZm9yJywgICBmaWQpO1xyXG4gICAgZm9ybS5hcHBlbmRDaGlsZChpKTtcclxuXHJcbiAgICByZXR1cm4gaTtcclxufVxyXG4iLCJpbXBvcnQgeyBhbGVydF9zYXZlX2RldGFpbCwgYWxlcnRfc2F2ZV9pbmZvIH0gZnJvbSAnLi4vZF9tZGwvQ19TYXZlRGF0YSc7IFxyXG5pbXBvcnQgeyBhbGVydF90ZWFtX2luZm8gfSAgICAgZnJvbSBcIi4uL2RfbWRsL0NfVGVhbVwiOyBcclxuaW1wb3J0IHsgYWxlcnRfbWF6ZV9pbmZvIH0gICAgIGZyb20gXCIuLi9kX21kbC9DX01hemVcIjsgXHJcbmltcG9ydCB7IGFsZXJ0X2d1bGRfaW5mbyB9ICAgICBmcm9tIFwiLi4vZF9tZGwvQ19HdWlsZFwiOyBcclxuaW1wb3J0IHsgYWxlcnRfbXZwdF9pbmZvIH0gICAgIGZyb20gXCIuLi9kX21kbC9DX01vdmFibGVQb2ludFwiO1xyXG5pbXBvcnQgeyBhbGVydF9ocmVzX2luZm8gfSAgICAgZnJvbSBcIi4uL2RfbWRsL0NfSGVyb1wiOyBcclxuaW1wb3J0IHsgYWxlcnRfUERfaW5mbyB9ICAgICAgIGZyb20gXCIuLi9kX21kbC9DX1BvaW50RGlyXCI7XHJcbmltcG9ydCB7IGFsZXJ0X21hemVpbmZvX2luZm8gfSBmcm9tICcuLi9kX21kbC9DX01hemVJbmZvJztcclxuXHJcbmltcG9ydCB7IF9yb3VuZCwgX21pbiwgX21heCAgfSBmcm9tIFwiLi4vZF91dGwvRl9NYXRoXCI7XHJcbmltcG9ydCB7IENfVXJsT3B0IH0gICAgICAgICAgICBmcm9tIFwiLi4vZF91dGwvQ19VcmxPcHRcIjsgIFxyXG5pbXBvcnQgeyBQT1NUX2FuZF9nZXRfSlNPTiwgIFBPU1RfYW5kX2dldF9KU09OMywgUE9TVF9hbmRfbW92ZV9wYWdlIH0gZnJvbSBcIi4uL2RfY21uL0ZfUE9TVFwiO1xyXG5pbXBvcnQgeyBcclxuICAgIF9hbGVydCwgZ19tZXMsIGdfc3RhcnRfZW52LCBcclxuICAgIGdfdXJsLCAgZ191cmxfZ3QyX21hemUsIGdfdXJsX2dldF9zYXZlLCBnX3VybF9ndDJfZ3VsZCwgXHJcbiAgICBnX3NhdmUsXHJcbiAgICBnX3VybF9hbGxfbWF6ZSxcclxuICAgIGdfdXJsX2dldF9tYXplLCBcclxuICAgIGdfdXJsX25ld19tYXplLFxyXG4gICAgZ191cmxfbmV3X2d1bGQsXHJcbiAgICBnX3VybF9hbGxfaHJlcyxcclxuICAgIGdfdXJsX2NoZWNrX0pTT04sXHJcbiAgICBnX3VybF9ndDJfc2F2ZSxcclxuICAgIGdfdXJsX2dldF9pbmZvLFxyXG4gICAgZ191cmxfZ2V0X2RhdGEsXHJcbiAgICBnX3VybF9wdXRfZGF0YSxcclxufSBmcm9tIFwiLi4vZF9jbW4vZ2xvYmFsXCI7XHJcblxyXG5cclxudHlwZSBUX2NhbGxiYWNrID0gKGpzb25PYmo6YW55KT0+KGJvb2xlYW58dm9pZCk7XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0X21haV9tYXplKGNhbGxiYWNrPzogVF9jYWxsYmFjayk6IFByb21pc2U8YW55fHVuZGVmaW5lZD4ge1xyXG4gICAgY29uc3Qgb3B0ID0gbmV3IENfVXJsT3B0KCk7XHJcbiAgICBvcHQuc2V0KCdtb2RlJywgJ25ld19nYW1lJyk7IFxyXG4gICAgb3B0LnNldCgncGlkJywgICBnX3N0YXJ0X2Vudi5waWQpO1xyXG4vLyAgICByZXR1cm4gYXdhaXQgX2dldF9uZXdfZ2FtZShnX3VybFtnX3VybF9ndDJfbWF6ZV0sIG9wdCwgY2FsbGJhY2spO1xyXG4gICAgcmV0dXJuIGF3YWl0IF9nZXRfbmV3X2dhbWUoZ191cmxbZ191cmxfbmV3X21hemVdLCBvcHQsIGNhbGxiYWNrKTtcclxufVxyXG5cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRfbWFpX2d1bGQoY2FsbGJhY2s/OiBUX2NhbGxiYWNrKTogUHJvbWlzZTxhbnl8dW5kZWZpbmVkPiB7XHJcbiAgICBjb25zdCBvcHQgPSBuZXcgQ19VcmxPcHQoKTtcclxuICAgIG9wdC5zZXQoJ21vZGUnLCAnbmV3X2dhbWUnKTsgXHJcbiAgICBvcHQuc2V0KCdwaWQnLCAgIGdfc3RhcnRfZW52LnBpZC50b1N0cmluZygpKTtcclxuLy8gICAgcmV0dXJuIGF3YWl0IF9nZXRfbmV3X2dhbWUoZ191cmxbZ191cmxfZ3QyX2d1bGRdLCBvcHQsIGNhbGxiYWNrKTtcclxuICAgIHJldHVybiBhd2FpdCBfZ2V0X25ld19nYW1lKGdfdXJsW2dfdXJsX25ld19ndWxkXSwgb3B0LCBjYWxsYmFjayk7XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIF9nZXRfbmV3X2dhbWUodXJsOiBzdHJpbmcsIG9wdDogQ19VcmxPcHQsIGNhbGxiYWNrPzogVF9jYWxsYmFjayk6IFByb21pc2U8YW55fHVuZGVmaW5lZD4ge1xyXG4gICAgcmV0dXJuIGF3YWl0IFBPU1RfYW5kX2dldF9KU09OMyh1cmwsIG9wdCk/LnRoZW4oanNvbk9iaj0+e1xyXG4gICAgICAgIGlmIChqc29uT2JqLmVjb2RlID09PSAwKSB7XHJcbiAgICAgICAgICAgIGdfbWVzLm5vcm1hbF9tZXNzYWdlKCfmraPluLjjgavjg63jg7zjg4njgZXjgozjgb7jgZfjgZ8nKTtcclxuICAgICAgICBcclxuICAgICAgICAgICAgaWYgKGpzb25PYmouc2F2ZSAgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgZ19tZXMud2FybmluZ19tZXNzYWdlKFwi5L+d5a2Y44OH44O844K/44GM5LiN5q2j44Gq5b2i5byP44Gn44GX44GfXFxuXCIgKyBqc29uT2JqLmVtc2cpO1xyXG4gICAgICAgICAgICAgICAgX2FsZXJ0KGpzb25PYmouZW1zZyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCBtb25pdG9yID0gZmFsc2U7ICAvLyBhbGVydOOBp+WPl+S/oeOBl+OBn+ODhuOCreOCueODiOOCkuihqOekuuOBmeOCi+OBqOOBjeOBq3RydWXjgavjgZnjgotcclxuICAgICAgICAgICAgaWYgKG1vbml0b3IpIHtcclxuICAgICAgICAgICAgICAgIGlmIChqc29uT2JqPy5zYXZlICAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnRfc2F2ZV9pbmZvKGpzb25PYmouc2F2ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnRfc2F2ZV9kZXRhaWwoanNvbk9iai5zYXZlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2sgIT09IHVuZGVmaW5lZCkgY2FsbGJhY2soanNvbk9iaik7XHJcbiAgICAgICAgICAgIHJldHVybiBqc29uT2JqO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGdfbWVzLndhcm5pbmdfbWVzc2FnZShcIuODreODvOODieOBp+OBjeOBvuOBm+OCk+OBp+OBl+OBn1xcblwiICsganNvbk9iai5lbXNnKTtcclxuICAgICAgICAgICAgX2FsZXJ0KGpzb25PYmouZW1zZyk7XHJcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRfbmV3X21hemUobWF6ZV9uYW1lOiBzdHJpbmcsIGNhbGxiYWNrPzogVF9jYWxsYmFjayk6IFByb21pc2U8YW55fHVuZGVmaW5lZD4ge1xyXG4gICAgY29uc3Qgb3B0ID0gbmV3IENfVXJsT3B0KCk7XHJcbiAgICBvcHQuc2V0KCdtb2RlJywgICAgICAnbmV3X21hemUnKTtcclxuICAgIG9wdC5zZXQoJ3BpZCcsICAgICAgICBnX3N0YXJ0X2Vudi5waWQpO1xyXG4gICAgb3B0LnNldCgnbWF6ZV9uYW1lJywgIG1hemVfbmFtZSk7XHJcblxyXG4vLyAgICByZXR1cm4gUE9TVF9hbmRfZ2V0X0pTT04oZ191cmxbZ191cmxfZ3QyX21hemVdLCBvcHQpPy50aGVuKGpzb25PYmo9PntcclxuICAgIHJldHVybiBQT1NUX2FuZF9nZXRfSlNPTjMoZ191cmxbZ191cmxfZ2V0X21hemVdLCBvcHQpPy50aGVuKGpzb25PYmo9PntcclxuICAgICAgICBpZiAoanNvbk9iai5lY29kZSAhPT0gMCkge1xyXG4gICAgICAgICAgICBnX21lcy53YXJuaW5nX21lc3NhZ2UoXCLmlrDov7flrq7jg4fjg7zjgr/jgpLlj5fkv6HjgafjgY3jgb7jgZvjgpPjgafjgZfjgZ9cXG5cIiArIGpzb25PYmouZW1zZyk7XHJcbiAgICAgICAgICAgIF9hbGVydChqc29uT2JqLmVtc2cpO1xyXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoanNvbk9iaj8uZGF0YSAgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBnX21lcy53YXJuaW5nX21lc3NhZ2UoXCLlj5fkv6Hjg4fjg7zjgr/jgYzkuI3mraPjgarlvaLlvI/jgafjgZfjgZ9cXG5cIiArIGpzb25PYmouZW1zZyk7XHJcbiAgICAgICAgICAgIF9hbGVydChqc29uT2JqLmVtc2cpO1xyXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoanNvbk9iaj8uZGF0YT8ubWF6ZSAgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBnX21lcy53YXJuaW5nX21lc3NhZ2UoXCLmlrDov7flrq7jg4fjg7zjgr/jgYzkuI3mraPjgarlvaLlvI/jgafjgZfjgZ9cXG5cIiArIGpzb25PYmouZW1zZyk7XHJcbiAgICAgICAgICAgIF9hbGVydChqc29uT2JqLmVtc2cpO1xyXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoanNvbk9iaj8uZGF0YT8ucG9zICAgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBnX21lcy53YXJuaW5nX21lc3NhZ2UoXCLmlrDov7flrq7jga7kvY3nva7jg4fjg7zjgr/jgYzkuI3mraPjgarlvaLlvI/jgafjgZfjgZ9cXG5cIiArIGpzb25PYmouZW1zZyk7XHJcbiAgICAgICAgICAgIF9hbGVydChqc29uT2JqLmVtc2cpO1xyXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgbW9uaXRvciA9IGZhbHNlICAvLyBhbGVydOOBp+WPl+S/oeOBl+OBn+ODhuOCreOCueODiOOCkuihqOekuuOBmeOCi+OBqOOBjeOBq3RydWXjgavjgZnjgotcclxuICAgICAgICBpZiAobW9uaXRvcikge1xyXG4gICAgICAgICAgICBpZiAoanNvbk9iaj8uZGF0YT8ubWF6ZSAgIT09IHVuZGVmaW5lZCkgYWxlcnRfbWF6ZV9pbmZvKGpzb25PYmouZGF0YS5tYXplKTtcclxuICAgICAgICAgICAgaWYgKGpzb25PYmo/LmRhdGE/LnBvcyAgICE9PSB1bmRlZmluZWQpIGFsZXJ0X1BEX2luZm8gIChqc29uT2JqLmRhdGEucG9zKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNhbGxiYWNrICE9PSB1bmRlZmluZWQpIGNhbGxiYWNrKGpzb25PYmo/LmRhdGEpO1xyXG5cclxuICAgICAgICByZXR1cm4ganNvbk9iajtcclxuICAgIH0pOyBcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldF9zYXZlX2luZm8oY2FsbGJhY2s/OiBUX2NhbGxiYWNrKTogUHJvbWlzZTxhbnl8dW5kZWZpbmVkPiB7XHJcbiAgICBjb25zdCBvcHQgPSBuZXcgQ19VcmxPcHQoKTtcclxuICAgIG9wdC5zZXQoJ21vZGUnLCAgICAgICAnc2F2ZV9pbmZvJyk7IFxyXG4gICAgb3B0LnNldCgncGlkJywgICAgICAgICBnX3N0YXJ0X2Vudi5waWQpO1xyXG5cclxuLy8gICAgcmV0dXJuIFBPU1RfYW5kX2dldF9KU09OKGdfdXJsW2dfdXJsX2d0Ml9zYXZlXSwgb3B0KT8udGhlbihqc29uT2JqPT57XHJcbiAgICByZXR1cm4gUE9TVF9hbmRfZ2V0X0pTT04zKGdfdXJsW2dfdXJsX2dldF9pbmZvXSwgb3B0KT8udGhlbihqc29uT2JqPT57XHJcbiAgICAgICAgaWYgKGpzb25PYmouZWNvZGUgPT09IDApIHtcclxuICAgICAgICAgICAgZ19tZXMubm9ybWFsX21lc3NhZ2UoJ+ato+W4uOOBq+ODreODvOODieOBleOCjOOBvuOBl+OBnycpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGpzb25PYmouc2F2ZV9pbmZvICA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBnX21lcy53YXJuaW5nX21lc3NhZ2UoXCLkv53lrZjjg4fjg7zjgr/jgYzkuI3mraPjgarlvaLlvI/jgafjgZfjgZ9cXG5cIiArIGpzb25PYmouZW1zZyk7XHJcbiAgICAgICAgICAgICAgICBfYWxlcnQoanNvbk9iai5lbXNnKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGNvbnN0IG1vbml0b3IgPSBmYWxzZTsgIC8vIGFsZXJ044Gn5Y+X5L+h44GX44Gf44OG44Kt44K544OI44KS6KGo56S644GZ44KL44Go44GN44GrdHJ1ZeOBq+OBmeOCi1xyXG4gICAgICAgICAgICBpZiAobW9uaXRvcikge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgc2F2ZSBvZiBqc29uT2JqLnNhdmVfaW5mbykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzYXZlICAgICAgICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnRfc2F2ZV9pbmZvKHNhdmUpO1xyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0X3NhdmVfZGV0YWlsKHNhdmUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrICE9PSB1bmRlZmluZWQpIGNhbGxiYWNrKGpzb25PYmopO1xyXG4gICAgICAgICAgICByZXR1cm4ganNvbk9iajtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBnX21lcy53YXJuaW5nX21lc3NhZ2UoXCLjg63jg7zjg4njgafjgY3jgb7jgZvjgpPjgafjgZfjgZ9cXG5cIiArIGpzb25PYmouZW1zZyk7XHJcbiAgICAgICAgICAgIF9hbGVydChqc29uT2JqLmVtc2cpO1xyXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0X21hemVfaW5mbyhjYWxsYmFjaz86IFRfY2FsbGJhY2spOiBQcm9taXNlPGFueXx1bmRlZmluZWQ+IHtcclxuICAgIGNvbnN0IG9wdCA9IG5ldyBDX1VybE9wdCgpO1xyXG4gICAgb3B0LnNldCgnbW9kZScsICAgICAgICAnbWF6ZV9pbmZvJyk7IFxyXG4vLyAgICByZXR1cm4gYXdhaXQgUE9TVF9hbmRfZ2V0X0pTT04oZ191cmxbZ191cmxfZ3QyX21hemVdLCBvcHQpPy50aGVuKGpzb25PYmo9PntcclxuICAgIHJldHVybiBhd2FpdCBQT1NUX2FuZF9nZXRfSlNPTjMoZ191cmxbZ191cmxfYWxsX21hemVdLCBvcHQpPy50aGVuKGpzb25PYmo9PntcclxuICAgICAgICBpZiAoanNvbk9iai5lY29kZSA9PT0gMCkge1xyXG4gICAgICAgICAgICBnX21lcy5ub3JtYWxfbWVzc2FnZSgn5q2j5bi444Gr44Ot44O844OJ44GV44KM44G+44GX44GfJyk7XHJcbiAgICAgICAgICAgIGlmIChqc29uT2JqPy5kYXRhPy5tYXplaW5mbyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBnX21lcy53YXJuaW5nX21lc3NhZ2UoXCLov7flrq7mg4XloLHjgYzkuI3mraPjgarlvaLlvI/jgafjgZfjgZ9cXG5cIiArIGpzb25PYmouZW1zZyk7XHJcbiAgICAgICAgICAgICAgICBfYWxlcnQoanNvbk9iai5lbXNnKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAgICAgY29uc3QgbW9uaXRvciA9IGZhbHNlOyAgLy8gYWxlcnTjgaflj5fkv6HjgZfjgZ/jg4bjgq3jgrnjg4jjgpLooajnpLrjgZnjgovjgajjgY3jgat0cnVl44Gr44GZ44KLXHJcbiAgICAgICAgICAgIGlmIChtb25pdG9yKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoanNvbk9iaj8uZGF0YT8ubWF6ZWluZm8gICE9PSB1bmRlZmluZWQpIHsgXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBtYXplaW5mbyBvZiBqc29uT2JqLmRhdGEubWF6ZWluZm8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnRfbWF6ZWluZm9faW5mbyhtYXplaW5mbyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgIGlmIChjYWxsYmFjayAhPT0gdW5kZWZpbmVkKSBjYWxsYmFjayhqc29uT2JqPy5kYXRhPy5tYXplaW5mbyk7XHJcbiAgICAgICAgICAgIHJldHVybiBqc29uT2JqPy5kYXRhPy5tYXplaW5mbztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBnX21lcy53YXJuaW5nX21lc3NhZ2UoXCLjg63jg7zjg4njgafjgY3jgb7jgZvjgpPjgafjgZfjgZ9cXG5cIiArIGpzb25PYmouZW1zZyk7XHJcbiAgICAgICAgICAgIF9hbGVydChqc29uT2JqLmVtc2cpO1xyXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0X25ld19oZXJvKG51bTogbnVtYmVyID0gMjAsIGNhbGxiYWNrPzogVF9jYWxsYmFjayk6IFByb21pc2U8YW55fHVuZGVmaW5lZD4ge1xyXG4gICAgY29uc3Qgb3B0ID0gbmV3IENfVXJsT3B0KCk7XHJcbiAgICBvcHQuc2V0KCdtb2RlJywgICAgICAgICduZXdfaGVybycpOyBcclxuLy8gICAgb3B0LnNldCgnbnVtYmVyJywgICAgICAgbnVtLnRvU3RyaW5nKCkpO1xyXG4vLyAgICByZXR1cm4gYXdhaXQgUE9TVF9hbmRfZ2V0X0pTT04oZ191cmxbZ191cmxfZ3QyX2d1bGRdLCBvcHQpPy50aGVuKGpzb25PYmo9PntcclxuICAgIG9wdC5zZXQoJ25tYnInLCAgICAgICAgIG51bS50b1N0cmluZygpKTtcclxuICAgIHJldHVybiBhd2FpdCBQT1NUX2FuZF9nZXRfSlNPTjMoZ191cmxbZ191cmxfYWxsX2hyZXNdLCBvcHQpPy50aGVuKGpzb25PYmo9PntcclxuICAgICAgICBpZiAoanNvbk9iai5lY29kZSA9PT0gMCkge1xyXG4gICAgICAgICAgICBnX21lcy5ub3JtYWxfbWVzc2FnZSgn5q2j5bi444Gr44Ot44O844OJ44GV44KM44G+44GX44GfJyk7XHJcbiAgICAgICAgICAgIGlmIChqc29uT2JqPy5kYXRhPy5ocmVzICA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBnX21lcy53YXJuaW5nX21lc3NhZ2UoXCLjg5Ljg7zjg63jg7zjg7vjg4fjg7zjgr/jgYzkuI3mraPjgarlvaLlvI/jgafjgZfjgZ9cXG5cIiArIGpzb25PYmouZW1zZyk7XHJcbiAgICAgICAgICAgICAgICBfYWxlcnQoanNvbk9iai5lbXNnKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgICAgICBjb25zdCBtb25pdG9yID0gZmFsc2U7ICAvLyBhbGVydOOBp+WPl+S/oeOBl+OBn+ODhuOCreOCueODiOOCkuihqOekuuOBmeOCi+OBqOOBjeOBq3RydWXjgavjgZnjgotcclxuICAgICAgICAgICAgaWYgKG1vbml0b3IpIHtcclxuICAgICAgICAgICAgICAgIGlmIChqc29uT2JqPy5kYXRhPy5ocmVzICAhPT0gdW5kZWZpbmVkKSBhbGVydF9ocmVzX2luZm8oanNvbk9iai5kYXRhLmhyZXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgIGlmIChjYWxsYmFjayAhPT0gdW5kZWZpbmVkKSBjYWxsYmFjayhqc29uT2JqPy5kYXRhKTtcclxuICAgICAgICAgICAgcmV0dXJuIGpzb25PYmo/LmRhdGE7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZ19tZXMud2FybmluZ19tZXNzYWdlKFwi44Ot44O844OJ44Gn44GN44G+44Gb44KT44Gn44GX44GfXFxuXCIgKyBqc29uT2JqLmVtc2cpO1xyXG4gICAgICAgICAgICBfYWxlcnQoanNvbk9iai5lbXNnKTtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB0bXBfbG9hZChvcHQ/OiBDX1VybE9wdCwgY2FsbGJhY2s/OiBUX2NhbGxiYWNrKTogUHJvbWlzZTxhbnl8dW5kZWZpbmVkPiB7XHJcbiAgICBvcHQgPz89IG5ldyBDX1VybE9wdCgpO1xyXG4gICAgb3B0LnNldCgnbW9kZScsICAgICAgICd0bXBfbG9hZCcpOyBcclxuICAgIG9wdC5zZXQoJ3BpZCcsICAgZ19zdGFydF9lbnYucGlkKTsgXHJcbiAgICBvcHQuc2V0KCd1bm8nLCAgICAgICAgICAgICAgIDEwMCk7IFxyXG4gICAgcmV0dXJuIF9fYXV0b19sb2FkKG9wdCwgY2FsbGJhY2spO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaW5zdGFudF9sb2FkKG9wdD86IENfVXJsT3B0LCBjYWxsYmFjaz86IFRfY2FsbGJhY2spOiBQcm9taXNlPGFueXx1bmRlZmluZWQ+IHtcclxuICAgIG9wdCA/Pz0gbmV3IENfVXJsT3B0KCk7XHJcbiAgICBvcHQuc2V0KCdtb2RlJywgICAnaW5zdGFudF9sb2FkJyk7IFxyXG4gICAgb3B0LnNldCgncGlkJywgICBnX3N0YXJ0X2Vudi5waWQpOyBcclxuICAgIG9wdC5zZXQoJ3VubycsICAgICAgICAgICAgICAgMTAxKTsgXHJcbiAgICByZXR1cm4gX19hdXRvX2xvYWQob3B0LCBjYWxsYmFjayk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBVRF9sb2FkKG9wdD86IENfVXJsT3B0LCBjYWxsYmFjaz86IFRfY2FsbGJhY2spOiBQcm9taXNlPGFueXx1bmRlZmluZWQ+IHtcclxuICAgIG9wdCA/Pz0gbmV3IENfVXJsT3B0KCk7XHJcbiAgICBvcHQuc2V0KCdtb2RlJywgICAgICAgICdVRF9sb2FkJyk7IFxyXG4gICAgb3B0LnNldCgncGlkJywgICBnX3N0YXJ0X2Vudi5waWQpOyBcclxuICAgIG9wdC5zZXQoJ3VubycsICAgICAgICAgICAgICAgMTAyKTsgXHJcbiAgICByZXR1cm4gX19hdXRvX2xvYWQob3B0LCBjYWxsYmFjayk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBiZWZvcmVfbG9hZChvcHQ/OiBDX1VybE9wdCwgY2FsbGJhY2s/OiBUX2NhbGxiYWNrKTogUHJvbWlzZTxhbnl8dW5kZWZpbmVkPiB7XHJcbiAgICBvcHQgPz89IG5ldyBDX1VybE9wdCgpO1xyXG4gICAgb3B0LnNldCgnbW9kZScsICAgICdiZWZvcmVfbG9hZCcpOyBcclxuICAgIG9wdC5zZXQoJ3BpZCcsICAgZ19zdGFydF9lbnYucGlkKTsgXHJcbiAgICBvcHQuc2V0KCd1bm8nLCAgICAgICAgICAgICAgIDEwMyk7IFxyXG4gICAgcmV0dXJuIF9fYXV0b19sb2FkKG9wdCwgY2FsbGJhY2spO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhbF9sb2FkKHVuaXFfbm86IG51bWJlciwgb3B0PzogQ19VcmxPcHQsIGNhbGxiYWNrPzogVF9jYWxsYmFjayk6IFByb21pc2U8YW55fHVuZGVmaW5lZD4ge1xyXG4gICAgb3B0ID8/PSBuZXcgQ19VcmxPcHQoKTtcclxuICAgIG9wdC5zZXQoJ21vZGUnLCAgICdnZW5lcmFsX2xvYWQnKTsgXHJcbiAgICBvcHQuc2V0KCdwaWQnLCAgIGdfc3RhcnRfZW52LnBpZCk7IFxyXG4gICAgb3B0LnNldCgndW5vJywgICAgICAgICAgIHVuaXFfbm8pOyBcclxuICAgIHJldHVybiBfX2F1dG9fbG9hZChvcHQsIGNhbGxiYWNrKTtcclxufVxyXG5cclxuZnVuY3Rpb24gX19hdXRvX2xvYWQob3B0OiBDX1VybE9wdCwgY2FsbGJhY2s/OiBUX2NhbGxiYWNrKTogUHJvbWlzZTxhbnl8dW5kZWZpbmVkPiB7XHJcblxyXG4vLyAgICByZXR1cm4gUE9TVF9hbmRfZ2V0X0pTT04oZ191cmxbZ191cmxfZ3QyX3NhdmVdLCBvcHQpPy50aGVuKGpzb25PYmo9PntcclxuICAgIHJldHVybiBQT1NUX2FuZF9nZXRfSlNPTjMoZ191cmxbZ191cmxfZ2V0X2RhdGFdLCBvcHQpPy50aGVuKGpzb25PYmo9PntcclxuICAgICAgICBpZiAoanNvbk9iai5lY29kZSA9PT0gMCkge1xyXG4gICAgICAgICAgICBnX21lcy5ub3JtYWxfbWVzc2FnZSgn5q2j5bi444Gr44Ot44O844OJ44GV44KM44G+44GX44GfJyk7XHJcbiBcclxuICAgICAgICAgICAgaWYgKGpzb25PYmo/LnNhdmUgID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGdfbWVzLndhcm5pbmdfbWVzc2FnZShcIuWPl+S/oeOBl+OBn+S/neWtmOODh+ODvOOCv+OBjOS4jeato+OBquW9ouW8j+OBp+OBl+OBn1xcblwiICsganNvbk9iai5lbXNnKTtcclxuICAgICAgICAgICAgICAgIF9hbGVydChqc29uT2JqLmVtc2cpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgICAgIGNvbnN0IG1vbml0b3IgPSBmYWxzZTsgIC8vIGFsZXJ044Gn5Y+X5L+h44GX44Gf44OG44Kt44K544OI44KS6KGo56S644GZ44KL44Go44GN44GrdHJ1ZeOBq+OBmeOCi1xyXG4gICAgICAgICAgICBpZiAobW9uaXRvcikge1xyXG4gICAgICAgICAgICAgICAgaWYgKGpzb25PYmo/LnNhdmUgICAgICAgICAgICAgICAgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0X3NhdmVfaW5mbyhqc29uT2JqLnNhdmUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0X3NhdmVfZGV0YWlsKGpzb25PYmouc2F2ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrICE9PSB1bmRlZmluZWQpIGNhbGxiYWNrKGpzb25PYmopO1xyXG4gICAgICAgICAgICByZXR1cm4ganNvbk9iajtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBnX21lcy53YXJuaW5nX21lc3NhZ2UoYOODreODvOODieOBp+OBjeOBvuOBm+OCk+OBp+OBl+OBnyR7anNvbk9iai5lY29kZX1cXG5gICsganNvbk9iai5lbXNnKTtcclxuICAgICAgICAgICAgX2FsZXJ0KGpzb25PYmouZW1zZyk7XHJcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdG1wX3NhdmUob3B0PzogQ19VcmxPcHQsIGNhbGxiYWNrPzogVF9jYWxsYmFjayk6IFByb21pc2U8YW55fHVuZGVmaW5lZD4geyBcclxuICAgIG9wdCA/Pz0gbmV3IENfVXJsT3B0KCk7XHJcbiAgICBvcHQuc2V0KCdtb2RlJywgICAgICAgJ3RtcF9zYXZlJyk7IFxyXG4gICAgb3B0LnNldCgncGlkJywgICBnX3N0YXJ0X2Vudi5waWQpOyBcclxuICAgIG9wdC5zZXQoJ3VubycsICAgICAgICAgICAgICAgMTAwKTsgXHJcbiAgICByZXR1cm4gX19hdXRvX3NhdmUob3B0LCBjYWxsYmFjayk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpbnN0YW50X3NhdmUob3B0PzogQ19VcmxPcHQsIGNhbGxiYWNrPzogVF9jYWxsYmFjayk6IFByb21pc2U8YW55fHVuZGVmaW5lZD4geyBcclxuICAgIG9wdCA/Pz0gbmV3IENfVXJsT3B0KCk7XHJcbiAgICBvcHQuc2V0KCdtb2RlJywgICAnaW5zdGFudF9zYXZlJyk7IFxyXG4gICAgb3B0LnNldCgncGlkJywgICBnX3N0YXJ0X2Vudi5waWQpOyBcclxuICAgIG9wdC5zZXQoJ3VubycsICAgICAgICAgICAgICAgMTAxKTsgXHJcbiAgICByZXR1cm4gX19hdXRvX3NhdmUob3B0LCBjYWxsYmFjayk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBVRF9zYXZlKG9wdD86IENfVXJsT3B0LCBjYWxsYmFjaz86IFRfY2FsbGJhY2spOiBQcm9taXNlPGFueXx1bmRlZmluZWQ+IHsgXHJcbiAgICBvcHQgPz89IG5ldyBDX1VybE9wdCgpO1xyXG4gICAgb3B0LnNldCgnbW9kZScsICAgICAgICAnVURfc2F2ZScpOyBcclxuICAgIG9wdC5zZXQoJ3BpZCcsICAgZ19zdGFydF9lbnYucGlkKTsgXHJcbiAgICBvcHQuc2V0KCd1bm8nLCAgICAgICAgICAgICAgIDEwMik7IFxyXG4gICAgcmV0dXJuIF9fYXV0b19zYXZlKG9wdCwgY2FsbGJhY2spO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYmVmb3JlX3NhdmUob3B0PzogQ19VcmxPcHQsIGNhbGxiYWNrPzogVF9jYWxsYmFjayk6IFByb21pc2U8YW55fHVuZGVmaW5lZD4geyBcclxuICAgIG9wdCA/Pz0gbmV3IENfVXJsT3B0KCk7XHJcbiAgICBvcHQuc2V0KCdtb2RlJywgICAgJ2JlZm9yZV9zYXZlJyk7IFxyXG4gICAgb3B0LnNldCgncGlkJywgICBnX3N0YXJ0X2Vudi5waWQpOyBcclxuICAgIG9wdC5zZXQoJ3VubycsICAgICAgICAgICAgICAgMTAzKTsgXHJcbiAgICByZXR1cm4gX19hdXRvX3NhdmUob3B0LCBjYWxsYmFjayk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmFsX3NhdmUob3B0PzogQ19VcmxPcHQsIGNhbGxiYWNrPzogVF9jYWxsYmFjayk6IFByb21pc2U8YW55fHVuZGVmaW5lZD4ge1xyXG4gICAgZ19zYXZlLmF1dG9fbW9kZSA9IGZhbHNlO1xyXG5cclxuICAgIG9wdCA/Pz0gbmV3IENfVXJsT3B0KCk7XHJcbiAgICBvcHQuc2V0KCdtb2RlJywgICAnZ2VuZXJhbF9zYXZlJyk7IFxyXG4gICAgb3B0LnNldCgncGlkJywgICBnX3N0YXJ0X2Vudi5waWQpOyBcclxuICAgIHJldHVybiBfX3NhdmUob3B0LCBjYWxsYmFjayk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIF9fYXV0b19zYXZlKG9wdDogQ19VcmxPcHQsIGNhbGxiYWNrPzogVF9jYWxsYmFjayk6IFByb21pc2U8YW55fHVuZGVmaW5lZD4ge1xyXG4gICAgZ19zYXZlLmF1dG9fbW9kZSA9IHRydWU7XHJcbiAgICByZXR1cm4gX19zYXZlKG9wdCwgY2FsbGJhY2spO1xyXG59IFxyXG5mdW5jdGlvbiBfX3NhdmUob3B0OiBDX1VybE9wdCwgY2FsbGJhY2s/OiBUX2NhbGxiYWNrKTogUHJvbWlzZTxhbnl8dW5kZWZpbmVkPiB7IFxyXG4gICAgaWYgKCFvcHQuaXNzZXQoJ3NhdmUnKSkge1xyXG4gICAgICAgIG9wdC5zZXQoJ3NhdmUnLCBKU09OLnN0cmluZ2lmeShnX3NhdmUuZW5jb2RlKCksIG51bGwsIFwiXFx0XCIpKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyDpgIHkv6Hjg4fjg7zjgr/jgpJjaGVja19KU09OLnBocOOBq+mAgeOBo+OBpuODgeOCp+ODg+OCr+OBmeOCi+OBqOOBjeOBq3RydWXjgavjgZnjgovjgIJcclxuICAgIGNvbnN0IG1vdmVfcGFnZSA9IGZhbHNlO1xyXG5cclxuICAgIGlmIChtb3ZlX3BhZ2UpIHtcclxuICAgICAgICBQT1NUX2FuZF9tb3ZlX3BhZ2UoZ191cmxbZ191cmxfY2hlY2tfSlNPTl0sIG9wdCk7XHJcbiAgICB9XHJcblxyXG4vLyAgICByZXR1cm4gUE9TVF9hbmRfZ2V0X0pTT04oZ191cmxbZ191cmxfZ3QyX3NhdmVdLCBvcHQpPy50aGVuKGpzb25PYmo9PntcclxuICAgIHJldHVybiBQT1NUX2FuZF9nZXRfSlNPTjMoZ191cmxbZ191cmxfcHV0X2RhdGFdLCBvcHQpPy50aGVuKGpzb25PYmo9PntcclxuICAgICAgICBpZiAoanNvbk9iaj8uZWNvZGUgPT09IDApIHtcclxuIFxyXG4gICAgICAgICAgICBpZiAoanNvbk9iaj8uc2F2ZSAgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgZ19tZXMud2FybmluZ19tZXNzYWdlKFwi5Y+X5L+h44GX44Gf5L+d5a2Y44OH44O844K/44GM5LiN5q2j44Gq5b2i5byP44Gn44GX44GfXFxuXCIgKyBqc29uT2JqLmVtc2cpO1xyXG4gICAgICAgICAgICAgICAgX2FsZXJ0KGpzb25PYmouZW1zZyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAgICAgY29uc3QgbW9uaXRvciA9IGZhbHNlOyAgLy8gYWxlcnTjgaflj5fkv6HjgZfjgZ/jg4bjgq3jgrnjg4jjgpLooajnpLrjgZnjgovjgajjgY3jgat0cnVl44Gr44GZ44KLXHJcbiAgICAgICAgICAgIGlmIChtb25pdG9yKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoanNvbk9iaj8uc2F2ZSAgICAgICAgICAgICAgICAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnRfc2F2ZV9pbmZvKGpzb25PYmouc2F2ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnRfc2F2ZV9kZXRhaWwoanNvbk9iai5zYXZlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2sgIT09IHVuZGVmaW5lZCkgY2FsbGJhY2soanNvbk9iaik7XHJcbiAgICAgICAgICAgIGdfbWVzLm5vcm1hbF9tZXNzYWdlKCfmraPluLjjgavjgrvjg7zjg5bjgZXjgozjgb7jgZfjgZ8nKTtcclxuICAgICAgICAgICAgcmV0dXJuIGpzb25PYmo7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZ19tZXMud2FybmluZ19tZXNzYWdlKFwi44K744O844OW44Gn44GN44G+44Gb44KT44Gn44GX44GfXFxuXCIgKyBqc29uT2JqLmVtc2cpO1xyXG4gICAgICAgICAgICBfYWxlcnQoanNvbk9iai5lbXNnKTtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9KS4gY2F0Y2goZXJyPT57XHJcbiAgICAgICAgZ19tZXMud2FybmluZ19tZXNzYWdlKCdQT1NU6Kqt44G/6L6844G/44Gr5aSx5pWX44GX44G+44GX44GfKFBPU1RfQU5EX0pTT04zKScpO1xyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9KTtcclxuXHJcbi8vICAgIFBPU1RfYW5kX21vdmVfcGFnZShnX3VybFtnX3VybF9jaGVja19KU09OXSwgb3B0KTsgcmV0dXJuIHtlY29kZTogMH07XHJcbn1cclxuXHJcbiIsImV4cG9ydCBjb25zdCBnX3VybF9nZXRfbWF6ZSAgICA9ICAwO1xyXG5leHBvcnQgY29uc3QgZ191cmxfbmV3X21hemUgICAgPSAgMTtcclxuXHJcbmV4cG9ydCBjb25zdCBnX3VybF9hbGxfbWF6ZSAgICA9ICAyO1xyXG5leHBvcnQgY29uc3QgZ191cmxfbmV3X2d1bGQgICAgPSAgNTtcclxuZXhwb3J0IGNvbnN0IGdfdXJsX2FsbF9ocmVzICAgID0gIDY7XHJcbmV4cG9ydCBjb25zdCBnX3VybF9nZXRfc2F2ZSAgICA9ICA3O1xyXG5leHBvcnQgY29uc3QgZ191cmxfcHV0X3NhdmUgICAgPSAgODtcclxuZXhwb3J0IGNvbnN0IGdfdXJsX2FsbF9zYXZlICAgID0gIDk7XHJcbmV4cG9ydCBjb25zdCBnX3VybF9tYWlfbWF6ZSAgICA9IDEwO1xyXG5leHBvcnQgY29uc3QgZ191cmxfbWFpX2d1bGQgICAgPSAxMTtcclxuZXhwb3J0IGNvbnN0IGdfdXJsX2dldF9pbmZvICAgID0gMTI7XHJcbmV4cG9ydCBjb25zdCBnX3VybF9nZXRfZGF0YSAgICA9IDEzO1xyXG5leHBvcnQgY29uc3QgZ191cmxfcHV0X2RhdGEgICAgPSAxNTtcclxuXHJcbmV4cG9ydCBjb25zdCBnX3VybF9jaGVja19KU09OICA9IDE2O1xyXG5cclxuZXhwb3J0IGNvbnN0IGdfdXJsX3JjZF9saXN0ICAgID0gMTc7XHJcbmV4cG9ydCBjb25zdCBnX3VybF9yY2RfbG9hZCAgICA9IDE4O1xyXG5leHBvcnQgY29uc3QgZ191cmxfcmNkX3NhdmUgICAgPSAxOTtcclxuXHJcbmV4cG9ydCBjb25zdCBnX3VybF9ndDJfZ3VsZCAgICA9IDIwO1xyXG5leHBvcnQgY29uc3QgZ191cmxfZ3QyX21hemUgICAgPSAyMTtcclxuZXhwb3J0IGNvbnN0IGdfdXJsX2d0Ml9zYXZlICAgID0gMjI7XHJcbmV4cG9ydCBjb25zdCBnX3VybDogc3RyaW5nW10gPSBuZXcgQXJyYXkoMjMpO1xyXG5cclxuZXhwb3J0IGxldCAgIGdfbXlfdXJsOiBzdHJpbmc7XHJcblxyXG5pbXBvcnQgeyBDX09uT2ZmQnV0dG9uIH0gZnJvbSAnLi4vZF9jdGwvQ19Pbk9mZkJ1dHRvbidcclxuZXhwb3J0IHZhciBnX2RlYnVnOiBDX09uT2ZmQnV0dG9uO1xyXG5cclxuaW1wb3J0IHsgQ19BbGVydExvZyB9ICAgIGZyb20gXCIuLi9kX2Ntbi9DX0FsZXJ0TG9nXCI7XHJcbmV4cG9ydCBsZXQgZ19hbGVydDogQ19BbGVydExvZztcclxuXHJcbi8vZXhwb3J0IHZhciBnX3BpZDogbnVtYmVyW10gPSBuZXcgQXJyYXkoMSkgYXMgbnVtYmVyW107XHJcblxyXG5jbGFzcyBDX1JlYWR5R2FtZXMgIHtcclxuICAgIHByb3RlY3RlZCBmbGdzOiB7W2lkOiBzdHJpbmddOiBib29sZWFufTsgXHJcbiAgICBwcm90ZWN0ZWQgZnVuYzogKCk9PnZvaWQ7XHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5mbGdzID0ge307XHJcbiAgICAgICAgdGhpcy5mbGdzLmxvYWRlZERPTSA9IGZhbHNlOyBcclxuICAgICAgICB0aGlzLmZsZ3MuZ2V0V2luZG93ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5mdW5jID0gKCk9Pnt9O1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldExvYWRlZERPTSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmZsZ3MubG9hZGVkRE9NID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmNoZWNrX2FuZF9kbygpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldEdldFdpbmRvdygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmZsZ3MuZ2V0V2luZG93ID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmNoZWNrX2FuZF9kbygpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldEZ1bmN0aW9uKGZ1bmM6ICgpPT52b2lkKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5mdW5jID0gZnVuYztcclxuICAgICAgICB0aGlzLmNoZWNrX2FuZF9kbygpO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIGNoZWNrX2FuZF9kbygpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5mdW5jID09PSB1bmRlZmluZWQpIHJldHVybjtcclxuICAgICAgICBmb3IgKGxldCBpaSBpbiB0aGlzLmZsZ3MpIGlmICghdGhpcy5mbGdzW2lpXSkgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuZnVuYygpOyBcclxuICAgIH1cclxufVxyXG5leHBvcnQgY29uc3QgZ19yZWFkeV9nYW1lcyA9IG5ldyBDX1JlYWR5R2FtZXMoKTtcclxuXHJcbmV4cG9ydCBjb25zdCBnX3N0YXJ0X2VudiA9IHttb2RlOiAnJywgcGlkOiAtMSwgb3B0OiAnJ307XHJcblxyXG5pbXBvcnQgeyBDX0Rpc3BsYXlNZXNzYWdlIH0gZnJvbSBcIi4uL2RfdmllL0NfRGlzcGxheU1lc3NhZ2VcIjtcclxuZXhwb3J0IHZhciBnX21lczogQ19EaXNwbGF5TWVzc2FnZTtcclxuXHJcbmltcG9ydCB7IENfU2F2ZURhdGEgfSAgICAgICAgIGZyb20gXCIuLi9kX21kbC9DX1NhdmVEYXRhXCI7XHJcbmV4cG9ydCBjb25zdCBnX3NhdmUgPSBuZXcgQ19TYXZlRGF0YSgpO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGluaXRfYWZ0ZXJfbG9hZGVkX0RPTV9pbl9jb21tb24oZGVidWdfaWQ6IHN0cmluZyA9ICdkZWJ1Z19tb2RlJywgbXNnX2lkOiBzdHJpbmcgPSAncGFuZV9zeXRtX2xvZ3MnKTogdm9pZCB7XHJcbiAgICBjb25zdCAgY29uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobXNnX2lkKTtcclxuICAgIGdfbWVzICA9IENfRGlzcGxheU1lc3NhZ2UuZ2V0T2JqKGNvbiwgJ2NsaWVudF9tZXNzYWdlJyk7XHJcbiAgICBnX2FsZXJ0ID0gQ19BbGVydExvZy5nZXRPYmooKTtcclxuXHJcbiAgICBjb25zdCBidG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChkZWJ1Z19pZCkgYXMgSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcbiAgICBnX2RlYnVnID0gQ19Pbk9mZkJ1dHRvbi5nZXRPYmooYnRuLCB7fSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfYWxlcnQodHh0OiBzdHJpbmcsIHBhZ2Vfc2l6ZSA9IDI1MCk6IHZvaWQge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0eHQubGVuZ3RoOyBpICs9IHBhZ2Vfc2l6ZSkge1xyXG4gICAgICAgIGlmICghd2luZG93LmNvbmZpcm0odHh0LnN1YnN0cmluZyhpLCBpK3BhZ2Vfc2l6ZSkpKSBicmVhaztcclxuICAgIH1cclxufVxyXG5cclxuXHJcblxyXG4vLyDku6XkuIvjgIFIVE1M5YG044GL44KJ5ZG844Gz5Ye644Gb44KL6Zai5pWw44Gu5a6a576pXHJcbi8vIHdpbmRvd+OCquODluOCuOOCp+OCr+ODiOOBq+a4oeOBmeOCpOODs+OCv+ODvOODleOCp+ODvOOCueOCkuWumue+qVxyXG5pbnRlcmZhY2UgSV9Uc0NhbGwge1xyXG4gICAgZ2V0X2luaXRfZGF0YTogKHVybF9iYXNlOiBzdHJpbmcpPT52b2lkLFxyXG4gICAgc3RhcnRfZ2FtZTogICAgKG1vZGU6IHN0cmluZywgdXJsX2Jhc2U6IHN0cmluZywgcGxheWVyX2lkOiBudW1iZXIsIG9wdGlvbjogc3RyaW5nKT0+dm9pZCwgXHJcbn1cclxuLy8gd2luZG9344Kq44OW44K444Kn44Kv44OI44Gr44Kk44Oz44K/44O844OV44Kn44O844K544Gu5a6a576p44KS6L+95YqgXHJcbmRlY2xhcmUgZ2xvYmFsIHtcclxuICAgIGludGVyZmFjZSBXaW5kb3cge1xyXG4gICAgICAgIHRzQ2FsbDogSV9Uc0NhbGw7XHJcbiAgICB9XHJcbn1cclxuLy8g44Kk44Oz44K/44O844OV44Kn44O844K544Gu5a6f6KOFXHJcbi8v77yI44Gp44GG44KE44KJ44Kk44Oz44K/44O844OV44Kn44O844K544Gv44OX44Ot44OR44OG44Kj5a6a576p44Gu44Kq44OW44K444Kn44Kv44OI44Gr44Gq44Gj44Gm44KL44KJ44GX44GE77yJXHJcbmNvbnN0IHRzQ2FsbGVyOiBJX1RzQ2FsbCA9ICgoKSA9PiB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGdldF9pbml0X2RhdGE6IChteV91cmw6IHN0cmluZyk6IHZvaWQgPT4ge1xyXG4gICAgICAgICAgICBnX215X3VybCA9IG15X3VybDtcclxuICAgICAgICAgICAgY29uc3QgdXJsX3RvcCA9IHBhcmVudF91cmwobXlfdXJsKTtcclxuICAgICAgICAgICAgY29uc3QgZXhwX3RvcCA9IHBhcmVudF91cmwodXJsX3RvcCkgKyBcIi9tYWlleFwiO1xyXG5cclxuICAgICAgICAgICAgZ191cmxbZ191cmxfZ3QyX3NhdmVdICAgPSB1cmxfdG9wICsgXCIvX0pTT05fbWFpX3NhdmUucGhwXCI7XHJcbiAgICAgICAgICAgIGdfdXJsW2dfdXJsX2d0Ml9tYXplXSAgID0gdXJsX3RvcCArIFwiL19KU09OX21haV9tYXplLnBocFwiO1xyXG4gICAgICAgICAgICBnX3VybFtnX3VybF9ndDJfZ3VsZF0gICA9IHVybF90b3AgKyBcIi9fSlNPTl9tYWlfZ3VsZC5waHBcIjtcclxuXHJcbiAgICAgICAgICAgIGdfdXJsW2dfdXJsX21haV9tYXplXSAgID0gdXJsX3RvcCArIFwiL21haV9tYXplLnBocFwiO1xyXG4gICAgICAgICAgICBnX3VybFtnX3VybF9tYWlfZ3VsZF0gICA9IHVybF90b3AgKyBcIi9tYWlfZ3VsZC5waHBcIjtcclxuXHJcbiAgICAgICAgICAgIGdfdXJsW2dfdXJsX25ld19tYXplXSAgID0gZXhwX3RvcCArIFwiL21hemUvbmV3TWF6ZVwiO1xyXG4gICAgICAgICAgICBnX3VybFtnX3VybF9nZXRfbWF6ZV0gICA9IGV4cF90b3AgKyBcIi9tYXplL2dldE1hemVcIjtcclxuICAgICAgICAgICAgZ191cmxbZ191cmxfYWxsX21hemVdICAgPSBleHBfdG9wICsgXCIvbWF6ZS9hbGxNYXplXCI7XHJcbiAgICAgICAgICAgIGdfdXJsW2dfdXJsX25ld19ndWxkXSAgID0gZXhwX3RvcCArIFwiL2d1bGQvbmV3R3VsZFwiO1xyXG4gICAgICAgICAgICBnX3VybFtnX3VybF9hbGxfaHJlc10gICA9IGV4cF90b3AgKyBcIi9ndWxkL2FsbEhyZXNcIjtcclxuXHJcbiAgICAgICAgICAgIGdfdXJsW2dfdXJsX2dldF9pbmZvXSAgID0gZXhwX3RvcCArIFwiL2xkc3YvX2luZm9cIjtcclxuICAgICAgICAgICAgZ191cmxbZ191cmxfZ2V0X2RhdGFdICAgPSBleHBfdG9wICsgXCIvbGRzdi9fbG9hZFwiO1xyXG4gICAgICAgICAgICBnX3VybFtnX3VybF9wdXRfZGF0YV0gICA9IGV4cF90b3AgKyBcIi9sZHN2L19zYXZlXCI7XHJcblxyXG4gICAgICAgICAgICBnX3VybFtnX3VybF9jaGVja19KU09OXSA9IHVybF90b3AgKyBcIi9jaGVja19KU09OLnBocFwiO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy8g5pqr5a6a54mI6ZaL5aeL5Yem55CGXHJcbiAgICAgICAgc3RhcnRfZ2FtZTogKG1vZGU6IHN0cmluZywgbXlfdXJsOiBzdHJpbmcsIHBsYXllcl9pZDogbnVtYmVyLCBvcHQ6IHN0cmluZyk6IHZvaWQgPT4ge1xyXG4gICAgICAgICAgICB0c0NhbGxlci5nZXRfaW5pdF9kYXRhKG15X3VybCk7IFxyXG4gICAgICAgICAgICBnX3N0YXJ0X2Vudi5tb2RlID0gbW9kZTsgXHJcbiAgICAgICAgICAgIGdfc3RhcnRfZW52LnBpZCAgPSBwbGF5ZXJfaWQ7IFxyXG4gICAgICAgICAgICBnX3N0YXJ0X2Vudi5vcHQgID0gb3B0OyBcclxuXHJcbiAgICAgICAgICAgIGdfcmVhZHlfZ2FtZXMuc2V0R2V0V2luZG93KCk7IFxyXG4gICAgICAgIH0gXHJcbiAgICB9O1xyXG59KSgpO1xyXG5cclxuZnVuY3Rpb24gcGFyZW50X3VybCh1cmw6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICBsZXQgcmUgPSAvXFwvW15cXC9dKz8kLztcclxuICAgIHJldHVybiB1cmwucmVwbGFjZShyZSwgJycpO1xyXG59XHJcblxyXG4vLyB3aW5kb3fjgqrjg5bjgrjjgqfjgq/jg4jjgavov73liqDjgZfjgZ/jgqTjg7Pjgr/jg7zjg5Xjgqfjg7zjgrnjgavkuIroqJjjga7lrp/oo4XjgpLku6PlhaVcclxud2luZG93LnRzQ2FsbCA9IHRzQ2FsbGVyO1xyXG5cclxuLy8g44GT44KM44GnSFRNTOWBtOOBrnNjcmlwdOOCv+OCsOWGheOBi+OCiSA8c2NyaXB0PndpbmRvd3MudHNDYWxsLmdldHBsYXllcigxKTs8L3NjcmlwdD5cclxuLy8g44G/44Gf44GE44Gr5ZG844Gz5Ye644Gb44KL44CC44Gf44Gg44GX44CBYnVuZGxlLmpz44Guc2NyaXB044K/44Kw44GndHlwZeWxnuaAp+OCkm1vZHVsZeOBq+OBl+OBpuOBhOOCi+OBqOWkseaVl+OBmeOCi+OAglxyXG5cclxuXHJcbiIsImltcG9ydCB7IF9jZWlsLCBfZmxvb3IsIF9pc051bSB9IGZyb20gXCIuLi9kX3V0bC9GX01hdGhcIjtcclxuaW1wb3J0IHsgX2FsZXJ0IH0gICAgICAgICAgICAgICAgZnJvbSBcIi4uL2RfY21uL2dsb2JhbFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIENfQ3RsQ3Vyc29yIHtcclxuICAgIHByb3RlY3RlZCBzdGF0aWMgbWU6IHtbaWQ6IHN0cmluZ106IENfQ3RsQ3Vyc29yfTtcclxuXHJcbiAgICBwcm90ZWN0ZWQgX2lkOiAgIHN0cmluZztcclxuICAgIHByb3RlY3RlZCBfbGlzdDogSFRNTEVsZW1lbnR8dW5kZWZpbmVkO1xyXG4gICAgcHJvdGVjdGVkIF9sZW5nOiBudW1iZXI7XHJcbiAgICBwcm90ZWN0ZWQgX2NvbHM6IG51bWJlcjtcclxuICAgIHByb3RlY3RlZCBfaW5keDogbnVtYmVyO1xyXG5cclxuICAgIHByb3RlY3RlZCBjb25zdHJ1Y3RvcihsaXN0PzogSFRNTEVsZW1lbnQpIHtcclxuICAgICAgICBDX0N0bEN1cnNvci5tZSA/Pz0ge31cclxuXHJcbiAgICAgICAgdGhpcy5faWQgICA9ICdfX2RteV9fJztcclxuICAgICAgICB0aGlzLl9saXN0ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIHRoaXMuX2xlbmcgPSAwO1xyXG4gICAgICAgIHRoaXMuX2NvbHMgPSAxO1xyXG4gICAgICAgIHRoaXMuX2luZHggPSAwO1xyXG4gICAgICAgIENfQ3RsQ3Vyc29yLm1lW3RoaXMuX2lkXSA9IHRoaXM7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc3RhdGljIGdldE9iaihsaXN0PzogSFRNTEVsZW1lbnQpOiBDX0N0bEN1cnNvciAge1xyXG4gICAgICAgIHRoaXMubWUgPz89IHt9XHJcblxyXG4gICAgICAgIGNvbnN0IGlkID0gbGlzdCAhPT0gdW5kZWZpbmVkID8gbGlzdC5pZCA6ICdfX2RteV9fJztcclxuICAgICAgICB0aGlzLm1lW2lkXSA/Pz0gbmV3IENfQ3RsQ3Vyc29yKGxpc3QpO1xyXG5cclxuICAgICAgICBpZiAobGlzdCAhPT0gdW5kZWZpbmVkKSB0aGlzLm1lW2lkXS5zZXQobGlzdCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubWVbaWRdO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldChsaXN0OiBIVE1MRWxlbWVudCk6IENfQ3RsQ3Vyc29yIHtcclxuICAgICAgICB0aGlzLl9pZCAgID0gbGlzdC5pZDtcclxuICAgICAgICB0aGlzLl9saXN0ID0gbGlzdDtcclxuICAgICAgICB0aGlzLl9sZW5nID0gdGhpcy5fX2dldF9sZW5nKCk7XHJcbiAgICAgICAgdGhpcy5fY29scyA9IHRoaXMuX19nZXRfY29scygpO1xyXG4gICAgICAgIHRoaXMuX2luZHggPSAwO1xyXG5cclxuICAgICAgICB0aGlzLmhpZ2hfbGlnaHRfb24oKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdWlkKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lkO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGxlbmcoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbGVuZztcclxuICAgIH1cclxuICAgIHB1YmxpYyByb3dzKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX19nZXRfcm93cygpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGNvbHMoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29scztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcG9zKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luZHg7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0X3BvcyhpbmR4OiBudW1iZXIpOiBDX0N0bEN1cnNvciB7XHJcbiAgICAgICAgaWYgKGluZHggPCAgMCkgaW5keCA9IDA7XHJcbiAgICAgICAgaWYgKGluZHggPj0gdGhpcy5fbGVuZykgaW5keCA9IHRoaXMuX2xlbmcgLSAxO1xyXG5cclxuICAgICAgICB0aGlzLl9pbmR4ID0gaW5keDsgdGhpcy5oaWdoX2xpZ2h0X29uKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHBvc19VKCk6IG51bWJlciB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2xpc3QgPT09IHVuZGVmaW5lZCkgcmV0dXJuIDA7XHJcblxyXG4gICAgICAgIGxldCAgIGluZHggPSB0aGlzLl9pbmR4O1xyXG4gICAgICAgIGNvbnN0IHJvd3MgPSB0aGlzLl9fZ2V0X3Jvd3MoKTtcclxuICAgICAgICBjb25zdCBjdXJfcm93ICAgPSBpbmR4ICUgcm93cztcclxuICAgICAgICBpZiAoY3VyX3JvdyAhPT0gMCkge1xyXG4gICAgICAgICAgICAvLyDmnIDkuIrmrrUo5LiK56uvKeS7peWkllxyXG4gICAgICAgICAgICAtLWluZHg7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8g5pyA5LiK5q61KOS4iuerrylcclxuICAgICAgICAgICAgaW5keCArPSByb3dzIC0gMTtcclxuICAgICAgICAgICAgd2hpbGUgKGluZHggPiB0aGlzLl9sZW5nIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgLS1pbmR4O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBcclxuICAgICAgICB0aGlzLl9pbmR4ID0gaW5keDsgdGhpcy5oaWdoX2xpZ2h0X29uKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luZHg7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgcG9zX0QoKTogbnVtYmVyIHtcclxuICAgICAgICBpZiAodGhpcy5fbGlzdCA9PT0gdW5kZWZpbmVkKSByZXR1cm4gMDtcclxuXHJcbiAgICAgICAgbGV0ICAgaW5keCA9IHRoaXMuX2luZHg7XHJcbiAgICAgICAgY29uc3Qgcm93cyA9IHRoaXMuX19nZXRfcm93cygpO1xyXG4gICAgICAgIGNvbnN0IGN1cl9yb3cgPSBpbmR4ICUgcm93cztcclxuICAgICAgICBpZiAoY3VyX3JvdyAhPT0gcm93cyAtIDEgJiYgaW5keCAhPT0gdGhpcy5fbGVuZyAtIDEpIHtcclxuICAgICAgICAgICAgLy8g5pyA5LiL5q61KOS4i+errynku6XlpJZcclxuICAgICAgICAgICAgKytpbmR4O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIOacgOS4i+autSjkuIvnq68pXHJcbiAgICAgICAgICAgIGluZHggLT0gcm93cyAtIDE7XHJcbiAgICAgICAgICAgIHdoaWxlIChpbmR4ICUgcm93cyAhPT0gMCAmJiBpbmR4IDwgdGhpcy5fbGVuZyAtIDEpIHtcclxuICAgICAgICAgICAgICAgICsraW5keDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gXHJcbiAgICAgICAgdGhpcy5faW5keCA9IGluZHg7IHRoaXMuaGlnaF9saWdodF9vbigpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbmR4O1xyXG4gICAgfVxyXG4gICAgcHVibGljIHBvc19MKCk6IG51bWJlciB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2xpc3QgPT09IHVuZGVmaW5lZCkgcmV0dXJuIDA7XHJcblxyXG4gICAgICAgIGxldCAgIGluZHggPSB0aGlzLl9pbmR4O1xyXG4gICAgICAgIGNvbnN0IHJvd3MgPSB0aGlzLl9fZ2V0X3Jvd3MoKTtcclxuICAgICAgICBpZiAoaW5keCAgPiByb3dzIC0gMSkge1xyXG4gICAgICAgICAgICAvLyDmnIDliY3liJco5bem56uvKeS7peWkllxyXG4gICAgICAgICAgICBpbmR4IC09IHJvd3M7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8g5pyA5YmN5YiXKOW3puerrylcclxuICAgICAgICAgICAgY29uc3QgICB2dXJ0dWFsX2xpc3RfbGVuZyA9IHRoaXMuX2NvbHMgKiByb3dzO1xyXG4gICAgICAgICAgICBpbmR4ICs9IHZ1cnR1YWxfbGlzdF9sZW5nIC0gcm93cztcclxuICAgICAgICAgICAgd2hpbGUgKGluZHggPiB0aGlzLl9sZW5nIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgaW5keCAtPSByb3dzO1xyXG4gICAgICAgICAgICAgICAgaWYgKGluZHggPCAwKSB7aW5keCA9IDA7IGJyZWFrO31cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gXHJcbiAgICAgICAgdGhpcy5faW5keCA9IGluZHg7IHRoaXMuaGlnaF9saWdodF9vbigpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbmR4O1xyXG4gICAgfVxyXG4gICAgcHVibGljIHBvc19SKCk6IG51bWJlciB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2xpc3QgPT09IHVuZGVmaW5lZCkgcmV0dXJuIDA7XHJcblxyXG4gICAgICAgIGxldCAgIGluZHggPSB0aGlzLl9pbmR4O1xyXG4gICAgICAgIGNvbnN0IHJvd3MgPSB0aGlzLl9fZ2V0X3Jvd3MoKTtcclxuICAgICAgICBpZiAoaW5keCAgPCB0aGlzLl9sZW5nIC0gcm93cykgeyBcclxuICAgICAgICAgICAgLy8g5pyA57WC5YiXKOWPs+errynku6XlpJZcclxuICAgICAgICAgICAgaW5keCArPSByb3dzO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIOacgOe1guWIlyjlj7Pnq68pXHJcbiAgICAgICAgICAgIGNvbnN0ICAgb2xkX2luZHggPSBpbmR4O1xyXG4gICAgICAgICAgICBjb25zdCAgIHZ1cnR1YWxfbGlzdF9sZW5nID0gdGhpcy5fY29scyAqIHJvd3M7XHJcbiAgICAgICAgICAgIGluZHggLT0gdnVydHVhbF9saXN0X2xlbmcgLSByb3dzO1xyXG4gICAgICAgICAgICBpZiAoaW5keCA8IDApIHtcclxuICAgICAgICAgICAgICAgIGluZHggKz0gcm93cztcclxuICAgICAgICAgICAgICAgIGlmIChpbmR4IDwgMCB8fCBpbmR4ID4gdGhpcy5fbGVuZyAtIDEpIGluZHggPSBfZmxvb3IoKG9sZF9pbmR4ICsgMSkgLyB0aGlzLl9jb2xzLCAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gXHJcbiAgICAgICAgdGhpcy5faW5keCA9IGluZHg7IHRoaXMuaGlnaF9saWdodF9vbigpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbmR4O1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwcm90ZWN0ZWQgX19nZXRfcm93cygpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiBfY2VpbCh0aGlzLl9sZW5nIC8gdGhpcy5fY29scywgMCk7XHJcbiAgICB9XHJcbiAgICAvLyBET03jg6rjgrnjg4jkuIDopqfjga7ooYzmlbDjga7lj5blvpdcclxuICAgIHByb3RlY3RlZCBfX2dldF9sZW5nKCk6IG51bWJlciB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2xpc3QgPT09IHVuZGVmaW5lZCkgcmV0dXJuIDA7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3QuY2hpbGRyZW4ubGVuZ3RoOyBcclxuICAgICAgICB9IGNhdGNoKGVycikge1xyXG4gICAgICAgICAgICByZXR1cm4gMTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyBET03jg6rjgrnjg4jkuIDopqfjga7liJfmlbAoQ1NT44GL44KJ5Y+W5b6XKeOBruWPluW+l1xyXG4gICAgcHJvdGVjdGVkICBfX2dldF9jb2xzKCk6IG51bWJlciB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2xpc3QgPT09IHVuZGVmaW5lZCkgcmV0dXJuIDA7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgbGV0IGNvbHMgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLl9saXN0KS5jb2x1bW5Db3VudDtcclxuICAgICAgICAgICAgcmV0dXJuIF9pc051bShjb2xzKSA/IE51bWJlcihjb2xzKSA6IDE7IFxyXG4gICAgICAgIH0gY2F0Y2goZXJyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAxO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyDjg6Hjg4vjg6Xjg7zjga7jg4fjg5Xjgqnjg6vjg4jmk43kvZwo44OP44Kk44Op44Kk44OI44Go6Kmz57Sw6KGo56S65Yi25b6hKVxyXG4gICAgcHVibGljIGhpZ2hfbGlnaHRfb24oKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2xpc3QgPT09IHVuZGVmaW5lZCkgcmV0dXJuO1xyXG5cclxuICAgICAgICBjb25zdCBjaGlsZHJlbiA9IHRoaXMuX2xpc3QuY2hpbGRyZW47XHJcbiAgICAgICAgY29uc3QgbGVuICAgICAgPSBjaGlsZHJlbi5sZW5ndGg7XHJcbiAgICAgICAgaWYgKHRoaXMuX2luZHggPCAwIHx8IHRoaXMuX2luZHggPiBsZW4gLSAxKSByZXR1cm47XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3QgbGkgPSBjaGlsZHJlbi5pdGVtKGkpIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgICAgICAgICB0aGlzLl9faGlnaF9saWdodF9vbihsaSwgZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBsaSA9IGNoaWxkcmVuLml0ZW0odGhpcy5faW5keCkgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICAgICAgdGhpcy5fX2hpZ2hfbGlnaHRfb24obGksIHRydWUpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGhpZ2hfbGlnaHRfb2ZmKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLl9saXN0ID09PSB1bmRlZmluZWQpIHJldHVybjtcclxuXHJcbiAgICAgICAgY29uc3QgY2hpbGRyZW4gPSB0aGlzLl9saXN0LmNoaWxkcmVuO1xyXG4gICAgICAgIGNvbnN0IGxlbiAgICAgID0gY2hpbGRyZW4ubGVuZ3RoO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3QgbGkgPSBjaGlsZHJlbi5pdGVtKGkpIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgICAgICAgICB0aGlzLl9faGlnaF9saWdodF9vbihsaSwgZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBfX2hpZ2hfbGlnaHRfb24oZWxtOiBIVE1MRWxlbWVudCB8IG51bGwsIGlzT246IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICBpZiAoZWxtID09PSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgY29uc3QgcGVyZW50U3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbG0ucGFyZW50RWxlbWVudCA/PyBlbG0pO1xyXG5cclxuICAgICAgICBjb25zdCBmd19jb2xvciA9IHBlcmVudFN0eWxlLmNvbG9yO1xyXG4gICAgICAgIGNvbnN0IGJnX2NvbG9yID0gcGVyZW50U3R5bGUuYmFja2dyb3VuZENvbG9yO1xyXG5cclxuICAgICAgICBlbG0uc3R5bGUuY29sb3IgICAgICAgICAgID0gaXNPbiA/IGJnX2NvbG9yIDogZndfY29sb3I7XHJcbiAgICAgICAgZWxtLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGlzT24gPyBmd19jb2xvciA6IGJnX2NvbG9yO1xyXG5cclxuICAgICAgICBlbG0uc3R5bGUuZm9udFdlaWdodCA9ICBpc09uID8gJ2JvbGQnIDogJ25vcm1hbCc7XHJcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBlbG0uY2hpbGRyZW4ubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgY29uc3QgcCA9IGVsbS5jaGlsZHJlbi5pdGVtKGopIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgICAgICAgICBpZiAoaXNPbikge1xyXG4gICAgICAgICAgICAgICAgcC5zdHlsZS5mb250V2VpZ2h0ICAgICAgPSAnbm9ybWFsJztcclxuICAgICAgICAgICAgICAgIHAuc3R5bGUuY29sb3IgICAgICAgICAgID0gZndfY29sb3I7XHJcbiAgICAgICAgICAgICAgICBwLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGJnX2NvbG9yO1xyXG4gICAgICAgICAgICAgICAgcC5zdHlsZS5kaXNwbGF5ICAgICAgICAgPSAnYmxvY2snO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcC5zdHlsZS5kaXNwbGF5ICAgICAgICAgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgYWxlcnQoKTogdm9pZCB7XHJcbiAgICAgICAgX2FsZXJ0KFxyXG4gICAgICAgICAgICAgIFwiQ3RsQ3Vyc29yOiBcIlxyXG4gICAgICAgICAgICArIFwiXFxuaWQgICA9IFwiICsgdGhpcy5faWRcclxuICAgICAgICAgICAgKyBcIlxcbmluZHggPSBcIiArIHRoaXMuX2luZHhcclxuICAgICAgICAgICAgKyBcIlxcbmxlbmcgPSBcIiArIHRoaXMuX2xlbmdcclxuICAgICAgICAgICAgKyBcIlxcbmNvbHMgPSBcIiArIHRoaXMuX2NvbHNcclxuICAgICAgICApXHJcbiAgICB9O1xyXG59XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbiIsImltcG9ydCB7IF9nZXRfdXVpZCB9IGZyb20gXCIuLi9kX3V0bC9GX1JhbmRcIjtcclxuXHJcbnR5cGUgIFRfT25PZmZPcHRpb24gPSB7XHJcbiAgICB5bj86ICAgICAgIGJvb2xlYW4sXHJcbiAgICBvbk5hbWU/OiAgIHN0cmluZyxcclxuICAgIG9mZk5hbWU/OiAgc3RyaW5nLFxyXG4gICAgb25DbGFzcz86ICBzdHJpbmcsXHJcbiAgICBvZmZDbGFzcz86IHN0cmluZyxcclxuICAgIGZuYz86ICAgICAgX1RfRm5jLFxyXG59XHJcblxyXG50eXBlICBfVF9Pbk9mZk9wdGlvbiA9IHtcclxuICAgIG9uTmFtZTogICAgc3RyaW5nLFxyXG4gICAgb2ZmTmFtZTogICBzdHJpbmcsXHJcbiAgICBvbkNsYXNzOiAgIHN0cmluZyxcclxuICAgIG9mZkNsYXNzOiAgc3RyaW5nLFxyXG4gICAgZm5jPzogICAgICBfVF9GbmMsXHJcbn1cclxuXHJcbnR5cGUgX1RfRm5jID0gKHluOiBib29sZWFuKT0+KHZvaWR8Ym9vbGVhbik7XHJcblxyXG5leHBvcnQgY2xhc3MgQ19Pbk9mZkJ1dHRvbiB7XHJcbiAgICBwcm90ZWN0ZWQgc3RhdGljIG1lOiB7W2lkOiBzdHJpbmddOiBDX09uT2ZmQnV0dG9ufTtcclxuXHJcbiAgICBwdWJsaWMgICAgc3RhdGljIGdldE9iaihlbG06IEhUTUxCdXR0b25FbGVtZW50LCBvb28/OiBUX09uT2ZmT3B0aW9uKTogQ19Pbk9mZkJ1dHRvbiB7XHJcbiAgICAgICAgdGhpcy5tZSA/Pz0ge307XHJcbiAgICAgICAgdGhpcy5tZVtlbG0uaWRdID8/PSBuZXcgQ19Pbk9mZkJ1dHRvbihlbG0sIG9vbyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubWVbZWxtLmlkXTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgeW46ICBib29sZWFuO1xyXG4gICAgcHJvdGVjdGVkIGVsbTogSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcbiAgICBwcm90ZWN0ZWQgb29vOiBfVF9Pbk9mZk9wdGlvbjtcclxuICAgIHByb3RlY3RlZCBkZWZfb29vOiBfVF9Pbk9mZk9wdGlvbiA9IHtcclxuICAgICAgICBvbk5hbWU6ICAgJ09OJyxcclxuICAgICAgICBvZmZOYW1lOiAgJ29mZicsXHJcbiAgICAgICAgb25DbGFzczogICdfdG9nZ2xlX29uJyxcclxuICAgICAgICBvZmZDbGFzczogJ190b2dnbGVfb2ZmJyxcclxuICAgIH07XHJcbiAgICBwcm90ZWN0ZWQgZm5jOiB7W2lkOiBzdHJpbmddOiBfVF9GbmN9O1xyXG5cclxuICAgIHByb3RlY3RlZCBjb25zdHJ1Y3RvcihlbG06IEhUTUxCdXR0b25FbGVtZW50LCBvb28/OiBUX09uT2ZmT3B0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5mbmMgPSB7fTtcclxuICAgICAgICB0aGlzLm9vbyA9IHRoaXMuZGVmX29vbztcclxuICAgICAgICB0aGlzLnluICA9IGZhbHNlO1xyXG5cclxuICAgICAgICBpZiAoZWxtLm5hbWUgPT09IHVuZGVmaW5lZCB8fCBlbG0ubmFtZSA9PT0gJycpIGVsbS5uYW1lID0gZWxtLmlkO1xyXG4gICAgICAgIHRoaXMuZWxtID0gZWxtO1xyXG4gICAgICAgIHRoaXMuZWxtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQ6TW91c2VFdmVudCk9Pnt0aGlzLnRvZ2dsZSgpO30sIGZhbHNlKTtcclxuXHJcbiAgICAgICAgaWYgKG9vbyAhPT0gdW5kZWZpbmVkKSB0aGlzLnNldE9iaihvb28pOyBcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXRPYmoob29vOiBUX09uT2ZmT3B0aW9uKTogQ19Pbk9mZkJ1dHRvbiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdGhpcy55biAgPSBvb28ueW4gPz8gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm9vbyA9IG9vbyBhcyBfVF9Pbk9mZk9wdGlvbjsgXHJcbiAgICAgICAgICAgIHRoaXMub29vLm9uTmFtZSAgID8/PSB0aGlzLmRlZl9vb28ub25OYW1lOyBcclxuICAgICAgICAgICAgdGhpcy5vb28ub2ZmTmFtZSAgPz89IHRoaXMuZGVmX29vby5vZmZOYW1lOyBcclxuICAgICAgICAgICAgdGhpcy5vb28ub25DbGFzcyAgPz89IHRoaXMuZGVmX29vby5vbkNsYXNzOyBcclxuICAgICAgICAgICAgdGhpcy5vb28ub2ZmQ2xhc3MgPz89IHRoaXMuZGVmX29vby5vZmZDbGFzczsgXHJcbiAgICAgICAgICAgIHRoaXMuX3NldFN0eWxlKHRoaXMueW4pO1xyXG4gICAgICAgIH0gY2F0Y2gge31cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBfc2V0U3R5bGUoeW46IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnluICAgPSB5bjtcclxuICAgICAgICBjb25zdCBvb28gPSB0aGlzLm9vbztcclxuICAgICAgICB0aGlzLmVsbS52YWx1ZSA9IHluPydvbic6J29mZic7XHJcbiAgICAgICAgdGhpcy5lbG0uaW5uZXJIVE1MID0geW4gPyBvb28ub25OYW1lIDogb29vLm9mZk5hbWU7XHJcbiAgICAgICAgdGhpcy5lbG0uY2xhc3NMaXN0LnJlbW92ZSh5bj8gb29vLm9mZkNsYXNzIDogb29vLm9uQ2xhc3MpO1xyXG4gICAgICAgIHRoaXMuZWxtLmNsYXNzTGlzdC5hZGQgICAoeW4/IG9vby5vbkNsYXNzICA6IG9vby5vZmZDbGFzcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldE9OKCk6ICAgYm9vbGVhbiB7cmV0dXJuIHRoaXMuX3NldFlOKHRydWUpID8/IGZhbHNlfTtcclxuICAgIHB1YmxpYyBzZXRPRkYoKTogIGJvb2xlYW4ge3JldHVybiB0aGlzLl9zZXRZTihmYWxzZSkgPz8gZmFsc2V9O1xyXG4gICAgcHVibGljIHRvZ2dsZSgpOiAgYm9vbGVhbiB7cmV0dXJuIHRoaXMuX3NldFlOKCF0aGlzLnluKSA/PyBmYWxzZX1cclxuXHJcbiAgICBwcm90ZWN0ZWQgX3NldFlOKHluOiBib29sZWFuKTogYm9vbGVhbnx2b2lkIHtcclxuICAgICAgICB0aGlzLl9zZXRTdHlsZSh5bik7XHJcblxyXG4gICAgICAgIGxldCB0Zjpib29sZWFufHZvaWQgID0gdHJ1ZTsgXHJcbiAgICAgICAgZm9yIChjb25zdCBpIGluIHRoaXMuZm5jKSB0ZiAmJj0gdGhpcy5mbmNbaV0oeW4pOyBcclxuICAgICAgICByZXR1cm4gdGY7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGlkKCk6ICAgICAgc3RyaW5nICB7cmV0dXJuIHRoaXMuZWxtLmlkfTtcclxuICAgIHB1YmxpYyBpc09OKCk6ICAgIGJvb2xlYW4ge3JldHVybiB0aGlzLnluO31cclxuXHJcbiAgICBwdWJsaWMgYWRkRm5jKGZuYzogX1RfRm5jKTogc3RyaW5nIHtcclxuICAgICAgICBjb25zdCBpZCA9ICdvb2Z1bmNfJyArIF9nZXRfdXVpZCgpO1xyXG4gICAgICAgIHRoaXMuZm5jW2lkXSA9IGZuYztcclxuICAgICAgICByZXR1cm4gaWQ7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgcm12Rm5jKGZuYzogX1RfRm5jfHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICh0eXBlb2YgZm5jID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICB0cnl7XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5mbmNbZm5jXTsgXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfWNhdGNoKGVycil7cmV0dXJuIGZhbHNlfVxyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGNvbnN0IGkgaW4gdGhpcy5mbmMpIGlmIChmbmMgPT09IHRoaXMuZm5jW2ldKSB7ZGVsZXRlIHRoaXMuZm5jW2ldOyByZXR1cm4gdHJ1ZX1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbn1cclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5pbXBvcnQgeyBJX0xvY2F0ZSwgVF9MY2tkIH0gICAgICBmcm9tIFwiLi9DX0xvY2F0aW9uXCI7XHJcbmltcG9ydCB7IElfSlNPTl9VbmlxLCBKU09OX0FueSB9IGZyb20gXCIuL0NfU2F2ZUluZm9cIjtcclxuaW1wb3J0IHsgQ19IZXJvLCBKU09OX0hlcm8gfSAgICAgZnJvbSBcIi4vQ19IZXJvXCI7XHJcbmltcG9ydCB7IF9nZXRfdXVpZCB9ICAgICAgICAgICAgIGZyb20gXCIuLi9kX3V0bC9GX1JhbmRcIjtcclxuaW1wb3J0IHsgQ19Hb29kc0xpc3QsIEpTT05fR29vZHNMaXN0IH0gZnJvbSBcIi4vQ19Hb29kc0xpc3ROR1wiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBKU09OX0d1aWxkIGV4dGVuZHMgSlNPTl9Bbnkge1xyXG4gICAgaWQ/OiAgICAgICBudW1iZXIsXHJcbiAgICB1bmlxX2lkPzogIHN0cmluZyxcclxuICAgIHNhdmVfaWQ/OiAgbnVtYmVyLFxyXG4gICAgbmFtZT86ICAgICBzdHJpbmcsXHJcbiAgICBnb2xkPzogICAgIG51bWJlcixcclxuICAgIGdvb2RzPzogICAgSlNPTl9Hb29kc0xpc3QsXHJcbiAgICBoZXJvZXM/OiAgIEpTT05fSGVyb1tdLFxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYWxlcnRfZ3VsZF9pbmZvKGE6IEpTT05fR3VpbGR8dW5kZWZpbmVkKTogdm9pZCB7XHJcbiAgICBpZiAoYSA9PT0gdW5kZWZpbmVkKSByZXR1cm47XHJcbiAgICBhbGVydChcIkd1aWxkIEluZm86XCIgXHJcbiAgICAgICAgKyBcIlxcbmlkOiAgICAgICBcIiArIChhLmlkICAgICAgICA/PyAnPycpXHJcbiAgICAgICAgKyBcIlxcbnVuaXFfaWQ6ICBcIiArIChhLnVuaXFfaWQgICA/PyAnPycpXHJcbiAgICAgICAgKyBcIlxcbnNhdmVfaWQ6ICBcIiArIChhLnNhdmVfaWQgICA/PyAnPycpXHJcbiAgICAgICAgKyBcIlxcbm5hbWU6ICAgICBcIiArIChhLm5hbWUgICAgICA/PyAnPycpXHJcbiAgICAgICAgKyBcIlxcbmdvbGQ6ICAgICBcIiArIChhLmdvbGQgICAgICA/PyAgMCApXHJcbi8vICAgICAgICArIFwiXFxuZ29vZHM6ICAgIFwiICsgKE9iamVjdC5rZXlzKGEuZ29vZHM/PzApLmxlbmd0aClcclxuICAgICAgICArIFwiXFxuaGVyb2VzOiAgIFwiICsgKGEuaGVyb2VzPy5sZW5ndGggPz8gJz8nKVxyXG4gICAgICAgICsgXCJcXG5cIlxyXG4gICAgKTtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIENfR3VpbGQgaW1wbGVtZW50cyBJX0xvY2F0ZSwgSV9KU09OX1VuaXEge1xyXG4gICAgcHJvdGVjdGVkIGlkOiAgICAgICAgIG51bWJlcjtcclxuICAgIHByb3RlY3RlZCB1bmlxX2lkOiAgICBzdHJpbmc7XHJcbiAgICBwcm90ZWN0ZWQgc2F2ZV9pZDogICAgbnVtYmVyO1xyXG4gICAgcHJvdGVjdGVkIG5hbWU6ICAgICAgIHN0cmluZztcclxuICAgIHB1YmxpYyAgICBnb2xkOiAgICAgICBudW1iZXI7XHJcbi8vICAgIHB1YmxpYyAgICBnb29kczogICAgICBDX0dvb2RzTGlzdDtcclxuICAgIHByb3RlY3RlZCBoZXJvZXM6ICAgICB7W3VpZDogc3RyaW5nXTogQ19IZXJvfTtcclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihhPzogSlNPTl9HdWlsZCkge1xyXG4gICAgICAgIHRoaXMuaWQgICAgICAgICA9IC0xO1xyXG4gICAgICAgIHRoaXMudW5pcV9pZCAgICA9ICdtYWlfZ3VsZCMnICsgX2dldF91dWlkKCk7XHJcbiAgICAgICAgdGhpcy5zYXZlX2lkICAgID0gLTE7XHJcbiAgICAgICAgdGhpcy5uYW1lICAgICAgID0gJyc7XHJcbiAgICAgICAgdGhpcy5nb2xkICAgICAgID0gIDA7XHJcbi8vICAgICAgICB0aGlzLmdvb2RzICAgICAgPSBuZXcgQ19Hb29kc0xpc3QoKTtcclxuICAgICAgICB0aGlzLmhlcm9lcyAgICAgPSB7fTtcclxuICAgICAgICBpZiAoYSAhPT0gdW5kZWZpbmVkKSB0aGlzLmRlY29kZShhKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdWlkKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLnVuaXFfaWR9XHJcbiAgICBwdWJsaWMgZ2V0X2xja2QoKTogVF9MY2tkIHtyZXR1cm4gVF9MY2tkLk1hemV9XHJcbiAgICBwdWJsaWMgZ2V0X25hbWUoKTogc3RyaW5nIHtyZXR1cm4gdGhpcy5uYW1lfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgaHJlcygpOiAgQ19IZXJvW10ge1xyXG4gICAgICAgIGNvbnN0IGhyZXM6IENfSGVyb1tdID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaWkgaW4gdGhpcy5oZXJvZXMpIGhyZXMucHVzaCh0aGlzLmhlcm9lc1tpaV0pO1xyXG4gICAgICAgIHJldHVybiBocmVzO1xyXG4gICAgfSBcclxuICAgIHB1YmxpYyBjbGVhcl9ocmVzKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaGVyb2VzID0ge307XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgYWRkX2hlcm8oaGVybzogQ19IZXJvKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5oZXJvZXNbaGVyby51aWQoKV0gPSBoZXJvO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHJtdl9oZXJvKGhlcm86IENfSGVybyk6IHZvaWQge1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLmhlcm9lc1toZXJvLnVpZCgpXTtcclxuICAgIH1cclxuXHJcbi8qXHJcbiAgICBwdWJsaWMgc3RhdGljIGZyb21fb2JqX3RvX3N0cmluZyhvYTogQ19HdWlsZCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KG9hLCBudWxsLCBcIlxcdFwiKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzdGF0aWMgZnJvbV9vYmpBcnJheV90b19zdHJpbmcob2FhOiB7W3VpZDogc3RyaW5nXTogQ19HdWlsZH0pOiBzdHJpbmcge1xyXG4gICAgICAgIGNvbnN0IG9hID0gW10gYXMgQ19HdWlsZFtdO1xyXG4gICAgICAgIGZvciAoY29uc3QgaWkgaW4gb2FhKSBvYS5wdXNoKG9hYVtpaV0pO1xyXG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShvYSwgbnVsbCwgXCJcXHRcIik7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc3RhdGljIGZyb21fc3RyaW5nX3RvX29iaih0eHQ6IHN0cmluZyk6IENfR3VpbGQge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGogICA9IEpTT04ucGFyc2UodHh0KSBhcyBKU09OX0d1aWxkW107XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgQ19HdWlsZChqKTtcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBDX0d1aWxkKCk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzdGF0aWMgZnJvbV9zdHJpbmdfdG9fb2JqQXJyYXkodHh0OiBzdHJpbmcpOiB7W3VpZDogc3RyaW5nXTogQ19HdWlsZH0ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGogICA9IEpTT04ucGFyc2UodHh0KSBhcyBKU09OX0d1aWxkW107XHJcbiAgICAgICAgICAgIGNvbnN0IG1wYSA9IHt9IGFzIHtbaWQ6IHN0cmluZ106IENfR3VpbGR9O1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGpqIG9mIGopIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGFhYSA9IG5ldyBDX0d1aWxkKCkuZGVjb2RlKGpqKTtcclxuICAgICAgICAgICAgICAgIG1wYVthYWEudWlkKCldID0gYWFhO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBtcGE7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7fTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4qL1xyXG5cclxuICAgIHB1YmxpYyBlbmNvZGUoKTogSlNPTl9HdWlsZCB7XHJcbiAgICAgICAgY29uc3QganNvbl9oZXJvZXM6IEpTT05fSGVyb1tdID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaWkgaW4gdGhpcy5oZXJvZXMpIGpzb25faGVyb2VzLnB1c2godGhpcy5oZXJvZXNbaWldLmVuY29kZSgpKTsgIFxyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBpZDogICAgICB0aGlzLmlkLFxyXG4gICAgICAgICAgICB1bmlxX2lkOiB0aGlzLnVuaXFfaWQsXHJcbiAgICAgICAgICAgIHNhdmVfaWQ6IHRoaXMuc2F2ZV9pZCxcclxuICAgICAgICAgICAgZ29sZDogICAgdGhpcy5nb2xkLFxyXG4vLyAgICAgICAgICAgIGdvb2RzOiAgIHRoaXMuZ29vZHMuZW5jb2RlKCksXHJcbiAgICAgICAgICAgIGhlcm9lczogIGpzb25faGVyb2VzLFxyXG4gICAgICAgICAgICBuYW1lOiAgICB0aGlzLm5hbWUsXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIGRlY29kZShhOiBKU09OX0d1aWxkfHVuZGVmaW5lZCk6IENfR3VpbGQge1xyXG4gICAgICAgIGlmIChhID09PSB1bmRlZmluZWQpIHJldHVybiB0aGlzO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChhLmlkICAgICAgICE9PSB1bmRlZmluZWQpIHRoaXMuaWQgICAgICAgICA9IGEuaWQ7XHJcbiAgICAgICAgaWYgKGEudW5pcV9pZCAgIT09IHVuZGVmaW5lZCkgdGhpcy51bmlxX2lkICAgID0gYS51bmlxX2lkO1xyXG4gICAgICAgIGlmIChhLnNhdmVfaWQgICE9PSB1bmRlZmluZWQpIHRoaXMuc2F2ZV9pZCAgICA9IGEuc2F2ZV9pZDtcclxuICAgICAgICBpZiAoYS5uYW1lICAgICAhPT0gdW5kZWZpbmVkKSB0aGlzLm5hbWUgICAgICAgPSBhLm5hbWU7XHJcbiAgICAgICAgaWYgKGEuZ29sZCAgICAgIT09IHVuZGVmaW5lZCkgdGhpcy5nb2xkO1xyXG4vLyAgICAgICAgaWYgKGEuZ29vZHMgICAgIT09IHVuZGVmaW5lZCkgdGhpcy5nb29kcy5kZWNvZGUgKGEuZ29vZHMpO1xyXG5cclxuICAgICAgICBpZiAoYS5oZXJvZXMgIT09IHVuZGVmaW5lZCkgIHtcclxuICAgICAgICAgICAgdGhpcy5oZXJvZXMgPSB7fTtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBqc29uX2hlcm8gb2YgYS5oZXJvZXMpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGhlcm8gPSBuZXcgQ19IZXJvKGpzb25faGVybyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhlcm9lc1toZXJvLnVpZCgpXSA9IGhlcm87XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc3RhdGljIGVuY29kZV9hbGwoYWxsX2d1bGQ6IENfR3VpbGRbXSk6IEpTT05fR3VpbGRbXSB7XHJcbiAgICAgICAgY29uc3QgYWxsX2d1bGRfZGF0YTogSlNPTl9HdWlsZFtdID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgZ3VsZCBvZiBhbGxfZ3VsZCkge1xyXG4gICAgICAgICAgICBhbGxfZ3VsZF9kYXRhLnB1c2goZ3VsZC5lbmNvZGUoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhbGxfZ3VsZF9kYXRhO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHN0YXRpYyBkZWNvZGVfYWxsKGFsbF9ndWxkX2RhdGE6IEpTT05fR3VpbGRbXSk6IENfR3VpbGRbXSB7XHJcbiAgICAgICAgY29uc3QgYWxsX2d1bGQ6IENfR3VpbGRbXSA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGd1bGRfZGF0YSBvZiBhbGxfZ3VsZF9kYXRhKSB7XHJcbiAgICAgICAgICAgIGFsbF9ndWxkLnB1c2goKG5ldyBDX0d1aWxkKCkpLmRlY29kZShndWxkX2RhdGEpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGFsbF9ndWxkO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgYWxlcnQoKTogdm9pZCB7XHJcbiAgICAgICAgYWxlcnQoXCJHdWlsZCBJbmZvOlwiIFxyXG4gICAgICAgICAgICArIFwiXFxuaWQ6ICAgICAgIFwiICsgKHRoaXMuaWQgICAgICAgICAgICAgPz8gJz8nKVxyXG4gICAgICAgICAgICArIFwiXFxudW5pcV9pZDogIFwiICsgKHRoaXMudW5pcV9pZCAgICAgICAgPz8gJz8nKVxyXG4gICAgICAgICAgICArIFwiXFxuc2F2ZV9pZDogIFwiICsgKHRoaXMuc2F2ZV9pZCAgICAgICAgPz8gJz8nKVxyXG4gICAgICAgICAgICArIFwiXFxubmFtZTogICAgIFwiICsgKHRoaXMubmFtZSAgICAgICAgICAgPz8gJz8nKVxyXG4gICAgICAgICAgICArIFwiXFxuZ29sZDogICAgIFwiICsgKHRoaXMuZ29sZCAgICAgICAgICAgPz8gIDApXHJcbi8vICAgICAgICAgICAgKyBcIlxcbmdvb2RzOiAgICBcIiArIChPYmplY3Qua2V5cyh0aGlzLmdvb2RzPz8wKS5sZW5ndGgpXHJcbiAgICAgICAgICAgICsgXCJcXG5oZXJvZXM6ICAgXCIgKyAodGhpcy5oZXJvZXM/Lmxlbmd0aCA/PyAnPycpXHJcbiAgICAgICAgICAgICsgXCJcXG5cIlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5pbXBvcnQgeyBDX0hlcm9BYmlsaXR5LCBKU09OX0hlcm9fQWJpbGl0eX0gZnJvbSBcIi4vQ19IZXJvQWJpbGl0eVwiO1xyXG5pbXBvcnQgeyBJX0pTT05fVW5pcSwgICBKU09OX0FueSB9ICAgICAgICAgZnJvbSBcIi4vQ19TYXZlSW5mb1wiO1xyXG5pbXBvcnQgeyBfZ2V0X3V1aWQsIF9pbnJhbmQsIF9pcmFuZCwgX3JhbmRvbV9zdHIgfSAgZnJvbSBcIi4uL2RfdXRsL0ZfUmFuZFwiO1xyXG5pbXBvcnQgeyBDX0dvb2RzTGlzdCwgSlNPTl9Hb29kc0xpc3QgfSBmcm9tIFwiLi9DX0dvb2RzTGlzdE5HXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEpTT05fSGVybyBleHRlbmRzIEpTT05fQW55IHtcclxuICAgIGlkPzogICAgICAgIG51bWJlciwgXHJcbiAgICB1bmlxX2lkPzogICBzdHJpbmcsIFxyXG4gICAgc2F2ZV9pZD86ICAgbnVtYmVyLCBcclxuICAgIG5hbWU/OiAgICAgIHN0cmluZywgXHJcbiAgICBzZXg/OiAgICAgICBudW1iZXI7IFxyXG4gICAgYWdlPzogICAgICAgbnVtYmVyOyBcclxuICAgIGdvbGQ/OiAgICAgIG51bWJlcjsgXHJcbi8vICAgIGdvb2RzPzogICAgIEpTT05fR29vZHNMaXN0OyBcclxuICAgIHN0YXRlPzogICAgIG51bWJlcjsgXHJcbiAgICBsdj86ICAgICAgICBudW1iZXI7IFxyXG4gICAgdmFsPzogICAgICAgSlNPTl9IZXJvX1ZhbHVlO1xyXG4gICAgYWJpX3A/OiAgICAgICB7YnNjPzogSlNPTl9IZXJvX0FiaWxpdHksIHR0bD86IEpTT05fSGVyb19BYmlsaXR5LCBub3c/OiBKU09OX0hlcm9fQWJpbGl0eX07XHJcbiAgICBhYmlfbT86ICAgICAgIHtic2M/OiBKU09OX0hlcm9fQWJpbGl0eSwgdHRsPzogSlNPTl9IZXJvX0FiaWxpdHksIG5vdz86IEpTT05fSGVyb19BYmlsaXR5fTtcclxuICAgIGlzX2FsaXZlPzogIHN0cmluZ3xib29sZWFuO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEpTT05fSGVyb19WYWx1ZSBleHRlbmRzIEpTT05fQW55IHtcclxuICAgIHNrcD86IHt0dGw6IG51bWJlciwgIG5vdzogbnVtYmVyfSwgXHJcbiAgICBleHA/OiB7dHRsOiBudW1iZXIsICBub3c6IG51bWJlcn0sXHJcbiAgICBueGU/OiBudW1iZXIsICAgICAgICAgICAgICAgICAgIC8vIOasoeWbnuOBruODkuODvOODreODvOODrOODmeODq+OCouODg+ODl+OBq+W/heimgeOBque1jOmok+WApFxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYWxlcnRfaHJlc19pbmZvKGE6IChKU09OX0hlcm98dW5kZWZpbmVkKVtdfHVuZGVmaW5lZCk6IHZvaWQgeyBcclxuICAgIGlmIChhID09PSB1bmRlZmluZWQpIHJldHVybjtcclxuICAgIGFsZXJ0KCdOdW1iZXIgb2YgSGVybyA9ICcgKyBhLmxlbmd0aC50b1N0cmluZygpKTtcclxuICAgIGZvciAodmFyIGkgaW4gYSkge1xyXG4gICAgICAgIGlmIChhW2ldID09PSB1bmRlZmluZWQpIGNvbnRpbnVlO1xyXG4gICAgICAgIGFsZXJ0X2hlcm9faW5mbyhhW2ldKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFsZXJ0X2hlcm9faW5mbyhhOiBKU09OX0hlcm98dW5kZWZpbmVkKTogdm9pZCB7IFxyXG4gICAgaWYgKGEgPT09IHVuZGVmaW5lZCkgcmV0dXJuO1xyXG4gICAgYWxlcnQoXCJIZXJvIEluZm86XFxuXCIgXHJcbiAgICAgICAgKyBcIlxcbmlkOiAgICAgICBcIiAgICAgKyAoYT8uaWQgICAgICAgID8/ICc/JylcclxuICAgICAgICArIFwiXFxudW5pcV9pZCAgIFwiICAgICArIChhPy51bmlxX2lkICAgPz8gJz8nKVxyXG4gICAgICAgICsgXCJcXG5uYW1lOiAgICAgXCIgICAgICsgKGE/Lm5hbWUgICAgICA/PyAnPycpXHJcbiAgICAgICAgKyBcIlxcbnNhdmVfaWQ6ICBcIiAgICAgKyAoYT8uc2F2ZV9pZCAgID8/ICc/JylcclxuICAgICAgICArIFwiXFxuaXNfYWxpdmU6IFwiICAgICArIChhPy5pc19hbGl2ZSAgPz8gJz8nKVxyXG4gICAgICAgICsgXCJcXG5cIlxyXG4gICAgKTtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIENfSGVybyBpbXBsZW1lbnRzIElfSlNPTl9VbmlxIHtcclxuICAgIHByb3RlY3RlZCBteV9pZDogICAgbnVtYmVyO1xyXG4gICAgcHJvdGVjdGVkIG15X25hbWU6ICBzdHJpbmc7XHJcbiAgICBwcm90ZWN0ZWQgdW5pcV9pZDogIHN0cmluZzsgXHJcbiAgICBwcm90ZWN0ZWQgc2F2ZV9pZDogIG51bWJlcjsgXHJcbiAgICBwcm90ZWN0ZWQgc2V4OiAgICAgIG51bWJlcjsgXHJcbiAgICBwcm90ZWN0ZWQgYWdlOiAgICAgIG51bWJlcjsgXHJcbiAgICBwcm90ZWN0ZWQgc3RhdGU6ICAgIG51bWJlcjsgXHJcbiAgICBwcm90ZWN0ZWQgbHY6ICAgICAgIG51bWJlcjsgXHJcbiAgICAvLyBic2MoQmFzaWMp44Gv5b2T5Lq644Gu5Z+65pys5YCk44CCdHRsKFRvdGFsKeOBr+ijheWCmeetieOCkuWKoOa4m+eul+OBl+OBn+OCguOBruOAgm5vd+OBr+ODkOODleetieOBruOCv+ODvOODs+WItuOBruOCguWKoOa4m+eul+OBl+OBn+OCguOBrlxyXG4gICAgcHJvdGVjdGVkIGdvbGQ6ICAgICBudW1iZXI7IFxyXG4vLyAgICBwcm90ZWN0ZWQgZ29vZHM6ICAgIENfR29vZHNMaXN0OyBcclxuICAgIHByb3RlY3RlZCB2YWw6ICAgICAgSlNPTl9IZXJvX1ZhbHVlO1xyXG4gICAgcHJvdGVjdGVkIGFiaV9wOiAgICAgIHtic2M6IENfSGVyb0FiaWxpdHksIHR0bDogQ19IZXJvQWJpbGl0eSwgbm93OiBDX0hlcm9BYmlsaXR5fTtcclxuICAgIHByb3RlY3RlZCBhYmlfbTogICAgICB7YnNjOiBDX0hlcm9BYmlsaXR5LCB0dGw6IENfSGVyb0FiaWxpdHksIG5vdzogQ19IZXJvQWJpbGl0eX07XHJcblxyXG4gICAgcHJvdGVjdGVkIGlzX2FsaXZlOiBib29sZWFuO1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihhPzogSlNPTl9IZXJvKSB7XHJcbiAgICAgICAgdGhpcy5teV9pZCAgICAgID0gMDtcclxuICAgICAgICB0aGlzLm15X25hbWUgICAgPSAnTm8gTmFtZSBIZXJvJztcclxuICAgICAgICB0aGlzLnVuaXFfaWQgICAgPSAnbWFpX2hlcm8jJyArIF9nZXRfdXVpZCgpO1xyXG4gICAgICAgIHRoaXMuc2F2ZV9pZCAgICA9IDA7XHJcbiAgICAgICAgdGhpcy5zZXggICAgICAgID0gMDsgXHJcbiAgICAgICAgdGhpcy5hZ2UgICAgICAgID0gMDsgXHJcbiAgICAgICAgdGhpcy5nb2xkICAgICAgID0gMDsgXHJcbi8vICAgICAgICB0aGlzLmdvb2RzICAgICAgPSBuZXcgQ19Hb29kc0xpc3QoKTsgXHJcbiAgICAgICAgdGhpcy5zdGF0ZSAgICAgID0gMDsgXHJcbiAgICAgICAgdGhpcy5sdiAgICAgICAgID0gMDtcclxuICAgICAgICB0aGlzLnZhbCAgICAgICAgPSB7fTtcclxuICAgICAgICB0aGlzLmFiaV9wICAgICAgPSB7YnNjOiBuZXcgQ19IZXJvQWJpbGl0eSgpLCB0dGw6IG5ldyBDX0hlcm9BYmlsaXR5KCksIG5vdzogbmV3IENfSGVyb0FiaWxpdHkoKX07XHJcbiAgICAgICAgdGhpcy5hYmlfbSAgICAgID0ge2JzYzogbmV3IENfSGVyb0FiaWxpdHkoKSwgdHRsOiBuZXcgQ19IZXJvQWJpbGl0eSgpLCBub3c6IG5ldyBDX0hlcm9BYmlsaXR5KCl9O1xyXG4gICAgICAgIHRoaXMuaXNfYWxpdmUgICA9IHRydWU7XHJcbiAgICAgICAgaWYgKGEgIT09IHVuZGVmaW5lZCkgdGhpcy5kZWNvZGUoYSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldF9wcnAoYXJnIDogSlNPTl9IZXJvKSB7XHJcbiAgICAgICAgdGhpcy5kZWNvZGUoYXJnKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRfdW5pcV9pZCgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy51bmlxX2lkfVxyXG5cclxuICAgIHB1YmxpYyBpZCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiAnSGVyb18nICsgdGhpcy5teV9pZC50b1N0cmluZygxNikucGFkU3RhcnQoNSwgJzAnKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyB1aWQoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMudW5pcV9pZDt9XHJcbiAgICBwdWJsaWMgbmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm15X25hbWU7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0X25hbWUobmFtZTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5teV9uYW1lID0gbmFtZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIGVuY29kZSgpOiBKU09OX0hlcm8ge1xyXG4gICAgICAgIGNvbnN0IHJldDogSlNPTl9IZXJvID0ge1xyXG4gICAgICAgICAgICBpZDogICAgICAgIHRoaXMubXlfaWQsXHJcbiAgICAgICAgICAgIHVuaXFfaWQ6ICAgdGhpcy51bmlxX2lkLFxyXG4gICAgICAgICAgICBuYW1lOiAgICAgIHRoaXMubXlfbmFtZSxcclxuICAgICAgICAgICAgc2F2ZV9pZDogICB0aGlzLnNhdmVfaWQsXHJcbiAgICAgICAgICAgIHNleDogICAgICAgdGhpcy5zZXgsIFxyXG4gICAgICAgICAgICBhZ2U6ICAgICAgIHRoaXMuYWdlLCBcclxuICAgICAgICAgICAgc3RhdGU6ICAgICB0aGlzLnN0YXRlLCBcclxuICAgICAgICAgICAgbHY6ICAgICAgICB0aGlzLmx2LCBcclxuICAgICAgICAgICAgZ29sZDogICAgICB0aGlzLmdvbGQsIFxyXG4vLyAgICAgICAgICAgIGdvb2RzOiAgICAgdGhpcy5nb29kcy5lbmNvZGUoKSwgXHJcbiAgICAgICAgICAgIHZhbDogICAgICAgdGhpcy52YWwsXHJcbiAgICAgICAgICAgIGFiaV9wX2JzYzogdGhpcy5hYmlfcC5ic2MuZW5jb2RlKCksXHJcbiAgICAgICAgICAgIGFiaV9tX2JzYzogdGhpcy5hYmlfbS5ic2MuZW5jb2RlKCksXHJcbiAgICAgICAgICAgIGlzX2FsaXZlOiAodGhpcy5pc19hbGl2ZSkgPyAnWScgOiAnTicsIFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgfVxyXG4gICAgcHVibGljIGRlY29kZShhOiBKU09OX0hlcm98dW5kZWZpbmVkKTogQ19IZXJvIHtcclxuICAgICAgICBpZiAoYSA9PT0gdW5kZWZpbmVkKSByZXR1cm4gdGhpcztcclxuICAgICAgICBpZiAoYS5pZCAgICAgICAhPT0gdW5kZWZpbmVkKSB0aGlzLm15X2lkICAgID0gYS5pZDtcclxuICAgICAgICBpZiAoYS5uYW1lICAgICAhPT0gdW5kZWZpbmVkKSB0aGlzLm15X25hbWUgID0gYS5uYW1lO1xyXG4gICAgICAgIGlmIChhLnVuaXFfaWQgICE9PSB1bmRlZmluZWQpIHRoaXMudW5pcV9pZCAgPSBhLnVuaXFfaWQ7XHJcbiAgICAgICAgaWYgKGEuc2F2ZV9pZCAgIT09IHVuZGVmaW5lZCkgdGhpcy5zYXZlX2lkICA9IGEuc2F2ZV9pZDtcclxuICAgICAgICBpZiAoYS5zZXggICAgICAhPT0gdW5kZWZpbmVkKSB0aGlzLnNleCAgICAgID0gYS5zZXg7XHJcbiAgICAgICAgaWYgKGEuYWdlICAgICAgIT09IHVuZGVmaW5lZCkgdGhpcy5hZ2UgICAgICA9IGEuYWdlO1xyXG4gICAgICAgIGlmIChhLnN0YXRlICAgICE9PSB1bmRlZmluZWQpIHRoaXMuc3RhdGUgICAgPSBhLnN0YXRlO1xyXG4gICAgICAgIGlmIChhLmx2ICAgICAgICE9PSB1bmRlZmluZWQpIHRoaXMubHYgICAgICAgPSBhLmx2O1xyXG4gICAgICAgIGlmIChhLmdvbGQgICAgICE9PSB1bmRlZmluZWQpIHRoaXMuZ29sZCAgICAgPSBhLmdvbGQ7XHJcbiAgICAgICAgaWYgKGEuaXNfYWxpdmUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGEuaXNfYWxpdmUgPT09IFwiYm9vbGVhblwiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzX2FsaXZlID0gYS5pc19hbGl2ZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNfYWxpdmUgPSAoYS5pc19hbGl2ZSAhPSAnTicpID8gdHJ1ZTogZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbi8vICAgICAgICBpZiAoYS5nb29kcyAgICE9PSB1bmRlZmluZWQpIHRoaXMuZ29vZHMuZGVjb2RlKGEuZ29vZHMpO1xyXG4gICAgICAgIGlmIChhLnZhbCAgICAgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9fZGVjb2RlX3ZhbCh0aGlzLnZhbCwgYS52YWwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYS5hYmlfcF9ic2MgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLmFiaV9wLmJzYy5kZWNvZGUoYS5hYmlfcF9ic2MpO1xyXG4gICAgICAgICAgICAvLyDmmqvlrppcclxuICAgICAgICAgICAgdGhpcy5hYmlfcC50dGwgPSB0aGlzLmFiaV9wLm5vdyA9IHRoaXMuYWJpX3AuYnNjO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYS5hYmlfbV9ic2MgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLmFiaV9tLmJzYy5kZWNvZGUoYS5hYmlfbV9ic2MpO1xyXG4gICAgICAgICAgICAvLyDmmqvlrppcclxuICAgICAgICAgICAgdGhpcy5hYmlfbS50dGwgPSB0aGlzLmFiaV9tLm5vdyA9IHRoaXMuYWJpX20uYnNjO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgX19kZWNvZGVfdmFsKGQ6IEpTT05fSGVyb19WYWx1ZSwgczogSlNPTl9IZXJvX1ZhbHVlKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHMuc2twICE9PSB1bmRlZmluZWQpIGQuc2twID0gdGhpcy5fX2RlY29kZV9za2V4KGQuc2twLCBzLnNrcCk7XHJcbiAgICAgICAgaWYgKHMuZXhwICE9PSB1bmRlZmluZWQpIGQuZXhwID0gdGhpcy5fX2RlY29kZV9za2V4KGQuZXhwLCBzLmV4cCk7XHJcbiAgICAgICAgaWYgKHMubnhlICE9PSB1bmRlZmluZWQpIGQubnhlID0gcy5ueGU7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgX19kZWNvZGVfc2tleChhOiB7dHRsPzogbnVtYmVyLCBub3c/OiBudW1iZXJ9IHwgdW5kZWZpbmVkLCBzOiB7dHRsPzogbnVtYmVyLCBub3c/OiBudW1iZXJ9KToge3R0bDogbnVtYmVyLCBub3c6IG51bWJlcn0ge1xyXG4gICAgICAgIHZhciBkOiB7dHRsOiBudW1iZXIsIG5vdzogbnVtYmVyfTtcclxuICAgICAgICBpZiAgICAgKGEgPT09IHVuZGVmaW5lZCkgZCA9IHt0dGw6IDAsIG5vdzogMH07XHJcbiAgICAgICAgZWxzZSAgICBkID0ge3R0bDogYT8udHRsID8/IDAsIG5vdzogYT8ubm93ID8/IDB9O1xyXG5cclxuICAgICAgICBkLnR0bCA9IHMudHRsID8/IGQudHRsO1xyXG4gICAgICAgIGQubm93ID0gcy5ub3cgPz8gcy50dGwgPz8gZC5ub3c7XHJcbiAgICAgICAgcmV0dXJuIGQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBjcmVhdGVfaGVybygpOiBDX0hlcm8ge1xyXG4gICAgICAgIGNvbnN0IG5ld19oZXJvID0gbmV3IENfSGVybygpO1xyXG4gICAgICAgIG5ld19oZXJvLnNldF9wcnAoe2lkOiAgICBNYXRoLmZsb29yKC0xMDAwLjAgKiBNYXRoLnJhbmRvbSgpKX0pO1xyXG4gICAgICAgIG5ld19oZXJvLnNldF9wcnAoe25hbWU6ICBuZXdfaGVyby5pZCgpfSk7XHJcbiAgICAgICAgcmV0dXJuIG5ld19oZXJvO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByYW5kb21fbWFrZSgpOiBDX0hlcm8ge1xyXG4gICAgICAgIHRoaXMubXlfaWQgICAgPSAwOyAvLyAtLUhlcm86OiRtYXhfaWQ7XHJcbiAgICAgICAgdGhpcy5teV9uYW1lICA9IFwi5YaS6Zm66ICFIFwiICsgX3JhbmRvbV9zdHIoNSk7XHJcbiAgICAgICAgdGhpcy5zZXggICAgICA9IF9pcmFuZCggMCwgICAgIDEpOyBcclxuICAgICAgICB0aGlzLmFnZSAgICAgID0gX2lyYW5kKCAxNSwgICAyNSk7IFxyXG4gICAgICAgIHRoaXMuc3RhdGUgICAgPSAwOyBcclxuICAgICAgICB0aGlzLmx2ICAgICAgID0gMDsgXHJcbiAgICAgICAgdGhpcy5nb2xkICAgICA9IF9pcmFuZCggNTAwLCAxMDAwKTsgXHJcbiAgICAgICAgdGhpcy52YWwgICAgICA9IHtcclxuICAgICAgICAgICAgc2twOiB7dHRsOiAwLCBub3c6IDB9LCBcclxuICAgICAgICAgICAgZXhwOiB7dHRsOiAwLCBub3c6IDB9LFxyXG4gICAgICAgICAgICAnbnhlJzogMTAwMFxyXG4gICAgICAgIH07XHJcblxyXG5cclxuICAgICAgICBjb25zdCBhYmlfcF9ic2MgPSB0aGlzLmFiaV9wLmJzYztcclxuICAgICAgICBhYmlfcF9ic2MucmFuZG9tX21ha2UoKTtcclxuICAgICAgICBhYmlfcF9ic2MuYWRkX3hwX2JvbnVzKCh0aGlzLmFnZSAtIDE1KSAqIDEwKTtcclxuICAgICAgICBhYmlfcF9ic2MuYWRkX2VsX2JvbnVzKCh0aGlzLmFnZSAtIDE1KSAqICA1KTtcclxuICAgICAgICBhYmlfcF9ic2MuYWRkX3ByX2JvbnVzKCh0aGlzLmFnZSAtIDE1KSAqICAyKTtcclxuICAgICAgICB0aGlzLmFiaV9wLmJzYyA9IGFiaV9wX2JzYztcclxuXHJcbiAgICAgICAgY29uc3QgYWJpX21fYnNjID0gdGhpcy5hYmlfbS5ic2M7XHJcbiAgICAgICAgYWJpX21fYnNjLnJhbmRvbV9tYWtlKCk7XHJcbiAgICAgICAgYWJpX21fYnNjLmFkZF94cF9ib251cygodGhpcy5hZ2UgLSAxNSkgKiAxMCk7XHJcbiAgICAgICAgYWJpX21fYnNjLmFkZF9lbF9ib251cygodGhpcy5hZ2UgLSAxNSkgKiAgNSk7XHJcbiAgICAgICAgYWJpX21fYnNjLmFkZF9wcl9ib251cygodGhpcy5hZ2UgLSAxNSkgKiAgMik7XHJcbiAgICAgICAgdGhpcy5hYmlfbS5ic2MgPSBhYmlfbV9ic2M7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZW5jb2RlX2hlcm9lcyhoZXJvZXM6IENfSGVyb1tdKTogSlNPTl9IZXJvW10ge1xyXG4gICAgICAgIGNvbnN0IGhlcm9lc19kYXRhID0gW10gYXMgSlNPTl9IZXJvW107XHJcbiAgICAgICAgZm9yICh2YXIgaGVybyBvZiBoZXJvZXMpIHtcclxuICAgICAgICAgICAgaGVyb2VzX2RhdGEucHVzaChoZXJvLmVuY29kZSgpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGhlcm9lc19kYXRhO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHN0YXRpYyBkZWNvZGVfaGVyb2VzKGhlcm9lc19kYXRhOiAoSlNPTl9IZXJvfHVuZGVmaW5lZClbXXx1bmRlZmluZWQpOiBDX0hlcm9bXSB7XHJcbiAgICAgICAgY29uc3QgaGVyb2VzID0gW10gYXMgQ19IZXJvW107XHJcbiAgICAgICAgaWYgKGhlcm9lc19kYXRhICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaGVyb19kYXRhIG9mIGhlcm9lc19kYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaGVyb19kYXRhICE9PSB1bmRlZmluZWQpIGhlcm9lcy5wdXNoKG5ldyBDX0hlcm8oKS5kZWNvZGUoaGVyb19kYXRhKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGhlcm9lcztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWxlcnQoKTogdm9pZCB7IFxyXG4gICAgICAgIGFsZXJ0KFwiSGVybyBJbmZvOlxcblwiIFxyXG4gICAgICAgICAgICArIFwiXFxuaWQ6ICAgICAgIFwiICAgICArICh0aGlzLmlkICAgICAgICA/PyAnPycpXHJcbiAgICAgICAgICAgICsgXCJcXG51bmlxX2lkICAgXCIgICAgICsgKHRoaXMudW5pcV9pZCAgID8/ICc/JylcclxuICAgICAgICAgICAgKyBcIlxcbm5hbWU6ICAgICBcIiAgICAgKyAodGhpcy5uYW1lICAgICAgPz8gJz8nKVxyXG4gICAgICAgICAgICArIFwiXFxuc2F2ZV9pZDogIFwiICAgICArICh0aGlzLnNhdmVfaWQgICA/PyAnPycpXHJcbiAgICAgICAgICAgICsgXCJcXG5pc19hbGl2ZTogXCIgICAgICsgKHRoaXMuaXNfYWxpdmUgID8/ICc/JylcclxuICAgICAgICAgICAgKyBcIlxcblwiXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzdGF0aWMgYWxlcnRfaHJlcyhhOiAoQ19IZXJvfHVuZGVmaW5lZClbXXx1bmRlZmluZWQpOiB2b2lkIHsgXHJcbiAgICAgICAgaWYgKGEgPT09IHVuZGVmaW5lZCkgcmV0dXJuO1xyXG4gICAgICAgIGFsZXJ0KCdOdW1iZXIgb2YgSGVybyA9ICcgKyBhLmxlbmd0aC50b1N0cmluZygpKTtcclxuICAgICAgICBmb3IgKHZhciBpIGluIGEpIGFbaV0/LmFsZXJ0KCk7XHJcbiAgICB9XHJcbn0iLCJcInVzZSBzdHJpY3RcIjtcclxuXHJcbmltcG9ydCB7IElfSlNPTiwgSlNPTl9BbnkgfSBmcm9tIFwiLi9DX1NhdmVJbmZvXCI7XHJcbmltcG9ydCB7IF9yb3VuZCB9ICAgICAgICAgICBmcm9tIFwiLi4vZF91dGwvRl9NYXRoXCI7XHJcbmltcG9ydCB7IF9pbnJhbmQgfSBmcm9tIFwiLi4vZF91dGwvRl9SYW5kXCI7XHJcblxyXG4vLyDkuIDoiKzjgavkvb/jgYjjgovjg6bjg7zjg4bjgqPjg6rjg4bjgqPjgarlkarmlodcclxuLy8g44Kq44OW44K444Kn44Kv44OI44KS5YiX5oyZ5Z6L44Go44GX44Gm5Z6L5YyW44GZ44KL44Gu44Gr5Yip55SoXHJcbnR5cGUgVF9IZXJvQWJpbGl0eSA9IHtba2V5OiBzdHJpbmddOiBudW1iZXJ9O1xyXG5leHBvcnQgaW50ZXJmYWNlIEpTT05fSGVyb19BYmlsaXR5IGV4dGVuZHMgSlNPTl9Bbnkge1trZXk6IHN0cmluZ106IG51bWJlcn1cclxuXHJcbmV4cG9ydCBjbGFzcyBDX0hlcm9BYmlsaXR5IGltcGxlbWVudHMgSV9KU09OIHtcclxuICAgIHByb3RlY3RlZCB2OiBUX0hlcm9BYmlsaXR5ID0ge1xyXG4gICAgICAgIHhwOiAgMCwgIC8vIHA6SFDjgIFtOk1QXHJcblxyXG4gICAgICAgIC8vIOS7peS4i+OAgeaIpumXmOiDveWKm+OBruWfuuacrOWApChwOueJqeeQhuOAgW066a2U5rOVKeOAguODkuODvOODreODvOODrOODmeODq+OChOOCueODhuODvOOCv+OCueOCouODg+ODl+OBp+WKoOeulyBcclxuICAgICAgICBhdGs6IDAsICAvLyDmlLvmkoPlgKRcclxuICAgICAgICBkZWY6IDAsICAvLyDpmLLlvqHlgKRcclxuICAgICAgICBxdWM6IDAsICAvLyDnnqznmbrliptcclxuICAgICAgICBjbmM6IDAsICAvLyDmqZ/pgYvlgKQo44OB44Oj44Oz44K5KVxyXG4gICAgXHJcbiAgICAgICAgLy8g5Lul5LiL44CB44GE44KP44KG44KL44K544OG44O844K/44K544CC5LiK6KiY44Gu6KiI566X44Gr5b2x6Z+/44CC44OS44O844Ot44O844Os44OZ44Or44KE44K544OG44O844K/44K544Ki44OD44OX44Gn5Yqg566XXHJcbiAgICAgICAgc3RyOiAwLCAgLy8g5qC55oCn44CC5pS75pKDL+mYsuW+oeWKm+OBq+OCguW9semfv+OAgkhQL01Q5Zue5b6p44KE44Ki44Kk44OG44Og44Gu5pyA5aSn5omA5oyB6YeN6YeP44Gr44Oc44O844OK44K5XHJcbiAgICAgICAgcHdyOiAwLCAgLy8g5Z+65pys55qE5by344GV44CC5pS75pKD5Yqb44Gr5b2x6Z+/XHJcbiAgICAgICAgdml0OiAwLCAgLy8g6ICQ5LmF5Yqb44CCSFAvTVDjga7mnIDlpKflgKTjgoTpmLLlvqHlipvjgavlvbHpn7/jgpLkuI7jgYjjgotcclxuICAgICAgICBkZXg6IDAsICAvLyDlmajnlKjjgZXjgILlkb3kuK3njofjgavlvbHpn7/jgpLkuI7jgYjjgovjgILpo5vjgbPpgZPlhbfjgoTplbfot53pm6LprZTms5Xjgafjga/nibnjgavlvbHpn7/jgILnvaDop6PpmaTjgavjgoLlvbHpn79cclxuICAgICAgICBhZ2k6IDAsICAvLyDntKDml6njgZXjgILooYzli5XpgJ/luqbjgoTlm57pgb/njofjgavlvbHpn7/jgpLkuI7jgYjjgovjgILlkb3kuK3njofjgavjgoLlvbHpn79cclxuICAgICAgICB0ZWM6IDAsICAvLyDmioDooZPlipvjgILntYzpqJPjgaflkJHkuIrjgZfjgabog73lipvlgKQocXVjL2NuYynjgavjg5zjg7zjg4rjgrnjgpLkuI7jgYjjgotcclxuICAgICAgICBsdWs6IDAsICAvLyDlubjpgYvlgKTjgIJjbmPjgavlpKfjgY3jgY/lvbHpn7/jgZnjgotcclxuICAgIH07XHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKGE/OiBKU09OX0hlcm9fQWJpbGl0eSkge1xyXG4gICAgICAgIGZvciAobGV0IGlkeCBpbiB0aGlzLnYpIHt0aGlzLnZbaWR4XSA9IDA7fVxyXG4gICAgICAgIGlmIChhICE9PSB1bmRlZmluZWQpIHRoaXMuZGVjb2RlKGEpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldF9wcnAoYTogSlNPTl9IZXJvX0FiaWxpdHkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmRlY29kZShhKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQoa2V5OiBzdHJpbmcpOiBudW1iZXIgfCB1bmRlZmluZWQge1xyXG4gICAgICAgIGlmICghKGtleSBpbiB0aGlzLnYpKSByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnZba2V5XTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXQoa2V5OiBzdHJpbmcsIHM6IEpTT05fSGVyb19BYmlsaXR5KTogbnVtYmVyIHwgdW5kZWZpbmVkIHtcclxuICAgICAgICBpZiAoIShrZXkgaW4gdGhpcy52KSkgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB0aGlzLnZba2V5XSA9IHNba2V5XTtcclxuICAgICAgICByZXR1cm4gc1trZXldO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB4cF90dGxhZGQoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gX3JvdW5kKE1hdGguZmxvb3IodGhpcy52LnN0ciArIHRoaXMudi52aXQgKiAxMC4wKSwgMCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgYXRrX3R0bGFkZCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiBfcm91bmQoTWF0aC5mbG9vcih0aGlzLnYuc3RyICsgdGhpcy52LnB3ciArIHRoaXMudi50ZWMpIC8gMTAuMCwgMCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZGVmX3R0bGFkZCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiBfcm91bmQoTWF0aC5mbG9vcih0aGlzLnYuc3RyICsgdGhpcy52LnZpdCArIHRoaXMudi50ZWMpIC8gMTAuMCwgMCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgcXVjX3R0bGFkZCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiBfcm91bmQoTWF0aC5mbG9vcih0aGlzLnYuYWdpICsgdGhpcy52Lmx1ayArIHRoaXMudi50ZWMpIC8gMTAuMCwgMCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgY25jX3R0bGFkZCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiBfcm91bmQoTWF0aC5mbG9vcigyLjAgKiB0aGlzLnYubHVrICsgdGhpcy52LnRlYykgLyAxMC4wLCAwKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYm9udXMoa2V5IDogc3RyaW5nKTogbnVtYmVyIHtcclxuICAgICAgICBpZiAoIShrZXkgaW4gdGhpcy52KSkgcmV0dXJuIDA7XHJcbiAgICAgICAgaWYgKGtleSA9PT0gJ3hwJykgcmV0dXJuIF9yb3VuZChNYXRoLmZsb29yKHRoaXMudi54cCAvIDEwMCksIDApO1xyXG4gICAgICAgIHJldHVybiBfcm91bmQoTWF0aC5mbG9vcih0aGlzLnZba2V5XSAvIDEwLjApLCAwKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWRkKGE6IEpTT05fSGVyb19BYmlsaXR5KTogdm9pZCB7XHJcbiAgICAgICAgZm9yIChsZXQga2V5IGluIGEpIHtcclxuICAgICAgICAgICAgdGhpcy52W2tleV0gKz0gYVtrZXldO1xyXG4gICAgICAgIH1cclxuICAgIH0gXHJcblxyXG4gICAgcHVibGljIGFkZF94cF9ib251cyhib251czogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy52LnhwICArPSAgYm9udXM7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgYWRkX2VsX2JvbnVzKGJvbnVzOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnYuYXRrICs9ICBib251cztcclxuICAgICAgICB0aGlzLnYuZGVmICs9ICBib251cztcclxuICAgICAgICB0aGlzLnYucXVjICs9ICBib251cztcclxuICAgICAgICB0aGlzLnYuY25jICs9ICBib251cztcclxuICAgIH1cclxuICAgIHB1YmxpYyBhZGRfcHJfYm9udXMoYm9udXM6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMudi5zdHIgKz0gIGJvbnVzO1xyXG4gICAgICAgIHRoaXMudi5wd3IgKz0gIGJvbnVzO1xyXG4gICAgICAgIHRoaXMudi52aXQgKz0gIGJvbnVzO1xyXG4gICAgICAgIHRoaXMudi5kZXggKz0gIGJvbnVzO1xyXG4gICAgICAgIHRoaXMudi5hZ2kgKz0gIGJvbnVzO1xyXG4gICAgICAgIHRoaXMudi50ZWMgKz0gIGJvbnVzO1xyXG4gICAgICAgIHRoaXMudi5sdWsgKz0gIGJvbnVzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByYW5kb21fbWFrZSgpOiBDX0hlcm9BYmlsaXR5IHtcclxuICAgICAgICB0aGlzLnYueHAgID0gIF9pbnJhbmQoMCwgMTAwMCwgMy4wKTtcclxuXHJcbiAgICAgICAgdGhpcy52LmF0ayA9ICBfaW5yYW5kKDAsICAxMDAsIDIuNSk7XHJcbiAgICAgICAgdGhpcy52LmRlZiA9ICBfaW5yYW5kKDAsICAxMDAsIDIuNSk7XHJcbiAgICAgICAgdGhpcy52LnF1YyA9ICBfaW5yYW5kKDAsICAxMDAsIDIuNSk7XHJcbiAgICAgICAgdGhpcy52LmNuYyA9ICBfaW5yYW5kKDAsICAxMDAsIDIuNSk7XHJcbiAgICBcclxuICAgICAgICB0aGlzLnYuc3RyID0gIF9pbnJhbmQoMCwgICAyMCwgMi4wKTtcclxuICAgICAgICB0aGlzLnYucHdyID0gIF9pbnJhbmQoMCwgICAyMCwgMi4wKTtcclxuICAgICAgICB0aGlzLnYudml0ID0gIF9pbnJhbmQoMCwgICAyMCwgMi4wKTtcclxuICAgICAgICB0aGlzLnYuZGV4ID0gIF9pbnJhbmQoMCwgICAyMCwgMi4wKTtcclxuICAgICAgICB0aGlzLnYuYWdpID0gIF9pbnJhbmQoMCwgICAyMCwgMi4wKTtcclxuICAgICAgICB0aGlzLnYudGVjID0gIF9pbnJhbmQoMCwgICAyMCwgMi4wKTtcclxuICAgICAgICB0aGlzLnYubHVrID0gIF9pbnJhbmQoMCwgICAyMCwgMi4wKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGVuY29kZSgpOiBKU09OX0hlcm9fQWJpbGl0eSB7XHJcbiAgICAgICAgY29uc3QgYTogSlNPTl9IZXJvX0FiaWxpdHkgPSB7fTtcclxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gdGhpcy52KSBhW2tleV0gPSB0aGlzLnZba2V5XTtcclxuICAgICAgICByZXR1cm4gYTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBkZWNvZGUoYTogSlNPTl9IZXJvX0FiaWxpdHkpOiBDX0hlcm9BYmlsaXR5IHtcclxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gYSkge1xyXG4gICAgICAgICAgICBpZiAoa2V5IGluIHRoaXMudiAmJiBhW2tleV0gIT09IHVuZGVmaW5lZCkgdGhpcy52W2tleV0gPSBhW2tleV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgY2xvbmUoczogQ19IZXJvQWJpbGl0eSk6IENfSGVyb0FiaWxpdHkge1xyXG4gICAgICAgIHJldHVybiBuZXcgQ19IZXJvQWJpbGl0eShzLmVuY29kZSgpKTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5cclxuaW1wb3J0IHsgQ19Qb2ludCB9ICAgICAgICAgICAgICAgICAgIGZyb20gJy4vQ19Qb2ludCc7XHJcbmltcG9ydCB7IENfUG9pbnREaXIsIEpTT05fUG9pbnREaXIgfSBmcm9tICcuL0NfUG9pbnREaXInO1xyXG5pbXBvcnQgeyBUX0RpcmVjdGlvbiB9ICAgICAgICAgICAgICAgZnJvbSAnLi9DX1BvaW50RGlyJztcclxuaW1wb3J0IHsgSV9KU09OLCBKU09OX0FueSB9ICAgICAgICAgIGZyb20gJy4vQ19TYXZlSW5mbyc7XHJcbmltcG9ydCB7IFRfTWFrZUVudW1UeXBlIH0gICAgICAgICAgICBmcm9tIFwiLi4vZF91dGwvVF9NYWtlRW51bVR5cGVcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBUX0xja2Q6e1tsY2tkOiBzdHJpbmddOiBudW1iZXJ9ICA9IHtcclxuICAgIFVua246IDAsXHJcbiAgICBNYXplOiAxLFxyXG4gICAgR3VsZDogMixcclxufSBhcyBjb25zdDtcclxuZXhwb3J0IHR5cGUgVF9MY2tkICAgPSBUX01ha2VFbnVtVHlwZTx0eXBlb2YgVF9MY2tkPjtcclxuXHJcbmZ1bmN0aW9uIF9sY2tkX2tleShsY2tkOiBUX0xja2QpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKFRfTGNrZCkuZmluZChrZXkgPT4gVF9MY2tkW2tleV0gPT09IGxja2QpID8/IFwiPz8/P1wiO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEpTT05fTG9jYXRpb24gZXh0ZW5kcyBKU09OX0FueSB7XHJcbiAgICBraW5kPzogICAgc3RyaW5nLFxyXG4gICAgbmFtZT86ICAgIHN0cmluZyxcclxuICAgIGxvY191aWQ/OiBzdHJpbmcsXHJcbiAgICBsb2NfcG9zPzogSlNPTl9Qb2ludERpcixcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJX0xvY2F0ZSB7XHJcbiAgICB1aWQ6ICAgICAgKCk9PnN0cmluZztcclxuICAgIGdldF9sY2tkOiAoKT0+VF9MY2tkO1xyXG4gICAgZ2V0X25hbWU6ICgpPT5zdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBDX0xvY2F0aW9uIGltcGxlbWVudHMgSV9KU09OIHtcclxuICAgIHByb3RlY3RlZCBsb2Nfa2luZDogVF9MY2tkID0gVF9MY2tkLlVua247XHJcbiAgICBwcm90ZWN0ZWQgbG9jX25hbWU6IHN0cmluZyA9ICcnO1xyXG4gICAgcHJvdGVjdGVkIGxvY191aWQ6ICBzdHJpbmcgPSAnJztcclxuICAgIHByb3RlY3RlZCBsb2NfcG9zOiAgQ19Qb2ludERpciA9IG5ldyBDX1BvaW50RGlyKCk7XHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKGpzb24/OiBKU09OX0xvY2F0aW9uKSB7XHJcbiAgICAgICAgaWYgKGpzb24gIT09IHVuZGVmaW5lZCkgdGhpcy5kZWNvZGUoanNvbik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldF9sY2tkX3N0cigpOiBzdHJpbmcgIHtyZXR1cm4gX2xja2Rfa2V5KHRoaXMubG9jX2tpbmQpO31cclxuICAgIHB1YmxpYyBnZXRfbGNrZCgpOiBUX0xja2QgICAgICB7cmV0dXJuIHRoaXMubG9jX2tpbmQ7fVxyXG4gICAgcHVibGljIGdldF9uYW1lKCk6IHN0cmluZyAgICAgIHtyZXR1cm4gdGhpcy5sb2NfbmFtZTt9XHJcbiAgICBwdWJsaWMgZ2V0X3VpZCgpOiAgc3RyaW5nICAgICAge3JldHVybiB0aGlzLmxvY191aWQ7fVxyXG5cclxuICAgIHB1YmxpYyBzZXRfbGNrZChsY2tkOiBUX0xja2QpOiBDX0xvY2F0aW9ufHVuZGVmaW5lZCB7XHJcbiAgICAgICAgaWYgKCEoX2xja2Rfa2V5KGxja2QpIGluIFRfTGNrZCkpIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhpcy5sb2Nfa2luZCA9IGxja2Q7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0X25hbWUobmFtZTogc3RyaW5nKTogICB2b2lkIHt0aGlzLmxvY19uYW1lID0gbmFtZTt9XHJcbiAgICBwdWJsaWMgc2V0X3VpZCAodWlkOiBzdHJpbmcpOiAgICB2b2lkIHt0aGlzLmxvY191aWQgID0gdWlkO31cclxuICAgIFxyXG4gICAgcHVibGljIHNldF9sY2tkX3N0cihsY2tkOiBzdHJpbmcpOiBDX0xvY2F0aW9ufHVuZGVmaW5lZCB7XHJcbiAgICAgICAgaWYgKCEobGNrZCBpbiBUX0xja2QpKSByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIHRoaXMubG9jX2tpbmQgPSBUX0xja2RbbGNrZF07XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBnZXRfcCgpOiBDX1BvaW50ICAgICB7XHJcbi8vICAgICAgICBpZiAodGhpcy5sb2Nfa2luZCAhPSBUX0xja2QuTWF6ZSkgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICByZXR1cm4gdGhpcy5sb2NfcG9zLmdldF9wKCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0X2QoKTogVF9EaXJlY3Rpb24ge1xyXG4vLyAgICAgICAgaWYgKHRoaXMubG9jX2tpbmQgIT0gVF9MY2tkLk1hemUpIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubG9jX3Bvcy5nZXRfZCgpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldF9wZCgpOiBDX1BvaW50RGlyIHtcclxuLy8gICAgICAgIGlmICh0aGlzLmxvY19raW5kICE9IFRfTGNrZC5NYXplKSByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxvY19wb3MuZ2V0X3BkKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldF9wICAgKHA6IENfUG9pbnREaXIpOiBDX1BvaW50RGlyfHVuZGVmaW5lZCB7XHJcbiAgICAgICAgaWYgKHRoaXMubG9jX2tpbmQgIT09IFRfTGNrZC5NYXplKSAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgaWYgKHRoaXMubG9jX3Bvcy5zZXRfcChwKSA9PT0gdW5kZWZpbmVkKSAgcmV0dXJuIHVuZGVmaW5lZDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMubG9jX3BvcztcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXRfZCAgIChkOiBUX0RpcmVjdGlvbik6IFRfRGlyZWN0aW9ufHVuZGVmaW5lZCB7XHJcbiAgICAgICAgaWYgKHRoaXMubG9jX2tpbmQgIT09IFRfTGNrZC5NYXplKSAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgaWYgKHRoaXMubG9jX3Bvcy5zZXRfZChkKSA9PT0gdW5kZWZpbmVkKSAgcmV0dXJuIHVuZGVmaW5lZDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMubG9jX3Bvcy5kO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldF9wZCAgKHBkOiBDX1BvaW50RGlyKTogQ19Qb2ludERpcnx1bmRlZmluZWQge1xyXG4gICAgICAgIGlmICh0aGlzLmxvY19raW5kICE9PSBUX0xja2QuTWF6ZSkgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICBpZiAodGhpcy5sb2NfcG9zLnNldF9wZChwZCkgPT09IHVuZGVmaW5lZCkgcmV0dXJuIHVuZGVmaW5lZDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMubG9jX3BvcztcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIGVuY29kZSgpOiBKU09OX0xvY2F0aW9uIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBraW5kOiAgICAgX2xja2Rfa2V5KHRoaXMubG9jX2tpbmQpLFxyXG4gICAgICAgICAgICBuYW1lOiAgICAgdGhpcy5sb2NfbmFtZSxcclxuICAgICAgICAgICAgbG9jX3VpZDogIHRoaXMubG9jX3VpZCxcclxuICAgICAgICAgICAgbG9jX3BvczogIHRoaXMubG9jX3Bvcy5lbmNvZGUoKSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgcHVibGljIGRlY29kZShqPzogSlNPTl9Mb2NhdGlvbik6IENfTG9jYXRpb24ge1xyXG4gICAgICAgIGlmIChqID09PSB1bmRlZmluZWQpIHJldHVybiB0aGlzO1xyXG4gICAgICAgIGlmIChqLmtpbmQgPT09IHVuZGVmaW5lZCB8fCAhKGoua2luZCBpbiBUX0xja2QpKSByZXR1cm4gdGhpcztcclxuXHJcbiAgICAgICAgaWYgKGoua2luZCAgICAhPT0gdW5kZWZpbmVkKSB0aGlzLmxvY19raW5kID0gVF9MY2tkW2oua2luZF07XHJcbiAgICAgICAgaWYgKGoubmFtZSAgICAhPT0gdW5kZWZpbmVkKSB0aGlzLmxvY19uYW1lID0gai5uYW1lO1xyXG4gICAgICAgIGlmIChqLmxvY191aWQgIT09IHVuZGVmaW5lZCkgdGhpcy5sb2NfdWlkICA9IGoubG9jX3VpZDtcclxuICAgICAgICBpZiAoai5sb2NfcG9zICE9PSB1bmRlZmluZWQpIHRoaXMubG9jX3Bvcy5kZWNvZGUoai5sb2NfcG9zKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxufVxyXG5cclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5pbXBvcnQgeyBUX016S2luZCB9ICAgICAgICAgICAgICBmcm9tIFwiLi9UX016S2luZFwiO1xyXG5pbXBvcnQgeyBDX01hemVDZWxsIH0gICAgICAgICAgICBmcm9tIFwiLi9DX01hemVDZWxsXCI7XHJcbmltcG9ydCB7IENfTWF6ZU9iaiwgSV9NYXplT2JqLCBKU09OX01hemVPYmogfSBmcm9tIFwiLi9DX01hemVPYmpcIjtcclxuaW1wb3J0IHsgQ19Qb2ludCB9ICAgICAgICAgICAgICAgZnJvbSBcIi4vQ19Qb2ludFwiO1xyXG5pbXBvcnQgeyBJX0xvY2F0ZSwgVF9MY2tkIH0gICAgICBmcm9tIFwiLi9DX0xvY2F0aW9uXCI7XHJcbmltcG9ydCB7IENfUmFuZ2UgfSAgICAgICAgICAgICAgIGZyb20gXCIuL0NfUmFuZ2VcIjtcclxuaW1wb3J0IHsgQ19UZWFtLCBKU09OX1RlYW0gfSAgICAgZnJvbSBcIi4vQ19UZWFtXCI7XHJcbmltcG9ydCB7IElfSlNPTl9VbmlxLCBKU09OX0FueSB9IGZyb20gXCIuL0NfU2F2ZUluZm9cIjtcclxuaW1wb3J0IHsgX2dldF91dWlkLCBfaWdyYW5kLCBfaXJhbmQgfSAgICAgICAgICAgICBmcm9tIFwiLi4vZF91dGwvRl9SYW5kXCI7XHJcbmltcG9ydCB7IF9taW4gfSBmcm9tIFwiLi4vZF91dGwvRl9NYXRoXCI7XHJcbmltcG9ydCB7IENfUG9pbnREaXIgfSBmcm9tIFwiLi9DX1BvaW50RGlyXCI7XHJcbmltcG9ydCB7IFRfRGlyZWN0aW9uIH0gZnJvbSBcIi4vVF9EaXJlY3Rpb25cIjtcclxuaW1wb3J0IHsgQ19Qb2ludExpbmsyRCwgQ19Qb2ludFNldDJEIH0gZnJvbSBcIi4vQ19Qb2ludFNldDJEXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEpTT05fTWF6ZSBleHRlbmRzIEpTT05fQW55IHtcclxuICAgIGlkPzogICAgICBudW1iZXIsXHJcbiAgICB1bmlxX2lkPzogc3RyaW5nLFxyXG4gICAgc2F2ZV9pZD86IG51bWJlcixcclxuICAgIGZsb29yPzogICBudW1iZXIsXHJcbiAgICBuYW1lPzogICAgc3RyaW5nLFxyXG4gICAgc2l6ZV94PzogIG51bWJlcixcclxuICAgIHNpemVfeT86ICBudW1iZXIsXHJcbiAgICBzaXplX3o/OiAgbnVtYmVyLFxyXG4gICAgbWF6ZT86ICAgIHN0cmluZywgXHJcbiAgICBtYXNrPzogICAgc3RyaW5nLCBcclxuICAgIG15dGVhbT86ICBKU09OX1RlYW0sIFxyXG4gICAgb2Jqcz86ICAgIEpTT05fTWF6ZU9ialtdLFxyXG59XHJcblxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFsZXJ0X21hemVfaW5mbyhhOiBKU09OX01hemV8dW5kZWZpbmVkKTogdm9pZCB7XHJcbiAgICBpZiAoYSA9PT0gdW5kZWZpbmVkKSByZXR1cm47XHJcblxyXG4gICAgYWxlcnQoXCJNYXplIEluZm86XCJcclxuICAgICAgICArIFwiXFxubWF6ZSBpZCA6XCIgKyAoYS5pZCAgICAgID8/ICc/JylcclxuICAgICAgICArIFwiXFxuZmxvb3I6IFwiICAgKyAoYS5mbG9vciAgID8/ICc/JylcclxuICAgICAgICArIFwiXFxudW5pcSBpZCA6XCIgKyAoYS51bmlxX2lkID8/ICc/JylcclxuICAgICAgICArIFwiXFxuc2F2ZSBpZCA6XCIgKyAoYS5zYXZlX2lkID8/ICc/JylcclxuICAgICAgICArIFwiXFxubmFtZTogICBcIiAgKyAoYS5uYW1lICAgID8/ICc/JylcclxuICAgICAgICArIFwiXFxuc2l6ZV94OiBcIiAgKyAoYS5zaXplX3ggID8/ICc/JylcclxuICAgICAgICArIFwiXFxuc2l6ZV95OiBcIiAgKyAoYS5zaXplX3kgID8/ICc/JylcclxuICAgICAgICArIFwiXFxuc2l6ZV96OiBcIiAgKyAoYS5zaXplX3ogID8/ICc/JylcclxuICAgICAgICArIFwibWF6ZTpcXG5cIiAgICAgKyAoYS5tYXplICAgID8/ICc/JylcclxuICAgICAgICArIFwibWFzazpcXG5cIiAgICAgKyAoYS5tYXNrICAgID8/ICc/JylcclxuICAgICAgICArIFwiXFxuXCJcclxuICAgICk7XHJcbn1cclxuXHJcblxyXG50eXBlIF9pbml0X2FyZyA9IHtcclxuICAgIG1hemVfaWQ/OiBudW1iZXIsXHJcbiAgICBzYXZlX2lkPzogbnVtYmVyLFxyXG4gICAgZmxvb3I/OiAgIG51bWJlcixcclxuICAgIG5hbWU/OiAgICBzdHJpbmcsXHJcbiAgICBzaXplX3g/OiAgbnVtYmVyLFxyXG4gICAgc2l6ZV95PzogIG51bWJlcixcclxuICAgIHNpemVfej86ICBudW1iZXIsXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBDX01hemUgaW1wbGVtZW50cyBJX0xvY2F0ZSwgSV9KU09OX1VuaXEge1xyXG4gICAgcHJvdGVjdGVkIG1hemVfaWQ6ICBudW1iZXI7XHJcbiAgICBwcm90ZWN0ZWQgdW5pcV9pZDogIHN0cmluZztcclxuICAgIHByb3RlY3RlZCBzYXZlX2lkOiAgbnVtYmVyO1xyXG4gICAgcHJvdGVjdGVkIGZsb29yOiAgICBudW1iZXI7XHJcbiAgICBwcm90ZWN0ZWQgbmFtZTogICAgIHN0cmluZztcclxuICAgIHByb3RlY3RlZCBteV9sYXllcjogbnVtYmVyID0gMDtcclxuICAgIHByb3RlY3RlZCBzaXplOiAgICAgQ19SYW5nZTtcclxuICAgIHByb3RlY3RlZCBjZWxsczogICAgQ19NYXplQ2VsbFtdW11bXTtcclxuICAgIHByb3RlY3RlZCBtYXNrczogICAgYm9vbGVhbltdW11bXTtcclxuICAgIHByb3RlY3RlZCB1bmNsZWFyOiAgbnVtYmVyW107XHJcbiAgICBwcm90ZWN0ZWQgb2JqczogICAgIHtbdWlkOiBzdHJpbmddOiBJX01hemVPYmp9O1xyXG4gICAgcHJvdGVjdGVkIG51bV9vZl9yb29tOiAgICAgIG51bWJlciA9IDU7IC8qIOODqeODs+ODgOODoOeUn+aIkOOBrumam+OBrumDqOWxi+OBruaVsOOBruacgOWkp+aVsCAqL1xyXG4gICAgcHJvdGVjdGVkIG1heF9zaXplX29mX3Jvb206IG51bWJlciA9IDM7IC8qIOODqeODs+ODgOODoOeUn+aIkOOBrumam+OBrumDqOWxi+OBruWkp+OBjeOBlSAqL1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihhPzogX2luaXRfYXJnKSB7XHJcbiAgICAgICAgdGhpcy5tYXplX2lkID0gLTE7XHJcbiAgICAgICAgdGhpcy5zYXZlX2lkID0gLTE7XHJcbiAgICAgICAgdGhpcy51bmlxX2lkID0gJ21haV9tYXplIycgKyBfZ2V0X3V1aWQoKTtcclxuICAgICAgICB0aGlzLmZsb29yICAgPSAwO1xyXG4gICAgICAgIHRoaXMubmFtZSAgICA9ICcnO1xyXG4gICAgICAgIHRoaXMuc2l6ZSAgICA9IG5ldyBDX1JhbmdlKFxyXG4gICAgICAgICAgICBuZXcgQ19Qb2ludCgwLCAwLCAwKSwgXHJcbiAgICAgICAgICAgIG5ldyBDX1BvaW50KDIsIDIsIDIpKTtcclxuICAgICAgICB0aGlzLmNlbGxzICAgPSB0aGlzLl9faW5pdF9tYXplKFRfTXpLaW5kLlN0b25lKTtcclxuXHJcbiAgICAgICAgdGhpcy5tYXNrcyAgID0gdGhpcy5fX2luaXRfbWFzayh0cnVlKTtcclxuICAgICAgICB0aGlzLnVuY2xlYXIgPSBbXTtcclxuICAgICAgICB0aGlzLl9faW5pdF91bmNsZWFyKCk7XHJcblxyXG4gICAgICAgIHRoaXMub2JqcyAgICA9IHt9O1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChhICE9PSB1bmRlZmluZWQpIHRoaXMuZGVjb2RlKGEpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBfX2luaXRfbWF6ZShraW5kOiBUX016S2luZCA9IFRfTXpLaW5kLlN0b25lKTogQ19NYXplQ2VsbFtdW11bXSB7XHJcbiAgICAgICAgY29uc3Qgc2l6ZV94ID0gdGhpcy5zaXplLnNpemVfeCgpO1xyXG4gICAgICAgIGNvbnN0IHNpemVfeSA9IHRoaXMuc2l6ZS5zaXplX3koKTtcclxuICAgICAgICBjb25zdCBzaXplX3ogPSB0aGlzLnNpemUuc2l6ZV96KCk7XHJcblxyXG4gICAgICAgIGNvbnN0IGNlbGxzOiBDX01hemVDZWxsW11bXVtdID0gQXJyYXkoc2l6ZV96KSBhcyBDX01hemVDZWxsW11bXVtdO1xyXG4gICAgICAgIGZvciAodmFyIHogPSAwOyB6IDwgc2l6ZV96OyB6KyspIHtcclxuICAgICAgICAgICAgY2VsbHNbel0gPSBBcnJheShzaXplX3kpIGFzIENfTWF6ZUNlbGxbXVtdO1xyXG4gICAgICAgICAgICBmb3IgKHZhciB5ID0gMDsgeSA8IHNpemVfeTsgeSsrKSB7XHJcbiAgICAgICAgICAgICAgICBjZWxsc1t6XVt5XSAgPSBBcnJheShzaXplX3gpIGFzIENfTWF6ZUNlbGxbXTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIHggPSAwOyB4IDwgc2l6ZV94OyB4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICBjZWxsc1t6XVt5XVt4XSA9IENfTWF6ZUNlbGwubmV3T2JqKHtraW5kOmtpbmQsIHBvczoge3g6eCwgeTp5LCB6Onp9fSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNlbGxzO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIF9faW5pdF9tYXNrKFlOOiBib29sZWFuKTogYm9vbGVhbltdW11bXSB7XHJcbiAgICAgICAgY29uc3Qgc2l6ZV94ID0gdGhpcy5zaXplLnNpemVfeCgpO1xyXG4gICAgICAgIGNvbnN0IHNpemVfeSA9IHRoaXMuc2l6ZS5zaXplX3koKTtcclxuICAgICAgICBjb25zdCBzaXplX3ogPSB0aGlzLnNpemUuc2l6ZV96KCk7XHJcblxyXG4gICAgICAgIHRoaXMubWFza3MgICA9IEFycmF5KHNpemVfeikgYXMgYm9vbGVhbltdW11bXTtcclxuICAgICAgICBmb3IgKHZhciB6ID0gMDsgeiA8IHNpemVfejsgeisrKSB7XHJcbiAgICAgICAgICAgIHRoaXMubWFza3Nbel0gPSBBcnJheShzaXplX3kpIGFzIGJvb2xlYW5bXVtdO1xyXG4gICAgICAgICAgICBmb3IgKHZhciB5ID0gMDsgeSA8IHNpemVfeTsgeSsrKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1hc2tzW3pdW3ldICA9IEFycmF5KHNpemVfeCkgYXMgYm9vbGVhbltdO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgeCA9IDA7IHggPCBzaXplX3g7IHgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFza3Nbel1beV1beF0gPSBZTjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5tYXNrcztcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBfX2luaXRfdW5jbGVhcigpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBzaXplX3ggPSB0aGlzLnNpemUuc2l6ZV94KCk7XHJcbiAgICAgICAgY29uc3Qgc2l6ZV95ID0gdGhpcy5zaXplLnNpemVfeSgpO1xyXG4gICAgICAgIGNvbnN0IHNpemVfeiA9IHRoaXMuc2l6ZS5zaXplX3ooKTtcclxuXHJcbiAgICAgICAgdGhpcy51bmNsZWFyID0gQXJyYXkoc2l6ZV96KTtcclxuICAgICAgICBmb3IgKHZhciB6ID0gMDsgeiA8IHNpemVfejsgeisrKSB7XHJcbiAgICAgICAgICAgIHRoaXMudW5jbGVhclt6XT0wO1xyXG4gICAgICAgICAgICBmb3IgKHZhciB5ID0gMDsgeSA8IHNpemVfeTsgeSsrKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciB4ID0gMDsgeCA8IHNpemVfeDsgeCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubWFza3Nbel1beV1beF0pIHRoaXMudW5jbGVhclt6XSsrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHB1YmxpYyB1aWQoKTogc3RyaW5nICAgICAge3JldHVybiB0aGlzLnVuaXFfaWR9XHJcbiAgICBwdWJsaWMgZ2V0X2xja2QoKTogVF9MY2tkIHtyZXR1cm4gVF9MY2tkLk1hemV9XHJcbiAgICBwdWJsaWMgZ2V0X25hbWUoKTogc3RyaW5nIHtyZXR1cm4gdGhpcy5uYW1lfVxyXG5cclxuICAgIHB1YmxpYyB3aXRoaW4ocDogQ19Qb2ludCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNpemUud2l0aGluKHApO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvLyDjg6HjgqTjgrrlhoXjga7jgqrjg5bjgrjjgqfjgq/jg4jjgoTjg6Ljg7Pjgrnjgr/jg7znrYnjga7phY3nva5cclxuICAgIHB1YmxpYyBhZGRfb2JqKG9iajogSV9NYXplT2JqKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5vYmpzW29iai51aWQoKV0gPSBvYmo7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgcm12X29iaihvYmo6IElfTWF6ZU9iaik6IHZvaWQge1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLm9ianNbb2JqLnVpZCgpXTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRfb2JqX3h5eih4OiBudW1iZXIsIHk6IG51bWJlciwgejogbnVtYmVyKTogSV9NYXplT2JqfG51bGwge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldF9vYmoobmV3IENfUG9pbnQoeCwgeSwgeikpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldF9vYmoocDogQ19Qb2ludCk6IElfTWF6ZU9ianxudWxsIHtcclxuICAgICAgICB2YXIgbGF5ZXIgPSAtMTtcclxuICAgICAgICB2YXIgb2JqOiBJX01hemVPYmp8bnVsbCAgID0gbnVsbDtcclxuXHJcbiAgICAgICAgZm9yIChjb25zdCBpZCBpbiB0aGlzLm9ianMpIHtcclxuICAgICAgICAgICAgY29uc3QgZXhpc3QgPSB0aGlzLm9ianNbaWRdO1xyXG5cclxuICAgICAgICAgICAgaWYgKGV4aXN0LnZpZXcoKSA9PT0gdW5kZWZpbmVkKSBjb250aW51ZTtcclxuICAgICAgICAgICAgaWYgKGV4aXN0LndpdGhpbihwKSAmJiBleGlzdC52aWV3KCk/LmxldHRlcigpICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXhpc3QudmlldygpPy5sYXllcigpPz8tOTkgPiBsYXllcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGxheWVyID0gZXhpc3QudmlldygpPy5sYXllcigpPz8tOTk7XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqICAgPSBleGlzdDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gXHJcbiAgICAgICAgcmV0dXJuIG9iajtcclxuICAgIH1cclxuICAgIHB1YmxpYyBleGlzdF9vYmoocDogQ19Qb2ludCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGZvciAoY29uc3QgaWQgaW4gdGhpcy5vYmpzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGV4aXN0ID0gdGhpcy5vYmpzW2lkXTtcclxuICAgICAgICAgICAgaWYgKGV4aXN0LndpdGhpbihwKSAmJiBleGlzdC52aWV3KCk/LmxldHRlcigpICE9PSBudWxsKSByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFRlYW3jgYzmnaXjgZ/jg53jgqTjg7Pjg4jjgYzmnKrouI/lnLDjgaDjgaPjgZ/jgonjgZ/jgaDjga7luorjgavlpInjgYjjgotcclxuICAgIHB1YmxpYyBjaGFuZ2VfdW5leHBfdG9fZmxvb3IocDogQ19Qb2ludCkge1xyXG4gICAgICAgIGlmICh0aGlzLmdldF9raW5kKHApID09IFRfTXpLaW5kLlVuZXhwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0X2NlbGwocCwgVF9NektpbmQuRmxvb3IpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyAyROODnuODg+ODl+OBruODnuOCueOCr+WkluOBl+mWoumAo1xyXG4gICAgcHVibGljIGNsZWFyX21hc2tfYXJvdW5kX3RoZV90ZWFtKHRlYW06IENfVGVhbSk6IHZvaWQge1xyXG4gICAgICAgIC8vIOePvuWcqOWcsOOBqOecn+aoquOBr+iHquWLleeahOOBq+imi+OBiOOCi1xyXG4gICAgICAgIHRoaXMuX19jbGVhcl9tYXNrKHRlYW0ud2FsaygpLmdldF9hcm91bmQoMCwgLTEpKTtcclxuICAgICAgICB0aGlzLl9fY2xlYXJfbWFzayh0ZWFtLndhbGsoKS5nZXRfYXJvdW5kKDAsICAwKSk7XHJcbiAgICAgICAgdGhpcy5fX2NsZWFyX21hc2sodGVhbS53YWxrKCkuZ2V0X2Fyb3VuZCgwLCAgMSkpO1xyXG5cclxuICAgICAgICBjb25zdCBkZXB0aCAgID0gIDU7IC8vIDJE44Oe44OD44OX55So44Gu5aWl6KGM44GN6ZmQ55WMXHJcblxyXG4gICAgICAgIC8vIOWJjeaWueOBruimi+mAmuOBl+OCkuODgeOCp+ODg+OCr+OBl+OBquOBjOOCieimi+OBiOOCi+OBqOOBk+OCjeOBr+ino+aUvuOBmeOCi1xyXG4gICAgICAgIGZvciAodmFyIGQgPSAxOyBkIDwgZGVwdGg7IGQrKykge1xyXG4gICAgICAgICAgICBjb25zdCBmcm9udF9wb3MgPSB0ZWFtLndhbGsoKS5nZXRfYXJvdW5kKGQsIDApXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzX21vdmFibGUoZnJvbnRfcG9zKSkge1xyXG4gICAgICAgICAgICAgICAgLy8g5q2j6Z2i44Gr6Zqc5a6z54mp44GM54Sh44GR44KM44Gw44CB44Gd44Gu5Lih5YG044KC6KaL44GI44KLXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9fY2xlYXJfbWFzayh0ZWFtLndhbGsoKS5nZXRfYXJvdW5kKGQsIC0xKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9fY2xlYXJfbWFzayh0ZWFtLndhbGsoKS5nZXRfYXJvdW5kKGQsICAwKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9fY2xlYXJfbWFzayh0ZWFtLndhbGsoKS5nZXRfYXJvdW5kKGQsICAxKSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyDmraPpnaLjgYzpmpzlrrPnianjgafjgoLjgZ3jga7miYvliY3jgb7jgafopovjgYjjgabjgZ/jgarjgonjgIHjgZ3jga7lo4HjgajkuKHlgbTjga/opovjgYjjgotcclxuICAgICAgICAgICAgICAgIHRoaXMuX19jbGVhcl9tYXNrKHRlYW0ud2FsaygpLmdldF9hcm91bmQoZCwgLTEpKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX19jbGVhcl9tYXNrKHRlYW0ud2FsaygpLmdldF9hcm91bmQoZCwgIDApKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX19jbGVhcl9tYXNrKHRlYW0ud2FsaygpLmdldF9hcm91bmQoZCwgIDEpKTtcclxuICAgICAgICAgICAgICAgIC8vIOato+mdouOBq+manOWus+eJqeOBjOacieOBo+OBn+OCieOBneOBruWlpeOBr+imi+OBiOOBquOBhOOBruOBp+aOoue0oue1guS6hlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgX19jbGVhcl9tYXNrKGNscl9wb3M6IENfUG9pbnQpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXRoaXMuc2l6ZS53aXRoaW4oY2xyX3BvcykpIHJldHVybjtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMubWFza3NbY2xyX3Bvcy56XVtjbHJfcG9zLnldW2Nscl9wb3MueF0pIHtcclxuICAgICAgICAgICAgdGhpcy5tYXNrc1tjbHJfcG9zLnpdW2Nscl9wb3MueV1bY2xyX3Bvcy54XSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnVuY2xlYXJbY2xyX3Bvcy56XS0tOyAgICAgICAgfSAgICBcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaXNfY2xlYXJlZChjbHJfcG9zOiBDX1BvaW50KTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudW5jbGVhcltjbHJfcG9zLnpdIDwgMTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaXNfbWFza2VkKHA6IENfUG9pbnQpOiBib29sZWFuIHtyZXR1cm4gdGhpcy5pc19tYXNrZWRfeHl6KHAueCwgcC55LCBwLnopfVxyXG4gICAgcHVibGljIGlzX21hc2tlZF94eXooeDogbnVtYmVyLCB5OiBudW1iZXIsIHo6IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1hc2tzW3pdW3ldW3hdO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpc19tb3ZhYmxlKHA6IENfUG9pbnQpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAoIXRoaXMuc2l6ZS53aXRoaW4ocCkpIHJldHVybiBmYWxzZTtcclxuICAgICAgICBzd2l0Y2ggKHRoaXMuZ2V0X2tpbmQocCkpIHtcclxuICAgICAgICAgICAgY2FzZSBUX016S2luZC5GbG9vcjpcclxuICAgICAgICAgICAgY2FzZSBUX016S2luZC5VbmV4cDpcclxuICAgICAgICAgICAgY2FzZSBUX016S2luZC5TdHJVcDpcclxuICAgICAgICAgICAgY2FzZSBUX016S2luZC5TdHJEbjpcclxuICAgICAgICAgICAgY2FzZSBUX016S2luZC5TdHJVRDpcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9ICAgIFxyXG5cclxuICAgIHB1YmxpYyBnZXRfeF9tYXgoKTogbnVtYmVyIHtyZXR1cm4gdGhpcy5zaXplLnNpemVfeCgpO31cclxuICAgIHB1YmxpYyBnZXRfeV9tYXgoKTogbnVtYmVyIHtyZXR1cm4gdGhpcy5zaXplLnNpemVfeSgpO31cclxuICAgIHB1YmxpYyBnZXRfel9tYXgoKTogbnVtYmVyIHtyZXR1cm4gdGhpcy5zaXplLnNpemVfeigpO31cclxuICAgIHB1YmxpYyBnZXRfa2luZCAocDogQ19Qb2ludCk6IFRfTXpLaW5kIHtcclxuICAgICAgICBpZiAodGhpcy5zaXplLndpdGhpbihwKSkgcmV0dXJuIHRoaXMuY2VsbHNbcC56XVtwLnldW3AueF0uZ2V0S2luZCgpO1xyXG4gICAgICAgIHJldHVybiBUX016S2luZC5Ob0RlZjtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRfa2luZF94eXogKHg6IG51bWJlciwgeTogbnVtYmVyLCB6OiBudW1iZXIpOiBUX016S2luZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuc2l6ZS53aXRoaW4oeCwgeSwgeikpIHJldHVybiB0aGlzLmNlbGxzW3pdW3ldW3hdLmdldEtpbmQoKTtcclxuICAgICAgICByZXR1cm4gVF9NektpbmQuTm9EZWY7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldF9jZWxsX3h5eiAoeDogbnVtYmVyLCB5OiBudW1iZXIsIHo6IG51bWJlcik6IENfTWF6ZUNlbGx8dW5kZWZpbmVkIHsgXHJcbiAgICAgICAgaWYgKHRoaXMuc2l6ZS53aXRoaW4oeCwgeSwgeikpIHJldHVybiB0aGlzLmNlbGxzW3pdW3ldW3hdO1xyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0X2NlbGwgKHA6IENfUG9pbnQpOiBDX01hemVDZWxsfHVuZGVmaW5lZCB7IFxyXG4gICAgICAgIGlmICh0aGlzLnNpemUud2l0aGluKHApKSByZXR1cm4gdGhpcy5jZWxsc1twLnpdW3AueV1bcC54XTtcclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldF9jZWxsKHA6IENfUG9pbnQsIGs6IFRfTXpLaW5kKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuc2l6ZS53aXRoaW4ocCkpIHtcclxuICAgICAgICAgICAgdGhpcy5jZWxsc1twLnpdW3AueV1bcC54XSA9IENfTWF6ZUNlbGwubmV3T2JqKHtraW5kOiBrLCBwb3M6IHB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0X2NlbGxfeHl6KHg6IG51bWJlciwgeTogbnVtYmVyLCB6OiBudW1iZXIsIGs6IFRfTXpLaW5kKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuc2l6ZS53aXRoaW4oeCwgeSwgeikpIHtcclxuICAgICAgICAgICAgdGhpcy5jZWxsc1t6XVt5XVt4XSA9IENfTWF6ZUNlbGwubmV3T2JqKHtraW5kOiBrLCBwb3M6IHt4OngsIHk6eSwgejp6fX0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBjYW5fbW92ZShwOiBDX1BvaW50KTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2l6ZS53aXRoaW4ocCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgY2FuX1VEKHA6IENfUG9pbnQpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pc19tb3ZhYmxlKHApO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5wdWJsaWMgZmlsbF9jZWxsKGtpbmQ6IFRfTXpLaW5kLCBmbG9vcjpudW1iZXIpOiB2b2lkIHtcclxuICAgIGZvciAobGV0IGggPSAwOyBoIDwgdGhpcy5zaXplLnNpemVfeSgpOyBoKyspXHJcbiAgICBmb3IgKGxldCB3ID0gMDsgdyA8IHRoaXMuc2l6ZS5zaXplX3goKTsgdysrKVxyXG4gICAgICAgIHRoaXMuc2V0X2NlbGxfeHl6KHcsIGgsIGZsb29yLCBraW5kKTtcclxuICAgIHJldHVybjtcclxufVxyXG5cclxucHVibGljIHNldF9ib3goa2luZDogVF9NektpbmQsIHRvcF94Om51bWJlciwgdG9wX3k6IG51bWJlciwgc2l6ZV94OiBudW1iZXIsIHNpemVfeTogbnVtYmVyLCBmbG9vcjogbnVtYmVyKTogdm9pZCB7XHJcbiAgICBpZiAodG9wX3ggKyBzaXplX3ggPiB0aGlzLnNpemUuc2l6ZV94KCkpIHNpemVfeCA9IHRoaXMuc2l6ZS5zaXplX3goKSAtIHRvcF94ICsgMTsgXHJcbiAgICBpZiAodG9wX3kgKyBzaXplX3kgPiB0aGlzLnNpemUuc2l6ZV95KCkpIHNpemVfeSA9IHRoaXMuc2l6ZS5zaXplX3koKSAtIHRvcF95ICsgMTtcclxuICAgIFxyXG4gICAgY29uc3QgdG9wID0gdG9wX3k7XHJcbiAgICBjb25zdCBidG0gPSB0b3AgICAgKyBzaXplX3kgLSAxO1xyXG4gICAgY29uc3QgbGZ0ID0gdG9wX3g7XHJcbiAgICBjb25zdCByZ3QgPSBsZnQgICAgKyBzaXplX3ggLSAxO1xyXG4gICAgXHJcbiAgICAvLyDljJflgbQo5LiKKeOBqOWNl+WBtCjkuIsp44KS55+z5aOB44GrXHJcbiAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHNpemVfeDsgeCsrKSB7XHJcbiAgICAgICAgdGhpcy5zZXRfY2VsbF94eXooeCwgdG9wLCBmbG9vciwga2luZCk7XHJcbiAgICAgICAgdGhpcy5zZXRfY2VsbF94eXooeCwgYnRtLCBmbG9vciwga2luZCk7XHJcbiAgICB9XHJcbiAgICAvLyDmnbHlgbQo5Y+zKeOBqOilv+WBtCjlt6Yp44KS55+z5aOB44GrXHJcbiAgICBmb3IgKGxldCB5ID0gMDsgeSA8IHNpemVfeTsgeSsrKSB7XHJcbiAgICAgICAgdGhpcy5zZXRfY2VsbF94eXoobGZ0LCB5LCBmbG9vciwga2luZCk7XHJcbiAgICAgICAgdGhpcy5zZXRfY2VsbF94eXoocmd0LCB5LCBmbG9vciwga2luZCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm47XHJcbn1cclxuXHJcbi8vIOmajuS4iuOBqOmajuS4i+OBq+majuauteOCkuioree9ruOBmeOCi1xyXG5wdWJsaWMgY3JlYXRlX3N0YWlyKGZsb29yOm51bWJlcik6IENfUG9pbnREaXIge1xyXG4gICAgY29uc3QgSF9zaXplX3ggPSAodGhpcy5zaXplLnNpemVfeCgpIC0gMSkgLyAyO1xyXG4gICAgY29uc3QgSF9zaXplX3kgPSAodGhpcy5zaXplLnNpemVfeSgpIC0gMSkgLyAyO1xyXG4gICAgY29uc3QgcG9zX3ggICAgPSAyICogX2lyYW5kKDAsIEhfc2l6ZV94IC0gMSkgKyAxO1xyXG4gICAgY29uc3QgcG9zX3kgICAgPSAyICogX2lyYW5kKDAsIEhfc2l6ZV95IC0gMSkgKyAxO1xyXG4gICAgY29uc3QgcG9zX2QgICAgPSAxICogX2lyYW5kKDAsIFRfRGlyZWN0aW9uLk1BWCk7XHJcblxyXG4gICAgLy8g5Lmx5pWw44Gn5b6X44Gf5bqn5qiZ44Gr6ZqO5q6144KS572u44GPXHJcbiAgICBpZiAoZmxvb3IgPj0gMSkge1xyXG4gICAgICAgIGlmICh0aGlzLmdldF9jZWxsX3h5eihwb3NfeCwgcG9zX3ksIGZsb29yIC0gMSk/LmdldEtpbmQoKSAhPT0gVF9NektpbmQuU3RyVXApIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRfY2VsbF94eXoocG9zX3gsIHBvc195LCBmbG9vciAtIDEsICBUX016S2luZC5TdHJEbik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRfY2VsbF94eXoocG9zX3gsIHBvc195LCBmbG9vciAtIDEsICBUX016S2luZC5TdHJVRCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuZ2V0X2NlbGxfeHl6KHBvc194LCBwb3NfeSwgZmxvb3IpPy5nZXRLaW5kKCkgIT09IFRfTXpLaW5kLlN0ckRuKSB7XHJcbiAgICAgICAgdGhpcy5zZXRfY2VsbF94eXoocG9zX3gsIHBvc195LCBmbG9vciwgIFRfTXpLaW5kLlN0clVwKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5zZXRfY2VsbF94eXoocG9zX3gsIHBvc195LCBmbG9vciwgIFRfTXpLaW5kLlN0clVEKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmV3IENfUG9pbnREaXIoe3g6IHBvc194LCB5OiBwb3NfeSwgejogZmxvb3IsIGQ6IHBvc19kfSk7XHJcbn1cclxuXHJcbnB1YmxpYyBjcmVhdGVfbWF6ZShmbG9vcjogbnVtYmVyKTogdm9pZCB7XHJcbiAgICBjb25zdCBzaXplX3ggPSB0aGlzLnNpemUuc2l6ZV94KCk7XHJcbiAgICBjb25zdCBzaXplX3kgPSB0aGlzLnNpemUuc2l6ZV95KCk7XHJcblxyXG5cclxuICAgIC8vIOODgOODs+OCuOODp+ODs+OBpyRmbG9vcuOBp+aMh+WumuOBleOCjOOBn+majuOCkuacqui4j+WcsOOBq+OBmeOCiyBcclxuICAgIHRoaXMuZmlsbF9jZWxsKFRfTXpLaW5kLlVuZXhwLCBmbG9vcik7XHJcblxyXG4gICAgLy8g44OA44Oz44K444On44Oz44Gu6Lyq6YOt44KS55+z5aOB44Gr44GZ44KLXHJcbiAgICB0aGlzLnNldF9ib3goVF9NektpbmQuU3RvbmUsIDAsIDAsIHNpemVfeCwgc2l6ZV95LCBmbG9vcik7XHJcblxyXG4gICAgLy8g6YCa6Lev44Gr5LiA44Gk572u44GN44Gr5aOB44GM5oiQ6ZW344GZ44KL44Od44Kk44Oz44OI44KS6Kit5a6a44GZ44KLXHJcbiAgICAvLyDjg53jgqTjg7Pjg4jjgYvjgonlo4HjgpLkvLjjgbDjgZnmlrnlkJHjgpLjg6njg7Pjg4Djg6DjgavmsbrjgoHjgotcclxuICAgIGNvbnN0IHBvaW50cyA9IG5ldyBDX1BvaW50U2V0MkQoKTtcclxuICAgIGZvciAobGV0IGggPSAyOyBoIDwgc2l6ZV95IC0gMjsgaCArPSAyKXtcclxuICAgICAgICBmb3IgKGxldCB3ID0gMjsgdyA8IHNpemVfeCAtIDI7IHcgKz0gMil7XHJcbiAgICAgICAgICAgIGNvbnN0IGRpID0gX2lyYW5kKDAsIFRfRGlyZWN0aW9uLk1BWCk7XHJcbiAgICAgICAgICAgIHBvaW50cy5wdXNoKG5ldyBDX1BvaW50TGluazJEKHcsIGgsIGRpKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIOS5seaVsOOBp+OBhOOBj+OBpOOBi+mDqOWxi+OCkuS9nOOCi1xyXG4gICAgY29uc3Qgcm9vbXNfYXJyYXkgPSBbXTtcclxuICAgIGNvbnN0IG51bV9vZl9yb29tID0gX2lyYW5kKDAsIHRoaXMubnVtX29mX3Jvb20pO1xyXG4gICAgZm9yIChsZXQgY250ID0gMDsgY250IDwgbnVtX29mX3Jvb207IGNudCsrKSB7XHJcbiAgICAgICAgY29uc3QgbGVuZ194ID0gX2lyYW5kKDEsICB0aGlzLm1heF9zaXplX29mX3Jvb20pICogMiArIDE7XHJcbiAgICAgICAgY29uc3QgbGVuZ195ID0gX2lyYW5kKDEsICB0aGlzLm1heF9zaXplX29mX3Jvb20pICogMiArIDE7XHJcbiAgICAgICAgY29uc3Qgcm9vbV94ID0gX2lyYW5kKDAsIChzaXplX3ggLSBsZW5nX3gpIC8gMikgKiAyO1xyXG4gICAgICAgIGNvbnN0IHJvb21feSA9IF9pcmFuZCgwLCAoc2l6ZV95IC0gbGVuZ195KSAvIDIpICogMjtcclxuICAgICAgICByb29tc19hcnJheS5wdXNoKHt0eDogcm9vbV94LCB0eTogcm9vbV95LCBzeDogbGVuZ194LCBzeTogbGVuZ195fSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g6YOo5bGL44Gu5Lit44Gu44Od44Kk44Oz44OI44KS5YmK6Zmk44GZ44KLXHJcbiAgICBmb3IgKGNvbnN0IHJvb20gb2Ygcm9vbXNfYXJyYXkpIHtcclxuICAgICAgICBmb3IgKGxldCBpaSA9IDA7IGlpIDwgcG9pbnRzLnNldC5sZW5ndGg7IGlpKyspIHtcclxuICAgICAgICAgICAgY29uc3QgcCA9ICBwb2ludHMuc2V0W2lpXTtcclxuICAgICAgICAgICAgaWYgKHAgPT09IHVuZGVmaW5lZCkgY29udGludWU7XHJcblxyXG4gICAgICAgICAgICBpZiAoICAgIChwLnggPj0gcm9vbS50eCkgXHJcbiAgICAgICAgICAgICAgICAmJiAgKHAueCA8PSByb29tLnR4ICsgcm9vbS5zeClcclxuICAgICAgICAgICAgICAgICYmICAocC55ID49IHJvb20udHkpXHJcbiAgICAgICAgICAgICAgICAmJiAgKHAueSA8PSByb29tLnR5ICsgcm9vbS5zeSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBwb2ludHMucmVtb3ZlKHApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8g44Od44Kk44Oz44OI44GL44KJ5aOB44KS5oiQ6ZW344GV44Gb44Gm6L+36Lev44KS5L2c44KLXHJcbiAgICBmb3IgKGNvbnN0IHAgb2YgcG9pbnRzLnNldCkge1xyXG4gICAgICAgIGlmIChwID09PSB1bmRlZmluZWQpIGNvbnRpbnVlO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIOODneOCpOODs+ODiOOBruS9jee9ruOBq+efs+WjgeOCkue9ruOBj1xyXG4gICAgICAgIHRoaXMuc2V0X2NlbGxfeHl6KHAueCwgcC55LCBmbG9vciwgVF9NektpbmQuU3RvbmUpO1xyXG5cclxuICAgICAgICAvLyDmn7Hjga7mnbHopb/ljZfljJfjga7jgYTjgZrjgozjgYvjgavjgoLnn7Plo4HjgpLnva7jgY9cclxuICAgICAgICBjb25zdCBkaXJlY3Rpb24gPSBbMCwgMCwgMCwgMF07XHJcbiAgICAgICAgY29uc3QgZGkgPSBDX1BvaW50TGluazJELmNhc3QocCk/LmRpID8/IFRfRGlyZWN0aW9uLlg7XHJcbiAgICAgICAgaWYgKGRpID09PSBUX0RpcmVjdGlvbi5YKSBjb250aW51ZTtcclxuICAgICAgICBkaXJlY3Rpb25bZGldID0gMTtcclxuXHJcbiAgICAgICAgdGhpcy5zZXRfY2VsbF94eXooXHJcbiAgICAgICAgICAgIHAueCAtIGRpcmVjdGlvbltUX0RpcmVjdGlvbi5XXSArIGRpcmVjdGlvbltUX0RpcmVjdGlvbi5FXSwgXHJcbiAgICAgICAgICAgIHAueSAtIGRpcmVjdGlvbltUX0RpcmVjdGlvbi5OXSArIGRpcmVjdGlvbltUX0RpcmVjdGlvbi5TXSwgXHJcbiAgICAgICAgICAgIGZsb29yLFxyXG4gICAgICAgICAgICBUX016S2luZC5TdG9uZVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLy8g6ZaJ6Y6W56m66ZaT44GM5Ye65p2l44Gm44GE44Gf44KJ5Ye65Y+j44KS5L2c44KLXHJcbiAgICAvLyDjg53jgqTjg7Pjg4jjgpLjg4jjg6zjg7zjgrnjgZfjgabjgIHml6Llh7rjga7jg53jgqTjg7Pjg4jjgavnuYvjgYzjgaPjgabjgYTjgZ/jgonplonpjpbnqbrplpNcclxuICAgIGZvciAoY29uc3Qgc2V0IG9mIHBvaW50cy5zZXQpIHtcclxuICAgICAgICBpZiAoc2V0ID09PSB1bmRlZmluZWQpIGNvbnRpbnVlO1xyXG5cclxuICAgICAgICBjb25zdCBbeW4sIHRyYWNlX3NldF0gPSB0aGlzLmNoZWNrX2Nsb3NlKHNldC54LCBzZXQueSwgcG9pbnRzLCBuZXcgQ19Qb2ludFNldDJEKCkpO1xyXG4gICAgICAgIGlmICh5bikge1xyXG4gICAgICAgICAgICB0aGlzLm9wZW5fZXhpdCh0cmFjZV9zZXQsIFRfTXpLaW5kLlVuZXhwLCBmbG9vcik7XHJcbiAgICAgICAgICAgIGlmICh0cmFjZV9zZXQgIT09IHVuZGVmaW5lZCkgZm9yIChjb25zdCB0IG9mIHRyYWNlX3NldC5zZXQpIHBvaW50cy5yZW1vdmUodCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuO1xyXG59XHJcblxyXG5wcm90ZWN0ZWQgY2hlY2tfY2xvc2UoeDogbnVtYmVyLCB5OiBudW1iZXIsIHBvaW50X3NldDogQ19Qb2ludFNldDJELCB0cmFjZV9zZXQ6IENfUG9pbnRTZXQyRHx1bmRlZmluZWQpOiBbYm9vbGVhbiwgQ19Qb2ludFNldDJEfHVuZGVmaW5lZF0ge1xyXG4gICAgaWYgKHggPCAyIHx8IHkgPCAyIHx8IHggPiB0aGlzLnNpemUuc2l6ZV94KCkgLSAyIHx8IHkgPiB0aGlzLnNpemUuc2l6ZV95KCkgLSAyKSByZXR1cm4gW2ZhbHNlLCB1bmRlZmluZWRdO1xyXG5cclxuICAgIGlmIChwb2ludF9zZXQgPT09IHVuZGVmaW5lZCkgcmV0dXJuIFtmYWxzZSwgdW5kZWZpbmVkXTtcclxuICAgIGlmIChwb2ludF9zZXQ/LmlzX2V4aXN0KHgsIHkpID09PSBmYWxzZSkgcmV0dXJuIFtmYWxzZSwgdW5kZWZpbmVkXTtcclxuXHJcbiAgICBpZiAodHJhY2Vfc2V0ICE9PSB1bmRlZmluZWQgJiYgdHJhY2Vfc2V0Py5pc19leGlzdCh4LCB5KSA9PT0gdHJ1ZSkgIHJldHVybiBbdHJ1ZSwgIHRyYWNlX3NldF07XHJcblxyXG4gICAgY29uc3QgcCA9IHBvaW50X3NldC5nZXRfcG9pbnQoeCwgeSk7XHJcbiAgICB0cmFjZV9zZXQgPz89IG5ldyBDX1BvaW50U2V0MkQoKTtcclxuICAgIHRyYWNlX3NldD8ucHVzaChuZXcgQ19Qb2ludExpbmsyRCh4LCB5LCBDX1BvaW50TGluazJELmNhc3QocCk/LmRpKSk7XHJcblxyXG4gICAgbGV0IG5leHRfeDogbnVtYmVyID0gMCwgbmV4dF95OiBudW1iZXIgPSAwO1xyXG4gICAgc3dpdGNoIChDX1BvaW50TGluazJELmNhc3QocCk/LmRpKSB7XHJcbiAgICAgICAgY2FzZSBUX0RpcmVjdGlvbi5OOiAgLy8g5YyXXHJcbiAgICAgICAgICAgIG5leHRfeCA9IHg7XHJcbiAgICAgICAgICAgIG5leHRfeSA9IHkgLSAyO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFRfRGlyZWN0aW9uLkU6ICAvLyDmnbFcclxuICAgICAgICAgICAgbmV4dF94ID0geCArIDI7XHJcbiAgICAgICAgICAgIG5leHRfeSA9IHk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgVF9EaXJlY3Rpb24uUzogIC8vIOWNl1xyXG4gICAgICAgICAgICBuZXh0X3ggPSB4O1xyXG4gICAgICAgICAgICBuZXh0X3kgPSB5ICsgMjtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBUX0RpcmVjdGlvbi5XOiAgLy8g6KW/XHJcbiAgICAgICAgICAgIG5leHRfeCA9IHggLSAyO1xyXG4gICAgICAgICAgICBuZXh0X3kgPSB5O1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hlY2tfY2xvc2UobmV4dF94LCBuZXh0X3ksIHBvaW50X3NldCwgdHJhY2Vfc2V0KTtcclxufVxyXG5cclxucHJvdGVjdGVkIG9wZW5fZXhpdChwOiBDX1BvaW50U2V0MkR8dW5kZWZpbmVkLCBraW5kOiBUX016S2luZCwgZmxvb3I6IG51bWJlcik6IHZvaWQge1xyXG4gICAgaWYgKHAgPT09IHVuZGVmaW5lZCkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IGNudCA9IF9pcmFuZCgwLCBwLnNldC5sZW5ndGggLSAxKTtcclxuICAgIGNvbnN0IHBwICA9ICBwLnNldFtjbnRdO1xyXG5cclxuICAgIGxldCBkaXJlY3Rpb24gPSBbMCwgMCwgMCwgMF07XHJcbiAgICBjb25zdCBkaSA9IENfUG9pbnRMaW5rMkQuY2FzdChwcCk/LmRpID8/IFRfRGlyZWN0aW9uLk5cclxuICAgIGRpcmVjdGlvbltkaV0gPSAxO1xyXG5cclxuICAgIHRoaXMuc2V0X2NlbGxfeHl6KFxyXG4gICAgICAgIHBwLnggLSBkaXJlY3Rpb25bVF9EaXJlY3Rpb24uV10gKyBkaXJlY3Rpb25bVF9EaXJlY3Rpb24uRV0sIFxyXG4gICAgICAgIHBwLnkgLSBkaXJlY3Rpb25bVF9EaXJlY3Rpb24uTl0gKyBkaXJlY3Rpb25bVF9EaXJlY3Rpb24uU10sIFxyXG4gICAgICAgIGZsb29yLFxyXG4gICAgICAgIGtpbmQgXHJcbiAgICApO1xyXG4gICAgcmV0dXJuO1xyXG59XHJcblxyXG4vKlxyXG5wdWJsaWMgc3RhdGljIGZyb21fb2JqX3RvX3N0cmluZyhvYTogQ19NYXplKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShvYSwgbnVsbCwgXCJcXHRcIik7XHJcbn1cclxucHVibGljIHN0YXRpYyBmcm9tX29iakFycmF5X3RvX3N0cmluZyhvYWE6IHtbdWlkOiBzdHJpbmddOiBDX01hemV9KTogc3RyaW5nIHtcclxuICAgIGNvbnN0IG9hID0gW10gYXMgQ19NYXplW107XHJcbiAgICBmb3IgKGNvbnN0IGlpIGluIG9hYSkgb2EucHVzaChvYWFbaWldKTtcclxuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShvYSwgbnVsbCwgXCJcXHRcIik7XHJcbn1cclxucHVibGljIHN0YXRpYyBmcm9tX3N0cmluZ190b19vYmoodHh0OiBzdHJpbmcpOiBDX01hemUge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBqICAgPSBKU09OLnBhcnNlKHR4dCkgYXMgSlNPTl9NYXplW107XHJcbiAgICAgICAgcmV0dXJuIG5ldyBDX01hemUoKS5kZWNvZGUoaik7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICByZXR1cm4gbmV3IENfTWF6ZSgpO1xyXG4gICAgfTtcclxufVxyXG5wdWJsaWMgc3RhdGljIGZyb21fc3RyaW5nX3RvX29iakFycmF5KHR4dDogc3RyaW5nKToge1t1aWQ6IHN0cmluZ106IENfTWF6ZX0ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBqICAgPSBKU09OLnBhcnNlKHR4dCkgYXMgSlNPTl9NYXplW107XHJcbiAgICAgICAgY29uc3QgbXBhID0ge30gYXMge1tpZDogc3RyaW5nXTogQ19NYXplfTtcclxuICAgICAgICBmb3IgKGNvbnN0IGpqIG9mIGopIHtcclxuICAgICAgICAgICAgY29uc3QgYWFhID0gbmV3IENfTWF6ZSgpLmRlY29kZShqaik7XHJcbiAgICAgICAgICAgIG1wYVthYWEudWlkKCldID0gYWFhO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbXBhO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgcmV0dXJuIHt9O1xyXG4gICAgfTtcclxufVxyXG4qL1xyXG5cclxuICAgIHB1YmxpYyB0b19sZXR0ZXIocDogQ19Qb2ludCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY2VsbHNbcC56XVtwLnldW3AueF0udG9fbGV0dGVyKCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgdG9fc3RyaW5nKGZsb29yOiBudW1iZXIgPSAwLCBkZWJ1Z19tb2RlOiBib29sZWFuID0gZmFsc2UpOiBzdHJpbmcge1xyXG4gICAgICAgIGNvbnN0IHNpemVfeCA9IHRoaXMuc2l6ZS5zaXplX3goKTtcclxuICAgICAgICBjb25zdCBzaXplX3kgPSB0aGlzLnNpemUuc2l6ZV95KCk7XHJcblxyXG4gICAgICAgIHZhciByZXRfc3RyOiBzdHJpbmcgPSAnJztcclxuICAgICAgICBmb3IgKHZhciB5ID0gMDsgeSA8IHNpemVfeTsgeSsrKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIHggPSAwOyB4IDwgc2l6ZV94OyB4KyspIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG9iaiA9IHRoaXMuZ2V0X29ial94eXooeCwgeSwgZmxvb3IpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFkZWJ1Z19tb2RlICYmIHRoaXMubWFza3NbZmxvb3JdW3ldW3hdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0X3N0ciArPSAn77y4JztcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb2JqX2MgPSBvYmo/LnZpZXcoKT8ubGV0dGVyKCkgPz8gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAob2JqID09PSBudWxsIHx8IG9ial9jID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldF9zdHIgKz0gdGhpcy5jZWxsc1tmbG9vcl1beV1beF0udG9fbGV0dGVyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0X3N0ciArPSBvYmpfYztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0X3N0ciArPSBcIlxcblwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmV0X3N0cjtcclxuICAgIH1cclxuICAgIHB1YmxpYyBlbmNvZGUoKTogSlNPTl9NYXplIHtcclxuICAgICAgICBjb25zdCBzaXplX3ggPSB0aGlzLnNpemUuc2l6ZV94KCk7XHJcbiAgICAgICAgY29uc3Qgc2l6ZV95ID0gdGhpcy5zaXplLnNpemVfeSgpO1xyXG4gICAgICAgIGNvbnN0IHNpemVfeiA9IHRoaXMuc2l6ZS5zaXplX3ooKTtcclxuXHJcbiAgICAgICAgdmFyIHpfYXJyYXk6IHN0cmluZ1tdID0gW107XHJcbiAgICAgICAgZm9yICh2YXIgeiA9IDA7IHogPCBzaXplX3o7IHorKykge1xyXG4gICAgICAgICAgICB2YXIgeV9hcnJheTogc3RyaW5nW10gPSBbXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgeSA9IDA7IHkgPCBzaXplX3k7IHkrKykge1xyXG4gICAgICAgICAgICAgICAgdmFyIHhfYXJyYXk6IHN0cmluZ1tdID0gW107XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciB4ID0gMDsgeCA8IHNpemVfeDsgeCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeF9hcnJheS5wdXNoKHRoaXMuY2VsbHNbel1beV1beF0uZW5jb2RlKCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgeV9hcnJheS5wdXNoKHhfYXJyYXkuam9pbignWCcpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB6X2FycmF5LnB1c2goeV9hcnJheS5qb2luKCdZJykpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBtYXplX3N0ciA9IHpfYXJyYXkuam9pbignWicpO1xyXG5cclxuICAgICAgICB2YXIgel9hcnJheTogc3RyaW5nW10gPSBbXTtcclxuICAgICAgICBmb3IgKHZhciB6ID0gMDsgeiA8IHNpemVfejsgeisrKSB7XHJcbiAgICAgICAgICAgIHZhciB5X2FycmF5OiBzdHJpbmdbXSA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKHZhciB5ID0gMDsgeSA8IHNpemVfeTsgeSsrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgeF9hcnJheTogc3RyaW5nW10gPSBbXTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIHggPSAwOyB4IDwgc2l6ZV94OyB4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICB4X2FycmF5LnB1c2godGhpcy5tYXNrc1t6XVt5XVt4XSA/ICcxJyA6ICcwJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB5X2FycmF5LnB1c2goeF9hcnJheS5qb2luKCdYJykpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHpfYXJyYXkucHVzaCh5X2FycmF5LmpvaW4oJ1knKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IG1hc2tfc3RyID0gel9hcnJheS5qb2luKCdaJyk7XHJcblxyXG4gICAgICAgIGxldCBvYmpzID0gW107XHJcbiAgICAgICAgZm9yIChjb25zdCBpaSBpbiB0aGlzLm9ianMpIG9ianMucHVzaCh0aGlzLm9ianNbaWldLmVuY29kZSgpKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgaWQ6ICAgICAgdGhpcy5tYXplX2lkLFxyXG4gICAgICAgICAgICB1bmlxX2lkOiB0aGlzLnVuaXFfaWQsXHJcbiAgICAgICAgICAgIHNhdmVfaWQ6IHRoaXMuc2F2ZV9pZCxcclxuICAgICAgICAgICAgZmxvb3I6ICAgdGhpcy5mbG9vcixcclxuICAgICAgICAgICAgbmFtZTogICAgdGhpcy5uYW1lLFxyXG4gICAgICAgICAgICBvYmpzOiAgICBvYmpzLFxyXG4gICAgICAgICAgICBzaXplX3g6ICB0aGlzLnNpemUuc2l6ZV94KCksXHJcbiAgICAgICAgICAgIHNpemVfeTogIHRoaXMuc2l6ZS5zaXplX3koKSxcclxuICAgICAgICAgICAgc2l6ZV96OiAgdGhpcy5zaXplLnNpemVfeigpLFxyXG4gICAgICAgICAgICBtYXplOiAgICBtYXplX3N0cixcclxuICAgICAgICAgICAgbWFzazogICAgbWFza19zdHIsXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIGRlY29kZShhOiBKU09OX01hemV8dW5kZWZpbmVkKTogQ19NYXplIHtcclxuICAgICAgICBpZiAoYSA9PT0gdW5kZWZpbmVkKSByZXR1cm4gdGhpcztcclxuXHJcbiAgICAgICAgaWYgKGEuaWQgICAgICAhPT0gdW5kZWZpbmVkKSB0aGlzLm1hemVfaWQgPSBhLmlkO1xyXG4gICAgICAgIGlmIChhLnVuaXFfaWQgIT09IHVuZGVmaW5lZCkgdGhpcy51bmlxX2lkID0gYS51bmlxX2lkO1xyXG4gICAgICAgIGlmIChhLnNhdmVfaWQgIT09IHVuZGVmaW5lZCkgdGhpcy5zYXZlX2lkID0gYS5zYXZlX2lkO1xyXG4gICAgICAgIGlmIChhLmZsb29yICAgIT09IHVuZGVmaW5lZCkgdGhpcy5mbG9vciAgID0gYS5mbG9vcjtcclxuICAgICAgICBpZiAoYS5uYW1lICAgICE9PSB1bmRlZmluZWQpIHRoaXMubmFtZSAgICA9IGEubmFtZTtcclxuXHJcbiAgICAgICAgaWYgKGEub2JqcyAgICAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMub2JqcyA9IHt9O1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGpzb25fb2JqIG9mIGEub2Jqcykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbmV3X29iaiA9IENfTWF6ZU9iai5uZXdPYmooanNvbl9vYmopO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vYmpzW25ld19vYmoudWlkKCldID0gbmV3X29iajtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGEuc2l6ZV94ICE9PSB1bmRlZmluZWQgJiYgYS5zaXplX3kgIT09IHVuZGVmaW5lZCAmJiBhLnNpemVfeiAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2l6ZSAgPSBuZXcgQ19SYW5nZShcclxuICAgICAgICAgICAgICAgIG5ldyBDX1BvaW50KDAsIDAsIDApLCBcclxuICAgICAgICAgICAgICAgIG5ldyBDX1BvaW50KGEuc2l6ZV94IC0gMSwgYS5zaXplX3kgLSAxLCBhLnNpemVfeiAtIDEpXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB0aGlzLmNlbGxzICAgPSB0aGlzLl9faW5pdF9tYXplKFRfTXpLaW5kLlN0b25lKTtcclxuICAgICAgICAgICAgdGhpcy5tYXNrcyAgID0gdGhpcy5fX2luaXRfbWFzayh0cnVlKTtcclxuICAgICAgICAgICAgdGhpcy5fX2luaXRfdW5jbGVhcigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgc2l6ZV94ID0gdGhpcy5zaXplLnNpemVfeCgpO1xyXG4gICAgICAgIGNvbnN0IHNpemVfeSA9IHRoaXMuc2l6ZS5zaXplX3koKTtcclxuICAgICAgICBjb25zdCBzaXplX3ogPSB0aGlzLnNpemUuc2l6ZV96KCk7XHJcblxyXG5cclxuICAgICAgICBpZiAoYS5tYXplICE9PSB1bmRlZmluZWQpIHtcclxuLypcclxuICAgICAgICAgICAgZm9yICh2YXIgeiA9IDA7IHogPCBzaXplX3o7IHorKylcclxuICAgICAgICAgICAgZm9yICh2YXIgeSA9IDA7IHkgPCBzaXplX3k7IHkrKylcclxuICAgICAgICAgICAgZm9yICh2YXIgeCA9IDA7IHggPCBzaXplX3g7IHgrKykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jZWxsc1t6XVt5XVt4XS5zZXQoVF9NektpbmQuU3RvbmUpO1xyXG4gICAgICAgICAgICB9XHJcbiovXHJcbiAgICAgICAgICAgIGNvbnN0IHpfYXJyYXk6IHN0cmluZ1tdID0gYS5tYXplLnNwbGl0KCdaJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IHpfbWF4ID0gX21pbihbc2l6ZV96LCB6X2FycmF5Lmxlbmd0aF0pO1xyXG4gICAgICAgICAgICBmb3IgKHZhciB6ID0gMDsgeiA8IHpfbWF4OyB6KyspIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHlfYXJyYXk6IHN0cmluZ1tdID0gel9hcnJheVt6XS5zcGxpdCgnWScpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgeV9tYXggPSAgX21pbihbc2l6ZV95LCB5X2FycmF5Lmxlbmd0aF0pOyBcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIHkgPSAwOyB5IDwgeV9tYXg7IHkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHhfYXJyYXk6IHN0cmluZ1tdID0geV9hcnJheVt5XS5zcGxpdCgnWCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHhfbWF4ID0gIF9taW4oW3NpemVfeCwgeF9hcnJheS5sZW5ndGhdKTsgXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgeCA9IDA7IHggPCB4X21heDsgeCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBraW5kID0gcGFyc2VJbnQoeF9hcnJheVt4XSwgMTYpOyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jZWxsc1t6XVt5XVt4XSA9IENfTWF6ZUNlbGwubmV3T2JqKHtraW5kOiBraW5kLCBwb3M6IHt4OngsIHk6eSwgejp6fX0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChhLm1hc2sgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9faW5pdF9tYXNrKHRydWUpO1xyXG4gICAgICAgICAgICBjb25zdCB6X2FycmF5OiBzdHJpbmdbXSA9IGEubWFzay5zcGxpdCgnWicpO1xyXG4gICAgICAgICAgICBjb25zdCB6X21heCA9IF9taW4oW3NpemVfeiwgel9hcnJheS5sZW5ndGhdKTtcclxuICAgICAgICAgICAgZm9yICh2YXIgeiA9IDA7IHogPCB6X21heDsgeisrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB5X2FycmF5OiBzdHJpbmdbXSA9IHpfYXJyYXlbel0uc3BsaXQoJ1knKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHlfbWF4ID0gIF9taW4oW3NpemVfeSwgeV9hcnJheS5sZW5ndGhdKTsgXHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciB5ID0gMDsgeSA8IHlfbWF4OyB5KyspIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB4X2FycmF5OiBzdHJpbmdbXSA9IHlfYXJyYXlbeV0uc3BsaXQoJ1gnKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB4X21heCA9ICBfbWluKFtzaXplX3gsIHhfYXJyYXkubGVuZ3RoXSk7IFxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHggPSAwOyB4IDwgeF9tYXg7IHgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoeF9hcnJheVt4XSAhPT0gJzAnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1hc2tzW3pdW3ldW3hdID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFza3Nbel1beV1beF0gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9faW5pdF91bmNsZWFyKCk7ICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHN0YXRpYyBlbmNvZGVfYWxsKGFsbF9tYXplOiBDX01hemVbXSk6IEpTT05fTWF6ZVtdIHtcclxuICAgICAgICBjb25zdCBhbGxfbWF6ZV9kYXRhOiBKU09OX01hemVbXSA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IG1hemUgb2YgYWxsX21hemUpIHtcclxuICAgICAgICAgICAgYWxsX21hemVfZGF0YS5wdXNoKG1hemUuZW5jb2RlKCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYWxsX21hemVfZGF0YTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzdGF0aWMgZGVjb2RlX2FsbChhbGxfbWF6ZV9kYXRhOiBKU09OX01hemVbXSk6IENfTWF6ZVtdIHtcclxuICAgICAgICBjb25zdCBhbGxfbWF6ZTogQ19NYXplW10gPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBtYXplX2RhdGEgb2YgYWxsX21hemVfZGF0YSkge1xyXG4gICAgICAgICAgICBhbGxfbWF6ZS5wdXNoKChuZXcgQ19NYXplKHt9KSkuZGVjb2RlKG1hemVfZGF0YSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYWxsX21hemU7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBhbGVydCgpOiB2b2lkIHtcclxuICAgICAgICBhbGVydChcIk1hemUgSW5mbzpcIlxyXG4gICAgICAgICAgICArIFwiXFxubWF6ZSBpZCA6XCIgKyAodGhpcy5tYXplX2lkID8/ICc/JylcclxuICAgICAgICAgICAgKyBcIlxcbmZsb29yOiBcIiAgICsgKHRoaXMuZmxvb3IgICA/PyAnPycpXHJcbiAgICAgICAgICAgICsgXCJcXG51bmlxIGlkIDpcIiArICh0aGlzLnVuaXFfaWQgPz8gJz8nKVxyXG4gICAgICAgICAgICArIFwiXFxuc2F2ZSBpZCA6XCIgKyAodGhpcy5zYXZlX2lkID8/ICc/JylcclxuICAgICAgICAgICAgKyBcIlxcbm5hbWU6ICAgXCIgICsgKHRoaXMubmFtZSAgICA/PyAnPycpXHJcbiAgICAgICAgICAgICsgXCJcXG5zaXplX3g6IFwiICArICh0aGlzLnNpemUuc2l6ZV94KCkgPz8gJz8nKVxyXG4gICAgICAgICAgICArIFwiXFxuc2l6ZV95OiBcIiAgKyAodGhpcy5zaXplLnNpemVfeSgpID8/ICc/JylcclxuICAgICAgICAgICAgKyBcIlxcbnNpemVfejogXCIgICsgKHRoaXMuc2l6ZS5zaXplX3ooKSA/PyAnPycpXHJcbiAgICAgICAgICAgICsgXCJcXG5cIlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgYWxlcnRfbWF6ZShmbG9vcjogbnVtYmVyID0gMCk6IHZvaWQge1xyXG4gICAgICAgIGFsZXJ0KFwiTWF6ZSBNYXA6XCJcclxuICAgICAgICAgICAgKyBcIm1hemU6XFxuXCIgICAgICsgKHRoaXMudG9fc3RyaW5nKGZsb29yLCB0cnVlKSAgPz8gJz8nKVxyXG4gICAgICAgICAgICArIFwiXFxuXCJcclxuICAgICAgICApO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGFsZXJ0X21hc2soZmxvb3I6IG51bWJlciA9IDApOiB2b2lkIHtcclxuICAgICAgICBhbGVydChcIk1hc2sgTWFwOlwiXHJcbiAgICAgICAgICAgICsgXCJtYXNrOlxcblwiICAgICArICh0aGlzLnRvX3N0cmluZyhmbG9vciwgZmFsc2UpID8/ICc/JylcclxuICAgICAgICAgICAgKyBcIlxcblwiXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuXHJcbmltcG9ydCB7IF9nZXRfdXVpZCB9IGZyb20gXCIuLi9kX3V0bC9GX1JhbmRcIjtcclxuaW1wb3J0IHsgVF9NektpbmQgfSAgZnJvbSBcIi4vVF9NektpbmRcIjtcclxuaW1wb3J0IHsgSlNPTl9BbnkgfSAgZnJvbSBcIi4vQ19TYXZlSW5mb1wiO1xyXG5pbXBvcnQgeyBDX01hemVPYmosIElfTWF6ZU9iaiwgSlNPTl9NYXplT2JqIH0gZnJvbSBcIi4vQ19NYXplT2JqXCI7XHJcbmltcG9ydCB7IFRfV2FsbCB9ICAgIGZyb20gJy4vQ19XYWxsJztcclxuXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEpTT05fTWF6ZUNlbGwgZXh0ZW5kcyBKU09OX0FueSB7XHJcbiAgICBraW5kPzogVF9NektpbmRcclxuICAgIG9iaj86ICBKU09OX01hemVPYmosXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBDX01hemVDZWxsICB7XHJcbiAgICBwcm90ZWN0ZWQga2luZDogICBUX016S2luZDtcclxuICAgIHByb3RlY3RlZCBteV9vYmo6IElfTWF6ZU9iajtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIG5ld09iaihqOiBKU09OX01hemVDZWxsKTogQ19NYXplQ2VsbCB7XHJcbiAgICAgICAgc3dpdGNoIChqLmtpbmQpIHtcclxuICAgICAgICAgICAgY2FzZSBUX016S2luZC5Ob0RlZjogcmV0dXJuIG5ldyBDX01hemVDZWxsTm9EZWYoaik7IFxyXG4gICAgICAgICAgICBjYXNlIFRfTXpLaW5kLlVua3duOiByZXR1cm4gbmV3IENfTWF6ZUNlbGxVbmt3bihqKTsgXHJcbiAgICAgICAgICAgIGNhc2UgVF9NektpbmQuRW1wdHk6IHJldHVybiBuZXcgQ19NYXplQ2VsbEVtcHR5KGopOyBcclxuICAgICAgICAgICAgY2FzZSBUX016S2luZC5GbG9vcjogcmV0dXJuIG5ldyBDX01hemVDZWxsRmxvb3Ioaik7XHJcbiAgICAgICAgICAgIGNhc2UgVF9NektpbmQuVW5leHA6IHJldHVybiBuZXcgQ19NYXplQ2VsbFVuZXhwKGopO1xyXG4gICAgICAgICAgICBjYXNlIFRfTXpLaW5kLlN0b25lOiByZXR1cm4gbmV3IENfTWF6ZUNlbGxTdG9uZShqKTtcclxuICAgICAgICAgICAgY2FzZSBUX016S2luZC5TdHJVcDogcmV0dXJuIG5ldyBDX01hemVDZWxsU3RyVXAoaik7XHJcbiAgICAgICAgICAgIGNhc2UgVF9NektpbmQuU3RyRG46IHJldHVybiBuZXcgQ19NYXplQ2VsbFN0ckRuKGopOyBcclxuICAgICAgICAgICAgY2FzZSBUX016S2luZC5TdHJVRDogcmV0dXJuIG5ldyBDX01hemVDZWxsU3RyVUQoaik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXcgQ19NYXplQ2VsbE5vRGVmKGopO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBjb25zdHJ1Y3RvcihqOiBKU09OX01hemVDZWxsKSB7XHJcbiAgICAgICAgai5vYmogPz89IHt9O1xyXG4gICAgICAgIGoub2JqLmNsbmFtZSA/Pz0gdGhpcy5jb25zdHJ1Y3Rvci5uYW1lO1xyXG5cclxuICAgICAgICB0aGlzLmtpbmQgICA9IGoua2luZCA/PyBUX016S2luZC5Ob0RlZjtcclxuICAgICAgICB0aGlzLm15X29iaiA9IENfTWF6ZU9iai5uZXdPYmooai5vYmopO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldE9iaigpOiAgSV9NYXplT2JqIHtyZXR1cm4gdGhpcy5teV9vYmp9XHJcbiAgICBwdWJsaWMgZ2V0S2luZCgpOiBUX016S2luZCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMua2luZDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdG9fbGV0dGVyKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubXlfb2JqLnZpZXcoKT8ubGV0dGVyKCkgPz8gJ++8uCc7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc3RhdGljIGZyb21fbGV0dGVyKGxldHRlcjogc3RyaW5nKTogbnVtYmVyIHtcclxuICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhUX016S2luZCkpIHtcclxuICAgICAgICAgICAgaWYgKGxldHRlciA9PT0ga2V5KSByZXR1cm4gVF9NektpbmRba2V5XTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFRfTXpLaW5kLk5vRGVmO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkcm93M0QoZnJvdDogVF9XYWxsLCBiYWNrOiBUX1dhbGwpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm15X29iai52aWV3KCk/LmRyb3czRChmcm90LCBiYWNrKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZW5jb2RlKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMua2luZC50b1N0cmluZygxNikucGFkU3RhcnQoMixcIjBcIik7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc3RhdGljIGRlY29kZShzdHI6IHN0cmluZywgaj86IEpTT05fTWF6ZUNlbGwpOiBDX01hemVDZWxsfHVuZGVmaW5lZCB7XHJcbiAgICAgICAgIGNvbnN0IGtpbmQgPSBwYXJzZUludChzdHIsIDE2KSBhcyBUX016S2luZDtcclxuICAgICAgICAgcmV0dXJuIENfTWF6ZUNlbGwubmV3T2JqKHtraW5kOiBraW5kLCBwb3M6IGo/LnBvc30pO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBDX01hemVDZWxsTm9EZWYgZXh0ZW5kcyBDX01hemVDZWxsIHtcclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihqPzogSlNPTl9NYXplQ2VsbHx1bmRlZmluZWQpIHtcclxuICAgICAgICBqID8/PSB7a2luZDogVF9NektpbmQuTm9EZWZ9O1xyXG4gICAgICAgIGoub2JqID8/PSB7fTtcclxuXHJcbiAgICAgICAgai5vYmouY2FuX3RociA9ICcwJztcclxuICAgICAgICBqLm9iai5wb3MgICAgID0ge3g6ai54LCB5OmoueSwgejpqLnp9O1xyXG4gICAgICAgIGoub2JqLnZpZXcgICAgPSAge1xyXG4gICAgICAgICAgICBsYXllcjogMCwgbGV0dGVyOiAn55aRJywgXHJcbiAgICAgICAgICAgIHNob3czRDogICcwJyxcclxuICAgICAgICAgICAgcGFkX3Q6IDAuMCwgcGFkX2Q6IDAuMCwgcGFkX3M6IDAuMCxcclxuICAgICAgICAgICAgY29sX2Y6ICcnLCBjb2xfYjogJycsIGNvbF9zOiAnJywgY29sX3Q6ICcnLCBjb2xfZDogJycsIFxyXG4gICAgICAgICAgICBjb2xfbDogJycsIFxyXG4gICAgICAgIH1cclxuICAgICAgICBzdXBlcihqKTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgQ19NYXplQ2VsbFVua3duIGV4dGVuZHMgQ19NYXplQ2VsbCB7XHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3Ioaj86IEpTT05fTWF6ZUNlbGx8dW5kZWZpbmVkKSB7XHJcbiAgICAgICAgaiA/Pz0ge2tpbmQ6IFRfTXpLaW5kLlVua3dufTtcclxuICAgICAgICBqLm9iaiA/Pz0ge307XHJcblxyXG4gICAgICAgIGoub2JqLmNhbl90aHIgPSAnMCc7XHJcbiAgICAgICAgai5vYmoucG9zICAgICA9IHt4OmoueCwgeTpqLnksIHo6ai56fTtcclxuICAgICAgICBqLm9iai52aWV3ICAgID0gIHtcclxuICAgICAgICAgICAgbGF5ZXI6IDAsIGxldHRlcjogJ+isjicsIFxyXG4gICAgICAgICAgICBzaG93M0Q6ICAnMCcsXHJcbiAgICAgICAgICAgIHBhZF90OiAwLjAsIHBhZF9kOiAwLjAsIHBhZF9zOiAwLjAsXHJcbiAgICAgICAgICAgIGNvbF9mOiAnJywgY29sX2I6ICcnLCBjb2xfczogJycsIGNvbF90OiAnJywgY29sX2Q6ICcnLCBcclxuICAgICAgICAgICAgY29sX2w6ICcnLCBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIHN1cGVyKGopO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBDX01hemVDZWxsRW1wdHkgZXh0ZW5kcyBDX01hemVDZWxsIHtcclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihqPzogSlNPTl9NYXplQ2VsbHx1bmRlZmluZWQpIHtcclxuICAgICAgICBqID8/PSB7a2luZDogVF9NektpbmQuRW1wdHl9O1xyXG4gICAgICAgIGoub2JqID8/PSB7fTtcclxuXHJcbiAgICAgICAgai5vYmouY2FuX3RociA9ICcxJztcclxuICAgICAgICBqLm9iai5wb3MgICAgID0ge3g6ai54LCB5OmoueSwgejpqLnp9O1xyXG4gICAgICAgIGoub2JqLnZpZXcgICAgPSAge1xyXG4gICAgICAgICAgICBsYXllcjogMCwgbGV0dGVyOiAn54ShJywgXHJcbiAgICAgICAgICAgIHNob3czRDogICcwJyxcclxuICAgICAgICAgICAgcGFkX3Q6IDAuMCwgcGFkX2Q6IDAuMCwgcGFkX3M6IDAuMCxcclxuICAgICAgICAgICAgY29sX2Y6ICcnLCBjb2xfYjogJycsIGNvbF9zOiAnJywgY29sX3Q6ICcnLCBjb2xfZDogJycsIFxyXG4gICAgICAgICAgICBjb2xfbDogJycsIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgc3VwZXIoaik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIENfTWF6ZUNlbGxGbG9vciBleHRlbmRzIENfTWF6ZUNlbGwge1xyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKGo/OiBKU09OX01hemVDZWxsfHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGogPz89IHtraW5kOiBUX016S2luZC5GbG9vcn07XHJcbiAgICAgICAgai5vYmogPz89IHt9O1xyXG5cclxuICAgICAgICBqLm9iai5jYW5fdGhyID0gJzEnO1xyXG4gICAgICAgIGoub2JqLnBvcyAgICAgPSB7eDpqLngsIHk6ai55LCB6Omouen07XHJcbiAgICAgICAgai5vYmoudmlldyAgICA9ICB7XHJcbiAgICAgICAgICAgIGxheWVyOiAwLCBsZXR0ZXI6ICfjgIAnLCBcclxuICAgICAgICAgICAgc2hvdzNEOiAgJzEnLFxyXG4gICAgICAgICAgICBwYWRfdDogMC4wLCBwYWRfZDogMC4wLCBwYWRfczogMC4wLFxyXG4gICAgICAgICAgICBjb2xfZjogJycsIGNvbF9iOiAnJywgY29sX3M6ICcnLCBjb2xfdDogJyM2NjY2ZmYnLCBjb2xfZDogJycsIFxyXG4gICAgICAgICAgICBjb2xfbDogJyM5OTk5ZmYnLCBcclxuICAgICAgICB9XHJcbiAgICAgICAgc3VwZXIoaik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIENfTWF6ZUNlbGxVbmV4cCBleHRlbmRzIENfTWF6ZUNlbGwge1xyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKGo/OiBKU09OX01hemVDZWxsfHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGogPz89IHtraW5kOiBUX016S2luZC5VbmV4cH07XHJcbiAgICAgICAgai5vYmogPz89IHt9O1xyXG5cclxuICAgICAgICBqLm9iai5jYW5fdGhyID0gJzEnO1xyXG4gICAgICAgIGoub2JqLnBvcyAgICAgPSB7eDpqLngsIHk6ai55LCB6Omouen07XHJcbiAgICAgICAgai5vYmoudmlldyAgICA9ICB7XHJcbiAgICAgICAgICAgIGxheWVyOiAwLCBsZXR0ZXI6ICfjg7snLCBcclxuICAgICAgICAgICAgc2hvdzNEOiAgJzEnLFxyXG4gICAgICAgICAgICBwYWRfdDogMC4wLCBwYWRfZDogMC4wLCBwYWRfczogMC4wLFxyXG4gICAgICAgICAgICBjb2xfZjogJycsIGNvbF9iOiAnJywgY29sX3M6ICcnLCBjb2xfdDogJyM2NmZmZmYnLCBjb2xfZDogJycsIFxyXG4gICAgICAgICAgICBjb2xfbDogJyM5OTk5ZmYnLCBcclxuICAgICAgICB9XHJcbiAgICAgICAgc3VwZXIoaik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIENfTWF6ZUNlbGxTdG9uZSBleHRlbmRzIENfTWF6ZUNlbGwge1xyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKGo/OiBKU09OX01hemVDZWxsfHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGogPz89IHtraW5kOiBUX016S2luZC5TdG9uZX07XHJcbiAgICAgICAgai5vYmogPz89IHt9O1xyXG5cclxuICAgICAgICBqLm9iai5jYW5fdGhyID0gJzAnO1xyXG4gICAgICAgIGoub2JqLnBvcyAgICAgPSB7eDpqLngsIHk6ai55LCB6Omouen07XHJcbiAgICAgICAgai5vYmoudmlldyAgICA9ICB7XHJcbiAgICAgICAgICAgIGxheWVyOiAwLCBsZXR0ZXI6ICfvvIMnLCBcclxuICAgICAgICAgICAgc2hvdzNEOiAgJzEnLFxyXG4gICAgICAgICAgICBwYWRfdDogMC4wLCBwYWRfZDogMC4wLCBwYWRfczogMC4wLFxyXG4gICAgICAgICAgICBjb2xfZjogJyMwMGZmMDAnLCBjb2xfYjogJycsIGNvbF9zOiAnIzAwZWUwMCcsIGNvbF90OiAnJywgY29sX2Q6ICcnLCBcclxuICAgICAgICAgICAgY29sX2w6ICcjMDAwMGZmJywgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN1cGVyKGopO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBDX01hemVDZWxsU3RyVXAgZXh0ZW5kcyBDX01hemVDZWxsIHtcclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihqPzogSlNPTl9NYXplQ2VsbHx1bmRlZmluZWQpIHtcclxuICAgICAgICBqID8/PSB7a2luZDogVF9NektpbmQuU3RyVXB9O1xyXG4gICAgICAgIGoub2JqID8/PSB7fTtcclxuXHJcbiAgICAgICAgai5vYmouY2FuX3RociA9ICcxJztcclxuICAgICAgICBqLm9iai5wb3MgICAgID0ge3g6ai54LCB5OmoueSwgejpqLnp9O1xyXG4gICAgICAgIGoub2JqLnZpZXcgICAgPSAge1xyXG4gICAgICAgICAgICBsYXllcjogMCwgbGV0dGVyOiAn5LiKJywgXHJcbiAgICAgICAgICAgIHNob3czRDogICcxJyxcclxuICAgICAgICAgICAgcGFkX3Q6IDAuMCwgcGFkX2Q6IDAuMCwgcGFkX3M6IDAuMCxcclxuLy8gICAgICAgICAgICBjb2xfZjogJycsIGNvbF9iOiAnJywgY29sX3M6ICcnLCBjb2xfdDogJyNmZmZmY2MnLCBjb2xfZDogJyNmZmZmY2MnLCBcclxuICAgICAgICAgICAgY29sX2Y6ICcnLCBjb2xfYjogJycsIGNvbF9zOiAnJywgY29sX3Q6ICcnLCBjb2xfZDogJyNmZmZmY2MnLCBcclxuICAgICAgICAgICAgY29sX2w6ICcjMDAwMGZmJywgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN1cGVyKGopO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBDX01hemVDZWxsU3RyRG4gZXh0ZW5kcyBDX01hemVDZWxsIHtcclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihqPzogSlNPTl9NYXplQ2VsbHx1bmRlZmluZWQpIHtcclxuICAgICAgICBqID8/PSB7a2luZDogVF9NektpbmQuU3RyRG59O1xyXG4gICAgICAgIGoub2JqID8/PSB7fTtcclxuXHJcbiAgICAgICAgai5vYmouY2FuX3RociA9ICcxJztcclxuICAgICAgICBqLm9iai5wb3MgICAgID0ge3g6ai54LCB5OmoueSwgejpqLnp9O1xyXG4gICAgICAgIGoub2JqLnZpZXcgICAgPSAge1xyXG4gICAgICAgICAgICBsYXllcjogMCwgbGV0dGVyOiAn5LiLJywgXHJcbiAgICAgICAgICAgIHNob3czRDogICcxJyxcclxuICAgICAgICAgICAgcGFkX3Q6IDAuMCwgcGFkX2Q6IDAuMCwgcGFkX3M6IDAuMCxcclxuLy8gICAgICAgICAgICBjb2xfZjogJycsIGNvbF9iOiAnJywgY29sX3M6ICcnLCBjb2xfdDogJyNmZmZmY2MnLCBjb2xfZDogJyNmZmZmY2MnLCBcclxuICAgICAgICAgICAgY29sX2Y6ICcnLCBjb2xfYjogJycsIGNvbF9zOiAnJywgY29sX3Q6ICcjZmZmZmNjJywgY29sX2Q6ICcnLCBcclxuICAgICAgICAgICAgY29sX2w6ICcjMDAwMGZmJywgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN1cGVyKGopO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBDX01hemVDZWxsU3RyVUQgZXh0ZW5kcyBDX01hemVDZWxsIHtcclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihqPzogSlNPTl9NYXplQ2VsbHx1bmRlZmluZWQpIHtcclxuICAgICAgICBqID8/PSB7a2luZDogVF9NektpbmQuU3RyVUR9O1xyXG4gICAgICAgIGoub2JqID8/PSB7fTtcclxuXHJcbiAgICAgICAgai5vYmouY2FuX3RociA9ICcxJztcclxuICAgICAgICBqLm9iai5wb3MgICAgID0ge3g6ai54LCB5OmoueSwgejpqLnp9O1xyXG4gICAgICAgIGoub2JqLnZpZXcgICAgPSAge1xyXG4gICAgICAgICAgICBsYXllcjogMCwgbGV0dGVyOiAn5q61JywgXHJcbiAgICAgICAgICAgIHNob3czRDogICcxJyxcclxuICAgICAgICAgICAgcGFkX3Q6IDAuMCwgcGFkX2Q6IDAuMCwgcGFkX3M6IDAuMCxcclxuICAgICAgICAgICAgY29sX2Y6ICcnLCBjb2xfYjogJycsIGNvbF9zOiAnJywgY29sX3Q6ICcjZmZmZmNjJywgY29sX2Q6ICcjZmZmZmNjJywgXHJcbiAgICAgICAgICAgIGNvbF9sOiAnIzAwMDBmZicsIFxyXG4gICAgICAgIH1cclxuICAgICAgICBzdXBlcihqKTtcclxuICAgIH1cclxufVxyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuXHJcbmltcG9ydCB7IF9hbGVydCB9IGZyb20gXCIuLi9kX2Ntbi9nbG9iYWxcIjtcclxuaW1wb3J0IHsgQ19Ec3BNZXNzYWdlIH0gZnJvbSBcIi4uL2RfdXRsL0NfRHNwTWVzc2FnZVwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBKU09OX01hemVJbmZvIHtcclxuICAgIG5hbWU6ICAgICAgc3RyaW5nO1xyXG4gICAgbWJuYW1lOiAgICBzdHJpbmc7XHJcbiAgICBsdjogICAgICAgIG51bWJlcjtcclxuICAgIHNpemVfeDogICAgbnVtYmVyO1xyXG4gICAgc2l6ZV95OiAgICBudW1iZXI7XHJcbiAgICBzaXplX3o6ICAgIG51bWJlcjtcclxuICAgIG1heF9yb29tOiAgbnVtYmVyO1xyXG4gICAgcm9vbV9zaXplOiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhbGVydF9tYXplaW5mb19pbmZvKGE/OiBKU09OX01hemVJbmZvKTogdm9pZCB7XHJcbiAgICBpZiAoYSA9PT0gdW5kZWZpbmVkKSByZXR1cm47XHJcblxyXG4gICAgYWxlcnQoXCJNYXplSW5mbyBEYXRhOlwiXHJcbiAgICAgICAgKyBcIlxcbm5hbWUgOiBcIiAgICAgICArIChhLm5hbWUgICAgICA/PyAnPycpXHJcbiAgICAgICAgKyBcIlxcbm1ibmFtZTogXCIgICAgICArIChhLm1ibmFtZSAgICA/PyAnPycpXHJcbiAgICAgICAgKyBcIlxcbmx2IDpcIiAgICAgICAgICArIChhLmx2ICAgICAgICA/PyAnPycpXHJcbiAgICAgICAgKyBcIlxcbnNpemVfeDogXCIgICAgICArIChhLnNpemVfeCAgICA/PyAnPycpXHJcbiAgICAgICAgKyBcIlxcbnNpemVfeTogXCIgICAgICArIChhLnNpemVfeSAgICA/PyAnPycpXHJcbiAgICAgICAgKyBcIlxcbnNpemVfejogXCIgICAgICArIChhLnNpemVfeiAgICA/PyAnPycpXHJcbiAgICAgICAgKyBcIlxcbm1heF9vZl9yb29tOiBcIiArIChhLm1heF9yb29tICA/PyAnPycpXHJcbiAgICAgICAgKyBcIlxcbnJvb21fc2l6ZTogXCIgICArIChhLnJvb21fc2l6ZSA/PyAnPycpXHJcbiAgICAgICAgKyBcIlxcblwiXHJcbiAgICApO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQ19NYXplSW5mbyB7XHJcbiAgICBwdWJsaWMgbmFtZTogICAgICBzdHJpbmcgPSAnJztcclxuICAgIHB1YmxpYyBtYm5hbWU6ICAgIHN0cmluZyA9ICcnO1xyXG4gICAgcHVibGljIGx2OiAgICAgICAgbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBzaXplX3g6ICAgIG51bWJlciA9IDM7XHJcbiAgICBwdWJsaWMgc2l6ZV95OiAgICBudW1iZXIgPSAzO1xyXG4gICAgcHVibGljIHNpemVfejogICAgbnVtYmVyID0gMztcclxuICAgIHB1YmxpYyBtYXhfcm9vbTogIG51bWJlciA9IDE7XHJcbiAgICBwdWJsaWMgcm9vbV9zaXplOiBudW1iZXIgPSAxO1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRfdGJsX2FsbCgpOiBDX01hemVJbmZvW10ge1xyXG4gICAgICAgIGNvbnN0IG1hemVpbmZvOiBDX01hemVJbmZvW10gPSBbXTtcclxuICAgICAgICBtYXplaW5mby5wdXNoKFxyXG4gICAgICAgICAgICBuZXcgQ19NYXplSW5mbygpLmRlY29kZSh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiAgIFx0J21hemUwMTAnLCBcclxuICAgICAgICAgICAgICAgIG1ibmFtZTogXHQn5pWZ57e05aC0JywgXHJcbiAgICAgICAgICAgICAgICBsdjogICAgIFx0IDEsIFxyXG4gICAgICAgICAgICAgICAgc2l6ZV94OiBcdDExLCBcclxuICAgICAgICAgICAgICAgIHNpemVfeTogXHQxMSwgXHJcbiAgICAgICAgICAgICAgICBzaXplX3o6IFx0IDMsIFxyXG4gICAgICAgICAgICAgICAgbWF4X3Jvb206IFx0IDIsIFxyXG4gICAgICAgICAgICAgICAgcm9vbV9zaXplOiBcdCAzIFxyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICApO1xyXG4gICAgICAgIG1hemVpbmZvLnB1c2goXHJcbiAgICAgICAgICAgIG5ldyBDX01hemVJbmZvKCkuZGVjb2RlKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6ICAgXHQnbWF6ZTAxMScsIFxyXG4gICAgICAgICAgICAgICAgbWJuYW1lOiBcdCflp4vjgb7jgorjga7ov7flrq4nLCBcclxuICAgICAgICAgICAgICAgIGx2OiAgICAgXHQgMSwgXHJcbiAgICAgICAgICAgICAgICBzaXplX3g6IFx0MjEsIFxyXG4gICAgICAgICAgICAgICAgc2l6ZV95OiBcdDIxLCBcclxuICAgICAgICAgICAgICAgIHNpemVfejogXHQgNSwgXHJcbiAgICAgICAgICAgICAgICBtYXhfcm9vbTogXHQgMywgXHJcbiAgICAgICAgICAgICAgICByb29tX3NpemU6IFx0IDMgXHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgbWF6ZWluZm8ucHVzaChcclxuICAgICAgICAgICAgbmV3IENfTWF6ZUluZm8oKS5kZWNvZGUoe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogICBcdCdtYXplMDEyJywgXHJcbiAgICAgICAgICAgICAgICBtYm5hbWU6IFx0J+aal+OBjeajruOBrui/t+WuricsIFxyXG4gICAgICAgICAgICAgICAgbHY6ICAgICBcdCAxLCBcclxuICAgICAgICAgICAgICAgIHNpemVfeDogXHQyNSwgXHJcbiAgICAgICAgICAgICAgICBzaXplX3k6IFx0MjUsIFxyXG4gICAgICAgICAgICAgICAgc2l6ZV96OiBcdCA3LCBcclxuICAgICAgICAgICAgICAgIG1heF9yb29tOiBcdCA1LCBcclxuICAgICAgICAgICAgICAgIHJvb21fc2l6ZTogXHQgMyBcclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgKVxyXG4gICAgICAgIG1hemVpbmZvLnB1c2goXHJcbiAgICAgICAgICAgIG5ldyBDX01hemVJbmZvKCkuZGVjb2RlKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6ICAgXHQnbWF6ZTAxMycsIFxyXG4gICAgICAgICAgICAgICAgbWJuYW1lOiBcdCfpu5LprZTjga7lnLDkuIvlopPlnLAnLCBcclxuICAgICAgICAgICAgICAgIGx2OiAgICAgXHQgMSwgXHJcbiAgICAgICAgICAgICAgICBzaXplX3g6IFx0MzEsIFxyXG4gICAgICAgICAgICAgICAgc2l6ZV95OiBcdDMxLCBcclxuICAgICAgICAgICAgICAgIHNpemVfejogXHQxMCwgXHJcbiAgICAgICAgICAgICAgICBtYXhfcm9vbTogXHQgNSwgXHJcbiAgICAgICAgICAgICAgICByb29tX3NpemU6IFx0IDUgXHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgIClcclxuXHJcbiAgICAgICAgcmV0dXJuIG1hemVpbmZvO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yIChqPzogSlNPTl9NYXplSW5mbykge1xyXG4gICAgICAgIGlmIChqICE9PSB1bmRlZmluZWQpIHRoaXMuZGVjb2RlKGopO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGVuY29kZSgpOiBKU09OX01hemVJbmZvIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBuYW1lOiAgICAgIHRoaXMubmFtZSxcclxuICAgICAgICAgICAgbWJuYW1lOiAgICB0aGlzLm1ibmFtZSxcclxuICAgICAgICAgICAgbHY6ICAgICAgICB0aGlzLmx2LFxyXG4gICAgICAgICAgICBzaXplX3g6ICAgIHRoaXMuc2l6ZV94LFxyXG4gICAgICAgICAgICBzaXplX3k6ICAgIHRoaXMuc2l6ZV95LFxyXG4gICAgICAgICAgICBzaXplX3o6ICAgIHRoaXMuc2l6ZV96LFxyXG4gICAgICAgICAgICBtYXhfcm9vbTogIHRoaXMubWF4X3Jvb20sXHJcbiAgICAgICAgICAgIHJvb21fc2l6ZTogdGhpcy5yb29tX3NpemUsXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIGRlY29kZShqPzogSlNPTl9NYXplSW5mbyk6IENfTWF6ZUluZm8ge1xyXG4gICAgICAgIGlmIChqID09PSB1bmRlZmluZWQpIHJldHVybiB0aGlzO1xyXG5cclxuICAgICAgICBpZiAoai5uYW1lICAgICAgIT09IHVuZGVmaW5lZCkgdGhpcy5uYW1lICAgICAgPSBqLm5hbWU7XHJcbiAgICAgICAgaWYgKGoubWJuYW1lICAgICE9PSB1bmRlZmluZWQpIHRoaXMubWJuYW1lICAgID0gai5tYm5hbWU7XHJcbiAgICAgICAgaWYgKGoubHYgICAgICAgICE9PSB1bmRlZmluZWQpIHRoaXMubHYgICAgICAgID0gai5sdjtcclxuICAgICAgICBpZiAoai5zaXplX3ggICAgIT09IHVuZGVmaW5lZCkgdGhpcy5zaXplX3ggICAgPSBqLnNpemVfeDtcclxuICAgICAgICBpZiAoai5zaXplX3kgICAgIT09IHVuZGVmaW5lZCkgdGhpcy5zaXplX3kgICAgPSBqLnNpemVfeTtcclxuICAgICAgICBpZiAoai5zaXplX3ogICAgIT09IHVuZGVmaW5lZCkgdGhpcy5zaXplX3ogICAgPSBqLnNpemVfejtcclxuICAgICAgICBpZiAoai5tYXhfcm9vbSAgIT09IHVuZGVmaW5lZCkgdGhpcy5tYXhfcm9vbSAgPSBqLm1heF9yb29tO1xyXG4gICAgICAgIGlmIChqLnJvb21fc2l6ZSAhPT0gdW5kZWZpbmVkKSB0aGlzLnJvb21fc2l6ZSA9IGoucm9vbV9zaXplO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIGFsZXJ0KCk6IHZvaWQge1xyXG4gICAgICAgIGFsZXJ0KFwiTWF6ZUluZm8gRGF0YTpcIlxyXG4gICAgICAgICAgICArIFwiXFxubmFtZSA6IFwiICAgICAgICsgKHRoaXMubmFtZSAgICAgID8/ICc/JylcclxuICAgICAgICAgICAgKyBcIlxcbm1ibmFtZTogXCIgICAgICArICh0aGlzLm1ibmFtZSAgICA/PyAnPycpXHJcbiAgICAgICAgICAgICsgXCJcXG5sdiA6XCIgICAgICAgICAgKyAodGhpcy5sdiAgICAgICAgPz8gJz8nKVxyXG4gICAgICAgICAgICArIFwiXFxuc2l6ZV94OiBcIiAgICAgICsgKHRoaXMuc2l6ZV94ICAgID8/ICc/JylcclxuICAgICAgICAgICAgKyBcIlxcbnNpemVfeTogXCIgICAgICArICh0aGlzLnNpemVfeSAgICA/PyAnPycpXHJcbiAgICAgICAgICAgICsgXCJcXG5zaXplX3o6IFwiICAgICAgKyAodGhpcy5zaXplX3ogICAgPz8gJz8nKVxyXG4gICAgICAgICAgICArIFwiXFxubWF4X29mX3Jvb206IFwiICsgKHRoaXMubWF4X3Jvb20gID8/ICc/JylcclxuICAgICAgICAgICAgKyBcIlxcbnJvb21fc2l6ZTogXCIgICArICh0aGlzLnJvb21fc2l6ZSA/PyAnPycpXHJcbiAgICAgICAgICAgICsgXCJcXG5cIlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuXHJcbmltcG9ydCB7IENfUG9pbnQgfSAgICAgICAgICAgICAgICAgICBmcm9tIFwiLi9DX1BvaW50XCI7XHJcbmltcG9ydCB7IENfUG9pbnREaXIsIEpTT05fUG9pbnREaXIgfSBmcm9tIFwiLi9DX1BvaW50RGlyXCI7XHJcbmltcG9ydCB7IElfQWJzdHJhY3QsIElfSlNPTl9VbmlxLCBKU09OX0FueSB9ICAgICBmcm9tIFwiLi9DX1NhdmVJbmZvXCI7XHJcbmltcG9ydCB7IF9nZXRfdXVpZCB9ICAgICAgICAgICAgICAgICBmcm9tIFwiLi4vZF91dGwvRl9SYW5kXCI7XHJcbmltcG9ydCB7IFxyXG4gICAgQ19NYXplT2JqVmlldywgXHJcbiAgICBJX01hemVPYmpWaWV3LCBcclxuICAgIEpTT05fTWF6ZU9ialZpZXcgXHJcbn0gZnJvbSBcIi4vQ19NYXplT2JqVmlld1wiO1xyXG5cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSlNPTl9NYXplT2JqIGV4dGVuZHMgSlNPTl9Bbnkge1xyXG4gICAgY2xuYW1lPzogICAgc3RyaW5nLFxyXG4gICAgdW5pcV9pZD86ICAgc3RyaW5nLCBcclxuICAgIHBvcz86ICAgICAgIEpTT05fUG9pbnREaXIsXHJcbiAgICB2aWV3PzogICAgICBKU09OX01hemVPYmpWaWV3fHVuZGVmaW5lZCxcclxuICAgIHRocj86ICAgICAgIHN0cmluZywgXHJcbn1cclxuXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElfTWF6ZU9iaiBleHRlbmRzIElfSlNPTl9VbmlxLCBJX0Fic3RyYWN0IHtcclxuICAgIGdldF9wZDogICAgICgpPT5DX1BvaW50RGlyO1xyXG4gICAgd2l0aGluOiAgICAgKHA6IENfUG9pbnQpPT5ib29sZWFuO1xyXG4gICAgdmlldzogICAgICAgKCk9PklfTWF6ZU9ialZpZXd8dW5kZWZpbmVkO1xyXG4gICAgY2FuVGhyb3VnaDogKCk9PmJvb2xlYW47XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBDX01hemVPYmogaW1wbGVtZW50cyBJX01hemVPYmoge1xyXG4gICAgcHJvdGVjdGVkIGNsbmFtZTogICAgc3RyaW5nID0gJ0NfTWF6ZU9iaic7XHJcblxyXG4gICAgcHJpdmF0ZSAgIHVuaXFfaWQ6ICAgc3RyaW5nO1xyXG4gICAgcHJvdGVjdGVkIHBvczogICAgICAgQ19Qb2ludERpcjtcclxuICAgIHByb3RlY3RlZCBteV92aWV3OiAgIElfTWF6ZU9ialZpZXd8dW5kZWZpbmVkO1xyXG4gICAgcHJvdGVjdGVkIGNhbl90aHI6ICAgYm9vbGVhbjtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIG5ld09iaihqPzogSlNPTl9NYXplT2JqfHVuZGVmaW5lZCk6IElfTWF6ZU9iaiB7XHJcbiAgICAgICAgaiA/Pz0ge307XHJcbiAgICAgICAgai5jbG5hbWUgPz89IENfTWF6ZU9iai5jb25zdHJ1Y3Rvci5uYW1lO1xyXG4gICAgICAgIHN3aXRjaCAoai5jbG5hbWUpIHtcclxuICAgICAgICAgICAgY2FzZSBDX01hemVPYmouY29uc3RydWN0b3IubmFtZTogcmV0dXJuIG5ldyBDX01hemVPYmooaik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXcgQ19NYXplT2JqKGopO1xyXG4gICAgfVxyXG4gICAgcHVibGljIG5ld09iaihqPzogSlNPTl9NYXplT2JqfHVuZGVmaW5lZCk6IElfTWF6ZU9iaiB7XHJcbiAgICAgICAgcmV0dXJuIENfTWF6ZU9iai5uZXdPYmooaik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKGo/OiBKU09OX01hemVPYmp8dW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhpcy51bmlxX2lkICAgID0gJ21hemVvYmpfJyArIF9nZXRfdXVpZCgpO1xyXG4gICAgICAgIHRoaXMuY2xuYW1lICAgICA9ICBDX01hemVPYmouY29uc3RydWN0b3IubmFtZTtcclxuICAgICAgICB0aGlzLnBvcyAgICAgICAgPSAgbmV3IENfUG9pbnREaXIoe3g6MCwgeTowLCB6OjAsIGQ6MH0pO1xyXG4gICAgICAgIHRoaXMubXlfdmlldyAgICA9ICB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhpcy5jYW5fdGhyICAgID0gIHRydWU7XHJcblxyXG4gICAgICAgIGlmIChqICE9PSB1bmRlZmluZWQpIHRoaXMuX19pbml0KGopO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX19pbml0KGo6IEpTT05fTWF6ZU9ianx1bmRlZmluZWQpOiBDX01hemVPYmoge1xyXG4gICAgICAgIGlmIChqID09PSB1bmRlZmluZWQpIHJldHVybiB0aGlzO1xyXG5cclxuICAgICAgICBpZiAoai51bmlxX2lkICE9PSB1bmRlZmluZWQpIHRoaXMudW5pcV9pZCAgID0gai51bmlxX2lkO1xyXG4gICAgICAgIGlmIChqLmNsbmFtZSAgIT09IHVuZGVmaW5lZCkgdGhpcy5jbG5hbWUgICAgPSBqLmNsbmFtZTtcclxuICAgICAgICBpZiAoai5wb3MgICAgICE9PSB1bmRlZmluZWQpIHRoaXMucG9zLmRlY29kZShqLnBvcyk7XHJcbiAgICAgICAgaWYgKGoudmlldyAgICAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGlmIChPYmplY3Qua2V5cyhqLnZpZXcpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubXlfdmlldyA/Pz0gQ19NYXplT2JqVmlldy5uZXdPYmooai52aWV3KTsgXHJcbiAgICAgICAgICAgIH0gZWxzZSB0aGlzLm15X3ZpZXcgID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoai5jYW5fdGhyICE9PSB1bmRlZmluZWQpIHRoaXMuY2FuX3RociA9IGouY2FuX3RociAhPT0gJzAnID8gdHJ1ZSA6IGZhbHNlO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG59XHJcblxyXG4gICAgcHVibGljIHVpZCgpOiBzdHJpbmcge3JldHVybiB0aGlzLnVuaXFfaWR9XHJcblxyXG4gICAgcHVibGljIHZpZXcoKTogSV9NYXplT2JqVmlld3x1bmRlZmluZWQge3JldHVybiB0aGlzLm15X3ZpZXd9XHJcbiAgICBwdWJsaWMgc2V0Vmlldyh2aWV3OiBJX01hemVPYmpWaWV3fHVuZGVmaW5lZCk6IHZvaWQge3RoaXMubXlfdmlldyA9IHZpZXd9XHJcblxyXG4gICAgcHVibGljIGNhblRocm91Z2goKTogYm9vbGVhbiB7cmV0dXJuIHRoaXMuY2FuX3Rocn1cclxuICAgIHB1YmxpYyBzZXRUaHJvdWdoKHRocjogYm9vbGVhbik6IGJvb2xlYW4ge3JldHVybiB0aGlzLmNhbl90aHIgPSB0aHJ9XHJcblxyXG4gICAgcHVibGljIGdldF9wZCgpOiBDX1BvaW50RGlyIHtcclxuICAgICAgICByZXR1cm4gbmV3IENfUG9pbnREaXIodGhpcy5wb3MpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldF9wZChwOiBDX1BvaW50RGlyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5wb3MgPSBwO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHdpdGhpbihwOiBDX1BvaW50KTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucG9zLndpdGhpbihwKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZW5jb2RlKCk6IEpTT05fTWF6ZU9iaiB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdW5pcV9pZDogdGhpcy51bmlxX2lkLFxyXG4gICAgICAgICAgICBjbG5hbWU6ICB0aGlzLmNsbmFtZSxcclxuICAgICAgICAgICAgcG9zOiAgICAgdGhpcy5wb3MuZW5jb2RlKCksXHJcbiAgICAgICAgICAgIHZpZXc6ICAgIHRoaXMubXlfdmlldz8uZW5jb2RlKCkgPz8ge30sXHJcbiAgICAgICAgICAgIGNhbl90aHI6IHRoaXMuY2FuX3RociA/ICcxJyA6ICcwJyxcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRlY29kZShqOiBKU09OX01hemVPYmp8dW5kZWZpbmVkKTogSV9NYXplT2JqIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fX2luaXQoaik7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc3RhdGljIGRlY29kZShqOiBKU09OX01hemVPYmp8dW5kZWZpbmVkKTogSV9NYXplT2JqIHtcclxuICAgICAgICByZXR1cm4gQ19NYXplT2JqLm5ld09iaihqKTtcclxuICAgIH1cclxufVxyXG5cclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5pbXBvcnQgeyBJX0Fic3RyYWN0LCBKU09OX0FueSB9IGZyb20gXCIuL0NfU2F2ZUluZm9cIjtcclxuaW1wb3J0IHsgVF9XYWxsIH0gICAgICAgICAgICAgICBmcm9tIFwiLi4vZF9tZGwvQ19XYWxsXCI7XHJcblxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJX01hemVPYmpWaWV3IGV4dGVuZHMgSV9BYnN0cmFjdCB7XHJcbiAgICAvLyDooajnpLrplqLkv4IoMkRwcmUpLi9DX1dhbGxcclxuICAgIGxheWVyOiAgICgpPT5udW1iZXI7XHJcbiAgICBsZXR0ZXI6ICAoKT0+c3RyaW5nfG51bGw7IC8vIG51bGw6IOimi+OBiOOBquOBhOOAgeS9leOCguOBquOBhFxyXG5cclxuICAgIC8vIOihqOekuumWouS/gigzRClcclxuICAgIGNhblNob3c6ICgpPT5ib29sZWFuO1xyXG4gICAgZHJvdzNEOiAgKGZyb3Q6IFRfV2FsbCwgYmFjazogVF9XYWxsKT0+dm9pZDtcclxuXHJcbiAgICBwYWRfdDogICAoKT0+bnVtYmVyOyAvL+S4iuWBtOOBruepuuOBjSjlibLlkIg6IDDjgYvjgokxKSBcclxuICAgIHBhZF9kOiAgICgpPT5udW1iZXI7IC8v5bqK5YG044Gu56m644GNKOWJsuWQiDogMOOBi+OCiTEpIFxyXG4gICAgcGFkX3M6ICAgKCk9Pm51bWJlcjsgLy/mqKrlgbTjga7nqbrjgY0o5Ymy5ZCIOiAw44GL44KJMSkgXHJcbiAgICBjb2xfZjogICAoKT0+c3RyaW5nfG51bGw7IC8v5q2j6Z2i44Gu6ImyKENTU+OCq+ODqeODvCnjgIJudWxs44Gv6YCP5piOXHJcbiAgICBjb2xfYjogICAoKT0+c3RyaW5nfG51bGw7IC8v6IOM6Z2i44Gu6ImyKENTU+OCq+ODqeODvCnjgIJudWxs44Gv6YCP5piOXHJcbiAgICBjb2xfczogICAoKT0+c3RyaW5nfG51bGw7IC8v5qiq5YG044Gu6ImyKENTU+OCq+ODqeODvCnjgIJudWxs44Gv6YCP5piOXHJcbiAgICBjb2xfdDogICAoKT0+c3RyaW5nfG51bGw7IC8v5LiK6YOo44Gu6ImyKENTU+OCq+ODqeODvCnjgIJudWxs44Gv6YCP5piO44CC44KE44KE44GT44GX44GE44GM44CB54mp5L2T44Gu5bqV6Z2i44Gr5b2T44Gf44KLXHJcbiAgICBjb2xfZDogICAoKT0+c3RyaW5nfG51bGw7IC8v5LiL6YOo44Gu6ImyKENTU+OCq+ODqeODvCnjgIJudWxs44Gv6YCP5piO44CC44KE44KE44GT44GX44GE44GM44CB54mp5L2T44Gu5aSp5LqV44Gr5b2T44Gf44KLXHJcbiAgICBjb2xfbDogICAoKT0+c3RyaW5nfG51bGw7IC8v44Op44Kk44Oz44Gu6ImyKENTU+OCq+ODqeODvClcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBKU09OX01hemVPYmpWaWV3IGV4dGVuZHMgSlNPTl9Bbnkge1xyXG4gICAgY2xuYW1lPzogc3RyaW5nLFxyXG4gICAgbGF5ZXI/OiAgbnVtYmVyLFxyXG4gICAgbGV0dGVyPzogc3RyaW5nLFxyXG4gICAgc2hvdzNEPzogc3RyaW5nLFxyXG4gICAgcGFkX3Q/OiAgbnVtYmVyLCAvLyDjgqrjg5bjgrjjgqfjgq/jg4jkuIrpg6jjga7pmpnplpPjga7libLlkIgoMC4wIOOBi+OCiSAxLjApIFxyXG4gICAgcGFkX2Q/OiAgbnVtYmVyLCAvLyDjgqrjg5bjgrjjgqfjgq/jg4jkuIvpg6jjga7pmpnplpPjga7libLlkIgoMC4wIOOBi+OCiSAxLjApIFxyXG4gICAgcGFkX3M/OiAgbnVtYmVyLCAvLyDjgqrjg5bjgrjjgqfjgq/jg4jlkajlm7Ljga7pmpnplpPjga7libLlkIgoMC4wIOOBi+OCiSAxLjApIFxyXG4gICAgY29sX2Y/OiAgc3RyaW5nfG51bGwsIC8vIOOCquODluOCuOOCp+OCr+ODiOato+mdouOBrkNTU+OCq+ODqeODvCBcclxuICAgIGNvbF9iPzogIHN0cmluZ3xudWxsLCAvLyDjgqrjg5bjgrjjgqfjgq/jg4jmraPpnaLjga5DU1Pjgqvjg6njg7wgXHJcbiAgICBjb2xfcz86ICBzdHJpbmd8bnVsbCwgLy8g44Kq44OW44K444Kn44Kv44OI5YG06Z2i44GuQ1NT44Kr44Op44O8IFxyXG4gICAgY29sX3Q/OiAgc3RyaW5nfG51bGwsIC8vIOOCquODluOCuOOCp+OCr+ODiOS4iumdouOBrkNTU+OCq+ODqeODvCBcclxuICAgIGNvbF9kPzogIHN0cmluZ3xudWxsLCAvLyDjgqrjg5bjgrjjgqfjgq/jg4jlupXpnaLjga5DU1Pjgqvjg6njg7wgXHJcbiAgICBjb2xfbD86ICBzdHJpbmd8bnVsbCwgLy8g44Kq44OW44K444Kn44Kv44OI44Gu57ea44GuQ1NT44Kr44Op44O8IFxyXG59XHJcblxyXG50eXBlIFRfeHkgICA9IHt4OiBudW1iZXIsIHk6IG51bWJlcn1cclxudHlwZSBUX1JlY3QgPSB7dGw6IFRfeHksIHRyOiBUX3h5LCBkbDogVF94eSwgZHI6IFRfeHl9O1xyXG5cclxuZXhwb3J0IGNsYXNzIENfTWF6ZU9ialZpZXcgaW1wbGVtZW50cyBJX01hemVPYmpWaWV3IHtcclxuICAgIHB1YmxpYyBzdGF0aWMgY29uM0Q/OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XHJcbiAgICBwdWJsaWMgc3RhdGljIGdldF9jb250ZXh0M0QoKTogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEfHVuZGVmaW5lZCB7cmV0dXJuIHRoaXM/LmNvbjNEfVxyXG4gICAgcHVibGljIHN0YXRpYyBzZXRfY29udGV4dDNEKGNvbjNEPzogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKTogdm9pZCB7dGhpcy5jb24zRCA9IGNvbjNEfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgbmV3T2JqKGo/OiBKU09OX01hemVPYmpWaWV3fHVuZGVmaW5lZCk6IElfTWF6ZU9ialZpZXcge1xyXG4gICAgICAgIGogPz89IHt9O1xyXG4gICAgICAgIGouY2xuYW1lID8/PSBDX01hemVPYmpWaWV3LmNvbnN0cnVjdG9yLm5hbWU7XHJcbiAgICAgICAgc3dpdGNoIChqLmNsbmFtZSkge1xyXG4gICAgICAgICAgICBjYXNlIENfTWF6ZU9ialZpZXcuY29uc3RydWN0b3IubmFtZTogICAgIHJldHVybiBuZXcgQ19NYXplT2JqVmlldyhqKTtcclxuICAgICAgICB9IFxyXG4gICAgICAgIHJldHVybiBuZXcgQ19NYXplT2JqVmlldyhqKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBuZXdPYmooaj86IEpTT05fTWF6ZU9ialZpZXd8dW5kZWZpbmVkKTogSV9NYXplT2JqVmlldyB7XHJcbiAgICAgICAgcmV0dXJuIENfTWF6ZU9ialZpZXcubmV3T2JqKGopO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwcml2YXRlIGNsbmFtZTogICAgc3RyaW5nID0gJ0NfTWF6ZU9ialZpZXcnO1xyXG5cclxuICAgIHByaXZhdGUgbXlfbGF5ZXI6ICBudW1iZXI7ICAgICAgLy8gMkTooajnpLrjga7mmYLjga5DU1Pjg6zjgqTjg6Tjg7zjgILlkIzkvY3nva7jga7jgqrjg5bjgrjjgqfjga7lhoXjgZPjga7lgKTjgYzlpKfjgY3jgYTnianjgYzooajnpLrjgZXjgozjgotcclxuICAgIHByaXZhdGUgbXlfbGV0dGVyOiBzdHJpbmd8bnVsbDsgLy8gMkTooajnpLrjga7mmYLjga7lhajop5LmloflrZfjgIJudWxs44Gq44KJ6YCP5piOXHJcblxyXG4gICAgcHJpdmF0ZSBteV9zaG93M0Q6IGJvb2xlYW47XHJcbiAgICBwcml2YXRlIG15X3BhZF90OiAgbnVtYmVyOyAvLyDjgqrjg5bjgrjjgqfjgq/jg4jkuIrpg6jjga7pmpnplpPjga7libLlkIgoMC4wIOOBi+OCiSAxLjApIFxyXG4gICAgcHJpdmF0ZSBteV9wYWRfZDogIG51bWJlcjsgLy8g44Kq44OW44K444Kn44Kv44OI5LiL6YOo44Gu6ZqZ6ZaT44Gu5Ymy5ZCIKDAuMCDjgYvjgokgMS4wKSBcclxuICAgIHByaXZhdGUgbXlfcGFkX3M6ICBudW1iZXI7IC8vIOOCquODluOCuOOCp+OCr+ODiOWRqOWbsuOBrumamemWk+OBruWJsuWQiCgwLjAg44GL44KJIDEuMCkgXHJcblxyXG4gICAgcHJpdmF0ZSBteV9jb2xfZjogIHN0cmluZ3xudWxsOyAvLyDjgqrjg5bjgrjjgqfjgq/jg4jmraPpnaLjga5DU1Pjgqvjg6njg7wgXHJcbiAgICBwcml2YXRlIG15X2NvbF9iOiAgc3RyaW5nfG51bGw7IC8vIOOCquODluOCuOOCp+OCr+ODiOato+mdouOBrkNTU+OCq+ODqeODvCBcclxuICAgIHByaXZhdGUgbXlfY29sX3M6ICBzdHJpbmd8bnVsbDsgLy8g44Kq44OW44K444Kn44Kv44OI5YG06Z2i44GuQ1NT44Kr44Op44O8IFxyXG4gICAgcHJpdmF0ZSBteV9jb2xfdDogIHN0cmluZ3xudWxsOyAvLyDjgqrjg5bjgrjjgqfjgq/jg4jkuIrpnaLjga5DU1Pjgqvjg6njg7wgXHJcbiAgICBwcml2YXRlIG15X2NvbF9kOiAgc3RyaW5nfG51bGw7IC8vIOOCquODluOCuOOCp+OCr+ODiOW6lemdouOBrkNTU+OCq+ODqeODvCBcclxuICAgIHByaXZhdGUgbXlfY29sX2w6ICBzdHJpbmd8bnVsbDsgLy8g44Kq44OW44K444Kn44Kv44OI44Gu57ea44GuQ1NT44Kr44Op44O8IFxyXG5cclxuICAgIHByb3RlY3RlZCBjb25zdHJ1Y3RvcihqPzogSlNPTl9NYXplT2JqVmlld3x1bmRlZmluZWQpIHtcclxuICAgICAgICB0aGlzLmNsbmFtZSAgICAgPSAgdGhpcy5jb25zdHJ1Y3Rvci5uYW1lO1xyXG5cclxuICAgICAgICB0aGlzLm15X2xheWVyICAgPSAgLTI7XHJcbiAgICAgICAgdGhpcy5teV9sZXR0ZXIgID0gIG51bGw7XHJcblxyXG4gICAgICAgIHRoaXMubXlfcGFkX3QgICA9ICAwLjA7XHJcbiAgICAgICAgdGhpcy5teV9wYWRfZCAgID0gIDAuMDtcclxuICAgICAgICB0aGlzLm15X3BhZF9zICAgPSAgMC4wO1xyXG5cclxuICAgICAgICB0aGlzLm15X3Nob3czRCAgPSAgdHJ1ZTtcclxuXHJcbiAgICAgICAgdGhpcy5teV9jb2xfZiAgID0gJyNmOGY4ZjgnOyBcclxuICAgICAgICB0aGlzLm15X2NvbF9iICAgPSAnI2FhYWFhYSc7IFxyXG4gICAgICAgIHRoaXMubXlfY29sX3MgICA9ICcjZGRkZGRkJzsgXHJcbiAgICAgICAgdGhpcy5teV9jb2xfdCAgID0gJyNmZmZmZmYnOyBcclxuICAgICAgICB0aGlzLm15X2NvbF9kICAgPSAnI2NjY2NjYyc7IFxyXG4gICAgICAgIHRoaXMubXlfY29sX2wgICA9ICcjMzMzMzMzJzsgXHJcblxyXG4gICAgICAgIGlmIChqICE9PSB1bmRlZmluZWQpIHRoaXMuX19pbml0KGopO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBfX2luaXQoajogSlNPTl9NYXplT2JqVmlld3x1bmRlZmluZWQpOiBJX01hemVPYmpWaWV3IHtcclxuICAgICAgICBpZiAoaiA9PT0gdW5kZWZpbmVkKSByZXR1cm4gdGhpcztcclxuXHJcbiAgICAgICAgaWYgKGouY2xuYW1lICAhPT0gdW5kZWZpbmVkKSB0aGlzLmNsbmFtZSAgICA9IGouY2xuYW1lO1xyXG4gICAgICAgIGlmIChqLmxheWVyICAgIT09IHVuZGVmaW5lZCkgdGhpcy5teV9sYXllciAgPSBqLmxheWVyO1xyXG4gICAgICAgIGlmIChqLmxldHRlciAgIT09IHVuZGVmaW5lZCkgdGhpcy5teV9sZXR0ZXIgPSBqLmxldHRlciAhPT0gJycgID8gai5sZXR0ZXIgOiBudWxsOyBcclxuICAgICAgICBpZiAoai5wYWRfdCAgICE9PSB1bmRlZmluZWQpIHRoaXMubXlfcGFkX3QgID0gai5wYWRfdDsgXHJcbiAgICAgICAgaWYgKGoucGFkX2QgICAhPT0gdW5kZWZpbmVkKSB0aGlzLm15X3BhZF9kICA9IGoucGFkX2Q7IFxyXG4gICAgICAgIGlmIChqLnBhZF9zICAgIT09IHVuZGVmaW5lZCkgdGhpcy5teV9wYWRfcyAgPSBqLnBhZF9zOyBcclxuICAgICAgICBpZiAoai5zaG93M0QgICE9PSB1bmRlZmluZWQpIHRoaXMubXlfc2hvdzNEID0gai5zaG93M0QgIT09ICcwJyA/IHRydWUgICAgIDogZmFsc2U7IFxyXG4gICAgICAgIGlmIChqLmNvbF9mICAgIT09IHVuZGVmaW5lZCkgdGhpcy5teV9jb2xfZiAgPSBqLmNvbF9mICAhPT0gJycgID8gai5jb2xfZiAgOiBudWxsOyBcclxuICAgICAgICBpZiAoai5jb2xfYiAgICE9PSB1bmRlZmluZWQpIHRoaXMubXlfY29sX2IgID0gai5jb2xfYiAgIT09ICcnICA/IGouY29sX2IgIDogbnVsbDsgXHJcbiAgICAgICAgaWYgKGouY29sX3MgICAhPT0gdW5kZWZpbmVkKSB0aGlzLm15X2NvbF9zICA9IGouY29sX3MgICE9PSAnJyAgPyBqLmNvbF9zICA6IG51bGw7IFxyXG4gICAgICAgIGlmIChqLmNvbF90ICAgIT09IHVuZGVmaW5lZCkgdGhpcy5teV9jb2xfdCAgPSBqLmNvbF90ICAhPT0gJycgID8gai5jb2xfdCAgOiBudWxsOyBcclxuICAgICAgICBpZiAoai5jb2xfZCAgICE9PSB1bmRlZmluZWQpIHRoaXMubXlfY29sX2QgID0gai5jb2xfZCAgIT09ICcnICA/IGouY29sX2QgIDogbnVsbDsgXHJcbiAgICAgICAgaWYgKGouY29sX2wgICAhPT0gdW5kZWZpbmVkKSB0aGlzLm15X2NvbF9sICA9IGouY29sX2wgICE9PSAnJyAgPyBqLmNvbF9sICA6IG51bGw7IFxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbGF5ZXIoKTogbnVtYmVyIHtyZXR1cm4gdGhpcy5teV9sYXllcjt9XHJcbiAgICBwdWJsaWMgc2V0X2xheWVyKGxheWVyOiBudW1iZXIpIHt0aGlzLm15X2xheWVyID0gbGF5ZXJ9XHJcblxyXG4gICAgcHVibGljIGxldHRlcigpOiAgc3RyaW5nfG51bGwge3JldHVybiB0aGlzLm15X2xldHRlcn1cclxuICAgIHB1YmxpYyBzZXRfbGV0dGVyKGxldHRlcjogc3RyaW5nfG51bGwpOiBzdHJpbmd8bnVsbCB7cmV0dXJuIHRoaXMubXlfbGV0dGVyID0gbGV0dGVyfVxyXG5cclxuICAgIHB1YmxpYyBjYW5TaG93KCk6IGJvb2xlYW4ge3JldHVybiB0aGlzLm15X3Nob3czRH07XHJcbiAgICBwdWJsaWMgc2V0U2hvdyhjYW5fc2hvdzogYm9vbGVhbik6IGJvb2xlYW4ge3JldHVybiB0aGlzLm15X3Nob3czRCA9IGNhbl9zaG93fTtcclxuXHJcbiAgICBwdWJsaWMgcGFkX3QoKTogIG51bWJlciB7cmV0dXJuIHRoaXMubXlfcGFkX3R9XHJcbiAgICBwdWJsaWMgcGFkX2QoKTogIG51bWJlciB7cmV0dXJuIHRoaXMubXlfcGFkX2R9XHJcbiAgICBwdWJsaWMgcGFkX3MoKTogIG51bWJlciB7cmV0dXJuIHRoaXMubXlfcGFkX3N9XHJcbiAgICBwdWJsaWMgc2V0X3BhZF90KHBhZF90OiBudW1iZXIpOiBudW1iZXIge3JldHVybiB0aGlzLm15X3BhZF90ID0gdGhpcy5teV9wYWRfZCArIHBhZF90IDwgMS4wID8gcGFkX3QgOiAwLjk5IC0gdGhpcy5teV9wYWRfZH1cclxuICAgIHB1YmxpYyBzZXRfcGFkX2QocGFkX2Q6IG51bWJlcik6IG51bWJlciB7cmV0dXJuIHRoaXMubXlfcGFkX2QgPSB0aGlzLm15X3BhZF90ICsgcGFkX2QgPCAxLjAgPyBwYWRfZCA6IDAuOTkgLSB0aGlzLm15X3BhZF90fVxyXG4gICAgcHVibGljIHNldF9wYWRfcyhwYWRfczogbnVtYmVyKTogbnVtYmVyIHtyZXR1cm4gdGhpcy5teV9wYWRfcyA9IHBhZF9zfVxyXG5cclxuICAgIHB1YmxpYyBjb2xfZigpOiBzdHJpbmd8bnVsbCB7cmV0dXJuIHRoaXMubXlfY29sX2Z9IFxyXG4gICAgcHVibGljIGNvbF9iKCk6IHN0cmluZ3xudWxsIHtyZXR1cm4gdGhpcy5teV9jb2xfYn0gXHJcbiAgICBwdWJsaWMgY29sX3MoKTogc3RyaW5nfG51bGwge3JldHVybiB0aGlzLm15X2NvbF9zfSBcclxuICAgIHB1YmxpYyBjb2xfdCgpOiBzdHJpbmd8bnVsbCB7cmV0dXJuIHRoaXMubXlfY29sX3R9IFxyXG4gICAgcHVibGljIGNvbF9kKCk6IHN0cmluZ3xudWxsIHtyZXR1cm4gdGhpcy5teV9jb2xfZH0gXHJcbiAgICBwdWJsaWMgY29sX2woKTogc3RyaW5nfG51bGwge3JldHVybiB0aGlzLm15X2NvbF9sfSBcclxuICAgIHB1YmxpYyBzZXRfY29sX2YoY29sX2Y6IHN0cmluZ3xudWxsKTogc3RyaW5nfG51bGwge3JldHVybiB0aGlzLm15X2NvbF9mID0gY29sX2Z9IFxyXG4gICAgcHVibGljIHNldF9jb2xfYihjb2xfYjogc3RyaW5nfG51bGwpOiBzdHJpbmd8bnVsbCB7cmV0dXJuIHRoaXMubXlfY29sX2IgPSBjb2xfYn0gXHJcbiAgICBwdWJsaWMgc2V0X2NvbF9zKGNvbF9zOiBzdHJpbmd8bnVsbCk6IHN0cmluZ3xudWxsIHtyZXR1cm4gdGhpcy5teV9jb2xfcyA9IGNvbF9zfSBcclxuICAgIHB1YmxpYyBzZXRfY29sX3QoY29sX3Q6IHN0cmluZ3xudWxsKTogc3RyaW5nfG51bGwge3JldHVybiB0aGlzLm15X2NvbF90ID0gY29sX3R9IFxyXG4gICAgcHVibGljIHNldF9jb2xfZChjb2xfZDogc3RyaW5nfG51bGwpOiBzdHJpbmd8bnVsbCB7cmV0dXJuIHRoaXMubXlfY29sX2QgPSBjb2xfZH0gXHJcbiAgICBwdWJsaWMgc2V0X2NvbF9sKGNvbF9sOiBzdHJpbmd8bnVsbCk6IHN0cmluZ3xudWxsIHtyZXR1cm4gdGhpcy5teV9jb2xfbCA9IGNvbF9sfSBcclxuXHJcblxyXG4gICAgcHVibGljIGRyb3czRChmcm90OiBUX1dhbGwsIGJhY2s6IFRfV2FsbCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZHJvd19vYmpfYmFjayAgICAgIChmcm90LCBiYWNrKTtcclxuICAgICAgICB0aGlzLmRyb3dfb2JqX2Rvd24gICAgICAoZnJvdCwgYmFjayk7XHJcbiAgICAgICAgdGhpcy5kcm93X29ial90b3AgICAgICAgKGZyb3QsIGJhY2spO1xyXG4gICAgICAgIHRoaXMuZHJvd19vYmpfcmlnaHRfc2lkZShmcm90LCBiYWNrKTtcclxuICAgICAgICB0aGlzLmRyb3dfb2JqX2xlZnRfc2lkZSAoZnJvdCwgYmFjayk7XHJcbiAgICAgICAgdGhpcy5kcm93X29ial9mcm9udCAgICAgKGZyb3QsIGJhY2spO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBkcm93X29ial9kb3duKFxyXG4gICAgICAgIGZyb3Q6ICBUX1dhbGwsIFxyXG4gICAgICAgIGJhY2s6ICBUX1dhbGwsIFxyXG4gICAgKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmNhblNob3coKSB8fCB0aGlzLmNvbF90KCkgPT09IG51bGwpIHJldHVybjtcclxuICAgICAgICBpZiAodGhpcy5wYWRfcygpIDw9IDAuMCAmJiB0aGlzLnBhZF90KCkgPj0gMS4wKSB7XHJcbiAgICAgICAgICAgIGRyb3dfY2VsbF9mbG9vcihmcm90LCBiYWNrLCB0aGlzLmNvbF90KCkgPz8gJyM2NjY2ZmYnLCB0aGlzLmNvbF9sKCkgPz8gJyM5OTk5ZmYnKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIGNvbnN0IG8gPSBfX2NhbGNfcGFkZGluZ19vYmoodGhpcywgZnJvdCwgYmFjayk7XHJcbiAgICAgICAgY29uc3QgcmVjdDogVF9SZWN0ID0ge1xyXG4gICAgICAgICAgICB0bDogby5mZGwsXHJcbiAgICAgICAgICAgIHRyOiBvLmZkcixcclxuICAgICAgICAgICAgZHI6IG8uYmRyLFxyXG4gICAgICAgICAgICBkbDogby5iZGwsXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRyb3dfY2VsbChyZWN0LCB0aGlzLmNvbF90KCksIHRoaXMuY29sX2woKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkcm93X29ial90b3AoXHJcbiAgICAgICAgZnJvdDogIFRfV2FsbCwgXHJcbiAgICAgICAgYmFjazogIFRfV2FsbCwgXHJcbiAgICApOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXRoaXMuY2FuU2hvdygpIHx8IHRoaXMuY29sX2QoKSA9PT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgIGlmICh0aGlzLnBhZF9zKCkgPD0gMC4wICYmIHRoaXMucGFkX2QoKSA+PSAxLjApIHtcclxuICAgICAgICAgICAgZHJvd19jZWxsX2NlaWxpbmcoZnJvdCwgYmFjaywgdGhpcy5jb2xfZCgpID8/ICcjYWFhYWFhJywgdGhpcy5jb2xfbCgpID8/ICcjOTk5OWZmJyk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBjb25zdCBvID0gX19jYWxjX3BhZGRpbmdfb2JqKHRoaXMsIGZyb3QsIGJhY2spO1xyXG4gICAgICAgIGNvbnN0IHJlY3Q6IFRfUmVjdCA9IHtcclxuICAgICAgICAgICAgdGw6IG8uZnRsLFxyXG4gICAgICAgICAgICB0cjogby5mdHIsXHJcbiAgICAgICAgICAgIGRyOiBvLmJ0cixcclxuICAgICAgICAgICAgZGw6IG8uYnRsLFxyXG4gICAgICAgIH1cclxuICAgICAgICBkcm93X2NlbGwocmVjdCwgdGhpcy5jb2xfZCgpLCB0aGlzLmNvbF9sKCkpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBkcm93X29ial9mcm9udChcclxuICAgICAgICBmcm90OiAgVF9XYWxsLCBcclxuICAgICAgICBiYWNrOiAgVF9XYWxsLCBcclxuICAgICk6IHZvaWQge1xyXG4gICAgICAgIGlmICghdGhpcy5jYW5TaG93KCkgfHwgdGhpcy5jb2xfZigpID09PSBudWxsKSByZXR1cm47XHJcbiAgICBcclxuICAgICAgICBjb25zdCBvID0gX19jYWxjX3BhZGRpbmdfb2JqKHRoaXMsIGZyb3QsIGJhY2spO1xyXG4gICAgICAgIGNvbnN0IHJlY3Q6IFRfUmVjdCA9IHtcclxuICAgICAgICAgICAgdGw6IG8uZnRsLCBcclxuICAgICAgICAgICAgdHI6IG8uZnRyLCBcclxuICAgICAgICAgICAgZHI6IG8uZmRyLCBcclxuICAgICAgICAgICAgZGw6IG8uZmRsLCBcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBkcm93X2NlbGwocmVjdCwgdGhpcy5jb2xfZigpLCB0aGlzLmNvbF9sKCkpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBkcm93X29ial9iYWNrKFxyXG4gICAgICAgIGZyb3Q6ICBUX1dhbGwsIFxyXG4gICAgICAgIGJhY2s6ICBUX1dhbGwsIFxyXG4gICAgKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmNhblNob3coKSB8fCB0aGlzLmNvbF9iKCkgPT09IG51bGwpIHJldHVybjtcclxuICAgIFxyXG4gICAgICAgIGNvbnN0IG8gPSBfX2NhbGNfcGFkZGluZ19vYmoodGhpcywgZnJvdCwgYmFjayk7XHJcbiAgICAgICAgY29uc3QgcmVjdDogVF9SZWN0ID0ge1xyXG4gICAgICAgICAgICB0bDogby5idGwsIFxyXG4gICAgICAgICAgICB0cjogby5idHIsIFxyXG4gICAgICAgICAgICBkcjogby5iZHIsIFxyXG4gICAgICAgICAgICBkbDogby5iZGwsIFxyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIGRyb3dfY2VsbChyZWN0LCB0aGlzLmNvbF9iKCksIHRoaXMuY29sX2woKSk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGRyb3dfb2JqX2xlZnRfc2lkZShcclxuICAgICAgICBmcm90OiAgVF9XYWxsLCBcclxuICAgICAgICBiYWNrOiAgVF9XYWxsLCBcclxuICAgICk6IHZvaWQge1xyXG4gICAgICAgIGlmICghdGhpcy5jYW5TaG93KCkgfHwgdGhpcy5jb2xfcygpID09PSBudWxsKSByZXR1cm47XHJcbiAgICBcclxuICAgICAgICBjb25zdCBvID0gX19jYWxjX3BhZGRpbmdfb2JqKHRoaXMsIGZyb3QsIGJhY2spO1xyXG4gICAgICAgIGNvbnN0IHJlY3Q6IFRfUmVjdCA9IHtcclxuICAgICAgICAgICAgdGw6IG8uYnRsLFxyXG4gICAgICAgICAgICB0cjogby5mdGwsXHJcbiAgICAgICAgICAgIGRyOiBvLmZkbCxcclxuICAgICAgICAgICAgZGw6IG8uYmRsLFxyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIGRyb3dfY2VsbChyZWN0LCB0aGlzLmNvbF9zKCksIHRoaXMuY29sX2woKSk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGRyb3dfb2JqX3JpZ2h0X3NpZGUoXHJcbiAgICAgICAgZnJvdDogIFRfV2FsbCwgXHJcbiAgICAgICAgYmFjazogIFRfV2FsbCwgXHJcbiAgICApOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXRoaXMuY2FuU2hvdygpIHx8IHRoaXMuY29sX3MoKSA9PT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgXHJcbiAgICAgICAgY29uc3QgbyA9IF9fY2FsY19wYWRkaW5nX29iaih0aGlzLCBmcm90LCBiYWNrKTtcclxuICAgICAgICBjb25zdCByZWN0OiBUX1JlY3QgPSB7XHJcbiAgICAgICAgICAgIHRsOiBvLmZ0cixcclxuICAgICAgICAgICAgdHI6IG8uYnRyLFxyXG4gICAgICAgICAgICBkcjogby5iZHIsXHJcbiAgICAgICAgICAgIGRsOiBvLmZkcixcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBkcm93X2NlbGwocmVjdCwgdGhpcy5jb2xfcygpLCB0aGlzLmNvbF9sKCkpO1xyXG4gICAgfVxyXG4gICAgXHJcblxyXG4gICAgcHVibGljIGVuY29kZSgpOiBKU09OX01hemVPYmpWaWV3IHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBjbmFtZTogICB0aGlzLmNsbmFtZSxcclxuICAgICAgICAgICAgbGF5ZXI6ICAgdGhpcy5teV9sYXllcixcclxuICAgICAgICAgICAgbGV0dGVyOiAgdGhpcy5teV9sZXR0ZXIgPz8gJycsXHJcbiAgICAgICAgICAgIHBhZF90OiAgIHRoaXMubXlfcGFkX3QsIFxyXG4gICAgICAgICAgICBwYWRfZDogICB0aGlzLm15X3BhZF9kLCBcclxuICAgICAgICAgICAgcGFkX3M6ICAgdGhpcy5teV9wYWRfcywgXHJcbiAgICAgICAgICAgIHNob3czRDogIHRoaXMuY2FuU2hvdygpID8gJzEnIDogJzAnLFxyXG4gICAgICAgICAgICBjb2xfZjogICB0aGlzLm15X2NvbF9mID8/ICcnLCAgXHJcbiAgICAgICAgICAgIGNvbF9iOiAgIHRoaXMubXlfY29sX2IgPz8gJycsICBcclxuICAgICAgICAgICAgY29sX3M6ICAgdGhpcy5teV9jb2xfcyA/PyAnJywgXHJcbiAgICAgICAgICAgIGNvbF90OiAgIHRoaXMubXlfY29sX3QgPz8gJycsIFxyXG4gICAgICAgICAgICBjb2xfZDogICB0aGlzLm15X2NvbF9kID8/ICcnLCBcclxuICAgICAgICAgICAgY29sX2w6ICAgdGhpcy5teV9jb2xfbCA/PyAnJywgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIGRlY29kZShqOiBKU09OX01hemVPYmpWaWV3fHVuZGVmaW5lZCk6IElfTWF6ZU9ialZpZXcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9faW5pdChqKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzdGF0aWMgZGVjb2RlKGo6IEpTT05fTWF6ZU9ialZpZXd8dW5kZWZpbmVkKTogSV9NYXplT2JqVmlldyB7XHJcbiAgICAgICAgcmV0dXJuIENfTWF6ZU9ialZpZXcubmV3T2JqKGopO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuXHJcbmZ1bmN0aW9uIF9fY2FsY19wYWRkaW5nX29iaihcclxuICAgIG9iajogICBJX01hemVPYmpWaWV3LFxyXG4gICAgZnJvdDogIFRfV2FsbCwgXHJcbiAgICBiYWNrOiAgVF9XYWxsLCBcclxuKToge1xyXG4gICAgLy8g6K2Y5Yil5a2Q44Gu5oSP5ZGzXHJcbiAgICAvLyDlt6bnq6/vvJrliY3lvozjga7ljLrliKXjgIBmOuWJjemdouOAgGI66IOM6Z2iXHJcbiAgICAvLyDkuK3lpK7vvJrkuIrkuIvjga7ljLrliKXjgIB0OuS4iui+uuOAgGQ65LiL6L66XHJcbiAgICAvLyDlj7Pnq6/vvJrlt6blj7Pjga7ljLrliKXjgIBsOuW3puWBtOOAgHI65Y+z5YG0XHJcbiAgICBmdGw6VF94eSwgZnRyOlRfeHksIGZkcjpUX3h5LCBmZGw6VF94eSwgXHJcbiAgICBidGw6VF94eSwgYnRyOlRfeHksIGJkcjpUX3h5LCBiZGw6VF94eSwgXHJcbn0ge1xyXG4gICAgY29uc3QgcmVjdF9mcm90ID0gZnJvdDtcclxuICAgIGNvbnN0IHJlY3RfYmFjayA9IGJhY2s7XHJcblxyXG4gICAgY29uc3QgcmF0aW9fWCAgID0gb2JqLnBhZF9zKCkgLyAyLjA7XHJcbiAgICBjb25zdCByYXRpb19UICAgPSBvYmoucGFkX3QoKTtcclxuICAgIGNvbnN0IHJhdGlvX0QgICA9IG9iai5wYWRfZCgpO1xyXG5cclxuICAgIGNvbnN0IGZyb3RfcGFkX1ggID0gTWF0aC5hYnMocmVjdF9mcm90Lm1heF94IC0gcmVjdF9mcm90Lm1pbl94KSAqIHJhdGlvX1g7XHJcbiAgICBjb25zdCBiYWNrX3BhZF9YICA9IE1hdGguYWJzKHJlY3RfYmFjay5tYXhfeCAtIHJlY3RfYmFjay5taW5feCkgKiByYXRpb19YO1xyXG5cclxuICAgIGNvbnN0IGZyb3RfcGFkX1QgID0gTWF0aC5hYnMocmVjdF9mcm90Lm1heF95IC0gcmVjdF9mcm90Lm1pbl95KSAqIHJhdGlvX1Q7XHJcbiAgICBjb25zdCBiYWNrX3BhZF9UICA9IE1hdGguYWJzKHJlY3RfYmFjay5tYXhfeSAtIHJlY3RfYmFjay5taW5feSkgKiByYXRpb19UO1xyXG5cclxuICAgIGNvbnN0IGZyb3RfcGFkX0QgID0gTWF0aC5hYnMocmVjdF9mcm90Lm1heF95IC0gcmVjdF9mcm90Lm1pbl95KSAqIHJhdGlvX0Q7XHJcbiAgICBjb25zdCBiYWNrX3BhZF9EICA9IE1hdGguYWJzKHJlY3RfYmFjay5tYXhfeSAtIHJlY3RfYmFjay5taW5feSkgKiByYXRpb19EO1xyXG5cclxuICAgIC8vIOODkeODh+OCo+ODs+OCsOioreWumuW+jOOBrlhZ5bqn5qiZ44KS6KiI566X44GZ44KL44Gf44KB44GrXHJcbiAgICAvLyDlv4XopoHjgarnt5rliIbjga7kvY3nva7msbrjgoHjgpLjgZnjgotcclxuICAgIGNvbnN0IGZyb3RfdG9wX2xmdCA9IHt4OiByZWN0X2Zyb3QubWluX3ggKyBmcm90X3BhZF9YLCB5OiByZWN0X2Zyb3QubWluX3kgKyBmcm90X3BhZF9UfVxyXG4gICAgY29uc3QgZnJvdF90b3Bfcmd0ID0ge3g6IHJlY3RfZnJvdC5tYXhfeCAtIGZyb3RfcGFkX1gsIHk6IHJlY3RfZnJvdC5taW5feSArIGZyb3RfcGFkX1R9XHJcbiAgICBjb25zdCBmcm90X2R3bl9sZnQgPSB7eDogcmVjdF9mcm90Lm1pbl94ICsgZnJvdF9wYWRfWCwgeTogcmVjdF9mcm90Lm1heF95IC0gZnJvdF9wYWRfRH1cclxuICAgIGNvbnN0IGZyb3RfZHduX3JndCA9IHt4OiByZWN0X2Zyb3QubWF4X3ggLSBmcm90X3BhZF9YLCB5OiByZWN0X2Zyb3QubWF4X3kgLSBmcm90X3BhZF9EfVxyXG5cclxuICAgIGNvbnN0IGJhY2tfdG9wX2xmdCA9IHt4OiByZWN0X2JhY2subWluX3ggKyBiYWNrX3BhZF9YLCB5OiByZWN0X2JhY2subWluX3kgKyBiYWNrX3BhZF9UfVxyXG4gICAgY29uc3QgYmFja190b3Bfcmd0ID0ge3g6IHJlY3RfYmFjay5tYXhfeCAtIGJhY2tfcGFkX1gsIHk6IHJlY3RfYmFjay5taW5feSArIGJhY2tfcGFkX1R9XHJcbiAgICBjb25zdCBiYWNrX2R3bl9sZnQgPSB7eDogcmVjdF9iYWNrLm1pbl94ICsgYmFja19wYWRfWCwgeTogcmVjdF9iYWNrLm1heF95IC0gYmFja19wYWRfRH1cclxuICAgIGNvbnN0IGJhY2tfZHduX3JndCA9IHt4OiByZWN0X2JhY2subWF4X3ggLSBiYWNrX3BhZF9YLCB5OiByZWN0X2JhY2subWF4X3kgLSBiYWNrX3BhZF9EfVxyXG5cclxuICAgIGxldCBmdGwgPSBfX2NhbGNfcGFkZGluZ194eShmcm90X3RvcF9sZnQsIGJhY2tfdG9wX2xmdCwgcmF0aW9fWCk7XHJcbiAgICBsZXQgZnRyID0gX19jYWxjX3BhZGRpbmdfeHkoZnJvdF90b3Bfcmd0LCBiYWNrX3RvcF9yZ3QsIHJhdGlvX1gpO1xyXG4gICAgbGV0IGZkbCA9IF9fY2FsY19wYWRkaW5nX3h5KGZyb3RfZHduX2xmdCwgYmFja19kd25fbGZ0LCByYXRpb19YKTtcclxuICAgIGxldCBmZHIgPSBfX2NhbGNfcGFkZGluZ194eShmcm90X2R3bl9yZ3QsIGJhY2tfZHduX3JndCwgcmF0aW9fWCk7XHJcblxyXG4gICAgbGV0IGJ0bCA9IF9fY2FsY19wYWRkaW5nX3h5KGJhY2tfdG9wX2xmdCwgZnJvdF90b3BfbGZ0LCByYXRpb19YKTtcclxuICAgIGxldCBidHIgPSBfX2NhbGNfcGFkZGluZ194eShiYWNrX3RvcF9yZ3QsIGZyb3RfdG9wX3JndCwgcmF0aW9fWCk7XHJcbiAgICBsZXQgYmRsID0gX19jYWxjX3BhZGRpbmdfeHkoYmFja19kd25fbGZ0LCBmcm90X2R3bl9sZnQsIHJhdGlvX1gpO1xyXG4gICAgbGV0IGJkciA9IF9fY2FsY19wYWRkaW5nX3h5KGJhY2tfZHduX3JndCwgZnJvdF9kd25fcmd0LCByYXRpb19YKTtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGZ0bDogZnRsLCBmdHI6IGZ0cixcclxuICAgICAgICBmZGw6IGZkbCwgZmRyOiBmZHIsXHJcbiAgICAgICAgYnRsOiBidGwsIGJ0cjogYnRyLFxyXG4gICAgICAgIGJkbDogYmRsLCBiZHI6IGJkcixcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBfX2NhbGNfcGFkZGluZ194eShmcm90OiBUX3h5LCBiYWNrOiBUX3h5LCByYXRpbzogbnVtYmVyKTogVF94eSB7XHJcbiAgICAgICAgLy8g57ea5YiGKEF4ICsgQiA9IHkp44Gu5pa556iL5byP44Gu5L+C5pWw44KS5rGC44KB44KLXHJcbiAgICAgICAgY29uc3QgQSA9IChmcm90LnkgLSBiYWNrLnkpIC8gKGZyb3QueCAtIGJhY2sueCk7XHJcbiAgICAgICAgY29uc3QgQiA9ICBmcm90LnkgLSBBICogZnJvdC54O1xyXG4gICAgXHJcbiAgICAgICAgLy8g44OR44OH44Kj44Oz44Kw6Kq/5pW05b6M44GuWFnluqfmqJnjga7oqIjnrpdcclxuICAgICAgICBjb25zdCBwX2Zyb3RfeCA9IGZyb3QueCArIChiYWNrLnggLSBmcm90LngpICogcmF0aW87XHJcbiAgICAgICAgY29uc3QgcF9mcm90X3kgPSBBICogcF9mcm90X3ggKyBCO1xyXG5cclxuICAgICAgICByZXR1cm4ge3g6IHBfZnJvdF94LCB5OiBwX2Zyb3RfeX07XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBkcm93X2NlbGxfZmxvb3IoXHJcbiAgICAgICAgcmVjdF9mcm90OiBUX1dhbGwsIFxyXG4gICAgICAgIHJlY3RfYmFjazogVF9XYWxsLCBcclxuICAgICAgICBmaWxsOiBzdHJpbmcgPSAnIzY2NjZmZicsIFxyXG4gICAgICAgIGxpbmU6IHN0cmluZyA9ICcjOTk5OWZmJ1xyXG4gICAgKTogdm9pZCB7XHJcblxyXG4gICAgY29uc3QgcmVjdDogVF9SZWN0ID0ge1xyXG4gICAgICAgIHRsOiB7eDogcmVjdF9mcm90Lm1pbl94LCB5OiByZWN0X2Zyb3QubWF4X3l9LFxyXG4gICAgICAgIHRyOiB7eDogcmVjdF9mcm90Lm1heF94LCB5OiByZWN0X2Zyb3QubWF4X3l9LFxyXG4gICAgICAgIGRyOiB7eDogcmVjdF9iYWNrLm1heF94LCB5OiByZWN0X2JhY2subWF4X3l9LFxyXG4gICAgICAgIGRsOiB7eDogcmVjdF9iYWNrLm1pbl94LCB5OiByZWN0X2JhY2subWF4X3l9XHJcbiAgICB9XHJcbiAgICBkcm93X2NlbGwocmVjdCwgZmlsbCwgbGluZSk7XHJcbn1cclxuZnVuY3Rpb24gZHJvd19jZWxsX2NlaWxpbmcoXHJcbiAgICAgICAgcmVjdF9mcm90OiBUX1dhbGwsIFxyXG4gICAgICAgIHJlY3RfYmFjazogVF9XYWxsLCBcclxuICAgICAgICBmaWxsOiBzdHJpbmcgPSAnI2FhYWFhYScsIFxyXG4gICAgICAgIGxpbmU6IHN0cmluZyA9ICcjOTk5OWZmJ1xyXG4gICAgKTogdm9pZCB7XHJcblxyXG4gICAgY29uc3QgcmVjdDogVF9SZWN0ID0ge1xyXG4gICAgICAgIHRsOiB7eDogcmVjdF9mcm90Lm1pbl94LCB5OiByZWN0X2Zyb3QubWluX3l9LFxyXG4gICAgICAgIHRyOiB7eDogcmVjdF9mcm90Lm1heF94LCB5OiByZWN0X2Zyb3QubWluX3l9LFxyXG4gICAgICAgIGRyOiB7eDogcmVjdF9iYWNrLm1heF94LCB5OiByZWN0X2JhY2subWluX3l9LFxyXG4gICAgICAgIGRsOiB7eDogcmVjdF9iYWNrLm1pbl94LCB5OiByZWN0X2JhY2subWluX3l9XHJcbiAgICB9XHJcbiAgICBkcm93X2NlbGwocmVjdCwgZmlsbCwgbGluZSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRyb3dfY2VsbChyOiBUX1JlY3QsIGZpbGw6IHN0cmluZ3xudWxsLCBsaW5lOiBzdHJpbmd8bnVsbCk6IHZvaWQge1xyXG4gICAgaWYgKENfTWF6ZU9ialZpZXcuY29uM0QgPT09IHVuZGVmaW5lZCkgcmV0dXJuO1xyXG4gICAgY29uc3QgY29uID0gQ19NYXplT2JqVmlldy5jb24zRDtcclxuXHJcbiAgICBjb24uYmVnaW5QYXRoKCk7XHJcbiAgICBjb24ubW92ZVRvKHIudGwueCwgci50bC55KTtcclxuICAgIGNvbi5saW5lVG8oci50ci54LCByLnRyLnkpO1xyXG4gICAgY29uLmxpbmVUbyhyLmRyLngsIHIuZHIueSk7XHJcbiAgICBjb24ubGluZVRvKHIuZGwueCwgci5kbC55KTtcclxuICAgIGNvbi5jbG9zZVBhdGgoKTtcclxuXHJcbiAgICBpZiAoZmlsbCAhPSBudWxsKSB7XHJcbiAgICAgICAgY29uLmZpbGxTdHlsZSAgID0gZmlsbDtcclxuICAgICAgICBjb24uZmlsbCgpO1xyXG4gICAgfVxyXG4gICAgaWYgKGxpbmUgIT09IG51bGwpIHtcclxuICAgICAgICBjb24uc3Ryb2tlU3R5bGUgPSBsaW5lO1xyXG4gICAgICAgIGNvbi5saW5lV2lkdGggICA9IDE7XHJcbiAgICAgICAgY29uLnN0cm9rZSgpO1xyXG4gICAgfVxyXG59XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5cclxuaW1wb3J0IHsgQ19Mb2NhdGlvbiwgSlNPTl9Mb2NhdGlvbiB9IGZyb20gXCIuL0NfTG9jYXRpb25cIjtcclxuaW1wb3J0IHsgSV9KU09OX1VuaXEgfSAgICAgICAgICAgICAgIGZyb20gXCIuL0NfU2F2ZUluZm9cIjtcclxuaW1wb3J0IHsgX2dldF91dWlkIH0gICAgICAgICAgICAgICAgIGZyb20gXCIuLi9kX3V0bC9GX1JhbmRcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSlNPTl9Nb3ZhYmxlUG9pbnQgZXh0ZW5kcyBKU09OX0xvY2F0aW9uIHtcclxuICAgIHVuaXFfaWQ/OiAgc3RyaW5nLFxyXG4gICAgY3VyX3VybD86ICBzdHJpbmcsXHJcbiAgICB0ZWFtX3VpZD86IHN0cmluZyxcclxufVxyXG5cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhbGVydF9tdnB0X2luZm8oYTogSlNPTl9Nb3ZhYmxlUG9pbnR8dW5kZWZpbmVkKTogdm9pZCB7XHJcbiAgICBpZiAoYSA9PT0gdW5kZWZpbmVkKSByZXR1cm47XHJcbiAgICBhbGVydChcIk12UHQgSW5mbzpcIiBcclxuICAgICAgICArIFwiXFxudW5pcV9pZDogIFwiICArIChhLnVuaXFfaWQgICAgPz8gJz8nKVxyXG4gICAgICAgICsgXCJcXG5jdXJfdXJsOiAgXCIgICsgKGEuY3VyX3VybCAgICA/PyAnPycpXHJcbiAgICAgICAgKyBcIlxcbnRlYW1fdWlkOiBcIiAgKyAoYS50ZWFtX3VpZCAgID8/ICc/JylcclxuICAgICAgICArIFwiXFxubGNrZDogXCIgICAgICArIChhLmtpbmQgICAgICAgPz8gJz8nKVxyXG4gICAgICAgICsgXCJcXG5sY25tOiBcIiAgICAgICsgKGEubmFtZSAgICAgICA/PyAnPycpXHJcbiAgICAgICAgKyBcIlxcbmxjaWQ6IFwiICAgICAgKyAoYS5sb2NfdWlkICAgID8/ICc/JylcclxuICAgICAgICArIFwiXFxuY3VyX3g6IFwiICAgICArIChhLmxvY19wb3M/LnggPz8gJz8nKVxyXG4gICAgICAgICsgXCJcXG5jdXJfeTogXCIgICAgICsgKGEubG9jX3Bvcz8ueSA/PyAnPycpXHJcbiAgICAgICAgKyBcIlxcbmN1cl96OiBcIiAgICAgKyAoYS5sb2NfcG9zPy56ID8/ICc/JylcclxuICAgICAgICArIFwiXFxuY3VyX2Q6IFwiICAgICArIChhLmxvY19wb3M/LmQgPz8gJz8nKVxyXG4gICAgICAgICsgXCJcXG5cIlxyXG4gICAgKTtcclxufVxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBDX01vdmFibGVQb2ludCBleHRlbmRzIENfTG9jYXRpb24gaW1wbGVtZW50cyBJX0pTT05fVW5pcSB7XHJcbiAgICBwcm90ZWN0ZWQgdW5pcV9pZDogIHN0cmluZztcclxuICAgIHByb3RlY3RlZCBjdXJfdXJsOiAgc3RyaW5nO1xyXG4gICAgcHJvdGVjdGVkIHRlYW1fdWlkOiBzdHJpbmd8dW5kZWZpbmVkO1xyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKGpzb24/OiBKU09OX01vdmFibGVQb2ludCkge1xyXG4gICAgICAgIHN1cGVyKGpzb24pO1xyXG4gICAgICAgIHRoaXMudW5pcV9pZCAgPSAnTXZQb2ludCMnICsgX2dldF91dWlkKCk7XHJcbiAgICAgICAgdGhpcy5jdXJfdXJsICA9ICcnO1xyXG4gICAgICAgIHRoaXMudGVhbV91aWQgPSB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgIGlmIChqc29uICE9PSB1bmRlZmluZWQgJiYganNvbiAhPT0gbnVsbCkgdGhpcy5kZWNvZGUoanNvbik7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgdWlkKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLnVuaXFfaWR9XHJcbiAgICBwdWJsaWMgdXJsKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLmN1cl91cmx9XHJcbiAgICBwdWJsaWMgdGlkKCk6IHN0cmluZ3x1bmRlZmluZWQgeyByZXR1cm4gdGhpcy50ZWFtX3VpZH1cclxuXHJcbiAgICBwdWJsaWMgbmV3X3VpZCgpOiB2b2lkIHt0aGlzLnVuaXFfaWQgPSAnTXZQb2ludCMnICsgX2dldF91dWlkKCk7fVxyXG4gICAgcHVibGljIHNldF91cmwodXJsOiBzdHJpbmcpOiB2b2lkIHsgdGhpcy5jdXJfdXJsICA9IHVybDt9XHJcbiAgICBwdWJsaWMgc2V0X3RpZCh0aWQ6IHN0cmluZyk6IHZvaWQgeyB0aGlzLnRlYW1fdWlkID0gdGlkO31cclxuXHJcbiAgICBwdWJsaWMgY2xvbmUoKTogQ19Nb3ZhYmxlUG9pbnQge1xyXG4gICAgICAgIGNvbnN0IG12cHQgPSBuZXcgQ19Nb3ZhYmxlUG9pbnQodGhpcy5lbmNvZGUoKSk7XHJcbiAgICAgICAgbXZwdC5uZXdfdWlkKCk7XHJcbiAgICAgICAgcmV0dXJuIG12cHQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGZyb21KU09OKHR4dDogc3RyaW5nKTogQ19Nb3ZhYmxlUG9pbnQge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGogPSBKU09OLnBhcnNlKHR4dCkgYXMgSlNPTl9Nb3ZhYmxlUG9pbnQ7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRlY29kZShqKTtcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIHB1YmxpYyB0b0pTT04oKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodGhpcy5lbmNvZGUoKSwgbnVsbCwgXCJcXHRcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBmcm9tX29ial90b19zdHJpbmcob2E6IENfTW92YWJsZVBvaW50KTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkob2EuZW5jb2RlKCkpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHN0YXRpYyBmcm9tX29iakFycmF5X3RvX3N0cmluZyhvYWE6IHtbdWlkOiBzdHJpbmddOiBDX01vdmFibGVQb2ludH0pOiBzdHJpbmcge1xyXG4gICAgICAgIGNvbnN0IG9hID0gW10gYXMgSlNPTl9Nb3ZhYmxlUG9pbnRbXTtcclxuICAgICAgICBmb3IgKGNvbnN0IGlpIGluIG9hYSkgb2EucHVzaChvYWFbaWldLmVuY29kZSgpKTtcclxuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkob2EpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHN0YXRpYyBmcm9tX3N0cmluZ190b19vYmoodHh0OiBzdHJpbmcpOiBDX01vdmFibGVQb2ludCB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgaiAgID0gSlNPTi5wYXJzZSh0eHQpIGFzIEpTT05fTW92YWJsZVBvaW50W107XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgQ19Nb3ZhYmxlUG9pbnQoKS5kZWNvZGUoaik7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgQ19Nb3ZhYmxlUG9pbnQoKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgcHVibGljIHN0YXRpYyBmcm9tX3N0cmluZ190b19vYmpBcnJheSh0eHQ6IHN0cmluZyk6IHtbdWlkOiBzdHJpbmddOiBDX01vdmFibGVQb2ludH0ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGogICA9IEpTT04ucGFyc2UodHh0KSBhcyBKU09OX01vdmFibGVQb2ludFtdO1xyXG4gICAgICAgICAgICBjb25zdCBtcGEgPSB7fSBhcyB7W2lkOiBzdHJpbmddOiBDX01vdmFibGVQb2ludH07XHJcbiAgICAgICAgICAgIGZvciAoY29uc3Qgamogb2Ygaikge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYWFhID0gbmV3IENfTW92YWJsZVBvaW50KCkuZGVjb2RlKGpqKTtcclxuICAgICAgICAgICAgICAgIG1wYVthYWEudWlkKCldID0gYWFhO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBtcGE7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7fTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBlbmNvZGUoKTogSlNPTl9Nb3ZhYmxlUG9pbnQge1xyXG4gICAgICAgIGNvbnN0IGogPSBzdXBlci5lbmNvZGUoKSBhcyBKU09OX01vdmFibGVQb2ludDtcclxuICAgICAgICBqLnVuaXFfaWQgID0gdGhpcy51bmlxX2lkO1xyXG4gICAgICAgIGouY3VyX3VybCAgPSB0aGlzLmN1cl91cmw7XHJcbiAgICAgICAgai50ZWFtX3VpZCA9IHRoaXMudGVhbV91aWQgPz8gJyc7XHJcbiAgICAgICAgcmV0dXJuIGo7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZGVjb2RlKGo/OiBKU09OX01vdmFibGVQb2ludCk6IENfTW92YWJsZVBvaW50IHtcclxuICAgICAgICBzdXBlci5kZWNvZGUoaik7XHJcbiAgICAgICAgaWYgKGogPT09IHVuZGVmaW5lZCkgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgaWYgKGoudW5pcV9pZCAgIT09IHVuZGVmaW5lZCkgdGhpcy51bmlxX2lkICA9IGoudW5pcV9pZDtcclxuICAgICAgICBpZiAoai5jdXJfdXJsICAhPT0gdW5kZWZpbmVkKSB0aGlzLmN1cl91cmwgID0gai5jdXJfdXJsO1xyXG4gICAgICAgIGlmIChqLnRlYW1fdWlkICE9PSB1bmRlZmluZWQpIHRoaXMudGVhbV91aWQgPSBqLnRlYW1fdWlkO1xyXG5cclxuICAgICAgICBpZiAodGhpcy50ZWFtX3VpZCA9PT0gJycpIHRoaXMudGVhbV91aWQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBhbGVydCgpOiB2b2lkIHtcclxuICAgICAgICBhbGVydChcIk12UHQgSW5mbzpcIiBcclxuICAgICAgICAgICAgKyBcIlxcbnVuaXFfaWQ6ICBcIiAgKyAodGhpcy51bmlxX2lkICAgID8/ICc/JylcclxuICAgICAgICAgICAgKyBcIlxcbmN1cl91cmw6ICBcIiAgKyAodGhpcy5jdXJfdXJsICAgID8/ICc/JylcclxuICAgICAgICAgICAgKyBcIlxcbnRlYW1fdWlkOiBcIiAgKyAodGhpcy50ZWFtX3VpZCAgID8/ICc/JylcclxuICAgICAgICAgICAgKyBcIlxcbmxja2Q6IFwiICAgICAgKyAodGhpcy5sb2Nfa2luZCAgID8/ICc/JylcclxuICAgICAgICAgICAgKyBcIlxcbmxjbm06IFwiICAgICAgKyAodGhpcy5sb2NfbmFtZSAgID8/ICc/JylcclxuICAgICAgICAgICAgKyBcIlxcbmxjaWQ6IFwiICAgICAgKyAodGhpcy5sb2NfdWlkICAgID8/ICc/JylcclxuICAgICAgICAgICAgKyBcIlxcbmN1cl94OiBcIiAgICAgKyAodGhpcy5sb2NfcG9zPy54ID8/ICc/JylcclxuICAgICAgICAgICAgKyBcIlxcbmN1cl95OiBcIiAgICAgKyAodGhpcy5sb2NfcG9zPy55ID8/ICc/JylcclxuICAgICAgICAgICAgKyBcIlxcbmN1cl96OiBcIiAgICAgKyAodGhpcy5sb2NfcG9zPy56ID8/ICc/JylcclxuICAgICAgICAgICAgKyBcIlxcbmN1cl9kOiBcIiAgICAgKyAodGhpcy5sb2NfcG9zPy5kID8/ICc/JylcclxuICAgICAgICAgICAgKyBcIlxcblwiXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuXHJcbmltcG9ydCB7IElfSlNPTiwgSlNPTl9BbnkgfSBmcm9tIFwiLi9DX1NhdmVJbmZvXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEpTT05fUG9pbnQgZXh0ZW5kcyBKU09OX0FueSB7XHJcbiAgICB4PzogbnVtYmVyLFxyXG4gICAgeT86IG51bWJlcixcclxuICAgIHo/OiBudW1iZXIsXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBDX1BvaW50IGltcGxlbWVudHMgSV9KU09Oe1xyXG4gICAgcHVibGljIHg6IG51bWJlcjtcclxuICAgIHB1YmxpYyB5OiBudW1iZXI7XHJcbiAgICBwdWJsaWMgejogbnVtYmVyO1xyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHg/OiBudW1iZXJ8Q19Qb2ludHxKU09OX1BvaW50fHVuZGVmaW5lZCwgeT86IG51bWJlciwgej86IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMueCA9IHRoaXMueSA9IHRoaXMueiA9IC0zO1xyXG5cclxuICAgICAgICBpZiAoeCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMueCA9IDA7IHRoaXMueSA9IDA7IHRoaXMueiA9IDA7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiB4ID09PSBcIm51bWJlclwiICYmIHR5cGVvZiB5ID09PSBcIm51bWJlclwiICYmIHR5cGVvZiB6ID09PSBcIm51bWJlclwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMueCA9IHg7IHRoaXMueSA9IHk7IHRoaXMueiA9IHo7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiB4ID09PSBcIm9iamVjdFwiKSB7IFxyXG4gICAgICAgICAgICBpZiAoeCBpbnN0YW5jZW9mIENfUG9pbnQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMueCA9IHgueDsgdGhpcy55ID0geC55OyB0aGlzLnogPSB4Lno7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlY29kZSh4KTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnggPSB0aGlzLnkgPSB0aGlzLnogPSAtMjtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldF9wKCk6IENfUG9pbnQge3JldHVybiBuZXcgQ19Qb2ludCh0aGlzKX0gXHJcbiAgICBwdWJsaWMgc2V0X3AocDogQ19Qb2ludCk6IENfUG9pbnR8dW5kZWZpbmVkIHtcclxuICAgICAgICB0aGlzLnggPSBwLng7IHRoaXMueSA9IHAueTsgdGhpcy56ID0gcC56O1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpc19leGlzdCh4OiBudW1iZXIsIHk6IG51bWJlciwgejogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuICh4ID09IHRoaXMueCAmJiB5ID09IHRoaXMueSAmJiB6ID09IHRoaXMueik7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgd2l0aGluKHA6IENfUG9pbnQpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gKHAueCA9PSB0aGlzLnggJiYgcC55ID09IHRoaXMueSAmJiBwLnogPT0gdGhpcy56KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIGVuY29kZSgpOiBKU09OX1BvaW50IHtcclxuICAgICAgICByZXR1cm4ge3g6IHRoaXMueCwgeTogdGhpcy55LCB6OiB0aGlzLnp9O1xyXG4gICAgfVxyXG4gICAgcHVibGljIGRlY29kZShhPzogSlNPTl9Qb2ludCk6IENfUG9pbnQge1xyXG4gICAgICAgIGlmIChhID09PSB1bmRlZmluZWQpIHJldHVybiB0aGlzO1xyXG4gICAgICAgIGlmIChhLnggPT09IHVuZGVmaW5lZCB8fCBhLnkgPT09IHVuZGVmaW5lZCB8fCBhLnogPT09IHVuZGVmaW5lZCkgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgdGhpcy54ID0gYS54OyB0aGlzLnkgPSBhLnk7IHRoaXMueiA9IGEuejtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxufVxyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuXHJcbmltcG9ydCB7IENfUG9pbnQsIEpTT05fUG9pbnQgfSBmcm9tICcuL0NfUG9pbnQnO1xyXG5pbXBvcnQge1RfTWFrZUVudW1UeXBlfSAgICAgICAgZnJvbSBcIi4uL2RfdXRsL1RfTWFrZUVudW1UeXBlXCI7XHJcblxyXG5leHBvcnQgY29uc3QgVF9EaXJlY3Rpb246e1tkaXI6IHN0cmluZ106IG51bWJlcn0gPSB7XHJcbiAgICBOOiAwLFxyXG4gICAgRTogMSxcclxuICAgIFM6IDIsXHJcbiAgICBXOiAzLFxyXG4gICAgWDogOTlcclxufSBhcyBjb25zdDtcclxuZXhwb3J0IHR5cGUgVF9EaXJlY3Rpb24gPSBUX01ha2VFbnVtVHlwZTx0eXBlb2YgVF9EaXJlY3Rpb24+O1xyXG5cclxuZnVuY3Rpb24gX2Rpcl9rZXkoZGlyOiBUX0RpcmVjdGlvbiB8IHVuZGVmaW5lZCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gT2JqZWN0LmtleXMoVF9EaXJlY3Rpb24pLmZpbmQoa2V5ID0+IFRfRGlyZWN0aW9uW2tleV0gPT09IGRpcikgPz8gXCI/Pz8/XCI7XHJcbn1cclxuXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEpTT05fUG9pbnREaXIgZXh0ZW5kcyBKU09OX1BvaW50IHtcclxuICAgIGQ/OiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhbGVydF9QRF9pbmZvKGE6IEpTT05fUG9pbnREaXJ8dW5kZWZpbmVkKTogdm9pZCB7XHJcbiAgICBpZiAoYSA9PT0gdW5kZWZpbmVkKSByZXR1cm47XHJcbiAgICBhbGVydChcIlBvaW50RGF0YSBJbmZvOlwiIFxyXG4gICAgICAgICsgXCJcXG54OiBcIiAgICAgKyAoYT8ueCA/PyAnPycpXHJcbiAgICAgICAgKyBcIlxcbnk6IFwiICAgICArIChhPy55ID8/ICc/JylcclxuICAgICAgICArIFwiXFxuejogXCIgICAgICsgKGE/LnogPz8gJz8nKVxyXG4gICAgICAgICsgXCJcXG5kOiBcIiAgICAgKyAoYT8uZCA/PyAnPycpXHJcbiAgICAgICAgKyBcIlxcblwiXHJcbiAgICApO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgIENfUG9pbnREaXIgZXh0ZW5kcyBDX1BvaW50IHtcclxuICAgIHB1YmxpYyBkOiBUX0RpcmVjdGlvbjtcclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihkPzogbnVtYmVyfFRfRGlyZWN0aW9ufENfUG9pbnREaXJ8SlNPTl9Qb2ludERpcikge1xyXG4gICAgICAgIHN1cGVyKGQpO1xyXG4gICAgICAgIHRoaXMuZCA9IFRfRGlyZWN0aW9uLlg7XHJcblxyXG4gICAgICAgIGlmIChkID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIGQgPT09IFwibnVtYmVyXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5kID0gZCBhcyBUX0RpcmVjdGlvbjtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIGQgPT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICAgICAgaWYgKGQgaW5zdGFuY2VvZiBDX1BvaW50RGlyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmQgPSBkLmQgYXMgVF9EaXJlY3Rpb247XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlY29kZShkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZCA9IFRfRGlyZWN0aW9uLlg7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldF9kX21iX25hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICBzd2l0Y2ggKHRoaXMuZCkge1xyXG4gICAgICAgICAgICBjYXNlIDA6ICByZXR1cm4gJ+WMlyc7XHJcbiAgICAgICAgICAgIGNhc2UgMTogIHJldHVybiAn5p2xJztcclxuICAgICAgICAgICAgY2FzZSAyOiAgcmV0dXJuICfljZcnO1xyXG4gICAgICAgICAgICBjYXNlIDM6ICByZXR1cm4gJ+ilvyc7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiAn6KyOJztcclxuICAgICAgICB9ICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0X2QoKTogVF9EaXJlY3Rpb24ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmQ7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0X2QoZDogVF9EaXJlY3Rpb24pOiBDX1BvaW50RGlyfHVuZGVmaW5lZCB7XHJcbiAgICAgICAgaWYgKCEoX2Rpcl9rZXkoZCkgaW4gVF9EaXJlY3Rpb24pKSByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIHRoaXMuZCA9IGQ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0X3BkKCk6IENfUG9pbnREaXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldF9wZChkOiBDX1BvaW50RGlyfEpTT05fUG9pbnREaXIpOiBDX1BvaW50RGlyfHVuZGVmaW5lZCB7XHJcbiAgICAgICAgaWYgKGQgaW5zdGFuY2VvZiBDX1BvaW50RGlyKSB7XHJcbiAgICAgICAgICAgIGlmICghKF9kaXJfa2V5KGQuZCkgaW4gVF9EaXJlY3Rpb24pKSByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICBzdXBlci5zZXRfcChkKTtcclxuICAgICAgICAgICAgdGhpcy5kID0gZC5kO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCEoX2Rpcl9rZXkoZC5kKSBpbiBUX0RpcmVjdGlvbikpIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhpcy5kZWNvZGUoZCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGVuY29kZSgpOiBKU09OX1BvaW50RGlyIHtcclxuICAgICAgICBjb25zdCBqID0gc3VwZXIuZW5jb2RlKCkgYXMgSlNPTl9Qb2ludERpcjtcclxuICAgICAgICBqLmQgICAgID0gdGhpcy5kIGFzIG51bWJlcjtcclxuICAgICAgICByZXR1cm4gajtcclxuICAgIH1cclxuICAgIHB1YmxpYyBkZWNvZGUoaj86IEpTT05fUG9pbnREaXIpOiBDX1BvaW50RGlyIHtcclxuICAgICAgICBpZiAoaiA9PT0gdW5kZWZpbmVkKSByZXR1cm4gdGhpcztcclxuICAgICAgICBpZiAoIShfZGlyX2tleShqLmQpIGluIFRfRGlyZWN0aW9uKSkgcmV0dXJuIHRoaXM7XHJcblxyXG4gICAgICAgIHN1cGVyLmRlY29kZShqKTtcclxuICAgICAgICB0aGlzLmQgPSBqLmQgYXMgVF9EaXJlY3Rpb247XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBhbGVydCgpOiB2b2lkIHtcclxuICAgICAgICBhbGVydChcIlBvaW50RGF0YSBJbmZvOlwiIFxyXG4gICAgICAgICAgICArIFwiXFxueDogXCIgICAgICsgKHRoaXMueCA/PyAnPycpXHJcbiAgICAgICAgICAgICsgXCJcXG55OiBcIiAgICAgKyAodGhpcy55ID8/ICc/JylcclxuICAgICAgICAgICAgKyBcIlxcbno6IFwiICAgICArICh0aGlzLnogPz8gJz8nKVxyXG4gICAgICAgICAgICArIFwiXFxuZDogXCIgICAgICsgKHRoaXMuZCA/PyAnPycpXHJcbiAgICAgICAgICAgICsgXCJcXG5cIlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuIiwiY2xhc3MgQ19Qb2ludDJEIHtcclxuICAgIHB1YmxpYyB4OiBudW1iZXI7XHJcbiAgICBwdWJsaWMgeTogbnVtYmVyO1xyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHg6IG51bWJlciA9IDAsIHk6IG51bWJlciA9IDApXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy54ICA9IHg7XHJcbiAgICAgICAgdGhpcy55ICA9IHk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgaXNfZXhpc3QoeDogbnVtYmVyLCB5OiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gKHRoaXMueCA9PSB4KSAmJiAodGhpcy55ID09IHkpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQ19Qb2ludExpbmsyRCBleHRlbmRzIENfUG9pbnQyRCB7XHJcbiAgICBwdWJsaWMgZGk6IG51bWJlcjtcclxuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcih4OiBudW1iZXIgPSAwLCB5OiBudW1iZXIgPSAwLCBkaTogbnVtYmVyID0gLTEpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoeCwgeSk7XHJcbiAgICAgICAgdGhpcy5kaSA9IGRpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHN0YXRpYyBjYXN0KHA6IENfUG9pbnQyRHx1bmRlZmluZWQpOiBDX1BvaW50TGluazJEfHVuZGVmaW5lZCB7XHJcbiAgICAgICAgaWYgKHA/LnggPT09IHVuZGVmaW5lZCkgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICBpZiAocD8ueSA9PT0gdW5kZWZpbmVkKSByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIHJldHVybiBwIGluc3RhbmNlb2YgQ19Qb2ludExpbmsyRCA/IHAgOiBuZXcgQ19Qb2ludExpbmsyRChwLngsIHAueSk7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5leHBvcnQgY2xhc3MgQ19Qb2ludFNldDJEIHtcclxuICAgIHB1YmxpYyBzZXQ6IENfUG9pbnQyRFtdID1bXTtcclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG4gICAgcHVibGljIHB1c2gocDogQ19Qb2ludDJEKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zZXQucHVzaChwKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0X3BvaW50KHg6IG51bWJlciwgeTogbnVtYmVyKTogQ19Qb2ludDJEfHVuZGVmaW5lZCB7XHJcbiAgICAgICAgZm9yIChjb25zdCBwIG9mIHRoaXMuc2V0KSB7XHJcbiAgICAgICAgICAgIGlmIChwPy5pc19leGlzdCh4LCB5KSkgcmV0dXJuIHA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7ICAgICAgICAgICAgXHJcbiAgICB9XHJcbiAgICBwdWJsaWMgcmVtb3ZlKHA6IENfUG9pbnQyRCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucmVtb3ZlX3h5KHAueCwgcC55KTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgcmVtb3ZlX3h5KHg6IG51bWJlciwgeTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgZm9yIChjb25zdCBpIGluIHRoaXMuc2V0KSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNldFtpXT8uaXNfZXhpc3QoeCwgeSkpIHtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLnNldFtpXTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0ID0gWy4uLnRoaXMuc2V0XTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHB1YmxpYyBpc19leGlzdCh4OiBudW1iZXIsIHk6IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIGZvciAoY29uc3QgcCBvZiB0aGlzLnNldCkgaWYgKHA/LmlzX2V4aXN0KHgsIHkpKSByZXR1cm4gdHJ1ZTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qXHJcbmNsYXNzIFBvaW50M0Qge1xyXG4gICAgcHVibGljIGludCAkeDtcclxuICAgIHB1YmxpYyBpbnQgJHk7XHJcbiAgICBwdWJsaWMgaW50ICR6O1xyXG4gICAgcHVibGljIGZ1bmN0aW9uIF9fY29uc3RydWN0KGludCAkeCA9IDAsIGludCAkeSA9IDAsIGludCAkeiA9IDApXHJcbiAgICB7XHJcbiAgICAgICAgJHRoaXMtPnggID0gJHg7XHJcbiAgICAgICAgJHRoaXMtPnkgID0gJHk7XHJcbiAgICAgICAgJHRoaXMtPnogID0gJHo7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZnVuY3Rpb24gaXNfZXhpc3QoaW50ICR4LCBpbnQgJHksIGludCAkeik6IGJvb2wge1xyXG4gICAgICAgIHJldHVybiAoJHRoaXMtPnggPT0gJHgpICYmICgkdGhpcy0+eSA9PSAkeSkgJiYgKCR0aGlzLT56ID09ICR6KTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBmdW5jdGlvbiB3aXRoaW4oUG9pbnQzRCAkcCk6IGJvb2wge1xyXG4gICAgICAgIHJldHVybiAkdGhpcy0+aXNfZXhpc3QoJHAtPngsICRwLT55LCAkcC0+eik7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZnVuY3Rpb24gZW5jb2RlKCk6IGFycmF5IHtcclxuICAgICAgICAkYSA9IFtdO1xyXG4gICAgICAgICRhWyd4J10gPSAkdGhpcy0+eDtcclxuICAgICAgICAkYVsneSddID0gJHRoaXMtPnk7XHJcbiAgICAgICAgJGFbJ3onXSA9ICR0aGlzLT56O1xyXG5cclxuICAgICAgICByZXR1cm4gJGE7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZnVuY3Rpb24gZGVjb2RlKGFycmF5ICRhKTogUG9pbnQzRCB7XHJcbiAgICAgICAgaWYgKCFpc19udWxsKCRhKSAmJiBpc19hcnJheSgkYSkpIHtcclxuICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgYXJyYXlfa2V5X2V4aXN0cygneCcsICRhKSAmJiAoaXNfbnVtZXJpYygkYVsneCddKSAmJiAkYVsneCddID4gIDApXHJcbiAgICAgICAgICAgICYmICBhcnJheV9rZXlfZXhpc3RzKCd5JywgJGEpICYmIChpc19udW1lcmljKCRhWyd5J10pICYmICRhWyd5J10gPiAgMClcclxuICAgICAgICAgICAgJiYgIGFycmF5X2tleV9leGlzdHMoJ3onLCAkYSkgJiYgKGlzX251bWVyaWMoJGFbJ3onXSkgJiYgJGFbJ3onXSA+PSAwKVxyXG4gICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICR0aGlzLT54ID0gJGFbJ3gnXTtcclxuICAgICAgICAgICAgICAgICR0aGlzLT55ID0gJGFbJ3knXTtcclxuICAgICAgICAgICAgICAgICR0aGlzLT56ID0gJGFbJ3onXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gJHRoaXM7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc3RhdGljIGZ1bmN0aW9uIGRlY29kZV9hbmRfbmV3KGFycmF5ICRhKTogUG9pbnQzRCB7XHJcbiAgICAgICAgaWYgKCFpc19udWxsKCRhKSAmJiBpc19hcnJheSgkYSkpIHtcclxuICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgYXJyYXlfa2V5X2V4aXN0cygneCcsICRhKSAmJiAoaXNfbnVtZXJpYygkYVsneCddKSAmJiAkYVsneCddID4gIDApXHJcbiAgICAgICAgICAgICYmICBhcnJheV9rZXlfZXhpc3RzKCd5JywgJGEpICYmIChpc19udW1lcmljKCRhWyd5J10pICYmICRhWyd5J10gPiAgMClcclxuICAgICAgICAgICAgJiYgIGFycmF5X2tleV9leGlzdHMoJ3onLCAkYSkgJiYgKGlzX251bWVyaWMoJGFbJ3onXSkgJiYgJGFbJ3onXSA+PSAwKVxyXG4gICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUG9pbnQzRCgkYVsneCddLCAkYVsneSddLCAkYVsneiddKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV3IFBvaW50M0QoLTEsIC0xLCAtMSk7XHJcbiAgICB9XHJcbn1cclxuKi9cclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5pbXBvcnQgeyBfbWF4LCBfbWluIH0gICAgICAgICAgIGZyb20gXCIuLi9kX3V0bC9GX01hdGhcIjtcclxuaW1wb3J0IHsgQ19Qb2ludCwgSlNPTl9Qb2ludCB9ICBmcm9tIFwiLi9DX1BvaW50XCI7XHJcbmltcG9ydCB7IEpTT05fQW55IH0gICAgICAgICAgICAgZnJvbSBcIi4vQ19TYXZlSW5mb1wiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBKU09OX1JhbmdlIGV4dGVuZHMgSlNPTl9Bbnkge1xyXG4gICAgbWluPzogICBKU09OX1BvaW50LCBcclxuICAgIG1heD86ICAgSlNPTl9Qb2ludCwgXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBDX1JhbmdlIHtcclxuICAgIHByb3RlY3RlZCBtaW46IENfUG9pbnQ7XHJcbiAgICBwcm90ZWN0ZWQgbWF4OiBDX1BvaW50O1xyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHAxOiBDX1BvaW50LCBwMjogQ19Qb2ludCkge1xyXG4gICAgICAgIHRoaXMubWluICA9IG5ldyBDX1BvaW50KDAsIDAsIDApO1xyXG4gICAgICAgIHRoaXMubWF4ICA9IG5ldyBDX1BvaW50KDAsIDAsIDApO1xyXG4gICAgICAgIHRoaXMuX2luaXQocDEsIHAyKTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBfaW5pdChwMTogQ19Qb2ludCwgcDI6IENfUG9pbnQpOiBDX1JhbmdlIHtcclxuICAgICAgICBjb25zdCBtaW5feCA9IF9taW4oW3AxLngsIHAyLnhdKTtcclxuICAgICAgICBjb25zdCBtYXhfeCA9IF9tYXgoW3AxLngsIHAyLnhdKTtcclxuXHJcbiAgICAgICAgY29uc3QgbWluX3kgPSBfbWluKFtwMS55LCBwMi55XSk7XHJcbiAgICAgICAgY29uc3QgbWF4X3kgPSBfbWF4KFtwMS55LCBwMi55XSk7XHJcblxyXG4gICAgICAgIGNvbnN0IG1pbl96ID0gX21pbihbcDEueiwgcDIuel0pO1xyXG4gICAgICAgIGNvbnN0IG1heF96ID0gX21heChbcDEueiwgcDIuel0pO1xyXG5cclxuICAgICAgICB0aGlzLm1pbiAgPSBuZXcgQ19Qb2ludChtaW5feCwgbWluX3ksIG1pbl96KTtcclxuICAgICAgICB0aGlzLm1heCAgPSBuZXcgQ19Qb2ludChtYXhfeCwgbWF4X3ksIG1heF96KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHdpdGhpbihhOiBDX1JhbmdlfENfUG9pbnR8bnVtYmVyLCB5PzogbnVtYmVyLCB6PzogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBhID09PSBcIm51bWJlclwiICYmIHR5cGVvZiB5ID09PSBcIm51bWJlclwiICYmIHR5cGVvZiB6ID09PSBcIm51bWJlclwiKSB7IFxyXG4gICAgICAgICAgICBpZiAoIGEgPCB0aGlzLm1pbi54IHx8IGEgPiB0aGlzLm1heC54ICkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAoIHkgPCB0aGlzLm1pbi55IHx8IHkgPiB0aGlzLm1heC55ICkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAoIHogPCB0aGlzLm1pbi56IHx8IHogPiB0aGlzLm1heC56ICkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiBhID09PSBcIm9iamVjdFwiICYmIGEgaW5zdGFuY2VvZiBDX1BvaW50KSB7IFxyXG4gICAgICAgICAgICBjb25zdCBwID0gYSBhcyBDX1BvaW50O1xyXG4gICAgICAgICAgICBpZiAoIHAueCA8IHRoaXMubWluLnggfHwgcC54ID4gdGhpcy5tYXgueCApIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKCBwLnkgPCB0aGlzLm1pbi55IHx8IHAueSA+IHRoaXMubWF4LnkgKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmICggcC56IDwgdGhpcy5taW4ueiB8fCBwLnogPiB0aGlzLm1heC56ICkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiBhID09PSBcIm9iamVjdFwiICYmIGEgaW5zdGFuY2VvZiBDX1JhbmdlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHAgPSBhIGFzIENfUmFuZ2U7XHJcbiAgICAgICAgICAgIGlmICggcC5taW5feCgpIDwgdGhpcy5taW4ueCB8fCBwLm1heF94KCkgPiB0aGlzLm1heC54ICkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAoIHAubWluX3koKSA8IHRoaXMubWluLnkgfHwgcC5tYXhfeSgpID4gdGhpcy5tYXgueSApIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKCBwLm1pbl96KCkgPCB0aGlzLm1pbi56IHx8IHAubWF4X3ooKSA+IHRoaXMubWF4LnogKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgbWluX3goKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMubWluLng7fVxyXG4gICAgcHVibGljIG1heF94KCk6IG51bWJlciB7IHJldHVybiB0aGlzLm1heC54O31cclxuICAgIHB1YmxpYyBtaW5feSgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5taW4ueTt9XHJcbiAgICBwdWJsaWMgbWF4X3koKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMubWF4Lnk7fVxyXG4gICAgcHVibGljIG1pbl96KCk6IG51bWJlciB7IHJldHVybiB0aGlzLm1pbi56O31cclxuICAgIHB1YmxpYyBtYXhfeigpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5tYXguejt9XHJcbiAgICBwdWJsaWMgc2l6ZV94KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubWF4LnggLSB0aGlzLm1pbi54ICsgMTtcclxuICAgIH0gXHJcbiAgICBwdWJsaWMgc2l6ZV95KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubWF4LnkgLSB0aGlzLm1pbi55ICsgMTtcclxuICAgIH0gXHJcbiAgICBwdWJsaWMgc2l6ZV96KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubWF4LnogLSB0aGlzLm1pbi56ICsgMTtcclxuICAgIH0gXHJcbiAgICBwdWJsaWMgZG9fYWxsX3h5eihmbjogKHg6IG51bWJlciwgeTogbnVtYmVyLCB6OiBudW1iZXIpID0+IGJvb2xlYW4pIHtcclxuICAgICAgICBmb3IgKHZhciB6ID0gdGhpcy5taW4uejsgeiA8PSB0aGlzLm1heC56OyB6KysgKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIHkgPSB0aGlzLm1pbi55OyB5IDw9IHRoaXMubWF4Lnk7IHkrKyApIHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIHggPSB0aGlzLm1pbi54OyB5IDw9IHRoaXMubWF4Lng7IHgrKyApIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWZuKHgsIHksIHopKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZG9fYWxsX3AoZm46IChwOiBDX1BvaW50KSA9PiBib29sZWFuKSB7XHJcbiAgICAgICAgZm9yICh2YXIgeiA9IHRoaXMubWluLno7IHogPD0gdGhpcy5tYXguejsgeisrICkge1xyXG4gICAgICAgICAgICBmb3IgKHZhciB5ID0gdGhpcy5taW4ueTsgeSA8PSB0aGlzLm1heC55OyB5KysgKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciB4ID0gdGhpcy5taW4ueDsgeSA8PSB0aGlzLm1heC54OyB4KysgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFmbihuZXcgQ19Qb2ludCh4LCB5LCB6KSkpIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBlbmNvZGUoKTogSlNPTl9SYW5nZSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbWluOiB0aGlzLm1pbi5lbmNvZGUoKSxcclxuICAgICAgICAgICAgbWF4OiB0aGlzLm1pbi5lbmNvZGUoKSxcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZGVjb2RlKGo6IEpTT05fUmFuZ2UpOiBDX1JhbmdlIHtcclxuICAgICAgICBpZiAoaiA9PT0gdW5kZWZpbmVkKSAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgaWYgKGoubWluID09PSB1bmRlZmluZWQpIHJldHVybiB0aGlzO1xyXG4gICAgICAgIGlmIChqLm1heCA9PT0gdW5kZWZpbmVkKSByZXR1cm4gdGhpcztcclxuICAgICAgICBjb25zdCBwMSA9IG5ldyBDX1BvaW50KGoubWluKTtcclxuICAgICAgICBjb25zdCBwMiA9IG5ldyBDX1BvaW50KGoubWF4KTtcclxuICAgICAgICByZXR1cm4gdGhpcy5faW5pdChwMSwgcDIpO1xyXG4gICAgfVxyXG59XHJcblxyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuXHJcbmltcG9ydCB7IENfTWF6ZSwgSlNPTl9NYXplLCBhbGVydF9tYXplX2luZm8gIH0gIGZyb20gXCIuL0NfTWF6ZVwiO1xyXG5pbXBvcnQgeyBDX0d1aWxkLCBKU09OX0d1aWxkLCBhbGVydF9ndWxkX2luZm8gfSBmcm9tIFwiLi9DX0d1aWxkXCI7XHJcbmltcG9ydCB7IENfTW92YWJsZVBvaW50LCBKU09OX01vdmFibGVQb2ludCwgYWxlcnRfbXZwdF9pbmZvIH0gZnJvbSBcIi4vQ19Nb3ZhYmxlUG9pbnRcIjtcclxuaW1wb3J0IHsgQ19UZWFtLCBKU09OX1RlYW0sIGFsZXJ0X3RlYW1faW5mbyAgfSAgZnJvbSBcIi4vQ19UZWFtXCI7XHJcbmltcG9ydCB7IENfU2F2ZUluZm8sIElfSlNPTiwgSlNPTl9BbnksIEpTT05fU2F2ZUluZm8gfSBmcm9tIFwiLi9DX1NhdmVJbmZvXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEpTT05fU2F2ZURhdGEgZXh0ZW5kcyBKU09OX1NhdmVJbmZvIHtcclxuICAgIHNhdmVfaWQ/OiAgIG51bWJlcixcclxuICAgIHBsYXllcl9pZD86IG51bWJlciwgXHJcbiAgICB1bmlxX25vPzogICBudW1iZXIsXHJcbiAgICB0aXRsZT86ICAgICBzdHJpbmcsXHJcbiAgICBkZXRhaWw/OiAgICBzdHJpbmcsXHJcbiAgICBwb2ludD86ICAgICBzdHJpbmcsXHJcbiAgICBhdXRvX21vZGU/OiBzdHJpbmcsXHJcbiAgICBpc19hY3RpdmU/OiBzdHJpbmcsXHJcbiAgICBpc19kZWxldGU/OiBzdHJpbmcsXHJcbiAgICBzYXZlX3RpbWU/OiBzdHJpbmcsXHJcblxyXG4gICAgYWxsX212cHQ/OiAgSlNPTl9Nb3ZhYmxlUG9pbnRbXSxcclxuICAgIGFsbF9tYXplPzogIEpTT05fTWF6ZVtdLFxyXG4gICAgYWxsX3RlYW0/OiAgSlNPTl9UZWFtW10sXHJcbiAgICBhbGxfZ3VsZD86ICBKU09OX0d1aWxkW10sXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhbGVydF9zYXZlX2luZm8oYTogSlNPTl9TYXZlRGF0YXx1bmRlZmluZWQpOiB2b2lkIHtcclxuICAgIGlmIChhID09PSB1bmRlZmluZWQpIHJldHVybjtcclxuICAgIGFsZXJ0KFwiU2F2ZSBJbmZvOlwiIFxyXG4gICAgICAgICsgXCJcXG5zYXZlX2lkOiAgICBcIiArIChhLnNhdmVfaWQgICA/PyAnPycpXHJcbiAgICAgICAgKyBcIlxcbnBsYXllcl9pZDogIFwiICsgKGEucGxheWVyX2lkID8/ICc/JylcclxuICAgICAgICArIFwiXFxudW5pcV9ubzogICAgXCIgKyAoYS51bmlxX25vICAgPz8gJz8nKVxyXG4gICAgICAgICsgXCJcXG50aXRsZTogICAgICBcIiArIChhLnRpdGxlICAgICA/PyAnPycpXHJcbiAgICAgICAgKyBcIlxcbmRldGFpbDogICAgIFwiICsgKGEuZGV0YWlsICAgID8/ICc/JylcclxuICAgICAgICArIFwiXFxucG9pbnQ6ICAgICAgXCIgKyAoYS5wb2ludCAgICAgPz8gJz8nKVxyXG4gICAgICAgICsgXCJcXG5hdXRvX21vZGU6ICBcIiArIChhLmF1dG9fbW9kZSA/PyAnPycpXHJcbiAgICAgICAgKyBcIlxcbmlzX2FjdGl2ZTogIFwiICsgKGEuaXNfYWN0aXZlID8/ICc/JylcclxuICAgICAgICArIFwiXFxuaXNfZGVsZXRlOiAgXCIgKyAoYS5pc19kZWxldGUgPz8gJz8nKVxyXG4gICAgICAgICsgXCJcXG5tdnB0X2NvdW50OiBcIiArIChhLmFsbF9tdnB0Py5sZW5ndGggPz8gJz8nKVxyXG4gICAgICAgICsgXCJcXG5tYXplX2NvdW50OiBcIiArIChhLmFsbF9tYXplPy5sZW5ndGggPz8gJz8nKVxyXG4gICAgICAgICsgXCJcXG5ndWxkX2NvdW50OiBcIiArIChhLmFsbF9ndWxkPy5sZW5ndGggPz8gJz8nKVxyXG4gICAgICAgICsgXCJcXG50ZWFtX2NvdW50OiBcIiArIChhLmFsbF90ZWFtPy5sZW5ndGggPz8gJz8nKVxyXG4gICAgICAgICsgXCJcXG5cIlxyXG4gICAgKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFsZXJ0X3NhdmVfZGV0YWlsKGE6IEpTT05fU2F2ZURhdGF8dW5kZWZpbmVkKTogdm9pZCB7XHJcbiAgICBpZiAoYSA9PT0gdW5kZWZpbmVkKSByZXR1cm47XHJcblxyXG4gICAgdHJ5IHsgXHJcbi8vICAgICAgICBhbGVydChcIlNhdmUgRGV0YWlsKG12cHQpOlwiKTtcclxuICAgICAgICBmb3IgKGNvbnN0IG12cHQgb2YgYS5hbGxfbXZwdD8/W10pIGFsZXJ0X212cHRfaW5mbyhtdnB0KTtcclxuICAgIH0gY2F0Y2ggKGVycikge2FsZXJ0KCdhbGVydCBtdnB0IGVycm9yOiAnICsgZXJyKX1cclxuXHJcbiAgICB0cnkgeyBcclxuLy8gICAgICAgIGFsZXJ0KFwiU2F2ZSBEZXRhaWwodGVhbSk6XCIpO1xyXG4gICAgICAgIGZvciAoY29uc3QgdGVhbSBvZiBhLmFsbF90ZWFtPz9bXSkgYWxlcnRfdGVhbV9pbmZvKHRlYW0pO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7YWxlcnQoJ2FsZXJ0IHRlYW0gZXJyb3I6ICcgKyBlcnIpfVxyXG5cclxuICAgIHRyeSB7IFxyXG4vLyAgICAgICAgYWxlcnQoXCJTYXZlIERldGFpbChtYXplKTpcIik7XHJcbiAgICAgICAgZm9yIChjb25zdCBtYXplIG9mIGEuYWxsX21hemU/P1tdKSBhbGVydF9tYXplX2luZm8obWF6ZSk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHthbGVydCgnYWxlcnQgbWF6ZSBlcnJvcjogJyArIGVycil9XHJcblxyXG4gICAgdHJ5IHsgXHJcbi8vICAgICAgICBhbGVydChcIlNhdmUgRGV0YWlsKGd1bGQpOlwiKTtcclxuICAgICAgICBmb3IgKGNvbnN0IGd1bGQgb2YgYS5hbGxfZ3VsZD8/W10pIGFsZXJ0X2d1bGRfaW5mbyhndWxkKTtcclxuICAgIH0gY2F0Y2ggKGVycikge2FsZXJ0KCdhbGVydCBndWxkIGVycm9yOiAnICsgZXJyKX1cclxufVxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBDX1NhdmVEYXRhIGV4dGVuZHMgQ19TYXZlSW5mbyBpbXBsZW1lbnRzIElfSlNPTiB7XHJcblxyXG4vKlxyXG4gICAgcHVibGljIHNhdmVfaWQ6ICAgbnVtYmVyO1xyXG4gICAgcHVibGljIHBsYXllcl9pZDogbnVtYmVyOyBcclxuICAgIHB1YmxpYyB1bmlxX25vOiAgIG51bWJlcjtcclxuICAgIHB1YmxpYyB0aXRsZTogICAgIHN0cmluZztcclxuICAgIHB1YmxpYyBkZXRhaWw6ICAgIHN0cmluZztcclxuICAgIHB1YmxpYyBwb2ludDogICAgIHN0cmluZztcclxuICAgIHB1YmxpYyBhdXRvX21vZGU6IGJvb2xlYW47XHJcbiAgICBwdWJsaWMgaXNfYWN0aXZlOiBib29sZWFuO1xyXG4gICAgcHVibGljIGlzX2RlbGV0ZTogYm9vbGVhbjtcclxuICAgIHB1YmxpYyBzYXZlX3RpbWU6IERhdGU7XHJcbiAgICBwdWJsaWMgbXlwb3M6ICAgICBDX01vdmFibGVQb2ludDtcclxuKi9cclxuXHJcbiAgICBwdWJsaWMgYWxsX212cHQ6ICB7W3VpZDogc3RyaW5nXTogQ19Nb3ZhYmxlUG9pbnR9O1xyXG4gICAgcHVibGljIGFsbF9tYXplOiAge1t1aWQ6IHN0cmluZ106IENfTWF6ZX07XHJcbiAgICBwdWJsaWMgYWxsX3RlYW06ICB7W3VpZDogc3RyaW5nXTogQ19UZWFtfTtcclxuICAgIHB1YmxpYyBhbGxfZ3VsZDogIHtbdWlkOiBzdHJpbmddOiBDX0d1aWxkfTtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoYT86IEpTT05fU2F2ZURhdGEpIHtcclxuICAgICAgICBzdXBlcihhKTtcclxuXHJcbiAgICAgICAgdGhpcy5hbGxfbXZwdCAgPSB7fTtcclxuICAgICAgICB0aGlzLmFsbF9tYXplICA9IHt9O1xyXG4gICAgICAgIHRoaXMuYWxsX3RlYW0gID0ge31cclxuICAgICAgICB0aGlzLmFsbF9ndWxkICA9IHt9O1xyXG5cclxuICAgICAgICBpZiAoYSAhPT0gdW5kZWZpbmVkKSB0aGlzLmRlY29kZShhKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIG5ldyhhPzogSlNPTl9TYXZlRGF0YSk6IENfU2F2ZURhdGEge1xyXG4gICAgICAgIHJldHVybiBuZXcgQ19TYXZlRGF0YShhKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZW5jb2RlKCk6IEpTT05fU2F2ZURhdGEge1xyXG4gICAgICAgIGxldCBzYXZlX2RhdGU6IHN0cmluZztcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCBzYXZlX2RhdGEgICAgPSBzdXBlci5lbmNvZGUoKSBhcyBKU09OX1NhdmVEYXRhO1xyXG5cclxuICAgICAgICAgICAgc2F2ZV9kYXRhLmFsbF9tdnB0ID0gdGhpcy5fZW5jb2RlX2FsbF9kYXRhKHRoaXMuYWxsX212cHQpOyBcclxuICAgICAgICAgICAgc2F2ZV9kYXRhLmFsbF9tYXplID0gdGhpcy5fZW5jb2RlX2FsbF9kYXRhKHRoaXMuYWxsX21hemUpOyBcclxuICAgICAgICAgICAgc2F2ZV9kYXRhLmFsbF90ZWFtID0gdGhpcy5fZW5jb2RlX2FsbF9kYXRhKHRoaXMuYWxsX3RlYW0pOyBcclxuICAgICAgICAgICAgc2F2ZV9kYXRhLmFsbF9ndWxkID0gdGhpcy5fZW5jb2RlX2FsbF9kYXRhKHRoaXMuYWxsX2d1bGQpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHNhdmVfZGF0YTtcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgYWxlcnQoJ1NhdmVEYXRhIEVuY29kZSBFcnJvcjogJyArIGVycik7XHJcbiAgICAgICAgICAgIHJldHVybiB7fTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgX2VuY29kZV9hbGxfZGF0YShhbGxfZGF0YToge1t1aWQ6c3RyaW5nXTpJX0pTT059KTogSlNPTl9BbnlbXSB7XHJcbiAgICAgICAgY29uc3QgYWxsX0pTT046IEpTT05fQW55W10gPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpIGluIGFsbF9kYXRhKSBhbGxfSlNPTi5wdXNoKGFsbF9kYXRhW2ldLmVuY29kZSgpKTtcclxuICAgICAgICByZXR1cm4gYWxsX0pTT047XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRlY29kZShzOiBKU09OX1NhdmVEYXRhKTogQ19TYXZlRGF0YSB7XHJcbiAgICAgICAgc3VwZXIuZGVjb2RlKHMpO1xyXG5cclxuICAgICAgICBpZiAocy5hbGxfbXZwdCAgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLmFsbF9tdnB0ID0ge307XHJcbiAgICAgICAgICAgIGZvciAoY29uc3QganNvbl9tdnB0IG9mIHMuYWxsX212cHQpIHtcclxuICAgICAgICAgICAgICAgICBjb25zdCBtdnB0ID0gKG5ldyBDX01vdmFibGVQb2ludCgpKS5kZWNvZGUoanNvbl9tdnB0KTsgXHJcbiAgICAgICAgICAgICAgICAgdGhpcy5hbGxfbXZwdFttdnB0LnVpZCgpXSA9IG12cHQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IFxyXG4gICAgICAgIGlmIChzLmFsbF9tYXplICAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWxsX21hemUgPSB7fTtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBqc29uX21hemUgb2Ygcy5hbGxfbWF6ZSkge1xyXG4gICAgICAgICAgICAgICAgIGNvbnN0IG1hemUgPSAobmV3IENfTWF6ZSgpKS5kZWNvZGUoanNvbl9tYXplKTsgXHJcbiAgICAgICAgICAgICAgICAgdGhpcy5hbGxfbWF6ZVttYXplLnVpZCgpXSA9IG1hemU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IFxyXG4gICAgICAgIGlmIChzLmFsbF90ZWFtICAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWxsX3RlYW0gPSB7fTtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBqc29uX3RlYW0gb2Ygcy5hbGxfdGVhbSkge1xyXG4gICAgICAgICAgICAgICAgIGNvbnN0IHRlYW0gPSAobmV3IENfVGVhbSgpKS5kZWNvZGUoanNvbl90ZWFtKTsgXHJcbiAgICAgICAgICAgICAgICAgdGhpcy5hbGxfdGVhbVt0ZWFtLnVpZCgpXSA9IHRlYW07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IFxyXG4gICAgICAgIGlmIChzLmFsbF9ndWxkICAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWxsX2d1bGQgPSB7fTtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBqc29uX2d1bGQgb2Ygcy5hbGxfZ3VsZCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZ3VsZCA9IChuZXcgQ19HdWlsZCgpKS5kZWNvZGUoanNvbl9ndWxkKTsgXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFsbF9ndWxkW2d1bGQudWlkKCldID0gZ3VsZDtcclxuICAgICAgICAgICB9XHJcbiAgICAgICAgfSBcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIGFsZXJ0KCk6IHZvaWQge1xyXG4gICAgICAgIGFsZXJ0KFwiU2F2ZSBJbmZvOlwiIFxyXG4gICAgICAgICAgICArIFwiXFxuc2F2ZV9pZDogICAgXCIgKyAodGhpcy5zYXZlX2lkICAgPz8gJz8nKVxyXG4gICAgICAgICAgICArIFwiXFxucGxheWVyX2lkOiAgXCIgKyAodGhpcy5wbGF5ZXJfaWQgPz8gJz8nKVxyXG4gICAgICAgICAgICArIFwiXFxudW5pcV9ubzogICAgXCIgKyAodGhpcy51bmlxX25vICAgPz8gJz8nKVxyXG4gICAgICAgICAgICArIFwiXFxudGl0bGU6ICAgICAgXCIgKyAodGhpcy50aXRsZSAgICAgPz8gJz8nKVxyXG4gICAgICAgICAgICArIFwiXFxuZGV0YWlsOiAgICAgXCIgKyAodGhpcy5kZXRhaWwgICAgPz8gJz8nKVxyXG4gICAgICAgICAgICArIFwiXFxucG9pbnQ6ICAgICAgXCIgKyAodGhpcy5wb2ludCAgICAgPz8gJz8nKVxyXG4gICAgICAgICAgICArIFwiXFxuYXV0b19tb2RlOiAgXCIgKyAodGhpcy5hdXRvX21vZGU/J1knOidOJylcclxuICAgICAgICAgICAgKyBcIlxcbmlzX2FjdGl2ZTogIFwiICsgKHRoaXMuaXNfYWN0aXZlPydZJzonTicpXHJcbiAgICAgICAgICAgICsgXCJcXG5pc19kZWxldGU6ICBcIiArICh0aGlzLmlzX2RlbGV0ZT8nWSc6J04nKVxyXG4gICAgICAgICAgICArIFwiXFxubXZwdF9jb3VudDogXCIgKyAodGhpcy5hbGxfbXZwdD8ubGVuZ3RoID8/ICc/JylcclxuICAgICAgICAgICAgKyBcIlxcbm1hemVfY291bnQ6IFwiICsgKHRoaXMuYWxsX21hemU/Lmxlbmd0aCA/PyAnPycpXHJcbiAgICAgICAgICAgICsgXCJcXG5ndWxkX2NvdW50OiBcIiArICh0aGlzLmFsbF9ndWxkPy5sZW5ndGggPz8gJz8nKVxyXG4gICAgICAgICAgICArIFwiXFxudGVhbV9jb3VudDogXCIgKyAodGhpcy5hbGxfdGVhbT8ubGVuZ3RoID8/ICc/JylcclxuICAgICAgICAgICAgKyBcIlxcblwiXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWxlcnRfZGV0YWlsKCk6IHZvaWQge1xyXG4gICAgICAgIHRyeSB7IFxyXG4vLyAgICAgICAgICAgIGFsZXJ0KFwiU2F2ZSBEZXRhaWwobXZwdCk6XCIpO1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGlpIGluIHRoaXMuYWxsX212cHQpIHRoaXMuYWxsX212cHRbaWldLmFsZXJ0KCk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7YWxlcnQoJ2FsZXJ0IG12cHQgZXJyb3I6ICcgKyBlcnIpfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB0cnkgeyBcclxuLy8gICAgICAgICAgICBhbGVydChcIlNhdmUgRGV0YWlsKHRlYW0pOlwiKTtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBpaSBpbiB0aGlzLmFsbF90ZWFtKSB0aGlzLmFsbF90ZWFtW2lpXS5hbGVydCgpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge2FsZXJ0KCdhbGVydCB0ZWFtIGVycm9yOiAnICsgZXJyKX1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgdHJ5IHsgXHJcbi8vICAgICAgICAgICAgYWxlcnQoXCJTYXZlIERldGFpbChtYXplKTpcIik7XHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgaWkgaW4gdGhpcy5hbGxfbWF6ZSkgdGhpcy5hbGxfbWF6ZVtpaV0uYWxlcnQoKTtcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHthbGVydCgnYWxlcnQgbWF6ZSBlcnJvcjogJyArIGVycil9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIHRyeSB7IFxyXG4vLyAgICAgICAgICAgIGFsZXJ0KFwiU2F2ZSBEZXRhaWwoZ3VsZCk6XCIpO1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGlpIGluIHRoaXMuYWxsX2d1bGQpIHRoaXMuYWxsX2d1bGRbaWldLmFsZXJ0KCk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7YWxlcnQoJ2FsZXJ0IGd1bGQgZXJyb3I6ICcgKyBlcnIpfVxyXG4gICAgICAgICAgICBcclxuICAgIH1cclxufVxyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuXHJcbmltcG9ydCB7IENfTW92YWJsZVBvaW50LCBKU09OX01vdmFibGVQb2ludCB9IGZyb20gXCIuL0NfTW92YWJsZVBvaW50XCI7XHJcblxyXG4vLyDjgrXjg7zjg5Djg7zlgbTjgajjgoTjgorjgajjgorjgZnjgotKU09O5b2i5byP44OH44O844K/44Gu44OG44Oz44OX44Os44O844OIXHJcbmV4cG9ydCBpbnRlcmZhY2UgSlNPTl9Bbnkge1xyXG4gICAgW2tleTogc3RyaW5nXTogYW55XHJcbn1cclxuXHJcbi8vIOOCteODvOODkOODvOWBtOOBqOOChOOCiuOBqOOCiuOBmeOCi+OCr+ODqeOCueOBq+W/heimgeOBquODoeOCveODg+ODiVxyXG5leHBvcnQgaW50ZXJmYWNlIElfSlNPTiB7XHJcbiAgICBlbmNvZGU6ICgpPT5KU09OX0FueSxcclxuICAgIGRlY29kZTogKGo6SlNPTl9BbnkpPT5JX0pTT04sXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSV9KU09OX1VuaXEgZXh0ZW5kcyBJX0pTT04ge1xyXG4gICAgdWlkOiAoKT0+c3RyaW5nLFxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElfQWJzdHJhY3Qge1xyXG4gICAgbmV3T2JqOiAoaj86SlNPTl9BbnkpPT5JX0Fic3RyYWN0fHVuZGVmaW5lZCxcclxuICAgIGVuY29kZTogKCk9PkpTT05fQW55LFxyXG4vLyAgc3RhdGljIGRlY29kZTogKGo6SlNPTl9BbnkpPT5JX0pTT04sXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSV9KU09OX0NsYXNzIHtcclxuICAgIG5ldzogKGo/OiBKU09OX0FueSk9PklfSlNPTixcclxufVxyXG5cclxuLy8g44K144O844OQ44O85YG044Go44KE44KK5Y+W44KK44GZ44KL6Zqb44Gr6Ieq6Lqr44KS5paH5a2X5YiX5YyW44GZ44KL44Kv44Op44K544Gu44Oh44K944OD44OJXHJcbmV4cG9ydCBpbnRlcmZhY2UgSV9KU09OVmFsdWUgZXh0ZW5kcyBJX0pTT057XHJcbiAgICBmcm9tSlNPTjogKCk9PnZvaWQsXHJcbiAgICB0b0pTT046ICAgKCk9PnZvaWQsXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSlNPTl9TYXZlSW5mbyBleHRlbmRzIEpTT05fQW55IHtcclxuICAgIHNhdmVfaWQ/OiAgIG51bWJlcixcclxuICAgIHBsYXllcl9pZD86IG51bWJlciwgXHJcbiAgICB1bmlxX25vPzogICBudW1iZXIsXHJcbiAgICB0aXRsZT86ICAgICBzdHJpbmcsXHJcbiAgICBkZXRhaWw/OiAgICBzdHJpbmcsXHJcbiAgICBwb2ludD86ICAgICBzdHJpbmcsXHJcbiAgICBhdXRvX21vZGU/OiBzdHJpbmcsXHJcbiAgICBpc19hY3RpdmU/OiBzdHJpbmcsXHJcbiAgICBpc19kZWxldGU/OiBzdHJpbmcsXHJcbiAgICBzYXZlX3RpbWU/OiBzdHJpbmcsXHJcbiAgICBteXBvcz86ICAgICBKU09OX01vdmFibGVQb2ludCxcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFsZXJ0X3NhdmVpbmZvX2luZm8oYTogSlNPTl9TYXZlSW5mb3x1bmRlZmluZWQpOiB2b2lkIHtcclxuICAgIGlmIChhID09PSB1bmRlZmluZWQpIHJldHVybjtcclxuICAgIGFsZXJ0KFwiU2F2ZSBJbmZvOlwiIFxyXG4gICAgICAgICsgXCJcXG5zYXZlX2lkOiAgICBcIiArIChhLnNhdmVfaWQgICA/PyAnPycpXHJcbiAgICAgICAgKyBcIlxcbnBsYXllcl9pZDogIFwiICsgKGEucGxheWVyX2lkID8/ICc/JylcclxuICAgICAgICArIFwiXFxudW5pcV9ubzogICAgXCIgKyAoYS51bmlxX25vICAgPz8gJz8nKVxyXG4gICAgICAgICsgXCJcXG50aXRsZTogICAgICBcIiArIChhLnRpdGxlICAgICA/PyAnPycpXHJcbiAgICAgICAgKyBcIlxcbmRldGFpbDogICAgIFwiICsgKGEuZGV0YWlsICAgID8/ICc/JylcclxuICAgICAgICArIFwiXFxucG9pbnQ6ICAgICAgXCIgKyAoYS5wb2ludCAgICAgPz8gJz8nKVxyXG4gICAgICAgICsgXCJcXG5hdXRvX21vZGU6ICBcIiArIChhLmF1dG9fbW9kZSA/PyAnPycpXHJcbiAgICAgICAgKyBcIlxcbmlzX2FjdGl2ZTogIFwiICsgKGEuaXNfYWN0aXZlID8/ICc/JylcclxuICAgICAgICArIFwiXFxuaXNfZGVsZXRlOiAgXCIgKyAoYS5pc19kZWxldGUgPz8gJz8nKVxyXG4gICAgICAgICsgXCJcXG5zYXZlX3RpbWU6ICBcIiArIChhLnNhdmVfdGltZSA/PyAnPycpXHJcbiAgICAgICAgKyBcIlxcbm15dXJsOiAgICAgIFwiICsgKGEubXlwb3M/LmN1cl91cmwgICA/PyAnPycpXHJcbiAgICAgICAgKyBcIlxcbnRlYW1fdWlkOiAgIFwiICsgKGEubXlwb3M/LnRlYW1fdWlkICA/PyAnPycpXHJcbiAgICAgICAgKyBcIlxcbmxvY19raW5kOiAgIFwiICsgKGEubXlwb3M/LmtpbmQgICAgICA/PyAnPycpXHJcbiAgICAgICAgKyBcIlxcbmxvY19uYW1lOiAgIFwiICsgKGEubXlwb3M/Lm5hbWUgICAgICA/PyAnPycpXHJcbiAgICAgICAgKyBcIlxcbmxvY191aWQ6ICAgIFwiICsgKGEubXlwb3M/LmxvY191aWQgICA/PyAnPycpXHJcbiAgICAgICAgKyBcIlxcblwiXHJcbiAgICApO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQ19TYXZlSW5mbyBpbXBsZW1lbnRzIElfSlNPTiB7XHJcbiAgICBwdWJsaWMgc2F2ZV9pZDogICBudW1iZXI7XHJcbiAgICBwdWJsaWMgcGxheWVyX2lkOiBudW1iZXI7IFxyXG4gICAgcHVibGljIHVuaXFfbm86ICAgbnVtYmVyO1xyXG4gICAgcHVibGljIHRpdGxlOiAgICAgc3RyaW5nO1xyXG4gICAgcHVibGljIGRldGFpbDogICAgc3RyaW5nO1xyXG4gICAgcHVibGljIHBvaW50OiAgICAgc3RyaW5nO1xyXG4gICAgcHVibGljIGF1dG9fbW9kZTogYm9vbGVhbjtcclxuICAgIHB1YmxpYyBpc19hY3RpdmU6IGJvb2xlYW47XHJcbiAgICBwdWJsaWMgaXNfZGVsZXRlOiBib29sZWFuO1xyXG4gICAgcHVibGljIHNhdmVfdGltZTogRGF0ZTtcclxuICAgIHB1YmxpYyBteXBvczogICAgIENfTW92YWJsZVBvaW50O1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihhPzogSlNPTl9TYXZlSW5mbykge1xyXG4gICAgICAgIHRoaXMuc2F2ZV9pZCAgID0gLTE7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJfaWQgPSAtMTsgXHJcbiAgICAgICAgdGhpcy51bmlxX25vICAgPSAtMTtcclxuICAgICAgICB0aGlzLnRpdGxlICAgICA9ICcnO1xyXG4gICAgICAgIHRoaXMuZGV0YWlsICAgID0gJyc7XHJcbiAgICAgICAgdGhpcy5wb2ludCAgICAgPSAnJztcclxuICAgICAgICB0aGlzLmF1dG9fbW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaXNfYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmlzX2RlbGV0ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc2F2ZV90aW1lID0gbmV3IERhdGUoKTtcclxuXHJcbiAgICAgICAgdGhpcy5teXBvcyAgICAgPSBuZXcgQ19Nb3ZhYmxlUG9pbnQoKTtcclxuXHJcbiAgICAgICAgaWYgKGEgIT09IHVuZGVmaW5lZCkgdGhpcy5kZWNvZGUoYSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBuZXcoYT86IEpTT05fU2F2ZUluZm8pOiBDX1NhdmVJbmZvIHtcclxuICAgICAgICByZXR1cm4gbmV3IENfU2F2ZUluZm8oYSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGVuY29kZSgpOiBKU09OX1NhdmVJbmZvIHtcclxuICAgICAgICBsZXQgc2F2ZV9kYXRlOiBzdHJpbmc7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgc2F2ZV9kYXRlID0gdGhpcy5zYXZlX3RpbWUudG9JU09TdHJpbmcoKTtcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgc2F2ZV9kYXRlID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHNhdmVfaWQ6ICAgdGhpcy5zYXZlX2lkLCBcclxuICAgICAgICAgICAgICAgIHBsYXllcl9pZDogdGhpcy5wbGF5ZXJfaWQsICBcclxuICAgICAgICAgICAgICAgIHVuaXFfbm86ICAgdGhpcy51bmlxX25vLCBcclxuICAgICAgICAgICAgICAgIHRpdGxlOiAgICAgdGhpcy50aXRsZSwgXHJcbiAgICAgICAgICAgICAgICBkZXRhaWw6ICAgIHRoaXMuZGV0YWlsLCBcclxuICAgICAgICAgICAgICAgIHBvaW50OiAgICAgdGhpcy5wb2ludCwgXHJcbiAgICAgICAgICAgICAgICBhdXRvX21vZGU6IHRoaXMuYXV0b19tb2RlID8gJzEnIDogJzAnLCBcclxuICAgICAgICAgICAgICAgIGlzX2FjdGl2ZTogdGhpcy5pc19hY3RpdmUgPyAnMScgOiAnMCcsIFxyXG4gICAgICAgICAgICAgICAgaXNfZGVsZXRlOiB0aGlzLmlzX2RlbGV0ZSA/ICcxJyA6ICcwJywgXHJcbiAgICAgICAgICAgICAgICBzYXZlX3RpbWU6IHNhdmVfZGF0ZSwgXHJcbiAgICAgICAgICAgICAgICBteXBvczogICAgIHRoaXMubXlwb3MuZW5jb2RlKCksXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgYWxlcnQoJ1NhdmVEYXRhIEVuY29kZSBFcnJvcjogJyArIGVycik7XHJcbiAgICAgICAgICAgIHJldHVybiB7fTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRlY29kZShzOiBKU09OX1NhdmVJbmZvKTogQ19TYXZlSW5mbyB7XHJcbiAgICAgICAgdGhpcy5zYXZlX2lkICAgPSBzLnNhdmVfaWQgICA/PyB0aGlzLnNhdmVfaWQ7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJfaWQgPSBzLnBsYXllcl9pZCA/PyB0aGlzLnBsYXllcl9pZDsgXHJcbiAgICAgICAgdGhpcy51bmlxX25vICAgPSBzLnVuaXFfbm8gICA/PyB0aGlzLnVuaXFfbm87XHJcbiAgICAgICAgdGhpcy50aXRsZSAgICAgPSBzLnRpdGxlICAgICA/PyB0aGlzLnRpdGxlO1xyXG4gICAgICAgIHRoaXMuZGV0YWlsICAgID0gcy5kZXRhaWwgICAgPz8gdGhpcy5kZXRhaWw7XHJcbiAgICAgICAgdGhpcy5wb2ludCAgICAgPSBzLnBvaW50ICAgICA/PyB0aGlzLnBvaW50O1xyXG4gICAgICAgIGlmIChzLmF1dG9fbW9kZSA9PT0gdW5kZWZpbmVkKSB0aGlzLmF1dG9fbW9kZTsgZWxzZSBzLmF1dG9fbW9kZSAhPT0gJzAnID8gdHJ1ZSA6IGZhbHNlO1xyXG4gICAgICAgIGlmIChzLmlzX2FjdGl2ZSA9PT0gdW5kZWZpbmVkKSB0aGlzLmlzX2FjdGl2ZTsgZWxzZSBzLmlzX2FjdGl2ZSAhPT0gJzAnID8gdHJ1ZSA6IGZhbHNlO1xyXG4gICAgICAgIGlmIChzLmlzX2RlbGV0ZSA9PT0gdW5kZWZpbmVkKSB0aGlzLmlzX2RlbGV0ZTsgZWxzZSBzLmlzX2RlbGV0ZSAhPT0gJzAnID8gdHJ1ZSA6IGZhbHNlO1xyXG4gICAgICAgIGlmIChzLnNhdmVfdGltZSAhPT0gdW5kZWZpbmVkKSB0aGlzLnNhdmVfdGltZSA9IG5ldyBEYXRlKHMuc2F2ZV90aW1lKTsgXHJcblxyXG4gICAgICAgIGlmIChzLm15cG9zICAgICAhPT0gdW5kZWZpbmVkKSB0aGlzLm15cG9zLmRlY29kZShzLm15cG9zKTsgXHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgYWxlcnQoKTogdm9pZCB7XHJcbiAgICAgICAgYWxlcnQoXCJTYXZlSW5mbyBEQVRBOlwiIFxyXG4gICAgICAgICAgICArIFwiXFxuc2F2ZV9pZDogICAgXCIgKyAodGhpcy5zYXZlX2lkICAgPz8gJz8nKVxyXG4gICAgICAgICAgICArIFwiXFxucGxheWVyX2lkOiAgXCIgKyAodGhpcy5wbGF5ZXJfaWQgPz8gJz8nKVxyXG4gICAgICAgICAgICArIFwiXFxudW5pcV9ubzogICAgXCIgKyAodGhpcy51bmlxX25vICAgPz8gJz8nKVxyXG4gICAgICAgICAgICArIFwiXFxudGl0bGU6ICAgICAgXCIgKyAodGhpcy50aXRsZSAgICAgPz8gJz8nKVxyXG4gICAgICAgICAgICArIFwiXFxuZGV0YWlsOiAgICAgXCIgKyAodGhpcy5kZXRhaWwgICAgPz8gJz8nKVxyXG4gICAgICAgICAgICArIFwiXFxucG9pbnQ6ICAgICAgXCIgKyAodGhpcy5wb2ludCAgICAgPz8gJz8nKVxyXG4gICAgICAgICAgICArIFwiXFxuYXV0b19tb2RlOiAgXCIgKyAodGhpcy5hdXRvX21vZGU/J1knOidOJylcclxuICAgICAgICAgICAgKyBcIlxcbmlzX2FjdGl2ZTogIFwiICsgKHRoaXMuaXNfYWN0aXZlPydZJzonTicpXHJcbiAgICAgICAgICAgICsgXCJcXG5pc19kZWxldGU6ICBcIiArICh0aGlzLmlzX2RlbGV0ZT8nWSc6J04nKVxyXG4gICAgICAgICAgICArIFwiXFxubXl1cmw6ICAgICAgXCIgKyAodGhpcy5teXBvcy51cmwoKSAgICAgID8/ICc/JylcclxuICAgICAgICAgICAgKyBcIlxcbnRlYW1fdWlkOiAgIFwiICsgKHRoaXMubXlwb3MudGlkKCkgICAgICA/PyAnPycpXHJcbiAgICAgICAgICAgICsgXCJcXG5sb2Nfa2luZDogICBcIiArICh0aGlzLm15cG9zLmdldF9sY2tkKCkgPz8gJz8nKVxyXG4gICAgICAgICAgICArIFwiXFxubG9jX25hbWU6ICAgXCIgKyAodGhpcy5teXBvcy5nZXRfbmFtZSgpID8/ICc/JylcclxuICAgICAgICAgICAgKyBcIlxcbmxvY191aWQ6ICAgIFwiICsgKHRoaXMubXlwb3MuZ2V0X3VpZCgpICA/PyAnPycpXHJcbiAgICAgICAgICAgICsgXCJcXG5cIlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5pbXBvcnQgeyBDX1BvaW50IH0gICAgICAgICAgICAgICBmcm9tIFwiLi9DX1BvaW50XCI7XHJcbmltcG9ydCB7IENfUG9pbnREaXIgfSAgICAgICAgICAgIGZyb20gJy4vQ19Qb2ludERpcic7XHJcbmltcG9ydCB7IENfTW92YWJsZVBvaW50IH0gICAgICAgIGZyb20gXCIuL0NfTW92YWJsZVBvaW50XCI7XHJcbmltcG9ydCB7IENfV2Fsa2VyLCBKU09OX1dhbGtlciB9IGZyb20gXCIuL0NfV2Fsa2VyXCI7XHJcbmltcG9ydCB7IENfSGVybywgSlNPTl9IZXJvIH0gICAgIGZyb20gXCIuL0NfSGVyb1wiO1xyXG5pbXBvcnQgeyBJX01hemVPYmogfSAgICAgICAgICAgICBmcm9tIFwiLi9DX01hemVPYmpcIjtcclxuaW1wb3J0IHsgSlNPTl9BbnkgfSAgICAgICAgICAgICAgZnJvbSBcIi4vQ19TYXZlSW5mb1wiO1xyXG5pbXBvcnQgeyBDX0N1cnJlbnRUZWFtVmlldyB9ICAgICBmcm9tIFwiLi9DX1RlYW1WaWV3XCI7XHJcbmltcG9ydCB7IElfTWF6ZU9ialZpZXcsIEpTT05fTWF6ZU9ialZpZXcgfSAgZnJvbSBcIi4vQ19NYXplT2JqVmlld1wiO1xyXG5pbXBvcnQgeyBDX0dvb2QsICBUX0dvb2RLaW5kIH0gICBmcm9tIFwiLi9DX0dvb2RcIjtcclxuaW1wb3J0IHsgQ19Hb29kc0xpc3QsIEpTT05fR29vZHNMaXN0IH0gZnJvbSBcIi4vQ19Hb29kc0xpc3ROR1wiO1xyXG5pbXBvcnQgeyBfZ2V0X3V1aWQgfSAgICAgICAgICAgICBmcm9tIFwiLi4vZF91dGwvRl9SYW5kXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEpTT05fVGVhbSBleHRlbmRzIEpTT05fQW55IHtcclxuICAgIGlkPzogICAgICAgIG51bWJlciwgXHJcbiAgICB1bmlxX2lkPzogICBzdHJpbmcsIFxyXG4gICAgc2F2ZV9pZD86ICAgbnVtYmVyLCBcclxuICAgIG5hbWU/OiAgICAgIHN0cmluZywgXHJcbiAgICBsb2NhdGU/OiAgICBKU09OX1dhbGtlcixcclxuICAgIGdvbGQ/OiAgICAgIG51bWJlcixcclxuLy8gICAgZ29vZHM/OiAgICAgSlNPTl9Hb29kc0xpc3QsXHJcbiAgICBoZXJvZXM/OiAgICBKU09OX0hlcm9bXSwgXHJcbiAgICBtb3Rpb24/OiAgICBzdHJpbmcsXHJcbiAgICB2aWV3PzogICAgICBKU09OX01hemVPYmpWaWV3fHVuZGVmaW5lZCxcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFsZXJ0X3RlYW1faW5mbyhhOiBKU09OX1RlYW18dW5kZWZpbmVkKTogdm9pZCB7XHJcbiAgICBpZiAoYSA9PT0gdW5kZWZpbmVkKSByZXR1cm47XHJcbiAgICBhbGVydChcIlRlYW0gSW5mbzpcIiBcclxuICAgICAgICArIFwiXFxuaWQ6ICAgIFwiICAgICArIChhLmlkICAgICAgICA/PyAnPycpXHJcbiAgICAgICAgKyBcIlxcbnVuaXFfaWQ6ICBcIiAgKyAoYS51bmlxX2lkICAgPz8gJz8nKVxyXG4gICAgICAgICsgXCJcXG5uYW1lOiAgXCIgICAgICsgKGEubmFtZSAgICAgID8/ICc/JylcclxuICAgICAgICArIFwiXFxuc2F2ZV9pZDogXCIgICArIChhLnNhdmVfaWQgICA/PyAnPycpXHJcbiAgICAgICAgKyBcIlxcbnVybDogIFwiICAgICAgKyAoYS5sb2NhdGU/LmN1cl91cmwgICAgPz8gJz8nKVxyXG4gICAgICAgICsgXCJcXG5sY2tkOiBcIiAgICAgICsgKGEubG9jYXRlPy5raW5kICAgICAgID8/ICc/JylcclxuICAgICAgICArIFwiXFxubGNubTogXCIgICAgICArIChhLmxvY2F0ZT8ubmFtZSAgICAgICA/PyAnPycpXHJcbiAgICAgICAgKyBcIlxcbmxjaWQ6IFwiICAgICAgKyAoYS5sb2NhdGU/LmxvY191aWQgICAgPz8gJz8nKVxyXG4gICAgICAgICsgXCJcXG5jdXJfeDogXCIgICAgICsgKGEubG9jYXRlPy5sb2NfcG9zPy54ID8/ICc/JylcclxuICAgICAgICArIFwiXFxuY3VyX3k6IFwiICAgICArIChhLmxvY2F0ZT8ubG9jX3Bvcz8ueSA/PyAnPycpXHJcbiAgICAgICAgKyBcIlxcbmN1cl96OiBcIiAgICAgKyAoYS5sb2NhdGU/LmxvY19wb3M/LnogPz8gJz8nKVxyXG4gICAgICAgICsgXCJcXG5jdXJfZDogXCIgICAgICsgKGEubG9jYXRlPy5sb2NfcG9zPy5kID8/ICc/JylcclxuICAgICAgICArIFwiXFxuZ29sZDogXCIgICAgICArIChhLmdvbGQgICAgICA/PyAgMCApXHJcbi8vICAgICAgICArIFwiXFxuZ29vZHM6IFwiICAgICArIChPYmplY3Qua2V5cyhhLmdvb2RzPz9bXSkubGVuZ3RoKVxyXG4gICAgICAgICsgXCJcXG5oZXJvZXM6IFwiICAgICsgKGEuaGVyb2VzPy5sZW5ndGggPz8gJz8nKVxyXG4gICAgICAgICsgXCJcXG5cIlxyXG4gICAgKTtcclxuXHJcbi8vICAgIGlmIChhLmhlcm9lcyAhPT0gdW5kZWZpbmVkKSBhbGVydF9oZXJvZXNfaW5mbyhhLmhlcm9lcyk7XHJcbn1cclxuXHJcblxyXG5leHBvcnQgY2xhc3MgQ19UZWFtIGltcGxlbWVudHMgSV9NYXplT2JqIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgbmV3T2JqKGo/OiBKU09OX1RlYW0pOiBDX1RlYW0ge1xyXG4gICAgICAgIHJldHVybiBuZXcgQ19UZWFtKGopO1xyXG4gICAgfVxyXG4gICAgcHVibGljIG5ld09iaihqPzogSlNPTl9UZWFtKTogQ19UZWFtIHtyZXR1cm4gQ19UZWFtLm5ld09iaihqKTt9XHJcblxyXG4gICAgcHJvdGVjdGVkIG15X2lkOiAgICAgbnVtYmVyO1xyXG4gICAgcHJvdGVjdGVkIG15X25hbWU6ICAgc3RyaW5nO1xyXG4gICAgcHJvdGVjdGVkIHVuaXFfaWQ6ICAgc3RyaW5nO1xyXG4gICAgcHJvdGVjdGVkIHNhdmVfaWQ6ICAgbnVtYmVyO1xyXG4gICAgcHJvdGVjdGVkIHdhbGtlcjogICAgQ19XYWxrZXI7XHJcbiAgICBwcm90ZWN0ZWQgZ29sZDogICAgICBudW1iZXI7XHJcbi8vICAgIHByb3RlY3RlZCBnb29kczogICAgIENfR29vZHNMaXN0O1xyXG4gICAgcHJvdGVjdGVkIGhlcm9lczogICAge1t1aWQ6IHN0cmluZ106IENfSGVyb307XHJcblxyXG4gICAgcHJvdGVjdGVkIG15VmlldzogICAgSV9NYXplT2JqVmlld3x1bmRlZmluZWQ7XHJcbiAgICBwcm90ZWN0ZWQgaG9wZV9tb3Rpb246IHN0cmluZztcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3Ioaj86IEpTT05fVGVhbSkge1xyXG5cclxuICAgICAgICB0aGlzLm15X2lkICAgICA9ICAwO1xyXG4gICAgICAgIHRoaXMubXlfbmFtZSAgID0gJ05lbyBUZWFtPyc7XHJcbiAgICAgICAgdGhpcy51bmlxX2lkICAgPSAnbWFpX3RlYW0jJyArIF9nZXRfdXVpZCgpO1xyXG4gICAgICAgIHRoaXMuc2F2ZV9pZCAgID0gIDA7XHJcblxyXG4gICAgICAgIHRoaXMubXlWaWV3ID0gbmV3IENfQ3VycmVudFRlYW1WaWV3KHRoaXMpIGFzIElfTWF6ZU9ialZpZXc7XHJcbiAgICAgICAgdGhpcy53YWxrZXIgPSBuZXcgQ19XYWxrZXIoKTtcclxuICAgICAgICB0aGlzLndhbGtlci5zZXRfdGlkKHRoaXMudWlkKCkpO1xyXG5cclxuICAgICAgICB0aGlzLmdvbGQgICA9IDA7XHJcbi8vICAgICAgICB0aGlzLmdvb2RzICA9IG5ldyBDX0dvb2RzTGlzdCgpO1xyXG4gICAgICAgIHRoaXMuaGVyb2VzID0ge307XHJcbiAgICAgICAgdGhpcy5ob3BlX21vdGlvbiA9ICdOT1AnOyAgICBcclxuICAgICAgICBpZiAoaiAhPT0gdW5kZWZpbmVkKSB0aGlzLmRlY29kZShqKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXRfcHJwKGFyZyA6IEpTT05fVGVhbSkge1xyXG4gICAgICAgIHRoaXMuZGVjb2RlKGFyZyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVpZCgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy51bmlxX2lkfVxyXG5cclxuICAgIHB1YmxpYyB3aXRoaW4ocDogQ19Qb2ludCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGNvbnN0IGhlcmUgPSB0aGlzLndhbGtlcj8uZ2V0X3AoKTtcclxuICAgICAgICByZXR1cm4gaGVyZT8ud2l0aGluKHApID8/IGZhbHNlOyBcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdmlldygpOiAgSV9NYXplT2JqVmlld3x1bmRlZmluZWQge3JldHVybiB0aGlzLm15Vmlld31cclxuICAgIHB1YmxpYyB3YWxrKCk6ICBDX1dhbGtlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMud2Fsa2VyXHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBjYW5UaHJvdWdoKCk6IGJvb2xlYW4ge3JldHVybiB0cnVlfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgaHJlcygpOiAgQ19IZXJvW10ge1xyXG4gICAgICAgIGNvbnN0IGhyZXM6IENfSGVyb1tdID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaWkgaW4gdGhpcy5oZXJvZXMpIGhyZXMucHVzaCh0aGlzLmhlcm9lc1tpaV0pO1xyXG4gICAgICAgIHJldHVybiBocmVzO1xyXG4gICAgfSBcclxuICAgIHB1YmxpYyBjbGVhcl9ocmVzKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaGVyb2VzID0ge307XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgYWRkX2hlcm8oaGVybzogQ19IZXJvKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5oZXJvZXNbaGVyby51aWQoKV0gPSBoZXJvO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHJtdl9oZXJvKGhlcm86IENfSGVybyk6IHZvaWQge1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLmhlcm9lc1toZXJvLnVpZCgpXTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0X2xvYygpOiBDX01vdmFibGVQb2ludCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMud2Fsa2VyO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldF9sb2MobG9jOiBDX01vdmFibGVQb2ludCk6IHZvaWQge1xyXG4gICAgICAgICh0aGlzLndhbGtlciA/Pz0gbmV3IENfV2Fsa2VyKCkpLmRlY29kZShsb2MuZW5jb2RlKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRfcGQoKTogQ19Qb2ludERpciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMud2Fsa2VyLmdldF9wZCgpO1xyXG4gICAgfVxyXG5cclxuLypcclxuICAgIHB1YmxpYyBzdGF0aWMgZnJvbV9vYmpfdG9fc3RyaW5nKG9hOiBDX1RlYW0pOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShvYSwgbnVsbCwgXCJcXHRcIik7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc3RhdGljIGZyb21fb2JqQXJyYXlfdG9fc3RyaW5nKG9hYToge1t1aWQ6IHN0cmluZ106IENfVGVhbX0pOiBzdHJpbmcge1xyXG4gICAgICAgIGNvbnN0IG9hID0gW10gYXMgQ19UZWFtW107XHJcbiAgICAgICAgZm9yIChjb25zdCBpaSBpbiBvYWEpIG9hLnB1c2gob2FhW2lpXSk7XHJcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KG9hLCBudWxsLCBcIlxcdFwiKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzdGF0aWMgZnJvbV9zdHJpbmdfdG9fb2JqKHR4dDogc3RyaW5nKTogQ19UZWFtIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCBqICAgPSBKU09OLnBhcnNlKHR4dCkgYXMgQ19UZWFtW107XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgQ19UZWFtKGopO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IENfVGVhbSgpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc3RhdGljIGZyb21fc3RyaW5nX3RvX29iakFycmF5KHR4dDogc3RyaW5nKToge1t1aWQ6IHN0cmluZ106IENfVGVhbX0ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGogICA9IEpTT04ucGFyc2UodHh0KSBhcyBKU09OX1RlYW1bXTtcclxuICAgICAgICAgICAgY29uc3QgbXBhID0ge30gYXMge1tpZDogc3RyaW5nXTogQ19UZWFtfTtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBqaiBvZiBqKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBhYWEgPSBuZXcgQ19UZWFtKCkuZGVjb2RlKGpqKTtcclxuICAgICAgICAgICAgICAgIG1wYVthYWEudWlkKCldID0gYWFhO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBtcGE7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7fTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4qL1xyXG4gICAgXHJcbiAgICBwdWJsaWMgZW5jb2RlKCk6IEpTT05fVGVhbSB7XHJcbiAgICAgICAgdGhpcy5nZXRfbG9jKCk7IC8vIExvY2F0aW9u5oOF5aCx44KS5pyA5paw44Gr5pu05pawXHJcblxyXG4gICAgICAgIGNvbnN0IGpzb25faGVyb2VzOiBKU09OX0hlcm9bXSA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGlpIGluIHRoaXMuaGVyb2VzKSBqc29uX2hlcm9lcy5wdXNoKHRoaXMuaGVyb2VzW2lpXS5lbmNvZGUoKSk7ICBcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgaWQ6ICAgICAgICB0aGlzLm15X2lkLFxyXG4gICAgICAgICAgICBuYW1lOiAgICAgIHRoaXMubXlfbmFtZSxcclxuICAgICAgICAgICAgdW5pcV9pZDogICB0aGlzLnVuaXFfaWQsXHJcbiAgICAgICAgICAgIHNhdmVfaWQ6ICAgdGhpcy5zYXZlX2lkLFxyXG4gICAgICAgICAgICBsb2NhdGU6ICAgIHRoaXMud2Fsa2VyLmVuY29kZSgpLFxyXG4gICAgICAgICAgICBnb2xkOiAgICAgIHRoaXMuZ29sZCxcclxuLy8gICAgICAgICAgICBnb29kczogICAgIHRoaXMuZ29vZHMuZW5jb2RlKCksXHJcbiAgICAgICAgICAgIGhlcm9lczogICAganNvbl9oZXJvZXMsXHJcbiAgICAgICAgICAgIG1vdGlvbjogICAgdGhpcy5ob3BlX21vdGlvbixcclxuICAgICAgICAgICAgdmlldzogICAgICB0aGlzLm15Vmlldz8uZW5jb2RlKCkgPz8ge30sXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBkZWNvZGUoYTogSlNPTl9UZWFtfHVuZGVmaW5lZCk6IENfVGVhbSB7XHJcbiAgICAgICAgaWYgKGEgPT09IHVuZGVmaW5lZCkgIHJldHVybiB0aGlzO1xyXG5cclxuICAgICAgICBpZiAoYS5pZCAgICE9PSB1bmRlZmluZWQpICAgIHRoaXMubXlfaWQgICAgICAgPSBhLmlkO1xyXG4gICAgICAgIGlmIChhLm5hbWUgIT09IHVuZGVmaW5lZCkgICAgdGhpcy5teV9uYW1lICAgICA9IGEubmFtZTtcclxuICAgICAgICBpZiAoYS51bmlxX2lkICE9PSB1bmRlZmluZWQpIHRoaXMudW5pcV9pZCAgICAgPSBhLnVuaXFfaWQ7XHJcbiAgICAgICAgaWYgKGEuc2F2ZV9pZCAhPT0gdW5kZWZpbmVkKSB0aGlzLnNhdmVfaWQgICAgID0gYS5zYXZlX2lkO1xyXG4gICAgICAgIGlmIChhLm1vdGlvbiAhPT0gdW5kZWZpbmVkKSAgdGhpcy5ob3BlX21vdGlvbiA9IGEubW90aW9uO1xyXG5cclxuICAgICAgICBpZiAoYS5sb2NhdGUgIT09IHVuZGVmaW5lZCkgIHRoaXMud2Fsa2VyLmRlY29kZShhLmxvY2F0ZSk7XHJcbiAgICAgICAgaWYgKGEuZ29sZCAgICE9PSB1bmRlZmluZWQpICB0aGlzLmdvbGQgPSBhLmdvbGQ7XHJcbi8vICAgICAgICBpZiAoYS5nb29kcyAgIT09IHVuZGVmaW5lZCkgIHRoaXMuZ29vZHMuZGVjb2RlKGEuZ29vZHMpO1xyXG5cclxuICAgICAgICBpZiAoYS5oZXJvZXMgIT09IHVuZGVmaW5lZCkgIHtcclxuICAgICAgICAgICAgdGhpcy5oZXJvZXMgPSB7fTtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBqc29uX2hlcm8gb2YgYS5oZXJvZXMpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGhlcm8gPSBuZXcgQ19IZXJvKGpzb25faGVybyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhlcm9lc1toZXJvLnVpZCgpXSA9IGhlcm87XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbi8qXHJcbiAgICAgICAgaWYgKGEudmlldyAgICAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGlmIChPYmplY3Qua2V5cyhhLnZpZXcpLmxlbmd0aCA+IDApIHRoaXMubXlWaWV3ID0gQ19NYXplT2JqVmlldy5uZXdPYmooYS52aWV3KTsgXHJcbiAgICAgICAgICAgIGVsc2UgdGhpcy5teVZpZXcgPSBuZXcgQ19DdXJyZW50VGVhbVZpZXcodGhpcykgYXMgSV9NYXplT2JqVmlldzsgXHJcbiAgICAgICAgfVxyXG4qL1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHN0YXRpYyBlbmNvZGVfYWxsKGFsbF90ZWFtOiBDX1RlYW1bXSk6IEpTT05fVGVhbVtdIHtcclxuICAgICAgICBjb25zdCBhbGxfdGVhbV9kYXRhOiBKU09OX1RlYW1bXSA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IHRlYW0gb2YgYWxsX3RlYW0pIHtcclxuICAgICAgICAgICAgYWxsX3RlYW1fZGF0YS5wdXNoKHRlYW0uZW5jb2RlKCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYWxsX3RlYW1fZGF0YTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzdGF0aWMgZGVjb2RlX2FsbChhbGxfdGVhbV9kYXRhOiBKU09OX1RlYW1bXSk6IENfVGVhbVtdIHtcclxuICAgICAgICBjb25zdCBhbGxfdGVhbTogQ19UZWFtW10gPSBbXTtcclxuICAgICAgICBmb3IgKGxldCB0ZWFtX2RhdGEgb2YgYWxsX3RlYW1fZGF0YSkge1xyXG4gICAgICAgICAgICBhbGxfdGVhbS5wdXNoKChuZXcgQ19UZWFtKCkpLmRlY29kZSh0ZWFtX2RhdGEpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGFsbF90ZWFtO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgYWxlcnQoKTogdm9pZCB7XHJcbiAgICAgICAgYWxlcnQoXCJUZWFtIEluZm86XCIgXHJcbiAgICAgICAgICAgICsgXCJcXG5pZDogICAgXCIgICAgICsgKHRoaXMubXlfaWQgICAgICAgICAgICA/PyAnPycpXHJcbiAgICAgICAgICAgICsgXCJcXG51bmlxX2lkOiAgXCIgICsgKHRoaXMudW5pcV9pZCAgICAgICAgICA/PyAnPycpXHJcbiAgICAgICAgICAgICsgXCJcXG5uYW1lOiAgXCIgICAgICsgKHRoaXMubXlfbmFtZSAgICAgICAgICA/PyAnPycpXHJcbiAgICAgICAgICAgICsgXCJcXG5zYXZlX2lkOiBcIiAgICsgKHRoaXMuc2F2ZV9pZCAgICAgICAgICA/PyAnPycpXHJcbiAgICAgICAgICAgICsgXCJcXG51cmw6ICBcIiAgICAgICsgKHRoaXMud2Fsa2VyLnVybCgpICAgICA/PyAnPycpXHJcbiAgICAgICAgICAgICsgXCJcXG5sY2tkOiBcIiAgICAgICsgKHRoaXMud2Fsa2VyLmdldF9sY2tkX3N0cigpID8/ICc/JylcclxuICAgICAgICAgICAgKyBcIlxcbmxjbm06IFwiICAgICAgKyAodGhpcy53YWxrZXIuZ2V0X25hbWUoKSAgICAgPz8gJz8nKVxyXG4gICAgICAgICAgICArIFwiXFxubGNpZDogXCIgICAgICArICh0aGlzLndhbGtlci5nZXRfdWlkKCkgICAgICA/PyAnPycpXHJcbiAgICAgICAgICAgICsgXCJcXG5jdXJfeDogXCIgICAgICsgKHRoaXMud2Fsa2VyLmdldF9wKCkueCA/PyAnPycpXHJcbiAgICAgICAgICAgICsgXCJcXG5jdXJfeTogXCIgICAgICsgKHRoaXMud2Fsa2VyLmdldF9wKCkueSA/PyAnPycpXHJcbiAgICAgICAgICAgICsgXCJcXG5jdXJfejogXCIgICAgICsgKHRoaXMud2Fsa2VyLmdldF9wKCkueiA/PyAnPycpXHJcbiAgICAgICAgICAgICsgXCJcXG5jdXJfZDogXCIgICAgICsgKHRoaXMud2Fsa2VyLmdldF9kKCkgICA/PyAnPycpXHJcbiAgICAgICAgICAgICsgXCJcXG5nb2xkOiBcIiAgICAgICsgKE9iamVjdC5rZXlzKHRoaXMuZ29sZCA/PyB7fSkubGVuZ3RoKVxyXG4gICAgICAgICAgICArIFwiXFxuaGVyb2VzOiBcIiAgICArICh0aGlzLmhlcm9lcz8ubGVuZ3RoID8/ICc/JylcclxuICAgICAgICAgICAgKyBcIlxcblwiXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBhbGVydF9ocmVzKCk6IHZvaWQge1xyXG4vLyAgICAgICAgYWxlcnQoXCJUZWFtIEluZm86XCIpO1xyXG4gICAgICAgIGZvciAoY29uc3QgaWkgaW4gdGhpcy5oZXJvZXMpIHRoaXMuaGVyb2VzW2lpXS5hbGVydCgpO1xyXG4gICAgfVxyXG59XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5cclxuaW1wb3J0IHsgVF9EaXJlY3Rpb24gfSAgICAgICBmcm9tICcuL0NfUG9pbnREaXInO1xyXG5pbXBvcnQgeyBDX1RlYW0sIEpTT05fVGVhbSB9IGZyb20gXCIuL0NfVGVhbVwiO1xyXG5pbXBvcnQgeyBUX1dhbGwgfSAgICAgICAgICAgIGZyb20gXCIuLi9kX21kbC9DX1dhbGxcIjtcclxuaW1wb3J0IHsgSV9NYXplT2JqVmlldywgSlNPTl9NYXplT2JqVmlldyB9ICBmcm9tIFwiLi9DX01hemVPYmpWaWV3XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQ19DdXJyZW50VGVhbVZpZXcgIGltcGxlbWVudHMgSV9NYXplT2JqVmlldyB7XHJcbiAgICBwdWJsaWMgIHN0YXRpYyBuZXdPYmooaj86IEpTT05fVGVhbSk6IElfTWF6ZU9ialZpZXcge1xyXG4gICAgICAgIGNvbnN0IHRlYW0gPSBuZXcgQ19UZWFtKGopO1xyXG4gICAgICAgIHJldHVybiBuZXcgQ19DdXJyZW50VGVhbVZpZXcodGVhbSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgIG5ld09iaihqPzogSlNPTl9UZWFtKTogSV9NYXplT2JqVmlldyB7cmV0dXJuIENfQ3VycmVudFRlYW1WaWV3Lm5ld09iaihqKX1cclxuXHJcbiAgICBcclxuICAgIHByaXZhdGUgbXlfdGVhbTogQ19UZWFtO1xyXG4gICAgcHJpdmF0ZSBteV9sYXllcjogIG51bWJlciA9IDk5O1xyXG4gICAgcHVibGljICBjb25zdHJ1Y3Rvcih0ZWFtOiBDX1RlYW0pIHtcclxuICAgICAgICB0aGlzLm15X3RlYW0gPSB0ZWFtO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsYXllcigpOiBudW1iZXIgICAgICAgICB7cmV0dXJuIHRoaXMubXlfbGF5ZXI7fVxyXG4gICAgcHVibGljIHNldF9sYXllcihsYXllcjogbnVtYmVyKTogdm9pZCB7dGhpcy5teV9sYXllciA9IGxheWVyO31cclxuICAgIHB1YmxpYyBsZXR0ZXIoKTogc3RyaW5nfG51bGwge1xyXG4gICAgICAgIHN3aXRjaCAodGhpcy5teV90ZWFtLndhbGsoKS5nZXRfZCgpKSB7XHJcbiAgICAgICAgICAgIGNhc2UgVF9EaXJlY3Rpb24uTjogcmV0dXJuICfihpEnO1xyXG4gICAgICAgICAgICBjYXNlIFRfRGlyZWN0aW9uLkU6IHJldHVybiAn4oaSJztcclxuICAgICAgICAgICAgY2FzZSBUX0RpcmVjdGlvbi5TOiByZXR1cm4gJ+KGkyc7XHJcbiAgICAgICAgICAgIGNhc2UgVF9EaXJlY3Rpb24uVzogcmV0dXJuICfihpAnO1xyXG4gICAgICAgICAgICBkZWZhdWx0OiByZXR1cm4gJ/CfjIAnO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBjYW5TaG93KCk6IGJvb2xlYW57cmV0dXJuIGZhbHNlfVxyXG4gICAgcHVibGljIGRyb3czRChmcm90OiBUX1dhbGwsIGJhY2s6IFRfV2FsbCk6IHZvaWQge31cclxuICAgIHB1YmxpYyBwYWRfdCgpOiAgIG51bWJlciB7cmV0dXJuIDAuMH0gXHJcbiAgICBwdWJsaWMgcGFkX2QoKTogICBudW1iZXIge3JldHVybiAwLjB9IFxyXG4gICAgcHVibGljIHBhZF9zKCk6ICAgbnVtYmVyIHtyZXR1cm4gMC4wfSBcclxuICAgIHB1YmxpYyBjb2xfZigpOiAgIHN0cmluZ3xudWxsIHtyZXR1cm4gbnVsbH0gXHJcbiAgICBwdWJsaWMgY29sX2IoKTogICBzdHJpbmd8bnVsbCB7cmV0dXJuIG51bGx9IFxyXG4gICAgcHVibGljIGNvbF9zKCk6ICAgc3RyaW5nfG51bGwge3JldHVybiBudWxsfSBcclxuICAgIHB1YmxpYyBjb2xfdCgpOiAgIHN0cmluZ3xudWxsIHtyZXR1cm4gbnVsbH0gXHJcbiAgICBwdWJsaWMgY29sX2QoKTogICBzdHJpbmd8bnVsbCB7cmV0dXJuIG51bGx9IFxyXG4gICAgcHVibGljIGNvbF9sKCk6ICAgc3RyaW5nfG51bGwge3JldHVybiBudWxsfSBcclxuXHJcbiAgICBwdWJsaWMgZW5jb2RlKCk6IEpTT05fTWF6ZU9ialZpZXcge3JldHVybiB7Y25hbWU6ICdDdXJyZW50VGVhbVZpZXcnfX1cclxuICAgIHB1YmxpYyBkZWNvZGUoajogSlNPTl9NYXplT2JqVmlld3x1bmRlZmluZWQpOiBJX01hemVPYmpWaWV3IHtyZXR1cm4gdGhpcyBhcyBJX01hemVPYmpWaWV3fVxyXG59XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5cclxuaW1wb3J0IHsgQ19Qb2ludERpciwgVF9EaXJlY3Rpb24gfSAgICAgICAgICAgZnJvbSBcIi4vQ19Qb2ludERpclwiO1xyXG5pbXBvcnQgeyBDX01vdmFibGVQb2ludCwgSlNPTl9Nb3ZhYmxlUG9pbnQgfSBmcm9tIFwiLi9DX01vdmFibGVQb2ludFwiO1xyXG5pbXBvcnQgeyBJX0xvY2F0ZSB9ICAgICBmcm9tIFwiLi9DX0xvY2F0aW9uXCI7XHJcbmltcG9ydCB7IElfSG9wZUFjdGlvbiB9IGZyb20gXCIuL0lfQ29tbW9uXCI7XHJcblxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBKU09OX1dhbGtlciBleHRlbmRzIEpTT05fTW92YWJsZVBvaW50IHtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIENfV2Fsa2VyIGV4dGVuZHMgQ19Nb3ZhYmxlUG9pbnQge1xyXG4gICAgY29uc3RydWN0b3Ioaj86IEpTT05fV2Fsa2VyKSB7XHJcbiAgICAgICAgc3VwZXIoaik7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0X3goKTogbnVtYmVyIHtyZXR1cm4gdGhpcy5sb2NfcG9zLnh9XHJcbiAgICBwdWJsaWMgZ2V0X3koKTogbnVtYmVyIHtyZXR1cm4gdGhpcy5sb2NfcG9zLnl9XHJcbiAgICBwdWJsaWMgZ2V0X3ooKTogbnVtYmVyIHtyZXR1cm4gdGhpcy5sb2NfcG9zLnp9XHJcblxyXG4gICAgcHVibGljIHNldF94KHg6IG51bWJlcik6IHZvaWQge3RoaXMubG9jX3Bvcy54ID0geH1cclxuICAgIHB1YmxpYyBzZXRfeSh5OiBudW1iZXIpOiB2b2lkIHt0aGlzLmxvY19wb3MueSA9IHl9XHJcbiAgICBwdWJsaWMgc2V0X3ooejogbnVtYmVyKTogdm9pZCB7dGhpcy5sb2NfcG9zLnogPSB6fVxyXG5cclxuICAgIHB1YmxpYyBzZXRfcGxhY2UoXHJcbiAgICAgICAgcGxhY2U6IElfTG9jYXRlLCBcclxuICAgICAgICB1cmw/OiAgc3RyaW5nLCBcclxuICAgICAgICBwb3M/OiAgQ19Qb2ludERpcikge1xyXG5cclxuICAgICAgICB0aGlzLnNldF91aWQgKHBsYWNlLnVpZCgpKTtcclxuICAgICAgICB0aGlzLnNldF9sY2tkKHBsYWNlLmdldF9sY2tkKCkpO1xyXG4gICAgICAgIHRoaXMuc2V0X25hbWUocGxhY2UuZ2V0X25hbWUoKSk7XHJcblxyXG4gICAgICAgIGlmICh1cmwgIT09IHVuZGVmaW5lZCkgdGhpcy5zZXRfdXJsKHVybCk7XHJcbiAgICAgICAgaWYgKHBvcyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0X3BkKHBvcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgcHVibGljIGhvcGVfcF9md2QoKTogSV9Ib3BlQWN0aW9uIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBoYXNfaG9wZTogdHJ1ZSwgXHJcbiAgICAgICAgICAgIGhvcGU6IFwiTW92ZVwiLFxyXG4gICAgICAgICAgICBzdWJqOiB0aGlzLmdldF9wX2Z3ZCgpLFxyXG4gICAgICAgICAgICBkb09LOiAoKT0+e3RoaXMuc2V0X3BfZndkKCk7fSxcclxuICAgICAgICAgICAgZG9ORzogKCk9Pnt0aGlzLmlzTkcoKTt9LFxyXG4gICAgICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgaG9wZV9wX2JhaygpOiBJX0hvcGVBY3Rpb24ge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGhhc19ob3BlOiB0cnVlLCBcclxuICAgICAgICAgICAgaG9wZTogXCJNb3ZlXCIsXHJcbiAgICAgICAgICAgIHN1Ymo6IHRoaXMuZ2V0X3BfYmFrKCksXHJcbiAgICAgICAgICAgIGRvT0s6ICgpPT57dGhpcy5zZXRfcF9iYWsoKTt9LFxyXG4gICAgICAgICAgICBkb05HOiAoKT0+e3RoaXMuaXNORygpO30sXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIGhvcGVfcF9sZnQoKTogSV9Ib3BlQWN0aW9uIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBoYXNfaG9wZTogdHJ1ZSwgXHJcbiAgICAgICAgICAgIGhvcGU6IFwiTW92ZVwiLFxyXG4gICAgICAgICAgICBzdWJqOiB0aGlzLmdldF9wX2xmdCgpLFxyXG4gICAgICAgICAgICBkb09LOiAoKT0+e3RoaXMuc2V0X3BfbGZ0KCk7fSxcclxuICAgICAgICAgICAgZG9ORzogKCk9Pnt0aGlzLmlzTkcoKTt9LFxyXG4gICAgICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgaG9wZV9wX3JndCgpOiBJX0hvcGVBY3Rpb24ge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGhhc19ob3BlOiB0cnVlLCBcclxuICAgICAgICAgICAgaG9wZTogXCJNb3ZlXCIsXHJcbiAgICAgICAgICAgIHN1Ymo6IHRoaXMuZ2V0X3Bfcmd0KCksXHJcbiAgICAgICAgICAgIGRvT0s6ICgpPT57dGhpcy5zZXRfcF9yZ3QoKTt9LFxyXG4gICAgICAgICAgICBkb05HOiAoKT0+e3RoaXMuaXNORygpO30sXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBob3BlX3R1cm5fcigpOiBJX0hvcGVBY3Rpb24ge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGhhc19ob3BlOiB0cnVlLCBcclxuICAgICAgICAgICAgaG9wZTogXCJUdXJuXCIsXHJcbiAgICAgICAgICAgIHN1Ymo6IHRoaXMuZ2V0X3BkKCksXHJcbiAgICAgICAgICAgIGRvT0s6ICgpPT57dGhpcy50dXJuX3IoKTt9LFxyXG4gICAgICAgICAgICBkb05HOiAoKT0+e3RoaXMuaXNORygpO30sXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBob3BlX3R1cm5fbCgpOiBJX0hvcGVBY3Rpb24ge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGhhc19ob3BlOiB0cnVlLCBcclxuICAgICAgICAgICAgaG9wZTogXCJUdXJuXCIsXHJcbiAgICAgICAgICAgIHN1Ymo6IHRoaXMuZ2V0X3BkKCksXHJcbiAgICAgICAgICAgIGRvT0s6ICgpPT57dGhpcy50dXJuX2woKTt9LFxyXG4gICAgICAgICAgICBkb05HOiAoKT0+e3RoaXMuaXNORygpO30sXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaG9wZV9wX3VwKCk6IElfSG9wZUFjdGlvbiB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgaGFzX2hvcGU6IHRydWUsIFxyXG4gICAgICAgICAgICBob3BlOiBcIlVwXCIsXHJcbiAgICAgICAgICAgIHN1Ymo6IHRoaXMuZ2V0X3BfdXAoKSxcclxuICAgICAgICAgICAgZG9PSzogKCk9Pnt0aGlzLm1vdmVfcF91cCgpO30sXHJcbiAgICAgICAgICAgIGRvTkc6ICgpPT57dGhpcy5pc05HKCk7fSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgcHVibGljIGhvcGVfcF9kb3duKCk6IElfSG9wZUFjdGlvbiB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgaGFzX2hvcGU6IHRydWUsIFxyXG4gICAgICAgICAgICBob3BlOiBcIkRvd25cIixcclxuICAgICAgICAgICAgc3ViajogdGhpcy5nZXRfcF9kb3duKCksXHJcbiAgICAgICAgICAgIGRvT0s6ICgpPT57dGhpcy5tb3ZlX3BfZG93bigpO30sXHJcbiAgICAgICAgICAgIGRvTkc6ICgpPT57dGhpcy5pc05HKCk7fSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBtb3ZlX3BfdXAoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zZXRfcF91cCgpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIG1vdmVfcF9kb3duKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc2V0X3BfZG93bigpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpc05HKCk6IHZvaWQge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIGdldF9wX2Z3ZCgpOiBDX1BvaW50RGlyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fX2dldF9wX21vdmUoMSwgMCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0X3BfZndkKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc2V0X3BkKHRoaXMuZ2V0X3BfZndkKCkpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldF9wX2JhaygpOiBDX1BvaW50RGlyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fX2dldF9wX21vdmUoLTEsIDApO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldF9wX2JhaygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNldF9wZCh0aGlzLmdldF9wX2JhaygpKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRfcF9sZnQoKTogQ19Qb2ludERpciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX19nZXRfcF9tb3ZlKDAsIC0xKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXRfcF9sZnQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zZXRfcGQodGhpcy5nZXRfcF9sZnQoKSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0X3Bfcmd0KCk6IENfUG9pbnREaXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9fZ2V0X3BfbW92ZSgwLCAxKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXRfcF9yZ3QoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zZXRfcGQodGhpcy5nZXRfcF9yZ3QoKSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0X3BfdXAoKTogQ19Qb2ludERpciB7XHJcbiAgICAgICAgY29uc3QgcCA9IG5ldyBDX1BvaW50RGlyKHRoaXMubG9jX3Bvcyk7XHJcbiAgICAgICAgcC56LS07XHJcbiAgICAgICAgcmV0dXJuIHA7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0X3BfdXAoKSB7XHJcbiAgICAgICAgdGhpcy5zZXRfcGQodGhpcy5nZXRfcF91cCgpKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRfcF9kb3duKCk6IENfUG9pbnREaXIge1xyXG4gICAgICAgIGNvbnN0IHAgPSBuZXcgQ19Qb2ludERpcih0aGlzLmxvY19wb3MpO1xyXG4gICAgICAgIHAueisrO1xyXG4gICAgICAgIHJldHVybiBwO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldF9wX2Rvd24oKSB7XHJcbiAgICAgICAgdGhpcy5zZXRfcGQodGhpcy5nZXRfcF9kb3duKCkpO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIF9fZ2V0X3BfbW92ZShvZmZzZXRGQjogbnVtYmVyLCBvZmZzZXRMUjogbnVtYmVyKTogQ19Qb2ludERpciB7XHJcbiAgICAgICAgY29uc3QgcCA9IG5ldyBDX1BvaW50RGlyKHRoaXMubG9jX3Bvcyk7XHJcbiAgICAgICAgaWYgKG9mZnNldEZCICE9PSAwKSB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5sb2NfcG9zLmQpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgVF9EaXJlY3Rpb24uTjogcC55IC09IG9mZnNldEZCO2JyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBUX0RpcmVjdGlvbi5FOiBwLnggKz0gb2Zmc2V0RkI7YnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFRfRGlyZWN0aW9uLlM6IHAueSArPSBvZmZzZXRGQjticmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgVF9EaXJlY3Rpb24uVzogcC54IC09IG9mZnNldEZCO2JyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChvZmZzZXRMUiAhPT0gMCkge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMubG9jX3Bvcy5kKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFRfRGlyZWN0aW9uLk46IHAueCArPSBvZmZzZXRMUjticmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgVF9EaXJlY3Rpb24uRTogcC55ICs9IG9mZnNldExSO2JyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBUX0RpcmVjdGlvbi5TOiBwLnggLT0gb2Zmc2V0TFI7YnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFRfRGlyZWN0aW9uLlc6IHAueSAtPSBvZmZzZXRMUjticmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRfYXJvdW5kKGZyb250OiBudW1iZXIsIHJpZ2h0Om51bWJlciwgdXA6IG51bWJlciA9IDApOiBDX1BvaW50RGlyIHtcclxuICAgICAgICB2YXIgdGFyZ2V0X3ggID0gdGhpcy5sb2NfcG9zLng7XHJcbiAgICAgICAgdmFyIHRhcmdldF95ICA9IHRoaXMubG9jX3Bvcy55O1xyXG4gICAgICAgIHZhciB0YXJnZXRfeiAgPSB0aGlzLmxvY19wb3MueiAtIHVwO1xyXG4gICAgICAgIHN3aXRjaCAodGhpcy5sb2NfcG9zLmQpIHtcclxuICAgICAgICAgICAgY2FzZSBUX0RpcmVjdGlvbi5OOlxyXG4gICAgICAgICAgICAgICAgdGFyZ2V0X3ggKz0gcmlnaHQ7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXRfeSAtPSBmcm9udDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFRfRGlyZWN0aW9uLkU6XHJcbiAgICAgICAgICAgICAgICB0YXJnZXRfeCArPSBmcm9udDtcclxuICAgICAgICAgICAgICAgIHRhcmdldF95ICs9IHJpZ2h0O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgVF9EaXJlY3Rpb24uUzpcclxuICAgICAgICAgICAgICAgIHRhcmdldF94IC09IHJpZ2h0O1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0X3kgKz0gZnJvbnQ7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBUX0RpcmVjdGlvbi5XOlxyXG4gICAgICAgICAgICAgICAgdGFyZ2V0X3ggLT0gZnJvbnQ7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXRfeSAtPSByaWdodDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV3IENfUG9pbnREaXIoe3g6IHRhcmdldF94LCB5OiB0YXJnZXRfeSwgejogdGFyZ2V0X3osIGQ6IHRoaXMubG9jX3Bvcy5kfSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgdHVybl9yKCk6IHZvaWQge1xyXG4gICAgICAgIHN3aXRjaCAodGhpcy5sb2NfcG9zLmQpIHtcclxuICAgICAgICAgICAgY2FzZSBUX0RpcmVjdGlvbi5OOiB0aGlzLmxvY19wb3MuZCA9IFRfRGlyZWN0aW9uLkU7YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgVF9EaXJlY3Rpb24uRTogdGhpcy5sb2NfcG9zLmQgPSBUX0RpcmVjdGlvbi5TO2JyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFRfRGlyZWN0aW9uLlM6IHRoaXMubG9jX3Bvcy5kID0gVF9EaXJlY3Rpb24uVzticmVhaztcclxuICAgICAgICAgICAgY2FzZSBUX0RpcmVjdGlvbi5XOiB0aGlzLmxvY19wb3MuZCA9IFRfRGlyZWN0aW9uLk47YnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIHR1cm5fbCgpOiB2b2lkIHtcclxuICAgICAgICBzd2l0Y2ggKHRoaXMubG9jX3Bvcy5kKSB7XHJcbiAgICAgICAgICAgIGNhc2UgVF9EaXJlY3Rpb24uTjogdGhpcy5sb2NfcG9zLmQgPSBUX0RpcmVjdGlvbi5XO2JyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFRfRGlyZWN0aW9uLkU6IHRoaXMubG9jX3Bvcy5kID0gVF9EaXJlY3Rpb24uTjticmVhaztcclxuICAgICAgICAgICAgY2FzZSBUX0RpcmVjdGlvbi5TOiB0aGlzLmxvY19wb3MuZCA9IFRfRGlyZWN0aW9uLkU7YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgVF9EaXJlY3Rpb24uVzogdGhpcy5sb2NfcG9zLmQgPSBUX0RpcmVjdGlvbi5TO2JyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyB0dXJuX2IoKTogdm9pZCB7XHJcbiAgICAgICAgc3dpdGNoICh0aGlzLmxvY19wb3MuZCkge1xyXG4gICAgICAgICAgICBjYXNlIFRfRGlyZWN0aW9uLk46IHRoaXMubG9jX3Bvcy5kID0gVF9EaXJlY3Rpb24uUzticmVhaztcclxuICAgICAgICAgICAgY2FzZSBUX0RpcmVjdGlvbi5FOiB0aGlzLmxvY19wb3MuZCA9IFRfRGlyZWN0aW9uLlc7YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgVF9EaXJlY3Rpb24uUzogdGhpcy5sb2NfcG9zLmQgPSBUX0RpcmVjdGlvbi5OO2JyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFRfRGlyZWN0aW9uLlc6IHRoaXMubG9jX3Bvcy5kID0gVF9EaXJlY3Rpb24uVzticmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZW5jb2RlKCk6IEpTT05fV2Fsa2VyIHtcclxuICAgICAgICBjb25zdCBqID0gc3VwZXIuZW5jb2RlKCkgYXMgSlNPTl9XYWxrZXI7XHJcbiAgICAgICAgcmV0dXJuIGo7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZGVjb2RlKGE6IEpTT05fV2Fsa2VyKTogQ19XYWxrZXIge1xyXG4gICAgICAgIGlmIChhID09PSB1bmRlZmluZWQpIHJldHVybiB0aGlzO1xyXG4gICAgICAgIHN1cGVyLmRlY29kZShhKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxufVxyXG5cclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5pbXBvcnQgeyBfcm91bmQgfSAgZnJvbSBcIi4uL2RfdXRsL0ZfTWF0aFwiO1xyXG5pbXBvcnQgeyBDX1JhbmdlIH0gZnJvbSBcIi4vQ19SYW5nZVwiO1xyXG5cclxuZXhwb3J0IHR5cGUgVF9XYWxsID0ge1xyXG4gICAgbWluX3g6IG51bWJlcixcclxuICAgIG1heF94OiBudW1iZXIsXHJcbiAgICBtaW5feTogbnVtYmVyLFxyXG4gICAgbWF4X3k6IG51bWJlcixcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIENfV2FsbCB7XHJcbiAgICBwcm90ZWN0ZWQgdzogVF9XYWxsW11bXTtcclxuICAgIHByb3RlY3RlZCBkOiBudW1iZXJcclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihkZXB0aDogbnVtYmVyID0gNSwgc2l6ZTogQ19SYW5nZSkge1xyXG4gICAgICAgIGlmIChkZXB0aCA8IDMpIGRlcHRoID0gNTtcclxuICAgICAgICBpZiAoZGVwdGggJSAyICE9PSAxKSBkZXB0aCsrOyAgLy8g5aWH5pWw44Gu44G/5a++5b+c44CCXHJcblxyXG4gICAgICAgIGNvbnN0IG1pbl94OiBudW1iZXIgPSBzaXplLm1pbl94KCk7XHJcbiAgICAgICAgY29uc3QgbWluX3k6IG51bWJlciA9IHNpemUubWluX3koKTtcclxuICAgICAgICBjb25zdCBtYXhfeDogbnVtYmVyID0gc2l6ZS5tYXhfeCgpO1xyXG4gICAgICAgIGNvbnN0IG1heF95OiBudW1iZXIgPSBzaXplLm1heF95KCk7XHJcbiAgICBcclxuICAgICAgICBjb25zdCBjZW50ZXJfeDogbnVtYmVyID0gKG1heF94IC0gbWluX3gpIC8gMjtcclxuICAgIFxyXG4gICAgICAgIC8vIOWfuua6luOBqOOBquOCi+WjgSjkuIDnlarpgaDjgY/jga7lo4Ep44Gu5q2j6Z2i44K144Kk44K6KOaoquW5hSnjgpLmsYLjgoHjgotcclxuICAgICAgICAvLyDkuIDnlarpgaDjgY8oZGVwdGggLSAxKeOBruWjgeOBruaVsOOBjGRlcHRo5YCL44Gr44Gq44KL44KI44GG44Gr6Kq/5pW044GZ44KLXHJcbiAgICAgICAgY29uc3QgZnJvbnRfd2FsbF9zaXplX3g6IG51bWJlciA9IChtYXhfeCAtIG1pbl94KSAvIGRlcHRoO1xyXG5cclxuICAgICAgICAvLyDln7rmupbjgajjgarjgovlgbTlo4Hjga7jgrXjgqTjgroo5qiq5bmFKeOCkuaxguOCgeOCi1xyXG4gICAgICAgIC8vIOS4gOeVqumBoOOBj+OBruWjgSjkuK3lpK4p44Gu5bem56uv44GL44KJZGVwdGjlgIvjga7lgbTlo4HjgpLlj5bjgozjgovjgojjgYbjgavjgrXjgqTjgrroqr/mlbTjgZnjgotcclxuICAgICAgICBjb25zdCBzaWRlX3dhbGxfc2l6ZV94OiAgbnVtYmVyID0gKGNlbnRlcl94IC0gZnJvbnRfd2FsbF9zaXplX3ggLyAyKSAvIGRlcHRoO1xyXG4gICAgXHJcbiAgICAgICAgLy8g5ZCEZGVwdGjliKXjga7mraPpnaLlo4Hjga7mqKrluYXjgpLmsYLjgoHjgovjgIJcclxuICAgICAgICAvLyDoqIjnrpfjga7liKnkvr/mgKfjgpLogIPmha7jgZfjgabjgIHjg4/jg7zjg5XjgrXjgqTjgrrjgpLmsYLjgoHjgotcclxuICAgICAgICBjb25zdCBmcm9udF93YWxsX0hfc2l6ZV94OiBudW1iZXJbXSA9IG5ldyBBcnJheShkZXB0aCArIDEpO1xyXG4gICAgXHJcbiAgICAgICAgZnJvbnRfd2FsbF9IX3NpemVfeFtkZXB0aF0gPSBmcm9udF93YWxsX3NpemVfeCAvIDI7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IGRlcHRoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICAgICAgZnJvbnRfd2FsbF9IX3NpemVfeFtpXSA9IGZyb250X3dhbGxfSF9zaXplX3hbaSArIDFdICsgc2lkZV93YWxsX3NpemVfeDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIOWfuua6luOBqOOBquOCi+WjgSjkuIDnlarpgaDjgY/jga7lo4Ep44Gu5q2j6Z2i44K144Kk44K6KOe4puW5hSnjgpLmsYLjgoHjgotcclxuICAgICAgICAvLyDkuIDnlarpgaDjgY8oZGVwdGggLSAxKeOBruWjgeOBruaVsOOBjGRlcHRo5YCL44Gr44Gq44KL44KI44GG44Gr6Kq/5pW044GZ44KLXHJcbiAgICAgICAgY29uc3QgZnJvbnRfd2FsbF9zaXplX3k6IG51bWJlciA9IChtYXhfeSAtIG1pbl95KSAvIGRlcHRoO1xyXG5cclxuICAgICAgICAvLyDlpKnkupXjga7nuKbluYXjga7lopfliIbjgpLmsYLjgoHjgovjgILlibLlkIjjga/pganlvZPvvIjnrJHvvIlcclxuICAgICAgICAvLyDjgq3jg6Pjg7Pjg5Djgrnjga7pq5jjgZUobWF4X3kgLSBtaW5feSnjgYvjgonkuIDnlarpgaDjgY/jga7lo4Hjga7pq5jjgZXjgpLlvJXjgYTjgaZcclxuICAgICAgICAvLyDmt7HjgZUoZGVwdGggKyAxKeOBp+WJsuOCi+OBk+OBqOOBq+OCiOOCiuWil+WIhuOBqOOBl+OBn1xyXG4gICAgICAgIGNvbnN0IHNpZGVfd2FsbF9zaXplX1QgPSAgKG1heF95IC0gbWluX3kgLSBmcm9udF93YWxsX3NpemVfeSkgLyAoZGVwdGggKiAyKTtcclxuXHJcbiAgICAgICAgLy8g5bqK44Gu5aKX5YiG44KS5rGC44KB44KL44CC5rGC44KB5pa544Gv5LiK6KiY44Go5ZCM44GYXHJcbiAgICAgICAgY29uc3Qgc2lkZV93YWxsX3NpemVfQiA9ICAobWF4X3kgLSBtaW5feSAtIGZyb250X3dhbGxfc2l6ZV95KSAvIChkZXB0aCAqIDIpO1xyXG5cclxuICAgICAgICAvLyDku6XkuIrjga7lgKTjgpLnlKjjgYTjgablkITot53pm6IoZGVwdGgp44Gu5q2j6Z2i5aOB44Gu5L2N572u5rG644KB44KS44GZ44KLXHJcbiAgICAgICAgLy8gd2FsbOOBruesrOS4gOW8leaVsOOBr+i3nembouOAgeesrOS6jOW8leaVsOOBr+W3puWPs+OBruS9jee9ru+8iOS4gOeVquW3puOBjDDjgIHkuIDnlarlj7PjgYxkZXB0aC0xKVxyXG4gICAgICAgIGNvbnN0IHdhbGw6IFRfV2FsbFtdW10gPSBuZXcgQXJyYXkoZGVwdGggKyAxKTtcclxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGRlcHRoICsgMTsgaisrKSB7XHJcbiAgICAgICAgICAgIHdhbGxbal0gPSBuZXcgQXJyYXkoZGVwdGggKyAxKTtcclxuICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCBkZXB0aCArIDE7IGsrKykge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgd2tfeCA9IGNlbnRlcl94IC0gZnJvbnRfd2FsbF9IX3NpemVfeFtqXSAqIChkZXB0aCAtIDIgKiBrKTtcclxuICAgICAgICAgICAgICAgIHdhbGxbal1ba10gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWluX3g6IF9yb3VuZCh3a194LCAwKSxcclxuICAgICAgICAgICAgICAgICAgICBtYXhfeDogX3JvdW5kKHdrX3ggICsgZnJvbnRfd2FsbF9IX3NpemVfeFtqXSAqIDIsIDApLFxyXG4gICAgICAgICAgICAgICAgICAgIG1pbl95OiBfcm91bmQobWluX3kgKyBzaWRlX3dhbGxfc2l6ZV9UICogaiwgMCksXHJcbiAgICAgICAgICAgICAgICAgICAgbWF4X3k6IF9yb3VuZChtYXhfeSAtIHNpZGVfd2FsbF9zaXplX0IgKiBqLCAwKSxcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmQgPSBkZXB0aDtcclxuICAgICAgICB0aGlzLncgPSB3YWxsO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldF9kZXB0aCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmQ7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0KGRlcHRoOiBudW1iZXIsIG9mZnNldDogbnVtYmVyKTogVF9XYWxsIHtcclxuICAgICAgICBjb25zdCBIX2RlcHQgPSAodGhpcy5kIC0gMSkgLyAyO1xyXG4gICAgICAgIHJldHVybiB0aGlzLndbZGVwdGhdW0hfZGVwdCArIG9mZnNldF07XHJcbiAgICB9XHJcbn1cclxuXHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5cclxuaW1wb3J0IHtUX01ha2VFbnVtVHlwZX0gZnJvbSBcIi4uL2RfdXRsL1RfTWFrZUVudW1UeXBlXCI7XHJcblxyXG5leHBvcnQgY29uc3QgVF9EaXJlY3Rpb24gPSB7XHJcbiAgICBOOiAgIDAsXHJcbiAgICBFOiAgIDEsXHJcbiAgICBTOiAgIDIsXHJcbiAgICBXOiAgIDMsXHJcbiAgICBYOiAgOTksXHJcbiAgICBNQVg6IDNcclxufSBhcyBjb25zdDtcclxuZXhwb3J0IHR5cGUgVF9EaXJlY3Rpb24gPSBUX01ha2VFbnVtVHlwZTx0eXBlb2YgVF9EaXJlY3Rpb24+O1xyXG5cclxuZXhwb3J0IHZhciAkRGlyZWN0aW9uTmFtZSA9IHtcclxuICAgIDA6ICAn5YyXJyxcclxuICAgIDE6ICAn5p2xJyxcclxuICAgIDI6ICAn5Y2XJyxcclxuICAgIDM6ICAn6KW/JyxcclxuICAgIDk5OiAn6KyOJ1xyXG59XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIC8vIOS4gOiIrOOBq+S9v+OBiOOCi+ODpuODvOODhuOCo+ODquODhuOCo+OBquWRquaWh1xyXG4gICAgLy8g44Kq44OW44K444Kn44Kv44OI44KS5YiX5oyZ5Z6L44Go44GX44Gm5Z6L5YyW44GZ44KL44Gu44Gr5Yip55SoXHJcbiAgICBpbXBvcnQge1RfTWFrZUVudW1UeXBlfSBmcm9tIFwiLi4vZF91dGwvVF9NYWtlRW51bVR5cGVcIjtcclxuXHJcbiAgICAvLyDjg4Djg7Pjgrjjg6fjg7Pjg57jg4Pjg5fjga7jgrvjg6vjga7nqK7poZ7jgpLooajjgZnliJfmjJnlnotcclxuICAgIC8vIE5vRGVmOiDmnKrlrprnvqnjg7vkuI3mmI5cclxuICAgIC8vIEZsb29yOiDluopcclxuICAgIC8vIFVuZXhwOiDmnKrouI/lnLBcclxuICAgIC8vIFN0b25lOiDnn7Plo4FcclxuICAgIC8vIFN0clVwOiDkuIrjgorpmo7mrrVcclxuICAgIC8vIFN0ckRuOiDkuIvjgorpmo7mrrVcclxuICAgIC8vIEVtcHR5OiDliJ3mnJ/nirbmhYvjg7vkvZXjgoLjgarjgZdcclxuICAgIC8vIFxyXG4gICAgLy8gZnVuY3Rpb24gdG9faW50KE16S2luZCk6ICAgICAgaW50ICAgICAgICDliJfmjJnlnovjgavlr77lv5zjgZnjgovlgKQo5pW05pWw5YCkKeOCkui/lOOBmVxyXG4gICAgLy8gZnVuY3Rpb24gZnJvbV9pbnQoaW50KTogICAgICAgVF9NektpbmQgICAgIOaVtOaVsOWApOOBq+WvvuW/nOOBmeOCi+WIl+aMmeWei+OCkui/lOOBmSjjgq/jg6njgrnjg6Hjgr3jg4Pjg4kpXHJcbiAgICAvLyBmdW5jdGlvbiB0b19sZXR0ZXIoTXpLaW5kKTogICBzdHJpbmcgICAgIOWIl+aMmeWei+OBq+WvvuW/nOOBmeOCi+aWh+Wtl+OCkui/lOOBmSjjg4Djg7Pjgrjjg6fjg7Pjga4yROihqOekuueUqClcclxuICAgIC8vIGZ1bmN0aW9uIGZyb21fbGV0dGVyKHN0cmluZyk6IFRfTXpLaW5kICAgICDmloflrZfjgavlr77lv5zjgZnjgovliJfmjJnlnovjgpLov5TjgZko44Kv44Op44K544Oh44K944OD44OJKVxyXG5cclxuICAgIGV4cG9ydCBjb25zdCBUX016S2luZDp7W2tleTogc3RyaW5nXTogbnVtYmVyfSAgPSB7XHJcbiAgICAgICAgTm9EZWY6ICAgMCxcclxuICAgICAgICBGbG9vcjogICAxLFxyXG4gICAgICAgIFVuZXhwOiAgIDIsXHJcbiAgICAgICAgU3RvbmU6ICAgMyxcclxuICAgICAgICBVbmt3bjogICA0LFxyXG4gICAgICAgIFN0clVwOiAgIDUsXHJcbiAgICAgICAgU3RyRG46ICAgNixcclxuICAgICAgICBTdHJVRDogICA3LFxyXG4gICAgICAgIEVtcHR5OiAyNTUsXHJcbiAgICB9IGFzIGNvbnN0O1xyXG4gICAgZXhwb3J0IHR5cGUgVF9NektpbmQgICA9IFRfTWFrZUVudW1UeXBlPHR5cGVvZiBUX016S2luZD47XHJcblxyXG4gICAgZXhwb3J0IGNvbnN0IFRfUnZNektpbmQ6e1trZXk6IG51bWJlcl06IFRfTXpLaW5kfSAgPSB7XHJcbiAgICAgICAgMDogICBUX016S2luZC5Ob0RlZixcclxuICAgICAgICAxOiAgIFRfTXpLaW5kLkZsb29yLFxyXG4gICAgICAgIDI6ICAgVF9NektpbmQuVW5leHAsXHJcbiAgICAgICAgMzogICBUX016S2luZC5TdG9uZSxcclxuICAgICAgICA0OiAgIFRfTXpLaW5kLlVua3duLFxyXG4gICAgICAgIDU6ICAgVF9NektpbmQuU3RyVXAsXHJcbiAgICAgICAgNjogICBUX016S2luZC5TdHJEbixcclxuICAgICAgICA3OiAgIFRfTXpLaW5kLlN0clVELFxyXG4gICAgICAgIDI1NTogVF9NektpbmQuRW1wdHksXHJcbiAgICB9IGFzIGNvbnN0O1xyXG4gICAgZXhwb3J0IHR5cGUgVF9Sdk16S2luZCA9IFRfTWFrZUVudW1UeXBlPHR5cGVvZiBUX1J2TXpLaW5kPjtcclxuXHJcbiIsImludGVyZmFjZSBKU09OQWJsZSB7XHJcbiAgICBba2V5OiBzdHJpbmddOiBhbnlcclxufVxyXG5leHBvcnQgdHlwZSBUX0F0dHIgPSB7W2tleTogc3RyaW5nXTogc3RyaW5nfG51bWJlcnxvYmplY3R9O1xyXG5cclxuZXhwb3J0IGNsYXNzIENfVXJsT3B0IHtcclxuICAgIHByb3RlY3RlZCB2OiBUX0F0dHI7XHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3Iocz86IHN0cmluZyk7XHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IodD86IFRfQXR0cik7XHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoYT86IGFueSkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgYSA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICB0aGlzLnYgPSB7fSBhcyBUX0F0dHI7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiBhID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0X2Zyb21fc3RyaW5nKGEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIGEgPT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICAgICAgdGhpcy52ID0gYSBhcyBUX0F0dHI7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy52ID0ge30gYXMgVF9BdHRyO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRfa2V5cygpOiBzdHJpbmdbXSB7XHJcbiAgICAgICAgY29uc3Qga2V5X2xpc3Q6IHN0cmluZ1tdID0gbmV3IEFycmF5IGFzIHN0cmluZ1tdO1xyXG4gICAgICAgIGZvciAodmFyIGtleSBpbiB0aGlzLnYpIHtcclxuICAgICAgICAgICAga2V5X2xpc3QucHVzaChrZXkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4ga2V5X2xpc3Q7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IChrZXk6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKGtleSBpbiB0aGlzLnYpIHtcclxuICAgICAgICAgICAgaWYgICh0eXBlb2YgdGhpcy52W2tleV0gPT09IFwibnVtYmVyXCIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnZba2V5XS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICAodHlwZW9mIHRoaXMudltrZXldID09PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodGhpcy52W2tleV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnZba2V5XSBhcyBzdHJpbmc7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIHNldChzdHI6IHN0cmluZyk6ICB2b2lkO1xyXG4gICAgcHVibGljIHNldChhdHI6IFRfQXR0cik6ICB2b2lkO1xyXG4gICAgcHVibGljIHNldChrZXk6IHN0cmluZywgdmFsPzogc3RyaW5nKTogdm9pZDtcclxuICAgIHB1YmxpYyBzZXQoa2V5OiBzdHJpbmcsIHZhbD86IG51bWJlcik6IHZvaWQ7XHJcbiAgICBwdWJsaWMgc2V0KGtleTogc3RyaW5nLCB2YWw/OiBvYmplY3QpOiB2b2lkO1xyXG4gICAgcHVibGljIHNldCh1a246IGFueSwgICAgdmFsPzogc3RyaW5nfG51bWJlcnxvYmplY3QpOiB2b2lkIHtcclxuICAgICAgICBpZiAodHlwZW9mIHVrbiA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbCA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRfZnJvbV9zdHJpbmcodWtuKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZbdWtuXSA9IHZhbDtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsID09PSBcIm51bWJlclwiICl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZbdWtuXSA9IHZhbDtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsID09PSBcIm9iamVjdFwiICl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZbdWtuXSA9IHZhbDtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudlt1a25dID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIHVrbiA9PT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYXR0cjogVF9BdHRyID0gdWtuIGFzIFRfQXR0cjtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBpdGVtIGluIGF0dHIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudltpdGVtXSA9IGF0dHJbaXRlbV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgaXNzZXQoa2V5OiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gKGtleSBpbiB0aGlzLnYpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHJlbW92ZShrZXk6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIGlmIChrZXkgaW4gdGhpcy52KSB7XHJcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLnZba2V5XTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgY2xlYXIoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy52ID0ge30gYXMgVF9BdHRyO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHRvU3RyaW5nKCk6IHN0cmluZyB7XHJcbiAgICAgICAgY29uc3QgbGVuOiBudW1iZXIgPSAgT2JqZWN0LmtleXModGhpcy52KS5sZW5ndGg7XHJcbiAgICAgICAgaWYgKGxlbiA8IDEpICByZXR1cm4gXCJcIjtcclxuXHJcbiAgICAgICAgdmFyIHN0cl9hcnJheTogc3RyaW5nW10gPSBbXTtcclxuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLnYpIHtcclxuICAgICAgICAgICAgc3RyX2FycmF5LnB1c2goa2V5ICsgXCI9XCIgKyB0aGlzLnZba2V5XSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gc3RyX2FycmF5LmpvaW4oXCImXCIpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHRvSlNPTigpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh0aGlzLnYpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHRvRm9ybURhdGEoKTogRm9ybURhdGF8dW5kZWZpbmVkIHtcclxuICAgICAgICBjb25zdCBsZW46IG51bWJlciA9ICBPYmplY3Qua2V5cyh0aGlzLnYpLmxlbmd0aDtcclxuICAgICAgICBpZiAobGVuIDwgMSkgIHJldHVybiB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgIHZhciBmb3JtX2RhdGEgPSBuZXcgRm9ybURhdGEoKTtcclxuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLnYpIHtcclxuICAgICAgICAgICAgY29uc3QgdmFsdWU6IHN0cmluZ3xudW1iZXJ8b2JqZWN0ID0gdGhpcy52W2tleV07XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIpXHJcbiAgICAgICAgICAgICAgICBmb3JtX2RhdGEuYXBwZW5kKGtleSwgdmFsdWUpO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiKVxyXG4gICAgICAgICAgICAgICAgZm9ybV9kYXRhLmFwcGVuZChrZXksIEpTT04uc3RyaW5naWZ5KHZhbHVlKSk7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIGZvcm1fZGF0YS5hcHBlbmQoa2V5LCB2YWx1ZS50b1N0cmluZygpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBmb3JtX2RhdGE7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgc2V0X2Zyb21fc3RyaW5nKHM6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY2xlYXIoKTtcclxuICAgICAgICB0aGlzLmFkZF9mcm9tX3N0cmluZyhzKTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBhZGRfZnJvbV9zdHJpbmcoczogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3Qgc3RyID0gcy5yZXBsYWNlKC9eKFxcPz8pKC4qKSQvLCAnJDInKTtcclxuICAgICAgICBjb25zdCBzdHJfYXJyYXk6IHN0cmluZ1tdID0gc3RyLnNwbGl0KFwiJlwiKTtcclxuICAgICAgICBzdHJfYXJyYXkuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBrZXlfdmFsdWUgPSBpdGVtLnNwbGl0KFwiPVwiKTtcclxuICAgICAgICAgICAgaWYgKGtleV92YWx1ZS5sZW5ndGggPCAyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZba2V5X3ZhbHVlWzBdXSA9ICcnO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy52W2tleV92YWx1ZVswXV0gPSBrZXlfdmFsdWVbMV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG4iLCIvLyDmlbDlgKTjg4Hjgqfjg4Pjgq9cclxuZXhwb3J0IGZ1bmN0aW9uIF9pc051bShudW1WYWw6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgLy8g44OB44Kn44OD44Kv5p2h5Lu244OR44K/44O844OzXHJcbiAgICBjb25zdCBwYXR0ZXJuID0gL15bLStdPyhbMS05XVxcZCp8MCkoXFwuXFxkKyk/JC87XHJcbiAgICAvLyDmlbDlgKTjg4Hjgqfjg4Pjgq9cclxuICAgIHJldHVybiBwYXR0ZXJuLnRlc3QobnVtVmFsKTtcclxufVxyXG5cclxuLy8g5pWw5YCk5Y+W44KK5Ye644GXXHJcbmV4cG9ydCBmdW5jdGlvbiBfZ2V0TnVtKG51bVZhbDogc3RyaW5nKTogbnVtYmVyIHtcclxuICAgIC8vIOODgeOCp+ODg+OCr+adoeS7tuODkeOCv+ODvOODs1xyXG4vLyAgICBjb25zdCBwYXR0ZXJuID0gL1stXT8oWzEtOV1cXGQqfDApKFxcLlxcZCspPy87XHJcbiAgICBjb25zdCBwYXR0ZXJuID0gLyhbXjAtOV0pL2c7XHJcbiAgICBjb25zdCB2YWxzdHIgID0gbnVtVmFsLnJlcGxhY2UocGF0dGVybiwnJyk7XHJcbiAgICAvLyDmlbDlgKTjg4Hjgqfjg4Pjgq9cclxuICAgIHJldHVybiBOdW1iZXIodmFsc3RyKTtcclxufVxyXG5cclxuLy8g5Zub5o2o5LqU5YWlXHJcbmV4cG9ydCBmdW5jdGlvbiBfcm91bmQobnVtOiBudW1iZXIsIGRpZ2l0OiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgY29uc3QgbXVsdGlwbGllciA9IE1hdGgucG93KDEwLCBkaWdpdCk7XHJcbiAgICByZXR1cm4gTWF0aC5yb3VuZChudW0gKiBtdWx0aXBsaWVyKSAvIG11bHRpcGxpZXI7XHJcbn1cclxuXHJcbi8vIOWIh+OCiuS4iuOBklxyXG5leHBvcnQgZnVuY3Rpb24gX2NlaWwobnVtOiBudW1iZXIsIGRpZ2l0OiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgY29uc3QgbXVsdGlwbGllciA9IE1hdGgucG93KDEwLCBkaWdpdCk7XHJcbiAgICByZXR1cm4gTWF0aC5jZWlsKG51bSAqIG11bHRpcGxpZXIpIC8gbXVsdGlwbGllcjtcclxufVxyXG5cclxuXHJcbi8vIOWIh+OCiuS4i+OBklxyXG5leHBvcnQgZnVuY3Rpb24gX2Zsb29yKG51bTogbnVtYmVyLCBkaWdpdDogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgIGNvbnN0IG11bHRpcGxpZXIgPSBNYXRoLnBvdygxMCwgZGlnaXQpO1xyXG4gICAgcmV0dXJuIE1hdGguZmxvb3IobnVtICogbXVsdGlwbGllcikgLyBtdWx0aXBsaWVyO1xyXG59XHJcblxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9taW4oYTogbnVtYmVyW10pOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIGEucmVkdWNlKChuMTogbnVtYmVyLCBuMjogbnVtYmVyKSA9PiBNYXRoLm1pbihuMSwgbjIpKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9tYXgoYTogbnVtYmVyW10pOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIGEucmVkdWNlKChuMTogbnVtYmVyLCBuMjogbnVtYmVyKSA9PiBNYXRoLm1heChuMSwgbjIpKTtcclxufVxyXG4iLCJpbXBvcnQgeyBfbWF4LCBfbWluLCBfcm91bmQgfSBmcm9tIFwiLi9GX01hdGhcIjtcclxuXHJcbi8vIOS5seaVsOmWouaVsOWRvOOBs+WHuuOBl+eUqOOBruWei+Wuo+iogFxyXG50eXBlIFRfZnJhbmQgPSAoKT0+bnVtYmVyXHJcbmNvbnN0IGZyYW5kOiBUX2ZyYW5kID0gICgpPT57cmV0dXJuIE1hdGgucmFuZG9tKCl9XHJcblxyXG4vLyDkuIDmp5jkubHmlbAo5pW05pWwKVxyXG5leHBvcnQgZnVuY3Rpb24gX2lyYW5kKG1pbjogbnVtYmVyID0gMCwgbWF4OiBudW1iZXIgPSAxLCByYW5kOiBUX2ZyYW5kID0gZnJhbmQpOiBudW1iZXIge1xyXG4gICAgY29uc3QgZl9yYW5kID0gTWF0aC5mbG9vcihyYW5kKCkgKiAobWF4IC0gbWluICsgMSkgKyBtaW4pO1xyXG4gICAgcmV0dXJuIF9yb3VuZChmX3JhbmQsIDApO1xyXG59XHJcblxyXG4vLyDmraPopo/liIbluIPjgoLjganjgY3kubHmlbAo5pW05pWwKVxyXG5leHBvcnQgZnVuY3Rpb24gX2lncmFuZChtaW46IG51bWJlciA9IDAsIG1heDogbnVtYmVyID0gMSwgcmFuZDogVF9mcmFuZCA9IGZyYW5kKTogbnVtYmVyIHtcclxuICAgIHJldHVybiBfaXJhbmQobWluLCBtYXgsICgpPT57cmV0dXJuIF9ncmFuZCgwLCAxLCByYW5kKX0pXHJcbn1cclxuXHJcbi8vIOato+imj+WIhuW4g+OCguOBqeOBjeS5seaVsCjlrp/mlbApXHJcbmV4cG9ydCBmdW5jdGlvbiBfZ3JhbmQobWluOiBudW1iZXIgPSAwLCBtYXg6IG51bWJlciA9IDEsIHJhbmQ6IFRfZnJhbmQgPSBmcmFuZCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gTWF0aC5mbG9vcihfX19nYXVzc2lhblJhbmQocmFuZCkgKiAobWF4IC0gbWluICsgMSkgKyBtaW4pO1xyXG59XHJcbmZ1bmN0aW9uIF9fX2dhdXNzaWFuUmFuZChyYW5kOiBUX2ZyYW5kID0gZnJhbmQpIHtcclxuICAgIGxldCBzdW0gPSAwO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA2OyBpICs9IDEpIHtcclxuICAgICAgICBzdW0gKz0gcmFuZCgpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHN1bSAvIDY7XHJcbn1cclxuXHJcbi8vIOWwkeOBl+ecn+mdouebruOBquato+imj+WIhuW4g+S5seaVsCjmlbTmlbApXHJcbmV4cG9ydCBmdW5jdGlvbiBfaW5yYW5kKG1pbjogbnVtYmVyID0gMCwgbWF4OiBudW1iZXIgPSAxLCBkZDogbnVtYmVyID0gMy4wLCByYW5kOiBUX2ZyYW5kID0gZnJhbmQpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIE1hdGguZmxvb3IoX25yYW5kKG1pbiwgbWF4LCBkZCwgcmFuZCkpO1xyXG59XHJcblxyXG4vLyDlsJHjgZfnnJ/pnaLnm67jgarmraPopo/liIbluIPkubHmlbAo5a6f5pWwKVxyXG4vLyDkuIDmp5jnorrnjoflpInmlbBhLGLjgpLlpInmlbDplqLmlbDjgpLnlKjjgYTjgaYgeD1mKGEsYiksIHk9ZyhhLGIp44Go44GX44GmMuOBpOOBruato+imj+WIhuW4g+S5seaVsHgseeOCkuW+l+OCi1xyXG4vLyB4ID0gZihhLGIpID0gc3FydCgtMipsb2coYSkpICogc2luKDIqz4AqYikgXHJcbi8vIHkgPSBnKGEsYikgPSBzcXJ0KC0yKmxvZyhhKSkgKiBjb3MoMirPgCpiKSBcclxuZXhwb3J0IGZ1bmN0aW9uIF9ucmFuZChtaW46IG51bWJlciA9IDAuMCwgbWF4OiBudW1iZXIgPSAxLjAsIGRkOiBudW1iZXIgPSAzLjAsIHJhbmQ6IFRfZnJhbmQgPSBmcmFuZCk6IG51bWJlciB7XHJcbiAgICBjb25zdCBhdmUgPSAwLjU7XHJcbiAgICBjb25zdCBhID0gcmFuZCgpO1xyXG4gICAgY29uc3QgYiA9IHJhbmQoKTtcclxuICAgIGxldCB4ID0gYXZlICsgX2ZhYihhLCBiKSAvICgyLjAgKiBkZCk7IC8vIOOBk+OBk+OBvuOBp+OAgU4oMCwxKeOBruato+imj+WIhuW4g+S5seaVsOOBruS9nOaIkFxyXG5cclxuICAgIHggPSBtaW4gKyB4ICogKG1heCAtIG1pbik7XHJcbiAgICB4ID0gX21heChbbWluLCB4XSk7XHJcbiAgICB4ID0gX21pbihbbWF4LCB4XSk7XHJcbiAgICByZXR1cm4geDtcclxufVxyXG5mdW5jdGlvbiBfZmFiKGE6IG51bWJlciwgYjogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgIHJldHVybiBNYXRoLnNxcnQoLTIuMCAqIE1hdGgubG9nKGEpKSAqIE1hdGguc2luKDIuMCAqIE1hdGguUEkgKiBiKTtcclxufVxyXG5mdW5jdGlvbiBfZ2FiKGE6IG51bWJlciwgYjogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgIHJldHVybiBNYXRoLnNxcnQoLTIuMCAqIE1hdGgubG9nKGEpKSAqIE1hdGguY29zKDIuMCAqIE1hdGguUEkgKiBiKTtcclxufVxyXG5cclxuXHJcbi8vIOOCt+ODvOODieWApOOCkueUqOOBhOOBn+S5seaVsFxyXG5leHBvcnQgY2xhc3MgQ19TZWVkZWRSYW5kIHtcclxuICAgIHByb3RlY3RlZCBzZWVkOiBudW1iZXI7XHJcbiAgICBwcm90ZWN0ZWQgZmlyc3Rfc2VlZDogbnVtYmVyO1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihzZWVkOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnNlZWQgPSBzZWVkO1xyXG4gICAgICAgIHRoaXMuZmlyc3Rfc2VlZCA9IHNlZWQ7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgcmVzZXQoKSB7XHJcbiAgICAgICAgdGhpcy5zZWVkID0gdGhpcy5maXJzdF9zZWVkO1xyXG4gICAgfVxyXG4gICAgLy8g5Lmx5pWw55Sf5oiQ44Oh44K944OD44OJXHJcbiAgICBwdWJsaWMgcmFuZG9tKCk6IG51bWJlciB7XHJcbiAgICAgICAgdGhpcy5zZWVkID0gKHRoaXMuc2VlZCAqIDkzMDEgKyA0OTI5NykgJSAyMzMyODA7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VlZCAvIDIzMzI4MC4wO1xyXG4gICAgfVxyXG59XHJcblxyXG4vL+ODpuODi+ODvOOCr0lEKHV1aWQp44Gu55Sf5oiQXHJcbmV4cG9ydCBmdW5jdGlvbiBfZ2V0X3V1aWQobGVuOiBudW1iZXIgPSAyMCwgcmFuZDogVF9mcmFuZCA9IGZyYW5kKTogc3RyaW5nIHtcclxuICAgIGNvbnN0IGxmdCA9IChuZXcgRGF0ZSgpKS5nZXRUaW1lKCkudG9TdHJpbmcoMTYpOyAvLyDjgZ/jgbbjgpMxM+ahgVxyXG4gICAgY29uc3Qgcmd0X2xlbiA9IF9tYXgoW2xlbiAtIGxmdC5sZW5ndGgsIDFdKTtcclxuXHJcbiAgICBjb25zdCByZ3QgPSBNYXRoLmZsb29yKE1hdGgucG93KDEwLCByZ3RfbGVuKSAqIHJhbmQoKSkudG9TdHJpbmcoMTYpO1xyXG4gICAgcmV0dXJuIGxmdCArIHJndDtcclxufVxyXG5cclxuLy8g56K6546H44Gr5Z+644Gl44GP6KaB57Sg6YG45oqeXHJcbmV4cG9ydCB0eXBlIFRfU2VsZWN0SXRlbSA9IHtcclxuICAgIHJhdGlvOiBudW1iZXIsXHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIF9zZWxlY3RJdGVtKGl0ZW1zOiBUX1NlbGVjdEl0ZW1bXSwgcmFuZDogVF9mcmFuZCA9IGZyYW5kKTogVF9TZWxlY3RJdGVtIHwgdW5kZWZpbmVkIHtcclxuICAgIHZhciB0dGw6bnVtYmVyID0gMDtcclxuICAgIGZvciAobGV0IGl0ZW0gb2YgaXRlbXMpIHR0bCArPSBpdGVtLnJhdGlvO1xyXG5cclxuICAgIGNvbnN0IHRhcmdldCA9IF9pcmFuZCgwLCB0dGwsIHJhbmQpO1xyXG4gICAgdmFyIHN1bSA9IDA7XHJcbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMpIHtcclxuICAgICAgICBzdW0gKz0gaXRlbS5yYXRpbztcclxuICAgICAgICBpZiAodGFyZ2V0IDwgc3VtKSB7XHJcbiAgICAgICAgICByZXR1cm4gaXRlbTtcclxuICAgICAgICB9XHJcbiAgICB9IFxyXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcclxufVxyXG5cclxuLy8g6YWN5YiX44Gu44K344Oj44OD44OV44OrXHJcbmV4cG9ydCBmdW5jdGlvbiBfc2h1ZmZsZUFycmF5PFQ+KGFycmF5OiBUW10sIHJhbmQ6IFRfZnJhbmQgPSBmcmFuZCk6IFRbXSB7XHJcbiAgICBsZXQgc2h1ZmZsZWRBcnJheSA9IFsuLi5hcnJheV07IC8vIOWFg+OBrumFjeWIl+OCkuWkieabtOOBl+OBquOBhOOCiOOBhuOBq+OCs+ODlOODvOOBmeOCi1xyXG4gICAgZm9yIChsZXQgaSA9IHNodWZmbGVkQXJyYXkubGVuZ3RoIC0gMTsgaSA+IDA7IGktLSkge1xyXG4gICAgICAgIC8vIOODqeODs+ODgOODoOOBquS9jee9ruOCkuaxuuWumlxyXG4gICAgICAgIGNvbnN0IGogPSBfaXJhbmQoMCwgaSwgcmFuZCk7XHJcbiAgICAgICAgLy8g6KaB57Sg44Gu5YWl44KM5pu/44GIXHJcbiAgICAgICAgW3NodWZmbGVkQXJyYXlbaV0sIHNodWZmbGVkQXJyYXlbal1dID0gW3NodWZmbGVkQXJyYXlbal0sIHNodWZmbGVkQXJyYXlbaV1dO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHNodWZmbGVkQXJyYXk7IC8vIOOCt+ODo+ODg+ODleODq+OBleOCjOOBn+mFjeWIl+OCkui/lOOBmVxyXG59XHJcblxyXG4vLyDkubHmlbDjgavjgojjgovmloflrZfliJfnlJ/miJBcclxuZXhwb3J0IGZ1bmN0aW9uIF9yYW5kb21fc3RyKGxlbmd0aDogbnVtYmVyKTogc3RyaW5nIHtcclxuICAgIGxldCBzdHIgPSAnJztcclxuICAgIGZvciAobGV0IGk9MDsgaSA8IGxlbmd0aDsgaSsrKSBzdHIgKz0gX3JhbmRvbV9DaGFyKCk7XHJcbiAgICByZXR1cm4gc3RyO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBfcmFuZG9tX1VwcGVyU3RyKGxlbmd0aDogbnVtYmVyKTogc3RyaW5nIHtcclxuICAgIGxldCBzdHIgPSAnJztcclxuICAgIGZvciAobGV0IGk9MDsgaSA8IGxlbmd0aDsgaSsrKSBzdHIgKz0gX3JhbmRvbV9VcHBlckNoYXIoKTtcclxuICAgIHJldHVybiBzdHI7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIF9yYW5kb21fTG93ZXJTdHIobGVuZ3RoOiBudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgbGV0IHN0ciA9ICcnO1xyXG4gICAgZm9yIChsZXQgaT0wOyBpIDwgbGVuZ3RoOyBpKyspIHN0ciArPSBfcmFuZG9tX0xvd2VyQ2hhcigpO1xyXG4gICAgcmV0dXJuIHN0cjtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gX3JhbmRvbV9VcHBlckNoYXIoKTogc3RyaW5nIHtcclxuICAgIGNvbnN0IHZhbCA9IF9pcmFuZCgwLDI2KVxyXG4gICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoNjUrdmFsKTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gX3JhbmRvbV9Mb3dlckNoYXIoKTogc3RyaW5nIHtcclxuICAgIGNvbnN0IHZhbCA9IF9pcmFuZCgwLDI2KVxyXG4gICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoOTUrdmFsKTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gX3JhbmRvbV9OdW1DaGFyKCk6IHN0cmluZyB7XHJcbiAgICBjb25zdCB2YWwgPSBfaXJhbmQoMCw5KVxyXG4gICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoNDgrdmFsKTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gX3JhbmRvbV9DaGFyKCk6IHN0cmluZyB7XHJcbiAgICBjb25zdCB2YWwgPSBfaXJhbmQoMCw2MSlcclxuICAgIGlmICh2YWwgPCAyNikgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoNjUrdmFsKTtcclxuICAgIGlmICh2YWwgPCA1MikgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoOTcrdmFsLTI2KTtcclxuICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKDQ4K3ZhbC01Mik7XHJcbn1cclxuIiwiZXhwb3J0IGNsYXNzIENfRGlzcGxheU1lc3NhZ2Uge1xyXG4gICAgcHJvdGVjdGVkIHN0YXRpYyAgbWU6IENfRGlzcGxheU1lc3NhZ2U7XHJcbiAgICBwcm90ZWN0ZWQgaWQ6ICBzdHJpbmc7XHJcbiAgICBwcm90ZWN0ZWQgZGl2OiBIVE1MRGl2RWxlbWVudDtcclxuXHJcbiAgICBwcm90ZWN0ZWQgY29uc3RydWN0b3IoY29uOiBIVE1MRWxlbWVudCwgaWQ6IHN0cmluZyA9ICdjbGllbnRfbWVzc2FnZScpIHtcclxuICAgICAgICBDX0Rpc3BsYXlNZXNzYWdlLm1lID0gdGhpcztcclxuXHJcbiAgICAgICAgdGhpcy5pZCAgID0gaWQ7XHJcbiAgICAgICAgdGhpcy5kaXYgID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JykgYXMgSFRNTERpdkVsZW1lbnQ7XHJcbiAgICAgICAgaWYgKHRoaXMuZGl2ID09PSBudWxsKSBhbGVydCgnQ2FuIG5vdCBmb3VubmQgRGl2I2NsaWVudF9tZXNzYWdlIScpO1xyXG4gICAgICAgIHRoaXMuZGl2LnNldEF0dHJpYnV0ZSgnaWQnLCB0aGlzLmlkKTtcclxuXHJcbiAgICAgICAgY29uLmluc2VydEJlZm9yZSh0aGlzLmRpdiwgY29uLmZpcnN0Q2hpbGQpO1xyXG4gICAgICAgIENfRGlzcGxheU1lc3NhZ2UubWUuY2xlYXJfbWVzc2FnZSgpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRPYmooY29uOiBIVE1MRWxlbWVudHxudWxsID0gbnVsbCwgaWQ6IHN0cmluZyA9ICdjbGllbnRfbWVzc2FnZScpXHJcbiAgICAgICAgICAgICAgICA6IENfRGlzcGxheU1lc3NhZ2UgIHtcclxuICAgICAgICBpZiAodHlwZW9mIHRoaXMubWUgIT09IFwib2JqZWN0XCIgfHwgISh0aGlzLm1lIGluc3RhbmNlb2YgQ19EaXNwbGF5TWVzc2FnZSkpIHsgXHJcbiAgICAgICAgICAgIGlmIChjb24gPT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpIGFzIEhUTUxEaXZFbGVtZW50O1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjb24pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubWUgPSBuZXcgQ19EaXNwbGF5TWVzc2FnZShjb24sIGlkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubWU7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZGlzcGxheV9tZXNzYWdlKG1lczogc3RyaW5nLCBmcl9jb2xvciA9ICdpbmhlcml0JywgYmdfY29sb3I6IHN0cmluZyA9ICdpbmhlcml0Jykge1xyXG4gICAgICAgIGNvbnN0IHAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJykgYXMgSFRNTFBhcmFncmFwaEVsZW1lbnQ7XHJcbiAgICAgICAgcC5zdHlsZS5zZXRQcm9wZXJ0eSgnY29sb3InLCAgICAgICAgICAgIGZyX2NvbG9yKTtcclxuICAgICAgICBwLnN0eWxlLnNldFByb3BlcnR5KCdiYWNrZ3JvdW5kLWNvbG9yJywgYmdfY29sb3IpO1xyXG4gICAgICAgIHAuaW5uZXJIVE1MID0gbWVzO1xyXG4gICAgICAgIC8vIOiomOmMsuWei+ODoeODg+OCu+ODvOOCuOOBquOBruOBp+WFiOmgreOBq+i/veWKoOOBl+OBpuOBhOOBj1xyXG4gICAgICAgIHRoaXMuZGl2Lmluc2VydEJlZm9yZShwLCB0aGlzLmRpdi5maXJzdENoaWxkKTsgXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsZWFyX21lc3NhZ2UoKSB7XHJcbiAgICAgICAgd2hpbGUgKHRoaXMuZGl2LmZpcnN0Q2hpbGQpIHtcclxuICAgICAgICAgICAgdGhpcy5kaXYucmVtb3ZlQ2hpbGQodGhpcy5kaXYuZmlyc3RDaGlsZCk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBub3JtYWxfbWVzc2FnZShtZXM6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuZGlzcGxheV9tZXNzYWdlKG1lcyk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgbm90aWNlX21lc3NhZ2UobWVzOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLmRpc3BsYXlfbWVzc2FnZShtZXMsICcjMDA2NjAwJywgJyNjY2ZmY2MnKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyB3YXJuaW5nX21lc3NhZ2UobWVzOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLmRpc3BsYXlfbWVzc2FnZShtZXMsICcjZmZmZmZmJywgJyNmZjAwMDAnKTtcclxuICAgIH1cclxufVxyXG4iLCJleHBvcnQgY2xhc3MgQ19PbmVMaW5lVmlld01lc3NhZ2Uge1xyXG4gICAgcHJvdGVjdGVkIHN0YXRpYyAgbWUgOiB7W2lkOiBzdHJpbmddOiBDX09uZUxpbmVWaWV3TWVzc2FnZX07XHJcbiAgICBwcm90ZWN0ZWQgcCAgOiBIVE1MUGFyYWdyYXBoRWxlbWVudDtcclxuXHJcbiAgICBwcm90ZWN0ZWQgY29uc3RydWN0b3IoaWQ6IHN0cmluZywgcGFyZW50PzogSFRNTEVsZW1lbnQpIHtcclxuICAgICAgICBDX09uZUxpbmVWaWV3TWVzc2FnZS5tZSA/Pz0ge31cclxuICAgICAgICBDX09uZUxpbmVWaWV3TWVzc2FnZS5tZVtpZF0gPSB0aGlzO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHRoaXMucCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKSBhcyBIVE1MUGFyYWdyYXBoRWxlbWVudDtcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgdGhpcy5wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xyXG4gICAgICAgICAgICB0aGlzLnAuaWQgPSBpZDtcclxuXHJcbiAgICAgICAgICAgIHBhcmVudCA/Pz0gZG9jdW1lbnQuYm9keTtcclxuICAgICAgICAgICAgcGFyZW50LmFwcGVuZENoaWxkKHRoaXMucCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIENfT25lTGluZVZpZXdNZXNzYWdlLm1lW2lkXS5jbGVhcl9tZXNzYWdlKCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc3RhdGljIGdldE9iaihpZDogc3RyaW5nLCBwYXJlbnQ/OiBIVE1MRWxlbWVudCk6IENfT25lTGluZVZpZXdNZXNzYWdlICB7XHJcbiAgICAgICAgQ19PbmVMaW5lVmlld01lc3NhZ2UubWUgPz89IHt9XHJcbiAgICAgICAgdGhpcy5tZVtpZF0gPz89IG5ldyBDX09uZUxpbmVWaWV3TWVzc2FnZShpZCwgcGFyZW50KTtcclxuICAgICAgICByZXR1cm4gdGhpcy5tZVtpZF07XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZGlzcGxheV9tZXNzYWdlKG1lczogc3RyaW5nLCBmcl9jb2xvciA9ICdpbmhlcml0JywgYmdfY29sb3I6IHN0cmluZyA9ICdpbmhlcml0Jykge1xyXG4gICAgICAgIHRoaXMucC5zdHlsZS5zZXRQcm9wZXJ0eSgnY29sb3InLCAgICAgICAgICAgIGZyX2NvbG9yKTtcclxuICAgICAgICB0aGlzLnAuc3R5bGUuc2V0UHJvcGVydHkoJ2JhY2tncm91bmQtY29sb3InLCBiZ19jb2xvcik7XHJcbiAgICAgICAgdGhpcy5wLmlubmVySFRNTCA9IG1lcztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xlYXJfbWVzc2FnZSgpIHtcclxuICAgICAgICB0aGlzLmRpc3BsYXlfbWVzc2FnZSgn44CAJyk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgbm9ybWFsX21lc3NhZ2UobWVzOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLmRpc3BsYXlfbWVzc2FnZShtZXMpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIG5vdGljZV9tZXNzYWdlKG1lczogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5kaXNwbGF5X21lc3NhZ2UobWVzLCAnIzAwNjYwMCcsICcjY2NmZmNjJyk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgd2FybmluZ19tZXNzYWdlKG1lczogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5kaXNwbGF5X21lc3NhZ2UobWVzLCAnI2ZmZmZmZicsICcjZmYwMDAwJyk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgZ19kZWJ1ZyB9ICAgICAgICBmcm9tIFwiLi4vZF9jbW4vZ2xvYmFsXCI7XHJcbmltcG9ydCB7IGdfbWF6ZSwgZ190ZWFtIH0gZnJvbSBcIi4vZ2xvYmFsX2Zvcl9tYXplXCI7XHJcbmltcG9ydCB7IFxyXG4gICAgZG9faW5zdGFudF9sb2FkLCBcclxuICAgIGRvX2luc3RhbnRfc2F2ZSwgXHJcbiAgICBkb19tb3ZlX2JvdHRvbV9oYWxmIFxyXG59ICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gXCIuL0Zfc2V0X21vdmVfbW9kZVwiO1xyXG5cclxuXHJcbmV4cG9ydCB0eXBlIFRfQ3Rscz0ge1xyXG4gICAgbmFtZTogIHN0cmluZyxcclxuICAgIGRvX1U/OiBUX21hcmcsIFxyXG4gICAgZG9fRD86IFRfbWFyZywgXHJcbiAgICBkb19MPzogVF9tYXJnLCBcclxuICAgIGRvX1I/OiBUX21hcmcsIFxyXG4gICAgaXNPSz86IFRfbWFyZywgXHJcbiAgICBpc05HPzogVF9tYXJnLCBcclxuICAgIGlzU0w/OiBUX21hcmcsIFxyXG4gICAgaXNSVD86IFRfbWFyZywgXHJcbiAgICBtZW51PzogVF9tYXJnLCBcclxuICAgIGNwT0s/OiBUX21hcmcsIFxyXG4gICAgY3BORz86IFRfbWFyZywgXHJcbiAgICBjcFNMPzogVF9tYXJnLCBcclxuICAgIGNwUlQ/OiBUX21hcmcsIFxyXG4gICAga2V5RXZlbnQ/OiBUX2thcmcsXHJcbn1cclxudHlwZSBUX21mbmMgPSAoZT86IE1vdXNlRXZlbnQpPT4odm9pZHxib29sZWFuKTtcclxudHlwZSBUX21hcmcgPSBUX21mbmMgfCB1bmRlZmluZWQ7XHJcbiBcclxudHlwZSBUX2tmbmMgPSAoZTogS2V5Ym9hcmRFdmVudCk9Pih2b2lkfGJvb2xlYW4pO1xyXG50eXBlIFRfa2FyZyA9IFRfa2ZuYyB8IHVuZGVmaW5lZDtcclxuXHJcbmV4cG9ydCBjbGFzcyBDX0RlZmF1bHRDdGxzIHtcclxuICAgIHByb3RlY3RlZCBzdGF0aWMgbWU6IENfRGVmYXVsdEN0bHM7XHJcbiAgICBwcm90ZWN0ZWQgY3Rsczoge1tuYW1lOiBzdHJpbmddOiBUX0N0bHN9O1xyXG4gICAgcHJvdGVjdGVkIGZsZ3M6IHtbbmFtZTogc3RyaW5nXTogYm9vbGVhbn07XHJcblxyXG4gICAgcHJvdGVjdGVkIHVfYXJyOiBIVE1MQnV0dG9uRWxlbWVudDtcclxuICAgIHByb3RlY3RlZCBkX2FycjogSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcbiAgICBwcm90ZWN0ZWQgbF9hcnI6IEhUTUxCdXR0b25FbGVtZW50O1xyXG4gICAgcHJvdGVjdGVkIHJfYXJyOiBIVE1MQnV0dG9uRWxlbWVudDtcclxuICAgIHByb3RlY3RlZCB5X2J0bjogSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcbiAgICBwcm90ZWN0ZWQgbl9idG46IEhUTUxCdXR0b25FbGVtZW50O1xyXG4gICAgcHJvdGVjdGVkIHNfYnRuOiBIVE1MQnV0dG9uRWxlbWVudDtcclxuICAgIHByb3RlY3RlZCByX2J0bjogSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcbiAgICBwcm90ZWN0ZWQgbV9idG46IEhUTUxCdXR0b25FbGVtZW50O1xyXG4gICAgcHJvdGVjdGVkIHlfY3AxOiBIVE1MQnV0dG9uRWxlbWVudDtcclxuICAgIHByb3RlY3RlZCBuX2NwMTogSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcbiAgICBwcm90ZWN0ZWQgc19jcDE6IEhUTUxCdXR0b25FbGVtZW50O1xyXG4gICAgcHJvdGVjdGVkIHJfY3AxOiBIVE1MQnV0dG9uRWxlbWVudDtcclxuXHJcbiAgICBwcm90ZWN0ZWQgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5jdGxzID0ge307XHJcbiAgICAgICAgdGhpcy5mbGdzID0ge307XHJcblxyXG4gICAgICAgIHRoaXMudV9hcnIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndV9hcnInKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcclxuICAgICAgICB0aGlzLmRfYXJyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RfYXJyJykgYXMgSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcbiAgICAgICAgdGhpcy5sX2FyciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsX2FycicpIGFzIEhUTUxCdXR0b25FbGVtZW50O1xyXG4gICAgICAgIHRoaXMucl9hcnIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncl9hcnInKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcclxuICAgICAgICB0aGlzLnlfYnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3lfYnRuJykgYXMgSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcbiAgICAgICAgdGhpcy5uX2J0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduX2J0bicpIGFzIEhUTUxCdXR0b25FbGVtZW50O1xyXG4gICAgICAgIHRoaXMuc19idG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc19idG4nKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcclxuICAgICAgICB0aGlzLnJfYnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JfYnRuJykgYXMgSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcbiAgICAgICAgdGhpcy5tX2J0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtX2J0bicpIGFzIEhUTUxCdXR0b25FbGVtZW50O1xyXG4gICAgICAgIHRoaXMueV9jcDEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgneV9jcDEnKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcclxuICAgICAgICB0aGlzLm5fY3AxID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25fY3AxJykgYXMgSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcbiAgICAgICAgdGhpcy5zX2NwMSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzX2NwMScpIGFzIEhUTUxCdXR0b25FbGVtZW50O1xyXG4gICAgICAgIHRoaXMucl9jcDEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncl9jcDEnKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcclxuXHJcbiAgICAgICAgdGhpcy51X2Fyci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIHRoaXMuZF9hcnIuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICB0aGlzLmxfYXJyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgdGhpcy5yX2Fyci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIHRoaXMueV9idG4uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICB0aGlzLm5fYnRuLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgdGhpcy5zX2J0bi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIHRoaXMucl9idG4uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICB0aGlzLm1fYnRuLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgdGhpcy55X2NwMS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIHRoaXMubl9jcDEuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICB0aGlzLnNfY3AxLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgdGhpcy5yX2NwMS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRPYmooKTogQ19EZWZhdWx0Q3RscyB7XHJcbiAgICAgICAgdGhpcy5tZSA/Pz0gIG5ldyBDX0RlZmF1bHRDdGxzKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubWU7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgY2xyKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHRoaXMuY3RscyA9IHt9O1xyXG4gICAgICAgIHRoaXMuZmxncyA9IHt9O1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldChuYW1lOiBzdHJpbmd8VF9DdGxzLCBjdGxzPzpUX0N0bHMpOiBib29sZWFuIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIG5hbWUgPT09ICdzdHJpbmcnICYmIGN0bHMgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdGxzW25hbWVdID0gY3RscztcclxuICAgICAgICAgICAgICAgIHRoaXMuZmxnc1tuYW1lXSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYyA9IG5hbWUgYXMgVF9DdGxzO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdGxzW2MubmFtZV0gPSBjO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mbGdzW2MubmFtZV0gPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBybXYoY3Rsczogc3RyaW5nfFRfQ3Rscyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5hbWUgPSB0eXBlb2YgY3RscyA9PT0gJ3N0cmluZycgPyBjdGxzIDogY3Rscy5uYW1lO1xyXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5jdGxzW25hbWVdO1xyXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5mbGdzW25hbWVdO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9IGNhdGNoKGVycikge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIGRlYWN0KCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGZvciAoY29uc3QgaWkgaW4gdGhpcy5jdGxzKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmN0bHNbaWldLm5hbWUgPT09IHVuZGVmaW5lZCkgY29udGludWU7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5fcm12X2RlZmF1bHRfY3Rscyh0aGlzLmN0bHNbaWldLm5hbWUgYXMgc3RyaW5nKSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBhY3QoY3Rsczogc3RyaW5nfFRfQ3Rscyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmKCF0aGlzLmRlYWN0KCkpIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgY29uc3QgbmFtZSA9IHR5cGVvZiBjdGxzID09PSAnc3RyaW5nJyA/IGN0bHMgOiBjdGxzLm5hbWU7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9hZGRfZGVmYXVsdF9jdGxzKG5hbWUpO1xyXG4gICAgICAgIH0gY2F0Y2goZXJyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGlzX2FjdChjdGxzOiBzdHJpbmd8VF9DdGxzKTogYm9vbGVhbiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgbmFtZSA9IHR5cGVvZiBjdGxzID09PSAnc3RyaW5nJyA/IGN0bHMgOiBjdGxzLm5hbWU7XHJcbiAgICAgICAgICAgIHJldHVybiAgdGhpcy5mbGdzW25hbWVdID8/IGZhbHNlO1xyXG4gICAgICAgIH0gY2F0Y2goZXJyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGtleXNfb2ZfYWRkKCk6IHN0cmluZ1tdIHtcclxuICAgICAgICBjb25zdCBrZXlfbGlzdCA9IFtdIGFzIHN0cmluZ1tdO1xyXG4gICAgICAgIGZvciAoY29uc3QgbmFtZSBpbiB0aGlzLmN0bHMpIGtleV9saXN0LnB1c2gobmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIGtleV9saXN0O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBrZXlzX29mX2FjdCgpOiBzdHJpbmdbXSB7XHJcbiAgICAgICAgY29uc3Qga2V5X2xpc3QgPSBbXSBhcyBzdHJpbmdbXTtcclxuICAgICAgICBmb3IgKGNvbnN0IG5hbWUgaW4gdGhpcy5mbGdzKSBpZiAodGhpcy5mbGdzW25hbWVdKSBrZXlfbGlzdC5wdXNoKG5hbWUpO1xyXG4gICAgICAgIHJldHVybiBrZXlfbGlzdDtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgX3Jtdl9kZWZhdWx0X2N0bHMobmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICAgICAgLy8gZmxnc1tuYW1lXeOBjOWumue+qeOBleOCjOOBpuOBhOOBquOBhFxyXG4gICAgICAgIC8vIOOBpOOBvuOCil9hZGRfZGVmYXVsdF9jdGxz44GM44G+44Gg5ZG844Gw44KM44Gm44Gq44GEKGN0bHPjgYxhZGTjgZXjgozjgabjgarjgYQp44GL44CBXHJcbiAgICAgICAgLy8gX2FsbF9jdGxzX25hbWVbY2FsbC5uYW1lXeOBjGZhbHNlKOaXouOBq2N0bGxz44GMcmVtb3Zl44GV44KM44Gm44GE44KLKeOBquOCieOAgVxyXG4gICAgICAgIC8vIOS9leOCguOBl+OBquOBhOOAglxyXG4gICAgICAgIHRoaXMuZmxnc1tuYW1lXSA/Pz0gZmFsc2U7IFxyXG4gICAgXHJcbiAgICAgICAgaWYgKCF0aGlzLmZsZ3NbbmFtZV0pIHJldHVybiB0cnVlO1xyXG4gICAgICAgIHRoaXMuZmxnc1tuYW1lXSA9IGZhbHNlO1xyXG5cclxuICAgICAgICBjb25zdCBjID0gdGhpcy5jdGxzW25hbWVdO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgIGlmIChfYyhjPy5kb19VKSkgdGhpcy51X2Fyci5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYy5kb19VIGFzIFRfbWZuYywgZmFsc2UpO1xyXG4gICAgICAgICAgICBpZiAoX2MoYz8uZG9fRCkpIHRoaXMuZF9hcnIucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGMuZG9fRCBhcyBUX21mbmMsIGZhbHNlKTtcclxuICAgICAgICAgICAgaWYgKF9jKGM/LmRvX0wpKSB0aGlzLmxfYXJyLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjLmRvX0wgYXMgVF9tZm5jLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIGlmIChfYyhjPy5kb19SKSkgdGhpcy5yX2Fyci5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYy5kb19SIGFzIFRfbWZuYywgZmFsc2UpO1xyXG4gICAgICAgICAgICBpZiAoX2MoYz8uaXNPSykpIHRoaXMueV9idG4ucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGMuaXNPSyBhcyBUX21mbmMsIGZhbHNlKTtcclxuICAgICAgICAgICAgaWYgKF9jKGM/LmlzTkcpKSB0aGlzLm5fYnRuLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjLmlzTkcgYXMgVF9tZm5jLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIGlmIChfYyhjPy5pc1NMKSkgdGhpcy5zX2J0bi5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYy5pc1NMIGFzIFRfbWZuYywgZmFsc2UpO1xyXG4gICAgICAgICAgICBpZiAoX2MoYz8uaXNSVCkpIHRoaXMucl9idG4ucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGMuaXNSVCBhcyBUX21mbmMsIGZhbHNlKTtcclxuICAgICAgICAgICAgaWYgKF9jKGM/Lm1lbnUpKSB0aGlzLm1fYnRuLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjLm1lbnUgYXMgVF9tZm5jLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIGlmIChfYyhjPy5jcE9LKSkgdGhpcy55X2NwMS5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYy5jcE9LIGFzIFRfbWZuYywgZmFsc2UpO1xyXG4gICAgICAgICAgICBpZiAoX2MoYz8uY3BORykpIHRoaXMubl9jcDEucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGMuY3BORyBhcyBUX21mbmMsIGZhbHNlKTtcclxuICAgICAgICAgICAgaWYgKF9jKGM/LmNwU0wpKSB0aGlzLnNfY3AxLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjLmNwU0wgYXMgVF9tZm5jLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIGlmIChfYyhjPy5jcFJUKSkgdGhpcy5yX2NwMS5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYy5jcFJUIGFzIFRfbWZuYywgZmFsc2UpO1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICBpZiAoYz8ua2V5RXZlbnQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBjLmtleUV2ZW50KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywga2V5X3ByZXNzX2Z1bmN0aW9uKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLnVfYXJyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgIHRoaXMuZF9hcnIuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgdGhpcy5sX2Fyci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICB0aGlzLnJfYXJyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgIHRoaXMueV9idG4uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgdGhpcy5uX2J0bi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICB0aGlzLnNfYnRuLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgIHRoaXMucl9idG4uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgdGhpcy5tX2J0bi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICB0aGlzLnlfY3AxLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgIHRoaXMubl9jcDEuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgdGhpcy5zX2NwMS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICB0aGlzLnJfY3AxLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KCdFcnJvciBPY2N1ZXJkIGF0IFJlbW92ZSBEZWZhdWx0IEN0bHMuJyk7XHJcbiAgICAgICAgICAgIGFsZXJ0KCcnICsgZXJyKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgX2FkZF9kZWZhdWx0X2N0bHMobmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICAgICAgdGhpcy5mbGdzW25hbWVdID8/PSBmYWxzZTsgXHJcbiAgICBcclxuICAgICAgICBpZiAodGhpcy5mbGdzW25hbWVdKSByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB0aGlzLmZsZ3NbbmFtZV0gPSB0cnVlO1xyXG4gICAgXHJcbiAgICAgICAgY29uc3QgYyA9IHRoaXMuY3Rsc1tuYW1lXTtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAoX2MoYz8uZG9fVSkpIHRoaXMudV9hcnIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGMuZG9fVSBhcyBUX21mbmMsIGZhbHNlKTtcclxuICAgICAgICAgICAgaWYgKF9jKGM/LmRvX0QpKSB0aGlzLmRfYXJyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjLmRvX0QgYXMgVF9tZm5jLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIGlmIChfYyhjPy5kb19MKSkgdGhpcy5sX2Fyci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYy5kb19MIGFzIFRfbWZuYywgZmFsc2UpO1xyXG4gICAgICAgICAgICBpZiAoX2MoYz8uZG9fUikpIHRoaXMucl9hcnIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGMuZG9fUiBhcyBUX21mbmMsIGZhbHNlKTtcclxuICAgICAgICAgICAgaWYgKF9jKGM/LmlzT0spKSB0aGlzLnlfYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjLmlzT0sgYXMgVF9tZm5jLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIGlmIChfYyhjPy5pc05HKSkgdGhpcy5uX2J0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYy5pc05HIGFzIFRfbWZuYywgZmFsc2UpO1xyXG4gICAgICAgICAgICBpZiAoX2MoYz8uaXNTTCkpIHRoaXMuc19idG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGMuaXNTTCBhcyBUX21mbmMsIGZhbHNlKTtcclxuICAgICAgICAgICAgaWYgKF9jKGM/LmlzUlQpKSB0aGlzLnJfYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjLmlzUlQgYXMgVF9tZm5jLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIGlmIChfYyhjPy5tZW51KSkgdGhpcy5tX2J0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYy5tZW51IGFzIFRfbWZuYywgZmFsc2UpO1xyXG4gICAgICAgICAgICBpZiAoX2MoYz8uY3BPSykpIHRoaXMueV9jcDEuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGMuY3BPSyBhcyBUX21mbmMsIGZhbHNlKTtcclxuICAgICAgICAgICAgaWYgKF9jKGM/LmNwTkcpKSB0aGlzLm5fY3AxLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjLmNwTkcgYXMgVF9tZm5jLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIGlmIChfYyhjPy5jcFNMKSkgdGhpcy5zX2NwMS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYy5jcFNMIGFzIFRfbWZuYywgZmFsc2UpO1xyXG4gICAgICAgICAgICBpZiAoX2MoYz8uY3BSVCkpIHRoaXMucl9jcDEuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGMuY3BSVCBhcyBUX21mbmMsIGZhbHNlKTtcclxuICAgICAgICBcclxuICAgICAgICAgICAgaWYgKGM/LmtleUV2ZW50ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgYy5rZXlFdmVudCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGtleV9wcmVzc19mdW5jdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy51X2Fyci5zdHlsZS5kaXNwbGF5ID0gX2MoYz8uZG9fVSkgPyAnYmxvY2snIDogJ25vbmUnO1xyXG4gICAgICAgICAgICB0aGlzLmRfYXJyLnN0eWxlLmRpc3BsYXkgPSBfYyhjPy5kb19EKSA/ICdibG9jaycgOiAnbm9uZSc7XHJcbiAgICAgICAgICAgIHRoaXMubF9hcnIuc3R5bGUuZGlzcGxheSA9IF9jKGM/LmRvX0wpID8gJ2Jsb2NrJyA6ICdub25lJztcclxuICAgICAgICAgICAgdGhpcy5yX2Fyci5zdHlsZS5kaXNwbGF5ID0gX2MoYz8uZG9fUikgPyAnYmxvY2snIDogJ25vbmUnO1xyXG4gICAgICAgICAgICB0aGlzLnlfYnRuLnN0eWxlLmRpc3BsYXkgPSBfYyhjPy5pc09LKSA/ICdibG9jaycgOiAnbm9uZSc7XHJcbiAgICAgICAgICAgIHRoaXMubl9idG4uc3R5bGUuZGlzcGxheSA9IF9jKGM/LmlzTkcpID8gJ2Jsb2NrJyA6ICdub25lJztcclxuICAgICAgICAgICAgdGhpcy5zX2J0bi5zdHlsZS5kaXNwbGF5ID0gX2MoYz8uaXNTTCkgPyAnYmxvY2snIDogJ25vbmUnO1xyXG4gICAgICAgICAgICB0aGlzLnJfYnRuLnN0eWxlLmRpc3BsYXkgPSBfYyhjPy5pc1JUKSA/ICdibG9jaycgOiAnbm9uZSc7XHJcbiAgICAgICAgICAgIHRoaXMubV9idG4uc3R5bGUuZGlzcGxheSA9IF9jKGM/Lm1lbnUpID8gJ2Jsb2NrJyA6ICdub25lJztcclxuICAgICAgICAgICAgdGhpcy55X2NwMS5zdHlsZS5kaXNwbGF5ID0gX2MoYz8uY3BPSykgPyAnYmxvY2snIDogJ25vbmUnO1xyXG4gICAgICAgICAgICB0aGlzLm5fY3AxLnN0eWxlLmRpc3BsYXkgPSBfYyhjPy5jcE5HKSA/ICdibG9jaycgOiAnbm9uZSc7XHJcbiAgICAgICAgICAgIHRoaXMuc19jcDEuc3R5bGUuZGlzcGxheSA9IF9jKGM/LmNwU0wpID8gJ2Jsb2NrJyA6ICdub25lJztcclxuICAgICAgICAgICAgdGhpcy5yX2NwMS5zdHlsZS5kaXNwbGF5ID0gX2MoYz8uY3BSVCkgPyAnYmxvY2snIDogJ25vbmUnO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICBhbGVydCgnRXJyb3IgT2NjdWVyZCBhdCBBcHBlbmQgRGVmYXVsdCBDdGxzLicpO1xyXG4gICAgICAgICAgICBhbGVydCgnJyArIGVycik7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIF9jKGM6IFRfbWFyZyk6IGJvb2xlYW4ge1xyXG4gICAgaWYgKGMgPT09IHVuZGVmaW5lZCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgaWYgKGMgPT09IG51bGwpICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGtleV9wcmVzc19mdW5jdGlvbihlOiBLZXlib2FyZEV2ZW50KTp2b2lkICB7XHJcbiAgICBjb25zdCBuZSA9IChlLnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KT8udmFsdWUgPT09IHVuZGVmaW5lZCAvLyBOb3QgRWRpdHRpbmcgSW5wdXRFbGVtZW50XHJcblxyXG4gICAgc3dpdGNoKGUuY29kZSkgeyAvLyBBcnJvd+OBr+WPjeW/nOOBm+OBmijjgqTjg5njg7Pjg4joh6rkvZPjgYznmbrnlJ/jgZvjgZopXHJcbiAgICAgICAgY2FzZSAnQXJyb3dVcCc6IFxyXG4gICAgICAgIGNhc2UgJ051bXBhZDUnOiBcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndV9hcnInKSBhcyBIVE1MQnV0dG9uRWxlbWVudCk/LmNsaWNrKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdLZXlPJzpcclxuICAgICAgICAgICAgICAgIGlmIChuZSkgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1X2FycicpIGFzIEhUTUxCdXR0b25FbGVtZW50KT8uY2xpY2soKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ0Fycm93RG93bic6IFxyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkX2FycicpIGFzIEhUTUxCdXR0b25FbGVtZW50KT8uY2xpY2soKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ051bXBhZDInOiBcclxuICAgICAgICAgICAgICAgIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZF9hcnInKSBhcyBIVE1MQnV0dG9uRWxlbWVudCk/LmNsaWNrKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdLZXlMJzpcclxuICAgICAgICAgICAgICAgIGlmICghbmUpIGJyZWFrOyBcclxuICAgICAgICAgICAgICAgIGlmIChnX2RlYnVnLmlzT04oKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRvX2luc3RhbnRfbG9hZCgpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RfYXJyJykgYXMgSFRNTEJ1dHRvbkVsZW1lbnQpPy5jbGljaygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdBcnJvd0xlZnQnOiBcclxuICAgICAgICBjYXNlICdOdW1wYWQxJzogXHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xfYXJyJykgYXMgSFRNTEJ1dHRvbkVsZW1lbnQpPy5jbGljaygpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnS2V5Syc6XHJcbiAgICAgICAgICAgICAgICBpZiAobmUpIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbF9hcnInKSBhcyBIVE1MQnV0dG9uRWxlbWVudCk/LmNsaWNrKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdBcnJvd1JpZ2h0JzogXHJcbiAgICAgICAgY2FzZSAnTnVtcGFkMyc6IFxyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyX2FycicpIGFzIEhUTUxCdXR0b25FbGVtZW50KT8uY2xpY2soKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ1NlbWljb2xvbic6XHJcbiAgICAgICAgICAgICAgICBpZiAobmUpIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncl9hcnInKSBhcyBIVE1MQnV0dG9uRWxlbWVudCk/LmNsaWNrKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdFbnRlcic6XHJcbiAgICAgICAgY2FzZSAnTnVtcGFkRW50ZXInOlxyXG4gICAgICAgIGNhc2UgJ0YxMCc6XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZS5zaGlmdEtleSkgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduX2J0bicpIGFzIEhUTUxCdXR0b25FbGVtZW50KT8uY2xpY2soKTtcclxuICAgICAgICAgICAgICAgIGVsc2UgICAgICAgICAgICAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3lfYnRuJykgYXMgSFRNTEJ1dHRvbkVsZW1lbnQpPy5jbGljaygpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnS2V5WSc6XHJcbiAgICAgICAgY2FzZSAnS2V5UCc6XHJcbiAgICAgICAgY2FzZSAnRGlnaXQwJzpcclxuICAgICAgICAgICAgICAgIGlmIChuZSkgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd5X2J0bicpIGFzIEhUTUxCdXR0b25FbGVtZW50KT8uY2xpY2soKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ0YxJzpcclxuICAgICAgICBjYXNlICdOdW1wYWQwJzpcclxuICAgICAgICBjYXNlICdOdW1wYWRBZGQnOlxyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduX2J0bicpIGFzIEhUTUxCdXR0b25FbGVtZW50KT8uY2xpY2soKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ0tleU4nOlxyXG4gICAgICAgIGNhc2UgJ0tleUknOlxyXG4gICAgICAgIGNhc2UgJ0RpZ2l0OCc6XHJcbiAgICAgICAgICAgICAgICBpZiAobmUpIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbl9idG4nKSBhcyBIVE1MQnV0dG9uRWxlbWVudCk/LmNsaWNrKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdLZXlVJzpcclxuICAgICAgICAgICAgICAgIGlmICghbmUpIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgaWYgKGdfZGVidWcuaXNPTigpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgeiA9IGdfdGVhbS53YWxrKCkuZ2V0X3ooKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoeiA+IDApIGdfdGVhbS53YWxrKCkuc2V0X3ooeiAtIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRvX21vdmVfYm90dG9tX2hhbGYoJ2JsaW5rX29mZicpO1xyXG4vLyAgICAgICAgICAgICAgfSBlbHNlIHtcclxuLy8gICAgICAgICAgICAgICAgICAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VfYXJyJykgYXMgSFRNTEJ1dHRvbkVsZW1lbnQpPy5jbGljaygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnS2V5RCc6XHJcbiAgICAgICAgICAgICAgICBpZiAoIW5lKSBicmVhaztcclxuICAgICAgICAgICAgICAgIGlmIChnX2RlYnVnLmlzT04oKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHogPSBnX3RlYW0ud2FsaygpLmdldF96KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHogPCBnX21hemUuZ2V0X3pfbWF4KCktMSkgZ190ZWFtLndhbGsoKS5zZXRfeih6ICsgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9fbW92ZV9ib3R0b21faGFsZignYmxpbmtfb2ZmJyk7XHJcbi8vICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4vLyAgICAgICAgICAgICAgICAgIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndV9hcnInKSBhcyBIVE1MQnV0dG9uRWxlbWVudCk/LmNsaWNrKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdLZXlNJzpcclxuICAgICAgICBjYXNlICdOdW1wYWQ3JzpcclxuICAgICAgICAgICAgICAgIGlmIChuZSkgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtX2J0bicpICAgYXMgSFRNTEJ1dHRvbkVsZW1lbnQpPy5jbGljaygpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnRjcnOlxyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzX2J0bicpIGFzIEhUTUxCdXR0b25FbGVtZW50KT8uY2xpY2soKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ0NvbW1hJzpcclxuICAgICAgICAgICAgICAgIGlmIChuZSkgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzX2J0bicpIGFzIEhUTUxCdXR0b25FbGVtZW50KT8uY2xpY2soKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ0tleVMnOlxyXG4gICAgICAgICAgICAgICAgaWYgKCFuZSkgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBpZiAoZ19kZWJ1Zy5pc09OKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBkb19pbnN0YW50X3NhdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICBkb19tb3ZlX2JvdHRvbV9oYWxmKCdibGlua19vZmYnKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzX2J0bicpIGFzIEhUTUxCdXR0b25FbGVtZW50KT8uY2xpY2soKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ0YzJzpcclxuICAgICAgICBjYXNlICdOdW1wYWQ4JzpcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncl9idG4nKSBhcyBIVE1MQnV0dG9uRWxlbWVudCk/LmNsaWNrKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdLZXlSJzpcclxuICAgICAgICBjYXNlICdQZXJpb2QnOlxyXG4gICAgICAgICAgICAgICAgaWYgKG5lKSAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JfYnRuJykgYXMgSFRNTEJ1dHRvbkVsZW1lbnQpPy5jbGljaygpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgX2FsZXJ0IH0gICAgICAgZnJvbSBcIi4uL2RfY21uL2dsb2JhbFwiO1xyXG5pbXBvcnQge1RfTWFrZUVudW1UeXBlfSBmcm9tIFwiLi4vZF91dGwvVF9NYWtlRW51bVR5cGVcIjtcclxuZXhwb3J0IGNvbnN0IFRfVmlld01vZGU6e1ttb2RlOiBzdHJpbmddOiBzdHJpbmd9ID0ge1xyXG4gICAgTW92ZTogICAgICdtb3ZlJyxcclxuICAgIEJhdHQ6ICAgICAnYmF0dCcsXHJcbiAgICBNZW51OiAgICAgJ21lbnUnLFxyXG4gICAgTGRTdjogICAgICdsZHN2JyxcclxufSBhcyBjb25zdDtcclxuZXhwb3J0IHR5cGUgVF9WaWV3TW9kZSA9IFRfTWFrZUVudW1UeXBlPHR5cGVvZiBUX1ZpZXdNb2RlPjtcclxuXHJcbmV4cG9ydCBjbGFzcyBDX1N3aXRjaFZpZXcge1xyXG4gICAgcHJvdGVjdGVkIHN0YXRpYyBtZTogICBDX1N3aXRjaFZpZXc7XHJcbiAgICBwcm90ZWN0ZWQgc3RhdGljIGJvZHk6IEhUTUxFbGVtZW50O1xyXG4gICAgcHJvdGVjdGVkIHN0YXRpYyBhcnRpY2xlOiAgIHtbbmFtZTogc3RyaW5nXTogSFRNTEVsZW1lbnR8bnVsbH07XHJcbiAgICBwcm90ZWN0ZWQgc3RhdGljIGFsbF9jbGFzczogc3RyaW5nW107XHJcblxyXG4gICAgcHVibGljIE1vdmUoKTogc3RyaW5nIHtyZXR1cm4gVF9WaWV3TW9kZS5Nb3ZlO31cclxuICAgIHB1YmxpYyBCYXR0KCk6IHN0cmluZyB7cmV0dXJuIFRfVmlld01vZGUuQmF0dDt9XHJcbiAgICBwdWJsaWMgTWVudSgpOiBzdHJpbmcge3JldHVybiBUX1ZpZXdNb2RlLk1lbnU7fVxyXG4gICAgcHVibGljIE12UHQoKTogc3RyaW5nIHtyZXR1cm4gVF9WaWV3TW9kZS5NZW51O31cclxuICAgIHB1YmxpYyBMZFN2KCk6IHN0cmluZyB7cmV0dXJuIFRfVmlld01vZGUuTGRTdjt9XHJcblxyXG4gICAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIENfU3dpdGNoVmlldy5hbGxfY2xhc3MgPSBPYmplY3QudmFsdWVzKFRfVmlld01vZGUpO1xyXG4gICAgICAgIENfU3dpdGNoVmlldy5hcnRpY2xlID0ge307XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgQ19Td2l0Y2hWaWV3LmJvZHkgPSBkb2N1bWVudC5ib2R5O1xyXG5cclxuICAgICAgICAgICAgQ19Td2l0Y2hWaWV3LmFydGljbGUudmlldzNkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BhbmVfbWF6ZV92dzNEJykgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICAgICAgICAgIENfU3dpdGNoVmlldy5hcnRpY2xlLnZpZXdDaCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwYW5lX21hemVfdndDaCcpIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgICAgICAgICBDX1N3aXRjaFZpZXcuYXJ0aWNsZS5tZW51X2wgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGFuZV9tZW51X2xpc3QnKSBhcyBIVE1MRWxlbWVudDtcclxuICAgICAgICAgICAgQ19Td2l0Y2hWaWV3LmFydGljbGUubGRzdl9sID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BhbmVfbGRzdl9saXN0JykgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICAgICAgICAgIENfU3dpdGNoVmlldy5hcnRpY2xlLmxkc3ZfZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwYW5lX2xkc3ZfZGF0YScpIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgICAgICAgICBDX1N3aXRjaFZpZXcuYXJ0aWNsZS5tZW51X20gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGFuZV9tZW51X21lc2cnKSBhcyBIVE1MRWxlbWVudDtcclxuICAgICAgICAgICAgQ19Td2l0Y2hWaWV3LmFydGljbGUuZ2FtZV9tID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BhbmVfbWF6ZV9tZXNnJykgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICAgICAgICAgIENfU3dpdGNoVmlldy5hcnRpY2xlLmNvbnRscyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwYW5lX2N0bHNfYm9hZCcpIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgICAgICAgICBDX1N3aXRjaFZpZXcuYXJ0aWNsZS5tZXNzYWcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGFuZV9zeXRtX21lc2cnKSBhcyBIVE1MRWxlbWVudDtcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgX2FsZXJ0KCdMYXlvdXQgR2V0IEVycm9yOiAnICsgZXJyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy52aWV3KCdtb3ZlJyk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc3RhdGljIGdldE9iaigpOiBDX1N3aXRjaFZpZXcge1xyXG4gICAgICAgIHRoaXMubWUgPz89ICBuZXcgQ19Td2l0Y2hWaWV3KCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubWU7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgdmlldyhtb2RlOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICB0aGlzLl9fc2V0X2NsYXNzKG1vZGUpO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIF9fc2V0X2NsYXNzKGM6IHN0cmluZyk6IHZvaWQgeyBcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBDX1N3aXRjaFZpZXcuYm9keT8uY2xhc3NMaXN0LnJlbW92ZSguLi5DX1N3aXRjaFZpZXcuYWxsX2NsYXNzKTtcclxuICAgICAgICAgICAgQ19Td2l0Y2hWaWV3LmJvZHk/LmNsYXNzTGlzdC5hZGQoYyk7XHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgaWkgaW4gQ19Td2l0Y2hWaWV3LmFydGljbGUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChDX1N3aXRjaFZpZXcuYXJ0aWNsZVtpaV0gPT09IG51bGwpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgQ19Td2l0Y2hWaWV3LmFydGljbGVbaWldPy5jbGFzc0xpc3QucmVtb3ZlKC4uLkNfU3dpdGNoVmlldy5hbGxfY2xhc3MpO1xyXG4gICAgICAgICAgICAgICAgQ19Td2l0Y2hWaWV3LmFydGljbGVbaWldPy5jbGFzc0xpc3QuYWRkKGMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIF9hbGVydCgnTGF5b3V0IFNldCBFcnJvcjogJyArIGVycik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IF9taW4sIF9yb3VuZCB9ICAgZnJvbSBcIi4uL2RfdXRsL0ZfTWF0aFwiO1xyXG5pbXBvcnQgeyBDX1BvaW50IH0gICAgICAgIGZyb20gXCIuLi9kX21kbC9DX1BvaW50XCJcclxuaW1wb3J0IHsgQ19SYW5nZSB9ICAgICAgICBmcm9tIFwiLi4vZF9tZGwvQ19SYW5nZVwiO1xyXG5pbXBvcnQgeyBDX01hemVPYmpWaWV3IH0gIGZyb20gXCIuLi9kX21kbC9DX01hemVPYmpWaWV3XCI7XHJcbmltcG9ydCB7IFRfRGlyZWN0aW9uIH0gICAgZnJvbSBcIi4uL2RfbWRsL1RfRGlyZWN0aW9uXCI7XHJcbmltcG9ydCB7IENfV2FsbCB9ICAgICAgICAgZnJvbSBcIi4uL2RfbWRsL0NfV2FsbFwiO1xyXG5pbXBvcnQgeyBnX21lcyB9ICAgICAgICAgIGZyb20gXCIuLi9kX2Ntbi9nbG9iYWxcIjtcclxuaW1wb3J0IHsgZ19tYXplLCBnX3RlYW0sIGdfZHMgfSAgZnJvbSBcIi4vZ2xvYmFsX2Zvcl9tYXplXCI7XHJcblxyXG5leHBvcnQgdHlwZSBUX0Ryb3dTZXQgPSB7XHJcbiAgICBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50fG51bGwsXHJcbiAgICBjb246ICAgIENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRHxudWxsLFxyXG4gICAgZGVwdGg6ICBudW1iZXIsXHJcbiAgICB3YWxsOiAgIENfV2FsbHxudWxsLFxyXG59XHJcblxyXG5cclxuLy8gM0Tmj4/lhpnmmYLjgavkvb/nlKjjgZnjgovlpKfln5/lpInmlbDjga7mupblgplcclxuZXhwb3J0IGZ1bmN0aW9uIGluaXRfbWF6ZTNEKCk6IFRfRHJvd1NldCB7XHJcbiAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWF6ZV92aWV3M0RfY2FudmFzJykgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XHJcbiAgICBpZiAoY2FudmFzID09PSBudWxsKSB7XHJcbiAgICAgICAgZ19tZXMud2FybmluZ19tZXNzYWdlKCdDYW52YXMgaXNudCBmb3VuZCEgaWQ9TWF6ZV92aWV3M0RfY2FudmFzJyk7XHJcbiAgICAgICAgcmV0dXJuIHtjYW52YXM6IG51bGwsIGNvbjogbnVsbCwgZGVwdGg6IDAsIHdhbGw6IG51bGx9O1xyXG4gICAgfVxyXG4gICAgY29uc3QgY29uOiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkR8bnVsbCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG4gICAgaWYgKGNvbiA9PT0gbnVsbCkge1xyXG4gICAgICAgIGdfbWVzLndhcm5pbmdfbWVzc2FnZSgnQnJvd3NlciBkb250IHN1cnBwb3J0IDJEIGdyYXBoaWNzIScpO1xyXG4gICAgICAgIHJldHVybiB7Y2FudmFzOiBudWxsLCBjb246IG51bGwsIGRlcHRoOiAwLCB3YWxsOiBudWxsfTtcclxuICAgIH1cclxuXHJcbiAgICBDX01hemVPYmpWaWV3LnNldF9jb250ZXh0M0QoY29uKTtcclxuICAgIGluaXRfbWF6ZUNlbGwzRCgpO1xyXG5cclxuICAgIC8vIDNE44Oh44Kk44K644KS5o+P5YaZ44GZ44KL44Kt44Oj44Oz44OQ44K56KaB57Sg44Gu44K144Kk44K644KSQ1NT5LiK44Gu44CO6KaL44Gf55uu44CP44Gu44K144Kk44K644Gr5ZCI44KP44Gb44KLXHJcbiAgICBjYW52YXMud2lkdGggID0gY2FudmFzLmNsaWVudFdpZHRoO1xyXG4gICAgY2FudmFzLmhlaWdodCA9IGNhbnZhcy5jbGllbnRIZWlnaHQ7XHJcblxyXG4gICAgY29uc3QgZGVwdGggPSA1OyAvLyDlpYfmlbDjga7jgb/lr77lv5zjgILjg4Djg7Pjgrjjg6fjg7Pjga7opovpgJrjgZfjgpLoia/jgY/jgZnjgovjgarjgokgNSDjgYvjgoLjgZfjgozjgarjgYRcclxuXHJcbiAgICBjb25zdCB0b3BfcCA9IG5ldyBDX1BvaW50KDAsIDAsIDApO1xyXG4gICAgY29uc3QgYnRtX3AgPSBuZXcgQ19Qb2ludChjYW52YXMud2lkdGggIC0gMSwgY2FudmFzLmhlaWdodCAtIDEsIDApO1xyXG4gICAgY29uc3Qgd2FsbCAgPSBuZXcgQ19XYWxsKGRlcHRoLCBuZXcgQ19SYW5nZSh0b3BfcCwgYnRtX3ApKTtcclxuICAgIHJldHVybiB7Y2FudmFzOiBjYW52YXMsIGNvbjogY29uLCBkZXB0aDogZGVwdGgsIHdhbGw6IHdhbGx9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBpbml0X21hemVDZWxsM0QoKTogdm9pZCB7fVxyXG5cclxuXHJcbi8vIDNE5o+P5YaZ5pmC44Gu55S76Z2i5Yid5pyf5YyW44CC44Go44KK44GC44GI44Ga5aSp5LqV44Go5bqK44KS5o+P44GPXHJcbmZ1bmN0aW9uIGRyYXdfaW5pdF9tYXplM0QoKTogdm9pZCB7XHJcbiAgICBpZiAoZ19kcy5jYW52YXMgPT09IG51bGwgfHwgZ19kcy5jb24gPT09IG51bGwpIHJldHVybjtcclxuXHJcbiAgICBnX2RzLmNvbi5maWxsU3R5bGUgPSAnI2FhYWFhYSc7XHJcbiAgICBnX2RzLmNvbi5maWxsUmVjdChcclxuICAgICAgICAwLCBcclxuICAgICAgICAwLCBcclxuICAgICAgICBnX2RzLmNhbnZhcy53aWR0aCAtIDEsIFxyXG4gICAgICAgIGdldF9ob2xpem9uX2xpbmUoKSxcclxuICAgICk7XHJcblxyXG4gICAgZ19kcy5jb24uZmlsbFN0eWxlID0gJyM2NjY2ZmYnO1xyXG4gICAgZ19kcy5jb24uZmlsbFJlY3QoXHJcbiAgICAgICAgMCwgXHJcbiAgICAgICAgZ2V0X2hvbGl6b25fbGluZSgpLCBcclxuICAgICAgICBnX2RzLmNhbnZhcy53aWR0aCAgIC0gMSwgXHJcbiAgICAgICAgZ19kcy5jYW52YXMuaGVpZ2h0ICAtIDEsXHJcbiAgICApO1xyXG5cclxuICAgIGRyb3dfZmxvb3JfbGluZSgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRfaG9saXpvbl9saW5lKCk6IG51bWJlciB7XHJcbiAgICBpZiAoZ19kcy53YWxsID09PSBudWxsKSByZXR1cm4gLTE7XHJcbiAgICByZXR1cm4gZ19kcy53YWxsLmdldChnX2RzLmRlcHRoLCAwKS5tYXhfeTtcclxufVxyXG5cclxuZnVuY3Rpb24gZHJvd19mbG9vcl9saW5lKCk6IHZvaWQge1xyXG4gICAgaWYgKGdfZHMuY2FudmFzID09PSBudWxsIHx8IGdfZHMuY29uID09PSBudWxsIHx8IGdfZHMud2FsbCA9PT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgY29uc3QgY29uICAgPSBnX2RzLmNvbjtcclxuICAgIGNvbnN0IHdhbGwgID0gZ19kcy53YWxsO1xyXG4gICAgY29uc3QgZGVwdGggPSBnX2RzLmRlcHRoO1xyXG4gICAgY29uc3QgSF9kZXB0ID0gKGRlcHRoIC0gMSkgLyAyO1xyXG5cclxuICAgIGNvbnN0IGxlZnRfeCAgPSAwO1xyXG4gICAgY29uc3QgcmlnaHRfeCA9IGdfZHMuY2FudmFzLndpZHRoICAtIDE7XHJcbiAgICBjb25zdCBmcm9udF95ID0gZ19kcy5jYW52YXMuaGVpZ2h0IC0gMTtcclxuICAgIGNvbnN0IGJhY2tfeSAgPSBnZXRfaG9saXpvbl9saW5lKCk7XHJcblxyXG4gICAgY29uLnN0cm9rZVN0eWxlID0gJyM5OTk5ZmYnO1xyXG4gICAgY29uLmxpbmVXaWR0aCAgID0gMTtcclxuXHJcbiAgICAvLyDmqKrnt5oo55S76Z2i44Gr5a++44GX44Gm5rC05bmzKeOCkuW8leOBj1xyXG4gICAgZm9yICh2YXIgeSA9IDA7IHkgPCBkZXB0aCArIDE7IHkrKykge1xyXG4gICAgICAgIGNvbi5iZWdpblBhdGgoKTtcclxuICAgICAgICBjb24ubW92ZVRvKGxlZnRfeCAsIHdhbGwuZ2V0KHksIDApLm1heF95KTtcclxuICAgICAgICBjb24ubGluZVRvKHJpZ2h0X3gsIHdhbGwuZ2V0KHksIDApLm1heF95KTtcclxuICAgICAgICBjb24uc3Ryb2tlKCk7IFxyXG4gICAgfVxyXG5cclxuICAgIC8vIOe4pue3muOCkuW8leOBj1xyXG4gICAgZm9yICh2YXIgeCA9IC1IX2RlcHQ7IHggPCBIX2RlcHQgKyAxOyB4KyspIHtcclxuICAgICAgICBjb24uYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgY29uLm1vdmVUbyh3YWxsLmdldCgwLCAgICAgeCkubWluX3gsIGZyb250X3kpO1xyXG4gICAgICAgIGNvbi5saW5lVG8od2FsbC5nZXQoZGVwdGgsIHgpLm1pbl94LCBiYWNrX3kgKTtcclxuICAgICAgICBjb24uc3Ryb2tlKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBkaXNwbGF5X21hemUzRCgpOiB2b2lkIHtcclxuICAgIGlmIChnX2RzLmNhbnZhcyA9PT0gbnVsbCB8fCBnX2RzLmNvbiA9PT0gbnVsbCB8fCBnX2RzLndhbGwgPT09IG51bGwpIHJldHVybjtcclxuXHJcbiAgICBkcmF3X2luaXRfbWF6ZTNEKCk7XHJcbiAgICBkaXNwbGV5X21hc2UzRF9kaXJlY3Rpb24oKTtcclxuXHJcbiAgICBjb25zdCBkZXB0aCAgID0gIGdfZHMuZGVwdGg7XHJcbiAgICBjb25zdCBIX2RlcHRoID0gKGRlcHRoIC0gMSkgLyAyO1xyXG4gICAgZm9yICh2YXIgaiA9IGdfZHMuZGVwdGggLSAxOyBqID49IDA7IGotLSkge1xyXG4gICAgICAgIC8vIOWPs+WBtOOBjOimi+OBiOOBpuOBhOOCi+WjgeOBruaPj+WGmSAo5bem5YG044GL44KJ5o+P5YaZKVxyXG4gICAgICAgIGZvciAodmFyIGsgPSAtSF9kZXB0aDsgayA8IDA7IGsrKykgZHJvd01hemVDZWxsKGosIGspO1xyXG4gICAgICAgIC8vIOW3puWBtOOBjOimi+OBiOOBpuOBhOOCi+WjgeOBruaPj+WGmSAo5Y+z5YG044GL44KJ5o+P5YaZKVxyXG4gICAgICAgIGZvciAodmFyIGsgPSBIX2RlcHRoOyBrID4gMDsgay0tKSAgZHJvd01hemVDZWxsKGosIGspO1xyXG4gICAgICAgIC8vIOato+mdouOBruWjgeOBruaPj+WGmVxyXG4gICAgICAgIGRyb3dNYXplQ2VsbChqLCAwKTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZHJvd01hemVDZWxsKGQ6IG51bWJlciwgdzogbnVtYmVyKTogdm9pZCB7XHJcbiAgICBpZiAoZ19kcy53YWxsID09PSBudWxsKSByZXR1cm47XHJcbiAgICBjb25zdCBhcm91bmRfal9rID0gZ190ZWFtLndhbGsoKS5nZXRfYXJvdW5kKGQsIHcsIDApO1xyXG4gICAgY29uc3QgZnJvdF93YWxsICA9IGdfZHMud2FsbC5nZXQoZCwgdyk7XHJcbiAgICBjb25zdCBiYWNrX3dhbGwgID0gZ19kcy53YWxsLmdldChkICsgMSwgdyk7XHJcbiAgICBjb25zdCBtel9raW5kICAgID0gZ19tYXplLmdldF9raW5kKGFyb3VuZF9qX2spO1xyXG5cclxuICAgIGdfbWF6ZT8uZ2V0X2NlbGwoYXJvdW5kX2pfayk/LmRyb3czRChmcm90X3dhbGwsIGJhY2tfd2FsbCk7XHJcbiAgICBpZiAoZ19tYXplLmV4aXN0X29iaihhcm91bmRfal9rKSkge1xyXG4gICAgICAgIGNvbnN0IG9iaiA9IGdfbWF6ZS5nZXRfb2JqKGFyb3VuZF9qX2spO1xyXG4gICAgICAgIGlmIChvYmogIT09IG51bGwpIG9iai52aWV3KCk/LmRyb3czRChmcm90X3dhbGwsIGJhY2tfd2FsbCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBkaXNwbGV5X21hc2UzRF9kaXJlY3Rpb24oKTogdm9pZCB7XHJcbiAgICBjb25zdCBwX2RpciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXplX3ZpZXczRF9kaXJlY3Rpb25faW5mbycpIGFzIEhUTUxQYXJhZ3JhcGhFbGVtZW50O1xyXG4gICAgaWYgKHBfZGlyID09PSBudWxsKSB7XHJcbiAgICAgICAgZ19tZXMud2FybmluZ19tZXNzYWdlKCdQIGVsZW1lbnQgaXNudCBmb3VuZCEgaWQ9TWF6ZV92aWV3M0RfZGlyZWN0aW9uX2luZm8nKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB2YXIgZGlyZWN0aW9uOiBzdHJpbmc7XHJcbiAgICBjb25zdCBwID0gZ190ZWFtLmdldF9wZCgpO1xyXG4gICAgc3dpdGNoIChwLmQpIHtcclxuICAgICAgICBjYXNlIFRfRGlyZWN0aW9uLk46XHJcbiAgICAgICAgICAgIGRpcmVjdGlvbiA9ICc8c3BhbiBjbGFzcz1cImRpcmVjdGlvbl9OXCI+44CK5YyX44CLPC9zcGFuPic7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgVF9EaXJlY3Rpb24uRTpcclxuICAgICAgICAgICAgZGlyZWN0aW9uID0gJzxzcGFuIGNsYXNzPVwiZGlyZWN0aW9uX0VcIj7jgIrmnbHjgIs8L3NwYW4+JztcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBUX0RpcmVjdGlvbi5TOlxyXG4gICAgICAgICAgICBkaXJlY3Rpb24gPSAnPHNwYW4gY2xhc3M9XCJkaXJlY3Rpb25fU1wiPuOAiuWNl+OAizwvc3Bhbj4nO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFRfRGlyZWN0aW9uLlc6XHJcbiAgICAgICAgICAgIGRpcmVjdGlvbiA9ICc8c3BhbiBjbGFzcz1cImRpcmVjdGlvbl9XXCI+44CK6KW/44CLPC9zcGFuPic7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIGRpcmVjdGlvbiA9ICc8c3BhbiBjbGFzcz1cImRpcmVjdGlvbl9EXCI+44CK6KyO44CLPC9zcGFuPic7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG1lcyA9ICflnLDkuIsgJyArIChwLnogKyAxKSArICfpmo7jgIAnICsgZGlyZWN0aW9uICsgJ+OAgCh4ID0gPHNwYW4gaWQ9XCJkaXJlY3Rpb25fWFwiPicgKyBwLnggKyAnPC9zcGFuPiwgeSA9IDxzcGFuIGlkPVwiZGlyZWN0aW9uX1lcIj4nICsgcC55ICsgJzwvc3Bhbj4pJztcclxuICAgIHBfZGlyLmlubmVySFRNTCA9IG1lcztcclxufVxyXG5cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBtYXplM0RfYmxpbmtfb25fZGlyZWN0aW9uKCk6IHZvaWQge1xyXG4gICAgY29uc3QgZGlyX3ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGlyZWN0aW9uX1gnKSBhcyBIVE1MU3BhbkVsZW1lbnQ7XHJcbiAgICBpZiAoZGlyX3ggPT09IG51bGwpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBkaXJfeSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkaXJlY3Rpb25fWScpIGFzIEhUTUxTcGFuRWxlbWVudDtcclxuICAgIGlmIChkaXJfeSA9PT0gbnVsbCkgcmV0dXJuO1xyXG5cclxuICAgIHN3aXRjaCAoZ190ZWFtLndhbGsoKS5nZXRfZCgpKSB7XHJcbiAgICAgICAgY2FzZSBUX0RpcmVjdGlvbi5OOlxyXG4gICAgICAgIGNhc2UgVF9EaXJlY3Rpb24uUzpcclxuICAgICAgICAgICAgZGlyX3guY2xhc3NMaXN0LnJlbW92ZSgnYmxpbmsnKTtcclxuICAgICAgICAgICAgZGlyX3kuY2xhc3NMaXN0LmFkZCAgICgnYmxpbmsnKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGNhc2UgVF9EaXJlY3Rpb24uRTpcclxuICAgICAgICBjYXNlIFRfRGlyZWN0aW9uLlc6XHJcbiAgICAgICAgICAgIGRpcl94LmNsYXNzTGlzdC5hZGQgICAoJ2JsaW5rJyk7XHJcbiAgICAgICAgICAgIGRpcl95LmNsYXNzTGlzdC5yZW1vdmUoJ2JsaW5rJyk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgIH1cclxufVxyXG5leHBvcnQgZnVuY3Rpb24gbWF6ZTNEX2JsaW5rX29mZl9kaXJlY3Rpb24oKTogdm9pZCB7XHJcbiAgICBjb25zdCBkaXJfeCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkaXJlY3Rpb25fWCcpIGFzIEhUTUxTcGFuRWxlbWVudDtcclxuICAgIGlmIChkaXJfeCA9PT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgZGlyX3guY2xhc3NMaXN0LnJlbW92ZSgnYmxpbmsnKTtcclxuXHJcbiAgICBjb25zdCBkaXJfeSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkaXJlY3Rpb25fWScpIGFzIEhUTUxTcGFuRWxlbWVudDtcclxuICAgIGlmIChkaXJfeSA9PT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgZGlyX3kuY2xhc3NMaXN0LnJlbW92ZSgnYmxpbmsnKTtcclxufVxyXG5cclxuIiwiaW1wb3J0IHsgZ19kZWJ1ZywgZ19tZXMgfSBmcm9tIFwiLi4vZF9jbW4vZ2xvYmFsXCI7XHJcbmltcG9ydCB7IF9taW4sIF9yb3VuZCwgX21heCB9IGZyb20gJy4uL2RfdXRsL0ZfTWF0aCc7XHJcbmltcG9ydCB7IGdfbWF6ZSwgZ190ZWFtIH0gZnJvbSBcIi4vZ2xvYmFsX2Zvcl9tYXplXCI7XHJcblxyXG5sZXQgZGl2OiBIVE1MRGl2RWxlbWVudDtcclxubGV0IHByZTogSFRNTFByZUVsZW1lbnQ7XHJcblxyXG5sZXQgdmlld193ZHRoICAgICAgICA9IDA7XHJcbmxldCB2aWV3X2hnaHQgICAgICAgID0gMDtcclxubGV0IG1hcF93ZHRoICAgICAgICAgPSAwO1xyXG5sZXQgbWFwX2hnaHQgICAgICAgICA9IDA7XHJcbmxldCBmb250X3NpemU6bnVtYmVyID0gMDtcclxubGV0IGxpbmVfaGdodDpudW1iZXIgPSAwO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGluaXRfbWF6ZUNoKCk6IHZvaWQge1xyXG4gICAgZGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Rpdl9tYXplX3Z3Q2gnKSAgIGFzIEhUTUxEaXZFbGVtZW50O1xyXG4gICAgcHJlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hemVfdmlld0NoX3ByZScpIGFzIEhUTUxQcmVFbGVtZW50O1xyXG4gICAgY2FsY192aWV3Q2hfd2lkdGgoKTtcclxufVxyXG5cclxuLy8g44CQ5Yid5pyf6Kit5a6a44CRVmlld0No44Gu5qiq5bmF44KSQ1NT44GL44KJ6Kqt44G/6L6844KT44Gn6YGp5ZCI44GZ44KL5paH5a2X44Gu44K144Kk44K644KS6KiI566X44GX44Gm44K744OD44OI44GZ44KLXHJcbmZ1bmN0aW9uIGNhbGNfdmlld0NoX3dpZHRoKCk6IHZvaWQge1xyXG5cclxuICAgIHZpZXdfd2R0aCAgPSBkaXYuY2xpZW50V2lkdGg7XHJcbiAgICB2aWV3X2hnaHQgID0gZGl2LmNsaWVudEhlaWdodDtcclxuXHJcbiAgICBjb25zdCBjb2wgICAgPSBnX21hemUuZ2V0X3hfbWF4KCkgKyAxO1xyXG4gICAgY29uc3QgY29sX3B4ID0gdmlld193ZHRoICAvIGNvbDtcclxuXHJcbiAgICBjb25zdCByb3cgICAgPSBnX21hemUuZ2V0X3lfbWF4KCkgKyAxO1xyXG4gICAgY29uc3Qgcm93X3B4ID0gdmlld19oZ2h0IC8gcm93O1xyXG5cclxuICAgIGZvbnRfc2l6ZSAgID0gX3JvdW5kKF9tYXgoWzE1LjAsIF9yb3VuZCgxLjAwICogIF9taW4oW2NvbF9weCwgcm93X3B4XSksIDIpXSksIDApO1xyXG4gICAgbGluZV9oZ2h0ICAgPSBfcm91bmQoX21heChbMTUuMCwgX3JvdW5kKDEuMDAgKiAgX21pbihbY29sX3B4LCByb3dfcHhdKSwgMildKSwgMCk7XHJcblxyXG4gICAgbWFwX3dkdGggICAgPSBmb250X3NpemUgKiBjb2w7XHJcbiAgICBtYXBfaGdodCAgICA9IGxpbmVfaGdodCAqIGNvbDtcclxuXHJcbiAgICBwcmUuc2V0QXR0cmlidXRlKCd3aWR0aCcsICBtYXBfd2R0aC50b1N0cmluZygpKTtcclxuICAgIHByZS5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIG1hcF9oZ2h0LnRvU3RyaW5nKCkpO1xyXG4gICAgcHJlLnN0eWxlLnNldFByb3BlcnR5KCdmb250LXNpemUnLCAgYCR7Zm9udF9zaXplfXB4YCk7XHJcbiAgICBwcmUuc3R5bGUuc2V0UHJvcGVydHkoJ2xpbmUtaGVpZ2h0JyxgJHtsaW5lX2hnaHR9cHhgKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY2FsY192aWV3X3RvcCgpOiB2b2lkIHtcclxuXHJcbiAgICB2aWV3X3dkdGggID0gZGl2LmNsaWVudFdpZHRoO1xyXG4gICAgdmlld19oZ2h0ICA9IGRpdi5jbGllbnRIZWlnaHQ7XHJcblxyXG4gICAgY29uc3QgcGQgPSBnX3RlYW0uZ2V0X3BkKCk7XHJcblxyXG4gICAgbGV0IHRvcF94ID0gIHZpZXdfd2R0aCAvIDIgLSAocGQueCArIDEpICogZm9udF9zaXplO1xyXG4vLyAgICBpZiAodG9wX3ggPCAtdmlld193ZHRoIC8gMikgdG9wX3ggPSAtdmlld193ZHRoIC8gMjtcclxuLy8gICAgaWYgKHRvcF94ID4gbWFwX3dkdGggLSB2aWV3X3dkdGgpIHRvcF94ID0gbWFwX3dkdGggLSB2aWV3X3dkdGg7XHJcblxyXG4gICAgbGV0IHRvcF95ID0gIHZpZXdfaGdodCAvIDIgLSAocGQueSArIDEpICogbGluZV9oZ2h0O1xyXG4vLyAgICBpZiAodG9wX3kgPCAtdmlld19oZ2h0IC8gMikgdG9wX3kgPSAtdmlld19oZ2h0IC8gMjsgLy8g44OQ44Kw5a++562W44Gu6YGp5b2T5L+u5q2jXHJcbi8vICAgIGlmICh0b3BfeSA+IG1hcF9oZ2h0IC0gdmlld19oZ2h0KSB0b3BfeSA9IG1hcF9oZ2h0IC0gdmlld19oZ2h0O1xyXG5cclxuICAgIHByZS5zdHlsZS5zZXRQcm9wZXJ0eSgnbGVmdCcsICAgICAgYCR7dG9wX3h9cHhgKTtcclxuICAgIHByZS5zdHlsZS5zZXRQcm9wZXJ0eSgndG9wJywgICAgICAgYCR7dG9wX3l9cHhgKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGRpc3BsYXlfbWF6ZUNoKCk6IHZvaWQgeyBcclxuICAgIGlmIChwcmUgIT09IG51bGwpIHtwcmUuaW5uZXJUZXh0ID0gdG9fc3RyaW5nKCk7Y2FsY192aWV3X3RvcCgpfVxyXG4gICAgZWxzZSBnX21lcy53YXJuaW5nX21lc3NhZ2UoJ0NhbiBub3QgZm91bmQgcHJlI01hemVfdmlld0NoX3ByZSEhJyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRvX3N0cmluZygpOiBzdHJpbmcge1xyXG4gICAgY29uc3Qgc2l6ZV94ID0gZ19tYXplLmdldF94X21heCgpO1xyXG4gICAgY29uc3Qgc2l6ZV95ID0gZ19tYXplLmdldF95X21heCgpO1xyXG4gICAgY29uc3QgZmxvb3IgID0gZ190ZWFtLmdldF9wZCgpLnpcclxuXHJcbiAgICBsZXQgcmV0X3N0ciA9ICcnO1xyXG4gICAgZm9yIChsZXQgeSA9IDA7IHkgPCBzaXplX3k7IHkrKykge1xyXG4gICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgc2l6ZV94OyB4KyspIHtcclxuICAgICAgICAgICAgaWYgKCFnX2RlYnVnLmlzT04oKSAmJiBnX21hemUuaXNfbWFza2VkX3h5eih4LCB5LCBmbG9vcikpIHtcclxuICAgICAgICAgICAgICAgIHJldF9zdHIgKz0gJ+KXhic7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBvYmogPSBnX21hemUuZ2V0X29ial94eXooeCwgeSwgZmxvb3IpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG9iaiA9PT0gbnVsbCB8fCBvYmoudmlldygpID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXRfc3RyICs9IGdfbWF6ZS5nZXRfY2VsbF94eXooeCwgeSwgZmxvb3IpPy50b19sZXR0ZXIoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb2JqX2MgPSBvYmoudmlldygpPy5sZXR0ZXIoKSA/PyAn6KyOJztcclxuICAgICAgICAgICAgICAgICAgICByZXRfc3RyICs9IG9ial9jO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldF9zdHIgKz0gXCJcXG5cIjtcclxuICAgIH1cclxuICAgIHJldHVybiByZXRfc3RyO1xyXG59XHJcblxyXG4iLCJpbXBvcnQgeyBDX1VybE9wdCB9ICAgICAgICAgICAgICAgICAgIGZyb20gXCIuLi9kX3V0bC9DX1VybE9wdFwiO1xyXG5pbXBvcnQgeyBVRF9zYXZlLCB0bXBfc2F2ZSB9ICAgICAgICAgIGZyb20gXCIuLi9kX2Ntbi9GX2xvYWRfYW5kX3NhdmVcIjtcclxuaW1wb3J0IHsgUE9TVF9hbmRfbW92ZV9wYWdlIH0gICAgICAgICBmcm9tIFwiLi4vZF9jbW4vRl9QT1NUXCI7XHJcbmltcG9ydCB7IGdfc3RhcnRfZW52LCBnX3VybCwgZ191cmxfbWFpX2d1bGQgfSBmcm9tIFwiLi4vZF9jbW4vZ2xvYmFsXCI7XHJcblxyXG5pbXBvcnQgeyBzZXRfZ19zYXZlIH0gZnJvbSBcIi4vRl9zZXRfc2F2ZV9tb2RlXCI7XHJcbmltcG9ydCB7IGFjdF9tb3ZlX21vZGUsIGRvX21vdmVfYm90dG9tX2hhbGYgfSBmcm9tIFwiLi9GX3NldF9tb3ZlX21vZGVcIjtcclxuaW1wb3J0IHsgXHJcbiAgICBnX212bSwgXHJcbiAgICBnX21hemUsIFxyXG4gICAgZ190ZWFtLFxyXG4gICAgZ19jdGxzLFxyXG4gICAgZ192c3csXHJcbiAgICBnX2RzLCBcclxufSAgIGZyb20gXCIuL2dsb2JhbF9mb3JfbWF6ZVwiO1xyXG5cclxuXHJcbnZhciBjYW5VcDogYm9vbGVhbiAgPSAgZmFsc2U7XHJcbnZhciBjYW5EbjogYm9vbGVhbiAgPSAgZmFsc2U7XHJcblxyXG52YXIgaXNVcDogIGJvb2xlYW4gID0gIGZhbHNlO1xyXG5cclxuY29uc3QgY3Rsc191cGRuX3VwID0ge1xyXG4gICAgbmFtZTogJ3VwZG5fdXAnLCBcclxuLy8gICAgZG9fVTogIGRvX3VwLFxyXG4gICAgaXNPSzogIGRvX3VwLFxyXG4gICAgaXNORzogIGRvX2NhbmNlbCxcclxufVxyXG5jb25zdCBjdGxzX3VwZG5fZG4gPSB7XHJcbiAgICBuYW1lOiAndXBkbl9kbicsIFxyXG4vLyAgICBkb19EOiAgZG9fZG93bixcclxuICAgIGlzT0s6ICBkb19kb3duLFxyXG4gICAgaXNORzogIGRvX2NhbmNlbCxcclxufVxyXG5jb25zdCBjdGxzX3VwZG5fdWRfaHB1cCA9IHtcclxuICAgIG5hbWU6ICd1cGRuX3VkX2hwdXAnLCBcclxuLy8gICAgZG9fVTogIGhvcGVfVXAsXHJcbi8vICAgIGlzT0s6ICBkb19VRCxcclxuICAgIGRvX1U6ICBkb191cCxcclxuICAgIGRvX0Q6ICBkb19kb3duLFxyXG4gICAgaXNORzogIGRvX2NhbmNlbCxcclxufVxyXG5jb25zdCBjdGxzX3VwZG5fdWRfaHBkbiA9IHtcclxuICAgIG5hbWU6ICd1cGRuX3VkX2hwZG4nLCBcclxuLy8gICAgZG9fRDogIGhvcGVfRG93bixcclxuLy8gICAgaXNPSzogIGRvX1VELFxyXG4gICAgZG9fVTogIGRvX3VwLFxyXG4gICAgZG9fRDogIGRvX2Rvd24sXHJcbiAgICBpc05HOiAgZG9fY2FuY2VsLFxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaW5pdF9VRF9tb2RlKCk6IHZvaWQge1xyXG4gICAgZ19jdGxzLnNldChjdGxzX3VwZG5fdXApO1xyXG4gICAgZ19jdGxzLnNldChjdGxzX3VwZG5fZG4pO1xyXG4gICAgZ19jdGxzLnNldChjdGxzX3VwZG5fdWRfaHB1cCk7XHJcbiAgICBnX2N0bHMuc2V0KGN0bHNfdXBkbl91ZF9ocGRuKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFjdF9VcF9tb2RlKCk6IHZvaWQge1xyXG4gICAgaWYgKGdfdGVhbS53YWxrKCkuZ2V0X3ooKSA+IDApIHtcclxuICAgICAgICBnX212bS5ub3RpY2VfbWVzc2FnZSgn5LiK44KK44OG44Os44Od44O844K/44O844GM5pyJ44KK44G+44GZ44CC55m744KK44G+44GZ44GL77yf55m744KLIOKHkiDjgIcg55m744KJ44Gq44GEIOKHkiDinJYnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZ19tdm0ubm90aWNlX21lc3NhZ2UoJ+ihl+OBq+aIu+OCiuOBvuOBmeOBi++8n+aIu+OCiyDih5Ig44CHIOaIu+OCieOBquOBhCDih5Ig4pyWJyk7XHJcbiAgICB9XHJcblxyXG4gICAgY2FuVXAgPSB0cnVlO1xyXG4gICAgY2FuRG4gPSBmYWxzZTtcclxuICAgIGdfY3Rscy5hY3QoY3Rsc191cGRuX3VwKTtcclxuICAgIGdfdnN3LnZpZXcoZ192c3cuTW92ZSgpKTtcclxuICAgIHNldENhbnZhczNEQ2xpY2soKVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYWN0X0RuX21vZGUoKTogdm9pZCB7XHJcbiAgICBnX212bS5ub3RpY2VfbWVzc2FnZSgn5LiL44KK44OG44Os44Od44O844K/44O844GM5pyJ44KK44G+44GZ44CC6ZmN44KK44G+44GZ44GL77yf6ZmN44KK44KLIOKHkiDjgIcg6ZmN44KK44Gq44GEIOKHkiDinJYnKTtcclxuXHJcbiAgICBjYW5VcCA9IGZhbHNlO1xyXG4gICAgY2FuRG4gPSB0cnVlO1xyXG4gICAgZ19jdGxzLmFjdChjdGxzX3VwZG5fZG4pO1xyXG4gICAgZ192c3cudmlldyhnX3Zzdy5Nb3ZlKCkpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYWN0X1VEX21vZGUoKTogdm9pZCB7XHJcbiAgICBnX212bS5ub3RpY2VfbWVzc2FnZSgn5LiK5LiL44OG44Os44Od44O844K/44O844GM5pyJ44KK44G+44GZ44CC55m744KK44G+44GZ44GL77yf55m744KL4oeSIOOAhyDpmY3jgorjgosg4oeSICjihpPjgq3jg7wpIOenu+WLleOBl+OBquOBhCDih5Ig4pyWJyk7XHJcblxyXG4gICAgY2FuVXAgPSB0cnVlO1xyXG4gICAgY2FuRG4gPSB0cnVlO1xyXG4gICAgaWYgKCFpc1VwKSAgZ19jdGxzLmFjdChjdGxzX3VwZG5fdWRfaHB1cCk7XHJcbiAgICBlbHNlICAgICAgICBnX2N0bHMuYWN0KGN0bHNfdXBkbl91ZF9ocGRuKTtcclxuICAgIGdfdnN3LnZpZXcoZ192c3cuTW92ZSgpKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZG9fY2FuY2VsKCk6IHZvaWQge1xyXG4gICAgZ19tdm0uY2xlYXJfbWVzc2FnZSgpO1xyXG4gICAgYWN0X21vdmVfbW9kZSgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkb191cCgpOiB2b2lkIHtcclxuICAgIGNvbnN0IHJzbHQgPSBnX3RlYW0ud2FsaygpLmhvcGVfcF91cCgpO1xyXG5cclxuICAgIC8v44CA5LiK44KK6ZqO5q6144GM5Zyw5LiL5LiA6ZqO44Gu5aC05ZCI44Gv44K744O844OW44GX44Gm44GL44KJ6KGXKOWGkumZuuiAheOCruODq+ODiSnjgbjnp7vli5XjgZnjgotcclxuICAgIGlmIChyc2x0Lmhhc19ob3BlICYmIHJzbHQuc3Viai56IDwgMCkge1xyXG4gICAgICAgIGRvX1VEX3NhdmUoKS50aGVuKGFzeW5jICgpPT57XHJcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCB0bXBfc2F2ZSgpO1xyXG4gICAgICAgIH0pLnRoZW4oKCk9PntcclxuICAgICAgICAgICAgY29uc3Qgb3B0ID0gbmV3IENfVXJsT3B0KCk7XHJcbiAgICAgICAgICAgIG9wdC5zZXQoJ21vZGUnLCAnbG9hZCcpO1xyXG4gICAgICAgICAgICBvcHQuc2V0KCdwaWQnLCAgIGdfc3RhcnRfZW52LnBpZCk7XHJcbiAgICAgICAgICAgIG9wdC5zZXQoJ29wdCcsICAgMTAwKTtcclxuICAgICAgICAgICAgUE9TVF9hbmRfbW92ZV9wYWdlKGdfdXJsW2dfdXJsX21haV9ndWxkXSwgb3B0KTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvLyDkuIrjgorpmo7mrrXjgYzlnLDkuIvkuozpmo7ku6XkuIvjga7loLTlkIjjga/jgrvjg7zjg5bjgZfjgabjgYvjgonkuIrjga7pmo7jgavnp7vli5XjgZnjgotcclxuICAgIGlmICghcnNsdC5oYXNfaG9wZSB8fCAhZ19tYXplLndpdGhpbihyc2x0LnN1YmopKSB7XHJcbiAgICAgICAgcnNsdC5kb05HKCk7XHJcbiAgICAgICAgZ19tdm0uY2xlYXJfbWVzc2FnZSgpO1xyXG4gICAgICAgIGFjdF9tb3ZlX21vZGUoKTtcclxuICAgICAgICBkb19tb3ZlX2JvdHRvbV9oYWxmKCdibGlua19vZmYnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZG9fVURfc2F2ZSgpLnRoZW4oKCk9PntcclxuICAgICAgICAgICAgcnNsdC5kb09LKCk7XHJcbiAgICAgICAgICAgIGdfbXZtLmNsZWFyX21lc3NhZ2UoKTtcclxuICAgICAgICAgICAgYWN0X21vdmVfbW9kZSgpO1xyXG4gICAgICAgICAgICBkb19tb3ZlX2JvdHRvbV9oYWxmKCdibGlua19vZmYnKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZG9fZG93bigpOiB2b2lkIHtcclxuICAgIGNvbnN0IHJzbHQgPSBnX3RlYW0ud2FsaygpLmhvcGVfcF9kb3duKCk7XHJcbiAgICBpZiAoIXJzbHQuaGFzX2hvcGUgfHwgIWdfbWF6ZS53aXRoaW4ocnNsdC5zdWJqKSkge1xyXG4gICAgICAgIHJzbHQuZG9ORygpO1xyXG4gICAgICAgIGdfbXZtLmNsZWFyX21lc3NhZ2UoKTtcclxuICAgICAgICBhY3RfbW92ZV9tb2RlKCk7XHJcbiAgICAgICAgZG9fbW92ZV9ib3R0b21faGFsZignYmxpbmtfb2ZmJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGRvX1VEX3NhdmUoKS50aGVuKCgpPT57XHJcbiAgICAgICAgICAgIHJzbHQuZG9PSygpO1xyXG4gICAgICAgICAgICBnX212bS5jbGVhcl9tZXNzYWdlKCk7XHJcbiAgICAgICAgICAgIGFjdF9tb3ZlX21vZGUoKTtcclxuICAgICAgICAgICAgZG9fbW92ZV9ib3R0b21faGFsZignYmxpbmtfb2ZmJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRvX1VEKCk6IHZvaWQge1xyXG4gICAgaWYgKCFjYW5VcCB8fCAhY2FuRG4pIHJldHVybjtcclxuICAgIFxyXG4gICAgaWYgKGlzVXApIGRvX3VwKCk7XHJcbiAgICBlbHNlICAgICAgZG9fZG93bigpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBob3BlX1VwKCk6IHZvaWQge1xyXG4gICAgaWYgKCFjYW5VcCB8fCAhY2FuRG4pIHJldHVybjtcclxuICAgIGlzVXAgPSB0cnVlO1xyXG4gICAgZ19jdGxzLmFjdChjdGxzX3VwZG5fdWRfaHBkbik7XHJcblxyXG4gICAgaWYgKGdfdGVhbS53YWxrKCkuZ2V0X3ooKSA+IDApIHtcclxuICAgICAgICBnX212bS5ub3RpY2VfbWVzc2FnZSgn55m744KK44G+44GZ44GL77yf55m744KL4oeSIOOAhyDpmY3jgorjgosg4oeSICjihpPjgq3jg7wpIOenu+WLleOBl+OBquOBhCDih5Ig4pyWJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGdfbXZtLm5vdGljZV9tZXNzYWdlKCfooZfjgavmiLvjgorjgb7jgZnjgYvvvJ/miLvjgovih5Ig44CHIOmZjeOCiuOCiyDih5IgKOKGk+OCreODvCkg56e75YuV44GX44Gq44GEIOKHkiDinJYnKTtcclxuICAgIH07XHJcbn1cclxuZnVuY3Rpb24gaG9wZV9Eb3duKCk6IHZvaWQge1xyXG4gICAgaWYgKCFjYW5VcCB8fCAhY2FuRG4pIHJldHVybjtcclxuICAgIGlzVXAgPSBmYWxzZTtcclxuICAgIGdfY3Rscy5hY3QoY3Rsc191cGRuX3VkX2hwdXApO1xyXG5cclxuICAgIGdfbXZtLm5vdGljZV9tZXNzYWdlKCfpmY3jgorjgb7jgZnjgYvvvJ/pmY3jgorjgovih5Ig44CHIOeZu+OCiyDih5IgKOKGkeOCreODvCkg56e75YuV44GX44Gq44GEIOKHkiDinJYnKTtcclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gZG9fVURfc2F2ZSgpOiBQcm9taXNlPGFueXx1bmRlZmluZWQ+IHtcclxuICAgIHNldF9nX3NhdmUoXHJcbiAgICAgICAgLyogc2F2ZV9pZDogKi8gICAtMSxcclxuICAgICAgICAvKiB1bmlxX25vOiAqLyAgIC0xLFxyXG4gICAgICAgIC8qIHRpdGxlOiAqLyAgICAgJ+iHquWLleS/neWtmOODh+ODvOOCvycsIFxyXG4gICAgICAgIC8qIGRldGFpbDogKi8gICAgJycsXHJcbiAgICAgICAgLyogcG9pbnQ6ICovICAgICBcclxuICAgICAgICAgICAgICAgICAgICBg44COJHtnX21hemUuZ2V0X25hbWUoKX3jgI8gYCBcclxuICAgICAgICAgICAgICAgICAgICArIGDlnLDkuIsgJHtnX3RlYW0ud2FsaygpLmdldF9wZCgpLnogKyAxfemajuWxpCBgIFxyXG4gICAgICAgICAgICAgICAgICAgICsgYChYOiAke2dfdGVhbS53YWxrKCkuZ2V0X3BkKCkueH0sIFk6ICR7Z190ZWFtLmdldF9wZCgpLnl9KWAsXHJcbiAgICAgICAgLyogYXV0b19tb2RlOiAqLyB0cnVlLFxyXG4gICAgKTtcclxuICAgIHJldHVybiBVRF9zYXZlKCk7XHJcbn1cclxuXHJcblxyXG5cclxuXHJcblxyXG5mdW5jdGlvbiBzZXRDYW52YXMzRENsaWNrKCk6IHZvaWQge1xyXG4gICAgaWYgKGdfZHM/LmNhbnZhcyA9PT0gbnVsbCkgICAgIHJldHVybjtcclxuICAgIGdfZHMuY2FudmFzLm9uY2xpY2sgPSBjYW52YXMzRGNsaWNrO1xyXG59XHJcbmZ1bmN0aW9uIGNsckNhbnZhczNEQ2xpY2soKTogdm9pZCB7XHJcbiAgICBpZiAoZ19kcz8uY2FudmFzID09PSBudWxsKSAgICAgcmV0dXJuO1xyXG4gICAgZ19kcy5jYW52YXMub25jbGljayA9ICgpPT57fTtcclxufVxyXG5cclxuZnVuY3Rpb24gY2FudmFzM0RjbGljayhldjogTW91c2VFdmVudCk6IHZvaWQge1xyXG4gICAgaWYgKGdfZHM/LmNhbnZhcyA9PT0gbnVsbCkgICAgIHJldHVybjtcclxuICAgIGlmIChldi50YXJnZXQgIT09IGdfZHMuY2FudmFzKSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgY3ZzID0gZ19kcy5jYW52YXM7XHJcbi8vZGVidWcgICAgYWxlcnQoYHg9JHsoZXYub2Zmc2V0WD8/LTEpfSwgeT0keyhldi5vZmZzZXRZPz8tMSl9YCk7XHJcblxyXG4gICAgY29uc3QgbGVmdF9wYW5lX3IgID0gY3ZzLmNsaWVudFdpZHRoICAqIDAuMzU7XHJcbiAgICBjb25zdCByZ2h0X3BhbmVfbCAgPSBjdnMuY2xpZW50V2lkdGggICogMC42NTtcclxuICAgIGNvbnN0IGJhY2tfcGFuZV91ICA9IGN2cy5jbGllbnRIZWlnaHQgKiAwLjUwO1xyXG5cclxuICAgIC8vIOOCreODo+ODs+ODkOOCueOBruW3puWBtFxyXG4gICAgaWYgKGV2Lm9mZnNldFggPCBsZWZ0X3BhbmVfcikgeyhkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbl9idG4nKSBhcyBIVE1MQnV0dG9uRWxlbWVudCk/LmNsaWNrKCk7IHJldHVybjt9XHJcbiAgICAvLyDjgq3jg6Pjg7Pjg5Djgrnjga7lj7PlgbRcclxuICAgIGlmIChldi5vZmZzZXRYID4gcmdodF9wYW5lX2wpIHsoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3lfYnRuJykgYXMgSFRNTEJ1dHRvbkVsZW1lbnQpPy5jbGljaygpOyByZXR1cm47fVxyXG4gICAgLy/jgq3jg6Pjg7Pjg5Djgrnjga7kuK3lpK7kuIoo5YmN6YCyKVxyXG4gICAgaWYgKGV2Lm9mZnNldFkgPCBiYWNrX3BhbmVfdSkgeyhkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndV9hcnInKSBhcyBIVE1MQnV0dG9uRWxlbWVudCk/LmNsaWNrKCk7IHJldHVybjt9XHJcbiAgICAvLyDjgq3jg6Pjg7Pjg5Djgrnjga7kuK3lpK7kuIso5b6M6YCAKVxyXG4gICAgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkX2FycicpIGFzIEhUTUxCdXR0b25FbGVtZW50KT8uY2xpY2soKTsgcmV0dXJuO1xyXG59XHJcblxyXG5cclxuXHJcbiIsImltcG9ydCB7IF9pc051bSB9ICAgICAgICAgIGZyb20gXCIuLi9kX3V0bC9GX01hdGhcIjtcclxuaW1wb3J0IHsgQ19DdGxDdXJzb3IgfSAgICAgZnJvbSBcIi4uL2RfY3RsL0NfQ3RsQ3Vyc29yXCI7XHJcbmltcG9ydCB7IGRvX21vdmVfYm90dG9tX2hhbGYsIGFjdF9tb3ZlX21vZGUgfSBmcm9tIFwiLi9GX3NldF9tb3ZlX21vZGVcIjtcclxuaW1wb3J0IHsgYWN0X2xvYWRfbW9kZSwgYWN0X3NhdmVfbW9kZSAgIH0gICAgIGZyb20gXCIuL0Zfc2V0X3NhdmVfbW9kZVwiO1xyXG5pbXBvcnQgeyBhY3RfbXZwdF9tb2RlfSAgICAgICAgICAgICAgICAgICAgICAgZnJvbSBcIi4vRl9zZXRfbXZwdF9tb2RlXCI7XHJcbmltcG9ydCB7IGdfY3RscywgZ19jdm0sIGdfdnN3IH0gICAgICAgICAgICAgICBmcm9tIFwiLi9nbG9iYWxfZm9yX21hemVcIjtcclxuXHJcbmxldCAgIGRvbV9tZW51X2xpc3Q6ICBIVE1MVUxpc3RFbGVtZW50O1xyXG5sZXQgICBtZW51X2xpc3RfY3JzcjogQ19DdGxDdXJzb3I7XHJcbmxldCAgIGlkeDogICBudW1iZXIgICA9ICAgMDtcclxuXHJcbmNvbnN0IGN0bHNfbWVudV9ub3IgPSB7XHJcbiAgICBuYW1lOiAnbWVudV9ub3InLCBcclxuICAgIGRvX1U6ICBkb19VLFxyXG4gICAgZG9fRDogIGRvX0QsXHJcbiAgICBpc09LOiAgaXNPSyxcclxuICAgIGlzTkc6ICBpc05HLFxyXG4gICAgaXNSVDogIGlzTkcsXHJcbiAgICBjcFJUOiAgaXNORyxcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGluaXRfbWVudV9tb2RlKCk6IHZvaWQge1xyXG4gICAgaW5pdF92aWV3KCk7XHJcbiAgICBpbml0X2N0bHMoKTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gYWN0X21lbnVfbW9kZSgpOiB2b2lkIHtcclxuICAgIGlkeCA9IDA7XHJcbiAgICBtZW51X2xpc3RfY3Jzci5zZXRfcG9zKGlkeCk7XHJcbiAgICBnX2N0bHMuYWN0KGN0bHNfbWVudV9ub3IpO1xyXG4gICAgZ192c3cudmlldyhnX3Zzdy5NZW51KCkpOyBcclxufVxyXG5cclxuZnVuY3Rpb24gaW5pdF92aWV3KCk6IGJvb2xlYW4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBtZW51X2xpc3QgICA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtZW51X2xpc3QnKSBhcyBIVE1MVUxpc3RFbGVtZW50O1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbWVudV9saXN0LmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBtZW51X2xpc3QuY2hpbGRyZW5baV0gYXMgSFRNTExJRWxlbWVudDtcclxuICAgICAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgX09LX21lbnVfRm5jLCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkb21fbWVudV9saXN0ICA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtZW51X2xpc3QnKSBhcyBIVE1MVUxpc3RFbGVtZW50O1xyXG4gICAgICAgIG1lbnVfbGlzdF9jcnNyID0gQ19DdGxDdXJzb3IuZ2V0T2JqKGRvbV9tZW51X2xpc3QpO1xyXG4gICAgfSBjYXRjaChlcnIpIHtcclxuICAgICAgICBhbGVydCgnRXJyb3I6ICcgKyBlcnIpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIHJldHVybiB0cnVlO1xyXG59XHJcbmZ1bmN0aW9uIF9PS19tZW51X0ZuYyh0aGlzOiBIVE1MTElFbGVtZW50LCBlOiBNb3VzZUV2ZW50KTogdm9pZCB7XHJcbiAgICBfX2lzT0sodGhpcy5pZCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluaXRfY3RscygpOiB2b2lkIHtcclxuICAgIGdfY3Rscy5zZXQoY3Rsc19tZW51X25vcik7XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBpc09LKCk6IHZvaWQge1xyXG4gICAgY29uc3QgbWVudV9saXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21lbnVfbGlzdCcpIGFzIEhUTUxVTGlzdEVsZW1lbnQ7XHJcbiAgICBpZiAobWVudV9saXN0ID09PSBudWxsKSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgY2hpbGRyZW4gPSBtZW51X2xpc3QuY2hpbGRyZW47XHJcbiAgICBpZiAoaWR4IDwgMCB8fCBpZHggPiBjaGlsZHJlbi5sZW5ndGggLSAxKSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgbGkgPSBjaGlsZHJlbi5pdGVtKGlkeCkgYXMgSFRNTExJRWxlbWVudDtcclxuICAgIF9faXNPSyhsaS5pZCk7XHJcbn1cclxuZnVuY3Rpb24gX19pc09LKGlkOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIHN3aXRjaCAoaWQpIHtcclxuICAgICAgICBjYXNlICdtZW51X2xvYWQnOiBkb19sb2FkKCk7cmV0dXJuO1xyXG4gICAgICAgIGNhc2UgJ21lbnVfc2F2ZSc6IGRvX3NhdmUoKTtyZXR1cm47XHJcbiAgICAgICAgY2FzZSAnbWVudV9tdnB0JzogZG9fbXZwdCgpO3JldHVybjtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gaXNORygpOiB2b2lkIHtcclxuICAgIGdfY3ZtLmNsZWFyX21lc3NhZ2UoKTtcclxuICAgIGFjdF9tb3ZlX21vZGUoKTtcclxuICAgIGRvX21vdmVfYm90dG9tX2hhbGYoJ2JsaW5rX29mZicpO1xyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gZG9fVSgpOiB2b2lkIHtcclxuICAgIGdfY3ZtLmNsZWFyX21lc3NhZ2UoKTtcclxuICAgIGlkeCA9IG1lbnVfbGlzdF9jcnNyLnBvc19VKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRvX0QoKTogdm9pZCB7XHJcbiAgICBnX2N2bS5jbGVhcl9tZXNzYWdlKCk7XHJcbiAgICBpZHggPSBtZW51X2xpc3RfY3Jzci5wb3NfRCgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkb19sb2FkKCk6IHZvaWQge1xyXG4gICAgYWN0X2xvYWRfbW9kZSgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkb19zYXZlKCk6IHZvaWQge1xyXG4gICAgYWN0X3NhdmVfbW9kZSgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkb19tdnB0KCk6IHZvaWQge1xyXG4gICAgYWN0X212cHRfbW9kZSgpO1xyXG59XHJcbiIsIlxyXG4gICAgLyoqKioqKioqKioqKiAqKioqKioqKioqKioqKioqKioqKioqKioqKiogKioqKioqKioqKioqKiovXHJcbiAgICAvKiAgSFRNTFByZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwcmUnKTsgICAgKi9cclxuICAgIC8qICBIVE1MRWxlbWVudD8uc2V0QXR0cmlidXRlKCdpZCcsICd1X2FycmF3Jyk7ICAgICAgICAqL1xyXG4gICAgLyogIEhUTUxFbGVtZW50Py5zdHlsZS5zZXRQcm9wZXJ0eSgnZGlzcGxheScsICdncmlkJyk7ICovXHJcbiAgICAvKiAgSFRNTEVsZW1lbnQ/LmFwcGVuZENoaWxkKEhUTUxFbGVtZW50KTsgICAgICAgICAgICAgKi9cclxuICAgIC8qKioqKioqKioqKiogKioqKioqKioqKioqKioqKioqKioqKioqKioqICoqKioqKioqKioqKioqL1xyXG5cclxuaW1wb3J0IHsgaW5pdF9tb3ZlX21vZGUgfSBmcm9tIFwiLi9GX3NldF9tb3ZlX21vZGVcIjtcclxuaW1wb3J0IHsgaW5pdF9tZW51X21vZGUgfSBmcm9tIFwiLi9GX3NldF9tZW51X21vZGVcIjtcclxuaW1wb3J0IHsgaW5pdF9tdnB0X21vZGUgfSBmcm9tIFwiLi9GX3NldF9tdnB0X21vZGVcIjtcclxuaW1wb3J0IHsgaW5pdF9TTF9tb2RlIH0gICBmcm9tIFwiLi9GX3NldF9zYXZlX21vZGVcIjtcclxuaW1wb3J0IHsgaW5pdF9VRF9tb2RlIH0gICBmcm9tIFwiLi9GX3NldF9VRF9tb2RlXCI7XHJcbmltcG9ydCB7IFRfQ3Rsc01vZGUgfSAgICAgICAgICBmcm9tIFwiLi9UX0N0bHNNb2RlXCI7XHJcbmltcG9ydCB7IGdfY3RscywgZ19jdGxzX21vZGUgfSBmcm9tIFwiLi9nbG9iYWxfZm9yX21hemVcIjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpbml0X2FsbF9tb2RlKCk6IHZvaWQge1xyXG4gICAgZ19jdGxzLmRlYWN0KCk7XHJcbiAgICBpbml0X21vdmVfbW9kZSgpO1xyXG4gICAgaW5pdF9tZW51X21vZGUoKTtcclxuICAgIGluaXRfbXZwdF9tb2RlKCk7XHJcbiAgICBpbml0X1NMX21vZGUoKTtcclxuICAgIGluaXRfVURfbW9kZSgpXHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGhpZGVfY29udHJvbGxlcygpOiB2b2lkIHtcclxuLy8gICAgZ19jdGxzX21vZGVbMF0gPSBUX0N0bHNNb2RlLk5vcDtcclxuICAgIGdfY3Rscy5kZWFjdCgpO1xyXG4gICAgY29uc3QgbW92ZV9jdGxfdmlldyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwYW5lX2N0bHNfYm9hZCcpIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgbW92ZV9jdGxfdmlldz8uc3R5bGUuc2V0UHJvcGVydHkoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG59XHJcbiIsImltcG9ydCB7IFRfTXpLaW5kIH0gICAgICAgICAgICAgICAgICAgZnJvbSBcIi4uL2RfbWRsL1RfTXpLaW5kXCI7XHJcbmltcG9ydCB7IElfSG9wZUFjdGlvbiB9ICAgICAgICAgICAgICAgZnJvbSBcIi4uL2RfbWRsL0lfQ29tbW9uXCI7XHJcbmltcG9ydCB7IENfUG9pbnQgfSAgICAgICAgICAgICAgICAgICAgZnJvbSBcIi4uL2RfbWRsL0NfUG9pbnRcIjtcclxuaW1wb3J0IHsgZ19kZWJ1ZyB9ICAgICAgICAgICAgICAgICAgICBmcm9tIFwiLi4vZF9jbW4vZ2xvYmFsXCI7XHJcbmltcG9ydCB7IGluc3RhbnRfbG9hZCwgaW5zdGFudF9zYXZlIH0gZnJvbSBcIi4uL2RfY21uL0ZfbG9hZF9hbmRfc2F2ZVwiO1xyXG5pbXBvcnQgeyBhY3RfbWVudV9tb2RlIH0gICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSBcIi4vRl9zZXRfbWVudV9tb2RlXCI7XHJcbmltcG9ydCB7IGFjdF9VcF9tb2RlLCBhY3RfRG5fbW9kZSwgYWN0X1VEX21vZGUgfSBmcm9tIFwiLi9GX3NldF9VRF9tb2RlXCI7XHJcbmltcG9ydCB7IGRlY29kZV9hbGwsIHNldF9nX3NhdmUgfSAgICAgICAgICAgICAgICBmcm9tIFwiLi9GX3NldF9zYXZlX21vZGVcIjtcclxuaW1wb3J0IHsgZGlzcGxheV9tYXplQ2h9ICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gXCIuL0ZfZGlzcGxheV9tYXplQ2hcIjsgXHJcbmltcG9ydCB7IGRpc3BsYXlfbWF6ZTNELCBcclxuICAgICAgICAgbWF6ZTNEX2JsaW5rX29uX2RpcmVjdGlvbiwgbWF6ZTNEX2JsaW5rX29mZl9kaXJlY3Rpb24gfSAgIGZyb20gXCIuL0ZfZGlzcGxheV9tYXplM0RcIjtcclxuaW1wb3J0IHsgXHJcbiAgICBnX212bSwgXHJcbiAgICBnX3ZzdywgXHJcbiAgICBnX21hemUsIFxyXG4gICAgZ190ZWFtLFxyXG4gICAgZG9fbG9hZF9ib3R0b21faGFsZixcclxuICAgIGdfY3RscyxcclxuICAgIGdfZHMsIFxyXG59IGZyb20gXCIuL2dsb2JhbF9mb3JfbWF6ZVwiO1xyXG5cclxuY29uc3QgY3Rsc19tb3ZlX25vciA9IHtcclxuICAgIG5hbWU6ICdtb3ZlX25vcicsIFxyXG4gICAgZG9fVTogIGdvX0YsXHJcbiAgICBkb19EOiAgZ29fQixcclxuICAgIGRvVUw6ICBnb19MLFxyXG4gICAgZG9VUjogIGdvX1IsXHJcbiAgICBkb19MOiAgdHJfTCxcclxuICAgIGRvX1I6ICB0cl9SLFxyXG4gICAgbWVudTogIG1lbnUsXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpbml0X21vdmVfbW9kZSgpOiB2b2lkIHtcclxuICAgIGdfY3Rscy5zZXQoY3Rsc19tb3ZlX25vcik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhY3RfbW92ZV9tb2RlKCk6IHZvaWQge1xyXG4gICAgZ19jdGxzLmFjdChjdGxzX21vdmVfbm9yKTtcclxuICAgIGdfdnN3LnZpZXcoZ192c3cuTW92ZSgpKTtcclxuICAgIHNldENhbnZhczNEQ2xpY2soKTtcclxufVxyXG5cclxuXHJcbiAgICAvKioqKioqKioqKioqICoqKioqKioqKioqKioqKioqKioqKioqKioqKiAqKioqKioqKioqKioqKi9cclxuICAgIC8qICBIVE1MUHJlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ByZScpOyAgICAqL1xyXG4gICAgLyogIEhUTUxFbGVtZW50Py5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3VfYXJyYXcnKTsgICAgICAgICovXHJcbiAgICAvKiAgSFRNTEVsZW1lbnQ/LnN0eWxlLnNldFByb3BlcnR5KCdkaXNwbGF5JywgJ2dyaWQnKTsgKi9cclxuICAgIC8qICBIVE1MRWxlbWVudD8uYXBwZW5kQ2hpbGQoSFRNTEVsZW1lbnQpOyAgICAgICAgICAgICAqL1xyXG4gICAgLyoqKioqKioqKioqKiAqKioqKioqKioqKioqKioqKioqKioqKioqKiogKioqKioqKioqKioqKiovXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZG9faW5zdGFudF9sb2FkKCk6IHZvaWQge1xyXG4gICAgaW5zdGFudF9sb2FkKCkudGhlbigoanNvbk9iajphbnkpPT57ICBcclxuICAgICAgICBkZWNvZGVfYWxsKGpzb25PYmo/LnNhdmUpO1xyXG4gICAgICAgIGRvX2xvYWRfYm90dG9tX2hhbGYoJ+ODreODvOODieOBl+OBvuOBl+OBnycpOyAgXHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGRvX2luc3RhbnRfc2F2ZSgpOiB2b2lkIHtcclxuICAgIHNldF9nX3NhdmUoXHJcbiAgICAgICAgLyogc2F2ZV9pZDogKi8gICAtMSxcclxuICAgICAgICAvKiB1bmlxX25vOiAqLyAgIC0xLFxyXG4gICAgICAgIC8qIHRpdGxlOiAqLyAgICAgJ+ewoeaYk+S/neWtmOODh+ODvOOCvycsIFxyXG4gICAgICAgIC8qIGRldGFpbDogKi8gICAgJycsIFxyXG4gICAgICAgICAgICAgICAgICAgIGDjgI4ke2dfbWF6ZS5nZXRfbmFtZSgpfeOAjyBgIFxyXG4gICAgICAgICAgICAgICAgICAgICsgYOWcsOS4iyAke2dfdGVhbS5nZXRfcGQoKS56ICsgMX3pmo7lsaQgYCBcclxuICAgICAgICAgICAgICAgICAgICArIGAoWDogJHtnX3RlYW0uZ2V0X3BkKCkueH0sIFk6ICR7Z190ZWFtLmdldF9wZCgpLnl9KWAsXHJcbiAgICAgICAgLyogYXV0b19tb2RlOiAqLyB0cnVlLFxyXG4gICAgKTtcclxuICAgIGluc3RhbnRfc2F2ZSgpO1xyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gY2xlYXJfbWFza19hcm91bmRfdGhlX3RlYW0oKTogdm9pZCB7XHJcbiAgICBnX21hemUuY2xlYXJfbWFza19hcm91bmRfdGhlX3RlYW0oZ190ZWFtKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY2hhbmdlX3VuZXhwX3RvX2Zsb29yKHA6IENfUG9pbnQpOiB2b2lkIHtcclxuICAgIGdfbWF6ZS5jaGFuZ2VfdW5leHBfdG9fZmxvb3IocCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdvX0YoKTogdm9pZCB7XHJcbiAgICBjb25zdCByc2x0ID0gZ190ZWFtLndhbGsoKS5ob3BlX3BfZndkKCk7XHJcbiAgICBtb3ZlX2NoZWNrKHJzbHQpO1xyXG4gICAgZG9fbW92ZV9ib3R0b21faGFsZignYmxpbmtfb24nKTtcclxufVxyXG5mdW5jdGlvbiBnb19CKCk6IHZvaWQge1xyXG4gICAgY29uc3QgcnNsdCA9IGdfdGVhbS53YWxrKCkuaG9wZV9wX2JhaygpO1xyXG4gICAgbW92ZV9jaGVjayhyc2x0KTtcclxuICAgIGRvX21vdmVfYm90dG9tX2hhbGYoJ2JsaW5rX29uJyk7XHJcbn1cclxuZnVuY3Rpb24gZ29fTCgpOiB2b2lkIHtcclxuICAgIGNvbnN0IHJzbHQgPSBnX3RlYW0ud2FsaygpLmhvcGVfcF9sZnQoKTtcclxuICAgIG1vdmVfY2hlY2socnNsdCk7XHJcbiAgICBkb19tb3ZlX2JvdHRvbV9oYWxmKCdibGlua19vbicpO1xyXG59XHJcbmZ1bmN0aW9uIGdvX1IoKTogdm9pZCB7XHJcbiAgICBjb25zdCByc2x0ID0gZ190ZWFtLndhbGsoKS5ob3BlX3Bfcmd0KCk7XHJcbiAgICBtb3ZlX2NoZWNrKHJzbHQpO1xyXG4gICAgZG9fbW92ZV9ib3R0b21faGFsZignYmxpbmtfb24nKTtcclxufVxyXG5mdW5jdGlvbiB0cl9SKCk6IHZvaWQge1xyXG4gICAgY29uc3QgcnNsdCA9IGdfdGVhbS53YWxrKCkuaG9wZV90dXJuX3IoKTtcclxuICAgIG1vdmVfY2hlY2socnNsdCk7XHJcbiAgICBkb19tb3ZlX2JvdHRvbV9oYWxmKCdibGlua19vZmYnKTtcclxufVxyXG5mdW5jdGlvbiB0cl9MKCk6IHZvaWQge1xyXG4gICAgY29uc3QgcnNsdCA9IGdfdGVhbS53YWxrKCkuaG9wZV90dXJuX2woKTtcclxuICAgIG1vdmVfY2hlY2socnNsdCk7XHJcbiAgICBkb19tb3ZlX2JvdHRvbV9oYWxmKCdibGlua19vZmYnKTtcclxufVxyXG5mdW5jdGlvbiBtb3ZlX2NoZWNrKHI6IElfSG9wZUFjdGlvbik6IHZvaWQge1xyXG4gICAgZ19tdm0uY2xlYXJfbWVzc2FnZSgpO1xyXG4gICAgLy8g5ZGo5Zuy44Gr44Kq44OW44K444Kn44GM5pyJ44KM44Gw44Kq44OW44K444Kn5o6l6L+R5Yem55CGXHJcbiAgICBhcm91bmRfb2JqKHIpO1xyXG5cclxuICAgIGlmICghci5oYXNfaG9wZSkgcmV0dXJuO1xyXG4gICAgaWYgKHIuaG9wZSA9PSAnVHVybicpIHtcclxuICAgICAgICByLmRvT0soKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAoci5ob3BlID09ICdNb3ZlJykge1xyXG4gICAgICAgIGNvbnN0IGNlbGwgPSBnX21hemUuZ2V0X2NlbGwoci5zdWJqKTtcclxuXHJcbiAgICAgICAgLy8g6YCy6KGM5pa55ZCR44GM5aOB562J44Gq44KJ56e75YuV5LiN5Y+vXHJcbiAgICAgICAgaWYgKCFjZWxsPy5nZXRPYmooKS5jYW5UaHJvdWdoKCkpIHtcclxuICAgICAgICAgICAgZG9udF9tb3ZlKHIpO3JldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3Qgb2JqID0gZ19tYXplLmdldF9vYmooci5zdWJqKTtcclxuICAgICAgICBpZiAob2JqICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGlmIChvYmouY2FuVGhyb3VnaCgpKSB7XHJcbiAgICAgICAgICAgICAgICAvLyDpgLLooYzmlrnlkJHjgavjgqrjg5bjgrjjgqfjgYzmnInjgorpgJrjgormipzjgZHlj6/og73jgarjgolcclxuICAgICAgICAgICAgICAgIC8vIOenu+WLleOBl+OBpuOCquODluOCuOOCp+WHpueQhlxyXG4gICAgICAgICAgICAgICAgci5kb09LKCk7XHJcbiAgICAgICAgICAgICAgICBhY3Rpb25fb2JqKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyDpgLLooYzmlrnlkJHjgavjgqrjg5bjgrjjgqfjgYzmnInjgorpgJrjgormipzjgZHkuI3og73jgarjgolcclxuICAgICAgICAgICAgICAgIC8vIOenu+WLleOBm+OBmuOBq+OCquODluOCuOOCp+aOpei/keWHpueQhijku6XpmY3jga7pmo7mrrXlh6bnkIbnrYnjga/jgrnjg6vjg7wpXHJcbiAgICAgICAgICAgICAgICBkb250X21vdmUocik7XHJcbiAgICAgICAgICAgICAgICBhcm91bmRfb2JqKHIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8g6YCy6KGM5pa55ZCR44Gr44Kq44OW44K444Kn44GM54Sh44GR44KM44Gw56e75YuVXHJcbiAgICAgICAgICAgIHIuZG9PSygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDnp7vli5XlhYjjgYzpmo7mrrXjgarjgonpmo7mrrXjga7lh6bnkIZcclxuICAgICAgICBjb25zdCBraW5kID0gY2VsbD8uZ2V0S2luZCgpO1xyXG4gICAgICAgIHN3aXRjaCAoa2luZCkge1xyXG4gICAgICAgICAgICBjYXNlIFRfTXpLaW5kLlN0clVwOlxyXG4gICAgICAgICAgICBjYXNlIFRfTXpLaW5kLlN0ckRuOlxyXG4gICAgICAgICAgICBjYXNlIFRfTXpLaW5kLlN0clVEOlxyXG4gICAgICAgICAgICAgICAgZG9fc3RhaXJzX21vdGlvbihraW5kKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG59IFxyXG5mdW5jdGlvbiBkb250X21vdmUocjogSV9Ib3BlQWN0aW9uKTogdm9pZCB7XHJcbiAgICBnX212bS5ub3JtYWxfbWVzc2FnZSgn6YCy44KB44Gq44GE77yB77yI56yR77yJJyk7XHJcbiAgICByLmRvTkcoKTtcclxuICAgIHJldHVybjtcclxufVxyXG4vLyDjgqrjg5bjgrjjgqfmjqXov5Hlh6bnkIZcclxuZnVuY3Rpb24gYXJvdW5kX29iaihyOiBJX0hvcGVBY3Rpb24pOiB2b2lkIHt9IFxyXG4vLyDjgqrjg5bjgrjjgqflh6bnkIZcclxuZnVuY3Rpb24gYWN0aW9uX29iaigpOiB2b2lkIHt9XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZG9fbW92ZV9ib3R0b21faGFsZihibGlua19tb2RlOiBzdHJpbmcpOiB2b2lkIHsgICAvL2FsZXJ0KCdGbG9vcj8gPSAnICsgZ190ZWFtLmdldF9wKCkueik7XHJcbiAgICBjaGFuZ2VfdW5leHBfdG9fZmxvb3IoZ190ZWFtLmdldF9wZCgpKTtcclxuICAgIGRpc3BsYXlfbWF6ZTNEKCk7XHJcbiAgICBkaXNwbGF5X21hemVfbmFtZSgpO1xyXG4gICAgaWYgKGJsaW5rX21vZGUgPT09ICdibGlua19vbicpIG1hemUzRF9ibGlua19vbl9kaXJlY3Rpb24oKTtcclxuICAgIGVsc2UgbWF6ZTNEX2JsaW5rX29mZl9kaXJlY3Rpb24oKTtcclxuICAgIGlmICghbWFza19jbGVhcmVkKCkpIHtcclxuICAgICAgICBjbGVhcl9tYXNrX2Fyb3VuZF90aGVfdGVhbSgpOyBcclxuICAgICAgICBpZiAobWFza19jbGVhcmVkKCkpIGFsZXJ0KCfjgZPjga7pmo7jgpLliLbopofjgZfjgb7jgZfjgZ/vvIHvvIEnKSAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbiAgICB9XHJcbiAgICBkaXNwbGF5X21hemVDaCgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBtYXNrX2NsZWFyZWQoKTogYm9vbGVhbiB7cmV0dXJuIGdfbWF6ZS5pc19jbGVhcmVkKGdfdGVhbS5nZXRfcGQoKSl9XHJcblxyXG5mdW5jdGlvbiBkaXNwbGF5X21hemVfbmFtZSgpOiB2b2lkIHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgcCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXplX3ZpZXczRF9tYXplX25hbWVfaW5mbycpIGFzIEhUTUxQYXJhZ3JhcGhFbGVtZW50O1xyXG4gICAgICAgIHAuaW5uZXJIVE1MID0gZ19tYXplLmdldF9uYW1lKCk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHt9O1xyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gc2V0Q2FudmFzM0RDbGljaygpOiB2b2lkIHtcclxuICAgIGlmIChnX2RzPy5jYW52YXMgPT09IG51bGwpICAgICByZXR1cm47XHJcbiAgICBnX2RzLmNhbnZhcy5vbmNsaWNrID0gY2FudmFzM0RjbGljaztcclxufVxyXG5mdW5jdGlvbiBjbHJDYW52YXMzRENsaWNrKCk6IHZvaWQge1xyXG4gICAgaWYgKGdfZHM/LmNhbnZhcyA9PT0gbnVsbCkgICAgIHJldHVybjtcclxuICAgIGdfZHMuY2FudmFzLm9uY2xpY2sgPSAoKT0+e307XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNhbnZhczNEY2xpY2soZXY6IE1vdXNlRXZlbnQpOiB2b2lkIHtcclxuICAgIGlmIChnX2RzPy5jYW52YXMgPT09IG51bGwpICAgICByZXR1cm47XHJcbiAgICBpZiAoZXYudGFyZ2V0ICE9PSBnX2RzLmNhbnZhcykgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IGN2cyA9IGdfZHMuY2FudmFzO1xyXG4vL2RlYnVnICAgIGFsZXJ0KGB4PSR7KGV2Lm9mZnNldFg/Py0xKX0sIHk9JHsoZXYub2Zmc2V0WT8/LTEpfWApO1xyXG5cclxuICAgIGNvbnN0IGxlZnRfcGFuZV9yICA9IGN2cy5jbGllbnRXaWR0aCAgKiAwLjI1O1xyXG4gICAgY29uc3QgcmdodF9wYW5lX2wgID0gY3ZzLmNsaWVudFdpZHRoICAqIDAuNzU7XHJcbiAgICBjb25zdCBiYWNrX3BhbmVfdSAgPSBjdnMuY2xpZW50SGVpZ2h0ICogMC44MDtcclxuXHJcbiAgICAvLyDjgq3jg6Pjg7Pjg5Djgrnjga7lt6blgbRcclxuICAgIGlmIChldi5vZmZzZXRYIDwgbGVmdF9wYW5lX3IpIHsoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xfYXJyJykgYXMgSFRNTEJ1dHRvbkVsZW1lbnQpPy5jbGljaygpOyByZXR1cm47fVxyXG4gICAgLy8g44Kt44Oj44Oz44OQ44K544Gu5Y+z5YG0XHJcbiAgICBpZiAoZXYub2Zmc2V0WCA+IHJnaHRfcGFuZV9sKSB7KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyX2FycicpIGFzIEhUTUxCdXR0b25FbGVtZW50KT8uY2xpY2soKTsgcmV0dXJuO31cclxuICAgIC8v44Kt44Oj44Oz44OQ44K544Gu5Lit5aSu5LiKKOWJjemAsilcclxuICAgIGlmIChldi5vZmZzZXRZIDwgYmFja19wYW5lX3UpIHsoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VfYXJyJykgYXMgSFRNTEJ1dHRvbkVsZW1lbnQpPy5jbGljaygpOyByZXR1cm47fVxyXG4gICAgLy8g44Kt44Oj44Oz44OQ44K544Gu5Lit5aSu5LiLKOW+jOmAgClcclxuICAgIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZF9hcnInKSBhcyBIVE1MQnV0dG9uRWxlbWVudCk/LmNsaWNrKCk7IHJldHVybjtcclxufVxyXG5cclxuXHJcblxyXG5mdW5jdGlvbiBkb19zdGFpcnNfbW90aW9uKGtpbmQ6IFRfTXpLaW5kKTogdm9pZCB7XHJcbiAgICBzd2l0Y2ggKGtpbmQpIHtcclxuICAgICAgICBjYXNlIFRfTXpLaW5kLlN0clVwOlxyXG4gICAgICAgICAgICBjbHJDYW52YXMzRENsaWNrKCk7XHJcbiAgICAgICAgICAgIGFjdF9VcF9tb2RlKCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgVF9NektpbmQuU3RyRG46XHJcbiAgICAgICAgICAgIGNsckNhbnZhczNEQ2xpY2soKTtcclxuICAgICAgICAgICAgYWN0X0RuX21vZGUoKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBUX016S2luZC5TdHJVRDpcclxuICAgICAgICAgICAgY2xyQ2FudmFzM0RDbGljaygpO1xyXG4gICAgICAgICAgICBhY3RfVURfbW9kZSgpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgIH1cclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIG1lbnUoKTogdm9pZCB7XHJcbiAgICBjbHJDYW52YXMzRENsaWNrKCk7XHJcbiAgICBnX212bS5jbGVhcl9tZXNzYWdlKCk7XHJcbiAgICBhY3RfbWVudV9tb2RlKCk7XHJcbn1cclxuIiwiaW1wb3J0IHsgYWN0X21lbnVfbW9kZSB9ICAgICAgIGZyb20gXCIuL0Zfc2V0X21lbnVfbW9kZVwiO1xyXG5pbXBvcnQgeyBnX2N0bHMsIGdfbWF6ZSwgZ19jdm0sIGdfdGVhbSwgZ192c3cgfSBmcm9tIFwiLi9nbG9iYWxfZm9yX21hemVcIjtcclxuXHJcbmltcG9ydCB7IENfVXJsT3B0IH0gICAgICAgICAgICBmcm9tIFwiLi4vZF91dGwvQ19VcmxPcHRcIjtcclxuaW1wb3J0IHsgdG1wX3NhdmUgfSAgICAgICAgICAgIGZyb20gXCIuLi9kX2Ntbi9GX2xvYWRfYW5kX3NhdmVcIjtcclxuaW1wb3J0IHsgUE9TVF9hbmRfbW92ZV9wYWdlIH0gIGZyb20gXCIuLi9kX2Ntbi9GX1BPU1RcIjtcclxuaW1wb3J0IHsgZ19teV91cmwsIGdfc2F2ZSwgZ19zdGFydF9lbnYsIGdfdXJsLCBnX3VybF9tYWlfZ3VsZCB9IGZyb20gXCIuLi9kX2Ntbi9nbG9iYWxcIjtcclxuXHJcbmxldCBtb2RlOiBzdHJpbmc7XHJcblxyXG5jb25zdCBjdGxzX212cHRfbm9yID0ge1xyXG4gICAgbmFtZTogJ212cHRfbm9yJywgXHJcbiAgICBpc09LOiAgaXNPSyxcclxuICAgIGlzTkc6ICBpc05HLFxyXG4gICAgY3BPSzogIGlzT0ssXHJcbiAgICBjcE5HOiAgaXNORyxcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGluaXRfbXZwdF9tb2RlKCk6IHZvaWQge1xyXG4gICAgZ19jdGxzLnNldChjdGxzX212cHRfbm9yKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFjdF9tdnB0X21vZGUoKTogdm9pZCB7XHJcbiAgICBtb2RlID0gJ2NoZWsnO1xyXG4gICAgZ19jdm0ubm90aWNlX21lc3NhZ2UoJ+acrOW9k+OBq+ihl+OBuOaIu+OCiuOBvuOBmeOBi++8n+OBk+OBruWgtOaJgOOBq+OBr+OCruODq+ODieOBi+OCieW+qeW4sOOBp+OBjeOBvuOBmScpO1xyXG4gICAgZ19jdGxzLmFjdChjdGxzX212cHRfbm9yKTtcclxuICAgIGdfdnN3LnZpZXcoZ192c3cuTXZQdCgpKTtcclxufVxyXG5cclxuZnVuY3Rpb24gaXNPSygpOiB2b2lkIHtcclxuICAgIHN3aXRjaChtb2RlKSB7XHJcbiAgICAgICAgY2FzZSAndmlldyc6XHJcbiAgICAgICAgICAgIGdfY3ZtLm5vdGljZV9tZXNzYWdlKCfmnKzlvZPjgavooZfjgbjmiLvjgorjgb7jgZnjgYvvvJ/jgZPjga7loLTmiYDjgavjga/jgq7jg6vjg4njgYvjgonlvqnluLDjgafjgY3jgb7jgZknKTtcclxuICAgICAgICAgICAgbW9kZSA9ICdjaGVrJztcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnY2hlayc6XHJcbiAgICAgICAgICAgIGdfY3ZtLm5vdGljZV9tZXNzYWdlKCfooZfjgbjmiLvjgorjgb7jgZfjgZ8nKTtcclxuICAgICAgICAgICAgbW9kZSA9ICd2aWV3JztcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IG12cHQgPSBnX3RlYW0uZ2V0X2xvYygpLmNsb25lKCk7XHJcbiAgICAgICAgICAgIG12cHQuc2V0X3VybChnX215X3VybCk7XHJcbiAgICAgICAgICAgIG12cHQuc2V0X3RpZChnX3RlYW0udWlkKCkpO1xyXG4gICAgICAgICAgICBtdnB0LnNldF91aWQoZ19tYXplLnVpZCgpKTtcclxuXHJcbiAgICAgICAgICAgIGdfc2F2ZS5hbGxfbXZwdFttdnB0LnVpZCgpXSAgID0gbXZwdDtcclxuICAgICAgICAgICAgZ19zYXZlLmFsbF9tYXplW2dfbWF6ZS51aWQoKV0gPSBnX21hemU7XHJcblxyXG4gICAgICAgICAgICB0bXBfc2F2ZSgpLnRoZW4oKCk9PntcclxuICAgICAgICAgICAgICAgIGNvbnN0IG9wdCA9IG5ldyBDX1VybE9wdCgpO1xyXG4gICAgICAgICAgICAgICAgb3B0LnNldCgnbW9kZScsICdsb2FkJyk7XHJcbiAgICAgICAgICAgICAgICBvcHQuc2V0KCdwaWQnLCAgIGdfc3RhcnRfZW52LnBpZCk7XHJcbiAgICAgICAgICAgICAgICBvcHQuc2V0KCdvcHQnLCAgIDEwMCk7XHJcbiAgICAgICAgICAgICAgICBQT1NUX2FuZF9tb3ZlX3BhZ2UoZ191cmxbZ191cmxfbWFpX2d1bGRdLCBvcHQpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgICBcclxufVxyXG5cclxuZnVuY3Rpb24gaXNORygpOiB2b2lkIHtcclxuICAgIHN3aXRjaChtb2RlKSB7XHJcbiAgICAgICAgY2FzZSAnY2hlayc6XHJcbiAgICAgICAgICAgIGdfY3ZtLmNsZWFyX21lc3NhZ2UoKTtcclxuICAgICAgICAgICAgYWN0X21lbnVfbW9kZSgpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBfcm91bmQgfSAgICAgICAgICAgICAgZnJvbSBcIi4uL2RfdXRsL0ZfTWF0aFwiO1xyXG5pbXBvcnQgeyBDX1VybE9wdCB9ICAgICAgICAgICAgZnJvbSBcIi4uL2RfdXRsL0NfVXJsT3B0XCI7XHJcbmltcG9ydCB7IFRfTGNrZCB9ICAgICAgICAgICAgICBmcm9tIFwiLi4vZF9tZGwvQ19Mb2NhdGlvblwiO1xyXG5pbXBvcnQgeyBDX1BvaW50RGlyIH0gICAgICAgICAgZnJvbSBcIi4uL2RfbWRsL0NfUG9pbnREaXJcIjtcclxuaW1wb3J0IHsgSV9NYXplT2JqICB9ICAgICAgICAgIGZyb20gXCIuLi9kX21kbC9DX01hemVPYmpcIjtcclxuaW1wb3J0IHsgQ19TYXZlRGF0YSB9ICAgICAgICAgIGZyb20gXCIuLi9kX21kbC9DX1NhdmVEYXRhXCI7XHJcbmltcG9ydCB7IENfQ3RsQ3Vyc29yIH0gICAgICAgICBmcm9tIFwiLi4vZF9jdGwvQ19DdGxDdXJzb3JcIjtcclxuaW1wb3J0IHsgUE9TVF9hbmRfbW92ZV9wYWdlIH0gIGZyb20gXCIuLi9kX2Ntbi9GX1BPU1RcIjtcclxuaW1wb3J0IHsgZ2VuZXJhbF9sb2FkLCBnZW5lcmFsX3NhdmUsIGdldF9zYXZlX2luZm8gfSAgICBmcm9tIFwiLi4vZF9jbW4vRl9sb2FkX2FuZF9zYXZlXCI7XHJcbmltcG9ydCB7IF9hbGVydCwgZ19tZXMsIGdfbXlfdXJsLCBnX3NhdmUsIGdfc3RhcnRfZW52IH0gZnJvbSBcIi4uL2RfY21uL2dsb2JhbFwiO1xyXG5pbXBvcnQgeyBhY3RfbWVudV9tb2RlIH0gICAgICAgZnJvbSBcIi4vRl9zZXRfbWVudV9tb2RlXCI7XHJcbmltcG9ydCB7IGFjdF9tb3ZlX21vZGUsIGRvX21vdmVfYm90dG9tX2hhbGYgfSBmcm9tIFwiLi9GX3NldF9tb3ZlX21vZGVcIjtcclxuaW1wb3J0IHsgXHJcbiAgICBnX2N0bHMsXHJcbiAgICBnX2N2bSwgXHJcbiAgICBnX212bSwgXHJcbiAgICBnX3ZzdywgXHJcbiAgICBnX21hemUsIFxyXG4gICAgZ190ZWFtLCBcclxuICAgIGdfaHJlcywgXHJcbn0gZnJvbSBcIi4vZ2xvYmFsX2Zvcl9tYXplXCI7XHJcbmltcG9ydCB7IFRfQ3RscyB9IGZyb20gXCIuL0NfRGVmYXVsdEN0bHNcIjtcclxuaW1wb3J0IHsgQ19TYXZlSW5mbyB9IGZyb20gXCIuLi9kX21kbC9DX1NhdmVJbmZvXCI7XHJcblxyXG5sZXQgICBmb3Jfc2F2ZTogYm9vbGVhbiAgPSBmYWxzZTtcclxuXHJcbmxldCAgIFVMX2lkeDogbnVtYmVyID0gICAwO1xyXG5sZXQgICBVTF9iYWs6IG51bWJlciA9IDk5OTtcclxuXHJcbmxldCAgIHNhdmVfVUxfbGlzdDogIEhUTUxVTGlzdEVsZW1lbnQ7XHJcbmxldCAgIFVMX2xpc3RfY3JzcjogIENfQ3RsQ3Vyc29yO1xyXG5sZXQgICBVTF9saXN0X2xlbmc6ICBudW1iZXI7XHJcblxyXG5sZXQgICBVTF90b19EYXRhOiAgICAgICB7W1VMX2lkeDogbnVtYmVyXTogLyogZGF0YV9pZHg6ICovIG51bWJlcn1cclxuXHJcbmxldCAgIGZvcm1faWQ6ICAgICAgICAgIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbmxldCAgIGZvcm1fdGltZTogICAgICAgIEhUTUxQYXJhZ3JhcGhFbGVtZW50O1xyXG5sZXQgICBmb3JtX2RldGFpbDogICAgICBIVE1MVGV4dEFyZWFFbGVtZW50O1xyXG5sZXQgICBmb3JtX3BvaW50OiAgICAgICBIVE1MUGFyYWdyYXBoRWxlbWVudDtcclxuXHJcbmxldCAgIGlzX2tha3VuaW4gPSBmYWxzZTtcclxuXHJcbmV4cG9ydCB0eXBlIFRfc2F2ZV9saXN0ID0ge1xyXG4gICAgc2F2ZV9pZDogICBudW1iZXIsXHJcbiAgICB1bmlxX25vOiAgIG51bWJlcixcclxuICAgIHRpdGxlOiAgICAgc3RyaW5nLFxyXG4gICAgZGV0YWlsOiAgICBzdHJpbmcsXHJcbiAgICBzY2VuZTogICAgIHN0cmluZyxcclxuICAgIHBvaW50OiAgICAgc3RyaW5nLFxyXG4gICAgc2F2ZV90aW1lOiBzdHJpbmcsXHJcbiAgICBhdXRvX21vZGU6IHN0cmluZyxcclxuICAgIF9faXNfbmV3OiAgYm9vbGVhbixcclxufVxyXG5cclxubGV0ICAgc2F2ZV9saXN0OiAgICAgICAge1t1bmlxX25vOiBudW1iZXJdOiBDX1NhdmVJbmZvfTtcclxuY29uc3Qgc2F2ZV9saXN0X21heCA9IDIwO1xyXG5cclxuY29uc3QgY3Rsc19sb2FkX3J0biA9IHtcclxuICAgIG5hbWU6ICdsb2FkX3J0bicsIFxyXG4gICAgaXNORzogIGdvX2JhY2tfbWVudV9tb2RlLFxyXG4gICAgaXNSVDogIGdvX2JhY2tfbWVudV9tb2RlLFxyXG4gICAgY3BSVDogIGdvX2JhY2tfbWVudV9tb2RlLFxyXG59XHJcbmNvbnN0IGN0bHNfbG9hZF9ub3IgPSB7XHJcbiAgICBuYW1lOiAnbG9hZF9ub3InLCBcclxuICAgIGRvX1U6ICBkb19VLFxyXG4gICAgZG9fRDogIGRvX0QsXHJcbiAgICBkb19MOiAgZG9fTCxcclxuICAgIGRvX1I6ICBkb19SLFxyXG4gICAgaXNPSzogIGNoZWNrX2xvYWQsXHJcbiAgICBjcE9LOiAgY2hlY2tfbG9hZCxcclxuICAgIGlzTkc6ICBnb19iYWNrX21lbnVfbW9kZSxcclxuICAgIGlzUlQ6ICBnb19iYWNrX21lbnVfbW9kZSxcclxuICAgIGNwUlQ6ICBnb19iYWNrX21lbnVfbW9kZSxcclxufVxyXG5jb25zdCBjdGxzX2xvYWRfY2hrID0ge1xyXG4gICAgbmFtZTogJ2xvYWRfY2hrJywgXHJcbiAgICBkb19VOiAgZG9fVSxcclxuICAgIGRvX0Q6ICBkb19ELFxyXG4gICAgZG9fTDogIGRvX0wsXHJcbiAgICBkb19SOiAgZG9fUixcclxuICAgIGlzT0s6ICBpc09LX2Zvcl9sb2FkLFxyXG4gICAgY3BPSzogIGlzT0tfZm9yX2xvYWQsXHJcbiAgICBpc05HOiAgaXNOR19mb3JfbG9hZCxcclxuICAgIGNwTkc6ICBpc05HX2Zvcl9sb2FkLFxyXG4gICAgaXNSVDogIGdvX2JhY2tfbWVudV9tb2RlLFxyXG4gICAgY3BSVDogIGdvX2JhY2tfbWVudV9tb2RlLFxyXG59XHJcbmNvbnN0IGN0bHNfc2F2ZV9ub3IgPSB7XHJcbiAgICBuYW1lOiAnc2F2ZV9ub3InLCBcclxuICAgIGRvX1U6ICBkb19VLFxyXG4gICAgZG9fRDogIGRvX0QsXHJcbiAgICBkb19MOiAgZG9fTCxcclxuICAgIGRvX1I6ICBkb19SLFxyXG4gICAgaXNPSzogIGNoZWNrX3NhdmUsXHJcbiAgICBjcE9LOiAgY2hlY2tfc2F2ZSxcclxuICAgIGlzTkc6ICBnb19iYWNrX21lbnVfbW9kZSxcclxuICAgIGlzUlQ6ICBnb19iYWNrX21lbnVfbW9kZSxcclxuICAgIGNwUlQ6ICBnb19iYWNrX21lbnVfbW9kZSxcclxufVxyXG5jb25zdCBjdGxzX3NhdmVfY2hrID0ge1xyXG4gICAgbmFtZTogJ3NhdmVfY2hrJywgXHJcbiAgICBkb19VOiAgZG9fVSxcclxuICAgIGRvX0Q6ICBkb19ELFxyXG4gICAgZG9fTDogIGRvX0wsXHJcbiAgICBkb19SOiAgZG9fUixcclxuICAgIGlzT0s6ICBpc09LX2Zvcl9zYXZlLFxyXG4gICAgY3BPSzogIGlzT0tfZm9yX3NhdmUsXHJcbiAgICBpc05HOiAgaXNOR19mb3Jfc2F2ZSxcclxuICAgIGNwTkc6ICBpc05HX2Zvcl9zYXZlLFxyXG4gICAgaXNSVDogIGdvX2JhY2tfbWVudV9tb2RlLFxyXG4gICAgY3BSVDogIGdvX2JhY2tfbWVudV9tb2RlLFxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaW5pdF9TTF9tb2RlKCk6IHZvaWQge1xyXG4gICAgaW5pdF92aWV3KCk7XHJcbiAgICBpbml0X2N0bHMoKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFjdF9sb2FkX21vZGUoKTogdm9pZCB7XHJcbiAgICBfX3NldF9kYXRhKGZhbHNlKS50aGVuKCgpPT57XHJcbiAgICAgICAgaWYgKCFleGlzdF9zYXZlX2xpc3QoKSkge1xyXG4gICAgICAgICAgICBoaWRlX2xvYWRfZmllbGRzKCk7XHJcbiAgICAgICAgICAgIGdfY3ZtLm5vdGljZV9tZXNzYWdlKCfjg63jg7zjg4njgafjgY3jgovjg4fjg7zjgr/jgYzmnInjgorjgb7jgZvjgpMnKTtcclxuICAgICAgICAgICAgZ19jdGxzLmFjdChjdGxzX2xvYWRfcnRuKTtcclxuICAgICAgICAgICAgZ192c3cudmlldyhnX3Zzdy5Nb3ZlKCkpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc2hvd19sb2FkX2ZpZWxkcygpO1xyXG4gICAgICAgICAgICBkaXNwbGF5X21lc3NhZ2UoKTtcclxuICAgICAgICAgICAgZ19jdGxzLmFjdChjdGxzX2xvYWRfbm9yKTtcclxuICAgICAgICAgICAgZ192c3cudmlldyhnX3Zzdy5MZFN2KCkpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBhY3Rfc2F2ZV9tb2RlKCk6IHZvaWQge1xyXG4gICBfX3NldF9kYXRhKHRydWUpLnRoZW4oKCk9PntcclxuICAgICAgICBkaXNwbGF5X21lc3NhZ2UoKTtcclxuICAgICAgICBnX2N0bHMuYWN0KGN0bHNfc2F2ZV9ub3IpO1xyXG4gICAgICAgIGdfdnN3LnZpZXcoZ192c3cuTGRTdigpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBfX3NldF9kYXRhKF9mb3Jfc2F2ZTogYm9vbGVhbik6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgZm9yX3NhdmUgPSBfZm9yX3NhdmU7IC8vIHRydWU6IEZvciBTYXZlLlxyXG5cclxuICAgIGdfY3ZtLmNsZWFyX21lc3NhZ2UoKTtcclxuICAgIGlzX2tha3VuaW4gPSBmYWxzZTtcclxuICAgIGF3YWl0IGRpc3BsYXlfc2F2ZV9saXN0KCk7IFxyXG59XHJcblxyXG5mdW5jdGlvbiBoaWRlX2xvYWRfZmllbGRzKCk6IHZvaWQge1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xkc3ZfZGF0YV9saXN0JykgID8uc3R5bGUuc2V0UHJvcGVydHkoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xkc3ZfZGF0YV9maWVsZHMnKT8uc3R5bGUuc2V0UHJvcGVydHkoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzaG93X2xvYWRfZmllbGRzKCk6IHZvaWQge1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xkc3ZfZGF0YV9saXN0JykgID8uc3R5bGUuc2V0UHJvcGVydHkoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsZHN2X2RhdGFfZmllbGRzJyk/LnN0eWxlLnNldFByb3BlcnR5KCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBpbml0X2RhdGEoKTogdm9pZCB7fVxyXG5mdW5jdGlvbiBpbml0X3ZpZXcoKTogdm9pZCB7fVxyXG5mdW5jdGlvbiBpbml0X2N0bHMoKTogdm9pZCB7XHJcbiAgICBpc19rYWt1bmluID0gZmFsc2U7XHJcbiAgICBVTF9iYWsgPSA5OTk7XHJcblxyXG4gICAgZ19jdGxzLnNldChjdGxzX2xvYWRfcnRuKTtcclxuICAgIGdfY3Rscy5zZXQoY3Rsc19sb2FkX25vcik7XHJcbiAgICBnX2N0bHMuc2V0KGN0bHNfbG9hZF9jaGspO1xyXG4gICAgZ19jdGxzLnNldChjdGxzX3NhdmVfbm9yKTtcclxuICAgIGdfY3Rscy5zZXQoY3Rsc19zYXZlX2Noayk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzT0tfZm9yX2xvYWQoKTogdm9pZCB7XHJcbiAgICBpZiAoc2F2ZV9VTF9saXN0ID09PSBudWxsKSByZXR1cm47XHJcbiAgICBpZiAoVUxfaWR4IDwgMCB8fCBVTF9pZHggPiBVTF9saXN0X2xlbmcgLSAxKSByZXR1cm47XHJcblxyXG4vLyAgICBpZiAoIWlzX2tha3VuaW4pIGNoZWNrX2xvYWQoKTsgZWxzZSBsb2FkKCk7XHJcbiAgICBsb2FkKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzT0tfZm9yX3NhdmUoKTogdm9pZCB7XHJcbiAgICBpZiAoc2F2ZV9VTF9saXN0ID09PSBudWxsKSByZXR1cm47XHJcbiAgICBpZiAoVUxfaWR4IDwgMCB8fCBVTF9pZHggPiBVTF9saXN0X2xlbmcgLSAxKSByZXR1cm47XHJcblxyXG4vLyAgICBpZiAoIWlzX2tha3VuaW4pIGNoZWNrX3NhdmUoKTsgZWxzZSBzYXZlKCk7XHJcbiAgICBzYXZlKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzTkdfZm9yX2xvYWQoKTogdm9pZCB7XHJcbiAgICBfaXNOR18oY3Rsc19sb2FkX25vcik7XHJcbn1cclxuZnVuY3Rpb24gaXNOR19mb3Jfc2F2ZSgpOiB2b2lkIHtcclxuICAgIF9pc05HXyhjdGxzX3NhdmVfbm9yKTtcclxufVxyXG5mdW5jdGlvbiBfaXNOR18oY3RsczogVF9DdGxzKTogdm9pZCB7XHJcbiAgICBpZiAoIWlzX2tha3VuaW4pIHtcclxuICAgICAgICBnX2N2bS5jbGVhcl9tZXNzYWdlKCk7XHJcbiAgICAgICAgZ29fYmFja19tZW51X21vZGUoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaXNfa2FrdW5pbiA9IGZhbHNlO1xyXG4gICAgICAgIGdfY3Rscy5hY3QoY3Rscyk7XHJcbiAgICAgICAgZGlzcGxheV9tZXNzYWdlKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdvX2JhY2tfbWVudV9tb2RlKCk6IHZvaWQge1xyXG4gICAgZ19jdm0uY2xlYXJfbWVzc2FnZSgpO1xyXG4gICAgYWN0X21lbnVfbW9kZSgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnb19iYWNrX21vdmVfbW9kZSgpOiB2b2lkIHtcclxuICAgIGFjdF9tb3ZlX21vZGUoKTtcclxuICAgIGRvX21vdmVfYm90dG9tX2hhbGYoJ2JsaW5rX29mZicpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkb19VKCk6IHZvaWQge1xyXG4gICAgZGlzcGxheV9tZXNzYWdlKCk7XHJcbiAgICBVTF9pZHggPSBVTF9saXN0X2Nyc3IucG9zX1UoKTtcclxuICAgIGZvcm1fc2V0KCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRvX0QoKTogdm9pZCB7IFxyXG4gICAgZGlzcGxheV9tZXNzYWdlKCk7XHJcbiAgICBVTF9pZHggPSBVTF9saXN0X2Nyc3IucG9zX0QoKTtcclxuICAgIGZvcm1fc2V0KCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRvX0woKTogdm9pZCB7XHJcbiAgICBkaXNwbGF5X21lc3NhZ2UoKTtcclxuICAgIFVMX2lkeCA9IFVMX2xpc3RfY3Jzci5wb3NfTCgpO1xyXG4gICAgZm9ybV9zZXQoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZG9fUigpOiB2b2lkIHtcclxuICAgIGRpc3BsYXlfbWVzc2FnZSgpO1xyXG4gICAgVUxfaWR4ID0gVUxfbGlzdF9jcnNyLnBvc19SKCk7XHJcbiAgICBmb3JtX3NldCgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBmb3JtX2NscigpOnZvaWQge1xyXG4gICAgaWYgKFVMX2lkeCA8IDAgfHwgVUxfaWR4ID4gVUxfbGlzdF9sZW5nIC0gMSkgcmV0dXJuO1xyXG5cclxuICAgIGZvcm1faWQgICAudmFsdWUgICAgICA9ICctMSc7XHJcbiAgICBmb3JtX3RpbWUgLmlubmVyVGV4dCAgPSAnJztcclxuICAgIGZvcm1fcG9pbnQuaW5uZXJUZXh0ICA9ICcnO1xyXG5cclxuICAgIGlmIChmb3JtX2RldGFpbC5oYXNBdHRyaWJ1dGUoJ3JlYWRvbmx5JykpIHtcclxuICAgICAgICBmb3JtX2RldGFpbC5yZW1vdmVBdHRyaWJ1dGUoJ3JlYWRvbmx5Jyk7XHJcbiAgICAgICAgZm9ybV9kZXRhaWwudmFsdWUgPSAnJztcclxuICAgICAgICBmb3JtX2RldGFpbC5zZXRBdHRyaWJ1dGUoJ3JlYWRvbmx5JywgJ3JlYWRvbmx5Jyk7XHJcbiAgICB9ZWxzZSB7XHJcbiAgICAgICAgZm9ybV9kZXRhaWwudmFsdWUgPSAnJztcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZm9ybV9zZXQoKTp2b2lkIHtcclxuICAgIGlmIChVTF9pZHggPCAwIHx8IFVMX2lkeCA+IFVMX2xpc3RfbGVuZyAtIDEpIHJldHVybjtcclxuXHJcbiAgICBmb3JtX2NscigpO1xyXG4gICAgY29uc3QgZGF0YV9pZHggPSBVTF90b19EYXRhW1VMX2lkeF07XHJcblxyXG4gICAgZm9ybV9pZCAgIC52YWx1ZSAgICAgID0gc2F2ZV9saXN0W2RhdGFfaWR4XS5zYXZlX2lkLnRvU3RyaW5nKCk7XHJcbiAgICBmb3JtX3RpbWUgLmlubmVyVGV4dCAgPSBzYXZlX2xpc3RbZGF0YV9pZHhdLnNhdmVfdGltZT8udG9JU09TdHJpbmcoKTtcclxuICAgIGZvcm1fcG9pbnQuaW5uZXJUZXh0ICA9IHNhdmVfbGlzdFtkYXRhX2lkeF0ucG9pbnQ7XHJcblxyXG4gICAgaWYgKGZvcm1fZGV0YWlsLmhhc0F0dHJpYnV0ZSgncmVhZG9ubHknKSkge1xyXG4gICAgICAgIGZvcm1fZGV0YWlsLnJlbW92ZUF0dHJpYnV0ZSgncmVhZG9ubHknKTtcclxuICAgICAgICBmb3JtX2RldGFpbC52YWx1ZSA9IHNhdmVfbGlzdFtkYXRhX2lkeF0uZGV0YWlsO1xyXG4gICAgICAgIGZvcm1fZGV0YWlsLnNldEF0dHJpYnV0ZSgncmVhZG9ubHknLCAncmVhZG9ubHknKTtcclxuICAgIH1lbHNlIHtcclxuICAgICAgICBmb3JtX2RldGFpbC52YWx1ZSA9IHNhdmVfbGlzdFtkYXRhX2lkeF0uZGV0YWlsO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZGlzcGxheV9zYXZlX2xpc3QoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICBjb25zdCBkYXRhX2xpc3QgICA9ICdsZHN2X2RhdGFfbGlzdCc7XHJcbiAgICBjb25zdCBkYXRhX2lkICAgICA9ICdsZHN2X2RhdGFfaWQnO1xyXG4gICAgY29uc3QgZGF0YV90aW1lICAgPSAnbGRzdl9kYXRhX3RpbWUnO1xyXG4gICAgY29uc3QgZGF0YV9kZXRhaWwgPSAnbGRzdl9kYXRhX2RldGFpbCc7XHJcbiAgICBjb25zdCBkYXRhX3BvaW50ICA9ICdsZHN2X2RhdGFfcG9pbnQnO1xyXG5cclxuICAgIGF3YWl0IGdldF9zYXZlX2luZm8oKT8udGhlbihqc29uT2JqID0+IHtcclxuICAgICAgICBpZiAoanNvbk9iaiA9PT0gbnVsbCB8fCBqc29uT2JqID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgZ19tZXMud2FybmluZ19tZXNzYWdlKCfjgrvjg7zjg5bmg4XloLHjga7lj5fkv6HjgavlpLHmlZfjgZfjgb7jgZfjgZ/jgILjgJDlj5fkv6Hjg4fjg7zjgr/nhKHjgZfjgJEnKTtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGpzb25PYmouZWNvZGUgIT09IDApIHtcclxuICAgICAgICAgICAgZ19tZXMud2FybmluZ19tZXNzYWdlKGDjgI4ke2pzb25PYmouZW1zZ33jgI8oJHtqc29uT2JqLmVjb2RlfSlgKTtcclxuICAgICAgICAgICAgZ19tZXMud2FybmluZ19tZXNzYWdlKCfjgrvjg7zjg5bmg4XloLHjga7lj5fkv6HjgavlpLHmlZfjgZfjgb7jgZfjgZ/jgIInKTtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgc2F2ZV9saXN0ID0ge307IFxyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgc2F2ZV9pbmZvIG9mIGpzb25PYmouc2F2ZV9pbmZvKSB7XHJcbiAgICAgICAgICAgICAgICBzYXZlX2xpc3Rbc2F2ZV9pbmZvLnVuaXFfbm9dID0gbmV3IENfU2F2ZUluZm8oc2F2ZV9pbmZvKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZm9yX3NhdmUpIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IHVuaXFfbm9fY250ID0gMDsgdW5pcV9ub19jbnQgPCBzYXZlX2xpc3RfbWF4OyB1bmlxX25vX2NudCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHVuaXFfbm9fY250IGluIHNhdmVfbGlzdCkgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgc2F2ZV9saXN0W3VuaXFfbm9fY250XSA9IG5ldyBDX1NhdmVJbmZvKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2F2ZV9pZDogICAgLTEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVuaXFfbm86ICAgICB1bmlxX25vX2NudCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICAgICAgYOaWsOimj+S/neWtmCMke3VuaXFfbm9fY250LnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgJzAnKX1gLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXRhaWw6ICAgICcnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb2ludDogICAgICcnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzYXZlX3RpbWU6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXV0b19tb2RlOiAnMCcsXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHNhdmVfVUxfbGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGRhdGFfbGlzdCkgYXMgSFRNTFVMaXN0RWxlbWVudDtcclxuICAgICAgICAgICAgaWYgKHNhdmVfVUxfbGlzdCA9PT0gbnVsbCkge2FsZXJ0KCdDYW4gbm90IGZpbmQgdGhlIERvbSBvZiBTYXZlIExpc3QhJyk7cmV0dXJuO31cclxuICAgICAgICBcclxuICAgICAgICAgICAgd2hpbGUgKHNhdmVfVUxfbGlzdC5maXJzdENoaWxkICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBzYXZlX1VMX2xpc3QucmVtb3ZlQ2hpbGQoc2F2ZV9VTF9saXN0LmZpcnN0Q2hpbGQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgVUxfbGlzdF9pZHggPSAwOyBVTF90b19EYXRhID0ge307XHJcbiAgICAgICAgICAgIGZvciAobGV0IGRhdGFfaWR4IGluIHNhdmVfbGlzdCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHNhdmVfbGlzdFtkYXRhX2lkeF0uYXV0b19tb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZvcl9zYXZlKSBjb250aW51ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChzYXZlX2xpc3RbZGF0YV9pZHhdLnVuaXFfbm8pIHsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTAwOiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNhdmVfbGlzdFtkYXRhX2lkeF0udGl0bGUgID0gJ+iHquWLleS/neWtmOWIhic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzYXZlX2xpc3RbZGF0YV9pZHhdLmRldGFpbCA9ICfkvZzmpa3nlKjjgavnsKHmmJPkv53lrZjjgZfjgZ/jg4fjg7zjgr/jgafjgZknO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDEwMTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNhdmVfbGlzdFtkYXRhX2lkeF0udGl0bGUgID0gJ+ewoeaYk+S/neWtmOWIhic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzYXZlX2xpc3RbZGF0YV9pZHhdLmRldGFpbCA9ICfjg4fjg5Djg4PjgrDjg6Ljg7zjg4njgafnsKHmmJPkv53lrZjjgZfjgZ/jg4fjg7zjgr/jgafjgZknO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTAyOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2F2ZV9saXN0W2RhdGFfaWR4XS50aXRsZSAgPSAn6ZqO5q6155u05YmN5YiGJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNhdmVfbGlzdFtkYXRhX2lkeF0uZGV0YWlsID0gJ+S4gOeVquacgOi/keOBruODleODreOCouenu+WLleebtOWJjeOBq+iHquWLleS/neWtmOOBl+OBn+ODh+ODvOOCv+OBp+OBmSc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxMDM6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzYXZlX2xpc3RbZGF0YV9pZHhdLnRpdGxlICA9ICfvvbLvvo3vvp7vvp3vvoTnm7TliY3liIYnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2F2ZV9saXN0W2RhdGFfaWR4XS5kZXRhaWwgPSAn44Kk44OZ44Oz44OIKOWkseaVlynnm7TliY3jgavnsKHmmJPkv53lrZjjgZfjgZ/jg4fjg7zjgr/jgafjgZknO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKSBhcyBIVE1MTElFbGVtZW50O1xyXG4gICAgICAgICAgICAgICAgbGkuaW5uZXJIVE1MID0gYOOAjiR7c2F2ZV9saXN0W2RhdGFfaWR4XS50aXRsZX3jgI9gO1xyXG5cclxuICAgICAgICAgICAgICAgIGxpLmlkID0gVUxfbGlzdF9pZHgudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgIGxpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmb3Jfc2F2ZT9fT0tfc2F2ZV9GbmM6X09LX2xvYWRfRm5jLCBmYWxzZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgc2F2ZV9VTF9saXN0LmFwcGVuZENoaWxkKGxpKTtcclxuICAgICAgICAgICAgICAgIFVMX3RvX0RhdGFbVUxfbGlzdF9pZHgrK10gPSBOdW1iZXIoZGF0YV9pZHgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFVMX2xpc3RfY3JzciA9IENfQ3RsQ3Vyc29yLmdldE9iaihzYXZlX1VMX2xpc3QpO1xyXG4gICAgICAgICAgICBVTF9saXN0X2xlbmcgPSBzYXZlX1VMX2xpc3QuY2hpbGRyZW4ubGVuZ3RoO1xyXG4gICAgXHJcbiAgICAgICAgICAgIGZvcm1faWQgICAgID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZGF0YV9pZCkgICAgIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICAgICAgICAgIGZvcm1fdGltZSAgID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZGF0YV90aW1lKSAgIGFzIEhUTUxQYXJhZ3JhcGhFbGVtZW50O1xyXG4gICAgICAgICAgICBmb3JtX2RldGFpbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGRhdGFfZGV0YWlsKSBhcyBIVE1MVGV4dEFyZWFFbGVtZW50O1xyXG4gICAgICAgICAgICBmb3JtX3BvaW50ICA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGRhdGFfcG9pbnQpICBhcyBIVE1MUGFyYWdyYXBoRWxlbWVudDsgXHJcblxyXG4gICAgICAgICAgICBpZiAoIWV4aXN0X3NhdmVfbGlzdCgpKSByZXR1cm47XHJcbiAgICAgICAgICAgIFVMX2lkeCA9IDA7ICBVTF9saXN0X2Nyc3Iuc2V0X3BvcyhVTF9pZHgpOyBcclxuICAgICAgICAgICAgZm9ybV9zZXQoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICBnX21lcy53YXJuaW5nX21lc3NhZ2UoZXJyIGFzIHVua25vd24gYXMgc3RyaW5nKTtcclxuICAgICAgICAgICAgZ19tZXMud2FybmluZ19tZXNzYWdlKCfjgrvjg7zjg5bmg4XloLHjga7lj5fkv6HjgavlpLHmlZfjgZfjgb7jgZfjgZ/jgILjgJDjg4fjg7zjgr/kuI3kuIDoh7TjgJEnKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcbmZ1bmN0aW9uIF9PS19sb2FkX0ZuYyh0aGlzOiBIVE1MTElFbGVtZW50LCBlOiBNb3VzZUV2ZW50KTogdm9pZCB7XHJcbiAgICBVTF9pZHggPSBOdW1iZXIodGhpcy5pZCk7XHJcbiAgICBcclxuICAgIGlmIChVTF9pZHggIT09IFVMX2Jhaykge1xyXG4gICAgICAgIFVMX2JhayA9ICAgVUxfaWR4O1xyXG4gICAgICAgIGlzX2tha3VuaW4gPSBmYWxzZTtcclxuICAgIH1cclxuICAgIGlmIChpc19rYWt1bmluKSBpc09LX2Zvcl9sb2FkKCk7IGVsc2UgY2hlY2tfbG9hZCgpO1xyXG4gICAgVUxfbGlzdF9jcnNyLnNldF9wb3MoVUxfaWR4KTsgZm9ybV9zZXQoKTtcclxufVxyXG5mdW5jdGlvbiBfT0tfc2F2ZV9GbmModGhpczogSFRNTExJRWxlbWVudCwgZTogTW91c2VFdmVudCk6IHZvaWQge1xyXG4gICAgVUxfaWR4ID0gTnVtYmVyKHRoaXMuaWQpO1xyXG4gICAgXHJcbiAgICBpZiAoVUxfaWR4ICE9PSBVTF9iYWspIHtcclxuICAgICAgICBVTF9iYWsgPSAgIFVMX2lkeDtcclxuICAgICAgICBpc19rYWt1bmluID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBpZiAoaXNfa2FrdW5pbikgaXNPS19mb3Jfc2F2ZSgpOyBlbHNlIGNoZWNrX3NhdmUoKTtcclxuICAgIFVMX2xpc3RfY3Jzci5zZXRfcG9zKFVMX2lkeCk7IGZvcm1fc2V0KCk7XHJcbn1cclxuZnVuY3Rpb24gZXhpc3Rfc2F2ZV9saXN0KCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHNhdmVfVUxfbGlzdC5jaGlsZHJlbi5sZW5ndGggPiAwO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjaGVja19sb2FkKCk6IHZvaWQgeyAvLyDlhaXlipvjg4Hjgqfjg4Pjgq/jgajml6LlrZjjg4fjg7zjgr/kuIrmm7jjgY3jga7norroqo1cclxuICAgIGNvbnN0IGRhdGFfaWR4ID0gVUxfdG9fRGF0YVtVTF9pZHhdO1xyXG4gICAgaWYgKFVMX2lkeCA8IDAgfHwgVUxfaWR4ID4gVUxfbGlzdF9sZW5nIC0gMSkge1xyXG4gICAgICAgIGdfbWVzLndhcm5pbmdfbWVzc2FnZShgY2hlY2shISBObyBsb25nZXIgYWNjZXNzIGlkeCHjgI4ke3NhdmVfbGlzdFtkYXRhX2lkeF0udGl0bGV944CPKHNhdmVfaWQ6ICR7c2F2ZV9saXN0W2RhdGFfaWR4XS5zYXZlX2lkfSlgKTtcclxuICAgIH1cclxuICAgIGlzX2tha3VuaW4gPSB0cnVlO1xyXG4gICAgZ19jdGxzLmFjdChjdGxzX2xvYWRfY2hrKTtcclxuICAgIGRpc3BsYXlfbWVzc2FnZSgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjaGVja19zYXZlKCk6IHZvaWQgeyAvLyDlhaXlipvjg4Hjgqfjg4Pjgq/jgajml6LlrZjjg4fjg7zjgr/kuIrmm7jjgY3jga7norroqo1cclxuICAgIGNvbnN0IGRhdGFfaWR4ID0gVUxfdG9fRGF0YVtVTF9pZHhdO1xyXG4gICAgaWYgKFVMX2lkeCA8IDAgfHwgVUxfaWR4ID4gVUxfbGlzdF9sZW5nIC0gMSkge1xyXG4gICAgICAgIGdfbWVzLndhcm5pbmdfbWVzc2FnZShgY2hlY2shISBObyBsb25nZXIgYWNjZXNzIGlkeCHjgI4ke3NhdmVfbGlzdFtkYXRhX2lkeF0udGl0bGV944CPKHNhdmVfaWQ6ICR7c2F2ZV9saXN0W2RhdGFfaWR4XS5zYXZlX2lkfSlgKTtcclxuICAgIH1cclxuICAgIGlmIChzYXZlX2xpc3RbZGF0YV9pZHhdLmF1dG9fbW9kZSkge1xyXG4gICAgICAgIGdfbWVzLndhcm5pbmdfbWVzc2FnZShgY2hlY2shISBUaGlzIGlzIEF1dG8gTW9kZSHjgI4ke3NhdmVfbGlzdFtkYXRhX2lkeF0udGl0bGV944CPKHNhdmVfaWQ6ICR7c2F2ZV9saXN0W2RhdGFfaWR4XS5zYXZlX2lkfSlgKTtcclxuICAgIH1cclxuICAgIGlzX2tha3VuaW4gPSB0cnVlO1xyXG4gICAgZ19jdGxzLmFjdChjdGxzX3NhdmVfY2hrKTtcclxuICAgIGRpc3BsYXlfbWVzc2FnZSgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkaXNwbGF5X21lc3NhZ2UoKSB7XHJcbiAgICBpZiAoZm9yX3NhdmUpIHtcclxuICAgICAgICBpZiAoaXNfa2FrdW5pbikge1xyXG4gICAgICAgICAgICBpZiAoVUxfdG9fRGF0YVtVTF9pZHhdID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGdfY3ZtLm5vdGljZV9tZXNzYWdlKCfjgZPjgozjgavkv53lrZjjgZfjgb7jgZnjgYvvvJ8nKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGdfY3ZtLm5vdGljZV9tZXNzYWdlKCfjgZPjgozjgavkuIrmm7jkv53lrZjjgZfjgb7jgZnjgYvvvJ/ku6XliY3jga7jg4fjg7zjgr/jga/mtojljrvjgZXjgozjgb7jgZknKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGdfY3ZtLm5vcm1hbF9tZXNzYWdlKCfjganjgozjgavkv53lrZjjgZfjgb7jgZnjgYvvvJ8nKTtcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmIChpc19rYWt1bmluKSB7XHJcbiAgICAgICAgICAgIGdfY3ZtLm5vdGljZV9tZXNzYWdlKCfjg63jg7zjg4njgZfjgb7jgZnjgYvvvJ8nKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBnX2N2bS5ub3JtYWxfbWVzc2FnZSgn44Gp44KM44KS44Ot44O844OJ44GX44G+44GZ44GL77yfJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuXHJcblxyXG5mdW5jdGlvbiBsb2FkKCk6IHZvaWQgeyBcclxuICAgIGNvbnN0IGRhdGFfaWR4ID0gVUxfdG9fRGF0YVtVTF9pZHhdO1xyXG4gICAgaWYgKHNhdmVfbGlzdFtkYXRhX2lkeF0ubXlwb3MudXJsKCkgIT09ICcnICYmIHNhdmVfbGlzdFtkYXRhX2lkeF0ubXlwb3MudXJsKCkgIT0gZ19teV91cmwpIHtcclxuICAgICAgICBfbG9hZF9vdGhlcihkYXRhX2lkeCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgX2xvYWRfaGVyZShkYXRhX2lkeCk7XHJcbiAgICByZXR1cm47XHJcbn1cclxuZnVuY3Rpb24gX2xvYWRfb3RoZXIoZGF0YV9pZHg6IG51bWJlcik6IHZvaWQge1xyXG4gICAgY29uc3Qgb3B0ID0gbmV3IENfVXJsT3B0KCk7XHJcbiAgICBvcHQuc2V0KCdtb2RlJywgJ2xvYWQnKTtcclxuICAgIG9wdC5zZXQoJ3BpZCcsICAgZ19zdGFydF9lbnYucGlkKTtcclxuICAgIG9wdC5zZXQoJ29wdCcsICAgc2F2ZV9saXN0W2RhdGFfaWR4XS51bmlxX25vLnRvU3RyaW5nKCkpO1xyXG4gICAgUE9TVF9hbmRfbW92ZV9wYWdlKHNhdmVfbGlzdFtkYXRhX2lkeF0ubXlwb3MudXJsKCksIG9wdCk7XHJcbiAgICByZXR1cm47XHJcbn1cclxuXHJcbmZ1bmN0aW9uIF9sb2FkX2hlcmUoZGF0YV9pZHg6IG51bWJlcik6IHZvaWQge1xyXG4gICAgZ19zdGFydF9lbnYucGlkID0gc2F2ZV9saXN0W2RhdGFfaWR4XS5wbGF5ZXJfaWQ7XHJcblxyXG4gICAgZ2VuZXJhbF9sb2FkKHNhdmVfbGlzdFtkYXRhX2lkeF0udW5pcV9ubykudGhlbigoanNvbk9iajphbnkpPT57ICBcclxuICAgICAgICBpc19rYWt1bmluID0gZmFsc2U7XHJcbiAgICAgICAgZGVjb2RlX2FsbChqc29uT2JqPy5zYXZlKTtcclxuICAgICAgICBnX212bS5ub3RpY2VfbWVzc2FnZSgn44Ot44O844OJ44GX44G+44GX44GfJyk7XHJcbiAgICAgICAgZ29fYmFja19tb3ZlX21vZGUoKTsgICAgICAgIFxyXG4gICAgfSk7XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIHNhdmUoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICBjb25zdCBkYXRhX2lkeCA9IFVMX3RvX0RhdGFbVUxfaWR4XTtcclxuICAgIHNldF9nX3NhdmUoXHJcbiAgICAgICAgLyogc2F2ZV9pZDogKi8gICBzYXZlX2xpc3RbZGF0YV9pZHhdLnNhdmVfaWQsIC8vTnVtYmVyKGZvcm1faWQudmFsdWUpLFxyXG4gICAgICAgIC8qIHVuaXFfbm86ICovICAgc2F2ZV9saXN0W2RhdGFfaWR4XS51bmlxX25vLFxyXG4gICAgICAgIC8qIHRpdGxlOiAqLyAgICAgYOS/neWtmOa4iDogIyR7ZGF0YV9pZHgudG9TdHJpbmcoKS5wYWRTdGFydCgyLCAnMCcpfWAsIC8vc2F2ZV9saXN0W2RhdGFfaWR4XS50aXRsZSwgXHJcbiAgICAgICAgLyogZGV0YWlsOiAqLyAgICBmb3JtX2RldGFpbC52YWx1ZSxcclxuICAgICAgICAvKiBwb2ludDogKi8gICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGDjgI4ke2dfbWF6ZS5nZXRfbmFtZSgpfeOAjyBgIFxyXG4gICAgICAgICAgICAgICAgICAgICsgYOWcsOS4iyAke2dfdGVhbS5nZXRfcGQoKS56ICsgMX3pmo7lsaQgYCBcclxuICAgICAgICAgICAgICAgICAgICArIGAoWDogJHtnX3RlYW0uZ2V0X3BkKCkueH0sIFk6ICR7Z190ZWFtLmdldF9wZCgpLnl9KWAsXHJcbiAgICAgICAgLyogYXV0b19tb2RlOiAqLyBmYWxzZSxcclxuICAgICk7XHJcbiAgICBnZW5lcmFsX3NhdmUoKS50aGVuKChqc29uT2JqKT0+e1xyXG4gICAgICAgIGRlY29kZV9hbGwoanNvbk9iaik7XHJcblxyXG4gICAgICAgIGlzX2tha3VuaW4gPSBmYWxzZTtcclxuICAgICAgICBnX212bS5ub3RpY2VfbWVzc2FnZSgn5L+d5a2Y44GX44G+44GX44GfJyk7XHJcbiAgICAgICAgZ29fYmFja19tb3ZlX21vZGUoKTsgICAgICAgIFxyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBkZWNvZGVfYWxsKGpzb25PYmo6IGFueSk6IHZvaWQgeyBcclxuICAgIC8vIFNhdmVEYXRh6Zai6YCj44Gu44OH44Kz44O844OJXHJcbiAgICBpZiAoanNvbk9iaiA9PT0gdW5kZWZpbmVkKSByZXR1cm47XHJcbiAgICBnX3NhdmUuZGVjb2RlKGpzb25PYmopOyBcclxuICAgIGdfc2F2ZS5teXBvcy5zZXRfdXJsKGdfbXlfdXJsKTtcclxuXHJcbiAgICAvL1RlYW3plqLpgKPjga7jg4fjgrPjg7zjg4lcclxuICAgIGdfdGVhbS5kZWNvZGUoZ19zYXZlLmFsbF90ZWFtW2dfc2F2ZS5teXBvcy50aWQoKT8/JyddLmVuY29kZSgpKTsgXHJcbiAgICBnX3RlYW0uc2V0X2xvYyhnX3NhdmUubXlwb3MpO1xyXG5cclxuICAgIC8vIE1hemXplqLpgKPjga7jg4fjgrPjg7zjg4lcclxuICAgIGNvbnN0IGxvYyA9IGdfdGVhbS5nZXRfbG9jKCk7IFxyXG4gICAgaWYgKGxvYy5nZXRfbGNrZCgpID09IFRfTGNrZC5NYXplKSB7XHJcbiAgICAgICAgZ19tYXplLmRlY29kZShnX3NhdmUuYWxsX21hemVbbG9jLmdldF91aWQoKV0uZW5jb2RlKCkpOyBcclxuICAgIH1cclxuXHJcbiAgICAvL0hlcm/plqLpgKPjga7jg4fjgrPjg7zjg4lcclxuICAgIGZvciAoY29uc3QgaSBpbiBnX2hyZXMpIGRlbGV0ZSBnX2hyZXNbaV07IFxyXG4gICAgZm9yIChjb25zdCBoZXJvIG9mIGdfdGVhbS5ocmVzKCkpICBnX2hyZXMucHVzaChoZXJvKTsgXHJcblxyXG4gICAgLy8gTWF6ZeOBq1RlYW3jgpLov73liqBcclxuICAgIGdfbWF6ZS5hZGRfb2JqKGdfdGVhbSBhcyBJX01hemVPYmopOyBcclxufVxyXG5cclxuLy8g5paw6KaP44Ky44O844Og44Gu5Yid5pyf44OH44O844K/44Gu6Kqt44G/6L6844G/KOaaq+WumilcclxuZXhwb3J0IGZ1bmN0aW9uIGRlY29kZV9tYXplKGpzb25PYmo6IGFueSk6IHZvaWQge1xyXG4gICAgLy8gTWF6ZemWoumAo+OBruODh+OCs+ODvOODiVxyXG4gICAgaWYgKGpzb25PYmo/Lm1hemUgIT09IHVuZGVmaW5lZCkgZ19tYXplLmRlY29kZShqc29uT2JqLm1hemUpO1xyXG5cclxuICAgIC8v44CAVGVhbemWoumAoyjnj77lnKjlnLAp44Gu44OH44Kz44O844OJXHJcbiAgICBpZiAoanNvbk9iaj8ucG9zICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBsZXQgcG9zID0gbmV3IENfUG9pbnREaXIoe1xyXG4gICAgICAgICAgICB4OiBqc29uT2JqLnBvcz8ueCwgXHJcbiAgICAgICAgICAgIHk6IGpzb25PYmoucG9zPy55LCBcclxuICAgICAgICAgICAgejoganNvbk9iai5wb3M/LnosIFxyXG4gICAgICAgICAgICBkOiBqc29uT2JqLnBvcz8uZCwgXHJcbiAgICAgICAgfSk7IFxyXG4gICAgICAgIGdfdGVhbS53YWxrKCkuc2V0X3BsYWNlKGdfbWF6ZSwgZ19teV91cmwsIHBvcyk7XHJcbiAgICAgICAgZ19zYXZlLm15cG9zID0gZ190ZWFtLmdldF9sb2MoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBIZXJv6Zai6YCj44Gu44OH44Kz44O844OJXHJcbiAgICBmb3IgKGNvbnN0IGkgaW4gZ19ocmVzKSBkZWxldGUgZ19ocmVzW2ldO1xyXG4gICAgZm9yIChjb25zdCBoZXJvIG9mIGdfdGVhbS5ocmVzKCkpIGdfaHJlcy5wdXNoKGhlcm8pO1xyXG5cclxuICAgIC8vIE1hemXjgatUZWFt44KS6L+95YqgXHJcbiAgICBnX21hemUuYWRkX29iaihnX3RlYW0gYXMgSV9NYXplT2JqKTtcclxuXHJcbiAgICAvLyBTYXZlRGF0YeOBruODmeODvOOCueOBruS9nOaIkFxyXG4gICAgZ19zYXZlLm15cG9zID0gZ190ZWFtLmdldF9sb2MoKTtcclxuICAgIGdfc2F2ZS5hbGxfbWF6ZVtnX21hemUudWlkKCldID0gZ19tYXplO1xyXG4gICAgZ19zYXZlLmFsbF90ZWFtW2dfdGVhbS51aWQoKV0gPSBnX3RlYW07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRfZ19zYXZlIChcclxuICAgICAgICBzYXZlX2lkOiAgIG51bWJlcixcclxuICAgICAgICB1bmlxX25vOiAgIG51bWJlciwgXHJcbiAgICAgICAgdGl0bGU6ICAgICBzdHJpbmcsIFxyXG4gICAgICAgIGRldGFpbDogICAgc3RyaW5nLCBcclxuICAgICAgICBwb2ludDogICAgIHN0cmluZyxcclxuICAgICAgICBhdXRvX21vZGU6IGJvb2xlYW4sXHJcbiAgICApOiB2b2lkIHtcclxuICAgICAgICBnX3NhdmUubXlwb3MgPSBnX3RlYW0uZ2V0X2xvYygpO1xyXG5cclxuICAgICAgICBnX3NhdmUuYWxsX3RlYW1bZ190ZWFtLnVpZCgpXSA9IGdfdGVhbTtcclxuICAgICAgICBnX3NhdmUuYWxsX21hemVbZ19tYXplLnVpZCgpXSA9IGdfbWF6ZTsgLy9cclxuXHJcbiAgICAgICAgZ19zYXZlLmRlY29kZSh7XHJcbiAgICAgICAgICAgIHNhdmVfaWQ6ICAgc2F2ZV9pZCwgXHJcbiAgICAgICAgICAgIHBsYXllcl9pZDogZ19zdGFydF9lbnYucGlkLFxyXG4gICAgICAgICAgICB1bmlxX25vOiAgIHVuaXFfbm8sIFxyXG4gICAgICAgICAgICB0aXRsZTogICAgIHRpdGxlLCBcclxuICAgICAgICAgICAgZGV0YWlsOiAgICBkZXRhaWwsXHJcbiAgICAgICAgICAgIHBvaW50OiAgICAgcG9pbnQsIFxyXG4gICAgICAgICAgICBhdXRvX21vZGU6IGF1dG9fbW9kZSA/ICcxJyA6ICcwJyxcclxuICAgICAgICAgICAgaXNfYWN0aXZlOiAnMScsXHJcbiAgICAgICAgICAgIGlzX2RlbGV0ZTogJzAnLFxyXG4gICAgXHJcbi8vIOWIneacn+ioreWumuOBi+ODreODvOODieOBruaZgueCueOBp+ioreWumuOBleOCjOOBpuOBhOOCi+OBr+OBmlxyXG4vLyAgICAgICAgICAgIGFsbF9tdnB0OiBhbGxfbXZwdCxcclxuLy8gICAgICAgICAgICBhbGxfbWF6ZTogYWxsX21hemUsXHJcbi8vICAgICAgICAgICAgYWxsX3RlYW06IGFsbF90ZWFtLFxyXG4vLyAgICAgICAgICAgIGFsbF9ndWxkOiBhbGxfZ3VsZCxcclxuICAgICAgICB9KTtcclxufVxyXG4iLCJpbXBvcnQgeyBUX0N0bHNNb2RlIH0gICAgZnJvbSBcIi4vVF9DdGxzTW9kZVwiO1xyXG5leHBvcnQgY29uc3QgZ19jdGxzX21vZGU6IFRfQ3Rsc01vZGVbXSA9IG5ldyBBcnJheSgxKSBhcyBUX0N0bHNNb2RlW107XHJcblxyXG5pbXBvcnQgeyBpbml0X21hemVDaCwgZGlzcGxheV9tYXplQ2ggfSBmcm9tIFwiLi9GX2Rpc3BsYXlfbWF6ZUNoXCI7XHJcbmltcG9ydCB7IGluaXRfbWF6ZTNELCBUX0Ryb3dTZXQgfSAgICAgICAgICAgIGZyb20gXCIuL0ZfZGlzcGxheV9tYXplM0RcIjtcclxuZXhwb3J0IHZhciBnX2RzOiBUX0Ryb3dTZXQgICA9IHtjYW52YXM6IG51bGwsIGNvbjogbnVsbCwgZGVwdGg6IDAsIHdhbGw6IG51bGx9O1xyXG5cclxuaW1wb3J0IHsgQ19Td2l0Y2hWaWV3IH0gICAgICAgICAgZnJvbSBcIi4vQ19Td2l0Y2hWaWV3XCI7XHJcbmV4cG9ydCB2YXIgZ192c3c6IENfU3dpdGNoVmlldztcclxuXHJcbmltcG9ydCB7IENfT25lTGluZVZpZXdNZXNzYWdlIH0gIGZyb20gXCIuLi9kX3ZpZS9DX09uZUxpbmVWaWV3TWVzc2FnZVwiO1xyXG5leHBvcnQgdmFyIGdfbXZtOiBDX09uZUxpbmVWaWV3TWVzc2FnZTtcclxuZXhwb3J0IHZhciBnX2N2bTogQ19PbmVMaW5lVmlld01lc3NhZ2U7XHJcblxyXG5pbXBvcnQgeyBDX0hlcm8gfSBmcm9tIFwiLi4vZF9tZGwvQ19IZXJvXCI7XHJcbmV4cG9ydCBjb25zdCBnX2hyZXM6IENfSGVyb1tdID0gW107XHJcblxyXG5pbXBvcnQgeyBDX01hemUgfSBmcm9tIFwiLi4vZF9tZGwvQ19NYXplXCI7XHJcbmV4cG9ydCBjb25zdCBnX21hemUgPSBuZXcgQ19NYXplKCk7XHJcblxyXG5pbXBvcnQgeyBDX1RlYW0gfSBmcm9tIFwiLi4vZF9tZGwvQ19UZWFtXCI7XHJcbmV4cG9ydCBjb25zdCBnX3RlYW0gPSBuZXcgQ19UZWFtKCk7XHJcblxyXG5pbXBvcnQgeyBDX0d1aWxkIH0gZnJvbSBcIi4uL2RfbWRsL0NfR3VpbGRcIjtcclxuZXhwb3J0IGNvbnN0IGdfZ3VsZCA9IG5ldyBDX0d1aWxkKCk7XHJcblxyXG5cclxuaW1wb3J0IHsgQ19EZWZhdWx0Q3RscyB9ICAgICAgICAgICAgZnJvbSAnLi9DX0RlZmF1bHRDdGxzJztcclxuZXhwb3J0IGxldCBnX2N0bHM6IENfRGVmYXVsdEN0bHM7XHJcblxyXG5pbXBvcnQgeyBpbml0X2FsbF9tb2RlIH0gICAgICAgICAgICBmcm9tIFwiLi9GX3NldF9tb2RlXCI7XHJcbmltcG9ydCB7IGRlY29kZV9hbGwsIGRlY29kZV9tYXplIH0gIGZyb20gXCIuL0Zfc2V0X3NhdmVfbW9kZVwiO1xyXG5pbXBvcnQgeyBkb19tb3ZlX2JvdHRvbV9oYWxmLCBhY3RfbW92ZV9tb2RlIH0gZnJvbSBcIi4vRl9zZXRfbW92ZV9tb2RlXCI7XHJcblxyXG5pbXBvcnQgeyBcclxuICAgIGdlbmVyYWxfbG9hZCwgXHJcbiAgICBnZXRfbWFpX21hemUsIFxyXG4gICAgZ2V0X25ld19tYXplLCBcclxuICAgIHRtcF9sb2FkIFxyXG59IGZyb20gXCIuLi9kX2Ntbi9GX2xvYWRfYW5kX3NhdmVcIjtcclxuXHJcbmltcG9ydCB7IFxyXG4gICAgZ19hbGVydCxcclxuICAgIGdfZGVidWcsXHJcbiAgICBnX21lcywgXHJcbiAgICBnX3JlYWR5X2dhbWVzLCBcclxuICAgIGdfc3RhcnRfZW52LCBcclxuICAgIGluaXRfYWZ0ZXJfbG9hZGVkX0RPTV9pbl9jb21tb24gXHJcbn0gZnJvbSBcIi4uL2RfY21uL2dsb2JhbFwiO1xyXG5pbXBvcnQgeyBfaXJhbmQgfSBmcm9tIFwiLi4vZF91dGwvRl9SYW5kXCI7XHJcbmltcG9ydCB7IENfTWF6ZU9iaiB9IGZyb20gXCIuLi9kX21kbC9DX01hemVPYmpcIjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpbml0X2JlZm9yZV9nYW1lcygpOiB2b2lkIHtcclxuICAgIHN3aXRjaCAoZ19zdGFydF9lbnYubW9kZSkge1xyXG4gICAgICAgIGNhc2UgJ25ldyc6XHJcbiAgICAgICAgICAgIGluaXRfYmVmb3JlX25ld19nYW1lcygpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgY2FzZSAnbG9hZCc6XHJcbiAgICAgICAgICAgIGluaXRfYmVmb3JlX2xvYWRfZ2FtZXMoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGNhc2UgJ3N0YXJ0JzpcclxuICAgICAgICAgICAgaW5pdF9iZWZvcmVfc3RhcnRfZ2FtZXMoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGNhc2UgJ212cHQnOlxyXG4gICAgICAgICAgICBpbml0X2JlZm9yZV9tdnB0X2dhbWVzKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgIH1cclxufVxyXG5leHBvcnQgZnVuY3Rpb24gaW5pdF9iZWZvcmVfbmV3X2dhbWVzKCk6IHZvaWQge1xyXG4gICAgZ2V0X21haV9tYXplKCkudGhlbigoanNvbk9iajphbnkpPT57XHJcbiAgICAgICAgZGVjb2RlX2FsbChqc29uT2JqPy5zYXZlKTtcclxuICAgICAgICBpbnN0YWxsX29ianMoNSk7ICAgICAgICAgICAgICAgICAgIC8vIOaaq+WumihDX29ianPjga7jg4bjgrnjg4jnlKgpXHJcbiAgICAgICAgZG9fbG9hZF9ib3R0b21faGFsZignJyk7XHJcbiAgICB9KTtcclxufVxyXG5mdW5jdGlvbiBpbml0X2JlZm9yZV9sb2FkX2dhbWVzKCk6IHZvaWQge1xyXG4gICAgY29uc3QgdW5vID0gTnVtYmVyKGdfc3RhcnRfZW52Lm9wdCk7XHJcbiAgICBnZW5lcmFsX2xvYWQodW5vKS50aGVuKChqc29uT2JqOmFueSk9PnsgIFxyXG4gICAgICAgIGRlY29kZV9hbGwoanNvbk9iaj8uc2F2ZSk7XHJcbiAgICAgICAgZG9fbG9hZF9ib3R0b21faGFsZign44Ot44O844OJ44GX44G+44GX44GfJyk7IFxyXG4gICAgfSk7XHJcbn1cclxuZnVuY3Rpb24gaW5pdF9iZWZvcmVfc3RhcnRfZ2FtZXMoKTogdm9pZCB7XHJcbiAgICBjb25zdCBtYXplX25hbWUgPSBnX3N0YXJ0X2Vudi5vcHQ7XHJcbiAgICB0bXBfbG9hZCgpLnRoZW4oKGpzb25PYmo6YW55KT0+e1xyXG4gICAgICAgIGRlY29kZV9hbGwoanNvbk9iaj8uc2F2ZSk7XHJcbiAgICAgICAgZ2V0X25ld19tYXplKG1hemVfbmFtZSkudGhlbigoanNvbk9iajphbnkpPT57IFxyXG4gICAgICAgICAgICBkZWNvZGVfbWF6ZShqc29uT2JqPy5kYXRhKTtcclxuICAgICAgICAgICAgZG9fbG9hZF9ib3R0b21faGFsZign5YaS6Zm644KS5aeL44KB44G+44GX44KH44GG77yBJyk7IFxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn1cclxuZnVuY3Rpb24gaW5pdF9iZWZvcmVfbXZwdF9nYW1lcygpOiB2b2lkIHtcclxuICAgIHRtcF9sb2FkKCkudGhlbigoanNvbk9iajphbnkpPT57ICBcclxuICAgICAgICBkZWNvZGVfYWxsKGpzb25PYmo/LnNhdmUpO1xyXG4gICAgICAgIGRvX2xvYWRfYm90dG9tX2hhbGYoJ+WGkumZuuOCkuWGjemWi+OBl+OBvuOBl+OCh+OBhu+8ge+8gScpOyBcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZG9fbG9hZF9ib3R0b21faGFsZihtc2c6IHN0cmluZyk6IHZvaWR7XHJcbiAgICBpbml0X21hemVDaCgpO1xyXG4gICAgZ19kcyA9IGluaXRfbWF6ZTNEKCk7IFxyXG5cclxuICAgIGdfbXZtLm5vdGljZV9tZXNzYWdlKG1zZyk7IFxyXG4gICAgZ19tZXMubm90aWNlX21lc3NhZ2UobXNnKTsgXHJcbiAgICBhY3RfbW92ZV9tb2RlKCk7ICBcclxuICAgIGRvX21vdmVfYm90dG9tX2hhbGYoJ2JsaW5rX29mZicpOyBcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGluaXRfYWZ0ZXJfbG9hZGVkX0RPTSgpOiB2b2lkIHsgXHJcbiAgICBpbml0X2FmdGVyX2xvYWRlZF9ET01faW5fY29tbW9uKCdkZWJ1Z19tb2RlJywgJ3BhbmVfc3l0bV9sb2dzJyk7IFxyXG5cclxuICAgIGdfbXZtICA9IENfT25lTGluZVZpZXdNZXNzYWdlLmdldE9iaignbWF6ZV9tZXNnJyk7IFxyXG4gICAgZ19jdm0gID0gQ19PbmVMaW5lVmlld01lc3NhZ2UuZ2V0T2JqKCdtZW51X21lc2cnKTsgXHJcbiAgICBnX2N0bHMgPSBDX0RlZmF1bHRDdGxzLmdldE9iaigpOyBcclxuICAgIGdfdnN3ICA9IENfU3dpdGNoVmlldy5nZXRPYmooKTsgXHJcblxyXG4gICAgaW5pdF9kZWJ1Z19tb2RlKCk7XHJcbiAgICBzdG9wX2RvdWJsZV9jbGljaygpOyBcclxuXHJcbiAgICBpbml0X2FsbF9tb2RlKCk7XHJcbiAgICBnX3JlYWR5X2dhbWVzLnNldEZ1bmN0aW9uKGluaXRfYmVmb3JlX2dhbWVzKTsgXHJcbiAgICBnX3JlYWR5X2dhbWVzLnNldExvYWRlZERPTSgpOyBcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGluaXRfZGVidWdfbW9kZSgpOiB2b2lkIHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgYWxlcnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWxlcnRfbW9kZScpO1xyXG4gICAgICAgIGFsZXJ0Py5zdHlsZS5zZXRQcm9wZXJ0eSgnZGlzcGxheScsICdub25lJyk7XHJcbiAgICAgICAgYWxlcnQ/LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLChldmVudDpNb3VzZUV2ZW50KT0+e1xyXG4gICAgICAgICAgICB0cnl7Z19hbGVydC5zaG93KCk7fSBjYXRjaChlcnIpe307XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGdfZGVidWcuc2V0T2JqKHtcclxuICAgICAgICAgICAgeW46ICAgICAgICBmYWxzZSxcclxuICAgICAgICAgICAgb25OYW1lOiAgICdERUJVRycsXHJcbiAgICAgICAgICAgIG9mZk5hbWU6ICAn6YCa5bi4JyxcclxuICAgICAgICAgICAgb25DbGFzczogICdkZWJ1ZycsXHJcbiAgICAgICAgICAgIG9mZkNsYXNzOiAnbm9ybWFsJyxcclxuICAgICAgICB9KTtcclxuICAgICAgICBnX2RlYnVnLmFkZEZuYyh0b2dnbGVfZGVidWdfbW9kZSk7Ly9nX2RlYnVnLnNldE9OKCk7XHJcblxyXG4gICAgICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZWJ1Z19tb2RlJykgYXMgSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsKGV2ZW50KT0+e1xyXG4gICAgICAgICAgICBzd2l0Y2ggKGV2ZW50LmNvZGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJOdW1wYWRNdWx0aXBseVwiOlxyXG4gICAgICAgICAgICAgICAgY2FzZSBcIkVzY2FwZVwiOlxyXG4gICAgICAgICAgICAgICAgICAgIGJ0bi5jbGljaygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH0gY2F0Y2ggKGVycikge3JldHVybn07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRvZ2dsZV9kZWJ1Z19tb2RlKHluOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICBkaXNwbGF5X21hemVDaCgpO1xyXG5cclxuICAgIGNvbnN0IGFsZXJ0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FsZXJ0X21vZGUnKTtcclxuICAgIGNvbnN0IGRpc3BsYXkgPSB5biA/ICdibG9jaycgOiAnbm9uZSc7XHJcbiAgICBhbGVydD8uc3R5bGUuc2V0UHJvcGVydHkoJ2Rpc3BsYXknLCBkaXNwbGF5KTtcclxuXHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBzdG9wX2RvdWJsZV9jbGljaygpOiB2b2lkIHtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdkYmxjbGljaycsKGV2dDogTW91c2VFdmVudCkgPT57ZXZ0LnByZXZlbnREZWZhdWx0KCk7fSlcclxufVxyXG5cclxuLy8g5pqr5a6aKENfTWF6ZU9iauOBruODhuOCueODiOeUqClcclxuZnVuY3Rpb24gaW5zdGFsbF9vYmpzKG51bTogbnVtYmVyID0gMSk6IHZvaWQge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW07IGkrKykge1xyXG4gICAgICAgIGNvbnN0IHggPSBfaXJhbmQoMSwgKGdfbWF6ZS5nZXRfeF9tYXgoKSAtIDEpIC8gMikgKiAyICsgMTsgXHJcbiAgICAgICAgY29uc3QgeSA9IF9pcmFuZCgxLCAoZ19tYXplLmdldF95X21heCgpIC0gMSkgLyAyKSAqIDIgKyAxOyBcclxuICAgICAgICBjb25zdCBvYmogPSBDX01hemVPYmoubmV3T2JqKHtcclxuICAgICAgICAgICAgcG9zOiAgICB7eDp4LCB5OnksIHo6MCwgZDowfSxcclxuICAgICAgICAgICAgdmlldzoge1xyXG4gICAgICAgICAgICAgICAgbGF5ZXI6ICAgMixcclxuICAgICAgICAgICAgICAgIGxldHRlcjogJ+eJqScsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgZ19tYXplLmFkZF9vYmoob2JqKTtcclxuICAgIH1cclxufVxyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8vXHJcbi8vLyAgIOS4u+WHpueQhlxyXG4vLy9cclxuXHJcbmltcG9ydCB7IGluaXRfYWZ0ZXJfbG9hZGVkX0RPTSB9IGZyb20gXCIuL2dsb2JhbF9mb3JfbWF6ZVwiO1xyXG5cclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHsgXHJcbiAgICBpbml0X2FmdGVyX2xvYWRlZF9ET00oKTsgXHJcbn0pO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=