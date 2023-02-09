import { Link as ScrollLink } from 'react-scroll';
import PropTypes from 'prop-types';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import teamImage from '../images/team.jpg';
import carlottaImg from '../images/Carlotta.png';
import ozImg from '../images/Oz.png';
import kostaImg from '../images/Kosta.png';
import rajImg from '../images/Raj.png';
import roniImg from '../images/Roni.png';
import SectionHeader from '../components/SectionHeader';

const publications = [
  {
    id: 0,
    title: 'TreesAI - Blue Paper',
    href: 'https://drive.google.com/file/d/127XlBUlQ-9_llwJawalifxWoqbBxG8ha/view?usp=sharing',
    date: 'Dec 17, 2021',
    datetime: '2021-12-17',
    category: { name: 'Paper' },
    imageUrl: 'assets/Bluepaper.png',
    preview: 'A platform to value and invest in Nature: Carbon and beyond.',
    readingLength: '2 hours',
  },
  {
    id: 1,
    title: 'Trees as Infrastructure Report 1',
    href: 'https://provocations.darkmatterlabs.org/trees-as-infrastructure-1dd94e1cfedf',
    date: 'Feb 10, 2020',
    datetime: '2020-02-10',
    category: { name: 'Report' },
    imageUrl: 'https://miro.medium.com/max/2000/1*gEpd55UAV-i1GUi3rFTr7g.jpeg',
    preview: 'Why municipalities are struggling to reach tree-planting targets',
    readingLength: '15 min',
  },
  {
    id: 2,
    title: 'Trees as Infrastructure Report 2',
    href: 'https://provocations.darkmatterlabs.org/trees-as-infrastructure-aa141acdf227',
    date: 'Mar 6, 2020',
    datetime: '2020-03-6',
    category: { name: 'Report' },
    imageUrl: 'https://miro.medium.com/max/3840/1*_tUcwA67m11u_UI54xR15Q.jpeg',
    preview:
      'A proposition for supporting cities to transition towards resilient urban forest infrastructures',
    readingLength: '15 min',
  },
  {
    id: 3,
    title:
      'Delivering urban Nature-based Solutions in Scotland at Scale: Growing regenerative cities',
    href: 'https://drive.google.com/file/d/1OdtF45v59Zh7TDDrNRifnp4e6Cl4OIK0/view',
    date: 'Nov 27, 2020',
    datetime: '2020-02-12',
    category: { name: 'Report' },
    imageUrl: 'assets/nature_scot.jpg',
    preview: 'Growing regenerative cities',
    readingLength: '11 min',
  },
];

