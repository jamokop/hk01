<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed'); 

use PayPal\Api\Amount;
use PayPal\Api\Details;
use PayPal\Api\FundingInstrument;
use PayPal\Api\Item;
use PayPal\Api\ItemList;
use PayPal\Api\Payer;
use PayPal\Api\Payment;
use PayPal\Api\PaymentCard;
use PayPal\Api\Transaction;
class Paypal {
    private $apiContext = null;
    public function __construct()
    {
        include __DIR__ . '/bootstrap.php';
        $this->apiContext = $apiContext;
    }
    
    public function direct_credit_card_payment($info)
    {
        $card = new PaymentCard();
        $card->setType($info['type'])
        ->setNumber($info['cardNumber'])
        ->setExpireMonth($info['expiryMonth'])
        ->setExpireYear($info['expiryYear'])
        ->setCvv2($info['cvv'])
        ->setFirstName($info['firstName'])
        ->setBillingCountry("HK")
        ->setLastName($info['lastName']);
        $fi = new FundingInstrument();
        $fi->setPaymentCard($card);
        
        $payer = new Payer();
        $payer->setPaymentMethod("credit_card")
            ->setFundingInstruments(array($fi));
            
        $item1 = new Item();
        $item1->setName('Ground Coffee 40 oz')
            ->setDescription('Ground Coffee 40 oz')
            ->setCurrency($info['currency'])
            ->setQuantity(1)
            ->setPrice($info['price']);
        $itemList = new ItemList();
        $itemList->setItems(array($item1));
        
        $amount = new Amount();
        $amount->setCurrency($info['currency'])
            ->setTotal($info['price']);
        $transaction = new Transaction();
        $transaction->setAmount($amount)
            ->setItemList($itemList)
            ->setDescription("Payment test")
            ->setInvoiceNumber(uniqid());
            
        $payment = new Payment();
        $payment->setIntent("sale")
            ->setPayer($payer)
            ->setTransactions(array($transaction));
            
        $request = clone $payment;
        try {
            $payment->create($this->apiContext);
        } catch (Exception $ex) {
            echo json_encode(array('code' => 'error','message'=>'Caught exception: '.$ex->getMessage()));
            exit(1);
        }
        return $payment;
    }
    
    public function index()
    {
        echo 'hello world';
    }
    
}