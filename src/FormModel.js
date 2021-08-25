import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal,Button,Form} from 'react-bootstrap';

class FormModel extends React.Component {


AddBookHandler = (e)=>{
this.props.AddBookHandler(e);
this.props.handleClose();
}
    render() {
        return (
            <>
               
                <Modal show={this.props.show} onHide={this.props.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Book Modal </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.AddBookHandler}>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Book Title</Form.Label>
                                <Form.Control type="text" placeholder="title" name='title' />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Book Description</Form.Label>
                                <Form.Control type="text" placeholder="Description" name='description' />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Status</Form.Label>
                                <Form.Control type="text" placeholder="Status" name='status' />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email </Form.Label>
                                <Form.Control type="email" placeholder="Enter email" name='email' />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Add Book
                            </Button>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.handleClose}>
                            Close
                        </Button>

                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default FormModel;
