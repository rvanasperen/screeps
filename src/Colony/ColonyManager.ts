import { Council } from '@/Advisors';
import CreepManager from '@/Creep/CreepManager';

export default class ColonyManager {
    private readonly council: Council;
    private readonly creepManager: CreepManager;

    public constructor(council: Council, creepManager: CreepManager) {
        this.council = council;
        this.creepManager = creepManager;
    }

    public run(): void {
        this.council.run();
        this.creepManager.run();
    }
}
