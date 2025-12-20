import Home from './pages/Home';
import Auth from './pages/Auth';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <div className='bg-slate-900 h-[100vh]'>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        pauseOnHover
        theme="dark"
      />
    <BrowserRouter >
      <Routes>
        <Route path='/' element={<Auth/>} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
