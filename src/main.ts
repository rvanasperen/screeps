import ColonyManager from './Colony/ColonyManager';
import JobManager from './Job/JobManager';
import { Council, EconomyAdvisor } from './Advisors';
import CreepManager from './Creep/CreepManager';

// noinspection JSUnusedGlobalSymbols
export function loop(): void {
    const jobManager = new JobManager();
    const creepManager = new CreepManager(jobManager);

    const council = new Council([new EconomyAdvisor(jobManager)]);

    new ColonyManager(council, creepManager).run();
}
