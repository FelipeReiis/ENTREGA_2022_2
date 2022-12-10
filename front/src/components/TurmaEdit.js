import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import {useForm} from 'react-hook-form';
import {useParams} from 'react-router-dom';
function TurmaEdit() {
  const { id } = useParams();
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
  const cadastro = dados => axios.put(`http://localhost:8000/turma/editar/${id}`, dados)
  .then(()=>{
    alert("Atualizado com Sucesso");
    window.location.reload(true);
  })
  .catch(()=>{
    console.log("EITA BIXO");
  })
  const [show, setShow] = useState(false);
  return (    
  <div>
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
  </div>
  );
}

export default TurmaEdit;
