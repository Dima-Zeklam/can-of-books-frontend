
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from 'react-bootstrap';

class UbdateForm extends React.Component {
    updatebookHandler = (e) => {
        e.preventDefault();
        let bookInf = {
            _id: this.props.bookInf._id,
            title: e.target.title.value,
            description: e.target.description.value,
            status: e.target.status.value,
            email: e.target.email.value
        }

        this.props.updatebookHandler(bookInf);
        this.props.updateButtonHandler();
    }
    render() {
        return (
            <>

                <Modal show={this.props.displayUbdateModel} onHide={this.props.updateButtonHandler}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Book Modal </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.updatebookHandler}>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Book Title</Form.Label>
                                <Form.Control type="text" placeholder="title" name='title' defaultValue={this.props.bookInf.title} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Book Description</Form.Label>
                                <Form.Control type="text" placeholder="Description" name='description' defaultValue={this.props.bookInf.description} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Status</Form.Label>
                                <Form.Control type="text" placeholder="Status" name='status'  defaultValue={this.props.bookInf.status}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email </Form.Label>
                                <Form.Control type="email" placeholder="Enter email" name='email'  defaultValue={this.props.bookInf.email}/>
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Update Book
                            </Button>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.updateButtonHandler}>
                            Close
                        </Button>

                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default UbdateForm;
