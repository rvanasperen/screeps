import BaseAdvisor from './BaseAdvisor';

export class Council {
    private readonly advisors: BaseAdvisor[] = [];

    public constructor(advisors: BaseAdvisor[] = []) {
        this.advisors = advisors;
    }

    public run(): void {
        for (const advisor of this.advisors) {
            advisor.run();
        }
    }
}
