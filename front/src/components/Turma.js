import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import {useForm} from 'react-hook-form';
import { BrowserRouter, Routes, Link, Route } from 'react-router-dom';
// import Alert from 'react-bootstrap/Alert';
function Turma() {
  const [posts, setPosts] = useState([]);
  useEffect(()=>{
    axios.get("http://localhost:8000/turma/pegarTodas")
    .then((response)=>{
      setPosts(response.data)
    })
    .catch(()=>{

    })
  },[])
  const {register, handleSubmit, formState: {erros}} = useForm();
  const cadastro = dados => axios.post("http://localhost:8000/turma/criar", dados)
  .then(()=>{
    alert("Cadastro realizado com Sucesso");
    window.location.reload(true);
  })
  .catch(()=>{
    alert("Numero de turma ja existe!");
    window.location.reload(true);
  })
  function deleteTurma(id){
    axios.delete(`http://localhost:8000/turma/deletar/${id}`)
    setPosts(posts.filter(post=> post.id !== id))
  }
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (    
  <div>
    <Modal show={show} onHide={handleClose} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Turma</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(cadastro)}> 
        <Form.Label>Selecione uma Disciplina</Form.Label>
          <Form.Select aria-label="Selecione uma disciplina" name="disciplina" {...register("disciplina")} required>
            <option value="Matemática">Matemática</option>
            <option value="Português">Português</option>
            <option value="História">História</option>
            <option value="Geografia">Geografia</option>
            <option value="Ciências">Ciências</option>
          </Form.Select> 
            <br/>             
            <Form.Group className="mb-3" controlId="formBasicMatricula">
              <Form.Label>Numero da Turma</Form.Label>
              <Form.Control type="number" placeholder="N° da Turma" name="NDaTurma" {...register("NDaTurma")} required/>                           
            </Form.Group> 
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
          <th>Turma</th>
          <th>Disciplina</th>
          <th>Professor</th>
          <th>Alunos</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody> 
        {posts.map((post)=>(
          <tr>                        
            <td>{post.id}</td>
            <td>{post.disciplina}</td>
            <td>{post.professor && post.professor.nome}</td>
            <td>{post.alunos.length}</td>
            <td>
            <Link to= {{pathname:`/turmaEdit/${post.id}`}}>
                <Button variant="warning">Editar</Button>
              </Link>
              {post.alunos.length == 0 && !post.professor ?<Button variant="danger" onClick={(() => deleteTurma(post.id))}>Excluir</Button>:""} 
            </td>
          </tr>
        ))}            
      </tbody>
    </Table>
    <Button variant="info" onClick={handleShow}>Novo</Button>
  </div>
  );
}

export default Turma;
