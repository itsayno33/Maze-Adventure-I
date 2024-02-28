"use strict";

// クラス関係のユーティリティ

namespace ClassUtil {
    export interface ClassType<T> {
        prototype?: T;
        name?: string;
        [property: string]: any;

        new (...args:any[]): T;
    }
}

export class ClassUtil {
    // クラス名(文字列)からクラス(オブジェクト)を取得。ただしexportされているクラスのみ対象(GLOBALなやつ)
    //　<T>は候補となるクラスを「｜」で繋いだTYPE型。この中からクラスを探す
    static getClass<T>(className: string): ClassUtil.ClassType<T> {
        if (!className) {
            throw Error(`Cannot get a anonymous class. A class you want to get must be named.`);
        }

        const g = this.getGlobal();
        //get scope reference
        const p = className.split(".");
        let c = g;
        if(p.length >= 0){
            for (let i of p) {
                if (typeof c[i] === "undefined") {
                    if(typeof (<any>global)[i] === "undefined"){
                        throw ReferenceError(`No such a reachable reference scope "${i}". `);
                    }else{
                        //global objects
                        c = (<any>global)[i];
                    }
                }else{
                    c = c[i];
                }
            }
        }

        if (this.isClassLike<T>(c, className)) {
//            return <typeof c>c;
            return c as ClassUtil.ClassType<T>;
        } else {
            throw TypeError(`${className} is not a Class.`)
        }
    }


    /**
     * @return the global object or node.js exports
     */
    private static getGlobal(): any {
        if (typeof self !== "undefined") { return self; }
        else if (typeof window !== "undefined") { return window; }
        else if (typeof global !== "undefined" && typeof exports !== 'undefined') { return exports; }
        else { throw new Error(`Cannot get the global object or exports object (nodejs).`); }
    }

    private static isClassLike<T>(classLike: any, className: string): classLike is T {
        const cnl = className.split(".");
        return (typeof classLike === "function")
            && (typeof classLike.prototype !== "undefined")
            && (classLike.name === cnl[cnl.length - 1]);
    }
}
