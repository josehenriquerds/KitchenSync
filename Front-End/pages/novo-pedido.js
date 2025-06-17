import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import PedidoForm from "../components/PedidoForm";

const NovoPedido = () => {
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-lg border-0 rounded-4">
            <Card.Body className="p-4">
              <h3 className="mb-4 text-center fw-bold">📋 Novo Pedido</h3>
              <PedidoForm />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default NovoPedido;
