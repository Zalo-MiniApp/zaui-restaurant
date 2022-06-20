import { Avatar, Box, Text, Title, useStore } from "zmp-framework/react";
import { userInfo } from "zmp-sdk";

function Header() {
  const user: userInfo = useStore('user')
  return <Box>
    <Title>Nhà hàng Jolliboo</Title>
    <Avatar src={user.avatar} />
    <Text>Chào, {user.name}!</Text>
  </Box>;
}

export default Header;