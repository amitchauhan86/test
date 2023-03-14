import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBIcon,
  MDBTextArea,
  MDBCardFooter,
} from "mdb-react-ui-kit";
import "./Style.css";
import ChatLogo from "../Image/chatlogo.png";
import Footer from "./Footer";

const ChatbotComponent = () => {
  return (
    <div>
      <MessageList />
    </div>
  );
};

const MessageList = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [topics, setTopics] = useState([]);
  
  // const [message, setMessage] = useState("");

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };
  const Datasend =()=>{
    axios.post("http://localhost:8080/message", { message })
    .then((response) => {
         console.log(response.data, "hhhhhhhhhhhhhhhhhhh");
         if (message === "create") {
           const newMessages = response.data.map((data) => ({
             text: data.message,
             isUser: false,
           }));
           setMessages((prevMessages) => [...prevMessages,{ text: message, isUser: false }, ...newMessages]);
         } else {
           setMessages((prevMessages) => [
             ...prevMessages,
             { text: message, isUser: false },
             { text: response.data, isUser: true }, { text: "Question ?????????", isUser: true },
           ]);
         }
       })
       .catch((error) => console.error(error));
     setMessage("");
  }

  useEffect(()=>{
    axios .get("http://localhost:9000/api/topics")
    .then((response) => {
         setTopics(response?.data)
       })
       .catch((error) => console.error(error));
  },[])

  const topicsDataMap = topics.topics?.map(topic => {
    const key = Object?.keys(topic)[0]; // Get the first key of the topic object
    return {
      // name: key,
      message: topic[key].message,
      id: topic[key].id
    };
  });
  
  // console.log(topicsDataMap,"alll");
    
  // console.log(topics,'topics')

  const handleSubmit = () => {
    Datasend()
  };

const Buttondatasend=(id)=>{
  console.log(id,"id??????????")
  // Datasend(data)
  // setMessage(data)
}
  console.log(messages, "mesShow data ???????sage");
  return (
    <>
      <MDBContainer className="py-5">
        <MDBRow className="d-flex justify-content-center">
          <MDBCol md="8" lg="6" xl="10">
            <MDBCard id="chat1" style={{ borderRadius: "15px" }}>
              <MDBCardBody>
                <div className="d-flex flex-row justify-content-start mb-4">
                  <>
                    <img className="ChatLogo" src={ChatLogo} alt="Bot AI" />
                    <div
                      className="p-3 ms-3"
                      style={{
                        borderRadius: "15px",
                        backgroundColor: "#F4F4F4",
                      }}
                    >
                      <p className="small mb-0">What do you Want to write ?</p>
                    </div>
                    
                  </>
                </div>
                <div className="d-flex flex-row justify-content-start mb-4">
               {
                topicsDataMap?.map((i,k)=>{
                return(
                  <div className="optiontype" key={k}>
                   <button type="button" className="btn btn-primary" onClick={()=> Buttondatasend(i.id)}>{i.message}</button>
                 </div>
                )
                })
               } 
               </div>

            
                <div className="d-flex flex-column mb-4">
                  {messages.map((i, k) => {
                    const messageClass = i.isUser ? "left-chat" : "right-chat";
                    return (
                      <div
                        key={k}
                        className={`d-flex flex-row justify-content-${
                          i.isUser ? "start" : "end"
                        } ${messageClass}`}
                      >
                       
                          {i.isUser && (
                          <img
                            className="ChatLogo"
                            src={ChatLogo}
                            alt="Bot AI"
                          />
                        )}
                        <div
                          className="p-3 ms-3 me-3 border"
                          style={{
                            borderRadius: "15px",
                            backgroundColor: i.isUser ? "#F4F4F4" : "#01AAE9",
                          }}
                        >
                          <p className="small mb-0">{i.text}</p>
                        </div>
                      
                      </div>
                    );
                  })}
                </div>
              </MDBCardBody>
              {/*  */}
              <MDBCardFooter className="text-muted d-flex justify-content-start align-items-center p-3 ">
                <img className="ChatLogo" src={ChatLogo} alt="Bot AI" />
                <input
                  type="text"
                  className="form-control form-control-lg"
                  id="exampleFormControlInput1"
                  placeholder="Type message"
                  value={message}
                  onChange={handleInputChange}
                  // onChange={(event) => setMessage(event.target.value)}
                ></input>
                <div onClick={handleSubmit} className="pipeline">
                  <MDBIcon fas icon="paper-plane" />
                </div>
              </MDBCardFooter>

              {/* ///// */}
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <Footer />
    </>
  );
};

export default ChatbotComponent;
