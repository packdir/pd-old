/**
 * Customize marked.
 */

import { marked } from 'marked'

/**
 * Override image renderer.
 */

const renderer = {

  image(href: string, title: string, text: string) {
    console.log('IN huhu: ', href)
    console.log('---------------------05-')
    href = 'file:///mnt/d/Henry/packdir/pd/alice.jpg'
    //href = cleanUrl(this.options.sanitize, this.options.baseUrl, href);
    if (href === null) {
      return text
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

