import React from 'react';

const slide_texts = {
  projectLength: {
    text: (
      <p className='book-intro-md text-dark-wood-800'>
        While we hope your project will flourish for years,{' '}
        <span className='bold-intro-md'>decades</span> (and even centuries!) to come - in order to
        understand better the costs, please let us know how many months your request for funding is
        meant to cover.
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
      </div>
    ),
  },
};

export function get_slide_texts() {
  return slide_texts;
}
