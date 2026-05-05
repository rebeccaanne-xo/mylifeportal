// ════════════════════════════════════════════════════════
// REBECCA PORTAL — SHEET UPDATER
// Run updateSheetStructure() to add new tabs and fields
// ════════════════════════════════════════════════════════

var SHEET_ID = '1hsUIV99MoU9p8fAoZiX4igf8oxpQmwGXJPF0JFj_eTg';

function updateSheetStructure() {
  var ss = SpreadsheetApp.openById(SHEET_ID);
  
  updatePeopleTab(ss);
  addBillsTab(ss);
  addRemindersTab(ss);
  addDailyLogTab(ss);
  addMoneyOwedTab(ss);
  
  Logger.log('Sheet structure updated successfully');
  Logger.log('New tabs: Bills, Reminders, Daily Log, Money Owed');
  Logger.log('Updated: People tab with full contact card fields');
}

// ══ UPDATE PEOPLE TAB ══
function updatePeopleTab(ss) {
  // Delete old People tab and recreate with full contact card fields
  var old = ss.getSheetByName('People');
  if(old) ss.deleteSheet(old);
  
  var sheet = ss.insertSheet('People');
  
  var headers = [
    'ID', 'Name', 'Role', 'Color', 
    'Phone', 'Email', 'Birthday', 
    'Best Contact Method',
    'Instagram', 'Facebook', 'TikTok', 'LinkedIn', 'Other Social',
    'Address', 'City', 'State',
    'How You Know Them',
    'Last Contacted', 'Contact Frequency',
    'Praying For',
    'Money Owed To Them', 'Money They Owe You',
    'Money Notes',
    'Notes',
    'Date Added'
  ];
  
  var headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setValues([headers]);
  headerRange.setBackground('#1B2A4A');
  headerRange.setFontColor('#F7EEF1');
  headerRange.setFontWeight('bold');
  headerRange.setFontSize(11);
  sheet.setFrozenRows(1);
  sheet.autoResizeColumns(1, headers.length);
  
  // Re-seed people with full contact card
  var now = new Date();
  var people = [
    [Date.now()+1, 'Seth Peralta', 'Husband · common-law · home + life partner', '#C2738A',
     '', '', '', 'In person', '', '', '', '', '',
     '', 'Allen', 'TX', 'Partner · life · home',
     '', 'Daily', true, 0, 0, '', 'Common-law husband · Uber Black driver · 9 months sober from kratom · recovering from trauma · finding his way', now],
    [Date.now()+2, 'Olivia', 'Best friend · Mustard Seed Ministries founder · first year of widowhood', '#4A7C6F',
     '', '', '', 'Text / call', '', '', '', '', '',
     '', '', 'WA', 'Best friend · faith community',
     '', 'Weekly', true, 0, 0, '', 'First year of widowhood · lost her husband · founding Mustard Seed · handle with care · her vision · her anchor', now],
    [Date.now()+3, 'Cindy', 'Friend · co-supporting Olivia on Mustard Seed', '#4A7C6F',
     '', '', '', 'Text', '', '', '', '', '',
     '', '', '', 'Friend · faith community',
     '', 'Monthly', false, 0, 0, '', 'Co-supporting Olivia alongside Rebecca on Mustard Seed Ministries', now],
    [Date.now()+4, 'Kelly', 'GBB client · Graphic Arts Print Shop · Missouri', '#2D6B6B',
     '', '', '', 'Email / phone', '@graphicartsprintshop', 'Graphic Arts Print Shop', '', '', '',
     '', '', 'MO', 'First GBB client · print shop owner',
     '', 'Weekly', false, 0, 0, '', 'First GBB client · Facebook only currently · landing page in progress · waiting to hear back', now],
  ];
  
  people.forEach(function(row) { sheet.appendRow(row); });
  Logger.log('People tab updated with ' + people.length + ' contacts');
}

