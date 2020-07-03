
const fs = require('fs');

const isDev = process.env.NODE_ENV !== 'production';

class TVReact {
  /**
   * @param {String} file: filename(absolute path)of template
   * @param {Object} data
   * @param {Object} config
   */
  constructor(viewFile, viewData, config) {
    this.viewFile = viewFile;
    this.viewData = viewData;
    this.config = config;
  }
  /**
   * render
   * @return {Promise}
   */
  render() {
    const { options = {}, viewPath } = this.config;
    const { devMiddleWare } = options;
    if (isDev) {
      const mfs = devMiddleWare.fileSystem;
      return new Promise((resolve) => {
        devMiddleWare.waitUntilValid(function() {
          const htmlStream = mfs.readFileSync(`${viewPath}/index.html`);
          const html = htmlStream.toString();
          resolve(html);
        });
      });
    }
    return new Promise((resolve, reject) => {
      fs.readFile(`${viewPath}/index.html`, 'utf8', (err, htmlData) => {
        if (err) {
          reject(err);
        } else {
          resolve(htmlData);
        }
      });
    });
  }
}

module.exports = TVReact;
