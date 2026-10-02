import { Link } from 'react-router-dom';

export default function PageHead({ title, sub, crumb }) {
  return (
    <section className="pagehead">
      <div className="wrap">
        <div className="crumbs">
          <Link to="/">Home</Link> / {crumb || title}
        </div>
        <h1>{title}</h1>
        {sub ? <p>{sub}</p> : null}
      </div>
    </section>
  );
}
