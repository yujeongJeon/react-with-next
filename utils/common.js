const Common = (function (){
    return {
        add: (a, b) => a + b,
        push: curry((v, arr) => (arr.push(v), arr)),
        set: curry(([k, v], obj) => (obj[k] = v, obj)),
        logf: msg => (log(msg), msg),
        spreadWithSpace: reduce((a, b) => `${a} ${b}`),
        isNotEmpty: coll => {
            if (coll === undefined) return false;
            if (coll instanceof Array) return coll.length > 0 ? true : false;
            if (coll instanceof Object) return Object.entries(coll).length > 0 ? true : false;
            if (coll instanceof Number) return coll > 0 ? true : false;
            if (typeof coll === "string") return coll.length > 0 ? true : false;
            return false;
        },
        isEmpty: coll => {
            if (coll === undefined) return true;
            if (coll instanceof Array) return coll.length == 0 ? true : false;
            if (coll instanceof Object) return Object.entries(coll).length == 0 ? true : false;
            if (coll instanceof Number) return coll < 1 ? true : false;
            if (typeof coll === "string") return coll.length == 0 ? true : false;
            return false
        },
        isInRange: curry((range, number) => {
            const [ min, max ] = range;
            return number >= min && number <= max ? true : false;
        }),
        isOnlyEnglish: string => /^[a-z|A-Z|0-9|\_|\-]+$/gi.test(string),
        ascOrderByProperty: curry(
            (property, coll) => 
              coll.sort((a, b) => 
                a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0)
        ),
        descOrderByProperty: curry(
            (property, coll) => 
              coll.sort((a, b) => 
                a[property] > b[property] ? -1 : a[property] < b[property] ? 1 : 0)
        ),
        first: arr => !!arr[0] ? arr[0] : undefined,
        last: arr => arr[arr.length-1],
        timeStampReady: curry(
            (ie, n) => ie
                ? new Date().toLocaleTimeString('ko-KR').replace(/\u200E/g, '')
                : new Date().toLocaleTimeString('ko-KR', { timeZone: 'Asia/Seoul' })
        ),
        dateStampReady: curry(
            (ie, n) => ie
            ? new Date().toLocaleDateString('ko-KR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
            : new Date().toLocaleDateString('ko-KR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
        )
    }
})();

module.exports = Common;
