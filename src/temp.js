import './App.css';
import React, { useState, useEffect } from 'react';



function App() {

  // 게시판 글 목록 상태
  let [topics, topicsUpdate] = useState([]);

  // 제목 상태
  let [title, setTitle] = useState("");

  // 설명 상태
  let [description, setDescription] = useState("");

  // let [obj, setObj] = useState({
  //   title: '',
  //   description: '',
  // });

  // function xxx(params) {
    
  //   return {
  //     title: '',
  //     desc: '',
  //   }
  // }

  // function dddd(params) {
    
  //   return [
  //     'fff', 'dddd'
  //   ]
  // }

  // let { title, desc } =  xxx()
  
  // let [a , b] = dddd();

  // 선택된 토픽
  let selectedTopic = null;

  useEffect(() => {
    getTopics()
    // TODO: 최초호출함수(INIT) 를 구현하기위해 서치하다보니 useEffect를 썻는데 잘 이해가 안간다. 특히 두번쨰 인자는 어떻게 구분해서 써야하나?  무조건 빈배열로 외우기 예외) 
  }, []);

  // /**
  //  * 사용자에게 입력 받은 값으로 제목 상태를 업데이트한다.
  //  * @param {object}} ? TODO: 어떻게 값이 담기는지? 타입이 무엇인지? >> 외우기
  //  * 
  //  * FIXME: 하나의 Object로 상태관리 처리하기 
  //  */
  let titleChange = ( { target: { value } }) => setTitle(value);

  // /**
  //   * 사용자에게 입력 받은 값으로 설명 상태를 업데이트한다.
  //   * @param {object}} ? TODO: 어떻게 값이 담기는지? 타입이 무엇인지?
  //   * 
  //   * FIXME: 하나의 Object로 상태관리 처리하기 
  //   */
  let desccriptionChange = ({ target: { value } }) => setDescription(value);

   /**
    * 사용자에게 입력 받은 값으로 제목 상태를 업데이트한다.
    * @param {object}} ? TODO: 어떻게 값이 담기는지? 타입이 무엇인지? >> 외우기
    * 
    * FIXME: 하나의 Object로 상태관리 처리하기 
    */
    // let titleChange = ({ target: { value } }) => setTitle(value);
    // let titleChange = ( { target: { value } }) => {
    //   setObj(obj => {

    //     return {
    //       ...obj,
    //       title: value, 
    //     }
    //   })


    //   console.log(obj);
    // };

   /**
     * 사용자에게 입력 받은 값으로 설명 상태를 업데이트한다.
     * @param {object}} ? TODO: 어떻게 값이 담기는지? 타입이 무엇인지?
     * 
     * FIXME: 하나의 Object로 상태관리 처리하기 
     */
  //  let desccriptionChange = ({ target: { value } }) => setDescription(value);




  function getTopics() {
    // ... ajax콜을 통해 응답데이터로 topicudpate
    fetch('http://localhost:3200/board', {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      // mode: 'no-cors', // no-cors, cors, *same-origin
      //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        'Content-Type': 'application/json',
      },
      //redirect: 'follow', // manual, *follow, error
      // referrer: 'no-referrer', // no-referrer, *client
    })
      .then(async response => {
        let datas = await response.json();
        topicsUpdate(datas)
      })
      .catch(err => {
        console.log(err);
      });
  }


  function saveTopic() {
    fetch('http://localhost:3200/board', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'title': title,
        'description': description
      })
    })
      .then(() => getTopics())
      .catch((err) => {
        console.log("error ", err)
      });
  }

  function updateTopic() {
    fetch('http://localhost:3200/board', {
      method: 'UPDATE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'title': title,
        'description': description
      })
    })
      .then(() => getTopics())
      .catch((err) => {
        console.log("error ", err)
      });
  }

  return (
    <div className="App" onSubmit={(event) => event.preventDefault()}>

      <div>
        <form>
          <input id="title" name="title" type="text" value={title} onChange={titleChange} />
          <input id="description" name="description" type="text" value={description} onChange={desccriptionChange} />

{/* 
          <input id="title" name="title" type="text" value={obj.title} onChange={titleChange} />
          <input id="description" name="description" type="text" value={obj.description} onChange={desccriptionChange} /> */}


          <button type="submit" onClick={saveTopic}>저장!!!</button>
          <button type="submit">수정</button>
          <button type="submit">삭제</button>
        </form>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>내용</th>
              <th>작성일</th>
            </tr>
          </thead>
          <tbody id="t_list">
            {
              topics.map((topic, idx) => {
                return (
                  <tr key={idx} onClick={() => selectedTopic = topic}>
                    <td>{topic.id}</td>
                    <td>{topic.title}</td>
                    <td>{topic.description}</td>
                    <td>{topic.create}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
