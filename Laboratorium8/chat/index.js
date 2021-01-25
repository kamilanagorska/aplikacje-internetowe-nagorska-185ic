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

http.listen(3000, () => {
    console.log('listening on *:3000');
  });

let users = 0;

io.on('connection', (socket) => {
    let addUser = false;

    //tworzenie wiadomości
    socket.on('new message', (data) => {
    socket.broadcast.emit('new message', {
      username: socket.username,
      message: data
    });
  });
  
  //tworzenie nowego użytkownika
  socket.on('add user', (username) => {
    if (addUser) return;

    socket.username = username;
    ++users;
    addUser = true;
    socket.emit('login', {
      users: users
    });
    socket.broadcast.emit('user joined', {
      username: socket.username,
      users: users
    });
  });

  //dodanie napisu "typing"
  socket.on('typing', () => {
    socket.broadcast.emit('typing', {
      username: socket.username
    });
  });

  //usunięcie napisuje "typing"
  socket.on('stop typing', () => {
    socket.broadcast.emit('stop typing', {
      username: socket.username
    });
  });

  //kiedy uzytkownik wyloguje się
  socket.on('disconnect', () => {
    if (addUser) {
      --users;

      // echo globally that this client has left
      socket.broadcast.emit('user left', {
        username: socket.username,
        users: users
      });
    }
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
const io = require('socket.io')(http);

//dodanie plików razem ze staticami
app.use(express.static(path.join(__dirname, '/')));


io.on('connection', (socket) => {
    let addedUser = false;
  
    // Tworznie nowej wiadomości
    socket.on('chat message', (data) => {
      socket.broadcast.emit('chat message', {
        username: socket.username,
        message: data
      });
    });
  
    // Tworznie nowego użytkownika
    socket.on('add user', (username) => {
      if (addedUser) return;
  
      // Przypisanie podanej nazwy do secket
      socket.username = username;
      addedUser = true;
      socket.emit('login');
    });
  
    // Wyświetlanie inforamicji o tym czy kotś pisze
    socket.on('typing', () => {
      socket.broadcast.emit('typing', {
        username: socket.username
      });
    });
  
    // Zakonczenie wyświetlania
    socket.on('stop typing', () => {
      socket.broadcast.emit('stop typing', {
        username: socket.username
      });
    });
  });
  

http.listen(3000, () => {
  console.log('listening on *:3000');
});