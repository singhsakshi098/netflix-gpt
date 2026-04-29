import { Provider } from "react-redux";
import Body from "./components/Body";
import appStore from "./utils/appStore";

const App = () => {
  // ✅ This is a normal JavaScript statement (no JSX here)
  window.store = appStore;

  return (
    <div className="overflow-x-hidden">
      <Provider store={appStore}>
        <Body />
      </Provider>
    </div>
  );
};

export default App;
