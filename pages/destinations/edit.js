import DestinationForm from "@/components/Form/DestinationForm";
import Layout from "@/components/Layout";
import { useQuery } from "@apollo/client";
import { GET_DESTINATION_ID } from "gql/schema/destinations";
import { useRouter } from "next/router";

export default function Edit() {
  const router = useRouter();
  const { id } = router.query;

  const { loading, error, data } = useQuery(GET_DESTINATION_ID, {
    variables: { destinationIdId: id },
  });

  return (
    <Layout title="Create destination">
      <DestinationForm props={data?.destinationId} />
    </Layout>
  );
}
