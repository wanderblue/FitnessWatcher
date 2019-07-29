import React, { Component } from "react";
//import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import Navbar from '../components/navbar'
import DeleteBtn from "../components/DeleteBtn";
//import wGraph from '../components/wGraph'
import YourLineGraph from "../components/YourDashboard/YourLineGraph";
import classes from "../views/YourDashboard/YourDashboard.module.css";

import { managerData, yearLabels } from "../mockData";

var moment = require('moment');
class Books extends Component {
   
  
  state = {
    books: [],
    title: "",
    days: "",
    weight: "",
    loggedIn: true,
    weightData: [],
    labels: [],
    user: "Jane Eyre"

  };

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks1 = () => {
    API.getBooks()
      .then(response => response.json())
      .then(res =>
        this.setState({ books: res, title: "" })
      )
      .catch(err => console.log(err));
  };

  loadBooks = () => {
    API.getUser(this.state.user)
      .then(response => response.json())
      .then(res =>
        this.setState({ books: res, title: "", weight: "", days: "" }),
      )
      .catch(err => console.log(err));

      }

  
   // let weightData = []
    //let labels = []
    
     //function to remove book by id
     handleDeleteButton = id => {
      API.deleteBook(id)
          .then(res => this.componentDidMount())
          .catch(err => console.log(err))
  }
    
    deleteBook = id => {
      API.deleteBook(id)
        .then(response => response.json())
        .then(res => this.loadBooks())
        .catch(err => console.log(err));
    };
  


    loadData = () => {
      
      
      let weightArray =[]
      let labelArray =[]
        //this.state.weightData.length = 0;
        //this.state.labels.length = 0;
        API.getUser(this.state.user)
        .then(response => response.json())
        .then(res =>
          this.setState({ books: res, title: "", weight: "", days: "" }),
        )
        .catch(err => console.log(err));
  

    //console.log("KKKKK",this.state.books),
    this.state.books.map(book => (
      weightArray.push(book.weight),
      labelArray.push(book.days)
       
  //      this.state.weightData.push(book.weight),
    //    this.state.labels.push(book.days),
    //    console.log("KKKKK",weightArray)
      ))
      console.log("KKKKK",weightArray)
     this.setState({ weightData:  weightArray, labels:  labelArray})

      console.log("&&&&&&&&&&&&",this.state.weightData)
      console.log("&&&&&&&&&&&&",this.state.weightData.length)
    }
  
   
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if ( this.state.weight) {
      API.saveBook({
        
        title: this.state.user,
        weight: this.state.weight,
        days: this.state.days
      })
        .then(response => response.json())
        .then(res => this.loadBooks())
        .catch(err => console.log(err));
    }
    alert('Record added. Click on view button on left to view your record!');

    API.getUser(this.state.user)
    .then(response => response.json())
    .then(res =>
      this.setState({ books: res, title: "", weight: "", days: "" }),
    )
    .catch(err => console.log(err));
    
  };
  


  render() {
     // const { data, labels } = this.state;
    return (
            <>
      <Navbar updateUser={this.updateUser} loggedIn={this.state.loggedIn} /> 

      <Container fluid>
        <row><h6>welcome!</h6></row>
        <Row>
          <Col size="md-6">
            <Jumbotron>
           
               <h4>Update your records</h4>

            </Jumbotron>
            <form>
            <Input
                value={this.state.user}
                onChange={this.handleInputChange}
                name="user"
                placeholder="username (required)"
              />
              <Input
                value={this.state.weight}
                onChange={this.handleInputChange}
                name="weight"
                placeholder="weight (required)"
              />
              <Input
                value={this.state.days}
                onChange={this.handleInputChange}
                name="days"
                placeholder="day number (required)"
              />
              <FormBtn
                disabled={!(this.state.weight)}
                onClick={this.handleFormSubmit}
              >
                Submit
              </FormBtn>
             
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
            
              <h4>View your records</h4>

              <FormBtn
              
              onClick={this.loadBooks}
                          
              >
                view
              </FormBtn>
              
            </Jumbotron>

            {this.state.books.length ? (
                <>
            <FormBtn
              
              onClick={this.loadData}
            >
              view chart
            </FormBtn>
              <List>
                {this.state.books.map(book => (
                  <ListItem key={book._id}>
                   
                      <strong>
                      {book.title}:  {book.weight} lb on (Day {book.days}) entered at {moment(book.date).format( 'LLL')}
                   
                      </strong>
                      
                      <DeleteBtn onClick={() => this.handleDeleteButton(book._id)} />
                  </ListItem>
                 
                ))}
              </List>
               
              </>
            ) : (
         <h4></h4>
            )}

          {this.state.weightData.length ? (
              <>
              <YourLineGraph
                        data={this.state.weightData}
                        labels={this.state.labels} 
                    />
                  
                    </>
                    ) : (
                        <h4></h4>
          )}   
               
               


          </Col>
        </Row>
      </Container>
      </>
    );
  }
}

export default Books;
