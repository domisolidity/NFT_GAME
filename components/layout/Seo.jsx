import Head from "next/head";

export default function Seo({ title }) {
  return (
    <Head>
      <title>Doremi Games | {title.length == 0 ? "main" : title} </title>
    </Head>
  );
}
