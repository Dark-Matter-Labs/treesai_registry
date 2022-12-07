import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

/* Components */
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import LoadingSpinner from '../components/LoadingSpinner';
import SectionHeader from '../components/SectionHeader';
import ProjectsTable from '../components/map/ProjectsTable';
import BudgetBarChart from '../components/charts/BudgetBarChart';
import RibaStageChart from '../components/charts/RibaStageChart';
import SDGList from '../components/SDGList';
import WaterfallChart from '../components/charts/WaterfallChart';

/* Hooks */

import {
  useUserProjects,
  getTotalTrees,
  getTotalCarbonSeq,
  getTotalCarbonStorage,
  processForBudgetChart,
  processRibaChart,
} from '../utils/account_page_helper';
import StatBlock from '../components/analysis/StatBlock';

export default function Account(props) {
  const { userProjectList, isLoading, isError } = useUserProjects(sessionStorage.user_id);

  console.log('projList', userProjectList);

  const columns = useMemo(
    () => [
      {
        Header: 'projects',
        columns: [
          {
            Header: 'Title',
            accessor: 'title',
          },
          {
            Header: 'Area',
            accessor: 'area',
          },
          {
            Header: 'Number of trees',
            accessor: 'number_of_trees',
          },
          {
            Header: 'Cost',
            accessor: 'cost',
          },
          {
            Header: 'Stage',
            accessor: 'stage',
          },
          {
            Header: 'Activities',
            accessor: 'activities',
          },
          {
            Header: 'Developer',
            accessor: 'project_dev',
          },
        ],
      },
    ],
    [],
  );

  if (isLoading) return <LoadingSpinner />;
  else if (isError) return <div>Failed to load</div>;
  return (
    <div className='font-favorit bg-white-200 bg-pattern '>
      {process.env.NODE_ENV === 'production' && (
        <Helmet>
          <meta httpEquiv='Content-Security-Policy' content='upgrade-insecure-requests' />
        </Helmet>
      )}
      <NavBar loggedIn={props.loggedIn} current='account' />
      <div className='bg-white-200 global-margin bg-pattern '>
        <div className='title-box mt-5 bg-green-600 py-20'>
          <h1 className='text-center text-white-200'>
            Welcome to your account, {sessionStorage.getItem('user_name')}!
          </h1>
        </div>
        <div className='my-10 grid'>
          <div className='book-intro-md max-w-3xl place-self-center text-dark-wood-700'>
            <p className='pb-4'>
              Here you can check the information of your projects - individually or combined.
            </p>
            <hr className='border-dark-wood-600' />
            <p className='pt-4 '>Check here for details your project and updates.</p>
          </div>
        </div>

        <div className='py-10'>
          <SectionHeader title='Your projects' type='typology' />
          <div className='mx-10 rounded-3xl border bg-white-200 px-20 py-10'>
            <ProjectsTable data={userProjectList} columns={columns} />
          </div>
        </div>
        <SectionHeader title='Aggregate project impact' type='account' />
        <div className='bg-dark-wood-800 px-10 py-10 mb-40'>
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-x-4 py-5'>
            <StatBlock
              highlightColour='dark'
              label='Total Projects in Portfolio:'
              stat={userProjectList.length}
            />
            <StatBlock
              highlightColour='green'
              label=' Total number of Trees:'
              stat={getTotalTrees(userProjectList)}
            />
            <div className='col-span-3'></div>
            <div className='my-5 rounded-[30px] bg-white-200 '>
              <div className='px-4 mt-4 medium-intro-lg text-dark-wood-800'>
                Stage of projects based on RIBA plan
              </div>
              <RibaStageChart data={processRibaChart(userProjectList)} />
            </div>
            <div className='my-5 rounded-[30px] bg-white-200 col-span-2'>
              <div className='px-4 mt-4 medium-intro-lg text-green-600'>
                Impacts generated (and related efficiency ratio)
              </div>

              <div className='grid grid-cols-6 gap-12 mx-5 my-5'>
                <div className='flex-col justify-center items-center'>
                  <div className='medium-intro-sm rounded-full bg-green-600 px-8 py-9 text-white text-center'>
                    {getTotalCarbonStorage(userProjectList)}
                  </div>
                  <div className='text-center text-green-600 medium-intro-md'>
                    Cumulative Carbon Sequestration (Kgs)
                  </div>
                </div>

                <div className='flex-col justify-center items-center'>
                  <div className='medium-intro-sm rounded-full bg-green-600 px-8 py-9 text-white text-center'>
                    {getTotalCarbonSeq(userProjectList)}
                  </div>
                  <div className='text-center text-green-600 medium-intro-md'>
                    Carbon Storage (Kgs)
                  </div>
                </div>
              </div>
            </div>
            <div className='my-5 rounded-[30px] bg-white-200 '>
              <div className='px-4 mt-4 medium-intro-lg text-green-600'>
                UN Sustainable Development Goals
              </div>
              <SDGList sdgs={['11', '8']} />
            </div>
            <div className='my-5 rounded-[30px] bg-white-200 col-span-2'>
              <div className='px-4 mt-4 medium-intro-lg text-green-600'>
                Distribution of portfolio (by typology) in £
              </div>
              <BudgetBarChart data={processForBudgetChart(userProjectList)} />
            </div>
            <div className='my-5 rounded-[30px] bg-white-200 col-span-3'>
              <div className='px-4 mt-4 medium-intro-lg text-dark-wood-800'>
                Portoflio Tree population growth (Cumulative biomass)
              </div>
              <WaterfallChart data={['0', '1']} />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

Account.propTypes = {
  loggedIn: PropTypes.bool,
};
