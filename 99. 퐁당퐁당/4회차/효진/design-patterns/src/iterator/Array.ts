import Aggregator from './Aggregator';
import ArrayIterator from './ArrayIterator';
import Item from './Item';
import Iterator from './Iterator';

class Array implements Aggregator<Item> {
    constructor(private items: Item[]) {}

    public getItem(index: number):Item {
        return this.items[index];
    }

    public get count() {
        return this.items.length;
    }
    
    iterator(): Iterator<Item> {
        return new ArrayIterator(this);
    }
}

export default Array