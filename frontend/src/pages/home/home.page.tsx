// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { useEffect, useState } from "react";
import { DealCard, Header } from "../../components";
import { useNavigate } from "react-router-dom";
import { HomePageContainer, TitleContainer } from "./home.styles";
import { DealShimmer } from "../../components/deal-card/deal-card.shimmer";
import DealIcon from "../../assets/icons/deal.svg";
import axios from "axios";
import { BACKEND_API_ENDPOINT } from "../../utils";
import amplitude from "amplitude-js";

export const HomePage = () => {
  const [deals, setDeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchAllDeals = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`${BACKEND_API_ENDPOINT}/deals`);
      setDeals(data?.allDeals);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllDeals();
  }, []);

  const navigateToNewDeal = () => {
    navigate("submit-deal");
  };

  return (
    <HomePageContainer>
      <TitleContainer>
        <h1>Welcome to YC Deals</h1>
        <p>
          The place to Submit and discover new Deals for any YC Alum.{" "}
          <span onClick={navigateToNewDeal}>Submit New Deal?</span>
        </p>
      </TitleContainer>

      <div className="deals-container">
        {isLoading && <DealShimmer />}
        {deals.map((deal: any) => (
          <DealCard key={deal.id} deal={deal} />
        ))}
      </div>

      {deals.length <= 0 && !isLoading && (
        <div className="no-deals-found">
          <img src={DealIcon} />
          <h1>No Deals Found.. </h1>
        </div>
      )}
    </HomePageContainer>
  );
};
