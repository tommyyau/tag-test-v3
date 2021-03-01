import React, { FunctionComponent } from 'react';
import classNames from 'classnames';
import { SanityProductSliderInterface } from './models';
import TileSlider from '../TileSlider';
import ProductStacker from '../ProductStacker';
import './styles.scss';

const SanityProductSlider: FunctionComponent<SanityProductSliderInterface> = ({
  name,
  slides,
  slideType,
  headline,
  searchCtaLabel,
  searchTags,
}) => {
  const stacker = slideType.name.indexOf('Stacker') >= 0 ? true : false;
  console.log(slides);

  return (
    <section
      className={classNames('bp-productSlider', stacker ? 'stacker' : null)}
    >
      <div className="bp-container">
        {stacker ? (
          <ProductStacker name={name} slides={slides} headline={headline} />
        ) : (
          <TileSlider name={name} slides={slides} headline={headline} />
        )}
      </div>
    </section>
  );
};

export default SanityProductSlider;
