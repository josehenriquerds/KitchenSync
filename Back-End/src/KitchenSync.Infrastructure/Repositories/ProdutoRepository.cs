using KitchenSync.Application.Interfaces;
using KitchenSync.Domain.Entities;
using KitchenSync.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace KitchenSync.Infrastructure.Repositories
{
    public class ProdutoRepository : IProdutoRepository
    {
        private readonly KitchenSyncDbContext _context;

        public ProdutoRepository(KitchenSyncDbContext context)
        {
            _context = context;
        }

        public async Task<Produto> CadastrarProdutoAsync(Produto produto)
        {
            _context.Produtos.Add(produto);
            await _context.SaveChangesAsync();
            return produto;
        }

        public async Task<Produto> ObterProdutoPorIdAsync(int id)
        {
            return await _context.Produtos.FindAsync(id);
        }

        public async Task<IEnumerable<Produto>> ObterTodosProdutosAsync()
        {
            return await _context.Produtos.ToListAsync();
        }
    }
}
