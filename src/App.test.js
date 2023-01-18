import { useDrones, usePilot } from "./hooks/ApiHooks";

// test having a screenshot
test("response for screenshot", async () => {
  const _response = await useDrones();
  const response = new DOMParser().parseFromString(_response, "text/xml");
  const capture = response.getElementsByTagName("capture");

  expect(capture.length).toBeGreaterThan(0);
});

// test having pilot information
test("getting pilot information", async () => {
  const _response = await useDrones();
  const response = new DOMParser().parseFromString(_response, "text/xml");
  const dronesXml = response.getElementsByTagName("drone");
  if (dronesXml.length > 0) {
    const serial =
      dronesXml[0].getElementsByTagName("serialNumber")[0].childNodes[0]
        .nodeValue;
    const pilot = await usePilot(serial);

    expect(pilot.firstName != "").toEqual(true);
  }
});

// test error when getting pilot information
test("error when getting pilot information", async () => {
  const response = await usePilot("1234");

  expect(response).toBeNull;
});
