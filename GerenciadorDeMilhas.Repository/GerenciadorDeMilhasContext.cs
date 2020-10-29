
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using GerenciadorDeMilhas.Domain;
using GerenciadorDeMilhas.Domain.Identity;

namespace GerenciadorDeMilhas.Repository
{
    public class GerenciadorDeMilhasContext : IdentityDbContext<User, Role, int,
                                                    IdentityUserClaim<int>, UserRole, IdentityUserLogin<int>,
                                                    IdentityRoleClaim<int>, IdentityUserToken<int>>
    {
        public GerenciadorDeMilhasContext(DbContextOptions<GerenciadorDeMilhasContext> options) : base(options){}

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            => optionsBuilder.UseNpgsql("Host=localhost;Database=postgres;Username=postgres;Password=1234");

        public DbSet<Cliente> Cliente { get; set; }
        public DbSet<Email> Email { get; set; }
        public DbSet<Telefone> Telefone { get; set; }
        public DbSet<AcessoCliente> AcessoCliente { get; set; }
        public DbSet<Historico> Historico { get; set; }
        public DbSet<ContaCorrente> ContaCorrente { get; set; }
        public DbSet<PontoCartao> PontoCartao { get; set; }
        public DbSet<Milha> Milha { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ForNpgsqlUseIdentityAlwaysColumns();

                modelBuilder.Entity<UserRole>(userRole => 
                {
                    userRole.HasKey(ur => new {ur.UserId, ur.RoleId});

                    userRole.HasOne(ur => ur.Role)
                            .WithMany(r => r.UserRoles)
                            .HasForeignKey(ur => ur.RoleId)
                            .IsRequired();

                    userRole.HasOne(ur => ur.User)
                            .WithMany(r => r.UserRoles)
                            .HasForeignKey(ur => ur.UserId)
                            .IsRequired();

                    //userRole.Property(b => b.RoleId).HasColumnName("email_confirmation");
                    //
                    //userRole.ToTable("User");
                }
            );
        }
    }
}