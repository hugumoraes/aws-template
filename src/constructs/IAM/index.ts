/* ---------- External ---------- */
import {
  ManagedPolicy,
  PolicyStatement,
  Role,
  ServicePrincipal,
} from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

/* ---------- Interfaces ---------- */
interface Props {
  environment: string;
}

interface Roles {
  default: Role;
}

interface Policies {
  cognito: PolicyStatement;
  dynamodb: PolicyStatement;
  timestream: PolicyStatement;
}

export class IAMConstruct extends Construct {
  public readonly policies: Policies;

  public readonly roles: Roles;

  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id);

    this.roles = {
      default: new Role(scope, `IAM-Role-${props.environment}`, {
        assumedBy: new ServicePrincipal('lambda.amazonaws.com'),
        description: `IAM Role for Lambda functions in the ${props.environment} environment.`,
        managedPolicies: [
          ManagedPolicy.fromAwsManagedPolicyName(
            'service-role/AWSLambdaVPCAccessExecutionRole',
          ),
          ManagedPolicy.fromAwsManagedPolicyName(
            'service-role/AWSLambdaBasicExecutionRole',
          ),
        ],
      }),
    };

    this.policies = {
      dynamodb: new PolicyStatement({
        actions: ['dynamodb:*'],
        resources: ['*'],
      }),
      timestream: new PolicyStatement({
        actions: ['timestream:*'],
        resources: ['*'],
      }),
      cognito: new PolicyStatement({
        actions: ['cognito-idp:*'],
        resources: ['*'],
      }),
    };
  }
}
