import React, { useState } from 'react';
import axios from "axios";

const Search = () => {

    let BOOK_URL = `https://www.googleapis.com/books/v1/volumes`;

    const [searchTerm, setSearchTerm] = useState("");
    const [books, setBooks] = useState({
        items: []
    });

    const onInputChangeTerm = e => {
        setSearchTerm(e.target.value);
    };

    const checkBooks = async () => {
        const result = await axios.get(`${BOOK_URL}?q=${searchTerm}`);
        setBooks(result.data);
    };

    const onSubmitHandler = e => {
        e.preventDefault();
        checkBooks();
    };

    const bookAuthors = authors => {
        if (authors.length <= 2) {
            authors = authors.join(" and ");
        } else if (authors.length > 2) {
            let lastAuthor = " and " + authors.slice(-1);
            authors.pop();
            authors = authors.join(", ");
            authors += lastAuthor;
        }
        return authors;
    };

    return (
        <section>
            <form onSubmit={onSubmitHandler}>
                <label>
                    <span>Type here </span>
                    <input
                        type="search"
                        placeholder="Enter title, author or publish date"
                        value={searchTerm}
                        onChange={onInputChangeTerm}
                    />
                    <button type="submit">Search</button>
                </label>
            </form>
            <ul>
                {books.items.map((book, index) => {
                    return (
                        <li key={index}>
                            <div>
                                <img
                                    alt={`${book.volumeInfo.title} book`}
                                    src={`http://books.google.com/books/content?id=${
                                        book.id
                                    }&printsec=frontcover&img=1&zoom=1&source=gbs_api`}
                                />
                                <div>
                                    <h3>{book.volumeInfo.title}</h3>
                                    <p>{book.volumeInfo.authors ? bookAuthors(book.volumeInfo.authors): ""}</p>
                                    <p>{book.volumeInfo.publishedDate}</p>
                                </div>
                            </div>
                            <hr/>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
};

export default Search;