import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import ProductInterface from '../../models/ProductInterface';
import { addToCart } from '../../store/cart';

import classes from './ProductCard.module.scss';

interface ProductCardProps {
  product: ProductInterface;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();

  const IMG_PREFIX = process.env.REACT_APP_UPLOAD_URL;
  const images = product?.attributes.images.data.map((img) => `${IMG_PREFIX}${img.attributes.url}`);

  const addToCartHandler = () => {
    if (product && images) {
      dispatch(addToCart({
        id: product.id,
        title: product.attributes.title,
        img: images[0],
        price: product.attributes.price,
        quantity: 1
      }));
    }
  };

  return (
    <div>
      <div className={classes.product_card}>
        <NavLink to={`/product/${product.id}`}>
          {
            images &&
            <div className={classes.product_card__image}
                 style={{ backgroundImage: `url(${images[0]})` }} />
          }
          <span className={classes.product_card__name}>{product.attributes.title}</span>
          <span className={classes.product_card__price}>{product.attributes.price}PLN</span>
        </NavLink>

        <div className={classes.product_overlay}>
          <span className={classes.add} onClick={addToCartHandler}>+</span>
        </div>
      </div>
    </div>
  );
};
export default ProductCard;