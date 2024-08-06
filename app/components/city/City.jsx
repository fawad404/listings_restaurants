import React, { useState } from 'react';

const City = () => {
  const [selectedCity, setSelectedCity] = useState('');

  const handleChange = (event) => {
    setSelectedCity(event.target.value);
    console.log(selectedCity);
  };

  return (
    <div className="relative flex flex-wrap items-center bg-white md:border-r-4 md:border-black">
      <label
        className="flex-shrink-0 px-3 py-1 text-base font-normal text-surface"
        htmlFor="inputGroupSelect01"
      >
        Where
      </label>
      <select
        className="relative m-0 block flex-auto bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-surface outline-none transition duration-200 ease-in-out placeholder:text-neutral-500"
        id="inputGroupSelect01"
        value={selectedCity}
        onChange={handleChange}
      >
        <option className="dark:bg-surface-dark m-2" value="">Your City</option>
        <option className="dark:bg-surface-dark m-2" value="1">One</option>
        <option className="dark:bg-surface-dark m-2" value="2">Two</option>
        <option className="dark:bg-surface-dark m-2" value="3">Three</option>
      </select>
    </div>
  );
};

export default City;
