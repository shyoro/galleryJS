class Gallery {
  constructor(flickerApi, renderService) {
    this.flickerApi = flickerApi;
    this.renderService = renderService;
  }

  init() {
    this.flickerApi.getAllImages().then((res) => {
      localStorage.setItem('flickerResponse', JSON.stringify(res));
      this.renderService.render(res);
    });
  }

  getImagesByAuthor(authorId) {
    this.flickerApi.getAuthorImages(authorId).then((res) => {
      this.renderService.render(res);
    })
  }
}

const gallery = new Gallery(flickerApi, renderer);