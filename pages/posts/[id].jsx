import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Head from "next/head";
import Date from "../../components/date";
import utilStyles from "../../styles/utils.module.css";

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <br />
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}

// ビルド時にプリレンダリングするファイルをまとめて取得する
export async function getStaticPaths() {
  const paths = await getAllPostIds();
  console.log(paths)
  // ここのidはファイルのパス名と一致している必要がある
  // [ { params: { id: 'pre-rendering' } }, { params: { id: 'ssg-ssr' } } ]
  // すべての記事の名前（id）を配列で取得している
  return {
    paths,
    fallback: false,
  };
}

// 各記事のidを受け取り、それをもとに記事のデータを取得している、そしてそのデータを上のコンポーネントのpropsに渡している（たぶん）
export async function getStaticProps({ params }) {
  // 開いたページに対するid（ファイル名）をparamsとして受け取っている
  const postData = await getPostData(params.id);
  console.log(postData);
  return {
    props: {
      postData,
    },
  };
}
