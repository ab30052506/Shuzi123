
const fs = require('fs');
const path = require('path');

function fixDirectory(dir) {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    
    items.forEach(item => {
        const fullPath = path.join(dir, item.name);
        
        if (item.isDirectory()) {
            fixDirectory(fullPath);
            // Check if directory name contains |
            if (item.name.includes('|')) {
                const newName = item.name.replace(/\|/g, '-');
                const newFullPath = path.join(dir, newName);
                fs.renameSync(fullPath, newFullPath);
                console.log(`Renamed directory: ${item.name} -> ${newName}`);
                fixDirectory(newFullPath);
            }
        } else {
            // Check if file name contains |
            if (item.name.includes('|')) {
                const newName = item.name.replace(/\|/g, '-');
                const newFullPath = path.join(dir, newName);
                // Read content and write to new file, then delete old
                try {
                    // If the file couldn't be created due to |, it doesn't exist
                    if (fs.existsSync(fullPath)) {
                        const content = fs.readFileSync(fullPath);
                        fs.writeFileSync(newFullPath, content);
                        fs.unlinkSync(fullPath);
                    } else {
                        // File doesn't exist, create an empty placeholder
                        fs.writeFileSync(newFullPath, `# ${newName.replace('.md', '')}\n\n内容待补充\n`);
                    }
                    console.log(`Renamed file: ${item.name} -> ${newName}`);
                } catch (e) {
                    // Create placeholder since original couldn't be created
                    fs.writeFileSync(newFullPath, `# ${newName.replace('.md', '')}\n\n内容待补充\n`);
                    console.log(`Created placeholder for: ${newName}`);
                }
            }
        }
    });
}

console.log('Starting filename fix...');
fixDirectory('.');
console.log('Done!');
