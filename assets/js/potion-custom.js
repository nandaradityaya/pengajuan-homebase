var dropdown = document.getElementsByClassName("dropdown-btn");
var i;

for (i = 0; i < dropdown.length; i++) {
  dropdown[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var dropdownContent = this.nextElementSibling;
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
    } else {
      dropdownContent.style.display = "block";
    }
  });
}

window.onload = function () {
  copyrightYear();
};
function copyrightYear() {
  var d = new Date();
  var n = d.getFullYear();
  document.getElementById("copyrightYear").innerHTML = n;
}

function loginClick() {
  var bannerLogin = document.getElementById("loginBanner");
  var formLogin = document.getElementById("loginForm");

  bannerLogin.classList.add("login-close");
  formLogin.classList.remove("login-close");
  setTimeout(bannerLogin.classList.add("d-none"), 0.2);
}

var heightWeb = 0;
var indexGuide = 0;
var totalGuide = 0;
var guideText = [];

function focusGuideNext(index) {
  focusToGuide(index);
  indexGuide = index + 1;
}

function focusGuideEnd() {
  var focusOverlay = document.getElementById("focusOverlay");
  var focusOverblock = document.getElementById("focusOverblock");
  var focusOvercard = document.getElementById("focusOvercard");

  focusOverlay.style.opacity = 0;
  focusOverblock.style.opacity = 0;
  focusOvercard.style.opacity = 0;

  setTimeout(function () {
    focusOverlay.classList.add("d-none");
  }, 500);
  setTimeout(function () {
    focusOverblock.classList.add("d-none");
  }, 500);
  setTimeout(function () {
    focusOvercard.classList.add("d-none");
  }, 500);
}

function focusCardGuide(total) {
  if (total > 0) {
    totalGuide = total;
    indexGuide = 1;
    focusToGuide(1);
    indexGuide = indexGuide + 1;
  }
}

var getOffsetTop = function (elem) {
  // Set our distance placeholder
  var distance = 0;

  // Loop up the DOM
  if (elem.offsetParent) {
    do {
      distance += elem.offsetTop;
      elem = elem.offsetParent;
    } while (elem);
  }

  // Return our distance
  return distance < 0 ? 0 : distance;
};

var getOffsetLeft = function (elem) {
  // Set our distance placeholder
  var distance = 0;

  // Loop up the DOM
  if (elem.offsetParent) {
    do {
      distance += elem.offsetLeft;
      elem = elem.offsetParent;
    } while (elem);
  }

  // Return our distance
  return distance < 0 ? 0 : distance;
};

function focusToGuide(index) {
  var elem = document.getElementById("focusGuide" + index);
  heightWeb = document.body.offsetHeight;
  var topDist = getOffsetTop(elem);
  var leftDist = getOffsetLeft(elem);

  var focusOverlay = document.getElementById("focusOverlay");
  focusOverlay.classList.remove("d-none");
  focusOverlay.style.left = leftDist - 20 + "px";
  focusOverlay.style.top = topDist - 20 + "px";
  focusOverlay.style.width = elem.offsetWidth + 40 + "px";
  focusOverlay.style.height = elem.offsetHeight + 40 + "px";
  focusOverlay.style.boxShadow =
    "rgb(100 100 100 / 60%) 0px 0px 0px 9999px, rgb(100 100 100 / 60%) 0px 0px 12px 12px inset";

  var focusOverblock = document.getElementById("focusOverblock");
  focusOverblock.classList.remove("d-none");
  focusOverblock.style.width = "100%";
  focusOverblock.style.height = heightWeb + "px";

  var focusCardnum = document.getElementById("focusCardnum");
  focusCardnum.innerHTML = index + "/" + totalGuide;

  document.getElementById("focusCardtext").innerHTML = guideText[index - 1];
  if (index != totalGuide) {
    document
      .getElementById("focusCardbtn")
      .setAttribute("onclick", "focusGuideNext(" + (index + 1) + ")");
  } else {
    document
      .getElementById("focusCardbtn")
      .setAttribute("onclick", "focusGuideEnd()");
    document.getElementById("focusCardbtn").innerHTML = "Finish";
  }

  var focusOvercard = document.getElementById("focusOvercard");
  focusOvercard.classList.remove("d-none");
  focusOvercard.style.width = elem.offsetWidth + 40 + "px";
  if (screen.width - leftDist < 312) {
    focusOvercard.style.left = screen.width - 312 + "px";
  } else {
    focusOvercard.style.left = leftDist - 20 + "px";
  }
  focusOvercard.style.top = topDist - focusOvercard.offsetHeight - 20 + "px";

  focusOvercard.scrollIntoView();
  focusOvercard.focus();

  document.body.setAttribute("onresize", "focusResize(" + indexGuide + ")");
}

