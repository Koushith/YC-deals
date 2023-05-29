/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck

import { useNavigate } from "react-router-dom";
import { CardContainer } from "./deal-card.styles";
import { Button, Shimmer } from "../primitives";
import { DealShimmer, Test } from "./deal-card.shimmer";

export const DealCard = (props: any) => {
  const { deal, isLoading = false } = props;

  const navigate = useNavigate();

  const navigateToDealDetail = (id: number) => {
    navigate(`/deal-detail/${id}`);
  };
  return (
    <CardContainer>
      <div className="left">
        <img
          src="https://ph-files.imgix.net/28555106-99db-4ebf-9cfd-13a65db9d2d6.png?auto=compress&codec=mozjpeg&cs=strip&auto=format&w=80&h=80&fit=crop&bg=0fff&dpr=1"
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
      <div>
        <Button
          label="View Deal"
          onClick={() => navigateToDealDetail(deal?.id)}
        />
      </div>
    </CardContainer>
  );
};
