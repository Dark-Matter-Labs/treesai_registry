import { useState, useEffect, Fragment } from "react";
import { RadioGroup, Transition } from "@headlessui/react";
import { CheckCircleIcon, XIcon } from "@heroicons/react/solid";
import { ExclamationCircleIcon } from "@heroicons/react/outline";
import { Line } from "@nivo/line";
import { ResponsiveBarCanvas } from "@nivo/bar";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Breadcrumb from "../components/Breadcrumb";
import projectImg from "../images/project-default.png";
import tempImg from "../images/temp-map.png";

const typologies = [
  {
    id: 1,
    title: "Woodland",
    description: "Typology description",
    users: "some stats",
    value: "forest",
    minDBH: 4.77,
    maxDBH: 4.77,
    species: "conifer"
  },
  {
    id: 2,
    title: "Street Trees",
    description: "Typology description",
    users: "some stats",
    value: "park",
    minDBH: 15,
    maxDBH: 15,
    species: "conifer"
  },
  {
    id: 3,
    title: "Trees in Vacant Lands",
    description: "Typology description",
    users: "some stats",
    value: "tree in VDL",
    minDBH: 7,
    maxDBH: 30,
    species: "conifer"
  }
];

const activities = [
  { id: 0, name: "Planting", value: "planting" },
  { id: 1, name: "Maintenance", value: "maintenance" },
  { id: 2, name: "Restoration", value: "restoration" },
  { id: 3, name: "Landscaping", value: "landscaping" },
  { id: 4, name: "Preservation", value: "preservation" }
];

const commonProperties = {
  width: 650,
  height: 400,
  margin: { top: 20, right: 20, bottom: 60, left: 40 },
  animate: true,
  enableSlices: "x",
  theme: {
    background: "#E5E7EB",
    textColor: "#374151"
  },
  colors: "#1EA685"
};

const commonPropertiesMultiLine = {
  width: 650,
  height: 400,
  margin: { top: 20, right: 50, bottom: 60, left: 50 },
  animate: true,
  enableSlices: "x",
  theme: {
    background: "#E5E7EB",
    textColor: "#374151"
  },
  colors: ["#1EA685", "#374151", "#C4C4C4"]
};

let avg_rel_array,
  avg_rel,
  avg_seq_array,
  avg_seq,
  alive_array,
  alive,
  cumulative_seq_array,
  released_array,
  storage_array,
  cumulative_array;

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function sumRange(array, start, end) {
  let sum = 0;

  for (let index = start; index < end; index++) {
    sum += array[index];
  }

  return sum;
}

