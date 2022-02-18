
import * as fs from "fs"
import * as archiver from 'archiver'

import { writeFile } from 'fs/promises';
//import epub from './index';
//import { contentAlice, optionsAlice } from './aliceData';

interface MetadataObject {
  title: string
}

/**
 * metadata
 */
export class Metadata {
  title: string;

  constructor(data: MetadataObject) {
    this.title = data.title
  }
}

/**
 * Equals the package element in Epub 3.2.
 */
export class Packdocument {
  metadata: Metadata;
  version: string;

  constructor(data: Metadata) {
    this.metadata = new Metadata(data)
    this.version = "3.0"
  }

  saveAsEpub() {
    let archive = archiver("zip", { zlib: { level: 9 } })
    let output = fs.createWriteStream('/mnt/d/Henry/packdir/oo.zip');
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

  async test() {
    //const content = await epub(optionsAlice, contentAlice);
    //await writeFile(`${__filename.slice(0, -3)}.epub`, Buffer.from(content));
    console.log('test 14 title:. ', this.metadata.title)
  }
}
