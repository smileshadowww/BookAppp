/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars
{
  'use strict';

  // const settings = {};
  const select = {
    templateOf: {
      booksList: '#template-book',
    },
    containerOf: {
      books: '.books-list',
      images: '.book__image',
      filters: '.filters',
    },
  };
  const templates = {
    bookTemplate: Handlebars.compile(document.querySelector(select.templateOf.booksList).innerHTML),
  };

  class BooksList{
    constructor(){
      const thisBook = this;
      thisBook.initData();
      thisBook.getElements();
      thisBook.renderBooks();
      thisBook.initActions();
      thisBook.getElements();

    }
    getElements(){
      const thisBook = this;
      thisBook.favoriteBooks = [];
      thisBook.filters = [];

      thisBook.imagePlace = document.querySelector(select.containerOf.books);
      thisBook.filterPlace = document.querySelector(select.containerOf.filters);
    }
    initData(){
      const thisBook = this;
      thisBook.data = dataSource.books;
    }
    renderBooks(){
      const thisBook = this;
      for(let book of dataSource.books){
        const bookData = {
          id: book.id,
          name: book.name,
          price: book.price,
          rating: book.rating,
          image: book.image,
          ratingWidth: book.rating*10,
          ratingBgc: thisBook.createBackground(book.rating),

        };
        // console.log(bookData.ratingBgc);
        const generatedHTML = templates.bookTemplate(bookData);
        thisBook.element = utils.createDOMFromHTML(generatedHTML);
        const bookListContainer = document.querySelector(select.containerOf.books);
        bookListContainer.appendChild(thisBook.element);
      }
    }
    initActions(){

      const thisBook = this;
      // const imagePlace = document.querySelector(select.containerOf.books);
      thisBook.imagePlace.addEventListener('dblclick', function(event){
        event.preventDefault();
        const image = event.target.offsetParent;
        const idBook = image.getAttribute('data-id');
        if(image.classList.contains('book__image')){
          if(thisBook.favoriteBooks.includes(idBook)){
            image.classList.remove('favorite');
            thisBook.favoriteBooks.pop(idBook);
          }else{
            image.classList.add('favorite');
            thisBook.favoriteBooks.push(idBook);
          }
        }
      });
      // const filterPlace = document.querySelector(select.containerOf.filters);
      thisBook.filterPlace.addEventListener('click', function(event){
        const clickedElem = event.target;
        if(clickedElem.tagName == 'INPUT' && clickedElem.type == 'checkbox' && clickedElem.name =='filter'){
          thisBook.filterBooks();
          const clickedElemId = clickedElem.getAttribute('value');
          if(thisBook.filters.includes(clickedElemId)){
            const numberInArray = thisBook.filters.indexOf(clickedElemId);
            thisBook.filters.splice(numberInArray, 1);
          }else{
            thisBook.filters.push(clickedElemId);
          }
          // console.log(clickedElem.value);
          // console.log(thisBook.filters);
        }
        thisBook.filterBooks();
      });

    }
    filterBooks(){
      const thisBook = this;
      for(let book of dataSource.books){
        const id = book.id;
        let shouldBeHidden = false;
        for(let filter of thisBook.filters){
          if(!book.details[filter]){
            shouldBeHidden = true;
            break;
          }
        }
        if(shouldBeHidden == true){
          const elem = document.querySelector('.book__image[data-id="'+ id +'"]');
          elem.classList.add('hidden');
        } else {
          const elem = document.querySelector('.book__image[data-id="'+ id +'"]');
          elem.classList.remove('hidden');
        }
      }
    }
    createBackground(rating){
      // console.log(rating);
      if(rating>9){
        const background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
        return(background);
        // console.log(background);
      }else if(rating>8){
        const background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
        return(background);
        // console.log(background);
      }else if(rating>6){
        const background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
        return(background);
        // console.log(background);
      }else if(rating<=6 ){
        const background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
        return(background);
        // console.log(background);
      }
      // console.log(background)
      // return(background);
    }


  }
  const app = new BooksList(); // eslint-disable-line no-unused-vars
}
