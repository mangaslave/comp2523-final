
import ICity from "./interfaces/ICity";
import Clinic from "./interfaces/clinic";
import Household from "./interfaces/household";
import Person from "./interfaces/people";
import PriorityQueue from "./queue";

const {readFile} = require("node:fs/promises");
const EOL = require("node:os")

export default class Map {

    grid: string[][] = [];
    width: number = 7;
    height: number;
    private _mapdata: {city: ICity};
    //@ts-ignore
    private queue: PriorityQueue = new PriorityQueue();

    private constructor (data: {city: ICity}) {
        this._mapdata = data;
        // @ts-ignore
        this.height = data.city.length;
        // this.populateGrid();
    }

    getqueue(): PriorityQueue<Person> {
        return this.queue;
    }

    getdata():  {city: ICity}{
        return this._mapdata;
    }

    static async buildmap() {
        let data = await readFile("./data.json", "utf8");
        let mapData: ICity = JSON.parse(data);
        // @ts-ignore
        return new Map(mapData);
    }

    populateGrid() {
        // @ts-ignore
        const cities = Object.keys(this._mapdata.city); 
        this.grid = cities.map(city => Array(this.width).fill('X')); 
    
        cities.forEach((city, cityIndex) => {
            // @ts-ignore
            const cityData = this._mapdata.city[city];
            const { households, clinics } = cityData;
    
            households.forEach((household: any) => {
                const blockNum = household.blockNum;
                const hasUnvaccinated = household.inhabitants.some((person: any) => !person.isVaccinated);
                const symbol = hasUnvaccinated ? 'H' : 'F';
                this.buildgrid(cityIndex, blockNum, symbol);
            });
    
            clinics.forEach((clinic: any) => {
                const blockNum = clinic.blockNum;
                this.buildgrid(cityIndex, blockNum, 'C');
            });
        });
    }

    buildgrid(row: number, col: number, symbol: string) {
        if (col < this.width && (this.grid[row][col] === 'X' || this.grid[row][col] < symbol)) {
            this.grid[row][col] = symbol;
        }
    }
    

    printMap() {
        console.log(this.grid.map(row => row.join(',')).join('\n'));
    }

    registerForShots() {
        let currentIntake = 20;
        // @ts-ignore
        Object.keys(this._mapdata.city).forEach((cityName, cityIndex) => {
            // @ts-ignore
            const city = this._mapdata.city[cityName];
            // @ts-ignore

            city.households.forEach(household => {
                household.inhabitants.forEach((person: Person) => {
                    if(person.age >= currentIntake) {
                        if (!person.isVaccinated) {
                            const nearestClinic = findNearestClinic(city.clinics, household);
                            this.queue.equeue(person, nearestClinic);
                        }
                    }
                });
            });
        });
        

        this.printMap();
    }

    updateMap() {
        while (!this.queue.isEmpty()) {
            const person = this.queue.dequeue();
            person.isVaccinated = true; 

            // let household = this.findHousehold(person);
            // if (household && household.inhabitants.every((p: Person) => p.isVaccinated)) {
            //     const blockNum = household.blockNum;
            //     this.populateGrid();
            // }
        }
        this.populateGrid();
    }

    // findHousehold(person: Person): Household | null {
    //     for (let cityName in this._mapdata.city) {
    //         const cityData = this._mapdata.city[cityName];
      
    //         for (let household of cityData.households) {
    //           if (household.inhabitants.includes(person)) {
    //             return household;
    //           }
    //         }
    //     }
    //     return null;
    // }

}

function findNearestClinic(clinics: Clinic[], household: Household): Clinic {
    let nearestClinic = clinics[0];
    let minimumDistance = Math.abs(clinics[0].blockNum - household.blockNum);

    clinics.slice(1).forEach(clinic => {
        let distance = Math.abs(clinic.blockNum - household.blockNum);
        if (distance < minimumDistance) {
            nearestClinic = clinic;
            minimumDistance = distance;
        }
    });

    return nearestClinic;
}
