/* jshint ignore:start */
/* jshint strict: true */

let peer = new Peer({key: 'n0ei2j1souk57b9'}),
    joinHostButton = document.getElementById('join-host'),
    sendMessageButton = document.getElementById('send-message'),
    setNameButton = document.getElementById('set-name'),
    chatOutputEl = document.getElementById('chat-history'),
    landline,
    name;

peer.on('open', function(id) {
  document.getElementById('your-id').innerHTML = `<h4>Your id is: ${id}</h4>`;
});

setNameButton.addEventListener('click', function (name) {
  name = document.getElementById('name-input').value;
  document.getElementById('my-name').innerHTML = name;
});

joinHostButton.addEventListener('click', function(){
  landline = peer.connect(document.getElementById('friends-peer-id').value);
});

peer.on('connection', function(landline, name){
  console.log("Ready");

  landline.on('open', function(){

    landline.on('data', function(data){
      console.log(data);
      renderMessage(data);
    });

    sendMessageButton.addEventListener('click', function(evt){
      evt.preventDefault();
      landline.send({
        message: document.getElementById('message').value
      });
    });

  });

});

function renderMessage(data){
  chatOutputEl.innerHTML += `<p class="chat">data</p>`;
}
