import { signInWithEmailAndPassword } from 'firebase/auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { auth } from './firebase';

export const authConfig = {
  // Configure one or more authentication providers
  pages: {
    signIn: '/login',
    newUser: '/register',
    signOut: '/logout',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},
      async authorize(credentials): Promise<any> {
        return await signInWithEmailAndPassword(
          auth,
          (credentials as any).email || '',
          (credentials as any).password || ''
        )
          .then((userCredential) => {
            if (userCredential.user) {
              return userCredential.user;
            }
            return null;
          })
          .catch((error) => console.log(error))
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(error);
          });
      },
    }),
  ],
};
