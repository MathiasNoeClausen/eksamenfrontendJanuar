// import {bookURL} from "./settings.js"
// import React, { useState,useEffect } from "react"
// const URL = bookURL;

// function BookFacade() {
//     const [books, setBooks] = useState();


//     const getBooks = () => {
//         console.log("fetching")
//         fetch(URL)
//         .then(res => res.json())
//         .then(data => {
//             setBooks(data)
//             console.log(data);
//         })


        
//         return (
//             <div>
//                 <ul>
//                     {books.map(book => (
//               <li> {book.title}</li>  
//                     ))}
//               </ul>
//             </div>
            
//         )
        
//     }



//     return { 
//        getBooks
        
//     }

//     }


// //let bookfacade = BookFacade();
// let bookfacade = <BookFacade BookFacade/>
// export default bookfacade;
