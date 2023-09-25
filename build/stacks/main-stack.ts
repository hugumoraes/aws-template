/* ---------- External ---------- */
import { App } from 'aws-cdk-lib/core';

/* ---------- Stacks ---------- */
import { MainStack } from '_stacks/main';

/* ---------- Types ---------- */
type Environment = 'PROD';

interface Build {
  app: App;
  environment: Environment;
}

/* ---------- Functions ---------- */
const build_and_deploy_main_stack = ({ app, environment }: Build) => {
  new MainStack(app, `${environment}-MainStack`, {
    environment,
    stackName: `${environment}-MainStack`,
    env: {
      account: process.env.CDK_DEFAULT_ACCOUNT,
      region: process.env.CDK_DEFAULT_REGION,
    },
  });
};

export { build_and_deploy_main_stack };
