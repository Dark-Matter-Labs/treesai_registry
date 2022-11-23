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
import { getLastKeyInObj } from '../utils/objUtils';

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

function get_tot_trees(projectList) {
  const totalTrees = projectList.reduce((accumulator, project) => {
    return accumulator + project.number_of_trees;
  }, 0);
  return totalTrees;
}

function get_tot_carbon_sq(projectRuns) {
  let totalCarbonSeq = 0;
  for (let i = 0; i < projectRuns.length; i++) {
    // Temporary check to not add carbon from all 3 runs, later to use user's chosen maintenance level
    if (i % 3 === 0) {
      totalCarbonSeq +=
        projectRuns[i].output.Cum_Seq[getLastKeyInObj(projectRuns[i].output.Cum_Seq)];
    }
  }

  return totalCarbonSeq.toFixed(2);
}

function get_tot_carbon_storage(projectRuns) {
  let totalCarbonStorage = 0;
  for (let i = 0; i < projectRuns.length; i++) {
    // Temporary check to not add carbon from all 3 runs, later to use user's chosen maintenance level
    if (i % 3 === 0) {
      totalCarbonStorage +=
        projectRuns[i].output.Storage[getLastKeyInObj(projectRuns[i].output.Storage)];
    }
  }
  return totalCarbonStorage.toFixed(2);
}

function prepare_data_for_budget_chart(projectList) {
  const budgetData = projectList['projects'].map((project) => {
    return {
      id: project.id,
      name: project.title,
      budget: project.cost,
    };
  });
  return budgetData;
}

function prepare_data_for_RIBA_chart(projectList) {
  // function to count how many projects are in each RIBA stage
  const RIBACount = projectList['projects'].reduce((accumulator, project) => {
    const stage = project.stage;
    if (accumulator[stage]) {
      accumulator[stage] += 1;
    } else {
      accumulator[stage] = 1;
    }
    return accumulator;
  }, {});

  // function to convert RIBA count object to array of objects
  const RIBAData = Object.keys(RIBACount).map((key) => {
    return {
      id: key,
      stage: RIBACount[key],
    };
  });

  return RIBAData;
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
            Total number of Trees: {get_tot_trees(userProjectList.projects)}
          </h2>

          <h2 className='text-center text-white-200'>Stage of projects based on RIBA plan</h2>
          <RibaStageChart data={prepare_data_for_RIBA_chart(userProjectList)} />
          <h2 className='text-center text-white-200'>Impact generated</h2>
          <h2 className='text-white-200'>Carbon Storage(Kgs) {get_tot_carbon_storage(userRuns)}</h2>
          <h2 className='text-white-200'>
            Cumulative Carbon Sequestration (Kgs): {get_tot_carbon_sq(userRuns)}
          </h2>
          <h2 className='text-center text-white-200'>UN Sustainable Development Goals</h2>
          <h2 className='text-center text-white-200'>
            Distribution of portfolio (by typology) in £
          </h2>
          <BudgetBarChart data={prepare_data_for_budget_chart(userProjectList)} />
        </div>

        <Footer />
      </div>
    </div>
  );
}

Account.propTypes = {
  loggedIn: PropTypes.bool,
};
