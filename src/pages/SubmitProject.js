import React, { useState, useEffect, Fragment } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { RadioGroup } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/solid';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
// Components
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import SAFLoadingScreen from '../components/SAFLoadingScreen';
import SectionHeader from '../components/SectionHeader';
import FormBlock from '../components/form/FormBlock';
import TextInput from '../components/form/TextInput';
import AddressInput from '../components/form/AddressInput';
import NumberInput from '../components/form/NumberInput';
import Dropdown from '../components/form/Dropdown';
import Toggle from '../components/form/Toggle';
import RadioSelector from '../components/form/RadioSelector';
import ResultBlock from '../components/ResultBlock';
// Images
import projectImg from '../images/project-default.png';
import infoImage from '../images/info_eye.svg';
// Charts
import ChartMultiLine from '../components/charts/ChartMultiLine';
import ChartSingleLine from '../components/charts/ChartSingleLine';
import BarCanvas from '../components/charts/BarCanvas';
import LocationRiskChart from '../components/charts/LocationRisk';

import { saf_data } from '../utils/saf_data_model';

import { get_typologies } from '../utils/saf_utils';
import {
  get_cities,
  get_typologies_types,
  get_stages,
  get_land_use,
  get_activity_types,
  get_budget_types,
  get_raised_types,
} from '../utils/project_details';

import { getCouncils } from '../utils/geojson_utils';

// set SAF parameters
const typologies = get_typologies();

