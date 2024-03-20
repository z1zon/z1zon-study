import { QueryClient } from "./core/query-client";
import fetch from "./fetch";
import { exampleRequest } from "./network";

export const queryClient = new QueryClient();

function main() {
  const { data, status } = fetch({
    queryKey: ["example"],
    queryFn: exampleRequest,
  });

  // console.log({ data, status });

  // const $container = document.getElementById("container")!;
  // const $button = document.createElement("button");
  // $button.textContent = "Fetch Data";
  // $button.addEventListener("click", () =>
  //   fetch({
  //     queryKey: ["example"],
  //     queryFn: exampleRequest,
  //   })
  // );

  // // 버튼을 버튼 컨테이너에 추가
  // $container.appendChild($button);
}

main();
