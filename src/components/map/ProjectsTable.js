import React from 'react';
import PropTypes from 'prop-types';

export default function ProjectsTable(props) {
  return (
    <div className='flex flex-col h-[30vh] styled-scrollbars'>
      <div className='-my-2 -mx-4 overflow-y-scroll sm:-mx-6 lg:-mx-8'>
        <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
          <div className='shadow ring-1 ring-black ring-opacity-5 md:rounded-lg'>
            <table className='min-w-full divide-y divide-gray-300'>
              <thead className='bg-gray-50'>
                <tr>
                  <th
                    scope='col'
                    className='whitespace-normal py-3.5 px-2 text-left text-sm font-semibold text-gray-900'
                  >
                    Code
                  </th>
                  <th
                    scope='col'
                    className='whitespace-normal px-2 py-3.5 text-left text-sm font-semibold text-gray-900'
                  >
                    Project name
                  </th>
                  <th
                    scope='col'
                    className='whitespace-normal px-2 py-3.5 text-left text-sm font-semibold text-gray-900'
                  >
                    Project Developer
                  </th>
                  <th
                    scope='col'
                    className='whitespace-normal px-2 py-3.5 text-left text-sm font-semibold text-gray-900'
                  >
                    Project city
                  </th>
                  <th
                    scope='col'
                    className='whitespace-normal px-2 py-3.5 text-left text-sm font-semibold text-gray-900'
                  >
                    Stage
                  </th>
                  <th
                    scope='col'
                    className='whitespace-normal px-2 py-3.5 text-left text-sm font-semibold text-gray-900'
                  >
                    Typologies
                  </th>
                  <th
                    scope='col'
                    className='whitespace-normal px-2 py-3.5 text-left text-sm font-semibold text-gray-900'
                  >
                    Activities
                  </th>
                  <th
                    scope='col'
                    className='whitespace-normal px-2 py-3.5 text-left text-sm font-semibold text-gray-900'
                  >
                    Carbon sequestration (Kgs)
                  </th>
                  <th
                    scope='col'
                    className='whitespace-normal px-2 py-3.5 text-left text-sm font-semibold text-gray-900'
                  >
                    Carbon storage (Kgs)
                  </th>
                  <th
                    scope='col'
                    className='whitespace-normal px-2 py-3.5 text-left text-sm font-semibold text-gray-900'
                  >
                    Location based score
                  </th>
                  <th
                    scope='col'
                    className='whitespace-normal px-2 py-3.5 text-left text-sm font-semibold text-gray-900'
                  >
                    Estimated project costs
                  </th>
                  <th
                    scope='col'
                    className='whitespace-normal px-2 py-3.5 text-left text-sm font-semibold text-gray-900'
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200 bg-white '>
                {props.data.map((project) => (
                  <tr
                    key={project.properties.id}
                    onClick={() => {
                      props.selectProject(project);
                    }}
                  >
                    <td className='whitespace-normal px-2 py-2 text-sm text-gray-500'>
                      {project.properties.id}
                    </td>
                    <td className='whitespace-normal px-2 py-2 text-sm text-gray-900'>
                      {project.properties.project_name}
                    </td>
                    <td className='whitespace-normal px-2 py-2 text-sm text-gray-900'>
                      {project.properties.project_developer}
                    </td>
                    <td className='whitespace-normal px-2 py-2 text-sm text-gray-500'>
                      {project.properties.project_city}
                    </td>
                    <td className='whitespace-normal px-2 py-2 text-sm text-gray-500'>
                      {project.properties.stage}
                    </td>
                    <td className='whitespace-normal px-2 py-2 text-sm text-gray-500'>
                      {project.properties.typology}
                    </td>
                    <td className='whitespace-normal px-2 py-2 text-sm text-gray-500'>
                      {project.properties.activity}
                    </td>
                    <td className='whitespace-normal px-2 py-2 text-sm text-gray-500'>1234</td>
                    <td className='whitespace-normal px-2 py-2 text-sm text-gray-500'>1234</td>
                    <td className='whitespace-normal px-2 py-2 text-sm text-gray-500'>High</td>
                    <td className='whitespace-normal px-2 py-2 text-sm text-gray-500'>
                      {project.properties.project_budget}
                    </td>
                    <td className='whitespace-normal px-2 py-2 text-sm text-gray-500'>In Review</td>
                  </tr>
                ))}
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
  selectProject: PropTypes.func,
};
