var version = "v1.2.0";
$("span#brand").html("版杀天庭辅助工具" + version);

var hideAll = function(){
  $("div#main-region").hide();
  $("div#error-region").hide();
  $("div#force-region").hide();
  $("div#number-set-region").hide();
  $("div#role-region").hide();
  $("div#injure-region").hide();
  $("div#broadcast-region").hide();
};

var role = function(){
  hideAll();
  $("div#role-region").show();
  $("div#role-id-region").hide();
}

var force = function(){
  hideAll();
  $("div#force-region").show();
  $("div#force-result-region").hide();
};

var number = function(){
  hideAll();
  $("div#number-set-region").show();
  $("div#number-set-result-region").hide();
};

var injure = function(){
  hideAll();
  $("div#injure-region").show();
  $("div#injure-input-region").hide();
  $("div#injure-result-region").hide();
}

var broadcast = function(){
  hideAll();
  $("div#broadcast-region").show();
  //spinLoading("div#spin-region");
  //dynamicProgressBar("div#progress-bar-region");
}

var forceDecide = function(){
  var forceText = $("input#force-list").val();
  var idText = $("input#force-id-list").val();
  var forceList = forceText.trim().split(" ");
  var idList = idText.trim().split(" ");
  var title = idList.length + "家抽取" + forceList.length + "个势力。"
  var rs = new Array();
  var checked = document.getElementById("force-checkbox").checked;
  for (var j = 0; j < idList.length; j++){
    rs[j] = "<li>" + idList[j] + "：";
  }
  shuffleArray(forceList);
  var more = forceList.length % idList.length;
  if (checked && more != 0){ 
    title = title.concat("去掉了" + more + "个多余的势力。");
    for (var i = 0; i < more; i++){
      forceList.pop();
    }
  }
  for (var i = 0, j = 0; i < (forceList.length); i++, j++){
    rs[j % idList.length] = rs[j % idList.length].concat(forceList[i] + "&nbsp");
  }
  for (var j = 0; j < idList.length; j++){
    rs[j] = rs[j].concat("</li>");
  }
  $("div#force-result-region").show();
  $("label#force-result-title").html(title + "抽取结果：");
  $("label#force-result-content").html("<ul>" + rs.join("") + "</ul>");
};

var roleNumChange = function(){
  var num = document.getElementById("role-num").value;
  document.getElementById("id-area").rows = parseInt(num);
  document.getElementById("role-area").rows = parseInt(num);
  $("div#role-id-region").show();
  $("div#role-id-result-region").hide();
};

var readRoles = function(type){
  var roles = $("textarea#role-area").val();
  
  $.each(allRoles, function(infoIndex, info){
    if (info["id"] === type){
      $.each(info["people"], function(innerIndex, inner){
        roles = roles + inner["name"] + "\n";
      })
    }
  });
  $("textarea#role-area").val(roles);
};

var roleIdStart = function(){
  var num = document.getElementById("role-num").value;
  var idList = $("textarea#id-area").val().split("\n");
  var roleList = $("textarea#role-area").val().split("\n");

  //remove the last item if it is null
  if (idList[idList.length - 1] == ""){
    idList.pop();
  }
  if (roleList[roleList.length - 1] == ""){
    roleList.pop();
  }

  //validation
  if (idList.length != num){
    alert("ID数目不符！");
    return;
  }
  if (roleList.length != num){
    alert("角色数目不符！");
    return;
  }

  shuffleArray(roleList);
  var tableContent = "";
  for (var i = 0; i < num; i++){
    tableContent = tableContent.concat("<tr>" + "<td>" + idList[i] + "</td>" + "<td>" + roleList[i] + "</td>" + "</tr>");
  }
  $("table#role-id-result-table").html(tableContent);
  $("div#role-id-region").hide();
  $("div#role-id-result-region").show();
};

var numberSet = function(){
  var choices = $("textarea#number-set-input").val().trim().split(" ");
  var rs = new Array();
  var content = "<label>";
  if (choices.length == 1){
    alert("→_→ 耍我是吧，有什么好选的！");
    return;
  } else if (choices.length == 2 || choices.length == 5){ //0-9
    for (var i = 0; i < 10; i++){
      rs.push(choices[i % choices.length]);
    }
    shuffleArray(rs);
    for (var i = 0; i < 10; i++){
      content += (i + "：" + rs[i] + "</label><label>")
    }
    content += "</label>";
    $("div#number-set-result-region").html(content);
    $("div#number-set-result-region").show();
    return;
  } else if (choices.length == 3){ //1-9
    for (var i = 0; i < 9; i++){
      rs.push(choices[i % 3]);
    }
  } else if (choices.length == 4){ //1-8
    for (var i = 0; i < 8; i++){
      rs.push(choices[i % 4]);
    }
  } else { //1-n
    rs = choices;
  }
  shuffleArray(rs);
  for (var i = 0; i < rs.length; i++){
    content += ((i+1) + "：" + rs[i] + "</label><label>")
  }
  content += "</label>";
  $("div#number-set-result-region").html(content);
  $("div#number-set-result-region").show();
};

var injureRs;

var injureInit = function(){
  var serialNumber = new Array();
  for (var i = 0; i < 10; i++){
    serialNumber[i] = i;
  }
  shuffleArray(serialNumber);
  $("input#serialNumber").val(serialNumber.join(""));
  var injureRadio = $("input#injureRadios:checked").val();
  switch(injureRadio){
    case '1':
    injureRs = new Array('痊愈', '痊愈', '痊愈', '继续受伤', '继续受伤', '继续受伤', '继续受伤', '死亡', '死亡', '死亡');
    break;
    case '2':
    injureRs = new Array('痊愈', '痊愈', '痊愈', '痊愈', '痊愈', '死亡', '死亡', '死亡', '死亡', '死亡');
    break;
    case '3':
    injureRs = new Array('继续受伤', '继续受伤', '继续受伤', '继续受伤', '继续受伤', '死亡', '死亡', '死亡', '死亡', '死亡');
    break;
    case '4':
    injureRs = new Array('痊愈', '痊愈', '痊愈', '痊愈', '痊愈', '继续受伤', '继续受伤', '继续受伤', '继续受伤', '继续受伤');
    break;
  }
  shuffleArray(injureRs);
  $("div#injure-input-region").show();
};

var injureDecide = function(){
  var outputRs;
  
  outputRs = "<label>";
  for (var i = 0; i < 10; i++){
    outputRs += (i + "：" + injureRs[i] + "&nbsp&nbsp&nbsp&nbsp")
  }
  var injureInput = $("input#injureInput").val().charAt(0);
  if (isNaN(injureInput) || injureInput < 0 || injureInput > 9){
    alert("请输入数字好吗亲！");
    return;
  }
  outputRs += ("</label><label>输入的数字是：" + injureInput + "</label><label>伤判结果：" + injureRs[injureInput] + "</label>");
  $("div#injure-result-region").html(outputRs);
  $("div#injure-result-region").show();
};

hideAll();