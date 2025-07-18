import Job from '../../Job/Job';

export default abstract class BaseRole {
    protected readonly creep: Creep;
    protected readonly job: Job;

    constructor(creep: Creep, job: Job) {
        this.creep = creep;
        this.job = job;
    }
}
