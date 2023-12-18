import { C_Maze } from "./C_Maze";
import { C_Hero } from "./C_Hero";
import { I_HasHope, I_HopeAction } from "./I_EventMap";
import { T_MzKind } from "./T_MzKind";
import { display_maze2D, display_maze_3D } from "./F_display_maze";

export function set_move_controlles(maze: C_Maze, hero: C_Hero) {
    hide_controlles();
    const u_arrow = document.getElementById('u_arrow') as HTMLButtonElement;
    const d_arrow = document.getElementById('d_arrow') as HTMLButtonElement;
    const r_arrow = document.getElementById('r_arrow') as HTMLButtonElement;
    const l_arrow = document.getElementById('l_arrow') as HTMLButtonElement;

    u_arrow?.addEventListener("click", ()=>{go_forward(maze, hero);}, false);
    d_arrow?.addEventListener("click", ()=>{go_back(maze, hero);},    false);
    r_arrow?.addEventListener("click", ()=>{turn_r(maze, hero);},     false);
    l_arrow?.addEventListener("click", ()=>{turn_l(maze, hero);},     false);

    document.addEventListener('keypress', (event)=>{
        switch(event.code) { // Arrowは反応せず(イベント自体が発生せず)
            case 'ArrowUp': 
            case 'KeyK': 
            case 'Numpad5': 
                u_arrow?.click();break;
            case 'ArrowDown': 
            case 'KeyJ': 
            case 'Numpad2': 
                d_arrow?.click();break;
            case 'ArrowRight': 
            case 'KeyL': 
            case 'Numpad3': 
                r_arrow?.click();break;
            case 'ArrowLeft': 
            case 'KeyH': 
            case 'Numpad1': 
                l_arrow?.click();break;
        }
    });
    const ctl_view = document.getElementById('move_ctl_view') as HTMLDivElement;
    ctl_view?.style.setProperty('display', 'block');
}

    /************ *************************** **************/
    /*  HTMLPreElement = document.createElement('pre');    */
    /*  HTMLElement?.setAttribute('id', 'u_arraw');        */
    /*  HTMLElement?.style.setProperty('display', 'grid'); */
    /*  HTMLElement?.appendChild(HTMLElement);             */
    /************ *************************** **************/

function hide_controlles() {
    const move_ctl_view = document.getElementById('move_ctl_view') as HTMLDivElement;
    move_ctl_view?.style.setProperty('display', 'none');
}
    
function go_forward(maze: C_Maze, hero: C_Hero) {
    const rslt = hero.hope_p_fwd();
    move_check(rslt, maze);
    display_maze2D(maze);
    display_maze_3D(maze, hero);
}
function go_back(maze: C_Maze, hero: C_Hero) {
    const rslt = hero.hope_p_bak();
    move_check(rslt, maze);
    display_maze2D(maze);
    display_maze_3D(maze, hero);
}
function turn_r(maze: C_Maze, hero: C_Hero) {
    const rslt = hero.hope_turn_r();
    move_check(rslt, maze);
    display_maze2D(maze);
    display_maze_3D(maze, hero);
}
function turn_l(maze: C_Maze, hero: C_Hero) {
    const rslt = hero.hope_turn_l();
    move_check(rslt, maze);
    display_maze2D(maze);
    display_maze_3D(maze, hero);
}
function move_check(rslt: I_HasHope, maze: C_Maze) {
    if (!rslt.has_hope) return;
    const r = rslt as I_HopeAction;
    if (r.hope == 'Turn') {
        r.isOK();
        return;
    }
    if (r.hope == 'Move') {
        switch (maze.get_cell(r.subj)) {
            case T_MzKind.Floor: r.isOK();break;
            default: r.isNG();break;
        }
        return;
    }
} 
