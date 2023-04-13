import classes from './Banner.module.scss';
import { ReactNode } from 'react';

interface BannerProps {
  image: string;
  title?: string;
  size?: string;
  children?: ReactNode;
}

const Banner: React.FC<BannerProps> = ({ image, title, size, children }) => {
  return (
    <div className={classes.banner} data-size={size}>
      <div className={classes.banner__background}>
        <img src={image} alt={`${title} banner`} />
      </div>
      <div className={classes.banner__content}>
        {children ? children : <h1>{title}</h1>}
      </div>
    </div>
  );
};
export default Banner;