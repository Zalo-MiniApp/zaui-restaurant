import React from "react";
import {
  Page,
  List,
  ListItem,
  useStore,
  Title,
  Box
} from "zmp-framework/react";
import UserCard from "../components/user-card";

const SettingsPage = () => {
  const user = useStore("user");

  return (
    <Page name="settings">
      <Box m="0" p="4">
        <Title>Settings</Title>
        <List className="m-0">
          <ListItem link="/user/">
            <UserCard user={user} />
          </ListItem>
        </List>
      </Box>
    </Page>
  );
};

export default SettingsPage;