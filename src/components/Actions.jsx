import React from "react";

const Action = ({ handleClick, type, className, disabled  }) => {
  return (
    <button disabled={disabled} className={className} onClick={handleClick}>
      {type}
    </button>
  );
};

export default Action;



