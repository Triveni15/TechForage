var url = "https://docs.google.com/spreadsheets/d/1iwfAxop2pmqTJWNbKnLqE5axP8lohMYRuCdUtp6d028/edit#gid=0";
var ss = SpreadsheetApp.openByUrl(url);

function doPost(e)
{
  var sendJSON ={};
  //Logger.log(e);
  
  if(1 == e.parameter.mode)
  {
    var chances = verifyLogin(e); 
    sendJSON = {Left:chances};
  }
  return ContentService.createTextOutput(JSON.stringify(sendJSON)).setMimeType(ContentService.MimeType.JSON);
}

function verifyLogin(e)
{
    var workSheet = ss.getSheetByName("checkLogin");
    var data = workSheet.getRange(2,1,workSheet.getLastRow()-1,3).getValues();
    
    var l = workSheet.getLastRow();
  
    //Logger.log(data)
    var mail = data.map(function(r) {return r[0];} );
    var passcode = data.map(function(r) {return r[1];} ); 
    var attemptsRow = data.map(function(r) {return r[2];} );
    
    var index = mail.indexOf(e.parameter.email);
    // Logger.log(index);
    if(index > -1)
    {
        if(passcode[index] == e.parameter.otp)
        {
          return "Verified";
        }
        else
        {
          var chance = attempts(index,attemptsRow,workSheet);
          return chance;
        }
    }
    else
    { 
        return "Not registered";
    }
}


function attempts(index,attemptsRow,ws)
{
    var left = attemptsRow[index] -1;
    
    //Logger.log(index);
    for(var i=0; i<=ws.getLastRow(); i++)
    { 
        if(i == index)
        {
            ws.getRange(i+2, 3).setValue(left);
        }
    }
    return left;
}
