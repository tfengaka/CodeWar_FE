import { useQuery } from '@apollo/client';
import PageLoading from 'components/PageLoading';
import { GET_ALL_BLOG } from 'graphql/Queries';
import React from 'react';
import BlogClientItem from 'features/blog/components/BlogClientItem';

const BlogClient = () => {
  const { loading, error, data } = useQuery(GET_ALL_BLOG);
  if (loading) return <PageLoading />;
  if (error) {
    alert(error.message);
    return;
  }
  const acceptedBlogs = data.blogs.filter((blog) => blog.isApproved);
  return (
    <div className="blog">
      <div className="container">
        <div className="blog_header">
          <span>Bài viết nổi bật</span>
        </div>
        <div className="divider"></div>
        <section className="blog_body">
          {acceptedBlogs.map((item, index) => (
            <BlogClientItem key={index} {...item} />
          ))}
        </section>
      </div>
    </div>
  );
};

export default BlogClient;
