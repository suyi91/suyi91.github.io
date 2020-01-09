const postCssPresetEnv = require(`postcss-preset-env`)
const postCSSNested = require('postcss-nested')
const postCSSUrl = require('postcss-url')
const postCSSImports = require('postcss-import')
const cssnano = require('cssnano')
const postCSSMixins = require('postcss-mixins')

const dev = process.env.NODE_ENV === 'development'

const config = {
  siteMetadata: {
    title: 'Suyi的小站',
    description: `记录自己的成长历程`,
    copyrights: '',
    author: `Suyi`,
    logo: {
      src: '',
      alt: '',
    },
    logoText: '欢迎来到Suyi的小站',
    defaultTheme: 'dark',
    postsPerPage: 5,
    showMenuItems: 2,
    menuMoreText: 'More',
    mainMenu: [
      {
        title: 'About',
        path: '/about',
      },
    ],
  },
  plugins: [
    `babel-preset-gatsby`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/src/posts`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages`,
      },
    },
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [
          postCSSUrl(),
          postCSSImports(),
          postCSSMixins(),
          postCSSNested(),
          postCssPresetEnv({
            importFrom: 'src/styles/variables.css',
            stage: 1,
            preserve: false,
          }),
          cssnano({
            preset: 'default',
          }),
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-embed-video',
            options: {
              related: false,
              noIframeBorder: true,
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
              quality: 100,
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: false,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Suyi\'s blog`,
        short_name: `Suyi\'s blog`,
        start_url: `/`,
        background_color: `#292a2d`,
        theme_color: `#292a2d`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`,
      },
    },
  ],
}

if (!dev) {
  config.plugins.push({
    resolve: `gatsby-plugin-google-analytics`,
    options: {
      trackingId: 'UA-98612723-2',
    },
  })
}

module.exports = config
