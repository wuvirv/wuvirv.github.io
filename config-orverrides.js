const path = require('path');
const paths = require('react-scripts/config/paths')

module.exports = function override(config, env) {
  //do stuff with the webpack config...

  paths.appBuild = path.json(path.dirname(paths.appBuild), 'docs')

  config.output.path = path.join(path.dirname(config.output.path), 'docs')

  return config
}