import "../utils/functional";
import "../styles/common.scss";
import "../styles/_variables.scss";
import "../styles/_mixins.scss";
import "../styles/functions.scss";

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
