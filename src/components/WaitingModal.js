import "../components/Modal.scss";

const WaitingModal = ({ setShowWaitingModal, language }) => {
  const handleBackBtn = () => {
    setShowWaitingModal(() => {
      document.body.style.overflow = "";
      return false;
    });
  };
  return (
    <>
      <div className="modal-background">
        <div className="waiting">
          {language === "EN" ? (
            <h2 className="waiting__title">TBD</h2>
          ) : (
            <h2 className="waiting__title">準備中</h2>
          )}
          <button className="back-btn" onClick={handleBackBtn}>
            Back
          </button>
        </div>
      </div>
    </>
  );
};

export default WaitingModal;
