import React from "react";
import { Card, Badge, ProgressBar, Row, Col } from "react-bootstrap";
import { FaStopwatch } from "react-icons/fa";

const prioridadeCor = {
  Baixa: "success",
  Media: "warning",
  Alta: "danger"
};

const formatarTempo = (segundos) => {
  const m = Math.floor(segundos / 60);
  const s = segundos % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
};

const getTempoBadgeVariant = (tempo) => {
  if (tempo > 600) return "success";
  if (tempo > 300) return "warning";
  return "danger";
};

function PedidoCard({ pedido, onConcluir }) {
  const {
    id,
    item = "Item não informado",
    quantidade = "?",
    solicitante = "Desconhecido",
    prioridade = "Baixa",
    status = "Pendente",
    tempoRestante = 0,
    finalizado
  } = pedido;

  const tempoPercent = Math.max((tempoRestante / (20 * 60)) * 100, 0);
  const tempoFormatado = formatarTempo(tempoRestante);
  const prioridadeNormalizada =
    prioridade.charAt(0).toUpperCase() + prioridade.slice(1).toLowerCase();

  return (
    <Card
      className={`h-100 shadow-sm border-0 rounded-4 position-relative card-pedido card-prioridade-${prioridadeNormalizada}`}
      onClick={() => onConcluir(id)}
      style={{ overflow: 'hidden' }}
    >
      <ProgressBar
        now={tempoPercent}
        variant={getTempoBadgeVariant(tempoRestante)}
        style={{ height: "6px", borderRadius: "0", marginBottom: "0px" }}
      />
      <Card.Body className="p-3">
        <Row className="align-items-center">
          <Col xs="auto">
            <div
              style={{
                backgroundColor: "#e7f3ff",
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <FaStopwatch size={20} color="#007bff" />
            </div>
          </Col>
          <Col>
            <Card.Title className="mb-0 fw-bold">
              {item} ({quantidade})
            </Card.Title>
            <div className="text-muted small">
              {prioridadeNormalizada} • {status}
            </div>
          </Col>
          <Col xs="auto">
            <Badge
              bg={getTempoBadgeVariant(tempoRestante)}
              className={`fs-6 ${tempoRestante <= 180 ? "badge-alerta" : ""}`}
            >
              {tempoFormatado}
            </Badge>
          </Col>
        </Row>
      </Card.Body>

      {finalizado && (
        <div className="check-overlay">
          <FaStopwatch className="check-icon" />
        </div>
      )}
    </Card>
  );
}

export default React.memo(PedidoCard);
