#!/usr/bin/env node
/* ---------- External ---------- */
import 'source-map-support/register';
import { App } from 'aws-cdk-lib';
import { config } from 'dotenv';

/* ---------- Utils ---------- */
import { handle_environment_by_choice } from '__utils/handle-environment-by-choice';

/* ---------- Builders ---------- */

import { build_and_deploy_main_stack } from '__build/stacks/main-stack';

/* ---------- Initial configuration ---------- */
config();

const app = new App();

const choice = app.node.tryGetContext('choice');

if (!choice) throw new Error('You need to choose a stack to build and deploy.');

const { environment } = handle_environment_by_choice(choice);

/* ----------
 *  Based on the choice, we build and deploy the stack.
 * ---------- */
const buildAndDeploy = async () => {
  if (choice.startsWith('MAIN')) {
    build_and_deploy_main_stack({ app, environment });
  }
};

buildAndDeploy();
