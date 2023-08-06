import { useState } from "react";

import { useApp } from "../../contexts/AppContext";

import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import Error from "../Error/Error";

const NavigationBar = () => {
  const [searchInputValue, setSearchInputValue] = useState("");

  const { info, isLoading, dispatch, error } = useApp();

  const handleSearch = () => {
    dispatch({ type: "info/searched", payload: searchInputValue });
  };

  return (
    <>
      <nav className="navigation-bar">
        <h1 className="navigation-bar__heading">IP Address Tracker</h1>
        <div className="navigation-bar__input-container">
          <input
            value={searchInputValue}
            onChange={(e) => setSearchInputValue(e.target.value)}
            placeholder="Search for any IP address or domain name"
            type="text"
          />
          <button onClick={() => handleSearch()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 320 512"
              fill="#fff"
            >
              <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
            </svg>
          </button>
        </div>

        <div className="navigation-bar__info-container">
          {isLoading || !info ? (
            <LoadingSpinner></LoadingSpinner>
          ) : error ? (
            <Error errorMessage={error}></Error>
          ) : (
            <>
              <div className="navigation-bar__info">
                <p className="info__name">IP Address</p>
                <p className="info__value">{info.ip}</p>
              </div>
              <div className="info__divider"></div>
              <div className="navigation-bar__info">
                <p className="info__name">Location</p>
                <p className="info__value">
                  {info.location.city}, {info.location.region},{" "}
                  {info.location.country}
                </p>
              </div>
              <div className="info__divider"></div>
              <div className="navigation-bar__info">
                <p className="info__name">Timezone</p>
                <p className="info__value">UTC {info.location.timezone}</p>
              </div>
              <div className="info__divider"></div>
              <div className="navigation-bar__info">
                <p className="info__name">ISP</p>
                <p className="info__value">{info.isp}</p>
              </div>
            </>
          )}
        </div>
      </nav>
      <div className="navigation-background"></div>
    </>
  );
};

export default NavigationBar;
