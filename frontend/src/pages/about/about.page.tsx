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
  ul {
    color: rgb(75, 88, 124);
    font-size: 1.6rem;
    font-weight: 400;
    margin-left: 1.6rem;
  }
`;

export const AboutPage = () => {
  const redirectToReclaim = () => {
    window.open("https://www.reclaimprotocol.org/", "_blank");
  };
  return (
    <StyledContainer>
      <h1>Introducing an Unrestricted Version of YC-Deals</h1>

      <p>
        In the world of startups and entrepreneurship, access to favorable deals
        and discounts can be a game-changer. However, many existing platforms
        impose limitations on the types of deals that can be offered, often
        leaving out smaller startups or those in countries with different
        economic landscapes. That's why we're excited to introduce our new
        application, an unrestricted version of YC-Deals, aimed at
        revolutionizing the startup deal landscape and providing opportunities
        for all. Powered by Reclaim Protocol, this platform removes all
        limitations, enabling startups to offer deals of any value, and opens
        the door for a wide range of possibilities.
      </p>
      <p className="sub-heading">Breaking Down Limitations:</p>

      <p>
        YC-Deals, a popular platform for startups, initially imposed certain
        restrictions on the deals that could be offered. While the original
        version required deals to meet specific criteria such as
      </p>
      <ul>
        <li> A minimum value of $10,000 with a 2-year expiration.</li>
        <li>one year of free service, or a 50% discount for 2 years.</li>

        <li>Submit the details of companies who has redeemed deals.</li>
      </ul>
      <p className="sub-heading">
        {" "}
        Our unrestricted version removes these limitations entirely.
      </p>

      <p>
        By eliminating these constraints, we open up a world of possibilities
        for startups, enabling them to create deals that align with their unique
        business models and circumstances. This inclusivity is particularly
        important for startups in countries like India, where a $10,000 minimum
        value can be a significant barrier. Our application aims to level the
        playing field and democratize access to deals for all startups,
        regardless of their size or location.
      </p>

      <p>
        The unrestricted version of YC-Deals, powered by Reclaim Protocol, aims
        to revolutionize the startup deal landscape by removing limitations and
        offering equal opportunities to startups worldwide. By enabling startups
        to offer deals of any value, we empower them to create customized
        offerings that align with their business goals. This application not
        only benefits startups by providing greater flexibility and reach, but
        it also fosters a more inclusive and diverse startup community.
        Together, let's unlock the full potential of startup deals and drive
        innovation forward.
      </p>

      <p className="sub-heading">
        Please note that YC-Deals is only available for YCombinator alumni and
        those who have BookFace access. Similarly, the unrestricted version of
        the application is available only to those who are part of YC.
      </p>

      <Button label="Read More about Reclaim" onClick={redirectToReclaim} />
    </StyledContainer>
  );
};
