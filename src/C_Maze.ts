import { T_MzKind, T_RvMzKind } from "./T_MzKind";
import { C_Point }              from "./C_Point";

class C_MazeCell {
    protected cell:T_MzKind;
    public constructor(v?: T_MzKind);
    public constructor(n?: number);
    public constructor(a?: any) {
        this.cell = T_MzKind.NoDef;
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
    public static from_int(num: number): C_MazeCell {
        return new C_MazeCell(num);
    }
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
    protected maze_id: number;
    protected size_x:  number;
    protected size_y:  number;
    protected size_z:  number;
    protected cells :  C_MazeCell[][][];

    public constructor(
        maze_id: number,
        size_x:  number,
        size_y:  number,
        size_z:  number,
    ) {
        this.maze_id = maze_id;
        this.size_x = size_x;
        this.size_y = size_y;
        this.size_z = size_z;
        this.cells  = this.__init_maze(T_MzKind.Stone);
    }
    protected __init_maze(kind: T_MzKind = T_MzKind.Stone): C_MazeCell[][][] {
        const cells: C_MazeCell[][][] = Array(this.size_z) as C_MazeCell[][][];
        for (var z = 0; z < this.size_z; z++) {
            cells[z] = Array(this.size_y) as C_MazeCell[][];
            for (var y = 0; y < this.size_y; y++) {
                cells[z][y]  = Array(this.size_x) as C_MazeCell[];
                for (var x = 0; x < this.size_x; x++) {
                    cells[z][y][x] = new C_MazeCell(kind);
                }
            }
        }
        return cells;
    }
    public get_x_max(): number {return this.size_x;}
    public get_y_max(): number {return this.size_y;}
    public get_z_max(): number {return this.size_z;}
    public get_maze_cell (p: C_Point): C_MazeCell { // たぶん要らないメソッド
        return this.cells[p.z][p.y][p.x];
    }
    public get_cell (p: C_Point): T_MzKind {
        return this.cells[p.z][p.y][p.x].get();
    }
    public set_cell (p: C_Point, k: T_MzKind): void {
        this.cells[p.z][p.y][p.x].set(k);
    }
    public can_move(p: C_Point): boolean {
        if (p.x < 1 || p.x >= this.size_x || p.y < 1 || p.y >= this.size_y) return false;
        return true;
    }
    public can_UD(p: C_Point): boolean {
        if (p.z < 0 || p.z >= this.size_z) return false;
        // 未実装
        return false;
    }
    public to_string(floor: number = 0): string {
        var ret_str: string = '';
        for (var y = 0; y < this.size_y; y++) {
            for (var x = 0; x < this.size_x; x++) {
                ret_str += this.cells[floor][y][x].to_letter();
            }
            ret_str += "\n";
        }
        return ret_str;
    }
    public encode(): string {
        var z_array: string[] = [];
        for (var z = 0; z < this.size_z; z++) {
            var y_array: string[] = [];
            for (var y = 0; y < this.size_y; y++) {
                var x_array: string[] = [];
                for (var x = 0; x < this.size_x; x++) {
                    x_array.push(this.cells[z][y][x].encode());
                }
                y_array.push(x_array.join(':'));
            }
            z_array.push(y_array.join('&'));
        }
        return z_array.join('@');
    }
    public decode(str: string): void {
        for (var z = 0; z < this.size_z; z++)
        for (var y = 0; y < this.size_y; y++)
        for (var x = 0; x < this.size_x; x++) {
            this.cells[z][y][x].set(T_MzKind.Stone);
        }

        const z_array: string[] = str.split('@');
        const z_max = _min(this.size_z, z_array.length);
        for (var z = 0; z < z_max; z++) {
            const y_array: string[] = z_array[z].split('&');
            const y_max =  _min(this.size_y, y_array.length); 
            for (var y = 0; y < y_max; y++) {
                const x_array: string[] = y_array[y].split(':');
                const x_max =  _min(this.size_x, x_array.length); 
                for (var x = 0; x < x_max; x++) {
                    this.cells[z][y][x].decode(x_array[x]);
                }
            }
        }        
    }
}
function  _min(a: number, b: number): number {
    return (a <= b) ? a : b;
}

