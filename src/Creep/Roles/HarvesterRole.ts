import BaseRole from './BaseRole';

enum HarvesterState {
    Harvest = 'harvest',
    Return = 'return',
}

export class HarvesterRole extends BaseRole {
    public run(): void {
        if (this.creep.memory.state === undefined) {
            this.creep.memory.state = HarvesterState.Harvest;
        }

        const stateMethods = {
            [HarvesterState.Harvest]: () => this.runHarvest(),
            [HarvesterState.Return]: () => this.runReturn(),
        };

        stateMethods[this.creep.memory.state as HarvesterState]();
    }

    private runHarvest(): void {
        if (this.creep.store.getFreeCapacity(RESOURCE_ENERGY) === 0) {
            this.creep.memory.state = HarvesterState.Return;
            return;
        }

        const target: Source = Game.getObjectById(this.job.targetId);

        const result = this.creep.harvest(target);

        if (result === ERR_NOT_IN_RANGE) {
            this.creep.moveTo(target, {
                visualizePathStyle: {
                    stroke: '#ffaa00',
                },
            });

            return;
        }

        if (result === OK && this.creep.store.getFreeCapacity(RESOURCE_ENERGY) === 0) {
            this.creep.memory.state = HarvesterState.Return;
        }
    }

    private runReturn(): void {
        if (this.creep.store.getFreeCapacity(RESOURCE_ENERGY) === this.creep.store.getCapacity(RESOURCE_ENERGY)) {
            this.creep.memory.state = HarvesterState.Harvest;
            return;
        }

        const eligibleTargets: StructureConstant[] = [STRUCTURE_SPAWN, STRUCTURE_EXTENSION, STRUCTURE_CONTAINER];

        const target: Structure =
            this.creep.room.find(FIND_STRUCTURES, {
                filter: structure => {
                    if (!eligibleTargets.includes(structure.structureType)) {
                        return false;
                    }

                    // noinspection RedundantIfStatementJS
                    if (!('store' in structure) || structure.store.getFreeCapacity(RESOURCE_ENERGY) === 0) {
                        return false;
                    }

                    return true;
                },
            })[0] ?? null;

        if (!target) {
            throw new Error('No structure found to transfer energy to');
        }

        const result = this.creep.transfer(target, RESOURCE_ENERGY);

        if (result === ERR_NOT_IN_RANGE) {
            this.creep.moveTo(target, {
                visualizePathStyle: {
                    stroke: '#ffffff',
                },
            });

            return;
        }

        if (
            result === OK &&
            this.creep.store.getFreeCapacity(RESOURCE_ENERGY) === this.creep.store.getCapacity(RESOURCE_ENERGY)
        ) {
            this.creep.memory.state = HarvesterState.Harvest;
        }
    }
}
