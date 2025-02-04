#!/bin/bash

git pull
pmpm build
pm2 restart ecosystem.config.js
