import { baseUrl } from "../utils/variables";

const doFetch = async (url, options = {}, type) => {
  try {
    const response = await fetch(url, options);
    if (response.ok) {
      if (type == "xml") return response.text();
      else return response.json();
    }
    return null;
  } catch (err) {
    console.log("error", err);
    return null;
  }
};

// get drones data
const useDrones = async () => {
  const options = {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
    mode: "cors",
  };
  return await doFetch(baseUrl + "drones", options, "xml");
};

// get pilot data
const usePilot = async (serialNumber) => {
  const options = {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    mode: "cors",
  };

  return await doFetch(baseUrl + "pilots/" + serialNumber, options, "json");
};

export { useDrones, usePilot };
