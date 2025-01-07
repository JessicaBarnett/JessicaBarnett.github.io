import type { Preview } from "@storybook/react";
import '/stylesheets/app.scss';

const customViewports = {
  xs: {
    name: 'XS',
    styles: {
      width: '350px',
      height: '963px',
    },
  },
  sm: {
    name: 'SM',
    styles: {
      width: '600px',
      height: '801px',
    },
  },
  md: {
    name: 'MD',
    styles: {
      width: '900px',
      height: '801px',
    },
  },
  lg: {
    name: 'LG',
    styles: {
      width: '1200px',
      height: '801px',
    },
  },
  xl: {
    name: 'XL',
    styles: {
      width: '1536px',
      height: '801px',
    },
  },
};


const preview: Preview = {
  parameters: {
    backgrounds: {
      values: [
        { name: 'light', value: '#fff' },
        { name: 'dark', value: '#333' },
      ],
    },
    viewport: {
      viewports: customViewports,
    },
    options: {
      storySort: {
        order: ['about', ['Design', 'Development', 'Data'], 'globals', 'typography', 'icons', 'components', ['Navigation', 'Title', 'About', 'Tag', 'FilterSelect', 'Project', 'ProjectList', 'ExperienceEntry', 'ExperienceList', 'SocialSidebar', 'ContactForm', '*' ],'*'],
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
