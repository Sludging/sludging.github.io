<?php

if(isset($_POST['email'])) {
	$email_to = "vedhanayak@vedhanayak.com";
	$email_subject = "Contact mail";
	
	//Setting the email message
	$email_message = "Form details below.\n\n";
     
    function clean_string($string) {
      $bad = array("content-type","bcc:","to:","cc:","href");
      return str_replace($bad,"",$string);
    }
     
    $email_message .= "Name : ".clean_string($_POST['name'])."\n";
    $email_message .= "Email : ".clean_string($_POST['email'])."\n";
    $email_message .= "Comments : ".clean_string($_POST['message'])."\n";
	
	// create email headers
	$headers = 'Reply-To: no-reply@vedhanayak.com'."\r\n" .
	'X-Mailer: PHP/' . phpversion();
	if(mail($email_to, $email_subject, $email_message, $headers)){
		return 1;
	}
	else{
		return 0;
	}
}

     
    