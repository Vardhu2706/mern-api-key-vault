import React, { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import CreateKey from './CreateKey';
import KeyContainer from './KeyContainer';
import Loader from './Loader';
import { useGetSharedKeysQuery, useGetKeysQuery } from "../slices/keysSlice";

function TabsComponent() {
    const [key, setKey] = useState('create-key');
    const {
        data: userKeys,
        isLoading: isLoadingUserKeys
    } = useGetKeysQuery(undefined, { skip: key !== 'your-keys' });
    const {
        data: sharedKeys,
        isLoading: isLoadingSharedKeys
    } = useGetSharedKeysQuery(undefined, { skip: key !== 'shared-keys' });

    const handleSelect = (k) => {
        setKey(k);
    };

    return (
        <Tabs
            activeKey={key}
            onSelect={handleSelect}
            className="mb-4 mt-4"
            justify
        >
            <Tab eventKey="create-key" title="Create a Key">
                {/* Pass setKey to CreateKey to allow tab switching */}
                <CreateKey setActiveKey={setKey} />
            </Tab>
            <Tab eventKey="your-keys" title="Your Keys">
                {isLoadingUserKeys ? <Loader /> : <KeyContainer keys={userKeys} />}
            </Tab>
            <Tab eventKey="shared-keys" title="Shared Keys">
                {isLoadingSharedKeys ? <Loader /> : <KeyContainer keys={sharedKeys} />}
            </Tab>
        </Tabs>
    );
}

export default TabsComponent;
