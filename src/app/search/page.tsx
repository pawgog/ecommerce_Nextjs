import { redirect } from "next/navigation";

interface PageProps {
  searchParam: {
    [key: string]: string | string[] | undefined;
  };
}

const Page = ({ searchParam }: PageProps) => {
  const query = searchParam?.query;

  if (Array.isArray(query) || !query) {
    redirect("/");
  }

  return <div>Query Items</div>;
};

export default Page;
