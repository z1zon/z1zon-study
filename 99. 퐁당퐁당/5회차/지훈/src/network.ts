import axios from "axios";

export async function exampleRequest() {
  const apiUrl = "https://jsonplaceholder.typicode.com/posts/1";
  const res = await axios.get(apiUrl);
  return res.data;
}
