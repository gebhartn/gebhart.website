module.exports = {
  siteMetadata: {
    title: `Nicholas Gebhart`,
    description: `Nicholas Gebhart is a full stack software developer`,
    author: `Nicholas Gebhart`,
  },
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/content/`,
      },
    },
    `gatsby-transformer-remark`,
  ],
}
