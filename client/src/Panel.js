import React from "react";

const Panel = ({selectedState, setSelectedState}) => {
  return (
    <div className="panel">
      Selected State: {selectedState ? selectedState.stateName : ''}
    </div>
  );
};

export default Panel;
