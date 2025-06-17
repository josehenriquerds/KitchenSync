import React from "react";
import { useRouter } from "next/router";
import { Button, Container } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaUtensils, FaListAlt, FaPlusCircle } from "react-icons/fa";

const TelaInicial = () => {
  const router = useRouter();

  const botoes = [
    {
      label: "Painel da Cozinha",
      icon: <FaUtensils size={28} />,
      rota: "/painel",
    },
    {
      label: "Pedido Rápido",
      icon: <FaListAlt size={28} />,
      rota: "/pedido-rapido",
    },
    {
      label: "Cadastro de Produto",
      icon: <FaPlusCircle size={28} />,
      rota: "/cadastro-produto",
    },
  ];

  return (
    <Container
      className="text-center py-5"
      style={{ minHeight: "100vh", fontFamily: "Roboto, sans-serif" }}
    >
      <motion.h1
        className="fw-bold mb-4"
        style={{ color: "rgb(255 108 0)" }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        KitchenSync
      </motion.h1>

      <div
        className="d-flex flex-column gap-4 mt-4"
        style={{ maxWidth: 420, margin: "0 auto" }}
      >
        {botoes.map((botao, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Button
              size="lg"
              className="d-flex align-items-center justify-content-center gap-3 w-100 p-3 rounded shadow border-0"
              style={{
                backgroundColor: "#fca311",
                color: "#fff",
                fontSize: "1.2rem",
                fontWeight: "500",
                letterSpacing: "0.5px",
              }}
              onClick={() => router.push(botao.rota)}
            >
              {botao.icon} <span>{botao.label}</span>
            </Button>
          </motion.div>
        ))}
      </div>
    </Container>
  );
};

export default TelaInicial;
