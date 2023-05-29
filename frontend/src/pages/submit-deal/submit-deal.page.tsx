import { useState } from "react";
import { FormContainer, SubmitDealContainer } from "./submit-seal.styles";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  Button,
  GoBack,
  Input,
  RichTextEditor,
} from "../../components/primitives";
import { toast } from "react-hot-toast";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const [isLoading, setIsLoading] = useState(false);
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
        toast("Deals Submitted Successfully !");
      }
    } catch (error) {
      console.log("something went wrong", error);
    }
  };

  const notify = () => {
    toast("Wow so easy !");
  };
  return (
    <SubmitDealContainer>
      <GoBack />
      <h2 className="heading">Submit Deal</h2>
      {/* <button onClick={notify}>Toast</button> */}
      <FormContainer>
        <div className="basic">
          <Input
            label="Company Name"
            name="company"
            value={formData.company}
            placeholder="Enter Company Name"
            onChange={formChangeHandler}
          />
          <Input
            label="Email"
            value={formData.email}
            name="email"
            placeholder="johndoe@domain.com"
            onChange={formChangeHandler}
          />
          <Input
            label="Website"
            placeholder="www.domain.com"
            name="website"
            value={formData.website}
            onChange={formChangeHandler}
          />
        </div>

        <div className="deal-info">
          <Input
            label="Short Description About Deal"
            placeholder="Free credits upto $200 for ..."
            name="shortDescription"
            value={formData.shortDescription}
            onChange={formChangeHandler}
          />
          <div>
            <RichTextEditor
              label="Deal Details"
              value={dealDetails}
              onChange={setDealDetails}
            />
            <p className="deal-helper-text">
              Please explain which product(s) the deal is for and precisely what
              is being offered e.g. 50% discount, 6 months free.
            </p>
          </div>

          <div>
            <RichTextEditor
              label="Redeem Details"
              value={redeemDetails}
              onChange={setRedeemDetails}
            />
            <p className="deal-helper-text">
              Clear redemption details are crucial. You can link to a list of
              credit codes, provide a promo code or give the details for
              emailing someone.
            </p>
          </div>

          <Input
            type="text"
            label="Deal Type"
            placeholder="Promotion"
            name="dealType"
            value={formData.dealType}
            onChange={formChangeHandler}
          />
        </div>

        <Button label="Submit Deal" onClick={submitHandler} />
      </FormContainer>
      <ToastContainer
      // position="top-right"
      // autoClose={5000}
      // hideProgressBar={false}
      // newestOnTop={false}
      // closeOnClick
      // rtl={false}
      // pauseOnFocusLoss
      // draggable
      // pauseOnHover
      // theme="dark"
      />

      {dealSetaus.length > 0 && <h1>Deals Submitted successfully</h1>}
    </SubmitDealContainer>
  );
};
