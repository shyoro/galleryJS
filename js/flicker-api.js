class FlickerApi {
  constructor(jsonpService) {
    this.FLICKER_URL = 'http://api.flickr.com/services/feeds/photos_public.gne?tagmode=any&format=json';
    this.jsonpService = jsonpService;
  }

  getImages(filters) {
    let flickerApiUrl = this.FLICKER_URL;

    if (filters) {
      let queryString = Object.keys(filters).map(key => key + '=' + filters[key]).join('&');
      flickerApiUrl += `&${queryString}`
    }

    return new Promise((resolve, reject) => {
      this.jsonpService.call(flickerApiUrl, (res) => {
        resolve(res);
      });
    });
  }
}