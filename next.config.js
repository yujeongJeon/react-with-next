const withSass = require("@zeit/next-sass");
const withSourceMaps = require("@zeit/next-source-maps");
const configFile = require('./config');

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true"
});

const nextConfig = {
  webpack(config, { webpack }) {
    config.plugins.push(
      // __tests__ 무시: 추후 기능 테스트용으로 cypress 적용
      new webpack.IgnorePlugin(/[\\/]__tests__[\\/]/)
    );

    config.plugins.push(
      new webpack.DefinePlugin({
        NEXT_ENV: JSON.stringify(process.env.NEXT_ENV),
        API_DOMAIN: JSON.stringify(configFile.api_server.api_domain)
      })
    )

    // 폰트, 이미지 로딩
    config.module.rules.push({
      test: /fonts[\\/].*\.(woff|woff2|eot|ttf|otf|svg)$/,
      use: [
        {
          loader: "url-loader",
          options: {
            limit: 10000,
            fallback: "file-loader",
            publicPath: "/_next/public/fonts/",
            outputPath: "public/fonts/",
            name: "[name]-[hash].[ext]"
          }
        }
      ]
    });

    // 정적 페이지 혹은 이미지 로딩
    config.module.rules.unshift(
      {
        test: /public[\\/].*\.(html)$/,
        use: {
          loader: "html-loader"
        }
      },
      {
        test: /public[\\/].*\.(js)$/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /public[\\/].*\.(css)$/,
        use: {
          loader: "raw-loader"
        }
      },
      {
        test: /public[\\/].*\.(jpg|gif|png|svg)$/,
        use: {
          loader: "file-loader",
          options: {
            publicPath: "/_next/public/images/",
            outputPath: "public/images/",
            name: "[name]-[hash].[ext]",
            esModule: false
          }
        }
      }
    );

    return config;
  }
};

module.exports = withBundleAnalyzer(withSourceMaps(withSass(nextConfig)));
