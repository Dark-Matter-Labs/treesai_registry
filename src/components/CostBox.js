import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

export default function CostBox(props) {
  const [months, setMonths] = useState([]);
  const [costMonths, setCostMonths] = useState([]);
  const [costTotal, setCostsTotal] = useState([]);

  useEffect(() => {
    setMonths(props.months);
    setCostMonths(props.costMonths);
    setCostsTotal(props.costTotal);
  }, [props]);

  return (
    <div className='px-4'>
      <div className='mt-8 flex flex-col'>
        <div className='-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
            <div className='overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg'>
              <table className='min-w-full divide-y divide-gray-300'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th
                      scope='col'
                      className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6'
                    >
                      {months} Months
                    </th>
                    <th
                      scope='col'
                      className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                    >
                      50 years
                    </th>
                    <th scope='col' className='relative py-3.5 pl-3 pr-4 sm:pr-6'>
                      <span className='sr-only'>Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-200 bg-white'>
                  <td className='whitespace-nowrap py-4 pl-4 pr-3 medium-intro-md text-indigo-600 sm:pl-6'>
                    £ {costMonths}
                  </td>
                  <td className='whitespace-nowrap px-3 py-4 medium-intro-md text-indigo-600'>
                    £ {costTotal}
                  </td>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

CostBox.propTypes = {
  months: PropTypes.number,
  costMonths: PropTypes.number,
  costTotal: PropTypes.number,
};
