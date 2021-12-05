import React,{useState,useEffect} from "react";
import {Button,Row,Col,Modal,Form} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import swal from 'sweetalert'
import { Formik,Field,useFormik,ErrorMessage, } from 'formik';
import * as Yup from 'yup';
import Versionlisttable from '../../widget/datatble';
import { useSelector, useDispatch } from 'react-redux';
import {getAllClasses, deleteVersion, createClasses, classesEditState, editStateEmpty, updateClasses} from '../../state/classes/classesSlice';

function ClassList(){


    useEffect(() => {
        console.log('abc')
        dispatch(getAllClasses());
    },[])

    const classesList = useSelector((state) => state.classes.value);
    const dispatch = useDispatch();
    const classes = classesList[0];

    /*============version delete funtion=============*/
    const removeClasses = (id) => {
        swal({
            title: "Are you sure?",
            text: "You want to delete?",
            icon: false,
            confirmButtonText: "Yes, delete it!",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                dispatch(deleteVersion(id));
                toast.success("Classes deleted successfully");
            }
          });
    };

     /*============datatable edit delete button and datatable data send=============*/
     const ActionFormat = (id, row) => {
        return (
            <div>
                <button type="button"className="btn btn-outline-primary btn-sm ts-buttom edit_button" size="sm" onClick={() => editVersionHandle(id)}>
                    Edit
                </button>
                <button type="button" className="btn btn-outline-danger btn-sm ml-2 ts-buttom delete_button" size="sm" onClick={() => removeClasses(id)}>
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
        text: 'Name'
        },{
        dataField: 'display_name',
        text: 'Display Name'
        }, {
        dataField: 'code',
        text: 'Code'
        },{
        dataField: 'priority',
        text: 'Priority'
        },{
        dataField: 'id',
        text: 'Action',
        formatter: ActionFormat,
        },
    ];

    const versionEditData = useSelector((state) => state.classes.editVersion);

    /* Conditionally rendering initial values based on CREATE or EDIT */
    let initialValues = {
        id : versionEditData.id || '',
        name : versionEditData.name || '',
        code : versionEditData.code || '',
        display_name: versionEditData.display_name || '',
        priority: versionEditData.priority || '',
    };

    const validationSchema = Yup.object({
        name : Yup.string().required('Name is required'),
        display_name : Yup.string().required('Display name is required'),
        display_name : Yup.string().required('Display name is required'),
        code : Yup.string().required('Code is required'),
        priority : Yup.string().required('Priority is required'), 
    })

    const onSubmit = async (values,onSubmitProps) => {
        if(!values.id){
            dispatch(createClasses(JSON.stringify(values, " ", 2)));
            onSubmitProps.resetForm();
            setShow(false);
            toast.success("Classes create successfully");
        }else{
            dispatch(updateClasses(values));
            setShow(false);
            toast.success("Classes update successfully");
        }
    }


    /*============form modal show and hide=============*/
    const [show, setShow] = useState(false);
    const handleClose = () => {
        dispatch(editStateEmpty());
        setShow(false);
    }
    const handleShow = () => setShow(true);

    const editVersionHandle = (id) => {
        dispatch(classesEditState(id))
      .then(response => {
        setShow(true)
      })
      .catch(e => {
        console.log(e);
      });
    };


    return (
        <>
            <div className="content_header">
                <ToastContainer/>
                <Row className="Row">
                    <Col xs={6} md={6} className="my-auto">
                        <div className="page_title">
                            <h1><FontAwesomeIcon icon={faList}/>Class List</h1>
                        </div>
                    </Col>
                    <Col xs={6} md={6} className="text-right">
                        <div className="page_action_btn">
                            <Button onClick={handleShow} variant="success">Add New</Button>
                        </div>
                    </Col>
                </Row>
            </div>
            {classes ?
                <Versionlisttable data={classes} columns={columns}></Versionlisttable>
                :<p>Classes is not available!</p>
            }

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Class/Add or Edit</Modal.Title>
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
                            <label htmlFor="name">Class Name:</label>
                            <input
                                className="form-control"
                                id="name"
                                type="text"
                                placeholder="Class Name"
                                {...formik.getFieldProps('name')}
                            />
                            {formik.touched.name && formik.errors.name ? (
                            <div className="error" style={{color: "red"}}>{formik.errors.name}</div>
                        ) : null}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicVersion">
                            <label htmlFor="DisplayName">Display Name:</label>
                            <input
                                className="form-control"
                                id="name"
                                type="text"
                                placeholder="Display Name"
                                {...formik.getFieldProps('display_name')}
                            />
                            {formik.touched.name && formik.errors.display_name ? (
                            <div className="error" style={{color: "red"}}>{formik.errors.display_name}</div>
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
                            <div className="error" style={{color: "red"}}>{formik.errors.code}</div>
                        ) : null}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicCode">
                            <label htmlFor="priority">Priority:</label>
                            <input
                                className="form-control"
                                id="code"
                                type="text"
                                placeholder="Priority"
                                {...formik.getFieldProps('priority')}
                            />
                            {formik.touched.code && formik.errors.priority ? (
                            <div className="error" style={{color: "red"}}>{formik.errors.priority}</div>
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
        </>   
    )
}

    export default ClassList;