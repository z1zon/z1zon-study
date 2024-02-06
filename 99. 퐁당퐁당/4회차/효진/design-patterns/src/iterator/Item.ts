class Item {
    constructor( private _name: string, private _cost: number) {}

    get name() {
        return this._name;
    }

    get cost() {
        return this._cost;
    }
    
}

export default Item