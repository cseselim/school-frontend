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
import {getAllSubject, deleteSubject, createSubject, subjectEditState, editStateEmpty, updateSubject,subjectFileUpload} from '../../state/subjects/subjectSlice';

function ClassList(){


    useEffect(() => {
        console.log('abc')
        dispatch(getAllSubject());
    },[])

    const subjectList = useSelector((state) => state.subject.value);
    const dispatch = useDispatch();
    const subjects = subjectList[0];

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
                dispatch(deleteSubject(id));
                toast.success("Subject deleted successfully");
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
        },
        {
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

    const subjectEditData = useSelector((state) => state.subject.editSubject);

    /* Conditionally rendering initial values based on CREATE or EDIT */
    let initialValues = {
        id : subjectEditData.id || '',
        version_id: subjectEditData.version_id || '',
        class_id: subjectEditData.class_id || '',
        name : subjectEditData.name || '',
        code : subjectEditData.code || '',
        priority: subjectEditData.priority || '',
        image_url: '',
    };

    const validationSchema = Yup.object({
        version_id : Yup.string().required('version is required'),
        class_id : Yup.string().required('Class is required'),
        name : Yup.string().required('Name is required'),
        code : Yup.string().required('Code is required'),
        priority : Yup.string().required('Priority is required'), 
        image_url : Yup.string().min(1,"select at least 1 file")
    })

    const onSubmit = async (values,onSubmitProps) => {
        if(!values.id){
            console.log(JSON.stringify(values, " ", 2));
            dispatch(createSubject(values));
            onSubmitProps.resetForm();
            setShow(false);
            toast.success("Subject create successfully");
        }else{
            dispatch(updateSubject(values));
            setShow(false);
            toast.success("Subject update successfully");
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
        dispatch(subjectEditState(id))
      .then(response => {
        setShow(true)
      })
      .catch(e => {
        console.log(e);
      });
    };

    const fileUpload = (files) =>{
        return dispatch(subjectFileUpload(files));
    }
    var subjectImage = useSelector((state) => state.subject.imgUrl);

    return (
        <>
            <div className="content_header">
                <ToastContainer/>
                <Row className="Row">
                    <Col xs={6} md={6} className="my-auto">
                        <div className="page_title">
                            <h1><FontAwesomeIcon icon={faList}/>Subject List</h1>
                        </div>
                    </Col>
                    <Col xs={6} md={6} className="text-right">
                        <div className="page_action_btn">
                            <Button onClick={handleShow} variant="success">Add New</Button>
                        </div>
                    </Col>
                </Row>
            </div>
            {subjects ?
                <Versionlisttable data={subjects} columns={columns}></Versionlisttable>
                :<p>subjects is not available!</p>
            }

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Subject/Add or Edit</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik initialValues={initialValues} enableReinitialize={true} validationSchema={validationSchema} onSubmit={onSubmit} validateOnMount>
                    {formik => (
                        <Form onSubmit={formik.handleSubmit}>
                            {
                                subjectEditData.id
                                ? 
                                <input className="form-control" type="hidden" {...formik.getFieldProps('id')}/>
                                : <></>
                            }

                        <Form.Group className="mb-3" controlId="formBasicVersion">
                            <select
                                className="form-control"
                                name="version_id"
                                {...formik.getFieldProps('version_id')}
                            >
                                <option value="" label="Select Version" />
                                <option value="1" label="Bangla" />
                                <option value="2" label="English" />
                            </select>
                            {formik.touched.version_id && formik.errors.version_id ? (
                            <div className="error" style={{color: "red"}}>{formik.errors.version_id}</div>
                        ) : null}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicVersion">
                            <select
                                className="form-control"
                                name="class_id"
                                {...formik.getFieldProps('class_id')}
                            >
                                <option value="" label="Select Class" />
                                <option value="1" label="Six" />
                                <option value="2" label="Seven" />
                                <option value="3" label="Eight" />
                                <option value="4" label="Nine" />
                            </select>
                            {formik.touched.class_id && formik.errors.class_id ? (
                            <div className="error" style={{color: "red"}}>{formik.errors.class_id}</div>
                        ) : null}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicVersion">
                            <label htmlFor="name">Subject Name:</label>
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

                        <Form.Group controlId="upload">
                            <label htmlFor="priority">Subject Thumbnail:</label>
                            <input 
                            id="image_urls"
                            type="file"
                            onChange={(event) => {
                                const files = event.target.files[0];
                                fileUpload(files);
                              }}
                            multiple />
                            <input 
                            id="image_url"
                            name="image_url"
                            type="text"
                            value={formik.values.image_url = subjectImage}
                            />
                            <img style={{width: "116px",display: "block",marginTop: "12px"}} src={subjectImage} />
                            {formik.errors.image_url ? (
                            <div className="error" style={{color: "red"}}>{formik.errors.image_url}</div>
                        ) : null}
                        </Form.Group>
                        
                
                        <Modal.Footer>
                            <Button onClick={handleClose} variant="secondary">Close</Button>
                            <Button type="submit" variant="primary">Save</Button>
                        </Modal.Footer>
                        </Form>
                    )}
                    </Formik>
                </Modal.Body>
            </Modal>
        </>   
    )
}

    export default ClassList;