# hk01
<p>Payment form with paypal and braintree gateway</p>
<p>if u want to deploy in your server,please use the dist folder as web root</p>
<a target="_blank" href="https://gkedge.gitbooks.io/react-router-in-the-real/content/nginx.html">web server setup</a>
<h3>Directory<h3>
<table>
<tr>
  <td>app</td>
  <td>webpack entry file</td>
</tr>
<tr>
  <td>components</td>
  <td>react componnets</td>
</tr>
<tr>
  <td>dist</td>
  <td>distribute folder(server side code are in api folder)</td>
</tr>
<tr>
  <td>reducers</td>
  <td>redux reducers</td>
</tr>
</table>
<h3>Data structure</h3>
<pre>
CREATE TABLE `payment_record` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `firstname` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `currency` varchar(30) NOT NULL,
  `payment_ref_code` varchar(255) NOT NULL DEFAULT '',
  `payment_state` varchar(100) NOT NULL DEFAULT '',
  `creat_time` datetime NOT NULL,
  `hash` varchar(100) NOT NULL DEFAULT '', #sha1(firstname.lastname.payment_ref_code) for query use
  `payment_create_time` datetime NOT NULL,
  `payment_update_time` datetime NOT NULL,
  `status` int(3) NOT NULL DEFAULT '1', # will be updated when ipn arrives
  `response` text, # payment response
  PRIMARY KEY (`id`),
  KEY `hash` (`hash`)
)</pre>
<a target="_blank" href="https://developers.braintreepayments.com/reference/general/testing/php">braintree test reference</a>
<br/>
<a target="_blank" href="https://www.paypal-knowledge.com/infocenter/index?page=content&id=FAQ1413&expand=true&locale=en_US">paypal test reference</a>
