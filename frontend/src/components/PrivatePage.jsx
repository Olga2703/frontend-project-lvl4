import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Row,
  Col,
  Button,
  Nav,
} from 'react-bootstrap';
import useAuth from '../hooks/index.js';
import routes from '../routes.js';

const PrivatePage = () => {
  const auth = useAuth();
  const [content, setContent] = useState('');
  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios.get(routes.dataPath(), { headers: auth.getAuthHeader() });
      setContent(data);
    };
    fetch();
  }, []);
  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
        <Row className="h-100 bg-white flex-md-row">
            <Col xs={4} md={2} className="border-end pt-5 px-0 bg-light">
                <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
                    <span>Каналы</span>
                    <Button type="button" variant="" className="p-0 btn-group-vertical text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"></path>
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
                        </svg>
                        <span className="visually-hidden">+</span>
                    </Button>
                    {/* <Nav variant="pills" className="flex-column nav-fill px-2">
                        { content.channels.map((channel) => (
                            <Nav.Item key={channel.id} className="w-100">
                                <Button className="w-100 rounded-0 text-start btn">
                                    <span className="me-1">#</span>
                                    {channel.name}
                                </Button>
                            </Nav.Item>
                        )) }
                    </Nav> */}
                </div>
            </Col>
            <Col className="p-0 h-100">
                <div className="bg-light mb-4 p-3 shadow-sm small">
                </div>
                <div id="messages-box" className="chat-messages overflow-auto px-5"></div>
                <div className="mt-auto px-5 py-3"></div>
            </Col>
        </Row>
    </Container>
  );
};

export default PrivatePage;
