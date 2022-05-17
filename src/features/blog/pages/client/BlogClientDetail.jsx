import { useQuery } from '@apollo/client';
import PageLoading from 'components/PageLoading';
import BlogContent from 'features/blog/components/BlogContent';
import { GET_BLOG_BY_ID } from 'graphql/Queries';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { generateSubStr } from 'utils';

const BlogClientDetail = () => {
  const { state } = useLocation();
  const { loading, error, data } = useQuery(GET_BLOG_BY_ID, { variables: { blogID: state.id } });
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [state]);

  if (loading) return <PageLoading />;
  if (error) {
    alert(error.message);
    return;
  }
  const currentBlog = {
    title: data.blogs_by_pk.title,
    content: data.blogs_by_pk.content,
    account: data.blogs_by_pk.account,
  };
  const otherBlogs = data.blogs_by_pk.account.blogs;

  return (
    <div className="blog">
      <div className="container">
        <BlogContent {...currentBlog} />
        <div className="blog_others">
          <h3>Bài viết cùng tác giả</h3>
          <div className="divider"></div>
          <ul className="blog_others_list">
            {otherBlogs.map((item, index) => (
              <li key={index}>
                <Link
                  to={`/blog/${generateSubStr(item.id, 8)}`}
                  state={{ id: item.id }}
                  className="blog_others_list_link"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BlogClientDetail;
