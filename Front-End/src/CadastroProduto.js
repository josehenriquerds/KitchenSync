import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const CadastroProduto = () => {
  const [produto, setProduto] = useState({
    nome: "",
    descricao: "",
    tempoPreparo: 20,
    categoria: "",
    disponivel: true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduto((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : name === "tempoPreparo" ? parseInt(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await withUrl("http://localhost:5000/api/produto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(produto)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error("Erro ao cadastrar: " + errorText);
      }

      alert("Produto cadastrado com sucesso!");
      setProduto({
        nome: "",
        descricao: "",
        tempoPreparo: 20,
        categoria: "",
        disponivel: true
      });
    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar produto.");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="nome">
        <Form.Label>Nome</Form.Label>
        <Form.Control type="text" name="nome" value={produto.nome} onChange={handleChange} />
      </Form.Group>

      <Form.Group controlId="descricao">
        <Form.Label>Descrição</Form.Label>
        <Form.Control type="text" name="descricao" value={produto.descricao} onChange={handleChange} />
      </Form.Group>

      <Form.Group controlId="tempoPreparo">
        <Form.Label>Tempo de Preparo (minutos)</Form.Label>
        <Form.Control type="number" name="tempoPreparo" value={produto.tempoPreparo} onChange={handleChange} />
      </Form.Group>

      <Form.Group controlId="categoria">
        <Form.Label>Categoria</Form.Label>
        <Form.Control type="text" name="categoria" value={produto.categoria} onChange={handleChange} />
      </Form.Group>

      <Form.Group controlId="disponivel">
        <Form.Check
          type="checkbox"
          label="Disponível"
          name="disponivel"
          checked={produto.disponivel}
          onChange={handleChange}
        />
      </Form.Group>

      <Button variant="primary" type="submit" className="mt-3">
        Cadastrar Produto
      </Button>
    </Form>
  );
};

export default CadastroProduto;
