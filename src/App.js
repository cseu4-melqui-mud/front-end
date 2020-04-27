import React, {useEffect} from 'react';
import SignInSide from "./components/signUpRegister"
import './App.css';

let token = localStorage.getItem("token")

function App() {
  return (
    <div className="App">
      {token ? null : <SignInSide />}
    </div>
  );
}

export default App;
