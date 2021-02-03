import path from 'path';

export default {
  "plugins": [
    "@babel/plugin-transform-modules-commonjs",
    [
      "module-resolver",
      {
        "root": [
          "src"
        ],
        "alias": {
          "modules": path.resolve(process.cwd(), 'modules'),
          "tools": path.resolve(process.cwd(), 'tools'),
          "config": path.resolve(process.cwd(), 'config'),
        }
      }
    ]
  ],
  "presets": [
    "@babel/preset-typescript",
    "@babel/preset-env"
  ]
}