"use strict";

import { C_PointDir, T_Direction }           from "./C_PointDir";
import { C_MovablePoint, JSON_MovablePoint } from "./C_MovablePoint";
import { I_Locate }     from "./C_Location";
import { I_HopeAction } from "./I_Common";


export interface JSON_Walker extends JSON_MovablePoint {
}

export class C_Walker extends C_MovablePoint {
    constructor(j?: JSON_Walker) {
        super(j);
    }
    public get_x(): number {return this.loc_pos.x}
    public get_y(): number {return this.loc_pos.y}
    public get_z(): number {return this.loc_pos.z}

    public set_x(x: number): void {this.loc_pos.x = x}
    public set_y(y: number): void {this.loc_pos.y = y}
    public set_z(z: number): void {this.loc_pos.z = z}

    public set_place(
        place: I_Locate, 
        url?:  string, 
        pos?:  C_PointDir) {

        this.set_uid (place.uid());
        this.set_lckd(place.get_lckd());
        this.set_name(place.get_name());

        if (url !== undefined) this.set_url(url);
        if (pos !== undefined) {
            this.set_pd(pos);
        }
    }

    
    public hope_p_fwd(): I_HopeAction {
        return {
            has_hope: true, 
            hope: "Move",
            subj: this.get_p_fwd(),
            doOK: ()=>{this.set_p_fwd();},
            doNG: ()=>{this.isNG();},
           };
    }
    public hope_p_bak(): I_HopeAction {
        return {
            has_hope: true, 
            hope: "Move",
            subj: this.get_p_bak(),
            doOK: ()=>{this.set_p_bak();},
            doNG: ()=>{this.isNG();},
        };
    }
    
    public hope_p_lft(): I_HopeAction {
        return {
            has_hope: true, 
            hope: "Move",
            subj: this.get_p_lft(),
            doOK: ()=>{this.set_p_lft();},
            doNG: ()=>{this.isNG();},
           };
    }
    public hope_p_rgt(): I_HopeAction {
        return {
            has_hope: true, 
            hope: "Move",
            subj: this.get_p_rgt(),
            doOK: ()=>{this.set_p_rgt();},
            doNG: ()=>{this.isNG();},
        };
    }
    public hope_turn_r(): I_HopeAction {
        return {
            has_hope: true, 
            hope: "Turn",
            subj: this.get_pd(),
            doOK: ()=>{this.turn_r();},
            doNG: ()=>{this.isNG();},
        };
    }
    public hope_turn_l(): I_HopeAction {
        return {
            has_hope: true, 
            hope: "Turn",
            subj: this.get_pd(),
            doOK: ()=>{this.turn_l();},
            doNG: ()=>{this.isNG();},
        };
    }

    public hope_p_up(): I_HopeAction {
        return {
            has_hope: true, 
            hope: "Up",
            subj: this.get_p_up(),
            doOK: ()=>{this.move_p_up();},
            doNG: ()=>{this.isNG();},
        };
    }
    public hope_p_down(): I_HopeAction {
        return {
            has_hope: true, 
            hope: "Down",
            subj: this.get_p_down(),
            doOK: ()=>{this.move_p_down();},
            doNG: ()=>{this.isNG();},
        };
    }

    public move_p_up(): void {
        this.set_p_up();
    }
    public move_p_down(): void {
        this.set_p_down();
    }

    public isNG(): void {
        return;
    }


    public get_p_fwd(): C_PointDir {
        return this.__get_p_move(1, 0);
    }
    public set_p_fwd(): void {
        this.set_pd(this.get_p_fwd());
    }
    public get_p_bak(): C_PointDir {
        return this.__get_p_move(-1, 0);
    }
    public set_p_bak(): void {
        this.set_pd(this.get_p_bak());
    }
    public get_p_lft(): C_PointDir {
        return this.__get_p_move(0, -1);
    }
    public set_p_lft(): void {
        this.set_pd(this.get_p_lft());
    }
    public get_p_rgt(): C_PointDir {
        return this.__get_p_move(0, 1);
    }
    public set_p_rgt(): void {
        this.set_pd(this.get_p_rgt());
    }
    public get_p_up(): C_PointDir {
        const p = new C_PointDir(this.loc_pos);
        p.z--;
        return p;
    }
    public set_p_up() {
        this.set_pd(this.get_p_up());
    }
    public get_p_down(): C_PointDir {
        const p = new C_PointDir(this.loc_pos);
        p.z++;
        return p;
    }
    public set_p_down() {
        this.set_pd(this.get_p_down());
    }
    protected __get_p_move(offsetFB: number, offsetLR: number): C_PointDir {
        const p = new C_PointDir(this.loc_pos);
        if (offsetFB !== 0) {
            switch (this.loc_pos.d) {
                case T_Direction.N: p.y -= offsetFB;break;
                case T_Direction.E: p.x += offsetFB;break;
                case T_Direction.S: p.y += offsetFB;break;
                case T_Direction.W: p.x -= offsetFB;break;
            }
        }
        if (offsetLR !== 0) {
            switch (this.loc_pos.d) {
                case T_Direction.N: p.x += offsetLR;break;
                case T_Direction.E: p.y += offsetLR;break;
                case T_Direction.S: p.x -= offsetLR;break;
                case T_Direction.W: p.y -= offsetLR;break;
            }
        }
        return p;
    }
    public get_around(front: number, right:number, up: number = 0): C_PointDir {
        var target_x  = this.loc_pos.x;
        var target_y  = this.loc_pos.y;
        var target_z  = this.loc_pos.z - up;
        switch (this.loc_pos.d) {
            case T_Direction.N:
                target_x += right;
                target_y -= front;
                break;
            case T_Direction.E:
                target_x += front;
                target_y += right;
                break;
            case T_Direction.S:
                target_x -= right;
                target_y += front;
                break;
            case T_Direction.W:
                target_x -= front;
                target_y -= right;
                break;
        }
        return new C_PointDir({x: target_x, y: target_y, z: target_z, d: this.loc_pos.d});
    }
    public turn_r(): void {
        switch (this.loc_pos.d) {
            case T_Direction.N: this.loc_pos.d = T_Direction.E;break;
            case T_Direction.E: this.loc_pos.d = T_Direction.S;break;
            case T_Direction.S: this.loc_pos.d = T_Direction.W;break;
            case T_Direction.W: this.loc_pos.d = T_Direction.N;break;
        }
    }
    public turn_l(): void {
        switch (this.loc_pos.d) {
            case T_Direction.N: this.loc_pos.d = T_Direction.W;break;
            case T_Direction.E: this.loc_pos.d = T_Direction.N;break;
            case T_Direction.S: this.loc_pos.d = T_Direction.E;break;
            case T_Direction.W: this.loc_pos.d = T_Direction.S;break;
        }
    }
    public turn_b(): void {
        switch (this.loc_pos.d) {
            case T_Direction.N: this.loc_pos.d = T_Direction.S;break;
            case T_Direction.E: this.loc_pos.d = T_Direction.W;break;
            case T_Direction.S: this.loc_pos.d = T_Direction.N;break;
            case T_Direction.W: this.loc_pos.d = T_Direction.W;break;
        }
    }
    public encode(): JSON_Walker {
        const j = super.encode() as JSON_Walker;
        return j;
    }
    public decode(a: JSON_Walker): C_Walker {
        if (a === undefined) return this;
        super.decode(a);
        return this;
    }
}

