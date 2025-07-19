import JobManager from '../Job/JobManager';
import JobType from '../Job/JobType';
import Harvester from './Roles/Harvester';

export default class CreepManager {
    private readonly jobManager: JobManager;

    public constructor(jobManager: JobManager) {
        this.jobManager = jobManager;
    }

    public run(): void {
        console.log('  CreepManager');

        this.runCreeps();
        this.spawnCreeps();
    }

    private runCreeps(): void {
        for (const name in Memory.creeps) {
            const creep = Game.creeps[name];

            if (!creep) {
                delete Memory.creeps[name];
                continue;
            }

            console.log(`  - Creep: ${creep.name}`);

            const job =
                this.jobManager.getJobsByType(JobType.Harvest).find(job => job.id === creep.memory.jobId) ?? null;

            if (!job) {
                throw new Error('Job not found');
            }

            console.log(`  - Job: ${job.id}`);

            switch (creep.memory.role) {
                case 'harvester':
                    new Harvester(creep, job).run();
                    break;
            }
        }
    }

    private spawnCreeps(): void {
        console.log('  - Available jobs:');

        for (const job of this.jobManager.getJobs()) {
            console.log(job);
        }

        for (const job of this.jobManager.getJobsByType(JobType.Harvest)) {
            console.log(`  - Job: ${job.id}`);
            const activeCreep =
                _.filter(Game.creeps, (creep: Creep) => creep.memory.jobId === job.id)[0] ?? null;

            console.log(`  - Active creep: ${activeCreep}`)

            if (activeCreep) {
                console.log(`  - Active creep: ${activeCreep.name}`);
                continue;
            }

            const spawn = Game.spawns['Spawn1'];

            if (spawn.spawning) {
                console.log(`  - Spawning in progress: ${spawn.spawning.name}`);
                continue;
            }

            console.log(`  - Spawning creep for job: ${job.id}`);

            const result = spawn.spawnCreep([WORK, CARRY, MOVE], job.id, {
                memory: {
                    role: 'harvester',
                    jobId: job.id,
                },
            });

            if (result === OK) {
                console.log(`  - Creep spawned: ${result}`);
            } else {
                console.log(`  - Error spawning creep: ${result}`);
            }

            break;
        }
    }
}
