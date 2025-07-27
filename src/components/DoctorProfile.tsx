import React from 'react';
import './DoctorProfile.css';

const DoctorProfile: React.FC = () => {
  return (
    <div className="doctor-profile">
      <div className="doctor-profile-content">
        <div className="doctor-info">
          <h3 className="section-title">내 주치의</h3>
          <p className="hospital-name">연세장튼튼의원</p>
          <h4 className="doctor-name">장윤희 의사</h4>
          <p className="consultation-info">내과 전문의</p>
          <p className="consultation-hours">월~금 9:00 ~ 17:00</p>
          <button className="change-doctor-btn">의사 변경하기</button>
        </div>
        <div className="doctor-image">
          <img src="/doctor-photo.jpg" alt="장윤희 의사" />
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;