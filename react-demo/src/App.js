import './App.css';
import { Demo } from './components/demo.tsx';
import { AudioStreamPlayer } from './components/AudioStreamPlayer.tsx';
function App() {
  return (
    <div className="App">
      <Demo/>
      <AudioStreamPlayer />
    </div>
  );
}

export default App;
