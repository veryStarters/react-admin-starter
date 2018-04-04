import shell from 'shelljs'
shell.exec('git clone https://github.com/veryStarters/react-admin-starter.git')
shell.exec('cp -a react-admin-starter/template/build/ build')
shell.exec('cp -a react-admin-starter/template/scripts/ scripts')
shell.exec('cp -a react-admin-starter/template/src/common/core ./src/common/')
shell.exec('cp -a react-admin-starter/template/package.json ./new.package.json')
shell.exec('rm -rf react-admin-starter')
shell.exec('echo "update completed!"')
