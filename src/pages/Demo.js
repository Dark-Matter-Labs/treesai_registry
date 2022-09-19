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
import CostBox from '../components/CostBox';
// Images
import projectImg from '../images/project-default.png';
// Charts
import ChartMultiLine from '../components/charts/ChartMultiLine';
import PieChart from '../components/charts/PieChart';

import { saf_data } from '../utils/saf_data_model';

import { get_typologies, get_maintenance_scopes } from '../utils/saf_utils';
import { get_activity_types, get_piechart_types } from '../utils/project_details';

import { Link } from 'react-router-dom';

// Demo user creds
import demoUserData from '../utils/demo_user_creds.json';

// set SAF parameters
const typologies = get_typologies();
const maintenanceTypes = get_maintenance_scopes();

// set project parameters
const activityTypes = get_activity_types();
const piechartTypes = get_piechart_types();

/* Demo user related things */

const loginUser = async () => {
  const getTokenRequestHeaders = new Headers();
  getTokenRequestHeaders.append('accept', 'application/json');
  getTokenRequestHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

  const getTokenPayload = {
    username: demoUserData.email,
    password: demoUserData.password,
  };

  let formBody = [];
  for (var property in getTokenPayload) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(getTokenPayload[property]);
    formBody.push(encodedKey + '=' + encodedValue);
  }
  formBody = formBody.join('&');

  const getTokenRequestOptions = {
    method: 'POST',
    headers: getTokenRequestHeaders,
    body: formBody,
    redirect: 'follow',
  };

  await fetch(process.env.REACT_APP_API_ENDPOINT + '/api/v1/token', getTokenRequestOptions)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      toast.error('Something went wrong');
      throw new Error('Something went wrong');
    })
    .then((result) => {
      sessionStorage.setItem('token', result.access_token);

      const getUserRequestHeaders = new Headers();
      getUserRequestHeaders.append('accept', 'application/json');
      getUserRequestHeaders.append('Content-Type', 'application/json');
      getUserRequestHeaders.append('Access-Control-Allow-Origin', '*');
      getUserRequestHeaders.append('Authorization', 'Bearer ' + sessionStorage.token);

      const getUserRequestOptions = {
        method: 'GET',
        headers: getUserRequestHeaders,
        redirect: 'follow',
      };

      fetch(process.env.REACT_APP_API_ENDPOINT + '/api/v1/users/me/', getUserRequestOptions)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          toast.error('Something went wrong');
          throw new Error('Something went wrong');
        })
        .then((result) => {
          sessionStorage.setItem('user_id', JSON.stringify(result.id));
          sessionStorage.setItem('user_name', JSON.stringify(result.name));
          toast.success('Welcome ' + result.name);
          console.log('logged in!');
        })
        .catch((error) => console.log('error', error));
    })
    .catch((error) => console.log('error', error));
};

/* End Demo user related things */

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
  const [projectLength] = useState(60); // 5 years
  // Cost variables

  const [totalCost] = useState(500);
  const [costOverSelectedTime] = useState(321);

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

  useEffect(() => {
    makeComparativeSeqChart();
    makeComparativeStorageChart();
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

    // Login to the test user credentials 
    loginUser();

    // Rest of the create a project function
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
      <NavBar loggedIn={props.loggedIn} current='demo' />
      {processStage === 1 &&
        (isLoading ? (
          <SAFLoadingScreen />
        ) : (
          <div className='max-w-screen-2xl mx-auto'>
            <div className='mx-10 sm:px-6 lg:px-8'>
              <Breadcrumb title='Demo' />
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
                  className='h-48 w-48 rounded-full border-8 border-green-600'
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
                        <tbody className='divide-y divide-white-200 bg-gray-200'>
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
              <h3 className='text-dark-wood-800'>Your project’s cost</h3>
              <p className='book-info-sm pt-4 text-dark-wood-800'>
                The following ranges provide an estimated project costs over different time-spans:
              </p>
              <p className='text-green-600'>Total cost for 50 years (GBP per m2)</p>
              <CostBox
                months={projectLength}
                costMonths={costOverSelectedTime}
                costTotal={totalCost}
              />
              <p className='book-info-sm pt-4 mb-4 text-dark-wood-800'>
                These estimates do not include any commercial mark-ups and only reflect the direct
                costs of building and maintaining your NbS project.
              </p>
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
          </ResultBlock>

          <div className='h-10' />

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

Demo.propTypes = {
  loggedIn: PropTypes.bool,
};
