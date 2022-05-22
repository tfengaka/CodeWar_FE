import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from './firebaseConfig';
export const uploadFileToFirebase = async (file, pathName, metadata, contextId, funcUpdate) => {
  const storageRef = ref(storage, pathName);
  const uploadTask = uploadBytesResumable(storageRef, file, metadata);

  await uploadTask.on(
    'state_changed',
    (snapshot) => {
      // eslint-disable-next-line default-case
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    },
    (error) => {
      // eslint-disable-next-line default-case
      switch (error.code) {
        case 'storage/unauthorized':
          break;
        case 'storage/canceled':
          break;

        case 'storage/unknown':
          break;
      }
    },
    () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
        console.log('File available at', downloadURL);
        await funcUpdate(contextId, downloadURL);
      });
    },
  );
};
