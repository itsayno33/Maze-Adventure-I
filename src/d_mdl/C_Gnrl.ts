import { _get_uuid, _irand, _nrand } from "../d_utl/F_Rand";
import { I_Abis, JSON_Abis, C_Abis } from './C_Abis';
import { _round } from '../d_utl/F_Math';

export interface JSON_Gnrl extends JSON_Abis {
    gnrl_name?:  string,
    real_name?:  string,
    own_name?:   string,
    gnrl_value?: number,
    real_value?: number,
    own_value?:  number,
    is_real?:    string,
    is_orgn?:    string,
}

export interface I_Gnrl extends I_Abis {
    try_confirme:  (try_seed: number)=>number, 
    do_confirme:   ()=>string,
    set_own_name:  (org_name: string)=>string, 
    set_own_gold:  (org_gold: number)=>number, 
}

export class C_Gnrl extends C_Abis implements I_Gnrl{
    protected gnrl_name:  string;   // 鑑定までの名前
    protected real_name:  string;   // 鑑定で確定した名前
    protected orgn_name:  string|undefined;  // 自分で命名したオリジナルの名前
//    protected gnrl_value: number;  // 鑑定までの価値
//    protected real_value: number;  // 鑑定で確定した価値
    protected orgn_value: number|undefined;  // オリジナル化した後の価値
    protected is_real:    boolean; // 鑑定で確定(True)したか否(False)か
    protected is_orgn:    boolean; // オリジナル化したか否(False)か
    protected real_lv:    number;  // 鑑定の難易度(0から100)
    protected gnrl_ratio: number;  // 鑑定で確定する前の価値や能力値の割合(0から1)

    public constructor(j?: JSON_Gnrl) {
        super(j);

        this.is_real    = false; 
        this.is_orgn    = false; 

        this.gnrl_ratio = 0.1;
        this.real_lv    = 0.0;

        this.gnrl_name  = ''; 
        this.real_name  = ''; 
        this.orgn_name  = undefined; 
        this.my_name    = this.gnrl_name; 

//        this.gnrl_value = 0; 
//        this.real_value = 0; 
        this.orgn_value = undefined; 
//        this.value      = this.gnrl_value; 

        if (j !== undefined) this.decode(j);
    }

    public try_confirme(try_seed: number): number {
        const try_lv = try_seed + _nrand(-this.real_lv/10.0, this.real_lv/10.0);
        if (try_lv >= this.real_lv) {
           this.do_confirme();
           return 0; 
        }
        return this.real_lv - try_lv;
    }
    public do_confirme(): string {
        this.is_real   = true;
        this.my_name   = this.orgn_name  ?? this.real_name;
        this.value     = this.orgn_value ?? _round(this.value / this.gnrl_ratio,0);
        return this.my_name;
    }
    public set_own_name(orgn_name: string): string {
        this.orgn_name = orgn_name;
        this.my_name   = orgn_name;
        return this.my_name;
    }
    public set_own_gold(orgn_value: number): number {
        this.orgn_value = orgn_value;
        this.value      = orgn_value;
        return this.value;
    }

    public encode(): JSON_Gnrl {
        const j = super.encode() as JSON_Gnrl;
        j.gnrl_name  = this.gnrl_name;
        j.real_name  = this.real_name;
        j.orgn_name  = this.orgn_name ?? '';
//        j.gnrl_value = this.gnrl_value;
//        j.real_value = this.real_value;
        j.orgn_value = this.orgn_value ?? 0;
        j.is_real    = this.is_real ? '1' : '0';
        j.is_orgn    = this.is_orgn    ? '1' : '0';
        j.real_lv    = this.real_lv;
        j.gnrl_ratio = this.gnrl_ratio;

        return j;
    }
    public decode(j: JSON_Gnrl): C_Gnrl {
        if (j === undefined) return this;
        super.decode(j);

        if (j.real_lv    !== undefined) this.real_lv    = j.real_lv;
        if (j.gnrl_ratio !== undefined) this.gnrl_ratio = j.gnrl_ratio;
        if (j.is_real    !== undefined) this.is_real    = j.is_real    != '0' ? true : false;
        if (j.is_orgn    !== undefined) this.is_orgn    = j.is_orgn    != '0' ? true : false;

        if (j.gnrl_name  !== undefined) this.gnrl_name  = j.gnrl_name;
        if (j.real_name  !== undefined) this.real_name  = j.real_name;
        if (j.orgn_name  !== undefined) this.orgn_name  = j.orgn_name  !== '' ? j.orgn_name : undefined;
//        if (j.gnrl_value !== undefined) this.gnrl_value = j.gnrl_value;
//        if (j.real_value !== undefined) this.real_value = j.real_value;
        if (j.orgn_value !== undefined) this.orgn_value = j.orgn_value !== 0 ? j.orgn_value : undefined;

        if (this.orgn_name !== undefined) this.my_name = this.orgn_name;
        else this.my_name = this.is_real ? this.real_name : this.gnrl_name;

        if (this.orgn_value !== undefined) this.value = this.orgn_value;
//        else this.value = this.is_real ? this.real_value : this.gnrl_value;

        return this;
    }
}
