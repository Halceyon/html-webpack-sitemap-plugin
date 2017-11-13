var Mustache = require('mustache');
var merge = require('lodash.merge');
var url = require('url');
var timestamp = new Date().toJSON().substring(0, 'YYYY-MM-DD'.length);
var tpl = require('fs').readFileSync(require('path').resolve(__dirname, './sitemap.xml.tpl'), {
  encoding: 'utf8'
});

function filterAssets(asset) {
  return asset.endsWith('.html') || asset.endsWith('.htm');
}

function loc(base, asset) {
  if (asset === 'index.html' || asset === 'index.htm') {
    return base;
  }
  return url.resolve(base, asset.replace('.html', '').replace('.htm', ''));
}

function priority(asset) {
  if (asset === 'index.html' || asset === 'index.htm') {
    return 1;
  }
  return 0.5;
}

function lastmod(asset) {
  return timestamp;
}

function changefreq(asset) {
  return 'daily';
}

function HtmlWebpackSitemapPlugin(base, options, filename) {
  this.base = base;
  this.options = merge({
    filterAssets: filterAssets,
    loc: loc,
    urls: [],
    priority: priority,
    lastmod: lastmod,
    changefreq: changefreq
  }, options || {});
  this.filename = filename || 'sitemap.xml';
}

HtmlWebpackSitemapPlugin.prototype.apply = function(compiler) {
  var output = '', self = this;
  compiler.plugin('compilation', function(compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function(data, cb) {
      var output = Mustache.render(tpl, {
        urls: Object.keys(compilation.assets).filter(self.options.filterAssets).concat(self.options.urls).map(function(asset) {
          return asset;
        })
      });
      compilation.assets[self.filename] = {
        source: function() {
          return output;
        },
        size: function() {
          return output.length;
        }
      };
      cb();
    });
  });
};

module.exports = HtmlWebpackSitemapPlugin;
