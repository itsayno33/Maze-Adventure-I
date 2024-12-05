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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QyxDQUFDLENBQUMsRUFBRSxHQUFLLG9CQUFPLEVBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztRQUVwQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBSSxvQkFBTyxFQUFDLENBQUMsRUFBRyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUksb0JBQU8sRUFBQyxDQUFDLEVBQUcsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFJLG9CQUFPLEVBQUMsQ0FBQyxFQUFHLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBSSxvQkFBTyxFQUFDLENBQUMsRUFBRyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFFcEMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUksb0JBQU8sRUFBQyxDQUFDLEVBQUksRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFJLG9CQUFPLEVBQUMsQ0FBQyxFQUFJLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBSSxvQkFBTyxFQUFDLENBQUMsRUFBSSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUksb0JBQU8sRUFBQyxDQUFDLEVBQUksRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFJLG9CQUFPLEVBQUMsQ0FBQyxFQUFJLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBSSxvQkFBTyxFQUFDLENBQUMsRUFBSSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDcEMsSUFBSSxD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Q3ZCLElBQUksQ0FBQyxRQUFRLEdBQU0sR0FBRyxDQUFDO1FBRXZCLElBQUksQ0FBQyxTQUFTLEdBQUssSUFBSSxDQUFDO1FBRXhCLElBQUksQ0FBQyxRQUFRLEdBQUssU0FBUyxDQUFDO1FBQzVCLElBQUksQ0FBQyxRQUFRLEdBQUssU0FBUyxDQUFDO1FBQzVCLElBQUksQ0FBQyxRQUFRLEdBQUssU0FBUyxDQUFDO1FBQzVCLElBQUksQ0FBQyxRQUFRLEdBQUssU0FBUyxDQUFDO1FBQzVCLElBQUksQ0FBQyxRQUFRLEdBQUssU0FBUyxDQUFDO1FBQzVCLElBQUksQ0FBQyxRQUFRLEdBQUssU0FBUyxDQUFDO1FBRTVCLElBQUksQ0FBQyxLQUFLLFNBQVM7WUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFDTyxNQUFNLENBQUMsQ0FBNkI7UUFDeEMsSUFBSSxDQUFDLEtBQUssU0FBUztZQUFFLE9BQU8sSUFBSSxDQUFDO1FBRWpDLElBQUksQ0FBQyxDQUFDLE1BQU0sS0FBTSxTQUFTO1lBQUUsSUFBSSxDQUFDLE1BQU0sR0FBTSxDQUFDLENBQUMsTUFBTSxDQUFDO1FBQ3ZELElBQUksQ0FBQyxDQUFDLEtBQUssS0FBTyxTQUFTO1lBQUUsSUFBSSxDQUFDLFFBQVEsR0FBSSxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQ3RELElBQUksQ0FBQyxDQUFDLE1BQU0sS0FBTSxTQUFTO1lBQUUsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsTUFBTSxLQUFLLEVBQUUsQ0FBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ2pGLElBQUksQ0FBQyxDQUFDLEtBQUssS0FBTyxTQUFTO1lBQUUsSUFBSSxDQUFDLFFBQVEsR0FBSSxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQ3RELElBQUksQ0FBQyxDQUFDLEtBQUssS0FBTyxTQUFTO1lBQUUsSUFBSSxDQUFDLFFBQVEsR0FBSSxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQ3RELElBQUksQ0FBQyxDQUFDLEtBQUssS0FBTyxTQUFTO1lBQUUsSUFBSSxDQUFDLFFBQVEsR0FBSSxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQ3RELElBQUksQ0FBQyxDQUFDLE1BQU0sS0FBTSxTQUFTO1lBQUUsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsTUFBTSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFLLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDbEYsSUFBSSxDQUFDLENBQUMsS0FBSyxLQUFPLFNBQVM7WUFBRSxJQUFJLENBQUMsUUFBUSxHQUFJLENBQUMsQ0FBQyxLQUFLLEtBQU0sRUFBRSxDQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFFLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDakYsSUFBSSxDQUFDLENBQUMsS0FBSyxLQUFPLFNBQVM7WUFBRSxJQUFJLENBQUMsUUFBUSxHQUFJLENBQUMsQ0FBQyxLQUFLLEtBQU0sRUFBRSxDQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFFLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDakYsSUFBSSxDQUFDLENBQUMsS0FBSyxLQUFPLFNBQVM7WUFBRSxJQUFJLENBQUMsUUFBUSxHQUFJLENBQUMsQ0FBQyxLQUFLLEtBQU0sRUFBRSxDQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFFLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDakYsSUFBSSxDQUFDLENBQUMsS0FBSyxLQUFPLFNBQVM7WUFBRSxJQUFJLENBQUMsUUFBUSxHQUFJLENBQUMsQ0FBQyxLQUFLLEtBQU0sRUFBRSxDQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFFLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDakYsSUFBSSxDQUFDLENBQUMsS0FBSyxLQUFPLFNBQVM7WUFBRSxJQUFJLENBQUMsUUFBUSxHQUFJLENBQUMsQ0FBQyxLQUFLLEtBQU0sRUFBRSxDQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFFLENBQUMsQ0FB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QUMsR0FBRyxPQUFPLENBQUM7SUFFMUUsTUFBTSxVQUFVLEdBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxPQUFPLENBQUM7SUFDMUUsTUFBTSxVQUFVLEdBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxPQUFPLENBQUM7SUFJMUUsTUFBTSxZQUFZLEdBQUcsRUFBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLEtBQUssR0FBRyxVQUFVLEVBQUUsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxLQUFLLEdBQUcsVUFBVSxFQUFDO0lBQ3ZGLE1BQU0sWUFBWSxHQUFHLEVBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxLQUFLLEdBQUcsVUFBVSxFQUFFLENBQUMsRUFBRSxTQUFTLENBQUMsS0FBSyxHQUFHLFVBQVUsRUFBQztJQUN2RixNQUFNLFlBQVksR0FBRyxFQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsS0FBSyxHQUFHLFVBQVUsRUFBRSxDQUFDLEVBQUUsU0FBUyxDQUFDLEtBQUssR0FBRyxVQUFVLEVBQUM7SUFDdkYsTUFBTSxZQUFZLEdBQUcsRUFBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLEtBQUssR0FBRyxVQUFVLEVBQUUsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxLQUFLLEdBQUcsVUFBVSxFQUFDO0lBRXZGLE1BQU0sWUFBWSxHQUFHLEVBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxLQUFLLEdBQUcsVUFBVSxFQUFFLENBQUMsRUFBRSxTQUFTLENBQUMsS0FBSyxHQUFHLFVBQVUsRUFBQztJQUN2RixNQUFNLFlBQVksR0FBRyxFQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsS0FBSyxHQUFHLFVBQVUsRUFBRSxDQUFDLEVBQUUsU0FBUyxDQUFDLEtBQUssR0FBRyxVQUFVLEVBQUM7SUFDdkYsTUFBTSxZQUFZLEdBQUcsRUFBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLEtBQUssR0FB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LGtCQUFrQixDQUFDLENBQUM7WUFDM0QsQ0FBQztZQUVELElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUMsQ0FBQyxhQUFELENBQUMsdUJBQUQsQ0FBQyxDQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztZQUMxRCxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDLENBQUMsYUFBRCxDQUFDLHVCQUFELENBQUMsQ0FBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7WUFDMUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxDQUFDLGFBQUQsQ0FBQyx1QkFBRCxDQUFDLENBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1lBQzFELElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUMsQ0FBQyxhQUFELENBQUMsdUJBQUQsQ0FBQyxDQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztZQUMxRCxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDLENBQUMsYUFBRCxDQUFDLHVCQUFELENBQUMsQ0FBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7WUFDMUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxDQUFDLGFBQUQsQ0FBQyx1QkFBRCxDQUFDLENBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1lBQzFELElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUMsQ0FBQyxhQUFELENBQUMsdUJBQUQsQ0FBQyxDQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztZQUMxRCxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDLENBQUMsYUFBRCxDQUFDLHVCQUFELENBQUMsQ0FBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7WUFDMUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxDQUFDLGFBQUQsQ0FBQyx1QkFBRCxDQUFDLENBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1lBQzFELElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUMsQ0FBQyxhQUFELENBQUMsdUJBQUQsQ0FBQyxDQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztZQUMxRCxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDLENBQUMsYUFBRCxDQUFDLHVCQUFELENBQUMsQ0FBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7WUFDMUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxDQUFDLGFBQUQsQ0FBQyx1QkFBRCxDQUFDLENBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1lBQzFELElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUMsQ0FBQyxhQUFELENB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QyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRTtJQUN4QywyQ0FBcUIsR0FBRSxDQUFDO0FBQzVCLENBQUMsQ0FBQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbWFpLy4vc3JjL2RfY21uL0NfQWxlcnRMb2cudHMiLCJ3ZWJwYWNrOi8vbWFpLy4vc3JjL2RfY21uL0NfRGlhbG9nLnRzIiwid2VicGFjazovL21haS8uL3NyYy9kX2Ntbi9GX1BPU1QudHMiLCJ3ZWJwYWNrOi8vbWFpLy4vc3JjL2RfY21uL0ZfbG9hZF9hbmRfc2F2ZS50cyIsIndlYnBhY2s6Ly9tYWkvLi9zcmMvZF9jbW4vZ2xvYmFsLnRzIiwid2VicGFjazovL21haS8uL3NyYy9kX2N0bC9DX0N0bEN1cnNvci50cyIsIndlYnBhY2s6Ly9tYWkvLi9zcmMvZF9jdGwvQ19Pbk9mZkJ1dHRvbi50cyIsIndlYnBhY2s6Ly9tYWkvLi9zcmMvZF9tZGwvQ19HdWlsZC50cyIsIndlYnBhY2s6Ly9tYWkvLi9zcmMvZF9tZGwvQ19IZXJvLnRzIiwid2VicGFjazovL21haS8uL3NyYy9kX21kbC9DX0hlcm9BYmlsaXR5LnRzIiwid2VicGFjazovL21haS8uL3NyYy9kX21kbC9DX0xvY2F0aW9uLnRzIiwid2VicGFjazovL21haS8uL3NyYy9kX21kbC9DX01hemUudHMiLCJ3ZWJwYWNrOi8vbWFpLy4vc3JjL2RfbWRsL0NfTWF6ZUNlbGwudHMiLCJ3ZWJwYWNrOi8vbWFpLy4vc3JjL2RfbWRsL0NfTWF6ZUluZm8udHMiLCJ3ZWJwYWNrOi8vbWFpLy4vc3JjL2RfbWRsL0NfTWF6ZU9iai50cyIsIndlYnBhY2s6Ly9tYWkvLi9zcmMvZF9tZGwvQ19NYXplT2JqVmlldy50cyIsIndlYnBhY2s6Ly9tYWkvLi9zcmMvZF9tZGwvQ19Nb3ZhYmxlUG9pbnQudHMiLCJ3ZWJwYWNrOi8vbWFpLy4vc3JjL2RfbWRsL0NfUG9pbnQudHMiLCJ3ZWJwYWNrOi8vbWFpLy4vc3JjL2RfbWRsL0NfUG9pbnREaXIudHMiLCJ3ZWJwYWNrOi8vbWFpLy4vc3JjL2RfbWRsL0NfUG9pbnRTZXQyRC50cyIsIndlYnBhY2s6Ly9tYWkvLi9zcmMvZF9tZGwvQ19SYW5nZS50cyIsIndlYnBhY2s6Ly9tYWkvLi9zcmMvZF9tZGwvQ19TYXZlRGF0YS50cyIsIndlYnBhY2s6Ly9tYWkvLi9zcmMvZF9tZGwvQ19TYXZlSW5mby50cyIsIndlYnBhY2s6Ly9tYWkvLi9zcmMvZF9tZGwvQ19UZWFtLnRzIiwid2VicGFjazovL21haS8uL3NyYy9kX21kbC9DX1RlYW1WaWV3LnRzIiwid2VicGFjazovL21haS8uL3NyYy9kX21kbC9DX1dhbGtlci50cyIsIndlYnBhY2s6Ly9tYWkvLi9zcmMvZF9tZGwvQ19XYWxsLnRzIiwid2VicGFjazovL21haS8uL3NyYy9kX21kbC9UX0RpcmVjdGlvbi50cyIsIndlYnBhY2s6Ly9tYWkvLi9zcmMvZF9tZGwvVF9NektpbmQudHMiLCJ3ZWJwYWNrOi8vbWFpLy4vc3JjL2RfdXRsL0NfVXJsT3B0LnRzIiwid2VicGFjazovL21haS8uL3NyYy9kX3V0bC9GX01hdGgudHMiLCJ3ZWJwYWNrOi8vbWFpLy4vc3JjL2RfdXRsL0ZfUmFuZC50cyIsIndlYnBhY2s6Ly9tYWkvLi9zcmMvZF92aWUvQ19EaXNwbGF5TWVzc2FnZS50cyIsIndlYnBhY2s6Ly9tYWkvLi9zcmMvZF92aWUvQ19PbmVMaW5lVmlld01lc3NhZ2UudHMiLCJ3ZWJwYWNrOi8vbWFpLy4vc3JjL21haV9tYXplL0NfRGVmYXVsdEN0bHMudHMiLCJ3ZWJwYWNrOi8vbWFpLy4vc3JjL21haV9tYXplL0NfU3dpdGNoVmlldy50cyIsIndlYnBhY2s6Ly9tYWkvLi9zcmMvbWFpX21hemUvRl9kaXNwbGF5X21hemUzRC50cyIsIndlYnBhY2s6Ly9tYWkvLi9zcmMvbWFpX21hemUvRl9kaXNwbGF5X21hemVDaC50cyIsIndlYnBhY2s6Ly9tYWkvLi9zcmMvbWFpX21hemUvRl9zZXRfVURfbW9kZS50cyIsIndlYnBhY2s6Ly9tYWkvLi9zcmMvbWFpX21hemUvRl9zZXRfbWVudV9tb2RlLnRzIiwid2VicGFjazovL21haS8uL3NyYy9tYWlfbWF6ZS9GX3NldF9tb2RlLnRzIiwid2VicGFjazovL21haS8uL3NyYy9tYWlfbWF6ZS9GX3NldF9tb3ZlX21vZGUudHMiLCJ3ZWJwYWNrOi8vbWFpLy4vc3JjL21haV9tYXplL0Zfc2V0X212cHRfbW9kZS50cyIsIndlYnBhY2s6Ly9tYWkvLi9zcmMvbWFpX21hemUvRl9zZXRfc2F2ZV9tb2RlLnRzIiwid2VicGFjazovL21haS8uL3NyYy9tYWlfbWF6ZS9nbG9iYWxfZm9yX21hemUudHMiLCJ3ZWJwYWNrOi8vbWFpL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL21haS8uL3NyYy9tYWlfbWF6ZS9tYWlfbWF6ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBfZ2V0X3V1aWQgfSBmcm9tIFwiLi4vZF91dGwvRl9SYW5kXCI7XG5pbXBvcnQgeyBDX0RpYWxvZyB9ICBmcm9tIFwiLi9DX0RpYWxvZ1wiO1xuXG5cbmV4cG9ydCBjbGFzcyBDX0FsZXJ0TG9nIGV4dGVuZHMgQ19EaWFsb2cge1xuICAgIHByb3RlY3RlZCBzdGF0aWMgbWU6IHtbaWQ6IHN0cmluZ106IENfQWxlcnRMb2d9O1xuICAgIHB1YmxpYyAgICBzdGF0aWMgZ2V0T2JqKHRhcmdldD86IEhUTUxEaWFsb2dFbGVtZW50KSB7XG4gICAgICAgIHRoaXMubWUgPz89IHt9O1xuICAgICAgICBpZiAodGFyZ2V0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRhcmdldCAgICA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpYWxvZycpIGFzIEhUTUxEaWFsb2dFbGVtZW50O1xuICAgICAgICAgICAgdGFyZ2V0LmlkID0gJ2RpYWxvZ18nICsgX2dldF91dWlkKCk7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRhcmdldCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5tZVt0YXJnZXQuaWRdID8/PSBuZXcgQ19BbGVydExvZyh0YXJnZXQpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBtc2c6IHtbdHRsOiBzdHJpbmddOiBzdHJpbmdbXX07XG5cbiAgICBwcm90ZWN0ZWQgcGFuZTogSFRNTERpdkVsZW1lbnR8dW5kZWZpbmVkO1xuICAgIHByb3RlY3RlZCBsb2dzOiBIVE1MRGl2RWxlbWVudHx1bmRlZmluZWQ7XG4gICAgcHJvdGVjdGVkIGJ0bnM6IEhUTUxEaXZFbGVtZW50fHVuZGVmaW5lZDtcbiAgICBwcm90ZWN0ZWQgdXBkOiAgSFRNTEJ1dHRvbkVsZW1lbnR8dW5kZWZpbmVkO1xuICAgIHByb3RlY3RlZCBjbHI6ICBIVE1MQnV0dG9uRWxlbWVudHx1bmRlZmluZWQ7XG4gICAgcHJvdGVjdGVkIGNsczogIEhUTUxCdXR0b25FbGVtZW50fHVuZGVmaW5lZDtcblxuICAgIHByb3RlY3RlZCBjb25zdHJ1Y3Rvcih0YXJnZXQ6IEhUTUxEaWFsb2dFbGVtZW50KSB7XG4gICAgICAgIHN1cGVyKHRhcmdldCk7XG4gICAgICAgIHRoaXMubXNnID0ge307XG5cbiAgICAgICAgdGhpcy5fX2NsZWFyRGlhbG9nKCk7XG4gICAgICAgIHRoaXMuX19tYWtlRGlhbG9nKCk7XG4gICAgfVxuICAgIHByb3RlY3RlZCBfX2NsZWFyRGlhbG9nKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBjdHggPSBzdXBlci5nZXRXaW5kb3coKTtcbiAgICAgICAgd2hpbGUgKGN0eC5maXJzdENoaWxkKSBjdHgucmVtb3ZlQ2hpbGQoY3R4LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBwcm90ZWN0ZWQgX19tYWtlRGlhbG9nKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBjdHggPSBzdXBlci5nZXRXaW5kb3coKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMucGFuZSA9IHRoaXMuX19tYWtlV2luZG93ICgncGFuZScpO1xuXG4gICAgICAgICAgICB0aGlzLmxvZ3MgPSB0aGlzLl9fbWFrZVBhbmVsICgnbG9ncycsICAgdGhpcy5wYW5lKTtcbiAgICAgICAgICAgIHRoaXMuYnRucyA9IHRoaXMuX19tYWtlUGFuZWwgKCdidG5zJywgICB0aGlzLnBhbmUpO1xuXG4gICAgICAgICAgICB0aGlzLnVwZCAgPSB0aGlzLl9fbWFrZUJ1dHRvbigndXBkYXRlJywgJ+abtOaWsCcsICAgdGhpcy5idG5zKTtcbiAgICAgICAgICAgIHRoaXMuY2xyICA9IHRoaXMuX19tYWtlQnV0dG9uKCdjbGVhcicsICAn5raI5Y67JywgICB0aGlzLmJ0bnMpO1xuICAgICAgICAgICAgdGhpcy5jbHMgID0gdGhpcy5fX21ha2VCdXR0b24oJ2Nsb3NlJywgICfplonjgZjjgosnLCB0aGlzLmJ0bnMpO1xuXG4gICAgICAgICAgICB0aGlzLnVwZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT57dGhpcy51cGRhdGUoKX0sIGZhbHNlKTtcbiAgICAgICAgICAgIHRoaXMuY2xyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCk9Pnt0aGlzLmNsZWFyICgpfSwgZmFsc2UpO1xuICAgICAgICAgICAgdGhpcy5jbHMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+e3RoaXMuaGlkZSAgKCl9LCBmYWxzZSk7XG5cbiAgICAgICAgICAgIHRoaXMubG9ncy5zdHlsZS5zZXRQcm9wZXJ0eSgndXNlci1zZWxlY3QnLCAndGV4dCcpO1xuICAgICAgICAgICAgdGhpcy5sb2dzLnN0eWxlLnNldFByb3BlcnR5KCdtYXgtd2lkdGgnLCAgICc5MGR2dycpO1xuICAgICAgICAgICAgdGhpcy5sb2dzLnN0eWxlLnNldFByb3BlcnR5KCdtaW4taGVpZ2h0JywgICczLjByZW0nKTtcbiAgICAgICAgICAgIHRoaXMubG9ncy5zdHlsZS5zZXRQcm9wZXJ0eSgnbWF4LWhlaWdodCcsICAnODBkdmgnKTtcbiAgICAgICAgICAgIHRoaXMubG9ncy5zdHlsZS5zZXRQcm9wZXJ0eSgnb3ZlcmZsb3cteCcsICAnYXV0bycpO1xuICAgICAgICAgICAgdGhpcy5sb2dzLnN0eWxlLnNldFByb3BlcnR5KCdvdmVyZmxvdy15JywgICdhdXRvJyk7XG4gICAgICAgICAgICB0aGlzLnNldFpvb21FbG0odGhpcy5sb2dzKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7fVxuICAgIH1cbiAgICBwcm90ZWN0ZWQgX19tYWtlV2luZG93KGlkOiBzdHJpbmcpOiBIVE1MRGl2RWxlbWVudCB7XG4gICAgICAgIGNvbnN0IGRpdiAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSBhcyBIVE1MRGl2RWxlbWVudDtcbiAgICAgICAgZGl2LmlkICAgICA9IGAke3RoaXMuaWR9XyR7aWR9YDtcbiAgICAgICAgdGhpcy5zZXRXaW5kb3coZGl2KTtcbiAgICAgICAgcmV0dXJuIGRpdjtcbiAgICB9XG4gICAgcHJvdGVjdGVkIF9fbWFrZVBhbmVsKGlkOiBzdHJpbmcsIHBhcmVudDogSFRNTEVsZW1lbnQpOiBIVE1MRGl2RWxlbWVudCB7XG4gICAgICAgIGNvbnN0IGRpdiAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSBhcyBIVE1MRGl2RWxlbWVudDtcbiAgICAgICAgZGl2LmlkICAgICA9IGAke3RoaXMuaWR9XyR7aWR9YDtcbiAgICAgICAgcGFyZW50LmFwcGVuZENoaWxkKGRpdik7XG4gICAgICAgIHJldHVybiBkaXY7XG4gICAgfVxuICAgIHByb3RlY3RlZCBfX21ha2VCdXR0b24oaWQ6IHN0cmluZywgbmFtZTogc3RyaW5nLCBwYXJlbnQ6IEhUTUxFbGVtZW50KTogSFRNTEJ1dHRvbkVsZW1lbnQge1xuICAgICAgICBjb25zdCBidG4gID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJykgYXMgSFRNTEJ1dHRvbkVsZW1lbnQ7XG4gICAgICAgIGJ0bi5pZCAgICAgICAgID0gYCR7dGhpcy5pZH1fJHtpZH1gO1xuICAgICAgICBidG4uaW5uZXJIVE1MICA9IG5hbWU7XG4gICAgICAgIHBhcmVudC5hcHBlbmRDaGlsZChidG4pO1xuICAgICAgICByZXR1cm4gYnRuO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRfbWVzc2FnZSh0dGw6IHN0cmluZywgbXNnOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgKHRoaXMubXNnW3R0bF0gPz89IFtdKS5wdXNoKG1zZyk7XG4gICAgICAgIHRoaXMuX19kb21fdXBkYXRlKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGNscl9tZXNzYWdlKHR0bD86IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBpZiAodHRsICE9PSB1bmRlZmluZWQpIHt0aGlzLm1zZ1t0dGxdID0gW107cmV0dXJuO31cbiAgICAgICAgZm9yIChjb25zdCBpaSBpbiB0aGlzLm1zZykgdGhpcy5tc2dbaWldID0gW107XG4gICAgICAgIHRoaXMuX19kb21fY2xlYXIoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7dGhpcy5fX2RvbV91cGRhdGUoKX1cbiAgICBwcm90ZWN0ZWQgX19kb21fdXBkYXRlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9fZG9tX2NsZWFyKCk7XG4gICAgICAgIGZvciAoY29uc3QgdGl0bGUgaW4gdGhpcy5tc2cpIHtcbiAgICAgICAgICAgIGZvciAobGV0IG1zZyBvZiB0aGlzLm1zZ1t0aXRsZV0pIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ZpZWxkc2V0JykgYXMgSFRNTEZpZWxkU2V0RWxlbWVudDtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGxnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGVnZW5kJykgICBhcyBIVE1MTGVnZW5kRWxlbWVudDtcbiAgICAgICAgICAgICAgICBsZy5pbm5lckhUTUwgPSBgJHt0aXRsZX0gKCR7RGF0ZS5ub3coKS50b1N0cmluZygpfSlgO1xuICAgICAgICAgICAgICAgIGZzLmFwcGVuZENoaWxkKGxnKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHByID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncHJlJykgICAgICBhcyBIVE1MUHJlRWxlbWVudDtcbiAgICAgICAgICAgICAgICBmcy5hcHBlbmRDaGlsZChwcik7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgIGNvbnN0IHBnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpICAgIGFzIEhUTUxQYXJhZ3JhcGhFbGVtZW50O1xuICAgICAgICAgICAgICAgIHBnLmlubmVySFRNTCA9IG1zZztcbiAgICAgICAgICAgICAgICBwci5hcHBlbmRDaGlsZChwZyk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmxvZ3M/LmFwcGVuZENoaWxkKGZzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyBjbGVhcigpOiB2b2lkIHt0aGlzLmNscl9tZXNzYWdlKCl9XG4gICAgcHJvdGVjdGVkIF9fZG9tX2NsZWFyKCk6IHZvaWQge1xuICAgICAgICB3aGlsZSAodGhpcy5sb2dzPy5maXJzdENoaWxkKSB0aGlzLmxvZ3MucmVtb3ZlQ2hpbGQodGhpcy5sb2dzLmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzaG93KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICB0cnkge3N1cGVyLnNob3coKTt9IGNhdGNoIChlcnIpIHt9XG4gICAgfVxuICAgIHB1YmxpYyBoaWRlKCk6IHZvaWQge1xuICAgICAgICB0cnkge3N1cGVyLmhpZGUoKTt9IGNhdGNoIChlcnIpIHt9XG4gICAgfVxuICAgIHB1YmxpYyBkaXNwbGF5KHluOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHluP3RoaXMuc2hvdygpOnRoaXMuaGlkZSgpO1xuICAgIH1cbn1cblxuIiwiaW1wb3J0IHsgX2dldE51bSB9IGZyb20gXCIuLi9kX3V0bC9GX01hdGhcIjtcbmltcG9ydCB7IF9nZXRfdXVpZCB9IGZyb20gXCIuLi9kX3V0bC9GX1JhbmRcIjtcbnR5cGUgeHkgPSB7eDogbnVtYmVyLCB5OiBudW1iZXJ9O1xuXG5leHBvcnQgY2xhc3MgQ19EaWFsb2cge1xuICAgIHByb3RlY3RlZCBpZDogIHN0cmluZztcbiAgICBwcml2YXRlICAgX19kaWE6IEhUTUxEaWFsb2dFbGVtZW50O1xuICAgIHByaXZhdGUgICBfX3BhbjogSFRNTERpdkVsZW1lbnQ7XG4gICAgcHJpdmF0ZSAgIF9fY3R4OiBIVE1MRGl2RWxlbWVudDtcbiAgICBwcml2YXRlICAgX19tb3A6IHh5ID0ge3g6MCwgeTowfTtcbiAgICBwcml2YXRlICAgX19yc3o6IHtbaWQ6IHN0cmluZ106IHJlc2l6ZURvbX07XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IodGFyZ2V0PzogSFRNTERpYWxvZ0VsZW1lbnQpIHtcbiAgICAgICAgaWYgKHRhcmdldCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0YXJnZXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaWFsb2cnKSBhcyBIVE1MRGlhbG9nRWxlbWVudDtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGFyZ2V0KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGFyZ2V0LmlkID09PSB1bmRlZmluZWQgfHwgdGFyZ2V0LmlkID09PSAnJykgdGFyZ2V0LmlkID0gJ2RpYWxvZ18nICsgX2dldF91dWlkKCk7XG4gICAgICAgIHRoaXMuaWQgPSB0YXJnZXQuaWQ7XG5cbiAgICAgICAgdGFyZ2V0LnN0eWxlLm1hcmdpbiAgPSAnMCc7XG4gICAgICAgIHRhcmdldC5zdHlsZS5wYWRkaW5nID0gJzAnO1xuICAgICAgICB0aGlzLl9fZGlhID0gdGFyZ2V0O1xuXG4gICAgICAgIHRoaXMuX19wYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSBhcyBIVE1MRGl2RWxlbWVudDtcbiAgICAgICAgdGhpcy5fX3NldF9kaWFsb2dfc3R5bGUoKTtcblxuXG4gICAgICAgIHRoaXMuX19jdHggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSBhcyBIVE1MRGl2RWxlbWVudDtcbiAgICAgICAgdGhpcy5fX2N0eC5zdHlsZS5ncmlkQXJlYSA9ICdtbSc7XG4gICAgICAgIHRoaXMuX19wYW4uYXBwZW5kQ2hpbGQodGhpcy5fX2N0eCk7XG5cbiAgICAgICAgdGhpcy5fX3JzeiA9IHt9O1xuXG4gICAgICAgIHRoaXMuX19zZXRfYmFyX3N0eWxlKCd0bScpO1xuICAgICAgICB0aGlzLl9fc2V0X2Jhcl9zdHlsZSgnbWwnKTtcbiAgICAgICAgdGhpcy5fX3NldF9iYXJfc3R5bGUoJ21yJyk7XG4gICAgICAgIHRoaXMuX19zZXRfYmFyX3N0eWxlKCdibScpO1xuXG4gICAgICAgIHRoaXMuX19zZXRfY29ybmVyX3N0eWxlKCd0bCcpO1xuICAgICAgICB0aGlzLl9fc2V0X2Nvcm5lcl9zdHlsZSgndHInKTtcbiAgICAgICAgdGhpcy5fX3NldF9jb3JuZXJfc3R5bGUoJ2JsJyk7XG4gICAgICAgIHRoaXMuX19zZXRfY29ybmVyX3N0eWxlKCdicicpO1xuXG5cbiAgICAgICAgdGhpcy5fX2RpYS5hcHBlbmRDaGlsZCh0aGlzLl9fcGFuKTtcbiAgICB9IFxuICAgIHByaXZhdGUgX19zZXRfZGlhbG9nX3N0eWxlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9fZGlhLnN0eWxlLmJvcmRlciAgICAgICA9ICdub25lJztcbiAgICAgICAgdGhpcy5fX2RpYS5zdHlsZS5ib3JkZXJSYWRpdXMgPSAnMTBweCc7XG4gICAgICAgIHRoaXMuX19kaWEuc3R5bGUudXNlclNlbGVjdCAgID0gJ2F1dG8nO1xuICAgICAgICB0aGlzLl9fZGlhLnN0eWxlLm1hcmdpbiAgICAgICA9ICcwJztcbiAgICAgICAgdGhpcy5fX2RpYS5zdHlsZS5wYWRkaW5nICAgICAgPSAnMCc7XG5cbiAgICAgICAgdGhpcy5fX3Bhbi5zdHlsZS5kaXNwbGF5ICAgICAgPSAnZ3JpZCc7XG4gICAgICAgIHRoaXMuX19wYW4uc3R5bGUuZ3JpZFRlbXBsYXRlQ29sdW1ucyA9IGBcbiAgICAgICAgICAgIFt0bC1zdGFydCBtbC1zdGFydCBibC1zdGFydF1cbiAgICAgICAgICAgIDIwcHhcbiAgICAgICAgICAgIFt0bC1lbmQgbWwtZW5kIGJsLWVuZCB0bS1zdGFydCBtbS1zdGFydCBibS1zdGFydF1cbiAgICAgICAgICAgIDFmclxuICAgICAgICAgICAgW3RtLWVuZCBtbS1lbmQgYm0tZW5kIHRyLXN0YXJ0IG1yLXN0YXJ0IGJyLXN0YXJ0XVxuICAgICAgICAgICAgMjBweFxuICAgICAgICAgICAgW3RyLWVuZCBtci1lbmQgYnItZW5kXVxuICAgICAgICBgO1xuICAgICAgICB0aGlzLl9fcGFuLnN0eWxlLmdyaWRUZW1wbGF0ZVJvd3MgPSBgXG4gICAgICAgICAgICBbdGwtc3RhcnQgdG0tc3RhcnQgdHItc3RhcnRdXG4gICAgICAgICAgICAyMHB4XG4gICAgICAgICAgICBbdGwtZW5kIHRtLWVuZCB0ci1lbmQgbWwtc3RhcnQgbW0tc3RhcnQgbXItc3RhcnRdXG4gICAgICAgICAgICAxZnJcbiAgICAgICAgICAgIFttbC1lbmQgbW0tZW5kIG1yLWVuZCBibC1zdGFydCBibS1zdGFydCBici1zdGFydF1cbiAgICAgICAgICAgIDIwcHhcbiAgICAgICAgICAgIFtibC1lbmQgYm0tZW5kIGJyLWVuZF1cbiAgICAgICAgYDtcblxuLy8gICAgICAgIHRoaXMuX19wYW4uc3R5bGUuZ3JpZFRlbXBsYXRlQXJlYXMgPSAnXCJ0bCB0bSB0clwiIFwibWwgbW0gbXJcIiBcImJsIGJtIGJyXCInO1xuICAgIH1cbiAgICBwcml2YXRlIF9fc2V0X2Jhcl9zdHlsZShhcmVhOiBzdHJpbmcpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGNvbnN0IGVsbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpIGFzIEhUTUxEaXZFbGVtZW50O1xuICAgICAgICBlbG0uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ2xpZ2h0Y3lhbic7XG4gICAgICAgIGVsbS5zdHlsZS51c2VyU2VsZWN0ICAgICAgPSAnbm9uZSc7XG4gICAgICAgIGVsbS5zdHlsZS5ncmlkQXJlYSA9IGFyZWE7XG4gICAgICAgIHRoaXMuX19zZXRfbW92ZV9kaWFsb2coZWxtKTtcbiAgICAgICAgdGhpcy5fX3Bhbi5hcHBlbmRDaGlsZChlbG0pO1xuICAgICAgICByZXR1cm4gZWxtO1xuICAgIH1cbiAgICBwcml2YXRlIF9fc2V0X2Nvcm5lcl9zdHlsZShhcmVhOiBzdHJpbmcpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIGNvbnN0IGVsbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpIGFzIEhUTUxEaXZFbGVtZW50O1xuICAgICAgICBlbG0uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ2N5YW4nO1xuICAgICAgICBlbG0uc3R5bGUudXNlclNlbGVjdCAgICAgID0gJ25vbmUnO1xuICAgICAgICBlbG0uc3R5bGUuZ3JpZEFyZWEgPSBhcmVhO1xuXG4gICAgICAgIGlmIChlbG0uaWQgPT09IHVuZGVmaW5lZCB8fCBlbG0uaWQgPT09ICcnKSBlbG0uaWQgPSBhcmVhO1xuICAgICAgICB0aGlzLl9fcnN6W2VsbS5pZF0gPSBuZXcgcmVzaXplRG9tKGVsbSwgdGhpcy5fX2RpYSk7XG5cbiAgICAgICAgdGhpcy5fX3NldF96b29tX2RpYWxvZyhlbG0pO1xuICAgICAgICB0aGlzLl9fcGFuLmFwcGVuZENoaWxkKGVsbSk7XG4gICAgICAgIHJldHVybiBlbG07XG4gICAgfVxuICAgIHByaXZhdGUgX19zZXRfem9vbV9kaWFsb2coZWxtOiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICAgICAgICBlbG0uc2V0QXR0cmlidXRlKCdkcmFnZ2FibGUnLCAndHJ1ZScpO1xuICAgICAgICBlbG0uYWRkRXZlbnRMaXN0ZW5lcignZHJhZ3N0YXJ0JywgKGV2OkRyYWdFdmVudCk9PnsgXG4gICAgICAgICAgICB0aGlzLl9fbW9wID0ge3g6MCwgeTowfTtcbiAgICAgICAgICAgIHRoaXMuX19tb3AueCA9IGV2LnBhZ2VYO1xuICAgICAgICAgICAgdGhpcy5fX21vcC55ID0gZXYucGFnZVk7XG4gICAgICAgICAgICBpZiAoZWxtLmlkIGluIHRoaXMuX19yc3opIHRoaXMuX19yc3pbZWxtLmlkXS5yZXNldCgpO1xuICAgICAgICB9KTtcbiAgICAgICAgZWxtLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWcnLCAoZXY6RHJhZ0V2ZW50KT0+e1xuICAgICAgICAgICAgaWYgKGV2LnBhZ2VYID09PSB0aGlzLl9fbW9wLnggJiYgZXYucGFnZVkgPT09IHRoaXMuX19tb3AueSkgcmV0dXJuO1xuXG4gICAgICAgICAgICBjb25zdCByZXNpemVYICA9IGV2LnBhZ2VYIC0gdGhpcy5fX21vcC54O1xuICAgICAgICAgICAgY29uc3QgcmVzaXplWSAgPSBldi5wYWdlWSAtIHRoaXMuX19tb3AueTtcbiAgICAgICAgICAgIGlmIChlbG0uaWQgaW4gdGhpcy5fX3JzeikgdGhpcy5fX3JzeltlbG0uaWRdLnJlc2l6ZShyZXNpemVYLCByZXNpemVZKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGVsbS5hZGRFdmVudExpc3RlbmVyKCdkcmFnZW5kJywgKGV2OkRyYWdFdmVudCk9PnsgXG4gICAgICAgICAgICBjb25zdCByZXNpemVYICA9IGV2LnBhZ2VYIC0gdGhpcy5fX21vcC54O1xuICAgICAgICAgICAgY29uc3QgcmVzaXplWSAgPSBldi5wYWdlWSAtIHRoaXMuX19tb3AueTtcbiAgICAgICAgICAgIGlmIChlbG0uaWQgaW4gdGhpcy5fX3JzeikgdGhpcy5fX3JzeltlbG0uaWRdLnJlc2l6ZShyZXNpemVYLCByZXNpemVZKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHByaXZhdGUgX19zZXRfbW92ZV9kaWFsb2coZWxtOiBIVE1MRWxlbWVudCk6IHZvaWQgeyBcbiAgICAgICAgZWxtLnNldEF0dHJpYnV0ZSgnZHJhZ2dhYmxlJywgJ3RydWUnKTtcbiAgICAgICAgZWxtLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdzdGFydCcsIChldjpEcmFnRXZlbnQpPT57IFxuICAgICAgICAgICAgdGhpcy5fX21vcCA9IHt4OjAsIHk6MH07XG4gICAgICAgICAgICB0aGlzLl9fbW9wLnkgPSB0aGlzLl9fZGlhLm9mZnNldFRvcCAgLSBldi5wYWdlWTtcbiAgICAgICAgICAgIHRoaXMuX19tb3AueCA9IHRoaXMuX19kaWEub2Zmc2V0TGVmdCAtIGV2LnBhZ2VYO1xuLy8gICAgICAgICAgICBldi5kYXRhVHJhbnNmZXI/LnNldERyYWdJbWFnZShkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSwgMCwgMCk7XG4gICAgICAgIH0pO1xuICAgICAgICBlbG0uYWRkRXZlbnRMaXN0ZW5lcignZHJhZycsIChldjpEcmFnRXZlbnQpPT57XG4gICAgICAgICAgICBpZiAoZXYueCA9PT0gMCAmJiBldi55ID09PSAwKSByZXR1cm47XG4gICAgICAgICAgICBjb25zdCB0b3AgID0gZXYucGFnZVkgKyB0aGlzLl9fbW9wLnk7XG4gICAgICAgICAgICBjb25zdCBsZWZ0ID0gZXYucGFnZVggKyB0aGlzLl9fbW9wLng7XG4vLyAgICAgICAgICAgIGNvbnN0IHJpZ2h0ID0gd2luZG93Lm91dGVyV2lkdGggLSBldi5wYWdlWDtcbiAgICAgICAgICAgIHRoaXMuX19kaWEuc3R5bGUudG9wICAgPSB0b3AgICArICdweCc7XG4gICAgICAgICAgICB0aGlzLl9fZGlhLnN0eWxlLmxlZnQgID0gbGVmdCAgKyAncHgnO1xuLy8gICAgICAgICAgICB0aGlzLl9fZGlhLnN0eWxlLnJpZ2h0ID0gcmlnaHQgKyAncHgnO1xuICAgICAgICB9KTtcbiAgICAgICAgZWxtLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdlbmQnLCAoZXY6RHJhZ0V2ZW50KT0+eyBcbiAgICAgICAgICAgIHRoaXMuX19tb3AgPSB7eDowLCB5OjB9O1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgcHJvdGVjdGVkIGdldFdpbmRvdygpOiBIVE1MRGl2RWxlbWVudCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9fY3R4O1xuICAgIH1cbiAgICBwcm90ZWN0ZWQgc2V0V2luZG93KGN0eDogSFRNTERpdkVsZW1lbnQpOiBIVE1MRGl2RWxlbWVudCB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aGlzLl9fcGFuLnJlbW92ZUNoaWxkKHRoaXMuX19jdHgpO1xuICAgICAgICAgICAgdGhpcy5fX3Bhbi5hcHBlbmRDaGlsZChjdHgpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19jdHggPSBjdHg7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge31cbiAgICAgICAgcmV0dXJuIGN0eDtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0Wm9vbUVsbShlbG06IEhUTUxFbGVtZW50KTogdm9pZCB7XG4gICAgICAgIGZvciAoY29uc3QgaWkgaW4gdGhpcy5fX3JzeikgdGhpcy5fX3JzeltpaV0uc2V0Wm9vbUVsbShlbG0pO1xuICAgIH1cbiAgICBwdWJsaWMgY2xyWm9vbSgpOiB2b2lkIHtcbiAgICAgICAgZm9yIChjb25zdCBpaSBpbiB0aGlzLl9fcnN6KSB0aGlzLl9fcnN6W2lpXS5jbHJab29tRWxtKCk7XG4gICAgfVxuICAgIFxuICAgIHB1YmxpYyBzaG93KCk6IHZvaWQgeyBcbiAgICAgICAgdHJ5IHt0aGlzLl9fZGlhLnNob3coKX0gY2F0Y2ggKGVycikge31cbiAgICB9XG4gICAgcHVibGljIGhpZGUoKTogdm9pZCB7IFxuICAgICAgICB0cnkge3RoaXMuX19kaWEuY2xvc2UoKX0gY2F0Y2ggKGVycikge31cbiAgICB9XG4gICAgcHVibGljIGRpc3BsYXkoeW46IGJvb2xlYW4pOiB2b2lkIHsgXG4gICAgICAgIHluP3RoaXMuc2hvdygpOnRoaXMuaGlkZSgpO1xuICAgIH1cbn1cblxuY2xhc3MgcmVzaXplRG9tIHtcbiAgICBwcml2YXRlIF9fZGlhOiAgSFRNTEVsZW1lbnQ7XG4gICAgcHJpdmF0ZSBfX2NucjogIEhUTUxFbGVtZW50O1xuICAgIHByaXZhdGUgX190cmc6ICBIVE1MRWxlbWVudHx1bmRlZmluZWQ7XG4gICAgcHJpdmF0ZSBfX2Nhbjoge3g6IGJvb2xlYW4sIHk6IGJvb2xlYW59O1xuICAgIHByaXZhdGUgX190b3A6ICB4eTtcbiAgICBwcml2YXRlIF9fc2l6OiAgeHk7XG4gICAgcHVibGljIGNvbnN0cnVjdG9yKGNucjogSFRNTEVsZW1lbnQsIGRpYTogSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy5fX2RpYSA9IGRpYTsgdGhpcy5fX2NuciA9IGNucjtcbiAgICAgICAgdGhpcy5fX2NhbiA9IHt4OmZhbHNlLCB5OiBmYWxzZX07XG4gICAgICAgIHRoaXMuX190b3AgPSB7eDowLCB5OjB9O1xuICAgICAgICB0aGlzLl9fc2l6ID0ge3g6MCwgeTowfTtcbiAgICB9XG4gICAgcHVibGljIHNldFpvb21FbG0odHJnOiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9fdHJnICAgPSB0cmc7XG4gICAgfVxuICAgIHB1YmxpYyBjbHJab29tRWxtKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9fdHJnICAgPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcbiAgICAgICAgLy8gWm9vbeWvvuixoeOBjOioreWumuOBleOCjOOBpuOBhOOBquOBkeOCjOOBsOS9leOCguOBl+OBquOBhFxuICAgICAgICBpZiAodGhpcy5fX3RyZyA9PT0gdW5kZWZpbmVkKSByZXR1cm47XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIERpYWxvZ+OBruW3puWNiuWIhuOBq+WvvuixoeOCs+ODvOODiuODvOOBjOacieOCjOOBsOOCteOCpOOCuuWkieabtOOBrumam+OBq+W3pui+uuOCkuWLleOBi+OBmeOBruOBp+OBneOBruODleODqeOCsOioreWumih4KVxuICAgICAgICAgICAgLy8gRGlhbG9n44Gu5LiK5Y2K5YiG44Gr5a++6LGh44Kz44O844OK44O844GM5pyJ44KM44Gw44K144Kk44K65aSJ5pu044Gu6Zqb44Gr5LiK6L6644KS5YuV44GL44GZ44Gu44Gn44Gd44Gu44OV44Op44Kw6Kit5a6aKHkpXG4gICAgICAgICAgICBjb25zdCBwYXJlbnQgID0gIHRoaXMuX19jbnIub2Zmc2V0UGFyZW50IGFzIEhUTUxFbGVtZW50O1xuICAgICAgICAgICAgdGhpcy5fX2Nhbi54ICA9ICB0aGlzLl9fY25yLm9mZnNldExlZnQgPCAocGFyZW50Py5vZmZzZXRXaWR0aCAgLyAyKTtcbiAgICAgICAgICAgIHRoaXMuX19jYW4ueSAgPSAgdGhpcy5fX2Nuci5vZmZzZXRUb3AgIDwgKHBhcmVudD8ub2Zmc2V0SGVpZ2h0IC8gMik7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgdGhpcy5fX2Nhbi54ICA9ICB0aGlzLl9fY2FuLnkgID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgLy8gRGlhbG9n44Gu5bem5LiK44Gu5bqn5qiZ44KS5L+d5a2YXG4gICAgICAgIHRoaXMuX190b3AueCA9IHRoaXMuX19kaWEub2Zmc2V0TGVmdDsgXG4gICAgICAgIHRoaXMuX190b3AueSA9IHRoaXMuX19kaWEub2Zmc2V0VG9wOyBcblxuICAgICAgICAvLyBab29t5a++6LGh44Go44GZ44KL6KaB57Sg44Gu5bmF44Go6auY44GV44KS5L+d5a2YXG4gICAgICAgIHRoaXMuX19zaXoueCA9IHRoaXMuX190cmcub2Zmc2V0V2lkdGg7IFxuICAgICAgICB0aGlzLl9fc2l6LnkgPSB0aGlzLl9fdHJnLm9mZnNldEhlaWdodDsgXG4gICAgfVxuICAgIHB1YmxpYyByZXNpemUocmVzaXplWDogbnVtYmVyLCByZXNpemVZOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgLy8gWm9vbeWvvuixoeOBjOioreWumuOBleOCjOOBpuOBhOOBquOBkeOCjOOBsOS9leOCguOBl+OBquOBhFxuICAgICAgICBpZiAodGhpcy5fX3RyZyA9PT0gdW5kZWZpbmVkKSByZXR1cm47XG5cbiAgICAgICAgLy8gRGlhbG9n44Gu5bem5Y2K5YiG44Gr5a++6LGh44Kz44O844OK44O844GM5pyJ44KM44Gw5bem6L6644KS5YuV44GL44GZXG4gICAgICAgIC8vIOW3pui+uuOCkuS8uOOBsOOBmeOBruOBp+ODquOCteOCpOOCuumHj+OBr+WPjei7ouOBleOBm+OCi1xuICAgICAgICBpZiAodGhpcy5fX2Nhbi54KSB7XG4gICAgICAgICAgICByZXNpemVYID0gLXJlc2l6ZVg7XG4gICAgICAgICAgICB0aGlzLl9fZGlhLnN0eWxlLmxlZnQgID0gdGhpcy5fX3RvcC54IC0gcmVzaXplWCAgKyAncHgnO1xuICAgICAgICB9XG4gICAgICAgIC8vIERpYWxvZ+OBruS4iuWNiuWIhuOBq+WvvuixoeOCs+ODvOODiuODvOOBjOacieOCjOOBsOS4iui+uuOCkuWLleOBi+OBmVxuICAgICAgICAvLyDkuIrovrrjgpLkvLjjgbDjgZnjga7jgafjg6rjgrXjgqTjgrrph4/jga/lj43ou6LjgZXjgZvjgotcbiAgICAgICAgaWYgKHRoaXMuX19jYW4ueSkge1xuICAgICAgICAgICAgcmVzaXplWSA9IC1yZXNpemVZO1xuICAgICAgICAgICAgdGhpcy5fX2RpYS5zdHlsZS50b3AgICA9IHRoaXMuX190b3AueSAtIHJlc2l6ZVkgICArICdweCc7XG4gICAgICAgIH1cbiAgICAgICAgLy8gWm9vbeWvvuixoeOCkuOCteOCpOOCuuWkieabtOOBmeOCi1xuICAgICAgICB0aGlzLl9fdHJnLnN0eWxlLndpZHRoICA9IHRoaXMuX19zaXoueCArIHJlc2l6ZVggKyAncHgnO1xuICAgICAgICB0aGlzLl9fdHJnLnN0eWxlLmhlaWdodCA9IHRoaXMuX19zaXoueSArIHJlc2l6ZVkgKyAncHgnO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IF9taW4gfSAgICAgICAgICBmcm9tIFwiLi4vZF91dGwvRl9NYXRoXCI7XHJcbmltcG9ydCB7IENfVXJsT3B0IH0gICAgICBmcm9tIFwiLi4vZF91dGwvQ19VcmxPcHRcIjtcclxuaW1wb3J0IHsgZ19tZXMsIF9hbGVydCwgZ19kZWJ1ZywgZ19hbGVydCB9IGZyb20gXCIuLi9kX2Ntbi9nbG9iYWxcIjtcclxuXHJcblxyXG4vLyDpnZ7lkIzmnJ/pgJrkv6HniYggUE9TVChTdHJpbmcpICYgR0VUIEpTT05cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBPU1RfYW5kX2dldF9KU09OKFxyXG4gICAgdXJsOiBzdHJpbmcsIFxyXG4gICAgb3B0OiBDX1VybE9wdCwgXHJcbik6IFByb21pc2U8YW55fHVuZGVmaW5lZD4ge1xyXG4gICAgY29uc3QgZm9ybV9kYXRhID0gb3B0LnRvRm9ybURhdGEoKTtcclxuXHJcbiAgICBpZiAoZm9ybV9kYXRhID09PSB1bmRlZmluZWQpIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB2YXIgcmVzOiBSZXNwb25zZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgcmVzID0gYXdhaXQgZmV0Y2godXJsLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICBjYWNoZTogICduby1jYWNoZScsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuLy8gICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJtdWx0aXBhcnQvZm9ybS1kYXRhXCJcclxuLy8gICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIlxyXG4vLyAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG59LFxyXG4gICAgICAgICAgICBib2R5OiBvcHQudG9Gb3JtRGF0YSgpXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKCFyZXMub2spIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGDjg6zjgrnjg53jg7Pjgrnjgrnjg4bjg7zjgr/jgrkgKCR7cmVzLnN0YXR1c30pYCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGdfbWVzLndhcm5pbmdfbWVzc2FnZSgn6YCa5L+h44Ko44Op44O8OiAnICsgZXJyKTtcclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG1vbml0b3IgPSB0cnVlOyAgLy8gYWxlcnTjgaflj5fkv6HjgZfjgZ/jg4bjgq3jgrnjg4jjgpLooajnpLrjgZnjgovjgajjgY3jgat0cnVl44Gr44GZ44KLXHJcblxyXG4gICAgcmV0dXJuIHJlcy50ZXh0KClcclxuICAgICAgICAudGhlbih0eHQ9PntcclxuICAgICAgICAgICAgY29uc3QgdHggPSB0eHQuc2xpY2UoKTtcclxuXHJcbi8vICAgICAgICAgICAgaWYgKG1vbml0b3IpIF9hbGVydCh0eCk7XHJcbiAgICAgICAgICAgIGlmIChtb25pdG9yKSB7XHJcbiAgICAgICAgICAgICAgICBnX2FsZXJ0LnNldF9tZXNzYWdlKGBQT1NUIFVSTDpgLCB1cmwpO1xyXG4gICAgICAgICAgICAgICAgZ19hbGVydC5zZXRfbWVzc2FnZShgUE9TVCBPUFQ6YCwgb3B0LnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgZ19hbGVydC5zZXRfbWVzc2FnZShgUE9TVCBEQVRBOmAsIHR4KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKHR4dCk7XHJcbiAgICAgICAgICAgIH0gY2F0Y2goZXJyKSB7XHJcbiAgICAgICAgICAgICAgICBnX21lcy53YXJuaW5nX21lc3NhZ2UoJ0pTT07lvaLlvI/jga7jg4fjgrPjg7zjg4njgqjjg6njg7wnKTtcclxuICAgICAgICAgICAgICAgIF9hbGVydCh0eCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbn1cclxuXHJcbi8vIOmdnuWQjOacn+mAmuS/oeeJiCBQT1NUKEpTT04pICYgR0VUIEpTT05cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBPU1RfYW5kX2dldF9KU09OMyhcclxuICAgIHVybDogc3RyaW5nLCBcclxuICAgIG9wdDogQ19VcmxPcHQsIFxyXG4pOiBQcm9taXNlPGFueXx1bmRlZmluZWQ+IHtcclxuICAgIGNvbnN0IGZvcm1fZGF0YSA9IG9wdC50b0Zvcm1EYXRhKCk7XHJcblxyXG4gICAgaWYgKGZvcm1fZGF0YSA9PT0gdW5kZWZpbmVkKSByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgdmFyIHJlczogUmVzcG9uc2U7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHJlcyA9IGF3YWl0IGZldGNoKHVybCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgY2FjaGU6ICAnbm8tY2FjaGUnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbi8vICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwibXVsdGlwYXJ0L2Zvcm0tZGF0YVwiXHJcbi8vICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXCJcclxuICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbn0sXHJcbiAgICAgICAgICAgIGJvZHk6IG9wdC50b0pTT04oKVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmICghcmVzLm9rKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihg44Os44K544Od44Oz44K544K544OG44O844K/44K5ICgke3Jlcy5zdGF0dXN9KWApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNhdGNoIChlcnIpIHtcclxuICAgICAgICBnX21lcy53YXJuaW5nX21lc3NhZ2UoJ+mAmuS/oeOCqOODqeODvDogJyArIGVycik7XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBtb25pdG9yID0gdHJ1ZTsgIC8vIGFsZXJ044Gn5Y+X5L+h44GX44Gf44OG44Kt44K544OI44KS6KGo56S644GZ44KL44Go44GN44GrdHJ1ZeOBq+OBmeOCi1xyXG5cclxuICAgIHJldHVybiByZXMudGV4dCgpXHJcbiAgICAgICAgLnRoZW4odHh0PT57XHJcbiAgICAgICAgICAgIGNvbnN0IHR4ID0gdHh0LnNsaWNlKCk7XHJcblxyXG4vLyAgICAgICAgICAgIGlmIChtb25pdG9yKSBfYWxlcnQodHgpO1xyXG4gICAgICAgICAgICBpZiAobW9uaXRvcikge1xyXG4gICAgICAgICAgICAgICAgZ19hbGVydC5zZXRfbWVzc2FnZShgUE9TVCBVUkw6YCwgdXJsKTtcclxuICAgICAgICAgICAgICAgIGdfYWxlcnQuc2V0X21lc3NhZ2UoYFBPU1QgT1BUOmAsIG9wdC50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgIGdfYWxlcnQuc2V0X21lc3NhZ2UoYFBPU1QgREFUQTpgLCB0eCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZSh0eHQpO1xyXG4gICAgICAgICAgICB9IGNhdGNoKGVycikge1xyXG4gICAgICAgICAgICAgICAgZ19tZXMud2FybmluZ19tZXNzYWdlKCdKU09O5b2i5byP44Gu44OH44Kz44O844OJ44Ko44Op44O8Jyk7XHJcbiAgICAgICAgICAgICAgICBfYWxlcnQodHgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG59XHJcblxyXG5cclxuXHJcblxyXG4vLyDlkIzmnJ/pgJrkv6HniYggUE9TVCAmIEdFVCBKU09OXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUX2FuZF9nZXRfSlNPTjIoXHJcbiAgICB1cmw6IHN0cmluZywgXHJcbiAgICBvcHQ6IENfVXJsT3B0LCBcclxuKTogUHJvbWlzZTxhbnl8dW5kZWZpbmVkPiB7XHJcbiAgICBjb25zdCByZXFPYmogPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTsgLy8gb2JqZWN0IG9mIHJlcXVlc3RcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICAgIHJlcU9iai5vcGVuKFwiUE9TVFwiLCB1cmwsIGZhbHNlKTsgLy8gU3luYyBtb2RlXHJcbiAgICAgICAgcmVxT2JqLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LXR5cGVcIiwgXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIik7IC8vIHNldHRpbmcgb2YgaGVhZGVycyAgaW4gcmVxdWVzdFxyXG4gICAgICAgIHJlcU9iai5zZW5kKG9wdC50b0Zvcm1EYXRhKCkpOyAvLyBkYXRhIHRvIHNlbmQgaW4gcmVxdWVzdFxyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgZ19tZXMud2FybmluZ19tZXNzYWdlKGDpgJrkv6Hjgqjjg6njg7w6ICR7cmVxT2JqLnN0YXR1c31gKTtcclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHR4dCA9IHJlcU9iai5yZXNwb25zZVRleHQ7IC8vIGRpc3BsYXlpbmcgcmVzcG9uc2UgdGV4dCBpbiBwYXJhZ3JhcGggdGFnXHJcblxyXG4gICAgY29uc3QgbW9uaXRvciA9IHRydWU7ICAvLyBhbGVydOOBp+WPl+S/oeOBl+OBn+ODhuOCreOCueODiOOCkuihqOekuuOBmeOCi+OBqOOBjeOBq3RydWXjgavjgZnjgotcclxuICAgIGlmIChtb25pdG9yKSB7XHJcbiAgICAgICAgZ19hbGVydC5zZXRfbWVzc2FnZShgUE9TVCBVUkw6YCwgIHVybCk7XHJcbiAgICAgICAgZ19hbGVydC5zZXRfbWVzc2FnZShgUE9TVCBPUFQ6YCwgIG9wdC50b1N0cmluZygpKTtcclxuICAgICAgICBnX2FsZXJ0LnNldF9tZXNzYWdlKGBQT1NUIERBVEE6YCwgdHh0KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoTnVtYmVyKHJlcU9iai5zdGF0dXMpID4gMzk5KSB7XHJcbiAgICAgICAgZ19tZXMud2FybmluZ19tZXNzYWdlKGDjg6zjgrnjg53jg7Pjgrnjgrnjg4bjg7zjgr/jgrk6ICR7cmVxT2JqLnN0YXR1c31gKTtcclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UodHh0KTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGdfbWVzLndhcm5pbmdfbWVzc2FnZSgnSlNPTuW9ouW8j+OBruODh+OCs+ODvOODieOCqOODqeODvDogJyArIGVycik7XHJcbiAgICAgICAgX2FsZXJ0KHR4dCk7XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxufVxyXG5cclxuXHJcblxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFBPU1RfYW5kX21vdmVfcGFnZSh1cmw6IHN0cmluZywgb3B0OiBDX1VybE9wdCk6IHZvaWQge1xyXG4gICAgY3JlYXRlX2Zvcm0odXJsLCBvcHQpLnN1Ym1pdCgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVfZm9ybSh1cmw6IHN0cmluZywgb3B0OiBDX1VybE9wdCk6IEhUTUxGb3JtRWxlbWVudCB7XHJcbiAgICBjb25zdCBmb3JtICA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nKSBhcyBIVE1MRm9ybUVsZW1lbnQ7XHJcblxyXG4gICAgZm9ybS5pZCAgICAgPSAnZHVtbXlfZm9ybV8nICsgbmV3IERhdGUoKS52YWx1ZU9mKCkudG9TdHJpbmcoKTtcclxuICAgIGZvcm0ubWV0aG9kID0gJ1BPU1QnO1xyXG4gICAgZm9ybS5hY3Rpb24gPSAgdXJsO1xyXG4gICAgZm9ybS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG5cclxuICAgIGZvciAodmFyIGtleSBvZiBvcHQuZ2V0X2tleXMoKSkge1xyXG4gICAgICAgIGNyZWF0ZV9pbnB1dChmb3JtLCBmb3JtLmlkLCBrZXksIG9wdC5nZXQoa2V5KSk7XHJcbiAgICB9XHJcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGZvcm0pO1xyXG4gICAgcmV0dXJuIGZvcm07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZV9pbnB1dChmb3JtOiBIVE1MRm9ybUVsZW1lbnQsIGZpZDogc3RyaW5nLCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpOiBIVE1MSW5wdXRFbGVtZW50IHtcclxuICAgIGNvbnN0IGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XHJcblxyXG4gICAgaS50eXBlICA9ICdoaWRkZW4nO1xyXG4gICAgaS5uYW1lICA9IG5hbWU7XHJcbiAgICBpLnZhbHVlID0gdmFsdWU7XHJcbiAgICBpLnN0eWxlLmRpc3BsYXkgPSdub25lJztcclxuICAgIGkuc2V0QXR0cmlidXRlKCdmb3InLCAgIGZpZCk7XHJcbiAgICBmb3JtLmFwcGVuZENoaWxkKGkpO1xyXG5cclxuICAgIHJldHVybiBpO1xyXG59XHJcbiIsImltcG9ydCB7IGFsZXJ0X3NhdmVfZGV0YWlsLCBhbGVydF9zYXZlX2luZm8gfSBmcm9tICcuLi9kX21kbC9DX1NhdmVEYXRhJzsgXHJcbmltcG9ydCB7IGFsZXJ0X3RlYW1faW5mbyB9ICAgICBmcm9tIFwiLi4vZF9tZGwvQ19UZWFtXCI7IFxyXG5pbXBvcnQgeyBhbGVydF9tYXplX2luZm8gfSAgICAgZnJvbSBcIi4uL2RfbWRsL0NfTWF6ZVwiOyBcclxuaW1wb3J0IHsgYWxlcnRfZ3VsZF9pbmZvIH0gICAgIGZyb20gXCIuLi9kX21kbC9DX0d1aWxkXCI7IFxyXG5pbXBvcnQgeyBhbGVydF9tdnB0X2luZm8gfSAgICAgZnJvbSBcIi4uL2RfbWRsL0NfTW92YWJsZVBvaW50XCI7XHJcbmltcG9ydCB7IGFsZXJ0X2hyZXNfaW5mbyB9ICAgICBmcm9tIFwiLi4vZF9tZGwvQ19IZXJvXCI7IFxyXG5pbXBvcnQgeyBhbGVydF9QRF9pbmZvIH0gICAgICAgZnJvbSBcIi4uL2RfbWRsL0NfUG9pbnREaXJcIjtcclxuaW1wb3J0IHsgYWxlcnRfbWF6ZWluZm9faW5mbyB9IGZyb20gJy4uL2RfbWRsL0NfTWF6ZUluZm8nO1xyXG5cclxuaW1wb3J0IHsgX3JvdW5kLCBfbWluLCBfbWF4ICB9IGZyb20gXCIuLi9kX3V0bC9GX01hdGhcIjtcclxuaW1wb3J0IHsgQ19VcmxPcHQgfSAgICAgICAgICAgIGZyb20gXCIuLi9kX3V0bC9DX1VybE9wdFwiOyAgXHJcbmltcG9ydCB7IFBPU1RfYW5kX2dldF9KU09OLCAgUE9TVF9hbmRfZ2V0X0pTT04zLCBQT1NUX2FuZF9tb3ZlX3BhZ2UgfSBmcm9tIFwiLi4vZF9jbW4vRl9QT1NUXCI7XHJcbmltcG9ydCB7IFxyXG4gICAgX2FsZXJ0LCBnX21lcywgZ19zdGFydF9lbnYsIFxyXG4gICAgZ191cmwsICBnX3VybF9ndDJfbWF6ZSwgZ191cmxfZ2V0X3NhdmUsIGdfdXJsX2d0Ml9ndWxkLCBcclxuICAgIGdfc2F2ZSxcclxuICAgIGdfdXJsX2FsbF9tYXplLFxyXG4gICAgZ191cmxfZ2V0X21hemUsIFxyXG4gICAgZ191cmxfbmV3X21hemUsXHJcbiAgICBnX3VybF9uZXdfZ3VsZCxcclxuICAgIGdfdXJsX2FsbF9ocmVzLFxyXG4gICAgZ191cmxfY2hlY2tfSlNPTixcclxuICAgIGdfdXJsX2d0Ml9zYXZlLFxyXG4gICAgZ191cmxfZ2V0X2luZm8sXHJcbiAgICBnX3VybF9nZXRfZGF0YSxcclxuICAgIGdfdXJsX3B1dF9kYXRhLFxyXG59IGZyb20gXCIuLi9kX2Ntbi9nbG9iYWxcIjtcclxuXHJcblxyXG50eXBlIFRfY2FsbGJhY2sgPSAoanNvbk9iajphbnkpPT4oYm9vbGVhbnx2b2lkKTtcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRfbWFpX21hemUoY2FsbGJhY2s/OiBUX2NhbGxiYWNrKTogUHJvbWlzZTxhbnl8dW5kZWZpbmVkPiB7XHJcbiAgICBjb25zdCBvcHQgPSBuZXcgQ19VcmxPcHQoKTtcclxuICAgIG9wdC5zZXQoJ21vZGUnLCAnbmV3X2dhbWUnKTsgXHJcbiAgICBvcHQuc2V0KCdwaWQnLCAgIGdfc3RhcnRfZW52LnBpZCk7XHJcbi8vICAgIHJldHVybiBhd2FpdCBfZ2V0X25ld19nYW1lKGdfdXJsW2dfdXJsX2d0Ml9tYXplXSwgb3B0LCBjYWxsYmFjayk7XHJcbiAgICByZXR1cm4gYXdhaXQgX2dldF9uZXdfZ2FtZShnX3VybFtnX3VybF9uZXdfbWF6ZV0sIG9wdCwgY2FsbGJhY2spO1xyXG59XHJcblxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldF9tYWlfZ3VsZChjYWxsYmFjaz86IFRfY2FsbGJhY2spOiBQcm9taXNlPGFueXx1bmRlZmluZWQ+IHtcclxuICAgIGNvbnN0IG9wdCA9IG5ldyBDX1VybE9wdCgpO1xyXG4gICAgb3B0LnNldCgnbW9kZScsICduZXdfZ2FtZScpOyBcclxuICAgIG9wdC5zZXQoJ3BpZCcsICAgZ19zdGFydF9lbnYucGlkLnRvU3RyaW5nKCkpO1xyXG4vLyAgICByZXR1cm4gYXdhaXQgX2dldF9uZXdfZ2FtZShnX3VybFtnX3VybF9ndDJfZ3VsZF0sIG9wdCwgY2FsbGJhY2spO1xyXG4gICAgcmV0dXJuIGF3YWl0IF9nZXRfbmV3X2dhbWUoZ191cmxbZ191cmxfbmV3X2d1bGRdLCBvcHQsIGNhbGxiYWNrKTtcclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gX2dldF9uZXdfZ2FtZSh1cmw6IHN0cmluZywgb3B0OiBDX1VybE9wdCwgY2FsbGJhY2s/OiBUX2NhbGxiYWNrKTogUHJvbWlzZTxhbnl8dW5kZWZpbmVkPiB7XHJcbiAgICByZXR1cm4gYXdhaXQgUE9TVF9hbmRfZ2V0X0pTT04zKHVybCwgb3B0KT8udGhlbihqc29uT2JqPT57XHJcbiAgICAgICAgaWYgKGpzb25PYmouZWNvZGUgPT09IDApIHtcclxuICAgICAgICAgICAgZ19tZXMubm9ybWFsX21lc3NhZ2UoJ+ato+W4uOOBq+ODreODvOODieOBleOCjOOBvuOBl+OBnycpO1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICBpZiAoanNvbk9iai5zYXZlICA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBnX21lcy53YXJuaW5nX21lc3NhZ2UoXCLkv53lrZjjg4fjg7zjgr/jgYzkuI3mraPjgarlvaLlvI/jgafjgZfjgZ9cXG5cIiArIGpzb25PYmouZW1zZyk7XHJcbiAgICAgICAgICAgICAgICBfYWxlcnQoanNvbk9iai5lbXNnKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IG1vbml0b3IgPSBmYWxzZTsgIC8vIGFsZXJ044Gn5Y+X5L+h44GX44Gf44OG44Kt44K544OI44KS6KGo56S644GZ44KL44Go44GN44GrdHJ1ZeOBq+OBmeOCi1xyXG4gICAgICAgICAgICBpZiAobW9uaXRvcikge1xyXG4gICAgICAgICAgICAgICAgaWYgKGpzb25PYmo/LnNhdmUgICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydF9zYXZlX2luZm8oanNvbk9iai5zYXZlKTtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydF9zYXZlX2RldGFpbChqc29uT2JqLnNhdmUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgIGlmIChjYWxsYmFjayAhPT0gdW5kZWZpbmVkKSBjYWxsYmFjayhqc29uT2JqKTtcclxuICAgICAgICAgICAgcmV0dXJuIGpzb25PYmo7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZ19tZXMud2FybmluZ19tZXNzYWdlKFwi44Ot44O844OJ44Gn44GN44G+44Gb44KT44Gn44GX44GfXFxuXCIgKyBqc29uT2JqLmVtc2cpO1xyXG4gICAgICAgICAgICBfYWxlcnQoanNvbk9iai5lbXNnKTtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldF9uZXdfbWF6ZShtYXplX25hbWU6IHN0cmluZywgY2FsbGJhY2s/OiBUX2NhbGxiYWNrKTogUHJvbWlzZTxhbnl8dW5kZWZpbmVkPiB7XHJcbiAgICBjb25zdCBvcHQgPSBuZXcgQ19VcmxPcHQoKTtcclxuICAgIG9wdC5zZXQoJ21vZGUnLCAgICAgICduZXdfbWF6ZScpO1xyXG4gICAgb3B0LnNldCgncGlkJywgICAgICAgIGdfc3RhcnRfZW52LnBpZCk7XHJcbiAgICBvcHQuc2V0KCdtYXplX25hbWUnLCAgbWF6ZV9uYW1lKTtcclxuXHJcbi8vICAgIHJldHVybiBQT1NUX2FuZF9nZXRfSlNPTihnX3VybFtnX3VybF9ndDJfbWF6ZV0sIG9wdCk/LnRoZW4oanNvbk9iaj0+e1xyXG4gICAgcmV0dXJuIFBPU1RfYW5kX2dldF9KU09OMyhnX3VybFtnX3VybF9nZXRfbWF6ZV0sIG9wdCk/LnRoZW4oanNvbk9iaj0+e1xyXG4gICAgICAgIGlmIChqc29uT2JqLmVjb2RlICE9PSAwKSB7XHJcbiAgICAgICAgICAgIGdfbWVzLndhcm5pbmdfbWVzc2FnZShcIuaWsOi/t+WuruODh+ODvOOCv+OCkuWPl+S/oeOBp+OBjeOBvuOBm+OCk+OBp+OBl+OBn1xcblwiICsganNvbk9iai5lbXNnKTtcclxuICAgICAgICAgICAgX2FsZXJ0KGpzb25PYmouZW1zZyk7XHJcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChqc29uT2JqPy5kYXRhICA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGdfbWVzLndhcm5pbmdfbWVzc2FnZShcIuWPl+S/oeODh+ODvOOCv+OBjOS4jeato+OBquW9ouW8j+OBp+OBl+OBn1xcblwiICsganNvbk9iai5lbXNnKTtcclxuICAgICAgICAgICAgX2FsZXJ0KGpzb25PYmouZW1zZyk7XHJcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChqc29uT2JqPy5kYXRhPy5tYXplICA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGdfbWVzLndhcm5pbmdfbWVzc2FnZShcIuaWsOi/t+WuruODh+ODvOOCv+OBjOS4jeato+OBquW9ouW8j+OBp+OBl+OBn1xcblwiICsganNvbk9iai5lbXNnKTtcclxuICAgICAgICAgICAgX2FsZXJ0KGpzb25PYmouZW1zZyk7XHJcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChqc29uT2JqPy5kYXRhPy5wb3MgICA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGdfbWVzLndhcm5pbmdfbWVzc2FnZShcIuaWsOi/t+WuruOBruS9jee9ruODh+ODvOOCv+OBjOS4jeato+OBquW9ouW8j+OBp+OBl+OBn1xcblwiICsganNvbk9iai5lbXNnKTtcclxuICAgICAgICAgICAgX2FsZXJ0KGpzb25PYmouZW1zZyk7XHJcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBtb25pdG9yID0gZmFsc2UgIC8vIGFsZXJ044Gn5Y+X5L+h44GX44Gf44OG44Kt44K544OI44KS6KGo56S644GZ44KL44Go44GN44GrdHJ1ZeOBq+OBmeOCi1xyXG4gICAgICAgIGlmIChtb25pdG9yKSB7XHJcbiAgICAgICAgICAgIGlmIChqc29uT2JqPy5kYXRhPy5tYXplICAhPT0gdW5kZWZpbmVkKSBhbGVydF9tYXplX2luZm8oanNvbk9iai5kYXRhLm1hemUpO1xyXG4gICAgICAgICAgICBpZiAoanNvbk9iaj8uZGF0YT8ucG9zICAgIT09IHVuZGVmaW5lZCkgYWxlcnRfUERfaW5mbyAgKGpzb25PYmouZGF0YS5wb3MpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY2FsbGJhY2sgIT09IHVuZGVmaW5lZCkgY2FsbGJhY2soanNvbk9iaj8uZGF0YSk7XHJcblxyXG4gICAgICAgIHJldHVybiBqc29uT2JqO1xyXG4gICAgfSk7IFxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0X3NhdmVfaW5mbyhjYWxsYmFjaz86IFRfY2FsbGJhY2spOiBQcm9taXNlPGFueXx1bmRlZmluZWQ+IHtcclxuICAgIGNvbnN0IG9wdCA9IG5ldyBDX1VybE9wdCgpO1xyXG4gICAgb3B0LnNldCgnbW9kZScsICAgICAgICdzYXZlX2luZm8nKTsgXHJcbiAgICBvcHQuc2V0KCdwaWQnLCAgICAgICAgIGdfc3RhcnRfZW52LnBpZCk7XHJcblxyXG4vLyAgICByZXR1cm4gUE9TVF9hbmRfZ2V0X0pTT04oZ191cmxbZ191cmxfZ3QyX3NhdmVdLCBvcHQpPy50aGVuKGpzb25PYmo9PntcclxuICAgIHJldHVybiBQT1NUX2FuZF9nZXRfSlNPTjMoZ191cmxbZ191cmxfZ2V0X2luZm9dLCBvcHQpPy50aGVuKGpzb25PYmo9PntcclxuICAgICAgICBpZiAoanNvbk9iai5lY29kZSA9PT0gMCkge1xyXG4gICAgICAgICAgICBnX21lcy5ub3JtYWxfbWVzc2FnZSgn5q2j5bi444Gr44Ot44O844OJ44GV44KM44G+44GX44GfJyk7XHJcblxyXG4gICAgICAgICAgICBpZiAoanNvbk9iai5zYXZlX2luZm8gID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGdfbWVzLndhcm5pbmdfbWVzc2FnZShcIuS/neWtmOODh+ODvOOCv+OBjOS4jeato+OBquW9ouW8j+OBp+OBl+OBn1xcblwiICsganNvbk9iai5lbXNnKTtcclxuICAgICAgICAgICAgICAgIF9hbGVydChqc29uT2JqLmVtc2cpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgY29uc3QgbW9uaXRvciA9IGZhbHNlOyAgLy8gYWxlcnTjgaflj5fkv6HjgZfjgZ/jg4bjgq3jgrnjg4jjgpLooajnpLrjgZnjgovjgajjgY3jgat0cnVl44Gr44GZ44KLXHJcbiAgICAgICAgICAgIGlmIChtb25pdG9yKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBzYXZlIG9mIGpzb25PYmouc2F2ZV9pbmZvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNhdmUgICAgICAgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydF9zYXZlX2luZm8oc2F2ZSk7XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnRfc2F2ZV9kZXRhaWwoc2F2ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2sgIT09IHVuZGVmaW5lZCkgY2FsbGJhY2soanNvbk9iaik7XHJcbiAgICAgICAgICAgIHJldHVybiBqc29uT2JqO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGdfbWVzLndhcm5pbmdfbWVzc2FnZShcIuODreODvOODieOBp+OBjeOBvuOBm+OCk+OBp+OBl+OBn1xcblwiICsganNvbk9iai5lbXNnKTtcclxuICAgICAgICAgICAgX2FsZXJ0KGpzb25PYmouZW1zZyk7XHJcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRfbWF6ZV9pbmZvKGNhbGxiYWNrPzogVF9jYWxsYmFjayk6IFByb21pc2U8YW55fHVuZGVmaW5lZD4ge1xyXG4gICAgY29uc3Qgb3B0ID0gbmV3IENfVXJsT3B0KCk7XHJcbiAgICBvcHQuc2V0KCdtb2RlJywgICAgICAgICdtYXplX2luZm8nKTsgXHJcbi8vICAgIHJldHVybiBhd2FpdCBQT1NUX2FuZF9nZXRfSlNPTihnX3VybFtnX3VybF9ndDJfbWF6ZV0sIG9wdCk/LnRoZW4oanNvbk9iaj0+e1xyXG4gICAgcmV0dXJuIGF3YWl0IFBPU1RfYW5kX2dldF9KU09OMyhnX3VybFtnX3VybF9hbGxfbWF6ZV0sIG9wdCk/LnRoZW4oanNvbk9iaj0+e1xyXG4gICAgICAgIGlmIChqc29uT2JqLmVjb2RlID09PSAwKSB7XHJcbiAgICAgICAgICAgIGdfbWVzLm5vcm1hbF9tZXNzYWdlKCfmraPluLjjgavjg63jg7zjg4njgZXjgozjgb7jgZfjgZ8nKTtcclxuICAgICAgICAgICAgaWYgKGpzb25PYmo/LmRhdGE/Lm1hemVpbmZvID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGdfbWVzLndhcm5pbmdfbWVzc2FnZShcIui/t+WuruaDheWgseOBjOS4jeato+OBquW9ouW8j+OBp+OBl+OBn1xcblwiICsganNvbk9iai5lbXNnKTtcclxuICAgICAgICAgICAgICAgIF9hbGVydChqc29uT2JqLmVtc2cpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgICAgICBjb25zdCBtb25pdG9yID0gZmFsc2U7ICAvLyBhbGVydOOBp+WPl+S/oeOBl+OBn+ODhuOCreOCueODiOOCkuihqOekuuOBmeOCi+OBqOOBjeOBq3RydWXjgavjgZnjgotcclxuICAgICAgICAgICAgaWYgKG1vbml0b3IpIHtcclxuICAgICAgICAgICAgICAgIGlmIChqc29uT2JqPy5kYXRhPy5tYXplaW5mbyAgIT09IHVuZGVmaW5lZCkgeyBcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IG1hemVpbmZvIG9mIGpzb25PYmouZGF0YS5tYXplaW5mbykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydF9tYXplaW5mb19pbmZvKG1hemVpbmZvKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrICE9PSB1bmRlZmluZWQpIGNhbGxiYWNrKGpzb25PYmo/LmRhdGE/Lm1hemVpbmZvKTtcclxuICAgICAgICAgICAgcmV0dXJuIGpzb25PYmo/LmRhdGE/Lm1hemVpbmZvO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGdfbWVzLndhcm5pbmdfbWVzc2FnZShcIuODreODvOODieOBp+OBjeOBvuOBm+OCk+OBp+OBl+OBn1xcblwiICsganNvbk9iai5lbXNnKTtcclxuICAgICAgICAgICAgX2FsZXJ0KGpzb25PYmouZW1zZyk7XHJcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRfbmV3X2hlcm8obnVtOiBudW1iZXIgPSAyMCwgY2FsbGJhY2s/OiBUX2NhbGxiYWNrKTogUHJvbWlzZTxhbnl8dW5kZWZpbmVkPiB7XHJcbiAgICBjb25zdCBvcHQgPSBuZXcgQ19VcmxPcHQoKTtcclxuICAgIG9wdC5zZXQoJ21vZGUnLCAgICAgICAgJ25ld19oZXJvJyk7IFxyXG4vLyAgICBvcHQuc2V0KCdudW1iZXInLCAgICAgICBudW0udG9TdHJpbmcoKSk7XHJcbi8vICAgIHJldHVybiBhd2FpdCBQT1NUX2FuZF9nZXRfSlNPTihnX3VybFtnX3VybF9ndDJfZ3VsZF0sIG9wdCk/LnRoZW4oanNvbk9iaj0+e1xyXG4gICAgb3B0LnNldCgnbm1icicsICAgICAgICAgbnVtLnRvU3RyaW5nKCkpO1xyXG4gICAgcmV0dXJuIGF3YWl0IFBPU1RfYW5kX2dldF9KU09OMyhnX3VybFtnX3VybF9hbGxfaHJlc10sIG9wdCk/LnRoZW4oanNvbk9iaj0+e1xyXG4gICAgICAgIGlmIChqc29uT2JqLmVjb2RlID09PSAwKSB7XHJcbiAgICAgICAgICAgIGdfbWVzLm5vcm1hbF9tZXNzYWdlKCfmraPluLjjgavjg63jg7zjg4njgZXjgozjgb7jgZfjgZ8nKTtcclxuICAgICAgICAgICAgaWYgKGpzb25PYmo/LmRhdGE/LmhyZXMgID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGdfbWVzLndhcm5pbmdfbWVzc2FnZShcIuODkuODvOODreODvOODu+ODh+ODvOOCv+OBjOS4jeato+OBquW9ouW8j+OBp+OBl+OBn1xcblwiICsganNvbk9iai5lbXNnKTtcclxuICAgICAgICAgICAgICAgIF9hbGVydChqc29uT2JqLmVtc2cpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgIGNvbnN0IG1vbml0b3IgPSBmYWxzZTsgIC8vIGFsZXJ044Gn5Y+X5L+h44GX44Gf44OG44Kt44K544OI44KS6KGo56S644GZ44KL44Go44GN44GrdHJ1ZeOBq+OBmeOCi1xyXG4gICAgICAgICAgICBpZiAobW9uaXRvcikge1xyXG4gICAgICAgICAgICAgICAgaWYgKGpzb25PYmo/LmRhdGE/LmhyZXMgICE9PSB1bmRlZmluZWQpIGFsZXJ0X2hyZXNfaW5mbyhqc29uT2JqLmRhdGEuaHJlcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrICE9PSB1bmRlZmluZWQpIGNhbGxiYWNrKGpzb25PYmo/LmRhdGEpO1xyXG4gICAgICAgICAgICByZXR1cm4ganNvbk9iaj8uZGF0YTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBnX21lcy53YXJuaW5nX21lc3NhZ2UoXCLjg63jg7zjg4njgafjgY3jgb7jgZvjgpPjgafjgZfjgZ9cXG5cIiArIGpzb25PYmouZW1zZyk7XHJcbiAgICAgICAgICAgIF9hbGVydChqc29uT2JqLmVtc2cpO1xyXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHRtcF9sb2FkKG9wdD86IENfVXJsT3B0LCBjYWxsYmFjaz86IFRfY2FsbGJhY2spOiBQcm9taXNlPGFueXx1bmRlZmluZWQ+IHtcclxuICAgIG9wdCA/Pz0gbmV3IENfVXJsT3B0KCk7XHJcbiAgICBvcHQuc2V0KCdtb2RlJywgICAgICAgJ3RtcF9sb2FkJyk7IFxyXG4gICAgb3B0LnNldCgncGlkJywgICBnX3N0YXJ0X2Vudi5waWQpOyBcclxuICAgIG9wdC5zZXQoJ3VubycsICAgICAgICAgICAgICAgMTAwKTsgXHJcbiAgICByZXR1cm4gX19hdXRvX2xvYWQob3B0LCBjYWxsYmFjayk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpbnN0YW50X2xvYWQob3B0PzogQ19VcmxPcHQsIGNhbGxiYWNrPzogVF9jYWxsYmFjayk6IFByb21pc2U8YW55fHVuZGVmaW5lZD4ge1xyXG4gICAgb3B0ID8/PSBuZXcgQ19VcmxPcHQoKTtcclxuICAgIG9wdC5zZXQoJ21vZGUnLCAgICdpbnN0YW50X2xvYWQnKTsgXHJcbiAgICBvcHQuc2V0KCdwaWQnLCAgIGdfc3RhcnRfZW52LnBpZCk7IFxyXG4gICAgb3B0LnNldCgndW5vJywgICAgICAgICAgICAgICAxMDEpOyBcclxuICAgIHJldHVybiBfX2F1dG9fbG9hZChvcHQsIGNhbGxiYWNrKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFVEX2xvYWQob3B0PzogQ19VcmxPcHQsIGNhbGxiYWNrPzogVF9jYWxsYmFjayk6IFByb21pc2U8YW55fHVuZGVmaW5lZD4ge1xyXG4gICAgb3B0ID8/PSBuZXcgQ19VcmxPcHQoKTtcclxuICAgIG9wdC5zZXQoJ21vZGUnLCAgICAgICAgJ1VEX2xvYWQnKTsgXHJcbiAgICBvcHQuc2V0KCdwaWQnLCAgIGdfc3RhcnRfZW52LnBpZCk7IFxyXG4gICAgb3B0LnNldCgndW5vJywgICAgICAgICAgICAgICAxMDIpOyBcclxuICAgIHJldHVybiBfX2F1dG9fbG9hZChvcHQsIGNhbGxiYWNrKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGJlZm9yZV9sb2FkKG9wdD86IENfVXJsT3B0LCBjYWxsYmFjaz86IFRfY2FsbGJhY2spOiBQcm9taXNlPGFueXx1bmRlZmluZWQ+IHtcclxuICAgIG9wdCA/Pz0gbmV3IENfVXJsT3B0KCk7XHJcbiAgICBvcHQuc2V0KCdtb2RlJywgICAgJ2JlZm9yZV9sb2FkJyk7IFxyXG4gICAgb3B0LnNldCgncGlkJywgICBnX3N0YXJ0X2Vudi5waWQpOyBcclxuICAgIG9wdC5zZXQoJ3VubycsICAgICAgICAgICAgICAgMTAzKTsgXHJcbiAgICByZXR1cm4gX19hdXRvX2xvYWQob3B0LCBjYWxsYmFjayk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmFsX2xvYWQodW5pcV9ubzogbnVtYmVyLCBvcHQ/OiBDX1VybE9wdCwgY2FsbGJhY2s/OiBUX2NhbGxiYWNrKTogUHJvbWlzZTxhbnl8dW5kZWZpbmVkPiB7XHJcbiAgICBvcHQgPz89IG5ldyBDX1VybE9wdCgpO1xyXG4gICAgb3B0LnNldCgnbW9kZScsICAgJ2dlbmVyYWxfbG9hZCcpOyBcclxuICAgIG9wdC5zZXQoJ3BpZCcsICAgZ19zdGFydF9lbnYucGlkKTsgXHJcbiAgICBvcHQuc2V0KCd1bm8nLCAgICAgICAgICAgdW5pcV9ubyk7IFxyXG4gICAgcmV0dXJuIF9fYXV0b19sb2FkKG9wdCwgY2FsbGJhY2spO1xyXG59XHJcblxyXG5mdW5jdGlvbiBfX2F1dG9fbG9hZChvcHQ6IENfVXJsT3B0LCBjYWxsYmFjaz86IFRfY2FsbGJhY2spOiBQcm9taXNlPGFueXx1bmRlZmluZWQ+IHtcclxuXHJcbi8vICAgIHJldHVybiBQT1NUX2FuZF9nZXRfSlNPTihnX3VybFtnX3VybF9ndDJfc2F2ZV0sIG9wdCk/LnRoZW4oanNvbk9iaj0+e1xyXG4gICAgcmV0dXJuIFBPU1RfYW5kX2dldF9KU09OMyhnX3VybFtnX3VybF9nZXRfZGF0YV0sIG9wdCk/LnRoZW4oanNvbk9iaj0+e1xyXG4gICAgICAgIGlmIChqc29uT2JqLmVjb2RlID09PSAwKSB7XHJcbiAgICAgICAgICAgIGdfbWVzLm5vcm1hbF9tZXNzYWdlKCfmraPluLjjgavjg63jg7zjg4njgZXjgozjgb7jgZfjgZ8nKTtcclxuIFxyXG4gICAgICAgICAgICBpZiAoanNvbk9iaj8uc2F2ZSAgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgZ19tZXMud2FybmluZ19tZXNzYWdlKFwi5Y+X5L+h44GX44Gf5L+d5a2Y44OH44O844K/44GM5LiN5q2j44Gq5b2i5byP44Gn44GX44GfXFxuXCIgKyBqc29uT2JqLmVtc2cpO1xyXG4gICAgICAgICAgICAgICAgX2FsZXJ0KGpzb25PYmouZW1zZyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAgICAgY29uc3QgbW9uaXRvciA9IGZhbHNlOyAgLy8gYWxlcnTjgaflj5fkv6HjgZfjgZ/jg4bjgq3jgrnjg4jjgpLooajnpLrjgZnjgovjgajjgY3jgat0cnVl44Gr44GZ44KLXHJcbiAgICAgICAgICAgIGlmIChtb25pdG9yKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoanNvbk9iaj8uc2F2ZSAgICAgICAgICAgICAgICAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnRfc2F2ZV9pbmZvKGpzb25PYmouc2F2ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnRfc2F2ZV9kZXRhaWwoanNvbk9iai5zYXZlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2sgIT09IHVuZGVmaW5lZCkgY2FsbGJhY2soanNvbk9iaik7XHJcbiAgICAgICAgICAgIHJldHVybiBqc29uT2JqO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGdfbWVzLndhcm5pbmdfbWVzc2FnZShg44Ot44O844OJ44Gn44GN44G+44Gb44KT44Gn44GX44GfJHtqc29uT2JqLmVjb2RlfVxcbmAgKyBqc29uT2JqLmVtc2cpO1xyXG4gICAgICAgICAgICBfYWxlcnQoanNvbk9iai5lbXNnKTtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB0bXBfc2F2ZShvcHQ/OiBDX1VybE9wdCwgY2FsbGJhY2s/OiBUX2NhbGxiYWNrKTogUHJvbWlzZTxhbnl8dW5kZWZpbmVkPiB7IFxyXG4gICAgb3B0ID8/PSBuZXcgQ19VcmxPcHQoKTtcclxuICAgIG9wdC5zZXQoJ21vZGUnLCAgICAgICAndG1wX3NhdmUnKTsgXHJcbiAgICBvcHQuc2V0KCdwaWQnLCAgIGdfc3RhcnRfZW52LnBpZCk7IFxyXG4gICAgb3B0LnNldCgndW5vJywgICAgICAgICAgICAgICAxMDApOyBcclxuICAgIHJldHVybiBfX2F1dG9fc2F2ZShvcHQsIGNhbGxiYWNrKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGluc3RhbnRfc2F2ZShvcHQ/OiBDX1VybE9wdCwgY2FsbGJhY2s/OiBUX2NhbGxiYWNrKTogUHJvbWlzZTxhbnl8dW5kZWZpbmVkPiB7IFxyXG4gICAgb3B0ID8/PSBuZXcgQ19VcmxPcHQoKTtcclxuICAgIG9wdC5zZXQoJ21vZGUnLCAgICdpbnN0YW50X3NhdmUnKTsgXHJcbiAgICBvcHQuc2V0KCdwaWQnLCAgIGdfc3RhcnRfZW52LnBpZCk7IFxyXG4gICAgb3B0LnNldCgndW5vJywgICAgICAgICAgICAgICAxMDEpOyBcclxuICAgIHJldHVybiBfX2F1dG9fc2F2ZShvcHQsIGNhbGxiYWNrKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFVEX3NhdmUob3B0PzogQ19VcmxPcHQsIGNhbGxiYWNrPzogVF9jYWxsYmFjayk6IFByb21pc2U8YW55fHVuZGVmaW5lZD4geyBcclxuICAgIG9wdCA/Pz0gbmV3IENfVXJsT3B0KCk7XHJcbiAgICBvcHQuc2V0KCdtb2RlJywgICAgICAgICdVRF9zYXZlJyk7IFxyXG4gICAgb3B0LnNldCgncGlkJywgICBnX3N0YXJ0X2Vudi5waWQpOyBcclxuICAgIG9wdC5zZXQoJ3VubycsICAgICAgICAgICAgICAgMTAyKTsgXHJcbiAgICByZXR1cm4gX19hdXRvX3NhdmUob3B0LCBjYWxsYmFjayk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBiZWZvcmVfc2F2ZShvcHQ/OiBDX1VybE9wdCwgY2FsbGJhY2s/OiBUX2NhbGxiYWNrKTogUHJvbWlzZTxhbnl8dW5kZWZpbmVkPiB7IFxyXG4gICAgb3B0ID8/PSBuZXcgQ19VcmxPcHQoKTtcclxuICAgIG9wdC5zZXQoJ21vZGUnLCAgICAnYmVmb3JlX3NhdmUnKTsgXHJcbiAgICBvcHQuc2V0KCdwaWQnLCAgIGdfc3RhcnRfZW52LnBpZCk7IFxyXG4gICAgb3B0LnNldCgndW5vJywgICAgICAgICAgICAgICAxMDMpOyBcclxuICAgIHJldHVybiBfX2F1dG9fc2F2ZShvcHQsIGNhbGxiYWNrKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYWxfc2F2ZShvcHQ/OiBDX1VybE9wdCwgY2FsbGJhY2s/OiBUX2NhbGxiYWNrKTogUHJvbWlzZTxhbnl8dW5kZWZpbmVkPiB7XHJcbiAgICBnX3NhdmUuYXV0b19tb2RlID0gZmFsc2U7XHJcblxyXG4gICAgb3B0ID8/PSBuZXcgQ19VcmxPcHQoKTtcclxuICAgIG9wdC5zZXQoJ21vZGUnLCAgICdnZW5lcmFsX3NhdmUnKTsgXHJcbiAgICBvcHQuc2V0KCdwaWQnLCAgIGdfc3RhcnRfZW52LnBpZCk7IFxyXG4gICAgcmV0dXJuIF9fc2F2ZShvcHQsIGNhbGxiYWNrKTtcclxufVxyXG5cclxuZnVuY3Rpb24gX19hdXRvX3NhdmUob3B0OiBDX1VybE9wdCwgY2FsbGJhY2s/OiBUX2NhbGxiYWNrKTogUHJvbWlzZTxhbnl8dW5kZWZpbmVkPiB7XHJcbiAgICBnX3NhdmUuYXV0b19tb2RlID0gdHJ1ZTtcclxuICAgIHJldHVybiBfX3NhdmUob3B0LCBjYWxsYmFjayk7XHJcbn0gXHJcbmZ1bmN0aW9uIF9fc2F2ZShvcHQ6IENfVXJsT3B0LCBjYWxsYmFjaz86IFRfY2FsbGJhY2spOiBQcm9taXNlPGFueXx1bmRlZmluZWQ+IHsgXHJcbiAgICBpZiAoIW9wdC5pc3NldCgnc2F2ZScpKSB7XHJcbiAgICAgICAgb3B0LnNldCgnc2F2ZScsIEpTT04uc3RyaW5naWZ5KGdfc2F2ZS5lbmNvZGUoKSwgbnVsbCwgXCJcXHRcIikpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOmAgeS/oeODh+ODvOOCv+OCkmNoZWNrX0pTT04ucGhw44Gr6YCB44Gj44Gm44OB44Kn44OD44Kv44GZ44KL44Go44GN44GrdHJ1ZeOBq+OBmeOCi+OAglxyXG4gICAgY29uc3QgbW92ZV9wYWdlID0gZmFsc2U7XHJcblxyXG4gICAgaWYgKG1vdmVfcGFnZSkge1xyXG4gICAgICAgIFBPU1RfYW5kX21vdmVfcGFnZShnX3VybFtnX3VybF9jaGVja19KU09OXSwgb3B0KTtcclxuICAgIH1cclxuXHJcbi8vICAgIHJldHVybiBQT1NUX2FuZF9nZXRfSlNPTihnX3VybFtnX3VybF9ndDJfc2F2ZV0sIG9wdCk/LnRoZW4oanNvbk9iaj0+e1xyXG4gICAgcmV0dXJuIFBPU1RfYW5kX2dldF9KU09OMyhnX3VybFtnX3VybF9wdXRfZGF0YV0sIG9wdCk/LnRoZW4oanNvbk9iaj0+e1xyXG4gICAgICAgIGlmIChqc29uT2JqPy5lY29kZSA9PT0gMCkge1xyXG4gXHJcbiAgICAgICAgICAgIGlmIChqc29uT2JqPy5zYXZlICA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBnX21lcy53YXJuaW5nX21lc3NhZ2UoXCLlj5fkv6HjgZfjgZ/kv53lrZjjg4fjg7zjgr/jgYzkuI3mraPjgarlvaLlvI/jgafjgZfjgZ9cXG5cIiArIGpzb25PYmouZW1zZyk7XHJcbiAgICAgICAgICAgICAgICBfYWxlcnQoanNvbk9iai5lbXNnKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgICAgICBjb25zdCBtb25pdG9yID0gZmFsc2U7ICAvLyBhbGVydOOBp+WPl+S/oeOBl+OBn+ODhuOCreOCueODiOOCkuihqOekuuOBmeOCi+OBqOOBjeOBq3RydWXjgavjgZnjgotcclxuICAgICAgICAgICAgaWYgKG1vbml0b3IpIHtcclxuICAgICAgICAgICAgICAgIGlmIChqc29uT2JqPy5zYXZlICAgICAgICAgICAgICAgICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydF9zYXZlX2luZm8oanNvbk9iai5zYXZlKTtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydF9zYXZlX2RldGFpbChqc29uT2JqLnNhdmUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjYWxsYmFjayAhPT0gdW5kZWZpbmVkKSBjYWxsYmFjayhqc29uT2JqKTtcclxuICAgICAgICAgICAgZ19tZXMubm9ybWFsX21lc3NhZ2UoJ+ato+W4uOOBq+OCu+ODvOODluOBleOCjOOBvuOBl+OBnycpO1xyXG4gICAgICAgICAgICByZXR1cm4ganNvbk9iajtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBnX21lcy53YXJuaW5nX21lc3NhZ2UoXCLjgrvjg7zjg5bjgafjgY3jgb7jgZvjgpPjgafjgZfjgZ9cXG5cIiArIGpzb25PYmouZW1zZyk7XHJcbiAgICAgICAgICAgIF9hbGVydChqc29uT2JqLmVtc2cpO1xyXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH0pLiBjYXRjaChlcnI9PntcclxuICAgICAgICBnX21lcy53YXJuaW5nX21lc3NhZ2UoJ1BPU1Toqq3jgb/ovrzjgb/jgavlpLHmlZfjgZfjgb7jgZfjgZ8oUE9TVF9BTkRfSlNPTjMpJyk7XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH0pO1xyXG5cclxuLy8gICAgUE9TVF9hbmRfbW92ZV9wYWdlKGdfdXJsW2dfdXJsX2NoZWNrX0pTT05dLCBvcHQpOyByZXR1cm4ge2Vjb2RlOiAwfTtcclxufVxyXG5cclxuIiwiZXhwb3J0IGNvbnN0IGdfdXJsX2dldF9tYXplICAgID0gIDA7XHJcbmV4cG9ydCBjb25zdCBnX3VybF9uZXdfbWF6ZSAgICA9ICAxO1xyXG5cclxuZXhwb3J0IGNvbnN0IGdfdXJsX2FsbF9tYXplICAgID0gIDI7XHJcbmV4cG9ydCBjb25zdCBnX3VybF9uZXdfZ3VsZCAgICA9ICA1O1xyXG5leHBvcnQgY29uc3QgZ191cmxfYWxsX2hyZXMgICAgPSAgNjtcclxuZXhwb3J0IGNvbnN0IGdfdXJsX2dldF9zYXZlICAgID0gIDc7XHJcbmV4cG9ydCBjb25zdCBnX3VybF9wdXRfc2F2ZSAgICA9ICA4O1xyXG5leHBvcnQgY29uc3QgZ191cmxfYWxsX3NhdmUgICAgPSAgOTtcclxuZXhwb3J0IGNvbnN0IGdfdXJsX21haV9tYXplICAgID0gMTA7XHJcbmV4cG9ydCBjb25zdCBnX3VybF9tYWlfZ3VsZCAgICA9IDExO1xyXG5leHBvcnQgY29uc3QgZ191cmxfZ2V0X2luZm8gICAgPSAxMjtcclxuZXhwb3J0IGNvbnN0IGdfdXJsX2dldF9kYXRhICAgID0gMTM7XHJcbmV4cG9ydCBjb25zdCBnX3VybF9wdXRfZGF0YSAgICA9IDE1O1xyXG5cclxuZXhwb3J0IGNvbnN0IGdfdXJsX2NoZWNrX0pTT04gID0gMTY7XHJcblxyXG5leHBvcnQgY29uc3QgZ191cmxfcmNkX2xpc3QgICAgPSAxNztcclxuZXhwb3J0IGNvbnN0IGdfdXJsX3JjZF9sb2FkICAgID0gMTg7XHJcbmV4cG9ydCBjb25zdCBnX3VybF9yY2Rfc2F2ZSAgICA9IDE5O1xyXG5cclxuZXhwb3J0IGNvbnN0IGdfdXJsX2d0Ml9ndWxkICAgID0gMjA7XHJcbmV4cG9ydCBjb25zdCBnX3VybF9ndDJfbWF6ZSAgICA9IDIxO1xyXG5leHBvcnQgY29uc3QgZ191cmxfZ3QyX3NhdmUgICAgPSAyMjtcclxuZXhwb3J0IGNvbnN0IGdfdXJsOiBzdHJpbmdbXSA9IG5ldyBBcnJheSgyMyk7XHJcblxyXG5leHBvcnQgbGV0ICAgZ19teV91cmw6IHN0cmluZztcclxuXHJcbmltcG9ydCB7IENfT25PZmZCdXR0b24gfSBmcm9tICcuLi9kX2N0bC9DX09uT2ZmQnV0dG9uJ1xyXG5leHBvcnQgdmFyIGdfZGVidWc6IENfT25PZmZCdXR0b247XHJcblxyXG5pbXBvcnQgeyBDX0FsZXJ0TG9nIH0gICAgZnJvbSBcIi4uL2RfY21uL0NfQWxlcnRMb2dcIjtcclxuZXhwb3J0IGxldCBnX2FsZXJ0OiBDX0FsZXJ0TG9nO1xyXG5cclxuLy9leHBvcnQgdmFyIGdfcGlkOiBudW1iZXJbXSA9IG5ldyBBcnJheSgxKSBhcyBudW1iZXJbXTtcclxuXHJcbmNsYXNzIENfUmVhZHlHYW1lcyAge1xyXG4gICAgcHJvdGVjdGVkIGZsZ3M6IHtbaWQ6IHN0cmluZ106IGJvb2xlYW59OyBcclxuICAgIHByb3RlY3RlZCBmdW5jOiAoKT0+dm9pZDtcclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmZsZ3MgPSB7fTtcclxuICAgICAgICB0aGlzLmZsZ3MubG9hZGVkRE9NID0gZmFsc2U7IFxyXG4gICAgICAgIHRoaXMuZmxncy5nZXRXaW5kb3cgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmZ1bmMgPSAoKT0+e307XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0TG9hZGVkRE9NKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZmxncy5sb2FkZWRET00gPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuY2hlY2tfYW5kX2RvKCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0R2V0V2luZG93KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZmxncy5nZXRXaW5kb3cgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuY2hlY2tfYW5kX2RvKCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0RnVuY3Rpb24oZnVuYzogKCk9PnZvaWQpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmZ1bmMgPSBmdW5jO1xyXG4gICAgICAgIHRoaXMuY2hlY2tfYW5kX2RvKCk7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgY2hlY2tfYW5kX2RvKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLmZ1bmMgPT09IHVuZGVmaW5lZCkgcmV0dXJuO1xyXG4gICAgICAgIGZvciAobGV0IGlpIGluIHRoaXMuZmxncykgaWYgKCF0aGlzLmZsZ3NbaWldKSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5mdW5jKCk7IFxyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBjb25zdCBnX3JlYWR5X2dhbWVzID0gbmV3IENfUmVhZHlHYW1lcygpO1xyXG5cclxuZXhwb3J0IGNvbnN0IGdfc3RhcnRfZW52ID0ge21vZGU6ICcnLCBwaWQ6IC0xLCBvcHQ6ICcnfTtcclxuXHJcbmltcG9ydCB7IENfRGlzcGxheU1lc3NhZ2UgfSBmcm9tIFwiLi4vZF92aWUvQ19EaXNwbGF5TWVzc2FnZVwiO1xyXG5leHBvcnQgdmFyIGdfbWVzOiBDX0Rpc3BsYXlNZXNzYWdlO1xyXG5cclxuaW1wb3J0IHsgQ19TYXZlRGF0YSB9ICAgICAgICAgZnJvbSBcIi4uL2RfbWRsL0NfU2F2ZURhdGFcIjtcclxuZXhwb3J0IGNvbnN0IGdfc2F2ZSA9IG5ldyBDX1NhdmVEYXRhKCk7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaW5pdF9hZnRlcl9sb2FkZWRfRE9NX2luX2NvbW1vbihkZWJ1Z19pZDogc3RyaW5nID0gJ2RlYnVnX21vZGUnLCBtc2dfaWQ6IHN0cmluZyA9ICdwYW5lX3N5dG1fbG9ncycpOiB2b2lkIHtcclxuICAgIGNvbnN0ICBjb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChtc2dfaWQpO1xyXG4gICAgZ19tZXMgID0gQ19EaXNwbGF5TWVzc2FnZS5nZXRPYmooY29uLCAnY2xpZW50X21lc3NhZ2UnKTtcclxuICAgIGdfYWxlcnQgPSBDX0FsZXJ0TG9nLmdldE9iaigpO1xyXG5cclxuICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGRlYnVnX2lkKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcclxuICAgIGdfZGVidWcgPSBDX09uT2ZmQnV0dG9uLmdldE9iaihidG4sIHt9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9hbGVydCh0eHQ6IHN0cmluZywgcGFnZV9zaXplID0gMjUwKTogdm9pZCB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHR4dC5sZW5ndGg7IGkgKz0gcGFnZV9zaXplKSB7XHJcbiAgICAgICAgaWYgKCF3aW5kb3cuY29uZmlybSh0eHQuc3Vic3RyaW5nKGksIGkrcGFnZV9zaXplKSkpIGJyZWFrO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuXHJcbi8vIOS7peS4i+OAgUhUTUzlgbTjgYvjgonlkbzjgbPlh7rjgZvjgovplqLmlbDjga7lrprnvqlcclxuLy8gd2luZG9344Kq44OW44K444Kn44Kv44OI44Gr5rih44GZ44Kk44Oz44K/44O844OV44Kn44O844K544KS5a6a576pXHJcbmludGVyZmFjZSBJX1RzQ2FsbCB7XHJcbiAgICBnZXRfaW5pdF9kYXRhOiAodXJsX2Jhc2U6IHN0cmluZyk9PnZvaWQsXHJcbiAgICBzdGFydF9nYW1lOiAgICAobW9kZTogc3RyaW5nLCB1cmxfYmFzZTogc3RyaW5nLCBwbGF5ZXJfaWQ6IG51bWJlciwgb3B0aW9uOiBzdHJpbmcpPT52b2lkLCBcclxufVxyXG4vLyB3aW5kb3fjgqrjg5bjgrjjgqfjgq/jg4jjgavjgqTjg7Pjgr/jg7zjg5Xjgqfjg7zjgrnjga7lrprnvqnjgpLov73liqBcclxuZGVjbGFyZSBnbG9iYWwge1xyXG4gICAgaW50ZXJmYWNlIFdpbmRvdyB7XHJcbiAgICAgICAgdHNDYWxsOiBJX1RzQ2FsbDtcclxuICAgIH1cclxufVxyXG4vLyDjgqTjg7Pjgr/jg7zjg5Xjgqfjg7zjgrnjga7lrp/oo4VcclxuLy/vvIjjganjgYbjgoTjgonjgqTjg7Pjgr/jg7zjg5Xjgqfjg7zjgrnjga/jg5fjg63jg5Hjg4bjgqPlrprnvqnjga7jgqrjg5bjgrjjgqfjgq/jg4jjgavjgarjgaPjgabjgovjgonjgZfjgYTvvIlcclxuY29uc3QgdHNDYWxsZXI6IElfVHNDYWxsID0gKCgpID0+IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgZ2V0X2luaXRfZGF0YTogKG15X3VybDogc3RyaW5nKTogdm9pZCA9PiB7XHJcbiAgICAgICAgICAgIGdfbXlfdXJsID0gbXlfdXJsO1xyXG4gICAgICAgICAgICBjb25zdCB1cmxfdG9wID0gcGFyZW50X3VybChteV91cmwpO1xyXG4gICAgICAgICAgICBjb25zdCBleHBfdG9wID0gcGFyZW50X3VybCh1cmxfdG9wKSArIFwiL21haWV4XCI7XHJcblxyXG4gICAgICAgICAgICBnX3VybFtnX3VybF9ndDJfc2F2ZV0gICA9IHVybF90b3AgKyBcIi9fSlNPTl9tYWlfc2F2ZS5waHBcIjtcclxuICAgICAgICAgICAgZ191cmxbZ191cmxfZ3QyX21hemVdICAgPSB1cmxfdG9wICsgXCIvX0pTT05fbWFpX21hemUucGhwXCI7XHJcbiAgICAgICAgICAgIGdfdXJsW2dfdXJsX2d0Ml9ndWxkXSAgID0gdXJsX3RvcCArIFwiL19KU09OX21haV9ndWxkLnBocFwiO1xyXG5cclxuICAgICAgICAgICAgZ191cmxbZ191cmxfbWFpX21hemVdICAgPSB1cmxfdG9wICsgXCIvbWFpX21hemUucGhwXCI7XHJcbiAgICAgICAgICAgIGdfdXJsW2dfdXJsX21haV9ndWxkXSAgID0gdXJsX3RvcCArIFwiL21haV9ndWxkLnBocFwiO1xyXG5cclxuICAgICAgICAgICAgZ191cmxbZ191cmxfbmV3X21hemVdICAgPSBleHBfdG9wICsgXCIvbWF6ZS9uZXdNYXplXCI7XHJcbiAgICAgICAgICAgIGdfdXJsW2dfdXJsX2dldF9tYXplXSAgID0gZXhwX3RvcCArIFwiL21hemUvZ2V0TWF6ZVwiO1xyXG4gICAgICAgICAgICBnX3VybFtnX3VybF9hbGxfbWF6ZV0gICA9IGV4cF90b3AgKyBcIi9tYXplL2FsbE1hemVcIjtcclxuICAgICAgICAgICAgZ191cmxbZ191cmxfbmV3X2d1bGRdICAgPSBleHBfdG9wICsgXCIvZ3VsZC9uZXdHdWxkXCI7XHJcbiAgICAgICAgICAgIGdfdXJsW2dfdXJsX2FsbF9ocmVzXSAgID0gZXhwX3RvcCArIFwiL2d1bGQvYWxsSHJlc1wiO1xyXG5cclxuICAgICAgICAgICAgZ191cmxbZ191cmxfZ2V0X2luZm9dICAgPSBleHBfdG9wICsgXCIvbGRzdi9faW5mb1wiO1xyXG4gICAgICAgICAgICBnX3VybFtnX3VybF9nZXRfZGF0YV0gICA9IGV4cF90b3AgKyBcIi9sZHN2L19sb2FkXCI7XHJcbiAgICAgICAgICAgIGdfdXJsW2dfdXJsX3B1dF9kYXRhXSAgID0gZXhwX3RvcCArIFwiL2xkc3YvX3NhdmVcIjtcclxuXHJcbiAgICAgICAgICAgIGdfdXJsW2dfdXJsX2NoZWNrX0pTT05dID0gdXJsX3RvcCArIFwiL2NoZWNrX0pTT04ucGhwXCI7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAvLyDmmqvlrprniYjplovlp4vlh6bnkIZcclxuICAgICAgICBzdGFydF9nYW1lOiAobW9kZTogc3RyaW5nLCBteV91cmw6IHN0cmluZywgcGxheWVyX2lkOiBudW1iZXIsIG9wdDogc3RyaW5nKTogdm9pZCA9PiB7XHJcbiAgICAgICAgICAgIHRzQ2FsbGVyLmdldF9pbml0X2RhdGEobXlfdXJsKTsgXHJcbiAgICAgICAgICAgIGdfc3RhcnRfZW52Lm1vZGUgPSBtb2RlOyBcclxuICAgICAgICAgICAgZ19zdGFydF9lbnYucGlkICA9IHBsYXllcl9pZDsgXHJcbiAgICAgICAgICAgIGdfc3RhcnRfZW52Lm9wdCAgPSBvcHQ7IFxyXG5cclxuICAgICAgICAgICAgZ19yZWFkeV9nYW1lcy5zZXRHZXRXaW5kb3coKTsgXHJcbiAgICAgICAgfSBcclxuICAgIH07XHJcbn0pKCk7XHJcblxyXG5mdW5jdGlvbiBwYXJlbnRfdXJsKHVybDogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIGxldCByZSA9IC9cXC9bXlxcL10rPyQvO1xyXG4gICAgcmV0dXJuIHVybC5yZXBsYWNlKHJlLCAnJyk7XHJcbn1cclxuXHJcbi8vIHdpbmRvd+OCquODluOCuOOCp+OCr+ODiOOBq+i/veWKoOOBl+OBn+OCpOODs+OCv+ODvOODleOCp+ODvOOCueOBq+S4iuiomOOBruWun+ijheOCkuS7o+WFpVxyXG53aW5kb3cudHNDYWxsID0gdHNDYWxsZXI7XHJcblxyXG4vLyDjgZPjgozjgadIVE1M5YG044Guc2NyaXB044K/44Kw5YaF44GL44KJIDxzY3JpcHQ+d2luZG93cy50c0NhbGwuZ2V0cGxheWVyKDEpOzwvc2NyaXB0PlxyXG4vLyDjgb/jgZ/jgYTjgavlkbzjgbPlh7rjgZvjgovjgILjgZ/jgaDjgZfjgIFidW5kbGUuanPjga5zY3JpcHTjgr/jgrDjgad0eXBl5bGe5oCn44KSbW9kdWxl44Gr44GX44Gm44GE44KL44Go5aSx5pWX44GZ44KL44CCXHJcblxyXG5cclxuIiwiaW1wb3J0IHsgX2NlaWwsIF9mbG9vciwgX2lzTnVtIH0gZnJvbSBcIi4uL2RfdXRsL0ZfTWF0aFwiO1xuaW1wb3J0IHsgX2FsZXJ0IH0gICAgICAgICAgICAgICAgZnJvbSBcIi4uL2RfY21uL2dsb2JhbFwiO1xuXG5leHBvcnQgY2xhc3MgQ19DdGxDdXJzb3Ige1xuICAgIHByb3RlY3RlZCBzdGF0aWMgbWU6IHtbaWQ6IHN0cmluZ106IENfQ3RsQ3Vyc29yfTtcblxuICAgIHByb3RlY3RlZCBfaWQ6ICAgc3RyaW5nO1xuICAgIHByb3RlY3RlZCBfbGlzdDogSFRNTEVsZW1lbnR8dW5kZWZpbmVkO1xuICAgIHByb3RlY3RlZCBfbGVuZzogbnVtYmVyO1xuICAgIHByb3RlY3RlZCBfY29sczogbnVtYmVyO1xuICAgIHByb3RlY3RlZCBfaW5keDogbnVtYmVyO1xuXG4gICAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKGxpc3Q/OiBIVE1MRWxlbWVudCkge1xuICAgICAgICBDX0N0bEN1cnNvci5tZSA/Pz0ge31cblxuICAgICAgICB0aGlzLl9pZCAgID0gJ19fZG15X18nO1xuICAgICAgICB0aGlzLl9saXN0ID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLl9sZW5nID0gMDtcbiAgICAgICAgdGhpcy5fY29scyA9IDE7XG4gICAgICAgIHRoaXMuX2luZHggPSAwO1xuICAgICAgICBDX0N0bEN1cnNvci5tZVt0aGlzLl9pZF0gPSB0aGlzO1xuICAgIH1cbiAgICBwdWJsaWMgc3RhdGljIGdldE9iaihsaXN0PzogSFRNTEVsZW1lbnQpOiBDX0N0bEN1cnNvciAge1xuICAgICAgICB0aGlzLm1lID8/PSB7fVxuXG4gICAgICAgIGNvbnN0IGlkID0gbGlzdCAhPT0gdW5kZWZpbmVkID8gbGlzdC5pZCA6ICdfX2RteV9fJztcbiAgICAgICAgdGhpcy5tZVtpZF0gPz89IG5ldyBDX0N0bEN1cnNvcihsaXN0KTtcblxuICAgICAgICBpZiAobGlzdCAhPT0gdW5kZWZpbmVkKSB0aGlzLm1lW2lkXS5zZXQobGlzdCk7XG4gICAgICAgIHJldHVybiB0aGlzLm1lW2lkXTtcbiAgICB9XG4gICAgcHVibGljIHNldChsaXN0OiBIVE1MRWxlbWVudCk6IENfQ3RsQ3Vyc29yIHtcbiAgICAgICAgdGhpcy5faWQgICA9IGxpc3QuaWQ7XG4gICAgICAgIHRoaXMuX2xpc3QgPSBsaXN0O1xuICAgICAgICB0aGlzLl9sZW5nID0gdGhpcy5fX2dldF9sZW5nKCk7XG4gICAgICAgIHRoaXMuX2NvbHMgPSB0aGlzLl9fZ2V0X2NvbHMoKTtcbiAgICAgICAgdGhpcy5faW5keCA9IDA7XG5cbiAgICAgICAgdGhpcy5oaWdoX2xpZ2h0X29uKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHB1YmxpYyB1aWQoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lkO1xuICAgIH1cbiAgICBwdWJsaWMgbGVuZygpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fbGVuZztcbiAgICB9XG4gICAgcHVibGljIHJvd3MoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX19nZXRfcm93cygpO1xuICAgIH1cbiAgICBwdWJsaWMgY29scygpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29scztcbiAgICB9XG5cbiAgICBwdWJsaWMgcG9zKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbmR4O1xuICAgIH1cbiAgICBwdWJsaWMgc2V0X3BvcyhpbmR4OiBudW1iZXIpOiBDX0N0bEN1cnNvciB7XG4gICAgICAgIGlmIChpbmR4IDwgIDApIGluZHggPSAwO1xuICAgICAgICBpZiAoaW5keCA+PSB0aGlzLl9sZW5nKSBpbmR4ID0gdGhpcy5fbGVuZyAtIDE7XG5cbiAgICAgICAgdGhpcy5faW5keCA9IGluZHg7IHRoaXMuaGlnaF9saWdodF9vbigpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBwdWJsaWMgcG9zX1UoKTogbnVtYmVyIHtcbiAgICAgICAgaWYgKHRoaXMuX2xpc3QgPT09IHVuZGVmaW5lZCkgcmV0dXJuIDA7XG5cbiAgICAgICAgbGV0ICAgaW5keCA9IHRoaXMuX2luZHg7XG4gICAgICAgIGNvbnN0IHJvd3MgPSB0aGlzLl9fZ2V0X3Jvd3MoKTtcbiAgICAgICAgY29uc3QgY3VyX3JvdyAgID0gaW5keCAlIHJvd3M7XG4gICAgICAgIGlmIChjdXJfcm93ICE9PSAwKSB7XG4gICAgICAgICAgICAvLyDmnIDkuIrmrrUo5LiK56uvKeS7peWkllxuICAgICAgICAgICAgLS1pbmR4O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8g5pyA5LiK5q61KOS4iuerrylcbiAgICAgICAgICAgIGluZHggKz0gcm93cyAtIDE7XG4gICAgICAgICAgICB3aGlsZSAoaW5keCA+IHRoaXMuX2xlbmcgLSAxKSB7XG4gICAgICAgICAgICAgICAgLS1pbmR4O1xuICAgICAgICAgICAgfVxuICAgICAgICB9IFxuICAgICAgICB0aGlzLl9pbmR4ID0gaW5keDsgdGhpcy5oaWdoX2xpZ2h0X29uKCk7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbmR4O1xuICAgIH1cbiAgICBwdWJsaWMgcG9zX0QoKTogbnVtYmVyIHtcbiAgICAgICAgaWYgKHRoaXMuX2xpc3QgPT09IHVuZGVmaW5lZCkgcmV0dXJuIDA7XG5cbiAgICAgICAgbGV0ICAgaW5keCA9IHRoaXMuX2luZHg7XG4gICAgICAgIGNvbnN0IHJvd3MgPSB0aGlzLl9fZ2V0X3Jvd3MoKTtcbiAgICAgICAgY29uc3QgY3VyX3JvdyA9IGluZHggJSByb3dzO1xuICAgICAgICBpZiAoY3VyX3JvdyAhPT0gcm93cyAtIDEgJiYgaW5keCAhPT0gdGhpcy5fbGVuZyAtIDEpIHtcbiAgICAgICAgICAgIC8vIOacgOS4i+autSjkuIvnq68p5Lul5aSWXG4gICAgICAgICAgICArK2luZHg7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyDmnIDkuIvmrrUo5LiL56uvKVxuICAgICAgICAgICAgaW5keCAtPSByb3dzIC0gMTtcbiAgICAgICAgICAgIHdoaWxlIChpbmR4ICUgcm93cyAhPT0gMCAmJiBpbmR4IDwgdGhpcy5fbGVuZyAtIDEpIHtcbiAgICAgICAgICAgICAgICArK2luZHg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gXG4gICAgICAgIHRoaXMuX2luZHggPSBpbmR4OyB0aGlzLmhpZ2hfbGlnaHRfb24oKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luZHg7XG4gICAgfVxuICAgIHB1YmxpYyBwb3NfTCgpOiBudW1iZXIge1xuICAgICAgICBpZiAodGhpcy5fbGlzdCA9PT0gdW5kZWZpbmVkKSByZXR1cm4gMDtcblxuICAgICAgICBsZXQgICBpbmR4ID0gdGhpcy5faW5keDtcbiAgICAgICAgY29uc3Qgcm93cyA9IHRoaXMuX19nZXRfcm93cygpO1xuICAgICAgICBpZiAoaW5keCAgPiByb3dzIC0gMSkge1xuICAgICAgICAgICAgLy8g5pyA5YmN5YiXKOW3puerrynku6XlpJZcbiAgICAgICAgICAgIGluZHggLT0gcm93cztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIOacgOWJjeWIlyjlt6bnq68pXG4gICAgICAgICAgICBjb25zdCAgIHZ1cnR1YWxfbGlzdF9sZW5nID0gdGhpcy5fY29scyAqIHJvd3M7XG4gICAgICAgICAgICBpbmR4ICs9IHZ1cnR1YWxfbGlzdF9sZW5nIC0gcm93cztcbiAgICAgICAgICAgIHdoaWxlIChpbmR4ID4gdGhpcy5fbGVuZyAtIDEpIHtcbiAgICAgICAgICAgICAgICBpbmR4IC09IHJvd3M7XG4gICAgICAgICAgICAgICAgaWYgKGluZHggPCAwKSB7aW5keCA9IDA7IGJyZWFrO31cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBcbiAgICAgICAgdGhpcy5faW5keCA9IGluZHg7IHRoaXMuaGlnaF9saWdodF9vbigpO1xuICAgICAgICByZXR1cm4gdGhpcy5faW5keDtcbiAgICB9XG4gICAgcHVibGljIHBvc19SKCk6IG51bWJlciB7XG4gICAgICAgIGlmICh0aGlzLl9saXN0ID09PSB1bmRlZmluZWQpIHJldHVybiAwO1xuXG4gICAgICAgIGxldCAgIGluZHggPSB0aGlzLl9pbmR4O1xuICAgICAgICBjb25zdCByb3dzID0gdGhpcy5fX2dldF9yb3dzKCk7XG4gICAgICAgIGlmIChpbmR4ICA8IHRoaXMuX2xlbmcgLSByb3dzKSB7IFxuICAgICAgICAgICAgLy8g5pyA57WC5YiXKOWPs+errynku6XlpJZcbiAgICAgICAgICAgIGluZHggKz0gcm93cztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIOacgOe1guWIlyjlj7Pnq68pXG4gICAgICAgICAgICBjb25zdCAgIG9sZF9pbmR4ID0gaW5keDtcbiAgICAgICAgICAgIGNvbnN0ICAgdnVydHVhbF9saXN0X2xlbmcgPSB0aGlzLl9jb2xzICogcm93cztcbiAgICAgICAgICAgIGluZHggLT0gdnVydHVhbF9saXN0X2xlbmcgLSByb3dzO1xuICAgICAgICAgICAgaWYgKGluZHggPCAwKSB7XG4gICAgICAgICAgICAgICAgaW5keCArPSByb3dzO1xuICAgICAgICAgICAgICAgIGlmIChpbmR4IDwgMCB8fCBpbmR4ID4gdGhpcy5fbGVuZyAtIDEpIGluZHggPSBfZmxvb3IoKG9sZF9pbmR4ICsgMSkgLyB0aGlzLl9jb2xzLCAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBcbiAgICAgICAgdGhpcy5faW5keCA9IGluZHg7IHRoaXMuaGlnaF9saWdodF9vbigpO1xuICAgICAgICByZXR1cm4gdGhpcy5faW5keDtcbiAgICB9XG4gICAgXG4gICAgcHJvdGVjdGVkIF9fZ2V0X3Jvd3MoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIF9jZWlsKHRoaXMuX2xlbmcgLyB0aGlzLl9jb2xzLCAwKTtcbiAgICB9XG4gICAgLy8gRE9N44Oq44K544OI5LiA6Kan44Gu6KGM5pWw44Gu5Y+W5b6XXG4gICAgcHJvdGVjdGVkIF9fZ2V0X2xlbmcoKTogbnVtYmVyIHtcbiAgICAgICAgaWYgKHRoaXMuX2xpc3QgPT09IHVuZGVmaW5lZCkgcmV0dXJuIDA7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbGlzdC5jaGlsZHJlbi5sZW5ndGg7IFxuICAgICAgICB9IGNhdGNoKGVycikge1xuICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gRE9N44Oq44K544OI5LiA6Kan44Gu5YiX5pWwKENTU+OBi+OCieWPluW+lynjga7lj5blvpdcbiAgICBwcm90ZWN0ZWQgIF9fZ2V0X2NvbHMoKTogbnVtYmVyIHtcbiAgICAgICAgaWYgKHRoaXMuX2xpc3QgPT09IHVuZGVmaW5lZCkgcmV0dXJuIDA7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsZXQgY29scyA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMuX2xpc3QpLmNvbHVtbkNvdW50O1xuICAgICAgICAgICAgcmV0dXJuIF9pc051bShjb2xzKSA/IE51bWJlcihjb2xzKSA6IDE7IFxuICAgICAgICB9IGNhdGNoKGVycikge1xuICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyDjg6Hjg4vjg6Xjg7zjga7jg4fjg5Xjgqnjg6vjg4jmk43kvZwo44OP44Kk44Op44Kk44OI44Go6Kmz57Sw6KGo56S65Yi25b6hKVxuICAgIHB1YmxpYyBoaWdoX2xpZ2h0X29uKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5fbGlzdCA9PT0gdW5kZWZpbmVkKSByZXR1cm47XG5cbiAgICAgICAgY29uc3QgY2hpbGRyZW4gPSB0aGlzLl9saXN0LmNoaWxkcmVuO1xuICAgICAgICBjb25zdCBsZW4gICAgICA9IGNoaWxkcmVuLmxlbmd0aDtcbiAgICAgICAgaWYgKHRoaXMuX2luZHggPCAwIHx8IHRoaXMuX2luZHggPiBsZW4gLSAxKSByZXR1cm47XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgY29uc3QgbGkgPSBjaGlsZHJlbi5pdGVtKGkpIGFzIEhUTUxFbGVtZW50O1xuICAgICAgICAgICAgdGhpcy5fX2hpZ2hfbGlnaHRfb24obGksIGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBsaSA9IGNoaWxkcmVuLml0ZW0odGhpcy5faW5keCkgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICAgIHRoaXMuX19oaWdoX2xpZ2h0X29uKGxpLCB0cnVlKTtcbiAgICB9XG4gICAgcHVibGljIGhpZ2hfbGlnaHRfb2ZmKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5fbGlzdCA9PT0gdW5kZWZpbmVkKSByZXR1cm47XG5cbiAgICAgICAgY29uc3QgY2hpbGRyZW4gPSB0aGlzLl9saXN0LmNoaWxkcmVuO1xuICAgICAgICBjb25zdCBsZW4gICAgICA9IGNoaWxkcmVuLmxlbmd0aDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgY29uc3QgbGkgPSBjaGlsZHJlbi5pdGVtKGkpIGFzIEhUTUxFbGVtZW50O1xuICAgICAgICAgICAgdGhpcy5fX2hpZ2hfbGlnaHRfb24obGksIGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBwcm90ZWN0ZWQgX19oaWdoX2xpZ2h0X29uKGVsbTogSFRNTEVsZW1lbnQgfCBudWxsLCBpc09uOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIGlmIChlbG0gPT09IG51bGwpIHJldHVybjtcbiAgICAgICAgY29uc3QgcGVyZW50U3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbG0ucGFyZW50RWxlbWVudCA/PyBlbG0pO1xuXG4gICAgICAgIGNvbnN0IGZ3X2NvbG9yID0gcGVyZW50U3R5bGUuY29sb3I7XG4gICAgICAgIGNvbnN0IGJnX2NvbG9yID0gcGVyZW50U3R5bGUuYmFja2dyb3VuZENvbG9yO1xuXG4gICAgICAgIGVsbS5zdHlsZS5jb2xvciAgICAgICAgICAgPSBpc09uID8gYmdfY29sb3IgOiBmd19jb2xvcjtcbiAgICAgICAgZWxtLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGlzT24gPyBmd19jb2xvciA6IGJnX2NvbG9yO1xuXG4gICAgICAgIGVsbS5zdHlsZS5mb250V2VpZ2h0ID0gIGlzT24gPyAnYm9sZCcgOiAnbm9ybWFsJztcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBlbG0uY2hpbGRyZW4ubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHAgPSBlbG0uY2hpbGRyZW4uaXRlbShqKSBhcyBIVE1MRWxlbWVudDtcbiAgICAgICAgICAgIGlmIChpc09uKSB7XG4gICAgICAgICAgICAgICAgcC5zdHlsZS5mb250V2VpZ2h0ICAgICAgPSAnbm9ybWFsJztcbiAgICAgICAgICAgICAgICBwLnN0eWxlLmNvbG9yICAgICAgICAgICA9IGZ3X2NvbG9yO1xuICAgICAgICAgICAgICAgIHAuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gYmdfY29sb3I7XG4gICAgICAgICAgICAgICAgcC5zdHlsZS5kaXNwbGF5ICAgICAgICAgPSAnYmxvY2snO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBwLnN0eWxlLmRpc3BsYXkgICAgICAgICA9ICdub25lJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBwdWJsaWMgYWxlcnQoKTogdm9pZCB7XG4gICAgICAgIF9hbGVydChcbiAgICAgICAgICAgICAgXCJDdGxDdXJzb3I6IFwiXG4gICAgICAgICAgICArIFwiXFxuaWQgICA9IFwiICsgdGhpcy5faWRcbiAgICAgICAgICAgICsgXCJcXG5pbmR4ID0gXCIgKyB0aGlzLl9pbmR4XG4gICAgICAgICAgICArIFwiXFxubGVuZyA9IFwiICsgdGhpcy5fbGVuZ1xuICAgICAgICAgICAgKyBcIlxcbmNvbHMgPSBcIiArIHRoaXMuX2NvbHNcbiAgICAgICAgKVxuICAgIH07XG59XG5cblxuXG5cblxuXG5cblxuXG5cblxuXG4iLCJpbXBvcnQgeyBfZ2V0X3V1aWQgfSBmcm9tIFwiLi4vZF91dGwvRl9SYW5kXCI7XG5cbnR5cGUgIFRfT25PZmZPcHRpb24gPSB7XG4gICAgeW4/OiAgICAgICBib29sZWFuLFxuICAgIG9uTmFtZT86ICAgc3RyaW5nLFxuICAgIG9mZk5hbWU/OiAgc3RyaW5nLFxuICAgIG9uQ2xhc3M/OiAgc3RyaW5nLFxuICAgIG9mZkNsYXNzPzogc3RyaW5nLFxuICAgIGZuYz86ICAgICAgX1RfRm5jLFxufVxuXG50eXBlICBfVF9Pbk9mZk9wdGlvbiA9IHtcbiAgICBvbk5hbWU6ICAgIHN0cmluZyxcbiAgICBvZmZOYW1lOiAgIHN0cmluZyxcbiAgICBvbkNsYXNzOiAgIHN0cmluZyxcbiAgICBvZmZDbGFzczogIHN0cmluZyxcbiAgICBmbmM/OiAgICAgIF9UX0ZuYyxcbn1cblxudHlwZSBfVF9GbmMgPSAoeW46IGJvb2xlYW4pPT4odm9pZHxib29sZWFuKTtcblxuZXhwb3J0IGNsYXNzIENfT25PZmZCdXR0b24ge1xuICAgIHByb3RlY3RlZCBzdGF0aWMgbWU6IHtbaWQ6IHN0cmluZ106IENfT25PZmZCdXR0b259O1xuXG4gICAgcHVibGljICAgIHN0YXRpYyBnZXRPYmooZWxtOiBIVE1MQnV0dG9uRWxlbWVudCwgb29vPzogVF9Pbk9mZk9wdGlvbik6IENfT25PZmZCdXR0b24ge1xuICAgICAgICB0aGlzLm1lID8/PSB7fTtcbiAgICAgICAgdGhpcy5tZVtlbG0uaWRdID8/PSBuZXcgQ19Pbk9mZkJ1dHRvbihlbG0sIG9vbyk7XG4gICAgICAgIHJldHVybiB0aGlzLm1lW2VsbS5pZF07XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHluOiAgYm9vbGVhbjtcbiAgICBwcm90ZWN0ZWQgZWxtOiBIVE1MQnV0dG9uRWxlbWVudDtcbiAgICBwcm90ZWN0ZWQgb29vOiBfVF9Pbk9mZk9wdGlvbjtcbiAgICBwcm90ZWN0ZWQgZGVmX29vbzogX1RfT25PZmZPcHRpb24gPSB7XG4gICAgICAgIG9uTmFtZTogICAnT04nLFxuICAgICAgICBvZmZOYW1lOiAgJ29mZicsXG4gICAgICAgIG9uQ2xhc3M6ICAnX3RvZ2dsZV9vbicsXG4gICAgICAgIG9mZkNsYXNzOiAnX3RvZ2dsZV9vZmYnLFxuICAgIH07XG4gICAgcHJvdGVjdGVkIGZuYzoge1tpZDogc3RyaW5nXTogX1RfRm5jfTtcblxuICAgIHByb3RlY3RlZCBjb25zdHJ1Y3RvcihlbG06IEhUTUxCdXR0b25FbGVtZW50LCBvb28/OiBUX09uT2ZmT3B0aW9uKSB7XG4gICAgICAgIHRoaXMuZm5jID0ge307XG4gICAgICAgIHRoaXMub29vID0gdGhpcy5kZWZfb29vO1xuICAgICAgICB0aGlzLnluICA9IGZhbHNlO1xuXG4gICAgICAgIGlmIChlbG0ubmFtZSA9PT0gdW5kZWZpbmVkIHx8IGVsbS5uYW1lID09PSAnJykgZWxtLm5hbWUgPSBlbG0uaWQ7XG4gICAgICAgIHRoaXMuZWxtID0gZWxtO1xuICAgICAgICB0aGlzLmVsbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50Ok1vdXNlRXZlbnQpPT57dGhpcy50b2dnbGUoKTt9LCBmYWxzZSk7XG5cbiAgICAgICAgaWYgKG9vbyAhPT0gdW5kZWZpbmVkKSB0aGlzLnNldE9iaihvb28pOyBcbiAgICB9XG4gICAgcHVibGljIHNldE9iaihvb286IFRfT25PZmZPcHRpb24pOiBDX09uT2ZmQnV0dG9uIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMueW4gID0gb29vLnluID8/IGZhbHNlO1xuXG4gICAgICAgICAgICB0aGlzLm9vbyA9IG9vbyBhcyBfVF9Pbk9mZk9wdGlvbjsgXG4gICAgICAgICAgICB0aGlzLm9vby5vbk5hbWUgICA/Pz0gdGhpcy5kZWZfb29vLm9uTmFtZTsgXG4gICAgICAgICAgICB0aGlzLm9vby5vZmZOYW1lICA/Pz0gdGhpcy5kZWZfb29vLm9mZk5hbWU7IFxuICAgICAgICAgICAgdGhpcy5vb28ub25DbGFzcyAgPz89IHRoaXMuZGVmX29vby5vbkNsYXNzOyBcbiAgICAgICAgICAgIHRoaXMub29vLm9mZkNsYXNzID8/PSB0aGlzLmRlZl9vb28ub2ZmQ2xhc3M7IFxuICAgICAgICAgICAgdGhpcy5fc2V0U3R5bGUodGhpcy55bik7XG4gICAgICAgIH0gY2F0Y2gge31cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHByb3RlY3RlZCBfc2V0U3R5bGUoeW46IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy55biAgID0geW47XG4gICAgICAgIGNvbnN0IG9vbyA9IHRoaXMub29vO1xuICAgICAgICB0aGlzLmVsbS52YWx1ZSA9IHluPydvbic6J29mZic7XG4gICAgICAgIHRoaXMuZWxtLmlubmVySFRNTCA9IHluID8gb29vLm9uTmFtZSA6IG9vby5vZmZOYW1lO1xuICAgICAgICB0aGlzLmVsbS5jbGFzc0xpc3QucmVtb3ZlKHluPyBvb28ub2ZmQ2xhc3MgOiBvb28ub25DbGFzcyk7XG4gICAgICAgIHRoaXMuZWxtLmNsYXNzTGlzdC5hZGQgICAoeW4/IG9vby5vbkNsYXNzICA6IG9vby5vZmZDbGFzcyk7XG4gICAgfVxuXG4gICAgcHVibGljIHNldE9OKCk6ICAgYm9vbGVhbiB7cmV0dXJuIHRoaXMuX3NldFlOKHRydWUpID8/IGZhbHNlfTtcbiAgICBwdWJsaWMgc2V0T0ZGKCk6ICBib29sZWFuIHtyZXR1cm4gdGhpcy5fc2V0WU4oZmFsc2UpID8/IGZhbHNlfTtcbiAgICBwdWJsaWMgdG9nZ2xlKCk6ICBib29sZWFuIHtyZXR1cm4gdGhpcy5fc2V0WU4oIXRoaXMueW4pID8/IGZhbHNlfVxuXG4gICAgcHJvdGVjdGVkIF9zZXRZTih5bjogYm9vbGVhbik6IGJvb2xlYW58dm9pZCB7XG4gICAgICAgIHRoaXMuX3NldFN0eWxlKHluKTtcblxuICAgICAgICBsZXQgdGY6Ym9vbGVhbnx2b2lkICA9IHRydWU7IFxuICAgICAgICBmb3IgKGNvbnN0IGkgaW4gdGhpcy5mbmMpIHRmICYmPSB0aGlzLmZuY1tpXSh5bik7IFxuICAgICAgICByZXR1cm4gdGY7XG4gICAgfVxuXG4gICAgcHVibGljIGlkKCk6ICAgICAgc3RyaW5nICB7cmV0dXJuIHRoaXMuZWxtLmlkfTtcbiAgICBwdWJsaWMgaXNPTigpOiAgICBib29sZWFuIHtyZXR1cm4gdGhpcy55bjt9XG5cbiAgICBwdWJsaWMgYWRkRm5jKGZuYzogX1RfRm5jKTogc3RyaW5nIHtcbiAgICAgICAgY29uc3QgaWQgPSAnb29mdW5jXycgKyBfZ2V0X3V1aWQoKTtcbiAgICAgICAgdGhpcy5mbmNbaWRdID0gZm5jO1xuICAgICAgICByZXR1cm4gaWQ7XG4gICAgfVxuICAgIHB1YmxpYyBybXZGbmMoZm5jOiBfVF9GbmN8c3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh0eXBlb2YgZm5jID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdHJ5e1xuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmZuY1tmbmNdOyBcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1jYXRjaChlcnIpe3JldHVybiBmYWxzZX1cbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IGkgaW4gdGhpcy5mbmMpIGlmIChmbmMgPT09IHRoaXMuZm5jW2ldKSB7ZGVsZXRlIHRoaXMuZm5jW2ldOyByZXR1cm4gdHJ1ZX1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cbiIsIlwidXNlIHN0cmljdFwiO1xyXG5cclxuaW1wb3J0IHsgSV9Mb2NhdGUsIFRfTGNrZCB9ICAgICAgZnJvbSBcIi4vQ19Mb2NhdGlvblwiO1xyXG5pbXBvcnQgeyBJX0pTT05fVW5pcSwgSlNPTl9BbnkgfSBmcm9tIFwiLi9DX1NhdmVJbmZvXCI7XHJcbmltcG9ydCB7IENfSGVybywgSlNPTl9IZXJvIH0gICAgIGZyb20gXCIuL0NfSGVyb1wiO1xyXG5pbXBvcnQgeyBfZ2V0X3V1aWQgfSAgICAgICAgICAgICBmcm9tIFwiLi4vZF91dGwvRl9SYW5kXCI7XHJcbmltcG9ydCB7IENfR29vZHNMaXN0LCBKU09OX0dvb2RzTGlzdCB9IGZyb20gXCIuL0NfR29vZHNMaXN0TkdcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSlNPTl9HdWlsZCBleHRlbmRzIEpTT05fQW55IHtcclxuICAgIGlkPzogICAgICAgbnVtYmVyLFxyXG4gICAgdW5pcV9pZD86ICBzdHJpbmcsXHJcbiAgICBzYXZlX2lkPzogIG51bWJlcixcclxuICAgIG5hbWU/OiAgICAgc3RyaW5nLFxyXG4gICAgZ29sZD86ICAgICBudW1iZXIsXHJcbiAgICBnb29kcz86ICAgIEpTT05fR29vZHNMaXN0LFxyXG4gICAgaGVyb2VzPzogICBKU09OX0hlcm9bXSxcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFsZXJ0X2d1bGRfaW5mbyhhOiBKU09OX0d1aWxkfHVuZGVmaW5lZCk6IHZvaWQge1xyXG4gICAgaWYgKGEgPT09IHVuZGVmaW5lZCkgcmV0dXJuO1xyXG4gICAgYWxlcnQoXCJHdWlsZCBJbmZvOlwiIFxyXG4gICAgICAgICsgXCJcXG5pZDogICAgICAgXCIgKyAoYS5pZCAgICAgICAgPz8gJz8nKVxyXG4gICAgICAgICsgXCJcXG51bmlxX2lkOiAgXCIgKyAoYS51bmlxX2lkICAgPz8gJz8nKVxyXG4gICAgICAgICsgXCJcXG5zYXZlX2lkOiAgXCIgKyAoYS5zYXZlX2lkICAgPz8gJz8nKVxyXG4gICAgICAgICsgXCJcXG5uYW1lOiAgICAgXCIgKyAoYS5uYW1lICAgICAgPz8gJz8nKVxyXG4gICAgICAgICsgXCJcXG5nb2xkOiAgICAgXCIgKyAoYS5nb2xkICAgICAgPz8gIDAgKVxyXG4vLyAgICAgICAgKyBcIlxcbmdvb2RzOiAgICBcIiArIChPYmplY3Qua2V5cyhhLmdvb2RzPz8wKS5sZW5ndGgpXHJcbiAgICAgICAgKyBcIlxcbmhlcm9lczogICBcIiArIChhLmhlcm9lcz8ubGVuZ3RoID8/ICc/JylcclxuICAgICAgICArIFwiXFxuXCJcclxuICAgICk7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBDX0d1aWxkIGltcGxlbWVudHMgSV9Mb2NhdGUsIElfSlNPTl9VbmlxIHtcclxuICAgIHByb3RlY3RlZCBpZDogICAgICAgICBudW1iZXI7XHJcbiAgICBwcm90ZWN0ZWQgdW5pcV9pZDogICAgc3RyaW5nO1xyXG4gICAgcHJvdGVjdGVkIHNhdmVfaWQ6ICAgIG51bWJlcjtcclxuICAgIHByb3RlY3RlZCBuYW1lOiAgICAgICBzdHJpbmc7XHJcbiAgICBwdWJsaWMgICAgZ29sZDogICAgICAgbnVtYmVyO1xyXG4vLyAgICBwdWJsaWMgICAgZ29vZHM6ICAgICAgQ19Hb29kc0xpc3Q7XHJcbiAgICBwcm90ZWN0ZWQgaGVyb2VzOiAgICAge1t1aWQ6IHN0cmluZ106IENfSGVyb307XHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoYT86IEpTT05fR3VpbGQpIHtcclxuICAgICAgICB0aGlzLmlkICAgICAgICAgPSAtMTtcclxuICAgICAgICB0aGlzLnVuaXFfaWQgICAgPSAnbWFpX2d1bGQjJyArIF9nZXRfdXVpZCgpO1xyXG4gICAgICAgIHRoaXMuc2F2ZV9pZCAgICA9IC0xO1xyXG4gICAgICAgIHRoaXMubmFtZSAgICAgICA9ICcnO1xyXG4gICAgICAgIHRoaXMuZ29sZCAgICAgICA9ICAwO1xyXG4vLyAgICAgICAgdGhpcy5nb29kcyAgICAgID0gbmV3IENfR29vZHNMaXN0KCk7XHJcbiAgICAgICAgdGhpcy5oZXJvZXMgICAgID0ge307XHJcbiAgICAgICAgaWYgKGEgIT09IHVuZGVmaW5lZCkgdGhpcy5kZWNvZGUoYSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVpZCgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy51bmlxX2lkfVxyXG4gICAgcHVibGljIGdldF9sY2tkKCk6IFRfTGNrZCB7cmV0dXJuIFRfTGNrZC5NYXplfVxyXG4gICAgcHVibGljIGdldF9uYW1lKCk6IHN0cmluZyB7cmV0dXJuIHRoaXMubmFtZX1cclxuICAgIFxyXG4gICAgcHVibGljIGhyZXMoKTogIENfSGVyb1tdIHtcclxuICAgICAgICBjb25zdCBocmVzOiBDX0hlcm9bXSA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGlpIGluIHRoaXMuaGVyb2VzKSBocmVzLnB1c2godGhpcy5oZXJvZXNbaWldKTtcclxuICAgICAgICByZXR1cm4gaHJlcztcclxuICAgIH0gXHJcbiAgICBwdWJsaWMgY2xlYXJfaHJlcygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmhlcm9lcyA9IHt9O1xyXG4gICAgfVxyXG4gICAgcHVibGljIGFkZF9oZXJvKGhlcm86IENfSGVybyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaGVyb2VzW2hlcm8udWlkKCldID0gaGVybztcclxuICAgIH1cclxuICAgIHB1YmxpYyBybXZfaGVybyhoZXJvOiBDX0hlcm8pOiB2b2lkIHtcclxuICAgICAgICBkZWxldGUgdGhpcy5oZXJvZXNbaGVyby51aWQoKV07XHJcbiAgICB9XHJcblxyXG4vKlxyXG4gICAgcHVibGljIHN0YXRpYyBmcm9tX29ial90b19zdHJpbmcob2E6IENfR3VpbGQpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShvYSwgbnVsbCwgXCJcXHRcIik7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc3RhdGljIGZyb21fb2JqQXJyYXlfdG9fc3RyaW5nKG9hYToge1t1aWQ6IHN0cmluZ106IENfR3VpbGR9KTogc3RyaW5nIHtcclxuICAgICAgICBjb25zdCBvYSA9IFtdIGFzIENfR3VpbGRbXTtcclxuICAgICAgICBmb3IgKGNvbnN0IGlpIGluIG9hYSkgb2EucHVzaChvYWFbaWldKTtcclxuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkob2EsIG51bGwsIFwiXFx0XCIpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHN0YXRpYyBmcm9tX3N0cmluZ190b19vYmoodHh0OiBzdHJpbmcpOiBDX0d1aWxkIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCBqICAgPSBKU09OLnBhcnNlKHR4dCkgYXMgSlNPTl9HdWlsZFtdO1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IENfR3VpbGQoaik7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgQ19HdWlsZCgpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc3RhdGljIGZyb21fc3RyaW5nX3RvX29iakFycmF5KHR4dDogc3RyaW5nKToge1t1aWQ6IHN0cmluZ106IENfR3VpbGR9IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCBqICAgPSBKU09OLnBhcnNlKHR4dCkgYXMgSlNPTl9HdWlsZFtdO1xyXG4gICAgICAgICAgICBjb25zdCBtcGEgPSB7fSBhcyB7W2lkOiBzdHJpbmddOiBDX0d1aWxkfTtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBqaiBvZiBqKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBhYWEgPSBuZXcgQ19HdWlsZCgpLmRlY29kZShqaik7XHJcbiAgICAgICAgICAgICAgICBtcGFbYWFhLnVpZCgpXSA9IGFhYTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbXBhO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICByZXR1cm4ge307XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuKi9cclxuXHJcbiAgICBwdWJsaWMgZW5jb2RlKCk6IEpTT05fR3VpbGQge1xyXG4gICAgICAgIGNvbnN0IGpzb25faGVyb2VzOiBKU09OX0hlcm9bXSA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGlpIGluIHRoaXMuaGVyb2VzKSBqc29uX2hlcm9lcy5wdXNoKHRoaXMuaGVyb2VzW2lpXS5lbmNvZGUoKSk7ICBcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgaWQ6ICAgICAgdGhpcy5pZCxcclxuICAgICAgICAgICAgdW5pcV9pZDogdGhpcy51bmlxX2lkLFxyXG4gICAgICAgICAgICBzYXZlX2lkOiB0aGlzLnNhdmVfaWQsXHJcbiAgICAgICAgICAgIGdvbGQ6ICAgIHRoaXMuZ29sZCxcclxuLy8gICAgICAgICAgICBnb29kczogICB0aGlzLmdvb2RzLmVuY29kZSgpLFxyXG4gICAgICAgICAgICBoZXJvZXM6ICBqc29uX2hlcm9lcyxcclxuICAgICAgICAgICAgbmFtZTogICAgdGhpcy5uYW1lLFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBkZWNvZGUoYTogSlNPTl9HdWlsZHx1bmRlZmluZWQpOiBDX0d1aWxkIHtcclxuICAgICAgICBpZiAoYSA9PT0gdW5kZWZpbmVkKSByZXR1cm4gdGhpcztcclxuICAgICAgICBcclxuICAgICAgICBpZiAoYS5pZCAgICAgICAhPT0gdW5kZWZpbmVkKSB0aGlzLmlkICAgICAgICAgPSBhLmlkO1xyXG4gICAgICAgIGlmIChhLnVuaXFfaWQgICE9PSB1bmRlZmluZWQpIHRoaXMudW5pcV9pZCAgICA9IGEudW5pcV9pZDtcclxuICAgICAgICBpZiAoYS5zYXZlX2lkICAhPT0gdW5kZWZpbmVkKSB0aGlzLnNhdmVfaWQgICAgPSBhLnNhdmVfaWQ7XHJcbiAgICAgICAgaWYgKGEubmFtZSAgICAgIT09IHVuZGVmaW5lZCkgdGhpcy5uYW1lICAgICAgID0gYS5uYW1lO1xyXG4gICAgICAgIGlmIChhLmdvbGQgICAgICE9PSB1bmRlZmluZWQpIHRoaXMuZ29sZDtcclxuLy8gICAgICAgIGlmIChhLmdvb2RzICAgICE9PSB1bmRlZmluZWQpIHRoaXMuZ29vZHMuZGVjb2RlIChhLmdvb2RzKTtcclxuXHJcbiAgICAgICAgaWYgKGEuaGVyb2VzICE9PSB1bmRlZmluZWQpICB7XHJcbiAgICAgICAgICAgIHRoaXMuaGVyb2VzID0ge307XHJcbiAgICAgICAgICAgIGZvciAoY29uc3QganNvbl9oZXJvIG9mIGEuaGVyb2VzKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBoZXJvID0gbmV3IENfSGVybyhqc29uX2hlcm8pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oZXJvZXNbaGVyby51aWQoKV0gPSBoZXJvO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHN0YXRpYyBlbmNvZGVfYWxsKGFsbF9ndWxkOiBDX0d1aWxkW10pOiBKU09OX0d1aWxkW10ge1xyXG4gICAgICAgIGNvbnN0IGFsbF9ndWxkX2RhdGE6IEpTT05fR3VpbGRbXSA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGd1bGQgb2YgYWxsX2d1bGQpIHtcclxuICAgICAgICAgICAgYWxsX2d1bGRfZGF0YS5wdXNoKGd1bGQuZW5jb2RlKCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYWxsX2d1bGRfZGF0YTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzdGF0aWMgZGVjb2RlX2FsbChhbGxfZ3VsZF9kYXRhOiBKU09OX0d1aWxkW10pOiBDX0d1aWxkW10ge1xyXG4gICAgICAgIGNvbnN0IGFsbF9ndWxkOiBDX0d1aWxkW10gPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBndWxkX2RhdGEgb2YgYWxsX2d1bGRfZGF0YSkge1xyXG4gICAgICAgICAgICBhbGxfZ3VsZC5wdXNoKChuZXcgQ19HdWlsZCgpKS5kZWNvZGUoZ3VsZF9kYXRhKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhbGxfZ3VsZDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIGFsZXJ0KCk6IHZvaWQge1xyXG4gICAgICAgIGFsZXJ0KFwiR3VpbGQgSW5mbzpcIiBcclxuICAgICAgICAgICAgKyBcIlxcbmlkOiAgICAgICBcIiArICh0aGlzLmlkICAgICAgICAgICAgID8/ICc/JylcclxuICAgICAgICAgICAgKyBcIlxcbnVuaXFfaWQ6ICBcIiArICh0aGlzLnVuaXFfaWQgICAgICAgID8/ICc/JylcclxuICAgICAgICAgICAgKyBcIlxcbnNhdmVfaWQ6ICBcIiArICh0aGlzLnNhdmVfaWQgICAgICAgID8/ICc/JylcclxuICAgICAgICAgICAgKyBcIlxcbm5hbWU6ICAgICBcIiArICh0aGlzLm5hbWUgICAgICAgICAgID8/ICc/JylcclxuICAgICAgICAgICAgKyBcIlxcbmdvbGQ6ICAgICBcIiArICh0aGlzLmdvbGQgICAgICAgICAgID8/ICAwKVxyXG4vLyAgICAgICAgICAgICsgXCJcXG5nb29kczogICAgXCIgKyAoT2JqZWN0LmtleXModGhpcy5nb29kcz8/MCkubGVuZ3RoKVxyXG4gICAgICAgICAgICArIFwiXFxuaGVyb2VzOiAgIFwiICsgKHRoaXMuaGVyb2VzPy5sZW5ndGggPz8gJz8nKVxyXG4gICAgICAgICAgICArIFwiXFxuXCJcclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5cclxuaW1wb3J0IHsgQ19IZXJvQWJpbGl0eSwgSlNPTl9IZXJvX0FiaWxpdHl9IGZyb20gXCIuL0NfSGVyb0FiaWxpdHlcIjtcclxuaW1wb3J0IHsgSV9KU09OX1VuaXEsICAgSlNPTl9BbnkgfSAgICAgICAgIGZyb20gXCIuL0NfU2F2ZUluZm9cIjtcclxuaW1wb3J0IHsgX2dldF91dWlkLCBfaW5yYW5kLCBfaXJhbmQsIF9yYW5kb21fc3RyIH0gIGZyb20gXCIuLi9kX3V0bC9GX1JhbmRcIjtcclxuaW1wb3J0IHsgQ19Hb29kc0xpc3QsIEpTT05fR29vZHNMaXN0IH0gZnJvbSBcIi4vQ19Hb29kc0xpc3ROR1wiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBKU09OX0hlcm8gZXh0ZW5kcyBKU09OX0FueSB7XHJcbiAgICBpZD86ICAgICAgICBudW1iZXIsIFxyXG4gICAgdW5pcV9pZD86ICAgc3RyaW5nLCBcclxuICAgIHNhdmVfaWQ/OiAgIG51bWJlciwgXHJcbiAgICBuYW1lPzogICAgICBzdHJpbmcsIFxyXG4gICAgc2V4PzogICAgICAgbnVtYmVyOyBcclxuICAgIGFnZT86ICAgICAgIG51bWJlcjsgXHJcbiAgICBnb2xkPzogICAgICBudW1iZXI7IFxyXG4vLyAgICBnb29kcz86ICAgICBKU09OX0dvb2RzTGlzdDsgXHJcbiAgICBzdGF0ZT86ICAgICBudW1iZXI7IFxyXG4gICAgbHY/OiAgICAgICAgbnVtYmVyOyBcclxuICAgIHZhbD86ICAgICAgIEpTT05fSGVyb19WYWx1ZTtcclxuICAgIGFiaV9wPzogICAgICAge2JzYz86IEpTT05fSGVyb19BYmlsaXR5LCB0dGw/OiBKU09OX0hlcm9fQWJpbGl0eSwgbm93PzogSlNPTl9IZXJvX0FiaWxpdHl9O1xyXG4gICAgYWJpX20/OiAgICAgICB7YnNjPzogSlNPTl9IZXJvX0FiaWxpdHksIHR0bD86IEpTT05fSGVyb19BYmlsaXR5LCBub3c/OiBKU09OX0hlcm9fQWJpbGl0eX07XHJcbiAgICBpc19hbGl2ZT86ICBzdHJpbmd8Ym9vbGVhbjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBKU09OX0hlcm9fVmFsdWUgZXh0ZW5kcyBKU09OX0FueSB7XHJcbiAgICBza3A/OiB7dHRsOiBudW1iZXIsICBub3c6IG51bWJlcn0sIFxyXG4gICAgZXhwPzoge3R0bDogbnVtYmVyLCAgbm93OiBudW1iZXJ9LFxyXG4gICAgbnhlPzogbnVtYmVyLCAgICAgICAgICAgICAgICAgICAvLyDmrKHlm57jga7jg5Ljg7zjg63jg7zjg6zjg5njg6vjgqLjg4Pjg5fjgavlv4XopoHjgarntYzpqJPlgKRcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFsZXJ0X2hyZXNfaW5mbyhhOiAoSlNPTl9IZXJvfHVuZGVmaW5lZClbXXx1bmRlZmluZWQpOiB2b2lkIHsgXHJcbiAgICBpZiAoYSA9PT0gdW5kZWZpbmVkKSByZXR1cm47XHJcbiAgICBhbGVydCgnTnVtYmVyIG9mIEhlcm8gPSAnICsgYS5sZW5ndGgudG9TdHJpbmcoKSk7XHJcbiAgICBmb3IgKHZhciBpIGluIGEpIHtcclxuICAgICAgICBpZiAoYVtpXSA9PT0gdW5kZWZpbmVkKSBjb250aW51ZTtcclxuICAgICAgICBhbGVydF9oZXJvX2luZm8oYVtpXSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhbGVydF9oZXJvX2luZm8oYTogSlNPTl9IZXJvfHVuZGVmaW5lZCk6IHZvaWQgeyBcclxuICAgIGlmIChhID09PSB1bmRlZmluZWQpIHJldHVybjtcclxuICAgIGFsZXJ0KFwiSGVybyBJbmZvOlxcblwiIFxyXG4gICAgICAgICsgXCJcXG5pZDogICAgICAgXCIgICAgICsgKGE/LmlkICAgICAgICA/PyAnPycpXHJcbiAgICAgICAgKyBcIlxcbnVuaXFfaWQgICBcIiAgICAgKyAoYT8udW5pcV9pZCAgID8/ICc/JylcclxuICAgICAgICArIFwiXFxubmFtZTogICAgIFwiICAgICArIChhPy5uYW1lICAgICAgPz8gJz8nKVxyXG4gICAgICAgICsgXCJcXG5zYXZlX2lkOiAgXCIgICAgICsgKGE/LnNhdmVfaWQgICA/PyAnPycpXHJcbiAgICAgICAgKyBcIlxcbmlzX2FsaXZlOiBcIiAgICAgKyAoYT8uaXNfYWxpdmUgID8/ICc/JylcclxuICAgICAgICArIFwiXFxuXCJcclxuICAgICk7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBDX0hlcm8gaW1wbGVtZW50cyBJX0pTT05fVW5pcSB7XHJcbiAgICBwcm90ZWN0ZWQgbXlfaWQ6ICAgIG51bWJlcjtcclxuICAgIHByb3RlY3RlZCBteV9uYW1lOiAgc3RyaW5nO1xyXG4gICAgcHJvdGVjdGVkIHVuaXFfaWQ6ICBzdHJpbmc7IFxyXG4gICAgcHJvdGVjdGVkIHNhdmVfaWQ6ICBudW1iZXI7IFxyXG4gICAgcHJvdGVjdGVkIHNleDogICAgICBudW1iZXI7IFxyXG4gICAgcHJvdGVjdGVkIGFnZTogICAgICBudW1iZXI7IFxyXG4gICAgcHJvdGVjdGVkIHN0YXRlOiAgICBudW1iZXI7IFxyXG4gICAgcHJvdGVjdGVkIGx2OiAgICAgICBudW1iZXI7IFxyXG4gICAgLy8gYnNjKEJhc2ljKeOBr+W9k+S6uuOBruWfuuacrOWApOOAgnR0bChUb3RhbCnjga/oo4XlgpnnrYnjgpLliqDmuJvnrpfjgZfjgZ/jgoLjga7jgIJub3fjga/jg5Djg5XnrYnjga7jgr/jg7zjg7PliLbjga7jgoLliqDmuJvnrpfjgZfjgZ/jgoLjga5cclxuICAgIHByb3RlY3RlZCBnb2xkOiAgICAgbnVtYmVyOyBcclxuLy8gICAgcHJvdGVjdGVkIGdvb2RzOiAgICBDX0dvb2RzTGlzdDsgXHJcbiAgICBwcm90ZWN0ZWQgdmFsOiAgICAgIEpTT05fSGVyb19WYWx1ZTtcclxuICAgIHByb3RlY3RlZCBhYmlfcDogICAgICB7YnNjOiBDX0hlcm9BYmlsaXR5LCB0dGw6IENfSGVyb0FiaWxpdHksIG5vdzogQ19IZXJvQWJpbGl0eX07XHJcbiAgICBwcm90ZWN0ZWQgYWJpX206ICAgICAge2JzYzogQ19IZXJvQWJpbGl0eSwgdHRsOiBDX0hlcm9BYmlsaXR5LCBub3c6IENfSGVyb0FiaWxpdHl9O1xyXG5cclxuICAgIHByb3RlY3RlZCBpc19hbGl2ZTogYm9vbGVhbjtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoYT86IEpTT05fSGVybykge1xyXG4gICAgICAgIHRoaXMubXlfaWQgICAgICA9IDA7XHJcbiAgICAgICAgdGhpcy5teV9uYW1lICAgID0gJ05vIE5hbWUgSGVybyc7XHJcbiAgICAgICAgdGhpcy51bmlxX2lkICAgID0gJ21haV9oZXJvIycgKyBfZ2V0X3V1aWQoKTtcclxuICAgICAgICB0aGlzLnNhdmVfaWQgICAgPSAwO1xyXG4gICAgICAgIHRoaXMuc2V4ICAgICAgICA9IDA7IFxyXG4gICAgICAgIHRoaXMuYWdlICAgICAgICA9IDA7IFxyXG4gICAgICAgIHRoaXMuZ29sZCAgICAgICA9IDA7IFxyXG4vLyAgICAgICAgdGhpcy5nb29kcyAgICAgID0gbmV3IENfR29vZHNMaXN0KCk7IFxyXG4gICAgICAgIHRoaXMuc3RhdGUgICAgICA9IDA7IFxyXG4gICAgICAgIHRoaXMubHYgICAgICAgICA9IDA7XHJcbiAgICAgICAgdGhpcy52YWwgICAgICAgID0ge307XHJcbiAgICAgICAgdGhpcy5hYmlfcCAgICAgID0ge2JzYzogbmV3IENfSGVyb0FiaWxpdHkoKSwgdHRsOiBuZXcgQ19IZXJvQWJpbGl0eSgpLCBub3c6IG5ldyBDX0hlcm9BYmlsaXR5KCl9O1xyXG4gICAgICAgIHRoaXMuYWJpX20gICAgICA9IHtic2M6IG5ldyBDX0hlcm9BYmlsaXR5KCksIHR0bDogbmV3IENfSGVyb0FiaWxpdHkoKSwgbm93OiBuZXcgQ19IZXJvQWJpbGl0eSgpfTtcclxuICAgICAgICB0aGlzLmlzX2FsaXZlICAgPSB0cnVlO1xyXG4gICAgICAgIGlmIChhICE9PSB1bmRlZmluZWQpIHRoaXMuZGVjb2RlKGEpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRfcHJwKGFyZyA6IEpTT05fSGVybykge1xyXG4gICAgICAgIHRoaXMuZGVjb2RlKGFyZyk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0X3VuaXFfaWQoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMudW5pcV9pZH1cclxuXHJcbiAgICBwdWJsaWMgaWQoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gJ0hlcm9fJyArIHRoaXMubXlfaWQudG9TdHJpbmcoMTYpLnBhZFN0YXJ0KDUsICcwJyk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgdWlkKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLnVuaXFfaWQ7fVxyXG4gICAgcHVibGljIG5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5teV9uYW1lO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldF9uYW1lKG5hbWU6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubXlfbmFtZSA9IG5hbWU7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBlbmNvZGUoKTogSlNPTl9IZXJvIHtcclxuICAgICAgICBjb25zdCByZXQ6IEpTT05fSGVybyA9IHtcclxuICAgICAgICAgICAgaWQ6ICAgICAgICB0aGlzLm15X2lkLFxyXG4gICAgICAgICAgICB1bmlxX2lkOiAgIHRoaXMudW5pcV9pZCxcclxuICAgICAgICAgICAgbmFtZTogICAgICB0aGlzLm15X25hbWUsXHJcbiAgICAgICAgICAgIHNhdmVfaWQ6ICAgdGhpcy5zYXZlX2lkLFxyXG4gICAgICAgICAgICBzZXg6ICAgICAgIHRoaXMuc2V4LCBcclxuICAgICAgICAgICAgYWdlOiAgICAgICB0aGlzLmFnZSwgXHJcbiAgICAgICAgICAgIHN0YXRlOiAgICAgdGhpcy5zdGF0ZSwgXHJcbiAgICAgICAgICAgIGx2OiAgICAgICAgdGhpcy5sdiwgXHJcbiAgICAgICAgICAgIGdvbGQ6ICAgICAgdGhpcy5nb2xkLCBcclxuLy8gICAgICAgICAgICBnb29kczogICAgIHRoaXMuZ29vZHMuZW5jb2RlKCksIFxyXG4gICAgICAgICAgICB2YWw6ICAgICAgIHRoaXMudmFsLFxyXG4gICAgICAgICAgICBhYmlfcF9ic2M6IHRoaXMuYWJpX3AuYnNjLmVuY29kZSgpLFxyXG4gICAgICAgICAgICBhYmlfbV9ic2M6IHRoaXMuYWJpX20uYnNjLmVuY29kZSgpLFxyXG4gICAgICAgICAgICBpc19hbGl2ZTogKHRoaXMuaXNfYWxpdmUpID8gJ1knIDogJ04nLCBcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJldDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBkZWNvZGUoYTogSlNPTl9IZXJvfHVuZGVmaW5lZCk6IENfSGVybyB7XHJcbiAgICAgICAgaWYgKGEgPT09IHVuZGVmaW5lZCkgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgaWYgKGEuaWQgICAgICAgIT09IHVuZGVmaW5lZCkgdGhpcy5teV9pZCAgICA9IGEuaWQ7XHJcbiAgICAgICAgaWYgKGEubmFtZSAgICAgIT09IHVuZGVmaW5lZCkgdGhpcy5teV9uYW1lICA9IGEubmFtZTtcclxuICAgICAgICBpZiAoYS51bmlxX2lkICAhPT0gdW5kZWZpbmVkKSB0aGlzLnVuaXFfaWQgID0gYS51bmlxX2lkO1xyXG4gICAgICAgIGlmIChhLnNhdmVfaWQgICE9PSB1bmRlZmluZWQpIHRoaXMuc2F2ZV9pZCAgPSBhLnNhdmVfaWQ7XHJcbiAgICAgICAgaWYgKGEuc2V4ICAgICAgIT09IHVuZGVmaW5lZCkgdGhpcy5zZXggICAgICA9IGEuc2V4O1xyXG4gICAgICAgIGlmIChhLmFnZSAgICAgICE9PSB1bmRlZmluZWQpIHRoaXMuYWdlICAgICAgPSBhLmFnZTtcclxuICAgICAgICBpZiAoYS5zdGF0ZSAgICAhPT0gdW5kZWZpbmVkKSB0aGlzLnN0YXRlICAgID0gYS5zdGF0ZTtcclxuICAgICAgICBpZiAoYS5sdiAgICAgICAhPT0gdW5kZWZpbmVkKSB0aGlzLmx2ICAgICAgID0gYS5sdjtcclxuICAgICAgICBpZiAoYS5nb2xkICAgICAhPT0gdW5kZWZpbmVkKSB0aGlzLmdvbGQgICAgID0gYS5nb2xkO1xyXG4gICAgICAgIGlmIChhLmlzX2FsaXZlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBhLmlzX2FsaXZlID09PSBcImJvb2xlYW5cIikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc19hbGl2ZSA9IGEuaXNfYWxpdmU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzX2FsaXZlID0gKGEuaXNfYWxpdmUgIT0gJ04nKSA/IHRydWU6IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4vLyAgICAgICAgaWYgKGEuZ29vZHMgICAhPT0gdW5kZWZpbmVkKSB0aGlzLmdvb2RzLmRlY29kZShhLmdvb2RzKTtcclxuICAgICAgICBpZiAoYS52YWwgICAgICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5fX2RlY29kZV92YWwodGhpcy52YWwsIGEudmFsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGEuYWJpX3BfYnNjICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5hYmlfcC5ic2MuZGVjb2RlKGEuYWJpX3BfYnNjKTtcclxuICAgICAgICAgICAgLy8g5pqr5a6aXHJcbiAgICAgICAgICAgIHRoaXMuYWJpX3AudHRsID0gdGhpcy5hYmlfcC5ub3cgPSB0aGlzLmFiaV9wLmJzYztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGEuYWJpX21fYnNjICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5hYmlfbS5ic2MuZGVjb2RlKGEuYWJpX21fYnNjKTtcclxuICAgICAgICAgICAgLy8g5pqr5a6aXHJcbiAgICAgICAgICAgIHRoaXMuYWJpX20udHRsID0gdGhpcy5hYmlfbS5ub3cgPSB0aGlzLmFiaV9tLmJzYztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIF9fZGVjb2RlX3ZhbChkOiBKU09OX0hlcm9fVmFsdWUsIHM6IEpTT05fSGVyb19WYWx1ZSk6IHZvaWQge1xyXG4gICAgICAgIGlmIChzLnNrcCAhPT0gdW5kZWZpbmVkKSBkLnNrcCA9IHRoaXMuX19kZWNvZGVfc2tleChkLnNrcCwgcy5za3ApO1xyXG4gICAgICAgIGlmIChzLmV4cCAhPT0gdW5kZWZpbmVkKSBkLmV4cCA9IHRoaXMuX19kZWNvZGVfc2tleChkLmV4cCwgcy5leHApO1xyXG4gICAgICAgIGlmIChzLm54ZSAhPT0gdW5kZWZpbmVkKSBkLm54ZSA9IHMubnhlO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIF9fZGVjb2RlX3NrZXgoYToge3R0bD86IG51bWJlciwgbm93PzogbnVtYmVyfSB8IHVuZGVmaW5lZCwgczoge3R0bD86IG51bWJlciwgbm93PzogbnVtYmVyfSk6IHt0dGw6IG51bWJlciwgbm93OiBudW1iZXJ9IHtcclxuICAgICAgICB2YXIgZDoge3R0bDogbnVtYmVyLCBub3c6IG51bWJlcn07XHJcbiAgICAgICAgaWYgICAgIChhID09PSB1bmRlZmluZWQpIGQgPSB7dHRsOiAwLCBub3c6IDB9O1xyXG4gICAgICAgIGVsc2UgICAgZCA9IHt0dGw6IGE/LnR0bCA/PyAwLCBub3c6IGE/Lm5vdyA/PyAwfTtcclxuXHJcbiAgICAgICAgZC50dGwgPSBzLnR0bCA/PyBkLnR0bDtcclxuICAgICAgICBkLm5vdyA9IHMubm93ID8/IHMudHRsID8/IGQubm93O1xyXG4gICAgICAgIHJldHVybiBkO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlX2hlcm8oKTogQ19IZXJvIHtcclxuICAgICAgICBjb25zdCBuZXdfaGVybyA9IG5ldyBDX0hlcm8oKTtcclxuICAgICAgICBuZXdfaGVyby5zZXRfcHJwKHtpZDogICAgTWF0aC5mbG9vcigtMTAwMC4wICogTWF0aC5yYW5kb20oKSl9KTtcclxuICAgICAgICBuZXdfaGVyby5zZXRfcHJwKHtuYW1lOiAgbmV3X2hlcm8uaWQoKX0pO1xyXG4gICAgICAgIHJldHVybiBuZXdfaGVybztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmFuZG9tX21ha2UoKTogQ19IZXJvIHtcclxuICAgICAgICB0aGlzLm15X2lkICAgID0gMDsgLy8gLS1IZXJvOjokbWF4X2lkO1xyXG4gICAgICAgIHRoaXMubXlfbmFtZSAgPSBcIuWGkumZuuiAhSBcIiArIF9yYW5kb21fc3RyKDUpO1xyXG4gICAgICAgIHRoaXMuc2V4ICAgICAgPSBfaXJhbmQoIDAsICAgICAxKTsgXHJcbiAgICAgICAgdGhpcy5hZ2UgICAgICA9IF9pcmFuZCggMTUsICAgMjUpOyBcclxuICAgICAgICB0aGlzLnN0YXRlICAgID0gMDsgXHJcbiAgICAgICAgdGhpcy5sdiAgICAgICA9IDA7IFxyXG4gICAgICAgIHRoaXMuZ29sZCAgICAgPSBfaXJhbmQoIDUwMCwgMTAwMCk7IFxyXG4gICAgICAgIHRoaXMudmFsICAgICAgPSB7XHJcbiAgICAgICAgICAgIHNrcDoge3R0bDogMCwgbm93OiAwfSwgXHJcbiAgICAgICAgICAgIGV4cDoge3R0bDogMCwgbm93OiAwfSxcclxuICAgICAgICAgICAgJ254ZSc6IDEwMDBcclxuICAgICAgICB9O1xyXG5cclxuXHJcbiAgICAgICAgY29uc3QgYWJpX3BfYnNjID0gdGhpcy5hYmlfcC5ic2M7XHJcbiAgICAgICAgYWJpX3BfYnNjLnJhbmRvbV9tYWtlKCk7XHJcbiAgICAgICAgYWJpX3BfYnNjLmFkZF94cF9ib251cygodGhpcy5hZ2UgLSAxNSkgKiAxMCk7XHJcbiAgICAgICAgYWJpX3BfYnNjLmFkZF9lbF9ib251cygodGhpcy5hZ2UgLSAxNSkgKiAgNSk7XHJcbiAgICAgICAgYWJpX3BfYnNjLmFkZF9wcl9ib251cygodGhpcy5hZ2UgLSAxNSkgKiAgMik7XHJcbiAgICAgICAgdGhpcy5hYmlfcC5ic2MgPSBhYmlfcF9ic2M7XHJcblxyXG4gICAgICAgIGNvbnN0IGFiaV9tX2JzYyA9IHRoaXMuYWJpX20uYnNjO1xyXG4gICAgICAgIGFiaV9tX2JzYy5yYW5kb21fbWFrZSgpO1xyXG4gICAgICAgIGFiaV9tX2JzYy5hZGRfeHBfYm9udXMoKHRoaXMuYWdlIC0gMTUpICogMTApO1xyXG4gICAgICAgIGFiaV9tX2JzYy5hZGRfZWxfYm9udXMoKHRoaXMuYWdlIC0gMTUpICogIDUpO1xyXG4gICAgICAgIGFiaV9tX2JzYy5hZGRfcHJfYm9udXMoKHRoaXMuYWdlIC0gMTUpICogIDIpO1xyXG4gICAgICAgIHRoaXMuYWJpX20uYnNjID0gYWJpX21fYnNjO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGVuY29kZV9oZXJvZXMoaGVyb2VzOiBDX0hlcm9bXSk6IEpTT05fSGVyb1tdIHtcclxuICAgICAgICBjb25zdCBoZXJvZXNfZGF0YSA9IFtdIGFzIEpTT05fSGVyb1tdO1xyXG4gICAgICAgIGZvciAodmFyIGhlcm8gb2YgaGVyb2VzKSB7XHJcbiAgICAgICAgICAgIGhlcm9lc19kYXRhLnB1c2goaGVyby5lbmNvZGUoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBoZXJvZXNfZGF0YTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzdGF0aWMgZGVjb2RlX2hlcm9lcyhoZXJvZXNfZGF0YTogKEpTT05fSGVyb3x1bmRlZmluZWQpW118dW5kZWZpbmVkKTogQ19IZXJvW10ge1xyXG4gICAgICAgIGNvbnN0IGhlcm9lcyA9IFtdIGFzIENfSGVyb1tdO1xyXG4gICAgICAgIGlmIChoZXJvZXNfZGF0YSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGhlcm9fZGF0YSBvZiBoZXJvZXNfZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGhlcm9fZGF0YSAhPT0gdW5kZWZpbmVkKSBoZXJvZXMucHVzaChuZXcgQ19IZXJvKCkuZGVjb2RlKGhlcm9fZGF0YSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBoZXJvZXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFsZXJ0KCk6IHZvaWQgeyBcclxuICAgICAgICBhbGVydChcIkhlcm8gSW5mbzpcXG5cIiBcclxuICAgICAgICAgICAgKyBcIlxcbmlkOiAgICAgICBcIiAgICAgKyAodGhpcy5pZCAgICAgICAgPz8gJz8nKVxyXG4gICAgICAgICAgICArIFwiXFxudW5pcV9pZCAgIFwiICAgICArICh0aGlzLnVuaXFfaWQgICA/PyAnPycpXHJcbiAgICAgICAgICAgICsgXCJcXG5uYW1lOiAgICAgXCIgICAgICsgKHRoaXMubmFtZSAgICAgID8/ICc/JylcclxuICAgICAgICAgICAgKyBcIlxcbnNhdmVfaWQ6ICBcIiAgICAgKyAodGhpcy5zYXZlX2lkICAgPz8gJz8nKVxyXG4gICAgICAgICAgICArIFwiXFxuaXNfYWxpdmU6IFwiICAgICArICh0aGlzLmlzX2FsaXZlICA/PyAnPycpXHJcbiAgICAgICAgICAgICsgXCJcXG5cIlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc3RhdGljIGFsZXJ0X2hyZXMoYTogKENfSGVyb3x1bmRlZmluZWQpW118dW5kZWZpbmVkKTogdm9pZCB7IFxyXG4gICAgICAgIGlmIChhID09PSB1bmRlZmluZWQpIHJldHVybjtcclxuICAgICAgICBhbGVydCgnTnVtYmVyIG9mIEhlcm8gPSAnICsgYS5sZW5ndGgudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgZm9yICh2YXIgaSBpbiBhKSBhW2ldPy5hbGVydCgpO1xyXG4gICAgfVxyXG59IiwiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5pbXBvcnQgeyBJX0pTT04sIEpTT05fQW55IH0gZnJvbSBcIi4vQ19TYXZlSW5mb1wiO1xyXG5pbXBvcnQgeyBfcm91bmQgfSAgICAgICAgICAgZnJvbSBcIi4uL2RfdXRsL0ZfTWF0aFwiO1xyXG5pbXBvcnQgeyBfaW5yYW5kIH0gZnJvbSBcIi4uL2RfdXRsL0ZfUmFuZFwiO1xyXG5cclxuLy8g5LiA6Iis44Gr5L2/44GI44KL44Om44O844OG44Kj44Oq44OG44Kj44Gq5ZGq5paHXHJcbi8vIOOCquODluOCuOOCp+OCr+ODiOOCkuWIl+aMmeWei+OBqOOBl+OBpuWei+WMluOBmeOCi+OBruOBq+WIqeeUqFxyXG50eXBlIFRfSGVyb0FiaWxpdHkgPSB7W2tleTogc3RyaW5nXTogbnVtYmVyfTtcclxuZXhwb3J0IGludGVyZmFjZSBKU09OX0hlcm9fQWJpbGl0eSBleHRlbmRzIEpTT05fQW55IHtba2V5OiBzdHJpbmddOiBudW1iZXJ9XHJcblxyXG5leHBvcnQgY2xhc3MgQ19IZXJvQWJpbGl0eSBpbXBsZW1lbnRzIElfSlNPTiB7XHJcbiAgICBwcm90ZWN0ZWQgdjogVF9IZXJvQWJpbGl0eSA9IHtcclxuICAgICAgICB4cDogIDAsICAvLyBwOkhQ44CBbTpNUFxyXG5cclxuICAgICAgICAvLyDku6XkuIvjgIHmiKbpl5jog73lipvjga7ln7rmnKzlgKQocDrniannkIbjgIFtOumtlOazlSnjgILjg5Ljg7zjg63jg7zjg6zjg5njg6vjgoTjgrnjg4bjg7zjgr/jgrnjgqLjg4Pjg5fjgafliqDnrpcgXHJcbiAgICAgICAgYXRrOiAwLCAgLy8g5pS75pKD5YCkXHJcbiAgICAgICAgZGVmOiAwLCAgLy8g6Ziy5b6h5YCkXHJcbiAgICAgICAgcXVjOiAwLCAgLy8g556s55m65YqbXHJcbiAgICAgICAgY25jOiAwLCAgLy8g5qmf6YGL5YCkKOODgeODo+ODs+OCuSlcclxuICAgIFxyXG4gICAgICAgIC8vIOS7peS4i+OAgeOBhOOCj+OChuOCi+OCueODhuODvOOCv+OCueOAguS4iuiomOOBruioiOeul+OBq+W9semfv+OAguODkuODvOODreODvOODrOODmeODq+OChOOCueODhuODvOOCv+OCueOCouODg+ODl+OBp+WKoOeul1xyXG4gICAgICAgIHN0cjogMCwgIC8vIOagueaAp+OAguaUu+aSgy/pmLLlvqHlipvjgavjgoLlvbHpn7/jgIJIUC9NUOWbnuW+qeOChOOCouOCpOODhuODoOOBruacgOWkp+aJgOaMgemHjemHj+OBq+ODnOODvOODiuOCuVxyXG4gICAgICAgIHB3cjogMCwgIC8vIOWfuuacrOeahOW8t+OBleOAguaUu+aSg+WKm+OBq+W9semfv1xyXG4gICAgICAgIHZpdDogMCwgIC8vIOiAkOS5heWKm+OAgkhQL01Q44Gu5pyA5aSn5YCk44KE6Ziy5b6h5Yqb44Gr5b2x6Z+/44KS5LiO44GI44KLXHJcbiAgICAgICAgZGV4OiAwLCAgLy8g5Zmo55So44GV44CC5ZG95Lit546H44Gr5b2x6Z+/44KS5LiO44GI44KL44CC6aOb44Gz6YGT5YW344KE6ZW36Led6Zui6a2U5rOV44Gn44Gv54m544Gr5b2x6Z+/44CC572g6Kej6Zmk44Gr44KC5b2x6Z+/XHJcbiAgICAgICAgYWdpOiAwLCAgLy8g57Sg5pep44GV44CC6KGM5YuV6YCf5bqm44KE5Zue6YG/546H44Gr5b2x6Z+/44KS5LiO44GI44KL44CC5ZG95Lit546H44Gr44KC5b2x6Z+/XHJcbiAgICAgICAgdGVjOiAwLCAgLy8g5oqA6KGT5Yqb44CC57WM6aiT44Gn5ZCR5LiK44GX44Gm6IO95Yqb5YCkKHF1Yy9jbmMp44Gr44Oc44O844OK44K544KS5LiO44GI44KLXHJcbiAgICAgICAgbHVrOiAwLCAgLy8g5bm46YGL5YCk44CCY25j44Gr5aSn44GN44GP5b2x6Z+/44GZ44KLXHJcbiAgICB9O1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihhPzogSlNPTl9IZXJvX0FiaWxpdHkpIHtcclxuICAgICAgICBmb3IgKGxldCBpZHggaW4gdGhpcy52KSB7dGhpcy52W2lkeF0gPSAwO31cclxuICAgICAgICBpZiAoYSAhPT0gdW5kZWZpbmVkKSB0aGlzLmRlY29kZShhKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXRfcHJwKGE6IEpTT05fSGVyb19BYmlsaXR5KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5kZWNvZGUoYSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0KGtleTogc3RyaW5nKTogbnVtYmVyIHwgdW5kZWZpbmVkIHtcclxuICAgICAgICBpZiAoIShrZXkgaW4gdGhpcy52KSkgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICByZXR1cm4gdGhpcy52W2tleV07XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0KGtleTogc3RyaW5nLCBzOiBKU09OX0hlcm9fQWJpbGl0eSk6IG51bWJlciB8IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgaWYgKCEoa2V5IGluIHRoaXMudikpIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhpcy52W2tleV0gPSBzW2tleV07XHJcbiAgICAgICAgcmV0dXJuIHNba2V5XTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgeHBfdHRsYWRkKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIF9yb3VuZChNYXRoLmZsb29yKHRoaXMudi5zdHIgKyB0aGlzLnYudml0ICogMTAuMCksIDApO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGF0a190dGxhZGQoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gX3JvdW5kKE1hdGguZmxvb3IodGhpcy52LnN0ciArIHRoaXMudi5wd3IgKyB0aGlzLnYudGVjKSAvIDEwLjAsIDApO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGRlZl90dGxhZGQoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gX3JvdW5kKE1hdGguZmxvb3IodGhpcy52LnN0ciArIHRoaXMudi52aXQgKyB0aGlzLnYudGVjKSAvIDEwLjAsIDApO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHF1Y190dGxhZGQoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gX3JvdW5kKE1hdGguZmxvb3IodGhpcy52LmFnaSArIHRoaXMudi5sdWsgKyB0aGlzLnYudGVjKSAvIDEwLjAsIDApO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGNuY190dGxhZGQoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gX3JvdW5kKE1hdGguZmxvb3IoMi4wICogdGhpcy52Lmx1ayArIHRoaXMudi50ZWMpIC8gMTAuMCwgMCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGJvbnVzKGtleSA6IHN0cmluZyk6IG51bWJlciB7XHJcbiAgICAgICAgaWYgKCEoa2V5IGluIHRoaXMudikpIHJldHVybiAwO1xyXG4gICAgICAgIGlmIChrZXkgPT09ICd4cCcpIHJldHVybiBfcm91bmQoTWF0aC5mbG9vcih0aGlzLnYueHAgLyAxMDApLCAwKTtcclxuICAgICAgICByZXR1cm4gX3JvdW5kKE1hdGguZmxvb3IodGhpcy52W2tleV0gLyAxMC4wKSwgMCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZChhOiBKU09OX0hlcm9fQWJpbGl0eSk6IHZvaWQge1xyXG4gICAgICAgIGZvciAobGV0IGtleSBpbiBhKSB7XHJcbiAgICAgICAgICAgIHRoaXMudltrZXldICs9IGFba2V5XTtcclxuICAgICAgICB9XHJcbiAgICB9IFxyXG5cclxuICAgIHB1YmxpYyBhZGRfeHBfYm9udXMoYm9udXM6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMudi54cCAgKz0gIGJvbnVzO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGFkZF9lbF9ib251cyhib251czogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy52LmF0ayArPSAgYm9udXM7XHJcbiAgICAgICAgdGhpcy52LmRlZiArPSAgYm9udXM7XHJcbiAgICAgICAgdGhpcy52LnF1YyArPSAgYm9udXM7XHJcbiAgICAgICAgdGhpcy52LmNuYyArPSAgYm9udXM7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgYWRkX3ByX2JvbnVzKGJvbnVzOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnYuc3RyICs9ICBib251cztcclxuICAgICAgICB0aGlzLnYucHdyICs9ICBib251cztcclxuICAgICAgICB0aGlzLnYudml0ICs9ICBib251cztcclxuICAgICAgICB0aGlzLnYuZGV4ICs9ICBib251cztcclxuICAgICAgICB0aGlzLnYuYWdpICs9ICBib251cztcclxuICAgICAgICB0aGlzLnYudGVjICs9ICBib251cztcclxuICAgICAgICB0aGlzLnYubHVrICs9ICBib251cztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmFuZG9tX21ha2UoKTogQ19IZXJvQWJpbGl0eSB7XHJcbiAgICAgICAgdGhpcy52LnhwICA9ICBfaW5yYW5kKDAsIDEwMDAsIDMuMCk7XHJcblxyXG4gICAgICAgIHRoaXMudi5hdGsgPSAgX2lucmFuZCgwLCAgMTAwLCAyLjUpO1xyXG4gICAgICAgIHRoaXMudi5kZWYgPSAgX2lucmFuZCgwLCAgMTAwLCAyLjUpO1xyXG4gICAgICAgIHRoaXMudi5xdWMgPSAgX2lucmFuZCgwLCAgMTAwLCAyLjUpO1xyXG4gICAgICAgIHRoaXMudi5jbmMgPSAgX2lucmFuZCgwLCAgMTAwLCAyLjUpO1xyXG4gICAgXHJcbiAgICAgICAgdGhpcy52LnN0ciA9ICBfaW5yYW5kKDAsICAgMjAsIDIuMCk7XHJcbiAgICAgICAgdGhpcy52LnB3ciA9ICBfaW5yYW5kKDAsICAgMjAsIDIuMCk7XHJcbiAgICAgICAgdGhpcy52LnZpdCA9ICBfaW5yYW5kKDAsICAgMjAsIDIuMCk7XHJcbiAgICAgICAgdGhpcy52LmRleCA9ICBfaW5yYW5kKDAsICAgMjAsIDIuMCk7XHJcbiAgICAgICAgdGhpcy52LmFnaSA9ICBfaW5yYW5kKDAsICAgMjAsIDIuMCk7XHJcbiAgICAgICAgdGhpcy52LnRlYyA9ICBfaW5yYW5kKDAsICAgMjAsIDIuMCk7XHJcbiAgICAgICAgdGhpcy52Lmx1ayA9ICBfaW5yYW5kKDAsICAgMjAsIDIuMCk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBlbmNvZGUoKTogSlNPTl9IZXJvX0FiaWxpdHkge1xyXG4gICAgICAgIGNvbnN0IGE6IEpTT05fSGVyb19BYmlsaXR5ID0ge307XHJcbiAgICAgICAgZm9yIChsZXQga2V5IGluIHRoaXMudikgYVtrZXldID0gdGhpcy52W2tleV07XHJcbiAgICAgICAgcmV0dXJuIGE7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZGVjb2RlKGE6IEpTT05fSGVyb19BYmlsaXR5KTogQ19IZXJvQWJpbGl0eSB7XHJcbiAgICAgICAgZm9yIChsZXQga2V5IGluIGEpIHtcclxuICAgICAgICAgICAgaWYgKGtleSBpbiB0aGlzLnYgJiYgYVtrZXldICE9PSB1bmRlZmluZWQpIHRoaXMudltrZXldID0gYVtrZXldO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGNsb25lKHM6IENfSGVyb0FiaWxpdHkpOiBDX0hlcm9BYmlsaXR5IHtcclxuICAgICAgICByZXR1cm4gbmV3IENfSGVyb0FiaWxpdHkocy5lbmNvZGUoKSk7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuXHJcbmltcG9ydCB7IENfUG9pbnQgfSAgICAgICAgICAgICAgICAgICBmcm9tICcuL0NfUG9pbnQnO1xyXG5pbXBvcnQgeyBDX1BvaW50RGlyLCBKU09OX1BvaW50RGlyIH0gZnJvbSAnLi9DX1BvaW50RGlyJztcclxuaW1wb3J0IHsgVF9EaXJlY3Rpb24gfSAgICAgICAgICAgICAgIGZyb20gJy4vQ19Qb2ludERpcic7XHJcbmltcG9ydCB7IElfSlNPTiwgSlNPTl9BbnkgfSAgICAgICAgICBmcm9tICcuL0NfU2F2ZUluZm8nO1xyXG5pbXBvcnQgeyBUX01ha2VFbnVtVHlwZSB9ICAgICAgICAgICAgZnJvbSBcIi4uL2RfdXRsL1RfTWFrZUVudW1UeXBlXCI7XHJcblxyXG5leHBvcnQgY29uc3QgVF9MY2tkOntbbGNrZDogc3RyaW5nXTogbnVtYmVyfSAgPSB7XHJcbiAgICBVbmtuOiAwLFxyXG4gICAgTWF6ZTogMSxcclxuICAgIEd1bGQ6IDIsXHJcbn0gYXMgY29uc3Q7XHJcbmV4cG9ydCB0eXBlIFRfTGNrZCAgID0gVF9NYWtlRW51bVR5cGU8dHlwZW9mIFRfTGNrZD47XHJcblxyXG5mdW5jdGlvbiBfbGNrZF9rZXkobGNrZDogVF9MY2tkKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBPYmplY3Qua2V5cyhUX0xja2QpLmZpbmQoa2V5ID0+IFRfTGNrZFtrZXldID09PSBsY2tkKSA/PyBcIj8/Pz9cIjtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBKU09OX0xvY2F0aW9uIGV4dGVuZHMgSlNPTl9Bbnkge1xyXG4gICAga2luZD86ICAgIHN0cmluZyxcclxuICAgIG5hbWU/OiAgICBzdHJpbmcsXHJcbiAgICBsb2NfdWlkPzogc3RyaW5nLFxyXG4gICAgbG9jX3Bvcz86IEpTT05fUG9pbnREaXIsXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSV9Mb2NhdGUge1xyXG4gICAgdWlkOiAgICAgICgpPT5zdHJpbmc7XHJcbiAgICBnZXRfbGNrZDogKCk9PlRfTGNrZDtcclxuICAgIGdldF9uYW1lOiAoKT0+c3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQ19Mb2NhdGlvbiBpbXBsZW1lbnRzIElfSlNPTiB7XHJcbiAgICBwcm90ZWN0ZWQgbG9jX2tpbmQ6IFRfTGNrZCA9IFRfTGNrZC5VbmtuO1xyXG4gICAgcHJvdGVjdGVkIGxvY19uYW1lOiBzdHJpbmcgPSAnJztcclxuICAgIHByb3RlY3RlZCBsb2NfdWlkOiAgc3RyaW5nID0gJyc7XHJcbiAgICBwcm90ZWN0ZWQgbG9jX3BvczogIENfUG9pbnREaXIgPSBuZXcgQ19Qb2ludERpcigpO1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcihqc29uPzogSlNPTl9Mb2NhdGlvbikge1xyXG4gICAgICAgIGlmIChqc29uICE9PSB1bmRlZmluZWQpIHRoaXMuZGVjb2RlKGpzb24pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRfbGNrZF9zdHIoKTogc3RyaW5nICB7cmV0dXJuIF9sY2tkX2tleSh0aGlzLmxvY19raW5kKTt9XHJcbiAgICBwdWJsaWMgZ2V0X2xja2QoKTogVF9MY2tkICAgICAge3JldHVybiB0aGlzLmxvY19raW5kO31cclxuICAgIHB1YmxpYyBnZXRfbmFtZSgpOiBzdHJpbmcgICAgICB7cmV0dXJuIHRoaXMubG9jX25hbWU7fVxyXG4gICAgcHVibGljIGdldF91aWQoKTogIHN0cmluZyAgICAgIHtyZXR1cm4gdGhpcy5sb2NfdWlkO31cclxuXHJcbiAgICBwdWJsaWMgc2V0X2xja2QobGNrZDogVF9MY2tkKTogQ19Mb2NhdGlvbnx1bmRlZmluZWQge1xyXG4gICAgICAgIGlmICghKF9sY2tkX2tleShsY2tkKSBpbiBUX0xja2QpKSByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIHRoaXMubG9jX2tpbmQgPSBsY2tkO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldF9uYW1lKG5hbWU6IHN0cmluZyk6ICAgdm9pZCB7dGhpcy5sb2NfbmFtZSA9IG5hbWU7fVxyXG4gICAgcHVibGljIHNldF91aWQgKHVpZDogc3RyaW5nKTogICAgdm9pZCB7dGhpcy5sb2NfdWlkICA9IHVpZDt9XHJcbiAgICBcclxuICAgIHB1YmxpYyBzZXRfbGNrZF9zdHIobGNrZDogc3RyaW5nKTogQ19Mb2NhdGlvbnx1bmRlZmluZWQge1xyXG4gICAgICAgIGlmICghKGxja2QgaW4gVF9MY2tkKSkgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB0aGlzLmxvY19raW5kID0gVF9MY2tkW2xja2RdO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgZ2V0X3AoKTogQ19Qb2ludCAgICAge1xyXG4vLyAgICAgICAgaWYgKHRoaXMubG9jX2tpbmQgIT0gVF9MY2tkLk1hemUpIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubG9jX3Bvcy5nZXRfcCgpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldF9kKCk6IFRfRGlyZWN0aW9uIHtcclxuLy8gICAgICAgIGlmICh0aGlzLmxvY19raW5kICE9IFRfTGNrZC5NYXplKSByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxvY19wb3MuZ2V0X2QoKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRfcGQoKTogQ19Qb2ludERpciB7XHJcbi8vICAgICAgICBpZiAodGhpcy5sb2Nfa2luZCAhPSBUX0xja2QuTWF6ZSkgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICByZXR1cm4gdGhpcy5sb2NfcG9zLmdldF9wZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRfcCAgIChwOiBDX1BvaW50RGlyKTogQ19Qb2ludERpcnx1bmRlZmluZWQge1xyXG4gICAgICAgIGlmICh0aGlzLmxvY19raW5kICE9PSBUX0xja2QuTWF6ZSkgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIGlmICh0aGlzLmxvY19wb3Muc2V0X3AocCkgPT09IHVuZGVmaW5lZCkgIHJldHVybiB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmxvY19wb3M7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0X2QgICAoZDogVF9EaXJlY3Rpb24pOiBUX0RpcmVjdGlvbnx1bmRlZmluZWQge1xyXG4gICAgICAgIGlmICh0aGlzLmxvY19raW5kICE9PSBUX0xja2QuTWF6ZSkgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIGlmICh0aGlzLmxvY19wb3Muc2V0X2QoZCkgPT09IHVuZGVmaW5lZCkgIHJldHVybiB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmxvY19wb3MuZDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXRfcGQgIChwZDogQ19Qb2ludERpcik6IENfUG9pbnREaXJ8dW5kZWZpbmVkIHtcclxuICAgICAgICBpZiAodGhpcy5sb2Nfa2luZCAhPT0gVF9MY2tkLk1hemUpICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgaWYgKHRoaXMubG9jX3Bvcy5zZXRfcGQocGQpID09PSB1bmRlZmluZWQpIHJldHVybiB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmxvY19wb3M7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBlbmNvZGUoKTogSlNPTl9Mb2NhdGlvbiB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAga2luZDogICAgIF9sY2tkX2tleSh0aGlzLmxvY19raW5kKSxcclxuICAgICAgICAgICAgbmFtZTogICAgIHRoaXMubG9jX25hbWUsXHJcbiAgICAgICAgICAgIGxvY191aWQ6ICB0aGlzLmxvY191aWQsXHJcbiAgICAgICAgICAgIGxvY19wb3M6ICB0aGlzLmxvY19wb3MuZW5jb2RlKCksXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBkZWNvZGUoaj86IEpTT05fTG9jYXRpb24pOiBDX0xvY2F0aW9uIHtcclxuICAgICAgICBpZiAoaiA9PT0gdW5kZWZpbmVkKSByZXR1cm4gdGhpcztcclxuICAgICAgICBpZiAoai5raW5kID09PSB1bmRlZmluZWQgfHwgIShqLmtpbmQgaW4gVF9MY2tkKSkgcmV0dXJuIHRoaXM7XHJcblxyXG4gICAgICAgIGlmIChqLmtpbmQgICAgIT09IHVuZGVmaW5lZCkgdGhpcy5sb2Nfa2luZCA9IFRfTGNrZFtqLmtpbmRdO1xyXG4gICAgICAgIGlmIChqLm5hbWUgICAgIT09IHVuZGVmaW5lZCkgdGhpcy5sb2NfbmFtZSA9IGoubmFtZTtcclxuICAgICAgICBpZiAoai5sb2NfdWlkICE9PSB1bmRlZmluZWQpIHRoaXMubG9jX3VpZCAgPSBqLmxvY191aWQ7XHJcbiAgICAgICAgaWYgKGoubG9jX3BvcyAhPT0gdW5kZWZpbmVkKSB0aGlzLmxvY19wb3MuZGVjb2RlKGoubG9jX3Bvcyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbn1cclxuXHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5cclxuaW1wb3J0IHsgVF9NektpbmQgfSAgICAgICAgICAgICAgZnJvbSBcIi4vVF9NektpbmRcIjtcclxuaW1wb3J0IHsgQ19NYXplQ2VsbCB9ICAgICAgICAgICAgZnJvbSBcIi4vQ19NYXplQ2VsbFwiO1xyXG5pbXBvcnQgeyBDX01hemVPYmosIElfTWF6ZU9iaiwgSlNPTl9NYXplT2JqIH0gZnJvbSBcIi4vQ19NYXplT2JqXCI7XHJcbmltcG9ydCB7IENfUG9pbnQgfSAgICAgICAgICAgICAgIGZyb20gXCIuL0NfUG9pbnRcIjtcclxuaW1wb3J0IHsgSV9Mb2NhdGUsIFRfTGNrZCB9ICAgICAgZnJvbSBcIi4vQ19Mb2NhdGlvblwiO1xyXG5pbXBvcnQgeyBDX1JhbmdlIH0gICAgICAgICAgICAgICBmcm9tIFwiLi9DX1JhbmdlXCI7XHJcbmltcG9ydCB7IENfVGVhbSwgSlNPTl9UZWFtIH0gICAgIGZyb20gXCIuL0NfVGVhbVwiO1xyXG5pbXBvcnQgeyBJX0pTT05fVW5pcSwgSlNPTl9BbnkgfSBmcm9tIFwiLi9DX1NhdmVJbmZvXCI7XHJcbmltcG9ydCB7IF9nZXRfdXVpZCwgX2lncmFuZCwgX2lyYW5kIH0gICAgICAgICAgICAgZnJvbSBcIi4uL2RfdXRsL0ZfUmFuZFwiO1xyXG5pbXBvcnQgeyBfbWluIH0gZnJvbSBcIi4uL2RfdXRsL0ZfTWF0aFwiO1xyXG5pbXBvcnQgeyBDX1BvaW50RGlyIH0gZnJvbSBcIi4vQ19Qb2ludERpclwiO1xyXG5pbXBvcnQgeyBUX0RpcmVjdGlvbiB9IGZyb20gXCIuL1RfRGlyZWN0aW9uXCI7XHJcbmltcG9ydCB7IENfUG9pbnRMaW5rMkQsIENfUG9pbnRTZXQyRCB9IGZyb20gXCIuL0NfUG9pbnRTZXQyRFwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBKU09OX01hemUgZXh0ZW5kcyBKU09OX0FueSB7XHJcbiAgICBpZD86ICAgICAgbnVtYmVyLFxyXG4gICAgdW5pcV9pZD86IHN0cmluZyxcclxuICAgIHNhdmVfaWQ/OiBudW1iZXIsXHJcbiAgICBmbG9vcj86ICAgbnVtYmVyLFxyXG4gICAgbmFtZT86ICAgIHN0cmluZyxcclxuICAgIHNpemVfeD86ICBudW1iZXIsXHJcbiAgICBzaXplX3k/OiAgbnVtYmVyLFxyXG4gICAgc2l6ZV96PzogIG51bWJlcixcclxuICAgIG1hemU/OiAgICBzdHJpbmcsIFxyXG4gICAgbWFzaz86ICAgIHN0cmluZywgXHJcbiAgICBteXRlYW0/OiAgSlNPTl9UZWFtLCBcclxuICAgIG9ianM/OiAgICBKU09OX01hemVPYmpbXSxcclxufVxyXG5cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhbGVydF9tYXplX2luZm8oYTogSlNPTl9NYXplfHVuZGVmaW5lZCk6IHZvaWQge1xyXG4gICAgaWYgKGEgPT09IHVuZGVmaW5lZCkgcmV0dXJuO1xyXG5cclxuICAgIGFsZXJ0KFwiTWF6ZSBJbmZvOlwiXHJcbiAgICAgICAgKyBcIlxcbm1hemUgaWQgOlwiICsgKGEuaWQgICAgICA/PyAnPycpXHJcbiAgICAgICAgKyBcIlxcbmZsb29yOiBcIiAgICsgKGEuZmxvb3IgICA/PyAnPycpXHJcbiAgICAgICAgKyBcIlxcbnVuaXEgaWQgOlwiICsgKGEudW5pcV9pZCA/PyAnPycpXHJcbiAgICAgICAgKyBcIlxcbnNhdmUgaWQgOlwiICsgKGEuc2F2ZV9pZCA/PyAnPycpXHJcbiAgICAgICAgKyBcIlxcbm5hbWU6ICAgXCIgICsgKGEubmFtZSAgICA/PyAnPycpXHJcbiAgICAgICAgKyBcIlxcbnNpemVfeDogXCIgICsgKGEuc2l6ZV94ICA/PyAnPycpXHJcbiAgICAgICAgKyBcIlxcbnNpemVfeTogXCIgICsgKGEuc2l6ZV95ICA/PyAnPycpXHJcbiAgICAgICAgKyBcIlxcbnNpemVfejogXCIgICsgKGEuc2l6ZV96ICA/PyAnPycpXHJcbiAgICAgICAgKyBcIm1hemU6XFxuXCIgICAgICsgKGEubWF6ZSAgICA/PyAnPycpXHJcbiAgICAgICAgKyBcIm1hc2s6XFxuXCIgICAgICsgKGEubWFzayAgICA/PyAnPycpXHJcbiAgICAgICAgKyBcIlxcblwiXHJcbiAgICApO1xyXG59XHJcblxyXG5cclxudHlwZSBfaW5pdF9hcmcgPSB7XHJcbiAgICBtYXplX2lkPzogbnVtYmVyLFxyXG4gICAgc2F2ZV9pZD86IG51bWJlcixcclxuICAgIGZsb29yPzogICBudW1iZXIsXHJcbiAgICBuYW1lPzogICAgc3RyaW5nLFxyXG4gICAgc2l6ZV94PzogIG51bWJlcixcclxuICAgIHNpemVfeT86ICBudW1iZXIsXHJcbiAgICBzaXplX3o/OiAgbnVtYmVyLFxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQ19NYXplIGltcGxlbWVudHMgSV9Mb2NhdGUsIElfSlNPTl9VbmlxIHtcclxuICAgIHByb3RlY3RlZCBtYXplX2lkOiAgbnVtYmVyO1xyXG4gICAgcHJvdGVjdGVkIHVuaXFfaWQ6ICBzdHJpbmc7XHJcbiAgICBwcm90ZWN0ZWQgc2F2ZV9pZDogIG51bWJlcjtcclxuICAgIHByb3RlY3RlZCBmbG9vcjogICAgbnVtYmVyO1xyXG4gICAgcHJvdGVjdGVkIG5hbWU6ICAgICBzdHJpbmc7XHJcbiAgICBwcm90ZWN0ZWQgbXlfbGF5ZXI6IG51bWJlciA9IDA7XHJcbiAgICBwcm90ZWN0ZWQgc2l6ZTogICAgIENfUmFuZ2U7XHJcbiAgICBwcm90ZWN0ZWQgY2VsbHM6ICAgIENfTWF6ZUNlbGxbXVtdW107XHJcbiAgICBwcm90ZWN0ZWQgbWFza3M6ICAgIGJvb2xlYW5bXVtdW107XHJcbiAgICBwcm90ZWN0ZWQgdW5jbGVhcjogIG51bWJlcltdO1xyXG4gICAgcHJvdGVjdGVkIG9ianM6ICAgICB7W3VpZDogc3RyaW5nXTogSV9NYXplT2JqfTtcclxuICAgIHByb3RlY3RlZCBudW1fb2Zfcm9vbTogICAgICBudW1iZXIgPSA1OyAvKiDjg6njg7Pjg4Djg6DnlJ/miJDjga7pmpvjga7pg6jlsYvjga7mlbDjga7mnIDlpKfmlbAgKi9cclxuICAgIHByb3RlY3RlZCBtYXhfc2l6ZV9vZl9yb29tOiBudW1iZXIgPSAzOyAvKiDjg6njg7Pjg4Djg6DnlJ/miJDjga7pmpvjga7pg6jlsYvjga7lpKfjgY3jgZUgKi9cclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoYT86IF9pbml0X2FyZykge1xyXG4gICAgICAgIHRoaXMubWF6ZV9pZCA9IC0xO1xyXG4gICAgICAgIHRoaXMuc2F2ZV9pZCA9IC0xO1xyXG4gICAgICAgIHRoaXMudW5pcV9pZCA9ICdtYWlfbWF6ZSMnICsgX2dldF91dWlkKCk7XHJcbiAgICAgICAgdGhpcy5mbG9vciAgID0gMDtcclxuICAgICAgICB0aGlzLm5hbWUgICAgPSAnJztcclxuICAgICAgICB0aGlzLnNpemUgICAgPSBuZXcgQ19SYW5nZShcclxuICAgICAgICAgICAgbmV3IENfUG9pbnQoMCwgMCwgMCksIFxyXG4gICAgICAgICAgICBuZXcgQ19Qb2ludCgyLCAyLCAyKSk7XHJcbiAgICAgICAgdGhpcy5jZWxscyAgID0gdGhpcy5fX2luaXRfbWF6ZShUX016S2luZC5TdG9uZSk7XHJcblxyXG4gICAgICAgIHRoaXMubWFza3MgICA9IHRoaXMuX19pbml0X21hc2sodHJ1ZSk7XHJcbiAgICAgICAgdGhpcy51bmNsZWFyID0gW107XHJcbiAgICAgICAgdGhpcy5fX2luaXRfdW5jbGVhcigpO1xyXG5cclxuICAgICAgICB0aGlzLm9ianMgICAgPSB7fTtcclxuICAgICAgICBcclxuICAgICAgICBpZiAoYSAhPT0gdW5kZWZpbmVkKSB0aGlzLmRlY29kZShhKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgX19pbml0X21hemUoa2luZDogVF9NektpbmQgPSBUX016S2luZC5TdG9uZSk6IENfTWF6ZUNlbGxbXVtdW10ge1xyXG4gICAgICAgIGNvbnN0IHNpemVfeCA9IHRoaXMuc2l6ZS5zaXplX3goKTtcclxuICAgICAgICBjb25zdCBzaXplX3kgPSB0aGlzLnNpemUuc2l6ZV95KCk7XHJcbiAgICAgICAgY29uc3Qgc2l6ZV96ID0gdGhpcy5zaXplLnNpemVfeigpO1xyXG5cclxuICAgICAgICBjb25zdCBjZWxsczogQ19NYXplQ2VsbFtdW11bXSA9IEFycmF5KHNpemVfeikgYXMgQ19NYXplQ2VsbFtdW11bXTtcclxuICAgICAgICBmb3IgKHZhciB6ID0gMDsgeiA8IHNpemVfejsgeisrKSB7XHJcbiAgICAgICAgICAgIGNlbGxzW3pdID0gQXJyYXkoc2l6ZV95KSBhcyBDX01hemVDZWxsW11bXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgeSA9IDA7IHkgPCBzaXplX3k7IHkrKykge1xyXG4gICAgICAgICAgICAgICAgY2VsbHNbel1beV0gID0gQXJyYXkoc2l6ZV94KSBhcyBDX01hemVDZWxsW107XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciB4ID0gMDsgeCA8IHNpemVfeDsgeCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2VsbHNbel1beV1beF0gPSBDX01hemVDZWxsLm5ld09iaih7a2luZDpraW5kLCBwb3M6IHt4OngsIHk6eSwgejp6fX0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjZWxscztcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBfX2luaXRfbWFzayhZTjogYm9vbGVhbik6IGJvb2xlYW5bXVtdW10ge1xyXG4gICAgICAgIGNvbnN0IHNpemVfeCA9IHRoaXMuc2l6ZS5zaXplX3goKTtcclxuICAgICAgICBjb25zdCBzaXplX3kgPSB0aGlzLnNpemUuc2l6ZV95KCk7XHJcbiAgICAgICAgY29uc3Qgc2l6ZV96ID0gdGhpcy5zaXplLnNpemVfeigpO1xyXG5cclxuICAgICAgICB0aGlzLm1hc2tzICAgPSBBcnJheShzaXplX3opIGFzIGJvb2xlYW5bXVtdW107XHJcbiAgICAgICAgZm9yICh2YXIgeiA9IDA7IHogPCBzaXplX3o7IHorKykge1xyXG4gICAgICAgICAgICB0aGlzLm1hc2tzW3pdID0gQXJyYXkoc2l6ZV95KSBhcyBib29sZWFuW11bXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgeSA9IDA7IHkgPCBzaXplX3k7IHkrKykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYXNrc1t6XVt5XSAgPSBBcnJheShzaXplX3gpIGFzIGJvb2xlYW5bXTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIHggPSAwOyB4IDwgc2l6ZV94OyB4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hc2tzW3pdW3ldW3hdID0gWU47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubWFza3M7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgX19pbml0X3VuY2xlYXIoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3Qgc2l6ZV94ID0gdGhpcy5zaXplLnNpemVfeCgpO1xyXG4gICAgICAgIGNvbnN0IHNpemVfeSA9IHRoaXMuc2l6ZS5zaXplX3koKTtcclxuICAgICAgICBjb25zdCBzaXplX3ogPSB0aGlzLnNpemUuc2l6ZV96KCk7XHJcblxyXG4gICAgICAgIHRoaXMudW5jbGVhciA9IEFycmF5KHNpemVfeik7XHJcbiAgICAgICAgZm9yICh2YXIgeiA9IDA7IHogPCBzaXplX3o7IHorKykge1xyXG4gICAgICAgICAgICB0aGlzLnVuY2xlYXJbel09MDtcclxuICAgICAgICAgICAgZm9yICh2YXIgeSA9IDA7IHkgPCBzaXplX3k7IHkrKykge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgeCA9IDA7IHggPCBzaXplX3g7IHgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm1hc2tzW3pdW3ldW3hdKSB0aGlzLnVuY2xlYXJbel0rKztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgdWlkKCk6IHN0cmluZyAgICAgIHtyZXR1cm4gdGhpcy51bmlxX2lkfVxyXG4gICAgcHVibGljIGdldF9sY2tkKCk6IFRfTGNrZCB7cmV0dXJuIFRfTGNrZC5NYXplfVxyXG4gICAgcHVibGljIGdldF9uYW1lKCk6IHN0cmluZyB7cmV0dXJuIHRoaXMubmFtZX1cclxuXHJcbiAgICBwdWJsaWMgd2l0aGluKHA6IENfUG9pbnQpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zaXplLndpdGhpbihwKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLy8g44Oh44Kk44K65YaF44Gu44Kq44OW44K444Kn44Kv44OI44KE44Oi44Oz44K544K/44O8562J44Gu6YWN572uXHJcbiAgICBwdWJsaWMgYWRkX29iaihvYmo6IElfTWF6ZU9iaik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMub2Jqc1tvYmoudWlkKCldID0gb2JqO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHJtdl9vYmoob2JqOiBJX01hemVPYmopOiB2b2lkIHtcclxuICAgICAgICBkZWxldGUgdGhpcy5vYmpzW29iai51aWQoKV07XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0X29ial94eXooeDogbnVtYmVyLCB5OiBudW1iZXIsIHo6IG51bWJlcik6IElfTWF6ZU9ianxudWxsIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRfb2JqKG5ldyBDX1BvaW50KHgsIHksIHopKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRfb2JqKHA6IENfUG9pbnQpOiBJX01hemVPYmp8bnVsbCB7XHJcbiAgICAgICAgdmFyIGxheWVyID0gLTE7XHJcbiAgICAgICAgdmFyIG9iajogSV9NYXplT2JqfG51bGwgICA9IG51bGw7XHJcblxyXG4gICAgICAgIGZvciAoY29uc3QgaWQgaW4gdGhpcy5vYmpzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGV4aXN0ID0gdGhpcy5vYmpzW2lkXTtcclxuXHJcbiAgICAgICAgICAgIGlmIChleGlzdC52aWV3KCkgPT09IHVuZGVmaW5lZCkgY29udGludWU7XHJcbiAgICAgICAgICAgIGlmIChleGlzdC53aXRoaW4ocCkgJiYgZXhpc3QudmlldygpPy5sZXR0ZXIoKSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGV4aXN0LnZpZXcoKT8ubGF5ZXIoKT8/LTk5ID4gbGF5ZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICBsYXllciA9IGV4aXN0LnZpZXcoKT8ubGF5ZXIoKT8/LTk5O1xyXG4gICAgICAgICAgICAgICAgICAgIG9iaiAgID0gZXhpc3Q7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IFxyXG4gICAgICAgIHJldHVybiBvYmo7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZXhpc3Rfb2JqKHA6IENfUG9pbnQpOiBib29sZWFuIHtcclxuICAgICAgICBmb3IgKGNvbnN0IGlkIGluIHRoaXMub2Jqcykge1xyXG4gICAgICAgICAgICBjb25zdCBleGlzdCA9IHRoaXMub2Jqc1tpZF07XHJcbiAgICAgICAgICAgIGlmIChleGlzdC53aXRoaW4ocCkgJiYgZXhpc3QudmlldygpPy5sZXR0ZXIoKSAhPT0gbnVsbCkgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBUZWFt44GM5p2l44Gf44Od44Kk44Oz44OI44GM5pyq6LiP5Zyw44Gg44Gj44Gf44KJ44Gf44Gg44Gu5bqK44Gr5aSJ44GI44KLXHJcbiAgICBwdWJsaWMgY2hhbmdlX3VuZXhwX3RvX2Zsb29yKHA6IENfUG9pbnQpIHtcclxuICAgICAgICBpZiAodGhpcy5nZXRfa2luZChwKSA9PSBUX016S2luZC5VbmV4cCkge1xyXG4gICAgICAgICAgICB0aGlzLnNldF9jZWxsKHAsIFRfTXpLaW5kLkZsb29yKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gMkTjg57jg4Pjg5fjga7jg57jgrnjgq/lpJbjgZfplqLpgKNcclxuICAgIHB1YmxpYyBjbGVhcl9tYXNrX2Fyb3VuZF90aGVfdGVhbSh0ZWFtOiBDX1RlYW0pOiB2b2lkIHtcclxuICAgICAgICAvLyDnj77lnKjlnLDjgajnnJ/mqKrjga/oh6rli5XnmoTjgavopovjgYjjgotcclxuICAgICAgICB0aGlzLl9fY2xlYXJfbWFzayh0ZWFtLndhbGsoKS5nZXRfYXJvdW5kKDAsIC0xKSk7XHJcbiAgICAgICAgdGhpcy5fX2NsZWFyX21hc2sodGVhbS53YWxrKCkuZ2V0X2Fyb3VuZCgwLCAgMCkpO1xyXG4gICAgICAgIHRoaXMuX19jbGVhcl9tYXNrKHRlYW0ud2FsaygpLmdldF9hcm91bmQoMCwgIDEpKTtcclxuXHJcbiAgICAgICAgY29uc3QgZGVwdGggICA9ICA1OyAvLyAyROODnuODg+ODl+eUqOOBruWlpeihjOOBjemZkOeVjFxyXG5cclxuICAgICAgICAvLyDliY3mlrnjga7opovpgJrjgZfjgpLjg4Hjgqfjg4Pjgq/jgZfjgarjgYzjgonopovjgYjjgovjgajjgZPjgo3jga/op6PmlL7jgZnjgotcclxuICAgICAgICBmb3IgKHZhciBkID0gMTsgZCA8IGRlcHRoOyBkKyspIHtcclxuICAgICAgICAgICAgY29uc3QgZnJvbnRfcG9zID0gdGVhbS53YWxrKCkuZ2V0X2Fyb3VuZChkLCAwKVxyXG4gICAgICAgICAgICBpZiAodGhpcy5pc19tb3ZhYmxlKGZyb250X3BvcykpIHtcclxuICAgICAgICAgICAgICAgIC8vIOato+mdouOBq+manOWus+eJqeOBjOeEoeOBkeOCjOOBsOOAgeOBneOBruS4oeWBtOOCguimi+OBiOOCi1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fX2NsZWFyX21hc2sodGVhbS53YWxrKCkuZ2V0X2Fyb3VuZChkLCAtMSkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fX2NsZWFyX21hc2sodGVhbS53YWxrKCkuZ2V0X2Fyb3VuZChkLCAgMCkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fX2NsZWFyX21hc2sodGVhbS53YWxrKCkuZ2V0X2Fyb3VuZChkLCAgMSkpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8g5q2j6Z2i44GM6Zqc5a6z54mp44Gn44KC44Gd44Gu5omL5YmN44G+44Gn6KaL44GI44Gm44Gf44Gq44KJ44CB44Gd44Gu5aOB44Go5Lih5YG044Gv6KaL44GI44KLXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9fY2xlYXJfbWFzayh0ZWFtLndhbGsoKS5nZXRfYXJvdW5kKGQsIC0xKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9fY2xlYXJfbWFzayh0ZWFtLndhbGsoKS5nZXRfYXJvdW5kKGQsICAwKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9fY2xlYXJfbWFzayh0ZWFtLndhbGsoKS5nZXRfYXJvdW5kKGQsICAxKSk7XHJcbiAgICAgICAgICAgICAgICAvLyDmraPpnaLjgavpmpzlrrPnianjgYzmnInjgaPjgZ/jgonjgZ3jga7lpaXjga/opovjgYjjgarjgYTjga7jgafmjqLntKLntYLkuoZcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIF9fY2xlYXJfbWFzayhjbHJfcG9zOiBDX1BvaW50KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnNpemUud2l0aGluKGNscl9wb3MpKSByZXR1cm47XHJcblxyXG4gICAgICAgIGlmICh0aGlzLm1hc2tzW2Nscl9wb3Muel1bY2xyX3Bvcy55XVtjbHJfcG9zLnhdKSB7XHJcbiAgICAgICAgICAgIHRoaXMubWFza3NbY2xyX3Bvcy56XVtjbHJfcG9zLnldW2Nscl9wb3MueF0gPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy51bmNsZWFyW2Nscl9wb3Muel0tLTtcclxuICAgICAgICB9ICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpc19jbGVhcmVkKGNscl9wb3M6IENfUG9pbnQpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy51bmNsZWFyW2Nscl9wb3Muel0gPCAxO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpc19tYXNrZWQocDogQ19Qb2ludCk6IGJvb2xlYW4ge3JldHVybiB0aGlzLmlzX21hc2tlZF94eXoocC54LCBwLnksIHAueil9XHJcbiAgICBwdWJsaWMgaXNfbWFza2VkX3h5eih4OiBudW1iZXIsIHk6IG51bWJlciwgejogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubWFza3Nbel1beV1beF07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGlzX21vdmFibGUocDogQ19Qb2ludCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICghdGhpcy5zaXplLndpdGhpbihwKSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIHN3aXRjaCAodGhpcy5nZXRfa2luZChwKSkge1xyXG4gICAgICAgICAgICBjYXNlIFRfTXpLaW5kLkZsb29yOlxyXG4gICAgICAgICAgICBjYXNlIFRfTXpLaW5kLlVuZXhwOlxyXG4gICAgICAgICAgICBjYXNlIFRfTXpLaW5kLlN0clVwOlxyXG4gICAgICAgICAgICBjYXNlIFRfTXpLaW5kLlN0ckRuOlxyXG4gICAgICAgICAgICBjYXNlIFRfTXpLaW5kLlN0clVEOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0gICAgXHJcblxyXG4gICAgcHVibGljIGdldF94X21heCgpOiBudW1iZXIge3JldHVybiB0aGlzLnNpemUuc2l6ZV94KCk7fVxyXG4gICAgcHVibGljIGdldF95X21heCgpOiBudW1iZXIge3JldHVybiB0aGlzLnNpemUuc2l6ZV95KCk7fVxyXG4gICAgcHVibGljIGdldF96X21heCgpOiBudW1iZXIge3JldHVybiB0aGlzLnNpemUuc2l6ZV96KCk7fVxyXG4gICAgcHVibGljIGdldF9raW5kIChwOiBDX1BvaW50KTogVF9NektpbmQge1xyXG4gICAgICAgIGlmICh0aGlzLnNpemUud2l0aGluKHApKSByZXR1cm4gdGhpcy5jZWxsc1twLnpdW3AueV1bcC54XS5nZXRLaW5kKCk7XHJcbiAgICAgICAgcmV0dXJuIFRfTXpLaW5kLk5vRGVmO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldF9raW5kX3h5eiAoeDogbnVtYmVyLCB5OiBudW1iZXIsIHo6IG51bWJlcik6IFRfTXpLaW5kIHtcclxuICAgICAgICBpZiAodGhpcy5zaXplLndpdGhpbih4LCB5LCB6KSkgcmV0dXJuIHRoaXMuY2VsbHNbel1beV1beF0uZ2V0S2luZCgpO1xyXG4gICAgICAgIHJldHVybiBUX016S2luZC5Ob0RlZjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0X2NlbGxfeHl6ICh4OiBudW1iZXIsIHk6IG51bWJlciwgejogbnVtYmVyKTogQ19NYXplQ2VsbHx1bmRlZmluZWQgeyBcclxuICAgICAgICBpZiAodGhpcy5zaXplLndpdGhpbih4LCB5LCB6KSkgcmV0dXJuIHRoaXMuY2VsbHNbel1beV1beF07XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRfY2VsbCAocDogQ19Qb2ludCk6IENfTWF6ZUNlbGx8dW5kZWZpbmVkIHsgXHJcbiAgICAgICAgaWYgKHRoaXMuc2l6ZS53aXRoaW4ocCkpIHJldHVybiB0aGlzLmNlbGxzW3Auel1bcC55XVtwLnhdO1xyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0X2NlbGwocDogQ19Qb2ludCwgazogVF9NektpbmQpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5zaXplLndpdGhpbihwKSkge1xyXG4gICAgICAgICAgICB0aGlzLmNlbGxzW3Auel1bcC55XVtwLnhdID0gQ19NYXplQ2VsbC5uZXdPYmooe2tpbmQ6IGssIHBvczogcH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXRfY2VsbF94eXooeDogbnVtYmVyLCB5OiBudW1iZXIsIHo6IG51bWJlciwgazogVF9NektpbmQpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5zaXplLndpdGhpbih4LCB5LCB6KSkge1xyXG4gICAgICAgICAgICB0aGlzLmNlbGxzW3pdW3ldW3hdID0gQ19NYXplQ2VsbC5uZXdPYmooe2tpbmQ6IGssIHBvczoge3g6eCwgeTp5LCB6Onp9fSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIGNhbl9tb3ZlKHA6IENfUG9pbnQpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zaXplLndpdGhpbihwKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBjYW5fVUQocDogQ19Qb2ludCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmlzX21vdmFibGUocCk7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbnB1YmxpYyBmaWxsX2NlbGwoa2luZDogVF9NektpbmQsIGZsb29yOm51bWJlcik6IHZvaWQge1xyXG4gICAgZm9yIChsZXQgaCA9IDA7IGggPCB0aGlzLnNpemUuc2l6ZV95KCk7IGgrKylcclxuICAgIGZvciAobGV0IHcgPSAwOyB3IDwgdGhpcy5zaXplLnNpemVfeCgpOyB3KyspXHJcbiAgICAgICAgdGhpcy5zZXRfY2VsbF94eXoodywgaCwgZmxvb3IsIGtpbmQpO1xyXG4gICAgcmV0dXJuO1xyXG59XHJcblxyXG5wdWJsaWMgc2V0X2JveChraW5kOiBUX016S2luZCwgdG9wX3g6bnVtYmVyLCB0b3BfeTogbnVtYmVyLCBzaXplX3g6IG51bWJlciwgc2l6ZV95OiBudW1iZXIsIGZsb29yOiBudW1iZXIpOiB2b2lkIHtcclxuICAgIGlmICh0b3BfeCArIHNpemVfeCA+IHRoaXMuc2l6ZS5zaXplX3goKSkgc2l6ZV94ID0gdGhpcy5zaXplLnNpemVfeCgpIC0gdG9wX3ggKyAxOyBcclxuICAgIGlmICh0b3BfeSArIHNpemVfeSA+IHRoaXMuc2l6ZS5zaXplX3koKSkgc2l6ZV95ID0gdGhpcy5zaXplLnNpemVfeSgpIC0gdG9wX3kgKyAxO1xyXG4gICAgXHJcbiAgICBjb25zdCB0b3AgPSB0b3BfeTtcclxuICAgIGNvbnN0IGJ0bSA9IHRvcCAgICArIHNpemVfeSAtIDE7XHJcbiAgICBjb25zdCBsZnQgPSB0b3BfeDtcclxuICAgIGNvbnN0IHJndCA9IGxmdCAgICArIHNpemVfeCAtIDE7XHJcbiAgICBcclxuICAgIC8vIOWMl+WBtCjkuIop44Go5Y2X5YG0KOS4iynjgpLnn7Plo4HjgatcclxuICAgIGZvciAobGV0IHggPSAwOyB4IDwgc2l6ZV94OyB4KyspIHtcclxuICAgICAgICB0aGlzLnNldF9jZWxsX3h5eih4LCB0b3AsIGZsb29yLCBraW5kKTtcclxuICAgICAgICB0aGlzLnNldF9jZWxsX3h5eih4LCBidG0sIGZsb29yLCBraW5kKTtcclxuICAgIH1cclxuICAgIC8vIOadseWBtCjlj7Mp44Go6KW/5YG0KOW3pinjgpLnn7Plo4HjgatcclxuICAgIGZvciAobGV0IHkgPSAwOyB5IDwgc2l6ZV95OyB5KyspIHtcclxuICAgICAgICB0aGlzLnNldF9jZWxsX3h5eihsZnQsIHksIGZsb29yLCBraW5kKTtcclxuICAgICAgICB0aGlzLnNldF9jZWxsX3h5eihyZ3QsIHksIGZsb29yLCBraW5kKTtcclxuICAgIH1cclxuICAgIHJldHVybjtcclxufVxyXG5cclxuLy8g6ZqO5LiK44Go6ZqO5LiL44Gr6ZqO5q6144KS6Kit572u44GZ44KLXHJcbnB1YmxpYyBjcmVhdGVfc3RhaXIoZmxvb3I6bnVtYmVyKTogQ19Qb2ludERpciB7XHJcbiAgICBjb25zdCBIX3NpemVfeCA9ICh0aGlzLnNpemUuc2l6ZV94KCkgLSAxKSAvIDI7XHJcbiAgICBjb25zdCBIX3NpemVfeSA9ICh0aGlzLnNpemUuc2l6ZV95KCkgLSAxKSAvIDI7XHJcbiAgICBjb25zdCBwb3NfeCAgICA9IDIgKiBfaXJhbmQoMCwgSF9zaXplX3ggLSAxKSArIDE7XHJcbiAgICBjb25zdCBwb3NfeSAgICA9IDIgKiBfaXJhbmQoMCwgSF9zaXplX3kgLSAxKSArIDE7XHJcbiAgICBjb25zdCBwb3NfZCAgICA9IDEgKiBfaXJhbmQoMCwgVF9EaXJlY3Rpb24uTUFYKTtcclxuXHJcbiAgICAvLyDkubHmlbDjgaflvpfjgZ/luqfmqJnjgavpmo7mrrXjgpLnva7jgY9cclxuICAgIGlmIChmbG9vciA+PSAxKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZ2V0X2NlbGxfeHl6KHBvc194LCBwb3NfeSwgZmxvb3IgLSAxKT8uZ2V0S2luZCgpICE9PSBUX016S2luZC5TdHJVcCkge1xyXG4gICAgICAgICAgICB0aGlzLnNldF9jZWxsX3h5eihwb3NfeCwgcG9zX3ksIGZsb29yIC0gMSwgIFRfTXpLaW5kLlN0ckRuKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNldF9jZWxsX3h5eihwb3NfeCwgcG9zX3ksIGZsb29yIC0gMSwgIFRfTXpLaW5kLlN0clVEKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5nZXRfY2VsbF94eXoocG9zX3gsIHBvc195LCBmbG9vcik/LmdldEtpbmQoKSAhPT0gVF9NektpbmQuU3RyRG4pIHtcclxuICAgICAgICB0aGlzLnNldF9jZWxsX3h5eihwb3NfeCwgcG9zX3ksIGZsb29yLCAgVF9NektpbmQuU3RyVXApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnNldF9jZWxsX3h5eihwb3NfeCwgcG9zX3ksIGZsb29yLCAgVF9NektpbmQuU3RyVUQpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuZXcgQ19Qb2ludERpcih7eDogcG9zX3gsIHk6IHBvc195LCB6OiBmbG9vciwgZDogcG9zX2R9KTtcclxufVxyXG5cclxucHVibGljIGNyZWF0ZV9tYXplKGZsb29yOiBudW1iZXIpOiB2b2lkIHtcclxuICAgIGNvbnN0IHNpemVfeCA9IHRoaXMuc2l6ZS5zaXplX3goKTtcclxuICAgIGNvbnN0IHNpemVfeSA9IHRoaXMuc2l6ZS5zaXplX3koKTtcclxuXHJcblxyXG4gICAgLy8g44OA44Oz44K444On44Oz44GnJGZsb29y44Gn5oyH5a6a44GV44KM44Gf6ZqO44KS5pyq6LiP5Zyw44Gr44GZ44KLIFxyXG4gICAgdGhpcy5maWxsX2NlbGwoVF9NektpbmQuVW5leHAsIGZsb29yKTtcclxuXHJcbiAgICAvLyDjg4Djg7Pjgrjjg6fjg7Pjga7ovKrpg63jgpLnn7Plo4HjgavjgZnjgotcclxuICAgIHRoaXMuc2V0X2JveChUX016S2luZC5TdG9uZSwgMCwgMCwgc2l6ZV94LCBzaXplX3ksIGZsb29yKTtcclxuXHJcbiAgICAvLyDpgJrot6/jgavkuIDjgaTnva7jgY3jgavlo4HjgYzmiJDplbfjgZnjgovjg53jgqTjg7Pjg4jjgpLoqK3lrprjgZnjgotcclxuICAgIC8vIOODneOCpOODs+ODiOOBi+OCieWjgeOCkuS8uOOBsOOBmeaWueWQkeOCkuODqeODs+ODgOODoOOBq+axuuOCgeOCi1xyXG4gICAgY29uc3QgcG9pbnRzID0gbmV3IENfUG9pbnRTZXQyRCgpO1xyXG4gICAgZm9yIChsZXQgaCA9IDI7IGggPCBzaXplX3kgLSAyOyBoICs9IDIpe1xyXG4gICAgICAgIGZvciAobGV0IHcgPSAyOyB3IDwgc2l6ZV94IC0gMjsgdyArPSAyKXtcclxuICAgICAgICAgICAgY29uc3QgZGkgPSBfaXJhbmQoMCwgVF9EaXJlY3Rpb24uTUFYKTtcclxuICAgICAgICAgICAgcG9pbnRzLnB1c2gobmV3IENfUG9pbnRMaW5rMkQodywgaCwgZGkpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5Lmx5pWw44Gn44GE44GP44Gk44GL6YOo5bGL44KS5L2c44KLXHJcbiAgICBjb25zdCByb29tc19hcnJheSA9IFtdO1xyXG4gICAgY29uc3QgbnVtX29mX3Jvb20gPSBfaXJhbmQoMCwgdGhpcy5udW1fb2Zfcm9vbSk7XHJcbiAgICBmb3IgKGxldCBjbnQgPSAwOyBjbnQgPCBudW1fb2Zfcm9vbTsgY250KyspIHtcclxuICAgICAgICBjb25zdCBsZW5nX3ggPSBfaXJhbmQoMSwgIHRoaXMubWF4X3NpemVfb2Zfcm9vbSkgKiAyICsgMTtcclxuICAgICAgICBjb25zdCBsZW5nX3kgPSBfaXJhbmQoMSwgIHRoaXMubWF4X3NpemVfb2Zfcm9vbSkgKiAyICsgMTtcclxuICAgICAgICBjb25zdCByb29tX3ggPSBfaXJhbmQoMCwgKHNpemVfeCAtIGxlbmdfeCkgLyAyKSAqIDI7XHJcbiAgICAgICAgY29uc3Qgcm9vbV95ID0gX2lyYW5kKDAsIChzaXplX3kgLSBsZW5nX3kpIC8gMikgKiAyO1xyXG4gICAgICAgIHJvb21zX2FycmF5LnB1c2goe3R4OiByb29tX3gsIHR5OiByb29tX3ksIHN4OiBsZW5nX3gsIHN5OiBsZW5nX3l9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyDpg6jlsYvjga7kuK3jga7jg53jgqTjg7Pjg4jjgpLliYrpmaTjgZnjgotcclxuICAgIGZvciAoY29uc3Qgcm9vbSBvZiByb29tc19hcnJheSkge1xyXG4gICAgICAgIGZvciAobGV0IGlpID0gMDsgaWkgPCBwb2ludHMuc2V0Lmxlbmd0aDsgaWkrKykge1xyXG4gICAgICAgICAgICBjb25zdCBwID0gIHBvaW50cy5zZXRbaWldO1xyXG4gICAgICAgICAgICBpZiAocCA9PT0gdW5kZWZpbmVkKSBjb250aW51ZTtcclxuXHJcbiAgICAgICAgICAgIGlmICggICAgKHAueCA+PSByb29tLnR4KSBcclxuICAgICAgICAgICAgICAgICYmICAocC54IDw9IHJvb20udHggKyByb29tLnN4KVxyXG4gICAgICAgICAgICAgICAgJiYgIChwLnkgPj0gcm9vbS50eSlcclxuICAgICAgICAgICAgICAgICYmICAocC55IDw9IHJvb20udHkgKyByb29tLnN5KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBvaW50cy5yZW1vdmUocCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvLyDjg53jgqTjg7Pjg4jjgYvjgonlo4HjgpLmiJDplbfjgZXjgZvjgabov7fot6/jgpLkvZzjgotcclxuICAgIGZvciAoY29uc3QgcCBvZiBwb2ludHMuc2V0KSB7XHJcbiAgICAgICAgaWYgKHAgPT09IHVuZGVmaW5lZCkgY29udGludWU7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8g44Od44Kk44Oz44OI44Gu5L2N572u44Gr55+z5aOB44KS572u44GPXHJcbiAgICAgICAgdGhpcy5zZXRfY2VsbF94eXoocC54LCBwLnksIGZsb29yLCBUX016S2luZC5TdG9uZSk7XHJcblxyXG4gICAgICAgIC8vIOafseOBruadseilv+WNl+WMl+OBruOBhOOBmuOCjOOBi+OBq+OCguefs+WjgeOCkue9ruOBj1xyXG4gICAgICAgIGNvbnN0IGRpcmVjdGlvbiA9IFswLCAwLCAwLCAwXTtcclxuICAgICAgICBjb25zdCBkaSA9IENfUG9pbnRMaW5rMkQuY2FzdChwKT8uZGkgPz8gVF9EaXJlY3Rpb24uWDtcclxuICAgICAgICBpZiAoZGkgPT09IFRfRGlyZWN0aW9uLlgpIGNvbnRpbnVlO1xyXG4gICAgICAgIGRpcmVjdGlvbltkaV0gPSAxO1xyXG5cclxuICAgICAgICB0aGlzLnNldF9jZWxsX3h5eihcclxuICAgICAgICAgICAgcC54IC0gZGlyZWN0aW9uW1RfRGlyZWN0aW9uLlddICsgZGlyZWN0aW9uW1RfRGlyZWN0aW9uLkVdLCBcclxuICAgICAgICAgICAgcC55IC0gZGlyZWN0aW9uW1RfRGlyZWN0aW9uLk5dICsgZGlyZWN0aW9uW1RfRGlyZWN0aW9uLlNdLCBcclxuICAgICAgICAgICAgZmxvb3IsXHJcbiAgICAgICAgICAgIFRfTXpLaW5kLlN0b25lXHJcbiAgICAgICAgKTtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvLyDplonpjpbnqbrplpPjgYzlh7rmnaXjgabjgYTjgZ/jgonlh7rlj6PjgpLkvZzjgotcclxuICAgIC8vIOODneOCpOODs+ODiOOCkuODiOODrOODvOOCueOBl+OBpuOAgeaXouWHuuOBruODneOCpOODs+ODiOOBq+e5i+OBjOOBo+OBpuOBhOOBn+OCiemWiemOluepuumWk1xyXG4gICAgZm9yIChjb25zdCBzZXQgb2YgcG9pbnRzLnNldCkge1xyXG4gICAgICAgIGlmIChzZXQgPT09IHVuZGVmaW5lZCkgY29udGludWU7XHJcblxyXG4gICAgICAgIGNvbnN0IFt5biwgdHJhY2Vfc2V0XSA9IHRoaXMuY2hlY2tfY2xvc2Uoc2V0LngsIHNldC55LCBwb2ludHMsIG5ldyBDX1BvaW50U2V0MkQoKSk7XHJcbiAgICAgICAgaWYgKHluKSB7XHJcbiAgICAgICAgICAgIHRoaXMub3Blbl9leGl0KHRyYWNlX3NldCwgVF9NektpbmQuVW5leHAsIGZsb29yKTtcclxuICAgICAgICAgICAgaWYgKHRyYWNlX3NldCAhPT0gdW5kZWZpbmVkKSBmb3IgKGNvbnN0IHQgb2YgdHJhY2Vfc2V0LnNldCkgcG9pbnRzLnJlbW92ZSh0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm47XHJcbn1cclxuXHJcbnByb3RlY3RlZCBjaGVja19jbG9zZSh4OiBudW1iZXIsIHk6IG51bWJlciwgcG9pbnRfc2V0OiBDX1BvaW50U2V0MkQsIHRyYWNlX3NldDogQ19Qb2ludFNldDJEfHVuZGVmaW5lZCk6IFtib29sZWFuLCBDX1BvaW50U2V0MkR8dW5kZWZpbmVkXSB7XHJcbiAgICBpZiAoeCA8IDIgfHwgeSA8IDIgfHwgeCA+IHRoaXMuc2l6ZS5zaXplX3goKSAtIDIgfHwgeSA+IHRoaXMuc2l6ZS5zaXplX3koKSAtIDIpIHJldHVybiBbZmFsc2UsIHVuZGVmaW5lZF07XHJcblxyXG4gICAgaWYgKHBvaW50X3NldCA9PT0gdW5kZWZpbmVkKSByZXR1cm4gW2ZhbHNlLCB1bmRlZmluZWRdO1xyXG4gICAgaWYgKHBvaW50X3NldD8uaXNfZXhpc3QoeCwgeSkgPT09IGZhbHNlKSByZXR1cm4gW2ZhbHNlLCB1bmRlZmluZWRdO1xyXG5cclxuICAgIGlmICh0cmFjZV9zZXQgIT09IHVuZGVmaW5lZCAmJiB0cmFjZV9zZXQ/LmlzX2V4aXN0KHgsIHkpID09PSB0cnVlKSAgcmV0dXJuIFt0cnVlLCAgdHJhY2Vfc2V0XTtcclxuXHJcbiAgICBjb25zdCBwID0gcG9pbnRfc2V0LmdldF9wb2ludCh4LCB5KTtcclxuICAgIHRyYWNlX3NldCA/Pz0gbmV3IENfUG9pbnRTZXQyRCgpO1xyXG4gICAgdHJhY2Vfc2V0Py5wdXNoKG5ldyBDX1BvaW50TGluazJEKHgsIHksIENfUG9pbnRMaW5rMkQuY2FzdChwKT8uZGkpKTtcclxuXHJcbiAgICBsZXQgbmV4dF94OiBudW1iZXIgPSAwLCBuZXh0X3k6IG51bWJlciA9IDA7XHJcbiAgICBzd2l0Y2ggKENfUG9pbnRMaW5rMkQuY2FzdChwKT8uZGkpIHtcclxuICAgICAgICBjYXNlIFRfRGlyZWN0aW9uLk46ICAvLyDljJdcclxuICAgICAgICAgICAgbmV4dF94ID0geDtcclxuICAgICAgICAgICAgbmV4dF95ID0geSAtIDI7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgVF9EaXJlY3Rpb24uRTogIC8vIOadsVxyXG4gICAgICAgICAgICBuZXh0X3ggPSB4ICsgMjtcclxuICAgICAgICAgICAgbmV4dF95ID0geTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBUX0RpcmVjdGlvbi5TOiAgLy8g5Y2XXHJcbiAgICAgICAgICAgIG5leHRfeCA9IHg7XHJcbiAgICAgICAgICAgIG5leHRfeSA9IHkgKyAyO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFRfRGlyZWN0aW9uLlc6ICAvLyDopb9cclxuICAgICAgICAgICAgbmV4dF94ID0geCAtIDI7XHJcbiAgICAgICAgICAgIG5leHRfeSA9IHk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5jaGVja19jbG9zZShuZXh0X3gsIG5leHRfeSwgcG9pbnRfc2V0LCB0cmFjZV9zZXQpO1xyXG59XHJcblxyXG5wcm90ZWN0ZWQgb3Blbl9leGl0KHA6IENfUG9pbnRTZXQyRHx1bmRlZmluZWQsIGtpbmQ6IFRfTXpLaW5kLCBmbG9vcjogbnVtYmVyKTogdm9pZCB7XHJcbiAgICBpZiAocCA9PT0gdW5kZWZpbmVkKSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgY250ID0gX2lyYW5kKDAsIHAuc2V0Lmxlbmd0aCAtIDEpO1xyXG4gICAgY29uc3QgcHAgID0gIHAuc2V0W2NudF07XHJcblxyXG4gICAgbGV0IGRpcmVjdGlvbiA9IFswLCAwLCAwLCAwXTtcclxuICAgIGNvbnN0IGRpID0gQ19Qb2ludExpbmsyRC5jYXN0KHBwKT8uZGkgPz8gVF9EaXJlY3Rpb24uTlxyXG4gICAgZGlyZWN0aW9uW2RpXSA9IDE7XHJcblxyXG4gICAgdGhpcy5zZXRfY2VsbF94eXooXHJcbiAgICAgICAgcHAueCAtIGRpcmVjdGlvbltUX0RpcmVjdGlvbi5XXSArIGRpcmVjdGlvbltUX0RpcmVjdGlvbi5FXSwgXHJcbiAgICAgICAgcHAueSAtIGRpcmVjdGlvbltUX0RpcmVjdGlvbi5OXSArIGRpcmVjdGlvbltUX0RpcmVjdGlvbi5TXSwgXHJcbiAgICAgICAgZmxvb3IsXHJcbiAgICAgICAga2luZCBcclxuICAgICk7XHJcbiAgICByZXR1cm47XHJcbn1cclxuXHJcbi8qXHJcbnB1YmxpYyBzdGF0aWMgZnJvbV9vYmpfdG9fc3RyaW5nKG9hOiBDX01hemUpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KG9hLCBudWxsLCBcIlxcdFwiKTtcclxufVxyXG5wdWJsaWMgc3RhdGljIGZyb21fb2JqQXJyYXlfdG9fc3RyaW5nKG9hYToge1t1aWQ6IHN0cmluZ106IENfTWF6ZX0pOiBzdHJpbmcge1xyXG4gICAgY29uc3Qgb2EgPSBbXSBhcyBDX01hemVbXTtcclxuICAgIGZvciAoY29uc3QgaWkgaW4gb2FhKSBvYS5wdXNoKG9hYVtpaV0pO1xyXG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KG9hLCBudWxsLCBcIlxcdFwiKTtcclxufVxyXG5wdWJsaWMgc3RhdGljIGZyb21fc3RyaW5nX3RvX29iaih0eHQ6IHN0cmluZyk6IENfTWF6ZSB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IGogICA9IEpTT04ucGFyc2UodHh0KSBhcyBKU09OX01hemVbXTtcclxuICAgICAgICByZXR1cm4gbmV3IENfTWF6ZSgpLmRlY29kZShqKTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIHJldHVybiBuZXcgQ19NYXplKCk7XHJcbiAgICB9O1xyXG59XHJcbnB1YmxpYyBzdGF0aWMgZnJvbV9zdHJpbmdfdG9fb2JqQXJyYXkodHh0OiBzdHJpbmcpOiB7W3VpZDogc3RyaW5nXTogQ19NYXplfSB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IGogICA9IEpTT04ucGFyc2UodHh0KSBhcyBKU09OX01hemVbXTtcclxuICAgICAgICBjb25zdCBtcGEgPSB7fSBhcyB7W2lkOiBzdHJpbmddOiBDX01hemV9O1xyXG4gICAgICAgIGZvciAoY29uc3Qgamogb2Ygaikge1xyXG4gICAgICAgICAgICBjb25zdCBhYWEgPSBuZXcgQ19NYXplKCkuZGVjb2RlKGpqKTtcclxuICAgICAgICAgICAgbXBhW2FhYS51aWQoKV0gPSBhYWE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBtcGE7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICByZXR1cm4ge307XHJcbiAgICB9O1xyXG59XHJcbiovXHJcblxyXG4gICAgcHVibGljIHRvX2xldHRlcihwOiBDX1BvaW50KTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jZWxsc1twLnpdW3AueV1bcC54XS50b19sZXR0ZXIoKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyB0b19zdHJpbmcoZmxvb3I6IG51bWJlciA9IDAsIGRlYnVnX21vZGU6IGJvb2xlYW4gPSBmYWxzZSk6IHN0cmluZyB7XHJcbiAgICAgICAgY29uc3Qgc2l6ZV94ID0gdGhpcy5zaXplLnNpemVfeCgpO1xyXG4gICAgICAgIGNvbnN0IHNpemVfeSA9IHRoaXMuc2l6ZS5zaXplX3koKTtcclxuXHJcbiAgICAgICAgdmFyIHJldF9zdHI6IHN0cmluZyA9ICcnO1xyXG4gICAgICAgIGZvciAodmFyIHkgPSAwOyB5IDwgc2l6ZV95OyB5KyspIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgeCA9IDA7IHggPCBzaXplX3g7IHgrKykge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgb2JqID0gdGhpcy5nZXRfb2JqX3h5eih4LCB5LCBmbG9vcik7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWRlYnVnX21vZGUgJiYgdGhpcy5tYXNrc1tmbG9vcl1beV1beF0pIHtcclxuICAgICAgICAgICAgICAgICAgICByZXRfc3RyICs9ICfvvLgnO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBvYmpfYyA9IG9iaj8udmlldygpPy5sZXR0ZXIoKSA/PyBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvYmogPT09IG51bGwgfHwgb2JqX2MgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0X3N0ciArPSB0aGlzLmNlbGxzW2Zsb29yXVt5XVt4XS50b19sZXR0ZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXRfc3RyICs9IG9ial9jO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXRfc3RyICs9IFwiXFxuXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXRfc3RyO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGVuY29kZSgpOiBKU09OX01hemUge1xyXG4gICAgICAgIGNvbnN0IHNpemVfeCA9IHRoaXMuc2l6ZS5zaXplX3goKTtcclxuICAgICAgICBjb25zdCBzaXplX3kgPSB0aGlzLnNpemUuc2l6ZV95KCk7XHJcbiAgICAgICAgY29uc3Qgc2l6ZV96ID0gdGhpcy5zaXplLnNpemVfeigpO1xyXG5cclxuICAgICAgICB2YXIgel9hcnJheTogc3RyaW5nW10gPSBbXTtcclxuICAgICAgICBmb3IgKHZhciB6ID0gMDsgeiA8IHNpemVfejsgeisrKSB7XHJcbiAgICAgICAgICAgIHZhciB5X2FycmF5OiBzdHJpbmdbXSA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKHZhciB5ID0gMDsgeSA8IHNpemVfeTsgeSsrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgeF9hcnJheTogc3RyaW5nW10gPSBbXTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIHggPSAwOyB4IDwgc2l6ZV94OyB4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICB4X2FycmF5LnB1c2godGhpcy5jZWxsc1t6XVt5XVt4XS5lbmNvZGUoKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB5X2FycmF5LnB1c2goeF9hcnJheS5qb2luKCdYJykpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHpfYXJyYXkucHVzaCh5X2FycmF5LmpvaW4oJ1knKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IG1hemVfc3RyID0gel9hcnJheS5qb2luKCdaJyk7XHJcblxyXG4gICAgICAgIHZhciB6X2FycmF5OiBzdHJpbmdbXSA9IFtdO1xyXG4gICAgICAgIGZvciAodmFyIHogPSAwOyB6IDwgc2l6ZV96OyB6KyspIHtcclxuICAgICAgICAgICAgdmFyIHlfYXJyYXk6IHN0cmluZ1tdID0gW107XHJcbiAgICAgICAgICAgIGZvciAodmFyIHkgPSAwOyB5IDwgc2l6ZV95OyB5KyspIHtcclxuICAgICAgICAgICAgICAgIHZhciB4X2FycmF5OiBzdHJpbmdbXSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgeCA9IDA7IHggPCBzaXplX3g7IHgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHhfYXJyYXkucHVzaCh0aGlzLm1hc2tzW3pdW3ldW3hdID8gJzEnIDogJzAnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHlfYXJyYXkucHVzaCh4X2FycmF5LmpvaW4oJ1gnKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgel9hcnJheS5wdXNoKHlfYXJyYXkuam9pbignWScpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgbWFza19zdHIgPSB6X2FycmF5LmpvaW4oJ1onKTtcclxuXHJcbiAgICAgICAgbGV0IG9ianMgPSBbXTtcclxuICAgICAgICBmb3IgKGNvbnN0IGlpIGluIHRoaXMub2Jqcykgb2Jqcy5wdXNoKHRoaXMub2Jqc1tpaV0uZW5jb2RlKCkpO1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBpZDogICAgICB0aGlzLm1hemVfaWQsXHJcbiAgICAgICAgICAgIHVuaXFfaWQ6IHRoaXMudW5pcV9pZCxcclxuICAgICAgICAgICAgc2F2ZV9pZDogdGhpcy5zYXZlX2lkLFxyXG4gICAgICAgICAgICBmbG9vcjogICB0aGlzLmZsb29yLFxyXG4gICAgICAgICAgICBuYW1lOiAgICB0aGlzLm5hbWUsXHJcbiAgICAgICAgICAgIG9ianM6ICAgIG9ianMsXHJcbiAgICAgICAgICAgIHNpemVfeDogIHRoaXMuc2l6ZS5zaXplX3goKSxcclxuICAgICAgICAgICAgc2l6ZV95OiAgdGhpcy5zaXplLnNpemVfeSgpLFxyXG4gICAgICAgICAgICBzaXplX3o6ICB0aGlzLnNpemUuc2l6ZV96KCksXHJcbiAgICAgICAgICAgIG1hemU6ICAgIG1hemVfc3RyLFxyXG4gICAgICAgICAgICBtYXNrOiAgICBtYXNrX3N0cixcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZGVjb2RlKGE6IEpTT05fTWF6ZXx1bmRlZmluZWQpOiBDX01hemUge1xyXG4gICAgICAgIGlmIChhID09PSB1bmRlZmluZWQpIHJldHVybiB0aGlzO1xyXG5cclxuICAgICAgICBpZiAoYS5pZCAgICAgICE9PSB1bmRlZmluZWQpIHRoaXMubWF6ZV9pZCA9IGEuaWQ7XHJcbiAgICAgICAgaWYgKGEudW5pcV9pZCAhPT0gdW5kZWZpbmVkKSB0aGlzLnVuaXFfaWQgPSBhLnVuaXFfaWQ7XHJcbiAgICAgICAgaWYgKGEuc2F2ZV9pZCAhPT0gdW5kZWZpbmVkKSB0aGlzLnNhdmVfaWQgPSBhLnNhdmVfaWQ7XHJcbiAgICAgICAgaWYgKGEuZmxvb3IgICAhPT0gdW5kZWZpbmVkKSB0aGlzLmZsb29yICAgPSBhLmZsb29yO1xyXG4gICAgICAgIGlmIChhLm5hbWUgICAgIT09IHVuZGVmaW5lZCkgdGhpcy5uYW1lICAgID0gYS5uYW1lO1xyXG5cclxuICAgICAgICBpZiAoYS5vYmpzICAgICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5vYmpzID0ge307XHJcbiAgICAgICAgICAgIGZvciAoY29uc3QganNvbl9vYmogb2YgYS5vYmpzKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdfb2JqID0gQ19NYXplT2JqLm5ld09iaihqc29uX29iaik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9ianNbbmV3X29iai51aWQoKV0gPSBuZXdfb2JqO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoYS5zaXplX3ggIT09IHVuZGVmaW5lZCAmJiBhLnNpemVfeSAhPT0gdW5kZWZpbmVkICYmIGEuc2l6ZV96ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5zaXplICA9IG5ldyBDX1JhbmdlKFxyXG4gICAgICAgICAgICAgICAgbmV3IENfUG9pbnQoMCwgMCwgMCksIFxyXG4gICAgICAgICAgICAgICAgbmV3IENfUG9pbnQoYS5zaXplX3ggLSAxLCBhLnNpemVfeSAtIDEsIGEuc2l6ZV96IC0gMSlcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIHRoaXMuY2VsbHMgICA9IHRoaXMuX19pbml0X21hemUoVF9NektpbmQuU3RvbmUpO1xyXG4gICAgICAgICAgICB0aGlzLm1hc2tzICAgPSB0aGlzLl9faW5pdF9tYXNrKHRydWUpO1xyXG4gICAgICAgICAgICB0aGlzLl9faW5pdF91bmNsZWFyKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBzaXplX3ggPSB0aGlzLnNpemUuc2l6ZV94KCk7XHJcbiAgICAgICAgY29uc3Qgc2l6ZV95ID0gdGhpcy5zaXplLnNpemVfeSgpO1xyXG4gICAgICAgIGNvbnN0IHNpemVfeiA9IHRoaXMuc2l6ZS5zaXplX3ooKTtcclxuXHJcblxyXG4gICAgICAgIGlmIChhLm1hemUgIT09IHVuZGVmaW5lZCkge1xyXG4vKlxyXG4gICAgICAgICAgICBmb3IgKHZhciB6ID0gMDsgeiA8IHNpemVfejsgeisrKVxyXG4gICAgICAgICAgICBmb3IgKHZhciB5ID0gMDsgeSA8IHNpemVfeTsgeSsrKVxyXG4gICAgICAgICAgICBmb3IgKHZhciB4ID0gMDsgeCA8IHNpemVfeDsgeCsrKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNlbGxzW3pdW3ldW3hdLnNldChUX016S2luZC5TdG9uZSk7XHJcbiAgICAgICAgICAgIH1cclxuKi9cclxuICAgICAgICAgICAgY29uc3Qgel9hcnJheTogc3RyaW5nW10gPSBhLm1hemUuc3BsaXQoJ1onKTtcclxuICAgICAgICAgICAgY29uc3Qgel9tYXggPSBfbWluKFtzaXplX3osIHpfYXJyYXkubGVuZ3RoXSk7XHJcbiAgICAgICAgICAgIGZvciAodmFyIHogPSAwOyB6IDwgel9tYXg7IHorKykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgeV9hcnJheTogc3RyaW5nW10gPSB6X2FycmF5W3pdLnNwbGl0KCdZJyk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB5X21heCA9ICBfbWluKFtzaXplX3ksIHlfYXJyYXkubGVuZ3RoXSk7IFxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgeSA9IDA7IHkgPCB5X21heDsgeSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgeF9hcnJheTogc3RyaW5nW10gPSB5X2FycmF5W3ldLnNwbGl0KCdYJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgeF9tYXggPSAgX21pbihbc2l6ZV94LCB4X2FycmF5Lmxlbmd0aF0pOyBcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciB4ID0gMDsgeCA8IHhfbWF4OyB4KyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGtpbmQgPSBwYXJzZUludCh4X2FycmF5W3hdLCAxNik7IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNlbGxzW3pdW3ldW3hdID0gQ19NYXplQ2VsbC5uZXdPYmooe2tpbmQ6IGtpbmQsIHBvczoge3g6eCwgeTp5LCB6Onp9fSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ICBcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGEubWFzayAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX19pbml0X21hc2sodHJ1ZSk7XHJcbiAgICAgICAgICAgIGNvbnN0IHpfYXJyYXk6IHN0cmluZ1tdID0gYS5tYXNrLnNwbGl0KCdaJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IHpfbWF4ID0gX21pbihbc2l6ZV96LCB6X2FycmF5Lmxlbmd0aF0pO1xyXG4gICAgICAgICAgICBmb3IgKHZhciB6ID0gMDsgeiA8IHpfbWF4OyB6KyspIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHlfYXJyYXk6IHN0cmluZ1tdID0gel9hcnJheVt6XS5zcGxpdCgnWScpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgeV9tYXggPSAgX21pbihbc2l6ZV95LCB5X2FycmF5Lmxlbmd0aF0pOyBcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIHkgPSAwOyB5IDwgeV9tYXg7IHkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHhfYXJyYXk6IHN0cmluZ1tdID0geV9hcnJheVt5XS5zcGxpdCgnWCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHhfbWF4ID0gIF9taW4oW3NpemVfeCwgeF9hcnJheS5sZW5ndGhdKTsgXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgeCA9IDA7IHggPCB4X21heDsgeCsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh4X2FycmF5W3hdICE9PSAnMCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWFza3Nbel1beV1beF0gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXNrc1t6XVt5XVt4XSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX19pbml0X3VuY2xlYXIoKTsgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc3RhdGljIGVuY29kZV9hbGwoYWxsX21hemU6IENfTWF6ZVtdKTogSlNPTl9NYXplW10ge1xyXG4gICAgICAgIGNvbnN0IGFsbF9tYXplX2RhdGE6IEpTT05fTWF6ZVtdID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgbWF6ZSBvZiBhbGxfbWF6ZSkge1xyXG4gICAgICAgICAgICBhbGxfbWF6ZV9kYXRhLnB1c2gobWF6ZS5lbmNvZGUoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhbGxfbWF6ZV9kYXRhO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHN0YXRpYyBkZWNvZGVfYWxsKGFsbF9tYXplX2RhdGE6IEpTT05fTWF6ZVtdKTogQ19NYXplW10ge1xyXG4gICAgICAgIGNvbnN0IGFsbF9tYXplOiBDX01hemVbXSA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IG1hemVfZGF0YSBvZiBhbGxfbWF6ZV9kYXRhKSB7XHJcbiAgICAgICAgICAgIGFsbF9tYXplLnB1c2goKG5ldyBDX01hemUoe30pKS5kZWNvZGUobWF6ZV9kYXRhKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhbGxfbWF6ZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIGFsZXJ0KCk6IHZvaWQge1xyXG4gICAgICAgIGFsZXJ0KFwiTWF6ZSBJbmZvOlwiXHJcbiAgICAgICAgICAgICsgXCJcXG5tYXplIGlkIDpcIiArICh0aGlzLm1hemVfaWQgPz8gJz8nKVxyXG4gICAgICAgICAgICArIFwiXFxuZmxvb3I6IFwiICAgKyAodGhpcy5mbG9vciAgID8/ICc/JylcclxuICAgICAgICAgICAgKyBcIlxcbnVuaXEgaWQgOlwiICsgKHRoaXMudW5pcV9pZCA/PyAnPycpXHJcbiAgICAgICAgICAgICsgXCJcXG5zYXZlIGlkIDpcIiArICh0aGlzLnNhdmVfaWQgPz8gJz8nKVxyXG4gICAgICAgICAgICArIFwiXFxubmFtZTogICBcIiAgKyAodGhpcy5uYW1lICAgID8/ICc/JylcclxuICAgICAgICAgICAgKyBcIlxcbnNpemVfeDogXCIgICsgKHRoaXMuc2l6ZS5zaXplX3goKSA/PyAnPycpXHJcbiAgICAgICAgICAgICsgXCJcXG5zaXplX3k6IFwiICArICh0aGlzLnNpemUuc2l6ZV95KCkgPz8gJz8nKVxyXG4gICAgICAgICAgICArIFwiXFxuc2l6ZV96OiBcIiAgKyAodGhpcy5zaXplLnNpemVfeigpID8/ICc/JylcclxuICAgICAgICAgICAgKyBcIlxcblwiXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBhbGVydF9tYXplKGZsb29yOiBudW1iZXIgPSAwKTogdm9pZCB7XHJcbiAgICAgICAgYWxlcnQoXCJNYXplIE1hcDpcIlxyXG4gICAgICAgICAgICArIFwibWF6ZTpcXG5cIiAgICAgKyAodGhpcy50b19zdHJpbmcoZmxvb3IsIHRydWUpICA/PyAnPycpXHJcbiAgICAgICAgICAgICsgXCJcXG5cIlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgYWxlcnRfbWFzayhmbG9vcjogbnVtYmVyID0gMCk6IHZvaWQge1xyXG4gICAgICAgIGFsZXJ0KFwiTWFzayBNYXA6XCJcclxuICAgICAgICAgICAgKyBcIm1hc2s6XFxuXCIgICAgICsgKHRoaXMudG9fc3RyaW5nKGZsb29yLCBmYWxzZSkgPz8gJz8nKVxyXG4gICAgICAgICAgICArIFwiXFxuXCJcclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5cclxuaW1wb3J0IHsgX2dldF91dWlkIH0gZnJvbSBcIi4uL2RfdXRsL0ZfUmFuZFwiO1xyXG5pbXBvcnQgeyBUX016S2luZCB9ICBmcm9tIFwiLi9UX016S2luZFwiO1xyXG5pbXBvcnQgeyBKU09OX0FueSB9ICBmcm9tIFwiLi9DX1NhdmVJbmZvXCI7XHJcbmltcG9ydCB7IENfTWF6ZU9iaiwgSV9NYXplT2JqLCBKU09OX01hemVPYmogfSBmcm9tIFwiLi9DX01hemVPYmpcIjtcclxuaW1wb3J0IHsgVF9XYWxsIH0gICAgZnJvbSAnLi9DX1dhbGwnO1xyXG5cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSlNPTl9NYXplQ2VsbCBleHRlbmRzIEpTT05fQW55IHtcclxuICAgIGtpbmQ/OiBUX016S2luZFxyXG4gICAgb2JqPzogIEpTT05fTWF6ZU9iaixcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIENfTWF6ZUNlbGwgIHtcclxuICAgIHByb3RlY3RlZCBraW5kOiAgIFRfTXpLaW5kO1xyXG4gICAgcHJvdGVjdGVkIG15X29iajogSV9NYXplT2JqO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgbmV3T2JqKGo6IEpTT05fTWF6ZUNlbGwpOiBDX01hemVDZWxsIHtcclxuICAgICAgICBzd2l0Y2ggKGoua2luZCkge1xyXG4gICAgICAgICAgICBjYXNlIFRfTXpLaW5kLk5vRGVmOiByZXR1cm4gbmV3IENfTWF6ZUNlbGxOb0RlZihqKTsgXHJcbiAgICAgICAgICAgIGNhc2UgVF9NektpbmQuVW5rd246IHJldHVybiBuZXcgQ19NYXplQ2VsbFVua3duKGopOyBcclxuICAgICAgICAgICAgY2FzZSBUX016S2luZC5FbXB0eTogcmV0dXJuIG5ldyBDX01hemVDZWxsRW1wdHkoaik7IFxyXG4gICAgICAgICAgICBjYXNlIFRfTXpLaW5kLkZsb29yOiByZXR1cm4gbmV3IENfTWF6ZUNlbGxGbG9vcihqKTtcclxuICAgICAgICAgICAgY2FzZSBUX016S2luZC5VbmV4cDogcmV0dXJuIG5ldyBDX01hemVDZWxsVW5leHAoaik7XHJcbiAgICAgICAgICAgIGNhc2UgVF9NektpbmQuU3RvbmU6IHJldHVybiBuZXcgQ19NYXplQ2VsbFN0b25lKGopO1xyXG4gICAgICAgICAgICBjYXNlIFRfTXpLaW5kLlN0clVwOiByZXR1cm4gbmV3IENfTWF6ZUNlbGxTdHJVcChqKTtcclxuICAgICAgICAgICAgY2FzZSBUX016S2luZC5TdHJEbjogcmV0dXJuIG5ldyBDX01hemVDZWxsU3RyRG4oaik7IFxyXG4gICAgICAgICAgICBjYXNlIFRfTXpLaW5kLlN0clVEOiByZXR1cm4gbmV3IENfTWF6ZUNlbGxTdHJVRChqKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5ldyBDX01hemVDZWxsTm9EZWYoaik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKGo6IEpTT05fTWF6ZUNlbGwpIHtcclxuICAgICAgICBqLm9iaiA/Pz0ge307XHJcbiAgICAgICAgai5vYmouY2xuYW1lID8/PSB0aGlzLmNvbnN0cnVjdG9yLm5hbWU7XHJcblxyXG4gICAgICAgIHRoaXMua2luZCAgID0gai5raW5kID8/IFRfTXpLaW5kLk5vRGVmO1xyXG4gICAgICAgIHRoaXMubXlfb2JqID0gQ19NYXplT2JqLm5ld09iaihqLm9iaik7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0T2JqKCk6ICBJX01hemVPYmoge3JldHVybiB0aGlzLm15X29ian1cclxuICAgIHB1YmxpYyBnZXRLaW5kKCk6IFRfTXpLaW5kIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5raW5kO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB0b19sZXR0ZXIoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5teV9vYmoudmlldygpPy5sZXR0ZXIoKSA/PyAn77y4JztcclxuICAgIH1cclxuICAgIHB1YmxpYyBzdGF0aWMgZnJvbV9sZXR0ZXIobGV0dGVyOiBzdHJpbmcpOiBudW1iZXIge1xyXG4gICAgICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKFRfTXpLaW5kKSkge1xyXG4gICAgICAgICAgICBpZiAobGV0dGVyID09PSBrZXkpIHJldHVybiBUX016S2luZFtrZXldO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gVF9NektpbmQuTm9EZWY7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRyb3czRChmcm90OiBUX1dhbGwsIGJhY2s6IFRfV2FsbCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubXlfb2JqLnZpZXcoKT8uZHJvdzNEKGZyb3QsIGJhY2spO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBlbmNvZGUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5raW5kLnRvU3RyaW5nKDE2KS5wYWRTdGFydCgyLFwiMFwiKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzdGF0aWMgZGVjb2RlKHN0cjogc3RyaW5nLCBqPzogSlNPTl9NYXplQ2VsbCk6IENfTWF6ZUNlbGx8dW5kZWZpbmVkIHtcclxuICAgICAgICAgY29uc3Qga2luZCA9IHBhcnNlSW50KHN0ciwgMTYpIGFzIFRfTXpLaW5kO1xyXG4gICAgICAgICByZXR1cm4gQ19NYXplQ2VsbC5uZXdPYmooe2tpbmQ6IGtpbmQsIHBvczogaj8ucG9zfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIENfTWF6ZUNlbGxOb0RlZiBleHRlbmRzIENfTWF6ZUNlbGwge1xyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKGo/OiBKU09OX01hemVDZWxsfHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGogPz89IHtraW5kOiBUX016S2luZC5Ob0RlZn07XHJcbiAgICAgICAgai5vYmogPz89IHt9O1xyXG5cclxuICAgICAgICBqLm9iai5jYW5fdGhyID0gJzAnO1xyXG4gICAgICAgIGoub2JqLnBvcyAgICAgPSB7eDpqLngsIHk6ai55LCB6Omouen07XHJcbiAgICAgICAgai5vYmoudmlldyAgICA9ICB7XHJcbiAgICAgICAgICAgIGxheWVyOiAwLCBsZXR0ZXI6ICfnlpEnLCBcclxuICAgICAgICAgICAgc2hvdzNEOiAgJzAnLFxyXG4gICAgICAgICAgICBwYWRfdDogMC4wLCBwYWRfZDogMC4wLCBwYWRfczogMC4wLFxyXG4gICAgICAgICAgICBjb2xfZjogJycsIGNvbF9iOiAnJywgY29sX3M6ICcnLCBjb2xfdDogJycsIGNvbF9kOiAnJywgXHJcbiAgICAgICAgICAgIGNvbF9sOiAnJywgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN1cGVyKGopO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBDX01hemVDZWxsVW5rd24gZXh0ZW5kcyBDX01hemVDZWxsIHtcclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihqPzogSlNPTl9NYXplQ2VsbHx1bmRlZmluZWQpIHtcclxuICAgICAgICBqID8/PSB7a2luZDogVF9NektpbmQuVW5rd259O1xyXG4gICAgICAgIGoub2JqID8/PSB7fTtcclxuXHJcbiAgICAgICAgai5vYmouY2FuX3RociA9ICcwJztcclxuICAgICAgICBqLm9iai5wb3MgICAgID0ge3g6ai54LCB5OmoueSwgejpqLnp9O1xyXG4gICAgICAgIGoub2JqLnZpZXcgICAgPSAge1xyXG4gICAgICAgICAgICBsYXllcjogMCwgbGV0dGVyOiAn6KyOJywgXHJcbiAgICAgICAgICAgIHNob3czRDogICcwJyxcclxuICAgICAgICAgICAgcGFkX3Q6IDAuMCwgcGFkX2Q6IDAuMCwgcGFkX3M6IDAuMCxcclxuICAgICAgICAgICAgY29sX2Y6ICcnLCBjb2xfYjogJycsIGNvbF9zOiAnJywgY29sX3Q6ICcnLCBjb2xfZDogJycsIFxyXG4gICAgICAgICAgICBjb2xfbDogJycsIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgc3VwZXIoaik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIENfTWF6ZUNlbGxFbXB0eSBleHRlbmRzIENfTWF6ZUNlbGwge1xyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKGo/OiBKU09OX01hemVDZWxsfHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGogPz89IHtraW5kOiBUX016S2luZC5FbXB0eX07XHJcbiAgICAgICAgai5vYmogPz89IHt9O1xyXG5cclxuICAgICAgICBqLm9iai5jYW5fdGhyID0gJzEnO1xyXG4gICAgICAgIGoub2JqLnBvcyAgICAgPSB7eDpqLngsIHk6ai55LCB6Omouen07XHJcbiAgICAgICAgai5vYmoudmlldyAgICA9ICB7XHJcbiAgICAgICAgICAgIGxheWVyOiAwLCBsZXR0ZXI6ICfnhKEnLCBcclxuICAgICAgICAgICAgc2hvdzNEOiAgJzAnLFxyXG4gICAgICAgICAgICBwYWRfdDogMC4wLCBwYWRfZDogMC4wLCBwYWRfczogMC4wLFxyXG4gICAgICAgICAgICBjb2xfZjogJycsIGNvbF9iOiAnJywgY29sX3M6ICcnLCBjb2xfdDogJycsIGNvbF9kOiAnJywgXHJcbiAgICAgICAgICAgIGNvbF9sOiAnJywgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBzdXBlcihqKTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgQ19NYXplQ2VsbEZsb29yIGV4dGVuZHMgQ19NYXplQ2VsbCB7XHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3Ioaj86IEpTT05fTWF6ZUNlbGx8dW5kZWZpbmVkKSB7XHJcbiAgICAgICAgaiA/Pz0ge2tpbmQ6IFRfTXpLaW5kLkZsb29yfTtcclxuICAgICAgICBqLm9iaiA/Pz0ge307XHJcblxyXG4gICAgICAgIGoub2JqLmNhbl90aHIgPSAnMSc7XHJcbiAgICAgICAgai5vYmoucG9zICAgICA9IHt4OmoueCwgeTpqLnksIHo6ai56fTtcclxuICAgICAgICBqLm9iai52aWV3ICAgID0gIHtcclxuICAgICAgICAgICAgbGF5ZXI6IDAsIGxldHRlcjogJ+OAgCcsIFxyXG4gICAgICAgICAgICBzaG93M0Q6ICAnMScsXHJcbiAgICAgICAgICAgIHBhZF90OiAwLjAsIHBhZF9kOiAwLjAsIHBhZF9zOiAwLjAsXHJcbiAgICAgICAgICAgIGNvbF9mOiAnJywgY29sX2I6ICcnLCBjb2xfczogJycsIGNvbF90OiAnIzY2NjZmZicsIGNvbF9kOiAnJywgXHJcbiAgICAgICAgICAgIGNvbF9sOiAnIzk5OTlmZicsIFxyXG4gICAgICAgIH1cclxuICAgICAgICBzdXBlcihqKTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgQ19NYXplQ2VsbFVuZXhwIGV4dGVuZHMgQ19NYXplQ2VsbCB7XHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3Ioaj86IEpTT05fTWF6ZUNlbGx8dW5kZWZpbmVkKSB7XHJcbiAgICAgICAgaiA/Pz0ge2tpbmQ6IFRfTXpLaW5kLlVuZXhwfTtcclxuICAgICAgICBqLm9iaiA/Pz0ge307XHJcblxyXG4gICAgICAgIGoub2JqLmNhbl90aHIgPSAnMSc7XHJcbiAgICAgICAgai5vYmoucG9zICAgICA9IHt4OmoueCwgeTpqLnksIHo6ai56fTtcclxuICAgICAgICBqLm9iai52aWV3ICAgID0gIHtcclxuICAgICAgICAgICAgbGF5ZXI6IDAsIGxldHRlcjogJ+ODuycsIFxyXG4gICAgICAgICAgICBzaG93M0Q6ICAnMScsXHJcbiAgICAgICAgICAgIHBhZF90OiAwLjAsIHBhZF9kOiAwLjAsIHBhZF9zOiAwLjAsXHJcbiAgICAgICAgICAgIGNvbF9mOiAnJywgY29sX2I6ICcnLCBjb2xfczogJycsIGNvbF90OiAnIzY2ZmZmZicsIGNvbF9kOiAnJywgXHJcbiAgICAgICAgICAgIGNvbF9sOiAnIzk5OTlmZicsIFxyXG4gICAgICAgIH1cclxuICAgICAgICBzdXBlcihqKTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgQ19NYXplQ2VsbFN0b25lIGV4dGVuZHMgQ19NYXplQ2VsbCB7XHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3Ioaj86IEpTT05fTWF6ZUNlbGx8dW5kZWZpbmVkKSB7XHJcbiAgICAgICAgaiA/Pz0ge2tpbmQ6IFRfTXpLaW5kLlN0b25lfTtcclxuICAgICAgICBqLm9iaiA/Pz0ge307XHJcblxyXG4gICAgICAgIGoub2JqLmNhbl90aHIgPSAnMCc7XHJcbiAgICAgICAgai5vYmoucG9zICAgICA9IHt4OmoueCwgeTpqLnksIHo6ai56fTtcclxuICAgICAgICBqLm9iai52aWV3ICAgID0gIHtcclxuICAgICAgICAgICAgbGF5ZXI6IDAsIGxldHRlcjogJ++8gycsIFxyXG4gICAgICAgICAgICBzaG93M0Q6ICAnMScsXHJcbiAgICAgICAgICAgIHBhZF90OiAwLjAsIHBhZF9kOiAwLjAsIHBhZF9zOiAwLjAsXHJcbiAgICAgICAgICAgIGNvbF9mOiAnIzAwZmYwMCcsIGNvbF9iOiAnJywgY29sX3M6ICcjMDBlZTAwJywgY29sX3Q6ICcnLCBjb2xfZDogJycsIFxyXG4gICAgICAgICAgICBjb2xfbDogJyMwMDAwZmYnLCBcclxuICAgICAgICB9XHJcbiAgICAgICAgc3VwZXIoaik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIENfTWF6ZUNlbGxTdHJVcCBleHRlbmRzIENfTWF6ZUNlbGwge1xyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKGo/OiBKU09OX01hemVDZWxsfHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGogPz89IHtraW5kOiBUX016S2luZC5TdHJVcH07XHJcbiAgICAgICAgai5vYmogPz89IHt9O1xyXG5cclxuICAgICAgICBqLm9iai5jYW5fdGhyID0gJzEnO1xyXG4gICAgICAgIGoub2JqLnBvcyAgICAgPSB7eDpqLngsIHk6ai55LCB6Omouen07XHJcbiAgICAgICAgai5vYmoudmlldyAgICA9ICB7XHJcbiAgICAgICAgICAgIGxheWVyOiAwLCBsZXR0ZXI6ICfkuIonLCBcclxuICAgICAgICAgICAgc2hvdzNEOiAgJzEnLFxyXG4gICAgICAgICAgICBwYWRfdDogMC4wLCBwYWRfZDogMC4wLCBwYWRfczogMC4wLFxyXG4vLyAgICAgICAgICAgIGNvbF9mOiAnJywgY29sX2I6ICcnLCBjb2xfczogJycsIGNvbF90OiAnI2ZmZmZjYycsIGNvbF9kOiAnI2ZmZmZjYycsIFxyXG4gICAgICAgICAgICBjb2xfZjogJycsIGNvbF9iOiAnJywgY29sX3M6ICcnLCBjb2xfdDogJycsIGNvbF9kOiAnI2ZmZmZjYycsIFxyXG4gICAgICAgICAgICBjb2xfbDogJyMwMDAwZmYnLCBcclxuICAgICAgICB9XHJcbiAgICAgICAgc3VwZXIoaik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIENfTWF6ZUNlbGxTdHJEbiBleHRlbmRzIENfTWF6ZUNlbGwge1xyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKGo/OiBKU09OX01hemVDZWxsfHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGogPz89IHtraW5kOiBUX016S2luZC5TdHJEbn07XHJcbiAgICAgICAgai5vYmogPz89IHt9O1xyXG5cclxuICAgICAgICBqLm9iai5jYW5fdGhyID0gJzEnO1xyXG4gICAgICAgIGoub2JqLnBvcyAgICAgPSB7eDpqLngsIHk6ai55LCB6Omouen07XHJcbiAgICAgICAgai5vYmoudmlldyAgICA9ICB7XHJcbiAgICAgICAgICAgIGxheWVyOiAwLCBsZXR0ZXI6ICfkuIsnLCBcclxuICAgICAgICAgICAgc2hvdzNEOiAgJzEnLFxyXG4gICAgICAgICAgICBwYWRfdDogMC4wLCBwYWRfZDogMC4wLCBwYWRfczogMC4wLFxyXG4vLyAgICAgICAgICAgIGNvbF9mOiAnJywgY29sX2I6ICcnLCBjb2xfczogJycsIGNvbF90OiAnI2ZmZmZjYycsIGNvbF9kOiAnI2ZmZmZjYycsIFxyXG4gICAgICAgICAgICBjb2xfZjogJycsIGNvbF9iOiAnJywgY29sX3M6ICcnLCBjb2xfdDogJyNmZmZmY2MnLCBjb2xfZDogJycsIFxyXG4gICAgICAgICAgICBjb2xfbDogJyMwMDAwZmYnLCBcclxuICAgICAgICB9XHJcbiAgICAgICAgc3VwZXIoaik7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIENfTWF6ZUNlbGxTdHJVRCBleHRlbmRzIENfTWF6ZUNlbGwge1xyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKGo/OiBKU09OX01hemVDZWxsfHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGogPz89IHtraW5kOiBUX016S2luZC5TdHJVRH07XHJcbiAgICAgICAgai5vYmogPz89IHt9O1xyXG5cclxuICAgICAgICBqLm9iai5jYW5fdGhyID0gJzEnO1xyXG4gICAgICAgIGoub2JqLnBvcyAgICAgPSB7eDpqLngsIHk6ai55LCB6Omouen07XHJcbiAgICAgICAgai5vYmoudmlldyAgICA9ICB7XHJcbiAgICAgICAgICAgIGxheWVyOiAwLCBsZXR0ZXI6ICfmrrUnLCBcclxuICAgICAgICAgICAgc2hvdzNEOiAgJzEnLFxyXG4gICAgICAgICAgICBwYWRfdDogMC4wLCBwYWRfZDogMC4wLCBwYWRfczogMC4wLFxyXG4gICAgICAgICAgICBjb2xfZjogJycsIGNvbF9iOiAnJywgY29sX3M6ICcnLCBjb2xfdDogJyNmZmZmY2MnLCBjb2xfZDogJyNmZmZmY2MnLCBcclxuICAgICAgICAgICAgY29sX2w6ICcjMDAwMGZmJywgXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN1cGVyKGopO1xyXG4gICAgfVxyXG59XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5cclxuaW1wb3J0IHsgX2FsZXJ0IH0gZnJvbSBcIi4uL2RfY21uL2dsb2JhbFwiO1xyXG5pbXBvcnQgeyBDX0RzcE1lc3NhZ2UgfSBmcm9tIFwiLi4vZF91dGwvQ19Ec3BNZXNzYWdlXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEpTT05fTWF6ZUluZm8ge1xyXG4gICAgbmFtZTogICAgICBzdHJpbmc7XHJcbiAgICBtYm5hbWU6ICAgIHN0cmluZztcclxuICAgIGx2OiAgICAgICAgbnVtYmVyO1xyXG4gICAgc2l6ZV94OiAgICBudW1iZXI7XHJcbiAgICBzaXplX3k6ICAgIG51bWJlcjtcclxuICAgIHNpemVfejogICAgbnVtYmVyO1xyXG4gICAgbWF4X3Jvb206ICBudW1iZXI7XHJcbiAgICByb29tX3NpemU6IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFsZXJ0X21hemVpbmZvX2luZm8oYT86IEpTT05fTWF6ZUluZm8pOiB2b2lkIHtcclxuICAgIGlmIChhID09PSB1bmRlZmluZWQpIHJldHVybjtcclxuXHJcbiAgICBhbGVydChcIk1hemVJbmZvIERhdGE6XCJcclxuICAgICAgICArIFwiXFxubmFtZSA6IFwiICAgICAgICsgKGEubmFtZSAgICAgID8/ICc/JylcclxuICAgICAgICArIFwiXFxubWJuYW1lOiBcIiAgICAgICsgKGEubWJuYW1lICAgID8/ICc/JylcclxuICAgICAgICArIFwiXFxubHYgOlwiICAgICAgICAgICsgKGEubHYgICAgICAgID8/ICc/JylcclxuICAgICAgICArIFwiXFxuc2l6ZV94OiBcIiAgICAgICsgKGEuc2l6ZV94ICAgID8/ICc/JylcclxuICAgICAgICArIFwiXFxuc2l6ZV95OiBcIiAgICAgICsgKGEuc2l6ZV95ICAgID8/ICc/JylcclxuICAgICAgICArIFwiXFxuc2l6ZV96OiBcIiAgICAgICsgKGEuc2l6ZV96ICAgID8/ICc/JylcclxuICAgICAgICArIFwiXFxubWF4X29mX3Jvb206IFwiICsgKGEubWF4X3Jvb20gID8/ICc/JylcclxuICAgICAgICArIFwiXFxucm9vbV9zaXplOiBcIiAgICsgKGEucm9vbV9zaXplID8/ICc/JylcclxuICAgICAgICArIFwiXFxuXCJcclxuICAgICk7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBDX01hemVJbmZvIHtcclxuICAgIHB1YmxpYyBuYW1lOiAgICAgIHN0cmluZyA9ICcnO1xyXG4gICAgcHVibGljIG1ibmFtZTogICAgc3RyaW5nID0gJyc7XHJcbiAgICBwdWJsaWMgbHY6ICAgICAgICBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIHNpemVfeDogICAgbnVtYmVyID0gMztcclxuICAgIHB1YmxpYyBzaXplX3k6ICAgIG51bWJlciA9IDM7XHJcbiAgICBwdWJsaWMgc2l6ZV96OiAgICBudW1iZXIgPSAzO1xyXG4gICAgcHVibGljIG1heF9yb29tOiAgbnVtYmVyID0gMTtcclxuICAgIHB1YmxpYyByb29tX3NpemU6IG51bWJlciA9IDE7XHJcbiAgICBwdWJsaWMgc3RhdGljIGdldF90YmxfYWxsKCk6IENfTWF6ZUluZm9bXSB7XHJcbiAgICAgICAgY29uc3QgbWF6ZWluZm86IENfTWF6ZUluZm9bXSA9IFtdO1xyXG4gICAgICAgIG1hemVpbmZvLnB1c2goXHJcbiAgICAgICAgICAgIG5ldyBDX01hemVJbmZvKCkuZGVjb2RlKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6ICAgXHQnbWF6ZTAxMCcsIFxyXG4gICAgICAgICAgICAgICAgbWJuYW1lOiBcdCfmlZnnt7TloLQnLCBcclxuICAgICAgICAgICAgICAgIGx2OiAgICAgXHQgMSwgXHJcbiAgICAgICAgICAgICAgICBzaXplX3g6IFx0MTEsIFxyXG4gICAgICAgICAgICAgICAgc2l6ZV95OiBcdDExLCBcclxuICAgICAgICAgICAgICAgIHNpemVfejogXHQgMywgXHJcbiAgICAgICAgICAgICAgICBtYXhfcm9vbTogXHQgMiwgXHJcbiAgICAgICAgICAgICAgICByb29tX3NpemU6IFx0IDMgXHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgbWF6ZWluZm8ucHVzaChcclxuICAgICAgICAgICAgbmV3IENfTWF6ZUluZm8oKS5kZWNvZGUoe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogICBcdCdtYXplMDExJywgXHJcbiAgICAgICAgICAgICAgICBtYm5hbWU6IFx0J+Wni+OBvuOCiuOBrui/t+WuricsIFxyXG4gICAgICAgICAgICAgICAgbHY6ICAgICBcdCAxLCBcclxuICAgICAgICAgICAgICAgIHNpemVfeDogXHQyMSwgXHJcbiAgICAgICAgICAgICAgICBzaXplX3k6IFx0MjEsIFxyXG4gICAgICAgICAgICAgICAgc2l6ZV96OiBcdCA1LCBcclxuICAgICAgICAgICAgICAgIG1heF9yb29tOiBcdCAzLCBcclxuICAgICAgICAgICAgICAgIHJvb21fc2l6ZTogXHQgMyBcclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgKTtcclxuICAgICAgICBtYXplaW5mby5wdXNoKFxyXG4gICAgICAgICAgICBuZXcgQ19NYXplSW5mbygpLmRlY29kZSh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiAgIFx0J21hemUwMTInLCBcclxuICAgICAgICAgICAgICAgIG1ibmFtZTogXHQn5pqX44GN5qOu44Gu6L+35a6uJywgXHJcbiAgICAgICAgICAgICAgICBsdjogICAgIFx0IDEsIFxyXG4gICAgICAgICAgICAgICAgc2l6ZV94OiBcdDI1LCBcclxuICAgICAgICAgICAgICAgIHNpemVfeTogXHQyNSwgXHJcbiAgICAgICAgICAgICAgICBzaXplX3o6IFx0IDcsIFxyXG4gICAgICAgICAgICAgICAgbWF4X3Jvb206IFx0IDUsIFxyXG4gICAgICAgICAgICAgICAgcm9vbV9zaXplOiBcdCAzIFxyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICApXHJcbiAgICAgICAgbWF6ZWluZm8ucHVzaChcclxuICAgICAgICAgICAgbmV3IENfTWF6ZUluZm8oKS5kZWNvZGUoe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogICBcdCdtYXplMDEzJywgXHJcbiAgICAgICAgICAgICAgICBtYm5hbWU6IFx0J+m7kumtlOOBruWcsOS4i+Wik+WcsCcsIFxyXG4gICAgICAgICAgICAgICAgbHY6ICAgICBcdCAxLCBcclxuICAgICAgICAgICAgICAgIHNpemVfeDogXHQzMSwgXHJcbiAgICAgICAgICAgICAgICBzaXplX3k6IFx0MzEsIFxyXG4gICAgICAgICAgICAgICAgc2l6ZV96OiBcdDEwLCBcclxuICAgICAgICAgICAgICAgIG1heF9yb29tOiBcdCA1LCBcclxuICAgICAgICAgICAgICAgIHJvb21fc2l6ZTogXHQgNSBcclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgKVxyXG5cclxuICAgICAgICByZXR1cm4gbWF6ZWluZm87XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IgKGo/OiBKU09OX01hemVJbmZvKSB7XHJcbiAgICAgICAgaWYgKGogIT09IHVuZGVmaW5lZCkgdGhpcy5kZWNvZGUoaik7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZW5jb2RlKCk6IEpTT05fTWF6ZUluZm8ge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG5hbWU6ICAgICAgdGhpcy5uYW1lLFxyXG4gICAgICAgICAgICBtYm5hbWU6ICAgIHRoaXMubWJuYW1lLFxyXG4gICAgICAgICAgICBsdjogICAgICAgIHRoaXMubHYsXHJcbiAgICAgICAgICAgIHNpemVfeDogICAgdGhpcy5zaXplX3gsXHJcbiAgICAgICAgICAgIHNpemVfeTogICAgdGhpcy5zaXplX3ksXHJcbiAgICAgICAgICAgIHNpemVfejogICAgdGhpcy5zaXplX3osXHJcbiAgICAgICAgICAgIG1heF9yb29tOiAgdGhpcy5tYXhfcm9vbSxcclxuICAgICAgICAgICAgcm9vbV9zaXplOiB0aGlzLnJvb21fc2l6ZSxcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZGVjb2RlKGo/OiBKU09OX01hemVJbmZvKTogQ19NYXplSW5mbyB7XHJcbiAgICAgICAgaWYgKGogPT09IHVuZGVmaW5lZCkgcmV0dXJuIHRoaXM7XHJcblxyXG4gICAgICAgIGlmIChqLm5hbWUgICAgICAhPT0gdW5kZWZpbmVkKSB0aGlzLm5hbWUgICAgICA9IGoubmFtZTtcclxuICAgICAgICBpZiAoai5tYm5hbWUgICAgIT09IHVuZGVmaW5lZCkgdGhpcy5tYm5hbWUgICAgPSBqLm1ibmFtZTtcclxuICAgICAgICBpZiAoai5sdiAgICAgICAgIT09IHVuZGVmaW5lZCkgdGhpcy5sdiAgICAgICAgPSBqLmx2O1xyXG4gICAgICAgIGlmIChqLnNpemVfeCAgICAhPT0gdW5kZWZpbmVkKSB0aGlzLnNpemVfeCAgICA9IGouc2l6ZV94O1xyXG4gICAgICAgIGlmIChqLnNpemVfeSAgICAhPT0gdW5kZWZpbmVkKSB0aGlzLnNpemVfeSAgICA9IGouc2l6ZV95O1xyXG4gICAgICAgIGlmIChqLnNpemVfeiAgICAhPT0gdW5kZWZpbmVkKSB0aGlzLnNpemVfeiAgICA9IGouc2l6ZV96O1xyXG4gICAgICAgIGlmIChqLm1heF9yb29tICAhPT0gdW5kZWZpbmVkKSB0aGlzLm1heF9yb29tICA9IGoubWF4X3Jvb207XHJcbiAgICAgICAgaWYgKGoucm9vbV9zaXplICE9PSB1bmRlZmluZWQpIHRoaXMucm9vbV9zaXplID0gai5yb29tX3NpemU7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgYWxlcnQoKTogdm9pZCB7XHJcbiAgICAgICAgYWxlcnQoXCJNYXplSW5mbyBEYXRhOlwiXHJcbiAgICAgICAgICAgICsgXCJcXG5uYW1lIDogXCIgICAgICAgKyAodGhpcy5uYW1lICAgICAgPz8gJz8nKVxyXG4gICAgICAgICAgICArIFwiXFxubWJuYW1lOiBcIiAgICAgICsgKHRoaXMubWJuYW1lICAgID8/ICc/JylcclxuICAgICAgICAgICAgKyBcIlxcbmx2IDpcIiAgICAgICAgICArICh0aGlzLmx2ICAgICAgICA/PyAnPycpXHJcbiAgICAgICAgICAgICsgXCJcXG5zaXplX3g6IFwiICAgICAgKyAodGhpcy5zaXplX3ggICAgPz8gJz8nKVxyXG4gICAgICAgICAgICArIFwiXFxuc2l6ZV95OiBcIiAgICAgICsgKHRoaXMuc2l6ZV95ICAgID8/ICc/JylcclxuICAgICAgICAgICAgKyBcIlxcbnNpemVfejogXCIgICAgICArICh0aGlzLnNpemVfeiAgICA/PyAnPycpXHJcbiAgICAgICAgICAgICsgXCJcXG5tYXhfb2Zfcm9vbTogXCIgKyAodGhpcy5tYXhfcm9vbSAgPz8gJz8nKVxyXG4gICAgICAgICAgICArIFwiXFxucm9vbV9zaXplOiBcIiAgICsgKHRoaXMucm9vbV9zaXplID8/ICc/JylcclxuICAgICAgICAgICAgKyBcIlxcblwiXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5cclxuaW1wb3J0IHsgQ19Qb2ludCB9ICAgICAgICAgICAgICAgICAgIGZyb20gXCIuL0NfUG9pbnRcIjtcclxuaW1wb3J0IHsgQ19Qb2ludERpciwgSlNPTl9Qb2ludERpciB9IGZyb20gXCIuL0NfUG9pbnREaXJcIjtcclxuaW1wb3J0IHsgSV9BYnN0cmFjdCwgSV9KU09OX1VuaXEsIEpTT05fQW55IH0gICAgIGZyb20gXCIuL0NfU2F2ZUluZm9cIjtcclxuaW1wb3J0IHsgX2dldF91dWlkIH0gICAgICAgICAgICAgICAgIGZyb20gXCIuLi9kX3V0bC9GX1JhbmRcIjtcclxuaW1wb3J0IHsgXHJcbiAgICBDX01hemVPYmpWaWV3LCBcclxuICAgIElfTWF6ZU9ialZpZXcsIFxyXG4gICAgSlNPTl9NYXplT2JqVmlldyBcclxufSBmcm9tIFwiLi9DX01hemVPYmpWaWV3XCI7XHJcblxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBKU09OX01hemVPYmogZXh0ZW5kcyBKU09OX0FueSB7XHJcbiAgICBjbG5hbWU/OiAgICBzdHJpbmcsXHJcbiAgICB1bmlxX2lkPzogICBzdHJpbmcsIFxyXG4gICAgcG9zPzogICAgICAgSlNPTl9Qb2ludERpcixcclxuICAgIHZpZXc/OiAgICAgIEpTT05fTWF6ZU9ialZpZXd8dW5kZWZpbmVkLFxyXG4gICAgdGhyPzogICAgICAgc3RyaW5nLCBcclxufVxyXG5cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSV9NYXplT2JqIGV4dGVuZHMgSV9KU09OX1VuaXEsIElfQWJzdHJhY3Qge1xyXG4gICAgZ2V0X3BkOiAgICAgKCk9PkNfUG9pbnREaXI7XHJcbiAgICB3aXRoaW46ICAgICAocDogQ19Qb2ludCk9PmJvb2xlYW47XHJcbiAgICB2aWV3OiAgICAgICAoKT0+SV9NYXplT2JqVmlld3x1bmRlZmluZWQ7XHJcbiAgICBjYW5UaHJvdWdoOiAoKT0+Ym9vbGVhbjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIENfTWF6ZU9iaiBpbXBsZW1lbnRzIElfTWF6ZU9iaiB7XHJcbiAgICBwcm90ZWN0ZWQgY2xuYW1lOiAgICBzdHJpbmcgPSAnQ19NYXplT2JqJztcclxuXHJcbiAgICBwcml2YXRlICAgdW5pcV9pZDogICBzdHJpbmc7XHJcbiAgICBwcm90ZWN0ZWQgcG9zOiAgICAgICBDX1BvaW50RGlyO1xyXG4gICAgcHJvdGVjdGVkIG15X3ZpZXc6ICAgSV9NYXplT2JqVmlld3x1bmRlZmluZWQ7XHJcbiAgICBwcm90ZWN0ZWQgY2FuX3RocjogICBib29sZWFuO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgbmV3T2JqKGo/OiBKU09OX01hemVPYmp8dW5kZWZpbmVkKTogSV9NYXplT2JqIHtcclxuICAgICAgICBqID8/PSB7fTtcclxuICAgICAgICBqLmNsbmFtZSA/Pz0gQ19NYXplT2JqLmNvbnN0cnVjdG9yLm5hbWU7XHJcbiAgICAgICAgc3dpdGNoIChqLmNsbmFtZSkge1xyXG4gICAgICAgICAgICBjYXNlIENfTWF6ZU9iai5jb25zdHJ1Y3Rvci5uYW1lOiByZXR1cm4gbmV3IENfTWF6ZU9iaihqKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5ldyBDX01hemVPYmooaik7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgbmV3T2JqKGo/OiBKU09OX01hemVPYmp8dW5kZWZpbmVkKTogSV9NYXplT2JqIHtcclxuICAgICAgICByZXR1cm4gQ19NYXplT2JqLm5ld09iaihqKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgY29uc3RydWN0b3Ioaj86IEpTT05fTWF6ZU9ianx1bmRlZmluZWQpIHtcclxuICAgICAgICB0aGlzLnVuaXFfaWQgICAgPSAnbWF6ZW9ial8nICsgX2dldF91dWlkKCk7XHJcbiAgICAgICAgdGhpcy5jbG5hbWUgICAgID0gIENfTWF6ZU9iai5jb25zdHJ1Y3Rvci5uYW1lO1xyXG4gICAgICAgIHRoaXMucG9zICAgICAgICA9ICBuZXcgQ19Qb2ludERpcih7eDowLCB5OjAsIHo6MCwgZDowfSk7XHJcbiAgICAgICAgdGhpcy5teV92aWV3ICAgID0gIHVuZGVmaW5lZDtcclxuICAgICAgICB0aGlzLmNhbl90aHIgICAgPSAgdHJ1ZTtcclxuXHJcbiAgICAgICAgaWYgKGogIT09IHVuZGVmaW5lZCkgdGhpcy5fX2luaXQoaik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfX2luaXQoajogSlNPTl9NYXplT2JqfHVuZGVmaW5lZCk6IENfTWF6ZU9iaiB7XHJcbiAgICAgICAgaWYgKGogPT09IHVuZGVmaW5lZCkgcmV0dXJuIHRoaXM7XHJcblxyXG4gICAgICAgIGlmIChqLnVuaXFfaWQgIT09IHVuZGVmaW5lZCkgdGhpcy51bmlxX2lkICAgPSBqLnVuaXFfaWQ7XHJcbiAgICAgICAgaWYgKGouY2xuYW1lICAhPT0gdW5kZWZpbmVkKSB0aGlzLmNsbmFtZSAgICA9IGouY2xuYW1lO1xyXG4gICAgICAgIGlmIChqLnBvcyAgICAgIT09IHVuZGVmaW5lZCkgdGhpcy5wb3MuZGVjb2RlKGoucG9zKTtcclxuICAgICAgICBpZiAoai52aWV3ICAgICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgaWYgKE9iamVjdC5rZXlzKGoudmlldykubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5teV92aWV3ID8/PSBDX01hemVPYmpWaWV3Lm5ld09iaihqLnZpZXcpOyBcclxuICAgICAgICAgICAgfSBlbHNlIHRoaXMubXlfdmlldyAgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChqLmNhbl90aHIgIT09IHVuZGVmaW5lZCkgdGhpcy5jYW5fdGhyID0gai5jYW5fdGhyICE9PSAnMCcgPyB0cnVlIDogZmFsc2U7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbn1cclxuXHJcbiAgICBwdWJsaWMgdWlkKCk6IHN0cmluZyB7cmV0dXJuIHRoaXMudW5pcV9pZH1cclxuXHJcbiAgICBwdWJsaWMgdmlldygpOiBJX01hemVPYmpWaWV3fHVuZGVmaW5lZCB7cmV0dXJuIHRoaXMubXlfdmlld31cclxuICAgIHB1YmxpYyBzZXRWaWV3KHZpZXc6IElfTWF6ZU9ialZpZXd8dW5kZWZpbmVkKTogdm9pZCB7dGhpcy5teV92aWV3ID0gdmlld31cclxuXHJcbiAgICBwdWJsaWMgY2FuVGhyb3VnaCgpOiBib29sZWFuIHtyZXR1cm4gdGhpcy5jYW5fdGhyfVxyXG4gICAgcHVibGljIHNldFRocm91Z2godGhyOiBib29sZWFuKTogYm9vbGVhbiB7cmV0dXJuIHRoaXMuY2FuX3RociA9IHRocn1cclxuXHJcbiAgICBwdWJsaWMgZ2V0X3BkKCk6IENfUG9pbnREaXIge1xyXG4gICAgICAgIHJldHVybiBuZXcgQ19Qb2ludERpcih0aGlzLnBvcyk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0X3BkKHA6IENfUG9pbnREaXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnBvcyA9IHA7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgd2l0aGluKHA6IENfUG9pbnQpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wb3Mud2l0aGluKHApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBlbmNvZGUoKTogSlNPTl9NYXplT2JqIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB1bmlxX2lkOiB0aGlzLnVuaXFfaWQsXHJcbiAgICAgICAgICAgIGNsbmFtZTogIHRoaXMuY2xuYW1lLFxyXG4gICAgICAgICAgICBwb3M6ICAgICB0aGlzLnBvcy5lbmNvZGUoKSxcclxuICAgICAgICAgICAgdmlldzogICAgdGhpcy5teV92aWV3Py5lbmNvZGUoKSA/PyB7fSxcclxuICAgICAgICAgICAgY2FuX3RocjogdGhpcy5jYW5fdGhyID8gJzEnIDogJzAnLFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGVjb2RlKGo6IEpTT05fTWF6ZU9ianx1bmRlZmluZWQpOiBJX01hemVPYmoge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9faW5pdChqKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzdGF0aWMgZGVjb2RlKGo6IEpTT05fTWF6ZU9ianx1bmRlZmluZWQpOiBJX01hemVPYmoge1xyXG4gICAgICAgIHJldHVybiBDX01hemVPYmoubmV3T2JqKGopO1xyXG4gICAgfVxyXG59XHJcblxyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuXHJcbmltcG9ydCB7IElfQWJzdHJhY3QsIEpTT05fQW55IH0gZnJvbSBcIi4vQ19TYXZlSW5mb1wiO1xyXG5pbXBvcnQgeyBUX1dhbGwgfSAgICAgICAgICAgICAgIGZyb20gXCIuLi9kX21kbC9DX1dhbGxcIjtcclxuXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElfTWF6ZU9ialZpZXcgZXh0ZW5kcyBJX0Fic3RyYWN0IHtcclxuICAgIC8vIOihqOekuumWouS/gigyRHByZSkuL0NfV2FsbFxyXG4gICAgbGF5ZXI6ICAgKCk9Pm51bWJlcjtcclxuICAgIGxldHRlcjogICgpPT5zdHJpbmd8bnVsbDsgLy8gbnVsbDog6KaL44GI44Gq44GE44CB5L2V44KC44Gq44GEXHJcblxyXG4gICAgLy8g6KGo56S66Zai5L+CKDNEKVxyXG4gICAgY2FuU2hvdzogKCk9PmJvb2xlYW47XHJcbiAgICBkcm93M0Q6ICAoZnJvdDogVF9XYWxsLCBiYWNrOiBUX1dhbGwpPT52b2lkO1xyXG5cclxuICAgIHBhZF90OiAgICgpPT5udW1iZXI7IC8v5LiK5YG044Gu56m644GNKOWJsuWQiDogMOOBi+OCiTEpIFxyXG4gICAgcGFkX2Q6ICAgKCk9Pm51bWJlcjsgLy/luorlgbTjga7nqbrjgY0o5Ymy5ZCIOiAw44GL44KJMSkgXHJcbiAgICBwYWRfczogICAoKT0+bnVtYmVyOyAvL+aoquWBtOOBruepuuOBjSjlibLlkIg6IDDjgYvjgokxKSBcclxuICAgIGNvbF9mOiAgICgpPT5zdHJpbmd8bnVsbDsgLy/mraPpnaLjga7oibIoQ1NT44Kr44Op44O8KeOAgm51bGzjga/pgI/mmI5cclxuICAgIGNvbF9iOiAgICgpPT5zdHJpbmd8bnVsbDsgLy/og4zpnaLjga7oibIoQ1NT44Kr44Op44O8KeOAgm51bGzjga/pgI/mmI5cclxuICAgIGNvbF9zOiAgICgpPT5zdHJpbmd8bnVsbDsgLy/mqKrlgbTjga7oibIoQ1NT44Kr44Op44O8KeOAgm51bGzjga/pgI/mmI5cclxuICAgIGNvbF90OiAgICgpPT5zdHJpbmd8bnVsbDsgLy/kuIrpg6jjga7oibIoQ1NT44Kr44Op44O8KeOAgm51bGzjga/pgI/mmI7jgILjgoTjgoTjgZPjgZfjgYTjgYzjgIHniankvZPjga7lupXpnaLjgavlvZPjgZ/jgotcclxuICAgIGNvbF9kOiAgICgpPT5zdHJpbmd8bnVsbDsgLy/kuIvpg6jjga7oibIoQ1NT44Kr44Op44O8KeOAgm51bGzjga/pgI/mmI7jgILjgoTjgoTjgZPjgZfjgYTjgYzjgIHniankvZPjga7lpKnkupXjgavlvZPjgZ/jgotcclxuICAgIGNvbF9sOiAgICgpPT5zdHJpbmd8bnVsbDsgLy/jg6njgqTjg7Pjga7oibIoQ1NT44Kr44Op44O8KVxyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEpTT05fTWF6ZU9ialZpZXcgZXh0ZW5kcyBKU09OX0FueSB7XHJcbiAgICBjbG5hbWU/OiBzdHJpbmcsXHJcbiAgICBsYXllcj86ICBudW1iZXIsXHJcbiAgICBsZXR0ZXI/OiBzdHJpbmcsXHJcbiAgICBzaG93M0Q/OiBzdHJpbmcsXHJcbiAgICBwYWRfdD86ICBudW1iZXIsIC8vIOOCquODluOCuOOCp+OCr+ODiOS4iumDqOOBrumamemWk+OBruWJsuWQiCgwLjAg44GL44KJIDEuMCkgXHJcbiAgICBwYWRfZD86ICBudW1iZXIsIC8vIOOCquODluOCuOOCp+OCr+ODiOS4i+mDqOOBrumamemWk+OBruWJsuWQiCgwLjAg44GL44KJIDEuMCkgXHJcbiAgICBwYWRfcz86ICBudW1iZXIsIC8vIOOCquODluOCuOOCp+OCr+ODiOWRqOWbsuOBrumamemWk+OBruWJsuWQiCgwLjAg44GL44KJIDEuMCkgXHJcbiAgICBjb2xfZj86ICBzdHJpbmd8bnVsbCwgLy8g44Kq44OW44K444Kn44Kv44OI5q2j6Z2i44GuQ1NT44Kr44Op44O8IFxyXG4gICAgY29sX2I/OiAgc3RyaW5nfG51bGwsIC8vIOOCquODluOCuOOCp+OCr+ODiOato+mdouOBrkNTU+OCq+ODqeODvCBcclxuICAgIGNvbF9zPzogIHN0cmluZ3xudWxsLCAvLyDjgqrjg5bjgrjjgqfjgq/jg4jlgbTpnaLjga5DU1Pjgqvjg6njg7wgXHJcbiAgICBjb2xfdD86ICBzdHJpbmd8bnVsbCwgLy8g44Kq44OW44K444Kn44Kv44OI5LiK6Z2i44GuQ1NT44Kr44Op44O8IFxyXG4gICAgY29sX2Q/OiAgc3RyaW5nfG51bGwsIC8vIOOCquODluOCuOOCp+OCr+ODiOW6lemdouOBrkNTU+OCq+ODqeODvCBcclxuICAgIGNvbF9sPzogIHN0cmluZ3xudWxsLCAvLyDjgqrjg5bjgrjjgqfjgq/jg4jjga7nt5rjga5DU1Pjgqvjg6njg7wgXHJcbn1cclxuXHJcbnR5cGUgVF94eSAgID0ge3g6IG51bWJlciwgeTogbnVtYmVyfVxyXG50eXBlIFRfUmVjdCA9IHt0bDogVF94eSwgdHI6IFRfeHksIGRsOiBUX3h5LCBkcjogVF94eX07XHJcblxyXG5leHBvcnQgY2xhc3MgQ19NYXplT2JqVmlldyBpbXBsZW1lbnRzIElfTWF6ZU9ialZpZXcge1xyXG4gICAgcHVibGljIHN0YXRpYyBjb24zRD86IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0X2NvbnRleHQzRCgpOiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkR8dW5kZWZpbmVkIHtyZXR1cm4gdGhpcz8uY29uM0R9XHJcbiAgICBwdWJsaWMgc3RhdGljIHNldF9jb250ZXh0M0QoY29uM0Q/OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiB2b2lkIHt0aGlzLmNvbjNEID0gY29uM0R9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBuZXdPYmooaj86IEpTT05fTWF6ZU9ialZpZXd8dW5kZWZpbmVkKTogSV9NYXplT2JqVmlldyB7XHJcbiAgICAgICAgaiA/Pz0ge307XHJcbiAgICAgICAgai5jbG5hbWUgPz89IENfTWF6ZU9ialZpZXcuY29uc3RydWN0b3IubmFtZTtcclxuICAgICAgICBzd2l0Y2ggKGouY2xuYW1lKSB7XHJcbiAgICAgICAgICAgIGNhc2UgQ19NYXplT2JqVmlldy5jb25zdHJ1Y3Rvci5uYW1lOiAgICAgcmV0dXJuIG5ldyBDX01hemVPYmpWaWV3KGopO1xyXG4gICAgICAgIH0gXHJcbiAgICAgICAgcmV0dXJuIG5ldyBDX01hemVPYmpWaWV3KGopO1xyXG4gICAgfVxyXG4gICAgcHVibGljIG5ld09iaihqPzogSlNPTl9NYXplT2JqVmlld3x1bmRlZmluZWQpOiBJX01hemVPYmpWaWV3IHtcclxuICAgICAgICByZXR1cm4gQ19NYXplT2JqVmlldy5uZXdPYmooaik7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByaXZhdGUgY2xuYW1lOiAgICBzdHJpbmcgPSAnQ19NYXplT2JqVmlldyc7XHJcblxyXG4gICAgcHJpdmF0ZSBteV9sYXllcjogIG51bWJlcjsgICAgICAvLyAyROihqOekuuOBruaZguOBrkNTU+ODrOOCpOODpOODvOOAguWQjOS9jee9ruOBruOCquODluOCuOOCp+OBruWGheOBk+OBruWApOOBjOWkp+OBjeOBhOeJqeOBjOihqOekuuOBleOCjOOCi1xyXG4gICAgcHJpdmF0ZSBteV9sZXR0ZXI6IHN0cmluZ3xudWxsOyAvLyAyROihqOekuuOBruaZguOBruWFqOinkuaWh+Wtl+OAgm51bGzjgarjgonpgI/mmI5cclxuXHJcbiAgICBwcml2YXRlIG15X3Nob3czRDogYm9vbGVhbjtcclxuICAgIHByaXZhdGUgbXlfcGFkX3Q6ICBudW1iZXI7IC8vIOOCquODluOCuOOCp+OCr+ODiOS4iumDqOOBrumamemWk+OBruWJsuWQiCgwLjAg44GL44KJIDEuMCkgXHJcbiAgICBwcml2YXRlIG15X3BhZF9kOiAgbnVtYmVyOyAvLyDjgqrjg5bjgrjjgqfjgq/jg4jkuIvpg6jjga7pmpnplpPjga7libLlkIgoMC4wIOOBi+OCiSAxLjApIFxyXG4gICAgcHJpdmF0ZSBteV9wYWRfczogIG51bWJlcjsgLy8g44Kq44OW44K444Kn44Kv44OI5ZGo5Zuy44Gu6ZqZ6ZaT44Gu5Ymy5ZCIKDAuMCDjgYvjgokgMS4wKSBcclxuXHJcbiAgICBwcml2YXRlIG15X2NvbF9mOiAgc3RyaW5nfG51bGw7IC8vIOOCquODluOCuOOCp+OCr+ODiOato+mdouOBrkNTU+OCq+ODqeODvCBcclxuICAgIHByaXZhdGUgbXlfY29sX2I6ICBzdHJpbmd8bnVsbDsgLy8g44Kq44OW44K444Kn44Kv44OI5q2j6Z2i44GuQ1NT44Kr44Op44O8IFxyXG4gICAgcHJpdmF0ZSBteV9jb2xfczogIHN0cmluZ3xudWxsOyAvLyDjgqrjg5bjgrjjgqfjgq/jg4jlgbTpnaLjga5DU1Pjgqvjg6njg7wgXHJcbiAgICBwcml2YXRlIG15X2NvbF90OiAgc3RyaW5nfG51bGw7IC8vIOOCquODluOCuOOCp+OCr+ODiOS4iumdouOBrkNTU+OCq+ODqeODvCBcclxuICAgIHByaXZhdGUgbXlfY29sX2Q6ICBzdHJpbmd8bnVsbDsgLy8g44Kq44OW44K444Kn44Kv44OI5bqV6Z2i44GuQ1NT44Kr44Op44O8IFxyXG4gICAgcHJpdmF0ZSBteV9jb2xfbDogIHN0cmluZ3xudWxsOyAvLyDjgqrjg5bjgrjjgqfjgq/jg4jjga7nt5rjga5DU1Pjgqvjg6njg7wgXHJcblxyXG4gICAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKGo/OiBKU09OX01hemVPYmpWaWV3fHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMuY2xuYW1lICAgICA9ICB0aGlzLmNvbnN0cnVjdG9yLm5hbWU7XHJcblxyXG4gICAgICAgIHRoaXMubXlfbGF5ZXIgICA9ICAtMjtcclxuICAgICAgICB0aGlzLm15X2xldHRlciAgPSAgbnVsbDtcclxuXHJcbiAgICAgICAgdGhpcy5teV9wYWRfdCAgID0gIDAuMDtcclxuICAgICAgICB0aGlzLm15X3BhZF9kICAgPSAgMC4wO1xyXG4gICAgICAgIHRoaXMubXlfcGFkX3MgICA9ICAwLjA7XHJcblxyXG4gICAgICAgIHRoaXMubXlfc2hvdzNEICA9ICB0cnVlO1xyXG5cclxuICAgICAgICB0aGlzLm15X2NvbF9mICAgPSAnI2Y4ZjhmOCc7IFxyXG4gICAgICAgIHRoaXMubXlfY29sX2IgICA9ICcjYWFhYWFhJzsgXHJcbiAgICAgICAgdGhpcy5teV9jb2xfcyAgID0gJyNkZGRkZGQnOyBcclxuICAgICAgICB0aGlzLm15X2NvbF90ICAgPSAnI2ZmZmZmZic7IFxyXG4gICAgICAgIHRoaXMubXlfY29sX2QgICA9ICcjY2NjY2NjJzsgXHJcbiAgICAgICAgdGhpcy5teV9jb2xfbCAgID0gJyMzMzMzMzMnOyBcclxuXHJcbiAgICAgICAgaWYgKGogIT09IHVuZGVmaW5lZCkgdGhpcy5fX2luaXQoaik7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIF9faW5pdChqOiBKU09OX01hemVPYmpWaWV3fHVuZGVmaW5lZCk6IElfTWF6ZU9ialZpZXcge1xyXG4gICAgICAgIGlmIChqID09PSB1bmRlZmluZWQpIHJldHVybiB0aGlzO1xyXG5cclxuICAgICAgICBpZiAoai5jbG5hbWUgICE9PSB1bmRlZmluZWQpIHRoaXMuY2xuYW1lICAgID0gai5jbG5hbWU7XHJcbiAgICAgICAgaWYgKGoubGF5ZXIgICAhPT0gdW5kZWZpbmVkKSB0aGlzLm15X2xheWVyICA9IGoubGF5ZXI7XHJcbiAgICAgICAgaWYgKGoubGV0dGVyICAhPT0gdW5kZWZpbmVkKSB0aGlzLm15X2xldHRlciA9IGoubGV0dGVyICE9PSAnJyAgPyBqLmxldHRlciA6IG51bGw7IFxyXG4gICAgICAgIGlmIChqLnBhZF90ICAgIT09IHVuZGVmaW5lZCkgdGhpcy5teV9wYWRfdCAgPSBqLnBhZF90OyBcclxuICAgICAgICBpZiAoai5wYWRfZCAgICE9PSB1bmRlZmluZWQpIHRoaXMubXlfcGFkX2QgID0gai5wYWRfZDsgXHJcbiAgICAgICAgaWYgKGoucGFkX3MgICAhPT0gdW5kZWZpbmVkKSB0aGlzLm15X3BhZF9zICA9IGoucGFkX3M7IFxyXG4gICAgICAgIGlmIChqLnNob3czRCAgIT09IHVuZGVmaW5lZCkgdGhpcy5teV9zaG93M0QgPSBqLnNob3czRCAhPT0gJzAnID8gdHJ1ZSAgICAgOiBmYWxzZTsgXHJcbiAgICAgICAgaWYgKGouY29sX2YgICAhPT0gdW5kZWZpbmVkKSB0aGlzLm15X2NvbF9mICA9IGouY29sX2YgICE9PSAnJyAgPyBqLmNvbF9mICA6IG51bGw7IFxyXG4gICAgICAgIGlmIChqLmNvbF9iICAgIT09IHVuZGVmaW5lZCkgdGhpcy5teV9jb2xfYiAgPSBqLmNvbF9iICAhPT0gJycgID8gai5jb2xfYiAgOiBudWxsOyBcclxuICAgICAgICBpZiAoai5jb2xfcyAgICE9PSB1bmRlZmluZWQpIHRoaXMubXlfY29sX3MgID0gai5jb2xfcyAgIT09ICcnICA/IGouY29sX3MgIDogbnVsbDsgXHJcbiAgICAgICAgaWYgKGouY29sX3QgICAhPT0gdW5kZWZpbmVkKSB0aGlzLm15X2NvbF90ICA9IGouY29sX3QgICE9PSAnJyAgPyBqLmNvbF90ICA6IG51bGw7IFxyXG4gICAgICAgIGlmIChqLmNvbF9kICAgIT09IHVuZGVmaW5lZCkgdGhpcy5teV9jb2xfZCAgPSBqLmNvbF9kICAhPT0gJycgID8gai5jb2xfZCAgOiBudWxsOyBcclxuICAgICAgICBpZiAoai5jb2xfbCAgICE9PSB1bmRlZmluZWQpIHRoaXMubXlfY29sX2wgID0gai5jb2xfbCAgIT09ICcnICA/IGouY29sX2wgIDogbnVsbDsgXHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsYXllcigpOiBudW1iZXIge3JldHVybiB0aGlzLm15X2xheWVyO31cclxuICAgIHB1YmxpYyBzZXRfbGF5ZXIobGF5ZXI6IG51bWJlcikge3RoaXMubXlfbGF5ZXIgPSBsYXllcn1cclxuXHJcbiAgICBwdWJsaWMgbGV0dGVyKCk6ICBzdHJpbmd8bnVsbCB7cmV0dXJuIHRoaXMubXlfbGV0dGVyfVxyXG4gICAgcHVibGljIHNldF9sZXR0ZXIobGV0dGVyOiBzdHJpbmd8bnVsbCk6IHN0cmluZ3xudWxsIHtyZXR1cm4gdGhpcy5teV9sZXR0ZXIgPSBsZXR0ZXJ9XHJcblxyXG4gICAgcHVibGljIGNhblNob3coKTogYm9vbGVhbiB7cmV0dXJuIHRoaXMubXlfc2hvdzNEfTtcclxuICAgIHB1YmxpYyBzZXRTaG93KGNhbl9zaG93OiBib29sZWFuKTogYm9vbGVhbiB7cmV0dXJuIHRoaXMubXlfc2hvdzNEID0gY2FuX3Nob3d9O1xyXG5cclxuICAgIHB1YmxpYyBwYWRfdCgpOiAgbnVtYmVyIHtyZXR1cm4gdGhpcy5teV9wYWRfdH1cclxuICAgIHB1YmxpYyBwYWRfZCgpOiAgbnVtYmVyIHtyZXR1cm4gdGhpcy5teV9wYWRfZH1cclxuICAgIHB1YmxpYyBwYWRfcygpOiAgbnVtYmVyIHtyZXR1cm4gdGhpcy5teV9wYWRfc31cclxuICAgIHB1YmxpYyBzZXRfcGFkX3QocGFkX3Q6IG51bWJlcik6IG51bWJlciB7cmV0dXJuIHRoaXMubXlfcGFkX3QgPSB0aGlzLm15X3BhZF9kICsgcGFkX3QgPCAxLjAgPyBwYWRfdCA6IDAuOTkgLSB0aGlzLm15X3BhZF9kfVxyXG4gICAgcHVibGljIHNldF9wYWRfZChwYWRfZDogbnVtYmVyKTogbnVtYmVyIHtyZXR1cm4gdGhpcy5teV9wYWRfZCA9IHRoaXMubXlfcGFkX3QgKyBwYWRfZCA8IDEuMCA/IHBhZF9kIDogMC45OSAtIHRoaXMubXlfcGFkX3R9XHJcbiAgICBwdWJsaWMgc2V0X3BhZF9zKHBhZF9zOiBudW1iZXIpOiBudW1iZXIge3JldHVybiB0aGlzLm15X3BhZF9zID0gcGFkX3N9XHJcblxyXG4gICAgcHVibGljIGNvbF9mKCk6IHN0cmluZ3xudWxsIHtyZXR1cm4gdGhpcy5teV9jb2xfZn0gXHJcbiAgICBwdWJsaWMgY29sX2IoKTogc3RyaW5nfG51bGwge3JldHVybiB0aGlzLm15X2NvbF9ifSBcclxuICAgIHB1YmxpYyBjb2xfcygpOiBzdHJpbmd8bnVsbCB7cmV0dXJuIHRoaXMubXlfY29sX3N9IFxyXG4gICAgcHVibGljIGNvbF90KCk6IHN0cmluZ3xudWxsIHtyZXR1cm4gdGhpcy5teV9jb2xfdH0gXHJcbiAgICBwdWJsaWMgY29sX2QoKTogc3RyaW5nfG51bGwge3JldHVybiB0aGlzLm15X2NvbF9kfSBcclxuICAgIHB1YmxpYyBjb2xfbCgpOiBzdHJpbmd8bnVsbCB7cmV0dXJuIHRoaXMubXlfY29sX2x9IFxyXG4gICAgcHVibGljIHNldF9jb2xfZihjb2xfZjogc3RyaW5nfG51bGwpOiBzdHJpbmd8bnVsbCB7cmV0dXJuIHRoaXMubXlfY29sX2YgPSBjb2xfZn0gXHJcbiAgICBwdWJsaWMgc2V0X2NvbF9iKGNvbF9iOiBzdHJpbmd8bnVsbCk6IHN0cmluZ3xudWxsIHtyZXR1cm4gdGhpcy5teV9jb2xfYiA9IGNvbF9ifSBcclxuICAgIHB1YmxpYyBzZXRfY29sX3MoY29sX3M6IHN0cmluZ3xudWxsKTogc3RyaW5nfG51bGwge3JldHVybiB0aGlzLm15X2NvbF9zID0gY29sX3N9IFxyXG4gICAgcHVibGljIHNldF9jb2xfdChjb2xfdDogc3RyaW5nfG51bGwpOiBzdHJpbmd8bnVsbCB7cmV0dXJuIHRoaXMubXlfY29sX3QgPSBjb2xfdH0gXHJcbiAgICBwdWJsaWMgc2V0X2NvbF9kKGNvbF9kOiBzdHJpbmd8bnVsbCk6IHN0cmluZ3xudWxsIHtyZXR1cm4gdGhpcy5teV9jb2xfZCA9IGNvbF9kfSBcclxuICAgIHB1YmxpYyBzZXRfY29sX2woY29sX2w6IHN0cmluZ3xudWxsKTogc3RyaW5nfG51bGwge3JldHVybiB0aGlzLm15X2NvbF9sID0gY29sX2x9IFxyXG5cclxuXHJcbiAgICBwdWJsaWMgZHJvdzNEKGZyb3Q6IFRfV2FsbCwgYmFjazogVF9XYWxsKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5kcm93X29ial9iYWNrICAgICAgKGZyb3QsIGJhY2spO1xyXG4gICAgICAgIHRoaXMuZHJvd19vYmpfZG93biAgICAgIChmcm90LCBiYWNrKTtcclxuICAgICAgICB0aGlzLmRyb3dfb2JqX3RvcCAgICAgICAoZnJvdCwgYmFjayk7XHJcbiAgICAgICAgdGhpcy5kcm93X29ial9yaWdodF9zaWRlKGZyb3QsIGJhY2spO1xyXG4gICAgICAgIHRoaXMuZHJvd19vYmpfbGVmdF9zaWRlIChmcm90LCBiYWNrKTtcclxuICAgICAgICB0aGlzLmRyb3dfb2JqX2Zyb250ICAgICAoZnJvdCwgYmFjayk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGRyb3dfb2JqX2Rvd24oXHJcbiAgICAgICAgZnJvdDogIFRfV2FsbCwgXHJcbiAgICAgICAgYmFjazogIFRfV2FsbCwgXHJcbiAgICApOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXRoaXMuY2FuU2hvdygpIHx8IHRoaXMuY29sX3QoKSA9PT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgIGlmICh0aGlzLnBhZF9zKCkgPD0gMC4wICYmIHRoaXMucGFkX3QoKSA+PSAxLjApIHtcclxuICAgICAgICAgICAgZHJvd19jZWxsX2Zsb29yKGZyb3QsIGJhY2ssIHRoaXMuY29sX3QoKSA/PyAnIzY2NjZmZicsIHRoaXMuY29sX2woKSA/PyAnIzk5OTlmZicpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgY29uc3QgbyA9IF9fY2FsY19wYWRkaW5nX29iaih0aGlzLCBmcm90LCBiYWNrKTtcclxuICAgICAgICBjb25zdCByZWN0OiBUX1JlY3QgPSB7XHJcbiAgICAgICAgICAgIHRsOiBvLmZkbCxcclxuICAgICAgICAgICAgdHI6IG8uZmRyLFxyXG4gICAgICAgICAgICBkcjogby5iZHIsXHJcbiAgICAgICAgICAgIGRsOiBvLmJkbCxcclxuICAgICAgICB9XHJcbiAgICAgICAgZHJvd19jZWxsKHJlY3QsIHRoaXMuY29sX3QoKSwgdGhpcy5jb2xfbCgpKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRyb3dfb2JqX3RvcChcclxuICAgICAgICBmcm90OiAgVF9XYWxsLCBcclxuICAgICAgICBiYWNrOiAgVF9XYWxsLCBcclxuICAgICk6IHZvaWQge1xyXG4gICAgICAgIGlmICghdGhpcy5jYW5TaG93KCkgfHwgdGhpcy5jb2xfZCgpID09PSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgaWYgKHRoaXMucGFkX3MoKSA8PSAwLjAgJiYgdGhpcy5wYWRfZCgpID49IDEuMCkge1xyXG4gICAgICAgICAgICBkcm93X2NlbGxfY2VpbGluZyhmcm90LCBiYWNrLCB0aGlzLmNvbF9kKCkgPz8gJyNhYWFhYWEnLCB0aGlzLmNvbF9sKCkgPz8gJyM5OTk5ZmYnKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIGNvbnN0IG8gPSBfX2NhbGNfcGFkZGluZ19vYmoodGhpcywgZnJvdCwgYmFjayk7XHJcbiAgICAgICAgY29uc3QgcmVjdDogVF9SZWN0ID0ge1xyXG4gICAgICAgICAgICB0bDogby5mdGwsXHJcbiAgICAgICAgICAgIHRyOiBvLmZ0cixcclxuICAgICAgICAgICAgZHI6IG8uYnRyLFxyXG4gICAgICAgICAgICBkbDogby5idGwsXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRyb3dfY2VsbChyZWN0LCB0aGlzLmNvbF9kKCksIHRoaXMuY29sX2woKSk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGRyb3dfb2JqX2Zyb250KFxyXG4gICAgICAgIGZyb3Q6ICBUX1dhbGwsIFxyXG4gICAgICAgIGJhY2s6ICBUX1dhbGwsIFxyXG4gICAgKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmNhblNob3coKSB8fCB0aGlzLmNvbF9mKCkgPT09IG51bGwpIHJldHVybjtcclxuICAgIFxyXG4gICAgICAgIGNvbnN0IG8gPSBfX2NhbGNfcGFkZGluZ19vYmoodGhpcywgZnJvdCwgYmFjayk7XHJcbiAgICAgICAgY29uc3QgcmVjdDogVF9SZWN0ID0ge1xyXG4gICAgICAgICAgICB0bDogby5mdGwsIFxyXG4gICAgICAgICAgICB0cjogby5mdHIsIFxyXG4gICAgICAgICAgICBkcjogby5mZHIsIFxyXG4gICAgICAgICAgICBkbDogby5mZGwsIFxyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIGRyb3dfY2VsbChyZWN0LCB0aGlzLmNvbF9mKCksIHRoaXMuY29sX2woKSk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGRyb3dfb2JqX2JhY2soXHJcbiAgICAgICAgZnJvdDogIFRfV2FsbCwgXHJcbiAgICAgICAgYmFjazogIFRfV2FsbCwgXHJcbiAgICApOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXRoaXMuY2FuU2hvdygpIHx8IHRoaXMuY29sX2IoKSA9PT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgXHJcbiAgICAgICAgY29uc3QgbyA9IF9fY2FsY19wYWRkaW5nX29iaih0aGlzLCBmcm90LCBiYWNrKTtcclxuICAgICAgICBjb25zdCByZWN0OiBUX1JlY3QgPSB7XHJcbiAgICAgICAgICAgIHRsOiBvLmJ0bCwgXHJcbiAgICAgICAgICAgIHRyOiBvLmJ0ciwgXHJcbiAgICAgICAgICAgIGRyOiBvLmJkciwgXHJcbiAgICAgICAgICAgIGRsOiBvLmJkbCwgXHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgZHJvd19jZWxsKHJlY3QsIHRoaXMuY29sX2IoKSwgdGhpcy5jb2xfbCgpKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgZHJvd19vYmpfbGVmdF9zaWRlKFxyXG4gICAgICAgIGZyb3Q6ICBUX1dhbGwsIFxyXG4gICAgICAgIGJhY2s6ICBUX1dhbGwsIFxyXG4gICAgKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmNhblNob3coKSB8fCB0aGlzLmNvbF9zKCkgPT09IG51bGwpIHJldHVybjtcclxuICAgIFxyXG4gICAgICAgIGNvbnN0IG8gPSBfX2NhbGNfcGFkZGluZ19vYmoodGhpcywgZnJvdCwgYmFjayk7XHJcbiAgICAgICAgY29uc3QgcmVjdDogVF9SZWN0ID0ge1xyXG4gICAgICAgICAgICB0bDogby5idGwsXHJcbiAgICAgICAgICAgIHRyOiBvLmZ0bCxcclxuICAgICAgICAgICAgZHI6IG8uZmRsLFxyXG4gICAgICAgICAgICBkbDogby5iZGwsXHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgZHJvd19jZWxsKHJlY3QsIHRoaXMuY29sX3MoKSwgdGhpcy5jb2xfbCgpKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgZHJvd19vYmpfcmlnaHRfc2lkZShcclxuICAgICAgICBmcm90OiAgVF9XYWxsLCBcclxuICAgICAgICBiYWNrOiAgVF9XYWxsLCBcclxuICAgICk6IHZvaWQge1xyXG4gICAgICAgIGlmICghdGhpcy5jYW5TaG93KCkgfHwgdGhpcy5jb2xfcygpID09PSBudWxsKSByZXR1cm47XHJcbiAgICBcclxuICAgICAgICBjb25zdCBvID0gX19jYWxjX3BhZGRpbmdfb2JqKHRoaXMsIGZyb3QsIGJhY2spO1xyXG4gICAgICAgIGNvbnN0IHJlY3Q6IFRfUmVjdCA9IHtcclxuICAgICAgICAgICAgdGw6IG8uZnRyLFxyXG4gICAgICAgICAgICB0cjogby5idHIsXHJcbiAgICAgICAgICAgIGRyOiBvLmJkcixcclxuICAgICAgICAgICAgZGw6IG8uZmRyLFxyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIGRyb3dfY2VsbChyZWN0LCB0aGlzLmNvbF9zKCksIHRoaXMuY29sX2woKSk7XHJcbiAgICB9XHJcbiAgICBcclxuXHJcbiAgICBwdWJsaWMgZW5jb2RlKCk6IEpTT05fTWF6ZU9ialZpZXcge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGNuYW1lOiAgIHRoaXMuY2xuYW1lLFxyXG4gICAgICAgICAgICBsYXllcjogICB0aGlzLm15X2xheWVyLFxyXG4gICAgICAgICAgICBsZXR0ZXI6ICB0aGlzLm15X2xldHRlciA/PyAnJyxcclxuICAgICAgICAgICAgcGFkX3Q6ICAgdGhpcy5teV9wYWRfdCwgXHJcbiAgICAgICAgICAgIHBhZF9kOiAgIHRoaXMubXlfcGFkX2QsIFxyXG4gICAgICAgICAgICBwYWRfczogICB0aGlzLm15X3BhZF9zLCBcclxuICAgICAgICAgICAgc2hvdzNEOiAgdGhpcy5jYW5TaG93KCkgPyAnMScgOiAnMCcsXHJcbiAgICAgICAgICAgIGNvbF9mOiAgIHRoaXMubXlfY29sX2YgPz8gJycsICBcclxuICAgICAgICAgICAgY29sX2I6ICAgdGhpcy5teV9jb2xfYiA/PyAnJywgIFxyXG4gICAgICAgICAgICBjb2xfczogICB0aGlzLm15X2NvbF9zID8/ICcnLCBcclxuICAgICAgICAgICAgY29sX3Q6ICAgdGhpcy5teV9jb2xfdCA/PyAnJywgXHJcbiAgICAgICAgICAgIGNvbF9kOiAgIHRoaXMubXlfY29sX2QgPz8gJycsIFxyXG4gICAgICAgICAgICBjb2xfbDogICB0aGlzLm15X2NvbF9sID8/ICcnLCBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZGVjb2RlKGo6IEpTT05fTWF6ZU9ialZpZXd8dW5kZWZpbmVkKTogSV9NYXplT2JqVmlldyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX19pbml0KGopO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHN0YXRpYyBkZWNvZGUoajogSlNPTl9NYXplT2JqVmlld3x1bmRlZmluZWQpOiBJX01hemVPYmpWaWV3IHtcclxuICAgICAgICByZXR1cm4gQ19NYXplT2JqVmlldy5uZXdPYmooaik7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5cclxuZnVuY3Rpb24gX19jYWxjX3BhZGRpbmdfb2JqKFxyXG4gICAgb2JqOiAgIElfTWF6ZU9ialZpZXcsXHJcbiAgICBmcm90OiAgVF9XYWxsLCBcclxuICAgIGJhY2s6ICBUX1dhbGwsIFxyXG4pOiB7XHJcbiAgICAvLyDorZjliKXlrZDjga7mhI/lkbNcclxuICAgIC8vIOW3puerr++8muWJjeW+jOOBruWMuuWIpeOAgGY65YmN6Z2i44CAYjrog4zpnaJcclxuICAgIC8vIOS4reWkru+8muS4iuS4i+OBruWMuuWIpeOAgHQ65LiK6L6644CAZDrkuIvovrpcclxuICAgIC8vIOWPs+err++8muW3puWPs+OBruWMuuWIpeOAgGw65bem5YG044CAcjrlj7PlgbRcclxuICAgIGZ0bDpUX3h5LCBmdHI6VF94eSwgZmRyOlRfeHksIGZkbDpUX3h5LCBcclxuICAgIGJ0bDpUX3h5LCBidHI6VF94eSwgYmRyOlRfeHksIGJkbDpUX3h5LCBcclxufSB7XHJcbiAgICBjb25zdCByZWN0X2Zyb3QgPSBmcm90O1xyXG4gICAgY29uc3QgcmVjdF9iYWNrID0gYmFjaztcclxuXHJcbiAgICBjb25zdCByYXRpb19YICAgPSBvYmoucGFkX3MoKSAvIDIuMDtcclxuICAgIGNvbnN0IHJhdGlvX1QgICA9IG9iai5wYWRfdCgpO1xyXG4gICAgY29uc3QgcmF0aW9fRCAgID0gb2JqLnBhZF9kKCk7XHJcblxyXG4gICAgY29uc3QgZnJvdF9wYWRfWCAgPSBNYXRoLmFicyhyZWN0X2Zyb3QubWF4X3ggLSByZWN0X2Zyb3QubWluX3gpICogcmF0aW9fWDtcclxuICAgIGNvbnN0IGJhY2tfcGFkX1ggID0gTWF0aC5hYnMocmVjdF9iYWNrLm1heF94IC0gcmVjdF9iYWNrLm1pbl94KSAqIHJhdGlvX1g7XHJcblxyXG4gICAgY29uc3QgZnJvdF9wYWRfVCAgPSBNYXRoLmFicyhyZWN0X2Zyb3QubWF4X3kgLSByZWN0X2Zyb3QubWluX3kpICogcmF0aW9fVDtcclxuICAgIGNvbnN0IGJhY2tfcGFkX1QgID0gTWF0aC5hYnMocmVjdF9iYWNrLm1heF95IC0gcmVjdF9iYWNrLm1pbl95KSAqIHJhdGlvX1Q7XHJcblxyXG4gICAgY29uc3QgZnJvdF9wYWRfRCAgPSBNYXRoLmFicyhyZWN0X2Zyb3QubWF4X3kgLSByZWN0X2Zyb3QubWluX3kpICogcmF0aW9fRDtcclxuICAgIGNvbnN0IGJhY2tfcGFkX0QgID0gTWF0aC5hYnMocmVjdF9iYWNrLm1heF95IC0gcmVjdF9iYWNrLm1pbl95KSAqIHJhdGlvX0Q7XHJcblxyXG4gICAgLy8g44OR44OH44Kj44Oz44Kw6Kit5a6a5b6M44GuWFnluqfmqJnjgpLoqIjnrpfjgZnjgovjgZ/jgoHjgatcclxuICAgIC8vIOW/heimgeOBque3muWIhuOBruS9jee9ruaxuuOCgeOCkuOBmeOCi1xyXG4gICAgY29uc3QgZnJvdF90b3BfbGZ0ID0ge3g6IHJlY3RfZnJvdC5taW5feCArIGZyb3RfcGFkX1gsIHk6IHJlY3RfZnJvdC5taW5feSArIGZyb3RfcGFkX1R9XHJcbiAgICBjb25zdCBmcm90X3RvcF9yZ3QgPSB7eDogcmVjdF9mcm90Lm1heF94IC0gZnJvdF9wYWRfWCwgeTogcmVjdF9mcm90Lm1pbl95ICsgZnJvdF9wYWRfVH1cclxuICAgIGNvbnN0IGZyb3RfZHduX2xmdCA9IHt4OiByZWN0X2Zyb3QubWluX3ggKyBmcm90X3BhZF9YLCB5OiByZWN0X2Zyb3QubWF4X3kgLSBmcm90X3BhZF9EfVxyXG4gICAgY29uc3QgZnJvdF9kd25fcmd0ID0ge3g6IHJlY3RfZnJvdC5tYXhfeCAtIGZyb3RfcGFkX1gsIHk6IHJlY3RfZnJvdC5tYXhfeSAtIGZyb3RfcGFkX0R9XHJcblxyXG4gICAgY29uc3QgYmFja190b3BfbGZ0ID0ge3g6IHJlY3RfYmFjay5taW5feCArIGJhY2tfcGFkX1gsIHk6IHJlY3RfYmFjay5taW5feSArIGJhY2tfcGFkX1R9XHJcbiAgICBjb25zdCBiYWNrX3RvcF9yZ3QgPSB7eDogcmVjdF9iYWNrLm1heF94IC0gYmFja19wYWRfWCwgeTogcmVjdF9iYWNrLm1pbl95ICsgYmFja19wYWRfVH1cclxuICAgIGNvbnN0IGJhY2tfZHduX2xmdCA9IHt4OiByZWN0X2JhY2subWluX3ggKyBiYWNrX3BhZF9YLCB5OiByZWN0X2JhY2subWF4X3kgLSBiYWNrX3BhZF9EfVxyXG4gICAgY29uc3QgYmFja19kd25fcmd0ID0ge3g6IHJlY3RfYmFjay5tYXhfeCAtIGJhY2tfcGFkX1gsIHk6IHJlY3RfYmFjay5tYXhfeSAtIGJhY2tfcGFkX0R9XHJcblxyXG4gICAgbGV0IGZ0bCA9IF9fY2FsY19wYWRkaW5nX3h5KGZyb3RfdG9wX2xmdCwgYmFja190b3BfbGZ0LCByYXRpb19YKTtcclxuICAgIGxldCBmdHIgPSBfX2NhbGNfcGFkZGluZ194eShmcm90X3RvcF9yZ3QsIGJhY2tfdG9wX3JndCwgcmF0aW9fWCk7XHJcbiAgICBsZXQgZmRsID0gX19jYWxjX3BhZGRpbmdfeHkoZnJvdF9kd25fbGZ0LCBiYWNrX2R3bl9sZnQsIHJhdGlvX1gpO1xyXG4gICAgbGV0IGZkciA9IF9fY2FsY19wYWRkaW5nX3h5KGZyb3RfZHduX3JndCwgYmFja19kd25fcmd0LCByYXRpb19YKTtcclxuXHJcbiAgICBsZXQgYnRsID0gX19jYWxjX3BhZGRpbmdfeHkoYmFja190b3BfbGZ0LCBmcm90X3RvcF9sZnQsIHJhdGlvX1gpO1xyXG4gICAgbGV0IGJ0ciA9IF9fY2FsY19wYWRkaW5nX3h5KGJhY2tfdG9wX3JndCwgZnJvdF90b3Bfcmd0LCByYXRpb19YKTtcclxuICAgIGxldCBiZGwgPSBfX2NhbGNfcGFkZGluZ194eShiYWNrX2R3bl9sZnQsIGZyb3RfZHduX2xmdCwgcmF0aW9fWCk7XHJcbiAgICBsZXQgYmRyID0gX19jYWxjX3BhZGRpbmdfeHkoYmFja19kd25fcmd0LCBmcm90X2R3bl9yZ3QsIHJhdGlvX1gpO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgZnRsOiBmdGwsIGZ0cjogZnRyLFxyXG4gICAgICAgIGZkbDogZmRsLCBmZHI6IGZkcixcclxuICAgICAgICBidGw6IGJ0bCwgYnRyOiBidHIsXHJcbiAgICAgICAgYmRsOiBiZGwsIGJkcjogYmRyLFxyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIF9fY2FsY19wYWRkaW5nX3h5KGZyb3Q6IFRfeHksIGJhY2s6IFRfeHksIHJhdGlvOiBudW1iZXIpOiBUX3h5IHtcclxuICAgICAgICAvLyDnt5rliIYoQXggKyBCID0geSnjga7mlrnnqIvlvI/jga7kv4LmlbDjgpLmsYLjgoHjgotcclxuICAgICAgICBjb25zdCBBID0gKGZyb3QueSAtIGJhY2sueSkgLyAoZnJvdC54IC0gYmFjay54KTtcclxuICAgICAgICBjb25zdCBCID0gIGZyb3QueSAtIEEgKiBmcm90Lng7XHJcbiAgICBcclxuICAgICAgICAvLyDjg5Hjg4fjgqPjg7PjgrDoqr/mlbTlvozjga5YWeW6p+aomeOBruioiOeul1xyXG4gICAgICAgIGNvbnN0IHBfZnJvdF94ID0gZnJvdC54ICsgKGJhY2sueCAtIGZyb3QueCkgKiByYXRpbztcclxuICAgICAgICBjb25zdCBwX2Zyb3RfeSA9IEEgKiBwX2Zyb3RfeCArIEI7XHJcblxyXG4gICAgICAgIHJldHVybiB7eDogcF9mcm90X3gsIHk6IHBfZnJvdF95fTtcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIGRyb3dfY2VsbF9mbG9vcihcclxuICAgICAgICByZWN0X2Zyb3Q6IFRfV2FsbCwgXHJcbiAgICAgICAgcmVjdF9iYWNrOiBUX1dhbGwsIFxyXG4gICAgICAgIGZpbGw6IHN0cmluZyA9ICcjNjY2NmZmJywgXHJcbiAgICAgICAgbGluZTogc3RyaW5nID0gJyM5OTk5ZmYnXHJcbiAgICApOiB2b2lkIHtcclxuXHJcbiAgICBjb25zdCByZWN0OiBUX1JlY3QgPSB7XHJcbiAgICAgICAgdGw6IHt4OiByZWN0X2Zyb3QubWluX3gsIHk6IHJlY3RfZnJvdC5tYXhfeX0sXHJcbiAgICAgICAgdHI6IHt4OiByZWN0X2Zyb3QubWF4X3gsIHk6IHJlY3RfZnJvdC5tYXhfeX0sXHJcbiAgICAgICAgZHI6IHt4OiByZWN0X2JhY2subWF4X3gsIHk6IHJlY3RfYmFjay5tYXhfeX0sXHJcbiAgICAgICAgZGw6IHt4OiByZWN0X2JhY2subWluX3gsIHk6IHJlY3RfYmFjay5tYXhfeX1cclxuICAgIH1cclxuICAgIGRyb3dfY2VsbChyZWN0LCBmaWxsLCBsaW5lKTtcclxufVxyXG5mdW5jdGlvbiBkcm93X2NlbGxfY2VpbGluZyhcclxuICAgICAgICByZWN0X2Zyb3Q6IFRfV2FsbCwgXHJcbiAgICAgICAgcmVjdF9iYWNrOiBUX1dhbGwsIFxyXG4gICAgICAgIGZpbGw6IHN0cmluZyA9ICcjYWFhYWFhJywgXHJcbiAgICAgICAgbGluZTogc3RyaW5nID0gJyM5OTk5ZmYnXHJcbiAgICApOiB2b2lkIHtcclxuXHJcbiAgICBjb25zdCByZWN0OiBUX1JlY3QgPSB7XHJcbiAgICAgICAgdGw6IHt4OiByZWN0X2Zyb3QubWluX3gsIHk6IHJlY3RfZnJvdC5taW5feX0sXHJcbiAgICAgICAgdHI6IHt4OiByZWN0X2Zyb3QubWF4X3gsIHk6IHJlY3RfZnJvdC5taW5feX0sXHJcbiAgICAgICAgZHI6IHt4OiByZWN0X2JhY2subWF4X3gsIHk6IHJlY3RfYmFjay5taW5feX0sXHJcbiAgICAgICAgZGw6IHt4OiByZWN0X2JhY2subWluX3gsIHk6IHJlY3RfYmFjay5taW5feX1cclxuICAgIH1cclxuICAgIGRyb3dfY2VsbChyZWN0LCBmaWxsLCBsaW5lKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZHJvd19jZWxsKHI6IFRfUmVjdCwgZmlsbDogc3RyaW5nfG51bGwsIGxpbmU6IHN0cmluZ3xudWxsKTogdm9pZCB7XHJcbiAgICBpZiAoQ19NYXplT2JqVmlldy5jb24zRCA9PT0gdW5kZWZpbmVkKSByZXR1cm47XHJcbiAgICBjb25zdCBjb24gPSBDX01hemVPYmpWaWV3LmNvbjNEO1xyXG5cclxuICAgIGNvbi5iZWdpblBhdGgoKTtcclxuICAgIGNvbi5tb3ZlVG8oci50bC54LCByLnRsLnkpO1xyXG4gICAgY29uLmxpbmVUbyhyLnRyLngsIHIudHIueSk7XHJcbiAgICBjb24ubGluZVRvKHIuZHIueCwgci5kci55KTtcclxuICAgIGNvbi5saW5lVG8oci5kbC54LCByLmRsLnkpO1xyXG4gICAgY29uLmNsb3NlUGF0aCgpO1xyXG5cclxuICAgIGlmIChmaWxsICE9IG51bGwpIHtcclxuICAgICAgICBjb24uZmlsbFN0eWxlICAgPSBmaWxsO1xyXG4gICAgICAgIGNvbi5maWxsKCk7XHJcbiAgICB9XHJcbiAgICBpZiAobGluZSAhPT0gbnVsbCkge1xyXG4gICAgICAgIGNvbi5zdHJva2VTdHlsZSA9IGxpbmU7XHJcbiAgICAgICAgY29uLmxpbmVXaWR0aCAgID0gMTtcclxuICAgICAgICBjb24uc3Ryb2tlKCk7XHJcbiAgICB9XHJcbn1cclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5pbXBvcnQgeyBDX0xvY2F0aW9uLCBKU09OX0xvY2F0aW9uIH0gZnJvbSBcIi4vQ19Mb2NhdGlvblwiO1xyXG5pbXBvcnQgeyBJX0pTT05fVW5pcSB9ICAgICAgICAgICAgICAgZnJvbSBcIi4vQ19TYXZlSW5mb1wiO1xyXG5pbXBvcnQgeyBfZ2V0X3V1aWQgfSAgICAgICAgICAgICAgICAgZnJvbSBcIi4uL2RfdXRsL0ZfUmFuZFwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBKU09OX01vdmFibGVQb2ludCBleHRlbmRzIEpTT05fTG9jYXRpb24ge1xyXG4gICAgdW5pcV9pZD86ICBzdHJpbmcsXHJcbiAgICBjdXJfdXJsPzogIHN0cmluZyxcclxuICAgIHRlYW1fdWlkPzogc3RyaW5nLFxyXG59XHJcblxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFsZXJ0X212cHRfaW5mbyhhOiBKU09OX01vdmFibGVQb2ludHx1bmRlZmluZWQpOiB2b2lkIHtcclxuICAgIGlmIChhID09PSB1bmRlZmluZWQpIHJldHVybjtcclxuICAgIGFsZXJ0KFwiTXZQdCBJbmZvOlwiIFxyXG4gICAgICAgICsgXCJcXG51bmlxX2lkOiAgXCIgICsgKGEudW5pcV9pZCAgICA/PyAnPycpXHJcbiAgICAgICAgKyBcIlxcbmN1cl91cmw6ICBcIiAgKyAoYS5jdXJfdXJsICAgID8/ICc/JylcclxuICAgICAgICArIFwiXFxudGVhbV91aWQ6IFwiICArIChhLnRlYW1fdWlkICAgPz8gJz8nKVxyXG4gICAgICAgICsgXCJcXG5sY2tkOiBcIiAgICAgICsgKGEua2luZCAgICAgICA/PyAnPycpXHJcbiAgICAgICAgKyBcIlxcbmxjbm06IFwiICAgICAgKyAoYS5uYW1lICAgICAgID8/ICc/JylcclxuICAgICAgICArIFwiXFxubGNpZDogXCIgICAgICArIChhLmxvY191aWQgICAgPz8gJz8nKVxyXG4gICAgICAgICsgXCJcXG5jdXJfeDogXCIgICAgICsgKGEubG9jX3Bvcz8ueCA/PyAnPycpXHJcbiAgICAgICAgKyBcIlxcbmN1cl95OiBcIiAgICAgKyAoYS5sb2NfcG9zPy55ID8/ICc/JylcclxuICAgICAgICArIFwiXFxuY3VyX3o6IFwiICAgICArIChhLmxvY19wb3M/LnogPz8gJz8nKVxyXG4gICAgICAgICsgXCJcXG5jdXJfZDogXCIgICAgICsgKGEubG9jX3Bvcz8uZCA/PyAnPycpXHJcbiAgICAgICAgKyBcIlxcblwiXHJcbiAgICApO1xyXG59XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIENfTW92YWJsZVBvaW50IGV4dGVuZHMgQ19Mb2NhdGlvbiBpbXBsZW1lbnRzIElfSlNPTl9VbmlxIHtcclxuICAgIHByb3RlY3RlZCB1bmlxX2lkOiAgc3RyaW5nO1xyXG4gICAgcHJvdGVjdGVkIGN1cl91cmw6ICBzdHJpbmc7XHJcbiAgICBwcm90ZWN0ZWQgdGVhbV91aWQ6IHN0cmluZ3x1bmRlZmluZWQ7XHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoanNvbj86IEpTT05fTW92YWJsZVBvaW50KSB7XHJcbiAgICAgICAgc3VwZXIoanNvbik7XHJcbiAgICAgICAgdGhpcy51bmlxX2lkICA9ICdNdlBvaW50IycgKyBfZ2V0X3V1aWQoKTtcclxuICAgICAgICB0aGlzLmN1cl91cmwgID0gJyc7XHJcbiAgICAgICAgdGhpcy50ZWFtX3VpZCA9IHVuZGVmaW5lZDtcclxuXHJcbiAgICAgICAgaWYgKGpzb24gIT09IHVuZGVmaW5lZCAmJiBqc29uICE9PSBudWxsKSB0aGlzLmRlY29kZShqc29uKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyB1aWQoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMudW5pcV9pZH1cclxuICAgIHB1YmxpYyB1cmwoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuY3VyX3VybH1cclxuICAgIHB1YmxpYyB0aWQoKTogc3RyaW5nfHVuZGVmaW5lZCB7IHJldHVybiB0aGlzLnRlYW1fdWlkfVxyXG5cclxuICAgIHB1YmxpYyBuZXdfdWlkKCk6IHZvaWQge3RoaXMudW5pcV9pZCA9ICdNdlBvaW50IycgKyBfZ2V0X3V1aWQoKTt9XHJcbiAgICBwdWJsaWMgc2V0X3VybCh1cmw6IHN0cmluZyk6IHZvaWQgeyB0aGlzLmN1cl91cmwgID0gdXJsO31cclxuICAgIHB1YmxpYyBzZXRfdGlkKHRpZDogc3RyaW5nKTogdm9pZCB7IHRoaXMudGVhbV91aWQgPSB0aWQ7fVxyXG5cclxuICAgIHB1YmxpYyBjbG9uZSgpOiBDX01vdmFibGVQb2ludCB7XHJcbiAgICAgICAgY29uc3QgbXZwdCA9IG5ldyBDX01vdmFibGVQb2ludCh0aGlzLmVuY29kZSgpKTtcclxuICAgICAgICBtdnB0Lm5ld191aWQoKTtcclxuICAgICAgICByZXR1cm4gbXZwdDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZnJvbUpTT04odHh0OiBzdHJpbmcpOiBDX01vdmFibGVQb2ludCB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgaiA9IEpTT04ucGFyc2UodHh0KSBhcyBKU09OX01vdmFibGVQb2ludDtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGVjb2RlKGopO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgcHVibGljIHRvSlNPTigpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh0aGlzLmVuY29kZSgpLCBudWxsLCBcIlxcdFwiKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGZyb21fb2JqX3RvX3N0cmluZyhvYTogQ19Nb3ZhYmxlUG9pbnQpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShvYS5lbmNvZGUoKSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc3RhdGljIGZyb21fb2JqQXJyYXlfdG9fc3RyaW5nKG9hYToge1t1aWQ6IHN0cmluZ106IENfTW92YWJsZVBvaW50fSk6IHN0cmluZyB7XHJcbiAgICAgICAgY29uc3Qgb2EgPSBbXSBhcyBKU09OX01vdmFibGVQb2ludFtdO1xyXG4gICAgICAgIGZvciAoY29uc3QgaWkgaW4gb2FhKSBvYS5wdXNoKG9hYVtpaV0uZW5jb2RlKCkpO1xyXG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShvYSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc3RhdGljIGZyb21fc3RyaW5nX3RvX29iaih0eHQ6IHN0cmluZyk6IENfTW92YWJsZVBvaW50IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCBqICAgPSBKU09OLnBhcnNlKHR4dCkgYXMgSlNPTl9Nb3ZhYmxlUG9pbnRbXTtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBDX01vdmFibGVQb2ludCgpLmRlY29kZShqKTtcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBDX01vdmFibGVQb2ludCgpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc3RhdGljIGZyb21fc3RyaW5nX3RvX29iakFycmF5KHR4dDogc3RyaW5nKToge1t1aWQ6IHN0cmluZ106IENfTW92YWJsZVBvaW50fSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgaiAgID0gSlNPTi5wYXJzZSh0eHQpIGFzIEpTT05fTW92YWJsZVBvaW50W107XHJcbiAgICAgICAgICAgIGNvbnN0IG1wYSA9IHt9IGFzIHtbaWQ6IHN0cmluZ106IENfTW92YWJsZVBvaW50fTtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBqaiBvZiBqKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBhYWEgPSBuZXcgQ19Nb3ZhYmxlUG9pbnQoKS5kZWNvZGUoamopO1xyXG4gICAgICAgICAgICAgICAgbXBhW2FhYS51aWQoKV0gPSBhYWE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG1wYTtcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHt9O1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGVuY29kZSgpOiBKU09OX01vdmFibGVQb2ludCB7XHJcbiAgICAgICAgY29uc3QgaiA9IHN1cGVyLmVuY29kZSgpIGFzIEpTT05fTW92YWJsZVBvaW50O1xyXG4gICAgICAgIGoudW5pcV9pZCAgPSB0aGlzLnVuaXFfaWQ7XHJcbiAgICAgICAgai5jdXJfdXJsICA9IHRoaXMuY3VyX3VybDtcclxuICAgICAgICBqLnRlYW1fdWlkID0gdGhpcy50ZWFtX3VpZCA/PyAnJztcclxuICAgICAgICByZXR1cm4gajtcclxuICAgIH1cclxuICAgIHB1YmxpYyBkZWNvZGUoaj86IEpTT05fTW92YWJsZVBvaW50KTogQ19Nb3ZhYmxlUG9pbnQge1xyXG4gICAgICAgIHN1cGVyLmRlY29kZShqKTtcclxuICAgICAgICBpZiAoaiA9PT0gdW5kZWZpbmVkKSByZXR1cm4gdGhpcztcclxuICAgICAgICBpZiAoai51bmlxX2lkICAhPT0gdW5kZWZpbmVkKSB0aGlzLnVuaXFfaWQgID0gai51bmlxX2lkO1xyXG4gICAgICAgIGlmIChqLmN1cl91cmwgICE9PSB1bmRlZmluZWQpIHRoaXMuY3VyX3VybCAgPSBqLmN1cl91cmw7XHJcbiAgICAgICAgaWYgKGoudGVhbV91aWQgIT09IHVuZGVmaW5lZCkgdGhpcy50ZWFtX3VpZCA9IGoudGVhbV91aWQ7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnRlYW1fdWlkID09PSAnJykgdGhpcy50ZWFtX3VpZCA9IHVuZGVmaW5lZDtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIGFsZXJ0KCk6IHZvaWQge1xyXG4gICAgICAgIGFsZXJ0KFwiTXZQdCBJbmZvOlwiIFxyXG4gICAgICAgICAgICArIFwiXFxudW5pcV9pZDogIFwiICArICh0aGlzLnVuaXFfaWQgICAgPz8gJz8nKVxyXG4gICAgICAgICAgICArIFwiXFxuY3VyX3VybDogIFwiICArICh0aGlzLmN1cl91cmwgICAgPz8gJz8nKVxyXG4gICAgICAgICAgICArIFwiXFxudGVhbV91aWQ6IFwiICArICh0aGlzLnRlYW1fdWlkICAgPz8gJz8nKVxyXG4gICAgICAgICAgICArIFwiXFxubGNrZDogXCIgICAgICArICh0aGlzLmxvY19raW5kICAgPz8gJz8nKVxyXG4gICAgICAgICAgICArIFwiXFxubGNubTogXCIgICAgICArICh0aGlzLmxvY19uYW1lICAgPz8gJz8nKVxyXG4gICAgICAgICAgICArIFwiXFxubGNpZDogXCIgICAgICArICh0aGlzLmxvY191aWQgICAgPz8gJz8nKVxyXG4gICAgICAgICAgICArIFwiXFxuY3VyX3g6IFwiICAgICArICh0aGlzLmxvY19wb3M/LnggPz8gJz8nKVxyXG4gICAgICAgICAgICArIFwiXFxuY3VyX3k6IFwiICAgICArICh0aGlzLmxvY19wb3M/LnkgPz8gJz8nKVxyXG4gICAgICAgICAgICArIFwiXFxuY3VyX3o6IFwiICAgICArICh0aGlzLmxvY19wb3M/LnogPz8gJz8nKVxyXG4gICAgICAgICAgICArIFwiXFxuY3VyX2Q6IFwiICAgICArICh0aGlzLmxvY19wb3M/LmQgPz8gJz8nKVxyXG4gICAgICAgICAgICArIFwiXFxuXCJcclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5cclxuaW1wb3J0IHsgSV9KU09OLCBKU09OX0FueSB9IGZyb20gXCIuL0NfU2F2ZUluZm9cIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSlNPTl9Qb2ludCBleHRlbmRzIEpTT05fQW55IHtcclxuICAgIHg/OiBudW1iZXIsXHJcbiAgICB5PzogbnVtYmVyLFxyXG4gICAgej86IG51bWJlcixcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIENfUG9pbnQgaW1wbGVtZW50cyBJX0pTT057XHJcbiAgICBwdWJsaWMgeDogbnVtYmVyO1xyXG4gICAgcHVibGljIHk6IG51bWJlcjtcclxuICAgIHB1YmxpYyB6OiBudW1iZXI7XHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoeD86IG51bWJlcnxDX1BvaW50fEpTT05fUG9pbnR8dW5kZWZpbmVkLCB5PzogbnVtYmVyLCB6PzogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy54ID0gdGhpcy55ID0gdGhpcy56ID0gLTM7XHJcblxyXG4gICAgICAgIGlmICh4ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy54ID0gMDsgdGhpcy55ID0gMDsgdGhpcy56ID0gMDtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIHggPT09IFwibnVtYmVyXCIgJiYgdHlwZW9mIHkgPT09IFwibnVtYmVyXCIgJiYgdHlwZW9mIHogPT09IFwibnVtYmVyXCIpIHtcclxuICAgICAgICAgICAgdGhpcy54ID0geDsgdGhpcy55ID0geTsgdGhpcy56ID0gejtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIHggPT09IFwib2JqZWN0XCIpIHsgXHJcbiAgICAgICAgICAgIGlmICh4IGluc3RhbmNlb2YgQ19Qb2ludCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy54ID0geC54OyB0aGlzLnkgPSB4Lnk7IHRoaXMueiA9IHguejtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGVjb2RlKHgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMueCA9IHRoaXMueSA9IHRoaXMueiA9IC0yO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0X3AoKTogQ19Qb2ludCB7cmV0dXJuIG5ldyBDX1BvaW50KHRoaXMpfSBcclxuICAgIHB1YmxpYyBzZXRfcChwOiBDX1BvaW50KTogQ19Qb2ludHx1bmRlZmluZWQge1xyXG4gICAgICAgIHRoaXMueCA9IHAueDsgdGhpcy55ID0gcC55OyB0aGlzLnogPSBwLno7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGlzX2V4aXN0KHg6IG51bWJlciwgeTogbnVtYmVyLCB6OiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gKHggPT0gdGhpcy54ICYmIHkgPT0gdGhpcy55ICYmIHogPT0gdGhpcy56KTtcclxuICAgIH1cclxuICAgIHB1YmxpYyB3aXRoaW4ocDogQ19Qb2ludCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiAocC54ID09IHRoaXMueCAmJiBwLnkgPT0gdGhpcy55ICYmIHAueiA9PSB0aGlzLnopO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgZW5jb2RlKCk6IEpTT05fUG9pbnQge1xyXG4gICAgICAgIHJldHVybiB7eDogdGhpcy54LCB5OiB0aGlzLnksIHo6IHRoaXMuen07XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZGVjb2RlKGE/OiBKU09OX1BvaW50KTogQ19Qb2ludCB7XHJcbiAgICAgICAgaWYgKGEgPT09IHVuZGVmaW5lZCkgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgaWYgKGEueCA9PT0gdW5kZWZpbmVkIHx8IGEueSA9PT0gdW5kZWZpbmVkIHx8IGEueiA9PT0gdW5kZWZpbmVkKSByZXR1cm4gdGhpcztcclxuICAgICAgICB0aGlzLnggPSBhLng7IHRoaXMueSA9IGEueTsgdGhpcy56ID0gYS56O1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG59XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5cclxuaW1wb3J0IHsgQ19Qb2ludCwgSlNPTl9Qb2ludCB9IGZyb20gJy4vQ19Qb2ludCc7XHJcbmltcG9ydCB7VF9NYWtlRW51bVR5cGV9ICAgICAgICBmcm9tIFwiLi4vZF91dGwvVF9NYWtlRW51bVR5cGVcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBUX0RpcmVjdGlvbjp7W2Rpcjogc3RyaW5nXTogbnVtYmVyfSA9IHtcclxuICAgIE46IDAsXHJcbiAgICBFOiAxLFxyXG4gICAgUzogMixcclxuICAgIFc6IDMsXHJcbiAgICBYOiA5OVxyXG59IGFzIGNvbnN0O1xyXG5leHBvcnQgdHlwZSBUX0RpcmVjdGlvbiA9IFRfTWFrZUVudW1UeXBlPHR5cGVvZiBUX0RpcmVjdGlvbj47XHJcblxyXG5mdW5jdGlvbiBfZGlyX2tleShkaXI6IFRfRGlyZWN0aW9uIHwgdW5kZWZpbmVkKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBPYmplY3Qua2V5cyhUX0RpcmVjdGlvbikuZmluZChrZXkgPT4gVF9EaXJlY3Rpb25ba2V5XSA9PT0gZGlyKSA/PyBcIj8/Pz9cIjtcclxufVxyXG5cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSlNPTl9Qb2ludERpciBleHRlbmRzIEpTT05fUG9pbnQge1xyXG4gICAgZD86IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFsZXJ0X1BEX2luZm8oYTogSlNPTl9Qb2ludERpcnx1bmRlZmluZWQpOiB2b2lkIHtcclxuICAgIGlmIChhID09PSB1bmRlZmluZWQpIHJldHVybjtcclxuICAgIGFsZXJ0KFwiUG9pbnREYXRhIEluZm86XCIgXHJcbiAgICAgICAgKyBcIlxcbng6IFwiICAgICArIChhPy54ID8/ICc/JylcclxuICAgICAgICArIFwiXFxueTogXCIgICAgICsgKGE/LnkgPz8gJz8nKVxyXG4gICAgICAgICsgXCJcXG56OiBcIiAgICAgKyAoYT8ueiA/PyAnPycpXHJcbiAgICAgICAgKyBcIlxcbmQ6IFwiICAgICArIChhPy5kID8/ICc/JylcclxuICAgICAgICArIFwiXFxuXCJcclxuICAgICk7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyAgQ19Qb2ludERpciBleHRlbmRzIENfUG9pbnQge1xyXG4gICAgcHVibGljIGQ6IFRfRGlyZWN0aW9uO1xyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKGQ/OiBudW1iZXJ8VF9EaXJlY3Rpb258Q19Qb2ludERpcnxKU09OX1BvaW50RGlyKSB7XHJcbiAgICAgICAgc3VwZXIoZCk7XHJcbiAgICAgICAgdGhpcy5kID0gVF9EaXJlY3Rpb24uWDtcclxuXHJcbiAgICAgICAgaWYgKGQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2YgZCA9PT0gXCJudW1iZXJcIikge1xyXG4gICAgICAgICAgICB0aGlzLmQgPSBkIGFzIFRfRGlyZWN0aW9uO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2YgZCA9PT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgICAgICBpZiAoZCBpbnN0YW5jZW9mIENfUG9pbnREaXIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZCA9IGQuZCBhcyBUX0RpcmVjdGlvbjtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGVjb2RlKGQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5kID0gVF9EaXJlY3Rpb24uWDtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0X2RfbWJfbmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHN3aXRjaCAodGhpcy5kKSB7XHJcbiAgICAgICAgICAgIGNhc2UgMDogIHJldHVybiAn5YyXJztcclxuICAgICAgICAgICAgY2FzZSAxOiAgcmV0dXJuICfmnbEnO1xyXG4gICAgICAgICAgICBjYXNlIDI6ICByZXR1cm4gJ+WNlyc7XHJcbiAgICAgICAgICAgIGNhc2UgMzogIHJldHVybiAn6KW/JztcclxuICAgICAgICAgICAgZGVmYXVsdDogcmV0dXJuICforI4nO1xyXG4gICAgICAgIH0gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRfZCgpOiBUX0RpcmVjdGlvbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXRfZChkOiBUX0RpcmVjdGlvbik6IENfUG9pbnREaXJ8dW5kZWZpbmVkIHtcclxuICAgICAgICBpZiAoIShfZGlyX2tleShkKSBpbiBUX0RpcmVjdGlvbikpIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhpcy5kID0gZDtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRfcGQoKTogQ19Qb2ludERpciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0X3BkKGQ6IENfUG9pbnREaXJ8SlNPTl9Qb2ludERpcik6IENfUG9pbnREaXJ8dW5kZWZpbmVkIHtcclxuICAgICAgICBpZiAoZCBpbnN0YW5jZW9mIENfUG9pbnREaXIpIHtcclxuICAgICAgICAgICAgaWYgKCEoX2Rpcl9rZXkoZC5kKSBpbiBUX0RpcmVjdGlvbikpIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIHN1cGVyLnNldF9wKGQpO1xyXG4gICAgICAgICAgICB0aGlzLmQgPSBkLmQ7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIShfZGlyX2tleShkLmQpIGluIFRfRGlyZWN0aW9uKSkgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB0aGlzLmRlY29kZShkKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZW5jb2RlKCk6IEpTT05fUG9pbnREaXIge1xyXG4gICAgICAgIGNvbnN0IGogPSBzdXBlci5lbmNvZGUoKSBhcyBKU09OX1BvaW50RGlyO1xyXG4gICAgICAgIGouZCAgICAgPSB0aGlzLmQgYXMgbnVtYmVyO1xyXG4gICAgICAgIHJldHVybiBqO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGRlY29kZShqPzogSlNPTl9Qb2ludERpcik6IENfUG9pbnREaXIge1xyXG4gICAgICAgIGlmIChqID09PSB1bmRlZmluZWQpIHJldHVybiB0aGlzO1xyXG4gICAgICAgIGlmICghKF9kaXJfa2V5KGouZCkgaW4gVF9EaXJlY3Rpb24pKSByZXR1cm4gdGhpcztcclxuXHJcbiAgICAgICAgc3VwZXIuZGVjb2RlKGopO1xyXG4gICAgICAgIHRoaXMuZCA9IGouZCBhcyBUX0RpcmVjdGlvbjtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIGFsZXJ0KCk6IHZvaWQge1xyXG4gICAgICAgIGFsZXJ0KFwiUG9pbnREYXRhIEluZm86XCIgXHJcbiAgICAgICAgICAgICsgXCJcXG54OiBcIiAgICAgKyAodGhpcy54ID8/ICc/JylcclxuICAgICAgICAgICAgKyBcIlxcbnk6IFwiICAgICArICh0aGlzLnkgPz8gJz8nKVxyXG4gICAgICAgICAgICArIFwiXFxuejogXCIgICAgICsgKHRoaXMueiA/PyAnPycpXHJcbiAgICAgICAgICAgICsgXCJcXG5kOiBcIiAgICAgKyAodGhpcy5kID8/ICc/JylcclxuICAgICAgICAgICAgKyBcIlxcblwiXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG4iLCJjbGFzcyBDX1BvaW50MkQge1xyXG4gICAgcHVibGljIHg6IG51bWJlcjtcclxuICAgIHB1YmxpYyB5OiBudW1iZXI7XHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoeDogbnVtYmVyID0gMCwgeTogbnVtYmVyID0gMClcclxuICAgIHtcclxuICAgICAgICB0aGlzLnggID0geDtcclxuICAgICAgICB0aGlzLnkgID0geTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBpc19leGlzdCh4OiBudW1iZXIsIHk6IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiAodGhpcy54ID09IHgpICYmICh0aGlzLnkgPT0geSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBDX1BvaW50TGluazJEIGV4dGVuZHMgQ19Qb2ludDJEIHtcclxuICAgIHB1YmxpYyBkaTogbnVtYmVyO1xyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHg6IG51bWJlciA9IDAsIHk6IG51bWJlciA9IDAsIGRpOiBudW1iZXIgPSAtMSlcclxuICAgIHtcclxuICAgICAgICBzdXBlcih4LCB5KTtcclxuICAgICAgICB0aGlzLmRpID0gZGk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc3RhdGljIGNhc3QocDogQ19Qb2ludDJEfHVuZGVmaW5lZCk6IENfUG9pbnRMaW5rMkR8dW5kZWZpbmVkIHtcclxuICAgICAgICBpZiAocD8ueCA9PT0gdW5kZWZpbmVkKSByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIGlmIChwPy55ID09PSB1bmRlZmluZWQpIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICAgICAgcmV0dXJuIHAgaW5zdGFuY2VvZiBDX1BvaW50TGluazJEID8gcCA6IG5ldyBDX1BvaW50TGluazJEKHAueCwgcC55KTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBDX1BvaW50U2V0MkQge1xyXG4gICAgcHVibGljIHNldDogQ19Qb2ludDJEW10gPVtdO1xyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKCkge31cclxuXHJcbiAgICBwdWJsaWMgcHVzaChwOiBDX1BvaW50MkQpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNldC5wdXNoKHApO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRfcG9pbnQoeDogbnVtYmVyLCB5OiBudW1iZXIpOiBDX1BvaW50MkR8dW5kZWZpbmVkIHtcclxuICAgICAgICBmb3IgKGNvbnN0IHAgb2YgdGhpcy5zZXQpIHtcclxuICAgICAgICAgICAgaWYgKHA/LmlzX2V4aXN0KHgsIHkpKSByZXR1cm4gcDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDsgICAgICAgICAgICBcclxuICAgIH1cclxuICAgIHB1YmxpYyByZW1vdmUocDogQ19Qb2ludDJEKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVfeHkocC54LCBwLnkpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHB1YmxpYyByZW1vdmVfeHkoeDogbnVtYmVyLCB5OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBmb3IgKGNvbnN0IGkgaW4gdGhpcy5zZXQpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2V0W2ldPy5pc19leGlzdCh4LCB5KSkge1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuc2V0W2ldO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXQgPSBbLi4udGhpcy5zZXRdO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGlzX2V4aXN0KHg6IG51bWJlciwgeTogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgZm9yIChjb25zdCBwIG9mIHRoaXMuc2V0KSBpZiAocD8uaXNfZXhpc3QoeCwgeSkpIHJldHVybiB0cnVlO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxufVxyXG5cclxuLypcclxuY2xhc3MgUG9pbnQzRCB7XHJcbiAgICBwdWJsaWMgaW50ICR4O1xyXG4gICAgcHVibGljIGludCAkeTtcclxuICAgIHB1YmxpYyBpbnQgJHo7XHJcbiAgICBwdWJsaWMgZnVuY3Rpb24gX19jb25zdHJ1Y3QoaW50ICR4ID0gMCwgaW50ICR5ID0gMCwgaW50ICR6ID0gMClcclxuICAgIHtcclxuICAgICAgICAkdGhpcy0+eCAgPSAkeDtcclxuICAgICAgICAkdGhpcy0+eSAgPSAkeTtcclxuICAgICAgICAkdGhpcy0+eiAgPSAkejtcclxuICAgIH1cclxuICAgIHB1YmxpYyBmdW5jdGlvbiBpc19leGlzdChpbnQgJHgsIGludCAkeSwgaW50ICR6KTogYm9vbCB7XHJcbiAgICAgICAgcmV0dXJuICgkdGhpcy0+eCA9PSAkeCkgJiYgKCR0aGlzLT55ID09ICR5KSAmJiAoJHRoaXMtPnogPT0gJHopO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGZ1bmN0aW9uIHdpdGhpbihQb2ludDNEICRwKTogYm9vbCB7XHJcbiAgICAgICAgcmV0dXJuICR0aGlzLT5pc19leGlzdCgkcC0+eCwgJHAtPnksICRwLT56KTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBmdW5jdGlvbiBlbmNvZGUoKTogYXJyYXkge1xyXG4gICAgICAgICRhID0gW107XHJcbiAgICAgICAgJGFbJ3gnXSA9ICR0aGlzLT54O1xyXG4gICAgICAgICRhWyd5J10gPSAkdGhpcy0+eTtcclxuICAgICAgICAkYVsneiddID0gJHRoaXMtPno7XHJcblxyXG4gICAgICAgIHJldHVybiAkYTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBmdW5jdGlvbiBkZWNvZGUoYXJyYXkgJGEpOiBQb2ludDNEIHtcclxuICAgICAgICBpZiAoIWlzX251bGwoJGEpICYmIGlzX2FycmF5KCRhKSkge1xyXG4gICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICBhcnJheV9rZXlfZXhpc3RzKCd4JywgJGEpICYmIChpc19udW1lcmljKCRhWyd4J10pICYmICRhWyd4J10gPiAgMClcclxuICAgICAgICAgICAgJiYgIGFycmF5X2tleV9leGlzdHMoJ3knLCAkYSkgJiYgKGlzX251bWVyaWMoJGFbJ3knXSkgJiYgJGFbJ3knXSA+ICAwKVxyXG4gICAgICAgICAgICAmJiAgYXJyYXlfa2V5X2V4aXN0cygneicsICRhKSAmJiAoaXNfbnVtZXJpYygkYVsneiddKSAmJiAkYVsneiddID49IDApXHJcbiAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgJHRoaXMtPnggPSAkYVsneCddO1xyXG4gICAgICAgICAgICAgICAgJHRoaXMtPnkgPSAkYVsneSddO1xyXG4gICAgICAgICAgICAgICAgJHRoaXMtPnogPSAkYVsneiddO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAkdGhpcztcclxuICAgIH1cclxuICAgIHB1YmxpYyBzdGF0aWMgZnVuY3Rpb24gZGVjb2RlX2FuZF9uZXcoYXJyYXkgJGEpOiBQb2ludDNEIHtcclxuICAgICAgICBpZiAoIWlzX251bGwoJGEpICYmIGlzX2FycmF5KCRhKSkge1xyXG4gICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICBhcnJheV9rZXlfZXhpc3RzKCd4JywgJGEpICYmIChpc19udW1lcmljKCRhWyd4J10pICYmICRhWyd4J10gPiAgMClcclxuICAgICAgICAgICAgJiYgIGFycmF5X2tleV9leGlzdHMoJ3knLCAkYSkgJiYgKGlzX251bWVyaWMoJGFbJ3knXSkgJiYgJGFbJ3knXSA+ICAwKVxyXG4gICAgICAgICAgICAmJiAgYXJyYXlfa2V5X2V4aXN0cygneicsICRhKSAmJiAoaXNfbnVtZXJpYygkYVsneiddKSAmJiAkYVsneiddID49IDApXHJcbiAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQb2ludDNEKCRhWyd4J10sICRhWyd5J10sICRhWyd6J10pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXcgUG9pbnQzRCgtMSwgLTEsIC0xKTtcclxuICAgIH1cclxufVxyXG4qL1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuXHJcbmltcG9ydCB7IF9tYXgsIF9taW4gfSAgICAgICAgICAgZnJvbSBcIi4uL2RfdXRsL0ZfTWF0aFwiO1xyXG5pbXBvcnQgeyBDX1BvaW50LCBKU09OX1BvaW50IH0gIGZyb20gXCIuL0NfUG9pbnRcIjtcclxuaW1wb3J0IHsgSlNPTl9BbnkgfSAgICAgICAgICAgICBmcm9tIFwiLi9DX1NhdmVJbmZvXCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEpTT05fUmFuZ2UgZXh0ZW5kcyBKU09OX0FueSB7XHJcbiAgICBtaW4/OiAgIEpTT05fUG9pbnQsIFxyXG4gICAgbWF4PzogICBKU09OX1BvaW50LCBcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIENfUmFuZ2Uge1xyXG4gICAgcHJvdGVjdGVkIG1pbjogQ19Qb2ludDtcclxuICAgIHByb3RlY3RlZCBtYXg6IENfUG9pbnQ7XHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IocDE6IENfUG9pbnQsIHAyOiBDX1BvaW50KSB7XHJcbiAgICAgICAgdGhpcy5taW4gID0gbmV3IENfUG9pbnQoMCwgMCwgMCk7XHJcbiAgICAgICAgdGhpcy5tYXggID0gbmV3IENfUG9pbnQoMCwgMCwgMCk7XHJcbiAgICAgICAgdGhpcy5faW5pdChwMSwgcDIpO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIF9pbml0KHAxOiBDX1BvaW50LCBwMjogQ19Qb2ludCk6IENfUmFuZ2Uge1xyXG4gICAgICAgIGNvbnN0IG1pbl94ID0gX21pbihbcDEueCwgcDIueF0pO1xyXG4gICAgICAgIGNvbnN0IG1heF94ID0gX21heChbcDEueCwgcDIueF0pO1xyXG5cclxuICAgICAgICBjb25zdCBtaW5feSA9IF9taW4oW3AxLnksIHAyLnldKTtcclxuICAgICAgICBjb25zdCBtYXhfeSA9IF9tYXgoW3AxLnksIHAyLnldKTtcclxuXHJcbiAgICAgICAgY29uc3QgbWluX3ogPSBfbWluKFtwMS56LCBwMi56XSk7XHJcbiAgICAgICAgY29uc3QgbWF4X3ogPSBfbWF4KFtwMS56LCBwMi56XSk7XHJcblxyXG4gICAgICAgIHRoaXMubWluICA9IG5ldyBDX1BvaW50KG1pbl94LCBtaW5feSwgbWluX3opO1xyXG4gICAgICAgIHRoaXMubWF4ICA9IG5ldyBDX1BvaW50KG1heF94LCBtYXhfeSwgbWF4X3opO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgd2l0aGluKGE6IENfUmFuZ2V8Q19Qb2ludHxudW1iZXIsIHk/OiBudW1iZXIsIHo/OiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAodHlwZW9mIGEgPT09IFwibnVtYmVyXCIgJiYgdHlwZW9mIHkgPT09IFwibnVtYmVyXCIgJiYgdHlwZW9mIHogPT09IFwibnVtYmVyXCIpIHsgXHJcbiAgICAgICAgICAgIGlmICggYSA8IHRoaXMubWluLnggfHwgYSA+IHRoaXMubWF4LnggKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmICggeSA8IHRoaXMubWluLnkgfHwgeSA+IHRoaXMubWF4LnkgKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmICggeiA8IHRoaXMubWluLnogfHwgeiA+IHRoaXMubWF4LnogKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIGEgPT09IFwib2JqZWN0XCIgJiYgYSBpbnN0YW5jZW9mIENfUG9pbnQpIHsgXHJcbiAgICAgICAgICAgIGNvbnN0IHAgPSBhIGFzIENfUG9pbnQ7XHJcbiAgICAgICAgICAgIGlmICggcC54IDwgdGhpcy5taW4ueCB8fCBwLnggPiB0aGlzLm1heC54ICkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAoIHAueSA8IHRoaXMubWluLnkgfHwgcC55ID4gdGhpcy5tYXgueSApIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKCBwLnogPCB0aGlzLm1pbi56IHx8IHAueiA+IHRoaXMubWF4LnogKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIGEgPT09IFwib2JqZWN0XCIgJiYgYSBpbnN0YW5jZW9mIENfUmFuZ2UpIHtcclxuICAgICAgICAgICAgY29uc3QgcCA9IGEgYXMgQ19SYW5nZTtcclxuICAgICAgICAgICAgaWYgKCBwLm1pbl94KCkgPCB0aGlzLm1pbi54IHx8IHAubWF4X3goKSA+IHRoaXMubWF4LnggKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmICggcC5taW5feSgpIDwgdGhpcy5taW4ueSB8fCBwLm1heF95KCkgPiB0aGlzLm1heC55ICkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAoIHAubWluX3ooKSA8IHRoaXMubWluLnogfHwgcC5tYXhfeigpID4gdGhpcy5tYXgueiApIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBtaW5feCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5taW4ueDt9XHJcbiAgICBwdWJsaWMgbWF4X3goKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMubWF4Lng7fVxyXG4gICAgcHVibGljIG1pbl95KCk6IG51bWJlciB7IHJldHVybiB0aGlzLm1pbi55O31cclxuICAgIHB1YmxpYyBtYXhfeSgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5tYXgueTt9XHJcbiAgICBwdWJsaWMgbWluX3ooKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMubWluLno7fVxyXG4gICAgcHVibGljIG1heF96KCk6IG51bWJlciB7IHJldHVybiB0aGlzLm1heC56O31cclxuICAgIHB1YmxpYyBzaXplX3goKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tYXgueCAtIHRoaXMubWluLnggKyAxO1xyXG4gICAgfSBcclxuICAgIHB1YmxpYyBzaXplX3koKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tYXgueSAtIHRoaXMubWluLnkgKyAxO1xyXG4gICAgfSBcclxuICAgIHB1YmxpYyBzaXplX3ooKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5tYXgueiAtIHRoaXMubWluLnogKyAxO1xyXG4gICAgfSBcclxuICAgIHB1YmxpYyBkb19hbGxfeHl6KGZuOiAoeDogbnVtYmVyLCB5OiBudW1iZXIsIHo6IG51bWJlcikgPT4gYm9vbGVhbikge1xyXG4gICAgICAgIGZvciAodmFyIHogPSB0aGlzLm1pbi56OyB6IDw9IHRoaXMubWF4Lno7IHorKyApIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgeSA9IHRoaXMubWluLnk7IHkgPD0gdGhpcy5tYXgueTsgeSsrICkge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgeCA9IHRoaXMubWluLng7IHkgPD0gdGhpcy5tYXgueDsgeCsrICkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghZm4oeCwgeSwgeikpIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBkb19hbGxfcChmbjogKHA6IENfUG9pbnQpID0+IGJvb2xlYW4pIHtcclxuICAgICAgICBmb3IgKHZhciB6ID0gdGhpcy5taW4uejsgeiA8PSB0aGlzLm1heC56OyB6KysgKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIHkgPSB0aGlzLm1pbi55OyB5IDw9IHRoaXMubWF4Lnk7IHkrKyApIHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIHggPSB0aGlzLm1pbi54OyB5IDw9IHRoaXMubWF4Lng7IHgrKyApIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWZuKG5ldyBDX1BvaW50KHgsIHksIHopKSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGVuY29kZSgpOiBKU09OX1JhbmdlIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBtaW46IHRoaXMubWluLmVuY29kZSgpLFxyXG4gICAgICAgICAgICBtYXg6IHRoaXMubWluLmVuY29kZSgpLFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBkZWNvZGUoajogSlNPTl9SYW5nZSk6IENfUmFuZ2Uge1xyXG4gICAgICAgIGlmIChqID09PSB1bmRlZmluZWQpICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICBpZiAoai5taW4gPT09IHVuZGVmaW5lZCkgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgaWYgKGoubWF4ID09PSB1bmRlZmluZWQpIHJldHVybiB0aGlzO1xyXG4gICAgICAgIGNvbnN0IHAxID0gbmV3IENfUG9pbnQoai5taW4pO1xyXG4gICAgICAgIGNvbnN0IHAyID0gbmV3IENfUG9pbnQoai5tYXgpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbml0KHAxLCBwMik7XHJcbiAgICB9XHJcbn1cclxuXHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5cclxuaW1wb3J0IHsgQ19NYXplLCBKU09OX01hemUsIGFsZXJ0X21hemVfaW5mbyAgfSAgZnJvbSBcIi4vQ19NYXplXCI7XHJcbmltcG9ydCB7IENfR3VpbGQsIEpTT05fR3VpbGQsIGFsZXJ0X2d1bGRfaW5mbyB9IGZyb20gXCIuL0NfR3VpbGRcIjtcclxuaW1wb3J0IHsgQ19Nb3ZhYmxlUG9pbnQsIEpTT05fTW92YWJsZVBvaW50LCBhbGVydF9tdnB0X2luZm8gfSBmcm9tIFwiLi9DX01vdmFibGVQb2ludFwiO1xyXG5pbXBvcnQgeyBDX1RlYW0sIEpTT05fVGVhbSwgYWxlcnRfdGVhbV9pbmZvICB9ICBmcm9tIFwiLi9DX1RlYW1cIjtcclxuaW1wb3J0IHsgQ19TYXZlSW5mbywgSV9KU09OLCBKU09OX0FueSwgSlNPTl9TYXZlSW5mbyB9IGZyb20gXCIuL0NfU2F2ZUluZm9cIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSlNPTl9TYXZlRGF0YSBleHRlbmRzIEpTT05fU2F2ZUluZm8ge1xyXG4gICAgc2F2ZV9pZD86ICAgbnVtYmVyLFxyXG4gICAgcGxheWVyX2lkPzogbnVtYmVyLCBcclxuICAgIHVuaXFfbm8/OiAgIG51bWJlcixcclxuICAgIHRpdGxlPzogICAgIHN0cmluZyxcclxuICAgIGRldGFpbD86ICAgIHN0cmluZyxcclxuICAgIHBvaW50PzogICAgIHN0cmluZyxcclxuICAgIGF1dG9fbW9kZT86IHN0cmluZyxcclxuICAgIGlzX2FjdGl2ZT86IHN0cmluZyxcclxuICAgIGlzX2RlbGV0ZT86IHN0cmluZyxcclxuICAgIHNhdmVfdGltZT86IHN0cmluZyxcclxuXHJcbiAgICBhbGxfbXZwdD86ICBKU09OX01vdmFibGVQb2ludFtdLFxyXG4gICAgYWxsX21hemU/OiAgSlNPTl9NYXplW10sXHJcbiAgICBhbGxfdGVhbT86ICBKU09OX1RlYW1bXSxcclxuICAgIGFsbF9ndWxkPzogIEpTT05fR3VpbGRbXSxcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFsZXJ0X3NhdmVfaW5mbyhhOiBKU09OX1NhdmVEYXRhfHVuZGVmaW5lZCk6IHZvaWQge1xyXG4gICAgaWYgKGEgPT09IHVuZGVmaW5lZCkgcmV0dXJuO1xyXG4gICAgYWxlcnQoXCJTYXZlIEluZm86XCIgXHJcbiAgICAgICAgKyBcIlxcbnNhdmVfaWQ6ICAgIFwiICsgKGEuc2F2ZV9pZCAgID8/ICc/JylcclxuICAgICAgICArIFwiXFxucGxheWVyX2lkOiAgXCIgKyAoYS5wbGF5ZXJfaWQgPz8gJz8nKVxyXG4gICAgICAgICsgXCJcXG51bmlxX25vOiAgICBcIiArIChhLnVuaXFfbm8gICA/PyAnPycpXHJcbiAgICAgICAgKyBcIlxcbnRpdGxlOiAgICAgIFwiICsgKGEudGl0bGUgICAgID8/ICc/JylcclxuICAgICAgICArIFwiXFxuZGV0YWlsOiAgICAgXCIgKyAoYS5kZXRhaWwgICAgPz8gJz8nKVxyXG4gICAgICAgICsgXCJcXG5wb2ludDogICAgICBcIiArIChhLnBvaW50ICAgICA/PyAnPycpXHJcbiAgICAgICAgKyBcIlxcbmF1dG9fbW9kZTogIFwiICsgKGEuYXV0b19tb2RlID8/ICc/JylcclxuICAgICAgICArIFwiXFxuaXNfYWN0aXZlOiAgXCIgKyAoYS5pc19hY3RpdmUgPz8gJz8nKVxyXG4gICAgICAgICsgXCJcXG5pc19kZWxldGU6ICBcIiArIChhLmlzX2RlbGV0ZSA/PyAnPycpXHJcbiAgICAgICAgKyBcIlxcbm12cHRfY291bnQ6IFwiICsgKGEuYWxsX212cHQ/Lmxlbmd0aCA/PyAnPycpXHJcbiAgICAgICAgKyBcIlxcbm1hemVfY291bnQ6IFwiICsgKGEuYWxsX21hemU/Lmxlbmd0aCA/PyAnPycpXHJcbiAgICAgICAgKyBcIlxcbmd1bGRfY291bnQ6IFwiICsgKGEuYWxsX2d1bGQ/Lmxlbmd0aCA/PyAnPycpXHJcbiAgICAgICAgKyBcIlxcbnRlYW1fY291bnQ6IFwiICsgKGEuYWxsX3RlYW0/Lmxlbmd0aCA/PyAnPycpXHJcbiAgICAgICAgKyBcIlxcblwiXHJcbiAgICApO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYWxlcnRfc2F2ZV9kZXRhaWwoYTogSlNPTl9TYXZlRGF0YXx1bmRlZmluZWQpOiB2b2lkIHtcclxuICAgIGlmIChhID09PSB1bmRlZmluZWQpIHJldHVybjtcclxuXHJcbiAgICB0cnkgeyBcclxuLy8gICAgICAgIGFsZXJ0KFwiU2F2ZSBEZXRhaWwobXZwdCk6XCIpO1xyXG4gICAgICAgIGZvciAoY29uc3QgbXZwdCBvZiBhLmFsbF9tdnB0Pz9bXSkgYWxlcnRfbXZwdF9pbmZvKG12cHQpO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7YWxlcnQoJ2FsZXJ0IG12cHQgZXJyb3I6ICcgKyBlcnIpfVxyXG5cclxuICAgIHRyeSB7IFxyXG4vLyAgICAgICAgYWxlcnQoXCJTYXZlIERldGFpbCh0ZWFtKTpcIik7XHJcbiAgICAgICAgZm9yIChjb25zdCB0ZWFtIG9mIGEuYWxsX3RlYW0/P1tdKSBhbGVydF90ZWFtX2luZm8odGVhbSk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHthbGVydCgnYWxlcnQgdGVhbSBlcnJvcjogJyArIGVycil9XHJcblxyXG4gICAgdHJ5IHsgXHJcbi8vICAgICAgICBhbGVydChcIlNhdmUgRGV0YWlsKG1hemUpOlwiKTtcclxuICAgICAgICBmb3IgKGNvbnN0IG1hemUgb2YgYS5hbGxfbWF6ZT8/W10pIGFsZXJ0X21hemVfaW5mbyhtYXplKTtcclxuICAgIH0gY2F0Y2ggKGVycikge2FsZXJ0KCdhbGVydCBtYXplIGVycm9yOiAnICsgZXJyKX1cclxuXHJcbiAgICB0cnkgeyBcclxuLy8gICAgICAgIGFsZXJ0KFwiU2F2ZSBEZXRhaWwoZ3VsZCk6XCIpO1xyXG4gICAgICAgIGZvciAoY29uc3QgZ3VsZCBvZiBhLmFsbF9ndWxkPz9bXSkgYWxlcnRfZ3VsZF9pbmZvKGd1bGQpO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7YWxlcnQoJ2FsZXJ0IGd1bGQgZXJyb3I6ICcgKyBlcnIpfVxyXG59XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIENfU2F2ZURhdGEgZXh0ZW5kcyBDX1NhdmVJbmZvIGltcGxlbWVudHMgSV9KU09OIHtcclxuXHJcbi8qXHJcbiAgICBwdWJsaWMgc2F2ZV9pZDogICBudW1iZXI7XHJcbiAgICBwdWJsaWMgcGxheWVyX2lkOiBudW1iZXI7IFxyXG4gICAgcHVibGljIHVuaXFfbm86ICAgbnVtYmVyO1xyXG4gICAgcHVibGljIHRpdGxlOiAgICAgc3RyaW5nO1xyXG4gICAgcHVibGljIGRldGFpbDogICAgc3RyaW5nO1xyXG4gICAgcHVibGljIHBvaW50OiAgICAgc3RyaW5nO1xyXG4gICAgcHVibGljIGF1dG9fbW9kZTogYm9vbGVhbjtcclxuICAgIHB1YmxpYyBpc19hY3RpdmU6IGJvb2xlYW47XHJcbiAgICBwdWJsaWMgaXNfZGVsZXRlOiBib29sZWFuO1xyXG4gICAgcHVibGljIHNhdmVfdGltZTogRGF0ZTtcclxuICAgIHB1YmxpYyBteXBvczogICAgIENfTW92YWJsZVBvaW50O1xyXG4qL1xyXG5cclxuICAgIHB1YmxpYyBhbGxfbXZwdDogIHtbdWlkOiBzdHJpbmddOiBDX01vdmFibGVQb2ludH07XHJcbiAgICBwdWJsaWMgYWxsX21hemU6ICB7W3VpZDogc3RyaW5nXTogQ19NYXplfTtcclxuICAgIHB1YmxpYyBhbGxfdGVhbTogIHtbdWlkOiBzdHJpbmddOiBDX1RlYW19O1xyXG4gICAgcHVibGljIGFsbF9ndWxkOiAge1t1aWQ6IHN0cmluZ106IENfR3VpbGR9O1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihhPzogSlNPTl9TYXZlRGF0YSkge1xyXG4gICAgICAgIHN1cGVyKGEpO1xyXG5cclxuICAgICAgICB0aGlzLmFsbF9tdnB0ICA9IHt9O1xyXG4gICAgICAgIHRoaXMuYWxsX21hemUgID0ge307XHJcbiAgICAgICAgdGhpcy5hbGxfdGVhbSAgPSB7fVxyXG4gICAgICAgIHRoaXMuYWxsX2d1bGQgID0ge307XHJcblxyXG4gICAgICAgIGlmIChhICE9PSB1bmRlZmluZWQpIHRoaXMuZGVjb2RlKGEpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgbmV3KGE/OiBKU09OX1NhdmVEYXRhKTogQ19TYXZlRGF0YSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBDX1NhdmVEYXRhKGEpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBlbmNvZGUoKTogSlNPTl9TYXZlRGF0YSB7XHJcbiAgICAgICAgbGV0IHNhdmVfZGF0ZTogc3RyaW5nO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNhdmVfZGF0YSAgICA9IHN1cGVyLmVuY29kZSgpIGFzIEpTT05fU2F2ZURhdGE7XHJcblxyXG4gICAgICAgICAgICBzYXZlX2RhdGEuYWxsX212cHQgPSB0aGlzLl9lbmNvZGVfYWxsX2RhdGEodGhpcy5hbGxfbXZwdCk7IFxyXG4gICAgICAgICAgICBzYXZlX2RhdGEuYWxsX21hemUgPSB0aGlzLl9lbmNvZGVfYWxsX2RhdGEodGhpcy5hbGxfbWF6ZSk7IFxyXG4gICAgICAgICAgICBzYXZlX2RhdGEuYWxsX3RlYW0gPSB0aGlzLl9lbmNvZGVfYWxsX2RhdGEodGhpcy5hbGxfdGVhbSk7IFxyXG4gICAgICAgICAgICBzYXZlX2RhdGEuYWxsX2d1bGQgPSB0aGlzLl9lbmNvZGVfYWxsX2RhdGEodGhpcy5hbGxfZ3VsZCk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gc2F2ZV9kYXRhO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICBhbGVydCgnU2F2ZURhdGEgRW5jb2RlIEVycm9yOiAnICsgZXJyKTtcclxuICAgICAgICAgICAgcmV0dXJuIHt9O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBfZW5jb2RlX2FsbF9kYXRhKGFsbF9kYXRhOiB7W3VpZDpzdHJpbmddOklfSlNPTn0pOiBKU09OX0FueVtdIHtcclxuICAgICAgICBjb25zdCBhbGxfSlNPTjogSlNPTl9BbnlbXSA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgaW4gYWxsX2RhdGEpIGFsbF9KU09OLnB1c2goYWxsX2RhdGFbaV0uZW5jb2RlKCkpO1xyXG4gICAgICAgIHJldHVybiBhbGxfSlNPTjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGVjb2RlKHM6IEpTT05fU2F2ZURhdGEpOiBDX1NhdmVEYXRhIHtcclxuICAgICAgICBzdXBlci5kZWNvZGUocyk7XHJcblxyXG4gICAgICAgIGlmIChzLmFsbF9tdnB0ICAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWxsX212cHQgPSB7fTtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBqc29uX212cHQgb2Ygcy5hbGxfbXZwdCkge1xyXG4gICAgICAgICAgICAgICAgIGNvbnN0IG12cHQgPSAobmV3IENfTW92YWJsZVBvaW50KCkpLmRlY29kZShqc29uX212cHQpOyBcclxuICAgICAgICAgICAgICAgICB0aGlzLmFsbF9tdnB0W212cHQudWlkKCldID0gbXZwdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gXHJcbiAgICAgICAgaWYgKHMuYWxsX21hemUgICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5hbGxfbWF6ZSA9IHt9O1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGpzb25fbWF6ZSBvZiBzLmFsbF9tYXplKSB7XHJcbiAgICAgICAgICAgICAgICAgY29uc3QgbWF6ZSA9IChuZXcgQ19NYXplKCkpLmRlY29kZShqc29uX21hemUpOyBcclxuICAgICAgICAgICAgICAgICB0aGlzLmFsbF9tYXplW21hemUudWlkKCldID0gbWF6ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gXHJcbiAgICAgICAgaWYgKHMuYWxsX3RlYW0gICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5hbGxfdGVhbSA9IHt9O1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGpzb25fdGVhbSBvZiBzLmFsbF90ZWFtKSB7XHJcbiAgICAgICAgICAgICAgICAgY29uc3QgdGVhbSA9IChuZXcgQ19UZWFtKCkpLmRlY29kZShqc29uX3RlYW0pOyBcclxuICAgICAgICAgICAgICAgICB0aGlzLmFsbF90ZWFtW3RlYW0udWlkKCldID0gdGVhbTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gXHJcbiAgICAgICAgaWYgKHMuYWxsX2d1bGQgICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5hbGxfZ3VsZCA9IHt9O1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGpzb25fZ3VsZCBvZiBzLmFsbF9ndWxkKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBndWxkID0gKG5ldyBDX0d1aWxkKCkpLmRlY29kZShqc29uX2d1bGQpOyBcclxuICAgICAgICAgICAgICAgIHRoaXMuYWxsX2d1bGRbZ3VsZC51aWQoKV0gPSBndWxkO1xyXG4gICAgICAgICAgIH1cclxuICAgICAgICB9IFxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgYWxlcnQoKTogdm9pZCB7XHJcbiAgICAgICAgYWxlcnQoXCJTYXZlIEluZm86XCIgXHJcbiAgICAgICAgICAgICsgXCJcXG5zYXZlX2lkOiAgICBcIiArICh0aGlzLnNhdmVfaWQgICA/PyAnPycpXHJcbiAgICAgICAgICAgICsgXCJcXG5wbGF5ZXJfaWQ6ICBcIiArICh0aGlzLnBsYXllcl9pZCA/PyAnPycpXHJcbiAgICAgICAgICAgICsgXCJcXG51bmlxX25vOiAgICBcIiArICh0aGlzLnVuaXFfbm8gICA/PyAnPycpXHJcbiAgICAgICAgICAgICsgXCJcXG50aXRsZTogICAgICBcIiArICh0aGlzLnRpdGxlICAgICA/PyAnPycpXHJcbiAgICAgICAgICAgICsgXCJcXG5kZXRhaWw6ICAgICBcIiArICh0aGlzLmRldGFpbCAgICA/PyAnPycpXHJcbiAgICAgICAgICAgICsgXCJcXG5wb2ludDogICAgICBcIiArICh0aGlzLnBvaW50ICAgICA/PyAnPycpXHJcbiAgICAgICAgICAgICsgXCJcXG5hdXRvX21vZGU6ICBcIiArICh0aGlzLmF1dG9fbW9kZT8nWSc6J04nKVxyXG4gICAgICAgICAgICArIFwiXFxuaXNfYWN0aXZlOiAgXCIgKyAodGhpcy5pc19hY3RpdmU/J1knOidOJylcclxuICAgICAgICAgICAgKyBcIlxcbmlzX2RlbGV0ZTogIFwiICsgKHRoaXMuaXNfZGVsZXRlPydZJzonTicpXHJcbiAgICAgICAgICAgICsgXCJcXG5tdnB0X2NvdW50OiBcIiArICh0aGlzLmFsbF9tdnB0Py5sZW5ndGggPz8gJz8nKVxyXG4gICAgICAgICAgICArIFwiXFxubWF6ZV9jb3VudDogXCIgKyAodGhpcy5hbGxfbWF6ZT8ubGVuZ3RoID8/ICc/JylcclxuICAgICAgICAgICAgKyBcIlxcbmd1bGRfY291bnQ6IFwiICsgKHRoaXMuYWxsX2d1bGQ/Lmxlbmd0aCA/PyAnPycpXHJcbiAgICAgICAgICAgICsgXCJcXG50ZWFtX2NvdW50OiBcIiArICh0aGlzLmFsbF90ZWFtPy5sZW5ndGggPz8gJz8nKVxyXG4gICAgICAgICAgICArIFwiXFxuXCJcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhbGVydF9kZXRhaWwoKTogdm9pZCB7XHJcbiAgICAgICAgdHJ5IHsgXHJcbi8vICAgICAgICAgICAgYWxlcnQoXCJTYXZlIERldGFpbChtdnB0KTpcIik7XHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgaWkgaW4gdGhpcy5hbGxfbXZwdCkgdGhpcy5hbGxfbXZwdFtpaV0uYWxlcnQoKTtcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHthbGVydCgnYWxlcnQgbXZwdCBlcnJvcjogJyArIGVycil9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIHRyeSB7IFxyXG4vLyAgICAgICAgICAgIGFsZXJ0KFwiU2F2ZSBEZXRhaWwodGVhbSk6XCIpO1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGlpIGluIHRoaXMuYWxsX3RlYW0pIHRoaXMuYWxsX3RlYW1baWldLmFsZXJ0KCk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7YWxlcnQoJ2FsZXJ0IHRlYW0gZXJyb3I6ICcgKyBlcnIpfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICB0cnkgeyBcclxuLy8gICAgICAgICAgICBhbGVydChcIlNhdmUgRGV0YWlsKG1hemUpOlwiKTtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBpaSBpbiB0aGlzLmFsbF9tYXplKSB0aGlzLmFsbF9tYXplW2lpXS5hbGVydCgpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge2FsZXJ0KCdhbGVydCBtYXplIGVycm9yOiAnICsgZXJyKX1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgdHJ5IHsgXHJcbi8vICAgICAgICAgICAgYWxlcnQoXCJTYXZlIERldGFpbChndWxkKTpcIik7XHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgaWkgaW4gdGhpcy5hbGxfZ3VsZCkgdGhpcy5hbGxfZ3VsZFtpaV0uYWxlcnQoKTtcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHthbGVydCgnYWxlcnQgZ3VsZCBlcnJvcjogJyArIGVycil9XHJcbiAgICAgICAgICAgIFxyXG4gICAgfVxyXG59XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5cclxuaW1wb3J0IHsgQ19Nb3ZhYmxlUG9pbnQsIEpTT05fTW92YWJsZVBvaW50IH0gZnJvbSBcIi4vQ19Nb3ZhYmxlUG9pbnRcIjtcclxuXHJcbi8vIOOCteODvOODkOODvOWBtOOBqOOChOOCiuOBqOOCiuOBmeOCi0pTT07lvaLlvI/jg4fjg7zjgr/jga7jg4bjg7Pjg5fjg6zjg7zjg4hcclxuZXhwb3J0IGludGVyZmFjZSBKU09OX0FueSB7XHJcbiAgICBba2V5OiBzdHJpbmddOiBhbnlcclxufVxyXG5cclxuLy8g44K144O844OQ44O85YG044Go44KE44KK44Go44KK44GZ44KL44Kv44Op44K544Gr5b+F6KaB44Gq44Oh44K944OD44OJXHJcbmV4cG9ydCBpbnRlcmZhY2UgSV9KU09OIHtcclxuICAgIGVuY29kZTogKCk9PkpTT05fQW55LFxyXG4gICAgZGVjb2RlOiAoajpKU09OX0FueSk9PklfSlNPTixcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJX0pTT05fVW5pcSBleHRlbmRzIElfSlNPTiB7XHJcbiAgICB1aWQ6ICgpPT5zdHJpbmcsXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSV9BYnN0cmFjdCB7XHJcbiAgICBuZXdPYmo6IChqPzpKU09OX0FueSk9PklfQWJzdHJhY3R8dW5kZWZpbmVkLFxyXG4gICAgZW5jb2RlOiAoKT0+SlNPTl9BbnksXHJcbi8vICBzdGF0aWMgZGVjb2RlOiAoajpKU09OX0FueSk9PklfSlNPTixcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJX0pTT05fQ2xhc3Mge1xyXG4gICAgbmV3OiAoaj86IEpTT05fQW55KT0+SV9KU09OLFxyXG59XHJcblxyXG4vLyDjgrXjg7zjg5Djg7zlgbTjgajjgoTjgorlj5bjgorjgZnjgovpmpvjgavoh6rouqvjgpLmloflrZfliJfljJbjgZnjgovjgq/jg6njgrnjga7jg6Hjgr3jg4Pjg4lcclxuZXhwb3J0IGludGVyZmFjZSBJX0pTT05WYWx1ZSBleHRlbmRzIElfSlNPTntcclxuICAgIGZyb21KU09OOiAoKT0+dm9pZCxcclxuICAgIHRvSlNPTjogICAoKT0+dm9pZCxcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBKU09OX1NhdmVJbmZvIGV4dGVuZHMgSlNPTl9Bbnkge1xyXG4gICAgc2F2ZV9pZD86ICAgbnVtYmVyLFxyXG4gICAgcGxheWVyX2lkPzogbnVtYmVyLCBcclxuICAgIHVuaXFfbm8/OiAgIG51bWJlcixcclxuICAgIHRpdGxlPzogICAgIHN0cmluZyxcclxuICAgIGRldGFpbD86ICAgIHN0cmluZyxcclxuICAgIHBvaW50PzogICAgIHN0cmluZyxcclxuICAgIGF1dG9fbW9kZT86IHN0cmluZyxcclxuICAgIGlzX2FjdGl2ZT86IHN0cmluZyxcclxuICAgIGlzX2RlbGV0ZT86IHN0cmluZyxcclxuICAgIHNhdmVfdGltZT86IHN0cmluZyxcclxuICAgIG15cG9zPzogICAgIEpTT05fTW92YWJsZVBvaW50LFxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYWxlcnRfc2F2ZWluZm9faW5mbyhhOiBKU09OX1NhdmVJbmZvfHVuZGVmaW5lZCk6IHZvaWQge1xyXG4gICAgaWYgKGEgPT09IHVuZGVmaW5lZCkgcmV0dXJuO1xyXG4gICAgYWxlcnQoXCJTYXZlIEluZm86XCIgXHJcbiAgICAgICAgKyBcIlxcbnNhdmVfaWQ6ICAgIFwiICsgKGEuc2F2ZV9pZCAgID8/ICc/JylcclxuICAgICAgICArIFwiXFxucGxheWVyX2lkOiAgXCIgKyAoYS5wbGF5ZXJfaWQgPz8gJz8nKVxyXG4gICAgICAgICsgXCJcXG51bmlxX25vOiAgICBcIiArIChhLnVuaXFfbm8gICA/PyAnPycpXHJcbiAgICAgICAgKyBcIlxcbnRpdGxlOiAgICAgIFwiICsgKGEudGl0bGUgICAgID8/ICc/JylcclxuICAgICAgICArIFwiXFxuZGV0YWlsOiAgICAgXCIgKyAoYS5kZXRhaWwgICAgPz8gJz8nKVxyXG4gICAgICAgICsgXCJcXG5wb2ludDogICAgICBcIiArIChhLnBvaW50ICAgICA/PyAnPycpXHJcbiAgICAgICAgKyBcIlxcbmF1dG9fbW9kZTogIFwiICsgKGEuYXV0b19tb2RlID8/ICc/JylcclxuICAgICAgICArIFwiXFxuaXNfYWN0aXZlOiAgXCIgKyAoYS5pc19hY3RpdmUgPz8gJz8nKVxyXG4gICAgICAgICsgXCJcXG5pc19kZWxldGU6ICBcIiArIChhLmlzX2RlbGV0ZSA/PyAnPycpXHJcbiAgICAgICAgKyBcIlxcbnNhdmVfdGltZTogIFwiICsgKGEuc2F2ZV90aW1lID8/ICc/JylcclxuICAgICAgICArIFwiXFxubXl1cmw6ICAgICAgXCIgKyAoYS5teXBvcz8uY3VyX3VybCAgID8/ICc/JylcclxuICAgICAgICArIFwiXFxudGVhbV91aWQ6ICAgXCIgKyAoYS5teXBvcz8udGVhbV91aWQgID8/ICc/JylcclxuICAgICAgICArIFwiXFxubG9jX2tpbmQ6ICAgXCIgKyAoYS5teXBvcz8ua2luZCAgICAgID8/ICc/JylcclxuICAgICAgICArIFwiXFxubG9jX25hbWU6ICAgXCIgKyAoYS5teXBvcz8ubmFtZSAgICAgID8/ICc/JylcclxuICAgICAgICArIFwiXFxubG9jX3VpZDogICAgXCIgKyAoYS5teXBvcz8ubG9jX3VpZCAgID8/ICc/JylcclxuICAgICAgICArIFwiXFxuXCJcclxuICAgICk7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBDX1NhdmVJbmZvIGltcGxlbWVudHMgSV9KU09OIHtcclxuICAgIHB1YmxpYyBzYXZlX2lkOiAgIG51bWJlcjtcclxuICAgIHB1YmxpYyBwbGF5ZXJfaWQ6IG51bWJlcjsgXHJcbiAgICBwdWJsaWMgdW5pcV9ubzogICBudW1iZXI7XHJcbiAgICBwdWJsaWMgdGl0bGU6ICAgICBzdHJpbmc7XHJcbiAgICBwdWJsaWMgZGV0YWlsOiAgICBzdHJpbmc7XHJcbiAgICBwdWJsaWMgcG9pbnQ6ICAgICBzdHJpbmc7XHJcbiAgICBwdWJsaWMgYXV0b19tb2RlOiBib29sZWFuO1xyXG4gICAgcHVibGljIGlzX2FjdGl2ZTogYm9vbGVhbjtcclxuICAgIHB1YmxpYyBpc19kZWxldGU6IGJvb2xlYW47XHJcbiAgICBwdWJsaWMgc2F2ZV90aW1lOiBEYXRlO1xyXG4gICAgcHVibGljIG15cG9zOiAgICAgQ19Nb3ZhYmxlUG9pbnQ7XHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKGE/OiBKU09OX1NhdmVJbmZvKSB7XHJcbiAgICAgICAgdGhpcy5zYXZlX2lkICAgPSAtMTtcclxuICAgICAgICB0aGlzLnBsYXllcl9pZCA9IC0xOyBcclxuICAgICAgICB0aGlzLnVuaXFfbm8gICA9IC0xO1xyXG4gICAgICAgIHRoaXMudGl0bGUgICAgID0gJyc7XHJcbiAgICAgICAgdGhpcy5kZXRhaWwgICAgPSAnJztcclxuICAgICAgICB0aGlzLnBvaW50ICAgICA9ICcnO1xyXG4gICAgICAgIHRoaXMuYXV0b19tb2RlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pc19hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuaXNfZGVsZXRlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zYXZlX3RpbWUgPSBuZXcgRGF0ZSgpO1xyXG5cclxuICAgICAgICB0aGlzLm15cG9zICAgICA9IG5ldyBDX01vdmFibGVQb2ludCgpO1xyXG5cclxuICAgICAgICBpZiAoYSAhPT0gdW5kZWZpbmVkKSB0aGlzLmRlY29kZShhKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIG5ldyhhPzogSlNPTl9TYXZlSW5mbyk6IENfU2F2ZUluZm8ge1xyXG4gICAgICAgIHJldHVybiBuZXcgQ19TYXZlSW5mbyhhKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZW5jb2RlKCk6IEpTT05fU2F2ZUluZm8ge1xyXG4gICAgICAgIGxldCBzYXZlX2RhdGU6IHN0cmluZztcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBzYXZlX2RhdGUgPSB0aGlzLnNhdmVfdGltZS50b0lTT1N0cmluZygpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICBzYXZlX2RhdGUgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgc2F2ZV9pZDogICB0aGlzLnNhdmVfaWQsIFxyXG4gICAgICAgICAgICAgICAgcGxheWVyX2lkOiB0aGlzLnBsYXllcl9pZCwgIFxyXG4gICAgICAgICAgICAgICAgdW5pcV9ubzogICB0aGlzLnVuaXFfbm8sIFxyXG4gICAgICAgICAgICAgICAgdGl0bGU6ICAgICB0aGlzLnRpdGxlLCBcclxuICAgICAgICAgICAgICAgIGRldGFpbDogICAgdGhpcy5kZXRhaWwsIFxyXG4gICAgICAgICAgICAgICAgcG9pbnQ6ICAgICB0aGlzLnBvaW50LCBcclxuICAgICAgICAgICAgICAgIGF1dG9fbW9kZTogdGhpcy5hdXRvX21vZGUgPyAnMScgOiAnMCcsIFxyXG4gICAgICAgICAgICAgICAgaXNfYWN0aXZlOiB0aGlzLmlzX2FjdGl2ZSA/ICcxJyA6ICcwJywgXHJcbiAgICAgICAgICAgICAgICBpc19kZWxldGU6IHRoaXMuaXNfZGVsZXRlID8gJzEnIDogJzAnLCBcclxuICAgICAgICAgICAgICAgIHNhdmVfdGltZTogc2F2ZV9kYXRlLCBcclxuICAgICAgICAgICAgICAgIG15cG9zOiAgICAgdGhpcy5teXBvcy5lbmNvZGUoKSxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICBhbGVydCgnU2F2ZURhdGEgRW5jb2RlIEVycm9yOiAnICsgZXJyKTtcclxuICAgICAgICAgICAgcmV0dXJuIHt9O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGVjb2RlKHM6IEpTT05fU2F2ZUluZm8pOiBDX1NhdmVJbmZvIHtcclxuICAgICAgICB0aGlzLnNhdmVfaWQgICA9IHMuc2F2ZV9pZCAgID8/IHRoaXMuc2F2ZV9pZDtcclxuICAgICAgICB0aGlzLnBsYXllcl9pZCA9IHMucGxheWVyX2lkID8/IHRoaXMucGxheWVyX2lkOyBcclxuICAgICAgICB0aGlzLnVuaXFfbm8gICA9IHMudW5pcV9ubyAgID8/IHRoaXMudW5pcV9ubztcclxuICAgICAgICB0aGlzLnRpdGxlICAgICA9IHMudGl0bGUgICAgID8/IHRoaXMudGl0bGU7XHJcbiAgICAgICAgdGhpcy5kZXRhaWwgICAgPSBzLmRldGFpbCAgICA/PyB0aGlzLmRldGFpbDtcclxuICAgICAgICB0aGlzLnBvaW50ICAgICA9IHMucG9pbnQgICAgID8/IHRoaXMucG9pbnQ7XHJcbiAgICAgICAgaWYgKHMuYXV0b19tb2RlID09PSB1bmRlZmluZWQpIHRoaXMuYXV0b19tb2RlOyBlbHNlIHMuYXV0b19tb2RlICE9PSAnMCcgPyB0cnVlIDogZmFsc2U7XHJcbiAgICAgICAgaWYgKHMuaXNfYWN0aXZlID09PSB1bmRlZmluZWQpIHRoaXMuaXNfYWN0aXZlOyBlbHNlIHMuaXNfYWN0aXZlICE9PSAnMCcgPyB0cnVlIDogZmFsc2U7XHJcbiAgICAgICAgaWYgKHMuaXNfZGVsZXRlID09PSB1bmRlZmluZWQpIHRoaXMuaXNfZGVsZXRlOyBlbHNlIHMuaXNfZGVsZXRlICE9PSAnMCcgPyB0cnVlIDogZmFsc2U7XHJcbiAgICAgICAgaWYgKHMuc2F2ZV90aW1lICE9PSB1bmRlZmluZWQpIHRoaXMuc2F2ZV90aW1lID0gbmV3IERhdGUocy5zYXZlX3RpbWUpOyBcclxuXHJcbiAgICAgICAgaWYgKHMubXlwb3MgICAgICE9PSB1bmRlZmluZWQpIHRoaXMubXlwb3MuZGVjb2RlKHMubXlwb3MpOyBcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBhbGVydCgpOiB2b2lkIHtcclxuICAgICAgICBhbGVydChcIlNhdmVJbmZvIERBVEE6XCIgXHJcbiAgICAgICAgICAgICsgXCJcXG5zYXZlX2lkOiAgICBcIiArICh0aGlzLnNhdmVfaWQgICA/PyAnPycpXHJcbiAgICAgICAgICAgICsgXCJcXG5wbGF5ZXJfaWQ6ICBcIiArICh0aGlzLnBsYXllcl9pZCA/PyAnPycpXHJcbiAgICAgICAgICAgICsgXCJcXG51bmlxX25vOiAgICBcIiArICh0aGlzLnVuaXFfbm8gICA/PyAnPycpXHJcbiAgICAgICAgICAgICsgXCJcXG50aXRsZTogICAgICBcIiArICh0aGlzLnRpdGxlICAgICA/PyAnPycpXHJcbiAgICAgICAgICAgICsgXCJcXG5kZXRhaWw6ICAgICBcIiArICh0aGlzLmRldGFpbCAgICA/PyAnPycpXHJcbiAgICAgICAgICAgICsgXCJcXG5wb2ludDogICAgICBcIiArICh0aGlzLnBvaW50ICAgICA/PyAnPycpXHJcbiAgICAgICAgICAgICsgXCJcXG5hdXRvX21vZGU6ICBcIiArICh0aGlzLmF1dG9fbW9kZT8nWSc6J04nKVxyXG4gICAgICAgICAgICArIFwiXFxuaXNfYWN0aXZlOiAgXCIgKyAodGhpcy5pc19hY3RpdmU/J1knOidOJylcclxuICAgICAgICAgICAgKyBcIlxcbmlzX2RlbGV0ZTogIFwiICsgKHRoaXMuaXNfZGVsZXRlPydZJzonTicpXHJcbiAgICAgICAgICAgICsgXCJcXG5teXVybDogICAgICBcIiArICh0aGlzLm15cG9zLnVybCgpICAgICAgPz8gJz8nKVxyXG4gICAgICAgICAgICArIFwiXFxudGVhbV91aWQ6ICAgXCIgKyAodGhpcy5teXBvcy50aWQoKSAgICAgID8/ICc/JylcclxuICAgICAgICAgICAgKyBcIlxcbmxvY19raW5kOiAgIFwiICsgKHRoaXMubXlwb3MuZ2V0X2xja2QoKSA/PyAnPycpXHJcbiAgICAgICAgICAgICsgXCJcXG5sb2NfbmFtZTogICBcIiArICh0aGlzLm15cG9zLmdldF9uYW1lKCkgPz8gJz8nKVxyXG4gICAgICAgICAgICArIFwiXFxubG9jX3VpZDogICAgXCIgKyAodGhpcy5teXBvcy5nZXRfdWlkKCkgID8/ICc/JylcclxuICAgICAgICAgICAgKyBcIlxcblwiXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuXHJcbmltcG9ydCB7IENfUG9pbnQgfSAgICAgICAgICAgICAgIGZyb20gXCIuL0NfUG9pbnRcIjtcclxuaW1wb3J0IHsgQ19Qb2ludERpciB9ICAgICAgICAgICAgZnJvbSAnLi9DX1BvaW50RGlyJztcclxuaW1wb3J0IHsgQ19Nb3ZhYmxlUG9pbnQgfSAgICAgICAgZnJvbSBcIi4vQ19Nb3ZhYmxlUG9pbnRcIjtcclxuaW1wb3J0IHsgQ19XYWxrZXIsIEpTT05fV2Fsa2VyIH0gZnJvbSBcIi4vQ19XYWxrZXJcIjtcclxuaW1wb3J0IHsgQ19IZXJvLCBKU09OX0hlcm8gfSAgICAgZnJvbSBcIi4vQ19IZXJvXCI7XHJcbmltcG9ydCB7IElfTWF6ZU9iaiB9ICAgICAgICAgICAgIGZyb20gXCIuL0NfTWF6ZU9ialwiO1xyXG5pbXBvcnQgeyBKU09OX0FueSB9ICAgICAgICAgICAgICBmcm9tIFwiLi9DX1NhdmVJbmZvXCI7XHJcbmltcG9ydCB7IENfQ3VycmVudFRlYW1WaWV3IH0gICAgIGZyb20gXCIuL0NfVGVhbVZpZXdcIjtcclxuaW1wb3J0IHsgSV9NYXplT2JqVmlldywgSlNPTl9NYXplT2JqVmlldyB9ICBmcm9tIFwiLi9DX01hemVPYmpWaWV3XCI7XHJcbmltcG9ydCB7IENfR29vZCwgIFRfR29vZEtpbmQgfSAgIGZyb20gXCIuL0NfR29vZFwiO1xyXG5pbXBvcnQgeyBDX0dvb2RzTGlzdCwgSlNPTl9Hb29kc0xpc3QgfSBmcm9tIFwiLi9DX0dvb2RzTGlzdE5HXCI7XHJcbmltcG9ydCB7IF9nZXRfdXVpZCB9ICAgICAgICAgICAgIGZyb20gXCIuLi9kX3V0bC9GX1JhbmRcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSlNPTl9UZWFtIGV4dGVuZHMgSlNPTl9Bbnkge1xyXG4gICAgaWQ/OiAgICAgICAgbnVtYmVyLCBcclxuICAgIHVuaXFfaWQ/OiAgIHN0cmluZywgXHJcbiAgICBzYXZlX2lkPzogICBudW1iZXIsIFxyXG4gICAgbmFtZT86ICAgICAgc3RyaW5nLCBcclxuICAgIGxvY2F0ZT86ICAgIEpTT05fV2Fsa2VyLFxyXG4gICAgZ29sZD86ICAgICAgbnVtYmVyLFxyXG4vLyAgICBnb29kcz86ICAgICBKU09OX0dvb2RzTGlzdCxcclxuICAgIGhlcm9lcz86ICAgIEpTT05fSGVyb1tdLCBcclxuICAgIG1vdGlvbj86ICAgIHN0cmluZyxcclxuICAgIHZpZXc/OiAgICAgIEpTT05fTWF6ZU9ialZpZXd8dW5kZWZpbmVkLFxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYWxlcnRfdGVhbV9pbmZvKGE6IEpTT05fVGVhbXx1bmRlZmluZWQpOiB2b2lkIHtcclxuICAgIGlmIChhID09PSB1bmRlZmluZWQpIHJldHVybjtcclxuICAgIGFsZXJ0KFwiVGVhbSBJbmZvOlwiIFxyXG4gICAgICAgICsgXCJcXG5pZDogICAgXCIgICAgICsgKGEuaWQgICAgICAgID8/ICc/JylcclxuICAgICAgICArIFwiXFxudW5pcV9pZDogIFwiICArIChhLnVuaXFfaWQgICA/PyAnPycpXHJcbiAgICAgICAgKyBcIlxcbm5hbWU6ICBcIiAgICAgKyAoYS5uYW1lICAgICAgPz8gJz8nKVxyXG4gICAgICAgICsgXCJcXG5zYXZlX2lkOiBcIiAgICsgKGEuc2F2ZV9pZCAgID8/ICc/JylcclxuICAgICAgICArIFwiXFxudXJsOiAgXCIgICAgICArIChhLmxvY2F0ZT8uY3VyX3VybCAgICA/PyAnPycpXHJcbiAgICAgICAgKyBcIlxcbmxja2Q6IFwiICAgICAgKyAoYS5sb2NhdGU/LmtpbmQgICAgICAgPz8gJz8nKVxyXG4gICAgICAgICsgXCJcXG5sY25tOiBcIiAgICAgICsgKGEubG9jYXRlPy5uYW1lICAgICAgID8/ICc/JylcclxuICAgICAgICArIFwiXFxubGNpZDogXCIgICAgICArIChhLmxvY2F0ZT8ubG9jX3VpZCAgICA/PyAnPycpXHJcbiAgICAgICAgKyBcIlxcbmN1cl94OiBcIiAgICAgKyAoYS5sb2NhdGU/LmxvY19wb3M/LnggPz8gJz8nKVxyXG4gICAgICAgICsgXCJcXG5jdXJfeTogXCIgICAgICsgKGEubG9jYXRlPy5sb2NfcG9zPy55ID8/ICc/JylcclxuICAgICAgICArIFwiXFxuY3VyX3o6IFwiICAgICArIChhLmxvY2F0ZT8ubG9jX3Bvcz8ueiA/PyAnPycpXHJcbiAgICAgICAgKyBcIlxcbmN1cl9kOiBcIiAgICAgKyAoYS5sb2NhdGU/LmxvY19wb3M/LmQgPz8gJz8nKVxyXG4gICAgICAgICsgXCJcXG5nb2xkOiBcIiAgICAgICsgKGEuZ29sZCAgICAgID8/ICAwIClcclxuLy8gICAgICAgICsgXCJcXG5nb29kczogXCIgICAgICsgKE9iamVjdC5rZXlzKGEuZ29vZHM/P1tdKS5sZW5ndGgpXHJcbiAgICAgICAgKyBcIlxcbmhlcm9lczogXCIgICAgKyAoYS5oZXJvZXM/Lmxlbmd0aCA/PyAnPycpXHJcbiAgICAgICAgKyBcIlxcblwiXHJcbiAgICApO1xyXG5cclxuLy8gICAgaWYgKGEuaGVyb2VzICE9PSB1bmRlZmluZWQpIGFsZXJ0X2hlcm9lc19pbmZvKGEuaGVyb2VzKTtcclxufVxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBDX1RlYW0gaW1wbGVtZW50cyBJX01hemVPYmoge1xyXG4gICAgcHVibGljIHN0YXRpYyBuZXdPYmooaj86IEpTT05fVGVhbSk6IENfVGVhbSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBDX1RlYW0oaik7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgbmV3T2JqKGo/OiBKU09OX1RlYW0pOiBDX1RlYW0ge3JldHVybiBDX1RlYW0ubmV3T2JqKGopO31cclxuXHJcbiAgICBwcm90ZWN0ZWQgbXlfaWQ6ICAgICBudW1iZXI7XHJcbiAgICBwcm90ZWN0ZWQgbXlfbmFtZTogICBzdHJpbmc7XHJcbiAgICBwcm90ZWN0ZWQgdW5pcV9pZDogICBzdHJpbmc7XHJcbiAgICBwcm90ZWN0ZWQgc2F2ZV9pZDogICBudW1iZXI7XHJcbiAgICBwcm90ZWN0ZWQgd2Fsa2VyOiAgICBDX1dhbGtlcjtcclxuICAgIHByb3RlY3RlZCBnb2xkOiAgICAgIG51bWJlcjtcclxuLy8gICAgcHJvdGVjdGVkIGdvb2RzOiAgICAgQ19Hb29kc0xpc3Q7XHJcbiAgICBwcm90ZWN0ZWQgaGVyb2VzOiAgICB7W3VpZDogc3RyaW5nXTogQ19IZXJvfTtcclxuXHJcbiAgICBwcm90ZWN0ZWQgbXlWaWV3OiAgICBJX01hemVPYmpWaWV3fHVuZGVmaW5lZDtcclxuICAgIHByb3RlY3RlZCBob3BlX21vdGlvbjogc3RyaW5nO1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihqPzogSlNPTl9UZWFtKSB7XHJcblxyXG4gICAgICAgIHRoaXMubXlfaWQgICAgID0gIDA7XHJcbiAgICAgICAgdGhpcy5teV9uYW1lICAgPSAnTmVvIFRlYW0/JztcclxuICAgICAgICB0aGlzLnVuaXFfaWQgICA9ICdtYWlfdGVhbSMnICsgX2dldF91dWlkKCk7XHJcbiAgICAgICAgdGhpcy5zYXZlX2lkICAgPSAgMDtcclxuXHJcbiAgICAgICAgdGhpcy5teVZpZXcgPSBuZXcgQ19DdXJyZW50VGVhbVZpZXcodGhpcykgYXMgSV9NYXplT2JqVmlldztcclxuICAgICAgICB0aGlzLndhbGtlciA9IG5ldyBDX1dhbGtlcigpO1xyXG4gICAgICAgIHRoaXMud2Fsa2VyLnNldF90aWQodGhpcy51aWQoKSk7XHJcblxyXG4gICAgICAgIHRoaXMuZ29sZCAgID0gMDtcclxuLy8gICAgICAgIHRoaXMuZ29vZHMgID0gbmV3IENfR29vZHNMaXN0KCk7XHJcbiAgICAgICAgdGhpcy5oZXJvZXMgPSB7fTtcclxuICAgICAgICB0aGlzLmhvcGVfbW90aW9uID0gJ05PUCc7ICAgIFxyXG4gICAgICAgIGlmIChqICE9PSB1bmRlZmluZWQpIHRoaXMuZGVjb2RlKGopO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldF9wcnAoYXJnIDogSlNPTl9UZWFtKSB7XHJcbiAgICAgICAgdGhpcy5kZWNvZGUoYXJnKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdWlkKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLnVuaXFfaWR9XHJcblxyXG4gICAgcHVibGljIHdpdGhpbihwOiBDX1BvaW50KTogYm9vbGVhbiB7XHJcbiAgICAgICAgY29uc3QgaGVyZSA9IHRoaXMud2Fsa2VyPy5nZXRfcCgpO1xyXG4gICAgICAgIHJldHVybiBoZXJlPy53aXRoaW4ocCkgPz8gZmFsc2U7IFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB2aWV3KCk6ICBJX01hemVPYmpWaWV3fHVuZGVmaW5lZCB7cmV0dXJuIHRoaXMubXlWaWV3fVxyXG4gICAgcHVibGljIHdhbGsoKTogIENfV2Fsa2VyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy53YWxrZXJcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIGNhblRocm91Z2goKTogYm9vbGVhbiB7cmV0dXJuIHRydWV9XHJcblxyXG5cclxuICAgIHB1YmxpYyBocmVzKCk6ICBDX0hlcm9bXSB7XHJcbiAgICAgICAgY29uc3QgaHJlczogQ19IZXJvW10gPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpaSBpbiB0aGlzLmhlcm9lcykgaHJlcy5wdXNoKHRoaXMuaGVyb2VzW2lpXSk7XHJcbiAgICAgICAgcmV0dXJuIGhyZXM7XHJcbiAgICB9IFxyXG4gICAgcHVibGljIGNsZWFyX2hyZXMoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5oZXJvZXMgPSB7fTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBhZGRfaGVybyhoZXJvOiBDX0hlcm8pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmhlcm9lc1toZXJvLnVpZCgpXSA9IGhlcm87XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgcm12X2hlcm8oaGVybzogQ19IZXJvKTogdm9pZCB7XHJcbiAgICAgICAgZGVsZXRlIHRoaXMuaGVyb2VzW2hlcm8udWlkKCldO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRfbG9jKCk6IENfTW92YWJsZVBvaW50IHtcclxuICAgICAgICByZXR1cm4gdGhpcy53YWxrZXI7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0X2xvYyhsb2M6IENfTW92YWJsZVBvaW50KTogdm9pZCB7XHJcbiAgICAgICAgKHRoaXMud2Fsa2VyID8/PSBuZXcgQ19XYWxrZXIoKSkuZGVjb2RlKGxvYy5lbmNvZGUoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldF9wZCgpOiBDX1BvaW50RGlyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy53YWxrZXIuZ2V0X3BkKCk7XHJcbiAgICB9XHJcblxyXG4vKlxyXG4gICAgcHVibGljIHN0YXRpYyBmcm9tX29ial90b19zdHJpbmcob2E6IENfVGVhbSk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KG9hLCBudWxsLCBcIlxcdFwiKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzdGF0aWMgZnJvbV9vYmpBcnJheV90b19zdHJpbmcob2FhOiB7W3VpZDogc3RyaW5nXTogQ19UZWFtfSk6IHN0cmluZyB7XHJcbiAgICAgICAgY29uc3Qgb2EgPSBbXSBhcyBDX1RlYW1bXTtcclxuICAgICAgICBmb3IgKGNvbnN0IGlpIGluIG9hYSkgb2EucHVzaChvYWFbaWldKTtcclxuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkob2EsIG51bGwsIFwiXFx0XCIpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHN0YXRpYyBmcm9tX3N0cmluZ190b19vYmoodHh0OiBzdHJpbmcpOiBDX1RlYW0ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGogICA9IEpTT04ucGFyc2UodHh0KSBhcyBDX1RlYW1bXTtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBDX1RlYW0oaik7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgQ19UZWFtKCk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzdGF0aWMgZnJvbV9zdHJpbmdfdG9fb2JqQXJyYXkodHh0OiBzdHJpbmcpOiB7W3VpZDogc3RyaW5nXTogQ19UZWFtfSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgaiAgID0gSlNPTi5wYXJzZSh0eHQpIGFzIEpTT05fVGVhbVtdO1xyXG4gICAgICAgICAgICBjb25zdCBtcGEgPSB7fSBhcyB7W2lkOiBzdHJpbmddOiBDX1RlYW19O1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGpqIG9mIGopIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGFhYSA9IG5ldyBDX1RlYW0oKS5kZWNvZGUoamopO1xyXG4gICAgICAgICAgICAgICAgbXBhW2FhYS51aWQoKV0gPSBhYWE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG1wYTtcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHt9O1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiovXHJcbiAgICBcclxuICAgIHB1YmxpYyBlbmNvZGUoKTogSlNPTl9UZWFtIHtcclxuICAgICAgICB0aGlzLmdldF9sb2MoKTsgLy8gTG9jYXRpb27mg4XloLHjgpLmnIDmlrDjgavmm7TmlrBcclxuXHJcbiAgICAgICAgY29uc3QganNvbl9oZXJvZXM6IEpTT05fSGVyb1tdID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaWkgaW4gdGhpcy5oZXJvZXMpIGpzb25faGVyb2VzLnB1c2godGhpcy5oZXJvZXNbaWldLmVuY29kZSgpKTsgIFxyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBpZDogICAgICAgIHRoaXMubXlfaWQsXHJcbiAgICAgICAgICAgIG5hbWU6ICAgICAgdGhpcy5teV9uYW1lLFxyXG4gICAgICAgICAgICB1bmlxX2lkOiAgIHRoaXMudW5pcV9pZCxcclxuICAgICAgICAgICAgc2F2ZV9pZDogICB0aGlzLnNhdmVfaWQsXHJcbiAgICAgICAgICAgIGxvY2F0ZTogICAgdGhpcy53YWxrZXIuZW5jb2RlKCksXHJcbiAgICAgICAgICAgIGdvbGQ6ICAgICAgdGhpcy5nb2xkLFxyXG4vLyAgICAgICAgICAgIGdvb2RzOiAgICAgdGhpcy5nb29kcy5lbmNvZGUoKSxcclxuICAgICAgICAgICAgaGVyb2VzOiAgICBqc29uX2hlcm9lcyxcclxuICAgICAgICAgICAgbW90aW9uOiAgICB0aGlzLmhvcGVfbW90aW9uLFxyXG4gICAgICAgICAgICB2aWV3OiAgICAgIHRoaXMubXlWaWV3Py5lbmNvZGUoKSA/PyB7fSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgcHVibGljIGRlY29kZShhOiBKU09OX1RlYW18dW5kZWZpbmVkKTogQ19UZWFtIHtcclxuICAgICAgICBpZiAoYSA9PT0gdW5kZWZpbmVkKSAgcmV0dXJuIHRoaXM7XHJcblxyXG4gICAgICAgIGlmIChhLmlkICAgIT09IHVuZGVmaW5lZCkgICAgdGhpcy5teV9pZCAgICAgICA9IGEuaWQ7XHJcbiAgICAgICAgaWYgKGEubmFtZSAhPT0gdW5kZWZpbmVkKSAgICB0aGlzLm15X25hbWUgICAgID0gYS5uYW1lO1xyXG4gICAgICAgIGlmIChhLnVuaXFfaWQgIT09IHVuZGVmaW5lZCkgdGhpcy51bmlxX2lkICAgICA9IGEudW5pcV9pZDtcclxuICAgICAgICBpZiAoYS5zYXZlX2lkICE9PSB1bmRlZmluZWQpIHRoaXMuc2F2ZV9pZCAgICAgPSBhLnNhdmVfaWQ7XHJcbiAgICAgICAgaWYgKGEubW90aW9uICE9PSB1bmRlZmluZWQpICB0aGlzLmhvcGVfbW90aW9uID0gYS5tb3Rpb247XHJcblxyXG4gICAgICAgIGlmIChhLmxvY2F0ZSAhPT0gdW5kZWZpbmVkKSAgdGhpcy53YWxrZXIuZGVjb2RlKGEubG9jYXRlKTtcclxuICAgICAgICBpZiAoYS5nb2xkICAgIT09IHVuZGVmaW5lZCkgIHRoaXMuZ29sZCA9IGEuZ29sZDtcclxuLy8gICAgICAgIGlmIChhLmdvb2RzICAhPT0gdW5kZWZpbmVkKSAgdGhpcy5nb29kcy5kZWNvZGUoYS5nb29kcyk7XHJcblxyXG4gICAgICAgIGlmIChhLmhlcm9lcyAhPT0gdW5kZWZpbmVkKSAge1xyXG4gICAgICAgICAgICB0aGlzLmhlcm9lcyA9IHt9O1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGpzb25faGVybyBvZiBhLmhlcm9lcykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaGVybyA9IG5ldyBDX0hlcm8oanNvbl9oZXJvKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGVyb2VzW2hlcm8udWlkKCldID0gaGVybztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuLypcclxuICAgICAgICBpZiAoYS52aWV3ICAgICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgaWYgKE9iamVjdC5rZXlzKGEudmlldykubGVuZ3RoID4gMCkgdGhpcy5teVZpZXcgPSBDX01hemVPYmpWaWV3Lm5ld09iaihhLnZpZXcpOyBcclxuICAgICAgICAgICAgZWxzZSB0aGlzLm15VmlldyA9IG5ldyBDX0N1cnJlbnRUZWFtVmlldyh0aGlzKSBhcyBJX01hemVPYmpWaWV3OyBcclxuICAgICAgICB9XHJcbiovXHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc3RhdGljIGVuY29kZV9hbGwoYWxsX3RlYW06IENfVGVhbVtdKTogSlNPTl9UZWFtW10ge1xyXG4gICAgICAgIGNvbnN0IGFsbF90ZWFtX2RhdGE6IEpTT05fVGVhbVtdID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgdGVhbSBvZiBhbGxfdGVhbSkge1xyXG4gICAgICAgICAgICBhbGxfdGVhbV9kYXRhLnB1c2godGVhbS5lbmNvZGUoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhbGxfdGVhbV9kYXRhO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHN0YXRpYyBkZWNvZGVfYWxsKGFsbF90ZWFtX2RhdGE6IEpTT05fVGVhbVtdKTogQ19UZWFtW10ge1xyXG4gICAgICAgIGNvbnN0IGFsbF90ZWFtOiBDX1RlYW1bXSA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IHRlYW1fZGF0YSBvZiBhbGxfdGVhbV9kYXRhKSB7XHJcbiAgICAgICAgICAgIGFsbF90ZWFtLnB1c2goKG5ldyBDX1RlYW0oKSkuZGVjb2RlKHRlYW1fZGF0YSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYWxsX3RlYW07XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBhbGVydCgpOiB2b2lkIHtcclxuICAgICAgICBhbGVydChcIlRlYW0gSW5mbzpcIiBcclxuICAgICAgICAgICAgKyBcIlxcbmlkOiAgICBcIiAgICAgKyAodGhpcy5teV9pZCAgICAgICAgICAgID8/ICc/JylcclxuICAgICAgICAgICAgKyBcIlxcbnVuaXFfaWQ6ICBcIiAgKyAodGhpcy51bmlxX2lkICAgICAgICAgID8/ICc/JylcclxuICAgICAgICAgICAgKyBcIlxcbm5hbWU6ICBcIiAgICAgKyAodGhpcy5teV9uYW1lICAgICAgICAgID8/ICc/JylcclxuICAgICAgICAgICAgKyBcIlxcbnNhdmVfaWQ6IFwiICAgKyAodGhpcy5zYXZlX2lkICAgICAgICAgID8/ICc/JylcclxuICAgICAgICAgICAgKyBcIlxcbnVybDogIFwiICAgICAgKyAodGhpcy53YWxrZXIudXJsKCkgICAgID8/ICc/JylcclxuICAgICAgICAgICAgKyBcIlxcbmxja2Q6IFwiICAgICAgKyAodGhpcy53YWxrZXIuZ2V0X2xja2Rfc3RyKCkgPz8gJz8nKVxyXG4gICAgICAgICAgICArIFwiXFxubGNubTogXCIgICAgICArICh0aGlzLndhbGtlci5nZXRfbmFtZSgpICAgICA/PyAnPycpXHJcbiAgICAgICAgICAgICsgXCJcXG5sY2lkOiBcIiAgICAgICsgKHRoaXMud2Fsa2VyLmdldF91aWQoKSAgICAgID8/ICc/JylcclxuICAgICAgICAgICAgKyBcIlxcbmN1cl94OiBcIiAgICAgKyAodGhpcy53YWxrZXIuZ2V0X3AoKS54ID8/ICc/JylcclxuICAgICAgICAgICAgKyBcIlxcbmN1cl95OiBcIiAgICAgKyAodGhpcy53YWxrZXIuZ2V0X3AoKS55ID8/ICc/JylcclxuICAgICAgICAgICAgKyBcIlxcbmN1cl96OiBcIiAgICAgKyAodGhpcy53YWxrZXIuZ2V0X3AoKS56ID8/ICc/JylcclxuICAgICAgICAgICAgKyBcIlxcbmN1cl9kOiBcIiAgICAgKyAodGhpcy53YWxrZXIuZ2V0X2QoKSAgID8/ICc/JylcclxuICAgICAgICAgICAgKyBcIlxcbmdvbGQ6IFwiICAgICAgKyAoT2JqZWN0LmtleXModGhpcy5nb2xkID8/IHt9KS5sZW5ndGgpXHJcbiAgICAgICAgICAgICsgXCJcXG5oZXJvZXM6IFwiICAgICsgKHRoaXMuaGVyb2VzPy5sZW5ndGggPz8gJz8nKVxyXG4gICAgICAgICAgICArIFwiXFxuXCJcclxuICAgICAgICApO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGFsZXJ0X2hyZXMoKTogdm9pZCB7XHJcbi8vICAgICAgICBhbGVydChcIlRlYW0gSW5mbzpcIik7XHJcbiAgICAgICAgZm9yIChjb25zdCBpaSBpbiB0aGlzLmhlcm9lcykgdGhpcy5oZXJvZXNbaWldLmFsZXJ0KCk7XHJcbiAgICB9XHJcbn1cclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5pbXBvcnQgeyBUX0RpcmVjdGlvbiB9ICAgICAgIGZyb20gJy4vQ19Qb2ludERpcic7XHJcbmltcG9ydCB7IENfVGVhbSwgSlNPTl9UZWFtIH0gZnJvbSBcIi4vQ19UZWFtXCI7XHJcbmltcG9ydCB7IFRfV2FsbCB9ICAgICAgICAgICAgZnJvbSBcIi4uL2RfbWRsL0NfV2FsbFwiO1xyXG5pbXBvcnQgeyBJX01hemVPYmpWaWV3LCBKU09OX01hemVPYmpWaWV3IH0gIGZyb20gXCIuL0NfTWF6ZU9ialZpZXdcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBDX0N1cnJlbnRUZWFtVmlldyAgaW1wbGVtZW50cyBJX01hemVPYmpWaWV3IHtcclxuICAgIHB1YmxpYyAgc3RhdGljIG5ld09iaihqPzogSlNPTl9UZWFtKTogSV9NYXplT2JqVmlldyB7XHJcbiAgICAgICAgY29uc3QgdGVhbSA9IG5ldyBDX1RlYW0oaik7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBDX0N1cnJlbnRUZWFtVmlldyh0ZWFtKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyAgbmV3T2JqKGo/OiBKU09OX1RlYW0pOiBJX01hemVPYmpWaWV3IHtyZXR1cm4gQ19DdXJyZW50VGVhbVZpZXcubmV3T2JqKGopfVxyXG5cclxuICAgIFxyXG4gICAgcHJpdmF0ZSBteV90ZWFtOiBDX1RlYW07XHJcbiAgICBwcml2YXRlIG15X2xheWVyOiAgbnVtYmVyID0gOTk7XHJcbiAgICBwdWJsaWMgIGNvbnN0cnVjdG9yKHRlYW06IENfVGVhbSkge1xyXG4gICAgICAgIHRoaXMubXlfdGVhbSA9IHRlYW07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGxheWVyKCk6IG51bWJlciAgICAgICAgIHtyZXR1cm4gdGhpcy5teV9sYXllcjt9XHJcbiAgICBwdWJsaWMgc2V0X2xheWVyKGxheWVyOiBudW1iZXIpOiB2b2lkIHt0aGlzLm15X2xheWVyID0gbGF5ZXI7fVxyXG4gICAgcHVibGljIGxldHRlcigpOiBzdHJpbmd8bnVsbCB7XHJcbiAgICAgICAgc3dpdGNoICh0aGlzLm15X3RlYW0ud2FsaygpLmdldF9kKCkpIHtcclxuICAgICAgICAgICAgY2FzZSBUX0RpcmVjdGlvbi5OOiByZXR1cm4gJ+KGkSc7XHJcbiAgICAgICAgICAgIGNhc2UgVF9EaXJlY3Rpb24uRTogcmV0dXJuICfihpInO1xyXG4gICAgICAgICAgICBjYXNlIFRfRGlyZWN0aW9uLlM6IHJldHVybiAn4oaTJztcclxuICAgICAgICAgICAgY2FzZSBUX0RpcmVjdGlvbi5XOiByZXR1cm4gJ+KGkCc7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiAn8J+MgCc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIGNhblNob3coKTogYm9vbGVhbntyZXR1cm4gZmFsc2V9XHJcbiAgICBwdWJsaWMgZHJvdzNEKGZyb3Q6IFRfV2FsbCwgYmFjazogVF9XYWxsKTogdm9pZCB7fVxyXG4gICAgcHVibGljIHBhZF90KCk6ICAgbnVtYmVyIHtyZXR1cm4gMC4wfSBcclxuICAgIHB1YmxpYyBwYWRfZCgpOiAgIG51bWJlciB7cmV0dXJuIDAuMH0gXHJcbiAgICBwdWJsaWMgcGFkX3MoKTogICBudW1iZXIge3JldHVybiAwLjB9IFxyXG4gICAgcHVibGljIGNvbF9mKCk6ICAgc3RyaW5nfG51bGwge3JldHVybiBudWxsfSBcclxuICAgIHB1YmxpYyBjb2xfYigpOiAgIHN0cmluZ3xudWxsIHtyZXR1cm4gbnVsbH0gXHJcbiAgICBwdWJsaWMgY29sX3MoKTogICBzdHJpbmd8bnVsbCB7cmV0dXJuIG51bGx9IFxyXG4gICAgcHVibGljIGNvbF90KCk6ICAgc3RyaW5nfG51bGwge3JldHVybiBudWxsfSBcclxuICAgIHB1YmxpYyBjb2xfZCgpOiAgIHN0cmluZ3xudWxsIHtyZXR1cm4gbnVsbH0gXHJcbiAgICBwdWJsaWMgY29sX2woKTogICBzdHJpbmd8bnVsbCB7cmV0dXJuIG51bGx9IFxyXG5cclxuICAgIHB1YmxpYyBlbmNvZGUoKTogSlNPTl9NYXplT2JqVmlldyB7cmV0dXJuIHtjbmFtZTogJ0N1cnJlbnRUZWFtVmlldyd9fVxyXG4gICAgcHVibGljIGRlY29kZShqOiBKU09OX01hemVPYmpWaWV3fHVuZGVmaW5lZCk6IElfTWF6ZU9ialZpZXcge3JldHVybiB0aGlzIGFzIElfTWF6ZU9ialZpZXd9XHJcbn1cclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5pbXBvcnQgeyBDX1BvaW50RGlyLCBUX0RpcmVjdGlvbiB9ICAgICAgICAgICBmcm9tIFwiLi9DX1BvaW50RGlyXCI7XHJcbmltcG9ydCB7IENfTW92YWJsZVBvaW50LCBKU09OX01vdmFibGVQb2ludCB9IGZyb20gXCIuL0NfTW92YWJsZVBvaW50XCI7XHJcbmltcG9ydCB7IElfTG9jYXRlIH0gICAgIGZyb20gXCIuL0NfTG9jYXRpb25cIjtcclxuaW1wb3J0IHsgSV9Ib3BlQWN0aW9uIH0gZnJvbSBcIi4vSV9Db21tb25cIjtcclxuXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEpTT05fV2Fsa2VyIGV4dGVuZHMgSlNPTl9Nb3ZhYmxlUG9pbnQge1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQ19XYWxrZXIgZXh0ZW5kcyBDX01vdmFibGVQb2ludCB7XHJcbiAgICBjb25zdHJ1Y3RvcihqPzogSlNPTl9XYWxrZXIpIHtcclxuICAgICAgICBzdXBlcihqKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRfeCgpOiBudW1iZXIge3JldHVybiB0aGlzLmxvY19wb3MueH1cclxuICAgIHB1YmxpYyBnZXRfeSgpOiBudW1iZXIge3JldHVybiB0aGlzLmxvY19wb3MueX1cclxuICAgIHB1YmxpYyBnZXRfeigpOiBudW1iZXIge3JldHVybiB0aGlzLmxvY19wb3Muen1cclxuXHJcbiAgICBwdWJsaWMgc2V0X3goeDogbnVtYmVyKTogdm9pZCB7dGhpcy5sb2NfcG9zLnggPSB4fVxyXG4gICAgcHVibGljIHNldF95KHk6IG51bWJlcik6IHZvaWQge3RoaXMubG9jX3Bvcy55ID0geX1cclxuICAgIHB1YmxpYyBzZXRfeih6OiBudW1iZXIpOiB2b2lkIHt0aGlzLmxvY19wb3MueiA9IHp9XHJcblxyXG4gICAgcHVibGljIHNldF9wbGFjZShcclxuICAgICAgICBwbGFjZTogSV9Mb2NhdGUsIFxyXG4gICAgICAgIHVybD86ICBzdHJpbmcsIFxyXG4gICAgICAgIHBvcz86ICBDX1BvaW50RGlyKSB7XHJcblxyXG4gICAgICAgIHRoaXMuc2V0X3VpZCAocGxhY2UudWlkKCkpO1xyXG4gICAgICAgIHRoaXMuc2V0X2xja2QocGxhY2UuZ2V0X2xja2QoKSk7XHJcbiAgICAgICAgdGhpcy5zZXRfbmFtZShwbGFjZS5nZXRfbmFtZSgpKTtcclxuXHJcbiAgICAgICAgaWYgKHVybCAhPT0gdW5kZWZpbmVkKSB0aGlzLnNldF91cmwodXJsKTtcclxuICAgICAgICBpZiAocG9zICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRfcGQocG9zKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICBwdWJsaWMgaG9wZV9wX2Z3ZCgpOiBJX0hvcGVBY3Rpb24ge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGhhc19ob3BlOiB0cnVlLCBcclxuICAgICAgICAgICAgaG9wZTogXCJNb3ZlXCIsXHJcbiAgICAgICAgICAgIHN1Ymo6IHRoaXMuZ2V0X3BfZndkKCksXHJcbiAgICAgICAgICAgIGRvT0s6ICgpPT57dGhpcy5zZXRfcF9md2QoKTt9LFxyXG4gICAgICAgICAgICBkb05HOiAoKT0+e3RoaXMuaXNORygpO30sXHJcbiAgICAgICAgICAgfTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBob3BlX3BfYmFrKCk6IElfSG9wZUFjdGlvbiB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgaGFzX2hvcGU6IHRydWUsIFxyXG4gICAgICAgICAgICBob3BlOiBcIk1vdmVcIixcclxuICAgICAgICAgICAgc3ViajogdGhpcy5nZXRfcF9iYWsoKSxcclxuICAgICAgICAgICAgZG9PSzogKCk9Pnt0aGlzLnNldF9wX2JhaygpO30sXHJcbiAgICAgICAgICAgIGRvTkc6ICgpPT57dGhpcy5pc05HKCk7fSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgaG9wZV9wX2xmdCgpOiBJX0hvcGVBY3Rpb24ge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGhhc19ob3BlOiB0cnVlLCBcclxuICAgICAgICAgICAgaG9wZTogXCJNb3ZlXCIsXHJcbiAgICAgICAgICAgIHN1Ymo6IHRoaXMuZ2V0X3BfbGZ0KCksXHJcbiAgICAgICAgICAgIGRvT0s6ICgpPT57dGhpcy5zZXRfcF9sZnQoKTt9LFxyXG4gICAgICAgICAgICBkb05HOiAoKT0+e3RoaXMuaXNORygpO30sXHJcbiAgICAgICAgICAgfTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBob3BlX3Bfcmd0KCk6IElfSG9wZUFjdGlvbiB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgaGFzX2hvcGU6IHRydWUsIFxyXG4gICAgICAgICAgICBob3BlOiBcIk1vdmVcIixcclxuICAgICAgICAgICAgc3ViajogdGhpcy5nZXRfcF9yZ3QoKSxcclxuICAgICAgICAgICAgZG9PSzogKCk9Pnt0aGlzLnNldF9wX3JndCgpO30sXHJcbiAgICAgICAgICAgIGRvTkc6ICgpPT57dGhpcy5pc05HKCk7fSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgcHVibGljIGhvcGVfdHVybl9yKCk6IElfSG9wZUFjdGlvbiB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgaGFzX2hvcGU6IHRydWUsIFxyXG4gICAgICAgICAgICBob3BlOiBcIlR1cm5cIixcclxuICAgICAgICAgICAgc3ViajogdGhpcy5nZXRfcGQoKSxcclxuICAgICAgICAgICAgZG9PSzogKCk9Pnt0aGlzLnR1cm5fcigpO30sXHJcbiAgICAgICAgICAgIGRvTkc6ICgpPT57dGhpcy5pc05HKCk7fSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgcHVibGljIGhvcGVfdHVybl9sKCk6IElfSG9wZUFjdGlvbiB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgaGFzX2hvcGU6IHRydWUsIFxyXG4gICAgICAgICAgICBob3BlOiBcIlR1cm5cIixcclxuICAgICAgICAgICAgc3ViajogdGhpcy5nZXRfcGQoKSxcclxuICAgICAgICAgICAgZG9PSzogKCk9Pnt0aGlzLnR1cm5fbCgpO30sXHJcbiAgICAgICAgICAgIGRvTkc6ICgpPT57dGhpcy5pc05HKCk7fSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBob3BlX3BfdXAoKTogSV9Ib3BlQWN0aW9uIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBoYXNfaG9wZTogdHJ1ZSwgXHJcbiAgICAgICAgICAgIGhvcGU6IFwiVXBcIixcclxuICAgICAgICAgICAgc3ViajogdGhpcy5nZXRfcF91cCgpLFxyXG4gICAgICAgICAgICBkb09LOiAoKT0+e3RoaXMubW92ZV9wX3VwKCk7fSxcclxuICAgICAgICAgICAgZG9ORzogKCk9Pnt0aGlzLmlzTkcoKTt9LFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgaG9wZV9wX2Rvd24oKTogSV9Ib3BlQWN0aW9uIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBoYXNfaG9wZTogdHJ1ZSwgXHJcbiAgICAgICAgICAgIGhvcGU6IFwiRG93blwiLFxyXG4gICAgICAgICAgICBzdWJqOiB0aGlzLmdldF9wX2Rvd24oKSxcclxuICAgICAgICAgICAgZG9PSzogKCk9Pnt0aGlzLm1vdmVfcF9kb3duKCk7fSxcclxuICAgICAgICAgICAgZG9ORzogKCk9Pnt0aGlzLmlzTkcoKTt9LFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG1vdmVfcF91cCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNldF9wX3VwKCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgbW92ZV9wX2Rvd24oKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zZXRfcF9kb3duKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGlzTkcoKTogdm9pZCB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgZ2V0X3BfZndkKCk6IENfUG9pbnREaXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9fZ2V0X3BfbW92ZSgxLCAwKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXRfcF9md2QoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zZXRfcGQodGhpcy5nZXRfcF9md2QoKSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0X3BfYmFrKCk6IENfUG9pbnREaXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9fZ2V0X3BfbW92ZSgtMSwgMCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0X3BfYmFrKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc2V0X3BkKHRoaXMuZ2V0X3BfYmFrKCkpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldF9wX2xmdCgpOiBDX1BvaW50RGlyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fX2dldF9wX21vdmUoMCwgLTEpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldF9wX2xmdCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNldF9wZCh0aGlzLmdldF9wX2xmdCgpKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRfcF9yZ3QoKTogQ19Qb2ludERpciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX19nZXRfcF9tb3ZlKDAsIDEpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldF9wX3JndCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNldF9wZCh0aGlzLmdldF9wX3JndCgpKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRfcF91cCgpOiBDX1BvaW50RGlyIHtcclxuICAgICAgICBjb25zdCBwID0gbmV3IENfUG9pbnREaXIodGhpcy5sb2NfcG9zKTtcclxuICAgICAgICBwLnotLTtcclxuICAgICAgICByZXR1cm4gcDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXRfcF91cCgpIHtcclxuICAgICAgICB0aGlzLnNldF9wZCh0aGlzLmdldF9wX3VwKCkpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldF9wX2Rvd24oKTogQ19Qb2ludERpciB7XHJcbiAgICAgICAgY29uc3QgcCA9IG5ldyBDX1BvaW50RGlyKHRoaXMubG9jX3Bvcyk7XHJcbiAgICAgICAgcC56Kys7XHJcbiAgICAgICAgcmV0dXJuIHA7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0X3BfZG93bigpIHtcclxuICAgICAgICB0aGlzLnNldF9wZCh0aGlzLmdldF9wX2Rvd24oKSk7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgX19nZXRfcF9tb3ZlKG9mZnNldEZCOiBudW1iZXIsIG9mZnNldExSOiBudW1iZXIpOiBDX1BvaW50RGlyIHtcclxuICAgICAgICBjb25zdCBwID0gbmV3IENfUG9pbnREaXIodGhpcy5sb2NfcG9zKTtcclxuICAgICAgICBpZiAob2Zmc2V0RkIgIT09IDApIHtcclxuICAgICAgICAgICAgc3dpdGNoICh0aGlzLmxvY19wb3MuZCkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBUX0RpcmVjdGlvbi5OOiBwLnkgLT0gb2Zmc2V0RkI7YnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFRfRGlyZWN0aW9uLkU6IHAueCArPSBvZmZzZXRGQjticmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgVF9EaXJlY3Rpb24uUzogcC55ICs9IG9mZnNldEZCO2JyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBUX0RpcmVjdGlvbi5XOiBwLnggLT0gb2Zmc2V0RkI7YnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG9mZnNldExSICE9PSAwKSB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5sb2NfcG9zLmQpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgVF9EaXJlY3Rpb24uTjogcC54ICs9IG9mZnNldExSO2JyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBUX0RpcmVjdGlvbi5FOiBwLnkgKz0gb2Zmc2V0TFI7YnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFRfRGlyZWN0aW9uLlM6IHAueCAtPSBvZmZzZXRMUjticmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgVF9EaXJlY3Rpb24uVzogcC55IC09IG9mZnNldExSO2JyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldF9hcm91bmQoZnJvbnQ6IG51bWJlciwgcmlnaHQ6bnVtYmVyLCB1cDogbnVtYmVyID0gMCk6IENfUG9pbnREaXIge1xyXG4gICAgICAgIHZhciB0YXJnZXRfeCAgPSB0aGlzLmxvY19wb3MueDtcclxuICAgICAgICB2YXIgdGFyZ2V0X3kgID0gdGhpcy5sb2NfcG9zLnk7XHJcbiAgICAgICAgdmFyIHRhcmdldF96ICA9IHRoaXMubG9jX3Bvcy56IC0gdXA7XHJcbiAgICAgICAgc3dpdGNoICh0aGlzLmxvY19wb3MuZCkge1xyXG4gICAgICAgICAgICBjYXNlIFRfRGlyZWN0aW9uLk46XHJcbiAgICAgICAgICAgICAgICB0YXJnZXRfeCArPSByaWdodDtcclxuICAgICAgICAgICAgICAgIHRhcmdldF95IC09IGZyb250O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgVF9EaXJlY3Rpb24uRTpcclxuICAgICAgICAgICAgICAgIHRhcmdldF94ICs9IGZyb250O1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0X3kgKz0gcmlnaHQ7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBUX0RpcmVjdGlvbi5TOlxyXG4gICAgICAgICAgICAgICAgdGFyZ2V0X3ggLT0gcmlnaHQ7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXRfeSArPSBmcm9udDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFRfRGlyZWN0aW9uLlc6XHJcbiAgICAgICAgICAgICAgICB0YXJnZXRfeCAtPSBmcm9udDtcclxuICAgICAgICAgICAgICAgIHRhcmdldF95IC09IHJpZ2h0O1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXcgQ19Qb2ludERpcih7eDogdGFyZ2V0X3gsIHk6IHRhcmdldF95LCB6OiB0YXJnZXRfeiwgZDogdGhpcy5sb2NfcG9zLmR9KTtcclxuICAgIH1cclxuICAgIHB1YmxpYyB0dXJuX3IoKTogdm9pZCB7XHJcbiAgICAgICAgc3dpdGNoICh0aGlzLmxvY19wb3MuZCkge1xyXG4gICAgICAgICAgICBjYXNlIFRfRGlyZWN0aW9uLk46IHRoaXMubG9jX3Bvcy5kID0gVF9EaXJlY3Rpb24uRTticmVhaztcclxuICAgICAgICAgICAgY2FzZSBUX0RpcmVjdGlvbi5FOiB0aGlzLmxvY19wb3MuZCA9IFRfRGlyZWN0aW9uLlM7YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgVF9EaXJlY3Rpb24uUzogdGhpcy5sb2NfcG9zLmQgPSBUX0RpcmVjdGlvbi5XO2JyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFRfRGlyZWN0aW9uLlc6IHRoaXMubG9jX3Bvcy5kID0gVF9EaXJlY3Rpb24uTjticmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgdHVybl9sKCk6IHZvaWQge1xyXG4gICAgICAgIHN3aXRjaCAodGhpcy5sb2NfcG9zLmQpIHtcclxuICAgICAgICAgICAgY2FzZSBUX0RpcmVjdGlvbi5OOiB0aGlzLmxvY19wb3MuZCA9IFRfRGlyZWN0aW9uLlc7YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgVF9EaXJlY3Rpb24uRTogdGhpcy5sb2NfcG9zLmQgPSBUX0RpcmVjdGlvbi5OO2JyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFRfRGlyZWN0aW9uLlM6IHRoaXMubG9jX3Bvcy5kID0gVF9EaXJlY3Rpb24uRTticmVhaztcclxuICAgICAgICAgICAgY2FzZSBUX0RpcmVjdGlvbi5XOiB0aGlzLmxvY19wb3MuZCA9IFRfRGlyZWN0aW9uLlM7YnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIHR1cm5fYigpOiB2b2lkIHtcclxuICAgICAgICBzd2l0Y2ggKHRoaXMubG9jX3Bvcy5kKSB7XHJcbiAgICAgICAgICAgIGNhc2UgVF9EaXJlY3Rpb24uTjogdGhpcy5sb2NfcG9zLmQgPSBUX0RpcmVjdGlvbi5TO2JyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFRfRGlyZWN0aW9uLkU6IHRoaXMubG9jX3Bvcy5kID0gVF9EaXJlY3Rpb24uVzticmVhaztcclxuICAgICAgICAgICAgY2FzZSBUX0RpcmVjdGlvbi5TOiB0aGlzLmxvY19wb3MuZCA9IFRfRGlyZWN0aW9uLk47YnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgVF9EaXJlY3Rpb24uVzogdGhpcy5sb2NfcG9zLmQgPSBUX0RpcmVjdGlvbi5XO2JyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBlbmNvZGUoKTogSlNPTl9XYWxrZXIge1xyXG4gICAgICAgIGNvbnN0IGogPSBzdXBlci5lbmNvZGUoKSBhcyBKU09OX1dhbGtlcjtcclxuICAgICAgICByZXR1cm4gajtcclxuICAgIH1cclxuICAgIHB1YmxpYyBkZWNvZGUoYTogSlNPTl9XYWxrZXIpOiBDX1dhbGtlciB7XHJcbiAgICAgICAgaWYgKGEgPT09IHVuZGVmaW5lZCkgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgc3VwZXIuZGVjb2RlKGEpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG59XHJcblxyXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgX3JvdW5kIH0gIGZyb20gXCIuLi9kX3V0bC9GX01hdGhcIjtcbmltcG9ydCB7IENfUmFuZ2UgfSBmcm9tIFwiLi9DX1JhbmdlXCI7XG5cbmV4cG9ydCB0eXBlIFRfV2FsbCA9IHtcbiAgICBtaW5feDogbnVtYmVyLFxuICAgIG1heF94OiBudW1iZXIsXG4gICAgbWluX3k6IG51bWJlcixcbiAgICBtYXhfeTogbnVtYmVyLFxufVxuXG5leHBvcnQgY2xhc3MgQ19XYWxsIHtcbiAgICBwcm90ZWN0ZWQgdzogVF9XYWxsW11bXTtcbiAgICBwcm90ZWN0ZWQgZDogbnVtYmVyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKGRlcHRoOiBudW1iZXIgPSA1LCBzaXplOiBDX1JhbmdlKSB7XG4gICAgICAgIGlmIChkZXB0aCA8IDMpIGRlcHRoID0gNTtcbiAgICAgICAgaWYgKGRlcHRoICUgMiAhPT0gMSkgZGVwdGgrKzsgIC8vIOWlh+aVsOOBruOBv+WvvuW/nOOAglxuXG4gICAgICAgIGNvbnN0IG1pbl94OiBudW1iZXIgPSBzaXplLm1pbl94KCk7XG4gICAgICAgIGNvbnN0IG1pbl95OiBudW1iZXIgPSBzaXplLm1pbl95KCk7XG4gICAgICAgIGNvbnN0IG1heF94OiBudW1iZXIgPSBzaXplLm1heF94KCk7XG4gICAgICAgIGNvbnN0IG1heF95OiBudW1iZXIgPSBzaXplLm1heF95KCk7XG4gICAgXG4gICAgICAgIGNvbnN0IGNlbnRlcl94OiBudW1iZXIgPSAobWF4X3ggLSBtaW5feCkgLyAyO1xuICAgIFxuICAgICAgICAvLyDln7rmupbjgajjgarjgovlo4Eo5LiA55Wq6YGg44GP44Gu5aOBKeOBruato+mdouOCteOCpOOCuijmqKrluYUp44KS5rGC44KB44KLXG4gICAgICAgIC8vIOS4gOeVqumBoOOBjyhkZXB0aCAtIDEp44Gu5aOB44Gu5pWw44GMZGVwdGjlgIvjgavjgarjgovjgojjgYbjgavoqr/mlbTjgZnjgotcbiAgICAgICAgY29uc3QgZnJvbnRfd2FsbF9zaXplX3g6IG51bWJlciA9IChtYXhfeCAtIG1pbl94KSAvIGRlcHRoO1xuXG4gICAgICAgIC8vIOWfuua6luOBqOOBquOCi+WBtOWjgeOBruOCteOCpOOCuijmqKrluYUp44KS5rGC44KB44KLXG4gICAgICAgIC8vIOS4gOeVqumBoOOBj+OBruWjgSjkuK3lpK4p44Gu5bem56uv44GL44KJZGVwdGjlgIvjga7lgbTlo4HjgpLlj5bjgozjgovjgojjgYbjgavjgrXjgqTjgrroqr/mlbTjgZnjgotcbiAgICAgICAgY29uc3Qgc2lkZV93YWxsX3NpemVfeDogIG51bWJlciA9IChjZW50ZXJfeCAtIGZyb250X3dhbGxfc2l6ZV94IC8gMikgLyBkZXB0aDtcbiAgICBcbiAgICAgICAgLy8g5ZCEZGVwdGjliKXjga7mraPpnaLlo4Hjga7mqKrluYXjgpLmsYLjgoHjgovjgIJcbiAgICAgICAgLy8g6KiI566X44Gu5Yip5L6/5oCn44KS6ICD5oWu44GX44Gm44CB44OP44O844OV44K144Kk44K644KS5rGC44KB44KLXG4gICAgICAgIGNvbnN0IGZyb250X3dhbGxfSF9zaXplX3g6IG51bWJlcltdID0gbmV3IEFycmF5KGRlcHRoICsgMSk7XG4gICAgXG4gICAgICAgIGZyb250X3dhbGxfSF9zaXplX3hbZGVwdGhdID0gZnJvbnRfd2FsbF9zaXplX3ggLyAyO1xuICAgICAgICBmb3IgKGxldCBpID0gZGVwdGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgZnJvbnRfd2FsbF9IX3NpemVfeFtpXSA9IGZyb250X3dhbGxfSF9zaXplX3hbaSArIDFdICsgc2lkZV93YWxsX3NpemVfeDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIOWfuua6luOBqOOBquOCi+WjgSjkuIDnlarpgaDjgY/jga7lo4Ep44Gu5q2j6Z2i44K144Kk44K6KOe4puW5hSnjgpLmsYLjgoHjgotcbiAgICAgICAgLy8g5LiA55Wq6YGg44GPKGRlcHRoIC0gMSnjga7lo4Hjga7mlbDjgYxkZXB0aOWAi+OBq+OBquOCi+OCiOOBhuOBq+iqv+aVtOOBmeOCi1xuICAgICAgICBjb25zdCBmcm9udF93YWxsX3NpemVfeTogbnVtYmVyID0gKG1heF95IC0gbWluX3kpIC8gZGVwdGg7XG5cbiAgICAgICAgLy8g5aSp5LqV44Gu57im5bmF44Gu5aKX5YiG44KS5rGC44KB44KL44CC5Ymy5ZCI44Gv6YGp5b2T77yI56yR77yJXG4gICAgICAgIC8vIOOCreODo+ODs+ODkOOCueOBrumrmOOBlShtYXhfeSAtIG1pbl95KeOBi+OCieS4gOeVqumBoOOBj+OBruWjgeOBrumrmOOBleOCkuW8leOBhOOBplxuICAgICAgICAvLyDmt7HjgZUoZGVwdGggKyAxKeOBp+WJsuOCi+OBk+OBqOOBq+OCiOOCiuWil+WIhuOBqOOBl+OBn1xuICAgICAgICBjb25zdCBzaWRlX3dhbGxfc2l6ZV9UID0gIChtYXhfeSAtIG1pbl95IC0gZnJvbnRfd2FsbF9zaXplX3kpIC8gKGRlcHRoICogMik7XG5cbiAgICAgICAgLy8g5bqK44Gu5aKX5YiG44KS5rGC44KB44KL44CC5rGC44KB5pa544Gv5LiK6KiY44Go5ZCM44GYXG4gICAgICAgIGNvbnN0IHNpZGVfd2FsbF9zaXplX0IgPSAgKG1heF95IC0gbWluX3kgLSBmcm9udF93YWxsX3NpemVfeSkgLyAoZGVwdGggKiAyKTtcblxuICAgICAgICAvLyDku6XkuIrjga7lgKTjgpLnlKjjgYTjgablkITot53pm6IoZGVwdGgp44Gu5q2j6Z2i5aOB44Gu5L2N572u5rG644KB44KS44GZ44KLXG4gICAgICAgIC8vIHdhbGzjga7nrKzkuIDlvJXmlbDjga/ot53pm6LjgIHnrKzkuozlvJXmlbDjga/lt6blj7Pjga7kvY3nva7vvIjkuIDnlarlt6bjgYww44CB5LiA55Wq5Y+z44GMZGVwdGgtMSlcbiAgICAgICAgY29uc3Qgd2FsbDogVF9XYWxsW11bXSA9IG5ldyBBcnJheShkZXB0aCArIDEpO1xuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGRlcHRoICsgMTsgaisrKSB7XG4gICAgICAgICAgICB3YWxsW2pdID0gbmV3IEFycmF5KGRlcHRoICsgMSk7XG4gICAgICAgICAgICBmb3IgKGxldCBrID0gMDsgayA8IGRlcHRoICsgMTsgaysrKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgd2tfeCA9IGNlbnRlcl94IC0gZnJvbnRfd2FsbF9IX3NpemVfeFtqXSAqIChkZXB0aCAtIDIgKiBrKTtcbiAgICAgICAgICAgICAgICB3YWxsW2pdW2tdID0ge1xuICAgICAgICAgICAgICAgICAgICBtaW5feDogX3JvdW5kKHdrX3gsIDApLFxuICAgICAgICAgICAgICAgICAgICBtYXhfeDogX3JvdW5kKHdrX3ggICsgZnJvbnRfd2FsbF9IX3NpemVfeFtqXSAqIDIsIDApLFxuICAgICAgICAgICAgICAgICAgICBtaW5feTogX3JvdW5kKG1pbl95ICsgc2lkZV93YWxsX3NpemVfVCAqIGosIDApLFxuICAgICAgICAgICAgICAgICAgICBtYXhfeTogX3JvdW5kKG1heF95IC0gc2lkZV93YWxsX3NpemVfQiAqIGosIDApLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5kID0gZGVwdGg7XG4gICAgICAgIHRoaXMudyA9IHdhbGw7XG4gICAgfVxuICAgIHB1YmxpYyBnZXRfZGVwdGgoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZDtcbiAgICB9XG4gICAgcHVibGljIGdldChkZXB0aDogbnVtYmVyLCBvZmZzZXQ6IG51bWJlcik6IFRfV2FsbCB7XG4gICAgICAgIGNvbnN0IEhfZGVwdCA9ICh0aGlzLmQgLSAxKSAvIDI7XG4gICAgICAgIHJldHVybiB0aGlzLndbZGVwdGhdW0hfZGVwdCArIG9mZnNldF07XG4gICAgfVxufVxuXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuXHJcbmltcG9ydCB7VF9NYWtlRW51bVR5cGV9IGZyb20gXCIuLi9kX3V0bC9UX01ha2VFbnVtVHlwZVwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IFRfRGlyZWN0aW9uID0ge1xyXG4gICAgTjogICAwLFxyXG4gICAgRTogICAxLFxyXG4gICAgUzogICAyLFxyXG4gICAgVzogICAzLFxyXG4gICAgWDogIDk5LFxyXG4gICAgTUFYOiAzXHJcbn0gYXMgY29uc3Q7XHJcbmV4cG9ydCB0eXBlIFRfRGlyZWN0aW9uID0gVF9NYWtlRW51bVR5cGU8dHlwZW9mIFRfRGlyZWN0aW9uPjtcclxuXHJcbmV4cG9ydCB2YXIgJERpcmVjdGlvbk5hbWUgPSB7XHJcbiAgICAwOiAgJ+WMlycsXHJcbiAgICAxOiAgJ+adsScsXHJcbiAgICAyOiAgJ+WNlycsXHJcbiAgICAzOiAgJ+ilvycsXHJcbiAgICA5OTogJ+isjidcclxufVxyXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuICAgIC8vIOS4gOiIrOOBq+S9v+OBiOOCi+ODpuODvOODhuOCo+ODquODhuOCo+OBquWRquaWh1xuICAgIC8vIOOCquODluOCuOOCp+OCr+ODiOOCkuWIl+aMmeWei+OBqOOBl+OBpuWei+WMluOBmeOCi+OBruOBq+WIqeeUqFxuICAgIGltcG9ydCB7VF9NYWtlRW51bVR5cGV9IGZyb20gXCIuLi9kX3V0bC9UX01ha2VFbnVtVHlwZVwiO1xuXG4gICAgLy8g44OA44Oz44K444On44Oz44Oe44OD44OX44Gu44K744Or44Gu56iu6aGe44KS6KGo44GZ5YiX5oyZ5Z6LXG4gICAgLy8gTm9EZWY6IOacquWumue+qeODu+S4jeaYjlxuICAgIC8vIEZsb29yOiDluopcbiAgICAvLyBVbmV4cDog5pyq6LiP5ZywXG4gICAgLy8gU3RvbmU6IOefs+WjgVxuICAgIC8vIFN0clVwOiDkuIrjgorpmo7mrrVcbiAgICAvLyBTdHJEbjog5LiL44KK6ZqO5q61XG4gICAgLy8gRW1wdHk6IOWIneacn+eKtuaFi+ODu+S9leOCguOBquOBl1xuICAgIC8vIFxuICAgIC8vIGZ1bmN0aW9uIHRvX2ludChNektpbmQpOiAgICAgIGludCAgICAgICAg5YiX5oyZ5Z6L44Gr5a++5b+c44GZ44KL5YCkKOaVtOaVsOWApCnjgpLov5TjgZlcbiAgICAvLyBmdW5jdGlvbiBmcm9tX2ludChpbnQpOiAgICAgICBUX016S2luZCAgICAg5pW05pWw5YCk44Gr5a++5b+c44GZ44KL5YiX5oyZ5Z6L44KS6L+U44GZKOOCr+ODqeOCueODoeOCveODg+ODiSlcbiAgICAvLyBmdW5jdGlvbiB0b19sZXR0ZXIoTXpLaW5kKTogICBzdHJpbmcgICAgIOWIl+aMmeWei+OBq+WvvuW/nOOBmeOCi+aWh+Wtl+OCkui/lOOBmSjjg4Djg7Pjgrjjg6fjg7Pjga4yROihqOekuueUqClcbiAgICAvLyBmdW5jdGlvbiBmcm9tX2xldHRlcihzdHJpbmcpOiBUX016S2luZCAgICAg5paH5a2X44Gr5a++5b+c44GZ44KL5YiX5oyZ5Z6L44KS6L+U44GZKOOCr+ODqeOCueODoeOCveODg+ODiSlcblxuICAgIGV4cG9ydCBjb25zdCBUX016S2luZDp7W2tleTogc3RyaW5nXTogbnVtYmVyfSAgPSB7XG4gICAgICAgIE5vRGVmOiAgIDAsXG4gICAgICAgIEZsb29yOiAgIDEsXG4gICAgICAgIFVuZXhwOiAgIDIsXG4gICAgICAgIFN0b25lOiAgIDMsXG4gICAgICAgIFVua3duOiAgIDQsXG4gICAgICAgIFN0clVwOiAgIDUsXG4gICAgICAgIFN0ckRuOiAgIDYsXG4gICAgICAgIFN0clVEOiAgIDcsXG4gICAgICAgIEVtcHR5OiAyNTUsXG4gICAgfSBhcyBjb25zdDtcbiAgICBleHBvcnQgdHlwZSBUX016S2luZCAgID0gVF9NYWtlRW51bVR5cGU8dHlwZW9mIFRfTXpLaW5kPjtcblxuICAgIGV4cG9ydCBjb25zdCBUX1J2TXpLaW5kOntba2V5OiBudW1iZXJdOiBUX016S2luZH0gID0ge1xuICAgICAgICAwOiAgIFRfTXpLaW5kLk5vRGVmLFxuICAgICAgICAxOiAgIFRfTXpLaW5kLkZsb29yLFxuICAgICAgICAyOiAgIFRfTXpLaW5kLlVuZXhwLFxuICAgICAgICAzOiAgIFRfTXpLaW5kLlN0b25lLFxuICAgICAgICA0OiAgIFRfTXpLaW5kLlVua3duLFxuICAgICAgICA1OiAgIFRfTXpLaW5kLlN0clVwLFxuICAgICAgICA2OiAgIFRfTXpLaW5kLlN0ckRuLFxuICAgICAgICA3OiAgIFRfTXpLaW5kLlN0clVELFxuICAgICAgICAyNTU6IFRfTXpLaW5kLkVtcHR5LFxuICAgIH0gYXMgY29uc3Q7XG4gICAgZXhwb3J0IHR5cGUgVF9Sdk16S2luZCA9IFRfTWFrZUVudW1UeXBlPHR5cGVvZiBUX1J2TXpLaW5kPjtcblxuIiwiaW50ZXJmYWNlIEpTT05BYmxlIHtcclxuICAgIFtrZXk6IHN0cmluZ106IGFueVxyXG59XHJcbmV4cG9ydCB0eXBlIFRfQXR0ciA9IHtba2V5OiBzdHJpbmddOiBzdHJpbmd8bnVtYmVyfG9iamVjdH07XHJcblxyXG5leHBvcnQgY2xhc3MgQ19VcmxPcHQge1xyXG4gICAgcHJvdGVjdGVkIHY6IFRfQXR0cjtcclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihzPzogc3RyaW5nKTtcclxuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcih0PzogVF9BdHRyKTtcclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihhPzogYW55KSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBhID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMudiA9IHt9IGFzIFRfQXR0cjtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIGEgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRfZnJvbV9zdHJpbmcoYSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2YgYSA9PT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgICAgICB0aGlzLnYgPSBhIGFzIFRfQXR0cjtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnYgPSB7fSBhcyBUX0F0dHI7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldF9rZXlzKCk6IHN0cmluZ1tdIHtcclxuICAgICAgICBjb25zdCBrZXlfbGlzdDogc3RyaW5nW10gPSBuZXcgQXJyYXkgYXMgc3RyaW5nW107XHJcbiAgICAgICAgZm9yICh2YXIga2V5IGluIHRoaXMudikge1xyXG4gICAgICAgICAgICBrZXlfbGlzdC5wdXNoKGtleSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBrZXlfbGlzdDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgKGtleTogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICBpZiAoa2V5IGluIHRoaXMudikge1xyXG4gICAgICAgICAgICBpZiAgKHR5cGVvZiB0aGlzLnZba2V5XSA9PT0gXCJudW1iZXJcIikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudltrZXldLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgICh0eXBlb2YgdGhpcy52W2tleV0gPT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh0aGlzLnZba2V5XSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudltrZXldIGFzIHN0cmluZztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0KHN0cjogc3RyaW5nKTogIHZvaWQ7XHJcbiAgICBwdWJsaWMgc2V0KGF0cjogVF9BdHRyKTogIHZvaWQ7XHJcbiAgICBwdWJsaWMgc2V0KGtleTogc3RyaW5nLCB2YWw/OiBzdHJpbmcpOiB2b2lkO1xyXG4gICAgcHVibGljIHNldChrZXk6IHN0cmluZywgdmFsPzogbnVtYmVyKTogdm9pZDtcclxuICAgIHB1YmxpYyBzZXQoa2V5OiBzdHJpbmcsIHZhbD86IG9iamVjdCk6IHZvaWQ7XHJcbiAgICBwdWJsaWMgc2V0KHVrbjogYW55LCAgICB2YWw/OiBzdHJpbmd8bnVtYmVyfG9iamVjdCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0eXBlb2YgdWtuID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZF9mcm9tX3N0cmluZyh1a24pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudlt1a25dID0gdmFsO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09IFwibnVtYmVyXCIgKXtcclxuICAgICAgICAgICAgICAgIHRoaXMudlt1a25dID0gdmFsO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09IFwib2JqZWN0XCIgKXtcclxuICAgICAgICAgICAgICAgIHRoaXMudlt1a25dID0gdmFsO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy52W3Vrbl0gPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2YgdWtuID09PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBhdHRyOiBUX0F0dHIgPSB1a24gYXMgVF9BdHRyO1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gaW4gYXR0cikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy52W2l0ZW1dID0gYXR0cltpdGVtXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHB1YmxpYyBpc3NldChrZXk6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiAoa2V5IGluIHRoaXMudik7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgcmVtb3ZlKGtleTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGtleSBpbiB0aGlzLnYpIHtcclxuICAgICAgICAgICAgZGVsZXRlIHRoaXMudltrZXldO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBjbGVhcigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnYgPSB7fSBhcyBUX0F0dHI7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgdG9TdHJpbmcoKTogc3RyaW5nIHtcclxuICAgICAgICBjb25zdCBsZW46IG51bWJlciA9ICBPYmplY3Qua2V5cyh0aGlzLnYpLmxlbmd0aDtcclxuICAgICAgICBpZiAobGVuIDwgMSkgIHJldHVybiBcIlwiO1xyXG5cclxuICAgICAgICB2YXIgc3RyX2FycmF5OiBzdHJpbmdbXSA9IFtdO1xyXG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMudikge1xyXG4gICAgICAgICAgICBzdHJfYXJyYXkucHVzaChrZXkgKyBcIj1cIiArIHRoaXMudltrZXldKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBzdHJfYXJyYXkuam9pbihcIiZcIik7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgdG9KU09OKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHRoaXMudik7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgdG9Gb3JtRGF0YSgpOiBGb3JtRGF0YXx1bmRlZmluZWQge1xyXG4gICAgICAgIGNvbnN0IGxlbjogbnVtYmVyID0gIE9iamVjdC5rZXlzKHRoaXMudikubGVuZ3RoO1xyXG4gICAgICAgIGlmIChsZW4gPCAxKSAgcmV0dXJuIHVuZGVmaW5lZDtcclxuXHJcbiAgICAgICAgdmFyIGZvcm1fZGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xyXG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMudikge1xyXG4gICAgICAgICAgICBjb25zdCB2YWx1ZTogc3RyaW5nfG51bWJlcnxvYmplY3QgPSB0aGlzLnZba2V5XTtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIilcclxuICAgICAgICAgICAgICAgIGZvcm1fZGF0YS5hcHBlbmQoa2V5LCB2YWx1ZSk7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIpXHJcbiAgICAgICAgICAgICAgICBmb3JtX2RhdGEuYXBwZW5kKGtleSwgSlNPTi5zdHJpbmdpZnkodmFsdWUpKTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgZm9ybV9kYXRhLmFwcGVuZChrZXksIHZhbHVlLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGZvcm1fZGF0YTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBzZXRfZnJvbV9zdHJpbmcoczogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jbGVhcigpO1xyXG4gICAgICAgIHRoaXMuYWRkX2Zyb21fc3RyaW5nKHMpO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIGFkZF9mcm9tX3N0cmluZyhzOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBzdHIgPSBzLnJlcGxhY2UoL14oXFw/PykoLiopJC8sICckMicpO1xyXG4gICAgICAgIGNvbnN0IHN0cl9hcnJheTogc3RyaW5nW10gPSBzdHIuc3BsaXQoXCImXCIpO1xyXG4gICAgICAgIHN0cl9hcnJheS5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGtleV92YWx1ZSA9IGl0ZW0uc3BsaXQoXCI9XCIpO1xyXG4gICAgICAgICAgICBpZiAoa2V5X3ZhbHVlLmxlbmd0aCA8IDIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudltrZXlfdmFsdWVbMF1dID0gJyc7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZba2V5X3ZhbHVlWzBdXSA9IGtleV92YWx1ZVsxXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbiIsIi8vIOaVsOWApOODgeOCp+ODg+OCr1xuZXhwb3J0IGZ1bmN0aW9uIF9pc051bShudW1WYWw6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIC8vIOODgeOCp+ODg+OCr+adoeS7tuODkeOCv+ODvOODs1xuICAgIGNvbnN0IHBhdHRlcm4gPSAvXlstK10/KFsxLTldXFxkKnwwKShcXC5cXGQrKT8kLztcbiAgICAvLyDmlbDlgKTjg4Hjgqfjg4Pjgq9cbiAgICByZXR1cm4gcGF0dGVybi50ZXN0KG51bVZhbCk7XG59XG5cbi8vIOaVsOWApOWPluOCiuWHuuOBl1xuZXhwb3J0IGZ1bmN0aW9uIF9nZXROdW0obnVtVmFsOiBzdHJpbmcpOiBudW1iZXIge1xuICAgIC8vIOODgeOCp+ODg+OCr+adoeS7tuODkeOCv+ODvOODs1xuLy8gICAgY29uc3QgcGF0dGVybiA9IC9bLV0/KFsxLTldXFxkKnwwKShcXC5cXGQrKT8vO1xuICAgIGNvbnN0IHBhdHRlcm4gPSAvKFteMC05XSkvZztcbiAgICBjb25zdCB2YWxzdHIgID0gbnVtVmFsLnJlcGxhY2UocGF0dGVybiwnJyk7XG4gICAgLy8g5pWw5YCk44OB44Kn44OD44KvXG4gICAgcmV0dXJuIE51bWJlcih2YWxzdHIpO1xufVxuXG4vLyDlm5vmjajkupTlhaVcbmV4cG9ydCBmdW5jdGlvbiBfcm91bmQobnVtOiBudW1iZXIsIGRpZ2l0OiBudW1iZXIpOiBudW1iZXIge1xuICAgIGNvbnN0IG11bHRpcGxpZXIgPSBNYXRoLnBvdygxMCwgZGlnaXQpO1xuICAgIHJldHVybiBNYXRoLnJvdW5kKG51bSAqIG11bHRpcGxpZXIpIC8gbXVsdGlwbGllcjtcbn1cblxuLy8g5YiH44KK5LiK44GSXG5leHBvcnQgZnVuY3Rpb24gX2NlaWwobnVtOiBudW1iZXIsIGRpZ2l0OiBudW1iZXIpOiBudW1iZXIge1xuICAgIGNvbnN0IG11bHRpcGxpZXIgPSBNYXRoLnBvdygxMCwgZGlnaXQpO1xuICAgIHJldHVybiBNYXRoLmNlaWwobnVtICogbXVsdGlwbGllcikgLyBtdWx0aXBsaWVyO1xufVxuXG5cbi8vIOWIh+OCiuS4i+OBklxuZXhwb3J0IGZ1bmN0aW9uIF9mbG9vcihudW06IG51bWJlciwgZGlnaXQ6IG51bWJlcik6IG51bWJlciB7XG4gICAgY29uc3QgbXVsdGlwbGllciA9IE1hdGgucG93KDEwLCBkaWdpdCk7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IobnVtICogbXVsdGlwbGllcikgLyBtdWx0aXBsaWVyO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBfbWluKGE6IG51bWJlcltdKTogbnVtYmVyIHtcbiAgICByZXR1cm4gYS5yZWR1Y2UoKG4xOiBudW1iZXIsIG4yOiBudW1iZXIpID0+IE1hdGgubWluKG4xLCBuMikpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX21heChhOiBudW1iZXJbXSk6IG51bWJlciB7XG4gICAgcmV0dXJuIGEucmVkdWNlKChuMTogbnVtYmVyLCBuMjogbnVtYmVyKSA9PiBNYXRoLm1heChuMSwgbjIpKTtcbn1cbiIsImltcG9ydCB7IF9tYXgsIF9taW4sIF9yb3VuZCB9IGZyb20gXCIuL0ZfTWF0aFwiO1xyXG5cclxuLy8g5Lmx5pWw6Zai5pWw5ZG844Gz5Ye644GX55So44Gu5Z6L5a6j6KiAXHJcbnR5cGUgVF9mcmFuZCA9ICgpPT5udW1iZXJcclxuY29uc3QgZnJhbmQ6IFRfZnJhbmQgPSAgKCk9PntyZXR1cm4gTWF0aC5yYW5kb20oKX1cclxuXHJcbi8vIOS4gOanmOS5seaVsCjmlbTmlbApXHJcbmV4cG9ydCBmdW5jdGlvbiBfaXJhbmQobWluOiBudW1iZXIgPSAwLCBtYXg6IG51bWJlciA9IDEsIHJhbmQ6IFRfZnJhbmQgPSBmcmFuZCk6IG51bWJlciB7XHJcbiAgICBjb25zdCBmX3JhbmQgPSBNYXRoLmZsb29yKHJhbmQoKSAqIChtYXggLSBtaW4gKyAxKSArIG1pbik7XHJcbiAgICByZXR1cm4gX3JvdW5kKGZfcmFuZCwgMCk7XHJcbn1cclxuXHJcbi8vIOato+imj+WIhuW4g+OCguOBqeOBjeS5seaVsCjmlbTmlbApXHJcbmV4cG9ydCBmdW5jdGlvbiBfaWdyYW5kKG1pbjogbnVtYmVyID0gMCwgbWF4OiBudW1iZXIgPSAxLCByYW5kOiBUX2ZyYW5kID0gZnJhbmQpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIF9pcmFuZChtaW4sIG1heCwgKCk9PntyZXR1cm4gX2dyYW5kKDAsIDEsIHJhbmQpfSlcclxufVxyXG5cclxuLy8g5q2j6KaP5YiG5biD44KC44Gp44GN5Lmx5pWwKOWun+aVsClcclxuZXhwb3J0IGZ1bmN0aW9uIF9ncmFuZChtaW46IG51bWJlciA9IDAsIG1heDogbnVtYmVyID0gMSwgcmFuZDogVF9mcmFuZCA9IGZyYW5kKTogbnVtYmVyIHtcclxuICAgIHJldHVybiBNYXRoLmZsb29yKF9fX2dhdXNzaWFuUmFuZChyYW5kKSAqIChtYXggLSBtaW4gKyAxKSArIG1pbik7XHJcbn1cclxuZnVuY3Rpb24gX19fZ2F1c3NpYW5SYW5kKHJhbmQ6IFRfZnJhbmQgPSBmcmFuZCkge1xyXG4gICAgbGV0IHN1bSA9IDA7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDY7IGkgKz0gMSkge1xyXG4gICAgICAgIHN1bSArPSByYW5kKCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc3VtIC8gNjtcclxufVxyXG5cclxuLy8g5bCR44GX55yf6Z2i55uu44Gq5q2j6KaP5YiG5biD5Lmx5pWwKOaVtOaVsClcclxuZXhwb3J0IGZ1bmN0aW9uIF9pbnJhbmQobWluOiBudW1iZXIgPSAwLCBtYXg6IG51bWJlciA9IDEsIGRkOiBudW1iZXIgPSAzLjAsIHJhbmQ6IFRfZnJhbmQgPSBmcmFuZCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gTWF0aC5mbG9vcihfbnJhbmQobWluLCBtYXgsIGRkLCByYW5kKSk7XHJcbn1cclxuXHJcbi8vIOWwkeOBl+ecn+mdouebruOBquato+imj+WIhuW4g+S5seaVsCjlrp/mlbApXHJcbi8vIOS4gOanmOeiuueOh+WkieaVsGEsYuOCkuWkieaVsOmWouaVsOOCkueUqOOBhOOBpiB4PWYoYSxiKSwgeT1nKGEsYinjgajjgZfjgaYy44Gk44Gu5q2j6KaP5YiG5biD5Lmx5pWweCx544KS5b6X44KLXHJcbi8vIHggPSBmKGEsYikgPSBzcXJ0KC0yKmxvZyhhKSkgKiBzaW4oMirPgCpiKSBcclxuLy8geSA9IGcoYSxiKSA9IHNxcnQoLTIqbG9nKGEpKSAqIGNvcygyKs+AKmIpIFxyXG5leHBvcnQgZnVuY3Rpb24gX25yYW5kKG1pbjogbnVtYmVyID0gMC4wLCBtYXg6IG51bWJlciA9IDEuMCwgZGQ6IG51bWJlciA9IDMuMCwgcmFuZDogVF9mcmFuZCA9IGZyYW5kKTogbnVtYmVyIHtcclxuICAgIGNvbnN0IGF2ZSA9IDAuNTtcclxuICAgIGNvbnN0IGEgPSByYW5kKCk7XHJcbiAgICBjb25zdCBiID0gcmFuZCgpO1xyXG4gICAgbGV0IHggPSBhdmUgKyBfZmFiKGEsIGIpIC8gKDIuMCAqIGRkKTsgLy8g44GT44GT44G+44Gn44CBTigwLDEp44Gu5q2j6KaP5YiG5biD5Lmx5pWw44Gu5L2c5oiQXHJcblxyXG4gICAgeCA9IG1pbiArIHggKiAobWF4IC0gbWluKTtcclxuICAgIHggPSBfbWF4KFttaW4sIHhdKTtcclxuICAgIHggPSBfbWluKFttYXgsIHhdKTtcclxuICAgIHJldHVybiB4O1xyXG59XHJcbmZ1bmN0aW9uIF9mYWIoYTogbnVtYmVyLCBiOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIE1hdGguc3FydCgtMi4wICogTWF0aC5sb2coYSkpICogTWF0aC5zaW4oMi4wICogTWF0aC5QSSAqIGIpO1xyXG59XHJcbmZ1bmN0aW9uIF9nYWIoYTogbnVtYmVyLCBiOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIE1hdGguc3FydCgtMi4wICogTWF0aC5sb2coYSkpICogTWF0aC5jb3MoMi4wICogTWF0aC5QSSAqIGIpO1xyXG59XHJcblxyXG5cclxuLy8g44K344O844OJ5YCk44KS55So44GE44Gf5Lmx5pWwXHJcbmV4cG9ydCBjbGFzcyBDX1NlZWRlZFJhbmQge1xyXG4gICAgcHJvdGVjdGVkIHNlZWQ6IG51bWJlcjtcclxuICAgIHByb3RlY3RlZCBmaXJzdF9zZWVkOiBudW1iZXI7XHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKHNlZWQ6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuc2VlZCA9IHNlZWQ7XHJcbiAgICAgICAgdGhpcy5maXJzdF9zZWVkID0gc2VlZDtcclxuICAgIH1cclxuICAgIHB1YmxpYyByZXNldCgpIHtcclxuICAgICAgICB0aGlzLnNlZWQgPSB0aGlzLmZpcnN0X3NlZWQ7XHJcbiAgICB9XHJcbiAgICAvLyDkubHmlbDnlJ/miJDjg6Hjgr3jg4Pjg4lcclxuICAgIHB1YmxpYyByYW5kb20oKTogbnVtYmVyIHtcclxuICAgICAgICB0aGlzLnNlZWQgPSAodGhpcy5zZWVkICogOTMwMSArIDQ5Mjk3KSAlIDIzMzI4MDtcclxuICAgICAgICByZXR1cm4gdGhpcy5zZWVkIC8gMjMzMjgwLjA7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8v44Om44OL44O844KvSUQodXVpZCnjga7nlJ/miJBcclxuZXhwb3J0IGZ1bmN0aW9uIF9nZXRfdXVpZChsZW46IG51bWJlciA9IDIwLCByYW5kOiBUX2ZyYW5kID0gZnJhbmQpOiBzdHJpbmcge1xyXG4gICAgY29uc3QgbGZ0ID0gKG5ldyBEYXRlKCkpLmdldFRpbWUoKS50b1N0cmluZygxNik7IC8vIOOBn+OBtuOCkzEz5qGBXHJcbiAgICBjb25zdCByZ3RfbGVuID0gX21heChbbGVuIC0gbGZ0Lmxlbmd0aCwgMV0pO1xyXG5cclxuICAgIGNvbnN0IHJndCA9IE1hdGguZmxvb3IoTWF0aC5wb3coMTAsIHJndF9sZW4pICogcmFuZCgpKS50b1N0cmluZygxNik7XHJcbiAgICByZXR1cm4gbGZ0ICsgcmd0O1xyXG59XHJcblxyXG4vLyDnorrnjofjgavln7rjgaXjgY/opoHntKDpgbjmip5cclxuZXhwb3J0IHR5cGUgVF9TZWxlY3RJdGVtID0ge1xyXG4gICAgcmF0aW86IG51bWJlcixcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gX3NlbGVjdEl0ZW0oaXRlbXM6IFRfU2VsZWN0SXRlbVtdLCByYW5kOiBUX2ZyYW5kID0gZnJhbmQpOiBUX1NlbGVjdEl0ZW0gfCB1bmRlZmluZWQge1xyXG4gICAgdmFyIHR0bDpudW1iZXIgPSAwO1xyXG4gICAgZm9yIChsZXQgaXRlbSBvZiBpdGVtcykgdHRsICs9IGl0ZW0ucmF0aW87XHJcblxyXG4gICAgY29uc3QgdGFyZ2V0ID0gX2lyYW5kKDAsIHR0bCwgcmFuZCk7XHJcbiAgICB2YXIgc3VtID0gMDtcclxuICAgIGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcykge1xyXG4gICAgICAgIHN1bSArPSBpdGVtLnJhdGlvO1xyXG4gICAgICAgIGlmICh0YXJnZXQgPCBzdW0pIHtcclxuICAgICAgICAgIHJldHVybiBpdGVtO1xyXG4gICAgICAgIH1cclxuICAgIH0gXHJcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG59XHJcblxyXG4vLyDphY3liJfjga7jgrfjg6Pjg4Pjg5Xjg6tcclxuZXhwb3J0IGZ1bmN0aW9uIF9zaHVmZmxlQXJyYXk8VD4oYXJyYXk6IFRbXSwgcmFuZDogVF9mcmFuZCA9IGZyYW5kKTogVFtdIHtcclxuICAgIGxldCBzaHVmZmxlZEFycmF5ID0gWy4uLmFycmF5XTsgLy8g5YWD44Gu6YWN5YiX44KS5aSJ5pu044GX44Gq44GE44KI44GG44Gr44Kz44OU44O844GZ44KLXHJcbiAgICBmb3IgKGxldCBpID0gc2h1ZmZsZWRBcnJheS5sZW5ndGggLSAxOyBpID4gMDsgaS0tKSB7XHJcbiAgICAgICAgLy8g44Op44Oz44OA44Og44Gq5L2N572u44KS5rG65a6aXHJcbiAgICAgICAgY29uc3QgaiA9IF9pcmFuZCgwLCBpLCByYW5kKTtcclxuICAgICAgICAvLyDopoHntKDjga7lhaXjgozmm7/jgYhcclxuICAgICAgICBbc2h1ZmZsZWRBcnJheVtpXSwgc2h1ZmZsZWRBcnJheVtqXV0gPSBbc2h1ZmZsZWRBcnJheVtqXSwgc2h1ZmZsZWRBcnJheVtpXV07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc2h1ZmZsZWRBcnJheTsgLy8g44K344Oj44OD44OV44Or44GV44KM44Gf6YWN5YiX44KS6L+U44GZXHJcbn1cclxuXHJcbi8vIOS5seaVsOOBq+OCiOOCi+aWh+Wtl+WIl+eUn+aIkFxyXG5leHBvcnQgZnVuY3Rpb24gX3JhbmRvbV9zdHIobGVuZ3RoOiBudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgbGV0IHN0ciA9ICcnO1xyXG4gICAgZm9yIChsZXQgaT0wOyBpIDwgbGVuZ3RoOyBpKyspIHN0ciArPSBfcmFuZG9tX0NoYXIoKTtcclxuICAgIHJldHVybiBzdHI7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIF9yYW5kb21fVXBwZXJTdHIobGVuZ3RoOiBudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgbGV0IHN0ciA9ICcnO1xyXG4gICAgZm9yIChsZXQgaT0wOyBpIDwgbGVuZ3RoOyBpKyspIHN0ciArPSBfcmFuZG9tX1VwcGVyQ2hhcigpO1xyXG4gICAgcmV0dXJuIHN0cjtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gX3JhbmRvbV9Mb3dlclN0cihsZW5ndGg6IG51bWJlcik6IHN0cmluZyB7XHJcbiAgICBsZXQgc3RyID0gJyc7XHJcbiAgICBmb3IgKGxldCBpPTA7IGkgPCBsZW5ndGg7IGkrKykgc3RyICs9IF9yYW5kb21fTG93ZXJDaGFyKCk7XHJcbiAgICByZXR1cm4gc3RyO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBfcmFuZG9tX1VwcGVyQ2hhcigpOiBzdHJpbmcge1xyXG4gICAgY29uc3QgdmFsID0gX2lyYW5kKDAsMjYpXHJcbiAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZSg2NSt2YWwpO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBfcmFuZG9tX0xvd2VyQ2hhcigpOiBzdHJpbmcge1xyXG4gICAgY29uc3QgdmFsID0gX2lyYW5kKDAsMjYpXHJcbiAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZSg5NSt2YWwpO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBfcmFuZG9tX051bUNoYXIoKTogc3RyaW5nIHtcclxuICAgIGNvbnN0IHZhbCA9IF9pcmFuZCgwLDkpXHJcbiAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZSg0OCt2YWwpO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBfcmFuZG9tX0NoYXIoKTogc3RyaW5nIHtcclxuICAgIGNvbnN0IHZhbCA9IF9pcmFuZCgwLDYxKVxyXG4gICAgaWYgKHZhbCA8IDI2KSByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZSg2NSt2YWwpO1xyXG4gICAgaWYgKHZhbCA8IDUyKSByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZSg5Nyt2YWwtMjYpO1xyXG4gICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoNDgrdmFsLTUyKTtcclxufVxyXG4iLCJleHBvcnQgY2xhc3MgQ19EaXNwbGF5TWVzc2FnZSB7XG4gICAgcHJvdGVjdGVkIHN0YXRpYyAgbWU6IENfRGlzcGxheU1lc3NhZ2U7XG4gICAgcHJvdGVjdGVkIGlkOiAgc3RyaW5nO1xuICAgIHByb3RlY3RlZCBkaXY6IEhUTUxEaXZFbGVtZW50O1xuXG4gICAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKGNvbjogSFRNTEVsZW1lbnQsIGlkOiBzdHJpbmcgPSAnY2xpZW50X21lc3NhZ2UnKSB7XG4gICAgICAgIENfRGlzcGxheU1lc3NhZ2UubWUgPSB0aGlzO1xuXG4gICAgICAgIHRoaXMuaWQgICA9IGlkO1xuICAgICAgICB0aGlzLmRpdiAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSBhcyBIVE1MRGl2RWxlbWVudDtcbiAgICAgICAgaWYgKHRoaXMuZGl2ID09PSBudWxsKSBhbGVydCgnQ2FuIG5vdCBmb3VubmQgRGl2I2NsaWVudF9tZXNzYWdlIScpO1xuICAgICAgICB0aGlzLmRpdi5zZXRBdHRyaWJ1dGUoJ2lkJywgdGhpcy5pZCk7XG5cbiAgICAgICAgY29uLmluc2VydEJlZm9yZSh0aGlzLmRpdiwgY29uLmZpcnN0Q2hpbGQpO1xuICAgICAgICBDX0Rpc3BsYXlNZXNzYWdlLm1lLmNsZWFyX21lc3NhZ2UoKTtcbiAgICB9XG4gICAgcHVibGljIHN0YXRpYyBnZXRPYmooY29uOiBIVE1MRWxlbWVudHxudWxsID0gbnVsbCwgaWQ6IHN0cmluZyA9ICdjbGllbnRfbWVzc2FnZScpXG4gICAgICAgICAgICAgICAgOiBDX0Rpc3BsYXlNZXNzYWdlICB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5tZSAhPT0gXCJvYmplY3RcIiB8fCAhKHRoaXMubWUgaW5zdGFuY2VvZiBDX0Rpc3BsYXlNZXNzYWdlKSkgeyBcbiAgICAgICAgICAgIGlmIChjb24gPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBjb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSBhcyBIVE1MRGl2RWxlbWVudDtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLm1lID0gbmV3IENfRGlzcGxheU1lc3NhZ2UoY29uLCBpZCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMubWU7XG4gICAgfVxuICAgIHB1YmxpYyBkaXNwbGF5X21lc3NhZ2UobWVzOiBzdHJpbmcsIGZyX2NvbG9yID0gJ2luaGVyaXQnLCBiZ19jb2xvcjogc3RyaW5nID0gJ2luaGVyaXQnKSB7XG4gICAgICAgIGNvbnN0IHAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJykgYXMgSFRNTFBhcmFncmFwaEVsZW1lbnQ7XG4gICAgICAgIHAuc3R5bGUuc2V0UHJvcGVydHkoJ2NvbG9yJywgICAgICAgICAgICBmcl9jb2xvcik7XG4gICAgICAgIHAuc3R5bGUuc2V0UHJvcGVydHkoJ2JhY2tncm91bmQtY29sb3InLCBiZ19jb2xvcik7XG4gICAgICAgIHAuaW5uZXJIVE1MID0gbWVzO1xuICAgICAgICAvLyDoqJjpjLLlnovjg6Hjg4Pjgrvjg7zjgrjjgarjga7jgaflhYjpoK3jgavov73liqDjgZfjgabjgYTjgY9cbiAgICAgICAgdGhpcy5kaXYuaW5zZXJ0QmVmb3JlKHAsIHRoaXMuZGl2LmZpcnN0Q2hpbGQpOyBcbiAgICB9XG5cbiAgICBwdWJsaWMgY2xlYXJfbWVzc2FnZSgpIHtcbiAgICAgICAgd2hpbGUgKHRoaXMuZGl2LmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgICAgIHRoaXMuZGl2LnJlbW92ZUNoaWxkKHRoaXMuZGl2LmZpcnN0Q2hpbGQpO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBwdWJsaWMgbm9ybWFsX21lc3NhZ2UobWVzOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5kaXNwbGF5X21lc3NhZ2UobWVzKTtcbiAgICB9XG4gICAgcHVibGljIG5vdGljZV9tZXNzYWdlKG1lczogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuZGlzcGxheV9tZXNzYWdlKG1lcywgJyMwMDY2MDAnLCAnI2NjZmZjYycpO1xuICAgIH1cbiAgICBwdWJsaWMgd2FybmluZ19tZXNzYWdlKG1lczogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuZGlzcGxheV9tZXNzYWdlKG1lcywgJyNmZmZmZmYnLCAnI2ZmMDAwMCcpO1xuICAgIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBDX09uZUxpbmVWaWV3TWVzc2FnZSB7XG4gICAgcHJvdGVjdGVkIHN0YXRpYyAgbWUgOiB7W2lkOiBzdHJpbmddOiBDX09uZUxpbmVWaWV3TWVzc2FnZX07XG4gICAgcHJvdGVjdGVkIHAgIDogSFRNTFBhcmFncmFwaEVsZW1lbnQ7XG5cbiAgICBwcm90ZWN0ZWQgY29uc3RydWN0b3IoaWQ6IHN0cmluZywgcGFyZW50PzogSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgQ19PbmVMaW5lVmlld01lc3NhZ2UubWUgPz89IHt9XG4gICAgICAgIENfT25lTGluZVZpZXdNZXNzYWdlLm1lW2lkXSA9IHRoaXM7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aGlzLnAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCkgYXMgSFRNTFBhcmFncmFwaEVsZW1lbnQ7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgdGhpcy5wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICAgICAgdGhpcy5wLmlkID0gaWQ7XG5cbiAgICAgICAgICAgIHBhcmVudCA/Pz0gZG9jdW1lbnQuYm9keTtcbiAgICAgICAgICAgIHBhcmVudC5hcHBlbmRDaGlsZCh0aGlzLnApO1xuICAgICAgICB9XG4gICAgICAgIENfT25lTGluZVZpZXdNZXNzYWdlLm1lW2lkXS5jbGVhcl9tZXNzYWdlKCk7XG4gICAgfVxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0T2JqKGlkOiBzdHJpbmcsIHBhcmVudD86IEhUTUxFbGVtZW50KTogQ19PbmVMaW5lVmlld01lc3NhZ2UgIHtcbiAgICAgICAgQ19PbmVMaW5lVmlld01lc3NhZ2UubWUgPz89IHt9XG4gICAgICAgIHRoaXMubWVbaWRdID8/PSBuZXcgQ19PbmVMaW5lVmlld01lc3NhZ2UoaWQsIHBhcmVudCk7XG4gICAgICAgIHJldHVybiB0aGlzLm1lW2lkXTtcbiAgICB9XG4gICAgcHVibGljIGRpc3BsYXlfbWVzc2FnZShtZXM6IHN0cmluZywgZnJfY29sb3IgPSAnaW5oZXJpdCcsIGJnX2NvbG9yOiBzdHJpbmcgPSAnaW5oZXJpdCcpIHtcbiAgICAgICAgdGhpcy5wLnN0eWxlLnNldFByb3BlcnR5KCdjb2xvcicsICAgICAgICAgICAgZnJfY29sb3IpO1xuICAgICAgICB0aGlzLnAuc3R5bGUuc2V0UHJvcGVydHkoJ2JhY2tncm91bmQtY29sb3InLCBiZ19jb2xvcik7XG4gICAgICAgIHRoaXMucC5pbm5lckhUTUwgPSBtZXM7XG4gICAgfVxuXG4gICAgcHVibGljIGNsZWFyX21lc3NhZ2UoKSB7XG4gICAgICAgIHRoaXMuZGlzcGxheV9tZXNzYWdlKCfjgIAnKTtcbiAgICB9XG4gICAgcHVibGljIG5vcm1hbF9tZXNzYWdlKG1lczogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuZGlzcGxheV9tZXNzYWdlKG1lcyk7XG4gICAgfVxuICAgIHB1YmxpYyBub3RpY2VfbWVzc2FnZShtZXM6IHN0cmluZykge1xuICAgICAgICB0aGlzLmRpc3BsYXlfbWVzc2FnZShtZXMsICcjMDA2NjAwJywgJyNjY2ZmY2MnKTtcbiAgICB9XG4gICAgcHVibGljIHdhcm5pbmdfbWVzc2FnZShtZXM6IHN0cmluZykge1xuICAgICAgICB0aGlzLmRpc3BsYXlfbWVzc2FnZShtZXMsICcjZmZmZmZmJywgJyNmZjAwMDAnKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBnX2RlYnVnIH0gICAgICAgIGZyb20gXCIuLi9kX2Ntbi9nbG9iYWxcIjtcclxuaW1wb3J0IHsgZ19tYXplLCBnX3RlYW0gfSBmcm9tIFwiLi9nbG9iYWxfZm9yX21hemVcIjtcclxuaW1wb3J0IHsgXHJcbiAgICBkb19pbnN0YW50X2xvYWQsIFxyXG4gICAgZG9faW5zdGFudF9zYXZlLCBcclxuICAgIGRvX21vdmVfYm90dG9tX2hhbGYgXHJcbn0gICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSBcIi4vRl9zZXRfbW92ZV9tb2RlXCI7XHJcblxyXG5cclxuZXhwb3J0IHR5cGUgVF9DdGxzPSB7XHJcbiAgICBuYW1lOiAgc3RyaW5nLFxyXG4gICAgZG9fVT86IFRfbWFyZywgXHJcbiAgICBkb19EPzogVF9tYXJnLCBcclxuICAgIGRvX0w/OiBUX21hcmcsIFxyXG4gICAgZG9fUj86IFRfbWFyZywgXHJcbiAgICBpc09LPzogVF9tYXJnLCBcclxuICAgIGlzTkc/OiBUX21hcmcsIFxyXG4gICAgaXNTTD86IFRfbWFyZywgXHJcbiAgICBpc1JUPzogVF9tYXJnLCBcclxuICAgIG1lbnU/OiBUX21hcmcsIFxyXG4gICAgY3BPSz86IFRfbWFyZywgXHJcbiAgICBjcE5HPzogVF9tYXJnLCBcclxuICAgIGNwU0w/OiBUX21hcmcsIFxyXG4gICAgY3BSVD86IFRfbWFyZywgXHJcbiAgICBrZXlFdmVudD86IFRfa2FyZyxcclxufVxyXG50eXBlIFRfbWZuYyA9IChlPzogTW91c2VFdmVudCk9Pih2b2lkfGJvb2xlYW4pO1xyXG50eXBlIFRfbWFyZyA9IFRfbWZuYyB8IHVuZGVmaW5lZDtcclxuIFxyXG50eXBlIFRfa2ZuYyA9IChlOiBLZXlib2FyZEV2ZW50KT0+KHZvaWR8Ym9vbGVhbik7XHJcbnR5cGUgVF9rYXJnID0gVF9rZm5jIHwgdW5kZWZpbmVkO1xyXG5cclxuZXhwb3J0IGNsYXNzIENfRGVmYXVsdEN0bHMge1xyXG4gICAgcHJvdGVjdGVkIHN0YXRpYyBtZTogQ19EZWZhdWx0Q3RscztcclxuICAgIHByb3RlY3RlZCBjdGxzOiB7W25hbWU6IHN0cmluZ106IFRfQ3Rsc307XHJcbiAgICBwcm90ZWN0ZWQgZmxnczoge1tuYW1lOiBzdHJpbmddOiBib29sZWFufTtcclxuXHJcbiAgICBwcm90ZWN0ZWQgdV9hcnI6IEhUTUxCdXR0b25FbGVtZW50O1xyXG4gICAgcHJvdGVjdGVkIGRfYXJyOiBIVE1MQnV0dG9uRWxlbWVudDtcclxuICAgIHByb3RlY3RlZCBsX2FycjogSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcbiAgICBwcm90ZWN0ZWQgcl9hcnI6IEhUTUxCdXR0b25FbGVtZW50O1xyXG4gICAgcHJvdGVjdGVkIHlfYnRuOiBIVE1MQnV0dG9uRWxlbWVudDtcclxuICAgIHByb3RlY3RlZCBuX2J0bjogSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcbiAgICBwcm90ZWN0ZWQgc19idG46IEhUTUxCdXR0b25FbGVtZW50O1xyXG4gICAgcHJvdGVjdGVkIHJfYnRuOiBIVE1MQnV0dG9uRWxlbWVudDtcclxuICAgIHByb3RlY3RlZCBtX2J0bjogSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcbiAgICBwcm90ZWN0ZWQgeV9jcDE6IEhUTUxCdXR0b25FbGVtZW50O1xyXG4gICAgcHJvdGVjdGVkIG5fY3AxOiBIVE1MQnV0dG9uRWxlbWVudDtcclxuICAgIHByb3RlY3RlZCBzX2NwMTogSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcbiAgICBwcm90ZWN0ZWQgcl9jcDE6IEhUTUxCdXR0b25FbGVtZW50O1xyXG5cclxuICAgIHByb3RlY3RlZCBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmN0bHMgPSB7fTtcclxuICAgICAgICB0aGlzLmZsZ3MgPSB7fTtcclxuXHJcbiAgICAgICAgdGhpcy51X2FyciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1X2FycicpIGFzIEhUTUxCdXR0b25FbGVtZW50O1xyXG4gICAgICAgIHRoaXMuZF9hcnIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZF9hcnInKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcclxuICAgICAgICB0aGlzLmxfYXJyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xfYXJyJykgYXMgSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcbiAgICAgICAgdGhpcy5yX2FyciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyX2FycicpIGFzIEhUTUxCdXR0b25FbGVtZW50O1xyXG4gICAgICAgIHRoaXMueV9idG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgneV9idG4nKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcclxuICAgICAgICB0aGlzLm5fYnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25fYnRuJykgYXMgSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcbiAgICAgICAgdGhpcy5zX2J0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzX2J0bicpIGFzIEhUTUxCdXR0b25FbGVtZW50O1xyXG4gICAgICAgIHRoaXMucl9idG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncl9idG4nKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcclxuICAgICAgICB0aGlzLm1fYnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21fYnRuJykgYXMgSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcbiAgICAgICAgdGhpcy55X2NwMSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd5X2NwMScpIGFzIEhUTUxCdXR0b25FbGVtZW50O1xyXG4gICAgICAgIHRoaXMubl9jcDEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbl9jcDEnKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcclxuICAgICAgICB0aGlzLnNfY3AxID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NfY3AxJykgYXMgSFRNTEJ1dHRvbkVsZW1lbnQ7XHJcbiAgICAgICAgdGhpcy5yX2NwMSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyX2NwMScpIGFzIEhUTUxCdXR0b25FbGVtZW50O1xyXG5cclxuICAgICAgICB0aGlzLnVfYXJyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgdGhpcy5kX2Fyci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIHRoaXMubF9hcnIuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICB0aGlzLnJfYXJyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgdGhpcy55X2J0bi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIHRoaXMubl9idG4uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICB0aGlzLnNfYnRuLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgdGhpcy5yX2J0bi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIHRoaXMubV9idG4uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICB0aGlzLnlfY3AxLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgdGhpcy5uX2NwMS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIHRoaXMuc19jcDEuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICB0aGlzLnJfY3AxLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc3RhdGljIGdldE9iaigpOiBDX0RlZmF1bHRDdGxzIHtcclxuICAgICAgICB0aGlzLm1lID8/PSAgbmV3IENfRGVmYXVsdEN0bHMoKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5tZTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBjbHIoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgdGhpcy5jdGxzID0ge307XHJcbiAgICAgICAgdGhpcy5mbGdzID0ge307XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0KG5hbWU6IHN0cmluZ3xUX0N0bHMsIGN0bHM/OlRfQ3Rscyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgbmFtZSA9PT0gJ3N0cmluZycgJiYgY3RscyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN0bHNbbmFtZV0gPSBjdGxzO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mbGdzW25hbWVdID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjID0gbmFtZSBhcyBUX0N0bHM7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN0bHNbYy5uYW1lXSA9IGM7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZsZ3NbYy5uYW1lXSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIHJtdihjdGxzOiBzdHJpbmd8VF9DdGxzKTogYm9vbGVhbiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgbmFtZSA9IHR5cGVvZiBjdGxzID09PSAnc3RyaW5nJyA/IGN0bHMgOiBjdGxzLm5hbWU7XHJcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmN0bHNbbmFtZV07XHJcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmZsZ3NbbmFtZV07XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0gY2F0Y2goZXJyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZGVhY3QoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgZm9yIChjb25zdCBpaSBpbiB0aGlzLmN0bHMpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY3Rsc1tpaV0ubmFtZSA9PT0gdW5kZWZpbmVkKSBjb250aW51ZTtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLl9ybXZfZGVmYXVsdF9jdGxzKHRoaXMuY3Rsc1tpaV0ubmFtZSBhcyBzdHJpbmcpKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGFjdChjdGxzOiBzdHJpbmd8VF9DdGxzKTogYm9vbGVhbiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYoIXRoaXMuZGVhY3QoKSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICBjb25zdCBuYW1lID0gdHlwZW9mIGN0bHMgPT09ICdzdHJpbmcnID8gY3RscyA6IGN0bHMubmFtZTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2FkZF9kZWZhdWx0X2N0bHMobmFtZSk7XHJcbiAgICAgICAgfSBjYXRjaChlcnIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaXNfYWN0KGN0bHM6IHN0cmluZ3xUX0N0bHMpOiBib29sZWFuIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCBuYW1lID0gdHlwZW9mIGN0bHMgPT09ICdzdHJpbmcnID8gY3RscyA6IGN0bHMubmFtZTtcclxuICAgICAgICAgICAgcmV0dXJuICB0aGlzLmZsZ3NbbmFtZV0gPz8gZmFsc2U7XHJcbiAgICAgICAgfSBjYXRjaChlcnIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMga2V5c19vZl9hZGQoKTogc3RyaW5nW10ge1xyXG4gICAgICAgIGNvbnN0IGtleV9saXN0ID0gW10gYXMgc3RyaW5nW107XHJcbiAgICAgICAgZm9yIChjb25zdCBuYW1lIGluIHRoaXMuY3Rscykga2V5X2xpc3QucHVzaChuYW1lKTtcclxuICAgICAgICByZXR1cm4ga2V5X2xpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGtleXNfb2ZfYWN0KCk6IHN0cmluZ1tdIHtcclxuICAgICAgICBjb25zdCBrZXlfbGlzdCA9IFtdIGFzIHN0cmluZ1tdO1xyXG4gICAgICAgIGZvciAoY29uc3QgbmFtZSBpbiB0aGlzLmZsZ3MpIGlmICh0aGlzLmZsZ3NbbmFtZV0pIGtleV9saXN0LnB1c2gobmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIGtleV9saXN0O1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBfcm12X2RlZmF1bHRfY3RscyhuYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICAvLyBmbGdzW25hbWVd44GM5a6a576p44GV44KM44Gm44GE44Gq44GEXHJcbiAgICAgICAgLy8g44Gk44G+44KKX2FkZF9kZWZhdWx0X2N0bHPjgYzjgb7jgaDlkbzjgbDjgozjgabjgarjgYQoY3Rsc+OBjGFkZOOBleOCjOOBpuOBquOBhCnjgYvjgIFcclxuICAgICAgICAvLyBfYWxsX2N0bHNfbmFtZVtjYWxsLm5hbWVd44GMZmFsc2Uo5pei44GrY3RsbHPjgYxyZW1vdmXjgZXjgozjgabjgYTjgosp44Gq44KJ44CBXHJcbiAgICAgICAgLy8g5L2V44KC44GX44Gq44GE44CCXHJcbiAgICAgICAgdGhpcy5mbGdzW25hbWVdID8/PSBmYWxzZTsgXHJcbiAgICBcclxuICAgICAgICBpZiAoIXRoaXMuZmxnc1tuYW1lXSkgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgdGhpcy5mbGdzW25hbWVdID0gZmFsc2U7XHJcblxyXG4gICAgICAgIGNvbnN0IGMgPSB0aGlzLmN0bHNbbmFtZV07XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICBcclxuICAgICAgICAgICAgaWYgKF9jKGM/LmRvX1UpKSB0aGlzLnVfYXJyLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjLmRvX1UgYXMgVF9tZm5jLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIGlmIChfYyhjPy5kb19EKSkgdGhpcy5kX2Fyci5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYy5kb19EIGFzIFRfbWZuYywgZmFsc2UpO1xyXG4gICAgICAgICAgICBpZiAoX2MoYz8uZG9fTCkpIHRoaXMubF9hcnIucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGMuZG9fTCBhcyBUX21mbmMsIGZhbHNlKTtcclxuICAgICAgICAgICAgaWYgKF9jKGM/LmRvX1IpKSB0aGlzLnJfYXJyLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjLmRvX1IgYXMgVF9tZm5jLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIGlmIChfYyhjPy5pc09LKSkgdGhpcy55X2J0bi5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYy5pc09LIGFzIFRfbWZuYywgZmFsc2UpO1xyXG4gICAgICAgICAgICBpZiAoX2MoYz8uaXNORykpIHRoaXMubl9idG4ucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGMuaXNORyBhcyBUX21mbmMsIGZhbHNlKTtcclxuICAgICAgICAgICAgaWYgKF9jKGM/LmlzU0wpKSB0aGlzLnNfYnRuLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjLmlzU0wgYXMgVF9tZm5jLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIGlmIChfYyhjPy5pc1JUKSkgdGhpcy5yX2J0bi5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYy5pc1JUIGFzIFRfbWZuYywgZmFsc2UpO1xyXG4gICAgICAgICAgICBpZiAoX2MoYz8ubWVudSkpIHRoaXMubV9idG4ucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGMubWVudSBhcyBUX21mbmMsIGZhbHNlKTtcclxuICAgICAgICAgICAgaWYgKF9jKGM/LmNwT0spKSB0aGlzLnlfY3AxLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjLmNwT0sgYXMgVF9tZm5jLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIGlmIChfYyhjPy5jcE5HKSkgdGhpcy5uX2NwMS5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYy5jcE5HIGFzIFRfbWZuYywgZmFsc2UpO1xyXG4gICAgICAgICAgICBpZiAoX2MoYz8uY3BTTCkpIHRoaXMuc19jcDEucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGMuY3BTTCBhcyBUX21mbmMsIGZhbHNlKTtcclxuICAgICAgICAgICAgaWYgKF9jKGM/LmNwUlQpKSB0aGlzLnJfY3AxLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjLmNwUlQgYXMgVF9tZm5jLCBmYWxzZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgIGlmIChjPy5rZXlFdmVudCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGMua2V5RXZlbnQpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBrZXlfcHJlc3NfZnVuY3Rpb24pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMudV9hcnIuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgdGhpcy5kX2Fyci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICB0aGlzLmxfYXJyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgIHRoaXMucl9hcnIuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgdGhpcy55X2J0bi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICB0aGlzLm5fYnRuLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgIHRoaXMuc19idG4uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgdGhpcy5yX2J0bi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICB0aGlzLm1fYnRuLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgIHRoaXMueV9jcDEuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgdGhpcy5uX2NwMS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICB0aGlzLnNfY3AxLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgIHRoaXMucl9jcDEuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgYWxlcnQoJ0Vycm9yIE9jY3VlcmQgYXQgUmVtb3ZlIERlZmF1bHQgQ3Rscy4nKTtcclxuICAgICAgICAgICAgYWxlcnQoJycgKyBlcnIpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBfYWRkX2RlZmF1bHRfY3RscyhuYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICB0aGlzLmZsZ3NbbmFtZV0gPz89IGZhbHNlOyBcclxuICAgIFxyXG4gICAgICAgIGlmICh0aGlzLmZsZ3NbbmFtZV0pIHJldHVybiB0cnVlO1xyXG4gICAgICAgIHRoaXMuZmxnc1tuYW1lXSA9IHRydWU7XHJcbiAgICBcclxuICAgICAgICBjb25zdCBjID0gdGhpcy5jdGxzW25hbWVdO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChfYyhjPy5kb19VKSkgdGhpcy51X2Fyci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYy5kb19VIGFzIFRfbWZuYywgZmFsc2UpO1xyXG4gICAgICAgICAgICBpZiAoX2MoYz8uZG9fRCkpIHRoaXMuZF9hcnIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGMuZG9fRCBhcyBUX21mbmMsIGZhbHNlKTtcclxuICAgICAgICAgICAgaWYgKF9jKGM/LmRvX0wpKSB0aGlzLmxfYXJyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjLmRvX0wgYXMgVF9tZm5jLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIGlmIChfYyhjPy5kb19SKSkgdGhpcy5yX2Fyci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYy5kb19SIGFzIFRfbWZuYywgZmFsc2UpO1xyXG4gICAgICAgICAgICBpZiAoX2MoYz8uaXNPSykpIHRoaXMueV9idG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGMuaXNPSyBhcyBUX21mbmMsIGZhbHNlKTtcclxuICAgICAgICAgICAgaWYgKF9jKGM/LmlzTkcpKSB0aGlzLm5fYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjLmlzTkcgYXMgVF9tZm5jLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIGlmIChfYyhjPy5pc1NMKSkgdGhpcy5zX2J0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYy5pc1NMIGFzIFRfbWZuYywgZmFsc2UpO1xyXG4gICAgICAgICAgICBpZiAoX2MoYz8uaXNSVCkpIHRoaXMucl9idG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGMuaXNSVCBhcyBUX21mbmMsIGZhbHNlKTtcclxuICAgICAgICAgICAgaWYgKF9jKGM/Lm1lbnUpKSB0aGlzLm1fYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjLm1lbnUgYXMgVF9tZm5jLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIGlmIChfYyhjPy5jcE9LKSkgdGhpcy55X2NwMS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYy5jcE9LIGFzIFRfbWZuYywgZmFsc2UpO1xyXG4gICAgICAgICAgICBpZiAoX2MoYz8uY3BORykpIHRoaXMubl9jcDEuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGMuY3BORyBhcyBUX21mbmMsIGZhbHNlKTtcclxuICAgICAgICAgICAgaWYgKF9jKGM/LmNwU0wpKSB0aGlzLnNfY3AxLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjLmNwU0wgYXMgVF9tZm5jLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIGlmIChfYyhjPy5jcFJUKSkgdGhpcy5yX2NwMS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYy5jcFJUIGFzIFRfbWZuYywgZmFsc2UpO1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICBpZiAoYz8ua2V5RXZlbnQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBjLmtleUV2ZW50KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywga2V5X3ByZXNzX2Z1bmN0aW9uKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLnVfYXJyLnN0eWxlLmRpc3BsYXkgPSBfYyhjPy5kb19VKSA/ICdibG9jaycgOiAnbm9uZSc7XHJcbiAgICAgICAgICAgIHRoaXMuZF9hcnIuc3R5bGUuZGlzcGxheSA9IF9jKGM/LmRvX0QpID8gJ2Jsb2NrJyA6ICdub25lJztcclxuICAgICAgICAgICAgdGhpcy5sX2Fyci5zdHlsZS5kaXNwbGF5ID0gX2MoYz8uZG9fTCkgPyAnYmxvY2snIDogJ25vbmUnO1xyXG4gICAgICAgICAgICB0aGlzLnJfYXJyLnN0eWxlLmRpc3BsYXkgPSBfYyhjPy5kb19SKSA/ICdibG9jaycgOiAnbm9uZSc7XHJcbiAgICAgICAgICAgIHRoaXMueV9idG4uc3R5bGUuZGlzcGxheSA9IF9jKGM/LmlzT0spID8gJ2Jsb2NrJyA6ICdub25lJztcclxuICAgICAgICAgICAgdGhpcy5uX2J0bi5zdHlsZS5kaXNwbGF5ID0gX2MoYz8uaXNORykgPyAnYmxvY2snIDogJ25vbmUnO1xyXG4gICAgICAgICAgICB0aGlzLnNfYnRuLnN0eWxlLmRpc3BsYXkgPSBfYyhjPy5pc1NMKSA/ICdibG9jaycgOiAnbm9uZSc7XHJcbiAgICAgICAgICAgIHRoaXMucl9idG4uc3R5bGUuZGlzcGxheSA9IF9jKGM/LmlzUlQpID8gJ2Jsb2NrJyA6ICdub25lJztcclxuICAgICAgICAgICAgdGhpcy5tX2J0bi5zdHlsZS5kaXNwbGF5ID0gX2MoYz8ubWVudSkgPyAnYmxvY2snIDogJ25vbmUnO1xyXG4gICAgICAgICAgICB0aGlzLnlfY3AxLnN0eWxlLmRpc3BsYXkgPSBfYyhjPy5jcE9LKSA/ICdibG9jaycgOiAnbm9uZSc7XHJcbiAgICAgICAgICAgIHRoaXMubl9jcDEuc3R5bGUuZGlzcGxheSA9IF9jKGM/LmNwTkcpID8gJ2Jsb2NrJyA6ICdub25lJztcclxuICAgICAgICAgICAgdGhpcy5zX2NwMS5zdHlsZS5kaXNwbGF5ID0gX2MoYz8uY3BTTCkgPyAnYmxvY2snIDogJ25vbmUnO1xyXG4gICAgICAgICAgICB0aGlzLnJfY3AxLnN0eWxlLmRpc3BsYXkgPSBfYyhjPy5jcFJUKSA/ICdibG9jaycgOiAnbm9uZSc7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KCdFcnJvciBPY2N1ZXJkIGF0IEFwcGVuZCBEZWZhdWx0IEN0bHMuJyk7XHJcbiAgICAgICAgICAgIGFsZXJ0KCcnICsgZXJyKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gX2MoYzogVF9tYXJnKTogYm9vbGVhbiB7XHJcbiAgICBpZiAoYyA9PT0gdW5kZWZpbmVkKSByZXR1cm4gZmFsc2U7XHJcbiAgICBpZiAoYyA9PT0gbnVsbCkgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxufVxyXG5cclxuZnVuY3Rpb24ga2V5X3ByZXNzX2Z1bmN0aW9uKGU6IEtleWJvYXJkRXZlbnQpOnZvaWQgIHtcclxuICAgIGNvbnN0IG5lID0gKGUudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpPy52YWx1ZSA9PT0gdW5kZWZpbmVkIC8vIE5vdCBFZGl0dGluZyBJbnB1dEVsZW1lbnRcclxuXHJcbiAgICBzd2l0Y2goZS5jb2RlKSB7IC8vIEFycm9344Gv5Y+N5b+c44Gb44GaKOOCpOODmeODs+ODiOiHquS9k+OBjOeZuueUn+OBm+OBmilcclxuICAgICAgICBjYXNlICdBcnJvd1VwJzogXHJcbiAgICAgICAgY2FzZSAnTnVtcGFkNSc6IFxyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1X2FycicpIGFzIEhUTUxCdXR0b25FbGVtZW50KT8uY2xpY2soKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ0tleU8nOlxyXG4gICAgICAgICAgICAgICAgaWYgKG5lKSAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VfYXJyJykgYXMgSFRNTEJ1dHRvbkVsZW1lbnQpPy5jbGljaygpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnQXJyb3dEb3duJzogXHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RfYXJyJykgYXMgSFRNTEJ1dHRvbkVsZW1lbnQpPy5jbGljaygpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnTnVtcGFkMic6IFxyXG4gICAgICAgICAgICAgICAgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkX2FycicpIGFzIEhUTUxCdXR0b25FbGVtZW50KT8uY2xpY2soKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ0tleUwnOlxyXG4gICAgICAgICAgICAgICAgaWYgKCFuZSkgYnJlYWs7IFxyXG4gICAgICAgICAgICAgICAgaWYgKGdfZGVidWcuaXNPTigpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9faW5zdGFudF9sb2FkKCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZF9hcnInKSBhcyBIVE1MQnV0dG9uRWxlbWVudCk/LmNsaWNrKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ0Fycm93TGVmdCc6IFxyXG4gICAgICAgIGNhc2UgJ051bXBhZDEnOiBcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbF9hcnInKSBhcyBIVE1MQnV0dG9uRWxlbWVudCk/LmNsaWNrKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdLZXlLJzpcclxuICAgICAgICAgICAgICAgIGlmIChuZSkgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsX2FycicpIGFzIEhUTUxCdXR0b25FbGVtZW50KT8uY2xpY2soKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ0Fycm93UmlnaHQnOiBcclxuICAgICAgICBjYXNlICdOdW1wYWQzJzogXHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JfYXJyJykgYXMgSFRNTEJ1dHRvbkVsZW1lbnQpPy5jbGljaygpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnU2VtaWNvbG9uJzpcclxuICAgICAgICAgICAgICAgIGlmIChuZSkgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyX2FycicpIGFzIEhUTUxCdXR0b25FbGVtZW50KT8uY2xpY2soKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ0VudGVyJzpcclxuICAgICAgICBjYXNlICdOdW1wYWRFbnRlcic6XHJcbiAgICAgICAgY2FzZSAnRjEwJzpcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIGlmIChlLnNoaWZ0S2V5KSAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25fYnRuJykgYXMgSFRNTEJ1dHRvbkVsZW1lbnQpPy5jbGljaygpO1xyXG4gICAgICAgICAgICAgICAgZWxzZSAgICAgICAgICAgIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgneV9idG4nKSBhcyBIVE1MQnV0dG9uRWxlbWVudCk/LmNsaWNrKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdLZXlZJzpcclxuICAgICAgICBjYXNlICdLZXlQJzpcclxuICAgICAgICBjYXNlICdEaWdpdDAnOlxyXG4gICAgICAgICAgICAgICAgaWYgKG5lKSAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3lfYnRuJykgYXMgSFRNTEJ1dHRvbkVsZW1lbnQpPy5jbGljaygpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnRjEnOlxyXG4gICAgICAgIGNhc2UgJ051bXBhZDAnOlxyXG4gICAgICAgIGNhc2UgJ051bXBhZEFkZCc6XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25fYnRuJykgYXMgSFRNTEJ1dHRvbkVsZW1lbnQpPy5jbGljaygpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnS2V5Tic6XHJcbiAgICAgICAgY2FzZSAnS2V5SSc6XHJcbiAgICAgICAgY2FzZSAnRGlnaXQ4JzpcclxuICAgICAgICAgICAgICAgIGlmIChuZSkgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduX2J0bicpIGFzIEhUTUxCdXR0b25FbGVtZW50KT8uY2xpY2soKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ0tleVUnOlxyXG4gICAgICAgICAgICAgICAgaWYgKCFuZSkgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBpZiAoZ19kZWJ1Zy5pc09OKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB6ID0gZ190ZWFtLndhbGsoKS5nZXRfeigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh6ID4gMCkgZ190ZWFtLndhbGsoKS5zZXRfeih6IC0gMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9fbW92ZV9ib3R0b21faGFsZignYmxpbmtfb2ZmJyk7XHJcbi8vICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4vLyAgICAgICAgICAgICAgICAgIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndV9hcnInKSBhcyBIVE1MQnV0dG9uRWxlbWVudCk/LmNsaWNrKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdLZXlEJzpcclxuICAgICAgICAgICAgICAgIGlmICghbmUpIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgaWYgKGdfZGVidWcuaXNPTigpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgeiA9IGdfdGVhbS53YWxrKCkuZ2V0X3ooKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoeiA8IGdfbWF6ZS5nZXRfel9tYXgoKS0xKSBnX3RlYW0ud2FsaygpLnNldF96KHogKyAxKTtcclxuICAgICAgICAgICAgICAgICAgICBkb19tb3ZlX2JvdHRvbV9oYWxmKCdibGlua19vZmYnKTtcclxuLy8gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbi8vICAgICAgICAgICAgICAgICAgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1X2FycicpIGFzIEhUTUxCdXR0b25FbGVtZW50KT8uY2xpY2soKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ0tleU0nOlxyXG4gICAgICAgIGNhc2UgJ051bXBhZDcnOlxyXG4gICAgICAgICAgICAgICAgaWYgKG5lKSAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21fYnRuJykgICBhcyBIVE1MQnV0dG9uRWxlbWVudCk/LmNsaWNrKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdGNyc6XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NfYnRuJykgYXMgSFRNTEJ1dHRvbkVsZW1lbnQpPy5jbGljaygpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnQ29tbWEnOlxyXG4gICAgICAgICAgICAgICAgaWYgKG5lKSAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NfYnRuJykgYXMgSFRNTEJ1dHRvbkVsZW1lbnQpPy5jbGljaygpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnS2V5Uyc6XHJcbiAgICAgICAgICAgICAgICBpZiAoIW5lKSBicmVhaztcclxuICAgICAgICAgICAgICAgIGlmIChnX2RlYnVnLmlzT04oKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRvX2luc3RhbnRfc2F2ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRvX21vdmVfYm90dG9tX2hhbGYoJ2JsaW5rX29mZicpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NfYnRuJykgYXMgSFRNTEJ1dHRvbkVsZW1lbnQpPy5jbGljaygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnRjMnOlxyXG4gICAgICAgIGNhc2UgJ051bXBhZDgnOlxyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyX2J0bicpIGFzIEhUTUxCdXR0b25FbGVtZW50KT8uY2xpY2soKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ0tleVInOlxyXG4gICAgICAgIGNhc2UgJ1BlcmlvZCc6XHJcbiAgICAgICAgICAgICAgICBpZiAobmUpIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncl9idG4nKSBhcyBIVE1MQnV0dG9uRWxlbWVudCk/LmNsaWNrKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBfYWxlcnQgfSAgICAgICBmcm9tIFwiLi4vZF9jbW4vZ2xvYmFsXCI7XHJcbmltcG9ydCB7VF9NYWtlRW51bVR5cGV9IGZyb20gXCIuLi9kX3V0bC9UX01ha2VFbnVtVHlwZVwiO1xyXG5leHBvcnQgY29uc3QgVF9WaWV3TW9kZTp7W21vZGU6IHN0cmluZ106IHN0cmluZ30gPSB7XHJcbiAgICBNb3ZlOiAgICAgJ21vdmUnLFxyXG4gICAgQmF0dDogICAgICdiYXR0JyxcclxuICAgIE1lbnU6ICAgICAnbWVudScsXHJcbiAgICBMZFN2OiAgICAgJ2xkc3YnLFxyXG59IGFzIGNvbnN0O1xyXG5leHBvcnQgdHlwZSBUX1ZpZXdNb2RlID0gVF9NYWtlRW51bVR5cGU8dHlwZW9mIFRfVmlld01vZGU+O1xyXG5cclxuZXhwb3J0IGNsYXNzIENfU3dpdGNoVmlldyB7XHJcbiAgICBwcm90ZWN0ZWQgc3RhdGljIG1lOiAgIENfU3dpdGNoVmlldztcclxuICAgIHByb3RlY3RlZCBzdGF0aWMgYm9keTogSFRNTEVsZW1lbnQ7XHJcbiAgICBwcm90ZWN0ZWQgc3RhdGljIGFydGljbGU6ICAge1tuYW1lOiBzdHJpbmddOiBIVE1MRWxlbWVudHxudWxsfTtcclxuICAgIHByb3RlY3RlZCBzdGF0aWMgYWxsX2NsYXNzOiBzdHJpbmdbXTtcclxuXHJcbiAgICBwdWJsaWMgTW92ZSgpOiBzdHJpbmcge3JldHVybiBUX1ZpZXdNb2RlLk1vdmU7fVxyXG4gICAgcHVibGljIEJhdHQoKTogc3RyaW5nIHtyZXR1cm4gVF9WaWV3TW9kZS5CYXR0O31cclxuICAgIHB1YmxpYyBNZW51KCk6IHN0cmluZyB7cmV0dXJuIFRfVmlld01vZGUuTWVudTt9XHJcbiAgICBwdWJsaWMgTXZQdCgpOiBzdHJpbmcge3JldHVybiBUX1ZpZXdNb2RlLk1lbnU7fVxyXG4gICAgcHVibGljIExkU3YoKTogc3RyaW5nIHtyZXR1cm4gVF9WaWV3TW9kZS5MZFN2O31cclxuXHJcbiAgICBwcm90ZWN0ZWQgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgQ19Td2l0Y2hWaWV3LmFsbF9jbGFzcyA9IE9iamVjdC52YWx1ZXMoVF9WaWV3TW9kZSk7XHJcbiAgICAgICAgQ19Td2l0Y2hWaWV3LmFydGljbGUgPSB7fTtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBDX1N3aXRjaFZpZXcuYm9keSA9IGRvY3VtZW50LmJvZHk7XHJcblxyXG4gICAgICAgICAgICBDX1N3aXRjaFZpZXcuYXJ0aWNsZS52aWV3M2QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGFuZV9tYXplX3Z3M0QnKSBhcyBIVE1MRWxlbWVudDtcclxuICAgICAgICAgICAgQ19Td2l0Y2hWaWV3LmFydGljbGUudmlld0NoID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BhbmVfbWF6ZV92d0NoJykgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICAgICAgICAgIENfU3dpdGNoVmlldy5hcnRpY2xlLm1lbnVfbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwYW5lX21lbnVfbGlzdCcpIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgICAgICAgICBDX1N3aXRjaFZpZXcuYXJ0aWNsZS5sZHN2X2wgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGFuZV9sZHN2X2xpc3QnKSBhcyBIVE1MRWxlbWVudDtcclxuICAgICAgICAgICAgQ19Td2l0Y2hWaWV3LmFydGljbGUubGRzdl9kID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BhbmVfbGRzdl9kYXRhJykgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICAgICAgICAgIENfU3dpdGNoVmlldy5hcnRpY2xlLm1lbnVfbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwYW5lX21lbnVfbWVzZycpIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgICAgICAgICBDX1N3aXRjaFZpZXcuYXJ0aWNsZS5nYW1lX20gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGFuZV9tYXplX21lc2cnKSBhcyBIVE1MRWxlbWVudDtcclxuICAgICAgICAgICAgQ19Td2l0Y2hWaWV3LmFydGljbGUuY29udGxzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BhbmVfY3Rsc19ib2FkJykgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICAgICAgICAgIENfU3dpdGNoVmlldy5hcnRpY2xlLm1lc3NhZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwYW5lX3N5dG1fbWVzZycpIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgICAgICBfYWxlcnQoJ0xheW91dCBHZXQgRXJyb3I6ICcgKyBlcnIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnZpZXcoJ21vdmUnKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0T2JqKCk6IENfU3dpdGNoVmlldyB7XHJcbiAgICAgICAgdGhpcy5tZSA/Pz0gIG5ldyBDX1N3aXRjaFZpZXcoKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5tZTtcclxuICAgIH1cclxuICAgIHB1YmxpYyB2aWV3KG1vZGU6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHRoaXMuX19zZXRfY2xhc3MobW9kZSk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgX19zZXRfY2xhc3MoYzogc3RyaW5nKTogdm9pZCB7IFxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIENfU3dpdGNoVmlldy5ib2R5Py5jbGFzc0xpc3QucmVtb3ZlKC4uLkNfU3dpdGNoVmlldy5hbGxfY2xhc3MpO1xyXG4gICAgICAgICAgICBDX1N3aXRjaFZpZXcuYm9keT8uY2xhc3NMaXN0LmFkZChjKTtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBpaSBpbiBDX1N3aXRjaFZpZXcuYXJ0aWNsZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKENfU3dpdGNoVmlldy5hcnRpY2xlW2lpXSA9PT0gbnVsbCkgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBDX1N3aXRjaFZpZXcuYXJ0aWNsZVtpaV0/LmNsYXNzTGlzdC5yZW1vdmUoLi4uQ19Td2l0Y2hWaWV3LmFsbF9jbGFzcyk7XHJcbiAgICAgICAgICAgICAgICBDX1N3aXRjaFZpZXcuYXJ0aWNsZVtpaV0/LmNsYXNzTGlzdC5hZGQoYyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgX2FsZXJ0KCdMYXlvdXQgU2V0IEVycm9yOiAnICsgZXJyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgX21pbiwgX3JvdW5kIH0gICBmcm9tIFwiLi4vZF91dGwvRl9NYXRoXCI7XG5pbXBvcnQgeyBDX1BvaW50IH0gICAgICAgIGZyb20gXCIuLi9kX21kbC9DX1BvaW50XCJcbmltcG9ydCB7IENfUmFuZ2UgfSAgICAgICAgZnJvbSBcIi4uL2RfbWRsL0NfUmFuZ2VcIjtcbmltcG9ydCB7IENfTWF6ZU9ialZpZXcgfSAgZnJvbSBcIi4uL2RfbWRsL0NfTWF6ZU9ialZpZXdcIjtcbmltcG9ydCB7IFRfRGlyZWN0aW9uIH0gICAgZnJvbSBcIi4uL2RfbWRsL1RfRGlyZWN0aW9uXCI7XG5pbXBvcnQgeyBDX1dhbGwgfSAgICAgICAgIGZyb20gXCIuLi9kX21kbC9DX1dhbGxcIjtcbmltcG9ydCB7IGdfbWVzIH0gICAgICAgICAgZnJvbSBcIi4uL2RfY21uL2dsb2JhbFwiO1xuaW1wb3J0IHsgZ19tYXplLCBnX3RlYW0sIGdfZHMgfSAgZnJvbSBcIi4vZ2xvYmFsX2Zvcl9tYXplXCI7XG5cbmV4cG9ydCB0eXBlIFRfRHJvd1NldCA9IHtcbiAgICBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50fG51bGwsXG4gICAgY29uOiAgICBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkR8bnVsbCxcbiAgICBkZXB0aDogIG51bWJlcixcbiAgICB3YWxsOiAgIENfV2FsbHxudWxsLFxufVxuXG5cbi8vIDNE5o+P5YaZ5pmC44Gr5L2/55So44GZ44KL5aSn5Z+f5aSJ5pWw44Gu5rqW5YKZXG5leHBvcnQgZnVuY3Rpb24gaW5pdF9tYXplM0QoKTogVF9Ecm93U2V0IHtcbiAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWF6ZV92aWV3M0RfY2FudmFzJykgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XG4gICAgaWYgKGNhbnZhcyA9PT0gbnVsbCkge1xuICAgICAgICBnX21lcy53YXJuaW5nX21lc3NhZ2UoJ0NhbnZhcyBpc250IGZvdW5kISBpZD1NYXplX3ZpZXczRF9jYW52YXMnKTtcbiAgICAgICAgcmV0dXJuIHtjYW52YXM6IG51bGwsIGNvbjogbnVsbCwgZGVwdGg6IDAsIHdhbGw6IG51bGx9O1xuICAgIH1cbiAgICBjb25zdCBjb246IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRHxudWxsID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgaWYgKGNvbiA9PT0gbnVsbCkge1xuICAgICAgICBnX21lcy53YXJuaW5nX21lc3NhZ2UoJ0Jyb3dzZXIgZG9udCBzdXJwcG9ydCAyRCBncmFwaGljcyEnKTtcbiAgICAgICAgcmV0dXJuIHtjYW52YXM6IG51bGwsIGNvbjogbnVsbCwgZGVwdGg6IDAsIHdhbGw6IG51bGx9O1xuICAgIH1cblxuICAgIENfTWF6ZU9ialZpZXcuc2V0X2NvbnRleHQzRChjb24pO1xuICAgIGluaXRfbWF6ZUNlbGwzRCgpO1xuXG4gICAgLy8gM0Tjg6HjgqTjgrrjgpLmj4/lhpnjgZnjgovjgq3jg6Pjg7Pjg5DjgrnopoHntKDjga7jgrXjgqTjgrrjgpJDU1PkuIrjga7jgI7opovjgZ/nm67jgI/jga7jgrXjgqTjgrrjgavlkIjjgo/jgZvjgotcbiAgICBjYW52YXMud2lkdGggID0gY2FudmFzLmNsaWVudFdpZHRoO1xuICAgIGNhbnZhcy5oZWlnaHQgPSBjYW52YXMuY2xpZW50SGVpZ2h0O1xuXG4gICAgY29uc3QgZGVwdGggPSA1OyAvLyDlpYfmlbDjga7jgb/lr77lv5zjgILjg4Djg7Pjgrjjg6fjg7Pjga7opovpgJrjgZfjgpLoia/jgY/jgZnjgovjgarjgokgNSDjgYvjgoLjgZfjgozjgarjgYRcblxuICAgIGNvbnN0IHRvcF9wID0gbmV3IENfUG9pbnQoMCwgMCwgMCk7XG4gICAgY29uc3QgYnRtX3AgPSBuZXcgQ19Qb2ludChjYW52YXMud2lkdGggIC0gMSwgY2FudmFzLmhlaWdodCAtIDEsIDApO1xuICAgIGNvbnN0IHdhbGwgID0gbmV3IENfV2FsbChkZXB0aCwgbmV3IENfUmFuZ2UodG9wX3AsIGJ0bV9wKSk7XG4gICAgcmV0dXJuIHtjYW52YXM6IGNhbnZhcywgY29uOiBjb24sIGRlcHRoOiBkZXB0aCwgd2FsbDogd2FsbH07XG59XG5cbmZ1bmN0aW9uIGluaXRfbWF6ZUNlbGwzRCgpOiB2b2lkIHt9XG5cblxuLy8gM0Tmj4/lhpnmmYLjga7nlLvpnaLliJ3mnJ/ljJbjgILjgajjgorjgYLjgYjjgZrlpKnkupXjgajluorjgpLmj4/jgY9cbmZ1bmN0aW9uIGRyYXdfaW5pdF9tYXplM0QoKTogdm9pZCB7XG4gICAgaWYgKGdfZHMuY2FudmFzID09PSBudWxsIHx8IGdfZHMuY29uID09PSBudWxsKSByZXR1cm47XG5cbiAgICBnX2RzLmNvbi5maWxsU3R5bGUgPSAnI2FhYWFhYSc7XG4gICAgZ19kcy5jb24uZmlsbFJlY3QoXG4gICAgICAgIDAsIFxuICAgICAgICAwLCBcbiAgICAgICAgZ19kcy5jYW52YXMud2lkdGggLSAxLCBcbiAgICAgICAgZ2V0X2hvbGl6b25fbGluZSgpLFxuICAgICk7XG5cbiAgICBnX2RzLmNvbi5maWxsU3R5bGUgPSAnIzY2NjZmZic7XG4gICAgZ19kcy5jb24uZmlsbFJlY3QoXG4gICAgICAgIDAsIFxuICAgICAgICBnZXRfaG9saXpvbl9saW5lKCksIFxuICAgICAgICBnX2RzLmNhbnZhcy53aWR0aCAgIC0gMSwgXG4gICAgICAgIGdfZHMuY2FudmFzLmhlaWdodCAgLSAxLFxuICAgICk7XG5cbiAgICBkcm93X2Zsb29yX2xpbmUoKTtcbn1cblxuZnVuY3Rpb24gZ2V0X2hvbGl6b25fbGluZSgpOiBudW1iZXIge1xuICAgIGlmIChnX2RzLndhbGwgPT09IG51bGwpIHJldHVybiAtMTtcbiAgICByZXR1cm4gZ19kcy53YWxsLmdldChnX2RzLmRlcHRoLCAwKS5tYXhfeTtcbn1cblxuZnVuY3Rpb24gZHJvd19mbG9vcl9saW5lKCk6IHZvaWQge1xuICAgIGlmIChnX2RzLmNhbnZhcyA9PT0gbnVsbCB8fCBnX2RzLmNvbiA9PT0gbnVsbCB8fCBnX2RzLndhbGwgPT09IG51bGwpIHJldHVybjtcbiAgICBjb25zdCBjb24gICA9IGdfZHMuY29uO1xuICAgIGNvbnN0IHdhbGwgID0gZ19kcy53YWxsO1xuICAgIGNvbnN0IGRlcHRoID0gZ19kcy5kZXB0aDtcbiAgICBjb25zdCBIX2RlcHQgPSAoZGVwdGggLSAxKSAvIDI7XG5cbiAgICBjb25zdCBsZWZ0X3ggID0gMDtcbiAgICBjb25zdCByaWdodF94ID0gZ19kcy5jYW52YXMud2lkdGggIC0gMTtcbiAgICBjb25zdCBmcm9udF95ID0gZ19kcy5jYW52YXMuaGVpZ2h0IC0gMTtcbiAgICBjb25zdCBiYWNrX3kgID0gZ2V0X2hvbGl6b25fbGluZSgpO1xuXG4gICAgY29uLnN0cm9rZVN0eWxlID0gJyM5OTk5ZmYnO1xuICAgIGNvbi5saW5lV2lkdGggICA9IDE7XG5cbiAgICAvLyDmqKrnt5oo55S76Z2i44Gr5a++44GX44Gm5rC05bmzKeOCkuW8leOBj1xuICAgIGZvciAodmFyIHkgPSAwOyB5IDwgZGVwdGggKyAxOyB5KyspIHtcbiAgICAgICAgY29uLmJlZ2luUGF0aCgpO1xuICAgICAgICBjb24ubW92ZVRvKGxlZnRfeCAsIHdhbGwuZ2V0KHksIDApLm1heF95KTtcbiAgICAgICAgY29uLmxpbmVUbyhyaWdodF94LCB3YWxsLmdldCh5LCAwKS5tYXhfeSk7XG4gICAgICAgIGNvbi5zdHJva2UoKTsgXG4gICAgfVxuXG4gICAgLy8g57im57ea44KS5byV44GPXG4gICAgZm9yICh2YXIgeCA9IC1IX2RlcHQ7IHggPCBIX2RlcHQgKyAxOyB4KyspIHtcbiAgICAgICAgY29uLmJlZ2luUGF0aCgpO1xuICAgICAgICBjb24ubW92ZVRvKHdhbGwuZ2V0KDAsICAgICB4KS5taW5feCwgZnJvbnRfeSk7XG4gICAgICAgIGNvbi5saW5lVG8od2FsbC5nZXQoZGVwdGgsIHgpLm1pbl94LCBiYWNrX3kgKTtcbiAgICAgICAgY29uLnN0cm9rZSgpO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRpc3BsYXlfbWF6ZTNEKCk6IHZvaWQge1xuICAgIGlmIChnX2RzLmNhbnZhcyA9PT0gbnVsbCB8fCBnX2RzLmNvbiA9PT0gbnVsbCB8fCBnX2RzLndhbGwgPT09IG51bGwpIHJldHVybjtcblxuICAgIGRyYXdfaW5pdF9tYXplM0QoKTtcbiAgICBkaXNwbGV5X21hc2UzRF9kaXJlY3Rpb24oKTtcblxuICAgIGNvbnN0IGRlcHRoICAgPSAgZ19kcy5kZXB0aDtcbiAgICBjb25zdCBIX2RlcHRoID0gKGRlcHRoIC0gMSkgLyAyO1xuICAgIGZvciAodmFyIGogPSBnX2RzLmRlcHRoIC0gMTsgaiA+PSAwOyBqLS0pIHtcbiAgICAgICAgLy8g5Y+z5YG044GM6KaL44GI44Gm44GE44KL5aOB44Gu5o+P5YaZICjlt6blgbTjgYvjgonmj4/lhpkpXG4gICAgICAgIGZvciAodmFyIGsgPSAtSF9kZXB0aDsgayA8IDA7IGsrKykgZHJvd01hemVDZWxsKGosIGspO1xuICAgICAgICAvLyDlt6blgbTjgYzopovjgYjjgabjgYTjgovlo4Hjga7mj4/lhpkgKOWPs+WBtOOBi+OCieaPj+WGmSlcbiAgICAgICAgZm9yICh2YXIgayA9IEhfZGVwdGg7IGsgPiAwOyBrLS0pICBkcm93TWF6ZUNlbGwoaiwgayk7XG4gICAgICAgIC8vIOato+mdouOBruWjgeOBruaPj+WGmVxuICAgICAgICBkcm93TWF6ZUNlbGwoaiwgMCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcm93TWF6ZUNlbGwoZDogbnVtYmVyLCB3OiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAoZ19kcy53YWxsID09PSBudWxsKSByZXR1cm47XG4gICAgY29uc3QgYXJvdW5kX2pfayA9IGdfdGVhbS53YWxrKCkuZ2V0X2Fyb3VuZChkLCB3LCAwKTtcbiAgICBjb25zdCBmcm90X3dhbGwgID0gZ19kcy53YWxsLmdldChkLCB3KTtcbiAgICBjb25zdCBiYWNrX3dhbGwgID0gZ19kcy53YWxsLmdldChkICsgMSwgdyk7XG4gICAgY29uc3QgbXpfa2luZCAgICA9IGdfbWF6ZS5nZXRfa2luZChhcm91bmRfal9rKTtcblxuICAgIGdfbWF6ZT8uZ2V0X2NlbGwoYXJvdW5kX2pfayk/LmRyb3czRChmcm90X3dhbGwsIGJhY2tfd2FsbCk7XG4gICAgaWYgKGdfbWF6ZS5leGlzdF9vYmooYXJvdW5kX2pfaykpIHtcbiAgICAgICAgY29uc3Qgb2JqID0gZ19tYXplLmdldF9vYmooYXJvdW5kX2pfayk7XG4gICAgICAgIGlmIChvYmogIT09IG51bGwpIG9iai52aWV3KCk/LmRyb3czRChmcm90X3dhbGwsIGJhY2tfd2FsbCk7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGlzcGxleV9tYXNlM0RfZGlyZWN0aW9uKCk6IHZvaWQge1xuICAgIGNvbnN0IHBfZGlyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hemVfdmlldzNEX2RpcmVjdGlvbl9pbmZvJykgYXMgSFRNTFBhcmFncmFwaEVsZW1lbnQ7XG4gICAgaWYgKHBfZGlyID09PSBudWxsKSB7XG4gICAgICAgIGdfbWVzLndhcm5pbmdfbWVzc2FnZSgnUCBlbGVtZW50IGlzbnQgZm91bmQhIGlkPU1hemVfdmlldzNEX2RpcmVjdGlvbl9pbmZvJyk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIGRpcmVjdGlvbjogc3RyaW5nO1xuICAgIGNvbnN0IHAgPSBnX3RlYW0uZ2V0X3BkKCk7XG4gICAgc3dpdGNoIChwLmQpIHtcbiAgICAgICAgY2FzZSBUX0RpcmVjdGlvbi5OOlxuICAgICAgICAgICAgZGlyZWN0aW9uID0gJzxzcGFuIGNsYXNzPVwiZGlyZWN0aW9uX05cIj7jgIrljJfjgIs8L3NwYW4+JztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFRfRGlyZWN0aW9uLkU6XG4gICAgICAgICAgICBkaXJlY3Rpb24gPSAnPHNwYW4gY2xhc3M9XCJkaXJlY3Rpb25fRVwiPuOAiuadseOAizwvc3Bhbj4nO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgVF9EaXJlY3Rpb24uUzpcbiAgICAgICAgICAgIGRpcmVjdGlvbiA9ICc8c3BhbiBjbGFzcz1cImRpcmVjdGlvbl9TXCI+44CK5Y2X44CLPC9zcGFuPic7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBUX0RpcmVjdGlvbi5XOlxuICAgICAgICAgICAgZGlyZWN0aW9uID0gJzxzcGFuIGNsYXNzPVwiZGlyZWN0aW9uX1dcIj7jgIropb/jgIs8L3NwYW4+JztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgZGlyZWN0aW9uID0gJzxzcGFuIGNsYXNzPVwiZGlyZWN0aW9uX0RcIj7jgIrorI7jgIs8L3NwYW4+JztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGNvbnN0IG1lcyA9ICflnLDkuIsgJyArIChwLnogKyAxKSArICfpmo7jgIAnICsgZGlyZWN0aW9uICsgJ+OAgCh4ID0gPHNwYW4gaWQ9XCJkaXJlY3Rpb25fWFwiPicgKyBwLnggKyAnPC9zcGFuPiwgeSA9IDxzcGFuIGlkPVwiZGlyZWN0aW9uX1lcIj4nICsgcC55ICsgJzwvc3Bhbj4pJztcbiAgICBwX2Rpci5pbm5lckhUTUwgPSBtZXM7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIG1hemUzRF9ibGlua19vbl9kaXJlY3Rpb24oKTogdm9pZCB7XG4gICAgY29uc3QgZGlyX3ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGlyZWN0aW9uX1gnKSBhcyBIVE1MU3BhbkVsZW1lbnQ7XG4gICAgaWYgKGRpcl94ID09PSBudWxsKSByZXR1cm47XG5cbiAgICBjb25zdCBkaXJfeSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkaXJlY3Rpb25fWScpIGFzIEhUTUxTcGFuRWxlbWVudDtcbiAgICBpZiAoZGlyX3kgPT09IG51bGwpIHJldHVybjtcblxuICAgIHN3aXRjaCAoZ190ZWFtLndhbGsoKS5nZXRfZCgpKSB7XG4gICAgICAgIGNhc2UgVF9EaXJlY3Rpb24uTjpcbiAgICAgICAgY2FzZSBUX0RpcmVjdGlvbi5TOlxuICAgICAgICAgICAgZGlyX3guY2xhc3NMaXN0LnJlbW92ZSgnYmxpbmsnKTtcbiAgICAgICAgICAgIGRpcl95LmNsYXNzTGlzdC5hZGQgICAoJ2JsaW5rJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGNhc2UgVF9EaXJlY3Rpb24uRTpcbiAgICAgICAgY2FzZSBUX0RpcmVjdGlvbi5XOlxuICAgICAgICAgICAgZGlyX3guY2xhc3NMaXN0LmFkZCAgICgnYmxpbmsnKTtcbiAgICAgICAgICAgIGRpcl95LmNsYXNzTGlzdC5yZW1vdmUoJ2JsaW5rJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIG1hemUzRF9ibGlua19vZmZfZGlyZWN0aW9uKCk6IHZvaWQge1xuICAgIGNvbnN0IGRpcl94ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RpcmVjdGlvbl9YJykgYXMgSFRNTFNwYW5FbGVtZW50O1xuICAgIGlmIChkaXJfeCA9PT0gbnVsbCkgcmV0dXJuO1xuICAgIGRpcl94LmNsYXNzTGlzdC5yZW1vdmUoJ2JsaW5rJyk7XG5cbiAgICBjb25zdCBkaXJfeSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkaXJlY3Rpb25fWScpIGFzIEhUTUxTcGFuRWxlbWVudDtcbiAgICBpZiAoZGlyX3kgPT09IG51bGwpIHJldHVybjtcbiAgICBkaXJfeS5jbGFzc0xpc3QucmVtb3ZlKCdibGluaycpO1xufVxuXG4iLCJpbXBvcnQgeyBnX2RlYnVnLCBnX21lcyB9IGZyb20gXCIuLi9kX2Ntbi9nbG9iYWxcIjtcclxuaW1wb3J0IHsgX21pbiwgX3JvdW5kLCBfbWF4IH0gZnJvbSAnLi4vZF91dGwvRl9NYXRoJztcclxuaW1wb3J0IHsgZ19tYXplLCBnX3RlYW0gfSBmcm9tIFwiLi9nbG9iYWxfZm9yX21hemVcIjtcclxuXHJcbmxldCBkaXY6IEhUTUxEaXZFbGVtZW50O1xyXG5sZXQgcHJlOiBIVE1MUHJlRWxlbWVudDtcclxuXHJcbmxldCB2aWV3X3dkdGggICAgICAgID0gMDtcclxubGV0IHZpZXdfaGdodCAgICAgICAgPSAwO1xyXG5sZXQgbWFwX3dkdGggICAgICAgICA9IDA7XHJcbmxldCBtYXBfaGdodCAgICAgICAgID0gMDtcclxubGV0IGZvbnRfc2l6ZTpudW1iZXIgPSAwO1xyXG5sZXQgbGluZV9oZ2h0Om51bWJlciA9IDA7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaW5pdF9tYXplQ2goKTogdm9pZCB7XHJcbiAgICBkaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGl2X21hemVfdndDaCcpICAgYXMgSFRNTERpdkVsZW1lbnQ7XHJcbiAgICBwcmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWF6ZV92aWV3Q2hfcHJlJykgYXMgSFRNTFByZUVsZW1lbnQ7XHJcbiAgICBjYWxjX3ZpZXdDaF93aWR0aCgpO1xyXG59XHJcblxyXG4vLyDjgJDliJ3mnJ/oqK3lrprjgJFWaWV3Q2jjga7mqKrluYXjgpJDU1PjgYvjgonoqq3jgb/ovrzjgpPjgafpganlkIjjgZnjgovmloflrZfjga7jgrXjgqTjgrrjgpLoqIjnrpfjgZfjgabjgrvjg4Pjg4jjgZnjgotcclxuZnVuY3Rpb24gY2FsY192aWV3Q2hfd2lkdGgoKTogdm9pZCB7XHJcblxyXG4gICAgdmlld193ZHRoICA9IGRpdi5jbGllbnRXaWR0aDtcclxuICAgIHZpZXdfaGdodCAgPSBkaXYuY2xpZW50SGVpZ2h0O1xyXG5cclxuICAgIGNvbnN0IGNvbCAgICA9IGdfbWF6ZS5nZXRfeF9tYXgoKSArIDE7XHJcbiAgICBjb25zdCBjb2xfcHggPSB2aWV3X3dkdGggIC8gY29sO1xyXG5cclxuICAgIGNvbnN0IHJvdyAgICA9IGdfbWF6ZS5nZXRfeV9tYXgoKSArIDE7XHJcbiAgICBjb25zdCByb3dfcHggPSB2aWV3X2hnaHQgLyByb3c7XHJcblxyXG4gICAgZm9udF9zaXplICAgPSBfcm91bmQoX21heChbMTUuMCwgX3JvdW5kKDEuMDAgKiAgX21pbihbY29sX3B4LCByb3dfcHhdKSwgMildKSwgMCk7XHJcbiAgICBsaW5lX2hnaHQgICA9IF9yb3VuZChfbWF4KFsxNS4wLCBfcm91bmQoMS4wMCAqICBfbWluKFtjb2xfcHgsIHJvd19weF0pLCAyKV0pLCAwKTtcclxuXHJcbiAgICBtYXBfd2R0aCAgICA9IGZvbnRfc2l6ZSAqIGNvbDtcclxuICAgIG1hcF9oZ2h0ICAgID0gbGluZV9oZ2h0ICogY29sO1xyXG5cclxuICAgIHByZS5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgIG1hcF93ZHRoLnRvU3RyaW5nKCkpO1xyXG4gICAgcHJlLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgbWFwX2hnaHQudG9TdHJpbmcoKSk7XHJcbiAgICBwcmUuc3R5bGUuc2V0UHJvcGVydHkoJ2ZvbnQtc2l6ZScsICBgJHtmb250X3NpemV9cHhgKTtcclxuICAgIHByZS5zdHlsZS5zZXRQcm9wZXJ0eSgnbGluZS1oZWlnaHQnLGAke2xpbmVfaGdodH1weGApO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjYWxjX3ZpZXdfdG9wKCk6IHZvaWQge1xyXG5cclxuICAgIHZpZXdfd2R0aCAgPSBkaXYuY2xpZW50V2lkdGg7XHJcbiAgICB2aWV3X2hnaHQgID0gZGl2LmNsaWVudEhlaWdodDtcclxuXHJcbiAgICBjb25zdCBwZCA9IGdfdGVhbS5nZXRfcGQoKTtcclxuXHJcbiAgICBsZXQgdG9wX3ggPSAgdmlld193ZHRoIC8gMiAtIChwZC54ICsgMSkgKiBmb250X3NpemU7XHJcbi8vICAgIGlmICh0b3BfeCA8IC12aWV3X3dkdGggLyAyKSB0b3BfeCA9IC12aWV3X3dkdGggLyAyO1xyXG4vLyAgICBpZiAodG9wX3ggPiBtYXBfd2R0aCAtIHZpZXdfd2R0aCkgdG9wX3ggPSBtYXBfd2R0aCAtIHZpZXdfd2R0aDtcclxuXHJcbiAgICBsZXQgdG9wX3kgPSAgdmlld19oZ2h0IC8gMiAtIChwZC55ICsgMSkgKiBsaW5lX2hnaHQ7XHJcbi8vICAgIGlmICh0b3BfeSA8IC12aWV3X2hnaHQgLyAyKSB0b3BfeSA9IC12aWV3X2hnaHQgLyAyOyAvLyDjg5DjgrDlr77nrZbjga7pganlvZPkv67mraNcclxuLy8gICAgaWYgKHRvcF95ID4gbWFwX2hnaHQgLSB2aWV3X2hnaHQpIHRvcF95ID0gbWFwX2hnaHQgLSB2aWV3X2hnaHQ7XHJcblxyXG4gICAgcHJlLnN0eWxlLnNldFByb3BlcnR5KCdsZWZ0JywgICAgICBgJHt0b3BfeH1weGApO1xyXG4gICAgcHJlLnN0eWxlLnNldFByb3BlcnR5KCd0b3AnLCAgICAgICBgJHt0b3BfeX1weGApO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZGlzcGxheV9tYXplQ2goKTogdm9pZCB7IFxyXG4gICAgaWYgKHByZSAhPT0gbnVsbCkge3ByZS5pbm5lclRleHQgPSB0b19zdHJpbmcoKTtjYWxjX3ZpZXdfdG9wKCl9XHJcbiAgICBlbHNlIGdfbWVzLndhcm5pbmdfbWVzc2FnZSgnQ2FuIG5vdCBmb3VuZCBwcmUjTWF6ZV92aWV3Q2hfcHJlISEnKTtcclxufVxyXG5cclxuZnVuY3Rpb24gdG9fc3RyaW5nKCk6IHN0cmluZyB7XHJcbiAgICBjb25zdCBzaXplX3ggPSBnX21hemUuZ2V0X3hfbWF4KCk7XHJcbiAgICBjb25zdCBzaXplX3kgPSBnX21hemUuZ2V0X3lfbWF4KCk7XHJcbiAgICBjb25zdCBmbG9vciAgPSBnX3RlYW0uZ2V0X3BkKCkuelxyXG5cclxuICAgIGxldCByZXRfc3RyID0gJyc7XHJcbiAgICBmb3IgKGxldCB5ID0gMDsgeSA8IHNpemVfeTsgeSsrKSB7XHJcbiAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCBzaXplX3g7IHgrKykge1xyXG4gICAgICAgICAgICBpZiAoIWdfZGVidWcuaXNPTigpICYmIGdfbWF6ZS5pc19tYXNrZWRfeHl6KHgsIHksIGZsb29yKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0X3N0ciArPSAn77y4JztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG9iaiA9IGdfbWF6ZS5nZXRfb2JqX3h5eih4LCB5LCBmbG9vcik7XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqID09PSBudWxsIHx8IG9iai52aWV3KCkgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldF9zdHIgKz0gZ19tYXplLmdldF9jZWxsX3h5eih4LCB5LCBmbG9vcik/LnRvX2xldHRlcigpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBvYmpfYyA9IG9iai52aWV3KCk/LmxldHRlcigpID8/ICforI4nO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldF9zdHIgKz0gb2JqX2M7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0X3N0ciArPSBcIlxcblwiO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJldF9zdHI7XHJcbn1cclxuXHJcbiIsImltcG9ydCB7IENfVXJsT3B0IH0gICAgICAgICAgICAgICAgICAgZnJvbSBcIi4uL2RfdXRsL0NfVXJsT3B0XCI7XHJcbmltcG9ydCB7IFVEX3NhdmUsIHRtcF9zYXZlIH0gICAgICAgICAgZnJvbSBcIi4uL2RfY21uL0ZfbG9hZF9hbmRfc2F2ZVwiO1xyXG5pbXBvcnQgeyBQT1NUX2FuZF9tb3ZlX3BhZ2UgfSAgICAgICAgIGZyb20gXCIuLi9kX2Ntbi9GX1BPU1RcIjtcclxuaW1wb3J0IHsgZ19zdGFydF9lbnYsIGdfdXJsLCBnX3VybF9tYWlfZ3VsZCB9IGZyb20gXCIuLi9kX2Ntbi9nbG9iYWxcIjtcclxuXHJcbmltcG9ydCB7IHNldF9nX3NhdmUgfSBmcm9tIFwiLi9GX3NldF9zYXZlX21vZGVcIjtcclxuaW1wb3J0IHsgYWN0X21vdmVfbW9kZSwgZG9fbW92ZV9ib3R0b21faGFsZiB9IGZyb20gXCIuL0Zfc2V0X21vdmVfbW9kZVwiO1xyXG5pbXBvcnQgeyBcclxuICAgIGdfbXZtLCBcclxuICAgIGdfbWF6ZSwgXHJcbiAgICBnX3RlYW0sXHJcbiAgICBnX2N0bHMsXHJcbiAgICBnX3ZzdyxcclxuICAgIGdfZHMsIFxyXG59ICAgZnJvbSBcIi4vZ2xvYmFsX2Zvcl9tYXplXCI7XHJcblxyXG5cclxudmFyIGNhblVwOiBib29sZWFuICA9ICBmYWxzZTtcclxudmFyIGNhbkRuOiBib29sZWFuICA9ICBmYWxzZTtcclxuXHJcbnZhciBpc1VwOiAgYm9vbGVhbiAgPSAgZmFsc2U7XHJcblxyXG5jb25zdCBjdGxzX3VwZG5fdXAgPSB7XHJcbiAgICBuYW1lOiAndXBkbl91cCcsIFxyXG4vLyAgICBkb19VOiAgZG9fdXAsXHJcbiAgICBpc09LOiAgZG9fdXAsXHJcbiAgICBpc05HOiAgZG9fY2FuY2VsLFxyXG59XHJcbmNvbnN0IGN0bHNfdXBkbl9kbiA9IHtcclxuICAgIG5hbWU6ICd1cGRuX2RuJywgXHJcbi8vICAgIGRvX0Q6ICBkb19kb3duLFxyXG4gICAgaXNPSzogIGRvX2Rvd24sXHJcbiAgICBpc05HOiAgZG9fY2FuY2VsLFxyXG59XHJcbmNvbnN0IGN0bHNfdXBkbl91ZF9ocHVwID0ge1xyXG4gICAgbmFtZTogJ3VwZG5fdWRfaHB1cCcsIFxyXG4vLyAgICBkb19VOiAgaG9wZV9VcCxcclxuLy8gICAgaXNPSzogIGRvX1VELFxyXG4gICAgZG9fVTogIGRvX3VwLFxyXG4gICAgZG9fRDogIGRvX2Rvd24sXHJcbiAgICBpc05HOiAgZG9fY2FuY2VsLFxyXG59XHJcbmNvbnN0IGN0bHNfdXBkbl91ZF9ocGRuID0ge1xyXG4gICAgbmFtZTogJ3VwZG5fdWRfaHBkbicsIFxyXG4vLyAgICBkb19EOiAgaG9wZV9Eb3duLFxyXG4vLyAgICBpc09LOiAgZG9fVUQsXHJcbiAgICBkb19VOiAgZG9fdXAsXHJcbiAgICBkb19EOiAgZG9fZG93bixcclxuICAgIGlzTkc6ICBkb19jYW5jZWwsXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpbml0X1VEX21vZGUoKTogdm9pZCB7XHJcbiAgICBnX2N0bHMuc2V0KGN0bHNfdXBkbl91cCk7XHJcbiAgICBnX2N0bHMuc2V0KGN0bHNfdXBkbl9kbik7XHJcbiAgICBnX2N0bHMuc2V0KGN0bHNfdXBkbl91ZF9ocHVwKTtcclxuICAgIGdfY3Rscy5zZXQoY3Rsc191cGRuX3VkX2hwZG4pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYWN0X1VwX21vZGUoKTogdm9pZCB7XHJcbiAgICBpZiAoZ190ZWFtLndhbGsoKS5nZXRfeigpID4gMCkge1xyXG4gICAgICAgIGdfbXZtLm5vdGljZV9tZXNzYWdlKCfkuIrjgorjg4bjg6zjg53jg7zjgr/jg7zjgYzmnInjgorjgb7jgZnjgILnmbvjgorjgb7jgZnjgYvvvJ/nmbvjgosg4oeSIOOAhyDnmbvjgonjgarjgYQg4oeSIOKclicpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBnX212bS5ub3RpY2VfbWVzc2FnZSgn6KGX44Gr5oi744KK44G+44GZ44GL77yf5oi744KLIOKHkiDjgIcg5oi744KJ44Gq44GEIOKHkiDinJYnKTtcclxuICAgIH1cclxuXHJcbiAgICBjYW5VcCA9IHRydWU7XHJcbiAgICBjYW5EbiA9IGZhbHNlO1xyXG4gICAgZ19jdGxzLmFjdChjdGxzX3VwZG5fdXApO1xyXG4gICAgZ192c3cudmlldyhnX3Zzdy5Nb3ZlKCkpO1xyXG4gICAgc2V0Q2FudmFzM0RDbGljaygpXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhY3RfRG5fbW9kZSgpOiB2b2lkIHtcclxuICAgIGdfbXZtLm5vdGljZV9tZXNzYWdlKCfkuIvjgorjg4bjg6zjg53jg7zjgr/jg7zjgYzmnInjgorjgb7jgZnjgILpmY3jgorjgb7jgZnjgYvvvJ/pmY3jgorjgosg4oeSIOOAhyDpmY3jgorjgarjgYQg4oeSIOKclicpO1xyXG5cclxuICAgIGNhblVwID0gZmFsc2U7XHJcbiAgICBjYW5EbiA9IHRydWU7XHJcbiAgICBnX2N0bHMuYWN0KGN0bHNfdXBkbl9kbik7XHJcbiAgICBnX3Zzdy52aWV3KGdfdnN3Lk1vdmUoKSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhY3RfVURfbW9kZSgpOiB2b2lkIHtcclxuICAgIGdfbXZtLm5vdGljZV9tZXNzYWdlKCfkuIrkuIvjg4bjg6zjg53jg7zjgr/jg7zjgYzmnInjgorjgb7jgZnjgILnmbvjgorjgb7jgZnjgYvvvJ/nmbvjgovih5Ig44CHIOmZjeOCiuOCiyDih5IgKOKGk+OCreODvCkg56e75YuV44GX44Gq44GEIOKHkiDinJYnKTtcclxuXHJcbiAgICBjYW5VcCA9IHRydWU7XHJcbiAgICBjYW5EbiA9IHRydWU7XHJcbiAgICBpZiAoIWlzVXApICBnX2N0bHMuYWN0KGN0bHNfdXBkbl91ZF9ocHVwKTtcclxuICAgIGVsc2UgICAgICAgIGdfY3Rscy5hY3QoY3Rsc191cGRuX3VkX2hwZG4pO1xyXG4gICAgZ192c3cudmlldyhnX3Zzdy5Nb3ZlKCkpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkb19jYW5jZWwoKTogdm9pZCB7XHJcbiAgICBnX212bS5jbGVhcl9tZXNzYWdlKCk7XHJcbiAgICBhY3RfbW92ZV9tb2RlKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRvX3VwKCk6IHZvaWQge1xyXG4gICAgY29uc3QgcnNsdCA9IGdfdGVhbS53YWxrKCkuaG9wZV9wX3VwKCk7XHJcblxyXG4gICAgLy/jgIDkuIrjgorpmo7mrrXjgYzlnLDkuIvkuIDpmo7jga7loLTlkIjjga/jgrvjg7zjg5bjgZfjgabjgYvjgonooZco5YaS6Zm66ICF44Ku44Or44OJKeOBuOenu+WLleOBmeOCi1xyXG4gICAgaWYgKHJzbHQuaGFzX2hvcGUgJiYgcnNsdC5zdWJqLnogPCAwKSB7XHJcbiAgICAgICAgZG9fVURfc2F2ZSgpLnRoZW4oYXN5bmMgKCk9PntcclxuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRtcF9zYXZlKCk7XHJcbiAgICAgICAgfSkudGhlbigoKT0+e1xyXG4gICAgICAgICAgICBjb25zdCBvcHQgPSBuZXcgQ19VcmxPcHQoKTtcclxuICAgICAgICAgICAgb3B0LnNldCgnbW9kZScsICdsb2FkJyk7XHJcbiAgICAgICAgICAgIG9wdC5zZXQoJ3BpZCcsICAgZ19zdGFydF9lbnYucGlkKTtcclxuICAgICAgICAgICAgb3B0LnNldCgnb3B0JywgICAxMDApO1xyXG4gICAgICAgICAgICBQT1NUX2FuZF9tb3ZlX3BhZ2UoZ191cmxbZ191cmxfbWFpX2d1bGRdLCBvcHQpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOS4iuOCiumajuauteOBjOWcsOS4i+S6jOmajuS7peS4i+OBruWgtOWQiOOBr+OCu+ODvOODluOBl+OBpuOBi+OCieS4iuOBrumajuOBq+enu+WLleOBmeOCi1xyXG4gICAgaWYgKCFyc2x0Lmhhc19ob3BlIHx8ICFnX21hemUud2l0aGluKHJzbHQuc3ViaikpIHtcclxuICAgICAgICByc2x0LmRvTkcoKTtcclxuICAgICAgICBnX212bS5jbGVhcl9tZXNzYWdlKCk7XHJcbiAgICAgICAgYWN0X21vdmVfbW9kZSgpO1xyXG4gICAgICAgIGRvX21vdmVfYm90dG9tX2hhbGYoJ2JsaW5rX29mZicpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBkb19VRF9zYXZlKCkudGhlbigoKT0+e1xyXG4gICAgICAgICAgICByc2x0LmRvT0soKTtcclxuICAgICAgICAgICAgZ19tdm0uY2xlYXJfbWVzc2FnZSgpO1xyXG4gICAgICAgICAgICBhY3RfbW92ZV9tb2RlKCk7XHJcbiAgICAgICAgICAgIGRvX21vdmVfYm90dG9tX2hhbGYoJ2JsaW5rX29mZicpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBkb19kb3duKCk6IHZvaWQge1xyXG4gICAgY29uc3QgcnNsdCA9IGdfdGVhbS53YWxrKCkuaG9wZV9wX2Rvd24oKTtcclxuICAgIGlmICghcnNsdC5oYXNfaG9wZSB8fCAhZ19tYXplLndpdGhpbihyc2x0LnN1YmopKSB7XHJcbiAgICAgICAgcnNsdC5kb05HKCk7XHJcbiAgICAgICAgZ19tdm0uY2xlYXJfbWVzc2FnZSgpO1xyXG4gICAgICAgIGFjdF9tb3ZlX21vZGUoKTtcclxuICAgICAgICBkb19tb3ZlX2JvdHRvbV9oYWxmKCdibGlua19vZmYnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZG9fVURfc2F2ZSgpLnRoZW4oKCk9PntcclxuICAgICAgICAgICAgcnNsdC5kb09LKCk7XHJcbiAgICAgICAgICAgIGdfbXZtLmNsZWFyX21lc3NhZ2UoKTtcclxuICAgICAgICAgICAgYWN0X21vdmVfbW9kZSgpO1xyXG4gICAgICAgICAgICBkb19tb3ZlX2JvdHRvbV9oYWxmKCdibGlua19vZmYnKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZG9fVUQoKTogdm9pZCB7XHJcbiAgICBpZiAoIWNhblVwIHx8ICFjYW5EbikgcmV0dXJuO1xyXG4gICAgXHJcbiAgICBpZiAoaXNVcCkgZG9fdXAoKTtcclxuICAgIGVsc2UgICAgICBkb19kb3duKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGhvcGVfVXAoKTogdm9pZCB7XHJcbiAgICBpZiAoIWNhblVwIHx8ICFjYW5EbikgcmV0dXJuO1xyXG4gICAgaXNVcCA9IHRydWU7XHJcbiAgICBnX2N0bHMuYWN0KGN0bHNfdXBkbl91ZF9ocGRuKTtcclxuXHJcbiAgICBpZiAoZ190ZWFtLndhbGsoKS5nZXRfeigpID4gMCkge1xyXG4gICAgICAgIGdfbXZtLm5vdGljZV9tZXNzYWdlKCfnmbvjgorjgb7jgZnjgYvvvJ/nmbvjgovih5Ig44CHIOmZjeOCiuOCiyDih5IgKOKGk+OCreODvCkg56e75YuV44GX44Gq44GEIOKHkiDinJYnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZ19tdm0ubm90aWNlX21lc3NhZ2UoJ+ihl+OBq+aIu+OCiuOBvuOBmeOBi++8n+aIu+OCi+KHkiDjgIcg6ZmN44KK44KLIOKHkiAo4oaT44Kt44O8KSDnp7vli5XjgZfjgarjgYQg4oeSIOKclicpO1xyXG4gICAgfTtcclxufVxyXG5mdW5jdGlvbiBob3BlX0Rvd24oKTogdm9pZCB7XHJcbiAgICBpZiAoIWNhblVwIHx8ICFjYW5EbikgcmV0dXJuO1xyXG4gICAgaXNVcCA9IGZhbHNlO1xyXG4gICAgZ19jdGxzLmFjdChjdGxzX3VwZG5fdWRfaHB1cCk7XHJcblxyXG4gICAgZ19tdm0ubm90aWNlX21lc3NhZ2UoJ+mZjeOCiuOBvuOBmeOBi++8n+mZjeOCiuOCi+KHkiDjgIcg55m744KLIOKHkiAo4oaR44Kt44O8KSDnp7vli5XjgZfjgarjgYQg4oeSIOKclicpO1xyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBkb19VRF9zYXZlKCk6IFByb21pc2U8YW55fHVuZGVmaW5lZD4ge1xyXG4gICAgc2V0X2dfc2F2ZShcclxuICAgICAgICAvKiBzYXZlX2lkOiAqLyAgIC0xLFxyXG4gICAgICAgIC8qIHVuaXFfbm86ICovICAgLTEsXHJcbiAgICAgICAgLyogdGl0bGU6ICovICAgICAn6Ieq5YuV5L+d5a2Y44OH44O844K/JywgXHJcbiAgICAgICAgLyogZGV0YWlsOiAqLyAgICAnJyxcclxuICAgICAgICAvKiBwb2ludDogKi8gICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGDjgI4ke2dfbWF6ZS5nZXRfbmFtZSgpfeOAjyBgIFxyXG4gICAgICAgICAgICAgICAgICAgICsgYOWcsOS4iyAke2dfdGVhbS53YWxrKCkuZ2V0X3BkKCkueiArIDF96ZqO5bGkIGAgXHJcbiAgICAgICAgICAgICAgICAgICAgKyBgKFg6ICR7Z190ZWFtLndhbGsoKS5nZXRfcGQoKS54fSwgWTogJHtnX3RlYW0uZ2V0X3BkKCkueX0pYCxcclxuICAgICAgICAvKiBhdXRvX21vZGU6ICovIHRydWUsXHJcbiAgICApO1xyXG4gICAgcmV0dXJuIFVEX3NhdmUoKTtcclxufVxyXG5cclxuXHJcblxyXG5cclxuXHJcbmZ1bmN0aW9uIHNldENhbnZhczNEQ2xpY2soKTogdm9pZCB7XHJcbiAgICBpZiAoZ19kcz8uY2FudmFzID09PSBudWxsKSAgICAgcmV0dXJuO1xyXG4gICAgZ19kcy5jYW52YXMub25jbGljayA9IGNhbnZhczNEY2xpY2s7XHJcbn1cclxuZnVuY3Rpb24gY2xyQ2FudmFzM0RDbGljaygpOiB2b2lkIHtcclxuICAgIGlmIChnX2RzPy5jYW52YXMgPT09IG51bGwpICAgICByZXR1cm47XHJcbiAgICBnX2RzLmNhbnZhcy5vbmNsaWNrID0gKCk9Pnt9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBjYW52YXMzRGNsaWNrKGV2OiBNb3VzZUV2ZW50KTogdm9pZCB7XHJcbiAgICBpZiAoZ19kcz8uY2FudmFzID09PSBudWxsKSAgICAgcmV0dXJuO1xyXG4gICAgaWYgKGV2LnRhcmdldCAhPT0gZ19kcy5jYW52YXMpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBjdnMgPSBnX2RzLmNhbnZhcztcclxuLy9kZWJ1ZyAgICBhbGVydChgeD0keyhldi5vZmZzZXRYPz8tMSl9LCB5PSR7KGV2Lm9mZnNldFk/Py0xKX1gKTtcclxuXHJcbiAgICBjb25zdCBsZWZ0X3BhbmVfciAgPSBjdnMuY2xpZW50V2lkdGggICogMC4zNTtcclxuICAgIGNvbnN0IHJnaHRfcGFuZV9sICA9IGN2cy5jbGllbnRXaWR0aCAgKiAwLjY1O1xyXG4gICAgY29uc3QgYmFja19wYW5lX3UgID0gY3ZzLmNsaWVudEhlaWdodCAqIDAuNTA7XHJcblxyXG4gICAgLy8g44Kt44Oj44Oz44OQ44K544Gu5bem5YG0XHJcbiAgICBpZiAoZXYub2Zmc2V0WCA8IGxlZnRfcGFuZV9yKSB7KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduX2J0bicpIGFzIEhUTUxCdXR0b25FbGVtZW50KT8uY2xpY2soKTsgcmV0dXJuO31cclxuICAgIC8vIOOCreODo+ODs+ODkOOCueOBruWPs+WBtFxyXG4gICAgaWYgKGV2Lm9mZnNldFggPiByZ2h0X3BhbmVfbCkgeyhkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgneV9idG4nKSBhcyBIVE1MQnV0dG9uRWxlbWVudCk/LmNsaWNrKCk7IHJldHVybjt9XHJcbiAgICAvL+OCreODo+ODs+ODkOOCueOBruS4reWkruS4iijliY3pgLIpXHJcbiAgICBpZiAoZXYub2Zmc2V0WSA8IGJhY2tfcGFuZV91KSB7KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1X2FycicpIGFzIEhUTUxCdXR0b25FbGVtZW50KT8uY2xpY2soKTsgcmV0dXJuO31cclxuICAgIC8vIOOCreODo+ODs+ODkOOCueOBruS4reWkruS4iyjlvozpgIApXHJcbiAgICAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RfYXJyJykgYXMgSFRNTEJ1dHRvbkVsZW1lbnQpPy5jbGljaygpOyByZXR1cm47XHJcbn1cclxuXHJcblxyXG5cclxuIiwiaW1wb3J0IHsgX2lzTnVtIH0gICAgICAgICAgZnJvbSBcIi4uL2RfdXRsL0ZfTWF0aFwiO1xuaW1wb3J0IHsgQ19DdGxDdXJzb3IgfSAgICAgZnJvbSBcIi4uL2RfY3RsL0NfQ3RsQ3Vyc29yXCI7XG5pbXBvcnQgeyBkb19tb3ZlX2JvdHRvbV9oYWxmLCBhY3RfbW92ZV9tb2RlIH0gZnJvbSBcIi4vRl9zZXRfbW92ZV9tb2RlXCI7XG5pbXBvcnQgeyBhY3RfbG9hZF9tb2RlLCBhY3Rfc2F2ZV9tb2RlICAgfSAgICAgZnJvbSBcIi4vRl9zZXRfc2F2ZV9tb2RlXCI7XG5pbXBvcnQgeyBhY3RfbXZwdF9tb2RlfSAgICAgICAgICAgICAgICAgICAgICAgZnJvbSBcIi4vRl9zZXRfbXZwdF9tb2RlXCI7XG5pbXBvcnQgeyBnX2N0bHMsIGdfY3ZtLCBnX3ZzdyB9ICAgICAgICAgICAgICAgZnJvbSBcIi4vZ2xvYmFsX2Zvcl9tYXplXCI7XG5cbmxldCAgIGRvbV9tZW51X2xpc3Q6ICBIVE1MVUxpc3RFbGVtZW50O1xubGV0ICAgbWVudV9saXN0X2Nyc3I6IENfQ3RsQ3Vyc29yO1xubGV0ICAgaWR4OiAgIG51bWJlciAgID0gICAwO1xuXG5jb25zdCBjdGxzX21lbnVfbm9yID0ge1xuICAgIG5hbWU6ICdtZW51X25vcicsIFxuICAgIGRvX1U6ICBkb19VLFxuICAgIGRvX0Q6ICBkb19ELFxuICAgIGlzT0s6ICBpc09LLFxuICAgIGlzTkc6ICBpc05HLFxuICAgIGlzUlQ6ICBpc05HLFxuICAgIGNwUlQ6ICBpc05HLFxufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5pdF9tZW51X21vZGUoKTogdm9pZCB7XG4gICAgaW5pdF92aWV3KCk7XG4gICAgaW5pdF9jdGxzKCk7XG59XG5leHBvcnQgZnVuY3Rpb24gYWN0X21lbnVfbW9kZSgpOiB2b2lkIHtcbiAgICBpZHggPSAwO1xuICAgIG1lbnVfbGlzdF9jcnNyLnNldF9wb3MoaWR4KTtcbiAgICBnX2N0bHMuYWN0KGN0bHNfbWVudV9ub3IpO1xuICAgIGdfdnN3LnZpZXcoZ192c3cuTWVudSgpKTsgXG59XG5cbmZ1bmN0aW9uIGluaXRfdmlldygpOiBib29sZWFuIHtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBtZW51X2xpc3QgICA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtZW51X2xpc3QnKSBhcyBIVE1MVUxpc3RFbGVtZW50O1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1lbnVfbGlzdC5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgaXRlbSA9IG1lbnVfbGlzdC5jaGlsZHJlbltpXSBhcyBIVE1MTElFbGVtZW50O1xuICAgICAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgX09LX21lbnVfRm5jLCBmYWxzZSk7XG4gICAgICAgIH1cblxuICAgICAgICBkb21fbWVudV9saXN0ICA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtZW51X2xpc3QnKSBhcyBIVE1MVUxpc3RFbGVtZW50O1xuICAgICAgICBtZW51X2xpc3RfY3JzciA9IENfQ3RsQ3Vyc29yLmdldE9iaihkb21fbWVudV9saXN0KTtcbiAgICB9IGNhdGNoKGVycikge1xuICAgICAgICBhbGVydCgnRXJyb3I6ICcgKyBlcnIpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xufVxuZnVuY3Rpb24gX09LX21lbnVfRm5jKHRoaXM6IEhUTUxMSUVsZW1lbnQsIGU6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICBfX2lzT0sodGhpcy5pZCk7XG59XG5cbmZ1bmN0aW9uIGluaXRfY3RscygpOiB2b2lkIHtcbiAgICBnX2N0bHMuc2V0KGN0bHNfbWVudV9ub3IpO1xufVxuXG5cbmZ1bmN0aW9uIGlzT0soKTogdm9pZCB7XG4gICAgY29uc3QgbWVudV9saXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21lbnVfbGlzdCcpIGFzIEhUTUxVTGlzdEVsZW1lbnQ7XG4gICAgaWYgKG1lbnVfbGlzdCA9PT0gbnVsbCkgcmV0dXJuO1xuXG4gICAgY29uc3QgY2hpbGRyZW4gPSBtZW51X2xpc3QuY2hpbGRyZW47XG4gICAgaWYgKGlkeCA8IDAgfHwgaWR4ID4gY2hpbGRyZW4ubGVuZ3RoIC0gMSkgcmV0dXJuO1xuXG4gICAgY29uc3QgbGkgPSBjaGlsZHJlbi5pdGVtKGlkeCkgYXMgSFRNTExJRWxlbWVudDtcbiAgICBfX2lzT0sobGkuaWQpO1xufVxuZnVuY3Rpb24gX19pc09LKGlkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBzd2l0Y2ggKGlkKSB7XG4gICAgICAgIGNhc2UgJ21lbnVfbG9hZCc6IGRvX2xvYWQoKTtyZXR1cm47XG4gICAgICAgIGNhc2UgJ21lbnVfc2F2ZSc6IGRvX3NhdmUoKTtyZXR1cm47XG4gICAgICAgIGNhc2UgJ21lbnVfbXZwdCc6IGRvX212cHQoKTtyZXR1cm47XG4gICAgfVxufVxuXG5mdW5jdGlvbiBpc05HKCk6IHZvaWQge1xuICAgIGdfY3ZtLmNsZWFyX21lc3NhZ2UoKTtcbiAgICBhY3RfbW92ZV9tb2RlKCk7XG4gICAgZG9fbW92ZV9ib3R0b21faGFsZignYmxpbmtfb2ZmJyk7XG59XG5cblxuZnVuY3Rpb24gZG9fVSgpOiB2b2lkIHtcbiAgICBnX2N2bS5jbGVhcl9tZXNzYWdlKCk7XG4gICAgaWR4ID0gbWVudV9saXN0X2Nyc3IucG9zX1UoKTtcbn1cblxuZnVuY3Rpb24gZG9fRCgpOiB2b2lkIHtcbiAgICBnX2N2bS5jbGVhcl9tZXNzYWdlKCk7XG4gICAgaWR4ID0gbWVudV9saXN0X2Nyc3IucG9zX0QoKTtcbn1cblxuZnVuY3Rpb24gZG9fbG9hZCgpOiB2b2lkIHtcbiAgICBhY3RfbG9hZF9tb2RlKCk7XG59XG5cbmZ1bmN0aW9uIGRvX3NhdmUoKTogdm9pZCB7XG4gICAgYWN0X3NhdmVfbW9kZSgpO1xufVxuXG5mdW5jdGlvbiBkb19tdnB0KCk6IHZvaWQge1xuICAgIGFjdF9tdnB0X21vZGUoKTtcbn1cbiIsIlxuICAgIC8qKioqKioqKioqKiogKioqKioqKioqKioqKioqKioqKioqKioqKioqICoqKioqKioqKioqKioqL1xuICAgIC8qICBIVE1MUHJlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ByZScpOyAgICAqL1xuICAgIC8qICBIVE1MRWxlbWVudD8uc2V0QXR0cmlidXRlKCdpZCcsICd1X2FycmF3Jyk7ICAgICAgICAqL1xuICAgIC8qICBIVE1MRWxlbWVudD8uc3R5bGUuc2V0UHJvcGVydHkoJ2Rpc3BsYXknLCAnZ3JpZCcpOyAqL1xuICAgIC8qICBIVE1MRWxlbWVudD8uYXBwZW5kQ2hpbGQoSFRNTEVsZW1lbnQpOyAgICAgICAgICAgICAqL1xuICAgIC8qKioqKioqKioqKiogKioqKioqKioqKioqKioqKioqKioqKioqKioqICoqKioqKioqKioqKioqL1xuXG5pbXBvcnQgeyBpbml0X21vdmVfbW9kZSB9IGZyb20gXCIuL0Zfc2V0X21vdmVfbW9kZVwiO1xuaW1wb3J0IHsgaW5pdF9tZW51X21vZGUgfSBmcm9tIFwiLi9GX3NldF9tZW51X21vZGVcIjtcbmltcG9ydCB7IGluaXRfbXZwdF9tb2RlIH0gZnJvbSBcIi4vRl9zZXRfbXZwdF9tb2RlXCI7XG5pbXBvcnQgeyBpbml0X1NMX21vZGUgfSAgIGZyb20gXCIuL0Zfc2V0X3NhdmVfbW9kZVwiO1xuaW1wb3J0IHsgaW5pdF9VRF9tb2RlIH0gICBmcm9tIFwiLi9GX3NldF9VRF9tb2RlXCI7XG5pbXBvcnQgeyBUX0N0bHNNb2RlIH0gICAgICAgICAgZnJvbSBcIi4vVF9DdGxzTW9kZVwiO1xuaW1wb3J0IHsgZ19jdGxzLCBnX2N0bHNfbW9kZSB9IGZyb20gXCIuL2dsb2JhbF9mb3JfbWF6ZVwiO1xuXG5leHBvcnQgZnVuY3Rpb24gaW5pdF9hbGxfbW9kZSgpOiB2b2lkIHtcbiAgICBnX2N0bHMuZGVhY3QoKTtcbiAgICBpbml0X21vdmVfbW9kZSgpO1xuICAgIGluaXRfbWVudV9tb2RlKCk7XG4gICAgaW5pdF9tdnB0X21vZGUoKTtcbiAgICBpbml0X1NMX21vZGUoKTtcbiAgICBpbml0X1VEX21vZGUoKVxufVxuZXhwb3J0IGZ1bmN0aW9uIGhpZGVfY29udHJvbGxlcygpOiB2b2lkIHtcbi8vICAgIGdfY3Rsc19tb2RlWzBdID0gVF9DdGxzTW9kZS5Ob3A7XG4gICAgZ19jdGxzLmRlYWN0KCk7XG4gICAgY29uc3QgbW92ZV9jdGxfdmlldyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwYW5lX2N0bHNfYm9hZCcpIGFzIEhUTUxFbGVtZW50O1xuICAgIG1vdmVfY3RsX3ZpZXc/LnN0eWxlLnNldFByb3BlcnR5KCdkaXNwbGF5JywgJ25vbmUnKTtcbn1cbiIsImltcG9ydCB7IFRfTXpLaW5kIH0gICAgICAgICAgICAgICAgICAgZnJvbSBcIi4uL2RfbWRsL1RfTXpLaW5kXCI7XHJcbmltcG9ydCB7IElfSG9wZUFjdGlvbiB9ICAgICAgICAgICAgICAgZnJvbSBcIi4uL2RfbWRsL0lfQ29tbW9uXCI7XHJcbmltcG9ydCB7IENfUG9pbnQgfSAgICAgICAgICAgICAgICAgICAgZnJvbSBcIi4uL2RfbWRsL0NfUG9pbnRcIjtcclxuaW1wb3J0IHsgZ19kZWJ1ZyB9ICAgICAgICAgICAgICAgICAgICBmcm9tIFwiLi4vZF9jbW4vZ2xvYmFsXCI7XHJcbmltcG9ydCB7IGluc3RhbnRfbG9hZCwgaW5zdGFudF9zYXZlIH0gZnJvbSBcIi4uL2RfY21uL0ZfbG9hZF9hbmRfc2F2ZVwiO1xyXG5pbXBvcnQgeyBhY3RfbWVudV9tb2RlIH0gICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSBcIi4vRl9zZXRfbWVudV9tb2RlXCI7XHJcbmltcG9ydCB7IGFjdF9VcF9tb2RlLCBhY3RfRG5fbW9kZSwgYWN0X1VEX21vZGUgfSBmcm9tIFwiLi9GX3NldF9VRF9tb2RlXCI7XHJcbmltcG9ydCB7IGRlY29kZV9hbGwsIHNldF9nX3NhdmUgfSAgICAgICAgICAgICAgICBmcm9tIFwiLi9GX3NldF9zYXZlX21vZGVcIjtcclxuaW1wb3J0IHsgZGlzcGxheV9tYXplQ2h9ICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gXCIuL0ZfZGlzcGxheV9tYXplQ2hcIjsgXHJcbmltcG9ydCB7IGRpc3BsYXlfbWF6ZTNELCBcclxuICAgICAgICAgbWF6ZTNEX2JsaW5rX29uX2RpcmVjdGlvbiwgbWF6ZTNEX2JsaW5rX29mZl9kaXJlY3Rpb24gfSAgIGZyb20gXCIuL0ZfZGlzcGxheV9tYXplM0RcIjtcclxuaW1wb3J0IHsgXHJcbiAgICBnX212bSwgXHJcbiAgICBnX3ZzdywgXHJcbiAgICBnX21hemUsIFxyXG4gICAgZ190ZWFtLFxyXG4gICAgZG9fbG9hZF9ib3R0b21faGFsZixcclxuICAgIGdfY3RscyxcclxuICAgIGdfZHMsIFxyXG59IGZyb20gXCIuL2dsb2JhbF9mb3JfbWF6ZVwiO1xyXG5cclxuY29uc3QgY3Rsc19tb3ZlX25vciA9IHtcclxuICAgIG5hbWU6ICdtb3ZlX25vcicsIFxyXG4gICAgZG9fVTogIGdvX0YsXHJcbiAgICBkb19EOiAgZ29fQixcclxuICAgIGRvVUw6ICBnb19MLFxyXG4gICAgZG9VUjogIGdvX1IsXHJcbiAgICBkb19MOiAgdHJfTCxcclxuICAgIGRvX1I6ICB0cl9SLFxyXG4gICAgbWVudTogIG1lbnUsXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpbml0X21vdmVfbW9kZSgpOiB2b2lkIHtcclxuICAgIGdfY3Rscy5zZXQoY3Rsc19tb3ZlX25vcik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhY3RfbW92ZV9tb2RlKCk6IHZvaWQge1xyXG4gICAgZ19jdGxzLmFjdChjdGxzX21vdmVfbm9yKTtcclxuICAgIGdfdnN3LnZpZXcoZ192c3cuTW92ZSgpKTtcclxuICAgIHNldENhbnZhczNEQ2xpY2soKTtcclxufVxyXG5cclxuXHJcbiAgICAvKioqKioqKioqKioqICoqKioqKioqKioqKioqKioqKioqKioqKioqKiAqKioqKioqKioqKioqKi9cclxuICAgIC8qICBIVE1MUHJlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ByZScpOyAgICAqL1xyXG4gICAgLyogIEhUTUxFbGVtZW50Py5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3VfYXJyYXcnKTsgICAgICAgICovXHJcbiAgICAvKiAgSFRNTEVsZW1lbnQ/LnN0eWxlLnNldFByb3BlcnR5KCdkaXNwbGF5JywgJ2dyaWQnKTsgKi9cclxuICAgIC8qICBIVE1MRWxlbWVudD8uYXBwZW5kQ2hpbGQoSFRNTEVsZW1lbnQpOyAgICAgICAgICAgICAqL1xyXG4gICAgLyoqKioqKioqKioqKiAqKioqKioqKioqKioqKioqKioqKioqKioqKiogKioqKioqKioqKioqKiovXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZG9faW5zdGFudF9sb2FkKCk6IHZvaWQge1xyXG4gICAgaW5zdGFudF9sb2FkKCkudGhlbigoanNvbk9iajphbnkpPT57ICBcclxuICAgICAgICBkZWNvZGVfYWxsKGpzb25PYmo/LnNhdmUpO1xyXG4gICAgICAgIGRvX2xvYWRfYm90dG9tX2hhbGYoJ+ODreODvOODieOBl+OBvuOBl+OBnycpOyAgXHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGRvX2luc3RhbnRfc2F2ZSgpOiB2b2lkIHtcclxuICAgIHNldF9nX3NhdmUoXHJcbiAgICAgICAgLyogc2F2ZV9pZDogKi8gICAtMSxcclxuICAgICAgICAvKiB1bmlxX25vOiAqLyAgIC0xLFxyXG4gICAgICAgIC8qIHRpdGxlOiAqLyAgICAgJ+ewoeaYk+S/neWtmOODh+ODvOOCvycsIFxyXG4gICAgICAgIC8qIGRldGFpbDogKi8gICAgJycsIFxyXG4gICAgICAgICAgICAgICAgICAgIGDjgI4ke2dfbWF6ZS5nZXRfbmFtZSgpfeOAjyBgIFxyXG4gICAgICAgICAgICAgICAgICAgICsgYOWcsOS4iyAke2dfdGVhbS5nZXRfcGQoKS56ICsgMX3pmo7lsaQgYCBcclxuICAgICAgICAgICAgICAgICAgICArIGAoWDogJHtnX3RlYW0uZ2V0X3BkKCkueH0sIFk6ICR7Z190ZWFtLmdldF9wZCgpLnl9KWAsXHJcbiAgICAgICAgLyogYXV0b19tb2RlOiAqLyB0cnVlLFxyXG4gICAgKTtcclxuICAgIGluc3RhbnRfc2F2ZSgpO1xyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gY2xlYXJfbWFza19hcm91bmRfdGhlX3RlYW0oKTogdm9pZCB7XHJcbiAgICBnX21hemUuY2xlYXJfbWFza19hcm91bmRfdGhlX3RlYW0oZ190ZWFtKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY2hhbmdlX3VuZXhwX3RvX2Zsb29yKHA6IENfUG9pbnQpOiB2b2lkIHtcclxuICAgIGdfbWF6ZS5jaGFuZ2VfdW5leHBfdG9fZmxvb3IocCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdvX0YoKTogdm9pZCB7XHJcbiAgICBjb25zdCByc2x0ID0gZ190ZWFtLndhbGsoKS5ob3BlX3BfZndkKCk7XHJcbiAgICBtb3ZlX2NoZWNrKHJzbHQpO1xyXG4gICAgZG9fbW92ZV9ib3R0b21faGFsZignYmxpbmtfb24nKTtcclxufVxyXG5mdW5jdGlvbiBnb19CKCk6IHZvaWQge1xyXG4gICAgY29uc3QgcnNsdCA9IGdfdGVhbS53YWxrKCkuaG9wZV9wX2JhaygpO1xyXG4gICAgbW92ZV9jaGVjayhyc2x0KTtcclxuICAgIGRvX21vdmVfYm90dG9tX2hhbGYoJ2JsaW5rX29uJyk7XHJcbn1cclxuZnVuY3Rpb24gZ29fTCgpOiB2b2lkIHtcclxuICAgIGNvbnN0IHJzbHQgPSBnX3RlYW0ud2FsaygpLmhvcGVfcF9sZnQoKTtcclxuICAgIG1vdmVfY2hlY2socnNsdCk7XHJcbiAgICBkb19tb3ZlX2JvdHRvbV9oYWxmKCdibGlua19vbicpO1xyXG59XHJcbmZ1bmN0aW9uIGdvX1IoKTogdm9pZCB7XHJcbiAgICBjb25zdCByc2x0ID0gZ190ZWFtLndhbGsoKS5ob3BlX3Bfcmd0KCk7XHJcbiAgICBtb3ZlX2NoZWNrKHJzbHQpO1xyXG4gICAgZG9fbW92ZV9ib3R0b21faGFsZignYmxpbmtfb24nKTtcclxufVxyXG5mdW5jdGlvbiB0cl9SKCk6IHZvaWQge1xyXG4gICAgY29uc3QgcnNsdCA9IGdfdGVhbS53YWxrKCkuaG9wZV90dXJuX3IoKTtcclxuICAgIG1vdmVfY2hlY2socnNsdCk7XHJcbiAgICBkb19tb3ZlX2JvdHRvbV9oYWxmKCdibGlua19vZmYnKTtcclxufVxyXG5mdW5jdGlvbiB0cl9MKCk6IHZvaWQge1xyXG4gICAgY29uc3QgcnNsdCA9IGdfdGVhbS53YWxrKCkuaG9wZV90dXJuX2woKTtcclxuICAgIG1vdmVfY2hlY2socnNsdCk7XHJcbiAgICBkb19tb3ZlX2JvdHRvbV9oYWxmKCdibGlua19vZmYnKTtcclxufVxyXG5mdW5jdGlvbiBtb3ZlX2NoZWNrKHI6IElfSG9wZUFjdGlvbik6IHZvaWQge1xyXG4gICAgZ19tdm0uY2xlYXJfbWVzc2FnZSgpO1xyXG4gICAgLy8g5ZGo5Zuy44Gr44Kq44OW44K444Kn44GM5pyJ44KM44Gw44Kq44OW44K444Kn5o6l6L+R5Yem55CGXHJcbiAgICBhcm91bmRfb2JqKHIpO1xyXG5cclxuICAgIGlmICghci5oYXNfaG9wZSkgcmV0dXJuO1xyXG4gICAgaWYgKHIuaG9wZSA9PSAnVHVybicpIHtcclxuICAgICAgICByLmRvT0soKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAoci5ob3BlID09ICdNb3ZlJykge1xyXG4gICAgICAgIGNvbnN0IGNlbGwgPSBnX21hemUuZ2V0X2NlbGwoci5zdWJqKTtcclxuXHJcbiAgICAgICAgLy8g6YCy6KGM5pa55ZCR44GM5aOB562J44Gq44KJ56e75YuV5LiN5Y+vXHJcbiAgICAgICAgaWYgKCFjZWxsPy5nZXRPYmooKS5jYW5UaHJvdWdoKCkpIHtcclxuICAgICAgICAgICAgZG9udF9tb3ZlKHIpO3JldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3Qgb2JqID0gZ19tYXplLmdldF9vYmooci5zdWJqKTtcclxuICAgICAgICBpZiAob2JqICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGlmIChvYmouY2FuVGhyb3VnaCgpKSB7XHJcbiAgICAgICAgICAgICAgICAvLyDpgLLooYzmlrnlkJHjgavjgqrjg5bjgrjjgqfjgYzmnInjgorpgJrjgormipzjgZHlj6/og73jgarjgolcclxuICAgICAgICAgICAgICAgIC8vIOenu+WLleOBl+OBpuOCquODluOCuOOCp+WHpueQhlxyXG4gICAgICAgICAgICAgICAgci5kb09LKCk7XHJcbiAgICAgICAgICAgICAgICBhY3Rpb25fb2JqKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyDpgLLooYzmlrnlkJHjgavjgqrjg5bjgrjjgqfjgYzmnInjgorpgJrjgormipzjgZHkuI3og73jgarjgolcclxuICAgICAgICAgICAgICAgIC8vIOenu+WLleOBm+OBmuOBq+OCquODluOCuOOCp+aOpei/keWHpueQhijku6XpmY3jga7pmo7mrrXlh6bnkIbnrYnjga/jgrnjg6vjg7wpXHJcbiAgICAgICAgICAgICAgICBkb250X21vdmUocik7XHJcbiAgICAgICAgICAgICAgICBhcm91bmRfb2JqKHIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8g6YCy6KGM5pa55ZCR44Gr44Kq44OW44K444Kn44GM54Sh44GR44KM44Gw56e75YuVXHJcbiAgICAgICAgICAgIHIuZG9PSygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDnp7vli5XlhYjjgYzpmo7mrrXjgarjgonpmo7mrrXjga7lh6bnkIZcclxuICAgICAgICBjb25zdCBraW5kID0gY2VsbD8uZ2V0S2luZCgpO1xyXG4gICAgICAgIHN3aXRjaCAoa2luZCkge1xyXG4gICAgICAgICAgICBjYXNlIFRfTXpLaW5kLlN0clVwOlxyXG4gICAgICAgICAgICBjYXNlIFRfTXpLaW5kLlN0ckRuOlxyXG4gICAgICAgICAgICBjYXNlIFRfTXpLaW5kLlN0clVEOlxyXG4gICAgICAgICAgICAgICAgZG9fc3RhaXJzX21vdGlvbihraW5kKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG59IFxyXG5mdW5jdGlvbiBkb250X21vdmUocjogSV9Ib3BlQWN0aW9uKTogdm9pZCB7XHJcbiAgICBnX212bS5ub3JtYWxfbWVzc2FnZSgn6YCy44KB44Gq44GE77yB77yI56yR77yJJyk7XHJcbiAgICByLmRvTkcoKTtcclxuICAgIHJldHVybjtcclxufVxyXG4vLyDjgqrjg5bjgrjjgqfmjqXov5Hlh6bnkIZcclxuZnVuY3Rpb24gYXJvdW5kX29iaihyOiBJX0hvcGVBY3Rpb24pOiB2b2lkIHt9IFxyXG4vLyDjgqrjg5bjgrjjgqflh6bnkIZcclxuZnVuY3Rpb24gYWN0aW9uX29iaigpOiB2b2lkIHt9XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZG9fbW92ZV9ib3R0b21faGFsZihibGlua19tb2RlOiBzdHJpbmcpOiB2b2lkIHsgICAvL2FsZXJ0KCdGbG9vcj8gPSAnICsgZ190ZWFtLmdldF9wKCkueik7XHJcbiAgICBjaGFuZ2VfdW5leHBfdG9fZmxvb3IoZ190ZWFtLmdldF9wZCgpKTtcclxuICAgIGRpc3BsYXlfbWF6ZTNEKCk7XHJcbiAgICBkaXNwbGF5X21hemVfbmFtZSgpO1xyXG4gICAgaWYgKGJsaW5rX21vZGUgPT09ICdibGlua19vbicpIG1hemUzRF9ibGlua19vbl9kaXJlY3Rpb24oKTtcclxuICAgIGVsc2UgbWF6ZTNEX2JsaW5rX29mZl9kaXJlY3Rpb24oKTtcclxuICAgIGlmICghbWFza19jbGVhcmVkKCkpIHtcclxuICAgICAgICBjbGVhcl9tYXNrX2Fyb3VuZF90aGVfdGVhbSgpOyBcclxuICAgICAgICBpZiAobWFza19jbGVhcmVkKCkpIGFsZXJ0KCfjgZPjga7pmo7jgpLliLbopofjgZfjgb7jgZfjgZ/vvIHvvIEnKSAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbiAgICB9XHJcbiAgICBkaXNwbGF5X21hemVDaCgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBtYXNrX2NsZWFyZWQoKTogYm9vbGVhbiB7cmV0dXJuIGdfbWF6ZS5pc19jbGVhcmVkKGdfdGVhbS5nZXRfcGQoKSl9XHJcblxyXG5mdW5jdGlvbiBkaXNwbGF5X21hemVfbmFtZSgpOiB2b2lkIHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgcCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXplX3ZpZXczRF9tYXplX25hbWVfaW5mbycpIGFzIEhUTUxQYXJhZ3JhcGhFbGVtZW50O1xyXG4gICAgICAgIHAuaW5uZXJIVE1MID0gZ19tYXplLmdldF9uYW1lKCk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHt9O1xyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gc2V0Q2FudmFzM0RDbGljaygpOiB2b2lkIHtcclxuICAgIGlmIChnX2RzPy5jYW52YXMgPT09IG51bGwpICAgICByZXR1cm47XHJcbiAgICBnX2RzLmNhbnZhcy5vbmNsaWNrID0gY2FudmFzM0RjbGljaztcclxufVxyXG5mdW5jdGlvbiBjbHJDYW52YXMzRENsaWNrKCk6IHZvaWQge1xyXG4gICAgaWYgKGdfZHM/LmNhbnZhcyA9PT0gbnVsbCkgICAgIHJldHVybjtcclxuICAgIGdfZHMuY2FudmFzLm9uY2xpY2sgPSAoKT0+e307XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNhbnZhczNEY2xpY2soZXY6IE1vdXNlRXZlbnQpOiB2b2lkIHtcclxuICAgIGlmIChnX2RzPy5jYW52YXMgPT09IG51bGwpICAgICByZXR1cm47XHJcbiAgICBpZiAoZXYudGFyZ2V0ICE9PSBnX2RzLmNhbnZhcykgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IGN2cyA9IGdfZHMuY2FudmFzO1xyXG4vL2RlYnVnICAgIGFsZXJ0KGB4PSR7KGV2Lm9mZnNldFg/Py0xKX0sIHk9JHsoZXYub2Zmc2V0WT8/LTEpfWApO1xyXG5cclxuICAgIGNvbnN0IGxlZnRfcGFuZV9yICA9IGN2cy5jbGllbnRXaWR0aCAgKiAwLjI1O1xyXG4gICAgY29uc3QgcmdodF9wYW5lX2wgID0gY3ZzLmNsaWVudFdpZHRoICAqIDAuNzU7XHJcbiAgICBjb25zdCBiYWNrX3BhbmVfdSAgPSBjdnMuY2xpZW50SGVpZ2h0ICogMC44MDtcclxuXHJcbiAgICAvLyDjgq3jg6Pjg7Pjg5Djgrnjga7lt6blgbRcclxuICAgIGlmIChldi5vZmZzZXRYIDwgbGVmdF9wYW5lX3IpIHsoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xfYXJyJykgYXMgSFRNTEJ1dHRvbkVsZW1lbnQpPy5jbGljaygpOyByZXR1cm47fVxyXG4gICAgLy8g44Kt44Oj44Oz44OQ44K544Gu5Y+z5YG0XHJcbiAgICBpZiAoZXYub2Zmc2V0WCA+IHJnaHRfcGFuZV9sKSB7KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyX2FycicpIGFzIEhUTUxCdXR0b25FbGVtZW50KT8uY2xpY2soKTsgcmV0dXJuO31cclxuICAgIC8v44Kt44Oj44Oz44OQ44K544Gu5Lit5aSu5LiKKOWJjemAsilcclxuICAgIGlmIChldi5vZmZzZXRZIDwgYmFja19wYW5lX3UpIHsoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VfYXJyJykgYXMgSFRNTEJ1dHRvbkVsZW1lbnQpPy5jbGljaygpOyByZXR1cm47fVxyXG4gICAgLy8g44Kt44Oj44Oz44OQ44K544Gu5Lit5aSu5LiLKOW+jOmAgClcclxuICAgIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZF9hcnInKSBhcyBIVE1MQnV0dG9uRWxlbWVudCk/LmNsaWNrKCk7IHJldHVybjtcclxufVxyXG5cclxuXHJcblxyXG5mdW5jdGlvbiBkb19zdGFpcnNfbW90aW9uKGtpbmQ6IFRfTXpLaW5kKTogdm9pZCB7XHJcbiAgICBzd2l0Y2ggKGtpbmQpIHtcclxuICAgICAgICBjYXNlIFRfTXpLaW5kLlN0clVwOlxyXG4gICAgICAgICAgICBjbHJDYW52YXMzRENsaWNrKCk7XHJcbiAgICAgICAgICAgIGFjdF9VcF9tb2RlKCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgVF9NektpbmQuU3RyRG46XHJcbiAgICAgICAgICAgIGNsckNhbnZhczNEQ2xpY2soKTtcclxuICAgICAgICAgICAgYWN0X0RuX21vZGUoKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBUX016S2luZC5TdHJVRDpcclxuICAgICAgICAgICAgY2xyQ2FudmFzM0RDbGljaygpO1xyXG4gICAgICAgICAgICBhY3RfVURfbW9kZSgpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgIH1cclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIG1lbnUoKTogdm9pZCB7XHJcbiAgICBjbHJDYW52YXMzRENsaWNrKCk7XHJcbiAgICBnX212bS5jbGVhcl9tZXNzYWdlKCk7XHJcbiAgICBhY3RfbWVudV9tb2RlKCk7XHJcbn1cclxuIiwiaW1wb3J0IHsgYWN0X21lbnVfbW9kZSB9ICAgICAgIGZyb20gXCIuL0Zfc2V0X21lbnVfbW9kZVwiO1xuaW1wb3J0IHsgZ19jdGxzLCBnX21hemUsIGdfY3ZtLCBnX3RlYW0sIGdfdnN3IH0gZnJvbSBcIi4vZ2xvYmFsX2Zvcl9tYXplXCI7XG5cbmltcG9ydCB7IENfVXJsT3B0IH0gICAgICAgICAgICBmcm9tIFwiLi4vZF91dGwvQ19VcmxPcHRcIjtcbmltcG9ydCB7IHRtcF9zYXZlIH0gICAgICAgICAgICBmcm9tIFwiLi4vZF9jbW4vRl9sb2FkX2FuZF9zYXZlXCI7XG5pbXBvcnQgeyBQT1NUX2FuZF9tb3ZlX3BhZ2UgfSAgZnJvbSBcIi4uL2RfY21uL0ZfUE9TVFwiO1xuaW1wb3J0IHsgZ19teV91cmwsIGdfc2F2ZSwgZ19zdGFydF9lbnYsIGdfdXJsLCBnX3VybF9tYWlfZ3VsZCB9IGZyb20gXCIuLi9kX2Ntbi9nbG9iYWxcIjtcblxubGV0IG1vZGU6IHN0cmluZztcblxuY29uc3QgY3Rsc19tdnB0X25vciA9IHtcbiAgICBuYW1lOiAnbXZwdF9ub3InLCBcbiAgICBpc09LOiAgaXNPSyxcbiAgICBpc05HOiAgaXNORyxcbiAgICBjcE9LOiAgaXNPSyxcbiAgICBjcE5HOiAgaXNORyxcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluaXRfbXZwdF9tb2RlKCk6IHZvaWQge1xuICAgIGdfY3Rscy5zZXQoY3Rsc19tdnB0X25vcik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhY3RfbXZwdF9tb2RlKCk6IHZvaWQge1xuICAgIG1vZGUgPSAnY2hlayc7XG4gICAgZ19jdm0ubm90aWNlX21lc3NhZ2UoJ+acrOW9k+OBq+ihl+OBuOaIu+OCiuOBvuOBmeOBi++8n+OBk+OBruWgtOaJgOOBq+OBr+OCruODq+ODieOBi+OCieW+qeW4sOOBp+OBjeOBvuOBmScpO1xuICAgIGdfY3Rscy5hY3QoY3Rsc19tdnB0X25vcik7XG4gICAgZ192c3cudmlldyhnX3Zzdy5NdlB0KCkpO1xufVxuXG5mdW5jdGlvbiBpc09LKCk6IHZvaWQge1xuICAgIHN3aXRjaChtb2RlKSB7XG4gICAgICAgIGNhc2UgJ3ZpZXcnOlxuICAgICAgICAgICAgZ19jdm0ubm90aWNlX21lc3NhZ2UoJ+acrOW9k+OBq+ihl+OBuOaIu+OCiuOBvuOBmeOBi++8n+OBk+OBruWgtOaJgOOBq+OBr+OCruODq+ODieOBi+OCieW+qeW4sOOBp+OBjeOBvuOBmScpO1xuICAgICAgICAgICAgbW9kZSA9ICdjaGVrJztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdjaGVrJzpcbiAgICAgICAgICAgIGdfY3ZtLm5vdGljZV9tZXNzYWdlKCfooZfjgbjmiLvjgorjgb7jgZfjgZ8nKTtcbiAgICAgICAgICAgIG1vZGUgPSAndmlldyc7XG5cbiAgICAgICAgICAgIGNvbnN0IG12cHQgPSBnX3RlYW0uZ2V0X2xvYygpLmNsb25lKCk7XG4gICAgICAgICAgICBtdnB0LnNldF91cmwoZ19teV91cmwpO1xuICAgICAgICAgICAgbXZwdC5zZXRfdGlkKGdfdGVhbS51aWQoKSk7XG4gICAgICAgICAgICBtdnB0LnNldF91aWQoZ19tYXplLnVpZCgpKTtcblxuICAgICAgICAgICAgZ19zYXZlLmFsbF9tdnB0W212cHQudWlkKCldICAgPSBtdnB0O1xuICAgICAgICAgICAgZ19zYXZlLmFsbF9tYXplW2dfbWF6ZS51aWQoKV0gPSBnX21hemU7XG5cbiAgICAgICAgICAgIHRtcF9zYXZlKCkudGhlbigoKT0+e1xuICAgICAgICAgICAgICAgIGNvbnN0IG9wdCA9IG5ldyBDX1VybE9wdCgpO1xuICAgICAgICAgICAgICAgIG9wdC5zZXQoJ21vZGUnLCAnbG9hZCcpO1xuICAgICAgICAgICAgICAgIG9wdC5zZXQoJ3BpZCcsICAgZ19zdGFydF9lbnYucGlkKTtcbiAgICAgICAgICAgICAgICBvcHQuc2V0KCdvcHQnLCAgIDEwMCk7XG4gICAgICAgICAgICAgICAgUE9TVF9hbmRfbW92ZV9wYWdlKGdfdXJsW2dfdXJsX21haV9ndWxkXSwgb3B0KTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBcbn1cblxuZnVuY3Rpb24gaXNORygpOiB2b2lkIHtcbiAgICBzd2l0Y2gobW9kZSkge1xuICAgICAgICBjYXNlICdjaGVrJzpcbiAgICAgICAgICAgIGdfY3ZtLmNsZWFyX21lc3NhZ2UoKTtcbiAgICAgICAgICAgIGFjdF9tZW51X21vZGUoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IF9yb3VuZCB9ICAgICAgICAgICAgICBmcm9tIFwiLi4vZF91dGwvRl9NYXRoXCI7XHJcbmltcG9ydCB7IENfVXJsT3B0IH0gICAgICAgICAgICBmcm9tIFwiLi4vZF91dGwvQ19VcmxPcHRcIjtcclxuaW1wb3J0IHsgVF9MY2tkIH0gICAgICAgICAgICAgIGZyb20gXCIuLi9kX21kbC9DX0xvY2F0aW9uXCI7XHJcbmltcG9ydCB7IENfUG9pbnREaXIgfSAgICAgICAgICBmcm9tIFwiLi4vZF9tZGwvQ19Qb2ludERpclwiO1xyXG5pbXBvcnQgeyBJX01hemVPYmogIH0gICAgICAgICAgZnJvbSBcIi4uL2RfbWRsL0NfTWF6ZU9ialwiO1xyXG5pbXBvcnQgeyBDX1NhdmVEYXRhIH0gICAgICAgICAgZnJvbSBcIi4uL2RfbWRsL0NfU2F2ZURhdGFcIjtcclxuaW1wb3J0IHsgQ19DdGxDdXJzb3IgfSAgICAgICAgIGZyb20gXCIuLi9kX2N0bC9DX0N0bEN1cnNvclwiO1xyXG5pbXBvcnQgeyBQT1NUX2FuZF9tb3ZlX3BhZ2UgfSAgZnJvbSBcIi4uL2RfY21uL0ZfUE9TVFwiO1xyXG5pbXBvcnQgeyBnZW5lcmFsX2xvYWQsIGdlbmVyYWxfc2F2ZSwgZ2V0X3NhdmVfaW5mbyB9ICAgIGZyb20gXCIuLi9kX2Ntbi9GX2xvYWRfYW5kX3NhdmVcIjtcclxuaW1wb3J0IHsgX2FsZXJ0LCBnX21lcywgZ19teV91cmwsIGdfc2F2ZSwgZ19zdGFydF9lbnYgfSBmcm9tIFwiLi4vZF9jbW4vZ2xvYmFsXCI7XHJcbmltcG9ydCB7IGFjdF9tZW51X21vZGUgfSAgICAgICBmcm9tIFwiLi9GX3NldF9tZW51X21vZGVcIjtcclxuaW1wb3J0IHsgYWN0X21vdmVfbW9kZSwgZG9fbW92ZV9ib3R0b21faGFsZiB9IGZyb20gXCIuL0Zfc2V0X21vdmVfbW9kZVwiO1xyXG5pbXBvcnQgeyBcclxuICAgIGdfY3RscyxcclxuICAgIGdfY3ZtLCBcclxuICAgIGdfbXZtLCBcclxuICAgIGdfdnN3LCBcclxuICAgIGdfbWF6ZSwgXHJcbiAgICBnX3RlYW0sIFxyXG4gICAgZ19ocmVzLCBcclxufSBmcm9tIFwiLi9nbG9iYWxfZm9yX21hemVcIjtcclxuaW1wb3J0IHsgVF9DdGxzIH0gZnJvbSBcIi4vQ19EZWZhdWx0Q3Rsc1wiO1xyXG5pbXBvcnQgeyBDX1NhdmVJbmZvIH0gZnJvbSBcIi4uL2RfbWRsL0NfU2F2ZUluZm9cIjtcclxuXHJcbmxldCAgIGZvcl9zYXZlOiBib29sZWFuICA9IGZhbHNlO1xyXG5cclxubGV0ICAgVUxfaWR4OiBudW1iZXIgPSAgIDA7XHJcbmxldCAgIFVMX2JhazogbnVtYmVyID0gOTk5O1xyXG5cclxubGV0ICAgc2F2ZV9VTF9saXN0OiAgSFRNTFVMaXN0RWxlbWVudDtcclxubGV0ICAgVUxfbGlzdF9jcnNyOiAgQ19DdGxDdXJzb3I7XHJcbmxldCAgIFVMX2xpc3RfbGVuZzogIG51bWJlcjtcclxuXHJcbmxldCAgIFVMX3RvX0RhdGE6ICAgICAgIHtbVUxfaWR4OiBudW1iZXJdOiAvKiBkYXRhX2lkeDogKi8gbnVtYmVyfVxyXG5cclxubGV0ICAgZm9ybV9pZDogICAgICAgICAgSFRNTElucHV0RWxlbWVudDtcclxubGV0ICAgZm9ybV90aW1lOiAgICAgICAgSFRNTFBhcmFncmFwaEVsZW1lbnQ7XHJcbmxldCAgIGZvcm1fZGV0YWlsOiAgICAgIEhUTUxUZXh0QXJlYUVsZW1lbnQ7XHJcbmxldCAgIGZvcm1fcG9pbnQ6ICAgICAgIEhUTUxQYXJhZ3JhcGhFbGVtZW50O1xyXG5cclxubGV0ICAgaXNfa2FrdW5pbiA9IGZhbHNlO1xyXG5cclxuZXhwb3J0IHR5cGUgVF9zYXZlX2xpc3QgPSB7XHJcbiAgICBzYXZlX2lkOiAgIG51bWJlcixcclxuICAgIHVuaXFfbm86ICAgbnVtYmVyLFxyXG4gICAgdGl0bGU6ICAgICBzdHJpbmcsXHJcbiAgICBkZXRhaWw6ICAgIHN0cmluZyxcclxuICAgIHNjZW5lOiAgICAgc3RyaW5nLFxyXG4gICAgcG9pbnQ6ICAgICBzdHJpbmcsXHJcbiAgICBzYXZlX3RpbWU6IHN0cmluZyxcclxuICAgIGF1dG9fbW9kZTogc3RyaW5nLFxyXG4gICAgX19pc19uZXc6ICBib29sZWFuLFxyXG59XHJcblxyXG5sZXQgICBzYXZlX2xpc3Q6ICAgICAgICB7W3VuaXFfbm86IG51bWJlcl06IENfU2F2ZUluZm99O1xyXG5jb25zdCBzYXZlX2xpc3RfbWF4ID0gMjA7XHJcblxyXG5jb25zdCBjdGxzX2xvYWRfcnRuID0ge1xyXG4gICAgbmFtZTogJ2xvYWRfcnRuJywgXHJcbiAgICBpc05HOiAgZ29fYmFja19tZW51X21vZGUsXHJcbiAgICBpc1JUOiAgZ29fYmFja19tZW51X21vZGUsXHJcbiAgICBjcFJUOiAgZ29fYmFja19tZW51X21vZGUsXHJcbn1cclxuY29uc3QgY3Rsc19sb2FkX25vciA9IHtcclxuICAgIG5hbWU6ICdsb2FkX25vcicsIFxyXG4gICAgZG9fVTogIGRvX1UsXHJcbiAgICBkb19EOiAgZG9fRCxcclxuICAgIGRvX0w6ICBkb19MLFxyXG4gICAgZG9fUjogIGRvX1IsXHJcbiAgICBpc09LOiAgY2hlY2tfbG9hZCxcclxuICAgIGNwT0s6ICBjaGVja19sb2FkLFxyXG4gICAgaXNORzogIGdvX2JhY2tfbWVudV9tb2RlLFxyXG4gICAgaXNSVDogIGdvX2JhY2tfbWVudV9tb2RlLFxyXG4gICAgY3BSVDogIGdvX2JhY2tfbWVudV9tb2RlLFxyXG59XHJcbmNvbnN0IGN0bHNfbG9hZF9jaGsgPSB7XHJcbiAgICBuYW1lOiAnbG9hZF9jaGsnLCBcclxuICAgIGRvX1U6ICBkb19VLFxyXG4gICAgZG9fRDogIGRvX0QsXHJcbiAgICBkb19MOiAgZG9fTCxcclxuICAgIGRvX1I6ICBkb19SLFxyXG4gICAgaXNPSzogIGlzT0tfZm9yX2xvYWQsXHJcbiAgICBjcE9LOiAgaXNPS19mb3JfbG9hZCxcclxuICAgIGlzTkc6ICBpc05HX2Zvcl9sb2FkLFxyXG4gICAgY3BORzogIGlzTkdfZm9yX2xvYWQsXHJcbiAgICBpc1JUOiAgZ29fYmFja19tZW51X21vZGUsXHJcbiAgICBjcFJUOiAgZ29fYmFja19tZW51X21vZGUsXHJcbn1cclxuY29uc3QgY3Rsc19zYXZlX25vciA9IHtcclxuICAgIG5hbWU6ICdzYXZlX25vcicsIFxyXG4gICAgZG9fVTogIGRvX1UsXHJcbiAgICBkb19EOiAgZG9fRCxcclxuICAgIGRvX0w6ICBkb19MLFxyXG4gICAgZG9fUjogIGRvX1IsXHJcbiAgICBpc09LOiAgY2hlY2tfc2F2ZSxcclxuICAgIGNwT0s6ICBjaGVja19zYXZlLFxyXG4gICAgaXNORzogIGdvX2JhY2tfbWVudV9tb2RlLFxyXG4gICAgaXNSVDogIGdvX2JhY2tfbWVudV9tb2RlLFxyXG4gICAgY3BSVDogIGdvX2JhY2tfbWVudV9tb2RlLFxyXG59XHJcbmNvbnN0IGN0bHNfc2F2ZV9jaGsgPSB7XHJcbiAgICBuYW1lOiAnc2F2ZV9jaGsnLCBcclxuICAgIGRvX1U6ICBkb19VLFxyXG4gICAgZG9fRDogIGRvX0QsXHJcbiAgICBkb19MOiAgZG9fTCxcclxuICAgIGRvX1I6ICBkb19SLFxyXG4gICAgaXNPSzogIGlzT0tfZm9yX3NhdmUsXHJcbiAgICBjcE9LOiAgaXNPS19mb3Jfc2F2ZSxcclxuICAgIGlzTkc6ICBpc05HX2Zvcl9zYXZlLFxyXG4gICAgY3BORzogIGlzTkdfZm9yX3NhdmUsXHJcbiAgICBpc1JUOiAgZ29fYmFja19tZW51X21vZGUsXHJcbiAgICBjcFJUOiAgZ29fYmFja19tZW51X21vZGUsXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpbml0X1NMX21vZGUoKTogdm9pZCB7XHJcbiAgICBpbml0X3ZpZXcoKTtcclxuICAgIGluaXRfY3RscygpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYWN0X2xvYWRfbW9kZSgpOiB2b2lkIHtcclxuICAgIF9fc2V0X2RhdGEoZmFsc2UpLnRoZW4oKCk9PntcclxuICAgICAgICBpZiAoIWV4aXN0X3NhdmVfbGlzdCgpKSB7XHJcbiAgICAgICAgICAgIGhpZGVfbG9hZF9maWVsZHMoKTtcclxuICAgICAgICAgICAgZ19jdm0ubm90aWNlX21lc3NhZ2UoJ+ODreODvOODieOBp+OBjeOCi+ODh+ODvOOCv+OBjOacieOCiuOBvuOBm+OCkycpO1xyXG4gICAgICAgICAgICBnX2N0bHMuYWN0KGN0bHNfbG9hZF9ydG4pO1xyXG4gICAgICAgICAgICBnX3Zzdy52aWV3KGdfdnN3Lk1vdmUoKSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzaG93X2xvYWRfZmllbGRzKCk7XHJcbiAgICAgICAgICAgIGRpc3BsYXlfbWVzc2FnZSgpO1xyXG4gICAgICAgICAgICBnX2N0bHMuYWN0KGN0bHNfbG9hZF9ub3IpO1xyXG4gICAgICAgICAgICBnX3Zzdy52aWV3KGdfdnN3LkxkU3YoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGFjdF9zYXZlX21vZGUoKTogdm9pZCB7XHJcbiAgIF9fc2V0X2RhdGEodHJ1ZSkudGhlbigoKT0+e1xyXG4gICAgICAgIGRpc3BsYXlfbWVzc2FnZSgpO1xyXG4gICAgICAgIGdfY3Rscy5hY3QoY3Rsc19zYXZlX25vcik7XHJcbiAgICAgICAgZ192c3cudmlldyhnX3Zzdy5MZFN2KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIF9fc2V0X2RhdGEoX2Zvcl9zYXZlOiBib29sZWFuKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICBmb3Jfc2F2ZSA9IF9mb3Jfc2F2ZTsgLy8gdHJ1ZTogRm9yIFNhdmUuXHJcblxyXG4gICAgZ19jdm0uY2xlYXJfbWVzc2FnZSgpO1xyXG4gICAgaXNfa2FrdW5pbiA9IGZhbHNlO1xyXG4gICAgYXdhaXQgZGlzcGxheV9zYXZlX2xpc3QoKTsgXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGhpZGVfbG9hZF9maWVsZHMoKTogdm9pZCB7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGRzdl9kYXRhX2xpc3QnKSAgPy5zdHlsZS5zZXRQcm9wZXJ0eSgnZGlzcGxheScsICdub25lJyk7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGRzdl9kYXRhX2ZpZWxkcycpPy5zdHlsZS5zZXRQcm9wZXJ0eSgnZGlzcGxheScsICdub25lJyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNob3dfbG9hZF9maWVsZHMoKTogdm9pZCB7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGRzdl9kYXRhX2xpc3QnKSAgPy5zdHlsZS5zZXRQcm9wZXJ0eSgnZGlzcGxheScsICdibG9jaycpO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xkc3ZfZGF0YV9maWVsZHMnKT8uc3R5bGUuc2V0UHJvcGVydHkoJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIGluaXRfZGF0YSgpOiB2b2lkIHt9XHJcbmZ1bmN0aW9uIGluaXRfdmlldygpOiB2b2lkIHt9XHJcbmZ1bmN0aW9uIGluaXRfY3RscygpOiB2b2lkIHtcclxuICAgIGlzX2tha3VuaW4gPSBmYWxzZTtcclxuICAgIFVMX2JhayA9IDk5OTtcclxuXHJcbiAgICBnX2N0bHMuc2V0KGN0bHNfbG9hZF9ydG4pO1xyXG4gICAgZ19jdGxzLnNldChjdGxzX2xvYWRfbm9yKTtcclxuICAgIGdfY3Rscy5zZXQoY3Rsc19sb2FkX2Noayk7XHJcbiAgICBnX2N0bHMuc2V0KGN0bHNfc2F2ZV9ub3IpO1xyXG4gICAgZ19jdGxzLnNldChjdGxzX3NhdmVfY2hrKTtcclxufVxyXG5cclxuZnVuY3Rpb24gaXNPS19mb3JfbG9hZCgpOiB2b2lkIHtcclxuICAgIGlmIChzYXZlX1VMX2xpc3QgPT09IG51bGwpIHJldHVybjtcclxuICAgIGlmIChVTF9pZHggPCAwIHx8IFVMX2lkeCA+IFVMX2xpc3RfbGVuZyAtIDEpIHJldHVybjtcclxuXHJcbi8vICAgIGlmICghaXNfa2FrdW5pbikgY2hlY2tfbG9hZCgpOyBlbHNlIGxvYWQoKTtcclxuICAgIGxvYWQoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gaXNPS19mb3Jfc2F2ZSgpOiB2b2lkIHtcclxuICAgIGlmIChzYXZlX1VMX2xpc3QgPT09IG51bGwpIHJldHVybjtcclxuICAgIGlmIChVTF9pZHggPCAwIHx8IFVMX2lkeCA+IFVMX2xpc3RfbGVuZyAtIDEpIHJldHVybjtcclxuXHJcbi8vICAgIGlmICghaXNfa2FrdW5pbikgY2hlY2tfc2F2ZSgpOyBlbHNlIHNhdmUoKTtcclxuICAgIHNhdmUoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gaXNOR19mb3JfbG9hZCgpOiB2b2lkIHtcclxuICAgIF9pc05HXyhjdGxzX2xvYWRfbm9yKTtcclxufVxyXG5mdW5jdGlvbiBpc05HX2Zvcl9zYXZlKCk6IHZvaWQge1xyXG4gICAgX2lzTkdfKGN0bHNfc2F2ZV9ub3IpO1xyXG59XHJcbmZ1bmN0aW9uIF9pc05HXyhjdGxzOiBUX0N0bHMpOiB2b2lkIHtcclxuICAgIGlmICghaXNfa2FrdW5pbikge1xyXG4gICAgICAgIGdfY3ZtLmNsZWFyX21lc3NhZ2UoKTtcclxuICAgICAgICBnb19iYWNrX21lbnVfbW9kZSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBpc19rYWt1bmluID0gZmFsc2U7XHJcbiAgICAgICAgZ19jdGxzLmFjdChjdGxzKTtcclxuICAgICAgICBkaXNwbGF5X21lc3NhZ2UoKTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZ29fYmFja19tZW51X21vZGUoKTogdm9pZCB7XHJcbiAgICBnX2N2bS5jbGVhcl9tZXNzYWdlKCk7XHJcbiAgICBhY3RfbWVudV9tb2RlKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdvX2JhY2tfbW92ZV9tb2RlKCk6IHZvaWQge1xyXG4gICAgYWN0X21vdmVfbW9kZSgpO1xyXG4gICAgZG9fbW92ZV9ib3R0b21faGFsZignYmxpbmtfb2ZmJyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRvX1UoKTogdm9pZCB7XHJcbiAgICBkaXNwbGF5X21lc3NhZ2UoKTtcclxuICAgIFVMX2lkeCA9IFVMX2xpc3RfY3Jzci5wb3NfVSgpO1xyXG4gICAgZm9ybV9zZXQoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZG9fRCgpOiB2b2lkIHsgXHJcbiAgICBkaXNwbGF5X21lc3NhZ2UoKTtcclxuICAgIFVMX2lkeCA9IFVMX2xpc3RfY3Jzci5wb3NfRCgpO1xyXG4gICAgZm9ybV9zZXQoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZG9fTCgpOiB2b2lkIHtcclxuICAgIGRpc3BsYXlfbWVzc2FnZSgpO1xyXG4gICAgVUxfaWR4ID0gVUxfbGlzdF9jcnNyLnBvc19MKCk7XHJcbiAgICBmb3JtX3NldCgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkb19SKCk6IHZvaWQge1xyXG4gICAgZGlzcGxheV9tZXNzYWdlKCk7XHJcbiAgICBVTF9pZHggPSBVTF9saXN0X2Nyc3IucG9zX1IoKTtcclxuICAgIGZvcm1fc2V0KCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZvcm1fY2xyKCk6dm9pZCB7XHJcbiAgICBpZiAoVUxfaWR4IDwgMCB8fCBVTF9pZHggPiBVTF9saXN0X2xlbmcgLSAxKSByZXR1cm47XHJcblxyXG4gICAgZm9ybV9pZCAgIC52YWx1ZSAgICAgID0gJy0xJztcclxuICAgIGZvcm1fdGltZSAuaW5uZXJUZXh0ICA9ICcnO1xyXG4gICAgZm9ybV9wb2ludC5pbm5lclRleHQgID0gJyc7XHJcblxyXG4gICAgaWYgKGZvcm1fZGV0YWlsLmhhc0F0dHJpYnV0ZSgncmVhZG9ubHknKSkge1xyXG4gICAgICAgIGZvcm1fZGV0YWlsLnJlbW92ZUF0dHJpYnV0ZSgncmVhZG9ubHknKTtcclxuICAgICAgICBmb3JtX2RldGFpbC52YWx1ZSA9ICcnO1xyXG4gICAgICAgIGZvcm1fZGV0YWlsLnNldEF0dHJpYnV0ZSgncmVhZG9ubHknLCAncmVhZG9ubHknKTtcclxuICAgIH1lbHNlIHtcclxuICAgICAgICBmb3JtX2RldGFpbC52YWx1ZSA9ICcnO1xyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBmb3JtX3NldCgpOnZvaWQge1xyXG4gICAgaWYgKFVMX2lkeCA8IDAgfHwgVUxfaWR4ID4gVUxfbGlzdF9sZW5nIC0gMSkgcmV0dXJuO1xyXG5cclxuICAgIGZvcm1fY2xyKCk7XHJcbiAgICBjb25zdCBkYXRhX2lkeCA9IFVMX3RvX0RhdGFbVUxfaWR4XTtcclxuXHJcbiAgICBmb3JtX2lkICAgLnZhbHVlICAgICAgPSBzYXZlX2xpc3RbZGF0YV9pZHhdLnNhdmVfaWQudG9TdHJpbmcoKTtcclxuICAgIGZvcm1fdGltZSAuaW5uZXJUZXh0ICA9IHNhdmVfbGlzdFtkYXRhX2lkeF0uc2F2ZV90aW1lPy50b0lTT1N0cmluZygpO1xyXG4gICAgZm9ybV9wb2ludC5pbm5lclRleHQgID0gc2F2ZV9saXN0W2RhdGFfaWR4XS5wb2ludDtcclxuXHJcbiAgICBpZiAoZm9ybV9kZXRhaWwuaGFzQXR0cmlidXRlKCdyZWFkb25seScpKSB7XHJcbiAgICAgICAgZm9ybV9kZXRhaWwucmVtb3ZlQXR0cmlidXRlKCdyZWFkb25seScpO1xyXG4gICAgICAgIGZvcm1fZGV0YWlsLnZhbHVlID0gc2F2ZV9saXN0W2RhdGFfaWR4XS5kZXRhaWw7XHJcbiAgICAgICAgZm9ybV9kZXRhaWwuc2V0QXR0cmlidXRlKCdyZWFkb25seScsICdyZWFkb25seScpO1xyXG4gICAgfWVsc2Uge1xyXG4gICAgICAgIGZvcm1fZGV0YWlsLnZhbHVlID0gc2F2ZV9saXN0W2RhdGFfaWR4XS5kZXRhaWw7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkaXNwbGF5X3NhdmVfbGlzdCgpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIGNvbnN0IGRhdGFfbGlzdCAgID0gJ2xkc3ZfZGF0YV9saXN0JztcclxuICAgIGNvbnN0IGRhdGFfaWQgICAgID0gJ2xkc3ZfZGF0YV9pZCc7XHJcbiAgICBjb25zdCBkYXRhX3RpbWUgICA9ICdsZHN2X2RhdGFfdGltZSc7XHJcbiAgICBjb25zdCBkYXRhX2RldGFpbCA9ICdsZHN2X2RhdGFfZGV0YWlsJztcclxuICAgIGNvbnN0IGRhdGFfcG9pbnQgID0gJ2xkc3ZfZGF0YV9wb2ludCc7XHJcblxyXG4gICAgYXdhaXQgZ2V0X3NhdmVfaW5mbygpPy50aGVuKGpzb25PYmogPT4ge1xyXG4gICAgICAgIGlmIChqc29uT2JqID09PSBudWxsIHx8IGpzb25PYmogPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBnX21lcy53YXJuaW5nX21lc3NhZ2UoJ+OCu+ODvOODluaDheWgseOBruWPl+S/oeOBq+WkseaVl+OBl+OBvuOBl+OBn+OAguOAkOWPl+S/oeODh+ODvOOCv+eEoeOBl+OAkScpO1xyXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoanNvbk9iai5lY29kZSAhPT0gMCkge1xyXG4gICAgICAgICAgICBnX21lcy53YXJuaW5nX21lc3NhZ2UoYOOAjiR7anNvbk9iai5lbXNnfeOAjygke2pzb25PYmouZWNvZGV9KWApO1xyXG4gICAgICAgICAgICBnX21lcy53YXJuaW5nX21lc3NhZ2UoJ+OCu+ODvOODluaDheWgseOBruWPl+S/oeOBq+WkseaVl+OBl+OBvuOBl+OBn+OAgicpO1xyXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBzYXZlX2xpc3QgPSB7fTsgXHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBzYXZlX2luZm8gb2YganNvbk9iai5zYXZlX2luZm8pIHtcclxuICAgICAgICAgICAgICAgIHNhdmVfbGlzdFtzYXZlX2luZm8udW5pcV9ub10gPSBuZXcgQ19TYXZlSW5mbyhzYXZlX2luZm8pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChmb3Jfc2F2ZSkge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgdW5pcV9ub19jbnQgPSAwOyB1bmlxX25vX2NudCA8IHNhdmVfbGlzdF9tYXg7IHVuaXFfbm9fY250KyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodW5pcV9ub19jbnQgaW4gc2F2ZV9saXN0KSBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICBzYXZlX2xpc3RbdW5pcV9ub19jbnRdID0gbmV3IENfU2F2ZUluZm8oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzYXZlX2lkOiAgICAtMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdW5pcV9ubzogICAgIHVuaXFfbm9fY250LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogICAgICBg5paw6KaP5L+d5a2YIyR7dW5pcV9ub19jbnQudG9TdHJpbmcoKS5wYWRTdGFydCgyLCAnMCcpfWAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRldGFpbDogICAgJycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50OiAgICAgJycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNhdmVfdGltZTogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBhdXRvX21vZGU6ICcwJyxcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc2F2ZV9VTF9saXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZGF0YV9saXN0KSBhcyBIVE1MVUxpc3RFbGVtZW50O1xyXG4gICAgICAgICAgICBpZiAoc2F2ZV9VTF9saXN0ID09PSBudWxsKSB7YWxlcnQoJ0NhbiBub3QgZmluZCB0aGUgRG9tIG9mIFNhdmUgTGlzdCEnKTtyZXR1cm47fVxyXG4gICAgICAgIFxyXG4gICAgICAgICAgICB3aGlsZSAoc2F2ZV9VTF9saXN0LmZpcnN0Q2hpbGQgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHNhdmVfVUxfbGlzdC5yZW1vdmVDaGlsZChzYXZlX1VMX2xpc3QuZmlyc3RDaGlsZCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGxldCBVTF9saXN0X2lkeCA9IDA7IFVMX3RvX0RhdGEgPSB7fTtcclxuICAgICAgICAgICAgZm9yIChsZXQgZGF0YV9pZHggaW4gc2F2ZV9saXN0KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2F2ZV9saXN0W2RhdGFfaWR4XS5hdXRvX21vZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZm9yX3NhdmUpIGNvbnRpbnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHNhdmVfbGlzdFtkYXRhX2lkeF0udW5pcV9ubykgeyBcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxMDA6IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2F2ZV9saXN0W2RhdGFfaWR4XS50aXRsZSAgPSAn6Ieq5YuV5L+d5a2Y5YiGJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNhdmVfbGlzdFtkYXRhX2lkeF0uZGV0YWlsID0gJ+S9nOalreeUqOOBq+ewoeaYk+S/neWtmOOBl+OBn+ODh+ODvOOCv+OBp+OBmSc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTAxOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2F2ZV9saXN0W2RhdGFfaWR4XS50aXRsZSAgPSAn57Ch5piT5L+d5a2Y5YiGJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNhdmVfbGlzdFtkYXRhX2lkeF0uZGV0YWlsID0gJ+ODh+ODkOODg+OCsOODouODvOODieOBp+ewoeaYk+S/neWtmOOBl+OBn+ODh+ODvOOCv+OBp+OBmSc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxMDI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzYXZlX2xpc3RbZGF0YV9pZHhdLnRpdGxlICA9ICfpmo7mrrXnm7TliY3liIYnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2F2ZV9saXN0W2RhdGFfaWR4XS5kZXRhaWwgPSAn5LiA55Wq5pyA6L+R44Gu44OV44Ot44Ki56e75YuV55u05YmN44Gr6Ieq5YuV5L+d5a2Y44GX44Gf44OH44O844K/44Gn44GZJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDEwMzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNhdmVfbGlzdFtkYXRhX2lkeF0udGl0bGUgID0gJ++9su++je++nu++ne++hOebtOWJjeWIhic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzYXZlX2xpc3RbZGF0YV9pZHhdLmRldGFpbCA9ICfjgqTjg5njg7Pjg4go5aSx5pWXKeebtOWJjeOBq+ewoeaYk+S/neWtmOOBl+OBn+ODh+ODvOOCv+OBp+OBmSc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpIGFzIEhUTUxMSUVsZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICBsaS5pbm5lckhUTUwgPSBg44COJHtzYXZlX2xpc3RbZGF0YV9pZHhdLnRpdGxlfeOAj2A7XHJcblxyXG4gICAgICAgICAgICAgICAgbGkuaWQgPSBVTF9saXN0X2lkeC50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgbGkuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZvcl9zYXZlP19PS19zYXZlX0ZuYzpfT0tfbG9hZF9GbmMsIGZhbHNlKTtcclxuXHJcbiAgICAgICAgICAgICAgICBzYXZlX1VMX2xpc3QuYXBwZW5kQ2hpbGQobGkpO1xyXG4gICAgICAgICAgICAgICAgVUxfdG9fRGF0YVtVTF9saXN0X2lkeCsrXSA9IE51bWJlcihkYXRhX2lkeCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgVUxfbGlzdF9jcnNyID0gQ19DdGxDdXJzb3IuZ2V0T2JqKHNhdmVfVUxfbGlzdCk7XHJcbiAgICAgICAgICAgIFVMX2xpc3RfbGVuZyA9IHNhdmVfVUxfbGlzdC5jaGlsZHJlbi5sZW5ndGg7XHJcbiAgICBcclxuICAgICAgICAgICAgZm9ybV9pZCAgICAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChkYXRhX2lkKSAgICAgYXMgSFRNTElucHV0RWxlbWVudDtcclxuICAgICAgICAgICAgZm9ybV90aW1lICAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChkYXRhX3RpbWUpICAgYXMgSFRNTFBhcmFncmFwaEVsZW1lbnQ7XHJcbiAgICAgICAgICAgIGZvcm1fZGV0YWlsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZGF0YV9kZXRhaWwpIGFzIEhUTUxUZXh0QXJlYUVsZW1lbnQ7XHJcbiAgICAgICAgICAgIGZvcm1fcG9pbnQgID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZGF0YV9wb2ludCkgIGFzIEhUTUxQYXJhZ3JhcGhFbGVtZW50OyBcclxuXHJcbiAgICAgICAgICAgIGlmICghZXhpc3Rfc2F2ZV9saXN0KCkpIHJldHVybjtcclxuICAgICAgICAgICAgVUxfaWR4ID0gMDsgIFVMX2xpc3RfY3Jzci5zZXRfcG9zKFVMX2lkeCk7IFxyXG4gICAgICAgICAgICBmb3JtX3NldCgpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgIGdfbWVzLndhcm5pbmdfbWVzc2FnZShlcnIgYXMgdW5rbm93biBhcyBzdHJpbmcpO1xyXG4gICAgICAgICAgICBnX21lcy53YXJuaW5nX21lc3NhZ2UoJ+OCu+ODvOODluaDheWgseOBruWPl+S/oeOBq+WkseaVl+OBl+OBvuOBl+OBn+OAguOAkOODh+ODvOOCv+S4jeS4gOiHtOOAkScpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuZnVuY3Rpb24gX09LX2xvYWRfRm5jKHRoaXM6IEhUTUxMSUVsZW1lbnQsIGU6IE1vdXNlRXZlbnQpOiB2b2lkIHtcclxuICAgIFVMX2lkeCA9IE51bWJlcih0aGlzLmlkKTtcclxuICAgIFxyXG4gICAgaWYgKFVMX2lkeCAhPT0gVUxfYmFrKSB7XHJcbiAgICAgICAgVUxfYmFrID0gICBVTF9pZHg7XHJcbiAgICAgICAgaXNfa2FrdW5pbiA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgaWYgKGlzX2tha3VuaW4pIGlzT0tfZm9yX2xvYWQoKTsgZWxzZSBjaGVja19sb2FkKCk7XHJcbiAgICBVTF9saXN0X2Nyc3Iuc2V0X3BvcyhVTF9pZHgpOyBmb3JtX3NldCgpO1xyXG59XHJcbmZ1bmN0aW9uIF9PS19zYXZlX0ZuYyh0aGlzOiBIVE1MTElFbGVtZW50LCBlOiBNb3VzZUV2ZW50KTogdm9pZCB7XHJcbiAgICBVTF9pZHggPSBOdW1iZXIodGhpcy5pZCk7XHJcbiAgICBcclxuICAgIGlmIChVTF9pZHggIT09IFVMX2Jhaykge1xyXG4gICAgICAgIFVMX2JhayA9ICAgVUxfaWR4O1xyXG4gICAgICAgIGlzX2tha3VuaW4gPSBmYWxzZTtcclxuICAgIH1cclxuICAgIGlmIChpc19rYWt1bmluKSBpc09LX2Zvcl9zYXZlKCk7IGVsc2UgY2hlY2tfc2F2ZSgpO1xyXG4gICAgVUxfbGlzdF9jcnNyLnNldF9wb3MoVUxfaWR4KTsgZm9ybV9zZXQoKTtcclxufVxyXG5mdW5jdGlvbiBleGlzdF9zYXZlX2xpc3QoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gc2F2ZV9VTF9saXN0LmNoaWxkcmVuLmxlbmd0aCA+IDA7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNoZWNrX2xvYWQoKTogdm9pZCB7IC8vIOWFpeWKm+ODgeOCp+ODg+OCr+OBqOaXouWtmOODh+ODvOOCv+S4iuabuOOBjeOBrueiuuiqjVxyXG4gICAgY29uc3QgZGF0YV9pZHggPSBVTF90b19EYXRhW1VMX2lkeF07XHJcbiAgICBpZiAoVUxfaWR4IDwgMCB8fCBVTF9pZHggPiBVTF9saXN0X2xlbmcgLSAxKSB7XHJcbiAgICAgICAgZ19tZXMud2FybmluZ19tZXNzYWdlKGBjaGVjayEhIE5vIGxvbmdlciBhY2Nlc3MgaWR4IeOAjiR7c2F2ZV9saXN0W2RhdGFfaWR4XS50aXRsZX3jgI8oc2F2ZV9pZDogJHtzYXZlX2xpc3RbZGF0YV9pZHhdLnNhdmVfaWR9KWApO1xyXG4gICAgfVxyXG4gICAgaXNfa2FrdW5pbiA9IHRydWU7XHJcbiAgICBnX2N0bHMuYWN0KGN0bHNfbG9hZF9jaGspO1xyXG4gICAgZGlzcGxheV9tZXNzYWdlKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNoZWNrX3NhdmUoKTogdm9pZCB7IC8vIOWFpeWKm+ODgeOCp+ODg+OCr+OBqOaXouWtmOODh+ODvOOCv+S4iuabuOOBjeOBrueiuuiqjVxyXG4gICAgY29uc3QgZGF0YV9pZHggPSBVTF90b19EYXRhW1VMX2lkeF07XHJcbiAgICBpZiAoVUxfaWR4IDwgMCB8fCBVTF9pZHggPiBVTF9saXN0X2xlbmcgLSAxKSB7XHJcbiAgICAgICAgZ19tZXMud2FybmluZ19tZXNzYWdlKGBjaGVjayEhIE5vIGxvbmdlciBhY2Nlc3MgaWR4IeOAjiR7c2F2ZV9saXN0W2RhdGFfaWR4XS50aXRsZX3jgI8oc2F2ZV9pZDogJHtzYXZlX2xpc3RbZGF0YV9pZHhdLnNhdmVfaWR9KWApO1xyXG4gICAgfVxyXG4gICAgaWYgKHNhdmVfbGlzdFtkYXRhX2lkeF0uYXV0b19tb2RlKSB7XHJcbiAgICAgICAgZ19tZXMud2FybmluZ19tZXNzYWdlKGBjaGVjayEhIFRoaXMgaXMgQXV0byBNb2RlIeOAjiR7c2F2ZV9saXN0W2RhdGFfaWR4XS50aXRsZX3jgI8oc2F2ZV9pZDogJHtzYXZlX2xpc3RbZGF0YV9pZHhdLnNhdmVfaWR9KWApO1xyXG4gICAgfVxyXG4gICAgaXNfa2FrdW5pbiA9IHRydWU7XHJcbiAgICBnX2N0bHMuYWN0KGN0bHNfc2F2ZV9jaGspO1xyXG4gICAgZGlzcGxheV9tZXNzYWdlKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRpc3BsYXlfbWVzc2FnZSgpIHtcclxuICAgIGlmIChmb3Jfc2F2ZSkge1xyXG4gICAgICAgIGlmIChpc19rYWt1bmluKSB7XHJcbiAgICAgICAgICAgIGlmIChVTF90b19EYXRhW1VMX2lkeF0gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgZ19jdm0ubm90aWNlX21lc3NhZ2UoJ+OBk+OCjOOBq+S/neWtmOOBl+OBvuOBmeOBi++8nycpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZ19jdm0ubm90aWNlX21lc3NhZ2UoJ+OBk+OCjOOBq+S4iuabuOS/neWtmOOBl+OBvuOBmeOBi++8n+S7peWJjeOBruODh+ODvOOCv+OBr+a2iOWOu+OBleOCjOOBvuOBmScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZ19jdm0ubm9ybWFsX21lc3NhZ2UoJ+OBqeOCjOOBq+S/neWtmOOBl+OBvuOBmeOBi++8nycpO1xyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKGlzX2tha3VuaW4pIHtcclxuICAgICAgICAgICAgZ19jdm0ubm90aWNlX21lc3NhZ2UoJ+ODreODvOODieOBl+OBvuOBmeOBi++8nycpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGdfY3ZtLm5vcm1hbF9tZXNzYWdlKCfjganjgozjgpLjg63jg7zjg4njgZfjgb7jgZnjgYvvvJ8nKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5cclxuXHJcbmZ1bmN0aW9uIGxvYWQoKTogdm9pZCB7IFxyXG4gICAgY29uc3QgZGF0YV9pZHggPSBVTF90b19EYXRhW1VMX2lkeF07XHJcbiAgICBpZiAoc2F2ZV9saXN0W2RhdGFfaWR4XS5teXBvcy51cmwoKSAhPT0gJycgJiYgc2F2ZV9saXN0W2RhdGFfaWR4XS5teXBvcy51cmwoKSAhPSBnX215X3VybCkge1xyXG4gICAgICAgIF9sb2FkX290aGVyKGRhdGFfaWR4KTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBfbG9hZF9oZXJlKGRhdGFfaWR4KTtcclxuICAgIHJldHVybjtcclxufVxyXG5mdW5jdGlvbiBfbG9hZF9vdGhlcihkYXRhX2lkeDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICBjb25zdCBvcHQgPSBuZXcgQ19VcmxPcHQoKTtcclxuICAgIG9wdC5zZXQoJ21vZGUnLCAnbG9hZCcpO1xyXG4gICAgb3B0LnNldCgncGlkJywgICBnX3N0YXJ0X2Vudi5waWQpO1xyXG4gICAgb3B0LnNldCgnb3B0JywgICBzYXZlX2xpc3RbZGF0YV9pZHhdLnVuaXFfbm8udG9TdHJpbmcoKSk7XHJcbiAgICBQT1NUX2FuZF9tb3ZlX3BhZ2Uoc2F2ZV9saXN0W2RhdGFfaWR4XS5teXBvcy51cmwoKSwgb3B0KTtcclxuICAgIHJldHVybjtcclxufVxyXG5cclxuZnVuY3Rpb24gX2xvYWRfaGVyZShkYXRhX2lkeDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICBnX3N0YXJ0X2Vudi5waWQgPSBzYXZlX2xpc3RbZGF0YV9pZHhdLnBsYXllcl9pZDtcclxuXHJcbiAgICBnZW5lcmFsX2xvYWQoc2F2ZV9saXN0W2RhdGFfaWR4XS51bmlxX25vKS50aGVuKChqc29uT2JqOmFueSk9PnsgIFxyXG4gICAgICAgIGlzX2tha3VuaW4gPSBmYWxzZTtcclxuICAgICAgICBkZWNvZGVfYWxsKGpzb25PYmo/LnNhdmUpO1xyXG4gICAgICAgIGdfbXZtLm5vdGljZV9tZXNzYWdlKCfjg63jg7zjg4njgZfjgb7jgZfjgZ8nKTtcclxuICAgICAgICBnb19iYWNrX21vdmVfbW9kZSgpOyAgICAgICAgXHJcbiAgICB9KTtcclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gc2F2ZSgpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIGNvbnN0IGRhdGFfaWR4ID0gVUxfdG9fRGF0YVtVTF9pZHhdO1xyXG4gICAgc2V0X2dfc2F2ZShcclxuICAgICAgICAvKiBzYXZlX2lkOiAqLyAgIHNhdmVfbGlzdFtkYXRhX2lkeF0uc2F2ZV9pZCwgLy9OdW1iZXIoZm9ybV9pZC52YWx1ZSksXHJcbiAgICAgICAgLyogdW5pcV9ubzogKi8gICBzYXZlX2xpc3RbZGF0YV9pZHhdLnVuaXFfbm8sXHJcbiAgICAgICAgLyogdGl0bGU6ICovICAgICBg5L+d5a2Y5riIOiAjJHtkYXRhX2lkeC50b1N0cmluZygpLnBhZFN0YXJ0KDIsICcwJyl9YCwgLy9zYXZlX2xpc3RbZGF0YV9pZHhdLnRpdGxlLCBcclxuICAgICAgICAvKiBkZXRhaWw6ICovICAgIGZvcm1fZGV0YWlsLnZhbHVlLFxyXG4gICAgICAgIC8qIHBvaW50OiAqLyAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgYOOAjiR7Z19tYXplLmdldF9uYW1lKCl944CPIGAgXHJcbiAgICAgICAgICAgICAgICAgICAgKyBg5Zyw5LiLICR7Z190ZWFtLmdldF9wZCgpLnogKyAxfemajuWxpCBgIFxyXG4gICAgICAgICAgICAgICAgICAgICsgYChYOiAke2dfdGVhbS5nZXRfcGQoKS54fSwgWTogJHtnX3RlYW0uZ2V0X3BkKCkueX0pYCxcclxuICAgICAgICAvKiBhdXRvX21vZGU6ICovIGZhbHNlLFxyXG4gICAgKTtcclxuICAgIGdlbmVyYWxfc2F2ZSgpLnRoZW4oKGpzb25PYmopPT57XHJcbiAgICAgICAgZGVjb2RlX2FsbChqc29uT2JqKTtcclxuXHJcbiAgICAgICAgaXNfa2FrdW5pbiA9IGZhbHNlO1xyXG4gICAgICAgIGdfbXZtLm5vdGljZV9tZXNzYWdlKCfkv53lrZjjgZfjgb7jgZfjgZ8nKTtcclxuICAgICAgICBnb19iYWNrX21vdmVfbW9kZSgpOyAgICAgICAgXHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGRlY29kZV9hbGwoanNvbk9iajogYW55KTogdm9pZCB7IFxyXG4gICAgLy8gU2F2ZURhdGHplqLpgKPjga7jg4fjgrPjg7zjg4lcclxuICAgIGlmIChqc29uT2JqID09PSB1bmRlZmluZWQpIHJldHVybjtcclxuICAgIGdfc2F2ZS5kZWNvZGUoanNvbk9iaik7IFxyXG4gICAgZ19zYXZlLm15cG9zLnNldF91cmwoZ19teV91cmwpO1xyXG5cclxuICAgIC8vVGVhbemWoumAo+OBruODh+OCs+ODvOODiVxyXG4gICAgZ190ZWFtLmRlY29kZShnX3NhdmUuYWxsX3RlYW1bZ19zYXZlLm15cG9zLnRpZCgpPz8nJ10uZW5jb2RlKCkpOyBcclxuICAgIGdfdGVhbS5zZXRfbG9jKGdfc2F2ZS5teXBvcyk7XHJcblxyXG4gICAgLy8gTWF6ZemWoumAo+OBruODh+OCs+ODvOODiVxyXG4gICAgY29uc3QgbG9jID0gZ190ZWFtLmdldF9sb2MoKTsgXHJcbiAgICBpZiAobG9jLmdldF9sY2tkKCkgPT0gVF9MY2tkLk1hemUpIHtcclxuICAgICAgICBnX21hemUuZGVjb2RlKGdfc2F2ZS5hbGxfbWF6ZVtsb2MuZ2V0X3VpZCgpXS5lbmNvZGUoKSk7IFxyXG4gICAgfVxyXG5cclxuICAgIC8vSGVyb+mWoumAo+OBruODh+OCs+ODvOODiVxyXG4gICAgZm9yIChjb25zdCBpIGluIGdfaHJlcykgZGVsZXRlIGdfaHJlc1tpXTsgXHJcbiAgICBmb3IgKGNvbnN0IGhlcm8gb2YgZ190ZWFtLmhyZXMoKSkgIGdfaHJlcy5wdXNoKGhlcm8pOyBcclxuXHJcbiAgICAvLyBNYXpl44GrVGVhbeOCkui/veWKoFxyXG4gICAgZ19tYXplLmFkZF9vYmooZ190ZWFtIGFzIElfTWF6ZU9iaik7IFxyXG59XHJcblxyXG4vLyDmlrDopo/jgrLjg7zjg6Djga7liJ3mnJ/jg4fjg7zjgr/jga7oqq3jgb/ovrzjgb8o5pqr5a6aKVxyXG5leHBvcnQgZnVuY3Rpb24gZGVjb2RlX21hemUoanNvbk9iajogYW55KTogdm9pZCB7XHJcbiAgICAvLyBNYXpl6Zai6YCj44Gu44OH44Kz44O844OJXHJcbiAgICBpZiAoanNvbk9iaj8ubWF6ZSAhPT0gdW5kZWZpbmVkKSBnX21hemUuZGVjb2RlKGpzb25PYmoubWF6ZSk7XHJcblxyXG4gICAgLy/jgIBUZWFt6Zai6YCjKOePvuWcqOWcsCnjga7jg4fjgrPjg7zjg4lcclxuICAgIGlmIChqc29uT2JqPy5wb3MgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGxldCBwb3MgPSBuZXcgQ19Qb2ludERpcih7XHJcbiAgICAgICAgICAgIHg6IGpzb25PYmoucG9zPy54LCBcclxuICAgICAgICAgICAgeToganNvbk9iai5wb3M/LnksIFxyXG4gICAgICAgICAgICB6OiBqc29uT2JqLnBvcz8ueiwgXHJcbiAgICAgICAgICAgIGQ6IGpzb25PYmoucG9zPy5kLCBcclxuICAgICAgICB9KTsgXHJcbiAgICAgICAgZ190ZWFtLndhbGsoKS5zZXRfcGxhY2UoZ19tYXplLCBnX215X3VybCwgcG9zKTtcclxuICAgICAgICBnX3NhdmUubXlwb3MgPSBnX3RlYW0uZ2V0X2xvYygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEhlcm/plqLpgKPjga7jg4fjgrPjg7zjg4lcclxuICAgIGZvciAoY29uc3QgaSBpbiBnX2hyZXMpIGRlbGV0ZSBnX2hyZXNbaV07XHJcbiAgICBmb3IgKGNvbnN0IGhlcm8gb2YgZ190ZWFtLmhyZXMoKSkgZ19ocmVzLnB1c2goaGVybyk7XHJcblxyXG4gICAgLy8gTWF6ZeOBq1RlYW3jgpLov73liqBcclxuICAgIGdfbWF6ZS5hZGRfb2JqKGdfdGVhbSBhcyBJX01hemVPYmopO1xyXG5cclxuICAgIC8vIFNhdmVEYXRh44Gu44OZ44O844K544Gu5L2c5oiQXHJcbiAgICBnX3NhdmUubXlwb3MgPSBnX3RlYW0uZ2V0X2xvYygpO1xyXG4gICAgZ19zYXZlLmFsbF9tYXplW2dfbWF6ZS51aWQoKV0gPSBnX21hemU7XHJcbiAgICBnX3NhdmUuYWxsX3RlYW1bZ190ZWFtLnVpZCgpXSA9IGdfdGVhbTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNldF9nX3NhdmUgKFxyXG4gICAgICAgIHNhdmVfaWQ6ICAgbnVtYmVyLFxyXG4gICAgICAgIHVuaXFfbm86ICAgbnVtYmVyLCBcclxuICAgICAgICB0aXRsZTogICAgIHN0cmluZywgXHJcbiAgICAgICAgZGV0YWlsOiAgICBzdHJpbmcsIFxyXG4gICAgICAgIHBvaW50OiAgICAgc3RyaW5nLFxyXG4gICAgICAgIGF1dG9fbW9kZTogYm9vbGVhbixcclxuICAgICk6IHZvaWQge1xyXG4gICAgICAgIGdfc2F2ZS5teXBvcyA9IGdfdGVhbS5nZXRfbG9jKCk7XHJcblxyXG4gICAgICAgIGdfc2F2ZS5hbGxfdGVhbVtnX3RlYW0udWlkKCldID0gZ190ZWFtO1xyXG4gICAgICAgIGdfc2F2ZS5hbGxfbWF6ZVtnX21hemUudWlkKCldID0gZ19tYXplOyAvL1xyXG5cclxuICAgICAgICBnX3NhdmUuZGVjb2RlKHtcclxuICAgICAgICAgICAgc2F2ZV9pZDogICBzYXZlX2lkLCBcclxuICAgICAgICAgICAgcGxheWVyX2lkOiBnX3N0YXJ0X2Vudi5waWQsXHJcbiAgICAgICAgICAgIHVuaXFfbm86ICAgdW5pcV9ubywgXHJcbiAgICAgICAgICAgIHRpdGxlOiAgICAgdGl0bGUsIFxyXG4gICAgICAgICAgICBkZXRhaWw6ICAgIGRldGFpbCxcclxuICAgICAgICAgICAgcG9pbnQ6ICAgICBwb2ludCwgXHJcbiAgICAgICAgICAgIGF1dG9fbW9kZTogYXV0b19tb2RlID8gJzEnIDogJzAnLFxyXG4gICAgICAgICAgICBpc19hY3RpdmU6ICcxJyxcclxuICAgICAgICAgICAgaXNfZGVsZXRlOiAnMCcsXHJcbiAgICBcclxuLy8g5Yid5pyf6Kit5a6a44GL44Ot44O844OJ44Gu5pmC54K544Gn6Kit5a6a44GV44KM44Gm44GE44KL44Gv44GaXHJcbi8vICAgICAgICAgICAgYWxsX212cHQ6IGFsbF9tdnB0LFxyXG4vLyAgICAgICAgICAgIGFsbF9tYXplOiBhbGxfbWF6ZSxcclxuLy8gICAgICAgICAgICBhbGxfdGVhbTogYWxsX3RlYW0sXHJcbi8vICAgICAgICAgICAgYWxsX2d1bGQ6IGFsbF9ndWxkLFxyXG4gICAgICAgIH0pO1xyXG59XHJcbiIsImltcG9ydCB7IFRfQ3Rsc01vZGUgfSAgICBmcm9tIFwiLi9UX0N0bHNNb2RlXCI7XHJcbmV4cG9ydCBjb25zdCBnX2N0bHNfbW9kZTogVF9DdGxzTW9kZVtdID0gbmV3IEFycmF5KDEpIGFzIFRfQ3Rsc01vZGVbXTtcclxuXHJcbmltcG9ydCB7IGluaXRfbWF6ZUNoLCBkaXNwbGF5X21hemVDaCB9IGZyb20gXCIuL0ZfZGlzcGxheV9tYXplQ2hcIjtcclxuaW1wb3J0IHsgaW5pdF9tYXplM0QsIFRfRHJvd1NldCB9ICAgICAgICAgICAgZnJvbSBcIi4vRl9kaXNwbGF5X21hemUzRFwiO1xyXG5leHBvcnQgdmFyIGdfZHM6IFRfRHJvd1NldCAgID0ge2NhbnZhczogbnVsbCwgY29uOiBudWxsLCBkZXB0aDogMCwgd2FsbDogbnVsbH07XHJcblxyXG5pbXBvcnQgeyBDX1N3aXRjaFZpZXcgfSAgICAgICAgICBmcm9tIFwiLi9DX1N3aXRjaFZpZXdcIjtcclxuZXhwb3J0IHZhciBnX3ZzdzogQ19Td2l0Y2hWaWV3O1xyXG5cclxuaW1wb3J0IHsgQ19PbmVMaW5lVmlld01lc3NhZ2UgfSAgZnJvbSBcIi4uL2RfdmllL0NfT25lTGluZVZpZXdNZXNzYWdlXCI7XHJcbmV4cG9ydCB2YXIgZ19tdm06IENfT25lTGluZVZpZXdNZXNzYWdlO1xyXG5leHBvcnQgdmFyIGdfY3ZtOiBDX09uZUxpbmVWaWV3TWVzc2FnZTtcclxuXHJcbmltcG9ydCB7IENfSGVybyB9IGZyb20gXCIuLi9kX21kbC9DX0hlcm9cIjtcclxuZXhwb3J0IGNvbnN0IGdfaHJlczogQ19IZXJvW10gPSBbXTtcclxuXHJcbmltcG9ydCB7IENfTWF6ZSB9IGZyb20gXCIuLi9kX21kbC9DX01hemVcIjtcclxuZXhwb3J0IGNvbnN0IGdfbWF6ZSA9IG5ldyBDX01hemUoKTtcclxuXHJcbmltcG9ydCB7IENfVGVhbSB9IGZyb20gXCIuLi9kX21kbC9DX1RlYW1cIjtcclxuZXhwb3J0IGNvbnN0IGdfdGVhbSA9IG5ldyBDX1RlYW0oKTtcclxuXHJcbmltcG9ydCB7IENfR3VpbGQgfSBmcm9tIFwiLi4vZF9tZGwvQ19HdWlsZFwiO1xyXG5leHBvcnQgY29uc3QgZ19ndWxkID0gbmV3IENfR3VpbGQoKTtcclxuXHJcblxyXG5pbXBvcnQgeyBDX0RlZmF1bHRDdGxzIH0gICAgICAgICAgICBmcm9tICcuL0NfRGVmYXVsdEN0bHMnO1xyXG5leHBvcnQgbGV0IGdfY3RsczogQ19EZWZhdWx0Q3RscztcclxuXHJcbmltcG9ydCB7IGluaXRfYWxsX21vZGUgfSAgICAgICAgICAgIGZyb20gXCIuL0Zfc2V0X21vZGVcIjtcclxuaW1wb3J0IHsgZGVjb2RlX2FsbCwgZGVjb2RlX21hemUgfSAgZnJvbSBcIi4vRl9zZXRfc2F2ZV9tb2RlXCI7XHJcbmltcG9ydCB7IGRvX21vdmVfYm90dG9tX2hhbGYsIGFjdF9tb3ZlX21vZGUgfSBmcm9tIFwiLi9GX3NldF9tb3ZlX21vZGVcIjtcclxuXHJcbmltcG9ydCB7IFxyXG4gICAgZ2VuZXJhbF9sb2FkLCBcclxuICAgIGdldF9tYWlfbWF6ZSwgXHJcbiAgICBnZXRfbmV3X21hemUsIFxyXG4gICAgdG1wX2xvYWQgXHJcbn0gZnJvbSBcIi4uL2RfY21uL0ZfbG9hZF9hbmRfc2F2ZVwiO1xyXG5cclxuaW1wb3J0IHsgXHJcbiAgICBnX2FsZXJ0LFxyXG4gICAgZ19kZWJ1ZyxcclxuICAgIGdfbWVzLCBcclxuICAgIGdfcmVhZHlfZ2FtZXMsIFxyXG4gICAgZ19zdGFydF9lbnYsIFxyXG4gICAgaW5pdF9hZnRlcl9sb2FkZWRfRE9NX2luX2NvbW1vbiBcclxufSBmcm9tIFwiLi4vZF9jbW4vZ2xvYmFsXCI7XHJcbmltcG9ydCB7IF9pcmFuZCB9IGZyb20gXCIuLi9kX3V0bC9GX1JhbmRcIjtcclxuaW1wb3J0IHsgQ19NYXplT2JqIH0gZnJvbSBcIi4uL2RfbWRsL0NfTWF6ZU9ialwiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGluaXRfYmVmb3JlX2dhbWVzKCk6IHZvaWQge1xyXG4gICAgc3dpdGNoIChnX3N0YXJ0X2Vudi5tb2RlKSB7XHJcbiAgICAgICAgY2FzZSAnbmV3JzpcclxuICAgICAgICAgICAgaW5pdF9iZWZvcmVfbmV3X2dhbWVzKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBjYXNlICdsb2FkJzpcclxuICAgICAgICAgICAgaW5pdF9iZWZvcmVfbG9hZF9nYW1lcygpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgY2FzZSAnc3RhcnQnOlxyXG4gICAgICAgICAgICBpbml0X2JlZm9yZV9zdGFydF9nYW1lcygpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgY2FzZSAnbXZwdCc6XHJcbiAgICAgICAgICAgIGluaXRfYmVmb3JlX212cHRfZ2FtZXMoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBpbml0X2JlZm9yZV9uZXdfZ2FtZXMoKTogdm9pZCB7XHJcbiAgICBnZXRfbWFpX21hemUoKS50aGVuKChqc29uT2JqOmFueSk9PntcclxuICAgICAgICBkZWNvZGVfYWxsKGpzb25PYmo/LnNhdmUpO1xyXG4gICAgICAgIGluc3RhbGxfb2Jqcyg1KTsgICAgICAgICAgICAgICAgICAgLy8g5pqr5a6aKENfb2Jqc+OBruODhuOCueODiOeUqClcclxuICAgICAgICBkb19sb2FkX2JvdHRvbV9oYWxmKCcnKTtcclxuICAgIH0pO1xyXG59XHJcbmZ1bmN0aW9uIGluaXRfYmVmb3JlX2xvYWRfZ2FtZXMoKTogdm9pZCB7XHJcbiAgICBjb25zdCB1bm8gPSBOdW1iZXIoZ19zdGFydF9lbnYub3B0KTtcclxuICAgIGdlbmVyYWxfbG9hZCh1bm8pLnRoZW4oKGpzb25PYmo6YW55KT0+eyAgXHJcbiAgICAgICAgZGVjb2RlX2FsbChqc29uT2JqPy5zYXZlKTtcclxuICAgICAgICBkb19sb2FkX2JvdHRvbV9oYWxmKCfjg63jg7zjg4njgZfjgb7jgZfjgZ8nKTsgXHJcbiAgICB9KTtcclxufVxyXG5mdW5jdGlvbiBpbml0X2JlZm9yZV9zdGFydF9nYW1lcygpOiB2b2lkIHtcclxuICAgIGNvbnN0IG1hemVfbmFtZSA9IGdfc3RhcnRfZW52Lm9wdDtcclxuICAgIHRtcF9sb2FkKCkudGhlbigoanNvbk9iajphbnkpPT57XHJcbiAgICAgICAgZGVjb2RlX2FsbChqc29uT2JqPy5zYXZlKTtcclxuICAgICAgICBnZXRfbmV3X21hemUobWF6ZV9uYW1lKS50aGVuKChqc29uT2JqOmFueSk9PnsgXHJcbiAgICAgICAgICAgIGRlY29kZV9tYXplKGpzb25PYmo/LmRhdGEpO1xyXG4gICAgICAgICAgICBkb19sb2FkX2JvdHRvbV9oYWxmKCflhpLpmbrjgpLlp4vjgoHjgb7jgZfjgofjgYbvvIEnKTsgXHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufVxyXG5mdW5jdGlvbiBpbml0X2JlZm9yZV9tdnB0X2dhbWVzKCk6IHZvaWQge1xyXG4gICAgdG1wX2xvYWQoKS50aGVuKChqc29uT2JqOmFueSk9PnsgIFxyXG4gICAgICAgIGRlY29kZV9hbGwoanNvbk9iaj8uc2F2ZSk7XHJcbiAgICAgICAgZG9fbG9hZF9ib3R0b21faGFsZign5YaS6Zm644KS5YaN6ZaL44GX44G+44GX44KH44GG77yB77yBJyk7IFxyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBkb19sb2FkX2JvdHRvbV9oYWxmKG1zZzogc3RyaW5nKTogdm9pZHtcclxuICAgIGluaXRfbWF6ZUNoKCk7XHJcbiAgICBnX2RzID0gaW5pdF9tYXplM0QoKTsgXHJcblxyXG4gICAgZ19tdm0ubm90aWNlX21lc3NhZ2UobXNnKTsgXHJcbiAgICBnX21lcy5ub3RpY2VfbWVzc2FnZShtc2cpOyBcclxuICAgIGFjdF9tb3ZlX21vZGUoKTsgIFxyXG4gICAgZG9fbW92ZV9ib3R0b21faGFsZignYmxpbmtfb2ZmJyk7IFxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaW5pdF9hZnRlcl9sb2FkZWRfRE9NKCk6IHZvaWQgeyBcclxuICAgIGluaXRfYWZ0ZXJfbG9hZGVkX0RPTV9pbl9jb21tb24oJ2RlYnVnX21vZGUnLCAncGFuZV9zeXRtX2xvZ3MnKTsgXHJcblxyXG4gICAgZ19tdm0gID0gQ19PbmVMaW5lVmlld01lc3NhZ2UuZ2V0T2JqKCdtYXplX21lc2cnKTsgXHJcbiAgICBnX2N2bSAgPSBDX09uZUxpbmVWaWV3TWVzc2FnZS5nZXRPYmooJ21lbnVfbWVzZycpOyBcclxuICAgIGdfY3RscyA9IENfRGVmYXVsdEN0bHMuZ2V0T2JqKCk7IFxyXG4gICAgZ192c3cgID0gQ19Td2l0Y2hWaWV3LmdldE9iaigpOyBcclxuXHJcbiAgICBpbml0X2RlYnVnX21vZGUoKTtcclxuICAgIHN0b3BfZG91YmxlX2NsaWNrKCk7IFxyXG5cclxuICAgIGluaXRfYWxsX21vZGUoKTtcclxuICAgIGdfcmVhZHlfZ2FtZXMuc2V0RnVuY3Rpb24oaW5pdF9iZWZvcmVfZ2FtZXMpOyBcclxuICAgIGdfcmVhZHlfZ2FtZXMuc2V0TG9hZGVkRE9NKCk7IFxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaW5pdF9kZWJ1Z19tb2RlKCk6IHZvaWQge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBhbGVydCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhbGVydF9tb2RlJyk7XHJcbiAgICAgICAgYWxlcnQ/LnN0eWxlLnNldFByb3BlcnR5KCdkaXNwbGF5JywgJ25vbmUnKTtcclxuICAgICAgICBhbGVydD8uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsKGV2ZW50Ok1vdXNlRXZlbnQpPT57XHJcbiAgICAgICAgICAgIHRyeXtnX2FsZXJ0LnNob3coKTt9IGNhdGNoKGVycil7fTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZ19kZWJ1Zy5zZXRPYmooe1xyXG4gICAgICAgICAgICB5bjogICAgICAgIGZhbHNlLFxyXG4gICAgICAgICAgICBvbk5hbWU6ICAgJ0RFQlVHJyxcclxuICAgICAgICAgICAgb2ZmTmFtZTogICfpgJrluLgnLFxyXG4gICAgICAgICAgICBvbkNsYXNzOiAgJ2RlYnVnJyxcclxuICAgICAgICAgICAgb2ZmQ2xhc3M6ICdub3JtYWwnLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGdfZGVidWcuYWRkRm5jKHRvZ2dsZV9kZWJ1Z19tb2RlKTsvL2dfZGVidWcuc2V0T04oKTtcclxuXHJcbiAgICAgICAgY29uc3QgYnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RlYnVnX21vZGUnKSBhcyBIVE1MQnV0dG9uRWxlbWVudDtcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwoZXZlbnQpPT57XHJcbiAgICAgICAgICAgIHN3aXRjaCAoZXZlbnQuY29kZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIk51bXBhZE11bHRpcGx5XCI6XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiRXNjYXBlXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgYnRuLmNsaWNrKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfSBjYXRjaCAoZXJyKSB7cmV0dXJufTtcclxufVxyXG5cclxuZnVuY3Rpb24gdG9nZ2xlX2RlYnVnX21vZGUoeW46IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgIGRpc3BsYXlfbWF6ZUNoKCk7XHJcblxyXG4gICAgY29uc3QgYWxlcnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWxlcnRfbW9kZScpO1xyXG4gICAgY29uc3QgZGlzcGxheSA9IHluID8gJ2Jsb2NrJyA6ICdub25lJztcclxuICAgIGFsZXJ0Py5zdHlsZS5zZXRQcm9wZXJ0eSgnZGlzcGxheScsIGRpc3BsYXkpO1xyXG5cclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIHN0b3BfZG91YmxlX2NsaWNrKCk6IHZvaWQge1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2RibGNsaWNrJywoZXZ0OiBNb3VzZUV2ZW50KSA9PntldnQucHJldmVudERlZmF1bHQoKTt9KVxyXG59XHJcblxyXG4vLyDmmqvlrpooQ19NYXplT2Jq44Gu44OG44K544OI55SoKVxyXG5mdW5jdGlvbiBpbnN0YWxsX29ianMobnVtOiBudW1iZXIgPSAxKTogdm9pZCB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bTsgaSsrKSB7XHJcbiAgICAgICAgY29uc3QgeCA9IF9pcmFuZCgxLCAoZ19tYXplLmdldF94X21heCgpIC0gMSkgLyAyKSAqIDIgKyAxOyBcclxuICAgICAgICBjb25zdCB5ID0gX2lyYW5kKDEsIChnX21hemUuZ2V0X3lfbWF4KCkgLSAxKSAvIDIpICogMiArIDE7IFxyXG4gICAgICAgIGNvbnN0IG9iaiA9IENfTWF6ZU9iai5uZXdPYmooe1xyXG4gICAgICAgICAgICBwb3M6ICAgIHt4OngsIHk6eSwgejowLCBkOjB9LFxyXG4gICAgICAgICAgICB2aWV3OiB7XHJcbiAgICAgICAgICAgICAgICBsYXllcjogICAyLFxyXG4gICAgICAgICAgICAgICAgbGV0dGVyOiAn54mpJyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuICAgICAgICBnX21hemUuYWRkX29iaihvYmopO1xyXG4gICAgfVxyXG59XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLy9cbi8vLyAgIOS4u+WHpueQhlxuLy8vXG5cbmltcG9ydCB7IGluaXRfYWZ0ZXJfbG9hZGVkX0RPTSB9IGZyb20gXCIuL2dsb2JhbF9mb3JfbWF6ZVwiO1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkgeyBcbiAgICBpbml0X2FmdGVyX2xvYWRlZF9ET00oKTsgXG59KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==