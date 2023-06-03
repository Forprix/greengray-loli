@git init
@git remote add origin https://github.com/Forprix/greengray-loli
@git fetch origin
@git reset origin/main
@git add --all -- ':(exclude)upload.bat'
@git status
@git commit -am "hello"
@git push