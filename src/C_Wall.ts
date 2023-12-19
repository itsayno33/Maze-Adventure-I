import { C_Range } from "./C_Range";

export type T_Wall = {
    min_x: number,
    max_x: number,
    min_y: number,
    max_y: number,
}

export class C_Wall {
    protected w: T_Wall[][];
    protected d: number
    public constructor(depth: number = 5, size: C_Range) {
        if (depth < 3) depth = 5;
        if (depth % 2 !== 1) depth++;  // 奇数のみ対応。

        const min_x: number = size.min_x();
        const min_y: number = size.min_y();
        const max_x: number = size.max_x();
        const max_y: number = size.max_y();
    
        const center_x: number = (max_x - min_x) / 2;
    
        // 基準となる壁(一番遠くの壁)の正面サイズ(横幅)を求める
        // 一番遠く(depth - 1)の壁の数がdepth個になるように調整する
        const front_wall_size_x: number = (max_x - min_x) / depth;

        // 基準となる側壁のサイズ(横幅)を求める
        // 一番遠くの壁(中央)の左端からdepth個の側壁を取れるようにサイズ調整する
        const side_wall_size_x:  number = (center_x - front_wall_size_x / 2) / depth;
    
        // 各depth別の正面壁の横幅を求める。
        // 計算の利便性を考慮して、ハーフサイズを求める
        const front_wall_H_size_x: number[] = new Array(depth + 1);
    
        front_wall_H_size_x[depth] = front_wall_size_x / 2;
        for (var i = depth - 1; i >= 0; i--) {
            front_wall_H_size_x[i] = front_wall_H_size_x[i + 1] + side_wall_size_x;
        }
    
        // 天井の縦幅の増分を求める。割合は適当（笑）
        const side_wall_size_T: number = (max_y - min_y) * 1.0 / ((depth + 1) * 2 + 1);
        // 床の増分を求める。
        const side_wall_size_B: number = (max_y - min_y) * 1.0 / ((depth + 1) * 2 + 1);
    
        // 以上の値を用いて各距離(depth)の正面壁の位置決めをする
        // wallの第一引数は距離、第二引数は左右の位置（一番左が0、一番右がdepth-1)
        const wall: T_Wall[][] = new Array(depth + 1);
        for (var j = 0; j < depth + 1; j++) {
            wall[j] = new Array(depth + 1);
            for (var k = 0; k < depth + 1; k++) {
                const wk_x = center_x - front_wall_H_size_x[j] * (depth - 2 * k);
                wall[j][k] = {
                    min_x: wk_x,
                    max_x: wk_x  + front_wall_H_size_x[j] * 2,
                    min_y: min_y + side_wall_size_T * j,
                    max_y: max_y - side_wall_size_B * j,
                }
            }
        }
        
        this.d = depth;
        this.w = wall;
    }
    public get_depth(): number {
        return this.d;
    }
    public get(depth: number, offset: number): T_Wall {
        const H_dept = (this.d - 1) / 2;
        return this.w[depth][H_dept + offset];
    }
}

