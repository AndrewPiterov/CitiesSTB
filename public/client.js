$(function(){

  $.get('/cities', appendToList);

  function appendToList(cities) {
    var list = [];
    var content, city;
    for(var i in cities){
      city = cities[i];
      content = '<a href="/cities/'+city+'">'+city+'</a>'+ // + // example on how to serve static images
        ' <a href="#" data-city="'+city+'">'+
        '<img src="delete.png" width="15px"></a>';
      list.push($('<li>', { html: content }));
    }

    $('.city-list').append(list)
  }
});