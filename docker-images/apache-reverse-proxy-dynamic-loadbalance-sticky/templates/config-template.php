<?php
$dynamic_app[0] = getenv('DYNAMIC_APP_0');
$dynamic_app[1] = getenv('DYNAMIC_APP_1');
$static_app[0] = getenv('STATIC_APP_0');
$static_app[1] = getenv('STATIC_APP_1');
$static_app[2] = getenv('STATIC_APP_2');
?>
<VirtualHost *:80>
		ServerName demo.res.ch
		
		<Location "/balancer-manager">
				SetHandler balancer-manager
		</Location>
		
		ProxyPass /balancer-manager !
		
		<Proxy balancer://dynamic>
				BalancerMember http://<?php echo $dynamic_app[0] ?> 
				BalancerMember http://<?php echo $dynamic_app[1] ?> 
				ProxySet lbmethod=byrequests
		</Proxy>
		
		<Proxy balancer://staticapp>
				BalancerMember http://<?php echo $static_app[0] ?> route=member0
				BalancerMember http://<?php echo $static_app[1] ?> route=member1
				BalancerMember http://<?php echo $static_app[2] ?> route=member2
				ProxySet lbmethod=byrequests 
				ProxySet stickysession=Application_STICKY
		</Proxy>
		Header add Set-Cookie "Application_STICKY=sticky.%{BALANCER_WORKER_ROUTE}e;path=/;" env=BALANCER_ROUTE_CHANGED
		
		
		ProxyPass "/api/students/" "balancer://dynamic/"
		ProxyPassReverse "/api/students/" "balancer://dynamic/"
		
		ProxyPass "/" "balancer://staticapp/"
		ProxyPassReverse "/" "balancer://staticapp/"
		
</VirtualHost>