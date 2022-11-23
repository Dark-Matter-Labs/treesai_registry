
import { getLastKeyInObj } from './objUtils';


export function getTotalTrees(projectList) {
  const totalTrees = projectList.reduce((accumulator, project) => {
    return accumulator + project.number_of_trees;
  }, 0);
  return totalTrees;
}

export function getTotalCarbonSeq(projectRuns) {
  let totalCarbonSeq = 0;
  for (let i = 0; i < projectRuns.length; i++) {
    // Temporary check to not add carbon from all 3 runs, later to use user's chosen maintenance level
    if (i % 3 === 0) {
      totalCarbonSeq +=
        projectRuns[i].output.Cum_Seq[getLastKeyInObj(projectRuns[i].output.Cum_Seq)];
    }
  }

  return totalCarbonSeq.toFixed(2);
}

export function getTotalCarbonStorage(projectRuns) {
  let totalCarbonStorage = 0;
  for (let i = 0; i < projectRuns.length; i++) {
    // Temporary check to not add carbon from all 3 runs, later to use user's chosen maintenance level
    if (i % 3 === 0) {
      totalCarbonStorage +=
        projectRuns[i].output.Storage[getLastKeyInObj(projectRuns[i].output.Storage)];
    }
  }
  return totalCarbonStorage.toFixed(2);
}

export function processForBudgetChart(projectList) {
  const budgetData = projectList['projects'].map((project) => {
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
  const RIBACount = projectList['projects'].reduce((accumulator, project) => {
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