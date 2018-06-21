class Gallery {
  constructor(flickerApi, renderService) {
    this.flickerApi = flickerApi;
    this.renderService = renderService;
  }

  init() {
    this.flickerApi.getImages().then((res) => {
      localStorage.setItem('flickerResponse', JSON.stringify(res));
      document.innerHTML = this.renderService.render(res);
    });
  }

  getImagesByAuthor(authorId) {
    window.addEventListener('hashchange', () => this._switchGalleryView(authorId));
  }

  _switchGalleryView(authorId) {
    document.innerHTML  = ``;
    if (!window.location.href.includes(`#${authorId}`)) {

      //here we load original copy of images
      const flickerResponse = localStorage.getItem('flickerResponse');
      document.innerHTML = this.renderService.render(JSON.parse(flickerResponse));
    } else {

      this.flickerApi.getImages({id: authorId}).then((res) => {
        document.innerHTML = this.renderService.render(res);
      });
    }
  }
}