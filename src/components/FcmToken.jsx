import React, { useEffect } from 'react';
import { getMessaging, getToken } from 'firebase/messaging';
import { messaging } from '../assets/firebase';
import axios from 'axios';

const FcmToken = ({ setFcmToken }) => {
  useEffect(() => {
    console.log('FcmToken component mounted');
    console.log('setFcmToken prop:', setFcmToken);

    const requestNotificationPermission = async () => {
      try {
        // Check if setFcmToken is a function
        if (typeof setFcmToken !== 'function') {
          console.error('setFcmToken is not a function:', setFcmToken);
          return;
        }

        // Check if the browser supports notifications
        if (!('Notification' in window)) {
          console.error('This browser does not support notifications');
          return;
        }

        // Check if the browser supports service workers
        if (!('serviceWorker' in navigator)) {
          console.error('This browser does not support service workers');
          return;
        }

        // Request permission
        const permission = await Notification.requestPermission();
        console.log('Notification permission:', permission);

        if (permission === 'granted') {
          try {
            // Register service worker
            const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
            console.log('Service Worker registered:', registration);

            // Get messaging instance
            const messaging = getMessaging();
            console.log('Messaging instance:', messaging);

            // Get token
            const token = await getToken(messaging, {
              vapidKey: 'BK7B4zd_8eNSt4RPICi3CCuH5RZOXxL1nLA8w1JJKa8WaiHqQqAu62dja5khhdOShMYhcDYCj6SqxiQH1LLecss',
              serviceWorkerRegistration: registration
            });
            
            console.log('FCM Token:', token);
            
            if (token) {
              console.log('Calling setFcmToken with token:', token);
              setFcmToken(token);

              // Test topic subscription
              try {
                // Send a test notification to the topic
                const response = await axios.post('https://fcm.googleapis.com/fcm/send', {
                  to: '/topics/stock_alerts',
                  notification: {
                    title: 'Test Notification',
                    body: 'This is a test notification for stock_alerts topic'
                  }
                }, {
                  headers: {
                    'Authorization': 'key=YOUR_SERVER_KEY', // Replace with your Firebase Server Key
                    'Content-Type': 'application/json'
                  }
                });
                console.log('Test notification sent:', response.data);
              } catch (error) {
                console.error('Error sending test notification:', error);
              }
            } else {
              console.error('Failed to get FCM token');
            }
          } catch (error) {
            console.error('Error in FCM setup:', error);
          }
        } else {
          console.log('Notification permission denied');
        }
      } catch (error) {
        console.error('Error requesting notification permission:', error);
      }
    };

    requestNotificationPermission();
  }, [setFcmToken]);

  return null; // This is a utility component, no UI needed
};

export default FcmToken;    