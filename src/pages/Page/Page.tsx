import useFetch from '../../hooks/use-fetch.hook';
import { useParams } from 'react-router-dom';

import PageInterface from './../../models/PageInterface';
import ContentRepeater from '../../components/ContentRepeater/ContentRepeater';
import classes from './Page.module.scss';
import Container from '../../components/Container/Container';
import NotFound from '../../components/NotFound/NotFound';


const Page = () => {
  const { pageSlug } = useParams();

  const { data, isError, isLoading } = useFetch<PageInterface[]>(
    `/pages?filters[page_url][$contains]=${pageSlug}&populate=deep`
  );

  const pageData = data ? data[0] : null;
  return (
    <div className={classes.page}>
      {
        pageData ? <ContentRepeater data={pageData} /> : <NotFound />
      }
    </div>
  );
};
export default Page;