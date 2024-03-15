import React, { useState } from 'react';
import { Card, Accordion, Button, Modal, Form } from 'react-bootstrap';
import { FaEdit, FaRegCopy, FaExternalLinkAlt, FaRegTrashAlt, FaShareAlt } from 'react-icons/fa';
import { useUpdateKeyMutation, useDeleteKeyMutation, useShareKeyMutation } from "../slices/keysSlice";

const KeyCard = ({ keyItem, index }) => {

    // Edit Moda
    const [showEditModal, setShowEditModal] = useState(false);
    const handleShowEditModal = () => setShowEditModal(true);
    const handleCloseEditModal = () => setShowEditModal(false);
    const [updateKey] = useUpdateKeyMutation();

    /* Delete Modal */
    const [showDeleteModal, setDeleteModal] = useState(false);
    const handleShowDeleteModal = () => setDeleteModal(true);
    const handleCloseDeleteModal = () => setDeleteModal(false);
    const [deleteKey, { isLoading }] = useDeleteKeyMutation();

    /* Share Modal */
    const [showShareModal, setShowShareModal] = useState(false);
    const handleShowShareModal = () => setShowShareModal(true);
    const handleCloseShareModal = () => setShowShareModal(false);
    const [shareEmail, setShareEmail] = useState("");
    const [shareKeyMutation] = useUpdateKeyMutation();


    /* Local State for form fields */
    const [title, setTitle] = useState(keyItem.title);
    const [apiKey, setApiKey] = useState(keyItem.apiKey);
    const [desc, setDesc] = useState(keyItem.desc);
    const [docs, setDocs] = useState(keyItem.docs);



    const copyToClipboard = (content) => {
        navigator.clipboard.writeText(content).then(() => {
            alert('API Key copied to clipboard!');
        }, (err) => {
            console.error('Failed to copy content: ', err);
        });
    };

    const openDocumentation = (url) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    const saveChanges = async () => {
        try {
            // Call the update mutation with the updated state values
            await updateKey({ keyId: keyItem._id, title, apiKey, desc, docs }).unwrap();
            handleCloseEditModal();
            // You might want to refetch or update the local state to reflect these changes
        } catch (err) {
            console.error('Failed to update key:', err);
            // Handle the error (e.g., showing a notification to the user)
        }
    };

    // Handle Share
    const handleShare = async () => {
        try {
            await shareKeyMutation({ keyId: keyItem._id, email: shareEmail }).unwrap();
            alert('Key shared successfully');
            setShareEmail(''); // Reset the input field
            handleCloseShareModal();
        } catch (error) {
            console.error('Failed to share key:', error);
            // Handle the error, possibly by displaying a message to the user
        }
    };

    const handleDelete = async () => {
        try {
            await deleteKey({ keyId: keyItem._id }).unwrap();
            handleCloseDeleteModal();
            // Optionally, trigger any additional actions, like refreshing the list of keys
        } catch (error) {
            console.error('Failed to delete the key:', error);
            // Handle the error, possibly by displaying a message to the user
        }
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
                        <div>
                            <Button variant="secondary" onClick={handleShowEditModal}><FaEdit /> Edit</Button>
                            <Button variant="danger mx-2" onClick={handleShowDeleteModal}><FaRegTrashAlt /> Delete</Button>
                        </div>

                        <div>
                            <Button variant="primary" onClick={handleShowShareModal}><FaShareAlt /> Share</Button>
                            {keyItem.docs && (
                                <Button
                                    variant="primary"
                                    onClick={() => openDocumentation(keyItem.docs)}
                                    className="mx-2"
                                >
                                    <FaExternalLinkAlt /> Open Docs
                                </Button>
                            )}
                            <Button variant="primary" onClick={() => copyToClipboard(keyItem.apiKey)}><FaRegCopy /> Copy API Key</Button>
                        </div>
                    </div>
                </Accordion.Body>
            </Accordion.Item>

            {/* Edit Modal  */}
            <Modal show={showEditModal} onHide={handleCloseEditModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Item</Modal.Title>
                </Modal.Header>
                <Modal.Body className='mx-2'>
                    <Form>
                        {/* Edit Title */}
                        <Form.Group className="my-2" controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Form.Group>

                        {/* Edit API Key */}
                        <Form.Group className="my-2" controlId="apiKey">
                            <Form.Label>API Key</Form.Label>
                            <Form.Control
                                type="text"
                                value={apiKey}
                                onChange={(e) => setApiKey(e.target.value)}
                            />
                        </Form.Group>

                        {/* Edit Description */}
                        <Form.Group className="my-2" controlId="desc">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                            />
                        </Form.Group>

                        {/* Edit Docs Link */}
                        <Form.Group className="my-2" controlId="docs">
                            <Form.Label>Docs</Form.Label>
                            <Form.Control
                                type="text"
                                value={docs}
                                onChange={(e) => setDocs(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer className="mt-3 d-flex justify-content-between">
                    <Button variant="secondary" onClick={handleCloseEditModal}>Close</Button>
                    <Button variant="primary" onClick={saveChanges}>Save Changes</Button>
                </Modal.Footer>
            </Modal>

            {/* Delete Modal */}
            <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Key</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete this key? This action cannot be undone.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDeleteModal}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Delete Key
                    </Button>
                </Modal.Footer>
            </Modal>



            {/* Share Modal */}
            <Modal show={showShareModal} onHide={handleCloseShareModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Share Key</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>Already Shared With:</h5>
                    <ul>
                        {keyItem.sharedWithEmails && keyItem.sharedWithEmails.length > 0 ? (
                            keyItem.sharedWithEmails.map((email, index) => (
                                <li key={index}>{email}</li>
                            ))
                        ) : (
                            <p>This key has not been shared with anyone yet.</p>
                        )}
                    </ul>

                    <Form>
                        <Form.Group controlId="shareWithEmail">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email to share with"
                                value={shareEmail}
                                onChange={(e) => setShareEmail(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseShareModal}>Close</Button>
                    <Button variant="primary" onClick={handleShare}>Share</Button>
                </Modal.Footer>
            </Modal>


        </Card >
    );
};

export default KeyCard;
