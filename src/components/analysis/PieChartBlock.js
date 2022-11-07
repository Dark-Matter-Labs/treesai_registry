import React, { useState, useEffect } from 'react';

import toast from 'react-hot-toast';
import PropTypes from 'prop-types';

import ChartBlock from './ChartBlock';
import Dropdown from '../form/Dropdown';
import PieChart from '../charts/PieChart';

import { saf_data } from '../../utils/saf_data_model';
import { sumRange } from '../../utils/objUtils';
import { makePieOutput } from '../../utils/chartUtils';
import { get_piechart_types } from '../../utils/project_details';

const piechartTypes = get_piechart_types();

export default function PieChartBlock(props) {
  // base data
  const [safOutput0, setSafOutput0] = useState(saf_data);
  const [safOutput1, setSafOutput1] = useState(saf_data);
  const [safOutput2, setSafOutput2] = useState(saf_data);
  const [maintenanceTypeName, setMaintenanceTypeName] = useState('medium');
  // show type
  const [pieChartShowType, setPieChartShowType] = useState('high maintenance');
  // for display
  const [oneToFivePie, setOneToFivePie] = useState([]);
  const [sixToTenPie, setSixToTen] = useState([]);
  const [eleventToFiftyPie, setEleventToFiftyPie] = useState([]);

  useEffect(() => {
    setSafOutput0(props.safOutput0);
    setSafOutput1(props.safOutput1);
    setSafOutput2(props.safOutput2);
    setMaintenanceTypeName(props.maintenanceTypeName);
  }, [props]);

  /* Pie Diagram */

  function makePieChart(safOutput = saf_data) {
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

  return (
    <>
      <ChartBlock
        maintenanceTypeName={maintenanceTypeName}
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
    </>
  );
}

PieChartBlock.propTypes = {
  safOutput0: PropTypes.object,
  safOutput1: PropTypes.object,
  safOutput2: PropTypes.object,
  maintenanceTypeName: PropTypes.string,
};
