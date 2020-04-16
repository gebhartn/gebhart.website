module.exports = {
  siteMetadata: {
    title: `Nicholas Gebhart`,
    description: `Nicholas Gebhart is a full stack software developer`,
    author: `Nicholas Gebhart`,
    siteUrl: `https://nicholasgebhart.com`,
  },
  plugins: [
    `gatsby-plugin-eslint`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
					{
						site {
							siteMetadata {
								title
								description
								siteUrl
								site_url: siteUrl
							}
						}
					}
			`,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                return {
                  ...edge.node.frontmatter,
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ 'content:encoded': edge.node.html }],
                }
              })
            },
            query: `
							{
								allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date]}) {
									edges {
										node {
											excerpt
											html
											fields { slug }
											frontmatter {
												title
												date
											}
										}
									}
								}
							}
						`,
            output: `/rss.xml`,
            title: `Nicholas Gebhart's RSS Feed`,
          },
        ],
      },
    },
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
        path: `${__dirname}/content/`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              offsetY: `100`,
              maintainCase: false,
              removeAccents: true,
              className: `remark`,
            },
          },
          `gatsby-remark-prismjs`,
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
