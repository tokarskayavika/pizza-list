import Form from "../Form";
import ItemsList from "../ItemsList";

import { Provider } from "react-redux";
import { store } from "../../store";

import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <div className="container">
        <Form />
        <ItemsList />
      </div>
    </Provider>
  );
}

export default App;
