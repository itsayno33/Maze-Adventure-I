import { T_Direction } from "./T_Direction";
import { C_Point }     from "./C_Point";
import { C_Maze }      from "./C_Maze";


export class C_Position {
    protected p:  C_Point;
    protected wp: C_Point; // 作業用に使いまわす
    protected d: T_Direction;
    protected maze: C_Maze|null;
    constructor() {
        this.p  = new C_Point();
        this.wp = new C_Point();
        this.d = T_Direction.X;
        this.maze = null;
    }
    public set_maze(maze: C_Maze): void {
        this.maze = maze;
    }
    public set_dir(d: T_Direction): void {
        this.d = d;
    }
    public set_position(p: C_Point, d?: T_Direction, maze?: C_Maze): boolean {
        if (typeof maze !== "undefined" && maze instanceof C_Maze) this.maze = maze; 
        if (this.maze == null) return false;

        if (this.maze.can_move(p)) {
            this.p = p;
            this._wp_copy();
            this.d = d ?? T_Direction.N;
            return true;
        } else {
            return false;
        }
    }
    public get_x(): number {return this.p.x}
    public get_y(): number {return this.p.y}
    public get_z(): number {return this.p.z}
    public get_d(): T_Direction {return this.d}

    public go():boolean {
        return this._move(1);
    }
    public back():boolean {
        return this._move(-1);
    }
    protected _wp_copy(): void {
        this.wp.x = this.p.x;
        this.wp.y = this.p.x;
        this.wp.z = this.p.x;
    }
    protected _move(offset: number):boolean {
        this._wp_copy();
        switch (this.d) {
            case T_Direction.N: this.wp.y -= offset;break;
            case T_Direction.E: this.wp.x += offset;break;
            case T_Direction.S: this.wp.y += offset;break;
            case T_Direction.W: this.wp.x -= offset;break;
        }
        if (this.maze?.can_move(this.wp)) {
            this.p.x = this.wp.x;
            this.p.y = this.wp.y;
            return true;
        }
        return false;
    }
    public up(): boolean {
        this._wp_copy();
        this.wp.z--;
        if (this.maze?.can_UD(this.wp)) {
            this.p.z = this.wp.z ;
            return true;
        }
        return false;
    }
    public down(): boolean {
        this._wp_copy();
        this.wp.z++;
        if (this.maze?.can_UD(this.wp)) {
            this.p.z = this.wp.z;
            return true;
        }
        return false;
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

