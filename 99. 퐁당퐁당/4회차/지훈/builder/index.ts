import QueryBuilder from "./query-builder";

function main() {
  const query = new QueryBuilder()
    .and("name", "hoo00nn")
    .or("name", "chanyeong")
    .and("age", "29")
    .build();

  console.log(query);
}

main();
