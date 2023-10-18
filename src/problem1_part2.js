function createAndDeleteFilesUsingPromises(createRandomJSONFile,deleteFile) {
    const promises = [];
  
    for (let i = 1; i <= 3; i++) {
      const filename = `promiseFile_${i}.json`;
  
      const createPromise = new Promise((resolve, reject) => {
        createRandomJSONFile(filename, (createErr, createdFile) => {
          if (createErr) {
            reject(createErr);
          } else {
            console.log(`${createdFile} created successfully.`);
            deleteFile(createdFile, (deleteErr, deletedFile) => {
              if (deleteErr) {
                reject(deleteErr);
              } else {
                console.log(`${deletedFile} deleted successfully.`);
                resolve(deletedFile);
              }
            });
          }
        });
      });
  
      promises.push(createPromise);
    }
  
    return Promise.all(promises);
  }
  
module.exports = createAndDeleteFilesUsingPromises;