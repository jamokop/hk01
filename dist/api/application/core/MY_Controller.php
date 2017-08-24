<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class MY_Controller extends CI_Controller {

        public function __construct()
        {
                parent::__construct();
        }
        
        public function error($message) {
            $this->output
                ->set_content_type('application/json')
                ->set_output(json_encode(array('code' => 'error','message'=>$message)))
                ->_display();
            exit();
            
        }
        
        public function success($message) {
            $this->output
                ->set_content_type('application/json')
                ->set_output(json_encode(array('code' => 'success','message'=>$message)))
                ->_display();
            exit();
        }
}

