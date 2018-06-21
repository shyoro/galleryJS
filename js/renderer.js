class Renderer {

  constructor() {
    this.container  = document.getElementById('GALLERY');
  }

  render(res) {
    this.container.innerHTML = this._title(res.title);
    this._generateWidget(res.items);
    return this.container.innerHTML;
  }

  _generateWidget(items) {
    const widgetContainer = document.createElement('div');
    widgetContainer.classList.add('gl-widget');

    items.forEach((item, index) => {
      widgetContainer.innerHTML += this._itemTemplate(item, index);
    });

    this.container.appendChild(widgetContainer);
  }

  _itemTemplate(item, index) {
    const authorName = this._parseAuthorName(item.author);
    const date = this._parseDate(item.date_taken);

    return `
    <div class="gl-widget-item">
      <a href="${item.link}" target="_blank">
        <p class="gl-item-txt-link">${item.title}</p>
        <img src="${item.media.m}" class="gl-image gl-img-${index}">
      </a>
      <a href="#${item.author_id}" onclick="gallery.getImagesByAuthor('${item.author_id}');" class="gl-item-author">${authorName}</a>
      <p class="gl-item-date">${date}</p>
    </div>  
    `
  }

  _title(title) {
    return `<p class="gl-title">${title}</p>`
  }

  _parseAuthorName(authorTaken) {
    if (authorTaken !== undefined) {
      const regExp = `"(.*?)"`;
      const matches = authorTaken.match(regExp);
      return (matches !== null) ? matches[0].replace(`"`, ``).slice(0, -1) : authorTaken;
    }

    return 'Unknown authors';
  }

  _parseDate(dateTaken) {
    if (dateTaken !== undefined) {
      const date = new Date(dateTaken);
      const day = ('0' + date.getDate()).slice(-2);
      const month = ('0' + (date.getMonth() + 1)).slice(-2);
      const year = date.getFullYear();
      return `${day}.${month}.${year}`;
    }
    return `Unknown Date`;
  }
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = new Renderer();
}