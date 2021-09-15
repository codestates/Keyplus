#!/bin/bash
cd /home/ubuntu/Keyplus/server

export DATABASE_USER=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_USER --query Parameters[0].Value | sed 's/"//g')
export DATABASE_PASSWORD=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_PASSWORD --query Parameters[0].Value | sed 's/"//g')
export DATABASE_PORT=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_PORT --query Parameters[0].Value | sed 's/"//g')
export DATABASE_HOST=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_HOST --query Parameters[0].Value | sed 's/"//g')
export DATABASE_NAME=$(aws ssm get-parameters --region ap-northeast-2 --names DATABASE_NAME --query Parameters[0].Value | sed 's/"//g')

export MAILID=$(aws ssm get-parameters --region ap-northeast-2 --names MAILID --query Parameters[0].Value | sed 's/"//g')
export MAILPW=$(aws ssm get-parameters --region ap-northeast-2 --names MAILPW --query Parameters[0].Value | sed 's/"//g')

export S3_BUCKET_NAME=$(aws ssm get-parameters --region ap-northeast-2 --names S3_BUCKET_NAME --query Parameters[0].Value | sed 's/"//g')
export S3_KEY_ID=$(aws ssm get-parameters --region ap-northeast-2 --names S3_KEY_ID --query Parameters[0].Value | sed 's/"//g')
export S3_REGION=$(aws ssm get-parameters --region ap-northeast-2 --names S3_REGION --query Parameters[0].Value | sed 's/"//g')
export S3_SECRET_KEY=$(aws ssm get-parameters --region ap-northeast-2 --names S3_SECRET_KEY --query Parameters[0].Value | sed 's/"//g')

export GOOGLE_CLIENT_ID=$(aws ssm get-parameters --region ap-northeast-2 --names GOOGLE_CLIENT_ID --query Parameters[0].Value | sed 's/"//g')
export GOOGLE_CLIENT_SECRET=$(aws ssm get-parameters --region ap-northeast-2 --names GOOGLE_CLIENT_SECRET --query Parameters[0].Value | sed 's/"//g')
export GOOGLE_REDIRECT_URI=$(aws ssm get-parameters --region ap-northeast-2 --names GOOGLE_REDIRECT_URI --query Parameters[0].Value | sed 's/"//g')

export NAVER_CLIENT_ID=$(aws ssm get-parameters --region ap-northeast-2 --names NAVER_CLIENT_ID --query Parameters[0].Value | sed 's/"//g')
export NAVER_CLIENT_SECRET=$(aws ssm get-parameters --region ap-northeast-2 --names NAVER_CLIENT_SECRET --query Parameters[0].Value | sed 's/"//g')
export NAVER_REDIRECT_URI=$(aws ssm get-parameters --region ap-northeast-2 --names NAVER_REDIRECT_URI --query Parameters[0].Value | sed 's/"//g')

export KAKAO_CLIENT_ID=$(aws ssm get-parameters --region ap-northeast-2 --names KAKAO_CLIENT_ID --query Parameters[0].Value | sed 's/"//g')
export KAKAO_REDIRECT_URI=$(aws ssm get-parameters --region ap-northeast-2 --names KAKAO_REDIRECT_URI --query Parameters[0].Value | sed 's/"//g')

authbind --deep pm2 start app.js