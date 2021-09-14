import React from 'react';
import Card from 'react-bootstrap/Card';
import { withAuth0 } from '@auth0/auth0-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import FormModel from './FormModel';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import './BestBooks.css';
import UbdateForm from './UbdateForm';
require('./ITbooks.css');
const axios = require('axios');
require('dotenv').config();



class MyFavoriteBooks extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      books: [],
      show: false,
      displayModel: false,
      displayUbdateModel: false,
      bookToUpdate:{},
     ITbooks:[],
     showITbooks:false
    }
  }
  componentDidMount = async () => {
    const { user } = this.props.auth0;
    // console.log(this.props.auth0);

    let emailaddress = user.email;
    // console.log('email', emailaddress);
    let bookData = await axios.get(`${process.env.REACT_APP_SERVER}/books?email=${emailaddress}`);
    bookData ? await this.setState({
      books: bookData.data,
      show: true
    }) : this.setState({
      books: [],
      show: false
    })
    console.log(this.state.books);
    
    let Data = await axios.get(`${process.env.REACT_APP_SERVER}/getITbooks?email=${emailaddress}`);
    await this.setState({ITbooks:Data.data,showITbooks:true});
    
  }

  handleClose = () => {
    this.setState({
      displayModel: !this.state.displayModel
    })

  }


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
      books: bookInfoData.data,
      
    })
    // console.log(this.state.books);
  }

  DeleteBookHandler = async (bookID) => {

    let DataInfo = await axios.delete(`${process.env.REACT_APP_SERVER}/deleteBook/${bookID}?email=${this.props.auth0.user.email}`)

    this.setState({
      books: DataInfo.data
    });
  }
  /// delete it book // server.delete('/deleteITBook/:ID', deleteITBook);
  deleteITBook = async (ID) => {

    let DataInfo = await axios.delete(`${process.env.REACT_APP_SERVER}/deleteITBook/${ID}`)

    this.setState({
     ITbooks: DataInfo.data
    });
  }

  bookToUpdate = async (bookInf) => { 
    await this.setState({
      displayUbdateModel: true,
      bookToUpdate :bookInf,
    });
    
  }
  //  '/ubdateBook/:bookID'
  updatebookHandler = async (bookInf) => {

    let bookID = this.state.books._id;
    console.log(bookID);
    let bookData = await axios.put(`${process.env.REACT_APP_SERVER}/ubdateBook/${bookInf._id}`, bookInf);
    this.setState({
      books: bookData.data
    })
  }

  updateButtonHandler = () => {
    this.setState({
      displayUbdateModel: !this.state.displayUbdateModel
    })
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
              <Card key={key} style={{ width: '18rem', margin:'30px' }} className="ITBooksCard" >
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
                <Button onClick={() => this.bookToUpdate(element)}>Update</Button>
              </Card>
            )

          })

          }

        </div>
        {this.state.showITbooks && this.state.ITbooks.map((element, key) => {
            return (
              <Card key={key} style={{ width: '18rem',margin:'30px' }} className="ITBooksCard">
                <Card.Body>
                                <Card.Title>{element.title}</Card.Title>
                                <Card.Text>
                                    {element.subtitle}
                                </Card.Text>
                                <Card.Text>
                                    {element.price}
                                </Card.Text>
                                <Card.Text>
                                    <img src={element.image} alt={element.title} />
                                </Card.Text>
                                <Card.Text>
                                    <a href={element.url}>Book URL</a>
                                </Card.Text>

                            </Card.Body>
                <Button onClick={() => this.deleteITBook(element._id)}>Delete</Button>
               
              </Card>
            )

          })

          }
  

        <FormModel
          show={this.state.displayModel}
          handleClose={this.handleClose}
          AddBookHandler={this.AddBookHandler}
        />
        <UbdateForm
          displayUbdateModel={this.state.displayUbdateModel}
          updateButtonHandler={this.updateButtonHandler}
          updatebookHandler={this.updatebookHandler} 
          bookInf = {this.state.bookToUpdate}
          />
      </>
    )
  }
}

export default withAuth0(MyFavoriteBooks);
