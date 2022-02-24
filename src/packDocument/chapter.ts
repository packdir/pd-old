
class Chapter {
  title: string
  content: string = ''

  constructor(title?: string) {
    if (title) {
      this.title = title
    } else {
      this.title = ''
    }
  }
}

export { Chapter }
