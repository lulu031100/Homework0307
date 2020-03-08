// Livedoorの天気APIを取り込んでslackbotに送信する。2020/3/08
//変更箇所　浜松市
//

function notifyEvent() {
  var response = UrlFetchApp.fetch("http://weather.livedoor.com/forecast/webservice/json/v1?city=220040"); //URL+cityID
  var json=JSON.parse(response.getContentText());
  var description = json["description"]["text"];
  var location_title = json["title"]
 // 天気予報の地域名をセット
  var message = "Hello TSfCM team!\n" + location_title + "ここ3日間の天気をお知らせするよっ\n";
  for ( var i = 0;  i < 3;  i++ ) {
    message +=  json["forecasts"][i]["date"] +"(" + json["forecasts"][i]["dateLabel"] + ")の天気：" + json["forecasts"][i]["telop"] +"\n";
  }
  message += "\n" + description;

  // slack送信
  slackBot(message);
}

function slackBot(message) {
  var bot = message;

  var url = "https://hooks.slack.com/services/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";
  var options = {
    "method" : "POST",
    "headers": {"Content-type": "application/json"},
    "payload" : '{"text":"' + message + '"}'
  };
  UrlFetchApp.fetch(url, options);
}
