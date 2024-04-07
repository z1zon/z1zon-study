import Submit from "./Submit";

const UseStatusForm = () => {
  return (
    <form action={handleSubmit}>
      <Submit />
    </form>
  );
};

const handleSubmit = () => new Promise((res) => setTimeout(res, 3000));

export default UseStatusForm;
