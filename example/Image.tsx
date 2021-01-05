import * as React from 'react';
import { useMediumZoom } from '../.';

export function Image(props) {
  const ref = React.useRef();
  const handler = useMediumZoom(ref, {
    // check the <template> in index.html
    template: '#template-dropbox-paper',
    container: '[data-zoom-container]',
  });

  // custom handling
  React.useEffect(() => {
    handler.on('open', () => {
      document.body.style.overflow = 'hidden';
    });
    handler.on('closed', () => {
      document.body.style.overflow = '';
    });

    handler.on('opened', () => {
      // check the <template> in index.html
      const closeButton = document.querySelector('[data-zoom-close]');
      closeButton?.addEventListener('click', handler.close);
    });
  });

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        rowGap: 10,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <button
        style={{
          display: 'block',
          border: 'none',
          background: 'black',
          padding: 10,
          color: 'white',
        }}
        onClick={() => {
          handler.open();
        }}
      >
        Open image
      </button>
      <img ref={ref} {...props} />
    </div>
  );
}
