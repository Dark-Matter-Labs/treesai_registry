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
import FormHeader from '../components/form/FormHeader';
import FormBlock from '../components/form/FormBlock';
import TextInput from '../components/form/TextInput';
import NumberInput from '../components/form/NumberInput';
import Dropdown from '../components/form/Dropdown';
import Toggle from '../components/form/Toggle';
import RadioSelector from '../components/form/RadioSelector';
// Images
import projectImg from '../images/project-default.png';
import tempImg from '../images/temp-map.png';
import infoImage from '../images/info_eye.svg';
// Charts
import ChartMultiLine from '../components/charts/ChartMultiLine';
import ChartSingleLine from '../components/charts/ChartSingleLine';
import BarCanvas from '../components/charts/BarCanvas';

import { saf_data } from '../utils/saf_data_model';
import { get_typologies, get_maintenance_scopes } from '../utils/saf_utils';
import {
  get_typologies_types,
  get_stages,
  get_land_use,
  get_activity_types,
  get_budget_types,
  get_raised_types,
} from '../utils/project_details';

import { getCouncils } from '../utils/geojson_utils';

const listCouncils = getCouncils();

const typologies = get_typologies();
const maintenanceTypes = get_maintenance_scopes();

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
  const [selectedStage, setSelectedStage] = useState('potential');
  const [selectedLandUse, setSelectedLandUse] = useState('Recreation');
  const [selectedTypology, setSelectedTypology] = useState(typologies[0]);
  const [areaDensity, setAreaDensity] = useState(1);
  const [activityType, setActivityType] = useState(activityTypes[0]);
  const [maintenanceType, setMaintenanceType] = useState(maintenanceTypes[0]);
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

    const payload = JSON.stringify({
      name: projectName,
      description: projectDescription,
      typology: selectedTypology.value,
      min_dbh: parseInt(selectedTypology.minDBH),
      max_dbh: parseInt(selectedTypology.maxDBH),
      maintenance_scope: maintenanceType.value,
      season_growth_mean: 200,
      season_growth_var: 7,
      time_horizon: 50,
      density_per_ha: parseInt(treeNumber / areaDensity),
      species: selectedTypology.species,
    });

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
                <div className='title-text-container text-background-shape py-20'>
                  <h1 className='text-center text-indigo-600'>
                    Run Impact <br />
                    Explorer
                  </h1>
                </div>

                <div className='bg-green-600 title-box-info p-10 mt-10 text-center'>
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
                    We will ask you to fill in all info that we need to generate your scenario
                    analysis. You can save them and change them any time.
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
              <FormHeader title='General Project Information' type='general' />
              <FormBlock
                title='Your project’s information'
                description='Insert the name of the Project, insert address, neighbourhood and/or postcode of project location.'
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

                <TextInput
                  span='sm:col-span-3'
                  label='city'
                  title='Project city'
                  placeholder='City and country'
                  type='general'
                />

                <div className='sm:col-span-2' />

                <TextInput
                  span='sm:col-span-3'
                  label='address'
                  title='Project address'
                  placeholder='Street, street number, postal code'
                  type='general'
                />

                <Dropdown
                  span='sm:col-span-2'
                  label='neighbourhood'
                  title='Neighbourhood'
                  placeholder='Sighthill'
                  type='general'
                  onChange={(e) => {
                    setSelectedStage(e.target.value.toLowerCase());
                  }}
                  options={listCouncils}
                />

                <TextInput
                  span='sm:col-span-5'
                  label='project-developer'
                  title='Project Developer'
                  placeholder='Name of institution'
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
                  title='Total area of project in m2'
                  placeholder='200'
                  type='general'
                />
              </FormBlock>
              <hr className='mx-20 border-indigo-600 border-8' />
              <FormBlock
                title='Land use and Land history'
                description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.'
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
                description='Quick summary of what the project will deliver, where and the involved partners. Images can give us a better understanding of the project for different purpouses: understadn story and trace the developments.
          Upload jpg./png. that can represent the projet such as a render or a site plan.'
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
                    Describe your project here within 300 words
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
                description='We would like to know the duration of the project and expected planting season. Input month and year'
              >
                <div className='sm:col-span-3'>
                  <label htmlFor='start-date' className='book-info-md text-dark-wood-800 pl-5'>
                    Start date
                  </label>
                  <div className='mt-1'>
                    <input
                      id='start-date'
                      name='start-date'
                      type='date'
                      placeholder='Start date'
                      className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-indigo-600 rounded-2xl'
                    />
                  </div>
                </div>

                <NumberInput
                  span='sm:col-span-3'
                  label='project-length'
                  title='Expected length of project in months'
                  placeholder='12'
                  type='general'
                  defaultValue={projectLength}
                  onChange={(e) => {
                    setProjectLength(e.target.value);
                  }}
                />
              </FormBlock>
            </div>
            <div className='py-10'>
              <FormHeader title='Typology Based Information' type='typology' />
              <FormBlock
                title='Define the Green Infrastructure Typology'
                description='Select the typology of project your would like to develop. At the moment we only provide trees project, but in the near future we will add new typologies as SUDS and others. '
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
                title='Define your typology area'
                description='Define in Ha your project area'
                type='typology'
              >
                <NumberInput
                  span='sm:col-span-3'
                  label='area-density'
                  title='The effective area used by typology in Ha'
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
                  defaultValue={treeNumber}
                  onChange={(e) => {
                    setTreeNumber(e.target.value);
                  }}
                />

                <NumberInput
                  span='sm:col-span-3'
                  label='existing-trees'
                  title='Number of existing trees to be maintained'
                  placeholder='100'
                  type='typology'
                />
              </FormBlock>
              <hr className='mx-20 border-green-600 border-8' />
              <FormBlock
                title='What are your activities?'
                description='In your project you will work specifically on certain activites. We would like to ask you to choose the main one among the many. Mantainance can be low, medium or high.'
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

                <RadioSelector
                  span='sm:col-span-5'
                  label='maintenance-type'
                  title='Maintenance type'
                  type='typology'
                  setRadioType={setMaintenanceType}
                  radioType={maintenanceType}
                  radioTypes={maintenanceTypes}
                />
              </FormBlock>
            </div>
            <div className='py-10'>
              <FormHeader title='Cost of the project' type='cost' />
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
                title='Project CAPEX and OPEX'
                description='Here you can add some more precise information, they can be difficult to define and don’t worry if you don’t have them.'
                type='cost'
              >
                <NumberInput
                  span='sm:col-span-3'
                  label='opex'
                  title='Total operational expenditure'
                  placeholder='£200'
                  type='cost'
                />
                <NumberInput
                  span='sm:col-span-3'
                  label='capex'
                  title='Total capital expenditure  '
                  placeholder='£200'
                  type='cost'
                />
              </FormBlock>
            </div>

            <div className='py-10'>
              <FormHeader title='Additional information' type='info' />
              <FormBlock
                title='Can you share the planning application?'
                description='In this form we asked you the minimum of information required to be able to define if a project can be. '
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
                  Thanks for your patience and for all the information you have filled in. Now you
                  can run the Impact or if you need to add more information you can also save for
                  later and check your project on your profile page.{' '}
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
        <div className='max-w-7xl mx-auto sm:px-6 lg:px-8'>
          <div className='pt-10 pb-5 text-center'>
            <h2 className='text-green-600'>Your Scenario Analysis result</h2>
            <p className='text-xl font-medium py-5'>
              Thank you for your patience, the analysis was successful. Below you can see your data.
              They are also saved on your project page.
            </p>
          </div>
          <div className='shadow-sm rounded-md text-center bg-white'>
            <h3 className='text-green-600 pt-5'>Your project information</h3>
            <hr className='border-b-1 border-green-600 my-5 mx-10' />
            <div className='grid grid-cols-3 gap-y-6 gap-x-8 py-10'>
              <div className='px-5'>
                <img
                  src={projectImg}
                  alt='project image'
                  className='w-42 h-42 rounded-full border-8 border-green-600'
                />
              </div>
              <div>
                <h4 className='text-xl font-bold tracking-tight text-green-600'>{projectName}</h4>
                <p className='text-left pt-5'>{projectDescription}</p>
              </div>
              <div className='pt-10 text-left'>
                <span>
                  Project developer:
                  <br />
                </span>
                <span className='font-bold'>
                  {projectDev}
                  <br />
                </span>

                <span>
                  Location: <br />
                </span>
                <span className='font-bold'>Jeffrey street, 13 Glasgow city</span>
              </div>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-y-6 gap-x-8 text-left my-5'>
            <div className='shadow-sm rounded-md bg-white px-10'>
              <h4 className='text-xl font-bold tracking-tight text-green-600 py-5'>
                Project data overview
              </h4>
              <div className='grid grid-cols-2 gap-y-6 gap-x-8 py-5'>
                <div>
                  <span>
                    Overall time to develope the project: <br />
                  </span>
                  <span className='text-xl font-bold tracking-tight text-green-600'>
                    20 months
                    <br />
                  </span>

                  <span>
                    Total Carbon Sequestration Average: <br />
                  </span>
                  <span className='text-xl font-bold tracking-tight text-green-600'>
                    {avg_seq} tCO2
                    <br />
                  </span>

                  <span>
                    Total tree Species composition: <br />
                  </span>
                  <span className='text-xl font-bold tracking-tight text-green-600'>
                    Evergreen 30%
                    <br /> Deciduous Trees 70%
                    <br />
                  </span>
                </div>

                <div>
                  <span>
                    Total Number of planned trees: <br />
                  </span>
                  <span className='text-xl font-bold tracking-tight text-green-600'>
                    {treeNumber}
                    <br />
                  </span>

                  <span>
                    Total Area density: <br />
                  </span>
                  <span className='text-xl font-bold tracking-tight text-green-600'>
                    {areaDensity} Ha
                    <br />
                  </span>

                  <span>
                    Overview of planned Activities: <br />
                  </span>
                  <span className='text-xl font-bold tracking-tight text-green-600'>
                    Planting, Maintaining
                    <br />
                  </span>
                </div>
              </div>
            </div>
            <div>
              <img src={tempImg} alt='temp image' className='w-full h-full' />
            </div>
          </div>

          <h3 className='text-green-600 my-5 text-center'>Project impact results</h3>

          <div className='grid grid-cols-2 gap-y-6 gap-x-0 mx-10 my-10'>
            <div className='shadow-sm rounded-md bg-white px-10 text-center'>
              <h4 className='text-xl font-bold tracking-tight text-green-600 py-5'>
                Average Carbon Release
              </h4>
              <div className='my-10'>
                <span className='rounded-full bg-green-600 text-white font-bold p-10'>
                  {Math.round(avg_rel * 100 + Number.EPSILON) / 100} tCO2
                </span>
              </div>
              <p className='pt-10 text-left'>
                By reducing energy demand and absorbing carbon dioxide, trees and vegetation
                decrease the production and negative effects of air pollution and greenhouse gas
                emissions.
              </p>
            </div>
            <div className=''>
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

          <div className='grid grid-cols-2 gap-y-6 gap-x-0 mx-10 my-10'>
            <div>
              <ChartSingleLine
                data={[
                  {
                    id: 'Average Carbon Sequesteration',
                    data: avg_seq_array,
                  },
                ]}
              />
            </div>
            <div className='shadow-sm rounded-md bg-white ml-5 pl-20 text-center'>
              <h4 className='text-xl font-bold tracking-tight text-green-600 py-5'>
                Average Carbon Sequestration
              </h4>
              <div className='my-10'>
                <span className='rounded-full bg-green-600 text-white font-bold p-10'>
                  {Math.round(avg_seq * 100 + Number.EPSILON) / 100} tCO2
                </span>
              </div>
              <p className='pt-10 text-left'>
                By reducing energy demand and absorbing carbon dioxide, trees and vegetation
                decrease the production and negative effects of air pollution and greenhouse gas
                emissions.
              </p>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-y-6 gap-x-0 mx-10 my-10'>
            <div className='shadow-sm rounded-md bg-white px-10 text-center'>
              <h4 className='text-xl font-bold tracking-tight text-green-600 py-5'>
                Tree health plot
              </h4>
              <div className='my-10'>
                <span className='rounded-full bg-green-600 text-white p-10'>
                  {Math.round(alive * 100 + Number.EPSILON) / 100} years
                </span>
              </div>
              <p className='pt-10 text-left'>
                By reducing energy demand and absorbing carbon dioxide, trees and vegetation
                decrease the production and negative effects of air pollution and greenhouse gas
                emissions.
              </p>
            </div>
            <BarCanvas data={alive_array} />
          </div>

          <div className='shadow-sm rounded-md bg-white text-center my-10 mx-40'>
            <h4 className='text-xl font-bold tracking-tight text-green-600 py-5'>
              Tree health plot
            </h4>
            <ChartMultiLine data={cumulative_array} />
          </div>
          <div className='text-center py-20'>
            <button
              type='button'
              className='ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
              Go to project page
            </button>
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
