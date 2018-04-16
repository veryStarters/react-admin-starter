import shell from 'shelljs'
shell.exec('git clone https://github.com/veryStarters/react-admin-starter.git')
shell.exec('cp -a react-admin-starter/template/build/ build')
shell.exec('cp -a react-admin-starter/template/scripts/ scripts')
shell.exec('cp -a react-admin-starter/template/src/common/core ./src/common/')
shell.exec('cp -a react-admin-starter/template/package.json ./package_new.json')
shell.exec('rm -rf react-admin-starter')
shell.exec('echo "升级成功！"')
shell.exec('echo "PS: 升级完成后，系统根目录会增加package_new.json文件；\n为避免自动合并可能带来的冲突异常，请手工合并package.json的内容"')
