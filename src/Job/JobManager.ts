import Job from './Job';
import JobType from './JobType';

export default class JobManager {
    private readonly jobs: Job[] = [];

    public addJob(job: Job): void {
        this.jobs.push(job);
    }

    public getJobs(): Job[] {
        return this.jobs;
    }

    public getJobsByType(type: JobType): Job[] {
        return this.jobs.filter(job => job.type === type);
    }
}
