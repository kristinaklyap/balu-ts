import useFetch from '../../hooks/use-fetch.hook';
import SectionTitle from '../../components/SectionTitle/SectionTitle';

import classes from './Page.module.scss';
import Typography from '../../components/Typography/Typography';

interface AboutProps {

}

interface Page {
  id: number,
  attributes: {
    page_title: string;
    content: []
  }
}

const Page: React.FC<AboutProps> = (props) => {

  const { data, isError, isLoading } = useFetch<Page[]>(
    `/pages?filters[page_url][$contains]=about-us&populate=deep`
  );

  const productData = data ? data[0] : null;

  console.log('productData', productData);

  return (
    <>
      {productData &&
        <div className={classes.page}>
          {productData.attributes.content && productData.attributes.content.map((item, index) => {

            const type = item['__component'];
            if (type === 'banner.banner') {
              const { banner_image, banner_size, banner_title } = item;
              return <div  key={index}>
                <p>{banner_image['data'] && banner_image['data']['attributes']['url']}</p>
                <p>{banner_size}</p>
                <p>{banner_title}</p>
              </div>;
            }
            if (type === 'text.text') {
              const {
                text,
                variant,
                alignment
              } = item;

              return <Typography key={index} content={text} variant={variant} alignment={alignment} />;

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

              console.log('weightweightweightweightweight',weight)
              return <SectionTitle key={index} content={title} variant={variant} weight={weight} border={border}
                                   component={component} alignment={alignment} />;

            }


          })}


        </div>
      }
    </>
  );
};
export default Page;