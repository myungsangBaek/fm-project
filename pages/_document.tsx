import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";
import { ServerStyleSheet } from "styled-components";

class MyDocument extends Document {
  static async getInitialProps(context: DocumentContext) {
    const sheet = new ServerStyleSheet();
    try {
      context.renderPage(
        (App) => (props) => sheet.collectStyles(<App {...props} />)
      );
      const initialProps = await Document.getInitialProps(context);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/fm-favicon.png" />
          <meta property="og:title" content="FM TODO"></meta>
          <meta property="og:type" content="website"></meta>
          <meta property="og:description" content="FM Taskly App"></meta>
          <meta
            property="og:url"
            content="https://fm-project.vercel.app/"
          ></meta>
          <meta property="og:image" content="/img_todo.jpg"></meta>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
export default MyDocument;
