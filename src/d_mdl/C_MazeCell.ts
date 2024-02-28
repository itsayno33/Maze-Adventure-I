import { T_MzKind, T_RvMzKind } from "./T_MzKind";
import { C_Maze }               from "./C_Maze";
import { _get_uuid }            from "../d_utl/F_Rand";
import { _alert }               from "../d_cmn/global";
import { C_MazeObj, JSON_MazeObj } from "./C_MazeObj";
import { C_Point, JSON_Point } from "./C_Point";



export class C_MazeCell  {
    protected cell: T_MzKind;
/*
    protected maze: C_Maze;
    public constructor(m: C_Maze, v?: T_MzKind);
    public constructor(m: C_Maze, n?: number);
    public constructor(m: C_Maze, a?: any) {
*/
    public  static newObj(j: JSON_MazeCellObj): C_MazeCellObj {
        if (!(j.kind??99 in T_MzKind)) j.kind = T_MzKind.NoDef;
        return C_MazeCellObj.newObj({kind:j.kind, pos:{x:j.x, y:j.y, z:j.z}});
    }
    protected constructor(k?: T_MzKind) {
        this.cell = T_MzKind.NoDef;
        this.set(k);
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

export interface JSON_MazeCellObj extends JSON_MazeObj {
    kind?: T_MzKind,
}

class C_MazeCellObj extends C_MazeCell {
    protected my_obj: C_MazeObj;
    public static newObj(j: JSON_MazeCellObj): C_MazeCellObj {
        switch (j.kind) {
            case T_MzKind.NoDef: return new C_MazeCellNoDef(j); 
            case T_MzKind.Unkwn: return new C_MazeCellUnkwn(j); 
            case T_MzKind.Empty: return new C_MazeCellEmpty(j); 
            case T_MzKind.Floor: return new C_MazeCellFloor(j);
            case T_MzKind.Unexp: return new C_MazeCellUnexp(j);
            case T_MzKind.Stone: return new C_MazeCellStone(j);
            case T_MzKind.StrUp: return new C_MazeCellStrUp(j);
            case T_MzKind.StrDn: return new C_MazeCellStrDn(j); 
            case T_MzKind.StrUD: return new C_MazeCellStrUD(j);
        }
        return new C_MazeCellNoDef(j);
    }

    protected constructor(j: JSON_MazeCellObj) {
        super(j.kind);
        this.my_obj = new C_MazeObj({
            pos: {x:j.x, y:j.y, z:j.z},
            view: j.view,
            can_thr: '1', 
        });
    }
    public getObj(): C_MazeObj {return this.my_obj}
}

class C_MazeCellNoDef extends C_MazeCellObj {
    public constructor(j?: JSON_MazeCellObj|undefined) {
        j ??= {};
        j.can_thr = '0';
        j.pos     = {x:j.x, y:j.y, z:j.z};
        j.view    =  {
            layer: 0, letter: '謎', 
            show3D:  '0',
            pad_t: 0.0, pad_d: 0.0, pad_s: 0.0,
            col_f: '', col_b: '', col_s: '', col_t: '', col_d: '', 
            col_l: '', 
        }
        super(j);
    }
}

class C_MazeCellUnkwn extends C_MazeCellObj {
    public constructor(j?: JSON_MazeCellObj|undefined) {
        j ??= {};
        j.can_thr = '0';
        j.pos     = {x:j.x, y:j.y, z:j.z};
        j.view    =  {
            layer: 0, letter: '謎', 
            show3D:  '0',
            pad_t: 0.0, pad_d: 0.0, pad_s: 0.0,
            col_f: '', col_b: '', col_s: '', col_t: '', col_d: '', 
            col_l: '', 
            }
        super(j);
    }
}

class C_MazeCellEmpty extends C_MazeCellObj {
    public constructor(j?: JSON_MazeCellObj|undefined) {
        j ??= {};
        j.can_thr = '1';
        j.pos     = {x:j.x, y:j.y, z:j.z};
        j.view    =  {
            layer: 0, letter: '謎', 
            show3D:  '0',
            pad_t: 0.0, pad_d: 0.0, pad_s: 0.0,
            col_f: '', col_b: '', col_s: '', col_t: '', col_d: '', 
            col_l: '', 
            }
        super(j);
    }
}

class C_MazeCellFloor extends C_MazeCellObj {
    public constructor(j?: JSON_MazeCellObj|undefined) {
        j ??= {};
        j.can_thr = '1';
        j.pos     = {x:j.x, y:j.y, z:j.z};
        j.view    =  {
            layer: 0, letter: '　', 
            show3D:  '1',
            pad_t: 0.0, pad_d: 0.0, pad_s: 0.0,
            col_f: '', col_b: '', col_s: '', col_t: '#6666ff', col_d: '', 
            col_l: '#9999ff', 
        }
        super(j);
    }
}

class C_MazeCellUnexp extends C_MazeCellObj {
    public constructor(j?: JSON_MazeCellObj|undefined) {
        j ??= {};
        j.can_thr = '1';
        j.pos     = {x:j.x, y:j.y, z:j.z};
        j.view    =  {
            layer: 0, letter: '・', 
            show3D:  '1',
            pad_t: 0.0, pad_d: 0.0, pad_s: 0.0,
            col_f: '', col_b: '', col_s: '', col_t: '#66ffff', col_d: '', 
            col_l: '#9999ff', 
        }
        super(j);
    }
}

class C_MazeCellStone extends C_MazeCellObj {
    public constructor(j?: JSON_MazeCellObj|undefined) {
        j ??= {};
        j.can_thr = '0';
        j.pos     = {x:j.x, y:j.y, z:j.z};
        j.view    =  {
            layer: 0, letter: '＃', 
            show3D:  '1',
            pad_t: 0.0, pad_d: 0.0, pad_s: 0.0,
            col_f: '#00ff00', col_b: '', col_s: '#00ee00', col_t: '', col_d: '', 
            col_l: '#0000ff', 
        }
        super(j);
    }
}

class C_MazeCellStrUp extends C_MazeCellObj {
    public constructor(j?: JSON_MazeCellObj|undefined) {
        j ??= {};
        j.can_thr = '1';
        j.pos     = {x:j.x, y:j.y, z:j.z};
        j.view    =  {
            layer: 0, letter: '上', 
            show3D:  '1',
            pad_t: 0.0, pad_d: 0.0, pad_s: 0.0,
            col_f: '', col_b: '', col_s: '', col_t: '#ffffcc', col_d: '#ffffcc', 
            col_l: '#0000ff', 
        }
        super(j);
    }
}

class C_MazeCellStrDn extends C_MazeCellObj {
    public constructor(j?: JSON_MazeCellObj|undefined) {
        j ??= {};
        j.can_thr = '1';
        j.pos     = {x:j.x, y:j.y, z:j.z};
        j.view    =  {
            layer: 0, letter: '下', 
            show3D:  '1',
            pad_t: 0.0, pad_d: 0.0, pad_s: 0.0,
            col_f: '', col_b: '', col_s: '', col_t: '#ffffcc', col_d: '#ffffcc', 
            col_l: '#0000ff', 
        }
        super(j);
    }
}

class C_MazeCellStrUD extends C_MazeCellObj {
    public constructor(j?: JSON_MazeCellObj|undefined) {
        j ??= {};
        j.can_thr = '1';
        j.pos     = {x:j.x, y:j.y, z:j.z};
        j.view    =  {
            layer: 0, letter: '段', 
            show3D:  '1',
            pad_t: 0.0, pad_d: 0.0, pad_s: 0.0,
            col_f: '', col_b: '', col_s: '', col_t: '#ffffcc', col_d: '#ffffcc', 
            col_l: '#0000ff', 
        }
        super(j);
    }
}
