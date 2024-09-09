import React, { useEffect } from 'react';
import { StyleModeProvider } from './context/StyleModeProvider';
import { BrowserRouter } from "react-router-dom";
import axios from 'axios';

import Sidebar from './components/Sidebar';
import StyleSwitcher from './components/StyleSwitcher';
import Page from './pages';

import './App.scss';
import Background from './components/Background';

const App = () => {
  const sendMessageToMe = async () => {
    try {
      // Fetch geolocation data
      const response = await axios.get('https://ipinfo.io/json?token=9579673546a73e');
      const { country, city, region, ip: ipAddress } = response.data;
  
      // Get current date and time
      const currentDate = new Date();
      const dateString = `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()} ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
  
      // Prepare the flag URL
      const flag = `https://flagsapi.com/${country}/shiny/64.png`;
  
      // Prepare the message payload
      const params = {
        username: dateString,
        avatar_url: flag,
        embeds: [
          {
            color: 65280,
            title: "Portfolio News",
            description: `**City: **\`${city}\`**\nState: **\`${region}\`\nCountry: **\`${country}\`**\nIP Address: **\`${ipAddress}\`**`,
          },
        ],
      };
  
  
      // Send the payload to the Discord webhook
      const request = new XMLHttpRequest();
      request.open("POST", "https://discord.com/api/webhooks/1033534572060745779/k-4Oz4IOPNF174Ty7UYdWtwI3q12Ltjd4KPh9GOumuaF2oVWUb61syo88p1KiTBPbj_W");
      request.setRequestHeader("Content-type", "application/json");
      request.send(JSON.stringify(params));
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
  
  useEffect(() => {
    sendMessageToMe();
  }, []);

  return (
    <div className="App">
      <Background />
      <BrowserRouter>
        <StyleModeProvider>
          <Sidebar />
          <Page />
          <StyleSwitcher />
        </StyleModeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
