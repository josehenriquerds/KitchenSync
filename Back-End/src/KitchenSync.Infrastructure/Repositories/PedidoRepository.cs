
using System.Collections.Generic;
using System.Linq;
using KitchenSync.Application.Interfaces;
using KitchenSync.Domain.Entities;
using KitchenSync.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace KitchenSync.Infrastructure.Repositories
{
    public class PedidoRepository : IPedidoRepository
    {
        private readonly KitchenSyncDbContext _context;

        public PedidoRepository(KitchenSyncDbContext context)
        {
            _context = context;
        }

        public Pedido Adicionar(Pedido pedido)
        {
            _context.Pedidos.Add(pedido);
            _context.SaveChanges();
            return pedido;
        }

        public IEnumerable<Pedido> ObterTodos() => _context.Pedidos.ToList();

        public Pedido ObterPorId(int id) => _context.Pedidos.FirstOrDefault(p => p.Id == id);

        public void Atualizar(Pedido pedido)
        {
            _context.Pedidos.Update(pedido);
            _context.SaveChanges();
        }

        public void Remover(int id)
        {
            var pedido = _context.Pedidos.Find(id);
            if (pedido != null)
            {
                _context.Pedidos.Remove(pedido);
                _context.SaveChanges();
            }
        }
    }
}
