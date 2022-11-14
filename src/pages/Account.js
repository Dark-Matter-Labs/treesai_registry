import React from 'react';
import PropTypes from 'prop-types';
import useSWR from 'swr';

import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import LoadingSpinner from '../components/LoadingSpinner';

import { get_user_projects, get_all_user_runs } from '../utils/backendCRUD';
import { sumRange, getLastElement } from '../utils/objUtils';

function useUser(id) {
  const swrOptions = {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  };

  const { data, error } = useSWR(id, get_user_projects, swrOptions);

  return {
    userProjectList: data,
    isLoading: !error && !data,
    isError: error,
  };
}

function useRuns(projectList) {
  const swrOptions = {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  };

  const { data, error } = useSWR(projectList, get_all_user_runs, swrOptions);

  return {
    userRuns: data,
    isRunLoading: !error && !data,
    isError: error,
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
      totalCarbonSeq += sumRange(
        projectRuns[i].output.Seq,
        0,
        getLastElement(projectRuns[i].output.Seq),
      );
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
        projectRuns[i].output.Storage[getLastElement(projectRuns[i].output.Storage)];
    }
  }

  return totalCarbonStorage.toFixed(2);
}

export default function Account(props) {
  const { userProjectList, isLoading } = useUser(sessionStorage.user_id);
  const { userRuns, isRunLoading } = useRuns(userProjectList);

  if (isLoading || isRunLoading) return <LoadingSpinner />;
  return (
    <div className='font-favorit bg-white-200 bg-pattern '>
      <NavBar loggedIn={props.loggedIn} current='account' />
      <div className='bg-white-200 global-margin bg-pattern '>
        <div className='title-box mt-5 bg-dark-wood-800 py-20'>
          <h1 className='text-center text-white-200'>
            Welcome, {sessionStorage.getItem('user_name')}
          </h1>
        </div>

        <div className='bg-dark-wood-800 my-20 px-10 py-10'>
          <h2 className='text-white-200'>
            Total Projects in Portfolio: {userProjectList.projects.length}
          </h2>
          <h2 className='text-white-200'>
            Total number of Trees: {get_tot_trees(userProjectList.projects)}
          </h2>
          <h2 className='text-white-200'>
            Cumulative Carbon Sequestration (Kgs): {get_tot_carbon_sq(userRuns)}
          </h2>
          <h2 className='text-white-200'>Carbon Storage(Kgs) {get_tot_carbon_storage(userRuns)}</h2>
        </div>

        <Footer />
      </div>
    </div>
  );
}

Account.propTypes = {
  loggedIn: PropTypes.bool,
};
