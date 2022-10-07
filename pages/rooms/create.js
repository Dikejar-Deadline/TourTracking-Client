import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
  TextInput,
  Text,
  Paper,
  Group,
  Button,
  Divider,
  Stack,
  NativeSelect,
  NumberInput,
} from '@mantine/core';
import Layout from '@/components/Layout'
import { DatePicker } from '@mantine/dates';
import { useGQLQuery } from 'hooks/useGQLQuery';
import { SET_ROOM } from 'gql/schema/rooms';
import { useGQLMutate } from 'hooks/useGQLMutate';

export default function AuthenticationForm(props) {
  const form = useForm({
    initialValues: {
      dropPoint: '',
      price: 0,
      accountNumber: 0,
      accountName: '',
      maxParticipant: 0,
      schedule: new Date(),
      duration: 0,
      destinationId: 1
    },
  });


  const data = {
    dropPoint: form.values.dropPoint,
    price: form.values.price,
    accountNumber: form.values.accountNumber,
    accountName: form.values.accountName,
    maxParticipant: form.values.maxParticipant,
    minParticipant: 2,
    schedule: form.values.schedule,
    duration: form.values.duration,
    destinationId: form.values.destinationId,
  }

  const { mutate, error } = useGQLMutate(SET_ROOM, data, ['rooms'])
  const handleCreate = (e) => {
    /* eslint-disable */
    e.preventDefault()
    mutate()
  }


  return (
    <Layout>
      <Paper radius="md" p="xl" withBorder {...props}>
        <Text size="xl" weight={700} align='center' color={'blue'}  >
          Create Room
        </Text>

        <Divider my="lg" />

        <form onSubmit={(e) => handleCreate(e)}>
          <Stack>
            <NativeSelect
              label="Destination"
              description="Select your journey"
              placeholder="Mandalika"
              required
              data={['Bali', 'Sumbawa']}
              value={form.values.destinationId}
              onChange={(event) => form.setFieldValue('destinationId', event.target?.value)}
            />

            <TextInput
              required
              label="Tempat Ketemuan"
              placeholder="Masjid KTC"
              value={form.values.dropPoint}
              onChange={(event) => form.setFieldValue('dropPoint', event.target?.value)}
            />

            <DatePicker
              label="Schedule"
              value={form.values.schedule}
              onChange={(event) => form.setFieldValue('schedule', event.target?.value)}
            />

            <NumberInput
              defaultValue={1}
              placeholder="Durasi Liburan"
              label="Durasi Liburan"
              description="Berapa hari?"
              required
              value={form.values.duration}
              onChange={(event) => form.setFieldValue('duration', event)}
            />

            <NumberInput
              defaultValue={1}
              placeholder="Max. Participants"
              label="Max. Participants"
              required
              value={form.values.maxParticipant}
              onChange={(event) => form.setFieldValue('maxParticipant', event)}
            />

            <NumberInput
              defaultValue={1}
              placeholder="Split Bill"
              label="Split Bill"
              required
              value={form.values.price}
              onChange={(event) => form.setFieldValue('price', event)}
            />

            <NumberInput
              defaultValue={1}
              placeholder="Nomor Rekening"
              label="Nomor Rekening"
              required
              value={form.values.accountNumber}
              onChange={(event) => form.setFieldValue('accountNumber', event)}
            />


            <TextInput
              required
              label="Rekening"
              description="a.n"
              placeholder="Lazarus"
              value={form.values.accountName}
              onChange={(event) => form.setFieldValue('accountName', event.target?.value)}
            />

          </Stack>

          <Group position="apart" mt="xl">
            <Button type="submit">Create Your Jorney</Button>
          </Group>
        </form>
      </Paper>
    </Layout >
  )
}
