import React from 'react';

const Records: React.FC = () => {
  return (
    <div className="content-section">
      <h2>진료기록</h2>
      <p>진료 기록, 검사 결과, 처방전을 확인할 수 있습니다.</p>
      <div className="mock-card">
        <h3>Recent Lab Results</h3>
        <p>Blood Test - Normal values</p>
      </div>
      <div className="mock-card">
        <h3>Prescriptions</h3>
        <p>Vitamin D supplement - Take daily</p>
      </div>
      <div className="mock-card">
        <h3>Visit History</h3>
        <p>Last visit: 2024-01-15</p>
      </div>
      {/* Add lots of content to test scrolling */}
      {Array.from({ length: 15 }, (_, i) => (
        <div key={i} className="mock-card">
          <h4>Medical Record {i + 1}</h4>
          <p>
            This is sample medical record content to test the sticky
            navigation behavior.
          </p>
        </div>
      ))}
    </div>
  );
};

export default Records;