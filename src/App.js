import './App.css';
import SongInfo from './SongInfo';
import SongControls from './SongControls';
import UpNext from "./UpNext";

function App() {
  return (
    <div className="App">
      <div className="center">
        <SongInfo />
        <SongControls />
      </div>

      <div className="right">
        <UpNext />
      </div>
    </div>
  );
}

export default App;
