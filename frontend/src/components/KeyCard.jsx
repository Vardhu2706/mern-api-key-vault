import React, { useState } from 'react';
import { Card, Accordion, Button, Modal, Form } from 'react-bootstrap';
import FormContainer from "./FormContainer";
import { FaEdit, FaRegCopy, FaExternalLinkAlt } from 'react-icons/fa';

const KeyCard = ({ keyItem, index }) => {

    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const copyToClipboard = (content) => {
        navigator.clipboard.writeText(content).then(() => {
            alert('Content copied to clipboard!');
        }, (err) => {
            console.error('Failed to copy content: ', err);
        });
    };

    const openDocumentation = (url) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <Card className="mb-2">
            <Accordion.Item eventKey={`${index}`}>
                <Accordion.Header>
                    {keyItem.title}
                </Accordion.Header>
                <Accordion.Body>
                    <h5>API Key:</h5>
                    <p>{keyItem.apiKey}</p>
                    <h5>Description:</h5>
                    <p>{keyItem.desc}</p>
                    <small>Last updated: {new Date(keyItem.updatedAt).toLocaleString()}</small>
                    <div className="mt-3 d-flex justify-content-between">
                        <Button variant="secondary" onClick={handleShowModal}><FaEdit /> Edit</Button>
                        <div>
                            {keyItem.docs && (
                                <Button
                                    variant="primary"
                                    onClick={() => openDocumentation(keyItem.docs)}
                                    className="mx-2"
                                >
                                    <FaExternalLinkAlt /> Open Docs
                                </Button>
                            )}
                            <Button variant="primary" onClick={() => copyToClipboard(keyItem.content)}><FaRegCopy /> Copy API Key</Button>
                        </div>
                    </div>
                </Accordion.Body>
            </Accordion.Item>



            <Modal show={showModal} onHide={handleCloseModal}>


                {/* Modal Header */}
                <Modal.Header closeButton>
                    <Modal.Title>Edit Item</Modal.Title>
                </Modal.Header>

                {/* Body */}
                <Modal.Body className='mx-2'>

                    <Form>
                        {/* Edit Title */}
                        <Form.Group className="my-2" controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" value={keyItem.title} >
                            </Form.Control>
                        </Form.Group>

                        {/* Edit API Key */}
                        <Form.Group className="my-2" controlId="desc">
                            <Form.Label>API KEy</Form.Label>
                            <Form.Control type="text" value={keyItem.desc} >
                            </Form.Control>
                        </Form.Group>

                        {/* Edit Description */}
                        <Form.Group className="my-2" controlId="content">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" value={keyItem.content} >
                            </Form.Control>
                        </Form.Group>

                        {/* Edit Docs Link */}
                        <Form.Group className="my-2" controlId="docs">
                            <Form.Label>Docs</Form.Label>
                            <Form.Control type="text" value={keyItem.docs} >
                            </Form.Control>
                        </Form.Group>
                    </Form>

                </Modal.Body>

                {/*  */}
                <Modal.Footer className="mt-3 d-flex justify-content-between">
                    <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                    <Button variant="primary" onClick={handleCloseModal}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </Card >
    );
};

export default KeyCard;
