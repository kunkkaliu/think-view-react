
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
    if (isDev) {
      return new Promise((resolve) => {
				process.send({
					action: 'event_file_read',
					filename: this.viewFile,
				});
				process.on('message', (data) => {
					if (data.action === 'event_file_read_done') {
						const html = data.content;
						resolve(html);
					}
				});
			});
    }
    return new Promise((resolve, reject) => {
			fs.readFile(this.viewFile, 'utf8', (err, htmlData) => {
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
