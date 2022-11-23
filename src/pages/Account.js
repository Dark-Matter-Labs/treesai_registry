import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import useSWR from 'swr';
import { Helmet } from 'react-helmet';

import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import LoadingSpinner from '../components/LoadingSpinner';
import SectionHeader from '../components/SectionHeader';
import ProjectsTable from '../components/map/ProjectsTable';
import BudgetBarChart from '../components/charts/BudgetBarChart';
import RibaStageChart from '../components/charts/RibaStageChart';

import { get_user_projects, get_all_user_runs } from '../utils/backendCRUD';

import {
  getTotalTrees,
  getTotalCarbonSeq,
  getTotalCarbonStorage,
  processForBudgetChart,
  processRibaChart,
} from '../utils/account_page_helper';

const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

function useUser(id) {
  const { data, error } = useSWR(id, get_user_projects, swrOptions);

  return {
    userProjectList: data,
    isLoading: !error && !data,
    isError: error,
  };
}

function useRuns(projectList) {
  const { data, error } = useSWR(projectList, get_all_user_runs, swrOptions);

  return {
    userRuns: data,
    isRunLoading: !error && !data,
    isRunError: error,
  };
}

export default function Account(props) {
  const { userProjectList, isLoading, isError } = useUser(sessionStorage.user_id);
  const { userRuns, isRunLoading, isRunError } = useRuns(userProjectList);

  console.log('projList', userProjectList);
  console.log('runs', userRuns);

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

  if (isLoading || isRunLoading) return <LoadingSpinner />;
  else if (isError || isRunError) return <div>Failed to load</div>;
  return (
    <div className='font-favorit bg-white-200 bg-pattern '>
      {process.env.NODE_ENV === 'production' && (
        <Helmet>
          <meta httpEquiv='Content-Security-Policy' content='upgrade-insecure-requests' />
        </Helmet>
      )}
      <NavBar loggedIn={props.loggedIn} current='account' />
      <div className='bg-white-200 global-margin bg-pattern '>
        <div className='title-box mt-5 bg-dark-wood-800 py-20'>
          <h1 className='text-center text-white-200'>
            Welcome, {sessionStorage.getItem('user_name')}
          </h1>
        </div>

        <div className='py-10'>
          <SectionHeader title='Your projects' type='general' />
          <div className='flex flex-col items-center justify-center'>
            <ProjectsTable data={userProjectList['projects']} columns={columns} />
          </div>
        </div>

        <SectionHeader title='Aggregate project impact' type='general' />
        <div className='bg-dark-wood-800 px-10 py-10'>
          <h2 className='text-white-200'>
            Total Projects in Portfolio: {userProjectList.projects.length}
          </h2>
          <h2 className='text-white-200'>
            Total number of Trees: {getTotalTrees(userProjectList.projects)}
          </h2>

          <h2 className='text-center text-white-200'>Stage of projects based on RIBA plan</h2>
          <RibaStageChart data={processRibaChart(userProjectList)} />
          <h2 className='text-center text-white-200'>Impact generated</h2>
          <h2 className='text-white-200'>Carbon Storage(Kgs) {getTotalCarbonStorage(userRuns)}</h2>
          <h2 className='text-white-200'>
            Cumulative Carbon Sequestration (Kgs): {getTotalCarbonSeq(userRuns)}
          </h2>
          <h2 className='text-center text-white-200'>UN Sustainable Development Goals</h2>
          <h2 className='text-center text-white-200'>
            Distribution of portfolio (by typology) in £
          </h2>
          <BudgetBarChart data={processForBudgetChart(userProjectList)} />
        </div>

        <Footer />
      </div>
    </div>
  );
}

Account.propTypes = {
  loggedIn: PropTypes.bool,
};
