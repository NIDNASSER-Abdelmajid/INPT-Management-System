import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from './layout/navbar';
import Home from './pages/home';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import AddStudent from './students/addStudent';
import EditStudent from './students/editStudent';
import ViewStudent from './students/viewStudent';

function App() {
  return (
    <div className="App">
      <Router>
      <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/addstudent' element={<AddStudent />}/>
          <Route exact path='/viewstudent/:id' element={<ViewStudent />}/>
          <Route exact path='/editstudent/:id' element={<EditStudent />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
