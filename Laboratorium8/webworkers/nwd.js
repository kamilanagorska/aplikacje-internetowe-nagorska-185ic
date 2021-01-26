self.addEventListener("message", function(e) {
    if(e.data.a < 0 || e.data.b < 0 || e.data.a === 0 || e.data.b === 0){
        postMessage("Podano liczbę ujemną lub zero!!!!");
    } else {
        let a = e.data.a;
        let b = e.data.b;
        while(a != b){
            if(a > b){
                a -= b;
            } else {
                b -= a;
            }
        }
        postMessage(a);
}

}, false);
    
    