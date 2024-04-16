import Clinic from "./interfaces/clinic";
import Household from "./interfaces/household";
import Person from "./interfaces/people";


const {readFile} = require("node:fs/promises");
const EOL = require("node:os");

// import data from "../finalexamOOP/data.json"

export default class City {
    city: string[] = [];

    private constructor(data: string[]) {
        this.city = data;
    }
    
    static parseLineH(line: string): { info: Household } {
        let [blockNum,  phn, fullName, isVacinated, age] = line.split(',');
        return {  info: {blockNum, inhabitants: { phn, fullName, isVacinated, age }} };
    }

    static async buildmap() {
        let data = await readFile("./data.json", "utf8");
        data = JSON.parse(data);
        // return data;
        //  data.reduce((acc: { [key: string]: string[] }, line: string) => {
        //      const { name, info } = City.parseLine(line);
        //      if (!acc[name]) {
        //        acc[name] = [];
        //      }
        //      acc[name].push(info);
        //      return acc;
        //    }, {});
        // data.split(EOL).forEach((line: string) => {
        //     const [city, households, blockNum, inhabitants] = line.split(',');
        // }); 
        // for (const [key, key2] of Object.keys(data)){
        //     if(typeof data[key]=='object'){
        //         return data[key[key2]];
        //     }else{
        //         return data[key];
        //     }
        // }
        return data;
    }

    getWidth() {

    }

    getHeight() {
        
    }

}

async function main() {
    const content = await City.buildmap()
    console.log(content);
}

main();