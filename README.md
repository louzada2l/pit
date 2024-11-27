
Documentação da Startup Bh Next

Introdução
Esta documentação descreve a arquitetura e funcionalidades da Startup Bh Next. A aplicação oferece funcionalidades como reserva de produtos, geolocalização, cadastro de lojas e clientes, entre outras.


Linguagem utilizada
A aplicação web desenvolvida utiliza a linguagem:
React.js
CSS Modules


Modelo
Modelo MVC


Dependências utilizadas no front-end
@emailjs/browser
@react-google-maps/api
axios
bootstrap
jwt-decode
lucide-react   
react
react-bootstrap
react-dom
react-icons
react-router-dom


Dependências utilizadas no back-end
axios
bcryptjs
cors
dotenv
express
helmet
jsonwebtoken
mongoose
multer




Banco de Dados Utilizado
MongoDB



Estrutura do projeto



Arquitetura e Modelo MVC
- Model: Responsável pela manipulação dos dados e lógica de negócio. Inclui as definições de estruturas de dados, como produtos, lojas e clientes.
- View: Responsável pela interface do usuário. Utiliza componentes React.js e CSS Modules para estilização.
- Controller: Responsável pela interação entre a View e o Model, gerenciando a lógica de aplicação e as rotas.


Funcionalidades:

1. Reserva de Produtos
- Descrição: Permite aos usuários reservar produtos online.
- Componentes: ReservaProduto, FormularioReserva.

2. Geolocalização
- Descrição: Utiliza a API de geolocalização para encontrar lojas próximas ao usuário.
- Componentes: Mapa, LocalizadorLojas.

3. Cadastro de Lojas
- Descrição: Formulário para cadastrar novas lojas.
- Componentes: CadastroLoja, FormularioLoja.

4. Cadastro de Produtos da Loja
- Descrição: Permite que lojas cadastrem novos produtos.
- Componentes: CadastroProduto, FormularioProduto.

5. Cadastro de Clientes
- Descrição: Permite que novos clientes se cadastrem na plataforma.
- Componentes: CadastroCliente, FormularioCliente.

6. Mapa
- Descrição: Exibe a localização das lojas no mapa.
- Componentes: Mapa, PontoLoja.

7. Área de Favoritos
- Descrição: Área onde os usuários podem salvar seus produtos favoritos.
- Componentes: Favoritos, ListaFavoritos.


8. Página Sobre a Empresa
- Descrição: Página que fornece informações sobre a empresa.
- Componentes: SobreEmpresa, InformacoesEmpresa.

9. Exibição de Produtos
- Descrição: Exibe os produtos disponíveis na loja.
- Componentes: ExibicaoProduto, ListaProdutos.

10. Login de Cliente
- Descrição: Formulário de login para clientes.
- Componentes: LoginCliente, FormularioLogin.

11. Login de Colaborador
- Descrição: Formulário de login para colaboradores da loja.
- Componentes: LoginColaborador, FormularioLoginColaborador.

12. Página de Perfil da Loja
- Descrição: Exibe informações sobre a loja.
- Componentes: PerfilLoja, InformacoesLoja.

13. Página de Perfil do Usuário
- Descrição: Exibe informações sobre o usuário.
- Componentes: PerfilUsuario, InformacoesUsuario.

14. Página de Reservados
- Descrição: Exibe os produtos reservados pelo usuário.
- Componentes: Reservados, ListaReservados.

15. Página Principal
- Descrição: Página inicial da aplicação.
- Componentes: PaginaPrincipal, Banner, ProdutosEmDestaque.

16. Navegação para Redes Sociais
- Descrição: Links para as redes sociais da empresa.
- Componentes: RedesSociais, LinkRedeSocial.

17. Rotas para Navegação entre Páginas
- Descrição: Gerenciamento das rotas de navegação da aplicação.
- Componentes: Roteamento, Rota.

18. Aba de Pesquisar Produtos
- Descrição: Permite aos usuários buscar produtos na plataforma.
- Componentes: PesquisaProduto, BarraPesquisa.

19. Aba de Identificação de Endereço
- Descrição: Formulário para os usuários identificarem seus endereços.
- Componentes: IdentificacaoEndereco, FormularioEndereco.

20. Contato com a Loja
- Descrição: Página para os usuários entrarem em contato com as lojas.
- Componentes: ContatoLoja, FormularioContato.


Conclusão
Esta documentação abrange a arquitetura e as principais funcionalidades da aplicação web da startup. Cada componente foi desenvolvido com React.js e estilizado utilizando CSS Modules para garantir modularidade e reutilização de código.

