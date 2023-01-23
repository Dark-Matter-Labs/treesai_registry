import useSWR from 'swr';

import { getSDGIdsFromTypology } from './SDGs_helper';
import { get_projects_summary } from '../utils/backendCRUD';
import { get_stages } from '../utils/map_filters';

/* Data Fetching */
const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

export function useUserProjects(id) {
  const { data, error } = useSWR(id, get_projects_summary, swrOptions);

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

function renameTypology(typology) {
  const typologyDict = {
    individual_street_trees: 'Street Trees',
    park: 'Urban Park',
    forest: 'Woodland',
  };
  return typologyDict[typology];
}

/* Chart related functions */
export function processForBudgetChart(projectList) {
  // sum the total budget for each typology

  const budgetData = [];

  projectList.forEach((project) => {
    const index = budgetData.findIndex((item) => item.typology === project.typology);
    if (index === -1) {
      budgetData.push({
        typology: project.typology,
        budget: project.cost,
      });
    } else {
      budgetData[index].budget += project.cost;
    }
  });

  // rename typology
  budgetData.forEach((item) => {
    item.typology = renameTypology(item.typology);
  });

  return budgetData;
}

/* RIBA Chart */
const RIBAStages = get_stages();

function compareLowerCaseStrings(a, b) {
  return a.toLowerCase() === b.toLowerCase();
}

function ribaNameToID(ribaName) {
  const stage = RIBAStages.find((stage) => compareLowerCaseStrings(stage.label, ribaName));
  return stage ? stage.id : undefined;
}

function countProjectbyRIBAStage(projectList) {
  const RIBACount = projectList.reduce((accumulator, project) => {
    const stage = project.stage;
    if (accumulator[stage]) {
      accumulator[stage] += 1;
    } else {
      accumulator[stage] = 1;
    }
    return accumulator;
  }, {});
  return RIBACount;
}

export function processRibaChart(projectList) {
  // export function to count how many projects are in each RIBA stage
  const RIBACount = countProjectbyRIBAStage(projectList);

  // export function to convert RIBA count object to array of objects, remove undefined
  const RIBAData = Object.keys(RIBACount)
    .map((key) => {
      const id = ribaNameToID(key);
      if (id) {
        return {
          RIBAid: id,
          name: key,
          projectsNumber: RIBACount[key],
        };
      } else {
        return undefined;
      }
    })
    .filter((item) => item !== undefined);

  // sort object by RIBA stage
  const sortedRIBAData = RIBAData.sort((a, b) => a.RIBAid - b.RIBAid);

  return sortedRIBAData;
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
