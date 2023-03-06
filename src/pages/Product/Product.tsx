import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/use-fetch.hook';
import Container from '../../components/Container/Container';
import classes from './Product.module.scss';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/cart';

type ImageProps = {
  id: number;
  attributes: {
    url: string;
  }

}

interface ProductInterface {
  id: number;
  attributes: {
    images: {
      data: ImageProps[]
    },
    description: string;
    title: string;
    price: number;
    price_old: number;
  };
}

const IMG_PREFIX = process.env.REACT_APP_UPLOAD_URL;

const Product = () => {
  const [selectedImg, setSelectedImg] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const { id } = useParams();

  const { data, isError, isLoading } = useFetch<ProductInterface>(
    `/products/${id}?populate=*`
  );

  const images = data?.attributes.images.data.map((img) => `${IMG_PREFIX}${img.attributes.url}`);
  const addToCartHandler = () => {
    if (data && images) {
      dispatch(addToCart({
        id: +id!,
        title: data.attributes.title,
        img: images[0],
        price: data.attributes.price,
        quantity: quantity
      }));
    }
  };
  return (
    <div className={classes.product_teaser}>
      {data &&


        <Container>
          <div className={classes.product}>
            {
              images &&
              <div className={classes.product__images__container}>
                <div className={classes.product__images}>
                  {images.map((item, index) => <img src={item} key={index}
                                                    onClick={() => setSelectedImg(index)} />)}

                </div>
                <div className={classes.product__image}>
                  <img src={images[selectedImg]} />
                </div>
              </div>
            }


            <div className={classes.product__info}>
              <h1 className={classes.product__name}>{data.attributes.title}</h1>
              <p className={classes.product__description}>{data.attributes.description}</p>
              <div className={classes.actions}>
                <div className={classes.price_container}>
                  {data.attributes.price_old &&
                    <span className={classes['product__price--old']}>{data.attributes.price_old} PLN</span>}
                  <span className={classes.product__price}>{data.attributes.price} PLN</span>
                </div>
                <div className={classes.add_to_cart}>
                  <div className='quantity'>
                    <button onClick={() => setQuantity(prevState => prevState === 1 ? 1 : prevState - 1)}>-</button>
                    {quantity}
                    <button onClick={() => setQuantity(prevState => prevState + 1)}>+</button>
                  </div>
                  <button className={classes.add_to_cart_btn} onClick={addToCartHandler}>
                    Add to cart
                  </button>
                </div>

              </div>
            </div>
          </div>
        </Container>
      }
    </div>
  );
};
export default Product;