module.exports = {
  siteMetadata: {
    title: `Nicholas Gebhart`,
    description: `Nicholas Gebhart is a full stack software developer`,
    author: `Nicholas Gebhart`,
    siteUrl: `https://nicholasgebhart.com`,
  },
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/content/`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-external-links`,
            options: {
              target: `_blank`,
              rel: `noopener noreferrer`,
            },
          },
        ],
      },
    },
  ],
}
