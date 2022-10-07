import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
} from '@mantine/core';
// import { GoogleButton, TwitterButton } from '../SocialButtons/SocialButtons'
import Layout from '@/components/Layout'
import { IconBrandGoogle } from '@tabler/icons'
import { GET_LOGIN, GET_REGISTER } from 'gql/schema';
import { useGQLMutate } from 'hooks/useGQLMutate';

export default function AuthenticationForm(props) {
  const [type, toggle] = useToggle(['login', 'register']);
  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
    },
  });


  const variables = {
    email: form.values.email,
    username: form.values.name,
    password: form.values.password,
    terms: form.values.terms,
  }


  const { mutate: login, error: errLogin } = useGQLMutate(GET_LOGIN, variables, ['login'])
  const { mutate: register, error: errRegis } = useGQLMutate(GET_REGISTER, variables, ['register'])
  const handleSubmit = (e) => {
    /* eslint-disable */
    e.preventDefault()
    type == 'login' && login()
    type == 'register' && register()
  }

  return (
    <Layout>
      <Paper radius="md" p="xl" withBorder {...props}>
        <Text size="xl" weight={700} align='center' color={'blue'}  >
          Welcome to TourTracking, {type} with
        </Text>

        <Group grow mb="md" mt="md">
          <IconBrandGoogle radius="xl">Google</IconBrandGoogle>
        </Group>

        <Divider label="Or continue with email" labelPosition="center" my="lg" />

        <form onSubmit={(e) => handleSubmit(e)}>
          <Stack>
            {type === 'register' && (
              <TextInput
                label="Name"
                placeholder="Your name"
                value={form.values.name}
                onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
              />
            )}

            <TextInput
              required
              label="Email"
              placeholder="hello@mantine.dev"
              value={form.values.email}
              onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
              error={form.errors.email && 'Invalid email'}
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
              error={form.errors.password && 'Password should include at least 6 characters'}
            />

            {type === 'register' && (
              <Checkbox
                label="I accept terms and conditions"
                checked={form.values.terms}
                onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
              />
            )}
          </Stack>

          <Group position="apart" mt="xl">
            <Anchor
              component="button"
              type="button"
              color="dimmed"
              onClick={() => toggle()}
              size="xs"
            >
              {type === 'register'
                ? 'Already have an account? Login'
                : "Don't have an account? Register"}
            </Anchor>
            <Button type="submit">{upperFirst(type)}</Button>
          </Group>
        </form>
      </Paper>
    </Layout>
  )
}
