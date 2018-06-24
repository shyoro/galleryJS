const jsonpService = new JsonpService();
const flickerApi = new FlickerApi(jsonpService);
const renderer = new Renderer();
const gallery = new Gallery(flickerApi, renderer);

gallery.init(`#GALLERY`);