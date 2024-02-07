import { I_JSON, JSON_Any } from "./C_SaveData";
import { T_MakeEnumType } from   "../d_utl/T_MakeEnumType";

export const T_GoodsKind:{[lckd: string]: number}  = {
    Unkn:  0,
    Arms:  1,
    Shld:  2,
    Drug:  3,
    Item:  5,
} as const;
export type T_GoodsKind = T_MakeEnumType<typeof T_GoodsKind>;

function T_GoodsKind_key(gdkd: T_GoodsKind): string {
    return Object.keys(T_GoodsKind).find(key => T_GoodsKind[key] === gdkd) ?? "Unkn";
}

const GoodsKind_mb_name: {[gdkd: number]: string} = {
    0:  '仕様バグのアイテム',
    1:  '武器',
    2:  '装備',
    3:  '薬',
    5:  '道具',
} as const;



export interface JSON_GoodsItem extends JSON_Any {
    uniq_id?:        string,
    gdkd?:           string,
    name?:           string,
    ambiguous_name?: string,
    confirmed_name?: string,
    own_name?:       string,
    is_confirmed?:   string,
}

export class C_GoodsItem implements I_JSON {
    protected uniq_id:        string;
    protected gdkd:           T_GoodsKind;
    protected name:           string;   // 下記の名前のうち、最新のもの
    protected ambiguous_name: string;   // 鑑定までの名前
    protected confirmed_name: string;   // 鑑定で確定した名前
    protected own_name:       string|undefined;  // 自分で命名したオリジナルの名前
    protected is_confirmed:   boolean; // 鑑定で確定(True)したか否(False)か

    public constructor(j?: JSON_GoodsItem) {
        this.uniq_id        = '';
        this.gdkd           = T_GoodsKind.Unkn;
        this.is_confirmed   = false; 
        this.ambiguous_name = ''; 
        this.confirmed_name = ''; 
        this.own_name       = undefined; 
        this.name = this.ambiguous_name; 
        if (j !== undefined) this.decode(j);
    }

    public uid(): string {return this.uniq_id;};
    public get_kind(): T_GoodsKind {return this.gdkd;};
    public get_name(): string {return this.name};

    public get_kind_name(): string {
        return GoodsKind_mb_name[this.gdkd];
    }

    public do_confirme(): string {
        this.is_confirmed   = true;
        this.name = this.own_name ?? this.confirmed_name;
        return this.name;
    }
    public set_own_name(own_name: string): string {
        this.own_name = own_name;
        this.name     = own_name;
        return this.name;
    }

    public encode(): JSON_GoodsItem {
        return {
            uniq_id:        this.uniq_id,
            gdkd:           T_GoodsKind_key(this.gdkd),
            name:           this.name,
            ambiguous_name: this.ambiguous_name,
            confirmed_name: this.confirmed_name,
            own_name:       this.own_name ?? '',
            is_confirmed:   this.is_confirmed ? '1' : '0',
        }
    }
    public decode(j: JSON_GoodsItem): C_GoodsItem {
        if (j === undefined) return this;

        if (j.uniq_id        !== undefined) this.uniq_id        = j.uniq_id;
        if (j.gdkd           !== undefined) this.gdkd           = T_GoodsKind[j.gdkd];
        if (j.name           !== undefined) this.name           = j.name;
        if (j.ambiguous_name !== undefined) this.ambiguous_name = j.ambiguous_name;
        if (j.confirmed_name !== undefined) this.confirmed_name = j.confirmed_name;
        if (j.is_confirmed   !== undefined) this.is_confirmed   = j.is_confirmed != '0' ? true : false;

        if (j.own_name !== undefined) this.own_name = j.own_name != '' ? j.own_name : undefined; 

        return this;
    }
    public static new_instance(j: JSON_GoodsItem): C_GoodsItem|undefined {
        if (j      === undefined) return undefined;
        if (j.gdkd === undefined) return undefined;

        const kind = T_GoodsKind[j.gdkd];
        switch (kind) {
            case T_GoodsKind.Arms:
            case T_GoodsKind.Shld:
            case T_GoodsKind.Drug:
            case T_GoodsKind.Item:
                return new C_GoodsItem(j);
            default:
                return undefined;
        }
    }
}