function focusResize(index) {
  if (indexGuide <= totalGuide) {
    var elem = document.getElementById("focusGuide" + index);
    heightWeb = document.body.offsetHeight;
    var topDist = getOffsetTop(elem);
    var leftDist = getOffsetLeft(elem);

    var focusOverlay = document.getElementById("focusOverlay");
    //focusOverlay.classList.remove('d-none');
    focusOverlay.style.left = leftDist - 20 + "px";
    focusOverlay.style.top = topDist - 20 + "px";
    focusOverlay.style.width = elem.offsetWidth + 40 + "px";
    focusOverlay.style.height = elem.offsetHeight + 40 + "px";
    focusOverlay.style.boxShadow =
      "rgb(100 100 100 / 60%) 0px 0px 0px 9999px, rgb(100 100 100 / 60%) 0px 0px 12px 12px inset";

    var focusOverblock = document.getElementById("focusOverblock");
    //focusOverblock.classList.remove('d-none');
    focusOverblock.style.width = "100%";

    var focusOvercard = document.getElementById("focusOvercard");
    focusOvercard.style.width = elem.offsetWidth + 40 + "px";
    if (screen.width - leftDist < 312) {
      focusOvercard.style.left = screen.width - 312 + "px";
    } else {
      focusOvercard.style.left = leftDist - 20 + "px";
    }
    focusOvercard.style.top = topDist - focusOvercard.offsetHeight - 20 + "px";
  }
}

var cardPageList;
var initTemp = 0;
var searchedCard = 0;
var clearSearchCard = 0;

$(document).ready(function () {
  var url = window.location;

  cardPageList = document.getElementById("cardPage");
  $("#cardPage").paginate();

  $(".sidebar .navbar-nav").find(".active").removeClass("active");
  $(".nav-link").each(function () {
    if (this.href === url.href) {
      $(this).parent().addClass("active");
    }
  });
  $(".dropdown-item-cust").each(function () {
    if (this.href === url.href) {
      $(this).addClass("active");
      $(this).parent().parent().addClass("active");
    }
  });

  $("#loadingScreen").css("display", "none");

  var divsToHide = document.getElementsByClassName("bd-clipboard"); //divsToHide is an array
  for (var i = 0; i < divsToHide.length; i++) {
    divsToHide[i].style.visibility = "hidden"; // or
    divsToHide[i].style.display = "none"; // depending on what you're doing
  }

  $('[data-toggle="tooltip"]').tooltip();
  $('[data-toggle="popover"]').popover();

  $("#dataTable").DataTable();
});

