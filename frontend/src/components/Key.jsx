import React from 'react';
import { Card, Accordion, Button } from 'react-bootstrap';

const KeyCard = ({ keyItem, index }) => {
    // Function to copy the content to the clipboard
    const copyToClipboard = (content) => {
        navigator.clipboard.writeText(content).then(() => {
            alert('Content copied to clipboard!'); // Feedback to the user (consider using a more subtle notification)
        }, (err) => {
            console.error('Failed to copy content: ', err); // Error handling
        });
    };

    return (
        <Card className="mb-2">
            <Accordion.Item eventKey={`${index}`}>
                <Accordion.Header>
                    {keyItem.title}
                </Accordion.Header>
                <Accordion.Body>
                    <h5>API Key:</h5>
                    <p>{keyItem.content}</p>
                    <h5>Description:</h5>
                    <p>{keyItem.desc}</p>
                    <small>Last updated: {new Date(keyItem.updatedAt).toLocaleString()}</small>
                    <div className="mt-3 d-flex justify-content-between">
                        <Button variant="secondary">Edit</Button>
                        <Button variant="primary" onClick={() => copyToClipboard(keyItem.content)}>Copy API Key</Button>
                    </div>
                </Accordion.Body>
            </Accordion.Item>
        </Card>
    );
};

export default KeyCard;
