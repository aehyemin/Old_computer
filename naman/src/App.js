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




function Modal({ onClose }) {
  const [posts, setPosts] = useState([]); // 게시글 상태 관리
  const [addInputValue, setAddInputValue] = useState(''); // 게시글 추가 입력값 상태
  const [editInputValue, setEditInputValue] = useState(''); // 수정 입력값 상태
  const [editIndex, setEditIndex] = useState(null); // 수정할 게시글의 인덱스
  const [comments, setComments] = useState([]) //댓글
  const [currentCommentInput, setCurCommentInput] = useState('');
  const [openCommentIndex, setOpenCommentIndex] = useState(null); // 열려 있는 댓글 인덱스 관리

  const handleAddPost = () => {
    if (addInputValue) {
      setPosts([...posts, addInputValue]); // 게시글 추가
      setAddInputValue(''); // 입력 필드 초기화
      setComments([...comments, []])
    }
  };

  const handleToggleComments = (index) => {
    setOpenCommentIndex(openCommentIndex === index ? null : index); // 댓글 토글
};


  const handleDeletePost = (index) => {
    const updatedPosts = posts.filter((_, i) => i !== index);
    const updatedComments = comments.filter((_, i) => i !== index);
    setPosts(updatedPosts); // 게시글 삭제
    setComments(updatedComments);
  };

  const handleEditPost = (index) => {
    setEditInputValue(posts[index]); // 수정할 게시글의 내용 인풋 박스에 표시
    setEditIndex(index); // 수정할 인덱스 설정
  };

  const handleUpdatePost = () => {
    if (editIndex !== null && editInputValue) {
      const updatedPosts = [...posts];
      updatedPosts[editIndex] = editInputValue; // 수정된 내용으로 업데이트
      setPosts(updatedPosts);
      setEditInputValue(''); // 입력 필드 초기화
      setEditIndex(null); // 수정 인덱스 초기화
    }
  };


  const handleAddComment = (postIndex) => {
    if (currentCommentInput) {
      const updatedComments = [...comments];
      updatedComments[postIndex] = [...updatedComments[postIndex], currentCommentInput]; // 댓글 추가
      setComments(updatedComments);
      setCurCommentInput(''); // 입력 필드 초기화
    }
  };

  const handleDeleteComment = (postIndex, commentIndex) => {
    const updatedComments = [...comments];
    updatedComments[postIndex] = updatedComments[postIndex].filter((_, i) => i !== commentIndex); // 댓글 삭제
    setComments(updatedComments);
  };



  return (
    <div className="modal-overlay">
        <div className="modal-content">
            <div className="modal-header">
                <span className="modal-title">게시판</span>
                <button className="modal-close" onClick={onClose}>✖</button>
            </div>
            <div className="modal-body">
                <div className="post-section">
                    <input
                        type="text"
                        value={addInputValue}
                        onChange={(e) => setAddInputValue(e.target.value)}
                        placeholder="게시글을 입력하세요"
                    />
                    <button onClick={handleAddPost}>추가</button>
                    <ul>
                        {posts.map((post, index) => (
                            <li key={index}>
                                <div>
                                    <span onClick={() => handleToggleComments(index)} style={{ cursor: 'pointer' }}>{post}</span>
                                    <button onClick={() => handleDeletePost(index)}>삭제</button>
                                    <button onClick={() => handleEditPost(index)}>수정</button>
                                </div>
                                {editIndex === index ? (
                                    <>
                                        <input 
                                            type="text"
                                            value={editInputValue} // 수정할 게시글 내용을 인풋 박스에 표시
                                            onChange={(e) => setEditInputValue(e.target.value)}
                                            placeholder="수정할 내용을 입력하세요"
                                        />
                                        <button onClick={handleUpdatePost}>수정 완료</button>
                                    </>
                                ) : null}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* 댓글 섹션은 오른쪽에 배치 */}
                <div className="comment-section">
                    <h4>댓글:</h4>
                    {openCommentIndex !== null && comments[openCommentIndex]?.map((comment, commentIndex) => (
                        <div key={commentIndex}>
                            <span>{comment}</span>
                            <button onClick={() => handleDeleteComment(openCommentIndex, commentIndex)}>삭제</button>
                        </div>
                    ))}
                    {openCommentIndex !== null && (
                        <div className="comment-input-container">
                            <input
                                type="text"
                                value={currentCommentInput}
                                onChange={(e) => setCurCommentInput(e.target.value)}
                                placeholder="댓글을 입력하세요"
                            />
                            <button onClick={() => handleAddComment(openCommentIndex)}>댓글 추가</button>
                        </div>
                    )}
                </div>
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
