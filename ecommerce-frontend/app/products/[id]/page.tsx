import ProductDetail from "@/Components/ProductDetail";
import React from "react";

export default async function page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  // fetch using Id
  return <ProductDetail />;
}
