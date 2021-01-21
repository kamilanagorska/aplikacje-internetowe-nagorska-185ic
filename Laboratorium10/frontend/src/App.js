import React, { Component } from "react";
import Modal from "./components/Modal";
import axios from "axios";
import { Card, Button, CardHeader, CardBody, ButtonGroup } from 'reactstrap';
import { ListGroup, ListGroupItem, Badge, FormText } from 'reactstrap';

    class App extends Component {
      //konstruktor
      constructor(props) {
        //zawsze sie to pisze jak konstruktor
        super(props);
        //stan, to co będzie się zmieniać
        this.state = {
          //do wyświetlania wykonanych bądź niewykonanych zadań
          viewDone: false,
          //do sortowania
          sorted: false,
          //kolejność sortowania (w dół lub w górę)
          order: "",
          //aktualnie wybrany plan
          activeItem: {
            //tytul planu
            title: "",
            //opis
            description: "",
            //przedmiot
            subject: "",
            //deadline
            date: "",
            //czy wykonane, czy nie
            done: false
          },
          //tablica planów
          plannedList: [],
        };
      }

      //uruchamia sie sama po prawidowym wyrenderowaniu komponentu
      componentDidMount() {
        //pobiera listę planów
        this.refreshList();
      }

      //za pomocą axiosa pobiera plany z backendu
      refreshList(){
        axios
        //dzieki proxy w package.json nie trzeba calego adresu url
          .get("/api/plans/")
          //zmiana stanu, pod plannedList podstawiane są wszystkie plany
          //setState sprawia, że wywoływana jest metoda render ponownie, by
          //zaktualizować to, co wyświetlane
          .then(res => this.setState({ plannedList: res.data }))
          //jesli error to go wypisze w konsoli
          .catch(err => console.log(err));
      };
      
      //zmienia stan po wciśnięciu guzika done lub not done
      displayDone(status){
        if (status) {
          return this.setState({ viewDone: true});
        }
        return this.setState({ viewDone: false});
      };
      
      //prosta funkcja umożliwiająca sortowanie tablicy obiektów
      //ponieważ samo sort nie będzie działało na takiej tablicy
      //dlatego trzeba użyć funkcji porownującej
      //takiej jak ta sortUp jako argument dla sort()
      sortUp(property){
        //funkcja dla dwoch obiektow (planów)
        //porównywana jest ich jedna własność
        return function(a,b){
          if(a[property] > b[property])
          //b zostanie posortowane do nizszego indeksu niz a
          //czyli b bedzie pierwsze
          return 1;
          else if(a[property] < b[property])
          //znaczy ze a bedzie mialo nizszy indeks, czyli bedzie pierwsze
          return -1;
          //jestli a[property]=b[property]
          //a i b zostaną na swoich pozycjach, nic sie nie zmieni
          return 0;
        }
      }
      
      //do sortowania w dół
      sortDown(property){
        return function(a,b){
          if(a[property] < b[property])
          return 1;
          else if(a[property] > b[property])
          return -1;
          //jestli a[property]=b[property]
          return 0;
        }
      }
      

      //sortuje listę planów
      //property jest przekazywane do funkcji porównującej
      //order definiuje, czy sortujemy w dół czy w górę
      sortList(property, order){  
        //jesli order to true to sortujemy normalnie czyli w górę
          if(order){
            //wywołujemy metodę sort() jednak nie jest ona wystarczająca dla
            //sortowania JSON'a, dlatego jako argument metody sort() podajemy
            //naszą funkcję porównującą
            this.state.plannedList.sort(this.sortUp(property))
            //zmieniamy stan, by react ponownie wywołał funkcje render i zmienilo
            //sie to co wyswietlamy, czyli kolejnosc 
            this.setState({
              sorted: true,
              order: order
            })
            //jeśli order to false sortujemy w dół
          } else {
            this.state.plannedList.sort(this.sortDown(property))
            this.setState({
              sorted: true,
              order: order
            })
          }
      }

      //metoda wyświetlająca guziki
      renderTabList() {
        return (
          <CardHeader>
            {/* guzik, ktory po wciśnięciu wyświetla nam tylko zrobione zadania
            na zdarzenie kliknięcia wywoływane jest displayDone i przekazywane jest do niego true
            stan zmieni się, viewDone zmieni wartość na true
            className jest "active", gdy viewDone jest rowne true, wtedy guzik jest ustawiony jako aktywny
            jest ciemny
            */}
            <Button outline color="secondary"
              size="sm"
              onClick={() => this.displayDone(true)}
              className={this.state.viewDone ? "active" : ""}
              >
                done
            </Button>
            {/* guzik, ktory po wciśnięciu wyświetla nie zrobione jeszcze zadania
            tu też na kliknięcie wywoływane jest displayDone, ale przekazywane jest false a nie true
            czyli viewDone zmieni się na false
            tu też className zmienia się w zależności od stanu viewDone, jesli jest false to guzik jest aktywny*/}
            <Button outline color="secondary"
              size="sm"
              onClick={() => this.displayDone(false)}
              className={this.state.viewDone ? "" : "active"}
              style={{marginLeft:'10px'}}
              >
                not done
            </Button>
            {/* grupa guzików umożliwiających sortowanie*/}
            <ButtonGroup>
              {/* guzik, po ktorym kliknięciu wywoływana jest funkcja sortList, przekazujemy do niej dwa argumenty "date" czyli, względem jakiej własności obiektu
              chcemy sortować i true czyli sortowanie będzie w górę
              po kliknięciu odrazu wyświetlane są zadania w odpowiedniej kolejności*/}
              <Button outline color="secondary" size="sm" style={{marginLeft:'10px'}} onClick={() => this.sortList("date", true)}>sort by date ↑</Button>
              {/*  guzik, po ktorym kliknięciu wywoływana jest ta sama funkcja co wyżej, ale drugi argument jest inny, jest to false, czyli sortowanie bedzie
              w dół*/}
              <Button outline color="secondary" size="sm" onClick={() => this.sortList("date", false)}>sort by date ↓</Button>
            </ButtonGroup>
          </CardHeader>
        );
      };

      //sprawdza, czy przekazany do funkcji plan
      //ma dzisiejszą datę
      checkTodayDate(item){
        //pobranie daty z planu
        //jest ona stringiem w postaci YYYY-MM-DD
        const itemDate = item.date;
        //utworzenie zmiennej z dzisiejszą datą
        //data ma taki format: Wed Jan 20 2021 21:14:17 GMT+0100
        //dlatego trzeba troszkę ją zmienić, pobrać z niej co tylko nam potrzebne
        //by ułatwić porównywanie jej z datą planu
        const today = new Date();
        //z utworzonej daty pobieramy dzień
        //getDate() zwraca ona liczby całkowite z przedziału od 1 do 31
        const d = today.getDate();
        //z daty pobieramy miesiąc
        //getMonth() zwraca też liczby całkowite
        //ale z przedziału od 0 do 11, czyli styczeń jest równy 0
        //dlatego dodaje do zwroconej liczby 1
        let m = today.getMonth() +1;
        //dodatkowo w dacie planu miesiąc, jeśli jest mniejszy od 10
        //ma przed sobą 0, dlatego sprawdzam, czy m jest < od 10
        //jesli tak to dodaje do niego 0 na początku
        if (m < 10){
          m = `0${m}`;
        }
        //zwraca rok jako pełna liczba
        const y = today.getFullYear();
        //po pobraniu wszystkich potrzebnych rzeczy z daty
        //tworzę stringa w postaci ROK-MIESIAC-DZIEN
        //jednak trzeba pamiętać, że jesli ddzien jest < 10
        //to bedzie przed nim 0 w dacie planu
        //dlatego dodaje to 0, jesli d < 10
        let check = "";
        if(d < 10){
          check = `${y}-${m}-0${d}`;
        } else {
          check = `${y}-${m}-${d}`;
        }
        //sprawdzam czy data planu jest taka sama jak ta dzisiejsza
        if (itemDate === check){
          //jak tak to zwracam true
          return true;
        } else {
          //jak nie to zwracam false
          return false;
        }
      }

      //sprawdza, czy data przekazanego obiektu jest 
      //wczesniejsza niz dzisiejsza
      //czyli czy deadline zdarzenia juz minął
      checkPast(item){
        //OD TĄD
        const itemDate = item.date;
        const today = new Date();
        const d = today.getDate();
        let m = today.getMonth() +1;
        if (m < 10){
          m = `0${m}`;
        }
        //DO TĄD - TAKI SAM KOD JAK W FUNKCJI POWYŻEJ
        let n= "";
        //pobieramy rok z dzisiejszej daty
        const y = today.getFullYear();
        //rozdzielamy stringa przedstawiającą datę planu
        //dzieli to go na 3 elementy, wszystkie są zapisane
        //w tablicy dateToCheck
        const dateToCheck = itemDate.split("-");
        //jesli dzien jest < 10 to musimy dac przed nim 0
        if(d<10){
          n = d.toString();
          n = `0${n}`;
        } else {
          n = d.toString();
        }
        //sprawdzamy czy rok dzisiejszej daty jest > od roku z daty planu lub
        //czy miesiąc obecny jest większy niz ten z daty planu lub czy
        //dzien dzisiajszy jest wiekszy niz ten z daty planu
        //jesli ktorys z tych warunkow bedzie spelniony
        //znaczy to, że deadline planu już minał
        if (y.toString() > dateToCheck[0] || m > dateToCheck[1] || n > dateToCheck[2]){
          //zwracam wtedy true
          return true;
        } else {
          //jak nie minał to false
          return false;
        }
      }

      //sprawdza, czy data przekazanego planu jest datą jutrzejszą
      checkTom(item){
        //dziala tak samo jak powyzsza funkcja
        const itemDate = item.date;
        const today = new Date();
        //utworzenie jutrzejszej daty
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        //reszta juz jak w powyzszej funkcji
        const d = tomorrow.getDate();
        let m = tomorrow.getMonth() +1;
        if (m < 10){
          m = `0${m}`;
        }
        let n = "";
        let y = tomorrow.getFullYear();
        const dateToCheck = itemDate.split("-");
        if(d<10){
          n = d.toString();
          n = `0${n}`;
        } else {
          n = d.toString();
        }
        //tutaj mamy inny warunek, data planu musi byc TAKA SAMA jak data jutrzejsza
        if (y.toString() === dateToCheck[0] && m === dateToCheck[1] && n === dateToCheck[2]){
          return true;
        } else {
          return false;
        }
      }
      
      //wyswietla plany
      renderItems = () => {
        const { viewDone: done} = this.state;
        //filter() tworzy nową tablicę ze wszystkimi elementami, które spełniają warunek
        //zapisany wewnątrz filter()
        const newItems = this.state.plannedList.filter(
          //czyli tworzona jest tablica z planami, które mają wartosc done o odpowiedniej
          //wartosci, albo false albo true w zależności od stanu
          //domyslnie na samym początku wyswietlane są te ktore nie są done czyli z done === false
          //jest tak zdefiniowane w stanie w konstruktorze
          item => item.done === done,
        );
        //zwrócenie wszystkich planow done lub not done
        //w zależności od stanu viewDone
        return newItems.map(item => (
          <ListGroupItem key={item.id}>
            <div className="list-group-item d-flex justify-content-between align-items-center">
            <span
            className={`${this.state.viewDone ? "done" : ""}`}
            style={{textAlign: 'left'}}
            >
              {/* wyświetlany jest przedmiot */}
              <Badge pill color="info">{item.subject}</Badge>
              {/* tytul planu */}
              {item.title}
              {/* opis planu*/}
              <FormText color="muted">
                {item.description}
              </FormText>
              {/* wywoływana jest funkcja sprawdzająca, czy data planu jest dzisiejszą datą*/}
              {this.checkTodayDate(item) ? 
              /* jeśli tak to pod opisem planu jest wyświetlany napis today*/
              (<Badge color="danger">today</Badge>) 
              /* jeśli nie, wywoływana jest funkcja sprawdzająca czy dta juz minęła
              jak tak to wyświetlane jest too late */
              : this.checkPast(item) ? <Badge color="dark">too late</Badge>
              /*jeśli nie to sprawdzane jest czy moze data jest jutrzejsza, 
              jak tak to wyswietlany jest napis tomorrow*/
              : this.checkTom(item) ? <Badge color="warning">tomorrow</Badge>
              /*jak zadna funkcja nie zwrocila true to wypisywana jest po prostu data planu*/
              : <Badge color="light">{item.date}</Badge>
              }
            </span>
            <span>
              {/* guzik, ktorego wciśnięcie umożliwia edycje planu */}
            <Button outline onClick={() => this.editItem(item)} color="info">Edit</Button>{' '}
            {/* guzik, którego wciśnięcie umożliwia usunięcie planu*/}
            <Button outline onClick={() => this.handleDelete(item)} color="secondary">Delete</Button>
            </span>
            </div>
          </ListGroupItem> 
        ));
      };

      //zmienia stan
      //powoduje to otwarcie lub zamknięcie modalu w zależności
      //czy byl juz otwarty czy nie
      toggle = () => {
        this.setState({ modal: !this.state.modal });
      };

      //po wciśnięciu save w modalu
      handleSubmit = item => {
        //modal się zamyka
        this.toggle();
        //jeśli plan ma juz swoje id to znaczy
        //ze aktualizujemy, edytujemy istniejące już wydarzenie
        //dlatego uzuwana jest metoda put
        //po zedytowaniu planu lista planów jest odświeżana, by wyświetlić
        //wprowadzone przed chwilą zmiany
        if (item.id) {
          axios
            .put(`/api/plans/${item.id}/`, item)
            .then(res => this.refreshList());
          return;
        }
        //kiedy nie mamy id, jest to nowy plan i musimy go utworzyc
        //dlatego metoda post
        //lista jest odświeżana, by wyświetlić przed chwilą utworzony plan
        axios
          .post("/api/plans/", item)
          .then(res => this.refreshList());
      };

      //usuwanie planu wywoływane po wciśnięciu guzika delete
      //metoda delete usuwa plan o danym id
      //następnie lista jest odświeżana, by usunąć z widoku usunięty element
      handleDelete = item => {
        axios
          .delete(`/api/plans/${item.id}`)
          .then(res => this.refreshList());
      };

      //po wciśnięciu guzika Add new tworzony jest nowy plan, pusty plan
      createItem = () => {
        const item = { title: "", description: "", subject: "", date: "", done: false };
        //zmieniany jest stan
        //pod activeItem podstawiany jest utworzony plan
        //pod modal ustawiana jest wartosc przeciwna do tej aktualnej
        //inaczej mowiac, modal jest otwierany
        this.setState({ activeItem: item, modal: !this.state.modal });
      };

      //po wciśnięciu guzika edit, zmieniany jest stan i pod activeItem podstawiany jest wybrany plan
       //pod modal ustawiana jest wartosc przeciwna do tej aktualnej
      //inaczej mowiac, modal jest otwierany
      editItem = item => {
        this.setState({ activeItem: item, modal: !this.state.modal });
      };

      render() {
        return (
          <main className="font2">
            <br></br>
            <Card style={{width:'60%', margin: '0 auto'}}>
              <CardHeader className="font" style={{fontSize:'50px', textAlign: 'center', paddingTop: '10px'}}>Planner<br></br>
              {/* wyświetlenie dzisiejszej daty*/}
              <p className="font2" style={{fontSize:'30px'}}>{new Date().toLocaleDateString()}</p>
              {/* guzik umożliwiający dodawanie nowych planów */}
                <Button outline color="info" className="font2" onClick={this.createItem} style={{width:'10%'}}>Add new</Button>
              </CardHeader>
              <CardBody>
                {/* wywołanie funkcji wyświetlającej guziki*/}
              {this.renderTabList()}
              <ListGroup>
                {/* wywołanie funkcji wyświetlającej liste planów */}
                {this.renderItems()}
              </ListGroup>
              </CardBody>
            </Card>
            <br></br>
            {/* jeśli stan modal jest true to wyświetlany jest modal z wybranym planem (albo już isniejącym,
            albo dopiero co utworzonym, pustym)*/}
            {this.state.modal ? (
              <Modal
                activeItem={this.state.activeItem}
                toggle={this.toggle}
                onSave={this.handleSubmit}
              />
              /*jeśli false to nic nie jest wyświetlane */
            ) : null}
          </main>
        );
      }
    }
    export default App;