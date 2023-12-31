import { 
    hide_default_contrlles, 
    display_default_controlles 
} from "./F_default_menu";

export function hide_hres_menu(): void {
    hide_default_contrlles({
        do_U: do_U,
        do_D: do_D,
        do_L: do_L,
        do_R: do_R,
        isOK: isOK,
        isNG: isNG,
        keyEvent: true,
    });

    const div = document.getElementById('gld_view_switch_hres') as HTMLDivElement;
    if (div === null) return;
    div.style.setProperty('display', 'none');
}

export function display_hres_menu(): void {
    const div = document.getElementById('gld_view_switch_hres') as HTMLDivElement;
    if (div === null) return;
    div.style.setProperty('display', 'block');

    display_default_controlles({
        do_U: do_U,
        do_D: do_D,
        do_L: do_L,
        do_R: do_R,
        isOK: isOK,
        isNG: isNG,
        keyEvent: true,
    });
}

function do_U(): void {}
function do_D(): void {}
function do_L(): void {}
function do_R(): void {}
function isOK(): void {}
function isNG(): void {}