export default function SubmitProject(props) {
  const [processStage, setProcessStage] = useState(1);
  const [showNotification, setShowNotification] = useState(false);
  const [showError, setShowError] = useState(false);
  const [serverError, setServerError] = useState("");

  const [projectName, setProjectName] = useState("");
  const [projectDev, setProjectDev] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [treeNumber, setTreeNumber] = useState(0);
  const [selectedActivity, setSelectedActivity] = useState("");
  const [selectedStage, setSelectedStage] = useState("potential");
  const [selectedTypology, setSelectedTypology] = useState(typologies[0]);
  const [minDBH, setMinDBH] = useState(0);
  const [maxDBH, setMaxDBH] = useState(0);
  const [areaDensity, setAreaDensity] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    if (
      sessionStorage.getItem("token") === null ||
      sessionStorage.getItem("token") === undefined
    ) {
      setShowNotification(true);
      navigate("/register");
    }
  });

  const handleMinChange = (e) => {
    setMinDBH(e.target.value);
  };

  const handleMaxChange = (e) => {
    setMaxDBH(e.target.value);
  };

  const getProjectID = async () => {
    let requestHeaders = new Headers();
    requestHeaders.append("accept", "application/json");
    requestHeaders.append("Content-Type", "application/json");
    requestHeaders.append("Access-Control-Allow-Origin", "*");
    requestHeaders.append("Authorization", "Bearer " + sessionStorage.token);

    const payload = JSON.stringify({
      title: projectName,
      description: projectDescription,
      in_portfolio: true,
      project_dev: projectDev,
      owner_id: sessionStorage.user_id,
      activities: selectedActivity,
      area: 0,
      cost: 0,
      stage: selectedStage,
      number_of_trees: treeNumber,
      local_authority: "string",
      location: "string",
      start_date: "2022-06-16T09:32:51.188Z"
    });

    let requestOptions = {
      method: "POST",
      headers: requestHeaders,
      body: payload,
      redirect: "follow"
    };

    let response;
    try {
      response = await fetch(
        "http://127.0.0.1:8000/api/v1/saf/users/" +
          sessionStorage.user_id +
          "/projects",
        requestOptions
      );
    } catch (ex) {
      setShowError(true);
      return setServerError(ex);
    }
    if (!response.ok) {
      setShowError(true);
      return setServerError(response.status + " : " + response.statusText);
    }
    if (response.ok) {
      let data = await response.json();
      console.log(data);
      sessionStorage.setItem("project_id", JSON.stringify(data.id));
      setProcessStage(2);
    }
  };

  const getSAFOutput = async () => {
    let requestHeaders = new Headers();
    requestHeaders.append("accept", "application/json");
    requestHeaders.append("Content-Type", "application/json");
    requestHeaders.append("Access-Control-Allow-Origin", "*");
    requestHeaders.append("Authorization", "Bearer " + sessionStorage.token);

    const payload = JSON.stringify({
      name: projectName,
      description: projectDescription,
      typology: selectedTypology.value,
      min_dbh: parseInt(selectedTypology.minDBH),
      max_dbh: parseInt(selectedTypology.maxDBH),
      maintenance_scope: 2,
      season_growth_mean: 200,
      season_growth_var: 7,
      time_horizon: 50,
      density_per_ha: parseInt(areaDensity),
      species: selectedTypology.species
    });

    let requestOptions = {
      method: "POST",
      headers: requestHeaders,
      body: payload,
      redirect: "follow"
    };

    await fetch(
      "http://127.0.0.1:8000/api/v1/saf/users/" +
        sessionStorage.user_id +
        "/projects/" +
        sessionStorage.project_id +
        "/run",
      requestOptions
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        setShowError(true);
        throw new Error("Something went wrong");
      })
      .then((result) => {
        avg_rel_array = Object.keys(result.Avg_Rel).map((key) => ({
          x: Number(key),
          y: result.Avg_Rel[key]
        }));

        let sum = 0;
        Object.keys(result.Avg_Rel).map((key) => {
          sum += result.Avg_Rel[key];
        });
        avg_rel = sum / 50;

        avg_seq_array = Object.keys(result.Avg_Seq).map((key) => ({
          x: Number(key),
          y: result.Avg_Seq[key]
        }));

        sum = 0;
        Object.keys(result.Avg_Seq).map((key) => {
          sum += result.Avg_Seq[key];
        });
        avg_seq = sum / 50;

        const oneToThreeAlive = sumRange(result.Alive, 0, 4);
        const threeToTenAlive = sumRange(result.Alive, 4, 11);
        const tenToThirtyAlive = sumRange(result.Alive, 11, 31);
        const thirtyToFiftyAlive = sumRange(result.Alive, 31, 50);

        alive_array = [
          { years: "y1-2", trees: oneToThreeAlive },
          { years: "y3-10", trees: threeToTenAlive },
          { years: "y10-30", trees: tenToThirtyAlive },
          { years: "y30-50", trees: thirtyToFiftyAlive }
        ];

        sum = 0;
        Object.keys(result.Alive).map((key) => {
          sum += result.Alive[key];
        });
        alive = sum / 50;

        cumulative_seq_array = Object.keys(result.Cum_Seq).map((key) => ({
          x: Number(key),
          y: result.Cum_Seq[key]
        }));

        released_array = Object.keys(result.Released).map((key) => ({
          x: Number(key),
          y: result.Released[key]
        }));

        storage_array = Object.keys(result.Storage).map((key) => ({
          x: Number(key),
          y: result.Storage[key]
        }));

        cumulative_array = [
          {
            id: "seq",
            color: "hsl(135, 70%, 50%)",
            data: cumulative_seq_array
          },
          {
            id: "release",
            color: "hsl(347, 70%, 50%)",
            data: released_array
          },
          {
            id: "storage",
            color: "hsl(31, 70%, 50%)",
            data: storage_array
          }
        ];

        setProcessStage(3);
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div className="bg-background">
      <>
        <div
          aria-live="assertive"
          className="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start"
        >
          <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
            {/* TODO: make notifications global */}
            <Transition
              show={showNotification}
              as={Fragment}
              enter="transform ease-out duration-300 transition"
              enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
              enterTo="translate-y-0 opacity-100 sm:translate-x-0"
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
                <div className="p-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <CheckCircleIcon
                        className="h-6 w-6 text-green-400"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="ml-3 w-0 flex-1 pt-0.5">
                      <p className="text-sm font-medium text-gray-900">
                        Please register or login first!
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        Taking you register page.
                      </p>
                    </div>
                    <div className="ml-4 flex-shrink-0 flex">
                      <button
                        type="button"
                        className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={() => {
                          setShow(false);
                        }}
                      >
                        <span className="sr-only">Close</span>
                        <XIcon className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </>
      <>
        <div
          aria-live="assertive"
          className="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start"
        >
          <div className="w-full flex flex-col items-center space-y-4 sm:items-end pt-20">
            {/* TODO: make notifications global */}
            <Transition
              show={showError}
              as={Fragment}
              enter="transform ease-out duration-300 transition"
              enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
              enterTo="translate-y-0 opacity-100 sm:translate-x-0"
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
                <div className="p-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <ExclamationCircleIcon
                        className="h-6 w-6 text-red-400"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="ml-3 w-0 flex-1 pt-0.5">
                      <p className="text-sm font-medium text-gray-900">
                        Sorry there was an error with your entry!
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        {serverError.toString()}
                      </p>
                    </div>
                    <div className="ml-4 flex-shrink-0 flex">
                      <button
                        type="button"
                        className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={() => {
                          setShowError(false);
                        }}
                      >
                        <span className="sr-only">Close</span>
                        <XIcon className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </>
      <NavBar loggedIn={props.loggedIn} current="projectSubmit" />
      {processStage === 1 && (
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <Breadcrumb />
          <form className="space-y-8 divide-y divide-gray-200">
            <div className="space-y-8 divide-y divide-gray-200 pb-20">
              <div>
                <div className="mt-10">
                  <h2 className="text-4xl font-extrabold tracking-tight sm:text-4xl font-spaceBold text-primary">
                    Upload your project’s information
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the day.
                  </p>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="project-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Project Name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="project-name"
                        id="project-name"
                        placeholder="Title of the project"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-primary rounded-2xl"
                        defaultValue={projectName}
                        onChange={(e) => {
                          setProjectName(e.target.value);
                        }}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="project-developer"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Project Developer
                    </label>
                    <div className="mt-1">
                      <input
                        id="project-developer"
                        name="project-developer"
                        type="text"
                        placeholder="First name and last name"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-primary rounded-2xl"
                        defaultValue={projectDev}
                        onChange={(e) => {
                          setProjectDev(e.target.value);
                        }}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3 ml-10">
                    <label
                      htmlFor="project-stage"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Stage of the project
                    </label>
                    <div className="mt-1">
                      <select
                        id="project-stage"
                        name="project-stage"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-primary rounded-2xl"
                        onChange={(e) => {
                          setSelectedStage(e.target.value.toLowerCase());
                        }}
                      >
                        <option>Potential</option>
                        <option>Preplanning</option>
                        <option>Postplanning</option>
                        <option>Completed</option>
                      </select>
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    <label
                      htmlFor="project-description"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Project Description
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="project-description"
                        name="project-description"
                        rows={3}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-primary rounded-2xl"
                        defaultValue={projectDescription}
                        onChange={(e) => {
                          setProjectDescription(e.target.value);
                        }}
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Describe your project here within 300 words
                    </p>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="contact-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Contact Name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="contact-name"
                        id="contact-name"
                        placeholder="Firstname lastname"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-primary rounded-2xl"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="contact-email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Contact Email
                    </label>
                    <div className="mt-1">
                      <input
                        id="contact-email"
                        name="contact-email"
                        type="email"
                        placeholder="example@gcc.uk"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-primary rounded-2xl"
                        defaultValue={contactEmail}
                        onChange={(e) => {
                          setContactEmail(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <fieldset>
                <legend className="text-lg font-medium text-primary font-spaceBold">
                  What are your activities?
                </legend>
                <div className="mt-4 border-t border-b border-gray-200 divide-y divide-gray-200">
                  {activities.map((activity, activityIdx) => (
                    <div
                      key={activityIdx}
                      className="relative flex items-start py-4"
                    >
                      <div className="min-w-0 flex-1 text-sm">
                        <label
                          htmlFor={`person-${activity.id}`}
                          className="font-medium text-gray-700 select-none"
                        >
                          {activity.name}
                        </label>
                      </div>
                      <div className="ml-3 flex items-center h-5">
                        <input
                          id={activity.id}
                          name={activity.id}
                          type="checkbox"
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                          onChange={(e) => {
                            setSelectedActivity(activity.value);
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </fieldset>

              <div className="">
                <label
                  htmlFor="area-density"
                  className="block text-sm font-medium text-gray-700"
                >
                  Number of trees
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    name="area-density"
                    id="area-density"
                    placeholder="Trees per ha"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-primary rounded-2xl"
                    defaultValue={treeNumber}
                    onChange={(e) => {
                      setTreeNumber(e.target.value);
                    }}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="local-authority"
                  className="block text-sm font-medium text-gray-700"
                >
                  Local authority
                </label>
                <div className="mt-1">
                  <input
                    id="local-authority"
                    name="local-authority"
                    type="text"
                    placeholder="Glasgow City Council"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-primary rounded-2xl"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700"
                >
                  Location
                </label>
                <div className="mt-1">
                  <input
                    id="location"
                    name="location"
                    type="text"
                    placeholder="Location"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-primary rounded-2xl"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="start-date"
                  className="block text-sm font-medium text-gray-700"
                >
                  Start date
                </label>
                <div className="mt-1">
                  <input
                    id="start-date"
                    name="start-date"
                    type="date"
                    placeholder="Start date"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-primary rounded-2xl"
                  />
                </div>
              </div>
            </div>
          </form>
          <div className="pt-5 pb-20">
            <div className="flex justify-end">
              <button
                type="button"
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save for later
              </button>
              <button
                type="button"
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={getProjectID}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
      {processStage === 2 && (
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 m-10">
          <form className="space-y-8 divide-y divide-gray-200">
            <RadioGroup value={selectedTypology} onChange={setSelectedTypology}>
              <RadioGroup.Label className="font-medium text-primary font-spaceBold">
                Select the typology
              </RadioGroup.Label>

              <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
                {typologies.map((typology) => (
                  <RadioGroup.Option
                    key={typology.id}
                    value={typology}
                    className={({ checked, active }) =>
                      classNames(
                        checked ? "border-transparent" : "border-gray-300",
                        active
                          ? "border-indigo-500 ring-2 ring-indigo-500"
                          : "",
                        "relative bg-white border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none"
                      )
                    }
                  >
                    {({ checked, active }) => (
                      <>
                        <span className="flex-1 flex">
                          <span className="flex flex-col">
                            <RadioGroup.Label
                              as="span"
                              className="block text-sm font-medium text-gray-900 font-spaceBold"
                            >
                              {typology.title}
                            </RadioGroup.Label>
                            <RadioGroup.Description
                              as="span"
                              className="mt-1 flex items-center text-sm text-gray-500"
                            >
                              {typology.description}
                            </RadioGroup.Description>
                            <RadioGroup.Description
                              as="span"
                              className="mt-6 text-sm font-medium text-gray-900"
                            >
                              {typology.users}
                            </RadioGroup.Description>
                          </span>
                        </span>
                        <CheckCircleIcon
                          className={classNames(
                            !checked ? "invisible" : "",
                            "h-5 w-5 text-indigo-600"
                          )}
                          aria-hidden="true"
                        />
                        <span
                          className={classNames(
                            active ? "border" : "border-2",
                            checked
                              ? "border-indigo-500"
                              : "border-transparent",
                            "absolute -inset-px rounded-lg pointer-events-none"
                          )}
                          aria-hidden="true"
                        />
                      </>
                    )}
                  </RadioGroup.Option>
                ))}
              </div>
            </RadioGroup>

            <div className="">
              <h3 className="text-primary font-spaceBold">
                Define the area density
              </h3>
              <p>
                You can choose the parameter to define how your area looks like.
              </p>
              <label
                htmlFor="area-density"
                className="block text-sm font-medium text-gray-700"
              >
                Project Name
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  name="area-density"
                  id="area-density"
                  placeholder="Trees per ha"
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-primary rounded-2xl"
                  defaultValue={areaDensity}
                  onChange={(e) => {
                    setAreaDensity(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="pt-5 pb-20">
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save for later
                </button>
                <button
                  type="button"
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={getSAFOutput}
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
      {processStage === 3 && (
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="pt-10 pb-5 text-center">
            <h2 className="text-4xl font-bold tracking-tight sm:text-4xl font-spaceBold text-primary">
              Your Scenario Analysis result
            </h2>
            <p className="text-xl font-medium font-spaceRegular py-5">
              Thank you for your patience, the analysis was successful. Below
              you can see your data. They are also saved on your project page.
            </p>
          </div>
          <div className="shadow-sm rounded-md text-center bg-white">
            <h3 className="text-2xl font-bold tracking-tight font-spaceBold text-primary pt-5">
              Your project information
            </h3>
            <hr className="border-b-1 border-primary my-5 mx-10" />
            <div className="grid grid-cols-3 gap-y-6 gap-x-8 py-10">
              <div className="px-5">
                <img
                  src={projectImg}
                  alt="project image"
                  className="w-42 h-42 rounded-full border-8 border-primary"
                />
              </div>
              <div>
                <h4 className="text-xl font-bold tracking-tight font-spaceBold text-primary">
                  {projectName}
                </h4>
                <p className="text-left pt-5">{projectDescription}</p>
              </div>
              <div className="pt-10 text-left">
                <span>
                  Project developer:
                  <br />
                </span>
                <span className="font-bold">
                  {projectDev}
                  <br />
                </span>

                <span>
                  Contact mail:
                  <br />
                </span>
                <span className="font-bold">
                  {contactEmail} <br />
                </span>

                <span>
                  Location: <br />
                </span>
                <span className="font-bold">
                  Jeffrey street, 13 Glasgow city
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-y-6 gap-x-8 text-left my-5">
            <div className="shadow-sm rounded-md bg-white px-10">
              <h4 className="text-xl font-bold tracking-tight font-spaceBold text-primary py-5">
                Project data overview
              </h4>
              <div className="grid grid-cols-2 gap-y-6 gap-x-8 py-5">
                <div>
                  <span>
                    Overall time to develope the project: <br />
                  </span>
                  <span className="text-xl font-bold tracking-tight font-spaceBold text-primary">
                    20 months
                    <br />
                  </span>

                  <span>
                    Total Carbon Sequestration Average: <br />
                  </span>
                  <span className="text-xl font-bold tracking-tight font-spaceBold text-primary">
                    {Math.round(avg_seq * 100 + Number.EPSILON) / 100}
                    <br />
                  </span>

                  <span>
                    Total tree Species composition: <br />
                  </span>
                  <span className="text-xl font-bold tracking-tight font-spaceBold text-primary">
                    Evergreen 30%
                    <br /> Deciduous Trees 70%
                    <br />
                  </span>
                </div>

                <div>
                  <span>
                    Total Number of planned trees: <br />
                  </span>
                  <span className="text-xl font-bold tracking-tight font-spaceBold text-primary">
                    {treeNumber}
                    <br />
                  </span>

                  <span>
                    Total Area density: <br />
                  </span>
                  <span className="text-xl font-bold tracking-tight font-spaceBold text-primary">
                    {areaDensity} Ha
                    <br />
                  </span>

                  <span>
                    Overview of planned Activities: <br />
                  </span>
                  <span className="text-xl font-bold tracking-tight font-spaceBold text-primary">
                    Planting, Maintaining
                    <br />
                  </span>
                </div>
              </div>
            </div>
            <div>
              <img src={tempImg} alt="temp image" className="w-full h-full" />
            </div>
          </div>

          <h3 className="text-2xl font-bold tracking-tight font-spaceBold text-primary my-5 text-center">
            Project impact results
          </h3>

          <div className="grid grid-cols-2 gap-y-6 gap-x-0 mx-10 my-10">
            <div className="shadow-sm rounded-md bg-white px-10 text-center">
              <h4 className="text-xl font-bold tracking-tight font-spaceBold text-primary py-5">
                Average Carbon Release
              </h4>
              <div className="my-10">
                <span className="rounded-full bg-primary text-white font-spaceBold p-10">
                  {Math.round(avg_rel * 100 + Number.EPSILON) / 100} tCO2
                </span>
              </div>
              <p className="pt-10 text-left">
                By reducing energy demand and absorbing carbon dioxide, trees
                and vegetation decrease the production and negative effects of
                air pollution and greenhouse gas emissions.
              </p>
            </div>
            <div className="">
              <Line
                {...commonProperties}
                curve="monotoneX"
                enableArea={true}
                data={[
                  {
                    id: "Average Carbon Release",
                    data: avg_rel_array
                  }
                ]}
                xScale={{
                  type: "linear",
                  min: 0,
                  max: "auto"
                }}
                axisLeft={{
                  legend: "KG / p Tree",
                  legendOffset: 12
                }}
                axisBottom={{
                  legend: "YEAR",
                  legendOffset: -12
                }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-y-6 gap-x-0 mx-10 my-10">
            <div>
              <Line
                {...commonProperties}
                curve="monotoneX"
                enableArea={true}
                data={[
                  {
                    id: "Average Carbon Sequesteration",
                    data: avg_seq_array
                  }
                ]}
                xScale={{
                  type: "linear",
                  min: 0,
                  max: "auto"
                }}
                axisLeft={{
                  legend: "KG / p Tree",
                  legendOffset: 12
                }}
                axisBottom={{
                  legend: "YEAR",
                  legendOffset: -12
                }}
              />
            </div>
            <div className="shadow-sm rounded-md bg-white ml-5 pl-20 text-center">
              <h4 className="text-xl font-bold tracking-tight font-spaceBold text-primary py-5">
                Average Carbon Sequestration
              </h4>
              <div className="my-10">
                <span className="rounded-full bg-primary text-white font-spaceBold p-10">
                  {Math.round(avg_seq * 100 + Number.EPSILON) / 100} tCO2
                </span>
              </div>
              <p className="pt-10 text-left">
                By reducing energy demand and absorbing carbon dioxide, trees
                and vegetation decrease the production and negative effects of
                air pollution and greenhouse gas emissions.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-y-6 gap-x-0 mx-10 my-10">
            <div className="shadow-sm rounded-md bg-white px-10 text-center">
              <h4 className="text-xl font-bold tracking-tight font-spaceBold text-primary py-5">
                Tree health plot
              </h4>
              <div className="my-10">
                <span className="rounded-full bg-primary text-white font-spaceBold p-10">
                  {Math.round(alive * 100 + Number.EPSILON) / 100} years
                </span>
              </div>
              <p className="pt-10 text-left">
                By reducing energy demand and absorbing carbon dioxide, trees
                and vegetation decrease the production and negative effects of
                air pollution and greenhouse gas emissions.
              </p>
            </div>
            <div style={{ height: "400px" }}>
              <ResponsiveBarCanvas
                data={alive_array}
                keys={["trees"]}
                indexBy="years"
                padding={0.3}
                margin={{ top: 80, right: 20, bottom: 60, left: 40 }}
                axisBottom={{
                  legend: "YEARS RANGES",
                  legendOffset: 40
                }}
                colors="#1EA685"
                theme={{
                  background: "#E5E7EB",
                  textColor: "#374151"
                }}
              />
            </div>
          </div>

          <div className="shadow-sm rounded-md bg-white text-center my-10 mx-40">
            <h4 className="text-xl font-bold tracking-tight font-spaceBold text-primary py-5">
              Tree health plot
            </h4>
            <Line
              {...commonPropertiesMultiLine}
              curve="monotoneX"
              data={cumulative_array}
              xScale={{
                type: "linear",
                min: 0,
                max: "auto"
              }}
              axisLeft={{
                legend: "KG / p Tree",
                legendOffset: 12
              }}
              axisBottom={{
                legend: "YEAR",
                legendOffset: -12
              }}
            />
          </div>
          <div className="text-center py-20">
            <button
              type="button"
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Go to project page
            </button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
