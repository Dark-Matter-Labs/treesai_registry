import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import { useNavigate, Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import useSWR from 'swr';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
// Components
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import SAFLoadingScreen from '../components/SAFLoadingScreen';
import SectionHeader from '../components/SectionHeader';
import FormBlock from '../components/form/FormBlock';
import TextInput from '../components/form/TextInput';
import AddressInputWithMap from '../components/form/AddressInputWithMap';
import NumberInput from '../components/form/NumberInput';
import Dropdown from '../components/form/Dropdown';
import Toggle from '../components/form/Toggle';
import RadioSelector from '../components/form/RadioSelector';
import RadioGroupSelector from '../components/form/RadioGroupSelector';
import ResultBlock from '../components/ResultBlock';
import ValueDisplay from '../components/analysis/ValueDisplay';
import ChartBlock from '../components/analysis/ChartBlock';
import PieChartBlock from '../components/analysis/PieChartBlock';
import LineChart from '../components/charts/LineChart';

// Images
import projectImg from '../images/project-default.png';
// Charts
import ChartMultiLine from '../components/charts/ChartMultiLine';
import BarChart from '../components/charts/BarChart';
// utils functions
import { saf_data } from '../utils/saf_data_model';
import {
  get_saf_run_by_hash,
  post_saf_run_and_get_hash,
  create_project_and_get_ID,
} from '../utils/backendCRUD';
import { formatDataForMultilineChart } from '../utils/chartUtils';

import { get_typologies, get_maintenance_scopes } from '../utils/saf_utils';
import {
  get_typologies_types,
  get_stages,
  get_land_use,
  get_activity_types,
} from '../utils/project_details';

import { getCouncils } from '../utils/geojson_utils';
import CostBox from '../components/CostBox';

import { makeChartArray, sumRange, getLastKeyInObj } from '../utils/objUtils';
import CompositionPieChart from '../components/charts/CompositionPieChart';
import RiskRadar from '../components/analysis/RiskRadar';

// set SAF parameters
const typologies = get_typologies();
const maintenanceTypes = get_maintenance_scopes();

// set project parameters
const listCouncils = getCouncils();
const typologyTabs = get_typologies_types();
const stages = get_stages();
const landUse = get_land_use();
const activityTypes = get_activity_types();

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}
export default function Develop(props) {
  const [processStage, setProcessStage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  /* Form variables, to be refactored to react-hook-form */
  const methods = useForm();
  const {
    formState: { errors },
  } = methods;

  const watchTotalArea = methods.watch('totalArea', 1);
  const watchTreePlant = methods.watch('treeNumber', 1);
  const watchTreeMaintain = methods.watch('existingTrees', 1);
  const watchConifer = methods.watch('conifer', 47);
  const [selectedCC, setSelectedCC] = useState(listCouncils[0]);
  const [landUseChange, setLandUseChange] = useState(false);
  const [totalTreeNumber, setTotalTreeNumber] = useState(0);
  const [selectedStage, setSelectedStage] = useState(stages[0]);
  const [selectedLandUse, setSelectedLandUse] = useState('Recreation');
  const [selectedLandUseChange, setSelectedLandUseChange] = useState('-');
  const [selectedLandUseStatus, setSelectedLandUseStatus] = useState('Yes');
  const [selectedTypology, setSelectedTypology] = useState(typologies[0]);
  const [maintenanceType, setMaintenanceType] = useState(maintenanceTypes[0]);
  const [activityType, setActivityType] = useState(activityTypes[0]);
  const [densityPerHa, setDensityPerHa] = useState(1);
  const [locationInputError, setLocationInputError] = useState(false);
  // Cost variables
  const [totalCost, setTotalCost] = useState(500);
  const [moneyNeeded, setMoneyNeeded] = useState(500);

  /* SAF Related variables */
  const [safOutputHash0, setSafOutputHash0] = useState();
  const [safOutputHash1, setSafOutputHash1] = useState();
  const [safOutputHash2, setSafOutputHash2] = useState();
  const [totalSeq, setTotalSeq] = useState(0);
  const [totalStorage, setTotalStorage] = useState(0);
  const [comparativeSeq, setComparativeSeq] = useState([]);
  const [comparativeStorage, setComparativeStorage] = useState([]);

  const [costChart, setCostChart] = useState([]);

  const navigate = useNavigate();

  /* Data Fetching for the result page */

  const swrOptions = {
    onSuccess: (data) => {
      console.log('Data received:', data);
    },

    // Revalidation documentation: https://swr.vercel.app/docs/revalidation
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  };

  // Retrieve the result from the simulation. It will only fetch if the Hash is defined
  const { data: safOutput0 } = useSWR(safOutputHash0, get_saf_run_by_hash, swrOptions);
  const { data: safOutput1 } = useSWR(
    safOutput0 ? safOutputHash1 : null,
    get_saf_run_by_hash,
    swrOptions,
  );
  const { data: safOutput2 } = useSWR(
    safOutput1 ? safOutputHash2 : null,
    get_saf_run_by_hash,
    swrOptions,
  );

  /* Helper functions */

  useEffect(() => {
    if (sessionStorage.getItem('token') === null || sessionStorage.getItem('token') === undefined) {
      toast.error('You must be logged in to submit a project.');
      navigate('/register');
    }
  });

  useEffect(() => {
    let sum = parseInt(watchTreePlant) + parseInt(watchTreeMaintain);
    setTotalTreeNumber(sum);
  }, [watchTreePlant, watchTreeMaintain]);

  useEffect(() => {
    let densPerHa = (totalTreeNumber * 10000) / watchTotalArea; // Multiply by 10000 to transform m2 to Ha
    setDensityPerHa(densPerHa);
  }, [totalTreeNumber, watchTotalArea]);

  useEffect(() => {
    setTotalCost(methods.getValues('project-budget'));

    setMoneyNeeded(
      parseInt(parseInt(methods.getValues('project-budget'))) -
        parseInt(methods.getValues('money-raised')),
    );
  }, [methods.getValues('money-raised'), safOutput0]);

  function processSAFData(SAFOutput = saf_data) {
    /* SAF Related processing */
    setTotalSeq(sumRange(SAFOutput.Seq, 0, getLastKeyInObj(SAFOutput.Seq)));
    setTotalStorage(SAFOutput.Storage[getLastKeyInObj(SAFOutput.Storage)]); // last element of the array
  }

  function getSelectedOutput() {
    if (safOutput0 && safOutput1 && safOutput2) {
      switch (maintenanceType.name) {
        case 'High':
          return safOutput2;
        case 'Medium':
          return safOutput1;
        case 'Low':
          return safOutput0;
        default:
          toast.error('maintenance type not valid');
      }
    }
  }
  /* Data logic changes on receiving the SAF output */
  useEffect(() => {
    if (safOutput0 && safOutput1 && safOutput2) {
      processSAFData(getSelectedOutput());
    }
  }, [safOutput0, safOutput1, safOutput2]);

  function processPopulationDataForLineChart(safOutput) {
    const output = [
      {
        id: 'Alive',
        label: 'Alive',
        data: makeChartArray(safOutput.Alive),
      },
      {
        id: 'Dead',
        label: 'Dead',
        data: makeChartArray(safOutput.Dead),
      },
      {
        id: 'Replaced (cumulative)',
        label: 'Replaced',
        data: makeChartArray(safOutput.Replaced),
      },
    ];
    return output;
  }

  function makeComparativeSeqChart(
    safOutput0 = saf_data,
    safOutput1 = saf_data,
    safOutput2 = saf_data,
  ) {
    let seq_0 = makeChartArray(safOutput0.Seq);
    let seq_1 = makeChartArray(safOutput1.Seq);
    let seq_2 = makeChartArray(safOutput2.Seq);

    setComparativeSeq(formatDataForMultilineChart(seq_0, seq_1, seq_2));
  }

  function makeComparativeStorageChart(
    safOutput0 = saf_data,
    safOutput1 = saf_data,
    safOutput2 = saf_data,
  ) {
    let storage_0 = makeChartArray(safOutput0.Storage);
    let storage_1 = makeChartArray(safOutput1.Storage);
    let storage_2 = makeChartArray(safOutput2.Storage);

    setComparativeStorage(formatDataForMultilineChart(storage_0, storage_1, storage_2));
  }

  function makeComparativeCostBarChart(
    safOutput0 = saf_data,
    safOutput1 = saf_data,
    safOutput2 = saf_data,
  ) {
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
    if (safOutput0 && safOutput1 && safOutput2) {
      makeComparativeSeqChart(safOutput0, safOutput1, safOutput2);
      makeComparativeStorageChart(safOutput0, safOutput1, safOutput2);
      makeComparativeCostBarChart(safOutput0, safOutput1, safOutput2);
    }
  }, [safOutput0, safOutput1, safOutput2]);

  const postSAFRun = async (maintenanceScope, formData) => {
    // Define payload based on maintenance scope
    let payload = {
      title: formData.projectName,
      description: formData.projectDescription,
      typology: selectedTypology.value,
      maintenance_scope: maintenanceScope,
      season_growth_mean: 200,
      season_growth_var: 7,
      time_horizon: 50,
      density_per_ha: parseInt(densityPerHa),
      species: selectedTypology.species,
      conifer_ratio_percent: formData.conifer, // Integer
    };
    // Change dbh based on activity
    if (watchTreePlant > watchTreeMaintain) {
      payload = {
        ...payload,
        min_dbh: parseInt(selectedTypology.fixedDBH),
        max_dbh: parseInt(selectedTypology.fixedDBH),
      };
    } else {
      payload = {
        ...payload,
        min_dbh: parseInt(selectedTypology.minDBH),
        max_dbh: parseInt(selectedTypology.maxDBH),
      };
    }

    // parse payload to JSON
    payload = JSON.stringify(payload);

    let hash = await post_saf_run_and_get_hash(payload);
    return hash;
  };

  const createProjectAndGetID = async (formData) => {
    const payload = JSON.stringify({
      title: formData.projectName,
      description: formData.projectDescription,
      in_portfolio: true,
      publish: true,
      project_dev: formData.projectDeveloper,
      owner_id: parseInt(sessionStorage.user_id),
      activities: 'maintenance',
      area: parseInt(formData.totalArea),
      cost: 0,
      stage: selectedStage + selectedLandUse + selectedLandUseStatus + selectedLandUseChange, // TO:DO fix this and send stage data properly
      number_of_trees: totalTreeNumber,
      local_authority: formData.projectDeveloper,
      location: sessionStorage.getItem('address'),
      start_date: new Date(formData.startDate),
      lat: sessionStorage.getItem('lat'),
      lng: sessionStorage.getItem('lng'),
    });

    let id = await create_project_and_get_ID(payload);
    return id;
  };

  function toResultPage() {
    // Quit loading screen
    setIsLoading(false);

    // Make the result screen
    window.scrollTo(0, 0);
    setProcessStage(2);
  }

  /* Get to the next page if all the results are in */
  useEffect(() => {
    if (safOutput0 && safOutput1 && safOutput2) {
      toResultPage();
    }
  }, [safOutput0, safOutput1, safOutput2]);

  function stopSimulation(error) {
    toast.error(error);
    console.log(error);
    setIsLoading(false);
    setProcessStage(0);
  }

  async function sendRequestAndFetchData(formData) {
    // checking if user entered project location on the map
    if (sessionStorage.getItem('lat') === null) {
      setLocationInputError(true);
      window.scrollTo(0, 1000);
      return;
    }

    // set screen to loading
    setIsLoading(true);

    // Create a project and get the ID - The ID is stored in the Sessionstorage
    await createProjectAndGetID(formData);

    // Check if createProjectAndGetID gave an error and stop simulation in that case, show user the error
    if (!sessionStorage.getItem('project_id')) {
      stopSimulation('Error creating project');
      return;
    }

    for (let maintenanceScope = 0; maintenanceScope < 3; maintenanceScope++) {
      // Make a post call to run the simulation on a project
      const run_hash = await postSAFRun(maintenanceScope, formData);

      if (!run_hash) {
        stopSimulation('Error simulating project');
        return;
      }

      console.log('step ' + maintenanceScope + '/3');

      switch (maintenanceScope) {
        case 0:
          setSafOutputHash0(run_hash);
          break;
        case 1:
          setSafOutputHash1(run_hash);
          break;
        case 2:
          setSafOutputHash2(run_hash);
          break;
        default:
          stopSimulation('Oops, the simulation went too far!');
      }
    }
  }

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
                  <p className='medium-intro-md mt-1 text-dark-wood-800'>
                    Welcome to TreesAI NbS impact assessment demonstrator.
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
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(sendRequestAndFetchData)}>
                <div className='py-10'>
                  <SectionHeader title='Project information' type='general' />
                  <FormBlock
                    title='Project information'
                    description='Start by telling us who you are and a bit about your project.'
                  >
                    <TextInput
                      span='sm:col-span-5'
                      label='projectName'
                      title='Project Name *'
                      placeholder='Title of the project'
                      type='general'
                      required={true}
                      errors={errors}
                      defaultValue='Sample project title'
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
                      label='projectDeveloper'
                      title='Project Developer *'
                      placeholder='Name of the institution that is in charge of developing the project'
                      type='general'
                      required={true}
                    />

                    <Dropdown
                      span='sm:col-span-3'
                      label='project-stage'
                      title='Current stage'
                      type='general'
                      showInfo={true}
                      onChange={(e) => {
                        setSelectedStage(e.target.value.toLowerCase());
                      }}
                      options={stages}
                    />
                  </FormBlock>
                  <hr className='mx-20 border-8 border-indigo-600' />
                  <FormBlock
                    title='Project Location *'
                    description='Where is your project located?'
                  >
                    <AddressInputWithMap span='sm:col-span-3' showError={locationInputError} />
                  </FormBlock>
                  <hr className='mx-20 border-8 border-indigo-600' />
                  <FormBlock
                    title='Land ownership and use'
                    description='Land usage prior to your intervention is a key determinant of a project’s future impact.'
                  >
                    <TextInput
                      span='sm:col-span-3'
                      label='landOwner'
                      title='Land Owner'
                      placeholder='Who owns the land?'
                      type='general'
                    />

                    <Dropdown
                      span='sm:col-span-3'
                      label='landOwnerStatus'
                      title='Do you own the land?'
                      type='general'
                      onChange={(e) => {
                        setSelectedLandUseStatus(e.target.value.toLowerCase());
                      }}
                      options={['Yes', 'No']}
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

                    <div className='sm:col-span-1' />

                    <Dropdown
                      span='sm:col-span-3'
                      label='land-use-change-type'
                      title='How will it be used?'
                      type='general'
                      onChange={(e) => {
                        setSelectedLandUseChange(e.target.value.toLowerCase());
                      }}
                      options={['-'].concat(landUse)}
                    />
                  </FormBlock>
                  <hr className='mx-20 border-8 border-indigo-600' />
                  <FormBlock
                    title='Describe your project'
                    description='Tell us about your project. Don’t worry about precise typologies or numbers for the moment, just let us know about the project’s location, what you hope to deliver, who you’re working with to make it happen.'
                  >
                    <div className='sm:col-span-6'>
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
                          {...methods.register('projectDescription')}
                        />
                      </div>
                      <p className='medium-intro-sm mt-2 text-gray-500'>
                        There is no word limit, but for readability’s sake, we suggest you keep the
                        description under 250 words.
                      </p>
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
                          name='startDate'
                          type='month'
                          className='block w-full rounded-2xl border-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                          {...methods.register('startDate', {
                            required: { value: true, message: 'This is required!' },
                          })}
                        />
                        <ErrorMessage
                          name='startDate'
                          render={({ message }) => (
                            <p className='book-info-sm text-red-600 py-2'>{message}</p>
                          )}
                        />
                      </div>
                    </div>

                    <NumberInput
                      span='sm:col-span-3'
                      label='projectLength'
                      title='Expected length of the project in months *'
                      placeholder='12'
                      type='general'
                      unit='months'
                      min={1}
                      required={true}
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
                          name='stakeholderEngagement'
                          rows={3}
                          className='block w-full rounded-2xl border border-indigo-600 pb-20 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                          {...methods.register('stakeholderEngagement')}
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
                    <RadioGroupSelector
                      value={selectedTypology}
                      setValue={setSelectedTypology}
                      valueArray={typologies}
                      hasImage={true}
                    />
                  </FormBlock>
                  <hr className='mx-20 border-8 border-green-600' />
                  <FormBlock
                    title={`How big is the ${selectedTypology.title} component of your project?`}
                    description={`Your total project area is ${watchTotalArea} m2. How much of that will be comprised of ${selectedTypology.title}, and how many trees will there be?`}
                    type='typology'
                  >
                    <Controller
                      control={methods.control}
                      name='totalArea'
                      render={({ field: { onChange, onBlur, value } }) => (
                        <NumberInput
                          span='sm:col-span-3'
                          label='totalArea'
                          title='Total area of the project *'
                          unit='m2'
                          placeholder='10000'
                          min={50}
                          max={200000}
                          type='typology'
                          required={true}
                          onChange={onChange}
                          onBlur={onBlur}
                          selected={value}
                        />
                      )}
                    />

                    <div className='sm:col-span-2' />

                    <Controller
                      control={methods.control}
                      name='treeNumber'
                      render={({ field: { onChange, onBlur, value } }) => (
                        <NumberInput
                          span='sm:col-span-3'
                          label='treeNumber'
                          title='Number of new trees to be planted'
                          placeholder='100'
                          type='typology'
                          unit='trees'
                          min={5}
                          max={1000}
                          required={true}
                          onChange={onChange}
                          onBlur={onBlur}
                          selected={value}
                        />
                      )}
                    />

                    <Controller
                      control={methods.control}
                      name='existingTrees'
                      render={({ field: { onChange, onBlur, value } }) => (
                        <NumberInput
                          span='sm:col-span-3'
                          label='existingTrees'
                          unit='trees'
                          title='Number of existing trees to be maintained'
                          placeholder='100'
                          min={0}
                          max={1000}
                          type='typology'
                          required={true}
                          onChange={onChange}
                          onBlur={onBlur}
                          selected={value}
                        />
                      )}
                    />
                  </FormBlock>
                  <hr className='mx-20 border-8 border-green-600' />
                  <FormBlock
                    title={'What is the composition of your project?'}
                    description={'Choose between conifer and deciduous'}
                    type='typology'
                  >
                    <Controller
                      control={methods.control}
                      name='conifer'
                      render={({ field: { onChange, onBlur, value } }) => (
                        <NumberInput
                          span='sm:col-span-3'
                          label='conifer'
                          title='% of conifer trees'
                          placeholder='50'
                          type='typology'
                          unit='%'
                          min={0}
                          max={100}
                          required={true}
                          onChange={onChange}
                          onBlur={onBlur}
                          selected={value}
                        />
                      )}
                    />

                    <CompositionPieChart data={Number(watchConifer)} />
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
                  </FormBlock>
                  <hr className='mx-20 border-8 border-green-600' />
                  <FormBlock
                    title='What is your project maintenance level? '
                    description='According to the activity you have chosen, developing or maintenance, choose the level of maintenance.'
                    type='typology'
                  >
                    <RadioGroupSelector
                      value={maintenanceType}
                      setValue={setMaintenanceType}
                      valueArray={maintenanceTypes}
                      hasImage={false}
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
                    <NumberInput
                      span='sm:col-span-4'
                      label='project-budget'
                      title='What is your project budget?'
                      placeholder='200'
                      unit='£'
                      type='cost'
                      min={1}
                      max={5000000}
                      defaultValue={50000}
                      required={true}
                    />

                    <NumberInput
                      span='sm:col-span-4'
                      label='money-raised'
                      title='How much money have you raised so far?'
                      placeholder='200'
                      unit='£'
                      type='cost'
                      min={0}
                      max={5000000}
                      defaultValue={2500}
                      required={true}
                    />
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
                      label='fileUpload'
                      title='Upload file'
                      placeholder='filename'
                      type='additional'
                    />
                    <div className='sm:col-span-2' />

                    <TextInput
                      span='sm:col-span-3'
                      label='link1'
                      title='Add link 1'
                      placeholder='www.projectsite.com'
                      type='additional'
                    />
                    <TextInput
                      span='sm:col-span-3'
                      label='link2'
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
                    <input
                      type='submit'
                      value='Run Impact'
                      disabled={isLoading}
                      className='bold-intro-sm inline-flex justify-center rounded-full border border-transparent bg-indigo-600 py-2 px-8 text-white-200 shadow-sm hover:bg-indigo-800'
                    />
                  </div>
                </div>
              </form>
            </FormProvider>
          </div>
        ))}
      {processStage === 2 && (
        <div className='global-margin sm:px-6 lg:px-8'>
          <Breadcrumb title='Run Impact Explorer – Your Analysis' />
          <div className='title-box mt-4 bg-indigo-600  py-20 px-20'>
            <div className='grid grid-cols-1 sm:grid-cols-2'>
              <div className='title-text-container text-background-shape py-20'>
                <h1 className='text-center text-indigo-600'>
                  Impact <br />
                  Assesment
                </h1>
              </div>
              <div className='place-self-center'>
                <h1 className='text-left text-white-200'>{methods.getValues('projectName')}</h1>
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
                  className='h-49 w-49 rounded-full border-8 border-green-600'
                />
              </div>
              <p className='bold-intro-sm para-break pt-10'>
                {methods.getValues('projectDescription')}
              </p>
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
                        <tbody className='divide-y divide-white-200 bg-gray-200'>
                          <tr>
                            <td className='book-info-sm whitespace-nowrap py-4 pl-4 pr-3 text-dark-wood-800 sm:pl-6'>
                              Project developer:
                            </td>
                            <td className='book-info-sm whitespace-nowrap px-3 py-4 text-green-600'>
                              {methods.getValues('projectDeveloper')}
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
                              {methods.getValues('treeNumber')}
                            </td>
                          </tr>
                          <tr>
                            <td className='book-info-sm whitespace-nowrap py-4 pl-4 pr-3 text-dark-wood-800 sm:pl-6'>
                              Number of trees maintained:
                            </td>
                            <td className='book-info-sm whitespace-nowrap px-3 py-4 text-green-600'>
                              {methods.getValues('existingTrees')}
                            </td>
                          </tr>
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

            <div className='col-span-2'>
              <div className='grid grid-cols-1 lg:grid-cols-2'>
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
                </div>
                <div className='px-8 '>
                  <h3 className='text-dark-wood-800'>Your project’s cost</h3>
                  <p className='book-info-sm pt-5 text-dark-wood-800'>
                    The following ranges provide an estimated project costs over different
                    time-spans:
                  </p>
                  <CostBox costTotal={Number(totalCost)} moneyNeeded={moneyNeeded} />
                  <p className='book-info-sm pt-5 mb-5 text-dark-wood-800'>
                    These estimates do not include any commercial mark-ups and only reflect the
                    direct costs of building and maintaining your NbS project.
                  </p>
                </div>

                <div className='col-span-2 mt-5 mx-5'>
                  <h3 className='border-t border-green-600 pt-5 text-dark-wood-800'>
                    Your project’s location challenges
                  </h3>
                  <p className='book-info-sm pt-5 text-dark-wood-800'>
                    The location of your project matters. It matters because cities are facing
                    multiple climate and social challenges which your project can help mitigate. On
                    the right you assess the challenges faced by the neighbourhood of your project:
                  </p>
                  <p className='medium-info-sm pt-5 text-dark-wood-800'>{selectedCC}</p>
                  <RiskRadar cc_name={selectedCC} />
                </div>
              </div>
            </div>
          </div>

          <SectionHeader title='Your project’s estimated population' type='Population' />
          <ResultBlock
            title='Your Trees’ life'
            description='Considering a combination of factors including typology, activity and location, calculated via an agent-based model, your project could achieve the following potential impact over the next 50 years:'
            type='pop'
          />
          <hr className='mx-20 border-[12px] border-indigo-600' />
          <div className=''>
            <ChartBlock
              maintenanceTypeName={maintenanceType.name}
              label='Evolution of the population over time'
              detail='See how many trees are alive and replaced over time'
            >
              <LineChart data={processPopulationDataForLineChart(getSelectedOutput())} />
            </ChartBlock>
            <hr className='mx-20 border-[12px] border-indigo-600' />
            <PieChartBlock
              safOutput0={safOutput0}
              safOutput1={safOutput1}
              safOutput2={safOutput2}
              maintenanceTypeName={maintenanceType.name}
            />
          </div>

          <div className='h-10' />

          <SectionHeader title='Your Impact' type='details' />
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
          </div>

          <div className='h-10' />

          <SectionHeader title='Your project costs' type='details' />
          <ResultBlock
            title='Project Costs*'
            description='The assessment provides an estimated project costs over 50 years. *this estimate does not include any commercial mark-ups. These costs only reflect the direct infrastructural cost of your NbS project.'
            type='impact'
          />
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

Develop.propTypes = {
  loggedIn: PropTypes.bool,
};
