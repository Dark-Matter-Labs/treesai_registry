import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/solid";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const typologies = [
  {
    id: 1,
    title: "Woodland",
    description: "Typology description",
    users: "some stats",
    value: "forest",
  },
  {
    id: 2,
    title: "Street Trees",
    description: "Typology description",
    users: "some stats",
    value: "forest",
  },
  {
    id: 3,
    title: "Trees in Vacant Lands",
    description: "Typology description",
    users: "some stats",
    value: "forest",
  },
  {
    id: 4,
    title: "Raingarden(SuDS)",
    description: "Typology description",
    users: "some stats",
    value: "forest",
  },
  {
    id: 5,
    title: "Basin(SuDS)",
    description: "Typology description",
    users: "some stats",
    value: "forest",
  },
  {
    id: 6,
    title: "Filter Stripes & Swales(SuDS)",
    description: "Typology description",
    users: "some stats",
    value: "forest",
  },
  {
    id: 7,
    title: "Permeable Surfaces(SuDS)",
    description: "Typology description",
    users: "some stats",
    value: "forest",
  },
];

const activities = [
  { id: 1, name: "Planting" },
  { id: 2, name: "Pruning(early care)" },
  { id: 3, name: "Pruning(mature)" },
  { id: 4, name: "Watering" },
  { id: 5, name: "Pest/Risks Management" },
  { id: 5, name: "Maintenance" },
  { id: 5, name: "Grass cutting, path & drain maintenance" },
  { id: 5, name: "Removal & disposal" },
  { id: 5, name: "Tree replacement" },
  { id: 5, name: "Inspection & monitoring" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function SubmitProject() {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [selectedTypology, setSelectedTypology] = useState(typologies[0]);
  const [minDBH, setMinDBH] = useState(0);
  const [maxDBH, setMaxDBH] = useState(0);
  const [areaDensity, setAreaDensity] = useState(0);

  const handleMinChange = (e) => {
    setMinDBH(e.target.value);
  };

  const handleMaxChange = (e) => {
    setMaxDBH(e.target.value);
  };

  const getSAFOutput = () => {
    let requestHeaders = new Headers();
    requestHeaders.append("accept", "application/json");
    requestHeaders.append("Content-Type", "application/json");
    requestHeaders.append("Access-Control-Allow-Origin", "*");
    requestHeaders.append("Authorization", "Bearer " + process.env.REACT_APP_API_TOKEN)

    const payload = JSON.stringify({
      name: projectName,
      description: projectDescription,
      typology: selectedTypology.value,
      min_dbh: parseInt(minDBH),
      max_dbh: parseInt(maxDBH),
      maintenance_scope: 2,
      season_growth_mean: 200,
      season_growth_var: 7,
      time_horizon: 50,
      density_per_ha: parseInt(areaDensity),
      species: ["evergreen"],
    });

    let requestOptions = {
      method: "POST",
      headers: requestHeaders,
      body: payload,
      redirect: "follow",
    };

    fetch("http://127.0.0.1:8000/api/v1/saf/run", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <>
      <NavBar />
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <form className="space-y-8 divide-y divide-gray-200">
          <div className="space-y-8 divide-y divide-gray-200">
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
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
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
                      id="contact-emailr"
                      name="contact-email"
                      type="email"
                      placeholder="example@gcc.uk"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-primary rounded-2xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
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
                      active ? "border-indigo-500 ring-2 ring-indigo-500" : "",
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
                          checked ? "border-indigo-500" : "border-transparent",
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
              You can choose the paramether to define how your area looks like.
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
                      id={`person-${activity.id}`}
                      name={`person-${activity.id}`}
                      type="checkbox"
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                  </div>
                </div>
              ))}
            </div>
          </fieldset>

          <div className="">
            <h3 className="text-primary font-spaceBold">
              Tree species composition
            </h3>
            <p>Choose which percentage you want your species to be.</p>
            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-2">
                <label
                  htmlFor="evergreen-percent"
                  className="block text-sm font-medium text-gray-700"
                >
                  Evergreen percent
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    name="evergreen-percent"
                    id="evergreen-percent"
                    placeholder="evergreen-percent"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-primary rounded-2xl"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="decidious-percent"
                  className="block text-sm font-medium text-gray-700"
                >
                  Decidious percent
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    name="decidious-percent"
                    id="decidious-percent"
                    placeholder="decidious-percent"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-primary rounded-2xl"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="project-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Total
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    disabled
                    name="project-name"
                    id="project-name"
                    value={100}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-primary rounded-2xl"
                  />
                </div>
              </div>
            </div>
          </div>

          <label
            htmlFor="minmax-range"
            className="block mb-2 text-sm font-medium text-primary font-spaceBold"
          >
            MIN DBH
          </label>
          <p>Value: {minDBH}</p>
          <input
            id="minmax-range"
            type="range"
            min="10"
            max="50"
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            defaultValue={minDBH}
            onMouseUp={handleMinChange}
          />

          <label
            htmlFor="minmax-range"
            className="block mb-2 text-sm font-medium text-primary font-spaceBold"
          >
            MAX DBH
          </label>
          <p>Value: {maxDBH}</p>
          <input
            id="minmax-range"
            type="range"
            min="10"
            max="50"
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            defaultValue={maxDBH}
            onMouseUp={handleMaxChange}
          />

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
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={getSAFOutput}
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}
