import React from 'react';

const slide_texts = {
  projectLength: {
    text: (
      <p className='book-intro-md text-dark-wood-800'>
        While we hope your project will flourish for years, decades (and even centuries!) to come -
        in order to understand better the costs, please let us know how many months your request for
        funding is meant to cover.
      </p>
    ),
    title: 'Expected length',
  },
  projectStage: {
    text: (
      <div className='book-intro-md text-dark-wood-800'>
        <p>
          To better understand the NbS projects and set a timeline of activities, Trees AI has
          defined the 7 stages that these projects go through based on the <u>RIBA Plan of Work</u>
        </p>
        <p className='mt-2'>
          <ul>
            <li>1 Strategic Development: definition of a project, the preparation and briefing</li>
            <li>2 Pre-planning Application: concept design and spatial coordination</li>
            <li>3 Post-Planning Application: technical design of project</li>
            <li>4 Construction: construction and commissioning of the project</li>
            <li>5 Maintenance & Monitoring : maintenance and monitoring of the project</li>
            <li>6 Completed / Archived: no more activities</li>
          </ul>
        </p>
      </div>
    ),
    title: 'Current Stage',
  },
  'Select the relevant typology': {
    text: (
      <div className='book-intro-md text-dark-wood-800'>
        <p>
          As you’ll see from the questions in this section, we aren’t asking for a lot of detailed
          information.
        </p>
        <p>
          While we know that in order to model impact accurately we need information on each tree,
          each specific activity, the existing level of pollution (to name a few data points) this
          is our MVP where you can perform <b>simple modelling</b> rapidly.
        </p>
        <p>
          <b>Learn More</b> about our modelling here.
        </p>
      </div>
    ),
    title: 'Impact Inputs',
  },
  typologies: {
    text: (
      <div className='book-intro-md text-dark-wood-800'>
        <p>
          To better understand a project we have developed a classification system, with typologies
          to enable the rapid understanding of a project’s existing and planned characteristics,
          thus a faster modelling of costs and impacts.
        </p>
        <p>Each typology is defined in terms of its biophysical features. </p>
        <p>
          We divide these features into three main categories that provide different functions to
          the urban climate; vegetation layers, ground surfaces and building structures.
        </p>
      </div>
    ),
    title: 'Typologies',
  },
  simple: {
    text: (
      <div className='book-intro-md text-dark-wood-800'>
        <p>
          In order to model impacts of your project we run simulations under different conditions to
          understand the dynamics of its development and associated benefits.
        </p>
        <p>
          In order to provide rapid estimations to projects at varying stages we have created a
          methodology of simple modelling, where assessment is through standardised inputs of
          features based on their typology, activities and size.
        </p>
        <p>
          For the advanced modelling, our Green Urban Scenarios Framework is based on a digital
          representation, or digital twin, of the project, on which we can conduct diverse granular
          computational experiments under a specific geophysical context.
        </p>
        <p>
          <span className='bold-intro-md'>Learn more</span> here.
        </p>
      </div>
    ),
    title: 'What do we mean by simplified modelling',
  },
  totalArea: {
    text: (
      <div className='book-intro-md text-dark-wood-800'>
        <p>
          In order to model the impact of your Woodland or Park, we are asking for the project area
          in order to calculate density.
        </p>
        <p>
          This is because the growth, health and impact potential of your project depends on
          density.
        </p>
        <p>
          In order to measure the area please use the boundaries of the land you are hoping to plant
          on. This platform is in Beta and so we are only modelling certain typologies, and
          therefore we have set a minimum boundary at 50sqm.
        </p>
      </div>
    ),
    title: 'Project Area',
  },
  species: {
    text: (
      <div className='book-intro-md text-dark-wood-800'>
        <p>
          While we recognise that species is one of the most important characteristic in order to do
          modelling of many impacts, we have yet to integrate this into our front-end.
        </p>
        <p>
          Therefore, for our <b>simple</b> models we use the <b>simplified</b> inputs of evergreen/
          deciduous.
        </p>
        <p>
          However, as we have capacity to incorporate this into our models, please share details at
          the end of the form.
        </p>
      </div>
    ),
    title: 'Species Composition',
  },
  activities: {
    text: (
      <div className='book-intro-md text-dark-wood-800'>
        <p>
          Developing, and stewarding, your project will require a range of activities - see the list
          below for examples. Please let us know what you plan to be doing:
        </p>
        <ul>
          <li>Planting</li>
          <li>Landscaping</li>
          <li>Early care</li>
          <li>Systematic pruning</li>
          <li>Reduced removal</li>
          <li>Watering</li>
          <li>Cleaning waste from tree pit</li>
          <li>Weeding</li>
          <li>Mulching and soil cultivation</li>
          <li>Installing trees guards</li>
          <li>Prevent tree felling</li>
        </ul>
      </div>
    ),
    title: 'Activities',
  },
  maintenance: {
    text: (
      <div className='book-intro-md text-dark-wood-800'>
        <p>
          Maintenance is a critical part of your project’s ability to deliver long-term impact. This
          is an important factor in modelling ecosystem services since it determines the number of
          living trees across the years.
        </p>
        <p>
          Maintenance involves a range of activities such as inspecting, watering, pruning etc.
          However, in order to run the simplified model, we have pre-defined three maintenance
          scopes, based on the rate of tree replacement. As this determines the number of living
          trees, it is important for impact modelling:
        </p>
        <p>The three maintenance scopes are:</p>
        <ol>
          <li>
            <b>Low</b>: A dead tree will not be replaced.
          </li>
          <li>
            <b>Mid</b>: A dead tree has a 30% chance of being replaced every year (this means the
            replacement chance over the duration of the project is cumulatively is higher than 30%).
          </li>
          <li>
            <b>High</b>: All trees that die are replaced the following year.
          </li>
        </ol>
      </div>
    ),
    title: 'Maintenance Level',
  },
  status: {
    text: (
      <div className='book-intro-md text-dark-wood-800'>
        <p>The different status are:</p>
        <ol>
          <li>
            <b>(1) Project submitted:</b> this means you’re project has been submitted to our
            registry
          </li>
          <li>
            <b>(2) Under review:</b> it is being reviewed by the TreesAI team, with stakeholders,
            for selection into a possible portfolio
          </li>
          <li>
            <b>(3) Awaiting financing:</b> your project has been selected into a portfolio has been
            constructed and is in the process of capital raising
          </li>
          <li>
            <b>(4) Financed / under-construction:</b> your project has received funding and you are
            therefore developing it
          </li>
          <li>
            <b>(5) Maintenance/ monitoring:</b> your project’s development is complete and is being
            monitored and maintained
          </li>
          <li>
            <b>(6) Completed/ Archived:</b> no more activities on the project.
          </li>
        </ol>
      </div>
    ),
    title: 'Project status',
  },
  lbs: {
    text: (
      <div className='book-intro-md text-dark-wood-800'>
        <p>
          The spider diagram shows different indicators, some of which are composite of various
          other indicators that have been weighted and normalised. For example:
        </p>
        <ol>
          <li>Risk of flooding: uses a mixture of historic rainfall, slope and land cover</li>
          <li>
            Social vulnerability: uses Scottish Index of Multiple Deprivations and residential
            density
          </li>
          <li>Air pollution: uses PM2.5 index and PM10 index</li>
        </ol>
        <p>
          The remaining four are either open data sets or have been shared for the purpose of the
          TreesAI platform.
        </p>
        <ol>
          <li>Canopy cover: uses canopy cover</li>
          <li>Urban Heat Island effect: average land temperature</li>
          <li>
            Lack of access to green open spaces: % of area deprived of quality green open space at a
            400m walking distance
          </li>
          <li>Habitat connectivity: % of ecological network area</li>
        </ol>
        <p>
          We will be publishing detailed information on the indicators, where they came from, why we
          picked them and how they’ve been weighted in our Portfolio Strategy Doc in the new year.
        </p>
      </div>
    ),
    title: '',
  },
  biomass: {
    text: (
      <div className='book-intro-md text-dark-wood-800'>
        <p>
          In order to provide estimations of impact, we need to consider the biomass of your project
          over time, as this is strongly (and positively) correlated with the benefits of your
          project.
        </p>
        <p>
          These benefits, as they are related to growth, only peak after 50 years - however our
          short-term approach means fifty percent of urban trees don’t survive after ten years of
          life.
        </p>
        <p>
          We therefore take a long-term horizon, helping to demonstrate that, in order for our
          cities to reach their climate targets, we need to invest in our NbS projects over 50
          years.
        </p>
      </div>
    ),
    title: 'Why we model biomass over 50 years? ',
  },
  abm: {
    text: (
      <div className='book-intro-md text-dark-wood-800'>
        <p>
          From the data you have provided us with we create an agent based model - a stochastic
          model built from the bottom up.
        </p>
        <p>
          By deploying a stochastic model, we can predict impacts that account for unpredictability
          - by running a series of simulatons.
        </p>
        <p>
          And by ‘bottom up’ we mean these simulations are built in order to study the interactions
          between ‘agents’ - where an agent are information-processing entities such as trees, bees,
          birds, residents, policies etc.
        </p>
        <p>
          We have chosen this approach due to the complexity of nature, and the increasingly likely
          extreme weather events will have a strong impact on the dynamics of your NbS project.{' '}
        </p>
        <p>
          <b>Learn more </b>here.
        </p>
      </div>
    ),
    title: 'Agent-based Modelling',
  },
};

export function get_slide_texts() {
  return slide_texts;
}
