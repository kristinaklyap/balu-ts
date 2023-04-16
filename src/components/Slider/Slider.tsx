import { useEffect, useState } from 'react';
import classes from './Slider.module.scss';

export interface SlideProps {
  image: {
    data: {
      attributes: {
        url: string;
      }
    }
  };
  title?: string;
  text?: string;
}

export interface SliderProps {
  slides: SlideProps[],
  settings: {
    dots: boolean,
    image: boolean,
    title: boolean,
    text: boolean,
    infinite: boolean,
    speed: number
  }
}

const Slider: React.FC<SliderProps> = ({ slides, settings }) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const dotClickHandler = (e: React.MouseEvent<HTMLSpanElement>) => {
    const currentDot = e.target! as HTMLSpanElement;
    const currentDotIndex = currentDot.getAttribute('id')?.slice(-1)!;

    setCurrentSlide(+currentDotIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const slideIndex = +currentSlide + 1;
      setCurrentSlide(slideIndex);
    }, 10000);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };

  });

  useEffect(() => {
    const infinite = () => {
      if (Object.keys(slides).length === (currentSlide)) {
        setCurrentSlide(0);
      }
    };
    infinite();
  });
  return (
    <div>
      <div className={classes.carousel_container}>
        {Object.entries(slides).map(slide => {
          const slideIndex = slide[0];
          const slideData = slide[1];

          const slideImg = `${process.env.REACT_APP_UPLOAD_URL}${slideData.image.data.attributes.url}`;
          const slideTitle = slideData.title;
          const slideText = slideData.text;

          const isActive = (currentSlide === +slideIndex) ? classes.active : '';

          return (
            <div key={`slide-${slideIndex}`}
                 id={`slide-${slideIndex}`}
                 className={`${classes.carousel_container_item} ${isActive}`}
                 style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >

              {slideImg && settings.image &&
                <div className={classes['carousel_container_item--image']}>
                  <img src={`${slideImg}`} />
                </div>
              }

              {(settings.title || settings.text) &&
                <div className={classes['carousel_container_item--content']}>
                  {slideTitle && settings.title &&
                    <div className={classes['carousel_container_item--title']}>{slideTitle}</div>}
                  {slideText && settings.text && <div><p>{slideText}</p></div>}
                </div>
              }
            </div>);
        })}
        {settings.dots &&
          <div className={classes['carousel_container--dots']}>
            {Object.entries(slides).map(item => {
              const dotIndex = item[0];
              const dotClasses = currentSlide === +dotIndex ? `${classes['dot']} dot-${dotIndex} ${classes['active']}` : `${classes['dot']} dot-${dotIndex}`;

              return <span onClick={dotClickHandler} id={`dot-${dotIndex}`} key={`dot-${dotIndex}`}
                           className={dotClasses} />;
            })}
          </div>
        }
      </div>
    </div>
  );
};
export default Slider;