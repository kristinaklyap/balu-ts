import PageInterface from './../../models/PageInterface';
import Banner from '../Banner/Banner';
import Container from '../Container/Container';
import Typography from '../Typography/Typography';
import SectionTitle from '../SectionTitle/SectionTitle';
import Slider from '../Slider/Slider';

interface ContentRepeaterProps {
  data: PageInterface | null,
  excluded?: string[]
}

const ContentRepeater: React.FC<ContentRepeaterProps> = ({ data, excluded }) => {
  return (
    <div>
      {data && data.attributes.content && data.attributes.content.map((item, index) => {

        const type = item['__component'];

        if (type === 'banner.banner' && !excluded?.includes('banner.banner')) {
          const { banner_image, banner_size, banner_title } = item;
          const imgUrl = `${process.env.REACT_APP_UPLOAD_URL}${banner_image['data']['attributes']['url']}`;

          return (
            <Banner key={index}
                    image={imgUrl}
                    title={banner_title}
                    size={banner_size} />);

        }

        if (type === 'text.text' && !excluded?.includes('text.text')) {
          const {
            text,
            variant,
            alignment
          } = item;

          return (
            <Container key={index}>
              <Typography content={text} variant={variant} alignment={alignment} />
            </Container>);

        }
        if (type === 'title.section-title' && !excluded?.includes('title.section-title')) {
          const {
            title,
            variant,
            component,
            alignment,
            border,
            weight
          } = item;

          return (
            <Container key={index}>
              <SectionTitle content={title} variant={variant} weight={weight} border={border}
                            component={component} alignment={alignment} />
            </Container>);
        }

        if (type === 'slider.slider' && !excluded?.includes('slider.slider')) {
          const {
            dots,
            image,
            title,
            text,
            infinite,
            speed
          } = item;

          const { slide } = item;
          return <Slider key={index} slides={slide} settings={{ dots, image, title, text, infinite, speed }} />;
        }
      })}
    </div>
  );
};
export default ContentRepeater;