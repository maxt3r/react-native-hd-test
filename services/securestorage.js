import * as SecureStore from 'expo-secure-store';

async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}

async function getValueFor(key) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    return result;
  } else {
    console.log('No values stored under that key.');
    return null;
  }
}

async function deleteValue(key) {
  await SecureStore.deleteItemAsync(key);
}

export { save, getValueFor, deleteValue };
