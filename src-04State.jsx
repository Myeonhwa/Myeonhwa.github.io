import './App.css'
import { useState } from 'react';

function ReadyComp(){
  return(
    <div>
      <h3>컴포넌트 준비중입니다.</h3>
      <a href='/'>Home바로가기</a>
    </div>
  );
}
// 매개변수 props를 통해 전달된 값을 받아 사용.
// 모든 페이지에서 공통적으로 사용하는 컴포넌트(타이틀만 변경됨)
function Header(props){
  console.log('props', props.title);
  return (
    <header>
      <h2>{props.title}</h2>
    </header>
  )
}

// 목록의 네비게이션
function NavList(props){
  return (
    <nav>
      <a href='/' onClick={function(event){
        event.preventDefault();
        props.onChangeMode();
      }}>글쓰기</a>
    </nav>
  )
}

// 열람의 네비게이션
function NavView(props){
  // 띄어쓰기를 할때는 &nbsp; 혹은 {" "}를 사용할 수 있다.
  return (
    <nav>
      <a href='/' onClick={function(event){
        event.preventDefault();
        props.onChangeMode('list');
      }}>목록</a>&nbsp;
      <a href='/' onClick={function(event){
        event.preventDefault();
        props.onChangeMode('edit');
      }}>수정</a>{" "}
      <a href='/' onClick={function(event){
        event.preventDefault();
        props.onChangeMode('delete');
      }}>삭제</a>
    </nav>
  )
}

// 작성하기의 네비게이션
function NavWrite(props){
  return (
    <nav>
      <a href='/' onClick={function(event){
       event.preventDefault();
       props.onChangeMode();
     }}>목록</a>
    </nav>
  )
}

// 게시판 목록
function ArticleList(props){
  const lists = [];
  // props로 전달된 객체형 배열의 크기만큼 반복
  for(let i=0 ; i<props.boardData.length ; i++){
    // 각 루프에 해당하는 객체를 꺼낸 후 lists에 추가
    let row = props.boardData[i];
    lists.push(
      // 게시물의 일련번호로 key prop을 생성
      <tr key={row.no}>
        <td className='cen'>{row.no}</td> 
        {/* 제목을 클릭하면 열람으로 전환. "read/번호" 형식으로 링크 작성 */}
        <td><a href={'/read/'+row.no} onClick={(event)=>{
          event.preventDefault();
          // 각 게시물의 일련번호를 인수로 전달
          props.onChangeMode(row.no);
        }}>{row.title}</a></td>
        <td className='cen'>{row.writer}</td>
        <td className='cen'>{row.date}</td>
      </tr>
    );
  }
  return (
    <article>
      <table id='boardTable'>
        <thead>
          <tr>
            <th>No</th>
            <th>제목</th>
            <th>작성자</th>
            <th>날짜</th>
          </tr>
        </thead>
        <tbody>
          {/* 배열에 추가한 데이터를 여기서 출력 */}
          {lists}
        </tbody>
        </table>
        </article>
  )
}

// 게시판 읽기
function ArticleView(props){
  return (
    <article>
      <table id='boardTable'>
        <colgroup>
        <col width="20%" /><col width="*" />
        </colgroup>
        <tbody>
          <tr>
            <th>작성자</th>
            <td>성유겸</td>
          </tr>
          <tr>
            <th>제목</th>
            <td>오늘은 React공부하는날</td>
          </tr>
          <tr>
            <th>날짜</th>
            <td>2023-05-05</td>
          </tr>
          <tr>
            <th>내용</th> 
            <td>열심히 해봅시다<br/>열공 합시다</td>
          </tr>
        </tbody>
      </table>
    </article>
  );
}

// 게시판 작성
function ArticleWrite(props){
  return (
    <article>
      <form>
        <table id='boardTable'>
          <tbody>
            <tr>
              <th>작성자</th>
              <td><input type='text' name='writer' /></td>
            </tr>
            <tr>
              <th>제목</th>
              <td><input type='text' name='title' /></td> 
            </tr>
            <tr>
              <th>제목</th> 
              <td><textarea name='contents' rows='3'></textarea></td>
            </tr>
          </tbody>
        </table>
        <input type='submit' value='전송'></input>
      </form>
    </article>
  );
}
function App() {
  // 게시판의 데이터로 사용할 객체형 배열
  const boardData = [
    {no:1, title:'오늘은 React공부하는날', writer:'낙짜쌤', date:'2023-01-01',
      contents:'React를 뽀개봅시다'},
    {no:2, title:'어제는 Javascript공부했음', writer:'유겸이', date:'2023-03-03',
      contents:'Javascript는 할게 너무 많아요'},
    {no:3, title:'내일은 Project해야지', writer:'개똥이', date:'2023-05-05',
      contents:'Project는 뭘 만들어볼까?'},
  ];
  const [mode, setMode] = useState('list');

  let articleComp, navComp, titleVar ;
  if(mode==='list'){
    titleVar = '게시판-목록(props)';
    navComp = <NavList onChangeMode={()=>{
      setMode('write');
    }}></NavList>
    articleComp = <ArticleList boardData={boardData}
    onChangeMode={(no)=>{
      console.log('선택한 게시물 번호:'+no);
      setMode('view');
    }
    }></ArticleList>
  }
  else if(mode==='view'){
    titleVar = '게시판-읽기(props)';
    navComp = <NavView onChangeMode={(pmode)=>{
      setMode(pmode);
    }}></NavView>
    articleComp = <ArticleView></ArticleView>
  }
  else if(mode==='write'){
    titleVar = '게시판-쓰기(props)';
    navComp = <NavWrite onChangeMode={()=>{
      setMode('list');
    }}></NavWrite>
    articleComp = <ArticleWrite></ArticleWrite>
  }
  else{
    navComp = <ReadyComp></ReadyComp>
    articleComp = '';
  }
  return (
      <div className="App">
        {/* 문자열은 "을 통해 props를 전달 */}
        <Header title={titleVar}></Header>
        {navComp}
        {articleComp}
    </div>
  );
}

export default App