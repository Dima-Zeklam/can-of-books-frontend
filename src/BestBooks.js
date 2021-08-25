import React from 'react';
import Card from 'react-bootstrap/Card';
import { withAuth0 } from '@auth0/auth0-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import FormModel from './FormModel';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import './BestBooks.css';
// import DeleteForm from './UbdateForm';
const axios = require('axios');
require('dotenv').config();



class MyFavoriteBooks extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      books: [],
      show: false,
      displayModel: false
    }
  }
  componentDidMount = async () => {
    const { user } = this.props.auth0;
    // console.log(this.props.auth0);

    let emailaddress = user.email;
    // console.log('email', emailaddress);
    let bookData = await axios.get(`${process.env.REACT_APP_SERVER}/books?email=${emailaddress}`);
    bookData?await this.setState({
      books: bookData.data,
      show: true
    }): this.setState({
      books: [],
      show: false
    })

    console.log(this.state.books);

  }

  handleClose = () => {
    this.setState({
      displayModel: !this.state.displayModel
    })
  }
  // showDeleteForm =()=>{
  //   this.setState({
  //     showDeleteForm: !this.state.showDeleteForm
  //   })
  // }

  AddBookHandler = async (e) => {

    e.preventDefault();

    // const { user } = this.props.auth0;
    // to prevent model from view (set to false)
    this.handleClose();

    let bookInfo = {
      title: e.target.title.value,
      description: e.target.description.value,
      status: e.target.status.value,
      email: e.target.email.value
    }

    let bookInfoData = await axios.post(`${process.env.REACT_APP_SERVER}/addBook`, bookInfo);

    this.setState({
      books: bookInfoData.data
    })
    // console.log(this.state.books);
  }

  DeleteBookHandler = async (bookID) => {

    let DataInfo = await axios.delete(`${process.env.REACT_APP_SERVER}/deleteBook/${bookID}?email=${this.props.auth0.user.email}`)

    this.setState({
      books: DataInfo.data
    });
 

  }


  render() {

    return (
      <>


        <Jumbotron>
          <h1>My Favorite Books</h1>
          <p>
            This is a collection of my favorite books
          </p>
          <Button onClick={() => this.handleClose()}>Add Book</Button>

        </Jumbotron>
        <div>
          {this.state.show && this.state.books.map((element, key) => {
            return (
              <Card key={key} style={{ width: '18rem' }}>
                <Card.Body>
                  <Card.Title>{element.title}</Card.Title>
                  <Card.Text>
                    {element.description}
                  </Card.Text>
                  <Card.Text>
                    {element.status}
                  </Card.Text>
                  <Card.Text>
                    {element.email}
                  </Card.Text>
                 
                </Card.Body>
                <Button onClick={() => this.DeleteBookHandler(element._id)}>Delete</Button>
              </Card>
            )

          })

          }
        </div>


        <FormModel
          show={this.state.displayModel}
          handleClose={this.handleClose}
          AddBookHandler={this.AddBookHandler}
        />
      </>
    )
  }
}

export default withAuth0(MyFavoriteBooks);
