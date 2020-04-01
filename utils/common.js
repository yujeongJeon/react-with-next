const Common = (function() {
  return {
    add: (a, b) => a + b,
    push: curry((v, arr) => (arr.push(v), arr)),
    set: curry(([k, v], obj) => ((obj[k] = v), obj)),
    logf: msg => (log(msg), msg),
    spreadWithSpace: reduce((a, b) => `${a} ${b}`),
    isNotEmpty: coll => {
      if (coll === undefined) return false;
      if (coll instanceof Array) return coll.length > 0 ? true : false;
      if (coll instanceof Object)
        return Object.entries(coll).length > 0 ? true : false;
      if (coll instanceof Number) return coll > 0 ? true : false;
      if (typeof coll === "string") return coll.length > 0 ? true : false;
      return false;
    },
    isEmpty: coll => {
      if (coll === undefined) return true;
      if (coll instanceof Array) return coll.length == 0 ? true : false;
      if (coll instanceof Object)
        return Object.entries(coll).length == 0 ? true : false;
      if (coll instanceof Number) return coll < 1 ? true : false;
      if (typeof coll === "string") return coll.length == 0 ? true : false;
      return false;
    },
    isInRange: curry((range, number) => {
      const [min, max] = range;
      return number >= min && number <= max ? true : false;
    }),
    isOnlyEnglish: string => /^[a-z|A-Z|0-9|\_|\-]+$/gi.test(string),
    ascOrderByProperty: curry((property, coll) =>
      coll.sort((a, b) =>
        a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0
      )
    ),
    descOrderByProperty: curry((property, coll) =>
      coll.sort((a, b) =>
        a[property] > b[property] ? -1 : a[property] < b[property] ? 1 : 0
      )
    ),
    first: arr => (!!arr[0] ? arr[0] : undefined),
    last: arr => arr[arr.length - 1],
    timeStampReady: curry((ie, n) =>
      ie
        ? new Date().toLocaleTimeString("ko-KR").replace(/\u200E/g, "")
        : new Date().toLocaleTimeString("ko-KR", { timeZone: "Asia/Seoul" })
    ),
    btoa: str => Buffer.from(str).toString('base64'),
    browserDetect: _ => {
      // Opera 8.0+
      const isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

      // Firefox 1.0+
      const isFirefox = typeof InstallTrigger !== 'undefined';

      // Safari 3.0+ "[object HTMLElementConstructor]" 
      const isSafari = /constructor/i.test(window.HTMLElement) || 
      (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })
      (!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));

      // Internet Explorer 6-11
      const isIE = /*@cc_on!@*/false || !!document.documentMode;

      // Edge 20+
      const isEdge = !isIE && !!window.StyleMedia;

      // Chrome 1 - 71
      const isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);

      return  {
        isOpera: isOpera,
        isFirefox: isFirefox,
        isSafari: isSafari,
        isIE: isIE,
        isEdge: isEdge,
        isChrome: isChrome
      }
    }
  };
})();

module.exports = Common;
