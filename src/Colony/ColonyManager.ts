import Council from '../Advisors/Council';
import JobManager from '../Job/JobManager';
import CreepManager from '../Creep/CreepManager';

export default class ColonyManager {
    run(): void {
        console.log('ColonyManager');

        const jobManager = new JobManager();

        new Council(jobManager).run();
        new CreepManager(jobManager).run();
    }
}

/*
tech level (bootstrap

economy advisor
 */
