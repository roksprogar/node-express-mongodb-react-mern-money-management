import './App.css';
import 'antd/dist/antd.min.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Test from './pages/Test';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <GuestRoute>
                <Home />
              </GuestRoute>
            }
          ></Route>
          <Route
            path="/test"
            element={
              <GuestRoute>
                <Test />
              </GuestRoute>
            }
          ></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export function GuestRoute(props) {
  if (localStorage.getItem('pmm-user')) {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
}

export default App;
