import { useEffect, useState } from "react";
import useSWR from "swr";

function LastSalesPage(props) {
  const [sales, setSales] = useState(props.sales);
  //   const [isLoading, setIsLoading] = useState();

  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR(
    "https://nextjs-study-57cf3-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json",
    fetcher
  );

  useEffect(() => {
    if (data) {
      const transformedSales = [];
      for (const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }
      setSales(transformedSales);
    }
  }, [data]);

  //   useEffect(() => {
  //     setIsLoading(true);
  //     fetch(
  //       "https://nextjs-study-57cf3-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json"
  //     )
  //       .then((response) => response.json())
  //       .then((data) => {
  //         const transformedSales = [];
  //         for (const key in data) {
  //           if (Object.hasOwnProperty.call(data, key)) {
  //             transformedSales.push({
  //               id: key,
  //               username: data[key].username,
  //               volume: data[key].volume,
  //             });
  //           }
  //         }
  //         setSales(transformedSales);
  //         setIsLoading(false);
  //       });
  //   }, []);

  if (!sales && !data) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Failed to load.</p>;
  }

  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.username} - ${sale.volume}
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  const response = await fetch(
    "https://nextjs-study-57cf3-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json"
  );
  const data = await response.json();
  const transformedSales = [];
  for (const key in data) {
    if (Object.hasOwnProperty.call(data, key)) {
      transformedSales.push({
        id: key,
        username: data[key].username,
        volume: data[key].volume,
      });
    }
  }

  return { props: { sales: transformedSales } };
}

export default LastSalesPage;
