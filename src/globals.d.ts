import 'lodash';

declare const _: _.LoDashStatic;

declare global {
    interface CreepMemory {
        role?: string;
        jobId?: string;
    }
}
