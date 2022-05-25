import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import map from "../images/map.png";
import ecosystem from "../images/ecosystem.png";

const cities = [
  {
    name: "Dublin",
    imageUrl: "assets/cities/Dublin.png",
  },
  {
    name: "London",
    imageUrl: "assets/cities/London.png",
  },
  {
    name: "Paris",
    imageUrl: "assets/cities/Paris.png",
  },
  {
    name: "Milan",
    imageUrl: "assets/cities/Milan.png",
  },
  {
    name: "Berlin",
    imageUrl: "assets/cities/Berlin.png",
  },
];

export default function Home() {
  return (
    <div className="bg-white">
      <div className="relative overflow-hidden">
        <NavBar loggedIn={false} />
        <main>
          <div className="header-background center-container">
            <h1 className="text-5xl leading-12 font-lg text-white font-spaceBold center-content ">
              Welcome to TreesAI Impact Planner! Check your city portfolio and
              start your project journey.
            </h1>
          </div>
          <div className="bg-background">
            <div className="max-w-7xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
              <h2 className="text-4xl font-extrabold tracking-tight sm:text-4xl font-spaceBold text-primary">
                <span className="block">Submit your project</span>
              </h2>
              <p className="font-spaceRegular text-lg mt-5">
                Understand long term outcomes of your project and get funded as
                a portfolio.
              </p>
              <div className="mt-8 flex justify-center">
                <div className="inline-flex rounded-md">
                  <Link to="/submit-project">
                    <span className="inline-flex items-center px-6 py-2 border border-transparent text-base font-spaceRegular font-large rounded-full text-white bg-primary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      Start journey
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-primary">
            <div className="max-w-4xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
              <p className="font-spaceRegular text-2xl text-left mt-5 text-white">
                TreesAI pilot platform is an easy to use map based interface
                that helps project developers exchange valuable design
                information like location and impact so that they can get funded
                as portfolios rather than on a project-by-project basis.
              </p>
            </div>
          </div>
          <div className="bg-background">
            <div className="max-w-7xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
              <h2 className="text-4xl font-extrabold tracking-tight sm:text-4xl font-spaceBold text-primary">
                <span className="block">
                  From Project Finance to Portfolio Finance
                </span>
              </h2>
              <p className="font-spaceRegular text-lg mt-5">
                Do you want to know more before submitting a project?
              </p>
              <div className="mt-8 flex justify-center">
                <div className="inline-flex rounded-md">
                  <a
                    href="#"
                    className="inline-flex items-center px-6 py-2 text-base font-spaceRegular font-large rounded-full text-white bg-primary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Learn more
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="relative bg-primary">
            <div className="md:grid-cols-2 lg:grid lg:grid-cols-2 sm:grid-cols-1">
              <div className="bg-primary py-16 px-4">
                <div className="max-w-lg mx-auto">
                  <h2 className="font-spaceBold text-4xl text-white sm:text-4xl">
                    What is TreesAI pilot?
                  </h2>
                  <div className="pt-2 pb-2">
                    <p className="mt-3 text-lg font-regular font-spaceRegular leading-6 text-white">
                      TreesAI pilot platform is an easy to use map based
                      interface that helps project developers exchange valuable
                      design information like location and impact so that they
                      can get funded as portfolios rather than on a
                      project-by-project basis.
                    </p>
                  </div>
                </div>
              </div>
              <div className="saf-demo mt-10 mb-10"></div>
            </div>
            <div className="bg-background">
              <div className="max-w-7xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
                <h2 className="text-4xl font-extrabold tracking-tight sm:text-4xl font-spaceBold text-primary">
                  <span className="block">Glasgow Portfolio Overview</span>
                </h2>
                <div className="md:grid-cols-2 lg:grid lg:grid-cols-2 sm:grid-cols-1">
                  <div className="m-5">
                    <img src={map} />
                  </div>
                  <div>
                    <p className="font-spaceRegular text-md text-left mt-5">
                      Glasgow city overview pilot platform is an easy to use map
                      based interface that helps project developers exchange
                      valuable design information like location and impact so
                      that they can get funded as portfolios rather than on a
                      project-by-project basis.
                    </p>
                    <div className="mt-8 flex justify-center">
                      <div className="inline-flex rounded-md">
                        <a
                          href="#"
                          className="inline-flex items-center px-4 py-2 text-base font-spaceRegular font-large rounded-full text-white bg-primary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          View detailed portfolio
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-primary">
              <div className="max-w-7xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
                <h2 className="text-4xl font-extrabold tracking-tight sm:text-4xl font-spaceBold text-white">
                  <span className="block">Other cities coming soon!</span>
                </h2>
                <div className="space-y-12 m-10">
                  <ul
                    role="list"
                    className="mx-auto sm:grid sm:grid-cols-2 sm:gap-16 sm:space-y-0 lg:grid-cols-5 lg:max-w-8xl"
                  >
                    {cities.map((city) => (
                      <li key={city.name}>
                        <div className="space-y-6">
                          <img
                            className="mx-auto h-30 w-40 rounded-full"
                            src={city.imageUrl}
                            alt=""
                          />
                          <div className="space-y-2">
                            <div className="text-lg leading-6 font-medium space-y-1">
                              <p className="text-white font-spaceRegular">
                                {city.name}
                              </p>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="bg-background">
              <div className="max-w-7xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
                <h2 className="text-4xl font-extrabold tracking-tight sm:text-4xl font-spaceBold text-primary">
                  <span className="block">TreesAI ecosystem of products</span>
                </h2>
                <div className="md:grid-cols-2 lg:grid lg:grid-cols-2 sm:grid-cols-1">
                  <div className="m-5">
                    <img src={ecosystem} />
                  </div>
                  <div>
                    <p className="font-spaceRegular text-md text-left mt-5">
                      TreesAI ecosystem of products is an easy to use map based
                      interface that helps project developers exchange valuable
                      design information like location and impact so that they
                      can get funded as portfolios rather than on a
                      project-by-project basis.
                    </p>
                    <div className="mt-8 flex justify-center">
                      <div className="inline-flex rounded-md">
                        <a
                          href="#"
                          className="inline-flex items-center px-4 py-2 text-base font-spaceRegular font-large rounded-full text-white bg-primary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Learn more
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
