"use strict";

import { _alert } from "../d_cmn/global";

export interface JSON_MazeInfo {
    name:      string;
    mbname:    string;
    lv:        number;
    size_x:    number;
    size_y:    number;
    size_z:    number;
    max_room:  number;
    room_size: number;
}

export function alert_mazeinfo_info(a?: JSON_MazeInfo): void {
    if (a === undefined) return;

    alert("MazeInfo Data:"
        + "\nname : "       + (a.name      ?? '?')
        + "\nmbname: "      + (a.mbname    ?? '?')
        + "\nlv :"          + (a.lv        ?? '?')
        + "\nsize_x: "      + (a.size_x    ?? '?')
        + "\nsize_y: "      + (a.size_y    ?? '?')
        + "\nsize_z: "      + (a.size_z    ?? '?')
        + "\nmax_of_room: " + (a.max_room  ?? '?')
        + "\nroom_size: "   + (a.room_size ?? '?')
        + "\n"
    );
}

export class C_MazeInfo {
    public name:      string;
    public mbname:    string;
    public lv:        number;
    public size_x:    number;
    public size_y:    number;
    public size_z:    number;
    public max_room:  number;
    public room_size: number;
    public constructor (j?: JSON_MazeInfo) {
        this.name      = '';
        this.mbname    = '';
        this.lv        = 0;
        this.size_x    = 3;
        this.size_y    = 3;
        this.size_z    = 3;
        this.max_room  = 1;
        this.room_size = 1;

        if (j !== undefined) this.decode(j);
    }
    public encode(): JSON_MazeInfo {
        return {
            name:      this.name,
            mbname:    this.mbname,
            lv:        this.lv,
            size_x:    this.size_x,
            size_y:    this.size_y,
            size_z:    this.size_z,
            max_room:  this.max_room,
            room_size: this.room_size,
        }
    }
    public decode(j?: JSON_MazeInfo): C_MazeInfo {
        if (j === undefined) return this;

        if (j.name      !== undefined) this.name      = j.name;
        if (j.mbname    !== undefined) this.mbname    = j.mbname;
        if (j.lv        !== undefined) this.lv        = j.lv;
        if (j.size_x    !== undefined) this.size_x    = j.size_x;
        if (j.size_y    !== undefined) this.size_y    = j.size_y;
        if (j.size_z    !== undefined) this.size_z    = j.size_z;
        if (j.max_room  !== undefined) this.max_room  = j.max_room;
        if (j.room_size !== undefined) this.room_size = j.room_size;

        return this;
    }
    
    public alert(): void {
        _alert("MazeInfo Data:"
            + "\nname : "       + (this.name      ?? '?')
            + "\nmbname: "      + (this.mbname    ?? '?')
            + "\nlv :"          + (this.lv        ?? '?')
            + "\nsize_x: "      + (this.size_x    ?? '?')
            + "\nsize_y: "      + (this.size_y    ?? '?')
            + "\nsize_z: "      + (this.size_z    ?? '?')
            + "\nmax_of_room: " + (this.max_room  ?? '?')
            + "\nroom_size: "   + (this.room_size ?? '?')
            + "\n"
        );
    }
}


