# Export database
```
mysqldump -u <username> -p <database> > <filename>
mysqldump -u YourUser -p YourDatabaseName > wantedsqlfile.sql
```

# Import database
```
mysql -u <username> -p <database> < <filename>
mysql -u YourUser -p YourDatabaseName < wantedsqlfile.sql
```
