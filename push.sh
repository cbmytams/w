#!/bin/bash
cd "$(dirname "$0")"

echo "📦 Message du commit (appuie sur Entrée pour 'update') :"
read msg
msg=${msg:-update}

git add .
git commit -m "$msg"
git push

echo "✅ Push terminé !"
