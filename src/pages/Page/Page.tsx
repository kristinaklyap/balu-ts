import useFetch from '../../hooks/use-fetch.hook';
import { useParams } from 'react-router-dom';

import SectionTitle from '../../components/SectionTitle/SectionTitle';
import Typography from '../../components/Typography/Typography';
import Banner from '../../components/Banner/Banner';
import Container from '../../components/Container/Container';
import classes from './Page.module.scss';

interface Page {
  id: number,
  attributes: {
    page_title: string;
    content: []
  }
}

const Page = () => {
  const { pageSlug } = useParams();

  const { data, isError, isLoading } = useFetch<Page[]>(
    `/pages?filters[page_url][$contains]=${pageSlug}&populate=deep`
  );

  const productData = data ? data[0] : null;
  return (
    <>
      {productData &&
        <div className={classes.page}>
          {productData.attributes.content && productData.attributes.content.map((item, index) => {

            const type = item['__component'];

            if (type === 'banner.banner') {
              const { banner_image, banner_size, banner_title } = item;
              const imgUrl = `${process.env.REACT_APP_UPLOAD_URL}${banner_image['data']['attributes']['url']}`;
              return (
                <Banner key={index}
                        image={imgUrl}
                        title={banner_title}
                        size={banner_size} />);

            }

            if (type === 'text.text') {
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
            if (type === 'title.section-title') {
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
          })}
        </div>
      }
    </>
  );
};
export default Page;