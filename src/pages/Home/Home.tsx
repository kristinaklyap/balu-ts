import Banner from '../../components/Banner/Banner';
import classes from '../../components/Banner/Banner.module.scss';
import useFetch from '../../hooks/use-fetch.hook';
import { PageProps } from '../Page/Page';
import ContentRepeater from '../../components/ContentRepeater/ContentRepeater';
import { ProductInterface } from '../../models/ProductInterface';
import ProductCard from '../../components/ProductCard/ProductCard';
import Container from '../../components/Container/Container';
import productClasses from '../Products/Products.module.scss';
import SectionTitle from '../../components/SectionTitle/SectionTitle';

interface HomeProps {

}

type BannerProps = {
  banner_image: {
    data: {
      attributes: {
        url: string
      }
    }
  }
}

const Home: React.FC<HomeProps> = (props) => {

  const { data, isError, isLoading } = useFetch<PageProps[]>(
    `/pages?filters[page_url][$contains]=home&populate=deep`
  );
  const homeData = data ? data[0] : null;

  // @ts-ignore
  const banner: BannerProps[] = homeData && homeData?.attributes?.content.filter(item => item['__component'] === 'banner.banner');

  let bannerUrl = null;
  if (banner && banner.length !== 0) {
    bannerUrl = `${process.env.REACT_APP_UPLOAD_URL}${banner[0].banner_image.data.attributes.url}`;
  }

  const { data: productList } = useFetch<ProductInterface[]>(
    `/products/?populate=*`
  );
  return <div>
    {
      bannerUrl && <Banner image={bannerUrl}>
        <h1>
          Zadbajmy <span className={classes.highlighted}>wspólnie</span>
          <span className={classes.moved}>o wygodę Twojej pracy...</span>
        </h1>
      </Banner>
    }


    {productList &&
      <Container>
        <SectionTitle content={'PRODUKTY'} alignment={'center'} component={'h3'} variant={'h3'}/>
        <div className={productClasses.products}>
          {productList &&
            productList.map(product => <ProductCard key={product.id} product={product} />)}
        </div>
      </Container>
     }

    {
      homeData && <ContentRepeater data={homeData} excluded={['banner.banner']} />
    }

  </div>;
};
export default Home;
