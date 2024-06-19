import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as cloudfrontOrigins from 'aws-cdk-lib/aws-cloudfront-origins';
import { aws_certificatemanager as acm } from 'aws-cdk-lib';
// import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';

export class CraddockConnectionStack extends cdk.Stack {
  private cfnOutCloudFrontUrl: cdk.CfnOutput;

  private cfnOutDistributionId: cdk.CfnOutput;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const certificatArn = 'arn:aws:acm:us-east-1:648035311088:certificate/884a2a78-fc1b-44e3-ad6b-0cc389e5e7fb';
    const certificate = acm.Certificate.fromCertificateArn(this, 'Certificate', certificatArn);

    const siteBucket = new s3.Bucket(this, 'SiteBucket', {
      bucketName: 'craddock-connection',
      websiteIndexDocument: 'index.html',
      publicReadAccess: false,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    const distribution = new cloudfront.Distribution(this, 'CraddockConnectionDistribution', {
      domainNames: ['craddock.org', 'www.craddock.org'],
      defaultBehavior: {
        allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
        compress: true,
        origin: new cloudfrontOrigins.HttpOrigin(siteBucket.bucketWebsiteDomainName, {
          protocolPolicy: cloudfront.OriginProtocolPolicy.HTTP_ONLY,
          httpPort: 80,
          httpsPort: 443
        }),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
      certificate: certificate,
      defaultRootObject: 'index.html',
      errorResponses: [
        {
          httpStatus: 403,
          responseHttpStatus: 403,
          responsePagePath: "/error.html",
          ttl: cdk.Duration.minutes(30),
        }
      ],
      minimumProtocolVersion: cloudfront.SecurityPolicyProtocol.TLS_V1_2_2019,
    });

    // new s3deploy.BucketDeployment(this, 'CraddockConnectionBucketDeployment', {
    //   sources: [s3deploy.Source.asset('../dist')],
    //   destinationBucket: siteBucket,
    //   distribution: distribution,
    //   distributionPaths: ['/*'],
    // });

    this.cfnOutCloudFrontUrl = new cdk.CfnOutput(this, "CfnOutCloudFrontUrl", {
      value: `https://${distribution.distributionDomainName}`,
      description: "The CloudFront URL",
    });

    this.cfnOutDistributionId = new cdk.CfnOutput(this, "CfnOutDistributionId", {
      value: distribution.distributionId,
      description: "CloudFront Distribution Id",
    });
  }
}
