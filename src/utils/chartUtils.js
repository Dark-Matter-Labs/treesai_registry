/* Pie Chart */

export function makePieOutput(alive, dead, critical, bucket) {
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

/* Multiline chart */

export function formatDataForMultilineChart(Line1, Line2, Line3) {
  return [
    {
      id: 'Low maintenance',
      color: 'hsl(135, 70%, 50%)',
      data: Line1,
    },
    {
      id: 'Medium maintenance',
      color: 'hsl(347, 70%, 50%)',
      data: Line2,
    },
    {
      id: 'High maintenance',
      color: 'hsl(31, 70%, 50%)',
      data: Line3,
    },
  ];
}
