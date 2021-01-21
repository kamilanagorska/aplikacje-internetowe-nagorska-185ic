import React, { Component } from "react";
    import {
      Button,
      Modal,
      ModalHeader,
      ModalBody,
      ModalFooter,
      Form,
      FormGroup,
      Input,
      Label
    } from "reactstrap";

    export default class CustomModal extends Component {
      //konstruktor
      constructor(props) {
        //to trzeba
        super(props);
        //stan
        this.state = {
          //aktualnie wybrany plan
          activeItem: this.props.activeItem
        };
      }

      //wykonywana, gdy zmieni się jakaś wartośc w Form
      handleChange = e => {
        //pobierana jest nazwa input'a i wartość
        let { name, value } = e.target;
        //jeśli inputem był checkbox
        if (e.target.type === "checkbox") {
          //to jako wartosc podstawiamy stan checkboxa, false lub true w zależności
          //czy zostal zaznaczony lub nie
          value = e.target.checked;
        }
        //pod activeItem podstawiamy stan ze zmienioną jedną wartością, tą zmienioną
        //za pomocą inputa 
        ///... (trzy kropki) nazywane jest Spread Attributes, dzięki temu nie musimy
        //wypisywac wszystkich wlasnosci activeItem czyli osobno np. title, date, description
        //zwlaszcza, że też sami nie wiemy która wartość zostanie tym razem zmienona przez użytkownika
        //dlatego jest to bardzo wygodne wyjście w tej sytuacji
        //wszystkie dotychczasowe wartosci sie nie zmieniają, zmienia się tylko ta opisana za pomocą
        //zmiennej name
        const activeItem = { ...this.state.activeItem, [name]: value };
        //zmieniamy stan
        this.setState({ activeItem });
      };

      render() {
        const { toggle, onSave } = this.props;
        return (
          <Modal isOpen={true} toggle={toggle} className="font2">
            <ModalHeader toggle={toggle} className="font"> Thing to do </ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup>
                  {/* zmiana tytulu*/}
                  <Label for="title">Title</Label>
                  <Input
                    type="text"
                    name="title"
                    value={this.state.activeItem.title}
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  {/* zmiana przedmiotu */}
                  <Label for="subject">Subject</Label>
                  <Input
                    type="text"
                    name="subject"
                    value={this.state.activeItem.subject}
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  {/* zmiana opisu */}
                  <Label for="description">Description</Label>
                  <Input
                    type="text"
                    name="description"
                    value={this.state.activeItem.description}
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  {/* zmiana daty */}
                  <Label for="date">Date</Label>
                  <Input
                    type="date"
                    name="date"
                    value={this.state.activeItem.date}
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup check>
                  <Label for="done">
                    {/* zmiana statusu done lub not done */}
                    <Input
                      type="checkbox"
                      name="done"
                      checked={this.state.activeItem.done}
                      onChange={this.handleChange}
                    />
                    Done
                  </Label>
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter>
              {/* zapisanie zmian */}
              <Button outline color="info" onClick={() => onSave(this.state.activeItem)}>
                Save
              </Button>
            </ModalFooter>
          </Modal>
        );
      }
    }