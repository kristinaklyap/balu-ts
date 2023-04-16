import useFetch from '../../hooks/use-fetch.hook';
import PageInterface from '../../models/PageInterface';
import ProductInterface from '../../models/ProductInterface';
import { BannerType } from '../../models/BannerType';

import Banner from '../../components/Banner/Banner';
import ContentRepeater from '../../components/ContentRepeater/ContentRepeater';
import ProductCard from '../../components/ProductCard/ProductCard';
import Container from '../../components/Container/Container';
import SectionTitle from '../../components/SectionTitle/SectionTitle';

import classes from '../../components/Banner/Banner.module.scss';
import productClasses from '../Products/Products.module.scss';

const uploadUrl = process.env.REACT_APP_UPLOAD_URL;
const Home = () => {

  const { data, isError, isLoading } = useFetch<PageInterface[]>(
    `/pages?filters[page_url][$contains]=home&populate=deep`
  );

  const { data: productList } = useFetch<ProductInterface[]>(
    `/products/?populate=*`
  );

  const homeData = data?.[0] ?? null;

  const banner = homeData && homeData?.attributes?.content.filter(item => item['__component'] === 'banner.banner');
  let bannerUrl = null;
  if (banner) {
    bannerUrl = `${uploadUrl}${banner[0]['banner_image']['data']['attributes']['url']}`;
  }

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
        <SectionTitle content={'PRODUKTY'} alignment={'center'} component={'h3'} variant={'h3'} />
        <div className={productClasses.products}>
          {productList.map(product => <ProductCard key={product.id} product={product} />)}
        </div>
      </Container>
    }

    {
      homeData && <ContentRepeater data={homeData} excluded={['banner.banner']} />
    }

  </div>;
};
export default Home;
