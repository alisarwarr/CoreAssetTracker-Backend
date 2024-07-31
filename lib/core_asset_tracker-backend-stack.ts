import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
//COGNITO
import * as cognito from 'aws-cdk-lib/aws-cognito';



export class CoreAssetTrackerBackendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);




    //*****************************COGNTIO**********************************/
    //creating userpool
    const userPool = new cognito.UserPool(this, 'coreAssetTracker-userPool', {
      //user can sigin with 'email' ( can also include username, phone, preferredUsername )
      signInAliases: {
        email: true
      },


      //defining policies for 'password' ( default policies are all true )
      passwordPolicy: {
        minLength: 8,
        requireLowercase: true,
        requireUppercase: true,
        requireDigits: true,
        requireSymbols: true
      },


      //allow users for 'signup' to create account ( so not only administrator makes account )
      selfSignUpEnabled: true,


      //user can recover account with 'email' only ( can also include PHONE_ONLY, PHONE_AND_EMAIL, etc )
      accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,


      //verification while creating an account using 'email' by sending a verification link ( can also add phone )
      autoVerify: {
        email: true
      },


      //customize your 'email' verification message ( can also add phone )
      userVerification: {
        emailStyle: cognito.VerificationEmailStyle.LINK
      },


      //extra attributes to save
      standardAttributes: {
        givenName: {    /*firstName*/
          required: true,
          mutable: true,
        },
        familyName: {   /*lastName*/
          required: true,
          mutable: true
        },
        email: {        /*email*/
          required: true,
          mutable: true
        },
        phoneNumber: {  /*phone*/
          required: true,
          mutable: true
        }
      }
    });


    //creating 'Client' for connect COGNITO with frontend
    const userPoolClient = new cognito.UserPoolClient(this, 'coreAssetTracker-userPoolClient', {
      userPool
    });


    //send by userpool
    new cdk.CfnOutput(this, 'coreAssetTracker-userPoolId', {
      value: userPool.userPoolId
    });


    //send by userpool
    new cdk.CfnOutput(this, 'coreAssetTracker-userPoolClientId', {
      value: userPoolClient.userPoolClientId
    });


    //create a domain name for the userpool
    const domain = userPool.addDomain('coreAssetTracker-domain', {
      cognitoDomain: {
        //this will create a domain like https://core-asset-tracker.<region>.amazoncognito.com
        domainPrefix: "core-asset-tracker"
      },
    });


    //send by userpool
    new cdk.CfnOutput(this, 'coreAssetTracker-domainName', {
      value: domain.domainName
    });
    //*****************************COGNTIO**********************************/
  }
}