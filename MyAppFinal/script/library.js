'use strict';
import {seedGenerator, uniqueId, randomNumber, deepCopy} from '../../../SeidoHelpers/seido-helpers.js';


export function Book (title, author, genre, millionsSold, publishYear) {
    
    this.bookId = uniqueId();
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.millionsSold = millionsSold;
    this.publishYear = publishYear;

    this.toString = function () {
        return `${this.title} written by ${this.author}. in the year ${this.publishYear}. ${this.millionsSold} million copies sold`;}
    

    this.seed = function (_seeder) {

            this.title = _seeder.latinSentence;
            this.author = _seeder.fullName;
            this.genre = _seeder.fromString("Adventure, Horror, SciFi, Drama, Comedy, Animation");
            this.millionsSold = randomNumber(1, 100);
            this.publishYear = randomNumber(1800, 2020);

            return this;
    }

    this.seedMany = function (nrItems, _seeder) {

        let books = [];
        for (let index = 0; index < nrItems; index++) {

            const b = new Book().seed(_seeder);
            books.push(b);
        }
        return books;
    }
}

export function LibraryService (storage) {

    //temporary a list made from seedGenerator, in reality a WebApi communication.
    if (!storage) {
        const _seeder = new seedGenerator();
        this.books = new Book().seedMany(100, _seeder);
    }   
    else {
        const tmp = storage.getItem('LibraryService');
        if (tmp) {
            this.books = JSON.parse(tmp);
        }
        else {
            const _seeder = new seedGenerator();
            this.books = new Book().seedMany(100, _seeder);
            storage.setItem('LibraryService', JSON.stringify(this.books));
        }
    }

    //services
    this.info = function (genre) {

        //hitta en
        if (genre === undefined) return this.books.length; 

        //hitta flera
        let count = 0;
        this.books.forEach(b => {
            if (b.genre === genre)
                {
                    count++;
                }
            });
        return count;     
    }

    this.readBooks = function(pageNr, pageSize) {
        
        //return this.books;
        const ret = {};

        ret.pageSize = pageSize;
        ret.pageNr = pageNr;
        ret.maxNrpages = Math.ceil(this.books.length/pageSize);
        ret.totalCount = this.books.length;

        ret.pageItems = this.books.slice(pageNr*pageSize, pageNr*pageSize + pageSize);

        return ret;
    }


    this.readBook = function(id) 
    {
        return this.books.find(book => book.bookId === id);
    }
}

