import React,{useState,useEffect,useCallback} from "react";
import {Button,Row,Col,Modal,Form} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { Formik,Field,useFormik,ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Versionlisttable from '../../widget/datatble';
import TextField from '../../widget/form/TextField';
import { useSelector, useDispatch } from 'react-redux';
import {createTutorial,retrieveTutorials,updateTutorial} from '../../state/version/versionSlice';
import versionService from '../../services/version/versionService';

function VersionList(){
    const count = useSelector((state) => state.version);
    const dispatch = useDispatch();

    const initFetch = useCallback(() => {
        dispatch(retrieveTutorials());
      }, [dispatch])
    
      useEffect(() => {
        initFetch();
      }, [initFetch])

      console.log(count);

    // useEffect(() => {
    //     console.log(versionService.getAll());
    // });

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
        }, {
        dataField: 'name',
        text: 'Product Name'
        }, {
        dataField: 'price',
        text: 'Product Price'
        },
    ];

    // const { SearchBar } = Search;

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const validate = values => {
        const errors = {};
        if (!values.version) {
          errors.version = 'Version is required';
        } else if (values.version.length > 15) {
          errors.version = 'Must be 15 characters or less';
        }
        return errors;
      };

    const formik = useFormik({
        initialValues: {
            version: '',
        },
        validate,
        onSubmit: values => {
          alert(JSON.stringify(values, null, 2));
        },
      });

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
                            <Button onClick={handleShow} variant="success">Add New</Button>
                        </div>
                    </Col>
                </Row>
            </div>

            <Versionlisttable products={products} columns={columns}></Versionlisttable>
            
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Version/Add or Edit</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <form onSubmit={formik.handleSubmit}>
                    <label className="form-label" htmlFor="version">Version:</label>
                    <input
                        className="form-control"
                        id="version"
                        name="version"
                        type="text"
                        placeholder="Enter version"
                        onChange={formik.handleChange}
                        value={formik.values.version}
                    />
                    {formik.errors.version ? <div className="form_error">{formik.errors.version}</div> : null}
                    <Modal.Footer>
                        <Button onClick={handleClose} variant="secondary">Close</Button>
                        <Button type="submit" variant="primary">Save</Button>
                    </Modal.Footer>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default VersionList;