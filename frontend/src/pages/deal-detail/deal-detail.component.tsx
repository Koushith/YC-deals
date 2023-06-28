// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  DealDetailContainer,
  RichTextEditorContainer,
} from "./deal-detail.styles";
import { GoBack } from "../../components/primitives";
import { DealDeailsShimmer } from "./deal-detail.shimmer";
import { BACKEND_API_ENDPOINT } from "../../utils";
import dealIcon from "./../../assets/icons/deal.png";

export const DealDetailPage = () => {
  const [deal, setDeal] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();

  const fetchDealDetail = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `${BACKEND_API_ENDPOINT}/deals/${location?.state?.dealID}`
      );
      console.log(data);
      setDeal(data?.deal);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDealDetail();
  }, [location?.state?.dealID]);

  return (
    <DealDetailContainer>
      <GoBack />
      {isLoading ? (
        <DealDeailsShimmer />
      ) : (
        <>
          <div className="company-info">
            <div className="logo">
              <img
                src={deal?.company_logo ? deal?.company_logo : dealIcon}
                alt="logo"
              />
            </div>

            <div className="info">
              <h2>{deal?.company_name}</h2>
              <p className="title">{deal?.short_description}</p>
              <div className="meta-info">
                <p className="website">{deal?.website} |</p>
                <p className="website">{deal?.deal_type}</p>
              </div>
            </div>
          </div>

          <RichTextEditorContainer
            className="redeem-detail"
            dangerouslySetInnerHTML={{ __html: deal?.deals_details }}
          />

          <RichTextEditorContainer
            className="redeem-detail"
            dangerouslySetInnerHTML={{ __html: deal?.redeem_details }}
          />
        </>
      )}
    </DealDetailContainer>
  );
};
