import useFetch from '../../hooks/use-fetch.hook';

interface AboutProps {

}

interface Page {
  id: number;
  attributes: {
    title: string;
  };
}

const About: React.FC<AboutProps> = (props) => {
  const { data, isError, isLoading } = useFetch<Page>(
    `/pages?populate=*&filters[page_url][$contains]=about-us`
  );

  return (
    <div>
      {data &&
        <>
        </>
      }
    </div>
  );
};
export default About;