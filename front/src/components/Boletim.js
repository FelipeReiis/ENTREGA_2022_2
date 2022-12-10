import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import {useForm} from 'react-hook-form';
import { BrowserRouter, Routes, Link, Route } from 'react-router-dom';
import MaskedInput from './MaskedInput';
function Aluno() {
  const [posts, setPosts] = useState([]);
  useEffect(()=>{
    axios.get("http://localhost:8000/boletim/pegarTodas")
    .then((response)=>{
      setPosts(response.data)
    })
    .catch(()=>{

    })
  },[])  
  const {register, handleSubmit, formState: {erros}} = useForm();
  const cadastro = dados => axios.post("http://localhost:8000/boletim/criar", dados)
  .then(()=>{
    alert("Cadastro realizado com Sucesso");
    window.location.reload(true);
  })
  .catch(()=>{
    console.log("EITA BIXO");
  })
  function deleteAluno(id){
    axios.delete(`http://localhost:8000/boletim/deletar/${id}`)
    setPosts(posts.filter(post=> post.id !== id))
  }
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (    
  <div>
    <Modal show={show} onHide={handleClose} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Boletim</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(cadastro)}>
        <Form.Select aria-label="Nota" name="Nota" {...register("Nota")}>
          <option value="null">Selecione uma Nota</option>
          <option value={1}>1</option>
          <option value={2} >2</option>         
          <option value={3} >3</option>         
          <option value={4} >4</option>         
          <option value={5} >5</option>         
          <option value={6} >6</option>         
          <option value={7} >7</option>         
          <option value={8} >8</option>         
          <option value={9} >9</option>         
          <option value={10} >10</option>         
        </Form.Select>     
          <Form.Label>Boletim</Form.Label>
        <Form.Select aria-label="Status" name="Status" {...register("Status")}>
          <option value="null">Selecione um Boletim</option>
          <option value={true}>Aprovado</option>
          <option value={false} >Reprovado</option>         
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
          <th>Aluno</th>
          <th>Nota Final</th>
          <th>Status</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody> 
        {posts.map((post)=>(
          <tr>
            <td>{post.aluno && post.aluno.nome}</td>
            <td>{post.notaFinal}</td>
            {post.aprovado == true?<td>Aprovado</td>: <td>Reprovado</td>}            
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
