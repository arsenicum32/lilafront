## Deploy lila to your own server

1.

install:

nginx
npm
nodejs

install package

pm2 -g
express
cors
axios
node-cmd
chance
moment
neataptic



2.

clone this repo and host it as static web server

```
cd /etc/nginx/sites-enabled
```
and edit `default` config `root` in you repo

3.

follow next commands ( output light ) -p 5000

```
curl https://untitled-dym8vwoojg4d.runkit.sh/ > light.js
pm2 start -n light light.js
```

4.
скачать сервак ml и развернуть его ( generate ML ) -p 4800
ml.js


5.

follow the next commands ( get IP , bluetooth ID ) -p 3500

```
curl https://confjs-xf2xlp3xvbjj.runkit.sh/ > conf.js
pm2 start -n conf conf.js

```

After run this:

```
pm2 startup
pm2 save
```
