import JobManager from '../Job/JobManager';
import EconomyAdvisor from './EconomyAdvisor';

export default class Council {
    private readonly jobManager: JobManager;

    constructor(jobManager: JobManager) {
        this.jobManager = jobManager;
    }

    run(): void {
        console.log('  Council');

        new EconomyAdvisor(this.jobManager).run();
    }
}
