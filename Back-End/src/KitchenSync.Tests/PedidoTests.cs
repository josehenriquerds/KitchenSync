using System;
using Xunit;
using KitchenSync.Domain.Entities;

namespace KitchenSync.Tests
{
    public class PedidoTests
    {
        [Fact]
        public void DeveCriarPedidoValido()
        {
            var pedido = new Pedido
            {
                Item = "Arroz",
                Quantidade = 1,
                Solicitante = "João",
                Prioridade = "Alta"
            };

            Assert.Equal("Arroz", pedido.Item);
            Assert.Equal(1, pedido.Quantidade);
            Assert.Equal("João", pedido.Solicitante);
            Assert.Equal("Alta", pedido.Prioridade);
        }
    }
}