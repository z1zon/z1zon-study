import { QueryState } from "./types/query";

export default function rerender(state: QueryState) {
  const $container = document.getElementById("container")!;
  const $span = document.createElement("span");
  $span.textContent = state.data ? `${state.data.title}` : "nothing...";
  $container.appendChild($span);
}
