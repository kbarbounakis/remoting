const {addAliases} = require('module-alias');
const path = require('path');
addAliases({
    '@themost/remoting/platform-server': path.resolve(process.cwd(), 'platform-server/src/index'),
    '@themost/remoting': path.resolve(process.cwd(), 'src/index')
});