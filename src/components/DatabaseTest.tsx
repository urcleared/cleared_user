import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { DoctorProfile, Profile } from '../lib/supabase';

interface DatabaseTestProps {}

const DatabaseTest: React.FC<DatabaseTestProps> = () => {
  const [connectionStatus, setConnectionStatus] = useState<'testing' | 'connected' | 'error'>('testing');
  const [doctors, setDoctors] = useState<(DoctorProfile & { profile: Profile | null })[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    testDatabaseConnection();
  }, []);

  const testDatabaseConnection = async () => {
    try {
      // Debug: Check Supabase client configuration
      console.log('Supabase URL:', process.env.REACT_APP_SUPABASE_URL);
      console.log('Supabase Key (first 20 chars):', process.env.REACT_APP_SUPABASE_ANON_KEY?.substring(0, 20) + '...');
      
      // Test 1: Basic connection test - check if tables exist
      const { data: usersTest, error: usersError } = await supabase
        .from('users')
        .select('count', { count: 'exact', head: true });

      if (usersError) {
        throw new Error(`Users table not found: ${usersError.message}. Make sure you've run the migration files.`);
      }

      const { data: doctorProfilesTest, error: doctorProfilesError } = await supabase
        .from('doctor_profiles')
        .select('count', { count: 'exact', head: true });

      if (doctorProfilesError) {
        throw new Error(`Doctor profiles table not found: ${doctorProfilesError.message}. Make sure you've run the migration files.`);
      }

      const { data: profilesTest, error: profilesError } = await supabase
        .from('profiles')
        .select('count', { count: 'exact', head: true });

      if (profilesError) {
        throw new Error(`Profiles table not found: ${profilesError.message}. Make sure you've run the migration files.`);
      }

      // Test 2: Simple table query (we'll temporarily disable RLS)
      console.log('About to query doctor_profiles table directly...');
      
      // First try without filter to see if ANY data exists
      const { data: allDoctors, error: allError } = await supabase
        .from('doctor_profiles')
        .select('*');
      
      console.log('ALL doctors (no filter):', allDoctors);
      
      const { data: doctorsData, error: doctorsError } = await supabase
        .from('doctor_profiles')
        .select('*')
        .eq('is_active', true);

      console.log('Doctors query result:', { data: doctorsData, error: doctorsError });

      if (doctorsError) {
        throw new Error(`Failed to fetch doctors: ${doctorsError.message}`);
      }

      console.log('Doctors found:', doctorsData?.length || 0, doctorsData);

      // For now, just use doctors without profiles to test connection
      const doctorsWithProfiles = doctorsData?.map(doctor => ({
        ...doctor,
        profile: { full_name: 'Test Doctor', user_id: doctor.user_id }
      })) || [];

      setDoctors(doctorsWithProfiles);
      setConnectionStatus('connected');
    } catch (err) {
      console.error('Database test failed:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      setConnectionStatus('error');
    }
  };

  const retryConnection = () => {
    setConnectionStatus('testing');
    setError('');
    testDatabaseConnection();
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui' }}>
      <h2>🔗 Database Connection Test</h2>
      
      {/* Connection Status */}
      <div style={{ 
        padding: '15px', 
        marginBottom: '20px', 
        borderRadius: '8px',
        backgroundColor: connectionStatus === 'connected' ? '#d4edda' : 
                        connectionStatus === 'error' ? '#f8d7da' : '#fff3cd'
      }}>
        <strong>Status: </strong>
        {connectionStatus === 'testing' && '🔄 Testing connection...'}
        {connectionStatus === 'connected' && '✅ Connected successfully!'}
        {connectionStatus === 'error' && '❌ Connection failed'}
        
        {error && (
          <div style={{ marginTop: '10px', color: '#721c24' }}>
            <strong>Error:</strong> {error}
            <br />
            <button 
              onClick={retryConnection}
              style={{
                marginTop: '10px',
                padding: '5px 10px',
                backgroundColor: '#007AFF',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Retry Connection
            </button>
          </div>
        )}
      </div>

      {/* Doctors List */}
      {connectionStatus === 'connected' && (
        <div>
          <h3>👨‍⚕️ Available Doctors ({doctors.length})</h3>
          {doctors.length === 0 ? (
            <p style={{ fontStyle: 'italic', color: '#666' }}>
              No doctors found. Make sure you've run the seed data script.
            </p>
          ) : (
            <div style={{ display: 'grid', gap: '15px' }}>
              {doctors.map((doctor) => (
                <div 
                  key={doctor.id}
                  style={{
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    padding: '15px',
                    backgroundColor: '#f9f9f9'
                  }}
                >
                  <h4 style={{ margin: '0 0 10px 0', color: '#007AFF' }}>
                    {doctor.profile?.full_name || 'Unknown Doctor'}
                  </h4>
                  <p><strong>License:</strong> {doctor.license_number}</p>
                  <p><strong>Specialization:</strong> {doctor.specialization.join(', ')}</p>
                  <p><strong>Hospital:</strong> {doctor.hospital_name || 'Not specified'}</p>
                  <p><strong>Fee:</strong> ₩{doctor.consultation_fee.toLocaleString()}</p>
                  <p><strong>Experience:</strong> {doctor.years_of_experience} years</p>
                  {doctor.bio && <p><strong>Bio:</strong> {doctor.bio}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Instructions */}
      <div style={{ 
        marginTop: '30px', 
        padding: '15px', 
        backgroundColor: '#e7f3ff', 
        borderRadius: '8px',
        fontSize: '14px'
      }}>
        <h4>🔧 Setup Instructions:</h4>
        <ol>
          <li>Create a Supabase project at <a href="https://supabase.com" target="_blank" rel="noopener noreferrer">https://supabase.com</a></li>
          <li>Update <code>.env.local</code> with your project URL and anon key</li>
          <li>Run the migration files in your Supabase SQL editor:
            <ul>
              <li><code>supabase/migrations/001_initial_schema.sql</code></li>
              <li><code>supabase/migrations/002_rls_policies.sql</code></li>
            </ul>
          </li>
          <li>Enable PostGIS extension in Database → Extensions</li>
          <li>Optionally run <code>supabase/seed/seed_data.sql</code> for test data</li>
          <li>Restart the React app to load new environment variables</li>
        </ol>
      </div>
    </div>
  );
};

export default DatabaseTest;