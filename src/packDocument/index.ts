
//import * as fs from "fs"
import archiver from 'archiver'

import { writeFile, readdir, readFile, stat, mkdir } from 'fs/promises';
import { createWriteStream } from 'fs'
import { marked } from 'marked'
//import { join, basename } from 'path'

// From epub-gen-memory
import {
  Chapter, chapterDefaults, Content, Font, Image, NormChapter, NormOptions,
  Options, optionsDefaults, optionsPredicate, retryFetch, type, uuid,
  validateAndNormalizeChapters, validateAndNormalizeOptions }
  from '../lib/util';

interface MetadataObject {
  title: string
}


/**
 * metadata
 */
export class Metadata {
  title: string;

  constructor(data?: MetadataObject) {
    if (data) {
      this.title = data.title
    } else {
      this.title = '<null>'
    }
  }
}

/**
 * Equals the package element in Epub 3.2.
 */
export class Packdocument {
  metadata: Metadata;
  version: string;

  constructor(data?: Metadata | string, content?: Content) {
    if (typeof data == 'string') {
      this.metadata = this.constructWithMarkdownFile(data)
    } else if (data instanceof Metadata) {
      this.metadata = new Metadata(data)
    } else { // undefined
      this.metadata = this.constructWithMarkdownFile()
    }
    this.version = "3.0"
  }

  static async generateFromPath(): Promise<[string, Chapter[]]> {
    //let html = ''
    let htmls: Chapter[] = []
    let docTitle = ''

    try {
      // Get config
      const rawconfig = await readFile(`./packdir.json`, { encoding: 'utf-8' })
      const config = JSON.parse(rawconfig)
      docTitle = config.documentName
      for (const file of config.content) {
        const content = await readFile(`./${file}`, { encoding: 'utf-8' })
        htmls.push({
          title: docTitle,
          content: marked(content)
        })
      }

      // path to the book
      //const pathname = basename(process.cwd())
      //const pathbook = `.packdir/epubs/${pathname}`
      //stat(pathbook).catch(async (err) => {
      //  if (err.code === 'ENOENT') { // Directory is not existing
      //    await mkdir(pathbook, { recursive: true })
      //  }
      //})

      //const files = await readdir('./')
      //for (const file of files) {
      //  if ('.md' === file.substring(file.length - 3).toLowerCase()) {
      //    const content = await readFile(`./${file}`, { encoding: 'utf-8' })
      //    html = marked(content)
      //  }
      //}
    } catch (err) {
      console.log('Error to read dir. ', err)
    }

    return [docTitle, htmls]
  }

  private constructWithMarkdownFile(pathname?: string) {
    console.log('pathname: ', pathname)
    let metadata: Metadata = new Metadata()
    if (pathname) {
      //metadata = new Metadata()
    } else {
      // Load current directory
    }
    return metadata
  }

  saveAsEpub() {
    let archive = archiver("zip", { zlib: { level: 9 } })
    let output = createWriteStream('/mnt/d/Henry/packdir/oo.zip');
    archive.pipe(output)
    //  if (self.options.verbose) {
    //    console.log("Zipping temp dir to", self.options.output);
    //  }

    // mimetype
    archive.append("application/epub+zip", {
      store: true,
      name: "mimetype"
    })

    archive.file('/mnt/d/Henry/packdir/md-contents/epub/content.opf', { name: 'content.opf'})
    archive.file('/mnt/d/Henry/packdir/md-contents/epub/page_style.css', { name: 'page_style.css'})
    archive.file('/mnt/d/Henry/packdir/md-contents/epub/stylesheet.css', { name: 'stylesheet.css'})
    archive.file('/mnt/d/Henry/packdir/md-contents/epub/toc.ncx', { name: 'toc.ncx'})
    archive.directory('/mnt/d/Henry/packdir/md-contents/epub/META-INF', 'META-INF')
    archive.directory('/mnt/d/Henry/packdir/md-contents/epub/OEBPS', 'OEBPS')

    console.log('生成zip new')
    archive.finalize()
  }

}
