import { useState } from "react";
import { FormContainer, SubmitDealContainer } from "./submit-seal.styles";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button, Input, RichTextEditor } from "../../components/primitives";

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
  const [dealSetaus, setDealStatus] = useState("");

  const [dealDetails, setDealDetails] = useState("");
  const [redeemDetails, setRedeemDetails] = useState("");

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
          dealsDetails: dealDetails,
          redeemDetails: redeemDetails,
          dealType: formData.dealType,
          website: formData.website,
        }
      );

      console.log("res", res);

      if (res.status === 201) {
        //do something
        setDealStatus("Deal Submitted Successfully");
        setDealDetails("");
        setRedeemDetails("");
        setFormData(initialState);
      }
    } catch (error) {
      console.log("something went wrong", error);
    }
  };
  return (
    <SubmitDealContainer>
      <h2 className="heading">Submit Deal</h2>
      <FormContainer>
        <div className="basic">
          <Input label="Company Name" placeholder="Enter Company Name" />
          <Input label="Email" placeholder="johndoe@domain.com" />
          <Input label="Website" placeholder="www.domain.com" />
        </div>

        <div className="deal-info">
          <RichTextEditor label="Deal Details" />

          <RichTextEditor label="Redeem Details" />

          <Input type="text" label="Deal Type" placeholder="Promotion" />
        </div>

        <Button label="Submit Deal" />
      </FormContainer>
      {/* <FormContainer>
        <div>
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
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={formChangeHandler}
              />
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
            <div>
              <label htmlFor="title">Short Description</label>
              <input
                value={formData.shortDescription}
                name="shortDescription"
                onChange={formChangeHandler}
              />
            </div>

            <div>
              <label htmlFor="email">Deals Details</label>

              <ReactQuill
                theme="snow"
                value={shortDescription}
                onChange={setShortDescription}
              />

              <p>
                Please explain which product(s) the deal is for and precisely
                what is being offered e.g. 50% discount, 6 months free.
              </p>
            </div>

            <div>
              <label htmlFor="email">How To Redeem</label>
              <ReactQuill
                theme="snow"
                value={redeemDetails}
                onChange={setRedeemDetails}
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

            <button onClick={submitHandler}>Submit Deal</button>
          </div>

          {dealSetaus.length > 0 && <h1>{dealSetaus}</h1>}
        </div>
      </FormContainer> */}
    </SubmitDealContainer>
  );
};
