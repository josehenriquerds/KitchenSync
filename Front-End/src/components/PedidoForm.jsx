import React, { useEffect, useState } from "react";
import { Form, Button, Toast, ToastContainer } from "react-bootstrap";

const PedidoForm = () => {
  const [produtos, setProdutos] = useState([]);
  const [pedido, setPedido] = useState({
    produtoId: "",
    quantidade: 1,
    solicitante: "",
    prioridade: 1
  });
  const [mensagem, setMensagem] = useState(null);
  const [toast, setToast] = useState(false);

  useEffect(() => {
    fetch("/produtos.json")
      .then((res) => res.json())
      .then(setProdutos)
      .catch((err) => console.error("Erro ao carregar produtos", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPedido((prev) => ({
      ...prev,
      [name]: name === "quantidade" || name === "prioridade" ? parseInt(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const produtoSelecionado = produtos.find(p => p.id === Number(pedido.produtoId));
    if (!produtoSelecionado) {
        alert("Produto inválido. Selecione um produto.");
        return;
      }
    const payload = {
      produto: produtoSelecionado,
      quantidade: pedido.quantidade,
      solicitante: pedido.solicitante,
      dataHoraSolicitacao: new Date().toISOString(),
      tempoRestante: produtoSelecionado.tempoPreparo * 60,
      prioridade: pedido.prioridade,
      status: 0
    };

    try {
      const res = await fetch("https://localhost:5000/api/pedido", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error("Erro ao enviar pedido");

      setMensagem("✅ Pedido enviado com sucesso!");
      setToast(true);
      setPedido({ produtoId: "", quantidade: 1, solicitante: "", prioridade: 1 });
    } catch (err) {
      setMensagem("❌ Erro ao enviar pedido");
      setToast(true);
      console.error(err);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Produto</Form.Label>
          <Form.Select name="produtoId" value={pedido.produtoId} onChange={handleChange} required>
            <option value="">Selecione um produto...</option>
            {produtos.map((p) => (
              <option key={p.id} value={p.id}>{p.nome}</option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Quantidade</Form.Label>
          <Form.Control
            type="number"
            name="quantidade"
            value={pedido.quantidade}
            onChange={handleChange}
            min="1"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Solicitante</Form.Label>
          <Form.Control
            type="text"
            name="solicitante"
            value={pedido.solicitante}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Prioridade</Form.Label>
          <Form.Select name="prioridade" value={pedido.prioridade} onChange={handleChange}>
            <option value={1}>Alta</option>
            <option value={2}>Média</option>
            <option value={3}>Baixa</option>
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100 py-2 fw-bold">
          Enviar Pedido
        </Button>
      </Form>

      <ToastContainer position="top-end" className="p-3">
        <Toast show={toast} onClose={() => setToast(false)} delay={3000} autohide bg="light">
          <Toast.Body>{mensagem}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

export default PedidoForm;
