import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
const ServerError = () => {
  return (
    <div className="notfound">
      <div className="container">
        <div className="notfound_content">
          <span className="notfound_content_title">500 Internal Server Error</span>
          <p className="notfound_content_subtitle">There was an error, please try again later.</p>
          <img src="/static/illustration_500.svg" alt="" />
        </div>
        <Button size="lg">
          <Link to="/">Go To Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default ServerError;
