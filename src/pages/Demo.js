import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import toast, { Toaster } from 'react-hot-toast';
// Components
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Breadcrumb from '../components/Breadcrumb';
import SAFLoadingScreen from '../components/SAFLoadingScreen';
import SectionHeader from '../components/SectionHeader';
import FormBlock from '../components/form/FormBlock';
import EmailInput from '../components/form/EmailInput';
import TypologyInput from '../components/form/TypologyInput';
import Dropdown from '../components/form/Dropdown';
import ResultBlock from '../components/ResultBlock';
import ValueDisplay from '../components/analysis/ValueDisplay';
import ChartBlock from '../components/analysis/ChartBlock';
// Images
import projectImg from '../images/project-default.png';
// Charts
import ChartMultiLine from '../components/charts/ChartMultiLine';
import LocationRiskChart from '../components/analysis/LocationRisk';
import PieChart from '../components/charts/PieChart';

import { saf_data } from '../utils/saf_data_model';

import { get_typologies, get_maintenance_scopes } from '../utils/saf_utils';
import { get_activity_types, get_piechart_types } from '../utils/project_details';

import { getCouncils } from '../utils/geojson_utils';
import { Link } from 'react-router-dom';

// set SAF parameters
const typologies = get_typologies();
const maintenanceTypes = get_maintenance_scopes();

// set project parameters
const listCouncils = getCouncils();
const activityTypes = get_activity_types();
const piechartTypes = get_piechart_types();

