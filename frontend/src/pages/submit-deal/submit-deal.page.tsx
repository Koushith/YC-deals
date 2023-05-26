import { useState } from "react";
import { FormContainer, SubmitDealContainer } from "./submit-seal.styles";
import axios from "axios";

const initialState = {
  company: "",
  shortDescription: "",
  email: "",
  dealDetails: "",
  redeemDetails: "",
  dealType: "",
  website: "",
};

export const SubmitDeal = () => {
  const [formData, setFormData] = useState(initialState);

  const formChangeHandler = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const submitHandler = async () => {
    console.log("haha", formData);
    try {
      const res = await axios.post(
        "http://192.168.0.181:8000/deals/submit-deal",
        {
          companyName: formData.company,
          shortDescription: formData.shortDescription,
          email: formData.email,
          dealsDetails: formData.dealDetails,
          redeemDetails: formData.redeemDetails,
          dealType: formData.dealType,
          website: formData.website,
        }
      );

      console.log("res", res);

      if (res.status === 201) {
        //do something
      }
    } catch (error) {
      console.log("something went wrong", error);
    }
  };
  return (
    <SubmitDealContainer>
      <h2>Submit Deal</h2>
      <FormContainer>
        <div>
          <h1>Basic Details</h1>
          <div>
            <div>
              <label htmlFor="title">Company</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={formChangeHandler}
              />
            </div>
            <div>
              <label htmlFor="title">Short Description</label>
              <input
                type="text"
                name="shortDescription"
                value={formData.shortDescription}
                onChange={formChangeHandler}
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={formChangeHandler}
              />
            </div>

            <div>
              <label htmlFor="email">Deals Details</label>
              <textarea
                value={formData.dealDetails}
                name="dealDetails"
                onChange={formChangeHandler}
              />

              <p>
                Please explain which product(s) the deal is for and precisely
                what is being offered e.g. 50% discount, 6 months free.
              </p>
            </div>

            <div>
              <label htmlFor="email">How To Redeem</label>
              <textarea
                value={formData.redeemDetails}
                name="redeemDetails"
                onChange={formChangeHandler}
              />
              <p>
                Clear redemption details are crucial. You can link to a list of
                credit codes, provide a promo code or give the details for
                emailing someone.
              </p>
            </div>

            <div>
              <label htmlFor="dealtype">Deal Type</label>
              <select
                id=""
                value={formData.dealType}
                name="dealType"
                onChange={formChangeHandler}
              >
                <option>yoyo</option>
              </select>
            </div>

            <div>
              <label htmlFor="website">Website</label>
              <input
                type="website"
                name="website"
                value={formData.website}
                onChange={formChangeHandler}
              />
            </div>
            <button onClick={submitHandler}>Submit Deal</button>
          </div>
        </div>
      </FormContainer>
    </SubmitDealContainer>
  );
};
