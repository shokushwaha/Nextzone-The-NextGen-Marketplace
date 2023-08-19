import Kommunicate from "@kommunicate/kommunicate-chatbot-plugin";

export default function KommunicateChat() {
  (function (d, m) {
    var kommunicateSettings = {
      appId: process.env.NEXT_PUBLIC_APP_ID,
      popupWidget: true,
      automaticChatOpenOnNavigation: true,
    };

    kommunicateSettings.restartConversationByUser = true;
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.async = true;

    s.src = "https://widget.kommunicate.io/v2/kommunicate.app";

    var h = document.getElementsByTagName("head")[0];
    h.appendChild(s);


    window.kommunicate = m;
    m._globals = kommunicateSettings;
  })(document, window.kommunicate || {});
  return <div></div>;
}
