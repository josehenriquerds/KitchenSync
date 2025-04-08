using KitchenSync.Domain.Entities;
using System;

namespace KitchenSync.Application.DTOs
{
    public class PedidoDto
    {
        public int Id { get; set; }
        public string Item { get; set; }
        public int ProdutoId { get; set; }
        public int Quantidade { get; set; }
        public string Solicitante { get; set; }
        public string Prioridade { get; set; }
        public string Status { get; set; }
        public DateTime DataHoraSolicitacao { get; set; }

        public static PedidoDto FromEntity(Pedido pedido)
        {
            return new PedidoDto
            {
                Id = pedido.Id,
                ProdutoId = pedido.Produto?.Id ?? 0, // ✅ Pega direto do Produto
                Item = pedido.Produto?.Nome ?? "Desconhecido",
                Quantidade = pedido.Quantidade,
                Solicitante = pedido.Solicitante,
                Prioridade = pedido.Prioridade == 1 ? "Alta" :
                             pedido.Prioridade == 2 ? "Média" : "Baixa",
                Status = pedido.Status == 1 ? "Finalizado" : "Pendente",
                DataHoraSolicitacao = pedido.DataHoraSolicitacao
            };
        }
    }
}
