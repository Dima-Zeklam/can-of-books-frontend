import React from 'react';
import  Card  from 'react-bootstrap/Card';
import { withAuth0 } from '@auth0/auth0-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
const axios = require('axios');
require('dotenv').config();



class MyFavoriteBooks extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }
   componentDidMount = async ()=> {
    const { user, isAuthenticated } = this.props.auth0;
    console.log(this.props.auth0);
    let emailaddress = user.email;
    console.log('email',emailaddress);
    let bookData = await axios.get(`${process.env.REACT_APP_SERVER}/books?emailaddress=${emailaddress}`);
    await this.setState({
      books: bookData.data
    })
    
    console.log(this.state.books);
  }


  render() {
    
    return (
      <>
        <Jumbotron>
          <h1>My Favorite Books</h1>
          <p>
            This is a collection of my favorite books
          </p>

        </Jumbotron>
        <div>
        {this.state.books.map((element,key) => {
          return(
          <Card key ={key} style={{ width: '18rem' }}>
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
          </Card>);
        })
        }
        </div>
      </>
    )
  }
}

export default  withAuth0(MyFavoriteBooks);
