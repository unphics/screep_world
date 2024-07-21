import source from "build/source";

export namespace room {

export class room {
    name: string = null;
    room: Room = null;
    tick: number = 0;

    ctlr: StructureController = null;
    spawn: StructureSpawn = null;
    sources: Array<source> = null;
    constructor() {}
    init_room(name: string): boolean {
        this.name = name
        let find_result: Room = Game.spawns[name].room
        if (!find_result) {
            return false;
        }
        console.log("初始化新房: ", name)
        this.room = find_result
        this.sources = new Array<source>;
        this.init_build()
        return true;
    }
    init_build() {
        this.ctlr = this.room.controller;
        this.spawn = Game.spawns["this.name"]
        for (let src of this.room.find(FIND_SOURCES)) {
            this.sources.push(new source(src.id))
        }
        for (let elem of this.room.find(FIND_STRUCTURES)) {
            switch (elem.structureType) {
                case STRUCTURE_TOWER: {}
                case STRUCTURE_CONTAINER: {}
                case STRUCTURE_ROAD: {}
                case STRUCTURE_WALL: {}
                case STRUCTURE_RAMPART: {}
                default: {}
            }
        }
        for (let site of this.room.find(FIND_CONSTRUCTION_SITES)) {}
    }
}
export function tick_check(room: room) {
    room.tick = room.tick == 2 ? 0 : room.tick + 1
    /******* check数量 *******/

    /*******  发布任务 *******/

    for (let source of room.sources) {
        let building = Game.getObjectById(source.Id) as Source;
        
    }
}

}
