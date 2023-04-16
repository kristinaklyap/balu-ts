import Container from '../Container/Container';
import SectionTitle from '../SectionTitle/SectionTitle';

const NotFound = () => {
  return (
   <Container>
     <div  className={'mt6 pb6'}>
       <SectionTitle content={'Ups.. 404'}/>
       <p>Szukana strona nie istnieje 🥲.
         Sprawdź czy został wpisany poprawny adres strony lub skorzystaj z nawigacji.</p>
     </div>
   </Container>
  );
};
export default NotFound;