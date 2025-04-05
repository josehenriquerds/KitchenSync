
using System;
using KitchenSync.Domain.Entities;

namespace KitchenSync.Application.UseCases
{
    public class CriarPedidoHandler
    {
        public Pedido Criar(Pedido pedido)
        {
            pedido.DataHoraSolicitacao = DateTime.Now;
            return pedido;
        }
    }
}
