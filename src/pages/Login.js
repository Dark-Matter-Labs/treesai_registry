import { Fragment, useState } from "react";
import { Transition } from "@headlessui/react";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/outline";
import { XIcon } from "@heroicons/react/solid";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import logo from "../images/logo.svg";

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const loginUser = async () => {
    const getTokenRequestHeaders = new Headers();
    getTokenRequestHeaders.append("accept", "application/json");
    getTokenRequestHeaders.append(
      "Content-Type",
      "application/x-www-form-urlencoded"
    );

    const getTokenPayload = {
      username: email,
      password: password,
    };

    let formBody = [];
    for (var property in getTokenPayload) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(getTokenPayload[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    const getTokenRequestOptions = {
      method: "POST",
      headers: getTokenRequestHeaders,
      body: formBody,
      redirect: "follow",
    };

    await fetch("http://127.0.0.1:8000/api/v1/token", getTokenRequestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        setShowError(true);
        throw new Error("Something went wrong");
      })
      .then((result) => {
        sessionStorage.setItem("token", result.access_token);

        const getUserRequestHeaders = new Headers();
        getUserRequestHeaders.append("accept", "application/json");
        getUserRequestHeaders.append("Content-Type", "application/json");
        getUserRequestHeaders.append("Access-Control-Allow-Origin", "*");
        getUserRequestHeaders.append(
          "Authorization",
          "Bearer " + sessionStorage.token
        );

        const getUserRequestOptions = {
          method: "GET",
          headers: getUserRequestHeaders,
          redirect: "follow",
        };

        fetch("http://127.0.0.1:8000/api/v1/users/me/", getUserRequestOptions)
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            setShowError(true);
            throw new Error("Something went wrong");
          })
          .then((result) => {
            sessionStorage.setItem("user_id", JSON.stringify(result.id));
            sessionStorage.setItem("user_name", JSON.stringify(result.name));
            setShowSuccess(true);
            navigate("/submit-project");
            window.location.reload();
          })
          .catch((error) => console.log("error", error));
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <>
      <>
        <div
          aria-live="assertive"
          className="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start"
        >
          <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
            {/* TODO: make notifications global */}
            <Transition
              show={showSuccess}
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
                        Successfully logged in!
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        Taking you to project simulation & submission page
                      </p>
                    </div>
                    <div className="ml-4 flex-shrink-0 flex">
                      <button
                        type="button"
                        className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={() => {
                          setShowSuccess(false);
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
                        Sorry there was an error!
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        error details
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
      <NavBar />
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img className="mx-auto h-12 w-auto" src={logo} alt="TreesAI logo" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Login
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    defaultValue={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    defaultValue={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <button
                  onClick={loginUser}
                  type="button"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
