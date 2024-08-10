(function($, List, _, moment) {

  // List.js classes to use for search elements
  var listOptions = {
    valueNames: [
      'list-text',
      'list-tag',
      'list-added_by',
      'list-status',
      'list-author',
      'list-year'
    ]
  };

  var options = {
    valueNames: ['tags', 'authors', 'text', 'consulted_date', 'published_year']
  };
  var booksList = new List('book', options);
  var mediaList = new List('media', options);
  var articlesList = new List('article', options);
  var papersList = new List('paper', options);


  $(".search").keyup(function(){
    booksList.search($(this).val());
    mediaList.search($(this).val());
    articlesList.search($(this).val());
    papersList.search($(this).val());
  });

  // tooltip
  $(function () {
    $('[data-toggle="tooltip"]').tooltip()
  });

  // tabs
  $('#myTabs a').click(function (e) {
    e.preventDefault()
    $(this).tab('show')
  });

  // Find any within a facet
  function foundAny(facets, compareItem) {
    
    // No facets selected, show all for this facet
    if (_.isEmpty(facets)) {
      return true;
    }
    // Otherwise, show this item if it contains any of the selected facets
    return facets.reduce(function(found, facet) {
      if (found) {
        return found;
      }

      var tryThis = compareItem[facet['facet']].split('; ');
      for (var i=0, j=tryThis.length; i<j; i++) {
        if (tryThis[i].toLowerCase().replace(/\s/g, "") == facet['value'].toLowerCase().replace(/\s/g, "")) {
          return true;
        }
      }
      return false;
    }, false);
  }

  $(function() {

    // Dates
    var today = moment();
    //var inauguration = moment(document.getElementById("inauguration").value);
    //var inauguration = moment('2017-01-20');
    //var from = $('#inauguration')[0].value;
    //var inauguration = moment(from);
    //$('#inauguration-days').html(inauguration.diff(today, 'days') > 0 ? inauguration.diff(today, 'days') : 'NA');
    
    //$('#days-in-office').html(today.diff(inauguration, 'days') > 0 ? today.diff(inauguration, 'days') : 0);

    // List.js object that we can filter upon
    var promiseList = new List('promises', listOptions).on('updated', function(list) {
      $('#count').html(list.visibleItems.length);
    });

    var $search = $('#search');
    var $facets = $('[data-list-facet]'); // All buttons that can filter

    // Clear all
    function resetFilter(e) {
      e.preventDefault();
      // Visually reset buttons
      $facets.removeClass('active');
      // Clear out text field
      $search.val('');
      // Wipe all filters
      promiseList.search();
      promiseList.filter();
    }

    // Hard reset all the buttons
    $('.list-filter-reset').on('click', resetFilter);

    // Any facet filter button
    $facets.on('click', function(e) {

      var facet = $(this).data('list-facet'); // ie 'list-category or list-status'
      var value = $(this).data('facet-value'); // ie 'Culture'
      var isSingle = !!$(this).data('select-single'); // ie true/false for if there can only be one of this filter
      
      // Single-select categories should have their active state wiped
      if (isSingle) {
        $facets
          .filter(function() { return $(this).data('list-facet') === facet; })
          .removeClass('active');
      }

      // Flag as active
      $(this).toggleClass('active');

      // Array of active
      var facets = $facets.filter('.active').map(function() {
        // return object instead with facet/value
        return {
          facet: $(this).data('list-facet'),
          value: $(this).data('facet-value'),
          isSingle: !!$(this).data('select-single')
        };
      }).get();
      

      // When deselecting last, clear all filters
      if (facets.length === 0) {
        promiseList.filter();
        return; // Eject now
      }

      // Otherwise, filter on the array
      promiseList.filter(function(item) {

        var itemValues = item.values();
        
        // Single selects, eg "Not started"
        var single = _.filter(facets, ['isSingle', true]);
        var foundSingle = foundAny(single, itemValues);
        // Single-selection items hide if false no matter what, so eject if not found here
        if (!foundSingle) {
          return false;
        }

        // Full categories can have multiples show, list out here
        var multis = _.filter(facets, ['isSingle', false]);
        return foundAny(multis, itemValues);

      }); // promiseList.filter()

    });
  });

})(jQuery, List, _, moment);
