import React, {useState, useEffect} from 'react';
import TextTransition, { presets } from 'react-text-transition';

const TEXTS = [
  'Creating a digital twin of each tree',
  'Locating each tree within the virtual project space',
  'Simulating the weather and the growing season according to local weather trajectories',
  'Inspecting the growth of each tree',
  'Inspecting the health state of each tree',
  'Inspecting the risk of contagious diseases',
  'Inspecting health recovery through maintenance activities',
  'Estimating carbon release through dead roots',
  'Estimating carbon release due to mulched trees',
  'Estimating carbon release through dead trunks',
  'Removing dead trees',
  'Planting new trees'
];


export default function SAFLoadingScreen() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() =>
      setIndex(index => index + 1),
      2000
    );
    return () => clearTimeout(intervalId);
  }, []);

  return (
    <div className='spinner-container py-80'>
      <span className='sr-only'>Loading...</span>
      <div className='grid items-center justify-center'>
        <div className='loading-spinner'></div>
      </div>
      <div className='text-center mx-auto max-w-3xl py-20'>
        <h1 className='text-indigo-600'>
        <TextTransition springConfig={presets.wobbly}>
        {TEXTS[index % TEXTS.length]}
      </TextTransition>
        </h1>
      </div>
    </div>
  );
}
