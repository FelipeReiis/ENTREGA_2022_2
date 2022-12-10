import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import {useForm} from 'react-hook-form';
import { BrowserRouter, Routes, Link, Route } from 'react-router-dom';
// import Alert from 'react-bootstrap/Alert';
import MaskedInput from './MaskedInput';
function Professor() {
  const [posts, setPosts] = useState([]);
  useEffect(()=>{
    axios.get("http://localhost:8000/professor/pegarTodas")
    .then((response)=>{
      setPosts(response.data)
    })
    .catch(()=>{

    })
  },[])

  const [turmas, setTurmas] = useState([]);
  useEffect(()=>{
    axios.get("http://localhost:8000/turma/pegarTodas")
    .then((response)=>{
      setTurmas(response.data)
    })
    .catch(()=>{

    })
  },[])

  const {register, handleSubmit, formState: {erros}} = useForm();
  const cadastro = dados => axios.post("http://localhost:8000/professor/criar", dados)
  .then(()=>{
    alert("Cadastro realizado com Sucesso");
    window.location.reload(true);
  })
  .catch(()=>{
    console.log("EITA BIXO");
  })
  function deleteProfessor(id){
    axios.delete(`http://localhost:8000/professor/deletar/${id}`)
    setPosts(posts.filter(post=> post.id !== id))
  }
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (    
  <div>
    <Modal show={show} onHide={handleClose} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(cadastro)}>
          <Form.Group className="mb-3" controlId="formBasicNome">
            <Form.Label>Nome</Form.Label>
            <Form.Control type="text" placeholder="Nome do Professor" name="nome" {...register("nome")} required/>            
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCpf">
            <Form.Label>Cpf</Form.Label>
            <Form.Control type="text" placeholder="cpf" name="cpf" {...register("cpf")} required/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicMatricula">
              <Form.Label>Titulo Acadêmico</Form.Label>
              <Form.Control type="text" placeholder="ex: graduado" name="tituloAcademico" {...register("tituloAcademico")} required/>
          </Form.Group>   
          <Form.Label>Disicplina</Form.Label>     
           <Form.Select aria-label="Selecione uma disciplina" name="disciplina" {...register("disciplina")} required>
            <option value="null">Selecione uma Disicplina</option>
            <option value="Matemática">Matemática</option>
            <option value="Português">Português</option>
            <option value="História">História</option>
            <option value="Geografia">Geografia</option>
            <option value="Ciências">Ciências</option>
          </Form.Select> 
            <br/> 
            <Form.Label>Turma</Form.Label>
            <Form.Select aria-label="Selecione uma turma" name="turma" {...register("turma")} required>
              <option value="null">Selecione uma Turma</option>
              {turmas.map((turma)=>(
              <option value={turma.id}>{turma.id}</option>
              ))} 
            </Form.Select>    
          <br/>     
            <Button variant="primary" type="submit">
              Salvar
            </Button>
          </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
    <Table striped size="sm">
      <thead>
        <tr>
          <th>Nome</th>
          <th>cpf</th>
          <th>Titulo Acadêmico</th>
          <th>Disciplina</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody> 
        {posts.map((post)=>(
          <tr>
            <td>{post.nome}</td>
            <td>{post.cpf}</td>
            <td>{post.tituloAcademico}</td>
            <td>{post.disciplina}</td>
            <td>
            <Link to= {{pathname:`/professorEdit/${post.id}`}}>
                <Button variant="warning">Editar</Button>
              </Link>
              <Button variant="danger" onClick={(() => deleteProfessor(post.id))}>Excluir</Button>
            </td>
          </tr>
        ))}            
      </tbody>
    </Table>
    <Button variant="info" onClick={handleShow}>Novo</Button>
  </div>
  );
}

export default Professor;
