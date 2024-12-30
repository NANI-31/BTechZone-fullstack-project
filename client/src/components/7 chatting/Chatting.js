import ChatBody from './Chatbody';
import Groups from './Groups';
import './chatting.css';
function Chatting() {
  return (
    <>
      <div className="chatting-container">
        <Groups />
        <ChatBody />
        {/* <CreatePlus /> */}
        {/* <i className="fas fa-circle-plus"></i> */}
        {/* <div></div> */}
      </div>
    </>
  );
}

export default Chatting;
