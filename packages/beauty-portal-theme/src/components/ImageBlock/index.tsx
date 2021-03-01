import React, { FunctionComponent } from 'react';
import { Link } from 'gatsby';
import classNames from 'classnames';
import { useInView } from 'react-intersection-observer';
import { urlFor } from '../../helpers/imageUrl';
import BlockContent from '@sanity/block-content-to-react';
import { ImageBlockInterface } from './models';
import { blockTypeDefaultSerializers } from '../../helpers/sanity';

import './styles.scss';

const ImageBlock: FunctionComponent<ImageBlockInterface> = ({
  name,
  _rawTextBlockBody,
  _rawImage,
  url,
  imageBlockType,
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: '0px 0px',
  });
  const getComponentvariant = type => {
    return type
      .replace(/\s/g, '')
      .trim()
      .toLowerCase();
  };
  const Image = (
    <figure ref={ref} data-inview={inView}>
      {inView ? (
        <>
          <link
            rel="preload"
            as="image"
            href={`${urlFor(_rawImage)
              .width(559)

              .quality(80)
              .fit('max')
              .auto('format')
              .url()
              .toString()}`}
          />
          <picture
            className="bp-image__placeholder"
            style={{
              paddingTop: `calc(100% / ${_rawImage.asset.metadata.dimensions.aspectRatio})`,
              background: `url(${_rawImage.asset.metadata.lqip})`,
              backgroundSize: 'cover',
            }}
          >
            <source
              media="screen and (min-width: 560px)"
              srcSet={`${urlFor(_rawImage)
                .width(720)
                .quality(80)
                .fit('crop')
                .auto('format')
                .url()
                .toString()}`}
            />
            <source
              media="screen and (min-width: 320px)"
              srcSet={`${urlFor(_rawImage)
                .width(559)
                .quality(80)
                .fit('max')
                .auto('format')
                .url()
                .toString()}`}
            />
            <img
              src={urlFor(_rawImage)
                .width(720)
                .fit('crop')
                .auto('format')
                .quality(80)
                .url()}
              alt={_rawImage.alt}
            />
          </picture>
        </>
      ) : null}
    </figure>
  );

  return (
    <section
      className={classNames(
        'bp-imageBlock',
        getComponentvariant(imageBlockType.name) === 'imageblocktypeb'
          ? 'typeb'
          : null
      )}
    >
      <div className="bp-container">
        <Link to={url || '/'} className="bp-imageBlock_link">
          <div className="bp-imageBlock_content">
            <div className="bp-imageBlock_image">{Image}</div>
            <div className="bp-imageBlock_copy">
              <h2 className="bp-imageBlock_title">
                <span>{name}</span>
              </h2>
              {_rawTextBlockBody && (
                <BlockContent
                  serializers={blockTypeDefaultSerializers}
                  blocks={_rawTextBlockBody}
                />
              )}
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default ImageBlock;
