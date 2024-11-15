interface JSONAble {
    [key: string]: any
}
export type T_Attr = {[key: string]: string|number|object};

export class C_UrlOpt {
    protected v: T_Attr;
    public constructor(s?: string);
    public constructor(t?: T_Attr);
    public constructor(a?: any) {
        if (typeof a === "undefined") {
            this.v = {} as T_Attr;
            return;
        }
        if (typeof a === "string") {
            this.set_from_string(a);
        }
        if (typeof a === "object") {
            this.v = a as T_Attr;
            return;
        }
        this.v = {} as T_Attr;
        return;
    }
    public get_keys(): string[] {
        const key_list: string[] = new Array as string[];
        for (var key in this.v) {
            key_list.push(key);
        }
        return key_list;
    }
    public get (key: string): string {
        if (key in this.v) {
            if  (typeof this.v[key] === "number") {
                return this.v[key].toString();
            }
            if  (typeof this.v[key] === "object") {
                return JSON.stringify(this.v[key]);
            }
            return this.v[key] as string;
        } else {
            return "";
        }
    }
    public set(str: string):  void;
    public set(atr: T_Attr):  void;
    public set(key: string, val?: string): void;
    public set(key: string, val?: number): void;
    public set(key: string, val?: object): void;
    public set(ukn: any,    val?: string|number|object): void {
        if (typeof ukn === "string") {
            if (typeof val === "undefined") {
                this.add_from_string(ukn);
                return;
            } else if (typeof val === "string") {
                this.v[ukn] = val;
                return;
            } else if (typeof val === "number" ){
                this.v[ukn] = val;
                return;
            } else if (typeof val === "object" ){
                this.v[ukn] = val;
                return;
            } else {
                this.v[ukn] = "";
                return;
            }
        }
        if (typeof ukn === "object") {
                const attr: T_Attr = ukn as T_Attr;
            for (const item in attr) {
                this.v[item] = attr[item];
            }
            return;
        }
        return;
    }
    public isset(key: string): boolean {
        return (key in this.v);
    }
    public remove(key: string): void {
        if (key in this.v) {
            delete this.v[key];
        }
    }
    public clear(): void {
        this.v = {} as T_Attr;
    }
    public toString(): string {
        const len: number =  Object.keys(this.v).length;
        if (len < 1)  return "";

        var str_array: string[] = [];
        for (const key in this.v) {
            str_array.push(key + "=" + this.v[key]);
        }

        return str_array.join("&");
    }
    public toJSON(): string {
        return JSON.stringify(this.v);
    }
    public toFormData(): FormData|undefined {
        const len: number =  Object.keys(this.v).length;
        if (len < 1)  return undefined;

        var form_data = new FormData();
        for (const key in this.v) {
            const value: string|number|object = this.v[key];
            if (typeof value === "string")
                form_data.append(key, value);
            if (typeof value === "object")
                form_data.append(key, JSON.stringify(value));
            else
                form_data.append(key, value.toString());
        }

        return form_data;
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