//Card Pagination
(function ($) {
  $.paginate = function (element, options) {
    /*
            #Defaults
        */
    var defaults = {
      perPage: 12, //how many items per page
      autoScroll: true, //boolean: scroll to top of the container if a user clicks on a pagination link
      scope: "", //which elements to target
      paginatePosition: ["bottom"], //defines where the pagination will be displayed
      containerTag: "nav",
      paginationTag: "ul",
      itemTag: "li",
      linkTag: "a",
      useHashLocation: true, //Determines whether or not the plugin makes use of hash locations
      onPageClick: function () {}, //Triggered when a pagination link is clicked
    };

    var plugin = this;
    var plugin_index = $(".paginate").length;

    plugin.settings = {};

    var $element = $(element);

    var curPage, items, offset, maxPage;

    /*
            #Initliazes plugin
        */
    plugin.init = function () {
      plugin.settings = $.extend({}, defaults, options);

      curPage = 1;
      items = $element.children(plugin.settings.scope);
      maxPage = Math.ceil(items.length / plugin.settings.perPage); //determines how many pages exist

      if (searchedCard == 0) {
        var searchHTML = generateSearch();
        $element.before(searchHTML);
      }

      if (initTemp == 0) {
        $element.after(generateTemp());
        initTemp = 1;
      }

      if (maxPage > 0) {
        var paginationHTML = generatePagination(); //generate HTML for pageination

        //if ($.inArray('top', plugin.settings.paginatePosition) > -1) {
        //    $element.before(paginationHTML);
        //}

        //if ($.inArray('bottom', plugin.settings.paginatePosition) > -1) {
        //    $element.after(paginationHTML);
        //}

        $element.after(paginationHTML);

        $element.addClass("paginate");
        $element.addClass("paginate-" + plugin_index);

        var hash = location.hash.match(/\#paginate\-(\d)/i);

        plugin.switchPage(1);
      }

      //Check if URL has matching location hash
      // if(hash && plugin.settings.useHashLocation) {
      //     plugin.switchPage(hash[1]);
      // } else {
      //     plugin.switchPage(1);
      // }
    };

    /*
            #Switch to Page > 'page'
        */
    plugin.switchPage = function (page) {
      if (page == "next") {
        page = curPage + 1;
      }
      if (page == "prev") {
        page = curPage - 1;
      }

      if (page >= maxPage) {
        $("#page-number").val(maxPage);
        page = maxPage;
      }

      if (page <= 1) {
        $("#page-number").val(1);
        page = 1;
      }

      curPage = page;
      //If page is out of range return false
      // if(page < 1 || page > maxPage) {
      //     return false;
      // }

      if (page >= maxPage) {
        $(".paginate-pagination-" + plugin_index)
          .find(".page-next")
          .addClass("deactive");
        page = maxPage;
      } else {
        $(".paginate-pagination-" + plugin_index)
          .find(".page-next")
          .removeClass("deactive");
      }

      $(".paginate-pagination-" + plugin_index)
        .find(".active")
        .removeClass("active");
      $(".paginate-pagination-" + plugin_index)
        .find(".page-" + page)
        .addClass("active");

      offset = (page - 1) * plugin.settings.perPage;

      $(items).hide();

      //Display items of page
      for (i = 0; i < plugin.settings.perPage; i++) {
        if ($(items[i + offset]).length) $(items[i + offset]).fadeTo(100, 1);
      }

      //Deactive prev button
      if (page == 1) {
        $(".paginate-pagination-" + plugin_index)
          .find(".page-prev")
          .addClass("deactive");
      } else {
        $(".paginate-pagination-" + plugin_index)
          .find(".page-prev")
          .removeClass("deactive");
      }

      //Deactive next button
      if (page == maxPage) {
        $(".paginate-pagination-" + plugin_index)
          .find(".page-next")
          .addClass("deactive");
        $(".paginate-pagination-" + plugin_index)
          .find(".page-next")
          .attr("disable");
      } else {
        $(".paginate-pagination-" + plugin_index)
          .find(".page-next")
          .removeClass("deactive");
        $(".paginate-pagination-" + plugin_index)
          .find(".page-next")
          .removeAttr("disable");
      }

      curPage = page;

      $("#page-number").val(page);

      return curPage;
    };

    /*
        #Kills plugin
        */
    plugin.kill = function () {
      $(items).show();
      $(".paginate-pagination-" + plugin_index).remove();
      $element.removeClass("paginate");
      $element.removeData("paginate");
    };

    var generateTemp = function () {
      //var cardPageListInner = cardPageList.innerHTML;

      const tempEl = document.createElement("ul");
      tempEl.setAttribute("id", "tempCardList");
      tempEl.setAttribute("class", "d-none");

      var cardListString = {
        a: "",
      };
      cardListString.a = String(cardPageList.cloneNode(true).innerHTML);

      const cardListStringTemp = Object.assign({}, cardListString);

      tempEl.innerHTML = cardListStringTemp.a;

      return tempEl;
    };

    var generateSearch = function () {
      var searchEl =
        '<label id="searchPageBar" class="w-100 text-right mb-3">Search:<input type="text" id="searchBarCard" class="form-control ml-1 d-inline" placeholder="Search here..." aria-controls="searchCard" style="width: fit-content;"><button class="btn btn-outline-primary d-none" type="button" id="clearSearchBar"><span id="clearSearchCard"></span><i class="fas fa-fw fa-times ml-1"></i></button></label>';

      $(document).on("keyup", "#searchBarCard", function (e) {
        e.preventDefault();

        var textSearch = $(this).val();

        plugin.kill();

        var cardPageTemp = document.getElementById("tempCardList");
        cardPageList.innerHTML = cardPageTemp.innerHTML;

        if (textSearch != "") {
          var cardList = cardPageList.getElementsByTagName("li");

          var removeCount = 0;

          const removeList = [];
          for (var i = 0; i < cardPageTemp.childElementCount; ++i) {
            var textCard = cardList[i].innerText || cardList[i].textContent;
            if (!textCard.toLowerCase().includes(textSearch.toLowerCase())) {
              removeList.push(i);
            }
          }

          for (var i = removeList.length - 1; i >= 0; --i) {
            var currRemove = removeList[i];
            cardPageList.removeChild(cardPageList.children[currRemove]);
          }
        }

        $("#cardPage").paginate();
      });

      searchedCard = 1;
      return searchEl;
    };

    /*
        #Generates HTML for pagination (nav)
        */
    var generatePagination = function () {
      var paginationEl =
        "<" +
        plugin.settings.containerTag +
        ' style="padding-inline-start:0" class="paginate-pagination paginate-pagination-' +
        plugin_index +
        '" data-parent="' +
        plugin_index +
        '">';
      paginationEl +=
        "<" +
        plugin.settings.paginationTag +
        ' class="col row" style="list-style:none;">';

      paginationEl += "<" + plugin.settings.itemTag + ">";
      paginationEl +=
        "<" +
        plugin.settings.linkTag +
        ' data-page="prev" class="page page-prev page-link rounded-sm-left bg-primary text-white">Previous</' +
        plugin.settings.linkTag +
        ">";
      paginationEl += "</" + plugin.settings.itemTag + ">";

      // for(i = 1; i <= maxPage; i++) {
      //     paginationEl += '<' + plugin.settings.itemTag + '>';
      //     paginationEl += '<' + plugin.settings.linkTag + ' href="#paginate-' + i + '" data-page="' + i + '" class="page page-' + i + '">' + i + '</' + plugin.settings.linkTag + '>';
      //     paginationEl += '</' + plugin.settings.itemTag + '>';
      // }

      //custom input
      paginationEl += "<" + plugin.settings.itemTag + ">";
      paginationEl +=
        '<input class="page-link text-dark" size="1" style="text-align:center;" type="text" id="page-number">';
      paginationEl += "</" + plugin.settings.itemTag + ">";

      paginationEl +=
        "<" +
        plugin.settings.itemTag +
        ' class="page-link text-dark bg-light">';
      paginationEl += '<label class="mb-0"> / ' + maxPage + "</label>";
      paginationEl += "</" + plugin.settings.itemTag + ">";

      paginationEl += "<" + plugin.settings.itemTag + ">";
      paginationEl +=
        "<" +
        plugin.settings.linkTag +
        ' data-page="next" class="page page-next page-link rounded-sm-right bg-primary text-white">Next</' +
        plugin.settings.linkTag +
        ">";
      paginationEl += "</" + plugin.settings.itemTag + ">";

      paginationEl += "</" + plugin.settings.paginationTag + ">";
      paginationEl += "</" + plugin.settings.containerTag + ">";

      //Adds event listener for the buttons
      $(document).on(
        "click",
        ".paginate-pagination-" + plugin_index + " .page",
        function (e) {
          e.preventDefault();

          var page = $(this).data("page");
          var paginateParent = $(this)
            .parents(".paginate-pagination")
            .data("parent");

          //Call onPageClick callback function
          $(".paginate-" + paginateParent)
            .data("paginate")
            .settings.onPageClick();

          page = $(".paginate-" + paginateParent)
            .data("paginate")
            .switchPage(page);

          if (page) {
            if (plugin.settings.useHashLocation)
              location.hash = "#paginate-" + page; //set location hash

            if (plugin.settings.autoScroll)
              $("html, body").animate(
                { scrollTop: $(".paginate-" + paginateParent).offset().top },
                "slow"
              );
          }

          $("#page-number").val(page);
        }
      );

      $(document).on("change", "#page-number", function (e) {
        e.preventDefault();

        var page = $(this).val();

        if (page > maxPage) {
          $("#page-number").val(maxPage);
        }
        if (page < 1) {
          $("#page-number").val(1);
        }

        var paginateParent = $(this)
          .parents(".paginate-pagination")
          .data("parent");

        page = $(".paginate-" + paginateParent)
          .data("paginate")
          .switchPage(page);

        if (page) {
          if (plugin.settings.useHashLocation)
            location.hash = "#paginate-" + page; //set location hash

          if (plugin.settings.autoScroll)
            $("html, body").animate(
              { scrollTop: $(".paginate-" + paginateParent).offset().top },
              "slow"
            );
        }
      });

      return paginationEl;
    };

    plugin.init();
  };

  $.fn.paginate = function (options) {
    return this.each(function () {
      if (undefined === $(this).data("paginate")) {
        var plugin = new $.paginate(this, options);
        $(this).data("paginate", plugin);
      }
    });
  };

  $(document).ready(function () {
    curPage = 1;
    $("#page-number").val(1);
  });
})(jQuery);