// set project parameters
const cities = get_cities();
const listCouncils = getCouncils();
const typologyTabs = get_typologies_types();
const stages = get_stages();
const landUse = get_land_use();
const activityTypes = get_activity_types();
const budgetTypes = get_budget_types();
const raisedTypes = get_raised_types();

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function SubmitProject(props) {
  const [processStage, setProcessStage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  /* Form variables, to be refactored to react-hook-form */
  const [projectName, setProjectName] = useState('');
  const [projectDev, setProjectDev] = useState('');
  const [landOwner, setLandOwner] = useState('');
  const [landUseChange, setLandUseChange] = useState(false);
  const [projectLength, setProjectLength] = useState(0);
  const [projectDescription, setProjectDescription] = useState('');
  const [treeNumber, setTreeNumber] = useState(1);
  const [selectedStage, setSelectedStage] = useState(stages[0]);
  const [selectedCC, setSelectecCC] = useState(listCouncils[0]);
  const [selectedLandUse, setSelectedLandUse] = useState('Recreation');
  const [selectedTypology, setSelectedTypology] = useState(typologies[0]);
  const [areaDensity, setAreaDensity] = useState(1);
  const [totalArea, setTotalArea] = useState(1);
  const [activityType, setActivityType] = useState(activityTypes[0]);
  const [budgetType, setBudetType] = useState(budgetTypes[0]);
  const [raisedType, setRaisedType] = useState(raisedTypes[0]);

  /* SAF Related variables */
  const [safOutput, setSafOutput] = useState(saf_data);
  const [cumulative_array, setCumulativeArray] = useState([]);
  const [avg_rel_array, setAvgRelArray] = useState([]);
  const [avg_seq_array, setAvgSeqArray] = useState([]);
  const [alive_array, setAliveArray] = useState([]);
  const [avg_rel, setAvgRel] = useState(1);
  const [avg_seq, setAvgSeq] = useState(1);
  const [alive, setAlive] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem('token') === null || sessionStorage.getItem('token') === undefined) {
      toast.error('You must be logged in to submit a project.');
      navigate('/register');
    }
  });

  function processSAFData() {
    /* SAF Related processing */

    /* Helper functions */
    function makeChartArray(dict) {
      let chartArray = [];
      chartArray = Object.keys(dict).map((key) => ({
        x: Number(key),
        y: dict[key],
      }));
      return chartArray;
    }

    function calcAverage(dict) {
      // Calculates the average of an array
      if (Object.keys(dict).length === 0) {
        return 0;
      } else {
        let sum = 0;
        Object.keys(dict).forEach((key) => {
          sum += dict[key];
        });
        return sum / Object.keys(dict).length;
      }
    }

    function calcSum(dict) {
      // Calculates the sum of an array
      let sum = 0;
      Object.keys(dict).forEach((key) => {
        sum += dict[key];
      });
      return sum;
    }

    function sumRange(array, start, end) {
      let sum = 0;

      for (let index = start; index < end; index++) {
        sum += array[index];
      }

      return sum;
    }

    /* Calculate */

    // Calculates the cumulative array
    setAlive(calcSum(safOutput.Alive));
    // Format all the arrays for the charts
    setAvgRelArray(makeChartArray(safOutput.Avg_Rel));
    setAvgSeqArray(makeChartArray(safOutput.Avg_Seq));
    // Calculate the average of the arrays
    setAvgRel(calcAverage(safOutput.Avg_Rel));
    setAvgSeq(calcAverage(safOutput.Avg_Seq));

    // Buckets
    const oneToThreeAlive = sumRange(safOutput.Alive, 0, 4);
    const threeToTenAlive = sumRange(safOutput.Alive, 4, 11);
    const tenToThirtyAlive = sumRange(safOutput.Alive, 11, 31);
    const thirtyToFiftyAlive = sumRange(safOutput.Alive, 31, 50);

    setAliveArray([
      { years: 'y1-2', trees: oneToThreeAlive },
      { years: 'y3-10', trees: threeToTenAlive },
      { years: 'y10-30', trees: tenToThirtyAlive },
      { years: 'y30-50', trees: thirtyToFiftyAlive },
    ]);

    let cumulative_seq_array, released_array, storage_array;

    cumulative_seq_array = makeChartArray(safOutput.Cum_Seq);
    released_array = makeChartArray(safOutput.Released);
    storage_array = makeChartArray(safOutput.Storage);

    setCumulativeArray([
      {
        id: 'seq',
        color: 'hsl(135, 70%, 50%)',
        data: cumulative_seq_array,
      },
      {
        id: 'release',
        color: 'hsl(347, 70%, 50%)',
        data: released_array,
      },
      {
        id: 'storage',
        color: 'hsl(31, 70%, 50%)',
        data: storage_array,
      },
    ]);
  }

  /* Data logic changes on receiving the SAF output */
  useEffect(() => {
    processSAFData();
  }, [safOutput]);

  const getSAFOutput = async () => {
    let requestHeaders = new Headers();
    requestHeaders.append('accept', 'application/json');
    requestHeaders.append('Content-Type', 'application/json');
    requestHeaders.append('Access-Control-Allow-Origin', '*');
    requestHeaders.append('Authorization', 'Bearer ' + sessionStorage.token);

    let payload;

    if (activityType.name === 'Developing') {
      payload = JSON.stringify({
        name: projectName,
        description: projectDescription,
        typology: selectedTypology.value,
        min_dbh: parseInt(selectedTypology.fixedDBH),
        max_dbh: parseInt(selectedTypology.fixedDBH),
        maintenance_scope: parseInt(selectedTypology.maintenance_type),
        season_growth_mean: 200,
        season_growth_var: 7,
        time_horizon: 50,
        density_per_ha: parseInt(treeNumber / areaDensity),
        species: selectedTypology.species,
      });
    } else {
      payload = JSON.stringify({
        name: projectName,
        description: projectDescription,
        typology: selectedTypology.value,
        min_dbh: parseInt(selectedTypology.minDBH),
        max_dbh: parseInt(selectedTypology.maxDBH),
        maintenance_scope: parseInt(selectedTypology.maintenance_type),
        season_growth_mean: 200,
        season_growth_var: 7,
        time_horizon: 50,
        density_per_ha: parseInt(treeNumber / areaDensity),
        species: selectedTypology.species,
      });
    }

    let requestOptions = {
      method: 'POST',
      headers: requestHeaders,
      body: payload,
      redirect: 'follow',
    };

    await fetch(
      process.env.REACT_APP_API_ENDPOINT +
        '/api/v1/saf/users/' +
        sessionStorage.user_id +
        '/projects/' +
        sessionStorage.project_id +
        '/run',
      requestOptions,
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        toast.error('Could not run SAF');
        setIsLoading(false);
        throw new Error('Something went wrong');
      })
      .then((result) => {
        setSafOutput(result);
        setIsLoading(false);
        window.scrollTo(0, 0);
        setProcessStage(2);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log('error', error);
      });
  };

  const getProjectID = async () => {
    let requestHeaders = new Headers();
    requestHeaders.append('accept', 'application/json');
    requestHeaders.append('Content-Type', 'application/json');
    requestHeaders.append('Access-Control-Allow-Origin', '*');
    requestHeaders.append('Authorization', 'Bearer ' + sessionStorage.token);

    const payload = JSON.stringify({
      title: projectName,
      description: projectDescription,
      in_portfolio: true,
      project_dev: projectDev,
      owner_id: sessionStorage.user_id,
      activities: 'maintenance',
      area: 0,
      cost: 0,
      stage: selectedStage + selectedLandUse + landOwner,
      number_of_trees: treeNumber,
      local_authority: 'string',
      location: 'string',
      start_date: '2022-06-16T09:32:51.188Z',
    });

    let requestOptions = {
      method: 'POST',
      headers: requestHeaders,
      body: payload,
      redirect: 'follow',
    };

    let response;
    setIsLoading(true);
    try {
      response = await fetch(
        process.env.REACT_APP_API_ENDPOINT +
          '/api/v1/saf/users/' +
          sessionStorage.user_id +
          '/projects',
        requestOptions,
      );
    } catch (ex) {
      return toast.error(ex);
    }
    if (!response.ok) {
      setIsLoading(false);
      return toast.error(response.status + ' : ' + response.statusText);
    }
    if (response.ok) {
      let data = await response.json();
      sessionStorage.setItem('project_id', JSON.stringify(data.id));

      getSAFOutput();
    }
  };

  return (
    <div className='bg-white-300 font-favorit'>
      {process.env.NODE_ENV === 'production' && (
        <Helmet>
          <meta httpEquiv='Content-Security-Policy' content='upgrade-insecure-requests' />
        </Helmet>
      )}
      <NavBar loggedIn={props.loggedIn} current='projectSubmit' />
      {processStage === 1 &&
        (isLoading ? (
          <SAFLoadingScreen />
        ) : (
          <div className=''>
            <div className='mx-10 sm:px-6 lg:px-8'>
              <Breadcrumb />
              <div className='title-box pt-8 mt-4 grid grid-cols-1 bg-indigo-600'>
                <div className='place-self-end pr-10'>
                  <button
                    type='button'
                    className='w-lg flex justify-center py-2 px-4 border border-transparent rounded-full shadow-sm bold-intro-sm text-white-200 bg-green-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  >
                    Want to know more?
                  </button>
                </div>
                <div className='title-text-container text-background-shape py-24'>
                  <h1 className='text-center text-indigo-600'>Measure</h1>
                </div>

                <div className='bg-green-600 title-box-info px-40 py-10 mt-10 text-center'>
                  <p className='mt-1 medium-intro-md text-dark-wood-800'>
                    Just tell us basic information about your project and let our impact models
                    simulate long term outcomes of the project. If you have any question don’t
                    hesitate to contact us.
                  </p>
                </div>
              </div>

              <div className='my-10 grid'>
                <div className='max-w-3xl place-self-center text-dark-wood-700 book-intro-md'>
                  <p className='pb-4'>
                    Welcome to TreesAI NbS impact assessment tool! Please fill out the below form to
                    learn more about your project impact. If you are missing and information, you
                    can save the form and update it later.
                  </p>
                  <hr className='border-dark-wood-600' />
                  <p className='pt-4 '>
                    The information with * are mandatory to be able to continue in the process.
                    Clicking on this icon <img className='inline-block w-12 h-12' src={infoImage} />{' '}
                    will show you detailed information.{' '}
                  </p>
                </div>
              </div>
            </div>
            <div className='py-10'>
              <SectionHeader title='General project information' type='general' />
              <FormBlock
                title='Your project’s information'
                description='Please share some general information about your project.'
              >
                <TextInput
                  span='sm:col-span-5'
                  label='project-name'
                  title='Project name'
                  placeholder='Title of the project'
                  type='general'
                  defaultValue={projectName}
                  onChange={(e) => {
                    setProjectName(e.target.value);
                  }}
                />

                <Dropdown
                  span='sm:col-span-3'
                  label='city'
                  title='Project city'
                  type='general'
                  options={cities}
                />

                <div className='sm:col-span-2' />

                <AddressInput
                  span='sm:col-span-3'
                  label='address'
                  title='Project address'
                  placeholder='Street, street number, postal code'
                  type='general'
                />

                <Dropdown
                  span='sm:col-span-2'
                  label='neighbourhood'
                  title='Community Council'
                  type='general'
                  onChange={(e) => {
                    setSelectecCC(e.target.value);
                  }}
                  options={listCouncils}
                />

                <TextInput
                  span='sm:col-span-5'
                  label='project-developer'
                  title='Project developer'
                  placeholder='Name of the institution that is in charge of developing the project'
                  type='general'
                  defaultValue={projectDev}
                  onChange={(e) => {
                    setProjectDev(e.target.value);
                  }}
                />

                <Dropdown
                  span='sm:col-span-3'
                  label='project-stage'
                  title='Stage of the project *'
                  type='general'
                  onChange={(e) => {
                    setSelectedStage(e.target.value.toLowerCase());
                  }}
                  options={stages}
                />

                <NumberInput
                  span='sm:col-span-3'
                  label='total_area'
                  title='Total area of project'
                  unit='m2'
                  placeholder='200'
                  type='general'
                  defaultValue={totalArea}
                  onChange={(e) => {
                    setTotalArea(e.target.value);
                  }}
                />
              </FormBlock>
              <hr className='mx-20 border-indigo-600 border-8' />
              <FormBlock
                title='Land use and Land history'
                description='How your land was used prior to your intervention is a key determinant of your project future impact. Tell us more.'
              >
                <TextInput
                  span='sm:col-span-5'
                  label='land-owner'
                  title='Land Owner'
                  placeholder='Who owns the land?'
                  type='general'
                  defaultValue={landOwner}
                  onChange={(e) => {
                    setLandOwner(e.target.value);
                  }}
                />

                <Dropdown
                  span='sm:col-span-3'
                  label='land-use'
                  title='Existing land use'
                  type='general'
                  onChange={(e) => {
                    setSelectedLandUse(e.target.value.toLowerCase());
                  }}
                  options={landUse}
                />

                <div className='sm:col-span-3'></div>

                <Toggle
                  checked={landUseChange}
                  span='sm:col-span-2'
                  label='and-use-change'
                  title='Is the land-use going to change?'
                  type='general'
                  onChange={setLandUseChange}
                  firstChoice='No'
                  secondChoice='Yes'
                />
              </FormBlock>
              <hr className='mx-20 border-indigo-600 border-8' />
              <FormBlock
                title='Project description and cover image'
                description='A project impact is not only dependent on numbers, so tell us more about your project story, its location, and who you are working with to make it happen.'
              >
                <div className='sm:col-span-3'>
                  <label
                    htmlFor='project-description'
                    className='book-info-md text-dark-wood-800 pl-5'
                  >
                    Project Description
                  </label>
                  <div className='mt-1'>
                    <textarea
                      id='project-description'
                      name='project-description'
                      rows={3}
                      className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-indigo-600 pb-20 rounded-2xl'
                      defaultValue={projectDescription}
                      onChange={(e) => {
                        setProjectDescription(e.target.value);
                      }}
                    />
                  </div>
                  <p className='mt-2 medium-intro-sm text-gray-500'>
                    There is no word limit, but we suggest you keep this under 250 words to make it
                    more readable by all.
                  </p>
                </div>

                <div className='sm:col-span-3  '>
                  <label htmlFor='cover-photo' className='book-info-md text-dark-wood-800 pl-5'>
                    Cover photo
                  </label>
                  <div className='mt-1 sm:mt-0 sm:col-span-2'>
                    <div className='max-w-lg flex justify-center px-6 pt-5 pb-6 border border-indigo-600  rounded-full'>
                      <div className='space-y-1 text-center'>
                        <svg
                          className='mx-auto h-12 w-12 text-gray-400'
                          stroke='currentColor'
                          fill='none'
                          viewBox='0 0 48 48'
                          aria-hidden='true'
                        >
                          <path
                            d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
                            strokeWidth={2}
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          />
                        </svg>
                        <div className='flex book-info-md text-dark-wood-800'>
                          <label
                            htmlFor='file-upload'
                            className='relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500'
                          >
                            <span>Upload a file</span>
                            <input
                              id='file-upload'
                              name='file-upload'
                              type='file'
                              className='sr-only'
                            />
                          </label>
                          <p className='pl-1'>or drag and drop</p>
                        </div>
                        <p className='book-info-sm text-dark-wood-800'>PNG, JPG, GIF up to 10MB</p>
                      </div>
                    </div>
                  </div>
                </div>
              </FormBlock>
              <hr className='mx-20 border-indigo-600 border-8' />
              <FormBlock
                title='Date and timing'
                description='We would like to know the duration of the project and expected start date.'
              >
                <div className='sm:col-span-3'>
                  <label htmlFor='start-date' className='book-info-md text-dark-wood-800 pl-5'>
                    Start date MM.YYYY
                  </label>
                  <div className='mt-1'>
                    <input
                      id='start-date'
                      name='start-date'
                      type='month'
                      defaultValue='2022-09'
                      className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-indigo-600 rounded-2xl'
                    />
                  </div>
                </div>

                <NumberInput
                  span='sm:col-span-3'
                  label='project-length'
                  title='Expected length of project'
                  placeholder='12'
                  type='general'
                  unit='months'
                  defaultValue={projectLength}
                  onChange={(e) => {
                    setProjectLength(e.target.value);
                  }}
                />
              </FormBlock>
            </div>
            <div className='py-10'>
              <SectionHeader title='Project layout' type='typology' />
              <FormBlock
                title='Select the typologies of green infrastructure developed by your project'
                description='We know that projects can be made up of multiple types of green infrastructure. Please, select the typologies that you will develop in your project. At the moment we only provide trees project, but soon you will be able to add new typologies as SUDS and others. '
                type='typology'
              >
                <div className='sm:hidden'>
                  <label htmlFor='typology-type' className='sr-only'>
                    Select a tab
                  </label>
                  <select
                    id='typology-type'
                    name='typology-type'
                    className='block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md'
                    defaultValue={typologyTabs.find((tab) => tab.current).name}
                  >
                    {typologyTabs.map((tab) => (
                      <option key={tab.name}>{tab.name}</option>
                    ))}
                  </select>
                </div>
                <div className='hidden sm:block col-span-4 justify-self-center'>
                  <nav className='flex space-x-4' aria-label='Tabs'>
                    {typologyTabs.map((tab) => (
                      <button
                        key={tab.name}
                        className={classNames(
                          tab.current
                            ? 'bg-green-600 text-white'
                            : 'text-dark-wood-500 pointer-events-none bg-white-300',
                          'px-4 py-4 rounded-full bold-intro-md',
                        )}
                        aria-current={tab.current ? 'page' : undefined}
                      >
                        {tab.name}
                      </button>
                    ))}
                  </nav>
                </div>
                <div className='col-span-5'>
                  <RadioGroup value={selectedTypology} onChange={setSelectedTypology}>
                    <div className='mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4'>
                      {typologies.map((typology) => (
                        <RadioGroup.Option
                          key={typology.id}
                          value={typology}
                          className={({ checked, active }) =>
                            classNames(
                              checked ? 'border-transparent' : 'border-dark-wood-500',
                              active ? 'border-green-600 ring-2 ring-green-600' : '',
                              'relative bg-white border rounded-3xl p-4 flex cursor-pointer focus:outline-none',
                            )
                          }
                        >
                          {({ checked, active }) => (
                            <>
                              <span className='flex-1 flex'>
                                <img src={typology.image} />
                                <span className='flex flex-col'>
                                  <RadioGroup.Label
                                    as='span'
                                    className='block bold-intro-sm text-dark-wood-600 uppercase border-b border-dark-wood-800 pb-2'
                                  >
                                    {typology.title}
                                  </RadioGroup.Label>
                                  <RadioGroup.Description
                                    as='span'
                                    className='mt-1 flex items-center book-info-sm text-dark-wood-600 pt-2 pl-2'
                                  >
                                    {typology.description}
                                  </RadioGroup.Description>
                                </span>
                              </span>
                              <CheckCircleIcon
                                className={classNames(
                                  !checked ? 'invisible' : '',
                                  'h-5 w-5 text-green-600',
                                )}
                                aria-hidden='true'
                              />
                              <span
                                className={classNames(
                                  active ? 'border' : 'border-2',
                                  checked ? 'border-green-600' : 'border-transparent',
                                  'absolute -inset-px rounded-3xl pointer-events-none',
                                )}
                                aria-hidden='true'
                              />
                            </>
                          )}
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
              </FormBlock>
              <hr className='mx-20 border-green-600 border-8' />
              <FormBlock
                title='What activities are you running on this typology?'
                description='Developing (if this typology is a new intervention)- Maintaining (if this typology already existed and we will maintain it)- Other (if you are running an different activity from the above)'
                type='typology'
              >
                <RadioSelector
                  span='sm:col-span-5'
                  label='activity-type'
                  title='Predominant activity type'
                  type='typology'
                  setRadioType={setActivityType}
                  radioType={activityType}
                  radioTypes={activityTypes}
                />
              </FormBlock>
              <hr className='mx-20 border-green-600 border-8' />
              <FormBlock
                title='Define your typology area'
                description={`Your project is ${totalArea} m2. What is the area occupied by the ${selectedTypology.title} typology?`}
                type='typology'
              >
                <NumberInput
                  span='sm:col-span-3'
                  label='area-density'
                  title='The effective area used by typology'
                  unit='Ha'
                  placeholder=''
                  type='typology'
                  defaultValue={areaDensity}
                  onChange={(e) => {
                    setAreaDensity(e.target.value);
                  }}
                />
              </FormBlock>
              <hr className='mx-20 border-green-600 border-8' />
              <FormBlock
                title='How many trees does your site contain? '
                description='We would like to know the numbers of trees your project will work on. Please insert total number of trees, both new and the one that will be maintained.'
                type='typology'
              >
                <NumberInput
                  span='sm:col-span-3'
                  label='new-trees'
                  title='Number of new trees to be planted'
                  placeholder='100'
                  type='typology'
                  unit='trees'
                  defaultValue={treeNumber}
                  onChange={(e) => {
                    setTreeNumber(e.target.value);
                  }}
                />

                <NumberInput
                  span='sm:col-span-3'
                  label='existing-trees'
                  unit='trees'
                  title='Number of existing trees to be maintained'
                  placeholder='100'
                  type='typology'
                />
              </FormBlock>
            </div>
            <div className='py-10'>
              <SectionHeader title='Project costs' type='cost' />
              <FormBlock
                title='Project budgeting'
                description='TreesAI can help you in investing in your project. More you give us details and more we would be able to understand your needs.'
                type='cost'
              >
                <RadioSelector
                  span='sm:col-span-5'
                  label='project-budget'
                  title='What is your project budget?'
                  type='cost'
                  setRadioType={setBudetType}
                  radioType={budgetType}
                  radioTypes={budgetTypes}
                />

                <RadioSelector
                  span='sm:col-span-5'
                  label='money-raised'
                  title='How much money have you raised so far?'
                  type='cost'
                  setRadioType={setRaisedType}
                  radioType={raisedType}
                  radioTypes={raisedTypes}
                />
              </FormBlock>
              <hr className='mx-20 border-indigo-600 border-8' />
              <FormBlock
                title='Project initial and ongoing costs'
                description='Please tell us more about your project costs across its lifetime.  Capital expenditure refers to the initial costs or developing the project and operational expenditure to the costs of maintaining it.'
                type='cost'
              >
                <NumberInput
                  span='sm:col-span-3'
                  label='capex'
                  title='Total capital expenditure  '
                  placeholder='£200'
                  unit='£'
                  type='cost'
                />
                <NumberInput
                  span='sm:col-span-3'
                  label='opex'
                  title='Total operational expenditure'
                  placeholder='£200'
                  unit='£'
                  type='cost'
                />
              </FormBlock>
            </div>

            <div className='py-10'>
              <SectionHeader title='More information' type='info' />
              <FormBlock
                title='Would you like to add more information? '
                description='If you share more information about your project specifications (such as your planning application, bills of quantity or any other design packages) your measurements will be more accurate.'
                type='cost'
              >
                <TextInput
                  span='sm:col-span-3'
                  label='file-upload'
                  title='Upload file'
                  placeholder='filename'
                  type='additional'
                />
                <div className='sm:col-span-2' />

                <TextInput
                  span='sm:col-span-3'
                  label='neighbourhood'
                  title='Add link 1'
                  placeholder='www.projectsite.com'
                  type='additional'
                />
                <TextInput
                  span='sm:col-span-3'
                  label='neighbourhood'
                  title='Add link 2'
                  placeholder='www.projectsite.com'
                  type='additional'
                />
              </FormBlock>
            </div>

            <div className='grid pb-20'>
              <div className='py-4 max-w-3xl place-self-center text-center'>
                <h3 className=''>
                  Thanks for your patience and for filling out all these information! Click
                  &quot;Run Impact&quot; to view your project impact assessment. If you need to add
                  more information you can always save and come back later. You can find back your
                  project on your profile page.
                </h3>
              </div>
              <div className='place-self-center pt-4'>
                <button
                  type='button'
                  disabled={isLoading}
                  className='inline-flex justify-center py-2 px-8 border border-transparent shadow-sm bold-intro-sm rounded-full text-white-200 bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  onClick={getProjectID}
                >
                  Run Impact
                </button>
                <button
                  type='button'
                  className='ml-10 bg-dark-wood-800 py-2 px-8 border border-gray-300 rounded-full shadow-sm bold-intro-sm text-white-200 hover:bg-dark-wood-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                >
                  Save for later
                </button>
              </div>
            </div>
          </div>
        ))}
      {processStage === 2 && (
        <div className='mx-10 sm:px-6 lg:px-8'>
          <div className='title-box py-20 mt-4 bg-dark-wood-800'>
            <h2 className='text-white-200 text-center'>
              Draft page for your Scenario Analysis result
            </h2>
            <h2 className='text-white-200 text-center pt-10'>{projectName}</h2>
          </div>
          <div className='my-10 grid'>
            <div className='max-w-3xl place-self-center text-dark-wood-700 '>
              <p className='pb-4 book-intro-lg'>
                Thank you for your patience, the analysis was successful.
              </p>
              <hr className='border-dark-wood-600' />
              <p className='pt-4 book-intro-md'>
                Below you can check the impact of your project, edit parts and run new simulations
                if needed!
              </p>
            </div>
          </div>

          <SectionHeader title='Overview' type='typology' />
          <div className='bg-white-200 py-10 rounded-3xl border border-green-600 grid grid-cols-1 sm:grid-cols-4 mb-20 '>
            <div className='px-8 border-r border-green-600'>
              <div className='flex justify-center items-center'>
                <img
                  src={projectImg}
                  alt='project image'
                  className='w-36 h-36 rounded-full border-8 border-green-600'
                />
              </div>
              <p className='pt-10 bold-intro-sm para-break'>{projectDescription}</p>
              <div className='mt-8 flex flex-col'>
                <div className='-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8'>
                  <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
                    <div className='overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-2xl'>
                      <div className='bg-green-600 py-4 pl-4'>
                        <span className='text-left medium-intro-sm text-white-200 uppercase'>
                          Project information
                        </span>
                      </div>
                      <table className='min-w-full divide-y divide-white-200'>
                        <tbody className='divide-y divide-white-200 bg-green-300'>
                          <tr>
                            <td className='whitespace-nowrap py-4 pl-4 pr-3 book-info-sm text-dark-wood-800 sm:pl-6'>
                              Project developer:
                            </td>
                            <td className='whitespace-nowrap px-3 py-4 book-info-sm text-green-600'>
                              {projectDev}
                            </td>
                          </tr>
                          <tr>
                            <td className='whitespace-nowrap py-4 pl-4 pr-3 book-info-sm text-dark-wood-800 sm:pl-6'>
                              Typology:
                            </td>
                            <td className='whitespace-nowrap px-3 py-4 book-info-sm text-green-600'>
                              {selectedTypology.title}
                            </td>
                          </tr>
                          <tr>
                            <td className='whitespace-nowrap py-4 pl-4 pr-3 book-info-sm text-dark-wood-800 sm:pl-6'>
                              Number of trees planted:
                            </td>
                            <td className='whitespace-nowrap px-3 py-4 book-info-sm text-green-600'>
                              {treeNumber}
                            </td>
                          </tr>
                          <tr>
                            <td className='whitespace-nowrap py-4 pl-4 pr-3 book-info-sm text-dark-wood-800 sm:pl-6'>
                              Number of trees maintained:
                            </td>
                            <td className='whitespace-nowrap px-3 py-4 book-info-sm text-green-600'>
                              {treeNumber}
                            </td>
                          </tr>
                          <tr>
                            <td className='whitespace-nowrap py-4 pl-4 pr-3 book-info-sm text-dark-wood-800 sm:pl-6'>
                              Project stage:
                            </td>
                            <td className='whitespace-nowrap px-3 py-4 book-info-sm text-green-600'>
                              {selectedStage}
                            </td>
                          </tr>
                          <tr>
                            <td className='whitespace-nowrap py-4 pl-4 pr-3 book-info-sm text-dark-wood-800 sm:pl-6'>
                              Project status:
                            </td>
                            <td className='whitespace-nowrap px-3 py-4 book-info-sm text-green-600'>
                              To be reviewed
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='px-8 border-r border-green-600'>
              <h3 className='text-dark-wood-800'>Project impact for 50 years</h3>
              <p className='book-info-sm text-dark-wood-800 pt-4'>
                Considering the combination of your project typology, activity, location, and other
                factors, you could help achieve the following estimated potential impact:
              </p>
              <div className='my-10 flex justify-center items-center flex-col'>
                <span className='rounded-full bg-green-600 text-white bold-intro-sm px-4 py-11'>
                  {Math.round(avg_rel * 100 + Number.EPSILON) / 100} tCO2
                </span>
                <span className='pt-2 bold-intro-sm text-green-600'>Average Carbon Release</span>
              </div>

              <div className='my-10 flex justify-center items-center flex-col'>
                <span className='rounded-full bg-green-600 text-white bold-intro-sm px-4 py-11'>
                  {Math.round(avg_seq * 100 + Number.EPSILON) / 100} tCO2
                </span>
                <span className='pt-2 bold-intro-sm text-green-600'>
                  Average Carbon Sequestration
                </span>
              </div>
            </div>
            <div className='px-8 sm:col-span-2'>
              <h3 className='text-dark-wood-800'>Project Cost</h3>
              <p className='book-info-sm text-dark-wood-800 pt-4'>
                Considering the combination of your project typology, activity, location, and other
                factors, you could help achieve the following estimated potential impact:
              </p>
              <p className='text-green-600'>Total cost for 50 years (GBP per m2)</p>
              <p>
                Low: £
                {Math.round(
                  ((treeNumber / areaDensity) * selectedTypology.costLow) / 10000,
                ).toFixed(2)}
              </p>
              <p>
                Medium: £
                {Math.round(
                  ((treeNumber / areaDensity) * selectedTypology.costMed) / 10000,
                ).toFixed(2)}
              </p>
              <p className='pb-5'>
                High: £
                {Math.round(
                  ((treeNumber / areaDensity) * selectedTypology.costHigh) / 10000,
                ).toFixed(2)}
              </p>
              <p className='text-green-600'>Total Project Cost over 50 years</p>
              <p>
                Low: £
                {Math.round(
                  (((treeNumber / areaDensity) * selectedTypology.costLow) / 10000) * totalArea,
                ).toFixed(2)}
              </p>
              <p>
                Medium: £
                {Math.round(
                  (((treeNumber / areaDensity) * selectedTypology.costMed) / 10000) * totalArea,
                ).toFixed(2)}
              </p>
              <p className='pb-5'>
                High: £
                {Math.round(
                  (((treeNumber / areaDensity) * selectedTypology.costHigh) / 10000) * totalArea,
                ).toFixed(2)}
              </p>

              <h3 className='text-dark-wood-800 pt-5 border-t border-green-600'>
                Risk to be addressed
              </h3>
              <p className='book-info-sm text-dark-wood-800 pt-4'>
                The impact of your project is highly dependent on its specific location within the
                city. Here you can find the environmental and socio-economic risks that climate
                change poses to the area of your project:
              </p>
              <LocationRiskChart cc_name={selectedCC} />
            </div>
          </div>

          <SectionHeader title='In details' type='details' />
          <ResultBlock
            title='Project Impact'
            description='Output of Scenario Analysis Framework. Considering  the combination of typology, activity, location, and other factors calculated via an agent-based scenario analysis framework (i) across 50 years, your project could help achieve the following estimated potential impact:'
            type='impact'
          />
          <hr className='mx-20 border-indigo-600 border-8' />
          <ResultBlock
            title='Explore - CARBON'
            description='Little intro in the topic of carbon? How to look into this data? What are the highlights? '
            type='impact'
          >
            <div className='grid grid-cols-1 md:grid-cols-1  lg:grid-cols-2 gap-x-8 gap-y-10'>
              <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 my-10'>
                <div className=' rounded-3xl border border-indigo-600 px-10 text-center'>
                  <h3 className='text-indigo-600 py-5'>Carbon Release</h3>
                  <div className='my-10'>
                    <span className='rounded-full bg-indigo-600 text-white bold-intro-sm px-4 py-11'>
                      {Math.round(avg_rel * 100 + Number.EPSILON) / 100} tCO2
                    </span>
                  </div>
                  <p className='pt-10 text-left book-info-sm text-indigo-600'>
                    By reducing energy demand and absorbing carbon dioxide, trees and vegetation
                    decrease the production and negative effects of air pollution and greenhouse gas
                    emissions.
                  </p>
                </div>
                <div className='rounded-3xl border border-indigo-600 col-span-2 px-10 pt-5'>
                  <ChartSingleLine
                    data={[
                      {
                        id: 'Average Carbon Release',
                        data: avg_rel_array,
                      },
                    ]}
                  />
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 my-10'>
                <div className='rounded-3xl border border-indigo-600 px-10 text-center'>
                  <h3 className='text-indigo-600 py-5'>Carbon Sequestration</h3>
                  <div className='my-10'>
                    <span className='rounded-full bg-indigo-600 text-white bold-intro-sm px-4 py-11'>
                      {Math.round(avg_seq * 100 + Number.EPSILON) / 100} tCO2
                    </span>
                  </div>
                  <p className='pt-10 text-left book-info-sm text-indigo-600'>
                    By reducing energy demand and absorbing carbon dioxide, trees and vegetation
                    decrease the production and negative effects of air pollution and greenhouse gas
                    emissions.
                  </p>
                </div>
                <div className='rounded-3xl border border-indigo-600 col-span-2 px-10 pt-5'>
                  <ChartSingleLine
                    data={[
                      {
                        id: 'Average Carbon Sequesteration',
                        data: avg_seq_array,
                      },
                    ]}
                  />
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 my-10'>
                <div className='rounded-3xl border border-indigo-600 px-10 text-center'>
                  <h3 className='text-indigo-600 py-5'>Tree health plot</h3>
                  <div className='my-10'>
                    <span className='rounded-full bg-indigo-600 text-white bold-intro-sm px-4 py-11'>
                      {Math.round(alive * 100 + Number.EPSILON) / 100} years
                    </span>
                  </div>
                  <p className='pt-10 text-left book-info-sm text-indigo-600'>
                    By reducing energy demand and absorbing carbon dioxide, trees and vegetation
                    decrease the production and negative effects of air pollution and greenhouse gas
                    emissions.
                  </p>
                </div>
                <div className='rounded-3xl border border-indigo-600 col-span-2 px-10 pt-5'>
                  <BarCanvas data={alive_array} />
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 my-10'>
                <div className='rounded-3xl border border-indigo-600 px-10 text-center'>
                  <h3 className='text-indigo-600 py-5'>Comparative Analysis</h3>

                  <p className='pt-10 text-left book-info-sm text-indigo-600'>
                    By reducing energy demand and absorbing carbon dioxide, trees and vegetation
                    decrease the production and negative effects of air pollution and greenhouse gas
                    emissions.
                  </p>
                </div>
                <div className='rounded-3xl border border-indigo-600 col-span-2 px-10 pt-5'>
                  <ChartMultiLine data={cumulative_array} />
                </div>
              </div>
            </div>
          </ResultBlock>

          <div className='h-10' />

          <ResultBlock
            title='Project Costs*'
            description='The tables will give you an estimate of the cost in 50 years. *this is a project cost estimate which does not include any commercial mark-ups. These costs only reflect the direct infrastructure cost of your NbS project.'
            type='impact'
          />
          <hr className='mx-20 border-indigo-600 border-8' />

          <div className='grid pb-20 pt-10'>
            <div className='py-4 max-w-3xl place-self-center text-center'>
              <h3 className=''>
                You can now publish your project and view it in the ATLAS. Or you can save it for
                later and check the project on your profile page.
              </h3>
            </div>
            <div className='place-self-center pt-4'>
              <button
                type='button'
                className='inline-flex justify-center py-2 px-8 border border-transparent shadow-sm bold-intro-sm rounded-full text-white-200 bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              >
                Publish
              </button>
              <button
                type='button'
                className='ml-10 bg-dark-wood-800 py-2 px-8 border border-gray-300 rounded-full shadow-sm bold-intro-sm text-white-200 hover:bg-dark-wood-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              >
                Save for later
              </button>

              <button
                type='button'
                onClick={() => {
                  setProcessStage(1);
                }}
                className='ml-10 bg-dark-wood-800 py-2 px-8 border border-gray-300 rounded-full shadow-sm bold-intro-sm text-white-200 hover:bg-dark-wood-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              >
                Edit/add project info
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
      <Toaster position='top-right' />
    </div>
  );
}

SubmitProject.propTypes = {
  loggedIn: PropTypes.bool,
};
