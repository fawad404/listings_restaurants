import React from 'react';

const WhatCom = () => {
  return (
    <div className="flex items-center space-x-4 bg-white mb-5 md:mb-0 md:border-r-2 md:border-gray-600 ">
      <label
        htmlFor="simple-search"
        className="flex-shrink-0 px-3 py-1 text-base font-normal text-surface"
      >
        What
      </label>
      <input
        type="text"
        id="simple-search"
        className="bg-gray-50 outline-none text-gray-900 text-sm  block w-full p-2.5"
        placeholder="Ex:food, service, bar, hotel"
        required
      />
    </div>
  );
}

export default WhatCom;
