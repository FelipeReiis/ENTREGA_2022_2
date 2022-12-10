import Logo from './assets/imgs/logo.png';
import Aluno from './components/Aluno';
import AlunoEdit from './components/AlunoEdit';
import ProfessorEdit from './components/ProfessorEdit';
import TurmaEdit from './components/TurmaEdit';
import Home from './components/Home';
import Professor from './components/Professor';
import Turma from './components/Turma';
import Boletim from './components/Boletim';
import { BrowserRouter, Routes, Link, Route } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="#home"><img src={Logo} alt="" /></Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Pagina Inicial</Nav.Link>
            <Nav.Link as={Link} to="/aluno">Aluno</Nav.Link>
            <Nav.Link as={Link} to="/professor">Professor</Nav.Link>
            <Nav.Link as={Link} to="/turma">Turma</Nav.Link>
            <Nav.Link as={Link} to="/boletim">Boletim</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
        <Routes>
          <Route path="/" index element={<Home/>}></Route>
          <Route path="/aluno" index element={<Aluno/>}></Route>
          <Route path="/alunoEdit/:id" index element={<AlunoEdit/>}></Route>
          <Route path="/professor" index element={<Professor/>}></Route>
          <Route path="/professorEdit/:id" index element={<ProfessorEdit/>}></Route>
          <Route path="/turma" index element={<Turma/>}></Route>
          <Route path="/turmaEdit/:id" index element={<TurmaEdit/>}></Route>
          <Route path="/boletim" index element={<Boletim/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
