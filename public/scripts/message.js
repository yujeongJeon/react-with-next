module.exports = {
  init: _ => {
    window.addEventListener("load", function(e) {
      sendMsgToParent({event: "leaflo-ready"});
    });
  
    function sendMsgToParent( msg ) {
      window.parent.postMessage( msg, '*' );
    }
  },
  close: _ => {
    window.parent.postMessage({event: "leaflo-chat-toggle"}, '*' );
  }
};
