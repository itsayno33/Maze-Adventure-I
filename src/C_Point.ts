export class C_Point {
    public x: number;
    public y: number;
    public z: number;
    public constructor(x?: number|C_Point, y?: number, z?: number) {
        if (typeof x === "object" && x instanceof C_Point) {
            this.x = x.x;
            this.y = x.y;
            this.z = x.z;
            return;
        }
        this.x = x ?? -1;
        this.y = y ?? -1;
        this.z = z ?? -1;
    }
    public within(p: C_Point): boolean {
        return (p.x == this.x && p.y == this.y && p.z == this.z);
    }
}