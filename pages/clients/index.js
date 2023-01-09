import Link from "next/link";

function ClientsPage() {
  const clients = [
    { id: "kyahn", name: "kyahn" },
    { id: "test", name: "test" },
  ];

  return (
    <div>
      <h1>The Clients Page</h1>
      <ul>
        {/* <li>
          <Link href="/clients/kyahn">kyahn</Link>
        </li>
        <li>
          <Link href="/clients/test">test</Link>
        </li> */}
        {clients.map((client) => (
          <li key={client.id}>
            <Link
              href={{
                pathname: "/clients/[id]",
                query: { id: client.id },
              }}
            >
              {client.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ClientsPage;
