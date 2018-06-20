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
    const widgetContainer = document.createElement('div');
    widgetContainer.classList.add('gl-widget');

    const items = this._res.items || [];
    items.forEach((item, index) => {
      widgetContainer.innerHTML += this._itemTemplate(item, index);
      const authorElement = widgetContainer.querySelector('.gl-item-author');
      authorElement.addEventListener('click', this._renderImagesByAuthor(item.author ,item.author_id));
    });

    this.container.appendChild(widgetContainer);
  }

  _itemTemplate(item, index) {
    const authorName = this._parseAuthorName(item.author);
    const date = this._parseDateString(item.date_taken);

    return `
    <div class="gl-widget-item">
      <a href="${item.link}" target="_blank">
        <p class="gl-item-txt-link">${item.title}</p>
        <img src="${item.media.m}" class="gl-image gl-img-${index}">
      </a>
      <a href="#${authorName}" class="gl-item-author">${authorName}</a>
      <p class="gl-item-date">${date}</p>
    </div>  
    `
  }

  _title() {
    let node = document.createElement('p');
    let textNode = document.createTextNode(this._res.title || 'No Images');
    node.appendChild(textNode);
    this.container.appendChild(node);
  }

  _parseAuthorName(authorTaken) {
    if (authorTaken !== undefined) {
      const regExp = `"(.*?)"`;
      const matches = authorTaken.match(regExp);
      return (matches !== null) ? matches[0].replace(`"`, ``).slice(0, -1) : authorTaken;
    }

    return 'Unknown authors';
  }

  _parseDateString(dateTaken) {
    if (dateTaken !== undefined) {
      const date = new Date(dateTaken);
      const day = ('0' + date.getDate()).slice(-2);
      const month = ('0' + (date.getMonth() + 1)).slice(-2);
      const year = date.getFullYear();
      return `${day}.${month}.${year}`;
    }
    return `Unknown Date`;
  }

  _renderImagesByAuthor(author, authorId) {
    // console.log(authorId);
    this._res.items = this._res.items.filter((item) => {
      return item.author.indexOf(author) !== -1;
    });

    window.addEventListener('hashchange', this._switchGalleryView.bind(this, authorId));
  }

  _switchGalleryView(authorId) {
    this.container.innerHTML = ``;
    if (!window.location.href.includes(`#`)) {
      let flickerResponse = localStorage.getItem('flickerResponse');
      this.render(JSON.parse(flickerResponse)); // load the original res object
    } else {
      gallery.getImagesByAuthor(authorId);
    }
  }
}

// if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
//   module.exports = renderer;
// }