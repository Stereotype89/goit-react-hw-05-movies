import { Suspense } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';

import PropTypes from 'prop-types';

import {
  Link,
  MovieMainInformation,
  MovieDescription,
  MovieAdditionalInformation,
} from './Movie.styled';

export function Movie({ movie }) {
  const location = useLocation();
  const { poster_path, original_title, release_date, vote_average, overview, genres } = movie;
  const stateFrom = location.state?.from;
  return (
    <>
      <Link to={stateFrom ?? '/'}>Go back</Link>
      <MovieMainInformation>
        <img src={`https://image.tmdb.org/t/p/w185/${poster_path}`} alt="" width="185" />
        <MovieDescription>
          <h2>{`${original_title} (${release_date.substr(0, 4)})`}</h2>
          <p>{`User Score: ${(Number(vote_average) * 10).toFixed()}%`}</p>
          <h3>Overview</h3>
          <p>{overview}</p>
          <h4>Genres</h4>
          <div>
            {genres.map(genre => {
              return <p key={genre.id}>{genre.name}</p>;
            })}
          </div>
        </MovieDescription>
      </MovieMainInformation>
      <MovieAdditionalInformation>
        <p>Additional information</p>
        <ul>
          <li>
            <NavLink to="cast" state={{ from: stateFrom }}>
              Cast
            </NavLink>
          </li>
          <li>
            <NavLink to="reviews" state={{ from: stateFrom }}>
              Reviews
            </NavLink>
          </li>
        </ul>
      </MovieAdditionalInformation>
      <Suspense fallback={<p>Loading subpage...</p>}>
        <Outlet />
      </Suspense>
    </>
  );
}

Movie.propTypes = {
  movie: PropTypes.object.isRequired,
};
