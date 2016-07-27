window.onload = function () {
        console.log('farm manager up and running');

    var form = document.getElementById('updateinfo');
    form.onsubmit = function(e) {
        e.preventDefault();
        var userInput = document.getElementById('input');

    var url = 'mongodb://localhost:27017/farm'
    var request = new XMLHttpRequest();
    request.open("POST", url);
    request.setRequestHeader("Content-Type", "application/json");
      request.onload = function(){
        if(request.status === 200){
        }
      }
      request.send(JSON.stringify( ????  ));
    
    

};

  