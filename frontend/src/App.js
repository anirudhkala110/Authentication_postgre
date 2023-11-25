import logo from './logo.svg';
import './App.css';
import Login from './Component/Login';
import Signup from './Component/Signup';

function App() {
  return (
    <div className="App bg-light py-4">
      <center className='fs-3 fw-semibold mb-4 p-3 border-bottom'>Authentication Page</center>
      <div className='container d-flex justify-content-center align-items-center' style={{minHeight:"65vh"}}>
        <div className='mx-3 login'>
          <Login />
        </div>
        <div className='mx-3 signup'>
          <Signup />
        </div>

      </div>
    </div>
  );
}

export default App;
