import { styled } from "styled-components";
import { Button } from "../../components/primitives";

export const StyledContainer = styled.div`
  max-width: 80rem;
  margin: 2rem auto 8rem auto;

  padding: 2rem;

  h1 {
    font-size: 2rem;
    font-weight: 700;
  }

  .sub-heading {
    font-weight: 600;
  }

  p {
    margin: 1.2rem auto;
    font-size: 1.6rem;
  }
`;

export const AboutPage = () => {
  const redirectToReclaim = () => {
    window.open("https://www.reclaimprotocol.org/", "_blank");
  };
  return (
    <StyledContainer>
      <h1>About Reclaim Protocol</h1>

      <p className="sub-heading">Export data from any website into a zkproof</p>

      <p>
        Using Reclaim Protocol you can export user-data from any website and
        generate a zkproof for it. This proof generation is completely trustless
        and privacy preserving.
      </p>

      <p>
        For example, a user can login into Bank Of America and generate a proof
        of their bank balance. In doing so, they aren't sharing their username,
        password or any authentication token to any party - unlike what Plaid
        does. Plaid takes the username password of the user and stores it in
        their database, arguably in plaintext.
      </p>

      <p>
        We can generate the proof for any data on any website without needing
        any change from the said website. So, Bank of America doesn't need to
        make any change for us to be able to generate the proof of bank balance.
      </p>

      <p>
        More importantly, Bank of America cannot stop a user from exporting this
        data from their website. This is because Reclaim Protocol uses the TLS
        session keys to generate the proofs. That means, if the website wants to
        stop you from exporting this data and generating a proof for it, they'll
        have to change the TLS Protocol, making their website incompatible with
        all the web browsers in the world. TLS protocol is what powers HTTPS.
      </p>
      <p>
        This puts the user in control of their data. They are reclaiming their
        data from websites' databases. This data is rightfully theirs and should
        have sovereignty over how and where this data is used. All the pieces of
        reclaim protocol are completely open-sourced. You're welcome to fork,
        contribute or lurk.
      </p>

      <Button label="Read More about Reclaim" onClick={redirectToReclaim} />
    </StyledContainer>
  );
};
