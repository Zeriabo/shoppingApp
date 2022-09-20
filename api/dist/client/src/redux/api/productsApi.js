"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("@reduxjs/toolkit/dist/query/react");
exports.productsApi = react_1.createApi({
    reducerPath: 'productsApi',
    baseQuery: react_1.fetchBaseQuery({ baseUrl: 'https://fakestoreapi.com/' }),
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => (`/products`),
        }),
    })
});
exports.useGetProductsQuery = exports.productsApi.useGetProductsQuery;
//# sourceMappingURL=productsApi.js.map