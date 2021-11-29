import React,{useState,useEffect} from "react";
import {Button,Row,Col,Modal,Form} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import { Formik,Field,useFormik,ErrorMessage, } from 'formik';
import * as Yup from 'yup';
import Versionlisttable from '../../widget/datatble';
import { useSelector, useDispatch } from 'react-redux';
import {getAllVersion, deleteVersion, createVersion, versionEditState, updateVersion, editStateEmpty} from '../../state/version/versionSlice';
//import versionService from '../../services/version/versionService';
//import stringifyObject from 'stringify-object';

function VersionList(){

    /*============version state initialize=============*/
    const versionList = useSelector((state) => state.version.value);
    const dispatch = useDispatch();
    const versions = versionList[0];
      
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
                <button type="button"className="btn btn-outline-primary btn-sm ts-buttom edit_button" size="sm" onClick={() => editVersionHandle(id)}>
                    Edit
                </button>
                <button type="button" className="btn btn-outline-danger btn-sm ml-2 ts-buttom delete_button" size="sm" onClick={() => removeVersion(id)}>
                    Delete
                </button>
            </div>
        );
    }

    const columns = [{
        dataField: 'sl.no',
        text: 'Sl No.',
        formatter: (cell, row, rowIndex, formatExtraData) => {
            return rowIndex + 1;
        },
        }, {
        dataField: 'name',
        text: 'Version Name'
        }, {
        dataField: 'code',
        text: 'Code'
        },{
        dataField: 'id',
        text: 'Action',
        formatter: ActionFormat,
        },
    ];

    const versionEditData = useSelector((state) => state.version.editVersion);

    /* Conditionally rendering initial values based on CREATE or EDIT */
    let initialValues = {
        id : versionEditData.id || '',
        name : versionEditData.name || '',
        code : versionEditData.code || '',
    };

    const validationSchema = Yup.object({
        name : Yup.string().required('Name is required'),
        code : Yup.string().required('Code is required'),
    })

    const onSubmit = async (values,onSubmitProps) => {
        if(!values.id){
            dispatch(createVersion(JSON.stringify(values, " ", 2)));
            onSubmitProps.resetForm();
            setShow(false);
            <ToastContainer />
        }else{
            dispatch(updateVersion(values));
            setShow(false);
        }
    } 



    /*============form modal show and hide=============*/
    const [show, setShow] = useState(false);
    // const handleClose = () => setShow(formik.setErrors({}));
    const handleClose = () => {
        dispatch(editStateEmpty());
        setShow(false);
    }
    const handleShow = () => setShow(true);

    const editVersionHandle = (id) => {
        dispatch(versionEditState(id))
      .then(response => {
        setShow(true)
      })
      .catch(e => {
        console.log(e);
      });
    };

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
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} validateOnMount>
                    {formik => (
                        <form onSubmit={formik.handleSubmit}>
                            {
                                versionEditData.id
                                ? 
                                <input className="form-control" type="hidden" {...formik.getFieldProps('id')}/>
                                : <></>
                            }
                        <Form.Group className="mb-3" controlId="formBasicVersion">
                            <label htmlFor="version">Version:</label>
                            <input
                                className="form-control"
                                id="name"
                                type="text"
                                placeholder="Version"
                                {...formik.getFieldProps('name')}
                            />
                            {formik.touched.name && formik.errors.name ? (
                            <div style={{color: "red"}}>{formik.errors.name}</div>
                        ) : null}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCode">
                            <label htmlFor="code">Code:</label>
                            <input
                                className="form-control"
                                id="code"
                                type="text"
                                placeholder="Code"
                                {...formik.getFieldProps('code')}
                            />
                            {formik.touched.code && formik.errors.code ? (
                            <div style={{color: "red"}}>{formik.errors.code}</div>
                        ) : null}
                        </Form.Group>
                
                        <Modal.Footer>
                            <Button onClick={handleClose} variant="secondary">Close</Button>
                            <Button type="submit" variant="primary">Save</Button>
                        </Modal.Footer>
                        </form>
                    )}
                    </Formik>
                </Modal.Body>
            </Modal>
        </div>
    );
    }

    export default VersionList;