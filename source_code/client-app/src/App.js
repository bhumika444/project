import React,{useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './NavBar.js';
import Profile from './Profile.js';
import Addition from './Addition.js';
import InventoryManagement from './InventoryManagement.js';
import ThirdPartyAPI from './ThirdPartyAPI.js';

function App() {
  const [activeTab, setActiveTab] = useState('Profile');

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };
  return (
    <div>
      <NavBar onTabChange={handleTabChange} />
      {activeTab === 'Profile' && <Profile />}
      {activeTab === 'Addition' && <Addition />}
      {activeTab === 'InventoryManagement' && <InventoryManagement/>}
      {activeTab === 'ThirdPartyAPI' && <ThirdPartyAPI/>}
    </div>
  );
}

export default App;
