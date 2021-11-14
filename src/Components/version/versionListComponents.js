import React,{useState} from "react";
import {Button,Row,Col,Modal,Form} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons';
import GetRequests from "../../services/axiosClient";
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import '../../assets/css/widget/datatable.css';
import { useSelector, useDispatch } from 'react-redux';
import version from '../../state/version/versionSlice';

function VersionList(){
    const count = useSelector((state) => state.version.abc);
     const dispatch = useDispatch();
    const products = [
        {
        id: 1,
        name: 'TV',
        'price': 1000
        },
        {
        id: 2,
        name: 'Mobile',
        'price': 500
        },
        {
        id: 3,
        name: 'Book',
        'price': 20
        },
        {
            id: 4,
            name: 'Book 4',
            'price': 204
        },
        {
            id: 5,
            name: 'Book 5',
            'price': 205
        },
        {
            id: 6,
            name: 'Book 6',
            'price': 206
        },
        {
            id: 7,
            name: 'Book 7',
            'price': 207
        },
        {
            id: 8,
            name: 'Book 8',
            'price': 208
        },
        {
            id: 9,
            name: 'Book 9',
            'price': 209
        },
        {
            id: 10,
            name: 'Book 10',
            'price': 2010
        },
        {
            id: 11,
            name: 'Book 11',
            'price': 2011
        },
    ];
    const columns = [{
        dataField: 'id',
        text: 'Product ID',
        sort: true
        }, {
        dataField: 'name',
        text: 'Product Name'
        }, {
        dataField: 'price',
        text: 'Product Price'
        },
    ];
    const { SearchBar } = Search;

    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    return(
        <div>
            <div className="content_header">
                <Row className="Row">
                    <Col xs={6} md={6} className="my-auto">
                        <div className="page_title">
                            <h1><FontAwesomeIcon icon={faList}/>Version List</h1>
                        </div>
                    </Col>
                    <Col xs={6} md={6} className="text-right">
                        <div className="page_action_btn">
                            <a href="#"><Button onClick={handleShow} variant="success">Add New</Button></a>
                        </div>
                    </Col>
                </Row>
            </div>
            <ToolkitProvider
                keyField="id"
                data={ products }
                columns={ columns }
                search
                >
                {
                    props => (
                    <div>
                        <div className="table_search">
                            <SearchBar { ...props.searchProps } />
                        </div>
                        <BootstrapTable
                        { ...props.baseProps } pagination = {paginationFactory()}
                        />
                    </div>
                    )
                }
            </ToolkitProvider>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Version/Add or Edit</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Version:</Form.Label>
                        <Form.Control type="text" placeholder="Enter version" />
                    </Form.Group>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button type="submit" variant="primary" onClick={handleClose}>
                            Save
                        </Button>
                    </Modal.Footer>
                </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default VersionList;