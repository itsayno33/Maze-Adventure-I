export class C_Point {
    public x: number;
    public y: number;
    public z: number;
    public constructor(x?: number, y?: number, z?: number) {
        this.x = x ?? -1;
        this.y = y ?? -1;
        this.z = z ?? -1;
    }
}