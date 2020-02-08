#!/usr/sh
tar zcvf blog.tgz public/
scp -P $SSH_PORT blog.tgz "${SSH_USER}@${SSH_ADDR}:~/"
ssh -p $SSH_PORT "${SSH_USER}@${SSH_ADDR}" < ./deploy-blog.sh
