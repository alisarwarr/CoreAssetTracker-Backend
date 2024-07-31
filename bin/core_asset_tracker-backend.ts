#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CoreAssetTrackerBackendStack } from '../lib/core_asset_tracker-backend-stack';


const app = new cdk.App();
new CoreAssetTrackerBackendStack(app, 'CoreAssetTrackerBackendStack', {});