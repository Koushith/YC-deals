import { useEffect, useState } from "react";
import { Header } from "../../components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    <>
      {/* <Header /> */}

      <div>
        <h1>All Deals</h1>

        <button onClick={navigateToNewDeal}>Add New Deal</button>

        <div>{isLoading && <h1>Loading.......</h1>}</div>

        {/* title, short desc , deal-type*/}

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
      </div>
    </>
  );
};
