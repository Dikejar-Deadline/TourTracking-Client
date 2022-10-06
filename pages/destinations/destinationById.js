import Layout from "@/components/Layout";
import { useQuery } from "@apollo/client";
import { GET_DESTINATION_ID } from "gql/schema/destinations";
import { useRouter } from "next/router";

export default function DestinationById() {
  const router = useRouter();
  const { id } = router.query;

  const { loading, error, data } = useQuery(GET_DESTINATION_ID, {
    variables: { destinationIdId: id },
  });

  return (
    <Layout title="Destination detail">
      {loading && <p>Loading...</p>}
      {error && <p>Something error...</p>}
      {data && (
        <>
          <p>{data.destinationId.name}</p>
          <p>List room berdasarkan destinasi - List dapat di click</p>
          <ul>
            {data.destinationId.Rooms.map((room, index) => {
              return (
                <li
                  key={index}
                  onClick={() => {
                    router.push({
                      pathname: "rooms",
                      query: { id: room.id },
                    });
                  }}
                >
                  {room.accountName}
                </li>
              );
            })}
          </ul>
        </>
      )}
    </Layout>
  );
}
