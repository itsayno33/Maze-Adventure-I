// 四捨五入
export function _round(num: number, digit: number): number {
    const multiplier = Math.pow(10, digit);
    return Math.round(num * multiplier) / multiplier;
}

// 切り上げ
export function _ceil(num: number, digit: number): number {
    const multiplier = Math.pow(10, digit);
    return Math.ceil(num * multiplier) / multiplier;
}


// 切り下げ
export function _floor(num: number, digit: number): number {
    const multiplier = Math.pow(10, digit);
    return Math.floor(num * multiplier) / multiplier;
}


export function _min(a: number[]): number {
    return a.reduce((n1: number, n2: number) => Math.min(n1, n2));
}

export function _max(a: number[]): number {
    return a.reduce((n1: number, n2: number) => Math.max(n1, n2));
}
