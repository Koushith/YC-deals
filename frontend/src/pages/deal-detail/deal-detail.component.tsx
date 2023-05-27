// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  DealDetailContainer,
  RichTextEditorContainer,
} from "./deal-detail.styles";

export const DealDetailPage = () => {
  const [deal, setDeal] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  const fetchDealDetail = async () => {
    setIsLoading(true);

    try {
      const { data } = await axios.get(`http://192.168.0.181:8000/deals/${id}`);
      console.log(data);
      setDeal(data?.deal);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDealDetail();
  }, [id]);
  return (
    <DealDetailContainer>
      <div className="company-info">
        <div className="logo">
          <img
            src="https://bookface-images.s3.amazonaws.com/small_logos/51751ec37409c68b5631b0d6db9257266c5787af.png"
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
    </DealDetailContainer>
  );
};
