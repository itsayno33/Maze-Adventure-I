export class C_Point {
    public x: number;
    public y: number;
    public z: number;
    public constructor(x?: number|C_Point, y?: number, z?: number) {
//        if (typeof x === "object" && x instanceof C_Point) {
        if (typeof x === "number" && typeof y === "number" && typeof z === "number") {
            this.x = x;
            this.y = y;
            this.z = z;
            return;
        } else if (typeof x === "object") {
            this.x = x.x;
            this.y = x.y;
            this.z = x.z;
        } else {
            this.x = -2;
            this.y = -2;
            this.z = -2;
        }
    }
    public within(p: C_Point): boolean {
        return (p.x == this.x && p.y == this.y && p.z == this.z);
    }
}