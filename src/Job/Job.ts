import JobType from './JobType';

export default interface Job {
    id: string;
    type: JobType;
    targetId: Id<any>;
}
