import React, { Component } from "react";
import Modal from "./components/Modal";
import axios from "axios";
import { Card, Button, CardHeader, CardBody } from 'reactstrap';
import { ListGroup, ListGroupItem, Badge, FormText } from 'reactstrap';
import moment from 'react-moment';

    class App extends Component {
      constructor(props) {
        super(props);
        this.state = {
          viewDone: false,

          activeItem: {
            title: "",
            description: "",
            subject: "",
            date: "",
            done: false
          },
          plannedList: []
        };
      }
      componentDidMount() {
        this.refreshList();
      }
      refreshList = () => {
        axios
          .get("http://localhost:8000/api/plans/")
          .then(res => this.setState({ plannedList: res.data }))
          .catch(err => console.log(err));
      };
      
      displayDone = status => {
        if (status) {
          return this.setState({ viewDone: true });
        }
        return this.setState({ viewDone: false });
      };

      renderTabList = () => {
        return (
          <CardHeader>
            <Button outline color="secondary"
              size="sm"
              onClick={() => this.displayDone(true)}
              className={this.state.viewDone ? "active" : ""}
              >
                done
            </Button>
            <Button outline color="secondary"
              size="sm"
              onClick={() => this.displayDone(false)}
              className={this.state.viewDone ? "" : "active"}
              style={{marginLeft:'10px'}}
              >
                not done
            </Button>
          </CardHeader>
        );
      };

      checkDate = item => {
        const itemDate = item.date;
        const today = new Date();
        const d = today.getDate();
        let m = today.getMonth() +1;
        if (m < 10){
          m = `0${m}`;
        }
        const y = today.getFullYear();
        const check = `${y}-${m}-${d}`;
        console.log(check);
        console.log(itemDate);
        if (itemDate === check){
          return true;
        } else {
          return false;
        }
      }
      renderItems = () => {
        const { viewDone: viewDone} = this.state;
        const newItems = this.state.plannedList.filter(
          item => item.done === viewDone
        );
        return newItems.map(item => (
          <ListGroupItem key={item.id}>
            <div className="list-group-item d-flex justify-content-between align-items-center">
            <span
            className={`${this.state.viewDone ? "done" : ""}`}
            style={{textAlign: 'left'}}
            >
              <Badge pill color="info">{item.subject}</Badge>
              {item.title}
              <FormText color="muted">
                {item.description}
              </FormText>
              {this.checkDate(item) ? 
              (<Badge color="danger">today</Badge>) 
              : <Badge color="light">{item.date}</Badge>
              }
            </span>
            <span>
            <Button outline onClick={() => this.editItem(item)} color="info">Edit</Button>{' '}
            <Button outline onClick={() => this.handleDelete(item)} color="secondary">Delete</Button>
            </span>
            </div>
          </ListGroupItem>
          
        ));
      };
      toggle = () => {
        this.setState({ modal: !this.state.modal });
      };
      handleSubmit = item => {
        this.toggle();
        if (item.id) {
          axios
            .put(`http://localhost:8000/api/plans/${item.id}/`, item)
            .then(res => this.refreshList());
          return;
        }
        axios
          .post("http://localhost:8000/api/plans/", item)
          .then(res => this.refreshList());
      };
      handleDelete = item => {
        axios
          .delete(`http://localhost:8000/api/plans/${item.id}`)
          .then(res => this.refreshList());
      };
      createItem = () => {
        const item = { title: "", description: "", subject: "", date: "", done: false };
        this.setState({ activeItem: item, modal: !this.state.modal });
      };
      editItem = item => {
        this.setState({ activeItem: item, modal: !this.state.modal });
      };
      render() {
        return (
          <main className="font2">
            <br></br>
            <Card style={{width:'60%', margin: '0 auto'}}>
              <CardHeader className="font" style={{fontSize:'50px', textAlign: 'center', paddingTop: '10px'}}>Planner<br></br>
                <Button outline color="info" className="font2" onClick={this.createItem} style={{width:'10%'}}>Add new</Button>
              </CardHeader>
              <CardBody>
              {this.renderTabList()}
              <ListGroup>
                {this.renderItems()}
              </ListGroup>
              </CardBody>
            </Card>
            <br></br>
            {this.state.modal ? (
              <Modal
                activeItem={this.state.activeItem}
                toggle={this.toggle}
                onSave={this.handleSubmit}
              />
            ) : null}
          </main>
        );
      }
    }
    export default App;