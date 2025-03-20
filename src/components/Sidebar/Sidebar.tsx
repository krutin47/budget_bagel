import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        {/* <FaLightbulb size={28} /> */}
      </div>
      <nav className="sidebar-menu">
        <NavLink to="/" className="sidebar-item">
          {/* <HomeIcon size={20} /> */}
          Home
        </NavLink>
        <NavLink to="/transactions" className="sidebar-item">
          {/* <FaClipboardList size={20} /> */}
          Transection
        </NavLink>
        <NavLink to="/Budget" className="sidebar-item">
          {/* <FaClipboardList size={20} /> */}
          Budget
        </NavLink>
        <NavLink to="/Goals" className="sidebar-item">
          {/* <FaClipboardList size={20} /> */}
          Goals
        </NavLink>
        <NavLink to="/analytics" className="sidebar-item">
          {/* <FaChartBar size={20} /> */}
          Analytics
        </NavLink>
        <NavLink to="/wallet" className="sidebar-item">
          {/* <FaWallet size={20} /> */}
          Wallet
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
