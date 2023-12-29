import { T_CtlsMode }      from "./T_CtlsMode";
import { hide_controlles } from "./F_set_controlles";
import { g_ctls_mode, g_maze, g_mes, g_pid, g_team, g_vsw }     from "./global";
import { get_save_info } from "./F_laod_and_save";
import { set_camp_controlles } from "./F_set_camp_controlles";

var   idx: number = 0;
var   save_UL_list: HTMLUListElement;
var   form_title:   HTMLInputElement;
var   form_detail:  HTMLTextAreaElement;
var   form_point:   HTMLParagraphElement;

export type T_save_list = {
    id:        number,
    title:     string,
    detail:    string,
    point:     string,
    save_time: string,
    auto_mode: string,
    __is_new:  boolean,
}

var   save_list:    T_save_list[];
var   link_list:    T_save_list[];

export function clr_save_controlles(): void {
    const u_arrow = document.getElementById('u_arrow') as HTMLButtonElement;
    const d_arrow = document.getElementById('d_arrow') as HTMLButtonElement;
    const y_btn   = document.getElementById('y_btn')   as HTMLButtonElement;
    const n_btn   = document.getElementById('n_btn')   as HTMLButtonElement;

    u_arrow.removeEventListener("click", do_U, false);
    d_arrow.removeEventListener("click", do_D, false);
    y_btn  .removeEventListener("click", isOK, false);
    n_btn  .removeEventListener("click", isNG, false);

    window.removeEventListener('keypress', key_press_function5);

    u_arrow.style.setProperty('display', 'none');
    d_arrow.style.setProperty('display', 'none');
    y_btn  .style.setProperty('display', 'none');
    n_btn  .style.setProperty('display', 'none');
}

export function set_save_controlles(): void {
    hide_controlles();
    g_ctls_mode[0] = T_CtlsMode.Save;

    const u_arrow = document.getElementById('u_arrow') as HTMLButtonElement;
    const d_arrow = document.getElementById('d_arrow') as HTMLButtonElement;
    const y_btn   = document.getElementById('y_btn')   as HTMLButtonElement;
    const n_btn   = document.getElementById('n_btn')   as HTMLButtonElement;

    u_arrow.addEventListener("click", do_U, false);
    d_arrow.addEventListener("click", do_D, false);
    y_btn  .addEventListener("click", isOK, false);
    n_btn  .addEventListener("click", isNG, false);

    window.addEventListener('keypress', key_press_function5);

    u_arrow.style.setProperty('display', 'block');
    d_arrow.style.setProperty('display', 'block');
    y_btn  .style.setProperty('display', 'block');
    n_btn  .style.setProperty('display', 'block');

    const ctl_view = document.getElementById('move_ctl_view') as HTMLDivElement;
    ctl_view?.style.setProperty('display', 'block');

    display_save_list();
}


function key_press_function5(e: KeyboardEvent):void  {
    switch(e.code) { // Arrowは反応せず(イベント自体が発生せず)
        case 'ArrowUp': 
        case 'KeyK': 
        case 'Numpad5': 
            (document.getElementById('u_arrow') as HTMLButtonElement)?.click();
            return;
        case 'ArrowDown': 
        case 'KeyJ': 
        case 'Numpad2': 
            (document.getElementById('d_arrow') as HTMLButtonElement)?.click();
            return;
        case 'KeyO':
        case 'KeyY':
        case 'Digit0':
        case 'Enter':
        case 'NumpadEnter':
            (document.getElementById('y_btn') as HTMLButtonElement)?.click();
            return;
        case 'KeyN':
        case 'KeyX':
        case 'Numpad0':
        case 'NumpadAdd':
//        case 'NumpadSubtract':
            (document.getElementById('n_btn') as HTMLButtonElement)?.click();
            return;
    }
}

function isOK() {
    if (save_UL_list === null) return;

    const children = save_UL_list.children;
    if (idx < 0 || idx > children.length - 1) return;

    check(idx);
}

function isNG() {
    set_camp_controlles();
    g_vsw.view_camp();
}


function do_U() {
    if (idx < 1) return;
    --idx;
    g_mes.normal_message(`Up! (${idx})`);
    high_light_on(); form_set();
}

function do_D() { 
    if (idx > link_list.length - 2) return;
    ++idx; 
    g_mes.normal_message(`Down... (${idx})`);
    high_light_on();  form_set();
}

function high_light_on(): void {
    if (save_UL_list === null) return;

    const children = save_UL_list.children;
    if (idx < 0 || idx > children.length - 1) return;

    for (var i = 0; i < children.length; i++) {
        const li = children.item(i) as HTMLLIElement;
        __high_light_on(li, false);
    }
    const li = children.item(idx) as HTMLLIElement;
    __high_light_on(li, true);
}

