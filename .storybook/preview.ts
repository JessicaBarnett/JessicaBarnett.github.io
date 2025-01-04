import type { Preview } from "@storybook/react";
import '@styles/app.scss';

const preview: Preview = {
  parameters: {
    backgrounds: {
      values: [
        { name: 'light', value: '#fff' },
        { name: 'dark', value: '#333' },
      ],
    },
    breakpoints: {
      breakpointNames: {
        'small': '0',
        'medium': '500',
        'large': '1000'
      }
    },
    options: {
      storySort: {
        order: ['about', ['Design', 'Development', 'Data'], 'globals', 'typography', 'icons', 'components', '*'],
        method: 'alphabetical',
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
