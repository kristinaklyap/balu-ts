import useFetch from '../../hooks/use-fetch.hook';
import { ProductInterface } from '../../models/ProductInterface';
import Container from '../../components/Container/Container';
import ProductCard from '../../components/ProductCard/ProductCard';
import ContentRepeater from '../../components/ContentRepeater/ContentRepeater';
import { PageProps } from '../Page/Page';
import classes from './Products.module.scss';
import SectionTitle from '../../components/SectionTitle/SectionTitle';

const Products = () => {
  const { data: productList, isError, isLoading } = useFetch<ProductInterface[]>(
    `/products/?populate=*`
  );

  const pageSlug = 'products';

  const { data } = useFetch<PageProps[]>(
    `/pages?filters[page_url][$contains]=${pageSlug}&populate=deep`
  );

  const pageData = data ? data[0] : null;
  return (
    <>
      {pageData && <ContentRepeater data={pageData} />}

      <Container>
        <div className={classes.products}>
          {productList &&
            productList.map(product => <ProductCard key={product.id} product={product} />)}
        </div>
      </Container>
    </>

  );
};
export default Products;