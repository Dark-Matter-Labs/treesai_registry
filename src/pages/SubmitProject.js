import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { RadioGroup } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/solid';
import { useNavigate, Link } from 'react-router-dom';
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
import ValueDisplay from '../components/analysis/ValueDisplay';
import ChartBlock from '../components/analysis/ChartBlock';
// Images
import projectImg from '../images/project-default.png';
// Charts
import ChartMultiLine from '../components/charts/ChartMultiLine';
import LocationRiskChart from '../components/analysis/LocationRisk';
import PieChart from '../components/charts/PieChart';
import BarChart from '../components/charts/BarChart';
import SmallBarChart from '../components/charts/SmallBarChart';
// utils functions
import fetch from '../utils/fetchWithTimeout';
import { saf_data } from '../utils/saf_data_model';

import { get_typologies, get_maintenance_scopes } from '../utils/saf_utils';
import {
  get_cities,
  get_typologies_types,
  get_stages,
  get_land_use,
  get_activity_types,
  get_budget_types,
  get_raised_types,
  get_piechart_types,
} from '../utils/project_details';

import { getCouncils } from '../utils/geojson_utils';
import CostBox from '../components/CostBox';

// set SAF parameters
const typologies = get_typologies();
const maintenanceTypes = get_maintenance_scopes();

