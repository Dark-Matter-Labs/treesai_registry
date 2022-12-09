function formatLargeNumber(number) {
  return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

function formatTypology(typology) {
  return typology.replace(/_/g, ' ');
}

function formatPublished(published) {
  return published ? 'Yes' : 'No';
}

function formatCost(cost) {
  return '£' + cost.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

function formatLatLng(latlng) {
  return latlng.toFixed(5);
}

const sharedColumns = [
  {
    Header: 'Project name',
    accessor: 'title',
  },
  {
    Header: 'Area',
    accessor: 'area',
  },
  {
    Header: 'Number of trees',
    accessor: 'number_of_trees',
  },
  {
    Header: 'Cost',
    accessor: 'cost',
    Cell: ({ value }) => formatCost(value),
  },
  {
    Header: 'Stage',
    accessor: 'stage',
  },
  {
    Header: 'Activities',
    accessor: 'activities',
  },
  {
    Header: 'Developer',
    accessor: 'project_dev',
  },
  {
    Header: 'Carbon sequestation (Kgs)',
    accessor: 'Seq',
    Cell: ({ value }) => formatLargeNumber(value),
  },
  {
    Header: 'Carbon Storage (Kgs)',
    accessor: 'Storage',
    Cell: ({ value }) => formatLargeNumber(value),
  },
];

const accountTablColumns = [
  {
    Header: 'projects',
    columns: sharedColumns.concat([
      {
        Header: 'Published',
        accessor: 'publish',
        Cell: ({ value }) => formatPublished(value),
      },
      {
        Header: 'Typology',
        accessor: 'typology',
        Cell: ({ value }) => formatTypology(value),
      },
    ]),
  },
];

const exploreTableColumns = [
  {
    Header: 'projects',
    columns: sharedColumns.concat([
      {
        Header: 'Latitude',
        accessor: 'lat',
        Cell: ({ value }) => formatLatLng(value),
      },
      {
        Header: 'Longitude',
        accessor: 'lng',
        Cell: ({ value }) => formatLatLng(value),
      },
    ]),
  },
];

export function getAccountTableColumns() {
  return accountTablColumns;
}

export function getExploreTableColumns() {
  return exploreTableColumns;
}
