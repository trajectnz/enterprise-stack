import Document, { Head, Main, NextScript } from 'next/document'
import { renderToSheetList } from 'fela-dom'
import getRenderer from '../styles/fela'

export default class MyDocument extends Document {
  static getInitialProps ({ renderPage, req }) {
    const page = renderPage()
    console.log(req.url)
    const renderer = getRenderer()

    const sheetList = renderToSheetList(renderer)
    renderer.clear()

    return {
      ...page,
      sheetList
    }
  }

  render () {
    const styleNodes = this.props.sheetList.map(({ type, media, css }) => (
      <style data-fela-type={type} media={media}>{css}</style>
    ))

    return (
      <html>
        <Head>
          <title>My page</title>
          {styleNodes}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
