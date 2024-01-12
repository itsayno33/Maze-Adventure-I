import { T_MzKind, T_RvMzKind } from "./T_MzKind";
import { C_Point }              from "./C_Point";
import { C_Range }              from "./C_Range";
import { I_Exist }              from "./I_EventMap";
import { C_Team }               from "./C_Team";
import { _get_uuid } from "./F_Rand";
import { _alert } from "./global";

export type JSON_Maze = {
    id?:      number,
    uniq_id?: string,
    save_id?: number,
    floor?:   number,
    name?:    string,
    size_x?:  number,
    size_y?:  number,
    size_z?:  number,
    maze?:    string, 
    mask?:    string, 
    objs?:    string[],
}


export function alert_maze_info(a: JSON_Maze|undefined): void {
    if (a === undefined) return;

    _alert("Maze Info:"
        + "\nmaze id :" + (a.id      ?? '?')
        + "\nfloor: "   + (a.floor   ?? '?')
        + "\nuniq id :" + (a.uniq_id ?? '?')
        + "\nsave id :" + (a.save_id ?? '?')
        + "\nname:   "  + (a.name    ?? '?')
        + "\nsize_x: "  + (a.size_x  ?? '?')
        + "\nsize_y: "  + (a.size_y  ?? '?')
        + "\nsize_z: "  + (a.size_z  ?? '?')
        + "maze:\n"     + (a.maze    ?? '?')
        + "mask:\n"     + (a.mask    ?? '?')
        + "\n"
    );
}


class C_MazeCell  {
    protected cell: T_MzKind;
    protected maze: C_Maze;
    public constructor(m: C_Maze, v?: T_MzKind);
    public constructor(m: C_Maze, n?: number);
    public constructor(m: C_Maze, a?: any) {
        this.cell = T_MzKind.NoDef;
        this.maze = m;
        this.set(a);
    }
    public get():  T_MzKind {
        return this.cell;
    }
    public set(v?: T_MzKind): void;
    public set(n?: number): void;
    public set(a?: any): void {
        if (typeof a === "undefined") {
            this.cell = T_MzKind.NoDef;
        } else if (typeof a === "number") {
            this.cell = T_RvMzKind[a];
        } else if (typeof a === "object") {
            this.cell = a as T_MzKind;
        } else {
            this.cell = T_MzKind.NoDef;
        }
    }
    public to_int(v?: T_MzKind): number {
        const  kind:  T_MzKind = v ?? this.cell;
        return kind as number;
    }
    public static to_int(kind: T_MzKind): number {
        return kind as number;
    }
    // 普通にnewすれば良いのでたぶん要らない
    /*
    public static from_int(num: number): C_MazeCell {
        return new C_MazeCell(num);
    }
    */
    public to_letter(v?: T_MzKind): string {
        const kind: T_MzKind = v ?? this.cell;
        return C_MazeCell.to_letter(kind);
    }
    public static to_letter(kind: T_MzKind): string {
        switch (kind) {
            case T_MzKind.Floor: return '　';
            case T_MzKind.Unexp: return '・';
            case T_MzKind.Stone: return '＃';
            case T_MzKind.Unkwn: return '？';
            case T_MzKind.StrUp: return '上';
            case T_MzKind.StrDn: return '下';
            case T_MzKind.StrUD: return '通';
            case T_MzKind.Empty: return 'Ｏ';
            case T_MzKind.NoDef: return 'Ｘ';
            default: return 'Ｘ';
        }
    }
    public from_letter(str: string): T_MzKind {
        this.cell = C_MazeCell.from_letter(str);
        return this.cell;
    }
    public static from_letter(str: string): T_MzKind {
        switch (str) {
            case '　': return T_MzKind.Floor;
            case '・': return T_MzKind.Unexp;
            case '＃': return T_MzKind.Stone;
            case '？': return T_MzKind.Unkwn;
            case '上': return T_MzKind.StrUp;
            case '下': return T_MzKind.StrDn;
            case '通': return T_MzKind.StrUD;
            case 'Ｏ': return T_MzKind.Empty;
            case 'Ｘ': return T_MzKind.NoDef;
            default:   return T_MzKind.NoDef;
        }
    }
    public encode(): string {
        return C_MazeCell.encode(this.cell);
    }
    public static encode(v: T_MzKind): string {
        return (v as number).toString(16).padStart(2,"0");
    }
    public decode(str: string): void {
        this.cell = C_MazeCell.decode(str);
    }
    public static decode(str: string): T_MzKind {
        return parseInt(str, 16) as T_MzKind;
    }
}

