import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
  const [pilots, setPilots] = useState([
    {
      id: 1,
      pilotName: "A",
      pilotEmail: "a@gmail.com",
      pilotPhone: "0123",
      distance: 200,
    },
    {
      id: 2,
      pilotName: "B",
      pilotEmail: "b@gmail.com",
      pilotPhone: "1234",
      distance: 100,
    },
  ]);

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
            pilots.map((pilot) => (
              <tr key={pilot.id}>
                <td>{pilot.id}</td>
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
}

export default App;
