import useSWR from 'swr';

import { getSDGIdsFromTypology } from './SDGs_helper';
import {
  get_user_projects_summary,
} from '../utils/backendCRUD';

/* Data Fetching */
const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

export function useUserProjects(id) {
  const { data, error } = useSWR(id, get_user_projects_summary, swrOptions);

  return {
    userProjectList: data,
    isLoading: !error && !data,
    isError: error,
  };
}


/* Logic */

function getUniqueElements(List) {
  const uniqueElements = [...new Set(List)];
  return uniqueElements;
}

/* Data processing */

function getAllTypologies(projectList) {
  const typologies = projectList.map((project) => {
    return project.typology;
  });
  return typologies;
}

export function getTotalTrees(projectList) {
  const totalTrees = projectList.reduce((accumulator, project) => {
    return accumulator + project.number_of_trees;
  }, 0);
  return totalTrees;
}

export function getTotalCarbonSeq(projectList) {
  let totalCarbonSeq = 0;
  for (let i = 0; i < projectList.length; i++) {
    totalCarbonSeq += projectList[i].Seq;
  }
  return totalCarbonSeq.toFixed(2);
}

export function getTotalCarbonStorage(projectList) {
  let totalCarbonStorage = 0;
  for (let i = 0; i < projectList.length; i++) {
    totalCarbonStorage += projectList[i].Storage;
  }
  return totalCarbonStorage.toFixed(2);
}

/* Chart related functions */
export function processForBudgetChart(projectList) {
  const budgetData = projectList.map((project) => {
    return {
      id: project.id,
      name: project.title,
      budget: project.cost,
    };
  });
  return budgetData;
}

export function processRibaChart(projectList) {
  // export function to count how many projects are in each RIBA stage
  const RIBACount = projectList.reduce((accumulator, project) => {
    const stage = project.stage;
    if (accumulator[stage]) {
      accumulator[stage] += 1;
    } else {
      accumulator[stage] = 1;
    }
    return accumulator;
  }, {});

  // export function to convert RIBA count object to array of objects
  const RIBAData = Object.keys(RIBACount).map((key) => {
    return {
      id: key,
      stage: RIBACount[key],
    };
  });

  return RIBAData;
}

export function listSDGsFromProjects(projectList) {
  // List all typologies from projects
  const projectTypologiesArray = getAllTypologies(projectList);
  // List all unique typologies
  const uniqueTypologies = getUniqueElements(projectTypologiesArray);
  // List all SDGs from unique typologies
  const SDGIds = uniqueTypologies.map((typology) => {
    return getSDGIdsFromTypology(typology);
  });
  // Flatten array of arrays and remove duplicates
  const uniqueSDGIds = getUniqueElements(SDGIds.flat());
  return uniqueSDGIds;
}
