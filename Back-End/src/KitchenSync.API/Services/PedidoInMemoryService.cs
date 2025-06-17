using System.Collections.Concurrent;
using KitchenSync.Domain.Entities;

namespace KitchenSync.API.Services
{
    public class PedidoInMemoryService
    {
        private readonly ConcurrentDictionary<int, Pedido> _pedidos = new();
        private int _nextId = 1;

        public Pedido Add(Pedido pedido)
        {
            pedido.Id = _nextId++;
            _pedidos[pedido.Id] = pedido;
            return pedido;
        }

        public IEnumerable<Pedido> GetAll() => _pedidos.Values;

        public Pedido GetById(int id) => _pedidos.TryGetValue(id, out var p) ? p : null;

        public void Remove(int id) => _pedidos.TryRemove(id, out _);
    }
}
