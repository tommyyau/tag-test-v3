import React, { FunctionComponent } from 'react';
import { TileStackerInterface } from './models';
import { urlFor } from '../../helpers/imageUrl';
import { useInView } from 'react-intersection-observer';
import CartWire from '../CartWire';
import './styles.scss';

const ProductStacker: FunctionComponent<TileStackerInterface> = ({
  slides,
  headline,
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: '5px 0px',
  });

  console.log(slides);

  const renderer = slide => {
    return (
      <div className="col col-xs-6 col-6">
        <div ref={ref} data-inview={inView} key={slide.name}>
          <div className="bp-tileStacker_item">
            <span className="bp-tileStacker_type">{slide._type}</span>
            <div className="bp-tileStacker_image">
              <figure>
                {inView ? (
                  <picture
                    className="bp-image__placeholder"
                    style={{
                      paddingTop: '100%',
                      background: `url(${slide._rawImage.asset.metadata.lqip})`,
                      backgroundSize: 'cover',
                    }}
                  >
                    <source
                      media="screen and (min-width: 560px)"
                      srcSet={`${urlFor(slide._rawImage)
                        .width(280)
                        .height(280)
                        .fit('max')
                        .auto('format')
                        .url()
                        .toString()}`}
                    />
                    <source
                      media="screen and (min-width: 320px)"
                      srcSet={`${urlFor(slide._rawImage)
                        .width(160)
                        .height(160)
                        .fit('max')
                        .auto('format')
                        .url()
                        .toString()}`}
                    />
                    <img
                      className="bp-slider_image"
                      src={urlFor(slide._rawImage)
                        .width(280)
                        .height(280)
                        .fit('max')
                        .url()}
                      alt={slide.image.alt}
                    />
                  </picture>
                ) : null}
              </figure>
            </div>

            <h3 className="bp-tileStacker_headline">
              <p>{slide.name}</p>
              <CartWire smartProductId="794e3c66ea93215ff4a4f6258e7ed38c" />
            </h3>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bp-tileStacker">
      <div className="bp-tileStacker_header">
        <h2 className="bp-tileStacker_title">{headline}</h2>
      </div>
      <div className="col">
        <div className="col-container">
          {slides.map(slide => renderer(slide))}
        </div>
      </div>
    </div>
  );
};

export default ProductStacker;
