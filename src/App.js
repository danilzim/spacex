import "./App.css";
import { Select } from "./components/Select";
import { useEffect, useState, useMemo } from "react";
import { Launch } from "./components/Launch";

const LAUNCH_URL = "https://api.spacexdata.com/v3/launches";

function App() {
  const [launches, setLaunches] = useState([]);
  const [selectedLaunch, setSelectedLaunchSites] = useState("");
  const [selectedRocket, setSelectedRocket] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLaunches = async () => {
      setLoading(true);
      const response = await fetch(LAUNCH_URL);
      const launches = await response.json();
      setLaunches(launches);
      setLoading(false);
    };

    fetchLaunches();
  }, []);

  const launchSites = useMemo(
    () => [...new Set(launches.map((launch) => launch.launch_site.site_name))],
    [launches]
  );
  const rockets = useMemo(
    () => [...new Set(launches.map((launch) => launch.rocket.rocket_name))],
    [launches]
  );

  const filteredLaunches = launches.filter((launch) => {
    const launchSiteFilterPassed =
      !selectedLaunch || launch.launch_site.site_name === selectedLaunch;
    const rocketFilterPassed =
      !selectedRocket || launch.rocket.rocket_name === selectedRocket;

    return launchSiteFilterPassed && rocketFilterPassed;
  });

  const hasLaunches = filteredLaunches.length > 0;

  if (loading) {
    return <div>...loading</div>;
  }

  return (
    <div className="App">
      <h1 className="title">Launches</h1>
      <Select
        options={launchSites}
        onSelect={setSelectedLaunchSites}
        selectedValue={selectedLaunch}
      >
        Launch Site
      </Select>
      <Select
        options={rockets}
        onSelect={setSelectedRocket}
        selectedValue={selectedRocket}
      >
        Rockets
      </Select>
      {!hasLaunches ? (
        <div>Results not found</div>
      ) : (
        filteredLaunches.map((launch) => <Launch launch={launch} />)
      )}
    </div>
  );
}

export default App;
