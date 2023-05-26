import { useEffect, useState } from "react";
import { DealCard, Header } from "../../components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { HomePageContainer, TitleContainer } from "./home.styles";

export const HomePage = () => {
  const [deals, setDeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const fetchAllDeals = async () => {
    try {
      setIsLoading(true);

      const { data } = await axios.get("http://192.168.0.181:8000/deals");
      setDeals(data?.allDeals);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllDeals();
  }, []);

  const navigateToDealDetail = (id: number) => {
    navigate(`/deal-detail/${id}`);
  };

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
        <DealCard />
        <DealCard />
        <DealCard />
        <DealCard />
        <DealCard />
        <DealCard />
        <DealCard />
        <DealCard />
      </div>

      {/* <div>
        <h1>All Deals</h1>

        <button onClick={navigateToNewDeal}>Add New Deal</button>

        <div>{isLoading && <h1>Loading.......</h1>}</div>


        {deals.map((deal: any) => (
          <div key={deal?.id}>
            <h1>{deal?.company_name}</h1>
            <h1>{deal?.short_description}</h1>
            <h1>{deal?.deal_type}</h1>

            <button onClick={() => navigateToDealDetail(deal?.id)}>
              Claim Deal
            </button>
          </div>
        ))}
      </div> */}
    </HomePageContainer>
  );
};
