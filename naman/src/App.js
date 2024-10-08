//import 아이맥 from '/Users/hahyemin/react_test2/naman/public/아이맥.png';
import './App.css';

function TopBar () {
  return(
    <div className="menu-bar">

      <img 
        src={`${process.env.PUBLIC_URL}/assets/bunny.png`} 
        alt="아이콘" 
        className="bunny-icon" 
      />
      <div>Preview</div>
      <div>File</div>
      <div>Edit</div>
      <div>View</div>
      <div>Go</div>
      <div>Tools</div>
      <div>Window</div>
      <div>Help</div>
    </div>
  );
}


function Computer() {
  return(
    <div className="computer-box">네모박스</div>
  );
}

function Content() {
  return (
    <div className="content-area">
      <h2>컴퓨터화면</h2>
      <p>여기에 요소를 배치</p>
    </div>
  )
}


function App() {



  return (
    <div className="App">
      <TopBar></TopBar>
      <Computer></Computer>
    </div>
  );
}

export default App;



{/* <img className="bunny" alt="bunny" src="/Users/hahyemin/react_test2/naman/public/assets/bunny.png"/> */}