export default function Demo(props) {
  const [processStage, setProcessStage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  /* Form variables, to be refactored to react-hook-form */
  const [email, setEmail] = useState('');
  const [treeNumber, setTreeNumber] = useState(1);
  const [treeNumberMaintain, setTreeNumberMaintain] = useState(0);
  const [totalTreeNumber, setTotalTreeNumber] = useState(0);
  const [selectedTypology, setSelectedTypology] = useState(typologies[0]);
  const [maintenanceType, setMaintenanceType] = useState(maintenanceTypes[0]);
  const [areaDensity, setAreaDensity] = useState(1);
  const [activityType, setActivityType] = useState(activityTypes[0]);
  const [pieChartShowType, setPieChartShowType] = useState('high maintenance');

  /* SAF Related variables */
  const [safOutput0, setSafOutput0] = useState(saf_data);
  const [safOutput1, setSafOutput1] = useState(saf_data);
  const [safOutput2, setSafOutput2] = useState(saf_data);
  const [totalSeq, setTotalSeq] = useState(0);
  const [totalStorage, setTotalStorage] = useState(0);
  const [comparativeSeq, setComparativeSeq] = useState([]);
  const [comparativeStorage, setComparativeStorage] = useState([]);
  const [oneToFivePieHigh, setOneToFivePieHigh] = useState([]);
  const [sixToTenPieHigh, setSixToTenHigh] = useState([]);
  const [eleventToFiftyPieHigh, setEleventToFiftyPieHigh] = useState([]);
  const [oneToFivePieMed, setOneToFivePieMed] = useState([]);
  const [sixToTenPieMed, setSixToTenMed] = useState([]);
  const [eleventToFiftyPieMed, setEleventToFiftyPieMed] = useState([]);
  const [oneToFivePieLow, setOneToFivePieLow] = useState([]);
  const [sixToTenPieLow, setSixToTenLow] = useState([]);
  const [eleventToFiftyPieLow, setEleventToFiftyPieLow] = useState([]);

  const [costChart, setCostChart] = useState([]);

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

  /* Helper functions */
  function makeChartArray(dict) {
    let chartArray = [];
    chartArray = Object.keys(dict).map((key) => ({
      x: Number(key),
      y: dict[key],
    }));
    return chartArray;
  }

  function processSAFData() {
    /* SAF Related processing */

    /*
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
    */

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

    /* Calculate */

    // Calculate total storage
    setTotalSeq(sumRange(safOutput2.Seq, 0, getLastElement(safOutput2.Seq)));
    setTotalStorage(safOutput2.Storage[getLastElement(safOutput2.Storage)]); // last element of the array

    /* Pie charts */

    // Alive - High
    const oneToFiveAliveHigh = sumRange(safOutput2.Alive, 0, 5) / 5;
    const sixToTenAliveHigh = sumRange(safOutput2.Alive, 5, 10) / 5;
    const elevenToFiftyAliveHigh = sumRange(safOutput2.Alive, 10, 50) / 40;

    const alive_buckets_high = [
      { years: '1-5', trees: oneToFiveAliveHigh },
      { years: '6-10', trees: sixToTenAliveHigh },
      { years: '11-50', trees: elevenToFiftyAliveHigh },
    ];

    // Dead - High
    const oneToFiveDeadHigh = sumRange(safOutput2.Dead, 0, 5) / 5;
    const sixToTenDeadHigh = sumRange(safOutput2.Dead, 5, 10) / 5;
    const elevenToFiftyDeadHigh = sumRange(safOutput2.Dead, 10, 50) / 40;

    const dead_buckets_high = [
      { years: '1-5', trees: oneToFiveDeadHigh },
      { years: '6-10', trees: sixToTenDeadHigh },
      { years: '11-50', trees: elevenToFiftyDeadHigh },
    ];

    // Critical - High
    const oneToFiveCriticalHigh = sumRange(safOutput2.Critical, 0, 5) / 5;
    const sixToTenCriticalHigh = sumRange(safOutput2.Critical, 5, 10) / 5;
    const elevenToFiftyCriticalHigh = sumRange(safOutput2.Critical, 10, 50) / 40;

    let critical_buckets_high = [
      { years: '1-5', trees: oneToFiveCriticalHigh },
      { years: '6-10', trees: sixToTenCriticalHigh },
      { years: '11-50', trees: elevenToFiftyCriticalHigh },
    ];

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

    setOneToFivePieHigh(
      makePieOutput(alive_buckets_high, critical_buckets_high, dead_buckets_high, 0),
    );
    setSixToTenHigh(makePieOutput(alive_buckets_high, critical_buckets_high, dead_buckets_high, 1));
    setEleventToFiftyPieHigh(
      makePieOutput(alive_buckets_high, critical_buckets_high, dead_buckets_high, 2),
    );

    // Alive - Med
    const oneToFiveAliveMed = sumRange(safOutput1.Alive, 0, 5) / 5;
    const sixToTenAliveMed = sumRange(safOutput1.Alive, 5, 10) / 5;
    const elevenToFiftyAliveMed = sumRange(safOutput1.Alive, 10, 50) / 40;

    const alive_buckets_med = [
      { years: '1-5', trees: oneToFiveAliveMed },
      { years: '6-10', trees: sixToTenAliveMed },
      { years: '11-50', trees: elevenToFiftyAliveMed },
    ];

    // Dead - Med
    const oneToFiveDeadMed = sumRange(safOutput1.Dead, 0, 5) / 5;
    const sixToTenDeadMed = sumRange(safOutput1.Dead, 5, 10) / 5;
    const elevenToFiftyDeadMed = sumRange(safOutput1.Dead, 10, 50) / 40;

    const dead_buckets_med = [
      { years: '1-5', trees: oneToFiveDeadMed },
      { years: '6-10', trees: sixToTenDeadMed },
      { years: '11-50', trees: elevenToFiftyDeadMed },
    ];

    // Critical - Med
    const oneToFiveCriticalMed = sumRange(safOutput1.Critical, 0, 5) / 5;
    const sixToTenCriticalMed = sumRange(safOutput1.Critical, 5, 10) / 5;
    const elevenToFiftyCriticalMed = sumRange(safOutput1.Critical, 10, 50) / 40;

    let critical_buckets_med = [
      { years: '1-5', trees: oneToFiveCriticalMed },
      { years: '6-10', trees: sixToTenCriticalMed },
      { years: '11-50', trees: elevenToFiftyCriticalMed },
    ];

    setOneToFivePieMed(makePieOutput(alive_buckets_med, critical_buckets_med, dead_buckets_med, 0));
    setSixToTenMed(makePieOutput(alive_buckets_med, critical_buckets_med, dead_buckets_med, 1));
    setEleventToFiftyPieMed(
      makePieOutput(alive_buckets_med, critical_buckets_med, dead_buckets_med, 2),
    );

    // Alive - Low
    const oneToFiveAliveLow = sumRange(safOutput0.Alive, 0, 5) / 5;
    const sixToTenAliveLow = sumRange(safOutput0.Alive, 5, 10) / 5;
    const elevenToFiftyAliveLow = sumRange(safOutput0.Alive, 10, 50) / 40;

    const alive_buckets_low = [
      { years: '1-5', trees: oneToFiveAliveLow },
      { years: '6-10', trees: sixToTenAliveLow },
      { years: '11-50', trees: elevenToFiftyAliveLow },
    ];

    // Dead - Low
    const oneToFiveDeadLow = sumRange(safOutput0.Dead, 0, 5) / 5;
    const sixToTenDeadLow = sumRange(safOutput0.Dead, 5, 10) / 5;
    const elevenToFiftyDeadLow = sumRange(safOutput0.Dead, 10, 50) / 40;

    const dead_buckets_low = [
      { years: '1-5', trees: oneToFiveDeadLow },
      { years: '6-10', trees: sixToTenDeadLow },
      { years: '11-50', trees: elevenToFiftyDeadLow },
    ];

    // Critical - Low
    const oneToFiveCriticalLow = sumRange(safOutput0.Critical, 0, 5) / 5;
    const sixToTenCriticalLow = sumRange(safOutput0.Critical, 5, 10) / 5;
    const elevenToFiftyCriticalLow = sumRange(safOutput0.Critical, 10, 50) / 40;

    let critical_buckets_low = [
      { years: '1-5', trees: oneToFiveCriticalLow },
      { years: '6-10', trees: sixToTenCriticalLow },
      { years: '11-50', trees: elevenToFiftyCriticalLow },
    ];

    setOneToFivePieLow(makePieOutput(alive_buckets_low, critical_buckets_low, dead_buckets_low, 0));
    setSixToTenLow(makePieOutput(alive_buckets_low, critical_buckets_low, dead_buckets_low, 1));
    setEleventToFiftyPieLow(
      makePieOutput(alive_buckets_low, critical_buckets_low, dead_buckets_low, 2),
    );
  }

  function makeComparativeSeqChart() {
    let seq_0 = makeChartArray(safOutput0.Avg_Seq);
    let seq_1 = makeChartArray(safOutput1.Avg_Seq);
    let seq_2 = makeChartArray(safOutput2.Avg_Seq);

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

  function makeComparativeCostChart() {
    // let replacement_price = 100;
    let replaced_0 = makeChartArray(safOutput0.Replaced);
    let replaced_1 = makeChartArray(safOutput1.Replaced);
    let replaced_2 = makeChartArray(safOutput2.Replaced);

    setCostChart([
      {
        id: 'Low maintenance',
        color: 'hsl(135, 70%, 50%)',
        data: replaced_0,
      },
      {
        id: 'Medium maintenance',
        color: 'hsl(347, 70%, 50%)',
        data: replaced_1,
      },
      {
        id: 'High maintenance',
        color: 'hsl(31, 70%, 50%)',
        data: replaced_2,
      },
    ]);

    console.log(safOutput0.Replaced);
    console.log(costChart);
  }

  /* Data logic changes on receiving the SAF output */
  useEffect(() => {
    processSAFData();
  }, [safOutput0]);

  useEffect(() => {
    makeComparativeSeqChart();
    makeComparativeStorageChart();
    makeComparativeCostChart();
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
        title: 'demo',
        description: 'demo',
        typology: selectedTypology.value,
        min_dbh: parseInt(selectedTypology.fixedDBH),
        max_dbh: parseInt(selectedTypology.fixedDBH),
        maintenance_scope: maintenanceType.value,
        season_growth_mean: 200,
        season_growth_var: 7,
        time_horizon: 50,
        density_per_ha: parseInt(totalTreeNumber / areaDensity),
        species: selectedTypology.species,
      });
    } else {
      payload = JSON.stringify({
        title: 'demo',
        description: 'demo',
        typology: selectedTypology.value,
        min_dbh: parseInt(selectedTypology.minDBH),
        max_dbh: parseInt(selectedTypology.maxDBH),
        maintenance_scope: maintenanceType.value,
        season_growth_mean: 200,
        season_growth_var: 7,
        time_horizon: 50,
        density_per_ha: parseInt(totalTreeNumber / areaDensity),
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
        console.log(result);
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
    let requestHeaders = new Headers();
    requestHeaders.append('accept', 'application/json');
    requestHeaders.append('Content-Type', 'application/json');
    requestHeaders.append('Access-Control-Allow-Origin', '*');
    requestHeaders.append('Authorization', 'Bearer ' + sessionStorage.token);

    const payload = JSON.stringify({
      title: 'demo',
      description: 'demo',
      in_portfolio: false,
      publish: false,
      project_dev: 'demo',
      owner_id: sessionStorage.user_id,
      activities: 'maintenance',
      area: 0,
      cost: 0,
      stage: 'demo',
      number_of_trees: totalTreeNumber,
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
    <div className='bg-white-300 font-favorit '>
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
          <div className='max-w-screen-2xl mx-auto'>
            <div className='mx-10 sm:px-6 lg:px-8'>
              <Breadcrumb />
              <div className='title-box mt-4 grid grid-cols-1 bg-indigo-600 pt-8'>
                <div className='place-self-end pr-10'>
                  <button
                    type='button'
                    className='w-lg bold-intro-sm flex justify-center rounded-full border border-transparent bg-green-600 py-2 px-4 text-white-200 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                  >
                    Want to know more?
                  </button>
                </div>
                <div className='title-text-container text-background-shape py-24'>
                  <h1 className='text-center text-indigo-600'>Demo!</h1>
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
                <EmailInput
                  span='sm:col-span-5'
                  label='email'
                  title='Email *'
                  placeholder='name@xyz.com'
                  type='general'
                  defaultValue={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </FormBlock>
              <hr className='mx-20 border-8 border-indigo-600' />
              <TypologyInput
                selectedTypology={selectedTypology}
                setSelectedTypology={setSelectedTypology}
                typologies={typologies}
                areaDensity={areaDensity}
                setAreaDensity={setAreaDensity}
                treeNumber={treeNumber}
                setTreeNumber={setTreeNumber}
                treeNumberMaintain={treeNumberMaintain}
                setTreeNumberMaintain={setTreeNumberMaintain}
                setActivityType={setActivityType}
                activityType={activityType}
                activityTypes={activityTypes}
                setMaintenanceType={setMaintenanceType}
                maintenanceType={maintenanceType}
                maintenanceTypes={maintenanceTypes}
              />
            </div>

            <div className='grid pb-20'>
              <div className='max-w-3xl place-self-center py-4 text-center'>
                <p className='book-intro-lg'>
                  This demo shows you only a short version of the form. To use the full version with
                  extended data create an account. Click &quot;
                  <span className='medium-intro-lg'>Run impact</span>&quot; to view your project
                  impact assessment.
                </p>
              </div>
              <div className='place-self-center pt-4'>
                <button
                  type='button'
                  disabled={isLoading}
                  className='bold-intro-sm inline-flex justify-center rounded-full border border-transparent bg-indigo-600 py-2 px-8 text-white-200 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                  onClick={createProjectAndGetID}
                >
                  Run impact
                </button>
              </div>
            </div>
          </div>
        ))}
      {processStage === 2 && (
        <div className='max-w-screen-2xl mx-auto sm:px-6 lg:px-8'>
          <div className='title-box mt-4 bg-dark-wood-800 py-20'>
            <h2 className='text-center text-white-200'>Scenario Analysis</h2>
            <h2 className='pt-10 text-center text-white-200'>Demo</h2>
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
          <div className='mb-20 grid grid-cols-1 rounded-3xl border border-green-600 bg-white-200 py-10 sm:grid-cols-3'>
            <div className='border-r border-green-600 px-8'>
              <div className='flex items-center justify-center'>
                <img
                  src={projectImg}
                  alt='project image'
                  className='h-36 w-36 rounded-full border-8 border-green-600'
                />
              </div>
              <p className='bold-intro-sm para-break pt-10'></p>
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
                label='Total CO2 stored in 50 years (Kgs)'
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
              <h3 className='text-dark-wood-800'>Project Cost</h3>
              <p className='book-info-sm pt-4 text-dark-wood-800'>
                Considering a combination of factors including your project typology, activity and
                location, your project average could be:
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

              <h3 className='border-t border-green-600 pt-5 text-dark-wood-800'>Risk addressed</h3>
              <p className='book-info-sm pt-4 text-dark-wood-800'>
                Considering a combination of factors including your project typology, activity and
                location, your project average could be:
              </p>
              <LocationRiskChart cc_name={listCouncils[0]} />
            </div>
          </div>

          <SectionHeader title='In detail' type='details' />
          <ResultBlock
            title='Your Project’s Impact'
            description='Considering the combination of factors including typology, activity and location, calculated via an agent-based scenario analysis framework, your project could help achieve the following potential impact over the next 50 years:'
            type='impact'
          />
          <hr className='mx-20 border-8 border-indigo-600' />
          <ResultBlock title='' description='' type='impact'>
            <div className=''>
              <ChartBlock
                maintenanceTypeName={maintenanceType.name}
                label='Total amount of Carbon (C) sequestered through biomass growth of trees or plants for the selected time window, usually per year.'
                detail='Carbon sequestration - Trees, as well as other vegetation, absorb and long-term store carbon dioxide from the air. As a result, they reduce the total amount of greenhouse gases and air pollutants in the atmosphere, mitigating  negative effects (Brack, C.L., 2002; Nowak, D.J. and Crane, D.E., 2002; Kiss, M., et al., 2015).'
              >
                <ChartMultiLine data={comparativeSeq} />
              </ChartBlock>

              <ChartBlock
                maintenanceTypeName={maintenanceType.name}
                label='Total amount of Carbon (C) is held by the alive trees or other plants.'
                detail='Total amount of Carbon (C) is held by the living trees or other plants.'
              >
                <ChartMultiLine data={comparativeStorage} />
              </ChartBlock>

              <ChartBlock
                maintenanceTypeName={maintenanceType.name}
                label='Percentage of healthy trees year on year under three maintenance scopes. Find out the percentage of healthy trees year on year.' // under three maintenance scopes'
                type='pie'
                detail='Health condition of an individual tree. Measured by healthy ratio tree canopy and reported by categories: Excellent: >.99, Good: .90, Fair: .75, Poor: .50, Critical: 0.25, Dying:.01, Dead: 0'
              >
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
                {pieChartShowType === 'low maintenance' && (
                  <div className='grid grid-cols-1 sm:grid-cols-3'>
                    <div>
                      <PieChart data={oneToFivePieLow} type={1} />
                    </div>
                    <div>
                      <PieChart data={sixToTenPieLow} type={2} />
                    </div>
                    <div>
                      <PieChart data={eleventToFiftyPieLow} type={3} />
                    </div>
                  </div>
                )}
                {pieChartShowType === 'medium maintenance' && (
                  <div className='grid grid-cols-1 sm:grid-cols-3'>
                    <div>
                      <PieChart data={oneToFivePieMed} type={1} />
                    </div>
                    <div>
                      <PieChart data={sixToTenPieMed} type={2} />
                    </div>
                    <div>
                      <PieChart data={eleventToFiftyPieMed} type={3} />
                    </div>
                  </div>
                )}

                {pieChartShowType === 'high maintenance' && (
                  <div className='grid grid-cols-1 sm:grid-cols-3'>
                    <div>
                      <PieChart data={oneToFivePieHigh} type={1} />
                    </div>
                    <div>
                      <PieChart data={sixToTenPieHigh} type={2} />
                    </div>
                    <div>
                      <PieChart data={eleventToFiftyPieHigh} type={3} />
                    </div>
                  </div>
                )}
              </ChartBlock>
            </div>
          </ResultBlock>

          <div className='h-10' />
          <ResultBlock
            title='Project Costs*'
            description='The assessment provides an estimated project costs over 50 years. *this estimate does not include any commercial mark-ups. These costs only reflect the direct infrastructural cost of your NbS project.'
            type='impact'
          >
            <ChartBlock
              maintenanceTypeName={maintenanceType.name}
              label='Your projects tree replacements'
            >
              <ChartMultiLine data={costChart} />
            </ChartBlock>
          </ResultBlock>

          <hr className='mx-20 border-8 border-indigo-600' />

          <div className='grid pb-20 pt-10'>
            <div className='max-w-3xl place-self-center py-4 text-center'>
              <p className='book-intro-lg'>
                You can now publish your project and view it in the ATLAS. Or you can save it for
                later and check the project on your profile page.
              </p>
            </div>
            <div className='place-self-center pt-4'>
              <Link to='/register'>
                <button
                  type='button'
                  className='bold-intro-sm inline-flex justify-center rounded-full border border-transparent bg-indigo-600 py-2 px-8 text-white-200 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                >
                  Register to submit
                </button>
              </Link>
              <Link to='/explore'>
                <button
                  type='button'
                  className='bold-intro-sm ml-10 rounded-full border border-gray-300 bg-dark-wood-800 py-2 px-8 text-white-200 shadow-sm hover:bg-dark-wood-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                >
                  Go to map
                </button>
              </Link>
              <button
                type='button'
                onClick={() => {
                  setProcessStage(1);
                }}
                className='bold-intro-sm ml-10 rounded-full border border-gray-300 bg-dark-wood-800 py-2 px-8 text-white-200 shadow-sm hover:bg-dark-wood-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
              >
                Back to form
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

Demo.propTypes = {
  loggedIn: PropTypes.bool,
};
