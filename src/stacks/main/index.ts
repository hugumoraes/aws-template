/* ---------- External ---------- */
import { Construct } from 'constructs';
import { Stack, StackProps } from 'aws-cdk-lib';

/* ---------- Constructs ---------- */
import { IAMConstruct } from '_constructs/IAM';
import { RestAPIConstruct } from '_constructs/RestAPI';

interface Props extends StackProps {
  environment: string;
}

export class MainStack extends Stack {

  public readonly iam_construct: IAMConstruct;

  public readonly rest_api_construct: RestAPIConstruct;

  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id, props);

    // this.iam_construct = new IAMConstruct(
    //   this,
    //   `T22-IAM-Construct-${props.environment}`,
    //   {
    //     environment: props.environment,
    //   },
    // );

    // this.rest_api_construct = new RestAPIConstruct(
    //   this,
    //   `T22-RestAPI-Construct-${props.environment}`,
    //   {
    //     environment: props.environment,
    //   },
    // );
  }
}
