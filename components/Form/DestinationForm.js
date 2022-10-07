import { useMutation } from "@apollo/client";
import { Box, Button, Group, Textarea, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useLocalStorage } from "@mantine/hooks";
import {
  CREATE_DESTINATION,
  EDIT_DESTINATION,
  GET_DESTINATIONS,
} from "gql/schema/destinations";
import { useEffect } from "react";

export default function DestinationForm({ props = null }) {
  const token = useLocalStorage({ key: "access_token" });
  const [createDestination, { data, loading, error }] = useMutation(
    CREATE_DESTINATION,
    {
      refetchQueries: [{ query: GET_DESTINATIONS }],
      context: {
        headers: {
          Authorization: token ? token : "",
        },
      },
    }
  );
  const [
    editDestination,
    { data: dataEdit, loading: loadingEdit, error: errorEdit },
  ] = useMutation(EDIT_DESTINATION, {
    refetchQueries: [{ query: GET_DESTINATIONS }],
    context: {
      headers: {
        authorization: token ? token : "",
      },
    },
  });

  const form = useForm({
    initialValues: {
      name: "",
      imgUrl: "",
      description: "",
    },

    validate: {
      name: (value) => value === "" && "Name is required",
      imgUrl: (value) => value === "" && "Image URL is required",
      description: (value) => value === "" && "Description is required",
    },
  });

  useEffect(() => {
    if (props) {
      form.setFieldValue("name", props.name);
      form.setFieldValue("imgUrl", props.imgUrl);
      form.setFieldValue("description", props.description);
    }
  }, [props]);

  return (
    <Box sx={{ minWidth: 300 }} mx="auto">
      <Title>Create destination</Title>
      <form
        onSubmit={form.onSubmit((values) => {
          const variables = {
            name: values.name,
            description: values.description,
            imgUrl: values.imgUrl,
          };
          props
            ? editDestination({
                variables: {
                  ...variables,
                  editDestinationId: props.id,
                },
              })
            : createDestination({
                variables,
              });
          alert("Redirect belum di atur");
        })}
      >
        <TextInput
          withAsterisk
          label="Name"
          autoComplete="off"
          {...form.getInputProps("name")}
        />
        <TextInput
          withAsterisk
          label="imgUrl"
          autoComplete="off"
          {...form.getInputProps("imgUrl")}
        />
        <Textarea
          withAsterisk
          label="Destination"
          {...form.getInputProps("description")}
        />
        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
}
