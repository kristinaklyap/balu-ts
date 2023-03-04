import Banner from '../../components/Banner/Banner';
import classes from '../../components/Banner/Banner.module.scss';
import useFetch from '../../hooks/use-fetch.hook';
import { PageProps } from '../Page/Page';
import ContentRepeater from '../../components/ContentRepeater/ContentRepeater';

interface HomeProps {

}

const Home: React.FC<HomeProps> = (props) => {

  const { data, isError, isLoading } = useFetch<PageProps[]>(
    `/pages?filters[page_url][$contains]=home&populate=deep`
  );

  const homeData = data ? data[0] : null;

  return <div>
    <Banner image={'https://kristinaklyap.github.io/balu/static/media/bgImage.8ad005c0.png'}>
      <h1>
        Zadbajmy <span className={classes.highlighted}>wspólnie</span>
        <span className={classes.moved}>o wygodę Twojej pracy...</span>
      </h1>
    </Banner>
    {
      homeData && <ContentRepeater data={homeData} excluded={['banner.banner']} />

    }

  </div>;
};
export default Home;
