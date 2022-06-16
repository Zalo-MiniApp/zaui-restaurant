import {
  Page,
  List,
  ListItem,
  useStore,
  Card,
} from 'zmp-framework/react';

const HomePage = () => {
  const user = useStore('user');
  return (
    <Page name="home" >

      {/* Page content */}
      <Card inset>
        <p>Here is your blank ZMP app with tabs-layout. Let's see what we have here.</p>
      </Card>

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