import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Container, Row, Col, Spinner, Form } from 'react-bootstrap';
import { fetchProducts, fetchCategories, fetchProductsByCategory } from '../api/productApi';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  const { data: products, isLoading, isError } = useQuery({
    queryKey: ['products', selectedCategory],
    queryFn: () =>
      selectedCategory
        ? fetchProductsByCategory(selectedCategory)
        : fetchProducts(),
  });

  if (isLoading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
        <p>Loading products...</p>
      </Container>
    );
  }

  if (isError) {
    return <p className="text-center mt-5">Something went wrong fetching products.</p>;
  }

  return (
    <Container className="mt-4">
      <h1 className="mb-4">Products</h1>
      
      <Form.Select
        className="mb-4"
        style={{ maxWidth: '300px' }}
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="">All Categories</option>
        {categories?.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </Form.Select>

      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {products?.map((product) => (
          <Col key={product.id}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;