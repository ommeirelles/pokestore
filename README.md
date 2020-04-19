# Rodando o projeto:

Dependencias:

1. Ter node na maquina, de preferencia ultima versão estavel.
2. Ter o gerenciador de pacotes (npm ou yarn) instalado

## Passo a passo:

1. Fazer download do codigo.
2. Pelo shell, entrar na pasta do projeto.

3. `npm install` ou `yarn`
4. `npm run start`ou `yarn start`

# Considerações

### Essenciais:

-   Catálogo de produtos (Feito)
-   Carrinho lateral (Feito)
-   Resumo do carrinho (Feito)
-   4 lojas com estilos e tipos diferentes de Pokémon (Feito. \*obs: Coloquei um select para navegar entre lojas e comprar em multiplas lojas de uma vez. Nao foi pedido isso porem achei interessante fazer.)
-   Barra de busca para filtrar os Pokémon (Feito. \*obs. Como a barra pode buscar em todos os pokemons independente do tipo, por conta da funcionalidade anterior que citei no obs, criei uma lista com todos os pokemons existentes pra ganhar performance na hora de busca de todos os pokemons)
-   Botão de finalizar compra, reiniciando o processo de compra (Feito.)
-   Modal de obrigado ao finalizar compra (Feito.)
-   Salvar os dados da compra do usuário localmente para não perdê-las ao atualizar a página (Feito.)
    Colocá-lo online em alguma url pública para que as pessoas consigam utilizar a loja, afinal como vamos vender Pokémon se não nos acharem? (Feito.)
-   Uma página com mais detalhes do Pokémon, tendo informações como os tipos, movimentos, pontos fracos e pontos fortes. Dessa forma o usuário poderá navegar para essa página e adicionar o Pokémon no carrinho ou voltar para o catálogo. (To be continue.)

### Diferenciais:

-   Loja ser acessível para pessoas que utilizaram leitores de tela. (94% cobertura de acordo com lighthouse. Isso me fez ter um problema em celulares da Apple que da zoom na pagina quando um select e ativado. Pois me impede de colcoar user a tag `user-scalable=no`no viewport.)
-   Testes E2E/UI automatizados parata be garantir que suas funcionalidades estão funcionando corretamente. (Fiz teste unitario apenas, é mais rapido e mais simples de ser feito numa boa arquitetura e traz boas garantias.)
-   Loja ser um PWA completo com aviso de AHS. (Coloquei o aviso, porem so funciona no android, ha como colocar no iphone, porem necessita de implementação e interação do usuario colocar manualmente o app instalado. preferi nao focar no iphone.)
-   Ter nota 100 no lighthouse. (tem que ser testado ainda)
-   Uilizar CI/CD para deploy das lojas.
