import ColonyManager from './Colony/ColonyManager';
import JobManager from "./Job/JobManager";
import Council from "./Advisors/Council";
import CreepManager from "./Creep/CreepManager";
import EconomyAdvisor from "./Advisors/EconomyAdvisor";

// noinspection JSUnusedGlobalSymbols
export function loop(): void {
    const jobManager = new JobManager();
    const creepManager = new CreepManager(jobManager);

    const council = new Council([
        new EconomyAdvisor(jobManager),
    ]);

    new ColonyManager(council, creepManager).run();
}
