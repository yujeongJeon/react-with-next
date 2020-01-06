import "../utils/functional";

import { configure, addParameters } from "@storybook/react";
import { themes } from "@storybook/theming";

addParameters({
  options: {
    theme: themes.dark
  }
});

configure(
  require.context("../components/stories", true, /\.stories\.js$/),
  module
);