// set project parameters
const cities = get_cities();
const listCouncils = getCouncils();
const typologyTabs = get_typologies_types();
const stages = get_stages();
const landUse = get_land_use();
const activityTypes = get_activity_types();
const budgetTypes = get_budget_types();
const raisedTypes = get_raised_types();
const piechartTypes = get_piechart_types();

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}
export default function SubmitProject(props) {
  const [processStage, setProcessStage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  /* Form variables, to be refactored to react-hook-form */
  const [projectName, setProjectName] = useState('');
  const [projectDev, setProjectDev] = useState('');
  const [projectLocation, setProjectLocation] = useState(null);
  const [landOwner, setLandOwner] = useState('');
  const [landUseChange, setLandUseChange] = useState(false);
  const [projectLength, setProjectLength] = useState(24);
  const [projectDescription, setProjectDescription] = useState('');
  const [projectDate, setProjectDate] = useState('2022-09');
  const [stakeholderEngt, setStakeholderEngt] = useState('');
  const [treeNumber, setTreeNumber] = useState(1);
  const [treeNumberMaintain, setTreeNumberMaintain] = useState(0);
  const [totalTreeNumber, setTotalTreeNumber] = useState(0);
  const [selectedStage, setSelectedStage] = useState(stages[0]);
  const [selectedCC, setSelectedCC] = useState(listCouncils[0]);
  const [selectedLandUse, setSelectedLandUse] = useState('Recreation');
  const [selectedTypology, setSelectedTypology] = useState(typologies[0]);
  const [maintenanceType, setMaintenanceType] = useState(maintenanceTypes[0]);
  const [areaDensity, setAreaDensity] = useState(1);
  const [densityPerHa, setDensityPerHa] = useState(1);
  const [totalArea, setTotalArea] = useState(1);
  const [activityType, setActivityType] = useState(activityTypes[0]);
  const [budgetType, setBudgetType] = useState(budgetTypes[0]);
  const [raisedType, setRaisedType] = useState(raisedTypes[0]);
  const [pieChartShowType, setPieChartShowType] = useState('high maintenance');
  // Cost variables
  const [capexCost, setCapexCost] = useState(200);
  const [opexCost, setOpexCost] = useState(123);
  const [totalCost, settotalCost] = useState(500);
  const [costOverSelectedTime, setCostOverSelectedTime] = useState(321);

  /* SAF Related variables */
  const [safOutput0, setSafOutput0] = useState(saf_data);
  const [safOutput1, setSafOutput1] = useState(saf_data);
  const [safOutput2, setSafOutput2] = useState(saf_data);
  const [totalSeq, setTotalSeq] = useState(0);
  const [totalStorage, setTotalStorage] = useState(0);
  const [comparativeSeq, setComparativeSeq] = useState([]);
  const [comparativeStorage, setComparativeStorage] = useState([]);
  const [oneToFivePie, setOneToFivePie] = useState([]);
  const [sixToTenPie, setSixToTen] = useState([]);
  const [eleventToFiftyPie, setEleventToFiftyPie] = useState([]);

  const [costChart, setCostChart] = useState([]);
  const [smallCostChart, setSmallCostChart] = useState([]);

  const navigate = useNavigate();

  /* Helper functions */
  function makeChartArray(dict) {
    let chartArray = [];
    chartArray = Object.keys(dict).map((key) => ({
      x: Number(key),
      y: dict[key],
    }));
    return chartArray;
  }

  function sumRange(array, start = 0, end = 50) {
    let sum = 0;

    for (let index = start; index < end; index++) {
      sum += array[index];
    }

    return sum;
  }

  function getLastElement(obj) {
    let last = Object.keys(obj)[Object.keys(obj).length - 1];
    return last;
  }

  useEffect(() => {
    if (sessionStorage.getItem('token') === null || sessionStorage.getItem('token') === undefined) {
      toast.error('You must be logged in to submit a project.');
      navigate('/register');
    }
  });

  useEffect(() => {
    let sum = parseInt(treeNumber) + parseInt(treeNumberMaintain);
    if (isNaN(parseInt(sum))) {
      setTotalTreeNumber(0);
    } else {
      setTotalTreeNumber(sum);
    }
  }, [treeNumber, treeNumberMaintain]);

  useEffect(() => {
    /* I don't reallt like this function but we really need to check that AreaDensity is not 0 */
    if (!Number.isInteger(areaDensity) || areaDensity <= 0) {
      setAreaDensity(1);
    }
  }, [areaDensity]);

  useEffect(() => {
    const densPerHa = (totalTreeNumber * 10000) / totalArea; // Multiply by 10000 to transform m2 to Ha
    setDensityPerHa(densPerHa);
  }, [totalTreeNumber, totalArea]);

  useEffect(() => {
    const cost = parseInt(opexCost) + parseInt(capexCost);
    settotalCost(cost);
    setCostOverSelectedTime((cost / (12 * 50)) * projectLength);
    // Render the smaller cost chart
    setSmallCostChart([
      {
        Expenditure: 'CAPEX',
        Value: capexCost,
      },
      { Expenditure: 'OPEX', Value: opexCost },
    ]);
  }, [opexCost, capexCost, projectLength, safOutput0]);

  /* Pie Diagram */

  function makePieOutput(alive, dead, critical, bucket) {
    const pieChartArgs = [
      {
        id: 'healthy',
        label: 'Healthy',
        value: alive[bucket].trees,
        color: '#DDDDDD',
      },
      {
        id: 'Critical',
        label: 'Critical health',
        value: critical[bucket].trees,
        color: '#828784',
      },
      {
        id: 'dead',
        label: 'Dead',
        value: dead[bucket].trees,
        color: '#2F3130',
      },
    ];
    return pieChartArgs;
  }

  function makePieChart(safOutput) {
    // Alive - High
    const oneToFiveAlive = sumRange(safOutput.Alive, 0, 5) / 5;
    const sixToTenAlive = sumRange(safOutput.Alive, 5, 10) / 5;
    const elevenToFiftyAlive = sumRange(safOutput.Alive, 10, 50) / 40;

    const alive_buckets = [
      { years: '1-5', trees: oneToFiveAlive },
      { years: '6-10', trees: sixToTenAlive },
      { years: '11-50', trees: elevenToFiftyAlive },
    ];

    // Dead - High
    const oneToFiveDead = sumRange(safOutput.Dead, 0, 5) / 5;
    const sixToTenDead = sumRange(safOutput.Dead, 5, 10) / 5;
    const elevenToFiftyDead = sumRange(safOutput.Dead, 10, 50) / 40;

    const dead_buckets = [
      { years: '1-5', trees: oneToFiveDead },
      { years: '6-10', trees: sixToTenDead },
      { years: '11-50', trees: elevenToFiftyDead },
    ];

    // Critical - High
    const oneToFiveCritical = sumRange(safOutput.Critical, 0, 5) / 5;
    const sixToTenCritical = sumRange(safOutput.Critical, 5, 10) / 5;
    const elevenToFiftyCritical = sumRange(safOutput.Critical, 10, 50) / 40;

    let critical_buckets = [
      { years: '1-5', trees: oneToFiveCritical },
      { years: '6-10', trees: sixToTenCritical },
      { years: '11-50', trees: elevenToFiftyCritical },
    ];

    setOneToFivePie(makePieOutput(alive_buckets, dead_buckets, critical_buckets, 0));
    setSixToTen(makePieOutput(alive_buckets, dead_buckets, critical_buckets, 1));
    setEleventToFiftyPie(makePieOutput(alive_buckets, dead_buckets, critical_buckets, 2));
  }

  useEffect(() => {
    switch (pieChartShowType) {
      case 'high maintenance':
        makePieChart(safOutput2);
        break;
      case 'medium maintenance':
        makePieChart(safOutput1);
        break;
      case 'low maintenance':
        makePieChart(safOutput0);
        break;
      default:
        toast.error('Something went wrong in the maintenance type');
    }
  }, [pieChartShowType, safOutput2]);

  function processSAFData(dataUserScope) {
    /* SAF Related processing */
    setTotalSeq(sumRange(dataUserScope.Seq, 0, getLastElement(dataUserScope.Seq)));
    setTotalStorage(dataUserScope.Storage[getLastElement(dataUserScope.Storage)]); // last element of the array
  }

  /* Data logic changes on receiving the SAF output */
  useEffect(() => {
    switch (maintenanceType.name) {
      case 'High':
        processSAFData(safOutput2);
        break;
      case 'Medium':
        processSAFData(safOutput1);
        break;
      case 'Low':
        processSAFData(safOutput0);
        break;
      default:
        toast.error('maintenance type not valid');
    }
  }, [safOutput0]);

  function makeComparativeSeqChart() {
    let seq_0 = makeChartArray(safOutput0.Seq);
    let seq_1 = makeChartArray(safOutput1.Seq);
    let seq_2 = makeChartArray(safOutput2.Seq);

    setComparativeSeq([
      {
        id: 'Low maintenance',
        color: 'hsl(135, 70%, 50%)',
        data: seq_0,
      },
      {
        id: 'Medium maintenance',
        color: 'hsl(347, 70%, 50%)',
        data: seq_1,
      },
      {
        id: 'High maintenance',
        color: 'hsl(31, 70%, 50%)',
        data: seq_2,
      },
    ]);
  }

  function makeComparativeStorageChart() {
    let storage_0 = makeChartArray(safOutput0.Storage);
    let storage_1 = makeChartArray(safOutput1.Storage);
    let storage_2 = makeChartArray(safOutput2.Storage);

    setComparativeStorage([
      {
        id: 'Low maintenance',
        color: 'hsl(135, 70%, 50%)',
        data: storage_0,
      },
      {
        id: 'Medium maintenance',
        color: 'hsl(347, 70%, 50%)',
        data: storage_1,
      },
      {
        id: 'High maintenance',
        color: 'hsl(31, 70%, 50%)',
        data: storage_2,
      },
    ]);
  }

  function makeComparativeCostBarChart() {
    const replacement_price = 480;

    let chartObj = [
      {
        years: '0-10',
        'High Maintenance': sumRange(safOutput2.Replaced, 0, 10) * replacement_price,
        'Medium maintenance': sumRange(safOutput1.Replaced, 0, 10) * replacement_price,
        'Low maintenance': sumRange(safOutput0.Replaced, 0, 10) * replacement_price,
      },
      {
        years: '10-20',
        'High Maintenance': sumRange(safOutput2.Replaced, 10, 20) * replacement_price,
        'Medium maintenance': sumRange(safOutput1.Replaced, 10, 20) * replacement_price,
        'Low maintenance': sumRange(safOutput0.Replaced, 10, 20) * replacement_price,
      },
      {
        years: '20-30',
        'High Maintenance': sumRange(safOutput2.Replaced, 20, 30) * replacement_price,
        'Medium maintenance': sumRange(safOutput1.Replaced, 20, 30) * replacement_price,
        'Low maintenance': sumRange(safOutput0.Replaced, 20, 30) * replacement_price,
      },
      {
        years: '30-40',
        'High Maintenance': sumRange(safOutput2.Replaced, 30, 40) * replacement_price,
        'Medium maintenance': sumRange(safOutput1.Replaced, 30, 40) * replacement_price,
        'Low maintenance': sumRange(safOutput0.Replaced, 30, 40) * replacement_price,
      },
      {
        years: '40-50',
        'High Maintenance': sumRange(safOutput2.Replaced, 40, 50) * replacement_price,
        'Medium maintenance': sumRange(safOutput1.Replaced, 40, 50) * replacement_price,
        'Low maintenance': sumRange(safOutput0.Replaced, 40, 50) * replacement_price,
      },
    ];

    setCostChart(chartObj);
  }

  useEffect(() => {
    makeComparativeSeqChart();
    makeComparativeStorageChart();
    makeComparativeCostBarChart();
  }, [safOutput0, safOutput1, safOutput2]);

  const getSAFOutput = async () => {
    let requestHeaders = new Headers();
    requestHeaders.append('accept', 'application/json');
    requestHeaders.append('Content-Type', 'application/json');
    requestHeaders.append('Access-Control-Allow-Origin', '*');
    requestHeaders.append('Authorization', 'Bearer ' + sessionStorage.token);

    let payload;

    if (activityType.name === 'Developing') {
      payload = JSON.stringify({
        title: projectName,
        description: projectDescription,
        typology: selectedTypology.value,
        min_dbh: parseInt(selectedTypology.fixedDBH),
        max_dbh: parseInt(selectedTypology.fixedDBH),
        maintenance_scope: maintenanceType.value,
        season_growth_mean: 200,
        season_growth_var: 7,
        time_horizon: 50,
        density_per_ha: densityPerHa,
        species: selectedTypology.species,
      });
    } else {
      payload = JSON.stringify({
        title: projectName,
        description: projectDescription,
        typology: selectedTypology.value,
        min_dbh: parseInt(selectedTypology.minDBH),
        max_dbh: parseInt(selectedTypology.maxDBH),
        maintenance_scope: maintenanceType.value,
        season_growth_mean: 200,
        season_growth_var: 7,
        time_horizon: 50,
        density_per_ha: densityPerHa,
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
        '/runs',
      requestOptions,
      1000 * 60 * 30, // 30 mins
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
        setSafOutput0(result['0']);
        setSafOutput1(result['1']);
        setSafOutput2(result['2']);

        setIsLoading(false);
        window.scrollTo(0, 0);
        setProcessStage(2);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log('error', error);
      });
  };

  const createProjectAndGetID = async () => {
    if (projectName === '') {
      setProjectName('Sample project title');
    }

    let requestHeaders = new Headers();
    requestHeaders.append('accept', 'application/json');
    requestHeaders.append('Content-Type', 'application/json');
    requestHeaders.append('Access-Control-Allow-Origin', '*');
    requestHeaders.append('Authorization', 'Bearer ' + sessionStorage.token);

    console.log(new Date(projectDate));

    const payload = JSON.stringify({
      title: projectName,
      description: projectDescription,
      in_portfolio: true,
      publish: true,
      project_dev: projectDev,
      owner_id: sessionStorage.user_id,
      activities: 'maintenance',
      area: totalArea,
      cost: 0,
      stage: selectedStage + selectedLandUse + landOwner,
      number_of_trees: totalTreeNumber,
      local_authority: projectDev,
      location: 'string',
      start_date: new Date(projectDate),
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
    <div className='bg-white-300 font-favorit bg-pattern'>
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
          <div className='global-margin'>
            <div className=''>
              <Breadcrumb title='Run Impact Explorer' />
              <div className='title-box mt-4 grid grid-cols-1 bg-indigo-600 pt-8'>
                <div className='place-self-end pr-10'>
                  <button
                    type='button'
                    className='w-lg bold-intro-sm flex justify-center rounded-full border border-transparent bg-green-600 py-2 px-4 text-white-200 shadow-sm hover:bg-green-800'
                  >
                    Want to know more?
                  </button>
                </div>
                <div className='title-text-container text-background-shape py-24'>
                  <h1 className='text-center text-indigo-600'>Develop</h1>
                </div>

                <div className='title-box-info mt-10 bg-green-600 px-40 py-10 text-center'>
                  <p className='book-intro-md mt-1 text-dark-wood-800'>
                    Welcome to TreesAI NbS impact assessment tool
                  </p>
                  <p className='medium-intro-md mt-1 text-dark-wood-800'>
                    If you have any question don’t hesitate to contact us.
                  </p>
                </div>
              </div>

              <div className='my-10 grid'>
                <div className='book-intro-md max-w-3xl place-self-center text-dark-wood-700'>
                  <p className='pb-4'>
                    By filling in this form you’ll be able to forecast costs, model impacts and
                    publish your project on our NbS map.
                  </p>
                  <hr className='border-dark-wood-600' />
                  <p className='pt-4 '>Sections marked * are mandatory.</p>
                </div>
              </div>
            </div>
            <div className='py-10'>
              <SectionHeader title='Project information' type='general' />
              <FormBlock
                title='Project information'
                description='Start by telling us who you are and a bit about your project.'
              >
                <TextInput
                  span='sm:col-span-5'
                  label='project-name'
                  title='Project Name *'
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
                  title='City'
                  type='general'
                  options={cities}
                />

                <div className='sm:col-span-2' />

                <AddressInput
                  span='sm:col-span-3'
                  label='address'
                  title='Project Location *'
                  placeholder='Street, street number, postal code'
                  type='general'
                  defaultValue={projectLocation}
                  onChange={setProjectLocation}
                />

                <Dropdown
                  span='sm:col-span-2'
                  label='neighbourhood'
                  title='Community Council *'
                  type='general'
                  onChange={(e) => {
                    setSelectedCC(e.target.value);
                  }}
                  options={listCouncils}
                />

                <TextInput
                  span='sm:col-span-5'
                  label='project-developer'
                  title='Project Developer *'
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
                  title='Current stage'
                  type='general'
                  onChange={(e) => {
                    setSelectedStage(e.target.value.toLowerCase());
                  }}
                  options={stages}
                />

                <NumberInput
                  span='sm:col-span-3'
                  label='total_area'
                  title='Total area of the project *'
                  unit='m2'
                  placeholder='200'
                  min='0'
                  type='general'
                  defaultValue={totalArea}
                  onChange={(e) => {
                    setTotalArea(e.target.value);
                  }}
                />
              </FormBlock>
              <hr className='mx-20 border-8 border-indigo-600' />
              <FormBlock
                title='Land ownership and use'
                description='Land usage prior to your intervention is a key determinant of a project’s future impact.'
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
                  title='How would you describe the land-use prior to your project?'
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
                  label='land-use-change'
                  title='Is the land-use going to change?'
                  type='general'
                  onChange={setLandUseChange}
                  firstChoice='No'
                  secondChoice='Yes'
                />
              </FormBlock>
              <hr className='mx-20 border-8 border-indigo-600' />
              <FormBlock
                title='Describe your project'
                description='Tell us about your project. Don’t worry about precise typologies or numbers for the moment, just let us know about the project’s location, what you hope to deliver, who you’re working with to make it happen.'
              >
                <div className='sm:col-span-3'>
                  <label
                    htmlFor='project-description'
                    className='book-info-md pl-5 text-dark-wood-800'
                  ></label>
                  <div className='mt-1'>
                    <textarea
                      id='project-description'
                      name='project-description'
                      rows={3}
                      className='block w-full rounded-2xl border border-indigo-600 pb-20 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                      defaultValue={projectDescription}
                      onChange={(e) => {
                        setProjectDescription(e.target.value);
                      }}
                    />
                  </div>
                  <p className='medium-intro-sm mt-2 text-gray-500'>
                    There is no word limit, but for readability’s sake, we suggest you keep the
                    description under 250 words.
                  </p>
                </div>

                <div className='sm:col-span-3  '>
                  <div className='mt-1 sm:col-span-2 sm:mt-5'>
                    <div className='flex max-w-lg justify-center rounded-full border border-indigo-600 px-6 py-10'>
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
                        <div className='book-info-md flex text-dark-wood-800'>
                          <label
                            htmlFor='file-upload'
                            className='relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500'
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
                    <p className='medium-intro-sm mt-2 text-gray-500 pl-20'>Cover photo</p>
                  </div>
                </div>
              </FormBlock>
              <hr className='mx-20 border-8 border-indigo-600' />
              <FormBlock
                title='Dates and timing'
                description='We’d like to know roughly when you plan to start implementing the project, and how long it will take. Please note projects can (and are encouraged) to include maintenance activities.'
              >
                <div className='sm:col-span-3'>
                  <label htmlFor='start-date' className='book-info-md pl-5 text-dark-wood-800'>
                    Expected starting date (MM/YY) *
                  </label>
                  <div className='mt-1'>
                    <input
                      id='start-date'
                      name='start-date'
                      type='month'
                      defaultValue={projectDate}
                      className='block w-full rounded-2xl border-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                      onChange={(e) => {
                        setProjectDate(e.target.value);
                      }}
                    />
                  </div>
                </div>

                <NumberInput
                  span='sm:col-span-3'
                  label='project-length'
                  title='Expected length of the project in months (if possible) *'
                  placeholder='12'
                  type='general'
                  unit='months'
                  min='0'
                  defaultValue={projectLength}
                  onChange={(e) => {
                    setProjectLength(e.target.value);
                  }}
                />
              </FormBlock>
              <hr className='mx-20 border-8 border-indigo-600' />
              <FormBlock
                title='Stakeholder engagement'
                description='Who are the stakeholders affected by the project’s implementation? How were they identified and how are they being engaged?'
              >
                <div className='sm:col-span-6'>
                  <label
                    htmlFor='project-description'
                    className='book-info-md pl-5 text-dark-wood-800'
                  ></label>
                  <div className='mt-1'>
                    <textarea
                      id='stakeholder-engagement'
                      name='stakeholder-engagement'
                      rows={3}
                      className='block w-full rounded-2xl border border-indigo-600 pb-20 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                      defaultValue={stakeholderEngt}
                      onChange={(e) => {
                        setStakeholderEngt(e.target.value);
                      }}
                    />
                  </div>
                  <p className='medium-intro-sm mt-2 text-gray-500'>
                    Tell us about stakeholder engagement.
                  </p>
                </div>
              </FormBlock>
            </div>
            <div className='py-10'>
              <SectionHeader title='Project Layout *' type='typology' />
              <FormBlock
                title='Select the relevant typology'
                description='We know that projects can be made up of multiple types of nature-based solutions. Please, select the typologies that you will develop in your project. Right now, the platform only recognises tree-based projects, but we’ll soon add more typologies such as Sustainable Urban Drainage Systems (SuDS)'
                type='typology'
              >
                <div className='sm:hidden'>
                  <label htmlFor='typology-type' className='sr-only'>
                    Select a tab
                  </label>
                  <select
                    id='typology-type'
                    name='typology-type'
                    className='block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                    defaultValue={typologyTabs.find((tab) => tab.current).name}
                  >
                    {typologyTabs.map((tab) => (
                      <option key={tab.name}>{tab.name}</option>
                    ))}
                  </select>
                </div>
                <div className='sm:col-span-6 hidden justify-self-center sm:block'>
                  <nav className='flex space-x-4' aria-label='Tabs'>
                    {typologyTabs.map((tab) => (
                      <button
                        key={tab.name}
                        className={classNames(
                          tab.current
                            ? 'bg-green-600 text-white'
                            : 'pointer-events-none bg-white-300 text-dark-wood-500',
                          'bold-intro-md rounded-full px-4 py-4',
                        )}
                        aria-current={tab.current ? 'page' : undefined}
                      >
                        {tab.name}
                      </button>
                    ))}
                  </nav>
                </div>
                <div className='sm:col-span-6'>
                  <RadioGroup value={selectedTypology} onChange={setSelectedTypology}>
                    <div className='mt-4 grid grid-cols-1 gap-y-6 xl:grid-cols-2 sm:gap-x-4'>
                      {typologies.map((typology) => (
                        <RadioGroup.Option
                          key={typology.id}
                          value={typology}
                          className={({ checked, active }) =>
                            classNames(
                              checked ? 'border-transparent' : 'border-dark-wood-500',
                              active ? 'border-green-600 ring-2 ring-green-600' : '',
                              'relative flex cursor-pointer rounded-3xl border bg-white p-4 focus:outline-none',
                            )
                          }
                        >
                          {({ checked, active }) => (
                            <>
                              <span className='flex flex-1'>
                                <img className='h-24 rounded-full' src={typology.image} />
                                <span className='flex flex-col'>
                                  <RadioGroup.Label
                                    as='span'
                                    className='bold-intro-sm block border-b border-dark-wood-800 pb-2 uppercase text-dark-wood-600'
                                  >
                                    {typology.title}
                                  </RadioGroup.Label>
                                  <RadioGroup.Description
                                    as='span'
                                    className='book-info-sm mt-1 flex items-center pt-2 pl-2 text-dark-wood-600'
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
                                  'pointer-events-none absolute -inset-px rounded-3xl',
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
              <hr className='mx-20 border-8 border-green-600' />
              <FormBlock
                title={`How big is the ${selectedTypology.title} component of your project?`}
                description={`Your total project area is ${totalArea} m2. How much of that will be comprised of ${selectedTypology.title}, and how many trees will there be?`}
                type='typology'
              >
                {selectedTypology.id !== 0 && (
                  <>
                    <NumberInput
                      span='sm:col-span-3'
                      label='area-density'
                      title='The effective area used by typology'
                      unit='Ha'
                      placeholder=''
                      type='typology'
                      min='0'
                      max='1000'
                      defaultValue={areaDensity}
                      onChange={(e) => {
                        setAreaDensity(e.target.value);
                      }}
                    />
                    <div className='col-span-3'></div>
                  </>
                )}

                <NumberInput
                  span='sm:col-span-3'
                  label='new-trees'
                  title='Number of new trees to be planted'
                  placeholder='100'
                  type='typology'
                  unit='trees'
                  min='0'
                  max='32000'
                  defaultValue={treeNumber}
                  onChange={(e) => {
                    setTreeNumber(e.target.value);
                  }}
                />
                {(selectedTypology.id === 1 || selectedTypology.id === 2) && (
                  <NumberInput
                    span='sm:col-span-3'
                    label='existing-trees'
                    unit='trees'
                    title='Number of existing trees to be maintained'
                    placeholder='100'
                    min='0'
                    max='32000'
                    type='typology'
                    defaultValue={treeNumberMaintain}
                    onChange={(e) => {
                      setTreeNumberMaintain(e.target.value);
                    }}
                  />
                )}
              </FormBlock>
              <hr className='mx-20 border-8 border-green-600' />
              <FormBlock
                title='What activities are you planning?'
                description='While we imagine you’re planning several activities, please select the main ones. (If you’re planning to plant trees, select DEVELOPING. If you’re maintaining existing tree stocks, select MAINTAINING)'
                type='typology'
              >
                <RadioSelector
                  span='sm:col-span-5'
                  label='activity-type'
                  title='Primary activity'
                  type='typology'
                  setRadioType={setActivityType}
                  radioType={activityType}
                  radioTypes={activityTypes}
                />
                <RadioSelector
                  span='sm:col-span-5'
                  label='maintenance-type'
                  title='Maintenance level'
                  type='typology'
                  setRadioType={setMaintenanceType}
                  radioType={maintenanceType}
                  radioTypes={maintenanceTypes}
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
                  span='sm:col-span-6'
                  label='project-budget'
                  title='What is your project budget?'
                  type='cost'
                  setRadioType={setBudgetType}
                  radioType={budgetType}
                  radioTypes={budgetTypes}
                />

                <RadioSelector
                  span='sm:col-span-6'
                  label='money-raised'
                  title='How much money have you raised so far?'
                  type='cost'
                  setRadioType={setRaisedType}
                  radioType={raisedType}
                  radioTypes={raisedTypes}
                />
              </FormBlock>
              <hr className='mx-20 border-8 border-indigo-600' />
              <FormBlock
                title='Breakdown of costs'
                description='Please tell us more about the initial costs of developing your project (capital expenditure) and ongoing costs of maintaining it (operational expenditure).'
                type='cost'
              >
                <NumberInput
                  span='sm:col-span-3'
                  label='capex'
                  title='Total capital expenditure  '
                  placeholder='£200'
                  unit='£'
                  type='cost'
                  min='0'
                  defaultValue={capexCost}
                  onChange={(e) => {
                    setCapexCost(e.target.value);
                  }}
                />

                <NumberInput
                  span='sm:col-span-3'
                  label='opex'
                  title='Total operational expenditure'
                  placeholder='£200'
                  unit='£'
                  type='cost'
                  min='0'
                  defaultValue={opexCost}
                  onChange={(e) => {
                    setOpexCost(e.target.value);
                  }}
                />
                <p className='col-span-3 medium-intro-sm mt-2 text-gray-500'>
                  Capital expenditures (CAPEX) refers to the initial costs of developing a project.
                </p>
                <p className='col-span-3 medium-intro-sm mt-2 text-gray-500'>
                  Operating expenses (OPEX) are the maintenance expenses to keep the projects
                  operation.
                </p>
              </FormBlock>
            </div>

            <div className='py-10'>
              <SectionHeader title='More information' type='info' />
              <FormBlock
                title='Would you like to add more information? '
                description='Thanks for sharing the key information required to establish your project’s impact. However, if you share more information about your project specifications (such as your planning application, bills of quantity, or any other design packages) your measurements will be more accurate.'
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
              <div className='max-w-3xl place-self-center py-4 text-center'>
                <p className='book-intro-lg'>
                  Thanks for taking the time to fill in the form. Click &quot;
                  <span className='medium-intro-lg'>Run impact</span>&quot; to view your project
                  impact assessment.
                </p>
              </div>
              <div className='place-self-center pt-4'>
                <button
                  type='button'
                  disabled={isLoading}
                  className='bold-intro-sm inline-flex justify-center rounded-full border border-transparent bg-indigo-600 py-2 px-8 text-white-200 shadow-sm hover:bg-indigo-800'
                  onClick={createProjectAndGetID}
                >
                  Run impact
                </button>
              </div>
            </div>
          </div>
        ))}
      {processStage === 2 && (
        <div className='global-margin sm:px-6 lg:px-8'>
          <Breadcrumb title='Run Impact Explorer – Your Analysis' />
          <div className='title-box mt-4 bg-indigo-600 border-[3px] border-dark-wood-800 py-20 px-20'>
            <div className='grid grid-cols-1 sm:grid-cols-2'>
              <div className='title-text-container text-background-shape py-20'>
                <h1 className='text-center text-indigo-600'>
                  Impact <br />
                  Assesment
                </h1>
              </div>
              <div className='place-self-center'>
                <h1 className='text-center text-white-200'>{projectName}</h1>
              </div>
            </div>
          </div>
          <div className='my-10 grid'>
            <div className='max-w-3xl place-self-center text-dark-wood-700 '>
              <p className='book-intro-lg pb-4'>
                Thank you for your patience, the analysis was successful.
              </p>
              <hr className='border-dark-wood-600' />
              <p className='book-intro-md pt-4'>
                Below you can check the impact of your project, edit parts and run new simulations
                if needed!
              </p>
            </div>
          </div>

          <SectionHeader title='Overview' type='typology' />
          <div className='mb-20 grid grid-cols-1 rounded-3xl border border-green-600 bg-white-200 py-10 px-10 lg:grid-cols-3'>
            <div className='border-r border-green-600 px-8'>
              <div className='flex items-center justify-center'>
                <img
                  src={projectImg}
                  alt='project image'
                  className='h-36 w-36 rounded-full border-8 border-green-600'
                />
              </div>
              <p className='bold-intro-sm para-break pt-10'>{projectDescription}</p>
              <div className='mt-8 flex flex-col'>
                <div className='-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8'>
                  <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
                    <div className='overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-2xl'>
                      <div className='bg-green-600 py-4 pl-4'>
                        <span className='medium-intro-sm text-left uppercase text-white-200'>
                          Project information
                        </span>
                      </div>
                      <table className='min-w-full divide-y divide-white-200'>
                        <tbody className='divide-y divide-white-200 bg-green-300'>
                          <tr>
                            <td className='book-info-sm whitespace-nowrap py-4 pl-4 pr-3 text-dark-wood-800 sm:pl-6'>
                              Project developer:
                            </td>
                            <td className='book-info-sm whitespace-nowrap px-3 py-4 text-green-600'>
                              {projectDev}
                            </td>
                          </tr>
                          <tr>
                            <td className='book-info-sm whitespace-nowrap py-4 pl-4 pr-3 text-dark-wood-800 sm:pl-6'>
                              Typology:
                            </td>
                            <td className='book-info-sm whitespace-nowrap px-3 py-4 text-green-600'>
                              {selectedTypology.title}
                            </td>
                          </tr>
                          <tr>
                            <td className='book-info-sm whitespace-nowrap py-4 pl-4 pr-3 text-dark-wood-800 sm:pl-6'>
                              Number of trees planted:
                            </td>
                            <td className='book-info-sm whitespace-nowrap px-3 py-4 text-green-600'>
                              {treeNumber}
                            </td>
                          </tr>
                          {(selectedTypology.id === 1 || selectedTypology.id === 2) && (
                            <tr>
                              <td className='book-info-sm whitespace-nowrap py-4 pl-4 pr-3 text-dark-wood-800 sm:pl-6'>
                                Number of trees maintained:
                              </td>
                              <td className='book-info-sm whitespace-nowrap px-3 py-4 text-green-600'>
                                {treeNumberMaintain}
                              </td>
                            </tr>
                          )}
                          <tr>
                            <td className='book-info-sm whitespace-nowrap py-4 pl-4 pr-3 text-dark-wood-800 sm:pl-6'>
                              Project stage:
                            </td>
                            <td className='book-info-sm whitespace-nowrap px-3 py-4 text-green-600'>
                              {selectedStage}
                            </td>
                          </tr>
                          <tr>
                            <td className='book-info-sm whitespace-nowrap py-4 pl-4 pr-3 text-dark-wood-800 sm:pl-6'>
                              Project status:
                            </td>
                            <td className='book-info-sm whitespace-nowrap px-3 py-4 text-green-600'>
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

            <div className='border-r border-green-600 px-8'>
              <h3 className='text-dark-wood-800'>Your project&rsquo;s 50-year impact</h3>
              <p className='book-info-sm pt-4 text-dark-wood-800 pb-10'>
                Considering a range of factors including your project’s typology, activity and
                location, you could help achieve the following estimated impact:
              </p>
              <ValueDisplay
                value={Math.round(totalSeq)}
                label='Net CO2 sequestered in 50 years (Kgs)'
                disabled={false}
              />
              <hr className='mx-20 border-8 border-green-600' />
              <ValueDisplay
                value={Math.round(totalStorage)}
                label='Total carbon stored in 50 years (Kgs) '
                disabled={false}
              />

              <div className='pt-5'>
                <ValueDisplay
                  value={0}
                  label='Annual stormwater runoff avoided (1000L/m2) (Kgs) '
                  disabled={true}
                />
                <hr className='mx-20 border-8 border-dark-wood-600' />
                <ValueDisplay
                  value={0}
                  label='Annual average PM10 improvement (%)'
                  disabled={true}
                />
              </div>
            </div>
            <div className='px-8 '>
              <h3 className='text-dark-wood-800'>Your project’s cost</h3>
              <p className='book-info-sm pt-5 text-dark-wood-800'>
                The following ranges provide an estimated project costs over different time-spans:
              </p>
              <p className='text-green-600'>Total cost for 50 years (GBP per m2)</p>
              <CostBox
                months={projectLength}
                costMonths={costOverSelectedTime}
                costTotal={totalCost}
              />
              <p className='book-info-sm pt-5 mb-5 text-dark-wood-800'>
                These estimates do not include any commercial mark-ups and only reflect the direct
                costs of building and maintaining your NbS project.
              </p>
              <h3 className='border-t border-green-600 pt-5 text-dark-wood-800'>Risk addressed</h3>
              <p className='book-info-sm pt-5 text-dark-wood-800'>
                Considering a combination of factors including your project typology, activity and
                location, your project average could be:
              </p>
              <LocationRiskChart cc_name={selectedCC} />
            </div>
          </div>

          <SectionHeader title='In detail' type='details' />
          <ResultBlock
            title='Your Project’s Impact'
            description='Considering the combination of factors including typology, activity and location, calculated via an agent-based scenario analysis framework, your project could help achieve the following potential impact over the next 50 years:'
            type='impact'
          />
          <hr className='mx-20 border-[12px] border-indigo-600' />
          <div className=''>
            <ChartBlock
              maintenanceTypeName={maintenanceType.name}
              label='Net CO2 sequestration (in kg/ year) under three maintenance scopes.'
              detail='This is the amount of carbon dioxide removed from the atmosphere through the process of photosynthesis, minus the amount of carbon dioxide that is released from tree death, annually over a project’s lifetime.'
            >
              <ChartMultiLine data={comparativeSeq} />
            </ChartBlock>
            <hr className='mx-20 border-[12px] border-indigo-600' />
            <ChartBlock
              maintenanceTypeName={maintenanceType.name}
              label='Total carbon stored (in kgs) under three maintenance scopes.'
              detail='This cumulative figure is the total biomass (trees and other plants) of the project over time.'
            >
              <ChartMultiLine data={comparativeStorage} />
            </ChartBlock>
            <hr className='mx-20 border-[12px] border-indigo-600' />
            <ChartBlock
              maintenanceTypeName={maintenanceType.name}
              label='Tree Health under three maintenance scopes'
              type='pie'
              detail='We consider a tree ‘non-critical’ if it has a dieback ratio of over 25%, this is the amount of living foliage as a proportion of the estimated original crown outline.'
            >
              <div className='flex'>
                <p className='max-w-sm pt-5 text-indigo-600 medium-intro-lg'>
                  Breakdown of trees in terms of their health (%)
                </p>
                <Dropdown
                  span='sm:col-span-2'
                  label='pie chart type'
                  title=''
                  type='general'
                  onChange={(e) => {
                    setPieChartShowType(e.target.value);
                  }}
                  options={piechartTypes}
                />
              </div>

              <div className='grid grid-cols-1 sm:grid-cols-3'>
                <div>
                  <PieChart data={oneToFivePie} type={1} />
                </div>
                <div>
                  <PieChart data={sixToTenPie} type={2} />
                </div>
                <div>
                  <PieChart data={eleventToFiftyPie} type={3} />
                </div>
              </div>
            </ChartBlock>
          </div>

          <div className='h-10' />

          <ResultBlock
            title='Project Costs*'
            description='The assessment provides an estimated project costs over 50 years. *this estimate does not include any commercial mark-ups. These costs only reflect the direct infrastructural cost of your NbS project.'
            type='impact'
          />
          <hr className='mx-20 border-[12px] border-indigo-600' />
          <ResultBlock title='Breakdown of capital and operational costs'>
            <div className='grid grid-cols-1 md:grid-cols-4 mt-5 gap-x-8'>
              <div>
                <p className='book-intro mt-10'>
                  Here you can find breakdown of the capital and operational costs of your project
                  for each typology under the maintenance scope you selected. The breakdown is
                  calculated by annualising the capital and operational costs for a 50 year period.
                </p>
              </div>
              <div className=''>
                <p className='mt-4'>Typology</p>
                <div className=''>
                  <RadioGroup value={selectedTypology} onChange={setSelectedTypology}>
                    <div className=''>
                      <RadioGroup.Option
                        key={selectedTypology.id}
                        value={selectedTypology}
                        className={({ checked, active }) =>
                          classNames(
                            checked ? 'border-transparent' : 'border-dark-wood-500',
                            active ? 'border-green-600 ring-2 ring-green-600' : '',
                            'relative flex cursor-pointer rounded-3xl border bg-white p-4 focus:outline-none',
                          )
                        }
                      >
                        {({ checked, active }) => (
                          <>
                            <span className='flex flex-1'>
                              <img className='h-24 rounded-full' src={selectedTypology.image} />
                              <span className='flex flex-col'>
                                <RadioGroup.Label
                                  as='span'
                                  className='bold-intro-sm block border-b border-dark-wood-800 pb-2 uppercase text-dark-wood-600'
                                >
                                  {selectedTypology.title}
                                </RadioGroup.Label>
                                <RadioGroup.Description
                                  as='span'
                                  className='book-info-sm mt-1 flex items-center pt-2 pl-2 text-dark-wood-600'
                                >
                                  {selectedTypology.description}
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
                                'pointer-events-none absolute -inset-px rounded-3xl',
                              )}
                              aria-hidden='true'
                            />
                          </>
                        )}
                      </RadioGroup.Option>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <div className='col-span-2'>
                <p>Annualised costs</p>

                <SmallBarChart data={smallCostChart} />
              </div>
            </div>
          </ResultBlock>
          <hr className='mx-20 border-[12px] border-indigo-600' />
          <ChartBlock
            maintenanceTypeName={maintenanceType.name}
            label='Your projects tree replacements'
          >
            <BarChart data={costChart} />
          </ChartBlock>

          <div className='grid pb-20 pt-10'>
            <div className='max-w-3xl place-self-center py-4 text-center'>
              <p className='book-intro-lg'>
                Thank you very much for your time.
                <br />
                <br />
                In a few months you will be able to publish your project to the NbS map, as well as
                being able to save your project and come back to it later.
              </p>
            </div>
            <div className='place-self-center pt-4'>
              <Link to='/learn-more'>
                <button
                  type='button'
                  className='bold-intro-sm inline-flex justify-center rounded-full border border-transparent bg-indigo-600 py-2 px-8 text-white-200 shadow-sm hover:bg-indigo-800'
                >
                  Learn more
                </button>
              </Link>
              <Link to='/explore'>
                <button
                  type='button'
                  className='bold-intro-sm ml-10 rounded-full border border-gray-300 bg-dark-wood-800 py-2 px-8 text-white-200 shadow-sm hover:bg-dark-wood-700'
                >
                  NbS Map
                </button>
              </Link>

              <button
                type='button'
                onClick={() => {
                  setProcessStage(1);
                }}
                className='bold-intro-sm ml-10 rounded-full border border-gray-300 bg-dark-wood-800 py-2 px-8 text-white-200 shadow-sm hover:bg-dark-wood-700'
              >
                Edit/add project info
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
      <Toaster
        position='top-right'
        toastOptions={{
          style: {
            padding: '16px',
            borderTopLeftRadius: '130px',
            borderBottomRightRadius: '130px',
          },
        }}
      />
    </div>
  );
}

SubmitProject.propTypes = {
  loggedIn: PropTypes.bool,
};
