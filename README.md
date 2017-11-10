# html-webpack-sitemap-plugin

[![NPM](https://nodei.co/npm/html-webpack-sitemap-plugin.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/html-webpack-plugin/)

Installation
------------
Install the plugin with npm:
```shell
$ npm install html-webpack-sitemap-plugin --save-dev
```

Basic Usage
-----------

```javascript
var HtmlWebpackSitemapPlugin = require('html-webpack-sitemap-plugin');
var Paths = [{
                loc: '/',
                priority: '0.8',
                lastmod: '2017-10-20',
                changeFreq: 'daily'
              },
              {
                loc: '/about',
                priority: '0.8',
                lastmod: '2017-10-20',
                changeFreq: 'weekly'
              }]

var webpackConfig = {
  entry: 'index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'index_bundle.js'
  },
  plugins: [
    new HtmlWebpackSitemapPlugin('https://voorraad.co.za', {
      urls: Paths
    }
  ]
};
```
