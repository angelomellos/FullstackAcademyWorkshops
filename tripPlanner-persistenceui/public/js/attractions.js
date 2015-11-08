'use strict';
/* global $ daysModule all_hotels all_restaurants all_activities */

$(document).ready(function() {

  var attractionsByType = {
    hotels:      all_hotels,
    restaurants: all_restaurants,
    activities:  all_activities
  };

  function findByTypeAndId (type, id) {
    var attractions = attractionsByType[type],
        selected;
    attractions.some(function(attraction){
      if (attraction._id === id) {
        selected = attraction;
        selected.type = type;
        return true;
      }
    });
    return selected;
  }

  $('#attraction-select').on('click', 'button', function() {
    var dayNum = $('#day-title').html().split(' ')[1];
    var $button = $(this),
        type = $button.data('type'),
        attractions = attractionsByType[type],
        id = $button.siblings('select').val();
    daysModule.addAttraction(findByTypeAndId(type, id));
    console.log('att select');
    $.ajax({
      method: 'PUT',
      url: '/api/days/' + id + '/addAttraction',
      data: {type: type, day: dayNum},
      success: function(responseData) {
        console.log(responseData);
      },
      error: function (errorObj) {
          return new Error('Could not retrieve data');
      }
    })
    console.log('after ajax');
  });

  $('#itinerary').on('click', 'button', function() {
    var $button = $(this),
        type = $button.data('type'),
        id = $button.data('id');
    daysModule.removeAttraction(findByTypeAndId(type, id));
  });

});
