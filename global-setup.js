// global-setup.js
module.exports = async config => {
    process.env.FOO = 'some data';
    // Or a more complicated data structure as JSON:
    process.env.BAR = JSON.stringify({ some: 'data' });
    process.env.BASE_URL = 'https://stock-chart-app-git-develop-sa10shi.vercel.app'
  };