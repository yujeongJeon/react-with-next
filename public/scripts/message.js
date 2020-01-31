module.exports = {
  init: (talkpopBgColor, talkpopTextColor, imageUrl) => {
    window.addEventListener("load", function(e) {
      sendMsgToParent({event: "leaflo-ready", data: {
        talkpopBgColor: talkpopBgColor,
        talkpopTextColor: talkpopTextColor,
        imageUrl: imageUrl
      }});
    });
  
    function sendMsgToParent( msg ) {
      window.parent.postMessage( msg, '*' );
    }
  },
  close: _ => {
    window.parent.postMessage({event: "leaflo-chat-toggle"}, '*' );
  }
};
