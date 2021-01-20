import React, { Component } from "react";
import Modal from "./components/Modal";
import axios from "axios";
import { Card, Button, CardHeader, CardBody, ButtonGroup } from 'reactstrap';
import { ListGroup, ListGroupItem, Badge, FormText } from 'reactstrap';

    class App extends Component {
      constructor(props) {
        super(props);
        this.state = {
          viewDone: false,
          sorted: false,
          order: "",

          activeItem: {
            title: "",
            description: "",
            subject: "",
            date: "",
            done: false
          },
          plannedList: [],
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
          return this.setState({ viewDone: true});
        }
        return this.setState({ viewDone: false});
      };

      sortUp = property => {
        return function(a,b){
          if(a[property] > b[property])
          return 1;
          else if(a[property] < b[property])
          return -1;

          return 0;
        }
      }

      sortDown = property => {
        return function(a,b){
          if(a[property] < b[property])
          return 1;
          else if(a[property] > b[property])
          return -1;

          return 0;
        }
      }
      

      sortList = (property, order) => {  
          if(order){
            this.state.plannedList.sort(this.sortUp(property))
            this.setState({
              sorted: true,
              order: order
            })
          } else {
            this.state.plannedList.sort(this.sortDown(property))
            this.setState({
              sorted: true,
              order: order
            })
          }
      }

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
            <ButtonGroup>
              <Button outline color="secondary" size="sm" style={{marginLeft:'10px'}} onClick={() => this.sortList("date", true)}>sort by date ↑</Button>
              <Button outline color="secondary" size="sm" onClick={() => this.sortList("date", false)}>sort by date ↓</Button>
            </ButtonGroup>
          </CardHeader>
        );
      };


      checkTodayDate = item => {
        const itemDate = item.date;
        const today = new Date();
        const d = today.getDate();
        let m = today.getMonth() +1;
        if (m < 10){
          m = `0${m}`;
        }
        const y = today.getFullYear();
        const check = `${y}-${m}-${d}`;
        if (itemDate === check){
          return true;
        } else {
          return false;
        }
      }

      checkPast = item => {
        const itemDate = item.date;
        const today = new Date();
        const d = today.getDate();
        let m = today.getMonth() +1;
        if (m < 10){
          m = `0${m}`;
        }
        let n= "";
        const y = today.getFullYear();
        const dateToCheck = itemDate.split("-");
        if(d<10){
          n = d.toString();
          n = `0${n}`;
        } else {
          n = d.toString();
        }
        if (y.toString() > dateToCheck[0] || m > dateToCheck[1] || n > dateToCheck[2]){
          return true;
        } else {
          return false;
        }
      }

      checkTom = item => {
        const itemDate = item.date;
        const today = new Date();
        const d = today.getDate();
        let m = today.getMonth() +1;
        if (m < 10){
          m = `0${m}`;
        }
        let n = "";
        const y = today.getFullYear();
        const dateToCheck = itemDate.split("-");
        if(d<10){
          n = (d+1).toString();
          n = `0${n}`;
        } else {
          n = (d+1).toString();
        }
        if (y.toString() === dateToCheck[0] && m === dateToCheck[1] && n === dateToCheck[2]){
          return true;
        } else {
          return false;
        }
      }
      renderItems = () => {
        const { viewDone: done} = this.state;
        const newItems = this.state.plannedList.filter(
          item => item.done === done,
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
              {this.checkTodayDate(item) ? 
              (<Badge color="danger">today</Badge>) 
              : this.checkPast(item) ? <Badge color="dark">too late</Badge>
              : this.checkTom(item) ? <Badge color="warning">tomorrow</Badge>
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
              <p className="font2" style={{fontSize:'30px'}}>{new Date().toLocaleDateString()}</p>
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