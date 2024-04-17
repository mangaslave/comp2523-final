import IReport from "./interfaces/IReportable";

export default class ReportMaker {
    private report: IReport

    constructor(report: IReport) {
        this.report = report;
    }
    
    printDetails(): void {
        this.report.printDetails();
    }
}