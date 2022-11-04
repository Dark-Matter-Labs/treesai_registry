import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import LoadingSpinner from '../components/LoadingSpinner';

import { getUserProjects } from '../utils/backendCRUD';

export default function Account(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [numberOfProjects, setNumberOfProjects] = useState(0);
  const [numberOfTrees, setNumberOfTrees] = useState(0);
  // const [projectIDList, setProjectIDList] = useState([]);
  useEffect(() => {
    // Set LoadingSpinner
    setIsLoading(true);

    getUserProjects(sessionStorage.user_id)
      .then((result) => {
        setIsLoading(false);
        setNumberOfProjects(result.projects.length);

        const totalTrees = result.projects.reduce((accumulator, project) => {
          return accumulator + project.number_of_trees;
        }, 0);
        setNumberOfTrees(totalTrees);

        // append result[i].projectID to projectIDList
        // and call /api/v1/saf/users/{user_id}/projects/{project_id}/runs for for each project? Sounds like bad perf idea and lots of GET requests
        // should call /api/v1/saf/runs/?skip=0&limit=20' but currently not working
        console.log(result);
      })
      .catch((error) => console.log('error', error));
  }, []);
  return (
    <div className='font-favorit bg-white-200 bg-pattern '>
      <NavBar loggedIn={props.loggedIn} current='account' />
      {isLoading && <LoadingSpinner />}
      <div className='bg-white-200 global-margin bg-pattern '>
        <div className='title-box mt-5 bg-dark-wood-800 py-20'>
          <h1 className='text-center text-white-200'>
            Welcome, {sessionStorage.getItem('user_name')}
          </h1>
        </div>

        <div className='bg-dark-wood-800 my-20 px-10 py-10'>
          <h2 className='text-white-200'>Total Projects in Portfolio: {numberOfProjects}</h2>
          <h2 className='text-white-200'>Total number of Trees: {numberOfTrees}</h2>
        </div>

        <Footer />
      </div>
    </div>
  );
}

Account.propTypes = {
  loggedIn: PropTypes.bool,
};
