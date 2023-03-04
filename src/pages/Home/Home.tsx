import Banner from '../../components/Banner/Banner';
import classes from '../../components/Banner/Banner.module.scss';
import useFetch from '../../hooks/use-fetch.hook';
import { PageProps } from '../Page/Page';
import ContentRepeater from '../../components/ContentRepeater/ContentRepeater';

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

  return <div>
    {
      bannerUrl && <Banner image={bannerUrl}>
        <h1>
          Zadbajmy <span className={classes.highlighted}>wspólnie</span>
          <span className={classes.moved}>o wygodę Twojej pracy...</span>
        </h1>
      </Banner>
    }

    {
      homeData && <ContentRepeater data={homeData} excluded={['banner.banner']} />

    }

  </div>;
};
export default Home;
