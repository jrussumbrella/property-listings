import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';

export const ScrollToTop = () => {
  const history = useHistory();
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return unlisten;
  }, [history]);

  return null;
};
