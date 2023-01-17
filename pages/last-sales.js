import { useEffect, useState } from "react";

function LastSalesPage() {
  const [sales, setSales] = useState();
  const [isLoading, setIsLoading] = useState();
  useEffect(() => {
    setIsLoading(true);
    fetch(
      "https://nextjs-study-57cf3-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json"
    )
      .then((response) => response.json())
      .then((data) => {
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
        setSales(transformedSales);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!sales) {
    return <p>No data yet</p>;
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

export default LastSalesPage;
