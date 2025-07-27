import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AppointmentModal.css';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AppointmentModal: React.FC<AppointmentModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>진료 예약</h2>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="modal-body">
          <p>예약 날짜와 시간을 선택해주세요.</p>
          <div className="appointment-form">
            <div className="form-group">
              <label>날짜 선택</label>
              <input type="date" className="date-input" />
            </div>
            <div className="form-group">
              <label>시간 선택</label>
              <select className="time-select">
                <option>09:00</option>
                <option>10:00</option>
                <option>11:00</option>
                <option>14:00</option>
                <option>15:00</option>
                <option>16:00</option>
              </select>
            </div>
          </div>
          <button className="confirm-button">예약 확인</button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentModal;