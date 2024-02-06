import Iterator from "./Iterator";

interface Aggregator<T> {
    iterator(): Iterator<T>;
}

export default Aggregator