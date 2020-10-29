using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using GerenciadorDeMilhas.API.Dtos;
using GerenciadorDeMilhas.Domain;
using GerenciadorDeMilhas.Repository;

namespace GerenciadorDeMilhas.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientesController : ControllerBase
    {

        public readonly IClienteRepository repo;
        private readonly IMapper mapper;

        public ClientesController(IClienteRepository repo, IMapper mapper)
        {
            this.mapper = mapper;
            this.repo = repo;
        }

        public IActionResult Bad { get; private set; }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var clientes = await this.repo.GetAllClientesAsync();
               
                var results = this.mapper.Map<ClienteDto[]>(clientes);
                return Ok(results);
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Banco de Dados Falhou{ex.Message}");
            }
        }

        [HttpGet("{ClienteId}")]
        public async Task<IActionResult> Get(int ClienteId)
        {
            try
            {
                var cliente = await this.repo.GetClienteById(ClienteId);
                var results = this.mapper.Map<ClienteDto>(cliente);
                return Ok(results);
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de Dados Falhou");
            }
        }

        [HttpGet("getByNome/{nome}")]
        public async Task<IActionResult> Get(string nome)
        {
            try
            {
                
                var clientes = await this.repo.GetClienteByNome(nome);
                var results = this.mapper.Map<ClienteDto[]>(clientes);
                return Ok(results);
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de Dados Falhou");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(ClienteDto model)
        {
            try
            {
                var cliente = this.mapper.Map<Cliente>(model);

                this.repo.Add(cliente);

                if (await this.repo.SaveChangesAsync())
                {
                    return Created($"/api/clientes/{model.Id}", this.mapper.Map<ClienteDto>(cliente));
                }
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Banco de Dados Falhou {ex.Message}");
            }

            return BadRequest();
        }

        [HttpPut("{ClienteId}")]
        public async Task<IActionResult> Put(int ClienteId, ClienteDto model)
        {
            try
            {
                var cliente = await this.repo.GetClienteById(ClienteId);
                if (cliente == null) return NotFound();

                var idEmails = new List<int>();
                var idTelefones = new List<int>();
                var idAcessoClientes = new List<int>();
                var idHistoricos = new List<int>();

                model.Emails.ForEach(item => idEmails.Add(item.Id));
                model.Telefones.ForEach(item => idTelefones.Add(item.Id));
                model.AcessoClientes.ForEach(item => idAcessoClientes.Add(item.Id));
                model.Historicos.ForEach(item => idHistoricos.Add(item.Id));

                var emails = cliente.Emails.Where(
                    email => !idEmails.Contains(email.Id)
                ).ToArray();

                var telefones = cliente.Telefones.Where(
                    telefone => !idTelefones.Contains(telefone.Id)
                ).ToArray();

                var acessoClientes = cliente.AcessoClientes.Where(
                     acessoCliente => !idAcessoClientes.Contains(acessoCliente.Id)
                ).ToArray();

                var historicos = cliente.Historicos.Where(
                     historico => !idHistoricos.Contains(historico.Id)
                ).ToArray();

                if (emails.Length > 0) this.repo.DeleteRange(emails);

                if (telefones.Length > 0) this.repo.DeleteRange(telefones);

                if(acessoClientes.Length > 0) this.repo.DeleteRange(acessoClientes);

                if(historicos.Length > 0) this.repo.DeleteRange(historicos);

                this.mapper.Map(model, cliente);

                this.repo.Update(cliente);

                if (await this.repo.SaveChangesAsync())
                {
                    return Created($"/api/clientes/{model.Id}", this.mapper.Map<ClienteDto>(cliente));
                }
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de Dados Falhou");
            }

            return BadRequest();
        }

        [HttpDelete("{ClienteId}")]
        public async Task<IActionResult> Delete(int ClienteId)
        {
            try
            {
                var cliente = await this.repo.GetClienteById(ClienteId);
                if (cliente == null) return NotFound();

                this.repo.Delete(cliente);

                if (await this.repo.SaveChangesAsync())
                {
                    return Ok();
                }
            }
            catch (System.Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco Dados Falhou");
            }

            return BadRequest();
        }

    }
}