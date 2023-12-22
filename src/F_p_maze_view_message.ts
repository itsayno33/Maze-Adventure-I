

export function init_p_maze_view_message() {
    clear_p_maze_view_message();
}

export class C_maze_view_message {
    protected p: HTMLParagraphElement;
    public constructor() {
        this.p = document.getElementById('Maze_view_message') as HTMLParagraphElement;
    }
}
export function clear_p_maze_view_message() {
    display_p_maze_view_message('　');
}

export function display_p_maze_view_message(mes: string) {
    const p = document.getElementById('Maze_view_message') as HTMLParagraphElement;

    p.style.setProperty('background-color', 'inherit');
    p.style.setProperty('color',            'inherit');
    p.innerHTML = mes;
}


export function notice_p_maze_view_message(mes: string) {
    const p = document.getElementById('Maze_view_message') as HTMLParagraphElement;

    p.style.setProperty('background-color', '#ccffcc');
    p.style.setProperty('color',            '#006600');
    p.innerHTML = mes;
}

export function warning_p_maze_view_message(mes: string) {
    const p = document.getElementById('Maze_view_message') as HTMLParagraphElement;

    p.style.setProperty('background-color', '#ff0000');
    p.style.setProperty('color',            '#ffffff');
    p.innerHTML = mes;
}
