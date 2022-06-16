import React from 'react';
import {
  Page,
  Navbar,
  NavTitleLarge,
  List,
  ListItem,
  useStore,
  Card,
} from 'zmp-framework/react';
import AppItems from '../components/app-items';
import UserCard from '../components/user-card';

const HomePage = () => {
  const user = useStore('user');
  return (
    <Page name="home" >

      {/* Page content */}
      <Card inset>
        <p>Here is your blank ZMP app with tabs-layout. Let's see what we have here.</p>
      </Card>

      {/* Grid apps */}
      <AppItems />

      {/* Route */}
      <List>
        <ListItem title="Dynamic (Component) Route" link="/dynamic-route/?blog=45&post=125&foo=bar" />
        <ListItem title="Default Route (404)" link="/something-that-doesnt-exist" />
        <ListItem title="About" link="/about/" />
      </List>
    </Page>
  );
}

export default HomePage;