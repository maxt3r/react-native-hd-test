import axios from 'axios';
import base64 from 'react-native-base64';

class JitBitAPI {
  static api;

  // Function to initialize the API with credentials from secure storage
  static init(credentials) {
    console.log('API initialized with credentials: ' + JSON.stringify(credentials));
    console.log(credentials.url);
    if (!credentials.url)
      throw new Error('URL is required');
    
    let authHeader = null;
    if (credentials.token) {
      authHeader = 'Bearer ' + credentials.token;
    }
    else if (credentials.username && credentials.password) {
      authHeader = 'Basic ' + base64.encode(credentials.username + ':' + credentials.password);
    }

    console.log(3)


    if(!authHeader)
      throw new Error('Token or username/password is required');


    this.api = axios.create({
      baseURL: `${credentials.url}/api`, // Use the retrieved URL
      headers: {
        Authorization: authHeader,
        'Content-Type': 'application/json',
      }
    });
  }

  static deinit() {
    this.api = null;
  }

  static getTickets(params = {}) {
    return this.api.get('/Tickets', { params });
  }

  static Authorization() {
    let result = this.api.post('/Authorization');
    console.log(result);
    return result;
  }

  // ... other static methods
}

export default JitBitAPI;
