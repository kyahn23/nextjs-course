import path from "path";
import fs from "fs/promises";

import { Fragment } from "react";

function ProductDetailPage(props) {
  console.log("props", props);
  const { loadeadProduct } = props;

  // getStaticPaths fallback : true 일 경우 사전렌더링이 안일어 날 경우를 대비
  if (!loadeadProduct) {
    return <p>Loading...</p>;
  }

  // getStaticPaths fallback : 'blocking' 시 서버에 렌더링이 생성될 때까지 nextjs가 기다림
  return (
    <Fragment>
      <h1>{loadeadProduct.title}</h1>
      <p>{loadeadProduct.description}</p>
    </Fragment>
  );
}

async function getData() {
  const filePath = path.join(process.cwd(), "data", "dummy.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  return data;
}

export async function getStaticProps(context) {
  const { params } = context;
  const productId = params.pid;

  const data = await getData();

  const product = data.products.find((product) => product.id === productId);

  // fetching 할 데이터가 없을 경우 notFound 화면 적용
  if (!product) {
    return {
      notFound: true,
    };
  }

  console.log(product);
  return {
    props: {
      loadeadProduct: product,
    },
  };
}

export async function getStaticPaths() {
  const data = await getData();

  const ids = data.products.map((product) => product.id);

  const pathsWithParams = ids.map((id) => ({ params: { pid: id } }));

  return {
    paths: pathsWithParams,
    fallback: true,
  };
}

export default ProductDetailPage;