function __high_light_on(elm: HTMLElement | null, isOn: boolean): void {
    if (elm === null) return;
    const bg_color = elm.parentElement?.style.getPropertyValue('background-color') ?? 'white';
    elm.style.setProperty('background-color', bg_color);

    elm.style.setProperty('mix-blend-mode',   isOn ? 'differnce' : 'normal');
    elm.style.setProperty('font-weight',      isOn ? 'bold' : 'normal');
    for (var j = 0; j < elm.children.length; j++) {
        const p = elm.children.item(j) as HTMLElement;
        p.style.setProperty('display', isOn ? 'block' : 'none');
    }
}

function form_set():void {
    const children = save_UL_list.children;
    if (idx < 0 || idx > children.length - 1) return;

    form_title .setAttribute('value', link_list[idx].title);
    form_detail.innerText = link_list[idx].detail;
    form_point .innerHTML = link_list[idx].point;
// 以下は実際のセーブの時に使う
//    form_point .innerHTML = `『${g_maze.get_title()}』迷宮 ` 
//        + `地下 ${g_team.get_p().z + 1}階 ` 
//        + `(X= ${g_team.get_p().x}, Y=${g_team.get_p().y})`;
}

export function display_save_list() {
    get_save_info()?.then(jsonObj => {
        if (jsonObj === null || jsonObj === undefined) {
            g_mes.warning_message('セーブ情報の受信に失敗しました。【受信データ無し】');
            return undefined;
        }
        if (jsonObj.ecode !== 0) {
            g_mes.warning_message(`『${jsonObj.emsg}』(${jsonObj.ecode})`);
            g_mes.warning_message('セーブ情報の受信に失敗しました。');
            return undefined;
        }
        try {
            save_list = [] as T_save_list[];
            for (var save_item of jsonObj.save) {
                save_list.push({
                    id:        (save_item?.save_id    ?? 0),
                    title:     (save_item?.title      ?? '??? Unknown Title'),
                    detail:    (save_item?.detail     ?? '???'),
                    point:     (save_item?.point      ?? '???'),
                    save_time: (save_item?.save_time  ?? '????-??-?? ??:??:??'),
                    auto_mode: (save_item?.auto_mode  ?? 'N'),
                    __is_new:   false,
                } as T_save_list)
            }
            for (var j = save_list.length - 2; j < 10; j++) { // -2は自動保存の分
                save_list.push({
                    id:         -1,
                    title:      `保存データ #${j + 1}`,
                    detail:    '',
                    point:     '',
                    save_time: '',
                    auto_mode: 'N',
                    __is_new:   true,
                })
            }

            save_UL_list = document.getElementById('save_data_list') as HTMLUListElement;
            if (save_UL_list === null) return;
        
            while (save_UL_list.firstChild !== null) {
                save_UL_list.removeChild(save_UL_list.firstChild);
            }

            link_list = [] as T_save_list[];
            for (var i in save_list) {
                const li = document.createElement('li') as HTMLLIElement;
                switch (save_list[i].title) {
                    case '__InstantSaveData__':
//                        save_list[i].title  = '簡易保存データ';
//                        save_list[i].detail = 'デバッグモードで簡易保存したデータです';
//                        break;
                        continue;
                    case '__UpDownSaveData__':
//                        save_list[i].title  = 'フロア移動直前データ';
//                        save_list[i].detail = '一番最近のフロア移動直前に自動保存したデータです';
//                        break;
                        continue;
                }
                li.innerHTML = `『${save_list[i].title}<p>保存日時: ${save_list[i].save_time}</p>`;
//                if (save_list[i].auto_mode == 'Y') li.style.setProperty('display','none');
                save_UL_list.appendChild(li);
                link_list.push(save_list[i]);
            }

            form_title  = document.getElementById('save_data_title')  as HTMLInputElement;
            form_detail = document.getElementById('save_data_detail') as HTMLTextAreaElement;
            form_point  = document.getElementById('save_data_point')  as HTMLParagraphElement; 

            g_vsw.view_save();
            idx = 0; high_light_on(); form_set()
        
            return;
        } catch (err) {
            g_mes.warning_message(err as unknown as string);
            g_mes.warning_message('セーブ情報の受信に失敗しました。【データ不一致】');
            return;
        }
    });
}

function check(idx: number): void{ // 入力チェックと既存データ上書きの確認
    if (idx < 0 || idx > link_list.length - 1) {
        g_mes.warning_message(`check!! No longer access idx!『${link_list[idx].title}』(id: ${link_list[idx].id})`);
    }
    if (link_list[idx].auto_mode == 'Y') {
        g_mes.warning_message(`check!! This is Auto Mode!『${link_list[idx].title}』(id: ${link_list[idx].id})`);
    }
    g_mes.normal_message(`check 『${link_list[idx].title}』(id: ${link_list[idx].id})`);
    save(idx);
}

function save(idx: number): void{
    g_mes.normal_message(`save 『${link_list[idx].title}』(id: ${link_list[idx].id})`);
}
