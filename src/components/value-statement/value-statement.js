import React, { useState, useEffect } from 'react';
import Video from '../video';
import Image from '../image';
import { mapJsonRichText } from '../../utils/renderRichText';
import LinkManager from '../../utils/link-manager';
import PropTypes from 'prop-types';
import './value-statement.css';

const ValueStatement = ({ content }) => {
  content.item.forEach((i) => {
    console.log(i);
  });

  const editorProps = {
    'data-aue-resource': `urn:aemconnection:${content._path}/jcr:content/data/${content?._variation}`,
    'data-aue-type': 'reference',
    'data-aue-label': content?.title,
    'data-aue-model': content?._model?._path,
    'data-aue-behavior': 'component'
  };

  return (
    <div {...editorProps}>
      <section className='value-statement'>
        <h2 data-aue-prop='title' data-aue-type='text' data-aue-label='Title'>{content.title}</h2>
        <p data-aue-prop='subTitle' data-aue-type='text' data-aue-label='Sub-Title'>{content.subTitle}</p>
        <ul data-aue-prop='item' data-aue-type='richtext' data-aue-label='Item'>
          {content.item.map((i, n) => (
            <li key={n}>{mapJsonRichText(i.json)}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

ValueStatement.propTypes = {
  content: PropTypes.object
};

export default ValueStatement;
