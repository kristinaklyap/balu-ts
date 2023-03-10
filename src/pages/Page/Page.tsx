import useFetch from '../../hooks/use-fetch.hook';
import { useParams } from 'react-router-dom';

import ContentRepeater from '../../components/ContentRepeater/ContentRepeater';
import classes from './Page.module.scss';

export interface PageProps {
  id: number,
  attributes: {
    page_title: string;
    content: []
  }
}

const Page = () => {
  const { pageSlug } = useParams();

  const { data, isError, isLoading } = useFetch<PageProps[]>(
    `/pages?filters[page_url][$contains]=${pageSlug}&populate=deep`
  );

  const productData = data ? data[0] : null;
  return (
    <>
      {productData &&
        <div className={classes.page}>
          {
            productData && <ContentRepeater data={productData} />

          }
        </div>
      }
    </>
  );
};
export default Page;