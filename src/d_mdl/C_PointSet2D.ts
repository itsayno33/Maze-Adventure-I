class C_Point2D {
    public x: number;
    public y: number;
    public constructor(x: number = 0, y: number = 0)
    {
        this.x  = x;
        this.y  = y;
    }
    public is_exist(x: number, y: number): boolean {
        return (this.x == x) && (this.y == y);
    }
}

export class C_PointLink2D extends C_Point2D {
    public di: number;
    public constructor(x: number = 0, y: number = 0, di: number = -1)
    {
        super(x, y);
        this.di = di;
    }
    public static cast(p: C_Point2D|undefined): C_PointLink2D|undefined {
        if (p?.x === undefined) return undefined;
        if (p?.y === undefined) return undefined;
        return p instanceof C_PointLink2D ? p : new C_PointLink2D(p.x, p.y);
    }
}


export class C_PointSet2D {
    public set: C_Point2D[] =[];
    public constructor() {}

    public push(p: C_Point2D): void {
        this.set.push(p);
        return;
    }
    public get_point(x: number, y: number): C_Point2D|undefined {
        for (const p of this.set) {
            if (p?.is_exist(x, y)) return p;
        }
        return undefined;            
    }
    public remove(p: C_Point2D): void {
        this.remove_xy(p.x, p.y);
        return;
    }
    public remove_xy(x: number, y: number): void {
        for (const i in this.set) {
            if (this.set[i]?.is_exist(x, y)) {
                delete this.set[i];
                this.set = [...this.set];
                break;
            }
        }
        return;
    }
    public is_exist(x: number, y: number): boolean {
        for (const p of this.set) if (p?.is_exist(x, y)) return true;
        return false;
    }
}

/*
class Point3D {
    public int $x;
    public int $y;
    public int $z;
    public function __construct(int $x = 0, int $y = 0, int $z = 0)
    {
        $this->x  = $x;
        $this->y  = $y;
        $this->z  = $z;
    }
    public function is_exist(int $x, int $y, int $z): bool {
        return ($this->x == $x) && ($this->y == $y) && ($this->z == $z);
    }
    public function within(Point3D $p): bool {
        return $this->is_exist($p->x, $p->y, $p->z);
    }
    public function encode(): array {
        $a = [];
        $a['x'] = $this->x;
        $a['y'] = $this->y;
        $a['z'] = $this->z;

        return $a;
    }
    public function decode(array $a): Point3D {
        if (!is_null($a) && is_array($a)) {
            if (
                array_key_exists('x', $a) && (is_numeric($a['x']) && $a['x'] >  0)
            &&  array_key_exists('y', $a) && (is_numeric($a['y']) && $a['y'] >  0)
            &&  array_key_exists('z', $a) && (is_numeric($a['z']) && $a['z'] >= 0)
            ) {
                $this->x = $a['x'];
                $this->y = $a['y'];
                $this->z = $a['z'];
            }
        }
        return $this;
    }
    public static function decode_and_new(array $a): Point3D {
        if (!is_null($a) && is_array($a)) {
            if (
                array_key_exists('x', $a) && (is_numeric($a['x']) && $a['x'] >  0)
            &&  array_key_exists('y', $a) && (is_numeric($a['y']) && $a['y'] >  0)
            &&  array_key_exists('z', $a) && (is_numeric($a['z']) && $a['z'] >= 0)
            ) {
                return new Point3D($a['x'], $a['y'], $a['z']);
            }
        }
        return new Point3D(-1, -1, -1);
    }
}
*/
