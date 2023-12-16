import { T_Direction } from "./T_Direction";
import { C_Point }     from "./C_Point";
import { T_MzKind }    from "./T_MzKind";
import { C_Maze }      from "./C_Maze";


export class C_Walker {
    protected p:  C_Point;
    protected d: T_Direction;
    protected fn_dont_hit: (k: T_MzKind) => boolean;
    constructor() {
        this.p  = new C_Point();
        this.d = T_Direction.X;
        this.fn_dont_hit = this.__default_dont_hit;
    }
    protected __default_dont_hit(k: T_MzKind): boolean {
        switch (k) {
            case T_MzKind.Floor:
            case T_MzKind.Unexp:
                return true;
            default:
                return false;
        }
    }
    public set_dont_hit(f: (k: T_MzKind) => boolean): void {
        this.fn_dont_hit = f;
    }
    public set_dir(d: T_Direction): void {
        this.d = d;
    }
    public get_p(): C_Point {
        return new C_Point(this.p);
    }
    public set_p(p: C_Point, d?: T_Direction): void {
        this.p = p;
        this.d = d ?? T_Direction.N;
    }
    public get_x(): number {return this.p.x}
    public get_y(): number {return this.p.y}
    public get_z(): number {return this.p.z}
    public get_d(): T_Direction {return this.d}

    public get_p_fwd():C_Point {
        return this.__get_p_move(1);
    }
    public get_p_bak():C_Point {
        return this.__get_p_move(-1);
    }
    public get_p_up():  C_Point {
        const p = new C_Point(this.p);
        p.z--;
        return p;
    }
    public get_p_down(): C_Point {
        const p = new C_Point(this.p);
        p.z++;
        return p;
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
    public dont_hit(k: T_MzKind): boolean {
        return this.fn_dont_hit(k);
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

