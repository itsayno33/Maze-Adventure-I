"use strict";

import { _get_uuid } from "../d_utl/F_Rand";
import { T_MzKind }  from "./T_MzKind";
import { JSON_Any }  from "./C_SaveInfo";
import { C_MazeObj, I_MazeObj, JSON_MazeObj } from "./C_MazeObj";
import { T_Wall }    from './C_Wall';


export interface JSON_MazeCell extends JSON_Any {
    kind?: T_MzKind
    obj?:  JSON_MazeObj,
}

export class C_MazeCell  {
    protected kind:   T_MzKind;
    protected my_obj: I_MazeObj;

    public static newObj(j: JSON_MazeCell): C_MazeCell {
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

    protected constructor(j: JSON_MazeCell) {
        j.obj ??= {};
        j.obj.clname ??= this.constructor.name;

        this.kind   = j.kind ?? T_MzKind.NoDef;
        this.my_obj = C_MazeObj.newObj(j.obj);
    }
    public getObj():  I_MazeObj {return this.my_obj}
    public getKind(): T_MzKind {
        return this.kind;
    }

    public to_letter(): string {
        return this.my_obj.view()?.letter() ?? 'Ｘ';
    }
    public static from_letter(letter: string): number {
        for (const key of Object.keys(T_MzKind)) {
            if (letter === key) return T_MzKind[key];
        }
        return T_MzKind.NoDef;
    }

    public drow3D(frot: T_Wall, back: T_Wall): void {
        this.my_obj.view()?.drow3D(frot, back);
    }

    public encode(): string {
        return this.kind.toString(16).padStart(2,"0");
    }
    public static decode(str: string, j?: JSON_MazeCell): C_MazeCell|undefined {
         const kind = parseInt(str, 16) as T_MzKind;
         return C_MazeCell.newObj({kind: kind, pos: j?.pos});
    }
}

class C_MazeCellNoDef extends C_MazeCell {
    public constructor(j?: JSON_MazeCell|undefined) {
        j ??= {kind: T_MzKind.NoDef};
        j.obj ??= {};

        j.obj.can_thr = '0';
        j.obj.pos     = {x:j.x, y:j.y, z:j.z};
        j.obj.view    =  {
            layer: 0, letter: '疑', 
            show3D:  '0',
            pad_t: 0.0, pad_d: 0.0, pad_s: 0.0,
            col_f: '', col_b: '', col_s: '', col_t: '', col_d: '', 
            col_l: '', 
        }
        super(j);
    }
}

class C_MazeCellUnkwn extends C_MazeCell {
    public constructor(j?: JSON_MazeCell|undefined) {
        j ??= {kind: T_MzKind.Unkwn};
        j.obj ??= {};

        j.obj.can_thr = '0';
        j.obj.pos     = {x:j.x, y:j.y, z:j.z};
        j.obj.view    =  {
            layer: 0, letter: '謎', 
            show3D:  '0',
            pad_t: 0.0, pad_d: 0.0, pad_s: 0.0,
            col_f: '', col_b: '', col_s: '', col_t: '', col_d: '', 
            col_l: '', 
            }
        super(j);
    }
}

class C_MazeCellEmpty extends C_MazeCell {
    public constructor(j?: JSON_MazeCell|undefined) {
        j ??= {kind: T_MzKind.Empty};
        j.obj ??= {};

        j.obj.can_thr = '1';
        j.obj.pos     = {x:j.x, y:j.y, z:j.z};
        j.obj.view    =  {
            layer: 0, letter: '無', 
            show3D:  '0',
            pad_t: 0.0, pad_d: 0.0, pad_s: 0.0,
            col_f: '', col_b: '', col_s: '', col_t: '', col_d: '', 
            col_l: '', 
            }
        super(j);
    }
}

class C_MazeCellFloor extends C_MazeCell {
    public constructor(j?: JSON_MazeCell|undefined) {
        j ??= {kind: T_MzKind.Floor};
        j.obj ??= {};

        j.obj.can_thr = '1';
        j.obj.pos     = {x:j.x, y:j.y, z:j.z};
        j.obj.view    =  {
            layer: 0, letter: '　', 
            show3D:  '1',
            pad_t: 0.0, pad_d: 0.0, pad_s: 0.0,
            col_f: '', col_b: '', col_s: '', col_t: '#6666ff', col_d: '', 
            col_l: '#9999ff', 
        }
        super(j);
    }
}

class C_MazeCellUnexp extends C_MazeCell {
    public constructor(j?: JSON_MazeCell|undefined) {
        j ??= {kind: T_MzKind.Unexp};
        j.obj ??= {};

        j.obj.can_thr = '1';
        j.obj.pos     = {x:j.x, y:j.y, z:j.z};
        j.obj.view    =  {
            layer: 0, letter: '・', 
            show3D:  '1',
            pad_t: 0.0, pad_d: 0.0, pad_s: 0.0,
            col_f: '', col_b: '', col_s: '', col_t: '#66ffff', col_d: '', 
            col_l: '#9999ff', 
        }
        super(j);
    }
}

class C_MazeCellStone extends C_MazeCell {
    public constructor(j?: JSON_MazeCell|undefined) {
        j ??= {kind: T_MzKind.Stone};
        j.obj ??= {};

        j.obj.can_thr = '0';
        j.obj.pos     = {x:j.x, y:j.y, z:j.z};
        j.obj.view    =  {
            layer: 0, letter: '＃', 
            show3D:  '1',
            pad_t: 0.0, pad_d: 0.0, pad_s: 0.0,
            col_f: '#00ff00', col_b: '', col_s: '#00ee00', col_t: '', col_d: '', 
            col_l: '#0000ff', 
        }
        super(j);
    }
}

class C_MazeCellStrUp extends C_MazeCell {
    public constructor(j?: JSON_MazeCell|undefined) {
        j ??= {kind: T_MzKind.StrUp};
        j.obj ??= {};

        j.obj.can_thr = '1';
        j.obj.pos     = {x:j.x, y:j.y, z:j.z};
        j.obj.view    =  {
            layer: 0, letter: '上', 
            show3D:  '1',
            pad_t: 0.0, pad_d: 0.0, pad_s: 0.0,
            col_f: '', col_b: '', col_s: '', col_t: '', col_d: '#ffffcc', 
            col_l: '#0000ff', 
        }
        super(j);
    }
}

class C_MazeCellStrDn extends C_MazeCell {
    public constructor(j?: JSON_MazeCell|undefined) {
        j ??= {kind: T_MzKind.StrDn};
        j.obj ??= {};

        j.obj.can_thr = '1';
        j.obj.pos     = {x:j.x, y:j.y, z:j.z};
        j.obj.view    =  {
            layer: 0, letter: '下', 
            show3D:  '1',
            pad_t: 0.0, pad_d: 0.0, pad_s: 0.0,
            col_f: '', col_b: '', col_s: '', col_t: '#ffffcc', col_d: '', 
            col_l: '#0000ff', 
        }
        super(j);
    }
}

class C_MazeCellStrUD extends C_MazeCell {
    public constructor(j?: JSON_MazeCell|undefined) {
        j ??= {kind: T_MzKind.StrUD};
        j.obj ??= {};

        j.obj.can_thr = '1';
        j.obj.pos     = {x:j.x, y:j.y, z:j.z};
        j.obj.view    =  {
            layer: 0, letter: '段', 
            show3D:  '1',
            pad_t: 0.0, pad_d: 0.0, pad_s: 0.0,
            col_f: '', col_b: '', col_s: '', col_t: '#ffffcc', col_d: '#ffffcc', 
            col_l: '#0000ff', 
        }
        super(j);
    }
}
