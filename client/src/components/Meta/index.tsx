import React from 'react';
import { Helmet } from 'react-helmet';

interface Props {
  title: string;
  description?: string;
  image?: string;
  url?: string;
}

const Meta = ({
  title,
  description = 'Find an apartment, condo, office space, house, and lot for sale or for rent in top locations. Certified #1 real estate property finder in the Philippines',
  image,
  url,
}: Props) => {
  const metaImageFb = image && <meta property="og:image" content={image} />;
  const metaUrlFb = url && <meta property="og:url" content={url} />;
  const metaImageTwitter = image && (
    <meta name="twitter:image" content={image} />
  );
  const metaUrlTwitter = image && (
    <meta name="twitter:card" content="summary_large_image" />
  );

  return (
    <Helmet>
      <title>{`Property Listings | ${title}`}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {metaImageFb}
      {metaUrlFb}
      {metaImageTwitter}
      {metaUrlTwitter}
    </Helmet>
  );
};

export default Meta;
