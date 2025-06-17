// src/pages/CadastroProduto.jsx
import React, { useState, useEffect } from "react";
import { Button, Container, Form, Card, Badge, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { FaTrash, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CadastroProduto = () => {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [tempoPreparo, setTempoPreparo] = useState("");
  const [prioridade, setPrioridade] = useState("3");
  const [produtos, setProdutos] = useState([]);

  const carregarProdutos = async () => {
    try {
      const res = await fetch("/produtos.json");
      const data = await res.json();
      setProdutos(data);
    } catch (err) {
      console.error(err);
      toast.error("🚫 Erro ao carregar produtos.", { theme: "colored" });
    }
  };

  useEffect(() => {
    carregarProdutos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const produto = {
      nome,
      tempoPreparo: parseInt(tempoPreparo),
      prioridade: parseInt(prioridade),
    };

    try {
      const res = await fetch("https://localhost:5000/api/produto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([produto]),
      });

      if (res.ok) {
        toast.success("✅ Produto cadastrado com sucesso!", { theme: "colored" });
        setNome("");
        setTempoPreparo("");
        setPrioridade("3");
        carregarProdutos();
      } else {
        toast.error("🚫 Erro ao cadastrar produto.", { theme: "colored" });
      }
    } catch (err) {
      console.error(err);
      toast.error("🚫 Erro ao conectar com o servidor.", { theme: "colored" });
    }
  };

  const excluirProduto = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este produto?")) return;

    try {
      const res = await fetch(`https://localhost:5000/api/produto/${id}`, {
        method: "DELETE"
      });
      if (res.ok) {
        toast.success("🗑️ Produto excluído com sucesso!", { theme: "colored" });
        carregarProdutos();
      } else {
        toast.error("🚫 Erro ao excluir produto.", { theme: "colored" });
      }
    } catch (err) {
      console.error(err);
      toast.error("🚫 Erro ao conectar com o servidor.", { theme: "colored" });
    }
  };

  const getPrioridadeBadge = (prioridade) => {
    switch (prioridade) {
      case 1:
        return <Badge bg="danger">Alta</Badge>;
      case 2:
        return <Badge bg="warning" text="dark">Média</Badge>;
      default:
        return <Badge bg="success">Baixa</Badge>;
    }
  };

  return (
    <Container className="py-5" style={{minHeight: "100vh" }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold m-0" style={{ color: "#fca311" }}>
          📦 Cadastro de Produto
        </h2>
        <Button
          variant="light"
          className="d-flex align-items-center"
          onClick={() => navigate("/")}
        >
          <FaArrowLeft className="me-2" /> Voltar
        </Button>
      </div>

      <Form onSubmit={handleSubmit} className="mx-auto p-4 rounded shadow" style={{ maxWidth: 500, background: "#ffffff" }}>
        <Form.Group className="mb-3">
          <Form.Label className="fw-semibold">Nome do Produto</Form.Label>
          <Form.Control
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="fw-semibold">Tempo de Preparo (minutos)</Form.Label>
          <Form.Control
            type="number"
            value={tempoPreparo}
            onChange={(e) => setTempoPreparo(e.target.value)}
            required
            min={1}
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label className="fw-semibold">Prioridade</Form.Label>
          <Form.Select value={prioridade} onChange={(e) => setPrioridade(e.target.value)}>
            <option value="1">Alta</option>
            <option value="2">Média</option>
            <option value="3">Baixa</option>
          </Form.Select>
        </Form.Group>

        <Button
          type="submit"
          className="w-100 fw-bold"
          style={{ backgroundColor: "#fca311", border: "none" }}
        >
          Cadastrar Produto
        </Button>
      </Form>

      <hr className="my-5" />
      <h4 className="mb-4 fw-bold">📋 Produtos Cadastrados</h4>

      <Row xs={1} md={2} lg={3} className="g-4">
        {produtos.map((p) => (
          <Col key={p.id}>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Card className="shadow-sm h-100 border-0">
                <Card.Body>
                  <Card.Title className="d-flex justify-content-between align-items-start">
                    <span className="fw-bold fs-5 text-dark">{p.nome}</span>
                    {getPrioridadeBadge(p.prioridade)}
                  </Card.Title>
                  <Card.Text className="text-muted mb-3">
                    ⏱️ {p.tempoPreparo} min
                  </Card.Text>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => excluirProduto(p.id)}
                  >
                    <FaTrash className="me-1" /> Excluir
                  </Button>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CadastroProduto;
