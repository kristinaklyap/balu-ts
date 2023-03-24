import useFetch from '../../hooks/use-fetch.hook';
import { useParams } from 'react-router-dom';

import PageInterface from './../../models/PageInterface';
import ContentRepeater from '../../components/ContentRepeater/ContentRepeater';
import classes from './Page.module.scss';


const Page = () => {
  const { pageSlug } = useParams();

  const { data, isError, isLoading } = useFetch<PageInterface[]>(
    `/pages?filters[page_url][$contains]=${pageSlug}&populate=deep`
  );

  const pageData = data ? data[0] : null;
  return (
    <>
      {pageData &&
        <div className={classes.page}>
          {
            pageData && <ContentRepeater data={pageData} />
          }
        </div>
      }
    </>
  );
};
export default Page;