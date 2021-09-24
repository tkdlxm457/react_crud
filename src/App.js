import './App.css';
import React, { useState, useEffect } from 'react';



function App() {
  let [topics, topicsUpdate] = useState([]);

  useEffect(() => {
    init()
    // 최초호출함수(INIT) 를 구현하기위해 서치하다보니 useEffect를 썻는데 잘 이해가 안간다. 특히 두번쨰 인자는 어떻게 구분해서 써야하나?
  }, [])


  function init() {
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
      //body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
      .then(async response => {
        let datas = await response.json();
        topicsUpdate(datas)
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <div className="App" onClick={init}>
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
                  <tr key={idx}>
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
