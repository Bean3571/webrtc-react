# Setting Up WebRTC App on Android

Follow these steps to make your Android device trust your local WebRTC application.

## Step 1: Setup on Your Computer

1. Install mkcert (only once):
   ```
   # Windows (using Chocolatey)
   choco install mkcert
   
   # macOS (using Homebrew)
   brew install mkcert
   
   # Linux
   sudo apt install mkcert
   ```

2. Generate certificates and install dependencies:
   ```
   yarn setup:https
   ```

3. Start the application:
   ```
   yarn start
   ```

4. In a separate terminal, start the certificate server:
   ```
   yarn serve-cert
   ```
   This will start a user-friendly web interface for installing the certificate.

## Step 2: Install Certificate on Android

1. Connect your Android device to the same WiFi network as your computer

2. Open Chrome on your Android device

3. Visit the certificate server URL displayed in your terminal, something like:
   ```
   http://192.168.0.100:8000
   ```
   (Replace 192.168.0.100 with your computer's actual IP address)

4. Follow the on-screen instructions to:
   - Download the certificate
   - Install it on your device
   - Access the WebRTC application

5. For manual installation after downloading:
   
   **Android 11 and newer:**
   - Settings > Security > Encryption & credentials > Install a certificate > CA certificate
   - You might see a warning about security risks - tap "Install anyway"
   
   **Older Android versions:**
   - Settings > Security > Install from storage
   - Find and select the downloaded certificate file

## Step 3: Access the Application

1. On your Android device, open Chrome

2. Visit:
   ```
   https://192.168.0.100:3000
   ```
   (There's also a direct link on the certificate server page)

3. When prompted, allow camera and microphone permissions

## Troubleshooting

- **Certificate not trusted**: Make sure you installed the ROOT certificate, not just the server certificate
- **Can't connect**: Make sure your phone and computer are on the same WiFi network
- **Camera not working**: Check that you've granted camera/microphone permissions
- **Certificate installation fails**: Try downloading the certificate with a different browser

## For Developers

The certificates are created in the `certificates` directory:
- `cert.pem`: The certificate file
- `key.pem`: The private key file

These are used to enable HTTPS on the local development servers. 