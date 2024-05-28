'use strict';
// import {Book, LibraryService} from './library.js';
import musicService from'./music-group-service.js';

    //module global variables
    // const _library = new LibraryService(sessionStorage);
    const _musicservice = new musicService(`https://appmusicwebapinet8.azurewebsites.net/api`);
    // let books = [];

    //paging
    const _pageSize = 10;
    let _currentPage = 0;
    let _maxNrpages;

    //Get Elements
    const bookList = document.querySelector("#bookList");
    const btnPrev = document.querySelector("#btnPrev");
    const btnNext = document.querySelector("#btnNext");
    const searchBtn = document.querySelector("#submitSearch");
    // const btnPopulate = document.querySelector("#btnPopulate");
    // const btnClear = document.querySelector("#btnClear");
    


    //Add event listeners
    btnPrev.addEventListener("click", clickPrev);
    btnNext.addEventListener("click", clickNext);
    searchBtn.addEventListener("click", clickSearch);
    // btnPopulate.addEventListener("click", clickPopulate);
    // btnClear.addEventListener("click", clickClear);
    let searchInput = document.querySelector("#searchParameter");

    //Declare event handlers
    async function clickPrev (e){

        if (_currentPage > 0 ) {
            _currentPage--;
            await renderAlbumsAsync(_currentPage, searchInput.value);
        }
    }

    async function clickNext (e){
        if (_currentPage < _maxNrpages-1) {
            _currentPage++;
            await renderAlbumsAsync(_currentPage, searchInput.value);
        }
    }

    async function clickSearch(e) {
        searchInput = document.querySelector("#searchParameter");
        _currentPage = 0; 
        await renderAlbumsAsync(_currentPage, searchInput.value);
    }
    


    //helpers
    function addRow(bookId, bookTitle, bookAuthor, publishYear, millionsSold) {
        let divRow = document.createElement(`div`);
        divRow.classList.add("trFluid");
    
        let divGroup2 = document.createElement(`div`);
        divGroup2.classList.add("trFluid_Grouping2");
        divRow.appendChild(divGroup2);
    
    
        let divGroup1_1 = document.createElement(`div`);
        divGroup1_1.classList.add("trFluid_Grouping1");
        let divGroup1_2 = document.createElement(`div`);
        divGroup1_2.classList.add("trFluid_Grouping1");
        divGroup2.appendChild(divGroup1_1);
        divGroup2.appendChild(divGroup1_2);
    
    
        //<div class="tdFluent"></div>
        let divFluent1 = document.createElement(`div`);
        divFluent1.classList.add("tdFluent");
        divFluent1.innerHTML = bookTitle;
        divGroup1_1.appendChild(divFluent1);
    
        let divFluent2 = document.createElement(`div`);
        divFluent2.classList.add("tdFluent");
        divFluent2.innerHTML = bookAuthor;
    
        let divFluent3 = document.createElement(`div`);
        divFluent3.classList.add("tdFluent");
        divFluent3.innerHTML = publishYear;
    
        let divFluent4 = document.createElement(`div`);
        divFluent4.classList.add("tdFluent");
        divFluent4.innerHTML = millionsSold;
    
        divGroup1_2.appendChild(divFluent2);
        divGroup1_2.appendChild(divFluent3);
        divGroup1_2.appendChild(divFluent4);

        //<a href="./form.html">View book</a>
        let a_tag = document.createElement(`a`);
        a_tag.innerText = "View Album";
        a_tag.href=`./form.html?id=${bookId}`;
        divGroup1_2.appendChild(a_tag);
    
        bookList.appendChild(divRow);
    }

    async function renderAlbumsAsync(_pageNr, searchQuery = "") {
        while (bookList.firstElementChild !== null) {
            bookList.removeChild(bookList.firstElementChild);
        }

        if (searchQuery == "") {

            let response = await _musicservice.readMusicGroupsAsync(_pageNr, false, null, _pageSize);
            response.pageItems.forEach(a => {addRow(a.musicGroupId, a.name, a.strGenre, a.establishedYear, a.artists.length)})
            console.log(response.dbItemsCount);
            _maxNrpages = response.pageCount;
        }
        else {
            let response = await _musicservice.readMusicGroupsAsync(_pageNr, false, searchQuery, _pageSize);
            response.pageItems.forEach(a => {addRow(a.musicGroupId, a.name, a.strGenre, a.establishedYear, a.artists.length)})
            console.log(response.dbItemsCount);
            _maxNrpages = response.pageCount;
        }
    }


    //init
    (async function pageInit() 
    {
        await renderAlbumsAsync(_currentPage);
    })();