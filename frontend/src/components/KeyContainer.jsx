import React from 'react';
import { Container, Accordion, Card } from 'react-bootstrap';
import KeyCard from './KeyCard'; // Adjust the path as needed

const KeyContainer = ({ keys }) => {
    // Check if keys is undefined or an empty array and handle accordingly
    if (typeof keys === 'undefined' || keys.length === 0) {
        return (
            <Container>
                <Card className="m-2 p-2">No keys to display or data is still loading.</Card>
            </Container>
        );
    }

    // Create a copy of the keys array and sort that copy
    const sortedKeys = [...keys].sort((a, b) => new Date(b.updatedAt) - new Date(a.createdAt));

    return (
        <Container>
            <Accordion defaultActiveKey="0">
                {sortedKeys.map((key, index) => (
                    // It's better to avoid using indexes as keys if you have unique identifiers
                    <KeyCard key={key.id || index} keyItem={key} index={index} />
                ))}
            </Accordion>
        </Container>
    );
};

export default KeyContainer;
