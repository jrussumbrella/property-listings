import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Meta from 'components/Meta';
import Button from 'components/Button';
import ErrorMessage from 'components/ErrorMessage';
import { FaBed, FaBath } from 'react-icons/fa';
import { IoMdSquare } from 'react-icons/io';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { FiShare } from 'react-icons/fi';
import { MdSupervisorAccount } from 'react-icons/md';
import useFavorite from 'hooks/useFavorite';
import { useToast } from 'contexts';
import { ContactListing } from 'types';
import { EMAIL_AGENT_LISTING } from 'graphql/mutations';
import { LISTING } from 'graphql/queries';
import ListingContact from './ListingContact';
import ListingShareModal from './ListingShareModal';
import ListingContactModal from './ListingContactModal';
import ListingSkeleton from './ListingSkeleton';
import {
  CoverImg,
  IconWrapper,
  Img,
  ActionWrapper,
  Title,
  Wrapper,
  Price,
  PriceWrapper,
  Heading,
  Description,
  Location,
  Details,
  Container,
  InfoContainer,
  BottomAction,
  ButtonWrapper,
} from './styled';
import ListingCountInfo from './ListingCountInfo';

interface Params {
  id: string;
}

const COLOR_RED = 'var(--color-red)';

const Listing = (): JSX.Element => {
  const { id } = useParams<Params>();
  const [isOpenShareModal, setIsOpenShareModal] = useState(false);
  const [isOpenContactModal, setIsOpenContactModal] = useState(false);
  const {
    loading: loadingListing,
    error: errorListing,
    data,
  } = useQuery(LISTING, { variables: { id } });
  const { setToast } = useToast();

  const listing = data ? data.listing : null;
  const { handleToggle, checkIsFavorite } = useFavorite(listing);

  const [emailAgentListing, { loading: submitting }] = useMutation(
    EMAIL_AGENT_LISTING,
    {
      onError() {
        setToast(
          'error',
          'Unable to send your message. Please try again later'
        );
      },
      onCompleted() {
        setToast('success', 'Successfully email sent to agent');
      },
    }
  );

  const handleEmailAgent = (contactListing: ContactListing) => {
    emailAgentListing({ variables: { input: contactListing } });
  };

  const handleCallAgent = () => {
    const telNo = `tel:${listing.host.phone}`;
    window.open(telNo);
  };

  if (loadingListing)
    return (
      <Container>
        <ListingSkeleton />
      </Container>
    );

  if (errorListing)
    return <ErrorMessage message="Something went wrong. Please try again." />;

  return (
    <Container>
      <ListingShareModal
        isVisible={isOpenShareModal}
        closeModal={() => setIsOpenShareModal(false)}
      />
      <ListingContactModal
        id={listing.id}
        closeModal={() => setIsOpenContactModal(false)}
        isVisible={isOpenContactModal}
        emailAgent={handleEmailAgent}
        submitting={submitting}
      />
      <Meta
        title={listing.title}
        description={listing.description}
        image={listing.imageUrl}
      />
      <InfoContainer>
        <CoverImg>
          <Img src={listing.imageUrl} alt={listing.title} />
          <ActionWrapper>
            <IconWrapper onClick={handleToggle}>
              {checkIsFavorite() ? (
                <AiFillHeart fill={COLOR_RED} />
              ) : (
                <AiOutlineHeart />
              )}
            </IconWrapper>
            <IconWrapper onClick={() => setIsOpenShareModal(true)}>
              <FiShare />
            </IconWrapper>
          </ActionWrapper>
        </CoverImg>
        <Wrapper>
          <Title>{listing.title}</Title>
          <Location>{listing.address}</Location>
          <Details>
            <ListingCountInfo
              count={listing.numOfBedrooms}
              name="Bed"
              icon={<FaBed />}
            />
            <ListingCountInfo
              count={listing.numOfBaths}
              name="Bath"
              icon={<FaBath />}
            />
            <ListingCountInfo
              count={listing.propertySize}
              name="Sq Ft"
              icon={<IoMdSquare />}
            />
            <ListingCountInfo
              count={listing.propertySize}
              name="person"
              icon={<MdSupervisorAccount />}
            />
          </Details>
          <PriceWrapper>
            <Price>P{listing.price}</Price>
          </PriceWrapper>
          <Heading> Description </Heading>
          <Description>{listing.description}</Description>
          <ListingContact host={listing.host} />
        </Wrapper>
      </InfoContainer>
      <BottomAction>
        <ButtonWrapper>
          <Button
            title="Call Agent"
            type="button"
            variant="primary"
            onClick={handleCallAgent}
          />
          <Button
            title="Email Agent"
            type="button"
            variant="outline"
            onClick={() => setIsOpenContactModal(true)}
          />
        </ButtonWrapper>
      </BottomAction>
    </Container>
  );
};

export default Listing;
