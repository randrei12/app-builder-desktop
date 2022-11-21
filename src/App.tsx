import { useState } from 'react';
import TitleBar from './components/titleBar';
import TopBar from './components/topBar';

declare global {
    interface Window {
        electron: any
    }
}

function App() {
  return (
    <>
        <TitleBar />
        <TopBar />
    </>
  );
}

export default App
