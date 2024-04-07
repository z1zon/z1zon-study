import UseStatusForm from "./components/UseStatusForm";
import UseStateForm from "./components/UseStateForm";

function App() {
  return (
    <div>
      <section>
        <h1>use form status</h1>
        <UseStatusForm />
      </section>
      <hr />
      <section>
        <h1>use form state</h1>
        <UseStateForm />
      </section>
    </div>
  );
}

export default App;
