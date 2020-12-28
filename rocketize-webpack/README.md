# Rocketize your webpack to have a better life

## **IMPORTANT**:

> ### Please just read `r/readmin/README.md` if you want to save your time

## Update Node.js

Please update your Node.js to `v10.14.2`(LTS). You may see a big difference even when you haven't done anything.

## Compatibility

Only work with `react-scripts@1`.

## Features

  **For dev config:**

  - Changed devtool to `cheap-module-eval-source-map` in dev config.
  - Used `happypack` to parallelize webpack bundling progress.
  - Used `hard-source-webpack-plugin` to cache modules.
  - Used `autodll-webpack-plugin` to split and cache big vendor.
  - Disabled some unnecessary options and plugins.

  **For prod config:**

  - Disabled `eslint-loader`
  - Used `happypack` to parallelize webpack bundling progress (only for JS code, applying for CSS is quite complicated, ignore for now).
  - Used `autodll-webpack-plugin` to split and cache big vendor.

## Results

  **Locally start:**

    without cache:  < 1m 30s  (1st touch)
    with cache:     < 25s

  **Hot reload:**

    1st time:       ~ 13s
    next times:     ~ 7-9s

  **Production build:**

    ~ 3 minutes

## How to use
  **_NOTE:_ All commands must be run at project root.**

  Create a script to whenever you want in your JS project with the following sample content:

  ```bash
  sh ./rocketize-webpack/start.sh
  ```

  Then, simply add it to your `package.json` to run.

  _For example:_

  ```json
  {
    "scripts": {
      "webpack:rocketize": "bash ./path/to/your/script.sh",
    }
  }
  ```

## How to customize the configs

  If you don't want to use my configs, simply modify them in the `rocketize-webpack` folder then run
  ```bash
  bash ./rocketize-webpack/start.sh
  ```

## Troubleshooting

### Dev server crashes so many times

If it's due to `Javascript Heap Out Of Memory`, let's increase the heap size by **8192 MBs**.

```json
{
  "scripts": {
    "start-js": "react-scripts --max_old_space_size=8192 start",
  }
}
```


### Cannot read property 'indexOf' of undefined

  ```
  var i = req.indexOf("?");
          ^

  TypeError: Cannot read property 'indexOf' of undefined
  ```

  If you encounter above error when running `start` or `build`, please remove the cache of `hard-source-webpack-plugin` by the following command:

  ```bash
  rm -rf ./node_modules/.cache/hard-source
  ```

**NOTE:**

Cache is all placed in `node_modules/.cache/` folder. You can remove it by creating and running `webpack:cache:clean` script.

  ```json
  {
    "scripts": {
      "webpack:cache:clean": "rm -rf ./node_modules/.cache",
    }
  }
  ```

**WARNING:**

Please only consider doing this in case all above tips cannot resolve your issues.

It's because clearing cache will slow down your `start` or `build` progress.