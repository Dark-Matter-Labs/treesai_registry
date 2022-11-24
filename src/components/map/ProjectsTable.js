import React from 'react';
import { useTable, useSortBy } from 'react-table';
import PropTypes from 'prop-types';

export default function ProjectsTable({ columns, data, selectProject, height }) {
  const initialState = { hiddenColumns: ['geometry.coordinates'] };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
      initialState,
    },
    useSortBy,
  );

  return (
    <div style={{ height: height }} className='flex flex-col pb-10 z-60'>
      <div className='-my-2 overflow-y-scroll styled-scrollbars'>
        <div className='inline-block min-w-full py-2 align-middle '>
          <div className='shadow ring-1 ring-green-600 ring-opacity-5 md:rounded-lg'>
            <table {...getTableProps()} className='min-w-full divide-y divide-green-600'>
              <thead className='bg-green-300'>
                <tr key={headerGroups[1].Header} {...headerGroups[1].getHeaderGroupProps()}>
                  {headerGroups[1].headers.map((column) => (
                    <th
                      key={column.accessor}
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      className={
                        column.isSorted
                          ? column.isSortedDesc
                            ? 'sort-desc whitespace-normal py-3.5 px-2 text-left book-info-sm text-dark-wood-800 bg-green-600'
                            : 'sort-asc whitespace-normal py-3.5 px-2 text-left book-info-sm text-dark-wood-800 bg-green-600'
                          : 'whitespace-normal py-3.5 px-2 text-left book-info-sm text-dark-wood-800'
                      }
                    >
                      {column.render('Header')}
                      <span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody {...getTableBodyProps()} className='bg-white-200'>
                {rows.map((row) => {
                  prepareRow(row);
                  return (
                    <tr
                      key={row.id}
                      {...row.getRowProps()}
                      onClick={() => {
                        console.log(row);
                        const mapObject = {
                          type: 'Feature',
                          geometry: {
                            type: 'Point',
                            coordinates: row.values['geometry.coordinates'],
                          },
                          properties: {
                            project_name: row.values['properties.project_name'],
                          },
                        };
                        selectProject(mapObject);
                      }}
                    >
                      {row.cells.map((cell) => {
                        return (
                          <td
                            key={cell.id}
                            {...cell.getCellProps()}
                            className='whitespace-normal px-2 py-2 book-info-sm text-dark-wood-600'
                          >
                            {cell.render('Cell')}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

ProjectsTable.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array,
  selectProject: PropTypes.func,
  height: PropTypes.string,
};
