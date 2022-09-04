import { Route, Routes } from 'react-router-dom';
import './App.css';
import { ForgotPassword } from './ForgotPassword';
import { Header } from './Header';
import { Home } from './Home';
import { Login } from './Login';
import { ResetPassword } from './ResetPassword';
import { SignUp } from './SignUp';


function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
      <Route path="/" element={<SignUp />}/>
        <Route path="/home" element={<Home />}/>
        <Route path="/users/login" element={<Login />} />
        <Route path="/users/signup" element={<SignUp />} />
        <Route path="/users/forgotpassword" element={<ForgotPassword />}/>
        <Route path={`users/reset-password/:id/:token`} element={<ResetPassword />}/>
      </Routes>
    </div>
  );
}

export default App;