// ══ ADD BILLS TAB ══
function addBillsTab(ss) {
  var existing = ss.getSheetByName('Bills');
  if(existing) ss.deleteSheet(existing);
  
  var sheet = ss.insertSheet('Bills');
  
  var headers = [
    'ID', 'Name', 'Amount', 'Due Date', 'Due Day of Month',
    'Category', 'Recurring', 'Frequency',
    'Paid', 'Date Paid', 'Auto Pay',
    'Account', 'Notes', 'Date Added'
  ];
  
  var headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setValues([headers]);
  headerRange.setBackground('#1B2A4A');
  headerRange.setFontColor('#F7EEF1');
  headerRange.setFontWeight('bold');
  sheet.setFrozenRows(1);
  sheet.autoResizeColumns(1, headers.length);
  
  // Seed with example bills structure
  var now = new Date();
  var bills = [
    [Date.now()+1, 'Cloudflare', '$0', '', 1, 'Business', true, 'monthly', false, '', false, 'rebeccaannexo@gmail.com', 'Free tier currently', now],
    [Date.now()+2, 'GitHub', '$0', '', 1, 'Business', true, 'monthly', false, '', false, 'rebeccaannexo@gmail.com', 'Free tier currently', now],
    [Date.now()+3, 'Claude.ai', '$20', '', 1, 'Business', true, 'monthly', false, '', false, '', '$20/month subscription', now],
    [Date.now()+4, 'GoHighLevel', '$0', '', 1, 'Business', false, 'monthly', false, '', false, '', '14-day trial not started yet', now],
  ];
  
  bills.forEach(function(row) { sheet.appendRow(row); });
  Logger.log('Bills tab created');
}

// ══ ADD REMINDERS TAB ══
function addRemindersTab(ss) {
  var existing = ss.getSheetByName('Reminders');
  if(existing) ss.deleteSheet(existing);
  
  var sheet = ss.insertSheet('Reminders');
  
  var headers = [
    'ID', 'Title', 'Notes',
    'Person ID', 'Person Name',
    'Type', 'Due Date', 'Due Time',
    'Priority', 'Recurring', 'Frequency',
    'Done', 'Date Completed',
    'Section', 'Date Created'
  ];
  
  var headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setValues([headers]);
  headerRange.setBackground('#1B2A4A');
  headerRange.setFontColor('#F7EEF1');
  headerRange.setFontWeight('bold');
  sheet.setFrozenRows(1);
  sheet.autoResizeColumns(1, headers.length);
  
  Logger.log('Reminders tab created');
}

// ══ ADD DAILY LOG TAB ══
function addDailyLogTab(ss) {
  var existing = ss.getSheetByName('Daily Log');
  if(existing) ss.deleteSheet(existing);
  
  var sheet = ss.insertSheet('Daily Log');
  
  var headers = [
    'ID', 'Date', 'Time', 'Symbol',
    'Type', 'Text', 'Tags',
    'Migrated', 'Migrated To',
    'Linked Section', 'Approved'
  ];
  
  var headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setValues([headers]);
  headerRange.setBackground('#1B2A4A');
  headerRange.setFontColor('#F7EEF1');
  headerRange.setFontWeight('bold');
  sheet.setFrozenRows(1);
  sheet.autoResizeColumns(1, headers.length);
  
  Logger.log('Daily Log tab created');
}

// ══ ADD MONEY OWED TAB ══
function addMoneyOwedTab(ss) {
  var existing = ss.getSheetByName('Money Owed');
  if(existing) ss.deleteSheet(existing);
  
  var sheet = ss.insertSheet('Money Owed');
  
  var headers = [
    'ID', 'Direction', 'Person or Business',
    'Person ID', 'Amount', 'Reason',
    'Date Incurred', 'Due Date',
    'Paid', 'Date Paid',
    'Payment Plan', 'Monthly Payment',
    'Notes', 'Date Added'
  ];
  
  var headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setValues([headers]);
  headerRange.setBackground('#1B2A4A');
  headerRange.setFontColor('#F7EEF1');
  headerRange.setFontWeight('bold');
  sheet.setFrozenRows(1);
  sheet.autoResizeColumns(1, headers.length);
  
  // Seed with known financial context
  var now = new Date();
  var rows = [
    [Date.now()+1, 'We owe', 'Family court lawyers', '', '$14,000', 'Fynnlea custody battle — lawyers dropped case', '2024', '', true, '', false, '', 'Paid — lawyers dropped Seth after this amount', now],
  ];
  
  rows.forEach(function(row) { sheet.appendRow(row); });
  Logger.log('Money Owed tab created');
}

