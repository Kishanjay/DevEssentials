# Install Noobs OS
Format card using ApplePi-Baker or SDFormatter App of w/e.


# Install RetroPi
Use `ApplePi-Baker 1.9.5`
> prep for Noobs
> Restore backup
> select RetroPi image


## Tricks
use `export DISPLAY=:0` over SSH to start the GUI of an application on the
attached screen

Use `nohup` to prevent a process from being stopped after closing SSH session

use `cat file | xclip -selection c` to put the contents of file on the clipboard

use `vcgencmd measure_temp` to measure the temprature


### TV controls:
sudo apt-get install cec-utils

turn on TV
echo 'on 0' | cec-client -s -d 1

turn off TV
echo 'standby 0' | cec-client -s -d 1
