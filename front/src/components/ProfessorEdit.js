import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Button, Form, Alert } from 'react-bootstrap';
import {useForm} from 'react-hook-form';
import {useParams} from 'react-router-dom';
import MaskedInput from './MaskedInput';
function ProfessorEdit() {  
  const { id } = useParams();
  const [turmas, setTurmas] = useState([]);
  useEffect(()=>{
    axios.get("http://localhost:8000/turma/pegarTodas")
    .then((response)=>{
      setTurmas(response.data)
    })
  },[])

  const {register, handleSubmit, formState: {erros}, reset} = useForm();
  const cadastro = dados => axios.put(`http://localhost:8000/professor/editar/${id}`, dados)
  .then(()=>{
    alert("Atualizado com Sucesso");
    window.location.reload(true);
  })
  
  useEffect(()=>{
    axios.get(`http://localhost:8000/professor/editar/${id}`)
    .then((response)=>{
      reset(response.data)
    })
  })
  return (    
    <div>    
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
  </div>
  );
}

export default ProfessorEdit;
