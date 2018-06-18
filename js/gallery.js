class JsonpService {
  constructor() {
  }

  call(url, callback) {
    window.jsonpCallback = callback;
    const script = document.createElement('script');
    script.src = url + '&jsoncallback=jsonpCallback';
    document.body.appendChild(script)
  }
}

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
}

class Renderer {

  constructor() {
    this.container = document.getElementById('GALLERY');
  }

  render(res) {
    this._res = res;
    this._title();
    this._generateWidget();
  }

  _generateWidget() {
    const div = document.createElement('div');
    div.classList.add('gl-widget');

    const items = this._res.items || [];
    items.forEach((item, index) => {
      const ul = document.createElement('ul');
      const divItem = document.createElement('div');
      divItem.classList.add('gl-widget-item');

      ul.classList.add('gl-widget-index-' + index);

      const link = this._link(item.link);
      ul.appendChild(link);

      link.appendChild(this._itemTitle(item.title));
      link.appendChild(this._image(item.media.m, index));
      divItem.appendChild(link);
      divItem.appendChild(this._author(item.author));
      divItem.appendChild(this._dateTaken(item.date_taken));
      div.appendChild(divItem);
    });

    this.container.appendChild(div);
  }

  _image(imageSrc, index) {
    if (imageSrc === undefined || index === undefined) {
      return undefined
    }
    const img = document.createElement('img');
    img.classList.add('gl-image');
    img.classList.add('gl-img-' + index);
    img.setAttribute('src', imageSrc);
    return img
  }

  _title() {
    let node = document.createElement('p');
    let textNode = document.createTextNode(this._res.title || 'No Images');
    node.appendChild(textNode);
    this.container.appendChild(node);
  }

  _itemTitle(title) {
    const para = document.createElement('p');
    const text = title || 'Images From Flicker';
    para.innerText = `${text}`;
    para.classList.add('gl-item-txt-link');
    return para;
  }

  _link(link) {
    const a = document.createElement('a');
    a.setAttribute('href', link);
    a.setAttribute('target', '_blank');
    return a;
  }

  _author(authorStr) {
    const link = document.createElement('a');
    const author = this._parseAuthorString(authorStr);
    link.setAttribute('href', `#${author}`);
    link.innerText = `${author}`;
    link.classList.add('gl-item-author');
    link.addEventListener('click', this._filterByAuthor.bind(this, author));

    return link;
  }

  _parseAuthorString(authorStr) {
    if (authorStr !== undefined) {
      const regExp = `"(.*?)"`;
      const matches = authorStr.match(regExp);
      return (matches !== null) ? matches[0].replace(`"`, ``).slice(0, -1) : authorStr;
    }

    return 'Unknown authors';
  }

  _dateTaken(dateTakenStr) {
    if (dateTakenStr === undefined) {
      return undefined;
    }

    const para = document.createElement('p');
    para.classList.add('gl-item-date');
    para.innerText = this._parseDateString(dateTakenStr);
    return para;
  }

  _parseDateString(dateTakenStr) {
    if (dateTakenStr !== undefined) {
      const date = new Date(dateTakenStr);
      const day = ('0' + date.getDate()).slice(-2);
      const month = ('0' + (date.getMonth() + 1)).slice(-2);
      const year = date.getFullYear();
      return `${day}.${month}.${year}`;
    }
    return `Unknown Date`;
  }

  _filterByAuthor(author) {
    this._res.items = this._res.items.filter((item) => {
      return item.author.indexOf(author) !== -1;
    });

    window.addEventListener('hashchange', this._hasChange.bind(this));
  }

  _hasChange() {
    this.container.innerHTML = ``;
    if (!window.location.href.includes(`#`)) {
      let flickerResponse = localStorage.getItem('flickerResponse');
      this.render(JSON.parse(flickerResponse)); // load the original res object
    } else {
      this.render(this._res);// load only the author res object
    }
  }

}

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
}

const jsonpService = new JsonpService();
const flickerApi = new FlickerApi(jsonpService);
const renderer = new Renderer();
const gallery = new Gallery(flickerApi, renderer);

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = renderer;
}

gallery.init();