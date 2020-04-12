const path = require('path')

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions
  const generic = path.resolve(`src/templates/generic.js`)
  const post = path.resolve(`src/templates/post.js`)

  const result = await graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            frontmatter {
              path
              template
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild('Error while running GraphQL query')
  }

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    if (node.frontmatter.template === `generic`) {
      createPage({
        path: node.frontmatter.path,
        component: generic,
        context: {},
      })
    }

    if (node.frontmatter.template === `post`) {
      createPage({
        path: node.frontmatter.path,
        component: post,
        context: {},
      })
    }
  })
}
