import { _round } from "./F_Math";

// 乱数関数呼び出し用の型宣言
type T_frand = (()=>number)
const frand: T_frand =  ()=>{return Math.random()}

// 一様乱数(整数)
export function _irand(min: number = 0, max: number = 1, rand: T_frand = frand): number {
    const frand = Math.floor(rand() * (max - min + 1)) + min;
    return _round(frand, 0);
}

// 正規分布もどき乱数(整数)
export function _igrand(min: number = 0, max: number = 1, rand: T_frand = frand):number {
    return _irand(min, max, ()=>{return _grand(0, 1, rand)})
}

// 正規分布もどき乱数(実数)
export function _grand(min: number = 0, max: number = 1, rand: T_frand = frand):number {
    return Math.floor(___gaussianRand(rand) * (max - min + 1)) + min;
}
function ___gaussianRand(rand: T_frand = frand) {
    let sum = 0;
    for (let i = 0; i < 6; i += 1) {
        sum += rand();
    }
    return sum / 6;
}

// 少し真面目な正規分布乱数(整数)
export function _inrand(min: number = 0, max: number = 1, rand: T_frand = frand): number {
    return _irand(min, max, ()=>{return _nrand(0, 1, rand)[0]})
}

// 少し真面目な正規分布乱数(実数 × 2)
// 一様確率変数a,bを変数関数を用いて x=f(a,b), y=g(a,b)として2つの正規分布乱数x,yを得る
// x = f(a,b) = sqrt(-2*log(a) * sin(2*π*b)) 
// y = g(a,b) = sqrt(-2*log(a) * cos(2*π*b)) 
export function _nrand(min: number = 0, max: number = 1, rand: T_frand = frand): [number, number] {
    const x = Math.floor(_fab(rand) * (max - min +1)) + min;
    const y = Math.floor(_gab(rand) * (max - min +1)) + min;
    return [x, y];
}
function _fab(rand: (()=>number) = ()=>{return Math.random()}): number {
    return Math.sqrt(-2.0 * Math.log(rand()) * Math.sin(2.0 * Math.PI * rand()));
}
function _gab(rand: (()=>number) = ()=>{return Math.random()}): number {
    return Math.sqrt(-2.0 * Math.log(rand()) * Math.cos(2.0 * Math.PI * rand()));
}


// シード値を用いた乱数
export class C_SeededRand {
    protected seed: number;
    protected first_seed: number;

    public constructor(seed: number) {
        this.seed = seed;
        this.first_seed = seed;
    }
    public reset() {
        this.seed = this.first_seed;
    }
    // 乱数生成メソッド
    public random(): number {
        this.seed = (this.seed * 9301 + 49297) % 233280;
        return this.seed / 233280.0;
    }
}

// 確率に基づく要素選択
export type T_SelectItem = {
    ratio: number,
}
export function _selectItem(items: T_SelectItem[], rand: T_frand = frand): T_SelectItem | undefined {
    var ttl:number = 0;
    for (let item of items) ttl += item.ratio;

    const target = _irand(0, ttl, rand);
    var sum = 0;
    for (const item of items) {
        sum += item.ratio;
        if (target < sum) {
          return item;
        }
    } 
    return undefined;
}

// 配列のシャッフル
export function _shuffleArray<T>(array: T[], rand: T_frand = frand): T[] {
    let shuffledArray = [...array]; // 元の配列を変更しないようにコピーする
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        // ランダムな位置を決定
        const j = _irand(0, i, rand);
        // 要素の入れ替え
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray; // シャッフルされた配列を返す
}
