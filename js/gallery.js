class Gallery {

  constructor(flickerApi, renderService) {
    this.flickerApi = flickerApi;
    this.renderService = renderService;
  }

  init(galleryContainer) {
    const authorId = location.hash ? location.hash.substring(1) : null;
    this.galleryContainer = galleryContainer;
    this.loadImages(authorId);

    window.addEventListener('hashchange', () => {
      this.loadImages(location.hash.substring(1));
    });
  }

  loadImages(authorId) {
    const filters = authorId ? {id: authorId} : null;

    this.flickerApi.getImages(filters).then((res) => {
      document.querySelector(this.galleryContainer).innerHTML = this.renderService.render(res);
    });
  }
}