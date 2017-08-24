<?php
defined('BASEPATH') OR exit('No direct script access allowed');


class Notification extends MY_Controller {
    public function __construct()
    {
        parent::__construct();
        $this->load->library('ipn/PaypalIPN');
        $this->load->model('payment_model');
    }
    
	public function index()
    {
        // Use the sandbox endpoint during testing.
        $this->paypalipn->useSandbox();
        $verified = $this->paypalipn->verifyIPN();
        if ($verified) {
            /*
             * Process IPN
             * A list of variables is available here:
             * https://developer.paypal.com/webapps/developer/docs/classic/ipn/integration-guide/IPNandPDTVariables/
             */
             
             #####update record status , no https ,so can not implement this function
             
            
        }
        // Reply with an empty 200 response to indicate to paypal the IPN was received correctly.
        header("HTTP/1.1 200 OK");
    }
}