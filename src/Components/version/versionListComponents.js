import React,{useState,useEffect,useCallback, version} from "react";
import {Button,Row,Col,Modal,Form} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { Formik,Field,useFormik,ErrorMessage } from 'formik';
//import * as Yup from 'yup';
import Versionlisttable from '../../widget/datatble';
import { useSelector, useDispatch } from 'react-redux';
import {getAllVersion, deleteVersion, createVersion} from '../../state/version/versionSlice';
//import versionService from '../../services/version/versionService';
//import stringifyObject from 'stringify-object';

function VersionList(){
    /*============version state initialize=============*/
    const versionList = useSelector((state) => state.version.value);
    const dispatch = useDispatch();
    const [versions, setVersion] = useState(versionList[0]);
    console.log(versionList[0]);
    useEffect(() => {
        dispatch(getAllVersion());
      }, [])
    
    /*============version delete funtion=============*/
    const removeVersion = (id) => {
    dispatch(deleteVersion(id))
      .then(response => {
        alert('Version deleted');
      })
      .catch(e => {
        console.log(e);
      });
    };
    
    /*============datatable edit delete button and datatable data send=============*/
    const ActionFormat = (id, row) => {
        return (
            <div>
                <button type="button"className="btn btn-outline-primary btn-sm ts-buttom edit_button" size="sm">
                    Edit
                </button>
                <button type="button" className="btn btn-outline-danger btn-sm ml-2 ts-buttom delete_button" size="sm" onClick={() => removeVersion(id)}>
                    Delete
                </button>
            </div>
        );
    }

    const columns = [{
        dataField: 'id',
        text: 'ID',
        }, {
        dataField: 'name',
        text: 'Version Name'
        }, {
        dataField: 'code',
        text: 'Code'
        },{
        dataField: 'date',
        text: 'Action',
        formatter: ActionFormat,
        },
    ];

    //   useEffect(() => {
    //     dispatch(getAllVersion());
    //   }, [versions])

    /*============form validation and submit=============*/
    const validate = values => {
        const errors = {};
        if (!values.name) {
        errors.name = 'Version is required';
        }
        if (!values.code) {
            errors.code = 'Code is required';
        } else if (values.code.length < 4 ) {
            errors.code = 'Code Must be 4 number';
        }
        return errors;
    };

    const formik = useFormik({
        initialValues: {
            name: '',
            code: '',
        },
        validate,
        onSubmit: (values, onSubmitProps) => {
            dispatch(createVersion(JSON.stringify(values, " ", 2)));
            onSubmitProps.resetForm();
            setShow(false);
        },
    });

    /*============form modal show and hide=============*/
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(formik.setErrors({}));
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
                            <Button onClick={handleShow} variant="success">Add New</Button>
                        </div>
                    </Col>
                </Row>
            </div>
            {versions ?
                <Versionlisttable data={versions} columns={columns}></Versionlisttable>
                :<p>Version is not available!</p>
            }
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Version/Add or Edit</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <form onSubmit={formik.handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <label className="form-label" htmlFor="version">Version:</label>
                        <input
                            className="form-control"
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Enter version"
                            onChange={formik.handleChange}
                            value={formik.values.name}
                        />
                        {formik.errors.name ? <div className="form_error">{formik.errors.name}</div> : null}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                    <label className="form-label" htmlFor="code">Code:</label>
                    <input
                        className="form-control"
                        id="code"
                        name="code"
                        type="text"
                        placeholder="Enter code"
                        onChange={formik.handleChange}
                        value={formik.values.code}
                    />
                    {formik.errors.code ? <div className="form_error">{formik.errors.code}</div> : null}
                    </Form.Group>
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