import ICity from "./interfaces/ICity";
import IReport from "./interfaces/IReportable";
import Person from "./interfaces/people";
import PriorityQueue from "./queue";

export class SimpleReport implements IReport {
    map: {city: ICity};
    queue: PriorityQueue<Person>;

    constructor(data: {city: ICity}, queue: PriorityQueue<Person>) {
        this.map = data;
        this.queue = queue;
    }

    printDetails(): void {
        for (const cityName in this.map.city) {
            const city = this.map.city[cityName];
            city.clinics.forEach(clinic => {
                const e = this.queue.getElements();
                const people = e.filter(element => element.clinic.name === clinic.name)
                console.log(`CLINIC NAME : ${clinic.name} -`)
                people.forEach((element) => {
                    console.log(`People In Lineup: ${element.item.fullName}`);
                })
            });
        }
    }
}

export class ComplexReport implements IReport {
    map: {city: ICity};
    queue: PriorityQueue<Person>;

    constructor(data: {city: ICity}, queue: PriorityQueue<Person>) {
        this.map = data;
        this.queue = queue;
    }

    printDetails(): void {
        for (const cityName in this.map.city) {
            const city = this.map.city[cityName];
            city.clinics.forEach(clinic => {
                const e = this.queue.getElements();
                const people = e.filter(element => element.clinic.name === clinic.name)
                const peopleInLine = people.length;
                const waitTimeMinutes = this.queue.getCurrentWaitTime(peopleInLine);
                console.log(`CLINIC NAME : ${clinic.name} -`)
                console.log(`Average Wait Time for ${clinic.name}: ${waitTimeMinutes} minutes`);
                people.forEach((element) => {
                    console.log(`People In Lineup: ${element.item.fullName}`);
                })
            });
        }
    }
}