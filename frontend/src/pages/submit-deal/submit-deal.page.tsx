import { FormContainer, SubmitDealContainer } from "./submit-seal.styles";

export const SubmitDeal = () => {
  return (
    <SubmitDealContainer>
      <h2>Submit Deal</h2>
      <FormContainer>
        <div>
          <h1>Basic Details</h1>
          <div>
            <div>
              <label htmlFor="title">Company</label>
              <input type="text" />
            </div>
            <div>
              <label htmlFor="title">Short Description</label>
              <input type="text" />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input type="email" />
            </div>

            <div>
              <label htmlFor="email">Deals Details</label>
              <textarea />

              <p>
                Please explain which product(s) the deal is for and precisely
                what is being offered e.g. 50% discount, 6 months free.
              </p>
            </div>

            <div>
              <label htmlFor="email">How To Redeem</label>
              <textarea />
              <p>
                Clear redemption details are crucial. You can link to a list of
                credit codes, provide a promo code or give the details for
                emailing someone.
              </p>
            </div>

            <div>
              <label htmlFor="dealtype">Deal Type</label>
              <select name="deal type" id="">
                <option>yoyo</option>
              </select>
            </div>

            <div>
              <label htmlFor="website">Website</label>
              <input type="website" />
            </div>
          </div>
        </div>
      </FormContainer>
    </SubmitDealContainer>
  );
};
