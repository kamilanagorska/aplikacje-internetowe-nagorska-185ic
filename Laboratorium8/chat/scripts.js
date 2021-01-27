$(function() {

  //tablica z kolorami nazw użytkowników
  const COLORS = [
    '#9494b8', '#668cff', '#85adad', '#d279a6', '#c65353',
  ];

  //pobranie odpowiednich elementów dokumentu html
    const $window = $(window);
    const $usernameInput = $('.usernameInput'); 
    const $messages = $('.messages');           
    const $inputMessage = $('.inputMessage');  
    const $loginPage = $('.login.page');        
    const $chatPage = $('.chat.page');     

    //nasz socket.io
    const socket = io();
  
    let username;
    let connected = false;
    let typing = false;
  
  
    //ustawianie nazwy użytkownika
    const setUsername = () => {
      //pobranie wartosci z inputa o klasie usernameInput
      //.trim() usuwa whitespace na przodzie i na koncu stringa
      username = $usernameInput.val().trim();
      //jeśli mamy wpisany username
      if (username) {
        //ukrywamy stronę z logowaniem
        $loginPage.hide();
        //wyświetlamy stronę z czatem
        $chatPage.show();
        //wysyłamy zdarzenie add user do socketa
        //z username podanym przez uzytkownika
        //wydarzenie to jest obsluzone w index.js
        socket.emit('add user', username);
      }
    }
  
    //wysyłanie wiadomości
    const sendMessage = () => {
      //pobranie wartosci z inputa i usunięcie bialych spacji
      let message = $inputMessage.val().trim();
      //jesli mamy wiadomość i użytkownik jest zalogowany
      //zmienna connected zmienia wartosc na true
      //gdy obslugiwane jest zdarzenie login
      if (message && connected) {
        //zmieniamy wartosc inputa na pustego stringa
        //'czyścimy' pole na wiadomosc
        $inputMessage.val('');
        //wywolanie metody ktora wyswietla wiadomosci
        showChatMessage({ username, message });
        //wysylanie zdarzenia 'chat message' z wiadomością wpisaną przez uzytkownika
        socket.emit('chat message', message);
      }
    }
  
    //wyświetlanie wiadomości
    const showChatMessage = (data, options) => {
      if (!options) {
        options = {};
      }
      //wstawienie nazwy uzytkownika w span o klasie username
      //ktory nie istnieje w html'u
      //jest tu tworzony
      const $usernameDiv = $('<span class="username"/>')
      //tekstem jestnazwa uzytkownika
        .text(data.username)
        //css by ustawic kolor uzytkownika, getUsernameColor wybiera kolor
        .css('color', getUsernameColor(data.username))
      //w span messageBody bedzie wyswietlana wiadomosc
      const $messageBodyDiv = $('<span class="messageBody">')
        .text(data.message);

      //jesli uzytkownik pisze to typing jak nie to nic
      //jestli data.typing jest na true
      const typingClass = data.typing ? 'typing' : '';
      //utworzenia li z wiadomością
      const $messageDiv = $('<li class="message"/>')
      //username
        .data('username', data.username)
        //dodajemy klasę czy typing czy nie
        .addClass(typingClass)
        //dołączamy utworzone wcześniej spany z username i z wiadomością
        .append($usernameDiv, $messageBodyDiv);

  //dodanie wiadomości na stronie
      addMessageElement($messageDiv, options);
    }
  
    //wyświetlanie napisu is typing
    const addChatTyping = (data) => {
      data.typing = true;
      //pod message dajemy is typing i wtedy dzieki
      //funkcji showChatMessage wyświetlane zostanie username is typing...
      data.message = 'is typing...';
      showChatMessage(data);
    }
  
    //usunięcie napisu is typing
    const removeChatTyping = (data) => {
      //getTypingMessages pobiera nazwe uzytkownika, ktory
      //wlasnie pisze
      //fadeOut() ukrywa dopasowane elementy
      getTypingMessages(data).fadeOut(function () {
        //funkcja wywolywana po zakonczeniu animacji
        //usuwa typing
        $(this).remove();
      });
    }
  
    //dodanie wiadomosci na stronie
    //pokazanie jej na stronie
    //przesylamy do niej nasz utworzony element li z wiadomoscia
    //i uzytkownikiem
    const addMessageElement = (el, options) => {
      const $el = $(el);
      if (!options) {
        options = {};
      }
      //kiedy prepend nie istnieje to ustawiamy na false
      if (typeof options.prepend === 'undefined') {
        options.prepend = false;
      }
      if (options.prepend) {
        //prepend() wstawia zawartosc na początek elementu wskazanego
        //czyli na początek messages, czyli elementu ul o klasie messages
        //zostawie wstawiona wiadomość
        $messages.prepend($el);
      } else {
        //append() wstawia zawartosc na koniec 
        //są to nasze kolejne wiadomości
        $messages.append($el);
      }
      //scrollTop pobiera bądź ustawia liczbę pikseli o którą ma zostac
      //przewinięta w górę zwartość elementu
      //czyli w naszym przypadku ustawiane jest o ile pikseli
      //ma się przewiniąć w górę zawartość messages
      //scrollHeightjest miarą wysokości zawartości elementu
      $messages[0].scrollTop = $messages[0].scrollHeight;
    }

    
    //pobiera kolor nazwy użytkownika
    const getUsernameColor = (username) => {
      //obliczanie hash'u
      let hash = 7;
      for (let i = 0; i < username.length; i++) {
        //tworzymy hash, charCodeAt zwraca liczbę oznaczającą wartośc unicode znaku o indeksie i
        hash = username.charCodeAt(i) + (hash << 5) - hash;
      }
      //wyliczanie koloru na podstawie hashu
      //abs zwraca wartosc bezwzględną
      const index = Math.abs(hash % COLORS.length);
      return COLORS[index];
      //funkcja ta powoduje, że ten sam username będzie miał zawsze tan sam kolor :)
    }
  
  
    //emitowanie zdarzenia typing
    //wykonywane na zdarzenie input
    //dla inputa z wiadomościa
    //czyli wykonywane gdy ktos zacznie wpisywac jakies
    //znaki w inputa od wiadomości
    const updateTyping = () => {
      //jesli jest connected
      if (connected) {
        //jesli typing to false
        if (!typing) {
          //typing na true
          typing = true;
          //wyslanie zdarzenia
          socket.emit('typing');
        }
      }
    }
  
    //pobranie username uzytkowika, ktory pisze wlasnie
    //wywoływane w removeChatTyping
    const getTypingMessages = (data) => {
      return $('.typing.message').filter(function (i) {
        return $(this).data('username') === data.username;
      });
    }
  
    //jeśli wciśnięty zostanie enter
    $window.keydown(event => {
      //13 to enter
      if (event.which === 13) {
        //jesli juz mamy username znaczy ze uztykownik pisze
        if (username) {
          //pisanie ze is typing lub wiadomosci
          sendMessage();
          //zakonczenie is typing
          socket.emit('stop typing');
          typing = false;
        } else {
          //jesli nie ma username to znaczy ze wlasnie zostalo podane
          //wiec musimy zapisac to username
          setUsername();
        }
      }
    });
  
    //kiedy wpisywane jest cos w input o klasie messages
    //wykonywana jest funkcja updateTyping()
    $inputMessage.on('input', () => {
      updateTyping();
    });
  
  
    //gdy zdarzenie login, connected na true
    socket.on('login', (data) => {
      connected = true;
    });

    //gdy zdarzenie chat message, to wywolanie 
    //showChatMessage czyli wyswietlanie wiadomosci
    socket.on('chat message', (data) => {
      showChatMessage(data);
    });

    //kiedy wydarzenie typing to addChatTyping()
    socket.on('typing', (data) => {
      addChatTyping(data);
    });
  
    //kiedy stop typing to wywolanie removeChatTyping
    socket.on('stop typing', (data) => {
      removeChatTyping(data);
    });
  
  });