// NavBar.js

import React from 'react';

function NavBar({ onTabChange }) {
  const handleTabClick = (event, tabName) => {
    event.preventDefault(); // Prevent default navigation behavior
    onTabChange(tabName); // Call the onTabChange function with the tabName
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <a className="navbar-brand" href="#">BD</a>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <a className="nav-link" href="/profile" onClick={(event) => handleTabClick(event,'Profile')}>Profile</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/addition" onClick={(event) => handleTabClick(event,'Addition')}>Addition</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/inventorymanagement" onClick={(event) => handleTabClick(event,'InventoryManagement')}>Inventory</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/thirdpartyapi" onClick={(event) => handleTabClick(event,'ThirdPartyAPI')}>ThirdPartyAPI</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
