type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  t: {
    headline: string;
    description: string;
    note: string;
    cta: string;
  };
};

function Modal({ isOpen, onClose, t }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>{t.headline}</h3>

        <p>{t.description}</p>
        <p className="modal-note">{t.note}</p>

        <button
          className="button-primary"
          onClick={onClose}
        >
          {t.cta}
        </button>
      </div>
    </div>
  );
}


export default Modal;
