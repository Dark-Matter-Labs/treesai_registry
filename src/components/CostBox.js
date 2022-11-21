import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

export default function CostBox(props) {
  const [costTotal, setCostsTotal] = useState(100);
  const [moneyNeeded, setMoneyNeeded] = useState(0);

  useEffect(() => {
    setCostsTotal(props.costTotal);
    setMoneyNeeded(props.moneyNeeded);
  }, [props]);

  return (
    <div className='px-4'>
      <div className='mt-8 flex flex-col'>
        <div className='-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
            <div className='overflow-hidden border border-indigo-600 rounded-3xl '>
              <table className='min-w-full divide-y divide-indigo-600'>
                <thead className='bg-gray-50'>
                  <tr className=''>
                    <th
                      scope='col'
                      className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6'
                    >
                      Budget
                    </th>
                    <th
                      scope='col'
                      className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                    >
                      Money Needed
                    </th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-indigo-600 bg-white-200'>
                  <tr>
                    <td className='whitespace-nowrap py-4 pl-4 pr-3 medium-intro-md text-indigo-600 sm:pl-6'>
                      £ {costTotal}
                    </td>
                    <td className='whitespace-nowrap px-3 py-4 medium-intro-md text-indigo-600'>
                      £ {moneyNeeded}
                    </td>
                  </tr>
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
  costTotal: PropTypes.number,
  moneyNeeded: PropTypes.number,
};
