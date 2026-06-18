import React, { useRef, useState,useEffect } from "react";
import  "./chat_board.css"
import Home from "./icons/Home"
import Message from "./icons/Message"
import Notification from "./icons/Notification"
import File from "./icons/File"
import ThreeDots from "./icons/ThreeDots"
import Plus from "./icons/Plus"
import Moon from "./icons/Moon"
import ChatCard from "./ChatCard";
import { createPath } from "react-router-dom";
import Modal from "react-modal";
import ChatMessage from "./ChatMessage"
import { data } from "autoprefixer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ChatBoard(){
    const[workSpaceExpand,setWorkSpaceExpand] = useState(false)
    const[hoverIndex, setHoverIndex] = useState(null)
    const[collapse,setCollapse] = useState([false,false,false,false])
    const[isModalOpen, setIsModalOpen] = useState(false);
    const[step,setStep] = useState(1)
    const[privacy,setPrivacy] = useState("false")
    const[channelName,setChannelName] = useState("")
    const [user, setUser] = useState({})
    const[chatCard,setChatCard] = useState([
        {
 	        text: "Starred",
 	        icon: "fa-regular fa-star",
 	        content:"Drag and drop important stuff here"
 	    },
 	    {
	        text: "Channel",
	        icon: "fa-regular fa-hashtag",
	        content: []
 	    },
 	    {
	        text:"Direct Messages",
	        icon: "fa-solid fa-message",
	        content: [
                {name: undefined, icon:'fa-solid fa-user'},
                {name: 'invite people',icon:'fa-solid fa-plus'}
            ]
 	    },
 	    { 
	        text:"APPS",
	        icon: "fa-solid fa-grip-vertical",
	        content: []
        }
    ])
    const[chatRoom, setChatRoom] = useState({})
    const[messages,setMessages] = useState([])
    const[messageinput, setMessageinput] = useState("")
    const currentRoom = useRef(null)
    const menu_parent = useRef(null)



    useEffect(()=>{
        document.addEventListener("message.received",(event)=>{
            let local_message = [...messages]
            if(event.detail.room === currentRoom.current){
                local_message.push({id:event.detail.id,text:event.detail.message})
                setMessages((prev) => [...prev,
                {
                id: 1,
                text: event.detail.message
                }]);
            }
        })
        fetch("/rooms",()=>{
            method: "GET"
        }).then((response)=>{
            if (response.status != 200){
            }
            return response.json()
        }).then((data)=>{
            setChatCard(prev=>{
                 chat_card_data = [...prev]
                 chat_card_data[1].content = data.rooms.map((room)=>{
                        return ({id:room.id, name:room.name,icon: "fa-regular fa-hashtag"})})
                 return chat_card_data
            })
        })

        fetch("/user_details", {
            method: "GET"
        })
        .then((response) => response.json())
        .then((data) => {
          setUser(data.user);
          setChatCard((prevChatCard) => {
            const updatedChatCard = [...prevChatCard];
            updatedChatCard[2] = {
              ...updatedChatCard[2],
              content: updatedChatCard[2].content.map((directMessage,index) => (
                index ==0 ? {
                ...directMessage,
                name: data.user.first_name
              } : directMessage))

            };
            return updatedChatCard;
          });
  })
  .catch((error) => {
    console.log(error.message);
  });
        }, [])


   const displaySubMenu = (parent_item)=>{
    let data = parent_item.content;
     if (data.length == 0) return
	if (typeof data === "string"){
		return (<p>{data}</p>)
	}
	else{
		 return data.map((item,index) => {
			return(
                <ChatCard onClick = {(e)=>{
                    e.stopPropagation();
                    menu_parent.current =  parent_item.text
                    console.log(menu_parent.current)
                    if ( menu_parent.current === "Channel") {
                         console.log(`open ${item.id} room`)
                          currentRoom.current = item.id
                         setChatRoom({text: item.name,icon:item.icon })
                    }
                    else if (menu_parent.current === "Direct Messages"){
                        if (index==1) return setIsModalOpen(true)
                        setChatRoom({text: item.name,icon:item.icon })
                    }
                }} className = "chat_sub room_id" roomId = {item.id} card = {{text: item.name,icon:item.icon }}/>
            )
		})
	}
   }
   const display_step = ()=>{
    if (step ==1){
       return( <>
        <div className="modal_element">
         <h2>Create Channel</h2>
         <button type="button" onClick={() => setIsModalOpen(false)}>
            <i className="fa-solid fa-xmark"></i>
         </button>
         </div>
         <div id="channel_container">
            <h4>Name</h4>
            <input type="text" name="channel_name" value={channelName} onChange={(e)=>{setChannelName(e.target.value)}}></input>
            <p>
                Channels are where conversations happen around a topic. Use a name that is easy to find and understand.
            </p>

         </div>
        </>)
    }else{
        return(
        <div id="last_step_container">
            <div>
                <input 
                type="radio" 
                name="privacy" 
                id="public" 
                value= "false"
                checked={privacy === "false"}
                onChange={(e) => setPrivacy(e.target.value)}
                />
                <label htmlFor="public">Public</label>
            </div>
            <div>
                <input
                 type="radio"
                  name="privacy" 
                  id="private"  
                  value="true"
                  checked={privacy === "false"}
                  onChange={(e) => setPrivacy(e.target.value)}
                />
                <label htmlFor="private">Private</label>
            </div>
           
        </div>)
    }
   }

    const addMessage = (e)=>{
      e.preventDefault();
      e.stopPropagation();
      let local = [...messages]
      local.push({id:user.id,text:document.getElementById("input_data").value})
      setMessages(local)
      setMessageinput("")
    }

   const submitData =(e)=>{
    e.preventDefault();
    fetch("/rooms",{
        method:'POST',
        headers: {
                "Content-Type": "application/json"
        },
        body: JSON.stringify({ privacy: privacy, name: channelName, group_chat: true})
    }).then((response)=>{
    if (response.ok){
            setIsModalOpen(false)
            return response.json()
        }else if(resoponse.status == 402){
            throw new Error()
        }
    }).then((data)=>{
        let chat_card_data = [...chatCard]
        chat_card_data[1].content.push({id: data.room.id, name: data.room.name, icon: "fa-regular fa-hashtag"})
        setChatCard(chat_card_data)
        setStep(1)
        setChannelName("")
        setPrivacy("false")
    }).catch((error)=>{
        console.log(error.message)
    })
   }

   const sendInvite = (e)=>{
    e.preventDefault()
    fetch("/send_invite",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body:{

        }
    }).then((response)=>{
        if (response.ok){
            setIsModalOpen(false)
            toast.success("Invite sent successfully")
        }else{
            throw new Error("unknown error occured")
        }
    }).catch((error) =>{
        toast.error(error.message)
    })
   }

   const modal_data = ()=>{
    if (menu_parent.current === "Channel"){
        return (<form onSubmit={submitData}>
            {display_step()}
            <div class="modal_element">
                <span>Step {step} of 2</span>
                {step ==1 && <button type="button" onClick={()=>{
                if (step === 2) return;
                setStep(2)}}>Next</button>}
                { step === 2 &&
                    <div id="last_step_button_container">
                        <button type="button" onClick={()=>{setStep(1)}}>Back</button>
                        <button type="submit">Create</button>
                    </div>
                }
            </div>
        </form>)
    }
    else{
        return (<form id="" onSubmit = {sendInvite}>
            <div className="modal_header">
                <h2>Invite People to My workspace</h2>
                <button type="button" onClick={() => setIsModalOpen(false)}>
                   <i className="fa-solid fa-xmark"></i>
                </button>
            </div>
            <div className = "invite modal_main">
               <h4>Email Address</h4>
               <input type="text" placeholder ="Enter Invite user Email @#" onChange ={(e)=>{invite_email.current = e.target.value}}/>
            </div>
            <button>Send</button>
        </form>)
    }
}

    return (
        <div className="container">
            <ToastContainer />
            <header>
                <div id="input_container">
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <input type="text" placeholder = "Search in this workspace"></input>
                </div>
            </header>
            <main>
                <aside>
                    <div id="top">
                        <div onClick={()=>{
                            workSpaceExpand ? setWorkSpaceExpand(false) : setWorkSpaceExpand(true)
                            }}> 
                         <span >My Workspace</span> 
                         <i className="fa-solid fa-chevron-down"></i> 
                        </div>
                        {workSpaceExpand && <div id='workspace_index'>jhjh jhgjhhjh</div>}
				    <hr></hr>
                    </div>
                    <div id ="chat_items_container">
				   {chatCard.map((item, index) => {
					 return(
						<div key ={index} onClick={()=>{
                             setCollapse(prev => {
                                const newItems = [...prev];
                                newItems[index] = !newItems[index]
                                console.log(newItems)
                                return newItems;
                            });
                            }}>
                            <ChatCard 
                                className="chat_items" 
                                card={item} 
                                hover_icon = {
                                <>
                                 {index==1 &&
                                 <div onClick={(e)=>{
                                     e.stopPropagation();
                                    setIsModalOpen(true);
                                    menu_parent.current = "Channel"
                                    }}>
                                    <Plus/>
                                 </div>
                                 }
                                <i className="fa-solid fa-ellipsis-vertical"></i>
                                </>
                              }
                                onMouseLeave = {() => setHoverIndex(null)}
                                onMouseEnter = {() => setHoverIndex(index)}
                                element_hover = {index == hoverIndex}
                            />
                            { !(collapse[index]) && <div className="sub_items">
                                {displaySubMenu(item)}
                                {/* {console.log(item)} */}
                            </div>}
                    
						</div>
					 )
				   })}
                    </div>
				    <div id="below">
				        <hr></hr>
				        <p>Slack works better when you use it together</p>
				    </div>
                </aside>
                <div id ="message_container">
                    <div id="channel_header">
                        <ChatCard className="chat_sub" card = {chatRoom}/>
                        <div id="member_count">
                            <button title="You can check all members in this channel"></button>
                        </div>
                    </div>
                    <ChatMessage user={user.id} messages={messages}/>
                    <div id="message_input">
                        <form onSubmit={addMessage}>
                            <input type="text" id="input_data" value={messageinput} onChange={(e)=>{setMessageinput(e.target.value)}}></input>
                            <div id="send_button">
                              <div>
                                <button disabled={messageinput.length === 0}>
                                    <i className = "fa-solid fa-location-arrow"></i>
                                </button>
                                <div class="divider"></div>
                                <button type="button" disabled={messageinput.length === 0}>
                                    <i  id ="schdule_send" className="fa-solid fa-chevron-down"></i>
                                </button>
                              </div>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
            <nav>
                <section id="regular_section">
                    <Home/>
                    <p>Home</p>
                    <Message/>
                    <p>DMs</p>
                    <Notification/>
                    <p>Activity</p>
                    <File/>
                    <p>Files</p>
                    <ThreeDots/>
                    <p>More</p>
                </section>
                <section id="last_section">
                    <Plus/>
                    <Moon/>
                    <img src="" alt=""></img>
                </section>
            </nav>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                className="custom-modal"
                overlayClassName="custom-overlay"
                >
                {modal_data()}
            </Modal>
        </div>

        
    )
}