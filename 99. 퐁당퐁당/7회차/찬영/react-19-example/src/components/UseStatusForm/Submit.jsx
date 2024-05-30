import { useFormStatus } from "react-dom";

const Submit = () => {
  const { pending } = useFormStatus();

  return <button disabled={pending}>{pending ? "Submitting..." : "Submit"}</button>;
};

export default Submit;
