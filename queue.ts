export default class PriorityQueue<T> {
    private elements: {item: T, priority: number}[] = [];

    equeue(item: T, priority: number): void {
        this.elements.push({item, priority});
        this.elements.sort((a, b) => a.priority - b.priority);
    }

    dequeue(): T | undefined {
        return this.elements.shift()?.item;
    }

    isEmpty(): boolean {
        return this.elements.length === 0;
    }

    size(): number {
        return this.elements.length
    }

    getCurrentWaitTime(): string {
        return `current wait time is ${this.size() * 10} minutes`
    }
}