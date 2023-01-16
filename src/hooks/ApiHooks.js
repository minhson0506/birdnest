import { baseUrl } from "../utils/variables";

const doFetchXml = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    const xml = await response.text();
    console.log('response is ',response)
    if (response.ok) {
      return new DOMParser().parseFromString(xml, "text/xml");
    } else {
      const message = xml.error ? `${xml.message}: ${xml.error}` : xml.message;
      console.log("error", new Error(message || response.statusText));
      return null;
    }
  } catch (err) {
    console.log("error", err);
    return null;
  }
};

const useDrone = () => {
  // get drones data
  const getDrones = async () => {
    const options = {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
      },
    };
    return await doFetchXml(baseUrl + "drones", options);
    // return await doFetchXml("/drones", options);
  };

  return { getDrones };
};

const doFetchJson = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    const json = await response.json();

    if (response.ok) {
      return json;
    } else {
      const message = json.error
        ? `${json.message}: ${json.error}`
        : json.message;
      console.log("error", new Error(message || response.statusText));
      return null;
    }
  } catch (err) {
    console.log("error", err);
    return null;
  }
};

const usePilot = () => {
  // get pilot data
  const getPilot = async (serialNumber) => {
    const options = {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    };

    return await doFetchJson(baseUrl + "pilots/" + serialNumber, options);
    // return await doFetchJson("pilots/" + serialNumber, options);
  };

  return { getPilot };
};

export { useDrone, usePilot };
