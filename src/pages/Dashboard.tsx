import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DoctorProfile from '../components/DoctorProfile';
import AppointmentModal from '../components/AppointmentModal';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setIsModalOpen(params.get('modal') === 'book-appointment');
  }, [location.search]);

  const handleOpenModal = () => {
    navigate('?modal=book-appointment', { replace: true });
  };

  const handleCloseModal = () => {
    navigate('', { replace: true });
  };

  return (
    <>
      <div className="content-section">
        <DoctorProfile onBookAppointment={handleOpenModal} />
        <div className="mock-card">
          <h3>Next Appointment</h3>
          <p>Dr. 김의사 - Tomorrow 2:00 PM</p>
        </div>
        <div className="mock-card">
          <h3>Recent Activity</h3>
          <p>Blood test completed - 3 days ago</p>
        </div>
        <div className="mock-card">
          <h3>Health Summary</h3>
          <p>All vitals normal</p>
        </div>
        {/* Add lots of content to test scrolling */}
        {Array.from({ length: 20 }, (_, i) => (
          <div key={i} className="mock-card">
            <h4>Sample Content {i + 1}</h4>
            <p>
              This is sample content to test the sticky navigation behavior
              when scrolling.
            </p>
          </div>
        ))}
      </div>
      <AppointmentModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default Dashboard;