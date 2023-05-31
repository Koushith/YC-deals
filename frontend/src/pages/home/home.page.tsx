import { useEffect, useState } from "react";
import { DealCard, Header } from "../../components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { HomePageContainer, TitleContainer } from "./home.styles";
import { DealShimmer } from "../../components/deal-card/deal-card.shimmer";

export const HomePage = () => {
  const [deals, setDeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  console.log("deals", deals.length);
  const navigate = useNavigate();

  const fetchAllDeals = async () => {
    try {
      setIsLoading(true);

      const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/deals`);
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
    </HomePageContainer>
  );
};
