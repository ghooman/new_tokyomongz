import partners from "../assets/images/partners.png";
import "../styles/Partners.scss";

const Partners = () => {
  return (
    <>
      <div className="partners">
        <h1 className="partners__title">Partners</h1>
        <div className="partners__img">
          <img src={partners} alt="partners" />
        </div>
      </div>
    </>
  );
};

export default Partners;
