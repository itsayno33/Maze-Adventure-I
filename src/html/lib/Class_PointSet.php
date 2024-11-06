<?php

class Point {
    public int $x;
    public int $y;
    public function __construct(int $x = 0, int $y = 0)
    {
        $this->x  = $x;
        $this->y  = $y;
    }
    public function is_exist(int $x, int $y): bool {
        return ($this->x == $x) && ($this->y == $y);
    }
}

class PointLink extends Point {
    public int $di;
    public function __construct(int $x = 0, int $y = 0, int $di = -1)
    {
        parent::__construct($x, $y);
        $this->di = $di;
    }
    public static function cast(Point $p): self|null {
        if (!($p instanceof self)) return new PointLink($p->x, $p->y);
        return $p;
    }
}


class PointSet {
    public array $set;
    public function __construct()
    {
        $this->set = [];
    }
    public function push(Point $p): void {
        array_push($this->set, $p);
        return;
    }
    public function get_point(int $x, int $y): ?Point {
        foreach ($this->set as $p) {
            if ($p->is_exist($x, $y)) return $p;
        }
        return null;            
    }
    public function remove(Point $p): void {
        $this->remove_xy($p->x, $p->y);
        return;
    }
    public function remove_xy(int $x, int $y): void {
        for ($i = 0; $i < count($this->set); $i++) {
            if ($this->set[$i]->is_exist($x, $y)) {
                unset($this->set[$i]);
                $this->set = array_values($this->set);
                break;
            }
        }
        return;
    }
    public function is_exist(int $x, int $y): bool {
        foreach ($this->set as $p) {
            if (!$p->is_exist($x, $y)) continue;
            return true;
        }
        return false;
    }
}

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

?>