const videos = [
  {
    id: 0,
    title: 'Carlotta Conte presenting at COP26',
    href: 'https://youtu.be/pfVScBgCU9A',
    date: 'Nov 6, 2021',
    datetime: '2021-11-06',
    category: { name: '19:12' },
    imageUrl: 'assets/COPbanner.png',
    preview: '',
    readingLength: 'Dark Matter Labs',
  },
  {
    id: 1,
    title: 'TreesAI presenting at Mayday C4 events: Deforestation and Carbon Offsets',
    href: 'https://www.youtube.com/watch?v=j9HotCSqh_M',
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    category: { name: '1:24:01' },
    imageUrl: 'assets/video-1.png',
    preview: '',
    readingLength: 'Mayday C4',
  },
  {
    id: 2,
    title: 'What technology can do for sustainability - The Google.org Impact Challenge on Climate',
    href: 'https://www.youtube.com/watch?t=75&v=Y1X3BzuNgdA&feature=youtu.be',
    date: 'Jul 6, 2021',
    datetime: '2021-7-6',
    category: { name: '6:20' },
    imageUrl: 'assets/video-2.png',
    preview:
      'The Google.org Impact Challenge on Climate commits €10M to fund bold ideas that aim to use technology to accelerate Europe’s progress toward a greener, more resilient future.',
    readingLength: 'Euractiv',
  },
  {
    id: 3,
    title: 'Interview with Kate Raworth at Trees as Infrastructure Workshop',
    href: 'https://vimeo.com/showcase/6628565/video/377023491',
    date: '2019',
    datetime: '2019-12-3',
    category: { name: '45:43' },
    imageUrl: 'assets/video-3.png',
    preview:
      'This is the first public workshop of the research project ‘Trees as Infrastructure’ by Dark Matter Labs in partnership with EIT Climate-KIC.',
    readingLength: 'Dark Matter Labs',
  },
  {
    id: 4,
    title: 'Interview with Mathias Disney at Trees as Infrastructure Workshop',
    href: 'https://vimeo.com/showcase/6628565/video/377020523',
    date: '2019',
    datetime: '2019-12-3',
    category: { name: '5:31' },
    imageUrl: 'assets/video-4.png',
    preview: '',
    readingLength: 'Dark Matter Labs',
  },
  {
    id: 5,
    title: 'Interview with Michelle Zucker at Trees as Infrastructure Workshop',
    href: 'https://vimeo.com/showcase/6628565/video/379088421',
    date: '2019',
    datetime: '2019-12-3',
    category: { name: '2:05' },
    imageUrl: 'assets/video-5.png',
    preview: '',
    readingLength: 'Dark Matter Labs',
  },
  {
    id: 6,
    title: 'Interview with Jim C. Smith at Trees as Infrastructure Workshop',
    href: 'https://vimeo.com/showcase/6628565/video/381168491',
    date: '2019',
    datetime: '2019-12-3',
    category: { name: '3:25' },
    imageUrl: 'assets/video-6.png',
    preview: '',
    readingLength: 'Dark Matter Labs',
  },
];

const press = [
  {
    title: 'Beyond Carbon: Why We Can’t Plant Our Way Out Of Climate Change',
    href: 'https://www.nadinagalle.com/podcasts/s3e7-beyond-carbon-why-we-cant-plant-our-way-out-of-climate-change-with-carlotta-conte-of-dark-matter-labs',
    description: 'Internet of Nature Podcast by Dr. Nadina Galle',
    date: 'February 16, 2022',
    datetime: '2022-02-16',
  },
  {
    title: 'Glasgow Green Deal',
    href: 'https://www.glasgow.gov.uk/councillorsandcommittees/viewSelectedDocument.asp?c=P62AFQDNZLDNNTDNDN',
    description: 'Glasgow city council',
    date: 'December 20, 2021',
    datetime: '2021-12-20',
  },
  {
    title: 'Three innovative solutions for rewilding our cities',
    href: 'https://twitter.com/wef/status/1466452246724587520',
    description: 'World Economic Forum',
    date: 'December 2, 2021',
    datetime: '2021-12-2',
  },
  {
    title: 'Financing Urban Forests for Environmental and Social Benefits',
    href: 'https://www.morganstanley.com/ideas/tree-ai-nature-urban-infrastructure',
    description: 'Morgan Stanley',
    date: 'November 11, 2021',
    datetime: '2021-11-10',
  },
  {
    title: 'DM Note #5: Mission Holding at DM: The Case of Nature-based Solutions',
    href: 'https://provocations.darkmatterlabs.org/dm-note-5-50e46540dd05',
    description:
      'DM Note #5 is a reflection on how we build and organize missions internally, taking Nature-based Solutions as a case study.',
    date: 'July 21, 2021',
    datetime: '2021-07-21',
  },
  {
    title: 'Inaugural Morgan Stanley Sustainable Solutions Collaborative Cohort',
    href: 'https://www.morganstanley.com/ideas/sustainable-solutions-collaborative-winners-2021',
    description: 'Morgan Stanley',
    date: 'June 9, 2021',
    datetime: '2021-06-9',
  },
  {
    title: 'Trees As Infrastructure インフラストラクチャーとしての街路樹 後編',
    href: 'https://note.com/actant_forest/n/nb2b3d470c2a8',
    description: 'TreesAI translated in Japanese',
    date: 'April 21, 2021',
    datetime: '2021-04-21',
  },
  {
    title: 'These 11 organizations are building a greener Europe',
    href: 'https://blog.google/outreach-initiatives/sustainability/these-11-organizations-are-building-greener-europe/',
    description: 'Google.org',
    date: 'April 13, 2021',
    datetime: '2021-04-13',
  },
  {
    title: 'Building Vitality – Regenerative Construction',
    href: 'https://demoshelsinki.fi/julkaisut/building-vitality-regenerative-construction/',
    description: 'Demos Helsinki',
    date: '16 March, 2021',
    datetime: '2021-03-16',
  },
  {
    title: 'These 20 innovations are helping us to conserve, restore and grow 1 trillion trees',
    href: 'https://www.weforum.org/agenda/2020/09/world-economic-forum-innovations-conserve-preserve-trillion-trees/',
    description: 'World Economic Forum',
    date: 'Sep 30, 2020',
    datetime: '2020-09-30',
  },
];

