# Firebase setup

The web app is configured for Firebase project `bansal-nursing-home-193d7`.

## Enable the Firebase services

1. In Firebase Console, open **Authentication → Sign-in method** and enable **Email/Password**. Enable **Google** too if you want to keep the Google sign-in button.
2. In **Authentication → Settings → Authorized domains**, make sure `localhost` and your deployed website's domain are listed.
3. Open **Firestore Database** and create a database if one does not already exist.
4. From this project directory, sign in with Firebase CLI and deploy the included owner-only rules:

   ```powershell
   npx firebase-tools login
   npx firebase-tools deploy --only firestore:rules
   ```

   The `.firebaserc` file selects the project configured in the app.

## Stored data

- `users/{uid}` stores a user's name, email, phone (when supplied), and sign-in timestamps.
- `bookings/{id}` stores their appointment request, contact number, requested date/time, and optional concern. New requests have `Pending` status.
- Firestore rules allow a signed-in user to read only their own profile and bookings. Clients can create bookings but cannot change or delete them.

## Admin portal

- Sign in using the site's normal **Sign In / Register** control. When Firebase authenticates `pririsahu8@gmail.com`, the app automatically opens the admin dashboard; there is no public admin button.
- Firestore grants admin access only when Firebase reports that account's email as verified.
- Create the admin identity in Firebase Authentication using the Email/Password provider, then complete Firebase email verification. Do not put the admin password in source code.
- Admins can read all bookings, change booking status, and create a pending booking. The Firestore rules also enforce admin authorization; hiding the portal in the UI is not the security boundary.
- After editing rules, publish them in Firebase Console or deploy with `npx firebase-tools deploy --only firestore:rules`.

The JavaScript Firebase web configuration identifies the project and is included in the client app. Firestore Security Rules provide the access control; the web config is not a substitute for those rules.
