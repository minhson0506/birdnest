import { usePilot, useDrones } from "../hooks/ApiHooks";

// get data for displaying
const getData = async (context) => {
  const { pilots, setPilots } = context;

  const _response = await useDrones();

  if (_response) {
    // convert to xml data for getting information
    const response = new DOMParser().parseFromString(_response, "text/xml");

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

      // get pilot information by using serial
      const pilotInfo = await usePilot(serial);

      if (pilotInfo) {
        if (drones.length == 0) {
          // if list of pilots is empty, add pilot to list
          drones.push({
            pilotName: pilotInfo.firstName + " " + pilotInfo.lastName,
            pilotEmail: pilotInfo.email,
            pilotPhone: pilotInfo.phoneNumber,
            distance: Number(distance.toFixed(0)) / 1000,
            currentDistance: Number(distance.toFixed(0)) / 1000,
            time: time,
          });
        } else {
          const pilotEmails = drones.map((obj) => obj.pilotEmail);

          // check the pilot exist or not
          if (!pilotEmails.includes(pilotInfo.email)) {
            // add data of pilot if the pilot is not exist
            drones.push({
              pilotName: pilotInfo.firstName + " " + pilotInfo.lastName,
              pilotEmail: pilotInfo.email,
              pilotPhone: pilotInfo.phoneNumber,
              distance: Number(distance.toFixed(0)) / 1000,
              currentDistance: Number(distance.toFixed(0)) / 1000,
              time: time,
            });
          } else {
            // update information if the pilot exist
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
    }

    // remove pilot existed from more than 10 min ~ 600.000ms
    drones = drones.filter((obj) => new Date() - obj.time < 600000);

    // set data for displaying
    setPilots(drones);
  }
};

export { getData };
