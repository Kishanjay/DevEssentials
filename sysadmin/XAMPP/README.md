# VirtualHosting

Add a new virtual host to host with different Root Directory
```sh
/Applications/XAMPP/etc/extra$ nano httpd-vhosts.conf
```

Here are examples
```
# default
<VirtualHost *:80>
    ServerName localhost
    DocumentRoot "/Applications/XAMPP/xamppfiles/htdocs"
    <Directory "/Applications/XAMPP/xamppfiles/htdocs">
        Options Indexes FollowSymLinks Includes execCGI
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>

# My custom host
<VirtualHost *:80>
    ServerName tech020.local
    DocumentRoot "/Users/kishannirghin/Desktop/tech020/www"
    <Directory "/Users/kishannirghin/Desktop/tech020/www">
        Options All
        Allow from all
        AllowOverride All
        Require all granted
    </Directory> ErrorLog "logs/mysite.local-error_log"
</VirtualHost>
```

For the server name to DNS resolve, add to host file

```sh
sudo nano /etc/hosts
```

```
127.0.0.1 tech020.local
```

Lastly for these changes to take effect, restart Apache
