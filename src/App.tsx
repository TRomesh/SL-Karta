import "./App.css";
import data from "./data";
import MetroLineMap from "./components/MetroLineMap";

function App() {
  return (
    <div className="App">
      <MetroLineMap
        data={data}
        width={1850}
        height={1000}
      />
    </div>
  );
}

export default App;
