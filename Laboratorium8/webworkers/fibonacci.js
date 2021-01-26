//kiedy zostanie przesłana wiadomość (postMessage) wykona się to
self.addEventListener("message", function(e) {
    if(e.data < 0){
        postMessage("Podano liczbę ujemną!!!!");
    } else {
    let a = 0;
    let b = 1;
    let numbers = [0];
    if(e.data === 0){
        postMessage(0);
    } else {
        for(let i = 0; i<e.data; i++){
            numbers.push(b);
            b+= a;
            a =b-a;
        }
        postMessage(numbers);
    }
}

}, false);
    