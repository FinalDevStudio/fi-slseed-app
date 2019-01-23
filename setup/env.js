/**
 * Env setup script.
 *
 * @example $ npm run env
 *
 * @module configs/env
 */

const AWS = require('aws-sdk');
const path = require('path');
const ora = require('ora');
const fs = require('fs');

const { apiVersions, region } = require('../configs/aws');
const ssmEnv = require('../configs/ssm.env');
const pkg = require('../package.json');

(async () => {
  try {
    // Set proper stage ENV
    await require('../utils/stage-select')(true);

    let env = `VUE_APP_ENV=${process.env.NODE_ENV}`;

    for (let key of Object.keys(pkg.app)) {
      const name = key.toUpperCase().replace(/[^A-Z]+/g, '_');
      env += `\nVUE_APP_${name}=${pkg.app[key]}`;
    }

    AWS.config.update({
      apiVersions,
      region
    });

    const ssm = new AWS.SSM();

    const spinner = ora();

    spinner.start(`Setting env for [${process.env.NODE_ENV}]...`);

    const promises = [];

    for (let ssmPath of ssmEnv) {
      const promise = new Promise((resolve, reject) => {
        const params = {
          Name: path.join('/', pkg.name, process.env.NODE_ENV, ssmPath),
          WithDecryption: true
        };

        ssm.getParameter(params, (err, data) => {
          if (err) {
            spinner.fail(`${err.code}: ${params.Name}`);
            reject();
            return;
          }

          const name = ssmPath.toUpperCase().replace(/[^A-Z]+/g, '_');

          spinner.info(`${name}=[ssm:${data.Parameter.Name}]`);

          env += `\nVUE_APP_${name}=${data.Parameter.Value}`;

          resolve();
        });
      });

      promises.push(promise);
    }

    await Promise.all(promises);

    fs.writeFileSync(`.env.${process.env.NODE_ENV}.local`, env, 'utf8');

    spinner.succeed('Env file saved!');

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
