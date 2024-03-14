import React from 'react';
import { Container, Accordion } from 'react-bootstrap';
import KeyCard from './Key'; // Adjust the path as needed
import data from '../data/data';

const KeyAcc = () => {
    console.log(data);

    return (
        <Container>
            <Accordion defaultActiveKey="0">
                {data.map((key, index) => (
                    <KeyCard key={index} keyItem={key} index={index} />
                ))}
            </Accordion>
        </Container>
    );
};

export default KeyAcc;
