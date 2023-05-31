import { styled } from "styled-components";
import { Button } from "../../components/primitives";

const StyledContainer = styled.div`
  max-width: 80rem;
  margin: 2rem auto 8rem auto;

  padding: 2rem;

  h1 {
    font-size: 2rem;
    font-weight: 700;
  }

  h2 {
    font-size: 1.8rem;
  }

  .sub-heading {
    font-weight: 600;
  }

  p {
    margin: 1.2rem auto;
    font-size: 1.6rem;
  }

  ul {
    color: #4b587c;
    font-size: 1.6rem;
    font-weight: 400;

    margin: 2rem 0;
    li {
      margin-left: 2rem;
      margin-bottom: 1rem;
    }
  }
`;

export const HowItWorks = () => {
  const redirectToReclaim = () => {
    window.open(
      "https://docs.reclaimprotocol.org/whitepaper-and-how-reclaim-protocol-works",
      "_blank"
    );
  };
  return (
    <StyledContainer>
      <h1>How Reclaim Protocol Works</h1>

      <p className="sub-heading">
        Reclaim protocol can prove the existence of user data on a website. User
        logs in into a website, and using the html/json response from the
        website Reclaim protocol generates a zk-proof.
      </p>

      <div>
        <h2>Participants</h2>

        <ul>
          <li>
            Client : A mobile app that runs a custom implementation of TLS1.3,
            adhering to the full specs and without compromising any security of
            the protocol.
          </li>
          <li>
            HTTPS Proxy : A transparent http proxy via which all the https
            requests are routed. This Proxy cannot read any contents of the
            request or the response.
          </li>
          <li>
            Server : The website server where the user data resides. The
            responses of the server are considered a ground truth.
          </li>
        </ul>
      </div>

      <div>
        <h2>Highlevel Architeture - Making a request</h2>

        <p>
          An authorized https request is created once the user is logged in,
          using Cookies. These cookies are responsible for identifying the user.
        </p>
        <p>
          These cookies are private and should never be exposed to any other
          entity other than the server and the client.
        </p>

        <h2>A request is broken down into atleast 3 parts</h2>
        <ul>
          <li>Request preceeding the cookie string</li>

          <li>The cookie string itself</li>

          <li>Request succeeding the cookie string</li>
        </ul>

        <p>
          Each of these parts are sent to the server with a fresh key. That is,
          the TLS 1.3 method KeyUpdate is invoked after each part is sent.
        </p>
        <p>
          The headers of the request are then revealed to the HTTPS Proxy for
          part 1 & 3. The Proxy will be able to attest that the correct request
          was sent, without the client revealing the cookie string
        </p>
      </div>

      <div>
        <h2 className="sub-heading">What does the HTTPS Proxy do?</h2>

        <p>
          The HTTPS Proxy acts as a transparent proxy. It just forwards the
          request & response as is. However, it also stores the encrypted data
          for later use.
        </p>

        <p>
          The HTTPS Proxy first attests that the correct request was sent, as
          was expected for generating the proof.
        </p>

        <p>The inputs for this circuit are</p>

        <ul>
          <li>Encrypted data</li>
          <li>Public certificate (SSL Certificate) used by the server</li>
          <li>
            Signature from the HTTPS Proxy that this is the correct encrypted
            data
          </li>
        </ul>
        <p>The private input to the circuit :</p>

        <ul>
          <li>
            Decryption keys. This is the TLS session keys that will be able to
            decrypt the encrypted response. Please note the decryption keys are
            fed to the zk circuit which runs on the client.
          </li>
        </ul>
      </div>

      <Button label="Read More" onClick={redirectToReclaim} />
    </StyledContainer>
  );
};
