import React, { useEffect, useState } from "react";
import { BottomNavigation, Icon } from "zmp-ui";
import { useNavigate } from 'react-router-dom';

export const hideNavigationBar = () => {
  throw new Error("To be implemented");
}

export const showNavigationBar = () => {
  throw new Error("To be implemented");
}

function NavigationBar() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("/");
  useEffect(() => {
    navigate(activeTab);
  }, [activeTab])
  return <BottomNavigation
    id="bottom-nav"
    fixed
    activeKey={activeTab}
    onChange={(key) => setActiveTab(key)}
  >
    <BottomNavigation.Item
      key="/"
      label="Trang chủ"
      icon={<Icon icon="zi-home" />}
    />
    <BottomNavigation.Item
      key="/calendar"
      label="Lịch của tôi"
      icon={<Icon icon="zi-calendar" />}
    />
  </BottomNavigation>
}

export default NavigationBar;