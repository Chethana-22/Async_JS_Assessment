const fs = require('fs').promises;

async function readAndConvertToUppercase() {
  try {
    const data = await fs.readFile('lipsum.txt', 'utf-8');
    const uppercaseContent = data.toUpperCase();
    const filename = 'uppercase.txt'
    await fs.writeFile(filename, uppercaseContent);
    fs.writeFile('filenames.txt',filename);
    return 'uppercase.txt';
  } catch (error) {
    throw new Error(`Error in readAndConvertToUppercase: ${error.message}`);
  }
}

async function readUppercaseAndSplit() {
  try {
    const data = await fs.readFile('uppercase.txt', 'utf-8');
    const sentences = data.split(/[.!?]/);
    const sentenceFiles = [];

    for (let i = 0; i < sentences.length; i++) {
      const sentence = sentences[i].trim();
      if (sentence.length > 0) {
        const filename = `sentence_${i + 1}.txt`;
        await fs.writeFile(filename, sentence);
        fs.appendFile('filenames.txt \n', filename);
        sentenceFiles.push(sentence);
      }
    }

    return sentenceFiles;
  } catch (error) {
    throw new Error(`Error in readUppercaseAndSplit: ${error.message}`);
  }
}

async function readSentencesSortAndWrite() {
  try {
    const sentenceFiles = await readUppercaseAndSplit();
    const sortedSentences = sentenceFiles.sort().join('\n');
    await fs.writeFile('sorted.txt', sortedSentences);
    return 'sorted.txt';
  } catch (error) {
    throw new Error(`Error in readSentencesSortAndWrite: ${error.message}`);
  }
}

async function readFilenamesAndDelete() {
  try {
    const filenames = await fs.readFile('filenames.txt', 'utf-8');
    const filesToDelete = filenames.split('\n').filter((file) => file.trim() !== '');

    const deletePromises = filesToDelete.map(async (file) => {
      try {
        await fs.unlink(file);
      } catch (error) {
        console.error(`Error deleting ${file}: ${error.message}`);
      }
    });

    await Promise.all(deletePromises);
  } catch (error) {
    throw new Error(`Error in readFilenamesAndDelete: ${error.message}`);
  }
}

function writefile(file, resultArray) {
  fs.writeFile(file, resultArray, 'utf8', (err) => {
    if (err) {
      console.log('Error:', err);
      return;
    }
  });
}
async function main() {
  try {
    const uppercaseFile = await readAndConvertToUppercase();
    if(uppercaseFile){
      await readUppercaseAndSplit();
      
    }

    await readSentencesSortAndWrite();
      await readFilenamesAndDelete();
    // writefile('filenames.txt', uppercaseFile);
   
   

    console.log('All tasks completed successfully.');
  } catch (error) {
    console.error(`An error occurred: ${error.message}`);
  }
}

main();

