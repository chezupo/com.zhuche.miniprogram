const htmlStringConvert = (html: string): string => {
  html = html.split('&nbsp;').join(' ')
  html = html.split('&quot;').join('"')

  return html
}

export {htmlStringConvert}
