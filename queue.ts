import Clinic from "./interfaces/clinic";
import Person from "./interfaces/people";

export default class PriorityQueue<Person> {
    private elements: {item: Person, clinic: Clinic}[] = [];

    equeue(item: Person, clinic: Clinic): void {
        this.elements.push({item, clinic});
    }

    dequeue(): Person | undefined {
        return this.elements.shift()?.item;
    }

    isEmpty(): boolean {
        return this.elements.length === 0;
    }

    size(): number {
        return this.elements.length
    }

    getCurrentWaitTime(line: number): number {
        return line * 15
    }

    getElements() {
        return this.elements;
    }
}