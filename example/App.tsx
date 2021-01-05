import * as React from 'react';
import { MediumZoom } from '../.';

import { Text } from './Text';
import { Image } from './Image';

import './styles.css';

const imgUrl =
  'https://images.pexels.com/photos/5615782/pexels-photo-5615782.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260';

export default function App() {
  return (
    <div className="app">
      <MediumZoom
        src={imgUrl}
        alt="building"
        style={{ width: 400, height: 'auto' }}
      />
      <Text />
      <MediumZoom
        src={imgUrl}
        alt="building"
        style={{ width: 'auto', height: 400 }}
        options={{ background: 'black', margin: 20 }}
      />
      <Text />
      <Image
        src={imgUrl}
        alt="building"
        style={{ width: 'auto', height: 250 }}
      />
      <Text />
    </div>
  );
}
