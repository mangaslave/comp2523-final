import { ComplexReport } from "./Reporttype";
import Map from "./map";
import ReportMaker from "./reportMaker";

async function main() {
    const map = await Map.buildmap();
    map.populateGrid();
    map.printMap();
    console.log("---End of Map---")
    map.registerForShots();
    const queue = map.getqueue()
    const data = map.getdata();
    const report = new ReportMaker(new ComplexReport(data, queue));
    report.printDetails();
    console.log("---End of Report---")
    map.updateMap();
    map.printMap();
    console.log("---End of Map---")
  }
  
  main();