// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../../components";

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
    <>
      <h1>{id}</h1>
      {isLoading && <h1>Loading.........</h1>}
      <div>
        <h1>{deal?.company_name}</h1>
        <h1>{deal?.title}</h1>
        <h1>{deal?.email}</h1>
        <h1>{deal?.short_description}</h1>
        <h1>{deal?.details}</h1>
        <h1>{deal?.details}</h1>
        <h1>{deal?.redeem_details}</h1>
        <h1>{deal?.website}</h1>
        <h1>{deal?.deal_type}</h1>
      </div>

      <Header />
    </>
  );
};
