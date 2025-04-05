using Microsoft.EntityFrameworkCore;
using KitchenSync.Domain.Entities;

namespace KitchenSync.Infrastructure.Data
{
    public class KitchenSyncDbContext : DbContext
    {
        public KitchenSyncDbContext(DbContextOptions<KitchenSyncDbContext> options) : base(options) {}

        public DbSet<Pedido> Pedidos { get; set; }
        public DbSet<Produto> Produtos { get; set; }
    }
}