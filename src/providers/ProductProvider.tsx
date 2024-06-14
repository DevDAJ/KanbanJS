'use client';

import { PropsWithChildren, createContext } from 'react';

const ProductContext = createContext<{
  name: string | undefined;
  price: number | undefined;
  thumbnail: string | undefined;
}>({
  name: undefined,
  price: undefined,
  thumbnail: undefined,
});

const ProductProvider: React.FC<PropsWithChildren & { value: any }> = ({ children, value }) => (
  <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
);

export { ProductProvider, ProductContext };
