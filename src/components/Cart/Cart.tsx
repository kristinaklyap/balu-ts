import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';

import { RootState } from '../../store';
import { makeRequest } from '../../helpers/make-request';
import { cartItem, removeItem, resetCart } from '../../store/cart';
import Typography from '../Typography/Typography';

import { ReactComponent as DeleteIcon } from './../../assets/delete.svg';
import classes from './Cart.module.scss';

const Cart = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.cart.products);
  const subtotal = Math.abs(useSelector((state: RootState) => state.cart.total)).toFixed(2);
  const resetCartHandler = () => dispatch(resetCart());
  const removeFromCartHandler = (item: cartItem) => dispatch(removeItem(item.id));

  const stripeKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY!;
  const stripePromise = loadStripe(stripeKey);
  const handlePayments = async () => {
    try {
      const stripe = await stripePromise;
      const res = await makeRequest.post('/orders', {
        products
      });

      await stripe?.redirectToCheckout({
        sessionId: res.data.stripeSession.id
      });

      dispatch(resetCart());

    } catch (err) {
      console.error(err, 'from frontend');
    }
  };

  return (
    <div className={classes.cart}>
      <Typography content={'Twój koszyk:'} variant={'p'} component={'h3'} />

      {products?.map(item => (
        <div className={classes.item} key={item.id}>
          <img src={item.img} alt='' />
          <div className={classes.details}>
            <Link to={`/products/${item.id}`}>
              <Typography content={item.title} variant={'p'} component={'p'} />
            </Link>
            <div className={classes.price}>
              {item.quantity} x {item.price}PLN
            </div>
          </div>

          <DeleteIcon className={'delete'} onClick={() => removeFromCartHandler(item)} />
        </div>
      ))}
      <div className={classes.total}>
        <span>SUMA</span>
        <span>{subtotal} PLN</span>
      </div>
      <button onClick={handlePayments}>Zamów</button>
      <span className={classes.reset} onClick={resetCartHandler}>wyczyść koszyk</span>
    </div>
  );
};
export default Cart;