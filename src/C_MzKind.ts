    // 一般に使えるユーティリティな呪文
    // オブジェクトを列挙型として型化するのに利用
    import {T_MakeEnumType} from "./T_MakeEnumType";

    // ダンジョンマップのセルの種類を表す列挙型
    // NoDef: 未定義・不明
    // Floor: 床
    // Unexp: 未踏地
    // Stone: 石壁
    // Empty: 初期状態・何もなし
    // 
    // function to_int(MzKind):      int        列挙型に対応する値(整数値)を返す
    // function from_int(int):       T_MzKind     整数値に対応する列挙型を返す(クラスメソッド)
    // function to_letter(MzKind):   string     列挙型に対応する文字を返す(ダンジョンの2D表示用)
    // function from_letter(string): T_MzKind     文字に対応する列挙型を返す(クラスメソッド)

    export const T_MzKind:{[key: string]: number}  = {
        NoDef:   0,
        Floor:   1,
        Unexp:   2,
        Stone:   3,
        Unkwn:   4,
        Empty: 255,
    } as const;
    export type T_MzKind   = T_MakeEnumType<typeof T_MzKind>;

    const RvMzKind:{[key: number]: T_MzKind}  = {
        0:   T_MzKind.NoDef,
        1:   T_MzKind.Floor,
        2:   T_MzKind.Unexp,
        3:   T_MzKind.Stone,
        4:   T_MzKind.Unkwn,
        255: T_MzKind.Empty,
    } as const;
    type T_RvMzKind = T_MakeEnumType<typeof RvMzKind>;

    export class C_MzKind {
        protected v:T_MzKind;
        public constructor(v?: T_MzKind);
        public constructor(n?: number);
        public constructor(a?: any) {
            this.v = T_MzKind.NoDef;
            this.set(a);
        }
        public get():  T_MzKind {
            return this.v;
        }
        public set(v?: T_MzKind): void;
        public set(n?: number): void;
        public set(a?: any): void {
            if (typeof a === "undefined") {
                this.v = T_MzKind.NoDef;
            } else if (typeof a === "number") {
                this.v = RvMzKind[a];
            } else if (typeof a === "object") {
                this.v = a as T_MzKind;
            } else {
                this.v = T_MzKind.NoDef;
            }
        }
        public to_int(): number {
            return this.v as number;
        }
        public static from_int(num: number): C_MzKind {
            return new C_MzKind(num);
        }
        public to_letter(v?: T_MzKind): string {
            const kind = (typeof v === "undefined") ? this.v : v;
            switch (kind) {
                case T_MzKind.Floor: return '　';
                case T_MzKind.Unexp: return '・';
                case T_MzKind.Stone: return '＃';
                case T_MzKind.Unkwn: return '？';
                case T_MzKind.Empty: return 'Ｏ';
                case T_MzKind.NoDef: return 'Ｘ';
                default: return 'Ｘ';
            }
        }
        public static from_letter(str: string): T_MzKind {
            switch (str) {
                case '　': return T_MzKind.Floor;
                case '・': return T_MzKind.Unexp;
                case '＃': return T_MzKind.Stone;
                case '？': return T_MzKind.Unkwn;
                case 'Ｏ': return T_MzKind.Empty;
                case 'Ｘ': return T_MzKind.NoDef;
                default:   return T_MzKind.NoDef;
            }
        }
    }
