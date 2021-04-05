import algoliasearch from "algoliasearch/lite";

export const environment = {
  production: true,
  useHash: false,
  searchClient: algoliasearch(
    'W1EFSZBSFF',
    'a4b21a45d39e603d954bf91120672cce'
  )
};
