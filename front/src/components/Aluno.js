import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import {useForm} from 'react-hook-form';
import { BrowserRouter, Routes, Link, Route } from 'react-router-dom';
import MaskedInput from './MaskedInput';
function Aluno() {
  const [posts, setPosts] = useState([]);
  useEffect(()=>{
    axios.get("http://localhost:8000/aluno/pegarTodas")
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
  const cadastro = dados => axios.post("http://localhost:8000/aluno/criar", dados)
  .then(()=>{
    alert("Cadastro realizado com Sucesso");
    window.location.reload(true);
  })
  .catch(()=>{
    console.log("EITA BIXO");
  })
  function deleteAluno(id){
    axios.delete(`http://localhost:8000/aluno/deletar/${id}`)
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
            <Form.Control type="text" placeholder="Nome do Aluno" name="nome" {...register("nome")} required/>            
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCpf">
            <Form.Label>Cpf</Form.Label>
            <Form.Control type="text" placeholder="cpf" name="cpf" {...register("cpf")} required/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicMatricula">
              <Form.Label>Matricula</Form.Label>
              <Form.Control type="text" placeholder="N° da Matricula" name="numeroMatricula" {...register("numeroMatricula")} required/>
          </Form.Group> 
          <Form.Group className="mb-3" controlId="formBasicMatricula">
              <Form.Label>Módulo</Form.Label>
              <Form.Control type="text" placeholder="Modulo" name="Modulo" {...register("Modulo")} value="Módulo 1" disabled/>
          </Form.Group>  
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
          <th>Matricula</th>
          <th>Turma</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody> 
        {posts.map((post)=>(
          <tr>
            <td>{post.nome}</td>
            <td>{post.numeroMatricula}</td>
            <td>{post.turma.id}</td>
            <td>
              <Link to= {{pathname:`/alunoEdit/${post.id}`}}>
                <Button variant="warning">Editar</Button>
              </Link>
              <Button variant="danger" onClick={(() => deleteAluno(post.id))}>Excluir</Button>
            </td>
          </tr>
        ))}            
      </tbody>
    </Table>
    <Button variant="info" onClick={handleShow}>Novo</Button>
  </div>
  );
}

export default Aluno;
