using System.Threading.Tasks;
using GerenciadorDeMilhas.Domain;

namespace GerenciadorDeMilhas.Repository
{
    public interface IClienteRepository
    {
        //GERAL
         void Add<T>(T entity) where T : class;

         void Update<T>(T entity) where T : class;

         void Delete<T>(T entity) where T : class;

         void DeleteRange<T>(T[] entity) where T : class;

         Task<bool> SaveChangesAsync();

         //Clientes
         Task<Cliente[]> GetClienteByNome(string nome);

         Task<Cliente[]> GetAllClientesAsync();

         Task<Cliente> GetClienteById(int id);

         Task<Cliente> GetContaCorrenteCliente(int id);

    }
}