// eslint-disable-next-line no-shadow
enum Environment {
  production = 'PROD',
}

type Stack = {
  environment: Environment;
};

export const handle_environment_by_choice = (choice?: string): Stack => {
  if (!choice) throw new Error('Stack choice not defined');

  switch (choice) {
    case 'MAIN-PROD':
      return { environment: Environment.production };

    default:
      throw new Error(`Stack choice "${choice}" is not allowed`);
  }
};
