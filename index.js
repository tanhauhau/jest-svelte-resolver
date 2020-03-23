const path = require('path');

module.exports = function(value, options) {
  const { basedir, moduleDirectory, rootDir, defaultResolver } = options;
  if (
    value &&
    value[0] !== '.' &&
    value[0] !== '\0' &&
    !path.isAbsolute(value)
  ) {
    try {
      // check if there's a valid pkg.svelte
      const pkgPath = defaultResolver(`${value}/package.json`, options);
      if (pkgPath) {
        const pkg = require(pkgPath);
        if (pkg.svelte) {
          return defaultResolver(path.join(value, pkg.svelte), options);
        }
      }
    } catch (error) {}
  }
  return defaultResolver(value, options);
};
