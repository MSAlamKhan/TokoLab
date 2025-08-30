import { Octokit } from '@octokit/core';
import Config from 'react-native-config';

export default new Octokit({ auth: Config.Git_Access_Token });
