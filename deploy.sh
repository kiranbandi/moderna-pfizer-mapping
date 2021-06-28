rm -rf /var/www/vaccine-map/*
cp -r dist/. /var/www/vaccine-map
systemctl reload nginx
echo "deploy complete"
