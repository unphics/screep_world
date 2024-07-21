/**
 * @brief 静态全局数据缓存
 */

import {room} from "room";

export namespace data {

export class data {
    rooms: Array<room.room>
    constructor() {
        console.log("初始化data");
        this.rooms = new Array<room.room>
        add_room(this, "Spawn1")
    }
}
export function add_room(data: data, name: string) {
    let new_room: room.room = new room.room
    if (new_room.init_room(name)) {
        data.rooms.push(new_room)
    }
}
export function tick(dt: data) {
    dt.rooms.forEach((elem) => {
        room.tick_check(elem)
    })
}

}
