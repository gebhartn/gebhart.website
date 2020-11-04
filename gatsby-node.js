const Path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  try {
    const generic = Path.resolve(`src/templates/generic.js`)
    const post = Path.resolve(`src/templates/post.js`)

    const result = await graphql(`
      {
        allMarkdownRemark(limit: 1000) {
          edges {
            node {
              frontmatter {
                path
                template
              }
              fields {
                slug
              }
            }
          }
        }
      }
    `)

    if (result.errors) {
      reporter.panicOnBuild(`Error while running GraphQL query`)
    }

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      if (node.frontmatter.template === `generic`) {
        const [, , route] = node.fields.slug.split(`/`)
        const path = `/${route}`
        createPage({
          path,
          component: generic,
          context: { slug: node.fields.slug },
        })
      }

      if (node.frontmatter.template === `post`) {
        createPage({
          path: node.fields.slug,
          component: post,
          context: { slug: node.fields.slug },
        })
      }
    })
  } catch (why) {
    if (why.forEach) {
      // eslint-disable-next-line no-console
      why.forEach(e => console.error(e))
    } else {
      // eslint-disable-next-line no-console
      console.error(why)
    }
  }
}
