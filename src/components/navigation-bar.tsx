import React, { useEffect, useState } from "react";
import { BottomNavigation, Icon } from "zmp-ui";
import { useNavigate, useLocation } from 'react-router-dom';

const navItems = [
  {
    path: "/",
    label: "Trang chủ",
    icon: <Icon icon="zi-home" />,
  },
  {
    path: "/calendar",
    label: "Lịch của tôi",
    icon: <Icon icon="zi-calendar" />,
  },
];

function NavigationBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("/");
  useEffect(() => {
    navigate(activeTab);
  }, [activeTab])
  useEffect(() => {
    if (navItems.find(item => item.path === location.pathname)) {
      setActiveTab(location.pathname);
    }
  }, [location]);

  return <>
    {location.pathname !== '/restaurant' && <>
      <BottomNavigation
        id="bottom-nav"
        activeKey={activeTab}
        onChange={(key) => setActiveTab(key)}
      >
        {navItems.map(({ path, label, icon }) => <BottomNavigation.Item
          key={path}
          label={label}
          icon={icon}
        />)}
      </BottomNavigation>
    </>}
  </>
}

export default NavigationBar;