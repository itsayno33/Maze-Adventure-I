import { C_PointDir, T_Direction }   from "./C_PointDir";
import { C_Location, JSON_Location } from "./C_Location";

export interface JSON_Walker extends JSON_Location {
}

export class C_Walker extends C_Location {
    constructor(j?: JSON_Walker|JSON_Location) {
        super(j);
    }
    public get_x(): number {return this.pd.x}
    public get_y(): number {return this.pd.y}
    public get_z(): number {return this.pd.z}

    public set_x(x: number): void {this.pd.x = x}
    public set_y(y: number): void {this.pd.y = y}
    public set_z(z: number): void {this.pd.z = z}

    public get_p_fwd(): C_PointDir {
        return this.__get_p_move(1);
    }
    public set_p_fwd(): void {
        this.set_p(this.get_p_fwd());
    }
    public get_p_bak(): C_PointDir {
        return this.__get_p_move(-1);
    }
    public set_p_bak(): void {
        this.set_p(this.get_p_bak());
    }
    public get_p_up(): C_PointDir {
        const p = new C_PointDir(this.pd);
        p.z--;
        return p;
    }
    public set_p_up() {
        this.set_p(this.get_p_up());
    }
    public get_p_down(): C_PointDir {
        const p = new C_PointDir(this.pd);
        p.z++;
        return p;
    }
    public set_p_down() {
        this.set_p(this.get_p_down());
    }
    protected __get_p_move(offset: number): C_PointDir {
        const p = new C_PointDir(this.pd);
        switch (this.pd.d) {
            case T_Direction.N: p.y -= offset;break;
            case T_Direction.E: p.x += offset;break;
            case T_Direction.S: p.y += offset;break;
            case T_Direction.W: p.x -= offset;break;
        }
        return p;
    }
    public get_around(front: number, right:number, up: number): C_PointDir {
        var target_x  = this.pd.x;
        var target_y  = this.pd.y;
        var target_z  = this.pd.z - up;
        switch (this.pd.d) {
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
        return new C_PointDir({x: target_x, y: target_y, z: target_z, d: this.pd.d});
    }
    public turn_r(): void {
        switch (this.pd.d) {
            case T_Direction.N: this.pd.d = T_Direction.E;break;
            case T_Direction.E: this.pd.d = T_Direction.S;break;
            case T_Direction.S: this.pd.d = T_Direction.W;break;
            case T_Direction.W: this.pd.d = T_Direction.N;break;
        }
    }
    public turn_l(): void {
        switch (this.pd.d) {
            case T_Direction.N: this.pd.d = T_Direction.W;break;
            case T_Direction.E: this.pd.d = T_Direction.N;break;
            case T_Direction.S: this.pd.d = T_Direction.E;break;
            case T_Direction.W: this.pd.d = T_Direction.S;break;
        }
    }
    public turn_b(): void {
        switch (this.pd.d) {
            case T_Direction.N: this.pd.d = T_Direction.S;break;
            case T_Direction.E: this.pd.d = T_Direction.W;break;
            case T_Direction.S: this.pd.d = T_Direction.N;break;
            case T_Direction.W: this.pd.d = T_Direction.W;break;
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

