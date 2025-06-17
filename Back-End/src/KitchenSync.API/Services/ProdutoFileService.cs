using System.Collections.Generic;
using System.IO;
using System.Linq;
using Microsoft.AspNetCore.Hosting;
using System.Text.Json;
using KitchenSync.Domain.Entities;

namespace KitchenSync.API.Services
{
    public class ProdutoFileService
    {
        private readonly string _filePath;
        private readonly List<Produto> _produtos;

        public ProdutoFileService(IWebHostEnvironment env)
        {
            _filePath = Path.Combine(env.ContentRootPath, "produtos.json");
            if (File.Exists(_filePath))
            {
                var json = File.ReadAllText(_filePath);
                _produtos = JsonSerializer.Deserialize<List<Produto>>(json) ?? new List<Produto>();
            }
            else
            {
                _produtos = new List<Produto>();
            }
        }

        public IEnumerable<Produto> GetAll() => _produtos;

        public Produto GetById(int id) => _produtos.FirstOrDefault(p => p.Id == id);

        private void Save()
        {
            var json = JsonSerializer.Serialize(_produtos, new JsonSerializerOptions { WriteIndented = true });
            File.WriteAllText(_filePath, json);
        }

        public void AddRange(IEnumerable<Produto> produtos)
        {
            int nextId = _produtos.Any() ? _produtos.Max(p => p.Id) + 1 : 1;
            foreach (var p in produtos)
            {
                if (p.Id == 0)
                    p.Id = nextId++;
                _produtos.Add(p);
            }
            Save();
        }

        public void Update(Produto produto)
        {
            var index = _produtos.FindIndex(p => p.Id == produto.Id);
            if (index >= 0)
            {
                _produtos[index] = produto;
                Save();
            }
        }

        public void Remove(int id)
        {
            var p = _produtos.FirstOrDefault(x => x.Id == id);
            if (p != null)
            {
                _produtos.Remove(p);
                Save();
            }
        }
    }
}
