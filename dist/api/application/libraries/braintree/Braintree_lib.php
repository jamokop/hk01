<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

require_once APPPATH . 'third_party/braintree/lib/Braintree.php';

class Braintree_lib {
    private $merchantId = 'nwp7mj2744yy6wty';
    private $publicKey = 'zrbkg5htxcgvm6dk';
    private $privateKey = 'fdaff7f739461c4f0e72cf43d63913d8';
    private $merchant_id_list= array(
        'CNY' => 'cnytestid',
        'HKD' => 'hkdtestid',
        'JPY' => 'jpytestid'
    );
    
    public function __construct()
    {
        Braintree_Configuration::environment('sandbox');
        Braintree_Configuration::merchantId($this->merchantId);
        Braintree_Configuration::publicKey($this->publicKey);
        Braintree_Configuration::privateKey($this->privateKey);               
    }
    
    public function gen_token()
    {
        return Braintree_ClientToken::generate();
    }
    
    public function transation($data)
    {
        $result = Braintree_Transaction::sale([
            'amount' => $data['price'],
            'paymentMethodNonce' => $data['nonce'],
            'merchantAccountId' => $this->merchant_id_list[$data['currency']],
            'options' => [ 'submitForSettlement' => true ]
        ]);

        if ($result->success) {
            $obj = new stdClass();
            $obj->id = $result->transaction->id;
            $obj->state = $result->transaction->status;
            $obj->create_time = isset($result->transaction->createdAt->date)?$result->transaction->createdAt->date:date('Y-m-d H:i:s');
            $obj->update_time = isset($result->transaction->updatedAt->date)?$result->transaction->updatedAt->date:date('Y-m-d H:i:s');
            $obj->response = serialize($result->transaction);
            return $obj;
        } else if ($result->transaction) {
            $obj = new stdClass();
            $obj->error = true;
            $obj->message = 'code: '.$result->transaction->processorResponseCode.', text: '.$result->transaction->processorResponseText;
            return $obj;
        } else {
            $obj = new stdClass();
            $obj->error = true;
            $obj->message = "Validation errors: \n";
            return $obj;
        }
    }
}