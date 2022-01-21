const fs = require('fs');
const path = require('path');

function copyIconFontFiles() {
    const androidFontFolder = './android/app/src/main/assets/fonts'
    const fontFolder = './node_modules/react-native-vector-icons/Fonts'
    const files = fs.readdirSync(fontFolder)
    for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const filePath = path.join(fontFolder, file)
        if(!fs.existsSync(androidFontFolder)){
            fs.mkdirSync(androidFontFolder, { recursive: true })
        }
        fs.copyFileSync(filePath, path.join(androidFontFolder, file))
    }
    console.log(files);

}

copyIconFontFiles()