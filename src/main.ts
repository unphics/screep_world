
import { ErrorMapper } from "./utils/ErrorMapper";
import {data} from "data";

export const loop = ErrorMapper.wrapLoop(() => {
	console.log("================================ 回合:" + Game.time + " ================================")
	let version: number = 33;
	console.log("版本号: ", version);
	if ((Memory as any).version != version) {
		(Memory as any).version = version;
		(Memory as any).data = null;
	}

	for (let name in Memory.creeps) {
		if (!Game.creeps[name]) {
			delete Memory.creeps[name]
			console.log('回收失活的爬爬内存: ', name)
		}
	}

	let dt: data.data = (Memory as any).data;

	if (!dt) {
		(Memory as any).data = new data.data
		dt = (Memory as any).data
	}

	if (!(Object.keys(Memory.creeps).length > 0)) {
		console.log("房间刚创建, 需要一个未分化的爬爬")
		let spawn = Game.spawns[dt.rooms[0].name]
		if (spawn.spawnCreep([WORK, CARRY, MOVE], "Anaplastic", {memory: {role: "anaplastic"}}) != 0) {

		}
	}
	let creep = Game.creeps["Anaplastic"]
	if (creep) {
		creep.say("初始爬爬Working")
		if (creep.store.getFreeCapacity() > 0) {
			let srcs = creep.room.find(FIND_SOURCES);
			if (creep.harvest(srcs[0]) == ERR_NOT_IN_RANGE) {
				creep.moveTo(srcs[0])
			}
		} else if (Game.spawns[dt.rooms[0].name].store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
			if (creep.transfer(Game.spawns[dt.rooms[0].name], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
				creep.moveTo(Game.spawns[dt.rooms[0].name])
			}
		}
	}

	data.tick(dt)
});
