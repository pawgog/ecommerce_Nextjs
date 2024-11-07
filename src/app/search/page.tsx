import { redirect } from "next/navigation";

import ProductsPage from "@/components/ProductsPage";
import { staticText } from "@/components/utils/staticText";
import { filterAllProducts } from "@/actions/productActions";

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const Page = async ({ searchParams }: PageProps) => {
  const { query } = searchParams;

  if (Array.isArray(query) || !query) {
    redirect("/");
  }

  const products = await filterAllProducts(query);

  if (products.length === 0) {
    return (
      <div className="text-center py-4 bg-white shadow-md rounded-b-md">
        <h3 className="mt-2 text-sm font-semibold text-gray-900">
          {staticText.noResults}
        </h3>
        <p className="mt-1 text-sm mx-auto max-w-prose text-gray-500">
          {staticText.noFindProduct}{" "}
          <span className="font-medium text-red-600">{query}</span>
        </p>
      </div>
    );
  }

  return <ProductsPage products={products} />;
};

export default Page;