export class C_Maze {
    protected maze_id:  number;
    protected uniq_id:  string;
    protected save_id:  number;
    protected floor:    number;
    protected name:     string;
    protected my_layer: number = 0;
    protected size:     C_Range;
    protected cells:    C_MazeCell[][][];
    protected masks:    boolean[][][];
    protected objs:     {[id: string]: I_Exist};
    public constructor(
        {maze_id = -1, save_id = -1, floor = 0, name = '', size_x = 3, size_y = 3, size_z = 1}: {
            maze_id?: number,
            save_id?: number,
            floor?:   number,
            name?:    string,
            size_x?:  number,
            size_y?:  number,
            size_z?:  number,
        }
    ) {
        this.maze_id = maze_id;
        this.uniq_id = 'mai_maze#' + _get_uuid();
        this.save_id = save_id;
        this.floor   = floor;
        this.name    = name;
        this.size    = new C_Range(
            new C_Point(0, 0, 0), 
            new C_Point(size_x - 1, size_y - 1, size_z - 1));
        this.cells   = this.__init_maze(T_MzKind.Stone);
        this.masks   = this.__init_mask(true);
        this.objs    = {};
    }
    public init(
        {maze_id, save_id, floor, name, size_x, size_y, size_z}: {
            maze_id: number,
            save_id: number,
            floor:   number,
            name:    string,
            size_x:  number,
            size_y:  number,
            size_z:  number,
        }
    ) {
        this.maze_id = maze_id;
        this.save_id = save_id;
        this.floor   = floor;
        this.name    = name;
        this.size    = new C_Range(
            new C_Point(0, 0, 0), 
            new C_Point(size_x - 1, size_y - 1, size_z - 1));
        this.cells   = this.__init_maze(T_MzKind.Stone);
        this.masks   = this.__init_mask(true);
        this.objs    = {};
    }
    protected __init_maze(kind: T_MzKind = T_MzKind.Stone): C_MazeCell[][][] {
        const size_x = this.size.size_x();
        const size_y = this.size.size_y();
        const size_z = this.size.size_z();

        const cells: C_MazeCell[][][] = Array(size_z) as C_MazeCell[][][];
        for (var z = 0; z < size_z; z++) {
            cells[z] = Array(size_y) as C_MazeCell[][];
            for (var y = 0; y < size_y; y++) {
                cells[z][y]  = Array(size_x) as C_MazeCell[];
                for (var x = 0; x < size_x; x++) {
                    cells[z][y][x] = new C_MazeCell(this, kind);
                }
            }
        }
        return cells;
    }
    protected __init_mask(YN: boolean): boolean[][][] {
        const size_x = this.size.size_x();
        const size_y = this.size.size_y();
        const size_z = this.size.size_z();

        const masks: boolean[][][] = Array(size_z) as boolean[][][];
        for (var z = 0; z < size_z; z++) {
            masks[z] = Array(size_y) as boolean[][];
            for (var y = 0; y < size_y; y++) {
                masks[z][y]  = Array(size_x) as boolean[];
                for (var x = 0; x < size_x; x++) {
                    masks[z][y][x] = YN;
                }
            }
        }
        return masks;
    }
    public get_uniq_id(): string { return this.uniq_id}


    public get_name(): string {
        return this.name;
    }

    public within(p: C_Point): boolean {
        return this.size.within(p);
    }
    
    // メイズ内のオブジェクトやモンスター等の配置
    public add_obj(obj: I_Exist): void {
        this.objs[obj.id()] = obj;
    }
    public remove_obj(obj: I_Exist): void {
        delete this.objs[obj.id()];
    }
    public get_obj_xyz(x: number, y: number, z: number): I_Exist|null {
        return this.get_obj(new C_Point(x, y, z));
    }
    public get_obj(p: C_Point): I_Exist|null {
        var layer = -1;
        var obj: I_Exist|null   = null;

        for (const id in this.objs) {
            const exist = this.objs[id];

            if (exist.within(p)) {
                if (exist.layer() > layer) {
                    layer = exist.layer();
                    obj   = exist;
                }
            }
        } 
        return obj;
    }

