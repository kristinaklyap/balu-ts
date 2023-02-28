import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useWindowSize } from '../../hooks/use-windows-size';

import { ReactComponent as Logo } from './../../assets/logo.svg';
import { ReactComponent as CartIcon } from './../../assets/cart.svg';
import classes from './Header.module.scss';

const Header = () => {
  const [openCart, setOpenCart] = useState(false);
  const [openNav, setOpenNav] = useState(false);
  const quantityInCart = 0;

  const [width] = useWindowSize();
  const burgerClass = openNav ? classes.active : '';
  const navClass = openNav
    ? `${classes.nav} ${classes.active} `
    : `${classes.nav}`;
  return (
    <div className={classes.header}>
      <div className="container">
        <div className={classes.nav_container}>
          {width <= 1080 && (
            <>
              <NavLink className={classes.logo} to={'/'}>
                <Logo />
              </NavLink>
              <span
                className={`${classes.burger} ${burgerClass}`}
                onClick={() => setOpenNav(!openNav)}
              >
                {[1, 2, 3].map((i) => (
                  <div key={i} className={classes[`bar${i}`]} />
                ))}
              </span>
            </>
          )}
          <div className={navClass}>
            <NavLink to={'/about-us'}>o nas</NavLink>
            <NavLink to={'/products'}>produkty</NavLink>
            {width > 1080 && (
              <NavLink className={classes.logo} to={'/'}>
                <Logo />
              </NavLink>
            )}
            <NavLink to={'/inspirations'}>inspiracje</NavLink>
            <NavLink to={'/contact'}>Kontakt</NavLink>
          </div>
          <div className={classes.cart_container}>
            <a
              href={'#'}
              onClick={() => setOpenCart(!openCart)}
              className={classes.cart}
            >
              <CartIcon />
              <span>{quantityInCart}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
