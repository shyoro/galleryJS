class FlickerApi {
  constructor(jsonpService) {
    this.FLICKER_URL = 'http://api.flickr.com/services/feeds/photos_public.gne?tagmode=any&format=json';
    this.jsonpService = jsonpService;
  }

  getAllImages() {
    return new Promise((resolve, reject) => {
      this.jsonpService.call(this.FLICKER_URL, (res) => {
        resolve(res);
      });
    });
  }

  getAuthorImages(authorId) {
    return new Promise((resolve, reject) => {
      this.jsonpService.call(this.FLICKER_URL + `&id=${authorId}`,(res) => {
        resolve(res);
      })
    });
  }
}

const flickerApi = new FlickerApi(jsonpService);
