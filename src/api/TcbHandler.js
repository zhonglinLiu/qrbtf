let isLogin;

export async function login() {
    if (isLogin) return;
    isLogin = true;
}

export function getDownloadCount(callback) {
    if (!isLogin) return;
    let res = {
      data: [
        {
          count: 23417,
          value: "A — a1",
        },
        {
          count: 12971,
          vaule: "SP — 3",
        },
        {
          count: 19887,
          value: "C1",
        },
        {
          count: 4456,
          value: "A — a2",
        },
        {
          count: 10822,
          value: "A2",
        },
        {
          count: 33,
          value: "D1",
        },
        {
          count: 61842,
          value: "A1",
        },
        {
          count: "32241",
          value: "C2",
        },
        {
          count: 5083,
          value: "B1",
        },
        {
          count: 3162,
          value: "A — b2",
        },
        {
          count: 6156,
          value: "A3",
        },
        {
          count: 5159,
          value: "A — b1",
        },
        {
          count: 16723,
          value: "SP — 1",
        },
        {
          count: 3636,
          value: "SP — 2",
        },
        {
          count: 3084,
          value: "C3"
        },
      ],
    };
    if (callback) callback(res);
}

export function increaseDownloadData(value, callback) {
    if (!isLogin) return;
    console.log(value)
    if (callback) callback();
}

export function recordDownloadDetail({text, value, type, params, history}, callback) {
    if (!isLogin) return;
    let d = {
      date: new Date().toString(),
      text: text,
      value: value,
      type: type,
      params: params,
      history: history,
    };
    console.log(d)
    let res = {}
    if (callback) callback(res);
}
