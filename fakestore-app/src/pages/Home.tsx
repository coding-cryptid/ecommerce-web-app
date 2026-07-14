import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../api/productApi';

const Home = () => {
  const { data: products, isLoading, isError } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  if (isLoading) return <p>Loading products...</p>;
  if (isError) return <p>Something went wrong fetching products.</p>;

  return (
    <div>
      <h1>Products</h1>
      {products?.map((product) => (
        <div key={product.id}>
          <p>{product.title}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;