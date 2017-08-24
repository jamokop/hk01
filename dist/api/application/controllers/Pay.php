<?php
defined('BASEPATH') OR exit('No direct script access allowed');


class Pay extends MY_Controller {

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
    private $currency = ['HKD','USD', 'AUD', 'EUR', 'JPY', 'CNY'];
    private $paypal_support_card =['visa','mastercard','discover','amex'];
    
    public function __construct()
    {
        parent::__construct();
        $this->load->library('paypal/Paypal');
        $this->load->library('braintree/Braintree_lib');
        $this->load->library('CardValidate');
        $this->load->model('payment_model');
    }
    
	public function index()
	{
		$data = $this->input->post(NULL,TRUE);
        if (empty($data)) $this->error('No Data Found');
            
        $this->validation();
        $data['type'] = CardValidate::creditCardType($data['cardNumber']);
        if($data['type'] == '') {
            $this->error('Credit card type not supported');
        }
        if ($data['currency'] != 'USD' and $data['type'] == 'amex') {
            $this->error('AMEX is possible to use only for USD');
        }
        
        if($data['type']=='amex' or in_array($data['currency'],['USD','EUR','AUD'])) {
            if(!in_array($data['type'],$this->paypal_support_card)) {
                $this->error('Credit card type not supported');
            }
            $result = $this->paypal->direct_credit_card_payment($data);
        } else {
            if($data['nonce']=='') {
                $this->error('Credit card not supported');
            }
            $result = $this->braintree_lib->transation($data);
            if(property_exists($result,'error')) {
                $this->error($result->message);
            }
        }
        
        if($this->payment_model->insert_record($data,$result)) {
            $hash = sha1($data['firstName'].$data['lastName'].$result->id);
            $record = array(
                'firstName' => $data['firstName'],
                'lastName'  => $data['lastName'],
                'currency'  => $data['currency'],
                'price'     => $data['price'],
                'phone'     => $data['phone']
            );
            $this->set_redis_cache($hash,$record);
            $this->success('your payment reference code is '.$result->id);
        } else {
            $this->error('system error');
        }  
    }
    
    private function set_redis_cache($hash,$result)
    {
        $this->load->driver('cache', ['adapter'=>'redis']);
        $this->cache->redis->save($hash,json_encode($result),3600);
    }
    
    public function gen_token()
    {
        echo $this->braintree_lib->gen_token();
    }
    
    private function validation()
    {
        $this->load->library('form_validation');
        $this->form_validation->set_rules('firstName', 'FirstName', 'required');
        $this->form_validation->set_rules('lastName', 'LastName', 'required');
        $this->form_validation->set_rules('phone', 'Phone', 'required|numeric');
        $this->form_validation->set_rules('price', 'Price', 'required|numeric');
        $this->form_validation->set_rules('holderName', 'HolderName', 'required');
        $this->form_validation->set_rules('expiryYear', 'ExpiryYear', 'required');
        $this->form_validation->set_rules('expiryMonth', 'ExpiryMonth', 'required');
        $this->form_validation->set_rules('currency', 'Currency', 'required');
        $this->form_validation->set_rules('cvv', 'CVV', 'required|numeric');
        $this->form_validation->set_rules('cardNumber', 'CardNumber', 'required|numeric');

        if ($this->form_validation->run() == FALSE)
        {
            $this->error($this->form_validation->error_array());
        }
        
        
    }
   
    
}
