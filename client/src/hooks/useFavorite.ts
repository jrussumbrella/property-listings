import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import { TOGGLE_FAVORITE } from 'graphql/mutations';
import { MY_FAVORITES } from 'graphql/queries';
import { useToast, useAuth } from 'contexts';
import { Listing } from 'types';

const useFavorite = (listing: Listing) => {
  const { user } = useAuth();
  const { setToast } = useToast();
  const history = useHistory();

  const [toggleFavorite] = useMutation(TOGGLE_FAVORITE, {
    onError(err) {
      setToast('error', err.graphQLErrors[0].message);
    },
    refetchQueries: [
      {
        query: MY_FAVORITES,
        variables: { page: 1, limit: 10 },
      },
    ],
  });

  const handleToggle = () => {
    if (!user) {
      setToast('error', 'Please log in first');
      history.push('/login');
      return;
    }
    toggleFavorite({ variables: { id: listing.id } });
  };

  const checkIsFavorite = () => {
    return listing?.favorites.some((favorite) => favorite === user?.id);
  };

  return {
    handleToggle,
    checkIsFavorite,
  };
};

export default useFavorite;
