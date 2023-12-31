import { Link, useLocation } from 'react-router-dom';

import PropTypes from 'prop-types';

import { Container, LinkWrapper, MovieName, MovieRelease } from './MoviesList.styled';

export function MovieList({ movies }) {
  const location = useLocation();
  return (
    <Container>
      {movies.map(movie => {
        return movie.poster_path ? (
          <LinkWrapper key={movie.id}>
            <Link
              to={location.pathname === '/' ? `movies/${movie.id}` : `${movie.id}`}
              state={{ from: location }}
            >
              <img
                src={`https://image.tmdb.org/t/p/w154/${movie.poster_path}`}
                alt={`${movie.name}`}
              />
              <MovieName>{movie.original_title}</MovieName>
            </Link>
            <MovieRelease>Release date: {movie.release_date}</MovieRelease>
          </LinkWrapper>
        ) : null;
      })}
    </Container>
  );
}

MovieList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
};
