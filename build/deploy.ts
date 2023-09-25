/* ---------- External ---------- */
import chalk from 'chalk';
import { prompt } from 'enquirer';

/* ---------- Helpers ---------- */
import { handle_cmd_interaction } from '__utils/handle-cmd-interaction';

/* ---------- Logs helpers ---------- */
const info_log = chalk.bold.blueBright;

/* ---------- Interfaces ---------- */
interface Environment {
  action: string;
  aws_account: string;
  environment: string;
  stack: string;
}

/* ---------- Functions ---------- */
const deploy = async () => {
  let stack = '';

  /* ----------
   * Get the environment input from
   * the user
   * ---------- */
  const environment: Environment = await prompt([
    {
      choices: ['deploy', 'diff', 'destroy', 'synth'],
      message: 'What do you want to do?',
      name: 'action',
      type: 'select',
    },
    {
      choices: ['production'],
      message: 'What environment do you want to deploy?',
      name: 'environment',
      type: 'select',
    },
    {
      choices: [{ name: 'main', value: 'main', message: 'Main stack' }],
      message: 'What stacks do you want to deploy?',
      name: 'stack',
      type: 'select',
    },
    {
      message: 'What is your AWS account name?',
      name: 'aws_account',
      type: 'text',
    },
  ]);

  /* ----------
   * Check if the user wants to deploy
   * all stacks or just one
   * ---------- */
  switch (environment.stack) {
    case 'main':
      stack += 'MAIN';
      break;

    default:
      break;
  }

  /* ----------
   * Check which environment the user
   * wants to deploy
   * ---------- */
  switch (environment.environment) {
    case 'production':
      stack += '-PROD';
      break;

    default:
      break;
  }

  /* ----------
   * If no stack is selected, exit the function
   * ---------- */
  if (!stack) throw new Error('Please select a stack to deploy');

  let command = '';

  if (environment.action === 'diff')
    command = `cdk diff --all -c choice=${stack} --profile ${environment.aws_account}`;
  else if (environment.action === 'destroy') {
    command = `cdk destroy --all -c choice=${stack} --profile ${environment.aws_account} --require-approval never`;

    console.log(
      info_log(
        `\n\nDestroying ${environment.stack} stack in ${environment.environment} environment...`,
      ),
    );
  } else if (environment.action === 'synth') {
    command = `cdk synth --all -c choice=${stack} --profile ${environment.aws_account} --require-approval never `;

    console.log(
      info_log(
        `\n\nSynthesizing ${environment.stack} stack in ${environment.environment} environment...`,
      ),
    );
  } else {
    command = `cdk deploy --all -c choice=${stack} --profile ${environment.aws_account} --require-approval never`;

    console.log(
      info_log(
        `\n\nDeploying ${environment.stack} stack in ${environment.environment} environment...`,
      ),
    );
  }

  handle_cmd_interaction(
    command,
    'Stack deployed successfully!',
    'Failed to deploy stack, please check your credentials.',
  );
};

deploy();
