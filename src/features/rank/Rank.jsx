import React from 'react';
import Helmet from 'components/Helmet';
import background from '../../assets/images/background.png';
import no1 from '../../assets/images/medal_no1.png';
import no2 from '../../assets/images/medal_no2.png';
import no3 from '../../assets/images/medal_no3.png';
const Rank = () => {
  const item = [
    { rank: 1, name: 'Nguyễn Văn A', nameContest: 'UTC2 TechWar', score: '100' },
    { rank: 2, name: 'Nguyễn Văn B', nameContest: 'UTC2 TechWar', score: '90' },
    { rank: 3, name: 'Nguyễn Văn B', nameContest: 'UTC2 TechWar', score: '90' },
    { rank: 4, name: 'Nguyễn Văn B', nameContest: 'UTC2 TechWar', score: '90' },
    { rank: 5, name: 'Nguyễn Văn B', nameContest: 'UTC2 TechWar', score: '90' },
  ];

  const handleRank = (items) => {
    if (items === 1) {
      return <img src={no1} alt="no1" />;
    } else if (items === 2) {
      return <img src={no2} alt="no1" />;
    } else if (items === 3) {
      return <img src={no3} alt="no1" />;
    } else {
      return <span>{items}</span>;
    }
  };

  return (
    <Helmet title="Xếp hạng">
      <div className="rank">
        <div className="rank_head">
          <img src={background} alt="" />
          <div className="rank_head-content">
            <div className="rank_head-content_detail">
              <h1>Bảng xếp hạng</h1>
            </div>
          </div>
        </div>
        <div className="rank_container">
          <div className="rank_body">
            <div className="rank_body_heading">
              <table>
                <colgroup>
                  <col width="100" />
                  <col width="200" />
                  <col width="300" />
                  <col width="300" />
                  <col width="300" />
                </colgroup>
                <thead>
                  <tr>
                    <th className="rank_body_heading_item"></th>
                    <th className="rank_body_heading_item">
                      <div className="rank_cell">
                        <span>Hạng</span>
                      </div>
                    </th>
                    <th className="rank_body_heading_item">
                      <div className="rank_cell">
                        <span>Tên đăng nhập</span>
                      </div>
                    </th>
                    <th className="rank_body_heading_item">
                      <div className="rank_cell">
                        <span>Cuộc thi</span>
                      </div>
                    </th>
                    <th className="rank_body_heading_item">
                      <div className="rank_cell">
                        <span>Tổng điểm</span>
                      </div>
                    </th>
                  </tr>
                </thead>
              </table>
            </div>
            <div className="rank_body_content">
              <table>
                <colgroup>
                  <col width="100" />
                  <col width="200" />
                  <col width="300" />
                  <col width="300" />
                  <col width="300" />
                </colgroup>
                <tbody>
                  {item.map((item, index) => (
                    <tr className="rank_row">
                      <td className="rank_body_content_item"></td>
                      <td className="rank_body_content_item">
                        <div className="rank_cell-logo">{handleRank(index + 1)}</div>
                      </td>
                      <td className="rank_body_content_item">
                        <div className="rank_cell">{item.name}</div>
                      </td>
                      <td className="rank_body_content_item">
                        <div className="rank_cell">{item.nameContest}</div>
                      </td>
                      <td className="rank_body_content_item">
                        <div className="rank_cell">{item.score}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Helmet>
  );
};

export default Rank;
