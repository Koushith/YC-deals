/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck

import { useNavigate } from "react-router-dom";
import { CardContainer } from "./deal-card.styles";
import { Button, Shimmer } from "../primitives";
import { DealShimmer, Test } from "./deal-card.shimmer";

export const DealCard = (props: any) => {
  const { deal } = props;

  const navigate = useNavigate();

  const navigateToDealDetail = (id: number) => {
    // navigate(`/deal-detail/${id}`);
    navigate("claim-deal", {
      state: {
        dealId: id,
      },
    });
  };
  return (
    <CardContainer>
      <div className="left">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcF5cMoocGXwUQCvZYa5Vd_5cSynczdUpVWA"
          alt="company-logo"
        />
        <div className="deal-info">
          <h2 className="deal-title">{deal?.company_name}</h2>
          <div>
            <p className="deal-shortdesc">{deal?.short_description}</p>
          </div>
          <p className="website">{deal?.website}</p>
        </div>
      </div>

      <Button
        label="View Deal"
        onClick={() => navigateToDealDetail(deal?.id)}
        className="btn"
      />
    </CardContainer>
  );
};
