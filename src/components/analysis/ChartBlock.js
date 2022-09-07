import PropTypes from 'prop-types';

export default function ChartBlock(props) {
  return (
    <div className='my-10 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3'>
      <div className='flex'>
        <div className='rounded-3xl border border-indigo-600 px-10 text-center'>
          <h3 className='py-5 text-indigo-600'>{props.label}</h3>
          <h3 className='text-indigo-600'>
            You’ve selected “{props.maintenanceTypeName}” maintenance.
          </h3>
          <div className='my-10'>
            {props.type !== 'pie' ? (
              <>
                <div className='flex items-center gap-5 pb-4'>
                  <div className='px-5 py-4 bg-green-600 rounded-full'></div>
                  <div>
                    <p className='book-intro-md text-dark-wood-800'>High</p>
                  </div>
                </div>
                <div className='flex items-center gap-5 pb-4'>
                  <div className='px-5 py-4 bg-dark-wood-800 rounded-full'></div>
                  <div>
                    <p className='book-intro-md text-dark-wood-800'>Medium</p>
                  </div>
                </div>
                <div className='flex items-center gap-5'>
                  <div className='px-5 py-4 bg-indigo-600 rounded-full'></div>
                  <div>
                    <p className='book-intro-md text-dark-wood-800'>Low</p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className='flex items-center gap-5 pb-4'>
                  <div className='px-5 py-4 bg-green-600 rounded-full'></div>
                  <div>
                    <p className='book-intro-md text-dark-wood-800'>Healthy</p>
                  </div>
                </div>
                <div className='flex items-center gap-5 pb-4'>
                  <div className='px-5 py-4 bg-indigo-600 rounded-full'></div>
                  <div>
                    <p className='book-intro-md text-dark-wood-800'>Dead</p>
                  </div>
                </div>
                <div className='flex items-center gap-5'>
                  <div className='px-5 py-4 bg-dark-wood-800 rounded-full'></div>
                  <div>
                    <p className='book-intro-md text-dark-wood-800'>Critical</p>
                  </div>
                </div>
              </>
            )}
          </div>
          <p className='book-info-sm py-4  text-left text-indigo-600'>
            By reducing energy demand and absorbing carbon dioxide, trees and vegetation decrease
            the production and negative effects of air pollution and greenhouse gas emissions.
          </p>
        </div>
        <div className='w-8 my-10 bg-indigo-800'></div>
      </div>

      <div className='col-span-2 rounded-3xl border border-indigo-600 px-10 pt-5'>
        {props.children}
      </div>
    </div>
  );
}

ChartBlock.propTypes = {
  maintenanceTypeName: PropTypes.string,
  label: PropTypes.string,
  children: PropTypes.children,
  type: PropTypes.string,
};
