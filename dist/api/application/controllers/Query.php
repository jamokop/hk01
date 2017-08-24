<?php
defined('BASEPATH') OR exit('No direct script access allowed');


class Query extends MY_Controller {

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see https://codeigniter.com/user_guide/general/urls.html
	 */
    
    public function __construct()
    {
        parent::__construct();
        $this->load->model('payment_model');
        $this->load->driver('cache', ['adapter'=>'redis']);
    }
        
    public function index() {

        $data = $this->input->post(NULL,TRUE);
        if (empty($data)) $this->error('No Data Found');
        $this->validation();
        if($record = $this->cache->redis->get($data['hash'])) {
            $this->success($record);
        } else {
            $result = $this->payment_model->query($data['hash']);
            if(!empty($result)) {
                $this->cache->redis->save($data['hash'],json_encode($result),3600);
                $this->success(json_encode($result));
            } else {
                $this->error('Record not found');
            }
        }
    }
    
    
    
    
    private function validation()
    {
        $this->load->library('form_validation');
        $this->form_validation->set_rules('hash', 'Hash', 'required');

        if ($this->form_validation->run() == FALSE)
        {
            $this->error($this->form_validation->error_array());
        }
        
        
    }
    
    
}
