var breakTime = 5,
  sessionTime = 25;
var min = sessionTime,
  sec = 0;
var timerId = "",
  interval = 1000;
var isReset = inSession = true;

function update(el, time) {
  time = (time < 10 ? 0 : "") + String(time);
  $(el).text(time);
}

function timer() {
  sec--;
  if (sec < 0) {
    sec = 59;
    min--;
    if (min < 0) {
      min = inSession ? breakTime : sessionTime;
      sec = 0;
      inSession = !inSession;
      var str = inSession ? "until your session ends" : "until your break ends";
      update(".info", str);
    }
    update("#min", min);
  }
  update("#sec", sec);
}

$(".modifier").on("click", function() {

  var cmnd = $(this).attr("id");

  switch (cmnd) {
    case "break-minus":
      breakTime = breakTime === 1 ? 1 : breakTime - 1;
      update("#break", breakTime);
      break;

    case "break-plus":
      breakTime += 1;
      update("#break", breakTime);
      break;
    case "session-minus":
      sessionTime = sessionTime === 1 ? 1 : sessionTime - 1;
      update("#session", sessionTime);
      if (isReset) {
        update("#min", sessionTime)
      }
      break;

    case "session-plus":
      sessionTime += 1;
      update("#session", sessionTime);
      if (isReset) {
        update("#min", sessionTime)
      }
      break;
  }

});

$("button").on("click", function() {
  btnVal = $(this).attr("value");
  switch (btnVal) {

    case "start":
      $(this).attr("value", "pause").html("<i class=\"material-icons lg\">pause_circle_outline</i>");
      isSession = true;
      min = sessionTime;
      timerId = setInterval(function() {
        timer()
      }, interval);
      isReset = false;
      break;

    case "pause":
      $(this).attr("value", "resume").html("<i class=\"material-icons lg\">play_circle_outline</i>");
      clearInterval(timerId);
      break;

    case "resume":
      $(this).attr("value", "pause").html("<i class=\"material-icons lg\">pause_circle_outline</i>");
      timerId = setInterval(function() {
        timer()
      }, interval);
      break;

    case "reset":
      $("#btn-main").attr("value", "start").html("<i class=\"material-icons lg\">play_circle_outline</i>");
      clearInterval(timerId);
      min = sessionTime, sec = 0;
      update("#min", min);
      update("#sec", sec);
      update(".info", "until your session ends");
      isReset = true;
      break;

    case "set-default":
      $("#btn-main").attr("value", "start").html("<i class=\"material-icons lg\">play_circle_outline</i>");
      clearInterval(timerId);
      min = sessionTime = 25, breakTime = 5, sec = 0;
      update("#break", breakTime);
      update("#session", sessionTime);
      update("#min", min);
      update("#sec", sec);
      update(".info", "until your session ends");
      isReset = true;
      break;
  }
});