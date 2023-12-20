import { T_Direction } from "./T_Direction";
import { C_Point }     from "./C_Point";


export class C_Walker {
    protected p: C_Point;
    protected d: T_Direction;
    constructor() {
        this.p  = new C_Point();
        this.d = T_Direction.N;
    }
    public get_dir(): T_Direction {return this.d}
    public set_dir(d: T_Direction): void {
        this.d = d;
    }
    public get_p(): C_Point {
        return new C_Point(this.p);
    }
    public set_p(p: C_Point, d?: T_Direction): void {
        this.p = p;
        this.d = d ?? this.d;
    }
    public get_x(): number {return this.p.x}
    public get_y(): number {return this.p.y}
    public get_z(): number {return this.p.z}

    public set_x(x: number): void {this.p.x = x}
    public set_y(y: number): void {this.p.y = y}
    public set_z(z: number): void {this.p.z = z}

    public get_p_fwd(): C_Point {
        return this.__get_p_move(1);
    }
    public set_p_fwd(): void {
        this.set_p(this.get_p_fwd());
    }
    public get_p_bak(): C_Point {
        return this.__get_p_move(-1);
    }
    public set_p_bak(): void {
        this.set_p(this.get_p_bak());
    }
    public get_p_up(): C_Point {
        const p = new C_Point(this.p);
        p.z--;
        return p;
    }
    public set_p_up() {
        this.set_p(this.get_p_up());
    }
    public get_p_down(): C_Point {
        const p = new C_Point(this.p);
        p.z++;
        return p;
    }
    public set_p_down() {
        this.set_p(this.get_p_down());
    }
    protected __get_p_move(offset: number):C_Point {
        const p = new C_Point(this.p);
        switch (this.d) {
            case T_Direction.N: p.y -= offset;break;
            case T_Direction.E: p.x += offset;break;
            case T_Direction.S: p.y += offset;break;
            case T_Direction.W: p.x -= offset;break;
        }
        return p;
    }
    public get_around(front: number, right:number, up: number): C_Point {
        const cur_pos = this.p;
        const cur_dir = this.d;
        var target_x  = this.p.x;
        var target_y  = this.p.y;
        var target_z  = this.p.z - up;
        switch (this.d) {
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
        return new C_Point(target_x, target_y, target_z);
    }
    public turn_r(): void {
        switch (this.d) {
            case T_Direction.N: this.d = T_Direction.E;break;
            case T_Direction.E: this.d = T_Direction.S;break;
            case T_Direction.S: this.d = T_Direction.W;break;
            case T_Direction.W: this.d = T_Direction.N;break;
        }
    }
    public turn_l(): void {
        switch (this.d) {
            case T_Direction.N: this.d = T_Direction.W;break;
            case T_Direction.E: this.d = T_Direction.N;break;
            case T_Direction.S: this.d = T_Direction.E;break;
            case T_Direction.W: this.d = T_Direction.S;break;
        }
    }
    public turn_b(): void {
        switch (this.d) {
            case T_Direction.N: this.d = T_Direction.S;break;
            case T_Direction.E: this.d = T_Direction.W;break;
            case T_Direction.S: this.d = T_Direction.N;break;
            case T_Direction.W: this.d = T_Direction.W;break;
        }
    }
}

