/*eslint-disable */
import logo from './logo.svg';
import './App.css';
import {useState} from 'react';

function App() {
  let post = "역삼 우동 맛집";
  let [글제목, setTitle] = useState(['남자 코드 추천', '강남 우동 맛집', '파이썬 독학']);
  let [따봉, 따봉변경] = useState(0);

  function NewTitle () {
    let copy = [...글제목];
    copy[0] = '여자코트추천'
    setTitle(copy);
  }

  function SetsTitle () {
    let copys = [...글제목];
    copys.sort();
    setTitle(copys);
  }

  



  return ( 
    <div className="App"> {/* html이 아니라 JSX(.js 파일에서 쓰는 html 대용품)  */}
      <div className="black-nav">
        <h4>블로그</h4>
      </div>
      <button onClick={SetsTitle}>가나다순정렬</button>
      <div className="list">
        <h4>{글제목[0]} <span onClick={()=>{ 따봉변경(따봉+1) }}>🩷</span> {따봉} </h4>
        <span onClick={NewTitle}>여자</span>
        <p>2월 17일</p>
      </div>



      <div className="list">
        <h4>{글제목[1]}</h4>
        <p>2월 17일</p>
      </div>
      <div className="list">
        <h4>{글제목[2]}</h4>
        <p>2월 17일</p>
      </div>

    <Modal></Modal>
    



    </div>
  );
}

function Modal () {
  return (
    <>
  <div className="modal">
    <h4>제목</h4>
    <p>날짜</p>
    <p>상세내용</p>
  </div>
   </>
  )
}

export default App;
