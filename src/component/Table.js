import "../styles/styles.css";
import React, { useContext, useEffect, useState } from "react";
import { getData } from "../utils/getData";
import { MainContext } from "../context/MainContext";

const Table = () => {
  const context = useContext(MainContext);
  const { pilots } = useContext(MainContext);

  const [time, setTime] = useState(new Date());

  // reload data every 2 second
  useEffect(() => {
    const interval = setInterval(() => {
      getData(context);
      setTime(new Date());
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
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
            <th>Last known distance (m)</th>
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

export default Table;
