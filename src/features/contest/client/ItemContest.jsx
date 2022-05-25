import React from 'react';
import { Link } from 'react-router-dom';
import LogoUTC from '../../../assets/images/logo-utc.png';
import { conversionURL } from './ConversionURL';
import { format, parse } from 'date-fns';
import moment from 'moment';
import Button from 'components/Button';

const ItemContest = ({ contestsList }) => {
  const statusStart = 'Đang diễn ra';
  const statusEnd = 'Đã kết thúc';

  const handleFilterTag = (items) => {
    let topicsList = [];

    for (let item of items) {
      if (!topicsList.length) {
        topicsList = item.topic;
        continue;
      }
      // eslint-disable-next-line no-loop-func
      let diff = item.topic.filter((x) => !topicsList.includes(x));
      topicsList = [...topicsList, ...diff];
    }
    return topicsList;
  };
  return (
    <div className="panel_body">
      <ol>
        {contestsList.map((item) => (
          <li key={item.id}>
            <div className="body_card">
              <img src={item.logoUrl || LogoUTC} alt="" />
              <div className="body_card--content">
                <h3>{item.name}</h3>
                <p title={item.des}>{item.des}</p>
                <div className="topic">
                  {handleFilterTag(item.exercises).map((topic, index) => (
                    <div className="topic--item" key={index}>
                      {topic}
                    </div>
                  ))}
                </div>
              </div>
              <div className="body_card--item">
                <div className="date">
                  <i className="bx bx-calendar bx-md"></i>
                  {format(parse(item.startDate, "yyyy-MM-dd'T'HH:mm:ssxxx", new Date()), 'dd-MM-yyyy h:mm aa')}
                  <b>&nbsp;&nbsp;-&nbsp;&nbsp;</b>
                  {format(parse(item.endDate, "yyyy-MM-dd'T'HH:mm:ssxxx", new Date()), 'dd-MM-yyyy h:mm aa')}
                </div>
                <div className="date">
                  <i className="bx bx-user bx-md"></i>0
                </div>

                {moment(item.startDate) < moment() && moment(item.endDate) > moment() ? (
                  <div className="body_card--item_right">
                    <div className="status">
                      <i className="bx bxs-circle color-green"></i> {statusStart}
                    </div>

                    <Button>
                      <Link to={`/contest/${conversionURL(item.name)}/competition`} state={{ contestId: item.id }}>
                        Làm bài
                      </Link>
                    </Button>
                  </div>
                ) : (
                  <div className="body_card--item_right">
                    <div className="status">
                      <i className="bx bxs-circle color-red"></i> {statusEnd}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default ItemContest;
