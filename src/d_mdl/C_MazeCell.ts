import { T_MzKind, T_RvMzKind }    from "./T_MzKind";
import { C_Maze }                  from "./C_Maze";
import { C_Point }                 from "./C_Point";
import { I_Locate, T_Lckd }        from "./C_Location";
import { C_Range }                 from "./C_Range";
import { C_MazeObj, I_MazeObj, JSON_MazeObj } from "./C_MazeObj";
import { C_Team, JSON_Team }       from "./C_Team";
import { I_JSON_Uniq, JSON_Any }   from "./C_SaveData";
import { _get_uuid }               from "../d_utl/F_Rand";
import { _alert }                  from "../d_cmn/global";



export class C_MazeCell  {
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

