import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Button, Form, Alert } from 'react-bootstrap';
import {useForm} from 'react-hook-form';
import {useParams} from 'react-router-dom';
import MaskedInput from './MaskedInput';
function AlunoEdit() {  
  const { id } = useParams();
  const [turmas, setTurmas] = useState([]);
  useEffect(()=>{
    axios.get("http://localhost:8000/turma/pegarTodas")
    .then((response)=>{
      setTurmas(response.data)
    })
  },[])
  const [boletins, setBoletins] = useState([]);
  useEffect(()=>{
    axios.get("http://localhost:8000/boletim/pegarTodas")
    .then((response)=>{
      setTurmas(response.data)
    })
  },[])
  const {register, handleSubmit, formState: {erros}, reset} = useForm();
  const cadastro = dados => axios.put(`http://localhost:8000/aluno/editar/${id}`, dados)
  .then(()=>{
    alert("Atualizado com Sucesso");
    window.location.reload(true);
  })

  useEffect(()=>{
    axios.get(`http://localhost:8000/aluno/editar/${id}`)
    .then((response)=>{
      reset(response.data)
    })
  })
  return (    
    <div>    
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
      <Form.Group className="mb-3" controlId="formBasicModulo">
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
      <Form.Label>Boletim</Form.Label>
      <Form.Select aria-label="Selecione um Boletim" name="boletim" {...register("boletim")}>
        <option value="null">Selecione um Boletim</option>
        {boletins.map((boletim)=>(
        <option value={boletim.id}>{boletim.id}</option>
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

export default AlunoEdit;
