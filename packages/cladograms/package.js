Package.describe({
  name: 'clinical:cladograms',
  version: '0.1.0',
  summary: '',
  git: '',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.3');

  api.use('meteor-platform');
  api.use('templating');
  api.use('session');

  api.use('grove:less@0.1.1');
  api.use('clinical:router@2.0.17');

  api.addFiles('lib/Graphs.js', 'client');
  api.addFiles('lib/Cladogram.js', 'client');

  api.addFiles('components/graphPages.less', 'client');

  api.addFiles('components/sunburstPage/sunburstPage.html', 'client');
  api.addFiles('components/sunburstPage/sunburstPage.js', 'client');

  api.addFiles('components/treePage/treePage.html', 'client');
  api.addFiles('components/treePage/treePage.js', 'client');

  api.export('Graphs');
  api.export('Cladogram');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('ubiome:cladograms');
});
