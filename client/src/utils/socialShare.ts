const socialShare = (provider: 'fb' | 'twitter'): void => {
  const url = window.location.href;
  if (provider === 'fb') {
    window.open(
      `https://www.facebook.com/dialog/feed?app_id=${encodeURIComponent(
        '224938085116846'
      )}&link=${encodeURIComponent(url)}`,
      'facebook-share-dialog',
      'width=626,height=436'
    );
  } else if (provider === 'twitter') {
    window.open(
      `https://twitter.com/share?url=${url}`,
      'Twitter-dialog',
      'width=626,height=436'
    );
  }
};

export default socialShare;
