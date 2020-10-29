using System.Linq;
using AutoMapper;
using GerenciadorDeMilhas.API.Dtos;
using GerenciadorDeMilhas.Domain;
using GerenciadorDeMilhas.Domain.Identity;

namespace GerenciadorDeMilhas.API.Helpers
{
    public class AutoMapperProfiles: Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserDto>().ReverseMap();

            CreateMap<User, UserLoginDto>().ReverseMap();

            CreateMap<Email, EmailDto>().ReverseMap();

            CreateMap<Telefone, TelefoneDto>().ReverseMap();

            CreateMap<AcessoCliente, AcessoClienteDto>().ReverseMap();

            CreateMap<Historico, HistoricoDto>().ReverseMap();

            CreateMap<ContaCorrente, ContaCorrenteDto>().ReverseMap();

            CreateMap<PontoCartao, PontoCartaoDto>().ReverseMap();

            CreateMap<Milha, MilhaDto>().ReverseMap();
        }
    }
}