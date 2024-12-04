import './App.css';
import { Demo } from './components/demo.tsx';
import { SimpleMind } from './components/simpleMind.tsx'
import ReactFlowDemo from './components/react-flow/reactFlowDemo.tsx'
// import { AudioStreamPlayer } from './components/AudioStreamPlayer.tsx';
function App() {
  return (
    <div className="App" id='app'>
      <ReactFlowDemo />
      {/* <Demo/> */}
      {/* <SimpleMind /> */}
      {/* <AudioStreamPlayer /> */}
    </div>
  );
}

export default App;
