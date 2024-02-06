import Array from "./Array";
import Item from "./Item";

const items = [
    new Item("고구마", 1000),
    new Item("호박 고구마", 2000),
    new Item("밤 고구마", 3000),
    new Item("고구마 말랭이", 4000),
]

const array = new Array(items);
const iter = array.iterator()

while(iter.next()) {
    const item = iter.current();

    const domItem = document.createElement("div")
    domItem.innerText = `${item.name} : ${item.cost}원`
    document.body.appendChild(domItem)

    domItem.classList.add("iterator-item")
}
