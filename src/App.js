import "./App.css";
import { useEffect, useState } from "react";
import { useDrone, usePilot } from "./hooks/ApiHooks";

const App = () => {
  const [pilots, setPilots] = useState([]);
  const [time, setTime] = useState(new Date());

  const { getDrones } = useDrone();
  const { getPilot } = usePilot();

  // get data for displaying
  const getData = async () => {
    const response = await getDrones();

    if (response) {
      // get time of capture
      const time = new Date(
        response
          .getElementsByTagName("capture")[0]
          .getAttribute("snapshotTimestamp")
      );

      // get drones data
      const dronesXml = response.getElementsByTagName("drone");

      let drones = pilots;
      for (let i = 0; i < dronesXml.length; i++) {
        // get data from xml response
        const serial =
          dronesXml[i].getElementsByTagName("serialNumber")[0].childNodes[0]
            .nodeValue;
        const x =
          dronesXml[i].getElementsByTagName("positionX")[0].childNodes[0]
            .nodeValue;
        const y =
          dronesXml[i].getElementsByTagName("positionY")[0].childNodes[0]
            .nodeValue;

        // calculator distance
        const distance = Math.sqrt(
          Math.pow(x - 250000, 2) + Math.pow(y - 250000, 2)
        );

        // get pilot informatuion by using serial
        const pilotInfo = await getPilot(serial);

        if (pilotInfo) {
          const pilotEmails = drones.map((obj) => obj.pilotEmail);

          // check the pilot exist or not
          if (!pilotEmails.includes(pilotInfo.email)) {
            // add data if the pilot is not exist
            drones.push({
              pilotName: pilotInfo.firstName + " " + pilotInfo.lastName,
              pilotEmail: pilotInfo.email,
              pilotPhone: pilotInfo.phoneNumber,
              distance: Number(distance.toFixed(0)) / 1000,
              currentDistance: Number(distance.toFixed(0)) / 1000,
              time: time,
            });
          } else {
            // update distance if the pilot exist
            const index = drones.findIndex(
              (object) => object.pilotEmail === pilotInfo.email
            );
            if (drones[index].distance > Number(distance.toFixed(0)) / 1000) {
              drones[index].distance = Number(distance.toFixed(0)) / 1000;
            }
            drones[index].currentDistance = Number(distance.toFixed(0)) / 1000;
            drones[index].time = time;
          }
        }
      }

      // remove pilot existed from more than 10 min ~ 600.000ms
      drones = drones.filter((obj) => new Date() - obj.time < 600000);

      // set data for displaying
      setPilots(drones);
    }
  };

  // reload data every 2 second
  useEffect(() => {
    const interval = setInterval(() => {
      getData();
      setTime(new Date());
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    // display list of pilot
    <div>
      <h1>Pilots near the birdnest within 100m</h1>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone number</th>
            <th>Closest distance (m)</th>
            <th>Current distance (m)</th>
          </tr>
        </thead>
        {pilots.length > 0 ? (
          <tbody>
            {pilots
              .filter((pilot) => pilot.distance <= 100)
              .map((pilot, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{pilot.pilotName}</td>
                  <td>{pilot.pilotEmail}</td>
                  <td>{pilot.pilotPhone}</td>
                  <td>{pilot.distance}</td>
                  <td>{pilot.currentDistance}</td>
                </tr>
              ))}
          </tbody>
        ) : (
          <></>
        )}
      </table>
    </div>
  );
};

export default App;
