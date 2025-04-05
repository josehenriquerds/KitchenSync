using KitchenSync.Domain.Entities;
using System.Collections.Generic;

namespace KitchenSync.Application.Interfaces
{
    public interface IPedidoRepository
    {
        Pedido Adicionar(Pedido pedido);
        IEnumerable<Pedido> ObterTodos();
        Pedido ObterPorId(int id);
        void Atualizar(Pedido pedido);
        void Remover(int id);
    }
}