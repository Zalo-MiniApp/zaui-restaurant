import { Link, Tabbar, zmp } from "zmp-framework/react";

export const hideNavigationBar = () => {
  zmp.toolbar.hide("#app-tab-bar");
}

export const showNavigationBar = () => {
  zmp.toolbar.show("#app-tab-bar");
}

function NavigationBar() {

  return <Tabbar bottom id="app-tab-bar">
    <Link tabLink="#view-home" iconZMP="zi-home" tabLinkActive>
      Trang chủ
    </Link>
    <Link tabLink="#view-calendar" iconZMP="zi-calendar">
      Lịch của tôi
    </Link>
  </Tabbar>;
}

export default NavigationBar;