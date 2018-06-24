class Renderer {

  constructor() {

  }

  render(res) {
    let itemsHtml = '';

    if (res.items && res.items.length) {
      res.items.forEach((item) => {
        itemsHtml += this._itemTemplate(item);
      });
    }

    return `
      <p class="gl-title">${res.title}</p>
      <div class="gl-widget">${itemsHtml}</div>
    `;
  }

  _itemTemplate(item) {
    const authorName = this._parseAuthorName(item.author);
    const date = this._parseDate(item.date_taken);

    return `
    <div class="gl-widget-item">
      <a href="${item.link}" target="_blank">
        <p class="gl-item-txt-link">${item.title}</p>
        <img src="${item.media.m}" class="gl-image">
      </a>
      <a href="#${item.author_id}" class="gl-item-author">${authorName}</a>
      <p class="gl-item-date">${date}</p>
    </div>  
    `
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