    // Teamが来たポイントが未踏地だったらただの床に変える
    public change_unexp_to_floor(p: C_Point) {
        if (this.get_cell(p) == T_MzKind.Unexp) {
            this.set_cell(p, T_MzKind.Floor);
        }
    }

    // 2Dマップのマスク外し関連
    public clear_mask_around_the_team(team: C_Team): void {
        // 現在地と真横は自動的に見える
        this.__clear_mask(team.get_around(0, -1));
        this.__clear_mask(team.get_around(0,  0));
        this.__clear_mask(team.get_around(0,  1));

        const depth   =  5; // 2Dマップ用の奥行き限界

        // 前方の見通しをチェックしながら見えるところは解放する
        for (var d = 1; d < depth; d++) {
            const front_pos = team.get_around(d, 0)
            if (this.is_movable(front_pos)) {
                // 正面に障害物が無ければ、その両側も見える
                this.__clear_mask(team.get_around(d, -1));
                this.__clear_mask(team.get_around(d,  0));
                this.__clear_mask(team.get_around(d,  1));
            } else {
                // 正面が障害物でもその手前まで見えてたなら、その壁と両側は見える
                this.__clear_mask(team.get_around(d, -1));
                this.__clear_mask(team.get_around(d,  0));
                this.__clear_mask(team.get_around(d,  1));
                // 正面に障害物が有ったらその奥は見えないので探索終了
                break;
            }
        }
    }
    protected __clear_mask(clr_pos: C_Point): void {
        if (!this.size.within(clr_pos)) return;
        this.masks[clr_pos.z][clr_pos.y][clr_pos.x] = false;
    }

    public is_movable(p: C_Point): boolean {
        if (!this.size.within(p)) return false;
        switch (this.get_cell(p)) {
            case T_MzKind.Floor:
            case T_MzKind.Unexp:
            case T_MzKind.StrUp:
            case T_MzKind.StrDn:
                return true;
        }
        return false;
    }    

