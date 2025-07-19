import BaseRole from './BaseRole';

export default class Harvester extends BaseRole {
    public run(): void {
        console.log('  - Harvester');
        if (this.creep.store.getFreeCapacity() > 0) {
            const source: Source =
                this.creep.room.find(FIND_SOURCES, {
                    filter: (source: Source) => source.id === this.job.targetId,
                })[0] ?? null;

            if (!source) {
                throw new Error('Source not found');
            }

            if (this.creep.harvest(source) == ERR_NOT_IN_RANGE) {
                this.creep.moveTo(source, {
                    visualizePathStyle: {
                        stroke: '#ffaa00',
                    },
                });
            }
        } else {
            const spawn: Structure =
                this.creep.room.find(FIND_STRUCTURES, {
                    filter: structure => structure.structureType === STRUCTURE_SPAWN,
                })[0] ?? null;

            if (!spawn) {
                throw new Error('Spawn not found');
            }

            if (this.creep.transfer(spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                this.creep.moveTo(spawn, {
                    visualizePathStyle: {
                        stroke: '#ffffff',
                    },
                });
            }
        }
    }
}
