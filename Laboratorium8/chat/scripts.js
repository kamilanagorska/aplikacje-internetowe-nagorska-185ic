$(function() {

  const COLORS = [
    '#e21400', '#91580f', '#f8a700', '#f78b00',
    '#58dc00', '#287b00', '#a8f07a', '#4ae8c4',
    '#3b88eb', '#3824aa', '#a700ff', '#d300e7'
  ];

    const $window = $(window);
    const $usernameInput = $('.usernameInput'); 
    const $messages = $('.messages');           
    const $inputMessage = $('.inputMessage');  
    const $loginPage = $('.login.page');        
    const $chatPage = $('.chat.page');     
  
    const socket = io();
  
    let username;
    let connected = false;
    let typing = false;
  
  
    // Ustawienie nazwy użytkownika
    const setUsername = () => {
      username = $usernameInput.val().trim();
      console.log(username)
      if (username) {
        $loginPage.hide();
        $chatPage.show();
        $currentInput = $inputMessage.focus();
  
        // Wysłanie informacji do servera przy pomocy socketa
        socket.emit('add user', username);
      }
    }
  
    // Wysyłanie wiadomości
    const sendMessage = () => {
      let message = $inputMessage.val().trim();
      if (message && connected) {
        $inputMessage.val('');
        addChatMessage({ username, message });
        // Wysłanie informacji do servera przy pomocy socketa uruchomienie funkcji chat message
        socket.emit('chat message', message);
      }
    }
  
    // Wyśietlanie wiadmości
    const addChatMessage = (data, options) => {
      
      if (!options) {
        options = {};
      }
      const $usernameDiv = $('<span class="username"/>')
        .text(data.username)
        .css('color', getUsernameColor(data.username))
      const $messageBodyDiv = $('<span class="messageBody">')
        .text(data.message);
  
      const typingClass = data.typing ? 'typing' : '';
      const $messageDiv = $('<li class="message"/>')
        .data('username', data.username)
        .addClass(typingClass)
        .append($usernameDiv, $messageBodyDiv);
  
      addMessageElement($messageDiv, options);
    }
  
    // Wyświetlenie 
    const addChatTyping = (data) => {
      data.typing = true;
      data.message = 'is typing...';
      addChatMessage(data);
    }
  
    // Usuwanie 
    const removeChatTyping = (data) => {
      getTypingMessages(data).fadeOut(function () {
        $(this).remove();
      });
    }
  
    // Dodawanie wiadomości na strone
    const addMessageElement = (el, options) => {
      const $el = $(el);
      if (!options) {
        options = {};
      }
      if (typeof options.prepend === 'undefined') {
        options.prepend = false;
      }
      if (options.prepend) {
        $messages.prepend($el);
      } else {
        $messages.append($el);
      }
  
      $messages[0].scrollTop = $messages[0].scrollHeight;
    }

    
    // Gets the color of a username through our hash function
    const getUsernameColor = (username) => {
      // Compute hash code
      let hash = 7;
      for (let i = 0; i < username.length; i++) {
        hash = username.charCodeAt(i) + (hash << 5) - hash;
      }
      // Calculate color
      const index = Math.abs(hash % COLORS.length);
      return COLORS[index];
    }
  
  
    // Ustawienie wiadmości "pisze"
    const updateTyping = () => {
      if (connected) {
        if (!typing) {
          typing = true;
          socket.emit('typing');
        }
      }
    }
  
    // Pobranie nazwy użytkownika który aktualnie pisze
    const getTypingMessages = (data) => {
      return $('.typing.message').filter(function (i) {
        return $(this).data('username') === data.username;
      });
    }
  
    $window.keydown(event => {
  
      // Wysyłąnie przy pomocy entera
      if (event.which === 13) {
        if (username) {
          sendMessage();
          socket.emit('stop typing');
          typing = false;
        } else {
          setUsername();
        }
      }
    });
  
    $inputMessage.on('input', () => {
      updateTyping();
    });
  
  
    // Wywołania odpowiednich fukcji socketa
    socket.on('login', (data) => {
      connected = true;
    });
  
    socket.on('chat message', (data) => {
      addChatMessage(data);
    });
  
    socket.on('typing', (data) => {
      addChatTyping(data);
    });
  
    socket.on('stop typing', (data) => {
      removeChatTyping(data);
    });
  
  });