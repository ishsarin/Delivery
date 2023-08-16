
import './App.css';
import { Login } from './components/Login';
import val from './components/Login';
import { Manufacturer } from './components/Manufacturer';
import {TransporterMessages} from "./components/TransporterMessages"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ManufacturerMessage } from './components/ManufacturerMessage';
function App() {
  
  return (
    <div className="App">
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}>
        </Route>
        
        <Route path="/Manufacturer" element={<Manufacturer />}/>
        <Route path="/Manufacturer/message" element={<ManufacturerMessage />}/>
        <Route path="/Transporter/messages" element={<TransporterMessages />}/>
        
      </Routes>
    </BrowserRouter>
    
    </div>
  );
}

export default App;
