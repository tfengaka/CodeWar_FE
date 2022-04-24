import { Link } from 'react-router-dom';
import Avatar from '../../../../assets/avatar_teacher.jpg';

function Card(props) {
  return (
    <div className='card'>
      <div className='card__body'>
        <h3 className='card__body__title'>
          <Link to={`/problem/${props.data.slug}`}>{props.data.title}</Link>
          {/* <Link to={'/contest/' + conversionURL(item.title) + '.' + item.id + '.html'}>
            {item.title}
          </Link> */}
        </h3>

        <div className='card__body__user'>
          <img src={Avatar} alt='' className='card__body__user-avatar' />
          <div className='card__body__user-info'>
            <div className='card__body__user-info__top'>
              <h4 className='card__body__user-info__name'>{props.data.name}</h4>
            </div>
            <div className='card__body__user-info__position'>{props.data.position}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
