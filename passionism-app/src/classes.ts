export class ResearcherClass {
    subject: string;

    constructor(subject: string) {
        this.subject = subject;
    }

    research(): void {
        console.log(`Researching...`, this.subject);
    }
}