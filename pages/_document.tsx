import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/fm-favicon.png" />

        <meta property="og:title" content="FM TODO"></meta>
        <meta property="og:type" content="website"></meta>
        <meta property="og:description" content="FM Taskly App"></meta>
        <meta property="og:url" content="https://fm-project.vercel.app/"></meta>
        <meta property="og:image" content="/img_todo.jpg"></meta>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
