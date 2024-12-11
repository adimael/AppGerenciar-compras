export type RoutesParams = {
  Welcome: undefined;
  Home: {
    newClient?: { nome: string; email: string; data_nascimento: string };
  };
  Compras: undefined;
  Produtos: undefined;
  AddClient: undefined;
  AddCompras: undefined;
  AddProdutos: undefined;
};
