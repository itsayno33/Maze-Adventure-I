import { I_JSON_Uniq, JSON_Any }            from "./C_SaveInfo";
import { C_HeroAbility, JSON_Hero_Ability } from './C_HeroAbility';
import { _get_uuid, _irand, _nrand }        from "../d_utl/F_Rand";

export interface JSON_Abis extends JSON_Any {
    uniq_id?:    string,
    my_name?:    string,
    value?:      number,
    abi_p?:      JSON_Hero_Ability,
    abi_m?:      JSON_Hero_Ability,
}

export interface I_Abis extends I_JSON_Uniq {
    uid:           ()=>string, 
    name:          ()=>string, 
    gold:          ()=>number, 
    abi_p:         (key: string)=>number, 
    abi_m:         (key: string)=>number, 
    set_abi_p:     (abi: C_HeroAbility)=>void, 
    set_abi_m:     (abi: C_HeroAbility)=>void, 
}

export class C_Abis implements I_Abis {
    protected uniq_id:    string;
    protected my_name:    string;   // 下記の名前のうち、最新のもの
    protected value:      number;   // 下記の価値のうち、最新のもの
    protected gnrl_ratio: number;
    protected my_abi_p:   C_HeroAbility;
    protected my_abi_m:   C_HeroAbility;

    public constructor(j?: JSON_Abis) {
        this.uniq_id    = 'abis_' + _get_uuid();
        this.my_name    = ''; 
        this.value      =  0; 

        this.gnrl_ratio= 1.0;

        this.my_abi_p    = new C_HeroAbility();
        this.my_abi_m    = new C_HeroAbility();

        if (j !== undefined) this.decode(j);
    }

    public uid():        string {return this.uniq_id;};
    public name():       string {return this.my_name};
    public gold():       number {return this.value};

    public abi_p(key: string): number {
        const val = this.my_abi_p.get(key);
        if (val === undefined) return 0;
        return Math.round(val * this.gnrl_ratio);
    }
    public abi_m(key: string): number {
        const val = this.my_abi_m.get(key);
        if (val === undefined) return 0;
        return Math.round(val * this.gnrl_ratio);
    }
    public set_abi_p(abi: C_HeroAbility): void {
        this.my_abi_p = abi;
    }
    public set_abi_m(abi: C_HeroAbility): void {
        this.my_abi_m = abi;
    }

    public encode(): JSON_Abis {
        return {
            uniq_id:    this.uniq_id,
            my_name:    this.my_name,
            value:      this.value,
            gnrl_ratio: this.gnrl_ratio,
            abi_p:      this.my_abi_p.encode(),
            abi_m:      this.my_abi_m.encode(),
        }
    }

    public decode(j: JSON_Abis): C_Abis {
        if (j === undefined) return this;

        if (j.uniq_id    !== undefined) this.uniq_id    = j.uniq_id;
        if (j.my_name    !== undefined) this.my_name    = j.my_name;
        if (j.value      !== undefined) this.value      = j.value;
        if (j.gnrl_ratio !== undefined) this.gnrl_ratio = j.gnrl_ratio;
        if (j.abi_p      !== undefined) this.my_abi_p.decode(j.abi_p);
        if (j.abi_m      !== undefined) this.my_abi_m.decode(j.abi_m);

        return this;
    }
}

