import { useEffect, useState } from 'react';
import { getSDGDetailsFromId } from '../utils/SDGs_helper';
import PropTypes from 'prop-types';

export default function SDGList(props) {
  const [listOfSDGNumbers, setListOfSDGNumbers] = useState([]);
  const [listOfSDGData, setListOfSDGData] = useState([]);

  useEffect(() => {
    setListOfSDGNumbers(props.sdgs);
  }, [props]);

  console.log('listOfSDGNumbers', listOfSDGNumbers);

  useEffect(() => {
    let listOfSDGData = [];
    listOfSDGNumbers.forEach((sdgNumber) => {
      listOfSDGData.push(getSDGDetailsFromId(sdgNumber));
    });
    setListOfSDGData(listOfSDGData);
  }, [listOfSDGNumbers]);

  console.log('listOfSDGData', listOfSDGData);

  return (
    <ul role='list' className='divide-y divide-gray-200'>
      {listOfSDGData.map((SDG) => (
        <li key={SDG.number} className='flex py-4'>
          <img className='h-10 w-10 rounded-full' src={SDG.image} alt='' />
          <div className='ml-3'>
            <p className='text-sm font-medium text-gray-900'>{SDG.name}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

SDGList.propTypes = {
  sdgs: PropTypes.array,
};
