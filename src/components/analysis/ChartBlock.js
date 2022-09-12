import PropTypes from 'prop-types';

export default function ChartBlock(props) {
  return (
    <div className='my-10 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3'>
      <div className='flex'>
        <div className='rounded-3xl border border-indigo-600 px-10 text-center'>
          <p className='py-5 text-indigo-600 medium-intro-lg'>{props.label}</p>
          <p className='text-indigo-600 medium-intro-lg'>
            You’ve selected “{props.maintenanceTypeName}” maintenance.
          </p>
          <div className='my-10'>
            {props.type !== 'pie' ? (
              <>
                <div className='flex items-center gap-5 pb-4'>
                  <div className='px-5 py-4 bg-green-600 rounded-full'></div>
                  <div>
                    <p className='book-intro-sm text-dark-wood-800'>High maintenance</p>
                  </div>
                </div>
                <div className='flex items-center gap-5 pb-4'>
                  <div className='px-5 py-4 bg-dark-wood-800 rounded-full'></div>
                  <div>
                    <p className='book-intro-sm text-dark-wood-800'>Medium maintenance</p>
                  </div>
                </div>
                <div className='flex items-center gap-5'>
                  <div className='px-5 py-4 bg-indigo-600 rounded-full'></div>
                  <div>
                    <p className='book-intro-sm text-dark-wood-800'>Low maintenance</p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className='flex items-center gap-5 pb-4'>
                  <div className='px-5 py-4 bg-dark-wood-300 rounded-full'></div>
                  <div>
                    <p className='book-intro-sm text-dark-wood-800'>Healthy</p>
                  </div>
                </div>
                <div className='flex items-center gap-5 pb-4'>
                  <div className='px-5 py-4 bg-dark-wood-600 rounded-full'></div>
                  <div>
                    <p className='book-intro-sm text-dark-wood-800'>Critical health</p>
                  </div>
                </div>
                <div className='flex items-center gap-5'>
                  <div className='px-5 py-4 bg-dark-wood-800 rounded-full'></div>
                  <div>
                    <p className='book-intro-sm text-dark-wood-800'>Dead</p>
                  </div>
                </div>
              </>
            )}
          </div>
          <p className='book-info-sm py-4  text-left text-indigo-600'>{props.detail}</p>
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
  detail: PropTypes.string,
};
