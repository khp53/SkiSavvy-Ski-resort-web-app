class PriorityQueue {
    constructor() {
        this.items = [];
    }

    // Method to add an element with a priority to the queue
    enqueue(element, priority) {
        const queueElement = { element, priority };
        let added = false;
        for (let i = 0; i < this.items.length; i++) {
            if (queueElement.priority < this.items[i].priority) {
                this.items.splice(i, 0, queueElement);
                added = true;
                break;
            }
        }
        if (!added) {
            this.items.push(queueElement);
        }
    }

    // Method to remove and return the element with the highest priority
    dequeue() {
        return this.items.shift();
    }

    // Method to check if the queue is empty
    isEmpty() {
        return this.items.length === 0;
    }
}

module.exports = PriorityQueue;