/**
 * Customize marked.
 */

import path from 'path'
import _ from "lodash"
import { marked } from 'marked'

/**
 * Override image renderer for local images.
 */
const renderer = {
  image(href: string, title: string, text: string) {
    //href = cleanUrl(this.options.sanitize, this.options.baseUrl, href);
    if (href === null) {
      return text
    }

    const currentFilePath = global.currentFilePath

    if (!_.startsWith(href, "http://") && !_.startsWith(href, "https://")) {
      // Local image
      const filepath = path.join(process.cwd(), currentFilePath, href)
      href = `file://${filepath}`
    }

    let out = '<img src="' + href + '" alt="' + text + '"'
    if (title) {
      out += ' title="' + title + '"';
    }
    out += '/>'
    return out
  }
}

marked.use({ renderer })

export { marked as pdMarked }
