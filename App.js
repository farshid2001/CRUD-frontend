
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Navbar from './Componats/Navbar/Navbar';
import ListUser from './Componats/ListUser/ListUser';
import CreateUser from './Componats/CreateUser/CreateUser';

function App() {
  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path='/' element={<ListUser/>}/>
      <Route path='/createUser' element={<CreateUser/>}/>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
