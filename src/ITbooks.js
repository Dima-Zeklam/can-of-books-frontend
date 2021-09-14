// Using IT books data from API 
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withAuth0 } from '@auth0/auth0-react';
require('./ITbooks.css');
const axios = require('axios');
require('dotenv').config();

class ITbooks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ITBooks: [],
            showITbooks: false
        }
    }

    //---- Get API books Data ------
    getApi = async (e) => {
        e.preventDefault();
        let bookName = e.target.ITbookname.value;

        let ITbookData = await axios.get(`${process.env.REACT_APP_SERVER}/search?Bookname=${bookName}`);
        // console.log('Itbooks', ITbookData);
        await this.setState({
            ITBooks: ITbookData.data,
            showITbooks: true
        })

    }

    //--- Add Selected Book to DB based on Email----
    addITBook = async (item) => {

          let ITbookData = {
            title:item.title,
            subtitle:item.subtitle,
            price:item.price,
            image:item.image,
            url:item.url,
            email:this.props.auth0.user.email
          }
       await axios.post(`${process.env.REACT_APP_SERVER}/addITBook`,ITbookData);
    }

    render() {
        return (
            <>
                <Form onSubmit={this.getApi}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label style={{fontWeight:'bold',fontSize:'25px'}}>Search on IT Books </Form.Label>
                        <Form.Control type="text" placeholder="JavaScript" name="ITbookname" style={{width:'300px'}}/>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        search  </Button>
                </Form>
                <br />
                {this.state.showITbooks && this.state.ITBooks.map((element, key) => {
                    return (
                        
                        <Card key={key} style={{ width: '18rem',margin:'30px' }} className="ITBooksCard" >
                        
                            <Card.Body>
                                <Card.Title>{element.title}</Card.Title>
                                <Card.Text>
                                    {element.subtitle}
                                </Card.Text>
                                <Card.Text>
                                    {element.price}
                                </Card.Text>
                                <Card.Text  >
                                    <img src={element.image} alt={element.title}  />
                                </Card.Text>
                                <Card.Text>
                                    <a href={element.url}>Book URL</a>
                                </Card.Text>

                            </Card.Body>
                             <Button onClick={() => this.addITBook(element)}>Add to Fav</Button> 

                        </Card>
                      
                    )

                })

                }
            </>
        )
    }
}

export default withAuth0(ITbooks);
