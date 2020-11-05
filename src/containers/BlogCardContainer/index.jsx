import * as React from 'react'
import BlogCard from '../../components/BlogCard'

const BlogCardContainer = ({ posts }) => {
  return <section>{posts.map(BlogCard)}</section>
}

export default BlogCardContainer