// ════════════════════════════════════════════════════════
// UPDATED WEB APP — handles new sheets
// Replace your existing doPost/doGet with this
// ════════════════════════════════════════════════════════

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var action = data.action;
    var ss = SpreadsheetApp.openById(SHEET_ID);
    
    switch(action) {
      case 'saveTask':
        return saveRow(ss,'Tasks',[data.id,data.text,data.section,data.done,data.priority,data.dateCreated||new Date(),data.dateCompleted||'']);
      case 'updateTask':
        return updateRow(ss,'Tasks',data.id,{Done:data.done,'Date Completed':data.done?new Date().toLocaleDateString():''});
      case 'deleteTask':
        return deleteRow(ss,'Tasks',data.id);
      case 'saveHabit':
        return saveRow(ss,'Habits',[data.id,data.name,data.emoji,data.freq,data.points,data.double,data.streak,data.lastDone,new Date()]);
      case 'logHabit':
        return saveRow(ss,'Habit Log',[Date.now(),data.habitId,data.habitName,data.points,new Date().toLocaleDateString(),data.notes||'']);
      case 'savePerson':
        return saveRow(ss,'People',[data.id,data.name,data.role,data.color,data.phone||'',data.email||'',data.birthday||'',data.bestContact||'',data.instagram||'',data.facebook||'',data.tiktok||'',data.linkedin||'',data.otherSocial||'',data.address||'',data.city||'',data.state||'',data.howYouKnow||'',data.lastContacted||'',data.contactFreq||'',data.praying||false,data.moneyOwedToThem||0,data.moneyTheyOweYou||0,data.moneyNotes||'',data.notes||'',new Date()]);
      case 'savePersonNote':
        return saveRow(ss,'Person Notes',[Date.now(),data.personId,data.personName,data.noteType,data.text,new Date()]);
      case 'savePrayer':
        return saveRow(ss,'Prayers',[data.id,data.personId||'',data.personName||'',data.text,data.type,data.status||'active',new Date(),data.dateAnswered||'']);
      case 'saveAppointment':
        return saveRow(ss,'Appointments',[data.id,data.date,data.time,data.title,data.notes||'',data.repeat||'none',new Date()]);
      case 'savePriorities':
        return upsertByDate(ss,'Priorities',data.date,[data.id,data.date,data.p1,data.p2,data.p3,new Date()]);
      case 'saveFaith':
        return saveRow(ss,'Faith',[data.id,data.type,data.text,data.reference||'',new Date(),data.status||'active']);
      case 'saveShopItem':
        return saveRow(ss,'Shopping',[data.id,data.name,data.qty||'',data.cat,data.got,new Date(),'']);
      case 'updateShopItem':
        return updateRow(ss,'Shopping',data.id,{Got:data.got,'Date Got':data.got?new Date().toLocaleDateString():''});
      case 'saveBrainDump':
        return saveRow(ss,'Brain Dumps',[data.id,data.text,data.category,data.source||'manual',data.approved,new Date()]);
      case 'logExercise':
        return saveRow(ss,'Exercise Log',[Date.now(),data.type,data.details,data.points,new Date().toLocaleDateString()]);
      case 'saveGoal':
        return saveRow(ss,'Goals',[data.id,data.text,data.period,data.done,data.pointsEarned||0,new Date(),data.dateCompleted||'']);
      case 'addPoints':
        var ledger=ss.getSheetByName('Points Ledger');
        var lastRow=ledger.getLastRow();
        var running=lastRow>1?ledger.getRange(lastRow,4).getValue():0;
        return saveRow(ss,'Points Ledger',[Date.now(),data.points,data.reason,running+data.points,new Date()]);
      case 'saveNote':
        return upsertBySection(ss,'Notes',data.section,[data.id||Date.now(),data.section,data.text,new Date()]);
      case 'saveFinance':
        return upsertByKey(ss,'Finance',data.section,data.label,[data.id||Date.now(),data.section,data.label,data.amount,data.notes||'',new Date()]);
      case 'saveBill':
        return saveRow(ss,'Bills',[data.id,data.name,data.amount,data.dueDate,data.dueDayOfMonth,data.category,data.recurring,data.frequency,data.paid,data.datePaid||'',data.autoPay||false,data.account||'',data.notes||'',new Date()]);
      case 'updateBill':
        return updateRow(ss,'Bills',data.id,{Paid:data.paid,'Date Paid':data.paid?new Date().toLocaleDateString():''});
      case 'saveReminder':
        return saveRow(ss,'Reminders',[data.id,data.title,data.notes||'',data.personId||'',data.personName||'',data.type||'reminder',data.dueDate,data.dueTime||'',data.priority||'med',data.recurring||false,data.frequency||'',data.done||false,'',data.section||'',new Date()]);
      case 'updateReminder':
        return updateRow(ss,'Reminders',data.id,{Done:data.done,'Date Completed':data.done?new Date().toLocaleDateString():''});
      case 'saveDailyLog':
        return saveRow(ss,'Daily Log',[data.id,data.date,data.time,data.symbol,data.type,data.text,data.tags||'',false,'',data.linkedSection||'',false]);
      case 'updateDailyLog':
        return updateRow(ss,'Daily Log',data.id,{Migrated:data.migrated,'Migrated To':data.migratedTo||'',Approved:data.approved||false});
      case 'saveMoneyOwed':
        return saveRow(ss,'Money Owed',[data.id,data.direction,data.personOrBiz,data.personId||'',data.amount,data.reason,data.dateIncurred||'',data.dueDate||'',data.paid||false,data.datePaid||'',data.paymentPlan||false,data.monthlyPayment||'',data.notes||'',new Date()]);
      case 'saveSeth':
        return saveRow(ss,'Seth',[data.id||Date.now(),data.type,data.text,data.status||'',new Date()]);
      case 'saveDog':
        return saveRow(ss,'Dogs',[data.id||Date.now(),data.dog,data.type,data.note,new Date()]);
      default:
        return respond({status:'error',message:'Unknown action: '+action});
    }
  }catch(err){
    return respond({status:'error',message:err.toString()});
  }
}

