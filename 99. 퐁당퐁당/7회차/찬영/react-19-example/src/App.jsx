import UseStatusForm from "./components/UseStatusForm";
import UseStateForm from "./components/UseStateForm";
import Optimistic from "./components/Optimistic/Optimistic";

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
      <section>
        <h1>use optimistic</h1>
        <Optimistic />
      </section>
    </div>
  );
}

export default App;
