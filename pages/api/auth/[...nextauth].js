import NextAuth from "next-auth";
import Providers from "next-auth/providers";

//import { verifyPassword } from '../../../lib/auth';kkkkkk
//import { connectToDatabase } from '../../../lib/db';
import { connectDatabase } from "../../../helpers/db-utils";
import { verifyPassword } from "../../../helpers/auth";

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        const client = await connectDatabase();

        const usersCollection = client.db().collection("users");

        const usernameCheck = await usersCollection.findOne({
          username: credentials.username,
        });

        if (!usernameCheck) {
          client.close();
          throw new Error("No user with that email found!");
        }

        const isValid = await verifyPassword(
          credentials.password,
          usernameCheck.password
        );

        if (!isValid) {
          client.close();
          throw new Error("Incorrect password. Could not log you in!");
        }

        client.close();
        return {
          email: usernameCheck.email,
          names: { name: usernameCheck.name, username: usernameCheck.username },
          imageAndInterest: {
            image: usernameCheck.imageLink,
            interest: usernameCheck.interest,
          },
        };
      },
    }),
  ],
});
