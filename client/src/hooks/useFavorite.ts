import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import { TOGGLE_FAVORITE } from 'graphql/mutations';
import { useToast, useAuth } from 'globalState';
import { Listing } from 'types';

const useFavorite = (listing: Listing) => {
  const { user } = useAuth();
  const { setToast } = useToast();
  const history = useHistory();

  const [toggleFavorite] = useMutation(TOGGLE_FAVORITE, {
    variables: { id: listing.id },
    onError(err) {
      setToast('error', err.graphQLErrors[0].message);
    },
  });

  const handleToggle = () => {
    if (!user) {
      setToast('error', 'Please log in first');
      history.push('/login');
      return;
    }
    toggleFavorite();
  };

  const checkIsFavorite = () => {
    return listing.favorites.some((favorite) => favorite === user?.id);
  };

  return {
    handleToggle,
    checkIsFavorite,
  };
};

export default useFavorite;
