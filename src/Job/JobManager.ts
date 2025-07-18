import Job from './Job';
import JobType from './JobType';

export default class JobManager {
    private readonly jobs: Job[] = [];

    addJob(job: Job): void {
        this.jobs.push(job);
    }

    getJobs(): Job[] {
        return this.jobs;
    }

    getJobsByType(type: JobType): Job[] {
        return this.jobs.filter(job => job.type === type);
    }
}