export default function Learn({ loggedIn }) {
  return (
    <div className='bg-white-300 '>
      <NavBar loggedIn={loggedIn} current='learn' />
      <div className='global-margin'>
        <div className='title-box mt-5 py-20 bg-learn'>
          <div className='py-5'>
            <div className='bg-dark-wood-800 rounded-br-[100px] px-8 py-20 max-w-sm mx-auto'>
              <h1 className='text-center text-white-200'>Learn more</h1>
            </div>
          </div>
          <div className='mt-14 self-end'>
            <div className='title-box-info mt-10 bg-dark-wood-800 px-40 py-12 text-center '></div>
          </div>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-5 py-5 mx-auto max-w-[90rem] place-items-center gap-y-4'>
          <div>
            <ScrollLink to='about' smooth={true}>
              <button
                type='button'
                className='medium-intro-lg inline-flex justify-center rounded-full border border-transparent bg-dark-wood-800 py-4 px-16 text-white-200 shadow-sm hover:bg-dark-wood-700 '
              >
                About Us
              </button>
            </ScrollLink>
          </div>
          <div>
            <ScrollLink to='publication' smooth={true}>
              <button
                type='button'
                className='medium-intro-lg inline-flex justify-center rounded-full border border-transparent bg-indigo-600 py-4 px-12 text-white-200 shadow-sm hover:bg-dark-wood-700 '
              >
                Publications
              </button>
            </ScrollLink>
          </div>
          <div>
            <ScrollLink to='press' smooth={true}>
              <button
                type='button'
                className='medium-intro-lg inline-flex justify-center rounded-full border border-transparent bg-indigo-500 py-4 px-12 text-white-200 shadow-sm hover:bg-dark-wood-700 '
              >
                Press
              </button>
            </ScrollLink>
          </div>
          <div>
            <ScrollLink to='videos' smooth={true}>
              <button
                type='button'
                className='medium-intro-lg inline-flex justify-center rounded-full border border-transparent bg-dark-wood-800 py-4 px-12 text-white-200 shadow-sm hover:bg-dark-wood-700 '
              >
                Videos
              </button>
            </ScrollLink>
          </div>
          <div>
            <button
              type='button'
              className='medium-intro-lg inline-flex justify-center rounded-full border border-transparent bg-dark-wood-800 py-4 px-16 text-white-200 shadow-sm hover:bg-dark-wood-700 '
            >
              FAQ
            </button>
          </div>
        </div>

        <div className='my-20'>
          <div className='rounded-[60px] mt-4 bg-dark-wood-800 py-20 px-20 mt-10' name='about'>
            <div className='grid grid-cols-1 sm:grid-cols-3'>
              <div className='max-w-sm'>
                <h2 className='text-white-200 pt-4'>
                  TreesAI is a collaboration between Dark Matter Labs and Lucidminds.
                </h2>
                <p className='text-white-200 medium-intro-lg pt-16'>
                  How do we establish nature as a critical part of urban infrastructure, alongside
                  bridges, roads and rail? Our multi-disciplinary and nature-passionate team is on
                  an exciting journey to establish urban nature as part of the real assets sector.
                </p>
              </div>
              <div className='col-span-2'>
                <img className='rounded-r-[60px]' src={teamImage} alt='Glasgow city' />
              </div>
            </div>
          </div>
        </div>

        <div className='py-10'>
          <div className='max-w-2xl m-auto text-center'>
            <h2 className='pb-8 text-dark-wood-800'>Our team leaders</h2>
          </div>

          <div className='bg-gradient-to-r from-indigo-500 to-green-600 px-20 py-12 rounded-[30px] border border-black'>
            <div className='grid grid-cols-1 lg:grid-cols-3  gap-x-8 gap-y-10'>
              <div className='flex flex-col justify-center items-center'>
                <img className='h-40' src={carlottaImg} />
                <p className='medium-intro-sm text-white-200 bg-black rounded-[30px] text-center px-8 py-2'>
                  CO-FOUNDER
                </p>
                <div className=' bg-white text-black border border-black rounded-[30px] px-4 py-4'>
                  <h3 className='text-center'>Carlotta Conte-Billant</h3>
                  <p className='book-intro-md py-4'>
                    Nature-based Solutions, project manager, Speaker and Lecturer, Urban Planner,
                    UNDP, Entrepreneur
                  </p>
                </div>
              </div>

              <div className='flex flex-col justify-center items-center'>
                <img className='h-40' src={ozImg} />
                <p className='medium-intro-sm text-white-200 bg-black rounded-[30px] text-center px-8 py-2'>
                  CO-FOUNDER
                </p>
                <div className=' bg-white text-black border border-black rounded-[30px] px-4 py-4'>
                  <h3 className='text-center'>Oguzhan Yayla</h3>
                  <p className='book-intro-md py-4'>
                    Capitalise digital systems architect and Engineer with Experience in building
                    scalable Data infrastructures for startups
                  </p>
                </div>
              </div>

              <div className='flex flex-col justify-center items-center'>
                <img className='h-40' src={kostaImg} />
                <p className='medium-intro-sm text-white-200 bg-black rounded-[30px] text-center px-8 py-2'>
                  CO-FOUNDER
                </p>
                <div className=' bg-white text-black border border-black rounded-[30px] px-4 py-4'>
                  <h3 className='text-center'>Konstantina Koulouri</h3>
                  <p className='book-intro-md'>
                    Natural Capital expert driving innovation in the financialization of Nature,
                    valuation of ecosystem services and Natural Capital Markets
                  </p>
                </div>
              </div>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10 pt-10 justify-items-center'>
              <div className='flex flex-col justify-center items-center max-w-lg'>
                <img className='h-40' src={rajImg} />
                <p className='medium-intro-sm text-white-200 bg-black rounded-[30px] text-center px-8 py-2'>
                  FINANCIAL STRUCTURING
                </p>
                <div className=' bg-white text-black border border-black rounded-[30px] px-4 py-4'>
                  <h3 className='text-center'>Raj Kalia</h3>
                  <p className='book-intro-md py-4'>
                    25+ years of International experience in Senior Capital markets and asset
                    management roles at global bank
                  </p>
                </div>
              </div>

              <div className='flex flex-col justify-center items-center max-w-lg'>
                <img className='h-40' src={roniImg} />
                <p className='medium-intro-sm text-white-200 bg-black rounded-[30px] text-center px-8 py-2'>
                  SCENARIO ANALYSIS EXPERT
                </p>
                <div className=' bg-white text-black border border-black rounded-[30px] px-4 py-4'>
                  <h3 className='text-center'>Bulent Ozel</h3>
                  <p className='book-intro-md'>
                    Capitalise Complex system scientific focused on agend-based modelling,
                    simulation, social network analysis, machine learning, lecturer
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='py-10'>
          <div className='max-w-2xl m-auto text-center'>
            <h2 className='pb-8 text-dark-wood-800'>Collaborators - list</h2>
          </div>

          <div className='bg-gradient-to-r from-indigo-500 to-green-600 border border-black rounded-[30px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-20 py-10 gap-x-8 gap-y-10 text-center'>
            <div className='rounded-[68px] bg-dark-wood-800 px-8 py-8 sm:px-2 sm:py-2'>
              <p className='medium-intro-md text-white-200'>Arianna Smaron</p>
              <p className='medium-intro-md text-white-200'>Product and visual design</p>
            </div>

            <div className='rounded-[68px] bg-dark-wood-800 px-8 py-8 sm:px-2 sm:py-2'>
              <p className='medium-intro-md text-white-200'>Axel Nilsson</p>
              <p className='medium-intro-md text-white-200'>Data science & Fullstack dev</p>
            </div>

            <div className='rounded-[68px] bg-dark-wood-800 px-8 py-8 sm:px-2 sm:py-2'>
              <p className='medium-intro-md text-white-200'>Carolina Christiansen</p>
              <p className='medium-intro-md text-white-200'>Financial analysis</p>
            </div>

            <div className='rounded-[68px] bg-dark-wood-800 px-8 py-8 sm:px-2 sm:py-2'>
              <p className='medium-intro-md text-white-200'>Chloe Treger</p>
              <p className='medium-intro-md text-white-200'>Natural Capital research</p>
            </div>

            <div className='rounded-[68px] bg-dark-wood-800 px-8 py-8 sm:px-2 sm:py-2'>
              <p className='medium-intro-md text-white-200'>Gurden Batra</p>
              <p className='medium-intro-md text-white-200'>Frontend dev</p>
            </div>

            <div className='rounded-[68px] bg-dark-wood-800 px-8 py-8 sm:px-2 sm:py-2'>
              <p className='medium-intro-md text-white-200'>Lorenza Agosti</p>
              <p className='medium-intro-md text-white-200'>Biz dev & Reserach</p>
            </div>

            <div className='rounded-[68px] bg-dark-wood-800 px-8 py-8 sm:px-2 sm:py-2'>
              <p className='medium-intro-md text-white-200'>Marko Petrovic</p>
              <p className='medium-intro-md text-white-200'>Impact modelling</p>
            </div>

            <div className='rounded-[68px] bg-dark-wood-800 px-8 py-8 sm:px-2 sm:py-2'>
              <p className='medium-intro-md text-white-200'>Sofia Valentini</p>
              <p className='medium-intro-md text-white-200'>Portfolio Structuring</p>
            </div>
          </div>
        </div>

        <div className='py-10'>
          <div className='max-w-2xl m-auto text-center'>
            <h2 className='pb-8 text-dark-wood-800'>Resources</h2>
          </div>

          <SectionHeader title='Publications' />
          <div
            className='bg-white-200 rounded-[50px] border border-indigo-600 px-20 py-10 mb-10'
            name='publication'
          >
            <div className='mt-12 mx-auto max-w-md px-4 grid gap-8 sm:max-w-lg sm:px-6 lg:px-8 lg:grid-cols-3 lg:max-w-7xl'>
              {publications.map((post) => (
                <div key={post.id} className='flex flex-col rounded-lg shadow-md overflow-hidden'>
                  <div className='flex-shrink-0'>
                    <a target='_blank' rel='noreferrer noopener' href={post.href}>
                      <img className='h-48 w-full object-cover' src={post.imageUrl} alt='' />
                    </a>
                  </div>
                  <div className='flex-1 bg-white p-6 flex flex-col justify-between'>
                    <div className='flex-1'>
                      <p className='text-sm font-medium text-blue2'>
                        <a
                          href={post.href}
                          target='_blank'
                          rel='noreferrer noopener'
                          className='hover:underline'
                        >
                          {post.category.name}
                        </a>
                      </p>
                      <a
                        href={post.href}
                        target='_blank'
                        rel='noreferrer noopener'
                        className='block mt-2'
                      >
                        <p className='text-xl font-semibold text-gray-900'>{post.title}</p>
                        <p className='mt-3 text-base text-gray-500 text-dark'>{post.preview}</p>
                      </a>
                    </div>
                    <div className='mt-6 flex items-center'>
                      <div className='ml-3'>
                        <span className='text-sm'>Trees as Infrastructure</span>
                        <div className='flex space-x-1 text-sm text-dark'>
                          <time dateTime={post.datetime}>{post.date}</time>
                          <span aria-hidden='true'>&middot;</span>
                          <div className='text-gray-500'>
                            <span>{post.readingLength} read</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <SectionHeader title='Press' />
          <div
            className='bg-white-200 rounded-[50px] border border-indigo-600 px-20 py-10 mb-10'
            name='press'
          >
            <div className='mt-12 mx-auto max-w-md px-4 grid gap-8 sm:max-w-lg sm:px-6 lg:px-8 lg:grid-cols-3 lg:max-w-7xl'>
              {press.map((post) => (
                <div key={post.title}>
                  <p className='text-sm text-gray-500'>
                    <time dateTime={post.datetime}>{post.date}</time>
                  </p>
                  <a
                    href={post.href}
                    target='_blank'
                    rel='noreferrer noopener'
                    className='mt-2 block'
                  >
                    <p className='text-xl font-semibold text-gray-900'>{post.title}</p>
                    <p className='mt-3 text-base text-gray-500'>{post.description}</p>
                  </a>
                  <div className='mt-3'>
                    <a
                      href={post.href}
                      target='_blank'
                      rel='noreferrer noopener'
                      className='text-base font-semibold text-blue2 hover:text-blue1'
                    >
                      Read full story
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <SectionHeader title='Podcasts/ Videos' />
          <div
            className='bg-white-200 rounded-[50px] border border-indigo-600 px-20 py-10'
            name='videos'
          >
            <div className='mt-12 mx-auto max-w-md px-4 grid gap-8 sm:max-w-lg sm:px-6 lg:px-8 lg:grid-cols-3 lg:max-w-7xl'>
              {videos.map((post) => (
                <div key={post.id} className='flex flex-col rounded-lg shadow-lg overflow-hidden'>
                  <div className='flex-shrink-0'>
                    <a target='_blank' rel='noreferrer noopener' href={post.href}>
                      <img className='h-48 w-full object-cover' src={post.imageUrl} alt='' />
                    </a>
                  </div>
                  <div className='flex-1 bg-white p-6 flex flex-col justify-between'>
                    <div className='flex-1'>
                      <p className='text-sm font-medium text-blue2'>
                        <a
                          href={post.href}
                          target='_blank'
                          rel='noreferrer noopener'
                          className='hover:underline'
                        >
                          {post.category.name}
                        </a>
                      </p>
                      <a
                        href={post.href}
                        target='_blank'
                        rel='noreferrer noopener'
                        className='block mt-2'
                      >
                        <p className='text-xl font-semibold text-gray-900'>{post.title}</p>
                        <p className='mt-3 text-base text-gray-500 text-dark'>{post.preview}</p>
                      </a>
                    </div>
                    <div className='mt-6 flex items-center'>
                      <div className='ml-3 text-gray-500'>
                        <div className='flex space-x-1'>
                          <p className='text-sm text-gray-900'>{post.readingLength}</p>
                        </div>
                        <div className='flex space-x-1'>
                          <p className='text-sm text-dark'>{post.date}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

Learn.propTypes = {
  loggedIn: PropTypes.bool,
};
