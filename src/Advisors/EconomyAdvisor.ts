import JobType from '../Job/JobType';
import BaseAdvisor from './BaseAdvisor';

export default class EconomyAdvisor extends BaseAdvisor {
    public run(): void {
        console.log('    EconomyAdvisor');

        const room = Game.rooms['sim'];

        const controller = room.find(FIND_STRUCTURES, {
            filter: structure => structure.structureType === STRUCTURE_SPAWN,
        })[0];

        console.log('    - Finding closest source');

        const sources = room.find(FIND_SOURCES);

        let closestSource: Source | null = null;

        for (const source of sources) {
            const distance = controller.pos.findPathTo(source).length;

            console.log(`    - Found source at ${source.pos.x}x${source.pos.y} (spawn distance: ${distance})`);

            if (closestSource === null || controller.pos.findPathTo(closestSource).length > distance) {
                closestSource = source;
            }
        }

        if (closestSource === null) {
            return;
        }

        console.log(`    - Closest source: ${closestSource.pos.x}x${closestSource.pos.y}`);

        let availableAdjacentTiles = 0;

        const result = room.lookAtArea(
            closestSource.pos.y - 1,
            closestSource.pos.x - 1,
            closestSource.pos.y + 1,
            closestSource.pos.x + 1,
            true
        );

        for (const tile of result) {
            // Ignore the energy source itself
            if (tile.x === closestSource.pos.x && tile.y === closestSource.pos.y) {
                continue;
            }

            switch (tile.type) {
                case 'structure':
                    availableAdjacentTiles--;
                    break;

                case 'terrain':
                    if (tile.terrain !== 'wall') {
                        availableAdjacentTiles++;
                    }
                    break;
            }
        }

        console.log(`    - Available adjacent tiles: ${availableAdjacentTiles}`);

        console.log(`    - Adding ${availableAdjacentTiles} harvest jobs`);

        if (availableAdjacentTiles > 0) {
            for (let i = 0; i < availableAdjacentTiles; i++) {
                this.jobManager.addJob({
                    id: `harvest-${closestSource.id}-${i}`,
                    type: JobType.Harvest,
                    targetId: closestSource.id,
                });
            }
        }
    }
}
