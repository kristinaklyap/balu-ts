import Banner from '../../components/Banner/Banner';
import classes from '../../components/Banner/Banner.module.scss';

interface HomeProps {
}

const Home: React.FC<HomeProps> = (props) => {
  return <div>
    <Banner image={'https://kristinaklyap.github.io/balu/static/media/bgImage.8ad005c0.png'}  >
      <h1>
        Zadbajmy <span className={classes.highlighted}>wspólnie</span>
        <span className={classes.moved}>o wygodę Twojej pracy...</span>
      </h1>
    </Banner>
  </div>;
};
export default Home;
