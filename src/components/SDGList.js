import { useEffect, useState } from 'react';
import { getSDGDetailsFromId } from '../utils/SDGs_helper';
import PropTypes from 'prop-types';

export default function SDGList(props) {
  const [listOfSDGNumbers, setListOfSDGNumbers] = useState([]);
  const [listOfSDGData, setListOfSDGData] = useState([]);

  useEffect(() => {
    setListOfSDGNumbers(props.sdgs);
  }, [props]);

  useEffect(() => {
    let listOfSDGData = [];
    listOfSDGNumbers.forEach((sdgNumber) => {
      const details = getSDGDetailsFromId(sdgNumber);
      // Push if the result is not undefined
      if (details) {
        listOfSDGData.push(details);
      }
    });
    setListOfSDGData(listOfSDGData);
  }, [listOfSDGNumbers]);

  return (
    <ul role='list' className='divide-y divide-green-600'>
      {listOfSDGData.map((SDG) => (
        <li key={SDG.number} className='flex py-4 px-4'>
          <img className='h-10 w-10' src={SDG.image} alt='' />
          <div className='ml-3'>
            <p className='text-sm font-medium text-gray-900'>{SDG.name}</p>
            <p className='text-sm text-gray-500'>{SDG.number}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

SDGList.propTypes = {
  sdgs: PropTypes.array,
};
