import { CardContainer } from "./deal-card.styles";

export const DealCard = () => {
  return (
    <CardContainer>
      <div className="left">
        <img
          src="https://ph-files.imgix.net/28555106-99db-4ebf-9cfd-13a65db9d2d6.png?auto=compress&codec=mozjpeg&cs=strip&auto=format&w=80&h=80&fit=crop&bg=0fff&dpr=1"
          alt="company-logo"
        />
        <div className="deal-info">
          <h2 className="deal-title">Free Credits worth xxxx</h2>
          <p className="deal-shortdesc">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis,
            quod?
          </p>
          <p className="website">www.koushith.com</p>
        </div>
      </div>

      <button>View Deal</button>
    </CardContainer>
  );
};
