#!/bin/bash
cd /home/ubuntu/Keyplus/server

export DATABASE_USER=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_USER --query Parameters[0].Value | sed 's/"//g')
export DATABASE_PASSWORD=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_PASSWORD --query Parameters[0].Value | sed 's/"//g')
export DATABASE_PORT=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_PORT --query Parameters[0].Value | sed 's/"//g')
export DATABASE_HOST=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_HOST --query Parameters[0].Value | sed 's/"//g')
export DATABASE_NAME=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_NAME --query Parameters[0].Value | sed 's/"//g')

export JWT_SECRETKEY=$(aws ssm get-parameters --region ap-northeast-2 --names JWT_SECRETKEY --query Parameters[0].Value | sed 's/"//g')
export EXPIRES_DAY=$(aws ssm get-parameters --region ap-northeast-2 --names EXPIRES_DAY --query Parameters[0].Value | sed 's/"//g')
export SALT_ROUNDS=$(aws ssm get-parameters --region ap-northeast-2 --names SALT_ROUNDS --query Parameters[0].Value | sed 's/"//g')



authbind --deep pm2 start app.js