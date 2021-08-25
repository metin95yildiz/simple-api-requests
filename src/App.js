import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';

function App() {
  const [fetchData, setData] = useState("");
  const [addingNewPost, setNewPost] = useState(false);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
    .then(response => response.json())
    .then(data => setData(data));
  }, [fetchData]);
  function deletePost(id) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
        if (!response.ok) {
          throw Error(response.status);
         }
         return response.json();
        })
  }
  function editPost(id){
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
        if (!response.ok) {
          throw Error(response.status);
         }
         return response.json();
        })
  }
  function comment(id) {
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
        if (!response.ok) {
          throw Error(response.status);
         }
         return response.json();
        })
  }
  return (
    <div className="App">
      <main>
        <div className="post-list">
          <div>
            <h1>Posts</h1>
            <button onClick={() => setNewPost(true)}>Add new post</button>
          </div>
          <ul>
              {
                Object.values(fetchData).map(data => {
                  return (
                  <li key={data.id}>
                      <h2>{data.title}</h2>
                      <p>{data.body}</p>
                      <div>
                        <button  className="comments" onClick={() => comment(data.id)}>Comments</button>
                        <button className="edit" onClick={() => editPost(data.id)}>Edit</button>
                        <button className="delete" onClick={() => deletePost(data.id)}>Delete</button>
                      </div>
                  </li>
                  )
                })
              }
          </ul>
        </div>
        {
          addingNewPost ?
          <form action="https://jsonplaceholder.typicode.com/posts" method="POST">
          <h2>ADD POST</h2>
          <label>
              <span>Title:</span>
              <input type="text" name="title" required/><br/>
          </label>
          <br/>
          <label>
              <span>Body:</span>
              <input type="text" name="body" required/><br/>
          </label>
          <button type="submit">
            ADD POST
          </button>
        </form>
        : null
        }
      </main>
    </div>
  );
}

export default App;
