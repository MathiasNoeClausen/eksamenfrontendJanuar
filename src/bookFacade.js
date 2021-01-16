 import {bookURL} from "./settings.js"
 import React, { useState,useEffect } from "react"


 function BookFacade() {

    const GetBooks = () => {
    const URL = bookURL;
    const [books, setBooks] = useState([]);

            useEffect(() => {
          console.log("fetching")
          fetch(URL + "all", {headers: {'Accept': 'application/json'}})
          .then(res => res.json())
          .then(data => {
              setBooks(data.all)
              console.log(books);
          })

          const interval = setInterval(() => {
              fetch(URL + "all", {headers: {'Accept': 'application/json'}})
              .then(res => res.json())
              .then(data => {
                  setBooks(data.all)
              })
          },  200000)
  
          return () => clearInterval(interval)
        }, []);
          
          return (
              <div>
                  <ul>
                      {books.map(book => (
                <li> <b>{book.title}</b>, {book.author}, {book.publisher}, {book.publishYear}</li>  
                      ))}
                </ul>
              </div>
              
          )
                      }
                      
           const FindBookByTitle = () => {
            const URL = bookURL;
            const [book, setBook] = useState([]);
            const [writeValue, setWriteValue] = useState();
    
            function handleClick(e) {
                setWriteValue(e)
                console.log(writeValue)
                fetch(URL + writeValue, { headers: { 'Accept': 'application/json' } })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        setBook(data)
                    })
    
            }
            useEffect(() => {
    
                fetch(URL + "Alice", { headers: { 'Accept': 'application/json' } })
                    .then(res => res.json())
                    .then(data => {
                        setBook(data)
    
                    })
            }, []);
            if (book.title !== undefined) {
                return (
                    <div>
                        <input type="text" id="myInput" placeholder="Insert title" value={writeValue} onChange={(event) => setWriteValue(event.target.value)} />
                        <button onClick={() => handleClick(writeValue)}>Find Book</button>
                        <ul>
                            <h4>{book.title}</h4>
                            <li>Author: {book.author}</li>
                            <li>Publisher: {book.publisher}</li>
                            <li>Publish year: {book.publishYear}</li>
                        </ul>
                    </div>
    
                )
            } else {
                return <div>
                    <input type="text" id="myInput" placeholder="Insert title" value={writeValue} onChange={(event) => setWriteValue(event.target.value)} />
                    <button onClick={() => handleClick(writeValue)}>Find Book</button>
                    <p>Can't find book... </p>
                </div>
    
            }
    
        
           }
           
           const AddBook = () => {
               const URL = bookURL;
               const [book, setBook] = useState([]);
  
            const requestOptions = {
                method: 'POST',
                body: JSON.stringify(book),
                headers: {'Content-Type': 'application/json'},
                
                
            }
            

            const submit = e => {
                e.preventDefault();
                fetch(URL, requestOptions)
                .then(res => res.json())
                .then(data => {
                    setBook(data)

                    console.log(data)
                    console.log(book)
                })
            }
                  
                  return (
                      <div>
                          <form onSubmit={submit}>
                              <input type="text" placeholder="Title" name="title" onChange={e => setBook({...book, title: e.target.value})} />
                              <input type="text" placeholder="Author" name="author" onChange={e => setBook({...book, author: e.target.value})} />
                              <input type="text" placeholder="Publisher" name="publisher"  onChange={e => setBook({...book, publisher: e.target.value})} />
                              <input type="text" placeholder="Year published" name="publishYear"  onChange={e => setBook({...book, publishYear: e.target.value})} />

                          <input type="submit" name="Add book"/>
                          </form>
                      </div>
                      
                  )

           }

           const DeleteBook = () => {
            const URL = bookURL;
            const [book, setBook] = useState([]);
            const [writeValue, setWriteValue] = useState();

            const requestOptions = {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'},
            }

            function handleClick(e) {
                setWriteValue(e)
                console.log(writeValue)
                fetch(URL + writeValue, requestOptions)
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        setBook(data)
                    })
                }

                    if (book.title !== undefined) {
                        return (
                            <div>
                                <input type="text" id="myInput" placeholder="Insert id" value={writeValue} onChange={(event) => setWriteValue(event.target.value)} />
                                <button onClick={() => handleClick(writeValue)}>Delete Book</button>
                                <ul>
                                    <h4>Book with name: "{book.title}" got deleted</h4>
                                    <li>Author: {book.author}</li>
                                    <li>Publisher: {book.publisher}</li>
                                    <li>Publish year: {book.publishYear}</li>
                                </ul>
                            </div>
            
                        )
                    } else {
                        return <div>
                            <input type="text" id="myInput" placeholder="Insert id" value={writeValue} onChange={(event) => setWriteValue(event.target.value)} />
                            <button onClick={() => handleClick(writeValue)}>Delete Book</button>
                            <p>Can't find book... </p>
                        </div>
            
                    }

           }


          return {
            GetBooks,
            FindBookByTitle,
            AddBook,
            DeleteBook
          }

        }


let bookfacade = BookFacade();

 export default bookfacade;
        