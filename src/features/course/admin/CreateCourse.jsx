import React from 'react';

const CreateCourse = () => {
  const [banner, setBanner] = React.useState(null);
  const bannerRef = React.useRef(null);
  const handleLoadBanner = (e) => {
    const bannerFile = e.target.files[0];
    if (bannerFile) setBanner(bannerFile);
  };
  return (
    <div className="course create">
      <div className="container">
        <div className="course_title">
          <input type="text" className="input_control" placeholder="Tiêu đề khóa học...." />
        </div>
        <div className="course_banner">
          <div className="course_banner_img" onClick={() => bannerRef.current.click()}>
            <input type="file" ref={bannerRef} style={{ display: 'none' }} onChange={(e) => handleLoadBanner(e)} />
            {!banner ? (
              <label className="handler">
                <i className="bx bxs-cloud-upload"></i>
                Tải ảnh bìa lên ở đây....
              </label>
            ) : (
              <div className="img_wrapper">
                <img src={URL.createObjectURL(banner)} alt="" />
              </div>
            )}
          </div>
        </div>
        <div className="course_desc">
          <textarea spellCheck={false} placeholder="Mô tả khóa học...." />
        </div>
      </div>
    </div>
  );
};

export default CreateCourse;
