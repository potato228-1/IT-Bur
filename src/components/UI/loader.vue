<template>
    <div id="preloader">
      <div id="loader"></div>
      <div id="loading-text">Загрузка<span id="dots"></span></div>
    </div>
  </template>
  
  <style>
  #preloader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 24px;
    background-color: #1a202c;
    z-index: 1000;
  }
  
  #loader {
    display: block;
    position: relative;
    width: 150px;
    height: 150px;
    margin-bottom: 20px;
    border-radius: 50%;
    border: 3px solid transparent;
    border-top-color: #4299e1;
    animation: spin 2s linear infinite;
  }
  
  #loader:before {
    content: "";
    position: absolute;
    top: 5px;
    left: 5px;
    right: 5px;
    bottom: 5px;
    border-radius: 50%;
    border: 3px solid transparent;
    border-top-color: #0089fa;
    animation: spin 3s linear infinite;
  }
  
  #loader:after {
    content: "";
    position: absolute;
    top: 15px;
    left: 15px;
    right: 15px;
    bottom: 15px;
    border-radius: 50%;
    border: 3px solid transparent;
    border-top-color: #4299e1;
    animation: spin 1.5s linear infinite;
  }
  
  #loading-text {
    display: flex;
    align-items: center;
    font-family: Arial, sans-serif;
    font-weight: bold;
  }
  
  #dots::after {
    content: '';
    display: inline-block;
    width: 40px; 
    vertical-align: bottom;
    animation: dot-blink 2s infinite;
  }
  
  @keyframes dot-blink {
    0%   { content: ''; }
    25%  { content: '.'; }
    50%  { content: '..'; }
    75%  { content: '...'; }
    100% { content: ''; }
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  </style>