import React, { useState, useEffect } from 'react';
import Video from '../video';
import Image from '../image';
import { mapJsonRichText } from '../../utils/renderRichText';
import LinkManager from '../../utils/link-manager';
import PropTypes from 'prop-types';
import './productteaser.css';

const imageSizes = [
  {
    imageWidth: '660px',
    renditionName: 'web-optimized-large.webp',
    size: '(min-width: 1000px) 660px'
  },
  {
    imageWidth: '1000px',
    renditionName: 'web-optimized-large.webp',
  },
  {
    imageWidth: '800px',
    renditionName: 'web-optimized-large.webp',
  },
  {
    imageWidth: '600px',
    renditionName: 'web-optimized-large.webp',
  },
  {
    imageWidth: '412px',
    renditionName: 'web-optimized-medium.webp',
  },
  {
    size: '100vw',
  }
];


const imageSizesHero = [
  {
    imageWidth: '1600px',
    renditionName: 'web-optimized-xlarge.webp',
  },
  {
    imageWidth: '1200px',
    renditionName: 'web-optimized-xlarge.webp',
  },
  {
    imageWidth: '1000px',
    renditionName: 'web-optimized-large.webp',
  },
  {
    imageWidth: '800px',
    renditionName: 'web-optimized-large.webp',
  },
  {
    imageWidth: '600px',
    renditionName: 'web-optimized-medium.webp',
  },
  {
    imageWidth: '412px',
    renditionName: 'web-optimized-small.webp',
  },
  {
    size: '100vw',
  }
];

const ProductTeaser = ({ content }) => {
  const endpoint = 'https://main--demo-boilerplate--lamontacrook.hlx.page/audible/books.json';
  const [book, setBook] = useState(null);
  useEffect(() => {
    fetch(endpoint).then((res) => {
      if (res) {
        res.json().then((json) => {
          const fBook = json.data.filter(bk => bk.SKU === content.productSku);
          setBook(fBook[0]);
        });
      }
    }).catch((error) => {
      throw (error);
    });
  }, [endpoint, content.productSku]);

  const renderAsset = ({ asset }) => {
    const imageProps = {
      'data-aue-prop': 'asset',
      'data-aue-type': 'media',
      'data-aue-label': 'Asset'
    };
    if (asset && Object.prototype.hasOwnProperty.call(content.asset, 'format'))
      return (<Video content={content.asset} />);
    else if (asset && Object.prototype.hasOwnProperty.call(content.asset, 'mimeType'))
      return (<Image imageProps={imageProps} asset={content.asset} imageSizes={content.style === 'hero' ? imageSizesHero : imageSizes} />);
    else
      return (<Image imageProps={imageProps} asset={content.asset} imageSizes={content.style === 'hero' ? imageSizesHero : imageSizes} />);
  };

  const editorProps = {
    'data-aue-resource': `urn:aemconnection:${content._path}/jcr:content/data/${content?._variation}`,
    'data-aue-type': 'reference',
    'data-aue-label': content?.title,
    'data-aue-model': content?._model?._path,
    'data-aue-behavior': 'component'
  };

  return (
    <div {...editorProps}>
      <section className={'product-teaser ' + content.style}>
        {content.title && book && (
          <div className='container'>
            <picture>
              <img loading='eager'
                alt={book.title}
                title={book.title}
                src={book.image} />
            </picture>

            <div className='content-block'>
              <h1 data-aue-prop='title' data-aue-type='text' data-aue-label='Title'>{content.title}</h1>
              <picture>
                <img loading='eager' alt='ratings' src={book.stars} /> {book.ratings}
              </picture>
              <h5>{book.title}</h5>

              <ul>
                <li>Written by: {book.author}</li>
                <li>Performed by: {book.performer}</li>
                <li>Length: {book.length}</li>
              </ul>
              {content.callToAction && (
                <LinkManager item={content} className='button'>{content.callToAction}</LinkManager>
              )}
              <p>{book.description}</p>
            </div>
          </div>
        )}
      </section>

    </div>
  );
};

ProductTeaser.propTypes = {
  content: PropTypes.object
};

export default ProductTeaser;
