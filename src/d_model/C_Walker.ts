import { C_PointDir, T_Direction }   from "./C_PointDir";
import { C_Location, JSON_Location } from "./C_Location";
import { C_MovablePoint, JSON_MovablePoint } from "./C_MovablePoint";

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

    public get_p_fwd(): C_PointDir {
        return this.__get_p_move(1);
    }
    public set_p_fwd(): void {
        this.set_pd(this.get_p_fwd());
    }
    public get_p_bak(): C_PointDir {
        return this.__get_p_move(-1);
    }
    public set_p_bak(): void {
        this.set_pd(this.get_p_bak());
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
    protected __get_p_move(offset: number): C_PointDir {
        const p = new C_PointDir(this.loc_pos);
        switch (this.loc_pos.d) {
            case T_Direction.N: p.y -= offset;break;
            case T_Direction.E: p.x += offset;break;
            case T_Direction.S: p.y += offset;break;
            case T_Direction.W: p.x -= offset;break;
        }
        return p;
    }
    public get_around(front: number, right:number, up: number): C_PointDir {
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

