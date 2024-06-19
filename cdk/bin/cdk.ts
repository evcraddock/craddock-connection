#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CraddockConnectionStack } from '../lib/cdk-stack';

const app = new cdk.App();
new CraddockConnectionStack(app, 'CraddockConnectionStack');
