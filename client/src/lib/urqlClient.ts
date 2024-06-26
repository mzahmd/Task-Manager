import { cacheExchange, Client, fetchExchange } from "urql";

export const client = new Client({
  url: "http://localhost:4000/",
  exchanges: [cacheExchange, fetchExchange],
});
