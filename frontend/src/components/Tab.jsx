// Imports
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Hero from './Hero';
import KeyAcc from './KeyAcc';

function TabsComponent() {
    return (
        <Tabs
            defaultActiveKey="profile"
            id="justify-tab-example"
            className="mb-4 mt-4"
            justify
        >
            <Tab eventKey="home" title="Create a Key">
                <Hero />
            </Tab>
            <Tab eventKey="profile" title="Your Keys">
                <KeyAcc />
            </Tab>
            <Tab eventKey="longer-tab" title="Shared Keys">
                <KeyAcc />
            </Tab>
        </Tabs>
    );
};

export default TabsComponent;