    public get_x_max(): number {return this.size.size_x();}
    public get_y_max(): number {return this.size.size_y();}
    public get_z_max(): number {return this.size.size_z();}
    public get_maze_cell (p: C_Point): C_MazeCell|null { // たぶん要らないメソッド
        if (this.size.within(p)) return this.cells[p.z][p.y][p.x];
        return null;
    }
    public get_cell (p: C_Point): T_MzKind {
        if (this.size.within(p)) return this.cells[p.z][p.y][p.x].get();
        return T_MzKind.NoDef;
    }
    public set_cell (p: C_Point, k: T_MzKind): void {
        if (this.size.within(p)) this.cells[p.z][p.y][p.x].set(k);
    }
    public can_move(p: C_Point): boolean {
        return this.size.within(p);
    }
    public can_UD(p: C_Point): boolean {
        return this.is_movable(p);
    }
    public to_letter(p: C_Point): string {
        return this.cells[p.z][p.y][p.x].to_letter();
    }
    public to_string(floor: number = 0, debug_mode: boolean = false): string {
        const size_x = this.size.size_x();
        const size_y = this.size.size_y();

        var ret_str: string = '';
        for (var y = 0; y < size_y; y++) {
            for (var x = 0; x < size_x; x++) {
                const obj = this.get_obj_xyz(x, y, floor);
                if (!debug_mode && this.masks[floor][y][x]) {
                    ret_str += 'Ｘ';
                } else {
                    if (obj === null) {
                        ret_str += this.cells[floor][y][x].to_letter();
                    } else {
                        ret_str += obj.to_letter();
                    }
                }
            }
            ret_str += "\n";
        }
        return ret_str;
    }
    public encode(): JSON_Maze {
        const size_x = this.size.size_x();
        const size_y = this.size.size_y();
        const size_z = this.size.size_z();

        var z_array: string[] = [];
        for (var z = 0; z < size_z; z++) {
            var y_array: string[] = [];
            for (var y = 0; y < size_y; y++) {
                var x_array: string[] = [];
                for (var x = 0; x < size_x; x++) {
                    x_array.push(this.cells[z][y][x].encode());
                }
                y_array.push(x_array.join('X'));
            }
            z_array.push(y_array.join('Y'));
        }
        const maze_str = z_array.join('Z');

        var z_array: string[] = [];
        for (var z = 0; z < size_z; z++) {
            var y_array: string[] = [];
            for (var y = 0; y < size_y; y++) {
                var x_array: string[] = [];
                for (var x = 0; x < size_x; x++) {
                    x_array.push(this.masks[z][y][x] ? '1' : '0');
                }
                y_array.push(x_array.join('X'));
            }
            z_array.push(y_array.join('Y'));
        }
        const mask_str = z_array.join('Z');

        return {
            id:      this.maze_id,
            uniq_id: this.uniq_id,
            save_id: this.save_id,
            floor:   this.floor,
            name:    this.name,
            size_x:  this.size.size_x(),
            size_y:  this.size.size_y(),
            size_z:  this.size.size_z(),
            maze:    maze_str,
            mask:    mask_str,
        }
    }
    public decode(a: JSON_Maze|undefined): C_Maze {
        if (a === undefined) return this;

        if (a.id      !== undefined) this.maze_id = a.id;
        if (a.uniq_id !== undefined) this.uniq_id = a.uniq_id;
        if (a.save_id !== undefined) this.save_id = a.save_id;
        if (a.floor   !== undefined) this.floor   = a.floor;
        if (a.name    !== undefined) this.name    = a.name;
//        if (a.objs    !== undefined) this.objs    = a.objs as I_Exist[];

        if (a.size_x !== undefined && a.size_y !== undefined && a.size_z !== undefined) {
            this.size  = new C_Range(
                new C_Point(0, 0, 0), 
                new C_Point(a.size_x - 1, a.size_y - 1, a.size_z - 1)
                );
            this.cells   = this.__init_maze(T_MzKind.Stone);
            this.masks   = this.__init_mask(true);
        }

        const size_x = this.size.size_x();
        const size_y = this.size.size_y();
        const size_z = this.size.size_z();


        if (a.maze !== undefined) {
            for (var z = 0; z < size_z; z++)
            for (var y = 0; y < size_y; y++)
            for (var x = 0; x < size_x; x++) {
                this.cells[z][y][x].set(T_MzKind.Stone);
            }

            const z_array: string[] = a.maze.split('Z');
            const z_max = _min(size_z, z_array.length);
            for (var z = 0; z < z_max; z++) {
                const y_array: string[] = z_array[z].split('Y');
                const y_max =  _min(size_y, y_array.length); 
                for (var y = 0; y < y_max; y++) {
                    const x_array: string[] = y_array[y].split('X');
                    const x_max =  _min(size_x, x_array.length); 
                    for (var x = 0; x < x_max; x++) {
                        this.cells[z][y][x].decode(x_array[x]);
                    }
                }
            }  
        }
        if (a.mask !== undefined) {
            this.__init_mask(true);
            const z_array: string[] = a.mask.split('Z');
            const z_max = _min(size_z, z_array.length);
            for (var z = 0; z < z_max; z++) {
                const y_array: string[] = z_array[z].split('Y');
                const y_max =  _min(size_y, y_array.length); 
                for (var y = 0; y < y_max; y++) {
                    const x_array: string[] = y_array[y].split('X');
                    const x_max =  _min(size_x, x_array.length); 
                    for (var x = 0; x < x_max; x++) {
                        if (x_array[x] !== '0') {
                            this.masks[z][y][x] = true;
                        } else {
                            this.masks[z][y][x] = false;
                        }
                    }
                }
            }      
        }
        return this;
    }
    public static encode_all(all_maze: C_Maze[]): JSON_Maze[] {
        const all_maze_data: JSON_Maze[] = [];
        for (let maze of all_maze) {
            all_maze_data.push(maze.encode());
        }
        return all_maze_data;
    }
    public static decode_all(all_maze_data: JSON_Maze[]): C_Maze[] {
        const all_maze: C_Maze[] = [];
        for (let maze_data of all_maze_data) {
            all_maze.push((new C_Maze({})).decode(maze_data));
        }
        return all_maze;
    }
}
function  _min(a: number, b: number): number {
    return (a <= b) ? a : b;
}
function  _max(a: number, b: number): number {
    return (a >= b) ? a : b;
}

