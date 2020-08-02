export const getStateFlag = async (stateName) => {
  return fetch(`/stateAbbreviation/${stateName}`)
    .then(response => response.json())
    .then(json => {
      const abbrev = json.STATE_ABBREV.toLowerCase();
      return `http://flags.ox3.in/svg/us/${abbrev}.svg`
    })
};
