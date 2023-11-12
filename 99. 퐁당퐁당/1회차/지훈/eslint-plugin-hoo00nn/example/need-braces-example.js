function need_braces_rules_example() {
  const arr = [1, 2, 3, 4, 5];
  if (arr.length === 0) return false;
  for (let i = 0; i < arr.length; i++) console.log("num : ", arr[i]);
}