function doGet(e) {
  try {
    var sheet=e.parameter.sheet;
    var ss=SpreadsheetApp.openById(SHEET_ID);
    var tab=ss.getSheetByName(sheet);
    if(!tab)return respond({status:'error',message:'Sheet not found: '+sheet});
    var rows=tab.getDataRange().getValues();
    var headers=rows[0];
    var data=[];
    for(var i=1;i<rows.length;i++){
      var row={};
      headers.forEach(function(header,idx){row[header]=rows[i][idx];});
      data.push(row);
    }
    return respond({status:'success',sheet:sheet,data:data,count:data.length});
  }catch(err){
    return respond({status:'error',message:err.toString()});
  }
}

function saveRow(ss,sheetName,values){
  var sheet=ss.getSheetByName(sheetName);
  if(!sheet)return respond({status:'error',message:'Sheet not found: '+sheetName});
  sheet.appendRow(values);
  return respond({status:'success',action:'saved',sheet:sheetName});
}

function updateRow(ss,sheetName,id,updates){
  var sheet=ss.getSheetByName(sheetName);
  if(!sheet)return respond({status:'error',message:'Sheet not found'});
  var data=sheet.getDataRange().getValues();
  var headers=data[0];
  for(var i=1;i<data.length;i++){
    if(String(data[i][0])===String(id)){
      Object.keys(updates).forEach(function(key){
        var col=headers.indexOf(key);
        if(col>=0)sheet.getRange(i+1,col+1).setValue(updates[key]);
      });
      return respond({status:'success',action:'updated',row:i+1});
    }
  }
  return respond({status:'error',message:'Row not found: '+id});
}

function deleteRow(ss,sheetName,id){
  var sheet=ss.getSheetByName(sheetName);
  if(!sheet)return respond({status:'error',message:'Sheet not found'});
  var data=sheet.getDataRange().getValues();
  for(var i=1;i<data.length;i++){
    if(String(data[i][0])===String(id)){
      sheet.deleteRow(i+1);
      return respond({status:'success',action:'deleted'});
    }
  }
  return respond({status:'error',message:'Row not found'});
}

function upsertByDate(ss,sheetName,date,values){
  var sheet=ss.getSheetByName(sheetName);
  var data=sheet.getDataRange().getValues();
  for(var i=1;i<data.length;i++){
    if(String(data[i][1])===String(date)){
      sheet.getRange(i+1,1,1,values.length).setValues([values]);
      return respond({status:'success',action:'updated'});
    }
  }
  sheet.appendRow(values);
  return respond({status:'success',action:'inserted'});
}

function upsertBySection(ss,sheetName,section,values){
  var sheet=ss.getSheetByName(sheetName);
  var data=sheet.getDataRange().getValues();
  for(var i=1;i<data.length;i++){
    if(String(data[i][1])===String(section)){
      sheet.getRange(i+1,1,1,values.length).setValues([values]);
      return respond({status:'success',action:'updated'});
    }
  }
  sheet.appendRow(values);
  return respond({status:'success',action:'inserted'});
}

function upsertByKey(ss,sheetName,section,label,values){
  var sheet=ss.getSheetByName(sheetName);
  var data=sheet.getDataRange().getValues();
  for(var i=1;i<data.length;i++){
    if(String(data[i][1])===String(section)&&String(data[i][2])===String(label)){
      sheet.getRange(i+1,1,1,values.length).setValues([values]);
      return respond({status:'success',action:'updated'});
    }
  }
  sheet.appendRow(values);
  return respond({status:'success',action:'inserted'});
}

function respond(data){
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}
