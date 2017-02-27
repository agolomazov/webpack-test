var messages = require('./js/messages');

var app = document.getElementById('app');

var newMessage = () => {
  return (`
    DEV: ${DEVELOPMENT}<br />
    PROD: ${PRODUCTION}<br />
  `);
}

app.innerHTML = newMessage();

/* Start with hot reload */
if(module.hot){
  module.hot.accept();
}
