class JsonpService {
  constructor() {}

  call(url, callback) {
    window.jsonpCallback = callback;
    const script = document.createElement('script');
    script.src = url + '&jsoncallback=jsonpCallback';
    document.body.appendChild(script)
  }
}

const jsonpService = new JsonpService();