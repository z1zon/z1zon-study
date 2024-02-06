interface Iterator<T> {
    next(): boolean
    current(): T
}

export default Iterator