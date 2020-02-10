module.exports = {
  init: (talkpopBgColor, talkpopTextColor, talkPopBorder, talkPopBorderRadius, imageUrl) => {
    window.addEventListener("load", function(e) {
      sendMsgToParent({event: "leaflo-ready", data: {
        talkpopBgColor: talkpopBgColor,
        talkpopTextColor: talkpopTextColor,
        talkPopBorder: talkPopBorder,
        talkPopBorderRadius: talkPopBorderRadius,
        imageUrl: imageUrl
      }});
    });
  
    function sendMsgToParent( msg ) {
      setTimeout(_ => {
        console.log("send postMessage");
        window.parent.postMessage(msg, '*');
      }, 5000);
      //window.parent.postMessage( msg, '*' );
    }
  },
  close: _ => {
    window.parent.postMessage({event: "leaflo-chat-toggle"}, '*' );
  }
};
