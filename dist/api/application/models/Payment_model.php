<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Payment_model extends CI_Model {
    private $table = 'payment_record';
        
    public function __construct()
    {
            parent::__construct();
    }
        
    public function insert_record($order,$response)
    {
        $data  = array(
            'firstname' => $order['firstName'],
            'lastname'  => $order['lastName'],
            'phone'     => $order['phone'],
            'price'     => $order['price'],
            'currency'  => $order['currency'],
            'payment_ref_code' => $response->id,
            'payment_state' => $response->state,
            'payment_create_time'  => $response->create_time,
            'payment_update_time'  => $response->update_time,
            'hash' => sha1($order['firstName'].$order['lastName'].$response->id),
            'creat_time' => date('Y-m-d H:i:s'),
            'status' => 0
        );
        if(property_exists($response,'response')) {
            $data['response'] = $response->response;
        }
        $this->db->insert($this->table,$data);
        return $this->db->insert_id();
    }
    
    public function update_status($id,$status)
    {
        
    }
    
    public function query($hash)
    {
        $query = $this->db->select('firstName,lastName,currency,price,phone')
                 ->from($this->table)   
                 ->where('hash',$hash)
                 ->get();
        if ($query->num_rows() > 0) {
            return $query->row_array();
        } else {
            return array();
        }
        
    }
        

}