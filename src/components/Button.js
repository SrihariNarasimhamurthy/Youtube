import React from "react";

const Button = ({ name }) => {
  return (
    <div>
      <button className="px-3 py-2 m-2 bg-gray-100 font-bold text-black text-sm rounded-lg">
        {name}
      </button>
    </div>
  );
};

export default Button;
