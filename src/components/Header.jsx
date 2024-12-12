import React from 'react';

const Header = ({ month, year, changeMonth }) => {
  return (
    <header className="header">
      <button onClick={() => changeMonth(-1)}>Previous</button>
      <h1>{`${month} ${year}`}</h1>
      <button onClick={() => changeMonth(1)}>Next</button>
    </header>
  );
};

export default Header;
