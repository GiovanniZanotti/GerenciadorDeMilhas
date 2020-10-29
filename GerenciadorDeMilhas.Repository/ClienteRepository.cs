using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using GerenciadorDeMilhas.Domain;

namespace GerenciadorDeMilhas.Repository
{
    public class ClienteRepository : IClienteRepository
    {
        private readonly GerenciadorDeMilhasContext context;

        public ClienteRepository(GerenciadorDeMilhasContext context)
        {
            this.context = context;
            this.context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }

        //GERAIS
        public void Add<T>(T entity) where T : class
        {
            this.context.Add(entity);
        }

        public void Update<T>(T entity) where T : class
        {
            this.context.Update(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            this.context.Remove(entity);
        }

        public void DeleteRange<T>(T[] entityArray) where T : class
        {
            this.context.RemoveRange(entityArray);
        }

        public  async Task<bool> SaveChangesAsync()
        {
            return (await this.context.SaveChangesAsync()) > 0;
        }

        //Clientes
        public async Task<Cliente[]> GetAllClientesAsync()
        {
            IQueryable<Cliente> query = this.context.Cliente
                .Include(c => c.Emails)
                .Include(c => c.Telefones)
                .Include(c => c.AcessoClientes)
                .Include(c => c.ContaCorrente);

            query = query.AsNoTracking()
                        .OrderBy(c => c.Id);

            return await query.ToArrayAsync();
        }

        public async Task<Cliente> GetClienteById(int id)
        {
            IQueryable<Cliente> query = this.context.Cliente
                .Include(c => c.Emails)
                .Include(c => c.Telefones)
                .Include(c => c.AcessoClientes)
                .Include(c => c.Historicos)
                .Include(c => c.ContaCorrente)
                .Include(c => c.ContaCorrente.PontosCartao)
                .Include(c => c.ContaCorrente.Milhas);

            query = query.AsNoTracking()
                        .OrderBy(c => c.Id)
                        .Where(c => c.Id == id);

            return await query.FirstOrDefaultAsync();
        }

        public async Task<Cliente[]> GetClienteByNome(string nome)
        {
            IQueryable<Cliente> query = this.context.Cliente
                .Include(c => c.Emails)
                .Include(c => c.Telefones)
                .Include(c => c.AcessoClientes)
                .Include(c => c.Historicos)
                .Include(c => c.ContaCorrente);

            query = query.AsNoTracking()
                        .OrderByDescending(c => c.Data)
                        .Where(c => c.Nome.ToLower().Contains(nome.ToLower()));

            return await query.ToArrayAsync();
        }

        public async Task<Cliente> GetContaCorrenteCliente(int id) {
            IQueryable<Cliente> query = this.context.Cliente
                .Include(c => c.ContaCorrente);

            query = query.AsNoTracking()
                        .OrderBy(c => c.Id)
                        .Where(c => c.Id == id);

            return await query.FirstOrDefaultAsync();
        }
    }
}