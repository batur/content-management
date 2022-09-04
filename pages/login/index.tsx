import {Box, Container} from '@mui/material';
import {LoginForm} from 'components';
import {NextPage} from 'next';

const Login: NextPage = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex'
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          minHeight: '100vh',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          flexGrow: 1
        }}
      >
        <LoginForm />
      </Container>
    </Box>
  );
};

export default Login;
