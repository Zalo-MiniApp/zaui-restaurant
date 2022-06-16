import { Link, Tabbar } from "zmp-framework/react";

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