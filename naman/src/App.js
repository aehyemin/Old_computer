//import 아이맥 from '/Users/hahyemin/react_test2/naman/public/아이맥.png';
import './App.css';
import React, { useState } from 'react';

function TopBar() {
  const handleButtonClick = (buttonName) => {
    console.log(`${buttonName} 버튼 클릭됨`);
    // 추가 기능을 여기에 구현할 수 있습니다.
  };

  return (
    <div className="menu-bar">
      <img 
        src={`${process.env.PUBLIC_URL}/assets/bunny1.png`} 
        alt="아이콘" 
        className="bunny-icon" 
      />
      <button onClick={() => handleButtonClick('Preview')}>Preview</button>
      <button onClick={() => handleButtonClick('File')}>File</button>
      <button onClick={() => handleButtonClick('Edit')}>Edit</button>
      <button onClick={() => handleButtonClick('View')}>View</button>
      <button onClick={() => handleButtonClick('Go')}>Go</button>
      <button onClick={() => handleButtonClick('Tools')}>Tools</button>
      <button onClick={() => handleButtonClick('Window')}>Window</button>
      <button onClick={() => handleButtonClick('Help')}>Help</button>
    </div>
  );
}


function Computer() {
  const [isOpen, setIsOpen] = useState(false); // 팝업 상태 관리

  const handleIconDoubleClick = () => {
    setIsOpen(true); // 모달 창 열기
  };

  const closePopup = () => {
    setIsOpen(false); // 모달 창 닫기
  };

  return (
    <div className="computer-box">
      <div className="computer-sea">
        <div className="folder-container" onDoubleClick={handleIconDoubleClick}>
          <img
            src={`${process.env.PUBLIC_URL}/assets/파일폴더.png`}
            alt="아이콘"
            className="folder-icon"
          />
          <p className="folder-label">게시판 </p>
        </div>
      </div>
      {isOpen && <Modal onClose={closePopup} />} {/* 모달 창 열기 */}
    </div>
  );
}






function Article (props) {
  return <article>

    <h2>{props.title}</h2>
  {props.body}
  </article>
}



function Modal({ onClose }) {
  const [posts, setPosts] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const handleAddOrEditPost = () => {
    if (editIndex !== null) {
      const updatedPosts = [...posts];
      updatedPosts[editIndex] = inputValue;
      setPosts(updatedPosts);
      setEditIndex(null);
    } else {
      setPosts([...posts, inputValue]);
  }
  setInputValue('');
  };
  
  const handleDeletePost = (index) => {
    const updatedPosts = posts.filter((_, i) => i != index);
    setPosts(updatedPosts);
  };

  const handleEditPost = (index) => {
    setInputValue(posts[index]);
    setEditIndex(index);
  };






  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <span className="modal-title">게시판</span>
          <button className="modal-close" onClick={onClose}>✖</button>
        </div>
        <div className="modal-body">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder = "게시글을 입력하세요"
          />
          <button onClick={handleAddOrEditPost}>
            {editIndex !== null ? '수정': '추가'}
          </button>
          <ul>
            {posts.map((post, index)=> (
              <li key= {index}>
                {post}
                <button onClick={()=> handleEditPost(index)}> 수정</button>
                <button onClick={() => handleDeletePost(index)}> 삭제</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
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
