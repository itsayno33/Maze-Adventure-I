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
            col_l: '', col_2: '',
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
            col_l: '', col_2: '',
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
            col_l: '', col_2: '',
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
            col_l: '#9999ff', col_2: '#6666ff',
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
            col_l: '#9999ff', col_2: '#66ffff',
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
            col_l: '#0000ff', col_2: '#00ee00',
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
            col_l: '#0000ff', col_2: '#ffffcc',
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
            col_l: '#0000ff', col_2: '#ffffcc',
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
            col_l: '#0000ff', col_2: '#ffffcc',
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
    static get_context2D() { return this === null || this === void 0 ? void 0 : this.con2D; }
    static set_context2D(con2D) { this.con2D = con2D; }
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
        this.my_show = true;
        this.my_col_f = '#f8f8f8';
        this.my_col_b = '#aaaaaa';
        this.my_col_s = '#dddddd';
        this.my_col_t = '#ffffff';
        this.my_col_d = '#cccccc';
        this.my_col_l = '#333333';
        this.my_col_2 = '#cccccc';
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
        if (j.show !== undefined)
            this.my_show = j.show !== '0' ? true : false;
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
        if (j.col_2 !== undefined)
            this.my_col_2 = j.col_2 !== '' ? j.col_2 : null;
        return this;
    }
    layer() { return this.my_layer; }
    set_layer(layer) { this.my_layer = layer; }
    letter() { return this.my_letter; }
    set_letter(letter) { return this.my_letter = letter; }
    canShow() { return this.my_show; }
    ;
    setShow(can_show) { return this.my_show = can_show; }
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
    col_2() { return this.my_col_2; }
    set_col_2(col_2) { return this.my_col_2 = col_2; }
    drow2D(rect) {
        var _a, _b;
        drow2D_cell(rect, (_a = this.col_2()) !== null && _a !== void 0 ? _a : '#cccccc', (_b = this.col_l()) !== null && _b !== void 0 ? _b : '#9999ff');
    }
    drow3D(frot, back) {
        this.drow3D_obj_back(frot, back);
        this.drow3D_obj_down(frot, back);
        this.drow3D_obj_top(frot, back);
        this.drow3D_obj_right_side(frot, back);
        this.drow3D_obj_left_side(frot, back);
        this.drow3D_obj_front(frot, back);
    }
    drow3D_obj_down(frot, back) {
        var _a, _b;
        if (!this.canShow() || this.col_t() === null)
            return;
        if (this.pad_s() <= 0.0 && this.pad_t() >= 1.0) {
            drow3D_cell_floor(frot, back, (_a = this.col_t()) !== null && _a !== void 0 ? _a : '#6666ff', (_b = this.col_l()) !== null && _b !== void 0 ? _b : '#9999ff');
            return;
        }
        const o = __calc_padding_obj(this, frot, back);
        const rect = {
            tl: o.fdl,
            tr: o.fdr,
            dr: o.bdr,
            dl: o.bdl,
        };
        drow3D_cell(rect, this.col_t(), this.col_l());
    }
    drow3D_obj_top(frot, back) {
        var _a, _b;
        if (!this.canShow() || this.col_d() === null)
            return;
        if (this.pad_s() <= 0.0 && this.pad_d() >= 1.0) {
            drow3D_cell_ceiling(frot, back, (_a = this.col_d()) !== null && _a !== void 0 ? _a : '#aaaaaa', (_b = this.col_l()) !== null && _b !== void 0 ? _b : '#9999ff');
            return;
        }
        const o = __calc_padding_obj(this, frot, back);
        const rect = {
            tl: o.ftl,
            tr: o.ftr,
            dr: o.btr,
            dl: o.btl,
        };
        drow3D_cell(rect, this.col_d(), this.col_l());
    }
    drow3D_obj_front(frot, back) {
        if (!this.canShow() || this.col_f() === null)
            return;
        const o = __calc_padding_obj(this, frot, back);
        const rect = {
            tl: o.ftl,
            tr: o.ftr,
            dr: o.fdr,
            dl: o.fdl,
        };
        drow3D_cell(rect, this.col_f(), this.col_l());
    }
    drow3D_obj_back(frot, back) {
        if (!this.canShow() || this.col_b() === null)
            return;
        const o = __calc_padding_obj(this, frot, back);
        const rect = {
            tl: o.btl,
            tr: o.btr,
            dr: o.bdr,
            dl: o.bdl,
        };
        drow3D_cell(rect, this.col_b(), this.col_l());
    }
    drow3D_obj_left_side(frot, back) {
        if (!this.canShow() || this.col_s() === null)
            return;
        const o = __calc_padding_obj(this, frot, back);
        const rect = {
            tl: o.btl,
            tr: o.ftl,
            dr: o.fdl,
            dl: o.bdl,
        };
        drow3D_cell(rect, this.col_s(), this.col_l());
    }
    drow3D_obj_right_side(frot, back) {
        if (!this.canShow() || this.col_s() === null)
            return;
        const o = __calc_padding_obj(this, frot, back);
        const rect = {
            tl: o.ftr,
            tr: o.btr,
            dr: o.bdr,
            dl: o.fdr,
        };
        drow3D_cell(rect, this.col_s(), this.col_l());
    }
    encode() {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return {
            cname: this.clname,
            layer: this.my_layer,
            letter: (_a = this.my_letter) !== null && _a !== void 0 ? _a : '',
            pad_t: this.my_pad_t,
            pad_d: this.my_pad_d,
            pad_s: this.my_pad_s,
            show: this.canShow() ? '1' : '0',
            col_f: (_b = this.my_col_f) !== null && _b !== void 0 ? _b : '',
            col_b: (_c = this.my_col_b) !== null && _c !== void 0 ? _c : '',
            col_s: (_d = this.my_col_s) !== null && _d !== void 0 ? _d : '',
            col_t: (_e = this.my_col_t) !== null && _e !== void 0 ? _e : '',
            col_d: (_f = this.my_col_d) !== null && _f !== void 0 ? _f : '',
            col_l: (_g = this.my_col_l) !== null && _g !== void 0 ? _g : '',
            col_2: (_h = this.my_col_2) !== null && _h !== void 0 ? _h : '',
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
function drow3D_cell_floor(rect_frot, rect_back, fill = '#6666ff', line = '#9999ff') {
    const rect = {
        tl: { x: rect_frot.min_x, y: rect_frot.max_y },
        tr: { x: rect_frot.max_x, y: rect_frot.max_y },
        dr: { x: rect_back.max_x, y: rect_back.max_y },
        dl: { x: rect_back.min_x, y: rect_back.max_y }
    };
    drow3D_cell(rect, fill, line);
}
function drow3D_cell_ceiling(rect_frot, rect_back, fill = '#aaaaaa', line = '#9999ff') {
    const rect = {
        tl: { x: rect_frot.min_x, y: rect_frot.min_y },
        tr: { x: rect_frot.max_x, y: rect_frot.min_y },
        dr: { x: rect_back.max_x, y: rect_back.min_y },
        dl: { x: rect_back.min_x, y: rect_back.min_y }
    };
    drow3D_cell(rect, fill, line);
}
function drow2D_cell(r, fill, line) {
    const con = C_MazeObjView.get_context2D();
    if (con === undefined)
        return;
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
function drow3D_cell(r, fill, line) {
    const con = C_MazeObjView.get_context3D();
    if (con === undefined)
        return;
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
    col_2() { return null; }
    drow2D(r) {
    }
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
                ret_str += 'Ｘ';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QyxDQUFDLENBQUMsRUFBRSxHQUFLLG9CQUFPLEVBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztRQUVwQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBSSxvQkFBTyxFQUFDLENBQUMsRUFBRyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUksb0JBQU8sRUFBQyxDQUFDLEVBQUcsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFJLG9CQUFPLEVBQUMsQ0FBQyxFQUFHLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBSSxvQkFBTyxFQUFDLENBQUMsRUFBRyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFFcEMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUksb0JBQU8sRUFBQyxDQUFDLEVBQUksRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFJLG9CQUFPLEVBQUMsQ0FBQyxFQUFJLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBSSxvQkFBTyxFQUFDLENBQUMsRUFBSSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUksb0JBQU8sRUFBQyxDQUFDLEVBQUksRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFJLG9CQUFPLEVBQUMsQ0FBQyxFQUFJLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBSSxvQkFBTyxFQUFDLENBQUMsRUFBSSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDcEMsSUFBSSxD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LFNBQVM7WUFBRSxJQUFJLENBQUMsUUFBUSxHQUFJLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDdEQsSUFBSSxDQUFDLENBQUMsTUFBTSxLQUFNLFNBQVM7WUFBRSxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxNQUFNLEtBQUssRUFBRSxDQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDakYsSUFBSSxDQUFDLENBQUMsS0FBSyxLQUFPLFNBQVM7WUFBRSxJQUFJLENBQUMsUUFBUSxHQUFJLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDdEQsSUFBSSxDQUFDLENBQUMsS0FBSyxLQUFPLFNBQVM7WUFBRSxJQUFJLENBQUMsUUFBUSxHQUFJLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDdEQsSUFBSSxDQUFDLENBQUMsS0FBSyxLQUFPLFNBQVM7WUFBRSxJQUFJLENBQUMsUUFBUSxHQUFJLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDdEQsSUFBSSxDQUFDLENBQUMsSUFBSSxLQUFRLFNBQVM7WUFBRSxJQUFJLENBQUMsT0FBTyxHQUFLLENBQUMsQ0FBQyxJQUFJLEtBQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUNsRixJQUFJLENBQUMsQ0FBQyxLQUFLLEtBQU8sU0FBUztZQUFFLElBQUksQ0FBQyxRQUFRLEdBQUksQ0FBQyxDQUFDLEtBQUssS0FBTSxFQUFFLENBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNqRixJQUFJLENBQUMsQ0FBQyxLQUFLLEtBQU8sU0FBUztZQUFFLElBQUksQ0FBQyxRQUFRLEdBQUksQ0FBQyxDQUFDLEtBQUssS0FBTSxFQUFFLENBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNqRixJQUFJLENBQUMsQ0FBQyxLQUFLLEtBQU8sU0FBUztZQUFFLElBQUksQ0FBQyxR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QztJQUMxRSxNQUFNLFVBQVUsR0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLE9BQU8sQ0FBQztJQUkxRSxNQUFNLFlBQVksR0FBRyxFQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsS0FBSyxHQUFHLFVBQVUsRUFBRSxDQUFDLEVBQUUsU0FBUyxDQUFDLEtBQUssR0FBRyxVQUFVLEVBQUM7SUFDdkYsTUFBTSxZQUFZLEdBQUcsRUFBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLEtBQUssR0FBRyxVQUFVLEVBQUUsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxLQUFLLEdBQUcsVUFBVSxFQUFDO0lBQ3ZGLE1BQU0sWUFBWSxHQUFHLEVBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxLQUFLLEdBQUcsVUFBVSxFQUFFLENBQUMsRUFBRSxTQUFTLENBQUMsS0FBSyxHQUFHLFVBQVUsRUFBQztJQUN2RixNQUFNLFlBQVksR0FBRyxFQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsS0FBSyxHQUFHLFVBQVUsRUFBRSxDQUFDLEVBQUUsU0FBUyxDQUFDLEtBQUssR0FBRyxVQUFVLEVBQUM7SUFFdkYsTUFBTSxZQUFZLEdBQUcsRUFBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLEtBQUssR0FBRyxVQUFVLEVBQUUsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxLQUFLLEdBQUcsVUFBVSxFQUFDO0lBQ3ZGLE1BQU0sWUFBWSxHQUFHLEVBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxLQUFLLEdBQUcsVUFBVSxFQUFFLENBQUMsRUFBRSxTQUFTLENBQUMsS0FBSyxHQUFHLFVBQVUsRUFBQztJQUN2RixNQUFNLFlBQVksR0FBRyxFQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsS0FBSyxHQUFHLFVBQVUsRUFBRSxDQUFDLEVBQUUsU0FBUyxDQUFDLEtBQUssR0FBRyxVQUFVLEVBQUM7SUFDdkYsTUFBTSxZQUFZLEdBQUcsRUFBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLEtBQUssR0FBRyxVQUFV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T0FBQyxDQUFDLE9BQU8sbUNBQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUM3QyxJQUFJLENBQUMsU0FBUyxHQUFHLE9BQUMsQ0FBQyxTQUFTLG1DQUFJLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDL0MsSUFBSSxDQUFDLE9BQU8sR0FBSyxPQUFDLENBQUMsT0FBTyxtQ0FBTSxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQzdDLElBQUksQ0FBQyxLQUFLLEdBQU8sT0FBQyxDQUFDLEtBQUssbUNBQVEsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUMzQyxJQUFJLENBQUMsTUFBTSxHQUFNLE9BQUMsQ0FBQyxNQUFNLG1DQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDNUMsSUFBSSxDQUFDLEtBQUssR0FBTyxPQUFDLENBQUMsS0FBSyxtQ0FBUSxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQzNDLElBQUksQ0FBQyxDQUFDLFNBQVMsS0FBSyxTQUFTO1lBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQzs7WUFBTSxDQUFDLENBQUMsU0FBUyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDdkYsSUFBSSxDQUFDLENBQUMsU0FBUyxLQUFLLFNBQVM7WUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDOztZQUFNLENBQUMsQ0FBQyxTQUFTLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUN2RixJQUFJLENBQUMsQ0FBQyxTQUFTLEtBQUssU0FBUztZQUFFLElBQUksQ0FBQyxTQUFTLENBQUM7O1lBQU0sQ0FBQyxDQUFDLFNBQVMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQ3ZGLElBQUksQ0FBQyxDQUFDLFNBQVMsS0FBSyxTQUFTO1lBQUUsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFdEUsSUFBSSxDQUFDLENBQUMsS0FBSyxLQUFTLFNBQVM7WUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFMUQsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVNLEtBQUs7O1FBQ1IsS0FBSyxDQUFDLGdCQUFnQjtjQUNoQixnQkFBZ0IsR0FBRyxDQUFDLFVBQUksQ0FBQyxPQUFPLG1DQUFNLEdBQUcsQ0FBQztjQUMxQyxnQkFBZ0IsR0FBRyxDQUFDLFVBQUksQ0FBQyxTQUFTLG1DQUFJLEdBQUcsQ0FBQztjQUMxQyxnQkFBZ0IsR0FBRyxDQUFDLFVBQUksQ0FBQyxPQUFPLG1DQUFNLEdBQUcsQ0FBQztjQUMxQyxnQkFBZ0IsR0FBRyxDQUFDLFVBQUksQ0FBQyxLQUFLLG1DQUFRLEdBQUcsQ0FBQztjQUMxQyxnQkFBZ0IsR0FBRyxDQUFDLFVBQUksQ0FBQyxNQUFNLG1DQUFPLEdBQUcsQ0FBQztjQUMxQyxnQkFBZ0IsR0FBRyxDQUFDLFVBQUksQ0FBQyxLQUFLLG1DQUFRLEdBQUcsQ0FBQztjQUMxQyxnQkFBZ0IsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUMsSUFBRyxFQUFDLElBQUcsQ0FBQztjQUMzQyxnQkFBZ0IsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUMsSUFBRyxFQUFDLElBQUcsQ0FBQztjQUMzQyxnQkFBZ0IsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUMsSUFBRyxFQUFDLElBQUcsQ0FBQztjQUMzQyxnQkFBZ0IsR0FBRyxDQUFDLFVBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLG1DQUFTLEdBQUcsQ0FBQztjQUNqRCxnQkFBZ0IsR0FBRyxDQUFDLFVBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLG1DQUFTLEdBQUcsQ0FBQztjQUNqRCxnQkFBZ0IsR0FBRyxDQUFDLFVBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLG1DQUFJLEdBQUcsQ0FBQztjQUNqRCxnQkFBZ0IsR0FBRyxDQUFDLFVBQUksQ0FB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Q0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7WUFDMUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxDQUFDLGFBQUQsQ0FBQyx1QkFBRCxDQUFDLENBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1lBQzFELElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUMsQ0FBQyxhQUFELENBQUMsdUJBQUQsQ0FBQyxDQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztZQUMxRCxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDLENBQUMsYUFBRCxDQUFDLHVCQUFELENBQUMsQ0FBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7WUFDMUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxDQUFDLGFBQUQsQ0FBQyx1QkFBRCxDQUFDLENBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1lBQzFELElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUMsQ0FBQyxhQUFELENBQUMsdUJBQUQsQ0FBQyxDQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztZQUMxRCxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDLENBQUMsYUFBRCxDQUFDLHVCQUFELENBQUMsQ0FBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7WUFDMUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxDQUFDLGFBQUQsQ0FBQyx1QkFBRCxDQUFDLENBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1lBQzFELElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUMsQ0FBQyxhQUFELENBQUMsdUJBQUQsQ0FBQyxDQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztZQUMxRCxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDLENBQUMsYUFBRCxDQUFDLHVCQUFELENBQUMsQ0FBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7WUFDMUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxDQUFDLGFBQUQsQ0FBQyx1QkFBRCxDQUFDLENBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1lBQzFELElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUMsQ0FBQyxhQUFELENBQUMsdUJBQUQsQ0FBQyxDQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztZQUMxRCxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDLENBQUMsYUFBRCxDQUFDLHVCQUFELENBQUMsQ0FBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFDOUQsQ0FBQztRQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7WUFDWCxLQUFLLENBQUMsdUNBQXVDLENBQUMsQ0FBQztZQUMvQyxLQUFLLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDO1lBQ2hCLE9BQU8sS0FBSyxDQUFDO1FBQ2pCLENBQUM7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0NBQ0o7QUFqT0Qsc0NBaU9DO0FBRUQsU0FBUyxFQUFFLENBQUMsQ0FBUztJQUNqQixJQUFJLENBQUMsS0FBSyxTQUFTO1FBQUUsT0FBTyxLQUFLLENBQUM7SUFDbEMsSUFBSSxDQUFDLEtBQUssSUFBSTtRQUFPLE9BQU8sS0FBSyxDQUFDO0lBQ2xDLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUFFRCxTQUFTLGtCQUFrQixDQUFDLENBQWdCOztJQUN4QyxNQUFNLEVBQUUsR0FBRyxPQUFDLENBQUMsQ0FBQyxNQUEyQiwwQ0FBRSxLQUFLLE1BQUssU0FBUztJQUU5RCxRQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNaLEtBQUssU0FBUyxDQUFDO1FBQ2YsS0FBSyxTQUFTO1lBQ04sQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ25CLE1BQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQXVCLDBDQUFFLEtBQUssRUFBRSxDQUFDO1lBQ2pFLE1BQU07UUFDZCxLQUFLLE1BQU07WUFDSCxJQUFJLEVBQUU7Z0JBQUUsTUFBQyxRQUFRLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBdUIsMENBQUUsS0FBSyxFQUFFLENBQUM7WUFDekUsTUFBTTtRQUNkLEtBQUssV0FBVztZQUNSLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUNuQixNQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUF1QiwwQ0FBRSxLQUFLLEVBQUUsQ0FBQztZQUNqRSxNQUFNO1FBQ2QsS0FBSyxTQUFTO1lBQ04sTUFBQyxRQUFRLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBdUIsMENBQUUsS0FBSyxFQUFFLENBQUM7WUFDakUsTUFBTTtRQUNkLEtBQUssTUFBTTtZQUNILElBQUksQ0FBQyxFQUFFO2dCQUFFLE1BQU07WUFDZixJQUFJLGdCQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQztnQkFDakIscUNBQWUsR0FBRSxDQUFDO1lBQ3RCLENBQUM7aUJBQU0sQ0FBQztnQkFDSixNQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUF1QiwwQ0FBRSxLQUFLLEVBQUUsQ0FBQztZQUNyRSxDQUFDO1lBQ0wsTUFBTTtRQUNWLEtBQUssV0FBVyxDQUFDO1FBQ2pCLEtBQUssU0FBUztZQUNOLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUNuQixNQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUF1QiwwQ0FBRSxLQUFLLEVBQUUsQ0FBQztZQUNqRSxNQUFNO1FBQ2QsS0FBSyxNQUFNO1lBQ0gsSUFBSSxFQUFFO2dCQUFFLE1BQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQXVCLDBDQUFFLEtBQUssRUFBRSxDQUFDO1lBQ3pFLE1BQU07UUFDZCxLQUFLLFlBQVksQ0FBQztRQUNsQixLQUFLLFNBQVM7WUFDTixDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDbkIsTUFBQyxRQUFRLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBdUIsMENBQUUsS0FBSyxFQUFFLENBQUM7WUFDakUsTUFBTTtRQUNkLEtBQUssV0FBVztZQUNSLElBQUksRUFBRTtnQkFBRSxNQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUF1QiwwQ0FBRSxLQUFLLEVBQUUsQ0FBQztZQUN6RSxNQUFNO1FBQ2QsS0FBSyxPQUFPLENBQUM7UUFDYixLQUFLLGFBQWEsQ0FBQztRQUNuQixLQUFLLEtBQUs7WUFDRixDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDbkIsSUFBSSxDQUFDLENBQUMsUUFBUTtnQkFBRSxNQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUF1QiwwQ0FBRSxLQUFLLEVBQUUsQ0FBQzs7Z0JBQ2pFLE1BQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQXVCLDBDQUFFLEtBQUssRUFBRSxDQUFDO1lBQ2pGLE1BQU07UUFDZCxLQUFLLE1BQU0sQ0FBQztRQUNaLEtBQUssTUFBTSxDQUFDO1FBQ1osS0FBSyxRQUFRO1lBQ0wsSUFBSSxFQUFFO2dCQUFFLE1BQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQXVCLDBDQUFFLEtBQUssRUFBRSxDQUFDO1lBQ3pFLE1BQU07UUFDZCxLQUFLLElBQUksQ0FBQztRQUNWLEtBQUssU0FBUyxDQUFDO1FBQ2YsS0FBSyxXQUFXO1lBQ1IsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ25CLE1BQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQXVCLDBDQUFFLEtBQUssRUFBRSxDQUFDO1lBQ2pFLE1BQU07UUFDZCxLQUFLLE1BQU0sQ0FBQztRQUNaLEtBQUssTUFBTSxDQUFDO1FBQ1osS0FBSyxRQUFRO1lBQ0wsSUFBSSxFQUFFO2dCQUFFLE1BQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQXVCLDBDQUFFLEtBQUssRUFBRSxDQUFDO1lBQ3pFLE1BQU07UUFDZCxLQUFLLE1BQU07WUFDSCxJQUFJLENBQUMsRUFBRTtnQkFBRSxNQUFNO1lBQ2YsSUFBSSxnQkFBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUM7Z0JBQ2pCLE1BQU0sQ0FBQyxHQUFHLHdCQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ2hDLElBQUksQ0FBQyxHQUFHLENBQUM7b0JBQUUsd0JBQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUN0Qyx5Q0FBbUIsRUFBQyxXQUFXLENBQUMsQ0FBQztZQUdyQyxDQUFDO1lBQ0QsTUFBTTtRQUNkLEtBQUssTUFBTTtZQUNILElBQUksQ0FBQyxFQUFFO2dCQUFFLE1BQU07WUFDZixJQUFJLGdCQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQztnQkFDakIsTUFBTSxDQUFDLEdBQUcsd0JBQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDaEMsSUFBSSxDQUFDLEdBQUcsd0JBQU0sQ0FBQyxTQUFTLEVBQUUsR0FBQyxDQUFDO29CQUFFLHdCQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDekQseUNBQW1CLEVBQUMsV0FBVyxDQUFDLENBQUM7WUFHckMsQ0FBQztZQUNELE1BQU07UUFDZCxLQUFLLE1BQU0sQ0FBQztRQUNaLEtBQUssU0FBUztZQUNOLElBQUksRUFBRTtnQkFBRSxNQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUF5QiwwQ0FBRSxLQUFLLEVBQUUsQ0FBQztZQUMzRSxNQUFNO1FBQ2QsS0FBSyxJQUFJO1lBQ0QsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ25CLE1BQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQXVCLDBDQUFFLEtBQUssRUFBRSxDQUFDO1lBQ2pFLE1BQU07UUFDZCxLQUFLLE9BQU87WUFDSixJQUFJLEVBQUU7Z0JBQUUsTUFBQyxRQUFRLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBdUIsMENBQUUsS0FBSyxFQUFFLENBQUM7WUFDekUsTUFBTTtRQUNkLEtBQUssTUFBTTtZQUNILElBQUksQ0FBQyxFQUFFO2dCQUFFLE1BQU07WUFDZixJQUFJLGdCQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQztnQkFDakIscUNBQWUsR0FBRSxDQUFDO2dCQUNsQix5Q0FBbUIsRUFBQyxXQUFXLENBQUMsQ0FBQztZQUNyQyxDQUFDO2lCQUFNLENBQUM7Z0JBQ0osTUFBQyxRQUFRLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBdUIsMENBQUUsS0FBSyxFQUFFLENBQUM7WUFDckUsQ0FBQztZQUNELE1BQU07UUFDZCxLQUFLLElBQUksQ0FBQztRQUNWLEtBQUssU0FBUztZQUNOLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUNuQixNQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUF1QiwwQ0FBRSxLQUFLLEVBQUUsQ0FBQztZQUNqRSxNQUFNO1FBQ2QsS0FBSyxNQUFNLENBQUM7UUFDWixLQUFLLFFBQVE7WUFDTCxJQUFJLEVBQUU7Z0JBQUUsTUFBQyxRQUFRLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBdUIsMENBQUUsS0FBSyxFQUFFLENBQUM7WUFDekUsTUFBTTtJQUNsQixDQUFDO0FBQ0wsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7QUM3WEQscUZBQStDO0FBRWxDLGtCQUFVLEdBQTRCO0lBQy9DLElBQUksRUFBTSxNQUFNO0lBQ2hCLElBQUksRUFBTSxNQUFNO0lBQ2hCLElBQUksRUFBTSxNQUFNO0lBQ2hCLElBQUksRUFBTSxNQUFNO0NBQ1YsQ0FBQztBQUdYLE1BQWEsWUFBWTtJQU1kLElBQUksS0FBWSxPQUFPLGtCQUFVLENBQUMsSUFBSSxDQUFDLEVBQUM7SUFDeEMsSUFBSSxLQUFZLE9BQU8sa0JBQVUsQ0FBQyxJQUFJLENBQUMsRUFBQztJQUN4QyxJQUFJLEtBQVksT0FBTyxrQkFBVSxDQUFDLElBQUksQ0FBQyxFQUFDO0lBQ3hDLElBQUksS0FBWSxPQUFPLGtCQUFVLENBQUMsSUFBSSxDQUFDLEVBQUM7SUFDeEMsSUFBSSxLQUFZLE9BQU8sa0JBQVUsQ0FBQyxJQUFJLENBQUMsRUFBQztJQUUvQztRQUNJLFlBQVksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxrQkFBVSxDQUFDLENBQUM7UUFDbkQsWUFBWSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFDMUIsSUFBSSxDQUFDO1lBQ0QsWUFBWSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDO1lBRWxDLFlBQVksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLENBQWdCLENBQUM7WUFDdkYsWUFBWSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBZ0IsQ0FBQztZQUN2RixZQUFZLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGdCQUFnQixDQUFnQixDQUFDO1lBQ3ZGLFlBQVksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLENBQWdCLENBQUM7WUFDdkYsWUFBWSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBZ0IsQ0FBQztZQUN2RixZQUFZLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGdCQUFnQixDQUFnQixDQUFDO1lBQ3ZGLFlBQVksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLENBQWdCLENBQUM7WUFDdkYsWUFBWSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBZ0IsQ0FBQztZQUN2RixZQUFZLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGdCQUFnQixDQUFnQixDQUFDO1FBQzNGLENBQUM7UUFBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1lBQ1gsbUJBQU0sRUFBQyxvQkFBb0IsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUN2QyxDQUFDO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN0QixDQUFDO0lBQ00sTUFBTSxDQUFDLE1BQU07O1FBQ2hCLFVBQUksQ0FBQyxFQUFFLG9DQUFQLElBQUksQ0FBQyxFQUFFLEdBQU0sSUFBSSxZQUFZLEVBQUUsRUFBQztRQUNoQyxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUNNLElBQUksQ0FBQyxJQUFZO1FBQ3BCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkIsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUNTLFdBQVcsQ0FBQyxDQUFTOztRQUMzQixJQUFJLENBQUM7WUFDRCxrQkFBWSxDQUFDLElBQUksMENBQUUsU0FBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUMvRCxrQkFBWSxDQUFDLElBQUksMENBQUUsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwQyxLQUFLLE1BQU0sRUFBRSxJQUFJLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDcEMsSUFBSSxZQUFZLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxLQUFLLElBQUk7b0JBQUUsU0FBUztnQkFDaEQsa0JBQVksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLDBDQUFFLFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ3RFLGtCQUFZLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQywwQ0FBRSxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9DLENBQUM7UUFDTCxDQUFDO1FBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztZQUNYLG1CQUFNLEVBQUMsb0JBQW9CLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDdkMsQ0FBQztJQUNMLENBQUM7Q0FDSjtBQXJERCxvQ0FxREM7Ozs7Ozs7Ozs7Ozs7QUM3Q0Qsa0NBeUJDO0FBaUVELHdDQWdCQztBQWdCRCw0REE0QkM7QUFHRCw4REFtQkM7QUFDRCxnRUFRQztBQXRNRCx3RkFBaUQ7QUFDakQsd0ZBQWtEO0FBQ2xELDBHQUF3RDtBQUN4RCxvR0FBc0Q7QUFDdEQscUZBQWlEO0FBQ2pELHFGQUFpRDtBQUNqRCw0R0FBMEQ7QUFXMUQsU0FBZ0IsV0FBVztJQUN2QixNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLG9CQUFvQixDQUFzQixDQUFDO0lBQ2xGLElBQUksTUFBTSxLQUFLLElBQUksRUFBRSxDQUFDO1FBQ2xCLGNBQUssQ0FBQyxlQUFlLENBQUMsMENBQTBDLENBQUMsQ0FBQztRQUNsRSxPQUFPLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBQyxDQUFDO0lBQzNELENBQUM7SUFDRCxNQUFNLEdBQUcsR0FBa0MsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNuRSxJQUFJLEdBQUcsS0FBSyxJQUFJLEVBQUUsQ0FBQztRQUNmLGNBQUssQ0FBQyxlQUFlLENBQUMsb0NBQW9DLENBQUMsQ0FBQztRQUM1RCxPQUFPLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBQyxDQUFDO0lBQzNELENBQUM7SUFFRCw2QkFBYSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNqQyxlQUFlLEVBQUUsQ0FBQztJQUdsQixNQUFNLENBQUMsS0FBSyxHQUFJLE1BQU0sQ0FBQyxXQUFXLENBQUM7SUFDbkMsTUFBTSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDO0lBRXBDLE1BQU0sS0FBSyxHQUFHLENBQUMsQ0FBQztJQUVoQixNQUFNLEtBQUssR0FBRyxJQUFJLGlCQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNuQyxNQUFNLEtBQUssR0FBRyxJQUFJLGlCQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBSSxDQUFDLEVBQUUsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDbkUsTUFBTSxJQUFJLEdBQUksSUFBSSxlQUFNLENBQUMsS0FBSyxFQUFFLElBQUksaUJBQU8sQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUMzRCxPQUFPLEVBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBQyxDQUFDO0FBQ2hFLENBQUM7QUFFRCxTQUFTLGVBQWUsS0FBVSxDQUFDO0FBSW5DLFNBQVMsZ0JBQWdCO0lBQ3JCLElBQUksc0JBQUksQ0FBQyxNQUFNLEtBQUssSUFBSSxJQUFJLHNCQUFJLENBQUMsR0FBRyxLQUFLLElBQUk7UUFBRSxPQUFPO0lBRXRELHNCQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7SUFDL0Isc0JBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUNiLENBQUMsRUFDRCxDQUFDLEVBQ0Qsc0JBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLENBQUMsRUFDckIsZ0JBQWdCLEVBQUUsQ0FDckIsQ0FBQztJQUVGLHNCQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7SUFDL0Isc0JBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUNiLENBQUMsRUFDRCxnQkFBZ0IsRUFBRSxFQUNsQixzQkFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUssQ0FBQyxFQUN2QixzQkFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUksQ0FBQyxDQUMxQixDQUFDO0lBRUYsZUFBZSxFQUFFLENBQUM7QUFDdEIsQ0FBQztBQUVELFNBQVMsZ0JBQWdCO0lBQ3JCLElBQUksc0JBQUksQ0FBQyxJQUFJLEtBQUssSUFBSTtRQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDbEMsT0FBTyxzQkFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsc0JBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0FBQzlDLENBQUM7QUFFRCxTQUFTLGVBQWU7SUFDcEIsSUFBSSxzQkFBSSxDQUFDLE1BQU0sS0FBSyxJQUFJLElBQUksc0JBQUksQ0FBQyxHQUFHLEtBQUssSUFBSSxJQUFJLHNCQUFJLENBQUMsSUFBSSxLQUFLLElBQUk7UUFBRSxPQUFPO0lBQzVFLE1BQU0sR0FBRyxHQUFLLHNCQUFJLENBQUMsR0FBRyxDQUFDO0lBQ3ZCLE1BQU0sSUFBSSxHQUFJLHNCQUFJLENBQUMsSUFBSSxDQUFDO0lBQ3hCLE1BQU0sS0FBSyxHQUFHLHNCQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3pCLE1BQU0sTUFBTSxHQUFHLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUUvQixNQUFNLE1BQU0sR0FBSSxDQUFDLENBQUM7SUFDbEIsTUFBTSxPQUFPLEdBQUcsc0JBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFJLENBQUMsQ0FBQztJQUN2QyxNQUFNLE9BQU8sR0FBRyxzQkFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQ3ZDLE1BQU0sTUFBTSxHQUFJLGdCQUFnQixFQUFFLENBQUM7SUFFbkMsR0FBRyxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUM7SUFDNUIsR0FBRyxDQUFDLFNBQVMsR0FBSyxDQUFDLENBQUM7SUFHcEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztRQUNqQyxHQUFHLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDaEIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFHRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7UUFDeEMsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2hCLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzlDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBRSxDQUFDO1FBQzlDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNqQixDQUFDO0FBQ0wsQ0FBQztBQUVELFNBQWdCLGNBQWM7SUFDMUIsSUFBSSxzQkFBSSxDQUFDLE1BQU0sS0FBSyxJQUFJLElBQUksc0JBQUksQ0FBQyxHQUFHLEtBQUssSUFBSSxJQUFJLHNCQUFJLENBQUMsSUFBSSxLQUFLLElBQUk7UUFBRSxPQUFPO0lBRTVFLGdCQUFnQixFQUFFLENBQUM7SUFDbkIsd0JBQXdCLEVBQUUsQ0FBQztJQUUzQixNQUFNLEtBQUssR0FBTSxzQkFBSSxDQUFDLEtBQUssQ0FBQztJQUM1QixNQUFNLE9BQU8sR0FBRyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDaEMsS0FBSyxJQUFJLENBQUMsR0FBRyxzQkFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1FBRXZDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUU7WUFBRSxZQUFZLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRXRELEtBQUssSUFBSSxDQUFDLEdBQUcsT0FBTyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFO1lBQUcsWUFBWSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUV0RCxZQUFZLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7QUFDTCxDQUFDO0FBRUQsU0FBUyxZQUFZLENBQUMsQ0FBUyxFQUFFLENBQVM7O0lBQ3RDLElBQUksc0JBQUksQ0FBQyxJQUFJLEtBQUssSUFBSTtRQUFFLE9BQU87SUFDL0IsTUFBTSxVQUFVLEdBQUcsd0JBQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNyRCxNQUFNLFNBQVMsR0FBSSxzQkFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3ZDLE1BQU0sU0FBUyxHQUFJLHNCQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzNDLE1BQU0sT0FBTyxHQUFNLHdCQUFNLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBRS9DLDhCQUFNLGFBQU4sd0JBQU0sdUJBQU4sd0JBQU0sQ0FBRSxRQUFRLENBQUMsVUFBVSxDQUFDLDBDQUFFLE1BQU0sQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDM0QsSUFBSSx3QkFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDO1FBQy9CLE1BQU0sR0FBRyxHQUFHLHdCQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3ZDLElBQUksR0FBRyxLQUFLLElBQUk7WUFBRSxTQUFHLENBQUMsSUFBSSxFQUFFLDBDQUFFLE1BQU0sQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDL0QsQ0FBQztBQUNMLENBQUM7QUFFRCxTQUFnQix3QkFBd0I7SUFDcEMsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyw0QkFBNEIsQ0FBeUIsQ0FBQztJQUM1RixJQUFJLEtBQUssS0FBSyxJQUFJLEVBQUUsQ0FBQztRQUNqQixjQUFLLENBQUMsZUFBZSxDQUFDLHFEQUFxRCxDQUFDLENBQUM7UUFDN0UsT0FBTztJQUNYLENBQUM7SUFDRCxJQUFJLFNBQWlCLENBQUM7SUFDdEIsTUFBTSxDQUFDLEdBQUcsd0JBQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUMxQixRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNWLEtBQUsseUJBQVcsQ0FBQyxDQUFDO1lBQ2QsU0FBUyxHQUFHLHNDQUFzQyxDQUFDO1lBQ25ELE1BQU07UUFDVixLQUFLLHlCQUFXLENBQUMsQ0FBQztZQUNkLFNBQVMsR0FBRyxzQ0FBc0MsQ0FBQztZQUNuRCxNQUFNO1FBQ1YsS0FBSyx5QkFBVyxDQUFDLENBQUM7WUFDZCxTQUFTLEdBQUcsc0NBQXNDLENBQUM7WUFDbkQsTUFBTTtRQUNWLEtBQUsseUJBQVcsQ0FBQyxDQUFDO1lBQ2QsU0FBUyxHQUFHLHNDQUFzQyxDQUFDO1lBQ25ELE1BQU07UUFDVjtZQUNJLFNBQVMsR0FBRyxzQ0FBc0MsQ0FBQztZQUNuRCxNQUFNO0lBQ2QsQ0FBQztJQUVELE1BQU0sR0FBRyxHQUFHLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxHQUFHLFNBQVMsR0FBRywrQkFBK0IsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLHNDQUFzQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsVUFBVSxDQUFDO0lBQ3JKLEtBQUssQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDO0FBQzFCLENBQUM7QUFHRCxTQUFnQix5QkFBeUI7SUFDckMsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQW9CLENBQUM7SUFDeEUsSUFBSSxLQUFLLEtBQUssSUFBSTtRQUFFLE9BQU87SUFFM0IsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQW9CLENBQUM7SUFDeEUsSUFBSSxLQUFLLEtBQUssSUFBSTtRQUFFLE9BQU87SUFFM0IsUUFBUSx3QkFBTSxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUM7UUFDNUIsS0FBSyx5QkFBVyxDQUFDLENBQUMsQ0FBQztRQUNuQixLQUFLLHlCQUFXLENBQUMsQ0FBQztZQUNkLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ2hDLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFJLE9BQU8sQ0FBQyxDQUFDO1lBQ2hDLE9BQU87UUFDWCxLQUFLLHlCQUFXLENBQUMsQ0FBQyxDQUFDO1FBQ25CLEtBQUsseUJBQVcsQ0FBQyxDQUFDO1lBQ2QsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUksT0FBTyxDQUFDLENBQUM7WUFDaEMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDaEMsT0FBTztJQUNmLENBQUM7QUFDTCxDQUFDO0FBQ0QsU0FBZ0IsMEJBQTBCO0lBQ3RDLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFvQixDQUFDO0lBQ3hFLElBQUksS0FBSyxLQUFLLElBQUk7UUFBRSxPQUFPO0lBQzNCLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRWhDLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFvQixDQUFDO0lBQ3hFLElBQUksS0FBSyxLQUFLLElBQUk7UUFBRSxPQUFPO0lBQzNCLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3BDLENBQUM7Ozs7Ozs7Ozs7Ozs7QUN6TEQsa0NBSUM7QUE2Q0Qsd0NBR0M7QUFsRUQscUZBQWlEO0FBQ2pELHFGQUFxRDtBQUNyRCw0R0FBbUQ7QUFFbkQsSUFBSSxHQUFtQixDQUFDO0FBQ3hCLElBQUksR0FBbUIsQ0FBQztBQUV4QixJQUFJLFNBQVMsR0FBVSxDQUFDLENBQUM7QUFDekIsSUFBSSxTQUFTLEdBQVUsQ0FBQyxDQUFDO0FBQ3pCLElBQUksUUFBUSxHQUFXLENBQUMsQ0FBQztBQUN6QixJQUFJLFFBQVEsR0FBVyxDQUFDLENBQUM7QUFDekIsSUFBSSxTQUFTLEdBQVUsQ0FBQyxDQUFDO0FBQ3pCLElBQUksU0FBUyxHQUFVLENBQUMsQ0FBQztBQUV6QixTQUFnQixXQUFXO0lBQ3ZCLEdBQUcsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBcUIsQ0FBQztJQUNuRSxHQUFHLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBbUIsQ0FBQztJQUNuRSxpQkFBaUIsRUFBRSxDQUFDO0FBQ3hCLENBQUM7QUFHRCxTQUFTLGlCQUFpQjtJQUV0QixTQUFTLEdBQUksR0FBRyxDQUFDLFdBQVcsQ0FBQztJQUM3QixTQUFTLEdBQUksR0FBRyxDQUFDLFlBQVksQ0FBQztJQUU5QixNQUFNLEdBQUcsR0FBTSx3QkFBTSxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUN0QyxNQUFNLE1BQU0sR0FBRyxTQUFTLEdBQUksR0FBRyxDQUFDO0lBRWhDLE1BQU0sR0FBRyxHQUFNLHdCQUFNLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3RDLE1BQU0sTUFBTSxHQUFHLFNBQVMsR0FBRyxHQUFHLENBQUM7SUFFL0IsU0FBUyxHQUFLLG1CQUFNLEVBQUMsaUJBQUksRUFBQyxDQUFDLElBQUksRUFBRSxtQkFBTSxFQUFDLElBQUksR0FBSSxpQkFBSSxFQUFDLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ2pGLFNBQVMsR0FBSyxtQkFBTSxFQUFDLGlCQUFJLEVBQUMsQ0FBQyxJQUFJLEVBQUUsbUJBQU0sRUFBQyxJQUFJLEdBQUksaUJBQUksRUFBQyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUVqRixRQUFRLEdBQU0sU0FBUyxHQUFHLEdBQUcsQ0FBQztJQUM5QixRQUFRLEdBQU0sU0FBUyxHQUFHLEdBQUcsQ0FBQztJQUU5QixHQUFHLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztJQUNoRCxHQUFHLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztJQUNoRCxHQUFHLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUcsR0FBRyxTQUFTLElBQUksQ0FBQyxDQUFDO0lBQ3RELEdBQUcsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBQyxHQUFHLFNBQVMsSUFBSSxDQUFDLENBQUM7QUFDMUQsQ0FBQztBQUVELFNBQVMsYUFBYTtJQUVsQixTQUFTLEdBQUksR0FBRyxDQUFDLFdBQVcsQ0FBQztJQUM3QixTQUFTLEdBQUksR0FBRyxDQUFDLFlBQVksQ0FBQztJQUU5QixNQUFNLEVBQUUsR0FBRyx3QkFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBRTNCLElBQUksS0FBSyxHQUFJLFNBQVMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQztJQUlwRCxJQUFJLEtBQUssR0FBSSxTQUFTLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUM7SUFJcEQsR0FBRyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFPLEdBQUcsS0FBSyxJQUFJLENBQUMsQ0FBQztJQUNqRCxHQUFHLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQVEsR0FBRyxLQUFLLElBQUksQ0FBQyxDQUFDO0FBQ3JELENBQUM7QUFFRCxTQUFnQixjQUFjO0lBQzFCLElBQUksR0FBRyxLQUFLLElBQUksRUFBRSxDQUFDO1FBQUEsR0FBRyxDQUFDLFNBQVMsR0FBRyxTQUFTLEVBQUUsQ0FBQztRQUFBLGFBQWEsRUFBRTtJQUFBLENBQUM7O1FBQzFELGNBQUssQ0FBQyxlQUFlLENBQUMscUNBQXFDLENBQUMsQ0FBQztBQUN0RSxDQUFDO0FBRUQsU0FBUyxTQUFTOztJQUNkLE1BQU0sTUFBTSxHQUFHLHdCQUFNLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDbEMsTUFBTSxNQUFNLEdBQUcsd0JBQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNsQyxNQUFNLEtBQUssR0FBSSx3QkFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7SUFFaEMsSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDO0lBQ2pCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztRQUM5QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDOUIsSUFBSSxDQUFDLGdCQUFPLENBQUMsSUFBSSxFQUFFLElBQUksd0JBQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFDO2dCQUN2RCxPQUFPLElBQUksR0FBRyxDQUFDO1lBQ25CLENBQUM7aUJBQU0sQ0FBQztnQkFDSixNQUFNLEdBQUcsR0FBRyx3QkFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUM1QyxJQUFJLEdBQUcsS0FBSyxJQUFJLElBQUksR0FBRyxDQUFDLElBQUksRUFBRSxLQUFLLFNBQVMsRUFBRSxDQUFDO29CQUMzQyxPQUFPLElBQUksOEJBQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUMsMENBQUUsU0FBUyxFQUFFLENBQUM7Z0JBQzdELENBQUM7cUJBQU0sQ0FBQztvQkFDSixNQUFNLEtBQUssR0FBRyxlQUFHLENBQUMsSUFBSSxFQUFFLDBDQUFFLE1BQU0sRUFBRSxtQ0FBSSxHQUFHLENBQUM7b0JBQzFDLE9BQU8sSUFBSSxLQUFLLENBQUM7Z0JBQ3JCLENBQUM7WUFDTCxDQUFDO1FBQ0wsQ0FBQztRQUNELE9BQU8sSUFBSSxJQUFJLENBQUM7SUFDcEIsQ0FBQztJQUNELE9BQU8sT0FBTyxDQUFDO0FBQ25CLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4Q0Qsb0NBS0M7QUFFRCxrQ0FZQztBQUVELGtDQU9DO0FBRUQsa0NBUUM7QUF6RkQsMkZBQStEO0FBQy9ELGdIQUFzRTtBQUN0RSxxRkFBNkQ7QUFDN0QscUZBQXFFO0FBRXJFLDRHQUErQztBQUMvQyw0R0FBdUU7QUFDdkUsNEdBTzZCO0FBRzdCLElBQUksS0FBSyxHQUFjLEtBQUssQ0FBQztBQUM3QixJQUFJLEtBQUssR0FBYyxLQUFLLENBQUM7QUFFN0IsSUFBSSxJQUFJLEdBQWUsS0FBSyxDQUFDO0FBRTdCLE1BQU0sWUFBWSxHQUFHO0lBQ2pCLElBQUksRUFBRSxTQUFTO0lBRWYsSUFBSSxFQUFHLEtBQUs7SUFDWixJQUFJLEVBQUcsU0FBUztDQUNuQjtBQUNELE1BQU0sWUFBWSxHQUFHO0lBQ2pCLElBQUksRUFBRSxTQUFTO0lBRWYsSUFBSSxFQUFHLE9BQU87SUFDZCxJQUFJLEVBQUcsU0FBUztDQUNuQjtBQUNELE1BQU0saUJBQWlCLEdBQUc7SUFDdEIsSUFBSSxFQUFFLGNBQWM7SUFHcEIsSUFBSSxFQUFHLEtBQUs7SUFDWixJQUFJLEVBQUcsT0FBTztJQUNkLElBQUksRUFBRyxTQUFTO0NBQ25CO0FBQ0QsTUFBTSxpQkFBaUIsR0FBRztJQUN0QixJQUFJLEVBQUUsY0FBYztJQUdwQixJQUFJLEVBQUcsS0FBSztJQUNaLElBQUksRUFBRyxPQUFPO0lBQ2QsSUFBSSxFQUFHLFNBQVM7Q0FDbkI7QUFFRCxTQUFnQixZQUFZO0lBQ3hCLHdCQUFNLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3pCLHdCQUFNLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3pCLHdCQUFNLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDOUIsd0JBQU0sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUNsQyxDQUFDO0FBRUQsU0FBZ0IsV0FBVztJQUN2QixJQUFJLHdCQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUM7UUFDNUIsdUJBQUssQ0FBQyxjQUFjLENBQUMscUNBQXFDLENBQUMsQ0FBQztJQUNoRSxDQUFDO1NBQU0sQ0FBQztRQUNKLHVCQUFLLENBQUMsY0FBYyxDQUFDLHlCQUF5QixDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVELEtBQUssR0FBRyxJQUFJLENBQUM7SUFDYixLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ2Qsd0JBQU0sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDekIsdUJBQUssQ0FBQyxJQUFJLENBQUMsdUJBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ3pCLGdCQUFnQixFQUFFO0FBQ3RCLENBQUM7QUFFRCxTQUFnQixXQUFXO0lBQ3ZCLHVCQUFLLENBQUMsY0FBYyxDQUFDLHNDQUFzQyxDQUFDLENBQUM7SUFFN0QsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUNkLEtBQUssR0FBRyxJQUFJLENBQUM7SUFDYix3QkFBTSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUN6Qix1QkFBSyxDQUFDLElBQUksQ0FBQyx1QkFBSyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7QUFDN0IsQ0FBQztBQUVELFNBQWdCLFdBQVc7SUFDdkIsdUJBQUssQ0FBQyxjQUFjLENBQUMsaURBQWlELENBQUMsQ0FBQztJQUV4RSxLQUFLLEdBQUcsSUFBSSxDQUFDO0lBQ2IsS0FBSyxHQUFHLElBQUksQ0FBQztJQUNiLElBQUksQ0FBQyxJQUFJO1FBQUcsd0JBQU0sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQzs7UUFDOUIsd0JBQU0sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUMxQyx1QkFBSyxDQUFDLElBQUksQ0FBQyx1QkFBSyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7QUFDN0IsQ0FBQztBQUVELFNBQVMsU0FBUztJQUNkLHVCQUFLLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDdEIsbUNBQWEsR0FBRSxDQUFDO0FBQ3BCLENBQUM7QUFFRCxTQUFTLEtBQUs7SUFDVixNQUFNLElBQUksR0FBRyx3QkFBTSxDQUFDLElBQUksRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBR3ZDLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztRQUNuQyxVQUFVLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBUSxFQUFFO1lBQ3hCLE9BQU8sTUFBTSw4QkFBUSxHQUFFLENBQUM7UUFDNUIsQ0FBQyxFQUFDLENBQUMsSUFBSSxDQUFDLEdBQUUsRUFBRTtZQUNSLE1BQU0sR0FBRyxHQUFHLElBQUksbUJBQVEsRUFBRSxDQUFDO1lBQzNCLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQ3hCLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFJLG9CQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbEMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUksR0FBRyxDQUFDLENBQUM7WUFDdEIsK0JBQWtCLEVBQUMsY0FBSyxDQUFDLHVCQUFjLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUMvQyxPQUFPO1FBQ1gsQ0FBQyxDQUFDLENBQUM7UUFDSCxPQUFPO0lBQ1gsQ0FBQztJQUdELElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsd0JBQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7UUFDOUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ1osdUJBQUssQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN0QixtQ0FBYSxHQUFFLENBQUM7UUFDaEIseUNBQW1CLEVBQUMsV0FBVyxDQUFDLENBQUM7SUFDckMsQ0FBQztTQUFNLENBQUM7UUFDSixVQUFVLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRSxFQUFFO1lBQ2xCLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNaLHVCQUFLLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDdEIsbUNBQWEsR0FBRSxDQUFDO1lBQ2hCLHlDQUFtQixFQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3JDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztBQUNMLENBQUM7QUFFRCxTQUFTLE9BQU87SUFDWixNQUFNLElBQUksR0FBRyx3QkFBTSxDQUFDLElBQUksRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3pDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsd0JBQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7UUFDOUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ1osdUJBQUssQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN0QixtQ0FBYSxHQUFFLENBQUM7UUFDaEIseUNBQW1CLEVBQUMsV0FBVyxDQUFDLENBQUM7SUFDckMsQ0FBQztTQUFNLENBQUM7UUFDSixVQUFVLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRSxFQUFFO1lBQ2xCLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNaLHVCQUFLLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDdEIsbUNBQWEsR0FBRSxDQUFDO1lBQ2hCLHlDQUFtQixFQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3JDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztBQUNMLENBQUM7QUFFRCxTQUFTLEtBQUs7SUFDVixJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsS0FBSztRQUFFLE9BQU87SUFFN0IsSUFBSSxJQUFJO1FBQUUsS0FBSyxFQUFFLENBQUM7O1FBQ1IsT0FBTyxFQUFFLENBQUM7QUFDeEIsQ0FBQztBQUVELFNBQVMsT0FBTztJQUNaLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxLQUFLO1FBQUUsT0FBTztJQUM3QixJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ1osd0JBQU0sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUU5QixJQUFJLHdCQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUM7UUFDNUIsdUJBQUssQ0FBQyxjQUFjLENBQUMsbUNBQW1DLENBQUMsQ0FBQztJQUM5RCxDQUFDO1NBQU0sQ0FBQztRQUNKLHVCQUFLLENBQUMsY0FBYyxDQUFDLHFDQUFxQyxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUFBLENBQUM7QUFDTixDQUFDO0FBQ0QsU0FBUyxTQUFTO0lBQ2QsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLEtBQUs7UUFBRSxPQUFPO0lBQzdCLElBQUksR0FBRyxLQUFLLENBQUM7SUFDYix3QkFBTSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBRTlCLHVCQUFLLENBQUMsY0FBYyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7QUFDOUQsQ0FBQztBQUVELFNBQWUsVUFBVTs7UUFDckIsZ0NBQVUsRUFDVyxDQUFDLENBQUMsRUFDRixDQUFDLENBQUMsRUFDRixTQUFTLEVBQ1QsRUFBRSxFQUVQLElBQUksd0JBQU0sQ0FBQyxRQUFRLEVBQUUsSUFBSTtjQUN2QixNQUFNLHdCQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSztjQUN2QyxPQUFPLHdCQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxRQUFRLHdCQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQ3hELElBQUksQ0FDeEIsQ0FBQztRQUNGLE9BQU8sNkJBQU8sR0FBRSxDQUFDO0lBQ3JCLENBQUM7Q0FBQTtBQU1ELFNBQVMsZ0JBQWdCO0lBQ3JCLElBQUksdUJBQUksYUFBSixzQkFBSSx1QkFBSixzQkFBSSxDQUFFLE1BQU0sTUFBSyxJQUFJO1FBQU0sT0FBTztJQUN0QyxzQkFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsYUFBYSxDQUFDO0FBQ3hDLENBQUM7QUFDRCxTQUFTLGdCQUFnQjtJQUNyQixJQUFJLHVCQUFJLGFBQUosc0JBQUksdUJBQUosc0JBQUksQ0FBRSxNQUFNLE1BQUssSUFBSTtRQUFNLE9BQU87SUFDdEMsc0JBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxHQUFHLEdBQUUsRUFBRSxHQUFDLENBQUMsQ0FBQztBQUNqQyxDQUFDO0FBRUQsU0FBUyxhQUFhLENBQUMsRUFBYzs7SUFDakMsSUFBSSx1QkFBSSxhQUFKLHNCQUFJLHVCQUFKLHNCQUFJLENBQUUsTUFBTSxNQUFLLElBQUk7UUFBTSxPQUFPO0lBQ3RDLElBQUksRUFBRSxDQUFDLE1BQU0sS0FBSyxzQkFBSSxDQUFDLE1BQU07UUFBRSxPQUFPO0lBRXRDLE1BQU0sR0FBRyxHQUFHLHNCQUFJLENBQUMsTUFBTSxDQUFDO0lBR3hCLE1BQU0sV0FBVyxHQUFJLEdBQUcsQ0FBQyxXQUFXLEdBQUksSUFBSSxDQUFDO0lBQzdDLE1BQU0sV0FBVyxHQUFJLEdBQUcsQ0FBQyxXQUFXLEdBQUksSUFBSSxDQUFDO0lBQzdDLE1BQU0sV0FBVyxHQUFJLEdBQUcsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO0lBRzdDLElBQUksRUFBRSxDQUFDLE9BQU8sR0FBRyxXQUFXLEVBQUUsQ0FBQztRQUFBLE1BQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQXVCLDBDQUFFLEtBQUssRUFBRSxDQUFDO1FBQUMsT0FBTztJQUFBLENBQUM7SUFFekcsSUFBSSxFQUFFLENBQUMsT0FBTyxHQUFHLFdBQVcsRUFBRSxDQUFDO1FBQUEsTUFBQyxRQUFRLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBdUIsMENBQUUsS0FBSyxFQUFFLENBQUM7UUFBQyxPQUFPO0lBQUEsQ0FBQztJQUV6RyxJQUFJLEVBQUUsQ0FBQyxPQUFPLEdBQUcsV0FBVyxFQUFFLENBQUM7UUFBQSxNQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUF1QiwwQ0FBRSxLQUFLLEVBQUUsQ0FBQztRQUFDLE9BQU87SUFBQSxDQUFDO0lBRXpHLE1BQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQXVCLDBDQUFFLEtBQUssRUFBRSxDQUFDO0lBQUMsT0FBTztBQUM3RSxDQUFDOzs7Ozs7Ozs7Ozs7O0FDdk1ELHdDQUdDO0FBQ0Qsc0NBS0M7QUE3QkQsb0dBQXVEO0FBQ3ZELDRHQUF1RTtBQUN2RSw0R0FBdUU7QUFDdkUsNEdBQXVFO0FBQ3ZFLDRHQUF1RTtBQUV2RSxJQUFNLGFBQWdDLENBQUM7QUFDdkMsSUFBTSxjQUEyQixDQUFDO0FBQ2xDLElBQU0sR0FBRyxHQUFpQixDQUFDLENBQUM7QUFFNUIsTUFBTSxhQUFhLEdBQUc7SUFDbEIsSUFBSSxFQUFFLFVBQVU7SUFDaEIsSUFBSSxFQUFHLElBQUk7SUFDWCxJQUFJLEVBQUcsSUFBSTtJQUNYLElBQUksRUFBRyxJQUFJO0lBQ1gsSUFBSSxFQUFHLElBQUk7SUFDWCxJQUFJLEVBQUcsSUFBSTtJQUNYLElBQUksRUFBRyxJQUFJO0NBQ2Q7QUFFRCxTQUFnQixjQUFjO0lBQzFCLFNBQVMsRUFBRSxDQUFDO0lBQ1osU0FBUyxFQUFFLENBQUM7QUFDaEIsQ0FBQztBQUNELFNBQWdCLGFBQWE7SUFDekIsR0FBRyxHQUFHLENBQUMsQ0FBQztJQUNSLGNBQWMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDNUIsd0JBQU0sQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDMUIsdUJBQUssQ0FBQyxJQUFJLENBQUMsdUJBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQzdCLENBQUM7QUFFRCxTQUFTLFNBQVM7SUFDZCxJQUFJLENBQUM7UUFDRCxNQUFNLFNBQVMsR0FBSyxRQUFRLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBcUIsQ0FBQztRQUM3RSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUNqRCxNQUFNLElBQUksR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBa0IsQ0FBQztZQUNwRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFlBQVksRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN4RCxDQUFDO1FBRUQsYUFBYSxHQUFJLFFBQVEsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFxQixDQUFDO1FBQzFFLGNBQWMsR0FBRyx5QkFBVyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBQUMsT0FBTSxHQUFHLEVBQUUsQ0FBQztRQUNWLEtBQUssQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDdkIsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUNELE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUFDRCxTQUFTLFlBQVksQ0FBc0IsQ0FBYTtJQUNwRCxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ3BCLENBQUM7QUFFRCxTQUFTLFNBQVM7SUFDZCx3QkFBTSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUM5QixDQUFDO0FBR0QsU0FBUyxJQUFJO0lBQ1QsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQXFCLENBQUM7SUFDM0UsSUFBSSxTQUFTLEtBQUssSUFBSTtRQUFFLE9BQU87SUFFL0IsTUFBTSxRQUFRLEdBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQztJQUNwQyxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksR0FBRyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQztRQUFFLE9BQU87SUFFakQsTUFBTSxFQUFFLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQWtCLENBQUM7SUFDL0MsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNsQixDQUFDO0FBQ0QsU0FBUyxNQUFNLENBQUMsRUFBVTtJQUN0QixRQUFRLEVBQUUsRUFBRSxDQUFDO1FBQ1QsS0FBSyxXQUFXO1lBQUUsT0FBTyxFQUFFLENBQUM7WUFBQSxPQUFPO1FBQ25DLEtBQUssV0FBVztZQUFFLE9BQU8sRUFBRSxDQUFDO1lBQUEsT0FBTztRQUNuQyxLQUFLLFdBQVc7WUFBRSxPQUFPLEVBQUUsQ0FBQztZQUFBLE9BQU87SUFDdkMsQ0FBQztBQUNMLENBQUM7QUFFRCxTQUFTLElBQUk7SUFDVCx1QkFBSyxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3RCLG1DQUFhLEdBQUUsQ0FBQztJQUNoQix5Q0FBbUIsRUFBQyxXQUFXLENBQUMsQ0FBQztBQUNyQyxDQUFDO0FBR0QsU0FBUyxJQUFJO0lBQ1QsdUJBQUssQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN0QixHQUFHLEdBQUcsY0FBYyxDQUFDLEtBQUssRUFBRSxDQUFDO0FBQ2pDLENBQUM7QUFFRCxTQUFTLElBQUk7SUFDVCx1QkFBSyxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3RCLEdBQUcsR0FBRyxjQUFjLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDakMsQ0FBQztBQUVELFNBQVMsT0FBTztJQUNaLG1DQUFhLEdBQUUsQ0FBQztBQUNwQixDQUFDO0FBRUQsU0FBUyxPQUFPO0lBQ1osbUNBQWEsR0FBRSxDQUFDO0FBQ3BCLENBQUM7QUFFRCxTQUFTLE9BQU87SUFDWixtQ0FBYSxHQUFFLENBQUM7QUFDcEIsQ0FBQzs7Ozs7Ozs7Ozs7OztBQ3RGRCxzQ0FPQztBQUNELDBDQUtDO0FBckJELDRHQUFtRDtBQUNuRCw0R0FBbUQ7QUFDbkQsNEdBQW1EO0FBQ25ELDRHQUFtRDtBQUNuRCxzR0FBaUQ7QUFFakQsNEdBQXdEO0FBRXhELFNBQWdCLGFBQWE7SUFDekIsd0JBQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNmLG9DQUFjLEdBQUUsQ0FBQztJQUNqQixvQ0FBYyxHQUFFLENBQUM7SUFDakIsb0NBQWMsR0FBRSxDQUFDO0lBQ2pCLGtDQUFZLEdBQUUsQ0FBQztJQUNmLGdDQUFZLEdBQUU7QUFDbEIsQ0FBQztBQUNELFNBQWdCLGVBQWU7SUFFM0Isd0JBQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNmLE1BQU0sYUFBYSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLENBQWdCLENBQUM7SUFDL0UsYUFBYSxhQUFiLGFBQWEsdUJBQWIsYUFBYSxDQUFFLEtBQUssQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQ3hELENBQUM7Ozs7Ozs7Ozs7Ozs7QUNHRCx3Q0FFQztBQUVELHNDQUlDO0FBVUQsMENBS0M7QUFFRCwwQ0FZQztBQWlHRCxrREFXQztBQWpMRCwyRkFBK0Q7QUFJL0QsZ0hBQXNFO0FBQ3RFLDRHQUEwRTtBQUMxRSxzR0FBd0U7QUFDeEUsNEdBQTBFO0FBQzFFLCtHQUEyRTtBQUMzRSwrR0FDNkY7QUFDN0YsNEdBUTJCO0FBRTNCLE1BQU0sYUFBYSxHQUFHO0lBQ2xCLElBQUksRUFBRSxVQUFVO0lBQ2hCLElBQUksRUFBRyxJQUFJO0lBQ1gsSUFBSSxFQUFHLElBQUk7SUFDWCxJQUFJLEVBQUcsSUFBSTtJQUNYLElBQUksRUFBRyxJQUFJO0lBQ1gsSUFBSSxFQUFHLElBQUk7SUFDWCxJQUFJLEVBQUcsSUFBSTtJQUNYLElBQUksRUFBRyxJQUFJO0NBQ2Q7QUFFRCxTQUFnQixjQUFjO0lBQzFCLHdCQUFNLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQzlCLENBQUM7QUFFRCxTQUFnQixhQUFhO0lBQ3pCLHdCQUFNLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQzFCLHVCQUFLLENBQUMsSUFBSSxDQUFDLHVCQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUN6QixnQkFBZ0IsRUFBRSxDQUFDO0FBQ3ZCLENBQUM7QUFVRCxTQUFnQixlQUFlO0lBQzNCLGtDQUFZLEdBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFXLEVBQUMsRUFBRTtRQUMvQixnQ0FBVSxFQUFDLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxJQUFJLENBQUMsQ0FBQztRQUMxQix5Q0FBbUIsRUFBQyxTQUFTLENBQUMsQ0FBQztJQUNuQyxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUM7QUFFRCxTQUFnQixlQUFlO0lBQzNCLGdDQUFVLEVBQ1csQ0FBQyxDQUFDLEVBQ0YsQ0FBQyxDQUFDLEVBQ0YsU0FBUyxFQUNULEVBQUUsRUFDUCxJQUFJLHdCQUFNLENBQUMsUUFBUSxFQUFFLElBQUk7VUFDdkIsTUFBTSx3QkFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUs7VUFDaEMsT0FBTyx3QkFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsUUFBUSx3QkFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsR0FBRyxFQUNqRCxJQUFJLENBQ3hCLENBQUM7SUFDRixrQ0FBWSxHQUFFLENBQUM7QUFDbkIsQ0FBQztBQUdELFNBQVMsMEJBQTBCO0lBQy9CLHdCQUFNLENBQUMsMEJBQTBCLENBQUMsd0JBQU0sQ0FBQyxDQUFDO0FBQzlDLENBQUM7QUFFRCxTQUFTLHFCQUFxQixDQUFDLENBQVU7SUFDckMsd0JBQU0sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNwQyxDQUFDO0FBRUQsU0FBUyxJQUFJO0lBQ1QsTUFBTSxJQUFJLEdBQUcsd0JBQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN4QyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakIsbUJBQW1CLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDcEMsQ0FBQztBQUNELFNBQVMsSUFBSTtJQUNULE1BQU0sSUFBSSxHQUFHLHdCQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDeEMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pCLG1CQUFtQixDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ3BDLENBQUM7QUFDRCxTQUFTLElBQUk7SUFDVCxNQUFNLElBQUksR0FBRyx3QkFBTSxDQUFDLElBQUksRUFBRSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3hDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqQixtQkFBbUIsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUNwQyxDQUFDO0FBQ0QsU0FBUyxJQUFJO0lBQ1QsTUFBTSxJQUFJLEdBQUcsd0JBQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN4QyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakIsbUJBQW1CLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDcEMsQ0FBQztBQUNELFNBQVMsSUFBSTtJQUNULE1BQU0sSUFBSSxHQUFHLHdCQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDekMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pCLG1CQUFtQixDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ3JDLENBQUM7QUFDRCxTQUFTLElBQUk7SUFDVCxNQUFNLElBQUksR0FBRyx3QkFBTSxDQUFDLElBQUksRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3pDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqQixtQkFBbUIsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUNyQyxDQUFDO0FBQ0QsU0FBUyxVQUFVLENBQUMsQ0FBZTtJQUMvQix1QkFBSyxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBRXRCLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVkLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUTtRQUFFLE9BQU87SUFDeEIsSUFBSSxDQUFDLENBQUMsSUFBSSxJQUFJLE1BQU0sRUFBRSxDQUFDO1FBQ25CLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNULE9BQU87SUFDWCxDQUFDO0lBQ0QsSUFBSSxDQUFDLENBQUMsSUFBSSxJQUFJLE1BQU0sRUFBRSxDQUFDO1FBQ25CLE1BQU0sSUFBSSxHQUFHLHdCQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUdyQyxJQUFJLENBQUMsS0FBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLE1BQU0sR0FBRyxVQUFVLEVBQUUsR0FBRSxDQUFDO1lBQy9CLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUFBLE9BQU87UUFDeEIsQ0FBQztRQUNELE1BQU0sR0FBRyxHQUFHLHdCQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuQyxJQUFJLEdBQUcsS0FBSyxJQUFJLEVBQUUsQ0FBQztZQUNmLElBQUksR0FBRyxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUM7Z0JBR25CLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDVCxVQUFVLEVBQUUsQ0FBQztZQUNqQixDQUFDO2lCQUFNLENBQUM7Z0JBR0osU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNiLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDZCxPQUFPO1lBQ1gsQ0FBQztRQUNMLENBQUM7YUFBTSxDQUFDO1lBRUosQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2IsQ0FBQztRQUVELE1BQU0sSUFBSSxHQUFHLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxPQUFPLEVBQUUsQ0FBQztRQUM3QixRQUFRLElBQUksRUFBRSxDQUFDO1lBQ1gsS0FBSyxtQkFBUSxDQUFDLEtBQUssQ0FBQztZQUNwQixLQUFLLG1CQUFRLENBQUMsS0FBSyxDQUFDO1lBQ3BCLEtBQUssbUJBQVEsQ0FBQyxLQUFLO2dCQUNmLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9CLENBQUM7UUFDRCxPQUFPO0lBQ1gsQ0FBQztBQUNMLENBQUM7QUFDRCxTQUFTLFNBQVMsQ0FBQyxDQUFlO0lBQzlCLHVCQUFLLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ2pDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNULE9BQU87QUFDWCxDQUFDO0FBRUQsU0FBUyxVQUFVLENBQUMsQ0FBZSxJQUFTLENBQUM7QUFFN0MsU0FBUyxVQUFVLEtBQVUsQ0FBQztBQUU5QixTQUFnQixtQkFBbUIsQ0FBQyxVQUFrQjtJQUNsRCxxQkFBcUIsQ0FBQyx3QkFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7SUFDdkMscUNBQWMsR0FBRSxDQUFDO0lBQ2pCLGlCQUFpQixFQUFFLENBQUM7SUFDcEIsSUFBSSxVQUFVLEtBQUssVUFBVTtRQUFFLGdEQUF5QixHQUFFLENBQUM7O1FBQ3RELGlEQUEwQixHQUFFLENBQUM7SUFDbEMsSUFBSSxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUM7UUFDbEIsMEJBQTBCLEVBQUUsQ0FBQztRQUM3QixJQUFJLFlBQVksRUFBRTtZQUFFLEtBQUssQ0FBQyxjQUFjLENBQUM7SUFDN0MsQ0FBQztJQUNELHFDQUFjLEdBQUUsQ0FBQztBQUNyQixDQUFDO0FBRUQsU0FBUyxZQUFZLEtBQWEsT0FBTyx3QkFBTSxDQUFDLFVBQVUsQ0FBQyx3QkFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUM7QUFFNUUsU0FBUyxpQkFBaUI7SUFDdEIsSUFBSSxDQUFDO1FBQ0QsTUFBTSxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyw0QkFBNEIsQ0FBeUIsQ0FBQztRQUN4RixDQUFDLENBQUMsU0FBUyxHQUFHLHdCQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDcEMsQ0FBQztJQUFDLE9BQU8sR0FBRyxFQUFFLENBQUMsRUFBQztJQUFBLENBQUM7QUFDckIsQ0FBQztBQUdELFNBQVMsZ0JBQWdCO0lBQ3JCLElBQUksdUJBQUksYUFBSixzQkFBSSx1QkFBSixzQkFBSSxDQUFFLE1BQU0sTUFBSyxJQUFJO1FBQU0sT0FBTztJQUN0QyxzQkFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsYUFBYSxDQUFDO0FBQ3hDLENBQUM7QUFDRCxTQUFTLGdCQUFnQjtJQUNyQixJQUFJLHVCQUFJLGFBQUosc0JBQUksdUJBQUosc0JBQUksQ0FBRSxNQUFNLE1BQUssSUFBSTtRQUFNLE9BQU87SUFDdEMsc0JBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxHQUFHLEdBQUUsRUFBRSxHQUFDLENBQUMsQ0FBQztBQUNqQyxDQUFDO0FBRUQsU0FBUyxhQUFhLENBQUMsRUFBYzs7SUFDakMsSUFBSSx1QkFBSSxhQUFKLHNCQUFJLHVCQUFKLHNCQUFJLENBQUUsTUFBTSxNQUFLLElBQUk7UUFBTSxPQUFPO0lBQ3RDLElBQUksRUFBRSxDQUFDLE1BQU0sS0FBSyxzQkFBSSxDQUFDLE1BQU07UUFBRSxPQUFPO0lBRXRDLE1BQU0sR0FBRyxHQUFHLHNCQUFJLENBQUMsTUFBTSxDQUFDO0lBR3hCLE1BQU0sV0FBVyxHQUFJLEdBQUcsQ0FBQyxXQUFXLEdBQUksSUFBSSxDQUFDO0lBQzdDLE1BQU0sV0FBVyxHQUFJLEdBQUcsQ0FBQyxXQUFXLEdBQUksSUFBSSxDQUFDO0lBQzdDLE1BQU0sV0FBVyxHQUFJLEdBQUcsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO0lBRzdDLElBQUksRUFBRSxDQUFDLE9BQU8sR0FBRyxXQUFXLEVBQUUsQ0FBQztRQUFBLE1BQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQXVCLDBDQUFFLEtBQUssRUFBRSxDQUFDO1FBQUMsT0FBTztJQUFBLENBQUM7SUFFekcsSUFBSSxFQUFFLENBQUMsT0FBTyxHQUFHLFdBQVcsRUFBRSxDQUFDO1FBQUEsTUFBQyxRQUFRLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBdUIsMENBQUUsS0FBSyxFQUFFLENBQUM7UUFBQyxPQUFPO0lBQUEsQ0FBQztJQUV6RyxJQUFJLEVBQUUsQ0FBQyxPQUFPLEdBQUcsV0FBVyxFQUFFLENBQUM7UUFBQSxNQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUF1QiwwQ0FBRSxLQUFLLEVBQUUsQ0FBQztRQUFDLE9BQU87SUFBQSxDQUFDO0lBRXpHLE1BQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQXVCLDBDQUFFLEtBQUssRUFBRSxDQUFDO0lBQUMsT0FBTztBQUM3RSxDQUFDO0FBSUQsU0FBUyxnQkFBZ0IsQ0FBQyxJQUFjO0lBQ3BDLFFBQVEsSUFBSSxFQUFFLENBQUM7UUFDWCxLQUFLLG1CQUFRLENBQUMsS0FBSztZQUNmLGdCQUFnQixFQUFFLENBQUM7WUFDbkIsK0JBQVcsR0FBRSxDQUFDO1lBQ2QsTUFBTTtRQUNWLEtBQUssbUJBQVEsQ0FBQyxLQUFLO1lBQ2YsZ0JBQWdCLEVBQUUsQ0FBQztZQUNuQiwrQkFBVyxHQUFFLENBQUM7WUFDZCxNQUFNO1FBQ1YsS0FBSyxtQkFBUSxDQUFDLEtBQUs7WUFDZixnQkFBZ0IsRUFBRSxDQUFDO1lBQ25CLCtCQUFXLEdBQUUsQ0FBQztZQUNkLE1BQU07SUFDZCxDQUFDO0FBQ0wsQ0FBQztBQUdELFNBQVMsSUFBSTtJQUNULGdCQUFnQixFQUFFLENBQUM7SUFDbkIsdUJBQUssQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN0QixtQ0FBYSxHQUFFLENBQUM7QUFDcEIsQ0FBQzs7Ozs7Ozs7Ozs7OztBQ2pPRCx3Q0FFQztBQUVELHNDQUtDO0FBM0JELDRHQUF3RDtBQUN4RCw0R0FBeUU7QUFFekUsMkZBQXdEO0FBQ3hELGdIQUErRDtBQUMvRCxxRkFBc0Q7QUFDdEQscUZBQXVGO0FBRXZGLElBQUksSUFBWSxDQUFDO0FBRWpCLE1BQU0sYUFBYSxHQUFHO0lBQ2xCLElBQUksRUFBRSxVQUFVO0lBQ2hCLElBQUksRUFBRyxJQUFJO0lBQ1gsSUFBSSxFQUFHLElBQUk7SUFDWCxJQUFJLEVBQUcsSUFBSTtJQUNYLElBQUksRUFBRyxJQUFJO0NBQ2Q7QUFFRCxTQUFnQixjQUFjO0lBQzFCLHdCQUFNLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQzlCLENBQUM7QUFFRCxTQUFnQixhQUFhO0lBQ3pCLElBQUksR0FBRyxNQUFNLENBQUM7SUFDZCx1QkFBSyxDQUFDLGNBQWMsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO0lBQ3JELHdCQUFNLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQzFCLHVCQUFLLENBQUMsSUFBSSxDQUFDLHVCQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUM3QixDQUFDO0FBRUQsU0FBUyxJQUFJO0lBQ1QsUUFBTyxJQUFJLEVBQUUsQ0FBQztRQUNWLEtBQUssTUFBTTtZQUNQLHVCQUFLLENBQUMsY0FBYyxDQUFDLDhCQUE4QixDQUFDLENBQUM7WUFDckQsSUFBSSxHQUFHLE1BQU0sQ0FBQztZQUNkLE1BQU07UUFDVixLQUFLLE1BQU07WUFDUCx1QkFBSyxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNoQyxJQUFJLEdBQUcsTUFBTSxDQUFDO1lBRWQsTUFBTSxJQUFJLEdBQUcsd0JBQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUN0QyxJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFRLENBQUMsQ0FBQztZQUN2QixJQUFJLENBQUMsT0FBTyxDQUFDLHdCQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztZQUMzQixJQUFJLENBQUMsT0FBTyxDQUFDLHdCQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztZQUUzQixlQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFLLElBQUksQ0FBQztZQUNyQyxlQUFNLENBQUMsUUFBUSxDQUFDLHdCQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyx3QkFBTSxDQUFDO1lBRXZDLDhCQUFRLEdBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRSxFQUFFO2dCQUNoQixNQUFNLEdBQUcsR0FBRyxJQUFJLG1CQUFRLEVBQUUsQ0FBQztnQkFDM0IsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBQ3hCLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFJLG9CQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2xDLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFJLEdBQUcsQ0FBQyxDQUFDO2dCQUN0QiwrQkFBa0IsRUFBQyxjQUFLLENBQUMsdUJBQWMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUMvQyxPQUFPO1lBQ1gsQ0FBQyxDQUFDLENBQUM7WUFDSCxNQUFNO0lBQ2QsQ0FBQztBQUVMLENBQUM7QUFFRCxTQUFTLElBQUk7SUFDVCxRQUFPLElBQUksRUFBRSxDQUFDO1FBQ1YsS0FBSyxNQUFNO1lBQ1AsdUJBQUssQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUN0QixtQ0FBYSxHQUFFLENBQUM7WUFDaEIsTUFBTTtJQUNkLENBQUM7QUFDTCxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDK0NELG9DQUdDO0FBRUQsc0NBZUM7QUFDRCxzQ0FNQztBQXdJRCw4Q0FrR0M7QUEwSEQsZ0NBc0JDO0FBR0Qsa0NBMkJDO0FBRUQsZ0NBOEJDO0FBcGtCRCwyRkFBd0Q7QUFDeEQsaUdBQTBEO0FBQzFELGlHQUEwRDtBQUcxRCxvR0FBMkQ7QUFDM0QscUZBQXNEO0FBQ3RELGdIQUF3RjtBQUN4RixxRkFBK0U7QUFDL0UsNEdBQXdEO0FBQ3hELDRHQUF1RTtBQUN2RSw0R0FRMkI7QUFFM0IsaUdBQWlEO0FBRWpELElBQU0sUUFBUSxHQUFhLEtBQUssQ0FBQztBQUVqQyxJQUFNLE1BQU0sR0FBYSxDQUFDLENBQUM7QUFDM0IsSUFBTSxNQUFNLEdBQVcsR0FBRyxDQUFDO0FBRTNCLElBQU0sWUFBK0IsQ0FBQztBQUN0QyxJQUFNLFlBQTBCLENBQUM7QUFDakMsSUFBTSxZQUFxQixDQUFDO0FBRTVCLElBQU0sVUFBNEQ7QUFFbEUsSUFBTSxPQUFrQyxDQUFDO0FBQ3pDLElBQU0sU0FBc0MsQ0FBQztBQUM3QyxJQUFNLFdBQXFDLENBQUM7QUFDNUMsSUFBTSxVQUFzQyxDQUFDO0FBRTdDLElBQU0sVUFBVSxHQUFHLEtBQUssQ0FBQztBQWN6QixJQUFNLFNBQWlELENBQUM7QUFDeEQsTUFBTSxhQUFhLEdBQUcsRUFBRSxDQUFDO0FBRXpCLE1BQU0sYUFBYSxHQUFHO0lBQ2xCLElBQUksRUFBRSxVQUFVO0lBQ2hCLElBQUksRUFBRyxpQkFBaUI7SUFDeEIsSUFBSSxFQUFHLGlCQUFpQjtJQUN4QixJQUFJLEVBQUcsaUJBQWlCO0NBQzNCO0FBQ0QsTUFBTSxhQUFhLEdBQUc7SUFDbEIsSUFBSSxFQUFFLFVBQVU7SUFDaEIsSUFBSSxFQUFHLElBQUk7SUFDWCxJQUFJLEVBQUcsSUFBSTtJQUNYLElBQUksRUFBRyxJQUFJO0lBQ1gsSUFBSSxFQUFHLElBQUk7SUFDWCxJQUFJLEVBQUcsVUFBVTtJQUNqQixJQUFJLEVBQUcsVUFBVTtJQUNqQixJQUFJLEVBQUcsaUJBQWlCO0lBQ3hCLElBQUksRUFBRyxpQkFBaUI7SUFDeEIsSUFBSSxFQUFHLGlCQUFpQjtDQUMzQjtBQUNELE1BQU0sYUFBYSxHQUFHO0lBQ2xCLElBQUksRUFBRSxVQUFVO0lBQ2hCLElBQUksRUFBRyxJQUFJO0lBQ1gsSUFBSSxFQUFHLElBQUk7SUFDWCxJQUFJLEVBQUcsSUFBSTtJQUNYLElBQUksRUFBRyxJQUFJO0lBQ1gsSUFBSSxFQUFHLGFBQWE7SUFDcEIsSUFBSSxFQUFHLGFBQWE7SUFDcEIsSUFBSSxFQUFHLGFBQWE7SUFDcEIsSUFBSSxFQUFHLGFBQWE7SUFDcEIsSUFBSSxFQUFHLGlCQUFpQjtJQUN4QixJQUFJLEVBQUcsaUJBQWlCO0NBQzNCO0FBQ0QsTUFBTSxhQUFhLEdBQUc7SUFDbEIsSUFBSSxFQUFFLFVBQVU7SUFDaEIsSUFBSSxFQUFHLElBQUk7SUFDWCxJQUFJLEVBQUcsSUFBSTtJQUNYLElBQUksRUFBRyxJQUFJO0lBQ1gsSUFBSSxFQUFHLElBQUk7SUFDWCxJQUFJLEVBQUcsVUFBVTtJQUNqQixJQUFJLEVBQUcsVUFBVTtJQUNqQixJQUFJLEVBQUcsaUJBQWlCO0lBQ3hCLElBQUksRUFBRyxpQkFBaUI7SUFDeEIsSUFBSSxFQUFHLGlCQUFpQjtDQUMzQjtBQUNELE1BQU0sYUFBYSxHQUFHO0lBQ2xCLElBQUksRUFBRSxVQUFVO0lBQ2hCLElBQUksRUFBRyxJQUFJO0lBQ1gsSUFBSSxFQUFHLElBQUk7SUFDWCxJQUFJLEVBQUcsSUFBSTtJQUNYLElBQUksRUFBRyxJQUFJO0lBQ1gsSUFBSSxFQUFHLGFBQWE7SUFDcEIsSUFBSSxFQUFHLGFBQWE7SUFDcEIsSUFBSSxFQUFHLGFBQWE7SUFDcEIsSUFBSSxFQUFHLGFBQWE7SUFDcEIsSUFBSSxFQUFHLGlCQUFpQjtJQUN4QixJQUFJLEVBQUcsaUJBQWlCO0NBQzNCO0FBRUQsU0FBZ0IsWUFBWTtJQUN4QixTQUFTLEVBQUUsQ0FBQztJQUNaLFNBQVMsRUFBRSxDQUFDO0FBQ2hCLENBQUM7QUFFRCxTQUFnQixhQUFhO0lBQ3pCLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRSxFQUFFO1FBQ3ZCLElBQUksQ0FBQyxlQUFlLEVBQUUsRUFBRSxDQUFDO1lBQ3JCLGdCQUFnQixFQUFFLENBQUM7WUFDbkIsdUJBQUssQ0FBQyxjQUFjLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUN4Qyx3QkFBTSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUMxQix1QkFBSyxDQUFDLElBQUksQ0FBQyx1QkFBSyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7WUFDekIsT0FBTztRQUNYLENBQUM7YUFBTSxDQUFDO1lBQ0osZ0JBQWdCLEVBQUUsQ0FBQztZQUNuQixlQUFlLEVBQUUsQ0FBQztZQUNsQix3QkFBTSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUMxQix1QkFBSyxDQUFDLElBQUksQ0FBQyx1QkFBSyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7UUFDN0IsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQUNELFNBQWdCLGFBQWE7SUFDMUIsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFFLEVBQUU7UUFDckIsZUFBZSxFQUFFLENBQUM7UUFDbEIsd0JBQU0sQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDMUIsdUJBQUssQ0FBQyxJQUFJLENBQUMsdUJBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQzdCLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQUVELFNBQWUsVUFBVSxDQUFDLFNBQWtCOztRQUN4QyxRQUFRLEdBQUcsU0FBUyxDQUFDO1FBRXJCLHVCQUFLLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDdEIsVUFBVSxHQUFHLEtBQUssQ0FBQztRQUNuQixNQUFNLGlCQUFpQixFQUFFLENBQUM7SUFDOUIsQ0FBQztDQUFBO0FBRUQsU0FBUyxnQkFBZ0I7O0lBQ3JCLGNBQVEsQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLENBQUMsMENBQUksS0FBSyxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDbEYsY0FBUSxDQUFDLGNBQWMsQ0FBQyxrQkFBa0IsQ0FBQywwQ0FBRSxLQUFLLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQztBQUN0RixDQUFDO0FBRUQsU0FBUyxnQkFBZ0I7O0lBQ3JCLGNBQVEsQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLENBQUMsMENBQUksS0FBSyxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDbkYsY0FBUSxDQUFDLGNBQWMsQ0FBQyxrQkFBa0IsQ0FBQywwQ0FBRSxLQUFLLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUN2RixDQUFDO0FBR0QsU0FBUyxTQUFTLEtBQVUsQ0FBQztBQUM3QixTQUFTLFNBQVMsS0FBVSxDQUFDO0FBQzdCLFNBQVMsU0FBUztJQUNkLFVBQVUsR0FBRyxLQUFLLENBQUM7SUFDbkIsTUFBTSxHQUFHLEdBQUcsQ0FBQztJQUViLHdCQUFNLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQzFCLHdCQUFNLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQzFCLHdCQUFNLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQzFCLHdCQUFNLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQzFCLHdCQUFNLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQzlCLENBQUM7QUFFRCxTQUFTLGFBQWE7SUFDbEIsSUFBSSxZQUFZLEtBQUssSUFBSTtRQUFFLE9BQU87SUFDbEMsSUFBSSxNQUFNLEdBQUcsQ0FBQyxJQUFJLE1BQU0sR0FBRyxZQUFZLEdBQUcsQ0FBQztRQUFFLE9BQU87SUFHcEQsSUFBSSxFQUFFLENBQUM7QUFDWCxDQUFDO0FBRUQsU0FBUyxhQUFhO0lBQ2xCLElBQUksWUFBWSxLQUFLLElBQUk7UUFBRSxPQUFPO0lBQ2xDLElBQUksTUFBTSxHQUFHLENBQUMsSUFBSSxNQUFNLEdBQUcsWUFBWSxHQUFHLENBQUM7UUFBRSxPQUFPO0lBR3BELElBQUksRUFBRSxDQUFDO0FBQ1gsQ0FBQztBQUVELFNBQVMsYUFBYTtJQUNsQixNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDMUIsQ0FBQztBQUNELFNBQVMsYUFBYTtJQUNsQixNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDMUIsQ0FBQztBQUNELFNBQVMsTUFBTSxDQUFDLElBQVk7SUFDeEIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ2QsdUJBQUssQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUN0QixpQkFBaUIsRUFBRSxDQUFDO0lBQ3hCLENBQUM7U0FBTSxDQUFDO1FBQ0osVUFBVSxHQUFHLEtBQUssQ0FBQztRQUNuQix3QkFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqQixlQUFlLEVBQUUsQ0FBQztJQUN0QixDQUFDO0FBQ0wsQ0FBQztBQUVELFNBQVMsaUJBQWlCO0lBQ3RCLHVCQUFLLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDdEIsbUNBQWEsR0FBRSxDQUFDO0FBQ3BCLENBQUM7QUFFRCxTQUFTLGlCQUFpQjtJQUN0QixtQ0FBYSxHQUFFLENBQUM7SUFDaEIseUNBQW1CLEVBQUMsV0FBVyxDQUFDLENBQUM7QUFDckMsQ0FBQztBQUVELFNBQVMsSUFBSTtJQUNULGVBQWUsRUFBRSxDQUFDO0lBQ2xCLE1BQU0sR0FBRyxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDOUIsUUFBUSxFQUFFLENBQUM7QUFDZixDQUFDO0FBRUQsU0FBUyxJQUFJO0lBQ1QsZUFBZSxFQUFFLENBQUM7SUFDbEIsTUFBTSxHQUFHLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUM5QixRQUFRLEVBQUUsQ0FBQztBQUNmLENBQUM7QUFFRCxTQUFTLElBQUk7SUFDVCxlQUFlLEVBQUUsQ0FBQztJQUNsQixNQUFNLEdBQUcsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzlCLFFBQVEsRUFBRSxDQUFDO0FBQ2YsQ0FBQztBQUVELFNBQVMsSUFBSTtJQUNULGVBQWUsRUFBRSxDQUFDO0lBQ2xCLE1BQU0sR0FBRyxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDOUIsUUFBUSxFQUFFLENBQUM7QUFDZixDQUFDO0FBRUQsU0FBUyxRQUFRO0lBQ2IsSUFBSSxNQUFNLEdBQUcsQ0FBQyxJQUFJLE1BQU0sR0FBRyxZQUFZLEdBQUcsQ0FBQztRQUFFLE9BQU87SUFFcEQsT0FBTyxDQUFJLEtBQUssR0FBUSxJQUFJLENBQUM7SUFDN0IsU0FBUyxDQUFFLFNBQVMsR0FBSSxFQUFFLENBQUM7SUFDM0IsVUFBVSxDQUFDLFNBQVMsR0FBSSxFQUFFLENBQUM7SUFFM0IsSUFBSSxXQUFXLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUM7UUFDdkMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN4QyxXQUFXLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUN2QixXQUFXLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUNyRCxDQUFDO1NBQUssQ0FBQztRQUNILFdBQVcsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO0lBQzNCLENBQUM7QUFDTCxDQUFDO0FBRUQsU0FBUyxRQUFROztJQUNiLElBQUksTUFBTSxHQUFHLENBQUMsSUFBSSxNQUFNLEdBQUcsWUFBWSxHQUFHLENBQUM7UUFBRSxPQUFPO0lBRXBELFFBQVEsRUFBRSxDQUFDO0lBQ1gsTUFBTSxRQUFRLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRXBDLE9BQU8sQ0FBSSxLQUFLLEdBQVEsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUMvRCxTQUFTLENBQUUsU0FBUyxHQUFJLGVBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxTQUFTLDBDQUFFLFdBQVcsRUFBRSxDQUFDO0lBQ3JFLFVBQVUsQ0FBQyxTQUFTLEdBQUksU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUVsRCxJQUFJLFdBQVcsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQztRQUN2QyxXQUFXLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3hDLFdBQVcsQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUMvQyxXQUFXLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUNyRCxDQUFDO1NBQUssQ0FBQztRQUNILFdBQVcsQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQztJQUNuRCxDQUFDO0FBQ0wsQ0FBQztBQUVELFNBQXNCLGlCQUFpQjs7O1FBQ25DLE1BQU0sU0FBUyxHQUFLLGdCQUFnQixDQUFDO1FBQ3JDLE1BQU0sT0FBTyxHQUFPLGNBQWMsQ0FBQztRQUNuQyxNQUFNLFNBQVMsR0FBSyxnQkFBZ0IsQ0FBQztRQUNyQyxNQUFNLFdBQVcsR0FBRyxrQkFBa0IsQ0FBQztRQUN2QyxNQUFNLFVBQVUsR0FBSSxpQkFBaUIsQ0FBQztRQUV0QyxNQUFNLDBDQUFhLEdBQUUsMENBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ2xDLElBQUksT0FBTyxLQUFLLElBQUksSUFBSSxPQUFPLEtBQUssU0FBUyxFQUFFLENBQUM7Z0JBQzVDLGNBQUssQ0FBQyxlQUFlLENBQUMsMkJBQTJCLENBQUMsQ0FBQztnQkFDbkQsT0FBTyxTQUFTLENBQUM7WUFDckIsQ0FBQztZQUNELElBQUksT0FBTyxDQUFDLEtBQUssS0FBSyxDQUFDLEVBQUUsQ0FBQztnQkFDdEIsY0FBSyxDQUFDLGVBQWUsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxJQUFJLEtBQUssT0FBTyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7Z0JBQzdELGNBQUssQ0FBQyxlQUFlLENBQUMsa0JBQWtCLENBQUMsQ0FBQztnQkFDMUMsT0FBTyxTQUFTLENBQUM7WUFDckIsQ0FBQztZQUNELElBQUksQ0FBQztnQkFDRCxTQUFTLEdBQUcsRUFBRSxDQUFDO2dCQUVmLEtBQUssSUFBSSxTQUFTLElBQUksT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDO29CQUN0QyxTQUFTLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUksdUJBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDN0QsQ0FBQztnQkFDRCxJQUFJLFFBQVEsRUFBRSxDQUFDO29CQUNYLEtBQUssSUFBSSxXQUFXLEdBQUcsQ0FBQyxFQUFFLFdBQVcsR0FBRyxhQUFhLEVBQUUsV0FBVyxFQUFFLEVBQUUsQ0FBQzt3QkFDbkUsSUFBSSxXQUFXLElBQUksU0FBUzs0QkFBRSxTQUFTO3dCQUN2QyxTQUFTLENBQUMsV0FBVyxDQUFDLEdBQUcsSUFBSSx1QkFBVSxDQUFDOzRCQUNwQyxPQUFPLEVBQUssQ0FBQyxDQUFDOzRCQUNkLE9BQU8sRUFBTSxXQUFXOzRCQUN4QixLQUFLLEVBQU8sUUFBUSxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRTs0QkFDN0QsTUFBTSxFQUFLLEVBQUU7NEJBQ2IsS0FBSyxFQUFNLEVBQUU7NEJBQ2IsU0FBUyxFQUFFLFNBQVM7NEJBQ3BCLFNBQVMsRUFBRSxHQUFHO3lCQUNqQixDQUFDLENBQUM7b0JBQ1AsQ0FBQztnQkFDTCxDQUFDO2dCQUVELFlBQVksR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBcUIsQ0FBQztnQkFDdEUsSUFBSSxZQUFZLEtBQUssSUFBSSxFQUFFLENBQUM7b0JBQUEsS0FBSyxDQUFDLG9DQUFvQyxDQUFDLENBQUM7b0JBQUEsT0FBTztnQkFBQSxDQUFDO2dCQUVoRixPQUFPLFlBQVksQ0FBQyxVQUFVLEtBQUssSUFBSSxFQUFFLENBQUM7b0JBQ3RDLFlBQVksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUN0RCxDQUFDO2dCQUVELElBQUksV0FBVyxHQUFHLENBQUMsQ0FBQztnQkFBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO2dCQUNyQyxLQUFLLElBQUksUUFBUSxJQUFJLFNBQVMsRUFBRSxDQUFDO29CQUM3QixJQUFJLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQzt3QkFDaEMsSUFBSSxRQUFROzRCQUFFLFNBQVM7d0JBRXZCLFFBQVEsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDOzRCQUNsQyxLQUFLLEdBQUc7Z0NBQ0osU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssR0FBSSxPQUFPLENBQUM7Z0NBQ3JDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEdBQUcsaUJBQWlCLENBQUM7Z0NBQy9DLFNBQVM7NEJBRWIsS0FBSyxHQUFHO2dDQUNKLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLEdBQUksT0FBTyxDQUFDO2dDQUNyQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxHQUFHLHFCQUFxQixDQUFDO2dDQUNuRCxNQUFNOzRCQUNWLEtBQUssR0FBRztnQ0FDSixTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxHQUFJLE9BQU8sQ0FBQztnQ0FDckMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sR0FBRywwQkFBMEIsQ0FBQztnQ0FDeEQsTUFBTTs0QkFDVixLQUFLLEdBQUc7Z0NBQ0osU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssR0FBSSxVQUFVLENBQUM7Z0NBQ3hDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEdBQUcsd0JBQXdCLENBQUM7Z0NBQ3RELE1BQU07d0JBQ2QsQ0FBQztvQkFDTCxDQUFDO29CQUVELE1BQU0sRUFBRSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFrQixDQUFDO29CQUN6RCxFQUFFLENBQUMsU0FBUyxHQUFHLElBQUksU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDO29CQUVoRCxFQUFFLENBQUMsRUFBRSxHQUFHLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztvQkFDL0IsRUFBRSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUMsYUFBWSxFQUFDLGFBQVksRUFBRSxLQUFLLENBQUMsQ0FBQztvQkFFeEUsWUFBWSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztvQkFDN0IsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUNqRCxDQUFDO2dCQUNELFlBQVksR0FBRyx5QkFBVyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDaEQsWUFBWSxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO2dCQUU1QyxPQUFPLEdBQU8sUUFBUSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQXlCLENBQUM7Z0JBQ3ZFLFNBQVMsR0FBSyxRQUFRLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBMkIsQ0FBQztnQkFDM0UsV0FBVyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUF3QixDQUFDO2dCQUMxRSxVQUFVLEdBQUksUUFBUSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQTBCLENBQUM7Z0JBRTNFLElBQUksQ0FBQyxlQUFlLEVBQUU7b0JBQUUsT0FBTztnQkFDL0IsTUFBTSxHQUFHLENBQUMsQ0FBQztnQkFBRSxZQUFZLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUMxQyxRQUFRLEVBQUUsQ0FBQztnQkFDWCxPQUFPO1lBQ1gsQ0FBQztZQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7Z0JBQ1gsY0FBSyxDQUFDLGVBQWUsQ0FBQyxHQUF3QixDQUFDLENBQUM7Z0JBQ2hELGNBQUssQ0FBQyxlQUFlLENBQUMsMEJBQTBCLENBQUMsQ0FBQztnQkFDbEQsT0FBTztZQUNYLENBQUM7UUFDTCxDQUFDLENBQUMsRUFBQztJQUNQLENBQUM7Q0FBQTtBQUNELFNBQVMsWUFBWSxDQUFzQixDQUFhO0lBQ3BELE1BQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBRXpCLElBQUksTUFBTSxLQUFLLE1BQU0sRUFBRSxDQUFDO1FBQ3BCLE1BQU0sR0FBSyxNQUFNLENBQUM7UUFDbEIsVUFBVSxHQUFHLEtBQUssQ0FBQztJQUN2QixDQUFDO0lBQ0QsSUFBSSxVQUFVO1FBQUUsYUFBYSxFQUFFLENBQUM7O1FBQU0sVUFBVSxFQUFFLENBQUM7SUFDbkQsWUFBWSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUFDLFFBQVEsRUFBRSxDQUFDO0FBQzdDLENBQUM7QUFDRCxTQUFTLFlBQVksQ0FBc0IsQ0FBYTtJQUNwRCxNQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUV6QixJQUFJLE1BQU0sS0FBSyxNQUFNLEVBQUUsQ0FBQztRQUNwQixNQUFNLEdBQUssTUFBTSxDQUFDO1FBQ2xCLFVBQVUsR0FBRyxLQUFLLENBQUM7SUFDdkIsQ0FBQztJQUNELElBQUksVUFBVTtRQUFFLGFBQWEsRUFBRSxDQUFDOztRQUFNLFVBQVUsRUFBRSxDQUFDO0lBQ25ELFlBQVksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7SUFBQyxRQUFRLEVBQUUsQ0FBQztBQUM3QyxDQUFDO0FBQ0QsU0FBUyxlQUFlO0lBQ3BCLE9BQU8sWUFBWSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0FBQzVDLENBQUM7QUFFRCxTQUFTLFVBQVU7SUFDZixNQUFNLFFBQVEsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDcEMsSUFBSSxNQUFNLEdBQUcsQ0FBQyxJQUFJLE1BQU0sR0FBRyxZQUFZLEdBQUcsQ0FBQyxFQUFFLENBQUM7UUFDMUMsY0FBSyxDQUFDLGVBQWUsQ0FBQyxpQ0FBaUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssY0FBYyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztJQUNsSSxDQUFDO0lBQ0QsVUFBVSxHQUFHLElBQUksQ0FBQztJQUNsQix3QkFBTSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUMxQixlQUFlLEVBQUUsQ0FBQztBQUN0QixDQUFDO0FBRUQsU0FBUyxVQUFVO0lBQ2YsTUFBTSxRQUFRLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3BDLElBQUksTUFBTSxHQUFHLENBQUMsSUFBSSxNQUFNLEdBQUcsWUFBWSxHQUFHLENBQUMsRUFBRSxDQUFDO1FBQzFDLGNBQUssQ0FBQyxlQUFlLENBQUMsaUNBQWlDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLGNBQWMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7SUFDbEksQ0FBQztJQUNELElBQUksU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2hDLGNBQUssQ0FBQyxlQUFlLENBQUMsOEJBQThCLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLGNBQWMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7SUFDL0gsQ0FBQztJQUNELFVBQVUsR0FBRyxJQUFJLENBQUM7SUFDbEIsd0JBQU0sQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDMUIsZUFBZSxFQUFFLENBQUM7QUFDdEIsQ0FBQztBQUVELFNBQVMsZUFBZTtJQUNwQixJQUFJLFFBQVEsRUFBRSxDQUFDO1FBQ1gsSUFBSSxVQUFVLEVBQUUsQ0FBQztZQUNiLElBQUksVUFBVSxDQUFDLE1BQU0sQ0FBQyxLQUFLLFNBQVMsRUFBRSxDQUFDO2dCQUNuQyx1QkFBSyxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUN2QyxDQUFDO2lCQUFNLENBQUM7Z0JBQ0osdUJBQUssQ0FBQyxjQUFjLENBQUMsMkJBQTJCLENBQUMsQ0FBQztZQUN0RCxDQUFDO1FBQ0wsQ0FBQzthQUFNLENBQUM7WUFDSix1QkFBSyxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUN2QyxDQUFDO0lBQ0wsQ0FBQztTQUFNLENBQUM7UUFDSixJQUFJLFVBQVUsRUFBRSxDQUFDO1lBQ2IsdUJBQUssQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDckMsQ0FBQzthQUFNLENBQUM7WUFDSix1QkFBSyxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUN4QyxDQUFDO0lBQ0wsQ0FBQztBQUNMLENBQUM7QUFLRCxTQUFTLElBQUk7SUFDVCxNQUFNLFFBQVEsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDcEMsSUFBSSxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsSUFBSSxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxJQUFJLGlCQUFRLEVBQUUsQ0FBQztRQUN4RixXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdEIsT0FBTztJQUNYLENBQUM7SUFDRCxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDckIsT0FBTztBQUNYLENBQUM7QUFDRCxTQUFTLFdBQVcsQ0FBQyxRQUFnQjtJQUNqQyxNQUFNLEdBQUcsR0FBRyxJQUFJLG1CQUFRLEVBQUUsQ0FBQztJQUMzQixHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztJQUN4QixHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBSSxvQkFBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2xDLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFJLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztJQUN6RCwrQkFBa0IsRUFBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3pELE9BQU87QUFDWCxDQUFDO0FBRUQsU0FBUyxVQUFVLENBQUMsUUFBZ0I7SUFDaEMsb0JBQVcsQ0FBQyxHQUFHLEdBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFNBQVMsQ0FBQztJQUVoRCxrQ0FBWSxFQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFXLEVBQUMsRUFBRTtRQUMxRCxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ25CLFVBQVUsQ0FBQyxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsSUFBSSxDQUFDLENBQUM7UUFDMUIsdUJBQUssQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDaEMsaUJBQWlCLEVBQUUsQ0FBQztJQUN4QixDQUFDLENBQUMsQ0FBQztBQUNQLENBQUM7QUFFRCxTQUFlLElBQUk7O1FBQ2YsTUFBTSxRQUFRLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3BDLFVBQVUsQ0FDVyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxFQUMzQixTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxFQUMzQixTQUFTLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLEVBQy9DLFdBQVcsQ0FBQyxLQUFLLEVBRXRCLElBQUksd0JBQU0sQ0FBQyxRQUFRLEVBQUUsSUFBSTtjQUN2QixNQUFNLHdCQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSztjQUNoQyxPQUFPLHdCQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxRQUFRLHdCQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQ2pELEtBQUssQ0FDekIsQ0FBQztRQUNGLGtDQUFZLEdBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLEVBQUMsRUFBRTtZQUMzQixVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFcEIsVUFBVSxHQUFHLEtBQUssQ0FBQztZQUNuQix1QkFBSyxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUMvQixpQkFBaUIsRUFBRSxDQUFDO1FBQ3hCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUFBO0FBRUQsU0FBZ0IsVUFBVSxDQUFDLE9BQVk7O0lBRW5DLElBQUksT0FBTyxLQUFLLFNBQVM7UUFBRSxPQUFPO0lBQ2xDLGVBQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdkIsZUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsaUJBQVEsQ0FBQyxDQUFDO0lBRy9CLHdCQUFNLENBQUMsTUFBTSxDQUFDLGVBQU0sQ0FBQyxRQUFRLENBQUMscUJBQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLG1DQUFFLEVBQUUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7SUFDaEUsd0JBQU0sQ0FBQyxPQUFPLENBQUMsZUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRzdCLE1BQU0sR0FBRyxHQUFHLHdCQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDN0IsSUFBSSxHQUFHLENBQUMsUUFBUSxFQUFFLElBQUksbUJBQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNoQyx3QkFBTSxDQUFDLE1BQU0sQ0FBQyxlQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUdELEtBQUssTUFBTSxDQUFDLElBQUksd0JBQU07UUFBRSxPQUFPLHdCQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDekMsS0FBSyxNQUFNLElBQUksSUFBSSx3QkFBTSxDQUFDLElBQUksRUFBRTtRQUFHLHdCQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBR3JELHdCQUFNLENBQUMsT0FBTyxDQUFDLHdCQUFtQixDQUFDLENBQUM7QUFDeEMsQ0FBQztBQUdELFNBQWdCLFdBQVcsQ0FBQyxPQUFZOztJQUVwQyxJQUFJLFFBQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxJQUFJLE1BQUssU0FBUztRQUFFLHdCQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUc3RCxJQUFJLFFBQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxHQUFHLE1BQUssU0FBUyxFQUFFLENBQUM7UUFDN0IsSUFBSSxHQUFHLEdBQUcsSUFBSSx1QkFBVSxDQUFDO1lBQ3JCLENBQUMsRUFBRSxhQUFPLENBQUMsR0FBRywwQ0FBRSxDQUFDO1lBQ2pCLENBQUMsRUFBRSxhQUFPLENBQUMsR0FBRywwQ0FBRSxDQUFDO1lBQ2pCLENBQUMsRUFBRSxhQUFPLENBQUMsR0FBRywwQ0FBRSxDQUFDO1lBQ2pCLENBQUMsRUFBRSxhQUFPLENBQUMsR0FBRywwQ0FBRSxDQUFDO1NBQ3BCLENBQUMsQ0FBQztRQUNILHdCQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsU0FBUyxDQUFDLHdCQUFNLEVBQUUsaUJBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUMvQyxlQUFNLENBQUMsS0FBSyxHQUFHLHdCQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDcEMsQ0FBQztJQUdELEtBQUssTUFBTSxDQUFDLElBQUksd0JBQU07UUFBRSxPQUFPLHdCQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDekMsS0FBSyxNQUFNLElBQUksSUFBSSx3QkFBTSxDQUFDLElBQUksRUFBRTtRQUFFLHdCQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBR3BELHdCQUFNLENBQUMsT0FBTyxDQUFDLHdCQUFtQixDQUFDLENBQUM7SUFHcEMsZUFBTSxDQUFDLEtBQUssR0FBRyx3QkFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2hDLGVBQU0sQ0FBQyxRQUFRLENBQUMsd0JBQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLHdCQUFNLENBQUM7SUFDdkMsZUFBTSxDQUFDLFFBQVEsQ0FBQyx3QkFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsd0JBQU0sQ0FBQztBQUMzQyxDQUFDO0FBRUQsU0FBZ0IsVUFBVSxDQUNsQixPQUFpQixFQUNqQixPQUFpQixFQUNqQixLQUFpQixFQUNqQixNQUFpQixFQUNqQixLQUFpQixFQUNqQixTQUFrQjtJQUVsQixlQUFNLENBQUMsS0FBSyxHQUFHLHdCQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7SUFFaEMsZUFBTSxDQUFDLFFBQVEsQ0FBQyx3QkFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsd0JBQU0sQ0FBQztJQUN2QyxlQUFNLENBQUMsUUFBUSxDQUFDLHdCQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyx3QkFBTSxDQUFDO0lBRXZDLGVBQU0sQ0FBQyxNQUFNLENBQUM7UUFDVixPQUFPLEVBQUksT0FBTztRQUNsQixTQUFTLEVBQUUsb0JBQVcsQ0FBQyxHQUFHO1FBQzFCLE9BQU8sRUFBSSxPQUFPO1FBQ2xCLEtBQUssRUFBTSxLQUFLO1FBQ2hCLE1BQU0sRUFBSyxNQUFNO1FBQ2pCLEtBQUssRUFBTSxLQUFLO1FBQ2hCLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRztRQUNoQyxTQUFTLEVBQUUsR0FBRztRQUNkLFNBQVMsRUFBRSxHQUFHO0tBT2pCLENBQUMsQ0FBQztBQUNYLENBQUM7Ozs7Ozs7Ozs7Ozs7O0FDamhCRCw4Q0FlQztBQUNELHNEQU1DO0FBeUJELGtEQVFDO0FBRUQsc0RBY0M7QUFFRCwwQ0EwQkM7QUF0SlksbUJBQVcsR0FBaUIsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFpQixDQUFDO0FBRXRFLCtHQUFpRTtBQUNqRSwrR0FBdUU7QUFDNUQsWUFBSSxHQUFnQixFQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUMsQ0FBQztBQUUvRSxtR0FBdUQ7QUFHdkQsK0hBQXNFO0FBS3pELGNBQU0sR0FBYSxFQUFFLENBQUM7QUFFbkMscUZBQXlDO0FBQzVCLGNBQU0sR0FBRyxJQUFJLGVBQU0sRUFBRSxDQUFDO0FBRW5DLHFGQUF5QztBQUM1QixjQUFNLEdBQUcsSUFBSSxlQUFNLEVBQUUsQ0FBQztBQUVuQyx3RkFBMkM7QUFDOUIsY0FBTSxHQUFHLElBQUksaUJBQU8sRUFBRSxDQUFDO0FBR3BDLHNHQUEyRDtBQUczRCw2RkFBd0Q7QUFDeEQsNEdBQTZEO0FBQzdELDRHQUF1RTtBQUV2RSxnSEFLa0M7QUFFbEMscUZBT3lCO0FBQ3pCLHFGQUF5QztBQUN6Qyw4RkFBK0M7QUFFL0MsU0FBZ0IsaUJBQWlCO0lBQzdCLFFBQVEsb0JBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN2QixLQUFLLEtBQUs7WUFDTixxQkFBcUIsRUFBRSxDQUFDO1lBQ3hCLE9BQU87UUFDWCxLQUFLLE1BQU07WUFDUCxzQkFBc0IsRUFBRSxDQUFDO1lBQ3pCLE9BQU87UUFDWCxLQUFLLE9BQU87WUFDUix1QkFBdUIsRUFBRSxDQUFDO1lBQzFCLE9BQU87UUFDWCxLQUFLLE1BQU07WUFDUCxzQkFBc0IsRUFBRSxDQUFDO1lBQ3pCLE9BQU87SUFDZixDQUFDO0FBQ0wsQ0FBQztBQUNELFNBQWdCLHFCQUFxQjtJQUNqQyxrQ0FBWSxHQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBVyxFQUFDLEVBQUU7UUFDL0IsZ0NBQVUsRUFBQyxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsSUFBSSxDQUFDLENBQUM7UUFDMUIsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2hCLG1CQUFtQixDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzVCLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQUNELFNBQVMsc0JBQXNCO0lBQzNCLE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxvQkFBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3BDLGtDQUFZLEVBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBVyxFQUFDLEVBQUU7UUFDbEMsZ0NBQVUsRUFBQyxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsSUFBSSxDQUFDLENBQUM7UUFDMUIsbUJBQW1CLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDbkMsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBQ0QsU0FBUyx1QkFBdUI7SUFDNUIsTUFBTSxTQUFTLEdBQUcsb0JBQVcsQ0FBQyxHQUFHLENBQUM7SUFDbEMsOEJBQVEsR0FBRSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQVcsRUFBQyxFQUFFO1FBQzNCLGdDQUFVLEVBQUMsT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLElBQUksQ0FBQyxDQUFDO1FBQzFCLGtDQUFZLEVBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBVyxFQUFDLEVBQUU7WUFDeEMsaUNBQVcsRUFBQyxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsSUFBSSxDQUFDLENBQUM7WUFDM0IsbUJBQW1CLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDdEMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUM7QUFDRCxTQUFTLHNCQUFzQjtJQUMzQiw4QkFBUSxHQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBVyxFQUFDLEVBQUU7UUFDM0IsZ0NBQVUsRUFBQyxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsSUFBSSxDQUFDLENBQUM7UUFDMUIsbUJBQW1CLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDeEMsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBRUQsU0FBZ0IsbUJBQW1CLENBQUMsR0FBVztJQUMzQyxrQ0FBVyxHQUFFLENBQUM7SUFDZCxZQUFJLEdBQUcsa0NBQVcsR0FBRSxDQUFDO0lBRXJCLGFBQUssQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDMUIsY0FBSyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMxQixtQ0FBYSxHQUFFLENBQUM7SUFDaEIseUNBQW1CLEVBQUMsV0FBVyxDQUFDLENBQUM7QUFDckMsQ0FBQztBQUVELFNBQWdCLHFCQUFxQjtJQUNqQyw0Q0FBK0IsRUFBQyxZQUFZLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztJQUVoRSxhQUFLLEdBQUksMkNBQW9CLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2xELGFBQUssR0FBSSwyQ0FBb0IsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDbEQsY0FBTSxHQUFHLDZCQUFhLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDaEMsYUFBSyxHQUFJLDJCQUFZLENBQUMsTUFBTSxFQUFFLENBQUM7SUFFL0IsZUFBZSxFQUFFLENBQUM7SUFDbEIsaUJBQWlCLEVBQUUsQ0FBQztJQUVwQiw4QkFBYSxHQUFFLENBQUM7SUFDaEIsc0JBQWEsQ0FBQyxXQUFXLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUM3QyxzQkFBYSxDQUFDLFlBQVksRUFBRSxDQUFDO0FBQ2pDLENBQUM7QUFFRCxTQUFnQixlQUFlO0lBQzNCLElBQUksQ0FBQztRQUNELE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDcEQsS0FBSyxhQUFMLEtBQUssdUJBQUwsS0FBSyxDQUFFLEtBQUssQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzVDLEtBQUssYUFBTCxLQUFLLHVCQUFMLEtBQUssQ0FBRSxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUMsQ0FBQyxLQUFnQixFQUFDLEVBQUU7WUFDaEQsSUFBRyxDQUFDO2dCQUFBLGdCQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7WUFBQSxDQUFDO1lBQUMsT0FBTSxHQUFHLEVBQUMsQ0FBQyxFQUFDO1lBQUEsQ0FBQztRQUN0QyxDQUFDLENBQUMsQ0FBQztRQUVILGdCQUFPLENBQUMsTUFBTSxDQUFDO1lBQ1gsRUFBRSxFQUFTLEtBQUs7WUFDaEIsTUFBTSxFQUFJLE9BQU87WUFDakIsT0FBTyxFQUFHLElBQUk7WUFDZCxPQUFPLEVBQUcsT0FBTztZQUNqQixRQUFRLEVBQUUsUUFBUTtTQUNyQixDQUFDLENBQUM7UUFDSCxnQkFBTyxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBRWxDLE1BQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFzQixDQUFDO1FBQ3ZFLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUMsQ0FBQyxLQUFLLEVBQUMsRUFBRTtZQUN2QyxRQUFRLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDakIsS0FBSyxnQkFBZ0IsQ0FBQztnQkFDdEIsS0FBSyxRQUFRO29CQUNULEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNwQixDQUFDO1FBQ0wsQ0FBQyxDQUFDO0lBQ04sQ0FBQztJQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFBQSxPQUFNO0lBQUEsQ0FBQztJQUFBLENBQUM7QUFDM0IsQ0FBQztBQUVELFNBQVMsaUJBQWlCLENBQUMsRUFBVztJQUNsQyxxQ0FBYyxHQUFFLENBQUM7SUFFakIsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNwRCxNQUFNLE9BQU8sR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO0lBQ3RDLEtBQUssYUFBTCxLQUFLLHVCQUFMLEtBQUssQ0FBRSxLQUFLLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUVqRCxDQUFDO0FBR0QsU0FBUyxpQkFBaUI7SUFDdEIsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsRUFBQyxDQUFDLEdBQWUsRUFBRSxFQUFFLEdBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxDQUFDLEVBQUMsQ0FBQztBQUNuRixDQUFDO0FBR0QsU0FBUyxZQUFZLENBQUMsTUFBYyxDQUFDO0lBQ2pDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztRQUMzQixNQUFNLENBQUMsR0FBRyxtQkFBTSxFQUFDLENBQUMsRUFBRSxDQUFDLGNBQU0sQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzFELE1BQU0sQ0FBQyxHQUFHLG1CQUFNLEVBQUMsQ0FBQyxFQUFFLENBQUMsY0FBTSxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDMUQsTUFBTSxHQUFHLEdBQUcscUJBQVMsQ0FBQyxNQUFNLENBQUM7WUFDekIsR0FBRyxFQUFLLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxFQUFFLENBQUMsRUFBQyxDQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsRUFBQztZQUM1QixJQUFJLEVBQUU7Z0JBQ0YsS0FBSyxFQUFJLENBQUM7Z0JBQ1YsTUFBTSxFQUFFLEdBQUc7YUFDZDtTQUNKLENBQUMsQ0FBQztRQUNILGNBQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDeEIsQ0FBQztBQUNMLENBQUM7Ozs7Ozs7VUNyTEQ7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7Ozs7Ozs7O0FDbEJBLDRHQUEwRDtBQUUxRCxNQUFNLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUU7SUFDeEMsMkNBQXFCLEdBQUUsQ0FBQztBQUM1QixDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL21haS8uL3NyYy9kX2Ntbi9DX0FsZXJ0TG9nLnRzIiwid2VicGFjazovL21haS8uL3NyYy9kX2Ntbi9DX0RpYWxvZy50cyIsIndlYnBhY2s6Ly9tYWkvLi9zcmMvZF9jbW4vRl9QT1NULnRzIiwid2VicGFjazovL21haS8uL3NyYy9kX2Ntbi9GX2xvYWRfYW5kX3NhdmUudHMiLCJ3ZWJwYWNrOi8vbWFpLy4vc3JjL2RfY21uL2dsb2JhbC50cyIsIndlYnBhY2s6Ly9tYWkvLi9zcmMvZF9jdGwvQ19DdGxDdXJzb3IudHMiLCJ3ZWJwYWNrOi8vbWFpLy4vc3JjL2RfY3RsL0NfT25PZmZCdXR0b24udHMiLCJ3ZWJwYWNrOi8vbWFpLy4vc3JjL2RfbWRsL0NfR3VpbGQudHMiLCJ3ZWJwYWNrOi8vbWFpLy4vc3JjL2RfbWRsL0NfSGVyby50cyIsIndlYnBhY2s6Ly9tYWkvLi9zcmMvZF9tZGwvQ19IZXJvQWJpbGl0eS50cyIsIndlYnBhY2s6Ly9tYWkvLi9zcmMvZF9tZGwvQ19Mb2NhdGlvbi50cyIsIndlYnBhY2s6Ly9tYWkvLi9zcmMvZF9tZGwvQ19NYXplLnRzIiwid2VicGFjazovL21haS8uL3NyYy9kX21kbC9DX01hemVDZWxsLnRzIiwid2VicGFjazovL21haS8uL3NyYy9kX21kbC9DX01hemVJbmZvLnRzIiwid2VicGFjazovL21haS8uL3NyYy9kX21kbC9DX01hemVPYmoudHMiLCJ3ZWJwYWNrOi8vbWFpLy4vc3JjL2RfbWRsL0NfTWF6ZU9ialZpZXcudHMiLCJ3ZWJwYWNrOi8vbWFpLy4vc3JjL2RfbWRsL0NfTW92YWJsZVBvaW50LnRzIiwid2VicGFjazovL21haS8uL3NyYy9kX21kbC9DX1BvaW50LnRzIiwid2VicGFjazovL21haS8uL3NyYy9kX21kbC9DX1BvaW50RGlyLnRzIiwid2VicGFjazovL21haS8uL3NyYy9kX21kbC9DX1BvaW50U2V0MkQudHMiLCJ3ZWJwYWNrOi8vbWFpLy4vc3JjL2RfbWRsL0NfUmFuZ2UudHMiLCJ3ZWJwYWNrOi8vbWFpLy4vc3JjL2RfbWRsL0NfU2F2ZURhdGEudHMiLCJ3ZWJwYWNrOi8vbWFpLy4vc3JjL2RfbWRsL0NfU2F2ZUluZm8udHMiLCJ3ZWJwYWNrOi8vbWFpLy4vc3JjL2RfbWRsL0NfVGVhbS50cyIsIndlYnBhY2s6Ly9tYWkvLi9zcmMvZF9tZGwvQ19UZWFtVmlldy50cyIsIndlYnBhY2s6Ly9tYWkvLi9zcmMvZF9tZGwvQ19XYWxrZXIudHMiLCJ3ZWJwYWNrOi8vbWFpLy4vc3JjL2RfbWRsL0NfV2FsbC50cyIsIndlYnBhY2s6Ly9tYWkvLi9zcmMvZF9tZGwvVF9EaXJlY3Rpb24udHMiLCJ3ZWJwYWNrOi8vbWFpLy4vc3JjL2RfbWRsL1RfTXpLaW5kLnRzIiwid2VicGFjazovL21haS8uL3NyYy9kX3V0bC9DX1VybE9wdC50cyIsIndlYnBhY2s6Ly9tYWkvLi9zcmMvZF91dGwvRl9NYXRoLnRzIiwid2VicGFjazovL21haS8uL3NyYy9kX3V0bC9GX1JhbmQudHMiLCJ3ZWJwYWNrOi8vbWFpLy4vc3JjL2RfdmllL0NfRGlzcGxheU1lc3NhZ2UudHMiLCJ3ZWJwYWNrOi8vbWFpLy4vc3JjL2RfdmllL0NfT25lTGluZVZpZXdNZXNzYWdlLnRzIiwid2VicGFjazovL21haS8uL3NyYy9tYWlfbWF6ZS9DX0RlZmF1bHRDdGxzLnRzIiwid2VicGFjazovL21haS8uL3NyYy9tYWlfbWF6ZS9DX1N3aXRjaFZpZXcudHMiLCJ3ZWJwYWNrOi8vbWFpLy4vc3JjL21haV9tYXplL0ZfZGlzcGxheV9tYXplM0QudHMiLCJ3ZWJwYWNrOi8vbWFpLy4vc3JjL21haV9tYXplL0ZfZGlzcGxheV9tYXplQ2gudHMiLCJ3ZWJwYWNrOi8vbWFpLy4vc3JjL21haV9tYXplL0Zfc2V0X1VEX21vZGUudHMiLCJ3ZWJwYWNrOi8vbWFpLy4vc3JjL21haV9tYXplL0Zfc2V0X21lbnVfbW9kZS50cyIsIndlYnBhY2s6Ly9tYWkvLi9zcmMvbWFpX21hemUvRl9zZXRfbW9kZS50cyIsIndlYnBhY2s6Ly9tYWkvLi9zcmMvbWFpX21hemUvRl9zZXRfbW92ZV9tb2RlLnRzIiwid2VicGFjazovL21haS8uL3NyYy9tYWlfbWF6ZS9GX3NldF9tdnB0X21vZGUudHMiLCJ3ZWJwYWNrOi8vbWFpLy4vc3JjL21haV9tYXplL0Zfc2V0X3NhdmVfbW9kZS50cyIsIndlYnBhY2s6Ly9tYWkvLi9zcmMvbWFpX21hemUvZ2xvYmFsX2Zvcl9tYXplLnRzIiwid2VicGFjazovL21haS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9tYWkvLi9zcmMvbWFpX21hemUvbWFpX21hemUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgX2dldF91dWlkIH0gZnJvbSBcIi4uL2RfdXRsL0ZfUmFuZFwiO1xyXG5pbXBvcnQgeyBDX0RpYWxvZyB9ICBmcm9tIFwiLi9DX0RpYWxvZ1wiO1xyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBDX0FsZXJ0TG9nIGV4dGVuZHMgQ19EaWFsb2cge1xyXG4gICAgcHJvdGVjdGVkIHN0YXRpYyBtZToge1tpZDogc3RyaW5nXTogQ19BbGVydExvZ307XHJcbiAgICBwdWJsaWMgICAgc3RhdGljIGdldE9iaih0YXJnZXQ/OiBIVE1MRGlhbG9nRWxlbWVudCkge1xyXG4gICAgICAgIHRoaXMubWUgPz89IHt9O1xyXG4gICAgICAgIGlmICh0YXJnZXQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0YXJnZXQgICAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaWFsb2cnKSBhcyBIVE1MRGlhbG9nRWxlbWVudDtcclxuICAgICAgICAgICAgdGFyZ2V0LmlkID0gJ2RpYWxvZ18nICsgX2dldF91dWlkKCk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGFyZ2V0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLm1lW3RhcmdldC5pZF0gPz89IG5ldyBDX0FsZXJ0TG9nKHRhcmdldCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG1zZzoge1t0dGw6IHN0cmluZ106IHN0cmluZ1tdfTtcclxuXHJcbiAgICBwcm90ZWN0ZWQgcGFuZTogSFRNTERpdkVsZW1lbnR8dW5kZWZpbmVkO1xyXG4gICAgcHJvdGVjdGVkIGxvZ3M6IEhUTUxEaXZFbGVtZW50fHVuZGVmaW5lZDtcclxuICAgIHByb3RlY3RlZCBidG5zOiBIVE1MRGl2RWxlbWVudHx1bmRlZmluZWQ7XHJcbiAgICBwcm90ZWN0ZWQgdXBkOiAgSFRNTEJ1dHRvbkVsZW1lbnR8dW5kZWZpbmVkO1xyXG4gICAgcHJvdGVjdGVkIGNscjogIEhUTUxCdXR0b25FbGVtZW50fHVuZGVmaW5lZDtcclxuICAgIHByb3RlY3RlZCBjbHM6ICBIVE1MQnV0dG9uRWxlbWVudHx1bmRlZmluZWQ7XHJcblxyXG4gICAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKHRhcmdldDogSFRNTERpYWxvZ0VsZW1lbnQpIHtcclxuICAgICAgICBzdXBlcih0YXJnZXQpO1xyXG4gICAgICAgIHRoaXMubXNnID0ge307XHJcblxyXG4gICAgICAgIHRoaXMuX19jbGVhckRpYWxvZygpO1xyXG4gICAgICAgIHRoaXMuX19tYWtlRGlhbG9nKCk7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgX19jbGVhckRpYWxvZygpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBjdHggPSBzdXBlci5nZXRXaW5kb3coKTtcclxuICAgICAgICB3aGlsZSAoY3R4LmZpcnN0Q2hpbGQpIGN0eC5yZW1vdmVDaGlsZChjdHguZmlyc3RDaGlsZCk7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgX19tYWtlRGlhbG9nKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGN0eCA9IHN1cGVyLmdldFdpbmRvdygpO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFuZSA9IHRoaXMuX19tYWtlV2luZG93ICgncGFuZScpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5sb2dzID0gdGhpcy5fX21ha2VQYW5lbCAoJ2xvZ3MnLCAgIHRoaXMucGFuZSk7XHJcbiAgICAgICAgICAgIHRoaXMuYnRucyA9IHRoaXMuX19tYWtlUGFuZWwgKCdidG5zJywgICB0aGlzLnBhbmUpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy51cGQgID0gdGhpcy5fX21ha2VCdXR0b24oJ3VwZGF0ZScsICfmm7TmlrAnLCAgIHRoaXMuYnRucyk7XHJcbiAgICAgICAgICAgIHRoaXMuY2xyICA9IHRoaXMuX19tYWtlQnV0dG9uKCdjbGVhcicsICAn5raI5Y67JywgICB0aGlzLmJ0bnMpO1xyXG4gICAgICAgICAgICB0aGlzLmNscyAgPSB0aGlzLl9fbWFrZUJ1dHRvbignY2xvc2UnLCAgJ+mWieOBmOOCiycsIHRoaXMuYnRucyk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnVwZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT57dGhpcy51cGRhdGUoKX0sIGZhbHNlKTtcclxuICAgICAgICAgICAgdGhpcy5jbHIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+e3RoaXMuY2xlYXIgKCl9LCBmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoaXMuY2xzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCk9Pnt0aGlzLmhpZGUgICgpfSwgZmFsc2UpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5sb2dzLnN0eWxlLnNldFByb3BlcnR5KCd1c2VyLXNlbGVjdCcsICd0ZXh0Jyk7XHJcbiAgICAgICAgICAgIHRoaXMubG9ncy5zdHlsZS5zZXRQcm9wZXJ0eSgnbWF4LXdpZHRoJywgICAnOTBkdncnKTtcclxuICAgICAgICAgICAgdGhpcy5sb2dzLnN0eWxlLnNldFByb3BlcnR5KCdtaW4taGVpZ2h0JywgICczLjByZW0nKTtcclxuICAgICAgICAgICAgdGhpcy5sb2dzLnN0eWxlLnNldFByb3BlcnR5KCdtYXgtaGVpZ2h0JywgICc4MGR2aCcpO1xyXG4gICAgICAgICAgICB0aGlzLmxvZ3Muc3R5bGUuc2V0UHJvcGVydHkoJ292ZXJmbG93LXgnLCAgJ2F1dG8nKTtcclxuICAgICAgICAgICAgdGhpcy5sb2dzLnN0eWxlLnNldFByb3BlcnR5KCdvdmVyZmxvdy15JywgICdhdXRvJyk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0Wm9vbUVsbSh0aGlzLmxvZ3MpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge31cclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBfX21ha2VXaW5kb3coaWQ6IHN0cmluZyk6IEhUTUxEaXZFbGVtZW50IHtcclxuICAgICAgICBjb25zdCBkaXYgID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JykgYXMgSFRNTERpdkVsZW1lbnQ7XHJcbiAgICAgICAgZGl2LmlkICAgICA9IGAke3RoaXMuaWR9XyR7aWR9YDtcclxuICAgICAgICB0aGlzLnNldFdpbmRvdyhkaXYpO1xyXG4gICAgICAgIHJldHVybiBkaXY7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgX19tYWtlUGFuZWwoaWQ6IHN0cmluZywgcGFyZW50OiBIVE1MRWxlbWVudCk6IEhUTUxEaXZFbGVtZW50IHtcclxuICAgICAgICBjb25zdCBkaXYgID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JykgYXMgSFRNTERpdkVsZW1lbnQ7XHJcbiAgICAgICAgZGl2LmlkICAgICA9IGAke3RoaXMuaWR9XyR7aWR9YDtcclxuICAgICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQoZGl2KTtcclxuICAgICAgICByZXR1cm4gZGl2O1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIF9fbWFrZUJ1dHRvbihpZDogc3RyaW5nLCBuYW1lOiBzdHJpbmcsIHBhcmVudDogSFRNTEVsZW1lbnQpOiBIVE1MQnV0dG9uRWxlbWVudCB7XHJcbiAgICAgICAgY29uc3QgYnRuICA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpIGFzIEhUTUxCdXR0b25FbGVtZW50O1xyXG4gICAgICAgIGJ0bi5pZCAgICAgICAgID0gYCR7dGhpcy5pZH1fJHtpZH1gO1xyXG4gICAgICAgIGJ0bi5pbm5lckhUTUwgID0gbmFtZTtcclxuICAgICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQoYnRuKTtcclxuICAgICAgICByZXR1cm4gYnRuO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRfbWVzc2FnZSh0dGw6IHN0cmluZywgbXNnOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICAodGhpcy5tc2dbdHRsXSA/Pz0gW10pLnB1c2gobXNnKTtcclxuICAgICAgICB0aGlzLl9fZG9tX3VwZGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjbHJfbWVzc2FnZSh0dGw/OiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICBpZiAodHRsICE9PSB1bmRlZmluZWQpIHt0aGlzLm1zZ1t0dGxdID0gW107cmV0dXJuO31cclxuICAgICAgICBmb3IgKGNvbnN0IGlpIGluIHRoaXMubXNnKSB0aGlzLm1zZ1tpaV0gPSBbXTtcclxuICAgICAgICB0aGlzLl9fZG9tX2NsZWFyKCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7dGhpcy5fX2RvbV91cGRhdGUoKX1cclxuICAgIHByb3RlY3RlZCBfX2RvbV91cGRhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fX2RvbV9jbGVhcigpO1xyXG4gICAgICAgIGZvciAoY29uc3QgdGl0bGUgaW4gdGhpcy5tc2cpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgbXNnIG9mIHRoaXMubXNnW3RpdGxlXSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmaWVsZHNldCcpIGFzIEhUTUxGaWVsZFNldEVsZW1lbnQ7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgbGcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsZWdlbmQnKSAgIGFzIEhUTUxMZWdlbmRFbGVtZW50O1xyXG4gICAgICAgICAgICAgICAgbGcuaW5uZXJIVE1MID0gYCR7dGl0bGV9ICgke0RhdGUubm93KCkudG9TdHJpbmcoKX0pYDtcclxuICAgICAgICAgICAgICAgIGZzLmFwcGVuZENoaWxkKGxnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBwciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ByZScpICAgICAgYXMgSFRNTFByZUVsZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICBmcy5hcHBlbmRDaGlsZChwcik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBjb25zdCBwZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKSAgICBhcyBIVE1MUGFyYWdyYXBoRWxlbWVudDtcclxuICAgICAgICAgICAgICAgIHBnLmlubmVySFRNTCA9IG1zZztcclxuICAgICAgICAgICAgICAgIHByLmFwcGVuZENoaWxkKHBnKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ3M/LmFwcGVuZENoaWxkKGZzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xlYXIoKTogdm9pZCB7dGhpcy5jbHJfbWVzc2FnZSgpfVxyXG4gICAgcHJvdGVjdGVkIF9fZG9tX2NsZWFyKCk6IHZvaWQge1xyXG4gICAgICAgIHdoaWxlICh0aGlzLmxvZ3M/LmZpcnN0Q2hpbGQpIHRoaXMubG9ncy5yZW1vdmVDaGlsZCh0aGlzLmxvZ3MuZmlyc3RDaGlsZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNob3coKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcclxuICAgICAgICB0cnkge3N1cGVyLnNob3coKTt9IGNhdGNoIChlcnIpIHt9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgaGlkZSgpOiB2b2lkIHtcclxuICAgICAgICB0cnkge3N1cGVyLmhpZGUoKTt9IGNhdGNoIChlcnIpIHt9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZGlzcGxheSh5bjogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgICAgIHluP3RoaXMuc2hvdygpOnRoaXMuaGlkZSgpO1xyXG4gICAgfVxyXG59XHJcblxyXG4iLCJpbXBvcnQgeyBfZ2V0TnVtIH0gZnJvbSBcIi4uL2RfdXRsL0ZfTWF0aFwiO1xyXG5pbXBvcnQgeyBfZ2V0X3V1aWQgfSBmcm9tIFwiLi4vZF91dGwvRl9SYW5kXCI7XHJcbnR5cGUgeHkgPSB7eDogbnVtYmVyLCB5OiBudW1iZXJ9O1xyXG5cclxuZXhwb3J0IGNsYXNzIENfRGlhbG9nIHtcclxuICAgIHByb3RlY3RlZCBpZDogIHN0cmluZztcclxuICAgIHByaXZhdGUgICBfX2RpYTogSFRNTERpYWxvZ0VsZW1lbnQ7XHJcbiAgICBwcml2YXRlICAgX19wYW46IEhUTUxEaXZFbGVtZW50O1xyXG4gICAgcHJpdmF0ZSAgIF9fY3R4OiBIVE1MRGl2RWxlbWVudDtcclxuICAgIHByaXZhdGUgICBfX21vcDogeHkgPSB7eDowLCB5OjB9O1xyXG4gICAgcHJpdmF0ZSAgIF9fcnN6OiB7W2lkOiBzdHJpbmddOiByZXNpemVEb219O1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcih0YXJnZXQ/OiBIVE1MRGlhbG9nRWxlbWVudCkge1xyXG4gICAgICAgIGlmICh0YXJnZXQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0YXJnZXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaWFsb2cnKSBhcyBIVE1MRGlhbG9nRWxlbWVudDtcclxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0YXJnZXQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGFyZ2V0LmlkID09PSB1bmRlZmluZWQgfHwgdGFyZ2V0LmlkID09PSAnJykgdGFyZ2V0LmlkID0gJ2RpYWxvZ18nICsgX2dldF91dWlkKCk7XHJcbiAgICAgICAgdGhpcy5pZCA9IHRhcmdldC5pZDtcclxuXHJcbiAgICAgICAgdGFyZ2V0LnN0eWxlLm1hcmdpbiAgPSAnMCc7XHJcbiAgICAgICAgdGFyZ2V0LnN0eWxlLnBhZGRpbmcgPSAnMCc7XHJcbiAgICAgICAgdGhpcy5fX2RpYSA9IHRhcmdldDtcclxuXHJcbiAgICAgICAgdGhpcy5fX3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpIGFzIEhUTUxEaXZFbGVtZW50O1xyXG4gICAgICAgIHRoaXMuX19zZXRfZGlhbG9nX3N0eWxlKCk7XHJcblxyXG5cclxuICAgICAgICB0aGlzLl9fY3R4ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JykgYXMgSFRNTERpdkVsZW1lbnQ7XHJcbiAgICAgICAgdGhpcy5fX2N0eC5zdHlsZS5ncmlkQXJlYSA9ICdtbSc7XHJcbiAgICAgICAgdGhpcy5fX3Bhbi5hcHBlbmRDaGlsZCh0aGlzLl9fY3R4KTtcclxuXHJcbiAgICAgICAgdGhpcy5fX3JzeiA9IHt9O1xyXG5cclxuICAgICAgICB0aGlzLl9fc2V0X2Jhcl9zdHlsZSgndG0nKTtcclxuICAgICAgICB0aGlzLl9fc2V0X2Jhcl9zdHlsZSgnbWwnKTtcclxuICAgICAgICB0aGlzLl9fc2V0X2Jhcl9zdHlsZSgnbXInKTtcclxuICAgICAgICB0aGlzLl9fc2V0X2Jhcl9zdHlsZSgnYm0nKTtcclxuXHJcbiAgICAgICAgdGhpcy5fX3NldF9jb3JuZXJfc3R5bGUoJ3RsJyk7XHJcbiAgICAgICAgdGhpcy5fX3NldF9jb3JuZXJfc3R5bGUoJ3RyJyk7XHJcbiAgICAgICAgdGhpcy5fX3NldF9jb3JuZXJfc3R5bGUoJ2JsJyk7XHJcbiAgICAgICAgdGhpcy5fX3NldF9jb3JuZXJfc3R5bGUoJ2JyJyk7XHJcblxyXG5cclxuICAgICAgICB0aGlzLl9fZGlhLmFwcGVuZENoaWxkKHRoaXMuX19wYW4pO1xyXG4gICAgfSBcclxuICAgIHByaXZhdGUgX19zZXRfZGlhbG9nX3N0eWxlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX19kaWEuc3R5bGUuYm9yZGVyICAgICAgID0gJ25vbmUnO1xyXG4gICAgICAgIHRoaXMuX19kaWEuc3R5bGUuYm9yZGVyUmFkaXVzID0gJzEwcHgnO1xyXG4gICAgICAgIHRoaXMuX19kaWEuc3R5bGUudXNlclNlbGVjdCAgID0gJ2F1dG8nO1xyXG4gICAgICAgIHRoaXMuX19kaWEuc3R5bGUubWFyZ2luICAgICAgID0gJzAnO1xyXG4gICAgICAgIHRoaXMuX19kaWEuc3R5bGUucGFkZGluZyAgICAgID0gJzAnO1xyXG5cclxuICAgICAgICB0aGlzLl9fcGFuLnN0eWxlLmRpc3BsYXkgICAgICA9ICdncmlkJztcclxuICAgICAgICB0aGlzLl9fcGFuLnN0eWxlLmdyaWRUZW1wbGF0ZUNvbHVtbnMgPSBgXHJcbiAgICAgICAgICAgIFt0bC1zdGFydCBtbC1zdGFydCBibC1zdGFydF1cclxuICAgICAgICAgICAgMjBweFxyXG4gICAgICAgICAgICBbdGwtZW5kIG1sLWVuZCBibC1lbmQgdG0tc3RhcnQgbW0tc3RhcnQgYm0tc3RhcnRdXHJcbiAgICAgICAgICAgIDFmclxyXG4gICAgICAgICAgICBbdG0tZW5kIG1tLWVuZCBibS1lbmQgdHItc3RhcnQgbXItc3RhcnQgYnItc3RhcnRdXHJcbiAgICAgICAgICAgIDIwcHhcclxuICAgICAgICAgICAgW3RyLWVuZCBtci1lbmQgYnItZW5kXVxyXG4gICAgICAgIGA7XHJcbiAgICAgICAgdGhpcy5fX3Bhbi5zdHlsZS5ncmlkVGVtcGxhdGVSb3dzID0gYFxyXG4gICAgICAgICAgICBbdGwtc3RhcnQgdG0tc3RhcnQgdHItc3RhcnRdXHJcbiAgICAgICAgICAgIDIwcHhcclxuICAgICAgICAgICAgW3RsLWVuZCB0bS1lbmQgdHItZW5kIG1sLXN0YXJ0IG1tLXN0YXJ0IG1yLXN0YXJ0XVxyXG4gICAgICAgICAgICAxZnJcclxuICAgICAgICAgICAgW21sLWVuZCBtbS1lbmQgbXItZW5kIGJsLXN0YXJ0IGJtLXN0YXJ0IGJyLXN0YXJ0XVxyXG4gICAgICAgICAgICAyMHB4XHJcbiAgICAgICAgICAgIFtibC1lbmQgYm0tZW5kIGJyLWVuZF1cclxuICAgICAgICBgO1xyXG5cclxuLy8gICAgICAgIHRoaXMuX19wYW4uc3R5bGUuZ3JpZFRlbXBsYXRlQXJlYXMgPSAnXCJ0bCB0bSB0clwiIFwibWwgbW0gbXJcIiBcImJsIGJtIGJyXCInO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBfX3NldF9iYXJfc3R5bGUoYXJlYTogc3RyaW5nKTogSFRNTEVsZW1lbnQge1xyXG4gICAgICAgIGNvbnN0IGVsbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpIGFzIEhUTUxEaXZFbGVtZW50O1xyXG4gICAgICAgIGVsbS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnbGlnaHRjeWFuJztcclxuICAgICAgICBlbG0uc3R5bGUudXNlclNlbGVjdCAgICAgID0gJ25vbmUnO1xyXG4gICAgICAgIGVsbS5zdHlsZS5ncmlkQXJlYSA9IGFyZWE7XHJcbiAgICAgICAgdGhpcy5fX3NldF9tb3ZlX2RpYWxvZyhlbG0pO1xyXG4gICAgICAgIHRoaXMuX19wYW4uYXBwZW5kQ2hpbGQoZWxtKTtcclxuICAgICAgICByZXR1cm4gZWxtO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBfX3NldF9jb3JuZXJfc3R5bGUoYXJlYTogc3RyaW5nKTogSFRNTEVsZW1lbnQge1xyXG4gICAgICAgIGNvbnN0IGVsbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpIGFzIEhUTUxEaXZFbGVtZW50O1xyXG4gICAgICAgIGVsbS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnY3lhbic7XHJcbiAgICAgICAgZWxtLnN0eWxlLnVzZXJTZWxlY3QgICAgICA9ICdub25lJztcclxuICAgICAgICBlbG0uc3R5bGUuZ3JpZEFyZWEgPSBhcmVhO1xyXG5cclxuICAgICAgICBpZiAoZWxtLmlkID09PSB1bmRlZmluZWQgfHwgZWxtLmlkID09PSAnJykgZWxtLmlkID0gYXJlYTtcclxuICAgICAgICB0aGlzLl9fcnN6W2VsbS5pZF0gPSBuZXcgcmVzaXplRG9tKGVsbSwgdGhpcy5fX2RpYSk7XHJcblxyXG4gICAgICAgIHRoaXMuX19zZXRfem9vbV9kaWFsb2coZWxtKTtcclxuICAgICAgICB0aGlzLl9fcGFuLmFwcGVuZENoaWxkKGVsbSk7XHJcbiAgICAgICAgcmV0dXJuIGVsbTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgX19zZXRfem9vbV9kaWFsb2coZWxtOiBIVE1MRWxlbWVudCk6IHZvaWQge1xyXG4gICAgICAgIGVsbS5zZXRBdHRyaWJ1dGUoJ2RyYWdnYWJsZScsICd0cnVlJyk7XHJcbiAgICAgICAgZWxtLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdzdGFydCcsIChldjpEcmFnRXZlbnQpPT57IFxyXG4gICAgICAgICAgICB0aGlzLl9fbW9wID0ge3g6MCwgeTowfTtcclxuICAgICAgICAgICAgdGhpcy5fX21vcC54ID0gZXYucGFnZVg7XHJcbiAgICAgICAgICAgIHRoaXMuX19tb3AueSA9IGV2LnBhZ2VZO1xyXG4gICAgICAgICAgICBpZiAoZWxtLmlkIGluIHRoaXMuX19yc3opIHRoaXMuX19yc3pbZWxtLmlkXS5yZXNldCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGVsbS5hZGRFdmVudExpc3RlbmVyKCdkcmFnJywgKGV2OkRyYWdFdmVudCk9PntcclxuICAgICAgICAgICAgaWYgKGV2LnBhZ2VYID09PSB0aGlzLl9fbW9wLnggJiYgZXYucGFnZVkgPT09IHRoaXMuX19tb3AueSkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgcmVzaXplWCAgPSBldi5wYWdlWCAtIHRoaXMuX19tb3AueDtcclxuICAgICAgICAgICAgY29uc3QgcmVzaXplWSAgPSBldi5wYWdlWSAtIHRoaXMuX19tb3AueTtcclxuICAgICAgICAgICAgaWYgKGVsbS5pZCBpbiB0aGlzLl9fcnN6KSB0aGlzLl9fcnN6W2VsbS5pZF0ucmVzaXplKHJlc2l6ZVgsIHJlc2l6ZVkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGVsbS5hZGRFdmVudExpc3RlbmVyKCdkcmFnZW5kJywgKGV2OkRyYWdFdmVudCk9PnsgXHJcbiAgICAgICAgICAgIGNvbnN0IHJlc2l6ZVggID0gZXYucGFnZVggLSB0aGlzLl9fbW9wLng7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlc2l6ZVkgID0gZXYucGFnZVkgLSB0aGlzLl9fbW9wLnk7XHJcbiAgICAgICAgICAgIGlmIChlbG0uaWQgaW4gdGhpcy5fX3JzeikgdGhpcy5fX3JzeltlbG0uaWRdLnJlc2l6ZShyZXNpemVYLCByZXNpemVZKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgX19zZXRfbW92ZV9kaWFsb2coZWxtOiBIVE1MRWxlbWVudCk6IHZvaWQgeyBcclxuICAgICAgICBlbG0uc2V0QXR0cmlidXRlKCdkcmFnZ2FibGUnLCAndHJ1ZScpO1xyXG4gICAgICAgIGVsbS5hZGRFdmVudExpc3RlbmVyKCdkcmFnc3RhcnQnLCAoZXY6RHJhZ0V2ZW50KT0+eyBcclxuICAgICAgICAgICAgdGhpcy5fX21vcCA9IHt4OjAsIHk6MH07XHJcbiAgICAgICAgICAgIHRoaXMuX19tb3AueSA9IHRoaXMuX19kaWEub2Zmc2V0VG9wICAtIGV2LnBhZ2VZO1xyXG4gICAgICAgICAgICB0aGlzLl9fbW9wLnggPSB0aGlzLl9fZGlhLm9mZnNldExlZnQgLSBldi5wYWdlWDtcclxuLy8gICAgICAgICAgICBldi5kYXRhVHJhbnNmZXI/LnNldERyYWdJbWFnZShkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSwgMCwgMCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgZWxtLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWcnLCAoZXY6RHJhZ0V2ZW50KT0+e1xyXG4gICAgICAgICAgICBpZiAoZXYueCA9PT0gMCAmJiBldi55ID09PSAwKSByZXR1cm47XHJcbiAgICAgICAgICAgIGNvbnN0IHRvcCAgPSBldi5wYWdlWSArIHRoaXMuX19tb3AueTtcclxuICAgICAgICAgICAgY29uc3QgbGVmdCA9IGV2LnBhZ2VYICsgdGhpcy5fX21vcC54O1xyXG4vLyAgICAgICAgICAgIGNvbnN0IHJpZ2h0ID0gd2luZG93Lm91dGVyV2lkdGggLSBldi5wYWdlWDtcclxuICAgICAgICAgICAgdGhpcy5fX2RpYS5zdHlsZS50b3AgICA9IHRvcCAgICsgJ3B4JztcclxuICAgICAgICAgICAgdGhpcy5fX2RpYS5zdHlsZS5sZWZ0ICA9IGxlZnQgICsgJ3B4JztcclxuLy8gICAgICAgICAgICB0aGlzLl9fZGlhLnN0eWxlLnJpZ2h0ID0gcmlnaHQgKyAncHgnO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGVsbS5hZGRFdmVudExpc3RlbmVyKCdkcmFnZW5kJywgKGV2OkRyYWdFdmVudCk9PnsgXHJcbiAgICAgICAgICAgIHRoaXMuX19tb3AgPSB7eDowLCB5OjB9O1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIGdldFdpbmRvdygpOiBIVE1MRGl2RWxlbWVudCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX19jdHg7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgc2V0V2luZG93KGN0eDogSFRNTERpdkVsZW1lbnQpOiBIVE1MRGl2RWxlbWVudCB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgdGhpcy5fX3Bhbi5yZW1vdmVDaGlsZCh0aGlzLl9fY3R4KTtcclxuICAgICAgICAgICAgdGhpcy5fX3Bhbi5hcHBlbmRDaGlsZChjdHgpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fX2N0eCA9IGN0eDtcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHt9XHJcbiAgICAgICAgcmV0dXJuIGN0eDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0Wm9vbUVsbShlbG06IEhUTUxFbGVtZW50KTogdm9pZCB7XHJcbiAgICAgICAgZm9yIChjb25zdCBpaSBpbiB0aGlzLl9fcnN6KSB0aGlzLl9fcnN6W2lpXS5zZXRab29tRWxtKGVsbSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgY2xyWm9vbSgpOiB2b2lkIHtcclxuICAgICAgICBmb3IgKGNvbnN0IGlpIGluIHRoaXMuX19yc3opIHRoaXMuX19yc3pbaWldLmNsclpvb21FbG0oKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIHNob3coKTogdm9pZCB7IFxyXG4gICAgICAgIHRyeSB7dGhpcy5fX2RpYS5zaG93KCl9IGNhdGNoIChlcnIpIHt9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgaGlkZSgpOiB2b2lkIHsgXHJcbiAgICAgICAgdHJ5IHt0aGlzLl9fZGlhLmNsb3NlKCl9IGNhdGNoIChlcnIpIHt9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZGlzcGxheSh5bjogYm9vbGVhbik6IHZvaWQgeyBcclxuICAgICAgICB5bj90aGlzLnNob3coKTp0aGlzLmhpZGUoKTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgcmVzaXplRG9tIHtcclxuICAgIHByaXZhdGUgX19kaWE6ICBIVE1MRWxlbWVudDtcclxuICAgIHByaXZhdGUgX19jbnI6ICBIVE1MRWxlbWVudDtcclxuICAgIHByaXZhdGUgX190cmc6ICBIVE1MRWxlbWVudHx1bmRlZmluZWQ7XHJcbiAgICBwcml2YXRlIF9fY2FuOiB7eDogYm9vbGVhbiwgeTogYm9vbGVhbn07XHJcbiAgICBwcml2YXRlIF9fdG9wOiAgeHk7XHJcbiAgICBwcml2YXRlIF9fc2l6OiAgeHk7XHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoY25yOiBIVE1MRWxlbWVudCwgZGlhOiBIVE1MRWxlbWVudCkge1xyXG4gICAgICAgIHRoaXMuX19kaWEgPSBkaWE7IHRoaXMuX19jbnIgPSBjbnI7XHJcbiAgICAgICAgdGhpcy5fX2NhbiA9IHt4OmZhbHNlLCB5OiBmYWxzZX07XHJcbiAgICAgICAgdGhpcy5fX3RvcCA9IHt4OjAsIHk6MH07XHJcbiAgICAgICAgdGhpcy5fX3NpeiA9IHt4OjAsIHk6MH07XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0Wm9vbUVsbSh0cmc6IEhUTUxFbGVtZW50KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fX3RyZyAgID0gdHJnO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGNsclpvb21FbG0oKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fX3RyZyAgID0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHJlc2V0KCk6IHZvaWQge1xyXG4gICAgICAgIC8vIFpvb23lr77osaHjgYzoqK3lrprjgZXjgozjgabjgYTjgarjgZHjgozjgbDkvZXjgoLjgZfjgarjgYRcclxuICAgICAgICBpZiAodGhpcy5fX3RyZyA9PT0gdW5kZWZpbmVkKSByZXR1cm47XHJcblxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIC8vIERpYWxvZ+OBruW3puWNiuWIhuOBq+WvvuixoeOCs+ODvOODiuODvOOBjOacieOCjOOBsOOCteOCpOOCuuWkieabtOOBrumam+OBq+W3pui+uuOCkuWLleOBi+OBmeOBruOBp+OBneOBruODleODqeOCsOioreWumih4KVxyXG4gICAgICAgICAgICAvLyBEaWFsb2fjga7kuIrljYrliIbjgavlr77osaHjgrPjg7zjg4rjg7zjgYzmnInjgozjgbDjgrXjgqTjgrrlpInmm7Tjga7pmpvjgavkuIrovrrjgpLli5XjgYvjgZnjga7jgafjgZ3jga7jg5Xjg6njgrDoqK3lrpooeSlcclxuICAgICAgICAgICAgY29uc3QgcGFyZW50ICA9ICB0aGlzLl9fY25yLm9mZnNldFBhcmVudCBhcyBIVE1MRWxlbWVudDtcclxuICAgICAgICAgICAgdGhpcy5fX2Nhbi54ICA9ICB0aGlzLl9fY25yLm9mZnNldExlZnQgPCAocGFyZW50Py5vZmZzZXRXaWR0aCAgLyAyKTtcclxuICAgICAgICAgICAgdGhpcy5fX2Nhbi55ICA9ICB0aGlzLl9fY25yLm9mZnNldFRvcCAgPCAocGFyZW50Py5vZmZzZXRIZWlnaHQgLyAyKTtcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgdGhpcy5fX2Nhbi54ICA9ICB0aGlzLl9fY2FuLnkgID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIERpYWxvZ+OBruW3puS4iuOBruW6p+aomeOCkuS/neWtmFxyXG4gICAgICAgIHRoaXMuX190b3AueCA9IHRoaXMuX19kaWEub2Zmc2V0TGVmdDsgXHJcbiAgICAgICAgdGhpcy5fX3RvcC55ID0gdGhpcy5fX2RpYS5vZmZzZXRUb3A7IFxyXG5cclxuICAgICAgICAvLyBab29t5a++6LGh44Go44GZ44KL6KaB57Sg44Gu5bmF44Go6auY44GV44KS5L+d5a2YXHJcbiAgICAgICAgdGhpcy5fX3Npei54ID0gdGhpcy5fX3RyZy5vZmZzZXRXaWR0aDsgXHJcbiAgICAgICAgdGhpcy5fX3Npei55ID0gdGhpcy5fX3RyZy5vZmZzZXRIZWlnaHQ7IFxyXG4gICAgfVxyXG4gICAgcHVibGljIHJlc2l6ZShyZXNpemVYOiBudW1iZXIsIHJlc2l6ZVk6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIC8vIFpvb23lr77osaHjgYzoqK3lrprjgZXjgozjgabjgYTjgarjgZHjgozjgbDkvZXjgoLjgZfjgarjgYRcclxuICAgICAgICBpZiAodGhpcy5fX3RyZyA9PT0gdW5kZWZpbmVkKSByZXR1cm47XHJcblxyXG4gICAgICAgIC8vIERpYWxvZ+OBruW3puWNiuWIhuOBq+WvvuixoeOCs+ODvOODiuODvOOBjOacieOCjOOBsOW3pui+uuOCkuWLleOBi+OBmVxyXG4gICAgICAgIC8vIOW3pui+uuOCkuS8uOOBsOOBmeOBruOBp+ODquOCteOCpOOCuumHj+OBr+WPjei7ouOBleOBm+OCi1xyXG4gICAgICAgIGlmICh0aGlzLl9fY2FuLngpIHtcclxuICAgICAgICAgICAgcmVzaXplWCA9IC1yZXNpemVYO1xyXG4gICAgICAgICAgICB0aGlzLl9fZGlhLnN0eWxlLmxlZnQgID0gdGhpcy5fX3RvcC54IC0gcmVzaXplWCAgKyAncHgnO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBEaWFsb2fjga7kuIrljYrliIbjgavlr77osaHjgrPjg7zjg4rjg7zjgYzmnInjgozjgbDkuIrovrrjgpLli5XjgYvjgZlcclxuICAgICAgICAvLyDkuIrovrrjgpLkvLjjgbDjgZnjga7jgafjg6rjgrXjgqTjgrrph4/jga/lj43ou6LjgZXjgZvjgotcclxuICAgICAgICBpZiAodGhpcy5fX2Nhbi55KSB7XHJcbiAgICAgICAgICAgIHJlc2l6ZVkgPSAtcmVzaXplWTtcclxuICAgICAgICAgICAgdGhpcy5fX2RpYS5zdHlsZS50b3AgICA9IHRoaXMuX190b3AueSAtIHJlc2l6ZVkgICArICdweCc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIFpvb23lr77osaHjgpLjgrXjgqTjgrrlpInmm7TjgZnjgotcclxuICAgICAgICB0aGlzLl9fdHJnLnN0eWxlLndpZHRoICA9IHRoaXMuX19zaXoueCArIHJlc2l6ZVggKyAncHgnO1xyXG4gICAgICAgIHRoaXMuX190cmcuc3R5bGUuaGVpZ2h0ID0gdGhpcy5fX3Npei55ICsgcmVzaXplWSArICdweCc7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgX21pbiB9ICAgICAgICAgIGZyb20gXCIuLi9kX3V0bC9GX01hdGhcIjtcclxuaW1wb3J0IHsgQ19VcmxPcHQgfSAgICAgIGZyb20gXCIuLi9kX3V0bC9DX1VybE9wdFwiO1xyXG5pbXBvcnQgeyBnX21lcywgX2FsZXJ0LCBnX2RlYnVnLCBnX2FsZXJ0IH0gZnJvbSBcIi4uL2RfY21uL2dsb2JhbFwiO1xyXG5cclxuXHJcbi8vIOmdnuWQjOacn+mAmuS/oeeJiCBQT1NUKFN0cmluZykgJiBHRVQgSlNPTlxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUE9TVF9hbmRfZ2V0X0pTT04oXHJcbiAgICB1cmw6IHN0cmluZywgXHJcbiAgICBvcHQ6IENfVXJsT3B0LCBcclxuKTogUHJvbWlzZTxhbnl8dW5kZWZpbmVkPiB7XHJcbiAgICBjb25zdCBmb3JtX2RhdGEgPSBvcHQudG9Gb3JtRGF0YSgpO1xyXG5cclxuICAgIGlmIChmb3JtX2RhdGEgPT09IHVuZGVmaW5lZCkgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIHZhciByZXM6IFJlc3BvbnNlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICByZXMgPSBhd2FpdCBmZXRjaCh1cmwsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgIGNhY2hlOiAgJ25vLWNhY2hlJyxcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4vLyAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcIm11bHRpcGFydC9mb3JtLWRhdGFcIlxyXG4vLyAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFwiXHJcbi8vICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbn0sXHJcbiAgICAgICAgICAgIGJvZHk6IG9wdC50b0Zvcm1EYXRhKClcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoIXJlcy5vaykge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYOODrOOCueODneODs+OCueOCueODhuODvOOCv+OCuSAoJHtyZXMuc3RhdHVzfSlgKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgZ19tZXMud2FybmluZ19tZXNzYWdlKCfpgJrkv6Hjgqjjg6njg7w6ICcgKyBlcnIpO1xyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgbW9uaXRvciA9IHRydWU7ICAvLyBhbGVydOOBp+WPl+S/oeOBl+OBn+ODhuOCreOCueODiOOCkuihqOekuuOBmeOCi+OBqOOBjeOBq3RydWXjgavjgZnjgotcclxuXHJcbiAgICByZXR1cm4gcmVzLnRleHQoKVxyXG4gICAgICAgIC50aGVuKHR4dD0+e1xyXG4gICAgICAgICAgICBjb25zdCB0eCA9IHR4dC5zbGljZSgpO1xyXG5cclxuLy8gICAgICAgICAgICBpZiAobW9uaXRvcikgX2FsZXJ0KHR4KTtcclxuICAgICAgICAgICAgaWYgKG1vbml0b3IpIHtcclxuICAgICAgICAgICAgICAgIGdfYWxlcnQuc2V0X21lc3NhZ2UoYFBPU1QgVVJMOmAsIHVybCk7XHJcbiAgICAgICAgICAgICAgICBnX2FsZXJ0LnNldF9tZXNzYWdlKGBQT1NUIE9QVDpgLCBvcHQudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICBnX2FsZXJ0LnNldF9tZXNzYWdlKGBQT1NUIERBVEE6YCwgdHgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UodHh0KTtcclxuICAgICAgICAgICAgfSBjYXRjaChlcnIpIHtcclxuICAgICAgICAgICAgICAgIGdfbWVzLndhcm5pbmdfbWVzc2FnZSgnSlNPTuW9ouW8j+OBruODh+OCs+ODvOODieOCqOODqeODvCcpO1xyXG4gICAgICAgICAgICAgICAgX2FsZXJ0KHR4KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxufVxyXG5cclxuLy8g6Z2e5ZCM5pyf6YCa5L+h54mIIFBPU1QoSlNPTikgJiBHRVQgSlNPTlxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUE9TVF9hbmRfZ2V0X0pTT04zKFxyXG4gICAgdXJsOiBzdHJpbmcsIFxyXG4gICAgb3B0OiBDX1VybE9wdCwgXHJcbik6IFByb21pc2U8YW55fHVuZGVmaW5lZD4ge1xyXG4gICAgY29uc3QgZm9ybV9kYXRhID0gb3B0LnRvRm9ybURhdGEoKTtcclxuXHJcbiAgICBpZiAoZm9ybV9kYXRhID09PSB1bmRlZmluZWQpIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB2YXIgcmVzOiBSZXNwb25zZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgcmVzID0gYXdhaXQgZmV0Y2godXJsLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICBjYWNoZTogICduby1jYWNoZScsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuLy8gICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJtdWx0aXBhcnQvZm9ybS1kYXRhXCJcclxuLy8gICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIlxyXG4gICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxufSxcclxuICAgICAgICAgICAgYm9keTogb3B0LnRvSlNPTigpXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKCFyZXMub2spIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGDjg6zjgrnjg53jg7Pjgrnjgrnjg4bjg7zjgr/jgrkgKCR7cmVzLnN0YXR1c30pYCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGdfbWVzLndhcm5pbmdfbWVzc2FnZSgn6YCa5L+h44Ko44Op44O8OiAnICsgZXJyKTtcclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG1vbml0b3IgPSB0cnVlOyAgLy8gYWxlcnTjgaflj5fkv6HjgZfjgZ/jg4bjgq3jgrnjg4jjgpLooajnpLrjgZnjgovjgajjgY3jgat0cnVl44Gr44GZ44KLXHJcblxyXG4gICAgcmV0dXJuIHJlcy50ZXh0KClcclxuICAgICAgICAudGhlbih0eHQ9PntcclxuICAgICAgICAgICAgY29uc3QgdHggPSB0eHQuc2xpY2UoKTtcclxuXHJcbi8vICAgICAgICAgICAgaWYgKG1vbml0b3IpIF9hbGVydCh0eCk7XHJcbiAgICAgICAgICAgIGlmIChtb25pdG9yKSB7XHJcbiAgICAgICAgICAgICAgICBnX2FsZXJ0LnNldF9tZXNzYWdlKGBQT1NUIFVSTDpgLCB1cmwpO1xyXG4gICAgICAgICAgICAgICAgZ19hbGVydC5zZXRfbWVzc2FnZShgUE9TVCBPUFQ6YCwgb3B0LnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgZ19hbGVydC5zZXRfbWVzc2FnZShgUE9TVCBEQVRBOmAsIHR4KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKHR4dCk7XHJcbiAgICAgICAgICAgIH0gY2F0Y2goZXJyKSB7XHJcbiAgICAgICAgICAgICAgICBnX21lcy53YXJuaW5nX21lc3NhZ2UoJ0pTT07lvaLlvI/jga7jg4fjgrPjg7zjg4njgqjjg6njg7wnKTtcclxuICAgICAgICAgICAgICAgIF9hbGVydCh0eCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbn1cclxuXHJcblxyXG5cclxuXHJcbi8vIOWQjOacn+mAmuS/oeeJiCBQT1NUICYgR0VUIEpTT05cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBPU1RfYW5kX2dldF9KU09OMihcclxuICAgIHVybDogc3RyaW5nLCBcclxuICAgIG9wdDogQ19VcmxPcHQsIFxyXG4pOiBQcm9taXNlPGFueXx1bmRlZmluZWQ+IHtcclxuICAgIGNvbnN0IHJlcU9iaiA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpOyAvLyBvYmplY3Qgb2YgcmVxdWVzdFxyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgICAgcmVxT2JqLm9wZW4oXCJQT1NUXCIsIHVybCwgZmFsc2UpOyAvLyBTeW5jIG1vZGVcclxuICAgICAgICByZXFPYmouc2V0UmVxdWVzdEhlYWRlcihcIkNvbnRlbnQtdHlwZVwiLCBcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFwiKTsgLy8gc2V0dGluZyBvZiBoZWFkZXJzICBpbiByZXF1ZXN0XHJcbiAgICAgICAgcmVxT2JqLnNlbmQob3B0LnRvRm9ybURhdGEoKSk7IC8vIGRhdGEgdG8gc2VuZCBpbiByZXF1ZXN0XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBnX21lcy53YXJuaW5nX21lc3NhZ2UoYOmAmuS/oeOCqOODqeODvDogJHtyZXFPYmouc3RhdHVzfWApO1xyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdHh0ID0gcmVxT2JqLnJlc3BvbnNlVGV4dDsgLy8gZGlzcGxheWluZyByZXNwb25zZSB0ZXh0IGluIHBhcmFncmFwaCB0YWdcclxuXHJcbiAgICBjb25zdCBtb25pdG9yID0gdHJ1ZTsgIC8vIGFsZXJ044Gn5Y+X5L+h44GX44Gf44OG44Kt44K544OI44KS6KGo56S644GZ44KL44Go44GN44GrdHJ1ZeOBq+OBmeOCi1xyXG4gICAgaWYgKG1vbml0b3IpIHtcclxuICAgICAgICBnX2FsZXJ0LnNldF9tZXNzYWdlKGBQT1NUIFVSTDpgLCAgdXJsKTtcclxuICAgICAgICBnX2FsZXJ0LnNldF9tZXNzYWdlKGBQT1NUIE9QVDpgLCAgb3B0LnRvU3RyaW5nKCkpO1xyXG4gICAgICAgIGdfYWxlcnQuc2V0X21lc3NhZ2UoYFBPU1QgREFUQTpgLCB0eHQpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChOdW1iZXIocmVxT2JqLnN0YXR1cykgPiAzOTkpIHtcclxuICAgICAgICBnX21lcy53YXJuaW5nX21lc3NhZ2UoYOODrOOCueODneODs+OCueOCueODhuODvOOCv+OCuTogJHtyZXFPYmouc3RhdHVzfWApO1xyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZSh0eHQpO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgZ19tZXMud2FybmluZ19tZXNzYWdlKCdKU09O5b2i5byP44Gu44OH44Kz44O844OJ44Ko44Op44O8OiAnICsgZXJyKTtcclxuICAgICAgICBfYWxlcnQodHh0KTtcclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gUE9TVF9hbmRfbW92ZV9wYWdlKHVybDogc3RyaW5nLCBvcHQ6IENfVXJsT3B0KTogdm9pZCB7XHJcbiAgICBjcmVhdGVfZm9ybSh1cmwsIG9wdCkuc3VibWl0KCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZV9mb3JtKHVybDogc3RyaW5nLCBvcHQ6IENfVXJsT3B0KTogSFRNTEZvcm1FbGVtZW50IHtcclxuICAgIGNvbnN0IGZvcm0gID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpIGFzIEhUTUxGb3JtRWxlbWVudDtcclxuXHJcbiAgICBmb3JtLmlkICAgICA9ICdkdW1teV9mb3JtXycgKyBuZXcgRGF0ZSgpLnZhbHVlT2YoKS50b1N0cmluZygpO1xyXG4gICAgZm9ybS5tZXRob2QgPSAnUE9TVCc7XHJcbiAgICBmb3JtLmFjdGlvbiA9ICB1cmw7XHJcbiAgICBmb3JtLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcblxyXG4gICAgZm9yICh2YXIga2V5IG9mIG9wdC5nZXRfa2V5cygpKSB7XHJcbiAgICAgICAgY3JlYXRlX2lucHV0KGZvcm0sIGZvcm0uaWQsIGtleSwgb3B0LmdldChrZXkpKTtcclxuICAgIH1cclxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZm9ybSk7XHJcbiAgICByZXR1cm4gZm9ybTtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlX2lucHV0KGZvcm06IEhUTUxGb3JtRWxlbWVudCwgZmlkOiBzdHJpbmcsIG5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZyk6IEhUTUxJbnB1dEVsZW1lbnQge1xyXG4gICAgY29uc3QgaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JykgYXMgSFRNTElucHV0RWxlbWVudDtcclxuXHJcbiAgICBpLnR5cGUgID0gJ2hpZGRlbic7XHJcbiAgICBpLm5hbWUgID0gbmFtZTtcclxuICAgIGkudmFsdWUgPSB2YWx1ZTtcclxuICAgIGkuc3R5bGUuZGlzcGxheSA9J25vbmUnO1xyXG4gICAgaS5zZXRBdHRyaWJ1dGUoJ2ZvcicsICAgZmlkKTtcclxuICAgIGZvcm0uYXBwZW5kQ2hpbGQoaSk7XHJcblxyXG4gICAgcmV0dXJuIGk7XHJcbn1cclxuIiwiaW1wb3J0IHsgYWxlcnRfc2F2ZV9kZXRhaWwsIGFsZXJ0X3NhdmVfaW5mbyB9IGZyb20gJy4uL2RfbWRsL0NfU2F2ZURhdGEnOyBcclxuaW1wb3J0IHsgYWxlcnRfdGVhbV9pbmZvIH0gICAgIGZyb20gXCIuLi9kX21kbC9DX1RlYW1cIjsgXHJcbmltcG9ydCB7IGFsZXJ0X21hemVfaW5mbyB9ICAgICBmcm9tIFwiLi4vZF9tZGwvQ19NYXplXCI7IFxyXG5pbXBvcnQgeyBhbGVydF9ndWxkX2luZm8gfSAgICAgZnJvbSBcIi4uL2RfbWRsL0NfR3VpbGRcIjsgXHJcbmltcG9ydCB7IGFsZXJ0X212cHRfaW5mbyB9ICAgICBmcm9tIFwiLi4vZF9tZGwvQ19Nb3ZhYmxlUG9pbnRcIjtcclxuaW1wb3J0IHsgYWxlcnRfaHJlc19pbmZvIH0gICAgIGZyb20gXCIuLi9kX21kbC9DX0hlcm9cIjsgXHJcbmltcG9ydCB7IGFsZXJ0X1BEX2luZm8gfSAgICAgICBmcm9tIFwiLi4vZF9tZGwvQ19Qb2ludERpclwiO1xyXG5pbXBvcnQgeyBhbGVydF9tYXplaW5mb19pbmZvIH0gZnJvbSAnLi4vZF9tZGwvQ19NYXplSW5mbyc7XHJcblxyXG5pbXBvcnQgeyBfcm91bmQsIF9taW4sIF9tYXggIH0gZnJvbSBcIi4uL2RfdXRsL0ZfTWF0aFwiO1xyXG5pbXBvcnQgeyBDX1VybE9wdCB9ICAgICAgICAgICAgZnJvbSBcIi4uL2RfdXRsL0NfVXJsT3B0XCI7ICBcclxuaW1wb3J0IHsgUE9TVF9hbmRfZ2V0X0pTT04sICBQT1NUX2FuZF9nZXRfSlNPTjMsIFBPU1RfYW5kX21vdmVfcGFnZSB9IGZyb20gXCIuLi9kX2Ntbi9GX1BPU1RcIjtcclxuaW1wb3J0IHsgXHJcbiAgICBfYWxlcnQsIGdfbWVzLCBnX3N0YXJ0X2VudiwgXHJcbiAgICBnX3VybCwgIGdfdXJsX2d0Ml9tYXplLCBnX3VybF9nZXRfc2F2ZSwgZ191cmxfZ3QyX2d1bGQsIFxyXG4gICAgZ19zYXZlLFxyXG4gICAgZ191cmxfYWxsX21hemUsXHJcbiAgICBnX3VybF9nZXRfbWF6ZSwgXHJcbiAgICBnX3VybF9uZXdfbWF6ZSxcclxuICAgIGdfdXJsX25ld19ndWxkLFxyXG4gICAgZ191cmxfYWxsX2hyZXMsXHJcbiAgICBnX3VybF9jaGVja19KU09OLFxyXG4gICAgZ191cmxfZ3QyX3NhdmUsXHJcbiAgICBnX3VybF9nZXRfaW5mbyxcclxuICAgIGdfdXJsX2dldF9kYXRhLFxyXG4gICAgZ191cmxfcHV0X2RhdGEsXHJcbn0gZnJvbSBcIi4uL2RfY21uL2dsb2JhbFwiO1xyXG5cclxuXHJcbnR5cGUgVF9jYWxsYmFjayA9IChqc29uT2JqOmFueSk9Pihib29sZWFufHZvaWQpO1xyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldF9tYWlfbWF6ZShjYWxsYmFjaz86IFRfY2FsbGJhY2spOiBQcm9taXNlPGFueXx1bmRlZmluZWQ+IHtcclxuICAgIGNvbnN0IG9wdCA9IG5ldyBDX1VybE9wdCgpO1xyXG4gICAgb3B0LnNldCgnbW9kZScsICduZXdfZ2FtZScpOyBcclxuICAgIG9wdC5zZXQoJ3BpZCcsICAgZ19zdGFydF9lbnYucGlkKTtcclxuLy8gICAgcmV0dXJuIGF3YWl0IF9nZXRfbmV3X2dhbWUoZ191cmxbZ191cmxfZ3QyX21hemVdLCBvcHQsIGNhbGxiYWNrKTtcclxuICAgIHJldHVybiBhd2FpdCBfZ2V0X25ld19nYW1lKGdfdXJsW2dfdXJsX25ld19tYXplXSwgb3B0LCBjYWxsYmFjayk7XHJcbn1cclxuXHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0X21haV9ndWxkKGNhbGxiYWNrPzogVF9jYWxsYmFjayk6IFByb21pc2U8YW55fHVuZGVmaW5lZD4ge1xyXG4gICAgY29uc3Qgb3B0ID0gbmV3IENfVXJsT3B0KCk7XHJcbiAgICBvcHQuc2V0KCdtb2RlJywgJ25ld19nYW1lJyk7IFxyXG4gICAgb3B0LnNldCgncGlkJywgICBnX3N0YXJ0X2Vudi5waWQudG9TdHJpbmcoKSk7XHJcbi8vICAgIHJldHVybiBhd2FpdCBfZ2V0X25ld19nYW1lKGdfdXJsW2dfdXJsX2d0Ml9ndWxkXSwgb3B0LCBjYWxsYmFjayk7XHJcbiAgICByZXR1cm4gYXdhaXQgX2dldF9uZXdfZ2FtZShnX3VybFtnX3VybF9uZXdfZ3VsZF0sIG9wdCwgY2FsbGJhY2spO1xyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBfZ2V0X25ld19nYW1lKHVybDogc3RyaW5nLCBvcHQ6IENfVXJsT3B0LCBjYWxsYmFjaz86IFRfY2FsbGJhY2spOiBQcm9taXNlPGFueXx1bmRlZmluZWQ+IHtcclxuICAgIHJldHVybiBhd2FpdCBQT1NUX2FuZF9nZXRfSlNPTjModXJsLCBvcHQpPy50aGVuKGpzb25PYmo9PntcclxuICAgICAgICBpZiAoanNvbk9iai5lY29kZSA9PT0gMCkge1xyXG4gICAgICAgICAgICBnX21lcy5ub3JtYWxfbWVzc2FnZSgn5q2j5bi444Gr44Ot44O844OJ44GV44KM44G+44GX44GfJyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgIGlmIChqc29uT2JqLnNhdmUgID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGdfbWVzLndhcm5pbmdfbWVzc2FnZShcIuS/neWtmOODh+ODvOOCv+OBjOS4jeato+OBquW9ouW8j+OBp+OBl+OBn1xcblwiICsganNvbk9iai5lbXNnKTtcclxuICAgICAgICAgICAgICAgIF9hbGVydChqc29uT2JqLmVtc2cpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgbW9uaXRvciA9IGZhbHNlOyAgLy8gYWxlcnTjgaflj5fkv6HjgZfjgZ/jg4bjgq3jgrnjg4jjgpLooajnpLrjgZnjgovjgajjgY3jgat0cnVl44Gr44GZ44KLXHJcbiAgICAgICAgICAgIGlmIChtb25pdG9yKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoanNvbk9iaj8uc2F2ZSAgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0X3NhdmVfaW5mbyhqc29uT2JqLnNhdmUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0X3NhdmVfZGV0YWlsKGpzb25PYmouc2F2ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrICE9PSB1bmRlZmluZWQpIGNhbGxiYWNrKGpzb25PYmopO1xyXG4gICAgICAgICAgICByZXR1cm4ganNvbk9iajtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBnX21lcy53YXJuaW5nX21lc3NhZ2UoXCLjg63jg7zjg4njgafjgY3jgb7jgZvjgpPjgafjgZfjgZ9cXG5cIiArIGpzb25PYmouZW1zZyk7XHJcbiAgICAgICAgICAgIF9hbGVydChqc29uT2JqLmVtc2cpO1xyXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0X25ld19tYXplKG1hemVfbmFtZTogc3RyaW5nLCBjYWxsYmFjaz86IFRfY2FsbGJhY2spOiBQcm9taXNlPGFueXx1bmRlZmluZWQ+IHtcclxuICAgIGNvbnN0IG9wdCA9IG5ldyBDX1VybE9wdCgpO1xyXG4gICAgb3B0LnNldCgnbW9kZScsICAgICAgJ25ld19tYXplJyk7XHJcbiAgICBvcHQuc2V0KCdwaWQnLCAgICAgICAgZ19zdGFydF9lbnYucGlkKTtcclxuICAgIG9wdC5zZXQoJ21hemVfbmFtZScsICBtYXplX25hbWUpO1xyXG5cclxuLy8gICAgcmV0dXJuIFBPU1RfYW5kX2dldF9KU09OKGdfdXJsW2dfdXJsX2d0Ml9tYXplXSwgb3B0KT8udGhlbihqc29uT2JqPT57XHJcbiAgICByZXR1cm4gUE9TVF9hbmRfZ2V0X0pTT04zKGdfdXJsW2dfdXJsX2dldF9tYXplXSwgb3B0KT8udGhlbihqc29uT2JqPT57XHJcbiAgICAgICAgaWYgKGpzb25PYmouZWNvZGUgIT09IDApIHtcclxuICAgICAgICAgICAgZ19tZXMud2FybmluZ19tZXNzYWdlKFwi5paw6L+35a6u44OH44O844K/44KS5Y+X5L+h44Gn44GN44G+44Gb44KT44Gn44GX44GfXFxuXCIgKyBqc29uT2JqLmVtc2cpO1xyXG4gICAgICAgICAgICBfYWxlcnQoanNvbk9iai5lbXNnKTtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGpzb25PYmo/LmRhdGEgID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgZ19tZXMud2FybmluZ19tZXNzYWdlKFwi5Y+X5L+h44OH44O844K/44GM5LiN5q2j44Gq5b2i5byP44Gn44GX44GfXFxuXCIgKyBqc29uT2JqLmVtc2cpO1xyXG4gICAgICAgICAgICBfYWxlcnQoanNvbk9iai5lbXNnKTtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGpzb25PYmo/LmRhdGE/Lm1hemUgID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgZ19tZXMud2FybmluZ19tZXNzYWdlKFwi5paw6L+35a6u44OH44O844K/44GM5LiN5q2j44Gq5b2i5byP44Gn44GX44GfXFxuXCIgKyBqc29uT2JqLmVtc2cpO1xyXG4gICAgICAgICAgICBfYWxlcnQoanNvbk9iai5lbXNnKTtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGpzb25PYmo/LmRhdGE/LnBvcyAgID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgZ19tZXMud2FybmluZ19tZXNzYWdlKFwi5paw6L+35a6u44Gu5L2N572u44OH44O844K/44GM5LiN5q2j44Gq5b2i5byP44Gn44GX44GfXFxuXCIgKyBqc29uT2JqLmVtc2cpO1xyXG4gICAgICAgICAgICBfYWxlcnQoanNvbk9iai5lbXNnKTtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IG1vbml0b3IgPSBmYWxzZSAgLy8gYWxlcnTjgaflj5fkv6HjgZfjgZ/jg4bjgq3jgrnjg4jjgpLooajnpLrjgZnjgovjgajjgY3jgat0cnVl44Gr44GZ44KLXHJcbiAgICAgICAgaWYgKG1vbml0b3IpIHtcclxuICAgICAgICAgICAgaWYgKGpzb25PYmo/LmRhdGE/Lm1hemUgICE9PSB1bmRlZmluZWQpIGFsZXJ0X21hemVfaW5mbyhqc29uT2JqLmRhdGEubWF6ZSk7XHJcbiAgICAgICAgICAgIGlmIChqc29uT2JqPy5kYXRhPy5wb3MgICAhPT0gdW5kZWZpbmVkKSBhbGVydF9QRF9pbmZvICAoanNvbk9iai5kYXRhLnBvcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjYWxsYmFjayAhPT0gdW5kZWZpbmVkKSBjYWxsYmFjayhqc29uT2JqPy5kYXRhKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGpzb25PYmo7XHJcbiAgICB9KTsgXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRfc2F2ZV9pbmZvKGNhbGxiYWNrPzogVF9jYWxsYmFjayk6IFByb21pc2U8YW55fHVuZGVmaW5lZD4ge1xyXG4gICAgY29uc3Qgb3B0ID0gbmV3IENfVXJsT3B0KCk7XHJcbiAgICBvcHQuc2V0KCdtb2RlJywgICAgICAgJ3NhdmVfaW5mbycpOyBcclxuICAgIG9wdC5zZXQoJ3BpZCcsICAgICAgICAgZ19zdGFydF9lbnYucGlkKTtcclxuXHJcbi8vICAgIHJldHVybiBQT1NUX2FuZF9nZXRfSlNPTihnX3VybFtnX3VybF9ndDJfc2F2ZV0sIG9wdCk/LnRoZW4oanNvbk9iaj0+e1xyXG4gICAgcmV0dXJuIFBPU1RfYW5kX2dldF9KU09OMyhnX3VybFtnX3VybF9nZXRfaW5mb10sIG9wdCk/LnRoZW4oanNvbk9iaj0+e1xyXG4gICAgICAgIGlmIChqc29uT2JqLmVjb2RlID09PSAwKSB7XHJcbiAgICAgICAgICAgIGdfbWVzLm5vcm1hbF9tZXNzYWdlKCfmraPluLjjgavjg63jg7zjg4njgZXjgozjgb7jgZfjgZ8nKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChqc29uT2JqLnNhdmVfaW5mbyAgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgZ19tZXMud2FybmluZ19tZXNzYWdlKFwi5L+d5a2Y44OH44O844K/44GM5LiN5q2j44Gq5b2i5byP44Gn44GX44GfXFxuXCIgKyBqc29uT2JqLmVtc2cpO1xyXG4gICAgICAgICAgICAgICAgX2FsZXJ0KGpzb25PYmouZW1zZyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBjb25zdCBtb25pdG9yID0gZmFsc2U7ICAvLyBhbGVydOOBp+WPl+S/oeOBl+OBn+ODhuOCreOCueODiOOCkuihqOekuuOBmeOCi+OBqOOBjeOBq3RydWXjgavjgZnjgotcclxuICAgICAgICAgICAgaWYgKG1vbml0b3IpIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IHNhdmUgb2YganNvbk9iai5zYXZlX2luZm8pIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2F2ZSAgICAgICAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0X3NhdmVfaW5mbyhzYXZlKTtcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICBhbGVydF9zYXZlX2RldGFpbChzYXZlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChjYWxsYmFjayAhPT0gdW5kZWZpbmVkKSBjYWxsYmFjayhqc29uT2JqKTtcclxuICAgICAgICAgICAgcmV0dXJuIGpzb25PYmo7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZ19tZXMud2FybmluZ19tZXNzYWdlKFwi44Ot44O844OJ44Gn44GN44G+44Gb44KT44Gn44GX44GfXFxuXCIgKyBqc29uT2JqLmVtc2cpO1xyXG4gICAgICAgICAgICBfYWxlcnQoanNvbk9iai5lbXNnKTtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldF9tYXplX2luZm8oY2FsbGJhY2s/OiBUX2NhbGxiYWNrKTogUHJvbWlzZTxhbnl8dW5kZWZpbmVkPiB7XHJcbiAgICBjb25zdCBvcHQgPSBuZXcgQ19VcmxPcHQoKTtcclxuICAgIG9wdC5zZXQoJ21vZGUnLCAgICAgICAgJ21hemVfaW5mbycpOyBcclxuLy8gICAgcmV0dXJuIGF3YWl0IFBPU1RfYW5kX2dldF9KU09OKGdfdXJsW2dfdXJsX2d0Ml9tYXplXSwgb3B0KT8udGhlbihqc29uT2JqPT57XHJcbiAgICByZXR1cm4gYXdhaXQgUE9TVF9hbmRfZ2V0X0pTT04zKGdfdXJsW2dfdXJsX2FsbF9tYXplXSwgb3B0KT8udGhlbihqc29uT2JqPT57XHJcbiAgICAgICAgaWYgKGpzb25PYmouZWNvZGUgPT09IDApIHtcclxuICAgICAgICAgICAgZ19tZXMubm9ybWFsX21lc3NhZ2UoJ+ato+W4uOOBq+ODreODvOODieOBleOCjOOBvuOBl+OBnycpO1xyXG4gICAgICAgICAgICBpZiAoanNvbk9iaj8uZGF0YT8ubWF6ZWluZm8gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgZ19tZXMud2FybmluZ19tZXNzYWdlKFwi6L+35a6u5oOF5aCx44GM5LiN5q2j44Gq5b2i5byP44Gn44GX44GfXFxuXCIgKyBqc29uT2JqLmVtc2cpO1xyXG4gICAgICAgICAgICAgICAgX2FsZXJ0KGpzb25PYmouZW1zZyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgIGNvbnN0IG1vbml0b3IgPSBmYWxzZTsgIC8vIGFsZXJ044Gn5Y+X5L+h44GX44Gf44OG44Kt44K544OI44KS6KGo56S644GZ44KL44Go44GN44GrdHJ1ZeOBq+OBmeOCi1xyXG4gICAgICAgICAgICBpZiAobW9uaXRvcikge1xyXG4gICAgICAgICAgICAgICAgaWYgKGpzb25PYmo/LmRhdGE/Lm1hemVpbmZvICAhPT0gdW5kZWZpbmVkKSB7IFxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgbWF6ZWluZm8gb2YganNvbk9iai5kYXRhLm1hemVpbmZvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0X21hemVpbmZvX2luZm8obWF6ZWluZm8pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2sgIT09IHVuZGVmaW5lZCkgY2FsbGJhY2soanNvbk9iaj8uZGF0YT8ubWF6ZWluZm8pO1xyXG4gICAgICAgICAgICByZXR1cm4ganNvbk9iaj8uZGF0YT8ubWF6ZWluZm87XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZ19tZXMud2FybmluZ19tZXNzYWdlKFwi44Ot44O844OJ44Gn44GN44G+44Gb44KT44Gn44GX44GfXFxuXCIgKyBqc29uT2JqLmVtc2cpO1xyXG4gICAgICAgICAgICBfYWxlcnQoanNvbk9iai5lbXNnKTtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldF9uZXdfaGVybyhudW06IG51bWJlciA9IDIwLCBjYWxsYmFjaz86IFRfY2FsbGJhY2spOiBQcm9taXNlPGFueXx1bmRlZmluZWQ+IHtcclxuICAgIGNvbnN0IG9wdCA9IG5ldyBDX1VybE9wdCgpO1xyXG4gICAgb3B0LnNldCgnbW9kZScsICAgICAgICAnbmV3X2hlcm8nKTsgXHJcbi8vICAgIG9wdC5zZXQoJ251bWJlcicsICAgICAgIG51bS50b1N0cmluZygpKTtcclxuLy8gICAgcmV0dXJuIGF3YWl0IFBPU1RfYW5kX2dldF9KU09OKGdfdXJsW2dfdXJsX2d0Ml9ndWxkXSwgb3B0KT8udGhlbihqc29uT2JqPT57XHJcbiAgICBvcHQuc2V0KCdubWJyJywgICAgICAgICBudW0udG9TdHJpbmcoKSk7XHJcbiAgICByZXR1cm4gYXdhaXQgUE9TVF9hbmRfZ2V0X0pTT04zKGdfdXJsW2dfdXJsX2FsbF9ocmVzXSwgb3B0KT8udGhlbihqc29uT2JqPT57XHJcbiAgICAgICAgaWYgKGpzb25PYmouZWNvZGUgPT09IDApIHtcclxuICAgICAgICAgICAgZ19tZXMubm9ybWFsX21lc3NhZ2UoJ+ato+W4uOOBq+ODreODvOODieOBleOCjOOBvuOBl+OBnycpO1xyXG4gICAgICAgICAgICBpZiAoanNvbk9iaj8uZGF0YT8uaHJlcyAgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgZ19tZXMud2FybmluZ19tZXNzYWdlKFwi44OS44O844Ot44O844O744OH44O844K/44GM5LiN5q2j44Gq5b2i5byP44Gn44GX44GfXFxuXCIgKyBqc29uT2JqLmVtc2cpO1xyXG4gICAgICAgICAgICAgICAgX2FsZXJ0KGpzb25PYmouZW1zZyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAgICAgY29uc3QgbW9uaXRvciA9IGZhbHNlOyAgLy8gYWxlcnTjgaflj5fkv6HjgZfjgZ/jg4bjgq3jgrnjg4jjgpLooajnpLrjgZnjgovjgajjgY3jgat0cnVl44Gr44GZ44KLXHJcbiAgICAgICAgICAgIGlmIChtb25pdG9yKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoanNvbk9iaj8uZGF0YT8uaHJlcyAgIT09IHVuZGVmaW5lZCkgYWxlcnRfaHJlc19pbmZvKGpzb25PYmouZGF0YS5ocmVzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2sgIT09IHVuZGVmaW5lZCkgY2FsbGJhY2soanNvbk9iaj8uZGF0YSk7XHJcbiAgICAgICAgICAgIHJldHVybiBqc29uT2JqPy5kYXRhO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGdfbWVzLndhcm5pbmdfbWVzc2FnZShcIuODreODvOODieOBp+OBjeOBvuOBm+OCk+OBp+OBl+OBn1xcblwiICsganNvbk9iai5lbXNnKTtcclxuICAgICAgICAgICAgX2FsZXJ0KGpzb25PYmouZW1zZyk7XHJcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdG1wX2xvYWQob3B0PzogQ19VcmxPcHQsIGNhbGxiYWNrPzogVF9jYWxsYmFjayk6IFByb21pc2U8YW55fHVuZGVmaW5lZD4ge1xyXG4gICAgb3B0ID8/PSBuZXcgQ19VcmxPcHQoKTtcclxuICAgIG9wdC5zZXQoJ21vZGUnLCAgICAgICAndG1wX2xvYWQnKTsgXHJcbiAgICBvcHQuc2V0KCdwaWQnLCAgIGdfc3RhcnRfZW52LnBpZCk7IFxyXG4gICAgb3B0LnNldCgndW5vJywgICAgICAgICAgICAgICAxMDApOyBcclxuICAgIHJldHVybiBfX2F1dG9fbG9hZChvcHQsIGNhbGxiYWNrKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGluc3RhbnRfbG9hZChvcHQ/OiBDX1VybE9wdCwgY2FsbGJhY2s/OiBUX2NhbGxiYWNrKTogUHJvbWlzZTxhbnl8dW5kZWZpbmVkPiB7XHJcbiAgICBvcHQgPz89IG5ldyBDX1VybE9wdCgpO1xyXG4gICAgb3B0LnNldCgnbW9kZScsICAgJ2luc3RhbnRfbG9hZCcpOyBcclxuICAgIG9wdC5zZXQoJ3BpZCcsICAgZ19zdGFydF9lbnYucGlkKTsgXHJcbiAgICBvcHQuc2V0KCd1bm8nLCAgICAgICAgICAgICAgIDEwMSk7IFxyXG4gICAgcmV0dXJuIF9fYXV0b19sb2FkKG9wdCwgY2FsbGJhY2spO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gVURfbG9hZChvcHQ/OiBDX1VybE9wdCwgY2FsbGJhY2s/OiBUX2NhbGxiYWNrKTogUHJvbWlzZTxhbnl8dW5kZWZpbmVkPiB7XHJcbiAgICBvcHQgPz89IG5ldyBDX1VybE9wdCgpO1xyXG4gICAgb3B0LnNldCgnbW9kZScsICAgICAgICAnVURfbG9hZCcpOyBcclxuICAgIG9wdC5zZXQoJ3BpZCcsICAgZ19zdGFydF9lbnYucGlkKTsgXHJcbiAgICBvcHQuc2V0KCd1bm8nLCAgICAgICAgICAgICAgIDEwMik7IFxyXG4gICAgcmV0dXJuIF9fYXV0b19sb2FkKG9wdCwgY2FsbGJhY2spO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYmVmb3JlX2xvYWQob3B0PzogQ19VcmxPcHQsIGNhbGxiYWNrPzogVF9jYWxsYmFjayk6IFByb21pc2U8YW55fHVuZGVmaW5lZD4ge1xyXG4gICAgb3B0ID8/PSBuZXcgQ19VcmxPcHQoKTtcclxuICAgIG9wdC5zZXQoJ21vZGUnLCAgICAnYmVmb3JlX2xvYWQnKTsgXHJcbiAgICBvcHQuc2V0KCdwaWQnLCAgIGdfc3RhcnRfZW52LnBpZCk7IFxyXG4gICAgb3B0LnNldCgndW5vJywgICAgICAgICAgICAgICAxMDMpOyBcclxuICAgIHJldHVybiBfX2F1dG9fbG9hZChvcHQsIGNhbGxiYWNrKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYWxfbG9hZCh1bmlxX25vOiBudW1iZXIsIG9wdD86IENfVXJsT3B0LCBjYWxsYmFjaz86IFRfY2FsbGJhY2spOiBQcm9taXNlPGFueXx1bmRlZmluZWQ+IHtcclxuICAgIG9wdCA/Pz0gbmV3IENfVXJsT3B0KCk7XHJcbiAgICBvcHQuc2V0KCdtb2RlJywgICAnZ2VuZXJhbF9sb2FkJyk7IFxyXG4gICAgb3B0LnNldCgncGlkJywgICBnX3N0YXJ0X2Vudi5waWQpOyBcclxuICAgIG9wdC5zZXQoJ3VubycsICAgICAgICAgICB1bmlxX25vKTsgXHJcbiAgICByZXR1cm4gX19hdXRvX2xvYWQob3B0LCBjYWxsYmFjayk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIF9fYXV0b19sb2FkKG9wdDogQ19VcmxPcHQsIGNhbGxiYWNrPzogVF9jYWxsYmFjayk6IFByb21pc2U8YW55fHVuZGVmaW5lZD4ge1xyXG5cclxuLy8gICAgcmV0dXJuIFBPU1RfYW5kX2dldF9KU09OKGdfdXJsW2dfdXJsX2d0Ml9zYXZlXSwgb3B0KT8udGhlbihqc29uT2JqPT57XHJcbiAgICByZXR1cm4gUE9TVF9hbmRfZ2V0X0pTT04zKGdfdXJsW2dfdXJsX2dldF9kYXRhXSwgb3B0KT8udGhlbihqc29uT2JqPT57XHJcbiAgICAgICAgaWYgKGpzb25PYmouZWNvZGUgPT09IDApIHtcclxuICAgICAgICAgICAgZ19tZXMubm9ybWFsX21lc3NhZ2UoJ+ato+W4uOOBq+ODreODvOODieOBleOCjOOBvuOBl+OBnycpO1xyXG4gXHJcbiAgICAgICAgICAgIGlmIChqc29uT2JqPy5zYXZlICA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBnX21lcy53YXJuaW5nX21lc3NhZ2UoXCLlj5fkv6HjgZfjgZ/kv53lrZjjg4fjg7zjgr/jgYzkuI3mraPjgarlvaLlvI/jgafjgZfjgZ9cXG5cIiArIGpzb25PYmouZW1zZyk7XHJcbiAgICAgICAgICAgICAgICBfYWxlcnQoanNvbk9iai5lbXNnKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgICAgICBjb25zdCBtb25pdG9yID0gZmFsc2U7ICAvLyBhbGVydOOBp+WPl+S/oeOBl+OBn+ODhuOCreOCueODiOOCkuihqOekuuOBmeOCi+OBqOOBjeOBq3RydWXjgavjgZnjgotcclxuICAgICAgICAgICAgaWYgKG1vbml0b3IpIHtcclxuICAgICAgICAgICAgICAgIGlmIChqc29uT2JqPy5zYXZlICAgICAgICAgICAgICAgICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydF9zYXZlX2luZm8oanNvbk9iai5zYXZlKTtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydF9zYXZlX2RldGFpbChqc29uT2JqLnNhdmUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgIGlmIChjYWxsYmFjayAhPT0gdW5kZWZpbmVkKSBjYWxsYmFjayhqc29uT2JqKTtcclxuICAgICAgICAgICAgcmV0dXJuIGpzb25PYmo7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZ19tZXMud2FybmluZ19tZXNzYWdlKGDjg63jg7zjg4njgafjgY3jgb7jgZvjgpPjgafjgZfjgZ8ke2pzb25PYmouZWNvZGV9XFxuYCArIGpzb25PYmouZW1zZyk7XHJcbiAgICAgICAgICAgIF9hbGVydChqc29uT2JqLmVtc2cpO1xyXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHRtcF9zYXZlKG9wdD86IENfVXJsT3B0LCBjYWxsYmFjaz86IFRfY2FsbGJhY2spOiBQcm9taXNlPGFueXx1bmRlZmluZWQ+IHsgXHJcbiAgICBvcHQgPz89IG5ldyBDX1VybE9wdCgpO1xyXG4gICAgb3B0LnNldCgnbW9kZScsICAgICAgICd0bXBfc2F2ZScpOyBcclxuICAgIG9wdC5zZXQoJ3BpZCcsICAgZ19zdGFydF9lbnYucGlkKTsgXHJcbiAgICBvcHQuc2V0KCd1bm8nLCAgICAgICAgICAgICAgIDEwMCk7IFxyXG4gICAgcmV0dXJuIF9fYXV0b19zYXZlKG9wdCwgY2FsbGJhY2spO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaW5zdGFudF9zYXZlKG9wdD86IENfVXJsT3B0LCBjYWxsYmFjaz86IFRfY2FsbGJhY2spOiBQcm9taXNlPGFueXx1bmRlZmluZWQ+IHsgXHJcbiAgICBvcHQgPz89IG5ldyBDX1VybE9wdCgpO1xyXG4gICAgb3B0LnNldCgnbW9kZScsICAgJ2luc3RhbnRfc2F2ZScpOyBcclxuICAgIG9wdC5zZXQoJ3BpZCcsICAgZ19zdGFydF9lbnYucGlkKTsgXHJcbiAgICBvcHQuc2V0KCd1bm8nLCAgICAgICAgICAgICAgIDEwMSk7IFxyXG4gICAgcmV0dXJuIF9fYXV0b19zYXZlKG9wdCwgY2FsbGJhY2spO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gVURfc2F2ZShvcHQ/OiBDX1VybE9wdCwgY2FsbGJhY2s/OiBUX2NhbGxiYWNrKTogUHJvbWlzZTxhbnl8dW5kZWZpbmVkPiB7IFxyXG4gICAgb3B0ID8/PSBuZXcgQ19VcmxPcHQoKTtcclxuICAgIG9wdC5zZXQoJ21vZGUnLCAgICAgICAgJ1VEX3NhdmUnKTsgXHJcbiAgICBvcHQuc2V0KCdwaWQnLCAgIGdfc3RhcnRfZW52LnBpZCk7IFxyXG4gICAgb3B0LnNldCgndW5vJywgICAgICAgICAgICAgICAxMDIpOyBcclxuICAgIHJldHVybiBfX2F1dG9fc2F2ZShvcHQsIGNhbGxiYWNrKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGJlZm9yZV9zYXZlKG9wdD86IENfVXJsT3B0LCBjYWxsYmFjaz86IFRfY2FsbGJhY2spOiBQcm9taXNlPGFueXx1bmRlZmluZWQ+IHsgXHJcbiAgICBvcHQgPz89IG5ldyBDX1VybE9wdCgpO1xyXG4gICAgb3B0LnNldCgnbW9kZScsICAgICdiZWZvcmVfc2F2ZScpOyBcclxuICAgIG9wdC5zZXQoJ3BpZCcsICAgZ19zdGFydF9lbnYucGlkKTsgXHJcbiAgICBvcHQuc2V0KCd1bm8nLCAgICAgICAgICAgICAgIDEwMyk7IFxyXG4gICAgcmV0dXJuIF9fYXV0b19zYXZlKG9wdCwgY2FsbGJhY2spO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhbF9zYXZlKG9wdD86IENfVXJsT3B0LCBjYWxsYmFjaz86IFRfY2FsbGJhY2spOiBQcm9taXNlPGFueXx1bmRlZmluZWQ+IHtcclxuICAgIGdfc2F2ZS5hdXRvX21vZGUgPSBmYWxzZTtcclxuXHJcbiAgICBvcHQgPz89IG5ldyBDX1VybE9wdCgpO1xyXG4gICAgb3B0LnNldCgnbW9kZScsICAgJ2dlbmVyYWxfc2F2ZScpOyBcclxuICAgIG9wdC5zZXQoJ3BpZCcsICAgZ19zdGFydF9lbnYucGlkKTsgXHJcbiAgICByZXR1cm4gX19zYXZlKG9wdCwgY2FsbGJhY2spO1xyXG59XHJcblxyXG5mdW5jdGlvbiBfX2F1dG9fc2F2ZShvcHQ6IENfVXJsT3B0LCBjYWxsYmFjaz86IFRfY2FsbGJhY2spOiBQcm9taXNlPGFueXx1bmRlZmluZWQ+IHtcclxuICAgIGdfc2F2ZS5hdXRvX21vZGUgPSB0cnVlO1xyXG4gICAgcmV0dXJuIF9fc2F2ZShvcHQsIGNhbGxiYWNrKTtcclxufSBcclxuZnVuY3Rpb24gX19zYXZlKG9wdDogQ19VcmxPcHQsIGNhbGxiYWNrPzogVF9jYWxsYmFjayk6IFByb21pc2U8YW55fHVuZGVmaW5lZD4geyBcclxuICAgIGlmICghb3B0Lmlzc2V0KCdzYXZlJykpIHtcclxuICAgICAgICBvcHQuc2V0KCdzYXZlJywgSlNPTi5zdHJpbmdpZnkoZ19zYXZlLmVuY29kZSgpLCBudWxsLCBcIlxcdFwiKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g6YCB5L+h44OH44O844K/44KSY2hlY2tfSlNPTi5waHDjgavpgIHjgaPjgabjg4Hjgqfjg4Pjgq/jgZnjgovjgajjgY3jgat0cnVl44Gr44GZ44KL44CCXHJcbiAgICBjb25zdCBtb3ZlX3BhZ2UgPSBmYWxzZTtcclxuXHJcbiAgICBpZiAobW92ZV9wYWdlKSB7XHJcbiAgICAgICAgUE9TVF9hbmRfbW92ZV9wYWdlKGdfdXJsW2dfdXJsX2NoZWNrX0pTT05dLCBvcHQpO1xyXG4gICAgfVxyXG5cclxuLy8gICAgcmV0dXJuIFBPU1RfYW5kX2dldF9KU09OKGdfdXJsW2dfdXJsX2d0Ml9zYXZlXSwgb3B0KT8udGhlbihqc29uT2JqPT57XHJcbiAgICByZXR1cm4gUE9TVF9hbmRfZ2V0X0pTT04zKGdfdXJsW2dfdXJsX3B1dF9kYXRhXSwgb3B0KT8udGhlbihqc29uT2JqPT57XHJcbiAgICAgICAgaWYgKGpzb25PYmo/LmVjb2RlID09PSAwKSB7XHJcbiBcclxuICAgICAgICAgICAgaWYgKGpzb25PYmo/LnNhdmUgID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGdfbWVzLndhcm5pbmdfbWVzc2FnZShcIuWPl+S/oeOBl+OBn+S/neWtmOODh+ODvOOCv+OBjOS4jeato+OBquW9ouW8j+OBp+OBl+OBn1xcblwiICsganNvbk9iai5lbXNnKTtcclxuICAgICAgICAgICAgICAgIF9hbGVydChqc29uT2JqLmVtc2cpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgICAgIGNvbnN0IG1vbml0b3IgPSBmYWxzZTsgIC8vIGFsZXJ044Gn5Y+X5L+h44GX44Gf44OG44Kt44K544OI44KS6KGo56S644GZ44KL44Go44GN44GrdHJ1ZeOBq+OBmeOCi1xyXG4gICAgICAgICAgICBpZiAobW9uaXRvcikge1xyXG4gICAgICAgICAgICAgICAgaWYgKGpzb25PYmo/LnNhdmUgICAgICAgICAgICAgICAgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0X3NhdmVfaW5mbyhqc29uT2JqLnNhdmUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0X3NhdmVfZGV0YWlsKGpzb25PYmouc2F2ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrICE9PSB1bmRlZmluZWQpIGNhbGxiYWNrKGpzb25PYmopO1xyXG4gICAgICAgICAgICBnX21lcy5ub3JtYWxfbWVzc2FnZSgn5q2j5bi444Gr44K744O844OW44GV44KM44G+44GX44GfJyk7XHJcbiAgICAgICAgICAgIHJldHVybiBqc29uT2JqO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGdfbWVzLndhcm5pbmdfbWVzc2FnZShcIuOCu+ODvOODluOBp+OBjeOBvuOBm+OCk+OBp+OBl+OBn1xcblwiICsganNvbk9iai5lbXNnKTtcclxuICAgICAgICAgICAgX2FsZXJ0KGpzb25PYmouZW1zZyk7XHJcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfSkuIGNhdGNoKGVycj0+e1xyXG4gICAgICAgIGdfbWVzLndhcm5pbmdfbWVzc2FnZSgnUE9TVOiqreOBv+i+vOOBv+OBq+WkseaVl+OBl+OBvuOBl+OBnyhQT1NUX0FORF9KU09OMyknKTtcclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfSk7XHJcblxyXG4vLyAgICBQT1NUX2FuZF9tb3ZlX3BhZ2UoZ191cmxbZ191cmxfY2hlY2tfSlNPTl0sIG9wdCk7IHJldHVybiB7ZWNvZGU6IDB9O1xyXG59XHJcblxyXG4iLCJleHBvcnQgY29uc3QgZ191cmxfZ2V0X21hemUgICAgPSAgMDtcclxuZXhwb3J0IGNvbnN0IGdfdXJsX25ld19tYXplICAgID0gIDE7XHJcblxyXG5leHBvcnQgY29uc3QgZ191cmxfYWxsX21hemUgICAgPSAgMjtcclxuZXhwb3J0IGNvbnN0IGdfdXJsX25ld19ndWxkICAgID0gIDU7XHJcbmV4cG9ydCBjb25zdCBnX3VybF9hbGxfaHJlcyAgICA9ICA2O1xyXG5leHBvcnQgY29uc3QgZ191cmxfZ2V0X3NhdmUgICAgPSAgNztcclxuZXhwb3J0IGNvbnN0IGdfdXJsX3B1dF9zYXZlICAgID0gIDg7XHJcbmV4cG9ydCBjb25zdCBnX3VybF9hbGxfc2F2ZSAgICA9ICA5O1xyXG5leHBvcnQgY29uc3QgZ191cmxfbWFpX21hemUgICAgPSAxMDtcclxuZXhwb3J0IGNvbnN0IGdfdXJsX21haV9ndWxkICAgID0gMTE7XHJcbmV4cG9ydCBjb25zdCBnX3VybF9nZXRfaW5mbyAgICA9IDEyO1xyXG5leHBvcnQgY29uc3QgZ191cmxfZ2V0X2RhdGEgICAgPSAxMztcclxuZXhwb3J0IGNvbnN0IGdfdXJsX3B1dF9kYXRhICAgID0gMTU7XHJcblxyXG5leHBvcnQgY29uc3QgZ191cmxfY2hlY2tfSlNPTiAgPSAxNjtcclxuXHJcbmV4cG9ydCBjb25zdCBnX3VybF9yY2RfbGlzdCAgICA9IDE3O1xyXG5leHBvcnQgY29uc3QgZ191cmxfcmNkX2xvYWQgICAgPSAxODtcclxuZXhwb3J0IGNvbnN0IGdfdXJsX3JjZF9zYXZlICAgID0gMTk7XHJcblxyXG5leHBvcnQgY29uc3QgZ191cmxfZ3QyX2d1bGQgICAgPSAyMDtcclxuZXhwb3J0IGNvbnN0IGdfdXJsX2d0Ml9tYXplICAgID0gMjE7XHJcbmV4cG9ydCBjb25zdCBnX3VybF9ndDJfc2F2ZSAgICA9IDIyO1xyXG5leHBvcnQgY29uc3QgZ191cmw6IHN0cmluZ1tdID0gbmV3IEFycmF5KDIzKTtcclxuXHJcbmV4cG9ydCBsZXQgICBnX215X3VybDogc3RyaW5nO1xyXG5cclxuaW1wb3J0IHsgQ19Pbk9mZkJ1dHRvbiB9IGZyb20gJy4uL2RfY3RsL0NfT25PZmZCdXR0b24nXHJcbmV4cG9ydCB2YXIgZ19kZWJ1ZzogQ19Pbk9mZkJ1dHRvbjtcclxuXHJcbmltcG9ydCB7IENfQWxlcnRMb2cgfSAgICBmcm9tIFwiLi4vZF9jbW4vQ19BbGVydExvZ1wiO1xyXG5leHBvcnQgbGV0IGdfYWxlcnQ6IENfQWxlcnRMb2c7XHJcblxyXG4vL2V4cG9ydCB2YXIgZ19waWQ6IG51bWJlcltdID0gbmV3IEFycmF5KDEpIGFzIG51bWJlcltdO1xyXG5cclxuY2xhc3MgQ19SZWFkeUdhbWVzICB7XHJcbiAgICBwcm90ZWN0ZWQgZmxnczoge1tpZDogc3RyaW5nXTogYm9vbGVhbn07IFxyXG4gICAgcHJvdGVjdGVkIGZ1bmM6ICgpPT52b2lkO1xyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuZmxncyA9IHt9O1xyXG4gICAgICAgIHRoaXMuZmxncy5sb2FkZWRET00gPSBmYWxzZTsgXHJcbiAgICAgICAgdGhpcy5mbGdzLmdldFdpbmRvdyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZnVuYyA9ICgpPT57fTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXRMb2FkZWRET00oKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5mbGdzLmxvYWRlZERPTSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5jaGVja19hbmRfZG8oKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXRHZXRXaW5kb3coKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5mbGdzLmdldFdpbmRvdyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5jaGVja19hbmRfZG8oKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXRGdW5jdGlvbihmdW5jOiAoKT0+dm9pZCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZnVuYyA9IGZ1bmM7XHJcbiAgICAgICAgdGhpcy5jaGVja19hbmRfZG8oKTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBjaGVja19hbmRfZG8oKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuZnVuYyA9PT0gdW5kZWZpbmVkKSByZXR1cm47XHJcbiAgICAgICAgZm9yIChsZXQgaWkgaW4gdGhpcy5mbGdzKSBpZiAoIXRoaXMuZmxnc1tpaV0pIHJldHVybjtcclxuICAgICAgICB0aGlzLmZ1bmMoKTsgXHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGNvbnN0IGdfcmVhZHlfZ2FtZXMgPSBuZXcgQ19SZWFkeUdhbWVzKCk7XHJcblxyXG5leHBvcnQgY29uc3QgZ19zdGFydF9lbnYgPSB7bW9kZTogJycsIHBpZDogLTEsIG9wdDogJyd9O1xyXG5cclxuaW1wb3J0IHsgQ19EaXNwbGF5TWVzc2FnZSB9IGZyb20gXCIuLi9kX3ZpZS9DX0Rpc3BsYXlNZXNzYWdlXCI7XHJcbmV4cG9ydCB2YXIgZ19tZXM6IENfRGlzcGxheU1lc3NhZ2U7XHJcblxyXG5pbXBvcnQgeyBDX1NhdmVEYXRhIH0gICAgICAgICBmcm9tIFwiLi4vZF9tZGwvQ19TYXZlRGF0YVwiO1xyXG5leHBvcnQgY29uc3QgZ19zYXZlID0gbmV3IENfU2F2ZURhdGEoKTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpbml0X2FmdGVyX2xvYWRlZF9ET01faW5fY29tbW9uKGRlYnVnX2lkOiBzdHJpbmcgPSAnZGVidWdfbW9kZScsIG1zZ19pZDogc3RyaW5nID0gJ3BhbmVfc3l0bV9sb2dzJyk6IHZvaWQge1xyXG4gICAgY29uc3QgIGNvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKG1zZ19pZCk7XHJcbiAgICBnX21lcyAgPSBDX0Rpc3BsYXlNZXNzYWdlLmdldE9iaihjb24sICdjbGllbnRfbWVzc2FnZScpO1xyXG4gICAgZ19hbGVydCA9IENfQWxlcnRMb2cuZ2V0T2JqKCk7XHJcblxyXG4gICAgY29uc3QgYnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZGVidWdfaWQpIGFzIEhUTUxCdXR0b25FbGVtZW50O1xyXG4gICAgZ19kZWJ1ZyA9IENfT25PZmZCdXR0b24uZ2V0T2JqKGJ0biwge30pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX2FsZXJ0KHR4dDogc3RyaW5nLCBwYWdlX3NpemUgPSAyNTApOiB2b2lkIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdHh0Lmxlbmd0aDsgaSArPSBwYWdlX3NpemUpIHtcclxuICAgICAgICBpZiAoIXdpbmRvdy5jb25maXJtKHR4dC5zdWJzdHJpbmcoaSwgaStwYWdlX3NpemUpKSkgYnJlYWs7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5cclxuLy8g5Lul5LiL44CBSFRNTOWBtOOBi+OCieWRvOOBs+WHuuOBm+OCi+mWouaVsOOBruWumue+qVxyXG4vLyB3aW5kb3fjgqrjg5bjgrjjgqfjgq/jg4jjgavmuKHjgZnjgqTjg7Pjgr/jg7zjg5Xjgqfjg7zjgrnjgpLlrprnvqlcclxuaW50ZXJmYWNlIElfVHNDYWxsIHtcclxuICAgIGdldF9pbml0X2RhdGE6ICh1cmxfYmFzZTogc3RyaW5nKT0+dm9pZCxcclxuICAgIHN0YXJ0X2dhbWU6ICAgIChtb2RlOiBzdHJpbmcsIHVybF9iYXNlOiBzdHJpbmcsIHBsYXllcl9pZDogbnVtYmVyLCBvcHRpb246IHN0cmluZyk9PnZvaWQsIFxyXG59XHJcbi8vIHdpbmRvd+OCquODluOCuOOCp+OCr+ODiOOBq+OCpOODs+OCv+ODvOODleOCp+ODvOOCueOBruWumue+qeOCkui/veWKoFxyXG5kZWNsYXJlIGdsb2JhbCB7XHJcbiAgICBpbnRlcmZhY2UgV2luZG93IHtcclxuICAgICAgICB0c0NhbGw6IElfVHNDYWxsO1xyXG4gICAgfVxyXG59XHJcbi8vIOOCpOODs+OCv+ODvOODleOCp+ODvOOCueOBruWun+ijhVxyXG4vL++8iOOBqeOBhuOChOOCieOCpOODs+OCv+ODvOODleOCp+ODvOOCueOBr+ODl+ODreODkeODhuOCo+Wumue+qeOBruOCquODluOCuOOCp+OCr+ODiOOBq+OBquOBo+OBpuOCi+OCieOBl+OBhO+8iVxyXG5jb25zdCB0c0NhbGxlcjogSV9Uc0NhbGwgPSAoKCkgPT4ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBnZXRfaW5pdF9kYXRhOiAobXlfdXJsOiBzdHJpbmcpOiB2b2lkID0+IHtcclxuICAgICAgICAgICAgZ19teV91cmwgPSBteV91cmw7XHJcbiAgICAgICAgICAgIGNvbnN0IHVybF90b3AgPSBwYXJlbnRfdXJsKG15X3VybCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGV4cF90b3AgPSBwYXJlbnRfdXJsKHVybF90b3ApICsgXCIvbWFpZXhcIjtcclxuXHJcbiAgICAgICAgICAgIGdfdXJsW2dfdXJsX2d0Ml9zYXZlXSAgID0gdXJsX3RvcCArIFwiL19KU09OX21haV9zYXZlLnBocFwiO1xyXG4gICAgICAgICAgICBnX3VybFtnX3VybF9ndDJfbWF6ZV0gICA9IHVybF90b3AgKyBcIi9fSlNPTl9tYWlfbWF6ZS5waHBcIjtcclxuICAgICAgICAgICAgZ191cmxbZ191cmxfZ3QyX2d1bGRdICAgPSB1cmxfdG9wICsgXCIvX0pTT05fbWFpX2d1bGQucGhwXCI7XHJcblxyXG4gICAgICAgICAgICBnX3VybFtnX3VybF9tYWlfbWF6ZV0gICA9IHVybF90b3AgKyBcIi9tYWlfbWF6ZS5waHBcIjtcclxuICAgICAgICAgICAgZ191cmxbZ191cmxfbWFpX2d1bGRdICAgPSB1cmxfdG9wICsgXCIvbWFpX2d1bGQucGhwXCI7XHJcblxyXG4gICAgICAgICAgICBnX3VybFtnX3VybF9uZXdfbWF6ZV0gICA9IGV4cF90b3AgKyBcIi9tYXplL25ld01hemVcIjtcclxuICAgICAgICAgICAgZ191cmxbZ191cmxfZ2V0X21hemVdICAgPSBleHBfdG9wICsgXCIvbWF6ZS9nZXRNYXplXCI7XHJcbiAgICAgICAgICAgIGdfdXJsW2dfdXJsX2FsbF9tYXplXSAgID0gZXhwX3RvcCArIFwiL21hemUvYWxsTWF6ZVwiO1xyXG4gICAgICAgICAgICBnX3VybFtnX3VybF9uZXdfZ3VsZF0gICA9IGV4cF90b3AgKyBcIi9ndWxkL25ld0d1bGRcIjtcclxuICAgICAgICAgICAgZ191cmxbZ191cmxfYWxsX2hyZXNdICAgPSBleHBfdG9wICsgXCIvZ3VsZC9hbGxIcmVzXCI7XHJcblxyXG4gICAgICAgICAgICBnX3VybFtnX3VybF9nZXRfaW5mb10gICA9IGV4cF90b3AgKyBcIi9sZHN2L19pbmZvXCI7XHJcbiAgICAgICAgICAgIGdfdXJsW2dfdXJsX2dldF9kYXRhXSAgID0gZXhwX3RvcCArIFwiL2xkc3YvX2xvYWRcIjtcclxuICAgICAgICAgICAgZ191cmxbZ191cmxfcHV0X2RhdGFdICAgPSBleHBfdG9wICsgXCIvbGRzdi9fc2F2ZVwiO1xyXG5cclxuICAgICAgICAgICAgZ191cmxbZ191cmxfY2hlY2tfSlNPTl0gPSB1cmxfdG9wICsgXCIvY2hlY2tfSlNPTi5waHBcIjtcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8vIOaaq+WumueJiOmWi+Wni+WHpueQhlxyXG4gICAgICAgIHN0YXJ0X2dhbWU6IChtb2RlOiBzdHJpbmcsIG15X3VybDogc3RyaW5nLCBwbGF5ZXJfaWQ6IG51bWJlciwgb3B0OiBzdHJpbmcpOiB2b2lkID0+IHtcclxuICAgICAgICAgICAgdHNDYWxsZXIuZ2V0X2luaXRfZGF0YShteV91cmwpOyBcclxuICAgICAgICAgICAgZ19zdGFydF9lbnYubW9kZSA9IG1vZGU7IFxyXG4gICAgICAgICAgICBnX3N0YXJ0X2Vudi5waWQgID0gcGxheWVyX2lkOyBcclxuICAgICAgICAgICAgZ19zdGFydF9lbnYub3B0ICA9IG9wdDsgXHJcblxyXG4gICAgICAgICAgICBnX3JlYWR5X2dhbWVzLnNldEdldFdpbmRvdygpOyBcclxuICAgICAgICB9IFxyXG4gICAgfTtcclxufSkoKTtcclxuXHJcbmZ1bmN0aW9uIHBhcmVudF91cmwodXJsOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgbGV0IHJlID0gL1xcL1teXFwvXSs/JC87XHJcbiAgICByZXR1cm4gdXJsLnJlcGxhY2UocmUsICcnKTtcclxufVxyXG5cclxuLy8gd2luZG9344Kq44OW44K444Kn44Kv44OI44Gr6L+95Yqg44GX44Gf44Kk44Oz44K/44O844OV44Kn44O844K544Gr5LiK6KiY44Gu5a6f6KOF44KS5Luj5YWlXHJcbndpbmRvdy50c0NhbGwgPSB0c0NhbGxlcjtcclxuXHJcbi8vIOOBk+OCjOOBp0hUTUzlgbTjga5zY3JpcHTjgr/jgrDlhoXjgYvjgokgPHNjcmlwdD53aW5kb3dzLnRzQ2FsbC5nZXRwbGF5ZXIoMSk7PC9zY3JpcHQ+XHJcbi8vIOOBv+OBn+OBhOOBq+WRvOOBs+WHuuOBm+OCi+OAguOBn+OBoOOBl+OAgWJ1bmRsZS5qc+OBrnNjcmlwdOOCv+OCsOOBp3R5cGXlsZ7mgKfjgpJtb2R1bGXjgavjgZfjgabjgYTjgovjgajlpLHmlZfjgZnjgovjgIJcclxuXHJcblxyXG4iLCJpbXBvcnQgeyBfY2VpbCwgX2Zsb29yLCBfaXNOdW0gfSBmcm9tIFwiLi4vZF91dGwvRl9NYXRoXCI7XHJcbmltcG9ydCB7IF9hbGVydCB9ICAgICAgICAgICAgICAgIGZyb20gXCIuLi9kX2Ntbi9nbG9iYWxcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBDX0N0bEN1cnNvciB7XHJcbiAgICBwcm90ZWN0ZWQgc3RhdGljIG1lOiB7W2lkOiBzdHJpbmddOiBDX0N0bEN1cnNvcn07XHJcblxyXG4gICAgcHJvdGVjdGVkIF9pZDogICBzdHJpbmc7XHJcbiAgICBwcm90ZWN0ZWQgX2xpc3Q6IEhUTUxFbGVtZW50fHVuZGVmaW5lZDtcclxuICAgIHByb3RlY3RlZCBfbGVuZzogbnVtYmVyO1xyXG4gICAgcHJvdGVjdGVkIF9jb2xzOiBudW1iZXI7XHJcbiAgICBwcm90ZWN0ZWQgX2luZHg6IG51bWJlcjtcclxuXHJcbiAgICBwcm90ZWN0ZWQgY29uc3RydWN0b3IobGlzdD86IEhUTUxFbGVtZW50KSB7XHJcbiAgICAgICAgQ19DdGxDdXJzb3IubWUgPz89IHt9XHJcblxyXG4gICAgICAgIHRoaXMuX2lkICAgPSAnX19kbXlfXyc7XHJcbiAgICAgICAgdGhpcy5fbGlzdCA9IHVuZGVmaW5lZDtcclxuICAgICAgICB0aGlzLl9sZW5nID0gMDtcclxuICAgICAgICB0aGlzLl9jb2xzID0gMTtcclxuICAgICAgICB0aGlzLl9pbmR4ID0gMDtcclxuICAgICAgICBDX0N0bEN1cnNvci5tZVt0aGlzLl9pZF0gPSB0aGlzO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRPYmoobGlzdD86IEhUTUxFbGVtZW50KTogQ19DdGxDdXJzb3IgIHtcclxuICAgICAgICB0aGlzLm1lID8/PSB7fVxyXG5cclxuICAgICAgICBjb25zdCBpZCA9IGxpc3QgIT09IHVuZGVmaW5lZCA/IGxpc3QuaWQgOiAnX19kbXlfXyc7XHJcbiAgICAgICAgdGhpcy5tZVtpZF0gPz89IG5ldyBDX0N0bEN1cnNvcihsaXN0KTtcclxuXHJcbiAgICAgICAgaWYgKGxpc3QgIT09IHVuZGVmaW5lZCkgdGhpcy5tZVtpZF0uc2V0KGxpc3QpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1lW2lkXTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXQobGlzdDogSFRNTEVsZW1lbnQpOiBDX0N0bEN1cnNvciB7XHJcbiAgICAgICAgdGhpcy5faWQgICA9IGxpc3QuaWQ7XHJcbiAgICAgICAgdGhpcy5fbGlzdCA9IGxpc3Q7XHJcbiAgICAgICAgdGhpcy5fbGVuZyA9IHRoaXMuX19nZXRfbGVuZygpO1xyXG4gICAgICAgIHRoaXMuX2NvbHMgPSB0aGlzLl9fZ2V0X2NvbHMoKTtcclxuICAgICAgICB0aGlzLl9pbmR4ID0gMDtcclxuXHJcbiAgICAgICAgdGhpcy5oaWdoX2xpZ2h0X29uKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVpZCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pZDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBsZW5nKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xlbmc7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgcm93cygpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9fZ2V0X3Jvd3MoKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBjb2xzKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbHM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHBvcygpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbmR4O1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldF9wb3MoaW5keDogbnVtYmVyKTogQ19DdGxDdXJzb3Ige1xyXG4gICAgICAgIGlmIChpbmR4IDwgIDApIGluZHggPSAwO1xyXG4gICAgICAgIGlmIChpbmR4ID49IHRoaXMuX2xlbmcpIGluZHggPSB0aGlzLl9sZW5nIC0gMTtcclxuXHJcbiAgICAgICAgdGhpcy5faW5keCA9IGluZHg7IHRoaXMuaGlnaF9saWdodF9vbigpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBwb3NfVSgpOiBudW1iZXIge1xyXG4gICAgICAgIGlmICh0aGlzLl9saXN0ID09PSB1bmRlZmluZWQpIHJldHVybiAwO1xyXG5cclxuICAgICAgICBsZXQgICBpbmR4ID0gdGhpcy5faW5keDtcclxuICAgICAgICBjb25zdCByb3dzID0gdGhpcy5fX2dldF9yb3dzKCk7XHJcbiAgICAgICAgY29uc3QgY3VyX3JvdyAgID0gaW5keCAlIHJvd3M7XHJcbiAgICAgICAgaWYgKGN1cl9yb3cgIT09IDApIHtcclxuICAgICAgICAgICAgLy8g5pyA5LiK5q61KOS4iuerrynku6XlpJZcclxuICAgICAgICAgICAgLS1pbmR4O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIOacgOS4iuautSjkuIrnq68pXHJcbiAgICAgICAgICAgIGluZHggKz0gcm93cyAtIDE7XHJcbiAgICAgICAgICAgIHdoaWxlIChpbmR4ID4gdGhpcy5fbGVuZyAtIDEpIHtcclxuICAgICAgICAgICAgICAgIC0taW5keDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gXHJcbiAgICAgICAgdGhpcy5faW5keCA9IGluZHg7IHRoaXMuaGlnaF9saWdodF9vbigpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbmR4O1xyXG4gICAgfVxyXG4gICAgcHVibGljIHBvc19EKCk6IG51bWJlciB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2xpc3QgPT09IHVuZGVmaW5lZCkgcmV0dXJuIDA7XHJcblxyXG4gICAgICAgIGxldCAgIGluZHggPSB0aGlzLl9pbmR4O1xyXG4gICAgICAgIGNvbnN0IHJvd3MgPSB0aGlzLl9fZ2V0X3Jvd3MoKTtcclxuICAgICAgICBjb25zdCBjdXJfcm93ID0gaW5keCAlIHJvd3M7XHJcbiAgICAgICAgaWYgKGN1cl9yb3cgIT09IHJvd3MgLSAxICYmIGluZHggIT09IHRoaXMuX2xlbmcgLSAxKSB7XHJcbiAgICAgICAgICAgIC8vIOacgOS4i+autSjkuIvnq68p5Lul5aSWXHJcbiAgICAgICAgICAgICsraW5keDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyDmnIDkuIvmrrUo5LiL56uvKVxyXG4gICAgICAgICAgICBpbmR4IC09IHJvd3MgLSAxO1xyXG4gICAgICAgICAgICB3aGlsZSAoaW5keCAlIHJvd3MgIT09IDAgJiYgaW5keCA8IHRoaXMuX2xlbmcgLSAxKSB7XHJcbiAgICAgICAgICAgICAgICArK2luZHg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IFxyXG4gICAgICAgIHRoaXMuX2luZHggPSBpbmR4OyB0aGlzLmhpZ2hfbGlnaHRfb24oKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5faW5keDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBwb3NfTCgpOiBudW1iZXIge1xyXG4gICAgICAgIGlmICh0aGlzLl9saXN0ID09PSB1bmRlZmluZWQpIHJldHVybiAwO1xyXG5cclxuICAgICAgICBsZXQgICBpbmR4ID0gdGhpcy5faW5keDtcclxuICAgICAgICBjb25zdCByb3dzID0gdGhpcy5fX2dldF9yb3dzKCk7XHJcbiAgICAgICAgaWYgKGluZHggID4gcm93cyAtIDEpIHtcclxuICAgICAgICAgICAgLy8g5pyA5YmN5YiXKOW3puerrynku6XlpJZcclxuICAgICAgICAgICAgaW5keCAtPSByb3dzO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIOacgOWJjeWIlyjlt6bnq68pXHJcbiAgICAgICAgICAgIGNvbnN0ICAgdnVydHVhbF9saXN0X2xlbmcgPSB0aGlzLl9jb2xzICogcm93cztcclxuICAgICAgICAgICAgaW5keCArPSB2dXJ0dWFsX2xpc3RfbGVuZyAtIHJvd3M7XHJcbiAgICAgICAgICAgIHdoaWxlIChpbmR4ID4gdGhpcy5fbGVuZyAtIDEpIHtcclxuICAgICAgICAgICAgICAgIGluZHggLT0gcm93cztcclxuICAgICAgICAgICAgICAgIGlmIChpbmR4IDwgMCkge2luZHggPSAwOyBicmVhazt9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IFxyXG4gICAgICAgIHRoaXMuX2luZHggPSBpbmR4OyB0aGlzLmhpZ2hfbGlnaHRfb24oKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5faW5keDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBwb3NfUigpOiBudW1iZXIge1xyXG4gICAgICAgIGlmICh0aGlzLl9saXN0ID09PSB1bmRlZmluZWQpIHJldHVybiAwO1xyXG5cclxuICAgICAgICBsZXQgICBpbmR4ID0gdGhpcy5faW5keDtcclxuICAgICAgICBjb25zdCByb3dzID0gdGhpcy5fX2dldF9yb3dzKCk7XHJcbiAgICAgICAgaWYgKGluZHggIDwgdGhpcy5fbGVuZyAtIHJvd3MpIHsgXHJcbiAgICAgICAgICAgIC8vIOacgOe1guWIlyjlj7Pnq68p5Lul5aSWXHJcbiAgICAgICAgICAgIGluZHggKz0gcm93cztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyDmnIDntYLliJco5Y+z56uvKVxyXG4gICAgICAgICAgICBjb25zdCAgIG9sZF9pbmR4ID0gaW5keDtcclxuICAgICAgICAgICAgY29uc3QgICB2dXJ0dWFsX2xpc3RfbGVuZyA9IHRoaXMuX2NvbHMgKiByb3dzO1xyXG4gICAgICAgICAgICBpbmR4IC09IHZ1cnR1YWxfbGlzdF9sZW5nIC0gcm93cztcclxuICAgICAgICAgICAgaWYgKGluZHggPCAwKSB7XHJcbiAgICAgICAgICAgICAgICBpbmR4ICs9IHJvd3M7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5keCA8IDAgfHwgaW5keCA+IHRoaXMuX2xlbmcgLSAxKSBpbmR4ID0gX2Zsb29yKChvbGRfaW5keCArIDEpIC8gdGhpcy5fY29scywgMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IFxyXG4gICAgICAgIHRoaXMuX2luZHggPSBpbmR4OyB0aGlzLmhpZ2hfbGlnaHRfb24oKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5faW5keDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHJvdGVjdGVkIF9fZ2V0X3Jvd3MoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gX2NlaWwodGhpcy5fbGVuZyAvIHRoaXMuX2NvbHMsIDApO1xyXG4gICAgfVxyXG4gICAgLy8gRE9N44Oq44K544OI5LiA6Kan44Gu6KGM5pWw44Gu5Y+W5b6XXHJcbiAgICBwcm90ZWN0ZWQgX19nZXRfbGVuZygpOiBudW1iZXIge1xyXG4gICAgICAgIGlmICh0aGlzLl9saXN0ID09PSB1bmRlZmluZWQpIHJldHVybiAwO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9saXN0LmNoaWxkcmVuLmxlbmd0aDsgXHJcbiAgICAgICAgfSBjYXRjaChlcnIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gRE9N44Oq44K544OI5LiA6Kan44Gu5YiX5pWwKENTU+OBi+OCieWPluW+lynjga7lj5blvpdcclxuICAgIHByb3RlY3RlZCAgX19nZXRfY29scygpOiBudW1iZXIge1xyXG4gICAgICAgIGlmICh0aGlzLl9saXN0ID09PSB1bmRlZmluZWQpIHJldHVybiAwO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGxldCBjb2xzID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcy5fbGlzdCkuY29sdW1uQ291bnQ7XHJcbiAgICAgICAgICAgIHJldHVybiBfaXNOdW0oY29scykgPyBOdW1iZXIoY29scykgOiAxOyBcclxuICAgICAgICB9IGNhdGNoKGVycikge1xyXG4gICAgICAgICAgICByZXR1cm4gMTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8g44Oh44OL44Ol44O844Gu44OH44OV44Kp44Or44OI5pON5L2cKOODj+OCpOODqeOCpOODiOOBqOips+e0sOihqOekuuWItuW+oSlcclxuICAgIHB1YmxpYyBoaWdoX2xpZ2h0X29uKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLl9saXN0ID09PSB1bmRlZmluZWQpIHJldHVybjtcclxuXHJcbiAgICAgICAgY29uc3QgY2hpbGRyZW4gPSB0aGlzLl9saXN0LmNoaWxkcmVuO1xyXG4gICAgICAgIGNvbnN0IGxlbiAgICAgID0gY2hpbGRyZW4ubGVuZ3RoO1xyXG4gICAgICAgIGlmICh0aGlzLl9pbmR4IDwgMCB8fCB0aGlzLl9pbmR4ID4gbGVuIC0gMSkgcmV0dXJuO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGxpID0gY2hpbGRyZW4uaXRlbShpKSBhcyBIVE1MRWxlbWVudDtcclxuICAgICAgICAgICAgdGhpcy5fX2hpZ2hfbGlnaHRfb24obGksIGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgbGkgPSBjaGlsZHJlbi5pdGVtKHRoaXMuX2luZHgpIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgICAgIHRoaXMuX19oaWdoX2xpZ2h0X29uKGxpLCB0cnVlKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBoaWdoX2xpZ2h0X29mZigpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5fbGlzdCA9PT0gdW5kZWZpbmVkKSByZXR1cm47XHJcblxyXG4gICAgICAgIGNvbnN0IGNoaWxkcmVuID0gdGhpcy5fbGlzdC5jaGlsZHJlbjtcclxuICAgICAgICBjb25zdCBsZW4gICAgICA9IGNoaWxkcmVuLmxlbmd0aDtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGxpID0gY2hpbGRyZW4uaXRlbShpKSBhcyBIVE1MRWxlbWVudDtcclxuICAgICAgICAgICAgdGhpcy5fX2hpZ2hfbGlnaHRfb24obGksIGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgX19oaWdoX2xpZ2h0X29uKGVsbTogSFRNTEVsZW1lbnQgfCBudWxsLCBpc09uOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGVsbSA9PT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgIGNvbnN0IHBlcmVudFN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxtLnBhcmVudEVsZW1lbnQgPz8gZWxtKTtcclxuXHJcbiAgICAgICAgY29uc3QgZndfY29sb3IgPSBwZXJlbnRTdHlsZS5jb2xvcjtcclxuICAgICAgICBjb25zdCBiZ19jb2xvciA9IHBlcmVudFN0eWxlLmJhY2tncm91bmRDb2xvcjtcclxuXHJcbiAgICAgICAgZWxtLnN0eWxlLmNvbG9yICAgICAgICAgICA9IGlzT24gPyBiZ19jb2xvciA6IGZ3X2NvbG9yO1xyXG4gICAgICAgIGVsbS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBpc09uID8gZndfY29sb3IgOiBiZ19jb2xvcjtcclxuXHJcbiAgICAgICAgZWxtLnN0eWxlLmZvbnRXZWlnaHQgPSAgaXNPbiA/ICdib2xkJyA6ICdub3JtYWwnO1xyXG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgZWxtLmNoaWxkcmVuLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHAgPSBlbG0uY2hpbGRyZW4uaXRlbShqKSBhcyBIVE1MRWxlbWVudDtcclxuICAgICAgICAgICAgaWYgKGlzT24pIHtcclxuICAgICAgICAgICAgICAgIHAuc3R5bGUuZm9udFdlaWdodCAgICAgID0gJ25vcm1hbCc7XHJcbiAgICAgICAgICAgICAgICBwLnN0eWxlLmNvbG9yICAgICAgICAgICA9IGZ3X2NvbG9yO1xyXG4gICAgICAgICAgICAgICAgcC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBiZ19jb2xvcjtcclxuICAgICAgICAgICAgICAgIHAuc3R5bGUuZGlzcGxheSAgICAgICAgID0gJ2Jsb2NrJztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHAuc3R5bGUuZGlzcGxheSAgICAgICAgID0gJ25vbmUnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIGFsZXJ0KCk6IHZvaWQge1xyXG4gICAgICAgIF9hbGVydChcclxuICAgICAgICAgICAgICBcIkN0bEN1cnNvcjogXCJcclxuICAgICAgICAgICAgKyBcIlxcbmlkICAgPSBcIiArIHRoaXMuX2lkXHJcbiAgICAgICAgICAgICsgXCJcXG5pbmR4ID0gXCIgKyB0aGlzLl9pbmR4XHJcbiAgICAgICAgICAgICsgXCJcXG5sZW5nID0gXCIgKyB0aGlzLl9sZW5nXHJcbiAgICAgICAgICAgICsgXCJcXG5jb2xzID0gXCIgKyB0aGlzLl9jb2xzXHJcbiAgICAgICAgKVxyXG4gICAgfTtcclxufVxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4iLCJpbXBvcnQgeyBfZ2V0X3V1aWQgfSBmcm9tIFwiLi4vZF91dGwvRl9SYW5kXCI7XHJcblxyXG50eXBlICBUX09uT2ZmT3B0aW9uID0ge1xyXG4gICAgeW4/OiAgICAgICBib29sZWFuLFxyXG4gICAgb25OYW1lPzogICBzdHJpbmcsXHJcbiAgICBvZmZOYW1lPzogIHN0cmluZyxcclxuICAgIG9uQ2xhc3M/OiAgc3RyaW5nLFxyXG4gICAgb2ZmQ2xhc3M/OiBzdHJpbmcsXHJcbiAgICBmbmM/OiAgICAgIF9UX0ZuYyxcclxufVxyXG5cclxudHlwZSAgX1RfT25PZmZPcHRpb24gPSB7XHJcbiAgICBvbk5hbWU6ICAgIHN0cmluZyxcclxuICAgIG9mZk5hbWU6ICAgc3RyaW5nLFxyXG4gICAgb25DbGFzczogICBzdHJpbmcsXHJcbiAgICBvZmZDbGFzczogIHN0cmluZyxcclxuICAgIGZuYz86ICAgICAgX1RfRm5jLFxyXG59XHJcblxyXG50eXBlIF9UX0ZuYyA9ICh5bjogYm9vbGVhbik9Pih2b2lkfGJvb2xlYW4pO1xyXG5cclxuZXhwb3J0IGNsYXNzIENfT25PZmZCdXR0b24ge1xyXG4gICAgcHJvdGVjdGVkIHN0YXRpYyBtZToge1tpZDogc3RyaW5nXTogQ19Pbk9mZkJ1dHRvbn07XHJcblxyXG4gICAgcHVibGljICAgIHN0YXRpYyBnZXRPYmooZWxtOiBIVE1MQnV0dG9uRWxlbWVudCwgb29vPzogVF9Pbk9mZk9wdGlvbik6IENfT25PZmZCdXR0b24ge1xyXG4gICAgICAgIHRoaXMubWUgPz89IHt9O1xyXG4gICAgICAgIHRoaXMubWVbZWxtLmlkXSA/Pz0gbmV3IENfT25PZmZCdXR0b24oZWxtLCBvb28pO1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1lW2VsbS5pZF07XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIHluOiAgYm9vbGVhbjtcclxuICAgIHByb3RlY3RlZCBlbG06IEhUTUxCdXR0b25FbGVtZW50O1xyXG4gICAgcHJvdGVjdGVkIG9vbzogX1RfT25PZmZPcHRpb247XHJcbiAgICBwcm90ZWN0ZWQgZGVmX29vbzogX1RfT25PZmZPcHRpb24gPSB7XHJcbiAgICAgICAgb25OYW1lOiAgICdPTicsXHJcbiAgICAgICAgb2ZmTmFtZTogICdvZmYnLFxyXG4gICAgICAgIG9uQ2xhc3M6ICAnX3RvZ2dsZV9vbicsXHJcbiAgICAgICAgb2ZmQ2xhc3M6ICdfdG9nZ2xlX29mZicsXHJcbiAgICB9O1xyXG4gICAgcHJvdGVjdGVkIGZuYzoge1tpZDogc3RyaW5nXTogX1RfRm5jfTtcclxuXHJcbiAgICBwcm90ZWN0ZWQgY29uc3RydWN0b3IoZWxtOiBIVE1MQnV0dG9uRWxlbWVudCwgb29vPzogVF9Pbk9mZk9wdGlvbikge1xyXG4gICAgICAgIHRoaXMuZm5jID0ge307XHJcbiAgICAgICAgdGhpcy5vb28gPSB0aGlzLmRlZl9vb287XHJcbiAgICAgICAgdGhpcy55biAgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgaWYgKGVsbS5uYW1lID09PSB1bmRlZmluZWQgfHwgZWxtLm5hbWUgPT09ICcnKSBlbG0ubmFtZSA9IGVsbS5pZDtcclxuICAgICAgICB0aGlzLmVsbSA9IGVsbTtcclxuICAgICAgICB0aGlzLmVsbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50Ok1vdXNlRXZlbnQpPT57dGhpcy50b2dnbGUoKTt9LCBmYWxzZSk7XHJcblxyXG4gICAgICAgIGlmIChvb28gIT09IHVuZGVmaW5lZCkgdGhpcy5zZXRPYmoob29vKTsgXHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0T2JqKG9vbzogVF9Pbk9mZk9wdGlvbik6IENfT25PZmZCdXR0b24ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHRoaXMueW4gID0gb29vLnluID8/IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5vb28gPSBvb28gYXMgX1RfT25PZmZPcHRpb247IFxyXG4gICAgICAgICAgICB0aGlzLm9vby5vbk5hbWUgICA/Pz0gdGhpcy5kZWZfb29vLm9uTmFtZTsgXHJcbiAgICAgICAgICAgIHRoaXMub29vLm9mZk5hbWUgID8/PSB0aGlzLmRlZl9vb28ub2ZmTmFtZTsgXHJcbiAgICAgICAgICAgIHRoaXMub29vLm9uQ2xhc3MgID8/PSB0aGlzLmRlZl9vb28ub25DbGFzczsgXHJcbiAgICAgICAgICAgIHRoaXMub29vLm9mZkNsYXNzID8/PSB0aGlzLmRlZl9vb28ub2ZmQ2xhc3M7IFxyXG4gICAgICAgICAgICB0aGlzLl9zZXRTdHlsZSh0aGlzLnluKTtcclxuICAgICAgICB9IGNhdGNoIHt9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgX3NldFN0eWxlKHluOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy55biAgID0geW47XHJcbiAgICAgICAgY29uc3Qgb29vID0gdGhpcy5vb287XHJcbiAgICAgICAgdGhpcy5lbG0udmFsdWUgPSB5bj8nb24nOidvZmYnO1xyXG4gICAgICAgIHRoaXMuZWxtLmlubmVySFRNTCA9IHluID8gb29vLm9uTmFtZSA6IG9vby5vZmZOYW1lO1xyXG4gICAgICAgIHRoaXMuZWxtLmNsYXNzTGlzdC5yZW1vdmUoeW4/IG9vby5vZmZDbGFzcyA6IG9vby5vbkNsYXNzKTtcclxuICAgICAgICB0aGlzLmVsbS5jbGFzc0xpc3QuYWRkICAgKHluPyBvb28ub25DbGFzcyAgOiBvb28ub2ZmQ2xhc3MpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRPTigpOiAgIGJvb2xlYW4ge3JldHVybiB0aGlzLl9zZXRZTih0cnVlKSA/PyBmYWxzZX07XHJcbiAgICBwdWJsaWMgc2V0T0ZGKCk6ICBib29sZWFuIHtyZXR1cm4gdGhpcy5fc2V0WU4oZmFsc2UpID8/IGZhbHNlfTtcclxuICAgIHB1YmxpYyB0b2dnbGUoKTogIGJvb2xlYW4ge3JldHVybiB0aGlzLl9zZXRZTighdGhpcy55bikgPz8gZmFsc2V9XHJcblxyXG4gICAgcHJvdGVjdGVkIF9zZXRZTih5bjogYm9vbGVhbik6IGJvb2xlYW58dm9pZCB7XHJcbiAgICAgICAgdGhpcy5fc2V0U3R5bGUoeW4pO1xyXG5cclxuICAgICAgICBsZXQgdGY6Ym9vbGVhbnx2b2lkICA9IHRydWU7IFxyXG4gICAgICAgIGZvciAoY29uc3QgaSBpbiB0aGlzLmZuYykgdGYgJiY9IHRoaXMuZm5jW2ldKHluKTsgXHJcbiAgICAgICAgcmV0dXJuIHRmO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpZCgpOiAgICAgIHN0cmluZyAge3JldHVybiB0aGlzLmVsbS5pZH07XHJcbiAgICBwdWJsaWMgaXNPTigpOiAgICBib29sZWFuIHtyZXR1cm4gdGhpcy55bjt9XHJcblxyXG4gICAgcHVibGljIGFkZEZuYyhmbmM6IF9UX0ZuYyk6IHN0cmluZyB7XHJcbiAgICAgICAgY29uc3QgaWQgPSAnb29mdW5jXycgKyBfZ2V0X3V1aWQoKTtcclxuICAgICAgICB0aGlzLmZuY1tpZF0gPSBmbmM7XHJcbiAgICAgICAgcmV0dXJuIGlkO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHJtdkZuYyhmbmM6IF9UX0ZuY3xzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAodHlwZW9mIGZuYyA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgdHJ5e1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuZm5jW2ZuY107IFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1jYXRjaChlcnIpe3JldHVybiBmYWxzZX1cclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChjb25zdCBpIGluIHRoaXMuZm5jKSBpZiAoZm5jID09PSB0aGlzLmZuY1tpXSkge2RlbGV0ZSB0aGlzLmZuY1tpXTsgcmV0dXJuIHRydWV9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG59XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5cclxuaW1wb3J0IHsgSV9Mb2NhdGUsIFRfTGNrZCB9ICAgICAgZnJvbSBcIi4vQ19Mb2NhdGlvblwiO1xyXG5pbXBvcnQgeyBJX0pTT05fVW5pcSwgSlNPTl9BbnkgfSBmcm9tIFwiLi9DX1NhdmVJbmZvXCI7XHJcbmltcG9ydCB7IENfSGVybywgSlNPTl9IZXJvIH0gICAgIGZyb20gXCIuL0NfSGVyb1wiO1xyXG5pbXBvcnQgeyBfZ2V0X3V1aWQgfSAgICAgICAgICAgICBmcm9tIFwiLi4vZF91dGwvRl9SYW5kXCI7XHJcbmltcG9ydCB7IENfR29vZHNMaXN0LCBKU09OX0dvb2RzTGlzdCB9IGZyb20gXCIuL0NfR29vZHNMaXN0TkdcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSlNPTl9HdWlsZCBleHRlbmRzIEpTT05fQW55IHtcclxuICAgIGlkPzogICAgICAgbnVtYmVyLFxyXG4gICAgdW5pcV9pZD86ICBzdHJpbmcsXHJcbiAgICBzYXZlX2lkPzogIG51bWJlcixcclxuICAgIG5hbWU/OiAgICAgc3RyaW5nLFxyXG4gICAgZ29sZD86ICAgICBudW1iZXIsXHJcbiAgICBnb29kcz86ICAgIEpTT05fR29vZHNMaXN0LFxyXG4gICAgaGVyb2VzPzogICBKU09OX0hlcm9bXSxcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFsZXJ0X2d1bGRfaW5mbyhhOiBKU09OX0d1aWxkfHVuZGVmaW5lZCk6IHZvaWQge1xyXG4gICAgaWYgKGEgPT09IHVuZGVmaW5lZCkgcmV0dXJuO1xyXG4gICAgYWxlcnQoXCJHdWlsZCBJbmZvOlwiIFxyXG4gICAgICAgICsgXCJcXG5pZDogICAgICAgXCIgKyAoYS5pZCAgICAgICAgPz8gJz8nKVxyXG4gICAgICAgICsgXCJcXG51bmlxX2lkOiAgXCIgKyAoYS51bmlxX2lkICAgPz8gJz8nKVxyXG4gICAgICAgICsgXCJcXG5zYXZlX2lkOiAgXCIgKyAoYS5zYXZlX2lkICAgPz8gJz8nKVxyXG4gICAgICAgICsgXCJcXG5uYW1lOiAgICAgXCIgKyAoYS5uYW1lICAgICAgPz8gJz8nKVxyXG4gICAgICAgICsgXCJcXG5nb2xkOiAgICAgXCIgKyAoYS5nb2xkICAgICAgPz8gIDAgKVxyXG4vLyAgICAgICAgKyBcIlxcbmdvb2RzOiAgICBcIiArIChPYmplY3Qua2V5cyhhLmdvb2RzPz8wKS5sZW5ndGgpXHJcbiAgICAgICAgKyBcIlxcbmhlcm9lczogICBcIiArIChhLmhlcm9lcz8ubGVuZ3RoID8/ICc/JylcclxuICAgICAgICArIFwiXFxuXCJcclxuICAgICk7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBDX0d1aWxkIGltcGxlbWVudHMgSV9Mb2NhdGUsIElfSlNPTl9VbmlxIHtcclxuICAgIHByb3RlY3RlZCBpZDogICAgICAgICBudW1iZXI7XHJcbiAgICBwcm90ZWN0ZWQgdW5pcV9pZDogICAgc3RyaW5nO1xyXG4gICAgcHJvdGVjdGVkIHNhdmVfaWQ6ICAgIG51bWJlcjtcclxuICAgIHByb3RlY3RlZCBuYW1lOiAgICAgICBzdHJpbmc7XHJcbiAgICBwdWJsaWMgICAgZ29sZDogICAgICAgbnVtYmVyO1xyXG4vLyAgICBwdWJsaWMgICAgZ29vZHM6ICAgICAgQ19Hb29kc0xpc3Q7XHJcbiAgICBwcm90ZWN0ZWQgaGVyb2VzOiAgICAge1t1aWQ6IHN0cmluZ106IENfSGVyb307XHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoYT86IEpTT05fR3VpbGQpIHtcclxuICAgICAgICB0aGlzLmlkICAgICAgICAgPSAtMTtcclxuICAgICAgICB0aGlzLnVuaXFfaWQgICAgPSAnbWFpX2d1bGQjJyArIF9nZXRfdXVpZCgpO1xyXG4gICAgICAgIHRoaXMuc2F2ZV9pZCAgICA9IC0xO1xyXG4gICAgICAgIHRoaXMubmFtZSAgICAgICA9ICcnO1xyXG4gICAgICAgIHRoaXMuZ29sZCAgICAgICA9ICAwO1xyXG4vLyAgICAgICAgdGhpcy5nb29kcyAgICAgID0gbmV3IENfR29vZHNMaXN0KCk7XHJcbiAgICAgICAgdGhpcy5oZXJvZXMgICAgID0ge307XHJcbiAgICAgICAgaWYgKGEgIT09IHVuZGVmaW5lZCkgdGhpcy5kZWNvZGUoYSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVpZCgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy51bmlxX2lkfVxyXG4gICAgcHVibGljIGdldF9sY2tkKCk6IFRfTGNrZCB7cmV0dXJuIFRfTGNrZC5NYXplfVxyXG4gICAgcHVibGljIGdldF9uYW1lKCk6IHN0cmluZyB7cmV0dXJuIHRoaXMubmFtZX1cclxuICAgIFxyXG4gICAgcHVibGljIGhyZXMoKTogIENfSGVyb1tdIHtcclxuICAgICAgICBjb25zdCBocmVzOiBDX0hlcm9bXSA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGlpIGluIHRoaXMuaGVyb2VzKSBocmVzLnB1c2godGhpcy5oZXJvZXNbaWldKTtcclxuICAgICAgICByZXR1cm4gaHJlcztcclxuICAgIH0gXHJcbiAgICBwdWJsaWMgY2xlYXJfaHJlcygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmhlcm9lcyA9IHt9O1xyXG4gICAgfVxyXG4gICAgcHVibGljIGFkZF9oZXJvKGhlcm86IENfSGVybyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaGVyb2VzW2hlcm8udWlkKCldID0gaGVybztcclxuICAgIH1cclxuICAgIHB1YmxpYyBybXZfaGVybyhoZXJvOiBDX0hlcm8pOiB2b2lkIHtcclxuICAgICAgICBkZWxldGUgdGhpcy5oZXJvZXNbaGVyby51aWQoKV07XHJcbiAgICB9XHJcblxyXG4vKlxyXG4gICAgcHVibGljIHN0YXRpYyBmcm9tX29ial90b19zdHJpbmcob2E6IENfR3VpbGQpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShvYSwgbnVsbCwgXCJcXHRcIik7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc3RhdGljIGZyb21fb2JqQXJyYXlfdG9fc3RyaW5nKG9hYToge1t1aWQ6IHN0cmluZ106IENfR3VpbGR9KTogc3RyaW5nIHtcclxuICAgICAgICBjb25zdCBvYSA9IFtdIGFzIENfR3VpbGRbXTtcclxuICAgICAgICBmb3IgKGNvbnN0IGlpIGluIG9hYSkgb2EucHVzaChvYWFbaWldKTtcclxuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkob2EsIG51bGwsIFwiXFx0XCIpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHN0YXRpYyBmcm9tX3N0cmluZ190b19vYmoodHh0OiBzdHJpbmcpOiBDX0d1aWxkIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCBqICAgPSBKU09OLnBhcnNlKHR4dCkgYXMgSlNPTl9HdWlsZFtdO1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IENfR3VpbGQoaik7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgQ19HdWlsZCgpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc3RhdGljIGZyb21fc3RyaW5nX3RvX29iakFycmF5KHR4dDogc3RyaW5nKToge1t1aWQ6IHN0cmluZ106IENfR3VpbGR9IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCBqICAgPSBKU09OLnBhcnNlKHR4dCkgYXMgSlNPTl9HdWlsZFtdO1xyXG4gICAgICAgICAgICBjb25zdCBtcGEgPSB7fSBhcyB7W2lkOiBzdHJpbmddOiBDX0d1aWxkfTtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBqaiBvZiBqKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBhYWEgPSBuZXcgQ19HdWlsZCgpLmRlY29kZShqaik7XHJcbiAgICAgICAgICAgICAgICBtcGFbYWFhLnVpZCgpXSA9IGFhYTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbXBhO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICByZXR1cm4ge307XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuKi9cclxuXHJcbiAgICBwdWJsaWMgZW5jb2RlKCk6IEpTT05fR3VpbGQge1xyXG4gICAgICAgIGNvbnN0IGpzb25faGVyb2VzOiBKU09OX0hlcm9bXSA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGlpIGluIHRoaXMuaGVyb2VzKSBqc29uX2hlcm9lcy5wdXNoKHRoaXMuaGVyb2VzW2lpXS5lbmNvZGUoKSk7ICBcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgaWQ6ICAgICAgdGhpcy5pZCxcclxuICAgICAgICAgICAgdW5pcV9pZDogdGhpcy51bmlxX2lkLFxyXG4gICAgICAgICAgICBzYXZlX2lkOiB0aGlzLnNhdmVfaWQsXHJcbiAgICAgICAgICAgIGdvbGQ6ICAgIHRoaXMuZ29sZCxcclxuLy8gICAgICAgICAgICBnb29kczogICB0aGlzLmdvb2RzLmVuY29kZSgpLFxyXG4gICAgICAgICAgICBoZXJvZXM6ICBqc29uX2hlcm9lcyxcclxuICAgICAgICAgICAgbmFtZTogICAgdGhpcy5uYW1lLFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBkZWNvZGUoYTogSlNPTl9HdWlsZHx1bmRlZmluZWQpOiBDX0d1aWxkIHtcclxuICAgICAgICBpZiAoYSA9PT0gdW5kZWZpbmVkKSByZXR1cm4gdGhpcztcclxuICAgICAgICBcclxuICAgICAgICBpZiAoYS5pZCAgICAgICAhPT0gdW5kZWZpbmVkKSB0aGlzLmlkICAgICAgICAgPSBhLmlkO1xyXG4gICAgICAgIGlmIChhLnVuaXFfaWQgICE9PSB1bmRlZmluZWQpIHRoaXMudW5pcV9pZCAgICA9IGEudW5pcV9pZDtcclxuICAgICAgICBpZiAoYS5zYXZlX2lkICAhPT0gdW5kZWZpbmVkKSB0aGlzLnNhdmVfaWQgICAgPSBhLnNhdmVfaWQ7XHJcbiAgICAgICAgaWYgKGEubmFtZSAgICAgIT09IHVuZGVmaW5lZCkgdGhpcy5uYW1lICAgICAgID0gYS5uYW1lO1xyXG4gICAgICAgIGlmIChhLmdvbGQgICAgICE9PSB1bmRlZmluZWQpIHRoaXMuZ29sZDtcclxuLy8gICAgICAgIGlmIChhLmdvb2RzICAgICE9PSB1bmRlZmluZWQpIHRoaXMuZ29vZHMuZGVjb2RlIChhLmdvb2RzKTtcclxuXHJcbiAgICAgICAgaWYgKGEuaGVyb2VzICE9PSB1bmRlZmluZWQpICB7XHJcbiAgICAgICAgICAgIHRoaXMuaGVyb2VzID0ge307XHJcbiAgICAgICAgICAgIGZvciAoY29uc3QganNvbl9oZXJvIG9mIGEuaGVyb2VzKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBoZXJvID0gbmV3IENfSGVybyhqc29uX2hlcm8pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oZXJvZXNbaGVyby51aWQoKV0gPSBoZXJvO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHN0YXRpYyBlbmNvZGVfYWxsKGFsbF9ndWxkOiBDX0d1aWxkW10pOiBKU09OX0d1aWxkW10ge1xyXG4gICAgICAgIGNvbnN0IGFsbF9ndWxkX2RhdGE6IEpTT05fR3VpbGRbXSA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGd1bGQgb2YgYWxsX2d1bGQpIHtcclxuICAgICAgICAgICAgYWxsX2d1bGRfZGF0YS5wdXNoKGd1bGQuZW5jb2RlKCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYWxsX2d1bGRfZGF0YTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzdGF0aWMgZGVjb2RlX2FsbChhbGxfZ3VsZF9kYXRhOiBKU09OX0d1aWxkW10pOiBDX0d1aWxkW10ge1xyXG4gICAgICAgIGNvbnN0IGFsbF9ndWxkOiBDX0d1aWxkW10gPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBndWxkX2RhdGEgb2YgYWxsX2d1bGRfZGF0YSkge1xyXG4gICAgICAgICAgICBhbGxfZ3VsZC5wdXNoKChuZXcgQ19HdWlsZCgpKS5kZWNvZGUoZ3VsZF9kYXRhKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhbGxfZ3VsZDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIGFsZXJ0KCk6IHZvaWQge1xyXG4gICAgICAgIGFsZXJ0KFwiR3VpbGQgSW5mbzpcIiBcclxuICAgICAgICAgICAgKyBcIlxcbmlkOiAgICAgICBcIiArICh0aGlzLmlkICAgICAgICAgICAgID8/ICc/JylcclxuICAgICAgICAgICAgKyBcIlxcbnVuaXFfaWQ6ICBcIiArICh0aGlzLnVuaXFfaWQgICAgICAgID8/ICc/JylcclxuICAgICAgICAgICAgKyBcIlxcbnNhdmVfaWQ6ICBcIiArICh0aGlzLnNhdmVfaWQgICAgICAgID8/ICc/JylcclxuICAgICAgICAgICAgKyBcIlxcbm5hbWU6ICAgICBcIiArICh0aGlzLm5hbWUgICAgICAgICAgID8/ICc/JylcclxuICAgICAgICAgICAgKyBcIlxcbmdvbGQ6ICAgICBcIiArICh0aGlzLmdvbGQgICAgICAgICAgID8/ICAwKVxyXG4vLyAgICAgICAgICAgICsgXCJcXG5nb29kczogICAgXCIgKyAoT2JqZWN0LmtleXModGhpcy5nb29kcz8/MCkubGVuZ3RoKVxyXG4gICAgICAgICAgICArIFwiXFxuaGVyb2VzOiAgIFwiICsgKHRoaXMuaGVyb2VzPy5sZW5ndGggPz8gJz8nKVxyXG4gICAgICAgICAgICArIFwiXFxuXCJcclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5cclxuaW1wb3J0IHsgQ19IZXJvQWJpbGl0eSwgSlNPTl9IZXJvX0FiaWxpdHl9IGZyb20gXCIuL0NfSGVyb0FiaWxpdHlcIjtcclxuaW1wb3J0IHsgSV9KU09OX1VuaXEsICAgSlNPTl9BbnkgfSAgICAgICAgIGZyb20gXCIuL0NfU2F2ZUluZm9cIjtcclxuaW1wb3J0IHsgX2dldF91dWlkLCBfaW5yYW5kLCBfaXJhbmQsIF9yYW5kb21fc3RyIH0gIGZyb20gXCIuLi9kX3V0bC9GX1JhbmRcIjtcclxuaW1wb3J0IHsgQ19Hb29kc0xpc3QsIEpTT05fR29vZHNMaXN0IH0gZnJvbSBcIi4vQ19Hb29kc0xpc3ROR1wiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBKU09OX0hlcm8gZXh0ZW5kcyBKU09OX0FueSB7XHJcbiAgICBpZD86ICAgICAgICBudW1iZXIsIFxyXG4gICAgdW5pcV9pZD86ICAgc3RyaW5nLCBcclxuICAgIHNhdmVfaWQ/OiAgIG51bWJlciwgXHJcbiAgICBuYW1lPzogICAgICBzdHJpbmcsIFxyXG4gICAgc2V4PzogICAgICAgbnVtYmVyOyBcclxuICAgIGFnZT86ICAgICAgIG51bWJlcjsgXHJcbiAgICBnb2xkPzogICAgICBudW1iZXI7IFxyXG4vLyAgICBnb29kcz86ICAgICBKU09OX0dvb2RzTGlzdDsgXHJcbiAgICBzdGF0ZT86ICAgICBudW1iZXI7IFxyXG4gICAgbHY/OiAgICAgICAgbnVtYmVyOyBcclxuICAgIHZhbD86ICAgICAgIEpTT05fSGVyb19WYWx1ZTtcclxuICAgIGFiaV9wPzogICAgICAge2JzYz86IEpTT05fSGVyb19BYmlsaXR5LCB0dGw/OiBKU09OX0hlcm9fQWJpbGl0eSwgbm93PzogSlNPTl9IZXJvX0FiaWxpdHl9O1xyXG4gICAgYWJpX20/OiAgICAgICB7YnNjPzogSlNPTl9IZXJvX0FiaWxpdHksIHR0bD86IEpTT05fSGVyb19BYmlsaXR5LCBub3c/OiBKU09OX0hlcm9fQWJpbGl0eX07XHJcbiAgICBpc19hbGl2ZT86ICBzdHJpbmd8Ym9vbGVhbjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBKU09OX0hlcm9fVmFsdWUgZXh0ZW5kcyBKU09OX0FueSB7XHJcbiAgICBza3A/OiB7dHRsOiBudW1iZXIsICBub3c6IG51bWJlcn0sIFxyXG4gICAgZXhwPzoge3R0bDogbnVtYmVyLCAgbm93OiBudW1iZXJ9LFxyXG4gICAgbnhlPzogbnVtYmVyLCAgICAgICAgICAgICAgICAgICAvLyDmrKHlm57jga7jg5Ljg7zjg63jg7zjg6zjg5njg6vjgqLjg4Pjg5fjgavlv4XopoHjgarntYzpqJPlgKRcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFsZXJ0X2hyZXNfaW5mbyhhOiAoSlNPTl9IZXJvfHVuZGVmaW5lZClbXXx1bmRlZmluZWQpOiB2b2lkIHsgXHJcbiAgICBpZiAoYSA9PT0gdW5kZWZpbmVkKSByZXR1cm47XHJcbiAgICBhbGVydCgnTnVtYmVyIG9mIEhlcm8gPSAnICsgYS5sZW5ndGgudG9TdHJpbmcoKSk7XHJcbiAgICBmb3IgKHZhciBpIGluIGEpIHtcclxuICAgICAgICBpZiAoYVtpXSA9PT0gdW5kZWZpbmVkKSBjb250aW51ZTtcclxuICAgICAgICBhbGVydF9oZXJvX2luZm8oYVtpXSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhbGVydF9oZXJvX2luZm8oYTogSlNPTl9IZXJvfHVuZGVmaW5lZCk6IHZvaWQgeyBcclxuICAgIGlmIChhID09PSB1bmRlZmluZWQpIHJldHVybjtcclxuICAgIGFsZXJ0KFwiSGVybyBJbmZvOlxcblwiIFxyXG4gICAgICAgICsgXCJcXG5pZDogICAgICAgXCIgICAgICsgKGE/LmlkICAgICAgICA/PyAnPycpXHJcbiAgICAgICAgKyBcIlxcbnVuaXFfaWQgICBcIiAgICAgKyAoYT8udW5pcV9pZCAgID8/ICc/JylcclxuICAgICAgICArIFwiXFxubmFtZTogICAgIFwiICAgICArIChhPy5uYW1lICAgICAgPz8gJz8nKVxyXG4gICAgICAgICsgXCJcXG5zYXZlX2lkOiAgXCIgICAgICsgKGE/LnNhdmVfaWQgICA/PyAnPycpXHJcbiAgICAgICAgKyBcIlxcbmlzX2FsaXZlOiBcIiAgICAgKyAoYT8uaXNfYWxpdmUgID8/ICc/JylcclxuICAgICAgICArIFwiXFxuXCJcclxuICAgICk7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBDX0hlcm8gaW1wbGVtZW50cyBJX0pTT05fVW5pcSB7XHJcbiAgICBwcm90ZWN0ZWQgbXlfaWQ6ICAgIG51bWJlcjtcclxuICAgIHByb3RlY3RlZCBteV9uYW1lOiAgc3RyaW5nO1xyXG4gICAgcHJvdGVjdGVkIHVuaXFfaWQ6ICBzdHJpbmc7IFxyXG4gICAgcHJvdGVjdGVkIHNhdmVfaWQ6ICBudW1iZXI7IFxyXG4gICAgcHJvdGVjdGVkIHNleDogICAgICBudW1iZXI7IFxyXG4gICAgcHJvdGVjdGVkIGFnZTogICAgICBudW1iZXI7IFxyXG4gICAgcHJvdGVjdGVkIHN0YXRlOiAgICBudW1iZXI7IFxyXG4gICAgcHJvdGVjdGVkIGx2OiAgICAgICBudW1iZXI7IFxyXG4gICAgLy8gYnNjKEJhc2ljKeOBr+W9k+S6uuOBruWfuuacrOWApOOAgnR0bChUb3RhbCnjga/oo4XlgpnnrYnjgpLliqDmuJvnrpfjgZfjgZ/jgoLjga7jgIJub3fjga/jg5Djg5XnrYnjga7jgr/jg7zjg7PliLbjga7jgoLliqDmuJvnrpfjgZfjgZ/jgoLjga5cclxuICAgIHByb3RlY3RlZCBnb2xkOiAgICAgbnVtYmVyOyBcclxuLy8gICAgcHJvdGVjdGVkIGdvb2RzOiAgICBDX0dvb2RzTGlzdDsgXHJcbiAgICBwcm90ZWN0ZWQgdmFsOiAgICAgIEpTT05fSGVyb19WYWx1ZTtcclxuICAgIHByb3RlY3RlZCBhYmlfcDogICAgICB7YnNjOiBDX0hlcm9BYmlsaXR5LCB0dGw6IENfSGVyb0FiaWxpdHksIG5vdzogQ19IZXJvQWJpbGl0eX07XHJcbiAgICBwcm90ZWN0ZWQgYWJpX206ICAgICAge2JzYzogQ19IZXJvQWJpbGl0eSwgdHRsOiBDX0hlcm9BYmlsaXR5LCBub3c6IENfSGVyb0FiaWxpdHl9O1xyXG5cclxuICAgIHByb3RlY3RlZCBpc19hbGl2ZTogYm9vbGVhbjtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoYT86IEpTT05fSGVybykge1xyXG4gICAgICAgIHRoaXMubXlfaWQgICAgICA9IDA7XHJcbiAgICAgICAgdGhpcy5teV9uYW1lICAgID0gJ05vIE5hbWUgSGVybyc7XHJcbiAgICAgICAgdGhpcy51bmlxX2lkICAgID0gJ21haV9oZXJvIycgKyBfZ2V0X3V1aWQoKTtcclxuICAgICAgICB0aGlzLnNhdmVfaWQgICAgPSAwO1xyXG4gICAgICAgIHRoaXMuc2V4ICAgICAgICA9IDA7IFxyXG4gICAgICAgIHRoaXMuYWdlICAgICAgICA9IDA7IFxyXG4gICAgICAgIHRoaXMuZ29sZCAgICAgICA9IDA7IFxyXG4vLyAgICAgICAgdGhpcy5nb29kcyAgICAgID0gbmV3IENfR29vZHNMaXN0KCk7IFxyXG4gICAgICAgIHRoaXMuc3RhdGUgICAgICA9IDA7IFxyXG4gICAgICAgIHRoaXMubHYgICAgICAgICA9IDA7XHJcbiAgICAgICAgdGhpcy52YWwgICAgICAgID0ge307XHJcbiAgICAgICAgdGhpcy5hYmlfcCAgICAgID0ge2JzYzogbmV3IENfSGVyb0FiaWxpdHkoKSwgdHRsOiBuZXcgQ19IZXJvQWJpbGl0eSgpLCBub3c6IG5ldyBDX0hlcm9BYmlsaXR5KCl9O1xyXG4gICAgICAgIHRoaXMuYWJpX20gICAgICA9IHtic2M6IG5ldyBDX0hlcm9BYmlsaXR5KCksIHR0bDogbmV3IENfSGVyb0FiaWxpdHkoKSwgbm93OiBuZXcgQ19IZXJvQWJpbGl0eSgpfTtcclxuICAgICAgICB0aGlzLmlzX2FsaXZlICAgPSB0cnVlO1xyXG4gICAgICAgIGlmIChhICE9PSB1bmRlZmluZWQpIHRoaXMuZGVjb2RlKGEpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRfcHJwKGFyZyA6IEpTT05fSGVybykge1xyXG4gICAgICAgIHRoaXMuZGVjb2RlKGFyZyk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0X3VuaXFfaWQoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMudW5pcV9pZH1cclxuXHJcbiAgICBwdWJsaWMgaWQoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gJ0hlcm9fJyArIHRoaXMubXlfaWQudG9TdHJpbmcoMTYpLnBhZFN0YXJ0KDUsICcwJyk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgdWlkKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLnVuaXFfaWQ7fVxyXG4gICAgcHVibGljIG5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5teV9uYW1lO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldF9uYW1lKG5hbWU6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubXlfbmFtZSA9IG5hbWU7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBlbmNvZGUoKTogSlNPTl9IZXJvIHtcclxuICAgICAgICBjb25zdCByZXQ6IEpTT05fSGVybyA9IHtcclxuICAgICAgICAgICAgaWQ6ICAgICAgICB0aGlzLm15X2lkLFxyXG4gICAgICAgICAgICB1bmlxX2lkOiAgIHRoaXMudW5pcV9pZCxcclxuICAgICAgICAgICAgbmFtZTogICAgICB0aGlzLm15X25hbWUsXHJcbiAgICAgICAgICAgIHNhdmVfaWQ6ICAgdGhpcy5zYXZlX2lkLFxyXG4gICAgICAgICAgICBzZXg6ICAgICAgIHRoaXMuc2V4LCBcclxuICAgICAgICAgICAgYWdlOiAgICAgICB0aGlzLmFnZSwgXHJcbiAgICAgICAgICAgIHN0YXRlOiAgICAgdGhpcy5zdGF0ZSwgXHJcbiAgICAgICAgICAgIGx2OiAgICAgICAgdGhpcy5sdiwgXHJcbiAgICAgICAgICAgIGdvbGQ6ICAgICAgdGhpcy5nb2xkLCBcclxuLy8gICAgICAgICAgICBnb29kczogICAgIHRoaXMuZ29vZHMuZW5jb2RlKCksIFxyXG4gICAgICAgICAgICB2YWw6ICAgICAgIHRoaXMudmFsLFxyXG4gICAgICAgICAgICBhYmlfcF9ic2M6IHRoaXMuYWJpX3AuYnNjLmVuY29kZSgpLFxyXG4gICAgICAgICAgICBhYmlfbV9ic2M6IHRoaXMuYWJpX20uYnNjLmVuY29kZSgpLFxyXG4gICAgICAgICAgICBpc19hbGl2ZTogKHRoaXMuaXNfYWxpdmUpID8gJ1knIDogJ04nLCBcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJldDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBkZWNvZGUoYTogSlNPTl9IZXJvfHVuZGVmaW5lZCk6IENfSGVybyB7XHJcbiAgICAgICAgaWYgKGEgPT09IHVuZGVmaW5lZCkgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgaWYgKGEuaWQgICAgICAgIT09IHVuZGVmaW5lZCkgdGhpcy5teV9pZCAgICA9IGEuaWQ7XHJcbiAgICAgICAgaWYgKGEubmFtZSAgICAgIT09IHVuZGVmaW5lZCkgdGhpcy5teV9uYW1lICA9IGEubmFtZTtcclxuICAgICAgICBpZiAoYS51bmlxX2lkICAhPT0gdW5kZWZpbmVkKSB0aGlzLnVuaXFfaWQgID0gYS51bmlxX2lkO1xyXG4gICAgICAgIGlmIChhLnNhdmVfaWQgICE9PSB1bmRlZmluZWQpIHRoaXMuc2F2ZV9pZCAgPSBhLnNhdmVfaWQ7XHJcbiAgICAgICAgaWYgKGEuc2V4ICAgICAgIT09IHVuZGVmaW5lZCkgdGhpcy5zZXggICAgICA9IGEuc2V4O1xyXG4gICAgICAgIGlmIChhLmFnZSAgICAgICE9PSB1bmRlZmluZWQpIHRoaXMuYWdlICAgICAgPSBhLmFnZTtcclxuICAgICAgICBpZiAoYS5zdGF0ZSAgICAhPT0gdW5kZWZpbmVkKSB0aGlzLnN0YXRlICAgID0gYS5zdGF0ZTtcclxuICAgICAgICBpZiAoYS5sdiAgICAgICAhPT0gdW5kZWZpbmVkKSB0aGlzLmx2ICAgICAgID0gYS5sdjtcclxuICAgICAgICBpZiAoYS5nb2xkICAgICAhPT0gdW5kZWZpbmVkKSB0aGlzLmdvbGQgICAgID0gYS5nb2xkO1xyXG4gICAgICAgIGlmIChhLmlzX2FsaXZlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBhLmlzX2FsaXZlID09PSBcImJvb2xlYW5cIikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc19hbGl2ZSA9IGEuaXNfYWxpdmU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzX2FsaXZlID0gKGEuaXNfYWxpdmUgIT0gJ04nKSA/IHRydWU6IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4vLyAgICAgICAgaWYgKGEuZ29vZHMgICAhPT0gdW5kZWZpbmVkKSB0aGlzLmdvb2RzLmRlY29kZShhLmdvb2RzKTtcclxuICAgICAgICBpZiAoYS52YWwgICAgICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5fX2RlY29kZV92YWwodGhpcy52YWwsIGEudmFsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGEuYWJpX3BfYnNjICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5hYmlfcC5ic2MuZGVjb2RlKGEuYWJpX3BfYnNjKTtcclxuICAgICAgICAgICAgLy8g5pqr5a6aXHJcbiAgICAgICAgICAgIHRoaXMuYWJpX3AudHRsID0gdGhpcy5hYmlfcC5ub3cgPSB0aGlzLmFiaV9wLmJzYztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGEuYWJpX21fYnNjICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5hYmlfbS5ic2MuZGVjb2RlKGEuYWJpX21fYnNjKTtcclxuICAgICAgICAgICAgLy8g5pqr5a6aXHJcbiAgICAgICAgICAgIHRoaXMuYWJpX20udHRsID0gdGhpcy5hYmlfbS5ub3cgPSB0aGlzLmFiaV9tLmJzYztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIF9fZGVjb2RlX3ZhbChkOiBKU09OX0hlcm9fVmFsdWUsIHM6IEpTT05fSGVyb19WYWx1ZSk6IHZvaWQge1xyXG4gICAgICAgIGlmIChzLnNrcCAhPT0gdW5kZWZpbmVkKSBkLnNrcCA9IHRoaXMuX19kZWNvZGVfc2tleChkLnNrcCwgcy5za3ApO1xyXG4gICAgICAgIGlmIChzLmV4cCAhPT0gdW5kZWZpbmVkKSBkLmV4cCA9IHRoaXMuX19kZWNvZGVfc2tleChkLmV4cCwgcy5leHApO1xyXG4gICAgICAgIGlmIChzLm54ZSAhPT0gdW5kZWZpbmVkKSBkLm54ZSA9IHMubnhlO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIF9fZGVjb2RlX3NrZXgoYToge3R0bD86IG51bWJlciwgbm93PzogbnVtYmVyfSB8IHVuZGVmaW5lZCwgczoge3R0bD86IG51bWJlciwgbm93PzogbnVtYmVyfSk6IHt0dGw6IG51bWJlciwgbm93OiBudW1iZXJ9IHtcclxuICAgICAgICB2YXIgZDoge3R0bDogbnVtYmVyLCBub3c6IG51bWJlcn07XHJcbiAgICAgICAgaWYgICAgIChhID09PSB1bmRlZmluZWQpIGQgPSB7dHRsOiAwLCBub3c6IDB9O1xyXG4gICAgICAgIGVsc2UgICAgZCA9IHt0dGw6IGE/LnR0bCA/PyAwLCBub3c6IGE/Lm5vdyA/PyAwfTtcclxuXHJcbiAgICAgICAgZC50dGwgPSBzLnR0bCA/PyBkLnR0bDtcclxuICAgICAgICBkLm5vdyA9IHMubm93ID8/IHMudHRsID8/IGQubm93O1xyXG4gICAgICAgIHJldHVybiBkO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlX2hlcm8oKTogQ19IZXJvIHtcclxuICAgICAgICBjb25zdCBuZXdfaGVybyA9IG5ldyBDX0hlcm8oKTtcclxuICAgICAgICBuZXdfaGVyby5zZXRfcHJwKHtpZDogICAgTWF0aC5mbG9vcigtMTAwMC4wICogTWF0aC5yYW5kb20oKSl9KTtcclxuICAgICAgICBuZXdfaGVyby5zZXRfcHJwKHtuYW1lOiAgbmV3X2hlcm8uaWQoKX0pO1xyXG4gICAgICAgIHJldHVybiBuZXdfaGVybztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmFuZG9tX21ha2UoKTogQ19IZXJvIHtcclxuICAgICAgICB0aGlzLm15X2lkICAgID0gMDsgLy8gLS1IZXJvOjokbWF4X2lkO1xyXG4gICAgICAgIHRoaXMubXlfbmFtZSAgPSBcIuWGkumZuuiAhSBcIiArIF9yYW5kb21fc3RyKDUpO1xyXG4gICAgICAgIHRoaXMuc2V4ICAgICAgPSBfaXJhbmQoIDAsICAgICAxKTsgXHJcbiAgICAgICAgdGhpcy5hZ2UgICAgICA9IF9pcmFuZCggMTUsICAgMjUpOyBcclxuICAgICAgICB0aGlzLnN0YXRlICAgID0gMDsgXHJcbiAgICAgICAgdGhpcy5sdiAgICAgICA9IDA7IFxyXG4gICAgICAgIHRoaXMuZ29sZCAgICAgPSBfaXJhbmQoIDUwMCwgMTAwMCk7IFxyXG4gICAgICAgIHRoaXMudmFsICAgICAgPSB7XHJcbiAgICAgICAgICAgIHNrcDoge3R0bDogMCwgbm93OiAwfSwgXHJcbiAgICAgICAgICAgIGV4cDoge3R0bDogMCwgbm93OiAwfSxcclxuICAgICAgICAgICAgJ254ZSc6IDEwMDBcclxuICAgICAgICB9O1xyXG5cclxuXHJcbiAgICAgICAgY29uc3QgYWJpX3BfYnNjID0gdGhpcy5hYmlfcC5ic2M7XHJcbiAgICAgICAgYWJpX3BfYnNjLnJhbmRvbV9tYWtlKCk7XHJcbiAgICAgICAgYWJpX3BfYnNjLmFkZF94cF9ib251cygodGhpcy5hZ2UgLSAxNSkgKiAxMCk7XHJcbiAgICAgICAgYWJpX3BfYnNjLmFkZF9lbF9ib251cygodGhpcy5hZ2UgLSAxNSkgKiAgNSk7XHJcbiAgICAgICAgYWJpX3BfYnNjLmFkZF9wcl9ib251cygodGhpcy5hZ2UgLSAxNSkgKiAgMik7XHJcbiAgICAgICAgdGhpcy5hYmlfcC5ic2MgPSBhYmlfcF9ic2M7XHJcblxyXG4gICAgICAgIGNvbnN0IGFiaV9tX2JzYyA9IHRoaXMuYWJpX20uYnNjO1xyXG4gICAgICAgIGFiaV9tX2JzYy5yYW5kb21fbWFrZSgpO1xyXG4gICAgICAgIGFiaV9tX2JzYy5hZGRfeHBfYm9udXMoKHRoaXMuYWdlIC0gMTUpICogMTApO1xyXG4gICAgICAgIGFiaV9tX2JzYy5hZGRfZWxfYm9udXMoKHRoaXMuYWdlIC0gMTUpICogIDUpO1xyXG4gICAgICAgIGFiaV9tX2JzYy5hZGRfcHJfYm9udXMoKHRoaXMuYWdlIC0gMTUpICogIDIpO1xyXG4gICAgICAgIHRoaXMuYWJpX20uYnNjID0gYWJpX21fYnNjO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGVuY29kZV9oZXJvZXMoaGVyb2VzOiBDX0hlcm9bXSk6IEpTT05fSGVyb1tdIHtcclxuICAgICAgICBjb25zdCBoZXJvZXNfZGF0YSA9IFtdIGFzIEpTT05fSGVyb1tdO1xyXG4gICAgICAgIGZvciAodmFyIGhlcm8gb2YgaGVyb2VzKSB7XHJcbiAgICAgICAgICAgIGhlcm9lc19kYXRhLnB1c2goaGVyby5lbmNvZGUoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBoZXJvZXNfZGF0YTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzdGF0aWMgZGVjb2RlX2hlcm9lcyhoZXJvZXNfZGF0YTogKEpTT05fSGVyb3x1bmRlZmluZWQpW118dW5kZWZpbmVkKTogQ19IZXJvW10ge1xyXG4gICAgICAgIGNvbnN0IGhlcm9lcyA9IFtdIGFzIENfSGVyb1tdO1xyXG4gICAgICAgIGlmIChoZXJvZXNfZGF0YSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGhlcm9fZGF0YSBvZiBoZXJvZXNfZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGhlcm9fZGF0YSAhPT0gdW5kZWZpbmVkKSBoZXJvZXMucHVzaChuZXcgQ19IZXJvKCkuZGVjb2RlKGhlcm9fZGF0YSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBoZXJvZXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFsZXJ0KCk6IHZvaWQgeyBcclxuICAgICAgICBhbGVydChcIkhlcm8gSW5mbzpcXG5cIiBcclxuICAgICAgICAgICAgKyBcIlxcbmlkOiAgICAgICBcIiAgICAgKyAodGhpcy5pZCAgICAgICAgPz8gJz8nKVxyXG4gICAgICAgICAgICArIFwiXFxudW5pcV9pZCAgIFwiICAgICArICh0aGlzLnVuaXFfaWQgICA/PyAnPycpXHJcbiAgICAgICAgICAgICsgXCJcXG5uYW1lOiAgICAgXCIgICAgICsgKHRoaXMubmFtZSAgICAgID8/ICc/JylcclxuICAgICAgICAgICAgKyBcIlxcbnNhdmVfaWQ6ICBcIiAgICAgKyAodGhpcy5zYXZlX2lkICAgPz8gJz8nKVxyXG4gICAgICAgICAgICArIFwiXFxuaXNfYWxpdmU6IFwiICAgICArICh0aGlzLmlzX2FsaXZlICA/PyAnPycpXHJcbiAgICAgICAgICAgICsgXCJcXG5cIlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc3RhdGljIGFsZXJ0X2hyZXMoYTogKENfSGVyb3x1bmRlZmluZWQpW118dW5kZWZpbmVkKTogdm9pZCB7IFxyXG4gICAgICAgIGlmIChhID09PSB1bmRlZmluZWQpIHJldHVybjtcclxuICAgICAgICBhbGVydCgnTnVtYmVyIG9mIEhlcm8gPSAnICsgYS5sZW5ndGgudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgZm9yICh2YXIgaSBpbiBhKSBhW2ldPy5hbGVydCgpO1xyXG4gICAgfVxyXG59IiwiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5pbXBvcnQgeyBJX0pTT04sIEpTT05fQW55IH0gZnJvbSBcIi4vQ19TYXZlSW5mb1wiO1xyXG5pbXBvcnQgeyBfcm91bmQgfSAgICAgICAgICAgZnJvbSBcIi4uL2RfdXRsL0ZfTWF0aFwiO1xyXG5pbXBvcnQgeyBfaW5yYW5kIH0gZnJvbSBcIi4uL2RfdXRsL0ZfUmFuZFwiO1xyXG5cclxuLy8g5LiA6Iis44Gr5L2/44GI44KL44Om44O844OG44Kj44Oq44OG44Kj44Gq5ZGq5paHXHJcbi8vIOOCquODluOCuOOCp+OCr+ODiOOCkuWIl+aMmeWei+OBqOOBl+OBpuWei+WMluOBmeOCi+OBruOBq+WIqeeUqFxyXG50eXBlIFRfSGVyb0FiaWxpdHkgPSB7W2tleTogc3RyaW5nXTogbnVtYmVyfTtcclxuZXhwb3J0IGludGVyZmFjZSBKU09OX0hlcm9fQWJpbGl0eSBleHRlbmRzIEpTT05fQW55IHtba2V5OiBzdHJpbmddOiBudW1iZXJ9XHJcblxyXG5leHBvcnQgY2xhc3MgQ19IZXJvQWJpbGl0eSBpbXBsZW1lbnRzIElfSlNPTiB7XHJcbiAgICBwcm90ZWN0ZWQgdjogVF9IZXJvQWJpbGl0eSA9IHtcclxuICAgICAgICB4cDogIDAsICAvLyBwOkhQ44CBbTpNUFxyXG5cclxuICAgICAgICAvLyDku6XkuIvjgIHmiKbpl5jog73lipvjga7ln7rmnKzlgKQocDrniannkIbjgIFtOumtlOazlSnjgILjg5Ljg7zjg63jg7zjg6zjg5njg6vjgoTjgrnjg4bjg7zjgr/jgrnjgqLjg4Pjg5fjgafliqDnrpcgXHJcbiAgICAgICAgYXRrOiAwLCAgLy8g5pS75pKD5YCkXHJcbiAgICAgICAgZGVmOiAwLCAgLy8g6Ziy5b6h5YCkXHJcbiAgICAgICAgcXVjOiAwLCAgLy8g556s55m65YqbXHJcbiAgICAgICAgY25jOiAwLCAgLy8g5qmf6YGL5YCkKOODgeODo+ODs+OCuSlcclxuICAgIFxyXG4gICAgICAgIC8vIOS7peS4i+OAgeOBhOOCj+OChuOCi+OCueODhuODvOOCv+OCueOAguS4iuiomOOBruioiOeul+OBq+W9semfv+OAguODkuODvOODreODvOODrOODmeODq+OChOOCueODhuODvOOCv+OCueOCouODg+ODl+OBp+WKoOeul1xyXG4gICAgICAgIHN0cjogMCwgIC8vIOagueaAp+OAguaUu+aSgy/pmLLlvqHlipvjgavjgoLlvbHpn7/jgIJIUC9NUOWbnuW+qeOChOOCouOCpOODhuODoOOBruacgOWkp+aJgOaMgemHjemHj+OBq+ODnOODvOODiuOCuVxyXG4gICAgICAgIHB3cjogMCwgIC8vIOWfuuacrOeahOW8t+OBleOAguaUu+aSg+WKm+OBq+W9semfv1xyXG4gICAgICAgIHZpdDogMCwgIC8vIOiAkOS5heWKm+OAgkhQL01Q44Gu5pyA5aSn5YCk44KE6Ziy5b6h5Yqb44Gr5b2x6Z+/44KS5LiO44GI44KLXHJcbiAgICAgICAgZGV4OiAwLCAgLy8g5Zmo55So44GV44CC5ZG95Lit546H44Gr5b2x6Z+/44KS5LiO44GI44KL44CC6aOb44Gz6YGT5YW344KE6ZW36Led6Zui6a2U5rOV44Gn44Gv54m544Gr5b2x6Z+/44CC572g6Kej6Zmk44Gr44KC5b2x6Z+/XHJcbiAgICAgICAgYWdpOiAwLCAgLy8g57Sg5pep44GV44CC6KGM5YuV6YCf5bqm44KE5Zue6YG/546H44Gr5b2x6Z+/44KS5LiO44GI44KL44CC5ZG95Lit546H44Gr44KC5b2x6Z+/XHJcbiAgICAgICAgdGVjOiAwLCAgLy8g5oqA6KGT5Yqb44CC57WM6aiT44Gn5ZCR5LiK44GX44Gm6IO95Yqb5YCkKHF1Yy9jbmMp44Gr44Oc44O844OK44K544KS5LiO44GI44KLXHJcbiAgICAgICAgbHVrOiAwLCAgLy8g5bm46YGL5YCk44CCY25j44Gr5aSn44GN44GP5b2x6Z+/44GZ44KLXHJcbiAgICB9O1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihhPzogSlNPTl9IZXJvX0FiaWxpdHkpIHtcclxuICAgICAgICBmb3IgKGxldCBpZHggaW4gdGhpcy52KSB7dGhpcy52W2lkeF0gPSAwO31cclxuICAgICAgICBpZiAoYSAhPT0gdW5kZWZpbmVkKSB0aGlzLmRlY29kZShhKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXRfcHJwKGE6IEpTT05fSGVyb19BYmlsaXR5KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5kZWNvZGUoYSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0KGtleTogc3RyaW5nKTogbnVtYmVyIHwgdW5kZWZpbmVkIHtcclxuICAgICAgICBpZiAoIShrZXkgaW4gdGhpcy52KSkgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICByZXR1cm4gdGhpcy52W2tleV07XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0KGtleTogc3RyaW5nLCBzOiBKU09OX0hlcm9fQWJpbGl0eSk6IG51bWJlciB8IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgaWYgKCEoa2V5IGluIHRoaXMudikpIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhpcy52W2tleV0gPSBzW2tleV07XHJcbiAgICAgICAgcmV0dXJuIHNba2V5XTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgeHBfdHRsYWRkKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIF9yb3VuZChNYXRoLmZsb29yKHRoaXMudi5zdHIgKyB0aGlzLnYudml0ICogMTAuMCksIDApO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGF0a190dGxhZGQoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gX3JvdW5kKE1hdGguZmxvb3IodGhpcy52LnN0ciArIHRoaXMudi5wd3IgKyB0aGlzLnYudGVjKSAvIDEwLjAsIDApO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGRlZl90dGxhZGQoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gX3JvdW5kKE1hdGguZmxvb3IodGhpcy52LnN0ciArIHRoaXMudi52aXQgKyB0aGlzLnYudGVjKSAvIDEwLjAsIDApO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHF1Y190dGxhZGQoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gX3JvdW5kKE1hdGguZmxvb3IodGhpcy52LmFnaSArIHRoaXMudi5sdWsgKyB0aGlzLnYudGVjKSAvIDEwLjAsIDApO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGNuY190dGxhZGQoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gX3JvdW5kKE1hdGguZmxvb3IoMi4wICogdGhpcy52Lmx1ayArIHRoaXMudi50ZWMpIC8gMTAuMCwgMCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGJvbnVzKGtleSA6IHN0cmluZyk6IG51bWJlciB7XHJcbiAgICAgICAgaWYgKCEoa2V5IGluIHRoaXMudikpIHJldHVybiAwO1xyXG4gICAgICAgIGlmIChrZXkgPT09ICd4cCcpIHJldHVybiBfcm91bmQoTWF0aC5mbG9vcih0aGlzLnYueHAgLyAxMDApLCAwKTtcclxuICAgICAgICByZXR1cm4gX3JvdW5kKE1hdGguZmxvb3IodGhpcy52W2tleV0gLyAxMC4wKSwgMCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZChhOiBKU09OX0hlcm9fQWJpbGl0eSk6IHZvaWQge1xyXG4gICAgICAgIGZvciAobGV0IGtleSBpbiBhKSB7XHJcbiAgICAgICAgICAgIHRoaXMudltrZXldICs9IGFba2V5XTtcclxuICAgICAgICB9XHJcbiAgICB9IFxyXG5cclxuICAgIHB1YmxpYyBhZGRfeHBfYm9udXMoYm9udXM6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMudi54cCAgKz0gIGJvbnVzO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGFkZF9lbF9ib251cyhib251czogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy52LmF0ayArPSAgYm9udXM7XHJcbiAgICAgICAgdGhpcy52LmRlZiArPSAgYm9udXM7XHJcbiAgICAgICAgdGhpcy52LnF1YyArPSAgYm9udXM7XHJcbiAgICAgICAgdGhpcy52LmNuYyArPSAgYm9udXM7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgYWRkX3ByX2JvbnVzKGJvbnVzOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnYuc3RyICs9ICBib251cztcclxuICAgICAgICB0aGlzLnYucHdyICs9ICBib251cztcclxuICAgICAgICB0aGlzLnYudml0ICs9ICBib251cztcclxuICAgICAgICB0aGlzLnYuZGV4ICs9ICBib251cztcclxuICAgICAgICB0aGlzLnYuYWdpICs9ICBib251cztcclxuICAgICAgICB0aGlzLnYudGVjICs9ICBib251cztcclxuICAgICAgICB0aGlzLnYubHVrICs9ICBib251cztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmFuZG9tX21ha2UoKTogQ19IZXJvQWJpbGl0eSB7XHJcbiAgICAgICAgdGhpcy52LnhwICA9ICBfaW5yYW5kKDAsIDEwMDAsIDMuMCk7XHJcblxyXG4gICAgICAgIHRoaXMudi5hdGsgPSAgX2lucmFuZCgwLCAgMTAwLCAyLjUpO1xyXG4gICAgICAgIHRoaXMudi5kZWYgPSAgX2lucmFuZCgwLCAgMTAwLCAyLjUpO1xyXG4gICAgICAgIHRoaXMudi5xdWMgPSAgX2lucmFuZCgwLCAgMTAwLCAyLjUpO1xyXG4gICAgICAgIHRoaXMudi5jbmMgPSAgX2lucmFuZCgwLCAgMTAwLCAyLjUpO1xyXG4gICAgXHJcbiAgICAgICAgdGhpcy52LnN0ciA9ICBfaW5yYW5kKDAsICAgMjAsIDIuMCk7XHJcbiAgICAgICAgdGhpcy52LnB3ciA9ICBfaW5yYW5kKDAsICAgMjAsIDIuMCk7XHJcbiAgICAgICAgdGhpcy52LnZpdCA9ICBfaW5yYW5kKDAsICAgMjAsIDIuMCk7XHJcbiAgICAgICAgdGhpcy52LmRleCA9ICBfaW5yYW5kKDAsICAgMjAsIDIuMCk7XHJcbiAgICAgICAgdGhpcy52LmFnaSA9ICBfaW5yYW5kKDAsICAgMjAsIDIuMCk7XHJcbiAgICAgICAgdGhpcy52LnRlYyA9ICBfaW5yYW5kKDAsICAgMjAsIDIuMCk7XHJcbiAgICAgICAgdGhpcy52Lmx1ayA9ICBfaW5yYW5kKDAsICAgMjAsIDIuMCk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBlbmNvZGUoKTogSlNPTl9IZXJvX0FiaWxpdHkge1xyXG4gICAgICAgIGNvbnN0IGE6IEpTT05fSGVyb19BYmlsaXR5ID0ge307XHJcbiAgICAgICAgZm9yIChsZXQga2V5IGluIHRoaXMudikgYVtrZXldID0gdGhpcy52W2tleV07XHJcbiAgICAgICAgcmV0dXJuIGE7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZGVjb2RlKGE6IEpTT05fSGVyb19BYmlsaXR5KTogQ19IZXJvQWJpbGl0eSB7XHJcbiAgICAgICAgZm9yIChsZXQga2V5IGluIGEpIHtcclxuICAgICAgICAgICAgaWYgKGtleSBpbiB0aGlzLnYgJiYgYVtrZXldICE9PSB1bmRlZmluZWQpIHRoaXMudltrZXldID0gYVtrZXldO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGNsb25lKHM6IENfSGVyb0FiaWxpdHkpOiBDX0hlcm9BYmlsaXR5IHtcclxuICAgICAgICByZXR1cm4gbmV3IENfSGVyb0FiaWxpdHkocy5lbmNvZGUoKSk7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuXHJcbmltcG9ydCB7IENfUG9pbnQgfSAgICAgICAgICAgICAgICAgICBmcm9tICcuL0NfUG9pbnQnO1xyXG5pbXBvcnQgeyBDX1BvaW50RGlyLCBKU09OX1BvaW50RGlyIH0gZnJvbSAnLi9DX1BvaW50RGlyJztcclxuaW1wb3J0IHsgVF9EaXJlY3Rpb24gfSAgICAgICAgICAgICAgIGZyb20gJy4vQ19Qb2ludERpcic7XHJcbmltcG9ydCB7IElfSlNPTiwgSlNPTl9BbnkgfSAgICAgICAgICBmcm9tICcuL0NfU2F2ZUluZm8nO1xyXG5pbXBvcnQgeyBUX01ha2VFbnVtVHlwZSB9ICAgICAgICAgICAgZnJvbSBcIi4uL2RfdXRsL1RfTWFrZUVudW1UeXBlXCI7XHJcblxyXG5leHBvcnQgY29uc3QgVF9MY2tkOntbbGNrZDogc3RyaW5nXTogbnVtYmVyfSAgPSB7XHJcbiAgICBVbmtuOiAwLFxyXG4gICAgTWF6ZTogMSxcclxuICAgIEd1bGQ6IDIsXHJcbn0gYXMgY29uc3Q7XHJcbmV4cG9ydCB0eXBlIFRfTGNrZCAgID0gVF9NYWtlRW51bVR5cGU8dHlwZW9mIFRfTGNrZD47XHJcblxyXG5mdW5jdGlvbiBfbGNrZF9rZXkobGNrZDogVF9MY2tkKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBPYmplY3Qua2V5cyhUX0xja2QpLmZpbmQoa2V5ID0+IFRfTGNrZFtrZXldID09PSBsY2tkKSA/PyBcIj8/Pz9cIjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBKU09OX0xvY2F0aW9uIGV4dGVuZHMgSlNPTl9Bbnkge1xyXG4gICAga2luZD86ICAgIHN0cmluZyxcclxuICAgIG5hbWU/OiAgICBzdHJpbmcsXHJcbiAgICBsb2NfdWlkPzogc3RyaW5nLFxyXG4gICAgbG9jX3Bvcz86IEpTT05fUG9pbnREaXIsXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSV9Mb2NhdGUge1xyXG4gICAgdWlkOiAgICAgICgpPT5zdHJpbmc7XHJcbiAgICBnZXRfbGNrZDogKCk9PlRfTGNrZDtcclxuICAgIGdldF9uYW1lOiAoKT0+c3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQ19Mb2NhdGlvbiBpbXBsZW1lbnRzIElfSlNPTiB7XHJcbiAgICBwcm90ZWN0ZWQgbG9jX2tpbmQ6IFRfTGNrZCA9IFRfTGNrZC5VbmtuO1xyXG4gICAgcHJvdGVjdGVkIGxvY19uYW1lOiBzdHJpbmcgPSAnJztcclxuICAgIHByb3RlY3RlZCBsb2NfdWlkOiAgc3RyaW5nID0gJyc7XHJcbiAgICBwcm90ZWN0ZWQgbG9jX3BvczogIENfUG9pbnREaXIgPSBuZXcgQ19Qb2ludERpcigpO1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcihqc29uPzogSlNPTl9Mb2NhdGlvbikge1xyXG4gICAgICAgIGlmIChqc29uICE9PSB1bmRlZmluZWQpIHRoaXMuZGVjb2RlKGpzb24pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRfbGNrZF9zdHIoKTogc3RyaW5nICB7cmV0dXJuIF9sY2tkX2tleSh0aGlzLmxvY19raW5kKTt9XHJcbiAgICBwdWJsaWMgZ2V0X2xja2QoKTogVF9MY2tkICAgICAge3JldHVybiB0aGlzLmxvY19raW5kO31cclxuICAgIHB1YmxpYyBnZXRfbmFtZSgpOiBzdHJpbmcgICAgICB7cmV0dXJuIHRoaXMubG9jX25hbWU7fVxyXG4gICAgcHVibGljIGdldF91aWQoKTogIHN0cmluZyAgICAgIHtyZXR1cm4gdGhpcy5sb2NfdWlkO31cclxuXHJcbiAgICBwdWJsaWMgc2V0X2xja2QobGNrZDogVF9MY2tkKTogQ19Mb2NhdGlvbnx1bmRlZmluZWQge1xyXG4gICAgICAgIGlmICghKF9sY2tkX2tleShsY2tkKSBpbiBUX0xja2QpKSByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIHRoaXMubG9jX2tpbmQgPSBsY2tkO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldF9uYW1lKG5hbWU6IHN0cmluZyk6ICAgdm9pZCB7dGhpcy5sb2NfbmFtZSA9IG5hbWU7fVxyXG4gICAgcHVibGljIHNldF91aWQgKHVpZDogc3RyaW5nKTogICAgdm9pZCB7dGhpcy5sb2NfdWlkICA9IHVpZDt9XHJcbiAgICBcclxuICAgIHB1YmxpYyBzZXRfbGNrZF9zdHIobGNrZDogc3RyaW5nKTogQ19Mb2NhdGlvbnx1bmRlZmluZWQge1xyXG4gICAgICAgIGlmICghKGxja2QgaW4gVF9MY2tkKSkgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB0aGlzLmxvY19raW5kID0gVF9MY2tkW2xja2RdO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgZ2V0X3AoKTogQ19Qb2ludCAgICAge1xyXG4vLyAgICAgICAgaWYgKHRoaXMubG9jX2tpbmQgIT0gVF9MY2tkLk1hemUpIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubG9jX3Bvcy5nZXRfcCgpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldF9kKCk6IFRfRGlyZWN0aW9uIHtcclxuLy8gICAgICAgIGlmICh0aGlzLmxvY19raW5kICE9IFRfTGNrZC5NYXplKSByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxvY19wb3MuZ2V0X2QoKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRfcGQoKTogQ19Qb2ludERpciB7XHJcbi8vICAgICAgICBpZiAodGhpcy5sb2Nfa2luZCAhPSBUX0xja2QuTWF6ZSkgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICByZXR1cm4gdGhpcy5sb2NfcG9zLmdldF9wZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRfcCAgIChwOiBDX1BvaW50RGlyKTogQ19Qb2ludERpcnx1bmRlZmluZWQge1xyXG4gICAgICAgIGlmICh0aGlzLmxvY19raW5kICE9PSBUX0xja2QuTWF6ZSkgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIGlmICh0aGlzLmxvY19wb3Muc2V0X3AocCkgPT09IHVuZGVmaW5lZCkgIHJldHVybiB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmxvY19wb3M7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0X2QgICAoZDogVF9EaXJlY3Rpb24pOiBUX0RpcmVjdGlvbnx1bmRlZmluZWQge1xyXG4gICAgICAgIGlmICh0aGlzLmxvY19raW5kICE9PSBUX0xja2QuTWF6ZSkgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIGlmICh0aGlzLmxvY19wb3Muc2V0X2QoZCkgPT09IHVuZGVmaW5lZCkgIHJldHVybiB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmxvY19wb3MuZDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXRfcGQgIChwZDogQ19Qb2ludERpcik6IENfUG9pbnREaXJ8dW5kZWZpbmVkIHtcclxuICAgICAgICBpZiAodGhpcy5sb2Nfa2luZCAhPT0gVF9MY2tkLk1hemUpICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgaWYgKHRoaXMubG9jX3Bvcy5zZXRfcGQocGQpID09PSB1bmRlZmluZWQpIHJldHVybiB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmxvY19wb3M7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBlbmNvZGUoKTogSlNPTl9Mb2NhdGlvbiB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAga2luZDogICAgIF9sY2tkX2tleSh0aGlzLmxvY19raW5kKSxcclxuICAgICAgICAgICAgbmFtZTogICAgIHRoaXMubG9jX25hbWUsXHJcbiAgICAgICAgICAgIGxvY191aWQ6ICB0aGlzLmxvY191aWQsXHJcbiAgICAgICAgICAgIGxvY19wb3M6ICB0aGlzLmxvY19wb3MuZW5jb2RlKCksXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBkZWNvZGUoaj86IEpTT05fTG9jYXRpb24pOiBDX0xvY2F0aW9uIHtcclxuICAgICAgICBpZiAoaiA9PT0gdW5kZWZpbmVkKSByZXR1cm4gdGhpcztcclxuICAgICAgICBpZiAoai5raW5kID09PSB1bmRlZmluZWQgfHwgIShqLmtpbmQgaW4gVF9MY2tkKSkgcmV0dXJuIHRoaXM7XHJcblxyXG4gICAgICAgIGlmIChqLmtpbmQgICAgIT09IHVuZGVmaW5lZCkgdGhpcy5sb2Nfa2luZCA9IFRfTGNrZFtqLmtpbmRdO1xyXG4gICAgICAgIGlmIChqLm5hbWUgICAgIT09IHVuZGVmaW5lZCkgdGhpcy5sb2NfbmFtZSA9IGoubmFtZTtcclxuICAgICAgICBpZiAoai5sb2NfdWlkICE9PSB1bmRlZmluZWQpIHRoaXMubG9jX3VpZCAgPSBqLmxvY191aWQ7XHJcbiAgICAgICAgaWYgKGoubG9jX3BvcyAhPT0gdW5kZWZpbmVkKSB0aGlzLmxvY19wb3MuZGVjb2RlKGoubG9jX3Bvcyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbn1cclxuXHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5cclxuaW1wb3J0IHsgVF9NektpbmQgfSAgICAgICAgICAgICAgZnJvbSBcIi4vVF9NektpbmRcIjtcclxuaW1wb3J0IHsgQ19NYXplQ2VsbCB9ICAgICAgICAgICAgZnJvbSBcIi4vQ19NYXplQ2VsbFwiO1xyXG5pbXBvcnQgeyBDX01hemVPYmosIElfTWF6ZU9iaiwgSlNPTl9NYXplT2JqIH0gZnJvbSBcIi4vQ19NYXplT2JqXCI7XHJcbmltcG9ydCB7IENfUG9pbnQgfSAgICAgICAgICAgICAgIGZyb20gXCIuL0NfUG9pbnRcIjtcclxuaW1wb3J0IHsgSV9Mb2NhdGUsIFRfTGNrZCB9ICAgICAgZnJvbSBcIi4vQ19Mb2NhdGlvblwiO1xyXG5pbXBvcnQgeyBDX1JhbmdlIH0gICAgICAgICAgICAgICBmcm9tIFwiLi9DX1JhbmdlXCI7XHJcbmltcG9ydCB7IENfVGVhbSwgSlNPTl9UZWFtIH0gICAgIGZyb20gXCIuL0NfVGVhbVwiO1xyXG5pbXBvcnQgeyBJX0pTT05fVW5pcSwgSlNPTl9BbnkgfSBmcm9tIFwiLi9DX1NhdmVJbmZvXCI7XHJcbmltcG9ydCB7IF9nZXRfdXVpZCwgX2lncmFuZCwgX2lyYW5kIH0gICAgICAgICAgICAgZnJvbSBcIi4uL2RfdXRsL0ZfUmFuZFwiO1xyXG5pbXBvcnQgeyBfbWluIH0gZnJvbSBcIi4uL2RfdXRsL0ZfTWF0aFwiO1xyXG5pbXBvcnQgeyBDX1BvaW50RGlyIH0gZnJvbSBcIi4vQ19Qb2ludERpclwiO1xyXG5pbXBvcnQgeyBUX0RpcmVjdGlvbiB9IGZyb20gXCIuL1RfRGlyZWN0aW9uXCI7XHJcbmltcG9ydCB7IENfUG9pbnRMaW5rMkQsIENfUG9pbnRTZXQyRCB9IGZyb20gXCIuL0NfUG9pbnRTZXQyRFwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBKU09OX01hemUgZXh0ZW5kcyBKU09OX0FueSB7XHJcbiAgICBpZD86ICAgICAgbnVtYmVyLFxyXG4gICAgdW5pcV9pZD86IHN0cmluZyxcclxuICAgIHNhdmVfaWQ/OiBudW1iZXIsXHJcbiAgICBmbG9vcj86ICAgbnVtYmVyLFxyXG4gICAgbmFtZT86ICAgIHN0cmluZyxcclxuICAgIHNpemVfeD86ICBudW1iZXIsXHJcbiAgICBzaXplX3k/OiAgbnVtYmVyLFxyXG4gICAgc2l6ZV96PzogIG51bWJlcixcclxuICAgIG1hemU/OiAgICBzdHJpbmcsIFxyXG4gICAgbWFzaz86ICAgIHN0cmluZywgXHJcbiAgICBteXRlYW0/OiAgSlNPTl9UZWFtLCBcclxuICAgIG9ianM/OiAgICBKU09OX01hemVPYmpbXSxcclxufVxyXG5cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhbGVydF9tYXplX2luZm8oYTogSlNPTl9NYXplfHVuZGVmaW5lZCk6IHZvaWQge1xyXG4gICAgaWYgKGEgPT09IHVuZGVmaW5lZCkgcmV0dXJuO1xyXG5cclxuICAgIGFsZXJ0KFwiTWF6ZSBJbmZvOlwiXHJcbiAgICAgICAgKyBcIlxcbm1hemUgaWQgOlwiICsgKGEuaWQgICAgICA/PyAnPycpXHJcbiAgICAgICAgKyBcIlxcbmZsb29yOiBcIiAgICsgKGEuZmxvb3IgICA/PyAnPycpXHJcbiAgICAgICAgKyBcIlxcbnVuaXEgaWQgOlwiICsgKGEudW5pcV9pZCA/PyAnPycpXHJcbiAgICAgICAgKyBcIlxcbnNhdmUgaWQgOlwiICsgKGEuc2F2ZV9pZCA/PyAnPycpXHJcbiAgICAgICAgKyBcIlxcbm5hbWU6ICAgXCIgICsgKGEubmFtZSAgICA/PyAnPycpXHJcbiAgICAgICAgKyBcIlxcbnNpemVfeDogXCIgICsgKGEuc2l6ZV94ICA/PyAnPycpXHJcbiAgICAgICAgKyBcIlxcbnNpemVfeTogXCIgICsgKGEuc2l6ZV95ICA/PyAnPycpXHJcbiAgICAgICAgKyBcIlxcbnNpemVfejogXCIgICsgKGEuc2l6ZV96ICA/PyAnPycpXHJcbiAgICAgICAgKyBcIm1hemU6XFxuXCIgICAgICsgKGEubWF6ZSAgICA/PyAnPycpXHJcbiAgICAgICAgKyBcIm1hc2s6XFxuXCIgICAgICsgKGEubWFzayAgICA/PyAnPycpXHJcbiAgICAgICAgKyBcIlxcblwiXHJcbiAgICApO1xyXG59XHJcblxyXG5cclxudHlwZSBfaW5pdF9hcmcgPSB7XHJcbiAgICBtYXplX2lkPzogbnVtYmVyLFxyXG4gICAgc2F2ZV9pZD86IG51bWJlcixcclxuICAgIGZsb29yPzogICBudW1iZXIsXHJcbiAgICBuYW1lPzogICAgc3RyaW5nLFxyXG4gICAgc2l6ZV94PzogIG51bWJlcixcclxuICAgIHNpemVfeT86ICBudW1iZXIsXHJcbiAgICBzaXplX3o/OiAgbnVtYmVyLFxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQ19NYXplIGltcGxlbWVudHMgSV9Mb2NhdGUsIElfSlNPTl9VbmlxIHtcclxuICAgIHByb3RlY3RlZCBtYXplX2lkOiAgbnVtYmVyO1xyXG4gICAgcHJvdGVjdGVkIHVuaXFfaWQ6ICBzdHJpbmc7XHJcbiAgICBwcm90ZWN0ZWQgc2F2ZV9pZDogIG51bWJlcjtcclxuICAgIHByb3RlY3RlZCBmbG9vcjogICAgbnVtYmVyO1xyXG4gICAgcHJvdGVjdGVkIG5hbWU6ICAgICBzdHJpbmc7XHJcbiAgICBwcm90ZWN0ZWQgbXlfbGF5ZXI6IG51bWJlciA9IDA7XHJcbiAgICBwcm90ZWN0ZWQgc2l6ZTogICAgIENfUmFuZ2U7XHJcbiAgICBwcm90ZWN0ZWQgY2VsbHM6ICAgIENfTWF6ZUNlbGxbXVtdW107XHJcbiAgICBwcm90ZWN0ZWQgbWFza3M6ICAgIGJvb2xlYW5bXVtdW107XHJcbiAgICBwcm90ZWN0ZWQgdW5jbGVhcjogIG51bWJlcltdO1xyXG4gICAgcHJvdGVjdGVkIG9ianM6ICAgICB7W3VpZDogc3RyaW5nXTogSV9NYXplT2JqfTtcclxuICAgIHByb3RlY3RlZCBudW1fb2Zfcm9vbTogICAgICBudW1iZXIgPSA1OyAvKiDjg6njg7Pjg4Djg6DnlJ/miJDjga7pmpvjga7pg6jlsYvjga7mlbDjga7mnIDlpKfmlbAgKi9cclxuICAgIHByb3RlY3RlZCBtYXhfc2l6ZV9vZl9yb29tOiBudW1iZXIgPSAzOyAvKiDjg6njg7Pjg4Djg6DnlJ/miJDjga7pmpvjga7pg6jlsYvjga7lpKfjgY3jgZUgKi9cclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoYT86IF9pbml0X2FyZykge1xyXG4gICAgICAgIHRoaXMubWF6ZV9pZCA9IC0xO1xyXG4gICAgICAgIHRoaXMuc2F2ZV9pZCA9IC0xO1xyXG4gICAgICAgIHRoaXMudW5pcV9pZCA9ICdtYWlfbWF6ZSMnICsgX2dldF91dWlkKCk7XHJcbiAgICAgICAgdGhpcy5mbG9vciAgID0gMDtcclxuICAgICAgICB0aGlzLm5hbWUgICAgPSAnJztcclxuICAgICAgICB0aGlzLnNpemUgICAgPSBuZXcgQ19SYW5nZShcclxuICAgICAgICAgICAgbmV3IENfUG9pbnQoMCwgMCwgMCksIFxyXG4gICAgICAgICAgICBuZXcgQ19Qb2ludCgyLCAyLCAyKSk7XHJcbiAgICAgICAgdGhpcy5jZWxscyAgID0gdGhpcy5fX2luaXRfbWF6ZShUX016S2luZC5TdG9uZSk7XHJcblxyXG4gICAgICAgIHRoaXMubWFza3MgICA9IHRoaXMuX19pbml0X21hc2sodHJ1ZSk7XHJcbiAgICAgICAgdGhpcy51bmNsZWFyID0gW107XHJcbiAgICAgICAgdGhpcy5fX2luaXRfdW5jbGVhcigpO1xyXG5cclxuICAgICAgICB0aGlzLm9ianMgICAgPSB7fTtcclxuICAgICAgICBcclxuICAgICAgICBpZiAoYSAhPT0gdW5kZWZpbmVkKSB0aGlzLmRlY29kZShhKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgX19pbml0X21hemUoa2luZDogVF9NektpbmQgPSBUX016S2luZC5TdG9uZSk6IENfTWF6ZUNlbGxbXVtdW10ge1xyXG4gICAgICAgIGNvbnN0IHNpemVfeCA9IHRoaXMuc2l6ZS5zaXplX3goKTtcclxuICAgICAgICBjb25zdCBzaXplX3kgPSB0aGlzLnNpemUuc2l6ZV95KCk7XHJcbiAgICAgICAgY29uc3Qgc2l6ZV96ID0gdGhpcy5zaXplLnNpemVfeigpO1xyXG5cclxuICAgICAgICBjb25zdCBjZWxsczogQ19NYXplQ2VsbFtdW11bXSA9IEFycmF5KHNpemVfeikgYXMgQ19NYXplQ2VsbFtdW11bXTtcclxuICAgICAgICBmb3IgKHZhciB6ID0gMDsgeiA8IHNpemVfejsgeisrKSB7XHJcbiAgICAgICAgICAgIGNlbGxzW3pdID0gQXJyYXkoc2l6ZV95KSBhcyBDX01hemVDZWxsW11bXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgeSA9IDA7IHkgPCBzaXplX3k7IHkrKykge1xyXG4gICAgICAgICAgICAgICAgY2VsbHNbel1beV0gID0gQXJyYXkoc2l6ZV94KSBhcyBDX01hemVDZWxsW107XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciB4ID0gMDsgeCA8IHNpemVfeDsgeCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2VsbHNbel1beV1beF0gPSBDX01hemVDZWxsLm5ld09iaih7a2luZDpraW5kLCBwb3M6IHt4OngsIHk6eSwgejp6fX0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjZWxscztcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBfX2luaXRfbWFzayhZTjogYm9vbGVhbik6IGJvb2xlYW5bXVtdW10ge1xyXG4gICAgICAgIGNvbnN0IHNpemVfeCA9IHRoaXMuc2l6ZS5zaXplX3goKTtcclxuICAgICAgICBjb25zdCBzaXplX3kgPSB0aGlzLnNpemUuc2l6ZV95KCk7XHJcbiAgICAgICAgY29uc3Qgc2l6ZV96ID0gdGhpcy5zaXplLnNpemVfeigpO1xyXG5cclxuICAgICAgICB0aGlzLm1hc2tzICAgPSBBcnJheShzaXplX3opIGFzIGJvb2xlYW5bXVtdW107XHJcbiAgICAgICAgZm9yICh2YXIgeiA9IDA7IHogPCBzaXplX3o7IHorKykge1xyXG4gICAgICAgICAgICB0aGlzLm1hc2tzW3pdID0gQXJyYXkoc2l6ZV95KSBhcyBib29sZWFuW11bXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgeSA9IDA7IHkgPCBzaXplX3k7IHkrKykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYXNrc1t6XVt5XSAgPSBBcnJheShzaXplX3gpIGFzIGJvb2xlYW5bXTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIHggPSAwOyB4IDwgc2l6ZV94OyB4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hc2tzW3pdW3ldW3hdID0gWU47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubWFza3M7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgX19pbml0X3VuY2xlYXIoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3Qgc2l6ZV94ID0gdGhpcy5zaXplLnNpemVfeCgpO1xyXG4gICAgICAgIGNvbnN0IHNpemVfeSA9IHRoaXMuc2l6ZS5zaXplX3koKTtcclxuICAgICAgICBjb25zdCBzaXplX3ogPSB0aGlzLnNpemUuc2l6ZV96KCk7XHJcblxyXG4gICAgICAgIHRoaXMudW5jbGVhciA9IEFycmF5KHNpemVfeik7XHJcbiAgICAgICAgZm9yICh2YXIgeiA9IDA7IHogPCBzaXplX3o7IHorKykge1xyXG4gICAgICAgICAgICB0aGlzLnVuY2xlYXJbel09MDtcclxuICAgICAgICAgICAgZm9yICh2YXIgeSA9IDA7IHkgPCBzaXplX3k7IHkrKykge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgeCA9IDA7IHggPCBzaXplX3g7IHgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm1hc2tzW3pdW3ldW3hdKSB0aGlzLnVuY2xlYXJbel0rKztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgdWlkKCk6IHN0cmluZyAgICAgIHtyZXR1cm4gdGhpcy51bmlxX2lkfVxyXG4gICAgcHVibGljIGdldF9sY2tkKCk6IFRfTGNrZCB7cmV0dXJuIFRfTGNrZC5NYXplfVxyXG4gICAgcHVibGljIGdldF9uYW1lKCk6IHN0cmluZyB7cmV0dXJuIHRoaXMubmFtZX1cclxuXHJcbiAgICBwdWJsaWMgd2l0aGluKHA6IENfUG9pbnQpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zaXplLndpdGhpbihwKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy8g44Oh44Kk44K65YaF44Gu44Kq44OW44K444Kn44Kv44OI44KE44Oi44Oz44K544K/44O8562J44Gu6YWN572uXHJcbiAgICBwdWJsaWMgYWRkX29iaihvYmo6IElfTWF6ZU9iaik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMub2Jqc1tvYmoudWlkKCldID0gb2JqO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHJtdl9vYmoob2JqOiBJX01hemVPYmopOiB2b2lkIHtcclxuICAgICAgICBkZWxldGUgdGhpcy5vYmpzW29iai51aWQoKV07XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0X29ial94eXooeDogbnVtYmVyLCB5OiBudW1iZXIsIHo6IG51bWJlcik6IElfTWF6ZU9ianxudWxsIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRfb2JqKG5ldyBDX1BvaW50KHgsIHksIHopKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRfb2JqKHA6IENfUG9pbnQpOiBJX01hemVPYmp8bnVsbCB7XHJcbiAgICAgICAgdmFyIGxheWVyID0gLTE7XHJcbiAgICAgICAgdmFyIG9iajogSV9NYXplT2JqfG51bGwgICA9IG51bGw7XHJcblxyXG4gICAgICAgIGZvciAoY29uc3QgaWQgaW4gdGhpcy5vYmpzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGV4aXN0ID0gdGhpcy5vYmpzW2lkXTtcclxuXHJcbiAgICAgICAgICAgIGlmIChleGlzdC52aWV3KCkgPT09IHVuZGVmaW5lZCkgY29udGludWU7XHJcbiAgICAgICAgICAgIGlmIChleGlzdC53aXRoaW4ocCkgJiYgZXhpc3QudmlldygpPy5sZXR0ZXIoKSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGV4aXN0LnZpZXcoKT8ubGF5ZXIoKT8/LTk5ID4gbGF5ZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICBsYXllciA9IGV4aXN0LnZpZXcoKT8ubGF5ZXIoKT8/LTk5O1xyXG4gICAgICAgICAgICAgICAgICAgIG9iaiAgID0gZXhpc3Q7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IFxyXG4gICAgICAgIHJldHVybiBvYmo7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZXhpc3Rfb2JqKHA6IENfUG9pbnQpOiBib29sZWFuIHtcclxuICAgICAgICBmb3IgKGNvbnN0IGlkIGluIHRoaXMub2Jqcykge1xyXG4gICAgICAgICAgICBjb25zdCBleGlzdCA9IHRoaXMub2Jqc1tpZF07XHJcbiAgICAgICAgICAgIGlmIChleGlzdC53aXRoaW4ocCkgJiYgZXhpc3QudmlldygpPy5sZXR0ZXIoKSAhPT0gbnVsbCkgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBUZWFt44GM5p2l44Gf44Od44Kk44Oz44OI44GM5pyq6LiP5Zyw44Gg44Gj44Gf44KJ44Gf44Gg44Gu5bqK44Gr5aSJ44GI44KLXHJcbiAgICBwdWJsaWMgY2hhbmdlX3VuZXhwX3RvX2Zsb29yKHA6IENfUG9pbnQpIHtcclxuICAgICAgICBpZiAodGhpcy5nZXRfa2luZChwKSA9PSBUX016S2luZC5VbmV4cCkge1xyXG4gICAgICAgICAgICB0aGlzLnNldF9jZWxsKHAsIFRfTXpLaW5kLkZsb29yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gMkTjg57jg4Pjg5fjga7jg57jgrnjgq/lpJbjgZfplqLpgKNcclxuICAgIHB1YmxpYyBjbGVhcl9tYXNrX2Fyb3VuZF90aGVfdGVhbSh0ZWFtOiBDX1RlYW0pOiB2b2lkIHtcclxuICAgICAgICAvLyDnj77lnKjlnLDjgajnnJ/mqKrjga/oh6rli5XnmoTjgavopovjgYjjgotcclxuICAgICAgICB0aGlzLl9fY2xlYXJfbWFzayh0ZWFtLndhbGsoKS5nZXRfYXJvdW5kKDAsIC0xKSk7XHJcbiAgICAgICAgdGhpcy5fX2NsZWFyX21hc2sodGVhbS53YWxrKCkuZ2V0X2Fyb3VuZCgwLCAgMCkpO1xyXG4gICAgICAgIHRoaXMuX19jbGVhcl9tYXNrKHRlYW0ud2FsaygpLmdldF9hcm91bmQoMCwgIDEpKTtcclxuXHJcbiAgICAgICAgY29uc3QgZGVwdGggICA9ICA1OyAvLyAyROODnuODg+ODl+eUqOOBruWlpeihjOOBjemZkOeVjFxyXG5cclxuICAgICAgICAvLyDliY3mlrnjga7opovpgJrjgZfjgpLjg4Hjgqfjg4Pjgq/jgZfjgarjgYzjgonopovjgYjjgovjgajjgZPjgo3jga/op6PmlL7jgZnjgotcclxuICAgICAgICBmb3IgKHZhciBkID0gMTsgZCA8IGRlcHRoOyBkKyspIHtcclxuICAgICAgICAgICAgY29uc3QgZnJvbnRfcG9zID0gdGVhbS53YWxrKCkuZ2V0X2Fyb3VuZChkLCAwKVxyXG4gICAgICAgICAgICBpZiAodGhpcy5pc19tb3ZhYmxlKGZyb250X3BvcykpIHtcclxuICAgICAgICAgICAgICAgIC8vIOato+mdouOBq+manOWus+eJqeOBjOeEoeOBkeOCjOOBsOOAgeOBneOBruS4oeWBtOOCguimi+OBiOOCi1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fX2NsZWFyX21hc2sodGVhbS53YWxrKCkuZ2V0X2Fyb3VuZChkLCAtMSkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fX2NsZWFyX21hc2sodGVhbS53YWxrKCkuZ2V0X2Fyb3VuZChkLCAgMCkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fX2NsZWFyX21hc2sodGVhbS53YWxrKCkuZ2V0X2Fyb3VuZChkLCAgMSkpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8g5q2j6Z2i44GM6Zqc5a6z54mp44Gn44KC44Gd44Gu5omL5YmN44G+44Gn6KaL44GI44Gm44Gf44Gq44KJ44CB44Gd44Gu5aOB44Go5Lih5YG044Gv6KaL44GI44KLXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9fY2xlYXJfbWFzayh0ZWFtLndhbGsoKS5nZXRfYXJvdW5kKGQsIC0xKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9fY2xlYXJfbWFzayh0ZWFtLndhbGsoKS5nZXRfYXJvdW5kKGQsICAwKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9fY2xlYXJfbWFzayh0ZWFtLndhbGsoKS5nZXRfYXJvdW5kKGQsICAxKSk7XHJcbiAgICAgICAgICAgICAgICAvLyDmraPpnaLjgavpmpzlrrPnianjgYzmnInjgaPjgZ/jgonjgZ3jga7lpaXjga/opovjgYjjgarjgYTjga7jgafmjqLntKLntYLkuoZcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIF9fY2xlYXJfbWFzayhjbHJfcG9zOiBDX1BvaW50KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnNpemUud2l0aGluKGNscl9wb3MpKSByZXR1cm47XHJcblxyXG4gICAgICAgIGlmICh0aGlzLm1hc2tzW2Nscl9wb3Muel1bY2xyX3Bvcy55XVtjbHJfcG9zLnhdKSB7XHJcbiAgICAgICAgICAgIHRoaXMubWFza3NbY2xyX3Bvcy56XVtjbHJfcG9zLnldW2Nscl9wb3MueF0gPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy51bmNsZWFyW2Nscl9wb3Muel0tLTtcclxuICAgICAgICB9ICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpc19jbGVhcmVkKGNscl9wb3M6IENfUG9pbnQpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy51bmNsZWFyW2Nscl9wb3Muel0gPCAxO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpc19tYXNrZWQocDogQ19Qb2ludCk6IGJvb2xlYW4ge3JldHVybiB0aGlzLmlzX21hc2tlZF94eXoocC54LCBwLnksIHAueil9XHJcbiAgICBwdWJsaWMgaXNfbWFza2VkX3h5eih4OiBudW1iZXIsIHk6IG51bWJlciwgejogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubWFza3Nbel1beV1beF07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGlzX21vdmFibGUocDogQ19Qb2ludCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICghdGhpcy5zaXplLndpdGhpbihwKSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIHN3aXRjaCAodGhpcy5nZXRfa2luZChwKSkge1xyXG4gICAgICAgICAgICBjYXNlIFRfTXpLaW5kLkZsb29yOlxyXG4gICAgICAgICAgICBjYXNlIFRfTXpLaW5kLlVuZXhwOlxyXG4gICAgICAgICAgICBjYXNlIFRfTXpLaW5kLlN0clVwOlxyXG4gICAgICAgICAgICBjYXNlIFRfTXpLaW5kLlN0ckRuOlxyXG4gICAgICAgICAgICBjYXNlIFRfTXpLaW5kLlN0clVEOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0gICAgXHJcblxyXG4gICAgcHVibGljIGdldF94X21heCgpOiBudW1iZXIge3JldHVybiB0aGlzLnNpemUuc2l6ZV94KCk7fVxyXG4gICAgcHVibGljIGdldF95X21heCgpOiBudW1iZXIge3JldHVybiB0aGlzLnNpemUuc2l6ZV95KCk7fVxyXG4gICAgcHVibGljIGdldF96X21heCgpOiBudW1iZXIge3JldHVybiB0aGlzLnNpemUuc2l6ZV96KCk7fVxyXG4gICAgcHVibGljIGdldF9raW5kIChwOiBDX1BvaW50KTogVF9NektpbmQge1xyXG4gICAgICAgIGlmICh0aGlzLnNpemUud2l0aGluKHApKSByZXR1cm4gdGhpcy5jZWxsc1twLnpdW3AueV1bcC54XS5nZXRLaW5kKCk7XHJcbiAgICAgICAgcmV0dXJuIFRfTXpLaW5kLk5vRGVmO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldF9raW5kX3h5eiAoeDogbnVtYmVyLCB5OiBudW1iZXIsIHo6IG51bWJlcik6IFRfTXpLaW5kIHtcclxuICAgICAgICBpZiAodGhpcy5zaXplLndpdGhpbih4LCB5LCB6KSkgcmV0dXJuIHRoaXMuY2VsbHNbel1beV1beF0uZ2V0S2luZCgpO1xyXG4gICAgICAgIHJldHVybiBUX016S2luZC5Ob0RlZjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0X2NlbGxfeHl6ICh4OiBudW1iZXIsIHk6IG51bWJlciwgejogbnVtYmVyKTogQ19NYXplQ2VsbHx1bmRlZmluZWQgeyBcclxuICAgICAgICBpZiAodGhpcy5zaXplLndpdGhpbih4LCB5LCB6KSkgcmV0dXJuIHRoaXMuY2VsbHNbel1beV1beF07XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRfY2VsbCAocDogQ19Qb2ludCk6IENfTWF6ZUNlbGx8dW5kZWZpbmVkIHsgXHJcbiAgICAgICAgaWYgKHRoaXMuc2l6ZS53aXRoaW4ocCkpIHJldHVybiB0aGlzLmNlbGxzW3Auel1bcC55XVtwLnhdO1xyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0X2NlbGwocDogQ19Qb2ludCwgazogVF9NektpbmQpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5zaXplLndpdGhpbihwKSkge1xyXG4gICAgICAgICAgICB0aGlzLmNlbGxzW3Auel1bcC55XVtwLnhdID0gQ19NYXplQ2VsbC5uZXdPYmooe2tpbmQ6IGssIHBvczogcH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXRfY2VsbF94eXooeDogbnVtYmVyLCB5OiBudW1iZXIsIHo6IG51bWJlciwgazogVF9NektpbmQpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5zaXplLndpdGhpbih4LCB5LCB6KSkge1xyXG4gICAgICAgICAgICB0aGlzLmNlbGxzW3pdW3ldW3hdID0gQ19NYXplQ2VsbC5uZXdPYmooe2tpbmQ6IGssIHBvczoge3g6eCwgeTp5LCB6Onp9fSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIGNhbl9tb3ZlKHA6IENfUG9pbnQpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zaXplLndpdGhpbihwKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBjYW5fVUQocDogQ19Qb2ludCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmlzX21vdmFibGUocCk7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbnB1YmxpYyBmaWxsX2NlbGwoa2luZDogVF9NektpbmQsIGZsb29yOm51bWJlcik6IHZvaWQge1xyXG4gICAgZm9yIChsZXQgaCA9IDA7IGggPCB0aGlzLnNpemUuc2l6ZV95KCk7IGgrKylcclxuICAgIGZvciAobGV0IHcgPSAwOyB3IDwgdGhpcy5zaXplLnNpemVfeCgpOyB3KyspXHJcbiAgICAgICAgdGhpcy5zZXRfY2VsbF94eXoodywgaCwgZmxvb3IsIGtpbmQpO1xyXG4gICAgcmV0dXJuO1xyXG59XHJcblxyXG5wdWJsaWMgc2V0X2JveChraW5kOiBUX016S2luZCwgdG9wX3g6bnVtYmVyLCB0b3BfeTogbnVtYmVyLCBzaXplX3g6IG51bWJlciwgc2l6ZV95OiBudW1iZXIsIGZsb29yOiBudW1iZXIpOiB2b2lkIHtcclxuICAgIGlmICh0b3BfeCArIHNpemVfeCA+IHRoaXMuc2l6ZS5zaXplX3goKSkgc2l6ZV94ID0gdGhpcy5zaXplLnNpemVfeCgpIC0gdG9wX3ggKyAxOyBcclxuICAgIGlmICh0b3BfeSArIHNpemVfeSA+IHRoaXMuc2l6ZS5zaXplX3koKSkgc2l6ZV95ID0gdGhpcy5zaXplLnNpemVfeSgpIC0gdG9wX3kgKyAxO1xyXG4gICAgXHJcbiAgICBjb25zdCB0b3AgPSB0b3BfeTtcclxuICAgIGNvbnN0IGJ0bSA9IHRvcCAgICArIHNpemVfeSAtIDE7XHJcbiAgICBjb25zdCBsZnQgPSB0b3BfeDtcclxuICAgIGNvbnN0IHJndCA9IGxmdCAgICArIHNpemVfeCAtIDE7XHJcbiAgICBcclxuICAgIC8vIOWMl+WBtCjkuIop44Go5Y2X5YG0KOS4iynjgpLnn7Plo4HjgatcclxuICAgIGZvciAobGV0IHggPSAwOyB4IDwgc2l6ZV94OyB4KyspIHtcclxuICAgICAgICB0aGlzLnNldF9jZWxsX3h5eih4LCB0b3AsIGZsb29yLCBraW5kKTtcclxuICAgICAgICB0aGlzLnNldF9jZWxsX3h5eih4LCBidG0sIGZsb29yLCBraW5kKTtcclxuICAgIH1cclxuICAgIC8vIOadseWBtCjlj7Mp44Go6KW/5YG0KOW3pinjgpLnn7Plo4HjgatcclxuICAgIGZvciAobGV0IHkgPSAwOyB5IDwgc2l6ZV95OyB5KyspIHtcclxuICAgICAgICB0aGlzLnNldF9jZWxsX3h5eihsZnQsIHksIGZsb29yLCBraW5kKTtcclxuICAgICAgICB0aGlzLnNldF9jZWxsX3h5eihyZ3QsIHksIGZsb29yLCBraW5kKTtcclxuICAgIH1cclxuICAgIHJldHVybjtcclxufVxyXG5cclxuLy8g6ZqO5LiK44Go6ZqO5LiL44Gr6ZqO5q6144KS6Kit572u44GZ44KLXHJcbnB1YmxpYyBjcmVhdGVfc3RhaXIoZmxvb3I6bnVtYmVyKTogQ19Qb2ludERpciB7XHJcbiAgICBjb25zdCBIX3NpemVfeCA9ICh0aGlzLnNpemUuc2l6ZV94KCkgLSAxKSAvIDI7XHJcbiAgICBjb25zdCBIX3NpemVfeSA9ICh0aGlzLnNpemUuc2l6ZV95KCkgLSAxKSAvIDI7XHJcbiAgICBjb25zdCBwb3NfeCAgICA9IDIgKiBfaXJhbmQoMCwgSF9zaXplX3ggLSAxKSArIDE7XHJcbiAgICBjb25zdCBwb3NfeSAgICA9IDIgKiBfaXJhbmQoMCwgSF9zaXplX3kgLSAxKSArIDE7XHJcbiAgICBjb25zdCBwb3NfZCAgICA9IDEgKiBfaXJhbmQoMCwgVF9EaXJlY3Rpb24uTUFYKTtcclxuXHJcbiAgICAvLyDkubHmlbDjgaflvpfjgZ/luqfmqJnjgavpmo7mrrXjgpLnva7jgY9cclxuICAgIGlmIChmbG9vciA+PSAxKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZ2V0X2NlbGxfeHl6KHBvc194LCBwb3NfeSwgZmxvb3IgLSAxKT8uZ2V0S2luZCgpICE9PSBUX016S2luZC5TdHJVcCkge1xyXG4gICAgICAgICAgICB0aGlzLnNldF9jZWxsX3h5eihwb3NfeCwgcG9zX3ksIGZsb29yIC0gMSwgIFRfTXpLaW5kLlN0ckRuKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNldF9jZWxsX3h5eihwb3NfeCwgcG9zX3ksIGZsb29yIC0gMSwgIFRfTXpLaW5kLlN0clVEKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5nZXRfY2VsbF94eXoocG9zX3gsIHBvc195LCBmbG9vcik/LmdldEtpbmQoKSAhPT0gVF9NektpbmQuU3RyRG4pIHtcclxuICAgICAgICB0aGlzLnNldF9jZWxsX3h5eihwb3NfeCwgcG9zX3ksIGZsb29yLCAgVF9NektpbmQuU3RyVXApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnNldF9jZWxsX3h5eihwb3NfeCwgcG9zX3ksIGZsb29yLCAgVF9NektpbmQuU3RyVUQpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuZXcgQ19Qb2ludERpcih7eDogcG9zX3gsIHk6IHBvc195LCB6OiBmbG9vciwgZDogcG9zX2R9KTtcclxufVxyXG5cclxucHVibGljIGNyZWF0ZV9tYXplKGZsb29yOiBudW1iZXIpOiB2b2lkIHtcclxuICAgIGNvbnN0IHNpemVfeCA9IHRoaXMuc2l6ZS5zaXplX3goKTtcclxuICAgIGNvbnN0IHNpemVfeSA9IHRoaXMuc2l6ZS5zaXplX3koKTtcclxuXHJcblxyXG4gICAgLy8g44OA44Oz44K444On44Oz44GnJGZsb29y44Gn5oyH5a6a44GV44KM44Gf6ZqO44KS5pyq6LiP5Zyw44Gr44GZ44KLIFxyXG4gICAgdGhpcy5maWxsX2NlbGwoVF9NektpbmQuVW5leHAsIGZsb29yKTtcclxuXHJcbiAgICAvLyDjg4Djg7Pjgrjjg6fjg7Pjga7ovKrpg63jgpLnn7Plo4HjgavjgZnjgotcclxuICAgIHRoaXMuc2V0X2JveChUX016S2luZC5TdG9uZSwgMCwgMCwgc2l6ZV94LCBzaXplX3ksIGZsb29yKTtcclxuXHJcbiAgICAvLyDpgJrot6/jgavkuIDjgaTnva7jgY3jgavlo4HjgYzmiJDplbfjgZnjgovjg53jgqTjg7Pjg4jjgpLoqK3lrprjgZnjgotcclxuICAgIC8vIOODneOCpOODs+ODiOOBi+OCieWjgeOCkuS8uOOBsOOBmeaWueWQkeOCkuODqeODs+ODgOODoOOBq+axuuOCgeOCi1xyXG4gICAgY29uc3QgcG9pbnRzID0gbmV3IENfUG9pbnRTZXQyRCgpO1xyXG4gICAgZm9yIChsZXQgaCA9IDI7IGggPCBzaXplX3kgLSAyOyBoICs9IDIpe1xyXG4gICAgICAgIGZvciAobGV0IHcgPSAyOyB3IDwgc2l6ZV94IC0gMjsgdyArPSAyKXtcclxuICAgICAgICAgICAgY29uc3QgZGkgPSBfaXJhbmQoMCwgVF9EaXJlY3Rpb24uTUFYKTtcclxuICAgICAgICAgICAgcG9pbnRzLnB1c2gobmV3IENfUG9pbnRMaW5rMkQodywgaCwgZGkpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5Lmx5pWw44Gn44GE44GP44Gk44GL6YOo5bGL44KS5L2c44KLXHJcbiAgICBjb25zdCByb29tc19hcnJheSA9IFtdO1xyXG4gICAgY29uc3QgbnVtX29mX3Jvb20gPSBfaXJhbmQoMCwgdGhpcy5udW1fb2Zfcm9vbSk7XHJcbiAgICBmb3IgKGxldCBjbnQgPSAwOyBjbnQgPCBudW1fb2Zfcm9vbTsgY250KyspIHtcclxuICAgICAgICBjb25zdCBsZW5nX3ggPSBfaXJhbmQoMSwgIHRoaXMubWF4X3NpemVfb2Zfcm9vbSkgKiAyICsgMTtcclxuICAgICAgICBjb25zdCBsZW5nX3kgPSBfaXJhbmQoMSwgIHRoaXMubWF4X3NpemVfb2Zfcm9vbSkgKiAyICsgMTtcclxuICAgICAgICBjb25zdCByb29tX3ggPSBfaXJhbmQoMCwgKHNpemVfeCAtIGxlbmdfeCkgLyAyKSAqIDI7XHJcbiAgICAgICAgY29uc3Qgcm9vbV95ID0gX2lyYW5kKDAsIChzaXplX3kgLSBsZW5nX3kpIC8gMikgKiAyO1xyXG4gICAgICAgIHJvb21zX2FycmF5LnB1c2goe3R4OiByb29tX3gsIHR5OiByb29tX3ksIHN4OiBsZW5nX3gsIHN5OiBsZW5nX3l9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyDpg6jlsYvjga7kuK3jga7jg53jgqTjg7Pjg4jjgpLliYrpmaTjgZnjgotcclxuICAgIGZvciAoY29uc3Qgcm9vbSBvZiByb29tc19hcnJheSkge1xyXG4gICAgICAgIGZvciAobGV0IGlpID0gMDsgaWkgPCBwb2ludHMuc2V0Lmxlbmd0aDsgaWkrKykge1xyXG4gICAgICAgICAgICBjb25zdCBwID0gIHBvaW50cy5zZXRbaWldO1xyXG4gICAgICAgICAgICBpZiAocCA9PT0gdW5kZWZpbmVkKSBjb250aW51ZTtcclxuXHJcbiAgICAgICAgICAgIGlmICggICAgKHAueCA+PSByb29tLnR4KSBcclxuICAgICAgICAgICAgICAgICYmICAocC54IDw9IHJvb20udHggKyByb29tLnN4KVxyXG4gICAgICAgICAgICAgICAgJiYgIChwLnkgPj0gcm9vbS50eSlcclxuICAgICAgICAgICAgICAgICYmICAocC55IDw9IHJvb20udHkgKyByb29tLnN5KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBvaW50cy5yZW1vdmUocCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvLyDjg53jgqTjg7Pjg4jjgYvjgonlo4HjgpLmiJDplbfjgZXjgZvjgabov7fot6/jgpLkvZzjgotcclxuICAgIGZvciAoY29uc3QgcCBvZiBwb2ludHMuc2V0KSB7XHJcbiAgICAgICAgaWYgKHAgPT09IHVuZGVmaW5lZCkgY29udGludWU7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8g44Od44Kk44Oz44OI44Gu5L2N572u44Gr55+z5aOB44KS572u44GPXHJcbiAgICAgICAgdGhpcy5zZXRfY2VsbF94eXoocC54LCBwLnksIGZsb29yLCBUX016S2luZC5TdG9uZSk7XHJcblxyXG4gICAgICAgIC8vIOafseOBruadseilv+WNl+WMl+OBruOBhOOBmuOCjOOBi+OBq+OCguefs+WjgeOCkue9ruOBj1xyXG4gICAgICAgIGNvbnN0IGRpcmVjdGlvbiA9IFswLCAwLCAwLCAwXTtcclxuICAgICAgICBjb25zdCBkaSA9IENfUG9pbnRMaW5rMkQuY2FzdChwKT8uZGkgPz8gVF9EaXJlY3Rpb24uWDtcclxuICAgICAgICBpZiAoZGkgPT09IFRfRGlyZWN0aW9uLlgpIGNvbnRpbnVlO1xyXG4gICAgICAgIGRpcmVjdGlvbltkaV0gPSAxO1xyXG5cclxuICAgICAgICB0aGlzLnNldF9jZWxsX3h5eihcclxuICAgICAgICAgICAgcC54IC0gZGlyZWN0aW9uW1RfRGlyZWN0aW9uLlddICsgZGlyZWN0aW9uW1RfRGlyZWN0aW9uLkVdLCBcclxuICAgICAgICAgICAgcC55IC0gZGlyZWN0aW9uW1RfRGlyZWN0aW9uLk5dICsgZGlyZWN0aW9uW1RfRGlyZWN0aW9uLlNdLCBcclxuICAgICAgICAgICAgZmxvb3IsXHJcbiAgICAgICAgICAgIFRfTXpLaW5kLlN0b25lXHJcbiAgICAgICAgKTtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvLyDplonpjpbnqbrplpPjgYzlh7rmnaXjgabjgYTjgZ/jgonlh7rlj6PjgpLkvZzjgotcclxuICAgIC8vIOODneOCpOODs+ODiOOCkuODiOODrOODvOOCueOBl+OBpuOAgeaXouWHuuOBruODneOCpOODs+ODiOOBq+e5i+OBjOOBo+OBpuOBhOOBn+OCiemWiemOluepuumWk1xyXG4gICAgZm9yIChjb25zdCBzZXQgb2YgcG9pbnRzLnNldCkge1xyXG4gICAgICAgIGlmIChzZXQgPT09IHVuZGVmaW5lZCkgY29udGludWU7XHJcblxyXG4gICAgICAgIGNvbnN0IFt5biwgdHJhY2Vfc2V0XSA9IHRoaXMuY2hlY2tfY2xvc2Uoc2V0LngsIHNldC55LCBwb2ludHMsIG5ldyBDX1BvaW50U2V0MkQoKSk7XHJcbiAgICAgICAgaWYgKHluKSB7XHJcbiAgICAgICAgICAgIHRoaXMub3Blbl9leGl0KHRyYWNlX3NldCwgVF9NektpbmQuVW5leHAsIGZsb29yKTtcclxuICAgICAgICAgICAgaWYgKHRyYWNlX3NldCAhPT0gdW5kZWZpbmVkKSBmb3IgKGNvbnN0IHQgb2YgdHJhY2Vfc2V0LnNldCkgcG9pbnRzLnJlbW92ZSh0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm47XHJcbn1cclxuXHJcbnByb3RlY3RlZCBjaGVja19jbG9zZSh4OiBudW1iZXIsIHk6IG51bWJlciwgcG9pbnRfc2V0OiBDX1BvaW50U2V0MkQsIHRyYWNlX3NldDogQ19Qb2ludFNldDJEfHVuZGVmaW5lZCk6IFtib29sZWFuLCBDX1BvaW50U2V0MkR8dW5kZWZpbmVkXSB7XHJcbiAgICBpZiAoeCA8IDIgfHwgeSA8IDIgfHwgeCA+IHRoaXMuc2l6ZS5zaXplX3goKSAtIDIgfHwgeSA+IHRoaXMuc2l6ZS5zaXplX3koKSAtIDIpIHJldHVybiBbZmFsc2UsIHVuZGVmaW5lZF07XHJcblxyXG4gICAgaWYgKHBvaW50X3NldCA9PT0gdW5kZWZpbmVkKSByZXR1cm4gW2ZhbHNlLCB1bmRlZmluZWRdO1xyXG4gICAgaWYgKHBvaW50X3NldD8uaXNfZXhpc3QoeCwgeSkgPT09IGZhbHNlKSByZXR1cm4gW2ZhbHNlLCB1bmRlZmluZWRdO1xyXG5cclxuICAgIGlmICh0cmFjZV9zZXQgIT09IHVuZGVmaW5lZCAmJiB0cmFjZV9zZXQ/LmlzX2V4aXN0KHgsIHkpID09PSB0cnVlKSAgcmV0dXJuIFt0cnVlLCAgdHJhY2Vfc2V0XTtcclxuXHJcbiAgICBjb25zdCBwID0gcG9pbnRfc2V0LmdldF9wb2ludCh4LCB5KTtcclxuICAgIHRyYWNlX3NldCA/Pz0gbmV3IENfUG9pbnRTZXQyRCgpO1xyXG4gICAgdHJhY2Vfc2V0Py5wdXNoKG5ldyBDX1BvaW50TGluazJEKHgsIHksIENfUG9pbnRMaW5rMkQuY2FzdChwKT8uZGkpKTtcclxuXHJcbiAgICBsZXQgbmV4dF94OiBudW1iZXIgPSAwLCBuZXh0X3k6IG51bWJlciA9IDA7XHJcbiAgICBzd2l0Y2ggKENfUG9pbnRMaW5rMkQuY2FzdChwKT8uZGkpIHtcclxuICAgICAgICBjYXNlIFRfRGlyZWN0aW9uLk46ICAvLyDljJdcclxuICAgICAgICAgICAgbmV4dF94ID0geDtcclxuICAgICAgICAgICAgbmV4dF95ID0geSAtIDI7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgVF9EaXJlY3Rpb24uRTogIC8vIOadsVxyXG4gICAgICAgICAgICBuZXh0X3ggPSB4ICsgMjtcclxuICAgICAgICAgICAgbmV4dF95ID0geTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBUX0RpcmVjdGlvbi5TOiAgLy8g5Y2XXHJcbiAgICAgICAgICAgIG5leHRfeCA9IHg7XHJcbiAgICAgICAgICAgIG5leHRfeSA9IHkgKyAyO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFRfRGlyZWN0aW9uLlc6ICAvLyDopb9cclxuICAgICAgICAgICAgbmV4dF94ID0geCAtIDI7XHJcbiAgICAgICAgICAgIG5leHRfeSA9IHk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5jaGVja19jbG9zZShuZXh0X3gsIG5leHRfeSwgcG9pbnRfc2V0LCB0cmFjZV9zZXQpO1xyXG59XHJcblxyXG5wcm90ZWN0ZWQgb3Blbl9leGl0KHA6IENfUG9pbnRTZXQyRHx1bmRlZmluZWQsIGtpbmQ6IFRfTXpLaW5kLCBmbG9vcjogbnVtYmVyKTogdm9pZCB7XHJcbiAgICBpZiAocCA9PT0gdW5kZWZpbmVkKSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgY250ID0gX2lyYW5kKDAsIHAuc2V0Lmxlbmd0aCAtIDEpO1xyXG4gICAgY29uc3QgcHAgID0gIHAuc2V0W2NudF07XHJcblxyXG4gICAgbGV0IGRpcmVjdGlvbiA9IFswLCAwLCAwLCAwXTtcclxuICAgIGNvbnN0IGRpID0gQ19Qb2ludExpbmsyRC5jYXN0KHBwKT8uZGkgPz8gVF9EaXJlY3Rpb24uTlxyXG4gICAgZGlyZWN0aW9uW2RpXSA9IDE7XHJcblxyXG4gICAgdGhpcy5zZXRfY2VsbF94eXooXHJcbiAgICAgICAgcHAueCAtIGRpcmVjdGlvbltUX0RpcmVjdGlvbi5XXSArIGRpcmVjdGlvbltUX0RpcmVjdGlvbi5FXSwgXHJcbiAgICAgICAgcHAueSAtIGRpcmVjdGlvbltUX0RpcmVjdGlvbi5OXSArIGRpcmVjdGlvbltUX0RpcmVjdGlvbi5TXSwgXHJcbiAgICAgICAgZmxvb3IsXHJcbiAgICAgICAga2luZCBcclxuICAgICk7XHJcbiAgICByZXR1cm47XHJcbn1cclxuXHJcbi8qXHJcbnB1YmxpYyBzdGF0aWMgZnJvbV9vYmpfdG9fc3RyaW5nKG9hOiBDX01hemUpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KG9hLCBudWxsLCBcIlxcdFwiKTtcclxufVxyXG5wdWJsaWMgc3RhdGljIGZyb21fb2JqQXJyYXlfdG9fc3RyaW5nKG9hYToge1t1aWQ6IHN0cmluZ106IENfTWF6ZX0pOiBzdHJpbmcge1xyXG4gICAgY29uc3Qgb2EgPSBbXSBhcyBDX01hemVbXTtcclxuICAgIGZvciAoY29uc3QgaWkgaW4gb2FhKSBvYS5wdXNoKG9hYVtpaV0pO1xyXG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KG9hLCBudWxsLCBcIlxcdFwiKTtcclxufVxyXG5wdWJsaWMgc3RhdGljIGZyb21fc3RyaW5nX3RvX29iaih0eHQ6IHN0cmluZyk6IENfTWF6ZSB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IGogICA9IEpTT04ucGFyc2UodHh0KSBhcyBKU09OX01hemVbXTtcclxuICAgICAgICByZXR1cm4gbmV3IENfTWF6ZSgpLmRlY29kZShqKTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIHJldHVybiBuZXcgQ19NYXplKCk7XHJcbiAgICB9O1xyXG59XHJcbnB1YmxpYyBzdGF0aWMgZnJvbV9zdHJpbmdfdG9fb2JqQXJyYXkodHh0OiBzdHJpbmcpOiB7W3VpZDogc3RyaW5nXTogQ19NYXplfSB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IGogICA9IEpTT04ucGFyc2UodHh0KSBhcyBKU09OX01hemVbXTtcclxuICAgICAgICBjb25zdCBtcGEgPSB7fSBhcyB7W2lkOiBzdHJpbmddOiBDX01hemV9O1xyXG4gICAgICAgIGZvciAoY29uc3Qgamogb2Ygaikge1xyXG4gICAgICAgICAgICBjb25zdCBhYWEgPSBuZXcgQ19NYXplKCkuZGVjb2RlKGpqKTtcclxuICAgICAgICAgICAgbXBhW2FhYS51aWQoKV0gPSBhYWE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBtcGE7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICByZXR1cm4ge307XHJcbiAgICB9O1xyXG59XHJcbiovXHJcblxyXG4gICAgcHVibGljIHRvX2xldHRlcihwOiBDX1BvaW50KTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jZWxsc1twLnpdW3AueV1bcC54XS50b19sZXR0ZXIoKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyB0b19zdHJpbmcoZmxvb3I6IG51bWJlciA9IDAsIGRlYnVnX21vZGU6IGJvb2xlYW4gPSBmYWxzZSk6IHN0cmluZyB7XHJcbiAgICAgICAgY29uc3Qgc2l6ZV94ID0gdGhpcy5zaXplLnNpemVfeCgpO1xyXG4gICAgICAgIGNvbnN0IHNpemVfeSA9IHRoaXMuc2l6ZS5zaXplX3koKTtcclxuXHJcbiAgICAgICAgdmFyIHJldF9zdHI6IHN0cmluZyA9ICcnO1xyXG4gICAgICAgIGZvciAodmFyIHkgPSAwOyB5IDwgc2l6ZV95OyB5KyspIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgeCA9IDA7IHggPCBzaXplX3g7IHgrKykge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgb2JqID0gdGhpcy5nZXRfb2JqX3h5eih4LCB5LCBmbG9vcik7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWRlYnVnX21vZGUgJiYgdGhpcy5tYXNrc1tmbG9vcl1beV1beF0pIHtcclxuICAgICAgICAgICAgICAgICAgICByZXRfc3RyICs9ICfvvLgnO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBvYmpfYyA9IG9iaj8udmlldygpPy5sZXR0ZXIoKSA/PyBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvYmogPT09IG51bGwgfHwgb2JqX2MgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0X3N0ciArPSB0aGlzLmNlbGxzW2Zsb29yXVt5XVt4XS50b19sZXR0ZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXRfc3RyICs9IG9ial9jO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXRfc3RyICs9IFwiXFxuXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXRfc3RyO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGVuY29kZSgpOiBKU09OX01hemUge1xyXG4gICAgICAgIGNvbnN0IHNpemVfeCA9IHRoaXMuc2l6ZS5zaXplX3goKTtcclxuICAgICAgICBjb25zdCBzaXplX3kgPSB0aGlzLnNpemUuc2l6ZV95KCk7XHJcbiAgICAgICAgY29uc3Qgc2l6ZV96ID0gdGhpcy5zaXplLnNpemVfeigpO1xyXG5cclxuICAgICAgICB2YXIgel9hcnJheTogc3RyaW5nW10gPSBbXTtcclxuICAgICAgICBmb3IgKHZhciB6ID0gMDsgeiA8IHNpemVfejsgeisrKSB7XHJcbiAgICAgICAgICAgIHZhciB5X2FycmF5OiBzdHJpbmdbXSA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKHZhciB5ID0gMDsgeSA8IHNpemVfeTsgeSsrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgeF9hcnJheTogc3RyaW5nW10gPSBbXTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIHggPSAwOyB4IDwgc2l6ZV94OyB4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICB4X2FycmF5LnB1c2godGhpcy5jZWxsc1t6XVt5XVt4XS5lbmNvZGUoKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB5X2FycmF5LnB1c2goeF9hcnJheS5qb2luKCdYJykpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHpfYXJyYXkucHVzaCh5X2FycmF5LmpvaW4oJ1knKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IG1hemVfc3RyID0gel9hcnJheS5qb2luKCdaJyk7XHJcblxyXG4gICAgICAgIHZhciB6X2FycmF5OiBzdHJpbmdbXSA9IFtdO1xyXG4gICAgICAgIGZvciAodmFyIHogPSAwOyB6IDwgc2l6ZV96OyB6KyspIHtcclxuICAgICAgICAgICAgdmFyIHlfYXJyYXk6IHN0cmluZ1tdID0gW107XHJcbiAgICAgICAgICAgIGZvciAodmFyIHkgPSAwOyB5IDwgc2l6ZV95OyB5KyspIHtcclxuICAgICAgICAgICAgICAgIHZhciB4X2FycmF5OiBzdHJpbmdbXSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgeCA9IDA7IHggPCBzaXplX3g7IHgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHhfYXJyYXkucHVzaCh0aGlzLm1hc2tzW3pdW3ldW3hdID8gJzEnIDogJzAnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHlfYXJyYXkucHVzaCh4X2FycmF5LmpvaW4oJ1gnKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgel9hcnJheS5wdXNoKHlfYXJyYXkuam9pbignWScpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgbWFza19zdHIgPSB6X2FycmF5LmpvaW4oJ1onKTtcclxuXHJcbiAgICAgICAgbGV0IG9ianMgPSBbXTtcclxuICAgICAgICBmb3IgKGNvbnN0IGlpIGluIHRoaXMub2Jqcykgb2Jqcy5wdXNoKHRoaXMub2Jqc1tpaV0uZW5jb2RlKCkpO1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBpZDogICAgICB0aGlzLm1hemVfaWQsXHJcbiAgICAgICAgICAgIHVuaXFfaWQ6IHRoaXMudW5pcV9pZCxcclxuICAgICAgICAgICAgc2F2ZV9pZDogdGhpcy5zYXZlX2lkLFxyXG4gICAgICAgICAgICBmbG9vcjogICB0aGlzLmZsb29yLFxyXG4gICAgICAgICAgICBuYW1lOiAgICB0aGlzLm5hbWUsXHJcbiAgICAgICAgICAgIG9ianM6ICAgIG9ianMsXHJcbiAgICAgICAgICAgIHNpemVfeDogIHRoaXMuc2l6ZS5zaXplX3goKSxcclxuICAgICAgICAgICAgc2l6ZV95OiAgdGhpcy5zaXplLnNpemVfeSgpLFxyXG4gICAgICAgICAgICBzaXplX3o6ICB0aGlzLnNpemUuc2l6ZV96KCksXHJcbiAgICAgICAgICAgIG1hemU6ICAgIG1hemVfc3RyLFxyXG4gICAgICAgICAgICBtYXNrOiAgICBtYXNrX3N0cixcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZGVjb2RlKGE6IEpTT05fTWF6ZXx1bmRlZmluZWQpOiBDX01hemUge1xyXG4gICAgICAgIGlmIChhID09PSB1bmRlZmluZWQpIHJldHVybiB0aGlzO1xyXG5cclxuICAgICAgICBpZiAoYS5pZCAgICAgICE9PSB1bmRlZmluZWQpIHRoaXMubWF6ZV9pZCA9IGEuaWQ7XHJcbiAgICAgICAgaWYgKGEudW5pcV9pZCAhPT0gdW5kZWZpbmVkKSB0aGlzLnVuaXFfaWQgPSBhLnVuaXFfaWQ7XHJcbiAgICAgICAgaWYgKGEuc2F2ZV9pZCAhPT0gdW5kZWZpbmVkKSB0aGlzLnNhdmVfaWQgPSBhLnNhdmVfaWQ7XHJcbiAgICAgICAgaWYgKGEuZmxvb3IgICAhPT0gdW5kZWZpbmVkKSB0aGlzLmZsb29yICAgPSBhLmZsb29yO1xyXG4gICAgICAgIGlmIChhLm5hbWUgICAgIT09IHVuZGVmaW5lZCkgdGhpcy5uYW1lICAgID0gYS5uYW1lO1xyXG5cclxuICAgICAgICBpZiAoYS5vYmpzICAgICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5vYmpzID0ge307XHJcbiAgICAgICAgICAgIGZvciAoY29uc3QganNvbl9vYmogb2YgYS5vYmpzKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdfb2JqID0gQ19NYXplT2JqLm5ld09iaihqc29uX29iaik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9ianNbbmV3X29iai51aWQoKV0gPSBuZXdfb2JqO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoYS5zaXplX3ggIT09IHVuZGVmaW5lZCAmJiBhLnNpemVfeSAhPT0gdW5kZWZpbmVkICYmIGEuc2l6ZV96ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5zaXplICA9IG5ldyBDX1JhbmdlKFxyXG4gICAgICAgICAgICAgICAgbmV3IENfUG9pbnQoMCwgMCwgMCksIFxyXG4gICAgICAgICAgICAgICAgbmV3IENfUG9pbnQoYS5zaXplX3ggLSAxLCBhLnNpemVfeSAtIDEsIGEuc2l6ZV96IC0gMSlcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIHRoaXMuY2VsbHMgICA9IHRoaXMuX19pbml0X21hemUoVF9NektpbmQuU3RvbmUpO1xyXG4gICAgICAgICAgICB0aGlzLm1hc2tzICAgPSB0aGlzLl9faW5pdF9tYXNrKHRydWUpO1xyXG4gICAgICAgICAgICB0aGlzLl9faW5pdF91bmNsZWFyKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBzaXplX3ggPSB0aGlzLnNpemUuc2l6ZV94KCk7XHJcbiAgICAgICAgY29uc3Qgc2l6ZV95ID0gdGhpcy5zaXplLnNpemVfeSgpO1xyXG4gICAgICAgIGNvbnN0IHNpemVfeiA9IHRoaXMuc2l6ZS5zaXplX3ooKTtcclxuXHJcblxyXG4gICAgICAgIGlmIChhLm1hemUgIT09IHVuZGVmaW5lZCkge1xyXG4vKlxyXG4gICAgICAgICAgICBmb3IgKHZhciB6ID0gMDsgeiA8IHNpemVfejsgeisrKVxyXG4gICAgICAgICAgICBmb3IgKHZhciB5ID0gMDsgeSA8IHNpemVfeTsgeSsrKVxyXG4gICAgICAgICAgICBmb3IgKHZhciB4ID0gMDsgeCA8IHNpemVfeDsgeCsrKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNlbGxzW3pdW3ldW3hdLnNldChUX016S2luZC5TdG9uZSk7XHJcbiAgICAgICAgICAgIH1cclxuKi9cclxuICAgICAgICAgICAgY29uc3Qgel9hcnJheTogc3RyaW5nW10gPSBhLm1hemUuc3BsaXQoJ1onKTtcclxuICAgICAgICAgICAgY29uc3Qgel9tYXggPSBfbWluKFtzaXplX3osIHpfYXJyYXkubGVuZ3RoXSk7XHJcbiAgICAgICAgICAgIGZvciAodmFyIHogPSAwOyB6IDwgel9tYXg7IHorKykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgeV9hcnJheTogc3RyaW5nW10gPSB6X2FycmF5W3pdLnNwbGl0KCdZJyk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB5X21heCA9ICBfbWluKFtzaXplX3ksIHlfYXJyYXkubGVuZ3RoXSk7IFxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgeSA9IDA7IHkgPCB5X21heDsgeSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgeF9hcnJheTogc3RyaW5nW10gPSB5X2FycmF5W3ldLnNwbGl0KCdYJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgeF9tYXggPSAgX21pbihbc2l6ZV94LCB4X2FycmF5Lmxlbmd0aF0pOyBcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciB4ID0gMDsgeCA8IHhfbWF4OyB4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGtpbmQgPSBwYXJzZUludCh4X2FycmF5W3hdLCAxNik7IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNlbGxzW3pdW3ldW3hdID0gQ19NYXplQ2VsbC5uZXdPYmooe2tpbmQ6IGtpbmQsIHBvczoge3g6eCwgeTp5LCB6Onp9fSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ICBcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGEubWFzayAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX19pbml0X21hc2sodHJ1ZSk7XHJcbiAgICAgICAgICAgIGNvbnN0IHpfYXJyYXk6IHN0cmluZ1tdID0gYS5tYXNrLnNwbGl0KCdaJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IHpfbWF4ID0gX21pbihbc2l6ZV96LCB6X2FycmF5Lmxlbmd0aF0pO1xyXG4gICAgICAgICAgICBmb3IgKHZhciB6ID0gMDsgeiA8IHpfbWF4OyB6KyspIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHlfYXJyYXk6IHN0cmluZ1tdID0gel9hcnJheVt6XS5zcGxpdCgnWScpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgeV9tYXggPSAgX21pbihbc2l6ZV95LCB5X2FycmF5Lmxlbmd0aF0pOyBcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIHkgPSAwOyB5IDwgeV9tYXg7IHkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHhfYXJyYXk6IHN0cmluZ1tdID0geV9hcnJheVt5XS5zcGxpdCgnWCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHhfbWF4ID0gIF9taW4oW3NpemVfeCwgeF9hcnJheS5sZW5ndGhdKTsgXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgeCA9IDA7IHggPCB4X21heDsgeCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh4X2FycmF5W3hdICE9PSAnMCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFza3Nbel1beV1beF0gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXNrc1t6XVt5XVt4XSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX19pbml0X3VuY2xlYXIoKTsgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc3RhdGljIGVuY29kZV9hbGwoYWxsX21hemU6IENfTWF6ZVtdKTogSlNPTl9NYXplW10ge1xyXG4gICAgICAgIGNvbnN0IGFsbF9tYXplX2RhdGE6IEpTT05fTWF6ZVtdID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgbWF6ZSBvZiBhbGxfbWF6ZSkge1xyXG4gICAgICAgICAgICBhbGxfbWF6ZV9kYXRhLnB1c2gobWF6ZS5lbmNvZGUoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhbGxfbWF6ZV9kYXRhO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHN0YXRpYyBkZWNvZGVfYWxsKGFsbF9tYXplX2RhdGE6IEpTT05fTWF6ZVtdKTogQ19NYXplW10ge1xyXG4gICAgICAgIGNvbnN0IGFsbF9tYXplOiBDX01hemVbXSA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IG1hemVfZGF0YSBvZiBhbGxfbWF6ZV9kYXRhKSB7XHJcbiAgICAgICAgICAgIGFsbF9tYXplLnB1c2goKG5ldyBDX01hemUoe30pKS5kZWNvZGUobWF6ZV9kYXRhKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhbGxfbWF6ZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIGFsZXJ0KCk6IHZvaWQge1xyXG4gICAgICAgIGFsZXJ0KFwiTWF6ZSBJbmZvOlwiXHJcbiAgICAgICAgICAgICsgXCJcXG5tYXplIGlkIDpcIiArICh0aGlzLm1hemVfaWQgPz8gJz8nKVxyXG4gICAgICAgICAgICArIFwiXFxuZmxvb3I6IFwiICAgKyAodGhpcy5mbG9vciAgID8/ICc/JylcclxuICAgICAgICAgICAgKyBcIlxcbnVuaXEgaWQgOlwiICsgKHRoaXMudW5pcV9pZCA/PyAnPycpXHJcbiAgICAgICAgICAgICsgXCJcXG5zYXZlIGlkIDpcIiArICh0aGlzLnNhdmVfaWQgPz8gJz8nKVxyXG4gICAgICAgICAgICArIFwiXFxubmFtZTogICBcIiAgKyAodGhpcy5uYW1lICAgID8/ICc/JylcclxuICAgICAgICAgICAgKyBcIlxcbnNpemVfeDogXCIgICsgKHRoaXMuc2l6ZS5zaXplX3goKSA/PyAnPycpXHJcbiAgICAgICAgICAgICsgXCJcXG5zaXplX3k6IFwiICArICh0aGlzLnNpemUuc2l6ZV95KCkgPz8gJz8nKVxyXG4gICAgICAgICAgICArIFwiXFxuc2l6ZV96OiBcIiAgKyAodGhpcy5zaXplLnNpemVfeigpID8/ICc/JylcclxuICAgICAgICAgICAgKyBcIlxcblwiXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBhbGVydF9tYXplKGZsb29yOiBudW1iZXIgPSAwKTogdm9pZCB7XHJcbiAgICAgICAgYWxlcnQoXCJNYXplIE1hcDpcIlxyXG4gICAgICAgICAgICArIFwibWF6ZTpcXG5cIiAgICAgKyAodGhpcy50b19zdHJpbmcoZmxvb3IsIHRydWUpICA/PyAnPycpXHJcbiAgICAgICAgICAgICsgXCJcXG5cIlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgYWxlcnRfbWFzayhmbG9vcjogbnVtYmVyID0gMCk6IHZvaWQge1xyXG4gICAgICAgIGFsZXJ0KFwiTWFzayBNYXA6XCJcclxuICAgICAgICAgICAgKyBcIm1hc2s6XFxuXCIgICAgICsgKHRoaXMudG9fc3RyaW5nKGZsb29yLCBmYWxzZSkgPz8gJz8nKVxyXG4gICAgICAgICAgICArIFwiXFxuXCJcclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5cclxuaW1wb3J0IHsgX2dldF91dWlkIH0gZnJvbSBcIi4uL2RfdXRsL0ZfUmFuZFwiO1xyXG5pbXBvcnQgeyBUX016S2luZCB9ICBmcm9tIFwiLi9UX016S2luZFwiO1xyXG5pbXBvcnQgeyBKU09OX0FueSB9ICBmcm9tIFwiLi9DX1NhdmVJbmZvXCI7XHJcbmltcG9ydCB7IENfTWF6ZU9iaiwgSV9NYXplT2JqLCBKU09OX01hemVPYmogfSBmcm9tIFwiLi9DX01hemVPYmpcIjtcclxuaW1wb3J0IHsgVF9XYWxsIH0gICAgZnJvbSAnLi9DX1dhbGwnO1xyXG5cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSlNPTl9NYXplQ2VsbCBleHRlbmRzIEpTT05fQW55IHtcclxuICAgIGtpbmQ/OiBUX016S2luZFxyXG4gICAgb2JqPzogIEpTT05fTWF6ZU9iaixcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIENfTWF6ZUNlbGwgIHtcclxuICAgIHByb3RlY3RlZCBraW5kOiAgIFRfTXpLaW5kO1xyXG4gICAgcHJvdGVjdGVkIG15X29iajogSV9NYXplT2JqO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgbmV3T2JqKGo6IEpTT05fTWF6ZUNlbGwpOiBDX01hemVDZWxsIHtcclxuICAgICAgICBzd2l0Y2ggKGoua2luZCkge1xyXG4gICAgICAgICAgICBjYXNlIFRfTXpLaW5kLk5vRGVmOiByZXR1cm4gbmV3IENfTWF6ZUNlbGxOb0RlZihqKTsgXHJcbiAgICAgICAgICAgIGNhc2UgVF9NektpbmQuVW5rd246IHJldHVybiBuZXcgQ19NYXplQ2VsbFVua3duKGopOyBcclxuICAgICAgICAgICAgY2FzZSBUX016S2luZC5FbXB0eTogcmV0dXJuIG5ldyBDX01hemVDZWxsRW1wdHkoaik7IFxyXG4gICAgICAgICAgICBjYXNlIFRfTXpLaW5kLkZsb29yOiByZXR1cm4gbmV3IENfTWF6ZUNlbGxGbG9vcihqKTtcclxuICAgICAgICAgICAgY2FzZSBUX016S2luZC5VbmV4cDogcmV0dXJuIG5ldyBDX01hemVDZWxsVW5leHAoaik7XHJcbiAgICAgICAgICAgIGNhc2UgVF9NektpbmQuU3RvbmU6IHJldHVybiBuZXcgQ19NYXplQ2VsbFN0b25lKGopO1xyXG4gICAgICAgICAgICBjYXNlIFRfTXpLaW5kLlN0clVwOiByZXR1cm4gbmV3IENfTWF6ZUNlbGxTdHJVcChqKTtcclxuICAgICAgICAgICAgY2FzZSBUX016S2luZC5TdHJEbjogcmV0dXJuIG5ldyBDX01hemVDZWxsU3RyRG4oaik7IFxyXG4gICAgICAgICAgICBjYXNlIFRfTXpLaW5kLlN0clVEOiByZXR1cm4gbmV3IENfTWF6ZUNlbGxTdHJVRChqKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5ldyBDX01hemVDZWxsTm9EZWYoaik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKGo6IEpTT05fTWF6ZUNlbGwpIHtcclxuICAgICAgICBqLm9iaiA/Pz0ge307XHJcbiAgICAgICAgai5vYmouY2xuYW1lID8/PSB0aGlzLmNvbnN0cnVjdG9yLm5hbWU7XHJcblxyXG4gICAgICAgIHRoaXMua2luZCAgID0gai5raW5kID8/IFRfTXpLaW5kLk5vRGVmO1xyXG4gICAgICAgIHRoaXMubXlfb2JqID0gQ19NYXplT2JqLm5ld09iaihqLm9iaik7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0T2JqKCk6ICBJX01hemVPYmoge3JldHVybiB0aGlzLm15X29ian1cclxuICAgIHB1YmxpYyBnZXRLaW5kKCk6IFRfTXpLaW5kIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5raW5kO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB0b19sZXR0ZXIoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5teV9vYmoudmlldygpPy5sZXR0ZXIoKSA/PyAn77y4JztcclxuICAgIH1cclxuICAgIHB1YmxpYyBzdGF0aWMgZnJvbV9sZXR0ZXIobGV0dGVyOiBzdHJpbmcpOiBudW1iZXIge1xyXG4gICAgICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKFRfTXpLaW5kKSkge1xyXG4gICAgICAgICAgICBpZiAobGV0dGVyID09PSBrZXkpIHJldHVybiBUX016S2luZFtrZXldO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gVF9NektpbmQuTm9EZWY7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRyb3czRChmcm90OiBUX1dhbGwsIGJhY2s6IFRfV2FsbCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubXlfb2JqLnZpZXcoKT8uZHJvdzNEKGZyb3QsIGJhY2spO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBlbmNvZGUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5raW5kLnRvU3RyaW5nKDE2KS5wYWRTdGFydCgyLFwiMFwiKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzdGF0aWMgZGVjb2RlKHN0cjogc3RyaW5nLCBqPzogSlNPTl9NYXplQ2VsbCk6IENfTWF6ZUNlbGx8dW5kZWZpbmVkIHtcclxuICAgICAgICAgY29uc3Qga2luZCA9IHBhcnNlSW50KHN0ciwgMTYpIGFzIFRfTXpLaW5kO1xyXG4gICAgICAgICByZXR1cm4gQ19NYXplQ2VsbC5uZXdPYmooe2tpbmQ6IGtpbmQsIHBvczogaj8ucG9zfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIENfTWF6ZUNlbGxOb0RlZiBleHRlbmRzIENfTWF6ZUNlbGwge1xyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKGo/OiBKU09OX01hemVDZWxsfHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGogPz89IHtraW5kOiBUX016S2luZC5Ob0RlZn07XHJcbiAgICAgICAgai5vYmogPz89IHt9O1xyXG5cclxuICAgICAgICBqLm9iai5jYW5fdGhyID0gJzAnO1xyXG4gICAgICAgIGoub2JqLnBvcyAgICAgPSB7eDpqLngsIHk6ai55LCB6Omouen07XHJcbiAgICAgICAgai5vYmoudmlldyAgICA9ICB7XHJcbiAgICAgICAgICAgIGxheWVyOiAwLCBsZXR0ZXI6ICfnlpEnLCBcclxuICAgICAgICAgICAgc2hvdzNEOiAgJzAnLFxyXG4gICAgICAgICAgICBwYWRfdDogMC4wLCBwYWRfZDogMC4wLCBwYWRfczogMC4wLFxyXG4gICAgICAgICAgICBjb2xfZjogJycsIGNvbF9iOiAnJywgY29sX3M6ICcnLCBjb2xfdDogJycsIGNvbF9kOiAnJywgXHJcbiAgICAgICAgICAgIGNvbF9sOiAnJywgY29sXzI6ICcnLCBcclxuICAgICAgICB9XHJcbiAgICAgICAgc3VwZXIoaik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIENfTWF6ZUNlbGxVbmt3biBleHRlbmRzIENfTWF6ZUNlbGwge1xyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKGo/OiBKU09OX01hemVDZWxsfHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGogPz89IHtraW5kOiBUX016S2luZC5Vbmt3bn07XHJcbiAgICAgICAgai5vYmogPz89IHt9O1xyXG5cclxuICAgICAgICBqLm9iai5jYW5fdGhyID0gJzAnO1xyXG4gICAgICAgIGoub2JqLnBvcyAgICAgPSB7eDpqLngsIHk6ai55LCB6Omouen07XHJcbiAgICAgICAgai5vYmoudmlldyAgICA9ICB7XHJcbiAgICAgICAgICAgIGxheWVyOiAwLCBsZXR0ZXI6ICforI4nLCBcclxuICAgICAgICAgICAgc2hvdzNEOiAgJzAnLFxyXG4gICAgICAgICAgICBwYWRfdDogMC4wLCBwYWRfZDogMC4wLCBwYWRfczogMC4wLFxyXG4gICAgICAgICAgICBjb2xfZjogJycsIGNvbF9iOiAnJywgY29sX3M6ICcnLCBjb2xfdDogJycsIGNvbF9kOiAnJywgXHJcbiAgICAgICAgICAgIGNvbF9sOiAnJywgY29sXzI6ICcnLCBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIHN1cGVyKGopO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBDX01hemVDZWxsRW1wdHkgZXh0ZW5kcyBDX01hemVDZWxsIHtcclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihqPzogSlNPTl9NYXplQ2VsbHx1bmRlZmluZWQpIHtcclxuICAgICAgICBqID8/PSB7a2luZDogVF9NektpbmQuRW1wdHl9O1xyXG4gICAgICAgIGoub2JqID8/PSB7fTtcclxuXHJcbiAgICAgICAgai5vYmouY2FuX3RociA9ICcxJztcclxuICAgICAgICBqLm9iai5wb3MgICAgID0ge3g6ai54LCB5OmoueSwgejpqLnp9O1xyXG4gICAgICAgIGoub2JqLnZpZXcgICAgPSAge1xyXG4gICAgICAgICAgICBsYXllcjogMCwgbGV0dGVyOiAn54ShJywgXHJcbiAgICAgICAgICAgIHNob3czRDogICcwJyxcclxuICAgICAgICAgICAgcGFkX3Q6IDAuMCwgcGFkX2Q6IDAuMCwgcGFkX3M6IDAuMCxcclxuICAgICAgICAgICAgY29sX2Y6ICcnLCBjb2xfYjogJycsIGNvbF9zOiAnJywgY29sX3Q6ICcnLCBjb2xfZDogJycsIFxyXG4gICAgICAgICAgICBjb2xfbDogJycsIGNvbF8yOiAnJywgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBzdXBlcihqKTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgQ19NYXplQ2VsbEZsb29yIGV4dGVuZHMgQ19NYXplQ2VsbCB7XHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3Ioaj86IEpTT05fTWF6ZUNlbGx8dW5kZWZpbmVkKSB7XHJcbiAgICAgICAgaiA/Pz0ge2tpbmQ6IFRfTXpLaW5kLkZsb29yfTtcclxuICAgICAgICBqLm9iaiA/Pz0ge307XHJcblxyXG4gICAgICAgIGoub2JqLmNhbl90aHIgPSAnMSc7XHJcbiAgICAgICAgai5vYmoucG9zICAgICA9IHt4OmoueCwgeTpqLnksIHo6ai56fTtcclxuICAgICAgICBqLm9iai52aWV3ICAgID0gIHtcclxuICAgICAgICAgICAgbGF5ZXI6IDAsIGxldHRlcjogJ+OAgCcsIFxyXG4gICAgICAgICAgICBzaG93M0Q6ICAnMScsXHJcbiAgICAgICAgICAgIHBhZF90OiAwLjAsIHBhZF9kOiAwLjAsIHBhZF9zOiAwLjAsXHJcbiAgICAgICAgICAgIGNvbF9mOiAnJywgY29sX2I6ICcnLCBjb2xfczogJycsIGNvbF90OiAnIzY2NjZmZicsIGNvbF9kOiAnJywgXHJcbiAgICAgICAgICAgIGNvbF9sOiAnIzk5OTlmZicsIGNvbF8yOiAnIzY2NjZmZicsIFxyXG4gICAgICAgIH1cclxuICAgICAgICBzdXBlcihqKTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgQ19NYXplQ2VsbFVuZXhwIGV4dGVuZHMgQ19NYXplQ2VsbCB7XHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3Ioaj86IEpTT05fTWF6ZUNlbGx8dW5kZWZpbmVkKSB7XHJcbiAgICAgICAgaiA/Pz0ge2tpbmQ6IFRfTXpLaW5kLlVuZXhwfTtcclxuICAgICAgICBqLm9iaiA/Pz0ge307XHJcblxyXG4gICAgICAgIGoub2JqLmNhbl90aHIgPSAnMSc7XHJcbiAgICAgICAgai5vYmoucG9zICAgICA9IHt4OmoueCwgeTpqLnksIHo6ai56fTtcclxuICAgICAgICBqLm9iai52aWV3ICAgID0gIHtcclxuICAgICAgICAgICAgbGF5ZXI6IDAsIGxldHRlcjogJ+ODuycsIFxyXG4gICAgICAgICAgICBzaG93M0Q6ICAnMScsXHJcbiAgICAgICAgICAgIHBhZF90OiAwLjAsIHBhZF9kOiAwLjAsIHBhZF9zOiAwLjAsXHJcbiAgICAgICAgICAgIGNvbF9mOiAnJywgY29sX2I6ICcnLCBjb2xfczogJycsIGNvbF90OiAnIzY2ZmZmZicsIGNvbF9kOiAnJywgXHJcbiAgICAgICAgICAgIGNvbF9sOiAnIzk5OTlmZicsIGNvbF8yOiAnIzY2ZmZmZicsIFxyXG4gICAgICAgIH1cclxuICAgICAgICBzdXBlcihqKTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgQ19NYXplQ2VsbFN0b25lIGV4dGVuZHMgQ19NYXplQ2VsbCB7XHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3Ioaj86IEpTT05fTWF6ZUNlbGx8dW5kZWZpbmVkKSB7XHJcbiAgICAgICAgaiA/Pz0ge2tpbmQ6IFRfTXpLaW5kLlN0b25lfTtcclxuICAgICAgICBqLm9iaiA/Pz0ge307XHJcblxyXG4gICAgICAgIGoub2JqLmNhbl90aHIgPSAnMCc7XHJcbiAgICAgICAgai5vYmoucG9zICAgICA9IHt4OmoueCwgeTpqLnksIHo6ai56fTtcclxuICAgICAgICBqLm9iai52aWV3ICAgID0gIHtcclxuICAgICAgICAgICAgbGF5ZXI6IDAsIGxldHRlcjogJ++8gycsIFxyXG4gICAgICAgICAgICBzaG93M0Q6ICAnMScsXHJcbiAgICAgICAgICAgIHBhZF90OiAwLjAsIHBhZF9kOiAwLjAsIHBhZF9zOiAwLjAsXHJcbiAgICAgICAgICAgIGNvbF9mOiAnIzAwZmYwMCcsIGNvbF9iOiAnJywgY29sX3M6ICcjMDBlZTAwJywgY29sX3Q6ICcnLCBjb2xfZDogJycsIFxyXG4gICAgICAgICAgICBjb2xfbDogJyMwMDAwZmYnLCBjb2xfMjogJyMwMGVlMDAnLCBcclxuICAgICAgICB9XHJcbiAgICAgICAgc3VwZXIoaik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIENfTWF6ZUNlbGxTdHJVcCBleHRlbmRzIENfTWF6ZUNlbGwge1xyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKGo/OiBKU09OX01hemVDZWxsfHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGogPz89IHtraW5kOiBUX016S2luZC5TdHJVcH07XHJcbiAgICAgICAgai5vYmogPz89IHt9O1xyXG5cclxuICAgICAgICBqLm9iai5jYW5fdGhyID0gJzEnO1xyXG4gICAgICAgIGoub2JqLnBvcyAgICAgPSB7eDpqLngsIHk6ai55LCB6Omouen07XHJcbiAgICAgICAgai5vYmoudmlldyAgICA9ICB7XHJcbiAgICAgICAgICAgIGxheWVyOiAwLCBsZXR0ZXI6ICfkuIonLCBcclxuICAgICAgICAgICAgc2hvdzNEOiAgJzEnLFxyXG4gICAgICAgICAgICBwYWRfdDogMC4wLCBwYWRfZDogMC4wLCBwYWRfczogMC4wLFxyXG4gICAgICAgICAgICBjb2xfZjogJycsIGNvbF9iOiAnJywgY29sX3M6ICcnLCBjb2xfdDogJycsIGNvbF9kOiAnI2ZmZmZjYycsIFxyXG4gICAgICAgICAgICBjb2xfbDogJyMwMDAwZmYnLCBjb2xfMjogJyNmZmZmY2MnLCBcclxuICAgICAgICB9XHJcbiAgICAgICAgc3VwZXIoaik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIENfTWF6ZUNlbGxTdHJEbiBleHRlbmRzIENfTWF6ZUNlbGwge1xyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKGo/OiBKU09OX01hemVDZWxsfHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGogPz89IHtraW5kOiBUX016S2luZC5TdHJEbn07XHJcbiAgICAgICAgai5vYmogPz89IHt9O1xyXG5cclxuICAgICAgICBqLm9iai5jYW5fdGhyID0gJzEnO1xyXG4gICAgICAgIGoub2JqLnBvcyAgICAgPSB7eDpqLngsIHk6ai55LCB6Omouen07XHJcbiAgICAgICAgai5vYmoudmlldyAgICA9ICB7XHJcbiAgICAgICAgICAgIGxheWVyOiAwLCBsZXR0ZXI6ICfkuIsnLCBcclxuICAgICAgICAgICAgc2hvdzNEOiAgJzEnLFxyXG4gICAgICAgICAgICBwYWRfdDogMC4wLCBwYWRfZDogMC4wLCBwYWRfczogMC4wLFxyXG4gICAgICAgICAgICBjb2xfZjogJycsIGNvbF9iOiAnJywgY29sX3M6ICcnLCBjb2xfdDogJyNmZmZmY2MnLCBjb2xfZDogJycsIFxyXG4gICAgICAgICAgICBjb2xfbDogJyMwMDAwZmYnLCBjb2xfMjogJyNmZmZmY2MnLCBcclxuICAgICAgICB9XHJcbiAgICAgICAgc3VwZXIoaik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIENfTWF6ZUNlbGxTdHJVRCBleHRlbmRzIENfTWF6ZUNlbGwge1xyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKGo/OiBKU09OX01hemVDZWxsfHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGogPz89IHtraW5kOiBUX016S2luZC5TdHJVRH07XHJcbiAgICAgICAgai5vYmogPz89IHt9O1xyXG5cclxuICAgICAgICBqLm9iai5jYW5fdGhyID0gJzEnO1xyXG4gICAgICAgIGoub2JqLnBvcyAgICAgPSB7eDpqLngsIHk6ai55LCB6Omouen07XHJcbiAgICAgICAgai5vYmoudmlldyAgICA9ICB7XHJcbiAgICAgICAgICAgIGxheWVyOiAwLCBsZXR0ZXI6ICfmrrUnLCBcclxuICAgICAgICAgICAgc2hvdzNEOiAgJzEnLFxyXG4gICAgICAgICAgICBwYWRfdDogMC4wLCBwYWRfZDogMC4wLCBwYWRfczogMC4wLFxyXG4gICAgICAgICAgICBjb2xfZjogJycsIGNvbF9iOiAnJywgY29sX3M6ICcnLCBjb2xfdDogJyNmZmZmY2MnLCBjb2xfZDogJyNmZmZmY2MnLCBcclxuICAgICAgICAgICAgY29sX2w6ICcjMDAwMGZmJywgY29sXzI6ICcjZmZmZmNjJywgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN1cGVyKGopO1xyXG4gICAgfVxyXG59XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5cclxuaW1wb3J0IHsgX2FsZXJ0IH0gZnJvbSBcIi4uL2RfY21uL2dsb2JhbFwiO1xyXG5pbXBvcnQgeyBDX0RzcE1lc3NhZ2UgfSBmcm9tIFwiLi4vZF91dGwvQ19Ec3BNZXNzYWdlXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEpTT05fTWF6ZUluZm8ge1xyXG4gICAgbmFtZTogICAgICBzdHJpbmc7XHJcbiAgICBtYm5hbWU6ICAgIHN0cmluZztcclxuICAgIGx2OiAgICAgICAgbnVtYmVyO1xyXG4gICAgc2l6ZV94OiAgICBudW1iZXI7XHJcbiAgICBzaXplX3k6ICAgIG51bWJlcjtcclxuICAgIHNpemVfejogICAgbnVtYmVyO1xyXG4gICAgbWF4X3Jvb206ICBudW1iZXI7XHJcbiAgICByb29tX3NpemU6IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFsZXJ0X21hemVpbmZvX2luZm8oYT86IEpTT05fTWF6ZUluZm8pOiB2b2lkIHtcclxuICAgIGlmIChhID09PSB1bmRlZmluZWQpIHJldHVybjtcclxuXHJcbiAgICBhbGVydChcIk1hemVJbmZvIERhdGE6XCJcclxuICAgICAgICArIFwiXFxubmFtZSA6IFwiICAgICAgICsgKGEubmFtZSAgICAgID8/ICc/JylcclxuICAgICAgICArIFwiXFxubWJuYW1lOiBcIiAgICAgICsgKGEubWJuYW1lICAgID8/ICc/JylcclxuICAgICAgICArIFwiXFxubHYgOlwiICAgICAgICAgICsgKGEubHYgICAgICAgID8/ICc/JylcclxuICAgICAgICArIFwiXFxuc2l6ZV94OiBcIiAgICAgICsgKGEuc2l6ZV94ICAgID8/ICc/JylcclxuICAgICAgICArIFwiXFxuc2l6ZV95OiBcIiAgICAgICsgKGEuc2l6ZV95ICAgID8/ICc/JylcclxuICAgICAgICArIFwiXFxuc2l6ZV96OiBcIiAgICAgICsgKGEuc2l6ZV96ICAgID8/ICc/JylcclxuICAgICAgICArIFwiXFxubWF4X29mX3Jvb206IFwiICsgKGEubWF4X3Jvb20gID8/ICc/JylcclxuICAgICAgICArIFwiXFxucm9vbV9zaXplOiBcIiAgICsgKGEucm9vbV9zaXplID8/ICc/JylcclxuICAgICAgICArIFwiXFxuXCJcclxuICAgICk7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBDX01hemVJbmZvIHtcclxuICAgIHB1YmxpYyBuYW1lOiAgICAgIHN0cmluZyA9ICcnO1xyXG4gICAgcHVibGljIG1ibmFtZTogICAgc3RyaW5nID0gJyc7XHJcbiAgICBwdWJsaWMgbHY6ICAgICAgICBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIHNpemVfeDogICAgbnVtYmVyID0gMztcclxuICAgIHB1YmxpYyBzaXplX3k6ICAgIG51bWJlciA9IDM7XHJcbiAgICBwdWJsaWMgc2l6ZV96OiAgICBudW1iZXIgPSAzO1xyXG4gICAgcHVibGljIG1heF9yb29tOiAgbnVtYmVyID0gMTtcclxuICAgIHB1YmxpYyByb29tX3NpemU6IG51bWJlciA9IDE7XHJcbiAgICBwdWJsaWMgc3RhdGljIGdldF90YmxfYWxsKCk6IENfTWF6ZUluZm9bXSB7XHJcbiAgICAgICAgY29uc3QgbWF6ZWluZm86IENfTWF6ZUluZm9bXSA9IFtdO1xyXG4gICAgICAgIG1hemVpbmZvLnB1c2goXHJcbiAgICAgICAgICAgIG5ldyBDX01hemVJbmZvKCkuZGVjb2RlKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6ICAgXHQnbWF6ZTAxMCcsIFxyXG4gICAgICAgICAgICAgICAgbWJuYW1lOiBcdCfmlZnnt7TloLQnLCBcclxuICAgICAgICAgICAgICAgIGx2OiAgICAgXHQgMSwgXHJcbiAgICAgICAgICAgICAgICBzaXplX3g6IFx0MTEsIFxyXG4gICAgICAgICAgICAgICAgc2l6ZV95OiBcdDExLCBcclxuICAgICAgICAgICAgICAgIHNpemVfejogXHQgMywgXHJcbiAgICAgICAgICAgICAgICBtYXhfcm9vbTogXHQgMiwgXHJcbiAgICAgICAgICAgICAgICByb29tX3NpemU6IFx0IDMgXHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgbWF6ZWluZm8ucHVzaChcclxuICAgICAgICAgICAgbmV3IENfTWF6ZUluZm8oKS5kZWNvZGUoe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogICBcdCdtYXplMDExJywgXHJcbiAgICAgICAgICAgICAgICBtYm5hbWU6IFx0J+Wni+OBvuOCiuOBrui/t+WuricsIFxyXG4gICAgICAgICAgICAgICAgbHY6ICAgICBcdCAxLCBcclxuICAgICAgICAgICAgICAgIHNpemVfeDogXHQyMSwgXHJcbiAgICAgICAgICAgICAgICBzaXplX3k6IFx0MjEsIFxyXG4gICAgICAgICAgICAgICAgc2l6ZV96OiBcdCA1LCBcclxuICAgICAgICAgICAgICAgIG1heF9yb29tOiBcdCAzLCBcclxuICAgICAgICAgICAgICAgIHJvb21fc2l6ZTogXHQgMyBcclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgKTtcclxuICAgICAgICBtYXplaW5mby5wdXNoKFxyXG4gICAgICAgICAgICBuZXcgQ19NYXplSW5mbygpLmRlY29kZSh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiAgIFx0J21hemUwMTInLCBcclxuICAgICAgICAgICAgICAgIG1ibmFtZTogXHQn5pqX44GN5qOu44Gu6L+35a6uJywgXHJcbiAgICAgICAgICAgICAgICBsdjogICAgIFx0IDEsIFxyXG4gICAgICAgICAgICAgICAgc2l6ZV94OiBcdDI1LCBcclxuICAgICAgICAgICAgICAgIHNpemVfeTogXHQyNSwgXHJcbiAgICAgICAgICAgICAgICBzaXplX3o6IFx0IDcsIFxyXG4gICAgICAgICAgICAgICAgbWF4X3Jvb206IFx0IDUsIFxyXG4gICAgICAgICAgICAgICAgcm9vbV9zaXplOiBcdCAzIFxyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICApXHJcbiAgICAgICAgbWF6ZWluZm8ucHVzaChcclxuICAgICAgICAgICAgbmV3IENfTWF6ZUluZm8oKS5kZWNvZGUoe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogICBcdCdtYXplMDEzJywgXHJcbiAgICAgICAgICAgICAgICBtYm5hbWU6IFx0J+m7kumtlOOBruWcsOS4i+Wik+WcsCcsIFxyXG4gICAgICAgICAgICAgICAgbHY6ICAgICBcdCAxLCBcclxuICAgICAgICAgICAgICAgIHNpemVfeDogXHQzMSwgXHJcbiAgICAgICAgICAgICAgICBzaXplX3k6IFx0MzEsIFxyXG4gICAgICAgICAgICAgICAgc2l6ZV96OiBcdDEwLCBcclxuICAgICAgICAgICAgICAgIG1heF9yb29tOiBcdCA1LCBcclxuICAgICAgICAgICAgICAgIHJvb21fc2l6ZTogXHQgNSBcclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgKVxyXG5cclxuICAgICAgICByZXR1cm4gbWF6ZWluZm87XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IgKGo/OiBKU09OX01hemVJbmZvKSB7XHJcbiAgICAgICAgaWYgKGogIT09IHVuZGVmaW5lZCkgdGhpcy5kZWNvZGUoaik7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZW5jb2RlKCk6IEpTT05fTWF6ZUluZm8ge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG5hbWU6ICAgICAgdGhpcy5uYW1lLFxyXG4gICAgICAgICAgICBtYm5hbWU6ICAgIHRoaXMubWJuYW1lLFxyXG4gICAgICAgICAgICBsdjogICAgICAgIHRoaXMubHYsXHJcbiAgICAgICAgICAgIHNpemVfeDogICAgdGhpcy5zaXplX3gsXHJcbiAgICAgICAgICAgIHNpemVfeTogICAgdGhpcy5zaXplX3ksXHJcbiAgICAgICAgICAgIHNpemVfejogICAgdGhpcy5zaXplX3osXHJcbiAgICAgICAgICAgIG1heF9yb29tOiAgdGhpcy5tYXhfcm9vbSxcclxuICAgICAgICAgICAgcm9vbV9zaXplOiB0aGlzLnJvb21fc2l6ZSxcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZGVjb2RlKGo/OiBKU09OX01hemVJbmZvKTogQ19NYXplSW5mbyB7XHJcbiAgICAgICAgaWYgKGogPT09IHVuZGVmaW5lZCkgcmV0dXJuIHRoaXM7XHJcblxyXG4gICAgICAgIGlmIChqLm5hbWUgICAgICAhPT0gdW5kZWZpbmVkKSB0aGlzLm5hbWUgICAgICA9IGoubmFtZTtcclxuICAgICAgICBpZiAoai5tYm5hbWUgICAgIT09IHVuZGVmaW5lZCkgdGhpcy5tYm5hbWUgICAgPSBqLm1ibmFtZTtcclxuICAgICAgICBpZiAoai5sdiAgICAgICAgIT09IHVuZGVmaW5lZCkgdGhpcy5sdiAgICAgICAgPSBqLmx2O1xyXG4gICAgICAgIGlmIChqLnNpemVfeCAgICAhPT0gdW5kZWZpbmVkKSB0aGlzLnNpemVfeCAgICA9IGouc2l6ZV94O1xyXG4gICAgICAgIGlmIChqLnNpemVfeSAgICAhPT0gdW5kZWZpbmVkKSB0aGlzLnNpemVfeSAgICA9IGouc2l6ZV95O1xyXG4gICAgICAgIGlmIChqLnNpemVfeiAgICAhPT0gdW5kZWZpbmVkKSB0aGlzLnNpemVfeiAgICA9IGouc2l6ZV96O1xyXG4gICAgICAgIGlmIChqLm1heF9yb29tICAhPT0gdW5kZWZpbmVkKSB0aGlzLm1heF9yb29tICA9IGoubWF4X3Jvb207XHJcbiAgICAgICAgaWYgKGoucm9vbV9zaXplICE9PSB1bmRlZmluZWQpIHRoaXMucm9vbV9zaXplID0gai5yb29tX3NpemU7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgYWxlcnQoKTogdm9pZCB7XHJcbiAgICAgICAgYWxlcnQoXCJNYXplSW5mbyBEYXRhOlwiXHJcbiAgICAgICAgICAgICsgXCJcXG5uYW1lIDogXCIgICAgICAgKyAodGhpcy5uYW1lICAgICAgPz8gJz8nKVxyXG4gICAgICAgICAgICArIFwiXFxubWJuYW1lOiBcIiAgICAgICsgKHRoaXMubWJuYW1lICAgID8/ICc/JylcclxuICAgICAgICAgICAgKyBcIlxcbmx2IDpcIiAgICAgICAgICArICh0aGlzLmx2ICAgICAgICA/PyAnPycpXHJcbiAgICAgICAgICAgICsgXCJcXG5zaXplX3g6IFwiICAgICAgKyAodGhpcy5zaXplX3ggICAgPz8gJz8nKVxyXG4gICAgICAgICAgICArIFwiXFxuc2l6ZV95OiBcIiAgICAgICsgKHRoaXMuc2l6ZV95ICAgID8/ICc/JylcclxuICAgICAgICAgICAgKyBcIlxcbnNpemVfejogXCIgICAgICArICh0aGlzLnNpemVfeiAgICA/PyAnPycpXHJcbiAgICAgICAgICAgICsgXCJcXG5tYXhfb2Zfcm9vbTogXCIgKyAodGhpcy5tYXhfcm9vbSAgPz8gJz8nKVxyXG4gICAgICAgICAgICArIFwiXFxucm9vbV9zaXplOiBcIiAgICsgKHRoaXMucm9vbV9zaXplID8/ICc/JylcclxuICAgICAgICAgICAgKyBcIlxcblwiXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5cclxuaW1wb3J0IHsgQ19Qb2ludCB9ICAgICAgICAgICAgICAgICAgIGZyb20gXCIuL0NfUG9pbnRcIjtcclxuaW1wb3J0IHsgQ19Qb2ludERpciwgSlNPTl9Qb2ludERpciB9IGZyb20gXCIuL0NfUG9pbnREaXJcIjtcclxuaW1wb3J0IHsgSV9BYnN0cmFjdCwgSV9KU09OX1VuaXEsIEpTT05fQW55IH0gICAgIGZyb20gXCIuL0NfU2F2ZUluZm9cIjtcclxuaW1wb3J0IHsgX2dldF91dWlkIH0gICAgICAgICAgICAgICAgIGZyb20gXCIuLi9kX3V0bC9GX1JhbmRcIjtcclxuaW1wb3J0IHsgXHJcbiAgICBDX01hemVPYmpWaWV3LCBcclxuICAgIElfTWF6ZU9ialZpZXcsIFxyXG4gICAgSlNPTl9NYXplT2JqVmlldyBcclxufSBmcm9tIFwiLi9DX01hemVPYmpWaWV3XCI7XHJcblxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBKU09OX01hemVPYmogZXh0ZW5kcyBKU09OX0FueSB7XHJcbiAgICBjbG5hbWU/OiAgICBzdHJpbmcsXHJcbiAgICB1bmlxX2lkPzogICBzdHJpbmcsIFxyXG4gICAgcG9zPzogICAgICAgSlNPTl9Qb2ludERpcixcclxuICAgIHZpZXc/OiAgICAgIEpTT05fTWF6ZU9ialZpZXd8dW5kZWZpbmVkLFxyXG4gICAgdGhyPzogICAgICAgc3RyaW5nLCBcclxufVxyXG5cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSV9NYXplT2JqIGV4dGVuZHMgSV9KU09OX1VuaXEsIElfQWJzdHJhY3Qge1xyXG4gICAgZ2V0X3BkOiAgICAgKCk9PkNfUG9pbnREaXI7XHJcbiAgICB3aXRoaW46ICAgICAocDogQ19Qb2ludCk9PmJvb2xlYW47XHJcbiAgICB2aWV3OiAgICAgICAoKT0+SV9NYXplT2JqVmlld3x1bmRlZmluZWQ7XHJcbiAgICBjYW5UaHJvdWdoOiAoKT0+Ym9vbGVhbjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIENfTWF6ZU9iaiBpbXBsZW1lbnRzIElfTWF6ZU9iaiB7XHJcbiAgICBwcm90ZWN0ZWQgY2xuYW1lOiAgICBzdHJpbmcgPSAnQ19NYXplT2JqJztcclxuXHJcbiAgICBwcml2YXRlICAgdW5pcV9pZDogICBzdHJpbmc7XHJcbiAgICBwcm90ZWN0ZWQgcG9zOiAgICAgICBDX1BvaW50RGlyO1xyXG4gICAgcHJvdGVjdGVkIG15X3ZpZXc6ICAgSV9NYXplT2JqVmlld3x1bmRlZmluZWQ7XHJcbiAgICBwcm90ZWN0ZWQgY2FuX3RocjogICBib29sZWFuO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgbmV3T2JqKGo/OiBKU09OX01hemVPYmp8dW5kZWZpbmVkKTogSV9NYXplT2JqIHtcclxuICAgICAgICBqID8/PSB7fTtcclxuICAgICAgICBqLmNsbmFtZSA/Pz0gQ19NYXplT2JqLmNvbnN0cnVjdG9yLm5hbWU7XHJcbiAgICAgICAgc3dpdGNoIChqLmNsbmFtZSkge1xyXG4gICAgICAgICAgICBjYXNlIENfTWF6ZU9iai5jb25zdHJ1Y3Rvci5uYW1lOiByZXR1cm4gbmV3IENfTWF6ZU9iaihqKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5ldyBDX01hemVPYmooaik7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgbmV3T2JqKGo/OiBKU09OX01hemVPYmp8dW5kZWZpbmVkKTogSV9NYXplT2JqIHtcclxuICAgICAgICByZXR1cm4gQ19NYXplT2JqLm5ld09iaihqKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgY29uc3RydWN0b3Ioaj86IEpTT05fTWF6ZU9ianx1bmRlZmluZWQpIHtcclxuICAgICAgICB0aGlzLnVuaXFfaWQgICAgPSAnbWF6ZW9ial8nICsgX2dldF91dWlkKCk7XHJcbiAgICAgICAgdGhpcy5jbG5hbWUgICAgID0gIENfTWF6ZU9iai5jb25zdHJ1Y3Rvci5uYW1lO1xyXG4gICAgICAgIHRoaXMucG9zICAgICAgICA9ICBuZXcgQ19Qb2ludERpcih7eDowLCB5OjAsIHo6MCwgZDowfSk7XHJcbiAgICAgICAgdGhpcy5teV92aWV3ICAgID0gIHVuZGVmaW5lZDtcclxuICAgICAgICB0aGlzLmNhbl90aHIgICAgPSAgdHJ1ZTtcclxuXHJcbiAgICAgICAgaWYgKGogIT09IHVuZGVmaW5lZCkgdGhpcy5fX2luaXQoaik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfX2luaXQoajogSlNPTl9NYXplT2JqfHVuZGVmaW5lZCk6IENfTWF6ZU9iaiB7XHJcbiAgICAgICAgaWYgKGogPT09IHVuZGVmaW5lZCkgcmV0dXJuIHRoaXM7XHJcblxyXG4gICAgICAgIGlmIChqLnVuaXFfaWQgIT09IHVuZGVmaW5lZCkgdGhpcy51bmlxX2lkICAgPSBqLnVuaXFfaWQ7XHJcbiAgICAgICAgaWYgKGouY2xuYW1lICAhPT0gdW5kZWZpbmVkKSB0aGlzLmNsbmFtZSAgICA9IGouY2xuYW1lO1xyXG4gICAgICAgIGlmIChqLnBvcyAgICAgIT09IHVuZGVmaW5lZCkgdGhpcy5wb3MuZGVjb2RlKGoucG9zKTtcclxuICAgICAgICBpZiAoai52aWV3ICAgICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgaWYgKE9iamVjdC5rZXlzKGoudmlldykubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5teV92aWV3ID8/PSBDX01hemVPYmpWaWV3Lm5ld09iaihqLnZpZXcpOyBcclxuICAgICAgICAgICAgfSBlbHNlIHRoaXMubXlfdmlldyAgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChqLmNhbl90aHIgIT09IHVuZGVmaW5lZCkgdGhpcy5jYW5fdGhyID0gai5jYW5fdGhyICE9PSAnMCcgPyB0cnVlIDogZmFsc2U7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbn1cclxuXHJcbiAgICBwdWJsaWMgdWlkKCk6IHN0cmluZyB7cmV0dXJuIHRoaXMudW5pcV9pZH1cclxuXHJcbiAgICBwdWJsaWMgdmlldygpOiBJX01hemVPYmpWaWV3fHVuZGVmaW5lZCB7cmV0dXJuIHRoaXMubXlfdmlld31cclxuICAgIHB1YmxpYyBzZXRWaWV3KHZpZXc6IElfTWF6ZU9ialZpZXd8dW5kZWZpbmVkKTogdm9pZCB7dGhpcy5teV92aWV3ID0gdmlld31cclxuXHJcbiAgICBwdWJsaWMgY2FuVGhyb3VnaCgpOiBib29sZWFuIHtyZXR1cm4gdGhpcy5jYW5fdGhyfVxyXG4gICAgcHVibGljIHNldFRocm91Z2godGhyOiBib29sZWFuKTogYm9vbGVhbiB7cmV0dXJuIHRoaXMuY2FuX3RociA9IHRocn1cclxuXHJcbiAgICBwdWJsaWMgZ2V0X3BkKCk6IENfUG9pbnREaXIge1xyXG4gICAgICAgIHJldHVybiBuZXcgQ19Qb2ludERpcih0aGlzLnBvcyk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0X3BkKHA6IENfUG9pbnREaXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnBvcyA9IHA7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgd2l0aGluKHA6IENfUG9pbnQpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wb3Mud2l0aGluKHApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBlbmNvZGUoKTogSlNPTl9NYXplT2JqIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB1bmlxX2lkOiB0aGlzLnVuaXFfaWQsXHJcbiAgICAgICAgICAgIGNsbmFtZTogIHRoaXMuY2xuYW1lLFxyXG4gICAgICAgICAgICBwb3M6ICAgICB0aGlzLnBvcy5lbmNvZGUoKSxcclxuICAgICAgICAgICAgdmlldzogICAgdGhpcy5teV92aWV3Py5lbmNvZGUoKSA/PyB7fSxcclxuICAgICAgICAgICAgY2FuX3RocjogdGhpcy5jYW5fdGhyID8gJzEnIDogJzAnLFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGVjb2RlKGo/OiBKU09OX01hemVPYmp8dW5kZWZpbmVkKTogSV9NYXplT2JqIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fX2luaXQoaik7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc3RhdGljIGRlY29kZShqPzogSlNPTl9NYXplT2JqfHVuZGVmaW5lZCk6IElfTWF6ZU9iaiB7XHJcbiAgICAgICAgcmV0dXJuIENfTWF6ZU9iai5uZXdPYmooaik7XHJcbiAgICB9XHJcbn1cclxuXHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5cclxuaW1wb3J0IHsgSV9BYnN0cmFjdCwgSlNPTl9BbnkgfSBmcm9tIFwiLi9DX1NhdmVJbmZvXCI7XHJcbmltcG9ydCB7IFRfV2FsbCB9ICAgICAgICAgICAgICAgZnJvbSBcIi4uL2RfbWRsL0NfV2FsbFwiO1xyXG5cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSV9NYXplT2JqVmlldyBleHRlbmRzIElfQWJzdHJhY3Qge1xyXG4gICAgLy8g6KGo56S66Zai5L+CKDJEcHJlKS4vQ19XYWxsXHJcbiAgICBsYXllcjogICAoKT0+bnVtYmVyO1xyXG4gICAgbGV0dGVyOiAgKCk9PnN0cmluZ3xudWxsOyAvLyBudWxsOiDopovjgYjjgarjgYTjgIHkvZXjgoLjgarjgYRcclxuXHJcbiAgICAvLyDooajnpLrplqLkv4IoM0QpXHJcbiAgICBjYW5TaG93OiAoKT0+Ym9vbGVhbjtcclxuICAgIGRyb3cyRDogIChmbG9vcjogVF9SZWN0KT0+dm9pZDtcclxuICAgIGRyb3czRDogIChmcm90OiAgVF9XYWxsLCBiYWNrOiBUX1dhbGwpPT52b2lkO1xyXG5cclxuICAgIHBhZF90OiAgICgpPT5udW1iZXI7IC8v5LiK5YG044Gu56m644GNKOWJsuWQiDogMOOBi+OCiTEpIFxyXG4gICAgcGFkX2Q6ICAgKCk9Pm51bWJlcjsgLy/luorlgbTjga7nqbrjgY0o5Ymy5ZCIOiAw44GL44KJMSkgXHJcbiAgICBwYWRfczogICAoKT0+bnVtYmVyOyAvL+aoquWBtOOBruepuuOBjSjlibLlkIg6IDDjgYvjgokxKSBcclxuICAgIGNvbF9mOiAgICgpPT5zdHJpbmd8bnVsbDsgLy/mraPpnaLjga7oibIoQ1NT44Kr44Op44O8KeOAgm51bGzjga/pgI/mmI5cclxuICAgIGNvbF9iOiAgICgpPT5zdHJpbmd8bnVsbDsgLy/og4zpnaLjga7oibIoQ1NT44Kr44Op44O8KeOAgm51bGzjga/pgI/mmI5cclxuICAgIGNvbF9zOiAgICgpPT5zdHJpbmd8bnVsbDsgLy/mqKrlgbTjga7oibIoQ1NT44Kr44Op44O8KeOAgm51bGzjga/pgI/mmI5cclxuICAgIGNvbF90OiAgICgpPT5zdHJpbmd8bnVsbDsgLy/kuIrpg6jjga7oibIoQ1NT44Kr44Op44O8KeOAgm51bGzjga/pgI/mmI7jgILjgoTjgoTjgZPjgZfjgYTjgYzjgIHniankvZPjga7lupXpnaLjgavlvZPjgZ/jgotcclxuICAgIGNvbF9kOiAgICgpPT5zdHJpbmd8bnVsbDsgLy/kuIvpg6jjga7oibIoQ1NT44Kr44Op44O8KeOAgm51bGzjga/pgI/mmI7jgILjgoTjgoTjgZPjgZfjgYTjgYzjgIHniankvZPjga7lpKnkupXjgavlvZPjgZ/jgotcclxuICAgIGNvbF9sOiAgICgpPT5zdHJpbmd8bnVsbDsgLy/jg6njgqTjg7Pjga7oibIoQ1NT44Kr44Op44O8KVxyXG5cclxuICAgIGNvbF8yOiAgICgpPT5zdHJpbmd8bnVsbDsgLy8yROODnuODg+ODl+OBruiJsihDU1Pjgqvjg6njg7wpXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSlNPTl9NYXplT2JqVmlldyBleHRlbmRzIEpTT05fQW55IHtcclxuICAgIGNsbmFtZT86IHN0cmluZyxcclxuICAgIGxheWVyPzogIG51bWJlcixcclxuICAgIGxldHRlcj86IHN0cmluZyxcclxuICAgIHNob3c/OiAgIHN0cmluZyxcclxuICAgIHBhZF90PzogIG51bWJlciwgLy8g44Kq44OW44K444Kn44Kv44OI5LiK6YOo44Gu6ZqZ6ZaT44Gu5Ymy5ZCIKDAuMCDjgYvjgokgMS4wKSBcclxuICAgIHBhZF9kPzogIG51bWJlciwgLy8g44Kq44OW44K444Kn44Kv44OI5LiL6YOo44Gu6ZqZ6ZaT44Gu5Ymy5ZCIKDAuMCDjgYvjgokgMS4wKSBcclxuICAgIHBhZF9zPzogIG51bWJlciwgLy8g44Kq44OW44K444Kn44Kv44OI5ZGo5Zuy44Gu6ZqZ6ZaT44Gu5Ymy5ZCIKDAuMCDjgYvjgokgMS4wKSBcclxuICAgIGNvbF9mPzogIHN0cmluZ3xudWxsLCAvLyDjgqrjg5bjgrjjgqfjgq/jg4jmraPpnaLjga5DU1Pjgqvjg6njg7wgXHJcbiAgICBjb2xfYj86ICBzdHJpbmd8bnVsbCwgLy8g44Kq44OW44K444Kn44Kv44OI5q2j6Z2i44GuQ1NT44Kr44Op44O8IFxyXG4gICAgY29sX3M/OiAgc3RyaW5nfG51bGwsIC8vIOOCquODluOCuOOCp+OCr+ODiOWBtOmdouOBrkNTU+OCq+ODqeODvCBcclxuICAgIGNvbF90PzogIHN0cmluZ3xudWxsLCAvLyDjgqrjg5bjgrjjgqfjgq/jg4jkuIrpnaLjga5DU1Pjgqvjg6njg7wgXHJcbiAgICBjb2xfZD86ICBzdHJpbmd8bnVsbCwgLy8g44Kq44OW44K444Kn44Kv44OI5bqV6Z2i44GuQ1NT44Kr44Op44O8IFxyXG4gICAgY29sX2w/OiAgc3RyaW5nfG51bGwsIC8vIOOCquODluOCuOOCp+OCr+ODiOOBrue3muOBrkNTU+OCq+ODqeODvCBcclxuICAgIGNvbF8yPzogIHN0cmluZ3xudWxsLCAvLyAyROODnuODg+ODl+OBrumdouOBrkNTU+OCq+ODqeODvFxyXG59XHJcblxyXG50eXBlIFRfeHkgICA9IHt4OiBudW1iZXIsIHk6IG51bWJlcn1cclxuZXhwb3J0IHR5cGUgVF9SZWN0ID0ge3RsOiBUX3h5LCB0cjogVF94eSwgZGw6IFRfeHksIGRyOiBUX3h5fTtcclxuXHJcbmV4cG9ydCBjbGFzcyBDX01hemVPYmpWaWV3IGltcGxlbWVudHMgSV9NYXplT2JqVmlldyB7XHJcbiAgICBwcm90ZWN0ZWQgc3RhdGljIGNvbjNEOiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkR8dW5kZWZpbmVkO1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRfY29udGV4dDNEKCk6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRHx1bmRlZmluZWQge3JldHVybiB0aGlzPy5jb24zRH1cclxuICAgIHB1YmxpYyBzdGF0aWMgc2V0X2NvbnRleHQzRChjb24zRD86IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IHZvaWQge3RoaXMuY29uM0QgPSBjb24zRH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgc3RhdGljIGNvbjJEOiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkR8dW5kZWZpbmVkO1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRfY29udGV4dDJEKCk6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRHx1bmRlZmluZWQge3JldHVybiB0aGlzPy5jb24yRH1cclxuICAgIHB1YmxpYyBzdGF0aWMgc2V0X2NvbnRleHQyRChjb24yRD86IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IHZvaWQge3RoaXMuY29uMkQgPSBjb24yRH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIG5ld09iaihqPzogSlNPTl9NYXplT2JqVmlld3x1bmRlZmluZWQpOiBJX01hemVPYmpWaWV3IHtcclxuICAgICAgICBqID8/PSB7fTtcclxuICAgICAgICBqLmNsbmFtZSA/Pz0gQ19NYXplT2JqVmlldy5jb25zdHJ1Y3Rvci5uYW1lO1xyXG4gICAgICAgIHN3aXRjaCAoai5jbG5hbWUpIHtcclxuICAgICAgICAgICAgY2FzZSBDX01hemVPYmpWaWV3LmNvbnN0cnVjdG9yLm5hbWU6ICAgICByZXR1cm4gbmV3IENfTWF6ZU9ialZpZXcoaik7XHJcbiAgICAgICAgfSBcclxuICAgICAgICByZXR1cm4gbmV3IENfTWF6ZU9ialZpZXcoaik7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgbmV3T2JqKGo/OiBKU09OX01hemVPYmpWaWV3fHVuZGVmaW5lZCk6IElfTWF6ZU9ialZpZXcge1xyXG4gICAgICAgIHJldHVybiBDX01hemVPYmpWaWV3Lm5ld09iaihqKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBjbG5hbWU6ICAgIHN0cmluZyA9ICdDX01hemVPYmpWaWV3JztcclxuXHJcbiAgICBwcml2YXRlIG15X2xheWVyOiAgbnVtYmVyOyAgICAgIC8vIDJE6KGo56S644Gu5pmC44GuQ1NT44Os44Kk44Ok44O844CC5ZCM5L2N572u44Gu44Kq44OW44K444Kn44Gu5YaF44GT44Gu5YCk44GM5aSn44GN44GE54mp44GM6KGo56S644GV44KM44KLXHJcbiAgICBwcml2YXRlIG15X2xldHRlcjogc3RyaW5nfG51bGw7IC8vIDJE6KGo56S644Gu5pmC44Gu5YWo6KeS5paH5a2X44CCbnVsbOOBquOCiemAj+aYjlxyXG5cclxuICAgIHByaXZhdGUgbXlfc2hvdzogYm9vbGVhbjtcclxuICAgIHByaXZhdGUgbXlfcGFkX3Q6ICBudW1iZXI7IC8vIOOCquODluOCuOOCp+OCr+ODiOS4iumDqOOBrumamemWk+OBruWJsuWQiCgwLjAg44GL44KJIDEuMCkgXHJcbiAgICBwcml2YXRlIG15X3BhZF9kOiAgbnVtYmVyOyAvLyDjgqrjg5bjgrjjgqfjgq/jg4jkuIvpg6jjga7pmpnplpPjga7libLlkIgoMC4wIOOBi+OCiSAxLjApIFxyXG4gICAgcHJpdmF0ZSBteV9wYWRfczogIG51bWJlcjsgLy8g44Kq44OW44K444Kn44Kv44OI5ZGo5Zuy44Gu6ZqZ6ZaT44Gu5Ymy5ZCIKDAuMCDjgYvjgokgMS4wKSBcclxuXHJcbiAgICBwcml2YXRlIG15X2NvbF9mOiAgc3RyaW5nfG51bGw7IC8vIOOCquODluOCuOOCp+OCr+ODiOato+mdouOBrkNTU+OCq+ODqeODvCBcclxuICAgIHByaXZhdGUgbXlfY29sX2I6ICBzdHJpbmd8bnVsbDsgLy8g44Kq44OW44K444Kn44Kv44OI5q2j6Z2i44GuQ1NT44Kr44Op44O8IFxyXG4gICAgcHJpdmF0ZSBteV9jb2xfczogIHN0cmluZ3xudWxsOyAvLyDjgqrjg5bjgrjjgqfjgq/jg4jlgbTpnaLjga5DU1Pjgqvjg6njg7wgXHJcbiAgICBwcml2YXRlIG15X2NvbF90OiAgc3RyaW5nfG51bGw7IC8vIOOCquODluOCuOOCp+OCr+ODiOS4iumdouOBrkNTU+OCq+ODqeODvCBcclxuICAgIHByaXZhdGUgbXlfY29sX2Q6ICBzdHJpbmd8bnVsbDsgLy8g44Kq44OW44K444Kn44Kv44OI5bqV6Z2i44GuQ1NT44Kr44Op44O8IFxyXG4gICAgcHJpdmF0ZSBteV9jb2xfbDogIHN0cmluZ3xudWxsOyAvLyDjgqrjg5bjgrjjgqfjgq/jg4jjga7nt5rjga5DU1Pjgqvjg6njg7wgXHJcblxyXG4gICAgcHJpdmF0ZSBteV9jb2xfMjogIHN0cmluZ3xudWxsOyAvLyAyROODnuODg+ODl+OBrumdouOBrkNTU+OCq+ODqeODvCBcclxuXHJcbiAgICBwcm90ZWN0ZWQgY29uc3RydWN0b3Ioaj86IEpTT05fTWF6ZU9ialZpZXd8dW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhpcy5jbG5hbWUgICAgID0gIHRoaXMuY29uc3RydWN0b3IubmFtZTtcclxuXHJcbiAgICAgICAgdGhpcy5teV9sYXllciAgID0gIC0yO1xyXG4gICAgICAgIHRoaXMubXlfbGV0dGVyICA9ICBudWxsO1xyXG5cclxuICAgICAgICB0aGlzLm15X3BhZF90ICAgPSAgMC4wO1xyXG4gICAgICAgIHRoaXMubXlfcGFkX2QgICA9ICAwLjA7XHJcbiAgICAgICAgdGhpcy5teV9wYWRfcyAgID0gIDAuMDtcclxuXHJcbiAgICAgICAgdGhpcy5teV9zaG93ICAgID0gIHRydWU7XHJcblxyXG4gICAgICAgIHRoaXMubXlfY29sX2YgICA9ICcjZjhmOGY4JzsgXHJcbiAgICAgICAgdGhpcy5teV9jb2xfYiAgID0gJyNhYWFhYWEnOyBcclxuICAgICAgICB0aGlzLm15X2NvbF9zICAgPSAnI2RkZGRkZCc7IFxyXG4gICAgICAgIHRoaXMubXlfY29sX3QgICA9ICcjZmZmZmZmJzsgXHJcbiAgICAgICAgdGhpcy5teV9jb2xfZCAgID0gJyNjY2NjY2MnOyBcclxuICAgICAgICB0aGlzLm15X2NvbF9sICAgPSAnIzMzMzMzMyc7IFxyXG5cclxuICAgICAgICB0aGlzLm15X2NvbF8yICAgPSAnI2NjY2NjYyc7IFxyXG5cclxuICAgICAgICBpZiAoaiAhPT0gdW5kZWZpbmVkKSB0aGlzLl9faW5pdChqKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgX19pbml0KGo6IEpTT05fTWF6ZU9ialZpZXd8dW5kZWZpbmVkKTogSV9NYXplT2JqVmlldyB7XHJcbiAgICAgICAgaWYgKGogPT09IHVuZGVmaW5lZCkgcmV0dXJuIHRoaXM7XHJcblxyXG4gICAgICAgIGlmIChqLmNsbmFtZSAgIT09IHVuZGVmaW5lZCkgdGhpcy5jbG5hbWUgICAgPSBqLmNsbmFtZTtcclxuICAgICAgICBpZiAoai5sYXllciAgICE9PSB1bmRlZmluZWQpIHRoaXMubXlfbGF5ZXIgID0gai5sYXllcjtcclxuICAgICAgICBpZiAoai5sZXR0ZXIgICE9PSB1bmRlZmluZWQpIHRoaXMubXlfbGV0dGVyID0gai5sZXR0ZXIgIT09ICcnICA/IGoubGV0dGVyIDogbnVsbDsgXHJcbiAgICAgICAgaWYgKGoucGFkX3QgICAhPT0gdW5kZWZpbmVkKSB0aGlzLm15X3BhZF90ICA9IGoucGFkX3Q7IFxyXG4gICAgICAgIGlmIChqLnBhZF9kICAgIT09IHVuZGVmaW5lZCkgdGhpcy5teV9wYWRfZCAgPSBqLnBhZF9kOyBcclxuICAgICAgICBpZiAoai5wYWRfcyAgICE9PSB1bmRlZmluZWQpIHRoaXMubXlfcGFkX3MgID0gai5wYWRfczsgXHJcbiAgICAgICAgaWYgKGouc2hvdyAgICAhPT0gdW5kZWZpbmVkKSB0aGlzLm15X3Nob3cgICA9IGouc2hvdyAgICE9PSAnMCcgPyB0cnVlICAgICA6IGZhbHNlOyBcclxuICAgICAgICBpZiAoai5jb2xfZiAgICE9PSB1bmRlZmluZWQpIHRoaXMubXlfY29sX2YgID0gai5jb2xfZiAgIT09ICcnICA/IGouY29sX2YgIDogbnVsbDsgXHJcbiAgICAgICAgaWYgKGouY29sX2IgICAhPT0gdW5kZWZpbmVkKSB0aGlzLm15X2NvbF9iICA9IGouY29sX2IgICE9PSAnJyAgPyBqLmNvbF9iICA6IG51bGw7IFxyXG4gICAgICAgIGlmIChqLmNvbF9zICAgIT09IHVuZGVmaW5lZCkgdGhpcy5teV9jb2xfcyAgPSBqLmNvbF9zICAhPT0gJycgID8gai5jb2xfcyAgOiBudWxsOyBcclxuICAgICAgICBpZiAoai5jb2xfdCAgICE9PSB1bmRlZmluZWQpIHRoaXMubXlfY29sX3QgID0gai5jb2xfdCAgIT09ICcnICA/IGouY29sX3QgIDogbnVsbDsgXHJcbiAgICAgICAgaWYgKGouY29sX2QgICAhPT0gdW5kZWZpbmVkKSB0aGlzLm15X2NvbF9kICA9IGouY29sX2QgICE9PSAnJyAgPyBqLmNvbF9kICA6IG51bGw7IFxyXG4gICAgICAgIGlmIChqLmNvbF9sICAgIT09IHVuZGVmaW5lZCkgdGhpcy5teV9jb2xfbCAgPSBqLmNvbF9sICAhPT0gJycgID8gai5jb2xfbCAgOiBudWxsOyBcclxuICAgICAgICBpZiAoai5jb2xfMiAgICE9PSB1bmRlZmluZWQpIHRoaXMubXlfY29sXzIgID0gai5jb2xfMiAgIT09ICcnICA/IGouY29sXzIgIDogbnVsbDsgXHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsYXllcigpOiBudW1iZXIge3JldHVybiB0aGlzLm15X2xheWVyO31cclxuICAgIHB1YmxpYyBzZXRfbGF5ZXIobGF5ZXI6IG51bWJlcikge3RoaXMubXlfbGF5ZXIgPSBsYXllcn1cclxuXHJcbiAgICBwdWJsaWMgbGV0dGVyKCk6ICBzdHJpbmd8bnVsbCB7cmV0dXJuIHRoaXMubXlfbGV0dGVyfVxyXG4gICAgcHVibGljIHNldF9sZXR0ZXIobGV0dGVyOiBzdHJpbmd8bnVsbCk6IHN0cmluZ3xudWxsIHtyZXR1cm4gdGhpcy5teV9sZXR0ZXIgPSBsZXR0ZXJ9XHJcblxyXG4gICAgcHVibGljIGNhblNob3coKTogYm9vbGVhbiB7cmV0dXJuIHRoaXMubXlfc2hvd307XHJcbiAgICBwdWJsaWMgc2V0U2hvdyhjYW5fc2hvdzogYm9vbGVhbik6IGJvb2xlYW4ge3JldHVybiB0aGlzLm15X3Nob3cgPSBjYW5fc2hvd307XHJcblxyXG4gICAgcHVibGljIHBhZF90KCk6ICBudW1iZXIge3JldHVybiB0aGlzLm15X3BhZF90fVxyXG4gICAgcHVibGljIHBhZF9kKCk6ICBudW1iZXIge3JldHVybiB0aGlzLm15X3BhZF9kfVxyXG4gICAgcHVibGljIHBhZF9zKCk6ICBudW1iZXIge3JldHVybiB0aGlzLm15X3BhZF9zfVxyXG4gICAgcHVibGljIHNldF9wYWRfdChwYWRfdDogbnVtYmVyKTogbnVtYmVyIHtyZXR1cm4gdGhpcy5teV9wYWRfdCA9IHRoaXMubXlfcGFkX2QgKyBwYWRfdCA8IDEuMCA/IHBhZF90IDogMC45OSAtIHRoaXMubXlfcGFkX2R9XHJcbiAgICBwdWJsaWMgc2V0X3BhZF9kKHBhZF9kOiBudW1iZXIpOiBudW1iZXIge3JldHVybiB0aGlzLm15X3BhZF9kID0gdGhpcy5teV9wYWRfdCArIHBhZF9kIDwgMS4wID8gcGFkX2QgOiAwLjk5IC0gdGhpcy5teV9wYWRfdH1cclxuICAgIHB1YmxpYyBzZXRfcGFkX3MocGFkX3M6IG51bWJlcik6IG51bWJlciB7cmV0dXJuIHRoaXMubXlfcGFkX3MgPSBwYWRfc31cclxuXHJcbiAgICBwdWJsaWMgY29sX2YoKTogc3RyaW5nfG51bGwge3JldHVybiB0aGlzLm15X2NvbF9mfSBcclxuICAgIHB1YmxpYyBjb2xfYigpOiBzdHJpbmd8bnVsbCB7cmV0dXJuIHRoaXMubXlfY29sX2J9IFxyXG4gICAgcHVibGljIGNvbF9zKCk6IHN0cmluZ3xudWxsIHtyZXR1cm4gdGhpcy5teV9jb2xfc30gXHJcbiAgICBwdWJsaWMgY29sX3QoKTogc3RyaW5nfG51bGwge3JldHVybiB0aGlzLm15X2NvbF90fSBcclxuICAgIHB1YmxpYyBjb2xfZCgpOiBzdHJpbmd8bnVsbCB7cmV0dXJuIHRoaXMubXlfY29sX2R9IFxyXG4gICAgcHVibGljIGNvbF9sKCk6IHN0cmluZ3xudWxsIHtyZXR1cm4gdGhpcy5teV9jb2xfbH0gXHJcbiAgICBwdWJsaWMgc2V0X2NvbF9mKGNvbF9mOiBzdHJpbmd8bnVsbCk6IHN0cmluZ3xudWxsIHtyZXR1cm4gdGhpcy5teV9jb2xfZiA9IGNvbF9mfSBcclxuICAgIHB1YmxpYyBzZXRfY29sX2IoY29sX2I6IHN0cmluZ3xudWxsKTogc3RyaW5nfG51bGwge3JldHVybiB0aGlzLm15X2NvbF9iID0gY29sX2J9IFxyXG4gICAgcHVibGljIHNldF9jb2xfcyhjb2xfczogc3RyaW5nfG51bGwpOiBzdHJpbmd8bnVsbCB7cmV0dXJuIHRoaXMubXlfY29sX3MgPSBjb2xfc30gXHJcbiAgICBwdWJsaWMgc2V0X2NvbF90KGNvbF90OiBzdHJpbmd8bnVsbCk6IHN0cmluZ3xudWxsIHtyZXR1cm4gdGhpcy5teV9jb2xfdCA9IGNvbF90fSBcclxuICAgIHB1YmxpYyBzZXRfY29sX2QoY29sX2Q6IHN0cmluZ3xudWxsKTogc3RyaW5nfG51bGwge3JldHVybiB0aGlzLm15X2NvbF9kID0gY29sX2R9IFxyXG4gICAgcHVibGljIHNldF9jb2xfbChjb2xfbDogc3RyaW5nfG51bGwpOiBzdHJpbmd8bnVsbCB7cmV0dXJuIHRoaXMubXlfY29sX2wgPSBjb2xfbH0gXHJcblxyXG4gICAgcHVibGljIGNvbF8yKCk6IHN0cmluZ3xudWxsIHtyZXR1cm4gdGhpcy5teV9jb2xfMn1cclxuICAgIHB1YmxpYyBzZXRfY29sXzIoY29sXzI6IHN0cmluZ3xudWxsKTogc3RyaW5nfG51bGwge3JldHVybiB0aGlzLm15X2NvbF8yID0gY29sXzJ9IFxyXG5cclxuICAgIHB1YmxpYyBkcm93MkQocmVjdDogVF9SZWN0KTogdm9pZCB7XHJcbiAgICAgICAgZHJvdzJEX2NlbGwocmVjdCwgdGhpcy5jb2xfMigpID8/ICcjY2NjY2NjJywgdGhpcy5jb2xfbCgpID8/ICcjOTk5OWZmJyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRyb3czRChmcm90OiBUX1dhbGwsIGJhY2s6IFRfV2FsbCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZHJvdzNEX29ial9iYWNrICAgICAgKGZyb3QsIGJhY2spO1xyXG4gICAgICAgIHRoaXMuZHJvdzNEX29ial9kb3duICAgICAgKGZyb3QsIGJhY2spO1xyXG4gICAgICAgIHRoaXMuZHJvdzNEX29ial90b3AgICAgICAgKGZyb3QsIGJhY2spO1xyXG4gICAgICAgIHRoaXMuZHJvdzNEX29ial9yaWdodF9zaWRlKGZyb3QsIGJhY2spO1xyXG4gICAgICAgIHRoaXMuZHJvdzNEX29ial9sZWZ0X3NpZGUgKGZyb3QsIGJhY2spO1xyXG4gICAgICAgIHRoaXMuZHJvdzNEX29ial9mcm9udCAgICAgKGZyb3QsIGJhY2spO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBkcm93M0Rfb2JqX2Rvd24oXHJcbiAgICAgICAgZnJvdDogIFRfV2FsbCwgXHJcbiAgICAgICAgYmFjazogIFRfV2FsbCwgXHJcbiAgICApOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXRoaXMuY2FuU2hvdygpIHx8IHRoaXMuY29sX3QoKSA9PT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgIGlmICh0aGlzLnBhZF9zKCkgPD0gMC4wICYmIHRoaXMucGFkX3QoKSA+PSAxLjApIHtcclxuICAgICAgICAgICAgZHJvdzNEX2NlbGxfZmxvb3IoZnJvdCwgYmFjaywgdGhpcy5jb2xfdCgpID8/ICcjNjY2NmZmJywgdGhpcy5jb2xfbCgpID8/ICcjOTk5OWZmJyk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBjb25zdCBvID0gX19jYWxjX3BhZGRpbmdfb2JqKHRoaXMsIGZyb3QsIGJhY2spO1xyXG4gICAgICAgIGNvbnN0IHJlY3Q6IFRfUmVjdCA9IHtcclxuICAgICAgICAgICAgdGw6IG8uZmRsLFxyXG4gICAgICAgICAgICB0cjogby5mZHIsXHJcbiAgICAgICAgICAgIGRyOiBvLmJkcixcclxuICAgICAgICAgICAgZGw6IG8uYmRsLFxyXG4gICAgICAgIH1cclxuICAgICAgICBkcm93M0RfY2VsbChyZWN0LCB0aGlzLmNvbF90KCksIHRoaXMuY29sX2woKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkcm93M0Rfb2JqX3RvcChcclxuICAgICAgICBmcm90OiAgVF9XYWxsLCBcclxuICAgICAgICBiYWNrOiAgVF9XYWxsLCBcclxuICAgICk6IHZvaWQge1xyXG4gICAgICAgIGlmICghdGhpcy5jYW5TaG93KCkgfHwgdGhpcy5jb2xfZCgpID09PSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgaWYgKHRoaXMucGFkX3MoKSA8PSAwLjAgJiYgdGhpcy5wYWRfZCgpID49IDEuMCkge1xyXG4gICAgICAgICAgICBkcm93M0RfY2VsbF9jZWlsaW5nKGZyb3QsIGJhY2ssIHRoaXMuY29sX2QoKSA/PyAnI2FhYWFhYScsIHRoaXMuY29sX2woKSA/PyAnIzk5OTlmZicpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgY29uc3QgbyA9IF9fY2FsY19wYWRkaW5nX29iaih0aGlzLCBmcm90LCBiYWNrKTtcclxuICAgICAgICBjb25zdCByZWN0OiBUX1JlY3QgPSB7XHJcbiAgICAgICAgICAgIHRsOiBvLmZ0bCxcclxuICAgICAgICAgICAgdHI6IG8uZnRyLFxyXG4gICAgICAgICAgICBkcjogby5idHIsXHJcbiAgICAgICAgICAgIGRsOiBvLmJ0bCxcclxuICAgICAgICB9XHJcbiAgICAgICAgZHJvdzNEX2NlbGwocmVjdCwgdGhpcy5jb2xfZCgpLCB0aGlzLmNvbF9sKCkpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBkcm93M0Rfb2JqX2Zyb250KFxyXG4gICAgICAgIGZyb3Q6ICBUX1dhbGwsIFxyXG4gICAgICAgIGJhY2s6ICBUX1dhbGwsIFxyXG4gICAgKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmNhblNob3coKSB8fCB0aGlzLmNvbF9mKCkgPT09IG51bGwpIHJldHVybjtcclxuICAgIFxyXG4gICAgICAgIGNvbnN0IG8gPSBfX2NhbGNfcGFkZGluZ19vYmoodGhpcywgZnJvdCwgYmFjayk7XHJcbiAgICAgICAgY29uc3QgcmVjdDogVF9SZWN0ID0ge1xyXG4gICAgICAgICAgICB0bDogby5mdGwsIFxyXG4gICAgICAgICAgICB0cjogby5mdHIsIFxyXG4gICAgICAgICAgICBkcjogby5mZHIsIFxyXG4gICAgICAgICAgICBkbDogby5mZGwsIFxyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIGRyb3czRF9jZWxsKHJlY3QsIHRoaXMuY29sX2YoKSwgdGhpcy5jb2xfbCgpKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgZHJvdzNEX29ial9iYWNrKFxyXG4gICAgICAgIGZyb3Q6ICBUX1dhbGwsIFxyXG4gICAgICAgIGJhY2s6ICBUX1dhbGwsIFxyXG4gICAgKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmNhblNob3coKSB8fCB0aGlzLmNvbF9iKCkgPT09IG51bGwpIHJldHVybjtcclxuICAgIFxyXG4gICAgICAgIGNvbnN0IG8gPSBfX2NhbGNfcGFkZGluZ19vYmoodGhpcywgZnJvdCwgYmFjayk7XHJcbiAgICAgICAgY29uc3QgcmVjdDogVF9SZWN0ID0ge1xyXG4gICAgICAgICAgICB0bDogby5idGwsIFxyXG4gICAgICAgICAgICB0cjogby5idHIsIFxyXG4gICAgICAgICAgICBkcjogby5iZHIsIFxyXG4gICAgICAgICAgICBkbDogby5iZGwsIFxyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIGRyb3czRF9jZWxsKHJlY3QsIHRoaXMuY29sX2IoKSwgdGhpcy5jb2xfbCgpKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgZHJvdzNEX29ial9sZWZ0X3NpZGUoXHJcbiAgICAgICAgZnJvdDogIFRfV2FsbCwgXHJcbiAgICAgICAgYmFjazogIFRfV2FsbCwgXHJcbiAgICApOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXRoaXMuY2FuU2hvdygpIHx8IHRoaXMuY29sX3MoKSA9PT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgXHJcbiAgICAgICAgY29uc3QgbyA9IF9fY2FsY19wYWRkaW5nX29iaih0aGlzLCBmcm90LCBiYWNrKTtcclxuICAgICAgICBjb25zdCByZWN0OiBUX1JlY3QgPSB7XHJcbiAgICAgICAgICAgIHRsOiBvLmJ0bCxcclxuICAgICAgICAgICAgdHI6IG8uZnRsLFxyXG4gICAgICAgICAgICBkcjogby5mZGwsXHJcbiAgICAgICAgICAgIGRsOiBvLmJkbCxcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBkcm93M0RfY2VsbChyZWN0LCB0aGlzLmNvbF9zKCksIHRoaXMuY29sX2woKSk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGRyb3czRF9vYmpfcmlnaHRfc2lkZShcclxuICAgICAgICBmcm90OiAgVF9XYWxsLCBcclxuICAgICAgICBiYWNrOiAgVF9XYWxsLCBcclxuICAgICk6IHZvaWQge1xyXG4gICAgICAgIGlmICghdGhpcy5jYW5TaG93KCkgfHwgdGhpcy5jb2xfcygpID09PSBudWxsKSByZXR1cm47XHJcbiAgICBcclxuICAgICAgICBjb25zdCBvID0gX19jYWxjX3BhZGRpbmdfb2JqKHRoaXMsIGZyb3QsIGJhY2spO1xyXG4gICAgICAgIGNvbnN0IHJlY3Q6IFRfUmVjdCA9IHtcclxuICAgICAgICAgICAgdGw6IG8uZnRyLFxyXG4gICAgICAgICAgICB0cjogby5idHIsXHJcbiAgICAgICAgICAgIGRyOiBvLmJkcixcclxuICAgICAgICAgICAgZGw6IG8uZmRyLFxyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIGRyb3czRF9jZWxsKHJlY3QsIHRoaXMuY29sX3MoKSwgdGhpcy5jb2xfbCgpKTtcclxuICAgIH1cclxuICAgIFxyXG5cclxuICAgIHB1YmxpYyBlbmNvZGUoKTogSlNPTl9NYXplT2JqVmlldyB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgY25hbWU6ICAgdGhpcy5jbG5hbWUsXHJcbiAgICAgICAgICAgIGxheWVyOiAgIHRoaXMubXlfbGF5ZXIsXHJcbiAgICAgICAgICAgIGxldHRlcjogIHRoaXMubXlfbGV0dGVyID8/ICcnLFxyXG4gICAgICAgICAgICBwYWRfdDogICB0aGlzLm15X3BhZF90LCBcclxuICAgICAgICAgICAgcGFkX2Q6ICAgdGhpcy5teV9wYWRfZCwgXHJcbiAgICAgICAgICAgIHBhZF9zOiAgIHRoaXMubXlfcGFkX3MsIFxyXG4gICAgICAgICAgICBzaG93OiAgICB0aGlzLmNhblNob3coKSA/ICcxJyA6ICcwJyxcclxuICAgICAgICAgICAgY29sX2Y6ICAgdGhpcy5teV9jb2xfZiA/PyAnJywgIFxyXG4gICAgICAgICAgICBjb2xfYjogICB0aGlzLm15X2NvbF9iID8/ICcnLCAgXHJcbiAgICAgICAgICAgIGNvbF9zOiAgIHRoaXMubXlfY29sX3MgPz8gJycsIFxyXG4gICAgICAgICAgICBjb2xfdDogICB0aGlzLm15X2NvbF90ID8/ICcnLCBcclxuICAgICAgICAgICAgY29sX2Q6ICAgdGhpcy5teV9jb2xfZCA/PyAnJywgXHJcbiAgICAgICAgICAgIGNvbF9sOiAgIHRoaXMubXlfY29sX2wgPz8gJycsIFxyXG4gICAgICAgICAgICBjb2xfMjogICB0aGlzLm15X2NvbF8yID8/ICcnLCBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZGVjb2RlKGo6IEpTT05fTWF6ZU9ialZpZXd8dW5kZWZpbmVkKTogSV9NYXplT2JqVmlldyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX19pbml0KGopO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHN0YXRpYyBkZWNvZGUoajogSlNPTl9NYXplT2JqVmlld3x1bmRlZmluZWQpOiBJX01hemVPYmpWaWV3IHtcclxuICAgICAgICByZXR1cm4gQ19NYXplT2JqVmlldy5uZXdPYmooaik7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5cclxuZnVuY3Rpb24gX19jYWxjX3BhZGRpbmdfb2JqKFxyXG4gICAgb2JqOiAgIElfTWF6ZU9ialZpZXcsXHJcbiAgICBmcm90OiAgVF9XYWxsLCBcclxuICAgIGJhY2s6ICBUX1dhbGwsIFxyXG4pOiB7XHJcbiAgICAvLyDorZjliKXlrZDjga7mhI/lkbNcclxuICAgIC8vIOW3puerr++8muWJjeW+jOOBruWMuuWIpeOAgGY65YmN6Z2i44CAYjrog4zpnaJcclxuICAgIC8vIOS4reWkru+8muS4iuS4i+OBruWMuuWIpeOAgHQ65LiK6L6644CAZDrkuIvovrpcclxuICAgIC8vIOWPs+err++8muW3puWPs+OBruWMuuWIpeOAgGw65bem5YG044CAcjrlj7PlgbRcclxuICAgIGZ0bDpUX3h5LCBmdHI6VF94eSwgZmRyOlRfeHksIGZkbDpUX3h5LCBcclxuICAgIGJ0bDpUX3h5LCBidHI6VF94eSwgYmRyOlRfeHksIGJkbDpUX3h5LCBcclxufSB7XHJcbiAgICBjb25zdCByZWN0X2Zyb3QgPSBmcm90O1xyXG4gICAgY29uc3QgcmVjdF9iYWNrID0gYmFjaztcclxuXHJcbiAgICBjb25zdCByYXRpb19YICAgPSBvYmoucGFkX3MoKSAvIDIuMDtcclxuICAgIGNvbnN0IHJhdGlvX1QgICA9IG9iai5wYWRfdCgpO1xyXG4gICAgY29uc3QgcmF0aW9fRCAgID0gb2JqLnBhZF9kKCk7XHJcblxyXG4gICAgY29uc3QgZnJvdF9wYWRfWCAgPSBNYXRoLmFicyhyZWN0X2Zyb3QubWF4X3ggLSByZWN0X2Zyb3QubWluX3gpICogcmF0aW9fWDtcclxuICAgIGNvbnN0IGJhY2tfcGFkX1ggID0gTWF0aC5hYnMocmVjdF9iYWNrLm1heF94IC0gcmVjdF9iYWNrLm1pbl94KSAqIHJhdGlvX1g7XHJcblxyXG4gICAgY29uc3QgZnJvdF9wYWRfVCAgPSBNYXRoLmFicyhyZWN0X2Zyb3QubWF4X3kgLSByZWN0X2Zyb3QubWluX3kpICogcmF0aW9fVDtcclxuICAgIGNvbnN0IGJhY2tfcGFkX1QgID0gTWF0aC5hYnMocmVjdF9iYWNrLm1heF95IC0gcmVjdF9iYWNrLm1pbl95KSAqIHJhdGlvX1Q7XHJcblxyXG4gICAgY29uc3QgZnJvdF9wYWRfRCAgPSBNYXRoLmFicyhyZWN0X2Zyb3QubWF4X3kgLSByZWN0X2Zyb3QubWluX3kpICogcmF0aW9fRDtcclxuICAgIGNvbnN0IGJhY2tfcGFkX0QgID0gTWF0aC5hYnMocmVjdF9iYWNrLm1heF95IC0gcmVjdF9iYWNrLm1pbl95KSAqIHJhdGlvX0Q7XHJcblxyXG4gICAgLy8g44OR44OH44Kj44Oz44Kw6Kit5a6a5b6M44GuWFnluqfmqJnjgpLoqIjnrpfjgZnjgovjgZ/jgoHjgatcclxuICAgIC8vIOW/heimgeOBque3muWIhuOBruS9jee9ruaxuuOCgeOCkuOBmeOCi1xyXG4gICAgY29uc3QgZnJvdF90b3BfbGZ0ID0ge3g6IHJlY3RfZnJvdC5taW5feCArIGZyb3RfcGFkX1gsIHk6IHJlY3RfZnJvdC5taW5feSArIGZyb3RfcGFkX1R9XHJcbiAgICBjb25zdCBmcm90X3RvcF9yZ3QgPSB7eDogcmVjdF9mcm90Lm1heF94IC0gZnJvdF9wYWRfWCwgeTogcmVjdF9mcm90Lm1pbl95ICsgZnJvdF9wYWRfVH1cclxuICAgIGNvbnN0IGZyb3RfZHduX2xmdCA9IHt4OiByZWN0X2Zyb3QubWluX3ggKyBmcm90X3BhZF9YLCB5OiByZWN0X2Zyb3QubWF4X3kgLSBmcm90X3BhZF9EfVxyXG4gICAgY29uc3QgZnJvdF9kd25fcmd0ID0ge3g6IHJlY3RfZnJvdC5tYXhfeCAtIGZyb3RfcGFkX1gsIHk6IHJlY3RfZnJvdC5tYXhfeSAtIGZyb3RfcGFkX0R9XHJcblxyXG4gICAgY29uc3QgYmFja190b3BfbGZ0ID0ge3g6IHJlY3RfYmFjay5taW5feCArIGJhY2tfcGFkX1gsIHk6IHJlY3RfYmFjay5taW5feSArIGJhY2tfcGFkX1R9XHJcbiAgICBjb25zdCBiYWNrX3RvcF9yZ3QgPSB7eDogcmVjdF9iYWNrLm1heF94IC0gYmFja19wYWRfWCwgeTogcmVjdF9iYWNrLm1pbl95ICsgYmFja19wYWRfVH1cclxuICAgIGNvbnN0IGJhY2tfZHduX2xmdCA9IHt4OiByZWN0X2JhY2subWluX3ggKyBiYWNrX3BhZF9YLCB5OiByZWN0X2JhY2subWF4X3kgLSBiYWNrX3BhZF9EfVxyXG4gICAgY29uc3QgYmFja19kd25fcmd0ID0ge3g6IHJlY3RfYmFjay5tYXhfeCAtIGJhY2tfcGFkX1gsIHk6IHJlY3RfYmFjay5tYXhfeSAtIGJhY2tfcGFkX0R9XHJcblxyXG4gICAgbGV0IGZ0bCA9IF9fY2FsY19wYWRkaW5nX3h5KGZyb3RfdG9wX2xmdCwgYmFja190b3BfbGZ0LCByYXRpb19YKTtcclxuICAgIGxldCBmdHIgPSBfX2NhbGNfcGFkZGluZ194eShmcm90X3RvcF9yZ3QsIGJhY2tfdG9wX3JndCwgcmF0aW9fWCk7XHJcbiAgICBsZXQgZmRsID0gX19jYWxjX3BhZGRpbmdfeHkoZnJvdF9kd25fbGZ0LCBiYWNrX2R3bl9sZnQsIHJhdGlvX1gpO1xyXG4gICAgbGV0IGZkciA9IF9fY2FsY19wYWRkaW5nX3h5KGZyb3RfZHduX3JndCwgYmFja19kd25fcmd0LCByYXRpb19YKTtcclxuXHJcbiAgICBsZXQgYnRsID0gX19jYWxjX3BhZGRpbmdfeHkoYmFja190b3BfbGZ0LCBmcm90X3RvcF9sZnQsIHJhdGlvX1gpO1xyXG4gICAgbGV0IGJ0ciA9IF9fY2FsY19wYWRkaW5nX3h5KGJhY2tfdG9wX3JndCwgZnJvdF90b3Bfcmd0LCByYXRpb19YKTtcclxuICAgIGxldCBiZGwgPSBfX2NhbGNfcGFkZGluZ194eShiYWNrX2R3bl9sZnQsIGZyb3RfZHduX2xmdCwgcmF0aW9fWCk7XHJcbiAgICBsZXQgYmRyID0gX19jYWxjX3BhZGRpbmdfeHkoYmFja19kd25fcmd0LCBmcm90X2R3bl9yZ3QsIHJhdGlvX1gpO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgZnRsOiBmdGwsIGZ0cjogZnRyLFxyXG4gICAgICAgIGZkbDogZmRsLCBmZHI6IGZkcixcclxuICAgICAgICBidGw6IGJ0bCwgYnRyOiBidHIsXHJcbiAgICAgICAgYmRsOiBiZGwsIGJkcjogYmRyLFxyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIF9fY2FsY19wYWRkaW5nX3h5KGZyb3Q6IFRfeHksIGJhY2s6IFRfeHksIHJhdGlvOiBudW1iZXIpOiBUX3h5IHtcclxuICAgICAgICAvLyDnt5rliIYoQXggKyBCID0geSnjga7mlrnnqIvlvI/jga7kv4LmlbDjgpLmsYLjgoHjgotcclxuICAgICAgICBjb25zdCBBID0gKGZyb3QueSAtIGJhY2sueSkgLyAoZnJvdC54IC0gYmFjay54KTtcclxuICAgICAgICBjb25zdCBCID0gIGZyb3QueSAtIEEgKiBmcm90Lng7XHJcbiAgICBcclxuICAgICAgICAvLyDjg5Hjg4fjgqPjg7PjgrDoqr/mlbTlvozjga5YWeW6p+aomeOBruioiOeul1xyXG4gICAgICAgIGNvbnN0IHBfZnJvdF94ID0gZnJvdC54ICsgKGJhY2sueCAtIGZyb3QueCkgKiByYXRpbztcclxuICAgICAgICBjb25zdCBwX2Zyb3RfeSA9IEEgKiBwX2Zyb3RfeCArIEI7XHJcblxyXG4gICAgICAgIHJldHVybiB7eDogcF9mcm90X3gsIHk6IHBfZnJvdF95fTtcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIGRyb3czRF9jZWxsX2Zsb29yKFxyXG4gICAgICAgIHJlY3RfZnJvdDogVF9XYWxsLCBcclxuICAgICAgICByZWN0X2JhY2s6IFRfV2FsbCwgXHJcbiAgICAgICAgZmlsbDogc3RyaW5nID0gJyM2NjY2ZmYnLCBcclxuICAgICAgICBsaW5lOiBzdHJpbmcgPSAnIzk5OTlmZidcclxuICAgICk6IHZvaWQge1xyXG5cclxuICAgIGNvbnN0IHJlY3Q6IFRfUmVjdCA9IHtcclxuICAgICAgICB0bDoge3g6IHJlY3RfZnJvdC5taW5feCwgeTogcmVjdF9mcm90Lm1heF95fSxcclxuICAgICAgICB0cjoge3g6IHJlY3RfZnJvdC5tYXhfeCwgeTogcmVjdF9mcm90Lm1heF95fSxcclxuICAgICAgICBkcjoge3g6IHJlY3RfYmFjay5tYXhfeCwgeTogcmVjdF9iYWNrLm1heF95fSxcclxuICAgICAgICBkbDoge3g6IHJlY3RfYmFjay5taW5feCwgeTogcmVjdF9iYWNrLm1heF95fVxyXG4gICAgfVxyXG4gICAgZHJvdzNEX2NlbGwocmVjdCwgZmlsbCwgbGluZSk7XHJcbn1cclxuZnVuY3Rpb24gZHJvdzNEX2NlbGxfY2VpbGluZyhcclxuICAgICAgICByZWN0X2Zyb3Q6IFRfV2FsbCwgXHJcbiAgICAgICAgcmVjdF9iYWNrOiBUX1dhbGwsIFxyXG4gICAgICAgIGZpbGw6IHN0cmluZyA9ICcjYWFhYWFhJywgXHJcbiAgICAgICAgbGluZTogc3RyaW5nID0gJyM5OTk5ZmYnXHJcbiAgICApOiB2b2lkIHtcclxuXHJcbiAgICBjb25zdCByZWN0OiBUX1JlY3QgPSB7XHJcbiAgICAgICAgdGw6IHt4OiByZWN0X2Zyb3QubWluX3gsIHk6IHJlY3RfZnJvdC5taW5feX0sXHJcbiAgICAgICAgdHI6IHt4OiByZWN0X2Zyb3QubWF4X3gsIHk6IHJlY3RfZnJvdC5taW5feX0sXHJcbiAgICAgICAgZHI6IHt4OiByZWN0X2JhY2subWF4X3gsIHk6IHJlY3RfYmFjay5taW5feX0sXHJcbiAgICAgICAgZGw6IHt4OiByZWN0X2JhY2subWluX3gsIHk6IHJlY3RfYmFjay5taW5feX1cclxuICAgIH1cclxuICAgIGRyb3czRF9jZWxsKHJlY3QsIGZpbGwsIGxpbmUpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkcm93MkRfY2VsbChyOiBUX1JlY3QsIGZpbGw6IHN0cmluZ3xudWxsLCBsaW5lOiBzdHJpbmd8bnVsbCk6IHZvaWQge1xyXG4gICAgY29uc3QgY29uID0gQ19NYXplT2JqVmlldy5nZXRfY29udGV4dDJEKCk7XHJcbiAgICBpZiAoY29uID09PSB1bmRlZmluZWQpIHJldHVybjtcclxuXHJcbiAgICBjb24uYmVnaW5QYXRoKCk7XHJcbiAgICBjb24ubW92ZVRvKHIudGwueCwgci50bC55KTtcclxuICAgIGNvbi5saW5lVG8oci50ci54LCByLnRyLnkpO1xyXG4gICAgY29uLmxpbmVUbyhyLmRyLngsIHIuZHIueSk7XHJcbiAgICBjb24ubGluZVRvKHIuZGwueCwgci5kbC55KTtcclxuICAgIGNvbi5jbG9zZVBhdGgoKTtcclxuXHJcbiAgICBpZiAoZmlsbCAhPSBudWxsKSB7XHJcbiAgICAgICAgY29uLmZpbGxTdHlsZSAgID0gZmlsbDtcclxuICAgICAgICBjb24uZmlsbCgpO1xyXG4gICAgfVxyXG4gICAgaWYgKGxpbmUgIT09IG51bGwpIHtcclxuICAgICAgICBjb24uc3Ryb2tlU3R5bGUgPSBsaW5lO1xyXG4gICAgICAgIGNvbi5saW5lV2lkdGggICA9IDE7XHJcbiAgICAgICAgY29uLnN0cm9rZSgpO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBkcm93M0RfY2VsbChyOiBUX1JlY3QsIGZpbGw6IHN0cmluZ3xudWxsLCBsaW5lOiBzdHJpbmd8bnVsbCk6IHZvaWQge1xyXG4gICAgY29uc3QgY29uID0gQ19NYXplT2JqVmlldy5nZXRfY29udGV4dDNEKCk7XHJcbiAgICBpZiAoY29uID09PSB1bmRlZmluZWQpIHJldHVybjtcclxuXHJcbiAgICBjb24uYmVnaW5QYXRoKCk7XHJcbiAgICBjb24ubW92ZVRvKHIudGwueCwgci50bC55KTtcclxuICAgIGNvbi5saW5lVG8oci50ci54LCByLnRyLnkpO1xyXG4gICAgY29uLmxpbmVUbyhyLmRyLngsIHIuZHIueSk7XHJcbiAgICBjb24ubGluZVRvKHIuZGwueCwgci5kbC55KTtcclxuICAgIGNvbi5jbG9zZVBhdGgoKTtcclxuXHJcbiAgICBpZiAoZmlsbCAhPSBudWxsKSB7XHJcbiAgICAgICAgY29uLmZpbGxTdHlsZSAgID0gZmlsbDtcclxuICAgICAgICBjb24uZmlsbCgpO1xyXG4gICAgfVxyXG4gICAgaWYgKGxpbmUgIT09IG51bGwpIHtcclxuICAgICAgICBjb24uc3Ryb2tlU3R5bGUgPSBsaW5lO1xyXG4gICAgICAgIGNvbi5saW5lV2lkdGggICA9IDE7XHJcbiAgICAgICAgY29uLnN0cm9rZSgpO1xyXG4gICAgfVxyXG59XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5cclxuaW1wb3J0IHsgQ19Mb2NhdGlvbiwgSlNPTl9Mb2NhdGlvbiB9IGZyb20gXCIuL0NfTG9jYXRpb25cIjtcclxuaW1wb3J0IHsgSV9KU09OX1VuaXEgfSAgICAgICAgICAgICAgIGZyb20gXCIuL0NfU2F2ZUluZm9cIjtcclxuaW1wb3J0IHsgX2dldF91dWlkIH0gICAgICAgICAgICAgICAgIGZyb20gXCIuLi9kX3V0bC9GX1JhbmRcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSlNPTl9Nb3ZhYmxlUG9pbnQgZXh0ZW5kcyBKU09OX0xvY2F0aW9uIHtcclxuICAgIHVuaXFfaWQ/OiAgc3RyaW5nLFxyXG4gICAgY3VyX3VybD86ICBzdHJpbmcsXHJcbiAgICB0ZWFtX3VpZD86IHN0cmluZyxcclxufVxyXG5cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhbGVydF9tdnB0X2luZm8oYTogSlNPTl9Nb3ZhYmxlUG9pbnR8dW5kZWZpbmVkKTogdm9pZCB7XHJcbiAgICBpZiAoYSA9PT0gdW5kZWZpbmVkKSByZXR1cm47XHJcbiAgICBhbGVydChcIk12UHQgSW5mbzpcIiBcclxuICAgICAgICArIFwiXFxudW5pcV9pZDogIFwiICArIChhLnVuaXFfaWQgICAgPz8gJz8nKVxyXG4gICAgICAgICsgXCJcXG5jdXJfdXJsOiAgXCIgICsgKGEuY3VyX3VybCAgICA/PyAnPycpXHJcbiAgICAgICAgKyBcIlxcbnRlYW1fdWlkOiBcIiAgKyAoYS50ZWFtX3VpZCAgID8/ICc/JylcclxuICAgICAgICArIFwiXFxubGNrZDogXCIgICAgICArIChhLmtpbmQgICAgICAgPz8gJz8nKVxyXG4gICAgICAgICsgXCJcXG5sY25tOiBcIiAgICAgICsgKGEubmFtZSAgICAgICA/PyAnPycpXHJcbiAgICAgICAgKyBcIlxcbmxjaWQ6IFwiICAgICAgKyAoYS5sb2NfdWlkICAgID8/ICc/JylcclxuICAgICAgICArIFwiXFxuY3VyX3g6IFwiICAgICArIChhLmxvY19wb3M/LnggPz8gJz8nKVxyXG4gICAgICAgICsgXCJcXG5jdXJfeTogXCIgICAgICsgKGEubG9jX3Bvcz8ueSA/PyAnPycpXHJcbiAgICAgICAgKyBcIlxcbmN1cl96OiBcIiAgICAgKyAoYS5sb2NfcG9zPy56ID8/ICc/JylcclxuICAgICAgICArIFwiXFxuY3VyX2Q6IFwiICAgICArIChhLmxvY19wb3M/LmQgPz8gJz8nKVxyXG4gICAgICAgICsgXCJcXG5cIlxyXG4gICAgKTtcclxufVxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBDX01vdmFibGVQb2ludCBleHRlbmRzIENfTG9jYXRpb24gaW1wbGVtZW50cyBJX0pTT05fVW5pcSB7XHJcbiAgICBwcm90ZWN0ZWQgdW5pcV9pZDogIHN0cmluZztcclxuICAgIHByb3RlY3RlZCBjdXJfdXJsOiAgc3RyaW5nO1xyXG4gICAgcHJvdGVjdGVkIHRlYW1fdWlkOiBzdHJpbmd8dW5kZWZpbmVkO1xyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKGpzb24/OiBKU09OX01vdmFibGVQb2ludCkge1xyXG4gICAgICAgIHN1cGVyKGpzb24pO1xyXG4gICAgICAgIHRoaXMudW5pcV9pZCAgPSAnTXZQb2ludCMnICsgX2dldF91dWlkKCk7XHJcbiAgICAgICAgdGhpcy5jdXJfdXJsICA9ICcnO1xyXG4gICAgICAgIHRoaXMudGVhbV91aWQgPSB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgIGlmIChqc29uICE9PSB1bmRlZmluZWQgJiYganNvbiAhPT0gbnVsbCkgdGhpcy5kZWNvZGUoanNvbik7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgdWlkKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLnVuaXFfaWR9XHJcbiAgICBwdWJsaWMgdXJsKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLmN1cl91cmx9XHJcbiAgICBwdWJsaWMgdGlkKCk6IHN0cmluZ3x1bmRlZmluZWQgeyByZXR1cm4gdGhpcy50ZWFtX3VpZH1cclxuXHJcbiAgICBwdWJsaWMgbmV3X3VpZCgpOiB2b2lkIHt0aGlzLnVuaXFfaWQgPSAnTXZQb2ludCMnICsgX2dldF91dWlkKCk7fVxyXG4gICAgcHVibGljIHNldF91cmwodXJsOiBzdHJpbmcpOiB2b2lkIHsgdGhpcy5jdXJfdXJsICA9IHVybDt9XHJcbiAgICBwdWJsaWMgc2V0X3RpZCh0aWQ6IHN0cmluZyk6IHZvaWQgeyB0aGlzLnRlYW1fdWlkID0gdGlkO31cclxuXHJcbiAgICBwdWJsaWMgY2xvbmUoKTogQ19Nb3ZhYmxlUG9pbnQge1xyXG4gICAgICAgIGNvbnN0IG12cHQgPSBuZXcgQ19Nb3ZhYmxlUG9pbnQodGhpcy5lbmNvZGUoKSk7XHJcbiAgICAgICAgbXZwdC5uZXdfdWlkKCk7XHJcbiAgICAgICAgcmV0dXJuIG12cHQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGZyb21KU09OKHR4dDogc3RyaW5nKTogQ19Nb3ZhYmxlUG9pbnQge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGogPSBKU09OLnBhcnNlKHR4dCkgYXMgSlNPTl9Nb3ZhYmxlUG9pbnQ7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRlY29kZShqKTtcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIHB1YmxpYyB0b0pTT04oKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodGhpcy5lbmNvZGUoKSwgbnVsbCwgXCJcXHRcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBmcm9tX29ial90b19zdHJpbmcob2E6IENfTW92YWJsZVBvaW50KTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkob2EuZW5jb2RlKCkpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHN0YXRpYyBmcm9tX29iakFycmF5X3RvX3N0cmluZyhvYWE6IHtbdWlkOiBzdHJpbmddOiBDX01vdmFibGVQb2ludH0pOiBzdHJpbmcge1xyXG4gICAgICAgIGNvbnN0IG9hID0gW10gYXMgSlNPTl9Nb3ZhYmxlUG9pbnRbXTtcclxuICAgICAgICBmb3IgKGNvbnN0IGlpIGluIG9hYSkgb2EucHVzaChvYWFbaWldLmVuY29kZSgpKTtcclxuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkob2EpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHN0YXRpYyBmcm9tX3N0cmluZ190b19vYmoodHh0OiBzdHJpbmcpOiBDX01vdmFibGVQb2ludCB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgaiAgID0gSlNPTi5wYXJzZSh0eHQpIGFzIEpTT05fTW92YWJsZVBvaW50W107XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgQ19Nb3ZhYmxlUG9pbnQoKS5kZWNvZGUoaik7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgQ19Nb3ZhYmxlUG9pbnQoKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgcHVibGljIHN0YXRpYyBmcm9tX3N0cmluZ190b19vYmpBcnJheSh0eHQ6IHN0cmluZyk6IHtbdWlkOiBzdHJpbmddOiBDX01vdmFibGVQb2ludH0ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGogICA9IEpTT04ucGFyc2UodHh0KSBhcyBKU09OX01vdmFibGVQb2ludFtdO1xyXG4gICAgICAgICAgICBjb25zdCBtcGEgPSB7fSBhcyB7W2lkOiBzdHJpbmddOiBDX01vdmFibGVQb2ludH07XHJcbiAgICAgICAgICAgIGZvciAoY29uc3Qgamogb2Ygaikge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYWFhID0gbmV3IENfTW92YWJsZVBvaW50KCkuZGVjb2RlKGpqKTtcclxuICAgICAgICAgICAgICAgIG1wYVthYWEudWlkKCldID0gYWFhO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBtcGE7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7fTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBlbmNvZGUoKTogSlNPTl9Nb3ZhYmxlUG9pbnQge1xyXG4gICAgICAgIGNvbnN0IGogPSBzdXBlci5lbmNvZGUoKSBhcyBKU09OX01vdmFibGVQb2ludDtcclxuICAgICAgICBqLnVuaXFfaWQgID0gdGhpcy51bmlxX2lkO1xyXG4gICAgICAgIGouY3VyX3VybCAgPSB0aGlzLmN1cl91cmw7XHJcbiAgICAgICAgai50ZWFtX3VpZCA9IHRoaXMudGVhbV91aWQgPz8gJyc7XHJcbiAgICAgICAgcmV0dXJuIGo7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZGVjb2RlKGo/OiBKU09OX01vdmFibGVQb2ludCk6IENfTW92YWJsZVBvaW50IHtcclxuICAgICAgICBzdXBlci5kZWNvZGUoaik7XHJcbiAgICAgICAgaWYgKGogPT09IHVuZGVmaW5lZCkgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgaWYgKGoudW5pcV9pZCAgIT09IHVuZGVmaW5lZCkgdGhpcy51bmlxX2lkICA9IGoudW5pcV9pZDtcclxuICAgICAgICBpZiAoai5jdXJfdXJsICAhPT0gdW5kZWZpbmVkKSB0aGlzLmN1cl91cmwgID0gai5jdXJfdXJsO1xyXG4gICAgICAgIGlmIChqLnRlYW1fdWlkICE9PSB1bmRlZmluZWQpIHRoaXMudGVhbV91aWQgPSBqLnRlYW1fdWlkO1xyXG5cclxuICAgICAgICBpZiAodGhpcy50ZWFtX3VpZCA9PT0gJycpIHRoaXMudGVhbV91aWQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBhbGVydCgpOiB2b2lkIHtcclxuICAgICAgICBhbGVydChcIk12UHQgSW5mbzpcIiBcclxuICAgICAgICAgICAgKyBcIlxcbnVuaXFfaWQ6ICBcIiAgKyAodGhpcy51bmlxX2lkICAgID8/ICc/JylcclxuICAgICAgICAgICAgKyBcIlxcbmN1cl91cmw6ICBcIiAgKyAodGhpcy5jdXJfdXJsICAgID8/ICc/JylcclxuICAgICAgICAgICAgKyBcIlxcbnRlYW1fdWlkOiBcIiAgKyAodGhpcy50ZWFtX3VpZCAgID8/ICc/JylcclxuICAgICAgICAgICAgKyBcIlxcbmxja2Q6IFwiICAgICAgKyAodGhpcy5sb2Nfa2luZCAgID8/ICc/JylcclxuICAgICAgICAgICAgKyBcIlxcbmxjbm06IFwiICAgICAgKyAodGhpcy5sb2NfbmFtZSAgID8/ICc/JylcclxuICAgICAgICAgICAgKyBcIlxcbmxjaWQ6IFwiICAgICAgKyAodGhpcy5sb2NfdWlkICAgID8/ICc/JylcclxuICAgICAgICAgICAgKyBcIlxcbmN1cl94OiBcIiAgICAgKyAodGhpcy5sb2NfcG9zPy54ID8/ICc/JylcclxuICAgICAgICAgICAgKyBcIlxcbmN1cl95OiBcIiAgICAgKyAodGhpcy5sb2NfcG9zPy55ID8/ICc/JylcclxuICAgICAgICAgICAgKyBcIlxcbmN1cl96OiBcIiAgICAgKyAodGhpcy5sb2NfcG9zPy56ID8/ICc/JylcclxuICAgICAgICAgICAgKyBcIlxcbmN1cl9kOiBcIiAgICAgKyAodGhpcy5sb2NfcG9zPy5kID8/ICc/JylcclxuICAgICAgICAgICAgKyBcIlxcblwiXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuXHJcbmltcG9ydCB7IElfSlNPTiwgSlNPTl9BbnkgfSBmcm9tIFwiLi9DX1NhdmVJbmZvXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEpTT05fUG9pbnQgZXh0ZW5kcyBKU09OX0FueSB7XHJcbiAgICB4PzogbnVtYmVyLFxyXG4gICAgeT86IG51bWJlcixcclxuICAgIHo/OiBudW1iZXIsXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBDX1BvaW50IGltcGxlbWVudHMgSV9KU09Oe1xyXG4gICAgcHVibGljIHg6IG51bWJlcjtcclxuICAgIHB1YmxpYyB5OiBudW1iZXI7XHJcbiAgICBwdWJsaWMgejogbnVtYmVyO1xyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHg/OiBudW1iZXJ8Q19Qb2ludHxKU09OX1BvaW50fHVuZGVmaW5lZCwgeT86IG51bWJlciwgej86IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMueCA9IHRoaXMueSA9IHRoaXMueiA9IC0zO1xyXG5cclxuICAgICAgICBpZiAoeCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMueCA9IDA7IHRoaXMueSA9IDA7IHRoaXMueiA9IDA7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiB4ID09PSBcIm51bWJlclwiICYmIHR5cGVvZiB5ID09PSBcIm51bWJlclwiICYmIHR5cGVvZiB6ID09PSBcIm51bWJlclwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMueCA9IHg7IHRoaXMueSA9IHk7IHRoaXMueiA9IHo7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiB4ID09PSBcIm9iamVjdFwiKSB7IFxyXG4gICAgICAgICAgICBpZiAoeCBpbnN0YW5jZW9mIENfUG9pbnQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMueCA9IHgueDsgdGhpcy55ID0geC55OyB0aGlzLnogPSB4Lno7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlY29kZSh4KTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnggPSB0aGlzLnkgPSB0aGlzLnogPSAtMjtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldF9wKCk6IENfUG9pbnQge3JldHVybiBuZXcgQ19Qb2ludCh0aGlzKX0gXHJcbiAgICBwdWJsaWMgc2V0X3AocDogQ19Qb2ludCk6IENfUG9pbnR8dW5kZWZpbmVkIHtcclxuICAgICAgICB0aGlzLnggPSBwLng7IHRoaXMueSA9IHAueTsgdGhpcy56ID0gcC56O1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpc19leGlzdCh4OiBudW1iZXIsIHk6IG51bWJlciwgejogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuICh4ID09IHRoaXMueCAmJiB5ID09IHRoaXMueSAmJiB6ID09IHRoaXMueik7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgd2l0aGluKHA6IENfUG9pbnQpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gKHAueCA9PSB0aGlzLnggJiYgcC55ID09IHRoaXMueSAmJiBwLnogPT0gdGhpcy56KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIGVuY29kZSgpOiBKU09OX1BvaW50IHtcclxuICAgICAgICByZXR1cm4ge3g6IHRoaXMueCwgeTogdGhpcy55LCB6OiB0aGlzLnp9O1xyXG4gICAgfVxyXG4gICAgcHVibGljIGRlY29kZShhPzogSlNPTl9Qb2ludCk6IENfUG9pbnQge1xyXG4gICAgICAgIGlmIChhID09PSB1bmRlZmluZWQpIHJldHVybiB0aGlzO1xyXG4gICAgICAgIGlmIChhLnggPT09IHVuZGVmaW5lZCB8fCBhLnkgPT09IHVuZGVmaW5lZCB8fCBhLnogPT09IHVuZGVmaW5lZCkgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgdGhpcy54ID0gYS54OyB0aGlzLnkgPSBhLnk7IHRoaXMueiA9IGEuejtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxufVxyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuXHJcbmltcG9ydCB7IENfUG9pbnQsIEpTT05fUG9pbnQgfSBmcm9tICcuL0NfUG9pbnQnO1xyXG5pbXBvcnQge1RfTWFrZUVudW1UeXBlfSAgICAgICAgZnJvbSBcIi4uL2RfdXRsL1RfTWFrZUVudW1UeXBlXCI7XHJcblxyXG5leHBvcnQgY29uc3QgVF9EaXJlY3Rpb246e1tkaXI6IHN0cmluZ106IG51bWJlcn0gPSB7XHJcbiAgICBOOiAwLFxyXG4gICAgRTogMSxcclxuICAgIFM6IDIsXHJcbiAgICBXOiAzLFxyXG4gICAgWDogOTlcclxufSBhcyBjb25zdDtcclxuZXhwb3J0IHR5cGUgVF9EaXJlY3Rpb24gPSBUX01ha2VFbnVtVHlwZTx0eXBlb2YgVF9EaXJlY3Rpb24+O1xyXG5cclxuZnVuY3Rpb24gX2Rpcl9rZXkoZGlyOiBUX0RpcmVjdGlvbiB8IHVuZGVmaW5lZCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gT2JqZWN0LmtleXMoVF9EaXJlY3Rpb24pLmZpbmQoa2V5ID0+IFRfRGlyZWN0aW9uW2tleV0gPT09IGRpcikgPz8gXCI/Pz8/XCI7XHJcbn1cclxuXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEpTT05fUG9pbnREaXIgZXh0ZW5kcyBKU09OX1BvaW50IHtcclxuICAgIGQ/OiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhbGVydF9QRF9pbmZvKGE6IEpTT05fUG9pbnREaXJ8dW5kZWZpbmVkKTogdm9pZCB7XHJcbiAgICBpZiAoYSA9PT0gdW5kZWZpbmVkKSByZXR1cm47XHJcbiAgICBhbGVydChcIlBvaW50RGF0YSBJbmZvOlwiIFxyXG4gICAgICAgICsgXCJcXG54OiBcIiAgICAgKyAoYT8ueCA/PyAnPycpXHJcbiAgICAgICAgKyBcIlxcbnk6IFwiICAgICArIChhPy55ID8/ICc/JylcclxuICAgICAgICArIFwiXFxuejogXCIgICAgICsgKGE/LnogPz8gJz8nKVxyXG4gICAgICAgICsgXCJcXG5kOiBcIiAgICAgKyAoYT8uZCA/PyAnPycpXHJcbiAgICAgICAgKyBcIlxcblwiXHJcbiAgICApO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgIENfUG9pbnREaXIgZXh0ZW5kcyBDX1BvaW50IHtcclxuICAgIHB1YmxpYyBkOiBUX0RpcmVjdGlvbjtcclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihkPzogbnVtYmVyfFRfRGlyZWN0aW9ufENfUG9pbnREaXJ8SlNPTl9Qb2ludERpcikge1xyXG4gICAgICAgIHN1cGVyKGQpO1xyXG4gICAgICAgIHRoaXMuZCA9IFRfRGlyZWN0aW9uLlg7XHJcblxyXG4gICAgICAgIGlmIChkID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIGQgPT09IFwibnVtYmVyXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5kID0gZCBhcyBUX0RpcmVjdGlvbjtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIGQgPT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICAgICAgaWYgKGQgaW5zdGFuY2VvZiBDX1BvaW50RGlyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmQgPSBkLmQgYXMgVF9EaXJlY3Rpb247XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlY29kZShkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZCA9IFRfRGlyZWN0aW9uLlg7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldF9kX21iX25hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICBzd2l0Y2ggKHRoaXMuZCkge1xyXG4gICAgICAgICAgICBjYXNlIDA6ICByZXR1cm4gJ+WMlyc7XHJcbiAgICAgICAgICAgIGNhc2UgMTogIHJldHVybiAn5p2xJztcclxuICAgICAgICAgICAgY2FzZSAyOiAgcmV0dXJuICfljZcnO1xyXG4gICAgICAgICAgICBjYXNlIDM6ICByZXR1cm4gJ+ilvyc7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiAn6KyOJztcclxuICAgICAgICB9ICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0X2QoKTogVF9EaXJlY3Rpb24ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmQ7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0X2QoZDogVF9EaXJlY3Rpb24pOiBDX1BvaW50RGlyfHVuZGVmaW5lZCB7XHJcbiAgICAgICAgaWYgKCEoX2Rpcl9rZXkoZCkgaW4gVF9EaXJlY3Rpb24pKSByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIHRoaXMuZCA9IGQ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0X3BkKCk6IENfUG9pbnREaXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldF9wZChkOiBDX1BvaW50RGlyfEpTT05fUG9pbnREaXIpOiBDX1BvaW50RGlyfHVuZGVmaW5lZCB7XHJcbiAgICAgICAgaWYgKGQgaW5zdGFuY2VvZiBDX1BvaW50RGlyKSB7XHJcbiAgICAgICAgICAgIGlmICghKF9kaXJfa2V5KGQuZCkgaW4gVF9EaXJlY3Rpb24pKSByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICBzdXBlci5zZXRfcChkKTtcclxuICAgICAgICAgICAgdGhpcy5kID0gZC5kO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCEoX2Rpcl9rZXkoZC5kKSBpbiBUX0RpcmVjdGlvbikpIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhpcy5kZWNvZGUoZCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGVuY29kZSgpOiBKU09OX1BvaW50RGlyIHtcclxuICAgICAgICBjb25zdCBqID0gc3VwZXIuZW5jb2RlKCkgYXMgSlNPTl9Qb2ludERpcjtcclxuICAgICAgICBqLmQgICAgID0gdGhpcy5kIGFzIG51bWJlcjtcclxuICAgICAgICByZXR1cm4gajtcclxuICAgIH1cclxuICAgIHB1YmxpYyBkZWNvZGUoaj86IEpTT05fUG9pbnREaXIpOiBDX1BvaW50RGlyIHtcclxuICAgICAgICBpZiAoaiA9PT0gdW5kZWZpbmVkKSByZXR1cm4gdGhpcztcclxuICAgICAgICBpZiAoIShfZGlyX2tleShqLmQpIGluIFRfRGlyZWN0aW9uKSkgcmV0dXJuIHRoaXM7XHJcblxyXG4gICAgICAgIHN1cGVyLmRlY29kZShqKTtcclxuICAgICAgICB0aGlzLmQgPSBqLmQgYXMgVF9EaXJlY3Rpb247XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBhbGVydCgpOiB2b2lkIHtcclxuICAgICAgICBhbGVydChcIlBvaW50RGF0YSBJbmZvOlwiIFxyXG4gICAgICAgICAgICArIFwiXFxueDogXCIgICAgICsgKHRoaXMueCA/PyAnPycpXHJcbiAgICAgICAgICAgICsgXCJcXG55OiBcIiAgICAgKyAodGhpcy55ID8/ICc/JylcclxuICAgICAgICAgICAgKyBcIlxcbno6IFwiICAgICArICh0aGlzLnogPz8gJz8nKVxyXG4gICAgICAgICAgICArIFwiXFxuZDogXCIgICAgICsgKHRoaXMuZCA/PyAnPycpXHJcbiAgICAgICAgICAgICsgXCJcXG5cIlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuIiwiY2xhc3MgQ19Qb2ludDJEIHtcclxuICAgIHB1YmxpYyB4OiBudW1iZXI7XHJcbiAgICBwdWJsaWMgeTogbnVtYmVyO1xyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHg6IG51bWJlciA9IDAsIHk6IG51bWJlciA9IDApXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy54ICA9IHg7XHJcbiAgICAgICAgdGhpcy55ICA9IHk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgaXNfZXhpc3QoeDogbnVtYmVyLCB5OiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gKHRoaXMueCA9PSB4KSAmJiAodGhpcy55ID09IHkpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQ19Qb2ludExpbmsyRCBleHRlbmRzIENfUG9pbnQyRCB7XHJcbiAgICBwdWJsaWMgZGk6IG51bWJlcjtcclxuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcih4OiBudW1iZXIgPSAwLCB5OiBudW1iZXIgPSAwLCBkaTogbnVtYmVyID0gLTEpXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIoeCwgeSk7XHJcbiAgICAgICAgdGhpcy5kaSA9IGRpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHN0YXRpYyBjYXN0KHA6IENfUG9pbnQyRHx1bmRlZmluZWQpOiBDX1BvaW50TGluazJEfHVuZGVmaW5lZCB7XHJcbiAgICAgICAgaWYgKHA/LnggPT09IHVuZGVmaW5lZCkgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICBpZiAocD8ueSA9PT0gdW5kZWZpbmVkKSByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIHJldHVybiBwIGluc3RhbmNlb2YgQ19Qb2ludExpbmsyRCA/IHAgOiBuZXcgQ19Qb2ludExpbmsyRChwLngsIHAueSk7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5leHBvcnQgY2xhc3MgQ19Qb2ludFNldDJEIHtcclxuICAgIHB1YmxpYyBzZXQ6IENfUG9pbnQyRFtdID1bXTtcclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG4gICAgcHVibGljIHB1c2gocDogQ19Qb2ludDJEKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zZXQucHVzaChwKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0X3BvaW50KHg6IG51bWJlciwgeTogbnVtYmVyKTogQ19Qb2ludDJEfHVuZGVmaW5lZCB7XHJcbiAgICAgICAgZm9yIChjb25zdCBwIG9mIHRoaXMuc2V0KSB7XHJcbiAgICAgICAgICAgIGlmIChwPy5pc19leGlzdCh4LCB5KSkgcmV0dXJuIHA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7ICAgICAgICAgICAgXHJcbiAgICB9XHJcbiAgICBwdWJsaWMgcmVtb3ZlKHA6IENfUG9pbnQyRCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucmVtb3ZlX3h5KHAueCwgcC55KTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgcmVtb3ZlX3h5KHg6IG51bWJlciwgeTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgZm9yIChjb25zdCBpIGluIHRoaXMuc2V0KSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNldFtpXT8uaXNfZXhpc3QoeCwgeSkpIHtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLnNldFtpXTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0ID0gWy4uLnRoaXMuc2V0XTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHB1YmxpYyBpc19leGlzdCh4OiBudW1iZXIsIHk6IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIGZvciAoY29uc3QgcCBvZiB0aGlzLnNldCkgaWYgKHA/LmlzX2V4aXN0KHgsIHkpKSByZXR1cm4gdHJ1ZTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qXHJcbmNsYXNzIFBvaW50M0Qge1xyXG4gICAgcHVibGljIGludCAkeDtcclxuICAgIHB1YmxpYyBpbnQgJHk7XHJcbiAgICBwdWJsaWMgaW50ICR6O1xyXG4gICAgcHVibGljIGZ1bmN0aW9uIF9fY29uc3RydWN0KGludCAkeCA9IDAsIGludCAkeSA9IDAsIGludCAkeiA9IDApXHJcbiAgICB7XHJcbiAgICAgICAgJHRoaXMtPnggID0gJHg7XHJcbiAgICAgICAgJHRoaXMtPnkgID0gJHk7XHJcbiAgICAgICAgJHRoaXMtPnogID0gJHo7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZnVuY3Rpb24gaXNfZXhpc3QoaW50ICR4LCBpbnQgJHksIGludCAkeik6IGJvb2wge1xyXG4gICAgICAgIHJldHVybiAoJHRoaXMtPnggPT0gJHgpICYmICgkdGhpcy0+eSA9PSAkeSkgJiYgKCR0aGlzLT56ID09ICR6KTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBmdW5jdGlvbiB3aXRoaW4oUG9pbnQzRCAkcCk6IGJvb2wge1xyXG4gICAgICAgIHJldHVybiAkdGhpcy0+aXNfZXhpc3QoJHAtPngsICRwLT55LCAkcC0+eik7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZnVuY3Rpb24gZW5jb2RlKCk6IGFycmF5IHtcclxuICAgICAgICAkYSA9IFtdO1xyXG4gICAgICAgICRhWyd4J10gPSAkdGhpcy0+eDtcclxuICAgICAgICAkYVsneSddID0gJHRoaXMtPnk7XHJcbiAgICAgICAgJGFbJ3onXSA9ICR0aGlzLT56O1xyXG5cclxuICAgICAgICByZXR1cm4gJGE7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZnVuY3Rpb24gZGVjb2RlKGFycmF5ICRhKTogUG9pbnQzRCB7XHJcbiAgICAgICAgaWYgKCFpc19udWxsKCRhKSAmJiBpc19hcnJheSgkYSkpIHtcclxuICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgYXJyYXlfa2V5X2V4aXN0cygneCcsICRhKSAmJiAoaXNfbnVtZXJpYygkYVsneCddKSAmJiAkYVsneCddID4gIDApXHJcbiAgICAgICAgICAgICYmICBhcnJheV9rZXlfZXhpc3RzKCd5JywgJGEpICYmIChpc19udW1lcmljKCRhWyd5J10pICYmICRhWyd5J10gPiAgMClcclxuICAgICAgICAgICAgJiYgIGFycmF5X2tleV9leGlzdHMoJ3onLCAkYSkgJiYgKGlzX251bWVyaWMoJGFbJ3onXSkgJiYgJGFbJ3onXSA+PSAwKVxyXG4gICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgICR0aGlzLT54ID0gJGFbJ3gnXTtcclxuICAgICAgICAgICAgICAgICR0aGlzLT55ID0gJGFbJ3knXTtcclxuICAgICAgICAgICAgICAgICR0aGlzLT56ID0gJGFbJ3onXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gJHRoaXM7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc3RhdGljIGZ1bmN0aW9uIGRlY29kZV9hbmRfbmV3KGFycmF5ICRhKTogUG9pbnQzRCB7XHJcbiAgICAgICAgaWYgKCFpc19udWxsKCRhKSAmJiBpc19hcnJheSgkYSkpIHtcclxuICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgICAgYXJyYXlfa2V5X2V4aXN0cygneCcsICRhKSAmJiAoaXNfbnVtZXJpYygkYVsneCddKSAmJiAkYVsneCddID4gIDApXHJcbiAgICAgICAgICAgICYmICBhcnJheV9rZXlfZXhpc3RzKCd5JywgJGEpICYmIChpc19udW1lcmljKCRhWyd5J10pICYmICRhWyd5J10gPiAgMClcclxuICAgICAgICAgICAgJiYgIGFycmF5X2tleV9leGlzdHMoJ3onLCAkYSkgJiYgKGlzX251bWVyaWMoJGFbJ3onXSkgJiYgJGFbJ3onXSA+PSAwKVxyXG4gICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUG9pbnQzRCgkYVsneCddLCAkYVsneSddLCAkYVsneiddKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV3IFBvaW50M0QoLTEsIC0xLCAtMSk7XHJcbiAgICB9XHJcbn1cclxuKi9cclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5pbXBvcnQgeyBfbWF4LCBfbWluIH0gICAgICAgICAgIGZyb20gXCIuLi9kX3V0bC9GX01hdGhcIjtcclxuaW1wb3J0IHsgQ19Qb2ludCwgSlNPTl9Qb2ludCB9ICBmcm9tIFwiLi9DX1BvaW50XCI7XHJcbmltcG9ydCB7IEpTT05fQW55IH0gICAgICAgICAgICAgZnJvbSBcIi4vQ19TYXZlSW5mb1wiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBKU09OX1JhbmdlIGV4dGVuZHMgSlNPTl9Bbnkge1xyXG4gICAgbWluPzogICBKU09OX1BvaW50LCBcclxuICAgIG1heD86ICAgSlNPTl9Qb2ludCwgXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBDX1JhbmdlIHtcclxuICAgIHByb3RlY3RlZCBtaW46IENfUG9pbnQ7XHJcbiAgICBwcm90ZWN0ZWQgbWF4OiBDX1BvaW50O1xyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHAxOiBDX1BvaW50LCBwMjogQ19Qb2ludCkge1xyXG4gICAgICAgIHRoaXMubWluICA9IG5ldyBDX1BvaW50KDAsIDAsIDApO1xyXG4gICAgICAgIHRoaXMubWF4ICA9IG5ldyBDX1BvaW50KDAsIDAsIDApO1xyXG4gICAgICAgIHRoaXMuX2luaXQocDEsIHAyKTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBfaW5pdChwMTogQ19Qb2ludCwgcDI6IENfUG9pbnQpOiBDX1JhbmdlIHtcclxuICAgICAgICBjb25zdCBtaW5feCA9IF9taW4oW3AxLngsIHAyLnhdKTtcclxuICAgICAgICBjb25zdCBtYXhfeCA9IF9tYXgoW3AxLngsIHAyLnhdKTtcclxuXHJcbiAgICAgICAgY29uc3QgbWluX3kgPSBfbWluKFtwMS55LCBwMi55XSk7XHJcbiAgICAgICAgY29uc3QgbWF4X3kgPSBfbWF4KFtwMS55LCBwMi55XSk7XHJcblxyXG4gICAgICAgIGNvbnN0IG1pbl96ID0gX21pbihbcDEueiwgcDIuel0pO1xyXG4gICAgICAgIGNvbnN0IG1heF96ID0gX21heChbcDEueiwgcDIuel0pO1xyXG5cclxuICAgICAgICB0aGlzLm1pbiAgPSBuZXcgQ19Qb2ludChtaW5feCwgbWluX3ksIG1pbl96KTtcclxuICAgICAgICB0aGlzLm1heCAgPSBuZXcgQ19Qb2ludChtYXhfeCwgbWF4X3ksIG1heF96KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHdpdGhpbihhOiBDX1JhbmdlfENfUG9pbnR8bnVtYmVyLCB5PzogbnVtYmVyLCB6PzogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBhID09PSBcIm51bWJlclwiICYmIHR5cGVvZiB5ID09PSBcIm51bWJlclwiICYmIHR5cGVvZiB6ID09PSBcIm51bWJlclwiKSB7IFxyXG4gICAgICAgICAgICBpZiAoIGEgPCB0aGlzLm1pbi54IHx8IGEgPiB0aGlzLm1heC54ICkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAoIHkgPCB0aGlzLm1pbi55IHx8IHkgPiB0aGlzLm1heC55ICkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAoIHogPCB0aGlzLm1pbi56IHx8IHogPiB0aGlzLm1heC56ICkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiBhID09PSBcIm9iamVjdFwiICYmIGEgaW5zdGFuY2VvZiBDX1BvaW50KSB7IFxyXG4gICAgICAgICAgICBjb25zdCBwID0gYSBhcyBDX1BvaW50O1xyXG4gICAgICAgICAgICBpZiAoIHAueCA8IHRoaXMubWluLnggfHwgcC54ID4gdGhpcy5tYXgueCApIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKCBwLnkgPCB0aGlzLm1pbi55IHx8IHAueSA+IHRoaXMubWF4LnkgKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmICggcC56IDwgdGhpcy5taW4ueiB8fCBwLnogPiB0aGlzLm1heC56ICkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiBhID09PSBcIm9iamVjdFwiICYmIGEgaW5zdGFuY2VvZiBDX1JhbmdlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHAgPSBhIGFzIENfUmFuZ2U7XHJcbiAgICAgICAgICAgIGlmICggcC5taW5feCgpIDwgdGhpcy5taW4ueCB8fCBwLm1heF94KCkgPiB0aGlzLm1heC54ICkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAoIHAubWluX3koKSA8IHRoaXMubWluLnkgfHwgcC5tYXhfeSgpID4gdGhpcy5tYXgueSApIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKCBwLm1pbl96KCkgPCB0aGlzLm1pbi56IHx8IHAubWF4X3ooKSA+IHRoaXMubWF4LnogKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgbWluX3goKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMubWluLng7fVxyXG4gICAgcHVibGljIG1heF94KCk6IG51bWJlciB7IHJldHVybiB0aGlzLm1heC54O31cclxuICAgIHB1YmxpYyBtaW5feSgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5taW4ueTt9XHJcbiAgICBwdWJsaWMgbWF4X3koKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMubWF4Lnk7fVxyXG4gICAgcHVibGljIG1pbl96KCk6IG51bWJlciB7IHJldHVybiB0aGlzLm1pbi56O31cclxuICAgIHB1YmxpYyBtYXhfeigpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5tYXguejt9XHJcbiAgICBwdWJsaWMgc2l6ZV94KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubWF4LnggLSB0aGlzLm1pbi54ICsgMTtcclxuICAgIH0gXHJcbiAgICBwdWJsaWMgc2l6ZV95KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubWF4LnkgLSB0aGlzLm1pbi55ICsgMTtcclxuICAgIH0gXHJcbiAgICBwdWJsaWMgc2l6ZV96KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubWF4LnogLSB0aGlzLm1pbi56ICsgMTtcclxuICAgIH0gXHJcbiAgICBwdWJsaWMgZG9fYWxsX3h5eihmbjogKHg6IG51bWJlciwgeTogbnVtYmVyLCB6OiBudW1iZXIpID0+IGJvb2xlYW4pIHtcclxuICAgICAgICBmb3IgKHZhciB6ID0gdGhpcy5taW4uejsgeiA8PSB0aGlzLm1heC56OyB6KysgKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIHkgPSB0aGlzLm1pbi55OyB5IDw9IHRoaXMubWF4Lnk7IHkrKyApIHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIHggPSB0aGlzLm1pbi54OyB5IDw9IHRoaXMubWF4Lng7IHgrKyApIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWZuKHgsIHksIHopKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZG9fYWxsX3AoZm46IChwOiBDX1BvaW50KSA9PiBib29sZWFuKSB7XHJcbiAgICAgICAgZm9yICh2YXIgeiA9IHRoaXMubWluLno7IHogPD0gdGhpcy5tYXguejsgeisrICkge1xyXG4gICAgICAgICAgICBmb3IgKHZhciB5ID0gdGhpcy5taW4ueTsgeSA8PSB0aGlzLm1heC55OyB5KysgKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciB4ID0gdGhpcy5taW4ueDsgeSA8PSB0aGlzLm1heC54OyB4KysgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFmbihuZXcgQ19Qb2ludCh4LCB5LCB6KSkpIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBlbmNvZGUoKTogSlNPTl9SYW5nZSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbWluOiB0aGlzLm1pbi5lbmNvZGUoKSxcclxuICAgICAgICAgICAgbWF4OiB0aGlzLm1pbi5lbmNvZGUoKSxcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZGVjb2RlKGo6IEpTT05fUmFuZ2UpOiBDX1JhbmdlIHtcclxuICAgICAgICBpZiAoaiA9PT0gdW5kZWZpbmVkKSAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgaWYgKGoubWluID09PSB1bmRlZmluZWQpIHJldHVybiB0aGlzO1xyXG4gICAgICAgIGlmIChqLm1heCA9PT0gdW5kZWZpbmVkKSByZXR1cm4gdGhpcztcclxuICAgICAgICBjb25zdCBwMSA9IG5ldyBDX1BvaW50KGoubWluKTtcclxuICAgICAgICBjb25zdCBwMiA9IG5ldyBDX1BvaW50KGoubWF4KTtcclxuICAgICAgICByZXR1cm4gdGhpcy5faW5pdChwMSwgcDIpO1xyXG4gICAgfVxyXG59XHJcblxyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuXHJcbmltcG9ydCB7IENfTWF6ZSwgSlNPTl9NYXplLCBhbGVydF9tYXplX2luZm8gIH0gIGZyb20gXCIuL0NfTWF6ZVwiO1xyXG5pbXBvcnQgeyBDX0d1aWxkLCBKU09OX0d1aWxkLCBhbGVydF9ndWxkX2luZm8gfSBmcm9tIFwiLi9DX0d1aWxkXCI7XHJcbmltcG9ydCB7IENfTW92YWJsZVBvaW50LCBKU09OX01vdmFibGVQb2ludCwgYWxlcnRfbXZwdF9pbmZvIH0gZnJvbSBcIi4vQ19Nb3ZhYmxlUG9pbnRcIjtcclxuaW1wb3J0IHsgQ19UZWFtLCBKU09OX1RlYW0sIGFsZXJ0X3RlYW1faW5mbyAgfSAgZnJvbSBcIi4vQ19UZWFtXCI7XHJcbmltcG9ydCB7IENfU2F2ZUluZm8sIElfSlNPTiwgSlNPTl9BbnksIEpTT05fU2F2ZUluZm8gfSBmcm9tIFwiLi9DX1NhdmVJbmZvXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEpTT05fU2F2ZURhdGEgZXh0ZW5kcyBKU09OX1NhdmVJbmZvIHtcclxuICAgIHNhdmVfaWQ/OiAgIG51bWJlcixcclxuICAgIHBsYXllcl9pZD86IG51bWJlciwgXHJcbiAgICB1bmlxX25vPzogICBudW1iZXIsXHJcbiAgICB0aXRsZT86ICAgICBzdHJpbmcsXHJcbiAgICBkZXRhaWw/OiAgICBzdHJpbmcsXHJcbiAgICBwb2ludD86ICAgICBzdHJpbmcsXHJcbiAgICBhdXRvX21vZGU/OiBzdHJpbmcsXHJcbiAgICBpc19hY3RpdmU/OiBzdHJpbmcsXHJcbiAgICBpc19kZWxldGU/OiBzdHJpbmcsXHJcbiAgICBzYXZlX3RpbWU/OiBzdHJpbmcsXHJcblxyXG4gICAgYWxsX212cHQ/OiAgSlNPTl9Nb3ZhYmxlUG9pbnRbXSxcclxuICAgIGFsbF9tYXplPzogIEpTT05fTWF6ZVtdLFxyXG4gICAgYWxsX3RlYW0/OiAgSlNPTl9UZWFtW10sXHJcbiAgICBhbGxfZ3VsZD86ICBKU09OX0d1aWxkW10sXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhbGVydF9zYXZlX2luZm8oYTogSlNPTl9TYXZlRGF0YXx1bmRlZmluZWQpOiB2b2lkIHtcclxuICAgIGlmIChhID09PSB1bmRlZmluZWQpIHJldHVybjtcclxuICAgIGFsZXJ0KFwiU2F2ZSBJbmZvOlwiIFxyXG4gICAgICAgICsgXCJcXG5zYXZlX2lkOiAgICBcIiArIChhLnNhdmVfaWQgICA/PyAnPycpXHJcbiAgICAgICAgKyBcIlxcbnBsYXllcl9pZDogIFwiICsgKGEucGxheWVyX2lkID8/ICc/JylcclxuICAgICAgICArIFwiXFxudW5pcV9ubzogICAgXCIgKyAoYS51bmlxX25vICAgPz8gJz8nKVxyXG4gICAgICAgICsgXCJcXG50aXRsZTogICAgICBcIiArIChhLnRpdGxlICAgICA/PyAnPycpXHJcbiAgICAgICAgKyBcIlxcbmRldGFpbDogICAgIFwiICsgKGEuZGV0YWlsICAgID8/ICc/JylcclxuICAgICAgICArIFwiXFxucG9pbnQ6ICAgICAgXCIgKyAoYS5wb2ludCAgICAgPz8gJz8nKVxyXG4gICAgICAgICsgXCJcXG5hdXRvX21vZGU6ICBcIiArIChhLmF1dG9fbW9kZSA/PyAnPycpXHJcbiAgICAgICAgKyBcIlxcbmlzX2FjdGl2ZTogIFwiICsgKGEuaXNfYWN0aXZlID8/ICc/JylcclxuICAgICAgICArIFwiXFxuaXNfZGVsZXRlOiAgXCIgKyAoYS5pc19kZWxldGUgPz8gJz8nKVxyXG4gICAgICAgICsgXCJcXG5tdnB0X2NvdW50OiBcIiArIChhLmFsbF9tdnB0Py5sZW5ndGggPz8gJz8nKVxyXG4gICAgICAgICsgXCJcXG5tYXplX2NvdW50OiBcIiArIChhLmFsbF9tYXplPy5sZW5ndGggPz8gJz8nKVxyXG4gICAgICAgICsgXCJcXG5ndWxkX2NvdW50OiBcIiArIChhLmFsbF9ndWxkPy5sZW5ndGggPz8gJz8nKVxyXG4gICAgICAgICsgXCJcXG50ZWFtX2NvdW50OiBcIiArIChhLmFsbF90ZWFtPy5sZW5ndGggPz8gJz8nKVxyXG4gICAgICAgICsgXCJcXG5cIlxyXG4gICAgKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFsZXJ0X3NhdmVfZGV0YWlsKGE6IEpTT05fU2F2ZURhdGF8dW5kZWZpbmVkKTogdm9pZCB7XHJcbiAgICBpZiAoYSA9PT0gdW5kZWZpbmVkKSByZXR1cm47XHJcblxyXG4gICAgdHJ5IHsgXHJcbi8vICAgICAgICBhbGVydChcIlNhdmUgRGV0YWlsKG12cHQpOlwiKTtcclxuICAgICAgICBmb3IgKGNvbnN0IG12cHQgb2YgYS5hbGxfbXZwdD8/W10pIGFsZXJ0X212cHRfaW5mbyhtdnB0KTtcclxuICAgIH0gY2F0Y2ggKGVycikge2FsZXJ0KCdhbGVydCBtdnB0IGVycm9yOiAnICsgZXJyKX1cclxuXHJcbiAgICB0cnkgeyBcclxuLy8gICAgICAgIGFsZXJ0KFwiU2F2ZSBEZXRhaWwodGVhbSk6XCIpO1xyXG4gICAgICAgIGZvciAoY29uc3QgdGVhbSBvZiBhLmFsbF90ZWFtPz9bXSkgYWxlcnRfdGVhbV9pbmZvKHRlYW0pO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7YWxlcnQoJ2FsZXJ0IHRlYW0gZXJyb3I6ICcgKyBlcnIpfVxyXG5cclxuICAgIHRyeSB7IFxyXG4vLyAgICAgICAgYWxlcnQoXCJTYXZlIERldGFpbChtYXplKTpcIik7XHJcbiAgICAgICAgZm9yIChjb25zdCBtYXplIG9mIGEuYWxsX21hemU/P1tdKSBhbGVydF9tYXplX2luZm8obWF6ZSk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHthbGVydCgnYWxlcnQgbWF6ZSBlcnJvcjogJyArIGVycil9XHJcblxyXG4gICAgdHJ5IHsgXHJcbi8vICAgICAgICBhbGVydChcIlNhdmUgRGV0YWlsKGd1bGQpOlwiKTtcclxuICAgICAgICBmb3IgKGNvbnN0IGd1bGQgb2YgYS5hbGxfZ3VsZD8/W10pIGFsZXJ0X2d1bGRfaW5mbyhndWxkKTtcclxuICAgIH0gY2F0Y2ggKGVycikge2FsZXJ0KCdhbGVydCBndWxkIGVycm9yOiAnICsgZXJyKX1cclxufVxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBDX1NhdmVEYXRhIGV4dGVuZHMgQ19TYXZlSW5mbyBpbXBsZW1lbnRzIElfSlNPTiB7XHJcblxyXG4vKlxyXG4gICAgcHVibGljIHNhdmVfaWQ6ICAgbnVtYmVyO1xyXG4gICAgcHVibGljIHBsYXllcl9pZDogbnVtYmVyOyBcclxuICAgIHB1YmxpYyB1bmlxX25vOiAgIG51bWJlcjtcclxuICAgIHB1YmxpYyB0aXRsZTogICAgIHN0cmluZztcclxuICAgIHB1YmxpYyBkZXRhaWw6ICAgIHN0cmluZztcclxuICAgIHB1YmxpYyBwb2ludDogICAgIHN0cmluZztcclxuICAgIHB1YmxpYyBhdXRvX21vZGU6IGJvb2xlYW47XHJcbiAgICBwdWJsaWMgaXNfYWN0aXZlOiBib29sZWFuO1xyXG4gICAgcHVibGljIGlzX2RlbGV0ZTogYm9vbGVhbjtcclxuICAgIHB1YmxpYyBzYXZlX3RpbWU6IERhdGU7XHJcbiAgICBwdWJsaWMgbXlwb3M6ICAgICBDX01vdmFibGVQb2ludDtcclxuKi9cclxuXHJcbiAgICBwdWJsaWMgYWxsX212cHQ6ICB7W3VpZDogc3RyaW5nXTogQ19Nb3ZhYmxlUG9pbnR9O1xyXG4gICAgcHVibGljIGFsbF9tYXplOiAge1t1aWQ6IHN0cmluZ106IENfTWF6ZX07XHJcbiAgICBwdWJsaWMgYWxsX3RlYW06ICB7W3VpZDogc3RyaW5nXTogQ19UZWFtfTtcclxuICAgIHB1YmxpYyBhbGxfZ3VsZDogIHtbdWlkOiBzdHJpbmddOiBDX0d1aWxkfTtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoYT86IEpTT05fU2F2ZURhdGEpIHtcclxuICAgICAgICBzdXBlcihhKTtcclxuXHJcbiAgICAgICAgdGhpcy5hbGxfbXZwdCAgPSB7fTtcclxuICAgICAgICB0aGlzLmFsbF9tYXplICA9IHt9O1xyXG4gICAgICAgIHRoaXMuYWxsX3RlYW0gID0ge31cclxuICAgICAgICB0aGlzLmFsbF9ndWxkICA9IHt9O1xyXG5cclxuICAgICAgICBpZiAoYSAhPT0gdW5kZWZpbmVkKSB0aGlzLmRlY29kZShhKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIG5ldyhhPzogSlNPTl9TYXZlRGF0YSk6IENfU2F2ZURhdGEge1xyXG4gICAgICAgIHJldHVybiBuZXcgQ19TYXZlRGF0YShhKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZW5jb2RlKCk6IEpTT05fU2F2ZURhdGEge1xyXG4gICAgICAgIGxldCBzYXZlX2RhdGU6IHN0cmluZztcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCBzYXZlX2RhdGEgICAgPSBzdXBlci5lbmNvZGUoKSBhcyBKU09OX1NhdmVEYXRhO1xyXG5cclxuICAgICAgICAgICAgc2F2ZV9kYXRhLmFsbF9tdnB0ID0gdGhpcy5fZW5jb2RlX2FsbF9kYXRhKHRoaXMuYWxsX212cHQpOyBcclxuICAgICAgICAgICAgc2F2ZV9kYXRhLmFsbF9tYXplID0gdGhpcy5fZW5jb2RlX2FsbF9kYXRhKHRoaXMuYWxsX21hemUpOyBcclxuICAgICAgICAgICAgc2F2ZV9kYXRhLmFsbF90ZWFtID0gdGhpcy5fZW5jb2RlX2FsbF9kYXRhKHRoaXMuYWxsX3RlYW0pOyBcclxuICAgICAgICAgICAgc2F2ZV9kYXRhLmFsbF9ndWxkID0gdGhpcy5fZW5jb2RlX2FsbF9kYXRhKHRoaXMuYWxsX2d1bGQpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHNhdmVfZGF0YTtcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgYWxlcnQoJ1NhdmVEYXRhIEVuY29kZSBFcnJvcjogJyArIGVycik7XHJcbiAgICAgICAgICAgIHJldHVybiB7fTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgX2VuY29kZV9hbGxfZGF0YShhbGxfZGF0YToge1t1aWQ6c3RyaW5nXTpJX0pTT059KTogSlNPTl9BbnlbXSB7XHJcbiAgICAgICAgY29uc3QgYWxsX0pTT046IEpTT05fQW55W10gPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpIGluIGFsbF9kYXRhKSBhbGxfSlNPTi5wdXNoKGFsbF9kYXRhW2ldLmVuY29kZSgpKTtcclxuICAgICAgICByZXR1cm4gYWxsX0pTT047XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRlY29kZShzOiBKU09OX1NhdmVEYXRhKTogQ19TYXZlRGF0YSB7XHJcbiAgICAgICAgc3VwZXIuZGVjb2RlKHMpO1xyXG5cclxuICAgICAgICBpZiAocy5hbGxfbXZwdCAgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLmFsbF9tdnB0ID0ge307XHJcbiAgICAgICAgICAgIGZvciAoY29uc3QganNvbl9tdnB0IG9mIHMuYWxsX212cHQpIHtcclxuICAgICAgICAgICAgICAgICBjb25zdCBtdnB0ID0gKG5ldyBDX01vdmFibGVQb2ludCgpKS5kZWNvZGUoanNvbl9tdnB0KTsgXHJcbiAgICAgICAgICAgICAgICAgdGhpcy5hbGxfbXZwdFttdnB0LnVpZCgpXSA9IG12cHQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IFxyXG4gICAgICAgIGlmIChzLmFsbF9tYXplICAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWxsX21hemUgPSB7fTtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBqc29uX21hemUgb2Ygcy5hbGxfbWF6ZSkge1xyXG4gICAgICAgICAgICAgICAgIGNvbnN0IG1hemUgPSAobmV3IENfTWF6ZSgpKS5kZWNvZGUoanNvbl9tYXplKTsgXHJcbiAgICAgICAgICAgICAgICAgdGhpcy5hbGxfbWF6ZVttYXplLnVpZCgpXSA9IG1hemU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IFxyXG4gICAgICAgIGlmIChzLmFsbF90ZWFtICAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWxsX3RlYW0gPSB7fTtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBqc29uX3RlYW0gb2Ygcy5hbGxfdGVhbSkge1xyXG4gICAgICAgICAgICAgICAgIGNvbnN0IHRlYW0gPSAobmV3IENfVGVhbSgpKS5kZWNvZGUoanNvbl90ZWFtKTsgXHJcbiAgICAgICAgICAgICAgICAgdGhpcy5hbGxfdGVhbVt0ZWFtLnVpZCgpXSA9IHRlYW07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IFxyXG4gICAgICAgIGlmIChzLmFsbF9ndWxkICAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWxsX2d1bGQgPSB7fTtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBqc29uX2d1bGQgb2Ygcy5hbGxfZ3VsZCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZ3VsZCA9IChuZXcgQ19HdWlsZCgpKS5kZWNvZGUoanNvbl9ndWxkKTsgXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFsbF9ndWxkW2d1bGQudWlkKCldID0gZ3VsZDtcclxuICAgICAgICAgICB9XHJcbiAgICAgICAgfSBcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIGFsZXJ0KCk6IHZvaWQge1xyXG4gICAgICAgIGFsZXJ0KFwiU2F2ZSBJbmZvOlwiIFxyXG4gICAgICAgICAgICArIFwiXFxuc2F2ZV9pZDogICAgXCIgKyAodGhpcy5zYXZlX2lkICAgPz8gJz8nKVxyXG4gICAgICAgICAgICArIFwiXFxucGxheWVyX2lkOiAgXCIgKyAodGhpcy5wbGF5ZXJfaWQgPz8gJz8nKVxyXG4gICAgICAgICAgICArIFwiXFxudW5pcV9ubzogICAgXCIgKyAodGhpcy51bmlxX25vICAgPz8gJz8nKVxyXG4gICAgICAgICAgICArIFwiXFxudGl0bGU6ICAgICAgXCIgKyAodGhpcy50aXRsZSAgICAgPz8gJz8nKVxyXG4gICAgICAgICAgICArIFwiXFxuZGV0YWlsOiAgICAgXCIgKyAodGhpcy5kZXRhaWwgICAgPz8gJz8nKVxyXG4gICAgICAgICAgICArIFwiXFxucG9pbnQ6ICAgICAgXCIgKyAodGhpcy5wb2ludCAgICAgPz8gJz8nKVxyXG4gICAgICAgICAgICArIFwiXFxuYXV0b19tb2RlOiAgXCIgKyAodGhpcy5hdXRvX21vZGU/J1knOidOJylcclxuICAgICAgICAgICAgKyBcIlxcbmlzX2FjdGl2ZTogIFwiICsgKHRoaXMuaXNfYWN0aXZlPydZJzonTicpXHJcbiAgICAgICAgICAgICsgXCJcXG5pc19kZWxldGU6ICBcIiArICh0aGlzLmlzX2RlbGV0ZT8nWSc6J04nKVxyXG4gICAgICAgICAgICArIFwiXFxubXZwdF9jb3VudDogXCIgKyAodGhpcy5hbGxfbXZwdD8ubGVuZ3RoID8/ICc/JylcclxuICAgICAgICAgICAgKyBcIlxcbm1hemVfY291bnQ6IFwiICsgKHRoaXMuYWxsX21hemU/Lmxlbmd0aCA/PyAnPycpXHJcbiAgICAgICAgICAgICsgXCJcXG5ndWxkX2NvdW50OiBcIiArICh0aGlzLmFsbF9ndWxkPy5sZW5ndGggPz8gJz8nKVxyXG4gICAgICAgICAgICArIFwiXFxudGVhbV9jb3VudDogXCIgKyAodGhpcy5hbGxfdGVhbT8ubGVuZ3RoID8/ICc/JylcclxuICAgICAgICAgICAgKyBcIlxcblwiXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWxlcnRfZGV0YWlsKCk6IHZvaWQge1xyXG4gICAgICAgIHRyeSB7IFxyXG4vLyAgICAgICAgICAgIGFsZXJ0KFwiU2F2ZSBEZXRhaWwobXZwdCk6XCIpO1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGlpIGluIHRoaXMuYWxsX212cHQpIHRoaXMuYWxsX212cHRbaWldLmFsZXJ0KCk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7YWxlcnQoJ2FsZXJ0IG12cHQgZXJyb3I6ICcgKyBlcnIpfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB0cnkgeyBcclxuLy8gICAgICAgICAgICBhbGVydChcIlNhdmUgRGV0YWlsKHRlYW0pOlwiKTtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBpaSBpbiB0aGlzLmFsbF90ZWFtKSB0aGlzLmFsbF90ZWFtW2lpXS5hbGVydCgpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge2FsZXJ0KCdhbGVydCB0ZWFtIGVycm9yOiAnICsgZXJyKX1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgdHJ5IHsgXHJcbi8vICAgICAgICAgICAgYWxlcnQoXCJTYXZlIERldGFpbChtYXplKTpcIik7XHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgaWkgaW4gdGhpcy5hbGxfbWF6ZSkgdGhpcy5hbGxfbWF6ZVtpaV0uYWxlcnQoKTtcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHthbGVydCgnYWxlcnQgbWF6ZSBlcnJvcjogJyArIGVycil9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIHRyeSB7IFxyXG4vLyAgICAgICAgICAgIGFsZXJ0KFwiU2F2ZSBEZXRhaWwoZ3VsZCk6XCIpO1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGlpIGluIHRoaXMuYWxsX2d1bGQpIHRoaXMuYWxsX2d1bGRbaWldLmFsZXJ0KCk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7YWxlcnQoJ2FsZXJ0IGd1bGQgZXJyb3I6ICcgKyBlcnIpfVxyXG4gICAgICAgICAgICBcclxuICAgIH1cclxufVxyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuXHJcbmltcG9ydCB7IENfTW92YWJsZVBvaW50LCBKU09OX01vdmFibGVQb2ludCB9IGZyb20gXCIuL0NfTW92YWJsZVBvaW50XCI7XHJcblxyXG4vLyDjgrXjg7zjg5Djg7zlgbTjgajjgoTjgorjgajjgorjgZnjgotKU09O5b2i5byP44OH44O844K/44Gu44OG44Oz44OX44Os44O844OIXHJcbmV4cG9ydCBpbnRlcmZhY2UgSlNPTl9Bbnkge1xyXG4gICAgW2tleTogc3RyaW5nXTogYW55XHJcbn1cclxuXHJcbi8vIOOCteODvOODkOODvOWBtOOBqOOChOOCiuOBqOOCiuOBmeOCi+OCr+ODqeOCueOBq+W/heimgeOBquODoeOCveODg+ODiVxyXG5leHBvcnQgaW50ZXJmYWNlIElfSlNPTiB7XHJcbiAgICBlbmNvZGU6ICgpPT5KU09OX0FueSxcclxuICAgIGRlY29kZTogKGo6SlNPTl9BbnkpPT5JX0pTT04sXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSV9KU09OX1VuaXEgZXh0ZW5kcyBJX0pTT04ge1xyXG4gICAgdWlkOiAoKT0+c3RyaW5nLFxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElfQWJzdHJhY3Qge1xyXG4gICAgbmV3T2JqOiAoaj86SlNPTl9BbnkpPT5JX0Fic3RyYWN0fHVuZGVmaW5lZCxcclxuICAgIGVuY29kZTogKCk9PkpTT05fQW55LFxyXG4vLyAgc3RhdGljIGRlY29kZTogKGo6SlNPTl9BbnkpPT5JX0pTT04sXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSV9KU09OX0NsYXNzIHtcclxuICAgIG5ldzogKGo/OiBKU09OX0FueSk9PklfSlNPTixcclxufVxyXG5cclxuLy8g44K144O844OQ44O85YG044Go44KE44KK5Y+W44KK44GZ44KL6Zqb44Gr6Ieq6Lqr44KS5paH5a2X5YiX5YyW44GZ44KL44Kv44Op44K544Gu44Oh44K944OD44OJXHJcbmV4cG9ydCBpbnRlcmZhY2UgSV9KU09OVmFsdWUgZXh0ZW5kcyBJX0pTT057XHJcbiAgICBmcm9tSlNPTjogKCk9PnZvaWQsXHJcbiAgICB0b0pTT046ICAgKCk9PnZvaWQsXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSlNPTl9TYXZlSW5mbyBleHRlbmRzIEpTT05fQW55IHtcclxuICAgIHNhdmVfaWQ/OiAgIG51bWJlcixcclxuICAgIHBsYXllcl9pZD86IG51bWJlciwgXHJcbiAgICB1bmlxX25vPzogICBudW1iZXIsXHJcbiAgICB0aXRsZT86ICAgICBzdHJpbmcsXHJcbiAgICBkZXRhaWw/OiAgICBzdHJpbmcsXHJcbiAgICBwb2ludD86ICAgICBzdHJpbmcsXHJcbiAgICBhdXRvX21vZGU/OiBzdHJpbmcsXHJcbiAgICBpc19hY3RpdmU/OiBzdHJpbmcsXHJcbiAgICBpc19kZWxldGU/OiBzdHJpbmcsXHJcbiAgICBzYXZlX3RpbWU/OiBzdHJpbmcsXHJcbiAgICBteXBvcz86ICAgICBKU09OX01vdmFibGVQb2ludCxcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFsZXJ0X3NhdmVpbmZvX2luZm8oYTogSlNPTl9TYXZlSW5mb3x1bmRlZmluZWQpOiB2b2lkIHtcclxuICAgIGlmIChhID09PSB1bmRlZmluZWQpIHJldHVybjtcclxuICAgIGFsZXJ0KFwiU2F2ZSBJbmZvOlwiIFxyXG4gICAgICAgICsgXCJcXG5zYXZlX2lkOiAgICBcIiArIChhLnNhdmVfaWQgICA/PyAnPycpXHJcbiAgICAgICAgKyBcIlxcbnBsYXllcl9pZDogIFwiICsgKGEucGxheWVyX2lkID8/ICc/JylcclxuICAgICAgICArIFwiXFxudW5pcV9ubzogICAgXCIgKyAoYS51bmlxX25vICAgPz8gJz8nKVxyXG4gICAgICAgICsgXCJcXG50aXRsZTogICAgICBcIiArIChhLnRpdGxlICAgICA/PyAnPycpXHJcbiAgICAgICAgKyBcIlxcbmRldGFpbDogICAgIFwiICsgKGEuZGV0YWlsICAgID8/ICc/JylcclxuICAgICAgICArIFwiXFxucG9pbnQ6ICAgICAgXCIgKyAoYS5wb2ludCAgICAgPz8gJz8nKVxyXG4gICAgICAgICsgXCJcXG5hdXRvX21vZGU6ICBcIiArIChhLmF1dG9fbW9kZSA/PyAnPycpXHJcbiAgICAgICAgKyBcIlxcbmlzX2FjdGl2ZTogIFwiICsgKGEuaXNfYWN0aXZlID8/ICc/JylcclxuICAgICAgICArIFwiXFxuaXNfZGVsZXRlOiAgXCIgKyAoYS5pc19kZWxldGUgPz8gJz8nKVxyXG4gICAgICAgICsgXCJcXG5zYXZlX3RpbWU6ICBcIiArIChhLnNhdmVfdGltZSA/PyAnPycpXHJcbiAgICAgICAgKyBcIlxcbm15dXJsOiAgICAgIFwiICsgKGEubXlwb3M/LmN1cl91cmwgICA/PyAnPycpXHJcbiAgICAgICAgKyBcIlxcbnRlYW1fdWlkOiAgIFwiICsgKGEubXlwb3M/LnRlYW1fdWlkICA/PyAnPycpXHJcbiAgICAgICAgKyBcIlxcbmxvY19raW5kOiAgIFwiICsgKGEubXlwb3M/LmtpbmQgICAgICA/PyAnPycpXHJcbiAgICAgICAgKyBcIlxcbmxvY19uYW1lOiAgIFwiICsgKGEubXlwb3M/Lm5hbWUgICAgICA/PyAnPycpXHJcbiAgICAgICAgKyBcIlxcbmxvY191aWQ6ICAgIFwiICsgKGEubXlwb3M/LmxvY191aWQgICA/PyAnPycpXHJcbiAgICAgICAgKyBcIlxcblwiXHJcbiAgICApO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQ19TYXZlSW5mbyBpbXBsZW1lbnRzIElfSlNPTiB7XHJcbiAgICBwdWJsaWMgc2F2ZV9pZDogICBudW1iZXI7XHJcbiAgICBwdWJsaWMgcGxheWVyX2lkOiBudW1iZXI7IFxyXG4gICAgcHVibGljIHVuaXFfbm86ICAgbnVtYmVyO1xyXG4gICAgcHVibGljIHRpdGxlOiAgICAgc3RyaW5nO1xyXG4gICAgcHVibGljIGRldGFpbDogICAgc3RyaW5nO1xyXG4gICAgcHVibGljIHBvaW50OiAgICAgc3RyaW5nO1xyXG4gICAgcHVibGljIGF1dG9fbW9kZTogYm9vbGVhbjtcclxuICAgIHB1YmxpYyBpc19hY3RpdmU6IGJvb2xlYW47XHJcbiAgICBwdWJsaWMgaXNfZGVsZXRlOiBib29sZWFuO1xyXG4gICAgcHVibGljIHNhdmVfdGltZTogRGF0ZTtcclxuICAgIHB1YmxpYyBteXBvczogICAgIENfTW92YWJsZVBvaW50O1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihhPzogSlNPTl9TYXZlSW5mbykge1xyXG4gICAgICAgIHRoaXMuc2F2ZV9pZCAgID0gLTE7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJfaWQgPSAtMTsgXHJcbiAgICAgICAgdGhpcy51bmlxX25vICAgPSAtMTtcclxuICAgICAgICB0aGlzLnRpdGxlICAgICA9ICcnO1xyXG4gICAgICAgIHRoaXMuZGV0YWlsICAgID0gJyc7XHJcbiAgICAgICAgdGhpcy5wb2ludCAgICAgPSAnJztcclxuICAgICAgICB0aGlzLmF1dG9fbW9kZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaXNfYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmlzX2RlbGV0ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc2F2ZV90aW1lID0gbmV3IERhdGUoKTtcclxuXHJcbiAgICAgICAgdGhpcy5teXBvcyAgICAgPSBuZXcgQ19Nb3ZhYmxlUG9pbnQoKTtcclxuXHJcbiAgICAgICAgaWYgKGEgIT09IHVuZGVmaW5lZCkgdGhpcy5kZWNvZGUoYSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBuZXcoYT86IEpTT05fU2F2ZUluZm8pOiBDX1NhdmVJbmZvIHtcclxuICAgICAgICByZXR1cm4gbmV3IENfU2F2ZUluZm8oYSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGVuY29kZSgpOiBKU09OX1NhdmVJbmZvIHtcclxuICAgICAgICBsZXQgc2F2ZV9kYXRlOiBzdHJpbmc7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgc2F2ZV9kYXRlID0gdGhpcy5zYXZlX3RpbWUudG9JU09TdHJpbmcoKTtcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgc2F2ZV9kYXRlID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHNhdmVfaWQ6ICAgdGhpcy5zYXZlX2lkLCBcclxuICAgICAgICAgICAgICAgIHBsYXllcl9pZDogdGhpcy5wbGF5ZXJfaWQsICBcclxuICAgICAgICAgICAgICAgIHVuaXFfbm86ICAgdGhpcy51bmlxX25vLCBcclxuICAgICAgICAgICAgICAgIHRpdGxlOiAgICAgdGhpcy50aXRsZSwgXHJcbiAgICAgICAgICAgICAgICBkZXRhaWw6ICAgIHRoaXMuZGV0YWlsLCBcclxuICAgICAgICAgICAgICAgIHBvaW50OiAgICAgdGhpcy5wb2ludCwgXHJcbiAgICAgICAgICAgICAgICBhdXRvX21vZGU6IHRoaXMuYXV0b19tb2RlID8gJzEnIDogJzAnLCBcclxuICAgICAgICAgICAgICAgIGlzX2FjdGl2ZTogdGhpcy5pc19hY3RpdmUgPyAnMScgOiAnMCcsIFxyXG4gICAgICAgICAgICAgICAgaXNfZGVsZXRlOiB0aGlzLmlzX2RlbGV0ZSA/ICcxJyA6ICcwJywgXHJcbiAgICAgICAgICAgICAgICBzYXZlX3RpbWU6IHNhdmVfZGF0ZSwgXHJcbiAgICAgICAgICAgICAgICBteXBvczogICAgIHRoaXMubXlwb3MuZW5jb2RlKCksXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgYWxlcnQoJ1NhdmVEYXRhIEVuY29kZSBFcnJvcjogJyArIGVycik7XHJcbiAgICAgICAgICAgIHJldHVybiB7fTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRlY29kZShzOiBKU09OX1NhdmVJbmZvKTogQ19TYXZlSW5mbyB7XHJcbiAgICAgICAgdGhpcy5zYXZlX2lkICAgPSBzLnNhdmVfaWQgICA/PyB0aGlzLnNhdmVfaWQ7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXJfaWQgPSBzLnBsYXllcl9pZCA/PyB0aGlzLnBsYXllcl9pZDsgXHJcbiAgICAgICAgdGhpcy51bmlxX25vICAgPSBzLnVuaXFfbm8gICA/PyB0aGlzLnVuaXFfbm87XHJcbiAgICAgICAgdGhpcy50aXRsZSAgICAgPSBzLnRpdGxlICAgICA/PyB0aGlzLnRpdGxlO1xyXG4gICAgICAgIHRoaXMuZGV0YWlsICAgID0gcy5kZXRhaWwgICAgPz8gdGhpcy5kZXRhaWw7XHJcbiAgICAgICAgdGhpcy5wb2ludCAgICAgPSBzLnBvaW50ICAgICA/PyB0aGlzLnBvaW50O1xyXG4gICAgICAgIGlmIChzLmF1dG9fbW9kZSA9PT0gdW5kZWZpbmVkKSB0aGlzLmF1dG9fbW9kZTsgZWxzZSBzLmF1dG9fbW9kZSAhPT0gJzAnID8gdHJ1ZSA6IGZhbHNlO1xyXG4gICAgICAgIGlmIChzLmlzX2FjdGl2ZSA9PT0gdW5kZWZpbmVkKSB0aGlzLmlzX2FjdGl2ZTsgZWxzZSBzLmlzX2FjdGl2ZSAhPT0gJzAnID8gdHJ1ZSA6IGZhbHNlO1xyXG4gICAgICAgIGlmIChzLmlzX2RlbGV0ZSA9PT0gdW5kZWZpbmVkKSB0aGlzLmlzX2RlbGV0ZTsgZWxzZSBzLmlzX2RlbGV0ZSAhPT0gJzAnID8gdHJ1ZSA6IGZhbHNlO1xyXG4gICAgICAgIGlmIChzLnNhdmVfdGltZSAhPT0gdW5kZWZpbmVkKSB0aGlzLnNhdmVfdGltZSA9IG5ldyBEYXRlKHMuc2F2ZV90aW1lKTsgXHJcblxyXG4gICAgICAgIGlmIChzLm15cG9zICAgICAhPT0gdW5kZWZpbmVkKSB0aGlzLm15cG9zLmRlY29kZShzLm15cG9zKTsgXHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgYWxlcnQoKTogdm9pZCB7XHJcbiAgICAgICAgYWxlcnQoXCJTYXZlSW5mbyBEQVRBOlwiIFxyXG4gICAgICAgICAgICArIFwiXFxuc2F2ZV9pZDogICAgXCIgKyAodGhpcy5zYXZlX2lkICAgPz8gJz8nKVxyXG4gICAgICAgICAgICArIFwiXFxucGxheWVyX2lkOiAgXCIgKyAodGhpcy5wbGF5ZXJfaWQgPz8gJz8nKVxyXG4gICAgICAgICAgICArIFwiXFxudW5pcV9ubzogICAgXCIgKyAodGhpcy51bmlxX25vICAgPz8gJz8nKVxyXG4gICAgICAgICAgICArIFwiXFxudGl0bGU6ICAgICAgXCIgKyAodGhpcy50aXRsZSAgICAgPz8gJz8nKVxyXG4gICAgICAgICAgICArIFwiXFxuZGV0YWlsOiAgICAgXCIgKyAodGhpcy5kZXRhaWwgICAgPz8gJz8nKVxyXG4gICAgICAgICAgICArIFwiXFxucG9pbnQ6ICAgICAgXCIgKyAodGhpcy5wb2ludCAgICAgPz8gJz8nKVxyXG4gICAgICAgICAgICArIFwiXFxuYXV0b19tb2RlOiAgXCIgKyAodGhpcy5hdXRvX21vZGU/J1knOidOJylcclxuICAgICAgICAgICAgKyBcIlxcbmlzX2FjdGl2ZTogIFwiICsgKHRoaXMuaXNfYWN0aXZlPydZJzonTicpXHJcbiAgICAgICAgICAgICsgXCJcXG5pc19kZWxldGU6ICBcIiArICh0aGlzLmlzX2RlbGV0ZT8nWSc6J04nKVxyXG4gICAgICAgICAgICArIFwiXFxubXl1cmw6ICAgICAgXCIgKyAodGhpcy5teXBvcy51cmwoKSAgICAgID8/ICc/JylcclxuICAgICAgICAgICAgKyBcIlxcbnRlYW1fdWlkOiAgIFwiICsgKHRoaXMubXlwb3MudGlkKCkgICAgICA/PyAnPycpXHJcbiAgICAgICAgICAgICsgXCJcXG5sb2Nfa2luZDogICBcIiArICh0aGlzLm15cG9zLmdldF9sY2tkKCkgPz8gJz8nKVxyXG4gICAgICAgICAgICArIFwiXFxubG9jX25hbWU6ICAgXCIgKyAodGhpcy5teXBvcy5nZXRfbmFtZSgpID8/ICc/JylcclxuICAgICAgICAgICAgKyBcIlxcbmxvY191aWQ6ICAgIFwiICsgKHRoaXMubXlwb3MuZ2V0X3VpZCgpICA/PyAnPycpXHJcbiAgICAgICAgICAgICsgXCJcXG5cIlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5pbXBvcnQgeyBDX1BvaW50IH0gICAgICAgICAgICAgICBmcm9tIFwiLi9DX1BvaW50XCI7XHJcbmltcG9ydCB7IENfUG9pbnREaXIgfSAgICAgICAgICAgIGZyb20gJy4vQ19Qb2ludERpcic7XHJcbmltcG9ydCB7IENfTW92YWJsZVBvaW50IH0gICAgICAgIGZyb20gXCIuL0NfTW92YWJsZVBvaW50XCI7XHJcbmltcG9ydCB7IENfV2Fsa2VyLCBKU09OX1dhbGtlciB9IGZyb20gXCIuL0NfV2Fsa2VyXCI7XHJcbmltcG9ydCB7IENfSGVybywgSlNPTl9IZXJvIH0gICAgIGZyb20gXCIuL0NfSGVyb1wiO1xyXG5pbXBvcnQgeyBJX01hemVPYmogfSAgICAgICAgICAgICBmcm9tIFwiLi9DX01hemVPYmpcIjtcclxuaW1wb3J0IHsgSlNPTl9BbnkgfSAgICAgICAgICAgICAgZnJvbSBcIi4vQ19TYXZlSW5mb1wiO1xyXG5pbXBvcnQgeyBDX0N1cnJlbnRUZWFtVmlldyB9ICAgICBmcm9tIFwiLi9DX1RlYW1WaWV3XCI7XHJcbmltcG9ydCB7IElfTWF6ZU9ialZpZXcsIEpTT05fTWF6ZU9ialZpZXcgfSAgZnJvbSBcIi4vQ19NYXplT2JqVmlld1wiO1xyXG5pbXBvcnQgeyBDX0dvb2QsICBUX0dvb2RLaW5kIH0gICBmcm9tIFwiLi9DX0dvb2RcIjtcclxuaW1wb3J0IHsgQ19Hb29kc0xpc3QsIEpTT05fR29vZHNMaXN0IH0gZnJvbSBcIi4vQ19Hb29kc0xpc3ROR1wiO1xyXG5pbXBvcnQgeyBfZ2V0X3V1aWQgfSAgICAgICAgICAgICBmcm9tIFwiLi4vZF91dGwvRl9SYW5kXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEpTT05fVGVhbSBleHRlbmRzIEpTT05fQW55IHtcclxuICAgIGlkPzogICAgICAgIG51bWJlciwgXHJcbiAgICB1bmlxX2lkPzogICBzdHJpbmcsIFxyXG4gICAgc2F2ZV9pZD86ICAgbnVtYmVyLCBcclxuICAgIG5hbWU/OiAgICAgIHN0cmluZywgXHJcbiAgICBsb2NhdGU/OiAgICBKU09OX1dhbGtlcixcclxuICAgIGdvbGQ/OiAgICAgIG51bWJlcixcclxuLy8gICAgZ29vZHM/OiAgICAgSlNPTl9Hb29kc0xpc3QsXHJcbiAgICBoZXJvZXM/OiAgICBKU09OX0hlcm9bXSwgXHJcbiAgICBtb3Rpb24/OiAgICBzdHJpbmcsXHJcbiAgICB2aWV3PzogICAgICBKU09OX01hemVPYmpWaWV3fHVuZGVmaW5lZCxcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFsZXJ0X3RlYW1faW5mbyhhOiBKU09OX1RlYW18dW5kZWZpbmVkKTogdm9pZCB7XHJcbiAgICBpZiAoYSA9PT0gdW5kZWZpbmVkKSByZXR1cm47XHJcbiAgICBhbGVydChcIlRlYW0gSW5mbzpcIiBcclxuICAgICAgICArIFwiXFxuaWQ6ICAgIFwiICAgICArIChhLmlkICAgICAgICA/PyAnPycpXHJcbiAgICAgICAgKyBcIlxcbnVuaXFfaWQ6ICBcIiAgKyAoYS51bmlxX2lkICAgPz8gJz8nKVxyXG4gICAgICAgICsgXCJcXG5uYW1lOiAgXCIgICAgICsgKGEubmFtZSAgICAgID8/ICc/JylcclxuICAgICAgICArIFwiXFxuc2F2ZV9pZDogXCIgICArIChhLnNhdmVfaWQgICA/PyAnPycpXHJcbiAgICAgICAgKyBcIlxcbnVybDogIFwiICAgICAgKyAoYS5sb2NhdGU/LmN1cl91cmwgICAgPz8gJz8nKVxyXG4gICAgICAgICsgXCJcXG5sY2tkOiBcIiAgICAgICsgKGEubG9jYXRlPy5raW5kICAgICAgID8/ICc/JylcclxuICAgICAgICArIFwiXFxubGNubTogXCIgICAgICArIChhLmxvY2F0ZT8ubmFtZSAgICAgICA/PyAnPycpXHJcbiAgICAgICAgKyBcIlxcbmxjaWQ6IFwiICAgICAgKyAoYS5sb2NhdGU/LmxvY191aWQgICAgPz8gJz8nKVxyXG4gICAgICAgICsgXCJcXG5jdXJfeDogXCIgICAgICsgKGEubG9jYXRlPy5sb2NfcG9zPy54ID8/ICc/JylcclxuICAgICAgICArIFwiXFxuY3VyX3k6IFwiICAgICArIChhLmxvY2F0ZT8ubG9jX3Bvcz8ueSA/PyAnPycpXHJcbiAgICAgICAgKyBcIlxcbmN1cl96OiBcIiAgICAgKyAoYS5sb2NhdGU/LmxvY19wb3M/LnogPz8gJz8nKVxyXG4gICAgICAgICsgXCJcXG5jdXJfZDogXCIgICAgICsgKGEubG9jYXRlPy5sb2NfcG9zPy5kID8/ICc/JylcclxuICAgICAgICArIFwiXFxuZ29sZDogXCIgICAgICArIChhLmdvbGQgICAgICA/PyAgMCApXHJcbi8vICAgICAgICArIFwiXFxuZ29vZHM6IFwiICAgICArIChPYmplY3Qua2V5cyhhLmdvb2RzPz9bXSkubGVuZ3RoKVxyXG4gICAgICAgICsgXCJcXG5oZXJvZXM6IFwiICAgICsgKGEuaGVyb2VzPy5sZW5ndGggPz8gJz8nKVxyXG4gICAgICAgICsgXCJcXG5cIlxyXG4gICAgKTtcclxuXHJcbi8vICAgIGlmIChhLmhlcm9lcyAhPT0gdW5kZWZpbmVkKSBhbGVydF9oZXJvZXNfaW5mbyhhLmhlcm9lcyk7XHJcbn1cclxuXHJcblxyXG5leHBvcnQgY2xhc3MgQ19UZWFtIGltcGxlbWVudHMgSV9NYXplT2JqIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgbmV3T2JqKGo/OiBKU09OX1RlYW0pOiBDX1RlYW0ge1xyXG4gICAgICAgIHJldHVybiBuZXcgQ19UZWFtKGopO1xyXG4gICAgfVxyXG4gICAgcHVibGljIG5ld09iaihqPzogSlNPTl9UZWFtKTogQ19UZWFtIHtyZXR1cm4gQ19UZWFtLm5ld09iaihqKTt9XHJcblxyXG4gICAgcHJvdGVjdGVkIG15X2lkOiAgICAgbnVtYmVyO1xyXG4gICAgcHJvdGVjdGVkIG15X25hbWU6ICAgc3RyaW5nO1xyXG4gICAgcHJvdGVjdGVkIHVuaXFfaWQ6ICAgc3RyaW5nO1xyXG4gICAgcHJvdGVjdGVkIHNhdmVfaWQ6ICAgbnVtYmVyO1xyXG4gICAgcHJvdGVjdGVkIHdhbGtlcjogICAgQ19XYWxrZXI7XHJcbiAgICBwcm90ZWN0ZWQgZ29sZDogICAgICBudW1iZXI7XHJcbi8vICAgIHByb3RlY3RlZCBnb29kczogICAgIENfR29vZHNMaXN0O1xyXG4gICAgcHJvdGVjdGVkIGhlcm9lczogICAge1t1aWQ6IHN0cmluZ106IENfSGVyb307XHJcblxyXG4gICAgcHJvdGVjdGVkIG15VmlldzogICAgSV9NYXplT2JqVmlld3x1bmRlZmluZWQ7XHJcbiAgICBwcm90ZWN0ZWQgaG9wZV9tb3Rpb246IHN0cmluZztcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3Ioaj86IEpTT05fVGVhbSkge1xyXG5cclxuICAgICAgICB0aGlzLm15X2lkICAgICA9ICAwO1xyXG4gICAgICAgIHRoaXMubXlfbmFtZSAgID0gJ05lbyBUZWFtPyc7XHJcbiAgICAgICAgdGhpcy51bmlxX2lkICAgPSAnbWFpX3RlYW0jJyArIF9nZXRfdXVpZCgpO1xyXG4gICAgICAgIHRoaXMuc2F2ZV9pZCAgID0gIDA7XHJcblxyXG4gICAgICAgIHRoaXMubXlWaWV3ID0gbmV3IENfQ3VycmVudFRlYW1WaWV3KHRoaXMpIGFzIElfTWF6ZU9ialZpZXc7XHJcbiAgICAgICAgdGhpcy53YWxrZXIgPSBuZXcgQ19XYWxrZXIoKTtcclxuICAgICAgICB0aGlzLndhbGtlci5zZXRfdGlkKHRoaXMudWlkKCkpO1xyXG5cclxuICAgICAgICB0aGlzLmdvbGQgICA9IDA7XHJcbi8vICAgICAgICB0aGlzLmdvb2RzICA9IG5ldyBDX0dvb2RzTGlzdCgpO1xyXG4gICAgICAgIHRoaXMuaGVyb2VzID0ge307XHJcbiAgICAgICAgdGhpcy5ob3BlX21vdGlvbiA9ICdOT1AnOyAgICBcclxuICAgICAgICBpZiAoaiAhPT0gdW5kZWZpbmVkKSB0aGlzLmRlY29kZShqKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXRfcHJwKGFyZyA6IEpTT05fVGVhbSkge1xyXG4gICAgICAgIHRoaXMuZGVjb2RlKGFyZyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVpZCgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy51bmlxX2lkfVxyXG5cclxuICAgIHB1YmxpYyB3aXRoaW4ocDogQ19Qb2ludCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGNvbnN0IGhlcmUgPSB0aGlzLndhbGtlcj8uZ2V0X3AoKTtcclxuICAgICAgICByZXR1cm4gaGVyZT8ud2l0aGluKHApID8/IGZhbHNlOyBcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdmlldygpOiAgSV9NYXplT2JqVmlld3x1bmRlZmluZWQge3JldHVybiB0aGlzLm15Vmlld31cclxuICAgIHB1YmxpYyB3YWxrKCk6ICBDX1dhbGtlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMud2Fsa2VyXHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBjYW5UaHJvdWdoKCk6IGJvb2xlYW4ge3JldHVybiB0cnVlfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgaHJlcygpOiAgQ19IZXJvW10ge1xyXG4gICAgICAgIGNvbnN0IGhyZXM6IENfSGVyb1tdID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaWkgaW4gdGhpcy5oZXJvZXMpIGhyZXMucHVzaCh0aGlzLmhlcm9lc1tpaV0pO1xyXG4gICAgICAgIHJldHVybiBocmVzO1xyXG4gICAgfSBcclxuICAgIHB1YmxpYyBjbGVhcl9ocmVzKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaGVyb2VzID0ge307XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgYWRkX2hlcm8oaGVybzogQ19IZXJvKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5oZXJvZXNbaGVyby51aWQoKV0gPSBoZXJvO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHJtdl9oZXJvKGhlcm86IENfSGVybyk6IHZvaWQge1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLmhlcm9lc1toZXJvLnVpZCgpXTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0X2xvYygpOiBDX01vdmFibGVQb2ludCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMud2Fsa2VyO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldF9sb2MobG9jOiBDX01vdmFibGVQb2ludCk6IHZvaWQge1xyXG4gICAgICAgICh0aGlzLndhbGtlciA/Pz0gbmV3IENfV2Fsa2VyKCkpLmRlY29kZShsb2MuZW5jb2RlKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRfcGQoKTogQ19Qb2ludERpciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMud2Fsa2VyLmdldF9wZCgpO1xyXG4gICAgfVxyXG5cclxuLypcclxuICAgIHB1YmxpYyBzdGF0aWMgZnJvbV9vYmpfdG9fc3RyaW5nKG9hOiBDX1RlYW0pOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShvYSwgbnVsbCwgXCJcXHRcIik7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc3RhdGljIGZyb21fb2JqQXJyYXlfdG9fc3RyaW5nKG9hYToge1t1aWQ6IHN0cmluZ106IENfVGVhbX0pOiBzdHJpbmcge1xyXG4gICAgICAgIGNvbnN0IG9hID0gW10gYXMgQ19UZWFtW107XHJcbiAgICAgICAgZm9yIChjb25zdCBpaSBpbiBvYWEpIG9hLnB1c2gob2FhW2lpXSk7XHJcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KG9hLCBudWxsLCBcIlxcdFwiKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzdGF0aWMgZnJvbV9zdHJpbmdfdG9fb2JqKHR4dDogc3RyaW5nKTogQ19UZWFtIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCBqICAgPSBKU09OLnBhcnNlKHR4dCkgYXMgQ19UZWFtW107XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgQ19UZWFtKGopO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IENfVGVhbSgpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc3RhdGljIGZyb21fc3RyaW5nX3RvX29iakFycmF5KHR4dDogc3RyaW5nKToge1t1aWQ6IHN0cmluZ106IENfVGVhbX0ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGogICA9IEpTT04ucGFyc2UodHh0KSBhcyBKU09OX1RlYW1bXTtcclxuICAgICAgICAgICAgY29uc3QgbXBhID0ge30gYXMge1tpZDogc3RyaW5nXTogQ19UZWFtfTtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBqaiBvZiBqKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBhYWEgPSBuZXcgQ19UZWFtKCkuZGVjb2RlKGpqKTtcclxuICAgICAgICAgICAgICAgIG1wYVthYWEudWlkKCldID0gYWFhO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBtcGE7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7fTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4qL1xyXG4gICAgXHJcbiAgICBwdWJsaWMgZW5jb2RlKCk6IEpTT05fVGVhbSB7XHJcbiAgICAgICAgdGhpcy5nZXRfbG9jKCk7IC8vIExvY2F0aW9u5oOF5aCx44KS5pyA5paw44Gr5pu05pawXHJcblxyXG4gICAgICAgIGNvbnN0IGpzb25faGVyb2VzOiBKU09OX0hlcm9bXSA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGlpIGluIHRoaXMuaGVyb2VzKSBqc29uX2hlcm9lcy5wdXNoKHRoaXMuaGVyb2VzW2lpXS5lbmNvZGUoKSk7ICBcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgaWQ6ICAgICAgICB0aGlzLm15X2lkLFxyXG4gICAgICAgICAgICBuYW1lOiAgICAgIHRoaXMubXlfbmFtZSxcclxuICAgICAgICAgICAgdW5pcV9pZDogICB0aGlzLnVuaXFfaWQsXHJcbiAgICAgICAgICAgIHNhdmVfaWQ6ICAgdGhpcy5zYXZlX2lkLFxyXG4gICAgICAgICAgICBsb2NhdGU6ICAgIHRoaXMud2Fsa2VyLmVuY29kZSgpLFxyXG4gICAgICAgICAgICBnb2xkOiAgICAgIHRoaXMuZ29sZCxcclxuLy8gICAgICAgICAgICBnb29kczogICAgIHRoaXMuZ29vZHMuZW5jb2RlKCksXHJcbiAgICAgICAgICAgIGhlcm9lczogICAganNvbl9oZXJvZXMsXHJcbiAgICAgICAgICAgIG1vdGlvbjogICAgdGhpcy5ob3BlX21vdGlvbixcclxuICAgICAgICAgICAgdmlldzogICAgICB0aGlzLm15Vmlldz8uZW5jb2RlKCkgPz8ge30sXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBkZWNvZGUoYTogSlNPTl9UZWFtfHVuZGVmaW5lZCk6IENfVGVhbSB7XHJcbiAgICAgICAgaWYgKGEgPT09IHVuZGVmaW5lZCkgIHJldHVybiB0aGlzO1xyXG5cclxuICAgICAgICBpZiAoYS5pZCAgICE9PSB1bmRlZmluZWQpICAgIHRoaXMubXlfaWQgICAgICAgPSBhLmlkO1xyXG4gICAgICAgIGlmIChhLm5hbWUgIT09IHVuZGVmaW5lZCkgICAgdGhpcy5teV9uYW1lICAgICA9IGEubmFtZTtcclxuICAgICAgICBpZiAoYS51bmlxX2lkICE9PSB1bmRlZmluZWQpIHRoaXMudW5pcV9pZCAgICAgPSBhLnVuaXFfaWQ7XHJcbiAgICAgICAgaWYgKGEuc2F2ZV9pZCAhPT0gdW5kZWZpbmVkKSB0aGlzLnNhdmVfaWQgICAgID0gYS5zYXZlX2lkO1xyXG4gICAgICAgIGlmIChhLm1vdGlvbiAhPT0gdW5kZWZpbmVkKSAgdGhpcy5ob3BlX21vdGlvbiA9IGEubW90aW9uO1xyXG5cclxuICAgICAgICBpZiAoYS5sb2NhdGUgIT09IHVuZGVmaW5lZCkgIHRoaXMud2Fsa2VyLmRlY29kZShhLmxvY2F0ZSk7XHJcbiAgICAgICAgaWYgKGEuZ29sZCAgICE9PSB1bmRlZmluZWQpICB0aGlzLmdvbGQgPSBhLmdvbGQ7XHJcbi8vICAgICAgICBpZiAoYS5nb29kcyAgIT09IHVuZGVmaW5lZCkgIHRoaXMuZ29vZHMuZGVjb2RlKGEuZ29vZHMpO1xyXG5cclxuICAgICAgICBpZiAoYS5oZXJvZXMgIT09IHVuZGVmaW5lZCkgIHtcclxuICAgICAgICAgICAgdGhpcy5oZXJvZXMgPSB7fTtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBqc29uX2hlcm8gb2YgYS5oZXJvZXMpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGhlcm8gPSBuZXcgQ19IZXJvKGpzb25faGVybyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhlcm9lc1toZXJvLnVpZCgpXSA9IGhlcm87XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbi8qXHJcbiAgICAgICAgaWYgKGEudmlldyAgICAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGlmIChPYmplY3Qua2V5cyhhLnZpZXcpLmxlbmd0aCA+IDApIHRoaXMubXlWaWV3ID0gQ19NYXplT2JqVmlldy5uZXdPYmooYS52aWV3KTsgXHJcbiAgICAgICAgICAgIGVsc2UgdGhpcy5teVZpZXcgPSBuZXcgQ19DdXJyZW50VGVhbVZpZXcodGhpcykgYXMgSV9NYXplT2JqVmlldzsgXHJcbiAgICAgICAgfVxyXG4qL1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHN0YXRpYyBlbmNvZGVfYWxsKGFsbF90ZWFtOiBDX1RlYW1bXSk6IEpTT05fVGVhbVtdIHtcclxuICAgICAgICBjb25zdCBhbGxfdGVhbV9kYXRhOiBKU09OX1RlYW1bXSA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IHRlYW0gb2YgYWxsX3RlYW0pIHtcclxuICAgICAgICAgICAgYWxsX3RlYW1fZGF0YS5wdXNoKHRlYW0uZW5jb2RlKCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYWxsX3RlYW1fZGF0YTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzdGF0aWMgZGVjb2RlX2FsbChhbGxfdGVhbV9kYXRhOiBKU09OX1RlYW1bXSk6IENfVGVhbVtdIHtcclxuICAgICAgICBjb25zdCBhbGxfdGVhbTogQ19UZWFtW10gPSBbXTtcclxuICAgICAgICBmb3IgKGxldCB0ZWFtX2RhdGEgb2YgYWxsX3RlYW1fZGF0YSkge1xyXG4gICAgICAgICAgICBhbGxfdGVhbS5wdXNoKChuZXcgQ19UZWFtKCkpLmRlY29kZSh0ZWFtX2RhdGEpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGFsbF90ZWFtO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgYWxlcnQoKTogdm9pZCB7XHJcbiAgICAgICAgYWxlcnQoXCJUZWFtIEluZm86XCIgXHJcbiAgICAgICAgICAgICsgXCJcXG5pZDogICAgXCIgICAgICsgKHRoaXMubXlfaWQgICAgICAgICAgICA/PyAnPycpXHJcbiAgICAgICAgICAgICsgXCJcXG51bmlxX2lkOiAgXCIgICsgKHRoaXMudW5pcV9pZCAgICAgICAgICA/PyAnPycpXHJcbiAgICAgICAgICAgICsgXCJcXG5uYW1lOiAgXCIgICAgICsgKHRoaXMubXlfbmFtZSAgICAgICAgICA/PyAnPycpXHJcbiAgICAgICAgICAgICsgXCJcXG5zYXZlX2lkOiBcIiAgICsgKHRoaXMuc2F2ZV9pZCAgICAgICAgICA/PyAnPycpXHJcbiAgICAgICAgICAgICsgXCJcXG51cmw6ICBcIiAgICAgICsgKHRoaXMud2Fsa2VyLnVybCgpICAgICA/PyAnPycpXHJcbiAgICAgICAgICAgICsgXCJcXG5sY2tkOiBcIiAgICAgICsgKHRoaXMud2Fsa2VyLmdldF9sY2tkX3N0cigpID8/ICc/JylcclxuICAgICAgICAgICAgKyBcIlxcbmxjbm06IFwiICAgICAgKyAodGhpcy53YWxrZXIuZ2V0X25hbWUoKSAgICAgPz8gJz8nKVxyXG4gICAgICAgICAgICArIFwiXFxubGNpZDogXCIgICAgICArICh0aGlzLndhbGtlci5nZXRfdWlkKCkgICAgICA/PyAnPycpXHJcbiAgICAgICAgICAgICsgXCJcXG5jdXJfeDogXCIgICAgICsgKHRoaXMud2Fsa2VyLmdldF9wKCkueCA/PyAnPycpXHJcbiAgICAgICAgICAgICsgXCJcXG5jdXJfeTogXCIgICAgICsgKHRoaXMud2Fsa2VyLmdldF9wKCkueSA/PyAnPycpXHJcbiAgICAgICAgICAgICsgXCJcXG5jdXJfejogXCIgICAgICsgKHRoaXMud2Fsa2VyLmdldF9wKCkueiA/PyAnPycpXHJcbiAgICAgICAgICAgICsgXCJcXG5jdXJfZDogXCIgICAgICsgKHRoaXMud2Fsa2VyLmdldF9kKCkgICA/PyAnPycpXHJcbiAgICAgICAgICAgICsgXCJcXG5nb2xkOiBcIiAgICAgICsgKE9iamVjdC5rZXlzKHRoaXMuZ29sZCA/PyB7fSkubGVuZ3RoKVxyXG4gICAgICAgICAgICArIFwiXFxuaGVyb2VzOiBcIiAgICArICh0aGlzLmhlcm9lcz8ubGVuZ3RoID8/ICc/JylcclxuICAgICAgICAgICAgKyBcIlxcblwiXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBhbGVydF9ocmVzKCk6IHZvaWQge1xyXG4vLyAgICAgICAgYWxlcnQoXCJUZWFtIEluZm86XCIpO1xyXG4gICAgICAgIGZvciAoY29uc3QgaWkgaW4gdGhpcy5oZXJvZXMpIHRoaXMuaGVyb2VzW2lpXS5hbGVydCgpO1xyXG4gICAgfVxyXG59XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5cclxuaW1wb3J0IHsgVF9EaXJlY3Rpb24gfSAgICAgICBmcm9tICcuL0NfUG9pbnREaXInO1xyXG5pbXBvcnQgeyBDX1RlYW0sIEpTT05fVGVhbSB9IGZyb20gXCIuL0NfVGVhbVwiO1xyXG5pbXBvcnQgeyBUX1dhbGwgfSAgICAgICAgICAgIGZyb20gXCIuLi9kX21kbC9DX1dhbGxcIjtcclxuaW1wb3J0IHsgSV9NYXplT2JqVmlldywgSlNPTl9NYXplT2JqVmlldywgVF9SZWN0IH0gIGZyb20gXCIuL0NfTWF6ZU9ialZpZXdcIjtcclxuaW1wb3J0IHsgQ19NYXplT2JqVmlldyB9IGZyb20gJy4uL2h0bWwvanMvbWFpX2d1bGQnO1xyXG5cclxuZXhwb3J0IGNsYXNzIENfQ3VycmVudFRlYW1WaWV3ICBpbXBsZW1lbnRzIElfTWF6ZU9ialZpZXcge1xyXG4gICAgcHVibGljICBzdGF0aWMgbmV3T2JqKGo/OiBKU09OX1RlYW0pOiBJX01hemVPYmpWaWV3IHtcclxuICAgICAgICBjb25zdCB0ZWFtID0gbmV3IENfVGVhbShqKTtcclxuICAgICAgICByZXR1cm4gbmV3IENfQ3VycmVudFRlYW1WaWV3KHRlYW0pO1xyXG4gICAgfVxyXG4gICAgcHVibGljICBuZXdPYmooaj86IEpTT05fVGVhbSk6IElfTWF6ZU9ialZpZXcge3JldHVybiBDX0N1cnJlbnRUZWFtVmlldy5uZXdPYmooail9XHJcblxyXG4gICAgcHJpdmF0ZSBteV90ZWFtOiBDX1RlYW07XHJcbiAgICBwcml2YXRlIG15X2xheWVyOiAgbnVtYmVyID0gOTk7XHJcbiAgICBwdWJsaWMgIGNvbnN0cnVjdG9yKHRlYW06IENfVGVhbSkge1xyXG4gICAgICAgIHRoaXMubXlfdGVhbSA9IHRlYW07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGxheWVyKCk6IG51bWJlciAgICAgICAgIHtyZXR1cm4gdGhpcy5teV9sYXllcjt9XHJcbiAgICBwdWJsaWMgc2V0X2xheWVyKGxheWVyOiBudW1iZXIpOiB2b2lkIHt0aGlzLm15X2xheWVyID0gbGF5ZXI7fVxyXG4gICAgcHVibGljIGxldHRlcigpOiBzdHJpbmd8bnVsbCB7XHJcbiAgICAgICAgc3dpdGNoICh0aGlzLm15X3RlYW0ud2FsaygpLmdldF9kKCkpIHtcclxuICAgICAgICAgICAgY2FzZSBUX0RpcmVjdGlvbi5OOiByZXR1cm4gJ+KGkSc7XHJcbiAgICAgICAgICAgIGNhc2UgVF9EaXJlY3Rpb24uRTogcmV0dXJuICfihpInO1xyXG4gICAgICAgICAgICBjYXNlIFRfRGlyZWN0aW9uLlM6IHJldHVybiAn4oaTJztcclxuICAgICAgICAgICAgY2FzZSBUX0RpcmVjdGlvbi5XOiByZXR1cm4gJ+KGkCc7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiAn8J+MgCc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIGNhblNob3coKTogYm9vbGVhbntyZXR1cm4gZmFsc2V9XHJcbiAgICBwdWJsaWMgZHJvdzNEKGZyb3Q6IFRfV2FsbCwgYmFjazogVF9XYWxsKTogdm9pZCB7fVxyXG4gICAgcHVibGljIHBhZF90KCk6ICAgbnVtYmVyIHtyZXR1cm4gMC4wfSBcclxuICAgIHB1YmxpYyBwYWRfZCgpOiAgIG51bWJlciB7cmV0dXJuIDAuMH0gXHJcbiAgICBwdWJsaWMgcGFkX3MoKTogICBudW1iZXIge3JldHVybiAwLjB9IFxyXG4gICAgcHVibGljIGNvbF9mKCk6ICAgc3RyaW5nfG51bGwge3JldHVybiBudWxsfSBcclxuICAgIHB1YmxpYyBjb2xfYigpOiAgIHN0cmluZ3xudWxsIHtyZXR1cm4gbnVsbH0gXHJcbiAgICBwdWJsaWMgY29sX3MoKTogICBzdHJpbmd8bnVsbCB7cmV0dXJuIG51bGx9IFxyXG4gICAgcHVibGljIGNvbF90KCk6ICAgc3RyaW5nfG51bGwge3JldHVybiBudWxsfSBcclxuICAgIHB1YmxpYyBjb2xfZCgpOiAgIHN0cmluZ3xudWxsIHtyZXR1cm4gbnVsbH0gXHJcbiAgICBwdWJsaWMgY29sX2woKTogICBzdHJpbmd8bnVsbCB7cmV0dXJuIG51bGx9IFxyXG4gICAgcHVibGljIGNvbF8yKCk6ICAgc3RyaW5nfG51bGwge3JldHVybiBudWxsfSBcclxuICAgIHB1YmxpYyBkcm93MkQocjogIFRfUmVjdCk6IHZvaWQge1xyXG4vKlxyXG4gICAgICAgIGNvbnN0IGNvbiA9IENfTWF6ZU9ialZpZXcuZ2V0X2NvbnRleHQyRCgpOyAvLyDjgarjgZzjgYtjb250ZXh0MkTjg6Hjgr3jg4Pjg4njgpLlj5blvpfjgafjgY3jgZpcclxuICAgICAgICBpZiAoY29uID09PSB1bmRlZmluZWQpIHJldHVybjtcclxuICAgIFxyXG4gICAgICAgIGNvbi5iZWdpblBhdGgoKTtcclxuICAgICAgICBjb24ubW92ZVRvKHIudGwueCwgci50bC55KTtcclxuICAgICAgICBjb24ubGluZVRvKHIudHIueCwgci50ci55KTtcclxuICAgICAgICBjb24ubGluZVRvKHIuZHIueCwgci5kci55KTtcclxuICAgICAgICBjb24ubGluZVRvKHIuZGwueCwgci5kbC55KTtcclxuICAgICAgICBjb24uY2xvc2VQYXRoKCk7XHJcbiAgICBcclxuICAgICAgICBjb24uZmlsbFN0eWxlICAgPSBcIiNmZjAwMDBcIjtcclxuICAgICAgICBjb24uZmlsbCgpO1xyXG5cclxuICAgICAgICBjb24uc3Ryb2tlU3R5bGUgPSBcIiNmZjk5OTlcIjtcclxuICAgICAgICBjb24ubGluZVdpZHRoICAgPSAzO1xyXG4gICAgICAgIGNvbi5zdHJva2UoKTtcclxuKi9cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZW5jb2RlKCk6IEpTT05fTWF6ZU9ialZpZXcge3JldHVybiB7Y25hbWU6ICdDdXJyZW50VGVhbVZpZXcnfX1cclxuICAgIHB1YmxpYyBkZWNvZGUoajogSlNPTl9NYXplT2JqVmlld3x1bmRlZmluZWQpOiBJX01hemVPYmpWaWV3IHtyZXR1cm4gdGhpcyBhcyBJX01hemVPYmpWaWV3fVxyXG59XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5cclxuaW1wb3J0IHsgQ19Qb2ludERpciwgVF9EaXJlY3Rpb24gfSAgICAgICAgICAgZnJvbSBcIi4vQ19Qb2ludERpclwiO1xyXG5pbXBvcnQgeyBDX01vdmFibGVQb2ludCwgSlNPTl9Nb3ZhYmxlUG9pbnQgfSBmcm9tIFwiLi9DX01vdmFibGVQb2ludFwiO1xyXG5pbXBvcnQgeyBJX0xvY2F0ZSB9ICAgICBmcm9tIFwiLi9DX0xvY2F0aW9uXCI7XHJcbmltcG9ydCB7IElfSG9wZUFjdGlvbiB9IGZyb20gXCIuL0lfQ29tbW9uXCI7XHJcblxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBKU09OX1dhbGtlciBleHRlbmRzIEpTT05fTW92YWJsZVBvaW50IHtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIENfV2Fsa2VyIGV4dGVuZHMgQ19Nb3ZhYmxlUG9pbnQge1xyXG4gICAgY29uc3RydWN0b3Ioaj86IEpTT05fV2Fsa2VyKSB7XHJcbiAgICAgICAgc3VwZXIoaik7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0X3goKTogbnVtYmVyIHtyZXR1cm4gdGhpcy5sb2NfcG9zLnh9XHJcbiAgICBwdWJsaWMgZ2V0X3koKTogbnVtYmVyIHtyZXR1cm4gdGhpcy5sb2NfcG9zLnl9XHJcbiAgICBwdWJsaWMgZ2V0X3ooKTogbnVtYmVyIHtyZXR1cm4gdGhpcy5sb2NfcG9zLnp9XHJcblxyXG4gICAgcHVibGljIHNldF94KHg6IG51bWJlcik6IHZvaWQge3RoaXMubG9jX3Bvcy54ID0geH1cclxuICAgIHB1YmxpYyBzZXRfeSh5OiBudW1iZXIpOiB2b2lkIHt0aGlzLmxvY19wb3MueSA9IHl9XHJcbiAgICBwdWJsaWMgc2V0X3ooejogbnVtYmVyKTogdm9pZCB7dGhpcy5sb2NfcG9zLnogPSB6fVxyXG5cclxuICAgIHB1YmxpYyBzZXRfcGxhY2UoXHJcbiAgICAgICAgcGxhY2U6IElfTG9jYXRlLCBcclxuICAgICAgICB1cmw/OiAgc3RyaW5nLCBcclxuICAgICAgICBwb3M/OiAgQ19Qb2ludERpcikge1xyXG5cclxuICAgICAgICB0aGlzLnNldF91aWQgKHBsYWNlLnVpZCgpKTtcclxuICAgICAgICB0aGlzLnNldF9sY2tkKHBsYWNlLmdldF9sY2tkKCkpO1xyXG4gICAgICAgIHRoaXMuc2V0X25hbWUocGxhY2UuZ2V0X25hbWUoKSk7XHJcblxyXG4gICAgICAgIGlmICh1cmwgIT09IHVuZGVmaW5lZCkgdGhpcy5zZXRfdXJsKHVybCk7XHJcbiAgICAgICAgaWYgKHBvcyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0X3BkKHBvcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgcHVibGljIGhvcGVfcF9md2QoKTogSV9Ib3BlQWN0aW9uIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBoYXNfaG9wZTogdHJ1ZSwgXHJcbiAgICAgICAgICAgIGhvcGU6IFwiTW92ZVwiLFxyXG4gICAgICAgICAgICBzdWJqOiB0aGlzLmdldF9wX2Z3ZCgpLFxyXG4gICAgICAgICAgICBkb09LOiAoKT0+e3RoaXMuc2V0X3BfZndkKCk7fSxcclxuICAgICAgICAgICAgZG9ORzogKCk9Pnt0aGlzLmlzTkcoKTt9LFxyXG4gICAgICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgaG9wZV9wX2JhaygpOiBJX0hvcGVBY3Rpb24ge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGhhc19ob3BlOiB0cnVlLCBcclxuICAgICAgICAgICAgaG9wZTogXCJNb3ZlXCIsXHJcbiAgICAgICAgICAgIHN1Ymo6IHRoaXMuZ2V0X3BfYmFrKCksXHJcbiAgICAgICAgICAgIGRvT0s6ICgpPT57dGhpcy5zZXRfcF9iYWsoKTt9LFxyXG4gICAgICAgICAgICBkb05HOiAoKT0+e3RoaXMuaXNORygpO30sXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIGhvcGVfcF9sZnQoKTogSV9Ib3BlQWN0aW9uIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBoYXNfaG9wZTogdHJ1ZSwgXHJcbiAgICAgICAgICAgIGhvcGU6IFwiTW92ZVwiLFxyXG4gICAgICAgICAgICBzdWJqOiB0aGlzLmdldF9wX2xmdCgpLFxyXG4gICAgICAgICAgICBkb09LOiAoKT0+e3RoaXMuc2V0X3BfbGZ0KCk7fSxcclxuICAgICAgICAgICAgZG9ORzogKCk9Pnt0aGlzLmlzTkcoKTt9LFxyXG4gICAgICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgaG9wZV9wX3JndCgpOiBJX0hvcGVBY3Rpb24ge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGhhc19ob3BlOiB0cnVlLCBcclxuICAgICAgICAgICAgaG9wZTogXCJNb3ZlXCIsXHJcbiAgICAgICAgICAgIHN1Ymo6IHRoaXMuZ2V0X3Bfcmd0KCksXHJcbiAgICAgICAgICAgIGRvT0s6ICgpPT57dGhpcy5zZXRfcF9yZ3QoKTt9LFxyXG4gICAgICAgICAgICBkb05HOiAoKT0+e3RoaXMuaXNORygpO30sXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBob3BlX3R1cm5fcigpOiBJX0hvcGVBY3Rpb24ge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGhhc19ob3BlOiB0cnVlLCBcclxuICAgICAgICAgICAgaG9wZTogXCJUdXJuXCIsXHJcbiAgICAgICAgICAgIHN1Ymo6IHRoaXMuZ2V0X3BkKCksXHJcbiAgICAgICAgICAgIGRvT0s6ICgpPT57dGhpcy50dXJuX3IoKTt9LFxyXG4gICAgICAgICAgICBkb05HOiAoKT0+e3RoaXMuaXNORygpO30sXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBob3BlX3R1cm5fbCgpOiBJX0hvcGVBY3Rpb24ge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGhhc19ob3BlOiB0cnVlLCBcclxuICAgICAgICAgICAgaG9wZTogXCJUdXJuXCIsXHJcbiAgICAgICAgICAgIHN1Ymo6IHRoaXMuZ2V0X3BkKCksXHJcbiAgICAgICAgICAgIGRvT0s6ICgpPT57dGhpcy50dXJuX2woKTt9LFxyXG4gICAgICAgICAgICBkb05HOiAoKT0+e3RoaXMuaXNORygpO30sXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaG9wZV9wX3VwKCk6IElfSG9wZUFjdGlvbiB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgaGFzX2hvcGU6IHRydWUsIFxyXG4gICAgICAgICAgICBob3BlOiBcIlVwXCIsXHJcbiAgICAgICAgICAgIHN1Ymo6IHRoaXMuZ2V0X3BfdXAoKSxcclxuICAgICAgICAgICAgZG9PSzogKCk9Pnt0aGlzLm1vdmVfcF91cCgpO30sXHJcbiAgICAgICAgICAgIGRvTkc6ICgpPT57dGhpcy5pc05HKCk7fSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgcHVibGljIGhvcGVfcF9kb3duKCk6IElfSG9wZUFjdGlvbiB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgaGFzX2hvcGU6IHRydWUsIFxyXG4gICAgICAgICAgICBob3BlOiBcIkRvd25cIixcclxuICAgICAgICAgICAgc3ViajogdGhpcy5nZXRfcF9kb3duKCksXHJcbiAgICAgICAgICAgIGRvT0s6ICgpPT57dGhpcy5tb3ZlX3BfZG93bigpO30sXHJcbiAgICAgICAgICAgIGRvTkc6ICgpPT57dGhpcy5pc05HKCk7fSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBtb3ZlX3BfdXAoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zZXRfcF91cCgpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIG1vdmVfcF9kb3duKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc2V0X3BfZG93bigpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpc05HKCk6IHZvaWQge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIGdldF9wX2Z3ZCgpOiBDX1BvaW50RGlyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fX2dldF9wX21vdmUoMSwgMCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0X3BfZndkKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc2V0X3BkKHRoaXMuZ2V0X3BfZndkKCkpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldF9wX2JhaygpOiBDX1BvaW50RGlyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fX2dldF9wX21vdmUoLTEsIDApO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldF9wX2JhaygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNldF9wZCh0aGlzLmdldF9wX2JhaygpKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRfcF9sZnQoKTogQ19Qb2ludERpciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX19nZXRfcF9tb3ZlKDAsIC0xKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXRfcF9sZnQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zZXRfcGQodGhpcy5nZXRfcF9sZnQoKSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0X3Bfcmd0KCk6IENfUG9pbnREaXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9fZ2V0X3BfbW92ZSgwLCAxKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXRfcF9yZ3QoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zZXRfcGQodGhpcy5nZXRfcF9yZ3QoKSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0X3BfdXAoKTogQ19Qb2ludERpciB7XHJcbiAgICAgICAgY29uc3QgcCA9IG5ldyBDX1BvaW50RGlyKHRoaXMubG9jX3Bvcyk7XHJcbiAgICAgICAgcC56LS07XHJcbiAgICAgICAgcmV0dXJuIHA7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0X3BfdXAoKSB7XHJcbiAgICAgICAgdGhpcy5zZXRfcGQodGhpcy5nZXRfcF91cCgpKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRfcF9kb3duKCk6IENfUG9pbnREaXIge1xyXG4gICAgICAgIGNvbnN0IHAgPSBuZXcgQ19Qb2ludERpcih0aGlzLmxvY19wb3MpO1xyXG4gICAgICAgIHAueisrO1xyXG4gICAgICAgIHJldHVybiBwO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldF9wX2Rvd24oKSB7XHJcbiAgICAgICAgdGhpcy5zZXRfcGQodGhpcy5nZXRfcF9kb3duKCkpO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIF9fZ2V0X3BfbW92ZShvZmZzZXRGQjogbnVtYmVyLCBvZmZzZXRMUjogbnVtYmVyKTogQ19Qb2ludERpciB7XHJcbiAgICAgICAgY29uc3QgcCA9IG5ldyBDX1BvaW50RGlyKHRoaXMubG9jX3Bvcyk7XHJcbiAgICAgICAgaWYgKG9mZnNldEZCICE9PSAwKSB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5sb2NfcG9zLmQpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgVF9EaXJlY3Rpb24uTjogcC55IC09IG9mZnNldEZCO2JyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBUX0RpcmVjdGlvbi5FOiBwLnggKz0gb2Zmc2V0RkI7YnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFRfRGlyZWN0aW9uLlM6IHAueSArPSBvZmZzZXRGQjticmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgVF9EaXJlY3Rpb24uVzogcC54IC09IG9mZnNldEZCO2JyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChvZmZzZXRMUiAhPT0gMCkge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMubG9jX3Bvcy5kKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFRfRGlyZWN0aW9uLk46IHAueCArPSBvZmZzZXRMUjticmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgVF9EaXJlY3Rpb24uRTogcC55ICs9IG9mZnNldExSO2JyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBUX0RpcmVjdGlvbi5TOiBwLnggLT0gb2Zmc2V0TFI7YnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFRfRGlyZWN0aW9uLlc6IHAueSAtPSBvZmZzZXRMUjticmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRfYXJvdW5kKGZyb250OiBudW1iZXIsIHJpZ2h0Om51bWJlciwgdXA6IG51bWJlciA9IDApOiBDX1BvaW50RGlyIHtcclxuICAgICAgICB2YXIgdGFyZ2V0X3ggID0gdGhpcy5sb2NfcG9zLng7XHJcbiAgICAgICAgdmFyIHRhcmdldF95ICA9IHRoaXMubG9jX3Bvcy55O1xyXG4gICAgICAgIHZhciB0YXJnZXRfeiAgPSB0aGlzLmxvY19wb3MueiAtIHVwO1xyXG4gICAgICAgIHN3aXRjaCAodGhpcy5sb2NfcG9zLmQpIHtcclxuICAgICAgICAgICAgY2FzZSBUX0RpcmVjdGlvbi5OOlxyXG4gICAgICAgICAgICAgICAgdGFyZ2V0X3ggKz0gcmlnaHQ7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXRfeSAtPSBmcm9udDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFRfRGlyZWN0aW9uLkU6XHJcbiAgICAgICAgICAgICAgICB0YXJnZXRfeCArPSBmcm9udDtcclxuICAgICAgICAgICAgICAgIHRhcmdldF95ICs9IHJpZ2h0O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgVF9EaXJlY3Rpb24uUzpcclxuICAgICAgICAgICAgICAgIHRhcmdldF94IC09IHJpZ2h0O1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0X3kgKz0gZnJvbnQ7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBUX0RpcmVjdGlvbi5XOlxyXG4gICAgICAgICAgICAgICAgdGFyZ2V0X3ggLT0gZnJvbnQ7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXRfeSAtPSByaWdodDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV3IENfUG9pbnREaXIoe3g6IHRhcmdldF94LCB5OiB0YXJnZXRfeSwgejogdGFyZ2V0X3osIGQ6IHRoaXMubG9jX3Bvcy5kfSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgdHVybl9yKCk6IHZvaWQge1xyXG4gICAgICAgIHN3aXRjaCAodGhpcy5sb2NfcG9zLmQpIHtcclxuICAgICAgICAgICAgY2FzZSBUX0RpcmVjdGlvbi5OOiB0aGlzLmxvY19wb3MuZCA9IFRfRGlyZWN0aW9uLkU7YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgVF9EaXJlY3Rpb24uRTogdGhpcy5sb2NfcG9zLmQgPSBUX0RpcmVjdGlvbi5TO2JyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFRfRGlyZWN0aW9uLlM6IHRoaXMubG9jX3Bvcy5kID0gVF9EaXJlY3Rpb24uVzticmVhaztcclxuICAgICAgICAgICAgY2FzZSBUX0RpcmVjdGlvbi5XOiB0aGlzLmxvY19wb3MuZCA9IFRfRGlyZWN0aW9uLk47YnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIHR1cm5fbCgpOiB2b2lkIHtcclxuICAgICAgICBzd2l0Y2ggKHRoaXMubG9jX3Bvcy5kKSB7XHJcbiAgICAgICAgICAgIGNhc2UgVF9EaXJlY3Rpb24uTjogdGhpcy5sb2NfcG9zLmQgPSBUX0RpcmVjdGlvbi5XO2JyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFRfRGlyZWN0aW9uLkU6IHRoaXMubG9jX3Bvcy5kID0gVF9EaXJlY3Rpb24uTjticmVhaztcclxuICAgICAgICAgICAgY2FzZSBUX0RpcmVjdGlvbi5TOiB0aGlzLmxvY19wb3MuZCA9IFRfRGlyZWN0aW9uLkU7YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgVF9EaXJlY3Rpb24uVzogdGhpcy5sb2NfcG9zLmQgPSBUX0RpcmVjdGlvbi5TO2JyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyB0dXJuX2IoKTogdm9pZCB7XHJcbiAgICAgICAgc3dpdGNoICh0aGlzLmxvY19wb3MuZCkge1xyXG4gICAgICAgICAgICBjYXNlIFRfRGlyZWN0aW9uLk46IHRoaXMubG9jX3Bvcy5kID0gVF9EaXJlY3Rpb24uUzticmVhaztcclxuICAgICAgICAgICAgY2FzZSBUX0RpcmVjdGlvbi5FOiB0aGlzLmxvY19wb3MuZCA9IFRfRGlyZWN0aW9uLlc7YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgVF9EaXJlY3Rpb24uUzogdGhpcy5sb2NfcG9zLmQgPSBUX0RpcmVjdGlvbi5OO2JyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFRfRGlyZWN0aW9uLlc6IHRoaXMubG9jX3Bvcy5kID0gVF9EaXJlY3Rpb24uVzticmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZW5jb2RlKCk6IEpTT05fV2Fsa2VyIHtcclxuICAgICAgICBjb25zdCBqID0gc3VwZXIuZW5jb2RlKCkgYXMgSlNPTl9XYWxrZXI7XHJcbiAgICAgICAgcmV0dXJuIGo7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZGVjb2RlKGE6IEpTT05fV2Fsa2VyKTogQ19XYWxrZXIge1xyXG4gICAgICAgIGlmIChhID09PSB1bmRlZmluZWQpIHJldHVybiB0aGlzO1xyXG4gICAgICAgIHN1cGVyLmRlY29kZShhKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxufVxyXG5cclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5pbXBvcnQgeyBfcm91bmQgfSAgZnJvbSBcIi4uL2RfdXRsL0ZfTWF0aFwiO1xyXG5pbXBvcnQgeyBDX1JhbmdlIH0gZnJvbSBcIi4vQ19SYW5nZVwiO1xyXG5cclxuZXhwb3J0IHR5cGUgVF9XYWxsID0ge1xyXG4gICAgbWluX3g6IG51bWJlcixcclxuICAgIG1heF94OiBudW1iZXIsXHJcbiAgICBtaW5feTogbnVtYmVyLFxyXG4gICAgbWF4X3k6IG51bWJlcixcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIENfV2FsbCB7XHJcbiAgICBwcm90ZWN0ZWQgdzogVF9XYWxsW11bXTtcclxuICAgIHByb3RlY3RlZCBkOiBudW1iZXJcclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihkZXB0aDogbnVtYmVyID0gNSwgc2l6ZTogQ19SYW5nZSkge1xyXG4gICAgICAgIGlmIChkZXB0aCA8IDMpIGRlcHRoID0gNTtcclxuICAgICAgICBpZiAoZGVwdGggJSAyICE9PSAxKSBkZXB0aCsrOyAgLy8g5aWH5pWw44Gu44G/5a++5b+c44CCXHJcblxyXG4gICAgICAgIGNvbnN0IG1pbl94OiBudW1iZXIgPSBzaXplLm1pbl94KCk7XHJcbiAgICAgICAgY29uc3QgbWluX3k6IG51bWJlciA9IHNpemUubWluX3koKTtcclxuICAgICAgICBjb25zdCBtYXhfeDogbnVtYmVyID0gc2l6ZS5tYXhfeCgpO1xyXG4gICAgICAgIGNvbnN0IG1heF95OiBudW1iZXIgPSBzaXplLm1heF95KCk7XHJcbiAgICBcclxuICAgICAgICBjb25zdCBjZW50ZXJfeDogbnVtYmVyID0gKG1heF94IC0gbWluX3gpIC8gMjtcclxuICAgIFxyXG4gICAgICAgIC8vIOWfuua6luOBqOOBquOCi+WjgSjkuIDnlarpgaDjgY/jga7lo4Ep44Gu5q2j6Z2i44K144Kk44K6KOaoquW5hSnjgpLmsYLjgoHjgotcclxuICAgICAgICAvLyDkuIDnlarpgaDjgY8oZGVwdGggLSAxKeOBruWjgeOBruaVsOOBjGRlcHRo5YCL44Gr44Gq44KL44KI44GG44Gr6Kq/5pW044GZ44KLXHJcbiAgICAgICAgY29uc3QgZnJvbnRfd2FsbF9zaXplX3g6IG51bWJlciA9IChtYXhfeCAtIG1pbl94KSAvIGRlcHRoO1xyXG5cclxuICAgICAgICAvLyDln7rmupbjgajjgarjgovlgbTlo4Hjga7jgrXjgqTjgroo5qiq5bmFKeOCkuaxguOCgeOCi1xyXG4gICAgICAgIC8vIOS4gOeVqumBoOOBj+OBruWjgSjkuK3lpK4p44Gu5bem56uv44GL44KJZGVwdGjlgIvjga7lgbTlo4HjgpLlj5bjgozjgovjgojjgYbjgavjgrXjgqTjgrroqr/mlbTjgZnjgotcclxuICAgICAgICBjb25zdCBzaWRlX3dhbGxfc2l6ZV94OiAgbnVtYmVyID0gKGNlbnRlcl94IC0gZnJvbnRfd2FsbF9zaXplX3ggLyAyKSAvIGRlcHRoO1xyXG4gICAgXHJcbiAgICAgICAgLy8g5ZCEZGVwdGjliKXjga7mraPpnaLlo4Hjga7mqKrluYXjgpLmsYLjgoHjgovjgIJcclxuICAgICAgICAvLyDoqIjnrpfjga7liKnkvr/mgKfjgpLogIPmha7jgZfjgabjgIHjg4/jg7zjg5XjgrXjgqTjgrrjgpLmsYLjgoHjgotcclxuICAgICAgICBjb25zdCBmcm9udF93YWxsX0hfc2l6ZV94OiBudW1iZXJbXSA9IG5ldyBBcnJheShkZXB0aCArIDEpO1xyXG4gICAgXHJcbiAgICAgICAgZnJvbnRfd2FsbF9IX3NpemVfeFtkZXB0aF0gPSBmcm9udF93YWxsX3NpemVfeCAvIDI7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IGRlcHRoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICAgICAgZnJvbnRfd2FsbF9IX3NpemVfeFtpXSA9IGZyb250X3dhbGxfSF9zaXplX3hbaSArIDFdICsgc2lkZV93YWxsX3NpemVfeDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIOWfuua6luOBqOOBquOCi+WjgSjkuIDnlarpgaDjgY/jga7lo4Ep44Gu5q2j6Z2i44K144Kk44K6KOe4puW5hSnjgpLmsYLjgoHjgotcclxuICAgICAgICAvLyDkuIDnlarpgaDjgY8oZGVwdGggLSAxKeOBruWjgeOBruaVsOOBjGRlcHRo5YCL44Gr44Gq44KL44KI44GG44Gr6Kq/5pW044GZ44KLXHJcbiAgICAgICAgY29uc3QgZnJvbnRfd2FsbF9zaXplX3k6IG51bWJlciA9IChtYXhfeSAtIG1pbl95KSAvIGRlcHRoO1xyXG5cclxuICAgICAgICAvLyDlpKnkupXjga7nuKbluYXjga7lopfliIbjgpLmsYLjgoHjgovjgILlibLlkIjjga/pganlvZPvvIjnrJHvvIlcclxuICAgICAgICAvLyDjgq3jg6Pjg7Pjg5Djgrnjga7pq5jjgZUobWF4X3kgLSBtaW5feSnjgYvjgonkuIDnlarpgaDjgY/jga7lo4Hjga7pq5jjgZXjgpLlvJXjgYTjgaZcclxuICAgICAgICAvLyDmt7HjgZUoZGVwdGggKyAxKeOBp+WJsuOCi+OBk+OBqOOBq+OCiOOCiuWil+WIhuOBqOOBl+OBn1xyXG4gICAgICAgIGNvbnN0IHNpZGVfd2FsbF9zaXplX1QgPSAgKG1heF95IC0gbWluX3kgLSBmcm9udF93YWxsX3NpemVfeSkgLyAoZGVwdGggKiAyKTtcclxuXHJcbiAgICAgICAgLy8g5bqK44Gu5aKX5YiG44KS5rGC44KB44KL44CC5rGC44KB5pa544Gv5LiK6KiY44Go5ZCM44GYXHJcbiAgICAgICAgY29uc3Qgc2lkZV93YWxsX3NpemVfQiA9ICAobWF4X3kgLSBtaW5feSAtIGZyb250X3dhbGxfc2l6ZV95KSAvIChkZXB0aCAqIDIpO1xyXG5cclxuICAgICAgICAvLyDku6XkuIrjga7lgKTjgpLnlKjjgYTjgablkITot53pm6IoZGVwdGgp44Gu5q2j6Z2i5aOB44Gu5L2N572u5rG644KB44KS44GZ44KLXHJcbiAgICAgICAgLy8gd2FsbOOBruesrOS4gOW8leaVsOOBr+i3nembouOAgeesrOS6jOW8leaVsOOBr+W3puWPs+OBruS9jee9ru+8iOS4gOeVquW3puOBjDDjgIHkuIDnlarlj7PjgYxkZXB0aC0xKVxyXG4gICAgICAgIGNvbnN0IHdhbGw6IFRfV2FsbFtdW10gPSBuZXcgQXJyYXkoZGVwdGggKyAxKTtcclxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGRlcHRoICsgMTsgaisrKSB7XHJcbiAgICAgICAgICAgIHdhbGxbal0gPSBuZXcgQXJyYXkoZGVwdGggKyAxKTtcclxuICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCBkZXB0aCArIDE7IGsrKykge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgd2tfeCA9IGNlbnRlcl94IC0gZnJvbnRfd2FsbF9IX3NpemVfeFtqXSAqIChkZXB0aCAtIDIgKiBrKTtcclxuICAgICAgICAgICAgICAgIHdhbGxbal1ba10gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWluX3g6IF9yb3VuZCh3a194LCAwKSxcclxuICAgICAgICAgICAgICAgICAgICBtYXhfeDogX3JvdW5kKHdrX3ggICsgZnJvbnRfd2FsbF9IX3NpemVfeFtqXSAqIDIsIDApLFxyXG4gICAgICAgICAgICAgICAgICAgIG1pbl95OiBfcm91bmQobWluX3kgKyBzaWRlX3dhbGxfc2l6ZV9UICogaiwgMCksXHJcbiAgICAgICAgICAgICAgICAgICAgbWF4X3k6IF9yb3VuZChtYXhfeSAtIHNpZGVfd2FsbF9zaXplX0IgKiBqLCAwKSxcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmQgPSBkZXB0aDtcclxuICAgICAgICB0aGlzLncgPSB3YWxsO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldF9kZXB0aCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmQ7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0KGRlcHRoOiBudW1iZXIsIG9mZnNldDogbnVtYmVyKTogVF9XYWxsIHtcclxuICAgICAgICBjb25zdCBIX2RlcHQgPSAodGhpcy5kIC0gMSkgLyAyO1xyXG4gICAgICAgIHJldHVybiB0aGlzLndbZGVwdGhdW0hfZGVwdCArIG9mZnNldF07XHJcbiAgICB9XHJcbn1cclxuXHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5cclxuaW1wb3J0IHtUX01ha2VFbnVtVHlwZX0gZnJvbSBcIi4uL2RfdXRsL1RfTWFrZUVudW1UeXBlXCI7XHJcblxyXG5leHBvcnQgY29uc3QgVF9EaXJlY3Rpb24gPSB7XHJcbiAgICBOOiAgIDAsXHJcbiAgICBFOiAgIDEsXHJcbiAgICBTOiAgIDIsXHJcbiAgICBXOiAgIDMsXHJcbiAgICBYOiAgOTksXHJcbiAgICBNQVg6IDNcclxufSBhcyBjb25zdDtcclxuZXhwb3J0IHR5cGUgVF9EaXJlY3Rpb24gPSBUX01ha2VFbnVtVHlwZTx0eXBlb2YgVF9EaXJlY3Rpb24+O1xyXG5cclxuZXhwb3J0IHZhciAkRGlyZWN0aW9uTmFtZSA9IHtcclxuICAgIDA6ICAn5YyXJyxcclxuICAgIDE6ICAn5p2xJyxcclxuICAgIDI6ICAn5Y2XJyxcclxuICAgIDM6ICAn6KW/JyxcclxuICAgIDk5OiAn6KyOJ1xyXG59XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIC8vIOS4gOiIrOOBq+S9v+OBiOOCi+ODpuODvOODhuOCo+ODquODhuOCo+OBquWRquaWh1xyXG4gICAgLy8g44Kq44OW44K444Kn44Kv44OI44KS5YiX5oyZ5Z6L44Go44GX44Gm5Z6L5YyW44GZ44KL44Gu44Gr5Yip55SoXHJcbiAgICBpbXBvcnQge1RfTWFrZUVudW1UeXBlfSBmcm9tIFwiLi4vZF91dGwvVF9NYWtlRW51bVR5cGVcIjtcclxuXHJcbiAgICAvLyDjg4Djg7Pjgrjjg6fjg7Pjg57jg4Pjg5fjga7jgrvjg6vjga7nqK7poZ7jgpLooajjgZnliJfmjJnlnotcclxuICAgIC8vIE5vRGVmOiDmnKrlrprnvqnjg7vkuI3mmI5cclxuICAgIC8vIEZsb29yOiDluopcclxuICAgIC8vIFVuZXhwOiDmnKrouI/lnLBcclxuICAgIC8vIFN0b25lOiDnn7Plo4FcclxuICAgIC8vIFN0clVwOiDkuIrjgorpmo7mrrVcclxuICAgIC8vIFN0ckRuOiDkuIvjgorpmo7mrrVcclxuICAgIC8vIEVtcHR5OiDliJ3mnJ/nirbmhYvjg7vkvZXjgoLjgarjgZdcclxuICAgIC8vIFxyXG4gICAgLy8gZnVuY3Rpb24gdG9faW50KE16S2luZCk6ICAgICAgaW50ICAgICAgICDliJfmjJnlnovjgavlr77lv5zjgZnjgovlgKQo5pW05pWw5YCkKeOCkui/lOOBmVxyXG4gICAgLy8gZnVuY3Rpb24gZnJvbV9pbnQoaW50KTogICAgICAgVF9NektpbmQgICAgIOaVtOaVsOWApOOBq+WvvuW/nOOBmeOCi+WIl+aMmeWei+OCkui/lOOBmSjjgq/jg6njgrnjg6Hjgr3jg4Pjg4kpXHJcbiAgICAvLyBmdW5jdGlvbiB0b19sZXR0ZXIoTXpLaW5kKTogICBzdHJpbmcgICAgIOWIl+aMmeWei+OBq+WvvuW/nOOBmeOCi+aWh+Wtl+OCkui/lOOBmSjjg4Djg7Pjgrjjg6fjg7Pjga4yROihqOekuueUqClcclxuICAgIC8vIGZ1bmN0aW9uIGZyb21fbGV0dGVyKHN0cmluZyk6IFRfTXpLaW5kICAgICDmloflrZfjgavlr77lv5zjgZnjgovliJfmjJnlnovjgpLov5TjgZko44Kv44Op44K544Oh44K944OD44OJKVxyXG5cclxuICAgIGV4cG9ydCBjb25zdCBUX016S2luZDp7W2tleTogc3RyaW5nXTogbnVtYmVyfSAgPSB7XHJcbiAgICAgICAgTm9EZWY6ICAgMCxcclxuICAgICAgICBGbG9vcjogICAxLFxyXG4gICAgICAgIFVuZXhwOiAgIDIsXHJcbiAgICAgICAgU3RvbmU6ICAgMyxcclxuICAgICAgICBVbmt3bjogICA0LFxyXG4gICAgICAgIFN0clVwOiAgIDUsXHJcbiAgICAgICAgU3RyRG46ICAgNixcclxuICAgICAgICBTdHJVRDogICA3LFxyXG4gICAgICAgIEVtcHR5OiAyNTUsXHJcbiAgICB9IGFzIGNvbnN0O1xyXG4gICAgZXhwb3J0IHR5cGUgVF9NektpbmQgICA9IFRfTWFrZUVudW1UeXBlPHR5cGVvZiBUX016S2luZD47XHJcblxyXG4gICAgZXhwb3J0IGNvbnN0IFRfUnZNektpbmQ6e1trZXk6IG51bWJlcl06IFRfTXpLaW5kfSAgPSB7XHJcbiAgICAgICAgMDogICBUX016S2luZC5Ob0RlZixcclxuICAgICAgICAxOiAgIFRfTXpLaW5kLkZsb29yLFxyXG4gICAgICAgIDI6ICAgVF9NektpbmQuVW5leHAsXHJcbiAgICAgICAgMzogICBUX016S2luZC5TdG9uZSxcclxuICAgICAgICA0OiAgIFRfTXpLaW5kLlVua3duLFxyXG4gICAgICAgIDU6ICAgVF9NektpbmQuU3RyVXAsXHJcbiAgICAgICAgNjogICBUX016S2luZC5TdHJEbixcclxuICAgICAgICA3OiAgIFRfTXpLaW5kLlN0clVELFxyXG4gICAgICAgIDI1NTogVF9NektpbmQuRW1wdHksXHJcbiAgICB9IGFzIGNvbnN0O1xyXG4gICAgZXhwb3J0IHR5cGUgVF9Sdk16S2luZCA9IFRfTWFrZUVudW1UeXBlPHR5cGVvZiBUX1J2TXpLaW5kPjtcclxuXHJcbiIsImludGVyZmFjZSBKU09OQWJsZSB7XHJcbiAgICBba2V5OiBzdHJpbmddOiBhbnlcclxufVxyXG5leHBvcnQgdHlwZSBUX0F0dHIgPSB7W2tleTogc3RyaW5nXTogc3RyaW5nfG51bWJlcnxvYmplY3R9O1xyXG5cclxuZXhwb3J0IGNsYXNzIENfVXJsT3B0IHtcclxuICAgIHByb3RlY3RlZCB2OiBUX0F0dHI7XHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3Iocz86IHN0cmluZyk7XHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IodD86IFRfQXR0cik7XHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoYT86IGFueSkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgYSA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICB0aGlzLnYgPSB7fSBhcyBUX0F0dHI7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiBhID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0X2Zyb21fc3RyaW5nKGEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIGEgPT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICAgICAgdGhpcy52ID0gYSBhcyBUX0F0dHI7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy52ID0ge30gYXMgVF9BdHRyO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRfa2V5cygpOiBzdHJpbmdbXSB7XHJcbiAgICAgICAgY29uc3Qga2V5X2xpc3Q6IHN0cmluZ1tdID0gbmV3IEFycmF5IGFzIHN0cmluZ1tdO1xyXG4gICAgICAgIGZvciAodmFyIGtleSBpbiB0aGlzLnYpIHtcclxuICAgICAgICAgICAga2V5X2xpc3QucHVzaChrZXkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4ga2V5X2xpc3Q7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IChrZXk6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKGtleSBpbiB0aGlzLnYpIHtcclxuICAgICAgICAgICAgaWYgICh0eXBlb2YgdGhpcy52W2tleV0gPT09IFwibnVtYmVyXCIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnZba2V5XS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICAodHlwZW9mIHRoaXMudltrZXldID09PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodGhpcy52W2tleV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnZba2V5XSBhcyBzdHJpbmc7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIHNldChzdHI6IHN0cmluZyk6ICB2b2lkO1xyXG4gICAgcHVibGljIHNldChhdHI6IFRfQXR0cik6ICB2b2lkO1xyXG4gICAgcHVibGljIHNldChrZXk6IHN0cmluZywgdmFsPzogc3RyaW5nKTogdm9pZDtcclxuICAgIHB1YmxpYyBzZXQoa2V5OiBzdHJpbmcsIHZhbD86IG51bWJlcik6IHZvaWQ7XHJcbiAgICBwdWJsaWMgc2V0KGtleTogc3RyaW5nLCB2YWw/OiBvYmplY3QpOiB2b2lkO1xyXG4gICAgcHVibGljIHNldCh1a246IGFueSwgICAgdmFsPzogc3RyaW5nfG51bWJlcnxvYmplY3QpOiB2b2lkIHtcclxuICAgICAgICBpZiAodHlwZW9mIHVrbiA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbCA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRfZnJvbV9zdHJpbmcodWtuKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZbdWtuXSA9IHZhbDtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsID09PSBcIm51bWJlclwiICl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZbdWtuXSA9IHZhbDtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsID09PSBcIm9iamVjdFwiICl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZbdWtuXSA9IHZhbDtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudlt1a25dID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIHVrbiA9PT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYXR0cjogVF9BdHRyID0gdWtuIGFzIFRfQXR0cjtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBpdGVtIGluIGF0dHIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudltpdGVtXSA9IGF0dHJbaXRlbV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgaXNzZXQoa2V5OiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gKGtleSBpbiB0aGlzLnYpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHJlbW92ZShrZXk6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIGlmIChrZXkgaW4gdGhpcy52KSB7XHJcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLnZba2V5XTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgY2xlYXIoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy52ID0ge30gYXMgVF9BdHRyO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHRvU3RyaW5nKCk6IHN0cmluZyB7XHJcbiAgICAgICAgY29uc3QgbGVuOiBudW1iZXIgPSAgT2JqZWN0LmtleXModGhpcy52KS5sZW5ndGg7XHJcbiAgICAgICAgaWYgKGxlbiA8IDEpICByZXR1cm4gXCJcIjtcclxuXHJcbiAgICAgICAgdmFyIHN0cl9hcnJheTogc3RyaW5nW10gPSBbXTtcclxuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLnYpIHtcclxuICAgICAgICAgICAgc3RyX2FycmF5LnB1c2goa2V5ICsgXCI9XCIgKyB0aGlzLnZba2V5XSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gc3RyX2FycmF5LmpvaW4oXCImXCIpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHRvSlNPTigpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh0aGlzLnYpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHRvRm9ybURhdGEoKTogRm9ybURhdGF8dW5kZWZpbmVkIHtcclxuICAgICAgICBjb25zdCBsZW46IG51bWJlciA9ICBPYmplY3Qua2V5cyh0aGlzLnYpLmxlbmd0aDtcclxuICAgICAgICBpZiAobGVuIDwgMSkgIHJldHVybiB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgIHZhciBmb3JtX2RhdGEgPSBuZXcgRm9ybURhdGEoKTtcclxuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLnYpIHtcclxuICAgICAgICAgICAgY29uc3QgdmFsdWU6IHN0cmluZ3xudW1iZXJ8b2JqZWN0ID0gdGhpcy52W2tleV07XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIpXHJcbiAgICAgICAgICAgICAgICBmb3JtX2RhdGEuYXBwZW5kKGtleSwgdmFsdWUpO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiKVxyXG4gICAgICAgICAgICAgICAgZm9ybV9kYXRhLmFwcGVuZChrZXksIEpTT04uc3RyaW5naWZ5KHZhbHVlKSk7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIGZvcm1fZGF0YS5hcHBlbmQoa2V5LCB2YWx1ZS50b1N0cmluZygpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBmb3JtX2RhdGE7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgc2V0X2Zyb21fc3RyaW5nKHM6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY2xlYXIoKTtcclxuICAgICAgICB0aGlzLmFkZF9mcm9tX3N0cmluZyhzKTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBhZGRfZnJvbV9zdHJpbmcoczogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3Qgc3RyID0gcy5yZXBsYWNlKC9eKFxcPz8pKC4qKSQvLCAnJDInKTtcclxuICAgICAgICBjb25zdCBzdHJfYXJyYXk6IHN0cmluZ1tdID0gc3RyLnNwbGl0KFwiJlwiKTtcclxuICAgICAgICBzdHJfYXJyYXkuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBrZXlfdmFsdWUgPSBpdGVtLnNwbGl0KFwiPVwiKTtcclxuICAgICAgICAgICAgaWYgKGtleV92YWx1ZS5sZW5ndGggPCAyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZba2V5X3ZhbHVlWzBdXSA9ICcnO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy52W2tleV92YWx1ZVswXV0gPSBrZXlfdmFsdWVbMV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG4iLCIvLyDmlbDlgKTjg4Hjgqfjg4Pjgq9cclxuZXhwb3J0IGZ1bmN0aW9uIF9pc051bShudW1WYWw6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgLy8g44OB44Kn44OD44Kv5p2h5Lu244OR44K/44O844OzXHJcbiAgICBjb25zdCBwYXR0ZXJuID0gL15bLStdPyhbMS05XVxcZCp8MCkoXFwuXFxkKyk/JC87XHJcbiAgICAvLyDmlbDlgKTjg4Hjgqfjg4Pjgq9cclxuICAgIHJldHVybiBwYXR0ZXJuLnRlc3QobnVtVmFsKTtcclxufVxyXG5cclxuLy8g5pWw5YCk5Y+W44KK5Ye644GXXHJcbmV4cG9ydCBmdW5jdGlvbiBfZ2V0TnVtKG51bVZhbDogc3RyaW5nKTogbnVtYmVyIHtcclxuICAgIC8vIOODgeOCp+ODg+OCr+adoeS7tuODkeOCv+ODvOODs1xyXG4vLyAgICBjb25zdCBwYXR0ZXJuID0gL1stXT8oWzEtOV1cXGQqfDApKFxcLlxcZCspPy87XHJcbiAgICBjb25zdCBwYXR0ZXJuID0gLyhbXjAtOV0pL2c7XHJcbiAgICBjb25zdCB2YWxzdHIgID0gbnVtVmFsLnJlcGxhY2UocGF0dGVybiwnJyk7XHJcbiAgICAvLyDmlbDlgKTjg4Hjgqfjg4Pjgq9cclxuICAgIHJldHVybiBOdW1iZXIodmFsc3RyKTtcclxufVxyXG5cclxuLy8g5Zub5o2o5LqU5YWlXHJcbmV4cG9ydCBmdW5jdGlvbiBfcm91bmQobnVtOiBudW1iZXIsIGRpZ2l0OiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgY29uc3QgbXVsdGlwbGllciA9IE1hdGgucG93KDEwLCBkaWdpdCk7XHJcbiAgICByZXR1cm4gTWF0aC5yb3VuZChudW0gKiBtdWx0aXBsaWVyKSAvIG11bHRpcGxpZXI7XHJcbn1cclxuXHJcbi8vIOWIh+OCiuS4iuOBklxyXG5leHBvcnQgZnVuY3Rpb24gX2NlaWwobnVtOiBudW1iZXIsIGRpZ2l0OiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgY29uc3QgbXVsdGlwbGllciA9IE1hdGgucG93KDEwLCBkaWdpdCk7XHJcbiAgICByZXR1cm4gTWF0aC5jZWlsKG51bSAqIG11bHRpcGxpZXIpIC8gbXVsdGlwbGllcjtcclxufVxyXG5cclxuXHJcbi8vIOWIh+OCiuS4i+OBklxyXG5leHBvcnQgZnVuY3Rpb24gX2Zsb29yKG51bTogbnVtYmVyLCBkaWdpdDogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgIGNvbnN0IG11bHRpcGxpZXIgPSBNYXRoLnBvdygxMCwgZGlnaXQpO1xyXG4gICAgcmV0dXJuIE1hdGguZmxvb3IobnVtICogbXVsdGlwbGllcikgLyBtdWx0aXBsaWVyO1xyXG59XHJcblxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9taW4oYTogbnVtYmVyW10pOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIGEucmVkdWNlKChuMTogbnVtYmVyLCBuMjogbnVtYmVyKSA9PiBNYXRoLm1pbihuMSwgbjIpKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9tYXgoYTogbnVtYmVyW10pOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIGEucmVkdWNlKChuMTogbnVtYmVyLCBuMjogbnVtYmVyKSA9PiBNYXRoLm1heChuMSwgbjIpKTtcclxufVxyXG4iLCJpbXBvcnQgeyBfbWF4LCBfbWluLCBfcm91bmQgfSBmcm9tIFwiLi9GX01hdGhcIjtcclxuXHJcbi8vIOS5seaVsOmWouaVsOWRvOOBs+WHuuOBl+eUqOOBruWei+Wuo+iogFxyXG50eXBlIFRfZnJhbmQgPSAoKT0+bnVtYmVyXHJcbmNvbnN0IGZyYW5kOiBUX2ZyYW5kID0gICgpPT57cmV0dXJuIE1hdGgucmFuZG9tKCl9XHJcblxyXG4vLyDkuIDmp5jkubHmlbAo5pW05pWwKVxyXG5leHBvcnQgZnVuY3Rpb24gX2lyYW5kKG1pbjogbnVtYmVyID0gMCwgbWF4OiBudW1iZXIgPSAxLCByYW5kOiBUX2ZyYW5kID0gZnJhbmQpOiBudW1iZXIge1xyXG4gICAgY29uc3QgZl9yYW5kID0gTWF0aC5mbG9vcihyYW5kKCkgKiAobWF4IC0gbWluICsgMSkgKyBtaW4pO1xyXG4gICAgcmV0dXJuIF9yb3VuZChmX3JhbmQsIDApO1xyXG59XHJcblxyXG4vLyDmraPopo/liIbluIPjgoLjganjgY3kubHmlbAo5pW05pWwKVxyXG5leHBvcnQgZnVuY3Rpb24gX2lncmFuZChtaW46IG51bWJlciA9IDAsIG1heDogbnVtYmVyID0gMSwgcmFuZDogVF9mcmFuZCA9IGZyYW5kKTogbnVtYmVyIHtcclxuICAgIHJldHVybiBfaXJhbmQobWluLCBtYXgsICgpPT57cmV0dXJuIF9ncmFuZCgwLCAxLCByYW5kKX0pXHJcbn1cclxuXHJcbi8vIOato+imj+WIhuW4g+OCguOBqeOBjeS5seaVsCjlrp/mlbApXHJcbmV4cG9ydCBmdW5jdGlvbiBfZ3JhbmQobWluOiBudW1iZXIgPSAwLCBtYXg6IG51bWJlciA9IDEsIHJhbmQ6IFRfZnJhbmQgPSBmcmFuZCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gTWF0aC5mbG9vcihfX19nYXVzc2lhblJhbmQocmFuZCkgKiAobWF4IC0gbWluICsgMSkgKyBtaW4pO1xyXG59XHJcbmZ1bmN0aW9uIF9fX2dhdXNzaWFuUmFuZChyYW5kOiBUX2ZyYW5kID0gZnJhbmQpIHtcclxuICAgIGxldCBzdW0gPSAwO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA2OyBpICs9IDEpIHtcclxuICAgICAgICBzdW0gKz0gcmFuZCgpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHN1bSAvIDY7XHJcbn1cclxuXHJcbi8vIOWwkeOBl+ecn+mdouebruOBquato+imj+WIhuW4g+S5seaVsCjmlbTmlbApXHJcbmV4cG9ydCBmdW5jdGlvbiBfaW5yYW5kKG1pbjogbnVtYmVyID0gMCwgbWF4OiBudW1iZXIgPSAxLCBkZDogbnVtYmVyID0gMy4wLCByYW5kOiBUX2ZyYW5kID0gZnJhbmQpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIE1hdGguZmxvb3IoX25yYW5kKG1pbiwgbWF4LCBkZCwgcmFuZCkpO1xyXG59XHJcblxyXG4vLyDlsJHjgZfnnJ/pnaLnm67jgarmraPopo/liIbluIPkubHmlbAo5a6f5pWwKVxyXG4vLyDkuIDmp5jnorrnjoflpInmlbBhLGLjgpLlpInmlbDplqLmlbDjgpLnlKjjgYTjgaYgeD1mKGEsYiksIHk9ZyhhLGIp44Go44GX44GmMuOBpOOBruato+imj+WIhuW4g+S5seaVsHgseeOCkuW+l+OCi1xyXG4vLyB4ID0gZihhLGIpID0gc3FydCgtMipsb2coYSkpICogc2luKDIqz4AqYikgXHJcbi8vIHkgPSBnKGEsYikgPSBzcXJ0KC0yKmxvZyhhKSkgKiBjb3MoMirPgCpiKSBcclxuZXhwb3J0IGZ1bmN0aW9uIF9ucmFuZChtaW46IG51bWJlciA9IDAuMCwgbWF4OiBudW1iZXIgPSAxLjAsIGRkOiBudW1iZXIgPSAzLjAsIHJhbmQ6IFRfZnJhbmQgPSBmcmFuZCk6IG51bWJlciB7XHJcbiAgICBjb25zdCBhdmUgPSAwLjU7XHJcbiAgICBjb25zdCBhID0gcmFuZCgpO1xyXG4gICAgY29uc3QgYiA9IHJhbmQoKTtcclxuICAgIGxldCB4ID0gYXZlICsgX2ZhYihhLCBiKSAvICgyLjAgKiBkZCk7IC8vIOOBk+OBk+OBvuOBp+OAgU4oMCwxKeOBruato+imj+WIhuW4g+S5seaVsOOBruS9nOaIkFxyXG5cclxuICAgIHggPSBtaW4gKyB4ICogKG1heCAtIG1pbik7XHJcbiAgICB4ID0gX21heChbbWluLCB4XSk7XHJcbiAgICB4ID0gX21pbihbbWF4LCB4XSk7XHJcbiAgICByZXR1cm4geDtcclxufVxyXG5mdW5jdGlvbiBfZmFiKGE6IG51bWJlciwgYjogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgIHJldHVybiBNYXRoLnNxcnQoLTIuMCAqIE1hdGgubG9nKGEpKSAqIE1hdGguc2luKDIuMCAqIE1hdGguUEkgKiBiKTtcclxufVxyXG5mdW5jdGlvbiBfZ2FiKGE6IG51bWJlciwgYjogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgIHJldHVybiBNYXRoLnNxcnQoLTIuMCAqIE1hdGgubG9nKGEpKSAqIE1hdGguY29zKDIuMCAqIE1hdGguUEkgKiBiKTtcclxufVxyXG5cclxuXHJcbi8vIOOCt+ODvOODieWApOOCkueUqOOBhOOBn+S5seaVsFxyXG5leHBvcnQgY2xhc3MgQ19TZWVkZWRSYW5kIHtcclxuICAgIHByb3RlY3RlZCBzZWVkOiBudW1iZXI7XHJcbiAgICBwcm90ZWN0ZWQgZmlyc3Rfc2VlZDogbnVtYmVyO1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihzZWVkOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnNlZWQgPSBzZWVkO1xyXG4gICAgICAgIHRoaXMuZmlyc3Rfc2VlZCA9IHNlZWQ7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgcmVzZXQoKSB7XHJcbiAgICAgICAgdGhpcy5zZWVkID0gdGhpcy5maXJzdF9zZWVkO1xyXG4gICAgfVxyXG4gICAgLy8g5Lmx5pWw55Sf5oiQ44Oh44K944OD44OJXHJcbiAgICBwdWJsaWMgcmFuZG9tKCk6IG51bWJlciB7XHJcbiAgICAgICAgdGhpcy5zZWVkID0gKHRoaXMuc2VlZCAqIDkzMDEgKyA0OTI5NykgJSAyMzMyODA7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VlZCAvIDIzMzI4MC4wO1xyXG4gICAgfVxyXG59XHJcblxyXG4vL+ODpuODi+ODvOOCr0lEKHV1aWQp44Gu55Sf5oiQXHJcbmV4cG9ydCBmdW5jdGlvbiBfZ2V0X3V1aWQobGVuOiBudW1iZXIgPSAyMCwgcmFuZDogVF9mcmFuZCA9IGZyYW5kKTogc3RyaW5nIHtcclxuICAgIGNvbnN0IGxmdCA9IChuZXcgRGF0ZSgpKS5nZXRUaW1lKCkudG9TdHJpbmcoMTYpOyAvLyDjgZ/jgbbjgpMxM+ahgVxyXG4gICAgY29uc3Qgcmd0X2xlbiA9IF9tYXgoW2xlbiAtIGxmdC5sZW5ndGgsIDFdKTtcclxuXHJcbiAgICBjb25zdCByZ3QgPSBNYXRoLmZsb29yKE1hdGgucG93KDEwLCByZ3RfbGVuKSAqIHJhbmQoKSkudG9TdHJpbmcoMTYpO1xyXG4gICAgcmV0dXJuIGxmdCArIHJndDtcclxufVxyXG5cclxuLy8g56K6546H44Gr5Z+644Gl44GP6KaB57Sg6YG45oqeXHJcbmV4cG9ydCB0eXBlIFRfU2VsZWN0SXRlbSA9IHtcclxuICAgIHJhdGlvOiBudW1iZXIsXHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIF9zZWxlY3RJdGVtKGl0ZW1zOiBUX1NlbGVjdEl0ZW1bXSwgcmFuZDogVF9mcmFuZCA9IGZyYW5kKTogVF9TZWxlY3RJdGVtIHwgdW5kZWZpbmVkIHtcclxuICAgIHZhciB0dGw6bnVtYmVyID0gMDtcclxuICAgIGZvciAobGV0IGl0ZW0gb2YgaXRlbXMpIHR0bCArPSBpdGVtLnJhdGlvO1xyXG5cclxuICAgIGNvbnN0IHRhcmdldCA9IF9pcmFuZCgwLCB0dGwsIHJhbmQpO1xyXG4gICAgdmFyIHN1bSA9IDA7XHJcbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMpIHtcclxuICAgICAgICBzdW0gKz0gaXRlbS5yYXRpbztcclxuICAgICAgICBpZiAodGFyZ2V0IDwgc3VtKSB7XHJcbiAgICAgICAgICByZXR1cm4gaXRlbTtcclxuICAgICAgICB9XHJcbiAgICB9IFxyXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcclxufVxyXG5cclxuLy8g6YWN5YiX44Gu44K344Oj44OD44OV44OrXHJcbmV4cG9ydCBmdW5jdGlvbiBfc2h1ZmZsZUFycmF5PFQ+KGFycmF5OiBUW10sIHJhbmQ6IFRfZnJhbmQgPSBmcmFuZCk6IFRbXSB7XHJcbiAgICBsZXQgc2h1ZmZsZWRBcnJheSA9IFsuLi5hcnJheV07IC8vIOWFg+OBrumFjeWIl+OCkuWkieabtOOBl+OBquOBhOOCiOOBhuOBq+OCs+ODlOODvOOBmeOCi1xyXG4gICAgZm9yIChsZXQgaSA9IHNodWZmbGVkQXJyYXkubGVuZ3RoIC0gMTsgaSA+IDA7IGktLSkge1xyXG4gICAgICAgIC8vIOODqeODs+ODgOODoOOBquS9jee9ruOCkuaxuuWumlxyXG4gICAgICAgIGNvbnN0IGogPSBfaXJhbmQoMCwgaSwgcmFuZCk7XHJcbiAgICAgICAgLy8g6KaB57Sg44Gu5YWl44KM5pu/44GIXHJcbiAgICAgICAgW3NodWZmbGVkQXJyYXlbaV0sIHNodWZmbGVkQXJyYXlbal1dID0gW3NodWZmbGVkQXJyYXlbal0sIHNodWZmbGVkQXJyYXlbaV1dO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHNodWZmbGVkQXJyYXk7IC8vIOOCt+ODo+ODg+ODleODq+OBleOCjOOBn+mFjeWIl+OCkui/lOOBmVxyXG59XHJcblxyXG4vLyDkubHmlbDjgavjgojjgovmloflrZfliJfnlJ/miJBcclxuZXhwb3J0IGZ1bmN0aW9uIF9yYW5kb21fc3RyKGxlbmd0aDogbnVtYmVyKTogc3RyaW5nIHtcclxuICAgIGxldCBzdHIgPSAnJztcclxuICAgIGZvciAobGV0IGk9MDsgaSA8IGxlbmd0aDsgaSsrKSBzdHIgKz0gX3JhbmRvbV9DaGFyKCk7XHJcbiAgICByZXR1cm4gc3RyO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBfcmFuZG9tX1VwcGVyU3RyKGxlbmd0aDogbnVtYmVyKTogc3RyaW5nIHtcclxuICAgIGxldCBzdHIgPSAnJztcclxuICAgIGZvciAobGV0IGk9MDsgaSA8IGxlbmd0aDsgaSsrKSBzdHIgKz0gX3JhbmRvbV9VcHBlckNoYXIoKTtcclxuICAgIHJldHVybiBzdHI7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIF9yYW5kb21fTG93ZXJTdHIobGVuZ3RoOiBudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgbGV0IHN0ciA9ICcnO1xyXG4gICAgZm9yIChsZXQgaT0wOyBpIDwgbGVuZ3RoOyBpKyspIHN0ciArPSBfcmFuZG9tX0xvd2VyQ2hhcigpO1xyXG4gICAgcmV0dXJuIHN0cjtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gX3JhbmRvbV9VcHBlckNoYXIoKTogc3RyaW5nIHtcclxuICAgIGNvbnN0IHZhbCA9IF9pcmFuZCgwLDI2KVxyXG4gICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoNjUrdmFsKTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gX3JhbmRvbV9Mb3dlckNoYXIoKTogc3RyaW5nIHtcclxuICAgIGNvbnN0IHZhbCA9IF9pcmFuZCgwLDI2KVxyXG4gICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoOTUrdmFsKTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gX3JhbmRvbV9OdW1DaGFyKCk6IHN0cmluZyB7XHJcbiAgICBjb25zdCB2YWwgPSBfaXJhbmQoMCw5KVxyXG4gICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoNDgrdmFsKTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gX3JhbmRvbV9DaGFyKCk6IHN0cmluZyB7XHJcbiAgICBjb25zdCB2YWwgPSBfaXJhbmQoMCw2MSlcclxuICAgIGlmICh2YWwgPCAyNikgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoNjUrdmFsKTtcclxuICAgIGlmICh2YWwgPCA1MikgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoOTcrdmFsLTI2KTtcclxuICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKDQ4K3ZhbC01Mik7XHJcbn1cclxuIiwiZXhwb3J0IGNsYXNzIENfRGlzcGxheU1lc3NhZ2Uge1xyXG4gICAgcHJvdGVjdGVkIHN0YXRpYyAgbWU6IENfRGlzcGxheU1lc3NhZ2U7XHJcbiAgICBwcm90ZWN0ZWQgaWQ6ICBzdHJpbmc7XHJcbiAgICBwcm90ZWN0ZWQgZGl2OiBIVE1MRGl2RWxlbWVudDtcclxuXHJcbiAgICBwcm90ZWN0ZWQgY29uc3RydWN0b3IoY29uOiBIVE1MRWxlbWVudCwgaWQ6IHN0cmluZyA9ICdjbGllbnRfbWVzc2FnZScpIHtcclxuICAgICAgICBDX0Rpc3BsYXlNZXNzYWdlLm1lID0gdGhpcztcclxuXHJcbiAgICAgICAgdGhpcy5pZCAgID0gaWQ7XHJcbiAgICAgICAgdGhpcy5kaXYgID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JykgYXMgSFRNTERpdkVsZW1lbnQ7XHJcbiAgICAgICAgaWYgKHRoaXMuZGl2ID09PSBudWxsKSBhbGVydCgnQ2FuIG5vdCBmb3VubmQgRGl2I2NsaWVudF9tZXNzYWdlIScpO1xyXG4gICAgICAgIHRoaXMuZGl2LnNldEF0dHJpYnV0ZSgnaWQnLCB0aGlzLmlkKTtcclxuXHJcbiAgICAgICAgY29uLmluc2VydEJlZm9yZSh0aGlzLmRpdiwgY29uLmZpcnN0Q2hpbGQpO1xyXG4gICAgICAgIENfRGlzcGxheU1lc3NhZ2UubWUuY2xlYXJfbWVzc2FnZSgpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRPYmooY29uOiBIVE1MRWxlbWVudHxudWxsID0gbnVsbCwgaWQ6IHN0cmluZyA9ICdjbGllbnRfbWVzc2FnZScpXHJcbiAgICAgICAgICAgICAgICA6IENfRGlzcGxheU1lc3NhZ2UgIHtcclxuICAgICAgICBpZiAodHlwZW9mIHRoaXMubWUgIT09IFwib2JqZWN0XCIgfHwgISh0aGlzLm1lIGluc3RhbmNlb2YgQ19EaXNwbGF5TWVzc2FnZSkpIHsgXHJcbiAgICAgICAgICAgIGlmIChjb24gPT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpIGFzIEhUTUxEaXZFbGVtZW50O1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjb24pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubWUgPSBuZXcgQ19EaXNwbGF5TWVzc2FnZShjb24sIGlkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubWU7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZGlzcGxheV9tZXNzYWdlKG1lczogc3RyaW5nLCBmcl9jb2xvciA9ICdpbmhlcml0JywgYmdfY29sb3I6IHN0cmluZyA9ICdpbmhlcml0Jykge1xyXG4gICAgICAgIGNvbnN0IHAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJykgYXMgSFRNTFBhcmFncmFwaEVsZW1lbnQ7XHJcbiAgICAgICAgcC5zdHlsZS5zZXRQcm9wZXJ0eSgnY29sb3InLCAgICAgICAgICAgIGZyX2NvbG9yKTtcclxuICAgICAgICBwLnN0eWxlLnNldFByb3BlcnR5KCdiYWNrZ3JvdW5kLWNvbG9yJywgYmdfY29sb3IpO1xyXG4gICAgICAgIHAuaW5uZXJIVE1MID0gbWVzO1xyXG4gICAgICAgIC8vIOiomOmMsuWei+ODoeODg+OCu+ODvOOCuOOBquOBruOBp+WFiOmgreOBq+i/veWKoOOBl+OBpuOBhOOBj1xyXG4gICAgICAgIHRoaXMuZGl2Lmluc2VydEJlZm9yZShwLCB0aGlzLmRpdi5maXJzdENoaWxkKTsgXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNsZWFyX21lc3NhZ2UoKSB7XHJcbiAgICAgICAgd2hpbGUgKHRoaXMuZGl2LmZpcnN0Q2hpbGQpIHtcclxuICAgICAgICAgICAgdGhpcy5kaXYucmVtb3ZlQ2hpbGQodGhpcy5kaXYuZmlyc3RDaGlsZCk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBub3JtYWxfbWVzc2FnZShtZXM6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuZGlzcGxheV9tZXNzYWdlKG1lcyk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgbm90aWNlX21lc3NhZ2UobWVzOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLmRpc3BsYXlfbWVzc2FnZShtZXMsICcjMDA2NjAwJywgJyNjY2ZmY2MnKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyB3YXJuaW5nX21lc3NhZ2UobWVzOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLmRpc3BsYXlfbWVzc2FnZShtZXMsICcjZmZmZmZmJywgJyNmZjAwMDAnKTtcclxuICAgIH1cclxufVxyXG4iLCJleHBvcnQgY2xhc3MgQ19PbmVMaW5lVmlld01lc3NhZ2Uge1xyXG4gICAgcHJvdGVjdGVkIHN0YXRpYyAgbWUgOiB7W2lkOiBzdHJpbmddOiBDX09uZUxpbmVWaWV3TWVzc2FnZX07XHJcbiAgICBwcm90ZWN0ZWQgcCAgOiBIVE1MUGFyYWdyYXBoRWxlbWVudDtcclxuXHJcbiAgICBwcm90ZWN0ZWQgY29uc3RydWN0b3IoaWQ6IHN0cmluZywgcGFyZW50PzogSFRNTEVsZW1lbnQpIHtcclxuICAgICAgICBDX09uZUxpbmVWaWV3TWVzc2FnZS5tZSA/Pz0ge31cclxuICAgICAgICBDX09uZUxpbmVWaWV3TWVzc2FnZS5tZVtpZF0gPSB0aGlzO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHRoaXMucCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKSBhcyBIVE1MUGFyYWdyYXBoRWxlbWVudDtcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgdGhpcy5wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xyXG4gICAgICAgICAgICB0aGlzLnAuaWQgPSBpZDtcclxuXHJcbiAgICAgICAgICAgIHBhcmVudCA/Pz0gZG9jdW1lbnQuYm9keTtcclxuICAgICAgICAgICAgcGFyZW50LmFwcGVuZENoaWxkKHRoaXMucCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIENfT25lTGluZVZpZXdNZXNzYWdlLm1lW2lkXS5jbGVhcl9tZXNzYWdlKCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc3RhdGljIGdldE9iaihpZDogc3RyaW5nLCBwYXJlbnQ/OiBIVE1MRWxlbWVudCk6IENfT25lTGluZVZpZXdNZXNzYWdlICB7XHJcbiAgICAgICAgQ19PbmVMaW5lVmlld01lc3NhZ2UubWUgPz89IHt9XHJcbiAgICAgICAgdGhpcy5tZVtpZF0gPz89IG5ldyBDX09uZUxpbmVWaWV3TWVzc2FnZShpZCwgcGFyZW50KTtcclxuICAgICAgICByZXR1cm4gdGhpcy5tZVtpZF07XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZGlzcGxheV9tZXNzYWdlKG1lczogc3RyaW5nLCBmcl9jb2xvciA9ICdpbmhlcml0JywgYmdfY29sb3I6IHN0cmluZyA9ICdpbmhlcml0Jykge1xyXG4gICAgICAgIHRoaXMucC5zdHlsZS5zZXRQcm9wZXJ0eSgnY29sb3InLCAgICAgICAgICAgIGZyX2NvbG9yKTtcclxuICAgICAgICB0aGlzLnAuc3R5bGUuc2V0UHJvcGVydHkoJ2JhY2tncm91bmQtY29sb3InLCBiZ19jb2xvcik7XHJcbiAgICAgICAgdGhpcy5wLmlubmVySFRNTCA9IG1lcztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xlYXJfbWVzc2FnZSgpIHtcclxuICAgICAgICB0aGlzLmRpc3BsYXlfbWVzc2FnZSgn44CAJyk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgbm9ybWFsX21lc3NhZ2UobWVzOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLmRpc3BsYXlfbWVzc2FnZShtZXMpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIG5vdGljZV9tZXNzYWdlKG1lczogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5kaXNwbGF5X21lc3NhZ2UobWVzLCAnIzAwNjYwMCcsICcjY2NmZmNjJyk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgd2FybmluZ19tZXNzYWdlKG1lczogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5kaXNwbGF5X21lc3NhZ2UobWVzLCAnI2ZmZmZmZicsICcjZmYwMDAwJyk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgZ19kZWJ1ZyB9ICAgICAgICBmcm9tIFwiLi4vZF9jbW4vZ2xvYmFsXCI7XHJcbmltcG9ydCB7IGdfbWF6ZSwgZ190ZWFtIH0gZnJvbSBcIi4vZ2xvYmFsX2Zvcl9tYXplXCI7XHJcbmltcG9ydCB7IFxyXG4gICAgZG9faW5zdGFudF9sb2FkLCBcclxuICAgIGRvX2luc3RhbnRfc2F2ZSwgXHJcbiAgICBkb19tb3ZlX2JvdHRvbV9oYWxmIFxyXG59ICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gXCIuL0Zfc2V0X21vdmVfbW9kZVwiO1xyXG5cclxuXHJcbmV4cG9ydCB0eXBlIFRfQ3Rscz0ge1xyXG4gICAgbmFtZTogIHN0cmluZyxcclxuICAgIGRvX1U/OiBUX21hcmcsIFxyXG4gICAgZG9fRD86IFRfbWFyZywgXHJcbiAgICBkb19MPzogVF9tYXJnLCBcclxuICAgIGRvX1I/OiBUX21hcmcsIFxyXG4gICAgaXNPSz86IFRfbWFyZywgXHJcbiAgICBpc05HPzogVF9tYXJnLCBcclxuICAgIGlzU0w/OiBUX21hcmcsIFxyXG4gICAgaXNSVD86IFRfbWFyZywgXHJcbiAgICBtZW51PzogVF9tYXJnLCBcclxuICAgIGNwT0s/OiBUX21hcmcsIFxyXG4gICAgY3BORz86IFRfbWFyZywgXHJcbiAgICBjcFNMPzogVF9tYXJnLCBcclxuICAgIGNwUlQ/OiBUX21hcmcsIFxyXG4gICAga2V5RXZlbnQ/OiBUX2thcmcsXHJcbn1cclxudHlwZSBUX21mbmMgPSAoZT86IE1vdXNlRXZlbnQpPT4odm9pZHxib29sZWFuKTtcclxudHlwZSBUX21hcmcgPSBUX21mbmMgfCB1bmRlZmluZWQ7XHJcbiBcclxudHlwZSBUX2tmbmMgPSAoZTogS2V5Ym9hcmRFdmVudCk9Pih2b2lkfGJvb2xlYW4pO1xyXG50eXBlIFRfa2FyZyA9IFRfa2ZuYyB8IHVuZGVmaW5lZDtcclxuXHJcbmV4cG9ydCBjbGFzcyBDX0RlZmF1bHRDdGxzIHtcclxuICAgIHByb3RlY3RlZCBzdGF0aWMgbWU6IENfRGVmYXVsdEN0bHM7XHJcbiAgICBwcm90ZWN0ZWQgY3Rsczoge1tuYW1lOiBzdHJpbmddOiBUX0N0bHN9O1xyXG4gICAgcHJvdGVjdGVkIGZsZ3M6IHtbbmFtZTogc3RyaW5nXTogYm9vbGVhbn07XHJcblxyXG4gICAgcHJvdGVjdGVkIHVfYXJyOiBIVE1MQnV0dG9uRWxlbWVudDtcclxuICAgIHByb3RlY3RlZCBkX2FycjogSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcbiAgICBwcm90ZWN0ZWQgbF9hcnI6IEhUTUxCdXR0b25FbGVtZW50O1xyXG4gICAgcHJvdGVjdGVkIHJfYXJyOiBIVE1MQnV0dG9uRWxlbWVudDtcclxuICAgIHByb3RlY3RlZCB5X2J0bjogSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcbiAgICBwcm90ZWN0ZWQgbl9idG46IEhUTUxCdXR0b25FbGVtZW50O1xyXG4gICAgcHJvdGVjdGVkIHNfYnRuOiBIVE1MQnV0dG9uRWxlbWVudDtcclxuICAgIHByb3RlY3RlZCByX2J0bjogSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcbiAgICBwcm90ZWN0ZWQgbV9idG46IEhUTUxCdXR0b25FbGVtZW50O1xyXG4gICAgcHJvdGVjdGVkIHlfY3AxOiBIVE1MQnV0dG9uRWxlbWVudDtcclxuICAgIHByb3RlY3RlZCBuX2NwMTogSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcbiAgICBwcm90ZWN0ZWQgc19jcDE6IEhUTUxCdXR0b25FbGVtZW50O1xyXG4gICAgcHJvdGVjdGVkIHJfY3AxOiBIVE1MQnV0dG9uRWxlbWVudDtcclxuXHJcbiAgICBwcm90ZWN0ZWQgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5jdGxzID0ge307XHJcbiAgICAgICAgdGhpcy5mbGdzID0ge307XHJcblxyXG4gICAgICAgIHRoaXMudV9hcnIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndV9hcnInKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcclxuICAgICAgICB0aGlzLmRfYXJyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RfYXJyJykgYXMgSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcbiAgICAgICAgdGhpcy5sX2FyciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsX2FycicpIGFzIEhUTUxCdXR0b25FbGVtZW50O1xyXG4gICAgICAgIHRoaXMucl9hcnIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncl9hcnInKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcclxuICAgICAgICB0aGlzLnlfYnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3lfYnRuJykgYXMgSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcbiAgICAgICAgdGhpcy5uX2J0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduX2J0bicpIGFzIEhUTUxCdXR0b25FbGVtZW50O1xyXG4gICAgICAgIHRoaXMuc19idG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc19idG4nKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcclxuICAgICAgICB0aGlzLnJfYnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JfYnRuJykgYXMgSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcbiAgICAgICAgdGhpcy5tX2J0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtX2J0bicpIGFzIEhUTUxCdXR0b25FbGVtZW50O1xyXG4gICAgICAgIHRoaXMueV9jcDEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgneV9jcDEnKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcclxuICAgICAgICB0aGlzLm5fY3AxID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25fY3AxJykgYXMgSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcbiAgICAgICAgdGhpcy5zX2NwMSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzX2NwMScpIGFzIEhUTUxCdXR0b25FbGVtZW50O1xyXG4gICAgICAgIHRoaXMucl9jcDEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncl9jcDEnKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcclxuXHJcbiAgICAgICAgdGhpcy51X2Fyci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIHRoaXMuZF9hcnIuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICB0aGlzLmxfYXJyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgdGhpcy5yX2Fyci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIHRoaXMueV9idG4uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICB0aGlzLm5fYnRuLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgdGhpcy5zX2J0bi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIHRoaXMucl9idG4uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICB0aGlzLm1fYnRuLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgdGhpcy55X2NwMS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIHRoaXMubl9jcDEuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICB0aGlzLnNfY3AxLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgdGhpcy5yX2NwMS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRPYmooKTogQ19EZWZhdWx0Q3RscyB7XHJcbiAgICAgICAgdGhpcy5tZSA/Pz0gIG5ldyBDX0RlZmF1bHRDdGxzKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubWU7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgY2xyKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHRoaXMuY3RscyA9IHt9O1xyXG4gICAgICAgIHRoaXMuZmxncyA9IHt9O1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldChuYW1lOiBzdHJpbmd8VF9DdGxzLCBjdGxzPzpUX0N0bHMpOiBib29sZWFuIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIG5hbWUgPT09ICdzdHJpbmcnICYmIGN0bHMgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdGxzW25hbWVdID0gY3RscztcclxuICAgICAgICAgICAgICAgIHRoaXMuZmxnc1tuYW1lXSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYyA9IG5hbWUgYXMgVF9DdGxzO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdGxzW2MubmFtZV0gPSBjO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mbGdzW2MubmFtZV0gPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBybXYoY3Rsczogc3RyaW5nfFRfQ3Rscyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5hbWUgPSB0eXBlb2YgY3RscyA9PT0gJ3N0cmluZycgPyBjdGxzIDogY3Rscy5uYW1lO1xyXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5jdGxzW25hbWVdO1xyXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5mbGdzW25hbWVdO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9IGNhdGNoKGVycikge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIGRlYWN0KCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGZvciAoY29uc3QgaWkgaW4gdGhpcy5jdGxzKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmN0bHNbaWldLm5hbWUgPT09IHVuZGVmaW5lZCkgY29udGludWU7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5fcm12X2RlZmF1bHRfY3Rscyh0aGlzLmN0bHNbaWldLm5hbWUgYXMgc3RyaW5nKSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBhY3QoY3Rsczogc3RyaW5nfFRfQ3Rscyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmKCF0aGlzLmRlYWN0KCkpIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgY29uc3QgbmFtZSA9IHR5cGVvZiBjdGxzID09PSAnc3RyaW5nJyA/IGN0bHMgOiBjdGxzLm5hbWU7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9hZGRfZGVmYXVsdF9jdGxzKG5hbWUpO1xyXG4gICAgICAgIH0gY2F0Y2goZXJyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGlzX2FjdChjdGxzOiBzdHJpbmd8VF9DdGxzKTogYm9vbGVhbiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgbmFtZSA9IHR5cGVvZiBjdGxzID09PSAnc3RyaW5nJyA/IGN0bHMgOiBjdGxzLm5hbWU7XHJcbiAgICAgICAgICAgIHJldHVybiAgdGhpcy5mbGdzW25hbWVdID8/IGZhbHNlO1xyXG4gICAgICAgIH0gY2F0Y2goZXJyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGtleXNfb2ZfYWRkKCk6IHN0cmluZ1tdIHtcclxuICAgICAgICBjb25zdCBrZXlfbGlzdCA9IFtdIGFzIHN0cmluZ1tdO1xyXG4gICAgICAgIGZvciAoY29uc3QgbmFtZSBpbiB0aGlzLmN0bHMpIGtleV9saXN0LnB1c2gobmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIGtleV9saXN0O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBrZXlzX29mX2FjdCgpOiBzdHJpbmdbXSB7XHJcbiAgICAgICAgY29uc3Qga2V5X2xpc3QgPSBbXSBhcyBzdHJpbmdbXTtcclxuICAgICAgICBmb3IgKGNvbnN0IG5hbWUgaW4gdGhpcy5mbGdzKSBpZiAodGhpcy5mbGdzW25hbWVdKSBrZXlfbGlzdC5wdXNoKG5hbWUpO1xyXG4gICAgICAgIHJldHVybiBrZXlfbGlzdDtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgX3Jtdl9kZWZhdWx0X2N0bHMobmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICAgICAgLy8gZmxnc1tuYW1lXeOBjOWumue+qeOBleOCjOOBpuOBhOOBquOBhFxyXG4gICAgICAgIC8vIOOBpOOBvuOCil9hZGRfZGVmYXVsdF9jdGxz44GM44G+44Gg5ZG844Gw44KM44Gm44Gq44GEKGN0bHPjgYxhZGTjgZXjgozjgabjgarjgYQp44GL44CBXHJcbiAgICAgICAgLy8gX2FsbF9jdGxzX25hbWVbY2FsbC5uYW1lXeOBjGZhbHNlKOaXouOBq2N0bGxz44GMcmVtb3Zl44GV44KM44Gm44GE44KLKeOBquOCieOAgVxyXG4gICAgICAgIC8vIOS9leOCguOBl+OBquOBhOOAglxyXG4gICAgICAgIHRoaXMuZmxnc1tuYW1lXSA/Pz0gZmFsc2U7IFxyXG4gICAgXHJcbiAgICAgICAgaWYgKCF0aGlzLmZsZ3NbbmFtZV0pIHJldHVybiB0cnVlO1xyXG4gICAgICAgIHRoaXMuZmxnc1tuYW1lXSA9IGZhbHNlO1xyXG5cclxuICAgICAgICBjb25zdCBjID0gdGhpcy5jdGxzW25hbWVdO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgIGlmIChfYyhjPy5kb19VKSkgdGhpcy51X2Fyci5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYy5kb19VIGFzIFRfbWZuYywgZmFsc2UpO1xyXG4gICAgICAgICAgICBpZiAoX2MoYz8uZG9fRCkpIHRoaXMuZF9hcnIucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGMuZG9fRCBhcyBUX21mbmMsIGZhbHNlKTtcclxuICAgICAgICAgICAgaWYgKF9jKGM/LmRvX0wpKSB0aGlzLmxfYXJyLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjLmRvX0wgYXMgVF9tZm5jLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIGlmIChfYyhjPy5kb19SKSkgdGhpcy5yX2Fyci5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYy5kb19SIGFzIFRfbWZuYywgZmFsc2UpO1xyXG4gICAgICAgICAgICBpZiAoX2MoYz8uaXNPSykpIHRoaXMueV9idG4ucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGMuaXNPSyBhcyBUX21mbmMsIGZhbHNlKTtcclxuICAgICAgICAgICAgaWYgKF9jKGM/LmlzTkcpKSB0aGlzLm5fYnRuLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjLmlzTkcgYXMgVF9tZm5jLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIGlmIChfYyhjPy5pc1NMKSkgdGhpcy5zX2J0bi5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYy5pc1NMIGFzIFRfbWZuYywgZmFsc2UpO1xyXG4gICAgICAgICAgICBpZiAoX2MoYz8uaXNSVCkpIHRoaXMucl9idG4ucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGMuaXNSVCBhcyBUX21mbmMsIGZhbHNlKTtcclxuICAgICAgICAgICAgaWYgKF9jKGM/Lm1lbnUpKSB0aGlzLm1fYnRuLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjLm1lbnUgYXMgVF9tZm5jLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIGlmIChfYyhjPy5jcE9LKSkgdGhpcy55X2NwMS5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYy5jcE9LIGFzIFRfbWZuYywgZmFsc2UpO1xyXG4gICAgICAgICAgICBpZiAoX2MoYz8uY3BORykpIHRoaXMubl9jcDEucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGMuY3BORyBhcyBUX21mbmMsIGZhbHNlKTtcclxuICAgICAgICAgICAgaWYgKF9jKGM/LmNwU0wpKSB0aGlzLnNfY3AxLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjLmNwU0wgYXMgVF9tZm5jLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIGlmIChfYyhjPy5jcFJUKSkgdGhpcy5yX2NwMS5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYy5jcFJUIGFzIFRfbWZuYywgZmFsc2UpO1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICBpZiAoYz8ua2V5RXZlbnQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBjLmtleUV2ZW50KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywga2V5X3ByZXNzX2Z1bmN0aW9uKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLnVfYXJyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgIHRoaXMuZF9hcnIuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgdGhpcy5sX2Fyci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICB0aGlzLnJfYXJyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgIHRoaXMueV9idG4uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgdGhpcy5uX2J0bi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICB0aGlzLnNfYnRuLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgIHRoaXMucl9idG4uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgdGhpcy5tX2J0bi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICB0aGlzLnlfY3AxLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgIHRoaXMubl9jcDEuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgdGhpcy5zX2NwMS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICB0aGlzLnJfY3AxLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KCdFcnJvciBPY2N1ZXJkIGF0IFJlbW92ZSBEZWZhdWx0IEN0bHMuJyk7XHJcbiAgICAgICAgICAgIGFsZXJ0KCcnICsgZXJyKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgX2FkZF9kZWZhdWx0X2N0bHMobmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICAgICAgdGhpcy5mbGdzW25hbWVdID8/PSBmYWxzZTsgXHJcbiAgICBcclxuICAgICAgICBpZiAodGhpcy5mbGdzW25hbWVdKSByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB0aGlzLmZsZ3NbbmFtZV0gPSB0cnVlO1xyXG4gICAgXHJcbiAgICAgICAgY29uc3QgYyA9IHRoaXMuY3Rsc1tuYW1lXTtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAoX2MoYz8uZG9fVSkpIHRoaXMudV9hcnIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGMuZG9fVSBhcyBUX21mbmMsIGZhbHNlKTtcclxuICAgICAgICAgICAgaWYgKF9jKGM/LmRvX0QpKSB0aGlzLmRfYXJyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjLmRvX0QgYXMgVF9tZm5jLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIGlmIChfYyhjPy5kb19MKSkgdGhpcy5sX2Fyci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYy5kb19MIGFzIFRfbWZuYywgZmFsc2UpO1xyXG4gICAgICAgICAgICBpZiAoX2MoYz8uZG9fUikpIHRoaXMucl9hcnIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGMuZG9fUiBhcyBUX21mbmMsIGZhbHNlKTtcclxuICAgICAgICAgICAgaWYgKF9jKGM/LmlzT0spKSB0aGlzLnlfYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjLmlzT0sgYXMgVF9tZm5jLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIGlmIChfYyhjPy5pc05HKSkgdGhpcy5uX2J0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYy5pc05HIGFzIFRfbWZuYywgZmFsc2UpO1xyXG4gICAgICAgICAgICBpZiAoX2MoYz8uaXNTTCkpIHRoaXMuc19idG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGMuaXNTTCBhcyBUX21mbmMsIGZhbHNlKTtcclxuICAgICAgICAgICAgaWYgKF9jKGM/LmlzUlQpKSB0aGlzLnJfYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjLmlzUlQgYXMgVF9tZm5jLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIGlmIChfYyhjPy5tZW51KSkgdGhpcy5tX2J0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYy5tZW51IGFzIFRfbWZuYywgZmFsc2UpO1xyXG4gICAgICAgICAgICBpZiAoX2MoYz8uY3BPSykpIHRoaXMueV9jcDEuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGMuY3BPSyBhcyBUX21mbmMsIGZhbHNlKTtcclxuICAgICAgICAgICAgaWYgKF9jKGM/LmNwTkcpKSB0aGlzLm5fY3AxLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjLmNwTkcgYXMgVF9tZm5jLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIGlmIChfYyhjPy5jcFNMKSkgdGhpcy5zX2NwMS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYy5jcFNMIGFzIFRfbWZuYywgZmFsc2UpO1xyXG4gICAgICAgICAgICBpZiAoX2MoYz8uY3BSVCkpIHRoaXMucl9jcDEuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGMuY3BSVCBhcyBUX21mbmMsIGZhbHNlKTtcclxuICAgICAgICBcclxuICAgICAgICAgICAgaWYgKGM/LmtleUV2ZW50ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgYy5rZXlFdmVudCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGtleV9wcmVzc19mdW5jdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy51X2Fyci5zdHlsZS5kaXNwbGF5ID0gX2MoYz8uZG9fVSkgPyAnYmxvY2snIDogJ25vbmUnO1xyXG4gICAgICAgICAgICB0aGlzLmRfYXJyLnN0eWxlLmRpc3BsYXkgPSBfYyhjPy5kb19EKSA/ICdibG9jaycgOiAnbm9uZSc7XHJcbiAgICAgICAgICAgIHRoaXMubF9hcnIuc3R5bGUuZGlzcGxheSA9IF9jKGM/LmRvX0wpID8gJ2Jsb2NrJyA6ICdub25lJztcclxuICAgICAgICAgICAgdGhpcy5yX2Fyci5zdHlsZS5kaXNwbGF5ID0gX2MoYz8uZG9fUikgPyAnYmxvY2snIDogJ25vbmUnO1xyXG4gICAgICAgICAgICB0aGlzLnlfYnRuLnN0eWxlLmRpc3BsYXkgPSBfYyhjPy5pc09LKSA/ICdibG9jaycgOiAnbm9uZSc7XHJcbiAgICAgICAgICAgIHRoaXMubl9idG4uc3R5bGUuZGlzcGxheSA9IF9jKGM/LmlzTkcpID8gJ2Jsb2NrJyA6ICdub25lJztcclxuICAgICAgICAgICAgdGhpcy5zX2J0bi5zdHlsZS5kaXNwbGF5ID0gX2MoYz8uaXNTTCkgPyAnYmxvY2snIDogJ25vbmUnO1xyXG4gICAgICAgICAgICB0aGlzLnJfYnRuLnN0eWxlLmRpc3BsYXkgPSBfYyhjPy5pc1JUKSA/ICdibG9jaycgOiAnbm9uZSc7XHJcbiAgICAgICAgICAgIHRoaXMubV9idG4uc3R5bGUuZGlzcGxheSA9IF9jKGM/Lm1lbnUpID8gJ2Jsb2NrJyA6ICdub25lJztcclxuICAgICAgICAgICAgdGhpcy55X2NwMS5zdHlsZS5kaXNwbGF5ID0gX2MoYz8uY3BPSykgPyAnYmxvY2snIDogJ25vbmUnO1xyXG4gICAgICAgICAgICB0aGlzLm5fY3AxLnN0eWxlLmRpc3BsYXkgPSBfYyhjPy5jcE5HKSA/ICdibG9jaycgOiAnbm9uZSc7XHJcbiAgICAgICAgICAgIHRoaXMuc19jcDEuc3R5bGUuZGlzcGxheSA9IF9jKGM/LmNwU0wpID8gJ2Jsb2NrJyA6ICdub25lJztcclxuICAgICAgICAgICAgdGhpcy5yX2NwMS5zdHlsZS5kaXNwbGF5ID0gX2MoYz8uY3BSVCkgPyAnYmxvY2snIDogJ25vbmUnO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICBhbGVydCgnRXJyb3IgT2NjdWVyZCBhdCBBcHBlbmQgRGVmYXVsdCBDdGxzLicpO1xyXG4gICAgICAgICAgICBhbGVydCgnJyArIGVycik7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIF9jKGM6IFRfbWFyZyk6IGJvb2xlYW4ge1xyXG4gICAgaWYgKGMgPT09IHVuZGVmaW5lZCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgaWYgKGMgPT09IG51bGwpICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGtleV9wcmVzc19mdW5jdGlvbihlOiBLZXlib2FyZEV2ZW50KTp2b2lkICB7XHJcbiAgICBjb25zdCBuZSA9IChlLnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50KT8udmFsdWUgPT09IHVuZGVmaW5lZCAvLyBOb3QgRWRpdHRpbmcgSW5wdXRFbGVtZW50XHJcblxyXG4gICAgc3dpdGNoKGUuY29kZSkgeyAvLyBBcnJvd+OBr+WPjeW/nOOBm+OBmijjgqTjg5njg7Pjg4joh6rkvZPjgYznmbrnlJ/jgZvjgZopXHJcbiAgICAgICAgY2FzZSAnQXJyb3dVcCc6IFxyXG4gICAgICAgIGNhc2UgJ051bXBhZDUnOiBcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndV9hcnInKSBhcyBIVE1MQnV0dG9uRWxlbWVudCk/LmNsaWNrKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdLZXlPJzpcclxuICAgICAgICAgICAgICAgIGlmIChuZSkgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1X2FycicpIGFzIEhUTUxCdXR0b25FbGVtZW50KT8uY2xpY2soKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ0Fycm93RG93bic6IFxyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkX2FycicpIGFzIEhUTUxCdXR0b25FbGVtZW50KT8uY2xpY2soKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ051bXBhZDInOiBcclxuICAgICAgICAgICAgICAgIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZF9hcnInKSBhcyBIVE1MQnV0dG9uRWxlbWVudCk/LmNsaWNrKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdLZXlMJzpcclxuICAgICAgICAgICAgICAgIGlmICghbmUpIGJyZWFrOyBcclxuICAgICAgICAgICAgICAgIGlmIChnX2RlYnVnLmlzT04oKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRvX2luc3RhbnRfbG9hZCgpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RfYXJyJykgYXMgSFRNTEJ1dHRvbkVsZW1lbnQpPy5jbGljaygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdBcnJvd0xlZnQnOiBcclxuICAgICAgICBjYXNlICdOdW1wYWQxJzogXHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xfYXJyJykgYXMgSFRNTEJ1dHRvbkVsZW1lbnQpPy5jbGljaygpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnS2V5Syc6XHJcbiAgICAgICAgICAgICAgICBpZiAobmUpIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbF9hcnInKSBhcyBIVE1MQnV0dG9uRWxlbWVudCk/LmNsaWNrKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdBcnJvd1JpZ2h0JzogXHJcbiAgICAgICAgY2FzZSAnTnVtcGFkMyc6IFxyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyX2FycicpIGFzIEhUTUxCdXR0b25FbGVtZW50KT8uY2xpY2soKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ1NlbWljb2xvbic6XHJcbiAgICAgICAgICAgICAgICBpZiAobmUpIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncl9hcnInKSBhcyBIVE1MQnV0dG9uRWxlbWVudCk/LmNsaWNrKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdFbnRlcic6XHJcbiAgICAgICAgY2FzZSAnTnVtcGFkRW50ZXInOlxyXG4gICAgICAgIGNhc2UgJ0YxMCc6XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZS5zaGlmdEtleSkgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduX2J0bicpIGFzIEhUTUxCdXR0b25FbGVtZW50KT8uY2xpY2soKTtcclxuICAgICAgICAgICAgICAgIGVsc2UgICAgICAgICAgICAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3lfYnRuJykgYXMgSFRNTEJ1dHRvbkVsZW1lbnQpPy5jbGljaygpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnS2V5WSc6XHJcbiAgICAgICAgY2FzZSAnS2V5UCc6XHJcbiAgICAgICAgY2FzZSAnRGlnaXQwJzpcclxuICAgICAgICAgICAgICAgIGlmIChuZSkgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd5X2J0bicpIGFzIEhUTUxCdXR0b25FbGVtZW50KT8uY2xpY2soKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ0YxJzpcclxuICAgICAgICBjYXNlICdOdW1wYWQwJzpcclxuICAgICAgICBjYXNlICdOdW1wYWRBZGQnOlxyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduX2J0bicpIGFzIEhUTUxCdXR0b25FbGVtZW50KT8uY2xpY2soKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ0tleU4nOlxyXG4gICAgICAgIGNhc2UgJ0tleUknOlxyXG4gICAgICAgIGNhc2UgJ0RpZ2l0OCc6XHJcbiAgICAgICAgICAgICAgICBpZiAobmUpIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbl9idG4nKSBhcyBIVE1MQnV0dG9uRWxlbWVudCk/LmNsaWNrKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdLZXlVJzpcclxuICAgICAgICAgICAgICAgIGlmICghbmUpIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgaWYgKGdfZGVidWcuaXNPTigpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgeiA9IGdfdGVhbS53YWxrKCkuZ2V0X3ooKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoeiA+IDApIGdfdGVhbS53YWxrKCkuc2V0X3ooeiAtIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRvX21vdmVfYm90dG9tX2hhbGYoJ2JsaW5rX29mZicpO1xyXG4vLyAgICAgICAgICAgICAgfSBlbHNlIHtcclxuLy8gICAgICAgICAgICAgICAgICAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VfYXJyJykgYXMgSFRNTEJ1dHRvbkVsZW1lbnQpPy5jbGljaygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnS2V5RCc6XHJcbiAgICAgICAgICAgICAgICBpZiAoIW5lKSBicmVhaztcclxuICAgICAgICAgICAgICAgIGlmIChnX2RlYnVnLmlzT04oKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHogPSBnX3RlYW0ud2FsaygpLmdldF96KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHogPCBnX21hemUuZ2V0X3pfbWF4KCktMSkgZ190ZWFtLndhbGsoKS5zZXRfeih6ICsgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9fbW92ZV9ib3R0b21faGFsZignYmxpbmtfb2ZmJyk7XHJcbi8vICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4vLyAgICAgICAgICAgICAgICAgIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndV9hcnInKSBhcyBIVE1MQnV0dG9uRWxlbWVudCk/LmNsaWNrKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdLZXlNJzpcclxuICAgICAgICBjYXNlICdOdW1wYWQ3JzpcclxuICAgICAgICAgICAgICAgIGlmIChuZSkgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtX2J0bicpICAgYXMgSFRNTEJ1dHRvbkVsZW1lbnQpPy5jbGljaygpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnRjcnOlxyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzX2J0bicpIGFzIEhUTUxCdXR0b25FbGVtZW50KT8uY2xpY2soKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ0NvbW1hJzpcclxuICAgICAgICAgICAgICAgIGlmIChuZSkgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzX2J0bicpIGFzIEhUTUxCdXR0b25FbGVtZW50KT8uY2xpY2soKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ0tleVMnOlxyXG4gICAgICAgICAgICAgICAgaWYgKCFuZSkgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBpZiAoZ19kZWJ1Zy5pc09OKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBkb19pbnN0YW50X3NhdmUoKTtcclxuICAgICAgICAgICAgICAgICAgICBkb19tb3ZlX2JvdHRvbV9oYWxmKCdibGlua19vZmYnKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzX2J0bicpIGFzIEhUTUxCdXR0b25FbGVtZW50KT8uY2xpY2soKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ0YzJzpcclxuICAgICAgICBjYXNlICdOdW1wYWQ4JzpcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncl9idG4nKSBhcyBIVE1MQnV0dG9uRWxlbWVudCk/LmNsaWNrKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdLZXlSJzpcclxuICAgICAgICBjYXNlICdQZXJpb2QnOlxyXG4gICAgICAgICAgICAgICAgaWYgKG5lKSAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JfYnRuJykgYXMgSFRNTEJ1dHRvbkVsZW1lbnQpPy5jbGljaygpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgX2FsZXJ0IH0gICAgICAgZnJvbSBcIi4uL2RfY21uL2dsb2JhbFwiO1xyXG5pbXBvcnQge1RfTWFrZUVudW1UeXBlfSBmcm9tIFwiLi4vZF91dGwvVF9NYWtlRW51bVR5cGVcIjtcclxuZXhwb3J0IGNvbnN0IFRfVmlld01vZGU6e1ttb2RlOiBzdHJpbmddOiBzdHJpbmd9ID0ge1xyXG4gICAgTW92ZTogICAgICdtb3ZlJyxcclxuICAgIEJhdHQ6ICAgICAnYmF0dCcsXHJcbiAgICBNZW51OiAgICAgJ21lbnUnLFxyXG4gICAgTGRTdjogICAgICdsZHN2JyxcclxufSBhcyBjb25zdDtcclxuZXhwb3J0IHR5cGUgVF9WaWV3TW9kZSA9IFRfTWFrZUVudW1UeXBlPHR5cGVvZiBUX1ZpZXdNb2RlPjtcclxuXHJcbmV4cG9ydCBjbGFzcyBDX1N3aXRjaFZpZXcge1xyXG4gICAgcHJvdGVjdGVkIHN0YXRpYyBtZTogICBDX1N3aXRjaFZpZXc7XHJcbiAgICBwcm90ZWN0ZWQgc3RhdGljIGJvZHk6IEhUTUxFbGVtZW50O1xyXG4gICAgcHJvdGVjdGVkIHN0YXRpYyBhcnRpY2xlOiAgIHtbbmFtZTogc3RyaW5nXTogSFRNTEVsZW1lbnR8bnVsbH07XHJcbiAgICBwcm90ZWN0ZWQgc3RhdGljIGFsbF9jbGFzczogc3RyaW5nW107XHJcblxyXG4gICAgcHVibGljIE1vdmUoKTogc3RyaW5nIHtyZXR1cm4gVF9WaWV3TW9kZS5Nb3ZlO31cclxuICAgIHB1YmxpYyBCYXR0KCk6IHN0cmluZyB7cmV0dXJuIFRfVmlld01vZGUuQmF0dDt9XHJcbiAgICBwdWJsaWMgTWVudSgpOiBzdHJpbmcge3JldHVybiBUX1ZpZXdNb2RlLk1lbnU7fVxyXG4gICAgcHVibGljIE12UHQoKTogc3RyaW5nIHtyZXR1cm4gVF9WaWV3TW9kZS5NZW51O31cclxuICAgIHB1YmxpYyBMZFN2KCk6IHN0cmluZyB7cmV0dXJuIFRfVmlld01vZGUuTGRTdjt9XHJcblxyXG4gICAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIENfU3dpdGNoVmlldy5hbGxfY2xhc3MgPSBPYmplY3QudmFsdWVzKFRfVmlld01vZGUpO1xyXG4gICAgICAgIENfU3dpdGNoVmlldy5hcnRpY2xlID0ge307XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgQ19Td2l0Y2hWaWV3LmJvZHkgPSBkb2N1bWVudC5ib2R5O1xyXG5cclxuICAgICAgICAgICAgQ19Td2l0Y2hWaWV3LmFydGljbGUudmlldzNkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BhbmVfbWF6ZV92dzNEJykgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICAgICAgICAgIENfU3dpdGNoVmlldy5hcnRpY2xlLnZpZXdDaCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwYW5lX21hemVfdndDaCcpIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgICAgICAgICBDX1N3aXRjaFZpZXcuYXJ0aWNsZS5tZW51X2wgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGFuZV9tZW51X2xpc3QnKSBhcyBIVE1MRWxlbWVudDtcclxuICAgICAgICAgICAgQ19Td2l0Y2hWaWV3LmFydGljbGUubGRzdl9sID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BhbmVfbGRzdl9saXN0JykgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICAgICAgICAgIENfU3dpdGNoVmlldy5hcnRpY2xlLmxkc3ZfZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwYW5lX2xkc3ZfZGF0YScpIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgICAgICAgICBDX1N3aXRjaFZpZXcuYXJ0aWNsZS5tZW51X20gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGFuZV9tZW51X21lc2cnKSBhcyBIVE1MRWxlbWVudDtcclxuICAgICAgICAgICAgQ19Td2l0Y2hWaWV3LmFydGljbGUuZ2FtZV9tID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BhbmVfbWF6ZV9tZXNnJykgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICAgICAgICAgIENfU3dpdGNoVmlldy5hcnRpY2xlLmNvbnRscyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwYW5lX2N0bHNfYm9hZCcpIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgICAgICAgICBDX1N3aXRjaFZpZXcuYXJ0aWNsZS5tZXNzYWcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGFuZV9zeXRtX21lc2cnKSBhcyBIVE1MRWxlbWVudDtcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgX2FsZXJ0KCdMYXlvdXQgR2V0IEVycm9yOiAnICsgZXJyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy52aWV3KCdtb3ZlJyk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc3RhdGljIGdldE9iaigpOiBDX1N3aXRjaFZpZXcge1xyXG4gICAgICAgIHRoaXMubWUgPz89ICBuZXcgQ19Td2l0Y2hWaWV3KCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubWU7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgdmlldyhtb2RlOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICB0aGlzLl9fc2V0X2NsYXNzKG1vZGUpO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIF9fc2V0X2NsYXNzKGM6IHN0cmluZyk6IHZvaWQgeyBcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBDX1N3aXRjaFZpZXcuYm9keT8uY2xhc3NMaXN0LnJlbW92ZSguLi5DX1N3aXRjaFZpZXcuYWxsX2NsYXNzKTtcclxuICAgICAgICAgICAgQ19Td2l0Y2hWaWV3LmJvZHk/LmNsYXNzTGlzdC5hZGQoYyk7XHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgaWkgaW4gQ19Td2l0Y2hWaWV3LmFydGljbGUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChDX1N3aXRjaFZpZXcuYXJ0aWNsZVtpaV0gPT09IG51bGwpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgQ19Td2l0Y2hWaWV3LmFydGljbGVbaWldPy5jbGFzc0xpc3QucmVtb3ZlKC4uLkNfU3dpdGNoVmlldy5hbGxfY2xhc3MpO1xyXG4gICAgICAgICAgICAgICAgQ19Td2l0Y2hWaWV3LmFydGljbGVbaWldPy5jbGFzc0xpc3QuYWRkKGMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIF9hbGVydCgnTGF5b3V0IFNldCBFcnJvcjogJyArIGVycik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IF9taW4sIF9yb3VuZCB9ICAgZnJvbSBcIi4uL2RfdXRsL0ZfTWF0aFwiO1xyXG5pbXBvcnQgeyBDX1BvaW50IH0gICAgICAgIGZyb20gXCIuLi9kX21kbC9DX1BvaW50XCJcclxuaW1wb3J0IHsgQ19SYW5nZSB9ICAgICAgICBmcm9tIFwiLi4vZF9tZGwvQ19SYW5nZVwiO1xyXG5pbXBvcnQgeyBDX01hemVPYmpWaWV3IH0gIGZyb20gXCIuLi9kX21kbC9DX01hemVPYmpWaWV3XCI7XHJcbmltcG9ydCB7IFRfRGlyZWN0aW9uIH0gICAgZnJvbSBcIi4uL2RfbWRsL1RfRGlyZWN0aW9uXCI7XHJcbmltcG9ydCB7IENfV2FsbCB9ICAgICAgICAgZnJvbSBcIi4uL2RfbWRsL0NfV2FsbFwiO1xyXG5pbXBvcnQgeyBnX21lcyB9ICAgICAgICAgIGZyb20gXCIuLi9kX2Ntbi9nbG9iYWxcIjtcclxuaW1wb3J0IHsgZ19tYXplLCBnX3RlYW0sIGdfZHMgfSAgZnJvbSBcIi4vZ2xvYmFsX2Zvcl9tYXplXCI7XHJcblxyXG5leHBvcnQgdHlwZSBUX0Ryb3dTZXQgPSB7XHJcbiAgICBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50fG51bGwsXHJcbiAgICBjb246ICAgIENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRHxudWxsLFxyXG4gICAgZGVwdGg6ICBudW1iZXIsXHJcbiAgICB3YWxsOiAgIENfV2FsbHxudWxsLFxyXG59XHJcblxyXG5cclxuLy8gM0Tmj4/lhpnmmYLjgavkvb/nlKjjgZnjgovlpKfln5/lpInmlbDjga7mupblgplcclxuZXhwb3J0IGZ1bmN0aW9uIGluaXRfbWF6ZTNEKCk6IFRfRHJvd1NldCB7XHJcbiAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWF6ZV92aWV3M0RfY2FudmFzJykgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XHJcbiAgICBpZiAoY2FudmFzID09PSBudWxsKSB7XHJcbiAgICAgICAgZ19tZXMud2FybmluZ19tZXNzYWdlKCdDYW52YXMgaXNudCBmb3VuZCEgaWQ9TWF6ZV92aWV3M0RfY2FudmFzJyk7XHJcbiAgICAgICAgcmV0dXJuIHtjYW52YXM6IG51bGwsIGNvbjogbnVsbCwgZGVwdGg6IDAsIHdhbGw6IG51bGx9O1xyXG4gICAgfVxyXG4gICAgY29uc3QgY29uOiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkR8bnVsbCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG4gICAgaWYgKGNvbiA9PT0gbnVsbCkge1xyXG4gICAgICAgIGdfbWVzLndhcm5pbmdfbWVzc2FnZSgnQnJvd3NlciBkb250IHN1cnBwb3J0IDJEIGdyYXBoaWNzIScpO1xyXG4gICAgICAgIHJldHVybiB7Y2FudmFzOiBudWxsLCBjb246IG51bGwsIGRlcHRoOiAwLCB3YWxsOiBudWxsfTtcclxuICAgIH1cclxuXHJcbiAgICBDX01hemVPYmpWaWV3LnNldF9jb250ZXh0M0QoY29uKTtcclxuICAgIGluaXRfbWF6ZUNlbGwzRCgpO1xyXG5cclxuICAgIC8vIDNE44Oh44Kk44K644KS5o+P5YaZ44GZ44KL44Kt44Oj44Oz44OQ44K56KaB57Sg44Gu44K144Kk44K644KSQ1NT5LiK44Gu44CO6KaL44Gf55uu44CP44Gu44K144Kk44K644Gr5ZCI44KP44Gb44KLXHJcbiAgICBjYW52YXMud2lkdGggID0gY2FudmFzLmNsaWVudFdpZHRoO1xyXG4gICAgY2FudmFzLmhlaWdodCA9IGNhbnZhcy5jbGllbnRIZWlnaHQ7XHJcblxyXG4gICAgY29uc3QgZGVwdGggPSA1OyAvLyDlpYfmlbDjga7jgb/lr77lv5zjgILjg4Djg7Pjgrjjg6fjg7Pjga7opovpgJrjgZfjgpLoia/jgY/jgZnjgovjgarjgokgNSDjgYvjgoLjgZfjgozjgarjgYRcclxuXHJcbiAgICBjb25zdCB0b3BfcCA9IG5ldyBDX1BvaW50KDAsIDAsIDApO1xyXG4gICAgY29uc3QgYnRtX3AgPSBuZXcgQ19Qb2ludChjYW52YXMud2lkdGggIC0gMSwgY2FudmFzLmhlaWdodCAtIDEsIDApO1xyXG4gICAgY29uc3Qgd2FsbCAgPSBuZXcgQ19XYWxsKGRlcHRoLCBuZXcgQ19SYW5nZSh0b3BfcCwgYnRtX3ApKTtcclxuICAgIHJldHVybiB7Y2FudmFzOiBjYW52YXMsIGNvbjogY29uLCBkZXB0aDogZGVwdGgsIHdhbGw6IHdhbGx9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBpbml0X21hemVDZWxsM0QoKTogdm9pZCB7fVxyXG5cclxuXHJcbi8vIDNE5o+P5YaZ5pmC44Gu55S76Z2i5Yid5pyf5YyW44CC44Go44KK44GC44GI44Ga5aSp5LqV44Go5bqK44KS5o+P44GPXHJcbmZ1bmN0aW9uIGRyYXdfaW5pdF9tYXplM0QoKTogdm9pZCB7XHJcbiAgICBpZiAoZ19kcy5jYW52YXMgPT09IG51bGwgfHwgZ19kcy5jb24gPT09IG51bGwpIHJldHVybjtcclxuXHJcbiAgICBnX2RzLmNvbi5maWxsU3R5bGUgPSAnI2FhYWFhYSc7XHJcbiAgICBnX2RzLmNvbi5maWxsUmVjdChcclxuICAgICAgICAwLCBcclxuICAgICAgICAwLCBcclxuICAgICAgICBnX2RzLmNhbnZhcy53aWR0aCAtIDEsIFxyXG4gICAgICAgIGdldF9ob2xpem9uX2xpbmUoKSxcclxuICAgICk7XHJcblxyXG4gICAgZ19kcy5jb24uZmlsbFN0eWxlID0gJyM2NjY2ZmYnO1xyXG4gICAgZ19kcy5jb24uZmlsbFJlY3QoXHJcbiAgICAgICAgMCwgXHJcbiAgICAgICAgZ2V0X2hvbGl6b25fbGluZSgpLCBcclxuICAgICAgICBnX2RzLmNhbnZhcy53aWR0aCAgIC0gMSwgXHJcbiAgICAgICAgZ19kcy5jYW52YXMuaGVpZ2h0ICAtIDEsXHJcbiAgICApO1xyXG5cclxuICAgIGRyb3dfZmxvb3JfbGluZSgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRfaG9saXpvbl9saW5lKCk6IG51bWJlciB7XHJcbiAgICBpZiAoZ19kcy53YWxsID09PSBudWxsKSByZXR1cm4gLTE7XHJcbiAgICByZXR1cm4gZ19kcy53YWxsLmdldChnX2RzLmRlcHRoLCAwKS5tYXhfeTtcclxufVxyXG5cclxuZnVuY3Rpb24gZHJvd19mbG9vcl9saW5lKCk6IHZvaWQge1xyXG4gICAgaWYgKGdfZHMuY2FudmFzID09PSBudWxsIHx8IGdfZHMuY29uID09PSBudWxsIHx8IGdfZHMud2FsbCA9PT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgY29uc3QgY29uICAgPSBnX2RzLmNvbjtcclxuICAgIGNvbnN0IHdhbGwgID0gZ19kcy53YWxsO1xyXG4gICAgY29uc3QgZGVwdGggPSBnX2RzLmRlcHRoO1xyXG4gICAgY29uc3QgSF9kZXB0ID0gKGRlcHRoIC0gMSkgLyAyO1xyXG5cclxuICAgIGNvbnN0IGxlZnRfeCAgPSAwO1xyXG4gICAgY29uc3QgcmlnaHRfeCA9IGdfZHMuY2FudmFzLndpZHRoICAtIDE7XHJcbiAgICBjb25zdCBmcm9udF95ID0gZ19kcy5jYW52YXMuaGVpZ2h0IC0gMTtcclxuICAgIGNvbnN0IGJhY2tfeSAgPSBnZXRfaG9saXpvbl9saW5lKCk7XHJcblxyXG4gICAgY29uLnN0cm9rZVN0eWxlID0gJyM5OTk5ZmYnO1xyXG4gICAgY29uLmxpbmVXaWR0aCAgID0gMTtcclxuXHJcbiAgICAvLyDmqKrnt5oo55S76Z2i44Gr5a++44GX44Gm5rC05bmzKeOCkuW8leOBj1xyXG4gICAgZm9yICh2YXIgeSA9IDA7IHkgPCBkZXB0aCArIDE7IHkrKykge1xyXG4gICAgICAgIGNvbi5iZWdpblBhdGgoKTtcclxuICAgICAgICBjb24ubW92ZVRvKGxlZnRfeCAsIHdhbGwuZ2V0KHksIDApLm1heF95KTtcclxuICAgICAgICBjb24ubGluZVRvKHJpZ2h0X3gsIHdhbGwuZ2V0KHksIDApLm1heF95KTtcclxuICAgICAgICBjb24uc3Ryb2tlKCk7IFxyXG4gICAgfVxyXG5cclxuICAgIC8vIOe4pue3muOCkuW8leOBj1xyXG4gICAgZm9yICh2YXIgeCA9IC1IX2RlcHQ7IHggPCBIX2RlcHQgKyAxOyB4KyspIHtcclxuICAgICAgICBjb24uYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgY29uLm1vdmVUbyh3YWxsLmdldCgwLCAgICAgeCkubWluX3gsIGZyb250X3kpO1xyXG4gICAgICAgIGNvbi5saW5lVG8od2FsbC5nZXQoZGVwdGgsIHgpLm1pbl94LCBiYWNrX3kgKTtcclxuICAgICAgICBjb24uc3Ryb2tlKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBkaXNwbGF5X21hemUzRCgpOiB2b2lkIHtcclxuICAgIGlmIChnX2RzLmNhbnZhcyA9PT0gbnVsbCB8fCBnX2RzLmNvbiA9PT0gbnVsbCB8fCBnX2RzLndhbGwgPT09IG51bGwpIHJldHVybjtcclxuXHJcbiAgICBkcmF3X2luaXRfbWF6ZTNEKCk7XHJcbiAgICBkaXNwbGV5X21hc2UzRF9kaXJlY3Rpb24oKTtcclxuXHJcbiAgICBjb25zdCBkZXB0aCAgID0gIGdfZHMuZGVwdGg7XHJcbiAgICBjb25zdCBIX2RlcHRoID0gKGRlcHRoIC0gMSkgLyAyO1xyXG4gICAgZm9yICh2YXIgaiA9IGdfZHMuZGVwdGggLSAxOyBqID49IDA7IGotLSkge1xyXG4gICAgICAgIC8vIOWPs+WBtOOBjOimi+OBiOOBpuOBhOOCi+WjgeOBruaPj+WGmSAo5bem5YG044GL44KJ5o+P5YaZKVxyXG4gICAgICAgIGZvciAodmFyIGsgPSAtSF9kZXB0aDsgayA8IDA7IGsrKykgZHJvd01hemVDZWxsKGosIGspO1xyXG4gICAgICAgIC8vIOW3puWBtOOBjOimi+OBiOOBpuOBhOOCi+WjgeOBruaPj+WGmSAo5Y+z5YG044GL44KJ5o+P5YaZKVxyXG4gICAgICAgIGZvciAodmFyIGsgPSBIX2RlcHRoOyBrID4gMDsgay0tKSAgZHJvd01hemVDZWxsKGosIGspO1xyXG4gICAgICAgIC8vIOato+mdouOBruWjgeOBruaPj+WGmVxyXG4gICAgICAgIGRyb3dNYXplQ2VsbChqLCAwKTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZHJvd01hemVDZWxsKGQ6IG51bWJlciwgdzogbnVtYmVyKTogdm9pZCB7XHJcbiAgICBpZiAoZ19kcy53YWxsID09PSBudWxsKSByZXR1cm47XHJcbiAgICBjb25zdCBhcm91bmRfal9rID0gZ190ZWFtLndhbGsoKS5nZXRfYXJvdW5kKGQsIHcsIDApO1xyXG4gICAgY29uc3QgZnJvdF93YWxsICA9IGdfZHMud2FsbC5nZXQoZCwgdyk7XHJcbiAgICBjb25zdCBiYWNrX3dhbGwgID0gZ19kcy53YWxsLmdldChkICsgMSwgdyk7XHJcbiAgICBjb25zdCBtel9raW5kICAgID0gZ19tYXplLmdldF9raW5kKGFyb3VuZF9qX2spO1xyXG5cclxuICAgIGdfbWF6ZT8uZ2V0X2NlbGwoYXJvdW5kX2pfayk/LmRyb3czRChmcm90X3dhbGwsIGJhY2tfd2FsbCk7XHJcbiAgICBpZiAoZ19tYXplLmV4aXN0X29iaihhcm91bmRfal9rKSkge1xyXG4gICAgICAgIGNvbnN0IG9iaiA9IGdfbWF6ZS5nZXRfb2JqKGFyb3VuZF9qX2spO1xyXG4gICAgICAgIGlmIChvYmogIT09IG51bGwpIG9iai52aWV3KCk/LmRyb3czRChmcm90X3dhbGwsIGJhY2tfd2FsbCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBkaXNwbGV5X21hc2UzRF9kaXJlY3Rpb24oKTogdm9pZCB7XHJcbiAgICBjb25zdCBwX2RpciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXplX3ZpZXczRF9kaXJlY3Rpb25faW5mbycpIGFzIEhUTUxQYXJhZ3JhcGhFbGVtZW50O1xyXG4gICAgaWYgKHBfZGlyID09PSBudWxsKSB7XHJcbiAgICAgICAgZ19tZXMud2FybmluZ19tZXNzYWdlKCdQIGVsZW1lbnQgaXNudCBmb3VuZCEgaWQ9TWF6ZV92aWV3M0RfZGlyZWN0aW9uX2luZm8nKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB2YXIgZGlyZWN0aW9uOiBzdHJpbmc7XHJcbiAgICBjb25zdCBwID0gZ190ZWFtLmdldF9wZCgpO1xyXG4gICAgc3dpdGNoIChwLmQpIHtcclxuICAgICAgICBjYXNlIFRfRGlyZWN0aW9uLk46XHJcbiAgICAgICAgICAgIGRpcmVjdGlvbiA9ICc8c3BhbiBjbGFzcz1cImRpcmVjdGlvbl9OXCI+44CK5YyX44CLPC9zcGFuPic7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgVF9EaXJlY3Rpb24uRTpcclxuICAgICAgICAgICAgZGlyZWN0aW9uID0gJzxzcGFuIGNsYXNzPVwiZGlyZWN0aW9uX0VcIj7jgIrmnbHjgIs8L3NwYW4+JztcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBUX0RpcmVjdGlvbi5TOlxyXG4gICAgICAgICAgICBkaXJlY3Rpb24gPSAnPHNwYW4gY2xhc3M9XCJkaXJlY3Rpb25fU1wiPuOAiuWNl+OAizwvc3Bhbj4nO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFRfRGlyZWN0aW9uLlc6XHJcbiAgICAgICAgICAgIGRpcmVjdGlvbiA9ICc8c3BhbiBjbGFzcz1cImRpcmVjdGlvbl9XXCI+44CK6KW/44CLPC9zcGFuPic7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIGRpcmVjdGlvbiA9ICc8c3BhbiBjbGFzcz1cImRpcmVjdGlvbl9EXCI+44CK6KyO44CLPC9zcGFuPic7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG1lcyA9ICflnLDkuIsgJyArIChwLnogKyAxKSArICfpmo7jgIAnICsgZGlyZWN0aW9uICsgJ+OAgCh4ID0gPHNwYW4gaWQ9XCJkaXJlY3Rpb25fWFwiPicgKyBwLnggKyAnPC9zcGFuPiwgeSA9IDxzcGFuIGlkPVwiZGlyZWN0aW9uX1lcIj4nICsgcC55ICsgJzwvc3Bhbj4pJztcclxuICAgIHBfZGlyLmlubmVySFRNTCA9IG1lcztcclxufVxyXG5cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBtYXplM0RfYmxpbmtfb25fZGlyZWN0aW9uKCk6IHZvaWQge1xyXG4gICAgY29uc3QgZGlyX3ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGlyZWN0aW9uX1gnKSBhcyBIVE1MU3BhbkVsZW1lbnQ7XHJcbiAgICBpZiAoZGlyX3ggPT09IG51bGwpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBkaXJfeSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkaXJlY3Rpb25fWScpIGFzIEhUTUxTcGFuRWxlbWVudDtcclxuICAgIGlmIChkaXJfeSA9PT0gbnVsbCkgcmV0dXJuO1xyXG5cclxuICAgIHN3aXRjaCAoZ190ZWFtLndhbGsoKS5nZXRfZCgpKSB7XHJcbiAgICAgICAgY2FzZSBUX0RpcmVjdGlvbi5OOlxyXG4gICAgICAgIGNhc2UgVF9EaXJlY3Rpb24uUzpcclxuICAgICAgICAgICAgZGlyX3guY2xhc3NMaXN0LnJlbW92ZSgnYmxpbmsnKTtcclxuICAgICAgICAgICAgZGlyX3kuY2xhc3NMaXN0LmFkZCAgICgnYmxpbmsnKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGNhc2UgVF9EaXJlY3Rpb24uRTpcclxuICAgICAgICBjYXNlIFRfRGlyZWN0aW9uLlc6XHJcbiAgICAgICAgICAgIGRpcl94LmNsYXNzTGlzdC5hZGQgICAoJ2JsaW5rJyk7XHJcbiAgICAgICAgICAgIGRpcl95LmNsYXNzTGlzdC5yZW1vdmUoJ2JsaW5rJyk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgIH1cclxufVxyXG5leHBvcnQgZnVuY3Rpb24gbWF6ZTNEX2JsaW5rX29mZl9kaXJlY3Rpb24oKTogdm9pZCB7XHJcbiAgICBjb25zdCBkaXJfeCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkaXJlY3Rpb25fWCcpIGFzIEhUTUxTcGFuRWxlbWVudDtcclxuICAgIGlmIChkaXJfeCA9PT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgZGlyX3guY2xhc3NMaXN0LnJlbW92ZSgnYmxpbmsnKTtcclxuXHJcbiAgICBjb25zdCBkaXJfeSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkaXJlY3Rpb25fWScpIGFzIEhUTUxTcGFuRWxlbWVudDtcclxuICAgIGlmIChkaXJfeSA9PT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgZGlyX3kuY2xhc3NMaXN0LnJlbW92ZSgnYmxpbmsnKTtcclxufVxyXG5cclxuIiwiaW1wb3J0IHsgZ19kZWJ1ZywgZ19tZXMgfSBmcm9tIFwiLi4vZF9jbW4vZ2xvYmFsXCI7XHJcbmltcG9ydCB7IF9taW4sIF9yb3VuZCwgX21heCB9IGZyb20gJy4uL2RfdXRsL0ZfTWF0aCc7XHJcbmltcG9ydCB7IGdfbWF6ZSwgZ190ZWFtIH0gZnJvbSBcIi4vZ2xvYmFsX2Zvcl9tYXplXCI7XHJcblxyXG5sZXQgZGl2OiBIVE1MRGl2RWxlbWVudDtcclxubGV0IHByZTogSFRNTFByZUVsZW1lbnQ7XHJcblxyXG5sZXQgdmlld193ZHRoICAgICAgICA9IDA7XHJcbmxldCB2aWV3X2hnaHQgICAgICAgID0gMDtcclxubGV0IG1hcF93ZHRoICAgICAgICAgPSAwO1xyXG5sZXQgbWFwX2hnaHQgICAgICAgICA9IDA7XHJcbmxldCBmb250X3NpemU6bnVtYmVyID0gMDtcclxubGV0IGxpbmVfaGdodDpudW1iZXIgPSAwO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGluaXRfbWF6ZUNoKCk6IHZvaWQge1xyXG4gICAgZGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Rpdl9tYXplX3Z3Q2gnKSAgIGFzIEhUTUxEaXZFbGVtZW50O1xyXG4gICAgcHJlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hemVfdmlld0NoX3ByZScpIGFzIEhUTUxQcmVFbGVtZW50O1xyXG4gICAgY2FsY192aWV3Q2hfd2lkdGgoKTtcclxufVxyXG5cclxuLy8g44CQ5Yid5pyf6Kit5a6a44CRVmlld0No44Gu5qiq5bmF44KSQ1NT44GL44KJ6Kqt44G/6L6844KT44Gn6YGp5ZCI44GZ44KL5paH5a2X44Gu44K144Kk44K644KS6KiI566X44GX44Gm44K744OD44OI44GZ44KLXHJcbmZ1bmN0aW9uIGNhbGNfdmlld0NoX3dpZHRoKCk6IHZvaWQge1xyXG5cclxuICAgIHZpZXdfd2R0aCAgPSBkaXYuY2xpZW50V2lkdGg7XHJcbiAgICB2aWV3X2hnaHQgID0gZGl2LmNsaWVudEhlaWdodDtcclxuXHJcbiAgICBjb25zdCBjb2wgICAgPSBnX21hemUuZ2V0X3hfbWF4KCkgKyAxO1xyXG4gICAgY29uc3QgY29sX3B4ID0gdmlld193ZHRoICAvIGNvbDtcclxuXHJcbiAgICBjb25zdCByb3cgICAgPSBnX21hemUuZ2V0X3lfbWF4KCkgKyAxO1xyXG4gICAgY29uc3Qgcm93X3B4ID0gdmlld19oZ2h0IC8gcm93O1xyXG5cclxuICAgIGZvbnRfc2l6ZSAgID0gX3JvdW5kKF9tYXgoWzE1LjAsIF9yb3VuZCgxLjAwICogIF9taW4oW2NvbF9weCwgcm93X3B4XSksIDIpXSksIDApO1xyXG4gICAgbGluZV9oZ2h0ICAgPSBfcm91bmQoX21heChbMTUuMCwgX3JvdW5kKDEuMDAgKiAgX21pbihbY29sX3B4LCByb3dfcHhdKSwgMildKSwgMCk7XHJcblxyXG4gICAgbWFwX3dkdGggICAgPSBmb250X3NpemUgKiBjb2w7XHJcbiAgICBtYXBfaGdodCAgICA9IGxpbmVfaGdodCAqIGNvbDtcclxuXHJcbiAgICBwcmUuc2V0QXR0cmlidXRlKCd3aWR0aCcsICBtYXBfd2R0aC50b1N0cmluZygpKTtcclxuICAgIHByZS5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIG1hcF9oZ2h0LnRvU3RyaW5nKCkpO1xyXG4gICAgcHJlLnN0eWxlLnNldFByb3BlcnR5KCdmb250LXNpemUnLCAgYCR7Zm9udF9zaXplfXB4YCk7XHJcbiAgICBwcmUuc3R5bGUuc2V0UHJvcGVydHkoJ2xpbmUtaGVpZ2h0JyxgJHtsaW5lX2hnaHR9cHhgKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY2FsY192aWV3X3RvcCgpOiB2b2lkIHtcclxuXHJcbiAgICB2aWV3X3dkdGggID0gZGl2LmNsaWVudFdpZHRoO1xyXG4gICAgdmlld19oZ2h0ICA9IGRpdi5jbGllbnRIZWlnaHQ7XHJcblxyXG4gICAgY29uc3QgcGQgPSBnX3RlYW0uZ2V0X3BkKCk7XHJcblxyXG4gICAgbGV0IHRvcF94ID0gIHZpZXdfd2R0aCAvIDIgLSAocGQueCArIDEpICogZm9udF9zaXplO1xyXG4vLyAgICBpZiAodG9wX3ggPCAtdmlld193ZHRoIC8gMikgdG9wX3ggPSAtdmlld193ZHRoIC8gMjtcclxuLy8gICAgaWYgKHRvcF94ID4gbWFwX3dkdGggLSB2aWV3X3dkdGgpIHRvcF94ID0gbWFwX3dkdGggLSB2aWV3X3dkdGg7XHJcblxyXG4gICAgbGV0IHRvcF95ID0gIHZpZXdfaGdodCAvIDIgLSAocGQueSArIDEpICogbGluZV9oZ2h0O1xyXG4vLyAgICBpZiAodG9wX3kgPCAtdmlld19oZ2h0IC8gMikgdG9wX3kgPSAtdmlld19oZ2h0IC8gMjsgLy8g44OQ44Kw5a++562W44Gu6YGp5b2T5L+u5q2jXHJcbi8vICAgIGlmICh0b3BfeSA+IG1hcF9oZ2h0IC0gdmlld19oZ2h0KSB0b3BfeSA9IG1hcF9oZ2h0IC0gdmlld19oZ2h0O1xyXG5cclxuICAgIHByZS5zdHlsZS5zZXRQcm9wZXJ0eSgnbGVmdCcsICAgICAgYCR7dG9wX3h9cHhgKTtcclxuICAgIHByZS5zdHlsZS5zZXRQcm9wZXJ0eSgndG9wJywgICAgICAgYCR7dG9wX3l9cHhgKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGRpc3BsYXlfbWF6ZUNoKCk6IHZvaWQgeyBcclxuICAgIGlmIChwcmUgIT09IG51bGwpIHtwcmUuaW5uZXJUZXh0ID0gdG9fc3RyaW5nKCk7Y2FsY192aWV3X3RvcCgpfVxyXG4gICAgZWxzZSBnX21lcy53YXJuaW5nX21lc3NhZ2UoJ0NhbiBub3QgZm91bmQgcHJlI01hemVfdmlld0NoX3ByZSEhJyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRvX3N0cmluZygpOiBzdHJpbmcge1xyXG4gICAgY29uc3Qgc2l6ZV94ID0gZ19tYXplLmdldF94X21heCgpO1xyXG4gICAgY29uc3Qgc2l6ZV95ID0gZ19tYXplLmdldF95X21heCgpO1xyXG4gICAgY29uc3QgZmxvb3IgID0gZ190ZWFtLmdldF9wZCgpLnpcclxuXHJcbiAgICBsZXQgcmV0X3N0ciA9ICcnO1xyXG4gICAgZm9yIChsZXQgeSA9IDA7IHkgPCBzaXplX3k7IHkrKykge1xyXG4gICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgc2l6ZV94OyB4KyspIHtcclxuICAgICAgICAgICAgaWYgKCFnX2RlYnVnLmlzT04oKSAmJiBnX21hemUuaXNfbWFza2VkX3h5eih4LCB5LCBmbG9vcikpIHtcclxuICAgICAgICAgICAgICAgIHJldF9zdHIgKz0gJ++8uCc7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBvYmogPSBnX21hemUuZ2V0X29ial94eXooeCwgeSwgZmxvb3IpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG9iaiA9PT0gbnVsbCB8fCBvYmoudmlldygpID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXRfc3RyICs9IGdfbWF6ZS5nZXRfY2VsbF94eXooeCwgeSwgZmxvb3IpPy50b19sZXR0ZXIoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb2JqX2MgPSBvYmoudmlldygpPy5sZXR0ZXIoKSA/PyAn6KyOJztcclxuICAgICAgICAgICAgICAgICAgICByZXRfc3RyICs9IG9ial9jO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldF9zdHIgKz0gXCJcXG5cIjtcclxuICAgIH1cclxuICAgIHJldHVybiByZXRfc3RyO1xyXG59XHJcblxyXG4iLCJpbXBvcnQgeyBDX1VybE9wdCB9ICAgICAgICAgICAgICAgICAgIGZyb20gXCIuLi9kX3V0bC9DX1VybE9wdFwiO1xyXG5pbXBvcnQgeyBVRF9zYXZlLCB0bXBfc2F2ZSB9ICAgICAgICAgIGZyb20gXCIuLi9kX2Ntbi9GX2xvYWRfYW5kX3NhdmVcIjtcclxuaW1wb3J0IHsgUE9TVF9hbmRfbW92ZV9wYWdlIH0gICAgICAgICBmcm9tIFwiLi4vZF9jbW4vRl9QT1NUXCI7XHJcbmltcG9ydCB7IGdfc3RhcnRfZW52LCBnX3VybCwgZ191cmxfbWFpX2d1bGQgfSBmcm9tIFwiLi4vZF9jbW4vZ2xvYmFsXCI7XHJcblxyXG5pbXBvcnQgeyBzZXRfZ19zYXZlIH0gZnJvbSBcIi4vRl9zZXRfc2F2ZV9tb2RlXCI7XHJcbmltcG9ydCB7IGFjdF9tb3ZlX21vZGUsIGRvX21vdmVfYm90dG9tX2hhbGYgfSBmcm9tIFwiLi9GX3NldF9tb3ZlX21vZGVcIjtcclxuaW1wb3J0IHsgXHJcbiAgICBnX212bSwgXHJcbiAgICBnX21hemUsIFxyXG4gICAgZ190ZWFtLFxyXG4gICAgZ19jdGxzLFxyXG4gICAgZ192c3csXHJcbiAgICBnX2RzLCBcclxufSAgIGZyb20gXCIuL2dsb2JhbF9mb3JfbWF6ZVwiO1xyXG5cclxuXHJcbnZhciBjYW5VcDogYm9vbGVhbiAgPSAgZmFsc2U7XHJcbnZhciBjYW5EbjogYm9vbGVhbiAgPSAgZmFsc2U7XHJcblxyXG52YXIgaXNVcDogIGJvb2xlYW4gID0gIGZhbHNlO1xyXG5cclxuY29uc3QgY3Rsc191cGRuX3VwID0ge1xyXG4gICAgbmFtZTogJ3VwZG5fdXAnLCBcclxuLy8gICAgZG9fVTogIGRvX3VwLFxyXG4gICAgaXNPSzogIGRvX3VwLFxyXG4gICAgaXNORzogIGRvX2NhbmNlbCxcclxufVxyXG5jb25zdCBjdGxzX3VwZG5fZG4gPSB7XHJcbiAgICBuYW1lOiAndXBkbl9kbicsIFxyXG4vLyAgICBkb19EOiAgZG9fZG93bixcclxuICAgIGlzT0s6ICBkb19kb3duLFxyXG4gICAgaXNORzogIGRvX2NhbmNlbCxcclxufVxyXG5jb25zdCBjdGxzX3VwZG5fdWRfaHB1cCA9IHtcclxuICAgIG5hbWU6ICd1cGRuX3VkX2hwdXAnLCBcclxuLy8gICAgZG9fVTogIGhvcGVfVXAsXHJcbi8vICAgIGlzT0s6ICBkb19VRCxcclxuICAgIGRvX1U6ICBkb191cCxcclxuICAgIGRvX0Q6ICBkb19kb3duLFxyXG4gICAgaXNORzogIGRvX2NhbmNlbCxcclxufVxyXG5jb25zdCBjdGxzX3VwZG5fdWRfaHBkbiA9IHtcclxuICAgIG5hbWU6ICd1cGRuX3VkX2hwZG4nLCBcclxuLy8gICAgZG9fRDogIGhvcGVfRG93bixcclxuLy8gICAgaXNPSzogIGRvX1VELFxyXG4gICAgZG9fVTogIGRvX3VwLFxyXG4gICAgZG9fRDogIGRvX2Rvd24sXHJcbiAgICBpc05HOiAgZG9fY2FuY2VsLFxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaW5pdF9VRF9tb2RlKCk6IHZvaWQge1xyXG4gICAgZ19jdGxzLnNldChjdGxzX3VwZG5fdXApO1xyXG4gICAgZ19jdGxzLnNldChjdGxzX3VwZG5fZG4pO1xyXG4gICAgZ19jdGxzLnNldChjdGxzX3VwZG5fdWRfaHB1cCk7XHJcbiAgICBnX2N0bHMuc2V0KGN0bHNfdXBkbl91ZF9ocGRuKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFjdF9VcF9tb2RlKCk6IHZvaWQge1xyXG4gICAgaWYgKGdfdGVhbS53YWxrKCkuZ2V0X3ooKSA+IDApIHtcclxuICAgICAgICBnX212bS5ub3RpY2VfbWVzc2FnZSgn5LiK44KK44OG44Os44Od44O844K/44O844GM5pyJ44KK44G+44GZ44CC55m744KK44G+44GZ44GL77yf55m744KLIOKHkiDjgIcg55m744KJ44Gq44GEIOKHkiDinJYnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZ19tdm0ubm90aWNlX21lc3NhZ2UoJ+ihl+OBq+aIu+OCiuOBvuOBmeOBi++8n+aIu+OCiyDih5Ig44CHIOaIu+OCieOBquOBhCDih5Ig4pyWJyk7XHJcbiAgICB9XHJcblxyXG4gICAgY2FuVXAgPSB0cnVlO1xyXG4gICAgY2FuRG4gPSBmYWxzZTtcclxuICAgIGdfY3Rscy5hY3QoY3Rsc191cGRuX3VwKTtcclxuICAgIGdfdnN3LnZpZXcoZ192c3cuTW92ZSgpKTtcclxuICAgIHNldENhbnZhczNEQ2xpY2soKVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYWN0X0RuX21vZGUoKTogdm9pZCB7XHJcbiAgICBnX212bS5ub3RpY2VfbWVzc2FnZSgn5LiL44KK44OG44Os44Od44O844K/44O844GM5pyJ44KK44G+44GZ44CC6ZmN44KK44G+44GZ44GL77yf6ZmN44KK44KLIOKHkiDjgIcg6ZmN44KK44Gq44GEIOKHkiDinJYnKTtcclxuXHJcbiAgICBjYW5VcCA9IGZhbHNlO1xyXG4gICAgY2FuRG4gPSB0cnVlO1xyXG4gICAgZ19jdGxzLmFjdChjdGxzX3VwZG5fZG4pO1xyXG4gICAgZ192c3cudmlldyhnX3Zzdy5Nb3ZlKCkpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYWN0X1VEX21vZGUoKTogdm9pZCB7XHJcbiAgICBnX212bS5ub3RpY2VfbWVzc2FnZSgn5LiK5LiL44OG44Os44Od44O844K/44O844GM5pyJ44KK44G+44GZ44CC55m744KK44G+44GZ44GL77yf55m744KL4oeSIOOAhyDpmY3jgorjgosg4oeSICjihpPjgq3jg7wpIOenu+WLleOBl+OBquOBhCDih5Ig4pyWJyk7XHJcblxyXG4gICAgY2FuVXAgPSB0cnVlO1xyXG4gICAgY2FuRG4gPSB0cnVlO1xyXG4gICAgaWYgKCFpc1VwKSAgZ19jdGxzLmFjdChjdGxzX3VwZG5fdWRfaHB1cCk7XHJcbiAgICBlbHNlICAgICAgICBnX2N0bHMuYWN0KGN0bHNfdXBkbl91ZF9ocGRuKTtcclxuICAgIGdfdnN3LnZpZXcoZ192c3cuTW92ZSgpKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZG9fY2FuY2VsKCk6IHZvaWQge1xyXG4gICAgZ19tdm0uY2xlYXJfbWVzc2FnZSgpO1xyXG4gICAgYWN0X21vdmVfbW9kZSgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkb191cCgpOiB2b2lkIHtcclxuICAgIGNvbnN0IHJzbHQgPSBnX3RlYW0ud2FsaygpLmhvcGVfcF91cCgpO1xyXG5cclxuICAgIC8v44CA5LiK44KK6ZqO5q6144GM5Zyw5LiL5LiA6ZqO44Gu5aC05ZCI44Gv44K744O844OW44GX44Gm44GL44KJ6KGXKOWGkumZuuiAheOCruODq+ODiSnjgbjnp7vli5XjgZnjgotcclxuICAgIGlmIChyc2x0Lmhhc19ob3BlICYmIHJzbHQuc3Viai56IDwgMCkge1xyXG4gICAgICAgIGRvX1VEX3NhdmUoKS50aGVuKGFzeW5jICgpPT57XHJcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCB0bXBfc2F2ZSgpO1xyXG4gICAgICAgIH0pLnRoZW4oKCk9PntcclxuICAgICAgICAgICAgY29uc3Qgb3B0ID0gbmV3IENfVXJsT3B0KCk7XHJcbiAgICAgICAgICAgIG9wdC5zZXQoJ21vZGUnLCAnbG9hZCcpO1xyXG4gICAgICAgICAgICBvcHQuc2V0KCdwaWQnLCAgIGdfc3RhcnRfZW52LnBpZCk7XHJcbiAgICAgICAgICAgIG9wdC5zZXQoJ29wdCcsICAgMTAwKTtcclxuICAgICAgICAgICAgUE9TVF9hbmRfbW92ZV9wYWdlKGdfdXJsW2dfdXJsX21haV9ndWxkXSwgb3B0KTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvLyDkuIrjgorpmo7mrrXjgYzlnLDkuIvkuozpmo7ku6XkuIvjga7loLTlkIjjga/jgrvjg7zjg5bjgZfjgabjgYvjgonkuIrjga7pmo7jgavnp7vli5XjgZnjgotcclxuICAgIGlmICghcnNsdC5oYXNfaG9wZSB8fCAhZ19tYXplLndpdGhpbihyc2x0LnN1YmopKSB7XHJcbiAgICAgICAgcnNsdC5kb05HKCk7XHJcbiAgICAgICAgZ19tdm0uY2xlYXJfbWVzc2FnZSgpO1xyXG4gICAgICAgIGFjdF9tb3ZlX21vZGUoKTtcclxuICAgICAgICBkb19tb3ZlX2JvdHRvbV9oYWxmKCdibGlua19vZmYnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZG9fVURfc2F2ZSgpLnRoZW4oKCk9PntcclxuICAgICAgICAgICAgcnNsdC5kb09LKCk7XHJcbiAgICAgICAgICAgIGdfbXZtLmNsZWFyX21lc3NhZ2UoKTtcclxuICAgICAgICAgICAgYWN0X21vdmVfbW9kZSgpO1xyXG4gICAgICAgICAgICBkb19tb3ZlX2JvdHRvbV9oYWxmKCdibGlua19vZmYnKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZG9fZG93bigpOiB2b2lkIHtcclxuICAgIGNvbnN0IHJzbHQgPSBnX3RlYW0ud2FsaygpLmhvcGVfcF9kb3duKCk7XHJcbiAgICBpZiAoIXJzbHQuaGFzX2hvcGUgfHwgIWdfbWF6ZS53aXRoaW4ocnNsdC5zdWJqKSkge1xyXG4gICAgICAgIHJzbHQuZG9ORygpO1xyXG4gICAgICAgIGdfbXZtLmNsZWFyX21lc3NhZ2UoKTtcclxuICAgICAgICBhY3RfbW92ZV9tb2RlKCk7XHJcbiAgICAgICAgZG9fbW92ZV9ib3R0b21faGFsZignYmxpbmtfb2ZmJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGRvX1VEX3NhdmUoKS50aGVuKCgpPT57XHJcbiAgICAgICAgICAgIHJzbHQuZG9PSygpO1xyXG4gICAgICAgICAgICBnX212bS5jbGVhcl9tZXNzYWdlKCk7XHJcbiAgICAgICAgICAgIGFjdF9tb3ZlX21vZGUoKTtcclxuICAgICAgICAgICAgZG9fbW92ZV9ib3R0b21faGFsZignYmxpbmtfb2ZmJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRvX1VEKCk6IHZvaWQge1xyXG4gICAgaWYgKCFjYW5VcCB8fCAhY2FuRG4pIHJldHVybjtcclxuICAgIFxyXG4gICAgaWYgKGlzVXApIGRvX3VwKCk7XHJcbiAgICBlbHNlICAgICAgZG9fZG93bigpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBob3BlX1VwKCk6IHZvaWQge1xyXG4gICAgaWYgKCFjYW5VcCB8fCAhY2FuRG4pIHJldHVybjtcclxuICAgIGlzVXAgPSB0cnVlO1xyXG4gICAgZ19jdGxzLmFjdChjdGxzX3VwZG5fdWRfaHBkbik7XHJcblxyXG4gICAgaWYgKGdfdGVhbS53YWxrKCkuZ2V0X3ooKSA+IDApIHtcclxuICAgICAgICBnX212bS5ub3RpY2VfbWVzc2FnZSgn55m744KK44G+44GZ44GL77yf55m744KL4oeSIOOAhyDpmY3jgorjgosg4oeSICjihpPjgq3jg7wpIOenu+WLleOBl+OBquOBhCDih5Ig4pyWJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGdfbXZtLm5vdGljZV9tZXNzYWdlKCfooZfjgavmiLvjgorjgb7jgZnjgYvvvJ/miLvjgovih5Ig44CHIOmZjeOCiuOCiyDih5IgKOKGk+OCreODvCkg56e75YuV44GX44Gq44GEIOKHkiDinJYnKTtcclxuICAgIH07XHJcbn1cclxuZnVuY3Rpb24gaG9wZV9Eb3duKCk6IHZvaWQge1xyXG4gICAgaWYgKCFjYW5VcCB8fCAhY2FuRG4pIHJldHVybjtcclxuICAgIGlzVXAgPSBmYWxzZTtcclxuICAgIGdfY3Rscy5hY3QoY3Rsc191cGRuX3VkX2hwdXApO1xyXG5cclxuICAgIGdfbXZtLm5vdGljZV9tZXNzYWdlKCfpmY3jgorjgb7jgZnjgYvvvJ/pmY3jgorjgovih5Ig44CHIOeZu+OCiyDih5IgKOKGkeOCreODvCkg56e75YuV44GX44Gq44GEIOKHkiDinJYnKTtcclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gZG9fVURfc2F2ZSgpOiBQcm9taXNlPGFueXx1bmRlZmluZWQ+IHtcclxuICAgIHNldF9nX3NhdmUoXHJcbiAgICAgICAgLyogc2F2ZV9pZDogKi8gICAtMSxcclxuICAgICAgICAvKiB1bmlxX25vOiAqLyAgIC0xLFxyXG4gICAgICAgIC8qIHRpdGxlOiAqLyAgICAgJ+iHquWLleS/neWtmOODh+ODvOOCvycsIFxyXG4gICAgICAgIC8qIGRldGFpbDogKi8gICAgJycsXHJcbiAgICAgICAgLyogcG9pbnQ6ICovICAgICBcclxuICAgICAgICAgICAgICAgICAgICBg44COJHtnX21hemUuZ2V0X25hbWUoKX3jgI8gYCBcclxuICAgICAgICAgICAgICAgICAgICArIGDlnLDkuIsgJHtnX3RlYW0ud2FsaygpLmdldF9wZCgpLnogKyAxfemajuWxpCBgIFxyXG4gICAgICAgICAgICAgICAgICAgICsgYChYOiAke2dfdGVhbS53YWxrKCkuZ2V0X3BkKCkueH0sIFk6ICR7Z190ZWFtLmdldF9wZCgpLnl9KWAsXHJcbiAgICAgICAgLyogYXV0b19tb2RlOiAqLyB0cnVlLFxyXG4gICAgKTtcclxuICAgIHJldHVybiBVRF9zYXZlKCk7XHJcbn1cclxuXHJcblxyXG5cclxuXHJcblxyXG5mdW5jdGlvbiBzZXRDYW52YXMzRENsaWNrKCk6IHZvaWQge1xyXG4gICAgaWYgKGdfZHM/LmNhbnZhcyA9PT0gbnVsbCkgICAgIHJldHVybjtcclxuICAgIGdfZHMuY2FudmFzLm9uY2xpY2sgPSBjYW52YXMzRGNsaWNrO1xyXG59XHJcbmZ1bmN0aW9uIGNsckNhbnZhczNEQ2xpY2soKTogdm9pZCB7XHJcbiAgICBpZiAoZ19kcz8uY2FudmFzID09PSBudWxsKSAgICAgcmV0dXJuO1xyXG4gICAgZ19kcy5jYW52YXMub25jbGljayA9ICgpPT57fTtcclxufVxyXG5cclxuZnVuY3Rpb24gY2FudmFzM0RjbGljayhldjogTW91c2VFdmVudCk6IHZvaWQge1xyXG4gICAgaWYgKGdfZHM/LmNhbnZhcyA9PT0gbnVsbCkgICAgIHJldHVybjtcclxuICAgIGlmIChldi50YXJnZXQgIT09IGdfZHMuY2FudmFzKSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgY3ZzID0gZ19kcy5jYW52YXM7XHJcbi8vZGVidWcgICAgYWxlcnQoYHg9JHsoZXYub2Zmc2V0WD8/LTEpfSwgeT0keyhldi5vZmZzZXRZPz8tMSl9YCk7XHJcblxyXG4gICAgY29uc3QgbGVmdF9wYW5lX3IgID0gY3ZzLmNsaWVudFdpZHRoICAqIDAuMzU7XHJcbiAgICBjb25zdCByZ2h0X3BhbmVfbCAgPSBjdnMuY2xpZW50V2lkdGggICogMC42NTtcclxuICAgIGNvbnN0IGJhY2tfcGFuZV91ICA9IGN2cy5jbGllbnRIZWlnaHQgKiAwLjUwO1xyXG5cclxuICAgIC8vIOOCreODo+ODs+ODkOOCueOBruW3puWBtFxyXG4gICAgaWYgKGV2Lm9mZnNldFggPCBsZWZ0X3BhbmVfcikgeyhkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbl9idG4nKSBhcyBIVE1MQnV0dG9uRWxlbWVudCk/LmNsaWNrKCk7IHJldHVybjt9XHJcbiAgICAvLyDjgq3jg6Pjg7Pjg5Djgrnjga7lj7PlgbRcclxuICAgIGlmIChldi5vZmZzZXRYID4gcmdodF9wYW5lX2wpIHsoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3lfYnRuJykgYXMgSFRNTEJ1dHRvbkVsZW1lbnQpPy5jbGljaygpOyByZXR1cm47fVxyXG4gICAgLy/jgq3jg6Pjg7Pjg5Djgrnjga7kuK3lpK7kuIoo5YmN6YCyKVxyXG4gICAgaWYgKGV2Lm9mZnNldFkgPCBiYWNrX3BhbmVfdSkgeyhkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndV9hcnInKSBhcyBIVE1MQnV0dG9uRWxlbWVudCk/LmNsaWNrKCk7IHJldHVybjt9XHJcbiAgICAvLyDjgq3jg6Pjg7Pjg5Djgrnjga7kuK3lpK7kuIso5b6M6YCAKVxyXG4gICAgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkX2FycicpIGFzIEhUTUxCdXR0b25FbGVtZW50KT8uY2xpY2soKTsgcmV0dXJuO1xyXG59XHJcblxyXG5cclxuXHJcbiIsImltcG9ydCB7IF9pc051bSB9ICAgICAgICAgIGZyb20gXCIuLi9kX3V0bC9GX01hdGhcIjtcclxuaW1wb3J0IHsgQ19DdGxDdXJzb3IgfSAgICAgZnJvbSBcIi4uL2RfY3RsL0NfQ3RsQ3Vyc29yXCI7XHJcbmltcG9ydCB7IGRvX21vdmVfYm90dG9tX2hhbGYsIGFjdF9tb3ZlX21vZGUgfSBmcm9tIFwiLi9GX3NldF9tb3ZlX21vZGVcIjtcclxuaW1wb3J0IHsgYWN0X2xvYWRfbW9kZSwgYWN0X3NhdmVfbW9kZSAgIH0gICAgIGZyb20gXCIuL0Zfc2V0X3NhdmVfbW9kZVwiO1xyXG5pbXBvcnQgeyBhY3RfbXZwdF9tb2RlfSAgICAgICAgICAgICAgICAgICAgICAgZnJvbSBcIi4vRl9zZXRfbXZwdF9tb2RlXCI7XHJcbmltcG9ydCB7IGdfY3RscywgZ19jdm0sIGdfdnN3IH0gICAgICAgICAgICAgICBmcm9tIFwiLi9nbG9iYWxfZm9yX21hemVcIjtcclxuXHJcbmxldCAgIGRvbV9tZW51X2xpc3Q6ICBIVE1MVUxpc3RFbGVtZW50O1xyXG5sZXQgICBtZW51X2xpc3RfY3JzcjogQ19DdGxDdXJzb3I7XHJcbmxldCAgIGlkeDogICBudW1iZXIgICA9ICAgMDtcclxuXHJcbmNvbnN0IGN0bHNfbWVudV9ub3IgPSB7XHJcbiAgICBuYW1lOiAnbWVudV9ub3InLCBcclxuICAgIGRvX1U6ICBkb19VLFxyXG4gICAgZG9fRDogIGRvX0QsXHJcbiAgICBpc09LOiAgaXNPSyxcclxuICAgIGlzTkc6ICBpc05HLFxyXG4gICAgaXNSVDogIGlzTkcsXHJcbiAgICBjcFJUOiAgaXNORyxcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGluaXRfbWVudV9tb2RlKCk6IHZvaWQge1xyXG4gICAgaW5pdF92aWV3KCk7XHJcbiAgICBpbml0X2N0bHMoKTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gYWN0X21lbnVfbW9kZSgpOiB2b2lkIHtcclxuICAgIGlkeCA9IDA7XHJcbiAgICBtZW51X2xpc3RfY3Jzci5zZXRfcG9zKGlkeCk7XHJcbiAgICBnX2N0bHMuYWN0KGN0bHNfbWVudV9ub3IpO1xyXG4gICAgZ192c3cudmlldyhnX3Zzdy5NZW51KCkpOyBcclxufVxyXG5cclxuZnVuY3Rpb24gaW5pdF92aWV3KCk6IGJvb2xlYW4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBtZW51X2xpc3QgICA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtZW51X2xpc3QnKSBhcyBIVE1MVUxpc3RFbGVtZW50O1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbWVudV9saXN0LmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBtZW51X2xpc3QuY2hpbGRyZW5baV0gYXMgSFRNTExJRWxlbWVudDtcclxuICAgICAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgX09LX21lbnVfRm5jLCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkb21fbWVudV9saXN0ICA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtZW51X2xpc3QnKSBhcyBIVE1MVUxpc3RFbGVtZW50O1xyXG4gICAgICAgIG1lbnVfbGlzdF9jcnNyID0gQ19DdGxDdXJzb3IuZ2V0T2JqKGRvbV9tZW51X2xpc3QpO1xyXG4gICAgfSBjYXRjaChlcnIpIHtcclxuICAgICAgICBhbGVydCgnRXJyb3I6ICcgKyBlcnIpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIHJldHVybiB0cnVlO1xyXG59XHJcbmZ1bmN0aW9uIF9PS19tZW51X0ZuYyh0aGlzOiBIVE1MTElFbGVtZW50LCBlOiBNb3VzZUV2ZW50KTogdm9pZCB7XHJcbiAgICBfX2lzT0sodGhpcy5pZCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluaXRfY3RscygpOiB2b2lkIHtcclxuICAgIGdfY3Rscy5zZXQoY3Rsc19tZW51X25vcik7XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBpc09LKCk6IHZvaWQge1xyXG4gICAgY29uc3QgbWVudV9saXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21lbnVfbGlzdCcpIGFzIEhUTUxVTGlzdEVsZW1lbnQ7XHJcbiAgICBpZiAobWVudV9saXN0ID09PSBudWxsKSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgY2hpbGRyZW4gPSBtZW51X2xpc3QuY2hpbGRyZW47XHJcbiAgICBpZiAoaWR4IDwgMCB8fCBpZHggPiBjaGlsZHJlbi5sZW5ndGggLSAxKSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgbGkgPSBjaGlsZHJlbi5pdGVtKGlkeCkgYXMgSFRNTExJRWxlbWVudDtcclxuICAgIF9faXNPSyhsaS5pZCk7XHJcbn1cclxuZnVuY3Rpb24gX19pc09LKGlkOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIHN3aXRjaCAoaWQpIHtcclxuICAgICAgICBjYXNlICdtZW51X2xvYWQnOiBkb19sb2FkKCk7cmV0dXJuO1xyXG4gICAgICAgIGNhc2UgJ21lbnVfc2F2ZSc6IGRvX3NhdmUoKTtyZXR1cm47XHJcbiAgICAgICAgY2FzZSAnbWVudV9tdnB0JzogZG9fbXZwdCgpO3JldHVybjtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gaXNORygpOiB2b2lkIHtcclxuICAgIGdfY3ZtLmNsZWFyX21lc3NhZ2UoKTtcclxuICAgIGFjdF9tb3ZlX21vZGUoKTtcclxuICAgIGRvX21vdmVfYm90dG9tX2hhbGYoJ2JsaW5rX29mZicpO1xyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gZG9fVSgpOiB2b2lkIHtcclxuICAgIGdfY3ZtLmNsZWFyX21lc3NhZ2UoKTtcclxuICAgIGlkeCA9IG1lbnVfbGlzdF9jcnNyLnBvc19VKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRvX0QoKTogdm9pZCB7XHJcbiAgICBnX2N2bS5jbGVhcl9tZXNzYWdlKCk7XHJcbiAgICBpZHggPSBtZW51X2xpc3RfY3Jzci5wb3NfRCgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkb19sb2FkKCk6IHZvaWQge1xyXG4gICAgYWN0X2xvYWRfbW9kZSgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkb19zYXZlKCk6IHZvaWQge1xyXG4gICAgYWN0X3NhdmVfbW9kZSgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkb19tdnB0KCk6IHZvaWQge1xyXG4gICAgYWN0X212cHRfbW9kZSgpO1xyXG59XHJcbiIsIlxyXG4gICAgLyoqKioqKioqKioqKiAqKioqKioqKioqKioqKioqKioqKioqKioqKiogKioqKioqKioqKioqKiovXHJcbiAgICAvKiAgSFRNTFByZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwcmUnKTsgICAgKi9cclxuICAgIC8qICBIVE1MRWxlbWVudD8uc2V0QXR0cmlidXRlKCdpZCcsICd1X2FycmF3Jyk7ICAgICAgICAqL1xyXG4gICAgLyogIEhUTUxFbGVtZW50Py5zdHlsZS5zZXRQcm9wZXJ0eSgnZGlzcGxheScsICdncmlkJyk7ICovXHJcbiAgICAvKiAgSFRNTEVsZW1lbnQ/LmFwcGVuZENoaWxkKEhUTUxFbGVtZW50KTsgICAgICAgICAgICAgKi9cclxuICAgIC8qKioqKioqKioqKiogKioqKioqKioqKioqKioqKioqKioqKioqKioqICoqKioqKioqKioqKioqL1xyXG5cclxuaW1wb3J0IHsgaW5pdF9tb3ZlX21vZGUgfSBmcm9tIFwiLi9GX3NldF9tb3ZlX21vZGVcIjtcclxuaW1wb3J0IHsgaW5pdF9tZW51X21vZGUgfSBmcm9tIFwiLi9GX3NldF9tZW51X21vZGVcIjtcclxuaW1wb3J0IHsgaW5pdF9tdnB0X21vZGUgfSBmcm9tIFwiLi9GX3NldF9tdnB0X21vZGVcIjtcclxuaW1wb3J0IHsgaW5pdF9TTF9tb2RlIH0gICBmcm9tIFwiLi9GX3NldF9zYXZlX21vZGVcIjtcclxuaW1wb3J0IHsgaW5pdF9VRF9tb2RlIH0gICBmcm9tIFwiLi9GX3NldF9VRF9tb2RlXCI7XHJcbmltcG9ydCB7IFRfQ3Rsc01vZGUgfSAgICAgICAgICBmcm9tIFwiLi9UX0N0bHNNb2RlXCI7XHJcbmltcG9ydCB7IGdfY3RscywgZ19jdGxzX21vZGUgfSBmcm9tIFwiLi9nbG9iYWxfZm9yX21hemVcIjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpbml0X2FsbF9tb2RlKCk6IHZvaWQge1xyXG4gICAgZ19jdGxzLmRlYWN0KCk7XHJcbiAgICBpbml0X21vdmVfbW9kZSgpO1xyXG4gICAgaW5pdF9tZW51X21vZGUoKTtcclxuICAgIGluaXRfbXZwdF9tb2RlKCk7XHJcbiAgICBpbml0X1NMX21vZGUoKTtcclxuICAgIGluaXRfVURfbW9kZSgpXHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGhpZGVfY29udHJvbGxlcygpOiB2b2lkIHtcclxuLy8gICAgZ19jdGxzX21vZGVbMF0gPSBUX0N0bHNNb2RlLk5vcDtcclxuICAgIGdfY3Rscy5kZWFjdCgpO1xyXG4gICAgY29uc3QgbW92ZV9jdGxfdmlldyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwYW5lX2N0bHNfYm9hZCcpIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgbW92ZV9jdGxfdmlldz8uc3R5bGUuc2V0UHJvcGVydHkoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG59XHJcbiIsImltcG9ydCB7IFRfTXpLaW5kIH0gICAgICAgICAgICAgICAgICAgZnJvbSBcIi4uL2RfbWRsL1RfTXpLaW5kXCI7XHJcbmltcG9ydCB7IElfSG9wZUFjdGlvbiB9ICAgICAgICAgICAgICAgZnJvbSBcIi4uL2RfbWRsL0lfQ29tbW9uXCI7XHJcbmltcG9ydCB7IENfUG9pbnQgfSAgICAgICAgICAgICAgICAgICAgZnJvbSBcIi4uL2RfbWRsL0NfUG9pbnRcIjtcclxuaW1wb3J0IHsgZ19kZWJ1ZyB9ICAgICAgICAgICAgICAgICAgICBmcm9tIFwiLi4vZF9jbW4vZ2xvYmFsXCI7XHJcbmltcG9ydCB7IGluc3RhbnRfbG9hZCwgaW5zdGFudF9zYXZlIH0gZnJvbSBcIi4uL2RfY21uL0ZfbG9hZF9hbmRfc2F2ZVwiO1xyXG5pbXBvcnQgeyBhY3RfbWVudV9tb2RlIH0gICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSBcIi4vRl9zZXRfbWVudV9tb2RlXCI7XHJcbmltcG9ydCB7IGFjdF9VcF9tb2RlLCBhY3RfRG5fbW9kZSwgYWN0X1VEX21vZGUgfSBmcm9tIFwiLi9GX3NldF9VRF9tb2RlXCI7XHJcbmltcG9ydCB7IGRlY29kZV9hbGwsIHNldF9nX3NhdmUgfSAgICAgICAgICAgICAgICBmcm9tIFwiLi9GX3NldF9zYXZlX21vZGVcIjtcclxuaW1wb3J0IHsgZGlzcGxheV9tYXplQ2h9ICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gXCIuL0ZfZGlzcGxheV9tYXplQ2hcIjsgXHJcbmltcG9ydCB7IGRpc3BsYXlfbWF6ZTNELCBcclxuICAgICAgICAgbWF6ZTNEX2JsaW5rX29uX2RpcmVjdGlvbiwgbWF6ZTNEX2JsaW5rX29mZl9kaXJlY3Rpb24gfSAgIGZyb20gXCIuL0ZfZGlzcGxheV9tYXplM0RcIjtcclxuaW1wb3J0IHsgXHJcbiAgICBnX212bSwgXHJcbiAgICBnX3ZzdywgXHJcbiAgICBnX21hemUsIFxyXG4gICAgZ190ZWFtLFxyXG4gICAgZG9fbG9hZF9ib3R0b21faGFsZixcclxuICAgIGdfY3RscyxcclxuICAgIGdfZHMsIFxyXG59IGZyb20gXCIuL2dsb2JhbF9mb3JfbWF6ZVwiO1xyXG5cclxuY29uc3QgY3Rsc19tb3ZlX25vciA9IHtcclxuICAgIG5hbWU6ICdtb3ZlX25vcicsIFxyXG4gICAgZG9fVTogIGdvX0YsXHJcbiAgICBkb19EOiAgZ29fQixcclxuICAgIGRvVUw6ICBnb19MLFxyXG4gICAgZG9VUjogIGdvX1IsXHJcbiAgICBkb19MOiAgdHJfTCxcclxuICAgIGRvX1I6ICB0cl9SLFxyXG4gICAgbWVudTogIG1lbnUsXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpbml0X21vdmVfbW9kZSgpOiB2b2lkIHtcclxuICAgIGdfY3Rscy5zZXQoY3Rsc19tb3ZlX25vcik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhY3RfbW92ZV9tb2RlKCk6IHZvaWQge1xyXG4gICAgZ19jdGxzLmFjdChjdGxzX21vdmVfbm9yKTtcclxuICAgIGdfdnN3LnZpZXcoZ192c3cuTW92ZSgpKTtcclxuICAgIHNldENhbnZhczNEQ2xpY2soKTtcclxufVxyXG5cclxuXHJcbiAgICAvKioqKioqKioqKioqICoqKioqKioqKioqKioqKioqKioqKioqKioqKiAqKioqKioqKioqKioqKi9cclxuICAgIC8qICBIVE1MUHJlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ByZScpOyAgICAqL1xyXG4gICAgLyogIEhUTUxFbGVtZW50Py5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3VfYXJyYXcnKTsgICAgICAgICovXHJcbiAgICAvKiAgSFRNTEVsZW1lbnQ/LnN0eWxlLnNldFByb3BlcnR5KCdkaXNwbGF5JywgJ2dyaWQnKTsgKi9cclxuICAgIC8qICBIVE1MRWxlbWVudD8uYXBwZW5kQ2hpbGQoSFRNTEVsZW1lbnQpOyAgICAgICAgICAgICAqL1xyXG4gICAgLyoqKioqKioqKioqKiAqKioqKioqKioqKioqKioqKioqKioqKioqKiogKioqKioqKioqKioqKiovXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZG9faW5zdGFudF9sb2FkKCk6IHZvaWQge1xyXG4gICAgaW5zdGFudF9sb2FkKCkudGhlbigoanNvbk9iajphbnkpPT57ICBcclxuICAgICAgICBkZWNvZGVfYWxsKGpzb25PYmo/LnNhdmUpO1xyXG4gICAgICAgIGRvX2xvYWRfYm90dG9tX2hhbGYoJ+ODreODvOODieOBl+OBvuOBl+OBnycpOyAgXHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGRvX2luc3RhbnRfc2F2ZSgpOiB2b2lkIHtcclxuICAgIHNldF9nX3NhdmUoXHJcbiAgICAgICAgLyogc2F2ZV9pZDogKi8gICAtMSxcclxuICAgICAgICAvKiB1bmlxX25vOiAqLyAgIC0xLFxyXG4gICAgICAgIC8qIHRpdGxlOiAqLyAgICAgJ+ewoeaYk+S/neWtmOODh+ODvOOCvycsIFxyXG4gICAgICAgIC8qIGRldGFpbDogKi8gICAgJycsIFxyXG4gICAgICAgICAgICAgICAgICAgIGDjgI4ke2dfbWF6ZS5nZXRfbmFtZSgpfeOAjyBgIFxyXG4gICAgICAgICAgICAgICAgICAgICsgYOWcsOS4iyAke2dfdGVhbS5nZXRfcGQoKS56ICsgMX3pmo7lsaQgYCBcclxuICAgICAgICAgICAgICAgICAgICArIGAoWDogJHtnX3RlYW0uZ2V0X3BkKCkueH0sIFk6ICR7Z190ZWFtLmdldF9wZCgpLnl9KWAsXHJcbiAgICAgICAgLyogYXV0b19tb2RlOiAqLyB0cnVlLFxyXG4gICAgKTtcclxuICAgIGluc3RhbnRfc2F2ZSgpO1xyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gY2xlYXJfbWFza19hcm91bmRfdGhlX3RlYW0oKTogdm9pZCB7XHJcbiAgICBnX21hemUuY2xlYXJfbWFza19hcm91bmRfdGhlX3RlYW0oZ190ZWFtKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY2hhbmdlX3VuZXhwX3RvX2Zsb29yKHA6IENfUG9pbnQpOiB2b2lkIHtcclxuICAgIGdfbWF6ZS5jaGFuZ2VfdW5leHBfdG9fZmxvb3IocCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdvX0YoKTogdm9pZCB7XHJcbiAgICBjb25zdCByc2x0ID0gZ190ZWFtLndhbGsoKS5ob3BlX3BfZndkKCk7XHJcbiAgICBtb3ZlX2NoZWNrKHJzbHQpO1xyXG4gICAgZG9fbW92ZV9ib3R0b21faGFsZignYmxpbmtfb24nKTtcclxufVxyXG5mdW5jdGlvbiBnb19CKCk6IHZvaWQge1xyXG4gICAgY29uc3QgcnNsdCA9IGdfdGVhbS53YWxrKCkuaG9wZV9wX2JhaygpO1xyXG4gICAgbW92ZV9jaGVjayhyc2x0KTtcclxuICAgIGRvX21vdmVfYm90dG9tX2hhbGYoJ2JsaW5rX29uJyk7XHJcbn1cclxuZnVuY3Rpb24gZ29fTCgpOiB2b2lkIHtcclxuICAgIGNvbnN0IHJzbHQgPSBnX3RlYW0ud2FsaygpLmhvcGVfcF9sZnQoKTtcclxuICAgIG1vdmVfY2hlY2socnNsdCk7XHJcbiAgICBkb19tb3ZlX2JvdHRvbV9oYWxmKCdibGlua19vbicpO1xyXG59XHJcbmZ1bmN0aW9uIGdvX1IoKTogdm9pZCB7XHJcbiAgICBjb25zdCByc2x0ID0gZ190ZWFtLndhbGsoKS5ob3BlX3Bfcmd0KCk7XHJcbiAgICBtb3ZlX2NoZWNrKHJzbHQpO1xyXG4gICAgZG9fbW92ZV9ib3R0b21faGFsZignYmxpbmtfb24nKTtcclxufVxyXG5mdW5jdGlvbiB0cl9SKCk6IHZvaWQge1xyXG4gICAgY29uc3QgcnNsdCA9IGdfdGVhbS53YWxrKCkuaG9wZV90dXJuX3IoKTtcclxuICAgIG1vdmVfY2hlY2socnNsdCk7XHJcbiAgICBkb19tb3ZlX2JvdHRvbV9oYWxmKCdibGlua19vZmYnKTtcclxufVxyXG5mdW5jdGlvbiB0cl9MKCk6IHZvaWQge1xyXG4gICAgY29uc3QgcnNsdCA9IGdfdGVhbS53YWxrKCkuaG9wZV90dXJuX2woKTtcclxuICAgIG1vdmVfY2hlY2socnNsdCk7XHJcbiAgICBkb19tb3ZlX2JvdHRvbV9oYWxmKCdibGlua19vZmYnKTtcclxufVxyXG5mdW5jdGlvbiBtb3ZlX2NoZWNrKHI6IElfSG9wZUFjdGlvbik6IHZvaWQge1xyXG4gICAgZ19tdm0uY2xlYXJfbWVzc2FnZSgpO1xyXG4gICAgLy8g5ZGo5Zuy44Gr44Kq44OW44K444Kn44GM5pyJ44KM44Gw44Kq44OW44K444Kn5o6l6L+R5Yem55CGXHJcbiAgICBhcm91bmRfb2JqKHIpO1xyXG5cclxuICAgIGlmICghci5oYXNfaG9wZSkgcmV0dXJuO1xyXG4gICAgaWYgKHIuaG9wZSA9PSAnVHVybicpIHtcclxuICAgICAgICByLmRvT0soKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAoci5ob3BlID09ICdNb3ZlJykge1xyXG4gICAgICAgIGNvbnN0IGNlbGwgPSBnX21hemUuZ2V0X2NlbGwoci5zdWJqKTtcclxuXHJcbiAgICAgICAgLy8g6YCy6KGM5pa55ZCR44GM5aOB562J44Gq44KJ56e75YuV5LiN5Y+vXHJcbiAgICAgICAgaWYgKCFjZWxsPy5nZXRPYmooKS5jYW5UaHJvdWdoKCkpIHtcclxuICAgICAgICAgICAgZG9udF9tb3ZlKHIpO3JldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3Qgb2JqID0gZ19tYXplLmdldF9vYmooci5zdWJqKTtcclxuICAgICAgICBpZiAob2JqICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGlmIChvYmouY2FuVGhyb3VnaCgpKSB7XHJcbiAgICAgICAgICAgICAgICAvLyDpgLLooYzmlrnlkJHjgavjgqrjg5bjgrjjgqfjgYzmnInjgorpgJrjgormipzjgZHlj6/og73jgarjgolcclxuICAgICAgICAgICAgICAgIC8vIOenu+WLleOBl+OBpuOCquODluOCuOOCp+WHpueQhlxyXG4gICAgICAgICAgICAgICAgci5kb09LKCk7XHJcbiAgICAgICAgICAgICAgICBhY3Rpb25fb2JqKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyDpgLLooYzmlrnlkJHjgavjgqrjg5bjgrjjgqfjgYzmnInjgorpgJrjgormipzjgZHkuI3og73jgarjgolcclxuICAgICAgICAgICAgICAgIC8vIOenu+WLleOBm+OBmuOBq+OCquODluOCuOOCp+aOpei/keWHpueQhijku6XpmY3jga7pmo7mrrXlh6bnkIbnrYnjga/jgrnjg6vjg7wpXHJcbiAgICAgICAgICAgICAgICBkb250X21vdmUocik7XHJcbiAgICAgICAgICAgICAgICBhcm91bmRfb2JqKHIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8g6YCy6KGM5pa55ZCR44Gr44Kq44OW44K444Kn44GM54Sh44GR44KM44Gw56e75YuVXHJcbiAgICAgICAgICAgIHIuZG9PSygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDnp7vli5XlhYjjgYzpmo7mrrXjgarjgonpmo7mrrXjga7lh6bnkIZcclxuICAgICAgICBjb25zdCBraW5kID0gY2VsbD8uZ2V0S2luZCgpO1xyXG4gICAgICAgIHN3aXRjaCAoa2luZCkge1xyXG4gICAgICAgICAgICBjYXNlIFRfTXpLaW5kLlN0clVwOlxyXG4gICAgICAgICAgICBjYXNlIFRfTXpLaW5kLlN0ckRuOlxyXG4gICAgICAgICAgICBjYXNlIFRfTXpLaW5kLlN0clVEOlxyXG4gICAgICAgICAgICAgICAgZG9fc3RhaXJzX21vdGlvbihraW5kKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG59IFxyXG5mdW5jdGlvbiBkb250X21vdmUocjogSV9Ib3BlQWN0aW9uKTogdm9pZCB7XHJcbiAgICBnX212bS5ub3JtYWxfbWVzc2FnZSgn6YCy44KB44Gq44GE77yB77yI56yR77yJJyk7XHJcbiAgICByLmRvTkcoKTtcclxuICAgIHJldHVybjtcclxufVxyXG4vLyDjgqrjg5bjgrjjgqfmjqXov5Hlh6bnkIZcclxuZnVuY3Rpb24gYXJvdW5kX29iaihyOiBJX0hvcGVBY3Rpb24pOiB2b2lkIHt9IFxyXG4vLyDjgqrjg5bjgrjjgqflh6bnkIZcclxuZnVuY3Rpb24gYWN0aW9uX29iaigpOiB2b2lkIHt9XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZG9fbW92ZV9ib3R0b21faGFsZihibGlua19tb2RlOiBzdHJpbmcpOiB2b2lkIHsgICAvL2FsZXJ0KCdGbG9vcj8gPSAnICsgZ190ZWFtLmdldF9wKCkueik7XHJcbiAgICBjaGFuZ2VfdW5leHBfdG9fZmxvb3IoZ190ZWFtLmdldF9wZCgpKTtcclxuICAgIGRpc3BsYXlfbWF6ZTNEKCk7XHJcbiAgICBkaXNwbGF5X21hemVfbmFtZSgpO1xyXG4gICAgaWYgKGJsaW5rX21vZGUgPT09ICdibGlua19vbicpIG1hemUzRF9ibGlua19vbl9kaXJlY3Rpb24oKTtcclxuICAgIGVsc2UgbWF6ZTNEX2JsaW5rX29mZl9kaXJlY3Rpb24oKTtcclxuICAgIGlmICghbWFza19jbGVhcmVkKCkpIHtcclxuICAgICAgICBjbGVhcl9tYXNrX2Fyb3VuZF90aGVfdGVhbSgpOyBcclxuICAgICAgICBpZiAobWFza19jbGVhcmVkKCkpIGFsZXJ0KCfjgZPjga7pmo7jgpLliLbopofjgZfjgb7jgZfjgZ/vvIHvvIEnKSAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbiAgICB9XHJcbiAgICBkaXNwbGF5X21hemVDaCgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBtYXNrX2NsZWFyZWQoKTogYm9vbGVhbiB7cmV0dXJuIGdfbWF6ZS5pc19jbGVhcmVkKGdfdGVhbS5nZXRfcGQoKSl9XHJcblxyXG5mdW5jdGlvbiBkaXNwbGF5X21hemVfbmFtZSgpOiB2b2lkIHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgcCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXplX3ZpZXczRF9tYXplX25hbWVfaW5mbycpIGFzIEhUTUxQYXJhZ3JhcGhFbGVtZW50O1xyXG4gICAgICAgIHAuaW5uZXJIVE1MID0gZ19tYXplLmdldF9uYW1lKCk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHt9O1xyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gc2V0Q2FudmFzM0RDbGljaygpOiB2b2lkIHtcclxuICAgIGlmIChnX2RzPy5jYW52YXMgPT09IG51bGwpICAgICByZXR1cm47XHJcbiAgICBnX2RzLmNhbnZhcy5vbmNsaWNrID0gY2FudmFzM0RjbGljaztcclxufVxyXG5mdW5jdGlvbiBjbHJDYW52YXMzRENsaWNrKCk6IHZvaWQge1xyXG4gICAgaWYgKGdfZHM/LmNhbnZhcyA9PT0gbnVsbCkgICAgIHJldHVybjtcclxuICAgIGdfZHMuY2FudmFzLm9uY2xpY2sgPSAoKT0+e307XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNhbnZhczNEY2xpY2soZXY6IE1vdXNlRXZlbnQpOiB2b2lkIHtcclxuICAgIGlmIChnX2RzPy5jYW52YXMgPT09IG51bGwpICAgICByZXR1cm47XHJcbiAgICBpZiAoZXYudGFyZ2V0ICE9PSBnX2RzLmNhbnZhcykgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IGN2cyA9IGdfZHMuY2FudmFzO1xyXG4vL2RlYnVnICAgIGFsZXJ0KGB4PSR7KGV2Lm9mZnNldFg/Py0xKX0sIHk9JHsoZXYub2Zmc2V0WT8/LTEpfWApO1xyXG5cclxuICAgIGNvbnN0IGxlZnRfcGFuZV9yICA9IGN2cy5jbGllbnRXaWR0aCAgKiAwLjI1O1xyXG4gICAgY29uc3QgcmdodF9wYW5lX2wgID0gY3ZzLmNsaWVudFdpZHRoICAqIDAuNzU7XHJcbiAgICBjb25zdCBiYWNrX3BhbmVfdSAgPSBjdnMuY2xpZW50SGVpZ2h0ICogMC44MDtcclxuXHJcbiAgICAvLyDjgq3jg6Pjg7Pjg5Djgrnjga7lt6blgbRcclxuICAgIGlmIChldi5vZmZzZXRYIDwgbGVmdF9wYW5lX3IpIHsoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xfYXJyJykgYXMgSFRNTEJ1dHRvbkVsZW1lbnQpPy5jbGljaygpOyByZXR1cm47fVxyXG4gICAgLy8g44Kt44Oj44Oz44OQ44K544Gu5Y+z5YG0XHJcbiAgICBpZiAoZXYub2Zmc2V0WCA+IHJnaHRfcGFuZV9sKSB7KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyX2FycicpIGFzIEhUTUxCdXR0b25FbGVtZW50KT8uY2xpY2soKTsgcmV0dXJuO31cclxuICAgIC8v44Kt44Oj44Oz44OQ44K544Gu5Lit5aSu5LiKKOWJjemAsilcclxuICAgIGlmIChldi5vZmZzZXRZIDwgYmFja19wYW5lX3UpIHsoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VfYXJyJykgYXMgSFRNTEJ1dHRvbkVsZW1lbnQpPy5jbGljaygpOyByZXR1cm47fVxyXG4gICAgLy8g44Kt44Oj44Oz44OQ44K544Gu5Lit5aSu5LiLKOW+jOmAgClcclxuICAgIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZF9hcnInKSBhcyBIVE1MQnV0dG9uRWxlbWVudCk/LmNsaWNrKCk7IHJldHVybjtcclxufVxyXG5cclxuXHJcblxyXG5mdW5jdGlvbiBkb19zdGFpcnNfbW90aW9uKGtpbmQ6IFRfTXpLaW5kKTogdm9pZCB7XHJcbiAgICBzd2l0Y2ggKGtpbmQpIHtcclxuICAgICAgICBjYXNlIFRfTXpLaW5kLlN0clVwOlxyXG4gICAgICAgICAgICBjbHJDYW52YXMzRENsaWNrKCk7XHJcbiAgICAgICAgICAgIGFjdF9VcF9tb2RlKCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgVF9NektpbmQuU3RyRG46XHJcbiAgICAgICAgICAgIGNsckNhbnZhczNEQ2xpY2soKTtcclxuICAgICAgICAgICAgYWN0X0RuX21vZGUoKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBUX016S2luZC5TdHJVRDpcclxuICAgICAgICAgICAgY2xyQ2FudmFzM0RDbGljaygpO1xyXG4gICAgICAgICAgICBhY3RfVURfbW9kZSgpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgIH1cclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIG1lbnUoKTogdm9pZCB7XHJcbiAgICBjbHJDYW52YXMzRENsaWNrKCk7XHJcbiAgICBnX212bS5jbGVhcl9tZXNzYWdlKCk7XHJcbiAgICBhY3RfbWVudV9tb2RlKCk7XHJcbn1cclxuIiwiaW1wb3J0IHsgYWN0X21lbnVfbW9kZSB9ICAgICAgIGZyb20gXCIuL0Zfc2V0X21lbnVfbW9kZVwiO1xyXG5pbXBvcnQgeyBnX2N0bHMsIGdfbWF6ZSwgZ19jdm0sIGdfdGVhbSwgZ192c3cgfSBmcm9tIFwiLi9nbG9iYWxfZm9yX21hemVcIjtcclxuXHJcbmltcG9ydCB7IENfVXJsT3B0IH0gICAgICAgICAgICBmcm9tIFwiLi4vZF91dGwvQ19VcmxPcHRcIjtcclxuaW1wb3J0IHsgdG1wX3NhdmUgfSAgICAgICAgICAgIGZyb20gXCIuLi9kX2Ntbi9GX2xvYWRfYW5kX3NhdmVcIjtcclxuaW1wb3J0IHsgUE9TVF9hbmRfbW92ZV9wYWdlIH0gIGZyb20gXCIuLi9kX2Ntbi9GX1BPU1RcIjtcclxuaW1wb3J0IHsgZ19teV91cmwsIGdfc2F2ZSwgZ19zdGFydF9lbnYsIGdfdXJsLCBnX3VybF9tYWlfZ3VsZCB9IGZyb20gXCIuLi9kX2Ntbi9nbG9iYWxcIjtcclxuXHJcbmxldCBtb2RlOiBzdHJpbmc7XHJcblxyXG5jb25zdCBjdGxzX212cHRfbm9yID0ge1xyXG4gICAgbmFtZTogJ212cHRfbm9yJywgXHJcbiAgICBpc09LOiAgaXNPSyxcclxuICAgIGlzTkc6ICBpc05HLFxyXG4gICAgY3BPSzogIGlzT0ssXHJcbiAgICBjcE5HOiAgaXNORyxcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGluaXRfbXZwdF9tb2RlKCk6IHZvaWQge1xyXG4gICAgZ19jdGxzLnNldChjdGxzX212cHRfbm9yKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFjdF9tdnB0X21vZGUoKTogdm9pZCB7XHJcbiAgICBtb2RlID0gJ2NoZWsnO1xyXG4gICAgZ19jdm0ubm90aWNlX21lc3NhZ2UoJ+acrOW9k+OBq+ihl+OBuOaIu+OCiuOBvuOBmeOBi++8n+OBk+OBruWgtOaJgOOBq+OBr+OCruODq+ODieOBi+OCieW+qeW4sOOBp+OBjeOBvuOBmScpO1xyXG4gICAgZ19jdGxzLmFjdChjdGxzX212cHRfbm9yKTtcclxuICAgIGdfdnN3LnZpZXcoZ192c3cuTXZQdCgpKTtcclxufVxyXG5cclxuZnVuY3Rpb24gaXNPSygpOiB2b2lkIHtcclxuICAgIHN3aXRjaChtb2RlKSB7XHJcbiAgICAgICAgY2FzZSAndmlldyc6XHJcbiAgICAgICAgICAgIGdfY3ZtLm5vdGljZV9tZXNzYWdlKCfmnKzlvZPjgavooZfjgbjmiLvjgorjgb7jgZnjgYvvvJ/jgZPjga7loLTmiYDjgavjga/jgq7jg6vjg4njgYvjgonlvqnluLDjgafjgY3jgb7jgZknKTtcclxuICAgICAgICAgICAgbW9kZSA9ICdjaGVrJztcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnY2hlayc6XHJcbiAgICAgICAgICAgIGdfY3ZtLm5vdGljZV9tZXNzYWdlKCfooZfjgbjmiLvjgorjgb7jgZfjgZ8nKTtcclxuICAgICAgICAgICAgbW9kZSA9ICd2aWV3JztcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IG12cHQgPSBnX3RlYW0uZ2V0X2xvYygpLmNsb25lKCk7XHJcbiAgICAgICAgICAgIG12cHQuc2V0X3VybChnX215X3VybCk7XHJcbiAgICAgICAgICAgIG12cHQuc2V0X3RpZChnX3RlYW0udWlkKCkpO1xyXG4gICAgICAgICAgICBtdnB0LnNldF91aWQoZ19tYXplLnVpZCgpKTtcclxuXHJcbiAgICAgICAgICAgIGdfc2F2ZS5hbGxfbXZwdFttdnB0LnVpZCgpXSAgID0gbXZwdDtcclxuICAgICAgICAgICAgZ19zYXZlLmFsbF9tYXplW2dfbWF6ZS51aWQoKV0gPSBnX21hemU7XHJcblxyXG4gICAgICAgICAgICB0bXBfc2F2ZSgpLnRoZW4oKCk9PntcclxuICAgICAgICAgICAgICAgIGNvbnN0IG9wdCA9IG5ldyBDX1VybE9wdCgpO1xyXG4gICAgICAgICAgICAgICAgb3B0LnNldCgnbW9kZScsICdsb2FkJyk7XHJcbiAgICAgICAgICAgICAgICBvcHQuc2V0KCdwaWQnLCAgIGdfc3RhcnRfZW52LnBpZCk7XHJcbiAgICAgICAgICAgICAgICBvcHQuc2V0KCdvcHQnLCAgIDEwMCk7XHJcbiAgICAgICAgICAgICAgICBQT1NUX2FuZF9tb3ZlX3BhZ2UoZ191cmxbZ191cmxfbWFpX2d1bGRdLCBvcHQpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgICBcclxufVxyXG5cclxuZnVuY3Rpb24gaXNORygpOiB2b2lkIHtcclxuICAgIHN3aXRjaChtb2RlKSB7XHJcbiAgICAgICAgY2FzZSAnY2hlayc6XHJcbiAgICAgICAgICAgIGdfY3ZtLmNsZWFyX21lc3NhZ2UoKTtcclxuICAgICAgICAgICAgYWN0X21lbnVfbW9kZSgpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBfcm91bmQgfSAgICAgICAgICAgICAgZnJvbSBcIi4uL2RfdXRsL0ZfTWF0aFwiO1xyXG5pbXBvcnQgeyBDX1VybE9wdCB9ICAgICAgICAgICAgZnJvbSBcIi4uL2RfdXRsL0NfVXJsT3B0XCI7XHJcbmltcG9ydCB7IFRfTGNrZCB9ICAgICAgICAgICAgICBmcm9tIFwiLi4vZF9tZGwvQ19Mb2NhdGlvblwiO1xyXG5pbXBvcnQgeyBDX1BvaW50RGlyIH0gICAgICAgICAgZnJvbSBcIi4uL2RfbWRsL0NfUG9pbnREaXJcIjtcclxuaW1wb3J0IHsgSV9NYXplT2JqICB9ICAgICAgICAgIGZyb20gXCIuLi9kX21kbC9DX01hemVPYmpcIjtcclxuaW1wb3J0IHsgQ19TYXZlRGF0YSB9ICAgICAgICAgIGZyb20gXCIuLi9kX21kbC9DX1NhdmVEYXRhXCI7XHJcbmltcG9ydCB7IENfQ3RsQ3Vyc29yIH0gICAgICAgICBmcm9tIFwiLi4vZF9jdGwvQ19DdGxDdXJzb3JcIjtcclxuaW1wb3J0IHsgUE9TVF9hbmRfbW92ZV9wYWdlIH0gIGZyb20gXCIuLi9kX2Ntbi9GX1BPU1RcIjtcclxuaW1wb3J0IHsgZ2VuZXJhbF9sb2FkLCBnZW5lcmFsX3NhdmUsIGdldF9zYXZlX2luZm8gfSAgICBmcm9tIFwiLi4vZF9jbW4vRl9sb2FkX2FuZF9zYXZlXCI7XHJcbmltcG9ydCB7IF9hbGVydCwgZ19tZXMsIGdfbXlfdXJsLCBnX3NhdmUsIGdfc3RhcnRfZW52IH0gZnJvbSBcIi4uL2RfY21uL2dsb2JhbFwiO1xyXG5pbXBvcnQgeyBhY3RfbWVudV9tb2RlIH0gICAgICAgZnJvbSBcIi4vRl9zZXRfbWVudV9tb2RlXCI7XHJcbmltcG9ydCB7IGFjdF9tb3ZlX21vZGUsIGRvX21vdmVfYm90dG9tX2hhbGYgfSBmcm9tIFwiLi9GX3NldF9tb3ZlX21vZGVcIjtcclxuaW1wb3J0IHsgXHJcbiAgICBnX2N0bHMsXHJcbiAgICBnX2N2bSwgXHJcbiAgICBnX212bSwgXHJcbiAgICBnX3ZzdywgXHJcbiAgICBnX21hemUsIFxyXG4gICAgZ190ZWFtLCBcclxuICAgIGdfaHJlcywgXHJcbn0gZnJvbSBcIi4vZ2xvYmFsX2Zvcl9tYXplXCI7XHJcbmltcG9ydCB7IFRfQ3RscyB9IGZyb20gXCIuL0NfRGVmYXVsdEN0bHNcIjtcclxuaW1wb3J0IHsgQ19TYXZlSW5mbyB9IGZyb20gXCIuLi9kX21kbC9DX1NhdmVJbmZvXCI7XHJcblxyXG5sZXQgICBmb3Jfc2F2ZTogYm9vbGVhbiAgPSBmYWxzZTtcclxuXHJcbmxldCAgIFVMX2lkeDogbnVtYmVyID0gICAwO1xyXG5sZXQgICBVTF9iYWs6IG51bWJlciA9IDk5OTtcclxuXHJcbmxldCAgIHNhdmVfVUxfbGlzdDogIEhUTUxVTGlzdEVsZW1lbnQ7XHJcbmxldCAgIFVMX2xpc3RfY3JzcjogIENfQ3RsQ3Vyc29yO1xyXG5sZXQgICBVTF9saXN0X2xlbmc6ICBudW1iZXI7XHJcblxyXG5sZXQgICBVTF90b19EYXRhOiAgICAgICB7W1VMX2lkeDogbnVtYmVyXTogLyogZGF0YV9pZHg6ICovIG51bWJlcn1cclxuXHJcbmxldCAgIGZvcm1faWQ6ICAgICAgICAgIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbmxldCAgIGZvcm1fdGltZTogICAgICAgIEhUTUxQYXJhZ3JhcGhFbGVtZW50O1xyXG5sZXQgICBmb3JtX2RldGFpbDogICAgICBIVE1MVGV4dEFyZWFFbGVtZW50O1xyXG5sZXQgICBmb3JtX3BvaW50OiAgICAgICBIVE1MUGFyYWdyYXBoRWxlbWVudDtcclxuXHJcbmxldCAgIGlzX2tha3VuaW4gPSBmYWxzZTtcclxuXHJcbmV4cG9ydCB0eXBlIFRfc2F2ZV9saXN0ID0ge1xyXG4gICAgc2F2ZV9pZDogICBudW1iZXIsXHJcbiAgICB1bmlxX25vOiAgIG51bWJlcixcclxuICAgIHRpdGxlOiAgICAgc3RyaW5nLFxyXG4gICAgZGV0YWlsOiAgICBzdHJpbmcsXHJcbiAgICBzY2VuZTogICAgIHN0cmluZyxcclxuICAgIHBvaW50OiAgICAgc3RyaW5nLFxyXG4gICAgc2F2ZV90aW1lOiBzdHJpbmcsXHJcbiAgICBhdXRvX21vZGU6IHN0cmluZyxcclxuICAgIF9faXNfbmV3OiAgYm9vbGVhbixcclxufVxyXG5cclxubGV0ICAgc2F2ZV9saXN0OiAgICAgICAge1t1bmlxX25vOiBudW1iZXJdOiBDX1NhdmVJbmZvfTtcclxuY29uc3Qgc2F2ZV9saXN0X21heCA9IDIwO1xyXG5cclxuY29uc3QgY3Rsc19sb2FkX3J0biA9IHtcclxuICAgIG5hbWU6ICdsb2FkX3J0bicsIFxyXG4gICAgaXNORzogIGdvX2JhY2tfbWVudV9tb2RlLFxyXG4gICAgaXNSVDogIGdvX2JhY2tfbWVudV9tb2RlLFxyXG4gICAgY3BSVDogIGdvX2JhY2tfbWVudV9tb2RlLFxyXG59XHJcbmNvbnN0IGN0bHNfbG9hZF9ub3IgPSB7XHJcbiAgICBuYW1lOiAnbG9hZF9ub3InLCBcclxuICAgIGRvX1U6ICBkb19VLFxyXG4gICAgZG9fRDogIGRvX0QsXHJcbiAgICBkb19MOiAgZG9fTCxcclxuICAgIGRvX1I6ICBkb19SLFxyXG4gICAgaXNPSzogIGNoZWNrX2xvYWQsXHJcbiAgICBjcE9LOiAgY2hlY2tfbG9hZCxcclxuICAgIGlzTkc6ICBnb19iYWNrX21lbnVfbW9kZSxcclxuICAgIGlzUlQ6ICBnb19iYWNrX21lbnVfbW9kZSxcclxuICAgIGNwUlQ6ICBnb19iYWNrX21lbnVfbW9kZSxcclxufVxyXG5jb25zdCBjdGxzX2xvYWRfY2hrID0ge1xyXG4gICAgbmFtZTogJ2xvYWRfY2hrJywgXHJcbiAgICBkb19VOiAgZG9fVSxcclxuICAgIGRvX0Q6ICBkb19ELFxyXG4gICAgZG9fTDogIGRvX0wsXHJcbiAgICBkb19SOiAgZG9fUixcclxuICAgIGlzT0s6ICBpc09LX2Zvcl9sb2FkLFxyXG4gICAgY3BPSzogIGlzT0tfZm9yX2xvYWQsXHJcbiAgICBpc05HOiAgaXNOR19mb3JfbG9hZCxcclxuICAgIGNwTkc6ICBpc05HX2Zvcl9sb2FkLFxyXG4gICAgaXNSVDogIGdvX2JhY2tfbWVudV9tb2RlLFxyXG4gICAgY3BSVDogIGdvX2JhY2tfbWVudV9tb2RlLFxyXG59XHJcbmNvbnN0IGN0bHNfc2F2ZV9ub3IgPSB7XHJcbiAgICBuYW1lOiAnc2F2ZV9ub3InLCBcclxuICAgIGRvX1U6ICBkb19VLFxyXG4gICAgZG9fRDogIGRvX0QsXHJcbiAgICBkb19MOiAgZG9fTCxcclxuICAgIGRvX1I6ICBkb19SLFxyXG4gICAgaXNPSzogIGNoZWNrX3NhdmUsXHJcbiAgICBjcE9LOiAgY2hlY2tfc2F2ZSxcclxuICAgIGlzTkc6ICBnb19iYWNrX21lbnVfbW9kZSxcclxuICAgIGlzUlQ6ICBnb19iYWNrX21lbnVfbW9kZSxcclxuICAgIGNwUlQ6ICBnb19iYWNrX21lbnVfbW9kZSxcclxufVxyXG5jb25zdCBjdGxzX3NhdmVfY2hrID0ge1xyXG4gICAgbmFtZTogJ3NhdmVfY2hrJywgXHJcbiAgICBkb19VOiAgZG9fVSxcclxuICAgIGRvX0Q6ICBkb19ELFxyXG4gICAgZG9fTDogIGRvX0wsXHJcbiAgICBkb19SOiAgZG9fUixcclxuICAgIGlzT0s6ICBpc09LX2Zvcl9zYXZlLFxyXG4gICAgY3BPSzogIGlzT0tfZm9yX3NhdmUsXHJcbiAgICBpc05HOiAgaXNOR19mb3Jfc2F2ZSxcclxuICAgIGNwTkc6ICBpc05HX2Zvcl9zYXZlLFxyXG4gICAgaXNSVDogIGdvX2JhY2tfbWVudV9tb2RlLFxyXG4gICAgY3BSVDogIGdvX2JhY2tfbWVudV9tb2RlLFxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaW5pdF9TTF9tb2RlKCk6IHZvaWQge1xyXG4gICAgaW5pdF92aWV3KCk7XHJcbiAgICBpbml0X2N0bHMoKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFjdF9sb2FkX21vZGUoKTogdm9pZCB7XHJcbiAgICBfX3NldF9kYXRhKGZhbHNlKS50aGVuKCgpPT57XHJcbiAgICAgICAgaWYgKCFleGlzdF9zYXZlX2xpc3QoKSkge1xyXG4gICAgICAgICAgICBoaWRlX2xvYWRfZmllbGRzKCk7XHJcbiAgICAgICAgICAgIGdfY3ZtLm5vdGljZV9tZXNzYWdlKCfjg63jg7zjg4njgafjgY3jgovjg4fjg7zjgr/jgYzmnInjgorjgb7jgZvjgpMnKTtcclxuICAgICAgICAgICAgZ19jdGxzLmFjdChjdGxzX2xvYWRfcnRuKTtcclxuICAgICAgICAgICAgZ192c3cudmlldyhnX3Zzdy5Nb3ZlKCkpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc2hvd19sb2FkX2ZpZWxkcygpO1xyXG4gICAgICAgICAgICBkaXNwbGF5X21lc3NhZ2UoKTtcclxuICAgICAgICAgICAgZ19jdGxzLmFjdChjdGxzX2xvYWRfbm9yKTtcclxuICAgICAgICAgICAgZ192c3cudmlldyhnX3Zzdy5MZFN2KCkpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBhY3Rfc2F2ZV9tb2RlKCk6IHZvaWQge1xyXG4gICBfX3NldF9kYXRhKHRydWUpLnRoZW4oKCk9PntcclxuICAgICAgICBkaXNwbGF5X21lc3NhZ2UoKTtcclxuICAgICAgICBnX2N0bHMuYWN0KGN0bHNfc2F2ZV9ub3IpO1xyXG4gICAgICAgIGdfdnN3LnZpZXcoZ192c3cuTGRTdigpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBfX3NldF9kYXRhKF9mb3Jfc2F2ZTogYm9vbGVhbik6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgZm9yX3NhdmUgPSBfZm9yX3NhdmU7IC8vIHRydWU6IEZvciBTYXZlLlxyXG5cclxuICAgIGdfY3ZtLmNsZWFyX21lc3NhZ2UoKTtcclxuICAgIGlzX2tha3VuaW4gPSBmYWxzZTtcclxuICAgIGF3YWl0IGRpc3BsYXlfc2F2ZV9saXN0KCk7IFxyXG59XHJcblxyXG5mdW5jdGlvbiBoaWRlX2xvYWRfZmllbGRzKCk6IHZvaWQge1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xkc3ZfZGF0YV9saXN0JykgID8uc3R5bGUuc2V0UHJvcGVydHkoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xkc3ZfZGF0YV9maWVsZHMnKT8uc3R5bGUuc2V0UHJvcGVydHkoJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzaG93X2xvYWRfZmllbGRzKCk6IHZvaWQge1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xkc3ZfZGF0YV9saXN0JykgID8uc3R5bGUuc2V0UHJvcGVydHkoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsZHN2X2RhdGFfZmllbGRzJyk/LnN0eWxlLnNldFByb3BlcnR5KCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBpbml0X2RhdGEoKTogdm9pZCB7fVxyXG5mdW5jdGlvbiBpbml0X3ZpZXcoKTogdm9pZCB7fVxyXG5mdW5jdGlvbiBpbml0X2N0bHMoKTogdm9pZCB7XHJcbiAgICBpc19rYWt1bmluID0gZmFsc2U7XHJcbiAgICBVTF9iYWsgPSA5OTk7XHJcblxyXG4gICAgZ19jdGxzLnNldChjdGxzX2xvYWRfcnRuKTtcclxuICAgIGdfY3Rscy5zZXQoY3Rsc19sb2FkX25vcik7XHJcbiAgICBnX2N0bHMuc2V0KGN0bHNfbG9hZF9jaGspO1xyXG4gICAgZ19jdGxzLnNldChjdGxzX3NhdmVfbm9yKTtcclxuICAgIGdfY3Rscy5zZXQoY3Rsc19zYXZlX2Noayk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzT0tfZm9yX2xvYWQoKTogdm9pZCB7XHJcbiAgICBpZiAoc2F2ZV9VTF9saXN0ID09PSBudWxsKSByZXR1cm47XHJcbiAgICBpZiAoVUxfaWR4IDwgMCB8fCBVTF9pZHggPiBVTF9saXN0X2xlbmcgLSAxKSByZXR1cm47XHJcblxyXG4vLyAgICBpZiAoIWlzX2tha3VuaW4pIGNoZWNrX2xvYWQoKTsgZWxzZSBsb2FkKCk7XHJcbiAgICBsb2FkKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzT0tfZm9yX3NhdmUoKTogdm9pZCB7XHJcbiAgICBpZiAoc2F2ZV9VTF9saXN0ID09PSBudWxsKSByZXR1cm47XHJcbiAgICBpZiAoVUxfaWR4IDwgMCB8fCBVTF9pZHggPiBVTF9saXN0X2xlbmcgLSAxKSByZXR1cm47XHJcblxyXG4vLyAgICBpZiAoIWlzX2tha3VuaW4pIGNoZWNrX3NhdmUoKTsgZWxzZSBzYXZlKCk7XHJcbiAgICBzYXZlKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzTkdfZm9yX2xvYWQoKTogdm9pZCB7XHJcbiAgICBfaXNOR18oY3Rsc19sb2FkX25vcik7XHJcbn1cclxuZnVuY3Rpb24gaXNOR19mb3Jfc2F2ZSgpOiB2b2lkIHtcclxuICAgIF9pc05HXyhjdGxzX3NhdmVfbm9yKTtcclxufVxyXG5mdW5jdGlvbiBfaXNOR18oY3RsczogVF9DdGxzKTogdm9pZCB7XHJcbiAgICBpZiAoIWlzX2tha3VuaW4pIHtcclxuICAgICAgICBnX2N2bS5jbGVhcl9tZXNzYWdlKCk7XHJcbiAgICAgICAgZ29fYmFja19tZW51X21vZGUoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaXNfa2FrdW5pbiA9IGZhbHNlO1xyXG4gICAgICAgIGdfY3Rscy5hY3QoY3Rscyk7XHJcbiAgICAgICAgZGlzcGxheV9tZXNzYWdlKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdvX2JhY2tfbWVudV9tb2RlKCk6IHZvaWQge1xyXG4gICAgZ19jdm0uY2xlYXJfbWVzc2FnZSgpO1xyXG4gICAgYWN0X21lbnVfbW9kZSgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnb19iYWNrX21vdmVfbW9kZSgpOiB2b2lkIHtcclxuICAgIGFjdF9tb3ZlX21vZGUoKTtcclxuICAgIGRvX21vdmVfYm90dG9tX2hhbGYoJ2JsaW5rX29mZicpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkb19VKCk6IHZvaWQge1xyXG4gICAgZGlzcGxheV9tZXNzYWdlKCk7XHJcbiAgICBVTF9pZHggPSBVTF9saXN0X2Nyc3IucG9zX1UoKTtcclxuICAgIGZvcm1fc2V0KCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRvX0QoKTogdm9pZCB7IFxyXG4gICAgZGlzcGxheV9tZXNzYWdlKCk7XHJcbiAgICBVTF9pZHggPSBVTF9saXN0X2Nyc3IucG9zX0QoKTtcclxuICAgIGZvcm1fc2V0KCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRvX0woKTogdm9pZCB7XHJcbiAgICBkaXNwbGF5X21lc3NhZ2UoKTtcclxuICAgIFVMX2lkeCA9IFVMX2xpc3RfY3Jzci5wb3NfTCgpO1xyXG4gICAgZm9ybV9zZXQoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZG9fUigpOiB2b2lkIHtcclxuICAgIGRpc3BsYXlfbWVzc2FnZSgpO1xyXG4gICAgVUxfaWR4ID0gVUxfbGlzdF9jcnNyLnBvc19SKCk7XHJcbiAgICBmb3JtX3NldCgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBmb3JtX2NscigpOnZvaWQge1xyXG4gICAgaWYgKFVMX2lkeCA8IDAgfHwgVUxfaWR4ID4gVUxfbGlzdF9sZW5nIC0gMSkgcmV0dXJuO1xyXG5cclxuICAgIGZvcm1faWQgICAudmFsdWUgICAgICA9ICctMSc7XHJcbiAgICBmb3JtX3RpbWUgLmlubmVyVGV4dCAgPSAnJztcclxuICAgIGZvcm1fcG9pbnQuaW5uZXJUZXh0ICA9ICcnO1xyXG5cclxuICAgIGlmIChmb3JtX2RldGFpbC5oYXNBdHRyaWJ1dGUoJ3JlYWRvbmx5JykpIHtcclxuICAgICAgICBmb3JtX2RldGFpbC5yZW1vdmVBdHRyaWJ1dGUoJ3JlYWRvbmx5Jyk7XHJcbiAgICAgICAgZm9ybV9kZXRhaWwudmFsdWUgPSAnJztcclxuICAgICAgICBmb3JtX2RldGFpbC5zZXRBdHRyaWJ1dGUoJ3JlYWRvbmx5JywgJ3JlYWRvbmx5Jyk7XHJcbiAgICB9ZWxzZSB7XHJcbiAgICAgICAgZm9ybV9kZXRhaWwudmFsdWUgPSAnJztcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZm9ybV9zZXQoKTp2b2lkIHtcclxuICAgIGlmIChVTF9pZHggPCAwIHx8IFVMX2lkeCA+IFVMX2xpc3RfbGVuZyAtIDEpIHJldHVybjtcclxuXHJcbiAgICBmb3JtX2NscigpO1xyXG4gICAgY29uc3QgZGF0YV9pZHggPSBVTF90b19EYXRhW1VMX2lkeF07XHJcblxyXG4gICAgZm9ybV9pZCAgIC52YWx1ZSAgICAgID0gc2F2ZV9saXN0W2RhdGFfaWR4XS5zYXZlX2lkLnRvU3RyaW5nKCk7XHJcbiAgICBmb3JtX3RpbWUgLmlubmVyVGV4dCAgPSBzYXZlX2xpc3RbZGF0YV9pZHhdLnNhdmVfdGltZT8udG9JU09TdHJpbmcoKTtcclxuICAgIGZvcm1fcG9pbnQuaW5uZXJUZXh0ICA9IHNhdmVfbGlzdFtkYXRhX2lkeF0ucG9pbnQ7XHJcblxyXG4gICAgaWYgKGZvcm1fZGV0YWlsLmhhc0F0dHJpYnV0ZSgncmVhZG9ubHknKSkge1xyXG4gICAgICAgIGZvcm1fZGV0YWlsLnJlbW92ZUF0dHJpYnV0ZSgncmVhZG9ubHknKTtcclxuICAgICAgICBmb3JtX2RldGFpbC52YWx1ZSA9IHNhdmVfbGlzdFtkYXRhX2lkeF0uZGV0YWlsO1xyXG4gICAgICAgIGZvcm1fZGV0YWlsLnNldEF0dHJpYnV0ZSgncmVhZG9ubHknLCAncmVhZG9ubHknKTtcclxuICAgIH1lbHNlIHtcclxuICAgICAgICBmb3JtX2RldGFpbC52YWx1ZSA9IHNhdmVfbGlzdFtkYXRhX2lkeF0uZGV0YWlsO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZGlzcGxheV9zYXZlX2xpc3QoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICBjb25zdCBkYXRhX2xpc3QgICA9ICdsZHN2X2RhdGFfbGlzdCc7XHJcbiAgICBjb25zdCBkYXRhX2lkICAgICA9ICdsZHN2X2RhdGFfaWQnO1xyXG4gICAgY29uc3QgZGF0YV90aW1lICAgPSAnbGRzdl9kYXRhX3RpbWUnO1xyXG4gICAgY29uc3QgZGF0YV9kZXRhaWwgPSAnbGRzdl9kYXRhX2RldGFpbCc7XHJcbiAgICBjb25zdCBkYXRhX3BvaW50ICA9ICdsZHN2X2RhdGFfcG9pbnQnO1xyXG5cclxuICAgIGF3YWl0IGdldF9zYXZlX2luZm8oKT8udGhlbihqc29uT2JqID0+IHtcclxuICAgICAgICBpZiAoanNvbk9iaiA9PT0gbnVsbCB8fCBqc29uT2JqID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgZ19tZXMud2FybmluZ19tZXNzYWdlKCfjgrvjg7zjg5bmg4XloLHjga7lj5fkv6HjgavlpLHmlZfjgZfjgb7jgZfjgZ/jgILjgJDlj5fkv6Hjg4fjg7zjgr/nhKHjgZfjgJEnKTtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGpzb25PYmouZWNvZGUgIT09IDApIHtcclxuICAgICAgICAgICAgZ19tZXMud2FybmluZ19tZXNzYWdlKGDjgI4ke2pzb25PYmouZW1zZ33jgI8oJHtqc29uT2JqLmVjb2RlfSlgKTtcclxuICAgICAgICAgICAgZ19tZXMud2FybmluZ19tZXNzYWdlKCfjgrvjg7zjg5bmg4XloLHjga7lj5fkv6HjgavlpLHmlZfjgZfjgb7jgZfjgZ/jgIInKTtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgc2F2ZV9saXN0ID0ge307IFxyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgc2F2ZV9pbmZvIG9mIGpzb25PYmouc2F2ZV9pbmZvKSB7XHJcbiAgICAgICAgICAgICAgICBzYXZlX2xpc3Rbc2F2ZV9pbmZvLnVuaXFfbm9dID0gbmV3IENfU2F2ZUluZm8oc2F2ZV9pbmZvKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZm9yX3NhdmUpIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IHVuaXFfbm9fY250ID0gMDsgdW5pcV9ub19jbnQgPCBzYXZlX2xpc3RfbWF4OyB1bmlxX25vX2NudCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHVuaXFfbm9fY250IGluIHNhdmVfbGlzdCkgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgc2F2ZV9saXN0W3VuaXFfbm9fY250XSA9IG5ldyBDX1NhdmVJbmZvKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2F2ZV9pZDogICAgLTEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVuaXFfbm86ICAgICB1bmlxX25vX2NudCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICAgICAgYOaWsOimj+S/neWtmCMke3VuaXFfbm9fY250LnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgJzAnKX1gLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXRhaWw6ICAgICcnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb2ludDogICAgICcnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzYXZlX3RpbWU6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXV0b19tb2RlOiAnMCcsXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHNhdmVfVUxfbGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGRhdGFfbGlzdCkgYXMgSFRNTFVMaXN0RWxlbWVudDtcclxuICAgICAgICAgICAgaWYgKHNhdmVfVUxfbGlzdCA9PT0gbnVsbCkge2FsZXJ0KCdDYW4gbm90IGZpbmQgdGhlIERvbSBvZiBTYXZlIExpc3QhJyk7cmV0dXJuO31cclxuICAgICAgICBcclxuICAgICAgICAgICAgd2hpbGUgKHNhdmVfVUxfbGlzdC5maXJzdENoaWxkICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBzYXZlX1VMX2xpc3QucmVtb3ZlQ2hpbGQoc2F2ZV9VTF9saXN0LmZpcnN0Q2hpbGQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgVUxfbGlzdF9pZHggPSAwOyBVTF90b19EYXRhID0ge307XHJcbiAgICAgICAgICAgIGZvciAobGV0IGRhdGFfaWR4IGluIHNhdmVfbGlzdCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHNhdmVfbGlzdFtkYXRhX2lkeF0uYXV0b19tb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZvcl9zYXZlKSBjb250aW51ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChzYXZlX2xpc3RbZGF0YV9pZHhdLnVuaXFfbm8pIHsgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTAwOiBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNhdmVfbGlzdFtkYXRhX2lkeF0udGl0bGUgID0gJ+iHquWLleS/neWtmOWIhic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzYXZlX2xpc3RbZGF0YV9pZHhdLmRldGFpbCA9ICfkvZzmpa3nlKjjgavnsKHmmJPkv53lrZjjgZfjgZ/jg4fjg7zjgr/jgafjgZknO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDEwMTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNhdmVfbGlzdFtkYXRhX2lkeF0udGl0bGUgID0gJ+ewoeaYk+S/neWtmOWIhic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzYXZlX2xpc3RbZGF0YV9pZHhdLmRldGFpbCA9ICfjg4fjg5Djg4PjgrDjg6Ljg7zjg4njgafnsKHmmJPkv53lrZjjgZfjgZ/jg4fjg7zjgr/jgafjgZknO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTAyOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2F2ZV9saXN0W2RhdGFfaWR4XS50aXRsZSAgPSAn6ZqO5q6155u05YmN5YiGJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNhdmVfbGlzdFtkYXRhX2lkeF0uZGV0YWlsID0gJ+S4gOeVquacgOi/keOBruODleODreOCouenu+WLleebtOWJjeOBq+iHquWLleS/neWtmOOBl+OBn+ODh+ODvOOCv+OBp+OBmSc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxMDM6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzYXZlX2xpc3RbZGF0YV9pZHhdLnRpdGxlICA9ICfvvbLvvo3vvp7vvp3vvoTnm7TliY3liIYnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2F2ZV9saXN0W2RhdGFfaWR4XS5kZXRhaWwgPSAn44Kk44OZ44Oz44OIKOWkseaVlynnm7TliY3jgavnsKHmmJPkv53lrZjjgZfjgZ/jg4fjg7zjgr/jgafjgZknO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKSBhcyBIVE1MTElFbGVtZW50O1xyXG4gICAgICAgICAgICAgICAgbGkuaW5uZXJIVE1MID0gYOOAjiR7c2F2ZV9saXN0W2RhdGFfaWR4XS50aXRsZX3jgI9gO1xyXG5cclxuICAgICAgICAgICAgICAgIGxpLmlkID0gVUxfbGlzdF9pZHgudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgIGxpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmb3Jfc2F2ZT9fT0tfc2F2ZV9GbmM6X09LX2xvYWRfRm5jLCBmYWxzZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgc2F2ZV9VTF9saXN0LmFwcGVuZENoaWxkKGxpKTtcclxuICAgICAgICAgICAgICAgIFVMX3RvX0RhdGFbVUxfbGlzdF9pZHgrK10gPSBOdW1iZXIoZGF0YV9pZHgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFVMX2xpc3RfY3JzciA9IENfQ3RsQ3Vyc29yLmdldE9iaihzYXZlX1VMX2xpc3QpO1xyXG4gICAgICAgICAgICBVTF9saXN0X2xlbmcgPSBzYXZlX1VMX2xpc3QuY2hpbGRyZW4ubGVuZ3RoO1xyXG4gICAgXHJcbiAgICAgICAgICAgIGZvcm1faWQgICAgID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZGF0YV9pZCkgICAgIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcbiAgICAgICAgICAgIGZvcm1fdGltZSAgID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZGF0YV90aW1lKSAgIGFzIEhUTUxQYXJhZ3JhcGhFbGVtZW50O1xyXG4gICAgICAgICAgICBmb3JtX2RldGFpbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGRhdGFfZGV0YWlsKSBhcyBIVE1MVGV4dEFyZWFFbGVtZW50O1xyXG4gICAgICAgICAgICBmb3JtX3BvaW50ICA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGRhdGFfcG9pbnQpICBhcyBIVE1MUGFyYWdyYXBoRWxlbWVudDsgXHJcblxyXG4gICAgICAgICAgICBpZiAoIWV4aXN0X3NhdmVfbGlzdCgpKSByZXR1cm47XHJcbiAgICAgICAgICAgIFVMX2lkeCA9IDA7ICBVTF9saXN0X2Nyc3Iuc2V0X3BvcyhVTF9pZHgpOyBcclxuICAgICAgICAgICAgZm9ybV9zZXQoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICBnX21lcy53YXJuaW5nX21lc3NhZ2UoZXJyIGFzIHVua25vd24gYXMgc3RyaW5nKTtcclxuICAgICAgICAgICAgZ19tZXMud2FybmluZ19tZXNzYWdlKCfjgrvjg7zjg5bmg4XloLHjga7lj5fkv6HjgavlpLHmlZfjgZfjgb7jgZfjgZ/jgILjgJDjg4fjg7zjgr/kuI3kuIDoh7TjgJEnKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcbmZ1bmN0aW9uIF9PS19sb2FkX0ZuYyh0aGlzOiBIVE1MTElFbGVtZW50LCBlOiBNb3VzZUV2ZW50KTogdm9pZCB7XHJcbiAgICBVTF9pZHggPSBOdW1iZXIodGhpcy5pZCk7XHJcbiAgICBcclxuICAgIGlmIChVTF9pZHggIT09IFVMX2Jhaykge1xyXG4gICAgICAgIFVMX2JhayA9ICAgVUxfaWR4O1xyXG4gICAgICAgIGlzX2tha3VuaW4gPSBmYWxzZTtcclxuICAgIH1cclxuICAgIGlmIChpc19rYWt1bmluKSBpc09LX2Zvcl9sb2FkKCk7IGVsc2UgY2hlY2tfbG9hZCgpO1xyXG4gICAgVUxfbGlzdF9jcnNyLnNldF9wb3MoVUxfaWR4KTsgZm9ybV9zZXQoKTtcclxufVxyXG5mdW5jdGlvbiBfT0tfc2F2ZV9GbmModGhpczogSFRNTExJRWxlbWVudCwgZTogTW91c2VFdmVudCk6IHZvaWQge1xyXG4gICAgVUxfaWR4ID0gTnVtYmVyKHRoaXMuaWQpO1xyXG4gICAgXHJcbiAgICBpZiAoVUxfaWR4ICE9PSBVTF9iYWspIHtcclxuICAgICAgICBVTF9iYWsgPSAgIFVMX2lkeDtcclxuICAgICAgICBpc19rYWt1bmluID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBpZiAoaXNfa2FrdW5pbikgaXNPS19mb3Jfc2F2ZSgpOyBlbHNlIGNoZWNrX3NhdmUoKTtcclxuICAgIFVMX2xpc3RfY3Jzci5zZXRfcG9zKFVMX2lkeCk7IGZvcm1fc2V0KCk7XHJcbn1cclxuZnVuY3Rpb24gZXhpc3Rfc2F2ZV9saXN0KCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHNhdmVfVUxfbGlzdC5jaGlsZHJlbi5sZW5ndGggPiAwO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjaGVja19sb2FkKCk6IHZvaWQgeyAvLyDlhaXlipvjg4Hjgqfjg4Pjgq/jgajml6LlrZjjg4fjg7zjgr/kuIrmm7jjgY3jga7norroqo1cclxuICAgIGNvbnN0IGRhdGFfaWR4ID0gVUxfdG9fRGF0YVtVTF9pZHhdO1xyXG4gICAgaWYgKFVMX2lkeCA8IDAgfHwgVUxfaWR4ID4gVUxfbGlzdF9sZW5nIC0gMSkge1xyXG4gICAgICAgIGdfbWVzLndhcm5pbmdfbWVzc2FnZShgY2hlY2shISBObyBsb25nZXIgYWNjZXNzIGlkeCHjgI4ke3NhdmVfbGlzdFtkYXRhX2lkeF0udGl0bGV944CPKHNhdmVfaWQ6ICR7c2F2ZV9saXN0W2RhdGFfaWR4XS5zYXZlX2lkfSlgKTtcclxuICAgIH1cclxuICAgIGlzX2tha3VuaW4gPSB0cnVlO1xyXG4gICAgZ19jdGxzLmFjdChjdGxzX2xvYWRfY2hrKTtcclxuICAgIGRpc3BsYXlfbWVzc2FnZSgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjaGVja19zYXZlKCk6IHZvaWQgeyAvLyDlhaXlipvjg4Hjgqfjg4Pjgq/jgajml6LlrZjjg4fjg7zjgr/kuIrmm7jjgY3jga7norroqo1cclxuICAgIGNvbnN0IGRhdGFfaWR4ID0gVUxfdG9fRGF0YVtVTF9pZHhdO1xyXG4gICAgaWYgKFVMX2lkeCA8IDAgfHwgVUxfaWR4ID4gVUxfbGlzdF9sZW5nIC0gMSkge1xyXG4gICAgICAgIGdfbWVzLndhcm5pbmdfbWVzc2FnZShgY2hlY2shISBObyBsb25nZXIgYWNjZXNzIGlkeCHjgI4ke3NhdmVfbGlzdFtkYXRhX2lkeF0udGl0bGV944CPKHNhdmVfaWQ6ICR7c2F2ZV9saXN0W2RhdGFfaWR4XS5zYXZlX2lkfSlgKTtcclxuICAgIH1cclxuICAgIGlmIChzYXZlX2xpc3RbZGF0YV9pZHhdLmF1dG9fbW9kZSkge1xyXG4gICAgICAgIGdfbWVzLndhcm5pbmdfbWVzc2FnZShgY2hlY2shISBUaGlzIGlzIEF1dG8gTW9kZSHjgI4ke3NhdmVfbGlzdFtkYXRhX2lkeF0udGl0bGV944CPKHNhdmVfaWQ6ICR7c2F2ZV9saXN0W2RhdGFfaWR4XS5zYXZlX2lkfSlgKTtcclxuICAgIH1cclxuICAgIGlzX2tha3VuaW4gPSB0cnVlO1xyXG4gICAgZ19jdGxzLmFjdChjdGxzX3NhdmVfY2hrKTtcclxuICAgIGRpc3BsYXlfbWVzc2FnZSgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkaXNwbGF5X21lc3NhZ2UoKSB7XHJcbiAgICBpZiAoZm9yX3NhdmUpIHtcclxuICAgICAgICBpZiAoaXNfa2FrdW5pbikge1xyXG4gICAgICAgICAgICBpZiAoVUxfdG9fRGF0YVtVTF9pZHhdID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGdfY3ZtLm5vdGljZV9tZXNzYWdlKCfjgZPjgozjgavkv53lrZjjgZfjgb7jgZnjgYvvvJ8nKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGdfY3ZtLm5vdGljZV9tZXNzYWdlKCfjgZPjgozjgavkuIrmm7jkv53lrZjjgZfjgb7jgZnjgYvvvJ/ku6XliY3jga7jg4fjg7zjgr/jga/mtojljrvjgZXjgozjgb7jgZknKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGdfY3ZtLm5vcm1hbF9tZXNzYWdlKCfjganjgozjgavkv53lrZjjgZfjgb7jgZnjgYvvvJ8nKTtcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmIChpc19rYWt1bmluKSB7XHJcbiAgICAgICAgICAgIGdfY3ZtLm5vdGljZV9tZXNzYWdlKCfjg63jg7zjg4njgZfjgb7jgZnjgYvvvJ8nKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBnX2N2bS5ub3JtYWxfbWVzc2FnZSgn44Gp44KM44KS44Ot44O844OJ44GX44G+44GZ44GL77yfJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuXHJcblxyXG5mdW5jdGlvbiBsb2FkKCk6IHZvaWQgeyBcclxuICAgIGNvbnN0IGRhdGFfaWR4ID0gVUxfdG9fRGF0YVtVTF9pZHhdO1xyXG4gICAgaWYgKHNhdmVfbGlzdFtkYXRhX2lkeF0ubXlwb3MudXJsKCkgIT09ICcnICYmIHNhdmVfbGlzdFtkYXRhX2lkeF0ubXlwb3MudXJsKCkgIT0gZ19teV91cmwpIHtcclxuICAgICAgICBfbG9hZF9vdGhlcihkYXRhX2lkeCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgX2xvYWRfaGVyZShkYXRhX2lkeCk7XHJcbiAgICByZXR1cm47XHJcbn1cclxuZnVuY3Rpb24gX2xvYWRfb3RoZXIoZGF0YV9pZHg6IG51bWJlcik6IHZvaWQge1xyXG4gICAgY29uc3Qgb3B0ID0gbmV3IENfVXJsT3B0KCk7XHJcbiAgICBvcHQuc2V0KCdtb2RlJywgJ2xvYWQnKTtcclxuICAgIG9wdC5zZXQoJ3BpZCcsICAgZ19zdGFydF9lbnYucGlkKTtcclxuICAgIG9wdC5zZXQoJ29wdCcsICAgc2F2ZV9saXN0W2RhdGFfaWR4XS51bmlxX25vLnRvU3RyaW5nKCkpO1xyXG4gICAgUE9TVF9hbmRfbW92ZV9wYWdlKHNhdmVfbGlzdFtkYXRhX2lkeF0ubXlwb3MudXJsKCksIG9wdCk7XHJcbiAgICByZXR1cm47XHJcbn1cclxuXHJcbmZ1bmN0aW9uIF9sb2FkX2hlcmUoZGF0YV9pZHg6IG51bWJlcik6IHZvaWQge1xyXG4gICAgZ19zdGFydF9lbnYucGlkID0gc2F2ZV9saXN0W2RhdGFfaWR4XS5wbGF5ZXJfaWQ7XHJcblxyXG4gICAgZ2VuZXJhbF9sb2FkKHNhdmVfbGlzdFtkYXRhX2lkeF0udW5pcV9ubykudGhlbigoanNvbk9iajphbnkpPT57ICBcclxuICAgICAgICBpc19rYWt1bmluID0gZmFsc2U7XHJcbiAgICAgICAgZGVjb2RlX2FsbChqc29uT2JqPy5zYXZlKTtcclxuICAgICAgICBnX212bS5ub3RpY2VfbWVzc2FnZSgn44Ot44O844OJ44GX44G+44GX44GfJyk7XHJcbiAgICAgICAgZ29fYmFja19tb3ZlX21vZGUoKTsgICAgICAgIFxyXG4gICAgfSk7XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIHNhdmUoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICBjb25zdCBkYXRhX2lkeCA9IFVMX3RvX0RhdGFbVUxfaWR4XTtcclxuICAgIHNldF9nX3NhdmUoXHJcbiAgICAgICAgLyogc2F2ZV9pZDogKi8gICBzYXZlX2xpc3RbZGF0YV9pZHhdLnNhdmVfaWQsIC8vTnVtYmVyKGZvcm1faWQudmFsdWUpLFxyXG4gICAgICAgIC8qIHVuaXFfbm86ICovICAgc2F2ZV9saXN0W2RhdGFfaWR4XS51bmlxX25vLFxyXG4gICAgICAgIC8qIHRpdGxlOiAqLyAgICAgYOS/neWtmOa4iDogIyR7ZGF0YV9pZHgudG9TdHJpbmcoKS5wYWRTdGFydCgyLCAnMCcpfWAsIC8vc2F2ZV9saXN0W2RhdGFfaWR4XS50aXRsZSwgXHJcbiAgICAgICAgLyogZGV0YWlsOiAqLyAgICBmb3JtX2RldGFpbC52YWx1ZSxcclxuICAgICAgICAvKiBwb2ludDogKi8gICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGDjgI4ke2dfbWF6ZS5nZXRfbmFtZSgpfeOAjyBgIFxyXG4gICAgICAgICAgICAgICAgICAgICsgYOWcsOS4iyAke2dfdGVhbS5nZXRfcGQoKS56ICsgMX3pmo7lsaQgYCBcclxuICAgICAgICAgICAgICAgICAgICArIGAoWDogJHtnX3RlYW0uZ2V0X3BkKCkueH0sIFk6ICR7Z190ZWFtLmdldF9wZCgpLnl9KWAsXHJcbiAgICAgICAgLyogYXV0b19tb2RlOiAqLyBmYWxzZSxcclxuICAgICk7XHJcbiAgICBnZW5lcmFsX3NhdmUoKS50aGVuKChqc29uT2JqKT0+e1xyXG4gICAgICAgIGRlY29kZV9hbGwoanNvbk9iaik7XHJcblxyXG4gICAgICAgIGlzX2tha3VuaW4gPSBmYWxzZTtcclxuICAgICAgICBnX212bS5ub3RpY2VfbWVzc2FnZSgn5L+d5a2Y44GX44G+44GX44GfJyk7XHJcbiAgICAgICAgZ29fYmFja19tb3ZlX21vZGUoKTsgICAgICAgIFxyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBkZWNvZGVfYWxsKGpzb25PYmo6IGFueSk6IHZvaWQgeyBcclxuICAgIC8vIFNhdmVEYXRh6Zai6YCj44Gu44OH44Kz44O844OJXHJcbiAgICBpZiAoanNvbk9iaiA9PT0gdW5kZWZpbmVkKSByZXR1cm47XHJcbiAgICBnX3NhdmUuZGVjb2RlKGpzb25PYmopOyBcclxuICAgIGdfc2F2ZS5teXBvcy5zZXRfdXJsKGdfbXlfdXJsKTtcclxuXHJcbiAgICAvL1RlYW3plqLpgKPjga7jg4fjgrPjg7zjg4lcclxuICAgIGdfdGVhbS5kZWNvZGUoZ19zYXZlLmFsbF90ZWFtW2dfc2F2ZS5teXBvcy50aWQoKT8/JyddLmVuY29kZSgpKTsgXHJcbiAgICBnX3RlYW0uc2V0X2xvYyhnX3NhdmUubXlwb3MpO1xyXG5cclxuICAgIC8vIE1hemXplqLpgKPjga7jg4fjgrPjg7zjg4lcclxuICAgIGNvbnN0IGxvYyA9IGdfdGVhbS5nZXRfbG9jKCk7IFxyXG4gICAgaWYgKGxvYy5nZXRfbGNrZCgpID09IFRfTGNrZC5NYXplKSB7XHJcbiAgICAgICAgZ19tYXplLmRlY29kZShnX3NhdmUuYWxsX21hemVbbG9jLmdldF91aWQoKV0uZW5jb2RlKCkpOyBcclxuICAgIH1cclxuXHJcbiAgICAvL0hlcm/plqLpgKPjga7jg4fjgrPjg7zjg4lcclxuICAgIGZvciAoY29uc3QgaSBpbiBnX2hyZXMpIGRlbGV0ZSBnX2hyZXNbaV07IFxyXG4gICAgZm9yIChjb25zdCBoZXJvIG9mIGdfdGVhbS5ocmVzKCkpICBnX2hyZXMucHVzaChoZXJvKTsgXHJcblxyXG4gICAgLy8gTWF6ZeOBq1RlYW3jgpLov73liqBcclxuICAgIGdfbWF6ZS5hZGRfb2JqKGdfdGVhbSBhcyBJX01hemVPYmopOyBcclxufVxyXG5cclxuLy8g5paw6KaP44Ky44O844Og44Gu5Yid5pyf44OH44O844K/44Gu6Kqt44G/6L6844G/KOaaq+WumilcclxuZXhwb3J0IGZ1bmN0aW9uIGRlY29kZV9tYXplKGpzb25PYmo6IGFueSk6IHZvaWQge1xyXG4gICAgLy8gTWF6ZemWoumAo+OBruODh+OCs+ODvOODiVxyXG4gICAgaWYgKGpzb25PYmo/Lm1hemUgIT09IHVuZGVmaW5lZCkgZ19tYXplLmRlY29kZShqc29uT2JqLm1hemUpO1xyXG5cclxuICAgIC8v44CAVGVhbemWoumAoyjnj77lnKjlnLAp44Gu44OH44Kz44O844OJXHJcbiAgICBpZiAoanNvbk9iaj8ucG9zICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBsZXQgcG9zID0gbmV3IENfUG9pbnREaXIoe1xyXG4gICAgICAgICAgICB4OiBqc29uT2JqLnBvcz8ueCwgXHJcbiAgICAgICAgICAgIHk6IGpzb25PYmoucG9zPy55LCBcclxuICAgICAgICAgICAgejoganNvbk9iai5wb3M/LnosIFxyXG4gICAgICAgICAgICBkOiBqc29uT2JqLnBvcz8uZCwgXHJcbiAgICAgICAgfSk7IFxyXG4gICAgICAgIGdfdGVhbS53YWxrKCkuc2V0X3BsYWNlKGdfbWF6ZSwgZ19teV91cmwsIHBvcyk7XHJcbiAgICAgICAgZ19zYXZlLm15cG9zID0gZ190ZWFtLmdldF9sb2MoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBIZXJv6Zai6YCj44Gu44OH44Kz44O844OJXHJcbiAgICBmb3IgKGNvbnN0IGkgaW4gZ19ocmVzKSBkZWxldGUgZ19ocmVzW2ldO1xyXG4gICAgZm9yIChjb25zdCBoZXJvIG9mIGdfdGVhbS5ocmVzKCkpIGdfaHJlcy5wdXNoKGhlcm8pO1xyXG5cclxuICAgIC8vIE1hemXjgatUZWFt44KS6L+95YqgXHJcbiAgICBnX21hemUuYWRkX29iaihnX3RlYW0gYXMgSV9NYXplT2JqKTtcclxuXHJcbiAgICAvLyBTYXZlRGF0YeOBruODmeODvOOCueOBruS9nOaIkFxyXG4gICAgZ19zYXZlLm15cG9zID0gZ190ZWFtLmdldF9sb2MoKTtcclxuICAgIGdfc2F2ZS5hbGxfbWF6ZVtnX21hemUudWlkKCldID0gZ19tYXplO1xyXG4gICAgZ19zYXZlLmFsbF90ZWFtW2dfdGVhbS51aWQoKV0gPSBnX3RlYW07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRfZ19zYXZlIChcclxuICAgICAgICBzYXZlX2lkOiAgIG51bWJlcixcclxuICAgICAgICB1bmlxX25vOiAgIG51bWJlciwgXHJcbiAgICAgICAgdGl0bGU6ICAgICBzdHJpbmcsIFxyXG4gICAgICAgIGRldGFpbDogICAgc3RyaW5nLCBcclxuICAgICAgICBwb2ludDogICAgIHN0cmluZyxcclxuICAgICAgICBhdXRvX21vZGU6IGJvb2xlYW4sXHJcbiAgICApOiB2b2lkIHtcclxuICAgICAgICBnX3NhdmUubXlwb3MgPSBnX3RlYW0uZ2V0X2xvYygpO1xyXG5cclxuICAgICAgICBnX3NhdmUuYWxsX3RlYW1bZ190ZWFtLnVpZCgpXSA9IGdfdGVhbTtcclxuICAgICAgICBnX3NhdmUuYWxsX21hemVbZ19tYXplLnVpZCgpXSA9IGdfbWF6ZTsgLy9cclxuXHJcbiAgICAgICAgZ19zYXZlLmRlY29kZSh7XHJcbiAgICAgICAgICAgIHNhdmVfaWQ6ICAgc2F2ZV9pZCwgXHJcbiAgICAgICAgICAgIHBsYXllcl9pZDogZ19zdGFydF9lbnYucGlkLFxyXG4gICAgICAgICAgICB1bmlxX25vOiAgIHVuaXFfbm8sIFxyXG4gICAgICAgICAgICB0aXRsZTogICAgIHRpdGxlLCBcclxuICAgICAgICAgICAgZGV0YWlsOiAgICBkZXRhaWwsXHJcbiAgICAgICAgICAgIHBvaW50OiAgICAgcG9pbnQsIFxyXG4gICAgICAgICAgICBhdXRvX21vZGU6IGF1dG9fbW9kZSA/ICcxJyA6ICcwJyxcclxuICAgICAgICAgICAgaXNfYWN0aXZlOiAnMScsXHJcbiAgICAgICAgICAgIGlzX2RlbGV0ZTogJzAnLFxyXG4gICAgXHJcbi8vIOWIneacn+ioreWumuOBi+ODreODvOODieOBruaZgueCueOBp+ioreWumuOBleOCjOOBpuOBhOOCi+OBr+OBmlxyXG4vLyAgICAgICAgICAgIGFsbF9tdnB0OiBhbGxfbXZwdCxcclxuLy8gICAgICAgICAgICBhbGxfbWF6ZTogYWxsX21hemUsXHJcbi8vICAgICAgICAgICAgYWxsX3RlYW06IGFsbF90ZWFtLFxyXG4vLyAgICAgICAgICAgIGFsbF9ndWxkOiBhbGxfZ3VsZCxcclxuICAgICAgICB9KTtcclxufVxyXG4iLCJpbXBvcnQgeyBUX0N0bHNNb2RlIH0gICAgZnJvbSBcIi4vVF9DdGxzTW9kZVwiO1xyXG5leHBvcnQgY29uc3QgZ19jdGxzX21vZGU6IFRfQ3Rsc01vZGVbXSA9IG5ldyBBcnJheSgxKSBhcyBUX0N0bHNNb2RlW107XHJcblxyXG5pbXBvcnQgeyBpbml0X21hemVDaCwgZGlzcGxheV9tYXplQ2ggfSBmcm9tIFwiLi9GX2Rpc3BsYXlfbWF6ZUNoXCI7XHJcbmltcG9ydCB7IGluaXRfbWF6ZTNELCBUX0Ryb3dTZXQgfSAgICAgICAgICAgIGZyb20gXCIuL0ZfZGlzcGxheV9tYXplM0RcIjtcclxuZXhwb3J0IHZhciBnX2RzOiBUX0Ryb3dTZXQgICA9IHtjYW52YXM6IG51bGwsIGNvbjogbnVsbCwgZGVwdGg6IDAsIHdhbGw6IG51bGx9O1xyXG5cclxuaW1wb3J0IHsgQ19Td2l0Y2hWaWV3IH0gICAgICAgICAgZnJvbSBcIi4vQ19Td2l0Y2hWaWV3XCI7XHJcbmV4cG9ydCB2YXIgZ192c3c6IENfU3dpdGNoVmlldztcclxuXHJcbmltcG9ydCB7IENfT25lTGluZVZpZXdNZXNzYWdlIH0gIGZyb20gXCIuLi9kX3ZpZS9DX09uZUxpbmVWaWV3TWVzc2FnZVwiO1xyXG5leHBvcnQgdmFyIGdfbXZtOiBDX09uZUxpbmVWaWV3TWVzc2FnZTtcclxuZXhwb3J0IHZhciBnX2N2bTogQ19PbmVMaW5lVmlld01lc3NhZ2U7XHJcblxyXG5pbXBvcnQgeyBDX0hlcm8gfSBmcm9tIFwiLi4vZF9tZGwvQ19IZXJvXCI7XHJcbmV4cG9ydCBjb25zdCBnX2hyZXM6IENfSGVyb1tdID0gW107XHJcblxyXG5pbXBvcnQgeyBDX01hemUgfSBmcm9tIFwiLi4vZF9tZGwvQ19NYXplXCI7XHJcbmV4cG9ydCBjb25zdCBnX21hemUgPSBuZXcgQ19NYXplKCk7XHJcblxyXG5pbXBvcnQgeyBDX1RlYW0gfSBmcm9tIFwiLi4vZF9tZGwvQ19UZWFtXCI7XHJcbmV4cG9ydCBjb25zdCBnX3RlYW0gPSBuZXcgQ19UZWFtKCk7XHJcblxyXG5pbXBvcnQgeyBDX0d1aWxkIH0gZnJvbSBcIi4uL2RfbWRsL0NfR3VpbGRcIjtcclxuZXhwb3J0IGNvbnN0IGdfZ3VsZCA9IG5ldyBDX0d1aWxkKCk7XHJcblxyXG5cclxuaW1wb3J0IHsgQ19EZWZhdWx0Q3RscyB9ICAgICAgICAgICAgZnJvbSAnLi9DX0RlZmF1bHRDdGxzJztcclxuZXhwb3J0IGxldCBnX2N0bHM6IENfRGVmYXVsdEN0bHM7XHJcblxyXG5pbXBvcnQgeyBpbml0X2FsbF9tb2RlIH0gICAgICAgICAgICBmcm9tIFwiLi9GX3NldF9tb2RlXCI7XHJcbmltcG9ydCB7IGRlY29kZV9hbGwsIGRlY29kZV9tYXplIH0gIGZyb20gXCIuL0Zfc2V0X3NhdmVfbW9kZVwiO1xyXG5pbXBvcnQgeyBkb19tb3ZlX2JvdHRvbV9oYWxmLCBhY3RfbW92ZV9tb2RlIH0gZnJvbSBcIi4vRl9zZXRfbW92ZV9tb2RlXCI7XHJcblxyXG5pbXBvcnQgeyBcclxuICAgIGdlbmVyYWxfbG9hZCwgXHJcbiAgICBnZXRfbWFpX21hemUsIFxyXG4gICAgZ2V0X25ld19tYXplLCBcclxuICAgIHRtcF9sb2FkIFxyXG59IGZyb20gXCIuLi9kX2Ntbi9GX2xvYWRfYW5kX3NhdmVcIjtcclxuXHJcbmltcG9ydCB7IFxyXG4gICAgZ19hbGVydCxcclxuICAgIGdfZGVidWcsXHJcbiAgICBnX21lcywgXHJcbiAgICBnX3JlYWR5X2dhbWVzLCBcclxuICAgIGdfc3RhcnRfZW52LCBcclxuICAgIGluaXRfYWZ0ZXJfbG9hZGVkX0RPTV9pbl9jb21tb24gXHJcbn0gZnJvbSBcIi4uL2RfY21uL2dsb2JhbFwiO1xyXG5pbXBvcnQgeyBfaXJhbmQgfSBmcm9tIFwiLi4vZF91dGwvRl9SYW5kXCI7XHJcbmltcG9ydCB7IENfTWF6ZU9iaiB9IGZyb20gXCIuLi9kX21kbC9DX01hemVPYmpcIjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpbml0X2JlZm9yZV9nYW1lcygpOiB2b2lkIHtcclxuICAgIHN3aXRjaCAoZ19zdGFydF9lbnYubW9kZSkge1xyXG4gICAgICAgIGNhc2UgJ25ldyc6XHJcbiAgICAgICAgICAgIGluaXRfYmVmb3JlX25ld19nYW1lcygpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgY2FzZSAnbG9hZCc6XHJcbiAgICAgICAgICAgIGluaXRfYmVmb3JlX2xvYWRfZ2FtZXMoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGNhc2UgJ3N0YXJ0JzpcclxuICAgICAgICAgICAgaW5pdF9iZWZvcmVfc3RhcnRfZ2FtZXMoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIGNhc2UgJ212cHQnOlxyXG4gICAgICAgICAgICBpbml0X2JlZm9yZV9tdnB0X2dhbWVzKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgIH1cclxufVxyXG5leHBvcnQgZnVuY3Rpb24gaW5pdF9iZWZvcmVfbmV3X2dhbWVzKCk6IHZvaWQge1xyXG4gICAgZ2V0X21haV9tYXplKCkudGhlbigoanNvbk9iajphbnkpPT57XHJcbiAgICAgICAgZGVjb2RlX2FsbChqc29uT2JqPy5zYXZlKTtcclxuICAgICAgICBpbnN0YWxsX29ianMoNSk7ICAgICAgICAgICAgICAgICAgIC8vIOaaq+WumihDX29ianPjga7jg4bjgrnjg4jnlKgpXHJcbiAgICAgICAgZG9fbG9hZF9ib3R0b21faGFsZignJyk7XHJcbiAgICB9KTtcclxufVxyXG5mdW5jdGlvbiBpbml0X2JlZm9yZV9sb2FkX2dhbWVzKCk6IHZvaWQge1xyXG4gICAgY29uc3QgdW5vID0gTnVtYmVyKGdfc3RhcnRfZW52Lm9wdCk7XHJcbiAgICBnZW5lcmFsX2xvYWQodW5vKS50aGVuKChqc29uT2JqOmFueSk9PnsgIFxyXG4gICAgICAgIGRlY29kZV9hbGwoanNvbk9iaj8uc2F2ZSk7XHJcbiAgICAgICAgZG9fbG9hZF9ib3R0b21faGFsZign44Ot44O844OJ44GX44G+44GX44GfJyk7IFxyXG4gICAgfSk7XHJcbn1cclxuZnVuY3Rpb24gaW5pdF9iZWZvcmVfc3RhcnRfZ2FtZXMoKTogdm9pZCB7XHJcbiAgICBjb25zdCBtYXplX25hbWUgPSBnX3N0YXJ0X2Vudi5vcHQ7XHJcbiAgICB0bXBfbG9hZCgpLnRoZW4oKGpzb25PYmo6YW55KT0+e1xyXG4gICAgICAgIGRlY29kZV9hbGwoanNvbk9iaj8uc2F2ZSk7XHJcbiAgICAgICAgZ2V0X25ld19tYXplKG1hemVfbmFtZSkudGhlbigoanNvbk9iajphbnkpPT57IFxyXG4gICAgICAgICAgICBkZWNvZGVfbWF6ZShqc29uT2JqPy5kYXRhKTtcclxuICAgICAgICAgICAgZG9fbG9hZF9ib3R0b21faGFsZign5YaS6Zm644KS5aeL44KB44G+44GX44KH44GG77yBJyk7IFxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn1cclxuZnVuY3Rpb24gaW5pdF9iZWZvcmVfbXZwdF9nYW1lcygpOiB2b2lkIHtcclxuICAgIHRtcF9sb2FkKCkudGhlbigoanNvbk9iajphbnkpPT57ICBcclxuICAgICAgICBkZWNvZGVfYWxsKGpzb25PYmo/LnNhdmUpO1xyXG4gICAgICAgIGRvX2xvYWRfYm90dG9tX2hhbGYoJ+WGkumZuuOCkuWGjemWi+OBl+OBvuOBl+OCh+OBhu+8ge+8gScpOyBcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZG9fbG9hZF9ib3R0b21faGFsZihtc2c6IHN0cmluZyk6IHZvaWR7XHJcbiAgICBpbml0X21hemVDaCgpO1xyXG4gICAgZ19kcyA9IGluaXRfbWF6ZTNEKCk7IFxyXG5cclxuICAgIGdfbXZtLm5vdGljZV9tZXNzYWdlKG1zZyk7IFxyXG4gICAgZ19tZXMubm90aWNlX21lc3NhZ2UobXNnKTsgXHJcbiAgICBhY3RfbW92ZV9tb2RlKCk7ICBcclxuICAgIGRvX21vdmVfYm90dG9tX2hhbGYoJ2JsaW5rX29mZicpOyBcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGluaXRfYWZ0ZXJfbG9hZGVkX0RPTSgpOiB2b2lkIHsgXHJcbiAgICBpbml0X2FmdGVyX2xvYWRlZF9ET01faW5fY29tbW9uKCdkZWJ1Z19tb2RlJywgJ3BhbmVfc3l0bV9sb2dzJyk7IFxyXG5cclxuICAgIGdfbXZtICA9IENfT25lTGluZVZpZXdNZXNzYWdlLmdldE9iaignbWF6ZV9tZXNnJyk7IFxyXG4gICAgZ19jdm0gID0gQ19PbmVMaW5lVmlld01lc3NhZ2UuZ2V0T2JqKCdtZW51X21lc2cnKTsgXHJcbiAgICBnX2N0bHMgPSBDX0RlZmF1bHRDdGxzLmdldE9iaigpOyBcclxuICAgIGdfdnN3ICA9IENfU3dpdGNoVmlldy5nZXRPYmooKTsgXHJcblxyXG4gICAgaW5pdF9kZWJ1Z19tb2RlKCk7XHJcbiAgICBzdG9wX2RvdWJsZV9jbGljaygpOyBcclxuXHJcbiAgICBpbml0X2FsbF9tb2RlKCk7XHJcbiAgICBnX3JlYWR5X2dhbWVzLnNldEZ1bmN0aW9uKGluaXRfYmVmb3JlX2dhbWVzKTsgXHJcbiAgICBnX3JlYWR5X2dhbWVzLnNldExvYWRlZERPTSgpOyBcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGluaXRfZGVidWdfbW9kZSgpOiB2b2lkIHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgYWxlcnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWxlcnRfbW9kZScpO1xyXG4gICAgICAgIGFsZXJ0Py5zdHlsZS5zZXRQcm9wZXJ0eSgnZGlzcGxheScsICdub25lJyk7XHJcbiAgICAgICAgYWxlcnQ/LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLChldmVudDpNb3VzZUV2ZW50KT0+e1xyXG4gICAgICAgICAgICB0cnl7Z19hbGVydC5zaG93KCk7fSBjYXRjaChlcnIpe307XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGdfZGVidWcuc2V0T2JqKHtcclxuICAgICAgICAgICAgeW46ICAgICAgICBmYWxzZSxcclxuICAgICAgICAgICAgb25OYW1lOiAgICdERUJVRycsXHJcbiAgICAgICAgICAgIG9mZk5hbWU6ICAn6YCa5bi4JyxcclxuICAgICAgICAgICAgb25DbGFzczogICdkZWJ1ZycsXHJcbiAgICAgICAgICAgIG9mZkNsYXNzOiAnbm9ybWFsJyxcclxuICAgICAgICB9KTtcclxuICAgICAgICBnX2RlYnVnLmFkZEZuYyh0b2dnbGVfZGVidWdfbW9kZSk7Ly9nX2RlYnVnLnNldE9OKCk7XHJcblxyXG4gICAgICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZWJ1Z19tb2RlJykgYXMgSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsKGV2ZW50KT0+e1xyXG4gICAgICAgICAgICBzd2l0Y2ggKGV2ZW50LmNvZGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJOdW1wYWRNdWx0aXBseVwiOlxyXG4gICAgICAgICAgICAgICAgY2FzZSBcIkVzY2FwZVwiOlxyXG4gICAgICAgICAgICAgICAgICAgIGJ0bi5jbGljaygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH0gY2F0Y2ggKGVycikge3JldHVybn07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRvZ2dsZV9kZWJ1Z19tb2RlKHluOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICBkaXNwbGF5X21hemVDaCgpO1xyXG5cclxuICAgIGNvbnN0IGFsZXJ0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FsZXJ0X21vZGUnKTtcclxuICAgIGNvbnN0IGRpc3BsYXkgPSB5biA/ICdibG9jaycgOiAnbm9uZSc7XHJcbiAgICBhbGVydD8uc3R5bGUuc2V0UHJvcGVydHkoJ2Rpc3BsYXknLCBkaXNwbGF5KTtcclxuXHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBzdG9wX2RvdWJsZV9jbGljaygpOiB2b2lkIHtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdkYmxjbGljaycsKGV2dDogTW91c2VFdmVudCkgPT57ZXZ0LnByZXZlbnREZWZhdWx0KCk7fSlcclxufVxyXG5cclxuLy8g5pqr5a6aKENfTWF6ZU9iauOBruODhuOCueODiOeUqClcclxuZnVuY3Rpb24gaW5zdGFsbF9vYmpzKG51bTogbnVtYmVyID0gMSk6IHZvaWQge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW07IGkrKykge1xyXG4gICAgICAgIGNvbnN0IHggPSBfaXJhbmQoMSwgKGdfbWF6ZS5nZXRfeF9tYXgoKSAtIDEpIC8gMikgKiAyICsgMTsgXHJcbiAgICAgICAgY29uc3QgeSA9IF9pcmFuZCgxLCAoZ19tYXplLmdldF95X21heCgpIC0gMSkgLyAyKSAqIDIgKyAxOyBcclxuICAgICAgICBjb25zdCBvYmogPSBDX01hemVPYmoubmV3T2JqKHtcclxuICAgICAgICAgICAgcG9zOiAgICB7eDp4LCB5OnksIHo6MCwgZDowfSxcclxuICAgICAgICAgICAgdmlldzoge1xyXG4gICAgICAgICAgICAgICAgbGF5ZXI6ICAgMixcclxuICAgICAgICAgICAgICAgIGxldHRlcjogJ+eJqScsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgZ19tYXplLmFkZF9vYmoob2JqKTtcclxuICAgIH1cclxufVxyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8vXHJcbi8vLyAgIOS4u+WHpueQhlxyXG4vLy9cclxuXHJcbmltcG9ydCB7IGluaXRfYWZ0ZXJfbG9hZGVkX0RPTSB9IGZyb20gXCIuL2dsb2JhbF9mb3JfbWF6ZVwiO1xyXG5cclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHsgXHJcbiAgICBpbml0X2FmdGVyX2xvYWRlZF9ET00oKTsgXHJcbn0pO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=