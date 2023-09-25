/* ---------- External ---------- */
import { Cors, DomainName, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';

/* ---------- Types ---------- */
import { CfnOutput } from 'aws-cdk-lib';

/* ---------- Interfaces ---------- */
interface Props {
  environment: string;
}

export class RestAPIConstruct extends Construct {
  public readonly rest_api: RestApi;

  public readonly domain_name: DomainName;

  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id);

    this.rest_api = new RestApi(scope, `RestAPI-${props.environment}`, {
      defaultCorsPreflightOptions: {
        allowOrigins: Cors.ALL_ORIGINS,
        allowMethods: Cors.ALL_METHODS,
        allowHeaders: ['*'],
        exposeHeaders: ['*'],
      },
    });

    new CfnOutput(this, 'RestAPI', {
      value: this.rest_api.url,
    });
  }
}
