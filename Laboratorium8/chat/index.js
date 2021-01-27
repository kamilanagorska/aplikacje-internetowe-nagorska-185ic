/*PRZYKŁAD WYŚWIETLAJĄCY HELLO WORLD NA STRONIE
A W KONSOLI LISTENING ON *:3000
//funkcja require() służy do importowania kodu z innych plików
//ścieżka rozpoczyna się od kropki lub dwoch
//jeśli nie ma żadnej kropki dany moduł będzie domyślnie szukany w katalogu node_modules
const app = require('express')();
//express inicjuje aplikację jako moduł obsługi funkcji, ktory można dostarczyć do serwera HTTP
//createServer() zamienia komputer w serwer HTTP, tworzy obiekt serwera HTTP
//Obiekt serwera HTTP może nasłuchiwać portów na komputerze i wykonywać funkcję 
//requestListener za każdym razem, gdy zostanie wysłane żądanie
const http = require('http').createServer(app);

//definiujemy procedurę obsługi trasy "/", ktora jest wywoływana, gdy
//odwiedzimy stronę głowną naszej witryny
app.get('/', (req, res) => {
    //wyświetlone zostanie Hello world
  res.send('<h1>Hello world</h1>');
});

//sprawiamy, że serwer HTTP nasłuchuje na porcie 3000
http.listen(3000, () => {
  console.log('listening on *:3000');
});*/

/*const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

//res.sendFile(path [, options] [, fn])
//przesyla plik pod podaną ścieżkę, ustala pole nagłówka HTTP odpowiedzi
//content-type na podstawie rozszerzenia nazwy pliku
//zamiast pisac kod w res.send() przesyłamy tutaj plik w którym znajduje
//sie cała nasza strona, jej wygląd
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

//wyświetlanie, czy użytkownik dołączył lub wyszedl z czatu
//w konsoli
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
});

//wyswietlanie wiadomosci w konsoli
io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      console.log('message: ' + msg);
    });
});
});*/

const express = require('express');
const app = require('express')();
const path = require('path');
const http = require('http').Server(app);
//inicjacja instancji socket.io przekazując http
const io = require('socket.io')(http);

//app.use() powiązuje oprogramowanie pośredniczące na poziomie aplikacji
//app.use(express.static()) umożliwia wyświetlanie plików CSS i js 
//__dirname,'/' jest "absolutną ścieżką" i jest bezpiecznym rozwiązaniem, gdy
//ścieżka podana do funkcji express.static jest względna w stosunku do katalogu
//z ktorego uruchamiamy proces node
app.use(express.static(path.join(__dirname, '/')));

//socket.on(<event name>, <listener>) służy do odebrania
//zdarzenia poprzez zarejestrowanie nasłuchiwana (listener)
//wszystko po { uruchamia się po udanym połączeniu
io.on('connection', (socket) => {
  //ustawiamy na false, bo na razie nie mamy zadnego uzytkownika
    let addedUser = false;
  
      //utworzenie użytkownika, po wejściu na strone
      //wywoływane po wysłaniu zdarzenia add user
      //czyli po tym jak zostanie wpisany username
      //przez użytkownika i wciśnięte zostanie enter
      socket.on('add user', (username) => {
        //jeśli addedUser jest na true to return
        if (addedUser) return;

        //pod socket.username podstawiamy
        //nazwę podaną przez użytkownika
        socket.username = username;
        //uzytkownik zostal dodany wiec true
        addedUser = true;
        //wysyłamy zdarzenie login
        //zostaje ono obsluzone w scripts.js
        socket.emit('login');
      });

    //tworzenie wiadomości
    //po wysłaniu przez plik scripts.js zdarzenia 'chat message'
    //wykonywane jest to:
    socket.on('chat message', (data) => {
      //socket.broadcast.emit wysyła do wszystkich
      socket.broadcast.emit('chat message', {
        //wysyłany jest username
        username: socket.username,
        //i wiadomośc, ktora jest przechowywana w data
        message: data
      });
    });
  
    //wyświetlanie napisu 'typing...' gdy ktos cos pisze
    socket.on('typing', () => {
      //wyslanie zdarzenia typing
      //do wszystkich, wszyscy będą widzieli napis 'typing'
      //i odpowiednią nazwę uzytkownika
      socket.broadcast.emit('typing', {
        username: socket.username
      });
    });
  
    //zakonczenie wyświetlania napisu 'typing'
    //wykonywane na wydarzenie 'stop typing'
    socket.on('stop typing', () => {
      //wszyscy będą widzieli, że typing zniknęło
      socket.broadcast.emit('stop typing', {
        username: socket.username
      });
    });
  });
  
//ustawienie, że nasz serwer będzie nasłuchiwał na localhost:3000
//w konsoli wyświetlane jest listening on *:3000
http.listen(3000, () => {
  console.log('listening on *:3000');
});