import { useMutation, useQuery } from '@apollo/client';
import Button from 'components/Button';
import PageLoading from 'components/PageLoading';
import BlogContent from 'features/blog/components/BlogContent';
import { APPROVED_NEW_BLOG } from 'graphql/Mutation';
import { GET_BLOG_BY_ID } from 'graphql/Queries';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const BlogReview = () => {
  const { state } = useLocation();
  const { loading, error, data } = useQuery(GET_BLOG_BY_ID, { variables: { blogID: state.id } });
  const [confirmBlog] = useMutation(APPROVED_NEW_BLOG, {
    variables: { blogID: state.id },
    onCompleted: () => {
      alert('Bài viết đã được duyệt');
    },
    onError: (error) => {
      alert(error.message);
    },
    refetchQueries: [GET_BLOG_BY_ID],
  });
  if (loading) return <PageLoading />;
  if (error) {
    alert(error.message);
    return;
  }
  const currentBlog = {
    title: data.blogs_by_pk.title,
    content: data.blogs_by_pk.content,
    account: data.blogs_by_pk.account,
    isApproved: data.blogs_by_pk.isApproved,
    createdAt: data.blogs_by_pk.createdAt,
  };
  console.log(currentBlog.isApproved);
  return (
    <div className="blog review">
      <div className="container">
        <div className="toolBar">
          <Link to="/admin/blog" className="toolBar_back">
            <i className="bx bx-arrow-back"></i>
            <span>Trở về</span>
          </Link>

          {!currentBlog.isApproved && (
            <div className="toolBar_right">
              <Button backgroundColor="green" onClick={confirmBlog}>
                <i className="bx bx-check-circle"></i>
                <span>Duyệt bài</span>
              </Button>
            </div>
          )}
        </div>

        <BlogContent {...currentBlog} />
      </div>
    </div>
  );
};

export default BlogReview;
