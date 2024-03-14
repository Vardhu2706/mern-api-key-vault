import React from 'react';
import { Container, Accordion, Card } from 'react-bootstrap';
import KeyCard from './KeyCard'; // Adjust the path as needed

const KeyContainer = ({ keys }) => {
    // Check if keys is undefined or an empty array and handle accordingly
    if (typeof keys === 'undefined' || keys.length === 0) {
        // You could render a loading spinner, a message, or return null
        return (
            <Container>
                <Card className="m-2 p-2">No keys to display or data is still loading.</Card>
            </Container>
        );
    }


    return (
        <Container>
            <Accordion defaultActiveKey="0">
                {keys.map((key, index) => (
                    // Use a unique identifier if possible instead of index
                    <KeyCard key={key.id || index} keyItem={key} index={index} />
                ))}
            </Accordion>
        </Container>
    );
};

export default KeyContainer;
