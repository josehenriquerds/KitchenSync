using KitchenSync.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace KitchenSync.Application.Interfaces
{
    public interface IProdutoRepository
    {
        Task<Produto> CadastrarProdutoAsync(Produto produto);
        Task<Produto> ObterProdutoPorIdAsync(int id);
        Task<IEnumerable<Produto>> ObterTodosProdutosAsync();
    }
}
