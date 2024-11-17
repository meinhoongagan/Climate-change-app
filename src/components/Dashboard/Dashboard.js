import React from 'react';
import '../Dashboard/Dashboard.css';
import FeatherIcon from 'feather-icons-react';

const Dashboard = () => {
  return (
    <div className='dashboard'>
      <div className='sidebar'>
        <div className='details'>
        <p className='profile'>Climate App</p>
          <div className='photo'>
            <img src="https://images.pexels.com/photos/4974360/pexels-photo-4974360.jpeg?auto=compress&cs=tinysrgb&w=600" alt="User Profile" className="profile-pic" />
            <button className='photo-icon'><FeatherIcon icon="edit"/></button>       
          </div>
          <div className='info'>
            <button className='info-icon'><FeatherIcon icon="edit" /></button>
            <p className='name'>John Doe</p>
            <p className='email'>john.doe@example.com<br/>
            New York, USA</p>
          </div>
          <div className='dash'></div>
        </div>
        <div className='logout'>
            <button className='logout-button'>
              <p>LogOut</p>
              <FeatherIcon icon="log-out" color ='crimson' size={20}/>
            </button>
        </div>
      </div>

      <div className='activities'>
        <div className='stats'>
          <h2>Your Eco Score</h2>
          <div className='eco-score'>
            <div className='scoremeter'>
                  <div className='white'>60</div>
                  <div className='red'></div>
                  <div className='orange'></div>
                  <div className='yellow'></div>
                  <div className='lightgreen'></div>
                  <div className='green'></div>
            </div>
            <p className='compli'>Keep It Up!!</p>
            <p>Note: The color of the score will change from red to green as you score more.</p>
          </div>
        </div>

        <div className='statistics'>
      <div className="card">
          <h2>
            <FeatherIcon icon="bar-chart-2" size={20}/>
             Statistics
          </h2>
          <p>Track your climate impact statistics here.</p>
        </div>
        <div className="card">
          <h2>
            <FeatherIcon icon="activity" size={20}/>
             Activities
          </h2>
          <p>See your recent eco-friendly activities and updates.</p>
        </div>
        <div className="card">
          <h2>
            <FeatherIcon icon="book" size={20}/>
             Resources
          </h2>
          <p>Access useful resources and tools to live a greener lifestyle.</p>
        </div>
      </div>
      </div>

      
    </div>
  );
};

export default Dashboard;