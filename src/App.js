import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { useDrone, usePilot } from "./hooks/ApiHooks";


const App = () => {
  const [pilots, setPilots] = useState([
    {
      pilotName: "A",
      pilotEmail: "a@gmail.com",
      pilotPhone: "0123",
      distance: 200,
    },
    {
      pilotName: "B",
      pilotEmail: "b@gmail.com",
      pilotPhone: "1234",
      distance: 100,
    },
  ]);

  const { getDrones } = useDrone();
  const { getPilot } = usePilot();

  const test = async () => {
    const drone = await getDrones();

    const serial = drone.getElementsByTagName('drone')[0].getElementsByTagName("serialNumber")[0].childNodes[0].nodeValue
    console.log("drone is", drone);

    // const pilot = await getPilot(serial+"8745");
    const pilot = await getPilot(serial);

    console.log("pilot is", pilot);
  };

  useEffect(() => {
    console.log("run one time");
    test();
    // eslint-disable-next-line
  }, []);

  return (
    // display list of pilot
    <div>
      <h3>Pilots near the birdnest</h3>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone number</th>
            <th>Closest distance</th>
          </tr>
        </thead>
        <tbody>
          {pilots &&
            pilots.map((pilot, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{pilot.pilotName}</td>
                <td>{pilot.pilotEmail}</td>
                <td>{pilot.pilotPhone}</td>
                <td>{pilot.distance}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
