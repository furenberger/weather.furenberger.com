export const getStateFlag = async (stateName) => {
  return fetch(`/stateAbbreviation/${stateName}`)
    .then((response) => response.json())
    .then((json) => {
      const abbrev = json.STATE_ABBREV.toLowerCase();
      return `http://flags.ox3.in/svg/us/${abbrev}.svg`;
    });
};

export const getWeather = async (zipCode) => {
  return fetch(`/weather/${zipCode}`).then((response) => response.json());
};

export const isZipCode = (zipCode) => {
  // match 53005 and or 53005-0414
  const regexp = /^[0-9]{5}(?:-[0-9]{4})?$/;

  if (regexp.test(zipCode)) {
    return true;
  } else {
    return false;
  }
};
