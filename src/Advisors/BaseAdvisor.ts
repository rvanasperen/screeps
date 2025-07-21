import JobManager from '@/Job/JobManager';

export default abstract class BaseAdvisor {
    protected readonly jobManager: JobManager;

    public constructor(jobManager: JobManager) {
        this.jobManager = jobManager;
    }

    public abstract run(): void;
}
