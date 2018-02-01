#!/bin/bash

# PATCH CONFIG FROM ENV
if [ ! -f /www/.config.js.patched ]; then
	echo "Patching configuration file"
	sed -e "s|your-device-connection-string-here-vs-DeviceId-property-set|${IOT_CONN_STRING}|" \
		-e "s|mopidy-port|${MOPIDY_PORT}|" \
		-e "s|my-mopidy-host|${MOPIDY_HOST}|" \
		-i /www/config.js 
	touch /www/.config.js.patched
else
	echo "Config file appears to be patched already"
fi

# START
npm start