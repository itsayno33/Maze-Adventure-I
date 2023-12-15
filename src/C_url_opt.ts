export type T_attr = {[key: string]: string|number};

export class C_url_opt {
    protected v: T_attr;
    public constructor(s?:  string);
    public constructor(t?:  T_attr);
    public constructor(a?: any) {
        if (typeof a === "undefined") {
            this.v = {} as T_attr;
            return;
        }
        if (typeof a === "string") {
            this.set_from_string(a);
        }
        if (typeof a === "object") {
            this.v = a as T_attr;
            return;
        }
        this.v = {} as T_attr;
        return;
    }
    public get (key: string): string {
        if (key in this.v) {
            if  (typeof this.v[key] === "number") {
                return this.v[key].toString();
            }
            return this.v[key] as string;
        } else {
            return "";
        }
    }
    public set(str: string):  void;
    public set(atr: T_attr):  void;
    public set(key: string, val?: string): void;
    public set(key: string, val?: number): void;
    public set(ukn: any,    val?: string|number): void {
        if (typeof ukn === "string") {
            if (typeof val === "undefined") {
                this.add_from_string(ukn);
                return;
            } else if (typeof val === "string") {
                this.v[ukn] = val;
                return;
            } else if (typeof val === "number" ){
                this.v[ukn] = val.toString();
                return;
            } else {
                this.v[ukn] = "";
            }
        }
        if (typeof ukn === "object") {
                const attr: T_attr = ukn as T_attr;
            for (const item in attr) {
                this.v[item] = attr[item];
            }
            return;
        }
        return;
    }
    public remove(key: string): void {
        if (key in this.v) {
            delete this.v[key];
        }
    }
    public clear(): void {
        this.v = {} as T_attr;
    }
    public to_string(): string {
        const len: number =  Object.keys(this.v).length;
        if (len < 1)  return "";

        var str_array: string[] = [];
        for (const key in this.v) {
            str_array.push(key + "=" + this.v[key]);
        }

        return str_array.join("&");
    }
    protected set_from_string(s: string): void {
        this.clear();
        this.add_from_string(s);
    }
    protected add_from_string(s: string): void {
        const str = s.replace(/^(\??)(.*)$/, '$2');
        const str_array: string[] = str.split("&");
        str_array.forEach((item) => {
            const key_value = item.split("=");
            if (key_value.length < 2) {
                this.v[key_value[0]] = '';
            } else {
                this.v[key_value[0]] = key_value[1];
            }
        });
    }
}
