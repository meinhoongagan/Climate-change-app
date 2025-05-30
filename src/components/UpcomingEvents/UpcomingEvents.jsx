import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './UpcomingEvents.css'
const UpcomingEvents = () => {
  useEffect(()=>{
    AOS.init({
      duration: 1200, // Animation duration
    });
  },[])
  return (
    <div className="events-container">
      <section id="events" className="events-section" data-aos="fade-up">
        <h2>Upcoming Climate Events and Policies</h2>
        <ul>
          <li>
            <strong>Global Climate Summit</strong> - September 15-17, 2024
          </li>
          <li>
            <strong>World Clean-Up Day</strong> - September 18, 2024
          </li>
          <li>
            <strong>Launch of Green Energy Initiative</strong> - October 1, 2024
          </li>
          <li>
            <strong>Renewable Energy Policy Discussion Forum</strong> - October 10, 2024
          </li>
          <li>
            <strong>Climate Action Awareness Campaign</strong> - November 5-11, 2024
          </li>
          <li>
            <strong>International Day for the Preservation of the Ozone Layer</strong> - November 16, 2024
          </li>
        </ul>
      </section>
      <section id="videos" className="videos-section" data-aos="fade-up">
        <h2>Educational Videos</h2>
        <ul>
          <li>
            <strong>Video: </strong><a href="https://www.youtube.com/watch?v=VrzbRZn5Ed4" target="_blank" rel="noopener noreferrer">The Story of Stuff: Climate Change, Consumption, and the Economy</a>
          </li>
          <li>
            <strong>Video: </strong><a href="https://www.youtube.com/watch?v=ixC2NN9pkIo" target="_blank" rel="noopener noreferrer">Greta Thunberg's Powerful Speech on Climate Change</a>
          </li>
          <li>
            <strong>Video: </strong><a href="https://www.youtube.com/watch?v=QbdrOQPp7uY" target="_blank" rel="noopener noreferrer">David Attenborough: A Life On Our Planet</a>
          </li>
        </ul>
      </section>
      <section id="articles" className="articles-section" data-aos="fade-left">
        <h2>Informative Articles</h2>
        <ul>
          <li>
            <strong>Article: </strong><a href="https://www.nytimes.com/2024/06/01/climate/climate-change-united-nations.html" target="_blank" rel="noopener noreferrer">United Nations Report: Urgent Action Needed to Combat Climate Change</a>
          </li>
          <li>
            <strong>Article: </strong><a href="https://www.theguardian.com/environment/2024/jun/01/climate-change-what-we-know-and-how-we-know-it" target="_blank" rel="noopener noreferrer">Climate Change: What We Know and How We Know It</a>
          </li>
          <li>
            <strong>Article: </strong><a href="https://time.com/6072146/climate-change-mental-health/" target="_blank" rel="noopener noreferrer">How Climate Change Is Affecting Mental Health</a>
          </li>
        </ul>
      </section>
      <section id="blogs" className="blogs-section" data-aos="fade-right">
        <h2>Insightful Blogs</h2>
        <ul>
          <li>
            <strong>Blog: </strong><a href="https://www.greenpeace.org/international/story/25341/5-reasons-why-climate-change-is-a-human-rights-issue/" target="_blank" rel="noopener noreferrer">5 Reasons Why Climate Change Is a Human Rights Issue</a>
          </li>
          <li>
            <strong>Blog: </strong><a href="https://www.climatecentral.org/news/how-climate-change-affects-the-economy-forests-and-our-health-2024" target="_blank" rel="noopener noreferrer">How Climate Change Affects the Economy, Forests, and Our Health</a>
          </li>
          <li>
            <strong>Blog: </strong><a href="https://www.nrdc.org/stories/how-climate-change-affecting-food" target="_blank" rel="noopener noreferrer">How Climate Change Is Affecting Food</a>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default UpcomingEvents;
