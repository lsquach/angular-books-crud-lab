angular.module('libraryApp')
  .controller('BooksShowController', BooksShowController);

BooksShowController.$inject=['$http', '$routeParams', '$location'];
function BooksShowController($http, $routeParams, $location) {
  var vm = this;
  var bookId = $routeParams.id;
  $http({
    method: 'GET',
    url: 'https://super-crud.herokuapp.com/books/'+bookId
  }).then(onBookShowSuccess, onError);

  function onBookShowSuccess(response){
    console.log('here\'s the data for book', bookId, ':', response.data);
    vm.book = response.data;
  }
  function onError(error){
    console.log('there was an error: ', error);
  }

  vm.editBook = function (bookToEdit) {
    $http({
      method: 'PUT',
      url: 'https://super-crud.herokuapp.com/books/'+bookToEdit._id,
      data: {
        title : bookToEdit.title,
        author : bookToEdit.author,
        image: bookToEdit.image,
        releaseDate : bookToEdit.releaseDate
      }
    }).then(function onBookEditSuccess (response) {
      console.log('UPDATED data for book', bookId, ':', response.data);
      vm.book = response.data;
      $location.path('/');
    }, function errorCallback(response) {
      console.log('There was an error editing the data', response);
    });
  };

  vm.deleteBook = function (book) {
    $http({
      method: 'DELETE',
      url: 'https://super-crud.herokuapp.com/books/' + book._id
    }).then(function onBookDeleteSuccess(response) {
      console.log('book delete response data:', response.data);
      $location.path('/');
    }, function errorCallback(response) {
      console.log('There was an error deleting the data', response.data);
    });
  };

}
