import React from 'react';
import Image from "../Image/Logomain (1).png";
import UnderLine from "../Image/undeline (1).png"
import "./Style.css";
import "./header.css"
export const Header = () => {
  return (
    <div className='my-element'>
      <img className='imageHeader' src={Image} alt="Bot AI" />
      <h2 className="headerText">AI based free tools to help you write...</h2>
      <img className='' src={UnderLine} alt="Bot AI" />
     
    </div>
  )
}
