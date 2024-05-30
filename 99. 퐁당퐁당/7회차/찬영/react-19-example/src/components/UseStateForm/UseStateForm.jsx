import { useFormState } from "react-dom";

const UseStateForm = () => {
  const [message, formAction] = useFormState(handleSubmit, null);

  return (
    <form action={formAction}>
      <label>Name</label>
      <input type="text" name="username" />
      <button>Submit</button>
      {message && <h3>{message.text}</h3>}
    </form>
  );
};

const handleSubmit = (prevState, queryData) => {
  const name = queryData.get("username");
  console.log(prevState);

  if (name === "Chanyeong") {
    return { success: true, text: "Welcome" };
  }
  return { success: false, text: "Error" };
};

export default UseStateForm;
