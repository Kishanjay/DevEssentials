# Installing
From Mojave onwards apache is pre-installed. 
Install httpd with `brew install httpd`

Apache by default will try to run at port 8080; this port could be claimed by other programs 
(e.g. apple homekit seems to be running on this port aswell). Search for 'listen' in the  `httpd.conf` file to change the default listening port.

Furthermore PHP often needs to be installed. Since brew only keeps the recent version of PHP -- this tap can be used to download older versions as well: 
`brew tap exolnet/homebrew-deprecated`
`brew install php@5.6`

```
LoadModule rewrite_module lib/httpd/modules/mod_rewrite.so
```

Lastly have apache handle .php files with the php module:
```
<IfModule dir_module>
    DirectoryIndex index.php index.html
</IfModule>

<FilesMatch \.php$>
    SetHandler application/x-httpd-php
</FilesMatch>
```


# Virtual hosting
Ensure that apache is installed:
```
which apachectl
sudo apachectl -help
```

Enable virtual hosting by uncommenting the following line in the `httpd.conf` file. _Different installations have different folders_
`/usr/local/extra/httpd/httpd.conf`
`/usr/local/etc/httpd/httpd.conf`
`/Applications/XAMPP/xamppfiles/etc/httpd.conf`
```
#Include /Applications/XAMPP/etc/extra/httpd-vhosts.conf
```

To add a virtual host an entry should be created in the httpd-vhosts.conf file.
Here are examples:
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
    </Directory> ErrorLog "logs/tech020.local-error_log"
</VirtualHost>
```

A tip to resolve any serverName is to add an entry to the `/etc/hosts` file:
```
127.0.0.1 tech020.local
```

Restart apache for the changes to take effect.


The Directories pointed to by the virtualhosts should all be executable:
`chmod +x <filename>`