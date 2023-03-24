import { Link } from 'react-router-dom';

import { ReactComponent as Logo } from './../../assets/logo.svg';
import { ReactComponent as InstagramLogo } from './../../assets/instagram.svg';
import classes from './Footer.module.scss';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <footer className={classes.footer}>
        <div className={classes.footer_content}>
          <div className={classes.col}>
            <ul>
              <li>
                <Link to={'/privacy-policy'}>Polityka Prywatności</Link>
              </li>
              <li>
                <Link to={'/contact'}>Kontakt</Link>
              </li>
            </ul>
          </div>
          <div className={classes.logo_container}>
            <Link to={'/'}>
              <Logo />
            </Link>
          </div>
          <div className={classes.social_container}>
            <span>Follow us on social</span>
            <div>
              <a href={'/'} target={'_blank'}>
                <InstagramLogo />
              </a>
            </div>
          </div>
        </div>

        <div className={classes.copyrights}>
          <p>© {currentYear} Kristina Klyap. All Rights Reserved</p>
        </div>
      </footer>
    </>
  );
};
export default Footer;