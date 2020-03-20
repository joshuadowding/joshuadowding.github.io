$(document).ready(function () {
  $("#theme-toggle #dark").hide();
  $(".menu-toggle #close").hide();

  $(".hover-tooltip").tooltip();

  $("#theme-toggle").click(function () {
    if ($("#theme-toggle #dark").is(":hidden")) {
      $(":root").addClass("theme-dark");

      $("#theme-toggle #dark").show();
      $("#theme-toggle #light").hide();
    }
    else {
      $(":root").removeClass("theme-dark");

      $("#theme-toggle #dark").hide();
      $("#theme-toggle #light").show();
    }
  });

  $(".menu-toggle").click(function () {
    if ($(".menu-toggle #close").is(":hidden")) {
      $(".sidenav").addClass("show");

      $(".menu-toggle #close").show();
      $(".menu-toggle #open").hide();
    }
    else {
      $(".sidenav").removeClass("show");

      $(".menu-toggle #close").hide();
      $(".menu-toggle #open").show();
    }
  });

  $(window).resize(function() {
    if($(window).width() > 768 && $(".sidenav").hasClass("show")) {
      $(".sidenav").removeClass("show");

      $(".menu-toggle #close").hide();
      $(".menu-toggle #open").show();
    }
  });

  detect_theme_preference();

  $('article').each(function() {
    $(this).readingTime({
        readingTimeTarget: $(this).find('.reading-time'),
        wordCountTarget: $(this).find('.word-count'),
        remotePath: $(this).data('file'),
        remoteTarget: $(this).data('target'),
        wordsPerMinute: 200, // NOTE: Slightly conservative (avg. 200-250).
        round: true,
        lang: 'en',
        error: function() {
            $(this).find('.reading-time').remove();
        }
    });
  });
});

function toggle_theme() {
  var _currentTime = new Date();
  if (_currentTime.getHours() >= 19 || _currentTime.getHours <= 6) {
    $(":root").addClass("theme-dark");

    $("#theme-toggle #dark").show();
    $("#theme-toggle #light").hide();
  }
}

function detect_theme_preference() {
  var isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  var isLight = window.matchMedia("(prefers-color-scheme: light)").matches;
  var isImpartial = window.matchMedia("(prefers-color-scheme: no-preference)").matches;
  var isNotSupported = !isDark && !isLight && !isImpartial;

  if (!isNotSupported) {
    if (isDark) {
      $(":root").addClass("theme-dark");

      $("#theme-toggle #dark").show();
      $("#theme-toggle #light").hide();
    }
    else if (isLight) {
      $(":root").removeClass("theme-dark");

      $("#theme-toggle #dark").hide();
      $("#theme-toggle #light").show();
    }
    else if (isImpartial) {
      toggle_theme();
    }
    else { // catch-all:
      toggle_theme();
    }
  }
}
