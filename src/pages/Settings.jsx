import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteAccount from "../components/DeleteAccount";
import ChangePassword from "../components/ChangePassword";

const Settings = () => {
  let navigate = useNavigate();
  const [emailNotifications, setEmailNotifications] = useState(true);

  const handleToggle = () => {
    setEmailNotifications(!emailNotifications);
  };

  return (
    <div className="settings-container">
      <h1>Settings</h1>

      <div className="setting-item">
        <ChangePassword />
      </div>

      <div className="setting-item">
        <DeleteAccount />
      </div>
    </div>
  );
};

export default Settings;
